// Adapted from shadcn-ui/ui@3ba91b1, MIT; local-experiment.
// Pristine author source and Nova styles: evidence/runtime/token-first-v12-g1-next/source-lock.json.
import { rainCn as cn } from "@rain-next/ui";
import * as ResizablePrimitive from "react-resizable-panels";
import "./next.css";

function ResizablePanelGroup({ className, ...props }: ResizablePrimitive.GroupProps) {
  return <ResizablePrimitive.Group data-rain-id="local-g1-resizable" data-slot="resizable-panel-group"
    className={cn("rain-g1-resizable flex w-full", className)} {...props} />;
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

function ResizableHandle({ withHandle, className, ...props }: ResizablePrimitive.SeparatorProps & { withHandle?: boolean }) {
  return <ResizablePrimitive.Separator data-slot="resizable-handle" data-focus="control"
    className={cn("rain-g1-resizable-handle relative flex items-center justify-center", className)} {...props}>
    {withHandle && <div className="rain-g1-resizable-grip" aria-hidden="true" />}
  </ResizablePrimitive.Separator>;
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
