# Dialog 排布精修验证

日期：2026-09-13。工作树：`.worktrees/card-v2`，分支 `codex/card-v2`，基线 HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。仅本地实施，未提交、推送或发布。

## 变更与来源

用户明确要求精修当前 Dialog，并提炼后续组件能沿用的组合排版规则。见[计划](../../../docs/plans/2026-09-13-dialog-visual-refinement-plan.md)与[规则](../../../docs/audits/2026-09-13-composition-layout-rules.md)。Rain 字体、颜色和控件方案继续作为视觉来源；shadcn 作为分区、组合和职责参考，不将官网某个样本数值作为全库标准。

公共 Dialog 调整 Header / Body 衔接、Footer 留白及轻底色顶线；课程示例选择短宽480 / 长宽560、字段组20、说明区24 / 16 / 4、显式32px动作按钮和28px关闭按钮。公共 Content 默认560、Base UI 行为、FormItem 内部4px及已有控件方案保持。Separator 源码未变，只调整其所在内容分区。

原 RN-05 [证据](../dialog-v2/verification.md)保持历史独立。本轮修改前16文件摘要与原文在 [baseline.json](baseline.json)及 `before/`；原 RN-05 保护清单的 **1915 个文件哈希全部一致**，包含既有 UI / Foundation / Card 范围，见 [preservation.json](preservation.json)。

## 自动检查

| 检查 | 实际结果与证据 |
| --- | --- |
| 红灯证明 | 新短弹窗480px检查对旧560px失败，见 [red.log](logs/red.log) |
| 全套单元初跑 | 88文件 / 1279项，1276通过、3失败；3项均因新增Footer的 `border-top-color` 不符合已有border颜色登记合同，见 [unit.log](logs/unit.log) |
| 修正后定向单元 | 改用现有允许的 `border-color`（仅顶边有宽度），未放宽全局合同；另为继承的Footer文字补登记Background/Neutral/2父表面。Dialog精确授权、Token与B2共201项通过；另15项颜色登记检查通过，见 [unit-recheck.log](logs/unit-recheck.log)、[unit-color-recheck.log](logs/unit-color-recheck.log)。初跑3项失败均已通过定向重验；最终精确授权与颜色登记18项再次通过，见 [dialog-final.log](logs/dialog-final.log)。不声称最终全套重新运行 |
| 类型 / 构建 | 通过，见 [typecheck.log](logs/typecheck.log)、[build.log](logs/build.log)。构建保留已有大块体积提示 |
| 治理 | 通过，见 [governance.log](logs/governance.log)；既有对比度待决项和已接受例外继续显式输出 |
| 生产 Chromium | **15 passed (15.0s)**：Dialog9 + Card6，见 [production.log](logs/production.log)和 `production/` |

生产测试使用 `/tmp/rain-dialog-visual-production.config.mjs`：仅匹配 `dialog.spec.ts` / `card.spec.ts`，baseURL `http://127.0.0.1:5195`，prototype环境变量均指向5196；workers=1、retries=0、失败截图与trace。实际命令：

```sh
RAIN_DIALOG_PROTOTYPE_URL=http://127.0.0.1:5196 RAIN_CARD_PROTOTYPE_URL=http://127.0.0.1:5196 pnpm exec playwright test --config /tmp/rain-dialog-visual-production.config.mjs
```

临时输出完成后归档至 `production/`。未覆盖原 RN-05 检查目录，未以生产测试替代未运行的完整跨浏览器检查。

## 有效距离与视觉范围

1280×800：短 / 长 × light / dark × default / compact 八组。短内容四组均断言以下实际布局盒关系：

