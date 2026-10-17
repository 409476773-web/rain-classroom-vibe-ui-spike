# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-r4-r6-platform-reopen.spec.ts >> Review11 R6 light header forced compact reopens on the first click after dismissal
- Location: tests/e2e/navigation-v042-review11-r4-r6-platform-reopen.spec.ts:2:142

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByTestId('candidate-canvas').locator('.rain-workspace').locator('.nv5-platform')
Expected: "true"
Received: "false"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for getByTestId('candidate-canvas').locator('.rain-workspace').locator('.nv5-platform')
    14 × locator resolved to <div data-side="start" aria-label="平台导航" data-mode="compact" data-forced="false" data-temporary="false" data-region-id="global" id="_r_2_-workspace-global" class="rain-workspace__region nv5-platform">…</div>
       - unexpected value "false"

```

```yaml
- button "展开平台导航"
- navigation "平台功能":
  - list
- button "通知"
- button "帮助"
- button "当前账户：林老师"
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | for (const sample of ['R4','R5','R6']) for (const dark of [false,true]) for (const entry of (sample==='R6'?['header','toolbar']:['header'])) test(`Review11 ${sample} ${dark?'dark':'light'} ${entry} forced compact reopens on the first click after dismissal`,async({page},info)=>{
  3  |  await page.goto(`/?sample=${sample}#navigation-v042`);
  4  |  await page.getByRole('combobox',{name:'画板宽度'}).selectOption('1200');
  5  |  if(dark) await page.getByRole('checkbox',{name:'深色外框',exact:true}).check();
  6  |  const root=page.getByTestId('candidate-canvas').locator('.rain-workspace');
  7  |  if(sample==='R5') await root.getByRole('separator',{name:'调整知识索引宽度',exact:true}).press('Home');
  8  |  if(sample==='R6') await root.getByRole('tab',{name:'表格',exact:true}).click();
  9  |  const region=root.locator('.nv5-platform'),button=entry==='header'?region.locator('.nv5-platform-expand'):root.locator('.nv5-recovery .rain-workspace__restore').first();
  10 |  await expect(region).toHaveAttribute('data-mode','compact');await expect(button).toBeVisible();
  11 |  const steps:any[]=[];const record=async(label:string)=>steps.push({label,...await region.evaluate(e=>({mode:e.dataset.mode,forced:e.dataset.forced,temporary:e.dataset.temporary,width:e.getBoundingClientRect().width,expanded:e.querySelector('.nv5-platform-expand')?.getAttribute('aria-expanded')}))});
  12 |  await expect(button).toHaveAttribute('aria-expanded','false');await record('initial');
  13 |  await button.click();await expect(region).toHaveAttribute('data-temporary','true');await expect(button).toHaveAttribute('aria-expanded','true');await record('first open');
  14 |  await button.click();await expect(region).toHaveAttribute('data-temporary','false');await expect(button).toHaveAttribute('aria-expanded','false');await record('dismiss');
  15 |  await button.click();await record('reopen first click');
  16 |  await info.attach('actual-transition',{body:JSON.stringify(steps,null,2),contentType:'application/json'});
> 17 |  await expect(region).toHaveAttribute('data-temporary','true');await expect(button).toHaveAttribute('aria-expanded','true');expect((await region.boundingBox())!.width).toBe(208);
     |                       ^ Error: expect(locator).toHaveAttribute(expected) failed
  18 |  await page.keyboard.press('Escape');await expect(region).toHaveAttribute('data-temporary','false');
  19 | });
  20 | 
```