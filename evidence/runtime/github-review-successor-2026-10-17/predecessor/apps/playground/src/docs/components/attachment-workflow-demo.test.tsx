import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { AttachmentWorkflowDemo } from "./attachment-workflow-demo";

afterEach(() => vi.useRealTimers());
it("uses real initial resources and keeps read-only viewing available", async () => {
  const user = userEvent.setup(); render(<AttachmentWorkflowDemo />);
  expect(screen.getByRole("button", { name: "保存附件" })).toBeEnabled();
  await user.click(screen.getByRole("button", { name: "预览 高等数学课程封面.png" }));
  expect(await screen.findByRole("img", { name: "高等数学课程封面.png" })).toHaveAttribute("src", "/attachment-demo/course-cover.png");
  await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "关闭" }));
  await user.click(screen.getByText("演示选项")); await user.click(screen.getByText("只读查看"));
  expect(screen.getByRole("button", { name: "添加附件" })).toBeDisabled();
  expect(screen.queryByRole("button", { name: "替换 课程导读：从问题到证据.pdf" })).toBeNull();
  expect(screen.getByRole("button", { name: "下载 课程导读：从问题到证据.pdf" })).toBeEnabled();
});

it("preserves a failed selected file and enables saving only after a successful retry", async () => {
  vi.useFakeTimers(); render(<AttachmentWorkflowDemo />);
  fireEvent.click(screen.getByText("演示选项")); fireEvent.click(screen.getByText("模拟下次上传失败"));
  fireEvent.change(screen.getByLabelText("添加附件", { selector: "input" }), { target: { files: [new File(["my actual notes"], "我的记录.txt", { type: "text/plain" })] } });
  expect(screen.getByRole("button", { name: "保存附件" })).toBeDisabled();
  fireEvent.click(screen.getByRole("button", { name: "上传 我的记录.txt" }));
  await act(async () => vi.advanceTimersByTimeAsync(700));
  expect(screen.getByRole("alert")).toHaveTextContent("模拟上传失败");
  fireEvent.click(screen.getByRole("button", { name: "重试上传 我的记录.txt" }));
  await act(async () => vi.advanceTimersByTimeAsync(2000));
  expect(screen.getByRole("button", { name: "保存附件" })).toBeEnabled();
  fireEvent.click(screen.getByRole("button", { name: "保存附件" }));
  expect(screen.getByText("已在本页保存 4 个附件。刷新后恢复示例。")).toBeInTheDocument();
});

it("keeps the original attachment until replacement completes and supports cancel", async () => {
  vi.useFakeTimers(); render(<AttachmentWorkflowDemo />);
  const name = "课程导读：从问题到证据.pdf", next = new File(["%PDF-1.4\nnew"], "新版讲义.pdf", { type: "application/pdf" });
  fireEvent.change(screen.getByLabelText(`选择替换文件 ${name}`), { target: { files: [next] } });
  await act(async () => Promise.resolve());
  expect(screen.getByRole("button", { name: `预览 ${name}` })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: `上传 ${name}` }));
  fireEvent.click(screen.getByRole("button", { name: `取消替换 ${name}` }));
  await act(async () => Promise.resolve());
  expect(screen.queryByText(/正在替换为/)).toBeNull();
  fireEvent.change(screen.getByLabelText(`选择替换文件 ${name}`), { target: { files: [next] } });
  await act(async () => Promise.resolve());
  fireEvent.click(screen.getByRole("button", { name: `上传 ${name}` }));
  await act(async () => vi.advanceTimersByTimeAsync(2000));
  expect(screen.queryByRole("button", { name: `预览 ${name}` })).toBeNull();
  expect(screen.getByRole("button", { name: "预览 新版讲义.pdf" })).toBeInTheDocument();
});

it("shows individual rejection reasons while retaining accepted files", () => {
  render(<AttachmentWorkflowDemo />);
  fireEvent.change(screen.getByLabelText("添加附件", { selector: "input" }), { target: { files: [new File([], "空文件.txt"), new File(["valid"], "有效文件.txt")] } });
  expect(screen.getByRole("alert")).toHaveTextContent("空文件.txt");
  expect(screen.getByRole("button", { name: "上传 有效文件.txt" })).toBeInTheDocument();
});
