# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-curve-refinement.spec.ts >> 1440px reduce: category area curves retain all original points, exact tables and missing boundaries
- Location: tests/e2e/chart-curve-refinement.spec.ts:137:30

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 14
+ Received  +  0

@@ -112,21 +112,7 @@
        "12px",
        "400",
        "rgb(73, 93, 135)",
        "rgb(0, 0, 0)",
      ],
-     Array [
-       "\"PingFang SC\", \"Microsoft YaHei\", ui-sans-serif, sans-serif",
-       "12px",
-       "400",
-       "rgb(73, 93, 135)",
-       "rgb(0, 0, 0)",
-     ],
-     Array [
-       "\"PingFang SC\", \"Microsoft YaHei\", ui-sans-serif, sans-serif",
-       "12px",
-       "400",
-       "rgb(73, 93, 135)",
-       "rgb(0, 0, 0)",
-     ],
    ],
  }
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
        - option "学期趋势" [selected]
        - option "学院数量与占比"
        - option "层级堆叠与覆盖率"
        - option "周期对照"
        - option "版本变化"
        - option "版本评分"
    - generic [ref=e14]:
      - text: 数据状态
      - combobox "分类数据状态" [ref=e15]:
        - option "正常" [selected]
        - option "全零"
        - option "局部缺测"
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
    - button "更新数据" [active] [ref=e18] [cursor=pointer]
    - button "重播动效" [ref=e20] [cursor=pointer]
    - button "反转类别顺序" [ref=e22] [cursor=pointer]
  - status [ref=e24]: 示例数据 · 更新 1 次 · 已按系统设置减少动效
  - region [ref=e26]:
    - generic [ref=e27]:
      - generic [ref=e28]: CH-060
      - heading "学期课程参与趋势" [level=2] [ref=e29]
    - paragraph [ref=e30]: 横轴按学期顺序等距排列。人数是各学期独立统计，缺测保留断口。
    - region "学期课程参与趋势图表，可横向滚动" [ref=e31]:
      - generic [ref=e33]:
        - generic:
          - generic:
            - generic: 0人
            - generic: 100人
            - generic: 200人
            - generic: 300人
        - generic:
          - generic: 2024春
          - generic: 2024秋
          - generic: 2025春
          - generic: 2025秋
          - generic: 2026春
          - generic: 2026秋
    - generic [ref=e45]: 参与人数 · 人
    - group [ref=e50]:
      - generic "查看精确数据 · 学期课程参与趋势" [ref=e51] [cursor=pointer]
      - region "学期课程参与趋势精确读数，可横向滚动" [ref=e52]:
        - table "学期课程参与趋势 · 精确数据" [ref=e53]:
          - caption [ref=e54]: 学期课程参与趋势 · 精确数据
          - rowgroup [ref=e55]:
            - row [ref=e56]:
              - columnheader "类别" [ref=e57]
              - columnheader "参与人数 · 人" [ref=e58]
          - rowgroup [ref=e59]:
            - row [ref=e60]:
              - rowheader "2024春" [ref=e61]
              - cell "168" [ref=e62]
            - row [ref=e63]:
              - rowheader "2024秋" [ref=e64]
              - cell "224" [ref=e65]
            - row [ref=e66]:
              - rowheader "2025春" [ref=e67]
              - cell "192" [ref=e68]
            - row [ref=e69]:
              - rowheader "2025秋" [ref=e70]
              - cell "208" [ref=e71]
            - row [ref=e72]:
              - rowheader "2026春" [ref=e73]
              - cell "264" [ref=e74]
            - row [ref=e75]:
              - rowheader "2026秋" [ref=e76]
              - cell "232" [ref=e77]
  - group [ref=e78]:
    - generic "分类图表配置、完整源码与示例数据" [ref=e79]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-business/category-examples.tsx"
    - option "chart-business/comparison-data.ts"
    - option "chart-business/category-page.css"
```

# Test source

```ts
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
> 160 |   await controls.getByRole('button',{name:'更新数据',exact:true}).click();const updated=await take(1,'normal');expect(updated.current.paths.map((p:any)=>p.d)).not.toEqual(normal.current.paths.map((p:any)=>p.d));expect(presentation(updated.current)).toEqual(presentation(normal.current));
      |                                                                                                                                                                                                                                                      ^ Error: expect(received).toEqual(expected) // deep equality
  161 |   await controls.getByRole('button',{name:'重播动效',exact:true}).click();const replay=await take(1,'normal');expect(replay.current.paths.map((p:any)=>p.d)).toEqual(updated.current.paths.map((p:any)=>p.d));
  162 |   for(const state of['zero','missing']){await controls.getByRole('combobox',{name:'分类数据状态',exact:true}).selectOption(state);await take(1,state);}
  163 |   if(width===390){const scroll=await viewport.evaluate(node=>({width:node.clientWidth,total:node.scrollWidth,overflow:getComputedStyle(node).overflowX}));expect(scroll.total).toBeGreaterThan(scroll.width);expect(scroll.overflow).toBe('auto');}
  164 |  }}finally{const sourcesAfter=await hashSources();await save(`category-${width}-reduce`,{sourcesBefore,sourcesAfter,errors,facts});expect(sourcesAfter).toEqual(sourcesBefore);}
  165 |  expect(errors).toEqual([]);
  166 | });
  167 | 
```