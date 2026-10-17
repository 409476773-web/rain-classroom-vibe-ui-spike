# 图表独立消费证据 · 2026-10-08

两个全新 Mock 任务在独立 React/Vite 宿主消费了最终 Rain 图表候选：报名/完成双轴报告，以及自创示意 GeoJSON 地区强度与四个独立目标。最终离线安装、安装隔离核对、数据校验、类型检查、生产构建均退出 0；Chrome 实际浏览器检查 23 项通过，保存 18 张最终截图，console/error/pageerror/requestfailed 均无记录。

本任务为 Prototype Mode 的 `local-experiment` 消费证据；依赖仍为 `registry-candidate`、`unpublished`。没有修改共享库、Root 包或锁、Registry、Manifest、目录索引，也没有发布 npm、写入 Figma、迁移业务或创建 Git commit。最终 Human Gate、真实读屏、物理触屏、完整对比度及其他浏览器验收仍未完成。

仅阅读了 AGENTS、图表 README、AI 图表指南、Registry、17 份逐图 Manifest、必要公共 API/样式源码与本地包装所需的包元信息。没有读取或复制 `apps/prototype` 验证页、Playground `chart-examples` / `chart-data`。两任务数据、控件、表格、GeoJSON 和检查均在此处自行编写。

| 任务 | 仅依文档的选型路径 | 实际消费合同 |
| --- | --- | --- |
| 每日报名人数、完成人数与完成率 | `docs/ai/charts.md` 的“人数与完成率” → `manifests/ui/chart-composed.yaml` → README 双轴示例 → `@rain-next/ui/charts` 的原生 Props | Composed + Area + SeriesBar + Line；左轴为人，右轴为 %；`completed / enrolled × 100`。完成者包含在报名者中，人数不堆叠。 |
| 地区强度与多个独立目标 | 指南的“地区强度”与“独立目标” → `chart-choropleth.yaml` / `chart-ring.yaml` → README 地区 ID、色阶与分母说明 → 公共导出及 Props | ChoroplethFeatureComponent 渲染自创六 Polygon，按稳定 ID 关联；0 和缺测独立。Ring 四项分别为 18/24 节、70/100 条、0/12 项、6/6 站，中心只显示当前项。 |

指南和 README 当前文档目录入口为 `/#chart-<id>`，如 `/#chart-composed`；初读时的 `/components/chart-<id>` 路线已由主任务更正。本任务没有以预览路由或应用源码作为运行依赖。文档提供了完成两任务所需的 API、样式、闭包和边界，没有消费阻塞项。

报名人数全零时保留人数图与精确表，移除比率曲线；混合零分母停止绘图并明确说明，表内保留“不适用”，不补为 0%。完成数超过报名、无效日期/排序由宿主拒绝。地图使用同一 0—100 色阶函数供图形、色条和提示消费；有效 0 用最浅色，`null` 用 no-data。各进度环保留自己的 maxValue 和单位，拒绝零分母；没有跨目标合计。

精确表使用 caption、行/列标题及具名可聚焦滚动区域；图例按钮由 Tab 到达，Focus 可见。390×844 的报告精确表通过 ArrowRight 横向滚动检查（scrollLeft=21）。正常更新增加第七个日期并更新地区/目标，稳定 ID、单位和分母保持一致。减少动效关闭宿主入场/位移配置；原生 DateTicker 与高亮带在两帧内分别到达 -120px 和 x=782.4px。图形 hover 不代表所有点都有键盘导航；地图精确读数由可访问表提供。

最终宿主为 `/tmp/rain-chart-independent-final-20261008-YvK5Tz`（实际路径 `/private/tmp/...`）。它从 Registry 的 `shared.files + items[].files` 复制 170 个图表闭包文件，再复制 3 个 Foundation CSS；保留 LICENSE 和 source-lock，以两个 private 本地 tarball 安装。宿主没有 workspace node_modules link，也没有全局 Tailwind 或 Tailwind 宿主依赖。285 个安装 symlink 均指向该 `/tmp` 宿主内部，173 个已安装源码/样式哈希全部匹配当前 canonical 工作区。详见 [安装事实](logs/clean-install-facts.json)及[最终源码快照](logs/source-snapshot.json)。

UI fixture 的 `0.0.0-consumption.20261008-final` 仅用于临时包缓存隔离；共享库版本与发布状态没有改变。最终 source-lock SHA-256 为 `e4a3184c604583c34c4a1fc5bf49e4deb6dfeb5ddb4b3e882633c69f77b45549`。相比初始消费快照，仅 DateTicker、use-highlight-segment、源码锁和 README 四文件不同；两行为修复是减少动效的真实偏移/弹簧处理，API 与依赖未改变。根追踪属性在两次快照中都已存在。详见 [快照差异](logs/snapshot-delta.json)和[可读源码 diff](logs/snapshot-source.diff)。

