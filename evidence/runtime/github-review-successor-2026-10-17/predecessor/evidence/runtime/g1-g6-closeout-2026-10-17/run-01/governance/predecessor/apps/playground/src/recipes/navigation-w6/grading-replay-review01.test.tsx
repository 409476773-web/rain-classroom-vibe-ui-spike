import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { GradingWorkbench } from './grading-workbench';
import { ReplayWorkbench } from './replay-workbench';

beforeAll(() => {
  if (!globalThis.requestAnimationFrame) globalThis.requestAnimationFrame = callback => setTimeout(() => callback(performance.now()), 0) as unknown as number;
  if (!globalThis.cancelAnimationFrame) globalThis.cancelAnimationFrame = id => clearTimeout(id);
});
afterEach(() => vi.useRealTimers());

describe('G3 review 01: grading and replay task continuity', () => {
  it('uses the public integer score control and prevents explicit saves for an invalid score', () => {
    const { container } = render(<GradingWorkbench viewportWidth={1440} />);
    expect(container.querySelector('[data-rain-id="ui-input-number"]')).toHaveAttribute('data-size', '36');
    const score = screen.getByRole('spinbutton', { name: '本题分数' });
    expect(score).toHaveAttribute('aria-valuemin', '0');
    expect(score).toHaveAttribute('aria-valuemax', '20');
    fireEvent.change(score, { target: { value: '21' } });
    expect(score).toHaveValue('21');
    expect(screen.getByRole('button', { name: '保存本地草稿' })).toBeDisabled();
    fireEvent.change(score, { target: { value: '17.5' } });
    expect(screen.getByRole('button', { name: '保存本地草稿' })).toBeDisabled();
    fireEvent.change(score, { target: { value: '17' } });
    expect(screen.getByRole('button', { name: '保存本地草稿' })).toBeEnabled();
    expect(screen.getByText('尚未保存到本地')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: '保存本地草稿' }));
    expect(screen.getByText('已保存到本地状态')).toBeVisible();
  });

  it('changes the queue role without duplicating the two identity navigators or mixing drafts', () => {
    render(<GradingWorkbench viewportWidth={1440} />);
    fireEvent.click(screen.getByRole('button', { name: '显示批改队列' }));
    const queue = screen.getByRole('group', { name: '当前批改对象' });
    fireEvent.click(within(queue).getByRole('button', { name: '陈安' }));
    fireEvent.click(within(screen.getByRole('tablist', { name: '当前题目选择' })).getByRole('tab', { name: '第2题' }));
    fireEvent.change(screen.getByRole('spinbutton', { name: '本题分数' }), { target: { value: '16' } });
    fireEvent.change(screen.getByRole('textbox', { name: '评分评语' }), { target: { value: '补充控制变量' } });
    fireEvent.click(screen.getByRole('radio', { name: '按题' }));
    expect(within(queue).getByRole('group', { name: '当前题目选择' })).toBeVisible();
    expect(within(queue).queryByRole('group', { name: '当前学生选择' })).not.toBeInTheDocument();
    fireEvent.click(within(screen.getByRole('tablist', { name: '当前学生选择' })).getByRole('tab', { name: '林宁' }));
    expect(screen.getByRole('spinbutton', { name: '本题分数' })).toHaveValue('');
    fireEvent.click(within(screen.getByRole('tablist', { name: '当前学生选择' })).getByRole('tab', { name: '陈安' }));
    expect(screen.getByRole('spinbutton', { name: '本题分数' })).toHaveValue('16');
    expect(screen.getByRole('textbox', { name: '评分评语' })).toHaveValue('补充控制变量');
    expect(screen.getByText('尚未保存到本地')).toBeVisible();
  });

  it('keeps an incomplete numeric edit from leaking into another question', () => {
    render(<GradingWorkbench viewportWidth={1440} />);
    const score = screen.getByRole('spinbutton', { name: '本题分数' });
    fireEvent.change(score, { target: { value: '-' } });
    expect(screen.getByRole('button', { name: '保存本地草稿' })).toBeDisabled();
    fireEvent.click(within(screen.getByRole('tablist', { name: '当前题目选择' })).getByRole('tab', { name: '第2题' }));
    expect(screen.getByRole('spinbutton', { name: '本题分数' })).toHaveValue('');
    fireEvent.change(screen.getByRole('spinbutton', { name: '本题分数' }), { target: { value: '12' } });
    fireEvent.click(within(screen.getByRole('tablist', { name: '当前题目选择' })).getByRole('tab', { name: '第1题' }));
    expect(screen.getByRole('spinbutton', { name: '本题分数' })).toHaveValue('');
  });

  it('plays, pauses, and seeks the mock replay without starting on hover', () => {
    render(<ReplayWorkbench viewportWidth={1440} />);
    vi.useFakeTimers();
    fireEvent.click(screen.getByRole('button', { name: '播放回放' }));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByTestId('playback-time')).toHaveTextContent('00:02');
    fireEvent.click(screen.getByRole('button', { name: '暂停回放' }));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByTestId('playback-time')).toHaveTextContent('00:02');
    fireEvent.change(screen.getByRole('slider', { name: '回放进度' }), { target: { value: '130' } });
    expect(screen.getByTestId('playback-time')).toHaveTextContent('02:10');
    expect(screen.getByRole('button', { name: '讲稿 02:10' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.mouseOver(screen.getByRole('button', { name: '讲稿 04:00' }));
    expect(screen.getByTestId('playback-time')).toHaveTextContent('02:10');
  });

  it('pauses a deactivated scene while retaining time, chapter and notes', () => {
    const { rerender } = render(<ReplayWorkbench viewportWidth={1440} active />);
    fireEvent.change(screen.getByRole('textbox', { name: '回放笔记' }), { target: { value: '记录测量高度' } });
    fireEvent.click(screen.getByRole('button', { name: '讲稿 02:10' }));
    vi.useFakeTimers();
    fireEvent.click(screen.getByRole('button', { name: '播放回放' }));
    act(() => vi.advanceTimersByTime(1000));
    rerender(<ReplayWorkbench viewportWidth={1440} active={false} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByTestId('playback-time')).toHaveTextContent('02:11');
    rerender(<ReplayWorkbench viewportWidth={1440} active />);
    expect(screen.getByRole('button', { name: '播放回放' })).toBeVisible();
    expect(screen.getByRole('textbox', { name: '回放笔记' })).toHaveValue('记录测量高度');
    expect(screen.getByRole('button', { name: '讲稿 02:10' })).toHaveAttribute('aria-pressed', 'true');
  });
});
