import { test,expect } from '@playwright/test';
import { mkdir,writeFile } from 'node:fs/promises';
test('normal bar updates and sorting keep the same keyed geometry and continue through intermediate values',async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'}); await page.goto('/#chart-business');
  const bar=page.locator('[data-business="horizontal"] g[class^="bar-series-"] rect').first(); await expect(bar).toBeVisible(); await page.waitForTimeout(1800);
  await bar.evaluate(node=>node.setAttribute('data-test-stable','first'));
  const start=await bar.evaluate(node=>(node as SVGGraphicsElement).getBBox().width); await page.getByRole('button',{name:'更新数据',exact:true}).click();
  await page.waitForTimeout(160); const middle=await bar.evaluate(node=>(node as SVGGraphicsElement).getBBox().width); await page.waitForTimeout(1200); const end=await bar.evaluate(node=>(node as SVGGraphicsElement).getBBox().width);
  expect(middle).toBeGreaterThan(start); expect(middle).toBeLessThan(end); expect(end/start).toBeCloseTo(75/25,1);
  await page.getByRole('button',{name:'更新数据',exact:true}).click(); await page.waitForTimeout(160);
  const descending=await bar.evaluate(node=>(node as SVGGraphicsElement).getBBox().width); expect(descending).toBeLessThan(end); expect(descending).toBeGreaterThan(start*2);
  await page.waitForTimeout(1200); expect((await bar.evaluate(node=>(node as SVGGraphicsElement).getBBox().width))/start).toBeCloseTo(50/25,1);
  await page.getByRole('button',{name:'按数量排序'}).click(); await expect(page.locator('[data-business="horizontal"] [data-test-stable="first"]')).toHaveCount(1);
});
test('horizontal stacked segments retain distinct origins through entry and updates',async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'}); await page.goto('/#chart-business');
  const stack=page.locator('[data-business="horizontal-stacked"]');
  const rects=stack.locator('g[class^="bar-series-"] rect'); await expect(rects).toHaveCount(15); await page.waitForTimeout(1800);
  const geometry=()=>rects.evaluateAll(nodes=>[0,5,10].map(index=>{const box=nodes[index]!.getBoundingClientRect();return {x:box.x-nodes[0]!.getBoundingClientRect().x,width:box.width};}));
  const before=await geometry(); expect(before[1]!.x).toBeCloseTo(before[0]!.x+before[0]!.width,0); expect(before[2]!.x).toBeCloseTo(before[1]!.x+before[1]!.width,0);
  await page.getByRole('button',{name:'更新数据',exact:true}).click(); await page.waitForTimeout(160); const middle=await geometry();
  expect(middle[0]!.width).toBeGreaterThan(before[0]!.width); expect(middle[1]!.x).toBeGreaterThan(before[1]!.x);
  expect(Math.abs(middle[1]!.x-middle[0]!.width)).toBeLessThan(2); expect(Math.abs(middle[2]!.x-middle[1]!.x-middle[1]!.width)).toBeLessThan(2);
  await page.waitForTimeout(1300); const after=await geometry(); expect(after[0]!.width).toBeGreaterThan(middle[0]!.width);
  expect(after[1]!.x).toBeCloseTo(after[0]!.width,0); expect(after[2]!.x).toBeCloseTo(after[1]!.x+after[1]!.width,0);
});
for (const size of ['compact','comfortable']) for (const kind of ['pie','arc']) test(`${size} mini ${kind} updates keep the mounted path and animate through intermediate geometry`,async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'}); await page.goto('/#chart-business');
  const mini=page.locator(`.rain-business-mini-gallery [data-mini-kind="${kind}"][data-size="${size}"]`);
  const path=kind === 'pie' ? mini.locator('path[pointer-events="none"]').first() : mini.locator('path').last();
  await mini.scrollIntoViewIfNeeded(); await expect(path).toBeVisible(); await page.waitForTimeout(1100);
  await path.evaluate(node=>node.setAttribute('data-test-owned-sector','first')); const initial=await path.getAttribute('d');
  const started=Date.now(); await page.getByRole('button',{name:'更新数据',exact:true}).evaluate(node=>(node as HTMLButtonElement).click());
  await page.waitForTimeout(120); const middle=await path.getAttribute('d');
  await expect.poll(async()=>{const previous=await path.getAttribute('d');await page.waitForTimeout(120);return previous===await path.getAttribute('d');},{timeout:4000}).toBe(true);
  const elapsedMs=Date.now()-started, end=await path.getAttribute('d');
  expect(end).not.toBe(initial); expect(middle).not.toBe(initial); expect(middle).not.toBe(end);
  await expect(mini.locator('[data-test-owned-sector="first"]')).toHaveCount(1);
  await page.getByRole('combobox',{name:'业务图表配色'}).selectOption('category-near');
  expect(await path.getAttribute('d')).toBe(end);
  await expect(mini.locator('[data-test-owned-sector="first"]')).toHaveCount(1);
  const evidence=process.env.RAIN_CHART_EXPERIENCE_EVIDENCE_DIR ? `${process.env.RAIN_CHART_EXPERIENCE_EVIDENCE_DIR}/motion` : 'evidence/runtime/chart-demo-data-expansion-2026-10-11/browser-output/chart-business-motion.spec'; await mkdir(evidence,{recursive:true});
  await writeFile(`${evidence}/${kind}-${size}.json`,JSON.stringify({kind,size,elapsedUntilStableMs:elapsedMs,intermediateGeometry:true,mountedPathPreserved:true},null,2));
});

