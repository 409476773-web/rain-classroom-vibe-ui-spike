import {test,expect} from '@playwright/test';
test('Review11 content and White semantic selection keeps native focus with the requested gradient',async({page})=>{
 await page.goto('/?sample=Contents#navigation-v042');const sample=page.getByTestId('candidate-Contents');
 for(const label of ['C1 · 简单','C2 · 带信息','C3 · 双行身份','C4 · 摘要','C5 · 预览'])await expect(sample.getByRole('heading',{name:label,exact:true})).toBeVisible();
 await sample.getByRole('button',{name:'等效电路的求解方法',exact:true}).click();await expect(sample.getByRole('button',{name:'等效电路的求解方法',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:'White',exact:true}).click();
 const white=page.getByTestId('candidate-White'),line=white.getByRole('radiogroup',{name:'W1 / 白底指示线'});
 await line.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();await expect(line.getByRole('radio',{name:'已练对',exact:true})).toBeChecked();
 expect(await line.locator('label[data-state="checked"]').evaluate(e=>getComputedStyle(e,'::after').height)).toBe('2px');
 const soft=white.getByRole('radiogroup',{name:'W2 / 仅选中项填充'});expect(await soft.locator('[data-slot="items"]').evaluate(e=>getComputedStyle(e).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
 const tabs=white.getByRole('tab',{name:'教学资料',exact:true}),paint=await tabs.evaluate(e=>({gradient:getComputedStyle(e).backgroundImage,content:getComputedStyle(e,'::before').content,display:getComputedStyle(e,'::before').display}));
 expect(paint.gradient).toContain('linear-gradient');expect(paint.content==='none'||paint.display==='none').toBe(true);
 await tabs.focus();await page.keyboard.press('ArrowRight');await expect(white.getByRole('tab',{name:'参考案例',exact:true})).toBeFocused();
});
test('Review11 Knowledge uses32/14 controls while other RegionHead callers retain32/18',async({page})=>{
 await page.goto('/?sample=R4#navigation-v042');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');
 for(const sample of ['R4','R5','R6']){
  if(sample!=='R4')await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();
  const controls=page.getByTestId('candidate-canvas').locator('.nv5-region-head>[data-rain-id="ui-icon-button"]');expect(await controls.count()).toBeGreaterThan(0);
  for(const button of await controls.all()){
   const knowledge=await button.evaluate(e=>Boolean(e.closest('.nv5-knowledge')));await expect(button).toHaveAttribute('data-size',knowledge?'32/14':'32/18');
   expect(await button.evaluate(e=>[e.getBoundingClientRect().width,e.getBoundingClientRect().height])).toEqual([32,32]);
   expect(await button.locator('[data-slot="icon"]').evaluate(e=>e.getBoundingClientRect().width)).toBe(knowledge?14:18);
  }
 }
});
for(const dark of [false,true])test(`Review11 R6 1200 ${dark?'dark':'light'} both platform entry points reopen a constrained panel on every click`,async({page})=>{
 const width=1200;
 await page.goto('/?sample=R6#navigation-v042');await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
 const root=page.locator('.rain-workspace'),rail=root.locator('[data-region-id="global"]'),draft=root.getByRole('textbox',{name:'你希望我们改进的地方'});
 await draft.fill('保留重复展开前的草稿');
 await root.getByRole('tab',{name:'表格',exact:true}).click();
 if(dark)await page.getByRole('checkbox',{name:'深色外框',exact:true}).check();
 await expect(root).toHaveAttribute('data-viewport-width',String(width));
 for(const entry of ['rail','toolbar'] as const)for(let cycle=0;cycle<2;cycle++){
  await expect(rail).toHaveAttribute('data-mode','compact');
  const opener=entry==='rail'?rail.getByRole('button',{name:'展开平台导航',exact:true}):root.locator('.rain-workspace__restore[aria-controls$="-workspace-global"]').first();
  await opener.click();await expect(rail).toHaveAttribute('data-temporary','true');
  expect(await rail.evaluate(e=>e.getBoundingClientRect().width)).toBe(208);
  await expect(rail.getByRole('link',{name:'资源',exact:true})).toHaveAttribute('aria-current','page');
  await rail.getByRole('button',{name:'关闭临时平台导航',exact:true}).click();await expect(rail).toHaveAttribute('data-temporary','false');
 }
 await root.getByRole('tab',{name:'反馈表单',exact:true}).click();
 await expect(draft).toHaveValue('保留重复展开前的草稿');
});
