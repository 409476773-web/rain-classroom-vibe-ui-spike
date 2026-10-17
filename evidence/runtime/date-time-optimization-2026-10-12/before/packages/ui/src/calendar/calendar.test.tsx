import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Calendar } from "./calendar";

it("uses a Chinese Monday-first grid and the real month/year Select controls", async () => {
  const user = userEvent.setup();
  render(<Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} />);
  expect(screen.getAllByRole("columnheader", { hidden: true })[0]).toHaveTextContent("一");
  await user.click(screen.getByRole("combobox", { name: "选择月份" }));
  await user.click(screen.getByRole("option", { name: "11月" }));
  expect(screen.getByRole("button", { name: /^2026年11月12日/ })).toBeVisible();
});

it("keeps the engine's disabled-day and keyboard selection behavior", async () => {
  const user = userEvent.setup(), selected = vi.fn();
  render(<Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} disabled={new Date(2026, 9, 13)} onSelect={selected} />);
  expect(screen.getByRole("button", { name: /^2026年10月13日/ })).toBeDisabled();
  const day = screen.getByRole("button", { name: /^2026年10月12日/ });
  day.focus();
  await user.keyboard("{ArrowRight}{Enter}");
  expect(selected).toHaveBeenCalledWith(new Date(2026, 9, 14), expect.any(Date), expect.any(Object), expect.anything());
});

it("turns the engine animation off for reduced motion", () => {
  const original = window.matchMedia;
  window.matchMedia = vi.fn().mockReturnValue({ matches: true, addEventListener() {}, removeEventListener() {} });
  const { container } = render(<Calendar mode="single" animate defaultMonth={new Date(2026, 9, 1)} />);
  expect(container.querySelector('[data-rain-id="ui-calendar"]')).toBeInTheDocument();
  expect(container.querySelector("[data-animated-month]")).toBeNull();
  window.matchMedia = original;
});

it("retains the month animation cleanup chain and keyboard month navigation", async () => {
  const user = userEvent.setup();
  const { container } = render(<Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} />);
  await user.click(screen.getByRole("button", { name: "下个月" }));
  const previousCaption = container.querySelector('.rdp-caption_before_exit');
  expect(previousCaption).not.toBeNull();
  fireEvent.animationEnd(previousCaption!);
  expect(container.querySelector('[data-animated-month][aria-hidden="true"]')).toBeNull();
  const date = screen.getByRole("button", { name: /^2026年11月30日/ });
  date.focus(); await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("button", { name: /^2026年12月1日/ })).toHaveFocus();
});
