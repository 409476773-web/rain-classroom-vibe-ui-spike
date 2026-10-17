# Review12 · 极浅常态分割线与讨论标题字重

2026-10-04 用户要求全部可拖动分割线 Normal 可见但很弱，并将 R4“讨论过程”加粗。当前共享资产已消费，使用 System Mode 的本地 Recipe 调整；仅 platform-navigation.css 与 r4-r6.css 两个源文件。

常态 1px 线消费既有 BorderNeutral4 × opacity .4，在当前 Light 内容有效 alpha4%；常态 handle 隐藏。hover/active/focus 保持 Brand1。讨论标题 Semibold600，示例计数 Regular400，字号和布局不变。

方法沿用 V01/V02/V04/V05：实际运行测量、层级与弱边界、交互状态检查。假设：极浅线提供拖动位置提示且减少竞争，600标题能清晰区分正文；以12 R/S和 grading/form 的实际计算样式及指针/键盘行为验证。Review11隐形 Normal 合同保存为历史，用户本轮要求是新权威。共享默认、Foundation、G1和所有历史证据保持。

用户同轮追加：所有最左侧导航单元 icon 再略微缩小；实际图形20→18px，保留20px槽位、40px行、文字/间距、Logo23px与辅助图标16px。先前两项检查保存在 timestamped run，最终源码再锁定。

实测发现R2 Icon size20产生inline样式，导致CSS无法缩小；四个现有size API改18px。最终生产范围为上述2 CSS + r2.tsx四处size。32个真实红断言与修复前锁保留，最终另跑新证据。
