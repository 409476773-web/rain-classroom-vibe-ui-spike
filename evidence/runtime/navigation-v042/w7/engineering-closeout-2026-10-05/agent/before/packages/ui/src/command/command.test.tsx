import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Command } from "./command";

const groups = [{ value: "任务", items: [
  { value: "open-panel", label: "打开任务面板" },
  { value: "archive", label: "归档任务" },
] }] as const;

it("filters commands, shows empty only for no results and executes the active item with Enter", async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();
  render(
    <Command items={groups}>
      <Command.Input placeholder="搜索命令" />
      <Command.Empty>没有匹配命令</Command.Empty>
      <Command.List>
        {(group: typeof groups[number]) => <Command.Group key={group.value} items={group.items}>
          <Command.GroupLabel>{group.value}</Command.GroupLabel>
          <Command.Collection>{(item: typeof groups[number]["items"][number]) => <Command.Item key={item.value} value={item} onSelect={item.value === "open-panel" ? onSelect : undefined}>{item.label}</Command.Item>}</Command.Collection>
        </Command.Group>}
      </Command.List>
    </Command>,
  );

  const input = screen.getByRole("combobox", { name: "搜索命令" });
  expect(screen.queryByText("没有匹配命令")).not.toBeInTheDocument();
  await user.type(input, "打开");
  expect(screen.getByRole("option", { name: "打开任务面板" })).toBeVisible();
  expect(screen.queryByRole("option", { name: "归档任务" })).not.toBeInTheDocument();
  await user.keyboard("{Enter}");
  expect(onSelect).toHaveBeenCalledTimes(1);
  await user.clear(input);
  await user.type(input, "不存在");
  expect(screen.getByText("没有匹配命令")).toBeVisible();
});
