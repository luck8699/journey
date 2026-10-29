# Journey · 在线部署

Journey 现在有两种在线方式：

1. **临时公网链接**：电脑开着，运行 `start-online.bat`，几十秒后得到一个 `https://…trycloudflare.com` 地址，手机可以直接打开。
2. **固定部署**：把项目放到 Render / Railway / 自己的 VPS，得到一个长期域名，电脑关机也能访问。

无论哪种方式，都必须设置访问码；没有访问码的人只能看到登录页。

---

## 一、手机临时访问（最快）

1. 双击 `start-online.bat`。
2. 窗口会显示：
   - `手机访问 https://xxxx.trycloudflare.com`
   - `访问码 XXXX-XXXX`
3. 把这个地址发到手机上打开，输入访问码即可。
4. 关闭窗口或按 `Ctrl+C` 后链接失效。

说明：

- 这个方式使用项目内置的 `cloudflared.exe`（Cloudflare Quick Tunnel），电脑和窗口必须保持开启。
- 地址是随机生成的，每次启动都可能变化；Cloudflare 不为免费临时隧道提供可用性保证。
- 公网地址已经自动复制到剪贴板。
- 如果隧道建立失败，稍后重试；或使用下面的固定部署。

---

## 二、固定部署到 Render（推荐，免费可开始）

项目自带 `Dockerfile` 和 `render.yaml`。

1. 把整个 `journey` 目录推送到 GitHub 仓库。
2. 打开 [Render](https://render.com/)，新建 **Blueprint**，选择这个仓库。
3. Render 会读取 `render.yaml`，创建 Docker Web Service。
4. 在环境变量里设置：
   - `JOURNEY_PASSWORD`：你自己的访问码，建议 12 位以上。
   - `JOURNEY_ONLINE=1`（yaml 已配置）。
5. 部署完成后，Render 会给你一个 `https://journey-xxxx.onrender.com` 地址。

注意：

- Render 免费实例在一段时间无访问后会休眠，再次打开需要等几十秒。
- 免费实例的文件系统是临时的：重新部署/重启后 `data/plan.json` 可能丢失。需要长期保存时，在 Render 增加一个 Persistent Disk，挂载到 `/app/data`（付费功能），并在 `render.yaml` 里取消下面这段注释：

```yaml
# disk:
#   name: journey-data
#   mountPath: /app/data
#   sizeGB: 1
```

- 绑定自己的域名：Render → Settings → Custom Domain，按提示加 DNS。

---

## 三、固定部署到自己的 VPS（最稳）

服务器要求：Linux + Docker + Docker Compose，开放 80/443。

```bash
git clone <your-repo> journey
cd journey
cp .env.example .env
# 编辑 .env，把 JOURNEY_PASSWORD 改成长访问码
docker compose up -d --build
```

默认映射 `8080` 端口。建议用 Caddy 或 Nginx 反向代理并启用 HTTPS，例如 Caddy：

```caddyfile
journey.example.com {
    reverse_proxy 127.0.0.1:8080
}
```

数据卷是 `./data`，备份时复制：

```text
data/plan.json
data/plan.backup.json
```

升级：

```bash
docker compose up -d --build
```

---

## 四、在家用 Cloudflare Tunnel + 自己的域名

如果你有域名、希望电脑关机也能访问，最稳妥的是把 Journey 放到 VPS/Render；如果希望留在家里电脑，则可以用 Cloudflare Named Tunnel：

1. 安装 `cloudflared` 并登录 Cloudflare。
2. 创建 tunnel，公开主机名指向 `http://127.0.0.1:8080`。
3. 让 Java 服务以在线模式启动：
   ```powershell
   $env:JOURNEY_PASSWORD="你的访问码"
   java "-Dfile.encoding=UTF-8" --add-modules jdk.httpserver -cp out TravelPlannerServer --online
   ```
4. 把 tunnel 注册为 Windows 服务，保证开机自动运行。

这种方式需要电脑保持开机，但域名固定，且不依赖第三方临时链接。

---

## 五、环境变量

| 变量 | 说明 |
| --- | --- |
| `PORT` | 监听端口，Render/Railway 会自动注入 |
| `JOURNEY_ONLINE` | `1` 开启在线模式，监听 `0.0.0.0` |
| `JOURNEY_PASSWORD` | 访问码；强烈建议设置 |
| `JOURNEY_DATA_DIR` | 数据目录，Docker 中为 `/app/data` |
| `JOURNEY_HOST` | 可选监听地址，默认 `127.0.0.1` |

本地不带访问码启动：

```powershell
java "-Dfile.encoding=UTF-8" --add-modules jdk.httpserver -cp out TravelPlannerServer --open
```

在线模式启动（会生成访问码）：

```powershell
java "-Dfile.encoding=UTF-8" --add-modules jdk.httpserver -cp out TravelPlannerServer --online --open
```

---

## 六、安全建议

- 不要使用 `1234`、生日、手机号作为访问码。
- 不要把公网地址和访问码发到公开群聊。
- 在线模式只通过 HTTPS 访问；Java 会自动给 Cookie 加 `Secure`。
- 计划数据只保存在服务器的 `data/plan.json`，没有第三方数据库。
- 建议每周导出一次 Markdown 行程，作为离线备份。
