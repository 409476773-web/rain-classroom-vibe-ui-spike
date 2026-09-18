# 教师作业小结 · Prototype Design Notes

## 任务

基于当前 `main` 的 Rain Next 组件与 Token，新增一个教师端「作业小结」高保真原型。允许页面层组合和局部视觉改造，但不修改任何共享源组件。

## 工作模式

- Prototype Mode
- assetIdentity: `local-experiment`
- 入口：`#teacher-homework-summary`

## 本次读取与复用

- `docs/ai/prototype-design.md`：先解决页面主任务、层级和组合，不把页面局部数值升级为系统默认。
- `packages/layouts/src/layout.tsx`：复用 Grid / Inline / Stack。
- `packages/ui/src/card/card.tsx`：复用 Card Anatomy，不新增公共 Variant。
- `packages/ui/src/select/select.tsx`：复用班级和学生状态筛选。
- `packages/ui/src/table/table.tsx`：学生明细承载。
- `apps/prototype/src/scenarios/bm-d/*`：仅参考当前报告类原型的 Token、排版与局部 Recipe 边界，不把 BM-D 画面当作已验证模板。

## 设计判断

1. **完成情况是视觉主锚点**：用完成率、完成人数、未完成人数和需关注人数建立第一判断；主卡强于后续模块。
2. **作答统计居中**：正确率只解释已作答内容；“已批改”明确按需要教师批改的题目份数表达，避免与学生人数混淆。
3. **习题构成降级**：只解释“自动判分 / 教师批改”的统计口径，不做强视觉卡片。
4. **学生明细服务行动**：提供班级筛选、状态筛选和从“需关注”直接跳到明细的操作，形成从概览到处理对象的路径。
5. **页面私有改造**：完成率环、Meter、状态胶囊均为本页面局部实现；不新增 Button/Card/Table/Select 公共 API。

## 数据与业务假设

- 当前全部为虚构教学数据。
- 本原型采用 12 题：自动判分 8 题、教师批改 4 题。
- 自动判分由客观习题与材料客观小题构成；教师批改由主观习题与材料主观小题构成。
- 正确率仅基于已作答内容；批改进度基于需要教师批改的题目份数。
- “需关注”目前是原型中的演示状态，不声明为真实业务算法或系统规则。

## 未验证

- 未在本次远程修改中运行本地浏览器视觉验收。
- 未把本页面登记为公共 Block / Template / Benchmark。
- 未修改 Registry、Manifest、Figma 或共享组件。
