# M2 本地交付与运行验证

2026-09-15。用户授权：“继续m2”。工作模式为 System Mode，页面身份为 `local-experiment`。本次完成 RN-11 BM-C、RN-12 BM-D，以及 C/D 的 RN-14 修改试验和 RN-15 限定交付；新视觉仍待人工验收。RN-16 按场景需要持续接入，本批没有新增公共组件、依赖或 Registry 资产。

当前阶段见 [current-phase](../../../status/current-phase.yaml)，来源、范围和决定见 [实施计划](../../../docs/plans/2026-09-15-m2-workbench-report.md)。V2 规划快照保留原文，旧人工决定未回填或扩大。

## 交付内容

| 项目 | 本次结果 | 人工视觉状态 |
| --- | --- | --- |
| RN-11 / BM-C | 虚构 A/B 卷的分层批改、按题/按人遍历、每对象草稿、评分验证、失败重试、成功后前进、独立滚动及收起/宽度/窄屏 | awaiting_human |
| RN-12 / BM-D | 完整筛选集四指标、加权统计、趋势/明细分页、本地 Statistic、明确标记的固定 AI 示例 | awaiting_human |
| RN-14 / C/D | 两场景各初始生成及两次结构修改，来源/差异/非目标哈希及实际验证留痕；新独立消费样例 | 不由技术结果推导 |
| RN-15 / M2 | 类型、单元、范围、颜色、构建、三引擎及旧依赖回归；独立审阅和可恢复归档 | 不由技术结果推导 |

主要实现为 [BM-C 页面及合同](../../../apps/prototype/src/scenarios/bm-c/state-contract.md)、[BM-D 页面及合同](../../../apps/prototype/src/scenarios/bm-d/state-contract.md)。页面分别拥有数据、筛选、当前对象、草稿和请求状态；复用既有 UI/Layout、密度及可取消模拟任务。主入口只增加 C/D 分支，登记表和严格验证器同步本批范围。

## 独立样例与恢复点

