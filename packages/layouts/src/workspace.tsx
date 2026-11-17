import { createContext, forwardRef, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type ButtonHTMLAttributes, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { createWorkspaceState, loadWorkspacePreferences, resolveWorkspace, saveWorkspacePreferences, validateWorkspaceSpec, workspaceReducer, type EffectiveRegion, type ResolvedWorkspace, type ResizeKey, type RibbonMode, type WorkspaceAction, type WorkspacePreferences, type WorkspaceRegionSpec, type WorkspaceSpec, type WorkspaceState, type WorkspaceStorage } from './workspace-state';

export interface WorkspaceLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  spec: WorkspaceSpec;
  /** Omit to measure the actual container. Useful for deterministic embedded previews. */
  viewportWidth?: number;
  preferences?: WorkspacePreferences;
  onPreferencesChange?: (preferences: WorkspacePreferences, action: WorkspaceAction) => void;
  onStateChange?: (state: WorkspaceState) => void;
  storage?: WorkspaceStorage;
  storageKey?: string;
  hoverPreview?: boolean;
  toolbar?: ReactNode;
  ribbon?: ReactNode;
  children?: ReactNode;
}
export interface WorkspaceController {
  spec: WorkspaceSpec; state: WorkspaceState; effective: ResolvedWorkspace; viewportWidth: number;
  preferencesPending: boolean;
  dispatch: (action: WorkspaceAction) => void;
  regionDomId: (regionId: string) => string;
}
interface InternalController extends WorkspaceController {
  hoverPreview: boolean;
  registerRegion: (id: string, element: HTMLElement | null) => void;
  registerRestore: (id: string, element: HTMLButtonElement | null) => void;
  restoreFocus: (id: string) => void;
  markLogicalInside: (event: Event) => void;
  hoverEnter: (id: string) => void; hoverLeave: (id: string) => void;
}
const Context = createContext<InternalController | null>(null);
const escapeOwners = new WeakMap<Document, HTMLElement>();
const samePreferences = (a: WorkspacePreferences, b: WorkspacePreferences) => Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(id => a[id]?.mode === b[id]?.mode && a[id]?.expandedWidth === b[id]?.expandedWidth);
function useInternal() { const value = useContext(Context); if (!value) throw new Error('Workspace components require WorkspaceLayout.'); return value; }
export function useWorkspaceLayout(): WorkspaceController { return useInternal(); }
function useRegion(id: string) { const context = useInternal(), region = context.spec.regions.find(item => item.id === id); if (!region) throw new RangeError(`Unknown workspace region: ${id}`); return { context, region, effective: context.effective.regions[id]! }; }

