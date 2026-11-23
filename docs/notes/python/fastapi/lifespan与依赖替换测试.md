---
title: FastAPI lifespan 与依赖替换，测试也要走启动和关闭
createTime: 2026/11/23 15:14:00
permalink: /python/fastapi/lifespan-and-test-overrides/
---

数据库连接池、HTTP 客户端或只读索引通常会被多个请求使用。可以在应用启动时创建，在应用关闭时释放。测试只关心路由如何使用资源时，用依赖替换注入一个小的内存对象，就能对照真实依赖和替身的行为。

## 应用启动时创建，退出时关闭

`lifespan` 是一个异步上下文管理器。进入 `yield` 前完成初始化，`yield` 后清理。多个 worker 各有自己的应用生命周期，进程内的共享对象会各自创建一份。可以把对象挂到 `app.state`，再由依赖从当前请求取得。 [FastAPI · Lifespan Events](https://fastapi.tiangolo.com/advanced/events/)

下面用简化的目录服务演示。测试先断言正常依赖，再临时替换，并在关闭后断言共享资源已经释放。

```python
from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Depends, FastAPI, Request
from fastapi.testclient import TestClient


class Catalog:
    def __init__(self, title: str):
        self.title = title
        self.closed = False

    def close(self):
        self.closed = True


@asynccontextmanager
async def lifespan(app: FastAPI):
    catalog = Catalog("默认目录")
    app.state.catalog = catalog
    try:
        yield
    finally:
        catalog.close()


def get_catalog(request: Request) -> Catalog:
    return request.app.state.catalog


def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)

    @app.get("/catalog")
    def catalog(service: Annotated[Catalog, Depends(get_catalog)]):
        return {"title": service.title}

    return app


app = create_app()
with TestClient(app) as client:
    shared = app.state.catalog
    assert not shared.closed
    assert client.get("/catalog").json() == {"title": "默认目录"}

    app.dependency_overrides[get_catalog] = lambda: Catalog("测试目录")
    try:
        assert client.get("/catalog").json() == {"title": "测试目录"}
    finally:
        app.dependency_overrides.pop(get_catalog)

    assert client.get("/catalog").json() == {"title": "默认目录"}

assert shared.closed
```

保存成 `lifespan_demo.py`，参考 [专题依赖](./README.md) 安装后直接运行。使用 `with TestClient(app)` 能让测试进入并退出生命周期。若改用 HTTPX 的异步 `ASGITransport`，要另外用 `LifespanManager` 等方式驱动启动和退出。 [FastAPI · Testing Events](https://fastapi.tiangolo.com/advanced/testing-events/) · [FastAPI · Async Tests](https://fastapi.tiangolo.com/advanced/async-tests/)

## 替换范围要和测试目标一致

`dependency_overrides` 的键是原始依赖函数。它只替换请求解析这项依赖时调用的函数，应用的启动代码照常执行。若真实连接在启动阶段就会建立，可以把创建资源的工厂传给 `create_app()`，让测试启动的是内存版本。单测结束恢复覆盖，或者每个测试创建独立应用，避免用例共享替换状态。 [FastAPI · Testing Dependencies with Overrides](https://fastapi.tiangolo.com/advanced/testing-dependencies/)
