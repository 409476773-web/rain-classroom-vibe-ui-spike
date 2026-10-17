import '@testing-library/jest-dom/vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test } from 'vitest';
import { LabWorkbench } from './lab';

beforeEach(() => window.history.replaceState(null, '', '#token-first-g3?rebuild=1&scene=lab&view=isolation'));

test('E12 namespaced routes survive remount and hash history without replacing the host or B', async () => {
  const user = userEvent.setup();
  window.history.replaceState(null, '', '#token-first-g3?rebuild=1&scene=lab&view=isolation&labAView=bookings&labAScope=precision&labBView=guide');
  const first = render(<><LabWorkbench instance="A" /><LabWorkbench instance="B" /></>);
  const a = screen.getByRole('region', { name: '设备预约工作台 A' });
  expect(within(a).getByRole('heading', { name: '我的预约' })).toBeInTheDocument();
  expect(within(a).getByRole('button', { name: '切换实验室' })).toHaveTextContent('精密仪器实验室');
  await user.click(within(a).getByRole('link', { name: '可立即预约' }));
  expect(window.location.hash).toContain('view=isolation');
  expect(window.location.hash).toContain('labBView=guide');
  expect(window.location.hash).toContain('labAFilter=available');
  first.unmount();
  render(<><LabWorkbench instance="A" /><LabWorkbench instance="B" /></>);
  expect(within(screen.getByRole('region', { name: '设备预约工作台 A' })).getByRole('link', { name: '可立即预约' })).toHaveAttribute('aria-current', 'page');
  expect(within(screen.getByRole('region', { name: '设备预约工作台 B' })).getByRole('heading', { name: '使用指南' })).toBeInTheDocument();
  window.location.hash = '#token-first-g3?rebuild=1&scene=lab&labAView=invalid&labAScope=invalid&labAFilter=invalid&labBView=guide';
  await waitFor(() => expect(within(screen.getByRole('region', { name: '设备预约工作台 A' })).getByRole('button', { name: '查看 高速冷冻离心机' })).toBeInTheDocument());
  expect(within(screen.getByRole('region', { name: '设备预约工作台 A' })).getByRole('link', { name: '全部设备' })).toHaveAttribute('aria-current', 'page');
});

test('E12 composes laboratory scope, searchable equipment, and a working reservation', async () => {
  const user = userEvent.setup();
  render(<LabWorkbench />);
  const workbench = screen.getByRole('region', { name: '设备预约工作台 A' });
  expect(within(workbench).getByRole('navigation', { name: '实验平台全局入口' })).toBeInTheDocument();
  expect(workbench).not.toHaveTextContent(/课程|班级/);
  await user.type(within(workbench).getByRole('textbox', { name: '搜索设备' }), '光谱');
  expect(within(workbench).getByRole('button', { name: '查看 紫外可见分光光度计' })).toBeInTheDocument();
  expect(within(workbench).queryByRole('button', { name: '查看 高速冷冻离心机' })).toBeNull();
  await user.click(within(workbench).getByRole('button', { name: '查看 紫外可见分光光度计' }));
  await user.click(within(workbench).getByRole('button', { name: '确认预约' }));
  expect(within(workbench).getByRole('status')).toHaveTextContent('已预约：紫外可见分光光度计');
  expect(within(workbench).getByRole('button', { name: '取消预约' })).toBeInTheDocument();
  await user.click(within(workbench).getByRole('button', { name: '取消预约' }));
  expect(within(workbench).getByRole('status')).toHaveTextContent('已取消预约');
  expect(within(workbench).getByRole('button', { name: '确认预约' })).toBeInTheDocument();
});

test('E12 scope selection and navigation stay local to A and retain B', async () => {
  const user = userEvent.setup();
  render(<><LabWorkbench instance="A" /><LabWorkbench instance="B" /></>);
  const a = screen.getByRole('region', { name: '设备预约工作台 A' });
  const b = screen.getByRole('region', { name: '设备预约工作台 B' });
  await user.click(within(a).getByRole('button', { name: '切换实验室' }));
  const popup = await screen.findByRole('dialog', { name: '选择实验室 A' });
  await user.click(within(popup).getByRole('button', { name: /精密仪器实验室/ }));
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  expect(within(a).getByRole('button', { name: '查看 扫描电子显微镜' })).toBeInTheDocument();
  expect(within(b).getByRole('button', { name: '查看 高速冷冻离心机' })).toBeInTheDocument();
  await user.click(within(a).getByRole('link', { name: '我的预约' }));
  expect(within(a).getByRole('heading', { name: '我的预约' })).toBeInTheDocument();
  expect(within(b).getByRole('heading', { name: '可预约设备' })).toBeInTheDocument();
});

test('E12 popup inherits its own instance theme and density and returns keyboard focus', async () => {
  const user = userEvent.setup();
  render(<><div data-rain-theme="dark" data-density="compact"><LabWorkbench instance="A" /></div><div data-rain-theme="light" data-density="default"><LabWorkbench instance="B" /></div></>);
  const a = screen.getByRole('region', { name: '设备预约工作台 A' });
  const b = screen.getByRole('region', { name: '设备预约工作台 B' });
  const trigger = within(a).getByRole('button', { name: '切换实验室' });
  await user.click(trigger);
  const popupA = await screen.findByRole('dialog', { name: '选择实验室 A' });
  expect(popupA.closest('[data-rain-theme]')).toHaveAttribute('data-rain-theme', 'dark');
  expect(popupA.closest('[data-density]')).toHaveAttribute('data-density', 'compact');
  expect(within(b).getByRole('button', { name: '切换实验室' })).toHaveAttribute('aria-expanded', 'false');
  await user.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  expect(trigger).toHaveFocus();
  await user.click(within(b).getByRole('button', { name: '切换实验室' }));
  const popupB = await screen.findByRole('dialog', { name: '选择实验室 B' });
  expect(popupB.closest('[data-rain-theme]')).toHaveAttribute('data-rain-theme', 'light');
  expect(popupB.closest('[data-density]')).toHaveAttribute('data-density', 'default');
});
