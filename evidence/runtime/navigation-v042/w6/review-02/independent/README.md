# W6 review-02 独立浏览器复核

最终冻结源码 **60 / 60 通过**：Chromium、Firefox、WebKit 各 20 项；56.865 秒，exit 0，无重试、跳过或 flaky。来源为本地独立 source preview `http://127.0.0.1:5204/navigation-v042-w6-consumer.html`。没有操作用户 5368 标签页，没有编辑产品实现。

最终运行前后逐字节检查 2041 个本地 W6 消费者和公共 Foundation/UI/Layout 运行文件（含图片，不含测试）：0 变化。聚合 SHA-256：`c3e3d2616de6889b93b090f43bf775d00f490d97ff01aece8af40c0432810470`。完整 before 映射与 after 比对分别在 `source-before-final.json` / `source-after-final.json`。

`browser-results.json`、`browser-run.log` 为最后一轮完整结果；`summary.json` 是可复制到候选包的小摘要。`browser-artifacts/` 内 69 张 PNG 均为原尺寸、DPR 1、非 full-page；`screenshots.json` 记录每张像素尺寸及 SHA-256。

| 范围 | 每引擎合同 | 实际检查 |
| --- | ---: | --- |
| E2 | 9 | 1200/1343/1600×747 标题 16/22、摘要实际高度、一级活动卡片完整纵向排列与二级小组差异；filled 反馈实际 Token 色；4/5/6 成员和 15 个唯一身份/学号/分工，Avatar32 真实图片加载、decode 和活动间稳定映射；小组/活动草稿隔离；996 真实隐藏及键盘恢复；800 适配不足临时恢复不改变正文几何、Esc 返回入口焦点 |
| E3 | 8 | 三宽标题 16/22、身份同行靠右、窄容器无重叠溢出；公开 Tabs 的白色 SVG 合并面和肩头实际点域、受控选择和真实单一 panel；Arrow/Home/End/Enter 真键盘及两轴草稿归属；数字编辑区实际比评分列窄、0–20 合同、filled 实际底色；最终两字 placeholder 实测可完整容纳；评分区同一 DOM 常驻、布局操作不隐式保存；三题79px队列完整首屏、普通满分辅助文字；1343×600 正文滚动时评分几何保持 |
| E4 | 2 | 真 pointer click 固定宽容器临时索引后成为常驻、正文正常缩窄，02:10 播放位置/笔记/专注模式保留；600 宽无法常驻时仍为可见临时索引，正文几何保持，Esc 恢复焦点 |
| E1/E4/E5/E6 | 1 | 原行为轻烟：公共范围、课堂定位与临时索引、A 改造不影响 B 草稿/尺寸、E6 边缘恢复入口 |

覆盖原批注观察尺寸 **1343×747**，补充 1200/1600×747、996×747、1343×600；800×747 和 600×747 分别为真实适配不足边界。69 PNG 尺寸分布：1343×747 24 张、1200/1600×747 各 15 张、996×747 6 张，其余三个边界各 3 张。最终 60 项均无运行时异常或 HTTP 400+ 缺失资产。

## 保留的中途结果与判断

历史 review-01 文件及证据未覆盖。以下 review-02 轮次均独立保留日志、JSON 与失败 trace：

- `smoke01/`：E2 Chromium 7/8；错误期待 996 会隐藏活动区域。真实布局能把两侧压到 200px，仍容纳两侧。修正为 996 隐藏/恢复合同，另用 800 检查真正临时适配。
- `intermediate01/`：20 通过、9 失败、1 中断、30 未执行，exit 130。错误要求 inactive Tabs 控制不存在的 panel；公开 `sharedContent` 只挂当前 panel，修正为 selected tab → 唯一实际 panel 的关联。直接点击 sr-only 原生 radio 被可见 label 拦截，修正为真点击 label 后断言原生 checked。为避免重复等待同一定位错误，给本轮确定的测试进程发送 SIGINT，保留完整中断记录。
- `smoke02/`：E3 Chromium 8/8，确认修正的 panel/label 合同。
- `intermediate02/`：31 通过、1 失败、28 未执行，exit 1。Firefox 从最后一个 textarea 向前 Tab 的测试错误期待跨浏览器边界再回卷。
- `smoke03/`：Firefox 996 恢复通过，800 前向回卷失败；`smoke04/` 再次证明问题不由后台页面失焦造成。
- `diagnose-native-tab.mjs/json`：同一隔离 Firefox 对比最小网页、E1、E2。最小 textarea→button→link 的 Tab 正常；E1/E2 页末 textarea 的前向 Tab 不回卷，Shift+Tab 能回到此前 panel。事件没有 preventDefault，document 有焦点，恢复入口 tabindex 0、enabled、non-inert。这是测试回卷假设；未把它误判成产品按钮或焦点 trap。
- `smoke05/`：Firefox 两项真实逆向 Shift+Tab 恢复均通过。最后整轮使用 Chromium/Firefox Shift+Tab、WebKit Shift+Option+Tab，从末尾字段退回位于前方的 toolbar。仅隔离 Firefox 启动全控件偏好 `accessibility.tabfocus=7`；没有修改系统或用户浏览器设置。

所有业务交互均采用真实 Playwright locator pointer 动作和键盘。没有 DOM click、强制点击或程序化 focus 代替人工动作。

原尺寸目视发现紧凑数字框的旧四字 placeholder 末字裁切，root 仅把局部提示「输入分数」改为「分数」。`source-placeholder-lineage.json` 保存唯一文件变化及前后 SHA-256；旧 before 映射保留在 `source-before-candidate01.json`。最终 60 项直接验证改后源码，文字实测宽度不超过编辑区。除这一处提示变化，候选运行源码在各轮间及最终运行中保持。

## 验收边界

本结果是明确范围的独立浏览器与运行视觉检查。G3 人工视觉接受仍待用户；没有代替实际 Safari、VoiceOver、全量对比度、全仓工程 Gate、Registry/公共发布或迁移验收。源码通过也不会单独证明后续编译包字节；若 root 提供新编译候选地址，可补做该候选的定点快照复核。
