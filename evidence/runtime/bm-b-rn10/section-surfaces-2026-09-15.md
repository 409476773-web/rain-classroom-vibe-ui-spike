# BM-B 分区表面增量

2026-09-15，System Mode；用户已确认方案并授权实施。范围为BM-B Local Recipe，保持local-experiment，公共Dialog不变。

- 滚动内容区：Background/Neutral/2，外留白12px。
- 四个语义section：Background/Neutral/1，内留白20px、圆角8px、间距12px，无分区线、无阴影。
- Header/Footer沿用原表面；表单标签、控件、草稿与保存/关闭行为沿用当前实现。
- 修改page.tsx、page.css、颜色消费者登记和RN-10计划；复用现有Token，无新增公共API或Token。

验证完成：

- `pnpm --filter @rain-next/prototype build`：类型与构建通过，保留既有大包体积提示。
- `pnpm verify:governance`：通过；历史共享颜色欠项仍由原登记独立跟踪，本批没有新增颜色值或例外。
- `pnpm exec vitest run apps/prototype/src/scenarios/bm-b/state.test.tsx packages/ui/src/dialog/dialog.test.tsx`：2文件、11项通过。
- Codex浏览器717×760：滚动区实际`#F7F9FF`、padding12；四个白色section均padding20、radius8、border0、shadow none，三个相邻间距均12px。Header/Footer透明继承白色Dialog；内容scrollTop由0变760时Footer的y保持650。
- 双列作者简介/本书特色原生输入区均112px高、同一y；单列切换后纵向排列，页面无横向溢出。
- 390×740：勾选双列时自动退化为单列，Textarea宽290px，分区间距仍12px，无横向溢出，底栏操作可见。关闭按钮正常关闭并将焦点返回“编辑教材”。
- 深色390×740：滚动底色`#1A1F33`、分区及外容器`#1E243B`，无横向溢出；浏览器错误日志为空。结束后恢复浅色和默认视口。

基线和构建/治理/测试日志保存于`/tmp/rain-bm-b-sections-20260915`；运行截图与几何读数在本任务工具记录。没有新增重复样式断言测试；未重跑三浏览器完整E2E，也未复测原生拖动Textarea，当前记录只覆盖此次实际运行检查。

2026-09-15用户明确“视觉已经没问题了”，本次分区增量随当前BM-B弹窗整体运行视觉获得Human Gate接受。该确认不扩展为公共Dialog或其他组件验收；对比度待审查独立保留。未发布、未迁移、未提交Git、未写入Figma；真实IME、读屏器和触屏未在本次复测。
