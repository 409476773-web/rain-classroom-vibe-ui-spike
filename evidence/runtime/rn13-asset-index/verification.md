# RN-13 验证记录

本轮 **RN-13 文档、检索和本地登记实现完成；限定自动检查通过；独立技术复核通过**。整体类型检查与扩展历史回归仍有下列失败，不声称全库检查通过。基线见 [baseline.json](baseline.json) 与 `before-*`；原V2规划快照、历史图片和Gate均未改写。

用户授权：“RN10已经完成建设了。继续推进下一步”。范围为M1的RN-13，System Mode；没有公共组件视觉/行为修改，没有新增依赖。原V2规划快照保持不变。

## 实际交付

- [按需使用入口](../../../docs/ai/README.md)与[生成索引](../../../docs/ai/asset-index.md)：51份合同、47个默认条目。Button、Badge、Surface、Link的4份本地合同不进入默认检索；候选身份、成熟度、自动检查、Human Gate、对比度接受、发布分别展示。
- 补Badge/Surface/Link的实际API、Parts、来源和已知限制；补core-ui本地源码记录。Input/SearchInput依赖及FormItem的InputStatus类型依赖有明确引用。
- 补Table与Empty的具名部件导出，将Pagination的裸组件依赖改为明确本地Registry条目，补其图标关系；不是在线标准Registry，也没有声称逐项安装已验证。
- 生成器复用现有YAML解析器和Vite提供的TSX解析器，检查引用、公开导出、重复登记、依赖目标与生成物过期；接入现有`verify:evidence`和精确治理名单。
- README导向单源索引，旧基础组件审计保留为历史并导向当前Card和新合同；补BM-A/B复制改造路径、宿主状态边界及RN-14/RN-15尚未完成项。

## 本轮实际验证

| 命令/检查 | 结果与证据 |
| --- | --- |
| `pnpm exec vitest run scripts/asset-index.test.ts --maxWorkers=2` | 1/1通过；包含多资产检索、实验排除、旧Gate保留、失效路径/导出/依赖拒绝及文档链接检查。[日志](index-test.log) |
| `node scripts/asset-index.mjs --check` | 通过，生成内容与当前登记一致 |
| `node scripts/asset-index.mjs --find Textarea` | 返回匹配合同，整体Human Gate仍为awaiting_human；[检索输出](lookup-textarea.log) |
| `pnpm verify:governance` | 完整命令通过；保留原颜色/用途finding与已接受例外的实际数值。[最终日志](governance-final.log) |
| `pnpm typecheck` | 5个工作区包检查通过，测试类型检查因既存Dialog测试3处`process.cwd`声明缺失失败。[最终日志](typecheck-final.log) |
| `pnpm exec vitest run scripts/asset-index.test.ts scripts/verification-helpers.test.ts scripts/table-rn08.test.ts scripts/layouts-v1.test.ts --maxWorkers=2` | 4文件、251项；242通过，9项失败，详见下表。[日志](tests-final.log) |
| 源码/阶段基线比对 | `apps/**`、`packages/**`原有文件字节未变；剥离本轮rn13记录后，完整phase与开工前相同。[比对](scope-check.json) |
| `git diff --check` | 通过；未提交或推送 |

本轮没有公共运行时变化，未重跑浏览器视觉、真实IME/读屏/物理触屏、构建或独立安装。此前组件证据仍只覆盖原批次；默认索引的`passed`来自Manifest原登记，不能当成本轮重新验证47个组件。

## 扩展检查保留问题

| 失败 | 数量 | 归因与本轮边界 |
| --- | --- | --- |
| 旧B2测试夹具混入后续Dialog文件 | 2 | 夹具未排除此前Dialog补充文件；本轮RN-13文件已精确排除，历史夹具断言保持 |
| RN-06/RN-08/内部标签/Empty/RN-09旧phase快照 | 5 | 后续已授权的dialogRefinement未从旧快照比较剥离；本轮仅按有效授权剥离rn13增量，不重写旧快照 |
| RN-06 Foundations出口原始哈希 | 1 | 后续Overlay Token已改变出口；本轮packages源码未变 |
| RN-10 Textarea接入原始哈希 | 1 | 后续等高改造已改变Textarea；开工前SHA与本轮当前SHA相同，原导入SHA不同，见scope-check |
| Dialog测试类型声明 | 3处错误 | `scripts/dialog-refinement.test.ts`第70/75/77行使用`process.cwd`，仓库`tests/node-runtime.d.ts`未声明；本轮未改这两个文件 |

这些问题不阻断本轮文档与索引的限定交付；它们仍是全库检查与后续RN-14/RN-15应处理的明确欠项，不把失败标成通过。

首轮本批问题已解决：索引缺失的红测、工具链无旧TypeScript AST接口、模糊Pagination依赖、遗漏部件导出、RN-13精确名单未接入、文档链接检查的严格类型报错。独立审阅发现的FormItem类型依赖已补齐；没有改组件行为或历史SHA以制造通过。

## 独立复核与状态

`rn13_review`独立只读审查源码、登记、精确名单和状态隔离，结论：本轮无未解决P1/P2，可完成本地候选文档交付。审阅者亲自运行索引1/1、索引/证据/边界/差异检查；其helpers联合回归236/240，4项失败与上述旧问题相同。详细结论见[独立复核](independent-review.md)。

总阶段仍为Token Foundations V1；新增的是文档与本地登记，没有新增或提升System Asset。RN-13的Human Gate=`not-evaluated`，无新视觉接受；所有原资产Gate、对比度接受、发布、迁移及Git权限保持独立。下一个建设检查点为RN-14连续AI改造与干净目录消费；RN-15整体交付尚未关闭。
