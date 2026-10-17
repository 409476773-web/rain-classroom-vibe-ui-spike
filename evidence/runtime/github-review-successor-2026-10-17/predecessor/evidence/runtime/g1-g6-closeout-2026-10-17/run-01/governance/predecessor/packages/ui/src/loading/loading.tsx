// Adapted from pinned shadcn Spinner and Skeleton (MIT). IconPlaceholder becomes the existing Rain loading asset.
import type { ComponentProps } from "react";
import { rainCn as cn } from "../utils/rain-class-names";
import { ButtonLoadingIcon } from "../icons/button-loading";
import "./loading.css";

export type SpinnerProps = ComponentProps<"span">;
export type SkeletonProps = ComponentProps<"div">;

function Spinner({ className, ...props }: SpinnerProps) {
  return <span data-rain-id="ui-spinner" data-slot="spinner" role="status" aria-label="正在加载"
    className={cn("rain-g2-spinner inline-flex shrink-0", className)} {...props}><ButtonLoadingIcon /></span>;
}

function Skeleton({ className, ...props }: SkeletonProps) {
  return <div {...props} data-rain-id="ui-skeleton" data-slot="skeleton" aria-hidden="true" className={cn("rain-g2-skeleton", className)} />;
}

export { Spinner, Skeleton };
