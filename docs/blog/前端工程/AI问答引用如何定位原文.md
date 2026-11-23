---
title: AI 问答引用如何定位原文，从来源 ID 到文本选区
createTime: 2026/11/23 14:48:00
permalink: /article/ai-citations-source-navigation/
tags:
  - 前端工程
  - AI
---

学习工作台接入笔记问答时，引用需要让用户看清两件事。回答用的是哪段笔记？笔记后来修改后，还能否在同一个位置找到它？字段设计、模型输出校验和前端跳转要用同一套来源契约。

## 让模型选片段，让应用生成链接

应用先从当前账户的笔记中检索片段，为每个片段分配本次请求内的来源 ID。传给模型的是片段与 ID，模型返回回答和用到的来源 ID。服务端逐个检查 ID 是否属于本批片段，校验通过后补上真实标题、笔记 ID、版本、原文范围和摘录。前端再用站内路由生成链接。

| 输入或结果 | 应用的处理 |
| --- | --- |
| 没检索到片段 | 显示「未检索到笔记依据」，直接结束 |
| 模型引用了本批之外的 ID | 返回输出校验错误，保留用户的问题 |
| 所有 ID 匹配 | 用检索时记录的来源生成引用卡片，用户可对照摘录 |
| 用户确认保存答案 | 使用普通笔记保存流程，保留来源快照 |

ID 校验能确认引用属于本次允许的片段。回答里的结论是否真能从片段推出，仍要让用户对照原文。测试时可以让合成模型服务返回一个不存在的 ID，核对应用既没有显示可点击的假引用，也没有把结果保存为笔记。

## 原文范围必须带版本

只记录 `noteId + start + end` 会遇到一个问题。用户在原文前面插入一行后，同一对下标指向了别的内容。保存来源时一起记录 `revision`、范围和当时的摘录。点击时再读取当前笔记。

- 版本匹配，且范围有效时，进入编辑区并选中原文。
- 版本有变化时，提示用户核对当时的摘录。可以打开当前笔记浏览，由用户确认相关段落。
- 来源被删除或已无法读取时，显示不可用状态。访问笔记本身仍按应用已有的权限规则处理。

工作台里的摘录可以经过文本清理，供模型与读者阅读。定位范围始终以对应版本的原始 Markdown 计算。若还要给可编辑文本做额外校验，可以在当前缓冲区有未保存修改时暂缓跳转选区，避免用旧位置解释新文本。

## 把 Unicode 码点转换为浏览器选区偏移量

后端按 Unicode 码点记录 `[start, end)`。浏览器 textarea 的选区使用字符串的 UTF-16 偏移量。普通汉字常占一个码元，一个补充平面的 emoji 则占两个。比如 `前🙂端`，码点范围 `[2, 3)` 指向「端」，对应的 UTF-16 范围是 `[3, 4)`。[MDN · String.length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length) · [MDN · setSelectionRange](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/setSelectionRange)

```js
import assert from 'node:assert/strict'

function selectionOffsets(note, citation) {
  if (note.id !== citation.noteId || note.revision !== citation.revision) return null

  const { start, end } = citation
  const points = Array.from(note.content)
  if (!Number.isInteger(start) || !Number.isInteger(end)) return null
  if (start < 0 || end <= start || end > points.length) return null

  return [
    points.slice(0, start).join('').length,
    points.slice(0, end).join('').length,
  ]
}

const note = { id: 42, revision: 3, content: '前🙂端' }
const citation = { noteId: 42, revision: 3, start: 2, end: 3 }
const offsets = selectionOffsets(note, citation)

assert.deepEqual(offsets, [3, 4])
assert.equal(note.content.slice(...offsets), '端')
assert.equal(selectionOffsets({ ...note, revision: 4 }, citation), null)
assert.equal(selectionOffsets(note, { ...citation, end: 8 }), null)
```

把代码保存成 `citation.mjs` 后可以用 Node.js 运行。页面拿到范围以后，等编辑器挂载，再用 `setSelectionRange` 设置实际选区和焦点。码点范围还可能落在组合字符中间。如果需要按用户看到的完整字符切分，就要在生成来源范围时使用字素边界。

## 验收时分清引用链路和模型质量

项目当时用本地合成服务测通了真实检索、引用跳转并选中编辑器原文，以及确认后才新增笔记。后端验收覆盖了无依据和无效引用。浏览器路径、版本变化和 emoji 下标可以独立复验，真实供应商的回答质量仍需用自己的问题集评估。生成与保存分开，也便于在验证引用前让用户保留原内容并审阅结果。
