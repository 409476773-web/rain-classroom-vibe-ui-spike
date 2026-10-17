// Adapted from shadcn-ui/ui@3ba91b1, MIT; registry-candidate. See this batch's source-lock.json.
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { useDensity } from "@rain-next/foundations";
import { rainCn as cn } from "../utils/rain-class-names";
import "./toggle.css";

const toggleVariants = cva("rain-g2-toggle inline-flex items-center justify-center whitespace-nowrap", {
  variants: {
    variant: { default: "rain-g2-toggle-default", outline: "rain-g2-toggle-outline" },
    size: { default: "h-rain-36", sm: "h-rain-32", lg: "h-rain-40" },
  },
  defaultVariants: { variant: "default", size: "default" },
});
type ToggleProps = Omit<TogglePrimitive.Props, "className"> & VariantProps<typeof toggleVariants> & { className?: string };

function Toggle({ className, variant = "default", size, ...props }: ToggleProps) {
  const density = useDensity();
  const resolvedSize = size ?? (density === "compact" ? "sm" : "default");
  return <TogglePrimitive data-rain-id="ui-toggle" data-slot="toggle" data-focus="control" data-variant={variant} data-size={resolvedSize}
    className={cn(toggleVariants({ variant, size: resolvedSize }), className)} {...props} />;
}

export { Toggle, toggleVariants };
export type { ToggleProps };