| 关系 | 实测 |
| --- | --- |
| 短外框 / 长外框 | 480 / 560px |
| 内容左右缩进 | 24px，实体边框另计；标题、字段根节点、Separator、说明正文同左边线，保存按钮与正文同右边线 |
| 标题说明组末端 → 首字段 | 24px |
| 完整字段项 → 下一字段 | 20px |
| 字段组 → 说明分区线 | 24px |
| 分区线 → 小标题 | 16px |
| 小标题 → 说明正文 | 4px |
| 说明正文末端 → Footer边界 | 24px |
| Footer内距 / 动作gap | 16px 24px / 8px |
| 动作按钮 / 关闭按钮 | 32px / 28px；关闭按钮中心与28px标题行中心相等 |

例：[浅色默认盒测量](production/dialog-composition-short-D-3f332-intentional-group-intervals-chromium/composition-light-false.json)。四组JSON及短弹窗截图均在相同目录。长内容四组测量Body确有滚动，滚动后Footer位置不变，Popup边框1px、圆角10px。嵌套Select不被裁切，主题密度桥接仍有效。

交互覆盖打开与初始焦点、Tab约束、Escape / 外点关闭与触发器返回、Select先关闭、空名称校验、保存中保护、防重复提交、失败保留草稿、重试成功与取消不提交。375×667覆盖长内容及forced-colors，Footer可达、Dialog视口边距16px、Separator横1px / 竖1px；嵌套Dialog样例隔离仍通过。320×667普通颜色模式另验保存中：状态位于上一行，取消与保存保持同排、右端不溢出，见 `production/` 中 `dialog-narrow-pending-group.png`。生产prototype同时验证Card默认20px未变。

主线在应用内浏览器刷新5195，人工查看短浅色候选；另查看生产短深色、长深色及320px动作分组后的截图，确认中文换行、分组和操作层级。此处是实施者视觉自查，不能替代用户接受。

## 字体与颜色

四组生产标题通过 Chromium `CSS.getPlatformFontsForNode` 实测为 **PingFang SC / PingFangSC-Semibold**，非自定义字体；CSS字体链、实际字体及浏览器版本都在对应 `paints-*.json`。此结论仅限本机与记录的标题，不推广其他机器或所有字形。

[contrast.json](contrast.json)使用浏览器实际前景与父表面，透明颜色按sRGB合成，复用现有 `tests/e2e/color-contrast.ts`。两种密度值相同：

| 部位 | Light | Dark |
| --- | ---: | ---: |
| 标题 | 15.457:1 | 13.548:1 |
| 说明 | 6.565:1 | 8.549:1 |
| 正文 | 9.151:1 | 10.985:1 |
| Footer继承文字 | 8.693:1 | 11.692:1 |
| Footer键盘Focus / 新背景 | 3.643:1 | **2.739:1** |
| 共享Focus / 正文背景 | 3.835:1 | **2.573:1** |

已测必要文字达到4.5:1；深色Focus仍低于3:1，保留共享Foundation finding，不局部硬改。Footer顶线与正文Separator是装饰分界，不把它们低于3:1当作必要交互边界失败。按钮状态的额外实测随独立复核归档。

## 独立复核与剩余范围

独立代理复核完成，未发现未解决的新增P1/P2。8组桌面组合、1组无Header、最终8组窄屏保存/失败均通过；定向单元6/6通过，无浏览器运行时错误。见[独立报告](independent/review.md)、[无Header测量](independent/bare-results.json)与[最终窄屏测量](independent/final/grouped-results.json)。无Header的首段距Body顶部24px；320px保存状态下动作整组下移、取消/保存同排间隔8px，Footer底部650px。`independent/initial` 保留动作分组前与脚本调试历史，最终窄屏结论以 `independent/final` 为准。

`humanGate=awaiting_human`、`contrastAcceptance=not-granted`。本轮不关闭真实辅助技术、触屏、完整跨浏览器 / Benchmark、Registry发布、Figma晋升或业务迁移。组合规则的职责原则可以作为后续输入；Dialog数值只在本轮样本得到验证，不直接修改Card、Toolbar、页面或后续公共Layout。
