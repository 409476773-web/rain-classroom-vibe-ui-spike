import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DensityProvider } from "@rain-next/foundations";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "./progress";

describe("Progress", () => {
  it("connects its visible label and keeps the upstream track and indicator", () => {
    render(<Progress value={42} locale="en-US"><ProgressLabel>课件上传</ProgressLabel><ProgressValue /></Progress>);
    const root = screen.getByRole("progressbar", { name: "课件上传" });
    expect(root).toHaveAttribute("aria-labelledby", screen.getByText("课件上传").id);
    expect(root).toHaveAttribute("aria-valuenow", "42");
    expect(root).toHaveAttribute("aria-valuetext", "42%");
    expect(root).toHaveAttribute("data-rain-id", "ui-progress");
    expect(root).toHaveAttribute("data-slot", "root");
    expect(root).toHaveAttribute("data-state", "progressing");
    expect(root.querySelectorAll('[data-slot="progress-track"]')).toHaveLength(1);
    expect(root.querySelector('[data-slot="progress-indicator"]')).toHaveStyle({ width: "42%" });
    expect(screen.getByText("42%")).toHaveAttribute("data-slot", "progress-value");
  });

  it("preserves known zero and completion without inventing a label", () => {
    const view = render(<Progress value={0} aria-label="上传进度" locale="en-US"><ProgressValue /></Progress>);
    const root = screen.getByRole("progressbar", { name: "上传进度" });
    expect(root).toHaveAttribute("aria-valuenow", "0");
    expect(root).toHaveAttribute("data-progressing");
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(root.querySelector('[data-slot="progress-indicator"]')).toHaveStyle({ width: "0%" });
    view.rerender(<Progress value={100} aria-label="上传进度" locale="en-US"><ProgressValue /></Progress>);
    expect(root).toHaveAttribute("data-complete");
    expect(root).toHaveAttribute("data-state", "complete");
    expect(root).toHaveAttribute("aria-valuenow", "100");
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it.each([[-10, 0, "0%", "progressing"], [130, 100, "100%", "complete"]] as const)(
    "uses Base UI to clamp %s to %s",
    (value, clamped, formatted, status) => {
      render(<Progress value={value} aria-label="上传进度" locale="en-US"><ProgressValue /></Progress>);
      const root = screen.getByRole("progressbar");
      expect(root).toHaveAttribute("aria-valuenow", String(clamped));
      expect(root).toHaveAttribute("aria-valuetext", formatted);
      expect(root).toHaveAttribute("data-state", status);
      expect(root.querySelector('[data-slot="progress-indicator"]')).toHaveStyle({ width: formatted });
      expect(screen.getByText(formatted)).toBeInTheDocument();
    },
  );

  it("uses Base UI normalized percentages for a non-default range", () => {
    const view = render(<Progress min={25} max={125} value={75} aria-label="处理进度" locale="en-US"><ProgressValue /></Progress>);
    const root = screen.getByRole("progressbar");
    expect(root).toHaveAttribute("aria-valuemin", "25");
    expect(root).toHaveAttribute("aria-valuemax", "125");
    expect(root).toHaveAttribute("aria-valuenow", "75");
    expect(root).toHaveAttribute("aria-valuetext", "50%");
    expect(root.querySelector('[data-slot="progress-indicator"]')).toHaveStyle({ width: "50%" });
    expect(screen.getByText("50%")).toBeInTheDocument();
    view.rerender(<Progress min={25} max={125} value={180} aria-label="处理进度" locale="en-US"><ProgressValue /></Progress>);
    expect(root).toHaveAttribute("aria-valuenow", "125");
    expect(root).toHaveAttribute("data-complete");
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it.each([null, NaN, Infinity, -Infinity])("keeps %s indeterminate without a false reading", (value) => {
    render(<Progress value={value} aria-label="处理中" locale="en-US"><ProgressValue /></Progress>);
    const root = screen.getByRole("progressbar");
    expect(root).toHaveAttribute("data-indeterminate");
    expect(root).toHaveAttribute("data-state", "indeterminate");
    expect(root).not.toHaveAttribute("aria-valuenow");
    expect(root.querySelector('[data-slot="progress-value"]')).toBeEmptyDOMElement();
    expect(root.textContent).not.toMatch(/NaN|Infinity|\d+%/);
    expect(root.querySelector('[data-slot="progress-indicator"]')).not.toHaveAttribute("style");
  });

  it.each([[0, 0], [10, 0], [NaN, 100], [0, Infinity], [-Infinity, 100]])(
    "rejects an invalid range (%s, %s) before handing it to Base UI",
    (min, max) => {
      expect(() => render(<Progress min={min} max={max} value={50} aria-label="进度" />)).toThrowError(
        new RangeError("Progress requires finite min and max with min < max."),
      );
    },
  );

  it("keeps original locale, format and readable value callbacks", () => {
    const ariaValue = vi.fn((formatted: string, value: number | null) => `已处理 ${formatted}，原值 ${value}`);
    const valueText = vi.fn((formatted: string | null, value: number | null) => `${formatted} / ${value}`);
    render(<Progress min={10} max={30} value={40} locale="en-US" format={{ maximumFractionDigits: 0 }}
      getAriaValueText={ariaValue} aria-label="任务处理"><ProgressValue>{valueText}</ProgressValue></Progress>);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuetext", "已处理 30，原值 40");
    expect(screen.getByText("30 / 40")).toBeInTheDocument();
    expect(ariaValue).toHaveBeenCalledWith("30", 40);
    expect(valueText).toHaveBeenCalledWith("30", 40);
  });

  it("preserves density, refs, render, handlers and Base UI callback styles", () => {
    const ref = createRef<HTMLDivElement>(), labelRef = createRef<HTMLSpanElement>(), valueRef = createRef<HTMLSpanElement>();
    const click = vi.fn(), rootClass = vi.fn((state: { status: string }) => `owner-${state.status}`);
    const labelClass = vi.fn((state: { status: string }) => `label-${state.status}`);
    const view = render(<DensityProvider density="compact"><Progress ref={ref} value={12} onClick={click}
      className={rootClass} style={(state) => ({ opacity: state.status === "progressing" ? 0.8 : 1 })}
      render={<section data-testid="custom-progress" />}>
      <ProgressLabel ref={labelRef} className={labelClass}>课件上传</ProgressLabel>
      <ProgressValue ref={valueRef} />
    </Progress></DensityProvider>);
    const root = screen.getByRole("progressbar", { name: "课件上传" });
    expect(ref.current).toBe(root);
    expect(root.tagName).toBe("SECTION");
    expect(root).toHaveAttribute("data-density", "compact");
    expect(root).toHaveClass("rain-progress", "owner-progressing");
    expect(root).toHaveStyle({ opacity: "0.8" });
    expect(labelRef.current).toHaveClass("rain-progress-label", "label-progressing");
    expect(valueRef.current).toHaveAttribute("data-slot", "progress-value");
    fireEvent.click(root);
    expect(click).toHaveBeenCalledTimes(1);
    view.rerender(<Progress value={100} aria-label="完成" className={rootClass} />);
    expect(rootClass).toHaveBeenCalledWith({ status: "complete" });
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-density", "default");
  });

  it("retains ref and callback support on the exported track and indicator parts", () => {
    const trackRef = createRef<HTMLDivElement>(), indicatorRef = createRef<HTMLDivElement>();
    render(<Progress value={50} aria-label="独立 Parts">
      <ProgressTrack ref={trackRef} className={(state) => `track-${state.status}`} data-testid="custom-track">
        <ProgressIndicator ref={indicatorRef} className={(state) => `indicator-${state.status}`} />
      </ProgressTrack>
    </Progress>);
    expect(trackRef.current).toBe(screen.getByTestId("custom-track"));
    expect(trackRef.current).toHaveClass("rain-progress-track", "track-progressing");
    expect(indicatorRef.current).toHaveClass("rain-progress-indicator", "indicator-progressing");
    expect(indicatorRef.current).toHaveStyle({ width: "50%" });
  });
});
