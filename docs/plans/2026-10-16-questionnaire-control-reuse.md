# Questionnaire 选择与输入复用改造计划

> **实施方式：** 使用 executing-plans 按任务实施。本文最初仅获规划授权；2026-10-16 用户随后明确“开始按文档实施改造”，已授权以下本地实现范围。Git 提交及远程操作不在授权内。

**Goal:** 在保留逐题问答行为及已有组件合同的前提下，让 Radio／Checkbox、选择卡片和 Questionnaire 共用选择呈现实现，让单行问答输入共用现有字段基础。

**Architecture:** Questionnaire 保留固定问答引擎与答案登记，专属适配代码放在 `packages/ui/src/questionnaire/`。选择控件共享无状态内部呈现层；输入适配直接消费已有字段外框和原生输入样式，不强接完整 Input 的另一套值管理。业务规则、草稿和提交仍由页面负责。

**Tech Stack:** 当前工作区的 React、TypeScript、Rain Foundations、`@shadcn/react@0.3.1`、Base UI render 接口、Vitest 与 Playwright；不新增或升级依赖。

---

## 1. 状态、工作区与范围

- 日期：2026-10-16。
- 工作区：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2`，分支 `codex/card-v2`。
- 本次交付：计划文档；未修改实现、测试、Manifest、Registry 或阶段状态，未运行接入实验。
- 若随后实施：属于 System Mode，涉及共享组件；需记录此次具体授权，不能借用旧 G6 授权或旧视觉验收。
- 当前工作区有大量既有修改，Input、FormItem 和 Questionnaire 也有未提交内容。实施基线以开始实施时的实际文件为准，不以 Git HEAD 覆盖或还原它们。

用户确定的方向：Questionnaire 负责逐题流程，单选、多选和输入尽量复用已有组件。第一阶段覆盖 Radio／Checkbox、RadioCard／CheckboxCard、单行输入。

不在本批新增：完整 Group 接入、多行题、OptionButton 教学作答、评分、分支编辑器、自动前进、持久化、问答清除／计数工具、新输入类型、新公共尺寸或 Foundation Token。

## 2. 已核实的约束及方案选择

| 当前事实 | 本计划的处理 |
| --- | --- |
| 引擎只对经过 Choice／ChoiceInput／Input 登记的控件维护回答、跳过、快捷键和校验 | 保留这些原语；不以普通 Group 的 FormData 代替答案登记 |
| Radio／Checkbox 公开的是布尔值 `onCheckedChange`；引擎需要真实输入事件 | 不伪造 ChangeEvent，也不在两个状态拥有者之间相互同步；注入引擎自己的 input |
| 普通 Radio 要求 name 非空；引擎跳过时允许 name 缺失 | 普通 Radio 校验不放宽；内部共享呈现层不验证或改写 name |
| Choice 默认根是 label，公开 render／ref 也沿用 label 合同 | 保留唯一 label 及其 ref；不默默改成 div，不嵌套 label |
| Card 的 label 是非空 string，QuestionnaireChoice 的 children 是任意 ReactNode | 共享外壳、选择行和状态外观；保留问答自己的 ChoiceLabel／ChoiceDescription，不解析或字符串化 children |
| Input 的 maxLength 是字符簇限制，size 是控件高度；问答输入保留原生约束与字符宽度 | 本批不直接替换为完整 Input，不改变两套现有公开语义 |
| 现有问答页面已经使用 `value={draft.note} maxLength={120}` | 把原生长度约束兼容作为必测项，不能按“暂时没人用”跳过 |
| 普通 Input 内部保存非受控文本，而原生问答输入依赖 DOM/defaultValue/reset | 保留问答原来的原生重置路径；本批不修改公共 Input 的值／重置行为 |

**本批明确采用：共享内部呈现 + 问答适配。** 这比仅复用圆点／勾选更深入，但不声称完整 RadioGroup 或完整 Input 已经接入问答。完整 Input 接入还涉及长度、尺寸、类型、className、默认值和重置，不以本次去重之名扩大改造。

源码依据：

- `packages/ui/src/radio/radio.tsx:35`、`packages/ui/src/checkbox/checkbox.tsx:45`：输入事件、校验、ref 与现有内部 renderContent。
- `packages/ui/src/selection-card/selection-card.tsx:10`：Card 内容合同；`:47`：Card 复用选择控件。
- `packages/ui/src/input/input.tsx:82`、`:116`、`:185`：内部值、字符限制、真实 input。
- `packages/ui/src/questionnaire/questionnaire.tsx:64`、`:81`：当前 Choice／Input 包装。
- `apps/playground/src/docs/components/g6-feedback-scenario.tsx:177`：真实 maxLength 消费者。
- `packages/ui/node_modules/@shadcn/react/dist/questionnaire/index.d.ts:61`：Choice label/render 合同；`:77`：原生输入类型；`:109`：当前公开原语，没有独立答案注册 hook。
- 引擎运行逻辑以安装包 `dist/questionnaire/index.js` 为准；`.vite/deps` 的展开文件仅帮助阅读，不能成为新的源码事实源。

## 3. 维护边界与文件位置

| 位置 | 责任 | 不承担 |
| --- | --- | --- |
| `radio/radio.tsx`、`checkbox/checkbox.tsx` | 原控件校验、事件、受控／默认值、ref、reset；调用共享呈现 | 问答步骤、skip、答案登记 |
| 新 `selection-control/selection-control.tsx` | 无状态 label、指示器、标准内容与输入位置 | 选中状态存储、原生事件替换、业务 name、reset |
| 新 `selection-card/selection-card.parts.tsx` | 现有 Card 外壳、富内容和独立 actions 区 | 另一套选择行为、问答流程 |
| 新 `questionnaire/questionnaire-choice-adapter.tsx` | 把引擎 Choice／ChoiceInput 与共享选择呈现连接 | 另建选中值、Group 状态或隐藏镜像 input |
| 新 `questionnaire/questionnaire-input-adapter.tsx` | 引擎原生 input + 现有字段配方；状态到外观的映射 | 文本值存储、重置补偿、清除／计数、业务校验 |
| `questionnaire/questionnaire.tsx` | 公开 Parts、recipe 解析、流程原语、调用适配器 | 复制选项／字段外观 |
| 页面 | 题目、条件定义、业务校验消息、草稿、提交、结果 | 控件内部键盘或答案登记实现 |

依赖只向下：Questionnaire → 内部共享呈现／现有样式；Radio／Checkbox／Card → 同一内部共享呈现。共享文件不得导入 Questionnaire。

两个适配文件直接从固定包导入 Primitive，不反向导入 `questionnaire.tsx`；Recipe 在公开包装层解析后传入，避免循环依赖和重复 Context。

### 3.1 选择呈现的内部接口

下面是计划中的接口草图，仅在包内部使用，不从 `packages/ui/src/index.ts` 导出：

```tsx
type SelectionVisualState =
  | { kind: "radio"; checked: boolean; disabled: boolean; invalid?: boolean }
  | { kind: "checkbox"; checked: boolean; disabled: boolean;
      indeterminate?: boolean; invalid?: boolean };

