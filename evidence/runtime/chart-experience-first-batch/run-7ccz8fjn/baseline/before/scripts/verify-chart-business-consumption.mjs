import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync,readFileSync,writeFileSync } from "node:fs";
import { dirname,join,resolve } from "node:path";
import { fileURLToPath,pathToFileURL } from "node:url";
import { spawn,spawnSync } from "node:child_process";
import { chromium,expect } from "@playwright/test";
import { assertDownloadClosure,exportedDownloads,verifyChartVariants } from "./verify-chart-variant-consumption.mjs";
import { chinaConsumptionCases } from "./chart-china-consumption-cases.mjs";

const workspace=resolve(dirname(fileURLToPath(import.meta.url)),"..");
const evidence=resolve(workspace,process.argv[2]??"evidence/runtime/chart-business-expansion/consumption");
const port=Number(process.argv[3]??5186);
const put=(path,text)=>{mkdirSync(dirname(path),{recursive:true});writeFileSync(path,text);};
const json=path=>JSON.parse(readFileSync(path,"utf8"));
const hash=source=>createHash("sha256").update(source).digest("hex");
const facts={sourceMode:"isolated copied source and installed dependency cache; not a clean installation",checks:[],errors:[],status:"running"};
let server,browser;
try {
  const registry=json(join(workspace,"registry/charts.json"));
  for (const item of registry.items) {
    const paths=[...new Set([...registry.shared.files,...item.files])];
    assertDownloadClosure(Object.fromEntries(paths.map(path=>[path,readFileSync(join(workspace,path),"utf8")])),item.name);
  }
  const {host}=await verifyChartVariants(join(evidence,"official-variants")); facts.host=host;
  const exported=await exportedDownloads(join(workspace,"apps/playground/src/docs/components"),"chartBusinessFiles");
  const single=await exportedDownloads(join(workspace,"apps/playground/src/docs/components"),"chartExampleFiles");
  const category=await exportedDownloads(join(workspace,"apps/playground/src/docs/components"),"chartCategoryFiles");
  const network=await exportedDownloads(join(workspace,"apps/playground/src/docs/components"),"chartNetworkFiles");
  const china=await exportedDownloads(join(workspace,"apps/playground/src/docs/components"),"chartChinaFiles");
  const states=["normal","zero","missing","long","single","invalid","empty"];
  const minis=["line","area","bar","pie","ring"].flatMap(id=>["compact","comfortable"].flatMap(miniSize=>(["pie","ring"].includes(id)?[3,5]:[3]).map(seriesCount=>({id,miniSize,seriesCount,recipe:"monochrome-blue",state:"normal",size:"mini",revision:2}))));
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
  ];
  facts.downloads=[];
  for (const sample of samples) {
    const files=sample.name.startsWith("china-")?china.files(sample.settings):sample.name.startsWith("network-")?network.files(sample.settings):sample.name.startsWith("category-")?category.files(sample.settings):sample.name.startsWith("business-")?exported.files(sample.settings):single.files(sample.settings);
    assertDownloadClosure(files,sample.name);
    for (const [path,source] of Object.entries(files)) put(join(host,sample.name,path),source);
    put(join(host,`${sample.name}.html`),files["index.html"].replace('src="/main.tsx"',`src="/${sample.name}/main.tsx"`).replace('</head>','<link rel="stylesheet" href="./consumer.css"></head>'));
    facts.downloads.push({name:sample.name,settings:sample.settings,files:Object.entries(files).map(([path,source])=>({path,sha256:hash(source)}))});
  }
  facts.exporterSha256=exported.exporterSha256;
  facts.chinaExporterSha256=china.exporterSha256;
  put(join(host,"consumer.css"),`@import "tailwindcss" source(none);
@import "@rain-next/foundations/tailwind-theme.css";
@source "./node_modules/@rain-next/ui/src";
${samples.map(sample=>`@source "./${sample.name}";`).join("\n")}
:root { font-family: var(--rain-font-ui); color: var(--rain-color-text-primary); }
`);
  facts.hostCss={path:"consumer.css",sha256:hash(readFileSync(join(host,"consumer.css"))),scanSources:["node_modules/@rain-next/ui/src",...samples.map(sample=>sample.name)],tailwindVersion:json(join(host,"node_modules/tailwindcss/package.json")).version,tailwindViteVersion:json(join(host,"node_modules/@tailwindcss/vite/package.json")).version};
  put(join(host,"business-tsconfig.json"),JSON.stringify({extends:"./tsconfig.json",include:["business-*/**/*.tsx","business-*/**/*.ts","mini-*/**/*.tsx","mini-*/**/*.ts","category-*/**/*.tsx","category-*/**/*.ts","network-*/**/*.tsx","network-*/**/*.ts","china-*/**/*.tsx","china-*/**/*.ts","env.d.ts"]},null,2));
  const compiler=json(join(host,"node_modules/typescript/package.json"));
  const typed=spawnSync(process.execPath,[join(host,"node_modules/typescript",compiler.bin.tsc),"--project","business-tsconfig.json"],{cwd:host,encoding:"utf8"});
  put(join(evidence,"typecheck.log"),typed.stdout+typed.stderr);facts.typecheck={exitCode:typed.status,entries:samples.length,log:"typecheck.log"};assert.equal(typed.status,0,"Business downloads typecheck failed");
  const {build}=await import(pathToFileURL(join(host,"node_modules/vite/dist/node/index.js")).href);
  const {default:tailwindcss}=await import(pathToFileURL(join(host,"node_modules/@tailwindcss/vite/dist/index.mjs")).href);
  await build({root:host,configFile:false,base:"./",oxc:{jsx:{runtime:"automatic"}},plugins:[tailwindcss()],build:{outDir:"dist-business",rolldownOptions:{input:samples.map(sample=>join(host,`${sample.name}.html`))}}});
  facts.build={status:"passed",entries:samples.length,outDir:"dist-business"};
  server=spawn(process.execPath,[join(host,"node_modules/vite/bin/vite.js"),"preview","--outDir","dist-business","--host","127.0.0.1","--port",String(port),"--strictPort"],{cwd:host,stdio:"pipe"});
  let serverLog="";server.stdout.on("data",chunk=>serverLog+=chunk);server.stderr.on("data",chunk=>serverLog+=chunk);
  await expect.poll(async()=>{try{return (await fetch(`http://127.0.0.1:${port}/business-normal.html`)).status;}catch{return 0;}},{timeout:15000}).toBe(200);
  browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:"reduce"});page.on("pageerror",error=>facts.errors.push(error.message));
  for (const state of states) {
    await page.goto(`http://127.0.0.1:${port}/business-${state}.html`);await expect(page.getByRole("heading",{level:1})).toBeVisible();
    if (["invalid","empty"].includes(state)) expect(await page.locator("svg").count()).toBe(0);
    else {
      await expect(page.locator('.rain-business-table tbody tr')).toHaveCount(state==="single"?1:5);
      expect(await page.locator('svg path').evaluateAll(paths=>paths.filter(path=>/NaN|Infinity|undefined/.test(path.getAttribute("d")??"")).length)).toBe(0);
    }
    facts.checks.push({state,render:"passed"});
  }
  for (const settings of minis) {
    const name=`mini-${settings.id}-${settings.miniSize}-${settings.seriesCount}`;
    await page.goto(`http://127.0.0.1:${port}/${name}.html`);
    const slots=page.locator(`[data-mini-kind][data-size="${settings.miniSize}"]`);
    await expect(slots).toHaveCount(settings.id==="pie"?2:settings.id==="ring"?settings.seriesCount:1);
    await expect.poll(()=>slots.evaluateAll(elements=>elements.every(element=>element.querySelector('svg'))),{timeout:15000}).toBe(true);
    const geometry=await slots.evaluateAll(elements=>elements.map(element=>{
      const box=(element.querySelector('.rain-business-mini-slot')??element).getBoundingClientRect(),style=getComputedStyle(element);
      return {kind:element.dataset.miniKind,width:box.width,height:box.height,fontSize:style.fontSize,lineHeight:style.lineHeight,svgCount:element.querySelectorAll("svg").length,readings:[...element.querySelectorAll('[data-primary-reading]')].map(reading=>{const readingStyle=getComputedStyle(reading);return {text:reading.textContent,fontSize:readingStyle.fontSize,lineHeight:readingStyle.lineHeight,fontFamily:readingStyle.fontFamily};})};
    }));
    const dimensions=settings.miniSize==="compact"?{plot:[96,32],pie:[32,32],arc:[40,30]}:{plot:[128,48],pie:[56,56],arc:[72,54]};
    const [width,height]=dimensions[settings.id==="pie"?"pie":settings.id==="ring"?"arc":"plot"];
    for (const slot of geometry) {
      expect(Math.abs(slot.width-width),`${name} width`).toBeLessThanOrEqual(1);
      expect(Math.abs(slot.height-height),`${name} height`).toBeLessThanOrEqual(1);
      expect(slot.svgCount,`${name} SVG`).toBeGreaterThan(0);
      if(settings.id==="ring"&&settings.miniSize==="comfortable"){expect(slot.readings).toHaveLength(1);expect(slot.readings[0].fontSize).toBe("13px");expect(slot.readings[0].lineHeight).toBe("20px");expect(slot.readings[0].fontFamily).toContain("LINE Seed");}
    }
    expect(await page.locator('svg path').evaluateAll(paths=>paths.filter(path=>/NaN|Infinity|undefined/.test(path.getAttribute("d")??"")).length)).toBe(0);
    const css=await page.locator('.rain-chart').evaluate(element=>{const style=getComputedStyle(element);return {series:style.getPropertyValue("--chart-1").trim(),space:style.getPropertyValue("--rain-space-24").trim(),dataFont:style.getPropertyValue("--rain-font-data").trim()};});
    expect(css.series).not.toBe("");expect(css.space).toBe("24px");expect(css.dataFont).toContain("LINE Seed");
    await page.getByText("查看精确数据",{exact:true}).click();
    const table=page.locator('.rain-chart-data tbody');
    const count=["line","area"].includes(settings.id)?24:settings.id==="bar"?6:settings.seriesCount;
    await expect(table.locator('tr')).toHaveCount(count);
    const readings=await table.locator('tr').allTextContents();
    const values=settings.id==="pie"?[344,296,268,238,216].slice(0,settings.seriesCount):settings.id==="ring"?[76,58,82,64,45].slice(0,settings.seriesCount):settings.id==="bar"?[192,220,248,276,304,332]:[Math.round(190+23*6+Math.sin(23*.58)*44+2*(12+23%4*8))];
    if (["line","area"].includes(settings.id)) expect(readings.at(-1)).toContain(String(values[0]));
    else values.forEach((value,index)=>expect(readings[index]).toContain(String(value)));
    const tableCss=await table.locator('td').first().evaluate(element=>({fontSize:getComputedStyle(element).fontSize,lineHeight:getComputedStyle(element).lineHeight}));
    expect(tableCss.fontSize).toBe("12px");
    await page.setViewportSize({width:390,height:1000});
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    await page.screenshot({path:join(evidence,`${name}-narrow.png`),fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
    facts.checks.push({name,settings,geometry,css,tableCss,readings,render:"passed",narrow:"passed"});
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
  console.log(`Passed ${states.length} business states, ${minis.length} mini, 13 category, ${samples.filter(sample=>sample.name.startsWith("network-")).length} network and ${chinaConsumptionCases.length} China downloads, independent update and narrow layout; ${evidence}`);
} catch(error) {facts.status="failed";facts.error=String(error);throw error;}
finally {if(browser)await browser.close();if(server)server.kill();put(join(evidence,"facts.json"),JSON.stringify(facts,null,2));}
