import {mkdirSync} from 'node:fs';
import {test,expect,type Page} from '@playwright/test';
const evidence=process.env.NAVIGATION_REVIEW09_EVIDENCE_DIR??'evidence/runtime/navigation-v042/w5/review-09-all-scenes/root-final';
const open=async(page:Page,sample:string)=>{await page.goto(`/?sample=${sample}#navigation-v042`);return page.locator('.rain-workspace').first();};
test.beforeAll(()=>mkdirSync(evidence,{recursive:true}));
test('compact navigation uses existing Rain tooltip with pointer, keyboard and Escape behavior',async({page})=>{
  await page.goto('/?sample=R3#navigation-v042');
  const platform=page.locator('.nv43-platform'),link=platform.getByRole('link',{name:'专业',exact:true});
  await expect(link).not.toHaveAttribute('title');await link.hover();
  const hint=page.getByRole('tooltip',{name:'专业',exact:true});await expect(hint).toBeVisible();await expect(hint).toHaveAttribute('data-rain-id','ui-tooltip');
  const anchor=await link.boundingBox(),tooltip=await hint.boundingBox();expect(tooltip!.x).toBeGreaterThan(anchor!.x+anchor!.width);
  await page.locator('.rain-workspace').first().screenshot({path:`${evidence}/R3-compact-tooltip.png`});
  await page.keyboard.press('Escape');await expect(hint).toBeHidden();await page.mouse.move(1750,1000);
  await link.focus();await expect(hint).toBeVisible();await page.keyboard.press('Escape');await expect(hint).toBeHidden();await expect(link).toBeFocused();
  await page.locator('.rain-workspace').first().screenshot({path:`${evidence}/R3-compact-workspace.png`});
  await page.getByRole('button',{name:'展开平台导航',exact:true}).first().click();
  const expanded=platform.getByRole('link',{name:'专业',exact:true});await expect(expanded).toHaveAttribute('title','专业');
});
test('R4 group search explains no match and retains the selected detail on recovery',async({page})=>{
  const root=await open(page,'R4'),query=root.getByRole('textbox',{name:'搜索小组',exact:true});
  await query.fill('不存在的小组');await expect(root.getByText('未找到匹配的小组',{exact:true})).toBeVisible();
  await expect(root.getByRole('group',{name:'小组结果',exact:true}).getByRole('button')).toHaveCount(0);
  await query.fill('');await expect(root.getByRole('group',{name:'小组结果',exact:true}).getByRole('button',{name:'第一小分队',exact:true})).toHaveAttribute('aria-pressed','true');
});
test('R4 grading search reports matched count and recovers the current student',async({page})=>{
  const root=await open(page,'R4');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');
  const query=root.getByRole('textbox',{name:'搜索学生姓名或学号',exact:true});await query.fill('不存在的学生');
  await expect(root.getByText('未找到匹配的学生',{exact:true})).toBeVisible();await expect(root.locator('.nv5-student-queue .nv5-queue-head small')).toHaveText('0 / 6 人');
  await query.fill('');await expect(root.getByRole('group',{name:'学生队列',exact:true}).getByRole('button',{name:'李梦',exact:true})).toHaveAttribute('aria-pressed','true');
});
test('R6 workspace search uses one shared Empty and suppresses unmatched sections',async({page})=>{
  const root=await open(page,'R6'),query=root.getByRole('textbox',{name:'搜索工作区',exact:true});
  await query.fill('不存在的工作区');const empty=root.getByText('未找到匹配的工作区或文档',{exact:true});await expect(empty).toBeVisible();
  await expect(root.locator('.nv5-workspace-search-empty')).toHaveAttribute('data-rain-id','ui-empty');await expect(root.getByText('暂无可用导航',{exact:true})).toHaveCount(0);
  await query.fill('协作');await expect(root.getByText('置顶工作区',{exact:true})).toBeVisible();await expect(root.getByText('我的文档',{exact:true})).toHaveCount(0);await query.fill('');await expect(root.getByText('我的文档',{exact:true})).toBeVisible();
});
test('S1 restore header follows the actual professional destination',async({page})=>{
  const root=await open(page,'S1');await root.getByRole('link',{name:'专业改进建议',exact:true}).click();
  await expect(root.locator('.nv44-identity small')).toHaveText('专业改进建议');
});
test('S2 restore header follows the actual knowledge node',async({page})=>{
  const root=await open(page,'S2');await root.getByRole('tree',{name:'学习目录导航',exact:true}).getByText('1.1 函数的基本概念',{exact:true}).click();
  await expect(root.locator('.nv44-identity strong')).toHaveText('错题集 · 1.1 函数的基本概念');
});
test('S6 restore header follows the replay event and time',async({page})=>{
  const root=await open(page,'S6');await root.getByRole('group',{name:'课堂回顾事件',exact:true}).getByRole('button',{name:'随堂练习 · 等效电路',exact:true}).click();
  await expect(root.getByRole('slider',{name:'模拟播放位置',exact:true})).toHaveValue('984');await expect(root.locator('.nv44-identity small')).toHaveText('随堂练习 · 等效电路 · 16:24 / 25:00');
});
test('S5 local entry feedback preserves the document draft',async({page})=>{
  const root=await open(page,'S5'),draft=root.getByRole('textbox',{name:'教学目标草稿',exact:true});await draft.fill('本轮自查保留的本地草稿');
  await root.getByRole('button',{name:'版本记录',exact:true}).click();await expect(root.getByText('版本记录为本地入口示例；未读取或保存文档版本。',{exact:true})).toBeVisible();
  await root.getByRole('button',{name:'通知',exact:true}).click();await expect(root.getByText('通知为本地入口示例；未读取消息服务。',{exact:true})).toBeVisible();
  await root.getByRole('button',{name:'帮助',exact:true}).click();await expect(root.getByText('当前样板支持布局恢复、工具区切换与本地草稿编辑。',{exact:true})).toBeVisible();await expect(draft).toHaveValue('本轮自查保留的本地草稿');
});
