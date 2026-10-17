import { forwardRef, useId, useLayoutEffect, useState, type ComponentProps, type ReactNode, type RefObject } from "react";
import { Tooltip } from "@base-ui/react/tooltip";
import { usePopupScope, usePopupTriggerRef } from "../_internal/popup";
import type { TabsItem } from "./tabs";

export function formatTabsCount(item: Pick<TabsItem, "count" | "countAccessibleLabel">) {
  const { count, countAccessibleLabel } = item;
  if (count == null || count === "") return null;
  if (typeof count === "number" && (!Number.isSafeInteger(count) || count < 0)) {
    console.warn("Tabs count must be a finite non-negative safe integer; hidden invalid count."); return null;
  }
  const numeric = typeof count === "number" || /^\d+$/.test(count);
  if (!numeric && !countAccessibleLabel?.trim()) throw new Error("Tabs custom count requires countAccessibleLabel");
  return { display: numeric ? `(${count})` : count, description: countAccessibleLabel?.trim() || `数量 ${count}` };
}

export const TabsTooltipTrigger = forwardRef<HTMLElement, ComponentProps<typeof Tooltip.Trigger> & { itemDisabled: boolean }>(
  function TabsTooltipTrigger({ itemDisabled, ...props }, ref) {
    const anchorRef = usePopupTriggerRef(ref);
    return <Tooltip.Trigger {...props} ref={anchorRef} delay={0} render={buttonProps =>
      <fieldset role="presentation" disabled={itemDisabled} className="rain-tabs__disabled-frame"><button {...buttonProps} /></fieldset>} />;
  },
);

export function TabsFullLabel({ label, labelRef, hidden, disabled, children }: {
  label: string; labelRef: RefObject<HTMLSpanElement | null>; hidden: boolean; disabled: boolean; children: ReactNode;
}) {
  const [truncated, setTruncated] = useState(false);
  useLayoutEffect(() => {
    const node = labelRef.current;
    if (!node || hidden) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const parts = [node, node.parentElement?.querySelector<HTMLElement>('[data-part="count"]')].filter((part): part is HTMLElement => Boolean(part));
      const clipped = parts.some(part => {
        if (part.scrollWidth > part.clientWidth || part === node && part.scrollHeight > part.clientHeight) return true;
        const rect = part.getBoundingClientRect();
        for (let parent = part.parentElement; parent && !parent.matches('[data-part="nav"]'); parent = parent.parentElement) {
          const style = getComputedStyle(parent), bounds = parent.getBoundingClientRect();
          if ((style.overflowX !== "visible" && (rect.left < bounds.left - 1 || rect.right > bounds.right + 1)) || (style.overflowY !== "visible" && (rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1))) return true;
        }
        return false;
      });
      setTruncated(clipped);
    };
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(node); if (node.parentElement) observer?.observe(node.parentElement);
    document.fonts?.ready.then(measure); document.fonts?.addEventListener("loadingdone", measure);
    return () => { active = false; observer?.disconnect(); document.fonts?.removeEventListener("loadingdone", measure); };
  }, [hidden, label, labelRef]);
  return <Tooltip.Root disabled={!truncated || hidden || disabled}>{children}
    <FullLabelPopup label={label} />
  </Tooltip.Root>;
}

function FullLabelPopup({ label }: { label: string }) {
  const { theme, density, densityStyle } = usePopupScope();
  return <Tooltip.Portal><Tooltip.Positioner sideOffset={8} data-rain-theme={theme} data-density={density} style={densityStyle} className="rain-popup-positioner">
    <Tooltip.Popup role="tooltip" className="rain-popup rain-type-ui-default p-rain-8 rounded-rain-4">{label}</Tooltip.Popup>
  </Tooltip.Positioner></Tooltip.Portal>;
}

export function TabsDisabledDescription({ items }: { items: readonly TabsItem[] }) {
  const [focused, setFocused] = useState(false), id = useId();
  const disabled = items.filter(item => item.disabled);
  if (!disabled.length && !focused) return null;
  return <details className="rain-tabs__description" onFocusCapture={() => setFocused(true)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <summary data-focus="item" className="rain-type-ui-default text-rain-text-secondary" aria-controls={id}>分区说明</summary>
    <ul id={id}>{disabled.map(item => <li key={`${typeof item.value}:${item.value}`}>
      {item.label} — {formatTabsCount(item)?.description}{item.count != null && "，"}禁用{item.disabledReason && `，${item.disabledReason}`}
    </li>)}</ul>
  </details>;
}
