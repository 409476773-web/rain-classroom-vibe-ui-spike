import { forwardRef, type HTMLAttributes, type LiHTMLAttributes, type ReactNode } from "react";
import { rainCn } from "../utils/rain-class-names";

export type BreadcrumbProps = HTMLAttributes<HTMLElement>;

const Root = forwardRef<HTMLElement, BreadcrumbProps>(function Root({ className, "aria-label": ariaLabel = "面包屑", ...props }, ref) {
  return <nav {...props} ref={ref} aria-label={ariaLabel} data-rain-id="ui-breadcrumb" data-slot="root"
    className={rainCn("rain-breadcrumb text-rain-size-14 leading-rain-24 text-rain-category-text-neutral-3", className)} />;
});

const List = forwardRef<HTMLOListElement, Omit<HTMLAttributes<HTMLOListElement>, "className"> & { className?: string }>(function List({ className, ...props }, ref) {
  return <ol {...props} ref={ref} data-slot="list" className={rainCn("flex min-w-0 flex-wrap items-center gap-rain-6 p-rain-0 m-rain-0 list-none", className)} />;
});

const Item = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(function Item({ className, ...props }, ref) {
  return <li {...props} ref={ref} data-slot="item" className={rainCn("inline-flex min-w-0 items-center gap-rain-6", className)} />;
});

const Link = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(function Link({ className, ...props }, ref) {
  return <a {...props} ref={ref} data-slot="link" className={rainCn("truncate text-rain-category-text-brand-1 underline-offset-2 outline-none hover:underline focus-visible:outline-rain-focus focus-visible:outline-offset-rain-focus", className)} />;
});

const Page = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function Page({ className, ...props }, ref) {
  return <span {...props} ref={ref} data-slot="page" aria-current="page" className={rainCn("truncate font-rain-semibold text-rain-category-text-neutral-1", className)} />;
});

const Separator = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function Separator({ children = "/", className, ...props }, ref) {
  return <span {...props} ref={ref} data-slot="separator" aria-hidden="true" className={rainCn("shrink-0 text-rain-category-text-neutral-4", className)}>{children}</span>;
});

const Ellipsis = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(function Ellipsis({ children = "…", className, ...props }, ref) {
  return <span {...props} ref={ref} data-slot="ellipsis" aria-hidden="true" className={rainCn("inline-flex size-rain-24 items-center justify-center", className)}>{children}</span>;
});

const Back = forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { icon?: ReactNode }>(function Back({ icon, className, children, ...props }, ref) {
  return <Link {...props} ref={ref} className={className}>{icon}{children}</Link>;
});

export const Breadcrumb = Object.assign(Root, { List, Item, Link, Page, Separator, Ellipsis, Back });
