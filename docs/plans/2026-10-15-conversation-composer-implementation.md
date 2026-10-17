# ConversationComposer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. 本仓库可用技能名为 executing-plans；用户已于 2026-10-15 明确授权执行。本地结果见文末执行记录；提交与发布另行授权。

**Goal:** 用一套共享 ConversationComposer 完成已确认的对话输入体验，并接入课程 AI 答疑与课堂讨论，保留草稿、附件、引用、语音和消息滚动的正确行为。

**Architecture:** 新增 Pattern 层共享组合，源码放在 packages/ui，登记独立 Recipe 候选。组件负责输入与组合交互，既有 useAttachmentUpload 唯一持有附件，宿主负责草稿、消息确认、AI 流、课程数据和服务适配。使用原生 textarea 与既有 Rain UI，不扩大 Field 默认行为，不另建聊天框架。

**Tech Stack:** 现有 React、TypeScript、Vite、Rain Foundations/UI、CSS 与源码 Registry；Vitest/Testing Library、现有 Playwright；浏览器 MediaDevices/MediaRecorder。首轮不新增运行时依赖。

---

## 0. 执行边界与推荐顺序

- 设计依据：[完整设计方案](2026-10-15-conversation-composer-design.md)，其中 C01–C13 是验收编号；[最终图稿](assets/conversation-composer-2026-10-15/README.md)是视觉方向，不是可直接测量的像素合同。
- 当前规划工作区：/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2，分支 codex/card-v2，核对基线 HEAD 为 321e1a0。实施开始时重新检查实际分支、文件和已有修改，不重置工作区。
- 新共享资产及 G6 消费者变更按 System Mode；当前只新增计划和图稿归档。下列代码、测试、登记和阶段状态改动全部是后续工作。
- 不包含 commit、push、PR、发布、Figma 写入、Rain Classic 修改和业务迁移；这些不会因计划通过或测试通过自动发生。
- 不要求一次创建所有抽象。先落地组件、现有两个宿主和明确测试；只在文件已出现独立复杂职责时拆 helper，避免建立通用消息平台。

| 批次 | 任务 | 可审阅结果 |
| --- | --- | --- |
| A：结构与外观 | 0–2 | 两表面 × 两布局、输入与焦点，先做静态及本地行为校准 |
| B：上下文与语音 | 3–5 | 真实文件流程、引用/范围、回复、录音与可取消转写适配 |
| C：消息与场景 | 6–7 | 提交恢复、下一稿、会话隔离、两个 G6 场景 |
| D：登记与验收 | 8–9 | 独立文档、可安装来源、专项证据与待验收项 |
| E：真实业务接入 | 10 | 在提供接口后验证真实上传/识别/消息/检索；独立记录结果 |

依赖顺序为 0 → 1 → 2 → 3/4 → 5/6 → 7 → 8 → 9。接口稳定后任务 3 与 4 可并行，任务 5 与宿主提交逻辑可由不同执行者处理；同一个入口、CSS 或 G6 场景文件只由一个人合并。

## 1. 目标文件清单

以下路径均相对上述 card-v2 根目录。标记“新增”的文件在规划时尚不存在。

