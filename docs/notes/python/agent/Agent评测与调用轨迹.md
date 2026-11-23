---
title: Agent 评测，从看回答到检查调用轨迹
createTime: 2026/11/23 15:20:00
permalink: /python/agent/evals-and-tool-traces/
---

阅读清单助手最后说「已加入」。要判断它是否真的完成任务，需要查到对应条目。还要验证它用的是用户确认过的操作，遇到响应丢失时沿用原 ID，以及在资料不足时能明确说还没完成。

## 为不同场景写出可检查的期望

| 场景 | 检查什么 |
| --- | --- |
| 用户只问「在读几本」 | 回答的数字与数据一致，清单无新增 |
| 用户查看提案后没有确认 | 可以显示草稿，清单无新增 |
| 用户已确认，首次响应丢失 | 重试沿用操作 ID，最后只有一条新增 |
| 查询结果过期或对象不存在 | 界面报告无法继续，等待刷新或改选 |
| 工具预算耗尽 | 返回明确的终止状态，保留已知的提交结果 |

可以为一次运行记录工具名、调用 ID、操作 ID、最终状态和耗时。工具参数与结果只保留评测真正需要的字段。业务结果最好从服务端或数据库另取一份证据，避免把 Agent 自述当成完成证明。 [OpenAI · Evaluate agent workflows](https://developers.openai.com/api/docs/guides/agent-evals)

## 给确认和重放写一个确定性的断言

下面的数据由测试夹具构造，`committed_ids` 表示从业务表单独查到的新增记录所对应的操作 ID。一次已确认的操作可以留下多次写入尝试，最终记录只应有一条。

```python
def passes(events, committed_ids, operation_id):
    confirmed = False
    attempted = False
    for kind, event_id in events:
        if kind == "approved" and event_id == operation_id:
            confirmed = True
        if kind == "write_attempt":
            if not confirmed or event_id != operation_id:
                return False
            attempted = True

    return attempted and committed_ids == [operation_id]


retry_trace = [
    ("approved", "op-1"),
    ("write_attempt", "op-1"),
    ("write_attempt", "op-1"),
]

assert passes(retry_trace, ["op-1"], "op-1")
assert not passes(retry_trace, ["op-1", "op-1"], "op-1")
assert not passes(retry_trace, [], "op-1")
assert not passes(retry_trace[1:], ["op-1"], "op-1")
assert not passes(retry_trace + [("write_attempt", "op-2")], ["op-1"], "op-1")
```

保存成 `trace_eval.py` 后可直接运行。每条断言分别验证最终状态、审批先后和重试身份。具体查了几次书、最后用了哪种措辞，可以留给更合适的指标。

## 用两类测试定位回归

- 每次改动先跑固定夹具和工具替身。覆盖成功、拒绝、超时、重复执行和证据不足等分支，失败时能定位到具体调用。
- 再用实际模型跑一小组代表性任务。比较任务成功率、工具调用量和延迟。模型输出存在波动，可以重复采样，并保存失败案例供复查。

对必须成立的约束直接使用业务断言。对回答是否清晰、是否覆盖重点这类开放问题，再用人工标注或评测器。两种结果一起看，能判断回归来自文案、模型决策还是工具执行。 [OpenAI · Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
