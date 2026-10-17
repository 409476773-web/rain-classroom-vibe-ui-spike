import { describe, expect, it } from "vitest";
import { compareFileSets, inspectConsumerGraph, inspectPageIconSources, verifySingleIconBundle } from "./verify-icons.mjs";

describe("icon integrity checks", () => {
  it("rejects invalid names before writing a public import consumer", async () => {
    await expect(verifySingleIconBundle(undefined, '../not-an-icon')).rejects.toThrow("invalid icon slug");
  });
  it("reports missing and stray generated files independently", () => {
    expect(compareFileSets(["icons/edit.tsx", "icons/stray.tsx"], ["icons/edit.tsx", "icons/info.tsx"]))
      .toEqual(["missing: icons/info.tsx", "unexpected: icons/stray.tsx"]);
  });
  it("accepts one real static entry and rejects a full catalog in its production graph", () => {
    const entry = "/repo/packages/ui/src/icons/edit-pencil.tsx";
    expect(inspectConsumerGraph([entry, "/repo/packages/ui/src/icon/icon.tsx"], "edit-pencil")).toEqual([]);
    expect(inspectConsumerGraph([entry, "/repo/packages/ui/src/icons/catalog.generated.ts"], "edit-pencil")).toContain("consumer includes full icon catalog");
    expect(inspectConsumerGraph([entry, "/repo/packages/ui/src/icons/search.tsx"], "edit-pencil")).toContain("unexpected icon module: search");
    expect(inspectConsumerGraph([], "edit-pencil")).toContain("requested icon entry was not built");
  });
  it("rejects locally drawn SVG and retired private fixtures in the migrated pages", () => {
    expect(inspectPageIconSources('const icon = <svg><path d="M0 0" /></svg>')).toContain("page contains inline SVG");
    expect(inspectPageIconSources('import { EditIcon } from "./text-button-icons"')).toContain("page consumes retired private icons");
    expect(inspectPageIconSources('import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";')).toEqual([]);
  });
});
