# 独立边界审查 · 2026-10-06

范围：只读检查 boundary 现有授权、源登记与相对运行导入。所有变异只发生于临时副本，副本与临时依赖链接已清理；真 Registry、freeze、map、产品、Token、phase 未改。

被测 boundary SHA-256：`8b37d7001234ba773604aa9096591bcefece5f2d322e0ac7f1a694e25dd8fbbd`。基线 boundary 与 B2 均有真实通过输出。

| 变异 | Boundary | B2 |
|---|---:|---:|
| unknown-ui-control | exit 1 | 未运行 |
| registry-self-registration | exit 0 | exit 1 |
| freeze-self-registration | exit 0 | exit 0 |
| regression-map-self-registration | exit 0 | exit 0 |
| runtime-imports-data-domain | exit 0 | exit 0 |

实质问题：

- `addRegisteredScope` 直接把可编辑 Registry 的 shared/files/sourceSnapshot 键扩充为源名单；新增未知 UI 文件同时写入 shared.files 可使 boundary 通过。B2 的单独 Registry SHA 锁会拒绝这项，但不能替代 boundary 自身验证。
- `addRecordedSourceKeys` 读取 freeze 的键而不验证登记输入；添加未知根 .ts 与全 0 的假文件 hash 可使 boundary/B2 通过。
- regression-map 的 testFiles 同样能自登记未知测试并通过两项检查。
- 已登记运行源 `packages/ui/src/navigation/navigation-families.tsx` 可相对导入新 `docs/ai/unauthorized-boundary.ts`；数据域跳过使未经登记的可执行源进入运行依赖，两项检查仍通过。

完整 payload 在同级 `boundary-independent-2026-10-06.mjs`，每项 CLI 的原始日志与结果保留在本目录。root 与 boundary owner 已收到待修项目，本记录不声称修复通过。

初次 Vite 不可解析、第二次临时路径别名导致 B2 CLI 未实际进入 main 的尝试分别保留在 `-initial-incomplete`、`-alias-noop-b2` 目录；这些 B2 exit 1/0 均不作为治理拒绝/通过证据。当前运行使用真实 canonical 临时路径，并要求成功结果实际打印。

B2 上轮 3 个回归与正式 verifier 通过日志已核实保留。今日测试类型检查先出现 owner 参数推断 TS2353；仅给 B2 自有 parser 的 owner 默认空字符串后同一 tsc exit 0，0 字节错误日志见上级 `tailwind-typecheck-green-2026-10-06.log`。
