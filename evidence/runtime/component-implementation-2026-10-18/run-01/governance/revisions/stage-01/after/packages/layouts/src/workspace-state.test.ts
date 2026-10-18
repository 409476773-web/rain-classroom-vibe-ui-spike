import { describe, expect, it } from "vitest";
import {
  createWorkspaceKey, createWorkspaceState, loadWorkspacePreferences, resolveWorkspace,
  saveWorkspacePreferences, validateWorkspaceSpec, workspaceReducer,
  type WorkspaceAction, type WorkspaceSpec, type WorkspaceState, type WorkspaceStorage,
} from "./workspace-state";

const spec: WorkspaceSpec = {
  workspaceKey: "mock/course/S4/first", minMainWidth: 560, reservedWidth: 32,
  stableRestoreOwnerIds: ["workspace-bar"],
  regions: [
    { id: "global", label: "平台导航", side: "start", allowedModes: ["expanded", "compact", "hidden"], minWidth: 180, defaultWidth: 220, maxWidth: 320, compactWidth: 56, adaptationPriority: 0, restoreOwnerId: "workspace-bar", boundaryWidth: 5 },
    { id: "directory", label: "课程目录", side: "start", allowedModes: ["expanded", "hidden"], minWidth: 200, defaultWidth: 260, maxWidth: 380, adaptationPriority: 1, restoreOwnerId: "workspace-bar", boundaryWidth: 5 },
    { id: "inspector", label: "评分", side: "end", allowedModes: ["expanded", "hidden"], minWidth: 220, defaultWidth: 280, maxWidth: 420, adaptationPriority: 2, restoreOwnerId: "workspace-bar", boundaryWidth: 5 },
    { id: "ribbon", label: "工具区", side: "top", allowedModes: ["full", "icons", "tabs", "hidden"], minWidth: 1, defaultWidth: 1, maxWidth: 1, adaptationPriority: 3, restoreOwnerId: "workspace-bar" },
  ],
};
const initial = () => createWorkspaceState(spec);
const step = (state: WorkspaceState, action: WorkspaceAction) => workspaceReducer(spec, state, action);
const hide = (state: WorkspaceState, regionId: string) => step(state, { type: "HIDE_REGION", regionId });

