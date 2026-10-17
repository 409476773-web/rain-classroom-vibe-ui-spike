# 日期与时间段优化实施计划

> **执行方式：** 获得实施指令后，使用 `executing-plans` 技能按任务执行；同一会话可用 `subagent-driven-development` 分派互不冲突的任务。当前仅制定计划，不执行组件变更。

**Goal:** 完善作业／考试截止与开放设置，以及同日、跨日时间段的输入、选择、校验、视觉和动效。

**Architecture:** 保留 Calendar / DatePicker 和原公开 Date / DateRange 合同。DatePicker 持有唯一草稿与确认；私有 TimeField 复用 Input / Select；桌面和触屏复用 Popover / Sheet；作业考试逻辑只在本地样板中组合。

**Tech Stack:** 当前 React、TypeScript、Vite、Rain Token、Base UI 1.8.0、DayPicker 9.13.2、Vitest、Playwright。无需新增依赖或更换日期引擎。

---

状态：2026-10-12，计划待评审／未实施。[详细方案](2026-10-12-date-time-optimization-design.md)是本计划的行为合同；D01–D20 指其验收编号。用户本轮授权为方案与计划，不写入阶段的实现授权，不将旧 G5 实施授权扩展到本计划。

## 1. 工作区、范围与记录方式

执行根目录：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`。以下代码路径均相对此根目录；不得回到主仓库实现另一份组件。优先复用此工作区和现有未提交成果，不创建缺少当前 G5 文件的新工作树，不提交、push、发布或写 Figma。

本轮实施证据拟放 `evidence/runtime/date-time-optimization-2026-10-12/`。若实际实施日期不同，使用真实实施日期并统一更新计划引用，不回填不存在的运行记录。

旧 G5 的报告、截图、source-bindings、颜色账本及前态快照不可覆盖。已读到的关键风险：旧 G5 的 E2E spec/config、治理 CLI、独立消费脚本会写死旧证据目录；只改 Playwright `--output` 不能避免其手写截图覆盖。

## 2. 批次与依赖

| 批次 | 任务 | 完成后可审阅的结果 |
| --- | --- | --- |
| A 基线与修正 | T0–T2 | 不误报错误；焦点、当前值语义与时间格式改善 |
| B 核心时间段 | T3–T5 | 起止独立编辑；同日、跨日；快捷日期／时长与统一校验 |
| C 视觉与设备 | T6–T7 | 完整状态、范围预览、触屏面板、动效与键盘 |
| D 业务与交付 | T8–T10 | 作业／考试样板，合同、源码消费和验收包 |

T0 → T1 → T2 → T3 → T4 → T5 为主线；T6与T7在T3状态合同稳定后进行，但修改同一 DatePicker 文件的任务串行。T8依赖核心接口稳定。T9的有限来源与颜色登记从T0启动，最终在T10收口。可以并行准备测试用例／文档，不让多个代理同时修改公共状态逻辑。

每个任务先补能证明目标行为的失败检查，再做最小实现，最后执行相关检查。纯文案／Token映射不编写镜像测试。每批保存可运行检查点及变更摘要，不执行Git提交。

## 3. 文件触达清单

| 层 | 拟修改／新增文件 | 原因 |
| --- | --- | --- |
| DatePicker | `packages/ui/src/date-picker/date-picker.tsx`、`.css`、`.test.tsx` | 状态、输入、端点、快捷项、约束、响应式 |
| 私有时间字段 | 新增 `packages/ui/src/date-picker/date-picker-time-field.tsx`、`.test.tsx` | 两段时分文本＋现有Select建议列表；无公共导出 |
| 最小纯函数 | 新增 `packages/ui/src/date-picker/date-picker.utils.ts`、`.test.ts` | 严格日期／时间解析、组合和时长边界；仅放实际使用的函数 |
| Calendar | `packages/ui/src/calendar/calendar.tsx`、`.css`、`.test.tsx` | 焦点、modifiers预览与状态样式，不复制网格引擎 |
| 文档与样板 | `apps/playground/src/docs/components/g5-component-pages.tsx`、`.css`、`.test.tsx` | 现有四模式、作业样板升级，增加考试与时间段示例 |
| 公开出口 | `packages/ui/src/index.ts` | 仅在新增 DatePickerPreset 类型需要公开时更新；不导出私有部件 |
| 合同与检索 | `manifests/ui/calendar.yaml`、`manifests/ui/date-picker.yaml`、`registry/g5-assets.json`、`docs/ai/g5-components.md`、`docs/ai/asset-index.md` | 实际能力、源码闭包、接入说明与检索同步 |
| 浏览器验证 | 新增 `tests/e2e/date-time-optimization.spec.ts`、`.config.ts` | 新行为和新证据路径；延续旧有效用例 |
| 旧验证输出路由 | `tests/e2e/g5-dates.spec.ts`、`g5-dates.config.ts`、`g5-components.spec.ts`、`g5-components.config.ts` | 在保留旧默认的前提下允许新证据输出目录 |
| 治理兼容 | `scripts/verification-helpers.mjs`、`scripts/verify-g5-components.mjs`、`scripts/verify-g5-consumption.mjs`、`scripts/g5-components-governance.test.ts`、`scripts/g5-color-consumers.mjs`、`scripts/g5-color-consumers.test.ts` | 有限后继来源／颜色证明，CLI输出路由与独立消费 |
| 阶段记录 | `status/current-phase.yaml` | 仅获得实施指令后新增准确范围记录；旧G5与人审状态不改写 |

默认不修改：共享 Input／InputNumber、Popover／Sheet／Select 实现、全局颜色／动效／尺寸 Token、package.json 与锁文件、无关图表和导航。日期样式已随组件导入，不为局部样式改全库 styles.css；如最终闭包确需入口变化，必须有具体消费理由并纳入有限来源记录。

## 4. 逐任务实施

### T0：保护基线与隔离新证据

**文件：** 阶段记录、上述旧验证输出路由／治理文件；新增证据目录中的 `baseline.json`、`source-bindings.json`、`verification.md`。

1. 核对实施指令、当前AGENTS／阶段／本方案；记录工作区、HEAD、相关未提交文件与真实源码摘要，不清理已有文件。
2. 保存本轮相关旧源码和旧证据摘要，建立受限修改清单；只给真实需要变更的路径建立后继关系。
3. 为旧浏览器spec/config和CLI增加一个明确的可选证据输出目录入口；拟统一环境变量为 `RAIN_G5_EVIDENCE_DIR`，旧默认保留。所有写入点均要使用它，读旧历史来源不能被重定向成新历史。
4. 若CLI还需新阶段身份，沿现有后继来源机制补准确上下文，不把输出目录选项误当授权或来源选择。
5. 用临时目录验证路由：运行输出落新目录，旧目录摘要完全不变；加入非法额外路径、旧Gate被改、伪造前态不能通过的治理回归。

**完成标准：** 新输出不覆盖旧G5；范围约束未被放宽；旧历史问题有启动时基线。此任务完成前不执行会写旧路径的E2E／消费CLI。

### T1：修正步骤提示、初始焦点与当前值语义

**文件：** DatePicker TSX/CSS/test、Calendar TSX/test。**验收：D01、D12–D14。**

1. 补失败用例：初次空必填、只选起点不应呈错误色；确定仍不可用；打开聚焦已选日期；入口可访问描述含当前值及原宿主帮助。
2. 将提示分成正常步骤和真正错误，保留即时可确认性判断；不以是否红色作为提交合法性的判断。
3. 通过现有 `initialFocus`／DayPicker支持指定焦点，禁用今天时选首个可用日期；全日期禁用／边界无效／没有可选日时落面板标题或取消操作，补全禁用回归；避免新建遍历所有日期的焦点引擎。
4. 为显示值生成稳定说明ID，合并已有 `aria-describedby`；保留触发器字段名、ref及取消／外点不同焦点返回策略。
5. 运行日期单测及嵌套Popover回归，确认没有无变化回调和父表单误提交。

**关键断言：** `changed` 在选择、取消时为0；确认合法变更为1；入口有当前值描述；正常步骤没有错误标记。

### T2：统一时分文本与严格解析

**文件：** 新增私有TimeField、utils及测试；DatePicker接入。**验收：D02、D03、D13、D20。**

1. 为解析补小而有意义的表格测试：合法09:05／23:59、空分、25:00、12:60、负数、非法粘贴、2026-02-30、2028-02-29。
2. TimeField用两个Rain Input保存原始字符串，不能修改InputNumber或使用其不支持的formatter。Input也不支持`type="time"`，使用文本与numeric inputMode。
3. 明确输入事件：组合输入不解析；Enter只完成当前字段；Blur仅在合法时补零；Up/Down调整有效段并停在边界；不能在输入途中抢光标。
4. 完整HH:mm粘贴作为一个动作更新两段；拒绝静默截断、舍入或“非法→0”；非法文本继续可修复。
5. 将既有数字时间草稿替换成原始文本草稿，并由纯函数派生候选值。date/hour/minute在构造Date后反查，发现浏览器自动归一化日期或时间则拒绝。
6. 时间建议用现有Select，15分钟默认＋23:59，支持5／30；手输不受列表步长限制。沿已有子浮层关闭规则接入。

**解析合同示例（约束实现，不要求逐字照抄）：**

```ts
// 只接受完整的可识别值；empty/incomplete由调用方保留原始文本。
readTime({ hour: "9", minute: "5" })  // { hour: 9, minute: 5 }
readTime({ hour: "9", minute: "" })   // 无完整候选值
readTime({ hour: "25", minute: "0" }) // 错误，不钳制为23
readDate("2026-02-30")                 // 错误，不变为3月
```

**完成标准：** 时分展示一致且可键盘编辑，四种既有模式的已确认值类型不变，其他InputNumber实例字节与行为不变。

### T3：日期输入与起止端点编辑

**文件：** DatePicker、utils、Calendar及对应测试。**验收：D02、D04、D05、D12、D14。**

1. 补失败用例：只改结束日期／时间，开始日期及时分保持；只改开始导致逆序时结束不变；日期改变保留该端时间。秒／毫秒沿既有分钟精度合同：无变化确认不回调；发生有效修改的输出为完整分钟，不新增隐藏精度保留能力。
2. 面板增加日期文本Input与起止标签；聚焦任一端点设置内部编辑意图，不增加公开“端点模式”配置。
3. 日期输入与日历更新同一文本草稿；日历选区从有效日期派生。未知／非法草稿摘要显示待完善，不能回显旧有效值冒充新输入。展示月份独立保存：日期完成且合法后定位，非法／未完成不跳月，手动翻月不被未变化文本拉回；时间未完整不影响合法日期选区，分别补检查。
4. 保留旧新建范围的两点选择、反向按日归正和第三点重新起选；显式端点编辑则只改该端，不自动交换或平移。打开、整段清空、外部值重建时重置意图；补“聚焦结束→清空→连续选两日”及“编辑一端→取消→重开→重新起选”检查。
5. 保留独立Calendar的现有选择行为，避免把DatePicker业务意图带进它的默认契约。
6. 运行所有旧日期行为测试，只有时分输入角色改变的断言按新真实语义更新，不删掉原先覆盖的反向／同日用例。

**完成标准：** 既有用户可以照旧重选范围，也能直接修改单端；取消后完全恢复已确认值。

### T4：同日、跨午夜与持续时长

**文件：** DatePicker、utils及测试。**验收：D06–D10、D20。**

1. 补确定性测试：同日90分钟、零长度、同日逆序、次日2小时、跨月／跨年／闰日、重复点“改为次日”。
2. 同日逆序保留输入并提示；“结束日期改为次日”明确改为起点日历日＋1，保留结束时分。不得用固定86400000毫秒代替日历日推进。
3. 实现按时长设置结束：仅对完整有效起点开放；从30／60／90／120及自定义分钟计算一次完整结束值，跨日标识随结果同步。自定义为空／非法／超限时不可应用且不改结束值；空预设数组只保留自定义入口。
4. 增加最短／最长分钟校验，默认兼容通用旧行为；教学样板设min=1。日期型范围不应用分钟限制。
5. 时段长度用两个有效时间戳相减；非法或不完整时不展示误导性长度；同日／次日／多日格式准确。
6. 验证之后再改起点不会暗移结束，除非用户再次显式应用时长。

**关键断言示例：**

```ts
// 固定测试时区与固定日期，不依赖执行当天。
start = new Date(2026, 9, 20, 23, 0);
end = new Date(2026, 9, 21, 1, 0);
expect((end.getTime() - start.getTime()) / 60000).toBe(120);
// 同日01:00不自动变为次日；显式操作后才得到上面的end。
```

### T5：快捷项、统一边界与错误恢复

**文件：** DatePicker、utils/test、公开类型出口、样板调用。**验收：D01、D11、D15、D19。**

1. 在single/range类型分支分别加入匹配的presets；点击时传入新取得的now，校验返回值为有效Date或完整DateRange。
2. 时间、日期、快捷项、按时长操作进入同一个候选校验入口；选择快捷项不自动确认。
3. `timeStep`只影响建议列表；新数字配置验证有限值／整数／适用模式和min≤max。
4. 增加`excludeDisabled`，默认保持旧全范围不可跨禁用日；false时也不能以禁用日作端点。
5. 对边界当天的建议时间以及不合法时长提供提前禁用／说明；手输非法仍保留原文供改正。
6. 保留通用min/max按日／分钟比较的合同；测试父层约束改变后组件重新校验。本地新建样板在打开、可选分钟边界变化及恢复前台时，将minDate更新为最新now之后的首个完整分钟；外层保存再精确比较最新now，不能以打开时快照代替。用可推进时钟验证10:00:30不能选择10:00、跨分钟后旧候选失效及后台恢复。

**完成标准：** 没有一种快捷入口能绕过手动输入校验；无效候选不回调。

### T6：状态视觉与范围预览

**文件：** Calendar CSS/TSX/test、DatePicker CSS/TSX/test、G5页面CSS。**验收：D04、D11、D16、D17。**

1. 按设计状态表提供可操作对照：今天、单日、双端同日、跨周、跨月、预览、焦点、禁用、非本月、正常未完成、错误。
2. 使用DayPicker已有modifiers与事件计算预览；只增加活跃候选日期，不复制日期网格或用第二套日历引擎。
3. 鼠标／键盘预览即时，离开恢复；冲突候选不能伪装成合法选区，预览不写入已确认值。
4. 对齐起止日期与时分，摘要清楚区分所属端点；长日期／错误换行，清空／取消／确定位置稳定。
5. 所有颜色、边框、字体、圆角、间距由现有Token提供；记录新增消费，不在页面临时硬编码。

**完成标准：** 浅／深主题和两种密度中状态可区分，相关颜色有数值证据；用户视觉接受仍待单独记录。

### T7：触屏形态、键盘与动效

**文件：** DatePicker／Calendar局部源码、私有TimeField、浏览器新spec/config。**验收：D12–D17。**

1. 将面板内容在组件内提取为一份可复用内容，状态留在外壳外；不建设全库浮层适配框架。
2. 打开时按主指针选择Popover或bottom Sheet，打开期间固定壳；桌面单／双月自适应，触屏Sheet首轮固定单月并纵向排列。增加600px粗指针案例，避免44px命中区与双月挤压。
3. Sheet沿已有Body/Footer/安全区，局部高度适配；主要命中区目标44px；键盘出现后活动输入与确定均可达。
4. 保留键盘合理初始焦点、外点焦点、嵌套关闭、文本当前值描述；检查重复实例与表单Enter。
5. 使用140ms反馈、180ms浮层、220ms翻月；复用Sheet已有动效，缺项仅局部补充。范围预览与数据更新即时。
6. 覆盖快速连续操作、中断、减少动态效果；浏览器模拟粗指针只能得出模拟结论，另列实体设备检查。

**完成标准：** 单一浮层实例、草稿不因重排丢失、动画无队列／残留；正常和reduced-motion均可完成任务。

### T8：作业与考试两套本地样板

**文件：** G5页面TSX/CSS/test；新日期浏览器spec。**验收：D06、D08、D10、D15、D18、D20。**

1. 升级已有作业发布样板：立即／定时开放、明确截止时间、准确快捷项、表单关联校验与保存结果。
2. 增加考试样板：完整开放窗口、独立答题分钟数、明确标识的本地关闭策略与结果摘要；不接真实考试数据或服务。
3. 增加同日90分钟、23:00到次日01:00、跨月开放窗口实例；所有实例可修改和取消，不做静态截图占位。
4. 区分面板确定与外层保存；验证失败保留输入。运行样板使用真实时钟与相对日期初值，测试使用固定日期＋可推进时钟夹具保证重放。立即开放保存时要求截止>saveNow；定时开放要求开放≥saveNow且截止>开放；考试要求开放≥saveNow、关闭>开放并满足最短时长。切换立即／定时保留字段草稿，隐藏定时值不参与立即模式保存，切回再校验；覆盖编辑停留期间截止过期的失败恢复。
5. 保留教学数据筛选原有确认合同和四种基本模式；补默认／局部外观／未修改兄弟实例及可复制调用代码。
6. 如实显示时区与分钟精度，样板文字不伪造学校既定规则。
7. 补业务边界检查：saveNow恰为10:00:00和10:00:30时分别验证开放≥now、截止>now；面板为新建任务提供严格晚于now的完整分钟建议。考试演示覆盖开始前／恰好开始／关闭前／恰好关闭，关闭后不能仍允许开始或显示负数剩余时长。

**完成标准：** 可从字段编辑一路走到本地保存与回显；取消与错误恢复同样可演示。

### T9：合同、来源和独立消费收口

**文件：** Manifest、Registry、公开类型、AI文档／索引、治理与颜色文件、后继证据。

1. 描述新props、parts、states、Anatomy、适用场景、取消合同与时区／分钟边界，私有TimeField不成为独立公共资产。
2. Registry补实际新增源码与Input／Select／Sheet等依赖；仅删除确实不再消费的InputNumber依赖。样板答题时长继续使用InputNumber。
3. 来源继续引用当前固定上游版本；自写私有逻辑标明本地改造，不假称全部为上游源码。无需升级DayPicker或安装新库。
4. 新source-bindings必须以旧before→after链衔接，旧source-lock／颜色账本／Gate不重签；修改范围之外仍被拒绝。
5. 更新检索与调用文档，生成AI索引；验证“截止时间”“开放时间”“跨日时间段”可找到真实实现。
6. 使用新证据目录完成源码闭包、类型、构建和浏览器独立消费；若增加公开类型，独立入口一并验证。

**完成标准：** 主工作区与独立消费行为一致；没有通过宽泛白名单、重写旧报告或临时别名掩盖问题。

### T10：最终验证、审阅与交付

1. 执行下节命令与D01–D20；修复本轮新增问题，既有全库失败保持单独记录。
2. 独立审阅状态所有权、端点不交换、边界时间、解析、键盘、浮层关闭和来源闭包。
3. 汇总桌面／窄屏／触屏模拟截图、交互记录、正常／减少动态效果证据、通过／未验表。
4. 为用户提供两套业务样板与核心状态对照，记录其实际审阅范围；不能由自动检查替用户关闭视觉Gate。
5. 后续若用户接受，按精确范围更新新阶段与候选合同；未实测的触屏、VoiceOver、业务时区转换等继续未验。

## 5. 检查命令与预期

以下命令均在执行根目录运行。新增文件路径是本计划产物；`RAIN_G5_EVIDENCE_DIR`是T0要实现的入口，**当前尚不可假设生效**。

### 5.1 单元与相关旧字段

```sh
pnpm exec vitest run packages/ui/src/date-picker/date-picker.utils.test.ts packages/ui/src/date-picker/date-picker-time-field.test.tsx packages/ui/src/date-picker/date-picker.test.tsx packages/ui/src/calendar/calendar.test.tsx apps/playground/src/docs/components/g5-component-pages.test.tsx

