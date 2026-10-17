import { createRef, useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { Button, Checkbox, DropdownMenu, Popover, Radio } from "../index";

it("shares Checkbox and Radio visuals without adding form controls to menu items", async () => {
  const user = userEvent.setup();
  render(<><Checkbox label="原生复选" defaultChecked /><Radio label="原生单选" checked name="native" value="a" onCheckedChange={() => {}} />
    <DropdownMenu.Root defaultOpen closeOnAction={false}><DropdownMenu.Trigger>视觉复用</DropdownMenu.Trigger><DropdownMenu.Content>
      <DropdownMenu.CheckboxItem label="菜单复选" defaultChecked />
      <DropdownMenu.CheckboxItem label="锁定复选" checked disabled />
      <DropdownMenu.RadioGroup defaultValue="a"><DropdownMenu.RadioItem label="菜单单选" value="a" /></DropdownMenu.RadioGroup>
    </DropdownMenu.Content></DropdownMenu.Root></>);
  for (const kind of ["checkbox", "radio"] as const) {
    const native = screen.getByRole(kind).closest("label")!;
    const item = await screen.findByRole(`menuitem${kind}`, { name: kind === "checkbox" ? "菜单复选" : "菜单单选" });
    expect(item.querySelector('[data-slot="canvas"]')?.outerHTML).toBe(native.querySelector('[data-slot="canvas"]')!.outerHTML);
    expect(item.querySelector("input, label, button, [tabindex]")).toBeNull();
    expect(item.querySelector('[data-slot="indicator"]')).toHaveAttribute("data-state", "checked");
  }
  const checkbox = screen.getByRole("menuitemcheckbox", { name: "菜单复选" });
  await user.click(checkbox);
  expect(checkbox).toHaveAttribute("aria-checked", "false");
  expect(checkbox.querySelector('[data-slot="control"]')).toBeEmptyDOMElement();
  expect(screen.getByRole("menuitemcheckbox", { name: "锁定复选" }).querySelector('[data-slot="indicator"]')).toHaveAttribute("data-disabled", "true");
});

it.each([true, false])("uses the recipe close policy for action, checkbox, radio and link (%s)", async (closeOnAction) => {
  expect(DropdownMenu).toBeDefined();
  const user = userEvent.setup();
  render(<DropdownMenu.Root closeOnAction={closeOnAction}>
    <DropdownMenu.Trigger render={<Button>设置</Button>} />
    <DropdownMenu.Content>
      <DropdownMenu.Item label="记录" />
      <DropdownMenu.CheckboxItem label="显示归档" />
      <DropdownMenu.RadioGroup defaultValue="date"><DropdownMenu.RadioItem value="name" label="按名称" /></DropdownMenu.RadioGroup>
      <DropdownMenu.LinkItem href="#target" label="查看说明" />
      <DropdownMenu.Item label="覆盖策略" closeOnClick={!closeOnAction} />
    </DropdownMenu.Content>
  </DropdownMenu.Root>);
  const trigger = screen.getByRole("button", { name: "设置" });
  for (const name of ["记录", "显示归档", "按名称", "查看说明", "覆盖策略"]) {
    if (trigger.getAttribute("aria-expanded") !== "true") await user.click(trigger);
    await user.click(await screen.findByText(name));
    const closes = name === "覆盖策略" ? !closeOnAction : closeOnAction;
    await waitFor(() => expect(trigger).toHaveAttribute("aria-expanded", String(!closes)));
  }
});

it("retains controlled selection, disabled reasons and one semantic target per menu item", async () => {
  expect(DropdownMenu).toBeDefined();
  const user = userEvent.setup(), change = vi.fn(), activate = vi.fn();
  render(<DropdownMenu.Root closeOnAction={false}>
    <DropdownMenu.Trigger render={<Button>菜单</Button>} />
    <DropdownMenu.Content>
      <DropdownMenu.CheckboxItem label="显示归档" checked onCheckedChange={change} />
      <DropdownMenu.CheckboxItem label="保留资料" checked disabled description="管理员锁定" critical onClick={activate} />
      <DropdownMenu.Item label="正在导出" pending onClick={activate} />
    </DropdownMenu.Content>
  </DropdownMenu.Root>);
  await user.click(screen.getByRole("button", { name: "菜单" }));
  const item = await screen.findByRole("menuitemcheckbox", { name: "显示归档" });
  await user.click(item);
  expect(change).toHaveBeenCalledTimes(1);
  expect(item).toHaveAttribute("aria-checked", "true");
  const locked = screen.getByRole("menuitemcheckbox", { name: "保留资料" });
  expect(locked).toHaveAccessibleDescription("管理员锁定");
  expect(locked).toHaveAttribute("aria-checked", "true");
  fireEvent.click(locked); fireEvent.click(screen.getByRole("menuitem", { name: "正在导出" }));
  expect(activate).not.toHaveBeenCalled();
  expect(screen.getByRole("menu").querySelector("input, label, button")).toBeNull();
});

it("forwards open reasons and leaves controlled open state with its owner", async () => {
  expect(DropdownMenu).toBeDefined();
  const user = userEvent.setup(), opened = vi.fn(), ref = createRef<HTMLElement>();
  render(<DropdownMenu.Root open onOpenChange={opened}>
    <DropdownMenu.Trigger ref={ref} render={<Button>固定菜单</Button>} />
    <DropdownMenu.Content><DropdownMenu.Item label="完成" /></DropdownMenu.Content>
  </DropdownMenu.Root>);
  await user.click(await screen.findByRole("menuitem", { name: "完成" }));
  expect(opened).toHaveBeenCalledWith(false, expect.objectContaining({ reason: "item-press" }));
  expect(ref.current).toHaveAttribute("aria-expanded", "true");
});

it("updates a portaled submenu with its nearest theme and inherits recipe policy", async () => {
  expect(DropdownMenu).toBeDefined();
  const user = userEvent.setup();
  const content = <DropdownMenu.Root closeOnAction={false}>
    <DropdownMenu.Trigger render={<Button>主题菜单</Button>} />
    <DropdownMenu.Content><DropdownMenu.SubmenuRoot>
      <DropdownMenu.SubmenuTrigger label="导出" openOnHover={false} />
      <DropdownMenu.Content><DropdownMenu.Item label="当前视图" /></DropdownMenu.Content>
    </DropdownMenu.SubmenuRoot></DropdownMenu.Content>
  </DropdownMenu.Root>;
  const view = render(<div data-rain-theme="dark">{content}</div>);
  await user.click(screen.getByRole("button", { name: "主题菜单" }));
  await user.click(await screen.findByRole("menuitem", { name: "导出" }));
  const item = await screen.findByRole("menuitem", { name: "当前视图" });
  expect(item.closest("[data-rain-theme]")).toHaveAttribute("data-rain-theme", "dark");
  await user.click(item);
  expect(screen.getAllByRole("menu")).toHaveLength(2);
  view.rerender(<div data-rain-theme="light">{content}</div>);
  await waitFor(() => expect(item.closest("[data-rain-theme]")).toHaveAttribute("data-rain-theme", "light"));
});

it("retains built-in and external descriptions when item content is replaced", async () => {
  render(<><p id="external-menu-note">外部原因</p><DropdownMenu.Root defaultOpen>
    <DropdownMenu.Trigger>说明菜单</DropdownMenu.Trigger><DropdownMenu.Content>
      <DropdownMenu.Item label="常规条目" description="内部原因" aria-describedby="external-menu-note" />
      <DropdownMenu.Item label="自定义条目" description="完整说明"><span>自定义布局</span></DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root></>);
  expect(await screen.findByRole("menuitem", { name: "常规条目" })).toHaveAccessibleDescription("外部原因 内部原因");
  expect(screen.getByRole("menuitem", { name: "自定义条目" })).toHaveAccessibleDescription("完整说明");
});

it("keeps trigger refs independent and follows the active trigger's visual context", async () => {
  const a = createRef<HTMLElement>(), b = createRef<HTMLElement>(), user = userEvent.setup();
  render(<DropdownMenu.Root>
    <div data-rain-theme="dark" data-density="compact"><DropdownMenu.Trigger ref={a}>深色入口</DropdownMenu.Trigger></div>
    <div data-rain-theme="light"><DropdownMenu.Trigger ref={b}>浅色入口</DropdownMenu.Trigger></div>
    <DropdownMenu.Content><DropdownMenu.Item label="当前操作" /></DropdownMenu.Content>
  </DropdownMenu.Root>);
  expect(a.current).toHaveTextContent("深色入口"); expect(b.current).toHaveTextContent("浅色入口");
  await user.click(a.current!);
  const portal = (await screen.findByRole("menu")).closest(".rain-popup-positioner")!;
  expect(portal).toHaveAttribute("data-rain-theme", "dark"); expect(portal).toHaveAttribute("data-density", "compact");
  expect((portal as HTMLElement).style.getPropertyValue("--rain-density-control-height")).toBe("30px");
});

it("uses label typeahead with replaced content and keeps caller-owned descriptions", async () => {
  const user = userEvent.setup();
  render(<DropdownMenu.Root><DropdownMenu.Trigger>查找操作</DropdownMenu.Trigger><DropdownMenu.Content>
    <DropdownMenu.Item label="Archive" />
    <DropdownMenu.Item label="Copy" disabled />
    <DropdownMenu.Item label="Delete" descriptionId="custom-menu-description" selected aria-current="true">
      <span>删除当前课程</span><span id="custom-menu-description">当前对象</span>
    </DropdownMenu.Item>
  </DropdownMenu.Content></DropdownMenu.Root>);
  screen.getByRole("button", { name: "查找操作" }).focus(); await user.keyboard("{ArrowDown}");
  await waitFor(() => expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveFocus());
  await user.keyboard("d");
  const item = screen.getByRole("menuitem", { name: "Delete" });
  await waitFor(() => expect(item).toHaveFocus());
  expect(item).toHaveAccessibleDescription("当前对象");
  expect(item.querySelector('[data-slot="confirmation"]')).not.toBeNull();
});

it.each([DropdownMenu, Popover])("keeps an explicit active trigger's theme when another trigger mounts", async Popup => {
  for (const controlled of [false, true]) {
    const content = (secondary: boolean) => <Popup.Root defaultOpen {...(controlled ? { triggerId: "active-popup-trigger" } : { defaultTriggerId: "active-popup-trigger" })}>
      <div data-rain-theme="dark"><Popup.Trigger id="active-popup-trigger">主入口</Popup.Trigger></div>
      {secondary && <div data-rain-theme="light"><Popup.Trigger>另一个入口</Popup.Trigger></div>}
      <Popup.Content aria-label="入口测试面板">测试内容</Popup.Content>
    </Popup.Root>;
    const view = render(content(false));
    const panel = await screen.findByLabelText("入口测试面板");
    expect(panel.closest(".rain-popup-positioner")).toHaveAttribute("data-rain-theme", "dark");
    view.rerender(content(true));
    expect(screen.getByRole("button", { name: "主入口" })).toHaveAttribute("aria-expanded", "true");
    expect(panel.closest(".rain-popup-positioner")).toHaveAttribute("data-rain-theme", "dark");
    view.unmount();
  }
});

it.each([DropdownMenu, Popover])("forwards the actual trigger element after its render element changes", Popup => {
  const ref = createRef<HTMLElement>();
  const content = (link: boolean) => <Popup.Root><Popup.Trigger ref={ref} nativeButton={!link} render={link ? <a href="#target" /> : undefined}>切换入口</Popup.Trigger></Popup.Root>;
  const view = render(content(false)), old = ref.current;
  view.rerender(content(true));
  expect(ref.current).toBe(screen.getByRole("button", { name: "切换入口" }));
  expect(ref.current?.tagName).toBe("A"); expect(old?.isConnected).toBe(false);
});

it("returns to an explicit remaining target when an action removes its trigger", async () => {
  const user = userEvent.setup(), fallback = createRef<HTMLButtonElement>();
  function Fixture() {
    const [visible, setVisible] = useState(true);
    return <><Button ref={fallback}>返回课程列表</Button><DropdownMenu.Root>
      {visible && <DropdownMenu.Trigger>临时课程</DropdownMenu.Trigger>}
      <DropdownMenu.Content finalFocus={fallback}><DropdownMenu.Item label="移除演示课程" onClick={() => setVisible(false)} /></DropdownMenu.Content>
    </DropdownMenu.Root></>;
  }
  render(<Fixture />); await user.click(screen.getByRole("button", { name: "临时课程" }));
  await user.click(await screen.findByRole("menuitem", { name: "移除演示课程" }));
  await waitFor(() => expect(fallback.current).toHaveFocus());
});
