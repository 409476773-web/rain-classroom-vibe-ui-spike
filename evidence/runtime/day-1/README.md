# Day 1 Runtime Evidence

`playground-shell.png` 由 `tests/e2e/playground-shell.spec.ts` 在 Desktop Chrome 视口中生成，用于证明 Day 1 空壳可在真实浏览器中渲染，并暴露 Components 与四个 Benchmark 的扁平入口。截图保留了键盘聚焦态，以便人工复核 Focus Indicator。

## 最新通过记录

- 最后通过时间：`2026-09-01 14:23:02 +0800`
- 验证命令：`pnpm verify`
- 结果：治理门、TypeScript、23 个 Vitest 测试、生产构建与 1 个 Chromium E2E 全部通过
- Playwright：`1.62.1`
- Chromium：`151.0.7922.34`（Playwright revision `1234`）
- 视口：Desktop Chrome `1280×720`；截图模式：`fullPage`
- 产物：PNG `1280×1286`
- SHA-256：`6bf22fdc10c368193b176b3926079a035000b2b52f07dde3fe9287860dac7765`

生成命令：

```bash
pnpm exec playwright test tests/e2e/playground-shell.spec.ts
```

该截图只属于 Day 1 运行证据，不表示组件或 Benchmark 已实现，也不表示 Human Gate、Figma、Registry、包发布或业务迁移已完成。只有截图哈希与本记录一致时，才可将它与本次通过结果关联。
