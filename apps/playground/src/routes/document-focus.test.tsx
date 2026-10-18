import { StrictMode } from "react";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";

const gates = vi.hoisted(() => {
  function deferred() {
    let resolve!: () => void;
    const promise = new Promise<void>(done => { resolve = done; });
    return { promise, resolve };
  }
  return { g5: deferred(), interaction: deferred(), media: deferred() };
});
// Only the network/module boundary is controlled. The production Suspense and focus owner run unchanged.
vi.mock("../docs/components/g5-component-pages", async () => {
  await gates.g5.promise;
  return { G5ComponentPage: ({ component }: { component: string }) => <h1 id={`${component}-title`} tabIndex={-1}>{component} document</h1> };
});
vi.mock("../docs/components/g6-interaction-pages", async () => {
  await gates.interaction.promise;
  return { G6InteractionPage: ({ component }: { component: string }) => <h1 id={`${component}-title`} tabIndex={-1}>{component} document</h1> };
});
vi.mock("../docs/components/g6-media-pages", async () => {
  await gates.media.promise;
  return { G6MediaPage: ({ component }: { component: string }) => <h1 id={`${component}-title`} tabIndex={-1}>{component} document</h1> };
});
import { ComponentAssetPage } from "../docs/components/component-asset-page";

afterEach(cleanup);

it("focuses a first lazy document only after commit, and also focuses a cached module's next document", async () => {
  const view = render(<StrictMode><button>Outside document</button><ComponentAssetPage component="slider" navigationCount={1} /></StrictMode>);
  const outside = screen.getByRole("button", { name: "Outside document" });
  outside.focus();
  expect(screen.getByRole("status")).toHaveTextContent("正在载入表单组件");
  expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  expect(outside).toHaveFocus();
  await act(async () => { gates.g5.resolve(); await gates.g5.promise; });
  await waitFor(() => expect(screen.getByRole("heading", { name: "slider document" })).toHaveFocus());
  outside.focus();
  view.rerender(<StrictMode><button>Outside document</button><ComponentAssetPage component="calendar" navigationCount={2} /></StrictMode>);
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "calendar document" })).toHaveFocus();
});

it("does not let a late module resolution steal focus after the active document changes", async () => {
  const view = render(<StrictMode><button>Outside document</button><ComponentAssetPage component="drawer" navigationCount={1} /></StrictMode>);
  screen.getByRole("button", { name: "Outside document" }).focus();
  expect(screen.getByRole("status")).toHaveTextContent("正在载入交互组件");
  view.rerender(<StrictMode><button>Outside document</button><ComponentAssetPage component="switch" navigationCount={2} /></StrictMode>);
  const current = screen.getByRole("heading", { level: 1, name: "Switch 开关" });
  expect(current).toHaveFocus();
  await act(async () => { gates.interaction.resolve(); await gates.interaction.promise; });
  expect(screen.queryByRole("heading", { name: "drawer document" })).not.toBeInTheDocument();
  expect(current).toHaveFocus();
});

it("preserves the existing initial-direct-open navigationCount=0 focus contract after a slow load", async () => {
  render(<StrictMode><button>Outside document</button><ComponentAssetPage component="aspect-ratio" /></StrictMode>);
  const outside = screen.getByRole("button", { name: "Outside document" });
  outside.focus();
  expect(screen.getByRole("status")).toHaveTextContent("正在载入组件文档");
  await act(async () => { gates.media.resolve(); await gates.media.promise; });
  expect(await screen.findByRole("heading", { name: "aspect-ratio document" })).toBeInTheDocument();
  expect(outside).toHaveFocus();
});
