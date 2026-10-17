// Adapted from shadcn-ui/ui@3ba91b1 Base UI Carousel; MIT/source lock: evidence/runtime/g6-preflight-2026-10-14.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ComponentProps, type KeyboardEvent, type MouseEvent, type ReactNode, type RefAttributes } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { useDirection } from "@base-ui/react/direction-provider";
import { ArrowLeftIcon } from "@rain-next/ui/icons/arrow-left";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { PlayTriangleIcon } from "@rain-next/ui/icons/play-triangle";
import { PauseTriangleIcon } from "@rain-next/ui/icons/pause-triangle";
import { Button, type ButtonProps } from "../button/button";
import { IconButton } from "../icon-button/icon-button";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { createCarouselAutoScroll, useCarouselPlayback, validateCarouselPlayback, type CarouselPlaybackConfig, type CarouselPlaybackState } from "./carousel-playback";
import "./carousel.css";

export type { CarouselPlaybackConfig, CarouselPlaybackState, CarouselPlaybackStatus } from "./carousel-playback";

export type CarouselApi = UseEmblaCarouselType[1];
export type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];
export type CarouselPlugin = Parameters<typeof useEmblaCarousel>[1];
export type CarouselProps = ComponentProps<"div"> & {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
  playback?: CarouselPlaybackConfig;
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
  selectedIndex: number;
  scrollSnaps: number[];
  slideCount: number;
  scrollTo: (index: number, jump?: boolean) => void;
  playback: CarouselPlaybackState;
};
const CarouselContext = createContext<CarouselContextProps | null>(null);
function useCarouselRef(ref: ComponentProps<"div">["ref"]) {
  const node = useRef<HTMLDivElement>(null);
  const composed = useCallback((element: HTMLDivElement | null) => {
    node.current = element;
    if (typeof ref === "function") {
      const cleanup = ref(element);
      if (typeof cleanup === "function") return () => { node.current = null; cleanup(); };
    } else if (ref) ref.current = element;
  }, [ref]);
  return { node, composed };
}
export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a Carousel.");
  return context;
}

