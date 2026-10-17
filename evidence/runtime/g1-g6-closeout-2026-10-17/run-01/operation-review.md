# Operation boundary 独立只读审阅

## 已审候选与范围

审阅对象为 binding `4340bc16cbc3f0f9439db1e85f576344285a6c527828d562a4dcb5db8714891f` 对应候选，比较基线是 `governance/operation-boundary-before/scripts/`，不是 HEAD。精确复审五个文件：

| 文件 | 已审 SHA-256 |
| --- | --- |
| `scripts/verification-helpers.mjs` | `a95e7381de1e0ddaf85d2b7d1082943f6e6fc92cf806674c537471d148ac393a` |
| `scripts/verify-token-foundations.mjs` | `6a321a3e29bc023ba39540668c0b7af69d82e249198cfe9219a51ee5a2fba912` |
| `scripts/verify-tailwind-b2.mjs` | `91fec62a7b7287c72bf9713ff8e30b4adf361352270dd90591a39aa64a6c697e` |
| `scripts/verify-tailwind-b2.test.ts` | `8c342fe2a5ad9022a3c98fdc4d74e2e4298055a7b5e6b16eb7123ccf59bbc329` |
| `scripts/g1-g6-closeout-governance.test.ts` | `716a10f405e4cc8c3b424563e5be01da9894d47a259470850b4db90630adf1c5` |

范围包括 scope helper、颜色验证、Tailwind 系统合同、Task4 历史 fixture 构造，以及新增 ButtonGroup 完整来源读取作用域与 nested callback 回归。四个 operation 的原算法保持；差额没有删除来源、路径、Gate、阈值或负向断言。

## 发现并关闭的问题

初审发现固定 callback key 碰撞：旧 `withSourceBindingTraversal` 把整个 operation 的返回值缓存在 `verification-command/root/undefined`。在一个外层 scope 中，两个不同内层 callback 返回了 `["first", "first"]`，第二个 callback 没有执行。若把逐文件颜色验证直接套入该实现，后续文件会跳过自身 source/outputs 检查。该实质问题已反馈并在候选内关闭。

新 helper 只建立/释放 traversal 生命周期，每次都调用 callback；缓存仍由具体来源 reader 管理。reader 的 name/root/serialized status 键与公开记录的 `structuredClone` 保持。普通导入 API 最外层返回或抛错后在 `finally` 释放 map；既有同步只读 CLI command 生命周期没有扩大。

`copyTask4GovernedFixture` 的三个调用均先创建独立临时 target；构造读取 workspace、写 target，构造返回后用例才变异 target。该包装没有把后续 mutation/revalidation 纳入同一次只读 source scope。ButtonGroup 读取的原授权、原 binding 哈希、before/retained 验证及局部 JSON 转换仍逐次执行。

## 轻量验证与结论

本审阅者仅执行无文件写入的 Node 微检查。修复前观测为：`result=["first","first"], callbacksExecuted=1`。修复后为：

```json
{"a":["first","second"],"b":"fresh","c":"different","thrown":"probe","calls":["first","second","after-throw","next-public"]}
```

同时核阅治理代理生成的 `governance/operation-boundary-red.log` 与 `operation-boundary-green.log`：新增 nested callback 回归先因同一碰撞失败，再通过。该定向选择只执行新增用例，过滤项不计为通过。

对上述候选差额未发现未关闭的 P1/P2。未修改任何源码、binding、历史证明或 Gate；本文件是 root 后续明确要求新增的审阅证据。未执行磁盘突变、整库测试或产品 UI 审查；本结论不替代正式定向/完整回归，不授予视觉、人审、对比度、无障碍或发布结论。后续候选如有新源码差额，需要单独追加审阅。


## 94caa7bc 候选新增差额

追加审阅 binding `94caa7bce705dc76cf5f1a215ddeb77868a228adc7c6df70061026cd0a2936dd`，基线为 `governance/operation-boundary-second-before/scripts/`。精确新增差额共五文件：

| 文件 | 已审 SHA-256 |
| --- | --- |
| `scripts/verification-helpers.mjs` | `4190933b7a97cef2218046744e36bc2a305554ca9c6829c8bd1f995a892a208c` |
| `scripts/g1-g6-closeout-governance.test.ts` | `68573744e22ece0cecaea043536772cd3bedd96d50e5e055c19ce6921cb418ad` |
| `scripts/verification-helpers.test.ts` | `ce55ff3371c0cb18c6cb12cbbc0be7f8df469e53fe9532a708bdc6669bbca9a4` |
| `scripts/verify-tailwind-b2.test.ts` | `e354c51c90dc47f52fa0d78ad0118ed68a21f882d7de6402f0405bb2ba5834fd` |
| `scripts/dropdown-family.test.ts` | `a911601ae95eb31068605886a7d92d167424f393422943932b2288a566418cc5` |

