# R3 真实边界整合后的诊断对照

R3 files/errors各1200/1440/1600，共6对；另实际选择第一个文件与给第二题加星，源与候选两侧断言成功，2项交互也捕获对照。候选每项两次截图SHA稳定；新交互的原稿两次稳定。零页面/控制台错误，捕获前后源及候选摘要一致。

已打开1440 files/errors原稿与候选side-by-side。真实5px Splitter替代假边界后，context与sheet的x/y/w/h与源一致。文件表头44px、文件行57px、错题行50px已恢复。剩余当时差额：page-top129vs123、files工具条+6px且search左24px；errors filter缺外margin18导致tools/table-12px；Tree上部context-card等结构缺46px，行高42vs40。

Root正在修上述差额；本目录保留修前证据，不能作为修后结果。精确原稿计算样式供修复见 `R3-source-spacing-corrected.json`；`R3-source-spacing-supplement.json`是未清场景preferences造成errors仍216px宽的早期只读诊断，应使用 corrected260px版。

所有图片原生尺寸，无fit或重采样。指标为measurement-only，未宣称Human Gate或像素相同。
