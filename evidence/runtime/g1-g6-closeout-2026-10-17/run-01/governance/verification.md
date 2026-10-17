# G1–G6 最终治理链修复 · 2026-10-17

> 本文件保留 `a76b6acc…` 阶段的实际治理链结果。之后的当前候选、只读操作及历史夹具修复见[最终操作边界复验](operation-boundary-verification.md)，整库和正式检查由[本轮汇总](../verification.md)给出。

本修复只改治理辅助、验证器与必要测试／fixture。主任务另改两份入口、Starter 导出、浏览器测试采样、标准测试类型及默认测试预算；它们以准确旧字节纳入有限后继。本修复没有改 UI、Token、依赖、锁或旧证明，没有重签旧 source-bindings/source-lock/人工接受记录。

最终来源绑定：`source-bindings.json`，SHA-256 `a76b6acc6fe0d45808d1894bd58774ff117f8279b86b72d2532e5849aa27192a`。全部源码与此绑定自最后定向验证开始保持不变；后续只补新日志与本汇总。机器汇总见 `verification.json`。

## 根因与最小修复

1. 原总链止于 G6 → Carousel → Drawer。附件、Composer、Questionnaire 和 Carousel 后续收尾各有 scoped 记录，却没有接入总链；Drawer 把合法新增 phase 节点视为旧 Gate 漂移。新 10/17 后继只消费 7 个准确新增节点，并绑定 214 个现行源、2619 个保留源／原证明。未知节点、旧 Gate、第三份源、旧证明、新绑定和内部符号链接改变仍拒绝。无目录通配放行。
2. 原 G6／Carousel／Drawer 的 2628 文件视图继续执行原 sealed 验证器；原 Questionnaire 的 177 文件视图继续执行其原验证器。两个视图和 live root 旧证明均准确绑定。旧 Drawer 计划缺失的全文以追加 10/15 记录之前的前缀恢复，字节 SHA 正好等于旧封存 `50d63836a403f48129fd7efbd11d083c29cd5fec4d8e804b87c9a56f21720b43`；只写新副本。
3. 共享 CSS 的 4 条 Recipe import、Questionnaire 已授权选择器扩展、Radio／Dropdown 旧合同和 3 个确切 Questionnaire 包子路径 import，原先超出父级清单。现在先核对完整现行字节及原 Questionnaire 合同，再把旧组件规则交回准确前态。两个 Recipe、页面私有依赖、素材和测试逐路径登记；不放开任意 Headless 包或未来目录。
4. Drawer／G6 旧颜色测试把后续现行 CSS 当作原账本输入，造成“剩余 paint”差额。原账本仍核对原准源；当前 23 个 CSS、28 个 JSX、566 项 authored paint 另登记为 `runtime-unproved`，不继承对比度、角色、实际背景、状态或可读性接受。原阈值与已有例外保持。
5. 旧 Select／Slider／DatePicker／G5／G6／Carousel／Drawer 测试混用了后继源与历史账；新增完整历史 reader 又缺原 intake、before 和 retained metadata。fixture 现在按原 baseline/sourceBindings 的有限字段复制证明闭包，以逐项 SHA 相同的投影视图恢复历史源；当前正向仍读 live 新链，负向仍保留原断言或只接受同一被改路径的前驱先行拒绝。没有新增 skip/todo。
6. 通用工作区 fixture 过滤掉了原 `checks.json`，但新有限链需要其原始字节。复制器在通用过滤后只补新 binding 精确列举的证明、来源和两个视图，未扩大目录许可。`tests/node-runtime.d.ts` 与默认测试配置的 before 分别匹配旧 Library after 与本轮初始 SHA。
7. macOS 临时入口 `/var/folders/...` 和 `process.cwd()` 的 `/private/var/...` 是同一真实文件，原字符串比较漏认只读 CLI，导致反复整图遍历。5 个固定入口改用 `realpath` 比较；导入 API 每次新调用仍重验。边界子进程的 20 秒限制保持。
8. G5 的一次纯只读检查遍历 18 份源，颜色读取最低反复进入 144 次完整来源图，造成数分钟同步 CPU。仅将该完整只读调用置于已有 traversal 生命周期；返回／抛错后释放。最终原检查 14.661 秒通过，连续变异／失败／符号链接回归覆盖作用域释放，不把不同突变共享同一通过结果。
9. 完整图多次重验的 12-call 测试实测约 9.9 秒，原 Vitest 默认 5 秒预算不足。主任务把默认并发设为 2、用例预算设为 60 秒，属于验证基础设施预算；既有显式预算、fixture hook 60 秒、边界子进程 20 秒和全部断言保留，不代表 UI 性能验收。

## 新鲜验证

最终 `a76b6acc6fe0d45808d1894bd58774ff117f8279b86b72d2532e5849aa27192a` 上以下全部 exit 0：

| 检查 | 结果 | 日志 |
|---|---|---|
| workspace | 6 个唯一包，661 文件 | `sealed-workspace.log` |
| evidence | 原证据与 Benchmark 检查通过 | `sealed-evidence.log` |
| boundaries | 330 应用源、1499 共享包源 | `sealed-boundaries.log` |
| tailwind-b2 | 原合同及基线保留 | `sealed-tailwind-b2.log` |
| tokens | 登记／来源检查通过，109 consumer 文件 | `sealed-tokens.log` |
| typecheck | 全工作区与测试声明通过 | `sealed-typecheck.log` |
| 受影响测试 | 12 文件，88/88 | `sealed-affected-tests.log` |
| DatePicker 原完整测试 | 6/6，同一最终 seal | `../unit/history-fixture/date-picker-final-02.log` |

边界 fixture 18/18 已在前一稳定 `e33c1294...` 上整组通过，见 `final-boundary-budgeted.log`；其 60 秒外层预算与现在登记的默认值等价，子进程始终 20 秒。Slider 11／Library 12 的原完整测试已在 `bb341242...` 上通过，源逻辑未再改；各 seal 差额见 `../unit/history-fixture/verification.md`，不合并冒充同一轮 29/29。最终全库单元由主任务统一执行，并会再次鲜活覆盖这些用例。

原红态、中间缺件、超时与被终止轮次全部保留；它们没有计作通过。并发源码更新导致的精确哈希拒绝也明确保留为中间结果。`before/`、`fixture-repair-before/` 保存真实修改前源。

## 保留边界

Token 输出仍是 `failed-with-unproved`：3338 项已知低于阈值、567 项资格发现、2876 项等待实际内容／父背景／状态证据的 authored 观察。8 项既有用户接受的文字对比度例外仍低于 4.5:1。`exit 0` 只代表登记与来源检查通过。

未新增人工视觉或正式对比度接受，未关闭 Safari／VoiceOver／真实触摸、包／Registry 发布、Figma、业务迁移或 Git Gate。原有局部接受范围不扩散。