私有 `getG6SourceBindingView` 没有导出；无 clone 的分支只供该函数使用。公开 `getG6SourceBindings` 始终显式 `structuredClone`；仅 `getG6PreviousSource` 直接借用私有 record，返回不可变字符串或 null。该 getter 没有修改借用记录。其他旧 owner reader 继续获得隔离快照，reader 缓存键与 operation 返回/异常后的释放逻辑未改变。

本人执行无文件写入的只读轻量检查：在同一 scope 内污染公开返回的三个嵌套字段，下一公开记录仍与原值深等，scalar getter 仍返回真正旧 phase 字节。通过只在内存暂时计数并恢复 Node 的读取函数，观察当前根 binding 的实际读取次数：

```json
{"isolated":true,"scalarMatchesOriginal":true,"readsInsideOneScope":1,"readsAfterNewPublicCall":2,"readsAfterNewScalarScope":3}
```

这证明新公开调用和新 scalar operation 会重新读取绑定；本审阅者没有改写磁盘来模拟来源漂移。另核阅 `governance/operation-boundary-source-isolation-final.*` 的六项正式通过记录：它包含先正向、再逐次磁盘变异、复原后的来源/Gate/旧证明/符号链接拒绝，以及新增公开返回污染隔离。该 Vitest 由治理代理运行，非本审阅者重复执行。

新增两个测试作用域均不跨 source 磁盘变异。Helpers 用例只变更内存中的 status、outputs、字符串；B2 real-source 审计只构建到独立临时 outputRoot、变更内存 Map，并在 finally 删除临时输出，既有构建子进程预算保持。核阅的 `operation-boundary-helpers-final.*` 仅选定一项通过，另外244项是命令选择过滤，未计入通过数。

Task3 的 composition fixture 使用已校验 SHA 的完整 B2 原归档；仍通过当前工作区的绝对 `boundaryVerifierPath` 启动当前验证器。三个原 import 变异、原拒绝 regex、exit1 与 finally 恢复全部保留；FIFO 的独立四文件 fixture 未改变。当前依赖清单只按已验证 Carousel successor 条件加入 `embla-carousel-auto-scroll@8.5.2`，没有放宽任意依赖。

Task4 构造先验证当前 G6 链并物化其精确前驱，再断言旧 phase 没有 G6；仅从独立 target 精确移除不适用于该旧前态的10/17证明根和其 module。源 workspace 和旧证明原件未被删除；所有调用仍使用 mkdtemp target。Dropdown 测试通过已验证来源 getter 消费原 Registry 前驱，原发布/扩图负例保持。

对上述新增差额未发现未关闭的 P1/P2。Task3 的未变异完整归档 fixture 当前 CLI exit0 独立证据由治理代理另行补齐；该项不以三条负例通过代替。正式受影响批次仍由主代理完成，不据本审阅宣称全量通过。


## 143a38cb 最终小差额

追加审阅 binding `143a38cb306e3c988395dc65dd513331cb620d367038f35dc51fe6b4cfd78ddf`，精确基线为 `governance/operation-boundary-third-before/scripts/`。本轮只涉及：

| 文件 | 已审 SHA-256 |
| --- | --- |
| `scripts/verify-tailwind-b2.mjs` | `91dc4bbd85117ce3736a5e635f9f3bf48ad3e55a74b48f1136642aa430c8e09c` |
| `scripts/select-unification-test-fixture.ts` | `6e6b15bae82e3062b64a0dabb9736f9bbc44bbcba4da75bf923fc0cf8136542a` |
| `scripts/verify-tailwind-b2.test.ts` | `c4ea10f69f3f36f425df5da433e987397ca189c8e437bce5208d7923e19a6db7` |

`validateTailwindB2CompositionBridge` 只新增一次完整公开调用的 traversal 包装，原 body 保持不变。IconButton semantic manifest 用例仍是普通 `it`，没有把整个 mutation 用例放入共享 scope：八次 manifest 写入（两种允许值、六种非法变异）及另一次 phase 删除后，分别调用公开 API；每个调用返回/抛错均释放本次拥有的 scope。原 `20000` 毫秒预算、原两次正向与全部拒绝断言、finally 恢复逻辑均未更改。这里继续保留94c内对每次新 API 读取和快照隔离的审查结论；本轮未改 helper 生命周期或私有 view。

