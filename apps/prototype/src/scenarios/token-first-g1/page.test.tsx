import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { TokenFirstG1Page } from "./page";

test("G1 examples consume the shared Alert contract", () => {
  const { container } = render(<TokenFirstG1Page view="samples" />);
  const alerts = container.querySelectorAll('[data-rain-id="ui-alert"]');

  expect(alerts).toHaveLength(2);
  expect(alerts[0]).toHaveAttribute("data-tone", "warning");
  expect(alerts[1]).toHaveAttribute("data-tone", "error");
  expect(container.querySelectorAll('[data-rain-id="local-g1-alert"]')).toHaveLength(0);
});

test("G1 examples consume the shared Switch contract", () => {
  const { container } = render(<TokenFirstG1Page view="samples" />);

  expect(container.querySelectorAll('[data-rain-id="ui-switch"]')).toHaveLength(4);
  expect(container.querySelectorAll('[data-rain-id="local-g1-switch"]')).toHaveLength(0);
});

test("G1 samples keep the existing accordion and collapsible composition through shared entries", async () => {
  const user = userEvent.setup();
  const { container } = render(<TokenFirstG1Page view="samples" />);
  expect(container.querySelectorAll('[data-rain-id="ui-collapsible"]')).toHaveLength(3);
  expect(container.querySelectorAll('[data-rain-id^="local-g1-accordion"], [data-rain-id^="local-g1-collapsible"]')).toHaveLength(0);
  await user.click(screen.getAllByRole("button", { name: "评分细则" })[0]!);
  expect(screen.getByRole("dialog").querySelector('[data-rain-id="ui-accordion"]')).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "长作答如何判断" }));
  expect(screen.getByText("按论证内容判断，不根据字数直接给分；保留每份作答的独立判断。")).toBeVisible();
});
