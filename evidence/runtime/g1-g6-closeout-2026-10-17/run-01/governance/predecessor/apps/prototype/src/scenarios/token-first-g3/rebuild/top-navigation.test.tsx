import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { readRoute, pages } from './model';
import { TopNavigation } from './top-navigation';

const route = readRoute('#token-first-g3?rebuild=1&scene=tools&page=exams');

test('N01/N02 keep all eight destinations and current semantics across appearances', () => {
  const view = render(<TopNavigation route={route} />);
  const before = screen.getAllByRole('link').map(link => link.getAttribute('href'));
  expect(before).toHaveLength(8);
  for (const name of Object.values(pages)) expect(screen.getByRole('link', { name })).toBeInTheDocument();
  view.rerender(<TopNavigation route={route} variant="soft" />);
  expect(screen.getAllByRole('link').map(link => link.getAttribute('href'))).toEqual(before);
  expect(screen.getByRole('link', { name: '考试管理' })).toHaveAttribute('aria-current', 'page');
  expect(screen.queryByRole('tab')).toBeNull();
  expect(screen.queryByRole('radio')).toBeNull();
  view.rerender(<TopNavigation route={{ ...route, scene: 'course', page: 'course-content' }} />);
  expect(screen.getByRole('link', { name: '课程建设' })).toHaveAttribute('aria-current', 'page');
  view.rerender(<TopNavigation route={{ ...route, page: 'tool-outline' }} />);
  expect(screen.getByRole('link', { name: '资源中心' })).toHaveAttribute('aria-current', 'page');
});

test('N03 opens independently of current, closes on Escape, and isolates two portal themes', async () => {
  const user = userEvent.setup();
  render(<><div data-rain-theme="dark"><TopNavigation route={route} panel="compact" label="实例 A 导航" /></div><div data-rain-theme="light"><TopNavigation route={route} panel="rich" label="实例 B 导航" /></div></>);
  const navA = screen.getByRole('navigation', { name: '实例 A 导航' });
  const navB = screen.getByRole('navigation', { name: '实例 B 导航' });
  await user.click(within(navA).getByRole('button', { name: '展开资源中心入口' }));
  const panel = await screen.findByRole('dialog', { name: '实例 A 导航：二级入口' });
  expect(panel.closest('[data-rain-theme]')).toHaveAttribute('data-rain-theme', 'dark');
  expect(within(navA).getByRole('link', { name: '考试管理' })).toHaveAttribute('aria-current', 'page');
  expect(within(navA).getByRole('link', { name: '资源中心' })).not.toHaveAttribute('aria-current');
  expect(within(navB).getByRole('button', { name: '展开资源中心入口' })).toHaveAttribute('aria-expanded', 'false');
  await user.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  expect(within(navA).getByRole('button', { name: '展开资源中心入口' })).toHaveFocus();
});

test('N04 uses four complete rich links and closes after choosing a real destination', async () => {
  const user = userEvent.setup();
  render(<TopNavigation route={route} panel="rich" />);
  await user.click(screen.getByRole('button', { name: '展开资源中心入口' }));
  const panel = await screen.findByRole('dialog', { name: '顶部全局导航：教学工具' });
  const links = within(panel).getAllByRole('link');
  expect(links).toHaveLength(4);
  for (const link of links) {
    expect(link.querySelector('[data-slot="description"]')).toHaveTextContent(/\S/);
    expect(link.querySelector('button,a')).toBeNull();
    expect(link.getAttribute('href')).toMatch(/scene=tools.*page=tool-/);
  }
  await user.click(links[0]!);
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
});
