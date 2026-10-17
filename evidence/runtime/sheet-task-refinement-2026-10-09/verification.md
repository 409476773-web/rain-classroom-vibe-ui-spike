# Sheet 标准任务型改造验证

日期：2026-10-09。用户明确“确定，开始改造”，实施最新局部对象标识方案及缩小PDF/低透明底色修订。System Mode，当前registry-candidate、unpublished；没有创建新的资产身份或公共Token。

## 实施结果

- 共享Sheet新增Header / Body / Footer与对应类型出口，头尾固定、正文独立滚动且可键盘进入。独立Title / Description的旧布局与公共420px宽度保留；现有Registry源文件与样式依赖已覆盖新增Parts。
- 文档示例用480px局部Recipe。查看详情先呈现文件身份、三列dl属性、六条编号目录、只读备注；无全宽灰底和逐项重复文件装饰。PDF导入正式file-format-pdf资产，32px画布放进48px淡红底。
- 编辑使用同壳的表单：名称/备注受控、空名称就近报错并聚焦、字数和帮助在备注旁、Footer取消/保存。关闭保留宿主草稿，取消不提交，保存更新当前示例的详情。没有业务API或持久化。
- 调用示例、API、Manifest、AssetIndex同步。新的phase和exact binding仅授权Sheet本次范围；先前三个G2/G3/Toast binding所有字节保留，没有关闭既有Gate。

## 自动检查

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 先行回归 | 缺少Parts和编辑能力，3预期失败/7通过；实现后通过 | red-tests.log / green-tests.log |
| 最终专项Vitest | 4文件21测试通过 | final-tests.log |
| UI包TypeScript | exit0 | ui-typecheck.log |
| UI/文档专项测试TypeScript | exit0，限两份运行时测试 | scoped-test-typecheck.log / tsconfig.scoped.json |
| Playground TypeScript + build | exit0；有既有大chunk提示 | final-build.log |
| Sheet精确授权、后继冻结、颜色登记、AssetIndex | 已纳入最终21测试并通过 | final-tests.log |
| 浏览器检查 | 19/19，通过；无console error | browser-results.json |
| 视觉对照 | 第一轮P2排版修正后passed，只代表实现自查 | design-qa.md / comparison-full.png / comparison-identity.png |
| 全仓Tailwind检查 | failed；改造前与当前phase均有unknown-status-fields根错误 | tailwind.log / global-governance-baseline.json |

早期专项测试TS尝试包含脚本测试时，现有项目没有Node类型定义而失败；没有安装新依赖。最终专项TS仅检查本次UI/文档运行时测试，治理脚本由Vitest直接执行验证。

## 范围与证据保持

源文件和治理文件均从before保存的实际dirty状态增量修改。正式PDF图形与生成wrapper只读。Manifest/状态为新的sheetTaskRefinement记录；既有三份精确binding未改。

改造文件：Sheet源码/测试、UI出口与已有样式；G3组件文档TSX/CSS/测试中的Sheet示例；Sheet Manifest、AssetIndex描述、实施计划、phase、精确验证helper/颜色消费者/治理测试、root Design QA。版本身份、发布、迁移及其他组件来源与业务实现不从本轮推导。

设计方法复盘：V03/V04/D01/D02/D03/D05已覆盖局部身份、文字层级、任务顺序与空间关系。本轮使用这些已有方法，没有新增全局方法或将局部480px/48px晋升全库默认。运行视觉仍需用户审核。

## 独立状态

- Implementation: completed（本次Sheet范围）。
- Automated: passed-scoped；whole-workspace-check: failed-existing-phase-contract。
- Design QA self-check: passed；runtime Human Gate: awaiting-user-review。
- Contrast acceptance: not-granted；390px窄屏、Safari、VoiceOver、触摸手势、完整对比度：not-verified/not-run。
- Publication / business migration / Figma / Git commit/push/PR: not-performed。
- 工作区保留原有dirty/untracked内容；未重置、清理、commit或发布。

本地预览：`http://127.0.0.1:5173/#sheet`，服务器保持运行。下一检查点为用户查看本轮实际视觉与编辑体验。


## 2026-10-09 用户确认更新

用户在Sheet实页交付后回复“确定”。仅记录已展示的右侧、浅色、default密度详情页的视觉与信息编排通过，详见`visual-acceptance.json`；绑定该实页截图与当前源码binding哈希。编辑态、其他方向/主题/密度、跨设备、对比度与辅助技术仍不继承此确认。候选身份、发布、迁移、Figma与Git状态保持原有独立边界。

本次未改运行源码。验收记录/精确范围/冻结证据的9项治理测试通过；联合AssetIndex检查另有AreaChart描述“96×32 / 128×48”与当前Manifest“96×40”的不一致，范围在图表专题，本轮未修订。日志见`visual-approval-checks.log`。
