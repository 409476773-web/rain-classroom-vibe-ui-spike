// Adapted from shadcn-ui/ui@3ba91b1 render/merge semantics; MIT.
import * as React from "react";

type Render<State> = React.ReactElement | ((props: Record<string, unknown>, state: State) => React.ReactNode);

function mergeRefs(...values: unknown[]) {
  const refs = values.filter(Boolean) as React.Ref<unknown>[];
  return refs.length ? (value: unknown) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) ref.current = value;
    }
  } : undefined;
}

/** Keep the fixed engine's render contract, including cancellation and undefined props. */
export function renderQuestionnaireControl<State>(props: Record<string, unknown>, state: State, render: Render<State> | undefined, fallback: React.ReactElement) {
  if (render === undefined) return React.cloneElement(fallback, props);
  if (typeof render === "function") return render(props, state);
  if (!React.isValidElement<Record<string, unknown>>(render)) return null;
  const merged = { ...props };
  for (const [key, value] of Object.entries(render.props)) {
    if (value === undefined) continue;
    const previous = merged[key];
    if (key === "className") merged[key] = [previous, value].filter(Boolean).join(" ");
    else if (key === "style") merged[key] = { ...(previous as object), ...(value as object) };
    else if (/^on[A-Z]/.test(key) && typeof previous === "function" && typeof value === "function") {
      merged[key] = (event: { defaultPrevented: boolean }) => { value(event); if (!event.defaultPrevented) previous(event); };
    } else merged[key] = value;
  }
  merged.ref = mergeRefs(props.ref, render.props.ref);
  return React.cloneElement(render, merged);
}
