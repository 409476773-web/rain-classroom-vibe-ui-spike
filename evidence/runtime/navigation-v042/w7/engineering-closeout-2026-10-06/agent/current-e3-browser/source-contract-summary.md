# 当前 E3 / RegionHead 浏览器合同校正

只改两份历史测试。E3 原 answer 中的 36px ObjectNavigator 已由明确验收的 review02 真实 Tabs/panel 替代；主队列保留原按钮，次级维度改为 tablist/tab，并验证已选 tab 的 aria-controls 与可见 panel 对应。默认 density 未覆盖，所以冻结源码使用 Tabs **38 / 38px**，浏览器样式另有 **44px 最小高度**；不把 Token size 或早期 32 假设当作实际点击区域。评分、草稿 key、模式切换、不擅自保存、明确保存、学生恢复及原焦点检查均保留。

R5 的回顾列表由 RegionHead 默认 **32/18**；只有知识索引调用显式 **32/14**。测试按实际 region owner 限定该例外，仍逐个检查所有控件 32×32 点击区域和图标宽高。现行 r4-r6.tsx 与已人工接受的 Review12 source freeze 相同。

10 个来源文件与已验收 review02 ZIP 内容逐字一致，相关 product owner 同时与 review02 freeze 一致。测试 before/after SHA、验收/封存来源 SHA 与保留断言见 [source-contract-summary.json](./source-contract-summary.json)。原 review01/08 历史报告、旧 ZIP、UI 与 Token 未改。

类型检查、静态发现和 diff 检查退出码均为 0；两文件仍发现 **29 项**，没有删除测试、增 skip、升 timeout 或强制 click。**本代理未启动服务或运行浏览器**；根代理负责复制到已有隔离目录后统一 target 实跑，不据静态检查宣称浏览器通过。
