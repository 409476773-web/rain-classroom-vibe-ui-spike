import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { DataBar } from "./data-bar";

test("a quantity bar exposes its exact reading and uses a shared maximum", () => {
  const view = render(<DataBar label="参与人数" value={25} maxValue={100} valueText="25 人" />);
  expect(view.getByRole("img", { name: "参与人数，25 人" })).toHaveAttribute("data-fraction", "0.25");
  view.rerender(<DataBar label="参与人数" value={50} maxValue={100} />);
  expect(view.getByRole("img")).toHaveAttribute("data-fraction", "0.5");
  expect(view.queryByRole("progressbar")).toBeNull();
});
test.each([
  [0,100,"zero"], [0,0,"unscaled"], [null,100,"missing"], [120,100,"overflow"],
  [-1,100,"invalid"], [NaN,100,"invalid"], [Infinity,100,"invalid"], [1,0,"invalid"], [10,-1,"invalid"],
] as const)("quantity %s / %s has the truthful %s state", (value,maxValue,state) => {
  const view = render(<DataBar label="人数" value={value} maxValue={maxValue} />);
  const bar = view.getByRole("img");
  expect(bar).toHaveAttribute("data-state", state);
  expect(bar.getAttribute("data-fraction")).not.toMatch(/NaN|Infinity/);
  if (state === "overflow") expect(bar).toHaveAccessibleName(/120.*超出范围/);
});
test("decorative embedding does not duplicate adjacent text or add a tab stop", () => {
  const view = render(<DataBar label="人数" value={25} maxValue={100} decorative />);
  expect(view.queryByRole("img")).toBeNull();
  expect(view.container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  expect(view.container.querySelector("[tabindex]")).toBeNull();
});
