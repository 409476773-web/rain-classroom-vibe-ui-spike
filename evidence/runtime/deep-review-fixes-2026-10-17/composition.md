# 三种高价值组合指引与可复制源码

范围：用户本轮第三项授权；现有公共 UI/Layout 的本地组合与知识补充，不新增共享组件、全局 Token 或依赖。源码身份是可修改的本地示例，不升级系统成熟度或人工验收。设计依据：Rain Designer v0.2.1，实际读设计指南第 1–2 章、V1–V5、I1–I5、第 5–6 章与 7.1；本库 prototype-design 入口、真实 FormItem/Input/Select/InputNumber/Textarea/Button 与 Grid/Stack API。选择目的：明确一份结果的筛选范围、整表保存与逐份任务的稳定身份。

## 交付

- `docs/ai/composition-recipes.md`：三个选择条件与不适用范围；显式 32px/36px 同排映射；业务状态、Layout、UI 责任；允许局部改造与共享边界。
- `apps/playground/src/docs/examples/filter-toolbar.tsx`：`FilterToolbarExample`，draft/applied 分离；明确查询、重置、结果数和空态。
- `apps/playground/src/docs/examples/sectioned-form.tsx`：`SectionedFormExample`，同源完整 Field 复制例子；字段就近错误、原生关联与首错焦点；编辑一处保留其余错误与输入。
- `apps/playground/src/docs/examples/grading-actions.tsx`：`GradingActionsExample`，按 studentId + questionId 归属数值/评语草稿和本地保存记录；导航不保存；明确保存并继续。

三份均无必填 props、不含网络或持久化服务。源文件位于已有 Playground package，避免文档目录不能解析 pnpm 包依赖；指南直接链接唯一 TSX，Field 页由主任务按 live 与 raw 同源导入。Starter 使用完全一致的源码副本，独立构建证据由 Starter 工作包负责。

## 检查与观察

- `pnpm --filter @rain-next/playground typecheck` 通过；三份 canonical TSX 都在该实际 package 的 include 中。
- `pnpm exec tsc --noEmit --project tsconfig.tests.json` 通过。
- `tests/e2e/composition-recipes.spec.ts` 的 3 个 Chromium 测试通过，真实 Vite/React TSX fixture，不依赖手写预打包 React URL。
- 筛选：输入“案例”后结果仍为 3，查询后为 2，重置后回到空条件与 3 项；Input 外框、Select frame、查询/重置普通 Button 均为 32px。Select trigger 内容本身为 22px，其外框才是同排尺寸参照。
- Field：首次提交同时关联课程/满分错误并聚焦课程；选择课程后满分错误保留；再次提交聚焦满分；填 100 后保存成功，作业名称保持。InputNumber 外框与主 Button 均为 36px。
- 批改：空分保存停留当前对象并聚焦；输入学生甲的 12 分及评语，切下一份为空，返回仍为 12 分及原评语；未保存计数保持 0；保存并继续捕获学生甲身份后展示学生乙，最后记录按各自 ID 保留，计数为 2。
- [桌面截图](composition/desktop.png)与[390px截图](composition/narrow.png)已查看。桌面筛选字段与按钮底边成行；窄处按钮自然移到下行，表单双列转为单列，标签、错误位置和操作归属没有因换行混合；[几何记录](composition/layout.json)显示没有水平溢出。三处主保存动作与其对应区域相邻；本次对这些组合没有观察到需要额外光学位移的理由。

运行：复用主任务本地 Playground 5379；标准回归命令 `pnpm exec playwright test tests/e2e/composition-recipes.spec.ts`。执行期间仅以临时配置指向既有服务器，完成后删除该配置。截图只覆盖本次静态状态，行为以执行过的测试为限。

## 保留边界

模拟数据、查询和保存都在当前页面；不提供刷新恢复、真实权限、后端分页、异步并发/重试或跨任务服务器保存。InputNumber 的格式错误由控件注入 FormItem，宿主业务错误不要复制同义文案；宿主仍须核对当前 native validity，不能只看最后合法数值。示例保留按公开值事件写入的数值草稿，不承诺跨任务保留未完成的原始数字字符串。

AI 本地截图检查、类型和行为通过不代表用户视觉接受、字体授权、完整颜色/主题验收、Safari、VoiceOver、真实触屏或生产接入完成；也没有执行报告中后续独立 AI 新任务与 Figma 往返试验。

## 独立只读复核补充

检查了本轮 Starter 导出逻辑/消费测试与 Field 主示例：未发现 Starter 闭包或三组合公开入口的实质阻塞；原快照追溯不作为本包必读，canonical 与消费副本字节一致。Field 主示例原 `clearFeedback()` 会在编辑任意字段时清空所有提交错误，已向主任务报告建议按字段清理；完整复制例子本身已保持其他字段错误。此条记录为复核时发现，不替代主任务最终修复/测试结论。
