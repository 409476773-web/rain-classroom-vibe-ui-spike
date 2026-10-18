import {test,expect} from '@playwright/test';
const url='http://127.0.0.1:4174/#token-first-g3?rebuild=1';
const e='evidence/runtime/navigation-rebuild-v03';
test('E08 E12: unfamiliar lab composition, actual booking and A/B styles/portal isolated',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto(url+'&view=isolation');
 const a=page.getByRole('region',{name:'设备预约工作台 A'}),b=page.getByRole('region',{name:'设备预约工作台 B'});
 expect(await a.innerText()).not.toMatch(/课程|班级/);
 const bBefore=await b.evaluate(el=>({text:el.textContent,color:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));
 await page.screenshot({path:`${e}/isolation-before.png`,fullPage:true});
 await page.getByRole('button',{name:'切换 A 面层'}).click();await page.getByRole('button',{name:'切换 A 密度'}).click();
 const bAfter=await b.evaluate(el=>({text:el.textContent,color:getComputedStyle(el).color,bg:getComputedStyle(el).backgroundColor}));expect(bAfter).toEqual(bBefore);
 await a.getByRole('button',{name:'切换实验室'}).click();const popupA=page.getByRole('dialog',{name:'选择实验室 A'});await expect(popupA).toBeVisible();await expect(popupA.locator('..')).toHaveAttribute('data-rain-theme','dark');await expect(popupA.locator('..')).toHaveAttribute('data-density','compact');await page.screenshot({path:`${e}/isolation-a-popup.png`,fullPage:true});await page.keyboard.press('Escape');await expect(a.getByRole('button',{name:'切换实验室'})).toBeFocused();
 await b.getByRole('button',{name:'切换实验室'}).click();const popupB=page.getByRole('dialog',{name:'选择实验室 B'});await expect(popupB.locator('..')).toHaveAttribute('data-rain-theme','light');await expect(popupB.locator('..')).toHaveAttribute('data-density','default');await page.keyboard.press('Escape');
 await a.getByRole('textbox',{name:'搜索设备'}).fill('光谱');await a.getByRole('button',{name:'查看 紫外可见分光光度计'}).click();await a.getByRole('button',{name:'确认预约',exact:true}).click();await expect(a.getByRole('status')).toContainText('已预约');await expect(b.getByRole('status')).not.toContainText('已预约');await a.getByRole('button',{name:'取消预约'}).click();await expect(a.getByRole('status')).toContainText('已取消');await page.screenshot({path:`${e}/isolation-after.png`,fullPage:true});
});
for(const size of [{width:1200,height:800},{width:1440,height:900},{width:1920,height:1080},{width:1200,height:650}])test(`E12 lab ${size.width}x${size.height}`,async({page})=>{
 await page.setViewportSize(size);await page.goto(url+'&scene=lab');await expect(page.getByRole('region',{name:'设备预约工作台 A'})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await page.screenshot({path:`${e}/lab-${size.width}x${size.height}.png`});
});
test('catalog exposes twelve full-size candidates, source and research provenance',async({page})=>{
 await page.goto(url+'&view=catalog');await expect(page.locator('.nr-catalog article')).toHaveCount(12);await page.getByRole('textbox',{name:'搜索组合'}).fill('富链接');await expect(page.locator('.nr-catalog article')).toHaveCount(1);await page.getByText('研究参考、源码与状态').click();await expect(page.getByRole('img',{name:'N04 原包研究示意，非运行截图'})).toBeVisible();await page.getByRole('link',{name:'打开全尺寸预览'}).click();await expect(page).toHaveURL(/recipe=N04/);await expect(page.getByRole('heading',{name:'AI 教学工具',exact:true})).toBeVisible();
});
