# Avatar 家族实施验证

> 用户已于 2026-09-16 确认当前头像修订视觉，Human Gate 为 accepted（visual-only），对比度接受仍未授予。本文记录首轮实现。后续状态配色、圆角、描边、Fill 图标和详情气泡已按用户反馈修订，当前结果以 [2026-09-16 修订验证](refinement-2026-09-16.md) 为准。旧轮配色与下方检查数字不代表修订后的结果。

日期：2026-09-16。用户明确授权“开始实施建设”。依据：[已确认建设方案](../../../docs/plans/2026-09-16-avatar-family-design-and-construction.md)。预览路由：`#avatar`，当前本地服务为 http://127.0.0.1:5361/#avatar 。

## 实施与验收状态

| 项目 | 本次结果 |
| --- | --- |
| 已确认范围的实现 | completed |
| 头像范围自动验证 | passed，范围和命令见下表 |
| 独立技术审阅 | passed，见 [审阅记录](independent-review.md) |
| 人工视觉验收 | awaiting_human |
| 对比度接受 | not-granted |
| 组件身份 | registry-candidate / unpublished |
| 发布、业务迁移、Figma 写入、Git 提交/推送 | 未执行 |

本家族的 `automatedVerification: passed` 是限定范围结果，不表示整库治理或全部测试通过。

## 交付范围

- 六个公共导出：Avatar、AvatarGroup、AvatarGrid、StatusIndicator、StatusIndicatorGroup、ActivityOverlay。资源目录另提供 avatarAssets 和 assignAvatarAssets。
- 单头像仅支持人物图片＋雨课堂默认图，24/32/40、圆形/方形。原生图片请求与解码失败均回退；地址变化时过期异步结果不能显示旧图。未声明 presence 不表示在线；离线仅灰度，原生按钮/链接仍可操作。
- 横向组包含 More 的默认上限为 9；更多成员复用现有 Popover。More 与整组原生动作是兄弟元素，事件与焦点独立。成员内部不挂载操作或状态装饰。
- 九宫格固定 40×40，0 人默认“暂无”，保留 1–9 人排布，超过 9 人取前 9 人，不提供内部动作或 More。
- 边缘最多两个被动状态，支持下左/下中/下右。活动期间隐藏边缘状态并在结束时恢复；旋转图标或脉冲环只使用一种动效，减少动态效果时静止。活动图标使用实色承载面，外层 Focus 保持独立。
- 图库包含默认图 1 张、学生 25 张、教师 25 张；64×64 完整素材预览、稳定编号和复制引用。分配工具面向同一完整成员集合确定性分配，过滤应在分配之后进行；跨集合变化的长期对应关系由宿主保存。
- 展示页提供浅/深主题、紧凑密度、基础矩阵及名单行/课程摘要/课堂状态三个虚构数据组合。复用已有 Token、正式图标、Popover、Dialog；无新增依赖或公共 Token。
- 六份 Manifest、两份 Registry、真实导出与资产索引已同步。历史冻结证据未改写；治理脚本只在精确 Avatar 授权下识别新增范围。

## 素材来源

51 张 PNG 从当前旧 Vue 源目录逐字节复制，实际尺寸均为 240×240。逐项来源、当前 SHA-256 和历史 Figma 元数据见 [source-assets.json](source-assets.json)。当前 51 张文件的 hash 均与旧 `export-report.json` 不同；历史 160px 导出/240px 重采样记录与当前文件校验值分开保留，不声称当前文件与 Figma 导出字节一致，也不声称原生 240px 导出。

## 自动检查

