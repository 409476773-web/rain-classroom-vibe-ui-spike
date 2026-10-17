import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { GradingWorkbench } from './grading-workbench';

beforeAll(() => {
  if (!globalThis.requestAnimationFrame) globalThis.requestAnimationFrame = callback => setTimeout(() => callback(performance.now()), 0) as unknown as number;
  if (!globalThis.cancelAnimationFrame) globalThis.cancelAnimationFrame = id => clearTimeout(id);
});

describe('G3 review 02: controlled grading content tabs', () => {
  it('switches question panels while preserving each student/question draft without saving', () => {
    render(<GradingWorkbench viewportWidth={1440} />);
    const questionTabs = screen.getByRole('tablist', { name: '当前题目选择' });
    fireEvent.click(within(questionTabs).getByRole('tab', { name: '第2题' }));
    fireEvent.change(screen.getByRole('spinbutton', { name: '本题分数' }), { target: { value: '16' } });
    fireEvent.change(screen.getByRole('textbox', { name: '评分评语' }), { target: { value: '控制变量需要补充' } });
    fireEvent.click(within(questionTabs).getByRole('tab', { name: '第3题' }));
    expect(screen.getByTestId('grading-identity')).toHaveAttribute('data-question-id', 'q3');
    expect(screen.getByRole('textbox', { name: '评分评语' })).toHaveValue('');
    fireEvent.click(within(questionTabs).getByRole('tab', { name: '第2题' }));
    expect(screen.getByRole('spinbutton', { name: '本题分数' })).toHaveValue('16');
    expect(screen.getByRole('textbox', { name: '评分评语' })).toHaveValue('控制变量需要补充');
    expect(screen.getByText('尚未保存到本地')).toBeVisible();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('设计控制变量');
  });

  it('turns the secondary axis into student tabs in question mode while keeping the selected pair', () => {
    render(<GradingWorkbench viewportWidth={1440} />);
    fireEvent.click(within(screen.getByRole('tablist', { name: '当前题目选择' })).getByRole('tab', { name: '第2题' }));
    fireEvent.change(screen.getByRole('textbox', { name: '评分评语' }), { target: { value: '林宁第二题的意见' } });
    fireEvent.click(screen.getByRole('button', { name: '显示批改队列' }));
    fireEvent.click(screen.getByRole('radio', { name: '按题' }));
    const studentTabs = screen.getByRole('tablist', { name: '当前学生选择' });
    expect(within(studentTabs).getByRole('tab', { name: '林宁' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(within(studentTabs).getByRole('tab', { name: '陈安' }));
    expect(screen.getByTestId('grading-identity')).toHaveAttribute('data-draft-key', 'paper-microclimate/q2/chen-an');
    expect(screen.getByRole('textbox', { name: '评分评语' })).toHaveValue('');
    fireEvent.change(screen.getByRole('textbox', { name: '评分评语' }), { target: { value: '陈安第二题的意见' } });
    fireEvent.click(within(studentTabs).getByRole('tab', { name: '林宁' }));
    fireEvent.click(screen.getByRole('radio', { name: '按人' }));
    expect(within(screen.getByRole('tablist', { name: '当前题目选择' })).getByRole('tab', { name: '第2题' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('textbox', { name: '评分评语' })).toHaveValue('林宁第二题的意见');
    fireEvent.click(screen.getByRole('button', { name: '进入专注' }));
    expect(screen.getByRole('complementary', { name: '评分区' })).toBeVisible();
    expect(screen.getByText('尚未保存到本地')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: '退出专注' }));
    fireEvent.click(screen.getByRole('button', { name: '保存本地草稿' }));
    expect(screen.getByText('已保存到本地状态')).toBeVisible();
  });
});
