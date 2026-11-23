---
title: SQLAlchemy 事务与回滚，flush 之后发生了什么
createTime: 2026/11/23 15:00:00
permalink: /python/sqlalchemy-transactions-and-rollback/
---

学习工作台的任务跨列移动会修改两列顺序、任务状态和完成统计。一次请求里如果先提交顺序，再更新统计，第二步失败时就可能留下部分结果。这个场景适合由服务层为整次写入划一个事务边界。

## 理解 add、flush 和 commit

| 调用 | 在这个阶段做什么 |
| --- | --- |
| `session.add(obj)` | 把对象纳入会话，等待写入 |
| `session.flush()` | 把变更同步到当前事务，执行 SQL，可以取得自增主键或及早发现约束问题 |
| `session.commit()` | 先 flush 待处理变更，再提交事务 |
| `session.rollback()` | 放弃当前事务中尚未提交的改动 |

服务函数中可以多次 flush，让后续步骤使用新主键或查询本事务中的变化。提交由外层事务负责。SQLAlchemy 默认也会在部分查询前自动 flush，所以判断「写入是否已经提交」需要看事务边界。 [SQLAlchemy · Session Basics](https://docs.sqlalchemy.org/en/20/orm/session_basics.html)

## 验证 SQL 已执行时仍能整笔回滚

以下使用 SQLAlchemy 2 的同步会话和内存 SQLite，便于单文件运行。保存成 `transaction_demo.py`。示例故意在两个对象已写入当前事务后让服务失败，然后从新会话读回数据库。

```python
from sqlalchemy import create_engine, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker


class Base(DeclarativeBase):
    pass


class Task(Base):
    __tablename__ = "tasks"
    id: Mapped[int] = mapped_column(primary_key=True)
    status: Mapped[str]


class SimulatedFailure(Exception):
    pass


engine = create_engine("sqlite+pysqlite:///:memory:")
Base.metadata.create_all(engine)
sessions = sessionmaker(engine)

with sessions.begin() as session:
    session.add_all([Task(id=1, status="todo"), Task(id=2, status="todo")])

try:
    with sessions.begin() as session:
        for task in session.scalars(select(Task)):
            task.status = "done"
        session.flush()
        assert session.scalars(select(Task.status).order_by(Task.id)).all() == ["done", "done"]
        raise SimulatedFailure()
except SimulatedFailure:
    pass

with sessions() as session:
    assert session.scalars(select(Task.status).order_by(Task.id)).all() == ["todo", "todo"]
```

异常需要离开事务上下文，让上下文管理器执行回滚。若在内部捕获异常后正常返回，上下文可能正在走提交路径；若已发生 flush 失败，应回滚或结束会话，再开始后续操作。示例只验证事务语义，并发锁和数据库隔离级别需要在部署所用的数据库上复验。

## 放回 FastAPI 的异步服务层

异步项目通常由依赖或服务工厂提供 `AsyncSession`，写操作用 `async with session.begin():` 包住读版本、校验和更新。事务从这次写操作的第一条 SQL 开始安排，避免先触发隐式事务再开启同一会话的顶层事务。多个并发协程各用一个会话，单次原子写入的步骤顺序执行。 [SQLAlchemy · Asynchronous I/O](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)

在[任务看板原子排序](../../blog/前端工程/任务看板的原子排序.md)里，服务端在事务内锁定受影响列的记录，检查完整任务集合和各项版本，随后写状态、顺序和统计。回归测试需要用新会话看两列和统计值，确认冲突后没有部分写入。
