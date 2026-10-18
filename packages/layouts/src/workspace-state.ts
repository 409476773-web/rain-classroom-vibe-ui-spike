/** Candidate layout state; business selections, documents and drafts belong to the caller. */
export type RegionMode = "expanded" | "compact" | "hidden";
export type RibbonMode = "full" | "icons" | "tabs" | "hidden";
export type WorkspaceRegionMode = RegionMode | RibbonMode;
export interface RegionPreference { mode: WorkspaceRegionMode; expandedWidth: number }
export type WorkspacePreferences = Record<string, RegionPreference>;
export interface WorkspaceRegionSpec {
  id: string; label: string; side: "start" | "end" | "top";
  allowedModes: readonly WorkspaceRegionMode[];
  minWidth: number; defaultWidth: number; maxWidth: number;
  compactWidth?: number; boundaryWidth?: number;
  adaptationPriority: number; restoreOwnerId: string;
  defaultMode?: WorkspaceRegionMode;
}
export interface WorkspaceSpec {
  workspaceKey: string; regions: readonly WorkspaceRegionSpec[];
  stableRestoreOwnerIds: readonly string[]; minMainWidth: number; reservedWidth?: number;
}
export interface TemporaryRegion {
  regionId: string; source: "click" | "hover"; baseMode: WorkspaceRegionMode; reservedWidth: number;
}
export interface WorkspaceSession {
  temporary: TemporaryRegion | null;
  focused: boolean; focusBefore: WorkspacePreferences | null;
  focusOverrides: WorkspacePreferences;
  ribbonTemporary: string | null;
  pinnedBaseModes: Record<string, WorkspaceRegionMode>;
  scrollPositions: Record<string, number>;
  hoverSuppressedRegionId: string | null;
}
export interface WorkspaceState { workspaceKey: string; preferences: WorkspacePreferences; session: WorkspaceSession }
export interface EffectiveRegion { requested: WorkspaceRegionMode; mode: WorkspaceRegionMode; width: number; forced: boolean; reason?: "space" | "focus" }
export interface ResolvedWorkspace { regions: Record<string, EffectiveRegion>; mainWidth: number; budgetOverflow: boolean }
export type ResizeKey = "ArrowLeft" | "ArrowRight" | "Home" | "End" | "Enter";
export type WorkspaceAction =
  | { type: "SET_MODE"; regionId: string; mode: WorkspaceRegionMode }
  | { type: "TOGGLE_GLOBAL" | "HIDE_REGION" | "SHOW_REGION" | "PIN_TEMP" | "UNPIN"; regionId: string; viewportWidth?: number }
  | { type: "PEEK_REGION"; regionId: string; source?: "click" | "hover"; viewportWidth: number }
  | { type: "DISMISS_TEMP"; reason?: "outside" | "escape" | "close" | "action" }
  | { type: "RESIZE_REGION"; regionId: string; width: number; viewportWidth: number }
  | { type: "RESIZE_REGION_KEY"; regionId: string; key: ResizeKey; shiftKey?: boolean; viewportWidth: number }
  | { type: "ENTER_FOCUS" }
  | { type: "EXIT_FOCUS" }
  | { type: "SWITCH_CONTEXT"; spec: WorkspaceSpec; preferences?: WorkspacePreferences | Partial<WorkspacePreferences> }
  | { type: "SET_RIBBON"; regionId: string; mode: RibbonMode }
  | { type: "OPEN_RIBBON_TEMP"; regionId: string }
  | { type: "RECORD_SCROLL"; regionId: string; scrollTop: number }
  | { type: "CLEAR_HOVER_SUPPRESSION"; regionId?: string };
export interface WorkspaceStorage { getItem(key: string): string | null; setItem(key: string, value: string): void }
export const WORKSPACE_PREFERENCES_VERSION = 2;

export function createWorkspaceKey(identity: { userScope: string; workspaceId: string; subsceneId: string; instanceId: string }): string {
  const parts = [identity.userScope, identity.workspaceId, identity.subsceneId, identity.instanceId];
  if (parts.some(part => typeof part !== "string" || !part.trim())) throw new RangeError("Workspace identity needs non-empty stable IDs.");
  return parts.map(encodeURIComponent).join("/");
}

