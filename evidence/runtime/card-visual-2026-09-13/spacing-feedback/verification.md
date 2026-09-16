# Card 间距层级续验

授权：2026-09-13 用户“开始实施落地。”，依据现有视觉修订计划第9节；System Mode，仍属 Card 候选修订。

## 基线与范围

- 工作区 `.worktrees/card-v2`，分支 `codex/card-v2`；既有未提交代码的本轮起点和摘要见 `before/source.json`。
- 讨论阶段的真实页面测量：默认四周16px、字段间16px、末字段到按钮32px；紧凑四周12px、字段间16px、末字段到按钮24px。
- 本轮修改前 Card/Surface 单元检查11/11通过。
- 公共 default/sm 保持16/12；预览五档12/16/20/24/32，初始20仅为候选。
- 原型仍按公共默认16消费，但共享本轮间距协调规则；课程卡正文与其他三卡同步响应预览。
- 默认连续背景与可选浅底操作区共享几何；数字/控件/字体/颜色/Focus未改。

## 本轮结果

|检查|本轮结果|证据|
|---|---|---|
|Card / Surface 单元|11/11通过|`unit.log`|
|类型、治理、构建|通过；构建保留既有大体积chunk提示|`typecheck.log`、`governance.log`、`build.log`|
|Card / Core UI 生产浏览器|10/10通过，包括独立5299原型|`browser-verified.log`、`production-verified/`|
|复核后补充五档状态矩阵|1/1通过|`extended-matrix.log`、`extended-matrix/`|
|独立代码与证据复审|通过；初审指出旧右侧16断言和状态矩阵缺口，均修正并复核闭合|本会话独立审阅者 `/root/card_spacing_review`|
|运行画面检查|执行者查看12/20/32多卡截图，以及5298当前页面；现场363px卡宽下12档inset/字段组/正文至保存均为12px；20候选已留在当前浏览器|上述截图及本会话浏览器记录|

五档 × 浅/深主题 × 短内容384px/长内容300px，共20场景、80个卡片实例。每档均核对四周实际inset、区块最终距离、字体/控件尺寸、溢出、草稿；追加浅底前后卡片及按钮盒坐标一致、提醒卡Header隐藏后的首inset和Footer隐藏后的末inset；课程反馈出现后仍保留区块间距和底inset。数据见 [完整矩阵](extended-matrix/card-Card-inset-presets-ke-883ee-changing-drafts-or-controls-chromium/spacing-matrix.json)。

|内边距|主区块及正文→保存|字段组|字段名称→控件|标题→说明|
|---|---|---|---|---|
|12|12|12|8|4|
|16|16|12|8|4|
|20|16|12|8|4|
|24|16|12|8|4|
|32|16|12|8|4|

同宽同内容画面：[12px](extended-matrix/card-Card-inset-presets-ke-883ee-changing-drafts-or-controls-chromium/gallery-12.png)、[16px](extended-matrix/card-Card-inset-presets-ke-883ee-changing-drafts-or-controls-chromium/gallery-16.png)、[20px](extended-matrix/card-Card-inset-presets-ke-883ee-changing-drafts-or-controls-chromium/gallery-20.png)、[24px](extended-matrix/card-Card-inset-presets-ke-883ee-changing-drafts-or-controls-chromium/gallery-24.png)、[32px](extended-matrix/card-Card-inset-presets-ke-883ee-changing-drafts-or-controls-chromium/gallery-32.png)。同目录 `reminder-*.png` 为五档单卡截图。

执行命令：

```sh
pnpm exec vitest run packages/ui/src/card/card.test.tsx packages/ui/src/surface/surface-card.test.tsx --maxWorkers=2
pnpm typecheck
pnpm verify:governance
pnpm build
RAIN_CARD_PROTOTYPE_URL=http://127.0.0.1:5299 pnpm exec playwright test tests/e2e/card.spec.ts tests/e2e/core-ui.spec.ts --config /private/tmp/rain-card-visual-20260913/playwright.config.mjs --output evidence/runtime/card-visual-2026-09-13/spacing-feedback/production-verified --workers=1
RAIN_CARD_PROTOTYPE_URL=http://127.0.0.1:5299 pnpm exec playwright test tests/e2e/card.spec.ts -g 'inset presets' --config /private/tmp/rain-card-visual-20260913/playwright.config.mjs --output evidence/runtime/card-visual-2026-09-13/spacing-feedback/extended-matrix --workers=1
```

首次浏览器运行被macOS沙盒阻止Chromium启动，10项均未进入页面；原日志保留在 `browser.log`、`production/`。获准在沙盒外运行后取得上述通过结果。旧Footer右inset断言按当前20候选修正；没有用放宽门槛掩盖失败。

## 修改和交付边界

修改文件：公共 `card.css` / `card.styles.ts`；应用 `card-recipes.tsx` / `.css`；`card-page.tsx`；现有 `card.spec.ts`；Card Manifest、phase、README、原视觉计划和本轮证据。未改变公共导出、公共默认值、依赖、全局Token或其他组件。

本次没有重跑全库单元、旧VD-1/VD-2编辑实验或完整辅助技术/物理设备检查。颜色和Focus资格、既有对比度待办保持原状态，治理通过不代表对比度通过。资产仍为registry-candidate、未发布；未创建Git提交或执行远端写入、Figma、发布与迁移。

Human Gate仍awaiting_human。下一个检查点是用户比较实际画面，选择最终默认边距；20px尚未成为公共默认规范。

后续状态：用户随后回复“确认”，20px已成为公共默认，本轮间距方案取得局部视觉确认；以上保留确认前的实施与验证事实。最新同步检查见 [默认值确认](default-confirmation.md)。
