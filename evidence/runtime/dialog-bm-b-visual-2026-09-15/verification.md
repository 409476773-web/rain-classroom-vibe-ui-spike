# Dialog与BM-B整体视觉验收

日期：2026-09-15。结论：**Dialog / AlertDialog与BM-B当前运行视觉验收通过**，独立复核无未解决阻塞项。

## 依据与范围

用户明确要求：“根据已经建设的dialog设计规则，完成 Dialog 和 BM-B 大表单的整体视觉验收”。按此次委托，对当前运行画面逐项核验并修正偏差，完成限定视觉验收。此前“确定”仅关闭图标及尺寸的范围由本次明确请求扩展至Dialog/AlertDialog和BM-B整体运行视觉；不将自动检查冒充用户亲自浏览全部场景。

工作模式：System Mode；允许当前两类样例的最小视觉修复、测试、登记与证据更新。遵循[Dialog设计规则](../../../docs/plans/2026-09-15-dialog-refinement-design.md)、后续Footer/关闭图标确认、[BM-B范围](../../../docs/plans/2026-09-15-bm-b-rn10.md)及Rain Token。原始VE-014提供任务结构，当前视觉以已建设Dialog规则为准。

检查：浅/深色、控件密度、416–1116与viewport尺寸、40/60/16边距、标题/说明/关闭对齐、正文分组、单/双列表单、长内容滚动、同色Footer及按需分割线、8/12按钮组、嵌套确认，以及校验/保存/附件状态和窄屏长文案。通过实际浏览器截图和几何测量核对，独立复核后登记结论。

保持独立：Separator和Textarea全组件验收、既有对比度欠项、真实辅助技术/物理设备、正式发布、业务迁移、Git与后续RN任务。基线见[baseline.json](baseline.json)，不覆写旧日志或快照。

## 视觉检查结果

| 检查项 | 结果 |
| --- | --- |
| 尺寸与边距 | Dialog标准宽度和viewport模式、桌面40/60及窄屏16边距正常；BM-B实际616/916、1440/390/320视口及单/双列组合通过。 |
| 表面与蒙层 | 浅深色四级蒙层及无蒙层正确；嵌套仅一层有效蒙层；Footer与主体同色。 |
| 标题与关闭 | 标题18/28/600；说明14/24；标题/说明统一8px。课程使用28px按钮及20px粗叉；BM-B保留文字关闭，首行中心误差1px。 |
| 表单层次 | Header横向24px，分区24px；当前BM-B字段与网格16px层次清楚，接受此场景密度。常规候选20px未被误当成全场景强制值。 |
| 固定操作栏 | 常规高度Body滚动，Header/Footer位置稳定；极矮视口整窗滚动为已有规则。底栏内距16/24，正文与主操作右边线对齐。 |
| 操作层级 | 取消/安全动作在左、一级主操作在右；课程实际8/12px、BM-B12px；窄屏长文案允许纵排且不缩小文字。 |
| 分割线 | 短窗、确认框默认无顶线；长表单显式保留1px顶线，未恢复独立灰底。 |
| 状态与窄屏 | 校验、上传失败/重试、保存中/失败、未保存确认均有完整可见画面；单双列切换保留内容，错误和操作不被截断。 |
| 键盘与动效外观 | 焦点返回、嵌套Select、两层确认、180ms过渡、减少动态效果及强制颜色模式按既有用例通过；不替代真实辅助技术验收。 |

本轮唯一产品样式修复是BM-B标题与说明间距由4px调整为8px。未新增视觉Token、组件或状态控制器。

## 验证与复核

| 检查 | 结果与证据 |
| --- | --- |
| Dialog浏览器回归 | [42/42通过](dialog-browser.log)，Chromium / Firefox / WebKit及既有Chromium用例。 |
| BM-B浏览器回归 | [15/15通过](bm-b-browser.log)，三引擎各5项；包含12种表单布局组合/引擎和两主题主要状态。 |
| 最终几何与状态取景 | [几何3/3](geometry-final-browser.log) · [状态3/3](state-final-browser.log)，均为上述既有用例复跑，不重复计入57项。 |
| 组件、宿主及验收范围保护 | [14/14通过](focused-final.log)，拒绝缺失依据、未验证、超范围视觉接受及发布/对比度扩权。 |
| 类型、构建、治理 | [类型通过](typecheck-final.log) · [构建通过](build.log) · [完整治理通过](governance-final.log)；git diff --check通过。 |
| 独立复核 | [通过](independent-review.md)，包含独立浏览器测量、截图审查、当前实际登记和守卫复验。 |

最终几何保留viewportWidth和弹窗width两个字段，避免混淆视口与容器。初次记录的同名覆盖被类型检查检出后修复并重跑。初次上传失败截图未包含底部状态，已滚动正文至底部重拍；阶段记录的嵌套键顺序问题也已修复复验。相应初轮日志保留，未冒充一次全部通过。

## 实际画面

主代理与独立复核均查看了代表画面。以下链接指向此次运行的原始截图：

- [Dialog浅色任务](dialog-results/dialog-composition-short-D-3f332-intentional-group-intervals-chromium/short-light-false.png) · [深色嵌套确认](dialog-results/dialog-refinement-nested-c-52f81--scroll-and-safe-focus-dark-chromium/nested-dark.png) · [320px长标题与动作](dialog-results/dialog-refinement-long-tit-2d87c-p-safely-on-a-narrow-screen-chromium/long-labels-narrow.png)
- [BM-B 916双列](geometry-final-results/bm-b-visual-Dialog-spacing-d223e-s-across-form-presentations-chromium/light-1440-916-2col-top.png) · [616单列](geometry-final-results/bm-b-visual-Dialog-spacing-d223e-s-across-form-presentations-chromium/light-1440-616-1col-top.png) · [深色窄屏](geometry-final-results/bm-b-visual-Dialog-spacing-d223e-s-across-form-presentations-chromium/dark-390-916-2col-top.png)
- [上传失败](state-final-results/bm-b-visual-narrow-validat-e7d84-scard-states-in-both-themes-chromium/light-upload-failed.png) · [深色保存失败](state-final-results/bm-b-visual-narrow-validat-e7d84-scard-states-in-both-themes-chromium/dark-save-failed.png) · [深色放弃确认](state-final-results/bm-b-visual-narrow-validat-e7d84-scard-states-in-both-themes-chromium/dark-discard.png)

## 登记与保留项

- 当前phase的dialogRefinement和bmBRn10分别记录accepted及具体用户委托、范围、证据；Dialog/AlertDialog Manifest、Dialog Registry局部视觉记录、BM-B Benchmark及页面索引同步。
- Registry包含Separator，故整体包记录仍为awaiting_human；本次已接受的Dialog范围单独登记。旧DialogV2阶段及其他组件历史状态保留，不冒充所有组件通过。
- 本次开始前，[旧测试基线](baseline-tests.log)已有3项失败：旧完整CLI夹具缺少后来Dialog批次登记，以及RN-09历史阶段快照差异。另有先前记录的Dialog V2受保护Dropdown源码指纹差异。[最终复查](legacy-final.log)为238通过、4项上述历史失败，没有将其改成全仓全绿；本轮真实工作区的完整治理与专项检查通过。
- 对比度/配色待决项、真实读屏、物理设备及真实上传/持久化保留；未发布、迁移、提交或推送。下一工作属于M1文档检索与干净消费/交付收尾（RN-13～15），本次未启动。
