---
title: asyncio 超时与任务取消，谁负责收尾
createTime: 2026/11/23 14:59:00
permalink: /python/asyncio-timeouts-and-cancellation/
---

学习工作台的 AI 功能会等待上游响应，同时观察用户是否已经取消。当任一侧先结束，另一侧的任务也要收尾。否则页面已经收到超时结果，后台协程仍可能继续占用连接。

## 区分网络等待与整次操作预算

| 边界 | 约束对象 |
| --- | --- |
| HTTPX 的 connect、read、write、pool timeout | 建连、等待读取数据块、等待写入数据块、等待连接池 |
| `asyncio.timeout(total_seconds)` | 此上下文所包住的整段异步工作 |
| 调用方取消 | 调用方已提前结束等待，当前任务应清理资源并继续传播取消 |

HTTPX 的 read timeout 针对等待读取数据块。上游不断送来小块数据时，整次响应仍可能超过页面可以等的时间。需要总预算时，应把希望计入预算的步骤都放进外层作用域，或从同一个截止时间计算各阶段的剩余预算。 [HTTPX · Timeouts](https://www.python-httpx.org/advanced/timeouts/)

`asyncio.timeout()` 到期后会取消当前任务，并在退出上下文时把它自己触发的取消转换成 `TimeoutError`。因此在上下文外捕获 `TimeoutError`。调用方主动取消仍以 `CancelledError` 传播。清理资源放在 `finally`，如果为记录状态捕获了取消，处理后应继续抛出。 [Python · Task Cancellation and Timeouts](https://docs.python.org/3/library/asyncio-task.html)

## 用断言确认子任务已经退出

下面用 Python 3.11+ 的 `TaskGroup` 管理子任务。先等子任务确定进入等待，再把截止时间设为当前事件循环时刻，复现一次超时。保存成 `timeout_demo.py` 即可运行，无需调用实际服务。

```python
import asyncio


async def wait_for_upstream(started, stopped):
    started.set()
    try:
        await asyncio.Future()
    finally:
        stopped.set()


async def main():
    started = asyncio.Event()
    stopped = asyncio.Event()

    try:
        async with asyncio.timeout(None) as deadline:
            async with asyncio.TaskGroup() as tasks:
                task = tasks.create_task(wait_for_upstream(started, stopped))
                await started.wait()
                deadline.reschedule(asyncio.get_running_loop().time())
                await task
    except TimeoutError:
        assert task.cancelled()
        assert stopped.is_set()
    else:
        raise AssertionError("应触发超时")


asyncio.run(main())
```

使用 `asyncio.wait(..., return_when=asyncio.FIRST_COMPLETED)` 时，返回结果会分成完成和未完成两组。调用方仍需取消并等待剩下的任务。工作台用这一方式同时等待上游和取消观察器，在 `finally` 中处理两者。对于较简单的父子任务，`TaskGroup` 可以统一管理异常和取消；若一个子任务正常结束后就要停止另一个，仍需由调用方表达这条规则。

取消本地等待后，上游可能已经处理请求。如果调用涉及费用或写入，应保留本次操作的状态，并按上游协议核对结果，再决定是否重试。这个边界和[编辑器自动保存](../../blog/前端工程/自动保存与草稿恢复.md)中「写入成功、响应丢失」的问题相通。
