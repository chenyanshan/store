# 零售创业案例数据库

一个部署到 Cloudflare Workers 的中文案例数据库站点，数据源来自 `data.js`，构建时转换为 JSON。

当前已包含学习模式第一版（`/study`）：学习 ID + 4 位数字恢复码打开档案、顺序浏览、收藏、进度同步。

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

## D1 初始化（学习功能）

1. 创建 D1 数据库（只需一次）：

```bash
wrangler d1 create retail-case-database
```

2. 将返回的 `database_id` 填入 `wrangler.jsonc` 的 `d1_databases[0].database_id`，并确认 `d1_databases[0].binding` 为 `DB`。

3. 本地应用迁移：

```bash
npm run db:migrate:local
```

4. 线上应用迁移：

```bash
npm run db:migrate:remote
```

## 项目结构

- `data.js`: 原始案例数据（唯一真源）
- `scripts/build.mjs`: 构建脚本，输出 `dist/data/cases.json`
- `src/`: 前端静态资源（列表页、关键词搜索、筛选、聚合、详情弹窗、知识总结页、学习模式页）
- `dist/`: 构建产物目录
- `worker.js`: Workers 入口（学习 API + 静态资源分发）
- `migrations/`: D1 迁移脚本
- `wrangler.jsonc`: Cloudflare Workers 配置
