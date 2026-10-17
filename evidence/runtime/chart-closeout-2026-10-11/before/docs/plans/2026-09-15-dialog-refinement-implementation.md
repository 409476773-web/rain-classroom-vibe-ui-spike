# Dialog 补充规格实施计划

依据：[已确认设计](2026-09-15-dialog-refinement-design.md)。用户于2026-09-15明确要求“开始实施”。
范围：当前 card-v2 工作区内的 Dialog、AlertDialog、专用蒙层、课程及 BM-B 消费者、预览与验证。保留既有未提交工作，不涉及发布或迁移。

1. 记录实施前文件指纹、现有测试与治理结果，新增本轮精确授权记录。
2. 为默认关闭策略、语义与宽度添加失败测试；新增专用蒙层源，接入既有生成器和消费登记。
3. 复用 Base UI Dialog/AlertDialog 实现标准宽度、40/60/16安全边距、正文滚动、单层有效蒙层及180ms过渡；复用既有颜色、间距、按钮和主题桥接。
4. 课程与 BM-B 宿主管理未保存确认，保留草稿和失败重试；预览覆盖宽度、蒙层和8/12按钮组。
5. 更新 Manifest、Registry、阶段记录；运行类型、构建、组件与浏览器回归、精确治理检查。新增证据单独保存，不覆盖历史快照。
6. 独立代码评审并处理发现，打开预览供人工检查。实现与自动验证、人工视觉及对比度接受分开记录。

实施选择：窄屏阈值沿用640px；AlertDialog复用同一套Parts，使用Base UI的真实语义；蒙层为独立语义Token，不扩充通用Fill或任意Alpha白名单；嵌套状态直接消费Base UI属性，避免自建层级状态管理器。

键盘与捏合缩放：Portal挂载期间订阅原生VisualViewport，读取宽高和偏移；卸载时清理。无该API时保留100vw/100dvh回退。参考[MDN VisualViewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport)，真实设备仍需验收。

证据：[本轮目录](../../evidence/runtime/dialog-refinement-2026-09-15/)。视觉Human Gate保持awaiting_human，对比度接受保持not-granted。
