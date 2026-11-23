---
title: FastAPI UploadFile，怎么限制上传大小和识别坏文件
createTime: 2026/11/23 15:16:00
permalink: /python/fastapi/upload-file-limits/
---

用一个小型文本预览接口练习文件上传。它收一个文件和一个名为 `label` 的表单字段，读取最多 1 KiB 的 UTF-8 文本。超出大小与编码不支持分别返回不同的状态码，前端可以给出相应提示。

## 为接口选择 UploadFile

把文件声明为 `bytes` 时，FastAPI 会将整个文件内容传给处理函数。`UploadFile` 使用可转存到磁盘的临时文件，能分段读取，也提供文件名和媒体类型。文件上传使用 `multipart/form-data`，同次请求的其他字段可以用 `Form()` 提取。浏览器用 `FormData` 发请求时，交给浏览器生成带 boundary 的 `Content-Type`。 [FastAPI · Request Files](https://fastapi.tiangolo.com/tutorial/request-files/)

## 先看字节数，再做解码

示例只需要保留一小段文本。读取限制值加一字节就能区分正好到上限和已超出上限。读完后关闭临时文件。文件名与声明的媒体类型来自客户端，示例通过实际字节检查 UTF-8 编码。

```python
from typing import Annotated

from fastapi import FastAPI, Form, HTTPException, UploadFile
from fastapi.testclient import TestClient

app = FastAPI()
MAX_BYTES = 1024


@app.post("/preview")
async def preview(file: UploadFile, label: Annotated[str, Form()]):
    try:
        data = await file.read(MAX_BYTES + 1)
    finally:
        await file.close()

    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="预览文件最多 1 KiB")

    try:
        text = data.decode("utf-8")
    except UnicodeDecodeError as exc:
        raise HTTPException(status_code=415, detail="请提供 UTF-8 文本") from exc

    return {"label": label, "bytes": len(data), "text": text}


with TestClient(app) as client:
    accepted = client.post(
        "/preview",
        data={"label": "示例"},
        files={"file": ("note.txt", "你好".encode(), "text/plain")},
    )
    assert accepted.status_code == 200
    assert accepted.json() == {"label": "示例", "bytes": 6, "text": "你好"}

    for data, status in ((b"a" * 1024, 200), (b"a" * 1025, 413), (b"\xff", 415)):
        response = client.post(
            "/preview",
            data={"label": "边界测试"},
            files={"file": ("note.txt", data, "text/plain")},
        )
        assert response.status_code == status

    assert client.post("/preview", files={"file": ("note.txt", b"ok")}).status_code == 422
```

保存成 `upload_demo.py` 后可直接运行。这篇需要安装 [专题依赖](./README.md) 中的 `python-multipart`。

## 区分传输层限制与业务限制

示例里的 1 KiB 限制发生在路由函数里。执行到这里时，框架已经解析 multipart 并准备好了 `UploadFile`。入口网关或服务器仍需要独立限制请求体总量，覆盖 multipart 的其他字段与协议开销。入口返回的 413 可能采用不同的响应格式，联调时可以分别验证两条路径。 [Starlette · Request Files](https://starlette.dev/requests/#request-files)

大型文件通常边读边处理并累计字节数。需要保留上传时，由服务端生成存储标识，原始文件名可作为展示信息。回归至少检查正好到达上限、多一字节、编码错误和缺少表单字段。前端的文件大小预检可以减少等待，最终结果以服务端校验为准。
