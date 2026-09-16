# RN-15 限定试用交付记录

日期：2026-09-15。用户明确“继续 RN-15”。实现、自动验证与[独立复核](independent-review.md)完成，当前phase已登记本批完成。交付范围是 **M1的BM-A/B限定本地试用**，依据[实施计划](../../../docs/plans/2026-09-15-rn15-delivery.md)；不是完整组件库成熟度或M2交付。

## 试用入口与版本

[一页体验说明](../../../docs/ai/trial-guide.md) · [资料管理](http://127.0.0.1:5324/#bm-a) · [教材表单](http://127.0.0.1:5324/#bm-b)。两页由宿主拥有筛选、选择、草稿与请求；数据、保存和附件均为本地模拟。

沿用已获[用户确认](../rn14-editability/human-gate.md)的固定样本 `rn14-90fc74205a764fb1`。原型源码和改造后的固定样本分开检查；本轮没有修改产品运行代码或样本，没有新视觉验收。归档内 `awaiting_human` 是生成时状态，当前接受以该确认记录和phase为准。

| 范围 | 本次结论 |
| --- | --- |
| M1 BM-A/B | 当前原型关键交互、依赖与固定样本完成自动复查；限定本地试用 |
| RN-05 Dialog / RN-C4 Card依赖 | 技术实现与本批依赖回归通过；各自整体/局部视觉Gate分别保留 |
| 默认资产检索 | 47项候选，均有自动通过登记；失败、未跑和缺失自动结果不能进入默认检索 |
| 排除默认检索的实验资产 | Button、Badge、Surface、Link；BM-A/B也保持local-experiment |
| 整体视觉仍待审的8项候选 | Grid、Inline、Split、Stack、Card、Separator、Table、Textarea；局部已接受范围不清除 |
| M2 / BM-C/D / RN-11/12 | 未实施、未评测，不在本次交付；V2 Roadmap的proposed是规划快照，不倒填历史 |

候选清单和状态来自实际Manifest/Registry；[本次检索核对](asset-scope.json)包含4项排除、8项整体视觉待审和17项仍有独立review findings的资产。后者保留各自颜色/资格问题，不能因本轮单测通过被改成视觉或颜色通过。

## 验证结果

每条命令的原始参数、目录、起止时间和退出码保存在同名 `*-command.json`；历史失败日志没有覆盖。完整单测之后追加的扫描边界修订另有针对性复查，未冒称重新跑了一遍全部1373项。

| 检查 | 实际结果 | 证据 |
| --- | --- | --- |
| 初始完整类型 | 3处测试process.cwd声明错误，生产包类型通过 | [初始日志](baseline-typecheck.log) |
| 初始完整单测 | 1356/1372通过，16项失败 | [初始日志](baseline-tests.log) |
| 修复后完整类型 | 通过，包括新增浏览器配置 | [最终日志](typecheck-closeout.log) |
| 修复后完整单测 | 102文件，1373/1373通过 | [完整日志](full-tests.log) |
| 授权与旧阶段反例补查 | 2/2通过；保留新反例构造时未加YAML引号的失败，改用现有序列化器后通过 | [最终定向日志](final-targeted-tests-2.log) |
| phase与历史保护收尾 | 4文件15/15通过，完成状态与原Gate保留有效 | [收尾日志](closeout-tests.log) |
| 原型/Playground构建 | 通过，保留已有包体积提示 | [构建日志](build.log) |
| 治理 | 通过，继续输出原颜色/配色待审项 | [收尾治理日志](closeout-governance.log) |
| 图标完整性 | 899/899来源可用，1806生成文件；单图标消费不包含全目录 | [图标日志](icons.log) |
| 原工作区关键浏览器 | 49个唯一检查最终通过，无自动重试 | [逐项汇总](browser-results.json) |
| 固定样本来源 | 1985登记文件及source-lock匹配；归档SHA不变 | [源码检查](fixed-snapshot.log) · [摘要](source-integrity.json) |
| 独立技术复核 | 通过，无未解决P1/P2 | [审阅记录](independent-review.md) |
| 固定样本浏览器 | Chromium/Firefox/WebKit各7组通过，共18张新截图，errors均为空 | [Chromium](fixed-browser/chromium/chromium-result.json) · [Firefox](fixed-browser/firefox/firefox-result.json) · [WebKit](fixed-browser/webkit/webkit-result.json) |

原工作区矩阵：Card、Layouts、Dialog共25项Chromium依赖检查；BM-A3项和BM-B5项各跑三浏览器，共24项。首次42/49通过，修正已确认设计之后的旧预期后定向复查4/7，再补充现行分区边界检查3/3通过。不是一次49/49全绿；[首次报告](original-browser-a/report.json)、[第二次](original-browser-b/report.json)、[最终几何](original-browser-c/report.json)保留全部失败与通过记录。

覆盖范围包含跨页/视图选择、查询与选择协调、批量操作、刷新失败重试、保存校验/失败/重试/取消、附件失败/移除/提交、嵌套浮层与焦点回环、320/390窄屏、浅深主题、Body滚动与固定Footer。BM-B几何还覆盖916/616容器和单双列组合；自动模拟不等于真实设备或辅助技术验收。

主代理查看了新采集的固定样本桌面BM-A和窄屏BM-B底部截图，以及原型分区几何截图。独立复核另对固定样本三引擎测量正文分区与操作区边界，见[独立几何证据](independent-bmb-boundaries.json)。截图检查不新增Human Gate。

## 本轮修正及来源

1. **旧阶段比较**：有效RN-15和后续Dialog refinement从早期phase比较中精确剥离；原先的授权/视觉接受记录保留。RN-15精确校验拒绝扩大到M2、其他快照、新视觉、对比度、发布和迁移。
2. **历史受保护源码**：保留原Dialog、Layout、RN-08和Textarea接入SHA。对16项已授权变更保存[旧SHA→当前SHA及来源](source-transitions.json)，对Dropdown复用已有精确逆转换。测试读取当前真实字节，未登记的内容或失效授权仍失败；不再用before文件替代当前文件掩盖变化。
3. **B2旧阶段合同**：校验器只在阶段需要或文件存在时加载后续inside-label合同；合法旧阶段可缺失，存在且夹带未授权字段仍拒绝。旧夹具精确移除后期文件、例外及保护路径，不补造新合同。
4. **类型与现状断言**：补已有测试环境的process.cwd声明；概览精确区分BM-A/B完成和BM-C/D未开始；Input维持两项warning与另行登记的inside-label待审结果，不放宽颜色阈值。
5. **Tailwind输出核对**：按已有RN-08/10授权补确切结构类和table-page扫描入口；归一化补enabled状态。4项注释/事件/类型/属性产生的输出单独记录[来源](tailwind-candidate-origins.json)。独立复核指出仅按名称排除仍会放过真实className/Recipe；现用实际CSS扫描指令和已安装Scanner实时比较“候选→来源文件集合及完整SHA”。新增/缺失来源、已有或新来源中的className/Recipe都不能通过，反例见[扫描边界复查](scanner-boundary-final.log)。这是4项有限冻结审计，相关来源变更须重新审查；没有新增数据流分析器或公共结构类授权。OptionButton完整两轮颜色检查单项实测5638ms，局部时限由5秒改15秒，反例保持；不更改全局时限。
6. **浏览器旧预期**：课程Dialog按已确认规格测516px；标题说明测Header实际8px gap和0 margin；BM-B键盘按已确认头部结构测取消→保存→宽版容器→双列布局→关闭。各步焦点断言保留。
7. **BM-B分区边界**：更晚的[分区增量](../bm-b-rn10/section-surfaces-2026-09-15.md)及[最终视觉确认](../bm-b-rn10/header-hint-2026-09-15.md)规定Body外留白12、section内留白20、Footer24，替代早期无分区时的字段/主操作共线预期。当前实际差8来自12+20−24，独立测得滚动槽占宽0；严格测三组边界，不放宽到8px，也不再声称字段与按钮完全共线。
8. **现行BM-B状态合同**：修正[取消说明](../../../apps/prototype/src/scenarios/bm-b/state-contract.md)：脏草稿先确认、继续编辑保留、明确放弃才丢弃，外点默认不关闭，保存期间阻止关闭。原运行逻辑没有修改。

本批apps/packages基线2088文件中仅改一份概览测试和上述状态合同，其余2086文件字节不变；没有依赖、Token或公共组件变更。原HEAD为 `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`，原有未提交工作保留，未进行Git写入。

## 未决问题与使用限制

- 已有颜色/配色资格findings与已接受例外分别保留；BM-B浅色静态提示3.71:1、Card深色focus以及各字段/选择控件的对应问题仍查原合同。本轮不清空findings，也不扩大问题配方使用范围。
- 没有新增未解决的关键交互缺陷。后续若发现草稿丢失、错误选择、焦点无法返回等问题，应从试用说明撤下受影响路径，复现修复后再恢复，不能以其他用例通过替代该项。
- 真实系统中文IME、屏幕阅读器、物理触屏、另一台机器字体/离线缓存未在本批验证；不声明完整无障碍或跨机器可用。
- 无真实后端、对象存储、身份系统与业务迁移。刷新会清除本页模拟修改；上传不读取/传输文件内容。
- RN-14仅六轮规定改造，无对照组；效率、token和真实用户修正成本为not-measured。
- 保持本地Registry/current-workspace及local-experiment/registry-candidate，不提供已发布包或在线安装服务；无publish/push/Figma写入。

## 重复检查与最小CI提案

以下命令在当前card-v2工作树执行。依赖版本以锁文件为准；浏览器检查使用新临时目录、5333/5334独立预览端口，端口占用会失败而不会关闭其他任务的服务。

```sh
pnpm typecheck
pnpm exec vitest run --maxWorkers=2
pnpm build
pnpm verify:icons
pnpm verify:governance
pnpm exec playwright test --config tests/e2e/rn15.config.ts
```

最小CI提案复用以上顺序，安装使用frozen lockfile；保留失败trace和报告，失败中止。尚未创建远程CI、缓存服务、部署或发布作业。当前实现仅提供可重复的本地浏览器配置。

## 固定版本与回退

归档：[starter-final.tar.gz](../rn14-editability/starter-final.tar.gz)；SHA256 `81ed247e9e3c57bf9edd94ace9bea30487557ab5404c26570aa8ea055c7f900e`；[来源锁](../rn14-editability/final-source-lock.json)。本轮重新检查通过，未重写归档或原证据。

服务停止后，可在当前工作树执行下面的恢复步骤。新建目录保留现有改造，不覆盖原目录；当前机器的离线缓存已在RN-14独立安装验证，其他机器缓存缺失应单独处理。

```sh
trial_dir=$(mktemp -d /tmp/rain-next-trial.XXXXXX)
tar -xzf evidence/runtime/rn14-editability/starter-final.tar.gz -C "$trial_dir"
node scripts/rn14-starter.mjs --check "$trial_dir"
cd "$trial_dir"
pnpm install --frozen-lockfile --offline --ignore-scripts --package-import-method=copy
pnpm typecheck
pnpm build
pnpm dev --host 127.0.0.1 --port 5324 --strictPort
```

5324已占用时使用空闲端口并相应更新试用链接。试用数据恢复只需刷新；若样本源文件已被主动改造，则解包至另一个新目录恢复固定快照。样本内可用 `node rn14-browser.mjs URL 新输出目录 final chromium` 复查，另将引擎改为firefox/webkit；不要把新的改造回填到旧source-lock。
