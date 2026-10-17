import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";
import { DensityProvider } from "@rain-next/foundations";
import { FavoriteIcon } from "../icons/favorite";
import { FavoriteFilledIcon } from "../icons/favorite-filled";
import { IconButton, iconButtonSizes, type IconButtonProps } from "./icon-button";

function invalidPublicExamples() {
  // @ts-expect-error An icon button must have an accessible name.
  const unnamed = <IconButton icon={<FavoriteIcon />} />;
  // @ts-expect-error Danger has no persistent highlight recipe in this version.
  const danger = <IconButton icon={<FavoriteIcon />} aria-label="删除" tone="danger" highlight="surface" />;
  // @ts-expect-error Complete recipes cannot be assembled from arbitrary pairs.
  const size = <IconButton icon={<FavoriteIcon />} aria-label="收藏" size="18/36" />;
  // @ts-expect-error Business state belongs to the host.
  const selected = <IconButton icon={<FavoriteIcon />} aria-label="收藏" selected />;
  return [unnamed, danger, size, selected];
}
void invalidPublicExamples;

describe("IconButton", () => {
  it("is a named native button with a decorative icon, composable attributes and a ref", async () => {
    const onClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();
    render(<IconButton icon={<FavoriteIcon />} aria-label="收藏" aria-controls="panel" data-state="open" data-example="test" ref={ref} onClick={onClick} />);
    const button = screen.getByRole("button", { name: "收藏" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toHaveAttribute("aria-pressed");
    expect(button).toHaveAttribute("data-state", "open");
    expect(button).toHaveAttribute("data-rain-state", "default");
    expect(button).toHaveAttribute("aria-controls", "panel");
    expect(ref.current).toBe(button);
    expect(button.querySelector('[data-slot="icon"]')).toHaveAttribute("aria-hidden", "true");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("supports a visible external name", () => {
    render(<><span id="favorite-label">收藏课程</span><IconButton icon={<FavoriteIcon />} aria-labelledby="favorite-label" /></>);
    expect(screen.getByRole("button", { name: "收藏课程" })).toBeInTheDocument();
  });

  it("uses density only when a complete size is not provided", () => {
    const { rerender } = render(<DensityProvider density="compact"><IconButton icon={<FavoriteIcon />} aria-label="收藏" /></DensityProvider>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "32/18");
    rerender(<DensityProvider density="default"><IconButton icon={<FavoriteIcon />} aria-label="收藏" /></DensityProvider>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "36/20");
    rerender(<DensityProvider density="compact"><IconButton icon={<FavoriteIcon />} aria-label="收藏" size="24/14" /></DensityProvider>);
    expect(screen.getByRole("button")).toHaveAttribute("data-size", "24/14");
    expect(Object.keys(iconButtonSizes)).toHaveLength(18);
  });

  it("does not infer toggle semantics or swap an icon from visual highlight", async () => {
    const onClick = vi.fn();
    const { rerender } = render(<IconButton icon={<FavoriteIcon />} aria-label="收藏" highlight="icon" onClick={onClick} />);
    const button = screen.getByRole("button");
    const asset = button.querySelector('[data-icon]')?.getAttribute("data-icon");
    await userEvent.click(button);
    expect(button).not.toHaveAttribute("aria-pressed");
    expect(button.querySelector('[data-icon]')).toHaveAttribute("data-icon", asset);
    rerender(<IconButton icon={<FavoriteFilledIcon />} aria-label="收藏" highlight="icon" aria-pressed />);
    expect(button).toHaveAttribute("aria-pressed", "true");
    expect(button.querySelector('[data-icon]')?.getAttribute("data-icon")).not.toBe(asset);
  });

  it("retains loading focus and prevents clicks, keyboard activation and trigger pointer handlers", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onPointerDown = vi.fn();
    const onKeyDown = vi.fn();
    const onParentClick = vi.fn();
    const { rerender } = render(<IconButton icon={<FavoriteIcon />} aria-label="收藏" />);
    const button = screen.getByRole("button");
    await user.tab();
    expect(button).toHaveFocus();
    rerender(<IconButton icon={<FavoriteIcon />} aria-label="收藏" loading highlight="surface" onClick={onClick} onPointerDown={onPointerDown} onKeyDown={onKeyDown} />);
    expect(button).toHaveFocus();
    expect(button).not.toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toHaveAttribute("aria-disabled", "true");
    await user.keyboard("{Enter} ");
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(onPointerDown).not.toHaveBeenCalled();
    expect(onKeyDown).not.toHaveBeenCalled();
    expect(button.querySelector('[data-slot="loading-indicator"]')).toBeInTheDocument();
    expect(button).toHaveAttribute("data-highlight", "surface");
    rerender(<div onClick={onParentClick}><IconButton icon={<FavoriteIcon />} aria-label="收藏" loading /></div>);
    await user.click(screen.getByRole("button"));
    expect(onParentClick).not.toHaveBeenCalled();
  });

  it("blocks popup activation arrows while loading and preserves ordinary focus navigation", async () => {
    const onKeyDown = vi.fn();
    const onKeyUp = vi.fn();
    const props = { icon: <FavoriteIcon />, "aria-label": "更多操作", onKeyDown, onKeyUp };
    const { rerender } = render(<IconButton {...props} loading aria-haspopup="menu" />);
    const button = screen.getByRole("button");
    button.focus();
    await userEvent.keyboard("{ArrowDown}{ArrowUp}{Enter} ");
    expect(onKeyDown).not.toHaveBeenCalled();
    expect(onKeyUp).not.toHaveBeenCalled();
    await userEvent.keyboard("{Escape}{Tab}");
    expect(onKeyDown.mock.calls.map(([event]) => event.key)).toEqual(["Escape", "Tab"]);
    onKeyDown.mockClear();
    rerender(<IconButton {...props} loading aria-haspopup="false" />);
    button.focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    onKeyDown.mockClear();
    rerender(<IconButton {...props} aria-haspopup="menu" />);
    await userEvent.keyboard("{ArrowDown}");
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it("shows the latest externally supplied icon after loading, without clearing business state", () => {
    const { rerender } = render(<IconButton icon={<FavoriteIcon />} aria-label="收藏" loading highlight="icon" aria-pressed />);
    rerender(<IconButton icon={<FavoriteFilledIcon />} aria-label="收藏" loading highlight="icon" aria-pressed />);
    rerender(<IconButton icon={<FavoriteFilledIcon />} aria-label="收藏" highlight="icon" aria-pressed />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button").querySelector('[data-icon]')).toHaveAttribute("data-icon", "icon/favorite-filled");
    expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy");
  });

  it("uses native disabled even when loading, while retaining highlight and the loading graphic", async () => {
    render(<><IconButton icon={<FavoriteIcon />} aria-label="收藏" loading disabled highlight="surface" /><button>下一项</button></>);
    const button = screen.getByRole("button", { name: "收藏" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-rain-state", "disabled");
    expect(button).toHaveAttribute("data-highlight", "surface");
    expect(button.querySelector('[data-slot="loading-indicator"]')).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "下一项" })).toHaveFocus();
  });

  it("honors an aria-disabled trigger without pretending the native disabled prop is set", async () => {
    const onClick = vi.fn();
    render(<IconButton icon={<FavoriteIcon />} aria-label="收藏" aria-disabled onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it.each([
    { "aria-label": " " },
    { "aria-label": "删除", tone: "danger", highlight: "surface" },
    { "aria-label": "收藏", size: "18/36" },
    { "aria-label": "收藏", icon: null },
  ])("rejects invalid JavaScript consumers instead of silently changing the contract: %j", (overrides) => {
    expect(() => render(<IconButton {...({ icon: <FavoriteIcon />, ...overrides } as IconButtonProps)} />)).toThrow();
  });
});
