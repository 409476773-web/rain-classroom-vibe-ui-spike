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
  const [revision, setRevision] = useState(2);
  const [boundaryScenario, setBoundaryScenario] = useState<ChartBoundaryScenario>("normal");
  const reduced = useChartReducedMotion();
  const [liveSettings, setLiveSettings] = useState<LiveExampleSettings>({"points":[{"time":1791680346,"value":67},{"time":1791680347,"value":67},{"time":1791680348,"value":67},{"time":1791680349,"value":67},{"time":1791680350,"value":68},{"time":1791680351,"value":69},{"time":1791680352,"value":69},{"time":1791680353,"value":70},{"time":1791680354,"value":71},{"time":1791680355,"value":72},{"time":1791680356,"value":73},{"time":1791680357,"value":74},{"time":1791680358,"value":76},{"time":1791680359,"value":77},{"time":1791680360,"value":79},{"time":1791680361,"value":80},{"time":1791680362,"value":82},{"time":1791680363,"value":83},{"time":1791680364,"value":85},{"time":1791680365,"value":87},{"time":1791680366,"value":88},{"time":1791680367,"value":90},{"time":1791680368,"value":92},{"time":1791680369,"value":93},{"time":1791680370,"value":95},{"time":1791680371,"value":97},{"time":1791680372,"value":98},{"time":1791680373,"value":100},{"time":1791680374,"value":101},{"time":1791680375,"value":103},{"time":1791680376,"value":104},{"time":1791680377,"value":105},{"time":1791680378,"value":107},{"time":1791680379,"value":108},{"time":1791680380,"value":109},{"time":1791680381,"value":110},{"time":1791680382,"value":110},{"time":1791680383,"value":111},{"time":1791680384,"value":112},{"time":1791680385,"value":112},{"time":1791680386,"value":112},{"time":1791680387,"value":113},{"time":1791680388,"value":113},{"time":1791680389,"value":113},{"time":1791680390,"value":112},{"time":1791680391,"value":112},{"time":1791680392,"value":112},{"time":1791680393,"value":111},{"time":1791680394,"value":111},{"time":1791680395,"value":110},{"time":1791680396,"value":109},{"time":1791680397,"value":108},{"time":1791680398,"value":107},{"time":1791680399,"value":106},{"time":1791680400,"value":105},{"time":1791680401,"value":104},{"time":1791680402,"value":103},{"time":1791680403,"value":101},{"time":1791680404,"value":100},{"time":1791680405,"value":99}],"paused":true,"frozenNow":1791680405905});
  return <MotionConfig reducedMotion="user">
    <main style={{ maxWidth: 880, margin: "auto", padding: "var(--rain-space-24)" }}>
      <button onClick={() => setRevision(value => value + 1)}>更新数据</button>
      <div className="rain-chart" data-rain-id="chart-live-line" data-recipe="trend-soft">
        <ChartExample id="live-line" recipe="trend-soft" revision={revision} reduced={reduced} state="normal" boundaryScenario={boundaryScenario} onBoundaryScenarioChange={setBoundaryScenario} size="standard" miniSize="compact" seriesCount={3} liveSettings={liveSettings} onLiveSettingsChange={setLiveSettings} />
      </div>
    </main>
  </MotionConfig>;
}

createRoot(document.getElementById("root")!).render(<App />);