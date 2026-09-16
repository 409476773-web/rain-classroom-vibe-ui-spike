# BM-C 主操作与状态辨识修复

## 范围与状态

2026-09-16；Prototype Mode / local-experiment。依据用户六条浏览器批注、后续两条重复信息批注，以及目录底色弱化过度的纠正。实现与定向自动验证完成，独立技术审阅通过；视觉 Human Gate 待用户查看。未提交 Git，未发布、迁移或写入 Figma。

## 最终调整

- 得分与评语使用现有 Input/Textarea `appearance="filled"`；保持公共 focus、error、disabled 行为和默认尺寸。
- 目录待批改为蓝色 Tag，未作答为中性 Tag；原草稿标记改为 Tag 文案。已保存分数为 16px 加粗数据字体，中文单位保持 14px UI 字体；0 分按属性存在判定。
- 所有折叠图标采用既有 ArrowDown/ArrowUp，移至行尾，颜色使用 Icon/Neutral/3；目录组标题和子行文字左对齐，评分参考与表单左边缘对齐。
- 作答和评分以同一白色外框及内部细分隔线连接；窄屏堆叠时切换为横向分隔。目录按用户纠正恢复白色和轻边框，避免与页面背景混在一起。
- 删除作答标题上方卷别、题型、满分摘要；删除评分标题下重复学生和题号。当前对象仍在作答主标题，满分仍在得分字段提示。
- 评分与草稿状态机、保存锁、切换焦点、卷别/顺序和目录过滤逻辑保持原有宿主。

## 验证

- `pnpm typecheck`：通过。
- `pnpm --filter @rain-next/prototype build`：通过，保留既有 bundle size 提醒。
- BM-C/BM-D 状态与 M2/资产入口校验：17/17 通过（unit-final.log）。
- Chromium / Firefox / WebKit：33/33 通过（browser-report.json）。新增检查覆盖 filled 输入、标签/粗分数、重复文案不存在、行首对齐、图标弱化、目录和主区白底、主区连接；原有 0 分、失败恢复、草稿、收起、键盘与 899/390 布局回归通过。
- 已查看 1259×695 整页截图及实时页面；目录容器清晰，正文与评分连续，保留小字号梯度。
- 独立只读审阅 `/root/bm_d_feedback_review`：无阻塞问题；所提证据未收尾问题已补齐。
- 全仓 `pnpm verify:governance` 尚未通过：并行列表页面 `apps/prototype/src/scenarios/list-composition/list.css` 缺少颜色消费者登记（governance.log）。本次 BM-C 本地颜色校验通过，未降低阈值或修改其他任务文件。共享组件仍有既有对比度待评审项，未授予对比度接受。
- before.json 记录 2029 个保护文件；protected-files.json 中 6 个 Avatar/StatusIndicator 文件为并行任务修改。BM-D、BM-C state.ts 与其余保护文件未变；不声称共享目录全局静止。

证据：三个浏览器子目录含桌面/平板/窄屏截图，current-source.json 记录本轮文件指纹。真人读屏、真实设备和视觉接受未验证。
