import {test,expect} from '@playwright/test';
for (const sample of ['R4','R5','R6']) for (const dark of [false,true]) for (const entry of (sample==='R6'?['header','toolbar']:['header'])) test(`Review11 ${sample} ${dark?'dark':'light'} ${entry} forced compact reopens on the first click after dismissal`,async({page},info)=>{
 await page.goto(`/?sample=${sample}#navigation-v042`);
 await page.getByRole('combobox',{name:'画板宽度'}).selectOption('1200');
 if(dark) await page.getByRole('checkbox',{name:'深色外框',exact:true}).check();
 const root=page.getByTestId('candidate-canvas').locator('.rain-workspace');
 if(sample==='R5') await root.getByRole('separator',{name:'调整知识索引宽度',exact:true}).press('Home');
 if(sample==='R6') await root.getByRole('tab',{name:'表格',exact:true}).click();
 const region=root.locator('.nv5-platform'),button=entry==='header'?region.locator('.nv5-platform-expand'):root.locator('.nv5-recovery .rain-workspace__restore').first();
 await expect(region).toHaveAttribute('data-mode','compact');await expect(button).toBeVisible();
 const steps:any[]=[];const record=async(label:string)=>steps.push({label,...await region.evaluate(e=>({mode:e.dataset.mode,forced:e.dataset.forced,temporary:e.dataset.temporary,width:e.getBoundingClientRect().width,expanded:e.querySelector('.nv5-platform-expand')?.getAttribute('aria-expanded')}))});
 await expect(button).toHaveAttribute('aria-expanded','false');await record('initial');
 await button.click();await expect(region).toHaveAttribute('data-temporary','true');await expect(button).toHaveAttribute('aria-expanded','true');await record('first open');
 await button.click();await expect(region).toHaveAttribute('data-temporary','false');await expect(button).toHaveAttribute('aria-expanded','false');await record('dismiss');
 await button.click();await record('reopen first click');
 await info.attach('actual-transition',{body:JSON.stringify(steps,null,2),contentType:'application/json'});
 await expect(region).toHaveAttribute('data-temporary','true');await expect(button).toHaveAttribute('aria-expanded','true');expect((await region.boundingBox())!.width).toBe(208);
 await page.keyboard.press('Escape');await expect(region).toHaveAttribute('data-temporary','false');
});