| 类型 | 精确路径 | 用途 |
| --- | --- | --- |
| 新增 | packages/ui/src/conversation-composer/index.ts | 公共组件与类型导出 |
| 新增 | packages/ui/src/conversation-composer/types.ts | 草稿、上下文、能力和适配接口 |
| 新增 | packages/ui/src/conversation-composer/conversation-composer.tsx | 主组合与编辑器 |
| 新增 | packages/ui/src/conversation-composer/conversation-composer.css | 组件视觉与响应式 |
| 新增 | packages/ui/src/conversation-composer/conversation-composer.css.d.ts | 既有 CSS 导入约定 |
| 新增 | packages/ui/src/conversation-composer/conversation-composer.test.tsx | 输入、布局、附件与交互测试 |
| 新增 | packages/ui/src/conversation-composer/composer-context-picker.tsx | 资料临时选择与范围呈现 |
| 新增 | packages/ui/src/conversation-composer/composer-context-picker.test.tsx | 选择、搜索与取消测试 |
| 新增 | packages/ui/src/conversation-composer/use-composer-voice.ts | 录音/转写生命周期与资源清理 |
| 新增 | packages/ui/src/conversation-composer/use-composer-voice.test.tsx | 权限、取消、失败与迟到回调 |
| 新增 | packages/ui/src/conversation-composer/README.md | 组合合同与接入示例 |
| 修改 | packages/ui/src/index.ts | 根公开导出 |
| 修改 | packages/ui/src/styles.css | 只追加新样式入口 |
| 修改 | apps/playground/src/docs/components/g6-course-conversation.tsx | 接入两个场景，保留消息与滚动逻辑 |
| 修改 | apps/playground/src/docs/components/g6-course-conversation.css | 移除已被替代的输入区私有样式 |
| 修改 | apps/playground/src/docs/components/g6-course-conversation.test.tsx | 保留既有回归并增加恢复、隔离用例 |
| 新增 | apps/playground/src/docs/components/g6-composer-adapters.ts | 本地服务、提交和按会话草稿适配，限制为 G6 场景所需 |
| 新增 | apps/playground/src/docs/components/g6-composer-adapters.test.ts | 确认、幂等、错误和会话归属测试 |
| 新增 | apps/playground/src/docs/components/conversation-composer-page.tsx | 独立能力与状态展示 |
| 新增 | apps/playground/src/docs/components/conversation-composer-page.test.tsx | 文档页示例与真实入口检查 |
| 修改 | apps/playground/src/docs/components/component-catalog.tsx | 登记 #conversation-composer |
| 修改 | apps/playground/src/docs/components/component-asset-page.tsx | 加载新页面 |
| 修改 | apps/playground/src/docs/components/g6-conversation-pages.tsx | 与输入组件文档交叉链接 |
| 修改 | apps/playground/src/docs/components/g6-conversation-pages.test.tsx | 更新相应入口断言 |
| 新增 | manifests/recipes/conversation-composer.yaml | 共享 Recipe 合同 |
| 新增 | registry/conversation-composer.json | 独立源码安装条目 |
| 新增 | scripts/verify-conversation-composer.mjs | 本轮范围内来源、导出、登记一致性检查 |
| 新增 | tests/e2e/conversation-composer.config.ts | 本轮浏览器配置与证据输出 |
| 新增 | tests/e2e/conversation-composer.spec.ts | 新组件与两个 G6 场景 |
| 修改 | tests/e2e/g6-components.spec.ts | 修正过时滚动场景入口，不删除其断言意图 |
| 修改 | docs/ai/g6-components.md | 记录新组合及消费方式 |
| 生成 | docs/ai/asset-index.md | 使用已有脚本更新，禁止手改 |
| 实施时追加 | status/current-phase.yaml | 仅在开始实施授权后记录本专项边界和实际状态 |
| 实施时新增 | evidence/runtime/conversation-composer-<执行日期>/<run-id>/ | baseline、来源绑定、检查、截图、人工待验收项 |

原则上不修改 App.tsx、路由基础设施、基础 Field/Textarea/IconButton、原 MessageScroller 引擎、原 G6 资产清单、Foundations 或上传引擎。若发现真实阻塞，先列出具体影响，再收敛修改范围，不为方便接入提前扩展这些 API。

## 2. 最小公共合同

以下是拟定合同，任务 1 中根据已有类型检查结果落实；不是已经发布的 API。AttachmentRecord 直接复用已有类型，不复制另一个文件对象模型。

~~~ts
type ComposerReference = {
  id: string;
  name: string;
  availability: "available" | "unavailable";
  unavailableReason?: string;
};
type ComposerReply = {
  messageId: string;
  author: string;
  excerpt: string;
};
type ComposerDraft = {
  text: string;
  references: ComposerReference[];
  reply?: ComposerReply;
  sourceScope?: string;
};
type ComposerSourceOption = {
  value: string;
  label: string;
  disabledReason?: string;
};
type ComposerSubmission =
  | { status: "idle" }
  | { status: "pending"; message?: string }
  | { status: "failed"; message: string };
~~~

建议主组件参数为以下明确分组，首次实现不增加任意 toolbar slot 或任意业务节点渲染器：

| 参数 | 合同 |
| --- | --- |
| conversationId | 必填；异步结果和录音取消边界 |
| draft / onDraftChange | 受控草稿；用户内容变化由宿主递增 revision 并清旧发送错误 |
| draftRevision | 宿主提供的当前会话内容版本，供提交/语音守卫使用；附件用户操作计入版本，上传进度等后台通知不伪装成新用户内容 |
| surface / layout / onLayoutChange | gray 或 white；compact 或 expanded；与 Foundations density 独立 |
| ref / aria-label / placeholder | forwardRef 暴露原生 textarea；宿主可聚焦，标签必须明确 |
| attachments | 可选能力组：items、constraints、rejections、removingIds、onClearRejections、onFiles、onRetry、onCancel、onRemove(id): Promise<boolean>；状态由已有上传 Hook 持有，移除可失败或抛错 |
| references | 可选能力组：query(query, { signal }) 搜索；resolve(ids, { signal }) 按已选 ID 复核并返回引用对象列表。缺失 ID 视为不可用；可用性与权限由宿主提供 |
| sources | 可选能力组：真实 sourceOptions；当前值位于 draft.sourceScope |
| onLocateReply | 可选定位回调，由宿主处理消息定位及不可定位提示；不改变当前正文 |
| voice | 可选能力组：transcribe(blob, { signal, mimeType }) 返回文字、onPermissionHelp；无服务时不假装可用 |
| submission / submitBlockedReason / onSubmit | 受控提交状态与总校验；onSubmit 交给宿主创建快照并提交 |
| generation | 可选能力组：running、onStop；与 submission 分开 |
| disabled / readOnly | 权限控制；只读保留已允许的查看能力，不自动抹除草稿 |

