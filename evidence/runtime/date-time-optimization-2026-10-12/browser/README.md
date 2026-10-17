# Date/time browser verification

本轮独立浏览器证据目录。最终结果以 `report.json` 和 `final-matrix.log` 为准；历史前缀目录保留实现和测试修正前的发现，不覆盖旧 G5 证据。

## 最终结果

2026-10-12 15:18:19（Asia/Shanghai）启动的正式矩阵 **37/37 通过**，0 skipped、0 flaky、0 unexpected，耗时46.0秒。使用Chromium 151.0.7922.34和Playwright WebKit 26.5。此轮源代码与spec冻结后运行，包含最终preset日期/分钟粒度、sticky浮层、44px触摸区域和布局修正。

- 已打开面板1440→720×500→320×480：每次变化后，在任何主动滚动前检查活动结束分钟保留、仍聚焦且至少99%可见，检查完整面板位于视口内、主体不覆盖footer且无横向溢出；两引擎均通过。
- 390/600粗指针模拟：日历/导航/动作44个目标最小44×44px；97个时间选项最小高度44px；7个输入框最小高度46px。缩短至480px高后先验面板几何，再检查输入与确认可达。
- 正式矩阵各页的未捕获异常和console error均须为空，否则afterEach使测试失败；没有忽略ResizeObserver错误。
- 已查看最终代表截图：三样板、桌面/窄屏/触屏初始面板、320px WebKit reflow、深色紧凑、强制色、480px高触屏。所查表单文字和保存结果可读，输入及操作条无非预期遮挡。长面板主体滚动、footer固定；这属于本地截图审阅，不是用户视觉签收。

**独立额外压力仍未通过：** `css-zoom-stress/report.json` 为0/1，`css-zoom-stress.log`、失败截图和trace保留。390px再叠加CSS zoom2的面板越出视口；该场景等效195 CSS像素，低于本轮320px范围。此失败没有并入37项，也没有被标为通过。浏览器原生200%缩放、实体移动设备/软键盘、Safari + VoiceOver及用户视觉验收仍待验证。

## 可复现运行

```sh
pnpm exec playwright test --config tests/e2e/date-time-optimization.config.ts
```

目标是本工作树构建后的 `http://127.0.0.1:5395`。默认时区为 `Asia/Shanghai`、语言为 `zh-CN`，大部分用例只固定 `Date` 到 `2026-10-12T10:00:30+08:00`；浏览器定时器和浮层/月份动画继续运行。单独的自动分钟刷新用例使用运行中的受控时钟，向前推进31秒，期间不重开面板也不派发focus。UTC用例创建真实UTC浏览器上下文并独立监听错误。

| 项目 | 范围 |
| --- | --- |
| desktop | Chromium 1440×1000；16 个交互、保存和视觉场景 |
| narrow390 | Chromium 390×844，细指针；三样板、布局与视觉压力场景 |
| touch390 | Chromium 390×844，移动/粗指针模拟；三样板、单月、44px目标、缩短视口 |
| touch600 | Chromium 600×900，移动/粗指针模拟；同上并包括深色、紧凑、强制色 |
| webkit | 已安装的 Playwright WebKit 1440×1000；13 个核心任务与布局场景 |

项目过滤后合计 37 个用例。浏览器版本、当前时区、实际粗指针和视口记录在 `environment-*.json`，触摸命中区实测记录在 `touch-targets-*.json`、`touch-time-targets-*.json`、`touch-input-frames-*.json`。

200%布局用1440×1000基准对应的720×500 CSS视口验证，再检查320×480最小reflow；这不宣称已自动操作浏览器原生缩放。原390px上再加CSS zoom2相当195 CSS像素，低于项目320px范围，另保留为额外压力场景，单独报告且不计入37项主矩阵：

```sh
RAIN_DATE_TIME_CSS_ZOOM_STRESS=1 pnpm exec playwright test --config tests/e2e/date-time-optimization.config.ts
```

其输出隔离在 `css-zoom-stress/`。既有失败截图与trace完整保留，不被视作通过。

## 测试边界

- D01–D13：页面暴露的输入、日期合法性、分钟精度、端点身份、正时长、月末/跨年/闰日、显式次日、一次性时长、快捷项、取消/清空/重开及嵌套关闭。
- D15、D18：确定前推进 Date 后发送前台 focus 生命周期通知；保存再次读精确 now；作业开放方式切换与考试四个入场边界。
- D16、D17、D20：深浅、两种密度、窄屏/粗指针、200%布局等效与320px reflow、缩短视口、强制色、正常/减少动态效果、快速月份切换、上海/UTC标签。
- D14 的外部受控属性改变、全禁用焦点以及 D19 的任意 disabledDates 跨越策略没有本页面可操作入口，属于组件单测和已有回归的范围，本套浏览器测试不冒充覆盖。
- IME 使用浏览器合成 composition 事件；前台恢复使用生命周期事件；移动与软键盘使用设备/视口模拟；200% 使用 CSS 视口等效。它们不等价于真实系统输入法、后台节流、实体触屏、系统软键盘或浏览器原生缩放验收。
- WebKit 引擎检查不等价于 Safari + VoiceOver 人工验收。截图检查也不代表用户已经接受视觉。

## 首轮发现

- `first-desktop-*`：IME 组合期间确定按钮仍可用；同时发现测试自身的关闭动画等待、时长空格、Radio标签点击及220ms单位写法问题，测试已按实际交互语义修正。
- `second-core-*`：新版 6 个核心交互回归通过，含日期/时间IME、月末/跨年/闰日、快捷项边界、独立时长、精确保存和开放方式切换。
- `first-responsive-*`：触屏48px规则引用未定义Token，实际日期/月份命中区14px；390px的200%布局确认按钮不可达。保留失败截图、trace和日志。
- `first-webkit-core-*`：7个用例通过；严格日期场景业务断言通过，但填入无效小时25时出现 `ResizeObserver loop completed with undelivered notifications`。错误没有被过滤。

- `matrix-round-1-*`：首轮完整33项矩阵29通过、4失败；保留窄屏200%、触屏清空宽度36px与WebKit错误证据。
- `clock-motion-strengthened-*`：新增自动分钟定时刷新与精确月份断言在Chromium/WebKit均通过，共4项。
- `matrix-round-2-*`：37项中30通过、7失败，来自几何辅助断言错误地在弹窗内部查找弹窗祖先；修正为内部滚动主体后再跑，未将测试错误算作产品回归。
- `matrix-round-3-*`：37项中36通过，Chromium已打开面板从720px收窄至320px后随锚点移出视口。该失败保留，并推动组件开启sticky视口约束。
- `superseded-scroll-assisted-*`：一次主动滚动活动输入框后的37通过，仅保留为过程记录；滚动掩盖了上述已打开面板reflow缺陷，已从正式测试移除，不作为验收通过证据。

最终截图位于本目录；初始打开使用 `datetime-panel-initial-*.png`，操作后使用 `datetime-panel-*.png`，缩短视口使用 `datetime-shrunk-viewport-*.png`，已打开reflow使用 `datetime-reflow-*.png`。过往CSS zoom图片另存 `historical-css-zoom-images/`，不作为本轮原生缩放证据。
