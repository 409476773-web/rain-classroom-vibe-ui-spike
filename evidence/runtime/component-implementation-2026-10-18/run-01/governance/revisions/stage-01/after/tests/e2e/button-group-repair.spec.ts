import { evidenceOutputPath } from "../../scripts/evidence-output.mjs";
import { expect, test } from "@playwright/test";
import { fileURLToPath } from "node:url";

const captures = process.env.BUTTON_GROUP_EVIDENCE ?? evidenceOutputPath(fileURLToPath(new URL("../../evidence/runtime/button-group-repair-2026-10-07/browser/", import.meta.url)));

test.beforeEach(async ({ page }) => {
  await page.goto("/#button-group");
  await expect(page.locator("#button-group-title")).toBeVisible();
});

test("all five explicit sizes align text, borders and separators without narrow overflow", async ({ page }) => {
  const sizes = [{size:"mini",height:28,font:"13px",line:"18px",radius:"6px"},{size:"small",height:32,font:"14px",line:"22px",radius:"6px"},{size:"medium",height:36,font:"14px",line:"22px",radius:"6px"},{size:"large",height:40,font:"14px",line:"22px",radius:"6px"},{size:"xl",height:48,font:"16px",line:"24px",radius:"8px"}];
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", {name:theme,exact:true}).click();
    for (const compact of [false,true]) {
      const density=page.getByRole("button",{name:"紧凑密度",exact:true});
      if ((await density.getAttribute("aria-pressed"))!==String(compact)) await density.click();
      for (const expected of sizes) {
        for (const kind of ["横向","文字","竖向"]) {
          const group=page.getByRole("group",{name:`${expected.size} ${kind}按钮组`,exact:true});
          const geometry=await group.evaluate(el=>[...el.children].map(child=>{const s=getComputedStyle(child),r=child.getBoundingClientRect();return {slot:child.getAttribute('data-slot'),height:r.height,font:s.fontSize,line:s.lineHeight,tl:s.borderTopLeftRadius,tr:s.borderTopRightRadius,opacity:s.opacity,disabled:child.hasAttribute('disabled'),childOpacity:child.querySelector('[data-slot="label"]')?getComputedStyle(child.querySelector('[data-slot="label"]')!).opacity:null};}));
          for(const item of geometry.filter(item=>item.slot!=='button-group-separator')) {
            expect(item.height).toBe(expected.height);
            expect(item.font).toBe(expected.font);
            expect(item.line).toBe(expected.line);
            expect(item.opacity).toBe("1");
            if(item.disabled) expect(item.childOpacity).toBe("0.4");
          }
          expect(geometry[0]?.tl).toBe(expected.radius);
          expect(geometry[0]?.tr).toBe(kind==='竖向'?expected.radius:'0px');
          if(kind==='竖向') expect(geometry.find(item=>item.slot==='button-group-separator')?.height).toBe(1);
        }
      }
    }
    await page.getByRole("heading",{name:"多尺寸",exact:true}).locator("..").screenshot({path:`${captures}/sizes-${theme}.png`});
  }
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  const scroll=page.getByRole("group",{name:"xl 横向按钮组",exact:true}).locator("..");
  expect(await scroll.evaluate(el=>el.scrollWidth)).toBeGreaterThan(await scroll.evaluate(el=>el.clientWidth));
  await scroll.screenshot({path:`${captures}/sizes-xl-narrow.png`});
});

test("disabled content fades while its borders and shared seam stay intact", async ({ page }) => {
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    const group = page.getByRole("group", { name: "编辑操作", exact: true });
    const styles = await group.locator(":scope > button").evaluateAll(elements => elements.map(el => ({
      opacity: getComputedStyle(el).opacity,
      border: getComputedStyle(el).borderRightColor,
      labelOpacity: getComputedStyle(el.querySelector('[data-slot="label"]')!).opacity,
    })));
    expect(styles[1]?.opacity).toBe("1");
    expect(styles[1]?.border).toBe(styles[0]?.border);
    expect(styles[1]?.labelOpacity).toBe("0.4");
    await expect(group.getByRole("button", { name: "重做", exact: true })).toBeDisabled();
  }
});

test("explicit separators use a continuous full-size line matching ordinary seams", async ({ page }) => {
  for (const name of ["带分隔线的编辑操作", "章节操作"]) {
    const geometry = await page.getByRole("group", { name, exact: true }).evaluate(el => {
      const line = el.querySelector('.rain-separator')!, button = el.querySelector('button')!;
      const r = line.getBoundingClientRect(), group = el.getBoundingClientRect();
      return { color: getComputedStyle(line).backgroundColor, border: getComputedStyle(button).borderTopColor,
        size: el.getAttribute('data-orientation') === 'horizontal' ? r.height : r.width,
        groupSize: el.getAttribute('data-orientation') === 'horizontal' ? group.height : group.width };
    });
    expect(geometry.color).toBe(geometry.border);
    expect(geometry.size).toBe(geometry.groupSize);
  }
});

