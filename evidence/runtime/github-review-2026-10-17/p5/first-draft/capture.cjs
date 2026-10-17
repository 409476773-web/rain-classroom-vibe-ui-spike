const { createRequire } = require('node:module');
const path = require('node:path');
const { chromium } = createRequire(path.resolve('package.json'))('@playwright/test');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1100},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5518/');await page.getByRole('heading',{name:'更新资源引用',exact:true}).waitFor();await page.screenshot({animations:'disabled',path:'../evidence/first-draft/desktop-stable.png',fullPage:true});
 await page.getByRole('button',{name:'查看版本比较'}).click();await page.getByRole('dialog').waitFor();await page.waitForFunction(()=>getComputedStyle(document.querySelector('[role=dialog]')).opacity==='1');await page.screenshot({animations:'disabled',path:'../evidence/first-draft/comparison-stable.png',fullPage:true});
 await page.getByRole('button',{name:'关闭版本比较'}).click();await page.locator('.rain-dialog-portal').waitFor({state:'detached'});
 await page.setViewportSize({width:390,height:844});await page.screenshot({animations:'disabled',path:'../evidence/first-draft/mobile-390-stable.png',fullPage:true});
 require('node:fs').writeFileSync('../evidence/first-draft/browser-errors.json',JSON.stringify(errors,null,2));
 await browser.close();
})();
