// Adapted from shadcn-ui/ui@3ba91b1, MIT; registry-candidate. Base UI owns selection and roving focus.
import { createContext, useContext } from "react";
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import type { VariantProps } from "class-variance-authority";
import { useDensity } from "@rain-next/foundations";
import { rainCn as cn } from "../utils/rain-class-names";
import { toggleVariants, type ToggleProps } from "../toggle/toggle";

import "./toggle-group.css";

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({});
export type ToggleGroupProps = Omit<ToggleGroupPrimitive.Props, "className"> & VariantProps<typeof toggleVariants> & { className?: string; spacing?: 0 | 8 };

function ToggleGroup({ className, variant = "default", size, spacing = 8, orientation = "horizontal", children, ...props }: ToggleGroupProps) {
  const density = useDensity();
  const resolvedSize = size ?? (density === "compact" ? "sm" : "default");
  return <ToggleGroupPrimitive data-rain-id="ui-toggle-group" data-slot="toggle-group" data-variant={variant} data-size={resolvedSize}
    data-spacing={spacing} data-orientation={orientation} orientation={orientation} className={cn("rain-g2-toggle-group flex w-fit", className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size: resolvedSize }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive>;
}

function ToggleGroupItem({ className, variant = "default", size = "default", ...props }: ToggleProps) {
  const context = useContext(ToggleGroupContext);
  return <TogglePrimitive data-rain-id="ui-toggle-group-item" data-slot="toggle-group-item" data-focus="control"
    data-variant={context.variant ?? variant} data-size={context.size ?? size}
    className={cn(toggleVariants({ variant: context.variant ?? variant, size: context.size ?? size }), className)} {...props} />;
}

export { ToggleGroup, ToggleGroupItem };
