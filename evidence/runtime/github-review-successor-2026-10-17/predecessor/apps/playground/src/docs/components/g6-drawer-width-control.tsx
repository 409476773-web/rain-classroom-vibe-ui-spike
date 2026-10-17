// Page-private local-experiment. Rain Resizable owns pointer, keyboard and resize behavior.
// The transparent panels associate that separator with the actual list and Drawer popup;
// they do not provide a second layout or duplicate those regions' contents.
import { useCallback, useId, useImperativeHandle, useRef, useState, type Ref } from "react";
import {
  DrawerPortal, ResizableHandle, ResizablePanel, ResizablePanelGroup,
  type ResizableGroupHandle,
} from "@rain-next/ui";
import "./g6-drawer-width-control.css";

export interface DrawerWidthControlHandle {
  setWidth: (width: number) => void;
}

interface DrawerWidthControlProps {
  open: boolean;
  width: number;
  maxWidth: number;
  onWidthChange: (width: number) => void;
  listId: string;
  popupId: string;
  controlRef: Ref<DrawerWidthControlHandle>;
}

export function DrawerWidthControl({ open, ...props }: DrawerWidthControlProps) {
  return open ? <DrawerWidthControlPanels {...props} /> : null;
}

function DrawerWidthControlPanels({
  width, maxWidth, onWidthChange, listId, popupId, controlRef,
}: Omit<DrawerWidthControlProps, "open">) {
  const id = useId(), listPanelId = `${id}-list-space`, detailPanelId = `${id}-detail-space`;
  const group = useRef<ResizableGroupHandle>(null);
  const listPanel = useRef<HTMLDivElement>(null), detailPanel = useRef<HTMLDivElement>(null);
  // defaultSize remains fixed for this mount. Feeding each onResize value back into
  // defaultSize would re-register the Panel and interrupt an active pointer drag.
  const [initialWidth] = useState(width);

  const setWidth = useCallback((requestedWidth: number) => {
    const availableWidth = (listPanel.current?.offsetWidth ?? 0) + (detailPanel.current?.offsetWidth ?? 0);
    if (!group.current || availableWidth <= 0 || !Number.isFinite(requestedWidth)) return;
    const maximum = Math.min(availableWidth, maxWidth), minimum = Math.min(360, maximum);
    const percentage = Math.max(minimum, Math.min(maximum, requestedWidth)) / availableWidth * 100;
    group.current.setLayout({ [listPanelId]: 100 - percentage, [detailPanelId]: percentage });
  }, [listPanelId, detailPanelId, maxWidth]);

  useImperativeHandle(controlRef, () => ({ setWidth }), [setWidth]);

  const handleResize = useCallback(({ inPixels }: { inPixels: number }) => {
    // ResizeObserver is the engine's source for actual pixel width, including
    // programmatic setLayout, keyboard input and viewport constraint changes.
    if (inPixels > 0 && Number.isFinite(inPixels)) onWidthChange(inPixels);
  }, [onWidthChange]);

  return <DrawerPortal>
    <ResizablePanelGroup groupRef={group} orientation="horizontal" className="g6-drawer-width-control"
      data-rain-id="prototype-drawer-width-control" data-asset-identity="local-experiment"
      resizeTargetMinimumSize={{ fine: 12, coarse: 24 }} disableCursor>
      <ResizablePanel id={listPanelId} elementRef={listPanel} minSize={0}
        role="region" aria-label="课程任务列表" aria-owns={listId} />
      <ResizableHandle withHandle className="g6-drawer-width-control-handle" aria-label="调整任务详情宽度"
        aria-describedby={`${id}-resize-help`} />
      <ResizablePanel id={detailPanelId} elementRef={detailPanel} defaultSize={initialWidth} minSize={360} maxSize={maxWidth}
        groupResizeBehavior="preserve-pixel-size" onResize={handleResize}
        role="region" aria-label="任务详情" aria-owns={popupId} />
    </ResizablePanelGroup>
    <span id={`${id}-resize-help`} className="g6-drawer-width-control-help">
      使用左右方向键调整宽度，Home 和 End 调整到宽度边界。
    </span>
  </DrawerPortal>;
}