function finite(name: string, value: number, minimum = 0): void {
  if (!Number.isFinite(value) || value < minimum) throw new RangeError(`${name} must be finite and >= ${minimum}.`);
}
function clampWidth(region: WorkspaceRegionSpec, width: number, max = region.maxWidth): number {
  finite("Region width", width, -Infinity);
  return Math.min(Math.max(region.minWidth, max), Math.max(region.minWidth, Math.round(width)));
}
function copyPreferences(preferences: WorkspacePreferences): WorkspacePreferences {
  return Object.fromEntries(Object.entries(preferences).map(([id, preference]) => [id, { mode: preference.mode, expandedWidth: preference.expandedWidth }]));
}
function regionSpec(spec: WorkspaceSpec, id: string): WorkspaceRegionSpec {
  const region = spec.regions.find(candidate => candidate.id === id);
  if (!region) throw new RangeError(`Unknown workspace region: ${id}.`);
  return region;
}
function checkMode(region: WorkspaceRegionSpec, mode: WorkspaceRegionMode): void {
  if (!region.allowedModes.includes(mode)) throw new RangeError(`${region.id}: unsupported mode ${mode}.`);
}
function checkWorkspace(spec: WorkspaceSpec, state: WorkspaceState): void {
  if (state.workspaceKey !== spec.workspaceKey) throw new RangeError("Workspace state and specification keys must match.");
}
function preferenceFor(region: WorkspaceRegionSpec, preference?: RegionPreference): RegionPreference {
  const mode = preference?.mode ?? region.defaultMode ?? region.allowedModes[0]!;
  checkMode(region, mode);
  return { mode, expandedWidth: clampWidth(region, preference?.expandedWidth ?? region.defaultWidth) };
}
function emptySession(): WorkspaceSession {
  return { temporary: null, focused: false, focusBefore: null, focusOverrides: {}, ribbonTemporary: null, pinnedBaseModes: {}, scrollPositions: {}, hoverSuppressedRegionId: null };
}

/** Every hidden region must have a named recovery owner outside any co-hidden subtree. */
export function validateWorkspaceSpec(spec: WorkspaceSpec): void {
  if (!spec.workspaceKey.trim()) throw new RangeError("Workspace key must be non-empty.");
  finite("minMainWidth", spec.minMainWidth, 1);
  finite("reservedWidth", spec.reservedWidth ?? 0);
  const ids = new Set<string>(), owners = new Set(spec.stableRestoreOwnerIds);
  for (const region of spec.regions) {
    if (!region.id.trim() || ids.has(region.id)) throw new RangeError("Region IDs must be non-empty and unique.");
    ids.add(region.id);
    finite(`${region.id} minWidth`, region.minWidth, 1);
    finite(`${region.id} maxWidth`, region.maxWidth, region.minWidth);
    finite(`${region.id} defaultWidth`, region.defaultWidth, region.minWidth);
    if (region.defaultWidth > region.maxWidth) throw new RangeError("Default width exceeds maxWidth.");
    finite(`${region.id} boundaryWidth`, region.boundaryWidth ?? 0);
    finite(`${region.id} adaptationPriority`, region.adaptationPriority, -Infinity);
    const modes: readonly WorkspaceRegionMode[] = region.side === "top" ? ["full", "icons", "tabs", "hidden"] : ["expanded", "compact", "hidden"];
    if (!region.allowedModes.length || new Set(region.allowedModes).size !== region.allowedModes.length || region.allowedModes.some(mode => !modes.includes(mode))) throw new RangeError(`${region.id}: invalid allowed modes.`);
    if (region.defaultMode) checkMode(region, region.defaultMode);
    if (region.allowedModes.includes("compact")) {
      finite(`${region.id} compactWidth`, region.compactWidth ?? NaN, 1);
      if (region.compactWidth! > region.minWidth) throw new RangeError("Compact rail must not exceed minWidth.");
    }
  }
  if ([...owners].some(id => !id.trim() || ids.has(id))) throw new RangeError("Stable restore owners must be external to the region tree.");
  for (const region of spec.regions) {
    const path = new Set([region.id]);
    let ownerId = region.restoreOwnerId;
    while (!owners.has(ownerId)) {
      if (path.has(ownerId)) throw new RangeError(`${region.id}: restore owner cycle.`);
      path.add(ownerId);
      const owner = spec.regions.find(candidate => candidate.id === ownerId);
      if (!owner || owner.allowedModes.includes("hidden")) throw new RangeError(`${region.id}: restore owner is missing or co-hidden.`);
      ownerId = owner.restoreOwnerId;
    }
  }
}

