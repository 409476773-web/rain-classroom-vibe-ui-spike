import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { Gauge } from "./vendor/charts/gauge";

test.each(["arc", "linear"] as const)("zero-duration %s Gauge shows every notch in its first Motion DOM frame", orientation => {
  const view = render(<Gauge orientation={orientation} width={320} height={240} value={72} enterTransition={{ duration: 0 }} enterStaggerScale={0} />);
  const paths = view.container.querySelectorAll<SVGPathElement>("svg path");
  expect(paths).toHaveLength(69);
  for (const path of paths) expect(path.getAttribute("opacity")).toBe("1");
});

test("ordinary Gauge retains its entry animation", () => {
  const view = render(<Gauge width={320} height={240} value={72} />);
  expect(view.container.querySelector<SVGPathElement>("svg path")!.getAttribute("opacity")).toBe("0");
});
