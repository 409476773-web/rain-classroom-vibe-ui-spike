# Drawer refinement · 2026-10-14

System Mode 下完成本地未发布候选增量。用户先确认桌面／移动视觉方案，再指示“确定. 继续下一步”；现场追加“关闭应该是抽屉右上角的iconbutton，而不是现在这种地步的大按钮”。授权与限制见 authorization.json。

## 当前实现

- 公共 Drawer 新增原生 DrawerBody，转发ref与滚动事件；首尾对齐，正文独立滚动，标题16/24/600左对齐。纵向680px贴边居中、窄屏通栏，沿用Rain表面和Token。
- 共享配方管理snap可见偏移和把手空间，保留四方向、三种modality和原Base UI行为；up可见内容对齐底端，吸附变化中内容高度与Popup变换同步。切换snap模式只重建Backdrop清理残留progress。
- 任务宿主采用FormItem/Input/Textarea与两项RadioGroup；同一Popup切换预览，保留草稿和返回焦点。取消、关闭、Esc、遮罩共用未保存确认，安全初始焦点和放弃后的父层焦点恢复经过浏览器检查。
- 自定义空标题校验、500ms本地提交快照、pending同步防重与退出拦截、失败保留和重试；开关位于演示外层，无真实发布服务。附件只提供信息，不制造伪下载。
- 普通关闭统一为Header右上36/20 IconButton。四方向、课堂记录、Carousel资料阅读移除底部大关闭按钮，编辑底部保留取消／保存。
- 短预览随真实Header余量收缩，150字标题与约1500字正文不会裁掉返回／关闭；长URL正常换行。≤400px高时整个表单滚动，保证失败操作可达。

README、Manifest、Registry的DrawerBody、消费指南和独立实施计划已同步。未增加依赖、修改Foundations、提交Git、发布、写入Figma或接入业务服务。

## 本次实际验证

| 检查 | 结果 | 当前记录 |
|---|---|---|
| 公共部件、任务、共享样板、有限治理、颜色和接入 | 7文件44项通过 | target-final.log；单worker避免与并行构建争用 |
| 桌面1440×900、窄屏390×844、短屏390×480 | 27项通过 | e2e-final.log、browser/report.json |
| 额外极短390×320 | 三项目中的专项均通过 | 取消／重试可达、连续文本换行 |
| 上／下0.5和0.85吸附，有／无把手 | 三个尺寸都通过，动画逐帧检查Footer可见 | 独立snap fixture，不覆盖原G6消费者 |
| 工作区完整类型检查 | exit 0 | typecheck-final-integrated.log |
| Playground构建 | exit 0 | build-final.log；保留既有大chunk提示 |
| 独立颜色验证 | 98条静态配对，0阈值不足，18项运行效果待验证 | color-consumers.json |
| 独立规格／质量／治理审阅 | P1/P2修正后无剩余阻断 | independent-review.md |
| 原G6保留证据 | 118文件hash全部未变 | evidence-preservation.json |

颜色差额为41保留、4新增（3条Category＋阅读焦点outline:none）、1条blur移除。静态配对不等于实际动画／祖先透明度／滤镜／forced-colors和人工对比度接受。

新增检查先观察缺失行为或实测缺陷失败，再实现并复验。一次同时进行构建的多worker运行使旧样板首次导入超时，并造成后续重复DOM；同样来源单worker完整复跑44项通过。日志保留，没有删掉失败记录。

内置浏览器亲自查看了编辑、同层预览及用户指出的底部任务概览。当前803×797现场截图 header-close-current.jpg；live-edit-medium.jpg为同尺寸，不记为390px移动验证。精确移动尺寸由独立浏览器项目验证。浏览器截图保存为原始JPEG。

## 来源链与全库限制

Carousel协调进入ready后，冻结72文件canonical前任视图，并用真实Carousel reader验证。原G6来源／baseline／颜色账不回写；Drawer后继28来源文件独立封存，公开Body与本轮宿主组合在有限合同内检查。

继承的是原G6两份固定hash观察记录中的RN14两个文件与RainDesigner文档；记录、原快照、before来源均逐项验证。这些是已存在的技术观察，仍不转为Drawer编辑权限。未知Conversation改动不会被继承。

最终G6 reader先完成本轮自己的phase、来源、Registry、Manifest、共享Drawer片段和指南合同，随后在范围保留检查拒绝 apps/playground/src/docs/components/g6-conversation-pages.css。该组三份会话页差额在本轮前已存在且仍有并行工作。完整G6／Workspace／Evidence／Boundaries／Tailwind B2／Tokens检查未通过；B2日志还包含历史基础范围问题。详见 g6-final.log、workspace.log、evidence.log、boundaries.log、b2.log、tokens.log。

因此本轮完成本地Drawer实施和专项技术交付，没有声称全库闭环或整条来源链通过。后续合法的会话组件来源闭环需要其独立授权与证据，本轮不代为重新绑定。

## 人工与设备边界

humanGate: awaiting_human；contrastAcceptance: not-granted；publication: unpublished。先前确认只覆盖视觉提案；本轮运行组件仍等待人工视觉确认。

真实触摸与软键盘、Safari／VoiceOver、物理中文IME、原生200%／400%缩放和生产规模仍未在本轮验证。独立E2E使用桌面Chromium的指定视口，不冒充真实移动设备。原G6 E2E与封存输出目录未重新运行或覆盖。
