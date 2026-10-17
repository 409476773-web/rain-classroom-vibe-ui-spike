# v1.2 · G0/G1 首批检查记录

日期：2026-09-19。本批已交付可运行样板并落实用户反馈；F05 默认组合方向已于 2026-09-21 完成限定确认。工作台已选 A「稳定三栏」，报告已选 A「趋势与对照」。Switch 本体按用户明确要求暂留，后续单独建设。没有宣布 G1、64项组件库或工作台/报告整页验收完成。

## 2026-09-20：Switch 消费替换

用户明确要求将示例页面中的 Switch 替换为已建设完成的规范组件。`token-first-g1` 的三组工具栏筛选开关和底部禁用示例现统一消费 `@rain-next/ui` 的 `Switch`，页面不再渲染 `local-g1-switch`；旧 local adapter 仅保留来源适配回归。宿主标签间距按最新浏览器标注调整为 4px。

UI、Prototype 类型检查通过；共享 Switch 行为/样式及 G1 页面单测共 14 项通过；[4 项 G1 浏览器回归](browser-switch-replacement-final/geometry.json)通过，覆盖筛选、焦点、键盘、亮暗主题、强制颜色、窄屏和实例隔离。共享 Switch 的未选中轨道与手柄实测 2.53:1，按当前 `contrastAcceptance: not-granted` 记录为 review-only，不在本次页面替换中关闭该 Gate。已查看[最终页面截图](browser-switch-replacement-final/samples-light-1369.png)。

## 最新：追加9条浏览器标注

2026-09-19，用户继续指定G1样板。评分细则改为regular文字按钮（14px/26px），与更多操作、批改说明一起居右；分母改为`/10 分`；示例作答标题/箭头分别使用Text/Neutral/4、Icon/Neutral/4；批改说明改用现有article-filled图标＋三级mini按钮。三张卡片统一默认白底，标题15px、说明13px、上下padding24px、区域gap16px。搜索框宽屏上限360px，卷别/搜索靠左，开关/恢复靠右；≤700沿用换行并解除宽度上限，没有新增断点。标注9的“最大高度”按该段宽度与对齐意图解释为最大宽度，输入高度仍36px。

构建与类型检查通过；[4项浏览器回归](browser-annotations3.log)通过，覆盖筛选、状态隔离、弹窗/嵌套菜单、焦点、亮暗主题及1369/900/390样板布局。已查看[最终桌面截图](browser-annotations3/samples-light-1369.png)。[授权与颜色登记回归](unit-annotations3.log)1项通过，239项未运行；[测试类型检查](test-types-annotations3.log)通过。当前原型构建见[记录](build-annotations3.log)。

新增2项局部颜色声明后共58项、862组静态测量；精确登记散列同步，未放宽检测规则。静态去重发现28项，包含弱Neutral用于交互内容的资格限制，均保留真实交互角色和待审阅状态。实际作答标题亮/暗对比度5.24/5.36；箭头2.38/4.62，亮色箭头低于3，已按用户的弱化要求记录，未算对比度通过。原弱辅助文字与输入边界发现继续保留，详见[实测](browser-annotations3/rendered-contrast.json)。[全库Token检查](tokens-annotations3.log)仍含这些发现及既有未登记文件问题，F05与颜色验收均未自动关闭。修改前快照见`before-annotations3/`。

## 此前：浏览器19条标注

19条标注已逐项落入当前样板，见 [反馈映射](design-notes.md)。标题式展开、底栏细则、12/20浅色摘要标签、Second正文与品牌分数、紧凑头部、彩色Tag、Help图标、三级按钮、38px固有宽Tab、默认Input边框、无描边卡片及更浅填充均已实现。未新增共享Token、公共默认或断点。

最新构建和类型检查通过；浏览器4项检查通过，包括标注1435px、900px、390px样板布局、标签同顶线、底栏位置、字体/尺寸、交互与焦点恢复。参见 [构建](build-annotations.log)、[类型检查](typecheck-annotations.log)、[浏览器](browser-annotations2.log)、[桌面样板](browser-annotations2/samples-light-1435.png)、[展开内容](browser-annotations2/samples-expanded.png)。本批授权与颜色发现记录检查见 [unit-annotations.log](unit-annotations.log)，不是全套单元回归。

**本版不再沿用首版“局部颜色全部通过”的结论。** 按明确标注使用的弱辅助文字，以及恢复共享外观的输入边界仍有对比度发现。实际数值、原门槛和 `meetsMinimum` 保存在 [浏览器测量](browser-annotations2/rendered-contrast.json)，`acceptedException` 保持 false。静态扫描的24条去重告警见 [颜色发现](annotation-color-findings.json)；静态扫描包含双主题声明及原6%承载面的保守测量，实际渲染5%与主题覆盖以浏览器结果为准。必要正文、品牌分数、键盘焦点仍通过既定测量。