/** Candidate multi-region adapter. Preferences are persisted; the session and business data are not. */
export const WorkspaceLayout = forwardRef<HTMLDivElement, WorkspaceLayoutProps>(function WorkspaceLayout({ spec, viewportWidth: fixedWidth, preferences, onPreferencesChange, onStateChange, storage, storageKey = `rain-workspace/v2/${spec.workspaceKey}`, hoverPreview = false, toolbar, ribbon, children, className, ...props }, ref) {
  useMemo(() => validateWorkspaceSpec(spec), [spec]);
  const initial = () => createWorkspaceState(spec, preferences ?? loadWorkspacePreferences(storage, storageKey, spec));
  const [internal, setInternal] = useState(initial), [measuredWidth, setMeasuredWidth] = useState(fixedWidth ?? 0), [preferencesPending, setPending] = useState(false);
  const root = useRef<HTMLDivElement | null>(null), regions = useRef(new Map<string, HTMLElement>()), restores = useRef(new Map<string, HTMLButtonElement>()), logicalInside = useRef(new WeakSet<Event>());
  const timers = useRef<{ open?: ReturnType<typeof setTimeout>; close?: ReturnType<typeof setTimeout> }>({});
  const pendingPreferences = useRef<WorkspacePreferences | null>(null), prefix = useId();
  const current = internal.workspaceKey === spec.workspaceKey ? internal : initial();
  const state = preferences ? { ...current, preferences: createWorkspaceState(spec, preferences).preferences } : current;
  const viewportWidth = fixedWidth ?? measuredWidth;
  const effective = resolveWorkspace(spec, state, viewportWidth), latest = useRef({ spec, state, viewportWidth }); latest.current = { spec, state, viewportWidth };
  const callbacks = useRef({ onPreferencesChange, onStateChange, preferences, storage, storageKey }); callbacks.current = { onPreferencesChange, onStateChange, preferences, storage, storageKey };
  const clearTimers = useCallback(() => { clearTimeout(timers.current.open); clearTimeout(timers.current.close); timers.current = {}; }, []);
  useEffect(() => { if (!hoverPreview) clearTimers(); }, [hoverPreview, clearTimers]);
  const restoreFocus = useCallback((id: string) => restores.current.get(id)?.focus(), []);
  const dispatch = useCallback((action: WorkspaceAction) => {
    const { spec: activeSpec, state: before } = latest.current;
    const after = workspaceReducer(activeSpec, before, action), changed = !samePreferences(before.preferences, after.preferences);
    if (changed) {
      callbacks.current.onPreferencesChange?.(after.preferences, action);
      if (callbacks.current.preferences) { pendingPreferences.current = after.preferences; setPending(true); }
      else saveWorkspacePreferences(callbacks.current.storage, callbacks.current.storageKey, activeSpec, after.preferences);
    }
    const accepted = callbacks.current.preferences ? { ...after, preferences: before.preferences } : after;
    latest.current = { ...latest.current, state: accepted };
    setInternal(accepted);
    if (root.current && ['PEEK_REGION', 'OPEN_RIBBON_TEMP', 'ENTER_FOCUS', 'SHOW_REGION'].includes(action.type)) escapeOwners.set(root.current.ownerDocument, root.current);
    if (action.type === 'DISMISS_TEMP' && (action.reason === 'escape' || action.reason === 'close')) { const regionId = before.session.temporary?.regionId ?? before.session.ribbonTemporary; if (regionId) restoreFocus(regionId); }
    if (action.type !== 'RECORD_SCROLL') clearTimers();
  }, [clearTimers, restoreFocus]);
  useEffect(() => { callbacks.current.onStateChange?.(state); }, [internal, preferences]);
  useLayoutEffect(() => {
    if (internal.workspaceKey !== spec.workspaceKey) { clearTimers(); pendingPreferences.current = null; setPending(false); setInternal(initial()); }
  }, [spec.workspaceKey]);
  useEffect(() => { if (preferences && pendingPreferences.current && samePreferences(preferences, pendingPreferences.current)) { pendingPreferences.current = null; setPending(false); } }, [preferences]);
  useLayoutEffect(() => {
    if (fixedWidth !== undefined) return;
    const element = root.current; if (!element) return;
    const measure = () => setMeasuredWidth(element.getBoundingClientRect().width);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(entries => setMeasuredWidth(entries[0]?.contentRect.width ?? element.getBoundingClientRect().width));
    observer.observe(element); return () => observer.disconnect();
  }, [fixedWidth]);
  useEffect(() => {
    let active = true;
    const element = root.current;
    const outside = (event: PointerEvent) => {
      const session = latest.current.state.session, regionId = session.temporary?.regionId ?? session.ribbonTemporary; if (!regionId) return;
      const target = event.target;
      if (!(target instanceof Node) || logicalInside.current.has(event) || regions.current.get(regionId)?.contains(target)) return;
      if (target instanceof Element && target.closest('[data-workspace-action]') && root.current?.contains(target)) return;
      dispatch({ type: 'DISMISS_TEMP', reason: 'outside' });
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      const owner = escapeOwners.get(document) ?? [...document.querySelectorAll<HTMLElement>('[data-rain-id="layout-workspace"]')].reverse().find(element => element.dataset.focused === 'true' || element.querySelector('[data-temporary="true"]'));
      if (owner && owner !== root.current) return;
      const workspaceKey = latest.current.spec.workspaceKey;
      // Existing modal and Base UI popup layers consume the key before the nonmodal workspace layer.
      const popup = [...document.querySelectorAll<HTMLElement>('.rain-popup-positioner [data-slot="content"], [role="dialog"], [data-workspace-popup-open]')].some(element => !element.hidden && !element.closest('[hidden]'));
      queueMicrotask(() => {
        if (!active || event.defaultPrevented || popup || latest.current.spec.workspaceKey !== workspaceKey) return;
        const session = latest.current.state.session;
        if (session.temporary) { dispatch({ type: 'DISMISS_TEMP', reason: 'escape' }); event.preventDefault(); }
        else if (session.ribbonTemporary) { dispatch({ type: 'DISMISS_TEMP', reason: 'escape' }); event.preventDefault(); }
        else if (session.focused) { dispatch({ type: 'EXIT_FOCUS' }); event.preventDefault(); }
      });
    };
    document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape, true);
    return () => { active = false; document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape, true); if (escapeOwners.get(document) === element) escapeOwners.delete(document); clearTimers(); };
  }, [dispatch, clearTimers, spec.workspaceKey]);
  const hoverEnter = useCallback((id: string) => {
    clearTimeout(timers.current.close);
    if (!hoverPreview || latest.current.state.session.hoverSuppressedRegionId === id || latest.current.state.session.temporary?.regionId === id) return;
    clearTimeout(timers.current.open);
    timers.current.open = setTimeout(() => dispatch({ type: 'PEEK_REGION', regionId: id, source: 'hover', viewportWidth: latest.current.viewportWidth }), 240);
  }, [dispatch, hoverPreview]);
  const hoverLeave = useCallback((id: string) => {
    clearTimeout(timers.current.open);
    if (latest.current.state.session.hoverSuppressedRegionId === id) dispatch({ type: 'CLEAR_HOVER_SUPPRESSION', regionId: id });
    if (latest.current.state.session.temporary?.regionId === id && latest.current.state.session.temporary.source === 'hover') timers.current.close = setTimeout(() => { if (!regions.current.get(id)?.contains(document.activeElement)) dispatch({ type: 'DISMISS_TEMP', reason: 'outside' }); }, 360);
  }, [dispatch]);
  const value: InternalController = { spec, state, effective, viewportWidth, preferencesPending, dispatch, regionDomId: id => `${prefix}-workspace-${encodeURIComponent(id)}`, hoverPreview,
    registerRegion: (id, element) => { if (element) regions.current.set(id, element); else regions.current.delete(id); },
    registerRestore: (id, element) => { if (element) restores.current.set(id, element); else restores.current.delete(id); },
    restoreFocus, markLogicalInside: event => logicalInside.current.add(event), hoverEnter, hoverLeave };
  return <Context.Provider value={value}><div {...props} onFocusCapture={event => { escapeOwners.set(event.currentTarget.ownerDocument, event.currentTarget); props.onFocusCapture?.(event); }} onPointerDownCapture={event => { escapeOwners.set(event.currentTarget.ownerDocument, event.currentTarget); props.onPointerDownCapture?.(event); }} ref={element => { root.current = element; if (typeof ref === 'function') ref(element); else if (ref) ref.current = element; }} className={`rain-workspace ${className ?? ''}`} data-rain-id="layout-workspace" data-focused={String(state.session.focused)} data-viewport-width={viewportWidth} data-preferences-pending={String(preferencesPending)}>
    {toolbar}{ribbon}<div className="rain-workspace__flow" data-slot="workspace-flow">{children}</div>
    {preferencesPending && <span className="rain-workspace__pending" role="status">布局变更等待同步</span>}
  </div></Context.Provider>;
});

