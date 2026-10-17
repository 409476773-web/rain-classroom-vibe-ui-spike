# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-variants.spec.ts >> [T13] live-line: all 9 frozen cards render real geometry and readable data at 1440 and 390
- Location: tests/e2e/chart-variants.spec.ts:50:3

# Error details

```
Error: live-line-interactive replay preserves the precise data

expect(locator).toHaveText(expected) failed

Locator:  locator('[data-chart-variant="live-line-interactive"]').getByRole('table')
Expected: "示例精确数据Unix 秒时分秒实时人数 · 人179144575849:1898179144575949:19105179144576049:20111179144576149:21116179144576249:22119179144576349:23120179144576449:24119179144576549:25116179144576649:26112179144576749:27106179144576849:2899179144576949:2992179144577049:3086179144577149:3181179144577249:3278179144577349:3376179144577449:3477179144577549:3579179144577649:3684179144577749:3790179144577849:3896179144577949:39103179144578049:40109179144578149:41114179144578249:42118179144578349:43120179144578449:44120179144578549:45117179144578649:46113179144578749:47107179144578849:48101179144578949:4994179144579049:5088179144579149:5182179144579249:5278179144579349:5376179144579449:5476179144579549:5578179144579649:5682179144579749:5788179144579849:5894179144579949:59101179144580050:00108179144580150:01113179144580250:02117179144580350:03120179144580450:04120179144580550:05118179144580650:06114179144580750:07109179144580850:08103179144580950:0996179144581050:1089179144581150:1183179144581250:1279179144581350:1377179144581450:1476179144581550:1578179144581650:1681179144581750:1786"
Received: "示例精确数据Unix 秒时分秒实时人数 · 人179144575949:1998179144576049:20105179144576149:21111179144576249:22116179144576349:23119179144576449:24120179144576549:25119179144576649:26116179144576749:27112179144576849:28106179144576949:2999179144577049:3092179144577149:3186179144577249:3281179144577349:3378179144577449:3476179144577549:3577179144577649:3679179144577749:3784179144577849:3890179144577949:3996179144578049:40103179144578149:41109179144578249:42114179144578349:43118179144578449:44120179144578549:45120179144578649:46117179144578749:47113179144578849:48107179144578949:49101179144579049:5094179144579149:5188179144579249:5282179144579349:5378179144579449:5476179144579549:5576179144579649:5678179144579749:5782179144579849:5888179144579949:5994179144580050:00101179144580150:01108179144580250:02113179144580350:03117179144580450:04120179144580550:05120179144580650:06118179144580750:07114179144580850:08109179144580950:09103179144581050:1096179144581150:1189179144581250:1283179144581350:1379179144581450:1477179144581550:1576179144581650:1678179144581750:1781179144581850:1886"
Timeout:  5000ms

Call log:
  - live-line-interactive replay preserves the precise data with timeout 5000ms
  - waiting for locator('[data-chart-variant="live-line-interactive"]').getByRole('table')
    14 × locator resolved to <table>…</table>
       - unexpected value "示例精确数据Unix 秒时分秒实时人数 · 人179144575949:1998179144576049:20105179144576149:21111179144576249:22116179144576349:23119179144576449:24120179144576549:25119179144576649:26116179144576749:27112179144576849:28106179144576949:2999179144577049:3092179144577149:3186179144577249:3281179144577349:3378179144577449:3476179144577549:3577179144577649:3679179144577749:3784179144577849:3890179144577949:3996179144578049:40103179144578149:41109179144578249:42114179144578349:43118179144578449:44120179144578549:45120179144578649:46117179144578749:47113179144578849:48107179144578949:49101179144579049:5094179144579149:5188179144579249:5282179144579349:5378179144579449:5476179144579549:5576179144579649:5678179144579749:5782179144579849:5888179144579949:5994179144580050:00101179144580150:01108179144580250:02113179144580350:03117179144580450:04120179144580550:05120179144580650:06118179144580750:07114179144580850:08109179144580950:09103179144581050:1096179144581150:1189179144581250:1283179144581350:1379179144581450:1477179144581550:1576179144581650:1678179144581750:1781179144581850:1886"

```

