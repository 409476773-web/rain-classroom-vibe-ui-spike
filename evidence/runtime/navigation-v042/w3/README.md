# W3 运行证据 · 2026-10-01

实现工作区 `.worktrees/card-v2`；分支 `codex/card-v2`，HEAD `321e1a0c1b5f9284e0fcb5167fa059d6174b1752`。此前 dirty/untracked 工作由 `before-files.json` 保护，未提交 Git、未安装依赖、未修改 Classic/Figma/全局 Token。

## 真实检查

| 检查 | 当前结果 | 范围 |
|---|---|---|
| Vitest：family/navigation/Tabs/Radio/ConnectedSurface/R1-R3 | 52 passed，exit0 | 6 文件；native semantics、ARIA 描述、ID/路径/子场景隔离、已有几何 |
| W3 Playwright | 7 passed，exit0 | 队列外行76/zero-gap，分段32/26与30/24，A5卡300，C/W语义和顶线，R1/R3真实操作，独立消费 |
| 旧消费者 Playwright | 6 passed，exit0 | 原 A1/A4/R2、短窗口范围搜索、cap预算、独立编辑器草稿与内部Tabs |
| UI/Playground 类型检查 | passed，exit0 | 组件包及消费应用 |
| Playground 生产构建 | passed，exit0 | CSS 数字属性选择器已修；既有 chunk-size warning 保留 |

```sh
pnpm exec vitest run packages/ui/src/navigation/navigation-families.test.tsx packages/ui/src/navigation/navigation.test.tsx packages/ui/src/tabs/tabs.test.tsx packages/ui/src/radio/radio.test.tsx packages/layouts/src/connected-surface.test.tsx apps/playground/src/recipes/navigation-v042/r1-r3.test.tsx
pnpm exec playwright test --config tests/e2e/navigation-v042-w3.config.ts
pnpm exec playwright test --config tests/e2e/navigation-v042.config.ts --grep 'R2 exposes a real shared consumer|A1 uses native links|A4 keeps manual keyboard|R2 range dropdown|scope cap follows|independent consumer preserves' --output evidence/runtime/navigation-v042/w3/old-consumer-regression-artifacts
pnpm --filter @rain-next/playground typecheck
pnpm --filter @rain-next/playground build
```

浏览器：已安装 Chromium 151.0.7922.34；macOS darwin25.6 arm64；DPR1，zh-CN；1200/1440/1600 CSS 原尺寸。证据工具未缩放原图，截图取整多出的边缘只在独立对照输出中裁除，原始参考保留。

## 冻结原稿与差额

原稿 SHA256：`d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c`。

- [规范原稿](reference/2026-10-01T10-40-10-888Z/README.md)：20 case 双遍稳定截图、真实点击和最终 computed style。
- [首轮对照](compare/2026-10-01T11-04-34-651Z/README.md)：保留修前差额。
- [后续对照](compare/2026-10-01T11-13-53-552Z/README.md)：25 组原尺寸并排/叠加及 DOM 测量；不是人工验收。

已据实修正 A3 评审壳 span 的20px样式泄漏、C3面板选择器/轨道尺寸、A5/C3/C4/C5外框、W3固定内容与1080内host、R1模块身份/账户栏和关系图布局、R3错题260目录栏/单行metadata/原稿Tree层级。原稿按钮轮廓由 candidate 外 row 承担以允许 sibling action，不改变外尺寸；原稿字体和图标形状映射为导航局部字体与既有 Rain 图标，未引入字体/图标依赖。

后续捕获仍记录家族列宽约±1.33px、A3框约+3px、W1/W2整板约+2px；R3表头、工具条与files/errors不同的行高继续校正并将在下一次对照中验证。图表和业务内容允许 Mock，不将其称作真实分析/媒体/服务。当前 W3 实现可运行，视觉验收仍 pending-G2。

## 未验证

G2/G3 人工视觉、VoiceOver、完整对比度、多浏览器/触屏、W4 session 状态、W5全9场景和W7全库质量门尚未由本批证据覆盖。全库测试类型检查存在 Command 测试和 node:fs 声明的既有问题；新增 W3 config 的类型问题单独修复。旧 review-01–08 证据未作为本批测试结果重复计数。

## W4/W5 接入后的最终复核 · 2026-10-01

上文为 W3 初次交付历史。R1/R3 当前已使用共享 Workspace，W4/S 与 W5 九场景现已实现；当前总状态以 [W3–W5 验证索引](../w5/README.md) 为准。最终 W3 浏览器7项在 test-artifacts-final-02 全部通过；C5/R3最后对照分别在11-33、12-09、12-14时间戳目录，旧轮差额已逐项校准，仍保留约1px家族框差/既有图标映射与字体栅格差。对应具体源/候选原图不覆盖历史。G2/G3、VoiceOver、完整对比度和全量质量门继续独立待验收。
