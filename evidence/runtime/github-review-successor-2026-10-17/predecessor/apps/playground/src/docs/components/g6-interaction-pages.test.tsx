import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

async function loadPage(): Promise<typeof import("./g6-interaction-pages")> {
  const path = "./g6-interaction-pages.tsx";
  return import(/* @vite-ignore */ path);
}
const originalHitTest = Object.getOwnPropertyDescriptor(document, "elementFromPoint");
beforeEach(() => {
  vi.stubGlobal("ResizeObserver", class { observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: false, media: query, addEventListener() {}, removeEventListener() {} }));
  Object.defineProperty(document, "elementFromPoint", { configurable: true, value: () => null });
  // Real Embla receives measured geometry; jsdom supplies no layout or hit testing.
  vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(100);
  vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(100);
  vi.spyOn(HTMLElement.prototype, "offsetLeft", "get").mockImplementation(function (this: HTMLElement) { return Number(this.dataset.slideIndex ?? 0) * 100; });
  vi.spyOn(HTMLElement.prototype, "offsetTop", "get").mockImplementation(function (this: HTMLElement) { return Number(this.dataset.slideIndex ?? 0) * 100; });
});
afterEach(() => {
  vi.restoreAllMocks(); vi.unstubAllGlobals();
  if (originalHitTest) Object.defineProperty(document, "elementFromPoint", originalHitTest);
  else Reflect.deleteProperty(document, "elementFromPoint");
});

it("cancels a task draft and reopens the saved value without submitting", async () => {
  const { G6InteractionPage } = await loadPage(), user = userEvent.setup();
  render(<G6InteractionPage component="drawer" />);
  await user.click(screen.getByRole("button", { name: "编辑课前任务" }));
  const field = await screen.findByRole("textbox", { name: "任务标题" });
  await user.clear(field); await user.type(field, "不应保存的草稿");
  await user.click(screen.getByRole("button", { name: "取消" }));
  await user.click(await screen.findByRole("button", { name: "放弃修改" }));
  await waitFor(() => expect(screen.queryByRole("dialog", { name: "编辑课前任务" })).toBeNull());
  await user.click(screen.getByRole("button", { name: "编辑课前任务" }));
  expect(await screen.findByRole("textbox", { name: "任务标题" })).toHaveValue("找一个值得追问的问题");
  expect(screen.getByTestId("dialog-saved-title")).toHaveTextContent("找一个值得追问的问题");
});

it("uses source close cancellation to keep a dirty task, then explicitly discards it", async () => {
  const { G6InteractionPage } = await loadPage(), user = userEvent.setup();
  render(<G6InteractionPage component="drawer" />);
  await user.click(screen.getByRole("button", { name: "编辑课前任务" }));
  const editor = await screen.findByRole("dialog", { name: "编辑课前任务" });
  await user.type(await screen.findByRole("textbox", { name: "任务标题" }), "（草稿）");
  await user.keyboard("{Escape}");
  expect(await screen.findByRole("alertdialog")).toHaveAccessibleName("放弃未保存的修改？");
  expect(editor).toBeInTheDocument();
  expect(editor).toHaveAttribute("data-rain-id", "ui-dialog");
  await user.click(screen.getByRole("button", { name: "继续编辑" }));
  await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull());
  await user.keyboard("{Escape}");
  await user.click(await screen.findByRole("button", { name: "放弃修改" }));
  await waitFor(() => expect(screen.queryByRole("dialog", { name: "编辑课前任务" })).toBeNull());
  expect(screen.getByTestId("dialog-saved-title")).toHaveTextContent("找一个值得追问的问题");
});

it("allows the underlying task action while the non-modal drawer stays open", async () => {
  const { G6InteractionPage } = await loadPage(), user = userEvent.setup();
  render(<G6InteractionPage component="drawer" />);
  await user.click(screen.getByRole("button", { name: "打开非模态记录" }));
  const popup = await screen.findByRole("dialog", { name: "非模态课堂记录" });
  await user.click(screen.getByRole("button", { name: "记录一次观察" }));
  expect(screen.getByTestId("drawer-observation-count")).toHaveTextContent("已记录1次观察");
  expect(popup).toBeInTheDocument();
});

