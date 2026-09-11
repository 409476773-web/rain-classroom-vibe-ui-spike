# Tabs TB-00 / TB-01 技术预验证

2026-09-10；System Mode；用户明确“开始实施”。本记录不构成运行视觉 Human Gate。

## TB-00 已执行

- 实施前 `pnpm verify:boundaries`、`pnpm verify:tailwind-b2` 均通过；精确文件基线见 `source-baseline.json`。
- 新 Tabs 授权/文件/导入用例先失败（缺少 Tabs guard），实现后通过；随后新增局部 CSS 用例先失败，再实现精确检查。
- 历史夹具回归发现本次新增文件未从冻结夹具中排除；沿现有显式文件集合修正，不更改历史 hash 或原始冻结内容。
- `pnpm exec vitest run scripts/tabs-governance.test.ts scripts/verification-helpers.test.ts scripts/verify-tailwind-b2.test.ts --maxWorkers=2`：3 文件，412 检查通过。
- 进行中的精确边界只纳入已存在的小样文件，不能借此导入公共 Tabs 或其他 Base UI 子模块。

## TB-01 已执行

`passed`。`pnpm exec playwright test tests/e2e/tabs-preflight.spec.ts --project=chromium`：14/14，通过；当前仅 Chromium。小样使用真实 Rain 字体、图标、Input、DropdownMenu 与全局 Focus，内容为 Mock。

| 验证范围 | 实际结果 |
| --- | --- |
| manual / automatic、横向 / 纵向、禁用跳过、Home/End/循环 | 通过 |
| 初始 selected+disabled、动态禁用、全禁用后恢复、恢复后的单一入口 | 通过；从列表前按钮用 Tab 键进入 |
| More 全原序边界显露、菜单浏览不激活、选择后聚焦、Escape、Tab、外点、打开时容器重测 | 通过；小样固定窗口不代表正式真实宽度算法已完成 |
| 受控拒绝与延迟接受、外部焦点不被抢回 | 通过 |
| 初次创建与返回时同一输入 DOM / 输入值保留 | 通过 |
| 多实例所有 Tab/Panel 双向关联及唯一 ID | 通过 |
| Tooltip 单 button、Focus/Hover/Escape、显露后首次提示、收纳后关闭、禁用原生说明 | 通过 |
| manual pointerdown 后取消不激活 | 通过 |
| B 外部 28/32/38px、内层减 4px、边缘可点击 | 通过 |
| C 描边预留且选择前后几何稳定、四向共享 Focus 无裁剪祖先 | 通过；只验证几何与焦点，不是颜色验收 |

发现并修复的实际问题：Base 会移除按钮 disabled，因此使用原生 fieldset 继承禁用；初始/动态禁用后的列表入口仅在实际缺失时补回；Tooltip 1.8 默认 Popup 没有 tooltip role，已显式声明；显露项先完成截断测量再聚焦。具体适配与边界见 [ADR 0008](../../../docs/adr/0008-tabs-headless.md)。独立审阅提出的动态双入口与隐藏入口均保留了实际回归断言。

## 治理复核

独立审阅发现的小样选择器外溢、命名色/现代色/空白 var/Token 重定义绕过、删除 CSS 同时绕过 TSX 保护，以及 passed 缺少证据的漏洞已补否决用例。颜色修复只作用于 Tabs 小样，未改变 Dropdown 的既有局部变量许可。最终完整治理回归结果在后续 verification.md 汇总。

公共 Tabs、三档 Token 合同及 C 颜色资格在此检查点尚未实现；此预验证不得替代后续公共组件测试与 Human Gate。


## TB-07 小样退役记录

2026-09-11：公共 Tabs 已将上述 14 项断言迁入 `tests/e2e/tabs.spec.ts`；正式 `#tabs` 路由共 22/22 项通过（39.9 秒），包含 36 组合的实际几何与新增动态溢出回归。通过后删除原小样 TSX、CSS、测试、路由及专属样式许可。`stage: documentation` 明确要求退役文件缺席，同时继续要求本预验证记录与来源基线存在。旧命令是历史证据，当前复现使用正式测试，不重新制造小样。
