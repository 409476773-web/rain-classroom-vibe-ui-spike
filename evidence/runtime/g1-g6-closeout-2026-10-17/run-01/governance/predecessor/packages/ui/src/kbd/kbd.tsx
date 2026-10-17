import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { rainCn } from "../utils/rain-class-names";

export interface KbdProps extends HTMLAttributes<HTMLDivElement> { keys: readonly ReactNode[]; separator?: ReactNode; }
export const Kbd = forwardRef<HTMLDivElement, KbdProps>(function Kbd({ keys, separator = "", className, ...props }, ref) {
  return <div {...props} ref={ref} role="group" data-rain-id="ui-kbd" data-slot="root" className={rainCn("inline-flex items-center gap-rain-2 text-rain-size-12 leading-rain-18 text-rain-category-text-neutral-3", className)}>
      {keys.map((key, index) => <span key={index} className="inline-flex items-center gap-rain-2">{index ? <span aria-hidden="true">{separator}</span> : null}<kbd data-key={typeof key === "string" ? key : undefined} className="inline-flex min-h-rain-20 min-w-rain-20 items-center justify-center rounded-rain-4 border-solid border-rain-line-1 border-rain-category-border-neutral-3 bg-rain-category-background-neutral-2 px-rain-4 font-rain-ui text-rain-size-12 leading-rain-18">{key}</kbd></span>)}
  </div>;
});
