# Sheet 反馈修正视觉检查 · 2026-10-09

状态：AI 实页检查 passed-scoped；本修订人工视觉确认 awaiting-user-review。

参考：用户 10:39–10:41 截图和 28px 图标标注。实际预览 http://127.0.0.1:5173/#sheet，742×796 CSS px，右侧编辑、浅色、default。

- 保存：标准 Button primary，背景 rgb(21,97,248)，白字；取消：tertiary，透明底、中性文字。
- 资料名称：标准 Input，form 和 input 的 autocomplete=off，未出现历史建议；正常和聚焦填充白色，实际 input 透明，保留共享 1px 蓝色 outline/3px halo。未去除原生文本选区。
- PDF：28×28，48×48 淡色底板内上下左右均10px。来源 SVG 未改，无断点覆盖，详情与编辑共用该标识。
- 编辑面板无横向溢出；空名称保留标准 error 淡红背景、错误提示和焦点；取消不提交，草稿保留，保存更新详情。
- dark/compact：名称填充跟随 Fill/Neutral/Solid/7=rgb(7,11,29)，按钮大小跟随compact=small。
- 未发现本请求范围内 P0–P2 视觉问题。截图 edit-final.png；测量 browser-results.json。此前 detail 接受保留为旧截图/旧源码确认，不能自动覆盖本次修订。

未检查：Safari、VoiceOver、第三方自动填写工具、完整对比度；未重跑全库测试或既有失败的全仓治理；未发布。

方法 V03/V05/D03 已能覆盖本反馈，局部28px与名称白底不升级全库规范，无新方法条目追加。


# 八类导航推荐场景视觉检查 · 2026-10-10

本节仅评价本次授权的八类推荐场景及指定建设页消费者；上方 Sheet 检查原文保留。运行实现已完成，AI 视觉对照通过，Human Gate 为 awaiting-user-review。

**Findings**

没有仍需修正的本切片 P0/P1/P2 问题。以下实际发现均已修正并重新捕获：

| 问题与影响 | 修正 | 当前证据 |
| --- | --- | --- |
| [P2，已关闭] 首次活动卡固定最大宽度使网格留下多余空白 | 局部卡片随网格拉伸；文档内两列、宽建设页三列，保留 120×6px 条与两行 | `qa/compare-object-overview.png`、`qa/compare-activity-focused.png`；卡条 75%、100%、37.5%，第二行同中心线 |
| [P2，已关闭] 深色 Portal 结果文字仍是浅色深字，难以辨认 | 共享 CSS 仅在深色 popup positioner 内映射语义文字／表面变量 | `scope-red/` → `scope-green/`；`browser-verified/g123/scope-dark-popup.png` |
| [P2，已关闭] 修改评分后队列仍显示初始 7.0 | 队列读取同一学生＋题目草稿；清空为待批阅，保存分数同步 | `review-object-red.json` → `review-object-green.json`；最终 116 单元通过；独立审阅复核 |
| [P2，已关闭] 200% CSS 缩放时页签线中心偏离约 418.39px | DOM 坐标换回容器 CSS 坐标，线底边对齐实际标签；保留重测与减少动效 | `review-zoom-red/` → `review-zoom-green-final/`；独立复核中心误差 0px、底边误差 ≤0.047px、实际宽 48px |
| [P2，已关闭] 默认 Workspace 备注在面板下沿被裁切，临时目录又占满高度 | 调整局部阅读密度、720px 工作区与两行备注；暂看高度随内容，最大 380px | `qa/before-compare-workspace-wide.png`、`qa/before-compare-workspace-narrow.png` → 当前同名 compare；`qa/workspace-final-geometry.json`；宽窄恢复后的主内容位置与滚动不变 |
| [P2，已关闭] 窄 Scope 标签被截断，10 班的双位数字也不完整 | 收紧局部内衬与 More，公共槽与班级槽分配实际最小宽度；完整名称仍保持 13px | `qa-scope-label-red/`、`scope-tenth-red/` → `scope-tenth-green-final/`；`qa/compare-scope-narrow.png` |

**比较目标、状态与归一化**

原始视觉目标为四份已确认计划中的静态稿；它们是生成的方向稿，颜色、字体、图条和控件尺寸最终服从已有 Rain Tokens 与公共组件合同，不将稿件像素当作生产 CSS 值。源稿包含画布、文档标题，实页比较截取场景内容。双方先按相同列宽等比例缩放，保留比例且不拉伸，未做伪造逐像素差值。原稿的 CSS 视口和设备密度未知；原始像素记录如下。

实页默认捕获为 Chromium、zh-CN、1390×900 CSS px、deviceScaleFactor=1、浅色、default；实际场景宽 1016px。活动建设页为 1600×1100，场景宽 1320px；窄页为 390×844、实际场景宽 358px。附带 780px 视口中的 200% CSS 缩放检查，不声称替代真实浏览器文字缩放。静态状态分别对齐学生 s2／第3题、辩论活动、讲稿第2页、公共资源包、我的课程、资料 1.1、提交情况、教学内容、按人／按题；窄 Scope 为5班，Workspace 为临时目录。两种遍历状态分别捕获。