export interface RecoverableRegionRender { region: WorkspaceRegionSpec; effective: EffectiveRegion; temporary: boolean; visible: boolean }
export interface RecoverableRegionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  regionId: string;
  /** Recipe-owned heights for a top ribbon; hidden always reserves zero. */
  topHeights?: Partial<Record<RibbonMode, number>>;
  topTemporaryHeight?: number;
  children?: ReactNode | ((state: RecoverableRegionRender) => ReactNode);
  /** Compact global navigation and its expanded panel share this single mounted body. */
  header?: ReactNode | ((state: RecoverableRegionRender) => ReactNode);
  footer?: ReactNode;
}
export const RecoverableRegion = forwardRef<HTMLDivElement, RecoverableRegionProps>(function RecoverableRegion({ regionId, topHeights, topTemporaryHeight, children, header, footer, className, style, onFocusCapture, onBlurCapture, onPointerDownCapture, onPointerEnter, onPointerLeave, onScroll, ...props }, ref) {
  const { context, region, effective } = useRegion(regionId), top = region.side === 'top', temporary = context.state.session.temporary?.regionId === regionId || context.state.session.ribbonTemporary === regionId;
  const visible = effective.mode !== 'hidden' || temporary, expandedWidth = (context.state.session.focusOverrides[regionId] ?? context.state.preferences[regionId])!.expandedWidth;
  const body = useRef<HTMLDivElement | null>(null), focusInside = useRef(false), wasVisible = useRef(visible);
  useLayoutEffect(() => {
    if (wasVisible.current && !visible && focusInside.current) { context.restoreFocus(regionId); focusInside.current = false; }
    wasVisible.current = visible;
    if (body.current && visible) body.current.scrollTop = context.state.session.scrollPositions[regionId] ?? body.current.scrollTop;
  }, [visible, temporary]);
  const renderState: RecoverableRegionRender = { region, effective, temporary, visible };
  const render = (node: RecoverableRegionProps['children']) => typeof node === 'function' ? node(renderState) : node;
  return <div className="rain-workspace__region-slot" data-region-slot={regionId} data-side={region.side} style={top ? { width: '100%', height: effective.mode === 'hidden' ? 0 : topHeights?.[effective.mode as RibbonMode] ?? 'auto', flexBasis: 'auto' } : { width: effective.width, flexBasis: effective.width }}>
    <div {...props} id={context.regionDomId(regionId)} ref={element => { body.current = element; context.registerRegion(regionId, element); if (typeof ref === 'function') ref(element); else if (ref) ref.current = element; }}
      className={`rain-workspace__region ${className ?? ''}`} data-region-id={regionId} data-mode={effective.mode} data-temporary={String(temporary)} data-side={region.side} data-forced={String(effective.forced)}
      hidden={!visible} inert={!visible} aria-label={props['aria-label'] ?? region.label}
      style={{ ...style, ...(temporary ? top ? { width: '100%', height: topTemporaryHeight ?? topHeights?.full ?? 'auto' } : { width: Math.min(expandedWidth, Math.max(region.minWidth, context.viewportWidth - 16)) } : {}) }}
      onFocusCapture={event => { focusInside.current = true; onFocusCapture?.(event); }}
      onBlurCapture={event => { if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) focusInside.current = false; onBlurCapture?.(event); }}
      onPointerDownCapture={event => { if (temporary) context.markLogicalInside(event.nativeEvent); onPointerDownCapture?.(event); }}
      onPointerEnter={event => { if (temporary) context.hoverEnter(regionId); onPointerEnter?.(event); }} onPointerLeave={event => { if (temporary || context.state.session.hoverSuppressedRegionId === regionId) context.hoverLeave(regionId); onPointerLeave?.(event); }}
      onScroll={event => { context.dispatch({ type: 'RECORD_SCROLL', regionId, scrollTop: event.currentTarget.scrollTop }); onScroll?.(event); }}>
      {render(header)}{render(children)}{footer}{effective.forced && effective.reason === 'space' && <span className="rain-workspace__reason" role="status">空间不足，已保留展开偏好，可临时查看</span>}
    </div>
  </div>;
});

