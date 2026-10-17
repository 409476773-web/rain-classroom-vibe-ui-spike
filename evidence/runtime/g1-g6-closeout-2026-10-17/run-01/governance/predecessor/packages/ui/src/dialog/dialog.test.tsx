import { createRef } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { DensityProvider } from "@rain-next/foundations";
import * as UI from "../index";

it("opens a named modal with inherited density and returns focus through a Rain trigger", async () => {
  const { Dialog, Separator, Button, Input, FormItem } = UI;
  expect(Dialog).toBeDefined();
  expect(Separator).toBeDefined();
  const user = userEvent.setup(), ref = createRef<HTMLDivElement>(), input = createRef<HTMLInputElement>();
  render(<DensityProvider density="default"><div data-rain-theme="dark"><Dialog.Root>
    <Dialog.Trigger render={<Button>编辑</Button>} />
    <Dialog.Content ref={ref} initialFocus={input}>
      <Dialog.Header><Dialog.Title>课程资料</Dialog.Title><Dialog.Description>保存后更新</Dialog.Description></Dialog.Header>
      <Dialog.Body><FormItem label="名称" required><Input ref={input} /></FormItem><Separator /></Dialog.Body>
      <Dialog.Footer><Dialog.Close render={<Button>取消</Button>} /></Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root></div></DensityProvider>);
  await user.click(screen.getByRole("button", { name: "编辑" }));
  const dialog = await screen.findByRole("dialog", { name: "课程资料" });
  expect(dialog).toBe(ref.current);
  expect(dialog).toHaveAccessibleDescription("保存后更新");
  expect(dialog).toHaveAttribute("data-rain-theme", "dark");
  expect(dialog).toHaveAttribute("data-density", "default");
  expect(input.current?.closest('[data-rain-id="ui-input"]')).toHaveAttribute("data-size", "32");
  await waitFor(() => expect(input.current).toHaveFocus());
  expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
  await user.click(screen.getByRole("button", { name: "取消" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  expect(screen.getByRole("button", { name: "编辑" })).toHaveFocus();
});

it("honors canceled opening, multiple triggers, live theme and explicit initial/final refs", async () => {
  const { Dialog, Button } = UI, user = userEvent.setup();
  let cancel = true;
  const target = createRef<HTMLHeadingElement>(), trigger = createRef<HTMLButtonElement>(), close = createRef<HTMLButtonElement>();
  const view = render(<div data-rain-theme="light"><Dialog.Root onOpenChange={(next, details) => { if (next && cancel) details.cancel(); }}>
    <Dialog.Trigger render={<Button ref={trigger}>一号入口</Button>} />
    <div data-rain-theme="dark"><Dialog.Trigger render={<Button>二号入口</Button>} /></div>
    <Dialog.Content initialFocus={target} finalFocus={trigger} data-example="native">
      <Dialog.Header><Dialog.Title ref={target} tabIndex={-1}>焦点检查</Dialog.Title></Dialog.Header>
      <Dialog.Footer><Dialog.Close ref={close} render={<Button>返回</Button>} /></Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root></div>);
  await user.click(screen.getByRole("button", { name: "二号入口" })); expect(screen.queryByRole("dialog")).toBeNull();
  cancel = false; await user.click(screen.getByRole("button", { name: "二号入口" }));
  const popup = await screen.findByRole("dialog", { name: "焦点检查" });
  expect(popup).toHaveAttribute("data-rain-theme", "dark"); expect(popup).toHaveAttribute("data-example", "native");
  await waitFor(() => expect(target.current).toHaveFocus());
  expect(close.current).toBe(screen.getByRole("button", { name: "返回" }));
  await user.click(close.current!); await waitFor(() => expect(trigger.current).toHaveFocus());
  await user.click(trigger.current!); await expect(screen.findByRole("dialog")).resolves.toHaveAttribute("data-rain-theme", "light");
  view.unmount();
});

it("allows triggerless explicit theme and separates decorative from meaningful separators", async () => {
  const { Dialog, Separator, Button } = UI;
  render(<Dialog.Root defaultOpen><Dialog.Content theme="dark" aria-label="主动打开">
    <Dialog.Body><Separator orientation="vertical" /><Separator decorative data-testid="decoration" /></Dialog.Body>
    <Dialog.Footer><Dialog.Close render={<Button>关闭</Button>} /></Dialog.Footer>
  </Dialog.Content></Dialog.Root>);
  const popup = await screen.findByRole("dialog", { name: "主动打开" });
  expect(popup).toHaveAttribute("data-rain-theme", "dark");
  expect(screen.getAllByRole("separator")).toHaveLength(1);
  expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  expect(screen.getByTestId("decoration")).toHaveAttribute("aria-hidden", "true");
  expect(screen.getByTestId("decoration")).not.toHaveAttribute("tabindex");
});

it("keeps outside dismissal opt-in and exposes the agreed geometry and mask defaults", async () => {
  const user = userEvent.setup(), { Dialog } = UI;
  const view = render(<Dialog.Root defaultOpen><Dialog.Content aria-label="任务">内容</Dialog.Content></Dialog.Root>);
  const popup = await screen.findByRole("dialog");
  expect(popup.style.getPropertyValue("--rain-popup-width")).toBe("616px");
  expect(popup).toHaveAttribute("data-inset", "40");
  const backdrop = document.querySelector('[data-slot="backdrop"]')!;
  expect(backdrop).toHaveAttribute("data-mask", "modal");
  await user.click(backdrop);
  expect(popup).toBeInTheDocument();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  view.unmount();
  render(<Dialog.Root defaultOpen disablePointerDismissal={false}><Dialog.Content mask="none" width="viewport" aria-label="预览">内容</Dialog.Content></Dialog.Root>);
  await screen.findByRole("dialog", { name: "预览" });
  expect(document.querySelector('[data-slot="backdrop"]')).toBeNull();
  expect(screen.getByRole("dialog")).toHaveAttribute("data-width", "viewport");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
});

it("uses real alert semantics, safe focus and the 416 default without duplicating parts", async () => {
  const { AlertDialog, Button } = UI, safe = createRef<HTMLButtonElement>();
  expect(AlertDialog).toBeDefined();
  render(<AlertDialog.Root defaultOpen><AlertDialog.Content initialFocus={safe}>
    <AlertDialog.Header><AlertDialog.Title>放弃修改？</AlertDialog.Title><AlertDialog.Description>未保存内容将丢失。</AlertDialog.Description></AlertDialog.Header>
    <AlertDialog.Footer><AlertDialog.Close render={<Button ref={safe}>继续编辑</Button>} /><Button variant="primary">放弃修改</Button></AlertDialog.Footer>
  </AlertDialog.Content></AlertDialog.Root>);
  const alert = await screen.findByRole("alertdialog", { name: "放弃修改？" });
  expect(alert.style.getPropertyValue("--rain-popup-width")).toBe("416px");
  expect(alert).toHaveAccessibleDescription("未保存内容将丢失。");
  await waitFor(() => expect(safe.current).toHaveFocus());
});