```yaml
- table "示例精确数据":
  - caption: 示例精确数据
  - rowgroup:
    - row "Unix 秒 时分秒 实时人数 · 人":
      - columnheader "Unix 秒"
      - columnheader "时分秒"
      - columnheader "实时人数 · 人"
  - rowgroup:
    - row "1791445759 49:19 98":
      - rowheader "1791445759"
      - cell "49:19"
      - cell "98"
    - row "1791445760 49:20 105":
      - rowheader "1791445760"
      - cell "49:20"
      - cell "105"
    - row "1791445761 49:21 111":
      - rowheader "1791445761"
      - cell "49:21"
      - cell "111"
    - row "1791445762 49:22 116":
      - rowheader "1791445762"
      - cell "49:22"
      - cell "116"
    - row "1791445763 49:23 119":
      - rowheader "1791445763"
      - cell "49:23"
      - cell "119"
    - row "1791445764 49:24 120":
      - rowheader "1791445764"
      - cell "49:24"
      - cell "120"
    - row "1791445765 49:25 119":
      - rowheader "1791445765"
      - cell "49:25"
      - cell "119"
    - row "1791445766 49:26 116":
      - rowheader "1791445766"
      - cell "49:26"
      - cell "116"
    - row "1791445767 49:27 112":
      - rowheader "1791445767"
      - cell "49:27"
      - cell "112"
    - row "1791445768 49:28 106":
      - rowheader "1791445768"
      - cell "49:28"
      - cell "106"
    - row "1791445769 49:29 99":
      - rowheader "1791445769"
      - cell "49:29"
      - cell "99"
    - row "1791445770 49:30 92":
      - rowheader "1791445770"
      - cell "49:30"
      - cell "92"
    - row "1791445771 49:31 86":
      - rowheader "1791445771"
      - cell "49:31"
      - cell "86"
    - row "1791445772 49:32 81":
      - rowheader "1791445772"
      - cell "49:32"
      - cell "81"
    - row "1791445773 49:33 78":
      - rowheader "1791445773"
      - cell "49:33"
      - cell "78"
    - row "1791445774 49:34 76":
      - rowheader "1791445774"
      - cell "49:34"
      - cell "76"
    - row "1791445775 49:35 77":
      - rowheader "1791445775"
      - cell "49:35"
      - cell "77"
    - row "1791445776 49:36 79":
      - rowheader "1791445776"
      - cell "49:36"
      - cell "79"
    - row "1791445777 49:37 84":
      - rowheader "1791445777"
      - cell "49:37"
      - cell "84"
    - row "1791445778 49:38 90":
      - rowheader "1791445778"
      - cell "49:38"
      - cell "90"
    - row "1791445779 49:39 96":
      - rowheader "1791445779"
      - cell "49:39"
      - cell "96"
    - row "1791445780 49:40 103":
      - rowheader "1791445780"
      - cell "49:40"
      - cell "103"
    - row "1791445781 49:41 109":
      - rowheader "1791445781"
      - cell "49:41"
      - cell "109"
    - row "1791445782 49:42 114":
      - rowheader "1791445782"
      - cell "49:42"
      - cell "114"
    - row "1791445783 49:43 118":
      - rowheader "1791445783"
      - cell "49:43"
      - cell "118"
    - row "1791445784 49:44 120":
      - rowheader "1791445784"
      - cell "49:44"
      - cell "120"
    - row "1791445785 49:45 120":
      - rowheader "1791445785"
      - cell "49:45"
      - cell "120"
    - row "1791445786 49:46 117":
      - rowheader "1791445786"
      - cell "49:46"
      - cell "117"
    - row "1791445787 49:47 113":
      - rowheader "1791445787"
      - cell "49:47"
      - cell "113"
    - row "1791445788 49:48 107":
      - rowheader "1791445788"
      - cell "49:48"
      - cell "107"
    - row "1791445789 49:49 101":
      - rowheader "1791445789"
      - cell "49:49"
      - cell "101"
    - row "1791445790 49:50 94":
      - rowheader "1791445790"
      - cell "49:50"
      - cell "94"
    - row "1791445791 49:51 88":
      - rowheader "1791445791"
      - cell "49:51"
      - cell "88"
    - row "1791445792 49:52 82":
      - rowheader "1791445792"
      - cell "49:52"
      - cell "82"
    - row "1791445793 49:53 78":
      - rowheader "1791445793"
      - cell "49:53"
      - cell "78"
    - row "1791445794 49:54 76":
      - rowheader "1791445794"
      - cell "49:54"
      - cell "76"
    - row "1791445795 49:55 76":
      - rowheader "1791445795"
      - cell "49:55"
      - cell "76"
    - row "1791445796 49:56 78":
      - rowheader "1791445796"
      - cell "49:56"
      - cell "78"
    - row "1791445797 49:57 82":
      - rowheader "1791445797"
      - cell "49:57"
      - cell "82"
    - row "1791445798 49:58 88":
      - rowheader "1791445798"
      - cell "49:58"
      - cell "88"
    - row "1791445799 49:59 94":
      - rowheader "1791445799"
      - cell "49:59"
      - cell "94"
    - row "1791445800 50:00 101":
      - rowheader "1791445800"
      - cell "50:00"
      - cell "101"
    - row "1791445801 50:01 108":
      - rowheader "1791445801"
      - cell "50:01"
      - cell "108"
    - row "1791445802 50:02 113":
      - rowheader "1791445802"
      - cell "50:02"
      - cell "113"
    - row "1791445803 50:03 117":
      - rowheader "1791445803"
      - cell "50:03"
      - cell "117"
    - row "1791445804 50:04 120":
      - rowheader "1791445804"
      - cell "50:04"
      - cell "120"
    - row "1791445805 50:05 120":
      - rowheader "1791445805"
      - cell "50:05"
      - cell "120"
    - row "1791445806 50:06 118":
      - rowheader "1791445806"
      - cell "50:06"
      - cell "118"
    - row "1791445807 50:07 114":
      - rowheader "1791445807"
      - cell "50:07"
      - cell "114"
    - row "1791445808 50:08 109":
      - rowheader "1791445808"
      - cell "50:08"
      - cell "109"
    - row "1791445809 50:09 103":
      - rowheader "1791445809"
      - cell "50:09"
      - cell "103"
    - row "1791445810 50:10 96":
      - rowheader "1791445810"
      - cell "50:10"
      - cell "96"
    - row "1791445811 50:11 89":
      - rowheader "1791445811"
      - cell "50:11"
      - cell "89"
    - row "1791445812 50:12 83":
      - rowheader "1791445812"
      - cell "50:12"
      - cell "83"
    - row "1791445813 50:13 79":
      - rowheader "1791445813"
      - cell "50:13"
      - cell "79"
    - row "1791445814 50:14 77":
      - rowheader "1791445814"
      - cell "50:14"
      - cell "77"
    - row "1791445815 50:15 76":
      - rowheader "1791445815"
      - cell "50:15"
      - cell "76"
    - row "1791445816 50:16 78":
      - rowheader "1791445816"
      - cell "50:16"
      - cell "78"
    - row "1791445817 50:17 81":
      - rowheader "1791445817"
      - cell "50:17"
      - cell "81"
    - row "1791445818 50:18 86":
      - rowheader "1791445818"
      - cell "50:18"
      - cell "86"
```