export interface RegionRestoreTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> { regionId: string; intent?: 'toggle' | 'peek' }
export const RegionRestoreTrigger = forwardRef<HTMLButtonElement, RegionRestoreTriggerProps>(function RegionRestoreTrigger({ regionId, intent = 'toggle', children, className, onClick, onPointerEnter, onPointerLeave, ...props }, ref) {
  const { context, region, effective } = useRegion(regionId), top = region.side === 'top', temporary = context.state.session.temporary?.regionId === regionId || context.state.session.ribbonTemporary === regionId;
  const full = effective.mode === 'expanded' || effective.mode === 'full' || effective.mode === 'icons';
  let action: WorkspaceAction | undefined;
  if (temporary) action = { type: 'DISMISS_TEMP', reason: 'close' };
  else if (top) {
    if (!full && region.allowedModes.some(mode => mode === 'full' || mode === 'icons')) action = { type: 'OPEN_RIBBON_TEMP', regionId };
    else {
      const modes: RibbonMode[] = full ? ['tabs', 'hidden', effective.mode === 'full' ? 'icons' : 'full'] : ['tabs', 'hidden'];
      const mode = modes.find(mode => mode !== effective.mode && region.allowedModes.includes(mode));
      if (mode) action = { type: 'SET_RIBBON', regionId, mode };
    }
  } else if (effective.mode === 'expanded') {
    if (region.allowedModes.includes('compact')) action = { type: 'TOGGLE_GLOBAL', regionId, viewportWidth: context.viewportWidth };
    else if (region.allowedModes.includes('hidden')) action = { type: 'HIDE_REGION', regionId };
  } else if (region.allowedModes.includes('expanded')) {
    action = intent === 'peek' ? { type: 'PEEK_REGION', regionId, viewportWidth: context.viewportWidth }
      : { type: region.allowedModes.includes('compact') ? 'TOGGLE_GLOBAL' : 'SHOW_REGION', regionId, viewportWidth: context.viewportWidth };
  } else {
    const mode = region.allowedModes.find(mode => mode !== effective.mode);
    if (mode) action = { type: 'SET_MODE', regionId, mode };
  }
  const disabled = props.disabled || !action;
  const hides = action?.type === 'HIDE_REGION' || ((action?.type === 'SET_RIBBON' || action?.type === 'SET_MODE') && action.mode === 'hidden');
  const expands = action?.type === 'SET_RIBBON' && action.mode === 'full';
  const label = temporary ? `关闭临时${region.label}` : !action ? region.label : hides ? `隐藏${region.label}` : effective.mode === 'hidden' ? `显示${region.label}` : expands || effective.mode === 'compact' || effective.mode === 'tabs' ? `展开${region.label}` : `收起${region.label}`;
  return <button {...props} disabled={disabled} type={props.type ?? 'button'} ref={element => { context.registerRestore(regionId, element); if (typeof ref === 'function') ref(element); else if (ref) ref.current = element; }}
    className={`rain-workspace__restore ${className ?? ''}`} data-workspace-action="restore" data-mode={effective.mode} data-active={String(temporary)} aria-label={props['aria-label'] ?? label} title={props.title ?? label} aria-controls={context.regionDomId(regionId)} aria-expanded={full || temporary}
    onClick={event => { onClick?.(event); if (!event.defaultPrevented && !disabled && action) context.dispatch(action); }}
    onPointerEnter={event => { if (!disabled && !top && !full && region.allowedModes.includes('expanded')) context.hoverEnter(regionId); onPointerEnter?.(event); }} onPointerLeave={event => { if (!top) context.hoverLeave(regionId); onPointerLeave?.(event); }}>{children ?? label}</button>;
});

