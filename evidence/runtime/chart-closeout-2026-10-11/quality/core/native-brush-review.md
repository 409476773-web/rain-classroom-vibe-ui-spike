# 当前 Brush 补修独立只读复核

结论：当前已测范围未发现 critical / important 阻断。复核读取当前两个 native 文件及公开 Visx4 类型入口，没有修改运行源码。

- `chart-brush.tsx` 的 `updatePixelExtent` 以原生 ref 的实际 `state.extent.x0/x1` 为准，由当前时间尺度反解 Date 毫秒。preview 与 commit 共用同一转换；原 callback 的其他 bounds 字段保留。Visx 的命中容差不再进入受控日期窗口，避免回传后每端多 2px。真实连续 resize、commit、pan 的原值由 [12 项浏览器事实](../themes/brush-next/summary.json) 保存，最终 pan 最大宽度差约 5.68e-14px，而原 RED 每例差为 4px。
- 正在 brushing 时仍跳过外部 selection echo 对 start/end anchor 的更新；非拖动的控制值／reset 仍用原生 getExtent/setState 同步 hit targets，不额外发 onChange。`null` 原样返回为 null，受控 null 仍 getIdleState，窗口和 overlay 没有被虚构成完整已选状态。当前 unit 覆盖真实 100→320→350 preview/commit、外部 reset/null、同 DOM 和无回授；主任务 [13 项 GREEN](../../brush-import-extent-green.log) 与原 [1 RED / 2 PASS](../../brush-extent-red.log) 分开保留。
- `Bounds`、`BrushProps`、`BrushHandleRenderProps` 从 Visx4 声明的 `.` 公开类型出口读取；内部 ref 类型由 `NativeBrushProps.innerRef.current` 派生，未访问包未导出的深路径。Rain `ChartBrushProps` 和选择回调签名保持原样。私有 core 类型检查在修正后 exit0；独立 clean consumer 是主任务另行负责的证据。
- 从本轮 783 文件基线逐字节核对 source-lock 中全部 181 native 文件：仅这两个文件变化，其余 179 文件保留，完整 SHA 列表见 [native-brush-review.json](native-brush-review.json)。实际宿主调用只有 `line-trio-brush`，仍为原 30 条数据、时间读取和原生窗口；Area 临时 Segment 选择、Composed 不冒充当前 Brush 调用。

范围保持：旧 Brush3 与4 缓存源码的 SAFE_PIXEL / getDomainFromExtent 同样有容差膨胀，旧3浏览器没有重跑，因此这里只确认当前源码原因与新版本下的真实修复，不声称旧版本实测。自动化三引擎与受影响 dark/forced 四项不是 Safari 实机、VoiceOver、触摸、任意外部输入或全局图形对比度验收。
