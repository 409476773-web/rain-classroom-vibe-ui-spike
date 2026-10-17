# R2 · G1 第一轮批注修订

2026-09-28。23 条用户批注已实施，Human Gate 仍为 **pending-G1**。这是 R2 local-experiment 的增量修订；没有改公共组件、全局 Token 或原稿。当前修改前的 10,195 个已有文件哈希保存在 `before-files.json`，相关源码备份在 `source-before/`。

## 可复核入口

- [运行样板](http://127.0.0.1:5198/#navigation-v042)
- [原稿实际展开截图](before-2026-09-28T04-36-27-087Z/reference-expanded-1440.png)
- [原稿实际收起截图](before-2026-09-28T04-36-27-087Z/reference-compact-1440.png)
- [修改前展开 1440](before-2026-09-28T04-36-27-087Z/candidate-expanded-1440.png) · [修改后展开 1440](after-2026-09-28T04-40-16-170Z/candidate-expanded-1440.png)
- [修改前收起 1440](before-2026-09-28T04-36-27-087Z/candidate-compact-1440.png) · [修改后收起 1440](after-2026-09-28T04-40-16-170Z/candidate-compact-1440.png)
- [修改后展开 1200](after-2026-09-28T04-40-16-170Z/candidate-expanded-1200.png) · [修改后收起 1200](after-2026-09-28T04-40-16-170Z/candidate-compact-1200.png)
- [平台 hover](after-2026-09-28T04-40-16-170Z/candidate-platform-hover-1440.png) · [课程 hover](after-2026-09-28T04-40-16-170Z/candidate-context-hover-1440.png) · [学期展开](after-2026-09-28T04-40-16-170Z/candidate-term-open.png)
- [修改前测量](before-2026-09-28T04-36-27-087Z/measurements.json) · [最终测量](after-2026-09-28T04-40-16-170Z/measurements.json)

原稿 SHA-256：`d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。实际通过浏览器展开原稿平台导航，再捕获原尺寸截图；截图/测量使用 Chromium、DPR 1、zh-CN、reduced-motion，浏览器视口 1600×1100，工作画板 1440×800 / 1200×800。早期 `after-…04-39…` 是中间截图，其中头像受到 A1 同名类的 auto margin 影响；最终改为 R2 独立账户头像类，以上链接均指向已修正的 `04-40-16`。

## 逐条落实

| 批注 | 源码中的处理与实测 |
| --- | --- |
| 1 | 平台开合 IconButton 使用既有 28/16 规格，移除原配方强制 icon14 的覆盖；展开按钮右边与 header 右边相齐。 |
| 2 | 展开 header 恢复原稿横排；Logo 居左，40px 标识区，23px 既有 Rain 标志。 |
| 3 | 平台导航文字 15/22、icon15；非选中 hover 用 `fill-neutral-alpha-6`，实测 `rgba(85,112,244,.06)`。 |
| 4 | 平台选中使用 `text-brand-1`，实测 `rgb(15,85,223)`；文字字重600，图标随宿主同色。 |
| 5 | 课程导航标题容器移除灰底，实测透明，承接白色侧栏。 |
| 6 | 学期使用既有 DropdownMenu，真实开合切换 `arrow-down/arrow-up`；文字/图标用 `text-neutral-5`。仅列当前 mock 学期，未新增跨学期服务。 |
| 7 | 直属 Scope 解释文字用 `text-neutral-6`，实测 `rgb(160,172,197)`。 |
| 8 | 路径消费已有 Breadcrumb，保留其13px规格、样式和 `aria-current`，范围切换同步当前项。 |
| 9 | 专业使用已有线性 `graduation-cap`，不重画 SVG、不引入图标依赖。 |
| 10 | 返回入口 gap4、ArrowLeft16。 |
| 11 | 课程导航标题15/22。 |
| 12 | 页标题说明用 `text-neutral-6`；上间距4→2。 |
| 13 | 知识点总览17/24。 |
| 14–16 | 所有直属 Scope 标题15/22；不改 A4 独立样本或嵌套普通 Tabs。 |
| 17–19 | 三项统计统一14/20。 |
| 20 | 主区 padding-top8；R2 shell 与 Scope 轨道映射既有 `background-neutral-3`，实测 `rgb(242,244,255)`。 |
| 21 | 数据面板使用已有线性柱形 `ranking`；课程导航非选中 hover 同样使用6%半透明填充。 |
| 22 | 恢复原稿展开底部关系：左侧头像+林老师/教师工作区，右侧通知/帮助；收起时工具在上、头像在下，姓名隐藏、可访问名称保留。 |
| 23 | 历史入口14/20、icon16，与课程导航同色；图标和文字分别与上方导航对齐，实测两条对齐线偏差均0。 |

尺寸修改应用于所有 R2 宽度，批注视口不是新增断点。原有 ≤1250px 容器规则保持；此规则下 history 与课程导航同时 gap8，其他宽度同时 gap10。Scope 外观覆盖在直属导航处，`@scope` 终止于嵌套 Tabs。

## 实际验证

在 `.worktrees/card-v2` 执行：

```sh
pnpm exec playwright test --config tests/e2e/navigation-v042.config.ts
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/playground build
node scripts/navigation-v042-review.mjs before
node scripts/navigation-v042-review.mjs after
```

结果：7 项浏览器检查通过；类型检查与构建通过，构建保留现有大包体提示。浏览器覆盖范围搜索/199班切换、隐藏恢复、A1指示线、A4手动键盘激活、420px高度弹窗、宽度预算、独立消费编辑器草稿与普通 Tabs 样式隔离，以及本轮学期键盘开合/Escape焦点返回、Breadcrumb 当前项、双画板对齐/Token/字号。捕获无 pageerror。

最初新增测试在字体加载与布局尚未稳定时读到 Logo -1.0625px 偏差；测试改为等待字体就绪及真实对齐稳定，不放宽预期。截图检查还发现账户头像受到已有 A1 同名类影响，已通过 R2 专属类消除并增加左对齐断言。

未在本轮重跑全库单元/全部治理，也未作全量对比度或真实读屏验收；历史 W2 检查不冒充本轮结果。没有独立第二审查者或 G1 自动批准。依赖安装、Classic、Figma、Git写入、push、发布均未执行。

本轮保留 V03/V04/V05/D02 为局部应用记录，没有新的通用设计方法结论。AI消费指南、R2 Manifest、本地 Registry 依赖/哈希和阶段增量记录已同步。

保护复核：[protection-check.json](protection-check.json) 确认修改前10,195个已有文件无缺失，仅7个本轮授权源码/登记/测试文件发生变化；公共组件、全局Token及历史截图保持原哈希。R2 Manifest/Registry 源码、导出与依赖通过既有 `validateAsset` 校验，Registry 来源快照无失效哈希。