describe("workspace identity and restoration contract", () => {
  it("isolates workspace/subscene/instance and escaped ID separators", () => {
    const id = { userScope: "mock", workspaceId: "course/one", subsceneId: "grading", instanceId: "left" };
    expect(createWorkspaceKey(id)).not.toBe(createWorkspaceKey({ ...id, workspaceId: "course", subsceneId: "one/grading" }));
    expect(createWorkspaceKey(id)).not.toBe(createWorkspaceKey({ ...id, instanceId: "right" }));
    expect(createWorkspaceKey(id)).not.toBe(createWorkspaceKey({ ...id, subsceneId: "interaction" }));
    expect(() => createWorkspaceKey({ ...id, userScope: "" })).toThrow();
  });

  it("N01 rejects self/cyclic/missing/co-hidden restore owners", () => {
    expect(() => validateWorkspaceSpec(spec)).not.toThrow();
    const regions = spec.regions.map(region => ({ ...region }));
    regions[0]!.restoreOwnerId = "global";
    expect(() => validateWorkspaceSpec({ ...spec, regions })).toThrow(/restore/i);
    regions[0]!.restoreOwnerId = "directory";
    regions[1]!.restoreOwnerId = "global";
    expect(() => validateWorkspaceSpec({ ...spec, regions })).toThrow(/restore/i);
    regions[0]!.restoreOwnerId = "missing";
    expect(() => validateWorkspaceSpec({ ...spec, regions })).toThrow(/restore/i);
    regions[0]!.restoreOwnerId = "directory";
    regions[1]!.restoreOwnerId = "workspace-bar";
    expect(() => validateWorkspaceSpec({ ...spec, regions })).toThrow(/restore/i);
  });

  it("rejects invalid geometry, duplicate IDs and compact without a usable rail", () => {
    for (const changes of [{ minWidth: 0 }, { defaultWidth: 500 }, { maxWidth: NaN }, { compactWidth: undefined }]) {
      expect(() => validateWorkspaceSpec({ ...spec, regions: [{ ...spec.regions[0]!, ...changes }] })).toThrow();
    }
    expect(() => validateWorkspaceSpec({ ...spec, regions: [spec.regions[0]!, spec.regions[0]!] })).toThrow();
    expect(() => validateWorkspaceSpec({ ...spec, regions: [{ ...spec.regions[1]!, allowedModes: ["full"] }] })).toThrow();
  });

  it("retains explicit unsupported-mode errors while Enter resolves a supported collapse", () => {
    const compact: WorkspaceSpec = { ...spec, regions: [{ ...spec.regions[0]!, allowedModes: ["expanded", "compact"] }] };
    const state = createWorkspaceState(compact);
    expect(() => workspaceReducer(compact, state, { type: "HIDE_REGION", regionId: "global" })).toThrow(/unsupported mode hidden/);
    expect(() => workspaceReducer(compact, state, { type: "SET_MODE", regionId: "global", mode: "hidden" })).toThrow(/unsupported mode hidden/);
    expect(workspaceReducer(compact, state, { type: "RESIZE_REGION_KEY", regionId: "global", key: "Enter", viewportWidth: 1200 }).preferences.global).toEqual({ mode: "compact", expandedWidth: 220 });
    const fixed: WorkspaceSpec = { ...compact, regions: [{ ...compact.regions[0]!, allowedModes: ["expanded"] }] }, fixedState = createWorkspaceState(fixed);
    expect(workspaceReducer(fixed, fixedState, { type: "RESIZE_REGION_KEY", regionId: "global", key: "Enter", viewportWidth: 1200 })).toBe(fixedState);
  });

  it.each(["start", "end"] as const)("preserves a %s compact base through show, peek, pin and unpin without hidden capability", side => {
    const subset: WorkspaceSpec = { ...spec, regions: [{ ...spec.regions[0]!, side, allowedModes: ["expanded", "compact"], defaultMode: "compact" }] };
    let state = createWorkspaceState(subset);
    state = workspaceReducer(subset, state, { type: "SHOW_REGION", regionId: "global", viewportWidth: 1200 });
    expect(state.preferences.global).toEqual({ mode: "expanded", expandedWidth: 220 });
    state = workspaceReducer(subset, state, { type: "RESIZE_REGION_KEY", regionId: "global", key: "Enter", viewportWidth: 1200 });
    state = workspaceReducer(subset, state, { type: "PEEK_REGION", regionId: "global", viewportWidth: 1200 });
    expect(state.session.temporary).toMatchObject({ regionId: "global", baseMode: "compact" });
    state = workspaceReducer(subset, state, { type: "PIN_TEMP", regionId: "global", viewportWidth: 1200 });
    expect(state.preferences.global!.mode).toBe("expanded");
    state = workspaceReducer(subset, state, { type: "UNPIN", regionId: "global", viewportWidth: 1200 });
    expect(state.preferences.global).toEqual({ mode: "compact", expandedWidth: 220 });
    expect(state.session.temporary).toMatchObject({ regionId: "global", baseMode: "compact" });
    expect(() => workspaceReducer(subset, state, { type: "SET_MODE", regionId: "global", mode: "hidden" })).toThrow(/unsupported mode hidden/);
  });

  it("restores a full/icons ribbon's recorded icons base after a temporary pin", () => {
    const subset: WorkspaceSpec = { ...spec, regions: [{ ...spec.regions[3]!, allowedModes: ["full", "icons"], defaultMode: "icons" }] };
    let state = createWorkspaceState(subset);
    state = workspaceReducer(subset, state, { type: "PIN_TEMP", regionId: "ribbon" });
    expect(state.preferences.ribbon!.mode).toBe("full");
    state = workspaceReducer(subset, state, { type: "UNPIN", regionId: "ribbon" });
    expect(state.preferences.ribbon!.mode).toBe("icons");
    expect(() => workspaceReducer(subset, state, { type: "SET_RIBBON", regionId: "ribbon", mode: "tabs" })).toThrow(/unsupported mode tabs/);
  });

  it("keeps fractional width limits during initialization, resizing and preference loading", () => {
    for (const bound of [100.4, 100.6]) {
      const fractional = { ...spec, regions: [{ ...spec.regions[1]!, minWidth: bound, defaultWidth: bound, maxWidth: bound }] };
      const state = createWorkspaceState(fractional);
      expect(state.preferences.directory!.expandedWidth).toBe(bound);
      expect(workspaceReducer(fractional, state, { type: "RESIZE_REGION", regionId: "directory", width: 300, viewportWidth: 1600 }).preferences.directory!.expandedWidth).toBe(bound);
      const storage = { getItem: () => JSON.stringify({ version: 2, workspaceKey: fractional.workspaceKey, regions: { directory: { mode: "expanded", expandedWidth: 300 } } }), setItem: () => {} };
      expect(loadWorkspacePreferences(storage, "prefs", fractional).directory!.expandedWidth).toBe(bound);
    }
  });
});

