import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { AttachmentScenariosDemo } from "./attachment-scenarios-demo";

afterEach(() => vi.useRealTimers());

const scene = (name: "ordinary" | "composer" | "dialog" | "media") => screen.getByTestId(`attachment-scenario-${name}`);
const rows = (container: HTMLElement) => container.querySelectorAll("[data-attachment-id]");
const advance = (time: number) => act(async () => { await vi.advanceTimersByTimeAsync(time); });

it("keeps the ordinary 24-file collection intact when folding and expands only that scene", () => {
  render(<AttachmentScenariosDemo />);
  const ordinary = scene("ordinary");
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("共 24 个");
  expect(rows(ordinary)).toHaveLength(6);
  fireEvent.click(within(ordinary).getByRole("button", { name: "展开全部 24 个" }));
  expect(rows(ordinary)).toHaveLength(24);
  expect(rows(scene("composer"))).toHaveLength(4);
  expect(rows(scene("media"))).toHaveLength(8);
  fireEvent.click(within(ordinary).getByRole("button", { name: "收起附件" }));
  expect(rows(ordinary)).toHaveLength(6);
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("24 个已上传");
});

it("continues hidden uploads, then expands and focuses a failed attachment", async () => {
  vi.useFakeTimers(); render(<AttachmentScenariosDemo />);
  const ordinary = scene("ordinary");
  fireEvent.click(within(ordinary).getByRole("button", { name: "演示上传" }));
  await advance(1800);
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("18 个已上传");
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("4 个上传中");
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("2 个失败");
  expect(rows(ordinary)).toHaveLength(6);
  await advance(2300);
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("22 个已上传");
  expect(screen.getByTestId("ordinary-summary")).not.toHaveTextContent("上传中");
  fireEvent.click(within(ordinary).getByRole("button", { name: "查看 2 个失败附件" }));
  expect(rows(ordinary)).toHaveLength(24);
  expect(within(ordinary).getByRole("button", { name: "重试上传 小组讨论记录.md" })).toHaveFocus();
  expect(within(ordinary).getByRole("button", { name: "重试上传 补充阅读与问题记录.txt" })).toBeEnabled();
});

it("retries only failed files while the other uploads retain their original progress", async () => {
  vi.useFakeTimers(); render(<AttachmentScenariosDemo />);
  const ordinary = scene("ordinary");
  fireEvent.click(within(ordinary).getByRole("button", { name: "演示上传" }));
  await advance(1800);
  fireEvent.click(within(ordinary).getByRole("button", { name: "重试失败项（2）" }));
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("6 个上传中");
  expect(screen.getByTestId("ordinary-summary")).not.toHaveTextContent("个失败");
  await advance(2300);
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("22 个已上传");
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("2 个上传中");
  await advance(1900);
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("24 个已上传");
  expect(rows(ordinary)).toHaveLength(6);
});

it("removes a compact draft attachment, preserves other scenes and echoes a local message", async () => {
  render(<AttachmentScenariosDemo />);
  const composer = scene("composer");
  fireEvent.click(within(composer).getByRole("button", { name: "移除 课程导读.pdf" }));
  await act(async () => Promise.resolve());
  expect(screen.getByTestId("composer-summary")).toHaveTextContent("共 11 个");
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("共 24 个");
  fireEvent.change(within(composer).getByRole("textbox", { name: "课程消息" }), { target: { value: "请结合课堂笔记阅读这些资料。" } });
  fireEvent.click(within(composer).getByRole("button", { name: "发送到本页" }));
  const message = within(composer).getByRole("article", { name: "本页消息 1" });
  expect(message).toHaveTextContent("请结合课堂笔记阅读这些资料。");
  expect(message).toHaveTextContent("11 个附件");
  expect(within(composer).getByRole("textbox", { name: "课程消息" })).toHaveValue("");
  expect(screen.getByTestId("composer-summary")).toHaveTextContent("共 0 个");
});

it.each([3, 4])("keeps a narrow-screen reveal action after removing a draft down to %i attachments", async count => {
  render(<AttachmentScenariosDemo />);
  const composer = scene("composer");
  expect(within(composer).getByRole("button", { name: "查看全部 12 个" })).not.toHaveAttribute("data-narrow-only");
  for (let remaining = 12; remaining > count; remaining -= 1) {
    fireEvent.click(within(composer).getAllByRole("button", { name: /^移除 / })[0]!);
    await act(async () => Promise.resolve());
  }
  expect(screen.getByTestId("composer-summary")).toHaveTextContent(`共 ${count} 个`);
  const reveal = within(composer).getByRole("button", { name: `查看全部 ${count} 个` });
  expect(reveal).toHaveAttribute("data-narrow-only");
  const list = document.getElementById(reveal.getAttribute("aria-controls")!)!;
  const remainingIds = Array.from(rows(list), row => row.getAttribute("data-attachment-id"));
  expect(list).not.toHaveAttribute("data-expanded");
  fireEvent.click(reveal);
  expect(list).toHaveAttribute("data-expanded");
  expect(within(composer).getByRole("button", { name: "收起附件" })).toHaveAttribute("aria-expanded", "true");
  expect(rows(list)).toHaveLength(count);
  expect(Array.from(rows(list), row => row.getAttribute("data-attachment-id"))).toEqual(remainingIds);
});