export interface PaneSplitterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> { regionId: string }
export const PaneSplitter = forwardRef<HTMLDivElement, PaneSplitterProps>(function PaneSplitter({ regionId, className, style, onKeyDown, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, ...props }, ref) {
  const { context, region, effective } = useRegion(regionId), drag = useRef<{ pointerId: number; x: number; width: number } | null>(null);
  const preference = context.state.session.focusOverrides[regionId] ?? context.state.preferences[regionId]!;
  const others = Object.entries(context.effective.regions).reduce((sum, [id, item]) => sum + (id === regionId ? 0 : item.width + (item.mode === 'expanded' ? context.spec.regions.find(candidate => candidate.id === id)!.boundaryWidth ?? 0 : 0)), 0);
  const max = Math.max(region.minWidth, Math.min(region.maxWidth, context.viewportWidth - context.spec.minMainWidth - others - (region.boundaryWidth ?? 0) - (context.spec.reservedWidth ?? 0)));
  const hidden = region.side === 'top' || effective.mode !== 'expanded' || context.state.session.temporary?.regionId === regionId;
  return <div {...props} ref={ref} role="separator" aria-orientation="vertical" aria-label={props['aria-label'] ?? `调整${region.label}宽度`} aria-controls={context.regionDomId(regionId)} aria-valuemin={region.minWidth} aria-valuemax={max} aria-valuenow={Math.min(preference.expandedWidth, max)} tabIndex={hidden ? -1 : 0} hidden={hidden}
    className={`rain-workspace__splitter ${className ?? ''}`} style={{ ...style, width: region.boundaryWidth ?? 5, flexBasis: region.boundaryWidth ?? 5 }} data-region-id={regionId}
    onKeyDown={event => { onKeyDown?.(event); if (event.defaultPrevented || !['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(event.key)) return; if (event.key === 'Enter' && !region.allowedModes.some(mode => mode === 'hidden' || mode === 'compact')) return; event.preventDefault(); const key = region.side === 'end' && event.key.startsWith('Arrow') ? event.key === 'ArrowLeft' ? 'ArrowRight' : 'ArrowLeft' : event.key; context.dispatch({ type: 'RESIZE_REGION_KEY', regionId, key: key as ResizeKey, shiftKey: event.shiftKey, viewportWidth: context.viewportWidth }); if (key === 'Enter') context.restoreFocus(regionId); }}
    onPointerDown={event => { onPointerDown?.(event); if (event.defaultPrevented || event.button !== 0) return; drag.current = { pointerId: event.pointerId, x: event.clientX, width: preference.expandedWidth }; event.currentTarget.setPointerCapture?.(event.pointerId); event.preventDefault(); }}
    onPointerMove={event => { onPointerMove?.(event); const active = drag.current; if (!active || active.pointerId !== event.pointerId) return; context.dispatch({ type: 'RESIZE_REGION', regionId, width: active.width + (event.clientX - active.x) * (region.side === 'end' ? -1 : 1), viewportWidth: context.viewportWidth }); }}
    onPointerUp={event => { onPointerUp?.(event); drag.current = null; if (event.currentTarget.hasPointerCapture?.(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
    onPointerCancel={event => { onPointerCancel?.(event); drag.current = null; }} />;
});
