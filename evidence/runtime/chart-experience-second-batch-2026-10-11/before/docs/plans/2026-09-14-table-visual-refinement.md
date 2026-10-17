# Table 视觉调整

用户在只读分析后确认四项：hover 使用 Fill/Neutral/Alpha/5；表头统一较小、较轻、更浅；常规表头44px/普通正文行50px，紧凑表头32px/普通正文行44px；组合控件统一尺寸。

System Mode，仅 Table 部件、资料本地配方及对应合同/证据。表头采用已有 UI Compact 的13/18/400与 Text/Neutral/4；排序按钮沿用 Button text compact，通过具名 Local Recipe 继承表头颜色，保留自身禁用色和焦点。表头取消原正文上下留白，独立控制高度；正文保留原内容留白，指定高度作为单行基础，多行自然增长。CSS 使用直接子级选择器，避免外层表格影响内层密度。

顶部组合采用现有完整尺寸：常规 SearchInput32 / Select32 / Button small32，紧凑 SearchInput28 / Select28 / Button mini28。文字按钮保留其自身内部尺寸，不改 Input / SearchInput / Select / Button 的全局默认值。分页器源码保持已确认版本。

验证：现有三引擎表格矩阵扩展实际表头/行/控件尺寸、标签对齐、表头文字和 hover 色；先记录旧实现失败，再实施。复跑定向单元、类型、构建、治理、浏览器与独立审阅。截图写本批独立临时目录；阶段和 Manifest 据实登记，人工运行视觉与对比度接受保持独立。未授权 Git 提交/推送、Figma、发布或业务迁移。

执行结果：四项已实现；自动验证及独立技术审阅通过，详见 [验证记录](../../evidence/runtime/table-visual-refinement/verification.md)。独立审阅发现并修复 Footer 共用表头弱色的问题，页脚继续使用原 Text/Neutral/2。

色彩资格：Text/Neutral/4 属于弱色，排序标题仍如实登记为 interactive、critical text。普通/hover × Light/Dark 四条实测对比度均不低于4.5，但弱色用于交互标题的资格仍为 pending-review，并未获得接受例外。精确范围验证只登记本批两种表头状态，既有全局规则与正文颜色保持原样。
