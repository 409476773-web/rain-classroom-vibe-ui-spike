# R01：实际 CSS 变量消费修复

范围：System Mode；现有共享 Tabs 与 Playground/Prototype 12 处引用维护，不新增全局 Token，不变更成熟度、人工视觉 Gate 或发布状态。依据：用户 2026-10-17 明确要求优先修 R01；审阅报告 R01；根 AGENTS、SPIKE_BRIEF、当前阶段与 Token 选择指南；现有 Tabs 合同/四方向实现。未把静态检查视为主题、对比度或全浏览器通过。

## 根因与改动

- Tabs 分隔线的三处 `--rain-space-1` 没有定义，空 span 实际厚度为 0；改为已有 `--rain-line-thickness-1`。
- 四处文档标题/标签的 `--rain-font-weight-medium` 改为合同内 `--rain-font-weight-semibold`（600）。
- 任务详情的分页位置最小宽度使用局部 `48px`；试卷编辑器显示方式宽度使用局部 `240px`。两者是控件几何，不添加全局 Space 身份。
- Bklit 局部例子的链接用 `--rain-color-text-link`，两处焦点轮廓用 `--rain-color-focus-control`；不新增颜色。

## 失败复现 → 修复验证

1. `node scripts/verify-css-variables.mjs` 首次输出报告中的 5 个名称、12 处未定义引用。
2. `pnpm exec vitest run scripts/verify-css-variables.test.ts` 首轮 2 通过、实际源文件扫描 1 失败，失败内容正是上述 12 处。
3. `tests/e2e/css-variables-tabs.spec.ts` 真正渲染公共 Tabs（最终回归采用普通 imports 的稳定 TSX fixture，由 Vite 统一处理 React 模块图），显式 `showDivider` 与 top/bottom/start/end 四方向；修前 4 个方向厚度均为 0，测试以 expected 1 / received 0 失败。[修前数据](css/tabs-divider-red-facts.json)、[修前画面](css/tabs-divider-red-four-positions.png)。
4. 修改后变量扫描通过：当次 1,697 源文件、13,077 个 Rain 引用；15 项可追溯动态来源。最终扫描为 1,701 源文件、13,099 个 Rain 引用（包含新增组合）；之后增补 1 个 Tabs 指纹变异用例，专属测试 4/4 通过。定义/引用数量随同批文件增补可变化。
5. 同一 Chromium 真实浏览器测试通过，四方向分隔线均为 1px、非透明且位于对应侧；32 档 indicator 仍为 2px；点击另一分区后内容改变而导航盒不变。[数据](css/tabs-divider-facts.json)、[画面](css/tabs-divider-four-positions.png)。截图已实际查看，四种分隔方向可见。

运行条件：本工作树准确锁定依赖；Playwright Chromium；本地 Playground `http://127.0.0.1:5379/`；本次专项复用了主任务服务。正式回归命令是 `pnpm exec playwright test tests/e2e/css-variables-tabs.spec.ts`，运行中临时配置只改服务器地址，已删除。

## 守卫边界与动态来源

新增 `scripts/verify-css-variables.mjs` 扫描 Foundations/UI/Layouts 和两个实际 App 的源 CSS/TS/TSX，排除测试、声明文件与历史 evidence/artifacts。只对 `--rain-*` 存在性负责；原生、第三方 Base UI/Radix、Tailwind、图表及浏览器变量不冒充 Rain 合同。CSS 声明、对象式 inline style 和 literal setProperty 都可成为定义；不使用宽泛前缀白名单，带 fallback 的拼写错误也会失败，嵌套 fallback 同样检查。

动态例外逐个列在脚本，结果见[扫描记录](css/variable-audit.json)：Dialog 的四个 viewport 名称由 `trackViewport` 对 width/height/left/top 的精确生产代码写入并有 CSS fallback；四个现有 Token/组件文件中的有限模板表达式仍由生成器、verify:tokens、Token 合同测试检查域。新模板表达式没有登记即失败。此轻量守卫不证明 CSS 导入闭包、级联作用域、所有 `var(${indirect})` 的动态结果或颜色角色正确，这些由独立消费/构建/浏览器检查负责。

Tabs 原指纹 `7df7c076…` 更新为 `9811e6b7…`，只接受三处 Line 身份修复。新增变异用例会拒绝把分隔线回退成 space-1。Tabs 检查现对当前样式剥离顶层 import 后解析规则，避免 G6 历史规范化把当前修复替换为旧快照；完整 import 清单仍由整体 Tailwind gate 负责。

## 同批集成状态

本分支专项 CSS 变量/当前 Tabs 指纹 4 个测试与 Tabs Token 3 个测试通过。联跑 tabs-governance 的 12 例中 3 例因同批主代理正在修改的 component-asset-page.tsx 与旧 retained-source hash 不同而失败；整体 Tailwind gate 亦被该来源链阻塞，已交主任务在所有改动稳定后统一登记与复测，未删历史证据或放宽通过标准。本记录不单独声称完整治理 gate 已过。

后续集成复核：旧 tabs-governance 的 CSS 变异用例原本读取历史 predecessor，已改为变异修复后的当前 source，保留对无关规则/Focus/颜色越界的拒绝断言。复测 CSS 4/4、Tabs 10/12；其余 2 例因该测试文件自身尚未进入本轮 successor seal 而被 retained-source 检查拒绝，已交统一封存后复测。此时本分支全部源文件停止修改。
