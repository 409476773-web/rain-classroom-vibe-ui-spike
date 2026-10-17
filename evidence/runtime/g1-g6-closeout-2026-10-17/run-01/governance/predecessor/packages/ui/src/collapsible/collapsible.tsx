// Adapted directly from shadcn-ui/ui@3ba91b1, MIT; registry-candidate; original G1 adaptation retained.
// Pristine sources, full Nova styles and license: evidence/runtime/token-first-v12-g1/source-lock.json.
"use client"

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { useDensity } from "@rain-next/foundations"
import { rainCn as cn } from "../utils/rain-class-names"
import { ArrowDownIcon } from "../icons/arrow-down"
import "./collapsible.css"

export type CollapsibleVariant = "line" | "contained" | "tinted" | "quiet"
export type CollapsibleProps = Omit<CollapsiblePrimitive.Root.Props, "className"> & { className?: string; variant?: CollapsibleVariant }

function Collapsible({ className, variant = "line", defaultOpen, open, ...props }: CollapsibleProps) {
  const density = useDensity()
  return <CollapsiblePrimitive.Root data-rain-id="ui-collapsible" data-asset-identity="registry-candidate" data-maturity="registry-candidate" data-slot="collapsible" data-density={density} data-rain-variant={variant} className={cn("rain-g1-collapsible", className)} {...(open === undefined ? { defaultOpen: defaultOpen ?? false } : { open })} {...props} />
}

function CollapsibleTrigger({ className, children, ...props }: Omit<CollapsiblePrimitive.Trigger.Props, "className"> & { className?: string }) {
  return (
    <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" data-focus="control" className={cn("rain-g1-collapsible-trigger", className)} {...props}>
      {children}
      <ArrowDownIcon aria-hidden="true" data-slot="collapsible-trigger-icon" className="rain-g1-collapsible-trigger-icon" />
    </CollapsiblePrimitive.Trigger>
  )
}

function CollapsibleContent({ className, children, ...props }: Omit<CollapsiblePrimitive.Panel.Props, "className"> & { className?: string }) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" className={cn("rain-g1-collapsible-content", className)} {...props}>
      <div className="rain-g1-collapsible-content-inner">{children}</div>
    </CollapsiblePrimitive.Panel>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