export function createWorkspaceState(spec: WorkspaceSpec, preferences: Partial<WorkspacePreferences> = {}): WorkspaceState {
  validateWorkspaceSpec(spec);
  return {
    workspaceKey: spec.workspaceKey,
    preferences: Object.fromEntries(spec.regions.map(region => [region.id, preferenceFor(region, Object.hasOwn(preferences, region.id) ? preferences[region.id] : undefined)])),
    session: emptySession(),
  };
}

/** Derived constraints never mutate requested preference or temporary overlay placement. */
export function resolveWorkspace(spec: WorkspaceSpec, state: WorkspaceState, viewportWidth: number): ResolvedWorkspace {
  checkWorkspace(spec, state);
  finite("Viewport width", viewportWidth);
  const regions = Object.fromEntries(spec.regions.map(region => {
    const preference = preferenceFor(region, state.preferences[region.id]);
    const focused = state.session.focused && region.allowedModes.includes("hidden");
    const override = Object.hasOwn(state.session.focusOverrides, region.id) ? state.session.focusOverrides[region.id] : undefined;
    const mode = focused ? override?.mode ?? "hidden" : preference.mode;
    return [region.id, { requested: preference.mode, mode, width: region.side === "top" || mode === "hidden" ? 0 : mode === "compact" ? region.compactWidth! : override?.expandedWidth ?? preference.expandedWidth, forced: false, ...(focused && mode !== preference.mode ? { reason: "focus" as const } : {}) }];
  })) as Record<string, EffectiveRegion>;
  const total = () => (spec.reservedWidth ?? 0) + spec.regions.reduce((sum, region) => {
    const effective = regions[region.id]!;
    return sum + effective.width + (region.side !== "top" && effective.mode === "expanded" ? region.boundaryWidth ?? 0 : 0);
  }, 0);
  const candidates = [...spec.regions].filter(region => region.side !== "top").sort((a, b) => a.adaptationPriority - b.adaptationPriority);
  // One pass first retains a supported compact rail; a second pass handles smaller containers.
  for (const compactPass of [true, false]) for (const region of candidates) {
    if (viewportWidth - total() >= spec.minMainWidth) break;
    const effective = regions[region.id]!;
    if (effective.mode === "hidden") continue;
    if (compactPass && effective.mode === "expanded" && region.allowedModes.includes("compact")) {
      effective.mode = "compact"; effective.width = region.compactWidth!;
    } else if (region.allowedModes.includes("hidden")) {
      effective.mode = "hidden"; effective.width = 0;
    } else continue;
    effective.forced = true; effective.reason = "space";
  }
  const mainWidth = Math.max(0, Math.floor(viewportWidth - total()));
  return { regions, mainWidth, budgetOverflow: mainWidth < spec.minMainWidth };
}

function clearTemporary(state: WorkspaceState): WorkspaceState {
  return { ...state, session: { ...state.session, temporary: null, ribbonTemporary: null } };
}
function setPreference(state: WorkspaceState, region: WorkspaceRegionSpec, preference: RegionPreference): WorkspaceState {
  const next = preferenceFor(region, preference);
  let clean = clearTemporary(state);
  if (!state.session.focused && next.mode !== currentPreference(state, region).mode) {
    const { [region.id]: _oldBase, ...pinnedBaseModes } = state.session.pinnedBaseModes;
    clean = { ...clean, session: { ...clean.session, pinnedBaseModes } };
  }
  return state.session.focused
    ? { ...clean, session: { ...clean.session, focusOverrides: { ...state.session.focusOverrides, [region.id]: next } } }
    : { ...clean, preferences: { ...state.preferences, [region.id]: next } };
}
function currentPreference(state: WorkspaceState, region: WorkspaceRegionSpec): RegionPreference {
  return (Object.hasOwn(state.session.focusOverrides, region.id) ? state.session.focusOverrides[region.id] : undefined)
    ?? (Object.hasOwn(state.preferences, region.id) ? state.preferences[region.id] : undefined) ?? preferenceFor(region);
}
function peekRegion(spec: WorkspaceSpec, state: WorkspaceState, region: WorkspaceRegionSpec, viewportWidth: number, source: "click" | "hover" = "click"): WorkspaceState {
  if (source === "hover" && state.session.hoverSuppressedRegionId === region.id) return state;
  const effective = resolveWorkspace(spec, state, viewportWidth).regions[region.id]!;
  const clean = clearTemporary(state);
  if (effective.mode === "expanded" && !state.session.focused) return clean;
  return { ...clean, session: { ...clean.session, temporary: { regionId: region.id, source, baseMode: effective.mode, reservedWidth: effective.width }, hoverSuppressedRegionId: null } };
}
function availableMaxWidth(spec: WorkspaceSpec, state: WorkspaceState, region: WorkspaceRegionSpec, viewportWidth: number): number {
  const effective = resolveWorkspace(spec, state, viewportWidth);
  const current = effective.regions[region.id]!;
  const boundary = current.mode === "expanded" ? 0 : region.boundaryWidth ?? 0;
  return Math.max(region.minWidth, Math.min(region.maxWidth, current.width + Math.max(0, effective.mainWidth - spec.minMainWidth) - boundary));
}

