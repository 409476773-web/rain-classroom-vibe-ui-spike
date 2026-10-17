import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { App } from "../app";

afterEach(() => { cleanup(); window.location.hash = ""; });

it("opens the existing Switch documentation through its public Playground URL", async () => {
  window.location.hash = "#switch";
  render(<App />);
  expect(await screen.findByRole("heading", { level: 1, name: "Switch 开关" }, { timeout: 5000 })).toBeInTheDocument();
  expect(screen.getByRole("switch", { name: "自动发布" })).toBeInTheDocument();
});

it("makes completed G1/G2/G3 and navigation assets discoverable from Components", () => {
  window.location.hash = "#components";
  render(<App />);
  for (const name of ["Accordion 折叠组", "Toast 操作反馈", "Command 命令检索", "Workspace 工作区布局"])
    expect(screen.getByRole("link", { name })).toBeInTheDocument();
});

it.each(["navigation-list", "navigation-bar"])("keeps same-document %s query focus in the scene and focuses another document", async component => {
  window.location.hash = `#${component}`;
  render(<App />);
  await screen.findByRole("heading", { level: 1 });
  const destination = document.querySelector<HTMLAnchorElement>(`[data-demo-component="${component}"] a[href="#${component}?view=overview"]`)!;
  destination.focus();
  await act(async () => { window.location.hash = `#${component}?view=overview`; fireEvent(window, new HashChangeEvent("hashchange")); });
  expect(destination).toHaveFocus();
  await act(async () => { window.location.hash = "#switch"; fireEvent(window, new HashChangeEvent("hashchange")); });
  const heading = await screen.findByRole("heading", { level: 1, name: "Switch 开关" });
  await waitFor(() => expect(heading).toHaveFocus());
});
