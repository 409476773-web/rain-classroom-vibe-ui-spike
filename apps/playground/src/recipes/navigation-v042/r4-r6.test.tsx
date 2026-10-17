import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { R4Recipe, R5Recipe, R6Recipe } from './r4-r6';

beforeEach(()=>{
  const original=HTMLElement.prototype.getBoundingClientRect;
  vi.spyOn(HTMLElement.prototype,'getBoundingClientRect').mockImplementation(function(this:HTMLElement){return this.classList.contains('rain-workspace')?new DOMRect(0,0,1440,800):original.call(this);});
});
afterEach(()=>{cleanup();vi.useRealTimers();vi.restoreAllMocks();});

it('R6 keeps the approved 620px main budget at the 1280px adaptation boundary',()=>{
  vi.spyOn(HTMLElement.prototype,'getBoundingClientRect').mockReturnValue(new DOMRect(0,0,1280,800));
  const {container}=render(<R6Recipe/>);
  expect(container.querySelector('[data-region-id="global"]')).toHaveAttribute('data-mode','hidden');
  expect(container.querySelector('[data-region-id="fields"]')).toHaveAttribute('data-mode','expanded');
  expect(container.querySelector('.nv5-adaptation')).toHaveTextContent('平台导航暂时采用紧凑／按需显示');
  expect(screen.getByRole('textbox',{name:'课程名称'})).toHaveValue('高等数学 A');
});

it('R4 activity and group identities survive layout focus and recovery',()=>{
  render(<R4Recipe scene="interaction"/>);
  fireEvent.click(within(screen.getByRole('group',{name:'课堂活动'})).getByRole('button',{name:'小组汇报：从概念到真实应用'}));
  fireEvent.click(within(screen.getByRole('group',{name:'小组结果'})).getByRole('button',{name:'探索者小组'}));
  expect(screen.getByRole('heading',{name:'探索者小组'})).toBeVisible();
  expect(screen.getByLabelText('当前小组得分')).toHaveTextContent('8.5');
  fireEvent.click(screen.getAllByRole('button',{name:'隐藏小组列表'})[0]!);
  fireEvent.click(screen.getByRole('button',{name:'专注内容'}));
  fireEvent.click(screen.getByRole('button',{name:'退出专注'}));
  fireEvent.click(screen.getByRole('button',{name:'显示小组列表'}));
  expect(within(screen.getByRole('group',{name:'小组结果'})).getByRole('button',{name:'探索者小组'})).toHaveAttribute('aria-pressed','true');
  expect(screen.getByRole('heading',{name:'探索者小组'})).toBeVisible();
});

it('R4 group result summary follows the actual filtered and searched collection',()=>{
  const {container}=render(<R4Recipe scene="interaction"/>);
  const summary=container.querySelector('.nv5-queue-footer')!;
  fireEvent.click(screen.getByRole('radio',{name:/^未评分$/}));
  expect(summary).toHaveTextContent('共 2 个小组');
  fireEvent.change(screen.getByRole('textbox',{name:'搜索小组'}),{target:{value:'知行'}});
  expect(summary).toHaveTextContent('共 1 个小组');
  fireEvent.change(screen.getByRole('textbox',{name:'搜索小组'}),{target:{value:'没有这个组'}});
  expect(summary).toHaveTextContent('共 0 个小组');
});

