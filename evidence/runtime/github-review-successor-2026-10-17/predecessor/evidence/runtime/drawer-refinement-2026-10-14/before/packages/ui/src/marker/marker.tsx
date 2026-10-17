// Adapted from shadcn-ui/ui@3ba91b1 Base UI Marker and Nova; MIT, G6 source lock.
import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { useDensity } from "@rain-next/foundations";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import "./marker.css";

export type MarkerPart = "root" | "icon" | "content";
export type MarkerRecipe = RainLocalRecipe<MarkerPart, "ui-marker">;
const MarkerRecipeContext = React.createContext<MarkerRecipe | undefined>(undefined);
export const markerVariants = cva("rain-marker relative flex w-full items-center", {
  variants: { variant: {
    default: "rain-marker--default", separator: "rain-marker--separator", border: "rain-marker--border",
  } },
});
export type MarkerVariant = NonNullable<VariantProps<typeof markerVariants>["variant"]>;
export type MarkerProps = useRender.ComponentProps<"div"> & VariantProps<typeof markerVariants> & { localRecipe?: MarkerRecipe };
export function Marker({ className, variant = "default", render, localRecipe, ...props }: MarkerProps) {
  const density = useDensity();
  const element = useRender({
    defaultTagName: "div", render,
    props: { ...mergeProps<"div">({ className: rainCn(markerVariants({ variant }), getRainLocalRecipePart(localRecipe, "root"), className) }, props), "data-rain-id": "ui-marker", "data-local-recipe": localRecipe?.id },
    state: { slot: "root", variant, density },
  });
  return <MarkerRecipeContext.Provider value={localRecipe}>{element}</MarkerRecipeContext.Provider>;
}

export type MarkerIconProps = React.ComponentProps<"span"> & { localRecipe?: MarkerRecipe };
export function MarkerIcon({ className, localRecipe, ...props }: MarkerIconProps) {
  const inheritedRecipe = React.useContext(MarkerRecipeContext);
  const recipe = localRecipe ?? inheritedRecipe;
  return <span aria-hidden="true" {...props} data-slot="icon"
    className={rainCn("rain-marker__icon shrink-0", getRainLocalRecipePart(recipe, "icon"), className)} />;
}

export type MarkerContentProps = React.ComponentProps<"span"> & { localRecipe?: MarkerRecipe };
export function MarkerContent({ className, localRecipe, ...props }: MarkerContentProps) {
  const inheritedRecipe = React.useContext(MarkerRecipeContext);
  const recipe = localRecipe ?? inheritedRecipe;
  return <span {...props} data-slot="content"
    className={rainCn("rain-marker__content min-w-0 wrap-break-word", getRainLocalRecipePart(recipe, "content"), className)} />;
}
