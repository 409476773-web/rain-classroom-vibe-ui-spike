import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, it, vi } from "vitest";
import * as UI from "../index";

it("keeps the real trigger, owner events and existing descriptions; closes without stealing focus", async () => {
  expect(UI.Tooltip).toBeDefined();
  const click = vi.fn(), user = userEvent.setup();
  render(<><span id="existing">原说明</span><UI.Tooltip text="查看完整名称" openDelay={0}>
    <UI.Button aria-describedby="existing" onClick={click}>查看</UI.Button>
  </UI.Tooltip></>);
  const trigger = screen.getByRole("button", { name: "查看" });
  await user.tab();
  expect(await screen.findByRole("tooltip")).toHaveTextContent("查看完整名称");
  expect(trigger).toHaveAccessibleDescription("原说明 查看完整名称");
  expect(trigger).toHaveFocus();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
  await user.click(trigger);
  expect(click).toHaveBeenCalledOnce();
});

it("suppresses empty/disabled content without disabling the owner and supports a target portal", async () => {
  const target = document.createElement("div"); document.body.append(target);
  const view = render(<UI.Tooltip text="提示" open portal portalTarget={target} showArrow={false}><button>目标</button></UI.Tooltip>);
  expect(await screen.findByRole("tooltip")).toHaveTextContent("提示");
  expect(target.querySelector('[role="tooltip"]')).toBeTruthy();
  expect(target.querySelector('[data-slot="arrow"]')).toBeNull();
  view.rerender(<UI.Tooltip text=" " open><button>目标</button></UI.Tooltip>);
  expect(screen.queryByRole("tooltip")).toBeNull();
  expect(screen.getByRole("button")).not.toHaveAttribute("aria-describedby");
  view.rerender(<UI.Tooltip text="提示" open disabled><button>目标</button></UI.Tooltip>);
  expect(screen.queryByRole("tooltip")).toBeNull();
  expect(screen.getByRole("button")).toBeEnabled();
  for (const portalTarget of [null, () => null]) {
    view.rerender(<UI.Tooltip text="默认容器" open portal portalTarget={portalTarget}><button>目标</button></UI.Tooltip>);
    expect(await screen.findByRole("tooltip")).toHaveTextContent("默认容器");
    expect(target.querySelector('[role="tooltip"]')).toBeNull();
  }
  view.unmount(); target.remove();
});

it("lets the owner accept open changes and updates plain text while open", async () => {
  const user = userEvent.setup();
  function Example() {
    const [open, setOpen] = useState(false);
    return <UI.Tooltip text={open ? "已打开" : "未打开"} open={open} onOpenChange={setOpen}><button>受控提示</button></UI.Tooltip>;
  }
  render(<Example />);
  await user.tab();
  expect(await screen.findByRole("tooltip")).toHaveTextContent("已打开");
  await user.tab();
  await waitFor(() => expect(screen.queryByRole("tooltip")).toBeNull());
});
