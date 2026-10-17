import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { ReviewWorkbench } from './review-workbench';

const firstName = '数字人文研究中的多模态史料整理、版本校勘与长期开放获取方案（修订稿）';
const secondName = '城市微气候观测数据的跨尺度校验、缺测处理与可复现分析流程说明';

it('keeps each stable resource identity paired with its own unsaved review draft', () => {
  render(<ReviewWorkbench viewportWidth={1440} />);
  const draft = screen.getByRole('textbox', { name: '审核意见' });
  fireEvent.change(draft, { target: { value: 'R-042：请补充版本校勘的原始证据。' } });
  fireEvent.click(screen.getByRole('button', { name: secondName }));
  expect(screen.getByRole('heading', { name: secondName })).toBeVisible();
  expect(screen.getByRole('textbox', { name: '审核意见' })).toHaveValue('');
  fireEvent.change(draft, { target: { value: 'R-057：缺测处理仍需说明。' } });
  fireEvent.click(screen.getByRole('button', { name: firstName }));
  expect(screen.getByRole('heading', { name: firstName })).toBeVisible();
  expect(draft).toHaveValue('R-042：请补充版本校勘的原始证据。');
  expect(screen.getByRole('button', { name: firstName })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.queryByRole('tab')).not.toBeInTheDocument();
});

it('restores both hidden sides in one click without replacing the queue, draft or scroll', () => {
  render(<ReviewWorkbench viewportWidth={1440} />);
  const draft = screen.getByRole('textbox', { name: '审核意见' });
  const queue = screen.getByRole('group', { name: '待评审学术资源' });
  const comments = draft.closest('[data-region-id="comments"]') as HTMLElement;
  fireEvent.change(draft, { target: { value: '尚未保存的审稿草稿' } });
  fireEvent.scroll(comments, { target: { scrollTop: 88 } });
  act(() => draft.focus());
  fireEvent.click(screen.getByRole('button', { name: '隐藏评审面板' }));
  fireEvent.click(screen.getByRole('button', { name: '隐藏资源队列' }));
  expect(comments).toHaveAttribute('hidden');
  expect(comments).toHaveAttribute('inert');
  expect(screen.getByRole('heading', { name: firstName })).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: '显示资源队列' }));
  fireEvent.click(screen.getByRole('button', { name: '显示评审面板' }));
  expect(screen.getByRole('group', { name: '待评审学术资源' })).toBe(queue);
  expect(screen.getByRole('textbox', { name: '审核意见' })).toBe(draft);
  expect(draft).toHaveValue('尚未保存的审稿草稿');
  expect(comments.scrollTop).toBe(88);
});

it('exits reading focus to the exact requested side visibility while retaining the draft', () => {
  render(<ReviewWorkbench viewportWidth={1440} />);
  fireEvent.change(screen.getByRole('textbox', { name: '审核意见' }), { target: { value: '阅读期间继续保留' } });
  fireEvent.click(screen.getByRole('button', { name: '隐藏资源队列' }));
  fireEvent.click(screen.getByRole('button', { name: '专注阅读' }));
  expect(screen.queryByRole('textbox', { name: '审核意见' })).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '退出专注' }));
  expect(screen.getByRole('button', { name: '显示资源队列' })).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByRole('button', { name: '隐藏评审面板' })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('textbox', { name: '审核意见' })).toHaveValue('阅读期间继续保留');
});

it('opens a forced-hidden review panel temporarily without pushing the document', () => {
  const { container } = render(<ReviewWorkbench viewportWidth={900} />);
  const queueSlot = container.querySelector('[data-region-slot="queue"]') as HTMLElement;
  const before = queueSlot.style.width;
  const restore = screen.getByRole('button', { name: '显示评审面板' });
  fireEvent.click(restore);
  const draft = screen.getByRole('textbox', { name: '审核意见' });
  expect(draft.closest('[data-region-id="comments"]')).toHaveAttribute('data-temporary', 'true');
  expect(queueSlot.style.width).toBe(before);
  fireEvent.change(draft, { target: { value: '临时查看中的草稿' } });
  fireEvent.click(screen.getByRole('button', { name: '关闭临时评审面板' }));
  fireEvent.click(screen.getByRole('button', { name: '显示评审面板' }));
  expect(screen.getByRole('textbox', { name: '审核意见' })).toBe(draft);
  expect(draft).toHaveValue('临时查看中的草稿');
});

