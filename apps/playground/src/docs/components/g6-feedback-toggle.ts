import { defineRainLocalRecipe, type ButtonPart } from "@rain-next/ui";
import "./g6-feedback-toggle.css";

export const feedbackToggleRecipe = defineRainLocalRecipe<ButtonPart, "ui-button">({
  id: "g6-feedback-toggle", scope: "feature", origin: "ui-button",
  classes: { root: "g6-feedback-toggle", label: "g6-feedback-toggle-label", "leading-icon": "g6-feedback-toggle-icon" },
  modifiedParts: ["root", "label", "leading-icon"], candidateTokens: [], promotionStatus: "not-proposed",
});
