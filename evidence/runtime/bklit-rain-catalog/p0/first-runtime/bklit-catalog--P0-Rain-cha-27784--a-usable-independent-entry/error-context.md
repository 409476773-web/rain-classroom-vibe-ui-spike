# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bklit-catalog.spec.ts >> [P0] Rain chart catalog is a usable independent entry
- Location: tests/e2e/bklit-catalog.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Rain 图表库', exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Rain 图表库', exact: true })

```

```yaml
- text: "[plugin:vite:oxc] Transform failed with 1 error: [PARSE_ERROR] Adjacent JSX elements must be wrapped in an enclosing tag. ╭─[ src/scenarios/bklit-validation/catalog-examples.tsx:159:7 ] │ 159 │ </BarChart> │ ┬ │ ╰── │ │ Help: Did you want a JSX fragment `<>...</>`? ─────╯ /Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/apps/prototype/src/scenarios/bklit-validation/catalog-examples.tsx at transformWithOxc (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/card-v2/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:4103:19) at TransformPluginContext.transform (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/card-v2/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:4174:26) at EnvironmentPluginContainer.transform (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/card-v2/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:30932:51) at async loadAndTransform (file:///Users/wenchengkai/CodexFile/%E9%9B%A8%E8%AF%BE%E5%A0%82-shadcn%E7%BB%84%E4%BB%B6%E5%BA%93%E6%9E%B6%E6%9E%84/.worktrees/card-v2/node_modules/.pnpm/vite@8.2.2_jiti@2.7.0/node_modules/vite/dist/node/chunks/node.js:20671:26) Click outside, press Esc key, or fix the code to dismiss. You can also disable this overlay by setting"
- code: server.hmr.overlay
- text: to
- code: "false"
- text: in
- code: vite.config.ts
- text: .
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("[P0] Rain chart catalog is a usable independent entry", async ({ page }) => {
  4  |   await page.goto("/bklit-catalog.html");
> 5  |   await expect(page.getByRole("heading", { name: "Rain 图表库", exact: true })).toBeVisible({ timeout: 5000 });
     |                                                                              ^ Error: expect(locator).toBeVisible() failed
  6  |   await expect(page.getByRole("navigation", { name: "图型目录" }).getByRole("link")).toHaveCount(17);
  7  |   await expect(page.locator('[data-rain-id="chart-area"] svg').first()).toBeVisible();
  8  | });
  9  | 
  10 | test("[P4] multiple candlesticks keep independent SVG gradients", async ({ page }) => {
  11 |   await page.goto("/bklit-catalog.html#chart-candlestick");
  12 |   await page.getByRole("button", { name: "对照实例" }).click();
  13 |   await expect(page.locator('[data-rain-id="chart-candlestick"]')).toHaveCount(2);
  14 |   await expect(page.locator('[data-rain-id="chart-candlestick"] svg').first()).toBeVisible();
  15 |   const ids = await page.locator("linearGradient[id]").evaluateAll(nodes => nodes.map(node => node.id));
  16 |   expect(ids.length).toBeGreaterThan(1);
  17 |   expect(new Set(ids).size).toBe(ids.length);
  18 | });
  19 | 
```