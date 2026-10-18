import { createRoot } from "react-dom/client";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/motion.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import { BklitValidation } from "./page";
import "./page.css";

createRoot(document.getElementById("root")!).render(<BklitValidation />);
