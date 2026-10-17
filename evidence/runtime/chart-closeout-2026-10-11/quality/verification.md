# 图表收尾：限定质量验证

本轮可自主执行的质量检查已完成。没有 critical / important 未解决阻断；完整图形对比度与实机辅助技术仍未授予验收。各项是不同范围的事实，不累计为一个“全部设备通过”总数。

| 范围 | 唯一数量与当前结果 | 证据 |
| --- | --- | --- |
| 默认入口跨引擎观察 | 19 入口 × Chromium / Firefox / WebKit × 1440 / 390 = 114；无页面异常，精确表与有限几何、横向边界可读 | [core summary](core/summary.json)：cross-02 的 111 项 + cross-05 的 Network 窄屏 3 项 |
| 代表终态图形 | 6 case / 14 actual plots；显式减少动效、非空且稳定几何 | [terminal-01](core/terminal-01)：Scatter 两尺寸各 72 点、Matrix 两尺寸各 5 plot；[terminal-03](core/terminal-03)：最终 native 源的 Line 两尺寸各 3 条完整宽度曲线 |
| 暗色 / 强制颜色与关键键盘链 | 36 独立路径；32 原结果保留 + 当前新 Brush 4 项替换，未累计为 40 | [themes summary](themes/summary.json) 与 [范围说明](themes/README.md) |
| 新 Brush 真实交互 | 3 引擎 × 2 宽度 × 2 流程 = 12 GREEN；同原 RED 脚本与严格断言 | [Brush summary](themes/brush-next/summary.json)、[原真实失败](themes/brush-next/run-01)、[当前 GREEN](themes/brush-next/run-02) |
| 必要普通文字颜色 | Line / Composed 实际 29 处轴与普通图例，原比值 3.7083 RED → 5.5667 GREEN；颜色目标 4 / 4 | [contrast RED](core/red-03/contrast-facts.json)、[GREEN](core/green-01/contrast-facts.json)、[目标检查](core/chart-color-consumers-green.log) |
| Sunburst 白字描边 | default / interactive × 1440 / 390 的 4 light case；另 1 dark 窄屏代表页含两个调用，共 6 个根绘图观察 | [light 4 GREEN](core/sunburst-outline-03)、[dark 1 GREEN](core/sunburst-dark-01) |
| 私有检查类型 | core、theme、Brush 均 exit0 | [core final](core/typecheck-05.log)、[theme final](themes/typecheck-07-final.log)、[Brush final](themes/brush-next/typecheck-final.log) |

114 张原入口截图是普通入场的当前帧 smoke，不是终态外观证明。最初私有配置使用了当前 Playwright 不支持的顶层 reducedMotion 字段；这个错误已保留，不能据此声称这 114 项为 reduce。上述 6 终态、当前主题与 Brush，以及 Sunburst 追加均显式设置媒体并核对真实 matchMedia。Matrix 各 plot 逐个滚入视口、确认 revealed / opacity / 稳定几何；窄屏 Network 按现有完整关系列表、节点详情、精确表等价读取，隐藏 SVG 是既有合同。

样式修复只有公共 `--chart-label` 从现有 Neutral5 改为 Neutral4，所有其余 CSS 字节、系列 palette 和几何保留；[单行证明](core/style-change-proof.json) 与主任务 [登记增量](../chart-label-registration-delta.json) 分开保存。CSS SHA256 为 `83e41f10f6e4bed4c50978f6e4de9a9c443e9cb0916f4237aadbb740e80cdd35`，最后运行样式写入为 `2026-10-11T08:41:17.486Z`；后续只新增质量证据。

Sunburst 原不透明扇区白字比值 3.9748 / 4.2252 / 3.2970 的真实测量保留于 [原 RED 观察](core/terminal-01/sunburst-text-audit.json)。主任务采用既有深色 token 的描边后，实际白字对不透明 halo 比值为 **7.9209887755**，非空标签的 stroke-width=2px、paint-order=stroke、opacity=1。light 每调用 root 12 / drilled 3 / returned 12 个标签，dark 两调用各 12 个标签均有实值。键盘下钻和返回保留全部原始精确表；返回的 path 命令与 palette 相同，真实最大坐标浮点差约 9.24e-14。默认蓝灰单色在两宽度各 12 个标签仍为原深字、stroke none。这个描边结果不代替系列、渐变、纹理、alpha 或强制颜色的完整对比度验收。

Brush 的初次 6 pointer RED 是实际范围回传膨胀，每端多 2px；不是 CSS 描边宽度或窄屏尺寸问题。主任务改为从原生真实 pixel extent 反解时间范围后，同一脚本的 12 项全部通过，pan 宽度最大漂移约 5.68e-14px，实际保存的窗口时长保持 15 天，原始精确行、两端键盘、连续两次 preview / commit、pan、reset 和同原生 DOM 均核对。当前实际调用仅 `line-trio-brush` 的原 30 条数据；Area 的临时 Segment 与 Composed 不冒充 Brush 调用。

两份 native 补修的 [独立只读 review](core/native-brush-review.md) 未发现当前范围的 critical / important 问题：preview / commit 共用真实 extent，null 原样为 null，非拖动 reset 同步原生，brushing anchor 保留；类型只从 Visx4 公共出口派生，Rain 公开签名保持。逐字节核对 source-lock 的 181 native 文件，只有 `chart-brush.tsx` 和 `chart-brush-handle.tsx` 两份变化，其余 179 保留，见 [完整 hash](core/native-brush-review.json)。旧 Brush3 / 4 源码同有 SAFE_PIXEL 容差，只读归因已保存，旧3浏览器未复跑，因此不声明旧版本实测。

所有接受的执行在各自轮次内源码／依赖静止且页面异常为 0。core 原范围 238 源、theme 242 源，当前 Brush 246 源含 manifest / lock；这些范围不冒充主任务完整运行源集合。114 smoke 与 Scatter / Matrix 原终态保留 [Brush3 安装身份](core/dependency-before.json)；Line 最终终态、Sunburst 追加与当前 Brush 使用 [Brush4 安装身份](core/dependency-after.json)。36 主题按来源保留 32 旧 epoch + 4 新 epoch，明确不是新源下重新执行全 36。实际新服务 Brush4 模块 SHA256 `f2d7e03763283ed7d59d1a7a8e1d9e815435a489490d112ad19b82ca5e4f1d13`，每个当前 Brush case 均核对版本 marker；独立 clean 安装与全 170 下载由 [主任务验证](../verification.md) 单独负责。

所有真实执行失败保留并明确分类：沙箱启动、错误 locator、生成期间导航销毁、误求窄屏 Network SVG、检查源副本被误发现、Line 空集合谓词、Sunburst 三叶最小数量 / 懒加载入视口顺序、path 字符串约 1e-13 差异，以及真实 Brush 容差膨胀。修正私有脚本没有弱化必要文字 halo 或 Brush 的业务断言。

边界：浏览器 WebKit 不是 Safari 实机；模拟媒体不是操作系统完整主题验收；普通 DOM / 键盘日期操作不是 VoiceOver 或实体触摸。完整对比度、真实设备性能、任意大数据、真实 Live 接口与断流重连、人工视觉意见回流、发布 / 迁移 / Figma / Git 均保持各自既有状态。未新增图型或更改 Token / 阈值 / B2 治理政策；全部浏览器资源已关闭。
