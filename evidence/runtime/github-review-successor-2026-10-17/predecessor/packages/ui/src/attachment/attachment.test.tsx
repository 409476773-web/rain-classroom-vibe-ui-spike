import { createRef, useState, type MouseEvent } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentTitle, AttachmentTrigger } from "./attachment";

describe("Attachment independent controls", () => {
  it("keeps preview and removal as separate keyboard controls without submitting the host form", async () => {
    const preview = vi.fn(), remove = vi.fn(), submit = vi.fn((event: React.FormEvent) => event.preventDefault());
    render(<form onSubmit={submit}><Attachment>
      <AttachmentContent><AttachmentTitle>课程说明.pdf</AttachmentTitle></AttachmentContent>
      <AttachmentTrigger aria-label="预览课程说明.pdf" onClick={preview} />
      <AttachmentActions><AttachmentAction onClick={remove}>移除课程说明.pdf</AttachmentAction></AttachmentActions>
    </Attachment></form>);
    const user = userEvent.setup();
    const trigger = screen.getByRole("button", { name: "预览课程说明.pdf" });
    expect(trigger).toHaveAttribute("type", "button");
    await user.tab();
    expect(trigger).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.tab();
    expect(screen.getByRole("button", { name: "移除课程说明.pdf" })).toHaveFocus();
    await user.keyboard(" ");
    expect(preview).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(1);
    expect(submit).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "移除课程说明.pdf" }));
    expect(preview).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledTimes(2);
  });

  it("preserves rendered links, refs and merged native click handlers", async () => {
    const ref = createRef<HTMLAnchorElement>(), outerClick = vi.fn();
    const linkClick = vi.fn((event: MouseEvent) => event.preventDefault());
    render(<Attachment><AttachmentTitle>阅读资料</AttachmentTitle>
      <AttachmentTrigger aria-label="打开阅读资料" onClick={outerClick}
        render={<a href="#reading" ref={ref} onClick={linkClick} />} />
    </Attachment>);
    const link = screen.getByRole("link", { name: "打开阅读资料" });
    expect(ref.current).toBe(link);
    expect(link).toHaveAttribute("href", "#reading");
    expect(link).not.toHaveAttribute("type");
    await userEvent.setup().click(link);
    expect(linkClick).toHaveBeenCalledTimes(1);
    expect(outerClick).toHaveBeenCalledTimes(1);
  });

  it("leaves disabled and in-flight action protection to the real Rain Button", async () => {
    const remove = vi.fn(), retry = vi.fn();
    render(<Attachment><AttachmentActions>
      <AttachmentAction disabled onClick={remove}>删除</AttachmentAction>
      <AttachmentAction loading onClick={retry}>重试</AttachmentAction>
    </AttachmentActions></Attachment>);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "删除" }));
    await user.click(screen.getByRole("button", { name: "重试" }));
    expect(remove).not.toHaveBeenCalled();
    expect(retry).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "重试" })).toHaveAttribute("aria-busy", "true");
  });

  it("keeps a failed attachment while the host retries and publishes its next state", async () => {
    function Host() {
      const [state, setState] = useState<"error" | "processing">("error");
      return <Attachment state={state} data-testid="record"><AttachmentContent>
        <AttachmentTitle>课堂反馈.pdf</AttachmentTitle>
        <AttachmentDescription>{state === "error" ? "网络中断，资料仍保留" : "正在处理资料"}</AttachmentDescription>
      </AttachmentContent><AttachmentActions>
        <AttachmentAction disabled={state !== "error"} onClick={() => setState("processing")}>重试课堂反馈.pdf</AttachmentAction>
      </AttachmentActions></Attachment>;
    }
    render(<Host />);
    const record = screen.getByTestId("record");
    await userEvent.setup().click(screen.getByRole("button", { name: "重试课堂反馈.pdf" }));
    expect(screen.getByTestId("record")).toBe(record);
    expect(record).toHaveAttribute("data-state", "processing");
    expect(screen.getByText("课堂反馈.pdf")).toBeInTheDocument();
    expect(screen.getByText("正在处理资料")).toBeInTheDocument();
  });
});
