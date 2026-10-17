import { expect, test } from "vitest";
import { chartExampleFiles } from "./chart-example-source";

for (const [id, boundaryScenario] of [["pie", "pie-small"], ["ring", "ring-zero-goal"], ["funnel", "funnel-missing"], ["sankey", "sankey-zero-link"]] as const) {
  test(`${id}: the real download restores the selected boundary and keeps its control editable`, () => {
    const files = chartExampleFiles({ id, recipe: "monochrome-blue", revision: 2, boundaryScenario });
    const main = files["main.tsx"]!;
    expect(main).toContain(`useState<ChartBoundaryScenario>("${boundaryScenario}")`);
    expect(main).toContain("boundaryScenario={boundaryScenario}");
    expect(main).toContain("onBoundaryScenarioChange={setBoundaryScenario}");
    expect(main).toContain("useState(2)");
    expect(files["chart-examples.tsx"]).toContain("onBoundaryScenarioChange");
    expect(files["chart-data.ts"]).toContain("ChartBoundaryScenario");
  });
}
