# P6 Input Group 说明文字独立修订候选

日期：2026-10-17（Asia/Shanghai）。当前为独立候选，未合并 card-v2，root 已完成构建产物的浏览器文字核对，用户已回复“确定。”确认当前说明修订候选。

## 范围

仅修改 `apps/playground/src/docs/components/g5-component-pages.tsx` 两行：

- InputGroup 状态改为“现有控件本地组合 · 当前用法待审阅”。
- 当前说明补充“复用 Input 与 Textarea，无独立 InputGroup 公共导出。”

其他页面的状态分支、API/source 指向与交互保持原样。公共 Textarea 与其组件合同未修改。没有新增测试、组件、公共资产或验证框架。

[原文件](before/g5-component-pages.tsx) / [两行差异](input-group-copy.diff) / [来源与修订后 SHA](source-record.json) / [保护核对](scope-check.json)。

## 实际验证

| 检查 | 本次结果 | 日志 |
| --- | --- | --- |
| 既有 G5 页面测试 | 1 文件、10/10 通过，0失败 | [日志](g5-component-pages-test.log)、[完整结果](g5-component-pages-results.json) |
| playground 类型检查 | 退出0 | [日志](playground-typecheck.log) |
| playground 构建 | 退出0；保留既有大分块提示 | [日志](playground-build.log) |

命令、退出码与耗时见 [checks.json](checks.json)。仅验证此独立候选，不声明整库重跑或发布性能通过。

首次检查因副本未包含4份原有 Registry JSON 与 `tests/node-runtime.d.ts`，在测试收集和类型检查时失败；补入完全相同的依赖文件后，上述三项复验通过。[首次记录](first-attempt/checks.json)与日志保留；[补入闭包](closure-dependencies.json)没有修改上游来源。

## 源保护与运行环境

已比对 646 个副本输入，唯一差异是上述页面，两行删除、两行新增。原文件 SHA 未变；原公共包 2492 个文件0差异；原绑定仍为 `db36f041dc9326c15ad0d6d4c9858e3db9e0db0b0a11191621ca956c267525d0`。这不是重新运行完整历史绑定治理链。

独立复制 playground 与 prototype 的源码、资源及基础配置；包源码通过 `packages` 链接只读复用，依赖条目链接原有 node_modules，Vite/Vitest 缓存目录留在本副本。没有安装依赖、修改原应用/公共包/Starter/封存签名或验证器。该副本依赖原工作树环境，不是可离线分发的 Starter。

## 预览

在此候选根目录运行：

```sh
pnpm --dir apps/playground exec vite preview --host 127.0.0.1 --port 5520 --strictPort
```

打开 [Input Group 修订候选](http://127.0.0.1:5520/#input-group)。本执行者未启动预览服务或浏览器；由 root 独立启动并检查。

未执行 Git 提交、推送、发布或 Figma 写入；未自动提升 Human Gate。

## root 实际浏览器检查

root 于2026-10-17启动5520并实际打开构建产物，核对页头“现有控件本地组合”及无独立公共导出的说明。[检查画面](../../../.worktrees/card-v2/evidence/runtime/g1-g6-closeout-2026-10-17/run-01/p6-current-review/input-group-candidate.jpg)、[本轮整体复核](../../../.worktrees/card-v2/evidence/runtime/g1-g6-closeout-2026-10-17/run-01/p6-current-review/review.md)。原库未合并，当前候选说明已获用户确认，见[本轮确认记录](../../../.worktrees/card-v2/evidence/runtime/g1-g6-closeout-2026-10-17/run-01/p6-current-review/manual-acceptance.json)；原库仍未合并。
