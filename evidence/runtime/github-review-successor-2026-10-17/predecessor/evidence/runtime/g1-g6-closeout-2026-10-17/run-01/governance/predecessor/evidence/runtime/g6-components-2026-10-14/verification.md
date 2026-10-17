# G6 Task 1 治理接入验证

日期：2026-10-14。工作区：card-v2；System Mode；仅有限治理接入检查点。G6整体实施仍进行中，人工/对比度/发布状态未提升。

## 实际运行

- RED：新 g6-governance.test.ts 的3项先失败；正例复现旧 Library 拒绝新增 G6 阶段，另两项确认尚缺 G6 限定校验入口。随后做有限后继。
- GREEN：pnpm exec vitest run scripts/g6-governance.test.ts scripts/library-governance-closeout.test.ts：2文件、15测试通过。包括旧 Gate、额外阶段/依赖、无关源码、扩大绑定、伪造 before、重签 helper 等拒绝路径；旧 Library 的12项回归保持。
- 依赖安装后确认 UI package 差额仅为 @shadcn/react@0.3.1、embla-carousel-react@8.5.2、input-otp@1.4.2；dependencyInstallation 已记 completed。安装后上述15项再次通过。
- 只读调用 verifyG5Components() 通过：8能力/5资产/70登记paint/34原生paint；既有 humanGate=awaiting_human，contrastAcceptance=not-granted。没有直接运行写旧 scoped-governance.json 的 CLI。

## 当前边界

新源码可以先在已登记独立路径编写；reserved/unbound 不等于已验证资产。三项依赖已安装；公共出口、Registry、扫描和真实构建/浏览器仍由主代理整合。当前 seal 必须在这些精确修改后更新并重验。

尚未完成G6全量测试、构建、独立源码消费、浏览器/可访问性/视觉验收；旧G5颜色发现仍保留。未提交、推送、发布、写Figma或迁移业务。

## 后续精确接入与验证

先审阅本轮有限差额，再在 card-v2 工作区运行：

```sh
python3 evidence/runtime/g6-components-2026-10-14/refresh-source-bindings.py --bind-new
pnpm exec vitest run scripts/g6-governance.test.ts scripts/library-governance-closeout.test.ts
node --input-type=module -e 'import { verifyG5Components } from "./scripts/verify-g5-components.mjs"; console.log(JSON.stringify(verifyG5Components()));'
```

更新工具只写新 G6 source-bindings 和新治理模块的 seal 常量；before、原 baseline、旧源码与旧证据必须仍匹配，未授权依赖或治理模块正文变化会中止。无 `--bind-new` 时新增预留文件维持未绑定；已有绑定和公共文件仍按当前字节更新。维护工具不是执行验收，运行后仍须完成测试、有限差额审阅与本轮专属验证。不得运行会覆盖旧 G5 scoped-governance.json 的 CLI，亦不得重签旧 Library/G4/G5 证据。


## 2026-10-14 G6 本地制作收口

以上Task 1记录是当时的检查点，保留其原始范围；以下为十二项建设完成后的当前结果。G6本地实现completed，自动检查和独立审阅passed-scoped；人工视觉awaiting_human、contrastAcceptance=not-granted、publication=unpublished。

### 实际交付

- A：复用Data Table Recipe，新增Aspect Ratio、Attachment、Direction；各有独立入口、真实媒体/附件生命周期或方向组合。
- B：Drawer复用Base UI1.8真实四方向/三模态/snap/nested；Input OTP复用1.4.2单输入；Carousel复用Embla8.5.2。具备真实取消保护、失败重试、键盘与手势所有权。
- C：Bubble、Marker、Message完整来源Parts与局改接缝；Message Scroller与Questionnaire复用@shadcn/react0.3.1，演示稳定ID/增量/prepend与逐题回改、条件校验、跳过、恢复和原生提交。
- 11项公开UI、1项forkable应用层Recipe，12个Playground文档入口、12条Manifest、一份精确Registry、AI指南与索引。Data Table不重复安装或移入UI引擎层。
- 来源锁保持固定commit 3ba91b1cc83e1bbe4ab35a422ff2a694849c5048，30份固定源码/Nova/shared CSS/文档许可及engine tarball的SHA256/SHA512逐项校验；原历史source lock目的与兼容字段不改。三新增依赖精确为input-otp1.4.2、embla-carousel-react8.5.2、@shadcn/react0.3.1。

### 当前自动验证

