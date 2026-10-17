# Radar 独立只读审阅

What this change does: `RadarArea` 在显式禁用、零入场时长或系统减少动效时直接画出最终多边形和圆点，取消系列延迟。运行中开启减少动效时，原生 SVG `g` 立即应用现有聚焦样式；普通模式继续使用原 `motion.g`。

本轮限定技术修复没有发现阻断问题。审阅覆盖当前 owner 与本轮 `before` 的差异、实际公开 `RadarChart` / `RadarArea` 单测、6 个最终浏览器用例、动态切换补充记录，以及共享 hooks、context 和调用方。按当前文档页的默认与六个变体消费规模判断。

- 新 media 订阅使用同一个系统偏好查询，首个客户端有效绘制读取当前偏好，`change` 后更新，并在卸载时移除监听。它只决定此 area 的分支，没有更改共享 Motion 配置。`useMountProgress` 的禁用参数同时将 duration 和 delay 置零；它已有的 cleanup 会停止旧进度控制器。
- `motion.g` / 原生 `g` 的替换发生在 `RadarArea` 内，系列数据、当前 hover、颜色与位置公式仍由未改变的 context 提供。静态分支直接使用同一最终路径与圆点，不靠等待 MotionValue 完成；当前 hover 的 opacity 1/0.3、scale 1.05、fill 0.35/0.15、stroke 3/2、点半径 6/4 和光晕保持原值。
- 普通模式的延迟公式、1.1 秒进场 transition、0.6 / 0.75 / 0.9 秒系列延迟、150ms opacity 和 hover spring 与 `before` 相同。公共 props、数据、共同 0–100 量程、网格、轴、维度标签、色值和图形参数未改变。
- `radar-static-green.log` 的 8 个实际公开 API 用例覆盖三种显式禁用、初始系统偏好、运行中禁用、运行中系统切换、聚焦保持和普通 stagger；真实旧逻辑的零坐标失败保存在 RED 日志。测试包装 `animate` 记录参数，同时继续执行实际 Motion 实现。
- `radar-browser-final.log` 的 6 个唯一用例通过，覆盖 1440px / 390px 下默认与六个变体；`radar-browser-dynamic-final.log` 的 2 项为动态切换用例的补充复跑。首次有效 reduce 记录已达终态，普通记录保留中间几何与延迟，终态、更新和重播与精确表一致，图例聚焦和恢复正常，浏览器异常为空。
- 独立从保存的精确表重新计算半径与角度，确认两宽度、7 个 host 的首次 reduce、普通终态、更新、重播、聚焦与动态切换记录均对应实际 SVG 坐标。运行中 reduce 的 neutral 与 hover 记录均立即到正确的几何和样式。
- 已目视默认窄屏普通模式 `before` / `after`、窄屏 reduce 以及桌面 reduce 首帧对照。普通终态的几何、颜色和布局保持；reduce 首个有效记录补齐此前仍在等待的系列。

再次实际核对 owner SHA-256 为 `ab0b379bed54bea06db82f52b65e9dbf2a08a59e236c6a167e640acfad12244e`，与验证记录一致。`radar-scope-verification.json` 所列 10 个受保护的 chart/context/axis/grid/labels、共享 hooks/animation 和 app caller 文件均与本轮 `before` 字节相同。

结论：此限定技术修复可进入根代理的统一当前代码验证。该结论不代表整个组件库已发布或生产可用；统一类型、构建、独立消费与最终 Human Gate 由根代理汇总。本次只读审阅没有重跑完整测试、改动运行时或扩大共享策略。

## 最终冻结补充复核

前述 `ab0b...` 审阅检查了原始路径坐标和 hover 的数值，未比较 hover 的屏幕变换中心。随后 A/B 记录发现旧 Motion `g` 最终采用 `50% 50%` / `fill-box`，原 static 分支仍为 `0px 0px`；因此此前关于 hover 样式保持的结论需要该补充，不能只靠原始坐标与 scale 1.05 证明。

最终 owner `61769a70e807d06cc88abdf1f88bcabdb39ed6fc599868cd3b4edd8a14822740` 为 static 分支补齐 `transformOrigin: "50% 50%"` 和 `transformBox: "fill-box"`，普通 Motion 分支未改变。已实际只读复核该差异，并独立对 `browser/radar-hover-origin/green/1440.json` 与 `390.json` 的 7 个 host 重算 baseline/current：idle 与 focused 的精确表、路径和圆点完全相同，relativeScreenCTM 六个矩阵值的最大差异为 0，异常为空。此证据补齐屏幕变换中心的保护要求。

该最终源也已进入新 `consumption-final` 宿主，170 下载闭包/类型/构建与同一脚本的 12 浏览器抽样均通过；旧消费目录没有覆盖。最终限定技术结论以该源和补充证据为准，仍保留上文的发布与 Human Gate 边界。
