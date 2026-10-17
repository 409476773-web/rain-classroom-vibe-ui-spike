import "./component-doc.css";
import { CHART_ENTRIES } from "./chart-catalog";
export const componentDocEntries = [
  { id: "alert", title: "Alert 持续提示", description: "持续状态与问题说明", group: "G1 · 提示、开关与展开" },
  { id: "switch", title: "Switch 开关", description: "即时生效的二态设置", group: "G1 · 提示、开关与展开" },
  { id: "collapsible", title: "Collapsible 展开区域", description: "单个辅助区域展开与收起", group: "G1 · 提示、开关与展开" },
  { id: "accordion", title: "Accordion 折叠组", description: "相关条目的分组展开", group: "G1 · 提示、开关与展开" },
  { id: "tooltip", title: "Tooltip 就近说明", description: "图标与短字段的辅助解释", group: "G1 · 提示、开关与展开" },
  { id: "resizable", title: "Resizable 可调分栏", description: "调整阅读与操作区域比例", group: "G1 · 提示、开关与展开" },
  { id: "button-group", title: "Button Group 操作组", description: "组织相关命令与方向", group: "G2 · 操作分组与反馈" },
  { id: "toggle", title: "Toggle 切换按钮", description: "独立的按下状态", group: "G2 · 操作分组与反馈" },
  { id: "toggle-group", title: "Toggle Group 切换组", description: "单选或多选模式", group: "G2 · 操作分组与反馈" },
  { id: "spinner", title: "Spinner 加载指示", description: "等待中的状态提示", group: "G2 · 操作分组与反馈" },
  { id: "skeleton", title: "Skeleton 加载占位", description: "加载前的内容结构", group: "G2 · 操作分组与反馈" },
  { id: "toast", title: "Toast 操作反馈", description: "可关闭的短时操作结果", group: "G2 · 操作分组与反馈" },
  { id: "breadcrumb", title: "Breadcrumb 层级路径", description: "路径定位与同层切换", group: "G3 · 工作台支撑" },
  { id: "scroll-area", title: "Scroll Area 滚动区", description: "独立滚动与键盘阅读", group: "G3 · 工作台支撑" },
  { id: "sheet", title: "Sheet 侧面板", description: "临时侧边任务与焦点恢复", group: "G3 · 工作台支撑" },
  { id: "sidebar", title: "Sidebar 侧栏", description: "当前导航与收起状态", group: "G3 · 工作台支撑" },
  { id: "command", title: "Command 命令检索", description: "搜索、选择与执行命令", group: "G3 · 工作台支撑" },
  { id: "kbd", title: "Kbd 快捷键提示", description: "标示按键和组合键", group: "G3 · 工作台支撑" },
  { id: "context-menu", title: "Context Menu 右键菜单", description: "上下文操作与键盘访问", group: "G3 · 工作台支撑" },
  { id: "hover-card", title: "Hover Card 悬停预览", description: "对象的辅助预览", group: "G3 · 工作台支撑" },
  { id: "menubar", title: "Menubar 菜单栏", description: "持续可见的菜单入口", group: "G3 · 工作台支撑" },
  { id: "navigation-menu", title: "Navigation Menu 导航菜单", description: "导航路径与展开结构", group: "G3 · 工作台支撑" },
  { id: "typography", title: "Typography 文字排版", description: "界面、长阅读与关键数字的语义用法", group: "G4 · 内容与进度" },
  { id: "item", title: "Item 内容条目", description: "媒体、主副内容与独立操作", group: "G4 · 内容与进度" },
  { id: "progress", title: "Progress 任务进度", description: "确定进度、未知比例与明确读数", group: "G4 · 内容与进度" },
  { id: "label", title: "Label 字段标签", description: "复用标签、必填说明与正确控件关联", group: "G5 · 表单与日期" },
  { id: "field", title: "Field 字段与校验", description: "单字段语义与任务表单组合", group: "G5 · 表单与日期" },
  { id: "input-group", title: "Input Group 输入组合", description: "行内附加内容与多行上下操作区", group: "G5 · 表单与日期" },
  { id: "combobox", title: "Combobox 输入式选择", description: "直接输入、候选选择与明确接受新文本", group: "G5 · 表单与日期" },
  { id: "slider", title: "Slider 数值滑块", description: "连续数值、双端范围与精确输入", group: "G5 · 表单与日期" },
  { id: "calendar", title: "Calendar 日历", description: "中文日期、区间与月份切换", group: "G5 · 表单与日期" },
  { id: "date-picker", title: "Date Picker 日期与时间", description: "日期时分草稿与统一确认提交", group: "G5 · 表单与日期" },
  { id: "navigation-tabs", title: "Navigation Tabs 内容页签", description: "同级内容面板与键盘切换", group: "导航与工作区布局" },
  { id: "navigation-bar", title: "Navigation Bar 导航栏", description: "页面目的地与当前路径", group: "导航与工作区布局" },
  { id: "scope-navigation", title: "Scope Navigation 范围导航", description: "大量范围的检索与切换", group: "导航与工作区布局" },
  { id: "tree", title: "Tree 树形组件", description: "层级展示、展开、选择、勾选与搜索", group: "导航与工作区布局" },
  { id: "manage-tree", title: "ManageTree 管理树", description: "基于 Tree 的草稿编辑与保存组合", group: "导航与工作区布局" },
  { id: "navigation-list", title: "Navigation List 层级列表", description: "分类、层级与当前选择", group: "导航与工作区布局" },
  { id: "object-navigator", title: "Object Navigator 对象导航", description: "对象选择与列表、卡片外观", group: "导航与工作区布局" },
  { id: "segmented-control", title: "Segmented Control 模式选择", description: "少量互斥模式", group: "导航与工作区布局" },
  { id: "connected-surface", title: "Connected Surface 连接表面", description: "导航边缘与任务面的接续", group: "导航与工作区布局" },
  { id: "workspace", title: "Workspace 工作区布局", description: "区域、独立滚动与就近恢复", group: "导航与工作区布局" },
  ...CHART_ENTRIES.map(entry => ({ id: `chart-${entry.id}` as const, title: entry.label, description: entry.summary, group: "G4 · 图表与图表基础" })),
  { id: "chart-business", title: "迷你图表与业务组合", description: "条形、构成、进度与趋势在表格和卡片中组合", group: "G4 · 图表与图表基础" },
  { id: "chart-category", title: "分类趋势与业务对照", description: "学期、学院、版本与周期的真实类别比较", group: "G4 · 图表与图表基础" },
  { id: "chart-china", title: "全国与省市下钻", description: "真实地区边界、参与强度、城市详情与返回", group: "G4 · 图表与图表基础" },
] as const;
export type ComponentDocId = typeof componentDocEntries[number]["id"];

export function ComponentCatalog() {
  const groups = [...new Set(componentDocEntries.map(item => item.group))];
  return <section className="component-catalog" aria-labelledby="component-catalog-title">
    <header><h2 id="component-catalog-title">组件与工作区</h2><p>按用途选择组件，查看交互、状态、接口与调用示例。</p></header>
    {groups.map(group => <section key={group} aria-label={group}><h3>{group}</h3><div className="component-catalog__grid">{componentDocEntries.filter(item => item.group === group).map(item => <a key={item.id} className="component-catalog__item" aria-label={item.title} aria-describedby={`catalog-${item.id}-description`} href={`#${item.id}`} data-focus="item"><strong>{item.title}</strong><span id={`catalog-${item.id}-description`}>{item.description}</span></a>)}</div></section>)}
  </section>;
}
