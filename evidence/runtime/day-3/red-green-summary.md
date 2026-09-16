# Day 3 Core UI RED → GREEN 摘要

## RED

1. 四组公共 UI 合同先以真实导入运行；在实现模块缺失时测试明确失败。建立最小占位实现后，共 39 项行为断言继续失败，证明测试锁定的是组件语义、状态、Density、追踪属性和组合边界，而不是仅锁定文件存在。
2. 新增 Card `panel / raised` 变体合同后，定向测试 1 项失败，精确指出根节点没有暴露 `data-variant`；实现显式变体后通过。
3. Day 3 Evidence/Benchmark 生命周期的 7 项协调漂移测试先失败，证明旧 evidence 门无法拒绝阶段漂移；补齐独立 lifecycle 锁后通过。
4. 首次根类型检查暴露 Tag/Badge 测试中可空 DOM 查询没有被 TypeScript 收窄；加入明确 guard 后，根与三个 workspace 类型检查全部通过。
5. 首次 Chromium 交互检查把自动生成的错误消息 ID 写死为命名片段，第二次又在 140ms 边框过渡过程中读取到中间色。两处均修正为验证真实 ARIA 关联并等待最终计算样式，没有改变已经正确的组件行为或品牌色合同。

## GREEN

- Button、Input、Tag/Badge、Surface/Card、Core UI 页面与路由定向 Vitest：6 个文件、50 项通过。
- 根 `pnpm typecheck`：Foundations、UI、Playground 与根测试类型检查全部通过。
- Day 3 Chromium：2/2 通过；覆盖 hash 路由与标题焦点、四家族追踪属性、Compact / Default 高度、Loading/Disabled、Input 清除回焦与 Error ARIA 关联、品牌 Focus、可移除 Tag、Card 无常态阴影、Reduced Motion 和全页截图。
- Canonical 截图经人工查看并归档为 `1440 × 2630`、`383329 bytes`、SHA-256 `0fa5022a3d31812ce400c28a154b8fd337c0255e98c29399bb95d192f47bee40`。
- 最终 `pnpm verify`：exit 0；governance / lockfile / workspace / evidence / boundary、根与三个 workspace typecheck、21 个 Vitest 文件共 262 项、三个 workspace build 及 8 项 Chromium E2E 全部通过。

## 独立代码复审回归

### RED

1. 新增 Density 几何、标准 `onChange` 清除、公共类型入口、资产身份与 lineage 合同后，四个定向文件共 34 项中 7 项失败；失败分别指向只改 `data-density`、清除按钮绕过 `onChange`、`registry-candidate` 缺少 Manifest 以及 Tag/Badge 来源漂移。
2. 根类型检查对 `@rain-next/ui` 公共入口报告 17 个 `TS2305/TS2724`，证明 Props、Variant、SurfaceElement 与 Card Parts Props 不能被消费者命名导入。
3. 扩展 Chromium 合同后首先在 `data-asset-identity="registry-candidate"` 精确失败；后续断言锁定 Loading 保宽、Default/Compact Tag 高度、真实 Tab Focus、Enter 移除以及 Danger Hover/Pressed。
4. Foundations 注入 `../../ui/src/index.ts` 的临时工作区证明旧字符串守卫可被相对路径绕过；新增测试把该反向依赖作为真实 boundary 失败条件。

### GREEN

- Button/Input 从 Foundation `densityMetrics` 注入真实 CSS 变量；Provider 内显式覆盖和 standalone Compact 均按 `36/14` 与 `30/10` 几何生效。
- Input 清除通过原生 input event 统一进入 `onChange` / `onValueChange` 路径；受控与非受控测试均通过。
- `@rain-next/ui` 根入口导出全部公共 Props/Variant 类型；Loading spinner 改为绝对定位且不改变宽度；可移除 Tag 保持 Default `24px`、Compact `20px`。
- Core UI 现标记为 `local-experiment`，等待 Day 9 候选 Manifest 后再评估 `registry-candidate`；Tag/Badge lineage 与已批准的 VE-001 对齐。
- Chromium 使用真实 Tab 与 Enter 验证 Focus/移除，并覆盖 Danger Hover/Pressed；反向依赖门解析包名与相对 import specifier，不再依赖可绕过的字符串片段。

## 边界

- 本轮仅完成 Task 4；Select、Dialog、Table、Statistic、Layout、Headless 对照和 Benchmark 页面均未启动。
- 资产成熟度仍为 `prototype-ready`，Human Gate 为 `not-evaluated`。
- 未安装新依赖，未写入 Figma，未发布包或 Registry，未迁移业务，未创建 local commit，也未配置 remote。

本文件记录可复核的命令摘要，不替代命令原始输出。
