import { test, expect, type Page, type Locator } from '@playwright/test';

const scenes = ['R1','R2','R3','R4','R5','R6','S1','S2','S3','S4','S5','S6'];
async function open(page:Page, scene:string, width=1440) {
  await page.goto(`/?sample=${scene}#navigation-v042`);
  await page.getByLabel('画板宽度').selectOption(String(width));
  return page.getByTestId('candidate-canvas').locator('.rain-workspace');
}
const rgba=(v:string)=>{if(v.startsWith('color(srgb')){const a=v.match(/[\d.]+/g)!.map(Number);return [Math.round(a[0]!*255),Math.round(a[1]!*255),Math.round(a[2]!*255),a[3]??1];}const a=v.match(/[\d.]+/g)!.map(Number);return [a[0],a[1],a[2],a[3]??1];};
const paint = (el:Locator) => el.evaluate(e => { const s=getComputedStyle(e),r=e.getBoundingClientRect(); return {background:s.backgroundColor,color:s.color,width:r.width,height:r.height}; });
async function setMode(root:Locator, mode:'compact'|'expanded') {
  const rail=root.locator('.rain-workspace__region[data-region-id="global"]');
  const expanded=async()=>await rail.getAttribute('data-mode')==='expanded'||await rail.getAttribute('data-temporary')==='true';
  if(await expanded()!==(mode==='expanded')) await rail.getByRole('button',{name:mode==='expanded'?'展开平台导航':await rail.getAttribute('data-temporary')==='true'?'关闭临时平台导航':'收起平台导航',exact:true}).click();
  await expect.poll(expanded).toBe(mode==='expanded');
  return rail;
}
for(const scene of scenes) test(`${scene} platform follows the common light and dark contract in both modes`,async({page}) => {
  const root=await open(page,scene);
  const theme=page.getByLabel('深色外框', {exact:true});
  await expect(theme).toBeVisible();
  for(const dark of [false,true]) {
    await theme.setChecked(dark);
    for(const mode of ['compact','expanded'] as const) {
      const rail=await setMode(root,mode);
      const current=rail.locator('a[aria-current="page"]');
      const currentRow=scene==='R2'?current:current.locator('..');
      const normal=rail.locator('a:not([aria-current="page"])').first();
      const normalRow=scene==='R2'?normal:normal.locator('..');
      expect((await paint(rail)).width).toBe(mode==='compact'?64:208);
      expect((await paint(rail)).background).toBe(dark?'rgb(37, 45, 67)':'rgb(232, 237, 248)');
      expect(rgba((await paint(currentRow)).background)).toEqual([255,255,255,dark?0.08:1]);
      expect((await paint(currentRow)).height).toBe(40);
      expect((await paint(current.locator('[data-rain-id="icon"]')))).toMatchObject({width:20,height:20});
      const logo=rail.locator('.nv42-brand,.nv43-brand,.nv5-brand,.nv44-brand').locator('[data-rain-id="icon"]');
      expect(await paint(logo)).toMatchObject({width:23,height:23});
      if(dark) expect((await paint(logo)).color).toBe('rgb(255, 255, 255)');
      await normal.hover();
      expect(rgba((await paint(normalRow)).background)).toEqual([255,255,255,dark?0.06:0.51]);
      await page.mouse.move(1790,1090);
      await expect(current).toHaveAttribute('aria-current','page');
      const account=rail.getByRole('button',{name:'当前账户：林老师',exact:true}),notice=rail.getByRole('button',{name:'通知',exact:true}),help=rail.getByRole('button',{name:'帮助',exact:true});
      await expect(account.locator('[data-rain-id="ui-avatar"]')).toBeVisible();
      const a=await account.boundingBox(),n=await notice.boundingBox(),h=await help.boundingBox();
      if(mode==='expanded') { await expect(rail.getByText('教师工作区',{exact:true})).toBeVisible(); expect(a!.x).toBeLessThan(n!.x);expect(n!.x).toBeLessThan(h!.x);expect(a!.height).toBe(44); }
      else { await expect(rail.getByText('教师工作区',{exact:true})).toBeHidden();expect(n!.y).toBeLessThan(h!.y);expect(h!.y).toBeLessThan(a!.y);expect(a!.height).toBe(40); }
      expect(await root.evaluate(e => e.getAttribute('data-rain-theme'))).not.toBe('dark');
      expect((await paint(root.locator('.nv42-workspace-bar,.nv43-workspace-bar,.nv5-recovery,.nv44-restorebar').first())).background).toBe('rgb(255, 255, 255)');
    }
  }
});

for(const scene of ['R2','R4','S3','S5']) test(`${scene} splitter is quiet normally and visible for pointer and keyboard use`,async({page}) => {
  const root=await open(page,scene,1200);
  const splitter=root.locator('.rain-workspace__splitter:not([hidden])').first();
  await splitter.scrollIntoViewIfNeeded();
  const state=()=>splitter.evaluate(e=>({before:getComputedStyle(e,'::before').opacity,after:getComputedStyle(e,'::after').opacity,width:e.getBoundingClientRect().width,value:Number(e.getAttribute('aria-valuenow')),tabIndex:(e as HTMLElement).tabIndex,focused:e.matches(':focus-visible')}));
  await page.mouse.move(1790,1090);
  const before=await state();
  expect(before.before).toBe('0');expect(before.after).toBe('0');expect(before.width).toBeGreaterThanOrEqual(5);expect(before.tabIndex).toBe(0);
  await splitter.hover();expect((await state()).before).toBe('1');
  const box=await splitter.boundingBox();
  await page.mouse.move(box!.x+box!.width/2,box!.y+box!.height/2);await page.mouse.down();await page.mouse.move(box!.x+box!.width/2+20,box!.y+box!.height/2,{steps:5});
  expect((await state()).before).toBe('1');await page.mouse.up();
  await page.mouse.move(1790,1090);await splitter.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
  expect((await state()).focused).toBe(true);expect((await state()).before).toBe('1');
  const value=(await state()).value;await page.keyboard.press('ArrowRight');expect((await state()).value).not.toBe(value);
  await page.keyboard.press('Escape');await page.keyboard.press('Tab');await page.mouse.move(1790,1090);
  expect((await state()).before).toBe('0');
});

for(const scene of ['R1','R4','S5']) test(`${scene} whole account receives keyboard focus and opens the existing local feedback`,async({page})=>{
 const root=await open(page,scene),rail=await setMode(root,'expanded'),account=rail.getByRole('button',{name:'当前账户：林老师',exact:true});
 await account.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');await expect(account).toBeFocused();
 expect(await account.evaluate(e=>e.matches(':focus-visible'))).toBe(true);await page.keyboard.press('Enter');
 if(scene==='R1') {await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(account).toBeFocused();}
 else await expect(root.getByRole('status').filter({hasText:scene==='R4'?'账户入口示例。':'账户为本地入口示例；未连接身份服务。'})).toBeVisible();
});
