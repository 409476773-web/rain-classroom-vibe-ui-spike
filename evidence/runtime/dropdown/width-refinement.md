# DropdownMenu 内容宽度修订 · 2026-09-14

用户先选择默认按内容定宽，随后明确要求最小 140px。实现范围是公共菜单宽度；Popover 和交互控制保持原有实现。

## 实际行为

- `DropdownMenu.Content` 默认 `width="auto"`；按完整条目自然宽度计算，最小 140px，自动最大 320px。
- 显式数字宽度仍须有限且为正，允许加宽到 400px 等；小于 140px 时受最小宽度约束。
- 最小/最大宽度均服从可用视口；120px 窗口中菜单不越过两侧 8px 边界。
- 使用原生 CSS intrinsic sizing，现有 Space/20、Space/32 和 Space/8 Token；没有新依赖、测量脚本或全局 Token。
- 保留文字 15/22、说明 13/18、行高与现有图形/焦点；长关键说明完整换行。

截图同文案“查看资料 / 记录稍后处理”：旧默认实测 280px；初版按内容 132px；按最新指令最终为 **140px**。Light/Dark 均为 140px，各行 122px，横向溢出 0。单字内容仍为 140px。证据见 `width-light.png/json` 与 `width-dark.png/json`，已目视检查两主题截图；这不代替人工视觉 Gate。

## 验证记录

原宽度 280px 在新增短菜单检查中先失败，随后实现；140px 下限调整后重新测试。新检查覆盖同宽条目、单字下限、显式 240/400px、显式 100px 被约束到 140px、图标/勾选/meta/快捷键、固定父菜单与自动子菜单、320px 长关键说明、窄视口及 Popover 保持 320px。

最终验证口径：

- DropdownMenu / Popover / 家族治理 25/25；独立审阅另行复跑也通过。
- 公共 Dropdown Chromium 17/17，Tabs More 相关 Chromium 12/12，无失败或重试。新增检查已覆盖显式 100px → 140px 和 120px 极窄视口。
- 类型、生产构建、Tailwind B2、Token 验证通过。Workspace/Evidence/Lockfile 检查通过。
- 全库边界检查未通过：旧 Day 3 登记不包含两份既有 V2 HTML，且历史 Git 登记与当前 HEAD/origin 不一致。没有扩大授权或改动这些其他任务材料来消除错误。
- 全库单元在限制并发后为 **1303 passed / 5 failed，90/92 文件通过**；5 项均调用上述失败的边界检查。首次并行运行另有 4 项资源超时，在限制并发后消失；不宣称全库全绿。
- 独立代码复核未发现可复现 P1/P2。审阅者另行尝试 CUA 时遇到 request-header policy 加载失败，未完成独立手工浏览器检查；本报告的浏览器证据来自本任务 Playwright 与截图检查。

精确命令和原始输出归档到 `width-checks.log`；状态见 `componentRefinements.dropdownFamily.widthRefinement`。本批 automatedVerification=passed 指上述宽度范围的检查，既有全库边界失败单独保留。

## 验收范围

9 月 12 日既有菜单/Popover 及选择标记视觉验收保留。用户于 2026-09-14 明确回复“确定没问题。”，本次宽度变化单独登记为 `accepted`，范围为内容自适应与 140px 最小宽度的运行视觉。随后提出的底部结束按钮修订单独待确认。原有颜色 finding、真实设备与辅助技术、发布、迁移、Git 均没有在本次闭合。
