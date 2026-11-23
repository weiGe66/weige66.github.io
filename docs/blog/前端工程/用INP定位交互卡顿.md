---
title: 用 INP 定位交互卡顿：从一次点击追到主线程
createTime: 2026/11/23 14:25:00
permalink: /article/diagnosing-inp/
tags:
  - 前端工程
  - 性能
---

筛选面板的点击回调很短，界面仍可能半秒才响应。输入可能在等待上一个任务结束，组件更新也可能在回调结束后产生大量布局和绘制工作。先沿一次交互的时间线确认延迟花在哪，再决定优化哪一层。

## 把一次交互拆成三段

| 阶段 | 在 Performance 录制里看什么 | 常见处理方式 |
| --- | --- | --- |
| 输入延迟 | 交互开始前，主线程正在运行的任务 | 推迟非关键初始化，把可切分的长任务分批执行 |
| 处理耗时 | 事件回调及其调用链，重复计算和同步状态更新 | 复用计算结果，缩小更新范围，把可独立计算的数据交给 Worker |
| 呈现延迟 | 回调返回到下一帧之间的样式计算、布局、绘制或框架更新 | 减少挂载节点，集中读写布局属性，把非关键工作移到后续任务 |

一次点击可能对应多个事件。用 DevTools 的 Interactions 轨道看整次交互，再到 Main 轨道核对调用栈及布局事件。INP 描述一次页面访问期间整体的交互响应性，单次录制只能定位本次交互。站点验收看真实访问的第 75 百分位，移动端和桌面端分开看，良好阈值为 200 ms 或以下。[web.dev · INP](https://web.dev/articles/inp) · [优化交互的三段延迟](https://web.dev/articles/optimize-inp/)

## 实验：相同的界面结果，两种 DOM 更新顺序

把下面的代码保存成 HTML 文件，在 Chrome 打开。两个按钮都把同一批行切到新的宽度并用测量值更新文本。第一种交错修改宽度和读取 `offsetWidth`，第二种先改宽，再集中读，最后写文本。

```html
<!doctype html>
<meta charset="utf-8">
<title>布局读写实验</title>
<button id="mixed">交错读写</button>
<button id="batched">批量读写</button>
<div id="rows"></div>
<script>
const container = document.querySelector('#rows')
const rows = Array.from({ length: 500 }, () => {
  const row = document.createElement('div')
  row.style.width = '120px'
  row.textContent = '120 px'
  return row
})
container.replaceChildren(...rows)

let width = 120

function updateRows(batched) {
  width = width === 120 ? 180 : 120
  const nextWidth = `${width}px`

  if (!batched) {
    for (const row of rows) {
      row.style.width = nextWidth
      row.textContent = `${row.offsetWidth} px`
    }
    return
  }

  for (const row of rows) row.style.width = nextWidth
  const measuredWidths = rows.map(row => row.offsetWidth)
  rows.forEach((row, index) => {
    row.textContent = `${measuredWidths[index]} px`
  })
}

document.querySelector('#mixed').onclick = () => updateRows(false)
document.querySelector('#batched').onclick = () => updateRows(true)
</script>
```

宽度修改使已有布局信息失效。随后读取 `offsetWidth` 时，浏览器可能需要立即做样式计算和布局。交错读写会重复触发这个过程。集中读取时，首次读取会取得更新后的布局，后续读取可复用同一轮布局结果。真实组件里，如果新宽度只依赖业务数据，直接用数据计算通常还能省掉测量。[web.dev · 避免布局抖动](https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing)

1. 在 DevTools 的 Performance 面板使用相同的 CPU 限速。等页面空闲后开始录制，点击「交错读写」一次。
2. 重新加载，使用同一视口和限速录制「批量读写」，让两次都从 120 px 切到 180 px。
3. 在 Main 轨道展开 `updateRows`，比较出现在回调内的布局事件和总耗时。再检查文本更新后还有多少布局工作移到了回调之外。
4. 重复几次确认趋势。如果交互过快，Interactions 轨道里缺少清晰样本，仍可以直接查看 Main 轨道的点击回调与布局。

## 把实验结果带回真实页面

- 对列表筛选，分别从数据处理量和实际挂载的 DOM 数量找瓶颈。预处理索引能缩短重复筛选，虚拟列表主要减少挂载和布局，两者解决的是不同耗时。
- Vue 的 `nextTick()` 等待 Vue 刷新 DOM。浏览器何时绘制还要看后续调度。把重计算接在 `await nextTick()` 后面，应在时间线上确认加载提示是否已经进入下一帧。[Vue · nextTick](https://vuejs.org/api/general.html#nexttick)
- 现场数据按路由、设备类型和发布版本聚合，并记录稳定的交互标识。对于涉及接口的交互，可以另记「点击到结果可用」的业务耗时。按钮先显示加载态、接口随后响应时，这两个指标各自反映一段等待。

验收时保留优化前后的录制，并比较同一路由、同一类设备上的交互延迟分布。实验展示的是布局事件为何减少，线上改善需要用真实访问数据验证。
