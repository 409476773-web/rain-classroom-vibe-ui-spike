import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card/card";
import { Surface } from "./surface";

describe("Surface", () => {
  it.each(["page", "panel", "raised"] as const)(
    "exposes the %s visual layer without taking layout ownership",
    (variant) => {
      const { container } = render(<Surface variant={variant}>内容</Surface>);
      const surface = container.querySelector('[data-rain-id="ui-surface"]');
      expect(surface).toHaveAttribute("data-slot", "root");
      expect(surface).toHaveAttribute("data-variant", variant);
      expect(surface).not.toHaveAttribute("data-layout");
    },
  );

  it("supports a bounded semantic root", () => {
    render(
      <Surface aria-label="课程工作区" as="main" variant="page">
        内容
      </Surface>,
    );
    expect(screen.getByRole("main", { name: "课程工作区" })).toBeVisible();
  });
});

describe("Card", () => {
  it("represents an independent object through explicit compound parts", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle as="h2">课程资源包</CardTitle>
          <CardDescription>课程资料 · 24 个文件</CardDescription>
          <CardAction>更新于今天</CardAction>
        </CardHeader>
        <CardContent>对象内容</CardContent>
        <CardFooter>专业必修</CardFooter>
      </Card>,
    );
    const card = container.querySelector('[data-rain-id="ui-card"]');
    expect(card?.tagName).toBe("ARTICLE");
    expect(card).toHaveAttribute("data-variant", "panel");
    expect(screen.getByRole("heading", { level: 2, name: "课程资源包" })).toHaveAttribute(
      "data-slot",
      "title",
    );
    for (const slot of ["header", "description", "action", "content", "footer"]) {
      expect(container.querySelector(`[data-slot="${slot}"]`)).toBeInTheDocument();
    }
  });

  it("does not turn the Card root into an action", () => {
    const { container } = render(<Card variant="raised">课堂回顾</Card>);
    const card = container.querySelector('[data-rain-id="ui-card"]');
    expect(card).toHaveAttribute("data-variant", "raised");
    expect(card).not.toHaveAttribute("role", "button");
    expect(card).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("button")).toBeNull();
  });
});

