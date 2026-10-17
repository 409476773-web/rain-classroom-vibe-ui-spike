# G1 review-02 · A1 / A4 / Hover

2026-09-28 用户四条批注；四条批注已实施并完成局部验证，G1仍待人工评审。

模式：导航候选 System Mode 的窄范围视觉修订 + Playground/Recipe 局部修订。A1选中线由2px调整至既有3px厚度Token（保留24px宽度）；A4样本内容标题16px，非重要说明使用既有浅文字Token并靠近标题；审计当前A1/A4/Connections/R2与评审控件的真实Hover，缺失者回到样式所有者补齐。普通Tabs/共享Button/全局Token不改。

V04：调整A4标题/说明层级；V05：保留原有交互语义、选中/禁用/焦点；D02：说明靠近标题。此次四条用户批注作为对应部位的新决策来源，原HTML及review-01历史记录保留。

验证：先记录默认/悬停计算样式和截图，再同条件复核；导航行为回归、普通Tabs隔离、禁用控件无假Hover、学期和范围弹层焦点；Playground类型检查/构建。实际覆盖与结果如下。`before-files.json`保护修改前文件。

## 本轮结果

| 批注 | 修改所有者 | 实际结果 |
|---|---|---|
| 1 A1选中线偏细 | 公共导航候选 navigation.css | 24×3px；原2px线在NavigationBar底部被裁1px，bottom从-1改0，实际显示3px；普通Tabs不变 |
| 2 A4内容标题 | 样本 samples.css | 18→16px，行高24px |
| 3 A4说明 | 样本 samples.css | neutral-6（rgb160/172/197），标题下间距9→2px |
| 4 Hover缺失 | 导航候选 / R2 recipe / 样本 / 评审壳各自CSS | 修复基础背景覆盖原hover与未声明hover两类问题；采用既有6%半透明填充，主按钮采用更深品牌色 |

不新增断点：尺寸修订在当前样本所有宽度生效；保持R2既有≤1250px容器规则、Scope空间预算与评审壳原尺寸横向滚动。1055px是批注视口上下文。未改变静态内容行的只读语义，选中连体面保持原表面。

## 浏览器与截图

- 修改前 [24处计算样式](before/hover-facts.json)，其中14处非聚焦可交互控件没有可见hover变化。搜索框修改前处于聚焦态，因此不纳入同条件缺失统计；修改后另验非聚焦hover边框，保留focus样式。
- 修改后 [29处状态](after/hover-facts.json)：27处可交互项有颜色/背景/边框变化；2处禁用浏览按钮不变。包括A1链接/带计数页签、A4页签/全部班级、Connections定位/全部、R2操作/学期/返回/账户/历史/More/树行/筛选/提示/编辑输入、范围弹窗关闭/搜索/结果及评审控件。
- [A1修改前](before/A1-selected.png) → [修改后](after/A1-selected.png)；[A4修改前](before/A4.png) → [修改后](after/A4.png)，[A4悬停](after/A4-hover.png)。
- [R2主按钮悬停](after/R2-primary-hover.png)、[范围弹窗悬停](after/scope-hover.png)、[Connections](after/Connections.png)。
- 批注视口截图：[1055px A1](after/A1-viewport-1055.png)、[A4](after/A4-viewport-1055.png)、[R2](after/R2-viewport-1055.png)。
- 原HTML实测记录保留在[批准基线](../reference/2026-09-27T19-36-55-642Z/)；本次复核其A4截图与同尺寸候选，除明确批注覆盖外保留表面/轮廓关系。冻结HTML未改。

实跑：`pnpm exec playwright test --config tests/e2e/navigation-v042.config.ts` 8项通过；补充5处hover与1055px截图后单独复跑review-02通过。`pnpm --filter @rain-next/playground build` 类型检查与构建通过，保留既有大包体提示。源码Registry五项校验与快照哈希核对通过，保护检查见 [protection.json](protection.json)。

既有review-01与阶段记录保留。没有独立第二审查者，本轮自动化与截图自查不代表G1、对比度验收、全库验收或发布批准；W3–W8仍未执行。

保护核对：10,235个既有文件无删除，冻结HTML哈希不变；本轮改动12个既有导航范围文件。另观察到21个Tree相关源码、文档与截图文件在期间变化，本任务未写入或回退它们，不将其纳入导航完成声明。
