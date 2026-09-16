# BM-B 浏览器批注1–4修正

用户批注：静态提示使用较浅现有中性色；关闭入口改为Dialog规范IconButton；“宽版容器”“双列布局”不加粗。批注5要求讨论字段标题，未授权本批直接重设计字段标题，保持原样。

本批按System Mode修改BM-B消费者及颜色登记。静态底栏提示由Text/Neutral/3改为Text/Neutral/4，登记为非关键、非交互文字，仍按普通文字4.5阈值检查。尝试的Text/Neutral/5在浅色Background/Neutral/1上仅3.71，已撤回；没有修改Token数值、对比度规则或接受例外。保存中仍为Text/Neutral/3，错误仍为Text/Red/1。

关闭入口复用Dialog.Close + IconButton size=28/20 + 正式可用CloseBoldIcon；来源是现有Dialog Manifest与course-dialog消费者。替代此前BM-B保留文字关闭按钮的局部决定，并在Dialog设计说明记录用户的新指令。两个布局Checkbox使用一个局部Recipe，仅覆盖label为font-rain-regular，公共Checkbox默认字重保持原规则。

验证完成：

- 实际717×760页面读取：关闭按钮28×28、图标20×20；两个选项font-weight均400；浅色提示rgb(86,104,143)，与Text/Neutral/4一致。
- 深色及390×740窄屏截图检查：提示rgb(148,156,184)，关闭点击区完整、无横向溢出。已恢复717×760浅色状态。
- 无修改点击叉号：关闭，焦点返回“编辑教材”。有草稿点击叉号：出现放弃确认，初始焦点在“继续编辑”；继续后确认层退出，焦点返回叉号，草稿保留。检查前的“计算机科学”学科选择已恢复，未保存。
- BM-B状态、IconButton与Checkbox共3文件33项通过；prototype类型检查及构建、完整治理、diff空白检查通过；浏览器错误日志为空。
- 构建仍有既有大分块提示，共享历史对比度欠项保留。未重跑三浏览器矩阵或独立人工验收。

基线与日志：`/tmp/rain-bm-b-comments-20260915`；最终治理为`governance-final.log`，原`governance.log`保留Text/Neutral/5未通过记录。本批没有推进其他Gate、发布、迁移或Git操作。

字段标题讨论依据：实际label与Input内容均14px/22px、400字重、Text/Neutral/1，label间距4px。候选为14px半粗并将间距调整为8px，或13px常规次级色并使用8px间距；尚未形成用户决定，源码未改。

## 批注5后续确认与实施

用户随后明确选择“标题保持14px、使用半粗字重，与控件间距从4px增至8px；输入内容保持常规字重”。以上“讨论中”是此前检查点，已由本次明确决定替代。

共享FormItem顶部label增加14px、semibold以及4px下边距（与原4px gap合计8px）；帮助/错误的4px间距、内部标签、输入内容和原生关联保持原实现。只改一行样式类并同步Manifest规则。

实际BM-B双栏测量8个字段：label均14px/600、label至控件均8px、Input/Select/Textarea内容均400；帮助文字距离控件仍4px。已恢复用户原来的单栏与“计算机科学”草稿，截图检查通过，浏览器错误日志为空。

Input/FormItem、Textarea、Select共65/65通过，prototype类型检查/生产构建、完整治理与diff检查通过；日志与源码基线在`/tmp/rain-form-label-20260915`。本批无新增逻辑或测试框架，没有扩大既有视觉Gate、对比度接受或发布范围。
