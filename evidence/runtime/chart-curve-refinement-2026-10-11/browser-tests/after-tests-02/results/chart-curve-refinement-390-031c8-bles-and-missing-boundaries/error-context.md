# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-curve-refinement.spec.ts >> 390px reduce: category area curves retain all original points, exact tables and missing boundaries
- Location: tests/e2e/chart-curve-refinement.spec.ts:139:30

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 9
+ Received  + 9

  Array [
    Array [
      "第1天",
      "2026-12-30",
      "2026-12-23",
-     "24",
-     "20",
+     "32",
+     "28",
    ],
    Array [
      "第2天",
      "2026-12-31",
      "2026-12-24",
-     "36",
-     "28",
+     "缺测",
+     "缺测",
    ],
    Array [
      "第3天",
      "2027-01-01",
      "2026-12-25",
-     "30",
-     "34",
+     "26",
+     "42",
    ],
    Array [
      "第4天",
      "2027-01-02",
      "2026-12-26",
-     "52",
-     "40",
+     "44",
+     "36",
    ],
    Array [
      "第5天",
      "2027-01-03",
      "无观测日期",
-     "48",
+     "60",
      "缺测",
    ],
  ]
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "分类趋势与业务对照" [level=1] [ref=e8]
      - generic [ref=e9]: 共享候选 · 未发布 · 待视觉审阅
    - paragraph [ref=e10]: 按学期、学院、知识点层级和版本比较，保留每个类别的身份、单位和原始读数。
  - generic [ref=e11]:
    - generic [ref=e12]:
      - text: 业务场景
      - combobox "分类业务场景" [ref=e13]:
        - option "全部场景"
        - option "学期趋势"
        - option "学院数量与占比"
        - option "层级堆叠与覆盖率"
        - option "周期对照" [selected]
        - option "版本变化"
        - option "版本评分"
    - generic [ref=e14]:
      - text: 数据状态
      - combobox "分类数据状态" [ref=e15]:
        - option "正常"
        - option "全零"
        - option "局部缺测" [selected]
        - option "无数据"
        - option "单项"
        - option "长名称"
        - option "无效数据"
    - generic [ref=e16]:
      - text: 配色
      - combobox "分类图表配色" [ref=e17]:
        - option "蓝灰单色" [selected]
        - option "蓝紫近邻"
        - option "多色类别"
    - button "更新数据" [ref=e18] [cursor=pointer]
    - button "重播动效" [ref=e20] [cursor=pointer]
    - button "反转类别顺序" [ref=e22] [cursor=pointer]
  - status [ref=e24]: 示例数据 · 更新 1 次 · 已按系统设置减少动效
  - region [ref=e26]:
    - generic [ref=e27]:
      - generic [ref=e28]: CH-049
      - heading "本期与上期学习对照" [level=2] [ref=e29]
    - paragraph [ref=e30]: 本例按周期内第几天对齐；按星期或教学周比较时，需要另行确定对应位置。两个面积叠加对照，不累计；两期保留各自日期，上期第5天尚无记录，保持缺测。
    - region "本期与上期学习对照图表，可横向滚动" [ref=e31]:
      - generic [ref=e33]:
        - generic:
          - generic:
            - generic: 0次
            - generic: 20次
            - generic: 40次
            - generic: 60次
        - generic:
          - generic: 第1天
          - generic: 第2天
          - generic: 第3天
          - generic: 第4天
          - generic: 第5天
    - generic [ref=e48]:
      - generic [ref=e49] [cursor=pointer]: 本期学习次数 · 次
      - generic [ref=e53] [cursor=pointer]: 上期学习次数 · 次
    - group [ref=e57]:
      - generic "查看精确数据 · 本期与上期学习对照" [active] [ref=e58] [cursor=pointer]
      - region "本期与上期学习对照精确读数，可横向滚动" [ref=e59]:
        - table "本期与上期学习对照 · 精确数据" [ref=e60]:
          - caption [ref=e61]: 本期与上期学习对照 · 精确数据
          - rowgroup [ref=e62]:
            - row [ref=e63]:
              - columnheader "类别" [ref=e64]
              - columnheader "本期原始日期" [ref=e65]
              - columnheader "上期原始日期" [ref=e66]
              - columnheader "本期学习次数 · 次" [ref=e67]
              - columnheader "上期学习次数 · 次" [ref=e68]
          - rowgroup [ref=e69]:
            - row [ref=e70]:
              - rowheader "第1天" [ref=e71]
              - cell "2026-12-30" [ref=e72]
              - cell "2026-12-23" [ref=e73]
              - cell "32" [ref=e74]
              - cell "28" [ref=e75]
            - row [ref=e76]:
              - rowheader "第2天" [ref=e77]
              - cell "2026-12-31" [ref=e78]
              - cell "2026-12-24" [ref=e79]
              - cell "缺测" [ref=e80]
              - cell "缺测" [ref=e81]
            - row [ref=e82]:
              - rowheader "第3天" [ref=e83]
              - cell "2027-01-01" [ref=e84]
              - cell "2026-12-25" [ref=e85]
              - cell "26" [ref=e86]
              - cell "42" [ref=e87]
            - row [ref=e88]:
              - rowheader "第4天" [ref=e89]
              - cell "2027-01-02" [ref=e90]
              - cell "2026-12-26" [ref=e91]
              - cell "44" [ref=e92]
              - cell "36" [ref=e93]
            - row [ref=e94]:
              - rowheader "第5天" [ref=e95]
              - cell "2027-01-03" [ref=e96]
              - cell "无观测日期" [ref=e97]
              - cell "60" [ref=e98]
              - cell "缺测" [ref=e99]
  - group [ref=e100]:
    - generic "分类图表配置、完整源码与示例数据" [ref=e101]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-business/category-examples.tsx"
    - option "chart-business/comparison-data.ts"
    - option "chart-business/category-page.css"
