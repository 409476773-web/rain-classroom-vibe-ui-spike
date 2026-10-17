# G6 第四轮 · 深色、紧凑与长内容

用户要求“继续下一步”，沿用五页私有视觉精修授权、Rain Designer 依据和此前范围。开始时固定 11 个文件；本轮实际修改课程/讨论页面、其样式和测试，以及 Message 展示页组合，共 4 个文件。公共组件、Token、依赖、验收状态和 Git 操作没有增量修改。

## 已处理

- **完整资料名称**：390px 下长文件名实际内容宽 628px、单行区域宽 194px，版本号和后缀不可见。私有 Material 复用已存在的 Tooltip，以原 AttachmentTitle 为焦点入口，悬停或 Tab 焦点可查看原完整名称。保持原单行资料卡、原文件名、文件字段、移除回调与发送行为。提示采用 portal，避免被输入框或消息列表裁切。
- **失败与重试**：Message 失败样本沿用本页 Recipe；状态辅助文字字重回到 400，重试使用既有 compact 24px 配方和 Refresh leadingIcon。实际点击后显示“已发送 · 本地模拟”。

## 实际检查

条件为 767×797 与 390×844，增加深色及紧凑密度。图片见 `screenshots/`。

1. Message/Bubble 深色紧凑状态：长阅读保持 15/26，头像宽 32px、transform none；气泡七表面、辅助状态没有新遮挡。局部阅读间距保持原试改值，不为压缩而缩小正文。
2. `full-filename-dark-narrow.jpg`、`filename-tooltip-facts.json`：实际 Shift+Tab 后 Tab 到名称，焦点可见并显示完整名称。提示 250×94px，左右为 67/317px，位于 390px 屏内；Escape 可关闭。自动化定位先程序聚焦再按 ArrowLeft 的路径没有立即打开提示；本次键盘结论依据真实 Tab 焦点操作，不将它表述为所有程序聚焦路径均已验证。
3. `reply-file-four-lines-dark.jpg`、`expanded-input-facts.json`：回复＋资料＋六行草稿时，表单宽/scrollWidth 均 356px，输入高 112px、内部 auto 滚动，发送按钮右缘 344px。面板增高至 756px，消息阅读区保持 280px；因此这里允许页面纵向滚动，不声称整个扩展场景仍限制在 540px。移除附件后草稿保留。
4. `generation-state-facts.json`：实际生成到部分正文后停止；原回答保留 216 字、焦点回到输入。重新生成时焦点在同一 answer-1，正文切换到新流式内容（抽查时 48 字/78px）；完成后同一回答仅一条，未增加 answer-2，复制操作恢复。这一替换/缩短属于现有演示行为，本轮未修改请求或回答生命周期，也未声称它没有视觉变化。
5. `message-retry-dark-compact.jpg`、`retry-style-facts.json`：深色紧凑下 24px 重试和普通辅助字重协调；实际重试成功。Refresh 身份从正式源码入口与可见图形核对，不依赖非标准的 DOM 图标属性。

长文件名样本只用于本地名称、排版和移除检查，不验证 PDF 内容或上传服务。静态截图及本地输入检查不代表实体触屏、VoiceOver、真实输入法或完整对比度验收。

## 自动及源码复核

- 新增完整文件名焦点/提示/原名保留/移除保留草稿回归，先红（原名称不可聚焦）后绿。随后强化提示仍打开时移除附件的清理回归，通过；未遗留 Tooltip。
- 最终三个页面测试文件 **40/40** 通过，见 `page-tests.json`。Playground 构建及最终类型检查通过，见 `build.log`、`typecheck-final.log`；原有大资源块警告保留。
- 36 个已冻结公共源文件哈希前后一致，见 `public-source-before.json` / `public-source-final.json`。
- 独立有限源码复核无阻塞：Tooltip 直接使用原 Title，没有新增可见布局包装；React 19 下 ref/events 转发，Portal 随 Material 卸载；原生文件字段、滚动 API 与重试生命周期未改。

本轮完成局部实现与验证，未升级公共视觉默认或人工验收状态。
