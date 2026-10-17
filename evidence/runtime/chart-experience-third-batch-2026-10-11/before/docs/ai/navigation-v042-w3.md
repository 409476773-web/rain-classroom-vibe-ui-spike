# 导航 v0.4.2 · W3 消费合同

本页是 G1 之后新增候选的消费入口。A1/A4/R2 的既有人工视觉验收保留；本页的 A2/A3/A5/C/W/R1/R3 尚未取得 G2 人工验收，均未发布。

| 意图 | 资产 | 使用边界 |
|---|---|---|
| 页面或功能目的地 | `NavigationList` / `NavigationBar` | 原生链接、真实 href、应用拥有 current ID |
| 当前学生、题目、活动、预览对象 | `ObjectNavigator` | 原生按钮、aria-pressed；业务状态和草稿在宿主 |
| 显示模式或筛选条件 | `SegmentedControl` | 复用 RadioGroup；不是内容 Tabs |
| 对象内内容面板 | `NavigationTabs` | 复用既有 Tabs 的面板、键盘和挂载合同 |
| W3 白底轮廓连体 | `NavigationTabs` + `ConnectedSurface` | 单一轮廓 owner、2px 顶部品牌线 |
| 可选导航目录 | 既有 `Tree` | 导航选择；编辑资源仍用 R2 的 ManageTree |

三个新 UI 资产从 `@rain-next/ui` 导入。类型、槽位、状态、局部值及来源分别见 [NavigationList](../../manifests/ui/navigation-list.yaml)、[ObjectNavigator](../../manifests/ui/object-navigator.yaml)、[SegmentedControl](../../manifests/ui/segmented-control.yaml)。[本地 Registry](../../registry/navigation-v042-w3.json) 含当前源码哈希与真实依赖，不是安装或发布入口。

```tsx
<NavigationList aria-label="功能" items={destinations} activeId={routeId}
  onNavigate={(id, event) => { event.preventDefault(); setRouteId(id); }} />
<ObjectNavigator aria-label="当前学生" appearance="queue" content="identity"
  items={students} value={studentId} onValueChange={setStudentId} />
<SegmentedControl legend="文件显示" name="display" options={displayOptions}
  value={displayMode} onValueChange={setDisplayMode} />
```

`SegmentedControl` 保留 RadioGroup 的 controlled/uncontrolled 联合类型：受控使用 value/onValueChange，非受控使用 defaultValue。必须给 legend/name 与各选项 value/label。inverse 必须放在局部深色背景上；compact 仅改变控件密度。W1/W2 是 white-line/white-soft 条件，不附加空内容面板。

对象项的 `label` 是纯文本身份，description/meta/count/status/progress 是补充信息。补充信息通过实例隔离的 aria-describedby 关联；progress 必须为 0–100 的有限数值。独立操作放入 actions，与主选择按钮同级，不能嵌套按钮。队列外行 76px、零 gap；摘要外卡 300×89px。主按钮扣除外行边框后的尺寸不同，不应扩大按钮使外轮廓变形。

五类内容使用 [实际样本](../../apps/playground/src/recipes/navigation-v042/w3-samples.tsx)：simple/info/identity/summary/preview。图标沿既有 Rain 清单选择；没有重画公共图标。原稿未能直接命中 Foundation 的精确颜色、字体、像素值均登记为导航局部 CSS 例外，不修改全局 Token。

R1/R3 是可复制的 local-experiment：[源码](../../apps/playground/src/recipes/navigation-v042/r1-r3.tsx)、[样式](../../apps/playground/src/recipes/navigation-v042/r1-r3.css)、[R1 合同](../../manifests/recipes/navigation-r1.yaml)、[R3 合同](../../manifests/recipes/navigation-r3.yaml)。复制时携带样式类型声明，保留 source/version 并记录实例修改。专业图表、文件、练习均为原稿脱敏 Mock；上传、分析、成员和模块入口显示演示反馈，不连接服务。

R1 按子场景保存完整目的地 ID；内容 Tabs 和图表条件独立。R3 的文件/错题搜索独立，当前目录派生完整路径；加星、条件筛选、文件多选、列表/网格不互相覆盖。导航 Tree 的 40px 行和 12px 缩进仅是此原稿配方的适配，已认可的 R2 Tree/ManageTree 44px/24px 默认不变。W4/W5 接入共享 Workspace，具名恢复、临时层、固定、专注和调宽合同见 [工作区组合](navigation-workspaces-v042.md)；Recipe 仍拥有业务身份和草稿。

