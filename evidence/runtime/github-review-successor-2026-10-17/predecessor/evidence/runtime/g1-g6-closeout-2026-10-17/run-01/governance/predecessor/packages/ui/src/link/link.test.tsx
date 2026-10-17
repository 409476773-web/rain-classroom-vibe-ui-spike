import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { DensityProvider } from "../../../foundations/src/density";
import { Link, type LinkAppearance } from "../index";

const styles = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "../styles.css"),
  "utf8",
);

function linkTypeContract() {
  const appearance: LinkAppearance = "inline";
  const valid = <Link href="/help" appearance={appearance}>帮助</Link>;
  // @ts-expect-error A Link requires a real href.
  const noHref = <Link>帮助</Link>;
  // @ts-expect-error A Link requires visible children.
  const noText = <Link href="/help" aria-label="帮助" />;
  // @ts-expect-error Disabled actions belong to Button, not this navigation recipe.
  const disabled = <Link href="/help" disabled>帮助</Link>;
  // @ts-expect-error Loading actions belong to Button, not this navigation recipe.
  const loading = <Link href="/help" loading>帮助</Link>;
  // @ts-expect-error Links have no action-tone matrix.
  const tone = <Link href="/help" tone="danger">帮助</Link>;
  // @ts-expect-error A real link cannot be changed into a pseudo-button.
  const buttonRole = <Link href="/help" role="button">帮助</Link>;
  return { valid, noHref, noText, disabled, loading, tone, buttonRole };
}

void linkTypeContract;

