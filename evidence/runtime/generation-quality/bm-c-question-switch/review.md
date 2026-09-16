# BM-C 按人题号切换

## 范围与实现

2026-09-16；Prototype Mode / local-experiment。依据用户“按人批改时，切换题目可以使用并改造题号按钮”实施。

- 复用公共 QuestionNumber size32/current/feedback，不改共享组件。按人批改以可换行的题号列表替代整行题名；按题保留带头像学生行。
- 当前题、pending/reviewed/unanswered 独立；下方显示草稿、待批改、未作答或分数，aria-describedby 关联，title保留完整题名。原题号来自 answer.question，筛选后不重排。
- choose、草稿、保存锁、正式评分与导航状态机保持原样。保存中禁用题号，键盘 Enter 可切换并将焦点移至作答标题。
- 原整行按钮CSS限定为 bm-c-student-row，避免覆盖QuestionNumber；题号下分数位于白底，局部颜色表面登记同步选择器，未改变公共Token或对比度阈值。

## 验证与界限

- 亲自执行 Vite 打包成功；最终产物 Chromium/Firefox/WebKit 39/39 通过，无跳过。新增覆盖直接题号切换、草稿、保存锁、0分reviewed、未作答、过滤后的原始题号、44px点击区域与390px布局。
- 最终定向 Vitest 17项中16项通过（unit-final.log）：BM-C/BM-D状态、局部颜色和授权校验通过；M2入口冻结校验1项被并行新增teacher-grading路由影响。
- 最终全项目typecheck与标准prototype build通过（typecheck-final.log/build-final.log）。较早的并行teacher-grading类型错误已由外部任务修复，本轮未改其代码。
- 全仓治理被并行teacher-grading路由、页面与冻结allowlist不一致阻塞，详见governance.log；未扩大白名单或绕过规则。
- 独立只读审阅 /root/bm_d_feedback_review 通过：状态/语义、CSS隔离、颜色父表面和精确授权无新增阻塞，已核阅最终39/39。
- 已查看1215×778整页与实时按人页面；before.json/protected-files.json记录共享实现、BM-D及BM-C state.ts指纹。

实施与本地浏览器验证完成；视觉Human Gate、真人读屏和物理设备未验证；未提交Git、发布、迁移或写入Figma。
