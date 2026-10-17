// Adapted from shadcn-ui/ui@3ba91b1 Base UI AspectRatio; MIT/source lock: evidence/runtime/g6-preflight-2026-10-14.
import type { ComponentProps } from "react";
import { rainCn } from "../utils/rain-class-names";

export type AspectRatioProps = ComponentProps<"div"> & { ratio: number };

export function AspectRatio({ ratio, className, style, ...props }: AspectRatioProps) {
  if (!Number.isFinite(ratio) || ratio <= 0) throw new Error("AspectRatio ratio must be a finite positive number.");
  return <div {...props} data-rain-id="ui-aspect-ratio" data-slot="aspect-ratio"
    className={rainCn("relative", className)} style={{ ...style, aspectRatio: ratio }} />;
}
