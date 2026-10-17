export { Stack, Inline, Grid, Split, defineLayoutSpacing } from "./layout";
export type { LayoutSpacing } from "./layout";
export type { StackProps, InlineProps, GridProps, SplitRootProps, SplitPartProps, LayoutGap, LayoutAlign, LayoutJustify } from "./layout";

export { ConnectedSurface } from "./connected-surface";
export type { ConnectedSurfaceProps } from "./connected-surface";
export type { ConnectedSurfaceGeometry, ConnectedSurfaceConnection, ConnectedSurfaceMode } from "./connected-surface-geometry";

export { WorkspaceLayout, RecoverableRegion, RegionRestoreTrigger, PaneSplitter, useWorkspaceLayout } from "./workspace";
export type { WorkspaceLayoutProps, RecoverableRegionProps, RegionRestoreTriggerProps, PaneSplitterProps, WorkspaceController, RecoverableRegionRender } from "./workspace";
export { createWorkspaceKey, createWorkspaceState, validateWorkspaceSpec, resolveWorkspace, workspaceReducer, loadWorkspacePreferences, saveWorkspacePreferences, WORKSPACE_PREFERENCES_VERSION } from "./workspace-state";
export type { WorkspaceSpec, WorkspaceRegionSpec, WorkspaceState, WorkspacePreferences, WorkspaceRegionMode, RegionMode, RibbonMode, WorkspaceAction, WorkspaceStorage, ResolvedWorkspace, EffectiveRegion } from "./workspace-state";