/** One action dismisses the previous layer and completes the newly requested operation. */
export function workspaceReducer(spec: WorkspaceSpec, state: WorkspaceState, action: WorkspaceAction): WorkspaceState {
  if (action.type === "SWITCH_CONTEXT") return createWorkspaceState(action.spec, action.preferences);
  checkWorkspace(spec, state);
  if (action.type === "ENTER_FOCUS") {
    if (state.session.focused) return state;
    return { ...state, session: { ...state.session, temporary: null, ribbonTemporary: null, focused: true, focusBefore: copyPreferences(state.preferences), focusOverrides: {}, hoverSuppressedRegionId: null } };
  }
  if (action.type === "EXIT_FOCUS") {
    return { ...state, preferences: state.session.focusBefore ? copyPreferences(state.session.focusBefore) : state.preferences, session: { ...state.session, focused: false, focusBefore: null, focusOverrides: {}, temporary: null, ribbonTemporary: null, hoverSuppressedRegionId: null } };
  }
  if (action.type === "DISMISS_TEMP") {
    const suppress = action.reason === "escape" || action.reason === "close";
    return { ...state, session: { ...state.session, temporary: null, ribbonTemporary: null, hoverSuppressedRegionId: suppress ? state.session.temporary?.regionId ?? null : null } };
  }
  if (action.type === "CLEAR_HOVER_SUPPRESSION") {
    return !action.regionId || action.regionId === state.session.hoverSuppressedRegionId ? { ...state, session: { ...state.session, hoverSuppressedRegionId: null } } : state;
  }
  const region = regionSpec(spec, action.regionId), previous = currentPreference(state, region);
  switch (action.type) {
    case "SET_MODE": return setPreference(state, region, { ...previous, mode: action.mode });
    case "HIDE_REGION": return setPreference(state, region, { ...previous, mode: "hidden" });
    case "SHOW_REGION": {
      const next = setPreference(state, region, { ...previous, mode: region.side === "top" ? "full" : "expanded" });
      return action.viewportWidth !== undefined && region.side !== "top" && resolveWorkspace(spec, next, action.viewportWidth).regions[region.id]!.forced ? peekRegion(spec, next, region, action.viewportWidth) : next;
    }
    case "TOGGLE_GLOBAL": {
      checkMode(region, "compact");
      return previous.mode === "expanded"
        ? setPreference(state, region, { ...previous, mode: "compact" })
        : workspaceReducer(spec, state, { type: "SHOW_REGION", regionId: region.id, viewportWidth: action.viewportWidth });
    }
    case "PEEK_REGION": {
      if (region.side === "top") throw new RangeError("Use OPEN_RIBBON_TEMP for a top region.");
      return peekRegion(spec, state, region, action.viewportWidth, action.source);
    }
    case "PIN_TEMP": {
      const base = state.session.temporary?.regionId === region.id ? state.session.temporary.baseMode : previous.mode;
      let next = setPreference(state, region, { ...previous, mode: region.side === "top" ? "full" : "expanded" });
      if (!state.session.focused) next = { ...next, session: { ...next.session, pinnedBaseModes: { ...next.session.pinnedBaseModes, [region.id]: base } } };
      return action.viewportWidth !== undefined && region.side !== "top" && resolveWorkspace(spec, next, action.viewportWidth).regions[region.id]!.forced ? peekRegion(spec, next, region, action.viewportWidth) : next;
    }
    case "UNPIN": {
      const mode = (!state.session.focused && Object.hasOwn(state.session.pinnedBaseModes, region.id) ? state.session.pinnedBaseModes[region.id] : undefined) ?? (region.side === "top" && region.allowedModes.includes("tabs") ? "tabs" : "hidden");
      const next = setPreference(state, region, { ...previous, mode });
      if (region.side === "top") return { ...next, session: { ...next.session, ribbonTemporary: region.id } };
      return action.viewportWidth !== undefined ? peekRegion(spec, next, region, action.viewportWidth) : next;
    }
    case "RESIZE_REGION": {
      const width = clampWidth(region, action.width, availableMaxWidth(spec, state, region, action.viewportWidth));
      const next = setPreference(state, region, { ...previous, expandedWidth: width });
      // Resizing an open temporary panel retains that panel and its original base occupancy.
      return { ...next, session: { ...next.session, temporary: state.session.temporary, ribbonTemporary: state.session.ribbonTemporary } };
    }
    case "RESIZE_REGION_KEY": {
      if (action.key === "Enter") {
        const mode = region.allowedModes.includes("hidden") ? "hidden" : region.allowedModes.includes("compact") ? "compact" : undefined;
        return mode ? setPreference(state, region, { ...previous, mode }) : state;
      }
      const width = action.key === "Home" ? region.minWidth : action.key === "End" ? availableMaxWidth(spec, state, region, action.viewportWidth) : previous.expandedWidth + (action.key === "ArrowLeft" ? -1 : 1) * (action.shiftKey ? 32 : 10);
      return workspaceReducer(spec, state, { type: "RESIZE_REGION", regionId: region.id, width, viewportWidth: action.viewportWidth });
    }
    case "SET_RIBBON": {
      if (region.side !== "top") throw new RangeError("Ribbon modes require a top region.");
      return setPreference(state, region, { ...previous, mode: action.mode });
    }
    case "OPEN_RIBBON_TEMP": {
      if (region.side !== "top") throw new RangeError("Temporary ribbon requires a top region.");
      const clean = clearTemporary(state);
      const mode = state.session.focused ? state.session.focusOverrides[region.id]?.mode ?? "hidden" : previous.mode;
      return { ...clean, session: { ...clean.session, ribbonTemporary: mode === "full" || mode === "icons" ? null : region.id } };
    }
    case "RECORD_SCROLL": {
      finite("scrollTop", action.scrollTop);
      return { ...state, session: { ...state.session, scrollPositions: { ...state.session.scrollPositions, [region.id]: action.scrollTop } } };
    }
  }
}

