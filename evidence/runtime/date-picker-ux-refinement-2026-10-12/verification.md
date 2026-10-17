# DatePicker UX refinement — 本轮本地验证

用户授权：可以，按这版方案落地到组件库，复用现有组件和样式，把前面发现的交互问题一起修掉，再检查窄屏和键盘操作。

状态：本轮 DatePicker 实现与有限验证完成。日期组件的冻结隔离版本通过 56 项治理回归、scoped 检查、测试工程类型检查与独立消费。共享工作区仍有另一项 Slider 任务并行修改，**本报告不声明当前整个 live 工作区的来源证明链或全局检查通过**。人工视觉、完整对比度、发布及业务迁移验收均未授予。

## 实现与浏览器证据

- 日期和时间按开始/结束组织，使用现有 FormItem 内置标题；每个端点仅有一个 HH:mm 输入框。输入焦点不再隐式改写日历目标，单端点修改通过日历按钮显式触发。
- 时长工具默认折叠；清除按钮使用 regular 图标加文字，同时清空日期、时间和自定义时长草稿；错误提示保持一处，正常日期不会因时间错误被标红。
- UI 回归 180/180、样板页回归 10/10 通过，分别见 `unit-regression.log` 与 `playground-pages-unit.log`。UI、Playground 类型检查和 Playground 构建通过，见对应 typecheck/build 日志。
- 10:37 对并行工作区当前 DatePicker 与时间样板核心补充复核：5 个文件 80/80 通过，见 `live-date-picker-unit.log`。这是共享导入随后变化后的核心复核，与前述 190 项不重复累加；不代表 live 整体来源链或全库通过。
- 主任务使用 Codex 内置 Chromium 进行真实 CUA 操作：23/23 检查通过、10 张截图、控制台错误 0，见 `browser-cua/checks.json`。覆盖 320px 窄屏、390×480 矮视口、480×360 横屏高度、四个输入框 3px 焦点光晕、Tab 顺序、双日期与显式端点选择、嵌套年份 Escape、清除/取消/恢复、单一错误、时长应用和深色外观。
- 新浏览器测试套件已收集 12 项并通过隔离测试工程类型检查；**未执行该 Playwright 套件**。没有运行 CLI 浏览器。触控 Sheet、真实触摸设备、Safari、VoiceOver、原生缩放及完整 forced-colors/reduced-motion 浏览器矩阵仍未验收。

## 固定隔离版本与并行工作区

验收快照在本轮代码冻结后建立，恢复了并行 Slider 任务覆盖的既有 Slider 源及共享入口，并在快照中去掉新 Slider 阶段和新增 Slider 文件。实际 live 的 Slider 改动全部保留。快照的 32 项源字节存于 `isolated-validation/source-snapshot/`，已验证绑定存于 `isolated-source-bindings.json`。

- 已验证隔离绑定 SHA-256：`5ee52a7ef5d1a5390094d9545e1840c46ce51d9a3af73df10420c378ee6eb5a9`。
- live 来源绑定 SHA-256：`4328de55cdb3ca85da140ee920c2eab5212db01812fee617b506226b2a4d4550`；它记录 `2026-10-13T02:35:04.753645+00:00` 落盘时的 32 项字节，副本存于 `live-source-snapshot/`。它是该时点的来源记录，**不是 live 完整后继链通过的证明**。
- 落盘时 25 项相同、7 项不同；此前观察到的 29/3 已被并行 Slider 后续更新取代。所有差异和两份摘要见 `source-binding-comparison.json`。不反复追逐后续 Slider 更新重签本轮已验证隔离版本。

| 并行差异文件 | 已验证隔离 after | live 落盘 after |
| --- | --- | --- |
| `apps/playground/src/docs/components/g5-component-pages.tsx` | `3bae461a55103882a440382d6b3dbd2003830e08ae267d33d5fb7780fb178ca9` | `23d4ff3fd0c31eb32be798936e0a84a36cd91abae17a097d45a078ba19763847` |
| `registry/g5-assets.json` | `0dd96749a19eedac8f9b3a9a2b16a3395382c5ee27ee750a595f6916e4e334cf` | `c0dbee6727ff1d165501f65c7988e3e04bd40484da920df23f1f35e1a8f30796` |
| `docs/ai/g5-components.md` | `0ae2907485e537c95708d1bc8145340c4c1767c30439320acb4afa7c5bf9a82b` | `343790d29243cbebd1f506f6b53f6f3f8842836ba61f214ecdfe3abbe829cca9` |
| `status/current-phase.yaml` | `fc8ca8d4a28619331b6001b4034d7ff44c77e27aa22546782b16347284c9da76` | `e4750df41be4c344074e69830b3bd4a201c34c5a0a0a9ed360ba282d9c99fe0e` |
| `scripts/verification-helpers.mjs` | `1fcfab41c813f62e8a3f71a914ee5dfca76490b08e54533f0914b38ebeff6584` | `d4fb615475bae81f6793a2c6ac22ddcb5b57578e31ebfde00f821b34efaf41cf` |
| `scripts/g5-color-consumers.mjs` | `6beacae0d630ce270bbf024b597260b78f1762032b9f1a9069f770b951d1a766` | `fbb231479e52b175dbc3f5f9e4f51da4ba5ffb65b1cbfc5db7d111ad7959ec76` |
| `scripts/verify-g5-components.mjs` | `ac148c9e248a40cdb9f4a336edca6d40de6d29231a8f550ee56187bafac559a6` | `d2bead0926ea755119028ffef97c62c73bd57184560537c32b8849922e981752` |