| 检查 | 结果与实际范围 | 证据 |
|---|---|---|
| 本批组件、页面、表格与新/旧治理集成 | 16文件108测试通过 | integration-final.log |
| 桌面1440px/窄屏390px Chromium | 24通过，0失败/跳过/重试；包含12入口、浅深、默认/紧凑、实际复制、焦点、状态恢复与适用reduce/forced-colors | browser-final-green.log、browser/report.json |
| 独立项目接入 | 3真实tarball安装、strict TS、Vite构建通过；11UI与复制Recipe均实际调用；默认/局改/未改兄弟隔离 | consumer-proof.json、consumer/build.log、browser/consumer-local-isolation-{390,1440}.json |
| 实际任务查询 | 12条readAssets/--find均命中，引用真实公开API；此为代理选型与实际消费记录，不是模型基准 | ai-consumption-proof.json |
| 类型检查 | workspace及测试类型检查通过 | typecheck-final.log |
| 应用构建 | Playground与Prototype均通过；大chunk警告保留，不等于性能通过 | playground-build.log、prototype-build.log |
| 锁文件 | frozen/offline/ignore-scripts验证通过，仅三项授权依赖差额 | lockfile-final.log、dependency-install.log |
| 全局治理 | workspace、boundaries、tailwind-b2、token-foundations、evidence五项均通过；颜色可读性开放 | global-checks.json、final-check-*.log |
| 扩展旧阶段回归 | G4/G5/Slider/Select与Library等6文件55测试通过；随后新增补充负例并纳入108集成 | legacy-regression-final.log |
| 完整B2测试 | 182项通过；原用例与负面断言保留，精确后继与旧阶段夹具适配后全量复验 | b2-regression-final-green.log |

### 独立消费与视觉观察

独立包中运行源码逐字匹配工作区，UI tarball包含两处后来补充的测试类型注解差额，已明列，不宣称整个归档全字节相同。原DataTable TSX/CSS复制仍同字节；局改fork只修改export名和一个Root class。三实例逐项沿真实style/className/LocalRecipe/Direction配置局改，实际浏览器验证默认=兄弟且局改有差额；其中Bubble用具名LocalRecipe，其他项不伪称同一种recipe。

保存48张主题/密度与屏宽例子截图，并查看Bubble浅色、Message深色、Questionnaire浅色和Drawer展开/窄屏样式。自查修订了附件整页溢出、轮播导航被house定位覆盖、抽屉半屏Footer不可见等；这属于本轮自查，未代替用户视觉验收。最终可见预览图为screenshots/drawer-final.png，附件窄屏为screenshots/attachment-narrow-final.jpg。

### 精确治理后继与修订记录

原141文件baseline及旧记录/Gate未改。主绑定精确142路径：原141加test-fixture-supplement.json声明的唯一旧B2测试文件；原f81bd719…6a9b受保护字节保留在本轮before目录。182旧展开case/注册参数未减少；合成旧Gate场景恢复经过完整G6验证的前态，实际最新场景仅添加三项精确依赖、三条精确扫描及已绑定的G6词法来源。

另一个真人任务「接入雨课堂设计 Skill」更新的两个RN14源码与一份集成文档作为独立只读观察；current与before、canonical snapshot、旧观察锚点都验证。它们没有加入G6编辑授权或继承验收。缺少/软链/伪造before、重签after、扩大测试补充路径、第三运行来源、第二文档、修改旧Gate与原证明均有拒绝用例。

首版浏览器、集成和完整B2曾失败；日志保留。有效发现已修复，测试操作中的懒加载等待、隐藏原生checkbox的可见入口、自动关闭菜单和折叠夹具入口也修正。B2失败还包含旧literal缺少三项新增、合成阶段混用G6后态及早拒绝错误分类；按精确单文件后继解决。未通过回写旧source lock、旧source-bindings、旧proof或删减原断言来掩盖失败。

### 保留的开放范围

G6颜色台账有688个声明表面对组合测量、111个低于声明门槛的发现、9个eligibility待定及130个native/effect paint观察；这些是候选表面组合与原生效果的记录，不能当作所有实际渲染的失败数，也不能当作已接受例外。动态渐变/蒙版/opacity/Focus仍需真实合成与人工可读性检查。

Safari、VoiceOver/其他读屏、物理触屏与移动键盘、系统中文IME、真实短信/密码管理器自动填充、全库RTL、完整forced-colors、生产数据/服务/性能尚未验证。上传、验证码、辅导回答、问答提交使用本地模拟。未提交、推送、发布、写Figma或迁移业务；旧G4/G5等局部验收不迁入G6。


最终完整B2：1文件182测试全部通过，0失败；运行489.83秒。最终本批集成16文件108测试通过，浏览器24通过；五项治理检查退出均0。此为本地技术收口，人工视觉/对比度/真实设备与发布接受没有提升。
