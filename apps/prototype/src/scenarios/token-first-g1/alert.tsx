// Adapted directly from shadcn-ui/ui@3ba91b1, MIT; local-experiment.
// Pristine sources, full Nova styles and license: evidence/runtime/token-first-v12-g1/source-lock.json.
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { rainCn as cn } from "@rain-next/ui"

const alertVariants = cva("rain-g1-alert group/alert relative w-full grid gap-rain-2 rounded-rain-8 p-rain-12 text-rain-size-14 leading-rain-22 font-rain-ui", {
  variants: {
    variant: {
      default: "rain-g1-alert-default",
      destructive: "rain-g1-alert-destructive",
      warning: "rain-g1-alert-warning",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-rain-id="local-g1-alert" data-asset-identity="local-experiment"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "rain-g1-alert-title [&_a]:underline",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "rain-g1-alert-description [&_a]:underline",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("rain-g1-alert-action", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
