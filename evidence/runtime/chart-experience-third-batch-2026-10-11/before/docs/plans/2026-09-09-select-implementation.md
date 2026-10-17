# Select 与共享字段外观 Implementation Plan

> **For Codex:** 使用 executing-plans、test-driven-development 与 verification-before-completion逐项执行；复用现有测试体系，不由本计划自动创建工作树、提交或并行任务。

**Goal:** 实现普通／搜索×单／多选四套完整Select，并让Input与Select共同消费已验收的三种字段外观。

**Architecture:** 从现有Input提取一份字段外观配方，保留Input编辑逻辑；Select持有值、查询和展开状态，FormItem复用现有上下文。候选内容先集中在Select内部的简单展开区域，后续统一菜单替换；网络请求、表单保存与C场景暂存由调用方管理。

**Tech Stack:** 当前React 19、TypeScript、Tailwind、CVA、rainCn、Vitest／Testing Library与Playwright；不新增依赖。

---

日期：2026-09-09。工作模式：System Mode。状态：**四种Select、共享Input外观及说明页已实现；自动检查与技术复审已执行。颜色发现与真实组件Human Gate仍待闭合。**

执行范围：Select四套能力、Input共享字段外观、FormItem关联、精确Token与来源登记、说明页与验证。2026-09-09记录本次实现指令，保留已通过的示意视觉验收；使用当前工作区，未创建Git基线或修改其他任务的授权。

## 1. 依据、范围与进入条件

