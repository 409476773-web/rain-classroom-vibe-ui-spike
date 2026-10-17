import { forwardRef } from "react";
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { rainCn } from "../utils/rain-class-names";

export type ScrollAreaRootProps = Omit<BaseScrollArea.Root.Props, "className"> & { className?: string };
export type ScrollAreaViewportProps = Omit<BaseScrollArea.Viewport.Props, "className"> & { className?: string };
export type ScrollAreaScrollbarProps = Omit<BaseScrollArea.Scrollbar.Props, "className"> & { className?: string };
export type ScrollAreaContentProps = Omit<BaseScrollArea.Content.Props, "className"> & { className?: string };
export type ScrollAreaThumbProps = Omit<BaseScrollArea.Thumb.Props, "className"> & { className?: string };

const Root = forwardRef<HTMLDivElement, ScrollAreaRootProps>(function Root({ className, ...props }, ref) {
  return <BaseScrollArea.Root {...props} ref={ref} data-rain-id="ui-scroll-area" data-slot="root"
    className={rainCn("rain-scroll-area relative min-h-0 min-w-0", className)} />;
});

const Viewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>(function Viewport({ className, tabIndex, ...props }, ref) {
  return <BaseScrollArea.Viewport {...props} ref={ref} tabIndex={tabIndex ?? 0} data-slot="viewport"
    className={rainCn("rain-scroll-area-viewport min-h-0 min-w-0 outline-none focus-visible:outline-rain-focus focus-visible:outline-offset-rain-focus", className)} />;
});

const Content = forwardRef<HTMLDivElement, ScrollAreaContentProps>(function Content({ className, ...props }, ref) {
  return <BaseScrollArea.Content {...props} ref={ref} data-slot="content" className={rainCn("min-w-full", className)} />;
});

const Scrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(function Scrollbar({ className, orientation = "vertical", ...props }, ref) {
  return <BaseScrollArea.Scrollbar {...props} ref={ref} orientation={orientation} data-slot="scrollbar"
    className={rainCn("rain-scroll-area-scrollbar flex touch-none select-none p-rain-1 transition-colors", orientation === "vertical" ? "h-full w-rain-8 border-l border-transparent" : "h-rain-8 w-full border-t border-transparent", className)} />;
});

const Thumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>(function Thumb({ className, ...props }, ref) {
  return <BaseScrollArea.Thumb {...props} ref={ref} data-slot="thumb" className={rainCn("rounded-rain-full bg-rain-category-fill-neutral-alpha-4", className)} />;
});

const Corner = forwardRef<HTMLDivElement, Omit<BaseScrollArea.Corner.Props, "className"> & { className?: string }>(function Corner({ className, ...props }, ref) {
  return <BaseScrollArea.Corner {...props} ref={ref} data-slot="corner" className={rainCn("bg-transparent", className)} />;
});

export const ScrollArea = { Root, Viewport, Content, Scrollbar, Thumb, Corner };