test("state comparison, quieter feedback and native code disclosure work across densities", async ({ page }) => {
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    for (const compact of [false, true]) {
      const density = page.getByRole("button", { name: "紧凑密度", exact: true });
      if ((await density.getAttribute("aria-pressed")) !== String(compact)) await density.click();
      for (const name of ["正常", "首项禁用", "中间禁用", "末项禁用", "全部禁用"]) {
        const states = await page.getByRole("group", { name: `${name}示例`, exact: true }).locator(":scope > button").evaluateAll(elements => elements.map(el => {
          const s = getComputedStyle(el);
          return { opacity: s.opacity, top: s.borderTopWidth, height: el.getBoundingClientRect().height,
            disabled: el.hasAttribute('disabled'), foreground: getComputedStyle(el.querySelector('[data-slot="label"]')!).opacity };
        }));
        for (const state of states) {
          expect(state.opacity).toBe("1");
          expect(state.top).toBe("1px");
          expect(state.height).toBe(compact ? 32 : 36);
          expect(state.foreground).toBe(state.disabled ? "0.4" : "1");
        }
      }
    }
    const density = page.getByRole("button", { name: "紧凑密度", exact: true });
    if ((await density.getAttribute("aria-pressed")) === "true") await density.click();
    await page.screenshot({ path: `${captures}/style-overview-${theme}.png` });
  }
  const feedback = page.getByRole("status", { name: "编辑操作反馈", exact: true });
  expect(await feedback.evaluate(el => ({ font: getComputedStyle(el).fontSize, margin: getComputedStyle(el).marginTop }))).toEqual({ font: "13px", margin: "8px" });
  const code = page.getByRole("group", { name: "编辑操作", exact: true }).locator("..").locator("details");
  await expect(code).not.toHaveAttribute("open");
  await code.locator("summary").press("Enter");
  await expect(code).toHaveAttribute("open", "");
  await expect(code.locator("pre")).toBeVisible();
});

test("joined buttons retain only the outside corners across themes and densities", async ({ page }) => {
  for (const theme of ["浅色", "深色"]) {
    await page.getByRole("button", { name: theme, exact: true }).click();
    for (const compact of [false, true]) {
      const control = page.getByRole("button", { name: "紧凑密度", exact: true });
      if ((await control.getAttribute("aria-pressed")) !== String(compact)) await control.click();
      const styles = await page.getByRole("group", { name: "编辑操作", exact: true }).locator(":scope > button").evaluateAll(elements => elements.map(el => {
        const s = getComputedStyle(el), r = el.getBoundingClientRect();
        return { tl: s.borderTopLeftRadius, tr: s.borderTopRightRadius, bl: s.borderBottomLeftRadius, br: s.borderBottomRightRadius, leftBorder: s.borderLeftWidth, x: r.x, right: r.right };
      }));
      expect(styles).toHaveLength(3);
      expect(styles[0]?.tr).toBe("0px");
      expect(styles[0]?.br).toBe("0px");
      expect(styles[0]?.tl).toBe("6px");
      expect(styles[1]?.tl).toBe("0px");
      expect(styles[1]?.tr).toBe("0px");
      expect(styles[2]?.tl).toBe("0px");
      expect(styles[2]?.tr).toBe("6px");
      expect(styles[1]?.leftBorder).toBe("0px");
      expect(styles[2]?.leftBorder).toBe("0px");
      expect(styles[1]?.x).toBe(styles[0]?.right);
      expect(styles[2]?.x).toBe(styles[1]?.right);
    }
  }
});

test("the vertical divider consumes one pixel and solely owns its seam", async ({ page }) => {
  const geometry = await page.getByRole("group", { name: "章节操作", exact: true }).evaluate(el => [...el.children].map(child => {
    const r=child.getBoundingClientRect(), s=getComputedStyle(child);
    return { y:r.y, bottom:r.bottom, h:r.height, topBorder:s.borderTopWidth, bottomBorder:s.borderBottomWidth };
  }));
  expect(geometry).toHaveLength(3);
  expect(geometry[1]?.h).toBe(1);
  expect(geometry[0]?.bottomBorder).toBe("0px");
  expect(geometry[2]?.topBorder).toBe("0px");
  expect(geometry[1]?.y).toBe(geometry[0]?.bottom);
  expect(geometry[2]?.y).toBe(geometry[1]?.bottom);
});