无 attachments / references / voice 能力时省略相应入口；临时不可用与能力不存在要区分。相同内容的一次提交、附件 Hook 和录音尝试均只有一个所有者。

组件的 DOM parts 先限定 root、context、editor、toolbar、primary-action、feedback；使用 data-rain-id="recipe-conversation-composer" 及稳定 data-slot。共享实现可使用既有命名 Local Recipe 扩展点，不把 className 变成修改共享内部状态的后门。

### 提交适配的核心算法

宿主持有 revision、pendingAttempt 和 failureSnapshot。每次用户改变正文/附件/引用/回复/范围时递增 revision，并清除旧错误；布局改变不递增。异步提交保存 conversationId、revision 和 payload 快照。

~~~text
Composer 的统一提交入口:
  若录音请求/录音/转写进行中，或有尚未处理的保留录音：返回
  若 props 中提交/生成状态或 submitBlockedReason 阻塞：返回
  调用宿主 onSubmit

宿主 onSubmit:
  再检查 submitting、AI running、内容/附件/引用/权限校验；不读取组件私有语音状态
  若任一不满足：返回
  若 failureSnapshot 的内容版本仍等于当前 revision：复用 clientMessageId
  否则创建新 clientMessageId
  固定 payload；设置 pending 并冻结本次编辑
  await service.submit(payload, clientMessageId)
  明确 rejected：原会话保稿，保存失败快照与可重试错误
  accepted：按稳定 ID 仅追加一次消息
            仅清除该会话该 revision 对应的草稿和附件快照
            若当前正在另一个会话，不调用当前上传 Hook.reset
            课程场景再启动这一消息的 AI 回答
  unknown/timeout：核对同一 clientMessageId，不能直接重新创建消息
  迟到结果只能更新所属会话，不能修改当前另一会话的输入区
~~~

本地演示实现确定的 accepted/rejected 以验证恢复；真实服务阶段才启用结果未知的核对路径。不能用“超时即 rejected”简化生产合同。

## Task 0：建立可追踪基线

**Files:** 阅读 AGENTS.md、SPIKE_BRIEF.md、status/current-phase.yaml、evidence/visual-evidence.yaml、benchmarks/benchmark-registry.yaml、benchmarks/README.md、相关 Rain Designer/原型接入/图标规范，以及上述 G6 与 Attachment 文件。新增本轮 baseline.json、verification.md；实施授权后追加阶段范围。

1. 确认工作区、分支、已有修改、当前运行服务；记录受影响文件当前哈希与既有差异，不把旧修改归为本轮成果。
2. 对照设计 C01–C13 建立验证表，全部从 pending 开始；记录真实服务、真实设备与人工视觉尚未完成。
3. 给本次执行分配日期与 run-id，所有新输出进入本次目录，不覆盖 2026-10-14 G6 或其他已存在证据。
4. 保存两个旧 G6 场景的同宽截图及行为基线；运行现有定向回归，失败归因后再开始改代码。

~~~sh
pnpm exec vitest run packages/ui/src/message-scroller/message-scroller.test.tsx apps/playground/src/docs/components/g6-course-conversation.test.tsx apps/playground/src/docs/components/g6-conversation-pages.test.tsx
~~~

**退出条件：** 基线、原有失败和修改范围可辨认；未替换旧来源锁、未宣称现有测试全绿。

## Task 1：建立合同与最小可测试骨架

**Files:** 新增 types.ts、index.ts、conversation-composer.tsx、conversation-composer.test.tsx、README.md；追加 UI 根导出。

1. 建立最小渲染用例：受控文字、明确输入名称、同一 ref 可聚焦、只读和禁用、未提供能力不出现假入口。
2. 先运行该用例，确认失败原因是目标能力缺失；实现最小骨架及第 2 节合同。
3. 由宿主显式传入 submission/generation；不要在组件内部再创建一套业务消息状态。
4. 以 TypeScript 编译核对 AttachmentRecord、Local Recipe、IconButton 等现有类型，不通过 any 绕过约束。

~~~sh
pnpm exec vitest run packages/ui/src/conversation-composer/conversation-composer.test.tsx
pnpm --filter @rain-next/ui typecheck
~~~

**退出条件：** 公共导入有效，最小行为用例通过；API 没有要求业务硬编码课程名、学生身份或服务 URL。

## Task 2：完成表面、布局、输入与工具行

**Files:** 主组件、CSS、CSS 类型声明、测试；修改 packages/ui/src/styles.css 仅追加导入。

