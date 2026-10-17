# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-curve-refinement.spec.ts >> 390px no-preference >> mini line and area retain both native sizes, shared readings, states and replay
- Location: tests/e2e/chart-curve-refinement.spec.ts:114:3

# Error details

```
Error: mini-line-compact-390-reduce-monochrome-blue: colors, widths, fill, typography, legends, dates and viewport

expect(received).toEqual(expected) // deep equality

- Expected  - 7
+ Received  + 1

@@ -1,14 +1,8 @@
  Object {
    "dateLabels": Array [],
-   "fills": Array [
-     Array [
-       "rgba(0, 0, 0, 0)",
-       "1",
-       "1",
-     ],
-   ],
+   "fills": Array [],
    "legends": Array [],
    "paths": Array [
      Array [
        "rgb(98, 136, 199)",
        "1.5px",
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "迷你图表与业务组合" [level=1] [ref=e8]
      - generic [ref=e9]: 共享候选 · 未发布 · 待视觉审阅
    - paragraph [ref=e10]: 大小条形、轻量趋势、构成与进度，组合进日常阅读数据的地方。
  - generic [ref=e11]:
    - generic [ref=e12]:
      - text: 配色
      - combobox "业务图表配色" [ref=e13]:
        - option "蓝灰单色" [selected]
        - option "蓝紫近邻"
        - option "多色类别"
    - generic [ref=e14]:
      - text: 数据状态
      - combobox "业务数据状态" [ref=e15]:
        - option "正常" [selected]
        - option "全零"
        - option "缺测"
        - option "无效数据"
        - option "无数据"
        - option "单项"
        - option "长名称"
    - button "更新数据" [ref=e16] [cursor=pointer]
    - button "重播动效" [ref=e18] [cursor=pointer]
    - button "按数量排序" [ref=e20] [cursor=pointer]
    - button "只看50人以上" [ref=e22] [cursor=pointer]
    - button "40行场景" [ref=e24] [cursor=pointer]
  - status [ref=e26]: 示例数据 · 更新 0 次
  - generic [ref=e27]:
    - region [ref=e28]:
      - heading "同一量程，大小都能比较" [level=2] [ref=e29]
      - generic [ref=e30]:
        - generic [ref=e32]:
          - generic:
            - generic:
              - generic "计算机学院"
            - generic:
              - generic "经济管理学院"
            - generic:
              - generic "人文学院"
            - generic:
              - generic "理学院"
            - generic:
              - generic "外国语学院"
        - figure [ref=e49]:
          - list [ref=e50]:
            - listitem [ref=e51]:
              - generic [ref=e52]: 计算机学院
              - generic [ref=e55]: 25 人
            - listitem [ref=e56]:
              - generic [ref=e57]: 经济管理学院
              - generic [ref=e60]: 50 人
            - listitem [ref=e61]:
              - generic [ref=e62]: 人文学院
              - generic [ref=e65]: 100 人
            - listitem [ref=e66]:
              - generic [ref=e67]: 理学院
              - generic [ref=e70]: 75 人
            - listitem [ref=e71]:
              - generic [ref=e72]: 外国语学院
              - generic [ref=e75]: 45 人
    - generic [ref=e76]:
      - heading "分组比较与互斥堆叠" [level=2] [ref=e77]
      - generic [ref=e78]:
        - figure "本期与上期参与人数" [ref=e79]:
          - generic [ref=e82]:
            - generic:
              - generic:
                - generic "计算机学院"
              - generic:
                - generic "经济管理学院"
              - generic:
                - generic "人文学院"
              - generic:
                - generic "理学院"
              - generic:
                - generic "外国语学院"
          - paragraph [ref=e110]:
            - generic [ref=e111]: 本期
            - generic [ref=e113]: 上期
          - group [ref=e115]:
            - generic "查看分项读数" [ref=e116]
        - figure "互斥课程构成" [ref=e117]:
          - generic [ref=e120]:
            - generic:
              - generic:
                - generic "计算机学院"
              - generic:
                - generic "经济管理学院"
              - generic:
                - generic "人文学院"
              - generic:
                - generic "理学院"
              - generic:
                - generic "外国语学院"
          - paragraph [ref=e159]:
            - generic [ref=e160]: 已完成
            - generic [ref=e162]: 进行中
            - generic [ref=e164]: 待开始
          - group [ref=e166]:
            - generic "查看分项读数" [ref=e167]
      - generic [ref=e168]:
        - generic [ref=e169]: 评分 7.5 / 10
        - generic [ref=e173]: 相对位置 12 / 60（从前到后）
    - region [ref=e177]:
      - heading "同一图形，两种阅读密度" [level=2] [ref=e178]
      - generic [ref=e179]:
        - region [ref=e180]:
          - heading "数量条" [level=3] [ref=e181]
          - generic [ref=e182]:
            - figure "紧凑" [ref=e183]
            - figure "舒展" [ref=e190]
          - generic [ref=e197]: 本期人数 · 25 人
        - region [ref=e199]:
          - heading "构成分段" [level=3] [ref=e200]
          - generic [ref=e201]:
            - figure "紧凑" [ref=e202]
            - figure "舒展" [ref=e223]
          - list [ref=e245]:
            - listitem [ref=e246]:
              - text: 已完成
              - generic [ref=e248]: 15 人
            - listitem [ref=e249]:
              - text: 进行中
              - generic [ref=e251]: 6 人
            - listitem [ref=e252]:
              - text: 待开始
              - generic [ref=e254]: 4 人
        - region [ref=e255]:
          - heading "每日柱图" [level=3] [ref=e256]
          - generic [ref=e257]:
            - figure "紧凑" [ref=e258]
            - figure "舒展" [ref=e287]
          - generic [ref=e316]: 近8天每日人数 · 共同上限 80 人
        - region [ref=e318]:
          - heading "小饼" [level=3] [ref=e319]
          - generic [ref=e320]:
            - figure "紧凑" [ref=e321]:
              - img [ref=e328]:
                - generic [ref=e329]:
                  - generic [ref=e330] [cursor=pointer]
                  - generic [ref=e332] [cursor=pointer]
                  - generic [ref=e334] [cursor=pointer]
            - figure "舒展" [ref=e337]:
              - img [ref=e344]:
                - generic [ref=e345]:
                  - generic [ref=e346] [cursor=pointer]
                  - generic [ref=e348] [cursor=pointer]
                  - generic [ref=e350] [cursor=pointer]
          - list [ref=e354]:
            - listitem [ref=e355]:
              - text: 已完成
              - generic [ref=e357]: 15 人
            - listitem [ref=e358]:
              - text: 进行中
              - generic [ref=e360]: 6 人
            - listitem [ref=e361]:
              - text: 待开始
              - generic [ref=e363]: 4 人
        - region [ref=e364]:
          - heading "环饼" [level=3] [ref=e365]
          - generic [ref=e366]:
            - figure "紧凑" [ref=e367]:
              - img [ref=e374]:
                - generic [ref=e375]:
                  - generic [ref=e376] [cursor=pointer]
                  - generic [ref=e378] [cursor=pointer]
                  - generic [ref=e380] [cursor=pointer]
            - figure "舒展" [ref=e383]:
              - img [ref=e390]:
                - generic [ref=e391]:
                  - generic [ref=e392] [cursor=pointer]
                  - generic [ref=e394] [cursor=pointer]
                  - generic [ref=e396] [cursor=pointer]
          - list [ref=e400]:
            - listitem [ref=e401]:
              - text: 已完成
              - generic [ref=e403]: 15 人
            - listitem [ref=e404]:
              - text: 进行中
              - generic [ref=e406]: 6 人
            - listitem [ref=e407]:
              - text: 待开始
              - generic [ref=e409]: 4 人
        - region [ref=e410]:
          - heading "完成环" [level=3] [ref=e411]
          - generic [ref=e412]:
            - figure "紧凑 · 68%" [ref=e413]:
              - img [ref=e420]:
                - generic [ref=e422] [cursor=pointer]
            - figure "舒展" [ref=e426]:
              - generic [ref=e428]:
                - img [ref=e433]:
                  - generic [ref=e435] [cursor=pointer]
                - generic:
                  - strong: 68%
                  - generic: 完成率
          - generic [ref=e439]: 完成 68 人 · 目标 100 人
        - region [ref=e441]:
          - heading "完成弧" [level=3] [ref=e442]
          - generic [ref=e443]:
            - figure "紧凑 · 68%" [ref=e444]:
              - img [ref=e451]:
                - generic [ref=e453] [cursor=pointer]
            - figure "舒展" [ref=e457]:
              - generic [ref=e459]:
                - img [ref=e464]:
                  - generic [ref=e466] [cursor=pointer]
                - generic:
                  - strong: 68%
                  - generic: 完成率
          - generic [ref=e470]: 完成 68 人 · 目标 100 人
        - region [ref=e472]:
          - heading "折线走势" [level=3] [ref=e473]
          - generic [ref=e474]:
            - figure "紧凑" [ref=e475]
            - figure "舒展" [ref=e490]
          - generic [ref=e505]: 近8天每日人数 · 观察变化
        - region [ref=e506]:
          - heading "面积走势" [level=3] [ref=e507]
          - generic [ref=e508]:
            - figure "紧凑" [ref=e509]
            - figure "舒展" [ref=e525]
          - generic [ref=e541]: 近8天每日人数 · 观察变化
    - region [ref=e542]:
      - heading "指标卡：图文就近成组" [level=2] [ref=e543]
      - generic [ref=e544]:
        - article [ref=e545]:
          - heading "本期参与人数" [level=3] [ref=e547]
          - generic [ref=e548]:
            - generic [ref=e549]: 25 人
            - paragraph [ref=e564]: 近8天每日人数 · 趋势按自身范围展开
        - article [ref=e565]:
          - heading "课程构成" [level=3] [ref=e567]
          - generic [ref=e568]:
            - generic [ref=e569]:
              - generic [ref=e570]: 25 门
              - img [ref=e576]:
                - generic [ref=e577]:
                  - generic [ref=e578] [cursor=pointer]
                  - generic [ref=e580] [cursor=pointer]
                  - generic [ref=e582] [cursor=pointer]
            - generic [ref=e584]:
              - generic [ref=e585]:
                - text: 已完成
                - generic [ref=e587]: "15"
              - generic [ref=e588]:
                - text: 进行中
                - generic [ref=e590]: "6"
              - generic [ref=e591]:
                - text: 待开始
                - generic [ref=e593]: "4"
        - article [ref=e594]:
          - heading "目标完成" [level=3] [ref=e596]
          - generic [ref=e597]:
            - generic [ref=e598]:
              - generic [ref=e599]: 68%
              - img [ref=e605]:
                - generic [ref=e607] [cursor=pointer]
            - paragraph [ref=e610]: 已完成 68 / 100 项
    - region [ref=e611]:
      - heading "表格：紧凑型号，一起比较" [level=2] [ref=e612]
      - paragraph [ref=e613]: 参与人数共用 0—100 人量程；每日柱图共用 0—80 人量程。面积走势用于看各自变化；点击学院名称读取每个数据点。
      - region "学院数据与迷你图表" [ref=e614]:
        - table [ref=e615]:
          - rowgroup [ref=e616]:
            - row [ref=e617]:
              - columnheader "学院" [ref=e618]
              - columnheader "参与人数" [ref=e619]
              - columnheader "近8天趋势" [ref=e620]
              - columnheader "每日分布" [ref=e621]
              - columnheader "课程构成" [ref=e622]
              - columnheader "目标完成" [ref=e623]
          - rowgroup [ref=e624]:
            - row [ref=e625]:
              - cell [ref=e626]:
                - button "计算机学院" [ref=e627] [cursor=pointer]
              - cell "25 人" [ref=e629]
              - cell [ref=e634]
              - cell [ref=e637]
              - cell "共 25 门" [ref=e640]:
                - generic "已完成 15 / 进行中 6 / 待开始 4" [ref=e641]: 共 25 门
              - cell "68%" [ref=e645]
            - row [ref=e650]:
              - cell [ref=e651]:
                - button "经济管理学院" [ref=e652] [cursor=pointer]
              - cell "50 人" [ref=e654]
              - cell [ref=e659]
              - cell [ref=e662]
              - cell "共 50 门" [ref=e665]:
                - generic "已完成 20 / 进行中 17 / 待开始 13" [ref=e666]: 共 50 门
              - cell "42%" [ref=e670]
            - row [ref=e675]:
              - cell [ref=e676]:
                - button "人文学院" [ref=e677] [cursor=pointer]
              - cell "100 人" [ref=e679]
              - cell [ref=e684]
              - cell [ref=e687]
              - cell "共 100 门" [ref=e690]:
                - generic "已完成 66 / 进行中 22 / 待开始 12" [ref=e691]: 共 100 门
              - cell "84%" [ref=e695]
            - row [ref=e700]:
              - cell [ref=e701]:
                - button "理学院" [ref=e702] [cursor=pointer]
              - cell "75 人" [ref=e704]
              - cell [ref=e709]
              - cell [ref=e712]
              - cell "共 75 门" [ref=e715]:
                - generic "已完成 23 / 进行中 34 / 待开始 18" [ref=e716]: 共 75 门
              - cell "56%" [ref=e720]
            - row [ref=e725]:
              - cell [ref=e726]:
                - button "外国语学院" [ref=e727] [cursor=pointer]
              - cell "45 人" [ref=e729]
              - cell [ref=e734]
              - cell [ref=e737]
              - cell "共 45 门" [ref=e740]:
                - generic "已完成 21 / 进行中 16 / 待开始 8" [ref=e741]: 共 45 门
              - cell "76%" [ref=e745]
    - region [ref=e750]:
      - heading "课程列表：读数就近成组" [level=2] [ref=e751]
      - list [ref=e752]:
        - listitem [ref=e753]:
          - strong [ref=e755]: 计算机学院 · 教学任务
          - generic [ref=e756]: 评分 2.5 / 10
          - generic [ref=e760]:
            - img [ref=e766]:
              - generic [ref=e768] [cursor=pointer]
            - generic [ref=e771]:
              - generic [ref=e772]: 68%
              - generic [ref=e773]: 已完成 68 / 100 项
        - listitem [ref=e774]:
          - strong [ref=e776]: 经济管理学院 · 教学任务
          - generic [ref=e777]: 评分 5.0 / 10
          - generic [ref=e781]:
            - img [ref=e787]:
              - generic [ref=e789] [cursor=pointer]
            - generic [ref=e792]:
              - generic [ref=e793]: 42%
              - generic [ref=e794]: 已完成 42 / 100 项
        - listitem [ref=e795]:
          - strong [ref=e797]: 人文学院 · 教学任务
          - generic [ref=e798]: 评分 10.0 / 10
          - generic [ref=e802]:
            - img [ref=e808]:
              - generic [ref=e810] [cursor=pointer]
            - generic [ref=e813]:
              - generic [ref=e814]: 84%
              - generic [ref=e815]: 已完成 84 / 100 项
      - generic [ref=e816]:
        - generic [ref=e817]:
          - img [ref=e822]:
            - generic [ref=e824] [cursor=pointer]
          - generic:
            - strong: 68%
            - generic: 完成率
        - generic [ref=e827]:
          - strong [ref=e828]: 计算机学院 · 本期教学任务
          - paragraph [ref=e829]: 已完成 68 / 100 项
  - group [ref=e830]:
    - generic "条形与嵌入组合源码" [ref=e831] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-business/mini-data.ts"
    - option "chart-business/mini-layout.ts"
    - option "chart-business/mini-examples.tsx"
    - option "chart-business/bar-examples.tsx"
    - option "chart-business/embedding-examples.tsx"
    - option "chart-business/chart-business.css"
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | import { mkdir, readFile, writeFile } from 'node:fs/promises';
  3   | import { observed, settled, hashSources, run, capture } from '../../evidence/runtime/chart-curve-refinement-2026-10-11/browser-observer.mjs';
  4   | 
  5   | const runName=process.env.RAIN_CURVE_BROWSER_RUN ?? 'after-tests';
  6   | const folder=`${run}/browser-tests/${runName}`;
  7   | const beforeFolder=`${run}/browser-before`;
  8   | const shapes=['line','area','composed'] as const;
  9   | const official=[
  10  |  {family:'area',id:'area-default',keys:['enrolled']},
  11  |  {family:'line',id:'line-dual-y-axis',keys:['enrolled','rate']},
  12  |  {family:'composed',id:'composed-markers-dashed-tail',keys:['returned'],markers:true},
  13  | ] as const;
  14  | 
  15  | function turns(values:(number|null)[]){let previous=0,count=0;for(let i=1;i<values.length;i++){if(values[i]===null||values[i-1]===null){previous=0;continue;}const change=Math.sign(values[i]!-values[i-1]!);if(change&&previous&&change!==previous)count++;if(change)previous=change;}return count;}
  16  | const paint=(value:string)=>value.replace(/url\([^)]+\)/g,'url(<instance-paint>)');
  17  | function presentation(facts:any){return{
  18  |  paths:facts.paths.map((p:any)=>[paint(p.stroke),p.strokeWidth,p.strokeOpacity,p.opacity,p.dasharray]).sort(),
  19  |  fills:facts.fills.map((p:any)=>[paint(p.fill),p.fillOpacity,p.opacity]).sort(),
  20  |  legends:facts.legends,dateLabels:facts.dateLabels,
  21  |  text:facts.textStyle.map((p:any)=>[p.fontFamily,p.fontSize,p.fontWeight,p.color,p.fill]).sort(),
  22  |  svgSizes:facts.svgs.map((p:any)=>[p.width,p.height,p.box.width,p.box.height]),
  23  | };}
  24  | async function timeline(page:Page,revision:number,state='normal'){
  25  |  return page.evaluate(async({revision,state})=>{
  26  |   const modulePath='/src/docs/components/chart-data.ts';const module=await import(/* @vite-ignore */ modulePath);
  27  |   const rows=state==='missing'?module.makeMissingTimeline(revision):module.makeTimeline(revision,state);
  28  |   return rows.map((p:any)=>({date:p.date.getDate(),enrolled:p.enrolled,completed:p.completed,returned:p.returned,rate:p.rate}));
  29  |  },{revision,state});
  30  | }
  31  | async function miniValues(page:Page,revision:number,state='normal'){
  32  |  return page.evaluate(async({revision,state})=>{
  33  |   const modulePath='/src/docs/components/chart-business/mini-data.ts';const module=await import(/* @vite-ignore */ modulePath);
  34  |   return module.makeMiniRows(revision,state)[0]?.trend ?? [];
  35  |  },{revision,state});
  36  | }
  37  | function geometry(facts:any,allowedTurns:number|number[],label:string){
  38  |  expect(facts.finite,label).toBe(true);expect(facts.documentWidth).toBeLessThanOrEqual(facts.viewportWidth+1);
  39  |  for(const [index,path] of facts.paths.entries()){expect(path.xMonotone,`${label}: actual rendered path runs backwards in x`).toBe(true);
  40  |   // Across missing-data M breaks getPointAtLength jumps; that jump is not a peak.
  41  |   const limit=Array.isArray(allowedTurns)?allowedTurns[index]:allowedTurns;
  42  |   expect(limit,`${label}: a visible native path has an explicit series limit`).toBeDefined();
  43  |   if(limit===undefined)throw new Error(`${label}: no series turn limit for native path ${index}`);
  44  |   if(path.subpaths===1)expect(path.extrema,`${label}: rendered extrema exceed source-data turns; ${path.d}`).toBeLessThanOrEqual(limit);
  45  |  }
  46  | }
  47  | async function idle(host:Locator,reduced:boolean):Promise<any>{return settled(host,{minimumMs:reduced?0:1500});}
  48  | async function realTooltip(page:Page,host:Locator,rows:any[],label:string,keys:string[],official=false){
  49  |  const plot=host.locator('.rain-chart-plot,.rain-chart-mini-plot').first();await plot.scrollIntoViewIfNeeded();const box=(await plot.boundingBox())!;
  50  |  const tooltip=host.locator('.rain-chart-tooltip');
  51  |  await expect(async()=>{await page.mouse.move(0,0);await page.mouse.move(box.x+Math.min(80,box.width/3),box.y+box.height/2);await expect(tooltip).toBeVisible({timeout:100});}).toPass({timeout:5000,intervals:[50]});
  52  |  const text=(await tooltip.textContent())??'';const date=text.match(/9月(\d+)日/);expect(date,`${label}: actual tooltip date`).toBeTruthy();
  53  |  const source=rows.find(row=>row.date===Number(date![1]));expect(source,`${label}: tooltip date belongs to actual data`).toBeDefined();
  54  |  const valueTexts=await tooltip.locator('span.tabular-nums').allTextContents();
  55  |  const expected=keys.map(key=>key==='rate'?`${Number(source[key]).toFixed(1)}${official?' ':''}%`:`${source[key]} 人`);
  56  |  expect(valueTexts,`${label}: each tooltip series matches the original count or displayed full-precision rate`).toEqual(expected);
  57  |  await page.mouse.move(0,0);return{text,date:Number(date![1]),valueTexts};
  58  | }
> 59  | async function compareBaseline(id:string,facts:any){const before=JSON.parse(await readFile(`${beforeFolder}/${id}.json`,'utf8'));expect(presentation(facts),`${id}: colors, widths, fill, typography, legends, dates and viewport`).toEqual(presentation(before));}
      |                                                                                                                                                                                                                                     ^ Error: mini-line-compact-390-reduce-monochrome-blue: colors, widths, fill, typography, legends, dates and viewport
  60  | async function save(name:string,value:any){await mkdir(folder,{recursive:true});await writeFile(`${folder}/${name}.json`,JSON.stringify(value,null,2));}
  61  | async function markersAndTail(host:Locator){
  62  |  const facts=await host.evaluate(node=>{
  63  |   const circles=[...node.querySelectorAll('svg circle')];const xs=[...new Set(circles.map(circle=>Number(circle.getAttribute('cx'))))].sort((a,b)=>a-b);
  64  |   const tails=[...node.querySelectorAll('svg path[stroke-dasharray]')].filter(path=>path.getAttribute('stroke-dasharray')==='6,4').map(path=>{const id=(path.getAttribute('clip-path')??'').match(/#([^)]*)/)?.[1];const clip=id?document.getElementById(id)?.querySelector('rect'):null;return{strokeWidth:Number(path.getAttribute('stroke-width')),clipStart:Number(clip?.getAttribute('x'))};});return{circles:circles.length,xs,tails};
  65  |  });
  66  |  expect(facts.circles).toBe(28);expect(facts.xs).toHaveLength(7);expect(facts.tails).toHaveLength(2);for(const tail of facts.tails)expect(tail.clipStart).toBeCloseTo(facts.xs[4]!-tail.strokeWidth,4);return facts;
  67  | }
  68  | 
  69  | for(const width of[1440,390])for(const mode of['no-preference','reduce'] as const){
  70  |  const reduced=mode==='reduce';
  71  |  test.describe(`${width}px ${mode}`,()=>{
  72  |   test.beforeEach(async({page})=>{await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:mode});await page.clock.setFixedTime(new Date('2026-10-11T00:00:00+08:00'));});
  73  |   test('default line, area and composed retain reads, geometry and state behavior',async({page})=>{
  74  |    test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  75  |    try{for(const family of shapes){
  76  |     await page.goto(`/?curve-refinement=${runName}#chart-${family}`);await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('category-near');
  77  |     const host=page.locator(`[data-rain-id="chart-${family}"]`),controls=page.locator('[data-chart-default-controls]');
  78  |     const keys=family==='composed'?['enrolled','rate']:['enrolled','completed','returned'];
  79  |     let rows=await timeline(page,0);const normal=await idle(host,reduced);geometry(normal,keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${family}-normal`);await compareBaseline(`default-${family}-${width}-reduce-category-near`,normal);
  80  |     const tooltipKeys=family==='composed'?['enrolled','completed','rate']:keys;
  81  |     const initialTooltip=await realTooltip(page,host,rows,`${family}-normal`,tooltipKeys);facts.push({family,state:'normal',revision:0,observed:normal,tooltip:initialTooltip});
  82  |     await controls.getByRole('button',{name:'更新数据',exact:true}).click();rows=await timeline(page,1);const updated=await idle(host,reduced);geometry(updated,keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${family}-updated`);expect(presentation(updated)).toEqual(presentation(normal));expect(updated.table).not.toEqual(normal.table);
  83  |     expect(updated.paths.map((p:any)=>p.d)).not.toEqual(normal.paths.map((p:any)=>p.d));
  84  |     facts.push({family,state:'normal',revision:1,observed:updated,tooltip:await realTooltip(page,host,rows,`${family}-updated`,tooltipKeys)});
  85  |     await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await idle(host,reduced);expect(replay.paths.map((p:any)=>p.d)).toEqual(updated.paths.map((p:any)=>p.d));expect(presentation(replay)).toEqual(presentation(updated));facts.push({family,state:'replay',revision:1,observed:replay});
  86  |     for(const state of['missing','zero','single']){
  87  |      await controls.getByRole('combobox',{name:'示例状态',exact:true}).selectOption(state);const current=await idle(host,reduced);expect(current.finite).toBe(true);expect(current.documentWidth).toBeLessThanOrEqual(width+1);
  88  |      const stateRows=await timeline(page,1,state);expect(current.table).toHaveLength(stateRows.length);
  89  |      if(state==='missing')expect((await host.textContent())??'').toMatch(/缺测|不适用/);
  90  |      if(state==='zero'){geometry(current,0,`${family}-zero`);if(family==='composed')await expect(host).toContainText('完成率不适用');}
  91  |      if(state==='single')expect(current.table).toHaveLength(1);
  92  |      facts.push({family,state,revision:1,observed:current});
  93  |     }
  94  |    }}finally{const sourcesAfter=await hashSources();await save(`default-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  95  |    expect(errors).toEqual([]);
  96  |   });
  97  | 
  98  |   test('representative official area, dual-axis line and markers keep their actual native path and interactions',async({page})=>{
  99  |    test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  100 |    try{for(const item of official){
  101 |     await page.goto(`/?curve-refinement=${runName}#chart-${item.family}`);await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('monochrome-blue');
  102 |     const host=page.locator(`[data-chart-variant="${item.id}"]`);await host.scrollIntoViewIfNeeded();await expect(host.locator('[data-ready="true"]')).toBeVisible();
  103 |     let rows=await timeline(page,0);if('markers'in item&&item.markers)rows=rows.slice(0,7);const normal=await idle(host,reduced);geometry(normal,'markers'in item&&item.markers?turns(rows.map((row:any)=>row.returned)):item.keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${item.id}-normal`);await compareBaseline(`official-${item.id}-${width}-reduce-monochrome-blue`,normal);
  104 |     if('markers'in item&&item.markers)await markersAndTail(host);
  105 |     if(item.id.includes('dual'))await expect(host).toContainText('%');
  106 |     const tooltipKeys='markers'in item&&item.markers?['enrolled','returned']:item.keys;
  107 |     facts.push({id:item.id,revision:0,observed:normal,tooltip:await realTooltip(page,host,rows,item.id,[...tooltipKeys],true)});
  108 |     await host.getByRole('button',{name:'更新数据',exact:true}).click();rows=await timeline(page,1);if('markers'in item&&item.markers)rows=rows.slice(0,7);const updated=await idle(host,reduced);geometry(updated,'markers'in item&&item.markers?turns(rows.map((row:any)=>row.returned)):item.keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${item.id}-updated`);expect(presentation(updated)).toEqual(presentation(normal));expect(updated.paths.map((p:any)=>p.d)).not.toEqual(normal.paths.map((p:any)=>p.d));facts.push({id:item.id,revision:1,observed:updated,tooltip:await realTooltip(page,host,rows,`${item.id}-updated`,[...tooltipKeys],true)});
  109 |     await host.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await idle(host,reduced);expect(replay.paths.map((p:any)=>p.d)).toEqual(updated.paths.map((p:any)=>p.d));expect(presentation(replay)).toEqual(presentation(updated));if('markers'in item&&item.markers)await markersAndTail(host);facts.push({id:item.id,state:'replay',observed:replay});
  110 |    }}finally{const sourcesAfter=await hashSources();await save(`official-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  111 |    expect(errors).toEqual([]);
  112 |   });
  113 | 
  114 |   test('mini line and area retain both native sizes, shared readings, states and replay',async({page})=>{
  115 |    test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  116 |    try{
  117 |     await page.goto(`/?curve-refinement=${runName}#chart-business`);const gallery=page.locator('.rain-business-mini-gallery'),controls=page.locator('.rain-business-controls');
  118 |     const take=async(state:string,revision:number)=>{const samples:any[]=[];const values=await miniValues(page,revision,state);for(const kind of['line','area'])for(const size of['compact','comfortable']){
  119 |      const slot=gallery.locator(`[data-mini-kind="${kind}"][data-size="${size}"]`),figure=slot.locator('xpath=ancestor::figure');await slot.scrollIntoViewIfNeeded();await expect(slot).toBeVisible();
  120 |      let current:any;if(state==='missing'){await expect(slot).toHaveAttribute('data-mini-state','missing');current=await observed(figure);expect(current.paths).toHaveLength(0);}else{current=await idle(figure,reduced);geometry(current,turns(values),`mini-${kind}-${size}-${state}`);}
  121 |      const box=await slot.locator('.rain-business-mini-slot').boundingBox();expect(box!.width).toBe(size==='compact'?96:128);expect(box!.height).toBe(size==='compact'?32:48);
  122 |      const caption=await figure.evaluate(node=>document.getElementById(node.getAttribute('aria-describedby')!)?.textContent??'');expect(caption).toBeTruthy();
  123 |      // MiniTrend is deliberately decorative and has no tooltip part in its contract.
  124 |      expect(await slot.locator('.rain-chart-tooltip').count()).toBe(0);if(state==='normal'&&revision===0)await compareBaseline(`mini-${kind}-${size}-${width}-reduce-monochrome-blue`,current);
  125 |      samples.push({kind,size,caption,observed:current});
  126 |     }expect(samples[0].caption).toBe(samples[1].caption);expect(samples[2].caption).toBe(samples[3].caption);facts.push({state,revision,samples});return samples;};
  127 |     const normal=await take('normal',0);await controls.getByRole('button',{name:'更新数据',exact:true}).click();const updated=await take('normal',1);
  128 |     updated.forEach((sample,index)=>{expect(presentation(sample.observed)).toEqual(presentation(normal[index].observed));expect(sample.observed.paths.map((p:any)=>p.d)).not.toEqual(normal[index].observed.paths.map((p:any)=>p.d));});
  129 |     await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await take('normal',1);replay.forEach((sample,index)=>expect(sample.observed.paths.map((p:any)=>p.d)).toEqual(updated[index].observed.paths.map((p:any)=>p.d)));
  130 |     for(const state of['zero','missing','single']){await controls.getByRole('combobox',{name:'业务数据状态',exact:true}).selectOption(state);await take(state,1);}
  131 |    }finally{const sourcesAfter=await hashSources();await save(`mini-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  132 |    expect(errors).toEqual([]);
  133 |   });
  134 |  });
  135 | }
  136 | 
  137 | for(const width of[1440,390])test(`${width}px reduce: category area curves retain all original points, exact tables and missing boundaries`,async({page})=>{
  138 |  test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  139 |  await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await page.clock.setFixedTime(new Date('2026-10-11T00:00:00+08:00'));
  140 |  const raw=async(id:string,revision:number,state:string)=>page.evaluate(async({id,revision,state})=>{const modulePath='/src/docs/components/chart-business/comparison-data.ts';const module=await import(/* @vite-ignore */modulePath);return module.makeCategoryFixtures(revision,state).find((fixture:any)=>fixture.id===id);},{id,revision,state});
  141 |  try{for(const id of['semester','period','version']){
  142 |   await page.goto(`/?curve-refinement=${runName}#chart-category`);const controls=page.locator('.rain-category-controls');await controls.getByRole('combobox',{name:'分类业务场景',exact:true}).selectOption(id);
  143 |   const host=page.locator(`[data-category-example="${id}"]`);await host.locator('summary').click();
  144 |   const take=async(revision:number,state:string)=>{
  145 |    const fixture=await raw(id,revision,state),current=await idle(host,true);expect(current.finite).toBe(true);expect(current.documentWidth).toBeLessThanOrEqual(width+1);expect(current.paths).toHaveLength(fixture.series.length);
  146 |    const expectedRows=fixture.rows.map((row:any)=>[row.label,...(id==='period'?[row.currentDate??'无观测日期',row.previousDate??'无观测日期']:[]),...fixture.series.map((series:any)=>row[series.key]===null?'缺测':String(row[series.key]))]);
  147 |    expect(await host.locator('tbody tr').evaluateAll(rows=>rows.map(row=>[...row.querySelectorAll('th,td')].map(cell=>cell.textContent?.trim())))).toEqual(expectedRows);
  148 |    for(const [index,path]of current.paths.entries()){
  149 |     const sourceCount=fixture.rows.filter((row:any)=>row[fixture.series[index].key]!==null).length;expect((path.d.match(/[MCL]/gi)??[]).length,`${id} ${state}: actual native stroke retains every non-null original point`).toBe(sourceCount);expect(path.xMonotone).toBe(true);
  150 |     if(state==='zero')expect(path.extrema).toBe(0);if(state==='missing'&&id!=='period')expect(path.subpaths).toBe(2);
  151 |    }
  152 |    facts.push({id,revision,state,sourceRows:fixture.rows,sourceSeries:fixture.series,observed:current});return{fixture,current};
  153 |   };
  154 |   const normal=await take(0,'normal');await capture(page,host,`category-${id}-${width}-reduce-normal`,`${folder}/category`);
  155 |   const viewport=host.locator('.rain-category-scroll');await viewport.scrollIntoViewIfNeeded();const box=(await viewport.boundingBox())!;const tooltip=host.locator('.rain-category-tooltip');
  156 |   await expect(async()=>{await page.mouse.move(0,0);await page.mouse.move(box.x+Math.min(150,box.width/2),box.y+100);await expect(tooltip).toBeVisible({timeout:100});}).toPass({timeout:5000,intervals:[50]});
  157 |   const tooltipText=(await tooltip.textContent())??'',point=normal.fixture.rows.find((row:any)=>tooltipText.includes(row.label));expect(point).toBeTruthy();expect(await tooltip.locator('span.tabular-nums').allTextContents()).toEqual(normal.fixture.series.map((series:any)=>point[series.key]===null?'缺测':`${point[series.key]}${series.unit}`));
  158 |   if(id==='period'){expect(tooltipText).toContain(point.currentDate??'无观测日期');expect(tooltipText).toContain(point.previousDate??'无观测日期');}
  159 |   await host.screenshot({path:`${folder}/category/category-${id}-${width}-tooltip.png`,animations:'disabled'});facts.push({id,state:'tooltip',tooltipText});await page.mouse.move(0,0);
```