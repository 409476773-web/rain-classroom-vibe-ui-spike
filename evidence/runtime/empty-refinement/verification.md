# Empty 组件完善验证

2026-09-14。本批仅完善现有 Empty 图像、展示配方与文字层级；没有新增页面、表格/列表或侧栏业务场景。计划见 `docs/plans/2026-09-14-empty-refinement.md`。

当前 implementation completed；automatedVerification passed；independentReview not-run；Human Gate accepted（仅本组件运行视觉，见 visual-acceptance.md）；contrastAcceptance not-granted。包/Registry 未发布，业务迁移未执行，无 Git 提交或远程写入。

- 实施前定向基线：3 files / 13 tests 通过。
- 新增四项回归首先因缺少默认内容、Media 和可选标题层级失败，随后组件与既有消费者：3 files / 10 tests 通过。
- 插画来源：`source-lock.json`；14 个 SVG 与 Classic 文件字节相同。
- 旧阶段完整快照：`before-phase.yaml.txt`。本批临时夹具、截图及检查输出位于 `/tmp/rain-empty-refinement-20260914`。
- Browser plugin not available；使用已安装的 Playwright 完成组件级渲染验证。

原 RN-08 验证与人工 Gate 保持独立，不将本批设计方向确认标记为运行视觉验收。

## 最终结果

| 检查 | 结果 |
| --- | --- |
| Empty、既有 Table/资料消费者、RN-08 精确授权、历史夹具与 Token 消费检查 | 6 files / 273 tests 通过 |
| Chromium 组件配置 | Light/Dark × illustration/simple/text × 普通/窄空间长文案，12/12 通过 |
| 文字与间距 | 反馈修订后三种展示标题和说明均14/22/400；图像间距16/8、主副文案4、操作间距16/12，实际计算值通过 |
| 图像 | 14/14 可加载；每个 Media 仅一版可见；嵌套 Light 位于 Dark 时仍正确；均为空 alt 装饰图像 |
| 交互与适配 | 回车激活操作、Tab 移至下一操作、左对齐、320px 页面、长中文/连续英文换行、刷新后恢复均通过 |
| 页面健康 | 页面身份正确、非空白、无 Vite 错误层；本批浏览器 console/pageerror 0 |
| 类型、构建、治理 | pnpm typecheck、pnpm build、pnpm verify:governance 通过；保留既有大分块提示与其他家族对比度 finding |
| Empty 颜色 | 标题和说明统一 Text/Neutral/3，在 Background/Neutral/1/2/3 两主题的12个部件登记色对无对比度或用途 finding；不扩展为全库或人工接受 |
| 修改范围 | 基线2171文件中2158文件字节不变；150个既有应用/Foundation文件全部不变，14个 Classic SVG 原样复用；没有新增业务场景 |

## 发现与修复

- 首轮组件夹具重现：Empty CSS 的 components 层先于宿主 Tailwind 重置层建立，图片 display 和间距被覆盖，出现 Light/Dark 图像同时展示。保留 `first.png`；针对实际间距与可见图像数的检查先失败，再将该组件的结构样式改为不受宿主重置层覆盖，原检查通过。未改全局 CSS 或其他组件。
- 新资源曾被历史 B2 夹具复制进旧阶段；通过已有排除表隔离本批文件。同时补入先前 inside-labels 两个浏览器文件的漏项，保留完整旧阶段断言，未放宽门禁。
- 首轮新增颜色登记缺少精确授权路由；按既有组件机制接入，仅允许本批 Empty 和已登记的主副文字角色。

## 复现与材料

组件级临时预览：<http://127.0.0.1:5206>。没有新增文档站页面或三个业务场景。临时目录 `/tmp/rain-empty-refinement-20260914` 包含：

- `serve.mjs` / `fixture/`：组件夹具；`node /tmp/rain-empty-refinement-20260914/serve.mjs` 启动。
- `check.mjs`：`node /tmp/rain-empty-refinement-20260914/check.mjs` 重跑12组渲染及其他断言。
- `browser-check.json` / `scope-check.json`：浏览器数值、页面健康与保护范围。
- `preview.png`、`light-standard.png`、`dark-standard.png`、`light-narrow-long.png`、`dark-narrow-long.png`、`mobile-320.png`：实际渲染图；`first.png` 保留首轮失败。
- `unit.log`、`typecheck.log`、`build.log`、`governance.log`：本批实际执行输出。

最终定向命令：

```sh
pnpm exec vitest run packages/ui/src/empty/empty.test.tsx packages/ui/src/table/table.test.tsx apps/prototype/src/data-table-recipe.test.tsx scripts/table-rn08.test.ts scripts/verification-helpers.test.ts scripts/verify-token-foundations.test.ts --maxWorkers=2
pnpm typecheck
pnpm build
pnpm verify:governance
git diff --check
```

本批没有执行独立代理审阅、Firefox/WebKit、真实屏幕阅读器或物理设备检查；未关闭视觉 Human Gate。原稿插画是低对比装饰，不能替代可读主文案。

## 21:16 用户视觉反馈修订

用户要求按钮缩小，且空状态默认不要使用加粗加重的大号文字。本轮删除插画版标题的放大/加重分支，统一为 14px / 22px / 400。三种展示配方显式使用既有 Button mini（主按钮36→28px，文字14→13px）和 text compact（26→24px，文字14→13px）；不改变全局 Button 默认值。使用文档与 Manifest 已同步。

重新验证 Chromium 12/12 配置，包含实际标题字重/字号和按钮尺寸断言；明暗主题、220px 窄容器长文案、320px 页面、键盘与刷新均通过，无 console/pageerror。已查看浅色标准与深色窄空间长文案截图。Empty 与既有 Table/资料消费者 3 files / 10 tests、typecheck、verify:governance、diff 格式检查通过。Human Gate 仍 awaiting_human。

## 21:22 用户文案层级反馈

用户要求“暂无内容”与下方小字一样，并说明大多数场景无需这一行。EmptyTitle 颜色与 Description 统一 Text/Neutral/3，继续使用14/22/400；使用合同改为标题可选、至少一句可读提示。常用示例和临时预览默认仅展示说明，预览可切换显示标题以检查两行同级样式；独立的无 children 默认仍有一句“暂无内容”。现有间距规则自然适配，无需新增组件属性或 CSS。

Chromium 24/24 配置（带/不带标题 × 明暗 × 三展示 × 普通/窄空间长文案）通过：同色同字号同字重、标题省略无额外间距、28px/24px操作、长连续英文换行、键盘、320px、14资源和刷新；console/pageerror 0。查看浅色无标题与深色长文案带标题截图。Empty、Table、资料消费者与 RN-08 4 files / 19 tests 通过；verify:governance 与 diff 格式检查通过。当前用户内置浏览器的自动刷新未验证；以上是独立 Chromium 预览检查。Human Gate 仍 awaiting_human。

## 视觉验收登记

用户明确确认后，Empty 子状态的视觉 Gate 已接受，见 [确认记录](visual-acceptance.md)。上文 awaiting_human 为当时验证状态；其他验收与发布边界没有变化。
