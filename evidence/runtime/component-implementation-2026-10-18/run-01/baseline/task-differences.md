# 工作包与真实工作区差异（B01–B09 / C01–C03）

日期：2026-10-18；只读审计阶段，不把历史通过记为本批通过。工作区 `.worktrees/github-review-20261017`，HEAD 为计划基准 `6a2364c8b0325a243b2de8ebe12361e305aab333`。已读当前 AGENTS、SPIKE_BRIEF、status 有效增量、深度审阅实施计划及相关任务卡/实现/测试/合同。

## 真实基线

- 开始时 46 个 tracked 文件有用户改动，另有 deep-review 新源码、测试、指南和 evidence。基线文件与补丁由 B00 保存；所有改动保留。
- 新鲜读取：Node 24.13.0、pnpm 10.28.1；从 Playground 安装位置解析 React/DOM 19.2.8；Vitest 4.1.11、JSDOM 29.1.1、Playwright 1.62.1、Vite 8.2.2；锁文件无 diff。
- `deep-review-fixes-2026-10-17/governance/source-bindings.json` 的 68 个当前来源 SHA-256 全部与磁盘匹配。已有修复不是仅在报告中描述；但本批仍须新鲜窄回归。
- 当前有效增量包含 `deepReviewMaintenance20261017`（R01–R07、延迟焦点、三组合）和 `playgroundDeliverySummary`。旧顶层阶段、旧测试计数不作为当前通过依据。旧人工接受仅按原范围保留。

## 差异与下一步

| 任务 | 磁盘已有实现及历史证据 | 本批仍需处理/验证 |
| --- | --- | --- |
| B01 / R01 | 5 个未定义名的 12 处消费已修；CSS scanner 与正负例存在；真实 Tabs 四方向修前 0px、修后 1px 记录存在 | 新鲜 scanner/相关 Tabs 测试；隔离后的四方向浏览器；补 showDivider=false、contained/soft、NavigationBar 共用样式与 Light/Dark 具体消费范围。不可仅以旧 CSS 记录完成新矩阵 |
| B02 / R02 | allowedModes 意图适配、两个真实 React 控件红灯及 51 项绿灯记录；非法外部 action 仍失败 | 历史 workspace.md 明确未跑真实浏览器。本批需键盘/恢复/焦点/草稿 fixture，核 SHOW/PIN_TEMP/UNPIN 合法子集与既有 workspace-states 测试 |
| B03 / R03 | 已实际复现，捕获 reset 先恢复 DOM 默认值，下一任务恢复 React 状态；支持外部 form、取消、受控；真实 Chromium 中曾检出 microtask 时序问题并修正 | 新鲜 Input/InputField 与浏览器；现有用例没有显式 defaultValue 更新、原生 input 同条件对照、IME 期间 reset/卸载待恢复覆盖。需先说明挂载初值合同并按任务补验证，不重造已修复缺陷 |
| B04 / R04 | 已实际复现根 StrictMode pending 被 abort 后票据保留；已清票据和 pending；真实浏览器有默认/受控首展开 | 新鲜 Tree suite/浏览器；现有 StrictMode 专项只验证 resolve，缺同条件 reject、并发分支/节点删除窄证据；既有 retry、awaiting-data、revision、旧 finally、卸载测试需保留 |
| B05 / R06 | 课程与满分分别 FormItem 错误；首错阅读顺序；无关字段编辑不清他处错误；Field 复制代码与 live TSX 同源 | 重跑 G5/日期表单与隔离 E2E，明确满分空/0/201/非整数、定时字段可见性矩阵。批改 0 分有效合同不受影响 |
| B06 / C1 | slider/drawer 延迟真正内部模块的两条红灯记录；DocumentFocus 与内容共 Suspense 提交；离开后不抢焦点 | 新鲜慢首访/缓存/切页；现有浏览器 deterministic pending 已足够做时序入口，但还须可控 lazy promise 单测、现有 7 个 G5 焦点与同文档 query/直达 navigationCount=0 合同 |
| B07 / C2 | 未实施；源码 guard 仅 `variant=text` 的 aria-disabled=true；普通变体仅透传属性。两份 suite 对 text true/string true/false/loading 已有断言；Manifest 只明确 loading 可聚焦且防重复 | 先跑 click/Enter/Space/submit 跨变体矩阵。只读搜索未发现生产 TSX 直接把普通 Button 的 aria-disabled 当禁用（IconButton/原生按钮是另一合同）。现证据不够把普通变体差异判成已确认缺陷；可澄清仅 text，若统一须明确新增合同/消费理由与视觉边界 |
| B08 / R05 | exporter 已从实际指南 Markdown/反引号推导显式 Manifest，resizable 已补；M1/M2 历史精确安装/type/build/check 与文件锁存在 | 新鲜不存在目标导出、负例与 --check；保留路径安全、M1/M2、G6来源。后续 S01 接规范模型，最终 A02 前重导出 |
| B09 / R07 | 已有 `playgroundDeliverySummary` + Manifest/Registry 生成首页、140合同/128候选/12本地统计、历史 Day3 收折、Benchmark 多状态展示 | 应融入 M01 唯一规范模型；与 D01 做入口集成，来源维度/旧路由断言及桌面窄屏复核，不能维护第二套长期模型 |
| C01 | 三份 canonical TSX 和 composition-recipes.md 已存在；Starter 同字节复制；32/36px/草稿ID/手动查询/就近错误有 3 条 E2E | 当前批改保存为同步模拟，无 loading/失败分支；新任务要求 0 分、保存失败保留、宽1440/窄390、长文/error/loading/disabled、真实浏览器200%能力范围。旧测试宽1100且未测200%，不能继承为完成 |
| C02 | 未在旧修复中实施；旧 verify:tokens 明确保留已知对比度失败/未证明组合 | 从现 ledger 选限定高频消费矩阵，记录 computed/alpha/祖先表面、ring+halo/forced-colors；有真实失败才局部候选；需要人审的冲突集中 gate |
| C03 | 未在旧修复中实施；现有图标语义/字体密度合同保持 | 结合 C01/M03 具体教学歧义与阅读配方补指南和局部检查；不扩大899图标、不改字体事实源、不把用途未确认写成不可用 |

