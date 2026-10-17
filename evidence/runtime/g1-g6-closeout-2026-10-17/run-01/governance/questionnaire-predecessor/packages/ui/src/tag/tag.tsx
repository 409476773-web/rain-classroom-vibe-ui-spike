import { forwardRef, type HTMLAttributes, type MouseEventHandler, type ReactNode } from "react";
import { useDensity, tagShapeClassNames, type TagSize } from "@rain-next/foundations";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { CloseIcon } from "../icons/close";
import { CheckBoldIcon } from "../icons/check-bold";
import { getTagRecipe, tagContentClassName, type TagAppearance, type TagColor, type TagPart, type TagTone } from "./tag.styles";

export type { TagAppearance, TagColor, TagPart, TagTone } from "./tag.styles";
export type { TagSize } from "@rain-next/foundations";
export type TagLayout = "horizontal" | "vertical";
export type TagLocalRecipe = RainLocalRecipe<TagPart, "ui-tag" | "ui-link-tag" | "ui-checkable-tag">;
export interface TagVisualProps {
  appearance?: TagAppearance;
  color?: TagColor;
  tone?: TagTone;
  size?: TagSize;
  leadingIcon?: ReactNode;
  /** Layout only; visual changes use declared Local Recipe parts. */
  className?: string;
  localRecipe?: TagLocalRecipe;
}
export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "onClick" | "color" | "style" | "dangerouslySetInnerHTML">, TagVisualProps {
  disabled?: boolean;
  layout?: TagLayout;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  removeLabel?: string;
}

export function TagContent({ children, leadingIcon, recipe, selected = false, localRecipe }: {
  children: ReactNode; leadingIcon?: ReactNode; recipe: ReturnType<typeof getTagRecipe>; selected?: boolean; localRecipe?: RainLocalRecipe<string>;
}) {
  return <span data-slot="content" className={rainCn(tagContentClassName, getRainLocalRecipePart(localRecipe, "content"))}>
    {leadingIcon && <span aria-hidden="true" data-slot="leading-icon" className={rainCn(recipe.icon, getRainLocalRecipePart(localRecipe, "leading-icon"))}>{leadingIcon}</span>}
    <span data-slot="label" className={rainCn("min-w-rain-0 truncate", getRainLocalRecipePart(localRecipe, "label"))}>{children}</span>
    {selected && <span aria-hidden="true" data-slot="selection-mark" className={rainCn(recipe.selectionIcon, getRainLocalRecipePart(localRecipe, "selection-mark"))}><CheckBoldIcon /></span>}
  </span>;
}

export function TagRemove({ children, disabled, onRemove, removeLabel, recipe, localRecipe }: {
  children: ReactNode; disabled: boolean; onRemove: MouseEventHandler<HTMLButtonElement>; removeLabel?: string;
  recipe: ReturnType<typeof getTagRecipe>; localRecipe?: TagLocalRecipe;
}) {
  const text = typeof children === "string" || typeof children === "number" ? String(children).trim() : "";
  const label = removeLabel ?? (text ? `移除标签 ${text}` : "");
  if (!label.trim()) throw new Error("A removable Tag with non-text children requires a meaningful removeLabel.");
  return <button type="button" disabled={disabled} aria-label={label} data-focus="control" data-slot="remove-action"
    className={rainCn(recipe.close, getRainLocalRecipePart(localRecipe, "remove-action"))} onClick={onRemove}>
    <span className={recipe.icon}><CloseIcon /></span>
  </button>;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag({
  appearance = "filled", color, tone, size, children, className, localRecipe, leadingIcon, disabled: nativeDisabled = false,
  layout = "horizontal", onRemove, removeLabel, "aria-disabled": ariaDisabled, ...nativeProps
}, ref) {
  const density = useDensity(), removable = Boolean(onRemove) && layout === "horizontal";
  const disabled = nativeDisabled || ariaDisabled === true || ariaDisabled === "true";
  const resolvedColor = color ?? tone ?? "neutral", resolvedSize = size ?? (removable || density !== "compact" ? 24 : 20);
  const recipe = getTagRecipe(resolvedColor, appearance, resolvedSize);
  const verticalShape = resolvedSize === 20 ? "vertical-20" : resolvedSize === 24 ? "vertical-24" : "vertical-28";
  return <span {...nativeProps} ref={ref} aria-disabled={disabled || undefined} data-rain-id="ui-tag" data-slot="root"
    data-appearance={appearance} data-color={resolvedColor} data-tone={tone ?? resolvedColor} data-size={resolvedSize} data-density={density}
    data-layout={layout} data-state={disabled ? "disabled" : removable ? "removable" : "static"} data-removable={removable || undefined} data-local-recipe={localRecipe?.id}
    className={rainCn(layout === "vertical" ? rainCn(recipe.surface, tagShapeClassNames[verticalShape], "rain-tag-vertical justify-center") : recipe.root, disabled && "opacity-rain-tag-disabled", removable && "pr-rain-0", className, getRainLocalRecipePart(localRecipe, "root"))}>
    <TagContent recipe={recipe} leadingIcon={leadingIcon} localRecipe={localRecipe}>{children}</TagContent>
    {removable && <TagRemove recipe={recipe} disabled={disabled} onRemove={onRemove!} removeLabel={removeLabel} localRecipe={localRecipe}>{children}</TagRemove>}
  </span>;
});
Tag.displayName = "Tag";