export function Carousel({ orientation = "horizontal", opts, plugins, setApi, className, dir, playback: playbackConfig,
  onKeyDown, onFocusCapture, onMouseEnter, onMouseLeave, ref, children, ...props }: CarouselProps) {
  validateCarouselPlayback(playbackConfig);
  if (playbackConfig && plugins?.some(plugin => ["autoScroll", "autoplay"].includes(plugin.name))) throw new Error("Carousel playback cannot be combined with another automatic motion plugin.");
  const mode = playbackConfig?.mode, speed = playbackConfig?.mode === "continuous" ? playbackConfig.speed ?? 36 : 0, order = playbackConfig?.direction;
  const continuous = useMemo(() => createCarouselAutoScroll(playbackConfig), [mode, speed, order]);
  const activePlugins = useMemo(() => continuous ? [...(plugins ?? []), continuous] : plugins, [plugins, continuous]);
  const { node: region, composed: rootRef } = useCarouselRef(ref);
  const inheritedDirection = useDirection();
  const direction = opts?.direction ?? (dir === "rtl" || dir === "ltr" ? dir : inheritedDirection);
  const [carouselRef, api] = useEmblaCarousel({ ...opts, direction, axis: orientation === "horizontal" ? "x" : "y",
    breakpoints: { ...opts?.breakpoints, "(prefers-reduced-motion: reduce)": { ...opts?.breakpoints?.["(prefers-reduced-motion: reduce)"], duration: 0 } },
  }, activePlugins);
  const [position, setPosition] = useState({ selectedIndex: 0, scrollSnaps: [] as number[], slideCount: 0, canScrollPrev: false, canScrollNext: false, engineActive: false, revision: 0 });
  const onSelect = useCallback((current: CarouselApi, event?: string) => {
    if (!current) return;
    setPosition(previous => ({ selectedIndex: current.selectedScrollSnap(), scrollSnaps: current.scrollSnapList(), slideCount: current.slideNodes().length,
      // Read resolved active after breakpoints; never modify Embla's motion internals.
      canScrollPrev: current.canScrollPrev(), canScrollNext: current.canScrollNext(), engineActive: current.internalEngine().options.active,
      revision: previous.revision + (event === "reInit" ? 1 : 0) }));
  }, []);
  const controller = useCarouselPlayback(api, region, playbackConfig, continuous, position.selectedIndex, position.revision, position.engineActive && (position.canScrollPrev || position.canScrollNext));
  const { pause } = controller.state;
  const scrollPrev = useCallback(() => { pause(); api?.scrollPrev(); }, [api, pause]);
  const scrollNext = useCallback(() => { pause(); api?.scrollNext(); }, [api, pause]);
  const scrollTo = useCallback((index: number, jump?: boolean) => { pause(); api?.scrollTo(index, jump); }, [api, pause]);
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
  return <CarouselContext.Provider value={{ carouselRef, api, opts, plugins: activePlugins, setApi, orientation, direction, scrollPrev, scrollNext, scrollTo,
    canScrollPrev: position.canScrollPrev, canScrollNext: position.canScrollNext, selectedIndex: position.selectedIndex,
    scrollSnaps: position.scrollSnaps, slideCount: position.slideCount, playback: controller.state }}>
    <div ref={rootRef} role="region" aria-roledescription="carousel" {...props} dir={direction} data-rain-id="ui-carousel" data-slot="carousel"
      data-orientation={orientation} data-playback={controller.state.mode} data-playback-state={controller.state.status}
      className={rainCn("rain-carousel", className)} onKeyDown={handleKeyDown}
      onMouseEnter={event => { onMouseEnter?.(event); if (!event.defaultPrevented) controller.hover.onMouseEnter(); }}
      onMouseLeave={event => { onMouseLeave?.(event); if (!event.defaultPrevented) controller.hover.onMouseLeave(); }}
      onFocusCapture={event => {
        onFocusCapture?.(event);
        const target = event.target as HTMLElement;
        if (!event.defaultPrevented && (!target.closest("[data-carousel-playback-control]") || target.matches(":focus-visible"))) pause();
      }}>{children}</div>
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
  id: "carousel-navigation", scope: "feature", origin: "ui-icon-button", classes: { root: "rounded-rain-full rain-carousel__arrow" },
  modifiedParts: ["root"], candidateTokens: ["--rain-local-carousel-control-ink", "--rain-local-carousel-control-strong", "--rain-local-carousel-control-disabled", "--rain-local-carousel-control-surface"], promotionStatus: "proposed",
});

function Navigation({ previous, ...props }: CarouselNavigationProps & { previous: boolean }) {
  const { orientation, direction, canScrollPrev, canScrollNext, scrollPrev, scrollNext } = useCarousel();
  const available = previous ? canScrollPrev : canScrollNext;
  const disabled = Boolean(props.disabled);
  const blocked = disabled || !available || props.loading || props["aria-disabled"] === true || props["aria-disabled"] === "true";
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
  const shared = { disabled, "aria-disabled": Boolean(blocked), onClick: handleClick, "aria-label": label, "data-carousel-navigation": previous ? "previous" : "next", "data-orientation": orientation, className };
  if (props.variant === "text") return <Button {...props} {...shared}>{props.children ?? <Icon size={16} />}</Button>;
  if (props.variant !== undefined || props.size !== undefined || props.children !== undefined || props.block !== undefined
    || props.leadingIcon !== undefined || props.trailingIcon !== undefined || props.loadingLabel !== undefined || props.localRecipe !== undefined || props.tone === "danger") {
    return <Button {...props} {...shared}>{props.children ?? <Icon size={16} />}</Button>;
  }
  const { variant: _variant, size: _size, children: _children, block: _block, leadingIcon: _leading, trailingIcon: _trailing,
    loadingLabel: _loadingLabel, localRecipe: _recipe, ...nativeProps } = props;
  return <IconButton {...nativeProps} {...shared} aria-label={props["aria-label"] ?? defaultLabel} tone="default" size="36/20" icon={<Icon />} highlight="none" localRecipe={navigationRecipe} />;
}
export function CarouselPrevious(props: CarouselNavigationProps) { return <Navigation {...props} previous />; }
export function CarouselNext(props: CarouselNavigationProps) { return <Navigation {...props} previous={false} />; }

