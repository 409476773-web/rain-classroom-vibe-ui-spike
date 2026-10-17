# ConversationComposer 本地实施与验证

状态：本地实施已完成；registry-candidate / unpublished / humanGate: awaiting_human。

工作区：card-v2，分支 codex/card-v2，HEAD 321e1a0。依据用户 2026-10-15“开始按照两份文档的规划，与推荐顺序，实施改造”授权。工作区原有修改保留，未提交、推送或发布。

## 已交付

- 共享 `ConversationComposer` Pattern/Recipe，公开根入口、样式、README、Manifest、独立 Registry、可检索资产索引与专项验证器。
- 灰底/白底与紧凑/展开四种组合；正文自然增高、长稿滚动、布局切换保留编辑节点、光标与上下文；窄容器工具换行。
- 同一文件选择/拖入/图片粘贴路径，真实 File 生命周期与逐项恢复；引用搜索/临时多选/确认前复核，范围独立单选，讨论回复保留/取消。
- 原生录音、取消/结束、转写适配、保留录音重试/丢弃；草稿版本、会话、尝试及只读状态守卫迟到结果。
- 确认前保稿、防重复、失败恢复、修改清旧错误、成功后保留来源范围、AI 回答与下一稿分离、按会话隔离草稿与附件。
- 独立 `#conversation-composer` 文档页与两个 G6 消费者。旧滚动浏览器用例已转为当前真实操作，本轮执行同一 helper。

## 自动检查

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 修改前回归 | 3 文件，34/34 | baseline.json |
| 本轮定向单测 | 15 文件，271/271；0 失败 | unit-report.json |
| 最后受影响组件/场景复核 | 33/33；0 失败 | final-composer-report.json |
| G6 文案一致性复核 | 20/20 | g6-copy-report.json |
| 桌面与窄屏浏览器 | 12/12，0 skipped/flaky/unexpected | browser/delivery/report.json |
| 方形停止图标校准后语音复核 | 桌面/窄屏 2/2 | browser/delivery-icons/report.json |
| UI、Playground、测试工程类型 | 3 项通过 | 本轮命令输出 |
| Playground 构建 | 通过；保留既有大文件体积提醒 | build.log |
| 资产索引 | 生成及检查通过 | docs/ai/asset-index.md |
| Registry/Manifest/导出/依赖/来源 | 5/5，0 pending | scoped-governance.json |
| 源码绑定 | 44 文件；3 个保护源与基线相同 | source-bindings.json |

测试命令和未来重跑方式见实施计划、Playwright 配置及 `scripts/verify-conversation-composer.mjs`。旧失败报告保留在最初 browser 目录及各 round，不作为当前通过报告；当前浏览器结论只使用 delivery 与 delivery-icons。

## 验收映射

| 编号 | 本轮结果 |
| --- | --- |
| C01 | 四组合、同一编辑器、草稿/选区和手动布局保持：单测与浏览器通过 |
| C02 | 自然增高/上限/清空、Enter 换行、IME 提交守卫：定向通过 |
| C03 | 选择/拖入/图片粘贴、混合粘贴不吞正文、只读拖入不导航、失败恢复：定向通过；真实上传服务未接入 |
| C04 | 临时确认/取消、搜索倒序、全 ID 复核、空范围不扩大、成功保留范围：通过 |
| C05 | 回复保留、取消不丢稿、原消息定位及不可定位提示：现有与新增回归通过 |
| C06 | 录音权限/取消/清理、合成设备原生采集、结束后转写：通过；物理麦克风待验证 |
| C07 | 失败/空白/取消保留录音、重试使用新光标、只读时拒绝回填、无自动发送：通过；ASR 为模拟 |
| C08 | 提交同步锁、确认前保稿、失败重试复用 ID、修改清错：通过；生产 unknown/timeout 核对需真实服务 |
| C09 | 停止不提交下一稿、不同按钮身份、重试稳定消息及旧回调隔离：通过 |
| C10 | 会话 A/B 草稿、上传与提交回调归属、旧移除操作不得污染新会话：通过 |
| C11 | 阅读中增量、历史 prepend、返回最新、输入展开及焦点：单测与两视口浏览器通过 |
| C12 | 基本键盘/焦点、两主题、320px 容器、减弱动效/forced-colors：本地检查通过；辅助技术与实际设备仍待验证 |
| C13 | 独立候选登记、根导出、依赖闭包与44个当前来源绑定：通过；原 G6 十二项保持不变 |

## 审阅与修正

语音规格审阅发现的焦点移交、保留录音重试锁与禁用原因可获取问题已修。质量审阅发现的来源范围被清空、旧移除回调污染新会话及延迟弹层越过只读状态已补先红后绿回归；两个异步守卫已独立重跑复核通过。原 Field 与 MessageScroller 实现、原 G6 Registry 与其旧证据保持原有含义。

实际视觉比较、首轮与修订来源见 [design-notes.md](design-notes.md)。四种表面/布局的同状态截图在 browser/delivery/surfaces-*；焦点另拍 focus-*；引用/范围/讨论在 delivery 对应截图；最终录音与恢复截图在 browser/delivery-icons。

## 服务和人工边界

浏览器录音是真实 MediaDevices/MediaRecorder 路径，本轮浏览器使用合成麦克风。上传、课程资料、转写、消息接收与 AI 回答均为明确标注的本地模拟；没有将本地 remoteId 或模拟文字表述为真实业务结果。生产接收确认、幂等/结果未知核对、课程权限和真实识别质量仍需接口。

图稿已确认不等于运行视觉已接受。真实 Safari、VoiceOver、物理触摸/软键盘、实际麦克风、正式对比度、发布和业务迁移未在本轮关闭。剩余项目见 [manual-checklist.md](manual-checklist.md)。
