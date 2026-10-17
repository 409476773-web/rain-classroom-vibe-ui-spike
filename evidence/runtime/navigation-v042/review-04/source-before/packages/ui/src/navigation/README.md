# 导航 v0.4.2 首片候选

来源：`docs/rain-navigation-codex-workpack/reference/approved-v0.4.2.html`。实际测量：`evidence/runtime/navigation-v042/reference/2026-09-27T19-35-05-020Z/`。本组件是 `registry-candidate`；G1 等待用户评审，未发布。

- `NavigationBar`：A1 页面目的地，真实 `a` + `aria-current`。`href` 由应用提供；`onNavigate(id,event)` 只响应未带修饰键的主键点击，宿主自行决定是否 `preventDefault()`。
- `NavigationTabs`：A1 内容面或 A4 浏览器肩部的显式样式，继续使用既有 Tabs 的受控协议、键盘、ARIA、面板挂载与 More 行为。`visualPreset` 为 `navigation-line | navigation-browser`，只支持 top。`.Root/.Nav/.Panels` 可组合；`renderSurface({track,panels})` 供宿主注入 ConnectedSurface，不建立 UI 对 Layout 的依赖。
- `ScopeNavigation`：第一个 item 为公共资源包。`visibleLimit=3|4|5`、默认 4；沿用原稿 `max(2,floor((宿主宽度-188)/186))` 宽度预算减少可见槽，且不超过 visibleLimit；当前溢出项进入最后槽。`id` 是稳定身份；`label` 与 `description` 均为纯文本。更多班级显示尚未展示的班级数量（排除公共资源包），全部可见时不出现。入口与页签同高；复用非模态Popover就地展开并完整检索全部传入项目，选中后关闭并归还焦点到当前范围。

范围选择只产生 `onValueChange(id)` 请求；编辑草稿、资源同步、发布与当前身份由应用拥有。已删除的当前范围显示提示，不自动切换成别的班级。loading/error 是显式宿主输入；组件不发请求。Scope 通过 `Tabs.Panels sharedContent` 维持同一个编辑器实例，切换有效范围不清空组件内草稿；真正跨场景持久化的数据仍由应用可靠保存。布局与样式变化不会重建 Root。

## 本轮精确视觉映射

`navigation.css` 全部规则限定 `.rain-navigation` / `.rain-scope-navigation` / 导航浮层，并以原生 CSS `@scope` 在嵌套 Tabs 根处截止，避免修改正文里普通 Tabs。旧 Tabs 默认、全局 Token 与旧调用不变。原稿 system 字体栈保留在 `--rain-local-navigation-font`，仅限本轮保真候选，不改变全局 PingFang 规则。

| 实测原稿 | 本地候选 |
|---|---|
| 主蓝 #1561f8 | 既有 `--rain-category-fill-brand-solid-2` |
| 工作面 #fff / 轨道 #eef1f7 / 轮廓 #dce2eb | `--rain-local-navigation-surface/track/outline` |
| A1 idle #525b6a / current #202631 | `--rain-local-navigation-text/current` |
| A1 count #667080 / current #596477 | `--rain-local-navigation-count/count-current` |
| A4 idle #596271 / current #203350 / description #626d7d | `--rain-local-navigation-browser-text/browser-current/description` |
| A1 40px、24px 项间距、4px label-count、icon额外4px、当前24×3px名称线（原稿2px） | 显式 navigation-line；workpage 类增加20px首尾留白；count沿用原稿纯数字，旧Tabs仍保留括号 |
| A4 双行224×64、padding10/16、gap10、icon槽17×17、description在名称下方 | 显式 navigation-browser；Scope根据可用宽度分配170–255px |
| 原稿More为居中modal；用户review-03改为下拉 | 64px高入口＋剩余数，360px宽Popover，最浅overlay-separation叠白底；即时SearchInput保留，焦点/外点/Escape归Popover |

图标来自现有 Rain 单图标入口：展开 `arrow-down`、关闭 `close`、菜单选中 `check-bold`；未复制原稿临时 SVG。共享外形只由宿主 ConnectedSurface 绘制；本组件仅绘制非当前项短分隔与 outlined 当前顶部2px线。

## 复核

`pnpm exec vitest run packages/ui/src/navigation/navigation.test.tsx packages/ui/src/tabs/tabs.test.tsx packages/ui/src/tabs/tabs-overflow.test.ts`

覆盖旧 Tabs 行为、显式身份槽/旧默认不显示、保留面板实例、公共资源固定首位/当前末槽、200班搜索并选择、非模态语义/焦点归还、删除当前项不隐式选择、原生导航修饰键。几何与真实截图由本轮浏览器证据单独记录；测试通过不表示视觉验收。

浏览器验收：`tests/e2e/navigation-v042.spec.ts` 六项通过，日志 `evidence/runtime/navigation-v042/browser-tests-final.log`。包括 420px 高度下的范围选择、1200/1440 宽度预算，以及不加载 App 的 `/navigation-v042-consumer.html`：输入草稿后切范围、折叠恢复导航、进入退出专注、切换编辑预览，草稿保留；嵌套普通 Tabs 保持 38px 高度和 3px 指示线。CSS 隔离已在 Chromium 151 运行验证，其他浏览器尚未验证。

2026-09-29 review-03：8项组件检查、9项浏览器检查及类型检查/构建通过；截图与Token事实见 `evidence/runtime/navigation-v042/review-03/README.md`。更早结果为历史，不推导G1通过。
