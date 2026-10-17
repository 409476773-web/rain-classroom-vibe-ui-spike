import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { VariantTable } from "./shared";
test("precise tables keep local calendar dates and distinguish valid zero from missing", () => {
  render(<VariantTable data={[{ 日期: new Date(2026, 3, 1), 活跃等级: 0 }, { 日期: new Date(2026, 8, 26), 活跃等级: null }]} />);
  const table=screen.getByRole("table",{hidden:true});
  expect(table).toHaveTextContent("2026-04-01");expect(table).toHaveTextContent("2026-09-26");
  expect(table.querySelector("tbody tr:first-child td")).toHaveTextContent("0");
  expect(table.querySelector("tbody tr:last-child td")).toHaveTextContent("缺测");
});

test("changing reduced motion updates the running page and releases its media listener", async () => {
  const { act } = await import("@testing-library/react");
  const { vi } = await import("vitest");
  const { useChartReducedMotion } = await import("./shared");
  const listeners = new Set<() => void>();
  const media = { matches: false, addEventListener: (_event: string, callback: () => void) => listeners.add(callback), removeEventListener: (_event: string, callback: () => void) => listeners.delete(callback) };
  vi.stubGlobal("matchMedia", () => media);
  function Probe() { return <output>{String(useChartReducedMotion())}</output>; }
  const view = render(<Probe />);
  expect(view.getByRole("status")).toHaveTextContent("false");
  act(() => { media.matches = true; listeners.forEach(listener => listener()); });
  expect(view.getByRole("status")).toHaveTextContent("true");
  view.unmount();expect(listeners.size).toBe(0);vi.unstubAllGlobals();
});

test("exportable choices preserve explicit zero and false, and merge independently per card", async () => {
  const { fireEvent } = await import("@testing-library/react");
  const { useState } = await import("react");
  const { useVariantSetting } = await import("./shared");
  function Probe() {
    const [settings, setSettings] = useState<import("./shared").VariantSettings>({ value: 0, loading: false });
    const props = { settings, onSettingsChange: (patch: import("./shared").VariantSettings) => setSettings(previous => ({ ...previous, ...patch })) };
    const [value, setValue] = useVariantSetting("value", null, props);
    const [loading, setLoading] = useVariantSetting("loading", true, props);
    return <><output>{JSON.stringify(settings)}</output><button onClick={() => setValue(100)}>{String(value)}</button><button onClick={() => setLoading(previous => !previous)}>{String(loading)}</button></>;
  }
  const view = render(<Probe />);
  fireEvent.click(view.getByRole("button", { name: "0" }));
  expect(view.getByRole("status")).toHaveTextContent('{"value":100,"loading":false}');
  fireEvent.click(view.getByRole("button", { name: "false" }));
  expect(view.getByRole("status")).toHaveTextContent('{"value":100,"loading":true}');
});
