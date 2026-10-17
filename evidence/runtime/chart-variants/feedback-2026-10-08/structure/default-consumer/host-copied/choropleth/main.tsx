import { createRoot } from "react-dom/client";
import { useState } from "react";
import { MotionConfig } from "motion/react";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import { ChartExample } from "./chart-examples";
import { useChartReducedMotion } from "./chart-variants/shared";

function App() {
  const [revision, setRevision] = useState(0);
  const reduced = useChartReducedMotion();
  return <MotionConfig reducedMotion="user">
    <main style={{ maxWidth: 880, margin: "auto", padding: "var(--rain-space-24)" }}>
      <button onClick={() => setRevision(value => value + 1)}>更新数据</button>
      <div className="rain-chart" data-rain-id="chart-choropleth" data-recipe="intensity">
        <ChartExample id="choropleth" recipe="intensity" revision={revision} reduced={reduced} />
      </div>
    </main>
  </MotionConfig>;
}
createRoot(document.getElementById("root")!).render(<App />);