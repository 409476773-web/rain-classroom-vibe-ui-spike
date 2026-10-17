// Adapted from shadcn-ui/ui@3ba91b1, MIT. Pristine source: evidence/runtime/token-first-v12-g2/source-lock.json.
import type { ComponentProps } from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { rainCn as cn } from "../utils/rain-class-names";
import { Separator } from "../separator/separator";
import "./button-group.css";

const buttonGroupVariants = cva("rain-g2-button-group flex w-fit items-stretch", {
  variants: { orientation: { horizontal: "flex-row", vertical: "flex-col" } },
  defaultVariants: { orientation: "horizontal" },
});

export type ButtonGroupProps = ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>;

function ButtonGroup({ className, orientation = "horizontal", ...props }: ButtonGroupProps) {
  return <div role="group" data-rain-id="ui-button-group" data-slot="button-group" data-orientation={orientation}
    className={cn(buttonGroupVariants({ orientation }), className)} {...props} />;
}

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({ defaultTagName: "div", props: mergeProps<"div">({ className: cn("rain-g2-button-group-text flex items-center", className) }, props), render, state: { slot: "button-group-text" } });
}

function ButtonGroupSeparator({ className, orientation = "vertical", ...props }: ComponentProps<typeof Separator>) {
  return <span data-slot="button-group-separator" data-orientation={orientation} className={cn("rain-g2-button-group-separator", className)}>
    <Separator {...props} orientation={orientation} decorative />
  </span>;
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
