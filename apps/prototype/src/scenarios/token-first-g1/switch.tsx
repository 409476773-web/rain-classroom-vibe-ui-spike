// Local source adapter retained for the G1 source-lock test; page consumers use @rain-next/ui.
"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { rainCn as cn } from "@rain-next/ui"

function Switch({
  className,
  ...props
}: Omit<SwitchPrimitive.Root.Props, "className"> & { className?: string }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size="default" data-rain-id="local-g1-switch" data-focus="control"
      className={cn(
        "rain-g1-switch relative inline-flex shrink-0 items-center rounded-rain-full border-solid border-rain-line-1 data-disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="rain-g1-switch-thumb pointer-events-none block rounded-rain-full"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
