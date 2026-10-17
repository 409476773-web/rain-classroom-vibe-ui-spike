import { test, expect } from '@playwright/test';
const base='http://127.0.0.1:4174/#token-first-g3?rebuild=1&scene=course&page=course-content&recipe=';
for(const recipe of ['S05','C01']) test(`${recipe}: source and class units preserve original shell and return context`,async({page})=>{
 await page.setViewportSize({width:1440,height:900}); await page.goto(base+recipe);
 await expect(page.getByRole('heading',{name:'课程内容',exact:true})).toBeVisible();
 const nav = page.getByRole('navigation',{name:recipe==='S05'?'全局导航':'顶部全局导航',exact:true});
 await expect(nav).toBeVisible();
 await page.getByRole('textbox',{name:'筛选学习单元'}).fill('极限');
 await page.getByRole('button',{name:'编辑 极限的概念与计算'}).click();
 await expect(page.getByRole('navigation',{name:'课程导航',exact:true})).toBeHidden();
 await expect(page.getByLabel('班级范围')).toBeHidden(); await expect(nav).toBeVisible();
 await page.getByRole('textbox',{name:'单元内容'}).fill('本地修改');
 await page.getByRole('link',{name:'返回课程内容',exact:true}).click();
 await expect(page.getByRole('textbox',{name:'筛选学习单元'})).toHaveValue('极限');
 await page.getByRole('button',{name:'编辑 极限的概念与计算'}).click();
 await expect(page.getByRole('textbox',{name:'单元内容'})).toHaveValue('本地修改');
 await page.getByRole('link',{name:'返回课程内容',exact:true}).click();
 await page.getByRole('textbox',{name:'筛选学习单元'}).fill('');
 await page.getByRole('button',{name:'全部班级'}).click(); await page.getByRole('button',{name:'高等数学 1 班 · 2026 秋季',exact:true}).last().click();
 await page.getByRole('button',{name:'编辑 本班拓展练习'}).click();
 await expect(page.getByText('当前编辑范围：高等数学 1 班 · 2026 秋季', {exact:true})).toBeVisible();
 await page.getByRole('link',{name:'返回课程内容',exact:true}).click();
 await expect(page.getByLabel('当前教学范围')).toContainText('高等数学 1 班');
});
for(const count of [0,1,4,12,200]) test(`classes ${count}: paged search never changes scope before selection`,async({page})=>{
 await page.goto(base+`S05&count=${count}`); await page.getByRole('button',{name:'全部班级'}).click();
 await page.getByRole('textbox',{name:'搜索全部班级'}).fill('不存在'); await expect(page.getByText('没有匹配的班级')).toBeVisible();
 await expect(page.getByLabel('当前教学范围')).toContainText('公共资源包');
 if(count===200){await page.getByRole('textbox',{name:'搜索全部班级'}).fill('200'); await page.getByRole('button',{name:'高等数学 200 班 · 2026 秋季',exact:true}).click(); await expect(page.getByLabel('当前教学范围')).toContainText('高等数学 200 班');}
});
