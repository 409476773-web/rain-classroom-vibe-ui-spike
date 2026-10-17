# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: button-group-repair.spec.ts >> all five explicit sizes align text, borders and separators without narrow overflow
- Location: tests/e2e/button-group-repair.spec.ts:11:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.evaluate: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('group', { name: 'mini 横向按钮组', exact: true })

```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Button Group 按钮组" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 共享候选 · 尚未发布
    - paragraph [ref=e11]: 把同一任务的命令连接起来，每个按钮仍独立执行。方向由组控制，按钮状态由宿主提供；同组按钮采用同尺寸。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [active] [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "禁用状态对照" [level=2] [ref=e21]
      - paragraph [ref=e22]: 外框和分界保持完整，禁用状态只弱化按钮内容。
      - generic [ref=e23]:
        - generic [ref=e24]:
          - generic [ref=e25]:
            - generic [ref=e26]: 正常
            - group "正常示例" [ref=e27]:
              - button "撤销" [ref=e28] [cursor=pointer]
              - button "重做" [ref=e30] [cursor=pointer]
              - button "恢复" [ref=e32] [cursor=pointer]
          - generic [ref=e34]:
            - generic [ref=e35]: 首项禁用
            - group "首项禁用示例" [ref=e36]:
              - button "撤销" [disabled] [ref=e37]
              - button "重做" [ref=e39] [cursor=pointer]
              - button "恢复" [ref=e41] [cursor=pointer]
          - generic [ref=e43]:
            - generic [ref=e44]: 中间禁用
            - group "中间禁用示例" [ref=e45]:
              - button "撤销" [ref=e46] [cursor=pointer]
              - button "重做" [disabled] [ref=e48]
              - button "恢复" [ref=e50] [cursor=pointer]
          - generic [ref=e52]:
            - generic [ref=e53]: 末项禁用
            - group "末项禁用示例" [ref=e54]:
              - button "撤销" [ref=e55] [cursor=pointer]
              - button "重做" [ref=e57] [cursor=pointer]
              - button "恢复" [disabled] [ref=e59]
          - generic [ref=e61]:
            - generic [ref=e62]: 全部禁用
            - group "全部禁用示例" [ref=e63]:
              - button "撤销" [disabled] [ref=e64]
              - button "重做" [disabled] [ref=e66]
              - button "恢复" [disabled] [ref=e68]
        - status "状态对照反馈" [ref=e70]: 点击可用按钮，检查反馈与焦点；禁用按钮不可执行。
    - generic [ref=e71]:
      - heading "横向基准" [level=2] [ref=e72]
      - paragraph [ref=e73]: 按钮直接连接，不额外插入分隔线。Tab 依次进入每个可用按钮，Enter 执行当前按钮；禁用按钮跳过。
      - generic [ref=e74]:
        - group "编辑操作" [ref=e75]:
          - button "撤销" [ref=e76] [cursor=pointer]
          - button "重做" [disabled] [ref=e78]
          - button "恢复" [ref=e80] [cursor=pointer]
        - status "编辑操作反馈" [ref=e82]: 尚未执行操作
        - group [ref=e83]:
          - generic "查看代码" [ref=e84] [cursor=pointer]
    - generic [ref=e85]:
      - heading "横向显式分隔线" [level=2] [ref=e86]
      - paragraph [ref=e87]: 显式分隔线与普通接缝保持一致的颜色和完整边界。此组的撤销与重做状态独立。
      - generic [ref=e88]:
        - group "带分隔线的编辑操作" [ref=e89]:
          - button "撤销" [ref=e90] [cursor=pointer]
          - button "重做" [disabled] [ref=e94]
          - button "恢复" [ref=e96] [cursor=pointer]
        - status "带分隔线的编辑操作反馈" [ref=e98]: 尚未执行操作
        - group [ref=e99]:
          - generic "查看代码" [ref=e100] [cursor=pointer]
    - generic [ref=e101]:
      - heading "竖向排列" [level=2] [ref=e102]
      - paragraph [ref=e103]: 竖向组的分隔线设置为 horizontal；按钮仍独立进入 Tab 顺序。
      - generic [ref=e104]:
        - group "章节操作" [ref=e105]:
          - button "上移" [ref=e106] [cursor=pointer]
          - button "下移" [ref=e110] [cursor=pointer]
        - status "章节操作反馈" [ref=e112]: 尚未移动章节
        - group [ref=e113]:
          - generic "查看代码" [ref=e114] [cursor=pointer]
    - generic [ref=e115]:
      - heading "文字与保存" [level=2] [ref=e116]
      - paragraph [ref=e117]: ButtonGroupText 是静态说明文字，与保存按钮连接；它不承担按钮或选择状态。
      - generic [ref=e118]:
        - group "提交操作" [ref=e119]:
          - generic [ref=e120]: 当前草稿
          - button "保存" [ref=e121] [cursor=pointer]
        - status "提交操作反馈" [ref=e123]: 尚未保存草稿
        - group [ref=e124]:
          - generic "查看代码" [ref=e125] [cursor=pointer]
  - region [ref=e126]:
    - heading "使用边界" [level=2] [ref=e127]
    - generic [ref=e128]:
      - generic [ref=e129]:
        - heading "适合用在" [level=3] [ref=e130]
        - list [ref=e131]:
          - listitem [ref=e132]: 相关命令需要合并边界并形成一个操作区。
      - generic [ref=e133]:
        - heading "避免用在" [level=3] [ref=e134]
        - list [ref=e135]:
          - listitem [ref=e136]: 互斥显示模式或多选状态使用 Toggle Group；普通导航使用导航组件。
  - generic [ref=e137]:
    - region [ref=e138]:
      - heading "API 与结构" [level=2] [ref=e139]
      - table [ref=e141]:
        - caption [ref=e142]: Button Group 按钮组 常用接口
        - rowgroup [ref=e143]:
          - row [ref=e144]:
            - columnheader "名称" [ref=e145]
            - columnheader "类型" [ref=e146]
            - columnheader "默认" [ref=e147]
            - columnheader "说明" [ref=e148]
        - rowgroup [ref=e149]:
          - row [ref=e150]:
            - rowheader [ref=e151]:
              - code [ref=e152]: orientation
            - cell [ref=e153]:
              - code [ref=e154]: "\"horizontal\" | \"vertical\""
            - cell "\"horizontal\"" [ref=e155]
            - cell "组排列方向。" [ref=e156]
          - row [ref=e157]:
            - rowheader [ref=e158]:
              - code [ref=e159]: aria-label
            - cell [ref=e160]:
              - code [ref=e161]: string
            - cell "—" [ref=e162]
            - cell "说明按钮组的整体用途。" [ref=e163]
          - row [ref=e164]:
            - rowheader [ref=e165]:
              - code [ref=e166]: children
            - cell [ref=e167]:
              - code [ref=e168]: ReactNode
            - cell "—" [ref=e169]
            - cell "Button、ButtonGroupText 与 ButtonGroupSeparator 作为直接子项；同组按钮采用同尺寸。" [ref=e170]
          - row [ref=e171]:
            - rowheader [ref=e172]:
              - code [ref=e173]: ButtonGroupSeparator.orientation
            - cell [ref=e174]:
              - code [ref=e175]: "\"horizontal\" | \"vertical\""
            - cell "\"vertical\"" [ref=e176]
            - cell "分隔线方向；与组方向正交。" [ref=e177]
          - row [ref=e178]:
            - rowheader [ref=e179]:
              - code [ref=e180]: ButtonGroupText.render
            - cell [ref=e181]:
              - code [ref=e182]: Base UI useRender
            - cell "—" [ref=e183]
            - cell "静态标签匹配默认或紧凑普通按钮的字号；不承担按钮或选择状态。" [ref=e184]
      - paragraph [ref=e185]: Parts / Slots：button-group、button-group-text、button-group-separator
    - region [ref=e186]:
      - heading "调用示例" [level=2] [ref=e187]
      - generic [ref=e188]:
        - generic [ref=e189]:
          - button "复制代码" [ref=e190] [cursor=pointer]
          - status
        - code [ref=e193]: "import { useState } from \"react\"; import { Button, ButtonGroup } from \"@rain-next/ui\"; export function EditingExample() { const [canRedo, setCanRedo] = useState(false); const [result, setResult] = useState(\"尚未执行操作\"); return <> <ButtonGroup aria-label=\"编辑操作\"> <Button variant=\"tertiary\" onClick={() => { setCanRedo(true); setResult(\"已撤销当前示例更改\"); }}>撤销</Button> <Button variant=\"tertiary\" disabled={!canRedo} onClick={() => { setCanRedo(false); setResult(\"已重做当前示例更改\"); }}>重做</Button> <Button variant=\"tertiary\" onClick={() => { setCanRedo(false); setResult(\"已恢复默认设置\"); }}>恢复</Button> </ButtonGroup> <p role=\"status\" aria-label=\"编辑操作反馈\">{result}</p> </>; }"
      - paragraph [ref=e194]:
        - text: 当前源码：
        - code [ref=e195]: packages/ui/src/button-group/button-group.tsx
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { fileURLToPath } from "node:url";
  3   | 
  4   | const captures = process.env.BUTTON_GROUP_EVIDENCE ?? fileURLToPath(new URL("../../evidence/runtime/button-group-repair-2026-10-07/browser/", import.meta.url));
  5   | 
  6   | test.beforeEach(async ({ page }) => {
  7   |   await page.goto("/#button-group");
  8   |   await expect(page.locator("#button-group-title")).toBeVisible();
  9   | });
  10  | 
  11  | test("all five explicit sizes align text, borders and separators without narrow overflow", async ({ page }) => {
  12  |   const sizes = [{size:"mini",height:28,font:"13px",line:"18px",radius:"6px"},{size:"small",height:32,font:"14px",line:"22px",radius:"6px"},{size:"medium",height:36,font:"14px",line:"22px",radius:"6px"},{size:"large",height:40,font:"14px",line:"22px",radius:"6px"},{size:"xl",height:48,font:"16px",line:"24px",radius:"8px"}];
  13  |   for (const theme of ["浅色", "深色"]) {
  14  |     await page.getByRole("button", {name:theme,exact:true}).click();
  15  |     for (const compact of [false,true]) {
  16  |       const density=page.getByRole("button",{name:"紧凑密度",exact:true});
  17  |       if ((await density.getAttribute("aria-pressed"))!==String(compact)) await density.click();
  18  |       for (const expected of sizes) {
  19  |         for (const kind of ["横向","文字","竖向"]) {
  20  |           const group=page.getByRole("group",{name:`${expected.size} ${kind}按钮组`,exact:true});
> 21  |           const geometry=await group.evaluate(el=>[...el.children].map(child=>{const s=getComputedStyle(child),r=child.getBoundingClientRect();return {slot:child.getAttribute('data-slot'),height:r.height,font:s.fontSize,line:s.lineHeight,tl:s.borderTopLeftRadius,tr:s.borderTopRightRadius,opacity:s.opacity,disabled:child.hasAttribute('disabled'),childOpacity:child.querySelector('[data-slot="label"]')?getComputedStyle(child.querySelector('[data-slot="label"]')!).opacity:null};}));
      |                                      ^ Error: locator.evaluate: Test timeout of 60000ms exceeded.
  22  |           for(const item of geometry.filter(item=>item.slot!=='button-group-separator')) {
  23  |             expect(item.height).toBe(expected.height);
  24  |             expect(item.font).toBe(expected.font);
  25  |             expect(item.line).toBe(expected.line);
  26  |             expect(item.opacity).toBe("1");
  27  |             if(item.disabled) expect(item.childOpacity).toBe("0.4");
  28  |           }
  29  |           expect(geometry[0]?.tl).toBe(expected.radius);
  30  |           expect(geometry[0]?.tr).toBe(kind==='竖向'?expected.radius:'0px');
  31  |           if(kind==='竖向') expect(geometry.find(item=>item.slot==='button-group-separator')?.height).toBe(1);
  32  |         }
  33  |       }
  34  |     }
  35  |     await page.getByRole("heading",{name:"多尺寸",exact:true}).locator("..").screenshot({path:`${captures}/sizes-${theme}.png`});
  36  |   }
  37  |   await page.setViewportSize({width:390,height:844});
  38  |   expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  39  |   const scroll=page.getByRole("group",{name:"xl 横向按钮组",exact:true}).locator("..");
  40  |   expect(await scroll.evaluate(el=>el.scrollWidth)).toBeGreaterThan(await scroll.evaluate(el=>el.clientWidth));
  41  |   await scroll.screenshot({path:`${captures}/sizes-xl-narrow.png`});
  42  | });
  43  | 
  44  | test("disabled content fades while its borders and shared seam stay intact", async ({ page }) => {
  45  |   for (const theme of ["浅色", "深色"]) {
  46  |     await page.getByRole("button", { name: theme, exact: true }).click();
  47  |     const group = page.getByRole("group", { name: "编辑操作", exact: true });
  48  |     const styles = await group.locator(":scope > button").evaluateAll(elements => elements.map(el => ({
  49  |       opacity: getComputedStyle(el).opacity,
  50  |       border: getComputedStyle(el).borderRightColor,
  51  |       labelOpacity: getComputedStyle(el.querySelector('[data-slot="label"]')!).opacity,
  52  |     })));
  53  |     expect(styles[1]?.opacity).toBe("1");
  54  |     expect(styles[1]?.border).toBe(styles[0]?.border);
  55  |     expect(styles[1]?.labelOpacity).toBe("0.4");
  56  |     await expect(group.getByRole("button", { name: "重做", exact: true })).toBeDisabled();
  57  |   }
  58  | });
  59  | 
  60  | test("explicit separators use a continuous full-size line matching ordinary seams", async ({ page }) => {
  61  |   for (const name of ["带分隔线的编辑操作", "章节操作"]) {
  62  |     const geometry = await page.getByRole("group", { name, exact: true }).evaluate(el => {
  63  |       const line = el.querySelector('.rain-separator')!, button = el.querySelector('button')!;
  64  |       const r = line.getBoundingClientRect(), group = el.getBoundingClientRect();
  65  |       return { color: getComputedStyle(line).backgroundColor, border: getComputedStyle(button).borderTopColor,
  66  |         size: el.getAttribute('data-orientation') === 'horizontal' ? r.height : r.width,
  67  |         groupSize: el.getAttribute('data-orientation') === 'horizontal' ? group.height : group.width };
  68  |     });
  69  |     expect(geometry.color).toBe(geometry.border);
  70  |     expect(geometry.size).toBe(geometry.groupSize);
  71  |   }
  72  | });
  73  | 
  74  | test("state comparison, quieter feedback and native code disclosure work across densities", async ({ page }) => {
  75  |   for (const theme of ["浅色", "深色"]) {
  76  |     await page.getByRole("button", { name: theme, exact: true }).click();
  77  |     for (const compact of [false, true]) {
  78  |       const density = page.getByRole("button", { name: "紧凑密度", exact: true });
  79  |       if ((await density.getAttribute("aria-pressed")) !== String(compact)) await density.click();
  80  |       for (const name of ["正常", "首项禁用", "中间禁用", "末项禁用", "全部禁用"]) {
  81  |         const states = await page.getByRole("group", { name: `${name}示例`, exact: true }).locator(":scope > button").evaluateAll(elements => elements.map(el => {
  82  |           const s = getComputedStyle(el);
  83  |           return { opacity: s.opacity, top: s.borderTopWidth, height: el.getBoundingClientRect().height,
  84  |             disabled: el.hasAttribute('disabled'), foreground: getComputedStyle(el.querySelector('[data-slot="label"]')!).opacity };
  85  |         }));
  86  |         for (const state of states) {
  87  |           expect(state.opacity).toBe("1");
  88  |           expect(state.top).toBe("1px");
  89  |           expect(state.height).toBe(compact ? 32 : 36);
  90  |           expect(state.foreground).toBe(state.disabled ? "0.4" : "1");
  91  |         }
  92  |       }
  93  |     }
  94  |     const density = page.getByRole("button", { name: "紧凑密度", exact: true });
  95  |     if ((await density.getAttribute("aria-pressed")) === "true") await density.click();
  96  |     await page.screenshot({ path: `${captures}/style-overview-${theme}.png` });
  97  |   }
  98  |   const feedback = page.getByRole("status", { name: "编辑操作反馈", exact: true });
  99  |   expect(await feedback.evaluate(el => ({ font: getComputedStyle(el).fontSize, margin: getComputedStyle(el).marginTop }))).toEqual({ font: "13px", margin: "8px" });
  100 |   const code = page.getByRole("group", { name: "编辑操作", exact: true }).locator("..").locator("details");
  101 |   await expect(code).not.toHaveAttribute("open");
  102 |   await code.locator("summary").press("Enter");
  103 |   await expect(code).toHaveAttribute("open", "");
  104 |   await expect(code.locator("pre")).toBeVisible();
  105 | });
  106 | 
  107 | test("joined buttons retain only the outside corners across themes and densities", async ({ page }) => {
  108 |   for (const theme of ["浅色", "深色"]) {
  109 |     await page.getByRole("button", { name: theme, exact: true }).click();
  110 |     for (const compact of [false, true]) {
  111 |       const control = page.getByRole("button", { name: "紧凑密度", exact: true });
  112 |       if ((await control.getAttribute("aria-pressed")) !== String(compact)) await control.click();
  113 |       const styles = await page.getByRole("group", { name: "编辑操作", exact: true }).locator(":scope > button").evaluateAll(elements => elements.map(el => {
  114 |         const s = getComputedStyle(el), r = el.getBoundingClientRect();
  115 |         return { tl: s.borderTopLeftRadius, tr: s.borderTopRightRadius, bl: s.borderBottomLeftRadius, br: s.borderBottomRightRadius, leftBorder: s.borderLeftWidth, x: r.x, right: r.right };
  116 |       }));
  117 |       expect(styles).toHaveLength(3);
  118 |       expect(styles[0]?.tr).toBe("0px");
  119 |       expect(styles[0]?.br).toBe("0px");
  120 |       expect(styles[0]?.tl).toBe("6px");
  121 |       expect(styles[1]?.tl).toBe("0px");
```