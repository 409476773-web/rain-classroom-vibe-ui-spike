// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { buildSemanticArtifacts, validateIconSemantics } from "./generate-icon-semantics.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = JSON.parse(readFileSync(resolve(root, "packages/foundations/src/icons/semantic-rules.json"), "utf8"));

describe("icon semantic generation", () => {
  it("rejects duplicate identity and broken rule asset references", () => {
    const invalid = structuredClone(source);
    invalid.assets.push(invalid.assets[0]);
    invalid.rules[0].assetId = "icon/missing";
    expect(validateIconSemantics(invalid)).toEqual(expect.arrayContaining([
      expect.stringContaining("duplicate asset"), expect.stringContaining("unknown asset"),
    ]));
  });

  it("rejects overlapping matches at the same priority before generation", () => {
    const invalid = structuredClone(source);
    invalid.rules.push({ ...invalid.rules[0], id: "conflicting-edit", assetId: "icon/delete" });
    expect(validateIconSemantics(invalid)).toEqual(expect.arrayContaining([
      expect.stringContaining("same-priority conflict"),
    ]));
  });

  it("rejects unauditable alternatives and the corrected typo as a lookup keyword", () => {
    const invalid = structuredClone(source);
    invalid.alternatives[0].ruleIds = ["missing-rule"];
    invalid.rules.find((rule: { id: string }) => rule.id === "information").keywords.push("普通题型");
    expect(validateIconSemantics(invalid)).toEqual(expect.arrayContaining([
      expect.stringContaining("unknown alternative rule"), expect.stringContaining("corrected source text"),
    ]));
  });

  it("generates deterministic TS data and AI guidance from the same source", () => {
    const changed = structuredClone(source);
    changed.rules[0].useWhen = "测试专用的来源说明更新";
    changed.rules[0].keywords.push("测试查询词");
    const output = buildSemanticArtifacts(changed);
    expect(output.typescript).toContain(changed.rules[0].useWhen);
    expect(output.markdown).toContain(changed.rules[0].useWhen);
    expect(output.markdown).toContain("测试查询词");
    expect(output.markdown).toContain("@rain-next/ui/icons/edit-pencil");
    expect(output).toEqual(buildSemanticArtifacts(changed));
  });

  it("derives the discussion asset heading from the registered identities", () => {
    const changed = structuredClone(source);
    changed.assets.push({ ...changed.assets[0], assetId: "icon/test-entry", name: "icon/test-entry", slug: "test-entry", exportName: "TestEntryIcon", importPath: "@rain-next/ui/icons/test-entry", source: { ...changed.assets[0].source, nodeId: "9999:1", componentKey: "f".repeat(40) } });
    expect(buildSemanticArtifacts(changed).markdown).toContain(`## ${changed.assets.length} 项讨论资产的身份与引用`);
  });
});
