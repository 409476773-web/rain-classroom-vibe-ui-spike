import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeAll, describe, expect, it } from 'vitest';
import { ClassroomInteraction } from './scenes';

beforeAll(() => {
  if (!globalThis.requestAnimationFrame) globalThis.requestAnimationFrame = callback => setTimeout(() => callback(performance.now()), 0) as unknown as number;
  if (!globalThis.cancelAnimationFrame) globalThis.cancelAnimationFrame = id => clearTimeout(id);
});

describe('E2 classroom group detail', () => {
  it('shows the actual 4/5/6-member rosters, with unique student identity and public portraits', () => {
    render(<ClassroomInteraction viewportWidth={1440} />);
    fireEvent.click(screen.getByRole('tab', { name: '小组成员' }));
    const identities = new Set<string>();
    for (const [groupName, expectedCount] of [['第一研究组', 4], ['第二研究组', 5], ['第三研究组', 6]] as const) {
      fireEvent.click(screen.getByRole('button', { name: groupName }));
      const rows = within(screen.getByRole('list', { name: `${groupName}成员` })).getAllByRole('listitem');
      expect(rows).toHaveLength(expectedCount);
      expect(within(screen.getByTestId('interaction-identity')).getByText(`${expectedCount}位成员`)).toBeVisible();
      for (const row of rows) {
        const id = row.getAttribute('data-member-id')!;
        const studentNumber = row.getAttribute('data-student-number')!;
        expect(identities.has(id)).toBe(false);
        identities.add(id);
        expect(studentNumber).toMatch(/^20260301\d{2}$/);
        expect(within(row).getByText(studentNumber)).toBeVisible();
        expect(row.querySelector('[data-rain-id="ui-avatar"]')).toHaveAttribute('data-size', '32');
        expect(row.querySelector('img[data-slot="portrait"]')).toHaveAttribute('src', expect.stringMatching(/student-\d{2}\.png/));
        expect(row.querySelector('[data-member-role]')).toHaveTextContent(/证据整理|实地测量|方案表达|文献检索|数据分析|协作统筹/);
      }
    }
    expect(identities.size).toBe(15);
  });

  it('keeps the same person, student number and portrait when changing activity', () => {
    render(<ClassroomInteraction viewportWidth={1440} />);
    fireEvent.click(screen.getByRole('tab', { name: '小组成员' }));
    fireEvent.click(screen.getByRole('button', { name: '第三研究组' }));
    const roster = screen.getByRole('list', { name: '第三研究组成员' });
    const before = roster.innerHTML;
    fireEvent.click(screen.getByRole('button', { name: '方案投票' }));
    fireEvent.click(screen.getByRole('button', { name: '第三研究组' }));
    expect(screen.getByTestId('interaction-identity')).toHaveAttribute('data-group-id', 'vote-g3');
    expect(screen.getByRole('list', { name: '第三研究组成员' }).innerHTML).toBe(before);
    fireEvent.click(screen.getByRole('button', { name: '课后反思' }));
    fireEvent.click(screen.getByRole('button', { name: '第三研究组' }));
    expect(screen.getByRole('list', { name: '第三研究组成员' }).innerHTML).toBe(before);
  });

  it('uses the public filled field and preserves independent feedback per activity/group', () => {
    render(<ClassroomInteraction viewportWidth={1440} />);
    const feedback = () => screen.getByRole('textbox', { name: '课堂反馈草稿' });
    expect(feedback().closest('[data-rain-id="ui-textarea"]')).toHaveAttribute('data-appearance', 'filled');
    fireEvent.change(feedback(), { target: { value: '第一组讨论反馈' } });
    fireEvent.click(screen.getByRole('button', { name: '第二研究组' }));
    expect(feedback()).toHaveValue('');
    fireEvent.change(feedback(), { target: { value: '第二组讨论反馈' } });
    fireEvent.click(screen.getByRole('button', { name: '方案投票' }));
    expect(feedback()).toHaveValue('');
    fireEvent.change(feedback(), { target: { value: '第一组投票反馈' } });
    fireEvent.click(screen.getByRole('button', { name: '证据分析讨论' }));
    expect(feedback()).toHaveValue('第一组讨论反馈');
    fireEvent.click(screen.getByRole('button', { name: '第二研究组' }));
    expect(feedback()).toHaveValue('第二组讨论反馈');
    expect(screen.getByRole('group', { name: '课堂内活动' })).toBeVisible();
    expect(screen.getByRole('group', { name: '课后活动' })).toBeVisible();
  });
});
