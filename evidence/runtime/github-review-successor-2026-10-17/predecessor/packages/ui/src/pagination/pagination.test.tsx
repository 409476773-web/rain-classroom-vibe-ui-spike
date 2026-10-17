import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DensityProvider } from "@rain-next/foundations";
import { FormItem } from "../input/form-item";
import { Pagination } from "./pagination";
import { buildPaginationItems, pageAfterSizeChange, parseJumpPage } from "./pagination.utils";

describe("Pagination calculation", () => {
  it("keeps endpoint pages and a stable window, filling single missing pages", () => {
    for (const total of [1, 2, 7, 9, 10, 20, 100_000]) {
      for (const page of [1, 2, 5, Math.ceil(total / 2), total]) {
        const current = Math.min(page, total);
        const items = buildPaginationItems(current, total);
        const pages = items.filter((item) => item.type === "page").map((item) => item.page);
        expect(pages).toContain(1);
        expect(pages).toContain(total);
        expect(pages).toContain(current);
        expect(new Set(pages).size).toBe(pages.length);
        expect(items.length).toBe(Math.min(total, 9));
        items.forEach((item, index) => {
          if (item.type !== "page") {
            expect(items[index + 1]!.page - items[index - 1]!.page).toBeGreaterThan(2);
            expect(item.page).toBeGreaterThanOrEqual(1);
            expect(item.page).toBeLessThanOrEqual(total);
          }
        });
      }
    }
    expect(buildPaginationItems(10, 20, true)).toHaveLength(7);
  });

  it("preserves the old first item when changing page size, including unknown totals", () => {
    expect(pageAfterSizeChange(5, 20, 50, 260)).toBe(2);
    expect(pageAfterSizeChange(5, 20, 10, undefined)).toBe(9);
    expect(pageAfterSizeChange(5, 20, 50, 0)).toBe(1);
  });

  it("does not silently clamp an invalid jump", () => {
    expect(parseJumpPage(" 3 ", 20)).toEqual({ page: 3 });
    expect(parseJumpPage("", 20)).toEqual({ page: null });
    for (const value of ["0", "-1", "2.5", "1e2", "abc", "21", "9007199254740992"]) {
      expect(parseJumpPage(value, 20)).toEqual({ page: null, error: "请输入 1–20 之间的整数页码" });
    }
  });
});

