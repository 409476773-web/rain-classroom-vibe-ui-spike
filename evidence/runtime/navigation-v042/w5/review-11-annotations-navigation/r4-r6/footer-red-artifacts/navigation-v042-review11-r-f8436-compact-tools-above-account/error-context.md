# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-r4-r6-platform-footer.spec.ts >> Review11 R6 light account is one left button with tools right and compact tools above account
- Location: tests/e2e/navigation-v042-review11-r4-r6-platform-footer.spec.ts:2:69

# Error details

```
Error: expect(locator).toHaveJSProperty(expected) failed

Locator:  getByTestId('candidate-canvas').locator('.rain-workspace').locator('.nv5-platform').locator('.nv5-platform-account')
Expected: "BUTTON"
Received: "DIV"
Timeout:  5000ms

Call log:
  - Expect "toHaveJSProperty" with timeout 5000ms
  - waiting for getByTestId('candidate-canvas').locator('.rain-workspace').locator('.nv5-platform').locator('.nv5-platform-account')
    14 × locator resolved to <div class="nv5-platform-account">…</div>
       - unexpected value "DIV"

```

```yaml
- button "当前账户：林老师"
- strong: 林老师
- text: 教师工作区
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | for(const sample of ['R4','R5','R6'])for(const dark of [false,true])test(`Review11 ${sample} ${dark?'dark':'light'} account is one left button with tools right and compact tools above account`,async({page},info)=>{
  3  |  await page.goto(`/?sample=${sample}#navigation-v042`);await page.getByRole('combobox',{name:'画板宽度'}).selectOption('1600');if(dark)await page.getByRole('checkbox',{name:'深色外框',exact:true}).check();
  4  |  const root=page.getByTestId('candidate-canvas').locator('.rain-workspace');await expect(root).toHaveAttribute('data-viewport-width','1600');const platform=root.locator('.nv5-platform'),toggle=platform.locator('.nv5-platform-expand');await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
> 5  |  const account=platform.locator('.nv5-platform-account'),notify=platform.getByRole('button',{name:'通知',exact:true}),help=platform.getByRole('button',{name:'帮助',exact:true});await expect(account).toHaveJSProperty('tagName','BUTTON');await expect(account).toHaveAttribute('aria-label','当前账户：林老师');await expect(account.locator('button')).toHaveCount(0);await expect(account.locator('.nv5-platform-account-copy')).toHaveText('林老师教师工作区');
     |                                                                                                                                                                                                    ^ Error: expect(locator).toHaveJSProperty(expected) failed
  6  |  const a=(await account.boundingBox())!,n=(await notify.boundingBox())!,h=(await help.boundingBox())!;expect(a.x+a.width).toBeLessThanOrEqual(n.x);expect(n.x+n.width).toBeLessThanOrEqual(h.x);expect([n.width,n.height,h.width,h.height]).toEqual([28,28,28,28]);
  7  |  await account.locator('.nv5-platform-account-copy').click();await expect(root.getByRole('status')).toContainText('账户入口示例。');await account.focus();await page.keyboard.press('Enter');await expect(root.getByRole('status')).toContainText('账户入口示例。');expect(await account.evaluate(e=>getComputedStyle(e).outlineStyle)).toBe('solid');
  8  |  await notify.click();await expect(root.getByRole('status')).toContainText('全局通知入口示例。');await help.click();await expect(root.getByRole('status')).toContainText('导航与工作区交互示例。');
  9  |  await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(account.locator('.nv5-platform-account-copy')).toHaveCount(0);const ac=(await account.boundingBox())!,nc=(await notify.boundingBox())!,hc=(await help.boundingBox())!;expect(nc.y+nc.height).toBeLessThanOrEqual(hc.y);expect(hc.y+hc.height).toBeLessThanOrEqual(ac.y);
  10 |  await info.attach('actual-footer-geometry',{body:JSON.stringify({sample,dark,expanded:{account:a,notify:n,help:h},compact:{account:ac,notify:nc,help:hc}},null,2),contentType:'application/json'});
  11 | });
  12 | 
```