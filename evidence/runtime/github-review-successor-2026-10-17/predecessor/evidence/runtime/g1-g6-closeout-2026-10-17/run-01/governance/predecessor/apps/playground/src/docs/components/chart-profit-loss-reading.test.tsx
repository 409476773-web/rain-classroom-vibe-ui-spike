import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";
import { ProfitLossExample } from "./chart-variants/profit-loss";

beforeEach(() => vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} }));

test("profit-loss near-zero reading retains raw sign without hovering", () => {
  render(<ProfitLossExample boundaryScenario="profit-loss-near-zero" reduced />);
  const select=screen.getByRole("combobox",{name:"读取日期"});
  fireEvent.change(select,{target:{value:String(new Date(2026,8,4).getTime())}});
  expect(screen.getByRole("status")).toHaveTextContent("0.001");
  expect(screen.getByRole("status")).toHaveTextContent("正值");
  fireEvent.change(select,{target:{value:String(new Date(2026,8,1).getTime())}});
  expect(screen.getByRole("status")).toHaveTextContent("-0.004");
  expect(screen.getByRole("status")).toHaveTextContent("负值");
  fireEvent.change(select,{target:{value:String(new Date(2026,8,3).getTime())}});
  expect(screen.getByRole("status")).toHaveTextContent("基准值");
});