describe("Link recipe", () => {
  it("exports a Link recipe", () => {
    expect(Link).toBeDefined();
  });

  it("uses a native href and same-tab navigation by default", () => {
    render(<Link href="/help">使用帮助</Link>);
    const link = screen.getByRole("link", { name: "使用帮助" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/help");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("role");
    expect(link).not.toHaveAttribute("rel");
    expect(link).toHaveAttribute("data-rain-id", "ui-link");
    expect(link).toHaveAttribute("data-slot", "root");
    expect(link).toHaveAttribute("data-variant", "standalone");
    expect(link).toHaveAttribute("data-state", "default");
    expect(link).toHaveAttribute("data-focus", "item");
    expect(link.querySelector('[data-slot="label"]')).toHaveTextContent("使用帮助");
  });

  it("exposes inline appearance without imposing a Button size", () => {
    render(
      <DensityProvider density="compact">
        <p>操作方法请查看<Link href="/help" appearance="inline">使用帮助</Link>。</p>
      </DensityProvider>,
    );
    const link = screen.getByRole("link", { name: "使用帮助" });
    expect(link).toHaveAttribute("data-variant", "inline");
    expect(link).toHaveAttribute("data-density", "compact");
    expect(link).not.toHaveAttribute("data-size");
  });

  it("adds visible new-tab context and safe rel tokens only for _blank", () => {
    render(<Link href="/help" target="_blank">使用帮助</Link>);
    const link = screen.getByRole("link", { name: "使用帮助（新标签页打开）" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    const hint = link.querySelector('[data-slot="new-tab-hint"]');
    expect(hint).toHaveTextContent("（新标签页打开）");
    expect(hint).not.toHaveAttribute("aria-hidden");
    expect(hint).toBeVisible();
  });

  it.each(["aria-label", "aria-labelledby"] as const)(
    "preserves new-tab context when %s overrides the accessible name",
    (nameAttribute) => {
      const naming = nameAttribute === "aria-label"
        ? { "aria-label": "外部帮助文档" }
        : { "aria-labelledby": "custom-link-name" };
      render(
        <>
          <span id="custom-link-name">外部帮助文档</span>
          <p id="link-help">文档介绍</p>
          <Link href="/help" target="_blank" aria-describedby="link-help" {...naming}>
            使用帮助
          </Link>
        </>,
      );
      const link = screen.getByRole("link", { name: "外部帮助文档" });
      expect(link).toHaveAccessibleDescription("文档介绍 （新标签页打开）");
      const hint = link.querySelector('[data-slot="new-tab-hint"]');
      expect(hint).toBeVisible();
      expect(link).toHaveAttribute("aria-describedby", `link-help ${hint?.id}`);
    },
  );

  it("does not repeat the new-tab hint when the visible text already names the link", () => {
    render(
      <>
        <p id="link-help">文档介绍</p>
        <Link href="/help" target="_blank" aria-describedby="link-help">使用帮助</Link>
      </>,
    );
    const link = screen.getByRole("link", { name: "使用帮助（新标签页打开）" });
    expect(link).toHaveAccessibleDescription("文档介绍");
    expect(link).toHaveAttribute("aria-describedby", "link-help");
  });

  it("keeps overridden same-tab names and existing descriptions unchanged", () => {
    render(
      <>
        <p id="link-help">文档介绍</p>
        <Link href="/help" aria-label="外部帮助文档" aria-describedby="link-help">使用帮助</Link>
      </>,
    );
    const link = screen.getByRole("link", { name: "外部帮助文档" });
    expect(link).toHaveAccessibleDescription("文档介绍");
    expect(link).toHaveAttribute("aria-describedby", "link-help");
    expect(link.querySelector('[data-slot="new-tab-hint"]')).toBeNull();
  });

  it("associates each overridden new-tab name with its own stable hint", () => {
    function Links({ suffix }: { suffix: string }) {
      return (
        <>
          <Link href="/one" target="_blank" aria-label={`帮助一${suffix}`}>使用帮助</Link>
          <Link href="/two" target="_BLANK" aria-label={`帮助二${suffix}`}>使用帮助</Link>
        </>
      );
    }
    const { rerender } = render(<Links suffix="" />);
    const firstLink = screen.getByRole("link", { name: "帮助一" });
    const secondLink = screen.getByRole("link", { name: "帮助二" });
    expect(firstLink).toHaveAccessibleDescription("（新标签页打开）");
    expect(secondLink).toHaveAccessibleDescription("（新标签页打开）");
    const firstHintId = firstLink.querySelector('[data-slot="new-tab-hint"]')?.id;
    const secondHintId = secondLink.querySelector('[data-slot="new-tab-hint"]')?.id;
    expect(firstHintId).toBeTruthy();
    expect(secondHintId).not.toBe(firstHintId);
    expect(firstLink).toHaveAttribute("aria-describedby", firstHintId);
    expect(secondLink).toHaveAttribute("aria-describedby", secondHintId);

    rerender(<Links suffix="更新" />);
    expect(screen.getByRole("link", { name: "帮助一更新" })).toHaveAttribute("aria-describedby", firstHintId);
    expect(screen.getByRole("link", { name: "帮助二更新" })).toHaveAttribute("aria-describedby", secondHintId);
  });

  it("merges and deduplicates caller rel tokens", () => {
    render(<Link href="/help" target="_blank" rel="nofollow noopener  noreferrer">使用帮助</Link>);
    const link = screen.getByRole("link", { name: "使用帮助（新标签页打开）" });
    expect(link.getAttribute("rel")?.split(/\s+/)).toEqual(["nofollow", "noopener", "noreferrer"]);
  });

  it("recognizes case-insensitive native new-tab targets", () => {
    render(<Link href="/help" target="_BLANK" rel="nofollow">使用帮助</Link>);
    const link = screen.getByRole("link", { name: "使用帮助（新标签页打开）" });
    expect(link).toHaveAttribute("target", "_BLANK");
    expect(link).toHaveAttribute("rel", "nofollow noopener noreferrer");
  });

  it("preserves explicit same-tab target and rel without adding a hint", () => {
    render(<Link href="/help" target="_self" rel="author">使用帮助</Link>);
    const link = screen.getByRole("link", { name: "使用帮助" });
    expect(link).toHaveAttribute("target", "_self");
    expect(link).toHaveAttribute("rel", "author");
    expect(link.querySelector('[data-slot="new-tab-hint"]')).toBeNull();
  });

  it("forwards ref and native download, language, description and click handling", async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLAnchorElement>();
    const onClick = vi.fn((event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault());
    render(
      <Link href="/guide.pdf" download="guide.pdf" hrefLang="zh-CN" aria-describedby="help" ref={ref} onClick={onClick}>
        下载指南
      </Link>,
    );
    const link = screen.getByRole("link", { name: "下载指南" });
    expect(ref.current).toBe(link);
    expect(link).toHaveAttribute("download", "guide.pdf");
    expect(link).toHaveAttribute("hreflang", "zh-CN");
    expect(link).toHaveAttribute("aria-describedby", "help");
    await user.tab();
    expect(link).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("uses blue visited styling and text-only interaction feedback", () => {
    expect(styles).toMatch(/\.rain-link,\s*\.rain-link:visited \{[^}]*color: var\(--rain-link-color\);/);
    expect(styles).toMatch(/\.rain-link:hover \{\s*color: var\(--rain-link-hover-color\);\s*\}/);
    expect(styles).toMatch(/\.rain-link:active \{\s*color: var\(--rain-link-pressed-color\);\s*\}/);
    expect(styles).toMatch(/\.rain-link \{[^}]*background: transparent;/);
    expect(styles).not.toContain("--rain-link-color:");
    expect(readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../../../foundations/src/tokens.css"), "utf8"))
      .toContain("--rain-link-color: var(--rain-color-action-primary-text);");
  });

  it("keeps standalone labels complete and inline links naturally wrapping with a fine underline", () => {
    const standalone = styles.match(/\.rain-link\[data-variant="standalone"\] \{([^}]+)\}/)?.[1] ?? "";
    const inline = styles.match(/\.rain-link\[data-variant="inline"\] \{([^}]+)\}/)?.[1] ?? "";
    expect(standalone).toContain("height: 26px;");
    expect(standalone).toContain("padding-inline: 6px;");
    expect(standalone).toContain("font-size: 14px;");
    expect(standalone).toContain("line-height: 20px;");
    expect(standalone).toContain("white-space: nowrap;");
    expect(standalone).toContain("text-decoration: none;");
    expect(inline).toContain("display: inline;");
    expect(inline).toContain("font: inherit;");
    expect(inline).toContain("white-space: normal;");
    expect(inline).toContain("text-decoration-line: underline;");
    expect(inline).toContain("text-decoration-thickness: 1px;");
    expect(inline).not.toMatch(/(?:height|padding):/);
  });
});
