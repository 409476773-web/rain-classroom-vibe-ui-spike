import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { render, screen } from "@testing-library/react";
import { createElement } from "react";
import { describe, expect, it } from "vitest";

import { DensityProvider, densityMetrics, useDensity } from "./density";

const sourceDirectory = dirname(fileURLToPath(import.meta.url));

function readSource(fileName: string) {
  const filePath = join(sourceDirectory, fileName);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
}

const typographySource = readSource("typography.css");
const tokensSource = readSource("tokens.css");
const focusSource = readSource("focus.css");
const motionSource = readSource("motion.css");
const lockedDensityMetrics = {
  compact: {
    controlHeight: "30px",
    controlPaddingInline: "10px",
    itemGap: "6px",
  },
  default: {
    controlHeight: "36px",
    controlPaddingInline: "14px",
    itemGap: "10px",
  },
} as const;

describe("typography roles", () => {
  it.each(["ui", "reading", "data"] as const)(
    "declares the %s font role and a consumable class",
    (role) => {
      expect(typographySource).toContain(`--rain-font-${role}:`);
      expect(typographySource).toContain(`.rain-type-${role}`);
    },
  );

  it("uses the installed LINE Seed family name with weight separated from family", () => {
    expect(typographySource).toContain(
      '--rain-font-data: "LINE Seed JP App_OTF",',
    );
    expect(typographySource).not.toContain('"LINE Seed JP App_OTF Bold"');
    expect(typographySource).toContain("--rain-font-weight-bold: 700;");
    expect(typographySource).toMatch(
      /\.rain-type-data\s*\{[^}]*font-weight:\s*var\(--rain-font-weight-bold\);/s,
    );
  });
});

describe("density context", () => {
  it("keeps the Compact and Default metric contract independently locked", () => {
    expect(densityMetrics).toEqual(lockedDensityMetrics);
  });

  it("exposes the Default metrics at :root for consumers outside a provider", () => {
    const rootRules = [...tokensSource.matchAll(/(?:^|\n):root\s*\{([\s\S]*?)\n\}/g)]
      .map((match) => match[1]).join("\n");
    const variables = Object.fromEntries([...rootRules.matchAll(/(--rain-[a-z0-9-]+):\s*([^;]+);/g)]
      .map((match) => [match[1], match[2]]));
    const expectedVariables = {
      "--rain-density-control-height": lockedDensityMetrics.default.controlHeight,
      "--rain-density-control-padding-inline":
        lockedDensityMetrics.default.controlPaddingInline,
      "--rain-density-item-gap": lockedDensityMetrics.default.itemGap,
    };

    for (const [name, value] of Object.entries(expectedVariables)) {
      const reference = variables[name]?.match(/^var\((--rain-space-\d+)\)$/)?.[1];
      expect(reference ? variables[reference] : variables[name]).toBe(value);
    }
  });

  it("defaults to the Default density when no provider is present", () => {
    function Probe() {
      return createElement("output", null, useDensity());
    }

    render(createElement(Probe));
    expect(screen.getByText("default")).toBeInTheDocument();
  });

  it.each(["compact", "default"] as const)(
    "provides and tracks the %s density through the parent context",
    (density) => {
      function Probe() {
        return createElement("output", null, useDensity());
      }

      render(
        createElement(
          DensityProvider,
          { density },
          createElement(Probe),
        ),
      );

      const probe = screen.getByText(density);
      expect(probe).toBeInTheDocument();
      expect(probe.parentElement).toHaveAttribute("data-density", density);
      expect(probe.parentElement).toHaveAttribute(
        "data-rain-id",
        "foundation-density-context",
      );
      const context = probe.parentElement as HTMLElement;
      expect(
        context.style.getPropertyValue("--rain-density-control-height"),
      ).toBe(lockedDensityMetrics[density].controlHeight);
      expect(
        context.style.getPropertyValue(
          "--rain-density-control-padding-inline",
        ),
      ).toBe(lockedDensityMetrics[density].controlPaddingInline);
      expect(
        context.style.getPropertyValue("--rain-density-item-gap"),
      ).toBe(lockedDensityMetrics[density].itemGap);
    },
  );

  it("lets a nested context override and then restore its parent density", () => {
    function Probe({ label }: { label: string }) {
      return createElement(
        "output",
        { "aria-label": label },
        useDensity(),
      );
    }

    render(
      createElement(
        DensityProvider,
        { density: "default" },
        createElement(Probe, { label: "parent-before" }),
        createElement(
          DensityProvider,
          { density: "compact" },
          createElement(Probe, { label: "nested" }),
        ),
        createElement(Probe, { label: "parent-after" }),
      ),
    );

    expect(screen.getByLabelText("parent-before")).toHaveTextContent("default");
    expect(screen.getByLabelText("nested")).toHaveTextContent("compact");
    expect(screen.getByLabelText("parent-after")).toHaveTextContent("default");
  });
});