## 推荐窄回归入口（本审计未执行）

- B01：`pnpm exec vitest run scripts/verify-css-variables.test.ts packages/ui/src/tabs`；`pnpm verify:css-variables`；隔离后 `css-variables-tabs.spec.ts`；I 阶段 `verify:tailwind-b2` / `verify:tokens`。
- B02：`pnpm exec vitest run packages/layouts/src/workspace-state.test.ts packages/layouts/src/workspace.test.tsx`，并纳入已有 `workspace-states.test.tsx` 的实际路径；Layouts/Playground typecheck；新增或现有浏览器 workspace fixture。
- B03/B04：`pnpm exec vitest run packages/ui/src/input packages/ui/src/tree`；仅共享 reset helper 真正改变才扩 Checkbox/Radio；隔离后的 `deep-review-input-tree.spec.ts`。
- B05/B06：G5、日期表单、component-assets 三类 unit；隔离后的 `deep-review-focus.spec.ts` 和 G5 目录焦点。
- B07：`pnpm exec vitest run packages/ui/src/button/button.test.tsx packages/ui/src/button/button-text.test.tsx` + 本批真实键盘/form submit matrix。
- B08：`pnpm exec vitest run scripts/rn14-starter.test.ts`；`node scripts/rn14-starter.mjs --export <事先不存在目录>`；`--check <同目录>`。
- B09/C01：Playground shell/component-assets 及 composition 当前与新增范围；C02/C03 按实际改动扩相关角色/语义检查。

## 保护清单和输出隔离提醒

保护所有 B00 原始 dirty 文件，尤其已有 R01–R07 实现、三份示例、68 文件 finite successor、历史 before 快照、pnpm-lock、Manifest身份/来源、Registry来源、所有旧 Human Gate 与已接受批改 Tabs/唯一状态 owner。新修订需新 successor，不改旧 seal 掩盖变化。

根 Playwright 的 testDir 会发现全部 spec。固定历史输出远多于 Tree/Tabs；G01 要覆盖普通 UI、导航、图表及深度审阅新 spec。`questionnaire-reuse.spec.ts` 顶层即写旧 browser/baseline-modules，所以未隔离前连 discovery/list 都有写副作用。Chart observer / x-axis / radar-origin 等同一 run 下既读 before 又写 browser，必须只路由输出。G5 已有 helper；Tabs 现有 env 仅覆盖部分截图；Tag update env 默认关闭；Icon 像素截图为内存读取不应改。

本文件只记录事实与回归缺口，不设置任务 passed、不代填人工接受；没有运行完整 verify 或浏览器。