可运行入口：[Playground](http://127.0.0.1:5198/?sample=A2#navigation-v042)、[独立消费者](http://127.0.0.1:5198/navigation-v042-w3-consumer.html)。后者直接消费公共导出和 R1/R3/R4/R5/R6/S5，并含 UI 实例改造与真实双 R5 隔离，不依赖评审壳、iframe 或原稿 globals。[最新验证](../../evidence/runtime/navigation-v042/w5/README.md) 分别记录自动检查、原稿对照与未验证范围。旧 W2 Registry 的 sourceSnapshot 是该次历史快照；当前共享样式入口与复制闭包哈希在新 Registry 中登记。

禁止用外观/显隐动作触发保存、评分、同步或发布；禁止靠全局样式修一个实例、重设旧 Tabs/Radio 默认或用中文文案充当身份。新增布局/恢复能力按 W4/W5 独立阶段登记。


## Review09 · compact NavigationList提示

图标外观复用既有Tooltip（right portal），支持悬停、键盘聚焦、Escape；禁用项不触发提示，保留原生链接及修饰键行为。inset外观保留原有截断title。NavigationList/ObjectNavigator/SegmentedControl共用navigation-families.tsx，源码复制三者均声明Tooltip的Registry依赖以完成相对import闭包；不复制新Token、重建Tooltip或扩大既有Tooltip人工验收范围。局部平台Recipe为无文字40px目标居中18px图标，R2和S5保持各自原尺寸。


## 2026-10-03 review10 · 局部视觉角色

普通中性描边先消费现有Button tertiary，再用feature Local Recipe只调整已有密度；不要以中性root边框覆盖secondary而让内部label/icon保持主题色。保留有意强调的primary/secondary业务操作。辅助IconButton角色默认IconNeutral4，hover/focus2，明确active仍Brand1；公共默认保持。R1/R3固定/关闭24/14、空间切换32/14；R4/S4互动原32/14与其他32/18保持。字号/圆角/点击区域由原有完整组件合同管理。

表头regular400/TextNeutral5与行分隔BorderNeutral4；解释、辅助分组标题用Text5，纯提示用Text6。正文/文件15pxText1/评分/状态/选中导航不弱化，不用整行opacity。页面button重设对原生组件做零specificity排除，避免覆盖内部parts与文件15px。加星选中复用已定义semantic-warning，不引用不存在的warning category。Local Recipe candidateTokens只登记rain-local候选名；消费已存在Category Token时为[]。

42最终源锁、具体caller/别名与复制依赖以本轮Registry及Manifest为准；14/9/4/4闭包保持。无1176px专用断点、Foundation修改或公共默认变更。S1/S2专注按钮原生字体恢复带来8px宽度差额已记录，S5主要几何保持。浅色辅助值按用户视觉要求局部消费，部分实测对比度低于标准阈值，不授予完整对比度、读屏或G2/G3人工验收。证据evidence/runtime/navigation-v042/w5/review-10-visual-hierarchy/review-evidence-index.json。


## 2026-10-04 review11 · 批注与统一平台

46条批注具体caller与最终几何以`evidence/runtime/navigation-v042/w5/review-11-annotations-navigation/annotation-index.json`和当前Registry/Manifest为准。全部R/S保留64/208预算，平台外观恢复原稿既有本地表面#e8edf8/#252d43，选中／hover消费OnColor角色；品牌墨色继续消费既有Rain Tokens。所有外框可切轻／深色；内容Light。splitter只改变常态paint，hit area/focus/键盘调宽保持。

消费者按实际有效mode派发SHOW_REGION并携带实时viewportWidth，temporary用DISMISS_TEMP，修复重复展开与顶部恢复入口。整账户native按钮、展开视觉与Tab顺序、40/44px自然账户尺寸已独立复核；R1/R3复用现有Popover说明本地账户入口。复制仍14/9/4/4，43唯一最终源锁包含Gallery宿主TSX/CSS补充；共享默认／Foundation／历史G1与早期Review保持。105组件检查、137唯一浏览器合同最终通过（2 capture-only跳过），144稳定R/S运行画面／3606断言通过；完整tests类型保留7原诊断／0新。G2/G3、完整对比度与AT等独立。证据`evidence/runtime/navigation-v042/w5/review-11-annotations-navigation/review-evidence-index.json`。

## 2026-10-04 · Review12 当前视觉反馈

Normal splitter: 1px BorderNeutral4 × opacity .4 (Light effective4%),handle hidden;hover/drag/focus remain clear. R4/S4 discussion heading600/count400;all12 R/S platform unit glyphs20→18 with20px centered slots and40px rows;Logo23/utilities16,text/gap unchanged. PriorReview11/G1 preserved;shared defaults/Foundation unchanged.

2026-10-04 Review12: 28 Normal cases/48 visible splitters,48 platform theme-mode cases/192 unit glyphs and6 pointer-keyboard resize contracts passed;1702 assertions,0 errors/failures,source stable;R4/S4 heading600 and count400;Playground typechecked build passed;4 Registry/7 Recipe manifests/67 current hash entries/43 unique sources validated;3 local production files changed. Earlier 32 R2 inline20px failures retained and fixed via existing Icon size18 API. 仅3个本地源改动，无共享默认或Token新增。Review11和所有更早证据/认可字段保留；本轮实际定向证据：evidence/runtime/navigation-v042/w5/review-12-pale-splitters/review-evidence-index.json。

## 2026-10-04 · G2视觉接受与R3局部补充

用户明确确认“确定。完成截至目前建设内容的视觉验收。”截至候选12的当前运行视觉/组合已accepted，43源原样锁定，历史G1保持。R3随后三条批注形成候选13：开始练习消费标准无图标Primary Button，已加星rating-star-100，未加星rating-star；S2共享正文同步，云盘上传保留三级按钮。9实际浏览器案例/155断言/0错误及Playground类型检查构建通过。候选13新增视觉差额未自动接受。当前记录与锁：evidence/runtime/navigation-v042/w5/review-13-r3-actions/review-evidence-index.json，接受记录：evidence/runtime/navigation-v042/w5/review-13-r3-actions/visual-acceptance-record.json。公共默认、Foundation、复制闭包和历史证据保持。

## 2026-10-04 · 当前候选13视觉接受

用户在R3/S2补充修正后再次确认“确定。完成截至目前建设内容的视觉验收。”截至候选13的当前运行视觉与组合已accepted，含无图标Primary练习按钮、已加星rating-star-100/未加星rating-star。本次仅登记并同步评审状态，业务源码/样式不变；旧G1、候选12接受与所有自动证据原样保存。43源及元数据接受一致性证据：evidence/runtime/navigation-v042/g2-acceptance-13/record-checks.json。后续第一个未完成批次为W6的六项独立AI消费验证，然后W7/W8；本次未启动新批次。
