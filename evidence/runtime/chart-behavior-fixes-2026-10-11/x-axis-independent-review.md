# XAxis 与根 SVG 限宽：独立只读审阅

结论：未发现本轮引入的关键、重要或可选代码问题。当前三个 owner 达到限定、未发布的技术可交付状态；不据此宣布整体发布或生产就绪。本审阅只读取源码、单测、浏览器记录和 source-lock，没有重复测试或编辑 runtime/tests。

## 固定 margin 与相对坐标

`x-axis.tsx:73` 将原坐标写为 `f=(x-L)/I`、`offset=L-f(L+R)`，最终 left 为 `f×100%+offset px`。在真实容器宽 C 下，得到 `L+f(C-L-R)`：左右 margin 仍为原像素值，只有绘图区宽度随真实容器变化；当 C 等于 context.width 时，结果与原 x 完全等价。

此式同时适用于时间数据点、domain/projection ticks 和 category point centers，不要求左右 margin 相同。Composed 保留 left/right=58，普通时序与 Scatter 保留 left=58/right=24；右 Y 轴和各轴值域不参与此转换。`width/innerWidth/margin.left/margin.right` 都进入 layoutChanged 比较，margin 改变不会误当作同宽数据更新。原 tick 选择、日期去重、projection tail、category 稳定 key 和 brush 规则在本轮没有改写。

`innerWidth<=0` 分支直接保留有限 x，避免比例除零；两套 shell 原有 width/height<10 的空渲染策略仍在，未扩展极小绘图区的公共输入支持。

## 动效与身份

布局变化时关闭 left transition，`useLayoutEffect` 更新本实例的旧布局记录；下一次同宽数据更新恢复原 500ms/ease。正常同宽数据或时间域变化的 CSS calc 项可以连续插值，两端都保留同样的固定 margin。没有改动画时长或曲线。

已有 `xDomain!=null` 的即时位置规则仍保留；新增 caller animationDuration=0 与系统 reduce 的即时规则。媒体偏好在已挂载轴上通过本地 change listener 更新，卸载时清理监听，不需要 caller rerender，也不修改共享 Motion hook。Portal 容器、date/category key、标签 bottom/width/display、字体和透明度策略均保留。

## 两处 SVG 限宽

`time-series-chart-shell.tsx` 的本轮差异只有根 `<svg>` 添加 `style={{maxWidth:'100%'}}`；`scatter-chart-shell.tsx` 也只有相同的一行。width/height 属性、内部坐标、clip、交互、值域和 data 合同没有改写，Scatter 的 `overflow-visible` class 保留。限宽在 ParentSize 的尺寸报告追上前约束原生 SVG viewport；稳定尺寸下不会改变既有像素宽度。

这不等于首个 resize 帧已重新计算所有 SVG 内部几何。内部坐标仍按原来的下一次尺寸测量更新，这个边界必须保留在交付说明中。

## 证据核对

- 当前三个 runtime SHA-256 与刚更新的 source-lock 一致：XAxis `1d5f12a1bbe131f0826478be01697bfc445f9b42e24fb12ec35b917366715cd9`；time-series shell `8e4464ea202e0c9a948436536fcdd5142ba81860a946449e386e9ac11099cb17`；scatter shell `5dc459024b044ed3f58e8ab346b4974a353c2e53792b3d8942d593d9b2e27a9b`。
- `x-axis-independent-scope.json`：全部匹配 source-lock；tick 算法/helper 段字节相同；Y 轴、Y scale、category scale 与三份共享/App CSS 共 6 个文件相对 before 字节相同。
- 已读新增 `chart-x-axis-resize.test.tsx` 的 13 项真实 chart/XAxis 测试：双向 resize、标签节点身份、同宽域变动画、resize 中断/恢复、margin、初始和动态 reduce、caller 禁用、双实例隔离、同名 category、brush、实际容器先于 debounced context 变化、根 SVG style。JSDOM 百分比使用明确 CSS 指定值解析，未冒充真实绘制。
- `x-axis-unit-green-final.log`：对应 resize/composed-axis/category-axis 三文件 45/45 通过。
- `browser-x-axis-after-09.log` 与 `browser/x-axis/after-09`：Scatter 的最早 resize-event、ResizeObserver 与 RAF 样本，以及 native consumer 同宽域变，2/2 通过。
- 完整 13 个浏览器用例记录在 `browser-x-axis-after-10.log` 与 `browser/x-axis/after-10`，13/13 通过（24.7s）。6 个 family × normal/reduce 各有三次审计：390 缩窄、1440 展开、数据更新中缩窄。每次均保留 8 个 RAF 与 resize-event/observer 样本；12 份 family JSON 全部 documentWidth≤viewport、resize tick IDs 相同、字体/颜色相同、0 浏览器异常。
- native consumer 真实 browser 数值验证 Sep 2 在同宽数据域变时经过 300→170 的中间位置；挂载后系统 reduce 下回到 300，恢复 normal 后再次出现中间值并到 170。它的数据替换会改变末尾日期 key，故整组 IDs 有意变化；不是 resize 重新建标签。

## 证据边界与问题分类

Family 最早帧断言直接验证页面宽度、节点身份和字体/颜色，并保存 tick bbox/center/inlineLeft/overlay 与 containing width；未逐项独立断言所有 tick 到 SVG 数据点的首帧误差。准确的限定结论是：标签随真实容器响应、最早采样没有页面横向溢出、正常数据位置动画与 mounted reduce 行为保留；不能把它扩大为所有首帧 SVG 几何同步重算。

- 关键：无。
- 重要：无本轮修复应处理的实际回归。
- 可选：无须新增范围的代码问题；保留上述证据边界即可。

根代理仍负责统一当前代码的类型检查、构建、170 消费验证、source-lock 和交付记录。不将未测硬件、浏览器或新功能要求归为此次修复缺陷。