1. 增加有行为价值的用例：展开/收起不重建 textarea，保留值/选区；自然增高到上限后滚动，清空回缩；Enter/IME 不提交。
2. 迁移当前 useGrowingDraft 的已验证逻辑到新组件，适配两种高度预算，避免两个 ResizeObserver/布局 effect 相互触发。
3. 使用原生 textarea，按设计放置上下文、正文和工具行。默认 compact；layout 改变不隐式清内容。
4. 用 Rain 语义颜色、字号、间距、圆角、Focus 和已存在图标实现两种表面。发送用组件命名 IconButton Recipe；核对真实上箭头与展开图标后在 README 记录 slug。
5. 白底底部阴影先做现有 Token 组合验证。若不合适，列为明确的局部配方差异进行视觉评审，不用硬编码颜色/全局变量掩盖差异。
6. 在桌面和窄容器展示四格同尺寸比较；先验证输入与主操作比例，再接复杂业务状态。

~~~sh
pnpm exec vitest run packages/ui/src/conversation-composer/conversation-composer.test.tsx
pnpm --filter @rain-next/ui typecheck
~~~

**退出条件：** C01/C02 的代码行为有证据；四种组合和 Focus 可直接审阅。像素、阴影和图标未人工检查前不标为已验收。

## Task 3：统一文件入口与附件反馈

**Files:** 主组件、CSS、测试；G6 适配器中使用既有 packages/ui/src/attachment-workflow/use-attachment-upload.ts，原则上不修改上传引擎。

1. 增加选择/拖放/图片粘贴传入相同 onFiles 的测试；覆盖不吞掉普通文本粘贴、重复文件和不支持文件的反馈。
2. “＋”使用 DropdownMenu；第一项触发组件内隐藏的原生 file input，第二项交给资料选择器。复用 Hook.addFiles 校验与状态，不扩展现有 AttachmentPicker trigger API。
3. 用 Attachment Parts 显示紧凑文件项；实现上传中、处理中、失败、取消、就绪、资源不可用；预览复用 AttachmentPreview。
4. G6 宿主显式以 autoUpload:true 创建唯一 Hook；默认手动模式会停在 idle，不能误用。items、rejections、removingIds 与动作回调传入组件，不能 onChange 后每次 reset 回灌；切换会话或成功清除当前会话提交快照时才显式 reset。
5. 重试、取消、移除各操作保持 ID 和焦点；移除进行中禁用重复动作，Promise<boolean> 返回 false 或抛错时保留该项并显示局部原因，仅在实际移除后转移焦点。选择同一文件后 file input 可再次触发。onRemove 是解除草稿关联，非默认永久删除文件。
6. 校验发送同时检查 Hook.summary.canSubmit、availability、权限、业务内容要求；附件仅上传 done 仍不足以证明能发送/检索。

~~~sh
pnpm exec vitest run packages/ui/src/conversation-composer/conversation-composer.test.tsx packages/ui/src/attachment-workflow
~~~

**退出条件：** C03 成立；至少一项真实 File 可经历本地上传适配、失败重试和移除。演示与真实上传结果明确区分。

## Task 4：引用、范围与讨论回复

**Files:** composer-context-picker.tsx、对应测试、主组件/CSS、types.ts。

1. 先覆盖临时选择：打开继承已选、搜索保留已选、确认提交、Escape/外部关闭不提交；覆盖新旧搜索响应倒序到达。
2. 使用 Popover + 搜索输入 + Checkbox；维护临时 ID 集合及对应对象，不将“已选但未在当前结果中”的项目丢弃。
3. 实现加载/空列表/空搜索/加载失败/不可用；请求取消用 AbortSignal，并用请求序号拒绝迟到数据。确认时对全部临时选中 ID 调用 resolve，检查中冻结选择并允许取消；缺失/失效项保留名称且可取消勾选，原草稿不变，全部有效才应用。测试取消后 resolve 迟到、已选项不在当前搜索结果中及部分 ID 失效。
4. 范围用 RadioGroup，选项只来自宿主。无引用时禁用引用范围；删除最后一个引用后保留原范围并给出阻塞原因。
5. 回复区域显示作者和摘要，取消只删除 reply；紧凑/展开均可识别。定位由宿主回调处理，不让共享组件依赖 MessageScroller 的消息数据。
6. 验证菜单关闭→选择器打开的焦点交接；确认回编辑器，取消回触发器。按最终等高修订图，在同宽、同布局、同正文/上下文行数下比较两侧输入框；弹层打开前后高度相同，长资料列表只在浮层内滚动，两个不同内容的浮层不强制同高。

~~~sh
pnpm exec vitest run packages/ui/src/conversation-composer/composer-context-picker.test.tsx packages/ui/src/conversation-composer/conversation-composer.test.tsx
~~~

**退出条件：** C04/C05 成立；AI 引用和讨论回复没有混为同一种权限/可用性对象，引用范围不会被静默扩大。

## Task 5：录音与可恢复转写

**Files:** use-composer-voice.ts、对应测试、主组件/CSS、types.ts；演示转写适配放在 g6-composer-adapters.ts。