pnpm exec vitest run packages/ui/src/input/input.test.tsx packages/ui/src/input/input-field.test.tsx packages/ui/src/input-number/input-number.test.tsx packages/ui/src/popover/popover.test.tsx packages/ui/src/sheet/sheet.test.tsx

pnpm exec vitest run scripts/g5-components-governance.test.ts scripts/g5-color-consumers.test.ts

pnpm typecheck
pnpm --filter @rain-next/playground build
node scripts/asset-index.mjs --check
```

预期：目标行为通过；共享字段未回归；新增接口类型准确；颜色／来源链有效；索引与生成内容一致。初始RED阶段只接受预期目标失败，不能把环境错误当失败测试完成。

### 5.2 浏览器与独立消费

先检查端口归属并确认运行的是本轮构建。可以复用当前工作区5395预览；如启动，使用：

```sh
pnpm --filter @rain-next/playground exec vite preview --host 127.0.0.1 --port 5395 --strictPort
```

端口占用且归属不符时换空闲端口并同步新配置，不终止其他任务进程。T0完成输出路由后：

```sh
RAIN_G5_EVIDENCE_DIR=evidence/runtime/date-time-optimization-2026-10-12/g5-dates pnpm exec playwright test --config tests/e2e/g5-dates.config.ts

RAIN_G5_EVIDENCE_DIR=evidence/runtime/date-time-optimization-2026-10-12/g5-components pnpm exec playwright test --config tests/e2e/g5-components.config.ts

