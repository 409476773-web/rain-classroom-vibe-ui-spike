import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { AttachmentStatesDemo } from "./attachment-states-demo";

afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); });
const column = (name = "白底 · 浅描边") => within(screen.getByRole("region", { name }));
const row = (name: string, surface?: string) => within(column(surface).getByRole("group", { name: `${name} 示例` }));

it("shares report read state across surfaces without changing the attachment or its other states", async () => {
  const user = userEvent.setup(); render(<AttachmentStatesDemo />);
  expect(row("研究论文.pdf").getByText("检测报告未读")).toBeInTheDocument();
  await user.click(row("研究论文.pdf").getByRole("button", { name: "查看报告" }));
  expect(await screen.findByRole("dialog", { name: "检测报告（示例）" })).toBeInTheDocument();
  await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "关闭" }));
  expect(row("研究论文.pdf").getByText("检测报告已读")).toBeInTheDocument();
  expect(row("研究论文.pdf", "浅灰底").getByText("检测报告已读")).toBeInTheDocument();
  expect(row("课堂录音.mp3").getByText("上传失败")).toBeInTheDocument();
  expect(row("设备申请.pdf").getByText("关联申请待你审核")).toBeInTheDocument();
});

it("retries only subtitles while the original video stays available", async () => {
  vi.useFakeTimers(); render(<AttachmentStatesDemo />);
  const video = row("授课录像.mp4");
  expect(video.getByRole("button", { name: "下载说明 授课录像.mp4" })).toBeEnabled();
  fireEvent.click(video.getByRole("button", { name: "重试字幕" }));
  expect(video.getByText("字幕生成中")).toBeInTheDocument();
  expect(video.getByRole("button", { name: "预览示例 授课录像.mp4" })).toBeEnabled();
  expect(video.getByRole("button", { name: "下载说明 授课录像.mp4" })).toBeEnabled();
  await act(async () => vi.advanceTimersByTimeAsync(1200));
  expect(video.getByText("字幕已生成（示例）")).toBeInTheDocument();
  expect(row("授课录像.mp4", "浅灰底").getByText("字幕已生成（示例）")).toBeInTheDocument();
  expect(row("课堂录音.mp3").getByText("上传失败")).toBeInTheDocument();
});

it("cancels a simulated upload and retries a failed audio without offering a fabricated download", async () => {
  vi.useFakeTimers(); render(<AttachmentStatesDemo />);
  fireEvent.click(row("课堂录像.mp4").getByRole("button", { name: "取消上传" }));
  expect(row("课堂录像.mp4", "浅灰底").getByText("已取消上传")).toBeInTheDocument();
  fireEvent.click(row("课堂录音.mp3").getByRole("button", { name: "重试上传" }));
  expect(row("课堂录音.mp3").getByRole("progressbar")).toHaveAttribute("aria-valuenow", "42");
  await act(async () => vi.advanceTimersByTimeAsync(1200));
  expect(row("课堂录音.mp3").getByText("上传完成（示例）")).toBeInTheDocument();
  expect(row("课堂录像.mp4").getByText("已取消上传")).toBeInTheDocument();
  fireEvent.click(row("课堂录音.mp3").getByRole("button", { name: "下载说明 课堂录音.mp3" }));
  expect(screen.getByRole("dialog")).toHaveTextContent("未配置真实音频文件");
  expect(within(screen.getByRole("dialog")).queryByRole("link")).toBeNull();
});

it("keeps preview-only permission explicit and excludes download from the menu", async () => {
  const user = userEvent.setup(); render(<AttachmentStatesDemo />);
  const restricted = row("课堂资料.pdf");
  expect(restricted.getByText("禁止下载")).toBeInTheDocument();
  expect(restricted.queryByRole("button", { name: /下载/ })).toBeNull();
  await user.click(restricted.getByRole("button", { name: "更多操作 课堂资料.pdf" }));
  expect(await screen.findByRole("menuitem", { name: "权限说明" })).toBeInTheDocument();
  expect(screen.queryByRole("menuitem", { name: /下载/ })).toBeNull();
  await user.keyboard("{Escape}");
  await user.click(restricted.getByRole("button", { name: "预览" }));
  expect(await screen.findByRole("document", { name: "课堂资料预览示例" })).toBeInTheDocument();
});

it("keeps simulated review results on the linked application only", async () => {
  const user = userEvent.setup(); render(<AttachmentStatesDemo />);
  await user.click(row("设备申请.pdf").getByRole("button", { name: "去审核" }));
  const dialog = await screen.findByRole("dialog", { name: "关联申请审核（示例）" });
  expect(dialog).toHaveTextContent("不会提交真实审核结果");
  await user.click(within(dialog).getByRole("button", { name: "模拟通过" }));
  expect(row("设备申请.pdf").getByText("关联申请已通过（示例）")).toBeInTheDocument();
  expect(row("设备申请.pdf", "浅灰底").getByText("关联申请已通过（示例）")).toBeInTheDocument();
  expect(row("研究论文.pdf").getByText("检测报告未读")).toBeInTheDocument();
});

it("downloads the real PDF directly with its correct URL and filename", async () => {
  const links: { href: string; download: string }[] = [];
  const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
    links.push({ href: this.getAttribute("href") ?? "", download: this.download });
  });
  const user = userEvent.setup(); render(<AttachmentStatesDemo />);
  await user.click(row("课程导读：从问题到证据.pdf").getByRole("button", { name: "下载示例 课程导读：从问题到证据.pdf" }));
  expect(links).toEqual([{ href: "/attachment-demo/course-guide.pdf", download: "课程导读：从问题到证据.pdf" }]);
  expect(screen.queryByRole("dialog")).toBeNull();
  click.mockRestore();
});

it("returns menu-launched dialog focus to the persistent more button and carries its dark theme", async () => {
  const user = userEvent.setup(); render(<div data-rain-theme="dark"><AttachmentStatesDemo /></div>);
  const more = row("研究论文.pdf", "浅灰底").getByRole("button", { name: "更多操作 研究论文.pdf" });
  await user.click(more);
  await user.click(await screen.findByRole("menuitem", { name: "文件信息" }));
  expect(await screen.findByRole("dialog", { name: "文件信息" })).toHaveAttribute("data-rain-theme", "dark");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(more).toHaveFocus());
});

it("inherits the actual action theme for a directly opened dialog", async () => {
  const user = userEvent.setup(); render(<div data-rain-theme="dark"><AttachmentStatesDemo /></div>);
  const action = row("研究论文.pdf").getByRole("button", { name: "查看报告" });
  await user.click(action);
  expect(await screen.findByRole("dialog", { name: "检测报告（示例）" })).toHaveAttribute("data-rain-theme", "dark");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(action).toHaveFocus());
});
