# Dialog 补充规格实施与验证

日期：2026-09-15。依据：[确认设计](../../../docs/plans/2026-09-15-dialog-refinement-design.md) · [实施计划](../../../docs/plans/2026-09-15-dialog-refinement-implementation.md)。

## 结果

2026-09-15后续截图反馈已落实：Footer与主体共享底色，默认无分割线；长表单显式启用divider。最新修订证据见[底部表面修订](footer-surface/verification.md)。下方独立评审和原始截图记录对应本次修订前的完整规格实施。

本轮实现、自动验证与独立技术评审完成。后续依据用户明确委托，Dialog/AlertDialog当前运行视觉已完成[整体视觉验收](../dialog-bm-b-visual-2026-09-15/verification.md)。资产仍为registry-candidate，对比度接受保持not-granted；以下实施日志保留其原始时间与范围。

- Dialog默认616，AlertDialog默认416；标准宽度416/516/616/716/816/916/1016/1116及viewport扩展，按外框计量。
- 桌面安全边距40或60，640px及以下16。最小高度128，可用视口优先；常规Body滚动，极矮视口整窗滚动保证操作可达。
- 四档专用浅深色蒙层通过既有生成器输出，无蒙层不绘制背景。未改变通用Fill或Alpha覆盖白名单。
- 默认禁止点击蒙层关闭；弱蒙层预览显式允许关闭。无绘制的退出屏障阻止背景误触。
- 180ms淡入淡出和98%缩放，viewport模式只淡入淡出；支持中途反向及减少动态效果。
- 嵌套最多主任务加必要确认示例，最上层接管唯一有效蒙层。返回父层不闪变；同时退出两层时最上层淡出。
- 课程和教材宿主负责草稿、修改判断、校验、保存、失败重试和放弃确认；继续编辑保留滚动与草稿。安全动作获得初始焦点。
- 实际按钮组支持8/12px；保持取消在左、主操作在右，窄屏长文案必要时纵排，字号与控件尺寸不缩小。
- 原生VisualViewport同步可见宽高与偏移，覆盖只缩小视觉视口的键盘/缩放情形；订阅随Portal卸载清理。

## 验证证据

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 组件、宿主、Token及精确授权单测 | 13/13 | [focused-tests.log](focused-tests.log) |
| 浏览器唯一用例 | 48/48已通过 | [矩阵执行](verified-browser.log) · [焦点针对性复测](focus-verified.log) |
| 蒙层截图合成色 | 30/30，RGB每通道误差≤1 | [mask-compositing.json](mask-compositing.json) |
| 类型检查 | 通过 | [typecheck.log](typecheck.log) |
| 构建 | 通过，保留已有包体积提示 | [build.log](build.log) |
| 完整治理检查 | 通过；已有对比度/配色待决项保留 | [governance.log](governance.log) |
| 独立评审 | 通过，发现2项并修复复测 | [independent-review.md](independent-review.md) |

浏览器范围为Chromium、Firefox、WebKit：新增规格10项×3、BM-B回归3项×3、既有Dialog回归9项Chromium，共48项。矩阵最后一次47项通过、1项旧焦点即时断言出现时序失败；改为等待明确的首个可聚焦关闭按钮后，该用例连续3次通过。没有打开自动重试或跳过失败用例。

覆盖浅/深五档蒙层、1440/375/320宽度、40/60/16边距、长内容和固定头尾、内嵌Select可操作、两层Esc和安全焦点、草稿/滚动恢复、保存失败重试、8/12实际间距、长标题/按钮文案、180px极矮视口、模拟可见区域缩小和平移、关闭过程误触、真实Trigger中途重新打开及减少动态效果。缩放/软键盘采用VisualViewport事件模拟，未冒充真实设备结论。

### 人工查看的截图

- [浅色嵌套确认](preview-light-confirmation.png)
- [深色嵌套确认](preview-dark-confirmation.png)
- [320px长标题与长按钮文案](preview-long-labels.png)
- [仅可见区域缩小及平移](preview-visual-viewport.png)

主代理已查看上述实际渲染截图；这不代替用户视觉接受。

## 历史状态与限制

### 2026-09-15关闭叉号反馈

用户在查看28/20修订后回复“确定”：确认弹窗关闭IconButton采用28px按钮、20px的正式CloseBoldIcon粗体叉号。本次为关闭图标及尺寸的局部视觉确认，不扩大为Dialog整体Human Gate或对比度验收。

后续用户要求增大图标，已采用既有28/20规格：粗体叉号由16px增至20px，按钮28px。浅/深色×1280/375宽度的实际尺寸、标题第一行居中、无横向溢出、关闭及焦点返回4/4通过，无浏览器错误；见[20px检查](close-bold/size-20-browser.json)、[浅色截图](close-bold/size-20-light-1280.png)、[深色窄屏截图](close-bold/size-20-dark-375.png)。主代理已查看截图，[治理检查](close-bold/size-20-governance.log)通过。以下16px记录保留为上一轮历史证据。

用户要求弹窗关闭IconButton使用更粗叉号。现有图标关闭入口共用CourseDialogExample，已改用目录中available的`icon/close-bold`；Dialog/AlertDialog组件合同同步记录此场景选择。保留28px按钮、16px图标及宿主颜色。浅/深色×1280/375宽度的图标身份、尺寸、点击关闭与焦点返回4/4通过，无浏览器错误，见[浏览器记录](close-bold/browser.json)、[浅色截图](close-bold/light-1280.png)、[深色窄屏截图](close-bold/dark-375.png)。主代理已查看截图；类型检查与[完整治理检查](close-bold/governance.log)通过。本次未重新声明独立评审或人工视觉接受。

实施前完整治理检查通过。原scripts/dialog-v2.test.ts的历史保护快照已存在Dropdown CSS指纹不匹配，见[baseline-tests.log](baseline-tests.log)与[baseline-governance.log](baseline-governance.log)。本轮保留旧快照与失败，没有据此宣称全仓所有测试全绿。

人工视觉、真实屏幕阅读器、物理触屏、软键盘与捏合缩放验收，以及原有焦点对比度问题分别保留。本轮没有新增对比度豁免、Figma同步、发布、业务迁移、Git提交或推送。

VisualViewport依据：[MDN接口说明](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)。其可见区域与布局视口可不同，因此仅100dvh不足以覆盖所有键盘场景。

## 本地入口与复现

- [Dialog预览](http://127.0.0.1:5215/#dialog)：主题、密度、长内容、8/12按钮间距、蒙层与宽度样例。
- [教材表单](http://127.0.0.1:5216/#bm-b)：616/916、单/双列、长文本、模拟上传和保存重试。
- [本轮浏览器配置](playwright.config.ts)使用独立预览服务；普通旧用例仍保留仓库默认端口配置。

```sh
pnpm typecheck
pnpm build
pnpm verify:governance
pnpm exec vitest run packages/ui/src/dialog/dialog.test.tsx scripts/dialog-refinement.test.ts apps/prototype/src/scenarios/bm-b/state.test.tsx
RAIN_DIALOG_PROTOTYPE_URL=http://127.0.0.1:5216 pnpm exec playwright test -c evidence/runtime/dialog-refinement-2026-09-15/playwright.config.ts tests/e2e/dialog-refinement.spec.ts tests/e2e/dialog.spec.ts tests/e2e/bm-b.spec.ts
```

先结束浏览器测试再运行治理检查，避免把Playwright尚未清理的临时HTML轨迹当作源码。原V2规划JSON保持规划快照；当前执行状态以status/current-phase.yaml的dialogRefinement记录为准。
