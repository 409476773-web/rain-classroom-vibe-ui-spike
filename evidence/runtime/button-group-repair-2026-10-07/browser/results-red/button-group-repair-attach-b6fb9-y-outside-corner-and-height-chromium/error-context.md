# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: button-group-repair.spec.ts >> attached text shares the button typography, outside corner and height
- Location: tests/e2e/button-group-repair.spec.ts:47:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "14px"
Received: "16px"
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
    - paragraph [ref=e11]: 把同一任务的命令连接起来，每个按钮仍独立执行。方向由组控制，按钮状态由宿主提供。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "连接命令" [level=2] [ref=e21]
      - paragraph [ref=e22]: Tab 依次进入可用按钮，Enter 执行当前按钮；禁用按钮跳过。
      - generic [ref=e23]:
        - group "编辑操作" [ref=e24]:
          - button "撤销" [ref=e25] [cursor=pointer]
          - button "重做" [disabled] [ref=e29]
          - button "恢复" [ref=e31] [cursor=pointer]
        - status [ref=e33]: 尚未执行操作
    - generic [ref=e34]:
      - heading "垂直排列与附加文字" [level=2] [ref=e35]
      - paragraph [ref=e36]: 标签是说明文字；竖向组的分隔线设置为 horizontal。
      - generic [ref=e38]:
        - group "章节操作" [ref=e39]:
          - button "上移" [ref=e40] [cursor=pointer]
          - button "下移" [ref=e44] [cursor=pointer]
        - group "提交操作" [ref=e46]:
          - generic [ref=e47]: 当前草稿
          - button "保存" [ref=e48] [cursor=pointer]
      - generic [ref=e50]:
        - generic [ref=e51]:
          - button "复制代码" [ref=e52] [cursor=pointer]
          - status
        - code [ref=e55]: <ButtonGroup orientation="vertical" aria-label="章节操作"> <Button variant="tertiary">上移</Button> <ButtonGroupSeparator orientation="horizontal" /> <Button variant="tertiary">下移</Button> </ButtonGroup>
  - region [ref=e56]:
    - heading "使用边界" [level=2] [ref=e57]
    - generic [ref=e58]:
      - generic [ref=e59]:
        - heading "适合用在" [level=3] [ref=e60]
        - list [ref=e61]:
          - listitem [ref=e62]: 相关命令需要合并边界并形成一个操作区。
      - generic [ref=e63]:
        - heading "避免用在" [level=3] [ref=e64]
        - list [ref=e65]:
          - listitem [ref=e66]: 互斥显示模式或多选状态使用 Toggle Group；普通导航使用导航组件。
  - generic [ref=e67]:
    - region [ref=e68]:
      - heading "API 与结构" [level=2] [ref=e69]
      - table [ref=e71]:
        - caption [ref=e72]: Button Group 按钮组 常用接口
        - rowgroup [ref=e73]:
          - row [ref=e74]:
            - columnheader "名称" [ref=e75]
            - columnheader "类型" [ref=e76]
            - columnheader "默认" [ref=e77]
            - columnheader "说明" [ref=e78]
        - rowgroup [ref=e79]:
          - row [ref=e80]:
            - rowheader [ref=e81]:
              - code [ref=e82]: orientation
            - cell [ref=e83]:
              - code [ref=e84]: "\"horizontal\" | \"vertical\""
            - cell "\"horizontal\"" [ref=e85]
            - cell "组排列方向。" [ref=e86]
          - row [ref=e87]:
            - rowheader [ref=e88]:
              - code [ref=e89]: aria-label
            - cell [ref=e90]:
              - code [ref=e91]: string
            - cell "—" [ref=e92]
            - cell "说明按钮组的整体用途。" [ref=e93]
          - row [ref=e94]:
            - rowheader [ref=e95]:
              - code [ref=e96]: children
            - cell [ref=e97]:
              - code [ref=e98]: ReactNode
            - cell "—" [ref=e99]
            - cell "Button、ButtonGroupText 与 ButtonGroupSeparator。" [ref=e100]
          - row [ref=e101]:
            - rowheader [ref=e102]:
              - code [ref=e103]: ButtonGroupSeparator.orientation
            - cell [ref=e104]:
              - code [ref=e105]: "\"horizontal\" | \"vertical\""
            - cell "\"vertical\"" [ref=e106]
            - cell "分隔线方向；与组方向正交。" [ref=e107]
          - row [ref=e108]:
            - rowheader [ref=e109]:
              - code [ref=e110]: ButtonGroupText.render
            - cell [ref=e111]:
              - code [ref=e112]: Base UI useRender
            - cell "—" [ref=e113]
            - cell "可组合静态标签；不承担按钮或选择状态。" [ref=e114]
      - paragraph [ref=e115]: Parts / Slots：button-group、button-group-text、button-group-separator
    - region [ref=e116]:
      - heading "调用示例" [level=2] [ref=e117]
      - generic [ref=e118]:
        - generic [ref=e119]:
          - button "复制代码" [ref=e120] [cursor=pointer]
          - status
        - code [ref=e123]: "import { Button, ButtonGroup, ButtonGroupSeparator } from \"@rain-next/ui\"; <ButtonGroup aria-label=\"编辑操作\" orientation=\"horizontal\"> <Button variant=\"tertiary\" onClick={undo}>撤销</Button> <ButtonGroupSeparator /> <Button variant=\"tertiary\" disabled={!canRedo} onClick={redo}>重做</Button> </ButtonGroup>"
      - paragraph [ref=e124]:
        - text: 当前源码：
        - code [ref=e125]: packages/ui/src/button-group/button-group.tsx
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test.beforeEach(async ({ page }) => {
  4  |   await page.goto("/#button-group");
  5  |   await expect(page.locator("#button-group-title")).toBeVisible();
  6  | });
  7  | 
  8  | test("joined buttons retain only the outside corners across themes and densities", async ({ page }) => {
  9  |   for (const theme of ["浅色", "深色"]) {
  10 |     await page.getByRole("button", { name: theme, exact: true }).click();
  11 |     for (const compact of [false, true]) {
  12 |       const control = page.getByRole("button", { name: "紧凑密度", exact: true });
  13 |       if ((await control.getAttribute("aria-pressed")) !== String(compact)) await control.click();
  14 |       const styles = await page.getByRole("group", { name: "编辑操作", exact: true }).locator(":scope > button").evaluateAll(elements => elements.map(el => {
  15 |         const s = getComputedStyle(el), r = el.getBoundingClientRect();
  16 |         return { tl: s.borderTopLeftRadius, tr: s.borderTopRightRadius, bl: s.borderBottomLeftRadius, br: s.borderBottomRightRadius, leftBorder: s.borderLeftWidth, x: r.x, right: r.right };
  17 |       }));
  18 |       expect(styles).toHaveLength(3);
  19 |       expect(styles[0]?.tr).toBe("0px");
  20 |       expect(styles[0]?.br).toBe("0px");
  21 |       expect(styles[0]?.tl).toBe("6px");
  22 |       expect(styles[1]?.tl).toBe("0px");
  23 |       expect(styles[1]?.tr).toBe("0px");
  24 |       expect(styles[2]?.tl).toBe("0px");
  25 |       expect(styles[2]?.tr).toBe("6px");
  26 |       expect(styles[1]?.leftBorder).toBe("0px");
  27 |       expect(styles[2]?.leftBorder).toBe("0px");
  28 |       expect(styles[1]?.x).toBe(styles[0]?.right);
  29 |       expect(styles[2]?.x).toBe(styles[1]?.right);
  30 |     }
  31 |   }
  32 | });
  33 | 
  34 | test("the vertical divider consumes one pixel and solely owns its seam", async ({ page }) => {
  35 |   const geometry = await page.getByRole("group", { name: "章节操作", exact: true }).evaluate(el => [...el.children].map(child => {
  36 |     const r=child.getBoundingClientRect(), s=getComputedStyle(child);
  37 |     return { y:r.y, bottom:r.bottom, h:r.height, topBorder:s.borderTopWidth, bottomBorder:s.borderBottomWidth };
  38 |   }));
  39 |   expect(geometry).toHaveLength(3);
  40 |   expect(geometry[1]?.h).toBe(1);
  41 |   expect(geometry[0]?.bottomBorder).toBe("0px");
  42 |   expect(geometry[2]?.topBorder).toBe("0px");
  43 |   expect(geometry[1]?.y).toBe(geometry[0]?.bottom);
  44 |   expect(geometry[2]?.y).toBe(geometry[1]?.bottom);
  45 | });
  46 | 
  47 | test("attached text shares the button typography, outside corner and height", async ({ page }) => {
  48 |   for (const compact of [false, true]) {
  49 |     const control=page.getByRole("button", { name:"紧凑密度", exact:true });
  50 |     if ((await control.getAttribute("aria-pressed")) !== String(compact)) await control.click();
  51 |     const styles=await page.getByRole("group", {name:"提交操作",exact:true}).evaluate(el=>[...el.children].map(child=>{
  52 |       const s=getComputedStyle(child);return {font:s.fontSize,line:s.lineHeight,radius:s.borderRadius,height:child.getBoundingClientRect().height};
  53 |     }));
> 54 |     expect(styles[0]?.font).toBe(styles[1]?.font);
     |                             ^ Error: expect(received).toBe(expected) // Object.is equality
  55 |     expect(styles[0]?.line).toBe(styles[1]?.line);
  56 |     expect(styles[0]?.height).toBe(styles[1]?.height);
  57 |     expect(styles[0]?.radius).toBe("6px 0px 0px 6px");
  58 |     expect(styles[1]?.radius).toBe("0px 6px 6px 0px");
  59 |   }
  60 | });
  61 | 
```