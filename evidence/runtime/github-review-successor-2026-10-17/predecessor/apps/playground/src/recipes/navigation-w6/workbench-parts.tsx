import { type ReactNode } from 'react';
import { Button } from '@rain-next/ui';
import { RegionRestoreTrigger, createWorkspaceKey, useWorkspaceLayout, type WorkspaceRegionSpec, type WorkspaceSpec } from '@rain-next/layouts';

export type WidthProps = { viewportWidth?: number; active?: boolean };
export function sideRegion(id: string, label: string, side: 'start' | 'end', defaultWidth = 250, defaultMode: 'expanded' | 'hidden' = 'expanded', constant = false): WorkspaceRegionSpec {
  return { id, label, side, allowedModes: constant ? ['expanded'] : ['expanded', 'hidden'], minWidth: 200, defaultWidth, maxWidth: 380, boundaryWidth: 5, adaptationPriority: side === 'end' ? 2 : 1, restoreOwnerId: 'external-toolbar', defaultMode };
}
export function workspaceSpec(scene: string, instanceId: string, regions: readonly WorkspaceRegionSpec[], minMainWidth = 360): WorkspaceSpec {
  return { workspaceKey: createWorkspaceKey({ userScope: 'w6-local-mock', workspaceId: 'new-independent-consumer', subsceneId: scene, instanceId }), regions, stableRestoreOwnerIds: ['external-toolbar'], minMainWidth };
}
export function FocusAction() {
  const { state, dispatch } = useWorkspaceLayout();
  return <Button variant="tertiary" size="small" onClick={() => dispatch({ type: state.session.focused ? 'EXIT_FOCUS' : 'ENTER_FOCUS' })}>{state.session.focused ? '退出专注' : '进入专注'}</Button>;
}
export function Toolbar({ title, regions, children }: { title: string; regions: readonly string[]; children?: ReactNode }) {
  return <header className="w6-workspace-toolbar"><strong>{title}</strong><div className="w6-actions">{regions.map(regionId => <RegionRestoreTrigger key={regionId} regionId={regionId} />)}{children}<FocusAction /></div></header>;
}