- 2026-09-09 家族收敛续批：用户确认保留 SearchInput 作为同一 Input 家族的快捷用法后，再次要求“继续推进”。本次承接[字段设计第2.0节](2026-09-08-input-select-field-recipes-design.md#20-两个组件家族与搜索快捷用法)，实施两个家族的展示入口整理、完整 Input 与三种外观的组合验证，以及兼容审核中的两处 Select 缺陷修正；不改变 SearchInput 调用合同、尺寸默认值或组件 Human Gate。

### 家族收敛续批执行步骤

| 任务 | 最小改动范围 | 验证与完成条件 |
| --- | --- | --- |
| 1. 入口与完整示例 | `apps/playground/src/docs/components/` 下现有 core-ui、input、select 页面及必要样式、页面测试；保留现有组件实现与公开入口 | 总览按 Input、Select 展示两个简短入口；Input 详情中既有完整示例可切换三种外观，SearchInput 明确归入搜索组合；Select 页的 Input 明确为外观对照 |
| 2. Select 组合缺陷 | `packages/ui/src/select/select.tsx`、`select.test.tsx`、`packages/ui/src/styles.css` 与对应精确 CSS 合同 | 先复现动态权限导致焦点回调遗漏和触屏搜索清空区溢出，再做最小修复；保留 Select 自身 44px 触屏操作区和内部 Input 既有几何 |
| 3. 组合验证与记录 | `tests/e2e/input.spec.ts`、`select.spec.ts`、`core-ui.spec.ts`；本计划、字段设计、现有 Manifest 说明与验证记录 | 浏览器检查三种外观的完整附加内容与搜索操作、触屏菜单内搜索、旧 Core UI 剩余交互；针对性单测、类型、构建及治理检查；独立复审后记录真实结果 |

验证命令沿用 `pnpm exec vitest run` 指定上述组件与页面测试、`pnpm typecheck`、`pnpm build`、`pnpm verify:governance`，以及 `pnpm exec playwright test` 指定三个现有浏览器文件。4173 如被其他任务占用，使用临时配置连接本任务 4176 服务，保留原配置；不跳过测试断言。新缺陷测试需先失败后通过，单纯文案调整不增设镜像测试。输入框原有能力已存在的组合检查允许直接通过，不为制造失败而回退功能。

续批状态：限定范围的实现与交叉技术复审完成；已执行的全量单测1087／1087、Input／Select／Core UI浏览器17／17、类型及构建通过。治理早先通过，收尾复跑被同时新增的Tag颜色发现阶段／脚本登记阻断，不能声明最新全仓治理通过；记录见[家族收敛验证](../../evidence/runtime/select/verification.md#家族收敛续批2026-09-09)。触屏回归同时发现清空按钮卸载后被误判为外部点击，已在原有关闭判断处修复。组件整体 Human Gate、颜色发现、正式菜单层和发布保持各自边界。

- [字段设计第8节](2026-09-08-input-select-field-recipes-design.md#8-公共-api-与实现组织2026-09-09)定义本轮API建议；同文第1—7节与最新示意是已确认设计和视觉基准。用户“视觉验收完成。”接受的是最新示意，不重复打开这次视觉评审。
- 第一条“继续推进”承接公共API与实施计划，先完成两份文档。计划交付后，用户再次“继续推进”，本次据此进入上述精确实现范围；此前Input或Tag的授权不用于放行Select。
- 拟实施范围：Select四种能力、Input增加appearance及共享外观接入、FormItem关联、选中项、组件专属几何、Token消费登记、真实说明页与验证。Input的单位色、计数、附加内容与文字编辑规则继续按其[现有设计](2026-09-08-input-design.md)执行。
- 下拉层先简单占位，保留基本选择、键盘、关闭和焦点返回。复杂浮层、碰撞定位、嵌套、虚拟滚动及最终Select／Dialog底层选择留到统一菜单建设。
- 不建设四个平行组件、另一个表单状态库、网络请求层、通用受控状态库或Popup适配框架。自由创建、树／级联、所有C属性行的公共组件不在本批。
- Tag第一批独立推进。实施时已重读其源码和[计划](2026-09-09-tag-batch-one-implementation.md)，确认当前几何不能直接承接已验收选中项，因此采用一个私有SelectedValue，复用其高度事实；Tag源码与本次基线哈希相同。共享文件仅增量修改。
- 当前仓库无可用HEAD，已有大量未跟踪文件。执行时保存本批涉及文件的基线与哈希，不用初始化提交制造基线。Git、发布、业务迁移与Classic写入不在本计划范围。

## 2. 落地后的最小形态

| 部分 | 实施选择 |
| --- | --- |
| 公共入口 | `Select`及其类型；`multiple`、`searchable`互相独立，默认完整普通单选 |
| 公共值 | 单选`string / number / null`，多选只读数组；`onValueChange`沿用Next命名，附实际变更reason和已选资料 |
| 默认显示 | 多选固定摘要；标签换行显式选择，32／36档分别承载24／28高标签，上下各4px留白 |
| 共享外观 | 一份`fieldFrameRecipe`供Input与Select消费；不用Input类名冒充Select，也不复制颜色矩阵 |
| 状态隔离 | 校验色仅作用于字段表面及反馈；候选区域的Input清除外层FormItem上下文，保留自己的普通焦点 |
| 几何 | Select字段高度与Input同档采用明确同源引用；选中项及操作区保留独立Part用途，不建立全局Control Height |
| 下拉占位 | Select文件内一个私有`SelectOptionsPanel`，先内联展开；原生按钮、Input与列表语义，无新依赖 |
| 选中项复用 | Tag已完成且Local Recipe可精确承接时复用；否则用私有SelectedValue小部件，只保留一个运行实现 |
| 样式扩展 | 现有`RainLocalRecipe`与明确Parts；`className`只控制布局，不另建可覆盖任意内部实现的配置系统 |
| 表单保存 | 业务从value提交，FormItem不保存值或执行校验；首轮不加隐藏原生字段或原生constraint validation桥接 |

## Task 1：实施登记、文件基线与最小Token合同

**Files:**

- Create: `packages/foundations/src/select-token-contract.ts`、`packages/foundations/src/select-token-contract.test.ts`
- Create: `scripts/select-governance.test.ts`
- Modify: `packages/foundations/src/index.ts`
- Modify: `scripts/verification-helpers.mjs`、`scripts/verify-boundaries.mjs`、`scripts/verify-tailwind-b2.mjs`及它们已有的相关测试
- Modify: `scripts/token-foundation-outputs.mjs`、`scripts/generate-token-foundations.mjs`
- Modify: `status/current-phase.yaml`、`manifests/contracts/tailwind-b2.yaml`
- Create: `evidence/runtime/select/source-baseline.json`
- Generated only: 既有生成器管理的`tokens.css`、`tailwind-theme.css`、Token类清单、来源合同与受控展示CSS

1. 核对明确实施指令后，添加独立的Select细化记录，范围同时写清Input共享外观接入；保留Input、Tag等已有记录和公共验收状态。当前phase不推进。
2. 保存本批文件的基线、现有运行检查结果及并行修改归属。文件清单精确到本计划实际使用的路径，避免添加整个目录白名单。
3. 先加入缺失Select授权、越界文件、伪造Human Gate及未登记生成入口的拒绝用例；旧Input／Tag授权不能放行Select。
4. 为24／28／32／36建立Select专属高度入口，引用当前Input同用途高度；Type从事实表导出。清空、标签移除操作区为Select Part的24px合同，图标复用Icon/Size/12、/14。选中项高度如复用已落地Tag则直接消费其对应合同；否则只新增Select自己的24／28px选中项事实。
5. 字体、Space、Radius、Line、颜色继续用已有公共身份。B底线与状态Focus使用字段范围的精确CSS规则，不扩充任意单侧线条工具。
6. 运行`pnpm generate:tokens`，检查新增类的静态可达性和同源引用；不手改生成输出或复制一张高度／类名表。

Run:

```sh
pnpm exec vitest run packages/foundations/src/select-token-contract.test.ts scripts/select-governance.test.ts --maxWorkers=2
pnpm generate:tokens
pnpm verify:tokens
pnpm verify:tailwind-b2
```

Expected: 新合同与授权拒绝用例通过。若UI文件尚未创建导致后两项出现预期缺失，逐项记录缺少的计划路径；不得用放宽全局校验消除失败。

## Task 2：共享字段外观与Input接入

**Files:**

- Create: `packages/ui/src/field/field.styles.ts`
- Modify: `packages/ui/src/input/input.styles.ts`、`packages/ui/src/input/input.tsx`、`packages/ui/src/input/input.test.tsx`
- Modify: `packages/ui/src/styles.css`、`packages/ui/src/index.ts`
- Modify: `scripts/token-foundation-outputs.mjs`、`scripts/input-color-consumers.test.ts`、`scripts/verify-token-foundations.mjs`
- Create: `scripts/select-color-consumers.test.ts`
- Modify: `manifests/ui/input.yaml`、`manifests/ui/search-input.yaml`及相关精确登记

1. 先为Input的三种appearance、28／32／36档12px留白、24档8px、Warning／Error同状态Focus与内部清空补回归；保留原编辑、计数和Readonly测试。
2. 将真实共用的配方提取为`fieldFrameRecipe`，包含appearance、size、status与权限；`InputAppearance / SelectAppearance`和status类型引用同一合同。Input原生控制、单位、附加内容和事件保持在原文件。
3. 将Input原来的`inputRootRecipe`调用改为共享配方；Select随后直接消费它，不在另一个文件维护相同颜色和几何条件。
4. Focus只作用在字段frame。正常焦点为品牌色；校验焦点为同状态色；B保留底线无外圈。内部clear、tag-remove等动作仍有自己的可见键盘焦点，Forced Colors按已验收方案处理。
5. 配方提取同步更新消费者的真实filePath、symbol、scope和Parts。共享配方只登记一次源定义，各组件登记自己的实际用途和差异；不留一份未消费但能骗过旧断言的旧配方。
6. 将第5节已知颜色问题作为精确finding记录。来源一致、用途资格、对比度分开报告；不能把placeholder或必要边界改成装饰，也不能以视觉验收代替颜色例外授权。

Run:

```sh
pnpm exec vitest run packages/ui/src/input scripts/input-color-consumers.test.ts scripts/select-color-consumers.test.ts --maxWorkers=2
pnpm generate:tokens
pnpm verify:tokens
```

Expected: Input原功能回归通过，新外观由同一配方提供；已有和新增颜色finding均保留实际状态。若新视觉使旧尺寸断言变化，只更新明确被本稿修订的预期。

## Task 3：Select值与四套完整能力

**Files:**

- Create: `packages/ui/src/select/select.tsx`、`packages/ui/src/select/select.styles.ts`、`packages/ui/src/select/select.utils.ts`
- Create: `packages/ui/src/select/select.test.tsx`
- Modify: `packages/ui/src/index.ts`

1. 按设计第8节写入公开类型，单／多选使用区分联合；四种能力走同一个Select。状态管理沿用Input的简单受控／非受控方式，不新增通用hook框架。
2. 在同一测试文件中先验证标量／数组、null／[]、0／空字符串、字符串1与数字1的区别、重复身份及非法参数。错误来自真实合同失败，不能只检查类名或存在性。
3. 实现必要的纯函数：选项验证与查找、过滤、已选资料合并、值切换和上限判断。使用Map／Set和稳定值身份，查询结果不作为value合法性的完整名册。
4. 回归“已选A，当前候选仅B”：保留A及其资料，不调用值变化；随后选择B得到A、B。受控父级暂不回填时不私自修改UI值，数组不原地修改。
5. 接入独立查询、单选关闭、多选保持打开、清空与移除reason、maxCount、Readonly／Disabled及运行时关闭。相同值不重复通知；清空不解除外部校验。
6. 完成固定摘要、仅数量和标签换行。名称最多显示前两项，变窄后先减少可见名称，剩余数量与总数量分别表述；必要操作不被挤掉。32／36档tags拒绝错误小尺寸组合。
7. 开始选中项实现前重读Tag；若新Tag已可用且能通过Local Recipe承接，直接复用。否则在Select文件中实现最小私有SelectedValue；关闭使用正式close，后续Tag替换保留Select值和焦点规则。

最小行为回归示例（放入同一Select测试文件）：

```tsx
it("keeps a selected value when search replaces the candidates", () => {
  const changed = vi.fn();
  const selected = [{ value: "a", label: "视传 2401" }];
  const { rerender } = render(
    <Select multiple aria-label="教学班" value={["a"]}
      options={selected} selectedOptions={selected} onValueChange={changed} />,
  );
  rerender(
    <Select multiple aria-label="教学班" value={["a"]}
      options={[{ value: "b", label: "视传 2402" }]}
      selectedOptions={selected} onValueChange={changed} />,
  );
  expect(screen.getByRole("button", { name: /教学班/ })).toHaveTextContent("视传 2401");
  expect(changed).not.toHaveBeenCalled();
});
```

Run: `pnpm exec vitest run packages/ui/src/select/select.test.tsx --maxWorkers=2`

Expected: 四种组合、资料缺失与刷新、选择／移除／清空和非法输入用例通过。此处没有网络请求、通用缓存或完整菜单实现。

## Task 4：FormItem、内部搜索与下拉占位

**Files:**

- Modify: `packages/ui/src/select/select.tsx`、`packages/ui/src/select/select.styles.ts`、`packages/ui/src/select/select.test.tsx`
- Modify: `packages/ui/src/input/form-item.tsx`、`packages/ui/src/input/input-field.test.tsx`
- Modify: `manifests/ui/form-item.yaml`及对应实际消费者登记

1. 先添加外层FormItem为Warning／Error／required、内部搜索仍普通且具有独立id的回归；同时验证可访问名称、描述ID合并、Label聚焦和ref.focus。
2. 复用现有`useFormItem`。仅将已有FormItemContext提供给包内Select用于局部null边界；不新增公开Provider，不复制第二份表单context。内部Input不携带外层required、invalid或描述ID。
3. 同一Select文件内集中一个`SelectOptionsPanel`，使用受控显示的内联候选区域。触发按钮携带真实aria-expanded和aria-controls，箭头从同一open状态选择正式arrow-down／arrow-up。
4. 列表活动位置与selected分开。实现方向键、Home／End、禁用项跳过、Enter／Space、搜索ArrowDown进入列表；不要求Ctrl才能维持多选，也不让移动高亮隐式提交。分组只做一层，遵守首次出现与组内顺序，组标题不参与导航和选择，过滤后隐藏空组。
5. 搜索复用普通Input。组字过程用临时草稿呈现，结束后只发一次query更新；Enter不提交外层form，也不触发SearchInput式页面查询。
6. Loading、loadError、空候选和无匹配分别呈现；只有候选区域忙碌，已选值、清空和查询继续按权限工作。外层校验不能染色内部搜索。
7. Escape关闭并返回触发器，单选确认后返回，Tab与外部点击正常转移焦点；整个字段对外的onBlur不能因内部跳转而触发。移除标签后聚焦下一个移除动作、前一个动作或触发器，不掉到body。
8. Readonly保留可复制内容和清晰的键盘位置，不渲染改值动作；Disabled排除所有操作。空候选或全禁用时仍可关闭并返回。

Run:

```sh
pnpm exec vitest run packages/ui/src/select packages/ui/src/input/input-field.test.tsx --maxWorkers=2
pnpm typecheck
```

Expected: 基本语义、焦点、状态隔离与IME用例通过；正式菜单层仍登记为placeholder，不以此宣称公共Popup、读屏完整审核或复杂定位已完成。

## Task 5：真实说明页、来源登记与浏览器验收

**Files:**

- Create: `apps/playground/src/docs/components/select-page.tsx`、`select-page.css`、`select-page.test.tsx`
- Modify: `apps/playground/src/app.tsx`、`apps/playground/src/routes/route-registry.ts`、`apps/playground/src/docs/components/core-ui-page.tsx`
- Modify: `apps/playground/src/docs/components/input-page.tsx`、`input-page.test.tsx`，仅添加appearance对照及修订过的既有说明
- Create: `manifests/ui/select.yaml`、`registry/select.json`
- Create: `tests/e2e/select.spec.ts`
- Modify: `tests/e2e/input.spec.ts`及本批明确影响的既有几何断言
- Modify: `scripts/token-foundation-outputs.mjs`与精确来源／文件登记

1. 新增`#select`入口，示例消费真实公共组件和FormItem。说明页只拥有布局与数据，不复制字段外观CSS；页面中的Input与Select并排对齐。
2. 展示四种能力、三种外观、四档摘要及两档标签换行；覆盖独立／FormItem、Readonly／Disabled／校验、加载失败、空值、长名称与初始远程回填。
3. 用页面自己的小型异步示例证明A慢B快、失败后重试、查询清理和已选资料保留。旧响应不能覆盖结果、loading或error；组件内部没有请求序号、fetch或防抖器。
4. 用受控值展示整表草稿及外部确认的职责，业务保存不进入Select。C正式属性行和菜单中的确认区不在此处扩成一组新公共组件。
5. Registry只记录工作区内可获取的源码及真实依赖；Manifest写明完整Recipe、Parts、值、临时菜单边界与独立验证状态。包与Registry仍未发布。
6. 真实浏览器检查Light／Dark、嵌套Light、两类父面、736／360及320px最小宽度。核对实际色值、焦点细线、12／14px箭头、清空图形、Alpha/4、上下4px和34／38px单行标签实际高度。
7. 联检Input原编辑行为、Select键盘与焦点、标签删除、触屏目标、Forced Colors及表单中Enter不误提交。真实IME和读屏结果单独记录，合成事件不冒充设备验证。

Run:

```sh
pnpm exec vitest run apps/playground/src/docs/components/select-page.test.tsx apps/playground/src/docs/components/input-page.test.tsx --maxWorkers=2
pnpm exec playwright test tests/e2e/select.spec.ts tests/e2e/input.spec.ts
```

Expected: 已验收视觉被真实组件正确承接，四种能力和主要错误路径通过；新展示组合、真实设备及颜色技术核验结果如实记录。

## Task 6：收口、独立审阅与交付

**Files:**

- Create: `evidence/runtime/select/verification.md`、`color-findings.json`及精确列入清单的浏览器证据
- Update: 本计划、字段设计的实施指向、Select／Input／FormItem相关Manifest、工作区Registry与独立状态记录

1. 运行完整质量门一次；已有并行任务导致的无关失败分别归属，不修改无关组件来制造全绿。
2. 按仓库要求做独立规格和代码审阅；若当前会话不允许委派，保留独立审阅待办并交付完整证据，不把自查写成独立通过。
3. 修复本批可操作问题并只复跑受影响检查；对共享字段外观的修复同时检查Input和Select。
4. 分别记录实现、自动检查、颜色用途／对比度、独立审阅与真实组件Human Gate。已通过的示意视觉验收保持accepted，不因实现仍待验收被改回未确认。
5. 打开真实`#select`说明页交付。若尚有必要边界、弱占位资格或其他技术finding，保持对应系统状态未闭合；不能把已知问题标成acceptedException或从报告删除。

Run: `pnpm verify`

Expected: 完整验证与独立审阅按实际结果登记；最终交付能区分已承接视觉、已验证行为和仍待核验项。没有发布、Git或业务迁移操作。

## 3. 最终核对清单

| 项目 | 可判定的通过条件 |
| --- | --- |
| API | 四种最小用法可编译；单／多选类型不串，tags与24／28组合被拒绝 |
| 唯一视觉配方 | Input、Select实际消费同一fieldFrameRecipe；页面与菜单没有第二套字段颜色矩阵 |
| 值 | 当前候选刷新不会丢已选值或已知名称；受控值不被内部提前改写 |
| 状态 | Warning／Error只影响拥有该校验的字段；内部搜索有独立普通状态与id |
| 几何 | 四档摘要、12／14箭头、14图形／24清空区、Alpha/4标签和上下4px与验收稿一致 |
| 输入和焦点 | IME不误确认；Tab不困住；关闭与移除后焦点可预测；外部点击不被抢焦点 |
| 下拉替换 | 一个私有候选区域承担临时UI；没有自建公共Popup依赖，替换不改变值与提交合同 |
| 技术finding | 实际用途和父面得到记录，失败不通过改名、降门槛或推定例外隐藏 |
| 交付状态 | 示意视觉、公共实现、自动检查、独立审阅、真实组件验收分别有证据 |

## 计划核对与实施记录

本轮已完成接口、代码位置、当前依赖与实施顺序核对。设计中的接口草案已通过独立TypeScript编译检查，覆盖四种能力的Props组合、标签尺寸及四类预期类型拒绝；两份文档的表格、章节、计划路径与本地引用检查通过。

上述为计划阶段记录。实施后已保存41份文件基线；Select授权、几何、共享外观和选择行为均经历预期失败与修复后的同项复跑。Tasks 1—5已落地，Task 6的自动验证、独立技术复审和交付证据已完成，颜色与Human Gate保持开放。

完整单测为1066／1066，构建与治理检查通过。全量浏览器121项先通过118项，3处旧Input焦点断言按已确认设计同步后，受影响两份测试共14项全部通过。一键`pnpm verify`在浏览器启动阶段遇到原4173端口被占用；浏览器检查使用同一项目配置的独立4176服务完成，没有终止已有服务或修改项目测试配置。

详细命令、截图、保留的技术发现及发布边界见[运行验证](../../evidence/runtime/select/verification.md)、[颜色记录](../../evidence/runtime/select/color-findings.json)与[独立审阅](../../evidence/runtime/select/independent-review.md)。