历史 fixture 的过滤前移为显式选项：`copyCurrentGovernanceFixture` 第三参默认 true，全部原调用维持原行为；仅 Task4 历史构造传 false。过滤精确匹配本轮 `evidence/runtime/g1-g6-closeout-2026-10-17/run-01` 及其子路径、以及 `scripts/g1-g6-closeout-governance.mjs`，不会误匹配相近名称。false 同时跳过函数末尾显式 successor 库存复制，避免重新拷回刚过滤的 proof。源 workspace 的 G6 正向验证仍发生在复制前；原 protected/retained/source/concurrent 前驱补全循环在过滤后原样保留。新增两个断言确认 target 不残留本轮 RUN/module。该过滤没有改变当前 fixture 的默认来源校验，也没有放宽旧库存。

Task3 未变异历史基线的待补检查现已完成：核阅治理代理的 `governance/operation-boundary-task3-baseline.log` 与 `.json`，同一当前测试函数 SHA `378f8636972ed0576f694b797e0fa407fa7b710fde66f76ea75a4c6206c3058d` 构造原 SHA `39b6253185367626ddf8f66e6b1cd99ed2e8addd4937e7c93f3c12ad48289280` 完整归档，调用当前 boundary CLI，fresh exit0。其输出确认4个 package manifests、18个 application sources、944个 shared-package sources，并应用来源、依赖、生命周期和层级检查。测试继续使用当前绝对 boundaryVerifierPath；三 import 原负例没有被历史旧 verifier 或宽泛错误替代。

94c 的原始 `operation-boundary-failures-final.log/.json` 继续保留：19个选中用例为18通过、1个 IconButton 用例超过原20秒，另外163项为命令选择过滤。不能把这份记录写成19通过；143a的新定向重跑由主代理另行记录。代码审阅与本段 Task3 正向证据不替代该重跑或之后完整回归。

对本轮准确差额未发现未关闭的 P1/P2。本审阅只读取源码、差异与鲜活日志，没有自行运行重型测试，没有修改源码、binding 或旧证明；仅按明确授权追加本审阅文件。


## 12485bce 最后四项差额

追加审阅 binding `12485bce7ec9a05c7fbc0919209bf9e9ef4640ffca8f4bd83f0fc297294d5bb9`，精确基线为 `governance/final-three-before/scripts/`。比较的是该快照中的真实前态，而非 HEAD；四个当前文件的 SHA-256 均与新 binding 的 `sourceFiles[].after` 相同：

| 文件 | 已审 SHA-256 |
| --- | --- |
| `scripts/select-unification-test-fixture.ts` | `35e7d7c95afe92bda915d27560dcc60d45adbdf5186300a1aac2a7e533892496` |
| `scripts/verification-helpers.mjs` | `144f7f14459a7aa85a758ea005d9f49b690c1f72c0688c70ac81a89073c635d8` |
| `scripts/g123-playground-governance.test.ts` | `53b8cfa4e3cb6ec410a11e17b7831d9ff7ae5fa68c515264ca6e7b17855716b4` |
| `scripts/tabs-governance.test.ts` | `753b22d246a15050a797d89d9331bbc9766fc8ff055c23823aba538b73536276` |

`getG123TailwindCandidateOrigins` 只增加完整公开只读操作包装，原 body 原样移动到私有函数。该函数中的前驱/后继证明、授权、逐项哈希和 lexical 更新算法没有变化。包装只复用本次完整同步读取内的 concrete reader 结果；没有缓存整个 callback 的返回值。G123/G23 的磁盘变异用例仍逐项调用公开 API 并复原，不被套进跨变异 scope。本人在内存临时计数并恢复 Node 读取函数，两次独立公开调用输出相同，当前 binding 的实际读取次数由1增至2，证明新调用重新读取来源。

G123 变异用例保留四项变异与全部原拒绝类别，只为 `packages/ui/src/button-group/button-group.css` 和 `registry/g2-assets.json` 两个明确物理路径分别加入10/17 retained owner 的提前拒绝。新分支以完整 header 和转义后的精确路径匹配，路径后只能结束或换行；其余两个 proof 仍只接受原错误。本人直接从当前测试提取构造 regex 的原代码做纯内存检查：两个精确变异路径与原 legacy 类均接受，wrong path、额外后缀、把点号替成其他字符、泛化 `changed` 均拒绝。没有把任意 Error 当作来源拒绝。

