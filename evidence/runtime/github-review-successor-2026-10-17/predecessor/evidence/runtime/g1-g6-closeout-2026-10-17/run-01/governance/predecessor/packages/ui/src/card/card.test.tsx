import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DensityProvider } from "@rain-next/foundations";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { defineRainLocalRecipe } from "../recipes/local-recipe";

const insetRecipe = defineRainLocalRecipe({
  id: "card-test-inset", scope: "feature", origin: "ui-card",
  classes: { content: "px-rain-0", title: "text-rain-size-18" },
  modifiedParts: ["content", "title"], candidateTokens: [], promotionStatus: "not-proposed",
});

describe("Card V2 contract", () => {
  it("defaults its own size independently of compact Density", () => {
    render(<DensityProvider density="compact"><Card aria-label="Default"><CardContent>Content</CardContent></Card></DensityProvider>);
    expect(screen.getByRole("article", { name: "Default" })).toHaveAttribute("data-size", "default");
  });

  it("exposes the small Card size as configuration, not native state", () => {
    render(<Card aria-label="Small" size="sm"><CardContent>Content</CardContent></Card>);
    const card = screen.getByRole("article", { name: "Small" });
    expect(card).toHaveAttribute("data-size", "sm");
    expect(card).not.toHaveAttribute("size");
    expect(card).not.toHaveAttribute("tabindex");
    expect(card).not.toHaveAttribute("data-state");
  });

  it("applies one root Recipe to owned parts through ordinary wrappers", () => {
    render(<Card aria-label="Target" localRecipe={insetRecipe}>
      <div><CardHeader><CardTitle>Title</CardTitle></CardHeader><CardContent data-testid="owned">Content</CardContent></div>
    </Card>);
    expect(screen.getByRole("article")).toHaveAttribute("data-local-recipe", "card-test-inset");
    expect(screen.getByTestId("owned")).toHaveClass("px-rain-0");
    expect(screen.getByTestId("owned").className).not.toContain("px-(--rain-card-spacing)");
    expect(screen.getByRole("heading")).toHaveClass("text-rain-size-18");
    expect(screen.getByRole("article")).not.toHaveAttribute("localRecipe");
  });

  it("resets recipe ownership at a nested Card and an unrelated sibling", () => {
    render(<><Card localRecipe={insetRecipe}><CardContent data-testid="outer">
      <Card><CardContent data-testid="inner">Nested</CardContent></Card>
    </CardContent></Card><Card><CardContent data-testid="sibling">Sibling</CardContent></Card></>);
    expect(screen.getByTestId("outer")).toHaveClass("px-rain-0");
    expect(screen.getByTestId("inner")).not.toHaveClass("px-rain-0");
    expect(screen.getByTestId("sibling")).not.toHaveClass("px-rain-0");
  });

  it("preserves all native refs, names, events and meaningful elements", () => {
    const root = createRef<HTMLElement>(); const title = createRef<HTMLElement>();
    const header = createRef<HTMLDivElement>(); const content = createRef<HTMLDivElement>();
    const action = createRef<HTMLDivElement>(); const description = createRef<HTMLParagraphElement>();
    const footer = createRef<HTMLElement>(); const click = vi.fn();
    render(<Card aria-labelledby="card-heading" ref={root} variant="raised">
      <CardHeader ref={header}><CardTitle as="h2" id="card-heading" ref={title}>Course</CardTitle>
        <CardDescription ref={description}>Description</CardDescription><CardAction ref={action}><button onClick={click}>Open</button></CardAction>
      </CardHeader><CardContent ref={content}>Body</CardContent><CardFooter ref={footer}>Footer</CardFooter>
    </Card>);
    expect(screen.getByRole("article", { name: "Course" })).toBe(root.current);
    expect(screen.getByRole("heading", { level: 2 })).toBe(title.current);
    for (const ref of [header, content, action, description, footer]) expect(ref.current).toBeInTheDocument();
    expect(description.current?.tagName).toBe("P"); expect(footer.current?.tagName).toBe("FOOTER");
    fireEvent.click(screen.getByRole("button", { name: "Open" })); expect(click).toHaveBeenCalledTimes(1);
    expect(root.current).toHaveAttribute("data-variant", "raised");
  });
});
