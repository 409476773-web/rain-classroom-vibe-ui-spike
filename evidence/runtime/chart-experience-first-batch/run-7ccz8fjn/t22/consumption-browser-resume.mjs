import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync,readFileSync,writeFileSync } from "node:fs";
import { dirname,join,resolve } from "node:path";
import { fileURLToPath,pathToFileURL } from "node:url";
import { spawn,spawnSync } from "node:child_process";
import { chromium,expect } from "@playwright/test";
import { assertDownloadClosure,exportedDownloads,verifyChartVariants } from "file:///Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/scripts/verify-chart-variant-consumption.mjs";
import { chinaConsumptionCases } from "file:///Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/scripts/chart-china-consumption-cases.mjs";

const workspace="/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2";
const evidence=resolve(workspace,process.argv[2]??"evidence/runtime/chart-business-expansion/consumption");
const port=Number(process.argv[3]??5186);
const put=(path,text)=>{mkdirSync(dirname(path),{recursive:true});writeFileSync(path,text);};
const json=path=>JSON.parse(readFileSync(path,"utf8"));
const hash=source=>createHash("sha256").update(source).digest("hex");
const facts=json("/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2/evidence/runtime/chart-experience-first-batch/run-7ccz8fjn/t22/consumption/first-attempt-facts.json");
delete facts.error;facts.status="running";facts.resumedFrom="../first-attempt-facts.json";facts.priorExitCode=1;facts.browserResume=true;facts.ownerVerifierSha256="ad78a9376318cf6e48b8dc1244ab08320c5d60ccc8e20b26a6f98af456f5b596";
let server,browser;
try {
const registry=json(join(workspace,"registry/charts.json"));
  for (const item of registry.items) {
    const paths=[...new Set([...registry.shared.files,...item.files])];
    assertDownloadClosure(Object.fromEntries(paths.map(path=>[path,readFileSync(join(workspace,path),"utf8")])),item.name);
  }
  facts.registryClosureCount=registry.items.length;
const host=facts.host;
const states=["normal","zero","missing","long","single","invalid","empty"];
const minis=["line","area","bar","pie","ring"].flatMap(id=>["compact","comfortable"].flatMap(miniSize=>(["pie","ring"].includes(id)?[3,5]:[3]).map(seriesCount=>({id,miniSize,seriesCount,recipe:"monochrome-blue",state:"normal",size:"mini",revision:2}))));
const defaultExamples=[
    ...["line","area","composed"].map(id=>({name:`default-${id}-missing`,settings:{id,recipe:"monochrome-blue",state:"missing",size:"standard",revision:0}})),
    ...["line","area"].flatMap(id=>["compact","comfortable"].map(miniSize=>({name:`default-mini-${id}-${miniSize}-missing`,settings:{id,miniSize,recipe:"monochrome-blue",state:"missing",size:"mini",revision:0}}))),
    {name:"default-composed-all-missing",settings:{id:"composed",recipe:"monochrome-blue",state:"missing",size:"standard",revision:2}},
    {name:"default-mini-area-comfortable-all-missing",settings:{id:"area",miniSize:"comfortable",recipe:"monochrome-blue",state:"missing",size:"mini",revision:2}},
    {name:"default-sunburst-keyboard",settings:{id:"sunburst",recipe:"monochrome-blue",state:"normal",size:"standard",revision:0}},
    {name:"default-sunburst-long-keyboard",settings:{id:"sunburst",recipe:"monochrome-blue",state:"long",size:"standard",revision:0}},
    {name:"matrix-single-page",settings:{id:"matrix",recipe:"monochrome-blue",state:"normal",matrixSize:12,descending:true,revision:0}},
  ];
const samples=[
    ...states.map(state=>({name:`business-${state}`,settings:{recipe:"monochrome-blue",state,revision:0,descending:false,many:false,filter:false}})),
    ...minis.map(settings=>({name:`mini-${settings.id}-${settings.miniSize}-${settings.seriesCount}`,settings})),
    ...["semester","colleges","knowledge","period","version","score"].map(fixtureId=>({name:`category-${fixtureId}`,settings:{fixtureId,recipe:"monochrome-blue",state:"normal",revision:2,replay:0,descending:false}})),
    ...states.map(state=>({name:`category-all-${state}`,settings:{fixtureId:"all",recipe:"monochrome-blue",state,revision:2,replay:0,descending:true}})),
    ...["elements","knowledge","courses","practice"].map(fixtureId=>({name:`network-${fixtureId}`,settings:{fixtureId,recipe:"monochrome-blue",state:"normal",revision:0,relation:"all"}})),
    ...["normal","empty","single","long","invalid"].map(state=>({name:`network-all-${state}`,settings:{fixtureId:"all",recipe:"monochrome-blue",state,revision:0,relation:"all"}})),
    {name:"network-filtered-courses",settings:{fixtureId:"courses",recipe:"monochrome-blue",state:"normal",revision:0,relation:"prerequisite"}},
    ...["elements","knowledge","courses","practice"].map(fixtureId=>({name:`network-${fixtureId}-structured`,settings:{fixtureId,recipe:"category-wide",state:"normal",revision:2,relation:"all",variant:"structured"}})),
    {name:"network-all-long-structured",settings:{fixtureId:"all",recipe:"category-near",state:"long",revision:2,relation:"all",variant:"structured"}},
    {name:"network-filtered-courses-structured",settings:{fixtureId:"courses",recipe:"monochrome-blue",state:"normal",revision:0,relation:"supports",variant:"structured"}},
    ...chinaConsumptionCases,
    ...defaultExamples,
  ];
server=spawn(process.execPath,[join(host,"node_modules/vite/bin/vite.js"),"preview","--outDir","dist-business","--host","127.0.0.1","--port",String(port),"--strictPort"],{cwd:host,stdio:"pipe"});
  let serverLog="";server.stdout.on("data",chunk=>serverLog+=chunk);server.stderr.on("data",chunk=>serverLog+=chunk);
  await expect.poll(async()=>{try{return (await fetch(`http://127.0.0.1:${port}/business-normal.html`)).status;}catch{return 0;}},{timeout:15000}).toBe(200);
  browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:"reduce"});page.on("pageerror",error=>facts.errors.push(error.message));
  