it('filters only the queue while retaining the current document and review draft', () => {
  render(<ReviewWorkbench viewportWidth={1440} />);
  const search = screen.getByRole('textbox', { name: '筛选资源' });
  fireEvent.change(screen.getByRole('textbox', { name: '审核意见' }), { target: { value: '不随筛选丢失' } });
  fireEvent.change(search, { target: { value: '城市微气候' } });
  expect(screen.queryByRole('button', { name: firstName })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: firstName })).toBeVisible();
  expect(screen.getByRole('textbox', { name: '审核意见' })).toHaveValue('不随筛选丢失');
  expect(screen.getByRole('button', { name: secondName })).toBeVisible();
  fireEvent.change(search, { target: { value: '' } });
  expect(screen.getByRole('button', { name: firstName })).toHaveAttribute('aria-pressed', 'true');
});

it('saves only after the explicit local action and persists layout fields without resource drafts', () => {
  const values = new Map<string, string>();
  const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) };
  render(<ReviewWorkbench viewportWidth={1440} storage={storage} />);
  fireEvent.change(screen.getByRole('textbox', { name: '审核意见' }), { target: { value: '敏感评审内容只在页面内' } });
  expect(screen.getByText('未保存')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: '隐藏资源队列' }));
  expect(screen.getByText('未保存')).toBeVisible();
  expect([...values.values()].join('')).not.toContain('敏感评审内容');
  const payload = JSON.parse([...values.values()][0]!);
  expect(Object.keys(payload).sort()).toEqual(['regions', 'version']);
  expect(payload.version).toBe(2);
  expect(Object.keys(payload.regions).sort()).toEqual(['comments', 'queue']);
  fireEvent.click(screen.getByRole('button', { name: '保存本地评审' }));
  expect(screen.getByRole('status', { name: '本地保存状态' })).toHaveTextContent('本页已保存');
  fireEvent.click(screen.getByRole('button', { name: '显示资源队列' }));
  fireEvent.click(screen.getByRole('button', { name: secondName }));
  const panel = screen.getByRole('region', { name: '当前资源评审' });
  expect(within(panel).getByText('尚无本地评审记录')).toBeVisible();
  fireEvent.click(screen.getByRole('button', { name: firstName }));
  expect(within(panel).getByText('敏感评审内容只在页面内', { selector: 'p' })).toBeVisible();
});

it('offers a nearby named edge action for each hidden side and retains the current resource and unsaved draft', () => {
  render(<ReviewWorkbench viewportWidth={1440} />);
  const draft = screen.getByRole('textbox', { name: '审核意见' });
  fireEvent.change(draft, { target: { value: '边缘恢复仍应保留当前意见' } });
  fireEvent.click(screen.getByRole('button', { name: '隐藏资源队列' }));
  fireEvent.click(screen.getByRole('button', { name: '隐藏评审面板' }));
  const queueEdge = screen.getByRole('button', { name: '展开资源队列' });
  const reviewEdge = screen.getByRole('button', { name: '展开评审面板' });
  expect(queueEdge).toHaveAttribute('aria-expanded', 'false');
  expect(reviewEdge).toHaveAttribute('aria-controls', draft.closest('[data-region-id="comments"]')!.id);
  expect(screen.getByRole('button', { name: '显示资源队列' })).toBeVisible();
  fireEvent.click(queueEdge);
  fireEvent.click(reviewEdge);
  expect(screen.queryByRole('button', { name: '展开资源队列' })).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: '展开评审面板' })).not.toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: '审核意见' })).toBe(draft);
  expect(draft).toHaveValue('边缘恢复仍应保留当前意见');
  expect(screen.getByRole('heading', { name: firstName })).toBeVisible();
  expect(screen.getByRole('status', { name: '本地保存状态' })).toHaveTextContent('未保存');
});

it('uses the narrow temporary rule for a keyboard edge action and returns Escape focus to that edge', async () => {
  const user = userEvent.setup();
  const { container } = render(<ReviewWorkbench viewportWidth={900} />);
  const queueSlot = container.querySelector('[data-region-slot="queue"]') as HTMLElement;
  const before = queueSlot.style.width;
  const edge = screen.getByRole('button', { name: '展开评审面板' });
  act(() => edge.focus());
  await user.keyboard('{Enter}');
  const draft = screen.getByRole('textbox', { name: '审核意见' });
  expect(draft.closest('[data-region-id="comments"]')).toHaveAttribute('data-temporary', 'true');
  expect(queueSlot.style.width).toBe(before);
  await user.type(draft, '临时评审，Esc 后仍保留');
  await user.keyboard('{Escape}');
  const returnedEdge = screen.getByRole('button', { name: '展开评审面板' });
  expect(returnedEdge).toHaveFocus();
  await user.keyboard(' ');
  expect(screen.getByRole('textbox', { name: '审核意见' })).toHaveValue('临时评审，Esc 后仍保留');
});
