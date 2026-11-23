---
title: FastAPI 局部更新，区分省略、null 和错误类型
createTime: 2026/11/23 14:58:00
permalink: /python/fastapi-patch-validation/
---

学习工作台的任务预估时长可以留空，也允许用户清除旧值。编辑表单提交到后端时，「没有改这个字段」和「删除已有值」都可能出现在一次局部更新里。还要防止 `true`、`"30"` 这类值被转换成有效分钟数。

## 先确定接口的四种结果

| JSON 请求体 | 保存效果 |
| --- | --- |
| `{}` | 维持原值 |
| `{"estimated_minutes": null}` | 清空预估时长 |
| `{"estimated_minutes": 30}` | 更新为 30 分钟 |
| `{"estimated_minutes": true}`、`"30"`、`30.0` 或范围外数字 | 返回 422 |

`None` 可以表示模型字段的默认值，也可以来自显式传入的 `null`。用 `model_dump(exclude_unset=True)` 保留实际提供的字段。清空时需要保留 `None`，因此这条路径只排除未提供字段。预估时长使用严格整数并限制范围。 [FastAPI · Body Updates](https://fastapi.tiangolo.com/tutorial/body-updates/) · [Pydantic · Strict Mode](https://docs.pydantic.dev/latest/concepts/strict_mode/)

## 直接测试接口层

以下使用 FastAPI、Pydantic 2 和 HTTPX。保存成 `patch_demo.py` 后用项目解释器执行，HTTPX 的 `ASGITransport` 在进程内调用应用，无需单独启动服务。样例每次都从同一份初始值计算更新，便于对照请求语义。 [FastAPI · Async Tests](https://fastapi.tiangolo.com/advanced/async-tests/)

```python
import asyncio

from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient
from pydantic import BaseModel, ConfigDict, Field, StrictInt


class TaskPatch(BaseModel):
    model_config = ConfigDict(extra="forbid")
    estimated_minutes: StrictInt | None = Field(default=None, ge=1, le=10080)


app = FastAPI()


@app.patch("/tasks/42")
def update_task(patch: TaskPatch):
    current = {"estimated_minutes": 25}
    return {**current, **patch.model_dump(exclude_unset=True)}


async def main():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        for payload, expected in (
            ({}, 25),
            ({"estimated_minutes": None}, None),
            ({"estimated_minutes": 30}, 30),
        ):
            response = await client.patch("/tasks/42", json=payload)
            assert response.status_code == 200
            assert response.json() == {"estimated_minutes": expected}

        for invalid in (True, "30", 30.0, 0, 10081):
            response = await client.patch("/tasks/42", json={"estimated_minutes": invalid})
            assert response.status_code == 422

        response = await client.patch("/tasks/42", json={"estimated_minuts": 30})
        assert response.status_code == 422


asyncio.run(main())
```

前端表单的输入通常先以字符串出现。提交前可以按表单规则转成数字，清空时显式发送 `null`，无改动时省略字段。后端仍负责输入的最终校验。若还涉及版本冲突或多列更新，应把版本检查和数据库写入放进[同一个事务](./SQLAlchemy事务与回滚.md)。