全库Token检查保留这些新发现和此前4个未登记消费者的失败，见 [当前Token检查](tokens-annotations.log)。没有通过改低门槛、改称装饰/禁用内容或修改共享校验器的判断逻辑消除失败；回归只核对已记录发现未被悄悄改变。F05与整体对比度验收没有自动通过，但已由用户于 2026-09-21 人工确认。工作台/报告继续采用已选A方向。

以下为此前首批交付记录，最新尺寸、颜色与检查结论以上节为准。

## 入口与实际范围

- [修订后的组合样板](http://127.0.0.1:5369/#token-first-g1)
- [工作台 A/B 布局对照](http://127.0.0.1:5369/#token-first-workbench)
- [报告 A/B 布局对照](http://127.0.0.1:5369/#token-first-report)

实际工作区为 `.worktrees/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。5369 提供本次构建产物；原5368服务保留。按工作包00从现有 G0/G1 继续，未重启旧进度。组合与方向稿为 Prototype Mode / local-experiment；共享 Popup 层叠修复按 System Mode 处理。

本批新增 Alert、Switch、Accordion、Collapsible 四项局部适配，直接采用同一固定提交的 shadcn Base UI 作者源码及 Nova 样式，保留 MIT 许可与原文散列，见 [来源锁定](source-lock.json)。未执行 CLI，未进入公共导出/Registry。Prototype 只增加已锁定 Base UI 1.8.0、CVA 0.7.1 的直接依赖声明，离线链接，未增加新依赖版本。

唯一共享运行样式修改：将 `.rain-popup` 三项默认颜色放入 base 层，使现有局部 utility 能覆盖背景；尺寸、定位、主题/焦点控制保留。对应 Dropdown manifest 修正已过时的固定宽度说明。历史状态校验只识别本批限定授权及精确样式迁移，旧散列与已确认 Gate 未重写。

## 当前产出

| 项目 | 本批结果 | 限制或下一检查点 |
|---|---|---|
| G0 / 64项差额 | [逐项覆盖记录](coverage.md)：18项已有合同、4项本批局部适配、14项相关能力线索、28项待核验 | 不是完成率；同名命中不等于组件语义等价 |
| F01 | 当前源码核对269颜色ID、17语义映射、19字号、15固定行高及equal、10排版配置；现行文档计数已修正 | 完整数值见 [facts.json](facts.json)，旧历史原样保留 |
| F02 | 四项来源及实际 Rain 对应关系、构建扫描、局部样式覆盖已验证 | [Token映射](token-mapping.md)；未扩建完整Token体系 |
| F03 | 页面16/24、正文14/22、阅读14/24、数据20/28；工具条输入/恢复36、Tabs32；用户指定小卡片实体28/文字24 | 本机实际字体 PingFang SC、LINE Seed JP App_OTF；跨设备未验证 |
| F04 | 51项局部颜色声明、852个主题/承载面组合通过原规则；实际正文/辅助字/关键边界/焦点检查通过 | 不关闭已有全库对比度问题，不等于完整WCAG审计 |
| F05 | 三实例工具条、三实例内容卡均可操作；默认/局改/兄弟实例隔离，浮层继承主题；用户反馈已落地 | 当前修订版待用户限定确认，暂不扩大同类源码接入 |
| F06 / F07 | 复用现有间距和阴影，无新共享Token；检查嵌套菜单、焦点恢复、动态主题、窄窗口 | 仅覆盖本批场景；未验证全部浮层组合、真实触摸设备 |
| P1 / P3 | 两个业务范围相同的方向均有真实内容；用户已选 A/A | [设计记录与逐条反馈](design-notes.md)；P2/P4完整交互尚未交付 |
| F08 | 沿用 BM-D 汇总与趋势表达 | 分类/变化/缺测等图表角色留到G4 |

反馈修订要点：左侧 A/B 卷 Tab 后接已有 Input + SearchIcon，无可见字段标题；Switch 标签间距12→6且颜色退后。本题得分与关注点共用一层浅底和细分割线；评分细则用小文字按钮打开 Dialog；示例作答在独立浅底块内展开/收起，标题与正文左边线一致。卡片操作使用既有小尺寸，辅助说明降为较浅层级，没有增加嵌套卡片。Switch 样式延期不是对当前样式的验收。

## 实际检查与证据

| 检查 | 实际结果 | 证据 |
|---|---|---|
| 原型生产构建 | 通过；仍有现有整体应用大于500KB的分块提示 | [build-feedback.log](build-feedback.log) |
| 全工作区与测试类型检查 | 通过 | [typecheck-feedback.log](typecheck-feedback.log) |
| 修订样板浏览器检查 | 4/4通过：颜色与原生辅助模式、过滤与状态隔离、卡片/浮层/焦点、双方向响应与数据 | [browser-feedback2.log](browser-feedback2.log) |
| 相关单元与治理回归 | 7文件：217通过、4失败；6文件全部通过，4项失败均来自调用现有全库治理的Tailwind回归 | [regression-feedback.log](regression-feedback.log) |
| 本批授权、颜色登记与精确共享样式迁移 | 通过，拒绝越权状态、颜色篡改及任意共享样式变更 | [authorization-feedback.log](authorization-feedback.log)、[scoped-history-feedback.log](scoped-history-feedback.log) |
| Starter导出回归 | 3项通过；已去掉无法随Starter独立交付的批次专用文档链接 | [starter-regression.log](starter-regression.log) |
| Workspace / Evidence / Tailwind桥接 | 本批分别通过；Evidence脚本只代表其登记覆盖范围 | [workspace.log](workspace.log)、[evidence.log](evidence.log)、[tailwind.log](tailwind.log) |
| 全库Token与文件边界 | 失败，具体见下表；本批没有将总结果标绿 | [tokens-feedback.log](tokens-feedback.log)、[boundaries-feedback.log](boundaries-feedback.log) |

实际看过桌面默认/展开卡片、窄屏深色嵌套弹层及工作台/报告方向的整页画面。截图与测量保存在 [browser-feedback2](browser-feedback2/)；主要画面为 [默认样板](browser-feedback2/samples-first.png)、[展开作答](browser-feedback2/samples-expanded.png)、[评分细则弹层](browser-feedback2/rubric-dialog.png)、[窄屏深色弹层](browser-feedback2/nested-dark.png)。构建浏览器检查含1440/900/390视口，无页面横向溢出；字体由实际渲染平台字体记录证明，未只依赖字体存在性判断。

## 阻塞、边界与下一步

| 项目 | 当前事实 | 影响与下一步 |
|---|---|---|
| F05人工判断 | 用户先退回方向，已据具体意见完成修订；2026-09-21 已完成限定确认 | 可按工作包继续后续 G2；不扩大为全库视觉验收 |
| 现有边界登记 | exam-editor与teacher-grading的8个源码/测试文件不在旧完整清单，另有完整应用文件列表不一致 | 已有成果保留；另行核对这些原型授权与登记，不能通过删除成果或放宽全部清单解决 |
| 现有颜色登记 | exam-editor/page.css、page.tsx，list-composition/list.css，teacher-grading/page.css缺消费者登记 | 全库Token检查及4项关联治理回归仍失败；本批局部颜色登记通过 |
| 历史M2入口判定 | 本批之前的入口/阶段快照已不能通过现有M2路由判定 | 记录于facts，不借本批放行其它未登记入口 |
| 未完成的验证 | 完整测试套件未执行完；独立审阅、完整读屏、跨浏览器/设备、全部旧原型视觉回归未完成 | 不用局部测试推导全库验收 |

下一组先沿冻结64项核对 Tooltip 的现有内部实现与通用用途差额，再核对 Resizable 的来源兼容性；F05 限定确认已完成，可按工作包进入 G2。选定的工作台 A 沿用 teacher-grading/BM-C 的对象、筛选、草稿、保存和下一份状态；报告 A 沿用 BM-D 的过滤状态与加权公式，继续P2/P4细化，图表角色随G4补。不会创建另一套业务状态。

本批状态仍为 local-experiment；2026-09-21 用户已确认当前 G1 样板的视觉 Human Gate、人工对比度验收和限定范围独立复核。无公共Registry升级、Git提交/推送/合并、Figma写入、发布或业务迁移。原有文件未删除，当前差异和改动前快照见 [baseline-comparison.json](baseline-comparison.json) 与 before/；新增源码当前散列见 [adapted-source-sha256.json](adapted-source-sha256.json)。

## 2026-09-21：G1 Gate 确认

用户确认 F05 当前修订方向、G1 当前样板视觉 Human Gate、当前批次对比度人工验收及限定范围独立复核。原始自动测量、弱辅助文字/输入边界/Switch 等实际对比度 finding 继续保留；本次记录的是用户对当前运行结果的人工接受，不改写为自动阈值全部通过，也不扩大到共享 Switch 自身或全库对比度 Gate。G1 后续按工作包进入 G2。
