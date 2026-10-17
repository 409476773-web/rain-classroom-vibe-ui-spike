import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { expect, it } from "vitest";
const sha256 = (source: string) => createHash("sha256").update(source).digest("hex");

const modules = import.meta.glob("./g6-color-consumers.mjs", { eager: true }) as Record<string, any>;
function api() {
  expect(modules["./g6-color-consumers.mjs"]?.verifyG6ColorConsumers).toBeTypeOf("function");
  return modules["./g6-color-consumers.mjs"];
}
function fixture() {
  const module = api(), ledger = module.readG6ColorConsumers();
  const predecessor = "evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/predecessor/";
  const sources = Object.fromEntries(module.g6ColorSourcePaths.map((file: string) => {
    const expected = (module.g6CssSourcePaths.includes(file) ? ledger.sourceFiles : ledger.utilitySourceFiles)[file];
    const source = [predecessor + "evidence/runtime/carousel-upgrade-2026-10-14/before/" + file,
      predecessor + "evidence/runtime/drawer-refinement-2026-10-14/predecessor/" + file, predecessor + file,
      "evidence/runtime/carousel-upgrade-2026-10-14/before/" + file, file].find(candidate => {
      if (!existsSync(candidate)) return false;
      const value = readFileSync(candidate, "utf8");
      const rows = module.g6CssSourcePaths.includes(file) ? module.collectG6CssPaints(file, value) : module.collectG6UtilityPaints(file, value);
      return sha256(JSON.stringify(rows.map(({ range, ...row }: any) => row))) === expected;
    });
    if (!source) throw new Error("G6 color fixture lacks its exact sealed paint source: " + file);
    return [file, readFileSync(source, "utf8")];
  }));
  return { module, ledger, sources };
}

it("registers twelve CSS and eleven runtime inventories while retaining light/dark contrast findings", () => {
  const result = api().verifyG6ColorConsumers();
  expect(Object.keys(result.sourceFiles)).toHaveLength(12);
  expect(Object.keys(result.utilitySourceFiles)).toHaveLength(11);
  expect(result.registrationStatus).toBe("verified-finite-declarations");
  expect(new Set(result.measurements.map((row: any) => row.theme))).toEqual(new Set(["light", "dark"]));
  expect(result.pendingContrastFindings.length).toBeGreaterThan(0);
  expect(result.pendingContrastFindings.every((row: any) => row.actual < row.minimum && row.acceptedException === false)).toBe(true);
  expect(result.humanGate).toBe("awaiting_human");
  expect(result.contrastAcceptance).toBe("not-granted");
});

it("rejects additional or replaced palette utility occurrences and only prepares exact known text", () => {
  const { module, ledger, sources } = fixture();
  const file = "packages/ui/src/message-scroller/message-scroller.tsx";
  expect(() => module.validateG6ColorConsumers(ledger, { ...sources, [file]: sources[file] + '\nconst extra = "text-rain-category-text-neutral-1";\n' })).toThrow(/utility paint inventory/);
  expect(() => module.prepareG6UtilityPaints(file, sources[file].replace("text-rain-category-text-neutral-1", "text-rain-category-text-red-1"))).toThrow(/utility paint changed/);
  expect(module.prepareG6UtilityPaints(file, sources[file])).not.toContain("rain-category-");
  expect(() => module.prepareG6UtilityPaints("packages/ui/src/not-g6/extra.tsx", "")).toThrow(/exact source path/);
});

it("rejects a missing declaration registration rather than silently skipping it", () => {
  const { module, ledger, sources } = fixture();
  ledger.colorCssConsumers.shift();
  expect(() => module.validateG6ColorConsumers(ledger, sources)).toThrow(/paint inventory/);
});

it("rejects a duplicated or extra consumer rather than granting it a surface", () => {
  const { module, ledger, sources } = fixture();
  ledger.colorCssConsumers.push({ ...ledger.colorCssConsumers[0], selector: ".unregistered-host" });
  expect(() => module.validateG6ColorConsumers(ledger, sources)).toThrow(/paint inventory/);
});

it("rejects a hard value and an additional unknown Token declaration", () => {
  const { module, ledger, sources } = fixture();
  const file = "packages/ui/src/bubble/bubble.css";
  expect(() => module.validateG6ColorConsumers(ledger, { ...sources, [file]: sources[file].replace("var(--rain-category-oncolor-1)", "#ffffff") })).toThrow(/paint inventory/);
  expect(() => module.validateG6ColorConsumers(ledger, { ...sources, [file]: sources[file] + "\n.extra { color: var(--rain-category-text-unknown-1); }\n" })).toThrow(/paint inventory/);
});

it("rejects an unknown Token even if a consumer claims to register its changed value", () => {
  const { module, ledger, sources } = fixture();
  const row = ledger.colorCssConsumers[0], previous = row.value;
  row.value = "var(--rain-category-text-unknown-1)";
  row.use.tokenId = "Text/Unknown/1";
  sources[row.filePath] = sources[row.filePath].replace(previous, row.value);
  expect(() => module.validateG6ColorConsumers(ledger, sources)).toThrow(/Token is missing/);
});

it("keeps measured foreground and essential-boundary thresholds and all unproved effects explicit", () => {
  const result = api().verifyG6ColorConsumers();
  expect(result.measurements.filter((row: any) => row.content === "text").every((row: any) => row.minimum === 4.5)).toBe(true);
  expect(result.measurements.filter((row: any) => row.content === "essential-boundary").every((row: any) => row.minimum === 3)).toBe(true);
  expect(result.pendingPaintObservations.every((row: any) => row.status === "runtime-unproved" && row.acceptedException === false)).toBe(true);
});
