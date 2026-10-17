# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: icons.spec.ts >> the directory has discoverable entry points and restores route heading focus
- Location: tests/e2e/icons.spec.ts:18:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Icons 图标库', level: 1 })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Icons 图标库', level: 1 })

```

```yaml
- main:
  - status: 正在打开图标库…
```

# Test source

```ts
  1   | import { expect, test, type Page } from "@playwright/test";
  2   | 
  3   | import { iconCatalog } from "../../packages/foundations/src/icons/catalog.generated";
  4   | 
  5   | function gallery(page: Page) {
  6   |   return page.getByRole("list", { name: "图标列表" });
  7   | }
  8   | 
  9   | function card(page: Page, assetId: string) {
  10  |   return gallery(page).locator(`[data-asset-id="${assetId}"]`);
  11  | }
  12  | 
  13  | test.beforeEach(async ({ page }) => {
  14  |   await page.setViewportSize({ width: 1440, height: 1050 });
  15  |   await page.goto("/#icons");
  16  | });
  17  | 
  18  | test("the directory has discoverable entry points and restores route heading focus", async ({ page }) => {
> 19  |   await expect(page.getByRole("heading", { level: 1, name: "Icons 图标库" })).toBeVisible();
      |                                                                            ^ Error: expect(locator).toBeVisible() failed
  20  |   await expect(page.getByText("899 个来源图标")).toBeVisible();
  21  |   await expect(page.getByText("899 个可预览 · 0 个源图形待修复")).toBeVisible();
  22  |   await expect(page.getByText("原有图标视觉已验收")).toBeVisible();
  23  |   await expect(page.getByText("2 枚新增批改图标待视觉验收")).toBeVisible();
  24  |   await page.getByRole("link", { name: "返回总览", exact: true }).click();
  25  |   await page.getByRole("link", { name: /^Icons：/ }).click();
  26  |   await expect(page.getByRole("heading", { level: 1, name: "Icons 图标库" })).toBeFocused();
  27  |   await page.getByRole("link", { name: "体验文字按钮", exact: true }).click();
  28  |   await expect(page.getByRole("heading", { level: 1, name: "TextButton 文字按钮" })).toBeFocused();
  29  |   await page.getByRole("link", { name: "查看完整图标库", exact: true }).click();
  30  |   await expect(page.getByRole("heading", { level: 1, name: "Icons 图标库" })).toBeFocused();
  31  | });
  32  | 
  33  | test("the overview defers the full directory module until its route is opened", async ({ page }) => {
  34  |   await page.goto("about:blank");
  35  |   const requests: string[] = [];
  36  |   const isDirectoryModule = (url: string) => /\/(?:docs\/icons-page\.tsx|assets\/icons-page-[\w-]+\.js)$/.test(new URL(url).pathname);
  37  |   page.on("request", (request) => requests.push(request.url()));
  38  |   await page.goto("/#overview");
  39  |   await expect(page.getByRole("heading", { level: 1, name: "Rain Next Playground" })).toBeVisible();
  40  |   expect(requests.some(isDirectoryModule)).toBe(false);
  41  |   await page.getByRole("link", { name: /^Icons：/ }).click();
  42  |   await expect(page.getByRole("heading", { level: 1, name: "Icons 图标库" })).toBeFocused();
  43  |   expect(requests.some(isDirectoryModule)).toBe(true);
  44  | });
  45  | 
  46  | test("all frozen identities are reachable exactly once and every available preview decodes in the browser", async ({ page }) => {
  47  |   test.setTimeout(120_000);
  48  |   const pageErrors: string[] = [];
  49  |   page.on("pageerror", (error) => pageErrors.push(error.message));
  50  |   const expected = new Map(iconCatalog.map((asset) => [asset.assetId, asset]));
  51  |   expect(expected.size).toBe(899);
  52  |   expect(iconCatalog.filter((asset) => asset.source.kind !== "non-component")).toHaveLength(897);
  53  |   expect(iconCatalog.filter((asset) => asset.source.kind === "non-component").map((asset) => asset.assetId)).toEqual([
  54  |     "icon/grading-pending", "icon/grading-reviewed",
  55  |   ]);
  56  |   expect(iconCatalog.filter((asset) => asset.availability === "source-unavailable")).toEqual([]);
  57  | 
  58  |   const seen = new Set<string>();
  59  |   let pageNumber = 0;
  60  |   let decodedCount = 0;
  61  |   for (;;) {
  62  |     const cards = gallery(page).locator(":scope > li");
  63  |     await expect(cards).toHaveCount(Math.min(60, expected.size - pageNumber * 60));
  64  |     const rows = await cards.evaluateAll(async (elements) => Promise.all(elements.map(async (element) => {
  65  |       const assetId = element.getAttribute("data-asset-id");
  66  |       const preview = element.querySelector('[data-slot="icon-preview"]');
  67  |       const icon = preview?.querySelector<HTMLElement>('[data-rain-id="icon"]');
  68  |       const result = { assetId, iconId: icon?.getAttribute("data-icon") ?? null, availability: element.getAttribute("data-availability"), src: "", decoded: false, visiblePixels: 0, failure: "" };
  69  |       if (!icon) return result;
  70  |       const image = icon.querySelector("img");
  71  |       const mask = getComputedStyle(icon).maskImage;
  72  |       const src = image?.currentSrc || image?.src || /^url\(["']?(.*?)["']?\)$/.exec(mask)?.[1] || "";
  73  |       result.src = src;
  74  |       if (!src) { result.failure = "No image or mask source"; return result; }
  75  |       try {
  76  |         const decoded = new Image();
  77  |         decoded.src = src;
  78  |         await decoded.decode();
  79  |         result.decoded = decoded.naturalWidth > 0 && decoded.naturalHeight > 0;
  80  |         const canvas = document.createElement("canvas");
  81  |         canvas.width = canvas.height = 48;
  82  |         const context = canvas.getContext("2d");
  83  |         if (!context) throw new Error("Canvas alpha inspection is unavailable");
  84  |         context.drawImage(decoded, 0, 0, 48, 48);
  85  |         const pixels = context.getImageData(0, 0, 48, 48).data;
  86  |         for (let index = 3; index < pixels.length; index += 4) {
  87  |           if (pixels[index]! > 0) result.visiblePixels += 1;
  88  |         }
  89  |       } catch (error) {
  90  |         result.failure = error instanceof Error ? error.message : String(error);
  91  |       }
  92  |       return result;
  93  |     })));
  94  | 
  95  |     for (const row of rows) {
  96  |       expect(row.assetId).not.toBeNull();
  97  |       const asset = expected.get(row.assetId!);
  98  |       expect(asset, `Unexpected catalog identity ${row.assetId}`).toBeDefined();
  99  |       expect(seen.has(row.assetId!), `Duplicate page entry ${row.assetId}`).toBe(false);
  100 |       seen.add(row.assetId!);
  101 |       expect(row.availability).toBe(asset!.availability);
  102 |       if (asset!.source.kind === "non-component") {
  103 |         await expect(card(page, row.assetId!).getByText("新增批改图标 · 待视觉验收")).toBeVisible();
  104 |       }
  105 |       if (asset!.availability === "source-unavailable") {
  106 |         expect(row.iconId).toBeNull();
  107 |         expect(row.src).toBe("");
  108 |       } else {
  109 |         expect(row.iconId).toBe(row.assetId);
  110 |         expect(row.failure, row.assetId!).toBe("");
  111 |         expect(row.decoded, `${row.assetId} must decode from its own asset`).toBe(true);
  112 |         expect(row.visiblePixels, `${row.assetId} must contain visible source pixels`).toBeGreaterThan(0);
  113 |         // Vite inlines small originals and adds content hashes to production asset URLs.
  114 |         if (!row.src.startsWith("data:image/")) {
  115 |           const filename = new URL(row.src).pathname.split("/").at(-1);
  116 |           expect(filename, row.assetId!).toMatch(new RegExp(`^${asset!.slug}(?:-[\\w-]+)?\\.(?:svg|png)$`));
  117 |         }
  118 |         decodedCount += 1;
  119 |       }
```