Tabs 仍首先验证完整当前 stylesheet 正向。合成规则变异改用来源 getter 已验证的 G6 原前驱，并断言其开头严格为五条明确注册的 import，随后仅移除该精确 prefix，保留余下全部 CSS。没有放松 parser 的整份 current stylesheet 来源识别。本人执行纯内存检查得到：当前正向 `[]`、exact-five-prefix 为 true、增加 unrelated 规则正向 `[]`、原15项 CSS 变异全部拒绝、几何标记变异拒绝、授权为 false 拒绝。原负例没有删除或 skip；没有把整测试跨磁盘变异放入共享 scope。

当前 fixture 的初次拷贝现在只按精确 RUN 根 `evidence/runtime/g1-g6-closeout-2026-10-17/run-01` 及其子路径过滤；相近名称不匹配。默认 true 仍在初拷后原样调用 `copyG1G6CloseoutFixture`，补回完整 manifest 库存；唯一 false caller 仍是 Task4 历史构造，其精确 module 排除和旧 protected/retained/source 前驱补全没有改变。重算该候选的实际补全 Set：5640个必需文件，其中 RUN 内2806个文件、44,679,507字节，全部处于 governance；必需文件均存在，`sourceFiles` 的每个当前源都在补全集合中。

已静态核对全部 default-true 调用入口：G123 ButtonGroup reader、G23 reader、Helpers Navigation registration、Tailwind Task7 SystemContract，以及 Navigation boundary suite 启动的当前 boundary CLI。前四类消费来源/阶段记录；后者按当前 boundary 规则验证来源、依赖和层级。它们均不启动 verify-evidence、verify-workspace 或通用 Markdown 链接扫描。补全 Set 不包含 `RUN/verification.md`，虽然新 phase/AI README 指向它；因此该精确 fixture 仅声明满足现有测试入口所需来源证明，不能据此声称完整交付工作区或 Markdown 文档闭包。后续若新增证据路径消费者，需要按其实际指针另行有限补齐。

对上述精确差额未发现未关闭的 P1/P2。本人只运行无文件写入、无构建子进程的轻量读取/内存 probe，并核对 manifest 集合；没有执行磁盘变异、整库或重型回归，没有改源码、binding、历史证明或 Gate，仅按 root 授权追加本记录。本节不替代主代理在12485bce候选上运行的定向及完整回归；此前143a完整运行的失败记录仍应保留，不能以本审阅改写为通过。


## db36f041 仅类型注释差额

最终追加审阅 binding `db36f041dc9326c15ad0d6d4c9858e3db9e0db0b0a11191621ca956c267525d0`，基线为 `governance/final-three-type-before/scripts/verification-helpers.mjs`。源差额只有 `withSourceBindingTraversal` 前新增 JSDoc：`@template T`、`root: string`、`verify: () => T`、`returns T`，使调用方保留 callback 的返回类型。helper 当前 SHA 为 `22c979e79226855023579bbd8bb546c520fb2f43510e9300e4bdec21929a728e`。

本人独立逐字核对：从当前 helper 删除这一段唯一精确 JSDoc 后，整个文件与12485bce已审 helper 字节完全相同，而非只比较函数签名或相信 transition 声明。因此 callback 每次执行、具体 reader memo、公开记录隔离、finally 生命周期、CLI 边界和所有实际运行 body 均无变化。

同时独立验证 binding 差额：当前 JSON 中该新 helper SHA 只出现一次；仅将其替换回12485bce已审 helper SHA `144f7f14459a7aa85a758ea005d9f49b690c1f72c0688c70ac81a89073c635d8` 后，整个 binding 的原始字节 SHA 恢复为 `12485bce7ec9a05c7fbc0919209bf9e9ef4640ffca8f4bd83f0fc297294d5bb9`。这证明本次 binding 没有附带改变 source/proof 库存、旧记录、路径、授权或 Gate 字段；当前 helper 实际 SHA 也与新绑定 after 相符。

该独立结果与 `governance/final-three-type-only-transition.json` 的运行等价声明一致。未发现本次有限差额的未关闭 P1/P2；12485bce的运行逻辑审阅结论适用。原58项受影响通过属于12485bce，不能改标为db36f041通过；新 seal 的类型、6项隔离及剩余 current 入口正向由主代理另行登记。本人没有运行重型测试、没有修改源码/binding/旧证明，仅追加本记录。
