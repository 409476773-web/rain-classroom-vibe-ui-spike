import { useEffect, useLayoutEffect, useRef, type KeyboardEvent } from "react";

/** Temporary reading follows labels through updates; it never hides a series. */
export function useLegendInteraction(items: { label: string }[], hovered: number | null, onChange?: (index: number | null) => void) {
  const root = useRef<HTMLDivElement>(null);
  const focused = useRef<number | null>(null);
  const previousLabels = useRef(items.map(item => item.label));
  const previousHovered = useRef(hovered);
  const labels = items.map(item => item.label);
  const signature = JSON.stringify(labels);

  useLayoutEffect(() => {
    if (JSON.stringify(previousLabels.current) !== signature) {
      if (previousHovered.current != null) {
        const next = labels.indexOf(previousLabels.current[previousHovered.current]!);
        if (hovered !== (next < 0 ? null : next)) onChange?.(next < 0 ? null : next);
      }
      if (focused.current != null) {
        const next = labels.indexOf(previousLabels.current[focused.current]!);
        focused.current = next < 0 ? null : next;
      }
    }
    if (hovered == null && focused.current != null && root.current?.contains(document.activeElement)) onChange?.(focused.current);
    previousLabels.current = labels;
    previousHovered.current = hovered;
  }, [signature, hovered, onChange]);

  useEffect(() => {
    if (hovered == null || !onChange) return;
    const clearOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        focused.current = null;
        onChange(null);
      }
    };
    document.addEventListener("pointerdown", clearOutside);
    return () => document.removeEventListener("pointerdown", clearOutside);
  }, [hovered, onChange]);

  return {
    rootProps: {
      ref: root,
      onKeyDown: (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          focused.current = null;
          onChange?.(null);
          event.preventDefault();
        }
      },
    },
    itemProps: (index: number) => ({
      onPointerEnter: () => onChange?.(index),
      onPointerLeave: () => onChange?.(focused.current),
      onFocusCapture: () => { focused.current = index; onChange?.(index); },
      onClickCapture: () => { focused.current = index; onChange?.(index); },
      onBlurCapture: () => { focused.current = null; onChange?.(null); },
    }),
  };
}
