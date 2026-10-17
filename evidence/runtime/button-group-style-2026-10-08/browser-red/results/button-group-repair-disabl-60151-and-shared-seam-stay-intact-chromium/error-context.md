# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: button-group-repair.spec.ts >> disabled content fades while its borders and shared seam stay intact
- Location: tests/e2e/button-group-repair.spec.ts:11:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "1"
Received: "0.4"
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
      - heading "横向基准" [level=2] [ref=e21]
      - paragraph [ref=e22]: 按钮直接连接，不额外插入分隔线。Tab 依次进入每个可用按钮，Enter 执行当前按钮；禁用按钮跳过。
      - generic [ref=e23]:
        - group "编辑操作" [ref=e24]:
          - button "撤销" [ref=e25] [cursor=pointer]
          - button "重做" [disabled] [ref=e27]
          - button "恢复" [ref=e29] [cursor=pointer]
        - status "编辑操作反馈" [ref=e31]: 尚未执行操作
      - generic [ref=e32]:
        - generic [ref=e33]:
          - button "复制代码" [ref=e34] [cursor=pointer]
          - status
        - code [ref=e37]: "import { useState } from \"react\"; import { Button, ButtonGroup } from \"@rain-next/ui\"; export function EditingExample() { const [canRedo, setCanRedo] = useState(false); const [result, setResult] = useState(\"尚未执行操作\"); return <> <ButtonGroup aria-label=\"编辑操作\"> <Button variant=\"tertiary\" onClick={() => { setCanRedo(true); setResult(\"已撤销当前示例更改\"); }}>撤销</Button> <Button variant=\"tertiary\" disabled={!canRedo} onClick={() => { setCanRedo(false); setResult(\"已重做当前示例更改\"); }}>重做</Button> <Button variant=\"tertiary\" onClick={() => { setCanRedo(false); setResult(\"已恢复默认设置\"); }}>恢复</Button> </ButtonGroup> <p role=\"status\" aria-label=\"编辑操作反馈\">{result}</p> </>; }"
    - generic [ref=e38]:
      - heading "横向显式分隔线" [level=2] [ref=e39]
      - paragraph [ref=e40]: 需要在相关命令之间强调边界时，显式插入竖向分隔线。此组的撤销与重做状态独立。
      - generic [ref=e41]:
        - group "带分隔线的编辑操作" [ref=e42]:
          - button "撤销" [ref=e43] [cursor=pointer]
          - button "重做" [disabled] [ref=e47]
          - button "恢复" [ref=e49] [cursor=pointer]
        - status "带分隔线的编辑操作反馈" [ref=e51]: 尚未执行操作
      - generic [ref=e52]:
        - generic [ref=e53]:
          - button "复制代码" [ref=e54] [cursor=pointer]
          - status
        - code [ref=e57]: "import { useState } from \"react\"; import { Button, ButtonGroup, ButtonGroupSeparator } from \"@rain-next/ui\"; export function SeparatedEditingExample() { const [canRedo, setCanRedo] = useState(false); const [result, setResult] = useState(\"尚未执行操作\"); return <> <ButtonGroup aria-label=\"带分隔线的编辑操作\"> <Button variant=\"tertiary\" onClick={() => { setCanRedo(true); setResult(\"已撤销当前示例更改\"); }}>撤销</Button> <ButtonGroupSeparator /> <Button variant=\"tertiary\" disabled={!canRedo} onClick={() => { setCanRedo(false); setResult(\"已重做当前示例更改\"); }}>重做</Button> <Button variant=\"tertiary\" onClick={() => { setCanRedo(false); setResult(\"已恢复默认设置\"); }}>恢复</Button> </ButtonGroup> <p role=\"status\" aria-label=\"带分隔线的编辑操作反馈\">{result}</p> </>; }"
    - generic [ref=e58]:
      - heading "竖向排列" [level=2] [ref=e59]
      - paragraph [ref=e60]: 竖向组的分隔线设置为 horizontal；按钮仍独立进入 Tab 顺序。
      - generic [ref=e61]:
        - group "章节操作" [ref=e62]:
          - button "上移" [ref=e63] [cursor=pointer]
          - button "下移" [ref=e67] [cursor=pointer]
        - status "章节操作反馈" [ref=e69]: 尚未移动章节
      - generic [ref=e70]:
        - generic [ref=e71]:
          - button "复制代码" [ref=e72] [cursor=pointer]
          - status
        - code [ref=e75]: "import { useState } from \"react\"; import { Button, ButtonGroup, ButtonGroupSeparator } from \"@rain-next/ui\"; export function ChapterActionsExample() { const [result, setResult] = useState(\"尚未移动章节\"); return <> <ButtonGroup orientation=\"vertical\" aria-label=\"章节操作\"> <Button variant=\"tertiary\" onClick={() => setResult(\"已上移章节\")}>上移</Button> <ButtonGroupSeparator orientation=\"horizontal\" /> <Button variant=\"tertiary\" onClick={() => setResult(\"已下移章节\")}>下移</Button> </ButtonGroup> <p role=\"status\" aria-label=\"章节操作反馈\">{result}</p> </>; }"
    - generic [ref=e76]:
      - heading "文字与保存" [level=2] [ref=e77]
      - paragraph [ref=e78]: ButtonGroupText 是静态说明文字，与保存按钮连接；它不承担按钮或选择状态。
      - generic [ref=e79]:
        - group "提交操作" [ref=e80]:
          - generic [ref=e81]: 当前草稿
          - button "保存" [ref=e82] [cursor=pointer]
        - status "提交操作反馈" [ref=e84]: 尚未保存草稿
      - generic [ref=e85]:
        - generic [ref=e86]:
          - button "复制代码" [ref=e87] [cursor=pointer]
          - status
        - code [ref=e90]: "import { useState } from \"react\"; import { Button, ButtonGroup, ButtonGroupText } from \"@rain-next/ui\"; export function DraftActionsExample() { const [result, setResult] = useState(\"尚未保存草稿\"); return <> <ButtonGroup aria-label=\"提交操作\"> <ButtonGroupText>当前草稿</ButtonGroupText> <Button variant=\"secondary\" onClick={() => setResult(\"已保存当前草稿\")}>保存</Button> </ButtonGroup> <p role=\"status\" aria-label=\"提交操作反馈\">{result}</p> </>; }"
  - region [ref=e91]:
    - heading "使用边界" [level=2] [ref=e92]
    - generic [ref=e93]:
      - generic [ref=e94]:
        - heading "适合用在" [level=3] [ref=e95]
        - list [ref=e96]:
          - listitem [ref=e97]: 相关命令需要合并边界并形成一个操作区。
      - generic [ref=e98]:
        - heading "避免用在" [level=3] [ref=e99]
        - list [ref=e100]:
          - listitem [ref=e101]: 互斥显示模式或多选状态使用 Toggle Group；普通导航使用导航组件。
  - generic [ref=e102]:
    - region [ref=e103]:
      - heading "API 与结构" [level=2] [ref=e104]
      - table [ref=e106]:
        - caption [ref=e107]: Button Group 按钮组 常用接口
        - rowgroup [ref=e108]:
          - row [ref=e109]:
            - columnheader "名称" [ref=e110]
            - columnheader "类型" [ref=e111]
            - columnheader "默认" [ref=e112]
            - columnheader "说明" [ref=e113]
        - rowgroup [ref=e114]:
          - row [ref=e115]:
            - rowheader [ref=e116]:
              - code [ref=e117]: orientation
            - cell [ref=e118]:
              - code [ref=e119]: "\"horizontal\" | \"vertical\""
            - cell "\"horizontal\"" [ref=e120]
            - cell "组排列方向。" [ref=e121]
          - row [ref=e122]:
            - rowheader [ref=e123]:
              - code [ref=e124]: aria-label
            - cell [ref=e125]:
              - code [ref=e126]: string
            - cell "—" [ref=e127]
            - cell "说明按钮组的整体用途。" [ref=e128]
          - row [ref=e129]:
            - rowheader [ref=e130]:
              - code [ref=e131]: children
            - cell [ref=e132]:
              - code [ref=e133]: ReactNode
            - cell "—" [ref=e134]
            - cell "Button、ButtonGroupText 与 ButtonGroupSeparator 作为直接子项；同组按钮采用同尺寸。" [ref=e135]
          - row [ref=e136]:
            - rowheader [ref=e137]:
              - code [ref=e138]: ButtonGroupSeparator.orientation
            - cell [ref=e139]:
              - code [ref=e140]: "\"horizontal\" | \"vertical\""
            - cell "\"vertical\"" [ref=e141]
            - cell "分隔线方向；与组方向正交。" [ref=e142]
          - row [ref=e143]:
            - rowheader [ref=e144]:
              - code [ref=e145]: ButtonGroupText.render
            - cell [ref=e146]:
              - code [ref=e147]: Base UI useRender
            - cell "—" [ref=e148]
            - cell "静态标签匹配默认或紧凑普通按钮的字号；不承担按钮或选择状态。" [ref=e149]
      - paragraph [ref=e150]: Parts / Slots：button-group、button-group-text、button-group-separator
    - region [ref=e151]:
      - heading "调用示例" [level=2] [ref=e152]
      - generic [ref=e153]:
        - generic [ref=e154]:
          - button "复制代码" [ref=e155] [cursor=pointer]
          - status
        - code [ref=e158]: "import { useState } from \"react\"; import { Button, ButtonGroup } from \"@rain-next/ui\"; export function EditingExample() { const [canRedo, setCanRedo] = useState(false); const [result, setResult] = useState(\"尚未执行操作\"); return <> <ButtonGroup aria-label=\"编辑操作\"> <Button variant=\"tertiary\" onClick={() => { setCanRedo(true); setResult(\"已撤销当前示例更改\"); }}>撤销</Button> <Button variant=\"tertiary\" disabled={!canRedo} onClick={() => { setCanRedo(false); setResult(\"已重做当前示例更改\"); }}>重做</Button> <Button variant=\"tertiary\" onClick={() => { setCanRedo(false); setResult(\"已恢复默认设置\"); }}>恢复</Button> </ButtonGroup> <p role=\"status\" aria-label=\"编辑操作反馈\">{result}</p> </>; }"
      - paragraph [ref=e159]:
        - text: 当前源码：
        - code [ref=e160]: packages/ui/src/button-group/button-group.tsx
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
  11  | test("disabled content fades while its borders and shared seam stay intact", async ({ page }) => {
  12  |   for (const theme of ["浅色", "深色"]) {
  13  |     await page.getByRole("button", { name: theme, exact: true }).click();
  14  |     const group = page.getByRole("group", { name: "编辑操作", exact: true });
  15  |     const styles = await group.locator(":scope > button").evaluateAll(elements => elements.map(el => ({
  16  |       opacity: getComputedStyle(el).opacity,
  17  |       border: getComputedStyle(el).borderRightColor,
  18  |       labelOpacity: getComputedStyle(el.querySelector('[data-slot="label"]')!).opacity,
  19  |     })));
> 20  |     expect(styles[1]?.opacity).toBe("1");
      |                                ^ Error: expect(received).toBe(expected) // Object.is equality
  21  |     expect(styles[1]?.border).toBe(styles[0]?.border);
  22  |     expect(styles[1]?.labelOpacity).toBe("0.4");
  23  |     await expect(group.getByRole("button", { name: "重做", exact: true })).toBeDisabled();
  24  |   }
  25  | });
  26  | 
  27  | test("explicit separators use a continuous full-size line matching ordinary seams", async ({ page }) => {
  28  |   for (const name of ["带分隔线的编辑操作", "章节操作"]) {
  29  |     const geometry = await page.getByRole("group", { name, exact: true }).evaluate(el => {
  30  |       const line = el.querySelector('.rain-separator')!, button = el.querySelector('button')!;
  31  |       const r = line.getBoundingClientRect(), group = el.getBoundingClientRect();
  32  |       return { color: getComputedStyle(line).backgroundColor, border: getComputedStyle(button).borderTopColor,
  33  |         size: el.getAttribute('data-orientation') === 'horizontal' ? r.height : r.width,
  34  |         groupSize: el.getAttribute('data-orientation') === 'horizontal' ? group.height : group.width };
  35  |     });
  36  |     expect(geometry.color).toBe(geometry.border);
  37  |     expect(geometry.size).toBe(geometry.groupSize);
  38  |   }
  39  | });
  40  | 
  41  | test("joined buttons retain only the outside corners across themes and densities", async ({ page }) => {
  42  |   for (const theme of ["浅色", "深色"]) {
  43  |     await page.getByRole("button", { name: theme, exact: true }).click();
  44  |     for (const compact of [false, true]) {
  45  |       const control = page.getByRole("button", { name: "紧凑密度", exact: true });
  46  |       if ((await control.getAttribute("aria-pressed")) !== String(compact)) await control.click();
  47  |       const styles = await page.getByRole("group", { name: "编辑操作", exact: true }).locator(":scope > button").evaluateAll(elements => elements.map(el => {
  48  |         const s = getComputedStyle(el), r = el.getBoundingClientRect();
  49  |         return { tl: s.borderTopLeftRadius, tr: s.borderTopRightRadius, bl: s.borderBottomLeftRadius, br: s.borderBottomRightRadius, leftBorder: s.borderLeftWidth, x: r.x, right: r.right };
  50  |       }));
  51  |       expect(styles).toHaveLength(3);
  52  |       expect(styles[0]?.tr).toBe("0px");
  53  |       expect(styles[0]?.br).toBe("0px");
  54  |       expect(styles[0]?.tl).toBe("6px");
  55  |       expect(styles[1]?.tl).toBe("0px");
  56  |       expect(styles[1]?.tr).toBe("0px");
  57  |       expect(styles[2]?.tl).toBe("0px");
  58  |       expect(styles[2]?.tr).toBe("6px");
  59  |       expect(styles[1]?.leftBorder).toBe("0px");
  60  |       expect(styles[2]?.leftBorder).toBe("0px");
  61  |       expect(styles[1]?.x).toBe(styles[0]?.right);
  62  |       expect(styles[2]?.x).toBe(styles[1]?.right);
  63  |     }
  64  |   }
  65  | });
  66  | 
  67  | test("the vertical divider consumes one pixel and solely owns its seam", async ({ page }) => {
  68  |   const geometry = await page.getByRole("group", { name: "章节操作", exact: true }).evaluate(el => [...el.children].map(child => {
  69  |     const r=child.getBoundingClientRect(), s=getComputedStyle(child);
  70  |     return { y:r.y, bottom:r.bottom, h:r.height, topBorder:s.borderTopWidth, bottomBorder:s.borderBottomWidth };
  71  |   }));
  72  |   expect(geometry).toHaveLength(3);
  73  |   expect(geometry[1]?.h).toBe(1);
  74  |   expect(geometry[0]?.bottomBorder).toBe("0px");
  75  |   expect(geometry[2]?.topBorder).toBe("0px");
  76  |   expect(geometry[1]?.y).toBe(geometry[0]?.bottom);
  77  |   expect(geometry[2]?.y).toBe(geometry[1]?.bottom);
  78  | });
  79  | 
  80  | test("attached text shares the button typography, outside corner and height", async ({ page }) => {
  81  |   for (const compact of [false, true]) {
  82  |     const control=page.getByRole("button", { name:"紧凑密度", exact:true });
  83  |     if ((await control.getAttribute("aria-pressed")) !== String(compact)) await control.click();
  84  |     const styles=await page.getByRole("group", {name:"提交操作",exact:true}).evaluate(el=>[...el.children].map(child=>{
  85  |       const s=getComputedStyle(child);return {font:s.fontSize,line:s.lineHeight,radius:s.borderRadius,height:child.getBoundingClientRect().height};
  86  |     }));
  87  |     expect(styles[0]?.font).toBe(styles[1]?.font);
  88  |     expect(styles[0]?.line).toBe(styles[1]?.line);
  89  |     expect(styles[0]?.height).toBe(styles[1]?.height);
  90  |     expect(styles[0]?.radius).toBe("6px 0px 0px 6px");
  91  |     expect(styles[1]?.radius).toBe("0px 6px 6px 0px");
  92  |   }
  93  | });
  94  | 
  95  | test("explicit horizontal separators replace adjacent borders during disabled transitions", async ({ page }) => {
  96  |   const group=page.getByRole("group", {name:"带分隔线的编辑操作",exact:true});
  97  |   for (const enabled of [false, true, false]) {
  98  |     if(enabled) await group.getByRole("button", {name:"撤销",exact:true}).click();
  99  |     else if(await group.getByRole("button", {name:"重做",exact:true}).isEnabled()) await group.getByRole("button", {name:"重做",exact:true}).click();
  100 |     const children=await group.evaluate(el=>[...el.children].map(child=>{const s=getComputedStyle(child),r=child.getBoundingClientRect();return {leftBorder:s.borderLeftWidth,rightBorder:s.borderRightWidth,x:r.x,right:r.right,width:r.width};}));
  101 |     expect(children[0]?.rightBorder).toBe("0px");
  102 |     expect(children[1]?.width).toBe(1);
  103 |     expect(children[2]?.leftBorder).toBe("0px");
  104 |     expect(children[1]?.x).toBe(children[0]?.right);
  105 |     expect(children[2]?.x).toBe(children[1]?.right);
  106 |   }
  107 | });
  108 | 
  109 | test("keyboard access and feedback stay with each independent example", async ({ page }) => {
  110 |   const group=page.getByRole("group", {name:"编辑操作",exact:true});
  111 |   const undo=group.getByRole("button", {name:"撤销",exact:true});
  112 |   await undo.focus();
  113 |   await page.keyboard.press("Tab");
  114 |   await expect(group.getByRole("button", {name:"恢复",exact:true})).toBeFocused();
  115 |   expect(await group.getByRole("button", {name:"恢复",exact:true}).evaluate(el=>({outline:getComputedStyle(el).outlineStyle,z:getComputedStyle(el).zIndex}))).toEqual({outline:"solid",z:"1"});
  116 |   await undo.press("Enter");
  117 |   await expect(group.getByRole("button", {name:"重做",exact:true})).toBeEnabled();
  118 |   await expect(page.getByRole("status", {name:"编辑操作反馈",exact:true})).toHaveText("已撤销当前示例更改");
  119 |   await page.getByRole("button", {name:"上移",exact:true}).click();
  120 |   await expect(page.getByRole("status", {name:"章节操作反馈",exact:true})).toHaveText("已上移章节");
```