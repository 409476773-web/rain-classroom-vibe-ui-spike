import { createContext, forwardRef, useContext, type ComponentPropsWithoutRef, type HTMLAttributes } from "react";
import { rainCn } from "../utils/rain-class-names";
import { emptyIllustrations, type EmptyIllustration } from "./empty-illustrations";
import "./empty.css";

export type { EmptyIllustration } from "./empty-illustrations";
export type EmptyPresentation = "illustration" | "simple" | "text";
export interface EmptyProps extends ComponentPropsWithoutRef<"div"> {
  /** Presentation only; action control density still belongs to its host. */
  presentation?: EmptyPresentation;
  align?: "center" | "start";
}
const EmptyPresentationContext = createContext<EmptyPresentation>("illustration");
const emptyPaints = { title: "text-rain-category-text-neutral-3", description: "text-rain-category-text-neutral-3" };

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty({ className, children, presentation = "illustration", align = "center", ...props }, ref) {
  return <EmptyPresentationContext.Provider value={presentation}><div {...props} ref={ref} data-rain-id="ui-empty" data-slot="root"
    data-presentation={presentation} data-align={align}
    className={rainCn("rain-empty flex min-w-0 max-w-full flex-col items-center text-center font-rain-ui", align === "start" && "items-start text-start", className)}>
    {children === undefined ? <><EmptyMedia /><EmptyTitle>暂无内容</EmptyTitle></> : children}
  </div></EmptyPresentationContext.Provider>;
});

export interface EmptyMediaProps extends ComponentPropsWithoutRef<"div"> {
  illustration?: EmptyIllustration;
}
export const EmptyMedia = forwardRef<HTMLDivElement, EmptyMediaProps>(function EmptyMedia({ className, children, illustration, ...props }, ref) {
  const presentation = useContext(EmptyPresentationContext);
  if (presentation === "text") return null;
  const name = illustration ?? (presentation === "simple" ? "simple" : "empty-box");
  const images = emptyIllustrations[name];
  return <div {...props} ref={ref} data-slot="media" data-illustration={name} aria-hidden="true"
    className={rainCn("rain-empty__media max-w-full", className)}>
    {children === undefined ? <>
      <img className="rain-empty__image rain-empty__image--light" src={images.light} alt="" draggable={false} />
      <img className="rain-empty__image rain-empty__image--dark" src={images.dark} alt="" draggable={false} />
    </> : children}
  </div>;
});

export interface EmptyTitleProps extends HTMLAttributes<HTMLElement> {
  as?: "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}
export const EmptyTitle = forwardRef<HTMLElement, EmptyTitleProps>(function EmptyTitle({ as: Component = "h3", className, ...props }, ref) {
  return <Component {...props} ref={ref as never} data-slot="title"
    className={rainCn("rain-empty__title m-rain-0 min-w-0 max-w-full wrap-anywhere", emptyPaints.title,
      "text-rain-size-14 leading-rain-22 font-rain-regular", className)} />;
});

export const EmptyDescription = forwardRef<HTMLParagraphElement, ComponentPropsWithoutRef<"p">>(function EmptyDescription({ className, ...props }, ref) {
  return <p {...props} ref={ref} data-slot="description" className={rainCn("rain-empty__description m-rain-0 min-w-0 max-w-full text-rain-size-14 leading-rain-22 font-rain-regular wrap-anywhere", emptyPaints.description, className)} />;
});

export const EmptyActions = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(function EmptyActions({ className, ...props }, ref) {
  return <div {...props} ref={ref} data-slot="actions" className={rainCn("rain-empty__actions flex min-w-0 max-w-full flex-wrap items-center justify-center gap-rain-8", className)} />;
});
