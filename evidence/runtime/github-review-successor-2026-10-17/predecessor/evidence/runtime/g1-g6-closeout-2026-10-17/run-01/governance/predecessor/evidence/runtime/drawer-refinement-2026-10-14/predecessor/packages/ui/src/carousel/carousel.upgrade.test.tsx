import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRef, type Ref } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { CarouselApi, CarouselOptions, CarouselPlaybackConfig, CarouselPlaybackControlProps } from "./carousel";

async function loadCarousel(): Promise<typeof import("./carousel")> {
  const path = "./carousel.tsx";
  return import(/* @vite-ignore */ path);
}

let viewportWidth = 100;
let reducedMotion = false;
const mediaQueries: { query: string; listeners: Set<(event: Event) => void> }[] = [];
const intersections: BrowserIntersectionObserver[] = [];

class BrowserIntersectionObserver {
  readonly targets = new Set<Element>();
  constructor(readonly callback: IntersectionObserverCallback) { intersections.push(this); }
  observe(target: Element) { this.targets.add(target); }
  unobserve(target: Element) { this.targets.delete(target); }
  disconnect() { this.targets.clear(); }
}

beforeEach(() => {
  viewportWidth = 100;
  reducedMotion = false;
  mediaQueries.length = 0;
  intersections.length = 0;
  vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal("IntersectionObserver", BrowserIntersectionObserver);
  vi.stubGlobal("matchMedia", (query: string) => {
    const listeners = new Set<(event: Event) => void>();
    mediaQueries.push({ query, listeners });
    return {
      get matches() { return reducedMotion && query.includes("prefers-reduced-motion"); }, media: query,
      addEventListener(_type: string, listener: (event: Event) => void) { listeners.add(listener); },
      removeEventListener(_type: string, listener: (event: Event) => void) { listeners.delete(listener); },
    };
  });
  // Only browser layout/observers are supplied: navigation uses the actual Embla instance.
  vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockImplementation(function (this: HTMLElement) {
    return this.hasAttribute("data-test-index") ? 100 : viewportWidth;
  });
  vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(100);
  vi.spyOn(HTMLElement.prototype, "offsetLeft", "get").mockImplementation(function (this: HTMLElement) {
    return Number(this.dataset.testIndex ?? 0) * 100;
  });
  vi.spyOn(HTMLElement.prototype, "offsetTop", "get").mockImplementation(function (this: HTMLElement) {
    return Number(this.dataset.testIndex ?? 0) * 100;
  });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

type FixtureOptions = {
  itemCount?: number;
  opts?: CarouselOptions;
  playback?: CarouselPlaybackConfig;
  indicators?: boolean;
  playControl?: boolean;
  layout?: "inline" | "overlay";
  indicatorPlacement?: "top" | "bottom" | "start" | "end";
  getLabel?: (index: number) => string;
  nextDisabled?: boolean;
  playControlProps?: CarouselPlaybackControlProps;
  controlsRef?: Ref<HTMLDivElement>;
  indicatorsRef?: Ref<HTMLDivElement>;
};
type Snapshot = { selectedIndex?: number; snapCount?: number; slideCount?: number; enabled?: boolean; isPlaying?: boolean };

async function fixture(options: FixtureOptions = {}) {
  const parts = await loadCarousel();
  const { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel } = parts;
  if (options.indicators) expect(parts.CarouselIndicators, "CarouselIndicators must be exported").toBeDefined();
  if (options.playControl) expect(parts.CarouselPlaybackControl, "CarouselPlaybackControl must be exported").toBeDefined();
  if (options.layout) expect(parts.CarouselControls, "CarouselControls must be exported").toBeDefined();
  const { CarouselControls, CarouselIndicators, CarouselPlaybackControl } = parts;
  let api: CarouselApi;
  const receiveApi = (next: CarouselApi) => { api = next; };
  function Probe() {
    const context = useCarousel();
    return <output data-testid="carousel-state">{JSON.stringify({
      selectedIndex: context.selectedIndex,
      snapCount: context.scrollSnaps?.length,
      slideCount: context.slideCount,
      enabled: context.playback?.enabled,
      isPlaying: context.playback?.isPlaying,
    })}</output>;
  }
  function Sample({ itemCount }: { itemCount: number }) {
    const navigation = <>
      <CarouselPrevious />
      {options.indicators && <CarouselIndicators ref={options.indicatorsRef} getLabel={options.getLabel} />}
      <CarouselNext disabled={options.nextDisabled} />
    </>;
    return <Carousel aria-label="升级轮播" tabIndex={0} opts={{ duration: 0, ...options.opts }} playback={options.playback} setApi={receiveApi}>
      <CarouselContent>{Array.from({ length: itemCount }, (_, index) => <CarouselItem key={index} data-test-index={index}>
        <input aria-label={`第 ${index + 1} 项笔记`} />
      </CarouselItem>)}</CarouselContent>
      {options.layout ? <CarouselControls ref={options.controlsRef} layout={options.layout} indicatorPlacement={options.indicatorPlacement}>{navigation}</CarouselControls> : navigation}
      {options.playControl && <CarouselPlaybackControl {...options.playControlProps} />}
      <Probe />
    </Carousel>;
  }
  const view = render(<Sample itemCount={options.itemCount ?? 3} />);
  expect(api, "real Embla instance should initialize").toBeDefined();
  return {
    ...view,
    api: () => api!,
    root: screen.getByRole("region", { name: "升级轮播" }),
    setItemCount: (itemCount: number) => view.rerender(<Sample itemCount={itemCount} />),
  };
}

function snapshot(): Snapshot {
  return JSON.parse(screen.getByTestId("carousel-state").textContent ?? "{}");
}

async function timedFixture(options: FixtureOptions = {}) {
  await loadCarousel();
  vi.useFakeTimers();
  return fixture({ playback: { mode: "autoplay", delay: 1000, start: true }, ...options });
}

function advance(milliseconds: number) {
  act(() => { vi.advanceTimersByTime(milliseconds); });
}

function setReducedMotion(value: boolean) {
  act(() => {
    reducedMotion = value;
    for (const media of [...mediaQueries]) {
      if (media.query.includes("prefers-reduced-motion")) for (const listener of [...media.listeners]) listener(new Event("change"));
    }
  });
}

function setIntersecting(target: Element, isIntersecting: boolean) {
  const observer = intersections.find(candidate => candidate.targets.has(target));
  expect(observer, "playback observes the Carousel region").toBeDefined();
  act(() => {
    const rect = target.getBoundingClientRect();
    observer!.callback([{ target, isIntersecting, intersectionRatio: Number(isIntersecting), time: 0,
      boundingClientRect: rect, intersectionRect: rect, rootBounds: null }], observer as unknown as IntersectionObserver);
  });
}

describe("Carousel upgrade with real Embla", () => {
  it("exports the three composable control parts", async () => {
    const parts = await loadCarousel();
    expect(parts.CarouselControls).toBeDefined();
    expect(parts.CarouselIndicators).toBeDefined();
    expect(parts.CarouselPlaybackControl).toBeDefined();
  });

  it.each([0, 1])("does not show position buttons for %i content items", async itemCount => {
    const view = await fixture({ itemCount, indicators: true });
    expect(view.api().slideNodes()).toHaveLength(itemCount);
    expect(screen.queryAllByRole("button", { name: /转到第/ })).toHaveLength(0);
    expect(snapshot().slideCount).toBe(itemCount);
  });

  it("hides indicators when all content fits in one viewport", async () => {
    viewportWidth = 400;
    const view = await fixture({ itemCount: 3, indicators: true });
    expect(view.api().scrollSnapList()).toHaveLength(1);
    expect(screen.queryAllByRole("button", { name: /转到第/ })).toHaveLength(0);
  });

  it("uses real grouped snap positions for indicator count, labels and direct navigation", async () => {
    const view = await fixture({ itemCount: 4, opts: { slidesToScroll: 2 }, indicators: true, layout: "overlay", getLabel: index => `阅读第 ${index + 1} 组` });
    const snaps = view.api().scrollSnapList();
    expect(snaps).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: /阅读第/ })).toHaveLength(snaps.length);
    fireEvent.click(screen.getByRole("button", { name: "阅读第 2 组" }));
    expect(view.api().selectedScrollSnap()).toBe(1);
    expect(snapshot()).toMatchObject({ selectedIndex: 1, snapCount: 2, slideCount: 4 });
    expect(screen.getByRole("button", { name: "阅读第 2 组" })).toHaveAttribute("aria-current", "true");
    act(() => { view.api().scrollTo(0, true); });
    expect(screen.getByRole("button", { name: "阅读第 1 组" })).toHaveAttribute("aria-current", "true");
  });

  it("refreshes indicator positions after real content and engine reinitialization", async () => {
    const view = await fixture({ itemCount: 3, indicators: true });
    act(() => { view.api().scrollTo(2, true); });
    view.setItemCount(2);
    act(() => { view.api().reInit(); });
    expect(view.api().slideNodes()).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: /转到第/ })).toHaveLength(view.api().scrollSnapList().length);
    expect(snapshot()).toMatchObject({ selectedIndex: view.api().selectedScrollSnap(), slideCount: 2 });
  });

  it("keeps the last-item arrow focused and blocks further edge activation", async () => {
    const view = await fixture();
    const next = screen.getByRole("button", { name: "下一项" });
    act(() => { next.focus(); });
    fireEvent.click(next);
    fireEvent.click(next);
    expect(view.api().selectedScrollSnap()).toBe(2);
    expect(next).toHaveFocus();
    expect(next).toHaveAttribute("aria-disabled", "true");
    expect(next).not.toBeDisabled();
    fireEvent.click(next);
    fireEvent.keyDown(next, { key: "ArrowRight" });
    expect(view.api().selectedScrollSnap()).toBe(2);
    expect(next).toHaveFocus();
  });

  it("navigates once from an overlay arrow without taking arrow keys from nested inputs", async () => {
    const view = await fixture({ layout: "overlay", indicators: true });
    fireEvent.keyDown(screen.getByRole("button", { name: "下一项" }), { key: "ArrowRight" });
    expect(view.api().selectedScrollSnap()).toBe(1);
    fireEvent.keyDown(screen.getByRole("textbox", { name: "第 2 项笔记" }), { key: "ArrowRight" });
    expect(view.api().selectedScrollSnap()).toBe(1);
    fireEvent.keyDown(screen.getByRole("button", { name: "转到第 2 项" }), { key: "ArrowRight" });
    expect(view.api().selectedScrollSnap()).toBe(1);
  });

  it("waits for explicit playback when start is false", async () => {
    const view = await timedFixture({ playback: { mode: "autoplay", delay: 1000, start: false }, playControl: true });
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "继续播放" }));
    advance(1100);
    expect(view.api().selectedScrollSnap()).toBe(1);
    expect(screen.getByRole("button", { name: "暂停播放" })).toBeInTheDocument();
  });

  it("advances at the configured interval and stops at the non-loop forward boundary", async () => {
    const view = await timedFixture();
    expect(snapshot()).toMatchObject({ enabled: true, isPlaying: true });
    advance(850);
    expect(view.api().selectedScrollSnap()).toBe(0);
    advance(250);
    expect(view.api().selectedScrollSnap()).toBe(1);
    advance(3300);
    expect(view.api().selectedScrollSnap()).toBe(2);
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
  });

  it("supports timed reverse order and stops at the non-loop first item", async () => {
    const view = await timedFixture({ opts: { startIndex: 2 }, playback: { mode: "autoplay", delay: 1000, direction: "reverse", start: true } });
    advance(1100);
    expect(view.api().selectedScrollSnap()).toBe(1);
    advance(3300);
    expect(view.api().selectedScrollSnap()).toBe(0);
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
  });

  it("temporarily pauses on hover and resumes only the existing playback intent", async () => {
    const view = await timedFixture();
    fireEvent.mouseEnter(view.root);
    expect(snapshot()).toMatchObject({ enabled: true, isPlaying: false });
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(0);
    fireEvent.mouseLeave(view.root);
    expect(snapshot()).toMatchObject({ enabled: true, isPlaying: true });
    advance(1100);
    expect(view.api().selectedScrollSnap()).toBe(1);
  });

  it("does not let mouse leave override an explicit pause", async () => {
    const view = await timedFixture({ playControl: true });
    fireEvent.mouseEnter(view.root);
    fireEvent.click(screen.getByRole("button", { name: "暂停播放" }));
    fireEvent.mouseLeave(view.root);
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(0);
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
    expect(screen.getByRole("button", { name: "继续播放" })).toBeInTheDocument();
  });

  it("keeps playback paused after focus leaves a navigation control", async () => {
    const view = await timedFixture();
    const next = screen.getByRole("button", { name: "下一项" });
    act(() => { next.focus(); });
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
    act(() => { next.blur(); });
    fireEvent.mouseLeave(view.root);
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(0);
  });

  it("hands control to direct navigation and gives a full interval on explicit resume", async () => {
    const view = await timedFixture({ indicators: true, playControl: true });
    advance(600);
    fireEvent.click(screen.getByRole("button", { name: "转到第 2 项" }));
    expect(view.api().selectedScrollSnap()).toBe(1);
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(1);
    fireEvent.click(screen.getByRole("button", { name: "继续播放" }));
    advance(850);
    expect(view.api().selectedScrollSnap()).toBe(1);
    advance(250);
    expect(view.api().selectedScrollSnap()).toBe(2);
  });

  it("starts paused for a user who requests reduced motion", async () => {
    reducedMotion = true;
    const view = await timedFixture({ playControl: true });
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(0);
    expect(screen.getByRole("button", { name: "继续播放" })).toBeInTheDocument();
  });

  it.each([0, 1])("never starts automatic motion with %i content items", async itemCount => {
    const view = await timedFixture({ itemCount });
    advance(2200);
    expect(snapshot().isPlaying).toBe(false);
    expect(view.api().canScrollNext()).toBe(false);
    expect(view.api().canScrollPrev()).toBe(false);
  });

  it.each(["document", "intersection"] as const)("temporarily suspends for %s visibility and preserves an explicit pause", async source => {
    let hidden = false;
    vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
    const view = await timedFixture({ playControl: true });
    const setVisible = (visible: boolean) => {
      if (source === "intersection") setIntersecting(view.root, visible);
      else act(() => { hidden = !visible; document.dispatchEvent(new Event("visibilitychange")); });
    };
    expect(snapshot()).toMatchObject({ enabled: true, isPlaying: true });
    setVisible(false);
    expect(snapshot()).toMatchObject({ enabled: true, isPlaying: false });
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(0);
    setVisible(true);
    expect(snapshot()).toMatchObject({ enabled: true, isPlaying: true });
    advance(1100);
    expect(view.api().selectedScrollSnap()).toBe(1);
    fireEvent.click(screen.getByRole("button", { name: "暂停播放" }));
    setVisible(false);
    setVisible(true);
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(1);
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
  });

  it("stops when reduced motion changes and requires explicit playback to resume", async () => {
    const view = await timedFixture({ playControl: true });
    expect(snapshot().isPlaying).toBe(true);
    setReducedMotion(true);
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(0);
    setReducedMotion(false);
    advance(2200);
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
    expect(view.api().selectedScrollSnap()).toBe(0);
    setReducedMotion(true);
    fireEvent.click(screen.getByRole("button", { name: "继续播放" }));
    expect(snapshot()).toMatchObject({ enabled: true, isPlaying: true });
    advance(1100);
    expect(view.api().selectedScrollSnap()).toBe(1);
  });

  it("keeps playback paused after the real engine signals pointer takeover", async () => {
    const view = await timedFixture();
    act(() => { view.api().emit("pointerDown"); });
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
    act(() => { view.api().scrollTo(1, true); view.api().emit("pointerUp"); });
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(1);
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
  });

  it("consumes the real AutoScroll plugin with the public speed and direction contract", async () => {
    const view = await timedFixture({ opts: { loop: true }, playback: { mode: "continuous", speed: 36, direction: "reverse", start: false }, playControl: true });
    const plugin = view.api().plugins().autoScroll;
    expect(plugin).toBeDefined();
    expect(plugin.options).toMatchObject({ speed: 0.6, direction: "backward", playOnInit: false });
    expect(plugin.isPlaying()).toBe(false);
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(0);
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
    fireEvent.click(screen.getByRole("button", { name: "继续播放" }));
    expect(plugin.isPlaying()).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "暂停播放" }));
    expect(plugin.isPlaying()).toBe(false);
  });

  it("retains caller-provided native disabled on navigation and playback controls", async () => {
    const view = await timedFixture({ playback: { mode: "autoplay", delay: 1000, start: false }, nextDisabled: true, playControl: true, playControlProps: { disabled: true } });
    const next = screen.getByRole("button", { name: "下一项" });
    const play = screen.getByRole("button", { name: "继续播放" });
    expect(next).toBeDisabled();
    expect(play).toBeDisabled();
    fireEvent.click(next);
    fireEvent.keyDown(next, { key: "ArrowRight" });
    fireEvent.click(play);
    advance(2200);
    expect(view.api().selectedScrollSnap()).toBe(0);
    expect(snapshot()).toMatchObject({ enabled: false, isPlaying: false });
  });

  it("does not block playback when aria-disabled is the string false", async () => {
    const view = await timedFixture({ playback: { mode: "autoplay", delay: 1000, start: false }, playControl: true, playControlProps: { "aria-disabled": "false" } });
    const play = screen.getByRole("button", { name: "继续播放" });
    expect(play).toHaveAttribute("aria-disabled", "false");
    fireEvent.click(play);
    advance(1100);
    expect(view.api().selectedScrollSnap()).toBe(1);
  });

  it("forwards controls, indicators and playback refs and clears them on unmount", async () => {
    const controlsRef = createRef<HTMLDivElement>();
    const indicatorsRef = createRef<HTMLDivElement>();
    const playbackRef = createRef<HTMLButtonElement>();
    const view = await fixture({ playback: { mode: "autoplay", start: false }, layout: "inline", indicators: true, playControl: true,
      controlsRef, indicatorsRef, playControlProps: { ref: playbackRef } });
    expect(controlsRef.current).toBe(view.root.querySelector('[data-slot="carousel-controls"]'));
    expect(indicatorsRef.current).toBe(screen.getByRole("group", { name: "选择轮播位置" }));
    expect(playbackRef.current).toBe(screen.getByRole("button", { name: "继续播放" }));
    view.unmount();
    expect(controlsRef.current).toBeNull();
    expect(indicatorsRef.current).toBeNull();
    expect(playbackRef.current).toBeNull();
  });
});
