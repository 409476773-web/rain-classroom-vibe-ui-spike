import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { WorkspaceStateSample, createNavigationWorkspaceSpec } from './workspace-states';

it('uses measured S defaults and stable workspace, subscene and instance identities', () => {
  const first = createNavigationWorkspaceSpec('S1', 'one'), second = createNavigationWorkspaceSpec('S1', 'two');
  expect(first.workspaceKey).not.toBe(second.workspaceKey); expect(first.regions.map(item => [item.id, item.defaultMode, item.defaultWidth])).toEqual([['global', 'expanded', 208], ['context', 'expanded', 216]]);
  expect(createNavigationWorkspaceSpec('S3', 'one').regions.map(item => [item.id, item.defaultMode, item.defaultWidth])).toEqual([['global', 'compact', 208], ['context', 'hidden', 216], ['directory', 'expanded', 190], ['fields', 'expanded', 188]]);
  expect(createNavigationWorkspaceSpec('S4', 'one', 'grading').regions.map(item => item.id)).toEqual(['queue', 'review']);
  expect(createNavigationWorkspaceSpec('S4', 'one', 'grading').regions.map(item => [item.label,item.boundaryWidth])).toEqual([['学生列表',10],['批改面板',10]]);
});
it('preserves the native S5 ribbon height budget and the same panel through all modes', async () => {
  render(<WorkspaceStateSample scene="S5"/>);
  const panel = document.querySelector<HTMLElement>('.nv44-ribbon')!, owner = panel.parentElement!, controls = screen.getByRole('button', { name: '布局设置' });
  expect(owner).toHaveStyle({ height: '111px' }); fireEvent.click(controls);
  const select = await screen.findByLabelText('文档工具显示模式');
  fireEvent.change(select, { target: { value: 'icons' } }); expect(owner).toHaveStyle({ height: '83px' });
  fireEvent.change(select, { target: { value: 'tabs' } }); expect(owner).toHaveStyle({ height: '41px' });
  fireEvent.change(select, { target: { value: 'hidden' } }); expect(owner).toHaveStyle({ height: '0px' }); expect(panel).toHaveAttribute('hidden');
  fireEvent.click(screen.getByRole('button', { name: '显示文档工具' })); expect(panel).not.toHaveAttribute('hidden'); expect(panel).toHaveStyle({ height: '112px' }); expect(owner).toHaveStyle({ height: '0px' });
  const input = screen.getByRole('textbox', { name: '教学目标草稿' }); act(() => input.focus()); fireEvent.pointerDown(input); expect(panel).toHaveAttribute('data-temporary', 'false'); expect(input).toHaveFocus(); expect(document.querySelector('.nv44-ribbon')).toBe(panel);
});
it('temporarily opens S5 tools when activating the already selected ribbon tab', () => {
  render(<WorkspaceStateSample scene="S5"/>);
  const panel = document.querySelector<HTMLElement>('.nv44-ribbon')!, owner = panel.parentElement!, draft = screen.getByRole('textbox', { name: '教学目标草稿' });
  const start = screen.getByRole('tab', { name: '开始' });
  expect(start).toHaveAttribute('aria-selected', 'true');
  fireEvent.click(screen.getByRole('button', { name: '收起工具区' }));
  expect(panel).toHaveAttribute('data-mode', 'tabs'); expect(panel).toHaveAttribute('data-temporary', 'false');
  fireEvent.click(start);
  expect(panel).toHaveAttribute('data-temporary', 'true'); expect(panel).toHaveStyle({ height: '112px' }); expect(owner).toHaveStyle({ height: '41px' });
  expect(start).toHaveAttribute('aria-selected', 'true'); expect(screen.getByRole('button', { name: '加粗目标' })).toBeVisible();
  fireEvent.pointerDown(draft); expect(panel).toHaveAttribute('data-temporary', 'false');
  fireEvent.click(screen.getByRole('tab', { name: '插入' }));
  expect(panel).toHaveAttribute('data-temporary', 'true'); expect(screen.getByRole('button', { name: '插入示例' })).toBeVisible();
});
it('keeps S3 recovery identity synchronized with the actual page and view', () => {
  const geometry = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1440, 800));
  try {
    render(<WorkspaceStateSample scene="S3"/>);
    const identity = within(screen.getByLabelText('当前工作区与区域恢复'));
    expect(identity.getByText('课程教学协作空间')).toBeVisible(); expect(identity.getByText('学习反馈 / 反馈表单')).toBeVisible();
    fireEvent.click(screen.getByRole('tab', { name: '表格' })); expect(identity.getByText('学习反馈 / 表格')).toBeVisible();
    fireEvent.click(screen.getByRole('tab', { name: '状态分组' })); expect(identity.getByText('学习反馈 / 状态分组')).toBeVisible();
    fireEvent.click(within(screen.getByRole('navigation', { name: '工作区页面' })).getByRole('link', { name: '课程任务' })); expect(identity.getByText('课程任务 / 表格')).toBeVisible();
  } finally { geometry.mockRestore(); }
});
it('uses the live S4 grading identity and updates it when selecting a different student', () => {
  const geometry = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1440, 800));
  try {
    const { rerender } = render(<WorkspaceStateSample scene="S4" variant="interaction"/>);
    const identity = within(screen.getByLabelText('当前工作区与区域恢复'));
    expect(identity.getByText('辩论赛：大学校园是否应该免费开放')).toBeVisible();
    rerender(<WorkspaceStateSample scene="S4" variant="grading"/>);
    expect(identity.getByText('A 卷 · 第一题 · 概念辨析 · 李梦')).toBeVisible(); expect(identity.getByText('按题批改 · 仅本地演示草稿')).toBeVisible();
    fireEvent.click(within(screen.getByRole('group', { name: '学生队列' })).getByRole('button', { name: '欧阳小明' })); expect(identity.getByText('A 卷 · 第一题 · 概念辨析 · 欧阳小明')).toBeVisible();
    fireEvent.click(within(screen.getByRole('group', { name: '批改题目' })).getByRole('button', { name: '第二题 · 案例分析' })); expect(identity.getByText('A 卷 · 第二题 · 案例分析 · 欧阳小明')).toBeVisible();
  } finally { geometry.mockRestore(); }
});
it('retains caller-owned S5 drafts through context switch, focus and all-hidden recovery', async () => {
  const view = render(<WorkspaceStateSample scene="S5" instanceId="draft-owner"/>), input = screen.getByRole('textbox', { name: '教学目标草稿' });
  fireEvent.change(input, { target: { value: '仍未提交的教学目标' } }); fireEvent.click(screen.getByRole('button', { name: '专注内容' })); expect(input).toHaveValue('仍未提交的教学目标'); fireEvent.click(screen.getByRole('button', { name: '退出专注' }));
  fireEvent.click(screen.getByRole('button', { name: '布局设置' })); fireEvent.click(await screen.findByRole('button', { name: '隐藏全部区域' }));
  expect(input).toHaveValue('仍未提交的教学目标'); expect(screen.getByRole('button', { name: '显示课程导航' })).toHaveAttribute('aria-controls');
  view.rerender(<WorkspaceStateSample scene="S1" instanceId="draft-owner"/>); expect(screen.queryByRole('textbox', { name: '教学目标草稿' })).toBeNull();
  view.rerender(<WorkspaceStateSample scene="S5" instanceId="draft-owner"/>); expect(screen.getByRole('textbox', { name: '教学目标草稿' })).toHaveValue('仍未提交的教学目标');
});
it('keeps two S5 instances and their recovery IDs and drafts independent', () => {
  render(<><div data-testid="one"><WorkspaceStateSample scene="S5" instanceId="one"/></div><div data-testid="two"><WorkspaceStateSample scene="S5" instanceId="two"/></div></>);
  const one = within(screen.getByTestId('one')), other = within(screen.getByTestId('two'));
  fireEvent.change(one.getByRole('textbox', { name: '教学目标草稿' }), { target: { value: '实例一草稿' } });
  expect(one.getByRole('textbox', { name: '教学目标草稿' })).toHaveValue('实例一草稿'); expect(other.getByRole('textbox', { name: '教学目标草稿' })).not.toHaveValue('实例一草稿');
  const first = one.getByRole('button', { name: '收起文档工具' }), second = other.getByRole('button', { name: '收起文档工具' });
  expect(first.getAttribute('aria-controls')).not.toBe(second.getAttribute('aria-controls'));
});
it('keeps a draft owner per stable instance when the same sample switches instance identity', () => {
  const view = render(<WorkspaceStateSample scene="S5" instanceId="one"/>);
  fireEvent.change(screen.getByRole('textbox', { name: '教学目标草稿' }), { target: { value: '实例一未提交的目标' } });
  view.rerender(<WorkspaceStateSample scene="S5" instanceId="two"/>); expect(screen.getByRole('textbox', { name: '教学目标草稿' })).not.toHaveValue('实例一未提交的目标');
  view.rerender(<WorkspaceStateSample scene="S5" instanceId="one"/>); expect(screen.getByRole('textbox', { name: '教学目标草稿' })).toHaveValue('实例一未提交的目标');
});
it('restores S5 default panel widths as well as modes without losing the document draft', async () => {
  const geometry = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1600, 800));
  try {
    render(<WorkspaceStateSample scene="S5" instanceId="default-width-review"/>);
    const draft = screen.getByRole('textbox', { name: '教学目标草稿' });
    fireEvent.change(draft, { target: { value: '恢复默认仍属于当前文档的目标。' } });
    const splitter = screen.getByRole('separator', { name: '调整课程导航宽度' });
    fireEvent.keyDown(splitter, { key: 'ArrowRight' });
    fireEvent.keyDown(splitter, { key: 'ArrowRight' });
    fireEvent.keyDown(splitter, { key: 'ArrowRight' });
    expect(splitter).toHaveAttribute('aria-valuenow', '246');
    fireEvent.click(screen.getByRole('button', { name: '布局设置' }));
    fireEvent.click(await screen.findByRole('button', { name: /^恢复默认$/ }));
    expect(splitter).toHaveAttribute('aria-valuenow', '216');
    expect(draft).toHaveValue('恢复默认仍属于当前文档的目标。');
  } finally { geometry.mockRestore(); }
});
it('keeps S1 recovery identity synchronized with the selected professional destination', () => {
  const geometry = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1440, 800));
  try {
    render(<WorkspaceStateSample scene="S1"/>);
    fireEvent.click(screen.getByRole('link', { name: '专业改进建议' }));
    expect(within(screen.getByLabelText('当前工作区与区域恢复')).getByText('专业改进建议')).toBeVisible();
  } finally { geometry.mockRestore(); }
});
it('keeps S2 recovery identity synchronized with the selected knowledge directory', () => {
  const geometry = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1440, 800));
  try {
    render(<WorkspaceStateSample scene="S2"/>);
    fireEvent.click(within(screen.getByRole('tree', { name: '学习目录导航' })).getByText('1.1 函数的基本概念', { exact: true }));
    expect(within(screen.getByLabelText('当前工作区与区域恢复')).getByText('错题集 · 1.1 函数的基本概念')).toBeVisible();
  } finally { geometry.mockRestore(); }
});
it('keeps S6 recovery identity synchronized with the actual replay event and time', () => {
  const geometry = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 1440, 800));
  try {
    render(<WorkspaceStateSample scene="S6"/>);
    fireEvent.click(within(screen.getByRole('group', { name: '课堂回顾事件' })).getByRole('button', { name: '随堂练习 · 等效电路' }));
    expect(screen.getByRole('slider', { name: '模拟播放位置' })).toHaveValue('984');
    expect(within(screen.getByLabelText('当前工作区与区域恢复')).getByText('随堂练习 · 等效电路 · 16:24 / 25:00')).toBeVisible();
  } finally { geometry.mockRestore(); }
});
it('gives explicit local S5 entry feedback without changing the document draft', () => {
  render(<WorkspaceStateSample scene="S5"/>);
  const draft = screen.getByRole('textbox', { name: '教学目标草稿' });
  fireEvent.change(draft, { target: { value: '入口操作保留当前文档草稿。' } });
  fireEvent.click(screen.getByRole('button', { name: '版本记录' }));
  expect(screen.getByText('版本记录为本地入口示例；未读取或保存文档版本。')).toHaveAttribute('role', 'status');
  fireEvent.click(screen.getByRole('button', { name: '显示平台导航' }));
  fireEvent.click(screen.getByRole('button', { name: '通知' }));
  expect(screen.getByText('通知为本地入口示例；未读取消息服务。')).toHaveAttribute('role', 'status');
  fireEvent.click(screen.getByRole('button', { name: '帮助' }));
  expect(screen.getByText('当前样板支持布局恢复、工具区切换与本地草稿编辑。')).toHaveAttribute('role', 'status');
  expect(draft).toHaveValue('入口操作保留当前文档草稿。');
});
it('restores the default disabled hover preview without resetting the document draft', async () => {
  render(<WorkspaceStateSample scene="S5"/>);
  const draft = screen.getByRole('textbox', { name: '教学目标草稿' });
  fireEvent.change(draft, { target: { value: '恢复悬停默认仍保留目标。' } });
  fireEvent.click(screen.getByRole('button', { name: '布局设置' }));
  const hover = await screen.findByRole('checkbox', { name: '悬停临时查看' });
  expect(hover).not.toBeChecked(); fireEvent.click(hover); expect(hover).toBeChecked();
  fireEvent.click(screen.getByRole('button', { name: /^恢复默认$/ }));
  expect(hover).not.toBeChecked(); expect(draft).toHaveValue('恢复悬停默认仍保留目标。');
});