1. 用可控制完成时机的媒体/转写测试替身，覆盖权限拒绝、取消后权限获准、录音取消、结束→转写、转写失败重试、卸载和会话切换。
2. 实现 idle/requesting/recording/transcribing/retained 状态；retained 区分转写失败与用户取消原因，权限拒绝/无设备仅为没有 Blob 的提示。每次尝试绑定 conversationId、attemptId 和 draftRevision，迟到结果不得写入新上下文。
3. 请求媒体仅由点击触发；按 MediaRecorder.isTypeSupported 选择格式并保留实际 MIME。所有出口停止 track、recorder、分析器/动画帧并释放对象 URL；权限迟到后也必须清理。
4. 按已确认图制作中性波形、取消和方形结束，隐藏可见计时/红点/录音文案；为读屏提供必要状态与名称。
5. 录音/转写时冻结正文和上下文；记录选区末尾，非空转写成功才插入，不自动发送。空字符串/纯空白结果转入 retained 并提示“未识别到文字，录音已保留”。取消不恢复旧文本快照；没有可靠位置时追加末尾。
6. 转写失败保留 Blob、恢复编辑；重试记录当前光标与 revision。转写期间取消只终止该次请求，回到 retained；明确丢弃才清 Blob。存在尚未处理的保留录音时阻止发送与新录音，重试成功或丢弃后解除；没有 Blob 的权限问题不阻塞文字发送。测试取消重试后录音仍能继续重试。
7. 无麦克风/无权限时允许继续文字发送；AI running 时语音暂不可启动，提供原因。演示转写结果在演示说明中明确为模拟。

~~~sh
pnpm exec vitest run packages/ui/src/conversation-composer/use-composer-voice.test.tsx packages/ui/src/conversation-composer/conversation-composer.test.tsx
pnpm --filter @rain-next/ui typecheck
~~~

**退出条件：** C06/C07 的异步安全用例通过，浏览器实际录音单独记录；模拟转写通过不代表真实 ASR 可用。技术依据见设计方案第 7 节的 MDN 原始文档。

## Task 6：实现宿主提交、恢复和会话草稿

**Files:** g6-composer-adapters.ts、对应测试；主组件只消费状态与回调。

1. 写行为用例：双击只提交一次、确认前不清稿、明确失败保稿、修改清旧错误、纯重试复用 ID、同一确认只追加一次。
2. 将第 2 节算法落实为 G6 所需适配逻辑，固定 payload 中的正文、附件远端标识、引用、范围、回复快照。提交时检查资源可用性，不提交未完成的本地 File 引用。
3. 明确提交状态和 AI 回答状态的边界；提交成功后才启动 AI，期间的新稿由宿主单独保存。回答失败不恢复旧提交正文。
4. 为 AI 停止/重试保留当前消息身份与 attempt 检查；running 时可写下一稿，不能并发发送，停止不能调用 submit。
5. 按 conversationId 维护页面内草稿，revision 包含内容及附件用户操作，不因上传进度自动递增。onChange 同步维护最新附件快照 ref 和明确的 ownerConversationId；切换时先保存 A 的最新快照，将 uploading/processing（含 replacement）归一为 canceled，再把所属会话 ref 改为 B，最后 reset(B 快照) 中止旧任务并发布 B。整个交接同步完成，不用 cancel 后旧 render 的 hook.items，不让 reset 的同步 onChange 把 B 写进 A；readonly/disabled 时也须通过 reset 中止旧任务。
6. 测试“提交 A → 切到 B 并输入 → A 成功/失败”：只更新 A 的消息和草稿。语音取消结果不跨会话，附件请求不挂到另一会话。
7. 本地演示使用可控的 accepted/rejected；把真实 unknown/timeout 核对列入服务适配合同，暂不制作假成功。

~~~sh
pnpm exec vitest run apps/playground/src/docs/components/g6-composer-adapters.test.ts
pnpm --filter @rain-next/playground typecheck
~~~

**退出条件：** C08–C10 的确定性用例通过，业务适配没有扩展成全局状态框架、离线队列或持久化平台。

## Task 7：接入现有两个 G6 场景

**Files:** g6-course-conversation.tsx/.css/.test.tsx、g6-composer-adapters.ts。

1. 先用现有测试记录仍需保持的可见行为，再将 CourseScene 与 DiscussionScene 的旧 Textarea 区域分别换成 ConversationComposer。
2. 保留课程消息、增量回答、来源展开、停止/重试、讨论回复定位、历史加载与 ReturnToLatest 逻辑；输入器布局变化不能重建消息列表。
3. 把“只保存首个文件名”的演示改为 Hook 驱动；消息渲染消费提交时的附件快照，可包含多个完成项。
4. 讨论失败后编辑正文、取消回复、移除附件、调整上下文均清理旧错误；保持仅一个重新发送入口。
5. 删除已无消费者的旧 useGrowingDraft 与私有输入区样式；不顺手格式化或重构整个消息页面。
6. 在演示控制中提供可重复的上传失败、转写失败、发送失败与 AI 中断，不在正常用户工具行塞调试按钮；清楚标记模拟服务。
7. 验证回复/取消/删除后的焦点，以及自然增高/展开时的历史阅读位置；重试与重新生成不新增重复消息。

