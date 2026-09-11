# Dropdown 模板面板实际组合改造

后续说明：此处记录模板业务组合改造的前后边界。用户后来单独授权“需要统一复用视觉”，Checkbox / Radio 的被动绘制层因此抽出并供菜单共享；该追加改动见 [视觉复用记录](selection-visual-reuse.md)。

日期：2026-09-10。范围：建设计划 Task 4，新建学习单元 Recipe。使用本地演示数据。

## 结果与修改边界

先实现一个可选模板、异步创建、失败重试的基础面板，再在同一个 `TemplateContent` 中加入搜索、分类、40px 缩略图和独立收藏。基础版代码在改造前保存，下面保留实际源码差异。底部确认原先已经存在，本次保留并验证它在窄屏、过滤与失败时仍工作；不把它算作本次新增。

| 位置 | 实际改造 | 使用的公开接口 |
| --- | --- | --- |
| 面板内容 | 搜索、分类、空结果 | Popover.Content children、Input value/onChange、Button aria-pressed |
| 模板行 | 缩略图、原生单选、独立收藏并列 | RadioGroup renderOption、Radio、IconButton；收藏是 Radio 标签之外的 sibling |
| 文字与布局 | 15/22 标题、13/18 说明，选中 600/400 及 Brand/1、Brand/2 | 已有 Radio Local Recipe 的 root/label/description；页面局部 CSS |
| 业务状态 | 保留查询、分类、选择、收藏；450ms Mock 首次失败、第二次成功 | 页面 state 与定时器清理；请求中禁止重复提交和切换 |
| 有限高度 | 内容区滚动，底部操作不进入列表滚动区 | Popover 可用高度；页面 flex 布局、min-height:0 与 overflow-y:auto |

功能改造落点为 `apps/playground/src/docs/components/dropdown-page.tsx` 与同名 CSS。没有为搜索、分类、模板或收藏给公共 DropdownMenu/Popover 新增业务 Props，也没有修改 Input、Checkbox、Radio、RadioGroup 或 IconButton 的 Master。使用已有函数图像素材，没有新增图标或 Token 值。

本轮之后还进行了公共组件技术修复：可访问描述合并、Trigger 引用/活动入口主题桥接、类型收紧、选中确认标记、pressed 样式顺序及颜色登记。这些属于 Task 3/5 的公共合同完善，不能把“内容改造无需改 Master”扩大成“本轮公共文件始终未变”。

## 改造前后源码证据

改造前完整说明页 SHA-256：`01a287545e924e7fec3ff7c16259f7dc52f04971fae729d328085aecfdb58412`。摘录区域是 imports、模板数据和 `TemplateContent`；完整页面的其余 Recipe 未复制在此。基础版保留文件不依赖 Git HEAD；下面的差异已保存到项目内，后续不依赖临时文件。

