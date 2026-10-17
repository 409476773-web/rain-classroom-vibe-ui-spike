import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ComponentDoc } from "./component-doc";

afterEach(() => { cleanup(); document.documentElement.removeAttribute("data-rain-theme"); });

it("clears its page theme when the page had no theme before mounting", () => {
  const view = render(<ComponentDoc id="test" title="文档" description="说明" source="test.tsx" code="<Demo />" props={[]} useWhen={[]} avoidWhen={[]}><div>示例</div></ComponentDoc>);
  expect(document.documentElement).toHaveAttribute("data-rain-theme", "light");
  view.unmount();
  expect(document.documentElement).not.toHaveAttribute("data-rain-theme");
});

it("applies the document preview theme to the page and restores the previous theme on leaving", () => {
  document.documentElement.setAttribute("data-rain-theme", "light");
  const view = render(<ComponentDoc id="test" title="文档" description="说明" source="test.tsx" code="<Demo />" props={[]} useWhen={[]} avoidWhen={[]}><div>示例</div></ComponentDoc>);
  fireEvent.click(screen.getByRole("button", { name: "深色" }));
  expect(document.documentElement).toHaveAttribute("data-rain-theme", "dark");
  view.unmount();
  expect(document.documentElement).toHaveAttribute("data-rain-theme", "light");
});
