# 零售创业案例数据库

一个部署到 Cloudflare Workers 的中文案例数据库站点，数据源来自 `data.js`，构建时转换为 JSON。

## 本地开发

1. 安装依赖：

```bash
npm install
```

2. 生成构建产物：

```bash
npm run build
```

3. 启动本地 Worker：

```bash
npm run dev
```

## 部署

```bash
npm run deploy
```

## 项目结构

- `data.js`: 原始案例数据（唯一真源）
- `scripts/build.mjs`: 构建脚本，输出 `dist/data/cases.json`
- `src/`: 前端静态资源（列表页、关键词搜索、筛选、聚合、详情弹窗、知识总结页）
- `dist/`: 构建产物目录
- `worker.js`: Workers 入口，交由 `ASSETS` 响应静态资源
- `wrangler.jsonc`: Cloudflare Workers 配置
