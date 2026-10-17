# BM-A 操作列视觉对齐修复

2026-10-13 · Prototype Mode · local-experiment · 实施完成，已获操作列局部视觉验收（见末尾确认）

## 授权与目标

用户最新明确要求“这一列还没有做到视觉对齐。请你分析原因并修复”，解除此前仅评审且不改BM-A的限制，仅针对操作列表头与五行“更多”。保留Skill、Designer、公共组件与Token；不扩展到其他列或全库规则。

当前浏览器`http://127.0.0.1:5543/#bm-a`由`rain-designer-starter-s3-2026-10-13/M1-trial/apps/prototype`运行（端口进程35425核实）。它是普通衍生试用目录，非card-v2；同样修复同时应用于已授权的card-v2源场景和这个活动副本。干净M1/M2导出没有重写，M1-trial/source-lock.json原样保留，试用副本继续标为衍生修改。

## 根因与最小修正

TableHead与TableCell各有16px单元格内边距，表头直接显示“操作”；正文使用Button text变体，按钮左右各有已有Token规定的6px内边距。修正前表头文字x=911.2578，按钮根x=911.2578，而按钮标签x=917.2578。几何外框对齐未包含标签的内部层，因此文字错开6px。

局部样式只将BM-A操作列表头的inline-start内边距设为`calc(var(--rain-space-16) + var(--rain-button-text-padding-inline))`，复用现有Token。没有平移按钮、缩小点击区、修改字号或新增补偿Token。

源与活动试用目录分别：page.tsx仅新增本地样式导入；新增page.css一条规则；新增action-alignment.manifest.json登记local-experiment、选择器、Parts、Token与验证范围。DataTableRecipe、Button、Table、公共样式及Skill未改。操作列固定最后且不可隐藏，局部选择器依此定位；以后支持列重排时需改为明确列标识。

[实际差异](page.diff) · [具体检查](checks.json)。Starter导出器本来就递归收集场景目录，新样式和登记文件无需修改导出逻辑；本轮未重新分发Starter。

## 实际验证

- 真实IAB页面，1051×794 CSS像素、DPR 2，原内容与紧凑模式前后同条件；已实际查看整页与操作列截图。
- 紧凑：五行文字左起点及横向中心相对表头由6px错开变为0；按钮原位置和38×24点击框原样保持。
- 默认：五行文字左起点差为0；保留现有13px表头和14px正文，文字宽度差使中心差1px。以左起点为本次参照，视觉复查无额外明确偏差，未再加光学补偿。
- Enter打开首行“更多”菜单，Escape关闭，焦点返回同一按钮，focus-visible为true且1px solid轮廓存在。恢复原紧凑模式和关闭菜单，无选择/记录操作。
- 现有DataTableRecipe与BM-A state测试：2文件、13测试通过；活动M1试用副本原型类型检查通过。没有为这次局部CSS另写镜像单元测试。
- 源码确认非目标#materials使用没有bm-a标记的宿主，本地选择器不会命中。未实际运行源目录#materials页面；活动M1 Starter没有独立materials路由。

[修改前整页](before.jpg) · [修改后整页](after-current.jpg) · [修改后操作列](after-action-column.jpg) · [默认密度](after-default.jpg) · [焦点返回](focus-return.jpg)。

保护检查：源基线13文件仅BM-A page.tsx按授权变化，其他12文件未变；活动试用2448个原文件仅page.tsx变化，其他2447文件未变，新增两个本地文件；两目录三个场景文件逐字一致。共享数据表配方、公共组件/Token、Skill、Designer、依赖/锁和source-lock未变，现有其他修改保留。

## 审核与待办

初次交付时，当前5543页面的“操作”与五行“更多”视觉起点等待用户检查；后续已取得下述局部确认。未完成Safari、其他显示尺寸、VoiceOver、完整无障碍或全库验证；没有将本列修正升级为公共规则。

本次页面修复与相关检查完成。Rain Designer执行流程的整体进度仍约65%，自主列全、正常对照、新对象泛化、最终Skill最小改法及人工收口仍待办；本次明确指定的页面修复不算自主漏检已解决。

## 用户确认（后续记录）

2026-10-13 用户回复“确定，推进下一步”，本次操作列局部视觉修复已获确认。[验收范围](acceptance.json)仅覆盖已展示的操作列，不关闭整页、Skill执行效果、无障碍或发布Gate。源与活动试用的局部Manifest同步登记，页面实现未再修改。
