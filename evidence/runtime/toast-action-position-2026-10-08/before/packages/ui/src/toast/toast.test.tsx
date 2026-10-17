import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../button/button";
import { Toaster, createToastManager } from "./toast";

afterEach(cleanup);

describe("shared Toast candidate", () => {
  it("keeps the manager's queue limit and closes only the chosen notification", async () => {
    const user = userEvent.setup(); const manager = createToastManager(); const closed = vi.fn();
    render(<Toaster toastManager={manager} limit={2} timeout={0}><Button onClick={() => {
      manager.add({ title: "第一条", onClose: closed });
      manager.add({ title: "第二条", onClose: closed });
      manager.add({ title: "第三条", onClose: closed });
    }}>添加队列</Button></Toaster>);
    await user.click(screen.getByRole("button", { name: "添加队列" }));
    const first = screen.getByText("第一条").closest('[data-rain-id="ui-toast"]');
    const latest = screen.getByText("第三条").closest('[data-rain-id="ui-toast"]');
    expect(first).toHaveAttribute("data-limited");
    expect(latest).not.toHaveAttribute("data-limited");
    await user.keyboard("{F6}");
    await user.click(within(latest as HTMLElement).getByRole("button", { name: "关闭通知" }));
    expect(closed).toHaveBeenCalledOnce();
    expect(screen.getByText("第二条")).toBeInTheDocument();
  });
});
