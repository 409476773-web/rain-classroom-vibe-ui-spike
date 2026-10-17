// Adapted from shadcn-ui/ui@3ba91b1 Base UI Message Scroller and Nova; MIT.
import * as React from "react";
import { MessageScroller as Primitive, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility } from "@shadcn/react/message-scroller";
import { useDensity } from "@rain-next/foundations";
import type { ButtonProps } from "../button/button";
import { buttonRootRecipe } from "../button/button.styles";
import { ArrowDownIcon } from "../icons/arrow-down";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import "./message-scroller.css";

export { useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility };
export type { MessageScrollerDefaultScrollPosition, MessageScrollerScrollAlign, MessageScrollerScrollOptions, MessageScrollerScrollable, MessageScrollerVisibilityState } from "@shadcn/react/message-scroller";
export type MessageScrollerPart = "root" | "viewport" | "content" | "item" | "button";
export type MessageScrollerRecipe = RainLocalRecipe<MessageScrollerPart, "ui-message-scroller">;
const RecipeContext = React.createContext<MessageScrollerRecipe | undefined>(undefined);
function usePartRecipe(recipe: MessageScrollerRecipe | undefined, part: MessageScrollerPart) {
  const inherited = React.useContext(RecipeContext);
  return getRainLocalRecipePart(recipe ?? inherited, part);
}
export type MessageScrollerProviderProps = React.ComponentProps<typeof Primitive.Provider>;
export function MessageScrollerProvider(props: MessageScrollerProviderProps) { return <Primitive.Provider {...props} />; }
export type MessageScrollerProps = React.ComponentProps<typeof Primitive.Root> & { localRecipe?: MessageScrollerRecipe };
export function MessageScroller({ className, localRecipe, ...props }: MessageScrollerProps) {
  const density = useDensity();
  return <RecipeContext.Provider value={localRecipe}><Primitive.Root {...props} data-rain-id="ui-message-scroller" data-slot="root" data-density={density}
    data-local-recipe={localRecipe?.id} className={rainCn("rain-message-scroller relative flex size-full min-h-0 flex-col overflow-hidden", getRainLocalRecipePart(localRecipe, "root"), className)} /></RecipeContext.Provider>;
}
export type MessageScrollerViewportProps = React.ComponentProps<typeof Primitive.Viewport> & { localRecipe?: MessageScrollerRecipe };
export function MessageScrollerViewport({ className, localRecipe, "aria-label": label = "会话消息", ...props }: MessageScrollerViewportProps) {
  const recipeClass = usePartRecipe(localRecipe, "viewport");
  return <Primitive.Viewport {...props} aria-label={label} data-slot="viewport"
    className={rainCn("rain-message-scroller__viewport size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain", recipeClass, className)} />;
}
export type MessageScrollerContentProps = React.ComponentProps<typeof Primitive.Content> & { localRecipe?: MessageScrollerRecipe };
export function MessageScrollerContent({ className, localRecipe, ...props }: MessageScrollerContentProps) {
  const recipeClass = usePartRecipe(localRecipe, "content");
  return <Primitive.Content {...props} data-slot="content" className={rainCn("rain-message-scroller__content flex h-max min-h-full flex-col", recipeClass, className)} />;
}
export type MessageScrollerItemProps = React.ComponentProps<typeof Primitive.Item> & { localRecipe?: MessageScrollerRecipe };
export function MessageScrollerItem({ className, localRecipe, scrollAnchor = false, ...props }: MessageScrollerItemProps) {
  const recipeClass = usePartRecipe(localRecipe, "item");
  return <Primitive.Item {...props} scrollAnchor={scrollAnchor} data-slot="item" className={rainCn("rain-message-scroller__item min-w-0 shrink-0", recipeClass, className)} />;
}
type ButtonAppearance = Pick<Extract<ButtonProps, { variant: "text" }>, "variant" | "size"> | Pick<Exclude<ButtonProps, { variant: "text" }>, "variant" | "size">;
function ScrollerButtonSurface({ variant = "secondary", size, className, ...props }: React.ComponentProps<"button"> & ButtonAppearance) {
  const density = useDensity();
  const resolvedSize = size ?? (variant === "text" ? density === "compact" ? "compact" : "regular" : "small");
  const unavailable = props.disabled || props["aria-disabled"] === true || props["aria-disabled"] === "true";
  return <button {...props} data-focus="control" data-density={density} data-size={resolvedSize} className={rainCn(buttonRootRecipe({ block: false, variant, size: resolvedSize, tone: "default", state: unavailable ? "disabled" : "default" }), "min-w-rain-32 w-rain-32 px-rain-0 rounded-rain-full bg-rain-category-background-neutral-1 text-rain-category-text-neutral-1 border-rain-category-border-neutral-3 hover:bg-rain-category-fill-neutral-solid-4 hover:text-rain-category-text-neutral-1", className)} />;
}
export type MessageScrollerButtonProps = React.ComponentProps<typeof Primitive.Button> & ButtonAppearance & { localRecipe?: MessageScrollerRecipe };
export function MessageScrollerButton(allProps: MessageScrollerButtonProps) {
  const { direction = "end", behavior = "smooth", variant, size: _size, children, className, render, localRecipe, onClick, ...props } = allProps;
  const recipeClass = usePartRecipe(localRecipe, "button");
  const commands = useMessageScroller();
  const defaultRender = allProps.variant === "text" ? <ScrollerButtonSurface variant="text" size={allProps.size} /> : <ScrollerButtonSurface variant={allProps.variant} size={allProps.size} />;
  return <Primitive.Button {...props} direction={direction} behavior={behavior} data-slot="button" data-direction={direction} data-variant={variant ?? "secondary"}
    className={rainCn("rain-message-scroller__button absolute", recipeClass, className)} render={render ?? defaultRender}
    onClick={event => {
      if (props["aria-disabled"] === true || props["aria-disabled"] === "true") { event.preventDefault(); return; }
      onClick?.(event);
      if (!event.defaultPrevented && behavior === "smooth" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        event.preventDefault();
        event.currentTarget.blur();
        if (direction === "end") commands.scrollToEnd({ behavior: "auto" });
        else commands.scrollToStart({ behavior: "auto" });
      }
    }}>
    {children ?? <><ArrowDownIcon aria-hidden="true" /><span className="sr-only">{direction === "end" ? "滚动到最新" : "滚动到开头"}</span></>}
  </Primitive.Button>;
}
