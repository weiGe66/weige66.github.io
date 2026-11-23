---
title: RAG 检索增强生成，从找对片段到答得有依据
createTime: 2026/11/23 15:23:00
permalink: /python/agent/rag-retrieval-and-grounding/
---

用户问阅读清单助手「导出的 CSV 会附带阅读笔记原文吗？」答案取决于当前版本的导出说明。旧版本写着会附带原文，现行说明写着只导出标题和阅读状态。如果只按相似度找资料，这两段都可能排得很靠前。

RAG（Retrieval-Augmented Generation，检索增强生成）会在回答前从资料库查找相关内容，把选出的片段交给模型，再用这些片段组织答案。用固定的「检索 → 回答」流程就能实现。需要让模型决定何时查询或继续查哪份资料时，可以把检索封装成 [Agent 工具](./工具调用与最小循环.md)。 [Microsoft Learn · RAG 概览](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)

## 把片段做成可以定位的证据

按小节切分说明文档时，保留上级标题，让「不含原文」这样的限制和它修饰的功能处在同一块里。表格可以将表头和相关行一起保留。过短的块容易丢上下文，过长的块会引入无关内容。调大小时，先看真实问题需要的那句话是否能被完整召回。

每个片段带稳定 ID、来源文档、章节和版本。回答当前行为时按生效状态过滤。用户明确问旧版本时，可以在有权访问的文档中按指定版本检索，并在引用里标明版本。访问范围由应用按当前账号计算，检索只返回用户可读的片段。 [OpenAI · Retrieval](https://developers.openai.com/api/docs/guides/retrieval)

## 召回、排序和证据选择各自解决什么

| 环节 | 应该看什么 |
| --- | --- |
| 关键词召回 | 产品名、错误码、字段名这类字面匹配是否能找到 |
| 向量召回 | 用户问「能带走正文吗」，能否找到写着「导出不含笔记原文」的说明 |
| 排序与去重 | 最相关的片段是否靠前，近似副本是否占了多个位置 |
| 组装上下文 | 模型收到的片段是否覆盖问题，必要的标题、限制条件和来源 ID 是否保留 |

当字面查询和口语问法都多时，可以合并关键词与向量的候选，再去重或重排。提交给模型的片段数量和长度也有预算。扩大候选集和扩大模型上下文是两件事，可以前者取多一些，后者只保留必要的证据。 [Microsoft Learn · RAG 召回与排序](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)

## 用离线例子验证旧版本和权限过滤

这里用手工关键词和固定片段模拟索引。先按生效状态与访问范围过滤，再按命中词数取前两条。输出部分直接摘录证据，便于在 Python 中复现。实际接入模型时，可以把摘录部分换成基于片段生成并返回引用的步骤。

```python
chunks = [
    {
        "id": "export-v2#csv",
        "scope": "public",
        "current": True,
        "terms": {"导出", "CSV", "原文"},
        "text": "CSV 导出仅包含标题和阅读状态，不包含笔记原文。",
    },
    {
        "id": "export-v1#csv",
        "scope": "public",
        "current": False,
        "terms": {"导出", "CSV", "原文"},
        "text": "旧版 CSV 导出包含笔记原文。",
    },
    {
        "id": "staff-v2#export",
        "scope": "staff",
        "current": True,
        "terms": {"导出", "CSV", "原文"},
        "text": "管理员导出工具可选择附带原文。",
    },
    {
        "id": "import-v2#csv",
        "scope": "public",
        "current": True,
        "terms": {"导入", "CSV"},
        "text": "导入 CSV 时请提供标题和作者。",
    },
]


def retrieve(query_terms, allowed_scopes, top_k=2):
    ranked = []
    for chunk in chunks:
        if not chunk["current"] or chunk["scope"] not in allowed_scopes:
            continue
        score = len(query_terms & chunk["terms"])
        if score:
            ranked.append((score, chunk))

    ranked.sort(key=lambda item: (-item[0], item[1]["id"]))
    return [chunk for _, chunk in ranked[:top_k]]


def answer_demo(query_terms, allowed_scopes):
    for hit in retrieve(query_terms, allowed_scopes):
        if query_terms <= hit["terms"]:
            return {"text": hit["text"], "sources": [hit["id"]]}
    return {"text": "现有资料中没有找到依据。", "sources": []}


scopes = {"public"}
query = {"导出", "CSV", "原文"}
hits = retrieve(query, scopes)
assert [hit["id"] for hit in hits] == ["export-v2#csv", "import-v2#csv"]
assert answer_demo(query, scopes)["sources"] == ["export-v2#csv"]

# 只能找到提及 CSV 的片段，仍不足以回答草稿恢复的问题。
assert retrieve({"CSV", "恢复草稿"}, scopes)
assert answer_demo({"CSV", "恢复草稿"}, scopes)["sources"] == []
```

保存成 `rag_demo.py` 并用 Python 运行。示例用「关键词齐全」决定是否展示摘录。实际场景需要检查片段是否真的支持结论，有时要结合多个片段。生成阶段只允许引用本次传入的片段 ID，再由应用解析为真实链接。引用 ID 匹配只能证明来源存在，答案和原文的一致性还要单独检查。 [AI 问答引用如何定位原文](../../../blog/前端工程/AI问答引用如何定位原文.md)

## 先定位是哪一段出了问题

| 观察到的结果 | 优先检查 |
| --- | --- |
| 正确片段没有出现在候选里 | 文档切分、索引版本、权限过滤或查询表达 |
| 候选里有正确片段，但它没进模型上下文 | 重排、去重和上下文长度限制 |
| 正确片段已进入上下文，答案仍不对 | 回答是否遗漏条件、混用版本，引用是否支持结论 |

给一组常见问题标注能回答它们的片段。简单问题可看前 `k` 条是否至少命中一条相关片段（Hit@k）；多证据问题可看前 `k` 条召回了多少已标注的相关片段（Recall@k）。再单独验证答案是否被引用内容支持，以及无资料的问题是否说明证据不足。这样调检索时，可以直接看到改动影响了哪一段。 [Agent 评测与调用轨迹](./Agent评测与调用轨迹.md)
