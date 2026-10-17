# ConversationComposer 本地整体验收与登记收口

2026-10-16 · card-v2 · System Mode · 未发布 Registry Candidate。

本轮按用户要求检查现有组件整体，发现问题直接修复；真实业务接口明确后续接入。当前范围是原两份规划的 C01–C13 / Task 0–9，历史 run-01–08 保留，不重写原 G6 十二项验收。

## 修复与登记

1. **异步移除的公共接入边界。** `removingIds` 是可选参数。旧实现省略它时，本地移除请求仅记录于 ref，不会更新界面，也不会阻止发送。现在复用该请求记录触发界面刷新，与宿主移除状态合并：等待期间显示“正在移除…”，禁止发送和重复移除，待处理资料保持可见；失败可重试，旧会话返回结果不解除新会话请求锁。提交事件也同步检查请求记录。公开 API、上传引擎和业务所有权未变。
2. **资产检索遗漏。** 旧 `verification.automated: see-current-scoped-evidence` 不满足索引收录条件，导致已有 Registry 的组件无法按用途检索。本轮实际验证后登记 `scoped-passed`，使用原生成器的 `validateAsset` / `renderAssetIndex` 生成本资产行；索引其它内容逐字保留。专项检查新增当前证据一致性、唯一索引行及中英文关键词检索，不再只验证文件存在。
3. **当前入口更新。** Registry、Manifest、README、G6 接入指南和阶段记录统一指向 run-09，替换原 run-02 的过时计数与“本轮”入口；保留所有历史记录。用户已确认的工具行尺寸、发送图标、极浅占位文字保持。

## C01–C13 验收对应

下表的“通过”仅指本轮本地实现和实际执行检查；录音用合成麦克风，转写/上传/资料/消息为本地演示适配，不等于真实服务或实机通过。

| 合同 | 结果与证据 |
| --- | --- |
| C01 表面与布局 | 通过。四组合、同一 textarea、草稿/选区保持、连续收起展开及快速反向；browser/report.json 的 layout / four combinations 场景。 |
| C02 正文输入 | 通过。自然增高、上限滚动、清空、Enter 换行、组合输入保护；主组件单元和浏览器 long draft / keyboard 场景。 |
| C03 文件入口与恢复 | 通过。选择/拖放/粘贴入口、失败重试、长文件名、多文件滚动；本轮补齐省略 removingIds 的异步移除守卫，单元涵盖失败、拒绝、重复点击和同 ID 跨会话返回。 |
| C04 引用和范围 | 通过。临时选择、搜索保留已选、确认/取消、空范围与失效资料；picker 单元及浏览器 picker / source 场景。 |
| C05 讨论回复 | 通过。回复摘要、取消保留正文、发送失败保留回复、定位原消息；G6 单元及浏览器 discussion reply 场景。 |
| C06 录音生命周期 | 通过本地浏览器检查。权限分支/取消/资源清理与迟到结果有单元；浏览器用真实 MediaRecorder 和合成输入验证录制/停止，未测物理麦克风。 |
| C07 转写恢复 | 通过。保留录音、重试/丢弃、取消转写、插入前审阅及旧结果隔离；voice 单元与 native capture / recording cancellation 场景。固定模拟转写不代表识别能力。 |
| C08 提交与失败 | 通过。确认前保稿、同步防重复、原身份重试、编辑清理旧错误；adapters 单元与 files and sending / unchanged failed payload 场景。 |
| C09 生成与下一稿 | 通过本地适配。停止当前回答不提交/清空下一稿；G6 单元与 course scroll / stop 场景。真实 AI 取消仍由接入方实现。 |
| C10 会话隔离 | 通过。草稿/附件/转写/提交与移除回调归属原会话；adapters / voice / composer 单元与浏览器会话切换场景。 |
| C11 阅读回归 | 通过。历史阅读、prepend、返回最新、回复定位、展开及停止不破坏阅读；专项实际执行既有 conversation-scrolling helper。 |
| C12 可访问性与响应式 | 通过限定自动/页面检查。桌面1440×1000、窄屏390×844，320px组合、键盘与焦点、浅深色、减少动效和强制颜色有证据。未把这些等同于真实 Safari、VoiceOver、物理触摸或软键盘测试。 |
| C13 导出与登记 | 通过。本轮修正可检索缺口与过时入口；专项登记7/7通过，见 scoped-governance.json，包含导出、样式、依赖闭包、当前来源绑定、索引唯一性及生命周期一致性。原 G6 十二项与保护文件保持。 |

## 实际验证

- 完整专项单元 **314/314，15个文件，0失败、0跳过**：unit.log、unit-report.json。
- 完整浏览器 **34/34，0失败、0跳过、0 flaky**：browser.log、browser/report.json。每个场景分别在桌面与窄屏执行。
- UI、Playground、测试三项类型检查通过：typecheck-ui.log、typecheck-playground.log、typecheck-tests.log。
- Playground 构建通过：build.log；保留既有大分块体积提醒，不将其作为本组件缺陷隐去。
- 移除缺陷先红后绿：remove-baseline.log 的3个新增失败用例；remove-fixed.log 的32/32主组件用例通过；完整单元随后覆盖最终实现。
- 登记基线暴露索引缺口：registration-baseline.log；新增规则后最终 **7/7通过，0 pending**，输出为 scoped-governance.json / scoped-governance.log；49项当前源绑定与3项保护哈希完成核对。
- 全库索引检查 **失败于其它附件视觉任务缺少 `evidence/runtime/attachment-visual-2026-10-16/verification.md`**：asset-index.log。本轮未补造该任务证据，也未删除它的索引行；本资产独立生成和检查不宣称全库检查通过，见 index-update.json。

## 实际页面观察

主代理在当前5481预览检查：390px长稿收起后正文高112px、滚动到末尾，选区312/312且编辑器仍获焦，页面宽/滚动宽均390px；发送失败保留原稿，焦点留在“重新发送”，关闭模拟失败后成功本地重试。窄屏选择资料、搜索保留已选并确认后回编辑器，见 narrow-picker.jpg。启动/构建测试服务期间页面发生开发刷新，重读当前状态后再操作；未将失效定位作为组件缺陷。

在目标尺寸审阅本轮生成的 bounded-materials-narrow、stable-voice-toolbar-narrow、voice-retained-narrow、send-recovery-narrow 和 surfaces-desktop-dark：多附件滚动区与正文/操作区分离；长文件名与错误原因、下行恢复动作关系明确；录音中和转写失败均保留正文，主动作仍在右侧原位置；灰/白底靠填充与边框区分，深色正文和工具可辨认。保留已确认的纸飞机大小与极浅占位表现，未增加视觉补偿或修改全局样式。最终当前页面见 preview.jpg。

## 状态与后续

- 本地工程验收与登记收口通过，按上述实际结果及 scoped-governance.json 记录。资产继续为 registry-candidate / unpublished。
- 用户先前的“确定”对应工具行、发送图标和极浅占位文字；本次请求明确授权整体检查和修复。**最终整体 Human Gate 仍待用户确认本轮交付**，不将代理检查冒充人工验收。来源和确认范围见 acceptance.json。
- Task 10 真实上传、课程权限/检索、ASR、消息状态核对、AI 和持久化按用户指令后置。录音 Blob 仍只保存在实例内存，跨刷新/卸载/会话切换不承诺恢复。
- 真实 Safari、VoiceOver、物理触摸/软键盘、物理麦克风，以及广泛对比度接受独立保留。此次不发布包/Registry，不写 Figma，不迁移业务，不提交或推送 Git。