type SelectionControlSurfaceProps = {
  state: SelectionVisualState;
  input: React.ReactElement;
  children: React.ReactNode;
  trailing?: React.ReactNode;
  labelProps?: Omit<React.ComponentPropsWithRef<"label">, "children">;
  indicatorClassName?: string;
  renderLabel?: (props: React.ComponentPropsWithRef<"label">) => React.ReactElement;
};
```

具体合同：

1. input 必须最终产生唯一真实 input，保持为 label 的直接 DOM 子级。Surface 不 clone input，不改写 input 的 ref、name、checked、type、required、value、事件或 ARIA。
2. 普通 Radio／Checkbox 仍在原文件创建原生 input，保留原事件处理。问答则传入 Primitive.ChoiceInput。
3. Surface 只读取 state 输出外观和状态属性，不调用 useState、不注册表单重置。
4. `renderLabel` 只替换同一个 label 的呈现，供问答组合卡片外观；不得再套一层 label，也不能把引擎输入 ref 接到 label。
5. labelProps 中显式的 ref、className、style、data-slot、ARIA 和事件必须保留，合并共享根类时不能覆盖调用方合同。
6. 标准标题／说明可在同文件内提取小函数；现有 RadioControl／CheckboxControl.renderContent 接口保留，Card 和 SegmentedControl 继续使用。
7. RadioIndicator／CheckboxIndicator 一并移入本文件，原模块保留内部转导出；避免 Surface 与 Radio／Checkbox 循环导入，也保留 DropdownMenu 的现有引用。

### 3.2 选择卡片与 Choice 的连接

- `selection-card.parts.tsx` 提取现有外壳和 CardContent；原 Card 继续使用 div 外壳、内层选择 label、label 外的 actions，布局与可访问名称不变。
- 内部 CardSurface 只支持本次实际需要的 div／label 两种根，分别校验 ref 类型，不扩成通用多态框架。
- Questionnaire 的 `Primitive.Choice.render` 默认使用共享 Surface，最终可见根仍为 **label**。通过内部 `renderLabel` 使用 CardSurface 的 label 形态；外壳与选择行合并为同一个 label，不能把公开 className／recipe 移到额外 div。
- 共享卡片 CSS 同时支持原来的“卡片 div → 选择 label → input”和问答的“卡片 label → input”。扩展结构选择器，复用同一组状态颜色／边框声明，不复制一套数值。
- 问答保留 ChoiceLabel、ChoiceDescription 和快捷键尾部区域；不把 children 改成 Card 的 string label，不新增 leadingVisual／actions 等问答 API。
- 用户自定义 Choice.render 时保留原 render 参数、状态和 label ref 合同，不无条件覆盖。其内容仍使用唯一 ChoiceInput。
- 共享后，问答的普通选项表面默认采用现有选择卡片规范；保留问答的快捷键位置和最小触达范围。具体间距、圆角和背景差异须出前后对照，不能把行为测试通过当作新视觉验收。

### 3.3 单行输入适配

- 继续使用 `Primitive.Input`；默认 render 只创建一个真实 input。
- 现有 `data-slot="input-wrapper"` div 作为字段框，消费 `fieldFrameRecipe` 和既有尺寸配方；真实 input 消费 `inputControlClassName`。
- 字段框显式提供共享样式依赖的 `rain-input` 类、data-appearance/status/permission/size/state。当前共享焦点和强制颜色选择器依赖直接子级 `data-slot="control"`，而问答须保留 `data-slot="input"`；在既有 `.rain-field-frame`／`.rain-input` 作用域内，将相应原生控制选择器扩为 `:is([data-slot="control"], input[data-slot="input"])`，共用同一声明，不复制第二套焦点颜色或把问答 slot 改掉。普通 Input／Select／Textarea 的原匹配路径必须保持。
- 强制颜色下的 placeholder 也纳入上述匹配，禁用时外框明确有 `data-state="disabled"`。触达高度不能只加在 wrapper：真实 input 必须覆盖字段可用高度，保住现有窄屏至少 44px 的有效点击范围；浏览器点击上下留白验证聚焦，不能只测外框 boundingBox。
- 引擎状态只映射为外观：invalid → error；disabled／readOnly → 对应字段权限外观。引擎仍决定答案是否有效、是否纳入本题。
- 原生 name、form、ref、value/defaultValue、onChange/onInput、onKeyDown、组合事件、ARIA、required 和约束原样落到真实 input。
- 特别保留引擎的 `form=""` 与缺失 name，它们用于排除未被选为答案的自由输入；禁止改成最近的 form 或补一个隐藏字段。
- 保留全部 QuestionnaireInputType，包括本批未重点展示的 number/date/password 等；保留原生 size、maxLength、minLength、pattern、min/max/step 语义。
- 调用方 className/style 和现有 recipe.input 继续作用真实 input。外框修改通过新增 recipe 的 input-wrapper Part，不能静默迁移 input Part。
- 自定义 Input.render 时继续使用原生 render 合同，适配器不得再制造另一个 input、改写 ref 或抢先处理事件。
- 不消费外部 FormItemContext 来覆盖问答的 required/disabled/invalid；不重复输出题目标题或错误消息。
- 本批不默认增加 clearable、showCount、前后缀或 onPressEnter；普通 Input 的这些能力保持原状。
- 本批不修改 `input.tsx` 的值／reset，也不泛化 `use-default-reset.ts`。若基线暴露引擎既有 reset 问题，独立记录，不在外观适配器中补状态机。

## 4. 公共接口影响

| 公共入口 | 计划变更 |
| --- | --- |
| Radio／Checkbox | Props、回调、name 约束、ref、默认值、半选和公开导出不变；内部提取呈现 |
| RadioGroup／CheckboxGroup | 不改 API 或状态职责；现有 renderOption 路线不变 |
| RadioCard／CheckboxCard 及已有四个 recipe | 不改 Props、内容插槽、actions 或 input ref；内部提取外壳／内容 |
| Input／FormItem | 不增加 Props，不改变 size/maxLength/defaultValue/reset 合同 |
| QuestionnaireChoice | Props、ReactNode children、render/state、label ref、className/style/localRecipe 的节点归属不变 |
| QuestionnaireInput | 原生输入 Props、类型、render、真实 input ref、className/style 和 recipe.input 不变 |
| QuestionnairePart／QuestionnaireRecipe | **唯一计划新增公共合同：`"input-wrapper"` Part**，用于已存在字段框的局部配方；原有 Part 保留 |
| 根导出与包依赖 | 不导出内部 Surface／Adapter；不增加依赖，不新增 questionnaireMode/renderInput 公共开关 |

新增 Part 需同步类型、Manifest anatomy/parts、README 和局部配方隔离验证；它是向后兼容的可选能力。普通消费者不需要迁移调用代码。问答新外框的视觉局改仍需对照验证，不能把“类型兼容”等同于任意旧 CSS 都得到相同画面。

## 5. 分步实施任务（原计划）

### Task 1：冻结行为与公共合同基线

**读取／记录：** 当前 Git 状态、上述组件与消费者实际字节；保存到本轮独立 evidence 目录，保留未提交修改。记录当前限定测试结果，不能把旧结果写为本次通过。

**测试文件：**

- 原有 `packages/ui/src/{radio,checkbox,selection-card,input,questionnaire}/*.test.tsx`。
- 原有 `apps/playground/src/docs/components/g6-conversation-pages.test.tsx`。
- 新 `packages/ui/src/questionnaire/questionnaire-reuse.test.tsx`。

步骤：

1. 先运行现有相关测试，记录已有失败和退出码。
2. 在新测试中补行为基线：唯一 input、label/ref、原生 size/maxLength、自由输入互斥、skip 后回选、reset 的关联／脱离表单两种情况。
3. 保留一组直接使用原始 Primitive 的对照夹具，与 Rain 包装走同样操作，比较 DOM 值、FormData、status 和焦点；不复制第三份问答引擎。
4. 受控更新和默认值是分开的测试路径；记录原生基线事实，不预设所有未选旧文本都应清空。
5. 在实施授权记录中登记有限文件范围；本次纯计划不新增该记录。

退出条件：有当前基线，既有失败与新需求缺口可区分；没有覆盖用户已有代码。

### Task 2：提取选择控件内部呈现

**Create:** `packages/ui/src/selection-control/selection-control.tsx`。

**Modify:** `packages/ui/src/radio/radio.tsx`、`packages/ui/src/checkbox/checkbox.tsx`。

**Test:** 原 Radio／Checkbox 测试；补必要取消事件、半选、input ref 和 DOM 邻接断言。

步骤：

1. 将指示器与重复 label／内容呈现提取到共享文件，原路径保留 Indicator 转导出。
2. 原控件继续创建 input，保留全部验证和 handler；替换呈现调用。
3. 跑原控件与 Group 测试，检查导出、受控回调次数、禁用、半选、reset 与即时 FormData。
4. 检查 DropdownMenu 和 SegmentedControl 的现有测试，确保内部消费者未因移动文件变化。

退出条件：普通控件行为与画面无预期变更；新增共享文件不反向导入行为组件或 Questionnaire。

### Task 3：提取 Card 呈现并接入问答选择题

**Create:** `packages/ui/src/selection-card/selection-card.parts.tsx`、`packages/ui/src/questionnaire/questionnaire-choice-adapter.tsx`。

**Modify:** `packages/ui/src/selection-card/selection-card.tsx`、`packages/ui/src/questionnaire/questionnaire.tsx`、`packages/ui/src/questionnaire/questionnaire.css`、`packages/ui/src/styles.css` 中精确的选择卡片规则。

**Test:** Card 测试、问答复用测试、现有问答测试。

步骤：

1. 提取 Card 外壳／内容，先保持普通 Card 完全不变并通过现有测试。
2. 添加针对新适配的失败测试：完整共享选择行、唯一 input／label、相同 ref 语义、问答选中和快捷键状态。
3. 接入 ChoiceAdapter，原始 checked/onChange/name/required/ref 继续由引擎拥有。
4. 删除 Questionnaire 重复的指示器着色、卡片表面与焦点外观；仅保留问答布局、快捷键和触达范围规则。
5. 测试单选／多选、选择＋自由输入、disabled、invalid、skip、回改、默认／受控 reset；检查自定义 render 与局部 recipe。

退出条件：同一操作不会通知两次或产生两个值；Card actions 仍独立；问答需要的差异有明确适配位置。

### Task 4：接入原生单行输入的共享字段呈现

**Create:** `packages/ui/src/questionnaire/questionnaire-input-adapter.tsx`。

**Modify:** `packages/ui/src/questionnaire/questionnaire.tsx`、`packages/ui/src/questionnaire/questionnaire.css`、`packages/ui/src/styles.css` 中共享字段焦点／强制颜色的精确控制节点选择器。

**Read/reuse without behavior edits:** `packages/ui/src/input/input.styles.ts`、`packages/ui/src/field/field.styles.ts`；普通 `input.tsx` 和 `use-default-reset.ts` 不改。

**Test:** 问答复用测试、原问答测试、现有 Input／FormItem 测试；共享字段选择器调整同时回归 Select／Textarea 的焦点及强制颜色。

步骤：

1. 为输入外框映射和新 input-wrapper Part 写失败测试；先保留原生语义基线。
2. 用现有字段配方替换重复外观，保留唯一 Primitive.Input 及全部原生属性。
3. 验证 size=20 仍为原生字符宽度，不误作高度；maxLength=120 不增加计数、不改为字符簇截断。
4. 与原始 Primitive 对照六类 reset 场景：当前文本答案、改选 radio 后旧文本、默认文本后改选、skip 后、取消 reset、宿主受控 reset。
5. 验证 ref、className/style、render、IME、readOnly、错误、原生类型和 localRecipe 隔离；移除只用于旧输入外观的 CSS。

退出条件：文本值、提交数据和流程与原生对照一致；普通 Input 的编辑／清除／计数逻辑未发生改动。

### Task 5：同步合同、交付依赖与有限治理记录

**Modify:**

- `manifests/ui/{radio,checkbox,radio-card,checkbox-card,questionnaire}.yaml`：准确描述内部复用、依赖及新增 Part；不改旧验收结论。
- `registry/radio.json`、`registry/checkbox.json`、`registry/selection-cards.json`、`registry/g6-assets.json`、`registry/dropdown-family.json`：补全内部共享文件、输入样式／field 依赖及其实际传递依赖。DropdownMenu 当前直接打包 Radio／Checkbox 文件，保留 Indicator 转导出后也必须获得新增文件。
- `packages/ui/src/questionnaire/README.md`：使用边界、原生属性、input-wrapper 配方、哪些是共享呈现。
- `manifests/contracts/tailwind-b2.yaml`：仅为新增共享／适配源补精确扫描与样式合同，不能加入宽泛白名单。
- 新 `docs/adr/0013-questionnaire-control-reuse.md`（执行时先核对编号是否仍空闲）：记录此处已评审的分层决策。

步骤：

1. 按实际导入闭包更新 Registry。仅在主仓能运行不算完成，特别检查 shared Surface、Indicator 图标、input.styles、field.styles 和 CSS。
2. 新内部文件不能从 `packages/ui/src/index.ts` 意外导出；给公开类型增加编译夹具，验证旧调用仍可编译。
3. 新增本轮有限范围的状态／源绑定记录；若现有 G6 等校验锁定旧文件字节，沿已有增量机制增加本轮后继记录，不重写旧 baseline/source-lock 或旧验收。
4. 必要治理接点为 `scripts/verification-helpers.mjs`、`scripts/g6-governance.mjs`、`scripts/verify-g6-components.mjs` 及相关测试；仅在真实绑定检查需要时调整，并验证范围外篡改仍被拒绝。不得通过更新所有旧 hash 或删除断言“通过”。
5. 在独立临时 consumer 中按 Registry 闭包安装／复制此次资产，用项目已有类型检查和构建工具验证独立消费，至少覆盖问答、普通 Card 和 DropdownMenu 的最小入口；不修改任何历史 consumer。

退出条件：源、Manifest、Registry 和有限治理范围一致；旧事实与本次结果分开记录。

### Task 6：浏览器回归、独立审阅与交付

**Create:** `tests/e2e/questionnaire-reuse.spec.ts`、`tests/e2e/questionnaire-reuse.config.ts`。

**Reuse:** 原 `radio.spec.ts`、`checkbox.spec.ts`、`selection-cards.spec.ts`、`input.spec.ts`；其证据路径环境变量指向新目录。

步骤：

1. 配置只启动本次 Playground 服务，输出到 `evidence/runtime/questionnaire-reuse-2026-10-16/`；不使用固定写旧 G6 证据的配置。
2. 原 `g6-components.spec.ts` 有固定旧输出目录，不直接整份重跑覆盖旧证据；在专项 spec 覆盖其中与问答有关的条件题／恢复／提交失败场景。
3. 在普通组件和问答并排场景检查鼠标、键盘、焦点、错误、禁用、长文本、44px 问答触达范围、390px 与桌面、两种密度、明暗主题和强制颜色。
4. 对普通组件预期无视觉变化；对问答列出共享后的明确视觉差异并交用户查看，不自动继承旧视觉验收。
5. 独立审阅重点为状态归属、DOM/ref、原生约束、自定义 render、依赖闭包和有限治理记录。
6. 交付列出通过、失败和未验证项；发现范围外既有失败单独记录，不扩大修复或降低检查。

## 6. 验证矩阵与通过标准

| 类别 | 必测行为 | 通过标准 |
| --- | --- | --- |
| 普通选择 | Radio 重复点击、Checkbox 切换／半选、受控回调、取消事件、禁用 | 与原测试／基线一致；一次操作至多一次值通知 |
| Group | name 隔离、renderOption、required、defaultValue 更新、外部 form、reset 取消 | 无调用迁移；即时 FormData 与最终 UI 一致 |
| Card | 整行选择、长内容、四个 recipe、独立 actions、input ref | 单一输入；actions 不触发选择／意外提交 |
| 问答选择 | 单选互斥、多选、自由输入替代、disabled 选项、跳过后回选原项 | status／值／FormData 一致；跳过无答案字段 |
| 输入兼容 | size、maxLength、pattern、min/max/step、全部原生类型 | 与原始 Primitive 相同；不引入 Input 的新语义 |
| 输入事件 | 输入、清空、粘贴、中文组合、onChange/onInput、ref | 不丢事件、不重复派发；ref 指向真实 input |
| reset | 默认／受控、字段当前是否参与 form、取消、宿主更新 | 与原始 Primitive 对照一致；不额外清空脱离 form 的文本 |
| 流程 | 前进／返回、必答阻挡、可选 skip、末题 skip 提交、条件题、恢复、失败重试 | 路径与数据保留不变；只有成功路径触发应有提交 |
| 键盘 | Tab、Space、原生方向键、字母／数字、Enter、Ctrl/Meta+Enter、IME Enter | 选择不自动前进；文本不丢字；错误焦点与新题焦点正确 |
| 自定义接缝 | Choice label ref、Input input ref、render、className/style、Recipe | 原节点归属不变；兄弟实例不受局改影响 |
| 语义 | 一项一个 input、一个标签、fieldset/legend、Error alert、名称／说明关联 | 无嵌套 label、隐藏镜像 input 或重复播报 |
| 交付 | 导出、Registry 闭包、Token 扫描、独立 consumer | 主仓和独立消费者都可类型检查／构建 |

额外关注：真实中文输入法、Safari、屏幕阅读器和物理触控的结果单独记录。合成事件、Chromium 自动化或静态检查不能替代这些验证，也不能推导发布或生产采用。

## 7. 已有命令与未来执行顺序

全部从当前 card-v2 工作区根执行。以下是计划命令，**本次没有运行**。

基础及专项单元测试：

```sh
pnpm exec vitest run packages/ui/src/radio/radio.test.tsx packages/ui/src/checkbox/checkbox.test.tsx packages/ui/src/selection-card/selection-card.test.tsx packages/ui/src/input/input.test.tsx packages/ui/src/input/input-field.test.tsx packages/ui/src/questionnaire/questionnaire.test.tsx apps/playground/src/docs/components/g6-conversation-pages.test.tsx
pnpm exec vitest run packages/ui/src/questionnaire/questionnaire-reuse.test.tsx
pnpm exec vitest run packages/ui/src/dropdown-menu packages/ui/src/navigation
pnpm exec vitest run packages/ui/src/input packages/ui/src/select packages/ui/src/textarea
pnpm --filter @rain-next/ui typecheck
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/playground build
```

第二条需在新测试创建后执行。每项新增适配先确认对应测试在旧实现上暴露缺口，再实现并复测；纯提取阶段沿用有行为意义的既有测试，不增加只镜像实现的测试。

合同与源验证：

```sh
pnpm exec vitest run scripts/radio-governance.test.ts scripts/checkbox-governance.test.ts scripts/selection-cards-governance.test.ts scripts/input-governance.test.ts scripts/g6-governance.test.ts scripts/g6-color-consumers.test.ts scripts/input-color-consumers.test.ts scripts/select-color-consumers.test.ts
node scripts/verify-g6-components.mjs
pnpm verify:boundaries
pnpm verify:tailwind-b2
pnpm verify:tokens
```

浏览器专项（新配置创建后）：

```sh
pnpm exec playwright test --config tests/e2e/questionnaire-reuse.config.ts
```

新配置必须将 `RAIN_RADIO_EVIDENCE_DIR`、`RAIN_CHECKBOX_EVIDENCE_DIR`、`RAIN_SELECTION_CARDS_EVIDENCE_DIR`、`RAIN_CLOSURE_EVIDENCE_DIR` 指向本轮子目录；Playwright output/report 也使用本轮目录。端口使用未占用的明确端口并开启 strictPort，不停止或借用无关服务。

完成共享组件变更后运行一次 `pnpm typecheck`、`pnpm test`、`pnpm build` 作为影响范围更大的检查。成功只报告实际运行结果；若与基线相比有无关失败，记录其边界与证据，不将其隐去。后续只因新改动、失败或未解决风险重跑。

## 8. 完成条件与停止条件

本批实施完成需要：相关既有行为与新增接入测试通过；公共接口仅增加 input-wrapper Part；无第二答案存储；普通组件无预期视觉变化；问答视觉差异被明确呈现；源依赖可独立消费；新的结果不覆盖旧事实。

遇到以下情况应回到计划评审，而不是默默扩大范围：必须修改引擎或升级依赖；必须改变 Choice 的 label ref；必须改变 Input 的原生类型／约束；完整 Group 或多行题变成必要需求；治理修订无法限制在本次文件范围；原始 Primitive 本身的缺陷成为任务阻塞。

当前状态：**本地实现及专项验证完成，当前 Questionnaire 呈现已获限定视觉确认；整体 Gate、对比度与真实设备检查仍独立保留，全库检查存在范围外失败。** 实施授权与独立状态见 `status/current-phase.yaml` 的 `componentRefinements.questionnaireControlReuse`；结果及未验证项见 `evidence/runtime/questionnaire-reuse-2026-10-16/verification.md`，当前页面确认见同目录 `current-view-acceptance.md`。Git、Figma、发布和业务迁移未由本轮实施授权。

## 9. 实施补记

- 共享选择层、卡片 parts、两项 Questionnaire 适配器已接入；Input 仍保留原生约束与 reset，公共接口仅增加 input-wrapper Part。
- 独立审阅与实际渲染检查补充了四处兼容修复：ReactElement render 的取消／undefined 属性合并；可用 Choice 的 data-disabled 缺失语义；自定义 label 的共享卡片类；已选 invalid 卡片的错误边框优先级。均保留了先失败、修复后通过的证据。
- 新增内部 `questionnaire-render.tsx` 保留固定引擎的 render 合同；它只处理呈现接缝，不增加答案、输入值或 reset 状态。
- 旧全局颜色台账需要识别扩展后的选择器，因此新增有限、必须经当前源码绑定验证的 CSS 后继入口；旧证据、旧 hash 与本轮之前的失败单独保留。
- 新结果、前后截图、独立 Registry 消费者和验证日志均放在本轮 evidence 目录；问答新视觉及对比度仍待独立接受。
- 用户随后回复“确定”，当前 Questionnaire 呈现的视觉确认已单独记录；对比度待审和整体 Gate 不由此自动关闭。