it('R4 grading drafts belong to student and question identity, not layout visibility',()=>{
  const {rerender}=render(<R4Recipe scene="grading"/>);
  const feedback=screen.getByRole('textbox',{name:'给当前作答的反馈'});
  fireEvent.change(feedback,{target:{value:'补充一个具体案例。'}});
  fireEvent.change(screen.getByRole('spinbutton',{name:'当前作答得分'}),{target:{value:'9.2'}});
  fireEvent.click(within(screen.getByRole('group',{name:'学生队列'})).getByRole('button',{name:'欧阳小明'}));
  expect(screen.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue(7);
  expect(screen.getByRole('textbox',{name:'给当前作答的反馈'})).toHaveValue('');
  fireEvent.click(within(screen.getByRole('group',{name:'学生队列'})).getByRole('button',{name:'李梦'}));
  expect(feedback).toHaveValue('补充一个具体案例。');
  fireEvent.click(screen.getAllByRole('button',{name:'隐藏批改面板'})[0]!);
  fireEvent.click(screen.getByRole('button',{name:'显示批改面板'}));
  expect(screen.getByRole('textbox',{name:'给当前作答的反馈'})).toBe(feedback);
  rerender(<R4Recipe scene="interaction"/>);rerender(<R4Recipe scene="grading"/>);
  expect(screen.getByRole('textbox',{name:'给当前作答的反馈'})).toHaveValue('补充一个具体案例。');
  expect(screen.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue(9.2);
  fireEvent.click(within(screen.getByRole('group',{name:'批改题目'})).getByRole('button',{name:'第二题 · 案例分析'}));
  expect(screen.getByRole('textbox',{name:'给当前作答的反馈'})).toHaveValue('');
});

it('R5 explicit seek synchronizes both collections and slide without autoplay',()=>{
  render(<R5Recipe/>);
  fireEvent.click(within(screen.getByRole('group',{name:'课堂回顾事件'})).getByRole('button',{name:'随堂练习 · 等效电路'}));
  expect(screen.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');
  expect(screen.getByLabelText('回放时间')).toHaveTextContent('16:24 / 25:00');
  expect(screen.getByRole('heading',{name:/一起试一试.*求解等效电路/})).toBeVisible();
  expect(screen.getByRole('button',{name:'播放回放'})).toBeVisible();
  expect(screen.getByRole('button',{name:'16:24 一起试一试'})).toHaveAttribute('aria-pressed','true');
  fireEvent.click(screen.getAllByRole('button',{name:'隐藏知识索引'})[0]!);
  fireEvent.click(screen.getByRole('button',{name:'显示知识索引'}));
  expect(screen.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');
});

it('R5 playing and pausing change the real mock timeline',()=>{
  vi.useFakeTimers();render(<R5Recipe/>);
  fireEvent.click(screen.getByRole('button',{name:'播放回放'}));
  act(()=>vi.advanceTimersByTime(2000));
  fireEvent.click(screen.getByRole('button',{name:'暂停回放'}));
  const position=screen.getByRole('slider',{name:'模拟播放位置'}).getAttribute('value');
  expect(Number(position)).toBeGreaterThan(0);
  act(()=>vi.advanceTimersByTime(3000));
  expect(screen.getByRole('slider',{name:'模拟播放位置'})).toHaveValue(position);
});

it('R6 default feedback form preserves draft across views and page identities',()=>{
  render(<R6Recipe/>);
  expect(screen.getByRole('tab',{name:'反馈表单'})).toHaveAttribute('aria-selected','true');
  expect(screen.getByRole('textbox',{name:'课程名称'})).toHaveValue('高等数学 A');
  expect(screen.getByRole('radio',{name:'基本理解，需要更多练习'})).toBeChecked();
  fireEvent.change(screen.getByRole('textbox',{name:'你希望我们改进的地方'}),{target:{value:'增加等效电路练习。'}});
  fireEvent.click(screen.getByRole('tab',{name:'表格'}));
  fireEvent.click(screen.getByRole('tab',{name:'反馈表单'}));
  expect(screen.getByRole('textbox',{name:'你希望我们改进的地方'})).toHaveValue('增加等效电路练习。');
  fireEvent.click(within(screen.getByRole('navigation',{name:'工作区页面'})).getByRole('link',{name:'课程任务'}));
  expect(screen.getByRole('table',{name:'课程任务记录'})).toBeVisible();
  fireEvent.click(within(screen.getByRole('navigation',{name:'工作区页面'})).getByRole('link',{name:'学习反馈'}));
  expect(screen.getByRole('tab',{name:'反馈表单'})).toHaveAttribute('aria-selected','true');
  expect(screen.getByRole('textbox',{name:'你希望我们改进的地方'})).toHaveValue('增加等效电路练习。');
});

it('R6 named external fields recovery and add-question action preserve the form',()=>{
  render(<R6Recipe/>);
  const draft=screen.getByRole('textbox',{name:'你希望我们改进的地方'});
  fireEvent.change(draft,{target:{value:'保留这个草稿'}});
  fireEvent.click(screen.getAllByRole('button',{name:'隐藏编辑工具'})[0]!);
  fireEvent.click(screen.getByRole('button',{name:'显示编辑工具'}));
  expect(screen.getByRole('textbox',{name:'你希望我们改进的地方'})).toBe(draft);
  fireEvent.click(screen.getByRole('button',{name:'新增文本题'}));
  expect(screen.getByRole('textbox',{name:'新增文本题 1'})).toBeVisible();
  expect(draft).toHaveValue('保留这个草稿');
});

it('two R5 consumers retain separate native filter and mind-map groups',()=>{
  const {container}=render(<><R5Recipe/><R5Recipe/></>);
  const recipes=container.querySelectorAll('[data-recipe-id="recipe-navigation-r5"]');
  const first=within(recipes[0] as HTMLElement),second=within(recipes[1] as HTMLElement);
  const firstFilter=first.getByRole('radio',{name:'全部'}) as HTMLInputElement;
  const secondFilter=second.getByRole('radio',{name:'全部'}) as HTMLInputElement;
  const firstMind=first.getByRole('radio',{name:'脑图 1'}) as HTMLInputElement;
  const secondMind=second.getByRole('radio',{name:'脑图 1'}) as HTMLInputElement;
  expect(firstFilter.name).not.toBe(secondFilter.name);
  expect(firstMind.name).not.toBe(secondMind.name);
  fireEvent.click(first.getByRole('radio',{name:'习题'}));
  expect(secondFilter).toBeChecked();
  expect(second.getByRole('button',{name:'课堂导入 · 认识等效关系'})).toBeVisible();
  expect(first.queryByRole('button',{name:'课堂导入 · 认识等效关系'})).not.toBeInTheDocument();
});

it('R4 native radio mode changes the next identity without introducing a content tab',()=>{
  render(<R4Recipe scene="grading"/>);
  const order=screen.getByRole('radiogroup',{name:'批改顺序'});
  fireEvent.click(within(order).getByRole('radio',{name:'按人批改'}));
  expect(within(order).getByRole('radio',{name:'按人批改'})).toBeChecked();
  fireEvent.click(screen.getByRole('button',{name:'下一题'}));
  expect(within(screen.getByRole('group',{name:'批改题目'})).getByRole('button',{name:'第二题 · 案例分析'})).toHaveAttribute('aria-pressed','true');
  expect(within(screen.getByRole('group',{name:'学生队列'})).getByRole('button',{name:'李梦'})).toHaveAttribute('aria-pressed','true');
});

it('R4 grading announces an empty student search and reports the matching count',()=>{
  const {container}=render(<R4Recipe scene="grading"/>);
  const feedback=screen.getByRole('textbox',{name:'给当前作答的反馈'});
  fireEvent.change(feedback,{target:{value:'搜索时保留当前批改草稿'}});
  const search=screen.getByRole('textbox',{name:'搜索学生姓名或学号'});
  fireEvent.change(search,{target:{value:'无匹配学生'}});
  expect(screen.getByText('未找到匹配的学生')).toBeVisible();
  expect(container.querySelector('.nv5-student-queue .nv5-queue-head small')).toHaveTextContent('0 / 6 人');
  fireEvent.click(screen.getByRole('button',{name:'清除搜索学生姓名或学号'}));
  expect(screen.queryByText('未找到匹配的学生')).not.toBeInTheDocument();
  expect(container.querySelector('.nv5-student-queue .nv5-queue-head small')).toHaveTextContent('6 人');
  expect(screen.getByRole('textbox',{name:'给当前作答的反馈'})).toHaveValue('搜索时保留当前批改草稿');
});

it('R4 group search clears its empty result without changing submission filter or current group',()=>{
  render(<R4Recipe scene="interaction"/>);
  fireEvent.click(screen.getByRole('radio',{name:/^未评分$/}));
  fireEvent.click(within(screen.getByRole('group',{name:'小组结果'})).getByRole('button',{name:'知行合一'}));
  fireEvent.change(screen.getByRole('textbox',{name:'搜索小组'}),{target:{value:'无匹配小组'}});
  expect(screen.getByText('未找到匹配的小组')).toBeVisible();
  fireEvent.click(screen.getByRole('button',{name:'清除搜索小组'}));
  expect(screen.getByRole('radio',{name:/^未评分$/})).toBeChecked();
  expect(within(screen.getByRole('group',{name:'小组结果'})).getAllByRole('button')).toHaveLength(2);
  expect(within(screen.getByRole('group',{name:'小组结果'})).getByRole('button',{name:'知行合一'})).toHaveAttribute('aria-pressed','true');
});

it('R6 provides one search-empty message across its navigation groups and preserves the page draft',()=>{
  render(<R6Recipe/>);
  fireEvent.change(screen.getByRole('textbox',{name:'你希望我们改进的地方'}),{target:{value:'工作区搜索不会改变内容草稿'}});
  fireEvent.change(screen.getByRole('textbox',{name:'搜索工作区'}),{target:{value:'不匹配任何工作区'}});
  expect(screen.getAllByText('未找到匹配的工作区或文档')).toHaveLength(1);
  fireEvent.click(screen.getByRole('button',{name:'清除搜索工作区'}));
  expect(screen.queryByText('未找到匹配的工作区或文档')).not.toBeInTheDocument();
  expect(within(screen.getByRole('navigation',{name:'置顶工作区'})).getByRole('link',{name:'课程教学协作空间'})).toBeVisible();
  expect(screen.getByRole('textbox',{name:'你希望我们改进的地方'})).toHaveValue('工作区搜索不会改变内容草稿');
});
