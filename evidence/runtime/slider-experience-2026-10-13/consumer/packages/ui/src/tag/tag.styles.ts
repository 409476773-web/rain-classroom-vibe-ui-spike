import { iconSizeClassNames, tagSizeClassNames, tagSizeRecipes, type TagColorProfile, type TagSize } from "@rain-next/foundations";
import { rainCn } from "../utils/rain-class-names";

export type TagAppearance = "outlined" | "filled" | "solid";
export type TagTone = "neutral" | "brand";
export type TagColor = TagTone | TagColorProfile;
export type TagPart = "root" | "content" | "label" | "leading-icon" | "selection-mark" | "remove-action" | "main-action" | "input";

export const tagColorPaints = {
  neutral: { text: "text-rain-category-text-neutral-3", icon: "text-rain-category-icon-neutral-2", filled: "bg-rain-category-fill-neutral-alpha-6", border: "border-rain-category-border-neutral-3", solid: "bg-rain-category-fill-tagslate-solid-1", overlay: "bg-rain-category-fill-neutral-solid-2", close: "hover:bg-rain-category-fill-tagneutralaction-alpha-1 active:bg-rain-category-fill-tagneutralaction-alpha-2" },
  brand: { text: "text-rain-category-text-brand-1", icon: "text-rain-category-icon-brand-1", filled: "bg-rain-category-fill-brand-alpha-4", border: "border-rain-category-border-brand-3", solid: "bg-rain-category-fill-brand-solid-1", close: "hover:bg-rain-category-fill-tagbrandaction-alpha-1 active:bg-rain-category-fill-tagbrandaction-alpha-2" },
  "classroom": { text: "text-rain-category-text-tagclassroom-1", icon: "text-rain-category-icon-tagclassroom-1", filled: "bg-rain-category-fill-tagclassroom-alpha-1", border: "border-rain-category-border-tagclassroom-1", solid: "bg-rain-category-fill-tagclassroom-solid-1", close: "hover:bg-rain-category-fill-tagclassroom-alpha-2 active:bg-rain-category-fill-tagclassroom-alpha-3" },
  "olive": { text: "text-rain-category-text-tagolive-1", icon: "text-rain-category-icon-tagolive-1", filled: "bg-rain-category-fill-tagolive-alpha-1", border: "border-rain-category-border-tagolive-1", solid: "bg-rain-category-fill-tagolive-solid-1", close: "hover:bg-rain-category-fill-tagolive-alpha-2 active:bg-rain-category-fill-tagolive-alpha-3" },
  "paper": { text: "text-rain-category-text-tagpaper-1", icon: "text-rain-category-icon-tagpaper-1", filled: "bg-rain-category-fill-tagpaper-alpha-1", border: "border-rain-category-border-tagpaper-1", solid: "bg-rain-category-fill-tagpaper-solid-1", close: "hover:bg-rain-category-fill-tagpaper-alpha-2 active:bg-rain-category-fill-tagpaper-alpha-3" },
  "exam": { text: "text-rain-category-text-tagexam-1", icon: "text-rain-category-icon-tagexam-1", filled: "bg-rain-category-fill-tagexam-alpha-1", border: "border-rain-category-border-tagexam-1", solid: "bg-rain-category-fill-tagexam-solid-1", close: "hover:bg-rain-category-fill-tagexam-alpha-2 active:bg-rain-category-fill-tagexam-alpha-3" },
  "courseware": { text: "text-rain-category-text-tagcourseware-1", icon: "text-rain-category-icon-tagcourseware-1", filled: "bg-rain-category-fill-tagcourseware-alpha-1", border: "border-rain-category-border-tagcourseware-1", solid: "bg-rain-category-fill-tagcourseware-solid-1", close: "hover:bg-rain-category-fill-tagcourseware-alpha-2 active:bg-rain-category-fill-tagcourseware-alpha-3" },
  "gold": { text: "text-rain-category-text-taggold-1", icon: "text-rain-category-icon-taggold-1", filled: "bg-rain-category-fill-taggold-alpha-1", border: "border-rain-category-border-taggold-1", solid: "bg-rain-category-fill-taggold-solid-1", close: "hover:bg-rain-category-fill-taggold-alpha-2 active:bg-rain-category-fill-taggold-alpha-3" },
  "purple": { text: "text-rain-category-text-tagpurple-1", icon: "text-rain-category-icon-tagpurple-1", filled: "bg-rain-category-fill-tagpurple-alpha-1", border: "border-rain-category-border-tagpurple-1", solid: "bg-rain-category-fill-tagpurple-solid-1", close: "hover:bg-rain-category-fill-tagpurple-alpha-2 active:bg-rain-category-fill-tagpurple-alpha-3" },
  "assignment": { text: "text-rain-category-text-tagassignment-1", icon: "text-rain-category-icon-tagassignment-1", filled: "bg-rain-category-fill-tagassignment-alpha-1", border: "border-rain-category-border-tagassignment-1", solid: "bg-rain-category-fill-tagassignment-solid-1", close: "hover:bg-rain-category-fill-tagassignment-alpha-2 active:bg-rain-category-fill-tagassignment-alpha-3" },
  "live": { text: "text-rain-category-text-taglive-1", icon: "text-rain-category-icon-taglive-1", filled: "bg-rain-category-fill-taglive-alpha-1", border: "border-rain-category-border-taglive-1", solid: "bg-rain-category-fill-taglive-solid-1", close: "hover:bg-rain-category-fill-taglive-alpha-2 active:bg-rain-category-fill-taglive-alpha-3" },
  "audio": { text: "text-rain-category-text-tagaudio-1", icon: "text-rain-category-icon-tagaudio-1", filled: "bg-rain-category-fill-tagaudio-alpha-1", border: "border-rain-category-border-tagaudio-1", solid: "bg-rain-category-fill-tagaudio-solid-1", close: "hover:bg-rain-category-fill-tagaudio-alpha-2 active:bg-rain-category-fill-tagaudio-alpha-3" },
  "magenta": { text: "text-rain-category-text-tagmagenta-1", icon: "text-rain-category-icon-tagmagenta-1", filled: "bg-rain-category-fill-tagmagenta-alpha-1", border: "border-rain-category-border-tagmagenta-1", solid: "bg-rain-category-fill-tagmagenta-solid-1", close: "hover:bg-rain-category-fill-tagmagenta-alpha-2 active:bg-rain-category-fill-tagmagenta-alpha-3" },
  "brown": { text: "text-rain-category-text-tagbrown-1", icon: "text-rain-category-icon-tagbrown-1", filled: "bg-rain-category-fill-tagbrown-alpha-1", border: "border-rain-category-border-tagbrown-1", solid: "bg-rain-category-fill-tagbrown-solid-1", close: "hover:bg-rain-category-fill-tagbrown-alpha-2 active:bg-rain-category-fill-tagbrown-alpha-3" },
  "vote": { text: "text-rain-category-text-tagvote-1", icon: "text-rain-category-icon-tagvote-1", filled: "bg-rain-category-fill-tagvote-alpha-1", border: "border-rain-category-border-tagvote-1", solid: "bg-rain-category-fill-tagvote-solid-1", close: "hover:bg-rain-category-fill-tagvote-alpha-2 active:bg-rain-category-fill-tagvote-alpha-3" },
  "self-test": { text: "text-rain-category-text-tagselftest-1", icon: "text-rain-category-icon-tagselftest-1", filled: "bg-rain-category-fill-tagselftest-alpha-1", border: "border-rain-category-border-tagselftest-1", solid: "bg-rain-category-fill-tagselftest-solid-1", close: "hover:bg-rain-category-fill-tagselftest-alpha-2 active:bg-rain-category-fill-tagselftest-alpha-3" },
  "slate": { text: "text-rain-category-text-tagslate-1", icon: "text-rain-category-icon-tagslate-1", filled: "bg-rain-category-fill-tagslate-alpha-1", border: "border-rain-category-border-tagslate-1", solid: "bg-rain-category-fill-tagslate-solid-1", close: "hover:bg-rain-category-fill-tagslate-alpha-2 active:bg-rain-category-fill-tagslate-alpha-3" },
  "difficulty1": { text: "text-rain-category-text-tagdifficulty1-1", icon: "text-rain-category-icon-tagdifficulty1-1", filled: "bg-rain-category-fill-tagdifficulty1-alpha-1", border: "border-rain-category-border-tagdifficulty1-1", solid: "bg-rain-category-fill-tagdifficulty1-solid-1", close: "hover:bg-rain-category-fill-tagdifficulty1-alpha-2 active:bg-rain-category-fill-tagdifficulty1-alpha-3" },
  "difficulty2": { text: "text-rain-category-text-tagdifficulty2-1", icon: "text-rain-category-icon-tagdifficulty2-1", filled: "bg-rain-category-fill-tagdifficulty2-alpha-1", border: "border-rain-category-border-tagdifficulty2-1", solid: "bg-rain-category-fill-tagdifficulty2-solid-1", close: "hover:bg-rain-category-fill-tagdifficulty2-alpha-2 active:bg-rain-category-fill-tagdifficulty2-alpha-3" },
  "difficulty3": { text: "text-rain-category-text-tagdifficulty3-1", icon: "text-rain-category-icon-tagdifficulty3-1", filled: "bg-rain-category-fill-tagdifficulty3-alpha-1", border: "border-rain-category-border-tagdifficulty3-1", solid: "bg-rain-category-fill-tagdifficulty3-solid-1", close: "hover:bg-rain-category-fill-tagdifficulty3-alpha-2 active:bg-rain-category-fill-tagdifficulty3-alpha-3" },
  "difficulty4": { text: "text-rain-category-text-tagdifficulty4-1", icon: "text-rain-category-icon-tagdifficulty4-1", filled: "bg-rain-category-fill-tagdifficulty4-alpha-1", border: "border-rain-category-border-tagdifficulty4-1", solid: "bg-rain-category-fill-tagdifficulty4-solid-1", close: "hover:bg-rain-category-fill-tagdifficulty4-alpha-2 active:bg-rain-category-fill-tagdifficulty4-alpha-3" },
  "difficulty5": { text: "text-rain-category-text-tagdifficulty5-1", icon: "text-rain-category-icon-tagdifficulty5-1", filled: "bg-rain-category-fill-tagdifficulty5-alpha-1", border: "border-rain-category-border-tagdifficulty5-1", solid: "bg-rain-category-fill-tagdifficulty5-solid-1", close: "hover:bg-rain-category-fill-tagdifficulty5-alpha-2 active:bg-rain-category-fill-tagdifficulty5-alpha-3" },
} as const;

