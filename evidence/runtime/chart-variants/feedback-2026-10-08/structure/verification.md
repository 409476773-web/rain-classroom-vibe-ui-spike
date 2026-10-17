# 结构图样式反馈验证

2026-10-08，本地候选；视觉确认仍待用户审阅。未发布、未写入 Figma、未创建 Git 提交。

| 用户批注 | 修改与当前证据 |
| --- | --- |
| 8：日历文字错位 | 月标签、季度标签分两排；星期显示参考站的 Mon/Wed/Fri 稀疏刻度。全年格网窄屏保留可读格宽，仅图内横向滚动。1280/880/390px 均实际测量月/季、相邻月份、星期标签无重叠。 |
| 9：默认地图只有色块 | 默认与变体共用 Natural Earth 1:110m 的 177 个真实地区；值为模拟数据，零值、缺测分开。默认图恢复原生 16:9 比例。源码下载包含 world.geojson 与来源许可 README。 |
| 10：复用库面包屑 | 下钻后使用既有 Breadcrumb Root/List/Item/Link/Page/Separator；根链接触发原生 zoomTo。SunburstBreadcrumb 仅保留展示 slot，避免嵌套导航。 |
| 11/12：根文字不是标签 | 根层显示 15px 普通标题，下钻显示唯一具备 ARIA 的库面包屑。 |

`pnpm exec vitest run apps/playground/src/docs/components/chart-variants/structure.test.tsx`：12/12 通过；包含全部 24 个结构变体、真实世界数据与状态、默认旭日图原生扇区点击后导航、下钻与返回、离屏状态保留。

`pnpm --filter @rain-next/playground typecheck`：通过。日志分别为 `unit-final.log`、`typecheck-final.log`。

`pnpm exec playwright test --config tests/e2e/chart-feedback-structure.config.ts --output evidence/runtime/chart-variants/feedback-2026-10-08/structure-frozen-final-results`：9/9 通过。宽度为 1280、880、390px；截图保存在本目录。此前标签重叠、标题被文档样式覆盖、工具样式生成顺序导致原生字号退化的失败证据保留在相邻的 results 目录。

## 默认源码消费

`node evidence/runtime/chart-variants/feedback-2026-10-08/structure/default-consumer/verify.mjs`：通过。真实读取默认地图与旭日图页面的下载链接，每页完整 10 文件；相对导入闭包检查、类型检查、两个入口的生产构建通过。

生产浏览器实际验证：地图渲染 177 个地区路径；鼠标点击原生旭日扇区下钻，库面包屑为唯一导航，点击库链接返回根标题。标题 15px；面包屑 13px/18px，列表零 margin/padding、无列表标记，链接左右 padding 4px、无下划线。无页面运行错误。`default-consumer/facts.json` 保存文件哈希、当前候选样式哈希和测量结果；`run-copied-final.log` 保存构建输出。

该宿主复制当前 UI/Foundation 源码，复用仓库已安装依赖；没有安装依赖，不是 clean-install 或依赖隔离验证。此前只加载库 CSS、未编译其工具类造成的错误保留为 `facts-breadcrumb-red.json`、`facts-styles-red.json` 和 `downloaded-breadcrumb-red.png`。

Safari、VoiceOver 与用户最终视觉确认尚未验证；底图保留原生 Mercator 投影与原始数据几何，不提供行政边界服务。
