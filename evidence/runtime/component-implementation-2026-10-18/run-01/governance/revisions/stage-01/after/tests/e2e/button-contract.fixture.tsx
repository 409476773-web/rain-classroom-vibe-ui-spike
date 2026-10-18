import { createRoot } from "react-dom/client";
import { useState } from "react";
import { Button, type ButtonVariant } from "../../packages/ui/src/index";

const variants = ["primary", "secondary", "tertiary", "text"] as const;
const modes = ["true", "string-true", "false", "string-false", "loading", "disabled"] as const;
type Mode = typeof modes[number];
function Case({ variant, mode }: { variant: ButtonVariant; mode: Mode }) {
  const [clicks, setClicks] = useState(0), [submits, setSubmits] = useState(0), [bubbles, setBubbles] = useState(0);
  const aria = mode === "true" ? true : mode === "string-true" ? "true" : mode === "false" ? false : mode === "string-false" ? "false" : undefined;
  return <form data-button-case={`${variant}-${mode}`} onSubmit={event => { event.preventDefault(); setSubmits(value => value + 1); }}>
    <div onClick={() => setBubbles(value => value + 1)}>
      <Button variant={variant} type="submit" aria-disabled={aria} loading={mode === "loading"} disabled={mode === "disabled"} onClick={() => setClicks(value => value + 1)}>{`${variant} ${mode}`}</Button>
    </div>
    <output data-counts={JSON.stringify({ clicks, submits, bubbles })}>{clicks}/{submits}/{bubbles}</output>
  </form>;
}
export function mountButtonContractFixture() {
  document.getElementById("root")!.style.display = "none";
  const host = document.createElement("main"); host.id = "button-contract";
  Object.assign(host.style, { padding: "24px", display: "grid", gap: "16px", gridTemplateColumns: "repeat(4, 1fr)" });
  document.body.append(host);
  createRoot(host).render(<>{variants.flatMap(variant => modes.map(mode => <Case key={`${variant}-${mode}`} variant={variant} mode={mode} />))}</>);
}
