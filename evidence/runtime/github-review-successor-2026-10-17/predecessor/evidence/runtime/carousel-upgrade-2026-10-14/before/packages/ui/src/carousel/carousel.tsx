// Adapted from shadcn-ui/ui@3ba91b1 Base UI Carousel; MIT/source lock: evidence/runtime/g6-preflight-2026-10-14.
import { createContext, useCallback, useContext, useEffect, useState, type ComponentProps, type KeyboardEvent, type MouseEvent, type ReactNode, type RefAttributes } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { useDirection } from "@base-ui/react/direction-provider";
import { ArrowLeftIcon } from "@rain-next/ui/icons/arrow-left";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { Button, type ButtonProps } from "../button/button";
import { IconButton } from "../icon-button/icon-button";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import "./carousel.css";

export type CarouselApi = UseEmblaCarouselType[1];
export type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
export type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];
export type CarouselProps = ComponentProps<"div"> & {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};
type CarouselContextProps = {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
  orientation: "horizontal" | "vertical";
  direction: "ltr" | "rtl";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};
const CarouselContext = createContext<CarouselContextProps | null>(null);
export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a Carousel.");
  return context;
}

export function Carousel({ orientation = "horizontal", opts, plugins, setApi, className, dir,
  onKeyDown, children, ...props }: CarouselProps) {
  const inheritedDirection = useDirection();
  const direction = opts?.direction ?? (dir === "rtl" || dir === "ltr" ? dir : inheritedDirection);
  const [carouselRef, api] = useEmblaCarousel({ ...opts, direction, axis: orientation === "horizontal" ? "x" : "y",
    breakpoints: { ...opts?.breakpoints, "(prefers-reduced-motion: reduce)": { ...opts?.breakpoints?.["(prefers-reduced-motion: reduce)"], duration: 0 } },
  }, plugins);
  const [canScrollPrev, setCanScrollPrev] = useState(false), [canScrollNext, setCanScrollNext] = useState(false);
  const onSelect = useCallback((current: CarouselApi) => {
    if (!current) return;
    setCanScrollPrev(current.canScrollPrev());
    setCanScrollNext(current.canScrollNext());
  }, []);
  const scrollPrev = useCallback(() => { api?.scrollPrev(); }, [api]);
  const scrollNext = useCallback(() => { api?.scrollNext(); }, [api]);
  useEffect(() => { if (api) setApi?.(api); }, [api, setApi]);
  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => { api.off("select", onSelect); api.off("reInit", onSelect); };
  }, [api, onSelect]);
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const target = event.target as HTMLElement;
    if (target !== event.currentTarget && !target.closest("[data-carousel-navigation]")) return;
    if (target.closest('[aria-disabled="true"], :disabled')) return;
    const previousKey = orientation === "vertical" ? "ArrowUp" : direction === "rtl" ? "ArrowRight" : "ArrowLeft";
    const nextKey = orientation === "vertical" ? "ArrowDown" : direction === "rtl" ? "ArrowLeft" : "ArrowRight";
    if (event.key === previousKey) { event.preventDefault(); scrollPrev(); }
    else if (event.key === nextKey) { event.preventDefault(); scrollNext(); }
  }
  return <CarouselContext.Provider value={{ carouselRef, api, opts, plugins, setApi, orientation, direction, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}>
    <div role="region" aria-roledescription="carousel" {...props} dir={direction} data-rain-id="ui-carousel" data-slot="carousel"
      data-orientation={orientation} className={rainCn("rain-carousel", className)} onKeyDown={handleKeyDown}>{children}</div>
  </CarouselContext.Provider>;
}

export type CarouselContentProps = ComponentProps<"div">;
export function CarouselContent({ className, ...props }: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel();
  return <div ref={carouselRef} data-slot="carousel-content" className="rain-carousel__viewport">
    <div {...props} data-orientation={orientation} className={rainCn("rain-carousel__content", className)} />
  </div>;
}
export type CarouselItemProps = ComponentProps<"div">;
export function CarouselItem({ className, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();
  return <div role="group" aria-roledescription="slide" {...props} data-slot="carousel-item" data-orientation={orientation}
    className={rainCn("rain-carousel__item", className)} />;
}

export type CarouselNavigationProps = (
  | Omit<Extract<ButtonProps, { variant: "text" }>, "children">
  | Omit<Exclude<ButtonProps, { variant: "text" }>, "children">
) & { children?: ReactNode } & RefAttributes<HTMLButtonElement>;
const navigationRecipe = defineRainLocalRecipe<"root", "ui-icon-button">({
  id: "carousel-navigation", scope: "feature", origin: "ui-icon-button", classes: { root: "rounded-rain-full" },
  modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
});

function Navigation({ previous, ...props }: CarouselNavigationProps & { previous: boolean }) {
  const { orientation, direction, canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarousel();
  const available = previous ? canScrollPrev : canScrollNext;
  const disabled = Boolean(props.disabled || !available);
  const blocked = disabled || props.loading || props["aria-disabled"] === true || props["aria-disabled"] === "true";
  const Icon = orientation === "vertical" ? previous ? ArrowUpIcon : ArrowDownIcon
    : previous === (direction === "ltr") ? ArrowLeftIcon : ArrowRightIcon;
  const defaultLabel = previous ? "上一项" : "下一项";
  const label = props["aria-label"] ?? (props.children == null ? defaultLabel : undefined);
  // House controls have a relative utility; merge source positioning at that same layer so it wins.
  const className = rainCn("absolute", "rain-carousel__navigation", previous ? "rain-carousel__previous" : "rain-carousel__next", props.className);
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    if (blocked) { event.preventDefault(); event.stopPropagation(); return; }
    props.onClick?.(event);
    if (!event.defaultPrevented) (previous ? scrollPrev : scrollNext)();
  }
  const shared = { disabled, onClick: handleClick, "aria-label": label, "data-carousel-navigation": previous ? "previous" : "next", "data-orientation": orientation, className };
  if (props.variant === "text") return <Button {...props} {...shared}>{props.children ?? <Icon size={16} />}</Button>;
  if (props.variant !== undefined || props.size !== undefined || props.children !== undefined || props.block !== undefined
    || props.leadingIcon !== undefined || props.trailingIcon !== undefined || props.loadingLabel !== undefined || props.localRecipe !== undefined || props.tone === "danger") {
    return <Button {...props} {...shared}>{props.children ?? <Icon size={16} />}</Button>;
  }
  const { variant: _variant, size: _size, children: _children, block: _block, leadingIcon: _leading, trailingIcon: _trailing,
    loadingLabel: _loadingLabel, localRecipe: _recipe, ...nativeProps } = props;
  return <IconButton {...nativeProps} {...shared} aria-label={props["aria-label"] ?? defaultLabel} tone="default" size="32/16" icon={<Icon />} highlight="surface" localRecipe={navigationRecipe} />;
}
export function CarouselPrevious(props: CarouselNavigationProps) { return <Navigation {...props} previous />; }
export function CarouselNext(props: CarouselNavigationProps) { return <Navigation {...props} previous={false} />; }
