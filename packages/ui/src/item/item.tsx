// Adapted from shadcn-ui/ui@3ba91b1 Base UI Item; MIT and source lock: evidence/runtime/g4-components-2026-10-11/upstream.
import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { useDensity } from "@rain-next/foundations";
import { Separator } from "../separator/separator";
import { rainCn } from "../utils/rain-class-names";
import "./item.css";

export const itemPaints = {
  root: "text-rain-category-text-neutral-2",
  outline: "border-rain-category-border-neutral-3 bg-rain-category-background-neutral-1",
  muted: "bg-rain-category-background-neutral-2",
  title: "text-rain-category-text-neutral-1",
  description: "text-rain-category-text-neutral-3",
  footer: "text-rain-category-text-neutral-3",
  mediaIcon: "border-rain-category-border-neutral-3 bg-rain-category-background-neutral-1 text-rain-category-icon-neutral-3",
} as const;

const itemVariants = cva(
  "rain-item flex w-full min-w-0 flex-wrap items-center rounded-rain-8 border-solid border-rain-line-1 border-transparent font-rain-ui text-rain-size-14 leading-rain-22 font-rain-regular transition-colors duration-rain-feedback outline-none",
  {
    variants: {
      variant: { default: "bg-transparent", outline: itemPaints.outline, muted: itemPaints.muted },
      size: {
        default: "gap-rain-16 p-rain-16",
        sm: "gap-rain-12 p-rain-12",
        xs: "gap-rain-8 p-rain-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ItemVariant = NonNullable<VariantProps<typeof itemVariants>["variant"]>;
export type ItemSize = NonNullable<VariantProps<typeof itemVariants>["size"]>;
export type ItemProps = useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>;

export function Item({ className, variant = "default", size, render, ...props }: ItemProps) {
  const density = useDensity();
  const resolvedSize = size ?? (density === "compact" ? "sm" : "default");
  return useRender({
    defaultTagName: "div",
    props: {
      ...mergeProps<"div">(
        { className: rainCn(itemVariants({ variant, size: resolvedSize }), itemPaints.root, className) },
        props,
      ),
      "data-rain-id": "ui-item",
    },
    render,
    state: { slot: "root", variant, size: resolvedSize, density },
  });
}

export type ItemGroupProps = React.ComponentProps<"div">;
export function ItemGroup({ className, ...props }: ItemGroupProps) {
  return <div {...props} role="list" data-rain-id="ui-item" data-slot="group"
    className={rainCn("rain-item__group flex w-full min-w-0 flex-col", className)} />;
}

export type ItemSeparatorProps = React.ComponentProps<typeof Separator>;
export function ItemSeparator({ className, decorative = true, ...props }: ItemSeparatorProps) {
  return <Separator orientation="horizontal" {...props} decorative={decorative}
    className={rainCn("rain-item__separator", className)} />;
}

const itemMediaVariants = cva("rain-item__media flex min-w-0 shrink-0 items-center justify-center", {
  variants: {
    variant: {
      default: "",
      icon: "size-rain-32 rounded-rain-6 border-solid border-rain-line-1",
      image: "size-rain-40 overflow-hidden rounded-rain-6",
    },
  },
  defaultVariants: { variant: "default" },
});

export type ItemMediaVariant = NonNullable<VariantProps<typeof itemMediaVariants>["variant"]>;
export type ItemMediaProps = React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>;
export function ItemMedia({ className, variant = "default", ...props }: ItemMediaProps) {
  return <div {...props} data-slot="media" data-variant={variant}
    className={rainCn(itemMediaVariants({ variant }), variant === "icon" && itemPaints.mediaIcon, className)} />;
}

export type ItemContentProps = React.ComponentProps<"div">;
export function ItemContent({ className, ...props }: ItemContentProps) {
  return <div {...props} data-slot="content"
    className={rainCn("rain-item__content flex min-w-0 flex-1 flex-col gap-rain-4", className)} />;
}

export type ItemTitleProps = React.ComponentProps<"div">;
export function ItemTitle({ className, ...props }: ItemTitleProps) {
  return <div {...props} data-slot="title"
    className={rainCn("rain-item__title min-w-0 wrap-anywhere font-rain-ui text-rain-size-14 leading-rain-22 font-rain-semibold", itemPaints.title, className)} />;
}

export type ItemDescriptionProps = React.ComponentProps<"p">;
export function ItemDescription({ className, ...props }: ItemDescriptionProps) {
  return <p {...props} data-slot="description"
    className={rainCn("rain-item__description m-rain-0 min-w-0 wrap-anywhere font-rain-ui text-rain-size-12 leading-rain-20 font-rain-regular", itemPaints.description, className)} />;
}

export type ItemActionsProps = React.ComponentProps<"div">;
export function ItemActions({ className, ...props }: ItemActionsProps) {
  return <div {...props} data-slot="actions"
    className={rainCn("rain-item__actions flex min-w-0 max-w-full flex-wrap items-center gap-rain-8", className)} />;
}

export type ItemHeaderProps = React.ComponentProps<"div">;
export function ItemHeader({ className, ...props }: ItemHeaderProps) {
  return <div {...props} data-slot="header"
    className={rainCn("rain-item__header flex min-w-0 basis-full flex-wrap items-center justify-between gap-rain-8", className)} />;
}

export type ItemFooterProps = React.ComponentProps<"div">;
export function ItemFooter({ className, ...props }: ItemFooterProps) {
  return <div {...props} data-slot="footer"
    className={rainCn("rain-item__footer flex min-w-0 basis-full flex-wrap items-center justify-between gap-rain-8 font-rain-ui text-rain-size-12 leading-rain-20 font-rain-regular", itemPaints.footer, className)} />;
}
