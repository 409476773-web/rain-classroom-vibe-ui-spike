# P5 课程资源引用更新 · 独立新任务

状态：实现与开发者自查已完成；`userFeedback=not-received`，`humanGate=pending-review`。固定来源 `rn14-fea18282c8c33b5b`。业务事实来自同级 `brief.md`，全部为虚构样本。

## 主任务与设计选择

教师比较 v2/v3 的实际内容，选择允许替换的引用，核对全部范围，生成可重新打开的本地草稿。页面采用资源上下文＋课程分组位置列表＋独立检查区；列表便于辨认8个引用归属，检查区始终对应全部选择，而非当前筛选结果。比较文本按相同页码左右并置，390px 改为每项内上下对应；选择与备注保持页面状态。宽屏检查区随阅读可见，窄屏堆叠并提供页内定位。

曾考虑把比较作为整个首屏的常驻双文档，或拆成多步向导：前者会持续占用选择空间，后者会增加跨筛选回看成本；本任务只有3项变化、8个位置，采用可关闭比较＋同页选择更直接。未生成机械多稿，也未读旧BM整页作为模板。

## 实际读取依据

- 本副本 `AGENTS.md`、同级 `brief.md`。
- `.agents/skills/rain-designer/SKILL.md` v0.2.1；`references/designer.md` v0.5 第1–7章全文：信息与操作范围、状态恢复、视觉比较与6.4光学校准、7.1交付。
- `docs/ai/prototype-design.md`：品牌蓝 #1561F8、UI/Reading字体、36px现有配方、公共只读、首稿保留与API出口。
- `packages/ui/src/index.ts`、`packages/ui/package.json`：核对真实公共出口与图标导入。
- `manifests/ui/button.yaml`、`input.yaml`、`textarea.yaml`、`dialog.yaml`、`alert-dialog.yaml`、`tabs.yaml`、`icon-button.yaml`：读到用途/Props/Parts/组合边界。Tabs只作选型核对，最终未选，因为当前列表是过滤同一集合，比较也需要同时对应而非同级面板切换。
- `packages/ui/src/button/button.tsx`：variant、medium、loading防连击、trailingIcon。
- `packages/ui/src/checkbox/checkbox.tsx`：checked/onCheckedChange、disabled与可访问名称；随包无单独checkbox manifest，实际源码是本次API依据。
- `packages/ui/src/input/input.tsx`、`input/form-item.tsx`：即时过滤、onValueChange、size=36、inside标签；Input不模拟明确提交搜索。
- `packages/ui/src/native-select/native-select.tsx`：原生select、options、size=36、FormItem关联；随包无单独native-select manifest，使用源码合同。
- `packages/ui/src/textarea/textarea.tsx`：页面控制备注、原生多行、Reading/Small；rows=3是本页局部选择。
- `packages/ui/src/dialog/dialog.tsx` 与 `dialog.css`：Base UI拥有模态、键盘与焦点，宿主拥有草稿/关闭/保存状态；用616/716/1016现有宽度，Content finalFocus/initialFocus、Trigger与Close render组合。保存失败保留窗口。
- `packages/ui/src/tag/tag.tsx` / `tag.styles.ts`：版本与只读身份短标记，filled/outlined既有配方。
- `packages/ui/src/icon-button/icon-button.tsx`：具名操作，关闭用正式close-bold 28/20；范围移除用24/14。
- `packages/ui/src/recipes/local-recipe.ts`：确认视觉扩展边界。本页未改公共组件外观；容器、响应式、阅读块均为页面私有CSS，组件className只承载布局。
- `packages/foundations/src/typography-contract.ts`、`token-contract.ts`、`tokens.css`：UI正文14/22、普通区块16/24、资源名/任务标题18/28为本页重点；对比正文Reading14/24；颜色/空间/圆角引用公共Token。首评后从实际tokens核对Alpha/2=65%、Alpha/4=10%，只在本页换浅底。
- `packages/foundations/src/icons/catalog.generated.ts`：File、Search、ArrowRight、CloseBold、CircleCheck、Info 均 availability=available；按对应 `@rain-next/ui/icons/<slug>`静态导入。
- 原入口 `apps/prototype/src/main.tsx`、`styles.css` 与应用/根package.json：保留完整主题/字体/动效/focus/组件/布局加载关系。未读取BM-A/B页面实现，也未参照父工作区旧业务整页或历史调优。

