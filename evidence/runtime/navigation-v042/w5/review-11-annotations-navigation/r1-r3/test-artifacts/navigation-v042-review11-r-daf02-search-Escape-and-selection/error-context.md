# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-r1-r3.spec.ts >> Review11 Connections 1200 pale directional chevron preserves dialog search Escape and selection
- Location: tests/e2e/navigation-v042-review11-r1-r3.spec.ts:34:2

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "arrow-down"
Received string:    "url(\"data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_63_76)'%3e%3cmask%20id='mask0_63_76'%20style='mask-type:alpha'%20maskUnits='userSpaceOnUse'%20x='2'%20y='6'%20width='20'%20height='12'%3e%3cmask%20id='mask1_63_76'%20style='mask-type:luminance'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3cpath%20d='M24%200H0V24H24V0Z'%20fill='white'/%3e%3c/mask%3e%3cg%20mask='url(%23mask1_63_76)'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M10.8686%2017.4485C11.4935%2018.0733%2012.5065%2018.0733%2013.1314%2017.4485L20.9095%209.67034C21.5344%209.0455%2021.5344%208.03243%2020.9095%207.40759C20.2847%206.78275%2019.2716%206.78275%2018.6468%207.40759L12%2014.0544L5.3532%207.40759C4.72836%206.78275%203.71529%206.78275%203.09045%207.40759C2.46562%208.03243%202.46562%209.0455%203.09045%209.67034L10.8686%2017.4485Z'%20fill='%231D2129'/%3e%3c/g%3e%3c/mask%3e%3cg%20mask='url(%23mask0_63_76)'%3e%3crect%20width='24'%20height='24'%20fill='%231D2129'/%3e%3c/g%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_63_76'%3e%3crect%20width='24'%20height='24'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e\")"
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
        - option "1200" [selected]
        - option "1440"
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
    - link "打开认可原稿 ↗" [ref=e40] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#connections
  - generic [ref=e46]:
    - generic "分区导航" [ref=e48]:
      - generic [ref=e49]:
        - tablist "连接实验范围" [ref=e52]:
          - tab "公共资源包" [selected] [ref=e53] [cursor=pointer]:
            - generic [ref=e57]:
              - generic [ref=e58]: 课程内容 · 班级共用
              - generic [ref=e59]: 公共资源包
          - tab "高等数学 1 班" [ref=e61] [cursor=pointer]:
            - generic [ref=e65]:
              - generic [ref=e66]: 2026 秋 · 48 名学生
              - generic [ref=e67]: 高等数学 1 班
          - tab "创新实验班" [ref=e69] [cursor=pointer]:
            - generic [ref=e73]:
              - generic [ref=e74]: 2026 秋 · 32 名学生
              - generic [ref=e75]: 创新实验班
        - generic [ref=e78]:
          - button "向前浏览" [disabled] [ref=e79]
          - button "向后浏览" [disabled] [ref=e81]
          - button "定位当前" [ref=e83] [cursor=pointer]
          - button "全部" [ref=e84] [cursor=pointer]
    - tabpanel "公共资源包" [ref=e88]:
      - generic [ref=e89]:
        - generic [ref=e90]: 课程内容 / 公共资源包
        - heading "知识点总览" [level=3] [ref=e92]
        - paragraph [ref=e93]: 以知识点组织公共资源，在班级中安排教学。此处为本地视觉与交互示例。
        - generic [ref=e94]:
          - generic [ref=e95]:
            - generic [ref=e97]: 第一章 函数、极限与连续
            - generic [ref=e98]: 12 个单元
          - generic [ref=e99]:
            - generic [ref=e101]: 第二章 导数与微分
            - generic [ref=e102]: 8 个单元
          - generic [ref=e103]:
            - generic [ref=e105]: 第三章 积分及其应用
            - generic [ref=e106]: 待完善
  - generic [ref=e107]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import {test,expect,type Page,type Locator} from '@playwright/test';
  2  | const open=async(page:Page,sample:string,width:number)=>{await page.goto(`/?sample=${sample}#navigation-v042`);await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));};
  3  | const style=(node:Locator,property:string)=>node.evaluate((e,property)=>getComputedStyle(e).getPropertyValue(property),property);
  4  | const root=(page:Page,id:string)=>page.locator(`[data-rain-id=recipe-navigation-${id}]`);
  5  | for(const width of [1200,1440,1600]){
  6  |  test(`Review11 R1 ${width} white context and restrained stat hierarchy preserve scene selection`,async({page})=>{
  7  |   await open(page,'R1',width);const r=root(page,'r1');
  8  |   await expect.poll(()=>style(r.locator('.nv43-context'),'background-color')).toBe('rgb(255, 255, 255)');
  9  |   for(const selector of ['.nv43-statistics>div>span','.nv43-statistics>div>small']){const entries=r.locator(selector);await expect(entries).toHaveCount(3);for(const entry of await entries.all()){expect(await style(entry,'font-size')).toBe('13px');expect(await style(entry,'line-height')).toBe('20px');}}
  10 |   expect(await style(r.locator('.nv43-page-top>p'),'color')).toBe('rgb(160, 172, 197)');expect(await style(r.locator('.nv43-workspace-actions'),'gap')).toBe('16px');
  11 |   await r.getByRole('tab',{name:'学分结构',exact:true}).click();await page.getByRole('combobox',{name:'业务子场景'}).selectOption('industry');
  12 |   expect(await style(r.locator('.nv43-context'),'background-color')).toBe('rgb(255, 255, 255)');expect(await style(r.locator('.nv43-page-top>p'),'color')).toBe('rgb(160, 172, 197)');
  13 |   await r.getByRole('radio',{name:'桑基图',exact:true}).locator('..').click();await expect(r.getByRole('radio',{name:'桑基图',exact:true})).toBeChecked();
  14 |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('plan');await expect(r.getByRole('tab',{name:'学分结构',exact:true})).toHaveAttribute('aria-selected','true');
  15 |  });
  16 |  test(`Review11 R3 ${width} heading16 file16 name15 resource color and list-grid selection`,async({page})=>{
  17 |   await open(page,'R3',width);const r=root(page,'r3'),h=r.locator('.nv43-resource-heading h3');expect(await style(h,'font-size')).toBe('16px');expect(await style(h,'line-height')).toBe('22px');expect((await h.boundingBox())?.height).toBe(22);
  18 |   expect(await style(r.locator('.nv43-workspace-actions'),'gap')).toBe('16px');expect(await style(r.locator('.nv43-icon-tile'),'background-color')).toBe('rgb(255, 242, 235)');expect(await style(r.locator('.nv43-icon-tile [data-rain-id=icon]'),'color')).toBe('rgb(221, 92, 0)');
  19 |   for(const name of await r.locator('.nv43-file-name').all())expect(await style(name,'font-size')).toBe('15px');for(const icon of await r.locator('.nv43-file-name [data-rain-id=icon]').all()){const box=await icon.boundingBox();expect(box?.width).toBe(16);expect(box?.height).toBe(16);}
  20 |   const file='第一章 函数、极限与连续.pdf';await r.getByRole('checkbox',{name:`选择 ${file}`,exact:true}).check();await r.getByRole('radio',{name:'网格',exact:true}).locator('..').click();await expect(r.getByRole('checkbox',{name:`选择 ${file}`,exact:true})).toBeChecked();expect((await r.locator('.nv43-file-open [data-rain-id=icon]').nth(1).boundingBox())?.width).toBe(24);
  21 |   await r.getByRole('radio',{name:'列表',exact:true}).locator('..').click();await r.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('教学大纲');await expect(r.locator('tbody tr')).toHaveCount(1);await page.getByRole('combobox',{name:'业务子场景'}).selectOption('errors');expect(await style(h,'font-size')).toBe('16px');
  22 |   await r.getByRole('radio',{name:'加星',exact:true}).locator('..').click();await expect(r.locator('tbody tr')).toHaveCount(3);await r.getByRole('button',{name:'取消加星 · 第 1 题',exact:true}).click();await expect(r.locator('tbody tr')).toHaveCount(2);
  23 |  });
  24 |  test(`Review11 White ${width} gradient no top line, title/type hierarchy and count track state`,async({page})=>{
  25 |   await open(page,'White',width);const w=page.getByTestId('candidate-White');
  26 |   for(const item of await w.locator('.nv43-white-example li').all())expect(await style(item,'font-size')).toBe('15px');for(const item of await w.locator('.nv43-white-example li>small').all())expect(await style(item,'font-size')).toBe('13px');
  27 |   for(const item of await w.locator('.nv43-white-panel li>span:not([data-rain-id=icon])').all())expect(await style(item,'font-size')).toBe('15px');
  28 |   const selected=w.locator('.nv43-white-connected .rain-tabs__tab[data-selected=true]');expect(await selected.evaluate(e=>getComputedStyle(e,'::before').content)).toBe('none');expect(await style(selected,'background-image')).toBe('linear-gradient(rgb(224, 234, 255), rgb(255, 255, 255))');
  29 |   const soft=w.locator('.nv43-white-soft');expect(await style(soft.locator('[data-state=checked] [data-slot=count]'),'color')).toBe('rgb(15, 85, 223)');expect(await style(soft.locator('[data-state=unchecked] [data-slot=count]').first(),'color')).toBe('rgb(103, 115, 134)');
  30 |   await soft.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();await expect(soft.getByRole('radio',{name:'已练对',exact:true})).toBeChecked();expect(await style(soft.locator('[data-state=checked] [data-slot=count]'),'color')).toBe('rgb(15, 85, 223)');
  31 |   await w.getByRole('tab',{name:'参考案例',exact:true}).click();await expect(w.getByRole('tab',{name:'参考案例',exact:true})).toHaveAttribute('aria-selected','true');expect(await style(selected,'background-image')).toContain('linear-gradient');
  32 |   const line=w.getByRole('radiogroup',{name:'W1 / 白底指示线'});await line.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();expect(await line.locator('[data-state=checked]').evaluate(e=>getComputedStyle(e,'::after').height)).toBe('2px');
  33 |  });
  34 |  test(`Review11 Connections ${width} pale directional chevron preserves dialog search Escape and selection`,async({page})=>{
  35 |   await open(page,'Connections',width);const c=page.getByTestId('candidate-Connections'),all=c.getByRole('button',{name:'全部',exact:true}),icon=all.locator('[data-rain-id=icon]');
> 36 |   await expect(all).toHaveAttribute('aria-expanded','false');expect(await style(icon,'color')).toBe('rgb(184, 194, 216)');expect(await style(icon,'mask-image')).toContain('arrow-down');await all.click();await expect(all).toHaveAttribute('aria-expanded','true');expect(await style(icon,'mask-image')).toContain('arrow-up');
     |                                                                                                                                                                  ^ Error: expect(received).toContain(expected) // indexOf
  37 |   const dialog=page.getByRole('dialog',{name:'选择课程内容范围'});await expect(dialog).toBeVisible();await dialog.getByRole('textbox',{name:'搜索范围'}).fill('不存在');await expect(dialog.getByRole('status')).toHaveText('无匹配范围');await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(all).toHaveAttribute('aria-expanded','false');
  38 |   await all.click();await dialog.getByRole('textbox',{name:'搜索范围'}).fill('创新');await dialog.getByRole('button',{name:/创新实验班/}).click();await expect(dialog).not.toBeVisible();await expect(c.getByRole('tab',{name:/创新实验班/})).toHaveAttribute('aria-selected','true');
  39 |  });
  40 | }
  41 | 
```