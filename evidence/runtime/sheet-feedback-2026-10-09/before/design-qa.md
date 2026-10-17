# Sheet 标准任务型改造 · Design QA

日期：2026-10-09。System Mode，现有未发布候选的局部增量；本报告为实现自查，不是用户运行视觉验收。

## Findings

- 本轮最终比较没有遗留可操作的 P0/P1/P2。图稿的连续白底、局部文件标识、三列属性、编号目录与备注顺序均在实际组件中实现。
- 第一轮并排比较发现 [P2] 对象标题与阅读正文视觉重量偏小：对象名16/24、目录14/22、备注14/24使层级弱于确认稿。已分别改为18/28、15/24、Reading15/26，章节间距从40px校准为48px。最终重新截图并并排检查，目录及备注的阅读起点接近确认稿。
- PDF 复用正式资产，32px资产画布（实际文件轮廓约23×27px）在48px局部底板内；Fill/Red/Alpha/2的10% Alpha乘底板opacity .6，约6%染色。图标自身保持原生色与不透明，不重画。

## Comparison target and evidence

- 精确确认稿：`evidence/runtime/sheet-task-refinement-2026-10-09/approved-visual-target.png`，941×1672px。
- 实页：`http://127.0.0.1:5173/#sheet`，CSS viewport 1280×720，右侧详情、浅色、default密度、无键盘焦点态；同一份初始资料和六条目录。
- 实页截图：`evidence/runtime/sheet-task-refinement-2026-10-09/right-detail.jpg`，1280×720px，1截图像素/CSS像素。
- 归一化：确认稿面板裁切(68,124,810,1432)，按480/810缩至480×849，取顶部480×720；实页面板裁切(800,0,480,720)。确认稿底部剩余129px为空白，截图高度差不作为内容缺失。
- 全局组合比较：`comparison-full.png`，960×720，左为确认稿、右为实页。
- 局部组合比较：`comparison-identity.png`，896×155，文件标识/名称/三列属性，同样左稿右实页。
- 密度、裁切与比例详见`comparison-normalization.json`。只对内容区域比较，确认稿的画布光感、外框和余白不作为浮层样式。

## Required fidelity surfaces

| 检查面 | 实际观察与处理 |
| --- | --- |
| 字体与层级 | 实页计算字体为PingFang SC，使用Rain400/600和已有排版值。任务标题18/28、对象名18/28、章节16/24、目录15/24、备注15/26。与生成稿有小幅光学差异，保留系统字体而不模拟图中光栅字形；普通元数据维持13/14px以满足高效扫读。 |
| 排版与节奏 | 480px局部样例，24px内容边距，48px身份底板，三列属性短竖线，48px章节间距。无全宽灰色摘要条、目录逐项图标/重复说明或非必要Card。头尾和正文的滚动关系在实页验证。共享420px默认保持兼容。 |
| 色彩与Token | 连续白任务面、冷深色正文和弱元信息来自RainToken。局部红色来自正式PDF资产，同系底色使用现有Fill/Red/Alpha/2约6%呈现；非公共新增色。没有整块浅灰区域切断阅读。 |
| 资产质量 | 使用现成FileFormatPdfIcon与CloseIcon单图标入口；实际SVG/资产wrapper哈希绑定保留，未用字符、近似SVG或CSS图形替代文件资产。生成稿的折页/字样光学差异是正式来源资产替换的有意约束。 |
| 内容与交互 | 名称、课程、三列属性、六条目录与初始备注对应确认稿。详情无输入框和多余的底部关闭按钮；编辑为同一壳的独立表单，名称校验就近、草稿留在宿主、保存更新详情、取消不提交。 |

## Comparison history

1. `iteration-01-detail.jpg` / `iteration-01-comparison.png`：发现P2文字层级偏小，结果blocked。
2. 调整对象名、目录、备注排版和章节节奏。
3. `right-detail.jpg` / `comparison-full.png` / `comparison-identity.png`：重新打开实际内容及组合比较；五个必检面均检查，无遗留P0/P1/P2，最终passed。

## Interaction / quality evidence

- 浏览器19条检查通过，涵盖四方向、校验、保存/取消、草稿保留、Esc/遮罩、焦点恢复/循环、正文键盘滚动、固定操作区、深色/紧凑继承与字体复查。
- 浏览器记录无console error；详细结果`browser-results.json`。真实编辑/校验和深色截图分别为`right-edit.jpg`、`editor-error.jpg`、`dark-compact-detail.jpg`。
- 专项21条Vitest通过，UI/文档测试TypeScript与UI包TypeScript通过；Playground构建通过。
- 窄屏请求390×640未被浏览器viewport能力应用，实际仍1280×720，未算通过；已reset。Safari、VoiceOver、触摸手势与完整对比度未运行，不从源码和自动检查推断。
- 全仓Tailwind检查失败；改造前保存的phase与当前phase均报告相同unknown-status-fields根错误，见`global-governance-baseline.json`。没有为本任务放宽全库检查。

## Implementation checklist

- [x] 匹配确认的内容组织与局部PDF样式。
- [x] Header / Body / Footer通过包出口可组合，旧独立Title / Description兼容。
- [x] 保存/取消/就近校验与文档调用例接通。
- [x] 精确后继binding、颜色角色、Manifest与状态独立记录；历史记录保留。
- [x] 最终图片与实页同状态组合比较，修复P2后复核。
- [ ] 用户运行视觉审核；窄屏/原生浏览器/辅助技术/触摸检查仍独立。

final result: passed


## 2026-10-09 用户确认更新

用户在Sheet实页交付后回复“确定”。仅记录已展示的右侧、浅色、default密度详情页的视觉与信息编排通过，详见`visual-acceptance.json`；绑定该实页截图与当前源码binding哈希。编辑态、其他方向/主题/密度、跨设备、对比度与辅助技术仍不继承此确认。候选身份、发布、迁移、Figma与Git状态保持原有独立边界。

本次未改运行源码。验收记录/精确范围/冻结证据的9项治理测试通过；联合AssetIndex检查另有AreaChart描述“96×32 / 128×48”与当前Manifest“96×40”的不一致，范围在图表专题，本轮未修订。日志见`visual-approval-checks.log`。