for (const sample of defaultExamples.filter(sample=>sample.settings.state==="missing")) {
    await page.goto(`http://127.0.0.1:${port}/${sample.name}.html`);
    await page.getByText("查看精确数据",{exact:true}).focus();await page.keyboard.press("Enter");
    const rows=page.locator(".rain-chart-data tbody tr");
    const readings=[];
    for(const revision of [sample.settings.revision,sample.settings.revision+1]) {
      if(revision!==sample.settings.revision) await page.getByRole("button",{name:"更新数据",exact:true}).click();
      await expect(rows).toHaveCount(24);
      await expect(rows.last()).toContainText("缺测");
      const values=await rows.locator("td").allTextContents();
      expect(values.some(value=>/null|undefined|NaN|Infinity/.test(value))).toBe(false);
      if(revision%3===2) {
        expect(values.every(value=>value==="缺测")).toBe(true);
        await expect(page.getByRole("status")).toContainText("缺测");
        await expect(page.locator(".rain-chart-plot svg,.rain-chart-mini-plot svg")).toHaveCount(0);
      } else {
        const zero=await rows.nth(2).locator("td").allTextContents();
        expect(zero.slice(0,2)).toEqual(sample.settings.size==="mini"?["0"]:["0","0"]);
        if(sample.settings.id==="composed") expect(zero[2]).toBe("不适用");
        else if(sample.settings.size!=="mini") {
          const returned=values.filter((_,index)=>index%3===2);
          expect(returned.filter(value=>value==="缺测")).toHaveLength(5);expect(returned[2]).toBe("0");
        }
        const chart=page.locator(`[data-rain-id="ui-chart-${sample.settings.id}"]`);
        await expect(chart.locator("svg")).toHaveCount(1);
        const paths=await chart.locator("svg path[d]").evaluateAll(paths=>paths.map(path=>path.getAttribute("d")??""));
        expect(paths.some(path=>(path.match(/M/g)??[]).length>1)).toBe(true);
        expect(paths.some(path=>/NaN|Infinity|undefined/.test(path))).toBe(false);
        const box=await chart.boundingBox(),mini=sample.settings.size==="mini",padding=mini?(sample.settings.miniSize==="comfortable"?3:2):58,right=mini?padding:sample.settings.id==="composed"?58:24;
        await page.mouse.move(box.x+padding+(box.width-padding-right)/23,box.y+Math.min(box.height/2,100));
        await expect(page.locator(".rain-chart-tooltip")).toContainText("缺测");
        await expect(page.locator(".rain-chart-tooltip")).not.toContainText("不适用");
        await page.mouse.move(0,0);
      }
      if(sample.settings.size==="mini") await expect(page.locator(".rain-chart-mini-row")).toContainText("缺测");
      readings.push({revision,values});
    }
    await page.setViewportSize({width:390,height:1000});
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.screenshot({path:join(evidence,`${sample.name}-narrow.png`),fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    facts.checks.push({name:sample.name,settings:sample.settings,readings,render:"passed",narrow:"passed",missingZeroAndRate:"passed",update:"passed"});
  }
  for (const sample of defaultExamples.filter(sample=>sample.settings.id==="sunburst")) {
    await page.goto(`http://127.0.0.1:${port}/${sample.name}.html`);
    const long=sample.settings.state==="long",suffix=long?" · 综合课程学习情况":"";
    const layer=page.getByRole("group",{name:"当前层级，可用键盘查看下级",exact:true});
    const drill=layer.getByRole("button",{name:`查看基础课程${suffix}`,exact:true});
    await drill.focus();await page.keyboard.press("Enter");
    const breadcrumb=page.getByRole("navigation",{name:"学习内容层级",exact:true});
    const back=breadcrumb.getByRole("link",{name:"返回学习内容",exact:true});
    await expect(breadcrumb.getByText(`基础课程${suffix}`,{exact:true})).toHaveAttribute("aria-current","page");
    await expect(back).toBeFocused();
    if(long) {
      const video=layer.getByRole("button",{name:"查看视频",exact:true});
      await video.focus();await page.keyboard.press("Enter");
      await expect(breadcrumb.getByText("视频",{exact:true})).toHaveAttribute("aria-current","page");
      await expect(breadcrumb.locator("a:focus")).toHaveCount(1);
      await expect(layer.getByRole("button")).toHaveCount(0);
      const parent=breadcrumb.getByRole("link",{name:`返回基础课程${suffix}`,exact:true});
      await parent.focus();await page.keyboard.press("Enter");
      await expect(video).toBeFocused();
    } else { await expect(layer.getByRole("button")).toHaveCount(0);await expect(layer).toContainText("视频"); }
    await page.getByText("查看精确数据",{exact:true}).focus();await page.keyboard.press("Enter");
    await expect(page.getByRole("table")).toContainText("学习内容 / 基础课程");
    await back.focus();await page.keyboard.press("Enter");
    await expect(page.getByRole("heading",{name:"学习内容",exact:true})).toBeVisible();await expect(drill).toBeFocused();
    const advanced=layer.getByRole("button",{name:`查看进阶课程${suffix}`,exact:true});
    await advanced.focus();await page.keyboard.press("Space");
    await expect(breadcrumb.getByText(`进阶课程${suffix}`,{exact:true})).toHaveAttribute("aria-current","page");
    const before=await page.getByRole("table").locator("td").allTextContents();
    await page.getByRole("button",{name:"更新数据",exact:true}).click();
    await expect(breadcrumb.getByText(`进阶课程${suffix}`,{exact:true})).toHaveAttribute("aria-current","page");
    await expect.poll(()=>page.getByRole("table").locator("td").allTextContents()).not.toEqual(before);
    if(!long) await expect(page.getByRole("table")).toContainText("132");
    await back.focus();await page.keyboard.press("Enter");await expect(advanced).toBeFocused();
    await page.setViewportSize({width:390,height:1000});
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.screenshot({path:join(evidence,`${sample.name}-narrow.png`),fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    facts.checks.push({name:sample.name,settings:sample.settings,render:"passed",narrow:"passed",keyboardDrillAndReturn:"passed",ancestorReturn:long?"passed":"not-applicable",focusAndUpdate:"passed"});
  }
  for (const sample of defaultExamples.filter(sample=>sample.settings.id==="matrix")) {
    await page.goto(`http://127.0.0.1:${port}/${sample.name}.html`);
    await expect(page.getByRole("heading",{level:1,name:"分类矩阵",exact:true})).toBeVisible();
    await expect(page.locator('[data-rain-id="ui-chart-matrix"]')).toHaveCount(5);
    await expect(page.getByRole("table")).toHaveCount(5);
    await expect(page.locator(".rain-business-mini-gallery")).toHaveCount(0);
    const similarity=page.locator('[data-matrix-example="course-similarity"]');
    await expect(similarity.locator('[data-slot="cell"]')).toHaveCount(144);
    const versions=page.locator('[data-matrix-example="course-version"]');
    await expect(versions.getByRole("cell",{name:"未设学期",exact:true})).toHaveAttribute("data-state","missing");
    await expect(versions.getByRole("cell",{name:"无该课程",exact:true})).toHaveAttribute("data-state","not-applicable");
    const quantities=page.locator('[data-matrix-example="course-count"]');
    await expect(quantities.locator('[data-slot="cell"][data-state="zero"]')).toHaveCount(1);
    const region=quantities.locator('[data-slot="scroll-container"]');
    const active=quantities.locator('[data-slot="cell"][data-active="true"]');
    await page.mouse.move(0,0);
    await region.focus();
    await expect(active).toHaveAttribute("data-row-id","category-6");
    await expect(active).toHaveAttribute("data-column-id","college-6");
    await page.keyboard.press("ArrowRight");
    await expect(active).toHaveAttribute("data-column-id","college-5");
    await page.keyboard.press("ArrowDown");
    await expect(active).toHaveAttribute("data-row-id","category-5");
    await page.keyboard.press("Home");await expect(active).toHaveAttribute("data-column-id","college-6");
    await page.keyboard.press("End");await expect(active).toHaveAttribute("data-column-id","college-1");
    await expect(quantities.getByRole("tooltip")).toContainText("44");
    await page.keyboard.press("Escape");await expect(quantities.getByRole("tooltip")).toHaveCount(0);
    await page.getByRole("button",{name:"更新数据",exact:true}).click();
    await expect(quantities.locator('[data-row-id="category-5"][data-column-id="college-1"]')).toHaveAccessibleName("47");
    await page.getByRole("button",{name:"4×4",exact:true}).click();
    await expect(similarity.locator('[data-slot="cell"]')).toHaveCount(16);
    await page.setViewportSize({width:390,height:1000});
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.screenshot({path:join(evidence,`${sample.name}-narrow.png`),fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    facts.checks.push({name:sample.name,settings:sample.settings,render:"passed",narrow:"passed",keyboardAndTable:"passed",updateAndSize:"passed"});
  }
  for (const sample of samples.filter(sample=>sample.name.startsWith("category-"))) {
    await page.goto(`http://127.0.0.1:${port}/${sample.name}.html`);
    const count=sample.settings.fixtureId==="all"?6:1;
    await expect(page.locator("[data-category-example]")).toHaveCount(count);
    if (["empty","invalid"].includes(sample.settings.state)) await expect(page.locator(".rain-category-plot > div > svg")).toHaveCount(0);
    else {
      await expect(page.locator(".rain-category-plot > div > svg")).toHaveCount(count);
      expect(await page.locator("svg path").evaluateAll(paths=>paths.some(path=>/NaN|Infinity|undefined/.test(path.getAttribute("d")??"")))).toBe(false);
      await page.locator(".rain-category-data summary").first().click();
      await expect(page.getByRole("table").first()).toBeVisible();
      if(sample.settings.fixtureId==="period") {
        await expect(page.getByRole("table")).toContainText("2027-01-03");
        await expect(page.getByRole("table")).toContainText("缺测");
      }
      await page.getByRole("button",{name:"更新数据",exact:true}).click();
      await expect(page.locator(".rain-category-plot > div > svg")).toHaveCount(count);
    }
    await page.setViewportSize({width:390,height:1000});
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.setViewportSize({width:1440,height:1000});
    facts.checks.push({name:sample.name,settings:sample.settings,render:"passed",narrow:"passed"});
  }
  for (const sample of samples.filter(sample=>sample.name.startsWith("network-"))) {
    await page.goto(`http://127.0.0.1:${port}/${sample.name}.html`);
    const count=sample.settings.fixtureId==="all"?4:1;
    await expect(page.locator("[data-network-example]")).toHaveCount(count);
    if (sample.settings.state==="invalid") {
      await expect(page.getByRole("alert")).toHaveCount(count);
      await expect(page.locator(".rain-network__svg")).toHaveCount(0);
    } else if (sample.settings.state==="empty") {
      await expect(page.locator(".rain-network__svg")).toHaveCount(0);
      await expect(page.locator('.rain-network [role="status"]')).toHaveCount(count);
    } else {
      await expect(page.locator(".rain-network__svg")).toHaveCount(count);
      for(const chart of await page.locator(".rain-network").all()) await expect(chart).toHaveAttribute("data-variant",sample.settings.variant??"glow");
      expect(await page.locator("path[data-network-edge]").evaluateAll(paths=>paths.every(path=>!/NaN|Infinity|undefined/.test(path.getAttribute("d")??"")))).toBe(true);
      const first=page.locator(".rain-network__nodes button").first();
      const id=await first.getAttribute("data-network-select");
      await first.focus();await page.keyboard.press("Enter");
      await expect(page.getByRole("region",{name:"节点详情"})).toHaveAttribute("data-selected-node",id);
      await page.getByRole("button",{name:"更新数据",exact:true}).click();
      await expect(page.getByRole("region",{name:"节点详情"})).toHaveAttribute("data-selected-node",id);
      await page.locator(".rain-network__data summary").first().click();
      await expect(page.getByRole("table").first()).toBeVisible();
    }
    await page.setViewportSize({width:390,height:1000});
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.screenshot({path:join(evidence,`${sample.name}-narrow.png`),fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    facts.checks.push({name:sample.name,settings:sample.settings,render:"passed",narrow:"passed",selectionAndUpdate:["empty","invalid"].includes(sample.settings.state)?"not-applicable":"passed"});
  }
  for (const sample of chinaConsumptionCases) {
    await page.goto(`http://127.0.0.1:${port}/${sample.name}.html`);
    const map=page.locator(".rain-china-example");
    await expect(map).toHaveCount(1);
    await expect(map).toHaveAttribute("data-china-layer",sample.settings.provinceId??"national");
    const paths=map.locator(".choropleth-features path[data-feature-id]");
    if (sample.configurationError || sample.settings.state==="invalid") {
      await expect(map.getByRole("alert")).toContainText(sample.configurationError?"无效地区配置":"已拒绝无效统计数据");
      await expect(paths).toHaveCount(0);
    } else {
      if (sample.settings.state==="load-error") {
        await expect(map.getByRole("alert")).toContainText("边界加载失败");
        await expect(paths).toHaveCount(0);
        await map.getByRole("button",{name:"重试加载",exact:true}).click();
      }
      await expect(paths).toHaveCount(sample.count);
      expect(await paths.evaluateAll(elements=>elements.every(element=>!/NaN|Infinity|undefined/.test(element.getAttribute("d")??"")))).toBe(true);
      await map.getByText("查看精确数据",{exact:true}).click();
      await expect(map.locator("[data-china-row]")).toHaveCount(sample.count);
      const values=await map.locator('[data-china-row] td:last-child').allTextContents();
      if (sample.settings.state==="zero") { expect(values.every(value=>value==="0 人")).toBe(true); await expect(map.locator(".rain-china-scale")).toContainText("全部为 0"); }
      else if (sample.settings.state==="missing") {
        expect(values.every(value=>value==="无数据")).toBe(true);
        const scale=map.getByRole("group",{name:/暂无有效数值/});
        await expect(scale).toBeVisible();
        await expect(scale).not.toHaveAccessibleName(/0\s*人|0\s*到\s*0/);
        await expect(scale).not.toContainText("全部为 0");
      }
      else { expect(values).toContain("0 人"); expect(values).toContain("无数据"); }
      if (sample.settings.state==="unmatched") await expect(map.getByRole("alert")).toContainText("999999");
      if (sample.detail) {
        await expect(map.getByRole("region",{name:"地区样本详情"})).toHaveAttribute("data-selected-region",sample.settings.selectedId);
        await expect(map.getByRole("region",{name:"地区样本详情"})).toContainText(sample.detail);
        await expect(map.locator(`path[data-feature-id="${sample.settings.selectedId}"]`)).toHaveAttribute("data-selected","true");
      }
      if (sample.name==="china-national") {
        await map.getByRole("combobox",{name:"地图地区",exact:true}).click();
        await page.getByRole("option",{name:"广东省",exact:true}).click();
        await expect(map).toHaveAttribute("data-china-layer","440000");
        await expect(paths).toHaveCount(21);
        await map.getByRole("combobox",{name:"地图地区",exact:true}).click();
        const city=page.getByRole("option",{name:"广州市",exact:true});
        await page.getByRole("combobox",{name:"搜索选项"}).fill("广州市"); await page.keyboard.press("Enter");
        await expect(map.getByRole("region",{name:"地区样本详情"})).toHaveAttribute("data-selected-region","440100");
        await page.getByRole("button",{name:"更新数据",exact:true}).click();
        await expect(map.getByRole("region",{name:"地区样本详情"})).toHaveAttribute("data-selected-region","440100");
        await map.getByRole("combobox",{name:"地图地区",exact:true}).click();
        await page.getByRole("option",{name:"全国",exact:true}).click();
        await expect(map).toHaveAttribute("data-china-layer","national");
        await expect(paths).toHaveCount(34);
      }
    }
    await page.setViewportSize({width:390,height:1000});
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    if (sample.count>0) {
      for (const width of [390,1440]) {
        await page.setViewportSize({width,height:1000});
        const bounds=await map.locator(".rain-china-map-controls").evaluate(element=>{
          const controls=element.getBoundingClientRect(),plot=element.closest('[data-rain-id="ui-chart-choropleth"]').getBoundingClientRect();
          return {left:controls.left-plot.left,top:controls.top-plot.top,right:controls.right-plot.left,bottom:controls.bottom-plot.top,width:plot.width,height:plot.height};
        });
        expect(bounds.left,`${sample.name} ${width}px controls left`).toBeGreaterThanOrEqual(-1);
        expect(bounds.top,`${sample.name} ${width}px controls top`).toBeGreaterThanOrEqual(-1);
        expect(bounds.right,`${sample.name} ${width}px controls right`).toBeLessThanOrEqual(bounds.width+1);
        expect(bounds.bottom,`${sample.name} ${width}px controls bottom`).toBeLessThanOrEqual(bounds.height+1);
      }
      await page.setViewportSize({width:390,height:1000});
    }
    if (["china-national","china-guangdong","china-direct-county"].includes(sample.name)) await page.screenshot({path:join(evidence,`${sample.name}-narrow.png`),fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    facts.checks.push({name:sample.name,settings:sample.settings,count:sample.count,render:"passed",narrow:"passed",retry:sample.settings.state==="load-error"?"passed":"not-applicable",navigationAndUpdate:sample.name==="china-national"?"passed":"not-applicable"});
  }
  await page.goto(`http://127.0.0.1:${port}/business-normal.html`);await page.getByRole("button",{name:"更新数据",exact:true}).click();
  await expect(page.locator('.rain-business-table tbody tr').first().locator('.rain-data-bar')).toHaveAttribute("data-fraction","0.75");
  const businessCss=await page.locator('.rain-business-table tbody tr').first().locator('[data-slot="cell"]').first().evaluate(element=>{const style=getComputedStyle(element);return {height:element.getBoundingClientRect().height,fontSize:style.fontSize,lineHeight:style.lineHeight,fontFamily:style.fontFamily};});
  expect(businessCss.height).toBe(56);expect(businessCss.fontSize).toBe("13px");expect(businessCss.lineHeight).toBe("20px");expect(businessCss.fontFamily).toContain("PingFang SC");
  facts.businessCss=businessCss;
  const dataReadingCss=await page.locator('.rain-business-cell-value .rain-business-reading').first().evaluate(element=>{const style=getComputedStyle(element);return {fontSize:style.fontSize,lineHeight:style.lineHeight,fontFamily:style.fontFamily,text:element.textContent};});
  expect(dataReadingCss.fontSize).toBe("13px");expect(dataReadingCss.lineHeight).toBe("20px");expect(dataReadingCss.fontFamily).toContain("LINE Seed");
  facts.dataReadingCss=dataReadingCss;
  const footerReading=page.locator('.rain-business-comfortable-group [data-mini-kind="arc"][data-size="comfortable"] [data-primary-reading]');
  await expect(footerReading).toHaveText("24%");
  const progressReadingCss=await page.locator('[data-mini-reading] [data-primary-reading]').evaluateAll(elements=>elements.map(element=>{const style=getComputedStyle(element);return {kind:element.closest('[data-mini-kind]').dataset.miniKind,fontSize:style.fontSize,lineHeight:style.lineHeight,fontFamily:style.fontFamily,text:element.textContent};}));
  for(const reading of progressReadingCss){expect(reading.fontSize).toBe("13px");expect(reading.lineHeight).toBe("20px");expect(reading.fontFamily).toContain("LINE Seed");}
  facts.progressReadingCss=progressReadingCss;
  const arcBounds=await page.locator('[data-mini-kind="arc"] .rain-business-mini-slot').evaluateAll(elements=>elements.map(element=>{const slot=element.getBoundingClientRect();const svg=[...element.querySelectorAll('svg')].find(svg=>svg.querySelector('path')),matrix=svg?.getScreenCTM();return {size:element.parentElement.dataset.size,width:slot.width,height:slot.height,scaleX:matrix?Math.hypot(matrix.a,matrix.b):null,scaleY:matrix?Math.hypot(matrix.c,matrix.d):null,paths:[...element.querySelectorAll('svg path')].map(path=>{const box=path.getBoundingClientRect();return {left:box.left-slot.left,top:box.top-slot.top,right:box.right-slot.left,bottom:box.bottom-slot.top,width:box.width,height:box.height};}).filter(box=>box.width>0&&box.height>0)};}));
  for(const arc of arcBounds){if(arc.scaleX!==null)expect(Math.abs(arc.scaleX-arc.scaleY)).toBeLessThan(.001);for(const path of arc.paths){expect(path.left).toBeGreaterThanOrEqual(-1);expect(path.top).toBeGreaterThanOrEqual(-1);expect(path.right).toBeLessThanOrEqual(arc.width+1);expect(path.bottom).toBeLessThanOrEqual(arc.height+1);}}
  facts.arcBounds=arcBounds;
  await page.setViewportSize({width:390,height:1000});await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  facts.businessNarrow=await page.locator('.rain-business-table-scroll').evaluate(element=>({viewport:innerWidth,pageWidth:document.documentElement.scrollWidth,overflowX:getComputedStyle(element).overflowX,width:element.getBoundingClientRect().width,scrollWidth:element.scrollWidth}));
  expect(facts.businessNarrow.overflowX).toBe("auto");
  await page.screenshot({path:join(evidence,"independent-narrow.png"),fullPage:true});
  for (const sample of facts.downloads) for (const file of sample.files) if (!["main.tsx","index.html"].includes(file.path)) assert.equal(hash(readFileSync(join(workspace,"apps/playground/src/docs/components",file.path))),file.sha256,`${sample.name}: source changed during consumption: ${file.path}`);
  assert.equal(hash(readFileSync(join(workspace,"apps/playground/src/docs/components/chart-example-source.tsx"))),facts.exporterSha256,"Download exporter changed during consumption");
  assert.equal(hash(readFileSync(join(workspace,"apps/playground/src/docs/components/chart-china-source.tsx"))),facts.chinaExporterSha256,"China download exporter changed during consumption");
  assert.deepEqual(facts.errors,[]);facts.status="passed";put(join(evidence,"server.log"),serverLog);
  console.log(`Passed ${states.length} business states, ${minis.length} mini, 13 category, ${samples.filter(sample=>sample.name.startsWith("network-")).length} network, ${chinaConsumptionCases.length} China and ${defaultExamples.length} default/matrix downloads, independent update and narrow layout; ${evidence}`);
} catch(error) {facts.status="failed";facts.error=String(error);throw error;}
finally {if(browser)await browser.close();if(server)server.kill();put(join(evidence,"facts.json"),JSON.stringify(facts,null,2));}
