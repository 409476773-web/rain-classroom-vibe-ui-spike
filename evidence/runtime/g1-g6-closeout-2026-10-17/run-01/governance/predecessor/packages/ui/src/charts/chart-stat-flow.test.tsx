import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ChartStatFlow } from "./vendor/charts/chart-stat-flow";

test("stat units remain separate from the main numeric reading without leading whitespace", () => {
  const view = render(<ChartStatFlow value={500} label="总人数" suffix=" 人" />);
  const unit = screen.getByText("人", { exact: true });
  expect(unit.tagName).toBe("SMALL");
  expect(unit.textContent).toBe("人");
  expect(view.container.querySelector("number-flow-react")?.getAttribute("data-value") ?? view.container.textContent).toContain("500");
  expect(view.container).toHaveTextContent("总人数");
});
