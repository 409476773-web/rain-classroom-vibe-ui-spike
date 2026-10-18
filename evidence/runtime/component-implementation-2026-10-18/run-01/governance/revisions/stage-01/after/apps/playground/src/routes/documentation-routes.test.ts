import { describe, expect, it } from "vitest";
import documentationRoutes from "../../../../config/asset-documentation-routes.json";
import { componentDocEntries } from "../docs/components/component-catalog";
import { resolveAppRoute } from "./route-registry";

describe("shared documentation routes", () => {
  it("keeps legacy aliases, dedicated pages and unknown-route fallback", () => {
    expect(resolveAppRoute("#native-select")).toEqual({ view: "select", focusTargetId: "select-title" });
    expect(resolveAppRoute("#icon-sizes")).toEqual({ view: "icon-button", focusTargetId: "icon-sizes-title" });
    expect(resolveAppRoute("#tree")).toEqual({ view: "tree", focusTargetId: "tree-title" });
    expect(resolveAppRoute("#tabs")).toEqual({ view: "tabs", focusTargetId: "tabs-title" });
    expect(resolveAppRoute("#benchmarks")).toEqual({ view: "overview", focusTargetId: "benchmarks-title" });
    expect(resolveAppRoute("#not-a-document")).toEqual({ view: "overview", focusTargetId: "overview-title" });
  });
  it("keeps every lazy document reachable and query navigation on the same document", () => {
    for (const item of componentDocEntries) {
      if (["tree", "manage-tree", "breadcrumb", "alert"].includes(item.id)) continue;
      expect(resolveAppRoute(`#${item.id}`)).toEqual({ view: "component-asset", componentId: item.id, focusTargetId: `${item.id}-title` });
      expect(resolveAppRoute(`#${item.id}?view=overview`)).toEqual(resolveAppRoute(`#${item.id}`));
    }
    expect(new Set(documentationRoutes.routes.map(route => route.href)).size).toBe(documentationRoutes.routes.length);
  });
});
