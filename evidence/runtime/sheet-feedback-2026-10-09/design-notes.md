# Sheet 反馈修正 · 2026-10-09

目标：按用户截图与标注修正当前 Sheet 示例。System Mode，现有候选的局部组合与治理后继，不改共享 Input/Button/PDF 资产。

- 资料名称已使用标准 Input，无页面下拉实现；截图带删除历史项及箭头的浮层为浏览器历史建议。名称允许任意编辑，保留 Input，字段与 form 关闭 autocomplete，避免将改名变成预设选项的 Select。
- 保存修改显式 primary；取消显式 tertiary。调用示例同步。
- PDF asset canvas 32→28px，沿用 48px 轻染底板的 grid place-items:center，无视口专属覆盖。
- 用户要求名称无蓝底：当前共有 outlined Input 的 Focus 填充蓝色；在具名 sheet-resource-name 局部配方中仅对 default 状态复用 Fill/Neutral/Solid/7，保留蓝色边框/Focus 及 error 颜色，不升级全局规范。
- 方法 V03、V05、D03：资产与底板分开控制比例；使用既有按钮层级；字段保持自由编辑语义。验证实际编辑、Focus、错误、取消/保存及详情图标，检查深色与密度。
- 范围：G3 Sheet 文档 TSX/CSS、既有测试、Manifest 的后继记录、精确状态/源码与新增填充颜色登记。Registry 已含这些源码，无额外依赖或公共 API。
- 原详情确认保留为旧截图与源码的历史确认；本修订运行视觉等待用户审核。
- 未验证：浏览器是否会忽略 autocomplete=off（不同浏览器/第三方填写工具）、Safari/VoiceOver/完整对比度。
