# BM-C 14 条浏览器反馈 — 2026-09-16

## 授权与计划
用户直接提交 14 条 BM-C 浏览器批注；Prototype Mode，仅页面局部实现。
目标：复用按钮组局部 Recipe 和公共 contained Tabs；单一收起入口；默认密度无可见标题的搜索/筛选；目录加宽和信息并排；标题最多 16px；短返回入口。
修改：BM-C page/CSS/state-contract、对应既有行为测试、精确授权记录及局部颜色证据。共享 UI/Foundation/Layout 保持原样。
验证：定向单元、类型、构建、M2 三浏览器测试、1433×760 和窄屏现场查看、独立代码审阅。
假设：320px 目录与常规 32px 控件能减少纵向占用；Tabs 面板只承载目录分组，评分状态继续由现有宿主持有。
第 10 条：原生 details/ul/button 的选中行属于 bm-c-grading-workbench 局部 Recipe，不是公共目录组件。

## 状态
实施与定向自动验证、独立技术审阅完成；Human Gate awaiting_human，contrastAcceptance not-granted；未授权发布、迁移或 Git 提交。

## 批注落实
| 批注 | 当前实现 |
| --- | --- |
| 1 | RadioGroup 私有 bm-c-paper-buttons 按钮组，原生单选、鼠标及方向键 |
| 2 | 公共 Tabs contained 底板，手动激活；Panels 只承载目录，评分/作答保留原 DOM |
| 3–5 | 模块内唯一收起 IconButton；工具栏只在收起后显示展开入口，双向焦点恢复 |
| 6–9 | 无可见搜索/筛选标题、aria-label 保留；默认密度 32px；搜索/状态并排，份数放入标题行 |
| 10 | 原生 details/ul/button 为页面局部目录 Recipe；姓名/状态并排，不宣称公共目录资产 |
| 11 | 目录 240→320px；列表区域独立滚动 |
| 12–13 | 页面标题与当前作答标题均 16px，缩短标题内间距 |
| 14 | 原生 Link，BackIcon +“返回” |

## 现场发现与修复
- 试卷同排 Select 初版 100px 截断“全部作答”，调整目录到320px、Select112px 后全文可见；搜索框166×32px。
- BM-C 与 BM-D 同源按钮组局部 Recipe 只取消 clip，没有取消 Tailwind sr-only 的 clip-path:inset(50%)。补 clip-path:none、content pointer-events:none，使原生输入覆盖点击和 focus 区域；同时保留 native 单选、禁用和方向键。BM-D 仅这两处 CSS 声明变化，无颜色或状态改动。
- 390px 目录使用 max-height 时，新增 Tab 面板的百分比高度使 nav 溢出到容器外。面板改为 flex 约束并去除百分比高度；现场 navBottom501 < directoryBottom518，新增边界断言。
- 按钮边框为装饰分隔，不作为唯一选中或焦点提示；选中文字加粗和底色仍保留，forced-colors 有下划线，焦点由现有原生控件规则绘制。没有降低文字4.5或必要图形3的阈值，不宣称整体对比度验收。

## 审阅与证据
- before/、before.json 和 git-before.txt 保留本轮前状态；大量既有修改不归入本轮。
- scope-audit.json：1966共享文件无变化，state.ts及 choose/changeScope/changeDraft/save 函数逐字不变。
- 独立审阅：精确授权1正向+10负向、颜色快照和文本阈值通过；无阻断发现。窄屏 flex 增量源码与断言复审通过。
- unit.log/typecheck.log/browsers.log/browsers-attempt-2.log/browsers-attempt-3.log 为过程记录，失败结果保留。以 *-final.log 为最终检查入口。
- 全仓此前1391/296结果为历史；本轮仅定向检查，不把历史数目冒充本轮结果。

- Safari/WebKit 鼠标点击不会必然聚焦按钮，模块收起先显式聚焦自身再更新状态，让现有 Split 可靠回退至展开入口；WebKit定向2/2通过，见 focus-check.log。
- 按钮组输入不再被裁切后，原有 BM-D 用例剩余一处直接点装饰文字被原生输入覆盖；改为真实 radio 角色定位，不使用强制点击。

## 最终结果
- unit-final.log：3文件13/13通过；typecheck-final.log：全工作区类型通过。
- build-final.log：原型构建通过，保留既有大chunk提示。
- browsers-final.log：固定最终构建30/30通过，Chromium/Firefox/WebKit各10，33.6秒，无跳过或重试。截图与几何证据在 browser/。
- 独立技术审阅最终通过：已复核 Safari焦点、原生radio点击、目录flex约束、精确授权负向断言；无未解决阻断发现。
- 运行现场已查看1433×760浅色和390×844窄屏；最终截图另查看WebKit窄屏深色。浏览器临时尺寸覆盖已恢复。
- 当前阶段 technical completed；Human Gate awaiting_human、contrastAcceptance not-granted；不涉及公共资产晋升、发布、Figma、迁移或Git提交。
