# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w4.spec.ts >> N08 N12 focus restores the hidden layout and an independent editor draft
- Location: tests/e2e/navigation-v042-w4.spec.ts:45:1

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator: locator('[data-region-id="context"]')
Expected: hidden
Error: strict mode violation: locator('[data-region-id="context"]') resolved to 2 elements:
    1) <div inert="" hidden="" data-side="start" aria-label="课程导航" data-mode="hidden" data-forced="false" data-temporary="false" data-region-id="context" id="_r_1_-workspace-context" class="rain-workspace__region nv42-context">…</div> aka getByText('课程导航 返回我的课程MATHEMATICS / 2026')
    2) <div hidden="" tabindex="-1" role="separator" aria-valuemin="180" aria-valuemax="420" aria-valuenow="216" aria-label="调整课程导航宽度" data-region-id="context" aria-orientation="vertical" class="rain-workspace__splitter " aria-controls="_r_1_-workspace-context"></div> aka getByLabel('调整课程导航宽度')

Call log:
  - Expect "toBeHidden" with timeout 5000ms
  - waiting for locator('[data-region-id="context"]')

```

# Page snapshot

```yaml
- generic [ref=e5]:
  - banner [ref=e6]:
    - button "展开平台导航" [ref=e7] [cursor=pointer]
    - button "恢复课程导航" [ref=e9] [cursor=pointer]
    - generic [ref=e11]:
      - strong [ref=e12]: 高等数学 A · 课程内容
      - generic [ref=e13]: 公共资源包
    - button "布局" [ref=e14] [cursor=pointer]
    - button "专注内容" [active] [ref=e16] [cursor=pointer]
  - generic [ref=e20]:
    - generic "平台导航" [ref=e22]:
      - navigation "平台导航" [ref=e23]:
        - generic [ref=e24]:
          - button "展开平台导航" [ref=e25] [cursor=pointer]
          - strong [ref=e30]: 雨课堂
        - generic [ref=e31]:
          - link "工作台" [ref=e32] [cursor=pointer]:
            - /url: "#navigation-v042"
          - link "课程" [ref=e35] [cursor=pointer]:
            - /url: "#navigation-v042"
          - link "资源" [ref=e38] [cursor=pointer]:
            - /url: "#navigation-v042"
          - link "专业" [ref=e41] [cursor=pointer]:
            - /url: "#navigation-v042"
        - generic [ref=e44]:
          - button "当前账户：林老师" [ref=e45] [cursor=pointer]
          - generic [ref=e48]:
            - button "通知" [ref=e49] [cursor=pointer]
            - button "帮助" [ref=e52] [cursor=pointer]
    - generic [ref=e59]:
      - generic "分区导航" [ref=e61]:
        - generic [ref=e62]:
          - tablist "课程内容范围" [ref=e65]:
            - tab "公共资源包" [selected] [ref=e66] [cursor=pointer]:
              - generic [ref=e70]:
                - generic [ref=e71]: 公共内容 · 班级共用
                - generic [ref=e72]: 公共资源包
            - tab "2026 秋 · 高等数学 1 班" [ref=e74] [cursor=pointer]:
              - generic [ref=e78]:
                - generic [ref=e79]: 教学班 · 2026 秋季学期
                - generic [ref=e80]: 2026 秋 · 高等数学 1 班
            - tab "2026 秋 · 创新实验班" [ref=e82] [cursor=pointer]:
              - generic [ref=e86]:
                - generic [ref=e87]: 教学班 · 2026 秋季学期
                - generic [ref=e88]: 2026 秋 · 创新实验班
            - tab "2026 秋 · 高等数学 3 班" [ref=e90] [cursor=pointer]:
              - generic [ref=e94]:
                - generic [ref=e95]: 教学班 · 2026 秋季学期
                - generic [ref=e96]: 2026 秋 · 高等数学 3 班
          - button "更多班级" [ref=e99] [cursor=pointer]:
            - generic [ref=e101]: "197"
      - tabpanel "公共资源包" [ref=e105]:
        - generic [ref=e106]:
          - generic [ref=e107]:
            - navigation "面包屑" [ref=e109]:
              - list [ref=e110]:
                - listitem [ref=e111]:
                  - generic [ref=e112]: 课程内容
                - listitem [ref=e113]:
                  - generic [ref=e114]: /
                  - generic [ref=e115]: 公共资源包
            - generic [ref=e116]:
              - generic [ref=e117]:
                - heading "知识点总览" [level=3] [ref=e118]
                - paragraph [ref=e119]: 以知识点组织公共资源，在班级中安排教学。
              - button "预览学生端" [ref=e121] [cursor=pointer]
          - generic [ref=e126]:
            - generic "分区导航" [ref=e127]:
              - tablist "编辑器内部视图" [ref=e131]:
                - tab "编辑" [selected] [ref=e132] [cursor=pointer]
                - tab "预览" [ref=e135] [cursor=pointer]
            - tabpanel "编辑" [ref=e139]:
              - generic [ref=e140]:
                - text: 教学目标草稿
                - textbox "教学目标草稿" [ref=e141]: 布局切换保留的当前课程草稿
          - contentinfo [ref=e142]:
            - generic [ref=e143]: 公共资源的内容可供关联班级复用。
            - generic [ref=e144]: 模拟数据 · 未执行发布
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
  12 |   await expect(root.locator('[data-region-id="global"]')).toBeHidden();await expect(root.locator('[data-region-id="context"]')).toBeHidden();
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
> 48 |   await expect(page.locator('[data-region-id="context"]')).toBeHidden();await expect(page.locator('[data-region-id="global"]')).toHaveAttribute('data-mode','compact');await expect(draft).toHaveValue(text);
     |                                                            ^ Error: expect(locator).toBeHidden() failed
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