~~~sh
pnpm exec vitest run apps/playground/src/docs/components/g6-course-conversation.test.tsx apps/playground/src/docs/components/g6-composer-adapters.test.ts packages/ui/src/message-scroller/message-scroller.test.tsx
~~~

**退出条件：** C11 与既有关键回归保持，两个场景共享同一输入实现。当前组件不是仅静态文档页可用。

## Task 8：文档、登记与可检索消费

**Files:** 独立 Playground 页面与测试、catalog、component-asset-page、G6 交叉链接；README、Manifest、Registry、scoped verifier、docs/ai/g6-components.md、本轮来源绑定。

1. 新文档 #conversation-composer 展示四种布局表面、空稿/长稿/上下文、附件、引用/范围、回复、语音和错误恢复；优先真实操作，不把全部状态放成无法操作的截图墙。
2. 简洁区分组件能力、宿主责任、演示服务与未接入能力；同时给出 AI 和讨论受控接入例子，记录 Enter 换行、来源范围和附件-only策略。
3. 登记 recipe-conversation-composer，sourcePath 指向新 index.ts；assetIdentity/maturity 为 registry-candidate，publication 为 unpublished，humanGate 按实际保持 awaiting_human。
4. Manifest 覆盖 anatomy、parts、props、states、variants、density、tokens、composition、accessibility、visualLineage、sourceVersion、修改边界与未验证项。共享行为按 managed 维护；业务组合留在宿主。
5. Registry 列出实际运行时文件、类型/样式、单图标与既有依赖；排除测试文件和服务凭据。使用现有 @rain-next/ui 根入口，不额外建立 package subpath。
6. 保留 registry/g6-assets.json 的原十二项；不改 verify-g6-components.mjs 的十二项断言，也不更新旧 G6 source-lock 来使新改动“通过”。为本专项绑定当前实际文件哈希与验证。
7. scoped verifier 只检查新资产的导出、来源文件、CSS 入口、依赖、Registry/Manifest 一致性与保护范围；沿用既有脚本风格，不新建校验框架。
8. 使用现有资产索引生成器，再检查生成结果只反映已完成登记的能力。

~~~sh
pnpm exec vitest run apps/playground/src/docs/components/conversation-composer-page.test.tsx apps/playground/src/docs/components/g6-conversation-pages.test.tsx
node scripts/asset-index.mjs --write
node scripts/asset-index.mjs --check
node scripts/verify-conversation-composer.mjs
~~~

**退出条件：** C13 成立；消费者能从文档找到真实导出和来源。旧证据保持历史含义，不继承其验收状态。

## Task 9：专项浏览器验证、审阅与收口

**Files:** 新 conversation-composer.config.ts/.spec.ts，修正 g6-components.spec.ts 的过时场景；本轮 evidence 中保存报告、截图、验证表与人工检查清单。

1. 参照 tests/e2e/attachment-workflow.config.ts 创建本轮配置；选择未占用端口，不复用来历不明的服务，不关闭用户其他运行任务。输出路径使用 Task 0 的日期/run-id。
2. 若需要 HTTP 上传，复用 tests/fixtures/attachment-server.mjs 及其现有端口能力；检查端口占用后启动。语音异步故障用可控测试替身，真实麦克风另做手工检查。
3. 修正旧 g6-components.spec.ts 中“模拟增量回答/暂停/定位第 4 条/载入更早消息/到最新”等失效定位，改用当前真实流程。保留历史阅读不被拉到底部、prepend 位置保持、返回最新后的按钮状态断言；不能仅 skip 旧场景。
4. 新专项配置覆盖 Composer 独立页与两个 G6 场景；复用经修正的滚动场景或将等价场景纳入本次配置，确保相关旧断言确实执行，而非只改文件不运行。
5. 检查四种组合、长文本、长文件名、空/多引用、弹层开关等输入尺寸；截图使用相同视口、相同内容和相同焦点状态。
6. 验证键盘全流程、IME 不发送、焦点回退、浅/深色、减弱动效、forced-colors；自动浏览器证据不替代真实 Safari/VoiceOver/触摸/软键盘。
7. 完成一次有针对性的代码审阅，重点检查异步回调、资源泄漏、单一状态所有者、幂等与旧 G6 回归。只修本轮发现的问题，再重跑受影响检查。
8. 按 C01–C13 逐项填写结果与证据；本地演示、真实录音、模拟转写、真实服务、人工视觉分别记录，不合并为一个“全通过”。

### 汇总验证命令（实施后运行）

