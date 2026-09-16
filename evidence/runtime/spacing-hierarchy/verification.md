# 三级间距关系：实施与验证

日期：2026-09-13。工作区：`codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。本轮以用户确认的间距关系及随后“继续”为授权；保留原有未提交工作，无新增提交或推送。

后续反馈：用户指出本页首轮试排仅控制内部面板、外层Card未接通。首轮24项及源摘要保留如下，外卡补接的最新实现/验证/接受范围见[续修记录](outer-cards/verification.md)。

## 实施范围

全库共享关系为**同一语义容器、同一方向：边缘留白≥分区间距≥分区内信息间距**，数值可自由选现有16档Rain Space，包括相等与零值。本轮实现范围是布局包与现有Playground/Prototype局部消费者，不是全库现有组件迁移。

唯一公共增量是`defineLayoutSpacing`及只读`LayoutSpacing`：校验三个数值是否属于现有Space且顺序合法，返回冻结的独立快照；非法值抛出`RangeError`。四原语继续使用现有gap/原生style，默认gap仍为0。函数只检查声明的值，不自动设置样式、识别DOM层级或纠正数值；实际几何由消费者负责接入和验证。

| 当前局部默认 | 边缘留白 | 分区间距 | 信息间距 | 归属 |
| --- | --- | --- | --- | --- |
| 布局页面纵向 | 32 | 24 | 16 | 页面与父布局；窄屏仅左右留白改为16，纵向保留32 |
| 默认Card内容 | 20 | 16 | 12 | Card继续拥有20及Part间距，正文组合消费16/12 |
| 资料列表与详情面板 | 16 | 12 | 8 | 两面板各自padding与内部布局 |

单位px。这些是[宿主默认组合](../../../apps/prototype/src/layout-recipes.tsx)，不是全库固定配方；Card的default20/sm12及FormItem/控件内部方案不变。页面、Card、Pane分别按自己的语义容器比较，不跨轴或按DOM深度排序。

本轮把Card正文组间24改为16，Pane分区20改为12。资料列表原相邻内容累计20 gap + 1线厚 + 20顶部留白；现移除重复留白与装饰线，由一处12px分区gap拥有相邻资料距离。尚无保存提示时不再渲染空段落以额外占据一份gap。剩余配色沿用原登记，Token消费者清单只删除已移除的装饰线登记。

Playground的“调整资料面板间距”可独立选择三个值并应用；合法值更新两面板，非法值显示原因并保留上一个有效预览。业务草稿、焦点和滚动仍由原消费者及Split管理。入口：[布局预览](http://127.0.0.1:5195/#layouts)，第二消费者：[Prototype](http://127.0.0.1:5196/)。

## 自动验证

| 检查 | 结果与范围 |
| --- | --- |
| 类型与生产构建 | 全工作区类型检查和两应用构建通过；既有大产物提示保留 |
| 治理 | 离线锁文件、工作区、证据、边界、Tailwind B2、Token检查通过；只增加精确的`layoutsV1.spacingHierarchy`授权记录及校验 |
| 专项单元 | **8/8通过**：布局5项、RN-06合同3项；合法自由值/相等/零值、非法刻度/倒挂、冻结快照、原有行为及旧阶段保护 |
| 生产浏览器 | **24/24通过（21.7s）**：Layout9 + Dialog9 + Card6，Chromium、重试0，使用当前生产构建 |
| 受保护文件 | **1925/1925未变**：既有UI、Foundations及原Card/课程Dialog消费源码；详见[preservation.json](preservation.json) |

明暗主题×default/compact四组覆盖：默认面板真实边缘16、分区12、信息8、资料之间12；设置Grid列间12且标签/控件顶边对齐；Card20/正文16、页面纵向32/组间24、Split侧宽320。1280视口中的360窄容器堆叠后两区间12，面板内部关系保留。独立滚动断言将宿主高度临时约束为360以让两区都产生溢出，随后恢复实际默认560再保存截图；正常内容不足时不要求出现滚动条。

自由组合实际测量覆盖`24/20/12`、`20/20/12`、`16/16/16`、`40/36/24`、`0/0/0`：左右/顶部内距、直接分区、信息单元和相邻article边界距离均与声明吻合，见[原始几何](production/layouts-spacing-hierarchy--3f7c7-s-and-actual-panel-geometry-chromium/spacing-choices.json)。全部相等另在375窄屏、深色、compact下验证堆叠与无横向溢出。两个倒挂路径均提示错误并保留上次有效值，恢复合法值后提示清除。草稿输入DOM保持，原有查询、筛选、Select关闭、收起/展开和焦点返回通过。

另覆盖320视口、多行校验和成组动作、forced-colors/reduced-motion基本可操作性、独立Prototype，以及原Card/Dialog生产回归。控件内部尺寸不随三级间距缩放，零值测试也不改变已有FormItem内部4px等方案。

日志见[logs](logs/)，生产截图/几何见[production](production/)。[baseline.json](baseline.json)和[before](before/)记录本次实施前的44份源/治理/文档文件；[source-sha256.json](source-sha256.json)记录本轮最终源码摘要，旧RN-06证据保留历史范围。

复跑需进入本工作区，先执行`pnpm typecheck`、`pnpm test packages/layouts/src/layout.test.tsx scripts/layouts-v1.test.ts`、`pnpm verify:governance`、`pnpm build`。保持Playground/Prototype生产预览在5195/5196，复制`production.config.mjs.txt`到临时`.mjs`文件后运行：

```sh
RAIN_LAYOUTS_PROTOTYPE_URL=http://127.0.0.1:5196 RAIN_DIALOG_PROTOTYPE_URL=http://127.0.0.1:5196 RAIN_CARD_PROTOTYPE_URL=http://127.0.0.1:5196 pnpm test:e2e --config /tmp/rain-spacing-production.config.mjs
```

配置记录本机绝对路径；换工作区时同步修改testDir。归档脚本使用`.mjs.txt`，避免证据被识别为运行源码。

## 独立技术复核

独立审阅比较本轮`before`快照和当前源码，未发现新增P1/P2。另跑7组生产几何（1280/375/320、明暗、含两种部分相等、全等、全零、最大值40/40/40）、2组非法保留、被动应用/收起/重开、第二消费者，共11条独立记录；布局单元5/5通过。换值时业务输入DOM、草稿、焦点和两区scrollTop保留，正常点击应用后焦点仍在按钮，无pageerror。独立复算1925份受保护哈希均不变。

报告及原始记录见[independent-review](independent-review/)。文档、Manifest、Registry及证据一致性复核已通过；98个本地文档链接、25个Registry路径均有效，最终摘要和受保护文件核对一致。收口后将专项阶段的独立复核记为passed、补记本段结论并刷新源摘要；运行源码未再变化。独立样例用于补充边界，不与24项套件相加声称全库覆盖。

## 接受边界

规则已确认；本轮实现、自动检查和独立技术复核分别记录。人工视觉接受仍为`awaiting_human`，对比度接受为`not-granted`，公共源码为未发布候选。

共享深色Focus问题继续开放；本轮未改变Focus或表面Token，也未新增对比度接受或重新检查平台实际字体。真实设备、输入法/辅助技术、跨浏览器、完整业务Benchmark仍另记。上述有限几何样本不证明任意宿主CSS、全部组件或所有可能组合符合规则。

依据：[设计记录](../../../docs/plans/2026-09-13-spacing-hierarchy-design.md)、[组合规范](../../../docs/audits/2026-09-13-composition-layout-rules.md)、[使用指引](../../../docs/audits/2026-09-13-layouts-usage.md)。RN-07及后续、Figma、发布与业务迁移不属于本轮实施范围。
