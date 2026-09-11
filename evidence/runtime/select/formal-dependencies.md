# Select 正式依赖接入验证

2026-09-12 更新：用户“视觉已完成人工和检验。”已接受当前组件运行视觉，本页对应正式依赖／菜单选择图形的可见组合一并按 visual-only 记录。颜色、独立人工键盘、真实设备与发布仍未接受；下文为 09-10 技术批次原始记录。详见[当前验收](../../../docs/plans/2026-09-12-existing-assets-closure.md#当前运行视觉人工验收)。

日期：2026-09-10。授权：用户在占位审核后明确要求“继续”。范围见 [实施计划](../../../docs/plans/2026-09-10-select-formal-dependencies.md)。

## 当前结果

- 已接入 Base UI 1.8.0 Select / Combobox，复用现有 PopupProvider、浮层表面、DropdownMenu.ItemContent 和菜单条目样式；移除临时页面内面板和自建选项键盘、文档点击监听。
- 已选标签使用正式 Tag 与 Select 专用 Local Recipe，保留原公共接口、Select Parts、值身份、远程 metadata、查询、FormItem、只读、禁用、错误和加载合同。
- DOM 使用底座标准语义：触发器为 combobox；普通选择由选项持有焦点；搜索选择由输入持有焦点并通过 aria-activedescendant 表达活动项。无独立交互控件嵌入选项。
- 基线红测：原实现的 Portal 隔离与正式 Tag 两项均按预期失败；授权登记和导入边界新增检查也先观察到预期失败。
- 本轮定向验证：组件、页面、治理和颜色共55项通过；Chromium五项组合检查通过，包括四种选择方式、深浅主题、三种字段外观、尺寸、键盘、异步候选和320/360/736px触屏视口。最终质量检查见下表。

## 独立审阅

只读独立审阅发现4项P2，均修复并经独立浏览器复测关闭：

1. Portal 选项原先失去粗指针高度：恢复单行选项44px。
2. Tag 通用外边距和伪元素热区叠加：专用配方归零外边距与额外扩展。桌面32px标签字段实际34px、Tag24px、删除24px；粗指针字段54px、Tag和删除44px。
3. 普通选项键盘焦点不可见：恢复 data-focus=item，实际1px实线和3px光晕。
4. Tab经过Portal守卫重复触发focus/blur：整块Portal参与组件焦点归属。普通和搜索均仅一次focus、一次blur，外部目标保留焦点。

独立补充9项检查通过，覆盖搜索单/多的0、空字符串、数字/字符串身份、远程metadata、动态maxCount、Tab和受控Escape。其指出的正式Tab测试鼠标前置与键盘场景不一致已改为ArrowDown开启；修正后的44项组件检查在55项定向批次中通过。

治理收尾独立复核6/6通过，并通过额外变异检查确认：授权字段、其他组件导入、额外底座、Registry依赖扩张、全局Tag选择器、Select额外样式与触屏高度篡改均被拒绝；未发现新增P1/P2。Select专用Tag样式由Input／Select精确CSS验证负责，不扩大Tag自身规则。

## 修改范围

- `packages/ui/src/select/select.tsx`、`select.styles.ts`：正式底座、共享浮层／选项呈现及Tag配方；公共API保持。
- `packages/ui/src/styles.css`：仅登记的Select Portal尺寸、Tag组合、选项触屏规则。
- `apps/playground/src/docs/components/select-page.tsx` 与页面／组件／浏览器测试：说明及Portal、焦点、Tag实际结构断言。
- `status/current-phase.yaml`、`manifests/ui/select.yaml`、`registry/select.json`、`manifests/contracts/tailwind-b2.yaml`：本批授权、依赖图和精确例外。
- `scripts/verification-helpers.mjs`、`verify-boundaries.mjs`、`verify-tailwind-b2.mjs`及Select治理回归：限制授权文件、底座及样式范围。
- `scripts/token-foundation-outputs.mjs`与其生成的`manifests/contracts/token-foundations-v1.json`：替换已移除的临时面板颜色消费者，登记真实选中图标及浮层父背景；Token值不变。

## 当前颜色测量

[本批颜色记录](formal-color-findings.json)记录当前来源哈希、父背景与逐项结果，原[color-findings.json](color-findings.json)保留为历史测量。当前Select仍有89项对比度／168项资格发现，共享字段266项边界与焦点配对；Input150项对比度／96项资格。数字是配对数量，不是独立设计问题。新浮层复用的Dropdown表面和条目继续保留其自身颜色治理结果。

## 验收边界

本轮实现与原字段示意视觉接受分别记录；新的浮层/Tag组合尚待人工视觉验收。历史颜色发现原样保留；当前字段和新浮层的用途、父背景及4.5/3.0阈值继续核验，不把替换视为对比度通过。真实中文输入法、屏幕阅读器、真实触屏设备未测。未进行Figma、发布、业务迁移、Git操作。

## 最终质量检查

| 检查 | 本轮结果 |
| --- | --- |
| 治理、Token、899项图标完整性、全量类型检查 | 通过；收尾状态登记后的治理、全量类型及6项授权回归再次通过 |
| `pnpm test --maxWorkers=2` | 79个测试文件、1221/1221通过 |
| `pnpm build` | 通过；图标目录既有大分块提示保留 |
| `pnpm test:e2e` | 179项中178项首轮通过；Select本批5项全部通过 |
| 图标浏览器复跑 | `pnpm exec playwright test tests/e2e/icon-rendering.spec.ts --workers=1`，7/7通过 |
| 独立审阅 | 4项P2均复测关闭；独立补充9项行为、6项治理检查通过 |

全量默认并发曾在既有README FIFO安全测试的1秒子进程上限处超时；同一测试单独通过，保持原断言和上限、将全量并发限制为2后1221项全过。总览页的旧button/页面内option定位已按正式combobox/Portal语义更新；Select删除了不必要的aspect-auto，未扩展结构类白名单。

浏览器首轮剩余失败发生在图标页首次加载标题的5秒等待，快照为“正在打开图标库…”，尚未开始像素断言；完整图标文件按原断言另行复跑7/7通过。本批测试配置、超时和断言门槛均未放宽。

当前尺寸和主题证据：[浅色](formal-light.png)、[深色](formal-dark.png)、[窄屏](formal-compact.png)。原light/dark/compact仍保留为历史截图。内置浏览器另实看了普通与搜索组合，正式浮层正常显示。

本批状态：`formalDependencies.implementation=completed`、`automatedVerification=passed`、`independentReview=passed`。Select资产仍为registry-candidate，未发布；父级字段／颜色记录维持in-progress/findings，Human Gate保持awaiting_human。本批没有新的公共组件或全局Token，只有已有Select候选的正式依赖接入与内部具名Tag配方。