~~~sh
pnpm exec vitest run packages/ui/src/conversation-composer packages/ui/src/message-scroller/message-scroller.test.tsx apps/playground/src/docs/components/g6-composer-adapters.test.ts apps/playground/src/docs/components/g6-course-conversation.test.tsx apps/playground/src/docs/components/g6-conversation-pages.test.tsx apps/playground/src/docs/components/conversation-composer-page.test.tsx
pnpm --filter @rain-next/ui typecheck
pnpm --filter @rain-next/playground typecheck
pnpm exec tsc --noEmit --project tsconfig.tests.json
pnpm --filter @rain-next/playground build
pnpm exec playwright test --config tests/e2e/conversation-composer.config.ts
node scripts/asset-index.mjs --check
node scripts/verify-conversation-composer.mjs
~~~

Task 3 的上传回归在对应改动完成后执行；没有新变更或新风险时不反复扩大到全仓检查。上述新文件/新脚本在当前规划阶段尚不存在，命令清单不代表已经执行。不要用根 pnpm verify 自动扩大为所有历史组件和全套构建。

**退出条件：** 局部检查、可复现浏览器操作和必要源绑定完成；失败、未验证与待人工确认明确列出。用户视觉接受后只更新本专项对应范围，不自动升级全库或生产状态。

## Task 10：真实服务接入与独立验收

这一步需要业务方的实际接口和接入授权；在此之前，A–D 的本地能力与证据可以完成。没有服务输入时不编造 URL、凭据、检索结果或“已发送”记录。

| 接口 | 最少需要明确的合同 | 验证重点 |
| --- | --- | --- |
| 文件上传 | 鉴权、限额、取消、远端 ID、availability、移除语义 | done 与可用分离，失败重试，资源权限 |
| 课程资料 | 搜索、分页/结果规模、稳定 ID、权限、删除/失效 | 临时选择、过期结果、失效引用、课程范围不越界 |
| 转写 | 支持 MIME/时长/大小、返回文本、取消、错误类别 | 实际录音识别、超时保留 Blob、重试与取消 |
| 消息提交 | accepted/rejected/unknown、clientMessageId、状态核对 | 网络重试不重复，确认前保稿，结果归属原会话 |
| AI 回答 | 流式增量、停止、错误、重试身份与来源 | 停止真正生效、旧尝试隔离、下一稿保留 |
| 草稿持久化（后续） | 可序列化附件引用、保存冲突、恢复范围 | 不假定 File/Blob 可跨刷新复活 |

服务限制影响产品行为时，先在宿主能力与文案中如实表达，再验证；不以临时 mock 补齐生产缺口。真实 Safari、VoiceOver、触摸和软键盘各自需要实际检查记录。

## 3. 重点测试情景映射

| 风险 | 必须有的情景 | 对应任务 |
| --- | --- | --- |
| 编辑器重建导致光标丢失 | 同一节点经历展开、加引用、错误出现 | 2/4/9 |
| 旧失败提示污染新内容 | 失败后改正文/取消回复/移除附件；布局切换仍保留失败 | 6/7 |
| 重复发送或错误清稿 | 双击、重复确认、A 请求返回时正在写 B | 6/7 |
| 语音迟到污染草稿 | 取消后获权限、取消后转写成功、切会话后返回结果 | 5/6 |
| 转写恢复覆盖新文字 | 转写失败后编辑，再点击重试，在新光标插入 | 5 |
| 上传或来源假就绪 | 上传 100% 仍处理、done 但 forbidden、删除最后引用 | 3/4 |
| 权限缺失牵连文字 | 麦克风拒绝后仍正常输入与发送文字 | 5/7 |
| 停止误触发送 | AI running 时有下一稿，点击停止只停止回答 | 6/7 |
| 历史阅读跳变 | 阅读中增量回答、prepend、输入区增高/展开 | 7/9 |
| 模拟结果被误认为服务能力 | 文档与演示均明确服务状态；报告拆分验证范围 | 8/9/10 |

## 4. 计划完成与实施完成的区别

本次完成的是方案与可执行任务划分。实施完成时应交付实际代码、定向检查结果、本轮源码绑定、可打开的 Playground、同条件截图及待人工确认清单。开始执行时以 Task 0 为入口；无需重新做已经确认的六套视觉方向探索，但应核对当前工作区是否发生变化。


## 5. 本轮执行记录

2026-10-15 用户授权后已按推荐顺序实施 Task 0–9。实际新增独立页面样式 `apps/playground/src/docs/components/conversation-composer-page.css` 与复用滚动检查 `tests/e2e/helpers/conversation-scrolling.ts`。索引生成器不支持目录形式的 export，根入口对两个现有/新增组合使用明确 `/index`，没有改变导出能力。

视觉校准落实紧凑行内工具、展开书写空间、窄容器工具换行、真实麦克风图标和单一编辑焦点。只读及会话切换的迟到回调、范围保留已补专项回归。旧 G6 滚动用例改为当前真实操作，并由本轮浏览器检查执行同一 helper。验证、源码绑定与待人工项目见[本轮验证记录](../../evidence/runtime/conversation-composer-2026-10-15/run-01/verification.md)。Task 10 的真实业务接口与设备验收保留为后续接入范围。

