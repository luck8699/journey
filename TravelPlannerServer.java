import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.awt.Desktop;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.AtomicMoveNotSupportedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HexFormat;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.zip.GZIPOutputStream;

/**
 * 远行路书 · 私人旅行规划台
 *
 * 零第三方依赖：JDK 自带的 HttpServer 提供静态页面、行程读取与保存接口。
 * 运行：java -cp out TravelPlannerServer --open
 */
public final class TravelPlannerServer {
    private static final String APP_NAME = "Journey";
    private static final int MAX_PLAN_BYTES = 2 * 1024 * 1024;
    private static final DateTimeFormatter TIME_FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final String COOKIE_NAME = "journey_session";
    private static final int SESSION_SECONDS = 60 * 60 * 24 * 30;
    private static final int MAX_LOGIN_ATTEMPTS = 8;
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final Map<String, LoginAttempt> LOGIN_ATTEMPTS = new ConcurrentHashMap<>();

    private static Path webRoot;
    private static Path dataDir;
    private static Path planFile;
    private static Path planBackup;
    private static Path accessCodeFile;
    private static boolean authEnabled = false;
    private static boolean onlineMode = false;
    private static String accessCode = "";
    private static String sessionToken = "";

    private record LoginAttempt(int count, long resetAt) {}

    public static void main(String[] args) throws Exception {
        int requestedPort = readIntEnv("PORT", 8080);
        String host = env("JOURNEY_HOST", "127.0.0.1");
        String configuredPassword = env("JOURNEY_PASSWORD", "");
        boolean explicitPort = false;
        boolean explicitHost = false;
        boolean openBrowser = false;
        Path root = Path.of(System.getProperty("user.dir")).toAbsolutePath().normalize();

        onlineMode = truthy(env("JOURNEY_ONLINE", ""));

        for (int i = 0; i < args.length; i++) {
            String arg = args[i];
            if (arg.equals("--port") && i + 1 < args.length) {
                requestedPort = Integer.parseInt(args[++i]);
                explicitPort = true;
            } else if (arg.startsWith("--port=")) {
                requestedPort = Integer.parseInt(arg.substring("--port=".length()));
                explicitPort = true;
            } else if (arg.equals("--host") && i + 1 < args.length) {
                host = args[++i];
                explicitHost = true;
            } else if (arg.startsWith("--host=")) {
                host = arg.substring("--host=".length());
                explicitHost = true;
            } else if (arg.equals("--online")) {
                onlineMode = true;
                if (!explicitHost) host = "0.0.0.0";
            } else if (arg.equals("--password") && i + 1 < args.length) {
                configuredPassword = args[++i];
            } else if (arg.startsWith("--password=")) {
                configuredPassword = arg.substring("--password=".length());
            } else if (arg.equals("--open")) {
                openBrowser = true;
            } else if (arg.equals("--root") && i + 1 < args.length) {
                root = Path.of(args[++i]).toAbsolutePath().normalize();
            } else if (arg.startsWith("--root=")) {
                root = Path.of(arg.substring("--root=".length())).toAbsolutePath().normalize();
            } else if (arg.equals("--help") || arg.equals("-h")) {
                printHelp();
                return;
            } else {
                System.err.println("未知参数：" + arg);
                printHelp();
                System.exit(2);
            }
        }

        if (requestedPort < 1 || requestedPort > 65535) {
            throw new IllegalArgumentException("端口必须在 1–65535 之间");
        }
        if (onlineMode && !explicitHost) host = "0.0.0.0";
        if (!isLoopback(host) && configuredPassword.isBlank()) {
            // Binding beyond localhost should never expose an unauthenticated plan.
            onlineMode = true;
        }

        webRoot = root.resolve("web").normalize();
        String dataOverride = env("JOURNEY_DATA_DIR", "");
        dataDir = dataOverride.isBlank() ? root.resolve("data").normalize()
                : Path.of(dataOverride).toAbsolutePath().normalize();
        planFile = dataDir.resolve("plan.json");
        planBackup = dataDir.resolve("plan.backup.json");
        accessCodeFile = dataDir.resolve("access-code.txt");

        if (!Files.isRegularFile(webRoot.resolve("index.html"))) {
            throw new IllegalStateException("找不到网页目录：" + webRoot.resolve("index.html")
                    + "\n请在项目根目录运行，或使用 --root 指定项目目录。");
        }
        Files.createDirectories(dataDir);

        if (!configuredPassword.isBlank()) {
            accessCode = configuredPassword;
            authEnabled = true;
        } else if (onlineMode || !isLoopback(host)) {
            accessCode = generateAccessCode();
            authEnabled = true;
        }
        if (authEnabled) {
            Files.writeString(accessCodeFile, accessCode + System.lineSeparator(), StandardCharsets.UTF_8);
            sessionToken = sha256(accessCode + "|journey-session-v1");
        }

        int port = requestedPort;
        HttpServer server = null;
        for (int attempt = 0; attempt < 20; attempt++) {
            try {
                server = HttpServer.create(new InetSocketAddress(InetAddress.getByName(host), port), 0);
                break;
            } catch (java.net.BindException e) {
                if (explicitPort) {
                    throw new IllegalStateException("端口 " + port + " 已被占用，请换一个端口：--port 8090", e);
                }
                port++;
            }
        }
        if (server == null) {
            throw new IllegalStateException("无法找到可用端口（已尝试 20 个）");
        }

        ThreadPoolExecutor pool = (ThreadPoolExecutor) Executors.newFixedThreadPool(
                Math.max(4, Runtime.getRuntime().availableProcessors()));
        server.setExecutor(pool);
        server.createContext("/api/", new ApiHandler());
        server.createContext("/", new StaticHandler());
        server.start();

        String url = "http://" + (host.equals("0.0.0.0") ? "127.0.0.1" : host) + ":" + port + "/";
        System.out.println();
        System.out.println("  ┌──────────────────────────────────────────────┐");
        System.out.println("  │  JOURNEY · PRIVATE TRAVEL PLANNER            │");
        System.out.println("  └──────────────────────────────────────────────┘");
        System.out.println("  Local   " + url);
        if (!host.equals("127.0.0.1") && !host.equals("localhost")) {
            System.out.println("  Listen  " + host + ":" + port + (onlineMode ? "  (online mode)" : ""));
        }
        System.out.println("  Data    " + planFile);
        if (authEnabled) {
            System.out.println("  Access  " + accessCode);
            System.out.println("          (also saved to " + accessCodeFile + ")");
        } else {
            System.out.println("  Access  local only, no login required");
        }
        System.out.println("  Stop    Ctrl + C");
        System.out.println();

        if (openBrowser) {
            openBrowser(url);
        }

        final HttpServer runningServer = server;
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("\n正在关闭服务…");
            runningServer.stop(1);
            pool.shutdownNow();
        }, "travel-planner-shutdown"));
    }

    private static void printHelp() {
        System.out.println("""
                JOURNEY · PRIVATE TRAVEL PLANNER

                用法：
                  java -cp out TravelPlannerServer [选项]

                选项：
                  --port 8080       端口（默认 8080，被占用时自动 +1；支持环境变量 PORT）
                  --host 127.0.0.1  监听地址（默认仅本机）
                  --online          在线模式：监听 0.0.0.0，并启用访问码登录
                  --password <码>   设置访问码（也可用环境变量 JOURNEY_PASSWORD）
                  --root <目录>     项目根目录（默认当前目录）
                  --open            启动后打开浏览器
                  --help            显示帮助

                在线部署环境变量：
                  PORT, JOURNEY_PASSWORD, JOURNEY_ONLINE=1, JOURNEY_DATA_DIR
                """);
    }

    private static String env(String key, String fallback) {
        String value = System.getenv(key);
        return value == null || value.isBlank() ? fallback : value.trim();
    }

    private static int readIntEnv(String key, int fallback) {
        try {
            String value = System.getenv(key);
            return value == null || value.isBlank() ? fallback : Integer.parseInt(value.trim());
        } catch (NumberFormatException e) {
            return fallback;
        }
    }

    private static boolean truthy(String value) {
        return value != null && switch (value.trim().toLowerCase(Locale.ROOT)) {
            case "1", "true", "yes", "on" -> true;
            default -> false;
        };
    }

    private static boolean isLoopback(String host) {
        return host.equals("127.0.0.1") || host.equals("localhost") || host.equals("::1");
    }

    private static String generateAccessCode() {
        String alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        StringBuilder out = new StringBuilder();
        for (int i = 0; i < 8; i++) {
            if (i == 4) out.append('-');
            out.append(alphabet.charAt(RANDOM.nextInt(alphabet.length())));
        }
        return out.toString();
    }

    private static String sha256(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(digest.digest(input.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new IllegalStateException("SHA-256 unavailable", e);
        }
    }

    private static void openBrowser(String url) {
        try {
            if (Desktop.isDesktopSupported() && Desktop.getDesktop().isSupported(Desktop.Action.BROWSE)) {
                Desktop.getDesktop().browse(URI.create(url));
            } else {
                System.out.println("当前环境不能自动打开浏览器，请手动访问上面的地址。");
            }
        } catch (Exception e) {
            System.out.println("自动打开浏览器失败，请手动访问：" + url);
        }
    }

    // ---------------------------------------------------------
    // Access-code authentication
    // ---------------------------------------------------------

    private static boolean isAuthenticated(HttpExchange exchange) {
        if (!authEnabled) return true;
        String cookie = exchange.getRequestHeaders().getFirst("Cookie");
        if (cookie == null) return false;
        for (String part : cookie.split(";")) {
            int split = part.indexOf('=');
            if (split < 0) continue;
            String name = part.substring(0, split).trim();
            if (!name.equals(COOKIE_NAME)) continue;
            String value = part.substring(split + 1).trim();
            return MessageDigest.isEqual(
                    value.getBytes(StandardCharsets.UTF_8),
                    sessionToken.getBytes(StandardCharsets.UTF_8)
            );
        }
        return false;
    }

    private static boolean isHttps(HttpExchange exchange) {
        String proto = exchange.getRequestHeaders().getFirst("X-Forwarded-Proto");
        return proto != null && proto.equalsIgnoreCase("https");
    }

    private static void setSessionCookie(HttpExchange exchange, String value, long maxAge) {
        StringBuilder cookie = new StringBuilder();
        cookie.append(COOKIE_NAME).append('=').append(value)
                .append("; Path=/; HttpOnly; SameSite=Lax; Max-Age=").append(maxAge);
        if (isHttps(exchange)) cookie.append("; Secure");
        exchange.getResponseHeaders().add("Set-Cookie", cookie.toString());
    }

    private static String safeNext(String next) {
        if (next == null || next.isBlank()) return "/";
        if (!next.startsWith("/") || next.startsWith("//") || next.contains("\r") || next.contains("\n")) {
            return "/";
        }
        return next;
    }

    private static String formValue(String body, String name) {
        if (body == null || body.isBlank()) return "";
        for (String pair : body.split("&")) {
            int split = pair.indexOf('=');
            if (split < 0) continue;
            String key = URLDecoder.decode(pair.substring(0, split), StandardCharsets.UTF_8);
            if (key.equals(name)) {
                return URLDecoder.decode(pair.substring(split + 1), StandardCharsets.UTF_8);
            }
        }
        return "";
    }

    private static String clientKey(HttpExchange exchange) {
        return exchange.getRemoteAddress().getAddress().getHostAddress();
    }

    private static boolean loginRateLimited(HttpExchange exchange) {
        LoginAttempt attempt = LOGIN_ATTEMPTS.get(clientKey(exchange));
        if (attempt == null) return false;
        if (System.currentTimeMillis() > attempt.resetAt()) {
            LOGIN_ATTEMPTS.remove(clientKey(exchange));
            return false;
        }
        return attempt.count() >= MAX_LOGIN_ATTEMPTS;
    }

    private static void recordLoginFailure(HttpExchange exchange) {
        long now = System.currentTimeMillis();
        LOGIN_ATTEMPTS.compute(clientKey(exchange), (key, previous) -> {
            if (previous == null || now > previous.resetAt()) {
                return new LoginAttempt(1, now + 5 * 60 * 1000L);
            }
            return new LoginAttempt(previous.count() + 1, previous.resetAt());
        });
    }

    private static void handleLogin(HttpExchange exchange) throws IOException {
        String contentType = exchange.getRequestHeaders().getFirst("Content-Type");
        if (contentType == null || !contentType.toLowerCase(Locale.ROOT).contains("application/x-www-form-urlencoded")) {
            sendText(exchange, 415, "Unsupported Media Type", "text/plain; charset=utf-8");
            return;
        }
        if (loginRateLimited(exchange)) {
            sendLoginPage(exchange, 429, "尝试次数过多，请 5 分钟后再试。", "/");
            return;
        }
        byte[] bytes;
        try (InputStream in = exchange.getRequestBody()) {
            bytes = in.readNBytes(4096);
        }
        String body = new String(bytes, StandardCharsets.UTF_8);
        String password = formValue(body, "password").trim();
        String next = safeNext(formValue(body, "next"));
        if (!password.isBlank() && MessageDigest.isEqual(
                password.getBytes(StandardCharsets.UTF_8),
                accessCode.getBytes(StandardCharsets.UTF_8))) {
            LOGIN_ATTEMPTS.remove(clientKey(exchange));
            setSessionCookie(exchange, sessionToken, SESSION_SECONDS);
            sendRedirect(exchange, next);
        } else {
            recordLoginFailure(exchange);
            sendLoginPage(exchange, 401, "访问码不正确，请再试一次。", next);
        }
    }

    private static void handleLogout(HttpExchange exchange) throws IOException {
        setSessionCookie(exchange, "", 0);
        sendJson(exchange, 200, "{\"ok\":true}");
    }

    private static void sendLoginPage(HttpExchange exchange, int status, String error, String next) throws IOException {
        String html = loginPageHtml(error, next);
        Headers headers = exchange.getResponseHeaders();
        headers.set("Content-Type", "text/html; charset=utf-8");
        headers.set("Cache-Control", "no-store");
        headers.set("X-Frame-Options", "DENY");
        headers.set("X-Robots-Tag", "noindex, nofollow");
        headers.set("Referrer-Policy", "no-referrer");
        headers.set("X-Content-Type-Options", "nosniff");
        exchange.sendResponseHeaders(status, html.getBytes(StandardCharsets.UTF_8).length);
        try (OutputStream out = exchange.getResponseBody()) {
            out.write(html.getBytes(StandardCharsets.UTF_8));
        }
        exchange.close();
    }

    private static String loginPageHtml(String error, String next) {
        String errorBlock = error == null || error.isBlank()
                ? ""
                : "<p class=\"error\">" + escapeHtml(error) + "</p>";
        return """
                <!doctype html>
                <html lang="zh-CN">
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
                  <meta name="robots" content="noindex,nofollow">
                  <meta name="theme-color" content="#f5f3ee">
                  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
                  <title>Journey · 私人入口</title>
                  <style>
                    :root{color-scheme:light}
                    *{box-sizing:border-box}
                    body{margin:0;min-height:100dvh;background:#f5f3ee;color:#151513;
                      font-family:"Helvetica Neue","PingFang SC","Microsoft YaHei",sans-serif;
                      display:flex;align-items:center;justify-content:center;padding:28px}
                    .wrap{width:min(440px,100%)}
                    .brand{font-size:15px;font-weight:600;letter-spacing:.34em}
                    .sub{margin-top:5px;color:#98958c;font-size:7px;letter-spacing:.2em}
                    .line{height:1px;background:#151513;margin:40px 0 36px}
                    .kicker{color:#8b6f4e;font-size:8px;letter-spacing:.24em}
                    h1{margin:15px 0 10px;font-size:clamp(32px,8vw,45px);font-weight:450;
                      line-height:1.12;letter-spacing:-.055em}
                    p.lead{margin:0;color:#77746b;font-size:11px;line-height:1.8}
                    form{margin-top:34px}
                    label{display:block;color:#77746b;font-size:8px;letter-spacing:.12em;margin-bottom:9px}
                    input{width:100%;padding:13px 0;border:0;border-bottom:1px solid #bdb8ad;
                      border-radius:0;background:transparent;color:#151513;font-size:18px;
                      letter-spacing:.16em;outline:none}
                    input:focus{border-color:#151513}
                    input::placeholder{color:#b4afa4;font-size:14px;letter-spacing:.14em}
                    button{margin-top:25px;width:100%;min-height:46px;border:1px solid #151513;
                      border-radius:2px;background:#151513;color:#f5f3ee;font-size:10px;
                      letter-spacing:.12em;cursor:pointer}
                    button:hover{background:#2d2d29}
                    .error{margin:13px 0 0;color:#93473b;font-size:10px;line-height:1.6}
                    .foot{margin-top:42px;padding-top:14px;border-top:1px solid #d9d5cc;
                      display:flex;justify-content:space-between;color:#98958c;font-size:7px;
                      letter-spacing:.1em}
                  </style>
                </head>
                <body>
                  <main class="wrap">
                    <div class="brand">JOURNEY</div>
                    <div class="sub">PRIVATE TRAVEL PLANNER</div>
                    <div class="line"></div>
                    <div class="kicker">PRIVATE ACCESS</div>
                    <h1>你的旅程，<br>只对你开放。</h1>
                    <p class="lead">输入访问码，进入你的私人旅行空间。</p>
                    <form method="post" action="/api/login">
                      <input type="hidden" name="next" value="__NEXT__">
                      <label for="password">ACCESS CODE</label>
                      <input id="password" name="password" type="password" required autofocus
                        autocomplete="current-password" autocapitalize="off" spellcheck="false"
                        placeholder="••••-••••">
                      __ERROR__
                      <button type="submit">进入 JOURNEY</button>
                    </form>
                    <div class="foot"><span>JOURNEY NOTES</span><span>MMXXVI</span></div>
                  </main>
                </body>
                </html>
                """.replace("__NEXT__", escapeHtml(next)).replace("__ERROR__", errorBlock);
    }

    private static String escapeHtml(String value) {
        if (value == null) return "";
        return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                .replace("\"", "&quot;").replace("'", "&#39;");
    }

    private static void sendRedirect(HttpExchange exchange, String location) throws IOException {
        exchange.getResponseHeaders().set("Location", location);
        exchange.getResponseHeaders().set("Cache-Control", "no-store");
        exchange.sendResponseHeaders(303, -1);
        exchange.close();
    }

    private static final class StaticHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String method = exchange.getRequestMethod();
            if (!method.equals("GET") && !method.equals("HEAD")) {
                sendText(exchange, 405, "Method Not Allowed", "text/plain; charset=utf-8");
                return;
            }

            String rawPath = exchange.getRequestURI().getPath();
            String path;
            try {
                path = URLDecoder.decode(rawPath, StandardCharsets.UTF_8);
            } catch (IllegalArgumentException e) {
                sendText(exchange, 400, "Bad Request", "text/plain; charset=utf-8");
                return;
            }
            if (path.contains("\0")) {
                sendText(exchange, 400, "Bad Request", "text/plain; charset=utf-8");
                return;
            }
            if (path.equals("/favicon.ico")) {
                exchange.sendResponseHeaders(204, -1);
                exchange.close();
                return;
            }
            if (path.equals("/login")) {
                if (!authEnabled || isAuthenticated(exchange)) {
                    sendRedirect(exchange, "/");
                } else {
                    sendLoginPage(exchange, 200, "", "/");
                }
                return;
            }
            if (path.equals("/") || path.isEmpty()) {
                path = "/index.html";
            }
            if (authEnabled && !isAuthenticated(exchange)
                    && (path.equals("/index.html") || path.endsWith(".html"))) {
                sendRedirect(exchange, "/login");
                return;
            }

            Path candidate;
            try {
                candidate = webRoot.resolve(path.substring(1)).normalize();
            } catch (Exception e) {
                sendText(exchange, 400, "Bad Request", "text/plain; charset=utf-8");
                return;
            }
            if (!candidate.startsWith(webRoot)) {
                sendText(exchange, 403, "Forbidden", "text/plain; charset=utf-8");
                return;
            }
            if (Files.isDirectory(candidate)) {
                candidate = candidate.resolve("index.html").normalize();
            }
            if (!Files.isRegularFile(candidate)) {
                sendPage(exchange, 404, "404 · 这一页还没有被写进 Journey",
                        "你访问的页面不存在。返回 <a href=\"/\">Journey</a>。");
                return;
            }

            byte[] bytes = Files.readAllBytes(candidate);
            boolean gzip = acceptsGzip(exchange) && bytes.length > 700 && isCompressible(candidate);
            if (gzip) bytes = gzip(bytes);
            Headers headers = exchange.getResponseHeaders();
            headers.set("Content-Type", mimeType(candidate));
            headers.set("X-Content-Type-Options", "nosniff");
            headers.set("X-Robots-Tag", "noindex, nofollow");
            headers.set("Referrer-Policy", "same-origin");
            headers.set("Cache-Control", candidate.getFileName().toString().equals("index.html")
                    ? "no-cache" : "no-cache, must-revalidate");
            if (gzip) {
                headers.set("Content-Encoding", "gzip");
                headers.set("Vary", "Accept-Encoding");
            }
            headers.set("Content-Length", String.valueOf(bytes.length));
            exchange.sendResponseHeaders(200, method.equals("HEAD") ? -1 : bytes.length);
            if (!method.equals("HEAD")) {
                try (OutputStream out = exchange.getResponseBody()) {
                    out.write(bytes);
                }
            }
            exchange.close();
        }
    }

    private static final class ApiHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addApiHeaders(exchange.getResponseHeaders());
            String path = exchange.getRequestURI().getPath();
            String method = exchange.getRequestMethod();

            if (path.equals("/api/health") && method.equals("GET")) {
                String json = "{\"ok\":true,\"app\":\"" + APP_NAME + "\",\"time\":\""
                        + Instant.now() + "\",\"planExists\":" + Files.isRegularFile(planFile)
                        + ",\"authEnabled\":" + authEnabled + ",\"online\":" + onlineMode + "}";
                sendJson(exchange, 200, json);
                return;
            }

            if (path.equals("/api/session") && method.equals("GET")) {
                sendJson(exchange, 200, "{\"authEnabled\":" + authEnabled
                        + ",\"authenticated\":" + isAuthenticated(exchange) + "}");
                return;
            }

            if (path.equals("/api/login") && method.equals("POST")) {
                if (!authEnabled) {
                    sendRedirect(exchange, "/");
                } else {
                    handleLogin(exchange);
                }
                return;
            }

            if (path.equals("/api/logout") && method.equals("POST")) {
                handleLogout(exchange);
                return;
            }

            if (authEnabled && !isAuthenticated(exchange)) {
                sendJson(exchange, 401, "{\"ok\":false,\"error\":\"请先登录\"}");
                return;
            }

            if (path.equals("/api/plan") && method.equals("GET")) {
                if (Files.isRegularFile(planFile)) {
                    byte[] bytes = Files.readAllBytes(planFile);
                    if (acceptsGzip(exchange) && bytes.length > 700) {
                        bytes = gzip(bytes);
                        exchange.getResponseHeaders().set("Content-Encoding", "gzip");
                        exchange.getResponseHeaders().set("Vary", "Accept-Encoding");
                    }
                    sendBytes(exchange, 200, "application/json; charset=utf-8", bytes);
                } else {
                    sendJson(exchange, 200, "{\"version\":1,\"title\":\"我的旅行计划\",\"items\":[],\"updatedAt\":null}");
                }
                return;
            }

            if (path.equals("/api/plan") && (method.equals("PUT") || method.equals("POST"))) {
                String contentType = exchange.getRequestHeaders().getFirst("Content-Type");
                if (contentType == null || !contentType.toLowerCase(Locale.ROOT).contains("application/json")) {
                    sendJson(exchange, 415, "{\"ok\":false,\"error\":\"Content-Type 必须是 application/json\"}");
                    return;
                }
                byte[] body;
                try (InputStream in = exchange.getRequestBody()) {
                    body = in.readNBytes(MAX_PLAN_BYTES + 1);
                }
                if (body.length > MAX_PLAN_BYTES) {
                    sendJson(exchange, 413, "{\"ok\":false,\"error\":\"行程数据超过 2 MB\"}");
                    return;
                }
                if (body.length < 2) {
                    sendJson(exchange, 400, "{\"ok\":false,\"error\":\"空请求\"}");
                    return;
                }
                String text = new String(body, StandardCharsets.UTF_8);
                try {
                    JsonValidator.validate(text);
                } catch (IllegalArgumentException e) {
                    sendJson(exchange, 400, "{\"ok\":false,\"error\":\"行程 JSON 无效：" + escapeJson(e.getMessage()) + "\"}");
                    return;
                }
                savePlan(body);
                sendJson(exchange, 200, "{\"ok\":true,\"savedAt\":\"" + LocalDateTime.now().format(TIME_FMT) + "\"}");
                return;
            }

            if (path.equals("/api/plan") && method.equals("DELETE")) {
                Files.deleteIfExists(planFile);
                sendJson(exchange, 200, "{\"ok\":true}");
                return;
            }

            sendJson(exchange, 404, "{\"ok\":false,\"error\":\"API 不存在\"}");
        }
    }

    private static synchronized void savePlan(byte[] body) throws IOException {
        Files.createDirectories(dataDir);
        if (Files.isRegularFile(planFile)) {
            Files.copy(planFile, planBackup, StandardCopyOption.REPLACE_EXISTING);
        }
        Path temp = dataDir.resolve("plan.json.tmp");
        Files.write(temp, body);
        try {
            Files.move(temp, planFile, StandardCopyOption.REPLACE_EXISTING, StandardCopyOption.ATOMIC_MOVE);
        } catch (AtomicMoveNotSupportedException e) {
            Files.move(temp, planFile, StandardCopyOption.REPLACE_EXISTING);
        }
        System.out.println("[" + LocalDateTime.now().format(TIME_FMT) + "] 已保存行程：" + body.length + " bytes");
    }

    private static void addApiHeaders(Headers headers) {
        headers.set("Content-Type", "application/json; charset=utf-8");
        headers.set("Cache-Control", "no-store");
        headers.set("X-Content-Type-Options", "nosniff");
        headers.set("X-Robots-Tag", "noindex, nofollow");
    }

    private static void sendJson(HttpExchange exchange, int status, String json) throws IOException {
        sendBytes(exchange, status, "application/json; charset=utf-8", json.getBytes(StandardCharsets.UTF_8));
    }

    private static void sendText(HttpExchange exchange, int status, String text, String contentType) throws IOException {
        sendBytes(exchange, status, contentType, text.getBytes(StandardCharsets.UTF_8));
    }

    private static void sendBytes(HttpExchange exchange, int status, String contentType, byte[] bytes) throws IOException {
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.getResponseHeaders().set("Cache-Control", "no-store");
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream out = exchange.getResponseBody()) {
            out.write(bytes);
        }
        exchange.close();
    }

    private static void sendPage(HttpExchange exchange, int status, String title, String body) throws IOException {
        String html = "<!doctype html><html lang=\"zh-CN\"><meta charset=\"utf-8\">"
                + "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
                + "<title>" + title + "</title>"
                + "<style>body{font-family:'Helvetica Neue','PingFang SC','Microsoft YaHei',sans-serif;background:#f5f3ee;color:#151513;"
                + "display:grid;place-items:center;min-height:100vh;margin:0;padding:24px}.card{max-width:520px;padding:44px;"
                + "border:1px solid #d9d5cc;background:#fffefa;border-radius:2px}"
                + "h1{font-size:29px;font-weight:450;letter-spacing:-.04em;margin:0 0 12px}p{font-size:11px;line-height:1.8;color:#77746b}"
                + "a{color:#151513;text-underline-offset:4px}</style><div class=\"card\"><h1>" + title + "</h1><p>" + body + "</p></div></html>";
        sendBytes(exchange, status, "text/html; charset=utf-8", html.getBytes(StandardCharsets.UTF_8));
    }

    private static boolean acceptsGzip(HttpExchange exchange) {
        String encoding = exchange.getRequestHeaders().getFirst("Accept-Encoding");
        return encoding != null && encoding.toLowerCase(Locale.ROOT).contains("gzip");
    }

    private static boolean isCompressible(Path file) {
        String name = file.getFileName().toString().toLowerCase(Locale.ROOT);
        return name.endsWith(".html") || name.endsWith(".css") || name.endsWith(".js")
                || name.endsWith(".json") || name.endsWith(".svg") || name.endsWith(".webmanifest");
    }

    private static byte[] gzip(byte[] input) throws IOException {
        ByteArrayOutputStream buffer = new ByteArrayOutputStream(Math.max(256, input.length / 3));
        try (GZIPOutputStream out = new GZIPOutputStream(buffer)) {
            out.write(input);
        }
        return buffer.toByteArray();
    }

    private static String mimeType(Path file) {
        String name = file.getFileName().toString().toLowerCase(Locale.ROOT);
        if (name.endsWith(".html") || name.endsWith(".htm")) return "text/html; charset=utf-8";
        if (name.endsWith(".css")) return "text/css; charset=utf-8";
        if (name.endsWith(".js") || name.endsWith(".mjs")) return "application/javascript; charset=utf-8";
        if (name.endsWith(".json")) return "application/json; charset=utf-8";
        if (name.endsWith(".webmanifest")) return "application/manifest+json; charset=utf-8";
        if (name.endsWith(".svg")) return "image/svg+xml; charset=utf-8";
        if (name.endsWith(".png")) return "image/png";
        if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
        if (name.endsWith(".webp")) return "image/webp";
        if (name.endsWith(".ico")) return "image/x-icon";
        if (name.endsWith(".woff2")) return "font/woff2";
        if (name.endsWith(".txt") || name.endsWith(".md")) return "text/plain; charset=utf-8";
        return "application/octet-stream";
    }

    private static String escapeJson(String value) {
        if (value == null) return "";
        return value.replace("\\", "\\\\").replace("\"", "\\\"")
                .replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t");
    }

    /** 极简 JSON 校验器：只做结构校验，不构建对象，避免引入第三方库。 */
    private static final class JsonValidator {
        private final String s;
        private int i;

        private JsonValidator(String s) {
            this.s = s;
        }

        static void validate(String text) {
            JsonValidator p = new JsonValidator(text);
            p.skipWs();
            p.value(0);
            p.skipWs();
            if (p.i != p.s.length()) {
                throw p.error("JSON 结束后还有多余内容");
            }
        }

        private void value(int depth) {
            if (depth > 64) throw error("JSON 嵌套过深");
            skipWs();
            if (i >= s.length()) throw error("JSON 意外结束");
            char c = s.charAt(i);
            switch (c) {
                case '{' -> object(depth + 1);
                case '[' -> array(depth + 1);
                case '"' -> string();
                case 't' -> literal("true");
                case 'f' -> literal("false");
                case 'n' -> literal("null");
                default -> number();
            }
        }

        private void object(int depth) {
            expect('{');
            skipWs();
            if (peek('}')) {
                i++;
                return;
            }
            while (true) {
                skipWs();
                if (!peek('"')) throw error("对象的键必须是字符串");
                string();
                skipWs();
                expect(':');
                value(depth);
                skipWs();
                if (peek('}')) {
                    i++;
                    return;
                }
                expect(',');
            }
        }

        private void array(int depth) {
            expect('[');
            skipWs();
            if (peek(']')) {
                i++;
                return;
            }
            while (true) {
                value(depth);
                skipWs();
                if (peek(']')) {
                    i++;
                    return;
                }
                expect(',');
            }
        }

        private void string() {
            expect('"');
            while (i < s.length()) {
                char c = s.charAt(i++);
                if (c == '"') return;
                if (c == '\\') {
                    if (i >= s.length()) throw error("字符串转义不完整");
                    char e = s.charAt(i++);
                    if (e == 'u') {
                        for (int k = 0; k < 4; k++) {
                            if (i >= s.length() || Character.digit(s.charAt(i++), 16) < 0) {
                                throw error("Unicode 转义无效");
                            }
                        }
                    } else if ("\"\\/bfnrt".indexOf(e) < 0) {
                        throw error("无效的字符串转义");
                    }
                } else if (c < 0x20) {
                    throw error("字符串包含未转义的控制字符");
                }
            }
            throw error("字符串未闭合");
        }

        private void number() {
            int start = i;
            if (peek('-')) i++;
            if (i >= s.length()) throw error("数字不完整");
            if (peek('0')) {
                i++;
            } else {
                if (!isDigit(s.charAt(i))) throw error("数字格式错误");
                while (i < s.length() && isDigit(s.charAt(i))) i++;
            }
            if (i < s.length() && s.charAt(i) == '.') {
                i++;
                if (i >= s.length() || !isDigit(s.charAt(i))) throw error("小数格式错误");
                while (i < s.length() && isDigit(s.charAt(i))) i++;
            }
            if (i < s.length() && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                i++;
                if (i < s.length() && (s.charAt(i) == '+' || s.charAt(i) == '-')) i++;
                if (i >= s.length() || !isDigit(s.charAt(i))) throw error("指数格式错误");
                while (i < s.length() && isDigit(s.charAt(i))) i++;
            }
            if (i == start) throw error("此处需要一个 JSON 值");
        }

        private void literal(String word) {
            if (!s.startsWith(word, i)) throw error("无效的字面量");
            i += word.length();
        }

        private void expect(char c) {
            skipWs();
            if (i >= s.length() || s.charAt(i) != c) {
                throw error("期望字符 '" + c + "'");
            }
            i++;
        }

        private boolean peek(char c) {
            return i < s.length() && s.charAt(i) == c;
        }

        private void skipWs() {
            while (i < s.length()) {
                char c = s.charAt(i);
                if (c == ' ' || c == '\n' || c == '\r' || c == '\t') i++;
                else break;
            }
        }

        private static boolean isDigit(char c) {
            return c >= '0' && c <= '9';
        }

        private IllegalArgumentException error(String message) {
            return new IllegalArgumentException(message + "（位置 " + i + "）");
        }
    }
}
