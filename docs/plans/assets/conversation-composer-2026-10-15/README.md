# 对话输入框：已确认设计图

这些图是 2026-10-15 当前会话中生成、展示并经用户确认的设计预览。本目录只归档最终选定版本，不代表代码实现、像素规格、可访问性或业务服务已经验收。

| 文件 | 用途 | 原始生成文件 |
| --- | --- | --- |
| [layout-surfaces.png](layout-surfaces.png) | 灰底／白底描边底部阴影 × 紧凑／展开 | exec-bdf508f5-892d-467e-a3ca-1a61018bb6a9.png |
| [voice-flow.png](voice-flow.png) | 简约波形、转写、回填后发送 | exec-4696566c-0373-4d09-a403-47b53a975ea0.png |
| [context-reply-layouts.png](context-reply-layouts.png) | AI 引用与讨论回复在两种布局中的保留 | exec-2a988cd6-9058-4be3-bebf-1bbde6bf65c4.png |
| [material-menu.png](material-menu.png) | 两项添加菜单与逐附件失败处理 | exec-b5cab96a-ea65-4cdf-99b6-338667e8e84a.png |
| [reference-source-selectors.png](reference-source-selectors.png) | 资料多选与搜索范围单选，采用最后一张高度修订版 | exec-55de0cfb-e875-4273-afc4-a167ddaeaf52.png |
| [error-recovery.png](error-recovery.png) | 麦克风不可用、转写重试、发送失败与修改后发送 | exec-71097d2f-d774-45f2-8ae5-2817c5411d0a.png |

## 使用约定

- 选择器采用本目录最终版本；不采用曾把右侧输入框拉高的中间图。
- 转写失败的最终方案是“录音已保留＋重试转写＋丢弃录音”，不改回“重新录音”作为唯一入口。
- 正常录音用灰色波形、取消与结束按钮；没有可见计时、红点或“正在录音”文字。转写和错误状态仍可使用必要文案。
- 小蓝上箭头表示发送；录音结束使用已确认图中的中性方形停止图标。
- 图中的文字、图标轮廓和间距需在实现时用真实 Rain 资产校准。生成图中的偶发字形不作为产品文案；正文以设计方案的文案表为准。
- 原图原样复制，未压缩、重绘或编辑。灰底和白底均是允许的表面方案，不绑定 AI 或课堂讨论身份。

## 文件校验

| 文件 | SHA-256 |
| --- | --- |
| layout-surfaces.png | 4767c71ad771c89091272964e0d0f31d7e804288159c20fdb013d038543793af |
| voice-flow.png | 413ce3beb4dd6e625e3d51f5814d010ce1ae352e32aa150690522c5c34dcadf2 |
| context-reply-layouts.png | f2abf79805a9f562ef9e898c149c073f21b6015ac2987b9b01418f825ecd68e8 |
| material-menu.png | 0b4fb1cdcc76035a474fabff3d966c3a8f1d6acecea842bcb213c699b832c877 |
| reference-source-selectors.png | 6e92bc0a2bb003c89464a9f2e479338b99372da1fb16eea13e86a5b37d65bb5a |
| error-recovery.png | dad73d2d9b88017cc2200f3c7dae6e97a7b6be25c94495157abc7701c560f018 |
