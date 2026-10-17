# Radar 减少动态效果修复：技术验证

范围仅为 `packages/ui/src/charts/vendor/charts/radar-area.tsx`。正常情况下保留原有 1.1 秒进场、0.6 / 0.75 / 0.9 秒系列延迟、透明度 150ms 与 hover spring。`animate=false`、零进场预算、零 transition duration 或系统 reduce 时，进度 duration/delay 均为 0，并直接绘制最终路径与圆点。

运行中切换 reduce 的首次浏览器检查发现：坐标已到终态，但未改变目标值的旧 opacity 动画继续。修复因此在禁用动画分支使用原生 SVG g，立即应用当前 opacity 1/0.3 和 hover scale 1.05；正常分支仍为原 motion.g，描边、填色、发光、点半径和所有几何公式保留。

验证结果：

- `radar-static-green.log`：8 个实际 RadarChart/RadarArea 单测通过，包括三种显式禁用、初始系统偏好、运行中两种禁用、hover 状态和普通 stagger。
- `radar-browser-final.log`：6 个 Chromium 浏览器用例通过，1440px / 390px 各检查默认和六个变体：首次有效 reduce 坐标、普通中间帧和延迟、终态、数据更新、回放、键盘图例与发光。
- `radar-browser-dynamic-final.log`：2 个运行中切换用例补充验证通过；neutral 与 hover 下的 opacity、scale、stroke、fill、点半径均立即到正确状态，浏览器异常为 0。
- `radar-browser-summary.json`：两宽度均有 7 个 host；reduce 首个有效记录、普通中间帧/stagger/终态和动态切换全部满足断言。30 张本轮 PNG 已保存，默认窄屏视觉检查与 before 几何一致。
- `radar-scope-verification.json`：10 个 radar chart/context/axis/grid/labels、共享进度 hooks/animation 和 app caller 文件与本轮 before 字节相同；最终 area SHA-256 为 `ab0b379bed54bea06db82f52b65e9dbf2a08a59e236c6a167e640acfad12244e`。

初测正常变体的失败为测试选取预加载 inactive 时的旧记录：当前回放确为 active 且几何从零开始。最终测试等待新的 SVG 首个有效记录并同时断言真实 active 状态，没有削弱正常动效断言。初测失败日志与诊断 JSON 保留；通过记录不覆盖失败原因。

当前结论：此 owner 的限定技术修复已完成，runtime 已冻结。根代理仍需统一当前代码的类型检查、构建、消费检查与最终记录；不据此宣布整个组件库已发布或生产就绪。