```diff
--- dropdown-page.tsx / 改造前
+++ dropdown-page.tsx / 改造后
@@ -1,20 +1,30 @@
 import { useEffect, useRef, useState } from "react";
 import { Dialog } from "@base-ui/react/dialog";
 import { DensityProvider, type Density } from "@rain-next/foundations";
-import { Button, Checkbox, DropdownMenu, Input, Link, Popover, RadioGroup } from "@rain-next/ui";
+import { Button, Checkbox, DropdownMenu, IconButton, Input, Link, Popover, Radio, RadioGroup, defineRainLocalRecipe } from "@rain-next/ui";
 import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
 import { DeleteIcon } from "@rain-next/ui/icons/delete";
 import { CopyIcon } from "@rain-next/ui/icons/copy";
+import { RatingStarIcon } from "@rain-next/ui/icons/rating-star";
+import linearChart from "./option-chart-linear.svg";
+import parabolaChart from "./option-chart-parabola.svg";
 import "./dropdown-page.css";
 
 const templates = [
-  { value: "linear", label: "函数图像练习", description: "从图像理解变化趋势" },
-  { value: "parabola", label: "函数单元测验", description: "检查二次函数的理解" },
-  { value: "discussion", label: "课堂观点讨论", description: "以一个问题发起讨论" },
+  { value: "linear", label: "函数图像练习", description: "从图像理解变化趋势", category: "数学", image: linearChart },
+  { value: "parabola", label: "函数单元测验", description: "检查二次函数的理解", category: "数学", image: parabolaChart },
+  { value: "discussion", label: "课堂观点讨论", description: "以一个图像问题发起讨论", category: "讨论", image: linearChart },
 ];
+const templateRadioRecipe = defineRainLocalRecipe({
+  id: "dropdown-template-radio", origin: "ui-radio", scope: "feature",
+  classes: { root: "dropdown-template-radio", label: "leading-rain-22", description: "leading-rain-18" },
+  modifiedParts: ["root", "label", "description"], candidateTokens: [], promotionStatus: "not-proposed",
+});
 
 function TemplateContent({ onComplete }: { onComplete: (label: string) => void }) {
   const [selected, setSelected] = useState<string | null>(null), [pending, setPending] = useState(false), [error, setError] = useState(false);
+  const [query, setQuery] = useState(""), [category, setCategory] = useState("全部"), [favorites, setFavorites] = useState<string[]>([]);
+  const visible = templates.filter(item => (category === "全部" || item.category === category) && `${item.label} ${item.description}`.includes(query.trim()));
   const attempt = useRef(0), timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
   useEffect(() => () => clearTimeout(timer.current), []);
   function create() {
@@ -28,8 +38,24 @@
   }
   return <>
     <div className="dropdown-panel-body">
-      <RadioGroup legend="学习模板" legendHidden options={templates} value={selected} onValueChange={setSelected} disabled={pending} />
-      {error && <p role="alert">暂时未能创建，选择已保留，请重试。</p>}
+      <Input aria-label="搜索模板" placeholder="搜索模板" value={query} disabled={pending} onChange={event => setQuery(event.target.value)} />
+      <div className="flex flex-wrap gap-rain-4" role="group" aria-label="模板分类">
+        {["全部", "数学", "讨论"].map(item => <Button key={item} variant={category === item ? "primary" : "text"} aria-pressed={category === item} disabled={pending} onClick={() => setCategory(item)}>{item}</Button>)}
+      </div>
+      <RadioGroup legend="学习模板" legendHidden options={visible.map(({ value, label, description }) => ({ value, label, description }))}
+        value={selected} onValueChange={setSelected} disabled={pending} renderOption={props => {
+          const item = templates.find(item => item.value === props.value)!;
+          const favorite = favorites.includes(item.value);
+          return <div className="dropdown-template-row">
+            <img src={item.image} alt="" />
+            <Radio {...props} localRecipe={templateRadioRecipe} />
+            <IconButton icon={<RatingStarIcon />} size="32/18" aria-label={`${favorite ? "取消收藏" : "收藏"} ${item.label}`}
+              aria-pressed={favorite} highlight={favorite ? "icon" : "none"} disabled={pending}
+              onClick={() => setFavorites(values => favorite ? values.filter(value => value !== item.value) : [...values, item.value])} />
+          </div>;
+        }} />
+      {!visible.length && <p role="status">没有匹配的模板，请调整搜索或分类。</p>}
+      {error && <p role="alert">暂时未能创建，选择和搜索已保留，请重试。</p>}
     </div>
     <footer className="dropdown-panel-footer"><span>{selected ? "已选择 1 个模板" : "选择一个模板开始"}</span>
       <Button variant="primary" disabled={!selected} loading={pending} onClick={create}>{error ? "重试创建" : "创建学习单元"}</Button>
```

页面 CSS 增加：正文 flex 列布局和 12px gap；模板行 `40px minmax(0,1fr) 32px` 三列、8px gap；40px 缩略图；Radio 的本地宽度和选中文字颜色。全部引用已有 Rain Space、Radius、Typography 与 Category Color。面板继续使用 360px 软宽度及视口约束。

## 本次运行验证

`tests/e2e/dropdown.spec.ts` 直接访问实际 `#dropdown` 页，验证：搜索“函数”保留两项；收藏不改变单选；选择后禁用编辑并禁止重复提交；首次失败保留查询和选择；重试成功关闭；分类“讨论”、搜索空结果；320×480 时列表可滚到最后收藏且底部确认仍可达。

本次公共组件/治理小集 22 项通过；完整浏览器批次中的 Dropdown 9 项通过。最终全库结果及技术审阅见 [verification.md](verification.md)。截图：[模板搜索与选择](template.png)、[窄视口列表末端](narrow.png)。这些证据只证明上述实际组合与自动验证范围；Human Gate、颜色资格/对比度和设备辅助技术仍独立记录。
