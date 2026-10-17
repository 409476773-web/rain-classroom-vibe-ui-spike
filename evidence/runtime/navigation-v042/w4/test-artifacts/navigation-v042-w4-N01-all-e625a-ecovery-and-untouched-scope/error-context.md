# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w4.spec.ts >> N01 all-hidden R2 has stable named keyboard recovery and untouched scope
- Location: tests/e2e/navigation-v042-w4.spec.ts:5:1

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator: locator('.nv42-r2').locator('[data-region-id="context"]')
Expected: hidden
Error: strict mode violation: locator('.nv42-r2').locator('[data-region-id="context"]') resolved to 2 elements:
    1) <div inert="" hidden="" data-side="start" aria-label="课程导航" data-mode="hidden" data-forced="false" data-temporary="false" data-region-id="context" id="_r_1_-workspace-context" class="rain-workspace__region nv42-context">…</div> aka getByText('课程导航 返回我的课程MATHEMATICS / 2026')
    2) <div hidden="" tabindex="-1" role="separator" aria-valuemin="180" aria-valuemax="420" aria-valuenow="216" aria-label="调整课程导航宽度" data-region-id="context" aria-orientation="vertical" class="rain-workspace__splitter " aria-controls="_r_1_-workspace-context"></div> aka getByLabel('调整课程导航宽度')