# Test source

```ts
  14  |   await first.getByRole("button", { name: "更新数据", exact: true }).click();
  15  |   await expect(first.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
  16  |   await expect(second.getByRole("status").filter({ hasText: "已更新 0 次" })).toHaveCount(1);
  17  |   await page.getByRole("button", { name: "基础结构", exact: true }).click();
  18  |   await expect(page.locator("#chart-bar-variants-structure")).toBeFocused();
  19  |   await expect(page).toHaveURL(/#chart-bar$/);
  20  |   for (const width of [1440, 900, 390]) {
  21  |     await page.setViewportSize({ width, height: 1000 });
  22  |     await first.scrollIntoViewIfNeeded();
  23  |     await first.getByText("查看本卡代码", { exact: true }).click();
  24  |     await expect(first.locator("pre")).toContainText('variantId="bar-default"');
  25  |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  26  |     await mkdir(evidence, { recursive: true });
  27  |     await first.screenshot({ path: `${evidence}/bar-default-category-wide-normal-${width}-reduce.png` });
  28  |     await first.getByText("查看本卡代码", { exact: true }).click();
  29  |   }
  30  | });
  31  | 
  32  | test("[T03] each displayed card exposes its actual family source and current parameters", async ({ page }) => {
  33  |   await page.emulateMedia({ reducedMotion: "reduce" });
  34  |   await page.goto("/#chart-bar");
  35  |   const card = page.locator('[data-chart-variant="bar-default"]');
  36  |   await card.scrollIntoViewIfNeeded();
  37  |   await page.getByRole("combobox", { name: "视觉配方", exact: true }).selectOption("monochrome-blue");
  38  |   await card.getByRole("button", { name: "更新数据", exact: true }).click();
  39  |   await card.getByText("查看本卡代码", { exact: true }).click();
  40  |   await expect(card.locator("pre")).toContainText('recipe="monochrome-blue" revision={1}');
  41  |   await card.getByRole("combobox", { name: "本卡源码文件" }).selectOption("chart-variants/bar.tsx");
  42  |   await expect(card.locator("pre")).toContainText("export function BarVariant");
  43  |   const href = await card.getByRole("link", { name: "下载 chart-variants/bar.tsx", exact: true }).getAttribute("href");
  44  |   expect(decodeURIComponent(href!)).toContain('from "@rain-next/ui/charts"');
  45  | });
  46  | 
  47  | const familyIds = [...new Set(CHART_VARIANT_REFERENCE.map(row => row.chartId))];
  48  | for (const family of familyIds) {
  49  |   const variants = CHART_VARIANT_REFERENCE.filter(row => row.chartId === family);
  50  |   test(`[T13] ${family}: all ${variants.length} frozen cards render real geometry and readable data at 1440 and 390`, async ({ page }) => {
  51  |     test.setTimeout(180_000);
  52  |     const errors: string[] = [];
  53  |     page.on("pageerror", error => errors.push(error.message));
  54  |     page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  55  |     await page.emulateMedia({ reducedMotion: "reduce" });
  56  |     await page.setViewportSize({ width: 1440, height: 1000 });
  57  |     await page.goto(`/#chart-${family}`);
  58  |     await expect(page.locator("[data-chart-variant]")).toHaveCount(variants.length);
  59  |     await mkdir(evidence, { recursive: true });
  60  |     const audit: Record<string, unknown>[] = [];
  61  |     for (const width of [1440, 390]) {
  62  |       await page.setViewportSize({ width, height: 1000 });
  63  |       for (const variant of variants) {
  64  |         const card = page.locator(`[data-chart-variant="${variant.id}"]`);
  65  |         await card.scrollIntoViewIfNeeded();
  66  |         await expect(card.locator('[data-ready="true"]')).toBeVisible();
  67  |         await expect(card).toHaveAttribute("data-active", "true");
  68  |         const showData = card.getByRole("button", { name: "显示数据", exact: true });
  69  |         if (await showData.count()) await showData.click();
  70  |         const geometry = async () => card.locator(".rain-chart-variant__plot").evaluate(plot => {
  71  |           const roots = [...plot.querySelectorAll('[data-slot="chart-root"]')];
  72  |           const invalid: string[] = [];
  73  |           const marks = roots.flatMap(root => [...root.querySelectorAll("svg path[d], svg rect, svg circle, svg polygon, svg line")]).filter(node => {
  74  |             if (node.closest("defs, clipPath, mask")) return false;
  75  |             for (const name of ["d", "points", "x", "y", "width", "height", "cx", "cy", "r", "x1", "x2", "y1", "y2"]) {
  76  |               const value = node.getAttribute(name);
  77  |               if (value && /NaN|Infinity|undefined/.test(value)) invalid.push(`${node.tagName}.${name}=${value}`);
  78  |             }
  79  |             const rect = node.getBoundingClientRect();
  80  |             const style = getComputedStyle(node);
  81  |             const painted = style.fill !== "none" && style.fill !== "transparent" && style.fill !== "rgba(0, 0, 0, 0)" || style.stroke !== "none" && style.stroke !== "transparent";
  82  |             return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none" && Number(style.opacity) > 0 && painted;
  83  |           });
  84  |           return { nativeRoots: roots.length, visibleMarks: marks.length, paths: marks.filter(node => node.tagName.toLowerCase() === "path").length, invalid };
  85  |         });
  86  |         await expect.poll(async () => (await geometry()).visibleMarks, { message: `${variant.id} has painted finite native marks at ${width}px` }).toBeGreaterThan(0);
  87  |         const result = await geometry();
  88  |         expect(result.nativeRoots, variant.id).toBeGreaterThan(0);
  89  |         expect(result.invalid, variant.id).toEqual([]);
  90  |         if (family === "funnel") {
  91  |           const labelOpacity = await card.locator('[data-slot="chart-root"] span.font-medium').evaluateAll(labels => labels.map(label => label.closest<HTMLElement>(".absolute.inset-0")?.style.opacity));
  92  |           expect(labelOpacity, `${variant.id} reduced-motion labels appear immediately`).toEqual(["1", "1", "1", "1"]);
  93  |         }
  94  |         const summary = card.getByText("查看精确数据", { exact: true });
  95  |         await summary.click();
  96  |         const table = card.getByRole("table");
  97  |         await expect(table, `${variant.id} exact data is readable`).toBeVisible();
  98  |         const rows = await table.locator("tbody tr").count();
  99  |         expect(rows, variant.id).toBeGreaterThan(0);
  100 |         expect(await table.textContent(), variant.id).not.toMatch(/NaN|Infinity|undefined/);
  101 |         let operations: { updateVerified?: boolean; replayVerified?: boolean; updateRevision?: number } = {};
  102 |         if (width === 1440) {
  103 |           const initialData = await table.textContent();
  104 |           await card.getByRole("button", { name: "更新数据", exact: true }).click();
  105 |           await expect(card.getByRole("status").filter({ hasText: "已更新 1 次" }), `${variant.id} update advances only this card`).toBeVisible();
  106 |           await expect.poll(() => table.textContent(), { message: `${variant.id} update changes the precise data` }).not.toBe(initialData);
  107 |           await expect.poll(async () => (await geometry()).visibleMarks, { message: `${variant.id} updated data paints native marks` }).toBeGreaterThan(0);
  108 |           const updatedGeometry = await geometry();
  109 |           expect(updatedGeometry.nativeRoots, `${variant.id} updated native root`).toBeGreaterThan(0);
  110 |           expect(updatedGeometry.invalid, `${variant.id} updated finite geometry`).toEqual([]);
  111 |           const updatedData = await table.textContent();
  112 |           expect(updatedData, `${variant.id} updated readable data`).not.toMatch(/NaN|Infinity|undefined/);
  113 |           await card.getByRole("button", { name: "重播动效", exact: true }).click();
> 114 |           await expect(table, `${variant.id} replay preserves the precise data`).toHaveText(updatedData!);
      |                                                                                  ^ Error: live-line-interactive replay preserves the precise data
  115 |           await expect(card.getByRole("status").filter({ hasText: "已更新 1 次" })).toBeVisible();
  116 |           await expect.poll(async () => (await geometry()).visibleMarks, { message: `${variant.id} replay paints native marks` }).toBeGreaterThan(0);
  117 |           const replayedGeometry = await geometry();
  118 |           expect(replayedGeometry.nativeRoots, `${variant.id} replayed native root`).toBeGreaterThan(0);
  119 |           expect(replayedGeometry.invalid, `${variant.id} replayed finite geometry`).toEqual([]);
  120 |           operations = { updateVerified: true, replayVerified: true, updateRevision: 1 };
  121 |         }
  122 |         await summary.click();
  123 |         expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${variant.id} at ${width}px`).toBe(true);
  124 |         const duplicateDefs = await page.evaluate(() => {
  125 |           const ids = [...document.querySelectorAll("svg defs [id]")].map(node => node.id);
  126 |           return ids.filter((id, index) => ids.indexOf(id) !== index);
  127 |         });
  128 |         expect(duplicateDefs, `${variant.id} SVG definitions are instance-safe`).toEqual([]);
  129 |         audit.push({ id: variant.id, width, ...result, rows, duplicateDefs, ...operations });
  130 |         if (variant === variants[0]) {
  131 |           await card.scrollIntoViewIfNeeded();
  132 |           await card.screenshot({ path: `${evidence}/${family}-${width}-all-variants-reduce.png` });
  133 |         }
  134 |       }
  135 |     }
  136 |     await writeFile(`${evidence}/${family}-render-audit.json`, `${JSON.stringify({ family, count: variants.length, errors, audit }, null, 2)}\n`);
  137 |     expect(errors, `${family} browser errors`).toEqual([]);
  138 |   });
  139 | }
  140 | 
  141 | test("[T14] paused and reduced live charts keep mouse-driven tooltip reading", async ({ page }) => {
  142 |   for (const reducedMotion of ["no-preference", "reduce"] as const) {
  143 |     await page.emulateMedia({ reducedMotion });
  144 |     await page.goto("/#chart-live-line");
  145 |     const card = page.locator('[data-chart-variant="live-line-default"]');
  146 |     await card.scrollIntoViewIfNeeded();
  147 |     const svg = card.locator('[data-rain-id="ui-chart-live-line"] svg').first();
  148 |     await expect(svg).toBeVisible();
  149 |     if (reducedMotion === "no-preference") await card.getByRole("button", { name: "暂停实时", exact: true }).click();
  150 |     const box = (await svg.boundingBox())!;
  151 |     const tooltip = card.locator(".rain-chart-tooltip");
  152 |     await page.mouse.move(box.x + box.width * .4, box.y + box.height * .5);
  153 |     await expect(tooltip).toBeVisible();
  154 |     await expect(tooltip).toContainText("实时人数 · 插值读数");
  155 |     const first = await tooltip.textContent();
  156 |     await page.mouse.move(box.x + box.width * .65, box.y + box.height * .5);
  157 |     await expect.poll(() => tooltip.textContent()).not.toBe(first);
  158 |     await page.mouse.move(box.x - 10, box.y - 10);
  159 |     await expect(tooltip).toHaveCount(0);
  160 |   }
  161 | });
  162 | 
  163 | test("[T15] current Gauge value and paused Live point buffer are present in downloaded calls", async ({ page }) => {
  164 |   await page.emulateMedia({ reducedMotion: "reduce" });
  165 |   await page.goto("/#chart-gauge");
  166 |   const gauge = page.locator('[data-chart-variant="gauge-default"]');
  167 |   await gauge.scrollIntoViewIfNeeded();
  168 |   await gauge.getByRole("button", { name: "0%", exact: true }).click();
  169 |   await gauge.getByText("查看本卡代码", { exact: true }).click();
  170 |   await expect(gauge.locator("pre")).toContainText('"value":0');
  171 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  172 |   await page.goto("/#chart-live-line");
  173 |   const live = page.locator('[data-chart-variant="live-line-default"]');
  174 |   await live.scrollIntoViewIfNeeded();
  175 |   await live.getByRole("button", { name: "暂停实时", exact: true }).click();
  176 |   await live.getByText("查看本卡代码", { exact: true }).click();
  177 |   await expect(live.locator("pre")).toContainText('"paused":true');
  178 |   await expect(live.locator("pre")).toContainText('"points":[');
  179 |   await expect(live.locator("pre")).toContainText('"frozenNow":');
  180 |   await live.getByRole("button", { name: "追加一次", exact: true }).click();
  181 |   const raw = await live.locator("pre").textContent();
  182 |   const snapshot = JSON.parse(raw!.match(/useState<VariantSettings>\((\{.+\})\);/)![1]!);
  183 |   expect(snapshot.points.length).toBe(await live.locator("tbody tr").count());
  184 |   expect(snapshot.points.at(-1).time * 1000).toBeCloseTo(snapshot.frozenNow, 1);
  185 | });
  186 | 
```