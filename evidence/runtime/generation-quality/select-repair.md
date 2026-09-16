# Select 回归修复

## 执行范围

2026-09-16，用户在四批实现交付并列明两项 Select 失败后要求“继续推进”。本次继续处理这两项已复现的回归阻塞。沿用 generationQuality 阶段与原有 Select 授权；本次共享变更按 System Mode 执行，补充此前仅做诊断、保持 Shared UI 只读的范围。

- 目标：恢复 Select 已有的触发框跟宽行为；展示页在窄视口内保留可阅读的代码示例。
- 实施路径：`packages/ui/src/styles.css` 的 Select 弹层规则、`apps/playground/src/docs/components/select-page.css` 的代码块规则；已有精确 CSS 验证与回归用例同步核查。
- 根因：共享菜单缺省 max-width 为 320px；Select 未向既有 popup width 机制提供锚点宽度。展示页 pre 的最小内容宽度撑开自动网格轨道。
- 修复：Select 复用已有 `--rain-popup-width` 并绑定 Base UI 提供的 `--anchor-width`，继续经过原视口最大宽度限制；pre 复用其他展示页已有的 `overflow: auto`，滚动由代码块承接。
- 验证：原失败用例先红后绿；四类 Select、Input、Dropdown 与现有完整回归；保存真实浏览器几何、截图及错误。
- 已验证：单独让 pre 承接滚动即可消除网格的最小内容宽度，无需更多网格覆盖。
- 边界：不改颜色、尺寸 Token、状态/API、统计数据，不把修复记为新的视觉或对比度接受，不更新旧固定 M2 或迁移样例的共享源码快照。

## 记录

本次修改前源码文本及哈希在 select-repair/before/、before.json。原两个浏览器用例重新运行均失败，见 select-repair/red.log；断言及错误分别为弹层宽差 212px、320px 视口实际宽 420px。

- 原失败用例不改断言，修复后 2/2 通过（green.log）。三浏览器、两主题、1440/768/320px、四种 Select，共 72 组弹层宽度与视口边界检查通过；三个浏览器的代码块在 320px 页面内可独立横向滚动。实际截图与几何见 select-repair/geometry/；页面无运行错误。
- 初次完整单元检查揭示历史 protectedSha256 正确拒绝共享 CSS 的变化。phase 补充 `regressionRepair` 的精确来源与范围；旧基线和历史 transition 保留。现有保护函数只在授权下还原本条 Select 声明用于旧哈希比较，新增额外 CSS、换文件、缺授权和扩大 scope 的负例。
- Select/Input/入口初始定向检查 16/16 通过；增量治理与 Layout/Table/Dialog/入口合计 24/24 通过（protected-source-green.log）。
- 独立只读审阅通过：阻断/重要/次要均 0；4 个授权正向与 14 个拒绝条件通过。复核了超宽锚点的视口碰撞、四种 Select、窄视口代码块，普通 Dropdown 的显式 240px 与 auto 上限均保留。136/80px 小框仍沿用原有 140px 菜单最小宽度，本轮没有扩大为新的宽度设计。见 independent-geometry.json、independent-authorization.json。
- 首次完整单元尝试与浏览器并发时，浏览器证据目录内尚未清理的 `.playwright-artifacts` 含原始 JavaScript，被源码扫描拒绝；另有旧 lifecycle 单例超时。未放宽扫描和超时，停止该次单元运行，待浏览器完成后顺序重跑。中断与失败日志保留，不能计为全量通过。
- 完整浏览器回归 **296 项符合既定预期，退出码 0，10.6 分钟**（full-browser.log）。原两项 Select 失败通过；历史 Radix 对比用例中的两项 `test.fail` 仍按原定义执行，未改变。没有跳过用例。
- 原 Tabs 测试有固定输出路径；运行前已保留 127 个已有证据文件，结束后将新输出另存 browser/tabs-fixed-output，再按哈希恢复原文件。其他可配置输出均使用本轮目录，浏览器临时可执行追踪文件已清理。
- 顺序全单元曾达到 1390/1391，唯一剩余项为 Tailwind candidate-origin 的旧 styles.css 哈希。已在该测试中复用相同保护函数，仅识别该源码的授权声明变更；候选词集合、文件集合、旧来源快照及原负例保留，补一项额外 CSS 仍拒绝的检查。修正后的定向用例通过，随后重跑完整单元与构建。

## 最终技术结果

- 完整单元测试：105 个文件、1391/1391 通过（full-unit-green.log，135.43 秒）；类型检查与全部构建通过（typecheck-green.log、build-green.log）。构建仍提示部分 chunk 超过 500 kB，本轮未改变拆包策略。
- 治理检查通过（governance-green.log）；图标身份检查 899/899 通过（verify-icons-final.log）。最终阶段字段更新后，定向检查 10/10 与治理再次通过（phase-final.log、governance-phase-final.log）。治理通过不代表已接受日志中保留的对比度或颜色资格问题。
- Tailwind 来源检查的最终独立复核无发现：扫描 134 份源文件，1 个正向、14 个负向检查通过。只认可精确 styles.css 路径的本条授权变更，其他文件仍使用真实哈希，四词来源映射完整比较。见 independent-origin.json。
- 相对生成质量实施前的 2280 文件基线，packages 内仅 styles.css 变化；还原该条 Select 声明即可恢复原文件 SHA-256。旧 M2 与迁移归档保持原快照；最终共享文件、127 个旧 Tabs 证据及迁移归档哈希复核见 final-hash-audit.json。

generationQuality 的实现、自动验证、独立技术审阅现已完成；Human Gate 仍为 awaiting_human，未获得对比度接受、发布或业务迁移授权。可体验修复：http://127.0.0.1:5344/#select。