describe("requested/effective/session separation", () => {
  it("N32 adapts by recipe priority and recovers without overwriting preferences", () => {
    const state = initial(), before = structuredClone(state.preferences);
    const narrow = resolveWorkspace(spec, state, 1000);
    expect(narrow.regions.global).toMatchObject({ requested: "expanded", mode: "compact", width: 56, forced: true });
    expect(narrow.regions.directory).toMatchObject({ requested: "expanded", mode: "hidden", width: 0, forced: true });
    expect(narrow.regions.inspector).toMatchObject({ mode: "expanded", width: 280, forced: false });
    expect(narrow.mainWidth).toBeGreaterThanOrEqual(560);
    expect(state.preferences).toEqual(before);
    expect(resolveWorkspace(spec, state, 1600).regions.global!.mode).toBe("expanded");
    expect(resolveWorkspace(spec, state, 500)).toMatchObject({ budgetOverflow: true });
    expect(resolveWorkspace(spec, state, 500).regions.global!.mode).toBe("hidden");
  });

  it("N04 compact peek preserves occupied space and preference", () => {
    const state = step(initial(), { type: "SET_MODE", regionId: "global", mode: "compact" });
    const before = resolveWorkspace(spec, state, 1600);
    const peek = step(state, { type: "PEEK_REGION", regionId: "global", viewportWidth: 1600 });
    expect(peek.preferences).toEqual(state.preferences);
    expect(peek.session.temporary).toMatchObject({ regionId: "global", baseMode: "compact", reservedWidth: 56 });
    expect(resolveWorkspace(spec, peek, 1600)).toEqual(before);
  });

  it("N02/N03 executes a new hide/show intent while clearing an old temporary panel", () => {
    let state = hide(initial(), "directory");
    state = hide(state, "global");
    state = step(state, { type: "PEEK_REGION", regionId: "global", viewportWidth: 1600 });
    state = step(state, { type: "SHOW_REGION", regionId: "directory", viewportWidth: 1600 });
    expect(state.session.temporary).toBeNull();
    expect(state.preferences.directory!.mode).toBe("expanded");
    state = step(state, { type: "PEEK_REGION", regionId: "global", viewportWidth: 1600 });
    state = hide(state, "directory");
    expect(state.session.temporary).toBeNull();
    expect(state.preferences.directory!.mode).toBe("hidden");
  });

  it("keeps expanded requests when showing/pinning is constrained", () => {
    let state = hide(initial(), "global");
    state = step(state, { type: "SHOW_REGION", regionId: "global", viewportWidth: 900 });
    expect(state.preferences.global!.mode).toBe("expanded");
    expect(state.session.temporary?.regionId).toBe("global");
    state = step(state, { type: "PIN_TEMP", regionId: "global", viewportWidth: 900 });
    expect(state.preferences.global!.mode).toBe("expanded");
    expect(state.session.temporary?.regionId).toBe("global");
    expect(resolveWorkspace(spec, state, 900).regions.global!.reason).toBe("space");
  });

  it("opens a constrained global expansion on the first toggle without pushing the main region", () => {
    const state = step(initial(), { type: "SET_MODE", regionId: "global", mode: "compact" });
    const before = resolveWorkspace(spec, state, 1300);
    const expanded = step(state, { type: "TOGGLE_GLOBAL", regionId: "global", viewportWidth: 1300 });
    expect(expanded.preferences.global!.mode).toBe("expanded");
    expect(expanded.session.temporary).toMatchObject({ regionId: "global", baseMode: "compact" });
    expect(resolveWorkspace(spec, expanded, 1300).mainWidth).toBe(before.mainWidth);
    expect(step(expanded, { type: "TOGGLE_GLOBAL", regionId: "global", viewportWidth: 1300 }).session.temporary).toBeNull();
  });

  it("N05 pin rearranges space and unpin restores the base rail with a temporary instance", () => {
    let state = step(initial(), { type: "SET_MODE", regionId: "global", mode: "compact" });
    state = step(state, { type: "PEEK_REGION", regionId: "global", viewportWidth: 1600 });
    state = step(state, { type: "PIN_TEMP", regionId: "global", viewportWidth: 1600 });
    expect(state.preferences.global!.mode).toBe("expanded");
    expect(state.session.temporary).toBeNull();
    state = step(state, { type: "UNPIN", regionId: "global", viewportWidth: 1600 });
    expect(state.preferences.global!.mode).toBe("compact");
    expect(state.session.temporary).toMatchObject({ baseMode: "compact", reservedWidth: 56 });
    state = step(state, { type: "DISMISS_TEMP", reason: "outside" });
    expect(state.session.temporary).toBeNull();
    expect(state.session.hoverSuppressedRegionId).toBeNull();
  });

  it("N06 Escape prevents immediate hover rebound until the pointer leaves", () => {
    let state = hide(initial(), "global");
    state = step(state, { type: "PEEK_REGION", regionId: "global", source: "hover", viewportWidth: 1600 });
    state = step(state, { type: "DISMISS_TEMP", reason: "escape" });
    state = step(state, { type: "PEEK_REGION", regionId: "global", source: "hover", viewportWidth: 1600 });
    expect(state.session.temporary).toBeNull();
    state = step(state, { type: "CLEAR_HOVER_SUPPRESSION", regionId: "global" });
    state = step(state, { type: "PEEK_REGION", regionId: "global", source: "hover", viewportWidth: 1600 });
    expect(state.session.temporary?.regionId).toBe("global");
  });

  it("N08 focus snapshots once, keeps prior hidden regions/widths and discards all temporary overrides", () => {
    let state = hide(initial(), "directory");
    state = step(state, { type: "RESIZE_REGION", regionId: "inspector", width: 330, viewportWidth: 1600 });
    const before = structuredClone(state.preferences);
    state = step(state, { type: "ENTER_FOCUS" });
    expect(Object.values(resolveWorkspace(spec, state, 1600).regions).every(region => region.mode === "hidden")).toBe(true);
    state = step(state, { type: "SHOW_REGION", regionId: "inspector", viewportWidth: 1600 });
    state = step(state, { type: "RESIZE_REGION", regionId: "inspector", width: 390, viewportWidth: 1600 });
    state = step(state, { type: "ENTER_FOCUS" });
    expect(state.session.focusBefore).toEqual(before);
    expect(state.preferences).toEqual(before);
    state = step(state, { type: "PEEK_REGION", regionId: "directory", viewportWidth: 1600 });
    state = step(state, { type: "EXIT_FOCUS" });
    expect(state.preferences).toEqual(before);
    expect(state.session).toMatchObject({ focused: false, focusBefore: null, temporary: null, ribbonTemporary: null, focusOverrides: {} });
  });

  it("N07/N09/N10 switching contexts clears session while loading isolated preferences", () => {
    let state = step(initial(), { type: "ENTER_FOCUS" });
    state = step(state, { type: "RECORD_SCROLL", regionId: "directory", scrollTop: 180 });
    const nextSpec = { ...spec, workspaceKey: "mock/course/S6/first" };
    const next = step(state, { type: "SWITCH_CONTEXT", spec: nextSpec, preferences: { directory: { mode: "hidden", expandedWidth: 320 } } });
    expect(next.workspaceKey).toBe(nextSpec.workspaceKey);
    expect(next.preferences.directory).toEqual({ mode: "hidden", expandedWidth: 320 });
    expect(next.session).toMatchObject({ focused: false, focusBefore: null, temporary: null, scrollPositions: {}, hoverSuppressedRegionId: null });
    expect(() => resolveWorkspace(spec, next, 1600)).toThrow(/workspace/i);
  });

  it("N24 pointer and keyboard resize clamp to recipe and main budget without accidental hide", () => {
    let state = initial();
    state = step(state, { type: "RESIZE_REGION", regionId: "inspector", width: 1000, viewportWidth: 1400 });
    expect(state.preferences.inspector!.expandedWidth).toBe(313);
    state = step(state, { type: "RESIZE_REGION_KEY", regionId: "inspector", key: "ArrowLeft", viewportWidth: 1600 });
    expect(state.preferences.inspector!.expandedWidth).toBe(303);
    state = step(state, { type: "RESIZE_REGION_KEY", regionId: "inspector", key: "ArrowRight", shiftKey: true, viewportWidth: 1600 });
    expect(state.preferences.inspector!.expandedWidth).toBe(335);
    state = step(state, { type: "RESIZE_REGION_KEY", regionId: "inspector", key: "Home", viewportWidth: 1600 });
    expect(state.preferences.inspector!.expandedWidth).toBe(220);
    state = step(state, { type: "RESIZE_REGION_KEY", regionId: "inspector", key: "End", viewportWidth: 1600 });
    expect(state.preferences.inspector!.expandedWidth).toBe(420);
    expect(state.preferences.inspector!.mode).toBe("expanded");
    state = step(state, { type: "RESIZE_REGION_KEY", regionId: "inspector", key: "Enter", viewportWidth: 1600 });
    expect(state.preferences.inspector).toEqual({ mode: "hidden", expandedWidth: 420 });
    expect(() => step(state, { type: "SET_MODE", regionId: "directory", mode: "compact" })).toThrow(/mode/i);
  });

  it("N25 ribbon modes reuse preferences and temporary tools preserve their permanent mode", () => {
    let state = step(initial(), { type: "SET_RIBBON", regionId: "ribbon", mode: "tabs" });
    const before = resolveWorkspace(spec, state, 1600);
    state = step(state, { type: "OPEN_RIBBON_TEMP", regionId: "ribbon" });
    expect(state.preferences.ribbon!.mode).toBe("tabs");
    expect(state.session.ribbonTemporary).toBe("ribbon");
    expect(resolveWorkspace(spec, state, 1600)).toEqual(before);
    state = step(hide(state, "directory"), { type: "PEEK_REGION", regionId: "directory", viewportWidth: 1600 });
    expect(state.session.ribbonTemporary).toBeNull();
    state = step(state, { type: "OPEN_RIBBON_TEMP", regionId: "ribbon" });
    expect(state.session.temporary).toBeNull();
    state = step(state, { type: "DISMISS_TEMP", reason: "escape" });
    expect(state.session.ribbonTemporary).toBeNull();
    expect(state.preferences.ribbon!.mode).toBe("tabs");
  });

  it("N11 scroll survives hide/show inside a session without entering preferences", () => {
    let state = step(initial(), { type: "RECORD_SCROLL", regionId: "directory", scrollTop: 192 });
    state = hide(state, "directory");
    state = step(state, { type: "SHOW_REGION", regionId: "directory", viewportWidth: 1600 });
    expect(state.session.scrollPositions.directory).toBe(192);
    expect(state.preferences.directory).toEqual({ mode: "expanded", expandedWidth: 260 });
  });

  it("clamps finite negative resize attempts at minWidth and leaves focus ribbon temporary", () => {
    let state = step(initial(), { type: "RESIZE_REGION", regionId: "inspector", width: -100, viewportWidth: 1600 });
    expect(state.preferences.inspector!.expandedWidth).toBe(220);
    state = step(state, { type: "ENTER_FOCUS" });
    state = step(state, { type: "OPEN_RIBBON_TEMP", regionId: "ribbon" });
    expect(state.session.ribbonTemporary).toBe("ribbon");
    expect(state.preferences.ribbon!.mode).toBe("full");
    expect(resolveWorkspace(spec, state, 1600).regions.ribbon!.mode).toBe("hidden");
  });

  it("uses only own stable ID records even when an ID matches Object.prototype", () => {
    const namedSpec = { ...spec, regions: [{ ...spec.regions[1]!, id: "toString" }] };
    let state = createWorkspaceState(namedSpec);
    state = workspaceReducer(namedSpec, state, { type: "SHOW_REGION", regionId: "toString", viewportWidth: 1600 });
    expect(state.preferences.toString).toEqual({ mode: "expanded", expandedWidth: 260 });
    state = workspaceReducer(namedSpec, state, { type: "UNPIN", regionId: "toString", viewportWidth: 1600 });
    expect(state.preferences.toString).toEqual({ mode: "hidden", expandedWidth: 260 });
  });

  it("focus pin overrides do not replace the original session pin base", () => {
    let state = step(initial(), { type: "SET_MODE", regionId: "global", mode: "compact" });
    state = step(state, { type: "PEEK_REGION", regionId: "global", viewportWidth: 1600 });
    state = step(state, { type: "PIN_TEMP", regionId: "global", viewportWidth: 1600 });
    state = step(state, { type: "ENTER_FOCUS" });
    state = step(state, { type: "PEEK_REGION", regionId: "global", viewportWidth: 1600 });
    state = step(state, { type: "PIN_TEMP", regionId: "global", viewportWidth: 1600 });
    state = step(state, { type: "EXIT_FOCUS" });
    state = step(state, { type: "UNPIN", regionId: "global", viewportWidth: 1600 });
    expect(state.preferences.global!.mode).toBe("compact");
  });

  it("does not count the saved expanded width as occupied space when resizing hidden/compact regions", () => {
    const hiddenSpec = { ...spec, regions: [{ ...spec.regions[2]!, minWidth: 180, defaultMode: "hidden" as const }] };
    const hidden = workspaceReducer(hiddenSpec, createWorkspaceState(hiddenSpec), { type: "RESIZE_REGION_KEY", regionId: "inspector", key: "End", viewportWidth: 800 });
    expect(hidden.preferences.inspector!.expandedWidth).toBe(203);
    const compactSpec = { ...spec, regions: [{ ...spec.regions[0]!, defaultMode: "compact" as const }] };
    const compact = workspaceReducer(compactSpec, createWorkspaceState(compactSpec), { type: "RESIZE_REGION_KEY", regionId: "global", key: "End", viewportWidth: 850 });
    expect(compact.preferences.global!.expandedWidth).toBe(253);
  });
});

