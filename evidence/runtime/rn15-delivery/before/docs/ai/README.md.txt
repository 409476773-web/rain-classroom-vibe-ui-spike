# Rain 按需使用入口

适用范围：当前本地工作区的原型与候选源码。先遵守根 [AGENTS](../../AGENTS.md)；本页用于减少重复加载，不能替代当前任务的阶段、来源与验证边界。

## 找到需要的资产

1. 先查 [生成资产索引](asset-index.md)，或在仓库根执行 `node scripts/asset-index.mjs --find Textarea`，只读取命中的合同、源码与依赖。
2. 顺序为 Template → Block → Pattern → Layout → UI → Primitive；不匹配时退回下一层。当前没有已交付的公共 Template/Block，不把 BM-A/B 当成公共模板。
3. 默认复用完整组件；需要改变时依次选择已有 Variant → 具名 Local Recipe → Local Fork。布局与业务状态留在宿主，公共组件修改须按 System Mode 范围登记。
4. 需要视觉调整时再查 [Token 选择](token-selection.md)，需要图标时再查 [图标选择](icon-selection.md)。不默认加载完整 Token JSON、全部图标或历史日志。
5. 读取 [phase](../../status/current-phase.yaml) 对应增量，核对当前证据；整体 Gate、局部视觉接受、对比度和发布分别判断。

索引从实际 Manifest 与本地 Registry 生成，不手工维护第二份资产状态。更新登记后运行 `node scripts/asset-index.mjs --write`；`node scripts/asset-index.mjs --check` 检查引用、导出与过期内容，同一检查已接入 `pnpm verify:evidence`。

## 当前入口与选择

| 任务 | 先读 |
| --- | --- |
| 分组、间距、主从区域 | [Layout 用法](../audits/2026-09-13-layouts-usage.md)，再查命中的 Stack / Inline / Grid / Split 合同 |
| 独立内容对象 | [Card](../../manifests/ui/card.yaml)；默认20px内边距与既有Parts/Recipe，不把Card当作所有布局的容器 |
| 输入与校验展示 | [FormItem](../../manifests/ui/form-item.yaml)、[Input](../../manifests/ui/input.yaml)；长文本用[Textarea](../../manifests/ui/textarea.yaml)，由宿主拥有草稿、校验和提交 |
| 对话框与确认 | [Dialog](../../manifests/ui/dialog.yaml)、[AlertDialog](../../manifests/ui/alert-dialog.yaml)；复用既有焦点、关闭与嵌套浮层行为 |
| 数据表 | [Table](../../manifests/ui/table.yaml)、[Pagination](../../manifests/ui/pagination.yaml)、[Empty](../../manifests/ui/empty.yaml)；业务处理见BM-A |

公共入口为 `@rain-next/ui`、`@rain-next/layouts`；图标使用静态 `@rain-next/ui/icons/<slug>`。`defineRainLocalRecipe`、`rainCn`、`iconButtonSizes`、`defineLayoutSpacing` 是现有组合工具，保留各包出口，不另建同义组件。源码级 Pattern 记录标为“复制源码”，不能误写成 UI 包导入。

首次接入先沿用 [prototype入口](../../apps/prototype/src/main.tsx) 与 [应用样式](../../apps/prototype/src/styles.css) 的加载关系；Foundations、Focus、Motion、UI和Tailwind受约束扫描缺一不可。不要只复制一个TSX文件后声称已完成安装。

## 复制和改造 BM-A/B

| 场景 | 当前本地实现 | 改造边界 |
| --- | --- | --- |
| BM-A 数据管理 | [入口](../../apps/prototype/src/scenarios/bm-a/page.tsx) · [状态合同](../../apps/prototype/src/scenarios/bm-a/state-contract.md) · [验证](../../evidence/runtime/bm-a-rn09/verification.md) | 复用[资料表配方](../../apps/prototype/src/data-table-recipe.tsx)；宿主拥有筛选、分页、刷新和选择，保留过期请求保护与查询范围内选择协调 |
| BM-B 教材大表单 | [入口](../../apps/prototype/src/scenarios/bm-b/page.tsx) · [状态合同](../../apps/prototype/src/scenarios/bm-b/state-contract.md) · [验证](../../evidence/runtime/bm-b-rn10/verification.md) | 复用Dialog、FormItem与字段；宿主拥有草稿、取消、校验、保存、模拟上传与重试，保留固定操作区和窄屏退化 |

