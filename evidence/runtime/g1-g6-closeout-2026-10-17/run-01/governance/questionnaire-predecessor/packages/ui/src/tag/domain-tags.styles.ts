import { tagShapeClassNames, type TagShape } from "@rain-next/foundations";
import { rainCn } from "../utils/rain-class-names";
import { getTagRecipe, type TagAppearance, type TagColor } from "./tag.styles";

export const tagStatusPaints = {
  进行中: { filled: "bg-rain-category-fill-tagongoing-alpha-1 text-rain-category-text-tagongoing-1", solid: "bg-rain-category-fill-tagongoing-solid-1 text-rain-category-oncolor-tagongoing-1", dot: "text-rain-category-icon-tagongoing-1" },
  未提交: { filled: "bg-rain-category-fill-tagunsubmitted-alpha-1 text-rain-category-text-tagunsubmitted-1", solid: "bg-rain-category-fill-tagunsubmitted-solid-1 text-rain-category-oncolor-1" },
  已结束: { filled: "bg-rain-category-fill-tagended-1 text-rain-category-text-tagended-1", solid: "bg-rain-category-fill-tagslate-solid-1 text-rain-category-oncolor-1" },
} as const;
export const tagDomainPaints = {
  batch: "bg-rain-category-fill-tagbatch-solid-1 text-rain-category-oncolor-1",
  reminder: "text-rain-category-icon-tagreminder-1 border-rain-category-border-tagreminder-1",
  badge: "text-rain-category-oncolor-1",
  solidBadge: "bg-rain-tag-score-badge",
} as const;

export function getDomainTagRecipe(color: TagColor, appearance: TagAppearance, shape: TagShape) {
  if (!Object.hasOwn(tagShapeClassNames, shape)) throw new Error("Tag requires a registered shape.");
  return rainCn(getTagRecipe(color, appearance, 24).surface, tagShapeClassNames[shape], "justify-center text-center");
}