it("only verifies an OTP after native form submission and keeps the rejected fixture", async () => {
  const { G6InteractionPage } = await loadPage(), user = userEvent.setup();
  render(<G6InteractionPage component="input-otp" />);
  const form = screen.getByTestId("otp-verification-form"), input = within(form).getByRole("textbox", { name: "课堂验证码" });
  expect(form.querySelectorAll("input")).toHaveLength(1);
  await user.type(input, "123456");
  expect(screen.getByTestId("otp-length-notice")).toHaveTextContent("6位已填满，等待你确认");
  expect(screen.getByTestId("otp-submitted-code")).toHaveTextContent("尚未提交");
  expect(new FormData(form as HTMLFormElement).get("classroomCode")).toBe("123456");
  await user.click(within(form).getByRole("button", { name: "验证并进入课堂" }));
  expect(screen.getByTestId("otp-submitted-code")).toHaveTextContent("123456");
  expect(await within(form).findByText("演示验证码已过期，请修改后重试。", {}, { timeout: 2000 })).toBeInTheDocument();
  expect(input).toHaveValue("123456"); expect(input).toHaveAttribute("aria-invalid", "true");
  expect(within(form).getByRole("button", { name: "验证并进入课堂" })).toBeEnabled();
  await user.clear(input); await user.type(input, "654321");
  await user.click(within(form).getByRole("button", { name: "验证并进入课堂" }));
  expect(await within(form).findByText("验证通过，可继续本地课堂演示。", {}, { timeout: 2000 })).toBeInTheDocument();
});

it("updates carousel position from the real API after adding a learning material", async () => {
  const { G6InteractionPage } = await loadPage(), user = userEvent.setup();
  render(<G6InteractionPage component="carousel" />);
  await waitFor(() => expect(screen.getByTestId("carousel-position")).toHaveTextContent("第1份 / 共3份"));
  await user.click(screen.getByRole("button", { name: "添加一份资料" }));
  await waitFor(() => expect(screen.getByTestId("carousel-position")).toHaveTextContent("共4份"));
  const main = screen.getByRole("region", { name: "课程学习资料" });
  expect(within(main).getByRole("heading", { name: "小组讨论回顾" })).toBeInTheDocument();
});

it("keeps a learning note's arrows in its input instead of navigating the carousel", async () => {
  const { G6InteractionPage } = await loadPage();
  render(<G6InteractionPage component="carousel" />);
  await waitFor(() => expect(screen.getByTestId("carousel-position")).toHaveTextContent("第1份 / 共3份"));
  fireEvent.keyDown(screen.getByRole("textbox", { name: "记录第1份资料笔记" }), { key: "ArrowRight" });
  expect(screen.getByTestId("carousel-position")).toHaveTextContent("第1份 / 共3份");
});

it("keeps actual carousel navigation inside its Drawer and marks the engine-owned gesture region", async () => {
  const { G6InteractionPage } = await loadPage(), user = userEvent.setup();
  render(<G6InteractionPage component="carousel" />);
  await user.click(screen.getByRole("button", { name: "在抽屉中阅读资料" }));
  const popup = await screen.findByRole("dialog", { name: "课堂资料阅读" });
  expect(within(popup).getByRole("region", { name: "抽屉内课程资料" })).toHaveAttribute("data-base-ui-swipe-ignore");
  await waitFor(() => expect(within(popup).getByRole("button", { name: "抽屉内下一份资料" })).toBeEnabled());
  await user.click(within(popup).getByRole("button", { name: "抽屉内下一份资料" }));
  await waitFor(() => expect(within(popup).getByTestId("drawer-carousel-position")).toHaveTextContent("第2份 / 共3份"));
  expect(popup).toBeInTheDocument();
});
