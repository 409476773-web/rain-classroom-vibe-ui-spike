# Codex 首批任务书 V2｜Card 替换与接入验证

## 0. 身份与任务

你在 Rain Next 项目中执行“Card 采用 shadcn 基线适配”的限定批次。目标是让它比现有 Card 更容易组合、调整留白、安排媒体和操作，同时保留 Rain 品牌、正确语义与现有消费入口。

用户当前要求是继续审阅和重写计划；本包没有自动实施授权。以下 A 默认只读；明确收到“按 V2 开始实施 Card”或等价指令后，A 核对完成即在同一授权范围执行 B，不反复要求同一确认。没有取得实施授权时停留在 A 报告，不能因为有任务书就改代码。

参考仓库 `409476773-web/rain-classroom-vibe-ui-spike`，参考 Commit `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。版本可能变化；永远以实际工作区为准，不能回退或清理用户修改。

## A. 只读预检：收敛到 Card，不重做全库调研

### A1．确认工作区与当前约束

先执行等价只读检查：

```sh
git status --short
git rev-parse HEAD
git diff --stat
```

阅读：AGENTS.md、README.md、SPIKE_BRIEF.md、status/current-phase.yaml 的当前及相关增量记录；之后仅加载 Card、样式桥接和当前任务的相关材料。

旧阶段中“禁止新组件”等字段不能被忽略；新用户授权如扩大范围，明确记录新范围和来源，不能改写历史授权。全局 Token、字体、Focus 和已接受组件默认只读。

### A2．找到全部真实消费者

至少检索运行源码、当前测试、元数据与治理器：

```sh
rg -n '\b(Card|CardHeader|CardTitle|CardDescription|CardAction|CardContent|CardFooter)\b|rain-card|ui-card' packages apps tests manifests registry scripts
rg -n 'Card|rain-card|ui-card' docs AGENTS.md README.md SPIKE_BRIEF.md status
```

首次结果可能含历史快照、归档或大量生成内容；分类后只把运行依赖与当前使用合同纳入迁移。记录命中路径、角色、需要保留的 API、选择器、源码出口、断言及是否需要修改。

已知入口：

- `packages/ui/src/card/card.tsx`；
- `packages/ui/src/styles.css` 中 `.rain-card*`；
- `packages/ui/src/index.ts`；
- `packages/ui/src/surface/surface-card.test.tsx`；
- `apps/playground/src/docs/components/core-ui-page.tsx`；
- `tests/e2e/core-ui.spec.ts`；
- `docs/audits/2026-09-12-core-ui-contracts.md`。

本包确认两处 Core UI 用法，不保证全仓只有两处。不要相信 GitHub 不完整代码搜索返回的零结果。

### A3．复核已有工具，不造第二套

查 `rain-class-names.ts`、`recipes/local-recipe.ts`、Tailwind 主题、扫描范围及治理器。确认：rainCn 的参数只接受当前 RainClassValue 形式；不要把上游 cn 的数组／对象参数未经转换照搬。

确认 Card 类名与旧 CSS 的优先级，尤其是正常 unlayered CSS。确认别的资产有没有使用相同 Card 类或无归属的 slot 选择器。

### A4．固定 Card 上游双文件

首选审阅基线：`shadcn-ui/ui@3ba91b1cc83e1bbe4ab35a422ff2a694849c5048`：

- `apps/v4/registry/bases/base/ui/card.tsx`，Git blob `2062884f29a8044fa48edf86605182eca29f8716`；
- `apps/v4/registry/styles/style-nova.css`，Git blob `514a3e8e00deac2ef59fee04c57cb10fd277ef39`，只采用 Card 相关配方段作为视觉转译参考。

这不是已经下载的安装包。可以核实完整安装产物；也可明确以双文件为源进行 Rain 转译，不要求构建整个上游网站。若获取不到某个生成路径，不无限猜路径，也不把旧 new-york 产物冒充这份基线。

不运行 `init`、`add --all`、`--overwrite`，不安装名为 `cn` 的依赖，不为 Card 更换 Base UI。记录许可来源及本地改动，不移除上游要求保留的声明。

### A5．提交一页准入报告

内容仅包含：实际 HEAD／工作区、真实消费者、保留项、需要改写的样式和选择器、候选默认值、拟写范围、新依赖是否为零、验证命令及已知基线问题。

把结论分为“已确认／建议／未验证”。本地若已有更新的 Card，不机械覆盖，先映射本包要求到最新实现。

## B. 获得首批本地实施授权后执行

### B1．确认最小目标合同

采用 [03](03_Card替换决策与目标合同V2.md) 的默认提案：

- 七部件公开名与 Rain 标记保留；根 article，Title.as 与有效语义保留。
- `variant=panel|raised` 保留，`raised` 不等于额外阴影。
- 新增 `size=default|sm`，省略时 default；Card 自己的 size 不改变内部控件 Density。
- 初始候选 spacing 为 Space/20 和 Space/16；这不是已确认视觉。
- 根 `localRecipe` 沿用既有模型，按部件传递，内嵌 Card 隔离。
- Footer 的强调底色／边界不自动强加给所有卡片；媒体裁切局部处理。

若同等效果可通过更小的现有机制实现，优先复用；不为形式一致增加大模型／大配置层。不得通过删去 ref、原生 aria 或标题级别来简化工作。

### B2．限定可写范围

常规目标（新增路径为提案，先检查是否已存在）：

| 范围 | 允许目的 |
| --- | --- |
| `packages/ui/src/card/**` | 新实现、配方和测试；不是新增独立第二套 Card |
| `packages/ui/src/styles.css` | 只清理／迁移 `.rain-card*` 旧声明；其他组件保持 |
| `packages/ui/src/index.ts` | 保留原导出，新增确有必要的 Card 类型 |
| `manifests/ui/card.yaml`、`registry/card.json` | 按已有格式精确登记，不声称标准在线 Registry |
| 现有 Core UI 消费文件及相关测试 | 迁移当前用法、描述与有效断言 |
| 拟新增 `apps/playground/src/docs/components/card-page.tsx` | 新 Card 与四 Recipe 的候选展示；不是新低代码编辑器 |
| 现有路由／扫描入口 | 只增加新 Card 页面所需路由和扫描 |
| 拟新增 `apps/prototype/**` 或等价现有入口 | 一个最小消费者；不复制整个展示站 |
| 新批次证据与当前阶段增量 | 保存本轮事实，不覆盖旧截图／日志或自动通过 Gate |

只在出现可复现需要时，最小修改 Token 源／生成区／rainCn 冲突组／治理器；列清理由，先建回归，再修改。不要顺便格式化全库或把其他组件挪进新 CSS layer。

全局品牌色、旧组件已接受视觉、字体资源、Classic、生产服务、锁文件大升级均不在常规 Card 范围。

### B3．先做容易失败的测试

先证明下面边界在旧实现下不足或尚无能力；如果旧实现已有能力，不伪造“先失败”：

1. default／sm 和自定义既有 Token 留白在真实浏览器生效。
2. 局部布局类不被旧 Card 声明压制；rainCn 字符串结果与 computed style 分开检查。
3. slot 转译后，有无 Action／Description／Footer 都正确。
4. 内层 Card 的 Footer 不影响外层没有 Footer 的卡片；嵌套局部 Recipe 不泄漏。
5. 原 article、标题、原生属性、ref 与非交互根保持。

### B4．实现并迁移

以锁定上游材料为基线转译；跟踪每项有意不同的决定，不声称与上游逐行相同。移除旧 Card 样式冲突；保留源码入口；将具体已知消费者迁移至新实现。

允许采用小型 Context 传递 Recipe，不允许引入业务状态引擎或递归克隆孩子。对复杂布局使用 Recipe；不要加入 `layout=course|report|dashboard` 等业务开关。

### B5．四 Recipe 和 Playground

交付 CR-01～CR-04。使用虚构教学数据和已存在 Rain 控件、图标；媒体可用有来源且允许使用的本地占位素材，不依赖必须联网才能看到的图片。

新页面最少允许切换：default／sm、当前支持主题、常规／长内容、有无 Header／Footer、媒体上下／左右结构。控制项能用已有 Select／Radio／Button，不为它提前建设更多新控件。

展示默认、当前局部候选和一个非目标对照；不要求每个示例都可交互调任意颜色。代码示例显示实际 Rain 导入与 Recipe，不继续复制原上游默认类。

### B6．验证与证据

检查 package.json 与脚本写入副作用后，再运行适用命令。例如：

```sh
pnpm typecheck
pnpm exec vitest run packages/ui/src/surface/surface-card.test.tsx packages/ui/src/card/card.test.tsx --maxWorkers=2
pnpm build
pnpm exec playwright test tests/e2e/card.spec.ts tests/e2e/core-ui.spec.ts --project=chromium
```

第二、四条包含拟新增文件，先确认实际路径与项目名；不能因为例子里写了路径就认定它已经存在。按风险补治理检查、整批单元和非目标回归，不机械把所有检查都推迟到最后。

不要设置 `RAIN_UPDATE_DAY_3_EVIDENCE=1` 去覆盖历史。浏览器证据写入新批次或 testInfo 输出；其他测试可能写回证据，运行前核对其参数与目录。

缺浏览器或目标字体时标明边界，不伪造通过。允许环境回退只用于技术验证；不把回退字形截图作为目标字体已经验收。

### B7．交付与停点

报告实际 Diff、来源、成功与失败测试、未运行项、四 Recipe、两轮修改与非目标隔离结果、旧使用兼容、可查看入口及需要人看的视觉决定。

Card 技术通过后展示集中视觉对照，不能自动填写 `humanGate=accepted`。若收到后续“继续 Dialog 批次”的明确任务，再执行 RN-05；不要因为 Card 通过就自动安装全 64 项。

## C. 后续交互批次的最小衔接

Dialog 继续复用已有 Button／Input／Select，不换源；主题与密度优先复用现有 Popup 机制。局部 CSS 变量跨 Portal 需要显式验证。FormItem 不自动适配任意新字段，Select 也不自动进入原生 FormData。[R07][R08][R09]

Dialog 本批通过后，优先 Layout、Table／Pagination、Textarea 和 BM-A／B。Card 不需要等后续所有品类完成才开始使用。

## D. 禁止捷径

不为了截图好看删除必要语义；不把 CSS 默认值重新硬编码到每个业务页；不通过 className 改为 `!important`；不一键覆盖 Foundations；不清掉失败日志伪装通过；不把历史 1266 项结果记为本次；不分发字体；不自动 remote push／PR／发布／Figma；不在未经审阅的情况下保留两个公共默认 Card。

<!-- 可核对来源 -->
[R07]: https://github.com/409476773-web/rain-classroom-vibe-ui-spike/blob/321e1a0c1b5f9284e0fcb5167fa059d6174b1752/packages/ui/src/_internal/popup.tsx
[R08]: https://github.com/409476773-web/rain-classroom-vibe-ui-spike/blob/321e1a0c1b5f9284e0fcb5167fa059d6174b1752/packages/ui/src/input/form-item.tsx
[R09]: https://github.com/409476773-web/rain-classroom-vibe-ui-spike/blob/321e1a0c1b5f9284e0fcb5167fa059d6174b1752/manifests/ui/select.yaml
