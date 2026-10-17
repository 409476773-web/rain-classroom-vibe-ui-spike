# 最终三处失败闭合与冻结候选

最终 source binding：`db36f041dc9326c15ad0d6d4c9858e3db9e0db0b0a11191621ca956c267525d0`。源码与 binding 已停写，供 root 最终统一复验。

## 修改与边界

1. current fixture 首次复制一律排除本轮精确 run-01；随后 default true 仍按原 binding manifest 完整补齐 source/proof/两 view/beforeSnapshot。false 历史视图语义不变，所有真实 current 来源仍在必需闭包。
2. G123 的原 CSS 与 Registry 变异负例只兼容各自明确路径的提前 retained-source 拒绝。原 legacy 条件保留；错误路径、后缀路径、任意 changed 不可通过。
3. Tabs 保留完整当前 shared CSS 正向；synthetic 输入使用已验证 G6 前驱，精确断言并去掉五条登记 prefix imports。原15个 added、marker、授权负例保持。
4. getG123TailwindCandidateOrigins 仅增加完整 public 只读 operation，原 body 逐字保留。每次公开调用结束释放，不跨测试磁盘变异共享。
5. 类型检查另暴露 scope helper 返回推断被擦成 any；仅补 JSDoc 泛型，运行 body 逐字不变。没有改 UI、Token、依赖、旧 proof 或任何原 hook/child/case 预算。

## 串行鲜活验证

以下完整文件结果属于 `12485bce7ec9a05c7fbc0919209bf9e9ef4640ffca8f4bd83f0fc297294d5bb9`：

| 文件 | 通过 | 失败 | 跳过 |
| --- | ---: | ---: | ---: |
| g123 | 12 | 0 | 0 |
| g23 | 10 | 0 | 0 |
| tabs | 12 | 0 | 0 |
| boundary | 18 | 0 | 0 |
| source-isolation | 6 | 0 | 0 |

合计 58 项通过、0失败。Boundary 原18项都实际执行，G123与Tabs原失败均关闭。结果与143a全量失败保留在[原失败矩阵](final-three-original-failure-matrix.json)。

JSDoc 后最终 db36 候选再次验证：

- 来源隔离 6/6，通过公开 clone、每 callback 执行、失败后释放及跨操作磁盘突变拒绝。
- 两条准确 current caller 2/2；425条仅由 CLI 精确筛选未选中，源未增加 skip。
- 类型检查 exit0，见 [final-three-typecheck-03.log](final-three-typecheck-03.log)。
- 实际精确 helper fixture 的 public SystemContract baseline 为空失败数组、exit0：复制46.61 s、验证3.06 s，见 [fixture positive](final-three-current-fixture-baseline.json)。Task7原测试验证 live workspace 的边界另如实保留。

全部测试命令串行、maxWorkers=1。58项完整文件结果仍明确属于12485；与最终db36仅有JSDoc类型差额，精确等价证明见 [transition](final-three-type-only-transition.json)，不拼接冒充同seal整库通过。

## 审阅与后续

独立审阅见 [operation-review.md](../operation-review.md)，无未关闭P1/P2。静态源码与SHA见 [final source hashes](final-three-final-source-hashes.json)；diff检查通过。

本轮确认五类既有 current reader/CLI 调用者的精确 fixture 闭包；RUN根 verification.md 非这些 reader 所需，未宣称此 fixture 为完整 Markdown 交付包。全库单测与正式治理/构建仍由 root 在最终db36候选统一复验；不据此推广人审、对比度、设备、发布或迁移 Gate。
