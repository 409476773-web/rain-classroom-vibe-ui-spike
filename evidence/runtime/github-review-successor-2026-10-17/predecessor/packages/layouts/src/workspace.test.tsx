import { StrictMode } from 'react';
import { Popover } from '../../ui/src/popover/popover';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { WorkspaceLayout, RecoverableRegion, RegionRestoreTrigger, PaneSplitter, useWorkspaceLayout } from './workspace';
import type { WorkspaceSpec } from './workspace-state';
const spec: WorkspaceSpec = { workspaceKey: 'mock/course/interaction/one', stableRestoreOwnerIds: ['toolbar'], minMainWidth: 560, regions: [
  { id: 'directory', label: '课程目录', side: 'start', allowedModes: ['expanded', 'hidden'], defaultMode: 'hidden', minWidth: 176, defaultWidth: 216, maxWidth: 320, adaptationPriority: 1, restoreOwnerId: 'toolbar' },
] };
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
const two: WorkspaceSpec = { ...spec, regions: [
  { id: 'global', label: '全局导航', side: 'start', allowedModes: ['expanded', 'compact', 'hidden'], defaultMode: 'compact', minWidth: 184, defaultWidth: 208, maxWidth: 240, compactWidth: 64, adaptationPriority: 0, restoreOwnerId: 'toolbar', boundaryWidth: 5 },
  ...spec.regions,
  { ...spec.regions[0]!, id: 'queue', label: '学生队列', defaultWidth: 240, minWidth: 212, adaptationPriority: 2 },
] };
function Controls() {
  const controller = useWorkspaceLayout();
  return <><button data-workspace-action="focus" onClick={() => controller.dispatch({ type: controller.state.session.focused ? 'EXIT_FOCUS' : 'ENTER_FOCUS' })}>专注切换</button>
    <button data-workspace-action="pin" onClick={() => controller.dispatch({ type: 'PIN_TEMP', regionId: 'global', viewportWidth: controller.viewportWidth })}>固定全局</button>
    <button data-workspace-action="unpin" onClick={() => controller.dispatch({ type: 'UNPIN', regionId: 'global', viewportWidth: controller.viewportWidth })}>取消固定</button>
    <output data-testid="main-width">{controller.effective.mainWidth}</output><output data-testid="focused">{String(controller.state.session.focused)}</output></>;
}
function Fixture({ width = 1200, workspace = two, hover = false, storage, controlled, onChange }: { width?: number; workspace?: WorkspaceSpec; hover?: boolean; storage?: { getItem(key: string): string | null; setItem(key: string, value: string): void }; controlled?: { global: { mode: 'compact'; expandedWidth: number }; directory: { mode: 'hidden'; expandedWidth: number }; queue: { mode: 'hidden'; expandedWidth: number } }; onChange?: (...args: unknown[]) => void }) {
  return <WorkspaceLayout spec={workspace} viewportWidth={width} hoverPreview={hover} storage={storage} preferences={controlled} onPreferencesChange={onChange}
    toolbar={<><RegionRestoreTrigger regionId="global" intent="peek"/><RegionRestoreTrigger regionId="directory" intent="peek"/><RegionRestoreTrigger regionId="queue" intent="peek"/><Controls/></>}>
    <RecoverableRegion regionId="global"><button onClick={() => undefined}>全局入口</button></RecoverableRegion><PaneSplitter regionId="global"/>
    <RecoverableRegion regionId="directory"><textarea aria-label="目录草稿" defaultValue="未保存" /></RecoverableRegion>
    <RecoverableRegion regionId="queue"><button>学生甲</button></RecoverableRegion><main><button onClick={() => undefined}>正文操作</button></main>
  </WorkspaceLayout>;
}
it('keeps an all-hidden region mounted with a stable, keyboard reachable recovery path', () => {
  render(<WorkspaceLayout spec={spec} viewportWidth={1000} toolbar={<RegionRestoreTrigger regionId="directory" />}>
    <RecoverableRegion regionId="directory"><textarea aria-label="编辑草稿" defaultValue="尚未提交" /></RecoverableRegion><main>正文</main>
  </WorkspaceLayout>);
  const restore = screen.getByRole('button', { name: '显示课程目录' });
  const target = document.getElementById(restore.getAttribute('aria-controls')!)!;
  expect(target).toHaveAttribute('hidden'); expect(target).toHaveAttribute('inert');
  fireEvent.click(restore);
  expect(restore).toBe(screen.getByRole('button', { name: '隐藏课程目录' }));
  expect(restore).toHaveAttribute('aria-expanded', 'true');
  expect(target).not.toHaveAttribute('hidden');
  expect(screen.getByRole('textbox', { name: '编辑草稿' })).toHaveValue('尚未提交');
});
it('opens another hidden pane in one click while retaining the original stable target', () => {
  render(<Fixture/>);
  const first = screen.getByRole('button', { name: '显示课程目录' }), second = screen.getByRole('button', { name: '显示学生队列' });
  fireEvent.click(first); const target = document.getElementById(second.getAttribute('aria-controls')!)!;
  fireEvent.pointerDown(second); fireEvent.click(second);
  expect(second).toBe(screen.getByRole('button', { name: '关闭临时学生队列' }));
  expect(target).toHaveAttribute('data-temporary', 'true'); expect(first).toHaveAttribute('aria-expanded', 'false');
});
it('keeps compact occupancy and main geometry through temporary open, pin and unpin', () => {
  render(<Fixture/>); const width = screen.getByTestId('main-width').textContent;
  fireEvent.click(screen.getByRole('button', { name: '展开全局导航' }));
  expect(screen.getByTestId('main-width')).toHaveTextContent(width!);
  expect(document.querySelector('[data-region-slot="global"]')).toHaveStyle({ width: '64px' });
  fireEvent.click(screen.getByRole('button', { name: '固定全局' })); expect(screen.getByTestId('main-width')).toHaveTextContent('987');
  fireEvent.click(screen.getByRole('button', { name: '取消固定' })); expect(screen.getByTestId('main-width')).toHaveTextContent(width!);
  expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('data-temporary', 'true');
});
it('lets the outside target receive its first click and leaves focus on that target', () => {
  const targetAction = vi.fn(); render(<><Fixture/><button onClick={targetAction}>外部操作</button></>);
  fireEvent.click(screen.getByRole('button', { name: '展开全局导航' })); const target = screen.getByRole('button', { name: '外部操作' });
  act(() => target.focus()); fireEvent.pointerDown(target); fireEvent.click(target);
  expect(targetAction).toHaveBeenCalledOnce(); expect(target).toHaveFocus(); expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('data-temporary', 'false');
});
it('preserves the region instance, external draft, scroll and precise focus during hide/show', () => {
  const expanded: WorkspaceSpec = { ...spec, regions: [{ ...spec.regions[0]!, defaultMode: 'expanded' }] };
  const view = render(<WorkspaceLayout spec={expanded} viewportWidth={1200} toolbar={<RegionRestoreTrigger regionId="directory"/>}><RecoverableRegion regionId="directory"><textarea aria-label="目录草稿" defaultValue="未保存" /></RecoverableRegion></WorkspaceLayout>);
  const input = screen.getByRole('textbox'), region = input.closest('[data-region-id]')!;
  fireEvent.change(input, { target: { value: '新的未保存内容' } }); fireEvent.scroll(region, { target: { scrollTop: 96 } }); act(() => input.focus());
  fireEvent.click(screen.getByRole('button', { name: '隐藏课程目录' })); expect(screen.getByRole('button', { name: '显示课程目录' })).toHaveFocus();
  fireEvent.click(screen.getByRole('button', { name: '显示课程目录' })); expect(screen.getByRole('textbox')).toBe(input); expect(input).toHaveValue('新的未保存内容'); expect(region.scrollTop).toBe(96);
  view.unmount();
});
it('gives portal child popups logical ownership and consumes one Escape layer at a time', async () => {
  function PortalChild() { return <Popover.Root><Popover.Trigger>弹层</Popover.Trigger><Popover.Content><button onKeyDown={event => { if (event.key === 'Escape') event.preventDefault(); }}>子弹层动作</button></Popover.Content></Popover.Root>; }
  const view = render(<WorkspaceLayout spec={two} viewportWidth={1200} toolbar={<><RegionRestoreTrigger regionId="global" intent="peek"/><Controls/></>}><RecoverableRegion regionId="global"><PortalChild/></RecoverableRegion></WorkspaceLayout>);
  fireEvent.click(screen.getByRole('button', { name: '展开全局导航' })); fireEvent.click(screen.getByRole('button', { name: '弹层' })); const child = await screen.findByRole('button', { name: '子弹层动作' });
  fireEvent.pointerDown(child); expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('data-temporary', 'true');
  await act(async () => { fireEvent.keyDown(child, { key: 'Escape' }); await Promise.resolve(); });
  expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('data-temporary', 'true'); view.unmount();
  render(<Fixture/>); fireEvent.click(screen.getByRole('button', { name: '展开全局导航' }));
  await act(async () => { fireEvent.keyDown(document.body, { key: 'Escape' }); await Promise.resolve(); });
  expect(screen.getByRole('button', { name: '展开全局导航' })).toHaveFocus(); expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('data-temporary', 'false');
});
it('restores the original hidden layout after focus and isolates the next workspace session', () => {
  const view = render(<Fixture/>); fireEvent.click(screen.getByRole('button', { name: '专注切换' }));
  expect(screen.getByTestId('focused')).toHaveTextContent('true'); expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('hidden');
  fireEvent.click(screen.getByRole('button', { name: '专注切换' })); expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('data-mode', 'compact'); expect(document.querySelector('[data-region-id="directory"]')).toHaveAttribute('hidden');
  fireEvent.click(screen.getByRole('button', { name: '专注切换' })); view.rerender(<Fixture workspace={{ ...two, workspaceKey: 'mock/other/course/two' }}/>);
  expect(screen.getByTestId('focused')).toHaveTextContent('false'); expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('data-mode', 'compact');
});
it('keeps controlled preferences authoritative when the parent declines a change', () => {
  const onChange = vi.fn(), preferences = { global: { mode: 'compact' as const, expandedWidth: 208 }, directory: { mode: 'hidden' as const, expandedWidth: 216 }, queue: { mode: 'hidden' as const, expandedWidth: 240 } };
  render(<Fixture controlled={preferences} onChange={onChange}/>); fireEvent.click(screen.getByRole('button', { name: '固定全局' }));
  expect(onChange).toHaveBeenCalledOnce(); expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('data-mode', 'compact'); expect(screen.getByText('布局变更等待同步')).toHaveAttribute('role', 'status');
});
it('uses the measured container width without overwriting requested preferences', () => {
  let resize!: ResizeObserverCallback; const disconnect = vi.fn(); vi.stubGlobal('ResizeObserver', class { constructor(callback: ResizeObserverCallback) { resize = callback; } observe(){} disconnect = disconnect; });
  const expanded = { ...spec, regions: [{ ...spec.regions[0]!, defaultMode: 'expanded' as const }] };
  const view = render(<WorkspaceLayout spec={expanded} toolbar={<RegionRestoreTrigger regionId="directory"/>}><RecoverableRegion regionId="directory">目录</RecoverableRegion></WorkspaceLayout>);
  const width = (value: number) => act(() => resize([{ contentRect: { width: value } } as ResizeObserverEntry], {} as ResizeObserver));
  width(600); expect(document.querySelector('[data-region-id="directory"]')).toHaveAttribute('hidden'); width(1000); expect(document.querySelector('[data-region-id="directory"]')).toHaveAttribute('data-mode', 'expanded');
  view.unmount(); expect(disconnect).toHaveBeenCalledOnce();
});
it('delays optional hover, bridges the panel path, suppresses Escape reopen and cleans context timers', async () => {
  vi.useFakeTimers(); const view = render(<StrictMode><Fixture hover/></StrictMode>), trigger = screen.getByRole('button', { name: '展开全局导航' });
  fireEvent.pointerEnter(trigger); act(() => vi.advanceTimersByTime(239)); expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('data-temporary', 'false'); act(() => vi.advanceTimersByTime(1));
  const panel = document.querySelector('[data-region-id="global"]')!; expect(panel).toHaveAttribute('data-temporary', 'true'); fireEvent.pointerLeave(trigger); act(() => vi.advanceTimersByTime(300)); fireEvent.pointerEnter(panel); act(() => vi.advanceTimersByTime(400)); expect(panel).toHaveAttribute('data-temporary', 'true');
  await act(async () => { fireEvent.keyDown(document.body, { key: 'Escape' }); await Promise.resolve(); }); fireEvent.pointerEnter(trigger); act(() => vi.advanceTimersByTime(300)); expect(panel).toHaveAttribute('data-temporary', 'false');
  fireEvent.pointerLeave(trigger); fireEvent.pointerEnter(trigger); view.rerender(<StrictMode><Fixture hover workspace={{ ...two, workspaceKey: 'mock/new/scene/one' }}/></StrictMode>); act(() => vi.advanceTimersByTime(1000)); expect(panel).toHaveAttribute('data-temporary', 'false'); view.unmount(); expect(vi.getTimerCount()).toBe(0);
});
it('N06 allows one hover reentry after Escape and leaving the now hidden panel', async () => {
  vi.useFakeTimers(); const view = render(<StrictMode><Fixture hover/></StrictMode>);
  const trigger = screen.getByRole('button', { name: '显示课程目录' });
  fireEvent.pointerEnter(trigger); act(() => vi.advanceTimersByTime(240));
  const panel = document.querySelector('.rain-workspace__region[data-region-id="directory"]')!;
  expect(panel).toHaveAttribute('data-temporary', 'true');
  fireEvent.pointerLeave(trigger); fireEvent.pointerEnter(panel); act(() => vi.advanceTimersByTime(400));
  await act(async () => { fireEvent.keyDown(panel, { key: 'Escape' }); await Promise.resolve(); });
  expect(panel).toHaveAttribute('hidden'); expect(trigger).toHaveFocus();
  act(() => vi.advanceTimersByTime(500)); expect(panel).toHaveAttribute('data-temporary', 'false');
  fireEvent.pointerLeave(panel, { relatedTarget: screen.getByRole('button', { name: '正文操作' }) });
  fireEvent.pointerEnter(trigger); act(() => vi.advanceTimersByTime(239));
  expect(panel).toHaveAttribute('data-temporary', 'false');
  act(() => vi.advanceTimersByTime(1)); expect(panel).toHaveAttribute('data-temporary', 'true');
  view.unmount(); expect(vi.getTimerCount()).toBe(0);
});
it('keeps denied storage usable and persists only layout preferences', () => {
  const setItem = vi.fn((_key: string, _value: string) => { throw new Error('denied'); }), getItem = vi.fn((_key: string) => { throw new Error('denied'); });
  render(<Fixture storage={{ setItem, getItem }}/>); fireEvent.click(screen.getByRole('button', { name: '固定全局' }));
  expect(document.querySelector('[data-region-id="global"]')).toHaveAttribute('data-mode', 'expanded'); expect(setItem).toHaveBeenCalledOnce();
  const saved = JSON.parse(setItem.mock.calls[0]![1] as string); expect(saved.version).toBe(2); expect(Object.keys(saved)).toEqual(['version', 'regions']);
});
it('cancels a queued hover preview when the enhancement is disabled but keeps explicit recovery', () => {
  vi.useFakeTimers();const view=render(<Fixture hover/>);
  const restore=screen.getByRole('button',{name:'显示课程目录'});
  fireEvent.pointerEnter(restore);act(()=>vi.advanceTimersByTime(120));view.rerender(<Fixture hover={false}/>);
  act(()=>vi.advanceTimersByTime(500));const panel=document.querySelector('.rain-workspace__region[data-region-id="directory"]')!;
  expect(panel).toHaveAttribute('data-temporary','false');expect(panel).toHaveAttribute('hidden');
  fireEvent.click(restore);expect(panel).toHaveAttribute('data-temporary','true');
  view.unmount();expect(vi.getTimerCount()).toBe(0);
});
it('resizes using physical arrow direction, full separator ARIA and explicit Enter hiding', () => {
  const end: WorkspaceSpec = { ...spec, regions: [{ ...spec.regions[0]!, side: 'end', defaultMode: 'expanded', boundaryWidth: 5 }] };
  render(<WorkspaceLayout spec={end} viewportWidth={1200} toolbar={<RegionRestoreTrigger regionId="directory"/>}><main>正文</main><PaneSplitter regionId="directory"/><RecoverableRegion regionId="directory">目录</RecoverableRegion></WorkspaceLayout>);
  const splitter = screen.getByRole('separator', { name: '调整课程目录宽度' }); expect(splitter).toHaveAttribute('aria-orientation', 'vertical'); expect(splitter).toHaveAttribute('aria-valuenow', '216');
  fireEvent.keyDown(splitter, { key: 'ArrowLeft', shiftKey: true }); expect(splitter).toHaveAttribute('aria-valuenow', '248'); fireEvent.keyDown(splitter, { key: 'Home' }); expect(splitter).toHaveAttribute('aria-valuenow', '176'); fireEvent.keyDown(splitter, { key: 'End' }); expect(splitter).toHaveAttribute('aria-valuenow', '320');
  act(() => splitter.focus()); fireEvent.keyDown(splitter, { key: 'Enter' }); expect(screen.queryByRole('separator')).toBeNull(); expect(screen.getByRole('button', { name: '显示课程目录' })).toHaveAttribute('aria-expanded', 'false'); expect(screen.getByRole('button', { name: '显示课程目录' })).toHaveFocus();
});
it('sends Escape to the last interacted workspace without closing a separate instance', async () => {
  render(<><div data-testid="one"><Fixture/></div><div data-testid="two"><Fixture workspace={{ ...two, workspaceKey: 'mock/course/interaction/two' }}/></div></>);
  const one = within(screen.getByTestId('one')), other = within(screen.getByTestId('two'));
  fireEvent.click(one.getByRole('button', { name: '展开全局导航' })); fireEvent.click(other.getByRole('button', { name: '展开全局导航' }));
  await act(async () => { fireEvent.keyDown(document.body, { key: 'Escape' }); await Promise.resolve(); });
  expect(one.getByRole('button', { name: '关闭临时全局导航' })).toHaveAttribute('aria-expanded', 'true'); expect(other.getByRole('button', { name: '展开全局导航' })).toHaveFocus();
});
it('keeps a top ribbon mounted and its original height reserved during peek, outside and Escape', async () => {
  const ribbon: WorkspaceSpec = { ...spec, regions: [{ id: 'ribbon', label: '文档工具', side: 'top', allowedModes: ['full', 'icons', 'tabs', 'hidden'], defaultMode: 'tabs', minWidth: 1, defaultWidth: 1, maxWidth: 1, adaptationPriority: 0, restoreOwnerId: 'toolbar' }] };
  render(<WorkspaceLayout spec={ribbon} viewportWidth={1200} toolbar={<RegionRestoreTrigger regionId="ribbon"/>}><div><RecoverableRegion regionId="ribbon" topHeights={{ full: 111, icons: 83, tabs: 41 }} topTemporaryHeight={112}><button>工具动作</button></RecoverableRegion><button>正文目标</button></div></WorkspaceLayout>);
  const restore = screen.getByRole('button', { name: '展开文档工具' }), body = document.getElementById(restore.getAttribute('aria-controls')!)!, owner = body.parentElement!;
  expect(owner).toHaveStyle({ height: '41px' }); fireEvent.click(restore); expect(body).toHaveStyle({ height: '112px' }); expect(owner).toHaveStyle({ height: '41px' });
  const outside = screen.getByRole('button', { name: '正文目标' }); act(() => outside.focus()); fireEvent.pointerDown(outside); expect(body).toHaveAttribute('data-temporary', 'false'); expect(outside).toHaveFocus();
  fireEvent.click(restore); await act(async () => { fireEvent.keyDown(document.body, { key: 'Escape' }); await Promise.resolve(); }); expect(body).toHaveAttribute('data-temporary', 'false'); expect(restore).toHaveFocus(); expect(document.getElementById(restore.getAttribute('aria-controls')!)).toBe(body);
});
it('does not close an optional hover panel while its editable content owns focus', () => {
  vi.useFakeTimers(); render(<Fixture hover/>);
  const restore = screen.getByRole('button', { name: '显示课程目录' }); fireEvent.pointerEnter(restore); act(() => vi.advanceTimersByTime(240));
  const panel = document.querySelector('.rain-workspace__region[data-region-id="directory"]')!, input = screen.getByRole('textbox', { name: '目录草稿' }); act(() => input.focus()); fireEvent.pointerLeave(panel); act(() => vi.advanceTimersByTime(360));
  expect(panel).toHaveAttribute('data-temporary', 'true'); expect(input).toHaveFocus();
});