两者均为 `local-experiment`。复制到新的本地场景时保留来源、稳定追踪属性和状态合同，记录自己的范围/修改点/尚未验证项；需要新增扫描或消费者登记时精确添加对应路径。先更改内容与结构，再检查保存失败、取消、焦点恢复和窄屏，不能把原场景验收复制给新场景。

本地体验：运行 `pnpm --filter @rain-next/prototype dev --port 5201 --strictPort`，打开 [BM-A](http://127.0.0.1:5201/#bm-a) 或 [BM-B](http://127.0.0.1:5201/#bm-b)。端口占用时选择空闲端口，不结束其他任务的服务。组件文档站另用根 README 中的启动方式。

## 固定本地样本（RN-14）

RN-14已完成BM-A/B各一次复用生成和两次连续结构修改；固定最终样本的独立安装、类型、构建及三浏览器交互检查通过，独立复核与详细边界见[本轮记录](../../evidence/runtime/rn14-editability/verification.md)。本地体验：[资料管理](http://127.0.0.1:5324/#bm-a) · [教材表单](http://127.0.0.1:5324/#bm-b)。服务停止后按样本README重新启动。

本轮固定结果为[最终样本归档](../../evidence/runtime/rn14-editability/starter-final.tar.gz)，身份 `rn14-90fc74205a764fb1`，完整哈希见[来源锁](../../evidence/runtime/rn14-editability/final-source-lock.json)。展开到一个新目录后，按归档内README运行。新样本仍为 `local-experiment`，最终BM-A/B运行视觉已获[用户确认](../../evidence/runtime/rn14-editability/human-gate.md)。归档内待确认标记为生成时状态，当前确认以该记录和phase为准。

需要从当前工作区重新取得未经这六轮改造的起点时：

```sh
node scripts/rn14-starter.mjs --export /tmp/rain-next-local-trial
```

目标必须是仓库之外、尚不存在的目录。在该目录运行 `pnpm install --frozen-lockfile --offline --ignore-scripts --package-import-method=copy`、`pnpm build`，再运行 `pnpm dev --port 5315 --strictPort`，访问 `#bm-a` 或 `#bm-b`。离线安装依赖本机缓存；另一台机器尚未验证，不把缓存缺失当成版本可以漂移的理由。

导出保留三个源码包、BM-A/B和锁文件，提供单独的应用入口；`source-lock.json`记录来源HEAD与实际文件哈希。复核固定快照使用 `node scripts/rn14-starter.mjs --check /tmp/rain-next-local-trial`（在原仓库运行）。主动改造后的文件应记录自己的新快照，不回填旧哈希。当前阶段只支持本地试用，无在线Registry或发布包。

## 已知限制

- 本地 Registry 为 `RainLocalSourceRegistry / current-workspace`，未发布，也不是标准在线 shadcn Registry。`registry/文件.json#条目` 是本地源码关系；历史裸图标名仅在 Rain 图标登记内解析。将来生成在线标准输出时应使用完整 Rain 地址，不把裸 `button` 当成内置安装项。
- Button、Badge、Surface、Link 保持 `local-experiment / prototype-ready`，只补[本地源码记录](../../registry/core-ui.json)，排除默认候选检索。现有工作区维护可按各自合同使用；Badge/Surface/Link的旧数值与独立验收债务仍见[早期合同审计](../audits/2026-09-12-core-ui-contracts.md)。TextButton继续使用Button的text变体。
- 索引的自动验证是原Manifest的记录，时间和范围须查原证据。Card、Layout、Table、Textarea等整体Gate与后续局部接受分别保留；BM-B视觉接受不等于Textarea所有用法已接受。
- [颜色待决清单](../audits/2026-09-12-color-closure-review.md)及组件后续记录仍有效；BM-B浅色静态提示3.71:1仍待审查。不因可检索而推广未解决的颜色配方。
- 真实系统IME、屏幕阅读器、物理触屏与另一台机器的字体命中均按实际证据保留；本轮没有重新执行组件视觉检查。
- RN-14限定的六轮改造与独立消费检查已通过；没有对照实验，效率、token及真实用户修正成本仍为 `not-measured`。RN-15整体试用交付尚未关闭；既有9项历史测试失败和3处测试类型声明错误见本轮记录。BM-C/D仍未建设；没有包/Registry发布、Figma写入或业务迁移。

本批范围与验证见 [RN-13计划](../plans/2026-09-15-rn13-asset-index.md)和[验证记录](../../evidence/runtime/rn13-asset-index/verification.md)。
