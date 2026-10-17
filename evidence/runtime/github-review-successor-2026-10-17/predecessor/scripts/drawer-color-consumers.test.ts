import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { closeoutEvidence } from "./g1-g6-closeout-governance.mjs";
const sealedRoot = existsSync(closeoutEvidence + "source-bindings.json") ? closeoutEvidence + "predecessor" : process.cwd();
import { expect, it } from "vitest";

const modules = import.meta.glob("./drawer-color-consumers.mjs", { eager: true }) as Record<string, any>;
const module = () => { const result = modules["./drawer-color-consumers.mjs"]; expect(result?.verifyDrawerColorConsumers).toBeTypeOf("function"); return result; };
function inputs() {
  const api = module(), baseline = JSON.parse(readFileSync(api.drawerColorBaseline.path, "utf8"));
  const original = JSON.parse(readFileSync(api.drawerOriginalColorLedger.path, "utf8"));
  const sources = Object.fromEntries(api.drawerColorSourcePaths.map((path: string) => [path, readFileSync(join(sealedRoot, path), "utf8")]));
  const before = Object.fromEntries(api.drawerColorSourcePaths.map((path: string) => [path, baseline.sourceFiles[path] ? readFileSync(baseline.sourceFiles[path].snapshot, "utf8") : null]));
  return { api, baseline, original, sources, before };
}
function built() { const data = inputs(); return { ...data, ledger: data.api.buildDrawerColorLedger(data.sources, data.before, data.baseline, data.original) }; }

it("registers every retained paint, three new token uses, one new native paint, and the removed blur", () => {
  const { api, ledger, sources, before, baseline, original } = built();
  expect(ledger.paintChanges.filter((row: any) => row.change === "retained")).toHaveLength(41);
  expect(ledger.paintChanges.filter((row: any) => row.change === "added")).toHaveLength(4);
  expect(ledger.paintChanges.filter((row: any) => row.change === "removed").map((row: any) => row.before.value)).toEqual(["blur(4px)"]);
  expect(() => api.validateDrawerColorLedger(ledger, sources, before, baseline, original)).not.toThrow();
  expect(Object.values(ledger.sourceFiles).filter((row: any) => row.before === null)).toHaveLength(2);
});

it("keeps exact before and after ranges and declaration hashes even when layout shifts lines", () => {
  const { api, ledger, sources, before, baseline, original } = built();
  const changed = structuredClone(ledger); changed.paintChanges[0].after.range[0]++;
  expect(() => api.validateDrawerColorLedger(changed, sources, before, baseline, original)).toThrow(/ledger|inventory|exact/);
  const mismatch = { ...sources, "packages/ui/src/drawer/drawer.css": sources["packages/ui/src/drawer/drawer.css"] + "\n" };
  expect(() => api.validateDrawerColorLedger(ledger, mismatch, before, baseline, original)).toThrow(/ledger|source|exact/);
});

it("does not permit raw paint, unrelated shared paint removal, or arbitrary new token consumers", () => {
  const { api, sources, before, baseline, original } = inputs();
  for (const [path, source] of [
    ["apps/playground/src/docs/components/g6-task-drawer.css", sources["apps/playground/src/docs/components/g6-task-drawer.css"] + " .new { color:red; }"],
    ["apps/playground/src/docs/components/g6-interaction-pages.css", sources["apps/playground/src/docs/components/g6-interaction-pages.css"].replace("color:var(--rain-category-text-brand-1);", "")],
    ["packages/ui/src/drawer/drawer.tsx", sources["packages/ui/src/drawer/drawer.tsx"] + '\nconst injected = "text-rain-category-text-neutral-1";'],
    ["apps/playground/src/docs/components/g6-task-drawer.tsx", sources["apps/playground/src/docs/components/g6-task-drawer.tsx"] + '\nconst raw = <span style={{ color: "red" }} />;'],
    ["apps/playground/src/docs/components/g6-task-drawer.tsx", sources["apps/playground/src/docs/components/g6-task-drawer.tsx"] + '\nconst raw = <span className="text-red-500" />;'],
  ]) expect(() => api.buildDrawerColorLedger({ ...sources, [path]: source }, before, baseline, original)).toThrow(/paint|consumer|finite/);
});

it("retains old classification and refuses reclassification, invented measurements, or contrast acceptance", () => {
  const { api, ledger, sources, before, baseline, original } = built();
  for (const mutate of [
    (copy: any) => { copy.contrastAcceptance = "granted"; },
    (copy: any) => { copy.humanGate = "accepted"; },
    (copy: any) => { copy.measurements[0].actual = 21; },
    (copy: any) => { copy.paintChanges.find((row: any) => row.use)?.use.content && (copy.paintChanges.find((row: any) => row.use).use.content = "decorative"); },
  ]) { const copy = structuredClone(ledger); mutate(copy); expect(() => api.validateDrawerColorLedger(copy, sources, before, baseline, original)).toThrow(); }
});

it("measures both themes against explicit surfaces and keeps non-measured effects pending", () => {
  const { ledger } = built();
  const added = ledger.measurements.filter((row: any) => row.filePath.endsWith("g6-task-drawer.css"));
  expect(added.filter((row: any) => row.property === "color").map((row: any) => [row.theme, row.minimum])).toEqual([["light", 4.5], ["dark", 4.5]]);
  expect(added.filter((row: any) => row.property.startsWith("border")).every((row: any) => row.minimum === 0 && row.actual >= 1 && row.meetsMinimum === null)).toBe(true);
  expect(ledger.pendingPaintObservations.some((row: any) => row.property === "outline" && row.selector === ".g6-task-reading")).toBe(true);
  expect([...ledger.measurements, ...ledger.pendingPaintObservations].every((row: any) => row.acceptedException === false)).toBe(true);
});

it("verifies the sealed original finite ledger independently of the current successor", () => {
  const api = module(), result = api.verifyDrawerColorConsumers(sealedRoot);
  expect(result.registrationStatus).toBe("verified-finite-declarations");
  expect(result.sourceChainStatus).toBe("not-evaluated-by-color-verifier");
  expect(result.contrastAcceptance).toBe("not-granted");
});

it("rejects a forged parent binding rather than treating its ledger hash as advisory", () => {
  const api = module();
  expect(() => api.verifyDrawerColorConsumers(process.cwd(), { scope: "drawer-container-and-task-examples-only", evidenceFiles: { [api.drawerColorLedger]: "0".repeat(64) } })).toThrow(/ledger.*changed/);
});

it("rejects current Drawer paint drift as the old ledger rather than reclassifying it", () => {
  if (sealedRoot === process.cwd()) return;
  expect(() => module().verifyDrawerColorConsumers()).toThrow(/paint|consumer|finite|ledger/);
});
