// Adapted directly from shadcn-ui/ui@3ba91b1, MIT; local-experiment.
// Pristine sources, full Nova styles and license: evidence/runtime/token-first-v12-g1/source-lock.json.
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { useDensity } from "@rain-next/foundations"
import { rainCn as cn } from "@rain-next/ui"

import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down"

type AccordionVariant = "line" | "contained" | "tinted" | "quiet"

function Accordion({ className, variant = "line", defaultValue, value, ...props }: Omit<AccordionPrimitive.Root.Props, "className"> & { className?: string; variant?: AccordionVariant }) {
  const density = useDensity()
  return (
    <AccordionPrimitive.Root
      data-rain-id="local-g1-accordion" data-slot="accordion" data-density={density}
      data-rain-variant={variant}
      className={cn("rain-g1-accordion flex w-full flex-col", className)}
      {...(value === undefined ? { defaultValue: defaultValue ?? [] } : { value })}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: Omit<AccordionPrimitive.Item.Props, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("rain-g1-accordion-item", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: Omit<AccordionPrimitive.Trigger.Props, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger" data-focus="control"
        className={cn(
          "rain-g1-accordion-trigger group/accordion-trigger relative flex flex-1 items-center justify-between gap-rain-12 py-rain-12 text-left font-rain-ui text-rain-size-14 leading-rain-22 font-rain-semibold aria-disabled:cursor-not-allowed",
          className
        )}
        {...props}
      >
        {children}
        <ArrowDownIcon aria-hidden="true"
          data-slot="accordion-trigger-icon"
          className="rain-g1-accordion-trigger-icon pointer-events-none shrink-0"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: Omit<AccordionPrimitive.Panel.Props, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="rain-g1-accordion-content"
      {...props}
    >
      <div
        className={cn(
          "rain-g1-accordion-content-inner pb-rain-12 text-rain-size-14 leading-rain-24 [&_a]:underline [&_p:not(:last-child)]:mb-rain-16",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