- 体验：[作业批改](http://127.0.0.1:5337/#bm-c)、[学习报告](http://127.0.0.1:5337/#bm-d)。操作说明：[M2 本地体验](../../../docs/ai/m2-trial-guide.md)。本地服务需要保持运行。
- 固定版本：`rn14-fa87d85aad5aa045`；目录 `/tmp/rain-next-m2-final-20260915`；1993 个源文件。
- [源码锁](final-source-lock.json)、[归档](starter-final.tar.gz)、[消费记录](consumer.json)。归档 SHA-256：`5e982cb7d5f54450a257fed204e81c4942275b931d07bd1ea078691a08110748`。
- 在独立目录完成离线冻结安装、类型检查、构建和源码锁检查。浏览器测试工具从工作区运行，目标为独立构建的 5337 服务。归档解压到另一新目录后再次通过锁检查，见 [恢复验证](restore-check.log)。
- M2 样例携带工作区的 canonical A/B 场景。先前 RN-14 连续修改的 M1 副本仍是独立冻结版本 `rn14-90fc74205a764fb1`，不是本次的 A/B 源码输入。
- 旧 M1 消费目录和 707 个 RN-14/RN-15 证据文件，清单及哈希均保持原样，见 [历史保留证明](historical-preservation.json)。旧归档 SHA 仍为 `81ed247e9e3c57bf9edd94ace9bea30487557ab5404c26570aa8ea055c7f900e`。

## 实际验证

| 检查 | 结果 / 证据 |
| --- | --- |
| 完整单元测试 | `pnpm exec vitest run --maxWorkers=2`：105 文件、1387/1387，[日志](unit-final.log) |
| 后续窄屏修复定向回归 | C 状态 + M2 严格登记 10/10，[日志](final-focused.log)；页面几何另由下述三引擎检查覆盖 |
| 类型 / 构建 | 工作区通过：[类型](typecheck-final.log)、[完整构建](build-final.log)、[最终页面构建](build-visual-fix.log) |
| 治理 / 图标 | 冻结依赖、边界、来源、B2 与 Token 检查通过：[治理](governance-final.log)；899/899 图标来源通过：[图标](icons-final.log) |
| 最终工作区 C/D | Chromium / Firefox / WebKit，21/21，[日志](browser-visual-fix.log) |
| 最终独立消费者 C/D | 三引擎 21/21，0 失败、0 重试通过、0 跳过；新增正文真实高度、Footer 包含和页尾位置断言，[日志](consumer-browser.log)、[报告](consumer-browser/report.json) |
| 独立消费者 A/B | 原脚本 baseline 分支；每引擎 3 个综合流程、共 9 组，含选择/分页/密度、保存失败与重试、Select/AlertDialog 嵌套与焦点、附件失败/阻止保存/恢复，[Chromium](consumer-baseline-chromium.log)、[Firefox](consumer-baseline-firefox.log)、[WebKit](consumer-baseline-webkit.log) |
| A/B 与依赖回归 | 49/49：Card/Layout/Dialog 25 个 Chromium 检查 + A/B 8 个 × 三引擎；0 失败、0 重试通过、0 跳过，[日志](rn15-regression.log)、[报告](rn15-regression/report.json) |
| 消费者安装与构建 | [安装](consumer-final-install.log)、[类型](consumer-final-typecheck.log)、[构建](consumer-final-build.log)、[锁检查](consumer-final-lock-check.log)通过 |
| 独立审阅 | 规格符合性与代码质量两阶段通过，三项 P2 已复核关闭，[审阅记录](independent-review.md) |
| 最终状态收尾 | 登记及历史保留检查 19/19，[日志](closeout-tests.log)；状态改为完成后再次通过[治理](closeout-governance.log)、[类型](closeout-typecheck.log)及[完整构建](closeout-build.log) |

浏览器检查覆盖评分 0 分/越界、保存中锁定、失败保留、模式/卷别/布局切换的草稿、逐字搜索焦点、真实溢出后导航、桌面和窄屏浅/深色、图表键盘读数、全范围统计和分页隔离。控制台及页面错误为空。

最终 Chromium 窄屏为 390×844：评分正文 clientHeight/scrollHeight 为 666/666；Footer 位于正文后、被 inspector 包含；根背景延伸到 2129，页尾位于工作区之后。其他两引擎同类断言通过，见 [几何记录](consumer-browser/chromium/bm-c-geometry.json)。桌面/窄屏截图在对应引擎目录，已实际查看；浏览器自动化不替代人工视觉验收。

完整单测之后的改动限于本地窄屏自然高度、移除冗余原生进度条、相应浏览器断言及交付状态；其后执行定向回归、最终消费者及旧场景回归。构建仍提示大于 500 kB 的 bundle，未作性能优化；性能/修改效率均为 `not-measured`。

## RN-14 六轮记录

| 阶段 | 实际修改 | 记录 |
| --- | --- | --- |
| C0 / D0 | 初始批改切片 / 完整统计报告 | [C0](trials/c0/record.json)、[D0](trials/d0/record.json) |
| C1 | 固定筛选区、独立滚动目录，首次待批定位和父级位置恢复 | [C1](trials/c1/record.json) |
| C2 | 评分参考移至右区，修复密度容器高度约束，保留固定操作及草稿 | [C2](trials/c2/record.json) |
| D1 | 摘要提前，调整深色图形系列和 AI 区域配色，保留公式 | [D1](trials/d1/record.json) |
| D2 | 趋势与 AI 并排、窄屏纵向组织及图内横向滚动 | [D2](trials/d2/record.json) |

每轮记录任务文本、输入版本、实际来源哈希、差异、非目标清单和结果。D1 之前的 C1/C2 交错修改有单独 [输入记录](trials/d1/input-nontarget.json)。模型记录仅使用可见信息 `Codex based on GPT-6`，精确修订及采样参数未暴露；没有用模型名字或耗时推导效率。

初始记录与后续修复分开：[修复差异](post-trial-fixes/record.json)保留 WebKit 收起焦点、搜索意图、标题滚动、窄屏自然高度及进度数量表达的变更，没有覆盖 C2/D2 快照或冒充第三轮结构试验。

## 失败记录与修复

- WebKit 内部收起评分区时焦点曾落到 body；现在宿主先聚焦外部展开按钮，再收起。首次三引擎为 20/21，原 [失败日志](browser.log)与 trace 保留，后续通过。
- 独立审阅的三个 P2 分别有 [逐字搜索失败](search-focus-red.log)、[标题不可见失败](scroll-focus-red.log)、[窄屏失败](narrow-layout-red.log)。三项均由最终消费者三引擎及独立复查验证关闭。
- 首次全量单测 1375 通过/10 失败：浏览器临时源码落入测试目录污染历史边界样本；并行负载触发时限；M2 元数据使用 `import.meta.url` 在 jsdom 下非 file URL。现输出采用绝对临时目录、限制单元 worker 数，元数据沿显式 root 读取并保留冻结 SHA/负例，完整重跑 1387/1387。未增加测试时限或削弱检查。
- 独立 A/B 初跑误用 RN-14 `final` 分支，要求旧修改副本专属标记，见 [日志](consumer-ab-chromium.log)。M2 输入是 canonical A/B；使用既有 `baseline` 分支完成相同业务流程及嵌套浮层检查，没有修改旧脚本或旧副本。
- 窄屏修复前的临时消费者 `rn14-b34efbe2c5082187` 保留用于追溯；本次交付以 `rn14-fa87d85aad5aa045` 为准。

## 颜色、保留范围与未决项

- 31 项本地颜色用途冻结登记；文字/图形在真实登记表面上共 50 组 Light/Dark 计算通过。文字最低 4.683:1（阈值 4.5），图形最低 4.462:1（阈值 3），见 [测量](color-measurements.json)。这只覆盖新增局部配方，既有组件的待审对比度及已记录例外仍保留，不等于整个页面对比度验收通过。
- Data/UI 字体角色和实际 CSS 已测；`document.fonts.check` 的值不证明字体文件实际可用。真实跨机器字体、中文 IME、读屏与物理触屏仍未验收。
- 开工基线 2265 个已有文件中，2250 个原样，15 个为本批入口、登记、验证维护及测试变更；1974 个共享包和 A/B 源文件保持原样，见 [范围证明](scope-check.json)。没有修改 Master、旧颜色决定、字体文件或原 M1 快照。
- 本地源代码与 mock 数据样例已完成；新视觉 Human Gate 为 `awaiting_human`，对比度人工接受未授予。无真实后端保存/附件预览/AI 服务；刷新或离开场景清空示例编辑。
- Figma 写入、包/Registry 发布、业务迁移、Git 提交/推送/PR 均未执行。HEAD 仍为 `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`，原工作区修改保留。

下一检查点：体验批改与报告，给出本批视觉和交互反馈；RN-16 只在后续真实场景提出缺口时继续扩面。
