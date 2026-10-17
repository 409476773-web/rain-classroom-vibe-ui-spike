import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { Button, Checkbox, Input, Popover, RadioGroup } from "../index";

it("composes native form controls in a named panel, with close and focus return", async () => {
  expect(Popover).toBeDefined();
  const user = userEvent.setup();
  render(<Popover.Root><Popover.Trigger render={<Button>配置</Button>} />
    <Popover.Content>
      <Popover.Title>新建设置</Popover.Title><Popover.Description>选择发布方式</Popover.Description>
      <Input aria-label="名称" /><Input aria-label="显式大输入" size={36} /><Checkbox label="通知学生" />
      <RadioGroup legend="发布方式" name="publish" options={[{ value: "now", label: "立即发布" }, { value: "draft", label: "保存草稿" }]} />
      <Popover.Close render={<Button>完成</Button>} />
    </Popover.Content>
  </Popover.Root>);
  await user.click(screen.getByRole("button", { name: "配置" }));
  const panel = await screen.findByRole("dialog", { name: "新建设置" });
  expect(panel).toHaveAccessibleDescription("选择发布方式");
  expect(screen.queryByRole("menu")).toBeNull();
  expect(screen.getByRole("button", { name: "配置" })).toHaveAttribute("data-size", "medium");
  expect(screen.getByRole("textbox", { name: "名称" }).closest('[data-rain-id="ui-input"]')).toHaveAttribute("data-size", "24");
  expect(screen.getByRole("textbox", { name: "显式大输入" }).closest('[data-rain-id="ui-input"]')).toHaveAttribute("data-size", "36");
  expect(screen.getByRole("button", { name: "完成" })).toHaveAttribute("data-size", "small");
  await user.type(screen.getByRole("textbox", { name: "名称" }), "学习单元");
  await user.click(screen.getByRole("checkbox", { name: "通知学生" }));
  await user.click(screen.getByRole("radio", { name: "保存草稿" }));
  expect(screen.getByRole("checkbox")).toBeChecked();
  expect(screen.getByRole("radio", { name: "保存草稿" })).toBeChecked();
  await user.click(screen.getByRole("button", { name: "完成" }));
  await waitFor(() => expect(screen.getByRole("button", { name: "配置" })).toHaveFocus());
});

it("keeps a nested Light island and updates its portal while open", async () => {
  expect(Popover).toBeDefined();
  const user = userEvent.setup();
  const content = <Popover.Root><Popover.Trigger render={<Button>主题面板</Button>} />
    <Popover.Content aria-label="主题内容"><Input aria-label="搜索" /></Popover.Content>
  </Popover.Root>;
  const view = render(<div data-rain-theme="dark"><div data-rain-theme="light">{content}</div></div>);
  await user.click(screen.getByRole("button", { name: "主题面板" }));
  const panel = await screen.findByRole("dialog", { name: "主题内容" });
  expect(panel.closest("[data-rain-theme]")).toHaveAttribute("data-rain-theme", "light");
  view.rerender(<div data-rain-theme="dark"><div data-rain-theme="dark">{content}</div></div>);
  await waitFor(() => expect(panel.closest("[data-rain-theme]")).toHaveAttribute("data-rain-theme", "dark"));
});
