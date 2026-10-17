import { createRef, type MouseEvent } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DensityProvider } from "@rain-next/foundations";
import { describe, expect, it, vi } from "vitest";
import {
  Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup,
  ItemHeader, ItemMedia, ItemSeparator, ItemTitle,
} from "./item";

describe("Item content and composition contract", () => {
  it("keeps an ordinary item as static content with stable parts", () => {
    const rootRef = createRef<HTMLDivElement>();
    const { container } = render(<Item ref={rootRef} variant="outline">
      <ItemHeader>资源包</ItemHeader><ItemMedia variant="icon">PDF</ItemMedia>
      <ItemContent><ItemTitle>课程说明</ItemTitle><ItemDescription>开课前阅读。</ItemDescription></ItemContent>
      <ItemActions>已发布</ItemActions><ItemFooter>昨日更新</ItemFooter>
    </Item>);
    expect(rootRef.current).toBe(container.querySelector('[data-rain-id="ui-item"][data-slot="root"]'));
    expect(rootRef.current?.tagName).toBe("DIV");
    expect(rootRef.current).toHaveAttribute("data-variant", "outline");
    expect(rootRef.current).not.toHaveAttribute("tabindex");
    expect(rootRef.current).not.toHaveAttribute("role");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    for (const slot of ["header", "media", "content", "title", "description", "actions", "footer"]) {
      expect(container.querySelector(`[data-slot="${slot}"]`)).toBeInTheDocument();
    }
  });

  it("preserves a native rendered link, refs and merged click handlers", async () => {
    const linkRef = createRef<HTMLAnchorElement>();
    const itemClick = vi.fn();
    const linkClick = vi.fn((event: MouseEvent) => event.preventDefault());
    render(<Item onClick={itemClick} render={<a href="#course" ref={linkRef} onClick={linkClick} />}>
      <ItemContent><ItemTitle>查看课程</ItemTitle></ItemContent>
    </Item>);
    const link = screen.getByRole("link", { name: "查看课程" });
    expect(link).toBe(linkRef.current);
    expect(link).toHaveAttribute("href", "#course");
    expect(link).not.toHaveAttribute("role", "listitem");
    const user = userEvent.setup();
    await user.tab();
    expect(link).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(linkClick).toHaveBeenCalledTimes(1);
    expect(itemClick).toHaveBeenCalledTimes(1);
    await user.click(link);
    expect(linkClick).toHaveBeenCalledTimes(2);
    expect(itemClick).toHaveBeenCalledTimes(2);
  });

  it("leaves action behavior and disabled controls to the host", async () => {
    const open = vi.fn();
    const remove = vi.fn();
    render(<Item><ItemContent><ItemTitle>课堂资料</ItemTitle></ItemContent>
      <ItemActions><button onClick={open}>打开</button><button disabled onClick={remove}>删除</button></ItemActions>
    </Item>);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "打开" }));
    await user.click(screen.getByRole("button", { name: "删除" }));
    expect(open).toHaveBeenCalledTimes(1);
    expect(remove).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "删除" })).toBeDisabled();
  });

  it("maps omitted size to the parent density and keeps explicit sizes", () => {
    render(<><Item data-testid="default">默认</Item><DensityProvider density="compact">
      <Item data-testid="compact">紧凑</Item><Item size="xs" data-testid="smallest">显式小条目</Item>
    </DensityProvider></>);
    expect(screen.getByTestId("default")).toHaveAttribute("data-density", "default");
    expect(screen.getByTestId("default")).toHaveAttribute("data-size", "default");
    expect(screen.getByTestId("compact")).toHaveAttribute("data-density", "compact");
    expect(screen.getByTestId("compact")).toHaveAttribute("data-size", "sm");
    expect(screen.getByTestId("smallest")).toHaveAttribute("data-size", "xs");
  });

  it("keeps list membership around linked items without overriding link semantics", () => {
    render(<ItemGroup aria-label="课程目录"><div role="listitem"><Item render={<a href="#first" />}>
      <ItemContent><ItemTitle>第一课</ItemTitle></ItemContent>
    </Item></div><ItemSeparator /><div role="listitem"><Item><ItemTitle>第二课</ItemTitle></Item></div></ItemGroup>);
    const list = screen.getByRole("list", { name: "课程目录" });
    expect(list).toHaveAttribute("data-slot", "group");
    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(within(list).getByRole("link", { name: "第一课" })).not.toHaveAttribute("role");
    expect(within(list).queryByRole("separator")).not.toBeInTheDocument();
    expect(list.querySelector('.rain-item__separator[data-rain-id="ui-separator"][data-slot="root"]')).toHaveAttribute("aria-hidden", "true");
  });

  it("preserves complete long text and refs without an implicit truncation rule", () => {
    const title = "跨院系课程资源包与学习支持资料完整名称".repeat(8);
    const description = "https://example.edu/resources/" + "unbroken_resource_name".repeat(30);
    const titleRef = createRef<HTMLDivElement>();
    const descriptionRef = createRef<HTMLParagraphElement>();
    render(<Item><ItemContent><ItemTitle ref={titleRef}>{title}</ItemTitle>
      <ItemDescription ref={descriptionRef}>{description}</ItemDescription></ItemContent></Item>);
    expect(titleRef.current).toHaveTextContent(title);
    expect(descriptionRef.current).toHaveTextContent(description);
    expect(titleRef.current?.className).not.toMatch(/line-clamp|truncate|whitespace-nowrap/);
    expect(descriptionRef.current?.className).not.toMatch(/line-clamp|truncate|whitespace-nowrap/);
    expect(descriptionRef.current).toHaveClass("wrap-anywhere");
    fireEvent.focus(titleRef.current!);
    expect(titleRef.current).not.toHaveAttribute("tabindex");
  });
});
