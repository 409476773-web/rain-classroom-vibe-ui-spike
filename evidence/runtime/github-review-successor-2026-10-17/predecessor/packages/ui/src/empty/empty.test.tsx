import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import * as UI from "../index";

it("provides a static default title and decorative original artwork", () => {
  const { container } = render(<UI.Empty />);
  expect(screen.getByRole("heading", { name: "暂无内容", level: 3 })).toBeInTheDocument();
  expect(container.querySelector('[data-slot="media"]')).toHaveAttribute("data-illustration", "empty-box");
  const images = container.querySelectorAll("img");
  expect(images).toHaveLength(2);
  for (const image of images) {
    expect(image).toHaveAttribute("alt", "");
    expect(image.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(image).toHaveAttribute("draggable", "false");
  }
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(container.querySelector('[aria-live], [role="status"]')).toBeNull();
});

it("keeps the supplied description and keyboard action through every presentation", async () => {
  expect(UI.EmptyMedia).toBeDefined();
  const action = vi.fn(), user = userEvent.setup(), ref = createRef<HTMLDivElement>();
  const content = (presentation: "illustration" | "simple" | "text") => <UI.Empty presentation={presentation} ref={ref}>
    <UI.EmptyMedia /><UI.EmptyTitle>没有匹配结果</UI.EmptyTitle><UI.EmptyDescription>请调整关键词或筛选条件。</UI.EmptyDescription>
    <UI.EmptyActions><UI.Button onClick={action}>清除筛选</UI.Button></UI.EmptyActions>
  </UI.Empty>;
  const { rerender } = render(content("illustration"));
  for (const presentation of ["illustration", "simple", "text"] as const) {
    rerender(content(presentation));
    expect(screen.getByText("请调整关键词或筛选条件。")).toBeVisible();
    const media = ref.current!.querySelector('[data-slot="media"]');
    if (presentation === "text") expect(media).toBeNull();
    else expect(media).toHaveAttribute("data-illustration", presentation === "simple" ? "simple" : "empty-box");
    const button = screen.getByRole("button", { name: "清除筛选" });
    button.focus();
    await user.keyboard("{Enter}");
  }
  expect(action).toHaveBeenCalledTimes(3);
});

it("preserves native title semantics and refs without duplicating composed content", () => {
  const ref = createRef<HTMLElement>();
  render(<UI.Empty><UI.EmptyTitle as="h2" ref={ref}>暂无成员</UI.EmptyTitle></UI.Empty>);
  expect(screen.getByRole("heading", { level: 2, name: "暂无成员" })).toBe(ref.current);
  expect(screen.queryByText("暂无内容")).not.toBeInTheDocument();
});

it("allows custom decorative media and isolates nested presentation defaults", () => {
  expect(UI.EmptyMedia).toBeDefined();
  const { container } = render(<UI.Empty presentation="simple"><UI.EmptyMedia><svg data-testid="custom" /></UI.EmptyMedia>
    <UI.EmptyTitle>暂无内容</UI.EmptyTitle><UI.EmptyActions><UI.Empty /></UI.EmptyActions>
  </UI.Empty>);
  expect(screen.getByTestId("custom").closest('[aria-hidden="true"]')).not.toBeNull();
  const media = container.querySelectorAll('[data-slot="media"]');
  expect(media).toHaveLength(2);
  expect(media[0]!.querySelector("img")).toBeNull();
  expect(media[1]).toHaveAttribute("data-illustration", "empty-box");
});