describe("versioned preferences adapter", () => {
  function memoryStorage(): WorkspaceStorage & { values: Map<string, string> } {
    const values = new Map<string, string>();
    return { values, getItem: key => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); } };
  }

  it("N30 persists only whitelisted mode/expandedWidth and discards unknown regions/business fields", () => {
    const storage = memoryStorage();
    const preferences = { ...initial().preferences, directory: { mode: "hidden" as const, expandedWidth: 310, comment: "private draft" }, unknown: { mode: "expanded" as const, expandedWidth: 222 } };
    expect(saveWorkspacePreferences(storage, "prefs", spec, preferences)).toBe(true);
    const payload = storage.values.get("prefs")!;
    expect(payload).not.toMatch(/private draft|comment|unknown|session|focused|scroll/);
    expect(JSON.parse(payload)).toMatchObject({ version: 2, regions: { directory: { mode: "hidden", expandedWidth: 310 } } });
    expect(loadWorkspacePreferences(storage, "prefs", spec).directory).toEqual({ mode: "hidden", expandedWidth: 310 });
  });

  it("N30 corrupted payload, storage refusal and SSR safely fall back to defaults", () => {
    const defaults = initial().preferences, storage = memoryStorage();
    for (const payload of ["{", "null", "[]", '{"version":99,"regions":{}}', '{"version":2,"regions":{"global":{"mode":"wat","expandedWidth":90}}}']) {
      storage.values.set("prefs", payload);
      expect(loadWorkspacePreferences(storage, "prefs", spec)).toEqual(defaults);
    }
    const denied: WorkspaceStorage = { getItem() { throw new Error("denied"); }, setItem() { throw new Error("denied"); } };
    expect(loadWorkspacePreferences(denied, "prefs", spec)).toEqual(defaults);
    expect(saveWorkspacePreferences(denied, "prefs", spec, defaults)).toBe(false);
    expect(loadWorkspacePreferences(undefined, "prefs", spec)).toEqual(defaults);
    expect(saveWorkspacePreferences(undefined, "prefs", spec, defaults)).toBe(false);
  });

  it("N30 migrates only explicit v1 width fields and clamps known region widths", () => {
    const storage = memoryStorage();
    storage.values.set("prefs", JSON.stringify({ version: 1, regions: { directory: { mode: "hidden", width: 900 }, global: { mode: "compact", width: 100 }, removed: { mode: "expanded", width: 222 } }, draft: "do not load" }));
    const result = loadWorkspacePreferences(storage, "prefs", spec);
    expect(result.directory).toEqual({ mode: "hidden", expandedWidth: 380 });
    expect(result.global).toEqual({ mode: "compact", expandedWidth: 180 });
    expect(Object.keys(result)).toEqual(spec.regions.map(region => region.id));
    expect(result).not.toHaveProperty("draft");
  });
});
