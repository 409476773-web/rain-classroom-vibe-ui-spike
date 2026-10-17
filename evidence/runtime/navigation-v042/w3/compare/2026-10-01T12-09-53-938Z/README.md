# R3 局部校准后的原尺寸对照

1440×800、DPR 1；原稿采用 W3 冻结捕获，候选用实际路由。两个默认场景与两个真实 DOM 操作状态共 4 对，均双截图一致，页面/控制台错误为零，捕获前后覆盖的样板、共享导航和 Workspace 文件 SHA 不变，冻结原稿 SHA 不变，执行退出码 0。旧目录全部保留。

实际操作了文件首行选择框和第二道错题的加星按钮，原稿/候选状态断言均成立，操作后的原稿双截图也一致。原图未缩放，仅按 CSS 原尺寸裁去额外边缘栅格像素。

已打开 `R3-files-1440-comparison/side-by-side.png` 与 `R3-errors-1440-comparison/side-by-side.png`。两场景的 context、sheet、page-top、table-tools 坐标和尺寸完全一致；errors 搜索位置一致，前 16 个 tree row 的 x/y/height 均一致。第 8–10 个深层 tree wrapper 的 width 仍有 16/40/64px 差额，需结合其 DOM 内缩规则解释。

files 搜索框仍比原稿左移 8px：原稿 search 与 Segmented 位于右侧 `.flex` 集群，二者间距 8px；候选直接作为 table-tools 子项，间距 16px。Segmented 本身的 92×32 与原稿一致，已向作者发送该定位。

官方 Rain 图标形状、文件格式图标、部分 Tag/按钮颜色、脚注呈现等细部仍与冻结原稿有差。图片指标仅用于定位差异，本目录不构成全像素一致或人工视觉验收。当前差额待作者最后调整后，可另建新目录复测。
