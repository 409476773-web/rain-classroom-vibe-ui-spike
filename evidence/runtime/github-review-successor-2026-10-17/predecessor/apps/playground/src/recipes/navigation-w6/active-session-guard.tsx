import { useLayoutEffect } from 'react';
import { useWorkspaceLayout } from '@rain-next/layouts';

/** Local host lifecycle: keep business state mounted, end non-active layout sessions. */
export function ActiveSessionGuard({ active }: { active: boolean }) {
  const { state, dispatch } = useWorkspaceLayout();
  const { temporary, ribbonTemporary, focused } = state.session;
  useLayoutEffect(() => {
    if (active) return;
    // Leaving a scene must not restore focus into its hidden toolbar.
    if (temporary || ribbonTemporary) dispatch({ type: 'DISMISS_TEMP', reason: 'outside' });
    if (focused) dispatch({ type: 'EXIT_FOCUS' });
  }, [active, temporary, ribbonTemporary, focused, dispatch]);
  return null;
}
