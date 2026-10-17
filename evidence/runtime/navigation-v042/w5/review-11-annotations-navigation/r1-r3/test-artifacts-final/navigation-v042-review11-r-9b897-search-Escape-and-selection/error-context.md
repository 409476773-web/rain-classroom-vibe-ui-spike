# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-r1-r3.spec.ts >> Review11 Connections 1600 pale directional chevron preserves dialog search Escape and selection
- Location: tests/e2e/navigation-v042-review11-r1-r3.spec.ts:34:2

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: getByTestId('candidate-Connections').getByRole('button', { name: '全部', exact: true })
Expected: "true"
Timeout: 6000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 6000ms
  - waiting for getByTestId('candidate-Connections').getByRole('button', { name: '全部', exact: true })

```

```yaml
- dialog "选择课程内容范围":
  - heading "选择课程内容范围" [level=2]
  - button "关闭范围选择"
  - paragraph: 课程内容样本 · 名称可搜索
  - textbox "搜索范围":
    - /placeholder: 搜索班级名称
  - button "公共资源包 课程内容 · 班级共用" [pressed]:
    - strong: 公共资源包
    - text: 课程内容 · 班级共用
  - button "高等数学 1 班 2026 秋 · 48 名学生":
    - strong: 高等数学 1 班
    - text: 2026 秋 · 48 名学生
  - button "创新实验班 2026 秋 · 32 名学生":
    - strong: 创新实验班
    - text: 2026 秋 · 32 名学生
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
  20 |   const file='第一章 函数、极限与连续.pdf';await r.getByRole('checkbox',{name:`选择 ${file}`,exact:true}).locator('..').click();await r.getByRole('radio',{name:'网格',exact:true}).locator('..').click();await expect(r.getByRole('checkbox',{name:`选择 ${file}`,exact:true})).toBeChecked();expect((await r.locator('.nv43-file-open [data-rain-id=icon]').nth(1).boundingBox())?.width).toBe(24);
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
> 36 |   await expect(all).toHaveAttribute('aria-expanded','false');expect(await style(icon,'color')).toBe('rgb(184, 194, 216)');await expect(icon).toHaveAttribute('data-icon','icon/arrow-down');await all.click();await expect(all).toHaveAttribute('aria-expanded','true');await expect(icon).toHaveAttribute('data-icon','icon/arrow-up');
     |                                                                                                                                                                                                                                 ^ Error: expect(locator).toHaveAttribute(expected) failed
  37 |   const dialog=page.getByRole('dialog',{name:'选择课程内容范围'});await expect(dialog).toBeVisible();await dialog.getByRole('textbox',{name:'搜索范围'}).fill('不存在');await expect(dialog.getByRole('status')).toHaveText('无匹配范围');await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(all).toHaveAttribute('aria-expanded','false');
  38 |   await all.click();await dialog.getByRole('textbox',{name:'搜索范围'}).fill('创新');await dialog.getByRole('button',{name:/创新实验班/}).click();await expect(dialog).not.toBeVisible();await expect(c.getByRole('tab',{name:/创新实验班/})).toHaveAttribute('aria-selected','true');
  39 |  });
  40 | }
  41 | 
```