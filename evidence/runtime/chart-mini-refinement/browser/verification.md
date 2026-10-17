# 迷你双尺寸浏览器验证

范围为本工作树的本地 Chromium 验证，不代表人工视觉 Gate、发布或业务迁移。5173 与 5387 的监听进程工作目录已分别核实为本工作树的 `apps/playground` 与 `apps/prototype`。原型实际入口是 `/bklit-catalog.html`；仓库中没有 `rain-chart-catalog.html`。

## 实际结果

| 配置 | 本次覆盖 | 结果与执行方式 |
| --- | --- | --- |
| `chart-business.config.ts` | 23 个不同用例 | 完整 21 例通过；随后新增的单一状态/大数排行、fresh reduced SVG 两例通过；中心适配、最大悬停及相关宿主在修改后定向复测通过。 |
| `bklit-catalog.config.ts` | 20 个不同用例 | 新增 5 个迷你用例，以及 line/area/bar/pie/ring 标准模式的 15 个视口用例。初次 18 例通过；标准 ring 的 900/390px 两例修复后通过。没有运行其他图型的整套目录测试。 |
| `charts-playground.config.ts` | 现有 6 例 | 完整执行通过。两个原生图型用例按 `origin === "bklit"` 修正检索范围，保持原有 17/15 数量合同。 |

上述范围共 49 个不同浏览器用例。源码冻结后的定向执行为 business 3/3 与 standard ring 2/2，均 exit 0。随后修正底部舒展弧的文字样式覆盖，最后仅复测原宿主用例 1/1，exit 0；没有重复运行全部未改用例，也没有增加不同用例数量。

最后 business 三例使用：

```sh
pnpm exec playwright test -c tests/e2e/chart-business.config.ts --grep 'fresh reduced motion commits|radial hover growth|embedded unavailable' --output=evidence/runtime/chart-mini-refinement/browser/final-business-results
```

最后标准 ring 两例使用：

```sh
pnpm exec playwright test -c tests/e2e/bklit-catalog.config.ts --grep '\[P2\] ring renders.*(900|390)px' --output=evidence/runtime/chart-mini-refinement/browser/final-standard-ring-results
```

目录 20 例的检索表达式为 `\[mini\]|\] (area|line|bar|pie|ring) renders, reads and updates`。Playground 六例使用现有配置，并通过 `RAIN_CHART_PLAYGROUND_EVIDENCE_DIR` 与 `--output` 写入本目录；旧证据未覆盖。

## 已验证的行为与事实

- 9 种图型 × compact/comfortable 共 18 个 figure；同图两档相邻并保留同一组数据读数。1440、916、390px 没有页面横向溢出，固定尺寸槽与声明一致。
- SVG 坐标变换保持圆形等比；弧轨道有开口并使用宽大于高的几何。普通动效下先完成入场，再实际悬停到路径，确认增长后仍在 SVG 边界容差内。饼/环饼无光晕，进度环/弧最大悬停比例约 1.03。见 `sizes/radial-hover.json` 与八张 `sizes/hover-*.png`。
- 只有装饰性图形隐藏；figure 说明、百分比和完成率读数保持可访问。zero/missing 保留逻辑槽，empty/invalid 为页面级状态，不生成空表格。
- 卡片三个主读数的实测文本基线差为 0px，表格人数右齐。缺测的构成和进度单元格各显示一次状态；全零的进度显示一次“不适用”。
- 底部舒展弧中心百分比实测为 18px/22px，字体为 `"LINE Seed JP App_OTF", "SF Pro Rounded", ui-rounded, sans-serif`，与卡片主数字的 Data 字体一致。结果保存在 `sizes/host-readings.json` 的 `footerReading`；同一次复测的主数字基线差仍为 0px。
- 排行将首项 DOM 文本改为 `1,234,567,890,123` 进行布局压力检查，1440/390px 数字右边界一致、与条形间距 12px、条形仍有可见宽度。此检查不声称该注入文本对应业务数据或图形比例。
- 40 行初始可见 7 行，共 28 个 SVG，即每个可见行四个图形；数量不是简单提高旧 40-SVG 阈值。排序保持行身份，失效的离屏缓存先清空，回到视野后读数、图形和共享量程一致。详情与 portal Tooltip 保留，静止悬停后的更新不显示旧值。
- 普通更新有中间几何且不重建同一可见实例；配色变化不重播。DataBar 覆盖 25→75→50。fresh reduced 页面上的 DataBar、两档饼和进度更新直接到终态。
- 保留 Ring 既有更新弹簧；测量的路径稳定检测约 1.9 秒，包含轮询和连续 120ms 稳定窗口。650ms 配置用于小图入场，不能把更新弹簧表述为固定 650ms 完成。
- 原型目录五个迷你入口的两档选择、对照实例、同数据读数、normal→zero→missing 槽位一致；标准模式恢复尺寸。Line/Area 保留单点标记、日期 Tooltip 与重播。Playground 的型号控制与可复制源码参数同步。

