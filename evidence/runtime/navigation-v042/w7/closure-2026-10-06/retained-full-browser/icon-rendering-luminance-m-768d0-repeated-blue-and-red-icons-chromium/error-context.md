# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: icon-rendering.spec.ts >> luminance masks remain isolated across repeated blue and red icons
- Location: tests/e2e/icon-rendering.spec.ts:247:1

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
  115 |       let alpha = maskAlpha * Number(ownStyle.opacity) * ink[3]! / 255;
  116 |       let premultiplied = ink.slice(0, 3).map((channel) => channel * alpha);
  117 |       for (const layer of layers) {
  118 |         const backgroundAlpha = layer.color[3]! / 255;
  119 |         premultiplied = premultiplied.map((channel, index) => (channel + layer.color[index]! * backgroundAlpha * (1 - alpha)) * layer.opacity);
  120 |         alpha = (alpha + backgroundAlpha * (1 - alpha)) * layer.opacity;
  121 |       }
  122 |       return premultiplied.map((channel) => channel + 255 * (1 - alpha));
  123 |     }
  124 |     return { foreground: composed(1), background: composed(0), color: ownStyle.color, maskSize: ownStyle.maskSize, maskPosition: ownStyle.maskPosition };
  125 |   });
  126 | }
  127 | 
  128 | async function rasterStats(page: Page, icon: Locator, reference: PngSource) {
  129 |   await icon.evaluate(async (element) => {
  130 |     const src = /^url\(["']?(.*?)["']?\)$/.exec(getComputedStyle(element).maskImage)?.[1];
  131 |     if (!src) throw new Error("A decodable image mask is required for pixel comparison");
  132 |     const image = new Image();
  133 |     image.src = src;
  134 |     await image.decode();
  135 |   });
  136 |   const endpoints = await paintEndpoints(icon);
  137 |   const screenshot = Array.from(await icon.screenshot({ animations: "disabled", scale: "css" }));
  138 |   return page.evaluate(async ({ actual, reference, endpoints }) => {
  139 |     async function decode(source: PngSource) {
  140 |       const objectUrl = typeof source === "string" ? undefined : URL.createObjectURL(new Blob([new Uint8Array(source)], { type: "image/png" }));
  141 |       const image = new Image();
  142 |       image.src = objectUrl ?? `data:image/png;base64,${source as string}`;
  143 |       try { await image.decode(); } finally { if (objectUrl) URL.revokeObjectURL(objectUrl); }
  144 |       return image;
  145 |     }
  146 |     const [rendered, original] = await Promise.all([decode(actual), decode(reference)]);
  147 |     const canvas = document.createElement("canvas");
  148 |     canvas.width = rendered.naturalWidth;
  149 |     canvas.height = rendered.naturalHeight;
  150 |     const context = canvas.getContext("2d")!;
  151 |     let maskWidth: number;
  152 |     let maskHeight: number;
  153 |     if (endpoints.maskSize === "contain") {
  154 |       const scale = Math.min(canvas.width / original.naturalWidth, canvas.height / original.naturalHeight);
  155 |       maskWidth = original.naturalWidth * scale;
  156 |       maskHeight = original.naturalHeight * scale;
  157 |     } else if (/^\d+(?:\.\d+)?%$/.test(endpoints.maskSize)) {
  158 |       // Button deliberately crops the canonical 24px canvas to its 20px ring.
  159 |       maskWidth = canvas.width * Number.parseFloat(endpoints.maskSize) / 100;
  160 |       maskHeight = maskWidth * original.naturalHeight / original.naturalWidth;
  161 |     } else {
  162 |       throw new Error(`Unverified mask-size geometry: ${endpoints.maskSize}`);
  163 |     }
  164 |     if (endpoints.maskPosition !== "50% 50%") throw new Error(`Unverified mask-position geometry: ${endpoints.maskPosition}`);
  165 |     context.drawImage(original, (canvas.width - maskWidth) / 2, (canvas.height - maskHeight) / 2, maskWidth, maskHeight);
  166 |     const expected = context.getImageData(0, 0, canvas.width, canvas.height).data;
  167 |     context.clearRect(0, 0, canvas.width, canvas.height);
  168 |     context.drawImage(rendered, 0, 0);
  169 |     const actualPixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  170 |     const delta = endpoints.foreground.map((channel, index) => channel - endpoints.background[index]!);
  171 |     const magnitude = delta.reduce((sum, channel) => sum + channel ** 2, 0);
  172 |     if (magnitude < 100) throw new Error("The mask foreground is indistinguishable from its host background");
  173 |     let error = 0;
  174 |     let referenceInk = 0;
  175 |     let renderedInk = 0;
  176 |     const referenceFadeBins = [0, 0, 0, 0];
  177 |     const renderedFadeBins = [0, 0, 0, 0];
  178 |     for (let offset = 0; offset < expected.length; offset += 4) {
  179 |       const alpha = expected[offset + 3]! / 255;
  180 |       const renderedAlpha = delta.reduce((sum, channel, index) => sum + (actualPixels[offset + index]! - endpoints.background[index]!) * channel, 0) / magnitude;
  181 |       if (alpha > 0.08) referenceInk += 1;
  182 |       if (renderedAlpha > 0.08) renderedInk += 1;
  183 |       if (alpha > 0.05 && alpha < 0.95) referenceFadeBins[Math.min(3, Math.floor(alpha * 4))]! += 1;
  184 |       if (renderedAlpha > 0.05 && renderedAlpha < 0.95) renderedFadeBins[Math.min(3, Math.floor(renderedAlpha * 4))]! += 1;
  185 |       for (let channel = 0; channel < 3; channel += 1) {
  186 |         error += Math.abs(actualPixels[offset + channel]! - (endpoints.background[channel]! + delta[channel]! * alpha));
  187 |       }
  188 |     }
  189 |     return {
  190 |       width: canvas.width,
  191 |       height: canvas.height,
  192 |       referenceWidth: original.naturalWidth,
  193 |       referenceHeight: original.naturalHeight,
  194 |       meanRgbError: error / (canvas.width * canvas.height * 3),
  195 |       referenceInk,
  196 |       renderedInk,
  197 |       referenceFadeBins,
  198 |       renderedFadeBins,
  199 |     };
  200 |   }, { actual: screenshot, reference, endpoints });
  201 | }
  202 | 
  203 | async function expectRaster(page: Page, icon: Locator, png: PngSource, label: string, maxError = 4) {
  204 |   const stats = await rasterStats(page, icon, png);
  205 |   expect(stats.referenceInk, `${label}: source must have visible pixels`).toBeGreaterThan(8);
  206 |   expect(stats.renderedInk / stats.referenceInk, `${label}: visible shape coverage`).toBeGreaterThan(0.7);
  207 |   expect(stats.renderedInk / stats.referenceInk, `${label}: mask must not turn into a rectangle`).toBeLessThan(1.3);
  208 |   expect(stats.meanRgbError, `${label}: screenshot versus source alpha`).toBeLessThan(maxError);
  209 |   return stats;
  210 | }
  211 | 
  212 | test.beforeEach(async ({ page }) => {
  213 |   await page.setViewportSize({ width: 1440, height: 1050 });
  214 |   await page.goto("/#icons");
> 215 |   await expect(page.getByRole("heading", { name: "Icons 图标库", level: 1 })).toBeVisible();
      |                                                                            ^ Error: expect(locator).toBeVisible() failed
  216 | });
  217 | 
  218 | test("the nine Figma PNG references retain their shapes in actual CSS masks", async ({ page }) => {
  219 |   test.setTimeout(90_000);
  220 |   for (const reference of references()) {
  221 |     const original = await galleryIcon(page, reference.assetId);
  222 |     const icon = await mountIconHosts(page, original, [{ foreground: "rgb(29, 33, 41)", background: "white" }]);
  223 |     const stats = await expectRaster(page, icon, reference.png, reference.assetId);
  224 |     expect([stats.referenceWidth, stats.referenceHeight, stats.width, stats.height]).toEqual([72, 72, 72, 72]);
  225 |   }
  226 | });
  227 | 
  228 | test("the same icon paints the actual default, blue, red and inverse host colors", async ({ page }) => {
  229 |   const reference = references().find((item) => item.assetId === "icon/edit-pencil")!;
  230 |   const original = await galleryIcon(page, reference.assetId);
  231 |   const source = await original.evaluate((element) => getComputedStyle(element).maskImage);
  232 |   const seenColors = new Set<string>();
  233 |   for (const name of ["默认", "主题蓝", "危险红", "深色底"]) {
  234 |     await clearStage(page);
  235 |     await page.getByRole("radio", { name, exact: true }).check();
  236 |     await expect(original).toHaveCSS("mask-image", source);
  237 |     const copy = await mountIconHosts(page, original);
  238 |     const color = await copy.evaluate((element) => getComputedStyle(element.parentElement!).color);
  239 |     seenColors.add(color);
  240 |     await expect(copy).toHaveCSS("color", color);
  241 |     await expect(copy).toHaveCSS("background-color", color);
  242 |     await expectRaster(page, copy, reference.png, `edit / ${name}`);
  243 |   }
  244 |   expect(seenColors.size).toBe(4);
  245 | });
  246 | 
  247 | test("luminance masks remain isolated across repeated blue and red icons", async ({ page }) => {
  248 |   for (const assetId of ["icon/arrow-down", "icon/arrow-up", "icon/check-bold"]) {
  249 |     const reference = references().find((item) => item.assetId === assetId)!;
  250 |     const original = await galleryIcon(page, assetId);
  251 |     const copies = await mountIconHosts(page, original, [
  252 |       { foreground: "rgb(21, 97, 248)", background: "white" },
  253 |       { foreground: "rgb(201, 52, 63)", background: "white" },
  254 |     ]);
  255 |     await expect(copies).toHaveCount(2);
  256 |     const duplicateIds = await page.locator(stageSelector).evaluate((element) => {
  257 |       const ids = Array.from(element.querySelectorAll("[id]"), (node) => node.id);
  258 |       return ids.filter((id, index) => ids.indexOf(id) !== index);
  259 |     });
  260 |     expect(duplicateIds, `${assetId}: repeated instances must not share local defs IDs`).toEqual([]);
  261 |     await expectRaster(page, copies.nth(0), reference.png, `${assetId} / blue`);
  262 |     await expectRaster(page, copies.nth(1), reference.png, `${assetId} / red`);
  263 |   }
  264 | });
  265 | 
  266 | test("primary-button icon pixels follow the host through hover, pressed and disabled states", async ({ page }) => {
  267 |   await page.goto("/#components");
  268 |   const disabledClassName = await page
  269 |     .getByRole("button", { name: "主按钮停用", exact: true })
  270 |     .getAttribute("class");
  271 |   expect(disabledClassName).toContain("opacity-rain-button-disabled-primary");
  272 |   await page.goto("/#icons");
  273 |   await expect(page.getByRole("heading", { name: "Icons 图标库", level: 1 })).toBeVisible();
  274 | 
  275 |   const reference = references().find((item) => item.assetId === "icon/edit-pencil")!;
  276 |   const button = await mountButtonHost(page, page.getByRole("button", { name: "编辑课程", exact: true }));
  277 |   const icon = button.locator('[data-icon="icon/edit-pencil"]');
  278 |   const source = await icon.evaluate((element) => getComputedStyle(element).maskImage);
  279 |   await expect(button).toHaveCSS("color", "rgb(255, 255, 255)");
  280 |   const normalBackground = await button.evaluate((element) => getComputedStyle(element).backgroundColor);
  281 |   await expectRaster(page, icon, reference.png, "primary / normal", 10);
  282 | 
  283 |   await button.hover();
  284 |   await expect(button).toHaveCSS("background-color", "rgba(0, 58, 173, 0.85)");
  285 |   expect(await button.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(normalBackground);
  286 |   const hoveredBorder = await button.evaluate((element) => getComputedStyle(element).borderColor);
  287 |   await expectRaster(page, icon, reference.png, "primary / hover", 10);
  288 |   await page.mouse.down();
  289 |   try {
  290 |     await expect(button).toHaveCSS("background-color", "rgba(0, 58, 173, 0.85)");
  291 |     await expect(button).toHaveCSS("border-color", "rgb(61, 123, 255)");
  292 |     expect(await button.evaluate((element) => getComputedStyle(element).borderColor)).not.toBe(hoveredBorder);
  293 |     await expect(icon).toHaveCSS("color", "rgb(255, 255, 255)");
  294 |     await expectRaster(page, icon, reference.png, "primary / pressed", 10);
  295 |   } finally {
  296 |     await page.mouse.up();
  297 |   }
  298 | 
  299 |   // This clone is detached from React, so mirror native/data state and the
  300 |   // class recipe read from a real disabled primary Button on the review page.
  301 |   await button.evaluate((element: HTMLButtonElement, className) => {
  302 |     element.disabled = true;
  303 |     element.dataset.state = "disabled";
  304 |     element.className = className!;
  305 |   }, disabledClassName);
  306 |   await expect(button).toHaveCSS("opacity", "0.3");
  307 |   await expect(icon).toHaveCSS("opacity", "1");
  308 |   await expect(icon).toHaveCSS("color", "rgb(255, 255, 255)");
  309 |   await expect(icon).toHaveCSS("mask-image", source);
  310 |   await expectRaster(page, icon, reference.png, "primary / disabled", 10);
  311 | });
  312 | 
  313 | test("Loading retains the source alpha fade and stops rotation under reduced motion", async ({ page }) => {
  314 |   const png = loadingReference();
  315 |   const original = await galleryIcon(page, "icon/button-loading");
```