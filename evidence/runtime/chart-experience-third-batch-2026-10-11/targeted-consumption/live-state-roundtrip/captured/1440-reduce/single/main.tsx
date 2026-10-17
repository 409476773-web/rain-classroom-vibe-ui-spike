import { createRoot } from "react-dom/client";
import { useState } from "react";
import { MotionConfig } from "motion/react";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import { ChartExample, type LiveExampleSettings } from "./chart-examples";
import type { ChartBoundaryScenario } from "./chart-data";
import { useChartReducedMotion } from "./chart-variants/shared";

function App() {
  const [revision, setRevision] = useState(0);
  const [boundaryScenario, setBoundaryScenario] = useState<ChartBoundaryScenario>("normal");
  const reduced = useChartReducedMotion();
  const [liveSettings, setLiveSettings] = useState<LiveExampleSettings>({"points":[{"time":1791680402,"value":99}],"paused":true,"frozenNow":1791680402616});
  return <MotionConfig reducedMotion="user">
    <main style={{ maxWidth: 880, margin: "auto", padding: "var(--rain-space-24)" }}>
      <button onClick={() => setRevision(value => value + 1)}>更新数据</button>
      <div className="rain-chart" data-rain-id="chart-live-line" data-recipe="trend-soft">
        <ChartExample id="live-line" recipe="trend-soft" revision={revision} reduced={reduced} state="single" boundaryScenario={boundaryScenario} onBoundaryScenarioChange={setBoundaryScenario} size="standard" miniSize="compact" seriesCount={3} liveSettings={liveSettings} onLiveSettingsChange={setLiveSettings} />
      </div>
    </main>
  </MotionConfig>;
}

createRoot(document.getElementById("root")!).render(<App />);