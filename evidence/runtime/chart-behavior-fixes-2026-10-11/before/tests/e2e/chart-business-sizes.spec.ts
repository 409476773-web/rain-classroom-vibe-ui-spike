import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence = process.env.RAIN_CHART_EXPERIENCE_EVIDENCE_DIR ? `${process.env.RAIN_CHART_EXPERIENCE_EVIDENCE_DIR}/sizes` : "evidence/runtime/chart-business-label-color-layout-2026-10-09/browser/sizes";
const kinds = ["quantity", "segments", "columns", "pie", "donut", "ring", "arc", "line", "area"];
const sizes = ["compact", "comfortable"] as const;
const frames = {
  compact: { plot: [96, 32], pie: [32, 32], ring: [32, 32], arc: [40, 30], bar: [120, 10] },
  comfortable: { plot: [128, 48], pie: [56, 56], ring: [64, 64], arc: [72, 54], bar: [160, 12] },
};

for (const width of [1440, 916, 390]) test(`both mini sizes share data and retain readable geometry at ${width}px`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("/#chart-business");
  const gallery = page.locator(".rain-business-mini-gallery");
  await expect(gallery.locator("figure")).toHaveCount(18);
  const facts = [];
  const captions=new Map<string,string>();
  for (const kind of kinds) for (const size of sizes) {
    const mini = gallery.locator(`[data-mini-kind="${kind}"][data-size="${size}"]`);
    await expect(mini).toHaveCount(1);
    await expect(mini).toHaveAttribute("data-mini-state", "normal");
    const frame = await mini.evaluate(node => {
      const b = node.querySelector('.rain-business-mini-slot')!.getBoundingClientRect();
      const svg = node.querySelector("svg");
      const matrix = svg?.querySelector("path") ? (svg.querySelector("path") as SVGGraphicsElement).getScreenCTM() : null;
      return { width: b.width, height: b.height, hidden: node.closest('[aria-hidden="true"]') !== null,
        svgDecorative: svg ? svg.closest('[aria-hidden="true"]') !== null : null, scaleX: matrix ? Math.hypot(matrix.a, matrix.b) : null, scaleY: matrix ? Math.hypot(matrix.c, matrix.d) : null };
    });
    const expected = kind === 'quantity' ? [frames[size].bar[0], size === 'compact' ? 6 : 8] : frames[size][kind === "segments" ? "bar" : ["pie", "donut"].includes(kind) ? "pie" : kind === "ring" ? "ring" : kind === "arc" ? "arc" : "plot"];
    expect(frame.width).toBeCloseTo(expected[0]!, 0);
    expect(frame.height).toBeGreaterThanOrEqual(expected[1]!);
    expect(frame.hidden).toBe(false);
    if (frame.svgDecorative !== null) expect(frame.svgDecorative).toBe(true);
    if (["pie", "donut", "ring", "arc"].includes(kind)) {
      expect(frame.scaleX! / frame.scaleY!).toBeCloseTo(1, 3);
    }
    await expect(mini.locator("xpath=ancestor::figure").locator("figcaption")).not.toHaveText("");
    const caption=await mini.locator("xpath=ancestor::figure").evaluate(node=>{
      const reading=document.getElementById(node.getAttribute("aria-describedby")!);
      return reading?.textContent?.trim() ?? "";
    });
    expect(caption).toBeTruthy();
    if(size === "compact")captions.set(kind,caption);else expect(caption).toBe(captions.get(kind));
    facts.push({ kind, size, ...frame });
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await mkdir(evidence, { recursive: true });
  await gallery.screenshot({ path: `${evidence}/gallery-${width}.png` });
  await writeFile(`${evidence}/gallery-${width}.json`, JSON.stringify(facts, null, 2));
});

