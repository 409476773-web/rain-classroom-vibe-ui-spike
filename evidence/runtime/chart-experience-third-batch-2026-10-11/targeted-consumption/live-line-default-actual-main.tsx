import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/charts/styles.css";
import "./chart-examples.css";
import { SpecialVariant } from "./chart-variants/special";
import { useChartReducedMotion, type VariantSettings } from "./chart-variants/shared";

function App() {
  const [settings, setSettings] = useState<VariantSettings>({"points":[{"time":1791676741,"value":65},{"time":1791676742,"value":65},{"time":1791676743,"value":64},{"time":1791676744,"value":64},{"time":1791676745,"value":64},{"time":1791676746,"value":65},{"time":1791676747,"value":65},{"time":1791676748,"value":65},{"time":1791676749,"value":66},{"time":1791676750,"value":67},{"time":1791676751,"value":67},{"time":1791676752,"value":68},{"time":1791676753,"value":69},{"time":1791676754,"value":70},{"time":1791676755,"value":72},{"time":1791676756,"value":73},{"time":1791676757,"value":74},{"time":1791676758,"value":76},{"time":1791676759,"value":77},{"time":1791676760,"value":79},{"time":1791676761,"value":80},{"time":1791676762,"value":82},{"time":1791676763,"value":83},{"time":1791676764,"value":85},{"time":1791676765,"value":87},{"time":1791676766,"value":88},{"time":1791676767,"value":90},{"time":1791676768,"value":91},{"time":1791676769,"value":93},{"time":1791676770,"value":94},{"time":1791676771,"value":96},{"time":1791676772,"value":97},{"time":1791676773,"value":98},{"time":1791676774,"value":100},{"time":1791676775,"value":101},{"time":1791676776,"value":102},{"time":1791676777,"value":103},{"time":1791676778,"value":104},{"time":1791676779,"value":105},{"time":1791676780,"value":105},{"time":1791676781,"value":106},{"time":1791676782,"value":106},{"time":1791676783,"value":107},{"time":1791676784,"value":107},{"time":1791676785,"value":107},{"time":1791676786,"value":107},{"time":1791676787,"value":107},{"time":1791676788,"value":106},{"time":1791676789,"value":106},{"time":1791676790,"value":106},{"time":1791676791,"value":105},{"time":1791676792,"value":104},{"time":1791676793,"value":104},{"time":1791676794,"value":103},{"time":1791676795,"value":102},{"time":1791676796,"value":101},{"time":1791676797,"value":100},{"time":1791676798,"value":98},{"time":1791676799,"value":97},{"time":1791676800,"value":96},{"time":1791676805.966,"value":87}],"frozenNow":1791676805966,"paused":true});
  const [curveName, setCurveName] = useState<string | undefined>(undefined);
  const userReduced = useChartReducedMotion();
  const [active, setActive] = useState(!document.hidden);
  useEffect(() => {
    const change = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);
  return <MotionConfig reducedMotion="user">
    <main className="rain-chart" data-recipe="trend-soft" style={{ maxWidth: 880, margin: "auto", padding: "var(--rain-space-24)" }}>
      <SpecialVariant variantId="live-line-default" recipe="trend-soft" revision={0} replay={0} reduced={false || userReduced} active={active} settings={settings} onSettingsChange={patch => setSettings(previous => ({ ...previous, ...patch }))} curveName={curveName} onCurveChange={setCurveName} />
    </main>
  </MotionConfig>;
}
createRoot(document.getElementById("root")!).render(<App />);