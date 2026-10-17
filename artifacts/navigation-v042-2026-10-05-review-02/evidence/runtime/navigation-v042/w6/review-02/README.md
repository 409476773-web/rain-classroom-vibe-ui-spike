# G3 消费页面人工批注第二轮

本轮落实用户11条E2/E3批注，以及后续E3队列密度/满分样式两条批注和E4知识索引固定修复。1343×747是检阅上下文，标题16/22与浅填充样式属于本页既有响应式组合，不只作用于这一窗口。

E2：活动分类→参与小组→提交/成员详情保持主次；摘要收紧，提交按观点/观察依据/下一步验证组织；15个模拟学生使用公开Avatar真实本地资源，三组实际4/5/6人，学号、分工与头像在活动切换时保持；反馈使用公开filled Textarea。

E3：报告标题16/22，学号/题号同排靠右，窄容器自然换行；次维采用已有白底browser肩头Tabs，题干、答案、评分参考是真正panel；去掉重复说明；filled InputNumber保留数字编辑区5ch与0–20整数约束，取消fullWidth；filled评语框；队列更紧凑，满分为普通辅助文字。选题/选人切换仍由稳定业务key隔离草稿，布局操作不会保存。

E4：根因是工具栏固定按钮未标记为workspace操作，外部pointerdown先关闭临时面板、移除条件按钮，click不能完成固定。仅本页按钮接入既有data-workspace-action=pin和当前viewportWidth；宽度足够时正常固定，宽度不足时保留临时面板和展开请求。没有改共享布局适配规则、回放其他源码或CSS。修复前后真实鼠标证据见e4/pin-red.json和pin-green-final.json。

验证记录：unit-final.log、typecheck.log、compat-browser.log、independent/summary.json、protection-independent.json；新可编辑包的verification/summary.json记录复制包类型/单元/构建与静态预览；archive-independent.json记录独立解压检查。保留红测、错误测试假设与更正过程，失败记录不会当作成功。

一次误用旧浏览器配置指向已停止的5198服务导致13个连接失败，保留在compat-browser-wrong-config.log/json；本轮正式兼容配置指向核实的5204，正确结果在compat-browser-results.json，旧review01/W8归档不覆盖。

公共Foundation/UI/Layout、Tokens、Registry/manifests、旧R/S、E1/E5/E6与四个旧ZIP保持。此次不代表G3人工通过；全仓历史质量、对比度、VoiceOver、实际Safari、发布、迁移、Figma与Git边界独立。
