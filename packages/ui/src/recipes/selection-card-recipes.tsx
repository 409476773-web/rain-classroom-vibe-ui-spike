import { type MouseEventHandler, type ReactNode } from "react";
import { Button } from "../button/button";
import { Tag } from "../tag/tag";
import { defineRainLocalRecipe } from "./local-recipe";
import { CheckboxCard, RadioCard, type CheckboxCardProps, type RadioCardProps } from "../selection-card/selection-card";
import { rainCn } from "../utils/rain-class-names";

const recommendationRecipe = defineRainLocalRecipe<"root", "ui-tag">({
  id: "selection-card-recommendation", scope: "feature", origin: "ui-tag",
  classes: { root: "rain-selection-card__recommendation" }, modifiedParts: ["root"],
  candidateTokens: [], promotionStatus: "not-proposed",
});

type RecipeProps<Props, Parts extends PropertyKey> = Props extends unknown ? Omit<Props, Parts> : never;

export type RadioPreviewCardProps = RecipeProps<RadioCardProps, "children"> & { imageSrc: string; layoutLabel: string; audienceLabel: string };
export function RadioPreviewCard({ imageSrc, layoutLabel, audienceLabel, className, ...props }: RadioPreviewCardProps) {
  return <RadioCard {...props} className={rainCn("rain-selection-recipe-preview", className)}>
    <img data-slot="media" className="rain-selection-card__artwork" src={imageSrc} alt="" />
    <span data-slot="metadata" className="flex min-w-rain-0 flex-wrap gap-rain-8 text-rain-size-12 leading-rain-22">
      <span className="rain-selection-card__accent">{layoutLabel}</span><span>{audienceLabel}</span>
    </span>
  </RadioCard>;
}

export type CheckboxObjectCardProps = RecipeProps<CheckboxCardProps, "children" | "trailingVisual" | "labelEnd"> & { supportingValue: string; status?: string; identityVisual: ReactNode };
export function CheckboxObjectCard({ supportingValue, status, identityVisual, className, ...props }: CheckboxObjectCardProps) {
  return <CheckboxCard {...props} className={rainCn("rain-selection-recipe-object", className)} trailingVisual={identityVisual}
    labelEnd={status && <span className="rain-selection-card__accent text-rain-size-11 leading-rain-22">{status}</span>}>
    <span data-slot="supporting-value" className="text-rain-size-12 leading-rain-22">{supportingValue}</span>
  </CheckboxCard>;
}

export type RadioComparisonCardProps = RecipeProps<RadioCardProps, "children" | "labelEnd"> & { recommended?: boolean; details: readonly { label: string; value: string }[] };
export function RadioComparisonCard({ recommended, details, className, ...props }: RadioComparisonCardProps) {
  return <RadioCard {...props} className={rainCn("rain-selection-recipe-comparison", className)}
    labelEnd={recommended && <Tag size={20} tone="brand" appearance="filled" localRecipe={recommendationRecipe}>推荐</Tag>}>
    <span role="list" aria-label="方案属性" data-slot="details" className="flex min-w-rain-0 flex-col gap-rain-10">
      {details.map((detail) => <span role="listitem" key={detail.label} className="rain-selection-card__detail">
        <span data-slot="detail-key" className="text-rain-size-11 leading-rain-22">{detail.label}</span>
        <span data-slot="detail-value" className="text-rain-size-13 leading-rain-22">{detail.value}</span>
      </span>)}
    </span>
  </RadioCard>;
}

export type RadioCardWithPreviewProps = RecipeProps<RadioCardProps, "children" | "leadingVisual" | "labelEnd" | "actions"> & { supportingValue: string; identityVisual: ReactNode; recommended?: boolean; onPreview: MouseEventHandler<HTMLButtonElement> };
export function RadioCardWithPreview({ supportingValue, identityVisual, recommended, onPreview, className, ...props }: RadioCardWithPreviewProps) {
  return <RadioCard {...props} className={rainCn("rain-selection-recipe-with-preview", className)} leadingVisual={identityVisual}
    labelEnd={recommended && <Tag size={20} tone="brand" appearance="filled" localRecipe={recommendationRecipe}>推荐</Tag>}
    actions={<><span className="min-w-rain-0 flex-1 text-rain-size-11 leading-rain-22">可先查看模板，再决定是否选择</span>
      <Button type="button" size="mini" variant="secondary" aria-label={`查看预览：${props.label}`} onClick={onPreview}>查看预览</Button></>}>
    <span data-slot="supporting-value" className="text-rain-size-12 leading-rain-22">{supportingValue}</span>
  </RadioCard>;
}
