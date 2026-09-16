# RN-10 / BM-B 验证记录

最新状态：2026-09-15用户委托依据既定Dialog规则完成BM-B整体视觉验收，当前运行视觉已通过；修正标题/说明为8px，补齐宽窄、单双列和异常状态截图，见[本次验收](../dialog-bm-b-visual-2026-09-15/verification.md)。以下RN-10初次实施记录作为历史证据保留，不扩展为Textarea全组件或对比度接受。

本地实现完成；本批自动验证通过；独立技术复核通过；Human Gate=`awaiting_human`。当前总阶段仍为 Token Foundations V1，本批为 RN-10 增量，按 System Mode 检查，业务场景身份保持 `local-experiment`。

基线：`codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`，工作树存在既有未提交修改。本次基线治理与19项依赖测试通过；2296个文件摘要在 `/tmp/rain-bm-b-rn10/baseline.json`。主目录不写入。Textarea源文件与测试原样接入，源摘要见 `textarea-source.json`。

来源：现场查看现存 `evidence/screenshots/VE-014.png`。保留任务分区、长文本、附件和固定操作；组合使用当前 Rain Dialog、Layout、字段，未复制原图卡片/AI样式。Browser plugin 未列出，使用仓库 Playwright 三浏览器流程；输出 `/tmp/rain-bm-b-rn10`。

状态分开记录：本地场景=local-experiment；Textarea=registry-candidate；颜色/对比度接受、真实IMЕ、读屏器、物理触屏与人工视觉仍独立。未创建提交、写入Figma、发布或业务迁移。

## 实际交付

- 独立 prototype `#bm-b`：基本信息、简介、目录、附件四组；默认密度，宽/窄容器和单/双列切换；窄屏自动单列。Dialog Body 独立滚动，Header/Footer 固定。
- 打开复制草稿；FormItem 标签/帮助/错误关联；宿主必填、长度、学科及附件校验并定位焦点；保存中冻结，失败保留，重试成功更新宿主；取消/关闭/Escape/遮罩丢弃，焦点回触发器。
- 最多10个本地模拟附件，成功、失败、重试、移除；未完成附件阻止保存；删除/取消/卸载后中止请求并拒绝迟到成功/失败。仅保留文件名和大小，不读取/传输文件内容。
- Textarea 源码/测试原样接入 RN-07，复用既有字段外框、原生编辑与 Focus；将 Input 已有 ID 合并实现移至 FormItem 并复用，保留内部标签既有能力。Textarea 仅用顶部标签。
- 精确新增 RN-10 授权、Benchmark/入口索引、来源和本地颜色消费者；原 V2 规划及既有 Gate 冻结，未新增依赖或公共 Sheet/Upload。

## 验证结果

| 检查 | 当前结果 | 证据 |
| --- | --- | --- |
| 类型 | 通过，包括测试类型 | `/tmp/rain-bm-b-rn10/typecheck-final.log` |
| 生产构建 | Playground、prototype通过；既有图库大分块提示保留 | `/tmp/rain-bm-b-rn10/build.log` |
| 专项与受影响回归 | 7文件 / 274项通过 | `/tmp/rain-bm-b-rn10/tests-final.log` |
| 生产浏览器 | Chromium、Firefox、WebKit，各3项，合计9/9；0跳过、0重试 | `/tmp/rain-bm-b-rn10/browser-final.log` |
| 布局几何 | 两主题 × 1440/768/390/320 × 三浏览器，24组；边界、底栏按钮实际留白、固定位置、正文滚动与单/双列均通过 | `/tmp/rain-bm-b-rn10/{chromium,firefox,webkit}-geometry.json` |
| 运行画面 | 页面身份、刷新非空、无框架错误页；相关浏览器console/pageerror无错误；查看桌面及390px两主题顶部/底部PNG | `/tmp/rain-bm-b-rn10/*-top.png`、`*-footer.png` |
| 治理 | Lockfile、Workspace、Evidence、Boundaries、Tailwind、Tokens通过；共享历史颜色finding保持独立 | `/tmp/rain-bm-b-rn10/governance-final.log` |
| 范围与Diff | 原2296文件中2276未改变；20个已有文件按本批范围修改；依赖锁、Foundations源码/生成CSS、既有Dialog/Layout/Dropdown实现未改；diff空白检查通过 | `/tmp/rain-bm-b-rn10/scope-check.json` |

