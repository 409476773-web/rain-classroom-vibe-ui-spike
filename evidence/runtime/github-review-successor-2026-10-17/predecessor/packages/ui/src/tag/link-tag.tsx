import { forwardRef, type MouseEventHandler } from "react";
import { useDensity } from "@rain-next/foundations";
import { Link, type LinkProps } from "../link/link";
import { getRainLocalRecipePart } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { TagContent, TagRemove, type TagVisualProps } from "./tag";
import { getTagRecipe } from "./tag.styles";

export interface LinkTagProps extends Omit<LinkProps, "appearance" | "color" | "disabled" | "tone" | "style" | "dangerouslySetInnerHTML">, TagVisualProps {
  disabled?: boolean;
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  removeLabel?: string;
}

export const LinkTag = forwardRef<HTMLAnchorElement, LinkTagProps>(function LinkTag({
  appearance = "filled", color, tone, size = 24, children, className, localRecipe, leadingIcon,
  disabled: nativeDisabled = false, onRemove, removeLabel, "aria-disabled": ariaDisabled, ...linkProps
}, ref) {
  const density = useDensity(), resolvedColor = color ?? tone ?? "neutral";
  const disabled = nativeDisabled || ariaDisabled === true || ariaDisabled === "true", recipe = getTagRecipe(resolvedColor, appearance, size);
  const content = <TagContent recipe={recipe} leadingIcon={leadingIcon} localRecipe={localRecipe}>{children}</TagContent>;
  const mainClassName = rainCn("rain-tag__main", getRainLocalRecipePart(localRecipe, "main-action"));
  const disabledAttributes = Object.fromEntries(Object.entries(linkProps).filter(([key]) => /^(aria-|data-)/.test(key) || ["id", "title", "lang", "dir"].includes(key)));
  return <span data-rain-id="ui-link-tag" data-slot="root" data-density={density} data-color={resolvedColor} data-tone={tone ?? resolvedColor}
    data-size={size} data-appearance={appearance} data-state={disabled ? "disabled" : "default"} data-removable={Boolean(onRemove) || undefined}
    aria-disabled={disabled || undefined} data-local-recipe={localRecipe?.id}
    className={rainCn(recipe.root, "rain-link-tag", disabled && "opacity-rain-tag-disabled", className, getRainLocalRecipePart(localRecipe, "root"))}>
    {disabled ? <span {...disabledAttributes} role="link" aria-disabled="true" className={mainClassName} data-slot="main-action">{content}</span> :
      <Link {...linkProps} ref={ref} appearance="inline" className={mainClassName} data-tag-slot="main-action">
        <span aria-hidden="true" data-slot="interaction-overlay" className={recipe.overlay} />{content}
      </Link>}
    {onRemove && <TagRemove recipe={recipe} disabled={disabled} onRemove={onRemove} removeLabel={removeLabel} localRecipe={localRecipe}>{children}</TagRemove>}
  </span>;
});
LinkTag.displayName = "LinkTag";
