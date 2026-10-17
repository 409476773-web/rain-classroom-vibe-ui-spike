import { useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { TimeSeriesChartInner } from "../../../packages/ui/src/charts/vendor/charts/time-series-chart-shell";
import { StaticChartPreviewProvider } from "../../../packages/ui/src/charts/vendor/charts/static-chart-preview-context";
import { XAxis } from "../../../packages/ui/src/charts/vendor/charts/x-axis";
import { Line } from "../../../packages/ui/src/charts/vendor/charts/line";

// Evidence-only native consumer: change the time domain without resizing the plot.
function Consumer() {
  const [extended, setExtended] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const data = [1, 2, extended ? 5 : 3].map((day, index) => ({ date: new Date(`2026-09-0${day}T00:00:00Z`), value: 20 + index * 10 }));
  return <>
    <button onClick={() => setExtended(value => !value)}>Change time domain</button>
    <div data-test-axis-host="" className="rain-chart" ref={containerRef} style={{ position: "relative", width: 600, height: 220 }}>
      <StaticChartPreviewProvider><TimeSeriesChartInner width={600} height={220} data={data} xDataKey="date"
        margin={{ left: 40, right: 40, top: 20, bottom: 30 }} animationDuration={1100}
        yDomainTween={false} clipPathId="native-axis-consumer" containerRef={containerRef}
        lines={[{ dataKey: "value", stroke: "var(--chart-1)", strokeWidth: 2 }]}
      ><Line dataKey="value" stroke="var(--chart-1)" /><XAxis numTicks={3} /></TimeSeriesChartInner></StaticChartPreviewProvider>
    </div>
  </>;
}

const original = document.getElementById("root");
if (original) original.style.display = "none";
const mount = document.getElementById("native-axis-consumer") ?? document.createElement("main");
mount.id = "native-axis-consumer";
if (!mount.isConnected) document.body.append(mount);
const state = window as unknown as { __nativeAxisRoot?: Root };
state.__nativeAxisRoot ??= createRoot(mount);
state.__nativeAxisRoot.render(<Consumer />);
