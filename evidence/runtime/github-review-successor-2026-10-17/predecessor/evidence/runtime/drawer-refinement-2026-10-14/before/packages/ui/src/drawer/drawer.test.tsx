import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { DensityProvider } from "@rain-next/foundations";
import { DirectionProvider } from "@base-ui/react/direction-provider";

const modules = import.meta.glob("./drawer.tsx", { eager: true }) as Record<string, typeof import("./drawer")>;
function parts() {
  const result = modules["./drawer.tsx"];
  expect(result?.Drawer).toBeTypeOf("function");
  if (!result) throw new Error("Drawer implementation is missing.");
  return result;
}

it("preserves native dialog naming, focus return and host cancellation of close", async () => {
  const { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose } = parts();
  const user = userEvent.setup(), onChange = vi.fn();
  let deny = true;
  render(<Drawer onOpenChange={(open, details) => { onChange(open); if (!open && deny) details.cancel(); }}>
    <DrawerTrigger>查看资料</DrawerTrigger>
    <DrawerContent><DrawerTitle>课程资料</DrawerTitle><DrawerDescription>查看本次课堂的材料。</DrawerDescription><DrawerClose>关闭资料</DrawerClose></DrawerContent>
  </Drawer>);
  const trigger = screen.getByRole("button", { name: "查看资料" });
  await user.click(trigger);
  const popup = await screen.findByRole("dialog", { name: "课程资料" });
  expect(popup).toHaveAccessibleDescription("查看本次课堂的材料。");
  await user.click(screen.getByRole("button", { name: "关闭资料" }));
  expect(popup).toBeInTheDocument();
  deny = false;
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(onChange).toHaveBeenCalledWith(false);
});

it("carries active trigger theme, density and DOM direction through its portal", async () => {
  const { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerClose } = parts();
  const ref = createRef<HTMLDivElement>(), user = userEvent.setup();
  render(<DirectionProvider direction="rtl"><DensityProvider density="compact"><div dir="rtl" data-rain-theme="dark">
    <Drawer swipeDirection="left" showSwipeHandle><DrawerTrigger>افتح</DrawerTrigger><DrawerContent ref={ref}>
      <DrawerTitle>资料</DrawerTitle><DrawerClose>关闭</DrawerClose>
    </DrawerContent></Drawer>
  </div></DensityProvider></DirectionProvider>);
  await user.click(screen.getByRole("button", { name: "افتح" }));
  const popup = await screen.findByRole("dialog", { name: "资料" });
  expect(ref.current).toBe(popup);
  expect(popup).toHaveAttribute("data-rain-theme", "dark");
  expect(popup).toHaveAttribute("data-density", "compact");
  expect(popup).toHaveAttribute("dir", "rtl");
  expect(popup).toHaveAttribute("data-swipe-direction", "left");
  expect(popup).toHaveAttribute("data-swipe-axis", "x");
  expect(popup.querySelector('[data-slot="drawer-swipe-handle"]')).toHaveAttribute("aria-hidden", "true");
});

it("keeps non-modal content and controlled snap-point composition", async () => {
  const { Drawer, DrawerContent, DrawerTitle, DrawerClose } = parts();
  render(<Drawer defaultOpen modal={false} snapPoints={[0.5, 1]} snapPoint={0.5} swipeDirection="up">
    <DrawerContent><DrawerTitle>课前任务</DrawerTitle><DrawerClose>关闭任务</DrawerClose></DrawerContent>
  </Drawer>);
  const popup = await screen.findByRole("dialog", { name: "课前任务" });
  expect(popup).toHaveAttribute("data-snap-points");
  expect(popup).toHaveAttribute("data-swipe-axis", "y");
  expect(popup).toHaveAttribute("data-swipe-direction", "up");
  expect(document.querySelector('[data-slot="drawer-overlay"]')).toBeNull();
});
