import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const data = { capturedAt: new Date().toISOString(), baseURL: 'http://127.0.0.1:4174', scope: 'Read-only measurements of rendered candidates; no implementation mutation.', rails: {}, navigationPopups: {}, commandPopups: {}, layout: {}, motion: {} };
const properties = ['backgroundColor','color','fontFamily','fontSize','fontWeight','lineHeight','height','minHeight','width','minWidth','paddingTop','paddingRight','paddingBottom','paddingLeft','marginTop','marginBottom','marginLeft','gap','columnGap','rowGap','borderColor','borderTopColor','borderRightColor','borderLeftWidth','borderRadius','boxShadow','outlineColor','outlineWidth','outlineOffset','transitionDuration','animationDuration','zIndex'];
async function measure(locator, pseudo) { return locator.evaluate((el, { properties, pseudo }) => { const s=getComputedStyle(el,pseudo);const rect=el.getBoundingClientRect();const ancestors=[];for(let n=el;n;n=n.parentElement){const z=getComputedStyle(n).zIndex;if(z!=='auto')ancestors.push({tag:n.tagName,className:n.className,zIndex:z});}return { values:Object.fromEntries(properties.map(k=>[k,s[k]])), rect:{x:rect.x,y:rect.y,width:rect.width,height:rect.height}, theme:el.closest('[data-rain-theme]')?.getAttribute('data-rain-theme'), density:el.closest('[data-density]')?.getAttribute('data-density'), focusVisible:el.matches(':focus-visible'), zIndexAncestors:ancestors }; }, { properties, pseudo }); }
try {
 for(const surface of ['light','dark'])for(const density of ['default','compact']) {
  const key=`${surface}-${density}`;
  await page.goto('http://127.0.0.1:4174/#token-first-g3?rebuild=1&recipe=S01&scene=platform');
  await page.getByLabel('导航表面',{exact:true}).selectOption(surface);await page.getByLabel('导航密度',{exact:true}).selectOption(density);
  const rail=page.getByRole('navigation',{name:'全局导航',exact:true});const normal=rail.getByRole('link',{name:'教学工作台',exact:true});
  const railData={surface:await measure(rail),normal:await measure(normal),current:await measure(rail.locator('.nr-link[aria-current]')),currentSurface:await measure(rail.locator('.nr-row[data-current]')),group:await measure(rail.locator('.nr-group-label')),indent:await measure(rail.locator('.nr-children')),footer:await measure(rail.locator('.nr-rail-foot'))};
  await normal.hover();railData.hover=await measure(normal.locator('..'));
  await page.keyboard.press('Tab');await normal.focus();railData.focus=await measure(normal);
  await page.getByLabel('导航当前表达',{exact:true}).selectOption('edge');railData.indicator=await measure(rail.locator('.nr-row[data-current]'),'::before');
  data.rails[key]=railData;console.log('rail',key);
  for(const recipe of ['N03','N04']) {
   await page.goto(`http://127.0.0.1:4174/#token-first-g3?rebuild=1&recipe=${recipe}&scene=tools`);
   await page.getByLabel('实例 A 面层',{exact:true}).selectOption(surface);await page.getByLabel('实例 A 密度',{exact:true}).selectOption(density);
   const nav=page.getByRole('navigation',{name:'实例 A 导航',exact:true});const trigger=nav.getByRole('button',{name:'展开资源中心入口',exact:true});await trigger.click();
   const popup=page.getByRole('dialog',{name:`实例 A 导航：${recipe==='N03'?'二级入口':'教学工具'}`,exact:true});await popup.waitFor();
   const link=popup.getByRole('link',{name:'课程提纲',exact:true});
   const result={surface:await measure(popup),openTrigger:await measure(nav.getByRole('button',{name:'收起资源中心入口',exact:true})),row:await measure(link),group:await measure(popup.locator('.nr-topnav-panel-title'))};
   await link.hover();result.hover=await measure(link);await page.keyboard.press('Tab');await link.focus();result.focus=await measure(link);
   data.navigationPopups[`${recipe}-${key}`]=result;await page.keyboard.press('Escape');
  }
  await page.goto('http://127.0.0.1:4174/#token-first-g3?rebuild=1&recipe=M02&scene=commands');
  const a=page.getByRole('region',{name:'命令工作台 A'});await a.getByLabel('A 命令面层',{exact:true}).selectOption(surface);await a.getByRole('menuitem',{name:'视图',exact:true}).click();
  const popup=page.getByRole('menu',{name:'视图',exact:true});if(density==='compact')await popup.getByRole('menuitemradio',{name:'紧凑',exact:true}).click();
  const row=popup.getByRole('menuitemcheckbox',{name:'显示大纲',exact:true});
  const result={surface:await measure(popup),row:await measure(row),openTrigger:await measure(a.getByRole('menuitem',{name:'视图',exact:true})),separator:await measure(popup.locator('.nr-command-separator'))};
  await row.hover();result.hover=await measure(row);await page.keyboard.press('ArrowUp');await row.focus();result.focus=await measure(row);
  await page.keyboard.press('Escape');await a.getByRole('menuitem',{name:'文件',exact:true}).click();result.disabled=await measure(page.getByRole('menuitem',{name:'发布到课程（未接入）',exact:true}));data.commandPopups[key]=result;await page.keyboard.press('Escape');console.log('popups',key);
 }
 await page.goto('http://127.0.0.1:4174/#token-first-g3?rebuild=1&recipe=S06&scene=platform');
 data.layout.inset={shell:await measure(page.locator('.nr-shell')),main:await measure(page.locator('.nr-workspace'))};
 await page.goto('http://127.0.0.1:4174/#token-first-g3?rebuild=1&recipe=S05&scene=course');
 data.layout.courseSplit={root:await measure(page.locator('.nr-course-split')),main:await measure(page.locator('.rain-split-main')),declaredMinimum:await page.locator('.nr-course-split').evaluate(el=>getComputedStyle(el).getPropertyValue('--rain-layout-main-min-width').trim())};
 await page.goto('http://127.0.0.1:4174/#token-first-g3?rebuild=1&recipe=S01&scene=platform');
 for(const reducedMotion of ['no-preference','reduce']) { await page.emulateMedia({reducedMotion});data.motion[reducedMotion]={rail:await measure(page.locator('.nr-rail')),link:await measure(page.locator('.nr-link').first()),tokens:await page.evaluate(()=>Object.fromEntries(['--rain-motion-feedback-duration','--rain-motion-overlay-duration','--rain-motion-region-duration'].map(k=>[k,getComputedStyle(document.documentElement).getPropertyValue(k).trim()])))}; }
 writeFileSync('evidence/runtime/navigation-rebuild-v03/token-runtime-supplement.json',JSON.stringify(data,null,2)+'\n');
 console.log(JSON.stringify({railContexts:Object.keys(data.rails).length,navigationPopupContexts:Object.keys(data.navigationPopups).length,commandPopupContexts:Object.keys(data.commandPopups).length,courseMinimum:data.layout.courseSplit.declaredMinimum,output:'token-runtime-supplement.json'}));
} finally { await browser.close(); }
