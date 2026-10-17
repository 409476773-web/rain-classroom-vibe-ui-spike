# 图表工程遗留 · 2026-10-11

本轮只修改六份归属文件，不修改图表运行时、Token值、B2合同、danger文字政策或历史测试断言。精确改前/改后快照在 `before/` 与 `after/`；逐文件与合并差异见 [exact-file-diffs.json](exact-file-diffs.json) 和 [combined.diff](combined.diff)。

## 改动

- Toast两处 `getByRole` 移除不支持的 `exact`；字符串名称本来精确匹配，原行为断言保留。
- 两份旧Playwright配置将 `reducedMotion: "reduce"` 放入 `contextOptions`；保留减少动效、浏览器设备、地址、测试及输出配置。
- 从现有Token生成器重建合同；仅删除三条旧China列表消费者。所有其他生成输出字节保持不变，事实见 [generation-results.json](generation-results.json) 与 [china-consumer-generation-delta.json](china-consumer-generation-delta.json)。
- Network Manifest仅将自动验证枚举恢复为 `scoped-passed`；scope、humanGate、确认与其它字段逐值断言不变。现有索引生成器只更新Network行，事实见 [asset-index-generation-delta.json](asset-index-generation-delta.json)。

## 实际检查

改前类型检查、Token生成一致性、资产索引检查均退出1，日志与命令见 [baseline-checks.json](baseline-checks.json)。

改后 `pnpm typecheck` 退出0，包含所有workspace包和测试项目。Token生成 `--check` 与资产索引 `--check` 均退出0。Toast、图表颜色、资产索引与Token生成相关四文件共29项：26通过、3项治理失败；没有删除或修改旧断言。实际命令、时间、退出码与日志见 [verification-results.json](verification-results.json)。

## 既有治理失败

两处资产索引测试在调用冻结B2历史验证时失败；一处Token测试期待8项既有danger文字例外，但同一阶段授权验证失败，8候选未进入接受列表，返回0。使用主任务755文件改前快照的phase与当前同一验证器分别执行，两条验证路径在改前与改后均返回逐字相同的冻结B2历史错误。工程专项执行时，phase、两个验证器、登记生成源及两个原测试文件的hash与改前快照相同，证据见 [governance-baseline-proof.json](governance-baseline-proof.json)。后续仅回写图表阶段记录；最终B2历史子阶段逐值不变，见[合并收口事实](../closeout-verification.json)。

资产索引在改前另有已知生成陈旧问题，会先于其后面的B2断言失败；本轮修正索引后露出已有B2断言失败。当前索引引用/闭包/生成内容检查已通过，不据此宣称全仓治理通过。本轮不扩大修复到B2或danger政策。

未重跑会覆盖历史证据的旧浏览器截图套件；图表体验与真实浏览器验证由第二批主任务单独执行。
