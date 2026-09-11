import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { App } from "../app";

function gallery() {
  return screen.getByRole("list", { name: "图标列表" });
}

async function renderDirectory() {
  render(<App />);
  await screen.findByRole("heading", { level: 1, name: "Icons 图标库" }, { timeout: 5000 });
}

describe("Icon directory", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "#icons");
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    window.history.replaceState(null, "", "#overview");
  });

  it("provides a direct, focused route from the overview without rendering the full library at once", async () => {
    window.history.replaceState(null, "", "#overview");
    render(<App />);
    expect(screen.getByRole("link", { name: /^Icons：/ })).toHaveAttribute("href", "#icons");
    act(() => {
      window.history.pushState(null, "", "#icons");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    const heading = await screen.findByRole("heading", { level: 1, name: "Icons 图标库" }, { timeout: 5000 });
    await waitFor(() => expect(heading).toHaveFocus());
    expect(screen.getByText("899 个来源图标")).toBeVisible();
    expect(screen.getByText("899 个可预览 · 0 个源图形待修复")).toBeVisible();
    expect(screen.getByText("原有图标视觉已验收")).toBeVisible();
    expect(screen.getByText("2 枚新增批改图标待视觉验收")).toBeVisible();
    expect(within(gallery()).getAllByRole("listitem")).toHaveLength(60);
    expect(screen.getByRole("button", { name: "上一页" })).toBeDisabled();
    const firstAsset = gallery().firstElementChild?.getAttribute("data-asset-id");
    fireEvent.click(screen.getByRole("button", { name: "下一页" }));
    expect(gallery().firstElementChild?.getAttribute("data-asset-id")).not.toBe(firstAsset);
    expect(screen.getByRole("button", { name: "上一页" })).toBeEnabled();
  });

  it("finds confirmed Chinese semantics and distinguishes the filled exception", async () => {
    await renderDirectory();
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索图标" }), { target: { value: "编辑" } });
    expect(gallery().querySelector('[data-asset-id="icon/edit-pencil"]')).not.toBeNull();
    expect(gallery().querySelector('[data-asset-id="icon/edit-pencil-filled"]')).not.toBeNull();
    const filled = gallery().querySelector('[data-asset-id="icon/edit-pencil-filled"]') as HTMLElement;
    expect(within(filled).getByText("按要求使用")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "默认用途" }));
    expect(gallery().querySelector('[data-asset-id="icon/edit-pencil"]')).not.toBeNull();
    expect(gallery().querySelector('[data-asset-id="icon/edit-pencil-filled"]')).toBeNull();
  });

  it("does not extend the original icon acceptance to the two supplementary grading figures", async () => {
    await renderDirectory();
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索图标" }), { target: { value: "icon/grading-" } });
    const cards = within(gallery()).getAllByRole("listitem");
    expect(cards).toHaveLength(2);
    for (const card of cards) {
      expect(within(card).getByText("新增批改图标 · 待视觉验收")).toBeVisible();
      expect(card).toHaveAttribute("data-availability", "available");
      fireEvent.click(within(card).getByText("用法与来源"));
      expect(within(card).getByRole("link", { name: /查看 Figma 来源/ })).toHaveAttribute("href", expect.stringContaining("MbWg1ft5zk1JRQiQ6dS30e"));
    }
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索图标" }), { target: { value: "icon/edit-pencil" } });
    expect(within(gallery()).queryByText("新增批改图标 · 待视觉验收")).not.toBeInTheDocument();
  });

  it("previews the two repaired source identities with their own static imports", async () => {
    await renderDirectory();
    const search = screen.getByRole("searchbox", { name: "搜索图标" });
    for (const [assetId, exportName, nodeId] of [
      ["icon/editor-redo", "EditorRedoIcon", "84-35"],
      ["icon/editor-undo", "EditorUndoIcon", "84-32"],
    ] as const) {
      fireEvent.change(search, { target: { value: assetId } });
      const card = gallery().querySelector(`[data-asset-id="${assetId}"]`) as HTMLElement;
      expect(card).toHaveAttribute("data-availability", "available");
      expect(card.querySelector('[data-slot="icon-preview"] [data-rain-id="icon"]')).toHaveAttribute("data-icon", assetId);
      expect(within(card).queryByText("源图形待修复")).not.toBeInTheDocument();
      fireEvent.click(within(card).getByText("用法与来源"));
      expect(within(card).getByRole("button", { name: "复制引用" })).toBeEnabled();
      expect(card.querySelector("pre")).toHaveTextContent(`import { ${exportName} } from "@rain-next/ui/icons/${assetId.replace("icon/", "")}";`);
      expect(within(card).getByRole("link", { name: /查看 Figma 来源/ })).toHaveAttribute("href", expect.stringContaining(`node-id=${nodeId}`));
    }
    fireEvent.change(search, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: "待修复" }));
    expect(screen.queryByRole("list", { name: "图标列表" })).not.toBeInTheDocument();
    expect(screen.getByText("没有找到匹配的图标")).toBeVisible();
  });

  it("resets pagination when a search changes and provides an honest empty state", async () => {
    await renderDirectory();
    fireEvent.click(screen.getByRole("button", { name: "下一页" }));
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索图标" }), { target: { value: "icon/edit-pencil" } });
    expect(screen.getByRole("button", { name: "上一页" })).toBeDisabled();
    expect(gallery().querySelector('[data-asset-id="icon/edit-pencil"]')).not.toBeNull();
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索图标" }), { target: { value: "没有这个图标xyz" } });
    expect(screen.getByText("没有找到匹配的图标")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "清除搜索与筛选" }));
    expect(screen.getByRole("searchbox", { name: "搜索图标" })).toHaveValue("");
    expect(within(gallery()).getAllByRole("listitem")).toHaveLength(60);
  });

  it("copies an exact public static import only after successful clipboard access", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    await renderDirectory();
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索图标" }), { target: { value: "icon/edit-pencil" } });
    const card = gallery().querySelector('[data-asset-id="icon/edit-pencil"]') as HTMLElement;
    fireEvent.click(within(card).getByText("用法与来源"));
    fireEvent.click(within(card).getByRole("button", { name: "复制引用" }));
    expect(writeText).toHaveBeenCalledWith('import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";\n\n<EditPencilIcon />');
    expect(await within(card).findByText("已复制引用")).toBeVisible();
    writeText.mockRejectedValueOnce(new Error("Clipboard unavailable"));
    fireEvent.click(within(card).getByRole("button", { name: "复制引用" }));
    expect(await within(card).findByText("暂时无法复制，请选中下方代码复制。")).toBeVisible();
  });

  it("lets a reviewer change host color and preview size without recoloring intrinsic assets", async () => {
    await renderDirectory();
    fireEvent.click(screen.getByRole("radio", { name: "深色底" }));
    fireEvent.click(screen.getByRole("radio", { name: "32px" }));
    expect(gallery()).toHaveAttribute("data-preview-color", "inverse");
    expect(gallery()).toHaveAttribute("data-preview-size", "32");
    expect(screen.getByText("固定配色图标保留原色。其余图标跟随预览区域颜色。")).toBeVisible();
  });

  it("shows one shared shape under distinct host roles and keeps page navigation separate from sharing", async () => {
    await renderDirectory();
    const examples = screen.getByRole("region", { name: "放进真实场景" });
    for (const name of ["清空值示意", "失败提示示意"]) {
      const host = within(examples).getByRole("group", { name });
      expect(host.querySelector('[data-icon="icon/circle-close"]')).not.toBeNull();
    }
    expect(within(examples).getByRole("button", { name: "编辑课程" }).querySelector('[data-icon="icon/edit-pencil"]')).not.toBeNull();
    expect(within(examples).getByRole("button", { name: "查看详情" }).querySelector('[data-icon="icon/share-alt"]')).not.toBeNull();
    expect(within(examples).getByText(/打开方式由交互决定/)).toBeVisible();
  });

  it("withholds the preview and import for an unavailable source fixture even when stale runtime metadata exists", async () => {
    vi.resetModules();
    vi.doMock("@rain-next/foundations/icons/catalog", async (importOriginal) => {
      const actual = await importOriginal<typeof import("@rain-next/foundations/icons/catalog")>();
      const fixture = actual.iconCatalog.find((asset) => asset.assetId === "icon/edit-pencil")!;
      return {
        ...actual,
        iconCatalog: [{ ...fixture, availability: "source-unavailable", sourceIssue: "测试来源缺少可见图形。" }],
      };
    });
    try {
      const { IconsPage } = await import("./icons-page");
      render(<IconsPage />);
      fireEvent.click(screen.getByRole("button", { name: "待修复" }));
      expect(within(gallery()).getAllByRole("listitem")).toHaveLength(1);
      const card = within(gallery()).getByRole("listitem");
      expect(card).toHaveAttribute("data-availability", "source-unavailable");
      expect(within(card).getByText("源图形待修复")).toBeVisible();
      expect(card.querySelector('[data-slot="icon-preview"] [data-rain-id="icon"]')).toBeNull();
      fireEvent.click(within(card).getByText("用法与来源"));
      expect(within(card).getByText("测试来源缺少可见图形。")).toBeVisible();
      expect(within(card).queryByRole("button", { name: "复制引用" })).not.toBeInTheDocument();
      expect(card.querySelector("pre")).toBeNull();
      expect(within(card).getByRole("link", { name: /查看 Figma 来源/ })).toHaveAttribute("href", expect.stringContaining("node-id=183-574"));
    } finally {
      cleanup();
      vi.doUnmock("@rain-next/foundations/icons/catalog");
      vi.resetModules();
    }
  });
});
