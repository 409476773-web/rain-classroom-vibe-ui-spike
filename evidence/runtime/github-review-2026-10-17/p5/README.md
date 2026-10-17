# P5 独立新任务交付

- 原型： http://127.0.0.1:5201/#resource-update （Vite仅监听127.0.0.1，现有服务未停止）
- 固定Starter：`rn14-fea18282c8c33b5b`；只读基线 `../starter-base/`。
- 新场景源码：`../prototype/apps/prototype/src/scenarios/resource-update/`；主入口改为新场景，BM-A/B源码原字节保留。
- `userFeedback: received`；`humanGate: pending-review`。整体人审仍待完成；本轮三项视觉修订已有用户确认，范围见下方记录。
- 耗时、tokens、费用与返工成本：`not-measured`。

## 最新交付节点：用户反馈修订

已按用户反馈换用标准 Select（课程和详情）、small/32px二级比较按钮、库内红色PDF资产。只改两份页面私有文件；1440/777/390px检查3/3和原13组交互回归通过，typecheck/build通过，公共源与固定Starter均0变化。用户已回复“确定”，本轮三项视觉修订确认通过；[确认范围与源码绑定](user-feedback-2026-10-17/manual-acceptance.json)。下一项沿原计划为 P6 整体复核。

[修订与验证](user-feedback-2026-10-17/verification.md) · [777px下拉](user-feedback-2026-10-17/select-open-777.png) · [桌面](user-feedback-2026-10-17/after-1440.png) · [390px](user-feedback-2026-10-17/after-390.png)。原首稿与各次证据保留。

## 先前交付节点：父代理复核后文案修正

父代理发现390px单列下“从左侧选择”与布局不符，已仅改成“先选择需要更新的位置”。[修正记录](final-parent-review/review-fix.md)；桌面/390px零选择定向检查2/2通过，最终typecheck/build通过，公共源仍0变化。原13组行为检查未重复执行。

最新 [桌面截图](final-parent-review/desktop-final.png) / [390px截图](final-parent-review/mobile-390-final.png) / [源码快照](final-parent-review/source/) / [源码SHA](final-parent-review/source-sha256.json) / [定向检查结果](final-parent-review/zero-selection-results.json) / [完整性](final-parent-review/integrity-report.json)。本节点属于代理复核，用户验收仍待评审；先前首稿与自查证据均保留。

## 已交付

可读的v2/v3三项文本比较；3门课程8位置，6可编辑2只读；按课程和关键词即时筛选；跨筛选选择及全部范围检查；查看/切换详情保留选择备注；明确放弃确认；本地草稿保存、一次失败模拟、失败保留与重试、loading/ref防重复；重新打开保存快照并继续编辑。原资源及每个位置的发布版本保持v2。刷新清空，未接真实服务。

## 依据与选型

详见 [design-notes.md](design-notes.md)，记录本轮实际读过的技能、合同/API与Token文件、未选Tabs的原因、页面状态所有权、Mock边界及视觉比较双方。没有读取旧BM页面作布局模板，没有检索父工作区历史调优资料。

## 首稿 → 自查 → 局部修正

- [首次可运行源码与SHA](first-draft/source/) / [SHA](first-draft/snapshot-sha256.json)，原始首稿截图与稳定帧截图均保留。
- [首评](first-draft/self-review.md)：深蓝底过重、390px标题被版本标记挤压、Button箭头未走既有slot、窄屏范围回看路径。
- 局部修正：浅蓝Alpha/4、窄屏资源两列与标记左对齐、trailingIcon、窄屏范围定位。最终 [源码快照](final/source/) / [SHA](final/source-sha256.json)。
- 首次测试脚本对sr-only原生checkbox进行指针check，被视觉canvas拦截；改为点击其真实label。属于测试定位修正，未改公共组件，原失败输出保留于 [harness-attempt-1](harness-attempt-1/)。
- 第一次截图取到了公共弹窗的过渡帧，之后等待稳定与卸载再拍；原截图保留，未将过渡截图当缺陷或伪装成已修组件。

## 实际验证

- `pnpm typecheck`：通过，4个工作区项目；最终日志 [typecheck-final.log](final/typecheck-final.log)。
- `pnpm build`：通过；最终日志 [build-final.log](final/build-final.log)。构建仍提示入口chunk超过500KB（约1.21MB），未扩展改公共打包配置。
- Chromium：13/13组通过，0组失败，0个pageerror。脚本 [resource-update.spec.cjs](resource-update.spec.cjs)，[详细结果](final/behavior-results.json)，[输出](final/behavior-run.log)。覆盖初始权限、版本内容、跨筛选、查看切换、全选只读排除、取消/Escape/Tab焦点、放弃确认、失败重试/连击、重新打开快照、空结果、键盘、390px六位置与长备注、备注可空/零选择禁存。
- 最后一次CSS左对齐修正后的390px定向检查：页面宽390、文档宽390、标题与版本标记左边缘均93；[layout-facts.json](final/layout-facts.json)。最终再次typecheck/build通过。未为单个左边距重复全套业务测试。
- [逐文件SHA结果](final/integrity-report.json)：2494份固定公共packages/锁/基础配置，prototype和starter-base均0变更；另对2500份开工前清单（含BM-A/B）校验0变更。相对starter-base只有3份页面私有文件新增/变化：main.tsx、resource-update/page.tsx、resource-update/page.css。

## 可检查截图

- [桌面初始](final/desktop-initial.png) · [筛选外选择](final/desktop-filtered-selected.png)
- [桌面比较](final/comparison-desktop.png) · [全部范围检查](final/check-full-scope.png)
- [失败保留](final/save-failure.png) · [保存结果](final/saved-desktop.png) · [重新打开](final/reopened-draft.png)
- [390px最终整页](final/mobile-390-final.png) · [390px比较](final/comparison-mobile-390.png) · [390px检查](final/check-mobile-390.png) · [390px重开](final/reopened-mobile-390.png)

最终实际查看上述桌面、比较、检查、失败、重开和390px画面；文字身份、版本与位置对应可辨。新版本浅蓝底相对旧版白底保留版本差别并提升正文阅读；窄屏资源标题与标记共用内容列左缘，同类8行的标题、元信息和查看入口保留重复关系。未发现需额外像素偏移的图标/文字组合，不泛化为全库光学校准通过。

未验证：用户视觉接受、真实屏幕阅读器、Safari、真实触屏、真实接口/持久化、发布生产行为。没有提交、push、发布、写Figma或真实资源替换。