export const tagSolidPaints = {
  neutral: { text: "text-rain-category-oncolor-1", icon: "text-rain-category-oncolor-1", close: "hover:bg-rain-category-fill-tagsolidaction-alpha-1 active:bg-rain-category-fill-tagsolidaction-alpha-2" },
  colored: { text: "text-rain-category-oncolor-1", icon: "text-rain-category-oncolor-1", close: "hover:bg-rain-category-fill-tagsolidaction-alpha-1 active:bg-rain-category-fill-tagsolidaction-alpha-2" },
} as const;

const sizeRecipes = {
  20: "px-rain-6 rounded-rain-4 text-rain-size-12 leading-rain-14",
  24: "px-rain-8 rounded-rain-6 text-rain-size-13 leading-rain-18",
  28: "px-rain-12 rounded-rain-6 text-rain-size-13 leading-rain-18",
} as const;

export function getTagRecipe(color: TagColor, appearance: TagAppearance, size: TagSize, selected = false) {
  if (!Object.hasOwn(tagColorPaints, color) || !["filled", "outlined", "solid"].includes(appearance)
    || typeof size !== "number" || !Object.hasOwn(sizeRecipes, size)) throw new Error("Tag requires a registered color, appearance and size (20, 24 or 28).");
  const resolvedColor = selected && (color === "neutral" || color === "brand") ? "brand" : color;
  const paint = tagColorPaints[resolvedColor];
  const solid = appearance === "solid", neutralSolid = solid && resolvedColor === "neutral";
  const foreground = solid ? tagSolidPaints[neutralSolid ? "neutral" : "colored"] : paint;
  const iconFrame = "inline-flex flex-none items-center justify-center [&>.rain-icon]:size-full";
  const surface = rainCn("rain-tag relative box-border inline-flex max-w-full items-center align-middle whitespace-nowrap border-solid border-rain-line-1 border-transparent font-rain-ui tracking-rain-default normal-nums",
    solid ? "font-rain-bold" : "font-rain-regular", foreground.text,
    solid ? paint.solid : appearance === "filled" ? paint.filled : "bg-transparent",
    appearance === "outlined" || selected && appearance === "filled" ? paint.border : undefined);
  return {
    surface,
    root: rainCn(surface, "min-w-rain-0", tagSizeClassNames[size], sizeRecipes[size]),
    icon: rainCn(iconFrame, iconSizeClassNames[tagSizeRecipes[size].icon], foreground.icon),
    selectionIcon: rainCn(iconFrame, iconSizeClassNames[tagSizeRecipes[size].selectionIcon], foreground.icon),
    close: rainCn("rain-tag__remove inline-flex flex-none self-stretch aspect-square items-center justify-center border-none bg-transparent p-rain-0 rounded-rain-4 cursor-pointer disabled:cursor-not-allowed",
      foreground.icon, foreground.close),
    overlay: rainCn("rain-tag__overlay absolute inset-0 pointer-events-none mix-blend-multiply", resolvedColor === "neutral" && !solid ? tagColorPaints.neutral.overlay : paint.solid),
  };
}

export const tagContentClassName = "inline-flex min-w-rain-0 items-center gap-rain-4";
