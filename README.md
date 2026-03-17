# store

基于 `data.js` 的 Cloudflare Workers 站点，包含：

- `/`：案例展示首页（支持按结果、分类筛选 + 关键词搜索，并可点击卡片/“查看详情”按钮弹窗查看完整案例详情）
- `/insights`：总结经验（自动统计高频分类/风险信号）
- `/api/cases`：案例数据接口

## 本地开发

```bash
npm install
npm run dev
```

默认访问：`http://localhost:8787/`。

## 直接部署到 Cloudflare Workers

1. 安装依赖

```bash
npm install
```

2. 登录 Cloudflare（首次部署需要）

```bash
npx wrangler login
```

3. 部署

```bash
npx wrangler deploy
```

部署成功后会得到 `*.workers.dev` 域名，访问根路径 `/` 即可进入案例页。

## 路由说明

- `GET /`：案例页（默认入口）
- `GET /cases`：兼容路由，返回同一页面
- `GET /cases/:id`：案例详情直达路由（页面内自动弹出对应案例详情）
- `GET /insights`：总结经验页
- `GET /api/cases`：返回 JSON 数据
<<<<<<< codex/fix-deployment-issues-on-cloudflare-workers-fkzlly


## 部署配置

- 当前 Workers 项目名：`store-cases-cn`（在 `wrangler.toml` 中配置）
=======
>>>>>>> main
