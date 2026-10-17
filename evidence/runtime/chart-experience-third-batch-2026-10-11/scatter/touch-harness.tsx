// Browser-only evidence fixture; this is not a registry or application source.
import { createRoot } from "react-dom/client";
import { Scatter, ScatterChart, useChart } from "../../../../packages/ui/src/charts/index";

function SelectionProbe() {
  const { selection, tooltipData } = useChart();
  return <text data-scatter-touch-probe x={8} y={18}>{JSON.stringify({ selection, value: tooltipData?.point.value ?? null })}</text>;
}

export function mountScatterTouchHarness(element: HTMLElement) {
  const root = createRoot(element);
  root.render(<main style={{ padding: 33 }}>
    <p>真实 Scatter 触摸专项，仅供浏览器证据。</p>
    <ScatterChart data={[{ date: new Date(2026, 8, 1), value: 4 }, { date: new Date(2026, 8, 2), value: 0 }, { date: new Date(2026, 8, 3), value: 8 }]}
      animationDuration={0} aspectRatio="" margin={{ top: 24, right: 16, bottom: 24, left: 16 }} className="scatter-touch-evidence">
      <Scatter dataKey="value" animate={false} /><SelectionProbe />
    </ScatterChart>
    <div style={{ height: 1800 }}>滚动区域</div>
  </main>);
  return () => root.unmount();
}
