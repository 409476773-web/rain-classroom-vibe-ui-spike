# BM-C 批改工作台（RN-11）

身份：`local-experiment`。来源 VE-003/012/009 的区域组织；使用虚构 A/B 卷各 6 人、3 道主观题。仅文字作答与手动评分，不实现附件批注、AI 或申诉。

| 状态 | 唯一拥有者与规则 |
| --- | --- |
| 卷别 / 当前作答 | 页面；作答 ID 包含卷、学生、题。上一/下一不能跨卷或当前父级。 |
| 批改顺序 | 页面；按题的父级为题、子级为学生，按人的父级为学生、子级为题。切换顺序保留当前元组。 |
| 目录查询 / 状态 | 页面；过滤作答记录，父级只显示匹配子项，不推断学生级状态。主动筛选保留匹配的当前项，否则选择首项；空结果显示恢复入口。 |
| 目录位置 | 页面；默认仅当前父级展开，首次打开定位待批子项，无待批则首项；再次打开优先恢复仍在筛选集内的上次位置。 |
| 正式评分 / 草稿 | 页面；按作答 ID 保存，只有成功写入的分数算已批改，0 分有效，评语可选。空/非数字/非有限/负值/越界/非 0.5 步长拒绝。 |
| 保存请求 | 页面；复用可取消模拟任务。同步锁防重复，保存中禁用对象/卷别/顺序/筛选切换；失败留在原对象，保留输入并聚焦错误。成功才按提交前列表前进，不因已批状态变化跳项。卸载取消并忽略迟到结果。 |
| 筛选后的已保存对象 | 保存本题可留在当前作答，即使它已离开“待批”目录；主动选择或筛选再定位，不默默转到其他组。 |
| 宽度 / 收起 | 页面选择几何，Split 只负责布局、折叠和焦点返回。两 Pane 仍挂载，草稿不变。主动导航和保存后前进聚焦主区标题；搜索及筛选保留控件焦点，清空空结果后聚焦恢复的作答。 |
| 密度 / 主题 | 单一 DensityProvider；外壳 default、目录 default。原有控件方案直接消费，未新增尺寸体系。 |

局部配方 `bm-c-grading-workbench`，作用域 `.bm-c`，Parts 为 taskbar/toolbar/context/answer/inspector/grading-body/grading-footer。固定筛选区、目录与作答独立滚动、评分区内部滚动而操作区固定。所有色值逐项登记至 M2 颜色证据，间距、字号、线宽、圆角只消费既有 Rain Token。晋升 `not-proposed`。

刷新或离开场景后恢复虚构初值，未连接真实保存服务；真实中文 IME、读屏、物理触屏和新视觉 Human Gate 分别待验证。运行记录见 [M2 验证](../../../../../evidence/runtime/m2/verification.md)。

## 2026-09-16 浏览器 14 条反馈
- 试卷按钮组沿用 Radio 的原生单选语义，页面私有 bm-c-paper-buttons Recipe；批改顺序采用公共 contained Tabs，其面板仅切换目录分组。当前作答/评分 DOM 与草稿、保存锁仍归原宿主。
- 目录默认 320px，默认密度；搜索与状态同排，标题仅保留 aria-label，份数并入模块标题。原生 details/ul/button 目录为 bm-c-grading-workbench 私有 Recipe，并非公共目录组件。
- 模块内唯一收起 IconButton；工具栏仅在收起时提供展开，Split 负责收起焦点回退，展开后回到模块按钮。
- h1 与作答标题均 16px，返回为带 BackIcon 的原生链接。
- 本次为局部原型修订，视觉 Human Gate 待审；不提升公共资产成熟度。


## 2026-09-16 第二轮 13 条反馈与组合收敛

- 页面局部修订：白色 sticky 顶栏、返回分隔线；ArrowLeftIcon 用于返回及上一个对象，ArrowRightIcon 用于下一个对象。CollapseIcon 保留语义，使用公共 32/16 尺寸。原生 details/summary 的 marker 替换为正式 ArrowDown/ArrowUp；保留键盘、展开和目录宿主逻辑。
- 白色工具栏使公共 contained Tabs 自带 Background/Neutral/3 底板可见，无 Tabs 公共样式改动。14px 正文/16px 模块标题；目录行状态与正文同字号，学生作答取消重复底板；评分组间距 16px，标题与对象信息靠近。
- SystemStatusTag 使用原有 24px 状态方案：未评分/未选对象 neutral、未保存草稿 warning、保存中 processing、失败 error、已保存 success。状态描述当前对象，成功并前进的 notice 保留读屏通知，不把下一位错误标为已保存。上一/下一改为带 accessible name 的 IconButton；中性保存与主要保存前进区分。
- 评语不再标“选填”，仍无 required。局部 `bm-c-grading-help`（origin ui-popover, content part, promotion not-proposed）统一 14px 帮助标题/说明，解释草稿及评语规则。主题切换和失败模拟仅放演示设置。
- 修复 899px 双层 Split：flex:0 仅用于已经堆叠的直接子面板，不覆盖仍横排的内层作答区，避免评分栏被挤到视口外；手机继续自然堆叠。目录堆叠高度限 240px，内部滚动。标题增加 scroll margin，切换对象时保持标题在滚动区与吸顶栏下方可见。
- 所有评分数据及请求算法保持原实现；共享 UI/Foundation/Layout、BM-D 和 state.ts 由本轮 before.json 哈希保护。当前视觉仍 awaiting_human；[逐项记录与验证](../../../../../evidence/runtime/generation-quality/bm-c-composition/review.md)。

## 2026-09-16 主操作与辨识修订

得分/评语复用 filled 变体；待批改/未作答/草稿以 Tag 区分，已评分数字加粗并采用数据字体（单位仍为 UI 字体）。图标移行尾对齐并弱化。作答与评分共用白色主工作面；目录保留白底轻边框。删除卷别摘要与评分区重复对象文案。所有宿主状态规则保持不变，详见[本轮证据](../../../../../evidence/runtime/generation-quality/bm-c-primary-workflow/review.md)。

## 2026-09-16 目录身份与分数细节

复用 Avatar 24px 与 assignAvatarAssets，基于完整虚构学生集合一次分配，筛选/分组不重分配；按题头像位于学生行，按人位于学生父组。得分输入外部宽度128px；组间轻分隔及留白。分数采用深橙棕数据字形，选中行继承蓝色状态，13px中性单位；无新增状态或公共组件修改。[证据](../../../../../evidence/runtime/generation-quality/bm-c-directory-detail/review.md)。

## 2026-09-16 按人题号导航

按人批改的学生子列表复用 QuestionNumber size32，current 与 reviewed/pending/unanswered 独立。题号来自题目身份而非列表下标；下方显示分数或状态，通过 aria-describedby 关联，title 保留题名。选择仍交给 choose，保存期间禁用，原草稿/焦点/导航规则不变。按题的学生行使用独立 CSS 类，避免覆盖公共题号按钮。[证据](../../../../../evidence/runtime/generation-quality/bm-c-question-switch/review.md)。
