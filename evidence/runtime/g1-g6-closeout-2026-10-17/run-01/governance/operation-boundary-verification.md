# 治理只读操作边界复验

最终冻结 binding：`143a38cb306e3c988395dc65dd513331cb620d367038f35dc51fe6b4cfd78ddf`。本轮源码与 binding 已停写。

本轮只修验证基础设施：每个完整只读操作内复用已验证来源；操作结束释放。每个 callback 都实际执行，公开记录始终返回 clone。未改变 UI、Token、依赖、任何历史 sealed proof、拒绝断言或原测试预算。

## 根因与最小修复

- 原 scope 包装按固定 key 缓存 callback 返回值，会把第二个不同 callback 错当第一个；现 scope 仅管理生命周期，只有具名来源 reader 缓存记录。新增 red/green 回归，并验证 throw 后独立调用继续执行。
- 颜色、Tailwind System/Composition、Button Group 前驱读取与旧 fixture 构建缺少完整只读操作边界。原函数 body 保留，只补生命周期。内部前驱字符串 getter 借用 private verified view，公开 getG6SourceBindings 仍 clone。新增公开返回污染隔离，保留下一操作磁盘突变拒绝。
- 旧 Task4 fixture 恢复 G6 前运行源，却残留本轮当前 proof，引发 Drawer consumer ENOENT 并连带误报 Typography/原 CSS 规则。先验证 live G6，再只为该历史调用从复制入口排除本轮精确 run-01 与新 module；随后仍按原 G6 protected/retained 库存补齐原字节。其他 current fixture 默认完整复制后继。
- Task3 原负例换为现有 SHA 绑定的完整原 B2 archive，未变异同一当前 boundary CLI 已 exit0；三个原 import regex/exit1/finally 断言原样通过。依赖正向仅补已验证 Carousel upgrade 的 embla-carousel-auto-scroll@8.5.2 条件。
- Dropdown family 的原固定 Registry 结构测试现先验证当前后继、读取其精确前驱；仍拒绝 publication 与 Select 源图扩张。

## 鲜活结果

全部串行、maxWorkers=1；最终候选合计 39 项选定测试通过，0 失败。CLI 未选中的用例明确记为筛选，源无 skip/todo。此记录不冒充同轮全库通过。

| 分组 | 结果 | 证据 |
| --- | --- | --- |
| operation-boundary-failures-final-02 | 19 通过 / 0 失败 / 163 CLI 未选中 | [operation-boundary-failures-final-02.json](operation-boundary-failures-final-02.json) |
| operation-boundary-dropdown-final | 13 通过 / 0 失败 / 0 CLI 未选中 | [operation-boundary-dropdown-final.json](operation-boundary-dropdown-final.json) |
| operation-boundary-source-isolation-final-02 | 7 通过 / 0 失败 / 244 CLI 未选中 | [operation-boundary-source-isolation-final-02.json](operation-boundary-source-isolation-final-02.json) |

- 原 20 个失败现全部逐条通过，见 [失败闭包矩阵](operation-boundary-failure-matrix.json)。
- IconButton manifest 原显式 20 s 预算未改；每次 manifest/phase 写盘之后都进入新的 public Composition 操作。
- W7 原显式 120 s 预算未改，本轮完整通过；I/O 与 source audit 成本如实保留。
- [原 archive 未变异 boundary 正向](operation-boundary-task3-baseline.json) exit0。
- [私有 view 与原 body 保留核对](operation-boundary-preservation.json)、[最终源 SHA](operation-boundary-source-hashes.json)。
- 独立只读复审记录在 [operation-review.md](../operation-review.md)，最终差额无未关闭 P1/P2。

## 前轮结果保留

- `operation-boundary-affected.log`：4340 候选 203 项，183 通过、20 失败，无源跳过。
- `operation-boundary-failures-final.log/json`：94c 候选选定 19 项，18 通过、1 个原 20 s timeout；未覆盖或改写。
- `operation-boundary-helpers-targeted.log`：旧候选单例 timeout；`operation-boundary-helpers-final.log/json` 是 94c 独立通过。最终同 seal 的 helper 单例在 `source-isolation-final-02` 中重新通过。

全库单测、正式治理、类型与构建由 root 在此单一冻结候选统一复验。本轮没有设备、人审、对比度、发布或迁移验收结论。