test("attached text shares the button typography, outside corner and height", async ({ page }) => {
  for (const compact of [false, true]) {
    const control=page.getByRole("button", { name:"紧凑密度", exact:true });
    if ((await control.getAttribute("aria-pressed")) !== String(compact)) await control.click();
    const styles=await page.getByRole("group", {name:"提交操作",exact:true}).evaluate(el=>[...el.children].map(child=>{
      const s=getComputedStyle(child);return {font:s.fontSize,line:s.lineHeight,radius:s.borderRadius,height:child.getBoundingClientRect().height};
    }));
    expect(styles[0]?.font).toBe(styles[1]?.font);
    expect(styles[0]?.line).toBe(styles[1]?.line);
    expect(styles[0]?.height).toBe(styles[1]?.height);
    expect(styles[0]?.radius).toBe("6px 0px 0px 6px");
    expect(styles[1]?.radius).toBe("0px 6px 6px 0px");
  }
});

test("explicit horizontal separators replace adjacent borders during disabled transitions", async ({ page }) => {
  const group=page.getByRole("group", {name:"带分隔线的编辑操作",exact:true});
  for (const enabled of [false, true, false]) {
    if(enabled) await group.getByRole("button", {name:"撤销",exact:true}).click();
    else if(await group.getByRole("button", {name:"重做",exact:true}).isEnabled()) await group.getByRole("button", {name:"重做",exact:true}).click();
    const children=await group.evaluate(el=>[...el.children].map(child=>{const s=getComputedStyle(child),r=child.getBoundingClientRect();return {leftBorder:s.borderLeftWidth,rightBorder:s.borderRightWidth,x:r.x,right:r.right,width:r.width};}));
    expect(children[0]?.rightBorder).toBe("0px");
    expect(children[1]?.width).toBe(1);
    expect(children[2]?.leftBorder).toBe("0px");
    expect(children[1]?.x).toBe(children[0]?.right);
    expect(children[2]?.x).toBe(children[1]?.right);
  }
});

test("keyboard access and feedback stay with each independent example", async ({ page }) => {
  const group=page.getByRole("group", {name:"编辑操作",exact:true});
  const undo=group.getByRole("button", {name:"撤销",exact:true});
  await undo.focus();
  await page.keyboard.press("Tab");
  await expect(group.getByRole("button", {name:"恢复",exact:true})).toBeFocused();
  expect(await group.getByRole("button", {name:"恢复",exact:true}).evaluate(el=>({outline:getComputedStyle(el).outlineStyle,z:getComputedStyle(el).zIndex}))).toEqual({outline:"solid",z:"1"});
  await undo.press("Enter");
  await expect(group.getByRole("button", {name:"重做",exact:true})).toBeEnabled();
  await expect(page.getByRole("status", {name:"编辑操作反馈",exact:true})).toHaveText("已撤销当前示例更改");
  await page.getByRole("button", {name:"上移",exact:true}).click();
  await expect(page.getByRole("status", {name:"章节操作反馈",exact:true})).toHaveText("已上移章节");
  await expect(page.getByRole("status", {name:"编辑操作反馈",exact:true})).toHaveText("已撤销当前示例更改");
  await expect(page.getByRole("status", {name:"带分隔线的编辑操作反馈",exact:true})).toHaveText("尚未执行操作");
});

test("all four examples fit narrow screens and have a matching callable example", async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBeLessThanOrEqual(391);
  await expect(page.getByRole("heading", {name:"文字与保存",exact:true})).toBeVisible();
  await expect(page.getByRole("group", {name:"提交操作",exact:true}).locator("..").locator("pre code").filter({hasText:"ButtonGroupText"})).toHaveCount(1);
  for(const label of ["编辑操作","带分隔线的编辑操作","章节操作","提交操作"]){
    const example=page.getByRole("group", {name:label,exact:true}).locator("..");
    await example.screenshot({path:`${captures}/${label}-narrow.png`});
  }
  await page.setViewportSize({width:1390,height:900});
  for(const theme of ["浅色","深色"]){
    await page.getByRole("button", {name:theme,exact:true}).click();
    for(const label of ["编辑操作","带分隔线的编辑操作","章节操作","提交操作"]){
      await page.getByRole("group", {name:label,exact:true}).locator("..").screenshot({path:`${captures}/${label}-${theme}.png`});
    }
  }
});

test("dark examples use a dark reading surface instead of retaining the light panel", async ({ page }) => {
  await page.getByRole("button", {name:"深色",exact:true}).click();
  const surface=page.locator(".component-doc__preview").first();
  expect(await surface.evaluate(el=>getComputedStyle(el).backgroundColor)).toBe("rgb(30, 36, 59)");
  const documentColors=await page.locator('[data-rain-id="doc-button-group"]').evaluate(el=>({background:getComputedStyle(el).backgroundColor,color:getComputedStyle(el).color}));
  expect(documentColors.background).not.toBe("rgba(0, 0, 0, 0)");
  expect(documentColors.color).not.toBe("rgb(20, 35, 60)");
});
