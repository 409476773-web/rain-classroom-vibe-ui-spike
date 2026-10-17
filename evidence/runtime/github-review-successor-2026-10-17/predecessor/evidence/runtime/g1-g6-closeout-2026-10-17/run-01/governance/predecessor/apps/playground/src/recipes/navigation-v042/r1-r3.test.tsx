import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { R1Recipe, R3Recipe } from './r1-r3';

beforeEach(()=>{
  const original=HTMLElement.prototype.getBoundingClientRect;
  vi.spyOn(HTMLElement.prototype,'getBoundingClientRect').mockImplementation(function(this:HTMLElement){
    return this.classList.contains('rain-workspace')?new DOMRect(0,0,1440,800):original.call(this);
  });
});
afterEach(()=>{cleanup();vi.restoreAllMocks();});
it('two R1 instances keep native graph radio selection independent',()=>{
  render(<><R1Recipe scene="industry"/><R1Recipe scene="industry"/></>);
  const [a,b]=screen.getAllByRole('radiogroup',{name:'图谱显示模式'});
  const aTree=within(a!).getByRole('radio',{name:'矩形树图'}),bSankey=within(b!).getByRole('radio',{name:'桑基图'});
  fireEvent.click(bSankey);
  expect(aTree).toBeChecked();expect(bSankey).toBeChecked();expect(aTree.getAttribute('name')).not.toBe(bSankey.getAttribute('name'));
});
it('R1 changes analysis content without making graph modes into tabs', () => {
  const { rerender } = render(<R1Recipe scene="plan"/>);
  fireEvent.click(screen.getByRole('tab', {name:'学分结构'}));
  expect(screen.getByRole('tabpanel', {name:'学分结构'})).toBeVisible();
  rerender(<R1Recipe scene="industry"/>);
  fireEvent.click(screen.getByRole('radio', {name:'桑基图'}));
  expect(screen.getByRole('radio', {name:'桑基图'})).toBeChecked();
  expect(screen.getByRole('heading', {name:'产业链图谱'})).toBeVisible();
  rerender(<R1Recipe scene="plan"/>);
  expect(screen.getByRole('tab', {name:'学分结构'})).toHaveAttribute('aria-selected','true');
});
it('R3 view switches keep the directory, while search really filters files', () => {
  render(<R3Recipe scene="files"/>);
  fireEvent.change(screen.getByRole('textbox',{name:'搜索当前范围内的文件'}), {target:{value:'教学大纲'}});
  expect(screen.getByText('2026 秋季课程教学大纲.docx')).toBeVisible();
  expect(screen.queryByText('工程实践项目参考文献汇编.pdf')).toBeNull();
  fireEvent.click(screen.getByRole('radio', {name:'网格'}));
  expect(screen.getByRole('radio', {name:'网格'})).toBeChecked();
  expect(screen.getByLabelText('资源路径')).toHaveTextContent('教学资料');
});
it('R3 white filter stays a condition, stars and current directory remain independent', () => {
  render(<R3Recipe scene="errors"/>);
  fireEvent.click(screen.getByRole('radio',{name:'加星'}));
  expect(screen.getByRole('table',{name:'当前范围习题'}).querySelectorAll('tbody tr')).toHaveLength(3);
  fireEvent.click(screen.getByRole('button',{name:/取消加星.*第 1 题/}));
  expect(screen.getByRole('table',{name:'当前范围习题'}).querySelectorAll('tbody tr')).toHaveLength(2);
  expect(screen.getByRole('tree',{name:'学习目录导航'})).toBeVisible();
  expect(screen.queryByRole('button',{name:'进入编辑'})).toBeNull();
});
it('R1 keeps full destination identity separately for each professional scene', () => {
  const {rerender}=render(<R1Recipe scene="plan"/>);
  const choose=(group:string,label:string)=>within(screen.getByRole('navigation',{name:group})).getByRole('link',{name:label});
  fireEvent.click(choose('质量监控','学生培养分析'));
  expect(choose('质量监控','学生培养分析')).toHaveAttribute('aria-current','page');
  expect(screen.getByRole('heading',{name:'学生培养分析'})).toBeVisible();
  rerender(<R1Recipe scene="industry"/>);
  fireEvent.click(choose('产业调研','产业政策库'));
  expect(choose('产业调研','产业政策库')).toHaveAttribute('aria-current','page');
  rerender(<R1Recipe scene="plan"/>);
  expect(choose('质量监控','学生培养分析')).toHaveAttribute('aria-current','page');
});
it('R3 derives the current path from directory identity and isolates scene searches', () => {
  const {rerender}=render(<R3Recipe scene="files"/>);
  fireEvent.change(screen.getByRole('textbox',{name:'搜索当前范围内的文件'}), {target:{value:'教学大纲'}});
  rerender(<R3Recipe scene="errors"/>);
  expect(screen.getByRole('table',{name:'当前范围习题'}).querySelectorAll('tbody tr')).toHaveLength(6);
  fireEvent.click(screen.getByRole('treeitem',{name:'2.2 导数的应用'}));
  expect(screen.getByLabelText('资源路径')).toHaveTextContent('第二章 · 导数与微分');
  expect(screen.getByLabelText('资源路径')).toHaveTextContent('2.2 导数的应用');
  expect(screen.getByLabelText('资源路径')).not.toHaveTextContent('函数、极限与连续');
  rerender(<R3Recipe scene="files"/>);
  expect(screen.getByRole('textbox',{name:'搜索当前范围内的文件'})).toHaveValue('教学大纲');
});
it('R3 page selection keeps selected files outside the current search', () => {
  render(<R3Recipe scene="files"/>);
  fireEvent.click(screen.getByRole('checkbox',{name:'选择 工程实践项目参考文献汇编.pdf'}));
  const search=screen.getByRole('textbox',{name:'搜索当前范围内的文件'});
  fireEvent.change(search,{target:{value:'教学大纲'}});
  fireEvent.click(screen.getByRole('checkbox',{name:'选择当前页全部文件'}));
  expect(screen.getByRole('checkbox',{name:'选择 2026 秋季课程教学大纲.docx'})).toBeChecked();
  fireEvent.click(screen.getByRole('checkbox',{name:'选择当前页全部文件'}));
  fireEvent.change(search,{target:{value:''}});
  expect(screen.getByRole('checkbox',{name:'选择 工程实践项目参考文献汇编.pdf'})).toBeChecked();
  expect(screen.getByRole('checkbox',{name:'选择 2026 秋季课程教学大纲.docx'})).not.toBeChecked();
});
it('R3 workspace layout keeps the current directory and search through focus and recovery',()=>{
  render(<R3Recipe scene="files"/>);
  fireEvent.click(within(screen.getByRole('navigation',{name:'常用文件夹'})).getByRole('link',{name:'课程案例'}));
  fireEvent.change(screen.getByRole('textbox',{name:'搜索当前范围内的文件'}),{target:{value:'教学大纲'}});
  fireEvent.click(screen.getAllByRole('button',{name:'隐藏资源目录'})[0]!);
  fireEvent.click(screen.getByRole('button',{name:'专注内容'}));
  fireEvent.click(screen.getByRole('button',{name:'退出专注'}));
  expect(screen.getByRole('button',{name:'显示资源目录'})).toBeVisible();
  fireEvent.click(screen.getByRole('button',{name:'显示资源目录'}));
  expect(screen.getByLabelText('资源路径')).toHaveTextContent('课程案例');
  expect(screen.getByRole('textbox',{name:'搜索当前范围内的文件'})).toHaveValue('教学大纲');
});
it('R3 grid preserves file types and visible selection independently from opening a file',()=>{
  render(<R3Recipe scene="files"/>);
  const pdf='第一章 函数、极限与连续.pdf';
  fireEvent.click(screen.getByRole('checkbox',{name:`选择 ${pdf}`}));
  fireEvent.click(screen.getByRole('radio',{name:'网格'}));
  const grid=screen.getByRole('group',{name:'云盘文件网格'});
  const selection=within(grid).getByRole('checkbox',{name:`选择 ${pdf}`});
  expect(selection).toBeChecked();
  const file=within(grid).getByRole('button',{name:pdf});
  expect(file.querySelector('[data-icon="icon/file-format-pdf-outline"]')).toBeTruthy();
  expect(within(grid).getByRole('button',{name:'2026 秋季课程教学大纲.docx'}).querySelector('[data-icon="icon/file-format-docx-outline"]')).toBeTruthy();
  expect(within(grid).getByRole('button',{name:'大学物理实验成绩与反馈汇总表.xlsx'}).querySelector('[data-icon="icon/file-format-xlsx-outline"]')).toBeTruthy();
  fireEvent.click(file);
  expect(selection).toBeChecked();
  fireEvent.click(selection);
  fireEvent.click(screen.getByRole('radio',{name:'列表'}));
  expect(screen.getByRole('checkbox',{name:`选择 ${pdf}`})).not.toBeChecked();
});
it('R1/R3 context pin labels describe the action that the current state will perform',()=>{
  render(<R3Recipe scene="files"/>);
  fireEvent.click(screen.getByRole('button',{name:'取消固定资源目录'}));
  expect(screen.getByRole('button',{name:'固定资源目录'})).toBeVisible();
  fireEvent.click(screen.getByRole('button',{name:'固定资源目录'}));
  expect(screen.getByRole('button',{name:'取消固定资源目录'})).toBeVisible();
});
