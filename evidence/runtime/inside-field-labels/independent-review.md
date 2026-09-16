# Inside Field Labels — Independent Review

后续颜色调整：本页保留首批 Text/Neutral/3 的审阅历史。当前 Text/Neutral/4 的独立色彩发现见 [续调记录](lighter-color/verification.md)，当前子状态为 findings。

日期：2026-09-14

审阅方式：独立代理按 `requesting-code-review` 只读复核实现与治理，并独立运行定向测试。本记录不代表人工视觉或对比度接受。

## 复核范围

- 计划：`docs/plans/2026-09-14-inside-field-labels.md`。
- 本批共享源差异：`packages/ui/src/input/form-item.tsx`、`packages/ui/src/input/input.tsx`、`packages/ui/src/select/select.tsx`、`packages/ui/src/styles.css`；相对于 `/tmp/rain-inline-label-before` 和本目录 `before/` 的本批基线检查。
- 使用与示例：资料筛选栏的框内标题与状态字段宽度，以及 Input、Select 文档示例。
- API 与语义：默认外置标题、可选框内标题、单一真实 label、字段 ID 与名称关联、help/message、required、disabled/readOnly、标签点击、SearchInput 继承、可搜索 Select 弹层内搜索的独立上下文。
- 治理：本批精确授权与文件范围、四份 Manifest 的独立记录、旧阶段与共享源哈希保护、分页来源保护、框内标题按关键交互文字校验，以及未获接受的人工 Gate。

## 发现与处理

产品实现及治理没有未解决的 P1/P2。

独立重跑发现新增 Select 单元测试的焦点断言范围和时序不准确：

1. 不可搜索 Select 打开后，Base UI 允许初始焦点落在 Popup 容器自身。原断言只允许组件根或内部 listbox，遗漏了合法的 Popup 目标。测试代理实测焦点为 `div[data-rain-id="ui-select-popup"][tabindex="-1"][role="presentation"]`；已安装 Base UI 的 `FloatingFocusManager` 也以 `focusableElements[0] || floatingFocusElement` 提供此回退。断言已改为等待实际焦点位于 Popup 内。
2. 可搜索 Select 的 `aria-expanded=true` 可能早于输入框获得焦点。该分支已改为等待弹层搜索输入框实际获得焦点，继续检查其独立名称和字段上下文。

上述修正只调整测试对实际行为的判断，没有修改产品的焦点或选择逻辑，也没有删除焦点检查。调试输出已移除。

## 独立验证

工作目录：`.worktrees/card-v2`。

| 命令 | 结果 |
| --- | --- |
| `pnpm exec vitest run packages/ui/src/input/input-field.test.tsx packages/ui/src/select/select.test.tsx` | 最终 2 个文件、61/61 通过；20:10:13 开始，耗时 4.27 秒。 |
| `pnpm exec vitest run scripts/table-rn08.test.ts scripts/layouts-v1.test.ts` | 2 个文件、10/10 通过；20:06:37 开始，耗时 2.47 秒。 |

本独立审阅者未启动浏览器、服务或运行全量检查。浏览器、构建及完整治理结果由主线程与相应验证代理的记录提供。

## 结论与边界

本批独立技术复核通过，可登记 `independentReview: passed`。人工视觉验收仍为 `awaiting_human`，对比度接受仍为 `not-granted`；测试通过不授予发布、Figma 写入、业务迁移或 Git 操作权限。
