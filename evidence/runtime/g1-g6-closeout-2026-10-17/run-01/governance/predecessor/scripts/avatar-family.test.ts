import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
import { avatarFamilyFiles, hasAvatarFamilyAuthorization, parseYamlSubset } from "./verification-helpers.mjs";
import { getAvatarColorConsumers, prepareAvatarSource } from "./avatar-family.mjs";
import { getTokenFoundationOutputs } from "./token-foundation-outputs.mjs";
import { validateRegisteredRecipeColors } from "./verify-token-foundations.mjs";

const phase = parseYamlSubset(readFileSync("status/current-phase.yaml", "utf8")) as { componentRefinements: { avatarFamily: Record<string, any> } };
it("registers actual assets and keeps Avatar authorization separate from acceptance", () => {
  expect(hasAvatarFamilyAuthorization(phase)).toBe(true);
  const awaiting = structuredClone(phase);
  awaiting.componentRefinements.avatarFamily.humanGate = "awaiting_human";
  delete awaiting.componentRefinements.avatarFamily.humanGateDecision;
  expect(hasAvatarFamilyAuthorization(awaiting)).toBe(true);
  awaiting.componentRefinements.avatarFamily.humanGate = "accepted";
  expect(hasAvatarFamilyAuthorization(awaiting)).toBe(false);
  for (const patch of [{ contrastAcceptance: "accepted" }, { publication: "authorized" }, { automatedVerification: "failed" },
    { humanGateDecision: { ...phase.componentRefinements.avatarFamily.humanGateDecision, scope: "all-components" } }]) {
    const changed = structuredClone(phase);
    Object.assign(changed.componentRefinements.avatarFamily, patch);
    expect(hasAvatarFamilyAuthorization(changed)).toBe(false);
  }
  const report = JSON.parse(readFileSync("evidence/runtime/avatar/source-assets.json", "utf8"));
  expect(report.entries).toHaveLength(51);
  for (const entry of report.entries) {
    expect(createHash("sha256").update(readFileSync(entry.targetPath)).digest("hex")).toBe(entry.currentSource.sha256);
    expect(avatarFamilyFiles.ui).toContain(entry.targetPath);
  }
});

it("audits every Avatar paint and rejects local geometry used as an unregistered color", () => {
  const outputs = getTokenFoundationOutputs();
  outputs.colorCssConsumers.push(...getAvatarColorConsumers());
  const paths = [...new Set(getAvatarColorConsumers().map(entry => entry.filePath))];
  const pending: any[] = [];
  for (const filePath of paths) {
    const source = readFileSync(filePath, "utf8");
    expect(validateRegisteredRecipeColors({ filePath, source, outputs, pendingContrastFindings: pending })).toEqual([]);
    expect(validateRegisteredRecipeColors({ filePath, source: source + "\n.rain-avatar { color: #fff; }", outputs }).length).toBeGreaterThan(0);
  }
  const statusPath = "packages/ui/src/status-indicator/status-indicator.css";
  const alteredMask = readFileSync(statusPath, "utf8").replace("background: var(--rain-overlay-focus);", "background: rgb(from var(--rain-overlay-focus) r g b / 15%);");
  const maskFailures: string[] = [];
  prepareAvatarSource(statusPath, alteredMask, phase, maskFailures);
  expect(maskFailures).toContain("Avatar activity must reuse the existing semantic focus mask");
  expect(pending).toHaveLength(2);
  expect(pending.every(item => item.acceptedException === false && item.minimum === 3 && item.actual < 3)).toBe(true);
  expect(prepareAvatarSource(paths[0]!, ".rain-avatar { background: var(--rain-local-avatar-size); }", phase)).toContain("--rain-local-avatar-size");
  expect(prepareAvatarSource(paths[0]!, ":root { --rain-local-avatar-size: var(--rain-space-32); }", phase)).toContain("--rain-local-avatar-size");
  for (const patch of [{ use: { content: "decorative", critical: false } }, { parentSurfaces: ["Background/Neutral/1"] }]) {
    const changed = structuredClone(outputs), item = changed.colorCssConsumers.find(entry => entry.filePath === "packages/ui/src/status-indicator/status-indicator.css" && entry.selector === ".rain-status-indicator" && entry.property === "color")!;
    Object.assign(item, patch, patch.use ? { use: { ...item.use, ...patch.use } } : {});
    expect(validateRegisteredRecipeColors({ filePath: item.filePath, source: readFileSync(item.filePath, "utf8"), outputs: changed })).toContain("Avatar colors must retain their exact registered roles and parent surfaces");
  }
});
