---
title: Python 笔记
createTime: 2026/11/23 14:57:00
permalink: /python/
comments: false
---

从前端开发者接手 Python API 的日常问题开始。示例基于 Python 3.11+，用本地脚本检查行为。

| 笔记 | 可以用来解决什么问题 |
| --- | --- |
| [虚拟环境与 pyproject.toml](./虚拟环境与pyproject.md) | 确认项目实际用哪个 Python，查清依赖由哪里声明、装到哪里 |
| [FastAPI 局部更新与严格校验](./FastAPI局部更新与严格校验.md) | 区分字段省略和显式置空，避免布尔值或字符串被误当作整数 |
| [asyncio 超时与任务取消](./asyncio超时与任务取消.md) | 给整次异步操作设置时间预算，确保超时和取消后子任务能退出 |
| [SQLAlchemy 事务与回滚](./SQLAlchemy事务与回滚.md) | 选择提交边界，理解为什么 flush 后仍能整笔回滚 |