test("Playground size and model controls update five mini entries and their reusable source",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});
  for(const id of ["line","area","bar","pie","ring"]){
    await page.goto(`/#chart-${id}`);
    const primary=page.locator(`[data-rain-id="chart-${id}"]`);
    await page.getByRole("combobox",{name:"尺寸配方",exact:true}).selectOption("mini");
    await page.getByText("调用配置、完整源码与示例数据",{exact:true}).click();
    const source=page.locator('.rain-chart-source[data-source="default"] pre');
    let reading:string|null=null;
    for(const size of ["compact","comfortable"]){
      await page.getByRole("combobox",{name:"迷你型号",exact:true}).selectOption(size);
      await expect(primary.locator('[data-mini-kind]').first()).toHaveAttribute("data-size",size);
      await expect(source).toContainText(`miniSize="${size}"`);
      const current=await primary.locator('tbody').textContent();
      if(reading !== null)expect(current).toBe(reading);reading=current;
    }
    await page.getByRole("combobox",{name:"尺寸配方",exact:true}).selectOption("standard");
    await expect(primary.locator('[data-mini-kind]')).toHaveCount(0);
    await expect(source).toContainText('size="standard"');
  }
});

test("zero and missing retain every mini slot; empty and invalid are page states", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-business");
  const gallery = page.locator(".rain-business-mini-gallery");
  const identities = () => gallery.locator("[data-mini-kind]").evaluateAll(nodes => nodes.map(node => [node.getAttribute("data-mini-kind"), node.getAttribute("data-size")]));
  await expect(gallery.locator("figure")).toHaveCount(18);
  const normal = await identities();
  for (const state of ["zero", "missing"]) {
    await page.getByRole("combobox", { name: "业务数据状态" }).selectOption(state);
    expect(await identities()).toEqual(normal);
    await expect(gallery).toContainText(state === "zero" ? "零总量" : "缺测");
    expect(await gallery.locator('path[d*="NaN"], path[d*="Infinity"]').count()).toBe(0);
  }
  await page.getByRole("combobox", { name: "业务数据状态" }).selectOption("empty");
  await expect(page.getByRole("status").filter({ hasText: "暂无数据" })).toBeVisible();
  await expect(page.locator(".rain-business-table")).toHaveCount(0);
  await page.getByRole("combobox", { name: "业务数据状态" }).selectOption("invalid");
  await expect(page.getByRole("alert")).toContainText("无效数据");
  await expect(gallery).toHaveCount(0);
});

test("radial hover growth fits its SVG and arc tracks use an open-bottom shape", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#chart-business");
  await page.waitForTimeout(1100);
  const facts = [];
  for (const kind of ["pie", "donut", "ring", "arc"]) for (const size of sizes) {
    const mini = page.locator(`.rain-business-mini-gallery [data-mini-kind="${kind}"][data-size="${size}"]`);
    await mini.scrollIntoViewIfNeeded();
    const svg = mini.locator("svg");
    await page.mouse.move(0,0); await page.waitForTimeout(250);
    const before=await svg.locator('path[d]').evaluateAll(nodes=>nodes.map(node=>{const b=(node as SVGGraphicsElement).getBBox();return {width:b.width,height:b.height};}));
    const point=await svg.evaluate(node=>{
      const path=node.querySelector<SVGPathElement>('path[d]')!, p=path.getPointAtLength(path.getTotalLength()*.25), matrix=path.getScreenCTM()!;
      const screen=new DOMPoint(p.x,p.y).matrixTransform(matrix), origin=new DOMPoint(0,0).matrixTransform(matrix);
      const radius=Math.hypot(screen.x-origin.x,screen.y-origin.y);
      return {x:screen.x+(origin.x-screen.x)/radius,y:screen.y+(origin.y-screen.y)/radius};
    });
    await page.mouse.move(point.x,point.y);
    await page.waitForTimeout(300);
    const bounds = await svg.evaluate(node => {
      const viewport = node.getBoundingClientRect();
      return [...node.querySelectorAll("path[d]")].map(path => {
        const b = path.getBoundingClientRect(), geometry = (path as SVGGraphicsElement).getBBox();
        const matrix=(path as SVGGraphicsElement).getScreenCTM()!;
        return { left: b.left - viewport.left, top: b.top - viewport.top, right: viewport.right - b.right, bottom: viewport.bottom - b.bottom, width: geometry.width, height: geometry.height, scale:Math.hypot(matrix.a,matrix.b), filter: getComputedStyle(path).filter };
      });
    });
    expect(bounds.length).toBeGreaterThan(0);
    expect(bounds.some((b,i)=>b.scale>1.01||b.width>before[i]!.width+.1||b.height>before[i]!.height+.1)).toBe(true);
    for (const b of bounds) {
      expect(Math.min(b.left, b.top, b.right, b.bottom)).toBeGreaterThanOrEqual(-.5);
      if (["pie", "donut"].includes(kind)) expect(b.filter).toBe("none");
    }
    await mkdir(evidence, { recursive: true });
    await mini.screenshot({ path: `${evidence}/hover-${kind}-${size}.png` });
    if (kind === "arc") {
      const track = bounds[0]!;
      expect(track.width).toBeGreaterThan(track.height * 1.15);
    }
    facts.push({ kind, size, bounds });
  }
  await mkdir(evidence, { recursive: true });
  await writeFile(`${evidence}/radial-hover.json`, JSON.stringify(facts, null, 2));
});