| 实际验证命令（在最终宿主中） | 退出/结果 | 证据 |
| --- | --- | --- |
| `pnpm install --offline --store-dir /Users/wenchengkai/Library/pnpm/store` | 0；新宿主成功离线安装 | [install-offline.log](logs/install-offline.log) |
| `pnpm installation` | 0；隔离与 173 个安装哈希匹配 | [install-check.log](logs/install-check.log) |
| `pnpm data` | 0；业务分母、日期、强度和目标边界 | [data-check.log](logs/data-check.log) |
| `pnpm check` | 0 | [typecheck.log](logs/typecheck.log) |
| `pnpm build` | 0 | [build.log](logs/build.log) |
| `pnpm browser`（最终轮） | 0；23 项、18 图、console=[] | [browser.log](logs/browser.log)、[browser-facts.json](logs/browser-facts.json) |

完整构建/安装/浏览器命令和每次退出码见 [command-facts.json](logs/command-facts.json)，实际 `npm pack` 参数和输出见 [package-pack.json](logs/package-pack.json)。

初始宿主的离线安装失败（缺少 `@babel/runtime@7.29.10`），随后正常安装成功；它没有被记为离线成功。缺失缓存补齐后，最终源码在新的干净宿主中离线安装成功。早期检查还暴露了宿主辅助脚本中文 URL 路径解析、入场未结束时悬停、favicon 404、减少动效无动画 clip、SVG `width="195.6px"` 证据解析等问题；均在宿主/检查中修正，保留了失败日志。初始 DOM 数量检查通过后，截图复核仍发现未完整捕获的图层；最终使用尺寸、累计 opacity 和 100% 原生环路径完成条件，抓图时临时扩大实际视口高度覆盖整页，并记录交互视口与抓图视口。[初始宿主记录](logs/initial-host)已被最终证据替代；最终第一轮辅助解析失败见 [browser-final-run-1.log](logs/browser-final-run-1.log)。

构建仍有上游 `use client` 被 Rollup 忽略、相关 sourcemap 诊断及 >500KB chunk 警告。最终 CSS 105.93KB、JS 706.38KB（gzip 14.15KB / 232.90KB）。安装日志记录了 pnpm 忽略 esbuild 的 build script；实际构建成功。未为这次独立消费增加拆包或发布设施，完整输出均保留。

最终截图已逐张查看关键正常/窄屏/减少动效状态，确认地图和四环实际可见、图形与表值一致。部分入口：

- [双轴报告](logs/screenshots/report-desktop.png)、[原生 tooltip](logs/screenshots/report-tooltip.png)、[键盘 Focus](logs/screenshots/report-keyboard-focus.png)、[零分母说明](logs/screenshots/report-mixed-zero.png)
- [地区与四目标](logs/screenshots/regional-desktop.png)、[原生地图单图](logs/screenshots/ui-chart-choropleth-desktop.png)、[进度环单图](logs/screenshots/ui-chart-ring-desktop.png)、[目标 Focus](logs/screenshots/regional-keyboard-focus.png)
- [390px 报告](logs/screenshots/report-mobile.png)、[窄表键盘滚动](logs/screenshots/report-mobile-table-keyboard.png)、[390px 地区/目标](logs/screenshots/regional-mobile.png)
- [减少动效报告](logs/screenshots/report-reduced-motion.png)、[减少动效地区/目标](logs/screenshots/regional-reduced-motion.png)

[可复制宿主](src/host)包含自己的 package.json、锁文件、源码及两 tarball；没有附带 node_modules。代码起点为 [report.tsx](src/report.tsx)、[regional.tsx](src/regional.tsx)和 [data.mjs](src/data.mjs)。现成生产构建在 [build-dist.tgz](logs/build-dist.tgz)。恢复宿主后可运行：

```sh
pnpm install --frozen-lockfile --offline --store-dir /Users/wenchengkai/Library/pnpm/store
pnpm installation
pnpm data
pnpm check
pnpm build
pnpm exec vite preview --host 127.0.0.1 --port 5391 --strictPort
# 在另一个终端运行 pnpm browser
```

当前只保留本任务自己的 5391 预览（PID 54381）；启动前确认 5391/5392 未占用，5387 服务未触碰。可直接打开 [报名报告](http://127.0.0.1:5391/?task=report)和[地区/目标](http://127.0.0.1:5391/?task=regional)。
