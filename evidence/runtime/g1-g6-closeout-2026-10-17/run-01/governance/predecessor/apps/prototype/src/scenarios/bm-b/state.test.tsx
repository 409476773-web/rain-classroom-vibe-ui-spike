import "@testing-library/jest-dom/vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { TextbookFormScenario } from "./page";
import { copyTextbook, initialTextbook, simulateTask, validateFiles, validateTextbook } from "./state";

function deferred() {
  let resolve!: () => void, reject!: (error: Error) => void;
  const promise = new Promise<void>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

it("validates required fields and upload boundaries without mutating the saved object", () => {
  const draft = copyTextbook(initialTextbook); draft.title = " "; draft.subject = "unknown"; draft.description = "";
  draft.attachments.push({ id: "one", name: "lesson.pdf", size: 10, status: "failed" });
  expect(Object.keys(validateTextbook(draft))).toEqual(["title", "subject", "description", "attachments"]);
  expect(initialTextbook.attachments).toHaveLength(0);
  expect(validateTextbook(initialTextbook)).toEqual({});
  const file = new File(["pdf"], "lesson.pdf", { type: "application/pdf" });
  expect(validateFiles([file], 9)).toBe("");
  expect(validateFiles([file], 10)).toContain("10");
  expect(validateFiles([new File([], "empty.pdf")], 0)).toContain("不能为空");
  expect(validateFiles([new File(["script"], "script.exe")], 0)).toContain("PDF");
  Object.defineProperty(file, "size", { value: 20 * 1024 * 1024 + 1 });
  expect(validateFiles([file], 0)).toContain("20 MB");
  for (const character of ["e\u0301", "😀", "𠮷"]) {
    const multi = { ...initialTextbook, title: character.repeat(80), author: character.repeat(80), publisher: character.repeat(80) };
    expect(validateTextbook(multi)).toEqual({});
    expect(validateTextbook({ ...multi, title: character.repeat(81) })).toHaveProperty("title");
    expect(validateTextbook({ ...multi, description: "😀".repeat(1001) })).toHaveProperty("description");
  }
});

it("focuses validation, blocks duplicate saves and close, preserves failure and commits a retry", async () => {
  const user = userEvent.setup(), pending = deferred(); let calls = 0;
  render(<TextbookFormScenario saveTask={() => ++calls === 1 ? pending.promise : Promise.resolve()} />);
  await user.click(screen.getByRole("button", { name: "编辑教材" }));
  const title = screen.getByRole("textbox", { name: "教材标题" });
  await user.clear(title); await user.click(screen.getByRole("button", { name: "保存教材" }));
  expect(title).toHaveFocus(); expect(title).toHaveAttribute("aria-invalid", "true"); expect(calls).toBe(0);
  await user.type(title, "新教材"); await user.click(screen.getByRole("button", { name: "保存教材" }));
  expect(title).toBeDisabled(); await user.keyboard("{Escape}");
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "保存教材" })); expect(calls).toBe(1);
  await act(async () => pending.reject(new Error("Offline")));
  expect(await screen.findByRole("alert")).toHaveTextContent("填写内容已保留");
  expect(screen.getByRole("alert")).toHaveFocus(); expect(title).toHaveValue("新教材");
  await user.click(screen.getByRole("button", { name: "重试保存" }));
  expect(await screen.findByRole("heading", { name: "新教材" })).toBeInTheDocument();
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await user.click(screen.getByRole("button", { name: "编辑教材" }));
  await user.clear(screen.getByRole("textbox", { name: "教材标题" }));
  await user.click(screen.getByRole("button", { name: "取消" }));
  await user.click(screen.getByRole("button", { name: "放弃修改" }));
  await user.click(screen.getByRole("button", { name: "编辑教材" }));
  expect(screen.getByRole("textbox", { name: "教材标题" })).toHaveValue("新教材");
});

it("retries a failed upload and keeps its successful attachment in the saved object", async () => {
  const user = userEvent.setup(); let attempts = 0;
  render(<TextbookFormScenario uploadTask={async () => { if (++attempts === 1) throw new Error("Offline"); }} saveTask={async () => {}} />);
  await user.click(screen.getByRole("button", { name: "编辑教材" }));
  await user.upload(screen.getByLabelText("添加教材附件"), new File(["pdf"], "lesson.pdf", { type: "application/pdf" }));
  expect(await screen.findByText(/上传失败，请重试/)).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "保存教材" }));
  expect(screen.getByRole("button", { name: "添加教材附件" })).toHaveFocus();
  await user.click(screen.getByRole("button", { name: "重试上传 lesson.pdf" }));
  await screen.findByText(/模拟上传成功/);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "添加教材附件" })).toHaveAttribute("aria-invalid", "false");
  await user.click(screen.getByRole("button", { name: "保存教材" }));
  expect(await screen.findByText("已保存附件：lesson.pdf")).toBeInTheDocument();
});

for (const outcome of ["success", "failure"]) it(`ignores late upload ${outcome} after cancel and reopen`, async () => {
  const user = userEvent.setup(), pending = deferred(); let signal!: AbortSignal;
  render(<TextbookFormScenario uploadTask={nextSignal => { signal = nextSignal; return pending.promise; }} />);
  await user.click(screen.getByRole("button", { name: "编辑教材" }));
  await user.upload(screen.getByLabelText("添加教材附件"), new File(["pdf"], "stale.pdf", { type: "application/pdf" }));
  await user.click(screen.getByRole("button", { name: "取消" }));
  await user.click(screen.getByRole("button", { name: "放弃修改" })); expect(signal.aborted).toBe(true);
  await user.click(screen.getByRole("button", { name: "编辑教材" }));
  await act(async () => outcome === "success" ? pending.resolve() : pending.reject(new Error("Late")));
  expect(screen.queryByText("stale.pdf")).not.toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

it("aborts removed uploads and pending saves on unmount", async () => {
  const user = userEvent.setup(), uploading = deferred(), saving = deferred(); let uploadSignal!: AbortSignal, saveSignal!: AbortSignal;
  const view = render(<TextbookFormScenario uploadTask={signal => { uploadSignal = signal; return uploading.promise; }} saveTask={signal => { saveSignal = signal; return saving.promise; }} />);
  await user.click(screen.getByRole("button", { name: "编辑教材" }));
  await user.upload(screen.getByLabelText("添加教材附件"), new File(["pdf"], "removed.pdf", { type: "application/pdf" }));
  await user.click(screen.getByRole("button", { name: "移除附件 removed.pdf" })); expect(uploadSignal.aborted).toBe(true);
  await act(async () => uploading.resolve()); expect(screen.queryByText("removed.pdf")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "保存教材" })); view.unmount(); expect(saveSignal.aborted).toBe(true);
  await act(async () => saving.resolve());
  const controller = new AbortController(); const task = simulateTask(controller.signal, false); controller.abort();
  await expect(task).rejects.toBeDefined();
});