export type CarouselControlsProps = ComponentProps<"div"> & {
  layout?: "inline" | "overlay";
  indicatorPlacement?: "top" | "bottom" | "start" | "end";
};
export function CarouselControls({ layout = "inline", indicatorPlacement = "bottom", className, ...props }: CarouselControlsProps) {
  const { orientation } = useCarousel();
  return <div {...props} data-slot="carousel-controls" data-layout={layout} data-indicator-placement={indicatorPlacement}
    data-orientation={orientation} className={rainCn("rain-carousel__controls", className)} />;
}
export type CarouselIndicatorsProps = ComponentProps<"div"> & { getLabel?: (index: number) => string };
export function CarouselIndicators({ getLabel = index => `转到第 ${index + 1} 项`, className, ref, ...props }: CarouselIndicatorsProps) {
  const { scrollSnaps, selectedIndex, scrollTo, playback } = useCarousel();
  const { node: root, composed } = useCarouselRef(ref);
  useEffect(() => {
    if (playback.mode !== "autoplay") return;
    let frame = 0;
    const update = () => { root.current?.style.setProperty("--rain-carousel-progress", String(playback.getProgress())); if (playback.isPlaying) frame = requestAnimationFrame(update); };
    update(); return () => cancelAnimationFrame(frame);
  }, [playback.mode, playback.isPlaying, playback.getProgress, selectedIndex]);
  if (scrollSnaps.length < 2) return null;
  return <div role="group" aria-label="选择轮播位置" {...props} ref={composed} data-slot="carousel-indicators" data-mode={playback.mode}
    className={rainCn("rain-carousel__indicators", className)}>{scrollSnaps.map((_, index) =>
      <button key={index} type="button" aria-label={getLabel(index)} aria-current={index === selectedIndex ? "true" : undefined}
        data-slot="carousel-indicator" onClick={() => scrollTo(index)}><span aria-hidden="true" /></button>)}</div>;
}
const playbackRecipe = defineRainLocalRecipe<"root", "ui-icon-button">({
  id: "carousel-playback", scope: "feature", origin: "ui-icon-button", classes: { root: "rain-carousel__playback rounded-rain-full" },
  modifiedParts: ["root"], candidateTokens: ["--rain-local-carousel-control-ink", "--rain-local-carousel-control-surface"], promotionStatus: "proposed",
});
export type CarouselPlaybackControlProps = Omit<ComponentProps<"button">, "children">;
export function CarouselPlaybackControl({ onClick, disabled, ...props }: CarouselPlaybackControlProps) {
  const { playback } = useCarousel();
  if (playback.mode === "manual") return null;
  return <IconButton size="36/20" highlight="none" localRecipe={playbackRecipe} {...props} disabled={disabled}
    aria-disabled={Boolean(disabled || !playback.available || props["aria-disabled"] === true || props["aria-disabled"] === "true")} aria-label={props["aria-label"] ?? (playback.enabled ? "暂停播放" : "继续播放")}
    data-carousel-playback-control="" icon={playback.enabled ? <PauseTriangleIcon /> : <PlayTriangleIcon />}
    onClick={event => { onClick?.(event); if (!event.defaultPrevented) (playback.enabled ? playback.pause : playback.play)(); }} />;
}
