import { useRef, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { DensityProvider } from "@rain-next/foundations";
import { Alert, AlertActions, AlertDescription, AlertTitle, alertClassicShortRecipe } from "./alert";

test("static information remains readable without a live region, timer or close action", () => {
  const { container, rerender } = render(<Alert><AlertTitle>发布后可查看成绩</AlertTitle><AlertDescription>学生可以查看评分与评语。</AlertDescription></Alert>);
  const root = container.querySelector('[data-rain-id="ui-alert"]')!;
  expect(root).toHaveAttribute("data-tone", "info");
  expect(root).toHaveAttribute("data-presentation", "page");
  expect(root).not.toHaveAttribute("role");
  expect(screen.queryByRole("button")).toBeNull();
  expect(root.querySelector('[data-slot="icon"]')).toHaveAttribute("aria-hidden", "true");
  rerender(<Alert tone="error" role="alert" icon={false}>网络已断开</Alert>);
  expect(screen.getByRole("alert")).toHaveTextContent("网络已断开");
  expect(root.querySelector('[data-slot="icon"]')).toBeNull();
});

test("single-line alerts omit the default icon while composed alerts keep it", () => {
  const { container } = render(<><Alert>单行提示</Alert><Alert tone="warning"><AlertTitle>需要处理</AlertTitle><AlertDescription>请补全设置。</AlertDescription></Alert></>);
  const alerts = container.querySelectorAll('[data-rain-id="ui-alert"]');
  const single = alerts.item(0), composed = alerts.item(1);
  expect(single).toHaveAttribute("data-has-icon", "false");
  expect(single.querySelector('[data-slot="icon"]')).toBeNull();
  expect(composed).toHaveAttribute("data-has-icon", "true");
  expect(composed.querySelector('[data-icon-variant="filled"]')).toBeTruthy();
});

test("close requests do not hide an Alert or submit its enclosing form", async () => {
  const user = userEvent.setup(), onClose = vi.fn(), onSubmit = vi.fn();
  render(<form onSubmit={onSubmit}><Alert onClose={onClose}>维护公告</Alert></form>);
  const close = screen.getByRole("button", { name: "关闭提示" });
  close.focus(); await user.keyboard("{Enter}");
  expect(onClose).toHaveBeenCalledTimes(1);
  expect(onSubmit).not.toHaveBeenCalled();
  expect(screen.getByText("维护公告")).toBeVisible();
});

test("the host dismisses and restores a notice while retaining a focus destination", async () => {
  function Host() {
    const [shown, setShown] = useState(true), restore = useRef<HTMLButtonElement>(null);
    return <><button ref={restore} onClick={() => setShown(true)}>查看维护公告</button>{shown && <Alert presentation="banner" onClose={() => { setShown(false); restore.current?.focus(); }}>今晚维护</Alert>}</>;
  }
  const user = userEvent.setup(); render(<Host />);
  await user.click(screen.getByRole("button", { name: "关闭提示" }));
  expect(screen.queryByText("今晚维护")).toBeNull();
  expect(screen.getByRole("button", { name: "查看维护公告" })).toHaveFocus();
  await user.keyboard("{Enter}");
  expect(screen.getByText("今晚维护")).toBeVisible();
});

test("density and the explicit classic recipe remain independent; actions keep native semantics", async () => {
  const action = vi.fn(), user = userEvent.setup();
  const { container, rerender } = render(<DensityProvider density="compact"><Alert tone="warning"><AlertTitle>待检查</AlertTitle><AlertActions><button onClick={action}>检查题目</button></AlertActions></Alert></DensityProvider>);
  const root = container.querySelector('[data-rain-id="ui-alert"]')!;
  expect(root).toHaveAttribute("data-density", "compact");
  expect(root).not.toHaveAttribute("data-local-recipe");
  await user.click(screen.getByRole("button", { name: "检查题目" })); expect(action).toHaveBeenCalledTimes(1);
  rerender(<Alert tone="warning" icon={false} localRecipe={alertClassicShortRecipe}>仍需检查</Alert>);
  const classic = container.querySelector('[data-rain-id="ui-alert"]');
  expect(classic).toHaveAttribute("data-local-recipe", "alert-classic-short");
  expect(classic).toHaveAttribute("data-density", "default");
});
