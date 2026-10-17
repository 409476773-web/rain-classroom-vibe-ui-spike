import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { W6Consumer } from './consumer-app';
import { GradingWorkbench } from './scenes';
import { ReviewWorkbench } from './review-workbench';

function selectTask(id: string) {
  act(() => {
    window.history.replaceState(null, '', `/#${id}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
}
beforeEach(() => {
  window.history.replaceState(null, '', '/#E1');
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({ width: 1440, height: 800, left: 0, right: 1440, top: 0, bottom: 800, x: 0, y: 0, toJSON: () => ({}) });
  if (!globalThis.requestAnimationFrame) globalThis.requestAnimationFrame = callback => setTimeout(() => callback(performance.now()), 0) as unknown as number;
  if (!globalThis.cancelAnimationFrame) globalThis.cancelAnimationFrame = id => clearTimeout(id);
});
afterEach(() => { vi.restoreAllMocks(); window.history.replaceState(null, '', '/'); });

describe('W6 mounted consumer scene activation lifecycle', () => {
  it('closes E4 temporary index when hash navigation leaves its scene and keeps the replay business state', async () => {
    window.history.replaceState(null, '', '/#E4');
    const { container } = render(<W6Consumer />);
    const workspace = container.querySelector('[data-scene="E4"] .rain-workspace')!;
    const index = workspace.querySelector('.rain-workspace__region[data-region-id="knowledge-index"]')!;
    fireEvent.change(screen.getByRole('textbox', { name: '回放笔记' }), { target: { value: '离场前的本地笔记' } });
    fireEvent.click(screen.getByRole('button', { name: '临时查看知识索引' }));
    fireEvent.click(screen.getByRole('button', { name: '控制变量 · 02:10' }));
    expect(index).toHaveAttribute('data-temporary', 'true');
    selectTask('E1');
    expect(index).toHaveAttribute('data-temporary', 'false');
    const currentField = screen.getByRole('textbox', { name: '资源说明草稿' });
    act(() => currentField.focus());
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(currentField).toHaveFocus());
    selectTask('E4');
    expect(container.querySelector('[data-scene="E4"] .rain-workspace')).toBe(workspace);
    expect(screen.getByTestId('playback-time')).toHaveTextContent('02:10');
    expect(screen.getByRole('textbox', { name: '回放笔记' })).toHaveValue('离场前的本地笔记');
    expect(index).toHaveAttribute('data-temporary', 'false');
  });

  it('unmounts E1 range portal on hash navigation without resetting its host scope or draft', async () => {
    const { container } = render(<W6Consumer />);
    fireEvent.click(screen.getByRole('tab', { name: /001班/ }));
    fireEvent.change(screen.getByRole('textbox', { name: '资源说明草稿' }), { target: { value: '001班业务草稿' } });
    fireEvent.click(screen.getByRole('button', { name: '更多班级' }));
    await waitFor(() => expect(screen.getByRole('textbox', { name: '搜索范围' })).toBeVisible());
    selectTask('E2');
    await waitFor(() => expect(screen.queryByRole('textbox', { name: '搜索范围' })).not.toBeInTheDocument());
    selectTask('E1');
    expect(container.querySelector('[data-scene="E1"] [data-scope-id]')).toHaveAttribute('data-scope-id', 'class-001');
    expect(screen.getByRole('textbox', { name: '资源说明草稿' })).toHaveValue('001班业务草稿');
    expect(screen.queryByRole('textbox', { name: '搜索范围' })).not.toBeInTheDocument();
  });

  it('ends E3 focus on deactivation without replacing grading fields or changing their identity', () => {
    const { container, rerender } = render(<GradingWorkbench viewportWidth={1440} active />);
    const field = screen.getByRole('textbox', { name: '评分评语' });
    fireEvent.change(field, { target: { value: '切场景保留评分草稿' } });
    fireEvent.click(screen.getByRole('button', { name: '进入专注' }));
    expect(container.querySelector('.rain-workspace')).toHaveAttribute('data-focused', 'true');
    rerender(<GradingWorkbench viewportWidth={1440} active={false} />);
    expect(container.querySelector('.rain-workspace')).toHaveAttribute('data-focused', 'false');
    rerender(<GradingWorkbench viewportWidth={1440} active />);
    expect(screen.getByRole('textbox', { name: '评分评语' })).toBe(field);
    expect(field).toHaveValue('切场景保留评分草稿');
    expect(screen.getByTestId('grading-identity')).toHaveAttribute('data-student-id', 'lin-ning');
    expect(screen.getByTestId('grading-identity')).toHaveAttribute('data-question-id', 'q1');
  });

  it('dismisses E6 forced temporary review on deactivation and preserves the mounted local review draft', () => {
    const { container, rerender } = render(<ReviewWorkbench viewportWidth={900} active />);
    fireEvent.click(screen.getByRole('button', { name: '显示评审面板' }));
    const field = screen.getByRole('textbox', { name: '审核意见' });
    fireEvent.change(field, { target: { value: '临时评审的本地草稿' } });
    const panel = container.querySelector('.rain-workspace__region[data-region-id="comments"]')!;
    expect(panel).toHaveAttribute('data-temporary', 'true');
    rerender(<ReviewWorkbench viewportWidth={900} active={false} />);
    expect(panel).toHaveAttribute('data-temporary', 'false');
    rerender(<ReviewWorkbench viewportWidth={900} active />);
    fireEvent.click(screen.getByRole('button', { name: '显示评审面板' }));
    expect(screen.getByRole('textbox', { name: '审核意见' })).toBe(field);
    expect(field).toHaveValue('临时评审的本地草稿');
  });
});
