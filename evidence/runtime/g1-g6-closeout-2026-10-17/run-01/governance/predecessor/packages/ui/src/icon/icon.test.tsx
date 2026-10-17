import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icon, type IconAsset } from "./icon";

const arrow: IconAsset = {
  assetId: "icon/arrow-down",
  src: "/icons/arrow-down.svg",
  colorMode: "host",
  rendering: "svg-mask",
};

describe("formal icon rendering", () => {
  it("keeps source masks in an isolated image and delegates foreground to the host", () => {
    const { container } = render(<Icon asset={arrow} />);
    const icon = container.querySelector('[data-icon="icon/arrow-down"]') as HTMLElement;
    expect(icon).toHaveAttribute("data-rain-id", "icon");
    expect(icon).toHaveAttribute("data-icon-color-mode", "host");
    expect(icon.style.maskImage).toContain("/icons/arrow-down.svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon.querySelector("svg, img")).toBeNull();
    expect(icon).not.toHaveAttribute("tabindex");
  });

  it("does not insert colliding mask IDs when the same asset appears twice", () => {
    const { container } = render(<><Icon asset={arrow} /><Icon asset={arrow} /></>);
    expect(container.querySelectorAll('[data-icon="icon/arrow-down"]')).toHaveLength(2);
    expect(container.querySelectorAll("[id]")).toHaveLength(0);
  });

  it("exposes meaningful standalone information only with an accessible label", () => {
    render(<Icon asset={arrow} label="更多内容" />);
    expect(screen.getByRole("img", { name: "更多内容" })).not.toHaveAttribute("aria-hidden");
  });

  it("preserves intrinsic images without applying a host color mask", () => {
    const { container } = render(<Icon asset={{ ...arrow, colorMode: "intrinsic", rendering: "image" }} />);
    const icon = container.firstElementChild as HTMLElement;
    expect(icon.style.maskImage).toBe("");
    expect(icon.querySelector("img")).toHaveAttribute("src", arrow.src);
    expect(icon.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("supports explicit preview size and forwards the root ref", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Icon ref={ref} asset={arrow} size={32} className="preview" />);
    expect(ref.current).toHaveStyle({ width: "32px", height: "32px" });
    expect(ref.current).toHaveClass("rain-icon", "preview");
  });

  it("leaves unspecified size and animation to the containing component", () => {
    const { container } = render(<Icon asset={{ ...arrow, assetId: "icon/button-loading", rendering: "png-mask" }} />);
    const icon = container.firstElementChild as HTMLElement;
    expect(icon.style.width).toBe("");
    expect(icon.style.animation).toBe("");
    expect(icon.style.opacity).toBe("");
  });
});
