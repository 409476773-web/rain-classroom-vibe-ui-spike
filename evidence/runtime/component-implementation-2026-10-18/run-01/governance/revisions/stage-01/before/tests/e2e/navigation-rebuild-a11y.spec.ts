import { chooseSelect } from './navigation-rebuild-select';
import {test,expect} from '@playwright/test';
import {writeFileSync} from 'node:fs';
import {contrastRatio} from './color-contrast';
const url='http://127.0.0.1:4174/#token-first-g3?rebuild=1';
test('scoped rendered token values, required text contrast and target sizes',async({page})=>{
 const facts:unknown[]=[];
 for(const recipe of ['S01','S02','N04','M02']){
  const scene=recipe==='N04'?'tools':recipe==='M02'?'commands':'platform';await page.goto(url+`&recipe=${recipe}&scene=${scene}`);
  if(recipe==='N04')await page.getByRole('navigation',{name:'实例 A 导航',exact:true}).getByRole('button',{name:'展开资源中心入口'}).click();
  if(recipe==='M02')await page.getByRole('region',{name:'命令工作台 A'}).getByRole('menuitem',{name:'视图',exact:true}).click();
  const root=recipe==='N04'?page.locator('.nr-topnav-popup'):recipe==='M02'?page.locator('.nr-command-popup'):page.getByRole('navigation',{name:'全局导航',exact:true});
  const data=await root.evaluate(root=>{
   const values=Array.from(root.querySelectorAll('a,button,[role^=menuitem],.nr-topnav-tool-copy>span,.nr-group-label')).filter(el=>{const rect=el.getBoundingClientRect();return rect.width&&rect.height&&!el.hasAttribute('disabled')&&el.getAttribute('aria-disabled')!=='true';}).map(el=>{
    const style=getComputedStyle(el);const backgrounds:string[]=[];let parent:Element|null=el;while(parent&&backgrounds.length<2){const bg=getComputedStyle(parent).backgroundColor;if(!['rgba(0, 0, 0, 0)','transparent'].includes(bg))backgrounds.push(bg);parent=parent.parentElement;}const rect=el.getBoundingClientRect();
    return {text:el.textContent?.trim(),iconOnly:!el.textContent?.trim()&&!!el.querySelector('.rain-icon'),color:style.color,background:backgrounds[0]??'rgb(255,255,255)',parentBackground:backgrounds[1]??'rgb(255,255,255)',width:rect.width,height:rect.height,interactive:el.matches('a,button,[role^=menuitem]')};
   });return values;
  });
  for(const row of data){const ratio=contrastRatio(row.color,row.background,row.parentBackground);facts.push({recipe,...row,ratio});expect.soft(ratio,`${recipe} ${row.text}`).toBeGreaterThanOrEqual(row.iconOnly?3:4.5);if(row.interactive){expect.soft(row.width,`${recipe} target width ${row.text}`).toBeGreaterThanOrEqual(24);expect.soft(row.height,`${recipe} target height ${row.text}`).toBeGreaterThanOrEqual(24);}}
 }
 writeFileSync('evidence/runtime/navigation-rebuild-v03/contrast-and-targets.json',JSON.stringify(facts,null,2));
});

test('N03 N04 dark popup keyboard focus has 3:1 contrast against its adjacent surface',async({page})=>{
 const facts:unknown[]=[];
 for(const recipe of ['N03','N04']){
  await page.goto(url+`&recipe=${recipe}&scene=tools`);
  await chooseSelect(page,'实例 A 面层','深色');
  const trigger=page.getByRole('navigation',{name:'实例 A 导航',exact:true}).getByRole('button',{name:'展开资源中心入口'});
  await trigger.focus();await page.keyboard.press('Enter');
  const link=page.locator('.nr-topnav-popup').getByRole('link',{name:'课程提纲',exact:true});
  await expect(link).toBeFocused();
  const colors=await link.evaluate(el=>({outline:getComputedStyle(el).outlineColor,background:getComputedStyle(el.closest('.nr-topnav-popup')!).backgroundColor,width:getComputedStyle(el).outlineWidth,visible:el.matches(':focus-visible')}));
  const ratio=contrastRatio(colors.outline,colors.background,'rgb(255,255,255)');
  facts.push({recipe,...colors,ratio});expect(colors.visible).toBe(true);expect(ratio).toBeGreaterThanOrEqual(3);
  await page.screenshot({path:`evidence/runtime/navigation-rebuild-v03/${recipe}-dark-focus.png`});
  await page.keyboard.press('Escape');await expect(page.locator('.nr-topnav-popup')).toBeHidden();
 }
 writeFileSync('evidence/runtime/navigation-rebuild-v03/dark-focus-contrast.json',JSON.stringify(facts,null,2));
});
