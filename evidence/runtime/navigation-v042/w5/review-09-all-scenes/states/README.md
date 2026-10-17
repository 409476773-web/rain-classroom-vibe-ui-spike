# Review09 · S1–S6 状态外层自查

2026-10-03，实际操作本地候选预览，使用已安装的 Chromium / Playwright。只修改 `workspace-states.tsx`、`workspace-states.css`、`workspace-states.test.tsx`；本目录新增证据，没有覆盖旧证据、阶段、Registry、Manifest 或 Human Gate。

入口是 [review-evidence-index.json](./review-evidence-index.json)。其 canonical 条目包含 21 个场景与宽度组合、6 个 420px 高度检查、7 个悬停对象检查：425 项运行时断言通过，82 张当前 PNG 的文件、原生尺寸和 SHA-256 已验证。14 条状态外层回归测试通过。

闭合校验见 [closure-validation-final.json](./closure-validation-final.json)。工作区 CSS 高度是 800px；Playwright 的元素截图向外包含小数坐标边界，因此原始 PNG 是 801px 高，未裁切或缩放。短视口截图为 1200×420，悬停操作全页截图为 1760×1100。较早的 `closure-validation.json` 将 CSS 高度错误用作元素截图高度，已保留为校验尝试；最终校验按实际矩形边界通过。

| 对象 | 实际检查 | 本次确认与修复 |
| --- | --- | --- |
| S1 | 1200/1440/1600；专业目的地；全部隐藏、临时恢复、默认、专注、键盘边界 | 主体已选“专业改进建议”，恢复栏仍显示“课程体系诊断”。接入已有 child identity callback。 |
| S2 | 1200/1440/1600；知识目录；内容与布局分别保留 | 主体目录已选“1.1 函数的基本概念”，恢复栏仍显示“1.2 极限与连续”。接入已有 callback，并采用 child 当前范围说明。 |
| S3 | 1200/1440/1600；表格、反馈表单、状态分组、画册；短视口菜单 | 当前对象身份、草稿保留、显隐和专注恢复正常；没有新增主体修复。 |
| S4 | interaction/grading 各 1200/1440/1600；显隐、临时恢复、草稿、专注、边界 | 两个子场景的外层正常；grading 边界 10px，其他当前对象身份继续使用已有 callback。 |
| S5 | 1200/1440/1600；full/icons/tabs/hidden；Enter 激活、临时固定、9 个命令、长草稿 | 版本、通知、帮助入口无反馈。新增明确的本地反馈；工具示例明确未上传附件、读取历史或调用分析服务。主要表面、标题、辅助文字、边界和选中表达通过功能私有别名消费现有 Rain Token。 |
| S6 | 1200/1440/1600；显式 seek 到 16:24；恢复、专注、边界 | 主体已 seek 到 984s，恢复栏仍是固定副标题。接入已有 event/time identity callback。 |

7 个对象的悬停开关均实际操作：S1、S2、S3、S4 interaction、S4 grading、S5、S6。悬停开启、离开收回、临时固定、专注恢复和单一边界均通过。最后发现“恢复默认”只重置区域，保留了本地 `hover=true`；真实打开认可 HTML 的 S5，勾选悬停后点 reset 会恢复 `false`。已按此基线在 RestoreBar 的默认回调补 `onHoverChange(false)`，先记录失败单测，再得到 14 条绿色回归与 7 例 / 42 项 after 检查。

S5 的 full/icons/tabs/hidden 常驻高度分别为 111/83/41/0px，临时工具区 112px；隐藏与仅标签模式临时展开没有挤动文档。Arrow 只移动焦点，Enter 激活是现有 manual activation 合同。高速采集曾遇旧、新 panel 的定位竞争；自然 0/60/180/400ms 帧均只有一个可访问的当前 panel，按当前 panel 定位后九个工具命令全部通过，没有修改共享 Tabs。1350 字目标仍只在文本域内滚动，没有横向溢出。

S5 三个宽度的 root、region 和 boundary 原生矩形与修复前完全相同。Token 映射只在 `.nv44-workspace` 内：主要白面、柔和上下文面、画布、导航外框、标题、正文、辅助文字、边界、选中面和品牌文字分别引用已有 category Token。未修改公开 Token、尺寸、布局比例或子 Recipe palette。新的反馈提示也只引用已有 Token。

证据索引保留每个条目的原始 report 和截图路径。此前采集的 strict / 标签定位错误和所有历史 attempt 原样保存；canonical 只选择完整成功的条目。最后的 hover 默认修复不改变默认画面，矩阵条目中的 hover 全程关闭，因此保留该矩阵，另用 7 例最新操作证据验证回调。没有重捕或改写被冻结的 46 例原稿像素矩阵。

设计方法采用 V05（内容、外观与行为一起保留）、D05（容器、长文本与短视口）、I03（恢复身份跟随当前对象）。这些证据是本地实现自查，G2 人工视觉仍待评审；不代表 VoiceOver、完整对比度、多浏览器或发布验收。

本轮没有安装依赖、重置全局 Token、修改 Classic、写入 Figma、提交 Git、push、同步、评分提交或发布。
