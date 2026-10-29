# Journey

**A private travel planner, for the places you keep thinking about.**

一个用 Java 写后端的私人旅行规划网页。零第三方依赖、无需数据库；支持手机访问、访问码登录、行程云端保存。视觉上做了极简重排：暖白、墨黑与一点旧金色，更多留白，更少装饰。

![页面预览](preview.png)

---

## 两种打开方式

### 1. 本地使用

需要 **JDK 17+**。

双击 `run.bat`，浏览器打开 `http://127.0.0.1:8080/`。只在本机可用，不需要登录。

### 2. 手机在线访问

双击 `start-online.bat`。

窗口会打印：

```text
Phone URL   https://xxxx.trycloudflare.com
Access code XXXX-XXXX
Tunnel      Cloudflare Tunnel
```

把地址发到手机，输入访问码即可。地址会自动复制到剪贴板。

优先使用项目内置的 `cloudflared.exe` 建立 Cloudflare HTTPS 隧道；如果文件缺失，才回退到 SSH 隧道。

注意：这是临时公网隧道，**电脑和窗口需要保持开启**。关闭窗口后链接失效。

固定网址、电脑关机也能访问：见 [DEPLOY.md](DEPLOY.md)。

---

## 功能

### 国内

- 18 座城市、71 个打卡点。
- 每座城市：最佳季节、建议天数、交通、当地美食、玩法。
- 8 条成熟线路，可一键加入。
- 同城景点按经纬度就近排序，卡片显示“离谁近、多少公里”。
- 每张卡可展开“值得看 / 怎么玩 / 提示”。

### 国际

- 18 个国家，按 **免签 / 面签 / 申签** 分类。
- 每个国家一份签证教程：去哪里申请、材料、步骤、费用、入境需要、官方入口。
- 韩国 C-3-9 个人旅游签证为完整示例。
- 国家标题可拖动，整国加入行程；单个打卡点也可独立加入。
- 同城打卡点按距离排序。

### 行程

- 勾选完成、添加、删除、上移下移、拖动排序。
- 每站显示距上一站距离，顶部显示总路程。
- 保留第 1 站，按距离“就近排序”。
- 从最后一站推荐 3 个最近的下一站。
- 自定义航班、酒店、餐厅等行程。
- 自动保存到服务器 `data/plan.json`，并在浏览器 localStorage 留一份。
- 手机端右侧抽屉；支持安装到主屏幕（PWA）。
- 导出 Markdown、打印行程。

---

## 访问码与隐私

- 在线模式必须登录；没有访问码只能看到登录页。
- 访问码支持环境变量 `JOURNEY_PASSWORD`，也可以由 `start-online.bat` 自动生成。
- 登录后有 30 天 HttpOnly Cookie；服务端有基础登录限流。
- 所有页面带 `noindex`，不会被搜索引擎收录。
- 数据只保存在你自己的服务器上，没有第三方数据库。

---

## 目录

```text
journey/
├─ TravelPlannerServer.java   Java 服务：静态页面、登录、行程 API
├─ run.bat / run.ps1          本地启动
├─ start-online.bat / .ps1    临时公网访问
├─ cloudflared.exe            Cloudflare 隧道客户端
├─ Dockerfile
├─ docker-compose.yml
├─ render.yaml
├─ DEPLOY.md                  固定部署指南
├─ web/
│  ├─ index.html
│  ├─ manifest.webmanifest    PWA
│  ├─ sw.js
│  ├─ icons/
│  ├─ css/styles.css          基础结构
│  ├─ css/journey.css         新视觉主题
│  ├─ js/app.js
│  └─ data/                   国内 / 国际数据
└─ data/
   ├─ plan.json               当前行程
   ├─ plan.backup.json        上一次备份
   └─ access-code.txt         在线模式访问码
```

---

## 修改内容

- 景点、美食、线路：改 `web/data/domestic.js`。
- 国家、签证教程、打卡点：改 `web/data/intl-*.js`。
- 配色、字体、排版：改 `web/css/journey.css`。
- 文案：改 `web/index.html` 和 `web/js/app.js`。
- 刷新页面即可，不需要重启 Java 服务（静态文件）。

---

## 距离与签证说明

- 距离是经纬度的 **Haversine 直线距离**，用于规划参考，不是实际导航距离。
- 签证资料基线为 **2025.06**。政策、费用和材料会变，出发前请以各国使领馆、移民局、签证中心官网为准。
- 免签不等于保证入境，最终由边检决定。
- 页面内容仅供私人旅行规划，不构成法律或签证建议。

常用官方入口已经放进每个国家的签证教程，例如：

- [韩国签证门户](https://www.visa.go.kr/)
- [美国驻华使领馆](https://china.usembassy-china.org.cn/visas/)
- [加拿大 IRCC](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html)
- [日本驻华大使馆](https://www.cn.emb-japan.go.jp/itpr_zh/visa.html)
- [英国政府](https://www.gov.uk/standard-visitor)
- [France-Visas](https://france-visas.gouv.fr/)
- [澳大利亚内政部](https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600)
- [新西兰移民局](https://www.immigration.govt.nz/new-zealand-visas)
- [越南电子签](https://evisa.gov.vn/)

---

## 技术

- Java 21（兼容 17+），JDK 自带 `HttpServer`，无 Maven / Gradle 依赖。
- 原生 HTML / CSS / JavaScript，无前端框架。
- 静态资源 gzip，适合手机网络。
- `TravelPlannerServer` 支持 `--online`、`--password`、`PORT`、`JOURNEY_PASSWORD`、`JOURNEY_DATA_DIR`。

更多部署、域名、数据持久化和安全说明见 [DEPLOY.md](DEPLOY.md)。
