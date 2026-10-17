# 图表视觉层级修订验证

用户授权：“确定，开始修改”。本轮开始于2026-10-10，收尾跨至2026-10-11。工作树为 `.worktrees/card-v2`，从本轮开始前的实际文件保存基线，不以 Git HEAD 代替已有未提交改动。

## 实施范围

1. 默认图和业务组合使用现有 `core-ui-shell` 页面边距；主图在前，调节项在后，详细接口折叠。所有变体、原始数据、示例状态、更新、重播和源码入口保留。
2. 迷你图库保留18个样本，按9个图型配对两档尺寸，共享说明；移除重复的大边框盒和固定说明区。指标卡主值统一为28px/36px，普通读数保持13px/20px。
3. 旭日分类入口使用现有 Rain 文字按钮，避免重复标题与读数；悬停、精确表、键盘多级下钻与返回焦点保留。
4. 通用原生控件规则避开带 Rain 身份的控件，并用 `:where()` 保持原选择器优先级。颜色消费者登记仅同步本轮实际变动的选择器。

图形引擎、Rain Token 值、依赖、数据含义和公共 charts API 未重做。`MiniProgress.showReading` 仅为本地示例组合增加默认开启的可选项；完成率指标卡关闭重复的中心读数。

## 检查与证据

| 范围 | 结果 | 证据 |
| --- | --- | --- |
| 默认宿主与变体 | 默认宿主12项＋新增回归7项，19/19通过；Bar / Line / Sunburst 三族变体及宿主检查5/5通过 | [regression-status.json](regression-status.json) |
| 业务浏览器 | 25项唯一覆盖通过：尺寸9、排版3、嵌入4、运动9 | [业务验证](business-verification.md) |
| 宿主单元 | 2文件、16项通过 | [host-unit.log](host-unit.log) |
| 业务单元 | 3文件、77项通过 | [business-unit.log](business-unit.log) |
| 消费与登记单元 | 3文件、22项通过 | [单元日志](consumption/unit-final.log) |
| 独立下载消费 | 5份当前下载：业务正常/长内容、默认旭日正常/长内容、交互旭日变体；类型、构建、浏览器与键盘通过；19项 Registry 闭包通过 | [最终消费事实](consumption/final-facts.json) |
| Playground 类型 | 通过 | [typecheck-final.log](typecheck-final.log) |
| Playground 最终构建 | 通过，保留既有大体积 chunk 提示 | [build-final.log](build-final.log) |
| 测试项目类型 | 未通过：4处既有诊断，与前轮 T22 日志逐字一致 | [tests-typecheck-final.log](tests-typecheck-final.log) |
| 生成物一致性 | 未通过：China 3条旧颜色消费者记录在本轮前已存在，保留不清理；本轮选择器已同步 | [消费者差异](consumption/color-consumer-diff.json) |
| 独立复核 | 两项样式回归均修复重验；无未处理的阻断性发现 | [independent-review.md](independent-review.md) |
| 文件范围保护 | 325份基线、共享图表、依赖、其他阶段记录与 Git 状态 | [scope-verification.json](scope-verification.json) |

消费环境新建于临时目录，复制当前 UI / Foundations 源码以及已有安装的依赖；2035个构建模块均留在该隔离宿主内。它证明这5份源码可独立消费，不等于从网络干净安装，也不等于重验全部170变体和78下载组合。

## 发现与修复

- 原旭日入口被通用 button 样式覆盖，实际为16px、白底、1px边框和8px内边距。与宿主外同一 Rain Button 的计算样式对比先失败，再验证修复。
- 新页面壳让5个普通排名读数继承14px/22px。给既有普通读数角色明确13px/20px后，排版定向与完整业务布局检查通过。
- 初版排除 Rain 控件的选择器提高了优先级，让原生变体图例出现边框。独立复核发现后，保留真实样式失败证据并改用低优先级 `:where()`；新增图例回归与原 Rain Button 回归分别检查两端行为。
- 浏览器启动与临时预览端口曾受沙箱限制；保留失败日志后，通过获批的本地测试运行方式完成验证。没有改运行时或放松断言绕过环境失败。

## 视觉与生命周期边界

同视口、同正常数据、同蓝灰配方、同减少动效的前后各10张截图见 [查看入口与前后对照](human-review.md)。恢复标准容器后，桌面与窄屏绘图区宽度发生预期变化，记录中明确区分视口和绘图区。三个主图精确数据保持一致。

自动检查及独立复核不授予用户视觉接受、完整对比度、Safari / VoiceOver / 真实触屏验收。业务运动检查覆盖中间几何和减少动效终态；未运行帧间隔 / long-task 性能采样，不声明60fps。

本轮为未发布候选的本地修订。Human Gate 保持 awaiting-user-review；未发布、未同步 Figma、未迁移业务、未提交或推送 Git。已有工作区改动保留，其他阶段授权与验收状态不变。