describe("Pagination", () => {
  it("uses independent local state and native navigation semantics", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    render(<><Pagination total={400} onChange={changed} aria-label="甲" /><Pagination total={400} aria-label="乙" /></>);
    const first = within(screen.getByRole("navigation", { name: "甲" }));
    await user.click(first.getByRole("button", { name: "下一页" }));
    expect(first.getByRole("button", { name: "第 2 页" })).toHaveAttribute("aria-current", "page");
    expect(within(screen.getByRole("navigation", { name: "乙" })).getByRole("button", { name: "第 1 页" })).toHaveAttribute("aria-current", "page");
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 2, pageSize: 20, reason: "page" });
    await user.click(first.getByRole("button", { name: "第 2 页" }));
    expect(changed).toHaveBeenCalledTimes(1);
  });

  it("proposes one complete size change and waits for controlled acceptance", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    const { rerender } = render(<Pagination total={260} page={5} pageSize={20} variant="data" onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    await user.click(await screen.findByRole("button", { name: "每页 50 条" }));
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 2, pageSize: 50, reason: "page-size" });
    expect(screen.getByRole("button", { name: "第 5 页" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "分页设置" })).toHaveAttribute("title", "每页 20 条；分页设置");
    rerender(<Pagination total={260} page={2} pageSize={50} variant="data" onChange={changed} />);
    expect(screen.getByRole("button", { name: "第 2 页" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "分页设置" })).toHaveAttribute("title", "每页 50 条；分页设置");
  });

  it("does not partially commit an uncontrolled size when the controlled page rejects the proposal", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    const { rerender } = render(<Pagination total={260} page={5} variant="data" onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    await user.click(await screen.findByRole("button", { name: "每页 50 条" }));
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 2, pageSize: 50, reason: "page-size" });
    expect(screen.getByRole("button", { name: "分页设置" })).toHaveAttribute("title", "每页 20 条；分页设置");
    rerender(<Pagination total={260} page={2} variant="data" onChange={changed} />);
    expect(screen.getByRole("button", { name: "分页设置" })).toHaveAttribute("title", "每页 50 条；分页设置");
  });

  it("commits uncontrolled changes atomically without duplicate callbacks", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    render(<Pagination total={260} defaultPage={5} variant="data" onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    await user.click(await screen.findByRole("button", { name: "每页 50 条" }));
    expect(screen.getByRole("button", { name: "第 2 页" })).toHaveAttribute("aria-current", "page");
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 2, pageSize: 50, reason: "page-size" });
  });

  it("permanently clamps local state when total shrinks, without calling onChange", () => {
    const changed = vi.fn();
    const { rerender } = render(<Pagination total={400} defaultPage={10} onChange={changed} />);
    rerender(<Pagination total={40} defaultPage={10} onChange={changed} />);
    expect(screen.getByRole("button", { name: "第 2 页" })).toHaveAttribute("aria-current", "page");
    rerender(<Pagination total={400} defaultPage={10} onChange={changed} />);
    expect(screen.getByRole("button", { name: "第 2 页" })).toHaveAttribute("aria-current", "page");
    expect(changed).not.toHaveBeenCalled();
  });

  it("does not revive a stale page after a rejected controlled size proposal and total shrink", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    const { rerender } = render(<Pagination total={400} defaultPage={10} pageSize={20} variant="data" onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    await user.click(await screen.findByRole("button", { name: "每页 50 条" }));
    rerender(<Pagination total={20} defaultPage={10} pageSize={20} variant="data" onChange={changed} />);
    rerender(<Pagination total={400} defaultPage={10} pageSize={20} variant="data" onChange={changed} />);
    expect(screen.getByRole("button", { name: "第 1 页" })).toHaveAttribute("aria-current", "page");
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 4, pageSize: 50, reason: "page-size" });
  });

  it("keeps totals and page size when single-page navigation is hidden", () => {
    const { rerender } = render(<Pagination total={0} variant="data" hideOnSinglePage />);
    expect(screen.getByText("共 0 条", { selector: "[data-slot=total]" })).toBeVisible();
    expect(screen.getByRole("button", { name: "分页设置" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "下一页" })).toBeNull();
    rerender(<Pagination total={5} variant="data" showTotal="range" hideOnSinglePage />);
    expect(screen.getByText("第 1–5 条，共 5 条", { selector: "[data-slot=total]" })).toBeVisible();
  });

  it("does not invent a last page or total for an unknown result count", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    const { rerender } = render(<Pagination hasNextPage defaultPage={8} showTotal="range" showJumper onChange={changed} />);
    expect(screen.getByText("第 8 页", { selector: "[data-slot=current-status]" })).toBeVisible();
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByText(/共/)).toBeNull();
    await user.click(screen.getByRole("button", { name: "下一页" }));
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 9, pageSize: 20, reason: "page" });
    rerender(<Pagination hasNextPage={false} defaultPage={8} showTotal="range" showJumper onChange={changed} />);
    expect(screen.getByRole("button", { name: "下一页" })).toBeDisabled();
  });

  it("validates jump input visibly, leaves blur inert and respects IME", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    render(<Pagination total={400} showJumper onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    const input = screen.getByRole("textbox", { name: "跳转到页码" });
    fireEvent.change(input, { target: { value: "99" } });
    fireEvent.blur(input);
    expect(changed).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "跳转" }));
    expect(screen.getByRole("alert")).toHaveTextContent("请输入 1–20 之间的整数页码");
    expect(input).toHaveAttribute("aria-invalid", "true");
    fireEvent.change(input, { target: { value: "3" } });
    fireEvent.compositionStart(input);
    fireEvent.keyDown(input, { key: "Enter", keyCode: 229, isComposing: true });
    expect(changed).not.toHaveBeenCalled();
    fireEvent.compositionEnd(input);
    fireEvent.keyDown(input, { key: "Enter" });
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 3, pageSize: 20, reason: "jump" });
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("retains jump input on a controlled rejection", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    render(<Pagination total={400} page={1} showJumper onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    const input = screen.getByRole("textbox", { name: "跳转到页码" });
    await user.type(input, "3{Enter}");
    expect(input).toHaveValue("3");
    expect(screen.getByRole("button", { name: "第 1 页" })).toHaveAttribute("aria-current", "page");
  });

  it.each(["jump", "page-size"])("preserves a newer jump draft when an earlier %s proposal is accepted", async (reason) => {
    const user = userEvent.setup(), changed = vi.fn();
    const { rerender } = render(<Pagination total={400} page={1} pageSize={20} variant="data" onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    const input = screen.getByRole("textbox", { name: "跳转到页码" });
    if (reason === "jump") await user.type(input, "3{Enter}");
    else await user.click(screen.getByRole("button", { name: "每页 50 条" }));
    fireEvent.change(input, { target: { value: "4" } });
    rerender(<Pagination total={400} page={reason === "jump" ? 3 : 1} pageSize={reason === "jump" ? 20 : 50} variant="data" onChange={changed} />);
    expect(input).toHaveValue("4");
    expect(screen.getByRole("dialog", { name: "分页设置" })).toBeVisible();
  });

  it("can submit after disabling and reopening during an unfinished composition", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    const { rerender } = render(<Pagination total={400} onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    fireEvent.compositionStart(screen.getByRole("textbox", { name: "跳转到页码" }));
    rerender(<Pagination total={400} disabled onChange={changed} />);
    expect(screen.queryByRole("dialog")).toBeNull();
    rerender(<Pagination total={400} onChange={changed} />);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    await user.type(screen.getByRole("textbox", { name: "跳转到页码" }), "3{Enter}");
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 3, pageSize: 20, reason: "jump" });
  });

  it("moves focus to the accepted page only when its activated ellipsis disappears", async () => {
    const user = userEvent.setup();
    render(<Pagination total={1000} defaultPage={20} />);
    const ellipsis = screen.getByRole("button", { name: "向后跳转至第 25 页" });
    await user.click(ellipsis);
    expect(screen.getByRole("button", { name: "第 25 页" })).toHaveFocus();
    const next = screen.getByRole("button", { name: "下一页" });
    await user.click(next);
    expect(next).toHaveFocus();
  });

  it("does not steal external focus when a delayed controlled page is accepted", async () => {
    const user = userEvent.setup(), changed = vi.fn();
    const view = (page: number) => <><Pagination total={1000} page={page} onChange={changed} /><button>外部操作</button></>;
    const { rerender } = render(view(20));
    await user.click(screen.getByRole("button", { name: "向后跳转至第 25 页" }));
    await user.click(screen.getByRole("button", { name: "外部操作" }));
    rerender(view(25));
    expect(screen.getByRole("button", { name: "外部操作" })).toHaveFocus();
  });

  it("keeps native links and ignores modified activations", () => {
    const changed = vi.fn();
    render(<Pagination total={400} getPageHref={(page) => `#courses-page-${page}`} onChange={changed} />);
    const next = screen.getByRole("link", { name: "下一页" });
    expect(next).toHaveAttribute("href", "#courses-page-2");
    fireEvent.click(next, { ctrlKey: true });
    fireEvent.click(next, { metaKey: true });
    fireEvent.click(next, { shiftKey: true });
    fireEvent.click(next, { button: 1 });
    expect(changed).not.toHaveBeenCalled();
    fireEvent.click(next);
    expect(changed).toHaveBeenCalledExactlyOnceWith({ page: 2, pageSize: 20, reason: "page" });
  });

  it("navigates a valid quick jump in native link mode without a change callback", async () => {
    const user = userEvent.setup();
    render(<Pagination total={400} page={1} getPageHref={(page) => `#native-jump-${page}`} showJumper />);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    await user.type(screen.getByRole("textbox", { name: "跳转到页码" }), "3{Enter}");
    expect(window.location.hash).toBe("#native-jump-3");
    window.history.replaceState(null, "", window.location.pathname);
  });

  it("rejects unsafe page link protocols before exposing an activation", () => {
    expect(() => render(<Pagination total={400} getPageHref={() => "javascript:alert(1)"} />)).toThrow(/getPageHref/);
  });

  it.each(["disabled", "loading"] as const)("blocks all controls while %s", async (state) => {
    const user = userEvent.setup(), changed = vi.fn();
    render(<Pagination total={400} variant="data" showJumper onChange={changed} {...{ [state]: true }} />);
    await user.click(screen.getByRole("button", { name: "下一页" }));
    await user.click(screen.getByRole("button", { name: "第 2 页" }));
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(changed).not.toHaveBeenCalled();
  });

  it("isolates internal fields from an enclosing FormItem", async () => {
    const user = userEvent.setup();
    render(<FormItem id="host-field" label="外层字段" status="error" required><Pagination total={400} variant="data" showJumper /></FormItem>);
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    const input = screen.getByRole("textbox", { name: "跳转到页码" });
    expect(input.id).not.toBe("host-field");
    expect(input).not.toHaveAttribute("aria-invalid", "true");
    expect(input).not.toBeRequired();
    expect(screen.getByRole("button", { name: "分页设置" })).not.toHaveAttribute("aria-invalid", "true");
  });

  it("uses density defaults and explicit complete sizes", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<DensityProvider density="compact"><Pagination total={400} variant="data" showJumper /></DensityProvider>);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-size", "24");
    rerender(<DensityProvider density="compact"><Pagination total={400} variant="data" showJumper size={28} /></DensityProvider>);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-size", "28");
    await user.click(screen.getByRole("button", { name: "分页设置" }));
    expect(screen.getByRole("textbox", { name: "跳转到页码" }).closest('[data-rain-id="ui-input"]')).toHaveAttribute("data-size", "28");
  });

  it("adapts to the observed container width without changing its explicit size", () => {
    let resize = () => {};
    let width = 1000;
    const widthSpy = vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(function (this: HTMLElement) { return this.dataset.rainId === "ui-pagination" ? width : 0; });
    const measureSpy = vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(function (this: HTMLElement) {
      return this.dataset.measure === "full" ? 400 : this.dataset.measure === "less" ? 300 : this.dataset.measure === "simple" ? 180 : this.dataset.measure === "size" ? 80 : 0;
    });
    vi.stubGlobal("ResizeObserver", class { constructor(callback: () => void) { resize = callback; } observe() {} disconnect() {} });
    const { unmount, rerender } = render(<Pagination total={1000} defaultPage={20} size={32} />);
    expect(screen.getByRole("navigation")).toHaveAttribute("data-presentation", "full");
    act(() => { width = 350; resize(); });
    expect(screen.getByRole("navigation")).toHaveAttribute("data-presentation", "less");
    const root = screen.getByRole("navigation");
    root.style.paddingInlineStart = "16px";
    root.style.paddingInlineEnd = "16px";
    act(() => { width = 420; resize(); });
    expect(root).toHaveAttribute("data-presentation", "less");
    screen.getByRole("button", { name: "第 20 页" }).focus();
    act(() => { width = 240; resize(); });
    expect(screen.getByRole("navigation")).toHaveAttribute("data-presentation", "simple");
    expect(screen.getByRole("navigation")).toHaveAttribute("data-size", "32");
    expect(screen.getByText("20 / 50", { selector: "[data-slot=current-status]" })).toHaveFocus();
    act(() => { width = 1000; resize(); });
    rerender(<Pagination total={240000} page={10000} variant="data" pageSizePlacement="inline" size={32} />);
    expect(root).toHaveAttribute("data-inline-size", "true");
    screen.getByRole("button", { name: "分页设置" }).focus();
    act(() => { width = 240; resize(); });
    expect(root).not.toHaveAttribute("data-inline-size");
    expect(screen.getByRole("button", { name: "分页设置" })).toHaveFocus();
    unmount(); widthSpy.mockRestore(); measureSpy.mockRestore(); vi.unstubAllGlobals();
  });

  it("rejects invalid numeric API input clearly", () => {
    for (const total of [-1, 1.5, Infinity, Number.NaN, Number.MAX_SAFE_INTEGER + 1]) {
      expect(() => render(<Pagination total={total} />)).toThrow(/Pagination total/);
    }
    expect(() => render(<Pagination total={100} pageSize={0} />)).toThrow(/Pagination pageSize/);
    expect(() => render(<Pagination total={100} page={0} />)).toThrow(/Pagination page/);
    expect(() => render(<Pagination total={100} pageSizeOptions={[10, 10]} />)).toThrow(/pageSizeOptions/);
  });
});
