# W5 业务配方全矩阵诊断复测（非最终完成）

19 组中 18 组完成截图，捕获前后覆盖源码与冻结原稿 SHA 均一致，页面/控制台错误为零。R4 grading-selected 实际选中了第二题与林晓，但旧断言不匹配标题内换行；现已规范空白后断言。普通 grading 的 1440/1200 双图在 textarea 圆角极少像素通道 ±1，原图保留，不用容差冒充指纹一致。

已打开 grading 并排图并结合 geometry 发现：answer x+5px，gradeform width218 vs source304，进而反馈框可见宽度明显小于原稿268。作者正在配方局部修复；公共 Splitter 默认和全局 Token 不变。R4 互动布局、R5 居中幻灯与 filled timeline 已恢复，R6 默认是反馈表单；完整量化差额留在每组 geometry 文件。

本目录只用于修复诊断，不能替代最终稳定双截图、人工视觉验收或其他 Gate。所有旧证据保留。