## 页面状态与保护

页面只保存稳定use ID，过滤为派生视图。只读输入禁用，宿主选择入口与保存快照再次排除只读。关闭比较、详情、检查不清稿；明确放弃弹窗确认才清空。放弃已编辑内容不删除已保存快照。

save使用同步ref锁与Button loading；一次模拟失败消费后重试成功。仅保存一个local-001快照，再保存更新同一份草稿，不增加重复记录。草稿包含v2/v3、全部ID与备注，重新打开先查看已保存快照，继续编辑时恢复原选择与备注。模拟等待650ms只为展示状态，不是性能测量。页面刷新清空，与brief生命周期边界一致。

## 首稿与返工

`first-draft/source/` 与 SHA 保留首次可运行源码，typecheck/build已通过。首评见 `first-draft/self-review.md`，截图包括desktop、comparison-stable、mobile-390-stable。首稿之前的编译接线修正只有tuple类型与移除猜测的onEscapeKeyDown（真实Popup没有该Prop）；第一个可运行版本冻结后才进行视觉自查与后续修正。

局部返工：Alpha/4浅底、390px标题不被标记挤压、Button trailingIcon、窄屏范围定位。所有修正仅在新场景私有源码中。未升级公共规则、未改兄弟实例。初次过渡中间帧保留，stable截图另存，未覆盖冻结证据。

## 视觉检查参照

- 整页：资源识别为上文，8条位置为主要操作，检查区与左列表并列；390px依任务顺序堆叠。
- 同类8行：标题起点、元信息与右侧查看相对关系；只读两行保留同样定位关系但选择框禁用并显示文字只读。
- 比较：同页码的v2/v3左右对应；旧版白底和新版浅蓝底同样保留完整可读文本，新版不再采用65%深蓝。
- 资源图标与标题、版本箭头与两侧版本、选择框与位置对象、只读Tag与同一行标题：用真实截图在目标窗口检查，没有发现需要额外像素偏移的轮廓问题；不把flex居中或数值相同当光学校准证明。
- 390px：标题、版本元信息、操作与弹窗不裁切；长备注/6项范围需要滚动的内容保留在Dialog.Body，Footer保持可达。

## 验证与边界

实际行为与截图结果见 `final/behavior-results.json`、`final/behavior-run.log`；最终校验与完整性报告另附。开发者自查不替代用户视觉验收。Safari、VoiceOver、真实触屏、发布/生产行为与真实服务未验证。用户反馈：待评审。耗时、tokens、费用、返工成本：`not-measured`。

最终结果：13/13组Chromium行为检查通过，pageerror=0；最后的390px标题/标记左缘定向检查通过，文档宽等于390。最终typecheck/build通过。2494份固定源与2500份开工清单均原字节不变；仅3份页面私有文件变化。最后核验注意到资源Tag旧margin仍在网格中叠加，已只在窄屏移除，实际左缘93=93。截图与日志见README。

父代理复核后仅修正零选择文案“从左侧选择需要更新的位置”为“先选择需要更新的位置”，避免390px单列出现错误方位指示。新桌面/390px截图、2/2零选择定向检查、最终typecheck/build与固定源0变化结果均另存final-parent-review/，旧节点不覆盖。userFeedback仍not-received；交付后停写。

## 2026-10-17 用户反馈修订

触发：用户指出课程下拉为系统菜单、比较按钮偏大、PDF标识未采用已有资产。判断与落实：有限候选值复用标准Select；已有次要操作用small二级按钮；资源格式复用内置PDF身份图标。同页详情选择及检查弹窗资源图标同步保持一致。仅适用于本页实例，不增加共享默认。依据、前后比较、实际检查与待确认状态见 [反馈修订记录](user-feedback-2026-10-17/verification.md)。

2026-10-17 用户在本轮交付后回复“确定”：确认当前 Select、small二级比较按钮及PDF标识三项视觉修订，见 [范围记录](user-feedback-2026-10-17/manual-acceptance.json)。
