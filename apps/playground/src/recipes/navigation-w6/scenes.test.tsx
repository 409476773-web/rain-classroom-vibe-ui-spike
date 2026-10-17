import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { ClassroomInteraction, CourseResources, GradingWorkbench, InstanceIsolation, ReplayWorkbench } from './scenes';

beforeAll(() => {
  if (!globalThis.requestAnimationFrame) globalThis.requestAnimationFrame = callback => setTimeout(() => callback(performance.now()), 0) as unknown as number;
  if (!globalThis.cancelAnimationFrame) globalThis.cancelAnimationFrame = id => clearTimeout(id);
});

describe('W6 independent application consumers', () => {
  it('E1 searches the entire 240-class collection and preserves each scope draft', async () => {
    render(<CourseResources />);
    fireEvent.change(screen.getByRole('textbox', { name: '资源说明草稿' }), { target: { value: '公共资源本地说明' } });
    fireEvent.click(screen.getByRole('button', { name: '更多班级' }));
    fireEvent.change(screen.getByRole('textbox', { name: '搜索范围' }), { target: { value: '237' } });
    fireEvent.click(screen.getByRole('button', { name: /跨学科项目课程.*237班/ }));
    expect(screen.getByRole('heading', { name: /237班资源/ })).toBeVisible();
    expect(screen.getByRole('textbox', { name: '资源说明草稿' })).toHaveValue('');
    fireEvent.change(screen.getByRole('textbox', { name: '资源说明草稿' }), { target: { value: '237班说明' } });
    fireEvent.click(screen.getByRole('tab', { name: '公共资源包' }));
    expect(screen.getByRole('textbox', { name: '资源说明草稿' })).toHaveValue('公共资源本地说明');
  });

  it('E1 handles missing current scope without silently selecting or losing its draft', async () => {
    render(<CourseResources />);
    fireEvent.click(screen.getByRole('tab', { name: /001班/ }));
    fireEvent.change(screen.getByRole('textbox', { name: '资源说明草稿' }), { target: { value: '被移除班级草稿' } });
    fireEvent.click(screen.getByRole('button', { name: '移除当前班级' }));
    expect(screen.getByText('当前范围已不可用，请重新选择。')).toBeVisible();
    expect(screen.getByRole('tab', { name: '公共资源包' })).toHaveAttribute('aria-selected', 'false');
    fireEvent.click(screen.getByRole('button', { name: '恢复刚移除的班级' }));
    expect(screen.getByRole('textbox', { name: '资源说明草稿' })).toHaveValue('被移除班级草稿');
  });

  it('E2 keeps group identity and detail valid when switching activity', () => {
    render(<ClassroomInteraction viewportWidth={1440} />);
    fireEvent.click(screen.getByRole('button', { name: '证据分析讨论' }));
    fireEvent.click(screen.getByRole('button', { name: '第二研究组' }));
    expect(screen.getByRole('heading', { name: '第二研究组 · 证据分析讨论' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: '方案投票' }));
    expect(screen.getByRole('heading', { name: '第一研究组 · 方案投票' })).toBeVisible();
    expect(screen.getByTestId('interaction-identity')).toHaveAttribute('data-activity-id', 'vote');
    expect(screen.getByTestId('interaction-identity')).toHaveAttribute('data-group-id', 'vote-g1');
  });

  it('E3 initially hides the object queue while score stays mounted through focus', () => {
    render(<GradingWorkbench viewportWidth={1440} />);
    const score = screen.getByRole('complementary', { name: '评分区' });
    expect(screen.getByRole('button', { name: '显示批改队列' })).toBeVisible();
    expect(document.querySelector('[data-region-id="grading-queue"]')).toHaveAttribute('hidden');
    fireEvent.click(screen.getByRole('button', { name: '进入专注' }));
    expect(screen.getByRole('complementary', { name: '评分区' })).toBe(score);
    expect(score).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: '退出专注' }));
    expect(screen.getByRole('complementary', { name: '评分区' })).toBe(score);
  });

  it('E3 keeps the student/question pair and keyed draft through mode, appearance and queue changes', () => {
    render(<GradingWorkbench viewportWidth={1440} />);
    fireEvent.click(screen.getByRole('button', { name: '显示批改队列' }));
    fireEvent.click(within(screen.getByRole('group', { name: '当前学生选择' })).getByRole('button', { name: '陈安' }));
    fireEvent.click(within(screen.getByRole('tablist', { name: '当前题目选择' })).getByRole('tab', { name: '第2题' }));
    fireEvent.change(screen.getByRole('textbox', { name: '评分评语' }), { target: { value: '请补充实验依据' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: '本题分数' }), { target: { value: '17' } });
    fireEvent.click(screen.getByRole('radio', { name: '按题' }));
    fireEvent.click(screen.getByRole('radio', { name: '卡片队列' }));
    fireEvent.click(screen.getByRole('button', { name: '隐藏批改队列' }));
    expect(screen.getByTestId('grading-identity')).toHaveAttribute('data-student-id', 'chen-an');
    expect(screen.getByTestId('grading-identity')).toHaveAttribute('data-question-id', 'q2');
    expect(screen.getByRole('textbox', { name: '评分评语' })).toHaveValue('请补充实验依据');
    expect(screen.getByRole('spinbutton', { name: '本题分数' })).toHaveValue('17');
    expect(screen.getByText('尚未保存到本地')).toBeVisible();
    // In question mode this axis lives in the left queue; restore it before selecting.
    fireEvent.click(screen.getByRole('button', { name: '显示批改队列' }));
    fireEvent.click(within(screen.getByRole('group', { name: '当前题目选择' })).getByRole('button', { name: '第1题' }));
    expect(screen.getByRole('textbox', { name: '评分评语' })).toHaveValue('');
    fireEvent.click(within(screen.getByRole('group', { name: '当前题目选择' })).getByRole('button', { name: '第2题' }));
    expect(screen.getByRole('textbox', { name: '评分评语' })).toHaveValue('请补充实验依据');
  });

  it('E4 seeks only on activation and closes temporary knowledge index with restored focus', async () => {
    render(<ReplayWorkbench viewportWidth={1440} />);
    fireEvent.click(screen.getByRole('button', { name: '临时查看知识索引' }));
    expect(document.querySelector('.rain-workspace__region[data-region-id="knowledge-index"]')).toHaveAttribute('data-temporary', 'true');
    fireEvent.mouseOver(screen.getByRole('button', { name: '控制变量 · 02:10' }));
    expect(screen.getByTestId('playback-time')).toHaveTextContent('00:00');
    fireEvent.click(screen.getByRole('button', { name: '控制变量 · 02:10' }));
    expect(screen.getByTestId('playback-time')).toHaveTextContent('02:10');
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.getByRole('button', { name: '临时查看知识索引' })).toHaveFocus());
    expect(screen.getByTestId('playback-time')).toHaveTextContent('02:10');
    fireEvent.click(screen.getByRole('button', { name: '进入专注' }));
    fireEvent.click(screen.getByRole('button', { name: '退出专注' }));
    expect(screen.getByRole('button', { name: '讲稿 02:10' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('E5 compacts only instance A without changing instance B DOM, selection or draft', () => {
    render(<InstanceIsolation viewportWidth={640} />);
    const b = screen.getByRole('region', { name: '实例 B' });
    fireEvent.click(within(b).getByRole('button', { name: '实验方法' }));
    fireEvent.change(within(b).getByRole('textbox', { name: '实例 B 草稿' }), { target: { value: 'B保留的审阅说明' } });
    const before = b.innerHTML;
    fireEvent.click(screen.getByRole('button', { name: '仅当前实例 A 使用紧凑目录' }));
    expect(screen.getByRole('region', { name: '实例 A' })).toHaveAttribute('data-directory-density', 'compact');
    expect(b.innerHTML).toBe(before);
    expect(within(b).getByRole('button', { name: '实验方法' })).toHaveAttribute('aria-pressed', 'true');
    expect(within(b).getByRole('textbox', { name: '实例 B 草稿' })).toHaveValue('B保留的审阅说明');
  });
});