```

# Test source

```ts
  49  | async function realTooltip(page:Page,host:Locator,rows:any[],label:string,keys:string[],official=false){
  50  |  const plot=host.locator('.rain-chart-plot,.rain-chart-mini-plot').first();await plot.scrollIntoViewIfNeeded();const box=(await plot.boundingBox())!;
  51  |  const tooltip=host.locator('.rain-chart-tooltip');
  52  |  await expect(async()=>{await page.mouse.move(0,0);await page.mouse.move(box.x+Math.min(80,box.width/3),box.y+box.height/2);await expect(tooltip).toBeVisible({timeout:100});}).toPass({timeout:5000,intervals:[50]});
  53  |  const text=(await tooltip.textContent())??'';const date=text.match(/9月(\d+)日/);expect(date,`${label}: actual tooltip date`).toBeTruthy();
  54  |  const source=rows.find(row=>row.date===Number(date![1]));expect(source,`${label}: tooltip date belongs to actual data`).toBeDefined();
  55  |  const valueTexts=await tooltip.locator('span.tabular-nums').allTextContents();
  56  |  const expected=keys.map(key=>key==='rate'?`${Number(source[key]).toFixed(1)}${official?' ':''}%`:`${source[key]} 人`);
  57  |  expect(valueTexts,`${label}: each tooltip series matches the original count or displayed full-precision rate`).toEqual(expected);
  58  |  await page.mouse.move(0,0);return{text,date:Number(date![1]),valueTexts};
  59  | }
  60  | async function compareBaseline(id:string,facts:any){const before=JSON.parse(await readFile(`${beforeFolder}/${id}.json`,'utf8'));expect(presentation(facts),`${id}: colors, widths, fill, typography, legends, dates and viewport`).toEqual(presentation(before));}
  61  | async function save(name:string,value:any){await mkdir(folder,{recursive:true});await writeFile(`${folder}/${name}.json`,JSON.stringify(value,null,2));}
  62  | async function markersAndTail(host:Locator){
  63  |  const facts=await host.evaluate(node=>{
  64  |   const circles=[...node.querySelectorAll('svg circle')];const reference=node.querySelector('svg path[stroke-dasharray="6,4"]') as SVGGraphicsElement|null;const origin=reference?.getCTM()?.e??0;
  65  |   const xs=[...new Set(circles.map(circle=>Number(((circle as SVGGraphicsElement).getCTM()?.e??0)-origin)))].sort((a,b)=>a-b);
  66  |   const tails=[...node.querySelectorAll('svg path[stroke-dasharray]')].filter(path=>path.getAttribute('stroke-dasharray')==='6,4').map(path=>{const id=(path.getAttribute('clip-path')??'').match(/#([^)]*)/)?.[1];const clip=id?document.getElementById(id)?.querySelector('rect'):null;return{strokeWidth:Number(path.getAttribute('stroke-width')),clipStart:Number(clip?.getAttribute('x'))};});return{circles:circles.length,xs,tails};
  67  |  });
  68  |  expect(facts.circles).toBe(28);expect(facts.xs).toHaveLength(7);expect(facts.tails).toHaveLength(2);for(const tail of facts.tails)expect(tail.clipStart).toBeCloseTo(facts.xs[4]!-tail.strokeWidth,4);return facts;
  69  | }
  70  | 
  71  | for(const width of[1440,390])for(const mode of['no-preference','reduce'] as const){
  72  |  const reduced=mode==='reduce';
  73  |  test.describe(`${width}px ${mode}`,()=>{
  74  |   test.beforeEach(async({page})=>{await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:mode});await page.clock.setFixedTime(new Date('2026-10-11T00:00:00+08:00'));});
  75  |   test('default line, area and composed retain reads, geometry and state behavior',async({page})=>{
  76  |    test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  77  |    try{for(const family of shapes){
  78  |     await page.goto(`/?curve-refinement=${runName}#chart-${family}`);await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('category-near');
  79  |     const host=page.locator(`[data-rain-id="chart-${family}"]`),controls=page.locator('[data-chart-default-controls]');
  80  |     const keys=family==='composed'?['enrolled','rate']:['enrolled','completed','returned'];
  81  |     let rows=await timeline(page,0);const normal=await idle(host,reduced);geometry(normal,keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${family}-normal`);await compareBaseline(`default-${family}-${width}-reduce-category-near`,normal);
  82  |     const tooltipKeys=family==='composed'?['enrolled','completed','rate']:keys;
  83  |     const initialTooltip=await realTooltip(page,host,rows,`${family}-normal`,tooltipKeys);facts.push({family,state:'normal',revision:0,observed:normal,tooltip:initialTooltip});
  84  |     await controls.getByRole('button',{name:'更新数据',exact:true}).click();rows=await timeline(page,1);const updated=await idle(host,reduced);geometry(updated,keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${family}-updated`);expect(presentation(updated)).toEqual(presentation(normal));expect(updated.table).not.toEqual(normal.table);
  85  |     expect(updated.paths.map((p:any)=>p.d)).not.toEqual(normal.paths.map((p:any)=>p.d));
  86  |     facts.push({family,state:'normal',revision:1,observed:updated,tooltip:await realTooltip(page,host,rows,`${family}-updated`,tooltipKeys)});
  87  |     await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await idle(host,reduced);expect(replay.paths.map((p:any)=>p.d)).toEqual(updated.paths.map((p:any)=>p.d));expect(presentation(replay)).toEqual(presentation(updated));facts.push({family,state:'replay',revision:1,observed:replay});
  88  |     for(const state of['missing','zero','single']){
  89  |      await controls.getByRole('combobox',{name:'示例状态',exact:true}).selectOption(state);const current=await idle(host,reduced);expect(current.finite).toBe(true);expect(current.documentWidth).toBeLessThanOrEqual(width+1);
  90  |      const stateRows=await timeline(page,1,state);expect(current.table).toHaveLength(stateRows.length);
  91  |      if(state==='missing')expect((await host.textContent())??'').toMatch(/缺测|不适用/);
  92  |      if(state==='zero'){geometry(current,0,`${family}-zero`);if(family==='composed')await expect(host).toContainText('完成率不适用');}
  93  |      if(state==='single')expect(current.table).toHaveLength(1);
  94  |      facts.push({family,state,revision:1,observed:current});
  95  |     }
  96  |    }}finally{const sourcesAfter=await hashSources();await save(`default-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  97  |    expect(errors).toEqual([]);
  98  |   });
  99  | 
  100 |   test('representative official area, dual-axis line and markers keep their actual native path and interactions',async({page})=>{
  101 |    test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  102 |    try{for(const item of official){
  103 |     await page.goto(`/?curve-refinement=${runName}#chart-${item.family}`);await page.getByRole('combobox',{name:'视觉配方',exact:true}).selectOption('monochrome-blue');
  104 |     const host=page.locator(`[data-chart-variant="${item.id}"]`);await host.scrollIntoViewIfNeeded();await expect(host.locator('[data-ready="true"]')).toBeVisible();
  105 |     let rows=await timeline(page,0);if('markers'in item&&item.markers)rows=rows.slice(0,7);const normal=await idle(host,reduced);geometry(normal,'markers'in item&&item.markers?turns(rows.map((row:any)=>row.returned)):item.keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${item.id}-normal`);await compareBaseline(`official-${item.id}-${width}-reduce-monochrome-blue`,normal);
  106 |     if('markers'in item&&item.markers)await markersAndTail(host);
  107 |     if(item.id.includes('dual'))await expect(host).toContainText('%');
  108 |     const tooltipKeys='markers'in item&&item.markers?['enrolled','returned']:item.keys;
  109 |     facts.push({id:item.id,revision:0,observed:normal,tooltip:await realTooltip(page,host,rows,item.id,[...tooltipKeys],true)});
  110 |     await host.getByRole('button',{name:'更新数据',exact:true}).click();rows=await timeline(page,1);if('markers'in item&&item.markers)rows=rows.slice(0,7);const updated=await idle(host,reduced);geometry(updated,'markers'in item&&item.markers?turns(rows.map((row:any)=>row.returned)):item.keys.map(key=>turns(rows.map((row:any)=>row[key]))),`${item.id}-updated`);expect(presentation(updated)).toEqual(presentation(normal));expect(updated.paths.map((p:any)=>p.d)).not.toEqual(normal.paths.map((p:any)=>p.d));facts.push({id:item.id,revision:1,observed:updated,tooltip:await realTooltip(page,host,rows,`${item.id}-updated`,[...tooltipKeys],true)});
  111 |     await host.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await idle(host,reduced);expect(replay.paths.map((p:any)=>p.d)).toEqual(updated.paths.map((p:any)=>p.d));expect(presentation(replay)).toEqual(presentation(updated));if('markers'in item&&item.markers)await markersAndTail(host);facts.push({id:item.id,state:'replay',observed:replay});
  112 |    }}finally{const sourcesAfter=await hashSources();await save(`official-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  113 |    expect(errors).toEqual([]);
  114 |   });
  115 | 
  116 |   test('mini line and area retain both native sizes, shared readings, states and replay',async({page})=>{
  117 |    test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  118 |    try{
  119 |     await page.goto(`/?curve-refinement=${runName}#chart-business`);const gallery=page.locator('.rain-business-mini-gallery'),controls=page.locator('.rain-business-controls');
  120 |     const take=async(state:string,revision:number)=>{const samples:any[]=[];const values=await miniValues(page,revision,state);for(const kind of['line','area'])for(const size of['compact','comfortable']){
  121 |      const slot=gallery.locator(`[data-mini-kind="${kind}"][data-size="${size}"]`),figure=slot.locator('xpath=ancestor::figure');await slot.scrollIntoViewIfNeeded();await expect(slot).toBeVisible();
  122 |      let current:any;if(state==='missing'){await expect(slot).toHaveAttribute('data-mini-state','missing');current=await observed(figure);expect(current.paths).toHaveLength(0);}else{current=await idle(figure,reduced);geometry(current,turns(values),`mini-${kind}-${size}-${state}`);}
  123 |      const box=await slot.locator('.rain-business-mini-slot').boundingBox();expect(box!.width).toBe(size==='compact'?96:128);expect(box!.height).toBe(size==='compact'?32:48);
  124 |      const caption=await figure.evaluate(node=>document.getElementById(node.getAttribute('aria-describedby')!)?.textContent??'');expect(caption).toBeTruthy();
  125 |      // MiniTrend is deliberately decorative and has no tooltip part in its contract.
  126 |      expect(await slot.locator('.rain-chart-tooltip').count()).toBe(0);if(state==='normal'&&revision===0)await compareBaseline(`mini-${kind}-${size}-${width}-reduce-monochrome-blue`,current);
  127 |      samples.push({kind,size,caption,observed:current});
  128 |     }expect(samples[0].caption).toBe(samples[1].caption);expect(samples[2].caption).toBe(samples[3].caption);facts.push({state,revision,samples});return samples;};
  129 |     const normal=await take('normal',0);await controls.getByRole('button',{name:'更新数据',exact:true}).click();const updated=await take('normal',1);
  130 |     updated.forEach((sample,index)=>{expect(presentation(sample.observed)).toEqual(presentation(normal[index].observed));expect(sample.observed.paths.map((p:any)=>p.d)).not.toEqual(normal[index].observed.paths.map((p:any)=>p.d));});
  131 |     await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await take('normal',1);replay.forEach((sample,index)=>expect(sample.observed.paths.map((p:any)=>p.d)).toEqual(updated[index].observed.paths.map((p:any)=>p.d)));
  132 |     for(const state of['zero','missing','single']){await controls.getByRole('combobox',{name:'业务数据状态',exact:true}).selectOption(state);await take(state,1);}
  133 |    }finally{const sourcesAfter=await hashSources();await save(`mini-${width}-${mode}`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  134 |    expect(errors).toEqual([]);
  135 |   });
  136 |  });
  137 | }
  138 | 
  139 | for(const width of[1440,390])test(`${width}px reduce: category area curves retain all original points, exact tables and missing boundaries`,async({page})=>{
  140 |  test.setTimeout(90000);const facts:any[]=[];const errors:string[]=[];page.on('pageerror',e=>errors.push(String(e)));const sourcesBefore=await hashSources();
  141 |  await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await page.clock.setFixedTime(new Date('2026-10-11T00:00:00+08:00'));
  142 |  const raw=async(id:string,revision:number,state:string)=>page.evaluate(async({id,revision,state})=>{const modulePath='/src/docs/components/chart-business/comparison-data.ts';const module=await import(/* @vite-ignore */modulePath);return module.makeCategoryFixtures(revision,state).find((fixture:any)=>fixture.id===id);},{id,revision,state});
  143 |  try{for(const id of['semester','period','version']){
  144 |   await page.goto(`/?curve-refinement=${runName}#chart-category`);const controls=page.locator('.rain-category-controls');await controls.getByRole('combobox',{name:'分类业务场景',exact:true}).selectOption(id);
  145 |   const host=page.locator(`[data-category-example="${id}"]`);await host.locator('summary').click();
  146 |   const take=async(revision:number,state:string)=>{
  147 |    const fixture=await raw(id,revision,state),current=await idle(host,true);expect(current.finite).toBe(true);expect(current.documentWidth).toBeLessThanOrEqual(width+1);expect(current.paths).toHaveLength(fixture.series.length);
  148 |    const expectedRows=fixture.rows.map((row:any)=>[row.label,...(id==='period'?[row.currentDate??'无观测日期',row.previousDate??'无观测日期']:[]),...fixture.series.map((series:any)=>row[series.key]===null?'缺测':String(row[series.key]))]);
> 149 |    expect(await host.locator('tbody tr').evaluateAll(rows=>rows.map(row=>[...row.querySelectorAll('th,td')].map(cell=>cell.textContent?.trim())))).toEqual(expectedRows);
      |                                                                                                                                                    ^ Error: expect(received).toEqual(expected) // deep equality
  150 |    for(const [index,path]of current.paths.entries()){
  151 |     const sourceCount=fixture.rows.filter((row:any)=>row[fixture.series[index].key]!==null).length;expect((path.d.match(/[MCL]/gi)??[]).length,`${id} ${state}: actual native stroke retains every non-null original point`).toBe(sourceCount);expect(path.xMonotone).toBe(true);
  152 |     if(state==='zero')expect(path.extrema).toBe(0);if(state==='missing'&&id!=='period')expect(path.subpaths).toBe(2);
  153 |    }
  154 |    facts.push({id,revision,state,sourceRows:fixture.rows,sourceSeries:fixture.series,observed:current});return{fixture,current};
  155 |   };
  156 |   const normal=await take(0,'normal');await capture(page,host,`category-${id}-${width}-reduce-normal`,`${folder}/category`);
  157 |   const viewport=host.locator('.rain-category-scroll');await viewport.scrollIntoViewIfNeeded();const box=(await viewport.boundingBox())!;const tooltip=host.locator('.rain-category-tooltip');
  158 |   await expect(async()=>{await page.mouse.move(0,0);await page.mouse.move(box.x+Math.min(150,box.width/2),box.y+100);await expect(tooltip).toBeVisible({timeout:100});}).toPass({timeout:5000,intervals:[50]});
  159 |   const tooltipText=(await tooltip.textContent())??'',point=normal.fixture.rows.find((row:any)=>tooltipText.includes(row.label));expect(point).toBeTruthy();expect(await tooltip.locator('span.tabular-nums').allTextContents()).toEqual(normal.fixture.series.map((series:any)=>point[series.key]===null?'缺测':`${point[series.key]}${series.unit}`));
  160 |   if(id==='period'){expect(tooltipText).toContain(point.currentDate??'无观测日期');expect(tooltipText).toContain(point.previousDate??'无观测日期');}
  161 |   await host.screenshot({path:`${folder}/category/category-${id}-${width}-tooltip.png`,animations:'disabled'});facts.push({id,state:'tooltip',tooltipText});await page.mouse.move(0,0);
  162 |   await controls.getByRole('button',{name:'更新数据',exact:true}).click();const updated=await take(1,'normal');expect(updated.current.paths.map((p:any)=>p.d)).not.toEqual(normal.current.paths.map((p:any)=>p.d));expect(presentation(updated.current)).toEqual(presentation(normal.current));
  163 |   await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await take(1,'normal');expect(replay.current.paths.map((p:any)=>p.d)).toEqual(updated.current.paths.map((p:any)=>p.d));
  164 |   for(const state of['zero','missing']){await controls.getByRole('combobox',{name:'分类数据状态',exact:true}).selectOption(state);await take(1,state);}
  165 |   if(width===390){const scroll=await viewport.evaluate(node=>({width:node.clientWidth,total:node.scrollWidth,overflow:getComputedStyle(node).overflowX}));expect(scroll.total).toBeGreaterThan(scroll.width);expect(scroll.overflow).toBe('auto');}
  166 |  }}finally{const sourcesAfter=await hashSources();await save(`category-${width}-reduce`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  167 |  expect(errors).toEqual([]);
  168 | });
  169 | 
```