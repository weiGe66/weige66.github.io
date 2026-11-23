---
title: FastAPI 专题
createTime: 2026/11/23 15:12:00
permalink: /python/fastapi/
comments: false
---

用独立的最小接口练习 FastAPI。每篇都包含请求和断言，可以在本地直接运行。

| 笔记 | 解决的问题 |
| --- | --- |
| [Depends 与请求级资源](./Depends与请求级资源.md) | 一次请求如何复用依赖，发生异常后谁负责清理 |
| [lifespan 与依赖替换测试](./lifespan与依赖替换测试.md) | 应用启动和退出时如何管理共享资源，测试里如何注入替身 |
| [响应模型与错误契约](./响应模型与错误契约.md) | 如何控制返回字段，并让实际响应和 OpenAPI 文档一致 |
| [UploadFile 与上传限制](./UploadFile与上传限制.md) | 如何限制文件大小、处理 multipart 表单和区分上传错误 |
| [局部更新与严格校验](../FastAPI局部更新与严格校验.md) | 如何区分字段省略、显式置空和输入类型错误 |

本专题的新示例使用 Python 3.11+，验证环境为 Python 3.14 和 FastAPI 0.165.0。在独立环境中安装下面的版本，可以复现文内的 `TestClient` 示例。只有上传示例需要 `python-multipart`。

```bash
python -m pip install "fastapi==0.165.0" "httpx2==2.16.2" "python-multipart==0.0.34"
```
