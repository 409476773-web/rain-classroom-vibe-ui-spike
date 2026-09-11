import { useRef, type ReactNode, type RefObject } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { useDensity } from "@rain-next/foundations";
import { Button, Checkbox } from "@rain-next/ui";
import "./selection-patterns.css";

export interface IndependentPreviewProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
  returnFocusRef: RefObject<HTMLElement | null>;
  fallbackFocusRef: RefObject<HTMLElement | null>;
  theme: "light" | "dark";
}

/** The owner supplies a preview target independently of its selected value. */
export function IndependentPreview({ open, onClose, title, description, children, returnFocusRef, fallbackFocusRef, theme }: IndependentPreviewProps) {
  const heading = useRef<HTMLHeadingElement>(null), density = useDensity();
  return <Dialog.Root open={open} onOpenChange={(next) => { if (!next) onClose(); }}>
    <Dialog.Portal>
      <Dialog.Backdrop className="rain-selection-preview__backdrop" data-rain-theme={theme} />
      <Dialog.Popup className="rain-selection-preview shadow-rain-dialog" data-rain-id="pattern-independent-preview" data-slot="root" data-rain-theme={theme} data-density={density}
        initialFocus={heading} finalFocus={() => {
          const trigger = returnFocusRef.current;
          return trigger?.isConnected && !trigger.matches(':disabled, [aria-disabled="true"]') && trigger.getClientRects().length
            ? trigger : fallbackFocusRef.current;
        }}>
        <header data-slot="header">
          <Dialog.Title ref={heading} tabIndex={-1} data-slot="title">{title}</Dialog.Title>
          <Dialog.Description data-slot="description">{description}</Dialog.Description>
        </header>
        <div className="rain-selection-preview__body" data-slot="body">{children}</div>
        <footer data-slot="actions"><Dialog.Close render={<Button type="button" variant="secondary">关闭预览</Button>} /></footer>
      </Dialog.Popup>
    </Dialog.Portal>
  </Dialog.Root>;
}

export interface DependentFieldsProps { active: boolean; legend: string; children: ReactNode }
/** Keep drafts in the owner; disabling and hiding alone do not define a business payload. */
export function DependentFields({ active, legend, children }: DependentFieldsProps) {
  return <fieldset hidden={!active} disabled={!active} className="rain-dependent-fields" data-rain-id="pattern-dependent-fields" data-slot="root" data-state={active ? "active" : "inactive"}>
    <legend data-slot="legend">{legend}</legend>
    <div data-slot="fields">{children}</div>
  </fieldset>;
}

export interface PageSelectionProps {
  label: string;
  eligibleIds: readonly string[];
  value: readonly string[];
  onValueChange: (value: string[]) => void;
  loading?: boolean;
}
/** A finite, explicitly supplied page scope. It never discovers membership from DOM. */
export function PageSelection({ label, eligibleIds, value, onValueChange, loading = false }: PageSelectionProps) {
  const eligible = new Set(eligibleIds), selected = new Set(value);
  const count = [...eligible].filter((id) => selected.has(id)).length;
  const disabled = loading || eligible.size === 0;
  const checked = !disabled && count === eligible.size;
  return <div data-rain-id="pattern-page-selection" data-slot="root" data-state={loading ? "loading" : disabled ? "empty" : "ready"} aria-busy={loading}>
    <Checkbox label={label} checked={checked} indeterminate={!disabled && count > 0 && !checked} disabled={disabled}
      description={loading ? "正在读取本页范围" : `本页可修改项：已选 ${count} / ${eligible.size}；保留锁定项与其他页的选择。`}
      onCheckedChange={() => {
        if (disabled) return;
        onValueChange(checked ? [...selected].filter((id) => !eligible.has(id)) : [...new Set([...selected, ...eligible])]);
      }} />
  </div>;
}
