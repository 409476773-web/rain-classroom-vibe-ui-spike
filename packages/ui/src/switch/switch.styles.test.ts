import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const styles = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), "../styles.css"), "utf8");

describe("Switch styles", () => {
  it("keeps the legacy geometry and maps paint to Rain semantic tokens", () => {
    expect(styles).toContain("--rain-switch-hit-size: var(--rain-space-32);");
    expect(styles).toContain("--rain-switch-track-width: var(--rain-space-28);");
    expect(styles).toContain("--rain-switch-track-checked: var(--rain-color-action-primary);");
    expect(styles).toContain("--rain-switch-track-unchecked: var(--rain-color-switch-track-unchecked);");
    expect(styles).toContain("--rain-switch-shift: 18px;");
    expect(styles).toContain(".rain-switch [data-slot=\"loading-indicator\"]");
    expect(styles).toContain("@media (forced-colors: active)");
    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
    expect(styles).not.toMatch(/#(?:1561f8|0f55df|0e4acb|96a3c1)/i);
  });
});
