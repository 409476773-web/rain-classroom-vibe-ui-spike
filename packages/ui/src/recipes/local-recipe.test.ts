import { describe, expect, it } from "vitest";

import {
  defineRainLocalRecipe,
  getRainLocalRecipePart,
  type RainLocalRecipe,
} from "./local-recipe";

type ButtonPart = "root" | "label" | "leading-icon";

describe("Rain Local Recipe", () => {
  it("records the complete feature-scoped contract and retrieves declared Part classes", () => {
    const recipe: RainLocalRecipe<ButtonPart> = defineRainLocalRecipe({
      id: "search-operation-button",
      scope: "feature",
      origin: "ui-button",
      classes: {
        root: "bg-rain-surface-subtle",
        label: "text-rain-text-primary",
      },
      modifiedParts: ["root", "label"],
      candidateTokens: ["--rain-local-search-operation-button-surface"],
      promotionStatus: "not-proposed",
    });

    expect(recipe).toMatchObject({
      id: "search-operation-button",
      scope: "feature",
      origin: "ui-button",
      classes: {
        root: "bg-rain-surface-subtle",
        label: "text-rain-text-primary",
      },
      modifiedParts: ["root", "label"],
      candidateTokens: ["--rain-local-search-operation-button-surface"],
      promotionStatus: "not-proposed",
    });
    expect(getRainLocalRecipePart(recipe, "root")).toBe(
      "bg-rain-surface-subtle",
    );
    expect(getRainLocalRecipePart(recipe, "leading-icon")).toBeUndefined();
  });

  it("rejects inline declarations and undeclared modified Part mappings", () => {
    expect(() =>
      defineRainLocalRecipe<ButtonPart>({
        id: "unsafe-inline-style",
        scope: "feature",
        origin: "ui-button",
        classes: { root: "background-color: red;" },
        modifiedParts: ["root"],
        candidateTokens: [],
        promotionStatus: "not-proposed",
      }),
    ).toThrow(/class names, not inline style declarations/i);

    expect(() =>
      defineRainLocalRecipe<ButtonPart>({
        id: "missing-part-declaration",
        scope: "feature",
        origin: "ui-button",
        classes: { label: "text-rain-text-primary" },
        modifiedParts: ["root"],
        candidateTokens: [],
        promotionStatus: "not-proposed",
      }),
    ).toThrow(/modifiedParts/i);
  });

  it("keeps inline-style fields and non-local candidate Tokens out of the type", () => {
    if (false) {
      defineRainLocalRecipe<ButtonPart>({
        id: "typed-boundary",
        scope: "feature",
        origin: "ui-button",
        classes: { root: "bg-rain-surface-panel" },
        modifiedParts: ["root"],
        candidateTokens: [],
        promotionStatus: "not-proposed",
        // @ts-expect-error Local Recipes expose class lists, never inline styles.
        styles: { root: { backgroundColor: "red" } },
      });

      defineRainLocalRecipe<ButtonPart>({
        id: "typed-token-boundary",
        scope: "feature",
        origin: "ui-button",
        classes: { root: "bg-rain-surface-panel" },
        modifiedParts: ["root"],
        // @ts-expect-error Candidate Tokens must remain feature-local.
        candidateTokens: ["--rain-button-background"],
        promotionStatus: "not-proposed",
      });
    }

    expect(true).toBe(true);
  });
});
