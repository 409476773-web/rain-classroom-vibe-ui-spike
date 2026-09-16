# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: core-ui.spec.ts >> Button Token recipes paint their real surfaces and preserve loading readability
- Location: tests/e2e/core-ui.spec.ts:7:1

# Error details

```
Error: button-primary-default-default/light/task background

expect(received).toBeLessThan(expected)

Expected: < 1.2
Received:   234
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - link "返回组件页" [ref=e6] [cursor=pointer]:
        - /url: "#components"
      - heading "按钮 Token 对照" [level=1] [ref=e7]
      - paragraph [ref=e8]: 普通按钮与文字按钮，共享新的颜色来源，保留完整尺寸组合。
      - paragraph [ref=e9]:
        - strong [ref=e10]: 普通按钮与文字按钮的新配方已通过视觉验收。
        - text: 全局 Tab 双层光环也已确认，品牌色细环与半透明浅蓝外圈共用现有 Token。
    - group "对照环境" [ref=e11]:
      - generic [ref=e12]:
        - text: 主题
        - combobox "主题" [ref=e13]:
          - option "Light · 浅色" [selected]
          - option "Dark · 深色"
      - generic [ref=e14]:
        - text: 按钮所在底色
        - combobox "按钮所在底色" [ref=e15]:
          - option "任务表面 · Background/Neutral/1" [selected]
          - option "页面底色 · Background/Neutral/3"
      - generic [ref=e16]:
        - text: 默认密度
        - combobox "默认密度" [ref=e17]:
          - option "Default · 常规" [selected]
          - option "Compact · 紧凑"
    - generic [ref=e18]:
      - region [ref=e19]:
        - heading "九组外观与状态" [level=2] [ref=e20]
        - paragraph [ref=e21]: 移入、按住默认按钮，或按 Tab 查看键盘焦点：细环使用 Border/Brand/1，浅色外圈使用 Fill/Brand/Alpha/3。所有操作只在本页记录次数。
        - table [ref=e23]:
          - rowgroup [ref=e24]:
            - row [ref=e25]:
              - columnheader "外观" [ref=e26]
              - columnheader "默认 · 可操作" [ref=e27]
              - columnheader "禁用" [ref=e28]
              - columnheader "加载中" [ref=e29]
          - rowgroup [ref=e30]:
            - row [ref=e31]:
              - rowheader "普通 · 主按钮" [ref=e32]
              - cell [ref=e33]:
                - button "操作示例" [ref=e34] [cursor=pointer]
              - cell [ref=e36]:
                - button "操作示例" [disabled] [ref=e37]
              - cell [ref=e39]:
                - button "操作示例" [disabled] [ref=e40]
            - row [ref=e43]:
              - rowheader "普通 · 次按钮" [ref=e44]
              - cell [ref=e45]:
                - button "操作示例" [ref=e46] [cursor=pointer]
              - cell [ref=e48]:
                - button "操作示例" [disabled] [ref=e49]
              - cell [ref=e51]:
                - button "操作示例" [disabled] [ref=e52]
            - row [ref=e55]:
              - rowheader "普通 · 轻按钮" [ref=e56]
              - cell [ref=e57]:
                - button "操作示例" [ref=e58] [cursor=pointer]
              - cell [ref=e60]:
                - button "操作示例" [disabled] [ref=e61]
              - cell [ref=e63]:
                - button "操作示例" [disabled] [ref=e64]
            - row [ref=e67]:
              - rowheader "危险 · 主按钮" [ref=e68]
              - cell [ref=e69]:
                - button "操作示例" [ref=e70] [cursor=pointer]
              - cell [ref=e72]:
                - button "操作示例" [disabled] [ref=e73]
              - cell [ref=e75]:
                - button "操作示例" [disabled] [ref=e76]
            - row [ref=e79]:
              - rowheader "危险 · 次按钮" [ref=e80]
              - cell [ref=e81]:
                - button "操作示例" [ref=e82] [cursor=pointer]
              - cell [ref=e84]:
                - button "操作示例" [disabled] [ref=e85]
              - cell [ref=e87]:
                - button "操作示例" [disabled] [ref=e88]
            - row [ref=e91]:
              - rowheader "危险 · 轻按钮" [ref=e92]
              - cell [ref=e93]:
                - button "操作示例" [ref=e94] [cursor=pointer]
              - cell [ref=e96]:
                - button "操作示例" [disabled] [ref=e97]
              - cell [ref=e99]:
                - button "操作示例" [disabled] [ref=e100]
            - row [ref=e103]:
              - rowheader "文字 · 普通" [ref=e104]
              - cell [ref=e105]:
                - button "操作示例" [ref=e106] [cursor=pointer]
              - cell [ref=e108]:
                - button "操作示例" [disabled] [ref=e109]
              - cell [ref=e111]:
                - button "操作示例" [disabled] [ref=e112]
            - row [ref=e115]:
              - rowheader "文字 · 品牌" [ref=e116]
              - cell [ref=e117]:
                - button "操作示例" [ref=e118] [cursor=pointer]
              - cell [ref=e120]:
                - button "操作示例" [disabled] [ref=e121]
              - cell [ref=e123]:
                - button "操作示例" [disabled] [ref=e124]
            - row [ref=e127]:
              - rowheader "文字 · 危险" [ref=e128]
              - cell [ref=e129]:
                - button "操作示例" [ref=e130] [cursor=pointer]
              - cell [ref=e132]:
                - button "操作示例" [disabled] [ref=e133]
              - cell [ref=e135]:
                - button "操作示例" [disabled] [ref=e136]
        - paragraph [ref=e139]: 普通按钮加载时仅背景与边框保留 82%，文字和图标保持原色；文字按钮保持原方案。禁用保留各自色系：主按钮整体 30%，次按钮和轻按钮整体 40%，文字按钮仅前景 30%。加载示例保留键盘位置，但不会重复触发操作。
      - region [ref=e140]:
        - heading "八档完整尺寸" [level=2] [ref=e141]
        - paragraph [ref=e142]: 使用相同文案和图标比较；这里显式选择尺寸，因此不随上方默认密度切换。单位均为 px。
        - table [ref=e144]:
          - rowgroup [ref=e145]:
            - row [ref=e146]:
              - columnheader "尺寸" [ref=e147]
              - columnheader "实际按钮" [ref=e148]
              - columnheader "高度 / 最小宽" [ref=e149]
              - columnheader "每侧内距 / 图文间距" [ref=e150]
              - columnheader "字号 / 行高 / 字重" [ref=e151]
              - columnheader "前 / 后图标" [ref=e152]
          - rowgroup [ref=e153]:
            - row [ref=e154]:
              - rowheader "普通 Mini" [ref=e155]
              - cell [ref=e156]:
                - button "编辑选项" [ref=e157] [cursor=pointer]
              - cell "28 / 64" [ref=e163]
              - cell "12 / 4" [ref=e164]
              - cell "13 / 18 / 600" [ref=e165]
              - cell "14 / 10" [ref=e166]
            - row [ref=e167]:
              - rowheader "普通 Small" [ref=e168]
              - cell [ref=e169]:
                - button "编辑选项" [ref=e170] [cursor=pointer]
              - cell "32 / 64" [ref=e176]
              - cell "20 / 4" [ref=e177]
              - cell "14 / 22 / 600" [ref=e178]
              - cell "16 / 12" [ref=e179]
            - row [ref=e180]:
              - rowheader "普通 Medium" [ref=e181]
              - cell [ref=e182]:
                - button "编辑选项" [ref=e183] [cursor=pointer]
              - cell "36 / 64" [ref=e189]
              - cell "20 / 4" [ref=e190]
              - cell "14 / 22 / 600" [ref=e191]
              - cell "16 / 12" [ref=e192]
            - row [ref=e193]:
              - rowheader "普通 Large" [ref=e194]
              - cell [ref=e195]:
                - button "编辑选项" [ref=e196] [cursor=pointer]
              - cell "40 / 80" [ref=e202]
              - cell "24 / 4" [ref=e203]
              - cell "14 / 22 / 600" [ref=e204]
              - cell "16 / 12" [ref=e205]
            - row [ref=e206]:
              - rowheader "普通 XL" [ref=e207]
              - cell [ref=e208]:
                - button "编辑选项" [ref=e209] [cursor=pointer]
              - cell "48 / 160" [ref=e215]
              - cell "28 / 6" [ref=e216]
              - cell "16 / 24 / 600" [ref=e217]
              - cell "22 / 16" [ref=e218]
            - row [ref=e219]:
              - rowheader "文字 Small" [ref=e220]
              - cell [ref=e221]:
                - button "编辑选项" [ref=e222] [cursor=pointer]
              - cell "20 / 0" [ref=e228]
              - cell "6 / 4" [ref=e229]
              - cell "12 / 14 / 400" [ref=e230]
              - cell "14 / 12" [ref=e231]
            - row [ref=e232]:
              - rowheader "文字 Compact" [ref=e233]
              - cell [ref=e234]:
                - button "编辑选项" [ref=e235] [cursor=pointer]
              - cell "24 / 0" [ref=e241]
              - cell "6 / 4" [ref=e242]
              - cell "13 / 18 / 400" [ref=e243]
              - cell "16 / 12" [ref=e244]
            - row [ref=e245]:
              - rowheader "文字 Regular" [ref=e246]
              - cell [ref=e247]:
                - button "编辑选项" [ref=e248] [cursor=pointer]
              - cell "26 / 0" [ref=e254]
              - cell "6 / 4" [ref=e255]
              - cell "14 / 20 / 400" [ref=e256]
              - cell "16 / 12" [ref=e257]
        - paragraph [ref=e258]: 普通按钮设置的是最小宽，文案较短时实际留白可能更大。文字按钮由内容撑宽，上下各留 3px，以行高 + 6px 组成高度，不额外套等高外框。
      - region [ref=e259]:
        - heading "相邻操作的间距" [level=2] [ref=e260]
        - paragraph [ref=e261]: 对照 8px 与 12px 两种排列，均按视觉中心对齐。间距由外层布局管理，按钮自身不增加外边距。
        - generic [ref=e262]:
          - generic [ref=e263]:
            - heading "Space/8" [level=3] [ref=e264]
            - group "8px 操作间距" [ref=e265]:
              - button "查询" [ref=e266] [cursor=pointer]
              - button "重置" [ref=e268] [cursor=pointer]
              - button "保存筛选条件" [ref=e270] [cursor=pointer]
          - generic [ref=e272]:
            - heading "Space/12" [level=3] [ref=e273]
            - group "12px 操作间距" [ref=e274]:
              - button "查询" [ref=e275] [cursor=pointer]
              - button "重置" [ref=e277] [cursor=pointer]
              - button "保存筛选条件" [ref=e279] [cursor=pointer]
        - paragraph [ref=e281]: 查询与重置先采用 8px 对照；12px 是另一种布局选择。普通按钮与文字按钮保持各自高度，空间不足时整组换行。
      - region [ref=e282]:
        - heading "图标与加载前后" [level=2] [ref=e283]
        - generic [ref=e284] [cursor=pointer]:
          - checkbox "切换加载状态" [ref=e285]
          - text: 切换加载状态
        - paragraph [ref=e286]: 双图标时，左侧标识保持原色，右侧箭头降低一个视觉层级。观察加载图标进入、前图标替换和后图标隐藏时的宽度变化；关闭开关即可恢复操作。
        - table [ref=e288]:
          - rowgroup [ref=e289]:
            - row [ref=e290]:
              - columnheader "图标组合" [ref=e291]
              - columnheader "普通按钮" [ref=e292]
              - columnheader "文字按钮" [ref=e293]
          - rowgroup [ref=e294]:
            - row [ref=e295]:
              - rowheader "纯文字" [ref=e296]
              - cell [ref=e297]:
                - button "编辑选项" [ref=e298] [cursor=pointer]
              - cell [ref=e300]:
                - button "编辑选项" [ref=e301] [cursor=pointer]
            - row [ref=e303]:
              - rowheader "前图标" [ref=e304]
              - cell [ref=e305]:
                - button "编辑选项" [ref=e306] [cursor=pointer]
              - cell [ref=e310]:
                - button "编辑选项" [ref=e311] [cursor=pointer]
            - row [ref=e315]:
              - rowheader "后图标" [ref=e316]
              - cell [ref=e317]:
                - button "编辑选项" [ref=e318] [cursor=pointer]
              - cell [ref=e322]:
                - button "编辑选项" [ref=e323] [cursor=pointer]
            - row [ref=e327]:
              - rowheader "双图标" [ref=e328]
              - cell [ref=e329]:
                - button "编辑选项" [ref=e330] [cursor=pointer]
              - cell [ref=e336]:
                - button "编辑选项" [ref=e337] [cursor=pointer]
    - status [ref=e343]: 点击默认按钮体验；禁用与加载状态不会增加操作次数。
    - generic [ref=e344]:
      - link "查看 Token 来源" [ref=e345] [cursor=pointer]:
        - /url: "#token-foundations"
      - link "查看文字按钮使用说明" [ref=e346] [cursor=pointer]:
        - /url: "#text-button"
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { readFileSync } from "node:fs";
  3   | import { fileURLToPath } from "node:url";
  4   | import { buttonColorRecipes, validateButtonColorRecipe } from "../../packages/foundations/src/button-token-contract";
  5   | import { contrastRatio } from "./color-contrast";
  6   | 
  7   | test("Button Token recipes paint their real surfaces and preserve loading readability", async ({ page }) => {
  8   |   test.setTimeout(120_000);
  9   |   await page.setViewportSize({ width: 1440, height: 1100 });
  10  |   await page.emulateMedia({ reducedMotion: "reduce" });
  11  |   await page.goto("/#button-tokens");
  12  |   const region = page.locator('[aria-labelledby="button-token-appearances-title"]');
  13  |   let lightLoading: { background: string; label: string; icon: string } | undefined;
  14  |   for (const theme of ["light", "dark"] as const) {
  15  |     await page.getByRole("combobox", { name: "主题", exact: true }).selectOption(theme, { timeout: 5000 });
  16  |     for (const [surface, parent] of [["task", "Background/Neutral/1"], ["page", "Background/Neutral/3"]] as const) {
  17  |       await page.getByRole("combobox", { name: "按钮所在底色", exact: true }).selectOption(surface, { timeout: 5000 });
  18  |       for (const recipe of buttonColorRecipes) {
  19  |         const state = recipe.state === "hover" || recipe.state === "pressed" ? "default" : recipe.state;
  20  |         const button = region.locator(`button[data-variant="${recipe.variant}"][data-tone="${recipe.tone}"][data-state="${state}"]`);
  21  |         await page.mouse.move(0, 0);
  22  |         if (recipe.state === "hover" || recipe.state === "pressed") await button.hover();
  23  |         if (recipe.state === "pressed") await page.mouse.down();
  24  |         const actual = await button.evaluate((element) => {
  25  |           const style = getComputedStyle(element);
  26  |           const canvas = document.createElement("canvas");
  27  |           canvas.width = canvas.height = 1;
  28  |           const ctx = canvas.getContext("2d")!;
  29  |           function color(value: string) {
  30  |             ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = value; ctx.fillRect(0, 0, 1, 1);
  31  |             const values = Array.from(ctx.getImageData(0, 0, 1, 1).data);
  32  |             return { rgb: values.slice(0, 3), alpha: values[3]! / 255 };
  33  |           }
  34  |           function over(top: { rgb: number[]; alpha: number }, bottom: number[]) {
  35  |             return top.rgb.map((channel, i) => channel * top.alpha + bottom[i]! * (1 - top.alpha));
  36  |           }
  37  |           const base = color(getComputedStyle(element.closest(".button-token-review__samples")!).backgroundColor).rgb;
  38  |           const inner = over(color(style.backgroundColor), base);
  39  |           const opacity = Number(style.opacity);
  40  |           const background = over({ rgb: inner, alpha: opacity }, base);
  41  |           const label = getComputedStyle(element.querySelector('[data-slot="label"]')!);
  42  |           const labelColor = color(label.color);
  43  |           labelColor.alpha *= Number(label.opacity);
  44  |           const foreground = over({ rgb: over(labelColor, inner), alpha: opacity }, base);
  45  |           const indicator = element.querySelector('[data-slot="loading-indicator"]');
  46  |           const icon = indicator ? getComputedStyle(indicator) : undefined;
  47  |           const iconColor = icon ? color(icon.color) : undefined;
  48  |           if (iconColor) iconColor.alpha *= Number(icon!.opacity);
  49  |           const iconForeground = iconColor ? over({ rgb: over(iconColor, inner), alpha: opacity }, base) : undefined;
  50  |           return { background, foreground, iconForeground, opacity, css: { background: style.backgroundColor, label: label.color, icon: icon?.color ?? "" } };
  51  |         });
  52  |         if (recipe.state === "pressed") await page.mouse.up();
  53  |         const expected = validateButtonColorRecipe(recipe, theme, parent);
  54  |         expect(actual.opacity, recipe.id).toBe(recipe.opacity);
> 55  |         for (let channel = 0; channel < 3; channel++) expect(Math.abs(actual.background[channel]! - expected.paintedBackground.rgb[channel]!), `${recipe.id}/${theme}/${surface} background`).toBeLessThan(1.2);
      |                                                                                                                                                                                               ^ Error: button-primary-default-default/light/task background
  56  |         if (recipe.state !== "disabled") {
  57  |           const textContrast = contrastRatio(`rgb(${actual.foreground.join(",")})`, `rgb(${actual.background.join(",")})`);
  58  |           if (expected.acceptedTextContrastException) {
  59  |             expect([recipe.variant, recipe.tone]).toEqual(["primary", "danger"]);
  60  |             expect(textContrast).toBeLessThan(4.5);
  61  |             expect(Math.abs(textContrast - expected.textContrast)).toBeLessThan(0.05);
  62  |           } else expect(textContrast, `${recipe.id}/${theme}/${surface}`).toBeGreaterThanOrEqual(4.5);
  63  |         }
  64  |         if (actual.iconForeground) expect(contrastRatio(`rgb(${actual.iconForeground.join(",")})`, `rgb(${actual.background.join(",")})`), `${recipe.id}/${theme}/${surface} loading icon`).toBeGreaterThanOrEqual(3);
  65  |         if (theme === "light" && surface === "task" && recipe.variant === "primary" && recipe.tone === "default" && recipe.state === "loading") lightLoading = actual.css;
  66  |       }
  67  |       // Tab must show two token-backed rings for every active and loading appearance.
  68  |       await page.mouse.move(0, 0);
  69  |       await page.getByRole("combobox", { name: "默认密度", exact: true }).focus();
  70  |       for (const button of await region.locator('button:not([disabled])').all()) {
  71  |         await page.keyboard.press("Tab");
  72  |         await expect(button).toBeFocused();
  73  |         const ring = await button.evaluate((element) => {
  74  |           const css = getComputedStyle(element);
  75  |           return { outline: css.outlineColor, width: css.outlineWidth, offset: css.outlineOffset, shadow: css.boxShadow };
  76  |         });
  77  |         expect(ring.outline).toBe(theme === "light" ? "rgb(61, 123, 255)" : "rgb(42, 93, 203)");
  78  |         expect(ring.width).toBe("1px");
  79  |         expect(ring.offset).toBe("0px");
  80  |         expect(ring.shadow).toContain(theme === "light" ? "rgba(61, 123, 255, 0.2)" : "rgba(56, 96, 255, 0.3)");
  81  |         expect(ring.shadow).toContain(await button.getAttribute("data-variant") === "primary" ? "0px 0px 0px 4px" : "0px 0px 0px 3px");
  82  |       }
  83  |       await region.locator("button").last().evaluate((button) => (button as HTMLElement).blur());
  84  |       const iconPairs = await page.locator('[aria-labelledby="button-token-sizes-title"] tbody button').evaluateAll((buttons) => buttons.map((button) => ({
  85  |         leading: getComputedStyle(button.querySelector('[data-slot="leading-icon"]')!).color,
  86  |         trailing: getComputedStyle(button.querySelector('[data-slot="trailing-icon"]')!).color,
  87  |       })));
  88  |       expect(iconPairs).toHaveLength(8);
  89  |       for (const pair of iconPairs) expect(pair.trailing, `${theme}/${surface} secondary icon`).not.toBe(pair.leading);
  90  |     }
  91  |   }
  92  |   const measured = await page.locator('[aria-labelledby="button-token-sizes-title"]').locator("tbody button").evaluateAll((buttons) => buttons.map((button) => {
  93  |     const css = getComputedStyle(button);
  94  |     return [parseFloat(css.height), parseFloat(css.paddingInlineStart), parseFloat(css.gap), parseFloat(css.paddingBlockStart)];
  95  |   }));
  96  |   expect(measured).toEqual([[28,12,4,0],[32,20,4,0],[36,20,4,0],[40,24,4,0],[48,28,6,0],[20,6,4,3],[24,6,4,3],[26,6,4,3]]);
  97  |   // Use the real rendered Button to check that a Light island restores aliases inside Dark.
  98  |   const nestedLight = await region.locator('button[data-variant="primary"][data-tone="default"][data-state="loading"]').evaluate((button) => {
  99  |     const scope = document.createElement("div");
  100 |     scope.dataset.rainTheme = "light";
  101 |     const clone = button.cloneNode(true) as HTMLButtonElement;
  102 |     scope.append(clone);
  103 |     button.parentElement!.append(scope);
  104 |     const result = { background: getComputedStyle(clone).backgroundColor, label: getComputedStyle(clone.querySelector('[data-slot="label"]')!).color, icon: getComputedStyle(clone.querySelector('[data-slot="loading-indicator"]')!).color };
  105 |     scope.remove();
  106 |     return result;
  107 |   });
  108 |   expect(nestedLight).toEqual(lightLoading);
  109 | });
  110 | 
  111 | const runtimeEnvironment = (
  112 |   globalThis as typeof globalThis & {
  113 |     process?: { env?: Record<string, string | undefined> };
  114 |   }
  115 | ).process?.env ?? {};
  116 | 
  117 | test("the Day 3 Core UI page exposes truthful families and real interaction", async ({
  118 |   page,
  119 | }, testInfo) => {
  120 |   await page.setViewportSize({ width: 1440, height: 1100 });
  121 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  122 |   await page.goto("/");
  123 |   await page.getByRole("link", { name: /Components/i }).click();
  124 |   await expect(page).toHaveURL(/#components$/);
  125 | 
  126 |   const title = page.getByRole("heading", {
  127 |     level: 1,
  128 |     name: "Core UI，把高频动作先做准",
  129 |   });
  130 |   await expect(title).toBeFocused();
  131 |   await expect(page.locator('[data-rain-id="core-ui-page"]')).toHaveAttribute(
  132 |     "data-maturity",
  133 |     "prototype-ready",
  134 |   );
  135 |   await expect(page.locator('[data-slot="component-family"]')).toHaveCount(6);
  136 |   await expect(page.getByRole('link', { name: '查看 Tabs 全部用法' })).toHaveAttribute('href', '#tabs');
  137 |   await expect(page.getByText("prototype-ready")).toHaveCount(4);
  138 |   await expect(page.getByText("分批验收")).toBeVisible();
  139 |   await expect(
  140 |     page.getByText(/Input \/ Select 及 Dropdown \/ Popover 已完成各自视觉验收/),
  141 |   ).toBeVisible();
  142 | 
  143 |   const actionOutput = page.getByTestId("button-action-count");
  144 |   const primaryButton = page.getByRole("button", { name: "创建课程" });
  145 |   await primaryButton.click();
  146 |   await expect(actionOutput).toContainText("1 次");
  147 | 
  148 |   await primaryButton.focus();
  149 |   await page.keyboard.press("Enter");
  150 |   await expect(actionOutput).toContainText("2 次");
  151 |   await page.keyboard.press("Space");
  152 |   await expect(actionOutput).toContainText("3 次");
  153 | 
  154 |   const loadingButton = page.getByRole("button", {
  155 |     name: "保存课程，正在处理",
```