it("uploads an actual chosen draft File before allowing the local message action", async () => {
  vi.useFakeTimers(); render(<AttachmentScenariosDemo />);
  const composer = scene("composer");
  const file = new File(["学生的实际记录"], "新课堂记录.txt", { type: "text/plain" });
  fireEvent.change(within(composer).getByLabelText("添加草稿附件", { selector: "input" }), { target: { files: [file] } });
  await act(async () => Promise.resolve());
  expect(screen.getByTestId("composer-summary")).toHaveTextContent("共 13 个");
  expect(within(composer).getByRole("button", { name: "发送到本页" })).toBeDisabled();
  fireEvent.click(within(composer).getByRole("button", { name: "查看全部 13 个" }));
  expect(within(composer).getByRole("button", { name: "取消上传 新课堂记录.txt" })).toBeEnabled();
  await advance(4100);
  expect(screen.getByTestId("composer-summary")).toHaveTextContent("13 个已上传");
  expect(within(composer).getByRole("button", { name: "发送到本页" })).toBeEnabled();
});

it("retains a modal draft and finishes its upload while the view is closed", async () => {
  vi.useFakeTimers(); render(<AttachmentScenariosDemo />);
  fireEvent.click(within(scene("dialog")).getByRole("button", { name: "打开附件弹窗" }));
  const dialog = screen.getByRole("dialog", { name: "本次附件" });
  expect(rows(dialog)).toHaveLength(24);
  expect(dialog.querySelector('[data-slot="body"]')).not.toContainElement(dialog.querySelector('[data-slot="footer"]'));
  fireEvent.change(within(dialog).getByLabelText("添加弹窗附件", { selector: "input" }), { target: { files: [new File(["modal draft"], "弹窗草稿.txt", { type: "text/plain" })] } });
  await act(async () => Promise.resolve());
  expect(screen.getByTestId("dialog-summary")).toHaveTextContent("共 25 个");
  fireEvent.click(within(dialog).getByRole("button", { name: "关闭附件弹窗" }));
  await advance(4100);
  expect(screen.queryByRole("dialog", { name: "本次附件" })).toBeNull();
  fireEvent.click(within(scene("dialog")).getByRole("button", { name: "打开附件弹窗" }));
  expect(screen.getByTestId("dialog-summary")).toHaveTextContent("25 个已上传");
  expect(within(screen.getByRole("dialog", { name: "本次附件" })).getByRole("button", { name: "预览 弹窗草稿.txt" })).toBeInTheDocument();
});

it("expands all 12 real media records and keeps the other collections folded", () => {
  render(<AttachmentScenariosDemo />);
  const media = scene("media");
  expect(rows(media)).toHaveLength(8);
  expect(screen.getByTestId("media-summary")).toHaveTextContent("共 12 个");
  expect(within(media).getByRole("img", { name: "缩略图 课堂板书.png" })).toHaveAttribute("src", "/attachment-demo/scenario-classroom.png");
  fireEvent.click(within(media).getByRole("button", { name: "展开全部 12 个" }));
  expect(rows(media)).toHaveLength(12);
  expect(rows(scene("ordinary"))).toHaveLength(6);
  expect(rows(scene("composer"))).toHaveLength(4);
});

it("keeps accepted files when another choice is rejected and restores only its own scene", async () => {
  render(<AttachmentScenariosDemo />);
  const ordinary = scene("ordinary");
  fireEvent.change(within(ordinary).getByLabelText("添加课程附件", { selector: "input" }), { target: { files: [new File([], "空文件.txt"), new File(["accepted"], "新附件.txt", { type: "text/plain" })] } });
  await act(async () => Promise.resolve());
  expect(within(ordinary).getByRole("alert")).toHaveTextContent("空文件.txt");
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("共 25 个");
  fireEvent.click(within(ordinary).getByRole("button", { name: "恢复普通列表示例" }));
  expect(screen.getByTestId("ordinary-summary")).toHaveTextContent("共 24 个");
  expect(within(ordinary).queryByRole("alert")).toBeNull();
  expect(screen.getByTestId("composer-summary")).toHaveTextContent("共 12 个");
});

it("returns focus to the empty-list chooser after the last ordinary attachment is removed", async () => {
  render(<AttachmentScenariosDemo />);
  const ordinary = scene("ordinary");
  fireEvent.click(within(ordinary).getByRole("button", { name: "查看首次添加" }));
  fireEvent.change(within(ordinary).getByLabelText("添加课程附件", { selector: "input" }), { target: { files: [new File(["actual"], "最后一份资料.txt", { type: "text/plain" })] } });
  await act(async () => Promise.resolve());
  // Removing an uploading item uses its draft cancel first, then its normal menu.
  fireEvent.click(within(ordinary).getByRole("button", { name: "取消上传 最后一份资料.txt" }));
  const menu = within(ordinary).getByRole("button", { name: "更多操作 最后一份资料.txt" });
  menu.focus(); fireEvent.click(menu);
  fireEvent.click(screen.getByRole("menuitem", { name: "移除" }));
  await act(async () => Promise.resolve());
  expect(rows(ordinary)).toHaveLength(0);
  expect(within(ordinary).getByRole("button", { name: "添加课程附件" })).toHaveFocus();
});
