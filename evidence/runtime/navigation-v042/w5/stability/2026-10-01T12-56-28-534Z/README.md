# Grading：未遮罩自然连续五帧诊断

保留初始矩阵的不稳定两图，本补测独立记录自然稳定截图对。未修改实现 CSS、未注入截图样式、未 mask；同一真实 DOM 状态连续捕获五帧，每帧保存几何、computed styles、焦点、hover、动画和 SHA。

四个案例首帧到第二帧均只有 textarea 圆角 9 个像素改变，最大通道差 1；第二、三、四、五帧逐字节 SHA 完全一致。computed/几何/焦点/动画指纹五帧一致，未获得动画或焦点漂移证据。首帧可能触发栅格预热是推断，未验证底层 GPU 机制。最终自然稳定对另标 `finalStablePair` 为第四、第五帧；不把原初始对标为稳定。

| Case | Width | Frame 2=3=4=5 | Computed/geometry stable | Final stable pair |
| --- | ---: | --- | --- | --- |
| S4-grading | 1440 | True | True | S4-grading-1440-frame4.png, S4-grading-1440-frame5.png |
| R4-grading | 1200 | True | True | R4-grading-1200-frame4.png, R4-grading-1200-frame5.png |
| R4-grading | 1440 | True | True | R4-grading-1440-frame4.png, R4-grading-1440-frame5.png |
| R4-grading | 1600 | True | True | R4-grading-1600-frame4.png, R4-grading-1600-frame5.png |

页面/控制台错误均0；捕获期实现 SHA 未变：True。完整数据：[stability-report.json](stability-report.json)。该记录说明截图稳定性，不表示原稿视觉验收。
