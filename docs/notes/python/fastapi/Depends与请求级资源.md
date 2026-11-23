---
title: FastAPI Depends，请求级资源谁来关闭
createTime: 2026/11/23 15:13:00
permalink: /python/fastapi/request-dependencies/
---

一个接口可能先用数据库会话读取记录，再用同一会话写审计。两条调用链如果各自创建会话，就难以共享同一笔事务。FastAPI 可以把创建资源的函数声明为依赖，请求中的多个调用方可以共用它的结果。

## 用 yield 划出资源的生命周期

默认情况下，同一依赖的结果在一次请求中可复用。子依赖也走这条规则。下一次请求重新求值。如果确实要在一个依赖声明处重新执行，可用 `Depends(provider, use_cache=False)`。 [FastAPI · Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/)

依赖函数用 `yield` 将资源交给接口，用 `finally` 清理。返回成功或抛出异常时都需要走清理路径。下面用对象身份代表一个临时资源，并记录创建和关闭事件。

```python
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from fastapi.testclient import TestClient

app = FastAPI()
events = []


async def open_resource():
    resource = object()
    events.append("open")
    try:
        yield resource
    finally:
        events.append("close")


Resource = Annotated[object, Depends(open_resource)]


async def nested_dependency(resource: Resource):
    return resource


@app.get("/report")
async def report(
    resource: Resource,
    nested: Annotated[object, Depends(nested_dependency)],
    fail: bool = False,
):
    events.append("handle")
    if fail:
        raise HTTPException(status_code=409, detail="报告尚未就绪")
    return {"shared": resource is nested}


with TestClient(app) as client:
    response = client.get("/report")
    assert response.json() == {"shared": True}
    assert events == ["open", "handle", "close"]

    response = client.get("/report", params={"fail": "true"})
    assert response.status_code == 409
    assert events == ["open", "handle", "close"] * 2
```

保存成 `depends_demo.py`，参考 [专题依赖](./README.md) 安装后用 `python depends_demo.py` 运行。这里的事件列表用于串行断言。实际资源可以是会话或临时文件，依赖负责创建与关闭，读写操作负责业务事务。

## 流式响应需要再看清理时点

| 声明 | `yield` 后的清理时点 |
| --- | --- |
| 默认 `scope="request"` | 响应发送完成后 |
| `scope="function"` | 路由函数结束后、响应发送前 |

如果响应迭代器还要读取游标或文件，资源应活到响应发送完成。若接口在返回前已经读完数据，就可以用函数作用域提前释放占用。带 `yield` 的依赖若捕获异常，应按需要重新抛出或转换，否则外层无法按原异常处理。 [FastAPI · Dependencies with yield](https://fastapi.tiangolo.com/tutorial/dependencies/dependencies-with-yield/)

数据库连接池、共享 HTTP 客户端等跨请求资源可以交给[应用生命周期](./lifespan与依赖替换测试.md)，具体请求再从中取得本次使用的资源。
