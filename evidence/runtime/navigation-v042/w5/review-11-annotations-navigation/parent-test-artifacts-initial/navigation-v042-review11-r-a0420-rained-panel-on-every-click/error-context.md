# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-root.spec.ts >> Review11 R6 1440 both platform entry points reopen a constrained panel on every click
- Location: tests/e2e/navigation-v042-review11-root.spec.ts:27:32

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  locator('.rain-workspace').locator('[data-region-id="global"]')
Expected: "true"
Received: "false"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('.rain-workspace').locator('[data-region-id="global"]')
    14 × locator resolved to <div data-side="start" aria-label="平台导航" data-forced="false" data-mode="expanded" data-temporary="false" data-region-id="global" id="_r_2_-workspace-global" class="rain-workspace__region nv5-platform">…</div>
       - unexpected value "false"

```

```yaml
- strong: 雨课堂
- button "收起平台导航" [expanded]
- navigation "平台功能":
  - list
- button "通知"
- button "帮助"
- button "当前账户：林老师"
- strong: 林老师
- text: 教师工作区
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | test('Review11 content and White semantic selection keeps native focus with the requested gradient',async({page})=>{
  3  |  await page.goto('/?sample=Contents#navigation-v042');const sample=page.getByTestId('candidate-Contents');
  4  |  for(const label of ['C1 · 简单','C2 · 带信息','C3 · 双行身份','C4 · 摘要','C5 · 预览'])await expect(sample.getByRole('heading',{name:label,exact:true})).toBeVisible();
  5  |  await sample.getByRole('button',{name:'等效电路的求解方法',exact:true}).click();await expect(sample.getByRole('button',{name:'等效电路的求解方法',exact:true})).toHaveAttribute('aria-pressed','true');
  6  |  await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:'White',exact:true}).click();
  7  |  const white=page.getByTestId('candidate-White'),line=white.getByRole('radiogroup',{name:'W1 / 白底指示线'});
  8  |  await line.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();await expect(line.getByRole('radio',{name:'已练对',exact:true})).toBeChecked();
  9  |  expect(await line.locator('label[data-state="checked"]').evaluate(e=>getComputedStyle(e,'::after').height)).toBe('2px');
  10 |  const soft=white.getByRole('radiogroup',{name:'W2 / 仅选中项填充'});expect(await soft.locator('[data-slot="items"]').evaluate(e=>getComputedStyle(e).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
  11 |  const tabs=white.getByRole('tab',{name:'教学资料',exact:true}),paint=await tabs.evaluate(e=>({gradient:getComputedStyle(e).backgroundImage,content:getComputedStyle(e,'::before').content,display:getComputedStyle(e,'::before').display}));
  12 |  expect(paint.gradient).toContain('linear-gradient');expect(paint.content==='none'||paint.display==='none').toBe(true);
  13 |  await tabs.focus();await page.keyboard.press('ArrowRight');await expect(white.getByRole('tab',{name:'参考案例',exact:true})).toBeFocused();
  14 | });
  15 | test('Review11 Knowledge uses32/14 controls while other RegionHead callers retain32/18',async({page})=>{
  16 |  await page.goto('/?sample=R4#navigation-v042');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');
  17 |  for(const sample of ['R4','R5','R6']){
  18 |   if(sample!=='R4')await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();
  19 |   const controls=page.getByTestId('candidate-canvas').locator('.nv5-region-head>[data-rain-id="ui-icon-button"]');expect(await controls.count()).toBeGreaterThan(0);
  20 |   for(const button of await controls.all()){
  21 |    const knowledge=await button.evaluate(e=>Boolean(e.closest('.nv5-knowledge')));await expect(button).toHaveAttribute('data-size',knowledge?'32/14':'32/18');
  22 |    expect(await button.evaluate(e=>[e.getBoundingClientRect().width,e.getBoundingClientRect().height])).toEqual([32,32]);
  23 |    expect(await button.locator('[data-slot="icon"]').evaluate(e=>e.getBoundingClientRect().width)).toBe(knowledge?14:18);
  24 |   }
  25 |  }
  26 | });
  27 | for(const width of [1200,1440])test(`Review11 R6 ${width} both platform entry points reopen a constrained panel on every click`,async({page})=>{
  28 |  await page.goto('/?sample=R6#navigation-v042');await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  29 |  const root=page.locator('.rain-workspace'),rail=root.locator('[data-region-id="global"]'),draft=root.getByRole('textbox',{name:'你希望我们改进的地方'});
  30 |  await draft.fill('保留重复展开前的草稿');
  31 |  await root.getByRole('tab',{name:'表格',exact:true}).click();
  32 |  for(const entry of ['rail','toolbar'] as const)for(let cycle=0;cycle<2;cycle++){
  33 |   await expect(rail).toHaveAttribute('data-mode','compact');
  34 |   const opener=entry==='rail'?rail.getByRole('button',{name:'展开平台导航',exact:true}):root.locator('.rain-workspace__restore[aria-controls$="-workspace-global"]').first();
> 35 |   await opener.click();await expect(rail).toHaveAttribute('data-temporary','true');
     |                                           ^ Error: expect(locator).toHaveAttribute(expected) failed
  36 |   expect(await rail.evaluate(e=>e.getBoundingClientRect().width)).toBe(208);
  37 |   await expect(rail.getByRole('link',{name:'课程',exact:true})).toHaveAttribute('aria-current','page');
  38 |   await rail.getByRole('button',{name:'关闭临时平台导航',exact:true}).click();await expect(rail).toHaveAttribute('data-temporary','false');
  39 |  }
  40 |  await root.getByRole('tab',{name:'反馈表单',exact:true}).click();
  41 |  await expect(draft).toHaveValue('保留重复展开前的草稿');
  42 | });
  43 | 
```