// Adapted from shadcn-ui/ui@3ba91b1 Base UI Bubble and Nova; MIT, G6 source lock.
import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { useDensity } from "@rain-next/foundations";
import { getRainLocalRecipePart, type RainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import "./bubble.css";

export type BubblePart = "root" | "group" | "content" | "reactions";
export type BubbleRecipe = RainLocalRecipe<BubblePart, "ui-bubble">;
const BubbleRecipeContext = React.createContext<BubbleRecipe | undefined>(undefined);

const bubbleVariants = cva("rain-bubble relative flex w-fit min-w-0 flex-col", {
  variants: { variant: {
    default: "rain-bubble--default", secondary: "rain-bubble--secondary",
    muted: "rain-bubble--muted", tinted: "rain-bubble--tinted",
    outline: "rain-bubble--outline", ghost: "rain-bubble--ghost",
    destructive: "rain-bubble--destructive",
  } },
  defaultVariants: { variant: "default" },
});
export type BubbleVariant = NonNullable<VariantProps<typeof bubbleVariants>["variant"]>;
export type BubbleProps = React.ComponentProps<"div"> & VariantProps<typeof bubbleVariants> & {
  align?: "start" | "end";
  localRecipe?: BubbleRecipe;
};
export function Bubble({ variant = "default", align = "start", className, localRecipe, ...props }: BubbleProps) {
  const density = useDensity();
  return <BubbleRecipeContext.Provider value={localRecipe}>
    <div {...props} data-rain-id="ui-bubble" data-slot="root" data-variant={variant}
      data-align={align} data-density={density} data-local-recipe={localRecipe?.id}
      className={rainCn(bubbleVariants({ variant }), getRainLocalRecipePart(localRecipe, "root"), className)} />
  </BubbleRecipeContext.Provider>;
}

export type BubbleGroupProps = React.ComponentProps<"div"> & { localRecipe?: BubbleRecipe };
export function BubbleGroup({ className, localRecipe, ...props }: BubbleGroupProps) {
  return <div {...props} data-rain-id="ui-bubble" data-slot="group"
    className={rainCn("rain-bubble__group flex min-w-0 flex-col gap-rain-8", getRainLocalRecipePart(localRecipe, "group"), className)} />;
}

export type BubbleContentProps = useRender.ComponentProps<"div"> & { localRecipe?: BubbleRecipe };
export function BubbleContent({ className, render, localRecipe, ...props }: BubbleContentProps) {
  const inheritedRecipe = React.useContext(BubbleRecipeContext);
  const recipe = localRecipe ?? inheritedRecipe;
  return useRender({
    defaultTagName: "div", render,
    props: mergeProps<"div">({ className: rainCn(
      "rain-bubble__content w-fit max-w-full min-w-0 overflow-hidden wrap-break-word font-rain-reading text-rain-size-14 leading-rain-24 font-rain-regular",
      getRainLocalRecipePart(recipe, "content"), className,
    ) }, props),
    state: { slot: "content" },
  });
}

const bubbleReactionsVariants = cva("rain-bubble__reactions absolute z-10 flex w-fit items-center justify-center", {
  variants: {
    side: { top: "rain-bubble__reactions--top", bottom: "rain-bubble__reactions--bottom" },
    align: { start: "rain-bubble__reactions--start", end: "rain-bubble__reactions--end" },
  },
  defaultVariants: { side: "bottom", align: "end" },
});
export type BubbleReactionsProps = React.ComponentProps<"div"> & {
  align?: "start" | "end";
  side?: "top" | "bottom";
  localRecipe?: BubbleRecipe;
};
export function BubbleReactions({ side = "bottom", align = "end", className, localRecipe, ...props }: BubbleReactionsProps) {
  const inheritedRecipe = React.useContext(BubbleRecipeContext);
  const recipe = localRecipe ?? inheritedRecipe;
  return <div {...props} data-slot="reactions" data-align={align} data-side={side}
    className={rainCn(bubbleReactionsVariants({ side, align }), getRainLocalRecipePart(recipe, "reactions"), className)} />;
}
