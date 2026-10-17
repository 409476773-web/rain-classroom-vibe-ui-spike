# 旧导航 closure fixture 诊断

当前源工作区 `/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2` 的 Prototype 独立服务 `http://127.0.0.1:5205`，已核对实际路由与 `NavigationRebuildPage`。不是独立交付包验证。原 spec 完整复制且 SHA256 `04c40b238b9074a50536ed3f4b797f65f83347ac5777604a72cb8ee7caf25183` 始终一致；没有产品/断言修改。

原两失败 S04/S06 **2/2 通过，2.753s**；随后按授权原文件 S04/S06/E10/S02 **4/4 通过，5.432s，0 failed/skipped/flaky**。第一次 grep 锚定错误导致未收集用例，日志保留在 run-01-no-tests.log；不称通过。

root 的共享配置最小归属修正把整个 spec 从默认 chromium 移入 chromium-prototype。真实 discovery 前后 **737 → 737**：4 条迁移、733 条未动、0 丢失、0 新增、0 重复。所有原始 case ID、稳定身份和 project 位于 discovery-comparison.json；`--list` JSON 的 skipped 只是 discovery 形式，不是运行跳过。

原 spec 截图相对路径为旧 `evidence/runtime/navigation-rebuild-v03`。本诊断 cwd 使用 `/private/tmp/rain-nav-v03-diagnostic-bhfljo6i`，生成 4 张截图从临时目录复制到新 screenshots/。**227 个历史证据文件、31 个 Prototype 导航产品源文件哈希一致**，原 spec 未变。旧全仓记录仍是 **172 passed / 5 failed / 516 not-run**，此新增成功不改写旧记录，不声称整体质量门已过。

主要证据：results.json / run-03-full-spec.log（四项）、results-02-two-cases.json / run-02.log（两项）、discovery-comparison.json（完整集合）、host-ownership.json、protection-before.json / protection-after.json、summary.json。
