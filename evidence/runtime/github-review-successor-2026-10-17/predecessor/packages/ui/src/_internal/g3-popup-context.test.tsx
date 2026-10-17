import { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { DensityProvider } from "@rain-next/foundations";
import { Sheet } from "../sheet/sheet";
import { ContextMenu } from "../context-menu/context-menu";
import { HoverCard } from "../hover-card/hover-card";
import { Menubar } from "../menubar/menubar";
import { NavigationMenu } from "../navigation-menu/navigation-menu";

const examples = {
  sheet: <Sheet.Root><Sheet.Trigger>打开测试浮层</Sheet.Trigger><Sheet.Portal><Sheet.Backdrop /><Sheet.Content><Sheet.Title>测试浮层内容</Sheet.Title><Sheet.Close>关闭</Sheet.Close></Sheet.Content></Sheet.Portal></Sheet.Root>,
  "context-menu": <ContextMenu.Root><ContextMenu.Trigger tabIndex={0}>打开测试浮层</ContextMenu.Trigger><ContextMenu.Portal><ContextMenu.Positioner><ContextMenu.Popup><ContextMenu.Item>测试浮层内容</ContextMenu.Item></ContextMenu.Popup></ContextMenu.Positioner></ContextMenu.Portal></ContextMenu.Root>,
  "hover-card": <HoverCard.Root><HoverCard.Trigger href="#member">打开测试浮层</HoverCard.Trigger><HoverCard.Portal><HoverCard.Positioner><HoverCard.Popup>测试浮层内容</HoverCard.Popup></HoverCard.Positioner></HoverCard.Portal></HoverCard.Root>,
  menubar: <Menubar.Root><Menubar.Menu><Menubar.Trigger>打开测试浮层</Menubar.Trigger><Menubar.Positioner><Menubar.Popup><Menubar.Item>测试浮层内容</Menubar.Item></Menubar.Popup></Menubar.Positioner></Menubar.Menu></Menubar.Root>,
  "navigation-menu": <NavigationMenu.Root><NavigationMenu.List><NavigationMenu.Item><NavigationMenu.Trigger>打开测试浮层</NavigationMenu.Trigger><NavigationMenu.Content><NavigationMenu.Link href="#destination">测试浮层内容</NavigationMenu.Link></NavigationMenu.Content></NavigationMenu.Item></NavigationMenu.List><NavigationMenu.Portal><NavigationMenu.Positioner><NavigationMenu.Popup><NavigationMenu.Viewport /></NavigationMenu.Popup></NavigationMenu.Positioner></NavigationMenu.Portal></NavigationMenu.Root>,
};

it.each(Object.keys(examples) as (keyof typeof examples)[])("%s follows its local theme and density across the portal and subsequent host changes", async kind => {
  const user = userEvent.setup();
  function Fixture() {
    const [theme, setTheme] = useState("dark"), [density, setDensity] = useState<"default" | "compact">("compact");
    return <DensityProvider density={density}><div data-rain-theme={theme} data-testid="local-host">{examples[kind]}</div><button onClick={() => { setTheme("light"); setDensity("default"); }}>改变宿主上下文</button></DensityProvider>;
  }
  render(<Fixture />);
  const trigger = screen.getByText("打开测试浮层");
  if (kind === "context-menu") await user.pointer([{ target: trigger, keys: "[MouseRight]" }]);
  else if (kind === "hover-card") trigger.focus();
  else await user.click(trigger);
  const content = await screen.findByText("测试浮层内容");
  const popup = content.closest<HTMLElement>('[data-slot="content"], [data-slot="popup"], [data-rain-id="ui-hover-card"], .rain-navigation-menu-content')!;
  expect(screen.getByTestId("local-host")).not.toContainElement(popup);
  expect(popup.closest('[data-rain-theme]')).toHaveAttribute("data-rain-theme", "dark");
  expect(popup.closest('[data-density]')).toHaveAttribute("data-density", "compact");
  fireEvent.click(screen.getByText("改变宿主上下文"));
  if (kind === "navigation-menu") await user.click(trigger);
  await waitFor(() => expect(screen.getByText("测试浮层内容").closest('[data-rain-theme]')).toHaveAttribute("data-rain-theme", "light"));
  expect(screen.getByText("测试浮层内容").closest('[data-density]')).toHaveAttribute("data-density", "default");
});