test("mini readings remain in the document flow under page zoom and independent text enlargement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/#chart-business");
  await expect(page.locator(".rain-business-mini-gallery figure")).toHaveCount(18);
  await mkdir(evidence, { recursive: true });
  const session=await page.context().newCDPSession(page);
  for (const mode of ["page-zoom", "text-only"]) {
    if(mode === "page-zoom") await session.send("Emulation.setDeviceMetricsOverride",{width:720,height:500,deviceScaleFactor:2,mobile:false});
    else await session.send("Emulation.clearDeviceMetricsOverride");
    await page.evaluate(mode => {
      if (mode === "text-only") {
        const text = [...document.querySelectorAll<HTMLElement>(".rain-business-mini-gallery h3, .rain-business-mini-gallery figcaption, .rain-business-mini-gallery figcaption *, .rain-business-mini-gallery__description, .rain-business-mini-gallery__description *, .rain-business-mini-gallery [data-mini-reading] strong, .rain-business-mini-gallery [data-mini-reading] > span")].map(node => ({node,font:parseFloat(getComputedStyle(node).fontSize),line:parseFloat(getComputedStyle(node).lineHeight)}));
        for (const {node,font,line} of text) {node.style.fontSize = `${font * 2}px`; if(Number.isFinite(line))node.style.lineHeight = `${line * 2}px`;}
      }
    }, mode);
    const gallery = page.locator(".rain-business-mini-gallery");
    if(mode === "text-only") await expect(gallery.locator('[data-mini-reading][data-placement="outside"]')).toHaveCount(2);
    const readings = await gallery.locator("h3, figcaption, .rain-business-mini-gallery__description, [data-mini-reading]").evaluateAll(nodes => nodes.map(node => {
      const b = node.getBoundingClientRect(), css = getComputedStyle(node), group = node.closest("[data-mini-group]")!.getBoundingClientRect();
      return { text: node.textContent, width: b.width, height: b.height, hidden: node.closest('[aria-hidden="true"]') !== null, clipped: css.overflow === "hidden", withinGroup: b.left >= group.left - 1 && b.right <= group.right + 1 && b.top >= group.top - 1 && b.bottom <= group.bottom + 1 };
    }));
    const viewport=await page.evaluate(()=>({cssWidth:innerWidth,deviceScaleFactor:devicePixelRatio}));
    await writeFile(`${evidence}/${mode}-200.json`, JSON.stringify({ method: mode === "page-zoom" ? "Chromium device metrics emulating 200% layout and pixels from 1440: CSS viewport 720, scale factor 2" : "only caption and progress text font size and line height doubled", viewport,readings }, null, 2));
    await gallery.screenshot({ path: `${evidence}/${mode}-200.png` });
    expect(readings.every(reading => reading.width > 0 && reading.height > 0 && !reading.hidden && !reading.clipped && reading.withinGroup)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

test("business hosts keep nearby readings, right aligned table counts and common card baselines", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#chart-business");
  const cards = page.locator(".rain-business-cards");
  await expect(cards.locator("[data-primary-reading]")).toHaveCount(3);
  await expect(cards.locator("[data-mini-reading]")).toHaveCount(0);
  expect(await cards.locator("[data-mini-kind]").evaluateAll(nodes => nodes.every(node => node.getAttribute("data-size") === (node.getAttribute("data-mini-kind") === "area" ? "compact" : "comfortable")))).toBe(true);
  const baselines = await cards.locator("[data-primary-reading]").evaluateAll(nodes => nodes.map(node => {
    const probe = document.createElement("span");
    probe.style.cssText = "display:inline-block;width:0;height:0;padding:0;margin:0;vertical-align:baseline";
    node.append(probe); const baseline = probe.getBoundingClientRect().top; probe.remove();
    return { text: node.textContent, baseline, font: getComputedStyle(node).fontSize, lineHeight: getComputedStyle(node).lineHeight };
  }));
  const tableReadings = await page.locator('.rain-business-table [data-reading="count"]').evaluateAll(nodes => nodes.map(node => ({text:node.textContent,align:getComputedStyle(node).textAlign})));
  expect(tableReadings.every(reading => reading.align === "right")).toBe(true);
  expect(await page.locator('.rain-business-table [data-mini-kind]').evaluateAll(nodes => nodes.every(node => node.getAttribute("data-size") === "compact"))).toBe(true);
  await expect(page.locator('.rain-business-list-progress [data-mini-kind="ring"]')).toHaveCount(3);
  await expect(page.locator('.rain-business-comfortable-group [data-mini-kind="arc"]')).toHaveAttribute("data-size","comfortable");
  const footerReading=await page.locator('.rain-business-comfortable-group [data-mini-reading] strong').evaluate(node=>{
    const css=getComputedStyle(node);return {text:node.textContent,fontSize:css.fontSize,lineHeight:css.lineHeight,fontFamily:css.fontFamily};
  });
  expect(footerReading.fontSize).toBe("13px"); expect(footerReading.lineHeight).toBe("20px");
  expect(footerReading.fontFamily).toBe(await cards.locator('.rain-business-number').first().evaluate(node=>getComputedStyle(node).fontFamily));
  await mkdir(evidence, { recursive: true });
  const difference = Math.max(...baselines.map(value => value.baseline)) - Math.min(...baselines.map(value => value.baseline));
  await writeFile(`${evidence}/host-readings.json`, JSON.stringify({baselines,difference,tableReadings,footerReading},null,2));
  expect(difference).toBeLessThanOrEqual(1);
});

test("embedded unavailable states have one reading and large ranking numbers keep their own column",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"}); await page.goto("/#chart-business");
  const first=page.locator('.rain-business-table tbody tr[data-row-id="college-1"]'), facts=[];
  for(const state of ["missing","zero"]){
    await page.getByRole("combobox",{name:"业务数据状态"}).selectOption(state);
    await first.scrollIntoViewIfNeeded();
    await expect(first.locator('[data-mini-kind="arc"]')).toHaveAttribute("data-mini-state",state === "zero" ? "inapplicable" : "missing");
    const readings=await first.locator('.rain-business-cell-radial').evaluateAll(nodes=>nodes.map(node=>node.textContent));
    facts.push({state,readings});
    await mkdir(evidence,{recursive:true}); await writeFile(`${evidence}/unavailable-readings.json`,JSON.stringify(facts,null,2));
    if(state === "missing")for(const reading of readings)expect(reading?.match(/缺测/g)).toHaveLength(1);
    else expect(readings[1]?.match(/不适用/g)).toHaveLength(1);
  }
  await page.getByRole("combobox",{name:"业务数据状态"}).selectOption("normal");
  const ranking=page.locator('.rain-business-ranking');
  await ranking.locator('.rain-business-reading').first().evaluate(node=>{node.firstChild!.textContent="1,234,567,890,123";});
  const rankings=[];
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:1000});
    const layout=await ranking.locator('li').evaluateAll(nodes=>nodes.map(node=>{
      const reading=node.querySelector('.rain-business-reading')!.getBoundingClientRect(), bar=node.querySelector('.rain-data-bar')!.getBoundingClientRect();
      return {gap:reading.left-bar.right,right:reading.right,readingWidth:reading.width,barWidth:bar.width};
    }));
    expect(layout.every(item=>item.gap>=8&&item.barWidth>0)).toBe(true);
    expect(Math.max(...layout.map(item=>item.right))-Math.min(...layout.map(item=>item.right))).toBeLessThan(1);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await ranking.screenshot({path:`${evidence}/ranking-integer-${width}.png`}); rankings.push({width,layout});
  }
  await writeFile(`${evidence}/ranking-integer.json`,JSON.stringify({scope:"DOM text layout stress only; original bound chart values unchanged",rankings},null,2));
});