| 原始源稿与像素 | 实页内容捕获与像素 | 同一输入中的组合对照 |
| --- | --- | --- |
| [exec-5ee30f3b-4118-465e-8828-191631e2cd2c.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-5ee30f3b-4118-465e-8828-191631e2cd2c.png) · 1003×1568 | students-desktop.png 1016×453; activities-desktop.png 1016×330; lecture-desktop.png 1016×426 | [compare-object-overview.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-object-overview.png) |
| [exec-dfa18989-fdb1-445c-be1d-0c627d011f6e.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-dfa18989-fdb1-445c-be1d-0c627d011f6e.png) · 2172×724 | activity-gallery.png 1320×351 | [compare-activity-two-row.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-activity-two-row.png) |
| [exec-cadf6cb2-b4f8-4dad-bd3c-c4c8a3ecd07c.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-cadf6cb2-b4f8-4dad-bd3c-c4c8a3ecd07c.png) · 1586×992 | scope-desktop.png 1016×729 | [compare-scope-default.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-scope-default.png) |
| [exec-cadf6cb2-b4f8-4dad-bd3c-c4c8a3ecd07c.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-cadf6cb2-b4f8-4dad-bd3c-c4c8a3ecd07c.png) · 1586×992 | connected-desktop.png 1016×773 | [compare-connected-default.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-connected-default.png) |
| [exec-fca489f1-fddc-4a17-a36a-5302406ff491.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-fca489f1-fddc-4a17-a36a-5302406ff491.png) · 1024×1536 | scope-narrow-selected.png 358×753 | [compare-scope-narrow.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-scope-narrow.png) |
| [exec-1553eac0-e73f-4e8a-ae29-ebcc0695560b.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-1553eac0-e73f-4e8a-ae29-ebcc0695560b.png) · 1448×1086 | navigation-list-desktop.png 1016×367; navigation-list-collapsed.png 1016×371 | [compare-navigation-list.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-navigation-list.png) |
| [exec-f16c6fb2-8784-4ae7-9097-11300c526309.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-f16c6fb2-8784-4ae7-9097-11300c526309.png) · 1487×1058 | workspace-desktop.png 1016×754 | [compare-workspace-wide.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-workspace-wide.png) |
| [exec-41c53f76-49b9-437a-af9f-c87f252e97f6.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-41c53f76-49b9-437a-af9f-c87f252e97f6.png) · 1058×1487 | workspace-narrow-peek.png 358×754 | [compare-workspace-narrow.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-workspace-narrow.png) |
| [exec-93359e00-a478-44a7-b09d-9dde1e10ca9f.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-93359e00-a478-44a7-b09d-9dde1e10ca9f.png) · 1536×1024 | tabs-desktop.png 1016×637 | [compare-tabs.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-tabs.png) |
| [exec-93773d89-62c8-43f8-9875-30306505e3d0.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-93773d89-62c8-43f8-9875-30306505e3d0.png) · 1536×1024 | bar-desktop.png 1016×652 | [compare-bar.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-bar.png) |
| [exec-679e79f6-908e-435c-bdcf-0f72b48abbda.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-679e79f6-908e-435c-bdcf-0f72b48abbda.png) · 1422×1106 | segmented-desktop.png 1016×537; segmented-question.png 1016×537 | [compare-segmented.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-segmented.png) |
| [exec-dfa18989-fdb1-445c-be1d-0c627d011f6e.png](/Users/wenchengkai/.codex/generated_images/01a11f51-71c9-7033-8791-4bff1df48d5d/exec-dfa18989-fdb1-445c-be1d-0c627d011f6e.png) · 2172×724 | activity-cards-focused.png 1318×117 | [compare-activity-focused.png](/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/navigation-playground-refinement-2026-10-09/qa/compare-activity-focused.png) |

完整捕获事实见 `qa/capture-facts.json` 与 `qa/post-fix-capture-facts.json`，后者覆盖修正后的窄页；Workspace 当前桌面截图为 1016×754。聚焦证据包含活动条与读数、窄 Scope 名称、Workspace 备注与暂看、Tabs 24×3px 线及 200% 定位、Segmented 两种状态；以上细节均能在同一组合输入中辨读。其余整幅对照中的字号已足够阅读，未机械地为每个普通段落追加裁剪。

**五项必要表面**

