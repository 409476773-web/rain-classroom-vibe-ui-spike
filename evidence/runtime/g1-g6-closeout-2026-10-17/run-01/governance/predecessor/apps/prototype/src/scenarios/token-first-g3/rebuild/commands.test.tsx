import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import { CommandWorkbench } from './commands';

for (const appearance of ['plain', 'framed'] as const) test(`${appearance}: commands insert, undo and redo visible content`, async () => {
  const user = userEvent.setup();
  render(<CommandWorkbench appearance={appearance} instance="A" />);
  const workbench = screen.getByRole('region', { name: '命令工作台 A' });
  const paragraphs = within(workbench).getByRole('list', { name: '文档段落 A' });
  const initial = within(paragraphs).getAllByRole('listitem').length;
  await user.click(within(workbench).getByRole('menuitem', { name: '插入' }));
  await user.click(await screen.findByRole('menuitem', { name: '插入讲解段落' }));
  expect(within(paragraphs).getAllByRole('listitem')).toHaveLength(initial + 1);
  await user.click(within(workbench).getByRole('menuitem', { name: '编辑' }));
  await user.click(await screen.findByRole('menuitem', { name: '撤销' }));
  expect(within(paragraphs).getAllByRole('listitem')).toHaveLength(initial);
  await user.click(within(workbench).getByRole('menuitem', { name: '编辑' }));
  await user.click(await screen.findByRole('menuitem', { name: '重做' }));
  expect(within(paragraphs).getAllByRole('listitem')).toHaveLength(initial + 1);
  expect(within(workbench).getByText('键位仅作展示，未注册快捷键。')).toBeVisible();
});

test('checkbox, radio and surface changes remain local to instance A and its portal', async () => {
  const user = userEvent.setup();
  render(<><CommandWorkbench instance="A" /><CommandWorkbench appearance="framed" instance="B" /></>);
  const a = screen.getByRole('region', { name: '命令工作台 A' });
  const b = screen.getByRole('region', { name: '命令工作台 B' });
  await user.click(within(a).getByRole('combobox', { name: 'A 命令面层' }));
  await user.click(await screen.findByRole('option', { name: '深色' }));
  await user.click(within(a).getByRole('menuitem', { name: '视图' }));
  const popup = await screen.findByRole('menu', { name: '视图' });
  expect(popup).toHaveAttribute('data-rain-theme', 'dark');
  await user.click(within(popup).getByRole('menuitemcheckbox', { name: '显示大纲' }));
  expect(within(a).queryByRole('complementary', { name: '文档大纲 A' })).toBeNull();
  expect(within(b).getByRole('complementary', { name: '文档大纲 B' })).toBeVisible();
  await user.click(within(popup).getByRole('menuitemradio', { name: '紧凑' }));
  expect(within(popup).getByRole('menuitemradio', { name: '紧凑' })).toHaveAttribute('aria-checked', 'true');
  expect(within(popup).getByRole('menuitemradio', { name: '标准' })).toHaveAttribute('aria-checked', 'false');
  expect(popup).toHaveAttribute('data-density', 'compact');
  expect(b).toHaveAttribute('data-density', 'default');
  expect(b).toHaveAttribute('data-rain-theme', 'light');
});
