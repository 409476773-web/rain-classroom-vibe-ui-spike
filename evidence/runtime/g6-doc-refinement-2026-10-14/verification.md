# G6 文档页试改验证 · 2026-10-14

## 本轮结果与范围

用户授权“开始文档试试改造”。在 `card-v2` 现有工作区完成 Bubble、Message、Marker、Message Scroller、Questionnaire 五个文档页的第一轮本地试改；课程答疑、课堂讨论、课后反馈组成三个可操作场景。

本轮修改限于 Playground 页面私有示例、作用域样式、对应测试和本地证据。公共 UI 的 24 份既有源码与本轮开始时的 SHA-256 全部相同，见 [起始哈希](./public-source-before.json) 与 [最终核对](./public-source-final.json)。没有调整公共默认值、G6 验收状态或依赖，也没有提交或推送。

主要实现：

- Message/Bubble/Marker：长阅读正文、顶部头像对齐、身份与时间层级、回答来源、真实复制及有帮助反应；保留公共 API 和变体示例。
- 课程答疑：单一生成任务、停止保留片段、同轮原位重试、下一问草稿、资料展开、历史加载与返回最新。请求和资料为明确标注的本地演示。
- 课堂讨论：统一作者轨道、连续消息分组、短引用、取消回复保留输入、发送等待与失败恢复。
- 课后反馈：动态条件题次、原生表单校验、条件答案缓存与有效载荷分离、本页草稿保存恢复、失败保留、空白末题跳过提交、有内容提交及成功摘要。

## 最终自动检查

| 检查 | 结果 | 证据 / 限制 |
| --- | --- | --- |
| 三个相关测试文件 | 32 / 32 通过 | [最终测试报告](./page-tests-final.json)：页面集成 16，答疑/讨论 8，反馈 8 |
| G6 公共源文件核对 | 24 / 24 无变化 | [最终哈希记录](./public-source-final.json) |
| Playground 完整 build（包含类型检查） | 阻断 | `packages/ui/src/carousel/carousel.tsx:200` 的 `IconButton` 属性不满足必需的 `aria-labelledby` 联合类型；该文件在本轮范围外 |
| 直接 Vite 打包 | 通过 | 最终产物成功生成；G6 会话页面 JS 55.64 kB，CSS 24.90 kB。其他大于 500 kB 的包仍有体积警告 |

定向测试命令：

```text
pnpm exec vitest run apps/playground/src/docs/components/g6-conversation-pages.test.tsx apps/playground/src/docs/components/g6-course-conversation.test.tsx apps/playground/src/docs/components/g6-feedback-scenario.test.tsx --reporter=json --outputFile=evidence/runtime/g6-doc-refinement-2026-10-14/page-tests-final.json
```

最终完整 build 的错误为 `TS2322`。本轮不以独立 Vite 打包通过替代类型检查，也不扩展到 Carousel 修复。

## 实际浏览器抽查

使用本地预览 `http://127.0.0.1:5216/`。检查五页 1440px 布局，以及 Message、Questionnaire、Message Scroller 的 390px 布局；三项窄屏页面未见文档横向溢出。尺寸覆盖是浏览器视口模拟，不代表真实触屏设备验证。

[浏览器事实记录](./browser-verification.json) 保存了有限几何测量和实际状态：

- 课程初始打开显示问题起点；停止生成后保留已生成答案、下一问草稿与输入焦点，没有误发下一问；重试保留同一回答 ID。
- 课程加载更早记录后，原阅读内容相对视口位置变化为 0 px；展开资料后，原按钮位置及焦点保持。
- 讨论取消引用保留输入；加载更早讨论后原教师消息仍保留作者头部、原日期，相对视口位置变化约 0.5 px。
- 反馈必填错误定位到题目；“其他”增加条件题；保存草稿后回改路径，失效条件答案没有进入最终摘要；模拟提交失败保留表单，重试成功后表单卸载并聚焦完成标题。
- Bubble 的有帮助反应切换了实际按下状态；Message 的正文与头像布局按本页 Local Recipe 呈现。

浏览器验证发现并已修正两个页面缺陷：停止按钮被复用为提交按钮时触发误发送；历史 prepend 改变原消息分组和日期位置导致阅读跳动。对应回归测试已通过。

## 预览与截图

| 页面 / 状态 | 预览 | 截图 |
| --- | --- | --- |
| Message | [消息](http://127.0.0.1:5216/#message) | [宽屏](./screenshots/message-wide.jpg)、[窄屏](./screenshots/message-narrow.jpg) |
| Bubble | [气泡](http://127.0.0.1:5216/#bubble) | [反应操作](./screenshots/bubble-wide.jpg) |
| Marker | [会话标记](http://127.0.0.1:5216/#marker) | [宽屏](./screenshots/marker-wide.jpg) |
| Message Scroller | [答疑与讨论](http://127.0.0.1:5216/#message-scroller) | [答疑](./screenshots/course-wide.jpg)、[窄屏](./screenshots/course-narrow.jpg)、[讨论历史](./screenshots/discussion-history.jpg) |
| Questionnaire | [课后反馈](http://127.0.0.1:5216/#questionnaire) | [宽屏](./screenshots/questionnaire-wide.jpg)、[窄屏](./screenshots/questionnaire-narrow.jpg)、[必填错误](./screenshots/questionnaire-required-error.jpg)、[完成摘要](./screenshots/questionnaire-completed.jpg) |

浏览器临时视口覆盖已恢复，消息页作为本轮预览保留。本地服务使用本轮端口 5216，已有其他开发服务未停止。

## 验证边界

本轮是文档页面试改完成，不等于用户视觉验收、公共组件默认升级、全库回归通过或发布资格。未新增 Safari、VoiceOver、真实触屏/软键盘、实体中文 IME、全量对比度或生产数据验证；讨论发送的成功/失败已由定向测试覆盖，没有额外声称该路径经过浏览器执行。

现有页面集成与公共引擎仍用于本地试验；没有真实模型服务、服务器提交或跨刷新持久化承诺。