- 字体：沿用 Rain UI 的系统中文字体栈，标题／正文／元信息层级来自现有 Token；队列名称、学号和当前态的字重清楚。使用已有 InputNumber 精度合同，因此输入显示 7、队列显示 7.0；未为图稿强制补零。窄 Scope 保留完整当前名称，长正文与长资料名称可换行或在原阅读区域滚动。
- 空间：使用已有 16／24px 内衬与 8／12px 间隔。活动常规两行，120×6px 图条不因缩窄而缩短，先降列数。Source 方向稿三列并非文档内容宽度下的强制列数。Workspace 两侧隐藏后使用临时覆盖，原主内容几何与滚动保持；默认备注现完整可见。
- 颜色：浅冷导航区、白任务面、浅蓝当前态和克制的定位边界维持确认方向。局部颜色映射使用已有语义 Token，迷你条保留 monochrome-blue 配方。深色页面与弹层文字实际读取正确语义颜色；这不代表完整对比度或全库主题验收。
- 图像：使用真实既有 Rain Avatar、Logo 与图标；生成稿中的模拟人物和课程装饰不作为身份或图标规范。四张讲稿为实际 PNG（1672×941），不是 CSS 空框，保持原始比例与清晰度；来源在 `assets/README.md`。Workspace 的函数图为正确的数据示例，不是替代品牌插画的手工视觉资产；通过 (−1,0) 与 (0,1)。没有真实 PDF 或已验证教材文件。
- 文案：题目、缺失条件的学生答案和要求补充的备注一致；课程资料 1.1 的 PDF 页数统一为8。保存、添加、标记、查看结果均有本地结果，状态归属于正确对象。遍历轴切换不会替代学生／题目身份。新内容未保留调试编号或通用业务引擎说明占据工作面。

**交互与差异边界**

人工 AI 实页检查结合真实浏览器断言：原生链接的点击、修饰键新标签、刷新与地址历史；手动 Tabs 的方向键聚焦／确认激活／lazy-retain；原生 Radio 表单与减少动效；标记与对象选择分离；Scope 搜索与焦点恢复；Workspace 隐藏、暂看、空间不足固定、宽窄返回、专注与滚动保留。64字长资料名、空白添加、窄页继续编辑另见 `qa/long-content-facts.json`。推荐场景与最终捕获的 pageerror 为[]。

保留的有意差异：既有公共控制／图标／Avatar／字段尺寸优先于生成稿的任意细节；卡片按实际宽度适应列数；三个资料列表展示稳定模拟资料，范围例增加可编辑备注以证明草稿归属；只读文件类型与页数不做伪编辑；建设页保留原业务结果与高级组合。这些差异与实施计划一致，未以修改全局默认来追逐稿件像素。

**Open Questions / 未验项**

运行视觉与动效仍须用户审阅。未运行 Safari、VoiceOver、真实触屏或完整对比度审计；未声明生产就绪。全测试源码类型检查存在其他模块的类型错误，详情见本次 `tests-typecheck.txt`，不把局部通过表述为全仓通过。

**Implementation Checklist**

- 八类推荐场景、指定建设页共用外观、真实 PNG 和高级保留已完成。
- 导航相关单元116项、浏览器34项，Playground类型检查／构建与当前依赖核对通过。
- 当前 Registry / Manifest 与历史视觉接受记录分开；本次 Human Gate 待用户。
- 无新增依赖、全局 Token、公共 API、Figma、提交／推送、发布或业务迁移。


最后窄 Scope 补查：5班与10班均在106px槽内显示完整名称（内容宽90px，scrollWidth=clientWidth=90），公共槽保持86px。最新同图对照为 `qa/compare-scope-narrow.png`；新增当前10班捕获为 `qa/scope-narrow-10.png`。最后浏览器补查 `browser-closed/` 三项及 R2 大数据／低高度补查 `scope-closed/` 三项均通过。



最后对比度补查发现深色已选／悬停结果文字仅3.1:1；已加深色专用当前文字映射，蓝色底与勾选保留。新回归先失败后通过（dark-current-red → dark-current-green），浅色当前结果仍4.6:1，深色当前结果现12.43:1，普通结果13.55:1。六个指定文字状态抽查通过；不据此授予全库对比度接受。

最新深色捕获：`qa/scope-dark-final.png`；颜色、背景alpha合成与计算结果见 `contrast-spot-final-results.json`。无本切片仍需修正的P0/P1/P2。

## 2026-10-10 · 七处导航浏览器标注

本轮参考为用户七张标注及明确修改请求，前一轮记录作为历史保留。详见 [实际验证](evidence/runtime/navigation-feedback-2026-10-10/verification.md)与`runtime-facts.json`。

AI实际查看分段条件两种遍历、活动进度、纵向导航收起/展开截图：4px选中线与选中行右边贴满，评分/备注沿同一左边界纵向排列，保留原控件尺寸与底部保存入口；Logo去掉隐藏文字残留gap后与图标同轴；课程使用官方线性资产；80×6px进度条采用主题品牌Token且三个比例正确；标题600、上下文14px。窄屏390px、紧凑、深色以及既有200%布局回归无本切片待修正的P0/P1/P2。

本次28项单元、4项浏览器回归、Playground类型检查与构建通过；W3当前38项源哈希匹配，历史Gate独立保留。最终配方截图`evidence/runtime/navigation-feedback-2026-10-10/segmented-final.jpg`已查看，包括可达的保存评分入口。2026-10-10用户回复「确定。」，本轮七处标注的局部视觉已接受；此前八类场景的整体Human Gate保持独立。Safari/VoiceOver、完整对比度与真实触屏未验证；无提交、发布或Figma操作。本轮仅记录局部经验，未将参数写入通用设计方法默认。

final result: passed
