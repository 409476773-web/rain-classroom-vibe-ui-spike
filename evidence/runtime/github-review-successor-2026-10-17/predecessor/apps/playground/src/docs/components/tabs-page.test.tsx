import { render, screen, fireEvent, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import { TabsPage } from './tabs-page';

it('provides a complete first recipe with operational panels and retained drafts', () => {
  render(<TabsPage />);
  expect(screen.getByRole('heading', { name: 'Tabs 分区切换' })).toHaveAttribute('id', 'tabs-title');
  const course = screen.getByRole('region', { name: '课程分区' });
  const draft = within(course).getByRole('textbox', { name: '课程概览备注' });
  fireEvent.change(draft, { target: { value: '下周复习' } });
  fireEvent.click(within(course).getByRole('tab', { name: '待评作业' }));
  expect(within(course).getByRole('tab', { name: '待评作业' })).toHaveAccessibleDescription('数量 0');
  fireEvent.click(within(course).getByRole('tab', { name: '课程概览' }));
  expect(draft).toHaveValue('下周复习');
  fireEvent.click(within(course).getByRole('button', { name: '保存备注' }));
  expect(within(course).getByText('已在本页保存')).toBeVisible();
});

it('keeps the candidate, lifecycle, controlled and color limits visible in the documentation', () => {
  render(<TabsPage />);
  expect(screen.getByText(/独立页面导航使用链接/)).toBeVisible();
  expect(screen.getByText(/受控模式只响应宿主接受/)).toBeVisible();
  expect(screen.getByText(/浅底外观取消选中态的常驻描边/)).toBeVisible();
  expect(screen.getByText(/不构成通用对比度豁免/)).toBeVisible();
  expect(screen.getByText(/真实屏幕阅读器/)).toBeVisible();
  expect(screen.getByText('交互与状态检查').closest('details')).not.toHaveAttribute('open');
});
