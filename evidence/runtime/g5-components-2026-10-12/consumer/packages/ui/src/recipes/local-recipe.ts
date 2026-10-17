export type RainLocalCandidateToken = `--rain-local-${string}`;

export type RainLocalRecipePromotionStatus =
  | "not-proposed"
  | "proposed"
  | "accepted"
  | "rejected";

export interface RainLocalRecipe<
  PartName extends string,
  Origin extends string = string,
> {
  readonly id: string;
  readonly scope: "feature";
  readonly origin: Origin;
  readonly classes: Readonly<Partial<Record<PartName, string>>>;
  readonly modifiedParts: readonly PartName[];
  readonly candidateTokens: readonly RainLocalCandidateToken[];
  readonly promotionStatus: RainLocalRecipePromotionStatus;
}

const inlineStyleDeclaration =
  /[{};]|(?:^|\s)(?:background(?:-color)?|color|border(?:-[a-z]+)?|padding(?:-[a-z]+)?|margin(?:-[a-z]+)?|width|height|font(?:-[a-z]+)?)\s*:/i;

export function defineRainLocalRecipe<
  PartName extends string,
  Origin extends string = string,
>(
  recipe: RainLocalRecipe<PartName, Origin>,
): RainLocalRecipe<PartName, Origin> {
  if (!recipe.id.trim() || !recipe.origin.trim()) {
    throw new Error("A Rain Local Recipe requires non-empty id and origin fields.");
  }

  const modifiedParts = new Set<string>(recipe.modifiedParts);
  if (modifiedParts.size !== recipe.modifiedParts.length) {
    throw new Error("Rain Local Recipe modifiedParts must not contain duplicates.");
  }

  for (const [part, classNames] of Object.entries(recipe.classes)) {
    if (!modifiedParts.has(part)) {
      throw new Error(
        `Rain Local Recipe classes for \"${part}\" must be declared in modifiedParts.`,
      );
    }
    if (
      typeof classNames !== "string" ||
      !classNames.trim() ||
      inlineStyleDeclaration.test(classNames)
    ) {
      throw new Error(
        "Rain Local Recipe values must be class names, not inline style declarations.",
      );
    }
  }

  for (const token of recipe.candidateTokens) {
    if (!token.startsWith("--rain-local-")) {
      throw new Error(
        "Rain Local Recipe candidate Tokens must use the --rain-local- prefix.",
      );
    }
  }

  return Object.freeze({
    ...recipe,
    classes: Object.freeze({ ...recipe.classes }),
    modifiedParts: Object.freeze([...recipe.modifiedParts]),
    candidateTokens: Object.freeze([...recipe.candidateTokens]),
  });
}

export function getRainLocalRecipePart<
  PartName extends string,
  Origin extends string = string,
>(
  recipe: RainLocalRecipe<PartName, Origin> | undefined,
  part: PartName,
): string | undefined {
  return recipe?.classes[part];
}
