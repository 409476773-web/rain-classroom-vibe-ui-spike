# Card V2 首批实施

授权：2026-09-12，用户在完整审阅 Rain-Next-Codex-工作包V2 后回复“开始工作”。本次按已说明的首批范围实施 RN-00～04、RN-C1～C4；Dialog 和后续业务批次单独继续。

模式：System Mode。目标是替换公共 Card 的薄弱配方、保留七部件及有效语义，交付四个局部组合、真实消费者及连续修改验证。

## 准入记录

- 实际基线：`321e1a0c1b5f9284e0fcb5167fa059d6174b1752`；原 main 工作区干净。
- 隔离：已有工作区 `.worktrees` 下新建 `card-v2`，分支 `codex/card-v2`；无新提交和远端写入。
- Node 24.13.0 / pnpm 10.28.1；依现有锁文件离线恢复 188 项缓存依赖，下载 0。Card 新依赖为 0。
- 运行调用：`apps/playground/src/docs/components/core-ui-page.tsx` 的两处公共 Card。选择卡片内部同名函数不依赖公共 Card；Surface 独立。
- 当前出口：`packages/ui/src/index.ts`。有效断言保留在 `surface-card.test.tsx`、`core-ui.spec.ts`；历史图片和日志不覆盖。
- 基线类型检查通过。基线单元 1261/1266 通过、5 项失败；治理检查因既有 Git 提交/远端与冻结 Day 3 未创建状态混用而失败。问题在新增代码前已复现，原始日志保存在本批证据。
- 上游作者 Card 与 Nova 完整样式的 Git blob 均与 V2 相符；实际来源/摘要及许可证见 `evidence/runtime/card-v2/source-lock.json`。采用作者源码与 Card 样式段本地转译，不声称 CLI 安装产物已锁定。

## 最小合同与拟改范围

保留 Card/Header/Title/Description/Action/Content/Footer、article、Title.as、panel/raised、原生 aria/ref/事件及 Rain 标记。新增 default/sm 与根 localRecipe；size 不改变子控件 Density。20/16px、普通 Footer 和局部媒体裁切属于待审视觉候选。

样式仅移除旧 `.rain-card*`，以受控类及 Card 专属低优先级 CSS 表达；保留已确认 Token、字体、Focus 和其他组件。根建立自己的 spacing，薄 Context 传递本 Card 配方，嵌套实例隔离。媒体重排由局部 Recipe 负责，不引入业务状态引擎。

拟改：Card 源码/配方/CSS/测试、UI 出口与样式导入、Card Manifest/本地 Registry、Core UI 说明、Card 展示页/路由/扫描、最小 `apps/prototype`、首批准入所需的治理规则及新证据。新增 workspace 消费者仅复用已锁定 React/Vite/Rain 依赖。

## 批次任务

|任务|范围|状态|
|---|---|---|
|RN-00|基线、工作区、工具链及旧失败|已记录|
|RN-01|本批授权与冻结历史分离|已完成|
|RN-02|保留 V2 64 品类处置，固定首批来源|已完成|
|RN-03|Card Token/类合并/扫描/slot 转译|已完成|
|RN-04|真实最小消费入口|已完成，同仓原型|
|RN-C1|实际消费者与兼容合同|已记录|
|RN-C2|Card 公共替换候选|初步实现完成|
|RN-C3|四 Recipe、迁移及登记|已完成|
|RN-C4|回归、两轮真实修改与集中评审|自动检查及两轮编辑完成；视觉/焦点对比度未闭合|

## 验证

先运行 Card 新尺寸与 Recipe 作用域的失败测试；保留有效旧语义断言。浏览器检查真实生成样式、旧规则清理、可选部件、嵌套作用域、大小/密度独立、局部主题、长文本与窄容器、键盘/焦点/事件、字体与真实文字对比度。

四个样本：CR-01 信息、CR-02 课程媒体、CR-03 指标、CR-04 操作。VD-1 从默认上下改左右并保留窄容器回退；VD-2 从该结果继续改疏密与 Footer，同屏非目标保持。记录修改范围、提示、实际结果；真实用户纠正未测量，不填 0。

运行定向/整批单元、类型、构建、治理及相关浏览器回归。浏览器输出全部写本批目录或 testInfo 输出。Card 阶段验证同仓最小消费，独立目录 Starter 与嵌套 Dialog 留在 RN-14。32 个 RC 检查按实际范围记录，不由技术检查自动接受视觉、对比度或真实设备。

结果详见 [本批验证](../../evidence/runtime/card-v2/verification.md)。实际 CSS、主题、字体、两轮修改已验证；真实用户纠正次数未测量。深色全局焦点线实测 2.573:1 < 3:1，仍未通过；视觉与真实读屏/触屏待验。M0-C 尚未关闭，也不代表 M0-O 或任何 BM 通过。当前允许本地 branch/worktree 和本批实施；历史 Git 已获授权的事实单独记录，不授予新 commit/push/发布/Figma。

## 运行与续接

从本隔离工作区运行 `pnpm dev` 打开 Card 页 `#card`；运行 `pnpm --filter @rain-next/prototype dev` 打开独立课程空间。`pnpm test:e2e tests/e2e/card.spec.ts tests/e2e/core-ui.spec.ts --workers=1` 会启动 Playground 4173 与原型 4174。生产构建验证命令、结果与未决项见本批验证记录。

下一步先评审四个 Recipe 的当前视觉与操作层级；全局 Focus 对比度需要单独的修订范围。RN-05 Dialog 及后续批次仍待继续，不因 Card 技术检查自动启动。

## 2026-09-13 视觉修订续接

用户授权“开始按计划实施”后，按 [视觉修订计划](2026-09-13-card-visual-refinement-plan.md) 调整公共排版与四Recipe。当前入口和限定复验见 [新批验证](../../evidence/runtime/card-visual-2026-09-13/verification.md)。以上V2与VD-1/VD-2记录保留历史身份，不用于证明新修订已经通过人工视觉或对比度验收。