function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }

/** Inject storage; SSR, denied access and invalid payloads all retain usable defaults. */
export function loadWorkspacePreferences(storage: WorkspaceStorage | undefined, key: string, spec: WorkspaceSpec): WorkspacePreferences {
  const defaults = createWorkspaceState(spec).preferences;
  try {
    const raw = storage?.getItem(key);
    if (!raw) return defaults;
    const payload: unknown = JSON.parse(raw);
    if (!isRecord(payload) || (payload.version !== 1 && payload.version !== WORKSPACE_PREFERENCES_VERSION) || !isRecord(payload.regions)) return defaults;
    return Object.fromEntries(spec.regions.map(region => {
      const value = Object.hasOwn(payload.regions as object, region.id) ? (payload.regions as Record<string, unknown>)[region.id] : undefined;
      if (!isRecord(value) || typeof value.mode !== "string" || !region.allowedModes.includes(value.mode as WorkspaceRegionMode)) return [region.id, defaults[region.id]!];
      const width = payload.version === 1 ? value.width : value.expandedWidth;
      if (typeof width !== "number" || !Number.isFinite(width) || width < 0) return [region.id, defaults[region.id]!];
      return [region.id, { mode: value.mode as WorkspaceRegionMode, expandedWidth: clampWidth(region, width) }];
    }));
  } catch { return defaults; }
}

export function saveWorkspacePreferences(storage: WorkspaceStorage | undefined, key: string, spec: WorkspaceSpec, preferences: WorkspacePreferences): boolean {
  if (!storage) return false;
  try {
    const regions = createWorkspaceState(spec, preferences).preferences;
    storage.setItem(key, JSON.stringify({ version: WORKSPACE_PREFERENCES_VERSION, regions }));
    return true;
  } catch { return false; }
}