Call log:
  - Expect "toBeHidden" with timeout 5000ms
  - waiting for locator('.nv42-r2').locator('[data-region-id="context"]')

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
      - button "S1" [ref=e23]
      - button "S2" [ref=e24]
      - button "S3" [ref=e25]
      - button "S4" [ref=e26]
      - button "S5" [ref=e27]
      - button "S6" [ref=e28]
    - generic [ref=e29]:
      - text: 画板宽度
      - combobox "画板宽度" [ref=e30]:
        - option "1200"
        - option "1440" [selected]
        - option "1600"
    - generic [ref=e31]:
      - text: 连接
      - combobox "连接" [ref=e32]:
        - option "内缩 inset" [selected]
        - option "贴边 merged"
    - generic [ref=e33]:
      - text: 表面
      - combobox "表面" [ref=e34]:
        - option "中性底" [selected]
        - option "白底轮廓"
    - generic [ref=e35]:
      - text: 可见范围
      - combobox "可见范围" [ref=e36]:
        - option "3"
        - option "4" [selected]
        - option "5"
    - link "打开认可原稿 ↗" [ref=e37] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R2
  - generic [ref=e42]:
    - generic [ref=e43]:
      - button "恢复平台导航" [ref=e44] [cursor=pointer]
      - button "恢复课程导航" [ref=e46] [cursor=pointer]
      - generic [ref=e48]:
        - strong [ref=e49]: 高等数学 A · 课程内容
        - generic [ref=e50]: 公共资源包
      - button "布局" [active] [ref=e51] [cursor=pointer]
      - button "专注内容" [ref=e53] [cursor=pointer]
    - generic [ref=e62]:
      - generic "分区导航" [ref=e64]:
        - generic [ref=e65]:
          - tablist "课程内容范围" [ref=e68]:
            - tab "公共资源包" [selected] [ref=e69] [cursor=pointer]:
              - generic [ref=e73]:
                - generic [ref=e74]: 公共内容 · 班级共用
                - generic [ref=e75]: 公共资源包
            - tab "2026 秋 · 高等数学 1 班" [ref=e77] [cursor=pointer]:
              - generic [ref=e81]:
                - generic [ref=e82]: 教学班 · 2026 秋季学期
                - generic [ref=e83]: 2026 秋 · 高等数学 1 班
            - tab "2026 秋 · 创新实验班" [ref=e85] [cursor=pointer]:
              - generic [ref=e89]:
                - generic [ref=e90]: 教学班 · 2026 秋季学期
                - generic [ref=e91]: 2026 秋 · 创新实验班
            - tab "2026 秋 · 高等数学 3 班" [ref=e93] [cursor=pointer]:
              - generic [ref=e97]:
                - generic [ref=e98]: 教学班 · 2026 秋季学期
                - generic [ref=e99]: 2026 秋 · 高等数学 3 班
          - button "更多班级" [ref=e102] [cursor=pointer]:
            - generic [ref=e104]: "197"
      - tabpanel "公共资源包" [ref=e108]:
        - generic [ref=e109]:
          - generic [ref=e110]:
            - navigation "面包屑" [ref=e112]:
              - list [ref=e113]:
                - listitem [ref=e114]:
                  - generic [ref=e115]: 课程内容
                - listitem [ref=e116]:
                  - generic [ref=e117]: /
                  - generic [ref=e118]: 公共资源包
            - generic [ref=e119]:
              - generic [ref=e120]:
                - heading "知识点总览" [level=3] [ref=e121]
                - paragraph [ref=e122]: 以知识点组织公共资源，在班级中安排教学。
              - button "预览学生端" [ref=e124] [cursor=pointer]
          - generic [ref=e128]:
            - generic [ref=e129]:
              - generic "已保存内容统计" [ref=e130]:
                - generic [ref=e131]: 7 级结构
                - generic [ref=e132]: 16 个内容节点
                - generic [ref=e133]: 36 个学习单元
              - radiogroup "内容类型" [ref=e134]:
                - radio "全部" [checked] [ref=e135] [cursor=pointer]
                - radio "作业" [ref=e136] [cursor=pointer]
                - radio "考试" [ref=e137] [cursor=pointer]
            - generic [ref=e138]:
              - generic [ref=e139]:
                - generic [ref=e140]: 编辑后请保存
                - button "内容编辑说明" [ref=e141] [cursor=pointer]
              - generic [ref=e144]:
                - generic [ref=e145]:
                  - button "退出编辑" [ref=e146] [cursor=pointer]
                  - button "添加根节点" [ref=e148] [cursor=pointer]
                  - button "保存草稿" [ref=e150] [cursor=pointer]
                - tree "课程内容编辑树" [ref=e152]:
                  - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e153]:
                    - generic [ref=e154]:
                      - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e155] [cursor=pointer]
                      - button "移动第一章 · 函数、极限与连续" [ref=e157] [cursor=pointer]
                      - generic "第一章 · 函数、极限与连续" [ref=e162]
                      - generic [ref=e164]:
                        - generic [ref=e165]: 20 个学习单元
                        - generic [ref=e166]: 09-24 更新
                  - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e167]:
                    - generic [ref=e168]:
                      - button "收起1.1 函数的基本概念" [expanded] [ref=e169] [cursor=pointer]
                      - button "移动1.1 函数的基本概念" [ref=e171] [cursor=pointer]
                      - generic "1.1 函数的基本概念" [ref=e176]
                      - generic [ref=e178]:
                        - generic [ref=e179]: 6 个学习单元
                        - generic [ref=e180]: 09-24 更新
                  - treeitem "函数的定义与表示" [level=3] [ref=e181]:
                    - generic [ref=e182]:
                      - button "移动函数的定义与表示" [ref=e183] [cursor=pointer]
                      - generic [ref=e185]: 讲义
                      - generic "函数的定义与表示" [ref=e192]
                      - generic [ref=e194]:
                        - generic [ref=e195]: 已发布
                        - generic [ref=e196]: 09-24 更新
                  - treeitem "函数的性质" [level=3] [ref=e197]:
                    - generic [ref=e198]:
                      - button "移动函数的性质" [ref=e199] [cursor=pointer]
                      - generic [ref=e201]: 视频
                      - generic "函数的性质" [ref=e208]
                      - generic [ref=e210]:
                        - generic [ref=e211]: 已发布
                        - generic [ref=e212]: 09-24 更新
                  - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e213]:
                    - generic [ref=e214]:
                      - button "收起1.2 极限与连续" [expanded] [ref=e215] [cursor=pointer]
                      - button "移动1.2 极限与连续" [ref=e217] [cursor=pointer]
                      - generic "1.2 极限与连续" [ref=e222]
                      - generic [ref=e224]:
                        - generic [ref=e225]: 8 个学习单元
                        - generic [ref=e226]: 09-24 更新
                  - treeitem "数列极限" [expanded] [level=3] [ref=e227]:
                    - generic [ref=e228]:
                      - button "收起数列极限" [expanded] [ref=e229] [cursor=pointer]
                      - button "移动数列极限" [ref=e231] [cursor=pointer]
                      - generic "数列极限" [ref=e236]
                      - generic [ref=e238]:
                        - generic [ref=e239]: 3 个学习单元
                        - generic [ref=e240]: 09-24 更新
                  - treeitem "极限的定义" [level=4] [ref=e241]:
                    - generic [ref=e242]:
                      - button "移动极限的定义" [ref=e243] [cursor=pointer]
                      - generic [ref=e245]: 讲义
                      - generic "极限的定义" [ref=e252]
                      - generic [ref=e254]:
                        - generic [ref=e255]: 已发布
                        - generic [ref=e256]: 09-24 更新
                  - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e257]:
                    - generic [ref=e258]:
                      - button "收起收敛性与极限运算" [expanded] [ref=e259] [cursor=pointer]
                      - button "移动收敛性与极限运算" [ref=e261] [cursor=pointer]
                      - generic "收敛性与极限运算" [ref=e266]
                      - generic [ref=e268]:
                        - generic [ref=e269]: 2 个学习单元
                        - generic [ref=e270]: 09-24 更新
                  - treeitem "两个重要极限" [expanded] [level=5] [ref=e271]:
                    - generic [ref=e272]:
                      - button "收起两个重要极限" [expanded] [ref=e273] [cursor=pointer]
                      - button "移动两个重要极限" [ref=e275] [cursor=pointer]
                      - generic "两个重要极限" [ref=e280]
                      - generic [ref=e282]:
                        - generic [ref=e283]: 2 个学习单元
                        - generic [ref=e284]: 09-24 更新
                  - treeitem "常见题型与方法" [expanded] [level=6] [ref=e285]:
                    - generic [ref=e286]:
                      - button "收起常见题型与方法" [expanded] [ref=e287] [cursor=pointer]
                      - button "移动常见题型与方法" [ref=e289] [cursor=pointer]
                      - generic "常见题型与方法" [ref=e294]
                      - generic [ref=e296]:
                        - generic [ref=e297]: 2 个学习单元
                        - generic [ref=e298]: 09-24 更新
                  - treeitem "例题与拓展练习" [level=7] [ref=e299]:
                    - generic [ref=e300]:
                      - button "移动例题与拓展练习" [ref=e301] [cursor=pointer]
                      - generic [ref=e303]: 作业
                      - generic "例题与拓展练习" [ref=e310]
                      - generic [ref=e312]:
                        - generic [ref=e313]: 已发布
                        - generic [ref=e314]: 09-24 更新
                  - treeitem "函数的连续性" [level=3] [ref=e315]:
                    - generic [ref=e316]:
                      - button "移动函数的连续性" [ref=e317] [cursor=pointer]
                      - generic [ref=e319]: 讲义
                      - generic "函数的连续性" [ref=e326]
                      - generic [ref=e328]:
                        - generic [ref=e329]: 已发布
                        - generic [ref=e330]: 09-24 更新
                  - treeitem "1.3 习题与应用" [level=2] [ref=e331]:
                    - generic [ref=e332]:
                      - button "移动1.3 习题与应用" [ref=e333] [cursor=pointer]
                      - generic [ref=e335]: 作业
                      - generic "1.3 习题与应用" [ref=e342]
                      - generic [ref=e344]:
                        - generic [ref=e345]: 已发布
                        - generic [ref=e346]: 09-24 更新
                  - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e347]:
                    - generic [ref=e348]:
                      - button "收起第二章 · 导数与微分" [expanded] [ref=e349] [cursor=pointer]
                      - button "移动第二章 · 导数与微分" [ref=e351] [cursor=pointer]
                      - generic "第二章 · 导数与微分" [ref=e356]
                      - generic [ref=e358]:
                        - generic [ref=e359]: 16 个学习单元
                        - generic [ref=e360]: 09-24 更新
                  - treeitem "2.1 导数的概念" [level=2] [ref=e361]:
                    - generic [ref=e362]:
                      - button "移动2.1 导数的概念" [ref=e363] [cursor=pointer]
                      - generic [ref=e365]: 讲义
                      - generic "2.1 导数的概念" [ref=e372]
                      - generic [ref=e374]:
                        - generic [ref=e375]: 已发布
                        - generic [ref=e376]: 09-24 更新
                  - treeitem "2.2 导数的应用" [level=2] [ref=e377]:
                    - generic [ref=e378]:
                      - button "移动2.2 导数的应用" [ref=e379] [cursor=pointer]
                      - generic [ref=e381]: 考试
                      - generic "2.2 导数的应用" [ref=e388]
                      - generic [ref=e390]:
                        - generic [ref=e391]: 已发布
                        - generic [ref=e392]: 09-24 更新
                  - generic [ref=e393]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                  - status [ref=e394]
          - generic [ref=e395]:
            - generic [ref=e396]: 公共资源的内容可供关联班级复用。
            - generic [ref=e397]: 模拟数据 · 未执行发布
  - generic [ref=e398]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import { expect, test, type Page } from '@playwright/test';
  2  | const open=async(page:Page,sample='R2')=>{await page.goto(`/?sample=${sample}#navigation-v042`);await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();};
  3  | const box=async(page:Page,selector:string)=>page.locator(selector).evaluate(element=>{const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
  4  | 
  5  | test('N01 all-hidden R2 has stable named keyboard recovery and untouched scope',async({page})=>{
  6  |   await open(page);const root=page.locator('.nv42-r2');
  7  |   await root.getByRole('button',{name:'布局',exact:true}).click();
  8  |   const menu=page.getByRole('dialog',{name:'R2 布局'});
  9  |   await menu.getByRole('checkbox',{name:'显示平台导航',exact:true}).uncheck();
  10 |   await menu.getByRole('checkbox',{name:'显示课程导航',exact:true}).uncheck();
  11 |   await page.keyboard.press('Escape');
> 12 |   await expect(root.locator('[data-region-id="global"]')).toBeHidden();await expect(root.locator('[data-region-id="context"]')).toBeHidden();
     |                                                                                                                                 ^ Error: expect(locator).toBeHidden() failed
  13 |   const restore=root.getByRole('button',{name:'恢复课程导航',exact:true});const controlled=await restore.getAttribute('aria-controls');
  14 |   await expect(page.locator(`[id="${controlled}"]`)).toHaveCount(1);
  15 |   await restore.focus();await page.keyboard.press('Enter');await expect(root.locator('[data-region-id="context"]')).toBeVisible();
  16 |   await expect(root.getByRole('tab',{name:'公共资源包',exact:true})).toHaveAttribute('aria-selected','true');
  17 | });
  18 | test('N02 N03 temporary dismiss and the next controller complete on the first click',async({page})=>{
  19 |   await open(page);const root=page.locator('.nv42-r2');
  20 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  21 |   await expect(root.locator('[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  22 |   await root.locator('.nv42-workspace-bar').getByRole('button',{name:'展开平台导航',exact:true}).click();
  23 |   await expect(root.locator('[data-region-id="context"]')).toBeHidden();await expect(root.locator('[data-region-id="global"]')).toHaveAttribute('data-mode','expanded');
  24 |   await root.getByRole('button',{name:'恢复课程导航',exact:true}).click();await expect(root.locator('[data-region-id="context"]')).toBeVisible();
  25 | });
  26 | test('N05 N22 temporary pin, unpin and outside preserve one region instance',async({page})=>{
  27 |   await open(page);const root=page.locator('.nv42-r2');const initial=await root.locator('[data-region-id="context"]').getAttribute('id');
  28 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  29 |   const overlay=await box(page,'.nv42-main');
  30 |   await root.getByRole('button',{name:'固定课程导航',exact:true}).click();await expect(root.locator('[data-region-id="context"]')).toHaveAttribute('data-temporary','false');
  31 |   expect((await box(page,'.nv42-main')).x-overlay.x).toBe(221);
  32 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  33 |   await expect(root.locator('[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  34 |   await root.getByRole('heading',{name:'知识点总览',exact:true}).click();
  35 |   await expect(root.locator('[data-region-id="context"]')).toBeHidden();expect(await box(page,'.nv42-main')).toEqual(overlay);
  36 |   expect(await root.locator('[data-region-id="context"]').getAttribute('id')).toBe(initial);
  37 | });
  38 | test('N14 N15 nested semester popup consumes Escape before the temporary panel',async({page})=>{
  39 |   await open(page);const root=page.locator('.nv42-r2');
  40 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  41 |   await root.locator('.nv42-term').click();await expect(page.getByRole('menu')).toBeVisible();
  42 |   await page.keyboard.press('Escape');await expect(page.getByRole('menu')).toHaveCount(0);await expect(root.locator('[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  43 |   await page.keyboard.press('Escape');await expect(root.locator('[data-region-id="context"]')).toBeHidden();await expect(root.getByRole('button',{name:'恢复课程导航',exact:true})).toBeFocused();
  44 | });
  45 | test('N08 N12 focus restores the hidden layout and an independent editor draft',async({page})=>{
  46 |   await page.goto('/navigation-v042-consumer.html');const text='布局切换保留的当前课程草稿';const draft=page.getByRole('textbox',{name:'教学目标草稿'});await draft.fill(text);
  47 |   await page.getByRole('button',{name:'隐藏课程导航',exact:true}).first().click();await page.getByRole('button',{name:'专注内容',exact:true}).click();await page.getByRole('button',{name:'退出专注',exact:true}).click();
  48 |   await expect(page.locator('[data-region-id="context"]')).toBeHidden();await expect(page.locator('[data-region-id="global"]')).toHaveAttribute('data-mode','compact');await expect(draft).toHaveValue(text);
  49 | });
  50 | test('N23 N24 N25 splitter keys clamp width, Enter hides and keyboard restores',async({page})=>{
  51 |   await open(page,'R3');const root=page.locator('[data-rain-id="recipe-navigation-r3"]');const splitter=root.getByRole('separator',{name:'调整资源目录宽度'});
  52 |   await splitter.focus();await page.keyboard.press('Shift+ArrowRight');await expect(splitter).toHaveAttribute('aria-valuenow','248');
  53 |   await page.keyboard.press('Home');await expect(splitter).toHaveAttribute('aria-valuenow','180');await page.keyboard.press('End');await expect(splitter).toHaveAttribute('aria-valuenow','420');
  54 |   await page.keyboard.press('Enter');await expect(splitter).toBeHidden();await expect(root.getByRole('button',{name:'显示资源目录',exact:true})).toBeFocused();
  55 |   await page.keyboard.press('Enter');await expect(splitter).toBeVisible();await expect(splitter).toHaveAttribute('aria-valuenow','420');
  56 | });
  57 | test('accepted R2 brand remains mounted through full, compact and reverse motion',async({page})=>{
  58 |   await open(page);await page.emulateMedia({reducedMotion:'no-preference'});const rail=page.locator('.nv42-rail');
  59 |   const facts=await rail.evaluate(async element=>{const brand=element.querySelector('.nv42-brand strong')!;const control=()=>element.querySelector<HTMLButtonElement>('.nv42-rail-head button')!;const widths:number[]=[];control().click();const start=performance.now();while(performance.now()-start<350){await new Promise(requestAnimationFrame);widths.push(element.getBoundingClientRect().width);}control().click();await new Promise(resolve=>setTimeout(resolve,350));return {same:brand===element.querySelector('.nv42-brand strong'),widths,final:element.getBoundingClientRect().width};});
  60 |   expect(facts.same).toBe(true);expect(facts.widths.at(-1)).toBe(208);expect(facts.widths.filter(width=>width>64&&width<208).length).toBeGreaterThan(2);expect(facts.final).toBe(64);
  61 |   await page.emulateMedia({reducedMotion:'reduce'});await expect(rail).toHaveCSS('transition-duration','0s');
  62 | });
  63 | 
```