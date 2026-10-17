# 真实公共工厂与当前 trendCurve 宿主复核

只读复核未发现当前样本的阻塞问题。直接从 `shared.tsx` AST 提取并执行实际 `trendCurve` 函数，未复制或猜测其判断逻辑。`chart-data.ts` 的数据生成与断言函数也从当前源码提取执行。全部源码哈希在审计前后保持相同。

UI 公共 index 实际重导出 `@visx/curve` 4.0.1-alpha.0。该包读取 `@visx/vendor` 4.0.0-alpha.0 中的 `vendor-cjs/d3-shape`；本次直接取这两个实际公共函数，并以对象身份确认与 vendor 原始导出相同。UI 直接依赖的 `d3-shape` 3.2.0 并非这两个函数对象，本次没有用它代替实际公共工厂。包入口及 Natural / Monotone 源码哈希已记录。

| 当前数据范围 | 序列数 | Natural | MonotoneX | 原始点与峰谷检查 |
| --- | ---: | ---: | ---: | --- |
| 6 个数据键 × 3 次更新的完整 24 点序列 | 18 | 9 | 9 | 全部通过 |
| 同一当前数据的前 7 个观测点 | 18 | 14 | 4 | 全部通过 |

前 7 点中实际 markers / dashed-tail 宿主使用 enrolled、returned 两个键，三轮共 6 份实际序列；其余 12 份为同一当前数据的补充前缀核对。实际 `trendCurve` 所选工厂在全部 36 份核对序列上准确经过原始点，没有新增或丢失峰谷，没有负值；完成率在 0–100% 内。导数零点按三次曲线逐段解析求解，平台仅计一次转折；允许既有峰值移动到两个观测点之间。

9 个实际调用位置与源码行号已存入结果。明确 Linear / Step、手动曲线选择与 Composed 默认选择继续走现有调用条件，不将本次复核推为任意输入或动效瞬间的保证。Natural 的局部原始端点范围过冲仍存在，当前样本选择仅做本轮校准；用户视觉验收仍待整页对比。

当前 shared.tsx SHA-256：`6ca49f7aba3498d2f152ab5a8923c40c53d05a1a6534e1e9c220225ae87ac8c2`，与本轮 170 份下载源码快照一致。提取的实际 helper 函数 SHA-256：`a9727427bd59953cc6e04ee905b007d9f012ce1665b426d30272631521f23fc7`。

证据：`current-native-helper-audit.mjs`、`current-native-helper-audit.log`、`current-native-helper-results.json`、`current-native-helper-source.sha256`。此前独立审计文件未改写。
