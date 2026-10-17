import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ReplayWorkbench } from './replay-workbench';

describe('G3 review 02: replay pin activation', () => {
  it('accepts a pointer click on the toolbar pin without dismissing its temporary panel first', () => {
    const { container } = render(<ReplayWorkbench viewportWidth={1343} />);
    const panel = container.querySelector('.rain-workspace__region[data-region-id="knowledge-index"]');
    fireEvent.change(screen.getByRole('textbox', { name: '回放笔记' }), { target: { value: '保留采样笔记' } });
    fireEvent.click(screen.getByRole('button', { name: '讲稿 02:10' }));
    fireEvent.click(screen.getByRole('button', { name: '临时查看知识索引' }));
    const pin = screen.getByRole('button', { name: '固定知识索引' });
    fireEvent.pointerDown(pin);
    expect(pin).toBeInTheDocument();
    fireEvent.click(pin);
    expect(panel).toHaveAttribute('data-temporary', 'false');
    expect(panel).toHaveAttribute('data-mode', 'expanded');
    expect(panel).toBeVisible();
    expect(screen.getByTestId('playback-time')).toHaveTextContent('02:10');
    expect(screen.getByRole('textbox', { name: '回放笔记' })).toHaveValue('保留采样笔记');
  });

  it('retains the temporary index when available width cannot fit the requested pinned panel', () => {
    const { container } = render(<ReplayWorkbench viewportWidth={600} />);
    fireEvent.click(screen.getByRole('button', { name: '临时查看知识索引' }));
    fireEvent.click(screen.getByRole('button', { name: '固定知识索引' }));
    const panel = container.querySelector('.rain-workspace__region[data-region-id="knowledge-index"]');
    expect(panel).toHaveAttribute('data-forced', 'true');
    expect(panel).toHaveAttribute('data-temporary', 'true');
    expect(panel).toBeVisible();
  });
});
