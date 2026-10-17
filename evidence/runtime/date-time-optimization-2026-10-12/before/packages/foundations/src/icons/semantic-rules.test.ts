import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

import { getIconUsage, resolveSemanticIcon, type IconSemanticRule } from "./icon-contract";
import { semanticRuleSet, semanticRules } from "./semantic-rules.generated";

describe("Rain icon semantic selection", () => {
  it("retains the original 42 identities and 31 rules around the exact authorized supplement", () => {
    const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
    expect(hash(semanticRuleSet.assets.slice(0, 42))).toBe("5e0ecf8ba4244d5b6f4cbcab50ea494d74d1a5182837bf3818637ef6f3deebc7");
    const filter = semanticRules.find((rule) => rule.id === "filter")!;
    expect(filter.variants).toHaveLength(1);
    expect(filter.variants[0]).toMatchObject({ variant: "filled", assetId: "icon/filter-filled" });
    expect(filter.sourceIds).toEqual(["extended", "confirmation", "paired-controls", "pair-confirmation"]);
    const originalRules = semanticRules.slice(0, 31).map((rule) => rule.id === "filter"
      ? { ...rule, variants: [], sourceIds: rule.sourceIds.slice(0, 2) } : rule);
    expect(hash(originalRules)).toBe("b1d2fff0f84ee3088d3225e1d9e07e03a6150e6a2c1c0734521cd5e508dcd66b");
    expect(semanticRuleSet.assets).toHaveLength(58);
    expect(semanticRules.slice(31).map((rule) => rule.id)).toEqual([
      "favorite-star", "favorite-heart", "thumbs-up", "thumbs-down", "applaud", "pin", "pin-to-top", "panel-expand", "panel-collapse",
    ]);
    expect(semanticRuleSet.metadata.confirmationDate).toBe("2026-09-03");
    expect(semanticRuleSet.metadata.supplementConfirmationDate).toBe("2026-09-07");
    expect(semanticRuleSet.metadata.sources["paired-controls"].url).toBe("https://www.figma.com/design/olqwu95QD6n4Y3IAwUdgF4?node-id=2244-285");
    for (const rule of semanticRules.slice(31)) expect(rule.sourceIds).toEqual(["paired-controls", "pair-confirmation"]);
  });

  it("uses the confirmed edit default and keeps explicit filled selection", () => {
    expect(resolveSemanticIcon({ intent: "edit" })).toMatchObject({
      status: "selected", assetId: "icon/edit-pencil", basis: "default",
    });
    expect(resolveSemanticIcon({ intent: "edit", explicitVariant: "filled" })).toMatchObject({
      status: "selected", assetId: "icon/edit-pencil-filled", basis: "explicit",
    });
  });

  it("requires the actual add behavior instead of deciding from words", () => {
    expect(resolveSemanticIcon({ intent: "add" })).toMatchObject({
      status: "ambiguous", code: "missing-context", missingFields: ["target"],
    });
    expect(resolveSemanticIcon({ intent: "add", target: "object" })).toMatchObject({
      status: "selected", assetId: "icon/add-bold",
    });
    expect(resolveSemanticIcon({ intent: "add", target: "collection" })).toMatchObject({
      status: "selected", assetId: "icon/add-circle-outline",
    });
    expect(resolveSemanticIcon({ intent: "add", target: "value" })).toMatchObject({
      status: "selected", assetId: "icon/add",
    });
    expect(resolveSemanticIcon({ intent: "添加课程" })).toMatchObject({ status: "unknown" });
  });

  it("chooses scene-specific disclosure before the general rule", () => {
    expect(resolveSemanticIcon({ intent: "expand" })).toMatchObject({
      status: "selected", assetId: "icon/arrow-down", basis: "default",
    });
    expect(resolveSemanticIcon({ intent: "expand", context: "text-button-with-action-label" })).toMatchObject({
      status: "selected", assetId: "icon/double-arrow-down", basis: "scene",
    });
  });

  it.each([
    [{ intent: "favorite", target: "star" }, "icon/rating-star", "icon/rating-star-100"],
    [{ intent: "favorite", target: "heart" }, "icon/favorite", "icon/favorite-filled"],
    [{ intent: "thumbs-up" }, "icon/like", "icon/like-filled"],
    [{ intent: "thumbs-down" }, "icon/dislike", "icon/dislike-filled"],
    [{ intent: "applaud" }, "icon/like-alt-2", "icon/like-alt"],
    [{ intent: "pin" }, "icon/pin", "icon/pin-top-alt"],
    [{ intent: "filter" }, "icon/filter", "icon/filter-filled"],
  ] as const)("uses the confirmed pair for %j without inferring business state", (request, assetId, filledAssetId) => {
    expect(resolveSemanticIcon(request)).toMatchObject({ status: "selected", assetId });
    expect(resolveSemanticIcon({ ...request, explicitVariant: "filled" })).toMatchObject({ status: "selected", assetId: filledAssetId, basis: "explicit" });
    const hostStateRequest = { ...request, state: "selected" };
    expect(resolveSemanticIcon(hostStateRequest)).toMatchObject({ assetId });
  });

  it("requires the intended kind of favorite or like before choosing a glyph", () => {
    expect(resolveSemanticIcon({ intent: "favorite" })).toMatchObject({ status: "ambiguous", code: "missing-context", missingFields: ["target"] });
    expect(resolveSemanticIcon({ intent: "like" })).toMatchObject({ status: "ambiguous", code: "missing-context", missingFields: ["context"] });
    for (const [context, assetId] of [["heart", "icon/favorite"], ["thumbs-up", "icon/like"], ["applause", "icon/like-alt-2"]]) {
      expect(resolveSemanticIcon({ intent: "like", context })).toMatchObject({ status: "selected", assetId });
    }
  });

  it("keeps the single top action separate from the pin pair", () => {
    expect(resolveSemanticIcon({ intent: "pin-to-top" })).toMatchObject({ status: "selected", assetId: "icon/pin-top-alt-2" });
    expect(resolveSemanticIcon({ intent: "pin-to-top", explicitVariant: "filled" })).toMatchObject({ status: "unknown", code: "unsupported-variant" });
    expect(resolveSemanticIcon({ intent: "unpin" })).toMatchObject({ status: "unknown" });
  });

  it("uses the panel disclosure pair only for sidebar and directory contexts", () => {
    for (const context of ["sidebar", "directory-panel"]) {
      expect(resolveSemanticIcon({ intent: "expand", context })).toMatchObject({ assetId: "icon/expand", basis: "scene" });
      expect(resolveSemanticIcon({ intent: "collapse", context })).toMatchObject({ assetId: "icon/collapse", basis: "scene" });
    }
    expect(resolveSemanticIcon({ intent: "expand" })).toMatchObject({ assetId: "icon/arrow-down" });
    expect(resolveSemanticIcon({ intent: "collapse" })).toMatchObject({ assetId: "icon/arrow-up" });
    expect(resolveSemanticIcon({ intent: "expand", context: "text-button-with-action-label" })).toMatchObject({ assetId: "icon/double-arrow-down" });
    expect(resolveSemanticIcon({ intent: "collapse", context: "text-button-with-action-label" })).toMatchObject({ assetId: "icon/double-arrow-up" });
    expect(resolveSemanticIcon({ intent: "expand", context: "sidebar", target: "fullscreen" })).toMatchObject({ status: "unknown" });
  });

  it("keeps clear and failure colors separate even when they share a glyph", () => {
    expect(resolveSemanticIcon({ intent: "clear", context: "input" })).toMatchObject({
      status: "selected", assetId: "icon/circle-close", colorMode: "host", hostRole: "control", statusRole: null,
    });
    expect(resolveSemanticIcon({ intent: "error" })).toMatchObject({
      status: "selected", assetId: "icon/circle-close", colorMode: "host", hostRole: "status", statusRole: "error",
    });
  });

  it("reports known but unavailable assets without a substitute", () => {
    expect(resolveSemanticIcon({ intent: "edit" }, { availableAssets: [] })).toMatchObject({
      status: "unavailable", assetId: "icon/edit-pencil",
    });
    expect(resolveSemanticIcon({ explicitAssetId: "icon/not-in-library" })).toMatchObject({
      status: "unknown", code: "unknown-asset",
    });
  });

  it.each([
    [{ intent: "collapse" }, "icon/arrow-up"],
    [{ intent: "collapse", context: "text-button-with-action-label" }, "icon/double-arrow-up"],
    [{ intent: "delete" }, "icon/delete"],
    [{ intent: "remove", target: "collection" }, "icon/minus-circle-outline"],
    [{ intent: "remove", target: "value" }, "icon/minus"],
    [{ intent: "search" }, "icon/search"],
    [{ intent: "filter" }, "icon/filter"],
    [{ intent: "settings" }, "icon/settings-3"],
    [{ intent: "more-actions" }, "icon/more-horizontal"],
    [{ intent: "close" }, "icon/close"],
    [{ intent: "clear", context: "select" }, "icon/circle-close"],
    [{ intent: "select", context: "menu" }, "icon/check-bold"],
    [{ intent: "select", context: "list" }, "icon/check-bold"],
    [{ intent: "success" }, "icon/circle-check"],
    [{ intent: "correct" }, "icon/circle-check"],
    [{ intent: "completed" }, "icon/circle-check"],
    [{ intent: "warning" }, "icon/alert-circle"],
    [{ intent: "info" }, "icon/info"],
    [{ intent: "help" }, "icon/help"],
    [{ intent: "refresh" }, "icon/refresh"],
    [{ intent: "retry" }, "icon/refresh"],
    [{ intent: "reload" }, "icon/refresh"],
    [{ intent: "restore", target: "defaults" }, "icon/refresh"],
    [{ intent: "restore", target: "initial-values" }, "icon/refresh"],
    [{ intent: "publish" }, "icon/publish"],
    [{ intent: "send" }, "icon/publish"],
    [{ intent: "published" }, "icon/published"],
    [{ intent: "navigate", context: "button", target: "page" }, "icon/share-alt"],
    [{ intent: "loading" }, "icon/button-loading"],
  ] as const)("preserves the confirmed behavior of %j", (request, assetId) => {
    expect(resolveSemanticIcon(request)).toMatchObject({ status: "selected", assetId });
  });

  it("preserves bold defaults and component-owned selection shapes", () => {
    for (const state of ["primary", "hover", "pressed", "disabled", "selected"]) {
      const request = { intent: "edit", state };
      expect(resolveSemanticIcon(request)).toMatchObject({ assetId: "icon/edit-pencil" });
    }
    expect(resolveSemanticIcon({ intent: "create", explicitVariant: "filled" })).toMatchObject({ status: "unknown", code: "unsupported-variant" });
    for (const context of ["checkbox", "radio"]) expect(resolveSemanticIcon({ intent: "select", context })).toMatchObject({ status: "unknown", code: "component-owned" });
  });

  it("uses explicit asset and triangle requests before scenario defaults", () => {
    expect(resolveSemanticIcon({ intent: "expand", context: "text-button-with-action-label", explicitVariant: "solid-triangle" })).toMatchObject({ assetId: "icon/chevron-down", basis: "explicit" });
    expect(resolveSemanticIcon({ intent: "close", explicitAssetId: "icon/close-bold" })).toMatchObject({ assetId: "icon/close-bold", basis: "explicit" });
  });

  it("only accepts a traceable and applicable confirmed component alternative", () => {
    const request = { intent: "more-actions", component: "confirmed-menu", confirmedComponentSpec: { assetId: "icon/more-vertical", component: "confirmed-menu", confirmed: true, source: "approved-component-decision:menu-1" } };
    expect(resolveSemanticIcon(request)).toMatchObject({ status: "selected", basis: "component-spec", assetId: "icon/more-vertical", decisionSource: request.confirmedComponentSpec.source });
    expect(resolveSemanticIcon({ ...request, explicitAssetId: "icon/more-horizontal" })).toMatchObject({ basis: "explicit", assetId: "icon/more-horizontal" });
    for (const spec of [{ ...request.confirmedComponentSpec, confirmed: false }, { ...request.confirmedComponentSpec, source: " " }, { ...request.confirmedComponentSpec, component: "different-component" }, { ...request.confirmedComponentSpec, assetId: "icon/delete" }]) {
      expect(resolveSemanticIcon({ ...request, confirmedComponentSpec: spec })).toMatchObject({ status: "unknown", code: "invalid-component-spec" });
    }
  });

  it("does not infer defaults for historical names or unconfirmed behavior", () => {
    for (const request of [{ intent: "share" }, { intent: "forward" }, { intent: "sent" }, { intent: "undo" }, { intent: "restore", target: "deleted-content" }, { intent: "普通题型" }, { intent: "navigate", context: "button", target: "anchor" }]) {
      expect(resolveSemanticIcon(request)).toMatchObject({ status: "unknown" });
    }
    expect(resolveSemanticIcon({ intent: "navigate" })).toMatchObject({ status: "ambiguous", missingFields: ["target", "context"] });
    expect(resolveSemanticIcon({ intent: "select" })).toMatchObject({ status: "ambiguous", missingFields: ["context"] });
  });

  it("does not confuse full screen expansion with content disclosure", () => {
    expect(resolveSemanticIcon({ intent: "expand", target: "fullscreen" })).toMatchObject({ status: "unknown" });
  });

  it("diagnoses same-priority conflicts regardless of source order", () => {
    const original = semanticRules.find((rule) => rule.id === "edit")!;
    const duplicate: IconSemanticRule = { ...original, id: "conflicting-edit", assetId: "icon/delete" };
    for (const rules of [[original, duplicate], [duplicate, original]]) expect(resolveSemanticIcon({ intent: "edit" }, { rules })).toMatchObject({ status: "ambiguous", code: "conflicting-rules" });
  });

  it("distinguishes unchecked availability, unavailable and an explicit external catalog identity", () => {
    expect(resolveSemanticIcon({ intent: "edit" })).toMatchObject({ availability: "not-checked" });
    expect(resolveSemanticIcon({ intent: "edit" }, { availableAssets: new Set(["icon/edit-pencil"]) })).toMatchObject({ availability: "available" });
    expect(resolveSemanticIcon({ explicitAssetId: "icon/edit-pencil-filled" }, { availableAssets: ["icon/edit-pencil"] })).toMatchObject({ status: "unavailable", assetId: "icon/edit-pencil-filled", basis: "explicit" });
    expect(resolveSemanticIcon({ explicitAssetId: "icon/catalog-only" }, { availableAssets: ["icon/catalog-only"] })).toMatchObject({ status: "selected", colorMode: null, hostRole: null, source: null, exportName: "CatalogOnlyIcon", importPath: "@rain-next/ui/icons/catalog-only" });
    expect(resolveSemanticIcon({ explicitAssetId: "icon/3d-cube" }, { availableAssets: ["icon/3d-cube"] })).toMatchObject({ exportName: "Icon3dCube" });
    expect(resolveSemanticIcon({ explicitAssetId: "../edit-pencil" })).toMatchObject({ status: "unknown", code: "invalid-asset-name" });
  });

  it("exposes multiple uses and conditional variants without inventing unknown defaults", () => {
    expect(getIconUsage("icon/circle-close")).toEqual(expect.arrayContaining([
      expect.objectContaining({ ruleId: "clear-value", selection: "default", hostRole: "control" }),
      expect.objectContaining({ ruleId: "error-result", selection: "default", hostRole: "status", statusRole: "error" }),
    ]));
    expect(getIconUsage("icon/more-vertical")).toEqual([expect.objectContaining({ selection: "conditional-alternative", condition: expect.stringContaining("明确") })]);
    expect(getIconUsage("icon/info-filled")).toEqual([expect.objectContaining({ selection: "explicit-variant" })]);
    expect(getIconUsage("icon/unknown")).toEqual([]);
  });

  it("executes every generated AI example using exactly the same structured rules", () => {
    for (const example of semanticRuleSet.examples) expect(resolveSemanticIcon(example.request), example.label).toMatchObject(example.expected);
  });
});
