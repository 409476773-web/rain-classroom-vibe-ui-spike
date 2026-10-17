# 2026-10-17 本轮验证记录

此记录对应GitHub送审工作树。旧封存证明、首轮失败、修复后定向检查与第二轮完整运行分别保留，不相加、不覆盖。

| 范围 | 本轮结果 | 日志/摘要 |
| --- | --- | --- |
| 完整单元及回归：`pnpm test --maxWorkers=2`，附default/JSON reporter | 319文件 / **3,577项全部通过**；0失败、跳过或todo；退出0 | [完整摘要](checks/full-test-summary.json)、[日志](checks/full-test.log)、[JSON](checks/full-test-vitest.json) |
| 全库运行期间源码稳定 | 3,703项源前后digest均为`1bd71dd41b496cd0a1039518d70b2e11d7df64f0bdec5ff57858013a77a7b9f8` | [前](checks/full-test-source-before.json)、[后](checks/full-test-source-after.json) |
| 正式治理：`pnpm verify:governance` | 最终25源修复后完整退出0，109个消费文件登记通过 | [日志](../github-review-successor-2026-10-17/repair-governance-final.log) |
| 来源接续和旧证明相关回归 | 17/17通过；跨API重新读取与返回隔离负例保留 | [JSON](../github-review-successor-2026-10-17/repair-scoped-final.json) |
| 兼容性专项 | 20/20通过，源码前后一致 | [摘要](checks/compatibility-scoped.summary.json) |
| 原预算超时专项 | 5/5通过，未增加预算；随后均在完整第二轮通过 | [JSON](../github-review-successor-2026-10-17/repair-five-timeouts-final.json) |
| 图标：`pnpm verify:icons` | 退出0 | [日志](checks/icons.log) |
| 资产索引：`node scripts/asset-index.mjs --check` | 退出0；Tag 10项检索修订有独立前后证据 | [日志](checks/asset-index.log)、[检索记录](tag-discovery/verification.md) |
| 全工作区类型与构建：`pnpm typecheck`、`pnpm build` | P5集成修复后均退出0；后续25源的测试类型检查也退出0 | [类型](checks/typecheck.log)、[构建](checks/build.log)、[测试类型](../github-review-successor-2026-10-17/repair-types-final.log) |
| P5集成浏览器 | 13/13通过，0 pageerror，1440px与390px | [行为](p5-browser/regression/behavior-results.json)、[运行日志](p5-browser/result-after.log) |
| 独立本地Git克隆安装及检查 | 依赖重装、治理、图标、全工作区类型与构建均退出0；25项绑定源码与提交一致，运行前后不变，tracked status为空 | [摘要与命令](clean-clone/summary.json)、[安装](clean-clone/install.log)、[治理](clean-clone/governance.log)、[类型](clean-clone/typecheck.log)、[构建](clean-clone/build.log) |

第二轮执行时间：2026-10-17 14:39:47–15:04:01（北京时间），耗时1,453.76秒。绑定文件完整字节SHA256为`67279f58081cbaedc9b36cf8fc223852febbc7c98d5f56b9e7197e0cbaf596ac`，规范化seal为`fee3e674b1696ddc15f1aaf626566e1b8eb1683d174c2a3b3a1142b9d23eb87f`。运行结束后只整理验证、阅读及上传记录；已绑定实现保持相同。

独立克隆对应源码提交`5538f8293458f46a93b284054a13fc87a4ac5e6e`。使用单独的本地Git克隆、完整已提交文件和精确GitHub origin；根node_modules由冻结lockfile离线重装，复用本机pnpm缓存。它验证提交文件闭包和重建能力，不宣称另一个操作系统、全新网络下载或再次完整运行全部单元/浏览器矩阵。随后提交仅补充本次验证与阅读材料，25项绑定源码保持一致。

首轮完整结果为319文件/3,576项，3,561通过、15失败；[原失败及归因](checks/attempt-01/full-test-analysis.md)原样保留。初次类型检查的测试工具声明缺口亦保留在[typecheck-before-final.log](checks/typecheck-before-final.log)，修复后结果单列。没有提高预算、删除负例或把失败改成跳过。

P5浏览器覆盖标准Select、只读、跨筛选选择、失败重试、已保存快照重开、焦点、键盘及手机页内跳转。原手机锚点路由失败和修复见[集成修复](p5-browser/anchor-integration-fix.json)。画面：[桌面](p5-browser/regression/desktop-initial.png) · [390px](p5-browser/regression/mobile-390-initial.png)。页面数据、上传和保存为本地模拟。

本轮没有执行完整`pnpm verify`或全库Playwright矩阵，也不据此宣称Safari、读屏、物理触控、完整对比度或生产服务通过。旧批次截图和数字仅用于原范围溯源。原card-v2工作树保持原样，见[保留证明](original-worktree-preservation.json)。
