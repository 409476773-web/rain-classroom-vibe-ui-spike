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
  const [liveSettings, setLiveSettings] = useState<LiveExampleSettings>({"points":[{"time":1791680343,"value":0},{"time":1791680344,"value":0},{"time":1791680345,"value":0},{"time":1791680346,"value":0},{"time":1791680347,"value":0},{"time":1791680348,"value":0},{"time":1791680349,"value":0},{"time":1791680350,"value":0},{"time":1791680351,"value":0},{"time":1791680352,"value":0},{"time":1791680353,"value":0},{"time":1791680354,"value":0},{"time":1791680355,"value":0},{"time":1791680356,"value":0},{"time":1791680357,"value":0},{"time":1791680358,"value":0},{"time":1791680359,"value":0},{"time":1791680360,"value":0},{"time":1791680361,"value":0},{"time":1791680362,"value":0},{"time":1791680363,"value":0},{"time":1791680364,"value":0},{"time":1791680365,"value":0},{"time":1791680366,"value":0},{"time":1791680367,"value":0},{"time":1791680368,"value":0},{"time":1791680369,"value":0},{"time":1791680370,"value":0},{"time":1791680371,"value":0},{"time":1791680372,"value":0},{"time":1791680373,"value":0},{"time":1791680374,"value":0},{"time":1791680375,"value":0},{"time":1791680376,"value":0},{"time":1791680377,"value":0},{"time":1791680378,"value":0},{"time":1791680379,"value":0},{"time":1791680380,"value":0},{"time":1791680381,"value":0},{"time":1791680382,"value":0},{"time":1791680383,"value":0},{"time":1791680384,"value":0},{"time":1791680385,"value":0},{"time":1791680386,"value":0},{"time":1791680387,"value":0},{"time":1791680388,"value":0},{"time":1791680389,"value":0},{"time":1791680390,"value":0},{"time":1791680391,"value":0},{"time":1791680392,"value":0},{"time":1791680393,"value":0},{"time":1791680394,"value":0},{"time":1791680395,"value":0},{"time":1791680396,"value":0},{"time":1791680397,"value":0},{"time":1791680398,"value":0},{"time":1791680399,"value":0},{"time":1791680400,"value":0},{"time":1791680401,"value":0},{"time":1791680402,"value":0}],"paused":true,"frozenNow":1791680402259});
  return <MotionConfig reducedMotion="user">
    <main style={{ maxWidth: 880, margin: "auto", padding: "var(--rain-space-24)" }}>
      <button onClick={() => setRevision(value => value + 1)}>更新数据</button>
      <div className="rain-chart" data-rain-id="chart-live-line" data-recipe="trend-soft">
        <ChartExample id="live-line" recipe="trend-soft" revision={revision} reduced={reduced} state="zero" boundaryScenario={boundaryScenario} onBoundaryScenarioChange={setBoundaryScenario} size="standard" miniSize="compact" seriesCount={3} liveSettings={liveSettings} onLiveSettingsChange={setLiveSettings} />
      </div>
    </main>
  </MotionConfig>;
}

createRoot(document.getElementById("root")!).render(<App />);