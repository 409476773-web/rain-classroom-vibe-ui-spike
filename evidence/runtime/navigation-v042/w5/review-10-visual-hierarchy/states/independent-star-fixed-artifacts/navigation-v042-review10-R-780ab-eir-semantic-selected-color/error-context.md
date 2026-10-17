# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review10.spec.ts >> R3 practice stays a brand action and stars retain their semantic selected color
- Location: tests/e2e/navigation-v042-review10.spec.ts:58:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 2

  Array [
-   55,
+   165,
+   91,
    0,
  ]
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件库" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - heading "导航组件 · v0.4.2" [level=1] [ref=e6]
    - link "R2 独立消费样本 ↗" [ref=e7] [cursor=pointer]:
      - /url: /navigation-v042-consumer.html
    - link "W3 独立消费样本 ↗" [ref=e8] [cursor=pointer]:
      - /url: /navigation-v042-w3-consumer.html
    - paragraph [ref=e9]: A1 · A4 · R2 人工视觉已通过 W3–W5 组合建设 · G2 待评审
  - generic [ref=e10]:
    - navigation "导航候选样本" [ref=e11]:
      - button "A1" [ref=e12]
      - button "A2" [ref=e13]
      - button "A3" [ref=e14]
      - button "A4" [ref=e15]
      - button "A5" [ref=e16]
      - button "Contents" [ref=e17]
      - button "White" [ref=e18]
      - button "Connections" [ref=e19]
      - button "R1" [ref=e20]
      - button "R2" [ref=e21]
      - button "R3" [ref=e22]
      - button "R4" [ref=e23]
      - button "R5" [ref=e24]
      - button "R6" [ref=e25]
      - button "S1" [ref=e26]
      - button "S2" [ref=e27]
      - button "S3" [ref=e28]
      - button "S4" [ref=e29]
      - button "S5" [ref=e30]
      - button "S6" [ref=e31]
    - generic [ref=e32]:
      - text: 画板宽度
      - combobox "画板宽度" [ref=e33]:
        - option "1200"
        - option "1440" [selected]
        - option "1600"
    - generic [ref=e34]:
      - text: 连接
      - combobox "连接" [ref=e35]:
        - option "内缩 inset" [selected]
        - option "贴边 merged"
    - generic [ref=e36]:
      - text: 表面
      - combobox "表面" [ref=e37]:
        - option "中性底" [selected]
        - option "白底轮廓"
    - generic [ref=e38]:
      - text: 可见范围
      - combobox "可见范围" [ref=e39]:
        - option "3"
        - option "4" [selected]
        - option "5"
    - generic [ref=e40]:
      - text: 业务子场景
      - combobox "业务子场景" [ref=e41]:
        - option "云盘"
        - option "错题集" [selected]
    - link "打开认可原稿 ↗" [ref=e42] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R3
  - generic "R3 工作区" [ref=e45]:
    - generic [ref=e47]:
      - generic [ref=e48]:
        - button "展开平台导航" [ref=e49] [cursor=pointer]
        - button "隐藏资源目录" [expanded] [ref=e51] [cursor=pointer]
        - generic [ref=e53]:
          - strong [ref=e54]: 错题集 · 1.2 极限与连续
          - generic [ref=e55]: 当前范围不随目录隐藏改变
        - button "布局" [ref=e56] [cursor=pointer]
        - button "专注内容" [ref=e57] [cursor=pointer]
      - generic [ref=e58]:
        - generic "平台导航" [ref=e60]:
          - generic [ref=e61]:
            - strong [ref=e62]
            - navigation "平台功能" [ref=e64]:
              - list [ref=e65]:
                - listitem [ref=e66]:
                  - link "工作台" [ref=e68] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e71]:
                  - link "课程" [ref=e73] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e76]:
                  - link "资源" [ref=e78] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e81]:
                  - link "专业" [ref=e83] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - generic [ref=e86]:
              - button "通知" [ref=e89] [cursor=pointer]
              - button "帮助" [ref=e91] [cursor=pointer]
        - generic [ref=e93]:
          - generic [ref=e94]:
            - generic [ref=e95]:
              - strong [ref=e98]: 我的资源
              - button "切换资源空间" [ref=e99] [cursor=pointer]
            - navigation "资源功能" [ref=e102]:
              - generic [ref=e103]:
                - link "云盘" [ref=e104] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "题库" [ref=e108] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "课件库" [ref=e112] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "试卷库" [ref=e116] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "问卷库" [ref=e120] [cursor=pointer]:
                  - /url: "#navigation-v042"
            - button "成员" [ref=e125] [cursor=pointer]
          - generic [ref=e131]:
            - generic "资源目录" [ref=e133]:
              - heading [level=3] [ref=e134]:
                - text: 资源目录
                - generic [ref=e135]:
                  - button "取消固定资源目录" [ref=e136] [cursor=pointer]
                  - button "隐藏资源目录" [ref=e139] [cursor=pointer]
              - generic [ref=e142]:
                - heading "错题集" [level=4] [ref=e143]
                - paragraph [ref=e144]: 练习结果不影响原始成绩
              - generic [ref=e145]:
                - generic "分区导航" [ref=e146]:
                  - tablist "目录内容" [ref=e150]:
                    - tab "学习目录" [selected] [ref=e151] [cursor=pointer]
                    - tab "学习日志" [ref=e155] [cursor=pointer]
                - tabpanel "学习目录" [ref=e160]:
                  - tree "学习目录导航" [ref=e161]:
                    - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e162]:
                      - generic [ref=e163]:
                        - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e164] [cursor=pointer]
                        - generic "第一章 · 函数、极限与连续" [ref=e169]
                        - generic [ref=e170]: "20"
                    - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e171]:
                      - generic [ref=e172]:
                        - button "收起1.1 函数的基本概念" [expanded] [ref=e173] [cursor=pointer]
                        - generic "1.1 函数的基本概念" [ref=e178]
                        - generic [ref=e179]: "6"
                    - treeitem "函数的定义与表示" [level=3] [ref=e180]:
                      - generic [ref=e181]:
                        - generic [ref=e182]: 讲义
                        - generic "函数的定义与表示" [ref=e189]
                        - generic [ref=e190]: "2"
                    - treeitem "函数的性质" [level=3] [ref=e191]:
                      - generic [ref=e192]:
                        - generic [ref=e193]: 视频
                        - generic "函数的性质" [ref=e200]
                        - generic [ref=e201]: "4"
                    - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e202]:
                      - generic [ref=e203]:
                        - button "收起1.2 极限与连续" [expanded] [ref=e204] [cursor=pointer]
                        - generic "1.2 极限与连续" [ref=e209]
                        - generic [ref=e210]: "8"
                    - treeitem "数列极限" [expanded] [level=3] [ref=e211]:
                      - generic [ref=e212]:
                        - button "收起数列极限" [expanded] [ref=e213] [cursor=pointer]
                        - generic "数列极限" [ref=e218]
                        - generic [ref=e219]: "3"
                    - treeitem "极限的定义" [level=4] [ref=e220]:
                      - generic [ref=e221]:
                        - generic [ref=e222]: 讲义
                        - generic "极限的定义" [ref=e229]
                        - generic [ref=e230]: "1"
                    - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e231]:
                      - generic [ref=e232]:
                        - button "收起收敛性与极限运算" [expanded] [ref=e233] [cursor=pointer]
                        - generic "收敛性与极限运算" [ref=e238]
                        - generic [ref=e239]: "2"
                    - treeitem "两个重要极限" [expanded] [level=5] [ref=e240]:
                      - generic [ref=e241]:
                        - button "收起两个重要极限" [expanded] [ref=e242] [cursor=pointer]
                        - generic "两个重要极限" [ref=e247]
                        - generic [ref=e248]: "2"
                    - treeitem "常见题型与方法" [expanded] [level=6] [ref=e249]:
                      - generic [ref=e250]:
                        - button "收起常见题型与方法" [expanded] [ref=e251] [cursor=pointer]
                        - generic "常见题型与方法" [ref=e256]
                        - generic [ref=e257]: "2"
                    - treeitem "例题与拓展练习" [level=7] [ref=e258]:
                      - generic [ref=e259]:
                        - generic [ref=e260]: 作业
                        - generic "例题与拓展练习" [ref=e267]
                        - generic [ref=e268]: "2"
                    - treeitem "函数的连续性" [level=3] [ref=e269]:
                      - generic [ref=e270]:
                        - generic [ref=e271]: 讲义
                        - generic "函数的连续性" [ref=e278]
                        - generic [ref=e279]: "5"
                    - treeitem "1.3 习题与应用" [level=2] [ref=e280]:
                      - generic [ref=e281]:
                        - generic [ref=e282]: 作业
                        - generic "1.3 习题与应用" [ref=e289]
                        - generic [ref=e290]: "6"
                    - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e291]:
                      - generic [ref=e292]:
                        - button "收起第二章 · 导数与微分" [expanded] [ref=e293] [cursor=pointer]
                        - generic "第二章 · 导数与微分" [ref=e298]
                        - generic [ref=e299]: "16"
                    - treeitem "2.1 导数的概念" [level=2] [ref=e300]:
                      - generic [ref=e301]:
                        - generic [ref=e302]: 讲义
                        - generic "2.1 导数的概念" [ref=e309]
                        - generic [ref=e310]: "8"
                    - treeitem "2.2 导数的应用" [level=2] [ref=e311]:
                      - generic [ref=e312]:
                        - generic [ref=e313]: 考试
                        - generic "2.2 导数的应用" [ref=e320]
                        - generic [ref=e321]: "8"
                    - generic [ref=e322]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                    - status [ref=e323]
            - separator "调整资源目录宽度" [ref=e324]
            - generic [ref=e326]:
              - generic [ref=e327]:
                - generic "资源路径" [ref=e328]:
                  - navigation "面包屑" [ref=e329]:
                    - list [ref=e330]:
                      - listitem [ref=e331]:
                        - generic [ref=e332]: 学习目录
                      - listitem [ref=e333]:
                        - generic [ref=e334]: /
                        - generic [ref=e335]: 第一章 · 函数、极限与连续
                      - listitem [ref=e336]:
                        - generic [ref=e337]: /
                        - generic [ref=e338]: 1.2 极限与连续
                - generic [ref=e339]:
                  - generic [ref=e340]:
                    - heading "1.2 极限与连续" [level=3] [ref=e341]
                    - paragraph [ref=e342]: 基于当前知识范围整理练习状态。
                  - button "开始练习" [ref=e343] [cursor=pointer]
              - generic [ref=e347]:
                - radiogroup "习题练习状态" [ref=e349]:
                  - generic [ref=e351]:
                    - generic [ref=e352] [cursor=pointer]:
                      - radio "全部" [checked] [ref=e353]
                      - generic [ref=e354]: 全部
                      - generic [ref=e355]: "6"
                    - generic [ref=e356] [cursor=pointer]:
                      - radio "未练对" [ref=e357]
                      - generic [ref=e358]: 未练对
                      - generic [ref=e359]: "4"
                    - generic [ref=e360] [cursor=pointer]:
                      - radio "已练对" [ref=e361]
                      - generic [ref=e362]: 已练对
                      - generic [ref=e363]: "2"
                    - generic [ref=e364] [cursor=pointer]:
                      - radio "加星" [ref=e365]
                      - generic [ref=e366]: 加星
                      - generic [ref=e367]: "4"
                - generic [ref=e368]:
                  - generic [ref=e369]: 当前范围 · 6 道示例习题
                  - textbox "搜索习题内容" [ref=e373]
                - table "当前范围习题" [ref=e375]:
                  - rowgroup [ref=e376]:
                    - row [ref=e377]:
                      - columnheader "序号" [ref=e378]
                      - columnheader "题型" [ref=e379]
                      - columnheader "习题内容" [ref=e380]
                      - columnheader "难度" [ref=e381]
                      - columnheader "来源" [ref=e382]
                      - columnheader "加星" [ref=e383]
                  - rowgroup [ref=e384]:
                    - row [ref=e385]:
                      - cell "1" [ref=e386]
                      - cell "单选" [ref=e387]
                      - cell "若函数在某点可导，以下关于该点连续性的结论正确的是？" [ref=e391]
                      - cell "基础" [ref=e392]
                      - cell "试卷" [ref=e393]
                      - cell [ref=e397]:
                        - button "取消加星 · 第 1 题" [pressed] [ref=e398] [cursor=pointer]
                    - row [ref=e400]:
                      - cell "2" [ref=e401]
                      - cell "多选" [ref=e402]
                      - cell "下列关于极限运算法则的表述中，哪些条件是必要的？" [ref=e406]
                      - cell "中等" [ref=e407]
                      - cell "作业" [ref=e408]
                      - cell [ref=e412]:
                        - button "取消加星 · 第 2 题" [active] [pressed] [ref=e413] [cursor=pointer]
                    - row [ref=e415]:
                      - cell "3" [ref=e416]
                      - cell "判断" [ref=e417]
                      - cell "函数在某一点连续，则该函数在该点一定可导。" [ref=e421]
                      - cell "基础" [ref=e422]
                      - cell "课堂" [ref=e423]
                      - cell [ref=e427]:
                        - button "添加加星 · 第 3 题" [ref=e428] [cursor=pointer]
                    - row [ref=e430]:
                      - cell "4" [ref=e431]
                      - cell "单选" [ref=e432]
                      - cell "在下列区间中，函数满足闭区间上连续函数性质的是？" [ref=e436]
                      - cell "中等" [ref=e437]
                      - cell "试卷" [ref=e438]
                      - cell [ref=e442]:
                        - button "取消加星 · 第 4 题" [pressed] [ref=e443] [cursor=pointer]
                    - row [ref=e445]:
                      - cell "5" [ref=e446]
                      - cell "填空" [ref=e447]
                      - cell "根据导数的定义，写出给定函数在指定点的导数表达式。" [ref=e451]
                      - cell "提升" [ref=e452]
                      - cell "作业" [ref=e453]
                      - cell [ref=e457]:
                        - button "取消加星 · 第 5 题" [pressed] [ref=e458] [cursor=pointer]
                    - row [ref=e460]:
                      - cell "6" [ref=e461]
                      - cell "多选" [ref=e462]
                      - cell "以下哪些情形可以使用洛必达法则计算函数的极限？" [ref=e466]
                      - cell "中等" [ref=e467]
                      - cell "课堂" [ref=e468]
                      - cell [ref=e472]:
                        - button "添加加星 · 第 6 题" [ref=e473] [cursor=pointer]
                - generic [ref=e475]:
                  - generic [ref=e476]: 状态筛选不等于内容页面层级
                  - generic [ref=e477]: 1 · 单页演示数据
                - status [ref=e478]
  - generic [ref=e479]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import { test, expect, type Locator, type Page } from '@playwright/test';
  2  | 
  3  | async function open(page:Page,sample:string,width=1440,scene?:string){
  4  |  await page.goto(`/?sample=${sample}#navigation-v042`);
  5  |  await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();
  6  |  await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  7  |  if(scene)await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
  8  |  return page.locator('.rain-workspace').first();
  9  | }
  10 | const paint=(el:Locator)=>el.evaluate(e=>{const s=getComputedStyle(e);return {color:s.color,weight:s.fontWeight,radius:s.borderRadius,border:s.borderBottomColor,size:s.fontSize};});
  11 | const rgb=(value:string)=>{const parts=value.match(/[\d.]+/g)?.map(Number);if(parts?.length===4&&value.includes('%'))parts[3]=parts[3]!/100;return parts;};
  12 | const token=(el:Locator,name:string)=>el.evaluate((e,name)=>getComputedStyle(e).getPropertyValue(name).trim(),name);
  13 | 
  14 | for(const width of [1200,1440,1600]){
  15 |  test(`R3 ${width} neutral actions, soft table hierarchy and primary file identity coexist`,async({page})=>{
  16 |   const root=await open(page,'R3',width,'files');
  17 |   for(const label of ['成员','上传文件']){
  18 |    const button=root.getByRole('button',{name:label,exact:true});
  19 |    await expect(button).toHaveAttribute('data-variant','tertiary');
  20 |    expect((await paint(button)).radius).toBe(await token(button,'--rain-button-small-radius'));
  21 |    expect(await button.evaluate(e=>e.getBoundingClientRect().height)).toBe(32);
  22 |    for(const part of ['label','leading-icon'])expect(rgb((await paint(button.locator(`[data-slot="${part}"]`))).color)).toEqual(rgb(await token(button,part==='label'?'--rain-button-tertiary-text':'--rain-button-neutral-icon')));
  23 |   }
  24 |   const table=root.getByRole('table',{name:'云盘文件列表'}),heading=table.getByRole('columnheader',{name:'文件名',exact:true});
  25 |   expect((await paint(heading)).weight).toBe('400');
  26 |   expect(rgb((await paint(heading)).color)).toEqual(rgb(await token(heading,'--rain-category-text-neutral-5')));
  27 |   const cell=table.locator('tbody tr').first().locator('td').nth(1);
  28 |   expect(rgb((await paint(cell)).border)).toEqual(rgb(await token(cell,'--rain-category-border-neutral-4')));
  29 |   const name=table.getByRole('button',{name:'第一章 函数、极限与连续.pdf',exact:true});
  30 |   expect((await paint(name)).size).toBe('15px');
  31 |   expect(rgb((await paint(name)).color)).toEqual(rgb(await token(name,'--rain-category-text-neutral-1')));
  32 |   const query=root.getByRole('textbox',{name:'搜索当前范围内的文件'});await query.fill('教学大纲');await expect(table.locator('tbody tr')).toHaveCount(1);await query.fill('');
  33 |   await root.getByRole('button',{name:'上传文件',exact:true}).click();await expect(root.getByRole('status').filter({hasText:'上传为演示操作'})).toBeVisible();
  34 |  });
  35 |  test(`R3 ${width} auxiliary icons retain hover, keyboard focus and recovery`,async({page})=>{
  36 |   const root=await open(page,'R3',width,'files'),context=root.locator('.nv43-context');
  37 |   const hide=context.getByRole('button',{name:'隐藏资源目录',exact:true});
  38 |   expect(await hide.getAttribute('data-size')).toBe('24/14');
  39 |   expect(await hide.evaluate(e=>[e.getBoundingClientRect().width,e.getBoundingClientRect().height])).toEqual([24,24]);
  40 |   expect(await hide.locator('[data-rain-id="icon"]').evaluate(e=>[e.getBoundingClientRect().width,e.getBoundingClientRect().height])).toEqual([14,14]);
  41 |   expect(rgb((await paint(hide)).color)).toEqual(rgb(await token(hide,'--rain-category-icon-neutral-4')));
  42 |   await hide.hover();await expect.poll(async()=>rgb((await paint(hide)).color)).toEqual(rgb(await token(hide,'--rain-category-icon-neutral-2')));
  43 |   await page.mouse.move(1790,1090);await hide.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
  44 |   expect(await hide.evaluate(e=>e.matches(':focus-visible'))).toBe(true);
  45 |   expect(await hide.evaluate(e=>getComputedStyle(e).outlineStyle)).not.toBe('none');
  46 |   await page.keyboard.press('Enter');await expect(context).toBeHidden();
  47 |   await root.locator('.rain-workspace__restore[aria-controls$="-workspace-context"]').first().click();await expect(context).toBeVisible();
  48 |   await expect(root.getByRole('heading',{name:'全部文件',exact:true})).toBeVisible();
  49 |  });
  50 | }
  51 | test('R1 auxiliary text leaves graph and statistics readable, ordinary action remains functional',async({page})=>{
  52 |  const root=await open(page,'R1',1440,'plan'),action=root.getByRole('button',{name:'重新分析',exact:true});
  53 |  await expect(action).toHaveAttribute('data-variant','tertiary');await action.click();
  54 |  await expect(root.getByRole('status').filter({hasText:'示例已重新分析'})).toBeVisible();
  55 |  expect((await paint(root.locator('.nv43-statistics strong').first())).size).toBe('28px');
  56 |  const hint=root.locator('.nv43-context>small:last-child');expect(rgb((await paint(hint)).color)).toEqual(rgb(await token(hint,'--rain-category-text-neutral-6')));
  57 | });
  58 | test('R3 practice stays a brand action and stars retain their semantic selected color',async({page})=>{
  59 |  const root=await open(page,'R3',1440,'errors'),action=root.getByRole('button',{name:'开始练习',exact:true});
  60 |  await expect(action).toHaveAttribute('data-variant','secondary');expect((await paint(action)).radius).toBe('6px');
  61 |  const star=root.getByRole('button',{name:'添加加星 · 第 2 题',exact:true});
  62 |  expect(rgb((await paint(star)).color)).toEqual(rgb(await token(star,'--rain-category-icon-neutral-4')));
  63 |  await star.click();const selected=root.getByRole('button',{name:'取消加星 · 第 2 题',exact:true});await expect(selected).toHaveAttribute('aria-pressed','true');
> 64 |  expect(rgb((await paint(selected)).color)).toEqual(rgb(await token(selected,'--rain-color-semantic-warning')));
     |                                             ^ Error: expect(received).toEqual(expected) // deep equality
  65 | });
  66 | 
```