## 测试假设修正与运行问题修复

测试与验证方法修正：

- 最初将数量条根标识猜为 `data-bar`；按确定的实现标识改为 `quantity`。这是选择器修正。
- 排序后 gallery 第一项不一定缺测，缺测断言改到实际缺测的表格数量条。
- 原生 Ring 更新是弹簧；改用中间几何与合理上限内稳定检测，移除错误的 770ms 终态假设。
- fresh reduced 测试使用新页面；重载重置 revision 后的目标值也相应修正。没有把动态 OS 偏好切换当成已支持能力。
- CSS `zoom: 2` 不同步媒体断点，因此不用于最终浏览器缩放结论。最终采用 Chromium device metrics，以 1440 设备像素对应 720 CSS 像素、scale factor 2 模拟 200% 布局与像素；独立文字放大另外只增大 caption 与进度文字的字号和行高。
- Tooltip 覆盖层带第二个 SVG，悬停选择器明确取主 SVG；目录重播明确限定主控制区，避开 variants 中同名按钮。
- 既有 Matrix 登记为 Rain 表格图型，使旧 Playground 用例误纳入无 SVG 的 Matrix，同时单色计数由 15 变 16。两个原生用例限定 `origin === "bklit"`，继续断言 17 个原生入口与 15 个原生单色入口；没有删除 Matrix 或降低数量断言。这是既有登记变化导致的测试范围修正。

实际运行问题修复：

- fresh reduced 下 MiniPie 的 `animate={false}` 静态分支仍通过 Motion 插值路径。局部使用既有 `geometryScrubbing={reduced}` 后，更新立即稳定；普通悬停增长分支仍通过最后复测。
- 构成单元格缺测说明由图形槽和外置读数各显示一次；宿主统一后只保留一次说明。
- 标准 Ring 的响应式测量曾在全页截图期间暂时进入直径不大于两倍 padding 的尺寸，触发运行异常。该 guard 存在于本轮基线；Root 补测量就绪条件后，900/390px 原失败路径通过。显式固定尺寸和无效 padding 校验仍保留。
- 中心读数的圆内判定由 Core 修正为真实文字墨迹与圆形边界判定；改后独立文字放大、外置读数和卡片基线的浏览器复测通过。100% 与 20/80=25% 的数据与边界单元证据由 Core 负责，本浏览器测试没有把它们伪装成已运行的真实业务 fixture。
- 底部 `.rain-business-comfortable-group strong` 的后置标题样式曾将舒展弧中心百分比覆盖为 14px。Root 将规则限定为直接业务标题 `> div > strong` 后，中心恢复 18px/22px 与 Data 字体。现有宿主用例补三项字体断言，单例复测通过；图形几何和完整环的 16px/20px 方案未变。

最后底部读数复测命令：

```sh
pnpm exec playwright test -c tests/e2e/chart-business.config.ts --grep 'common card baselines' --output=evidence/runtime/chart-mini-refinement/browser/final-footer-reading-results
```

## 性能与验证边界

同一 Chromium 环境的 900ms 更新采样，5/40 行的 RAF 中位间隔约 8.3/8.4ms，p95 均约 16.7ms；分别出现 132/133ms long task，最大 RAF 间隔约 142ms。见 `embedding/performance.json`。这不是长期性能预算，也不能承诺持续 60fps。

范围内五个浏览器测试/配置文件以仓库 `tests/node-runtime.d.ts` 进行独立 strict 类型检查，exit 0。整仓 tests 类型检查另报告四个无关既有错误：toast 两个 role-option 类型，以及两个 chart-feedback 配置的 reducedMotion 类型；未修改这些文件。

未测试 Safari、Firefox、读屏软件、原生浏览器菜单缩放或 OS 文字设置。模拟缩放和控制性文字压力测试的具体方法已写入对应 JSON。未进行 Git/Figma 写入、发布、业务迁移或人工 Gate 升级。

机器可读索引见 `verification.json`；核心事实、截图和失败后定向复测输出均保存在本目录下。