describe("focus and motion contracts", () => {
  it.each(["control", "item", "danger"] as const)(
    "declares a visible %s focus semantic",
    (role) => {
      expect(focusSource).toContain(`--rain-focus-${role}:`);
      expect(focusSource).toMatch(
        new RegExp(`\\[data-focus="${role}"\\][^}]*:focus-visible`),
      );
    },
  );

  it("shares a 1px close ring while retaining the system high-contrast outline", () => {
    expect(focusSource).toContain("--rain-focus-width: 1px;");
    expect(focusSource).toContain("--rain-focus-offset: 0px;");
    expect(focusSource.split("@media (forced-colors")[0]).not.toMatch(/outline:\s*[0-9]+px/);
    expect(focusSource).toContain("outline: 2px solid CanvasText;");
    expect(focusSource.match(/outline-offset:\s*var\(--rain-focus-offset\)/g)).toHaveLength(3);
  });

  it("provides the existing translucent Brand token for the shared halo", () => {
    expect(focusSource).toContain("--rain-focus-control-halo: var(--rain-category-fill-brand-alpha-3);");
    expect(focusSource).toContain("box-shadow: 0 0 0 3px var(--rain-focus-control-halo);");
  });

  it("reduces non-essential motion when the user requests it", () => {
    expect(motionSource).toContain("@media (prefers-reduced-motion: reduce)");
    expect(motionSource).toContain("--rain-motion-feedback-duration: 0ms");
    expect(motionSource).toContain("--rain-motion-overlay-duration: 0ms");
    expect(motionSource).toContain("--rain-motion-region-duration: 0ms");
  });

  it("keeps region motion finite and directional in the normal state", () => {
    const regionRule =
      motionSource.match(/\[data-motion="region"\]\s*\{([^}]*)\}/s)?.[1] ??
      "";

    expect(regionRule).toContain("animation-iteration-count: 1");
    expect(regionRule).toContain("animation-direction: normal");
    expect(regionRule).not.toMatch(/\binfinite\b/);
    expect(regionRule).not.toMatch(/\balternate\b/);
  });

  it("gives feedback, overlay and region distinct runnable normal-state motion", () => {
    const feedbackRule =
      motionSource.match(/\[data-motion="feedback"\]\s*\{([^}]*)\}/s)?.[1] ??
      "";
    const overlayRule =
      motionSource.match(/\[data-motion="overlay"\]\s*\{([^}]*)\}/s)?.[1] ??
      "";
    const regionRule =
      motionSource.match(/\[data-motion="region"\]\s*\{([^}]*)\}/s)?.[1] ??
      "";

    expect(feedbackRule).toContain(
      "transition-duration: var(--rain-motion-feedback-duration)",
    );
    expect(overlayRule).toContain("animation-name: rain-overlay-transition");
    expect(overlayRule).toContain(
      "animation-duration: var(--rain-motion-overlay-duration)",
    );
    expect(overlayRule).toContain("animation-iteration-count: 1");
    expect(regionRule).toContain(
      "animation-duration: var(--rain-motion-region-duration)",
    );
  });
});