Slider 任务曾将本轮尚在进行中的来源绑定、颜色账本和验证说明纳入其基线。本轮按授权完成最终记录；没有修改 Slider 的基线。该任务的来源基线需在本轮收尾后重新核对并衔接最终证据。

## 治理、消费和类型检查

- 新 UX 后继授权/来源/颜色治理先 RED 后 GREEN，记录于 `governance-red.log`、`color-governance-red.log`、`governance-green.log`。初期后继、原日期与证据路由 13 项通过。
- 冻结快照最终 scoped 检查通过：5 个资产、8 项能力、55 个 Category paint、27 个 native paint。颜色账本仅替换本轮 DatePicker CSS 的 8 个 Category paint 和 2 个 native paint，旧 Calendar 等消费者保留。见 `isolated-validation/scoped-governance.json`。
- 最终治理回归 **56/56**：串行主套 49 项及 G4 尺寸 7 项，见 `isolated-validation/scoped-governance-unit.log`、`isolated-validation/scoped-governance-sizing-unit.log`。第一次并行执行中的 1 个默认 5 秒超时保留在 `isolated-validation/scoped-governance-unit-concurrent-timeout.log`；同轮 CLI 通过，串行重跑通过，没有更改测试断言或超时阈值。根目录同名 `scoped-governance-unit.log` 是较早的 live 并行漂移诊断，保留其失败结果，不作为这 56 项通过的依据。
- 隔离测试工程类型检查返回 0，无诊断输出；命令结果见 `isolated-validation/check-results.json`，日志为 `isolated-validation/tests-typecheck.log`。不能由这份快照结果推断含后续 Slider 测试的 live 整体状态。
- 独立消费通过：138 个规范源文件、84 个 UI 文件、1077 个类型文件、1837 个构建模块，外部文件/模块/链接均为 0；对外 DatePickerPreset 类型及跨日时间段示例一并校验。仅复制所需源码及本机已安装依赖缓存，未做全新联网安装或消费端浏览器验收。
- 消费包 `isolated-validation/g5-source-consumer.zip`：295906 字节、196 项；SHA-256 `9f83becf7133bbdd0b8b320e4e9501ad333913ba25dae754eac06c4bc12dab85`。依赖未打入 ZIP。消费报告及类型/构建日志在同目录。

## 旧证据完整性与全局边界

- 原日期优化的 45 份 before 字节全部匹配；固定 baseline SHA-256 `220ca41441ef67ba9de602d92f5e7c28266145ed729a665d8d2ac5dfe5383e56`。
- 上一轮来源证明 SHA-256 `b6b74fcaf142d4f454387157dfb09125c8a7ca2f3a0e6110a01135b6891b85ca` 保持不变；805 项上一轮日期证据及 381 项更早 G5 证据全部匹配。没有改写旧颜色账本、来源证明或验收记录。见 `source-integrity.json`。
- 独立只读抽查确认隔离 32/32、before 45/45、旧证据 805/805、消费源码 138/138 及 ZIP 摘要/CRC 一致。其发现的收尾前陈旧说明与全局对照 JSON 已由本报告和最终对照更新。
- workspace、evidence、boundaries、tailwind、tokens 五项全局检查此前均失败；本轮隔离快照仍失败，诊断与上一轮逐行一致，各项新增/移除均为 0。见 `isolated-validation/global-before-current-comparison.json`，不将这些既有失败包装成通过。
- scoped 色彩检查仍有 4 项对比度、16 项资格待审；10 项状态对比测量无新增 findings，不能替代完整人工对比度验收。Human Gate 为 awaiting_human、contrastAcceptance 为 not-granted、publication 为 unpublished；没有 Git 提交/推送、Figma 写入或业务迁移。
