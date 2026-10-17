import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900}});
const data={capturedAt:new Date().toISOString(),courseWidths:[],commandKeyboardFocus:{},platformFonts:[]};
try {
 await page.goto('http://127.0.0.1:4174/#token-first-g3?rebuild=1&recipe=S05&scene=course');
 for(const width of [1440,1200,920,900,881,880,879,878,800,600,375]) {
  await page.setViewportSize({width,height:900});
  await page.waitForFunction(()=>{const e=document.querySelector('.nr-course-split');return e&&e.dataset.stacked===String(e.getBoundingClientRect().width<816);});
  data.courseWidths.push(await page.locator('.nr-course-split').evaluate((el,width)=>{const main=el.querySelector('.rain-split-main');return {viewport:width,splitWidth:el.getBoundingClientRect().width,mainWidth:main.getBoundingClientRect().width,mainCSSMinWidth:getComputedStyle(main).minWidth,declaredMainMinimum:getComputedStyle(el).getPropertyValue('--rain-layout-main-min-width').trim(),stacked:el.dataset.stacked,collapsed:el.dataset.collapsed,pageOverflow:document.documentElement.scrollWidth>window.innerWidth};},width));
 }
 await page.setViewportSize({width:1440,height:900});
 for(const theme of ['light','dark'])for(const density of ['default','compact']) {
  await page.goto('http://127.0.0.1:4174/#token-first-g3?rebuild=1&recipe=M02&scene=commands');
  const a=page.getByRole('region',{name:'命令工作台 A'});await a.getByLabel('A 命令面层',{exact:true}).selectOption(theme);
  const trigger=a.getByRole('menuitem',{name:'视图',exact:true});await trigger.focus();await page.keyboard.press('Enter');
  const menu=page.getByRole('menu',{name:'视图',exact:true});
  if(density==='compact') { await menu.getByRole('menuitemradio',{name:'紧凑',exact:true}).click();await page.keyboard.press('Escape');await trigger.focus();await page.keyboard.press('Enter'); }
  await page.keyboard.press('Home');
  await page.waitForFunction(()=>document.activeElement?.matches('.nr-command-popup [role=menuitemcheckbox]:focus-visible'));
  data.commandKeyboardFocus[`${theme}-${density}`]=await menu.getByRole('menuitemcheckbox',{name:'显示大纲'}).evaluate(el=>{const s=getComputedStyle(el);return{focusVisible:el.matches(':focus-visible'),color:s.outlineColor,width:s.outlineWidth,style:s.outlineStyle,offset:s.outlineOffset,boxShadow:s.boxShadow};});
  await page.keyboard.press('Escape');
 }
 await page.goto('http://127.0.0.1:4174/#token-first-g3?rebuild=1&recipe=S01&scene=platform');
 const cdp=await page.context().newCDPSession(page);await cdp.send('DOM.enable');await cdp.send('CSS.enable');const {root}=await cdp.send('DOM.getDocument');const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:root.nodeId,selector:'.nr-rail .nr-link .nr-label'});
 if(nodeId)data.platformFonts=(await cdp.send('CSS.getPlatformFontsForNode',{nodeId})).fonts;
 else data.platformFontsStatus='label selector missing; not-run';
 writeFileSync('evidence/runtime/navigation-rebuild-v03/token-threshold-font-focus.json',JSON.stringify(data,null,2)+'\n');console.log(JSON.stringify(data,null,2));
} finally {await browser.close();}
