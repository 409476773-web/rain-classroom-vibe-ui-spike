import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Breadcrumb } from "./breadcrumb";

it("exposes a real hierarchy and marks the current page", () => {
  render(
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item><Breadcrumb.Link href="#course">课程</Breadcrumb.Link></Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item><Breadcrumb.Page>批改任务</Breadcrumb.Page></Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>,
  );

  expect(screen.getByRole("navigation", { name: "面包屑" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "课程" })).toHaveAttribute("href", "#course");
  expect(screen.getByText("批改任务")).toHaveAttribute("aria-current", "page");
  expect([...screen.getByRole("list").children].every(node => node.tagName === "LI")).toBe(true);
});

it("disabled ancestors cannot navigate or invoke actions", () => {
  const onClick = vi.fn();
  render(<Breadcrumb><Breadcrumb.List><Breadcrumb.Item><Breadcrumb.Link href="/locked" disabled onClick={onClick}>归档课程</Breadcrumb.Link></Breadcrumb.Item></Breadcrumb.List></Breadcrumb>);
  const item = screen.getByText("归档课程").closest("a")!;
  expect(item).not.toHaveAttribute("href");
  expect(item).toHaveAttribute("aria-disabled", "true");
  fireEvent.click(item);
  expect(onClick).not.toHaveBeenCalled();
});

it("uses the whole item to open its sibling menu and restores keyboard focus", async () => {
  const user = userEvent.setup(), navigate = vi.fn(event => event.preventDefault());
  render(<Breadcrumb onClick={navigate} items={[
    { id: "messages", label: "消息中心", href: "/messages" },
    { id: "notices", label: "行政通知", href: "/notices", siblings: [
      { id: "notices", label: "行政通知", href: "/notices" },
      { id: "inbox", label: "消息", href: "/inbox" },
    ] },
    { id: "detail", label: "详情" },
  ]} />);
  expect(screen.queryByRole("link", { name: "行政通知" })).not.toBeInTheDocument();
  const text = within(screen.getByRole("list")).getByText("行政通知");
  await user.click(text);
  expect(navigate).not.toHaveBeenCalled();
  expect(await screen.findByRole("menu")).toBeInTheDocument();
  await user.keyboard("{Escape}");
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  const trigger = screen.getByRole("button", { name: "切换行政通知的同级页面" });
  trigger.focus(); await user.keyboard("{ArrowDown}");
  const menu = await screen.findByRole("menu");
  expect(within(menu).getByRole("menuitem", { name: "消息" })).toHaveAttribute("href", "/inbox");
  expect(within(menu).getByRole("menuitem", { name: "行政通知" })).toHaveAttribute("data-selected", "true");
  await user.keyboard("{Escape}");
  expect(trigger).toHaveFocus();
  expect(within(screen.getByRole("list")).getByText("详情")).toHaveAttribute("aria-current", "page");
});

it("omits empty sibling menus and keeps a static group distinct from disabled text", () => {
  render(<Breadcrumb items={[
    { id: "group", label: "教学管理" },
    { id: "course", label: "课程", href: "/course", siblings: [{ id: "course", label: "课程", href: "/course" }, { id: "disabled", label: "归档", href: "/archive", disabled: true }, { id: "label", label: "分组" }] },
    { id: "page", label: "课程详情" },
  ]} />);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(within(screen.getByRole("list")).getByText("教学管理")).not.toHaveAttribute("aria-disabled");
  expect(within(screen.getByRole("list")).getByText("课程详情")).toHaveAttribute("aria-current", "page");
});
