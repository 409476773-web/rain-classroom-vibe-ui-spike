# Attachment 格式图标与尺寸反馈

日期：2026-10-16（Asia/Shanghai）。当前预览：`http://127.0.0.1:5473/#attachment`。用户来源：`reference-format-catalog.png` 及“应用各种格式彩色 icon、开头 icon 太大”的反馈。

## 改动

- List 使用内部静态映射选择49个现有彩色格式资产，具体后缀优先，再按明确 MIME 或音视频大类回退；未知格式使用通用文件。示例 MP4/MP3 使用相应格式图标，旧 PDF 状态/尺寸示例也消费正式彩色 PDF。
- 首图标32px改为24px，图标底托40px改为32px。真实图片缩略图仍为40px；右侧状态位、主操作和更多按钮未缩小。字幕附属区的文字与主文件文字继续对齐。
- 匹配独立于预览分类和上传规则。Office、Numbers/Pages及常见图片别名是 Recipe 局部映射；没有 JSON 资产，不用 JSONL 代替。Markdown 正式源图自带白底，保留冻结资产。

## 检查

| 检查 | 结果 | 证据 |
|---|---|---|
| 代表格式、无类型、大小写、未知与原型属性名、预览分类分离；List/状态/宿主 | 4文件，46项通过 | `unit-tests.log` |
| 隔离 Chromium 桌面1440px、窄栏360px；亮暗、两表面 | 4项通过 | `browser-tests.log`、`browser/report.json` |
| UI、Playground、测试源码类型检查 | exit 0 | `ui-typecheck.log`、`playground-typecheck.log`、`tests-typecheck.log` |
| Playground构建 | exit 0 | `build.log` |
| 静态资产、来源、Registry、阶段范围 | 结果见报告 | `scoped-checks.json` |

新增18项图标测试先因缺少实现失败，随后通过。浏览器检查实测格式图形24×24、底托32×32、缩略图40px；更多按钮列一致，无横向溢出。主动阻断图片时，回退到精确 PNG 彩色图标，菜单到文件信息弹层及 Escape 后焦点返回通过。缩小底托后发现字幕文字有8px错位，位置断言先失败（`subtitle-alignment-red.log`），同步缩小附属区首列后完整4项通过。

早期浏览器测试未展开“演示选项”就点击折叠内容，失败属于测试准备；修正步骤后通过，记录保留在 `browser-setup-failure.log`。本轮未改上传引擎，未重复扩大到原功能轮全套测试。

## 视觉与范围

直接查看隔离测试页保存的桌面双外观、360px深色、图像失败后的填充工作流截图。小尺寸文件图标保留格式身份，文件名成为主要阅读对象；相关字幕文字左边界对齐。对照上一轮桌面截图可见缩小关系，未对冻结图标增加裁切、滤镜或自绘补偿。具体来源与观察追加在根 `design-qa.md`。

截图来自仓库隔离测试页，不声称本轮重新操作或捕获了用户当前浏览器标签页。Safari、VoiceOver、真实触屏和完整对比度未验证。此反馈不授予运行视觉、发布、Figma、生产服务或其他组件的接受；Human Gate仍为`awaiting_human`。

前驱为上一轮 `source-bindings.json`，其摘要保持不变。本轮 `baseline.json`、`source-bindings.json` 与 `scoped-checks.json` 独立保存。重检：`node evidence/runtime/attachment-visual-2026-10-16/feedback-01/verify.mjs`。