pnpm exec playwright test --config tests/e2e/date-time-optimization.config.ts

RAIN_G5_EVIDENCE_DIR=evidence/runtime/date-time-optimization-2026-10-12/governance node scripts/verify-g5-components.mjs

RAIN_G5_EVIDENCE_DIR=evidence/runtime/date-time-optimization-2026-10-12/consumer node scripts/verify-g5-consumption.mjs
```

预期：所有新文件落在本轮目录；旧G5证据摘要不变；四种模式和新时间段通过；独立源码消费没有仓库私有导入，实际公开源码和样式闭包齐全。

新配置必须包括1440×1000桌面、390×844窄屏、600px粗指针触控模拟、至少一个受支持的WebKit自动化环境、固定Asia/Shanghai时区和跨月／闰日固定时间夹具。增加一个UTC用例检查真实时区标签与本地分钟回显，无需扩展成多时区编辑器。触控模拟与WebKit检查分别标注，不能称为实体手机Safari或VoiceOver通过。

全量构建在最终闭包完成后执行一次 `pnpm -r build`。全库治理只比较基线与新增差额；完整`pnpm verify`包含大量无关历史问题，不作为反复修绿本轮之外范围的理由。

## 6. 人工验收与停止条件

人工任务：设置明天23:59截止；仅延后结束；设置同日90分钟；设置23:00至次日01:00；跨年开放窗口；输入错误并修复；清空后取消；软键盘与旋转；快速切月／关闭；键盘和VoiceOver读取当前值。

停止并保留现场的条件：可能覆盖旧证据；当前工作区与来源不符；需要改全局Token或新增日期引擎才能完成；无法保证取消不提交／错误值不保存；固定时区语义被本机时区冒充。先解决实际问题或报告具体范围差额，不通过放宽校验跳过。

交付物：两份更新后的方案／计划、可操作样板、准确Manifest／Registry／AI入口、独立源码消费证明、有限后继来源与颜色账本、D01–D20验收记录、实际通过和未验清单。

本计划不包含Git提交、发布、Figma写入或生产迁移。实施结束只能按实际证据声明“本地候选完成”；真实业务时区、考试策略和人眼／辅助技术确认分别处理。
