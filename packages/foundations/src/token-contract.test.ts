import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  semanticColorCategoryIds,
  radiusTokens,
  semanticColorAliases,
  semanticColorRoleAliases,
  semanticColorTokens,
  shadowTokens,
} from "./token-contract";
import { colorTokenOutputs, validateColorUse } from "./color-registry";

const sourceDirectory = dirname(fileURLToPath(import.meta.url));

function readSource(fileName: string) {
  const filePath = join(sourceDirectory, fileName);
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
}

function namesForPrefix(tokens: Record<string, string>, prefix: string) {
  return Object.keys(tokens)
    .filter((name) => name.startsWith(`${prefix}-`))
    .sort();
}

function normalizeTokenValue(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\(\s+/g, "(")
    .replace(/\s+\)/g, ")");
}

function cssTokenValues(namespace: "color" | "radius" | "shadow") {
  return Object.fromEntries(
    [...cssSource.matchAll(
      new RegExp(`--rain-${namespace}-([a-z0-9-]+)\\s*:\\s*([^;]+);`, "g"),
    )].flatMap((match) => {
      const name = match[1];
      const value = match[2];
      return name && value ? [[name, normalizeTokenValue(value)]] : [];
    }),
  );
}

function cssReferenceValues() {
  return Object.fromEntries(
    [...cssSource.matchAll(/--rain-ref-([a-z0-9-]+)\s*:\s*([^;]+);/g)].flatMap(
      (match) => {
        const name = match[1];
        const value = match[2];
        return name && value ? [[name, normalizeTokenValue(value)]] : [];
      },
    ),
  );
}

function resolveReferenceVariables(
  value: string,
  references: Record<string, string>,
) {
  return normalizeTokenValue(
    value.replace(/var\((--rain-(?:ref|category)-[a-z0-9-]+)\)/g, (_, name: string) => {
      const resolved = references[name];
      if (!resolved) throw new Error(`Unknown reference color ${name}`);
      return resolved;
    }),
  );
}

function normalizeColorCss(value: string) {
  return normalizeTokenValue(value.replace(/#([0-9a-f]{6})/gi, (_, hex: string) =>
    `rgb(${hex.match(/../g)!.map((channel) => Number.parseInt(channel, 16)).join(" ")})`));
}

function contrastRatio(foreground: string, background: string) {
  function luminance(hex: string) {
    const channels = hex
      .slice(1)
      .match(/.{2}/g)
      ?.map((channel) => Number.parseInt(channel, 16) / 255) ?? [];
    const linear = channels.map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
    return (
      0.2126 * (linear[0] ?? 0) +
      0.7152 * (linear[1] ?? 0) +
      0.0722 * (linear[2] ?? 0)
    );
  }

  const values = [luminance(foreground), luminance(background)].sort(
    (left, right) => right - left,
  );
  return ((values[0] ?? 0) + 0.05) / ((values[1] ?? 0) + 0.05);
}

const cssSource = readSource("tokens.css");

