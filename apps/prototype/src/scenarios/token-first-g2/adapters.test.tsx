import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Button } from "@rain-next/ui";
import { ButtonGroup } from "./button-group";
import { Toggle } from "./toggle";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Spinner, Skeleton } from "./loading";
import { Toaster, createToastManager } from "./toast";
import { TokenFirstG2Page } from "./page";

afterEach(cleanup);

describe("G2 shared candidates through the original compatibility entries", () => {
  it("keeps command buttons independently tabbable and never submits by default", async () => {
    const user = userEvent.setup(); const submit = vi.fn(e => e.preventDefault()); const run = vi.fn();
    render(<form onSubmit={submit}><ButtonGroup aria-label="编辑操作"><Button variant="tertiary" onClick={run}>撤销</Button><Button variant="tertiary" disabled>重做</Button><Button variant="tertiary">恢复</Button></ButtonGroup></form>);
    await user.tab(); expect(screen.getByRole("button", { name: "撤销" })).toHaveFocus();
    await user.keyboard("{Enter}"); expect(run).toHaveBeenCalledOnce(); expect(submit).not.toHaveBeenCalled();
    await user.tab(); expect(screen.getByRole("button", { name: "恢复" })).toHaveFocus();
  });
  it("keeps controlled Toggle state with the host, supports keyboard, and blocks disabled activation", async () => {
    const user = userEvent.setup(); const disabledChange = vi.fn();
    function Host() { const [pressed, set] = useState(false); return <><Toggle pressed={pressed} onPressedChange={set}>显示批注</Toggle><Toggle disabled onPressedChange={disabledChange}>隐藏姓名</Toggle></>; }
    render(<Host />); await user.tab(); await user.keyboard(" ");
    expect(screen.getByRole("button", { name: "显示批注" })).toHaveAttribute("aria-pressed", "true");
    await user.keyboard("{Enter}"); expect(screen.getByRole("button", { name: "显示批注" })).toHaveAttribute("aria-pressed", "false");
    await user.click(screen.getByRole("button", { name: "隐藏姓名" })); expect(disabledChange).not.toHaveBeenCalled();
  });
  it("supports single and multiple groups with roving focus and disabled skipping", async () => {
    const user = userEvent.setup();
    render(<><ToggleGroup aria-label="单选" defaultValue={["a"]}><ToggleGroupItem value="a">甲</ToggleGroupItem><ToggleGroupItem value="b" disabled>乙</ToggleGroupItem><ToggleGroupItem value="c">丙</ToggleGroupItem></ToggleGroup><ToggleGroup aria-label="多选" multiple><ToggleGroupItem value="x">姓名</ToggleGroupItem><ToggleGroupItem value="y">分数</ToggleGroupItem></ToggleGroup></>);
    await user.tab(); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("button", { name: "丙" })).toHaveFocus();
    await user.keyboard(" "); expect(screen.getByRole("button", { name: "甲" })).toHaveAttribute("aria-pressed", "false"); expect(screen.getByRole("button", { name: "丙" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: "姓名" })); await user.click(screen.getByRole("button", { name: "分数" }));
    expect(screen.getByRole("button", { name: "姓名" })).toHaveAttribute("aria-pressed", "true"); expect(screen.getByRole("button", { name: "分数" })).toHaveAttribute("aria-pressed", "true");
  });
  it("names loading without inventing percentage progress and hides decorative skeletons", () => {
    const { container } = render(<><Spinner aria-label="正在读取作业" /><Skeleton /></>);
    expect(screen.getByRole("status", { name: "正在读取作业" })).toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(container.querySelector('[data-slot="skeleton"]')).toHaveAttribute("aria-hidden", "true");
  });
  it("renders the upstream manager's message and action with scoped theme", async () => {
    const user = userEvent.setup(); const manager = createToastManager(); const action = vi.fn();
    render(<Toaster toastManager={manager} theme="dark"><Button onClick={() => manager.add({ title: "已保存", description: "更改保留在当前示例", timeout: 0, actionProps: { children: "撤回", onClick: action } })}>保存</Button></Toaster>);
    await user.click(screen.getByRole("button", { name: "保存" }));
    const title = await screen.findByText("已保存");
    expect(title.closest('[data-rain-theme]')).toHaveAttribute("data-rain-theme", "dark");
    await user.keyboard("{F6}"); await user.click(screen.getByText("撤回")); expect(action).toHaveBeenCalledOnce();
  });
  it("shows the complete Figma Global Message semantic set", () => {
    const { container } = render(<TokenFirstG2Page />);
    expect(container.querySelectorAll(".g2-message-row")).toHaveLength(7);
    expect(screen.getByText("警告的消息提示")).toBeInTheDocument();
    expect(screen.getByText("帮助用户操作")).toBeInTheDocument();
  });
  it("uses filled status icons for Message and Toast feedback", async () => {
    const user = userEvent.setup();
    const { container } = render(<TokenFirstG2Page />);
    for (const type of ["info", "success", "error", "caution", "warning", "help"]) {
      expect(container.querySelector(`[data-message-type="${type}"] [data-icon]`)).toHaveAttribute("data-icon-color-mode", "intrinsic");
    }
    expect(container.querySelector('[data-message-type="caution"] [data-icon]')).toHaveAttribute("data-icon", "icon/warning-color");
    expect(container.querySelector('[data-message-type="error"] [data-icon]')).toHaveAttribute("data-icon", "icon/error-color");
    expect(container.querySelector('[data-message-type="loading"] [data-icon]')).toHaveAttribute("data-icon", "icon/button-loading");

    await user.click(screen.getByRole("button", { name: "成功提示" }));
    expect(document.querySelector('[data-slot="toast-icon"] [data-icon]')).toHaveAttribute("data-icon", "icon/check-color");
    expect(document.querySelector('[data-slot="toast-icon"] [data-icon]')).toHaveAttribute("data-icon-color-mode", "intrinsic");
  });
});
