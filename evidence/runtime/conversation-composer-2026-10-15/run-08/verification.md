# 发送图标与空稿提示反馈

2026-10-16 · 用户明确指定 icon/publish-filled、仅缩小内部图标，以及补充要求占位提示极浅。未发布候选局部修订。

1. 正常发送使用正式可用 PublishFilledIcon（icon/publish-filled，Figma 182:695），替代 up。IconButton 采用既有32/16配方，外圈仍32px、内部由18px降到16px。重试保留refresh，停止录音/生成不变。Registry依赖同步，不改生成的图标或公共IconButton。
2. 占位提示使用已有text-neutral-6与55%不透明度，正式文字颜色保持。浅色下原提示rgb(86,104,143)改为rgb(160,172,197)叠加55%不透明度，正文仍rgb(20,35,70)。深色提示rgb(111,122,158)/55%，正文rgb(239,241,245)。这是用户指定的弱提示表现，仅此组合；强制颜色模式使用系统GrayText与全不透明。
3. 页面原“点击上箭头发送”改为“点击发送按钮提交”，与新图形一致。

实际页面：主代理目视浅/深色空稿、正常可发送与禁用状态；DOM确认asset=icon/publish-filled、button=32px、icon=16px。正式正文与空稿提示显著区分。测试文字已清除，未发送；预览恢复浅色，截图preview.jpg、dark.jpg。

验证：原主组件29/29单元通过，UI类型检查和最终Playground构建通过；复用四组合、桌面/窄屏、深色、320px、减少动效及强制颜色场景2/2通过，见component.log、typecheck.log、build.log、browser/report.json。未为低风险样式改动新增镜像测试。

来源记录47个文件（包含指定图标包装与SVG），3个保护哈希保持。当前专项登记与闭包检查见scoped-governance.json，资产索引结果见asset-index.log。此前历史图标选择保留在旧轮次证据，本轮当前合同已更新。人工视觉仍待用户检查，未声明发布、生产、真实服务、设备或全库接受。

全库资产索引仍被另一附件视觉任务尚缺的 evidence/runtime/attachment-visual-2026-10-16/verification.md 阻断；未修改该任务文件。本组合专项登记5/5通过。