for (const size of ['compact','comfortable']) test(`${size} mini data bar follows 25 to 75 to 50 and reduced motion reaches terminal geometry immediately`,async({page})=>{
  await page.emulateMedia({reducedMotion:'no-preference'}); await page.goto('/#chart-business');
  const mini=page.locator(`.rain-business-mini-gallery [data-mini-kind="quantity"][data-size="${size}"]`);
  const fill=mini.locator('.rain-data-bar__fill');
  await mini.scrollIntoViewIfNeeded(); await expect(fill).toBeVisible(); await page.waitForTimeout(800);
  await fill.evaluate(node=>node.setAttribute('data-test-stable-fill','true'));
  const width=()=>fill.evaluate(node=>node.getBoundingClientRect().width);
  const first=await width();
  await page.getByRole('button',{name:'更新数据',exact:true}).evaluate(node=>(node as HTMLButtonElement).click());
  await page.waitForTimeout(120); const ascending=await width(); await page.waitForTimeout(650); const second=await width();
  expect(ascending).toBeGreaterThan(first); expect(ascending).toBeLessThan(second); expect(second/first).toBeCloseTo(3,1);
  await page.getByRole('button',{name:'更新数据',exact:true}).evaluate(node=>(node as HTMLButtonElement).click());
  await page.waitForTimeout(120); const descending=await width(); await page.waitForTimeout(650); const third=await width();
  expect(descending).toBeLessThan(second); expect(descending).toBeGreaterThan(third); expect(third/first).toBeCloseTo(2,1);
  await expect(fill).toHaveAttribute('data-test-stable-fill','true');
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.reload(); await mini.scrollIntoViewIfNeeded(); await expect(fill).toBeVisible();
  await page.getByRole('button',{name:'更新数据',exact:true}).evaluate(node=>(node as HTMLButtonElement).click());
  await expect(mini.locator('.rain-data-bar')).toHaveAttribute('data-fraction','0.75');
  const immediate=await width(); await page.waitForTimeout(60);
  expect(await width()).toBeCloseTo(immediate,2); expect(immediate/first).toBeCloseTo(3,1);
});

test('fresh reduced motion commits both sizes of pie and progress directly to the new geometry',async({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('/#chart-business');
  const paths=[];
  for(const size of ['compact','comfortable'])for(const kind of ['pie','arc']){
    const mini=page.locator(`.rain-business-mini-gallery [data-mini-kind="${kind}"][data-size="${size}"]`);
    const path=kind === 'pie' ? mini.locator('path[pointer-events="none"]').first() : mini.locator('path').last();
    await expect(path).toBeAttached(); paths.push(path);
  }
  const before=await Promise.all(paths.map(path=>path.getAttribute('d')));
  await page.getByRole('button',{name:'更新数据',exact:true}).click();
  await expect(page.getByRole('status').filter({hasText:'更新 1 次'})).toBeVisible();
  const immediate=await Promise.all(paths.map(path=>path.getAttribute('d')));
  await page.waitForTimeout(60);
  expect(await Promise.all(paths.map(path=>path.getAttribute('d')))).toEqual(immediate);
  immediate.forEach((value,index)=>expect(value).not.toBe(before[index]));
});
