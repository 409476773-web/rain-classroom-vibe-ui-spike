import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DirectionProvider } from "../direction/direction";

async function loadCarousel(): Promise<typeof import("./carousel")> {
  const path = "./carousel.tsx";
  return import(/* @vite-ignore */ path);
}

beforeEach(() => {
  vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} }));
  // jsdom has no layout; give the real Embla engine a 100px viewport and three measured slides.
  vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(100);
  vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(100);
  vi.spyOn(HTMLElement.prototype, "offsetLeft", "get").mockImplementation(function (this: HTMLElement) { return Number(this.dataset.testIndex ?? 0) * 100; });
  vi.spyOn(HTMLElement.prototype, "offsetTop", "get").mockImplementation(function (this: HTMLElement) { return Number(this.dataset.testIndex ?? 0) * 100; });
});
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("Carousel real Embla adapter", () => {
  it.each(["autoplay", "continuous"] as const)("suspends %s while the real engine is inactive and resumes after reInit", async mode => {
    const { Carousel, CarouselContent, CarouselItem } = await loadCarousel();
    let api: import("./carousel").CarouselApi;
    render(<Carousel aria-label="停用的轮播" opts={{ active: false, duration: 0 }} playback={{ mode }} setApi={value => { api = value; }}>
      <CarouselContent>{[0, 1, 2].map(index => <CarouselItem key={index} data-test-index={index}>{index}</CarouselItem>)}</CarouselContent>
    </Carousel>);
    await waitFor(() => expect(api).toBeDefined());
    expect(api!.canScrollNext()).toBe(true);
    expect(screen.getByRole("region", { name: "停用的轮播" })).toHaveAttribute("data-playback-state", "unavailable");
    act(() => { api!.reInit({ active: true }); });
    expect(screen.getByRole("region", { name: "停用的轮播" })).toHaveAttribute("data-playback-state", "playing");
    if (mode === "continuous") expect(api!.plugins().autoScroll.isPlaying()).toBe(true);
  });
  it("handles the real continuous plugin's non-loop edge stop without reentering stop", async () => {
    const { Carousel, CarouselContent, CarouselItem } = await loadCarousel();
    let api: import("./carousel").CarouselApi;
    render(<Carousel aria-label="连续边界" opts={{ startIndex: 2, duration: 0 }} playback={{ mode: "continuous", start: false }} setApi={value => { api = value; }}>
      <CarouselContent>{[0, 1, 2].map(index => <CarouselItem key={index} data-test-index={index}>{index}</CarouselItem>)}</CarouselContent>
    </Carousel>);
    await waitFor(() => expect(api).toBeDefined());
    const plugin = api!.plugins().autoScroll;
    expect(api!.canScrollNext()).toBe(false);
    act(() => { plugin.play(0); });
    expect(plugin.isPlaying()).toBe(true);
    expect(() => act(() => { plugin.stop(); })).not.toThrow();
    expect(plugin.isPlaying()).toBe(false);
    expect(screen.getByRole("region", { name: "连续边界" })).toHaveAttribute("data-playback-state", "paused");
  });
  it("positions both house navigation branches absolutely while retaining caller layout overrides", async () => {
    const { Carousel, CarouselContent, CarouselItem, CarouselNext } = await loadCarousel();
    render(<Carousel aria-label="导航布局"><CarouselContent>
      {[0, 1, 2].map(index => <CarouselItem key={index} data-test-index={index}>{index}</CarouselItem>)}
    </CarouselContent><CarouselNext aria-label="默认图标布局" /><CarouselNext variant="secondary">默认文字布局</CarouselNext>
      <CarouselNext aria-label="自定义图标布局" className="static" style={{ position: "relative" }} />
      <CarouselNext variant="secondary" className="fixed" style={{ position: "static" }}>自定义文字布局</CarouselNext>
    </Carousel>);
    for (const name of ["默认图标布局", "默认文字布局"]) {
      const button = screen.getByRole("button", { name });
      expect(button).toHaveClass("absolute"); expect(button).not.toHaveClass("relative");
    }
    expect(screen.getByRole("button", { name: "自定义图标布局" })).toHaveClass("static");
    expect(screen.getByRole("button", { name: "自定义图标布局" })).not.toHaveClass("absolute");
    expect(screen.getByRole("button", { name: "自定义图标布局" })).toHaveStyle({ position: "relative" });
    expect(screen.getByRole("button", { name: "自定义文字布局" })).toHaveClass("fixed");
    expect(screen.getByRole("button", { name: "自定义文字布局" })).not.toHaveClass("absolute");
    expect(screen.getByRole("button", { name: "自定义文字布局" })).toHaveStyle({ position: "static" });
  });

  it("preserves context RTL in actual DOM and Embla options", async () => {
    const { Carousel, CarouselContent, CarouselItem } = await loadCarousel();
    let api: import("./carousel").CarouselApi;
    render(<DirectionProvider direction="rtl"><Carousel aria-label="课程资料" setApi={value => { api = value; }}>
      <CarouselContent>{[0, 1, 2].map(index => <CarouselItem key={index} data-test-index={index}>{index}</CarouselItem>)}</CarouselContent>
    </Carousel></DirectionProvider>);
    await waitFor(() => expect(api).toBeDefined());
    expect(screen.getByRole("region", { name: "课程资料" })).toHaveAttribute("dir", "rtl");
    expect(api!.internalEngine().options.direction).toBe("rtl");
  });

  it("keeps child input arrows while routing vertical keys at the carousel entry", async () => {
    const { Carousel, CarouselContent, CarouselItem } = await loadCarousel();
    let api: import("./carousel").CarouselApi;
    render(<Carousel orientation="vertical" tabIndex={0} aria-label="课件" setApi={value => { api = value; }}><CarouselContent>
      {[0, 1, 2].map(index => <CarouselItem key={index} data-test-index={index}><input aria-label={`第${index}页笔记`} /></CarouselItem>)}
    </CarouselContent></Carousel>);
    await waitFor(() => expect(api).toBeDefined());
    const next = vi.spyOn(api!, "scrollNext"), previous = vi.spyOn(api!, "scrollPrev");
    fireEvent.keyDown(screen.getByRole("textbox", { name: "第0页笔记" }), { key: "ArrowDown" });
    expect(next).not.toHaveBeenCalled();
    const root = screen.getByRole("region", { name: "课件" });
    fireEvent.keyDown(root, { key: "ArrowDown" });
    fireEvent.keyDown(root, { key: "ArrowUp" });
    expect(next).toHaveBeenCalledTimes(1);
    expect(previous).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(root, { key: "ArrowRight" });
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("combines the default icon navigation click without dropping the host callback", async () => {
    const { Carousel, CarouselContent, CarouselItem, CarouselNext } = await loadCarousel();
    let api: import("./carousel").CarouselApi;
    const hostClick = vi.fn();
    render(<Carousel aria-label="课件" setApi={value => { api = value; }}><CarouselContent>
      {[0, 1, 2].map(index => <CarouselItem key={index} data-test-index={index}>{index}</CarouselItem>)}
    </CarouselContent><CarouselNext onClick={hostClick} /></Carousel>);
    await waitFor(() => expect(screen.getByRole("button", { name: "下一项" })).toBeEnabled());
    const scroll = vi.spyOn(api!, "scrollNext");
    await userEvent.setup().click(screen.getByRole("button", { name: "下一项" }));
    expect(hostClick).toHaveBeenCalledTimes(1);
    expect(scroll).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "下一项" })).toHaveAttribute("data-rain-id", "ui-icon-button");
  });

  it("honors host prevention and aria-disabled with the explicit Button branch", async () => {
    const { Carousel, CarouselContent, CarouselItem, CarouselNext } = await loadCarousel();
    let api: import("./carousel").CarouselApi;
    const blocked = vi.fn();
    render(<Carousel aria-label="课件" setApi={value => { api = value; }}><CarouselContent>
      {[0, 1, 2].map(index => <CarouselItem key={index} data-test-index={index}>{index}</CarouselItem>)}
    </CarouselContent><CarouselNext variant="secondary" onClick={event => event.preventDefault()}>继续阅读</CarouselNext>
      <CarouselNext variant="secondary" aria-disabled onClick={blocked}>暂停阅读</CarouselNext>
    </Carousel>);
    await waitFor(() => expect(api).toBeDefined());
    const scroll = vi.spyOn(api!, "scrollNext");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "继续阅读" }));
    await user.click(screen.getByRole("button", { name: "暂停阅读" }));
    expect(scroll).not.toHaveBeenCalled();
    expect(blocked).not.toHaveBeenCalled();
  });

  it("honors prevention and aria-disabled on default icon controls", async () => {
    const { Carousel, CarouselContent, CarouselItem, CarouselNext } = await loadCarousel();
    let api: import("./carousel").CarouselApi;
    const blocked = vi.fn();
    render(<Carousel aria-label="课件" setApi={value => { api = value; }}><CarouselContent>
      {[0, 1, 2].map(index => <CarouselItem key={index} data-test-index={index}>{index}</CarouselItem>)}
    </CarouselContent><CarouselNext aria-label="宿主阻止" onClick={event => event.preventDefault()} />
      <CarouselNext aria-label="临时不可用" aria-disabled onClick={blocked} />
    </Carousel>);
    await waitFor(() => expect(api).toBeDefined());
    const scroll = vi.spyOn(api!, "scrollNext");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "宿主阻止" }));
    await user.click(screen.getByRole("button", { name: "临时不可用" }));
    fireEvent.keyDown(screen.getByRole("button", { name: "临时不可用" }), { key: "ArrowRight" });
    expect(scroll).not.toHaveBeenCalled();
    expect(blocked).not.toHaveBeenCalled();
  });

  it("combines explicit Button callbacks and prevents callers from enabling an edge", async () => {
    const { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } = await loadCarousel();
    let api: import("./carousel").CarouselApi;
    const nextClick = vi.fn(), edgeClick = vi.fn();
    render(<Carousel aria-label="课件" setApi={value => { api = value; }}><CarouselContent>
      {[0, 1, 2].map(index => <CarouselItem key={index} data-test-index={index}>{index}</CarouselItem>)}
    </CarouselContent><CarouselPrevious variant="text" disabled={false} onClick={edgeClick}>返回阅读</CarouselPrevious>
      <CarouselNext variant="text" onClick={nextClick}>继续阅读</CarouselNext>
    </Carousel>);
    await waitFor(() => expect(api).toBeDefined());
    expect(screen.getByRole("button", { name: "返回阅读" })).toHaveAttribute("aria-disabled", "true");
    expect(screen.getByRole("button", { name: "返回阅读" })).not.toBeDisabled();
    const scroll = vi.spyOn(api!, "scrollNext");
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "返回阅读" }));
    await user.click(screen.getByRole("button", { name: "继续阅读" }));
    expect(edgeClick).not.toHaveBeenCalled();
    expect(nextClick).toHaveBeenCalledTimes(1);
    expect(scroll).toHaveBeenCalledTimes(1);
  });

  it("uses engine duration zero under reduced motion without converting milliseconds", async () => {
    const { Carousel, CarouselContent, CarouselItem } = await loadCarousel();
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: query.includes("prefers-reduced-motion"), media: query, addEventListener() {}, removeEventListener() {} }));
    let api: import("./carousel").CarouselApi;
    render(<Carousel aria-label="课件" opts={{ duration: 42 }} setApi={value => { api = value; }}><CarouselContent>
      <CarouselItem>第1页</CarouselItem>
    </CarouselContent></Carousel>);
    await waitFor(() => expect(api).toBeDefined());
    expect(api!.internalEngine().options.duration).toBe(0);
  });

  it("removes both select and reInit subscriptions using their original callback", async () => {
    const { Carousel, CarouselContent, CarouselItem } = await loadCarousel();
    let api: import("./carousel").CarouselApi;
    const { unmount } = render(<Carousel aria-label="课件" setApi={value => { api = value; }}><CarouselContent>
      <CarouselItem>第1页</CarouselItem>
    </CarouselContent></Carousel>);
    await waitFor(() => expect(api).toBeDefined());
    const off = vi.spyOn(api!, "off");
    unmount();
    const select = off.mock.calls.find(([event]) => event === "select");
    const reInit = off.mock.calls.find(([event]) => event === "reInit");
    expect(select).toBeDefined();
    expect(reInit).toBeDefined();
    expect(select?.[1]).toBe(reInit?.[1]);
  });
});
