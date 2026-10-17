# Conversation Composer 交互与视觉优化

2026-10-15 · card-v2 · 用户授权：“按照你建议的顺序实施优化，完成后打开页面让我体验和检查。”

本轮沿用 System Mode 未发布候选，落实本次运行体验评审建议。未改变候选身份、人工 Gate、发布或真实业务接入状态。

## 改动与实际结果

1. 紧凑和展开均可见当前检索范围及下拉标识，布局切换保持同一编辑器；展开图标采用已有36/20配方。
2. 引用范围发送成功后清稿并保留范围，空稿不出现补引用催促；下一稿有有效内容时恢复空引用阻塞，直接调用提交仍被守卫拦截。
3. 资料选择器改用真实布局容器，标题、36px搜索、列表与底部动作分隔。删除复述说明，文件名通过现有Checkbox Local Recipe改为常规字重。
4. 搜索结果与不匹配当前查询的已选资料分组；临时选择、取消、确认、失效恢复及新鲜可用性保留。
5. 上传/处理/失败/取消/替换原因准确区分，已有局部反馈不再重复成全局提示。独立宿主业务限制、缺远端标识和正文要求始终可见；校验原因与页面反馈在私有适配器中分开。
6. 发送失败仍使用同一主按钮和焦点，图标切为现有refresh；编辑清除失败后恢复up。重试保持提交身份。
7. 保留录音使用明确的“重试转写 / 丢弃录音”文字动作，删除重复阻塞行。波形仍为已确认的录音状态动画，不声称测量声音。
8. 超过3项资料时收纳额外就绪项；上传中、失败、替换、不可用、移除中及移除失败项保持可见。长引用名称可换行，文件拒绝显示文件名并能清理提示。
9. 替换失败/取消/进行中的附件通过既有回调提供重试或取消替换，保留原文件；未复制上传引擎。
10. 白底投影使用现有Token，降低透明度与可见范围；交互体验前置，四种表面布局保留在后方对照。
11. 窄容器改宽引起的textarea尺寸更新延至下一动画帧，卸载取消帧，消除专项浏览器检查中复现的ResizeObserver通知循环。

## 验证

- 定向单元回归：15文件，296/296，见unit-report.json、unit.log。
- 最后尺寸更新调整后，主组件追加复查26/26，见composer-final.log。
- UI、Playground及测试TypeScript检查通过；Playground构建通过，原有分包体积提示仍存在。
- 桌面1440×1000与窄视口390×844浏览器24/24通过；最终日志无ResizeObserver通知循环，见browser/report.json、browser.log。
- 真实当前页面使用原5481服务，人工查看首屏与选择器，保存preview.jpg；自动检查使用独立5482服务，不中断用户预览。
- 独立技术复核发现并修正：独立业务限制不能被局部反馈抑制、移除失败不能被收纳、替换状态应有对应恢复动作；修正后复核未发现新的P1/P2。
- 原Field样式、MessageScroller实现及G6十二项登记哈希保持；专项来源绑定与依赖闭包5/5通过，见scoped-governance.json；资产索引检查通过。

执行命令：

```sh
pnpm exec vitest run packages/ui/src/conversation-composer packages/ui/src/attachment-workflow packages/ui/src/message-scroller/message-scroller.test.tsx apps/playground/src/docs/components/g6-composer-adapters.test.ts apps/playground/src/docs/components/g6-course-conversation.test.tsx apps/playground/src/docs/components/g6-conversation-pages.test.tsx apps/playground/src/docs/components/conversation-composer-page.test.tsx --reporter=default --reporter=json --outputFile.json=evidence/runtime/conversation-composer-2026-10-15/run-04/unit-report.json
pnpm exec vitest run packages/ui/src/conversation-composer/conversation-composer.test.tsx
pnpm --filter @rain-next/ui typecheck
pnpm --filter @rain-next/playground typecheck
pnpm exec tsc --noEmit --project tsconfig.tests.json
pnpm --filter @rain-next/playground build
COMPOSER_BROWSER_PORT=5482 COMPOSER_EVIDENCE_DIR=evidence/runtime/conversation-composer-2026-10-15/run-04/browser pnpm exec playwright test --config tests/e2e/conversation-composer.config.ts
node scripts/verify-conversation-composer.mjs --output evidence/runtime/conversation-composer-2026-10-15/run-04/scoped-governance.json
node scripts/asset-index.mjs --check
```

## 边界

本轮服务均为既有本地模拟；浏览器原生录音专项使用合成麦克风，固定模拟转写不证明真实ASR。真实上传、权限/检索、ASR、消息核对及AI服务尚未接入。Safari、VoiceOver、物理触摸、软键盘和真实麦克风设备没有本轮验收记录。人工视觉待用户体验，contrast未授予；不据本轮自动检查声明生产、发布、Figma或全库接受。
