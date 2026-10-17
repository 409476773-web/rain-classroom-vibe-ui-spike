# Radar 减少动态效果修复：最终技术验证

当前 runtime 已冻结：`packages/ui/src/charts/vendor/charts/radar-area.tsx` SHA-256 为 `61769a70e807d06cc88abdf1f88bcabdb39ed6fc599868cd3b4edd8a14822740`。修复仅发生在 RadarArea，正常进场参数、颜色、半径、描边、发光和数据保留。

正常情况下仍使用原 1.1 秒进场、0.6 / 0.75 / 0.9 秒系列延迟、opacity 150ms 与 hover spring。`animate=false`、零进场预算、零 transition duration 或系统 reduce 时，进度 duration/delay 均为 0，并直接绘制最终路径与圆点。已挂载的系统偏好通过本地 media listener 更新，卸载清理；共享 hook 与 caller 不改。

运行中切换 reduce 的初测发现：坐标已到终态，但未改变目标值的旧 opacity 动画继续。禁用动画因此使用原生 SVG g，立即应用当前 opacity 1/0.3 和 hover scale 1.05，正常分支仍为原 motion.g。

后续独立 A/B 又确认了静态分支的 hover 中心差异：旧 Motion 实际采用 `transform-origin:50% 50%` 与 `transform-box:fill-box`，静态 g 原为 0px/view-box，导致两宽度 hover 屏幕平移差约 .88/.83px。本轮最后仅在 static 分支补回这两项计算样式，没有调整几何或抗锯齿。`radar-hover-origin-followup.json` 验证移除这两行即可精确恢复原 ab0b 候选源哈希；正常 Motion 参数没有变化。

验证结果：

- `radar-hover-origin-unit-green.log`：8 个实际 RadarChart/RadarArea 单测通过，覆盖显式禁用、系统偏好及动态切换、完整路径/圆点、hover 状态与普通 stagger。新增 origin/box 断言的 RED 保存在 `radar-hover-origin-unit-red.log`。
- `radar-motion-final-after-origin.log`：最终冻结源下 6/6 Chromium 用例通过（1.1 分钟），覆盖 1440/390、默认与六变体、reduce 首个有效坐标、正常 delay/中间帧/终态、数据更新与回放、键盘图例与发光，以及运行中 neutral/hover 的即时 opacity/scale/stroke/fill/点半径；浏览器异常为 0。
- `radar-hover-origin-browser-red-matrix.log`：同一屏幕变换回归在 ab0b 候选的两宽度真实失败，矩阵平移差 .88448 / .82552，几何与颜色断言仍通过。RED JSON 与 traces 保留在 `browser/radar-hover-origin/red-matrix` 和对应 results 子目录。
- `radar-hover-origin-browser-green.log`：同一回归在最终源 2/2 通过（12.8s）。默认与六变体 × 两宽度的 focused 相对屏幕矩阵最大差均为 0；路径、圆点、颜色、fill/stroke/filter/opacity、transform origin 与 box 均与浏览器响应中注入的完整 before 版本一致。没有替换磁盘 runtime 或演示数据。
- 独立 `radar-stable-ab-origin-fixed.log` / `radar-stable-ab-origin-fixed/facts.json`：两个宽度的 before/after 四个检查通过；记录的 idle/focused 计算样式、路径/圆点、origin、CTM/screenCTM、bbox 均相同，原 hover 平移差归零。不同 inline style 表达不影响计算结果。
- `radar-scope-verification.json`：10 个 radar chart/context/axis/grid/labels、共享进度 hooks/animation 和 app caller 文件与本轮 before 字节相同。旧候选报告与 scope 记录保留为 `*-pre-hover-origin.*`。

初测正常变体失败是测试取到预加载 inactive 的旧首帧；最终回放检查等待新 SVG 首个有效记录并断言真实 active 状态，没有削弱正常动效断言。最早记录针对已取得有效尺寸的 SVG，不据此作性能或硬件帧率结论。

当前结论：限定技术修复已完成，runtime 继续冻结。根代理仍负责最终 source-lock、统一类型检查、构建、消费验证与交付记录；不据此宣布整个组件库已发布或生产就绪。
