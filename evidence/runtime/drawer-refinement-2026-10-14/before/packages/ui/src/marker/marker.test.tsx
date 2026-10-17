import { createRef, type MouseEvent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { Marker, MarkerContent, MarkerIcon, type MarkerPart } from "./marker";

describe("Marker render and recipe adaptation", () => {
  it("keeps a real link, its ref and merged native activation", async () => {
    const ref = createRef<HTMLAnchorElement>();
    const sourceClick = vi.fn();
    const hostClick = vi.fn((event: MouseEvent) => event.preventDefault());
    render(<Marker onClick={sourceClick} render={<a href="#course" ref={ref} onClick={hostClick} />}>
      <MarkerIcon>装饰</MarkerIcon><MarkerContent>查看整理结果</MarkerContent></Marker>);
    const link = screen.getByRole("link", { name: "查看整理结果" });
    expect(link).toBe(ref.current);
    expect(link).toHaveAttribute("href", "#course");
    const user = userEvent.setup();
    await user.tab();
    await user.keyboard("{Enter}");
    expect(hostClick).toHaveBeenCalledTimes(1);
    expect(sourceClick).toHaveBeenCalledTimes(1);
  });

  it("isolates a live status content recipe and leaves status semantics host-owned", () => {
    const recipe = defineRainLocalRecipe<MarkerPart, "ui-marker">({
      id: "course-status", scope: "feature", origin: "ui-marker",
      classes: { content: "rain-marker__content--shimmer" }, modifiedParts: ["content"],
      candidateTokens: [], promotionStatus: "not-proposed",
    });
    render(<><Marker role="status" localRecipe={recipe}><MarkerIcon>装饰</MarkerIcon>
      <MarkerContent>正在整理提问</MarkerContent></Marker>
      <Marker variant="separator"><MarkerContent>今天</MarkerContent></Marker></>);
    expect(screen.getByRole("status")).toHaveTextContent("正在整理提问");
    expect(screen.getByText("正在整理提问")).toHaveClass("rain-marker__content--shimmer");
    expect(screen.getByText("今天")).not.toHaveClass("rain-marker__content--shimmer");
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });
});
