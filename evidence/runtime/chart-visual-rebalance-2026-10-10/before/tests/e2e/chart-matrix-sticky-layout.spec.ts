import { expect, test, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

const evidence="evidence/runtime/chart-matrix-sticky-layout-2026-10-09/browser";
const matrix=(page:Page,id:string)=>page.locator(`[data-matrix-example="${id}"] [data-rain-id="ui-chart-matrix"]`);
async function open(page:Page) {
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/#chart-matrix");
  await expect(matrix(page,"weekday-hour").locator("tbody tr")).toHaveCount(7);
}
async function record(name:string,facts:unknown) {
  await mkdir(evidence,{recursive:true});
  await writeFile(`${evidence}/${name}.json`,JSON.stringify(facts,null,2));
}

test("row headings fit short and long labels while data columns stay equal",async({page})=>{
  await open(page);
  const chart=matrix(page,"weekday-hour");
  const short=await chart.locator("tbody th").first().evaluate(node=>node.getBoundingClientRect().width);
  const course=await matrix(page,"course-similarity").locator("tbody th").first().evaluate(node=>node.getBoundingClientRect().width);
  await record("heading-baseline",{short,course});
  expect(short).toBeLessThan(72);
  expect(course).toBeGreaterThan(short+30);
  await page.getByRole("combobox",{name:"示例状态",exact:true}).selectOption("long");
  const long=await chart.locator("tbody th").first().evaluate(node=>node.getBoundingClientRect().width);
  expect(long).toBeGreaterThan(short);
  expect(long).toBeLessThanOrEqual(240);
  await page.setViewportSize({width:390,height:844});
  const narrow=await chart.locator('[data-slot="scroll-container"]').evaluate(node=>({width:node.clientWidth,heading:node.querySelector("tbody th")!.getBoundingClientRect().width,cells:[...node.querySelectorAll("tbody tr:first-child td")].map(cell=>cell.getBoundingClientRect().width)}));
  expect(narrow.heading).toBeLessThanOrEqual(narrow.width*.4+1);
  expect(Math.max(...narrow.cells)-Math.min(...narrow.cells)).toBeLessThan(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await record("heading-fit",{short,course,long,narrow});
});

test("hovered sticky row remains opaque while the matrix scrolls underneath",async({page})=>{
  await open(page);
  const chart=matrix(page,"weekday-hour"), region=chart.locator('[data-slot="scroll-container"]');
  await region.scrollIntoViewIfNeeded();
  await chart.locator('[data-row-id="weekday-4"][data-column-id="hour-6"]').hover();
  const heading=chart.locator('tbody th[data-active="true"]');
  await expect(heading).toContainText("周四");
  await page.mouse.wheel(260,0);
  await expect.poll(()=>region.evaluate(node=>node.scrollLeft)).toBeGreaterThan(0);
  await page.waitForTimeout(300);
  const facts=await heading.evaluate(node=>({text:node.textContent,background:getComputedStyle(node).backgroundColor,tint:getComputedStyle(node).backgroundImage,width:node.getBoundingClientRect().width,hit:document.elementFromPoint(node.getBoundingClientRect().left+node.getBoundingClientRect().width/2,node.getBoundingClientRect().top+node.getBoundingClientRect().height/2)?.closest("th")===node}));
  await record("sticky-hover-scroll",facts);
  await chart.screenshot({path:`${evidence}/sticky-hover-scroll.png`});
  expect(facts.background).toMatch(/^rgb\(/);
  expect(facts.tint).toContain("linear-gradient");
  expect(facts.hit).toBe(true);
});

test("quantity legend uses compact small medium large hints with unchanged values and colors",async({page})=>{
  await open(page);
  const chart=matrix(page,"course-count"), legend=chart.locator('[data-slot="legend"]');
  await legend.scrollIntoViewIfNeeded();
  const symbols=await legend.locator("li").evaluateAll(nodes=>nodes.map(node=>({value:node.getAttribute("aria-label"),diameter:node.querySelector("circle")!.getBoundingClientRect().width,height:node.getBoundingClientRect().height,fill:getComputedStyle(node.querySelector("circle")!).fill})));
  await record("legend-hints",symbols);
  expect(symbols.map(symbol=>symbol.value)).toEqual(["25","50","100"]);
  expect(symbols.every((symbol,index)=>symbol.diameter>0&&symbol.diameter<=16.01&&(index===0||symbol.diameter>symbols[index-1]!.diameter))).toBe(true);
  expect(symbols.every(symbol=>symbol.height>=24&&symbol.height<=25)).toBe(true);
  await chart.screenshot({path:`${evidence}/compact-legend.png`});
});
