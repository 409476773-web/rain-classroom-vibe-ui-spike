import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../card/card";
import type {
  BadgeProps,
  BadgeVariant,
  ButtonProps,
  ButtonVariant,
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
  CardVariant,
  InputProps,
  SurfaceElement,
  SurfaceProps,
  SurfaceVariant,
  TagProps,
  TagVariant,
} from "@rain-next/ui";
import { Surface } from "./surface";

type PublicUiProps =
  | BadgeProps
  | ButtonProps
  | CardContentProps
  | CardDescriptionProps
  | CardFooterProps
  | CardHeaderProps
  | CardProps
  | CardTitleProps
  | InputProps
  | SurfaceProps
  | TagProps;

type PublicUiVariant =
  | BadgeVariant
  | ButtonVariant
  | CardVariant
  | SurfaceElement
  | SurfaceVariant
  | TagVariant;

describe("Surface", () => {
  it("keeps every public Props and Variant contract available from the package barrel", () => {
    const props: PublicUiProps = { children: "公开合同" };
    const variant: PublicUiVariant = "panel";

    expect(props).toEqual({ children: "公开合同" });
    expect(variant).toBe("panel");
  });

  it.each(["page", "panel", "raised"] as const)(
    "exposes the %s surface level through stable trace attributes",
    (variant) => {
      const { container } = render(
        <Surface variant={variant}>{variant} 内容</Surface>,
      );

      const surface = container.querySelector('[data-rain-id="ui-surface"]');
      expect(surface).toBeInTheDocument();
      expect(screen.getByText(`${variant} 内容`)).toBeVisible();
      expect(surface).toHaveAttribute("data-rain-id", "ui-surface");
      expect(surface).toHaveAttribute("data-slot", "surface");
      expect(surface).toHaveAttribute("data-variant", variant);
    },
  );

  it("supports an optional semantic root while forwarding its semantics", () => {
    render(
      <Surface as="main" variant="page" aria-label="课程内容">
        <p data-testid="surface-content">课程内容正文</p>
      </Surface>,
    );

    const surface = screen.getByRole("main", { name: "课程内容" });
    expect(surface).toHaveAttribute("data-rain-id", "ui-surface");
    expect(surface).toHaveAttribute("data-variant", "page");
    expect(screen.getByTestId("surface-content").parentElement).toBe(surface);
    expect(surface).not.toHaveAttribute("data-layout");
  });
});

describe("Card", () => {
  it("exposes panel and raised presentation without changing object semantics", () => {
    const { rerender, container } = render(<Card variant="panel">Panel card</Card>);

    expect(container.querySelector('[data-rain-id="ui-card"]')).toHaveAttribute(
      "data-variant",
      "panel",
    );

    rerender(<Card variant="raised">Raised card</Card>);
    const raisedCard = container.querySelector('[data-rain-id="ui-card"]');
    expect(raisedCard).toHaveAttribute("data-variant", "raised");
    expect(raisedCard?.tagName).toBe("ARTICLE");
    expect(raisedCard).not.toHaveAttribute("role", "button");
  });

  it("represents an independent object with explicit semantic parts", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>高等数学课程资源</CardTitle>
          <CardDescription>课程资料 · 24 个文件</CardDescription>
        </CardHeader>
        <CardContent>最近更新：今天 09:30</CardContent>
        <CardFooter>归属：专业必修</CardFooter>
      </Card>,
    );

    const card = container.querySelector('[data-rain-id="ui-card"]');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card?.tagName).toBe("ARTICLE");

    expect(container.querySelector('[data-slot="card-header"]')).toBeInTheDocument();
    expect(screen.getByText("高等数学课程资源")).toHaveAttribute(
      "data-slot",
      "card-title",
    );
    expect(screen.getByText("课程资料 · 24 个文件")).toHaveAttribute(
      "data-slot",
      "card-description",
    );
    expect(screen.getByText("最近更新：今天 09:30")).toHaveAttribute(
      "data-slot",
      "card-content",
    );
    expect(screen.getByText("归属：专业必修")).toHaveAttribute(
      "data-slot",
      "card-footer",
    );
  });

  it("keeps the Card root non-interactive instead of masquerading as a control", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>课堂回顾</CardTitle>
        </CardHeader>
        <CardContent>独立对象内容</CardContent>
      </Card>,
    );

    const card = container.querySelector('[data-rain-id="ui-card"]');
    expect(card).toBeInTheDocument();
    expect(card?.tagName).toBe("ARTICLE");
    expect(card).not.toHaveAttribute("role", "button");
    expect(card).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
