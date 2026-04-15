# 智慧车选 (AI-Car-Selection)

一个基于 AI 的智能汽车推荐系统，帮助用户根据预算和需求找到最合适的汽车。

## 项目结构

```
car-rec/
├── car-backed/       # Node.js + Express 后端服务
│   └── src/
│       ├── server.js           # 服务入口
│       ├── app.js              # Express 应用配置
│       ├── config/             # 环境配置
│       ├── controllers/        # 控制器
│       ├── routes/             # 路由
│       ├── services/           # 业务逻辑服务
│       └── data/              # 汽车数据
│
└── car-uniapp/       # uni-app 前端应用
    ├── pages/                  # 页面组件
    ├── utils/                  # 工具函数
    └── manifest.json           # uni-app 配置
```

## 技术栈

**后端**
- Node.js
- Express
- LLM 集成（智能推荐）

**前端**
- uni-app
- Vue

## 快速开始

### 后端服务

```bash
cd car-backed
pnpm install
pnpm dev
```

服务启动后运行在 `http://localhost:3000`

### 前端应用

使用 HBuilderX 打开 `car-uniapp` 目录，运行即可。

## API 接口

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/recommend | 获取汽车推荐 |

## License

MIT
