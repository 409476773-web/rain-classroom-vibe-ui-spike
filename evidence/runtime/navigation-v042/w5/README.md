# W3–W5 · G2 候选验证索引

2026-10-01。可运行 [Playground](http://127.0.0.1:5198/?sample=R4#navigation-v042) 与 [独立消费者](http://127.0.0.1:5198/navigation-v042-w3-consumer.html)。包含 A1–A5/C1–C5/W1–W3、九个 R 业务状态、S1–S6；公共导出与复制配方实际运行，不嵌原稿 iframe。

冻结基线 `0.4.2-style.1` SHA256 `d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。基线位于外部 canonical workpack，不属于 Recipe 复制包。三宽度为1200/1440/1600 CSS px×800，Chromium 151.0.7922.34 / macOS darwin25.6 arm64 / DPR1 / zh-CN。源稿真实操作、computed style、双截图和对照数据由 reference/compare 的时间戳子目录保存。

| 检查 | 结果 | 证据/限制 |
|---|---|---|
| W3–W5 focused unit | 87 passed / 9 files | 导航、ConnectedSurface、Workspace pure/adapter、R/S 业务状态 |
| 既有默认兼容 unit | 100 passed / 7 files | Tabs/overflow、Select、Card、Radio、InputField、Layout |
| W3 browser | 7 passed | [final-02](../w3/test-artifacts-final-02/)，旧恢复按钮定位更新后真实操作 |
| W4 browser | 7 passed | [final-10](../w4/test-artifacts-final-10/) |
| W5 browser | 38 passed | [final-10](test-artifacts-final-10/)，27场景×宽度＋11行为/实例隔离检查 |
| 旧 G1 独立消费者 browser | 6 passed | [回归输出](../w4/old-consumer-regression-artifacts/)，不写旧 review 图片 |
| 包类型检查 | 5 packages passed | foundations/ui/layouts/prototype/playground |
| 全仓 typecheck | exit1，未通过 | 既有 command.test.tsx:20 类型及 navigation-v042.spec.ts 的 node:fs 声明错误；文件未改 |
| Playground build | passed | 既有 chunk-size warning 保留 |
| scoped asset validation | 12 assets | [最终 Manifest/Registry 校验](asset-validation.json)，全库 index 因既有 ui-command 无 Registry 未生成 |

58 为独立浏览器用例总数，不把修后 targeted 复跑加为新用例。38 项中包含真实双 R5 原生单选/播放/布局隔离、实例 B 名称/密度/连接方式变更时 A 的 DOM/计算样式/草稿不变、短高菜单、Ribbon、专注恢复及业务身份。失败/诊断轮保留，不以修后的图覆盖原图。

```sh
pnpm exec vitest run packages/ui/src/navigation packages/layouts/src/connected-surface.test.tsx packages/layouts/src/workspace-state.test.ts packages/layouts/src/workspace.test.tsx apps/playground/src/recipes/navigation-v042/r1-r3.test.tsx apps/playground/src/recipes/navigation-v042/workspace-states.test.tsx apps/playground/src/recipes/navigation-v042/r4-r6.test.tsx --reporter=dot
pnpm exec playwright test --config tests/e2e/navigation-v042-w3.config.ts --output evidence/runtime/navigation-v042/w3/test-artifacts-final-02
pnpm exec playwright test --config tests/e2e/navigation-v042-w4.config.ts --output evidence/runtime/navigation-v042/w4/test-artifacts-final
pnpm exec playwright test --config tests/e2e/navigation-v042-w5.config.ts --output evidence/runtime/navigation-v042/w5/test-artifacts-final
pnpm typecheck
pnpm --filter @rain-next/playground build
```

独立只读复核关闭三项 P2：实例原生 Radio name 冲突、批改顺序误用空内容 Tabs、独立复制闭包缺依赖。W3/W5 Registry 各13文件、42图标引用可解析。另 [纯核心独立复核](independent-core-review.json) 关闭四项确定问题；32个对应回归计入87个单元总数，不重复叠加。该作者自己的 adapter/S 不在这份核心审查中；另由未编写 adapter/S 的审查者完成下述独立复核。

Manifest/Registry/知识与两个 repo-local Skill 仅提前准备 W6 候选；E1–E6 未完整执行，未全局安装 Skill。W7 全38行为合同、VoiceOver、完整对比度、多浏览器及 G3 未完成；G2 人工验收 pending，资产 unpublished。阶段、完整差额和最终对照以外部 workpack 的 G2-composition-candidate.md 为准。

最终实际输出：87项 [专项单元](final-14-focused-unit.log)、38项 [W5 browser](final-10-browser.log)、[全仓类型检查的既有失败](final-11-typecheck.log)；修后定向复跑保留独立路径，[最终S行为/按钮文案](s-final-14-browser.log) 与 [S4正文宽度/身份](s4-final-13-browser.log) 为后续局部修订补测，未重复计数。完整 [技术结果](technical-validation.json)、[61条当前源哈希](current-source-validation.json)、[12资产校验](asset-validation.json)、[文件保护核对](protection-audit.json)分别记录。

独立 adapter/S 审查另定位四项 P2，见 [审查与修后复核](independent-adapter-review.json)：S5 当前标签临时展开、专注标题栏、S3/S4 动态身份、关闭悬停增强时取消旧计时器。逻辑用例保留真实 RED→GREEN；专注外观直接由真实浏览器检查，临时加入的 CSS 镜像单测夹具移除，未删既有测试。未执行到用例的初次错误筛选、实际失败日志和采集异常均留存，不计通过数。

最终局部颜色校准只涉及 S 配方：工具按钮使用已有 leadingIcon 与具名 label/icon parts 继承宿主，88×32、文字/图标#566276、专注填充#eaf1ff/边框#bdcff1；S4批改头白底/14px/21px。非S5实际使用 .nv44-shared，已按真实容器修正 selector；中间未命中轮原样保留。原稿较早 focus 蓝色被 v042 最终规则覆盖，以实际 computed 为准。最终定向 [两项浏览器](s-color-final-16-browser.log) 与 [构建](final-16-build.log) 分别保存；公共 Button 默认及 PDF 内 focus 按钮未改变。

最后的 [局部颜色与真实容器独立复核](independent-local-color-review.json) 单列当前两个S源文件SHA；历史核心/adapter审阅哈希未改。

2026-10-03 中断续跑：只更正R4/S4批改顺序的24×2短指示线，文字层的原稿标记与按钮层伪元素分别测量。当前 [五项批改交互](2026-10-03-grading-final-browser.log)、[Playground构建](2026-10-03-final-build.log)、[12资产校验](2026-10-03-asset-validation.json)、[61源哈希](2026-10-03-current-source-validation.json)、[本次技术汇总](2026-10-03-technical-validation.json)单独追加，未重复计入58个独立用例。87/100完整unit及全仓类型失败为10-01保留输出；本次局部CSS不改逻辑与公共默认。

2026-10-03最终候选05进一步关闭实际绘制差额：批改顺序自然144×34px、局部items可见溢出，恢复已有18px AI leadingIcon及18px工具插槽；上一段记录为中间候选04，原样保留。最终[5项浏览器复跑](2026-10-03-final-grading-browser.log)、[Playground类型检查及构建](2026-10-03-final-closed-build.log)、[12资产及当前Manifest哈希](2026-10-03-final-asset-validation.json)、[61条Registry当前哈希](2026-10-03-final-current-source-validation.json)、[技术汇总](2026-10-03-final-technical-validation.json)、[独立源码收口](2026-10-03-g2-close-independent-closure-03.json)、[保护与交付校验](2026-10-03-final-protection-and-delivery-validation.json)各自记录，不重写旧哈希或重复计数。结构资产校验通过；10份新候选CSS例外清单校验通过，R2历史清单未登记的既有36px帮助行待W6补登记。

最终[27S＋19R视觉索引](../w4/compare/2026-10-03T03-18-20-786Z/review-evidence-index.json)包含5例当前重拍及41例明确范围沿用，源锁/尺寸/路径全部验证；两例marker有1行PNG量化差，几何差0；默认原始9像素/max1稳定性差额与自然稳定补测分别记录，未将原始false改成true。原稿和G1保护保持，G2仍待人工判断，W6–W8尚未完成。


## 2026-10-03 · R4用户批注候选06

23条修改及现有Avatar/Group/Grid/IconButton、Token消费已落到R4互动配方；共享helper影响R4批改/R5/R6已登记。[本轮独立目录](review-06-r4-feedback/README.md)保留前后图、失败输出与最终定向核对，旧G1 review-06与candidate05证据不覆盖。本轮最终结果以该目录技术汇总为准；10-01兼容100/完整58及candidate05的27S＋19R仍是历史范围，不当作新source的完整视觉重拍。G2人工仍pending。