用户随后要求逐项检查并直接修复。附件排版/移除反馈/动态预览/替换阻塞、引用恢复/名称保留/空范围宿主复核、语音光标迟到与发送失败焦点已补回归并修正。当前证据独立记录于[run-02 检查记录](../../evidence/runtime/conversation-composer-2026-10-15/run-02/verification.md)，不覆盖 run-01。候选、真实服务与人工验收边界保持原状。

2026-10-15 用户进一步授权按体验评审顺序优化并打开页面。范围可见/空稿提示时机、选择器布局与搜索分组、局部恢复反馈、明确录音丢弃、失败重试图标、多资料收纳、视觉细节及首屏体验已按同一候选范围调整。专项记录与后续验证见[run-04](../../evidence/runtime/conversation-composer-2026-10-15/run-04/verification.md)。

2026-10-15 第二轮研究后，用户授权“按顺序开始优化”。实施顺序为：正文全宽与固定下方工具行 → 统一来源资料项和有界滚动 → 范围与选择器视觉层级 → 录音时长、稳定语音操作槽和局部动效 → 完整会话及窄屏恢复检查。设计第 15 节明确修订此前紧凑行内排列。具体改动、实际执行检查及保留边界见 [run-05](../../evidence/runtime/conversation-composer-2026-10-15/run-05/verification.md)。

2026-10-15 用户要求继续检查实际页面并直接修复，重点覆盖窄屏、多附件、语音、发送失败恢复和展开/收起动效。本轮在同一 textarea 外增加高度容器，手动布局切换使用现有 `region` 220ms 与 `ease-out` 过渡，允许快速反向；原正文测量保持即时，逐字输入、宽度变化和会话切换不播放高度过渡，减少动效时禁用。宽度观察继续按帧合并，清理观察器、窗口事件与待执行帧；长稿原本处于底部时，收起后仍保持末尾可见与选区。

窄容器不超过 400px 时，长资料名称最多两行，带文字恢复动作的附件使用下一行承载按钮，本地文件来源类别保持中性色。附件重试和取消操作立即把焦点交回正文，避免操作按钮消失或项目重排后失焦；未调整公共上传引擎、替换事务或提交快照合同。

本轮增加高度中间帧、快速反向、输入即时性、减少动效、长稿收起以及窄屏恢复按钮与回焦的专项检查。实际执行结果、完整回归和未验证范围统一记入 [run-06](../../evidence/runtime/conversation-composer-2026-10-15/run-06/verification.md)，本执行记录不预填测试数量或代替人工接受。

本轮补查：长草稿中段与末尾收起后均保持光标可见。手动切换在实际布局更新后原生回焦，同步还原祖先滚动位置；受控布局采用同一路径；用户已转移焦点时不抢回，会话变化取消旧回焦请求。

## 2026-10-16 底部操作密度反馈

用户要求底部操作适当紧凑、缩小。本组合采用现有次级28/16、主动作32/18配方，统一发送、重试、录音停止和生成停止的尺寸；范围高28px，工具组间距2px，正文与工具间距6px，底部留白8px。仅此组合的视觉密度修订，正文、动效和业务行为不变，不改公共IconButton或Tokens。验证见[run-07](../../evidence/runtime/conversation-composer-2026-10-15/run-07/verification.md)。

2026-10-16 后续图标反馈：用户指定正常发送为正式图库 `icon/publish-filled`，内部16px、按钮外圈保持32px；替代此前 `up` 的局部选择。失败保留 `refresh`，使用同一32/16配方；停止动作不变。见[run-08](../../evidence/runtime/conversation-composer-2026-10-15/run-08/verification.md)。

同轮补充：用户要求空稿占位文字很浅，以和正式输入明确区分。限定本组合placeholder为neutral-6与55%不透明度，正文颜色和其他输入组件默认不变。


## 2026-10-16 本地整体验收与登记收口

用户明确授权整体验收、登记收口和直接修复问题，真实业务接口后续接入。当前验收对照 C01–C13 / Task 0–9，结果及全部实际运行证据统一见 [run-09](../../evidence/runtime/conversation-composer-2026-10-15/run-09/verification.md)。历史 run-01–08 保留原始范围。已确认的工具行尺寸、发送图标与极浅占位文字保持；补查公共适配器省略移除状态时的异步移除守卫，以及本组件在资产索引中的可检索性。最终人工确认、真实设备、对比度、发布各自独立，Task 10 不纳入本轮完成判断。


## 2026-10-16 整体验收通过

用户明确确认：“确定，当前本地版本整体验收通过，更新登记状态，完成收口。真实业务接口后续再接入。”当前本地版本整体 Human Gate 更新为 accepted，完成本专项登记收口。确认范围、接受版本绑定与当前结果见 [run-10](../../evidence/runtime/conversation-composer-2026-10-15/run-10/verification.md)；保留 run-09 的原始检查与接受前状态。真实业务接口依指令后续接入，实机、广泛对比度与发布状态各自独立。