describe("token-contract", () => {
  it("defines a deliberately small 30–45 role semantic color contract", () => {
    expect(
      Object.keys(semanticColorTokens).length,
      "semantic color roles are not defined",
    ).toBeGreaterThanOrEqual(30);
    expect(Object.keys(semanticColorTokens).length).toBeLessThanOrEqual(45);
    expect(Object.keys(semanticColorTokens)).toHaveLength(42);
    expect(semanticColorTokens["brand-primary"]).toBe("#1561F8");
  });

  it("uses the user-selected Neutral levels and real Alpha weak surfaces", () => {
    expect(semanticColorTokens["text-secondary"]).toBe("#495D87");
    expect(semanticColorTokens["text-muted"]).toBe("#56688F");
    expect(semanticColorTokens["text-placeholder"]).toBe("#7485A8");
    expect(semanticColorTokens["text-disabled"]).toBe("#A0ACC5");
    expect(semanticColorTokens["surface-page"]).toBe("#F2F4FF");
    expect(semanticColorTokens["action-disabled"]).toBe("#D7DEF5");
    expect(semanticColorTokens["border-default"]).toBe("rgb(16 63 183 / 16%)");
    expect(semanticColorTokens["border-subtle"]).toBe("rgb(16 63 183 / 16%)");
    expect(semanticColorTokens["border-strong"]).toBe("rgb(16 63 183 / 25%)");
    for (const state of ["success", "warning", "error", "info"] as const) {
      expect(semanticColorTokens[`semantic-${state}-surface`]).toContain("/ 10%)");
    }
  });

  it.each([
    ["text", ["text-primary", "text-secondary", "text-muted", "text-placeholder", "text-inverse", "text-link"]],
    ["surface", ["surface-page", "surface-panel", "surface-raised", "surface-overlay"]],
    ["border", ["border-default", "border-subtle", "border-strong"]],
    ["action", ["action-primary", "action-primary-hover", "action-primary-pressed", "action-secondary", "action-ghost", "action-danger"]],
    ["selection", ["selection-item", "selection-item-hover", "selection-text"]],
    ["focus", ["focus-control", "focus-item", "focus-danger"]],
    ["semantic", ["semantic-success", "semantic-warning", "semantic-error", "semantic-info"]],
    ["intelligence", ["intelligence-foreground", "intelligence-surface", "intelligence-gradient"]],
  ] as const)("provides the minimum %s roles", (category, requiredRoles) => {
    expect(
      namesForPrefix(semanticColorTokens as Record<string, string>, category),
      `${category} roles are incomplete`,
    ).toEqual(expect.arrayContaining([...requiredRoles]));
  });

  it("only exposes the locked radius and elevation-shadow scales", () => {
    expect(Object.keys(radiusTokens)).toEqual(["4", "6", "8", "10", "12", "16", "full"]);
    expect(Object.keys(shadowTokens)).toEqual(["none", "overlay", "dialog"]);
  });

  it("keeps the intelligence gradient out of ordinary primary action", () => {
    expect(semanticColorTokens["intelligence-gradient"]).toBeDefined();
    expect(semanticColorTokens["action-primary"]).toBeDefined();
    expect(semanticColorTokens["action-primary"]).not.toBe(
      semanticColorTokens["intelligence-gradient"],
    );
    expect(semanticColorTokens["action-primary"]).not.toContain(
      "intelligence-gradient",
    );
  });

  it("maps confirmed roles to Category references and keeps other legacy sources explicit", () => {
    const references = cssReferenceValues();
    const rawSemanticValues = cssTokenValues("color");
    const aliases: Record<string, string> = { ...semanticColorAliases, ...semanticColorRoleAliases };

    expect(Object.keys(references).length).toBeGreaterThanOrEqual(20);
    for (const [name, value] of Object.entries(rawSemanticValues)) {
      if (value === "transparent") continue;
      const alias = aliases[`--rain-color-${name}`];
      if (alias) {
        expect(value).toBe(alias);
        continue;
      }
      expect(
        value,
        `${name} bypasses the internal reference palette`,
      ).toContain("var(--rain-ref-");
    }

    const referenceColors = new Set(Object.values(references));
    for (const [name, value] of Object.entries(semanticColorTokens)) {
      if (semanticColorAliases[`--rain-color-${name}`]) continue;
      for (const color of value.match(/#[0-9A-F]{6}/gi) ?? []) {
        expect(
          referenceColors,
          `${name} uses a color outside the reference palette`,
        ).toContain(color.toUpperCase());
      }
    }
  });

  it("keeps meaningful text roles readable across their allowed surfaces", () => {
    const broadTextRoles = [
      "text-primary",
      "text-secondary",
      "text-muted",
      "text-link",
    ] as const;
    const broadSurfaces = [
      "surface-panel",
      "surface-raised",
      "surface-page",
      "surface-subtle",
    ] as const;

    for (const textRole of broadTextRoles) {
      for (const surfaceRole of broadSurfaces) {
        expect(
          contrastRatio(
            semanticColorTokens[textRole],
            semanticColorTokens[surfaceRole],
          ),
          `${textRole} is not readable on ${surfaceRole}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    }

    expect(
      contrastRatio(
        semanticColorTokens["text-inverse"],
        semanticColorTokens["action-primary"],
      ),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps the selected placeholder contrast limitation open without weakening eligibility", () => {
    expect(contrastRatio(semanticColorTokens["text-placeholder"], semanticColorTokens["surface-panel"]))
      .toBeCloseTo(3.708, 3);
    expect(() => validateColorUse({
      tokenId: "Text/Neutral/5", role: "text", property: "color", context: "page",
      content: "text", parentSurfaceId: "Background/Neutral/1",
    })).toThrow(/Insufficient contrast/);
  });

  it("uses the shared Brand border source for every keyboard focus semantic", () => {
    for (const role of ["focus-control", "focus-item", "focus-danger"] as const) {
      expect(semanticColorTokens[role]).toBe("#3D7BFF");
      expect(semanticColorCategoryIds[role]).toBe("Border/Brand/1");
    }
  });

  it("exports the same names and values from TypeScript and CSS", () => {
    const references = {
      ...Object.fromEntries(Object.entries(cssReferenceValues()).map(([name, value]) => [`--rain-ref-${name}`, value])),
      ...Object.fromEntries(colorTokenOutputs.map((output) => [output.variable, output.value])),
    };
    const resolvedCssColors = Object.fromEntries(
      Object.entries(cssTokenValues("color")).map(([name, value]) => [
        name,
        normalizeColorCss(resolveReferenceVariables(value, references)),
      ]),
    );
    expect(resolvedCssColors, "CSS semantic colors drifted from TS").toEqual(
      { ...Object.fromEntries(
        Object.entries(semanticColorTokens).map(([name, value]) => [
          name,
          normalizeColorCss(value),
        ]),
      ), "action-primary-text": "rgb(15 85 223)" },
    );
    expect(cssTokenValues("radius"), "CSS radii drifted from TS").toEqual(
      radiusTokens,
    );
    expect(cssTokenValues("shadow"), "CSS shadows drifted from TS").toEqual(
      shadowTokens,
    );
  });
});
