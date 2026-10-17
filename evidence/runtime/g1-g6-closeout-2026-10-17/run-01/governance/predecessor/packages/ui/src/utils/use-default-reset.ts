import { useLayoutEffect, type RefObject } from "react";

// Native defaults must also be correct before the reset microtask so immediate FormData agrees.
export function useDefaultReset(
  ref: RefObject<HTMLInputElement | HTMLFieldSetElement | null>, enabled: boolean,
  defaults: () => readonly [HTMLInputElement, boolean][], restore: () => void,
) {
  useLayoutEffect(() => {
    if (!enabled || !ref.current) return;
    for (const [input, checked] of defaults()) {
      const current = input.checked;
      input.defaultChecked = checked;
      input.checked = current;
    }
    const root = ref.current.getRootNode();
    const onReset = (event: Event) => {
      if (event.target === ref.current?.form) queueMicrotask(() => { if (!event.defaultPrevented) restore(); });
    };
    root.addEventListener("reset", onReset, true);
    return () => root.removeEventListener("reset", onReset, true);
  });
}
