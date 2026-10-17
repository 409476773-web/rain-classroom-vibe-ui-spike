# G1 review-06 · 标准下拉表面

2026-09-30 用户截图明确要求正常组件库下拉外观，覆盖review-03的Mask染色决定。System Mode，仅修订Scope下拉表面；采用普通Popover/Dropdown共享Background/Neutral/1、Border/Neutral/3、Radius/10、Shadow/overlay，不新增Token或断点。V05：沿用已有内容/搜索/选择/焦点行为，调整表面颜色；G1待复审。验证实际下拉背景无图像叠层、搜索/选择/短窗口/hover和构建。

## 结果

移除Mask背景图层，computed backgroundImage=none、背景rgb(255,255,255)。下拉继承标准Background/Neutral/1表面，并使用现有标准边框/圆角/阴影Token。修改前后截图见before/after；3项现有浏览器检查覆盖短窗口、hover、搜索、选择、焦点、外点/Escape；Playground类型检查和构建通过。运行日志随附。

本轮第一次hover回归沿用了旧review-05输出路径，其regression-02-after结果已重新生成；本轮副本归档在本目录regression-02-after，后续测试输出已改到review-06。旧Mask外观的修改前证据保存在本轮before及review-03，历史源码与Gate记录保留。未形成新的全局设计方法结论。

5项Registry资产引用、源码与样式摘要校验通过。10482个既有文件保护核对无缺失、无无关变更；旧review-05中仅scope-hover.png摘要改变。状态文件仅navigationComponentsV042记录更新，其他Gate保留。详见protection-and-registry.json。