| 检查 | 实际结果 | 记录 |
| --- | --- | --- |
| 最终 Avatar/状态/登记/资产索引定向检查 | 5 文件、12 用例通过，15:30:52 | [final-scoped.log](final-scoped.log) |
| 共享集成回归：Avatar 登记、Layouts、M2、RN15、Table、资产索引 | 6 文件、22 用例通过 | [integrations.log](integrations.log) |
| Chromium 浏览器检查 | 4 用例通过 | [browser.log](browser.log) |
| TypeScript 检查 | 通过 | [typecheck.log](typecheck.log) |
| 构建 | 通过；保留既有大文件体积提示 | [build.log](build.log) |
| Tailwind 实际源码扫描复核 | 3 用例通过，175 个无关用例未运行 | [scanner-regression.log](scanner-regression.log) |
| 资产索引生成与一致性 | `--write` 后 `--check` 通过，并包含在最终定向检查 | [资产索引](../../../docs/ai/asset-index.md) |
| 修改空白检查 | `git diff --check` 通过 | 当前工作区检查 |
| 整库治理复核 | Lockfile、Workspace、Evidence、Boundary、Tailwind 通过；Token 检查被列表任务登记阻挡 | [governance-final.log](governance-final.log) |

复现头像检查：

```sh
pnpm exec vitest run packages/ui/src/avatar packages/ui/src/status-indicator scripts/avatar-family.test.ts scripts/asset-index.test.ts --maxWorkers=2
pnpm exec playwright test tests/e2e/avatar.spec.ts --project=chromium
pnpm typecheck
pnpm build
node scripts/asset-index.mjs --check
pnpm verify:governance
```

浏览器检查覆盖头像尺寸、51 张资源、坏图回退、More 的键盘/Escape/焦点恢复、无嵌套动作、活动优先级与状态恢复、离线资料动作、减少动态效果、深色/紧凑/390px 窄屏、强制色彩焦点以及复制素材引用。

### 整库失败与本次修复的区分

整库运行的原始结果是 **110 文件中 107 通过、3 失败；1403 用例中 1398 通过、5 失败**，见 [whole-suite-before-scanner-fix.log](whole-suite-before-scanner-fix.log)。其中一项是本家族的 `ring` 属性被 Tailwind 当作默认工具类候选；已在当前源码扫描中精确排除默认 ring，并用上述 3 个源码扫描用例复核通过。修复后未重复运行整库，不把定向结果改写成新的整库通过数字。

其余四项失败来自并行列表任务：

1. `icon-button-color-consumers.test.ts` 与 `verify-tailwind-b2.test.ts` 的既有验收审计各被未登记的 `apps/prototype/src/scenarios/list-composition/list.css` 阻挡。
2. `verification-helpers.test.ts` 的两个冻结基线测试被 `evidence/runtime/list-composition/check-browser.mjs`、`verify-source.mjs` 两个并行文件阻挡。

15:30 的整库治理复核仍明确报告该列表 CSS 缺少 Token consumer 登记。本次没有修改列表文件、扩大治理豁免或覆盖历史快照来消除这些失败。

## 浏览器与视觉证据

- [浅色](light.png)、[深色紧凑](dark-compact.png)、[390px 窄屏](narrow.png)、[强制色彩](forced-colors.png)。
- [More 剩余成员](more-open.png)、[状态装饰](status.png)。
- [实际几何](geometry.json)、[减少动态效果](motion.json)。

实现者已在浏览器查看浅色和深色的单头像、横向组、九宫格、状态及组合，并查看上述关键截图；这不替代用户的 Human Gate。此次自动浏览器覆盖 Chromium，未声称真实屏幕阅读器、物理触屏或其他浏览器验证通过。

## 颜色用途与对比度

当前颜色使用 Rain Category 语义，固定消费者与背景登记由负向用例验证，未接受新的对比度例外。[color-measurements.json](color-measurements.json) 保存浅/深组合测量，接受状态仍为 `not-granted`。

首轮曾使用 Icon/Neutral/1 浅底配色；该方案已被用户反馈替换。当前采用旧 Vue 实色状态底＋OnColor 图标，浅色 neutral/warning 两处低于 3:1，仍未接受例外；准确值见修订报告。人物照片颜色不受组件控制；半透明覆盖和装饰环相对任意照片的结果不能用页面背景的 Token 配对值概括。装饰边线及环不是独立信息来源，仍需人工按实际背景确认视觉表现。