单元命令：`pnpm exec vitest run scripts/verification-helpers.test.ts scripts/layouts-v1.test.ts scripts/table-rn08.test.ts packages/ui/src/textarea/textarea.test.tsx packages/ui/src/input/input-field.test.tsx packages/ui/src/dialog/dialog.test.tsx apps/prototype/src/scenarios/bm-b/state.test.tsx --maxWorkers=2`。

浏览器命令：`pnpm exec playwright test --config tests/e2e/bm-b.config.ts`。自动启动5201生产预览，使用仓库固定依赖。真实点击附件按钮打开原生filechooser后设置文件；不是只向隐藏input塞值。WebKit按仓库已有约定使用Alt+Tab验证完整控件焦点循环；Chromium/Firefox使用Tab。

## 独立复核与修正

`rn10_review` 独立只读审阅了本地表单、共享接入、状态与RN-10治理；复验6/6场景、1/1授权测试、29条字符边界断言以及8种非法授权/依赖/历史Gate变更拒绝。

1. P2：标题/作者/出版社的宿主长度曾使用UTF-16，与Input可见字符计数不符。现通过原生Intl.Segmenter保持一致；Textarea仍保留原生UTF-16，补组合字符/emoji/补充汉字边界测试。已闭合。
2. 次要问题：上传重试成功后仍显示先前附件错误。现根据剩余未成功附件派生显示，成功后清除错误语义并测试。已闭合。

复核结论：未发现剩余可复现P1/P2，未代替人工视觉验收。

## 初轮失败和保留欠项

- 首轮浏览器直接check隐藏Checkbox输入，点击被视觉canvas拦截；改为用户可见标签操作，无force。第一次焦点循环使用即时DOM判断，改为等待实际关闭按钮获得焦点。WebKit完整控件导航采用既有Alt+Tab约定。初轮日志分别保存在`browser-initial-locator-failures.log`、`browser-webkit-keyboard-preference.log`，最终9项原行为断言通过。
- 首轮类型检查发现Select无name属性，改用现有SelectHandle定位，不修改公共API；测试里的Testing Library不支持exact选项已移除，最终类型通过。
- 新增原生文件按钮边界出现对比度不足，已移除自绘，复用公共Button；本页新增局部颜色检查通过，但不代表共享组件颜色欠项关闭。
- 扩展检查` scripts/dialog-v2.test.ts `中历史“protected pre-batch UI”快照有1项失败，首个差异为此前已修改的Dropdown宽度CSS；本次基线摘要证实该差异早于RN-10。该测试还比较后续Input/Select等已授权变更，未改写历史摘要来制造全库通过。公共Dialog行为测试本批通过；不声称全库测试全绿。
- 未实测真实系统IME、读屏器和物理触屏；未把模拟上传/保存称为真实持久化。颜色接受、公共组件原有Human Gate、Figma、发布、迁移与Git状态均未从本次通过结果推导完成。

原视觉检查点已由上述整体验收完成。RN-11未开始，后续路线按M1交付收尾记录执行。
# 2026-09-15当前视觉增量收尾

用户在完成分区表面、头部压缩、提示减淡及布局Checkbox间距调整后明确：“视觉已经没问题了”。当前BM-B弹窗整体运行视觉接受，精确范围仍为bm-b-dialog-form-runtime-visual-only；历史阶段验收记录保持原样。增量证据见[分区表面](section-surfaces-2026-09-15.md)和[头部与提示](header-hint-2026-09-15.md)。浅色静态提示3.71:1对比度仍pending-review；此确认不授权发布、迁移、Figma或Git操作。本次仅文档收尾，无新实现或测试结果。
