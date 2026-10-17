import {test,expect,type Page} from '@playwright/test';
const open=async(page:Page,sample:'R2'|'R3',width:number)=>{await page.goto('/#navigation-v042');await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));return page.locator('.rain-workspace').first();};
for(const width of [1200,1440,1600]){
 test(`R2 ${width} content filter native radio supports vertical and horizontal keyboard`,async({page})=>{
  const root=await open(page,'R2',width),group=root.getByRole('radiogroup',{name:'内容类型',exact:true});
  await group.getByRole('radio',{name:'全部',exact:true}).focus();await page.keyboard.press('ArrowDown');await expect(group.getByRole('radio',{name:'作业',exact:true})).toBeChecked();
  await page.keyboard.press('ArrowDown');await expect(group.getByRole('radio',{name:'考试',exact:true})).toBeChecked();
  await page.keyboard.press('ArrowUp');await expect(group.getByRole('radio',{name:'作业',exact:true})).toBeChecked();
  await page.keyboard.press('ArrowLeft');await expect(group.getByRole('radio',{name:'全部',exact:true})).toBeChecked();
  const geometry=await group.evaluate(el=>{const root=el.closest('.nv42-filter')!,items=root.querySelector('[data-slot="items"]')!,option=root.querySelector('.rain-segmented-control__option')!;return {track:items.getBoundingClientRect().height,option:option.getBoundingClientRect().height};});expect(geometry).toEqual({track:32,option:26});
  await expect(root.getByRole('button',{name:'退出编辑',exact:true})).toBeVisible();
 });
 test(`R2 ${width} compact platform icons have Rain hover and focus Tooltip`,async({page})=>{
  const root=await open(page,'R2',width),target=root.locator('.nv42-rail-links').getByRole('link',{name:'课程',exact:true});
  await expect(target).not.toHaveAttribute('title');await target.hover();const tip=page.getByRole('tooltip').filter({hasText:/^课程$/});await expect(tip).toBeVisible();
  expect(await tip.evaluate(el=>getComputedStyle(el).backgroundColor)).toBe('rgb(47, 53, 69)');await page.keyboard.press('Escape');await expect(tip).toHaveCount(0);await page.mouse.move(1650,1000);await target.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');await expect(tip).toBeVisible();
  await page.keyboard.press('Tab');await expect(tip).toHaveCount(0);
 });
 test(`R3 ${width} selected file list object feedback follows existing grid selection`,async({page})=>{
  const root=await open(page,'R3',width);await page.getByRole('combobox',{name:'业务子场景'}).selectOption('files');
  const label='第一章 函数、极限与连续.pdf',checkbox=root.getByRole('checkbox',{name:`选择 ${label}`,exact:true});await checkbox.locator('..').click();await expect(checkbox).toBeChecked();
  const row=root.getByRole('table',{name:'云盘文件列表'}).locator('tbody tr').nth(1),bg=()=>row.evaluate(el=>getComputedStyle(el).backgroundColor);
  await page.mouse.move(1250,1000);expect(await bg()).toBe('rgb(224, 234, 255)');await row.hover();expect(await bg()).toBe('rgb(198, 216, 255)');
  await row.getByRole('button',{name:label,exact:true}).click();await expect(checkbox).toBeChecked();
  const query=root.getByRole('textbox',{name:'搜索当前范围内的文件'});await query.fill('教学大纲');await expect(root.locator('tbody tr')).toHaveCount(1);await query.fill('');await expect(checkbox).toBeChecked();
  await root.getByRole('radio',{name:'网格',exact:true}).locator('..').click();await expect(root.locator('.nv43-file-card').filter({hasText:label}).getByRole('checkbox')).toBeChecked();
 });
}
test('R2 field dialog Escape returns focus to its original Tree node and preserves edit mode',async({page})=>{const root=await open(page,'R2',1600),node=root.getByRole('treeitem',{name:'函数的性质',exact:true});await node.hover();await node.getByRole('button',{name:'编辑函数的性质',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).toHaveCount(0);await expect(node).toBeFocused();await expect(root.getByRole('button',{name:'退出编辑',exact:true})).toBeVisible();});
