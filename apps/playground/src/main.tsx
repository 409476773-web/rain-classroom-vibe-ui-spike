import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./app";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/motion.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Playground root element was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
