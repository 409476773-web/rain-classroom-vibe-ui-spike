# Card V2 本批验证

2026-09-12。公共 Card、四个 Recipe 与最小同仓原型已完成初步实现，自动检查通过，独立审阅发现已修复。**视觉待人工评审；深色全局焦点线对比度未通过，M0-C 保持开放。** Dialog、其他组件批次、真实 Starter 与 BM-A/B/C/D 未执行。

入口：[Card 评审页](http://127.0.0.1:5198/#card) · [独立课程空间](http://127.0.0.1:5199/)。

工作区：`.worktrees/card-v2`，分支 `codex/card-v2`，基线 `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。原 main 干净，未创建新提交或写远端；受保护源文件逐字节检查见 [保留结果](preservation.json)。

## 实现与来源

- 保留七公共部件、article、Title.as、Description p、Footer footer、原生属性/ref/事件及 Rain 单值 slot。
- default/sm 为 20/16px 留白候选；与内部控件 Density 独立。根 Recipe 经薄 Context 传递，内层根重置 spacing 和配方。
- 旧 Card 的 63 行未分层样式已移除；Card 专属 components layer 只处理别名、容器与直接部件布局。全局 Token、字体、Focus、rainCn、Button/Input/Tag/Surface 源码保持。
- CR-01 信息、CR-02 媒体、CR-03 指标、CR-04 操作复用既有控件；四卡标题在这两个宿主中显式为 h2。媒体裁切局部，根 overflow visible。
- [上游锁定](source-lock.json)核对 Card 作者源码、Nova 完整样式 Git blob 和 MIT。实际保存完整 Card、Card 样式段和许可证；未声称 CLI 产物锁定或标准 Registry 发布。
- Manifest 与本地 Registry 已登记 source/parts/共享依赖/候选边界，并校验缺失或扩展 shared 清单。64 品类仍是规划范围，未批量安装或宣称成熟。
- 原型独立导入 Rain 包与自己的样式，不依赖 Playground 私有 CSS；新增 importer 仅复用已锁定版本。生产原型实际渲染与事件已检查，独立目录 Starter 留给后续 RN-14。

## 实际检查

|检查|结果|证据|
|---|---|---|
|类型|通过，含原型与浏览器测试|[日志](logs/types.log)|
|全量单元|86 文件，1273/1273|[日志](logs/unit.log)|
|构建|Playground、Prototype 均通过|[日志](logs/build.log)|
|治理|锁文件、工作区、旧证据、边界、Tailwind、Token 通过|[日志](logs/governance.log)|
|图标完整性|899/899，未改图标源码|[日志](logs/icons.log)|
|生产浏览器|Card 5 项 + Core UI 4 项，共 9/9|[日志](logs/production-browser.log)|
|最终候选状态/登记|2/2；缺失 shared、未授权依赖与提前验收均被拒绝|[状态检查](logs/card-state.log) · [修复检查](logs/review-metadata-fix.log)|

工具环境：Node 24.13.0、pnpm 10.28.1、Chromium 151.0.7922.34、Mac、DPR 1。代表宽视口 1440、窄视口 360、卡片窄容器 300；没有宣称完整排列组合、多浏览器或真实设备通过。

覆盖真实生成 CSS、默认/sm、控件密度独立、可选 Header/Footer、nested Footer/Action/Recipe/变量隔离、长中文/不间断英文、媒体上下/左右及窄容器回退、Button/Menu/Select 独立事件、键盘打开/关闭及焦点恢复、两主题与反向主题区域、forced colors/reduced motion 模拟。原消费者仍为 Core UI 两处，相关回归已完成。

最终看图时另修复了 Card 文档标题受旧 h1 颜色影响的问题，并固定既有 Surface 对照为其原浅色区域；生产浏览器新增标题主题断言。构建保留大文件提示，本批没有执行性能专项。

构建原型中 CR-01 标题 16/24、说明 13/22；VD-2 课程说明按局部 Recipe 为 12/20。浏览器断言防止宿主段落/标题 CSS 再次覆盖组件。

浏览器命令：先 `pnpm build`；分别启动两个应用的 `vite preview` 到 5198/5199；以 `RAIN_CARD_PROTOTYPE_URL=http://127.0.0.1:5199`，使用 baseURL=5198 的临时 Playwright 配置运行 `tests/e2e/card.spec.ts tests/e2e/core-ui.spec.ts`，workers=1。日常源码复查可直接运行实施计划中的 `pnpm test:e2e` 命令，配置会启动两个开发入口。生产与开发检查范围分别记录，不互相代替。

## 连续修改

[结果](vibe/results.json)保留真实三阶段源码、SHA-256、computed style、尺寸、事件与截图：

1. [起点](vibe/baseline/gallery.png)：课程卡上下排列。
2. [VD-1](vibe/vd-1/gallery.png)：只改课程 Recipe 默认布局为左右，窄容器恢复上下；数据和事件保留。
3. [VD-2](vibe/vd-2/gallery.png)：从 VD-1 继续 size=sm、标题/说明紧凑组合及次要 Footer 操作。

两轮各只改 `apps/prototype/src/card-recipes.tsx`；公共 Card 未再修改。三张非目标卡与受保护区域的完整观测 JSON 相同，课程事件与非目标编辑/保存均成功。两项任务内部自行修复次数为 0；初始工程接入修复另见下节。真实用户纠正次数为 `not-measured`，视觉接受为 `awaiting_human`，不据此宣称整体生成效率提升。

## 颜色、字体与未决项

[实际测量](production/color-font-focus.json)包含祖先表面合成、26 个文字/焦点配对、字体与焦点样式。

- 24 个卡片文字配对均超过 4.5:1，浅色最低 5.989:1，深色最低 8.549:1。仅限这批具体文字/表面。
- 深色课程按钮全局 Focus 线：2.572793:1，低于 3:1；线实际可见、根未裁切，**不能据此认定对比度或可访问性通过**。未修改全局 Focus，未扩大既有例外；需另定全局修订范围。
- CDP 实际字形字体：中文 UI 为 PingFang SC，指标数字为 LINE Seed JP App_OTF，符合当前 Rain data 字体配置。普通 CSS font check 仅为辅助信息，其他机器未验证。
- forced colors/reduced motion 为 Chromium 模拟；[200% 放大图](production/zoom-200-dark.png)采用 CSS zoom，仅作检查材料，不等于浏览器文字专用缩放、读屏、触屏或真实设备验收。
- RC-31 等待真实用户评审；RO-01～06 与 RP-01～04 全部 not-run。

42 项逐项状态与证据见 [结果台账](results.json)。Card 的 32 项中，28 项为限定技术检查通过，RC-20/23/24 为部分覆盖或未决，RC-31 待人工；不关闭整体 M0-C。

## 失败、修复与审阅

- 改动前基线单元 1261/1266，5 项因冻结 Day 3 的未创建 Git 假设与已授权私有仓库混用而失败。[原始日志](baseline-unit.log)保留。当前增量仅许可精确既有 HEAD/origin；历史试验 fixture 明确使用原冻结锁文件和 unborn Git，未改冻结历史。
- 新尺寸/Recipe 红灯及真实浏览器 20px 压制已复现；实现后通过。部分初次启动因本地运行权限未执行；离线安装曾因缓存路径不匹配失败，随后使用现有缓存和锁定版本，未升级。
- 第一次浏览器检查点击 Checkbox 隐藏 input 被其可见绘制层拦截；改为真实聚焦+Space 路径验证，没有 force click 或改组件行为。[失败日志](logs/browser-initial-checkbox-target.log)保留。
- 生产 Core UI 的 Loading 测试原来只认文件名，构建内联 PNG 后误报。最终断言核对公共图标库已登记原图的完整 bytes，兼容文件 URL 与内联；旧 button/assets 副本已弃用，相关失败也保留。
- 独立只读审阅发现两项 P2：宿主段落/h2 规则覆盖 Card 排版；Registry shared 未严格校验。均已修复，并分别增加生产浏览器与负例检查。审阅者未运行全套；主执行者完成上述自动验证。独立审阅不替代 Human Gate。

## 续接与回滚

先集中查看四 Recipe，再决定 Focus 修订及是否进入 Dialog。原 main 尚未合入本批。

所有本批差异保留在独立工作区；回滚按本批 diff 逐块撤回，保留失败记录与旧历史，不做全仓 reset/clean，不覆盖他人后续修改。未执行新 commit、push、PR、Figma、包/Registry 发布或业务迁移。
