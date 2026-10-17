import { withSourceBindingTraversal, getG6SourceBindings, getG6PreviousSource, getRecordedChartSourceBindings, getRecordedNavigationSourceBindings, getG23DocumentationSourceBindings, getG4SourceBindings, getG5SourceBindings, hasG4ComponentsAuthorization, hasG5ComponentsAuthorization } from "./verification-helpers.mjs";
import { currentGovernanceFixtureSource, copyCurrentGovernanceFixture } from "./select-unification-test-fixture";
import { hasG123PlaygroundAssetizationAuthorization, g123PlaygroundFiles, getG123TailwindCandidateOrigins } from "./verification-helpers.mjs";
import { inputNumberFiles, hasInputNumberAuthorization } from "./verification-helpers.mjs";
import { hasAlertAuthorization, hasTooltipAuthorization, hasRecordedPostB2Refinement, hasTreeAuthorization, collectRecordedPostB2Documents } from "./verification-helpers.mjs";
import { avatarFamilyFiles, hasAvatarFamilyAuthorization } from "./verification-helpers.mjs";
import { tableRn08Files, hasTableRn08Authorization, hasBmBRn10Authorization, rn13AssetIndexFiles, matchesRn15ProtectedSource } from "./verification-helpers.mjs";
import { layoutsV1Files, hasLayoutsV1Authorization, dialogV2Files, hasDialogV2Authorization } from "./verification-helpers.mjs";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import { verifyIcons } from "./verify-icons.mjs";
import { validateRegisteredRecipeColors, verifyTokenFoundations } from "./verify-token-foundations.mjs";
import {
  validateProtectedTailwindSource,
  validateCardV2Metadata,
  validateTailwindB2CompositionBridge,
  validateTailwindB2SystemContract,
  parseTopLevelCssBlocks,
} from "./verify-tailwind-b2.mjs";
import { cardV2Files, hasCardV2Authorization, dropdownFamilyFiles, hasQuestionNumberRefinementAuthorization, hasTagBatchThreeAuthorization, inspectPngMetadata, parseYamlSubset, selectionPatternsSc03Files, selectionCardsSc02Files, selectRefinementFiles, tagRefinementFiles, tagBatchTwoRefinementFiles, tagBatchTwoNames, tagBatchThreeFiles, validateTokenFoundationsV1Phase } from "./verification-helpers.mjs";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const currentFixtureSource = (source: string) => currentGovernanceFixtureSource(workspaceRoot, source);

// Synthetic old-Gate cases use the complete, verified G6 predecessor. Live cases
// below still inspect the current workspace with its exact G6 authorization.
function copyTask4GovernedFixture(target: string) {
  return withSourceBindingTraversal(workspaceRoot, () => copyTask4GovernedFixtureInTraversal(target));
}

function copyTask4GovernedFixtureInTraversal(target: string) {
  const g6 = getG6SourceBindings(workspaceRoot);
  copyCurrentGovernanceFixture(workspaceRoot, target);
  if (!g6) return;
  const g6Files = g6.sourceFiles as Record<string, { before: string | null; after: string | null }>;
  const baseline = JSON.parse(readFileSync(join(workspaceRoot, g6.baseline.path), "utf8"));
  const predecessorFiles = new Set([
    ...Object.keys(baseline.protectedSources), ...Object.keys(baseline.retainedEvidence),
    ...Object.entries(g6Files).filter(([, binding]) => binding.before !== null).map(([file]) => file),
    ...Object.keys(g6.concurrentSourceObservations), ...Object.keys(g6.concurrentDocumentObservations),
  ]);
  for (const file of predecessorFiles) {
    const hasPrevious = g6.sourceFiles[file]?.before != null
      || Object.hasOwn(g6.concurrentSourceObservations, file)
      || Object.hasOwn(g6.concurrentDocumentObservations, file);
    const previous = hasPrevious ? getG6PreviousSource(workspaceRoot, file) : null;
    if (hasPrevious) expect(previous, `verified G6 predecessor must exist: ${file}`).not.toBeNull();
    const bytes = previous === null ? readFileSync(join(workspaceRoot, file)) : Buffer.from(previous);
    mkdirSync(dirname(join(target, file)), { recursive: true });
    writeFileSync(join(target, file), bytes);
  }
  // Remove only the finite newly introduced runtime/Registry/Manifest/source files.
  const removedParents = new Set<string>();
  for (const [file, binding] of Object.entries(g6Files)) {
    if (binding.before !== null) continue;
    rmSync(join(target, file), { force: true });
    removedParents.add(dirname(join(target, file)));
  }
  for (const parent of [...removedParents].sort((a, b) => b.length - a.length)) {
    let directory = parent;
    while (directory !== target && existsSync(directory) && readdirSync(directory).length === 0) {
      rmSync(directory, { recursive: true }); directory = dirname(directory);
    }
  }
  // This implementation evidence belongs to G6 and has no role in an old-Gate
  // fixture. Its before bytes were consumed only after the live proof validated.
  rmSync(join(target, dirname(g6.phase.evidence)), { recursive: true, force: true });
  const predecessorPhase = parseYamlSubset(readFileSync(join(target, "status/current-phase.yaml"), "utf8")) as any;
  expect(predecessorPhase.componentRefinements.g6Components).toBeUndefined();
}
function createHistoricalB2Fixture(prefix: string) {
  const root = mkdtempSync(join(tmpdir(), prefix));
  try {
  const archive = join(workspaceRoot, "evidence/runtime/token-foundations-v1/pre-token-runtime.tar.gz");
  expect(hash(archive)).toBe("39b6253185367626ddf8f66e6b1cd99ed2e8addd4937e7c93f3c12ad48289280");
  const extracted = spawnSync("tar", ["-xzf", archive, "-C", root], { encoding: "utf8" });
  expect(extracted.status, extracted.stderr).toBe(0);
  // Product inputs stay immutable archive bytes. Missing historical data includes the original vibe-consumer.tsx evidence sample.
  for (const file of [".gitignore", "benchmarks/README.md", "docs", "evidence/visual-evidence.yaml", "evidence/screenshots", "evidence/icons", "evidence/rain-classic", "evidence/runtime/icon-migration", "evidence/runtime/day-2", "evidence/runtime/day-3", "registry/.gitkeep", "registry/icons.json"]) {
    mkdirSync(dirname(join(root, file)), { recursive: true });
    cpSync(join(workspaceRoot, file), join(root, file), {
      recursive: true,
      filter: (source) => {
        const path = relative(workspaceRoot, source);
        if (file === "docs" && /\.(?:tsx?|mjs|html|zip|json)$/.test(path)) return false;
        if (path.startsWith("docs/adr/") && !["docs/adr/0001-icon-assets-and-semantic-consumption.md", "docs/adr/0002-tailwind-b2-local-fork.md"].includes(path)) return false;
        return !path.startsWith("evidence/icons/source-additions");
      },
    });
  }
  for (const [path, checksum] of [
    ["benchmarks/benchmark-registry.yaml", "06da78a15c264a6985e1b129ffafb87f5d86d901875cb904ac6f43a1664f18d3"],
    ["apps/playground/src/docs/benchmark-index.ts", "a01201fe5ca6cdcfbd6345bdaf02ab4f7926526f0b28bc9b00b7a9cf489f7f02"],
  ] as const) {
    const source = readFileSync(join(workspaceRoot, `evidence/runtime/bm-a-rn09/before/${path}.txt`));
    expect(hashValue(source.toString())).toBe(checksum);
    writeFileSync(join(root, path), source);
  }
  const inventoryPath = join(root, "evidence/icons/inventory.json"), inventory = JSON.parse(readFileSync(inventoryPath, "utf8"));
  const before = inventory.icons.length;
  inventory.icons = inventory.icons.filter((icon: any) => !["icon/grading-pending", "icon/grading-reviewed"].includes(icon.assetId));
  expect(before - inventory.icons.length).toBe(2);
  inventory.availableCount -= 2; delete inventory.sourceAdditions;
  writeFileSync(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`);
  const registryPath = join(root, "registry/icons.json"), registry = JSON.parse(readFileSync(registryPath, "utf8"));
  registry.items = registry.items.filter((item: any) => !["grading-pending", "grading-reviewed"].includes(item.name));
  writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
  expect(spawnSync("git", ["init", "--quiet"], { cwd: root }).status).toBe(0);
  return root;
  } catch (error) {
    rmSync(root, { recursive: true, force: true });
    throw error;
  }
}
it("W7 accepts only the authorized Switch semantic aliases in the existing bridge", () => {
  expect(validateTailwindB2CompositionBridge({ root: workspaceRoot })).toEqual([]);
});

it("W7 accepts the exact shared CSS imports only under their registered owner", () => {
  const source = readFileSync(join(workspaceRoot, "packages/ui/src/styles.css"), "utf8");
  const owner = "packages/ui/src/styles.css";
  const failures: string[] = [];
  expect(parseTopLevelCssBlocks(source, "W7 shared CSS", failures, { root: workspaceRoot, owner }).length).toBeGreaterThan(0);
  expect(failures).toEqual([]);
  for (const [css, candidateOwner] of [
    [source, "packages/foundations/src/tokens.css"],
    [source.replace('./navigation/navigation.css', './navigation/unapproved.css'), owner],
    ['@import "./navigation/navigation.css";\n' + source, owner],
    [source.replace('@import "./tree/tree.css";', '@import "./tree/tree.css";\n@import "./unapproved.css";'), owner],
  ]) {
    const rejected: string[] = [];
    parseTopLevelCssBlocks(css, "W7 shared CSS", rejected, { root: workspaceRoot, owner: candidateOwner });
    expect(rejected.join("\n")).toMatch(/unsupported top-level statement|G6 normalization requires the exact bound owner bytes/);
  }
});

it("W7 accepts only the finite recorded post-B2 document inventory", () => {
  expect(validateTailwindB2SystemContract({ root: workspaceRoot }).filter((failure: string) => /^Task 5 (?:manifest inventory|Registry)/.test(failure))).toEqual([]);
});

it("W7 admits only the exact account-hover metadata successor with its original inventory and permissions", () => {
  const fixture = mkdtempSync(join(tmpdir(), "rain-w7-recorded-successor-"));
  const registryPath = "registry/navigation-v042.json", manifestPath = "manifests/recipes/navigation-r2.yaml", cssPath = "apps/playground/src/recipes/navigation-v042/r2.css";
  try {
    copyTask4GovernedFixture(fixture);
    const status = parseYamlSubset(readFileSync(join(fixture, "status/current-phase.yaml"), "utf8")) as any;
    for (const path of [manifestPath, cssPath]) { mkdirSync(dirname(join(fixture, path)), { recursive: true }); cpSync(join(workspaceRoot, path), join(fixture, path)); }
    const inspect = (phase = status) => { const failures: string[] = []; const result = collectRecordedPostB2Documents(fixture, phase, failures); return { result, failures }; };
    expect(inspect().failures).toEqual([]);
    expect(inspect().result.registries).toContain(registryPath);
    expect(inspect().result.manifests).toContain(manifestPath);
    const original = readFileSync(join(fixture, registryPath), "utf8"), registry = JSON.parse(original);
    const invalidRegistryChanges = [
      (value: any) => value.shared.files.push("packages/ui/src/navigation/unapproved.ts"),
      (value: any) => value.shared.peerDependencies.push("unapproved-navigation-engine"),
      (value: any) => value.publication = "published",
      (value: any) => value.currentW7Repair.humanGate = "accepted-global-system",
    ];
    for (const change of invalidRegistryChanges) {
      const value = structuredClone(registry); change(value);
      writeFileSync(join(fixture, registryPath), JSON.stringify(value, null, 2) + "\n");
      expect(inspect().result.registries).not.toContain(registryPath);
      expect(inspect().failures.join("\n")).toMatch(/recorded Registry|Recorded later sources cannot be checked/);
    }
    writeFileSync(join(fixture, registryPath), original);
    for (const path of [manifestPath, cssPath]) {
      const content = readFileSync(join(fixture, path), "utf8");
      try {
        writeFileSync(join(fixture, path), content + (path.endsWith(".css") ? "\n.extra { color: #fff; }\n" : '\nunapprovedPublication: "published"\n'));
        expect(inspect().result.registries).not.toContain(registryPath);
        expect(inspect().failures.join("\n")).toMatch(/recorded Registry|Recorded later sources cannot be checked/);
      } finally { writeFileSync(join(fixture, path), content); }
    }
    for (const change of [{ publication: "published" }, { scope: "all-components" }, { humanGateG3: "accepted-global-system" }]) {
      const invalid = structuredClone(status); Object.assign(invalid.navigationComponentsV042W6W8, change);
      expect(inspect(invalid).result.registries).not.toContain(registryPath);
    }
    expect(inspect().failures).toEqual([]);
  } finally { rmSync(fixture, { recursive: true, force: true }); }
}, 120000);

it("keeps Card V2 registration local and rejects premature acceptance or lost exports", () => {
  const manifest = parseYamlSubset(readFileSync(join(workspaceRoot, "manifests/ui/card.yaml"), "utf8")) as any;
  const registry = JSON.parse(readFileSync(join(workspaceRoot, "registry/card.json"), "utf8"));
  expect(validateCardV2Metadata({ manifest, registry })).toEqual([]);
  for (const patch of [{ humanGate: "accepted" }, { publication: "published" }, { exports: ["Card"] }]) {
    expect(validateCardV2Metadata({ manifest: { ...manifest, ...patch }, registry }).length).toBeGreaterThan(0);
  }
  expect(validateCardV2Metadata({ manifest, registry: { ...registry, publication: "published" } }).length).toBeGreaterThan(0);
  expect(validateCardV2Metadata({ manifest, registry: { ...registry, shared: undefined } }).length).toBeGreaterThan(0);
  expect(validateCardV2Metadata({ manifest, registry: { ...registry, shared: { ...registry.shared, peerDependencies: [...registry.shared.peerDependencies, "unapproved-card-engine"] } } }).length).toBeGreaterThan(0);
});
const benchmarkPath = "benchmarks/tailwind-b2-ai-editability.yaml";
const baselinePath = "evidence/runtime/tailwind-b2/baseline-results.yaml";
const evidenceReadmePath = "evidence/runtime/tailwind-b2/README.md";
const verifierPath = join(workspaceRoot, "scripts/verify-tailwind-b2.mjs");
const boundaryVerifierPath = join(workspaceRoot, "scripts/verify-boundaries.mjs");
const promptIds = [
  "B2-P1-LOCAL-INPUT",
  "B2-P2-LOCAL-BUTTON",
  "B2-P3-REUSE-AND-PARTS",
];
const promptTexts = [
  "只把当前搜索区的 Input 调得更宽松、背景更浅，不影响其他 Input。",
  "只调整当前页面搜索 Button 的视觉层级，不改变全局 Button。",
  "在同一功能的第二个搜索状态中复用局部样式，并仅为当前搜索功能增加一个独立的 `scope-label` Input Part；不修改全局 Input。",
];
const fixtureRoute = "/#tailwind-b2-native-baseline";
const fixtureViewport = { width: 1280, height: 720 };
const fixtureSelectors = {
  target: "[data-scope=\"target-search\"]",
  nonTarget: "[data-scope=\"non-target-controls\"]",
  formalSearchIcon: "[data-scope=\"target-search\"] [data-icon=\"icon/search\"]",
};
const runTargetSelector = "[data-scope=\"target-search\"] [data-rain-id=\"ui-input\"]";
const lighterSurfaceResolution = {
  initialToken: "--rain-color-surface-subtle",
  initialComputed: "rgb(237, 243, 250)",
  acceptance: "higher-luminance-allowed-rain-semantic-or-local-candidate-surface",
  visualQualityRoute: "human-gate",
};
const functionalStateAlgorithm = "sha256-u32be-path-bytes-plus-file-sha256-bytes-v1";
const stateObjectPrefix = "evidence/runtime/tailwind-b2/trials/state-objects/sha256/";
const nativeSourceRoots = {
  fixture: "/private/tmp/rain-next-b2-native-trial.H4i2yN",
  runs: [
    "/private/tmp/rain-next-b2-native-p1.cNzY4X",
    "/private/tmp/rain-next-b2-native-p2.i95grx",
    "/private/tmp/rain-next-b2-native-p3.bjo13u",
  ],
  assembled: "/private/tmp/rain-next-b2-p3-actual-assembly.ddKXzS",
};

function compareCanonicalPaths(left: string, right: string) {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}
const protectedFunctionalStatePaths = [
  "manifests/icons.json",
  "package.json",
  "packages/foundations/src/density.tsx",
  "packages/foundations/src/tokens.css",
  "packages/ui/package.json",
  "packages/ui/src/button/button.tsx",
  "packages/ui/src/icon/icon.tsx",
  "packages/ui/src/icons/assets/search.svg",
  "packages/ui/src/icons/search.tsx",
  "packages/ui/src/input/input.tsx",
  "packages/ui/src/styles.css",
  "pnpm-lock.yaml",
  "registry/icons.json",
];
const fixtureFunctionalStatePaths = [
  "apps/playground/src/app.tsx",
  "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css",
  "apps/playground/src/experiments/tailwind-b2-native-baseline/page.test.tsx",
  "apps/playground/src/experiments/tailwind-b2-native-baseline/page.tsx",
  "apps/playground/src/routes/route-registry.ts",
  "apps/playground/src/styles.css",
  "tests/e2e/tailwind-b2-native-baseline.spec.ts",
];
const requiredFunctionalStatePaths = [
  ...fixtureFunctionalStatePaths,
  ...protectedFunctionalStatePaths,
].sort(compareCanonicalPaths);

function absolute(filePath: string, root = workspaceRoot) {
  return join(root, filePath);
}

function readYaml(filePath: string, root = workspaceRoot) {
  return parseYamlSubset(readFileSync(absolute(filePath, root), "utf8")) as any;
}

function scalar(value: unknown) {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value === null) return "null";
  throw new Error(`Unsupported scalar ${String(value)}`);
}

function renderYaml(value: unknown, indent = 0): string {
  const padding = " ".repeat(indent);
  const isObject = value !== null && typeof value === "object";
  const isEmpty = isObject && Object.keys(value).length === 0;
  if (Array.isArray(value)) {
    if (value.length === 0) return `${padding}[]`;
    return value.map((item) => {
      if (item === null || typeof item !== "object") return `${padding}- ${scalar(item)}`;
      const entries = Object.entries(item);
      const [firstKey, firstValue] = entries[0] ?? [];
      if (!firstKey) return `${padding}- {}`;
      const firstIsEmpty = firstValue !== null && typeof firstValue === "object" && Object.keys(firstValue).length === 0;
      const first = firstIsEmpty
        ? `${padding}- ${firstKey}: ${Array.isArray(firstValue) ? "[]" : "{}"}`
        : firstValue !== null && typeof firstValue === "object"
          ? `${padding}- ${firstKey}:\n${renderYaml(firstValue, indent + 4)}`
          : `${padding}- ${firstKey}: ${scalar(firstValue)}`;
      const rest = entries.slice(1).map(([key, child]) => {
        const childPadding = " ".repeat(indent + 2);
        const childIsEmpty = child !== null && typeof child === "object" && Object.keys(child).length === 0;
        if (childIsEmpty) return `${childPadding}${key}: ${Array.isArray(child) ? "[]" : "{}"}`;
        return child !== null && typeof child === "object"
          ? `${childPadding}${key}:\n${renderYaml(child, indent + 4)}`
          : `${childPadding}${key}: ${scalar(child)}`;
      });
      return [first, ...rest].join("\n");
    }).join("\n");
  }
  if (isObject) {
    if (isEmpty) return `${padding}{}`;
    return Object.entries(value as Record<string, unknown>).map(([key, child]) => {
      const childIsEmpty = child !== null && typeof child === "object" && Object.keys(child).length === 0;
      if (childIsEmpty) return `${padding}${key}: ${Array.isArray(child) ? "[]" : "{}"}`;
      return child !== null && typeof child === "object"
        ? `${padding}${key}:\n${renderYaml(child, indent + 2)}`
        : `${padding}${key}: ${scalar(child)}`;
    }).join("\n");
  }
  return `${padding}${scalar(value)}`;
}

function runScript(scriptPath: string, root = workspaceRoot, timeout?: number) {
  return spawnSync(process.execPath, [scriptPath], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
    ...(timeout === undefined ? {} : { timeout }),
  });
}

function outputOf(result: ReturnType<typeof runScript>) {
  return `${result.stdout}${result.stderr}`;
}

function extractCssBlock(source: string, marker: string) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) return null;
  const openingBrace = source.indexOf("{", markerIndex);
  if (openingBrace < 0) return null;
  let depth = 0;
  for (let index = openingBrace; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(openingBrace + 1, index);
    }
  }
  return null;
}

function hash(filePath: string) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function functionalTreeHash(files: Array<{ path: string; sha256: string }>) {
  const chunks: Buffer[] = [];
  for (const file of files) {
    const pathBytes = Buffer.from(file.path, "utf8");
    const pathLength = Buffer.alloc(4);
    pathLength.writeUInt32BE(pathBytes.length);
    chunks.push(pathLength, pathBytes, Buffer.from(file.sha256, "hex"));
  }
  return createHash("sha256").update(Buffer.concat(chunks)).digest("hex");
}

function writeStateObject(root: string, source: string | Buffer) {
  const bytes = Buffer.isBuffer(source) ? source : Buffer.from(source);
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  const objectPath = `${stateObjectPrefix}${sha256}.blob`;
  mkdirSync(dirname(absolute(objectPath, root)), { recursive: true });
  if (!existsSync(absolute(objectPath, root))) writeFileSync(absolute(objectPath, root), bytes);
  return { byteSize: bytes.length, objectPath, sha256 };
}

function sourceRootProvenance(path: string) {
  return {
    kind: "temporary-directory",
    path,
    pathProvenance: "coordinator-recorded",
    retention: "ephemeral",
  };
}

function capture(path: string) {
  return {
    method: "raw-byte-content-addressing",
    coverage: "functional-state-files-only",
    sourceRoot: sourceRootProvenance(path),
  };
}

function sourceProvenance(path: string) {
  return {
    ...capture(path),
    verificationDependency: false,
  };
}

function buildFunctionalState(root: string, changes: Record<string, string> = {}) {
  const files = Array.from(new Set([
    ...requiredFunctionalStatePaths,
    ...Object.keys(changes),
  ]))
    .sort(compareCanonicalPaths)
    .map((filePath) => ({
      path: filePath,
      ...writeStateObject(root, changes[filePath] ?? `common:${filePath}\n`),
    }));
  return {
    algorithm: functionalStateAlgorithm,
    files,
    fileCount: files.length,
    treeSha256: functionalTreeHash(files),
  };
}

function rehashFunctionalState(functionalState: any) {
  functionalState.treeSha256 = functionalTreeHash(functionalState.files);
}

function setFunctionalSource(root: string, functionalState: any, filePath: string, source: string | Buffer) {
  const file = functionalState.files.find(({ path }: any) => path === filePath);
  if (!file) throw new Error(`Missing synthetic functional path ${filePath}`);
  Object.assign(file, writeStateObject(root, source));
  rehashFunctionalState(functionalState);
}

function writeManifest(root: string, filePath: string, document: unknown) {
  const source = `${JSON.stringify(document, null, 2)}\n`;
  mkdirSync(dirname(absolute(filePath, root)), { recursive: true });
  writeFileSync(absolute(filePath, root), source);
  return {
    path: filePath,
    byteSize: Buffer.from(source).length,
    sha256: hashValue(source),
  };
}

function materializeFunctionalState(root: string, directory: string, functionalState: any) {
  for (const file of functionalState.files) {
    const target = join(directory, file.path);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(absolute(file.objectPath, root), target);
  }
}

function writeTransitionPatch(
  root: string,
  filePath: string,
  startFunctionalState: any,
  endFunctionalState: any,
) {
  const scratch = mkdtempSync(join(tmpdir(), "rain-b2-test-diff-"));
  const before = join(scratch, "before");
  const after = join(scratch, "after");
  mkdirSync(before);
  mkdirSync(after);
  try {
    materializeFunctionalState(root, before, startFunctionalState);
    materializeFunctionalState(root, after, endFunctionalState);
    const result = spawnSync(
      "git",
      ["diff", "--no-index", "--binary", "--no-renames", "--", "before", "after"],
      { cwd: scratch, encoding: "utf8", maxBuffer: 4 * 1024 * 1024 },
    );
    if (result.status !== 1 || !result.stdout) {
      throw new Error(`Unable to build synthetic patch: ${result.stderr}`);
    }
    const source = result.stdout
      .replaceAll("a/before/", "a/")
      .replaceAll("a/after/", "a/")
      .replaceAll("b/before/", "b/")
      .replaceAll("b/after/", "b/");
    mkdirSync(dirname(absolute(filePath, root)), { recursive: true });
    writeFileSync(absolute(filePath, root), source);
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

describe("Tailwind B2 AI editability benchmark contract", () => {
  it("registers exactly the three agreed prompts and treats elapsed time as secondary", () => {
    expect(existsSync(absolute(benchmarkPath))).toBe(true);
    if (!existsSync(absolute(benchmarkPath))) return;

    const benchmark = readYaml(benchmarkPath);
    expect(benchmark).toMatchObject({
      schemaVersion: "1.1",
      kind: "TailwindB2AiEditabilityBenchmark",
      metadata: {
        id: "tailwind-b2-ai-editability",
        phase: "tailwind-b2-composition-contract",
        elapsedTimeRole: "secondary",
      },
    });
    expect(benchmark.prompts.map(({ id }: any) => id)).toEqual(promptIds);
    expect(benchmark.prompts.map(({ text }: any) => text)).toEqual(promptTexts);
    expect(benchmark.metrics.value.map(({ field }: any) => field)).toEqual([
      "firstPass",
      "userCorrectionPrompts",
      "scopeAccuracy",
      "continuationAssessment",
    ]);
    expect(benchmark.metrics.secondary).toEqual([
      expect.objectContaining({ field: "autonomousRepairCycles", role: "diagnostic" }),
      expect.objectContaining({ field: "elapsedMs", role: "secondary" }),
    ]);
    expect(benchmark.continuationRubric).toMatchObject({
      version: "1.0",
      assessmentSource: "recorded-run-review",
    });
    expect(benchmark.continuationRubric.values.map(({ id }: any) => id)).toEqual([
      "clear",
      "minor-friction",
      "major-friction",
      "blocked",
    ]);
    const p2 = benchmark.acceptanceCriteria.find(({ promptId }: any) => promptId === promptIds[1]);
    expect(p2.criteria.filter(({ route }: any) => route === "automated").map(({ id }: any) => id)).toEqual([
      "local-button-changed",
      "button-master-unchanged",
      "non-target-controls-unchanged",
      "formal-search-icon-unchanged",
    ]);
    expect(p2.criteria.filter(({ route }: any) => route === "human-gate").map(({ id }: any) => id)).toEqual([
      "visual-hierarchy-appropriate",
    ]);
    expect(benchmark.fixtureProtocol.stateManifest).toEqual({
      format: "json-log",
      kind: "TailwindB2FixtureStateManifest",
      route: fixtureRoute,
      viewport: fixtureViewport,
      selectors: fixtureSelectors,
      runTargetSelector,
      controls: ["Input", "Button"],
      lighterSurfaceResolution,
      functionalState: {
        algorithm: functionalStateAlgorithm,
        pathOrder: "utf8-bytewise-nfc-v1",
        requiredPaths: requiredFunctionalStatePaths,
      },
    });
  });

  it("makes P1 and P2 independent while P3 consumes saved P1/P2 results from the same architecture", () => {
    expect(existsSync(absolute(benchmarkPath))).toBe(true);
    if (!existsSync(absolute(benchmarkPath))) return;
    const benchmark = readYaml(benchmarkPath);
    expect(benchmark.prompts[0].start).toEqual({
      mode: "independent-common-fixture",
      prerequisitePromptIds: [],
    });
    expect(benchmark.prompts[1].start).toEqual({
      mode: "independent-common-fixture",
      prerequisitePromptIds: [],
    });
    expect(benchmark.prompts[2].start).toEqual({
      mode: "saved-prior-results-same-architecture",
      prerequisitePromptIds: promptIds.slice(0, 2),
    });
    expect(benchmark.trialProtocol).toMatchObject({
      p1P2Start: "independent-common-fixture",
      p3Start: "saved-prior-results-same-architecture",
      prerequisiteCostExcludedFromP3: true,
      crossArchitectureStateReuse: false,
    });
  });

  it("records the completed native baseline without claiming review, comparison, or Human Gate completion", () => {
    for (const filePath of [baselinePath, evidenceReadmePath]) {
      expect(existsSync(absolute(filePath))).toBe(true);
    }
    if (!existsSync(absolute(baselinePath))) return;

    const baseline = readYaml(baselinePath);
    const benchmark = readYaml(benchmarkPath);
    expect(baseline.metadata).toMatchObject({
      architecture: "native-css-baseline",
      trials: "completed",
      task2Status: "trials-recorded-awaiting-review",
      comparisonStatus: "not-run",
    });
    expect(baseline.results.map(({ promptId }: any) => promptId)).toEqual(promptIds);
    expect(baseline.fixture.sourceProvenance).toMatchObject({
      method: "raw-byte-content-addressing",
      coverage: "functional-state-files-only",
      verificationDependency: false,
      sourceRoot: { path: "/private/tmp/rain-next-b2-native-trial.H4i2yN" },
    });
    for (const [index, result] of baseline.results.entries()) {
      expect(result.trialStatus).toBe("completed");
      expect(result.run).toMatchObject({
        status: "recorded",
        model: { value: "unexposed", provenance: "runtime-not-exposed", reason: expect.any(String) },
        reasoningEffort: { value: "unexposed", provenance: "runtime-not-exposed", reason: expect.any(String) },
        sourceProvenance: {
          method: "raw-byte-content-addressing",
          coverage: "functional-state-files-only",
          verificationDependency: false,
          sourceRoot: { path: expect.stringMatching(/^\/private\/tmp\//) },
        },
      });
      const criteria = benchmark.acceptanceCriteria.find(({ promptId }: any) => promptId === result.promptId).criteria;
      expect(result.acceptanceEvidence.map(({ criterionId }: any) => criterionId)).toEqual(
        criteria.map(({ id }: any) => id),
      );
      for (const acceptance of result.acceptanceEvidence) {
        if (acceptance.route === "human-gate") {
          expect(acceptance.assessment).toMatchObject({ value: "not-measured", reason: expect.any(String) });
        } else {
          expect(acceptance.assessment).toMatchObject({ value: "pass", evidence: expect.any(String) });
        }
      }
      for (const comparison of Object.values(result.protectedComparisons) as any[]) {
        expect(comparison).toMatchObject({ status: "recorded", verdict: "unchanged", evidence: expect.any(String) });
      }
      expect(result.metrics.userCorrectionPrompts).toMatchObject({ value: "not-measured", reason: expect.any(String) });
      expect(result.metrics.continuationAssessment.value).toBe(index === 2 ? "minor-friction" : "not-measured");
      expect(result.metrics.firstPass.value).toBe(index === 0 ? "pass" : index === 1 ? "not-measured" : "fail");
      expect(result.artifacts.diff).toMatchObject({ status: "captured" });
      expect(result.artifacts.screenshot).toMatchObject({ status: "captured", width: 1280, height: 720 });
      expect(result.artifacts.targetedTests).toMatchObject({ status: "passed", exitCode: 0 });
    }
    expect(baseline.results[2].start.prerequisiteAssembly).toMatchObject({
      status: "recorded",
      applicationOrder: promptIds.slice(0, 2),
      costExcludedFromP3: true,
      conflicts: { status: "resolved", entries: expect.any(Array) },
    });
  });
});

describe("Tailwind B2 results validator", () => {
  let fixtureRoot: string;

  beforeAll(() => {
    fixtureRoot = createHistoricalB2Fixture("rain-b2-schema-");
  }, 60_000);

  beforeEach(() => {
    for (const filePath of [benchmarkPath, baselinePath, evidenceReadmePath]) {
      if (existsSync(absolute(filePath))) {
        mkdirSync(dirname(absolute(filePath, fixtureRoot)), { recursive: true });
        cpSync(absolute(filePath), absolute(filePath, fixtureRoot));
      }
    }
  });

  afterAll(() => {
    if (fixtureRoot) rmSync(fixtureRoot, { recursive: true, force: true });
  }, 30_000);

  it("validates the recorded baseline without claiming the comparison ran", () => {
    expect(existsSync(verifierPath)).toBe(true);
    if (!existsSync(verifierPath)) return;
    const result = runScript(verifierPath, fixtureRoot);
    expect(outputOf(result)).toMatch(/baseline trials completed/);
    expect(result.status).toBe(0);
  });

  it("fails closed instead of blocking when the evidence README is a FIFO", () => {
    const readmePath = absolute(evidenceReadmePath, fixtureRoot);
    const originalReadme = readFileSync(readmePath);
    try {
      rmSync(readmePath);
      expect(spawnSync("mkfifo", [readmePath]).status).toBe(0);
      const result = runScript(verifierPath, fixtureRoot, 1_000);
      expect(result.error).toBeUndefined();
      expect(outputOf(result)).toMatch(/README.*regular non-symbolic file|README.*non-empty regular file/i);
      expect(result.status).toBe(1);
    } finally {
      rmSync(readmePath, { force: true });
      writeFileSync(readmePath, originalReadme);
    }
  });

  it("rejects a patch whose replay result is a symbolic link", () => {
    const document = readYaml(baselinePath, fixtureRoot);
    const trial = document.results[2];
    const patchPath = absolute(trial.artifacts.diff.path, fixtureRoot);
    const endManifestPath = absolute(trial.run.endStateManifest.path, fixtureRoot);
    const originalPatch = readFileSync(patchPath);
    const originalEndManifest = readFileSync(endManifestPath);
    const scratch = mkdtempSync(join(tmpdir(), "rain-b2-symlink-replay-"));
    let extraObjectPath: string | undefined;

    try {
      const targetPath = "apps/playground/src/experiments/tailwind-b2-native-baseline/local-search-input.tsx";
      const externalPath = join(scratch, "external-source.tsx");
      const externalSource = Buffer.from("external bytes reached through a replay symlink\n");
      writeFileSync(externalPath, externalSource);

      const endManifest = JSON.parse(originalEndManifest.toString("utf8"));
      const targetEntry = endManifest.functionalState.files.find(({ path }: any) => path === targetPath);
      if (!targetEntry) throw new Error(`Missing P3 target path ${targetPath}`);
      const object = writeStateObject(fixtureRoot, externalSource);
      extraObjectPath = absolute(object.objectPath, fixtureRoot);
      Object.assign(targetEntry, object);
      rehashFunctionalState(endManifest.functionalState);
      const endReference = writeManifest(
        fixtureRoot,
        trial.run.endStateManifest.path,
        endManifest,
      );
      trial.run.endStateManifest = endReference;
      trial.run.endStateSha256 = endReference.sha256;

      const startManifest = JSON.parse(readFileSync(
        absolute(trial.run.startStateManifest.path, fixtureRoot),
        "utf8",
      ));
      const before = join(scratch, "before");
      const after = join(scratch, "after");
      mkdirSync(before);
      mkdirSync(after);
      materializeFunctionalState(fixtureRoot, before, startManifest.functionalState);
      materializeFunctionalState(fixtureRoot, after, endManifest.functionalState);
      const maliciousTarget = join(after, targetPath);
      rmSync(maliciousTarget);
      symlinkSync(externalPath, maliciousTarget);

      const diff = spawnSync(
        "git",
        ["diff", "--no-index", "--binary", "--no-renames", "--", "before", "after"],
        { cwd: scratch, encoding: "utf8", maxBuffer: 4 * 1024 * 1024 },
      );
      expect(diff.status).toBe(1);
      const patchSource = diff.stdout
        .replaceAll("a/before/", "a/")
        .replaceAll("a/after/", "a/")
        .replaceAll("b/before/", "b/")
        .replaceAll("b/after/", "b/");
      writeFileSync(patchPath, patchSource);
      trial.artifacts.diff.byteSize = Buffer.byteLength(patchSource);
      trial.artifacts.diff.sha256 = hash(patchPath);
      writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);

      const result = runScript(verifierPath, fixtureRoot);
      expect(outputOf(result)).toMatch(/replayed.*regular non-symbolic file|symbolic link/i);
      expect(result.status).toBe(1);
    } finally {
      writeFileSync(patchPath, originalPatch);
      writeFileSync(endManifestPath, originalEndManifest);
      if (extraObjectPath && existsSync(extraObjectPath)) rmSync(extraObjectPath);
      rmSync(scratch, { recursive: true, force: true });
    }
  });

  it("rejects a self-consistent change outside the prompt-local path allowlist", () => {
    const document = readYaml(baselinePath, fixtureRoot);
    const trial = document.results[2];
    const patchPath = absolute(trial.artifacts.diff.path, fixtureRoot);
    const endManifestPath = absolute(trial.run.endStateManifest.path, fixtureRoot);
    const originalPatch = readFileSync(patchPath);
    const originalEndManifest = readFileSync(endManifestPath);
    let extraObjectPath: string | undefined;

    try {
      const globalStylePath = "apps/playground/src/styles.css";
      const endManifest = JSON.parse(originalEndManifest.toString("utf8"));
      const targetEntry = endManifest.functionalState.files.find(({ path }: any) => path === globalStylePath);
      if (!targetEntry) throw new Error(`Missing protected fixture path ${globalStylePath}`);
      const object = writeStateObject(fixtureRoot, "self-consistent but out-of-scope global CSS change\n");
      extraObjectPath = absolute(object.objectPath, fixtureRoot);
      Object.assign(targetEntry, object);
      rehashFunctionalState(endManifest.functionalState);
      const endReference = writeManifest(
        fixtureRoot,
        trial.run.endStateManifest.path,
        endManifest,
      );
      trial.run.endStateManifest = endReference;
      trial.run.endStateSha256 = endReference.sha256;
      trial.observations.changedFiles.value = [
        ...trial.observations.changedFiles.value,
        globalStylePath,
      ].sort(compareCanonicalPaths);

      const startManifest = JSON.parse(readFileSync(
        absolute(trial.run.startStateManifest.path, fixtureRoot),
        "utf8",
      ));
      writeTransitionPatch(
        fixtureRoot,
        trial.artifacts.diff.path,
        startManifest.functionalState,
        endManifest.functionalState,
      );
      trial.artifacts.diff.byteSize = readFileSync(patchPath).length;
      trial.artifacts.diff.sha256 = hash(patchPath);
      writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);

      const result = runScript(verifierPath, fixtureRoot);
      expect(outputOf(result)).toMatch(/prompt-local.*allowlist|protected functional path.*apps\/playground\/src\/styles\.css/i);
      expect(result.status).toBe(1);
    } finally {
      writeFileSync(patchPath, originalPatch);
      writeFileSync(endManifestPath, originalEndManifest);
      if (extraObjectPath && existsSync(extraObjectPath)) rmSync(extraObjectPath);
    }
  });

  it("rejects reusing stale visual evidence after an allowed end-state file changes", () => {
    const document = readYaml(baselinePath, fixtureRoot);
    const trial = document.results[2];
    const patchPath = absolute(trial.artifacts.diff.path, fixtureRoot);
    const endManifestPath = absolute(trial.run.endStateManifest.path, fixtureRoot);
    const originalPatch = readFileSync(patchPath);
    const originalEndManifest = readFileSync(endManifestPath);
    let extraObjectPath: string | undefined;

    try {
      const pageCssPath = "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css";
      const endManifest = JSON.parse(originalEndManifest.toString("utf8"));
      const targetEntry = endManifest.functionalState.files.find(({ path }: any) => path === pageCssPath);
      if (!targetEntry) throw new Error(`Missing P3 page CSS path ${pageCssPath}`);
      const originalCss = readFileSync(absolute(targetEntry.objectPath, fixtureRoot));
      const object = writeStateObject(
        fixtureRoot,
        Buffer.concat([
          originalCss,
          Buffer.from("\n[data-scope=\"non-target-controls\"] [data-rain-id=\"ui-input\"] { background: red; }\n"),
        ]),
      );
      extraObjectPath = absolute(object.objectPath, fixtureRoot);
      Object.assign(targetEntry, object);
      rehashFunctionalState(endManifest.functionalState);
      const endReference = writeManifest(
        fixtureRoot,
        trial.run.endStateManifest.path,
        endManifest,
      );
      trial.run.endStateManifest = endReference;
      trial.run.endStateSha256 = endReference.sha256;

      const startManifest = JSON.parse(readFileSync(
        absolute(trial.run.startStateManifest.path, fixtureRoot),
        "utf8",
      ));
      writeTransitionPatch(
        fixtureRoot,
        trial.artifacts.diff.path,
        startManifest.functionalState,
        endManifest.functionalState,
      );
      trial.artifacts.diff.byteSize = readFileSync(patchPath).length;
      trial.artifacts.diff.sha256 = hash(patchPath);
      writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);

      const result = runScript(verifierPath, fixtureRoot);
      expect(outputOf(result)).toMatch(/sealed native baseline|immutable evidence lock|recorded evidence bundle/i);
      expect(result.status).toBe(1);
    } finally {
      writeFileSync(patchPath, originalPatch);
      writeFileSync(endManifestPath, originalEndManifest);
      if (extraObjectPath && existsSync(extraObjectPath)) rmSync(extraObjectPath);
    }
  });

  it("rejects replacing P1 visual artifacts and self-reporting new protected hashes", () => {
    const document = readYaml(baselinePath, fixtureRoot);
    document.results[0].artifacts.screenshot = structuredClone(
      document.results[1].artifacts.screenshot,
    );
    document.results[0].artifacts.targetedTests = structuredClone(
      document.results[1].artifacts.targetedTests,
    );
    for (const comparison of Object.values(document.results[0].protectedComparisons) as any[]) {
      comparison.beforeSha256 = "0".repeat(64);
      comparison.afterSha256 = "0".repeat(64);
    }
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);

    const result = runScript(verifierPath, fixtureRoot);
    expect(outputOf(result)).toMatch(/sealed native baseline|immutable evidence lock|recorded evidence bundle/i);
    expect(result.status).toBe(1);
  });

  it("rejects an arbitrary non-blank source change disguised as assembly normalization", () => {
    const document = readYaml(baselinePath, fixtureRoot);
    const assembly = document.results[2].start.prerequisiteAssembly;
    const manifestPath = absolute(assembly.assembledStateManifest.path, fixtureRoot);
    const originalManifest = readFileSync(manifestPath, "utf8");
    const manifest = JSON.parse(originalManifest);
    const pageCssPath = "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css";
    const pageCss = manifest.functionalState.files.find(({ path }: any) => path === pageCssPath);
    const expectedSha256 = pageCss.sha256;
    Object.assign(pageCss, writeStateObject(fixtureRoot, "arbitrary non-blank CSS bytes\n"));
    const arbitraryObjectPath = absolute(pageCss.objectPath, fixtureRoot);
    rehashFunctionalState(manifest.functionalState);
    const manifestReference = writeManifest(
      fixtureRoot,
      assembly.assembledStateManifest.path,
      manifest,
    );
    assembly.assembledStateManifest = manifestReference;
    assembly.assembledStateSha256 = manifestReference.sha256;
    document.results[2].run.startStateManifest = manifestReference;
    document.results[2].run.startStateSha256 = manifestReference.sha256;
    assembly.conflicts.entries.push({
      path: pageCssPath,
      kind: "assembly-normalization",
      expectedSha256,
      resolution: "Claimed as normalization despite changing non-blank source bytes.",
      assembledSha256: pageCss.sha256,
      evidence: "Synthetic negative fixture.",
    });
    assembly.conflicts.entries.sort((left: any, right: any) => compareCanonicalPaths(left.path, right.path));
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);

    const result = runScript(verifierPath, fixtureRoot);
    expect(outputOf(result)).toMatch(/assembly-normalization.*not accepted/i);
    expect(result.status).toBe(1);
    writeFileSync(manifestPath, originalManifest);
    rmSync(arbitraryObjectPath);
  });

  it("rejects the superseded reverse-reconstructed P3 start provenance", () => {
    const document = readYaml(baselinePath, fixtureRoot);
    const assembly = document.results[2].start.prerequisiteAssembly;
    const manifestPath = absolute(assembly.assembledStateManifest.path, fixtureRoot);
    const originalManifest = readFileSync(manifestPath, "utf8");
    const manifest = JSON.parse(originalManifest);
    manifest.capture.sourceRoot.path = "/private/tmp/rain-next-b2-p3-start.eu9xtS";
    const reference = writeManifest(fixtureRoot, assembly.assembledStateManifest.path, manifest);
    assembly.assembledStateManifest = reference;
    assembly.assembledStateSha256 = reference.sha256;
    document.results[2].run.startStateManifest = reference;
    document.results[2].run.startStateSha256 = reference.sha256;
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);

    const result = runScript(verifierPath, fixtureRoot);
    expect(outputOf(result)).toMatch(/capture\.sourceRoot\.path.*rain-next-b2-p3-actual-assembly/);
    expect(result.status).toBe(1);
    writeFileSync(manifestPath, originalManifest);
  });

  it("rejects an unmeasured metric without an explicit reason", () => {
    expect(existsSync(verifierPath)).toBe(true);
    if (!existsSync(verifierPath)) return;
    const document = readYaml(baselinePath, fixtureRoot);
    delete document.results[1].metrics.firstPass.reason;
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);
    const result = runScript(verifierPath, fixtureRoot);
    expect(outputOf(result)).toMatch(/firstPass.*reason/);
    expect(result.status).toBe(1);
  });

  it("rejects a zero substituted for an unexecuted numerical metric", () => {
    expect(existsSync(verifierPath)).toBe(true);
    if (!existsSync(verifierPath)) return;
    const document = readYaml(baselinePath, fixtureRoot);
    document.results[1].metrics.userCorrectionPrompts = {
      value: 0,
      evidence: "No trial was executed.",
    };
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);
    const result = runScript(verifierPath, fixtureRoot);
    expect(outputOf(result)).toMatch(/userCorrectionPrompts.*real-user-evaluation|evaluationSource/);
    expect(result.status).toBe(1);
  });

  it("rejects arbitrary continuation prose outside the fixed rubric", () => {
    const document = readYaml(baselinePath, fixtureRoot);
    document.metadata.trials = "in-progress";
    document.metadata.task2Status = "baseline-trials-in-progress";
    document.results[0].trialStatus = "in-progress";
    document.results[0].metrics.continuationAssessment = {
      value: "looks pretty understandable",
      rubricVersion: "1.0",
      assessmentSource: "recorded-run-review",
      evidence: "Synthetic validator fixture.",
    };
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);
    const result = runScript(verifierPath, fixtureRoot);
    expect(outputOf(result)).toMatch(/continuationAssessment.*fixed rubric|continuationAssessment.*clear/);
    expect(result.status).toBe(1);
  });

  it("rejects user correction counts without real-user provenance", () => {
    const document = readYaml(baselinePath, fixtureRoot);
    document.metadata.trials = "in-progress";
    document.metadata.task2Status = "baseline-trials-in-progress";
    document.results[0].trialStatus = "in-progress";
    document.results[0].metrics.userCorrectionPrompts = {
      value: 0,
      evidence: "The autonomous run emitted no follow-up prompt.",
    };
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);
    const result = runScript(verifierPath, fixtureRoot);
    expect(outputOf(result)).toMatch(/userCorrectionPrompts.*real-user-evaluation|evaluationSource/);
    expect(result.status).toBe(1);
  });

  it("keeps P2 visual hierarchy out of automated acceptance", () => {
    const document = readYaml(baselinePath, fixtureRoot);
    const visual = document.results[1].acceptanceEvidence.find(
      ({ criterionId }: any) => criterionId === "visual-hierarchy-appropriate",
    );
    visual.route = "automated";
    visual.assessment = { value: "pass", evidence: "A screenshot command said pass.", evidenceRefs: ["artifacts.screenshot"] };
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);
    const result = runScript(verifierPath, fixtureRoot);
    expect(outputOf(result)).toMatch(/visual-hierarchy-appropriate.*human-gate|human-gate.*not-measured/);
    expect(result.status).toBe(1);
  });

  it("rejects a premature Task 2 completion claim", () => {
    expect(existsSync(verifierPath)).toBe(true);
    if (!existsSync(verifierPath)) return;
    const document = readYaml(baselinePath, fixtureRoot);
    document.metadata.task2Status = "completed";
    document.metadata.trials = "completed";
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);
    const result = runScript(verifierPath, fixtureRoot);
    expect(outputOf(result)).toMatch(/task2Status|trials.*does not match/);
    expect(result.status).toBe(1);
  });

  it("requires completed trials to carry verifiable diff, screenshot and test evidence", () => {
    expect(existsSync(verifierPath)).toBe(true);
    if (!existsSync(verifierPath)) return;
    const governedEvidence = runScript(
      join(fixtureRoot, relative(workspaceRoot, boundaryVerifierPath)),
      fixtureRoot,
    );
    expect(outputOf(governedEvidence)).toMatch(/Boundary verification passed/);
    expect(governedEvidence.status).toBe(0);
    const document = readYaml(baselinePath, fixtureRoot);
    document.metadata.trials = "completed";
    document.metadata.task2Status = "trials-recorded-awaiting-review";
    document.fixture.status = "prepared";
    delete document.fixture.reason;
    document.fixture.sourceProvenance = sourceProvenance(nativeSourceRoots.fixture);
    const commonFunctionalState = buildFunctionalState(fixtureRoot);
    document.fixture.stateManifest = writeManifest(
      fixtureRoot,
      "evidence/runtime/tailwind-b2/trials/common-fixture.state.log",
      {
        schemaVersion: "1.0",
        kind: "TailwindB2FixtureStateManifest",
        capture: capture(nativeSourceRoots.fixture),
        controls: {
          Input: { packageName: "@rain-next/ui", packageVersion: "0.0.0" },
          Button: { packageName: "@rain-next/ui", packageVersion: "0.0.0" },
        },
        route: fixtureRoute,
        viewport: fixtureViewport,
        selectors: fixtureSelectors,
        lighterSurfaceResolution,
        functionalState: commonFunctionalState,
      },
    );
    const benchmark = readYaml(benchmarkPath, fixtureRoot);
    const protocolSha256 = hashValue(JSON.stringify(benchmark));
    const endFunctionalStates = [
      buildFunctionalState(fixtureRoot, {
        "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css": "p1-local-input",
      }),
      buildFunctionalState(fixtureRoot, {
        "apps/playground/src/experiments/tailwind-b2-native-baseline/page.tsx": "p2-local-button",
      }),
      buildFunctionalState(fixtureRoot, {
        "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css": "p1-local-input",
        "apps/playground/src/experiments/tailwind-b2-native-baseline/page.tsx": "p2-local-button",
        "apps/playground/src/experiments/tailwind-b2-native-baseline/local-search-input.tsx": "p3-local-part",
      }),
    ];
    const assembledFunctionalState = buildFunctionalState(fixtureRoot, {
      "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css": "p1-local-input",
      "apps/playground/src/experiments/tailwind-b2-native-baseline/page.tsx": "p2-local-button",
    });

    for (const [index, trial] of document.results.entries()) {
      const slug = trial.promptId.toLowerCase();
      const artifactDirectory = absolute("evidence/runtime/tailwind-b2/trials", fixtureRoot);
      mkdirSync(artifactDirectory, { recursive: true });
      const diffPath = `evidence/runtime/tailwind-b2/trials/${slug}.patch`;
      const screenshotPath = `evidence/runtime/tailwind-b2/trials/${slug}.png`;
      const testPath = `evidence/runtime/tailwind-b2/trials/${slug}.test.log`;
      cpSync(
        absolute("evidence/runtime/day-3/core-ui-page.png", fixtureRoot),
        absolute(screenshotPath, fixtureRoot),
      );
      const screenshotMetadata = inspectPngMetadata(
        readFileSync(absolute(screenshotPath, fixtureRoot)),
      );
      writeFileSync(absolute(testPath, fixtureRoot), "Tests passed: 1\n");

      trial.trialStatus = "completed";
      let startStateManifest = document.fixture.stateManifest;
      let startFunctionalState = commonFunctionalState;
      if (trial.promptId === "B2-P3-REUSE-AND-PARTS") {
        const sourcePatches = document.results.slice(0, 2).map((source: any) => ({
          promptId: source.promptId,
          path: source.artifacts.diff.path,
          sha256: source.artifacts.diff.sha256,
        }));
        const resolutionPatchPath = "evidence/runtime/tailwind-b2/trials/p2-after-p1-resolution.patch";
        writeTransitionPatch(
          fixtureRoot,
          resolutionPatchPath,
          endFunctionalStates[0],
          assembledFunctionalState,
        );
        const resolutionPatch = {
          status: "captured",
          path: resolutionPatchPath,
          byteSize: readFileSync(absolute(resolutionPatchPath, fixtureRoot)).length,
          sha256: hash(absolute(resolutionPatchPath, fixtureRoot)),
        };
        startFunctionalState = assembledFunctionalState;
        startStateManifest = writeManifest(
          fixtureRoot,
          "evidence/runtime/tailwind-b2/trials/p3-assembled.state.log",
          {
            schemaVersion: "1.0",
            kind: "TailwindB2AssembledStateManifest",
            capture: capture(nativeSourceRoots.assembled),
            promptId: trial.promptId,
            applicationOrder: promptIds.slice(0, 2),
            sourcePatches,
            resolutionPatch,
            functionalState: assembledFunctionalState,
          },
        );
        trial.start.savedState = {
          status: "recorded",
          sourcePromptIds: promptIds.slice(0, 2),
          documentPath: baselinePath,
          resultPointers: ["/results/0", "/results/1"],
        };
        trial.start.prerequisiteAssembly = {
          status: "recorded",
          applicationOrder: promptIds.slice(0, 2),
          sourcePatches,
          resolutionPatch,
          assembledStateManifest: startStateManifest,
          assembledStateSha256: startStateManifest.sha256,
          conflicts: {
            status: "none",
            entries: [],
            evidence: "P1 then P2 applied without a conflict.",
          },
          costExcludedFromP3: true,
        };
      }
      writeTransitionPatch(
        fixtureRoot,
        diffPath,
        startFunctionalState,
        endFunctionalStates[index],
      );
      const runManifest = writeManifest(
        fixtureRoot,
        `evidence/runtime/tailwind-b2/trials/${slug}.run.log`,
        {
          schemaVersion: "1.0",
          kind: "TailwindB2RunManifest",
          runId: `synthetic-${trial.promptId}`,
          promptId: trial.promptId,
          architecture: trial.architecture,
        },
      );
      const endStateManifest = writeManifest(
        fixtureRoot,
        `evidence/runtime/tailwind-b2/trials/${slug}.end.state.log`,
        {
          schemaVersion: "1.0",
          kind: "TailwindB2TrialStateManifest",
          stage: "end",
          promptId: trial.promptId,
          architecture: trial.architecture,
          capture: capture(nativeSourceRoots.runs[index]!),
          functionalState: endFunctionalStates[index],
        },
      );
      trial.run = {
        status: "recorded",
        runId: `synthetic-${trial.promptId}`,
        runManifest,
        startStateManifest,
        endStateManifest,
        runSha256: runManifest.sha256,
        protocolSha256,
        promptSha256: hashValue(promptTexts[index]!),
        startStateSha256: startStateManifest.sha256,
        endStateSha256: endStateManifest.sha256,
        model: {
          value: "unexposed",
          provenance: "runtime-not-exposed",
          reason: "The collaborating agent runtime did not expose its model identifier.",
        },
        reasoningEffort: {
          value: "unexposed",
          provenance: "runtime-not-exposed",
          reason: "The collaborating agent runtime did not expose its reasoning effort.",
        },
        sourceProvenance: sourceProvenance(nativeSourceRoots.runs[index]!),
        context: index < 2 ? "fresh-independent-common-fixture" : "saved-prerequisite-assembly",
        route: fixtureRoute,
        viewport: fixtureViewport,
        browser: { name: "chromium", version: "synthetic-test" },
        selectors: {
          target: runTargetSelector,
          nonTarget: fixtureSelectors.nonTarget,
          formalSearchIcon: fixtureSelectors.formalSearchIcon,
        },
      };
      trial.metrics = {
        firstPass: index === 1
          ? { value: "not-measured", reason: "P2 visual hierarchy requires the separate Human Gate." }
          : { value: "pass", evidence: "Observed against the frozen acceptance criteria." },
        userCorrectionPrompts: { value: "not-measured", reason: "No real-user evaluation was conducted in this synthetic trial." },
        autonomousRepairCycles: { value: 0, evidence: "The recorded autonomous run needed no repair cycle." },
        scopeAccuracy: { value: "pass", evidence: "The recorded diff stayed in the intended feature." },
        continuationAssessment: index === 2
          ? {
              value: "clear",
              rubricVersion: "1.0",
              assessmentSource: "recorded-run-review",
              evidence: "P3 matched the fixed clear continuation rubric.",
            }
          : {
              value: "not-measured",
              reason: "Only P3 measures continuation from the assembled P1 and P2 state.",
            },
        elapsedMs: { value: 1000 + index, evidence: "Measured by the trial runner as secondary evidence." },
      };
      const changedFunctionalPath = [
        "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css",
        "apps/playground/src/experiments/tailwind-b2-native-baseline/page.tsx",
        "apps/playground/src/experiments/tailwind-b2-native-baseline/local-search-input.tsx",
      ][index]!;
      trial.observations = {
        changedFiles: { value: [changedFunctionalPath], evidence: "Recorded from the trial diff and functional state transition." },
        globalMasterChanged: { value: false, evidence: "The recorded diff contains no shared Master path." },
        unregisteredVisualValues: { value: false, evidence: "The targeted contract scan passed." },
      };
      const masterSubject = index === 1 ? "Button Master" : "Input Master";
      trial.protectedComparisons = {
        globalMaster: {
          status: "recorded",
          subject: masterSubject,
          beforeSha256: hashValue(`${masterSubject}-unchanged`),
          afterSha256: hashValue(`${masterSubject}-unchanged`),
          verdict: "unchanged",
          evidenceRefs: ["artifacts.diff"],
          evidence: "Before and after Master snapshots match.",
        },
        nonTarget: {
          status: "recorded",
          subject: "non-target-control",
          beforeSha256: hashValue(`non-target-${index}`),
          afterSha256: hashValue(`non-target-${index}`),
          verdict: "unchanged",
          evidenceRefs: ["artifacts.screenshot", "artifacts.targetedTests"],
          evidence: "Before and after non-target snapshots match.",
        },
        formalSearchIcon: {
          status: "recorded",
          subject: "@rain-next/ui/icons/search",
          beforeSha256: hashValue("formal-search-icon"),
          afterSha256: hashValue("formal-search-icon"),
          verdict: "unchanged",
          evidenceRefs: ["artifacts.diff", "artifacts.screenshot"],
          evidence: "The formal icon import and rendered snapshot match.",
        },
      };
      const criteria = benchmark.acceptanceCriteria.find(({ promptId }: any) => promptId === trial.promptId).criteria;
      trial.acceptanceEvidence = criteria.map((criterion: any) => ({
        criterionId: criterion.id,
        route: criterion.route,
        assessment: criterion.route === "human-gate"
          ? { value: "not-measured", reason: "Visual appropriateness awaits the separate Human Gate." }
          : {
              value: "pass",
              evidenceRefs: criterion.evidenceRefs,
              evidence: "Synthetic evidence exercises the completed-record schema only.",
            },
      }));
      trial.artifacts = {
        diff: {
          status: "captured",
          path: diffPath,
          byteSize: readFileSync(absolute(diffPath, fixtureRoot)).length,
          sha256: hash(absolute(diffPath, fixtureRoot)),
        },
        screenshot: {
          status: "captured",
          path: screenshotPath,
          byteSize: readFileSync(absolute(screenshotPath, fixtureRoot)).length,
          sha256: hash(absolute(screenshotPath, fixtureRoot)),
          width: screenshotMetadata.width,
          height: screenshotMetadata.height,
        },
        targetedTests: {
          status: "passed",
          command: "pnpm test -- trial.test.ts",
          exitCode: 0,
          path: testPath,
          byteSize: readFileSync(absolute(testPath, fixtureRoot)).length,
          sha256: hash(absolute(testPath, fixtureRoot)),
        },
      };
    }

    const stateReferences = [
      document.fixture.stateManifest,
      ...document.results.map((trial: any) => trial.run.endStateManifest),
      document.results[2].start.prerequisiteAssembly.assembledStateManifest,
    ];
    const originalStateSources = new Map<string, string>();
    const weakStateReferences = new Map<string, any>();
    for (const reference of stateReferences) {
      if (weakStateReferences.has(reference.path)) continue;
      const manifestPath = absolute(reference.path, fixtureRoot);
      const originalSource = readFileSync(manifestPath, "utf8");
      originalStateSources.set(reference.path, originalSource);
      const weakBody = JSON.parse(originalSource);
      delete weakBody.functionalState;
      weakStateReferences.set(
        reference.path,
        writeManifest(fixtureRoot, reference.path, weakBody),
      );
    }
    const missingFunctionalState = structuredClone(document);
    missingFunctionalState.fixture.stateManifest = weakStateReferences.get(
      document.fixture.stateManifest.path,
    );
    for (const [index, trial] of missingFunctionalState.results.entries()) {
      const originalTrial = document.results[index];
      trial.run.endStateManifest = weakStateReferences.get(originalTrial.run.endStateManifest.path);
      trial.run.endStateSha256 = trial.run.endStateManifest.sha256;
      trial.run.startStateManifest = index < 2
        ? missingFunctionalState.fixture.stateManifest
        : weakStateReferences.get(
            document.results[2].start.prerequisiteAssembly.assembledStateManifest.path,
          );
      trial.run.startStateSha256 = trial.run.startStateManifest.sha256;
    }
    const weakAssembly = missingFunctionalState.results[2].start.prerequisiteAssembly;
    weakAssembly.assembledStateManifest = missingFunctionalState.results[2].run.startStateManifest;
    weakAssembly.assembledStateSha256 = weakAssembly.assembledStateManifest.sha256;
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(missingFunctionalState)}\n`);
    const missingFunctionalStateResult = runScript(verifierPath, fixtureRoot);
    expect(outputOf(missingFunctionalStateResult)).toMatch(/functionalState/);
    expect(missingFunctionalStateResult.status).toBe(1);
    for (const [filePath, source] of originalStateSources) {
      writeFileSync(absolute(filePath, fixtureRoot), source);
    }

    const oldWeakDocument = structuredClone(document);
    oldWeakDocument.fixture.commonStateSha256 = oldWeakDocument.fixture.stateManifest.sha256;
    delete oldWeakDocument.fixture.stateManifest;
    for (const trial of oldWeakDocument.results) {
      delete trial.run.runManifest;
      delete trial.run.startStateManifest;
      delete trial.run.endStateManifest;
      trial.run.model = "synthetic-test-model";
      trial.run.reasoningEffort = "medium";
    }
    oldWeakDocument.results[2].start.savedState = {
      status: "recorded",
      sourcePromptIds: promptIds.slice(0, 2),
      reference: "baseline-results.yaml#results",
    };
    delete oldWeakDocument.results[2].start.prerequisiteAssembly.assembledStateManifest;
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(oldWeakDocument)}\n`);
    const oldWeak = runScript(verifierPath, fixtureRoot);
    expect(outputOf(oldWeak)).toMatch(/stateManifest|runManifest|savedState|assembledStateManifest/);
    expect(oldWeak.status).toBe(1);

    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);
    const valid = runScript(verifierPath, fixtureRoot);
    expect(outputOf(valid)).toMatch(/sealed native baseline.*mismatch/i);
    expect(valid.status).toBe(1);

    const unnecessaryLedger = structuredClone(document);
    const unnecessaryAssemblyPath = absolute(
      unnecessaryLedger.results[2].start.prerequisiteAssembly.assembledStateManifest.path,
      fixtureRoot,
    );
    const unnecessaryAssembly = JSON.parse(readFileSync(unnecessaryAssemblyPath, "utf8"));
    const unnecessaryPath = "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css";
    const unnecessaryHash = unnecessaryAssembly.functionalState.files.find(
      ({ path }: any) => path === unnecessaryPath,
    ).sha256;
    unnecessaryLedger.results[2].start.prerequisiteAssembly.conflicts = {
      status: "resolved",
      entries: [{
        path: unnecessaryPath,
        kind: "assembly-normalization",
        expectedSha256: unnecessaryHash,
        resolution: "Synthetic extra ledger entry that did not alter the default merged state.",
        assembledSha256: unnecessaryHash,
        evidence: "Synthetic negative fixture.",
      }],
      evidence: "Synthetic negative fixture with an unnecessary exception.",
    };
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(unnecessaryLedger)}\n`);
    const unnecessaryLedgerResult = runScript(verifierPath, fixtureRoot);
    expect(outputOf(unnecessaryLedgerResult)).toMatch(/conflicts\.entries.*not needed|unnecessary assembly exception/);
    expect(unnecessaryLedgerResult.status).toBe(1);

    const resolvedLedger = structuredClone(document);
    const p1EndManifestPath = absolute(resolvedLedger.results[0].run.endStateManifest.path, fixtureRoot);
    const p2EndManifestPath = absolute(resolvedLedger.results[1].run.endStateManifest.path, fixtureRoot);
    const resolvedAssemblyPath = absolute(
      resolvedLedger.results[2].start.prerequisiteAssembly.assembledStateManifest.path,
      fixtureRoot,
    );
    const p3EndManifestPath = absolute(resolvedLedger.results[2].run.endStateManifest.path, fixtureRoot);
    const originalResolvedSources = new Map([
      [p1EndManifestPath, readFileSync(p1EndManifestPath, "utf8")],
      [p2EndManifestPath, readFileSync(p2EndManifestPath, "utf8")],
      [resolvedAssemblyPath, readFileSync(resolvedAssemblyPath, "utf8")],
      [p3EndManifestPath, readFileSync(p3EndManifestPath, "utf8")],
    ]);
    const e2ePath = "tests/e2e/tailwind-b2-native-baseline.spec.ts";
    const originalPatchSources = new Map<string, string>();
    for (const artifact of [
      ...resolvedLedger.results.map((trial: any) => trial.artifacts.diff),
      resolvedLedger.results[2].start.prerequisiteAssembly.resolutionPatch,
    ]) {
      originalPatchSources.set(artifact.path, readFileSync(absolute(artifact.path, fixtureRoot), "utf8"));
    }

    const p1EndBody = JSON.parse(originalResolvedSources.get(p1EndManifestPath)!);
    setFunctionalSource(fixtureRoot, p1EndBody.functionalState, e2ePath, "p1-e2e-change\n");
    const p1E2eHash = p1EndBody.functionalState.files.find(({ path }: any) => path === e2ePath).sha256;
    const p1EndReference = writeManifest(
      fixtureRoot,
      resolvedLedger.results[0].run.endStateManifest.path,
      p1EndBody,
    );
    resolvedLedger.results[0].run.endStateManifest = p1EndReference;
    resolvedLedger.results[0].run.endStateSha256 = p1EndReference.sha256;
    resolvedLedger.results[0].observations.changedFiles.value = [
      "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css",
      e2ePath,
    ];
    writeTransitionPatch(
      fixtureRoot,
      resolvedLedger.results[0].artifacts.diff.path,
      commonFunctionalState,
      p1EndBody.functionalState,
    );
    resolvedLedger.results[0].artifacts.diff.byteSize = readFileSync(
      absolute(resolvedLedger.results[0].artifacts.diff.path, fixtureRoot),
    ).length;
    resolvedLedger.results[0].artifacts.diff.sha256 = hash(
      absolute(resolvedLedger.results[0].artifacts.diff.path, fixtureRoot),
    );

    const p2EndBody = JSON.parse(originalResolvedSources.get(p2EndManifestPath)!);
    setFunctionalSource(fixtureRoot, p2EndBody.functionalState, e2ePath, "p2-e2e-change\n");
    const p2EndReference = writeManifest(
      fixtureRoot,
      resolvedLedger.results[1].run.endStateManifest.path,
      p2EndBody,
    );
    resolvedLedger.results[1].run.endStateManifest = p2EndReference;
    resolvedLedger.results[1].run.endStateSha256 = p2EndReference.sha256;
    resolvedLedger.results[1].observations.changedFiles.value = [
      "apps/playground/src/experiments/tailwind-b2-native-baseline/page.tsx",
      e2ePath,
    ];
    writeTransitionPatch(
      fixtureRoot,
      resolvedLedger.results[1].artifacts.diff.path,
      commonFunctionalState,
      p2EndBody.functionalState,
    );
    resolvedLedger.results[1].artifacts.diff.byteSize = readFileSync(
      absolute(resolvedLedger.results[1].artifacts.diff.path, fixtureRoot),
    ).length;
    resolvedLedger.results[1].artifacts.diff.sha256 = hash(
      absolute(resolvedLedger.results[1].artifacts.diff.path, fixtureRoot),
    );

    const resolvedAssemblyBody = JSON.parse(originalResolvedSources.get(resolvedAssemblyPath)!);
    setFunctionalSource(fixtureRoot, resolvedAssemblyBody.functionalState, e2ePath, "resolved-p1-p2-e2e-merge\n");
    const assembledE2eHash = resolvedAssemblyBody.functionalState.files.find(({ path }: any) => path === e2ePath).sha256;
    const sourcePatches = resolvedLedger.results.slice(0, 2).map((source: any) => ({
      promptId: source.promptId,
      path: source.artifacts.diff.path,
      sha256: source.artifacts.diff.sha256,
    }));
    const resolutionPatchPath = resolvedLedger.results[2].start.prerequisiteAssembly.resolutionPatch.path;
    writeTransitionPatch(
      fixtureRoot,
      resolutionPatchPath,
      p1EndBody.functionalState,
      resolvedAssemblyBody.functionalState,
    );
    const resolutionPatch = {
      status: "captured",
      path: resolutionPatchPath,
      byteSize: readFileSync(absolute(resolutionPatchPath, fixtureRoot)).length,
      sha256: hash(absolute(resolutionPatchPath, fixtureRoot)),
    };
    resolvedAssemblyBody.sourcePatches = sourcePatches;
    resolvedAssemblyBody.resolutionPatch = resolutionPatch;
    const resolvedAssemblyReference = writeManifest(
      fixtureRoot,
      resolvedLedger.results[2].start.prerequisiteAssembly.assembledStateManifest.path,
      resolvedAssemblyBody,
    );
    resolvedLedger.results[2].start.prerequisiteAssembly.assembledStateManifest = resolvedAssemblyReference;
    resolvedLedger.results[2].start.prerequisiteAssembly.assembledStateSha256 = resolvedAssemblyReference.sha256;
    resolvedLedger.results[2].run.startStateManifest = resolvedAssemblyReference;
    resolvedLedger.results[2].run.startStateSha256 = resolvedAssemblyReference.sha256;
    resolvedLedger.results[2].start.prerequisiteAssembly.sourcePatches = sourcePatches;
    resolvedLedger.results[2].start.prerequisiteAssembly.resolutionPatch = resolutionPatch;
    resolvedLedger.results[2].start.prerequisiteAssembly.conflicts = {
      status: "resolved",
      entries: [
        {
          path: e2ePath,
          kind: "both-sources-changed",
          expectedSha256: p1E2eHash,
          resolution: "Merged the independently recorded P1 and P2 assertions in P1 then P2 order.",
          assembledSha256: assembledE2eHash,
          evidence: "Both source patches modify the same E2E file and the assembled state preserves both assertions.",
        },
      ],
      evidence: "The structured ledger records every actual deviation from the default path-wise merge.",
    };

    const p3EndBody = JSON.parse(originalResolvedSources.get(p3EndManifestPath)!);
    setFunctionalSource(fixtureRoot, p3EndBody.functionalState, e2ePath, "resolved-p1-p2-e2e-merge\n");
    const p3EndReference = writeManifest(
      fixtureRoot,
      resolvedLedger.results[2].run.endStateManifest.path,
      p3EndBody,
    );
    resolvedLedger.results[2].run.endStateManifest = p3EndReference;
    resolvedLedger.results[2].run.endStateSha256 = p3EndReference.sha256;
    writeTransitionPatch(
      fixtureRoot,
      resolvedLedger.results[2].artifacts.diff.path,
      resolvedAssemblyBody.functionalState,
      p3EndBody.functionalState,
    );
    resolvedLedger.results[2].artifacts.diff.byteSize = readFileSync(
      absolute(resolvedLedger.results[2].artifacts.diff.path, fixtureRoot),
    ).length;
    resolvedLedger.results[2].artifacts.diff.sha256 = hash(
      absolute(resolvedLedger.results[2].artifacts.diff.path, fixtureRoot),
    );

    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(resolvedLedger)}\n`);
    const validResolvedLedger = runScript(verifierPath, fixtureRoot);
    expect(outputOf(validResolvedLedger)).toMatch(/sealed native baseline.*mismatch/i);
    expect(validResolvedLedger.status).toBe(1);

    const invalidLedgerCases = [
      {
        label: "duplicate ledger path",
        mutate: (candidate: any) => candidate.results[2].start.prerequisiteAssembly.conflicts.entries.push(
          structuredClone(candidate.results[2].start.prerequisiteAssembly.conflicts.entries[0]),
        ),
        expected: /conflicts\.entries.*duplicate/,
      },
      {
        label: "ledger expected hash does not match the P1 resolution input",
        mutate: (candidate: any) => {
          candidate.results[2].start.prerequisiteAssembly.conflicts.entries[0].expectedSha256 = hashValue("wrong-expected-hash");
        },
        expected: /expectedSha256.*P1.*input/,
      },
      {
        label: "ledger hash does not match assembled state",
        mutate: (candidate: any) => {
          candidate.results[2].start.prerequisiteAssembly.conflicts.entries[0].assembledSha256 = hashValue("wrong-assembled-hash");
        },
        expected: /assembledSha256.*assembled functionalState|conflicts\.entries.*hash/,
      },
      {
        label: "ledger kind does not describe a permitted exception",
        mutate: (candidate: any) => {
          candidate.results[2].start.prerequisiteAssembly.conflicts.entries[0].kind = "arbitrary-exception";
        },
        expected: /conflicts\.entries.*kind/,
      },
    ];
    for (const ledgerCase of invalidLedgerCases) {
      const candidate = structuredClone(resolvedLedger);
      ledgerCase.mutate(candidate);
      writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(candidate)}\n`);
      const rejectedLedger = runScript(verifierPath, fixtureRoot);
      expect(outputOf(rejectedLedger), ledgerCase.label).toMatch(ledgerCase.expected);
      expect(rejectedLedger.status, ledgerCase.label).toBe(1);
    }

    for (const [filePath, source] of originalResolvedSources) {
      writeFileSync(filePath, source);
    }
    for (const [filePath, source] of originalPatchSources) {
      writeFileSync(absolute(filePath, fixtureRoot), source);
    }
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);

    expect(document.results[0].run.startStateManifest).toEqual(document.fixture.stateManifest);
    expect(document.results[1].run.startStateManifest).toEqual(document.fixture.stateManifest);
    expect(document.results[2].run.startStateManifest).toEqual(
      document.results[2].start.prerequisiteAssembly.assembledStateManifest,
    );

    const runManifestPath = absolute(document.results[0].run.runManifest.path, fixtureRoot);
    const originalRunManifest = readFileSync(runManifestPath, "utf8");
    writeFileSync(runManifestPath, `${originalRunManifest}tampered\n`);
    const tamperedRunManifest = runScript(verifierPath, fixtureRoot);
    expect(outputOf(tamperedRunManifest)).toMatch(/runManifest.*SHA-256|SHA-256.*runManifest/);
    expect(tamperedRunManifest.status).toBe(1);
    writeFileSync(runManifestPath, originalRunManifest);

    const assembledManifestPath = absolute(
      document.results[2].start.prerequisiteAssembly.assembledStateManifest.path,
      fixtureRoot,
    );
    const originalAssembledManifest = readFileSync(assembledManifestPath, "utf8");
    writeFileSync(assembledManifestPath, `${originalAssembledManifest}tampered\n`);
    const tamperedAssembly = runScript(verifierPath, fixtureRoot);
    expect(outputOf(tamperedAssembly)).toMatch(/assembledStateManifest.*SHA-256|SHA-256.*assembledStateManifest/);
    expect(tamperedAssembly.status).toBe(1);
    writeFileSync(assembledManifestPath, originalAssembledManifest);

    const fixtureManifestPath = absolute(document.fixture.stateManifest.path, fixtureRoot);
    const originalFixtureManifest = readFileSync(fixtureManifestPath, "utf8");
    const invalidFixtureBody = JSON.parse(originalFixtureManifest);
    invalidFixtureBody.route = "/#unregistered-fixture";
    const invalidFixtureRef = writeManifest(
      fixtureRoot,
      document.fixture.stateManifest.path,
      invalidFixtureBody,
    );
    const invalidFixture = structuredClone(document);
    invalidFixture.fixture.stateManifest = invalidFixtureRef;
    for (const trial of invalidFixture.results.slice(0, 2)) {
      trial.run.startStateManifest = invalidFixtureRef;
      trial.run.startStateSha256 = invalidFixtureRef.sha256;
    }
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(invalidFixture)}\n`);
    const invalidFixtureResult = runScript(verifierPath, fixtureRoot);
    expect(outputOf(invalidFixtureResult)).toMatch(/fixture state manifest.*route|stateManifest.*tailwind-b2-native-baseline/);
    expect(invalidFixtureResult.status).toBe(1);
    writeFileSync(fixtureManifestPath, originalFixtureManifest);

    const functionalStateCases: Array<{
      label: string;
      mutate: (functionalState: any) => void;
      expected: RegExp;
    }> = [
      {
        label: "functional paths are not sorted",
        mutate: (functionalState) => {
          functionalState.files.reverse();
          rehashFunctionalState(functionalState);
        },
        expected: /functionalState\.files.*sorted|functionalState.*path order/,
      },
      {
        label: "functional paths are duplicated",
        mutate: (functionalState) => {
          functionalState.files.push(structuredClone(functionalState.files[0]));
          functionalState.files.sort((left: any, right: any) => compareCanonicalPaths(left.path, right.path));
          functionalState.fileCount = functionalState.files.length;
          rehashFunctionalState(functionalState);
        },
        expected: /functionalState.*duplicate|duplicate.*functionalState/,
      },
      {
        label: "a functional file hash is malformed",
        mutate: (functionalState) => {
          functionalState.files[0].sha256 = "not-a-sha";
          rehashFunctionalState(functionalState);
        },
        expected: /functionalState.*sha256.*lowercase SHA-256/,
      },
      {
        label: "functional fileCount disagrees with the inventory",
        mutate: (functionalState) => {
          functionalState.fileCount += 1;
        },
        expected: /functionalState\.fileCount.*files/,
      },
      {
        label: "functional treeSha256 is not derived from the inventory",
        mutate: (functionalState) => {
          functionalState.treeSha256 = hashValue("not-the-functional-tree");
        },
        expected: /functionalState\.treeSha256.*computed|functionalState\.treeSha256.*match/,
      },
      {
        label: "functional inventory omits a protected Master",
        mutate: (functionalState) => {
          functionalState.files = functionalState.files.filter(
            ({ path }: any) => path !== "packages/ui/src/input/input.tsx",
          );
          functionalState.fileCount = functionalState.files.length;
          rehashFunctionalState(functionalState);
        },
        expected: /functionalState.*required.*packages\/ui\/src\/input\/input\.tsx/,
      },
      {
        label: "functional logical paths reject backslashes",
        mutate: (functionalState) => {
          functionalState.files[0].path = "apps\\playground\\src\\app.tsx";
          rehashFunctionalState(functionalState);
        },
        expected: /canonical repository-relative POSIX path/,
      },
      {
        label: "functional logical paths reject dot segments",
        mutate: (functionalState) => {
          functionalState.files[0].path = "apps/playground/../playground/src/app.tsx";
          rehashFunctionalState(functionalState);
        },
        expected: /canonical repository-relative POSIX path/,
      },
      {
        label: "functional logical paths reject control characters",
        mutate: (functionalState) => {
          functionalState.files[0].path = "apps/playground/src/app.tsx\u0000";
          rehashFunctionalState(functionalState);
        },
        expected: /canonical repository-relative POSIX path/,
      },
      {
        label: "functional logical paths reject unpaired Unicode surrogates",
        mutate: (functionalState) => {
          functionalState.files[0].path = "apps/playground/src/\uD800.tsx";
          rehashFunctionalState(functionalState);
        },
        expected: /canonical repository-relative POSIX path.*well-formed Unicode|well-formed Unicode.*canonical/i,
      },
      {
        label: "functional logical paths reject non-NFC Unicode",
        mutate: (functionalState) => {
          functionalState.files[0].path = "apps/playground/src/e\u0301.tsx";
          rehashFunctionalState(functionalState);
        },
        expected: /canonical repository-relative POSIX path.*NFC|NFC.*canonical/i,
      },
    ];
    for (const stateCase of functionalStateCases) {
      const invalidBody = JSON.parse(originalFixtureManifest);
      stateCase.mutate(invalidBody.functionalState);
      const stateReference = writeManifest(
        fixtureRoot,
        document.fixture.stateManifest.path,
        invalidBody,
      );
      const invalidState = structuredClone(document);
      invalidState.fixture.stateManifest = stateReference;
      for (const trial of invalidState.results.slice(0, 2)) {
        trial.run.startStateManifest = stateReference;
        trial.run.startStateSha256 = stateReference.sha256;
      }
      writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(invalidState)}\n`);
      const rejectedState = runScript(verifierPath, fixtureRoot);
      expect(outputOf(rejectedState), stateCase.label).toMatch(stateCase.expected);
      expect(rejectedState.status, stateCase.label).toBe(1);
      writeFileSync(fixtureManifestPath, originalFixtureManifest);
    }

    const objectCases: Array<{
      label: string;
      mutate: (functionalState: any) => (() => void) | void;
      expected: RegExp;
    }> = [
      {
        label: "a forged digest and recomputed tree cannot replace real bytes",
        mutate: (functionalState) => {
          const entry = functionalState.files[0];
          entry.sha256 = hashValue("forged digest unrelated to stored bytes");
          entry.objectPath = `${stateObjectPrefix}${entry.sha256}.blob`;
          entry.byteSize = 5;
          mkdirSync(dirname(absolute(entry.objectPath, fixtureRoot)), { recursive: true });
          writeFileSync(absolute(entry.objectPath, fixtureRoot), "other");
          rehashFunctionalState(functionalState);
        },
        expected: /stored state object bytes|object filename.*stored state object/,
      },
      {
        label: "a referenced state object cannot be missing",
        mutate: (functionalState) => {
          const entry = functionalState.files[0];
          const objectPath = absolute(entry.objectPath, fixtureRoot);
          const source = readFileSync(objectPath);
          rmSync(objectPath);
          return () => writeFileSync(objectPath, source);
        },
        expected: /state object is missing/,
      },
      {
        label: "a referenced state object cannot be tampered",
        mutate: (functionalState) => {
          const entry = functionalState.files[0];
          const objectPath = absolute(entry.objectPath, fixtureRoot);
          const source = readFileSync(objectPath);
          writeFileSync(objectPath, Buffer.concat([source, Buffer.from("tampered")]));
          return () => writeFileSync(objectPath, source);
        },
        expected: /byteSize.*stored state object|stored state object bytes/,
      },
      {
        label: "objectPath cannot point at a different valid object",
        mutate: (functionalState) => {
          functionalState.files[0].objectPath = functionalState.files[1].objectPath;
        },
        expected: /objectPath.*derived from sha256/,
      },
    ];
    for (const objectCase of objectCases) {
      const invalidBody = JSON.parse(originalFixtureManifest);
      const restore = objectCase.mutate(invalidBody.functionalState);
      const stateReference = writeManifest(
        fixtureRoot,
        document.fixture.stateManifest.path,
        invalidBody,
      );
      const invalidState = structuredClone(document);
      invalidState.fixture.stateManifest = stateReference;
      for (const trial of invalidState.results.slice(0, 2)) {
        trial.run.startStateManifest = stateReference;
        trial.run.startStateSha256 = stateReference.sha256;
      }
      writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(invalidState)}\n`);
      const rejectedState = runScript(verifierPath, fixtureRoot);
      expect(outputOf(rejectedState), objectCase.label).toMatch(objectCase.expected);
      expect(rejectedState.status, objectCase.label).toBe(1);
      restore?.();
      writeFileSync(fixtureManifestPath, originalFixtureManifest);
    }

    const unchangedEnd = structuredClone(document);
    const p1EndPath = absolute(document.results[0].run.endStateManifest.path, fixtureRoot);
    const originalP1End = readFileSync(p1EndPath, "utf8");
    const unchangedP1EndBody = JSON.parse(originalP1End);
    unchangedP1EndBody.functionalState = buildFunctionalState(fixtureRoot);
    const unchangedP1EndReference = writeManifest(
      fixtureRoot,
      document.results[0].run.endStateManifest.path,
      unchangedP1EndBody,
    );
    unchangedEnd.results[0].run.endStateManifest = unchangedP1EndReference;
    unchangedEnd.results[0].run.endStateSha256 = unchangedP1EndReference.sha256;
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(unchangedEnd)}\n`);
    const unchangedEndResult = runScript(verifierPath, fixtureRoot);
    expect(outputOf(unchangedEndResult)).toMatch(/end.*functionalState.*fixture functional.*change/);
    expect(unchangedEndResult.status).toBe(1);
    writeFileSync(p1EndPath, originalP1End);

    const changedProtected = structuredClone(document);
    const changedProtectedBody = JSON.parse(originalP1End);
    changedProtectedBody.functionalState = buildFunctionalState(fixtureRoot, {
      "apps/playground/src/experiments/tailwind-b2-native-baseline/page.css": "p1-local-input",
      "packages/ui/src/input/input.tsx": "changed-protected-input-master",
    });
    const changedProtectedReference = writeManifest(
      fixtureRoot,
      document.results[0].run.endStateManifest.path,
      changedProtectedBody,
    );
    changedProtected.results[0].run.endStateManifest = changedProtectedReference;
    changedProtected.results[0].run.endStateSha256 = changedProtectedReference.sha256;
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(changedProtected)}\n`);
    const changedProtectedResult = runScript(verifierPath, fixtureRoot);
    expect(outputOf(changedProtectedResult)).toMatch(/protected functional path.*packages\/ui\/src\/input\/input\.tsx.*unchanged/);
    expect(changedProtectedResult.status).toBe(1);
    writeFileSync(p1EndPath, originalP1End);

    const unchangedAssembly = structuredClone(document);
    const assemblyPath = absolute(
      document.results[2].start.prerequisiteAssembly.assembledStateManifest.path,
      fixtureRoot,
    );
    const originalAssembly = readFileSync(assemblyPath, "utf8");
    const unchangedAssemblyBody = JSON.parse(originalAssembly);
    unchangedAssemblyBody.functionalState = buildFunctionalState(fixtureRoot);
    const unchangedAssemblyReference = writeManifest(
      fixtureRoot,
      document.results[2].start.prerequisiteAssembly.assembledStateManifest.path,
      unchangedAssemblyBody,
    );
    const unchangedAssemblyRecord = unchangedAssembly.results[2].start.prerequisiteAssembly;
    unchangedAssemblyRecord.assembledStateManifest = unchangedAssemblyReference;
    unchangedAssemblyRecord.assembledStateSha256 = unchangedAssemblyReference.sha256;
    unchangedAssembly.results[2].run.startStateManifest = unchangedAssemblyReference;
    unchangedAssembly.results[2].run.startStateSha256 = unchangedAssemblyReference.sha256;
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(unchangedAssembly)}\n`);
    const unchangedAssemblyResult = runScript(verifierPath, fixtureRoot);
    expect(outputOf(unchangedAssemblyResult)).toMatch(/assembled.*functionalState.*common fixture.*change/);
    expect(unchangedAssemblyResult.status).toBe(1);
    writeFileSync(assemblyPath, originalAssembly);

    const consistencyCases: Array<{
      label: string;
      mutate: (candidate: any) => void;
      expected: RegExp;
    }> = [
      {
        label: "Master changed while acceptance and scope claim pass",
        mutate: (candidate) => {
          const trial = candidate.results[0];
          trial.protectedComparisons.globalMaster.afterSha256 = hashValue("changed-master");
          trial.protectedComparisons.globalMaster.verdict = "changed";
        },
        expected: /globalMaster.*acceptance.*pass|globalMaster.*scopeAccuracy.*fail/,
      },
      {
        label: "non-target changed while acceptance and scope claim pass",
        mutate: (candidate) => {
          const trial = candidate.results[0];
          trial.protectedComparisons.nonTarget.afterSha256 = hashValue("changed-non-target");
          trial.protectedComparisons.nonTarget.verdict = "changed";
        },
        expected: /nonTarget.*acceptance.*pass|nonTarget.*scopeAccuracy.*fail/,
      },
      {
        label: "formal icon changed while its acceptance claims pass",
        mutate: (candidate) => {
          const trial = candidate.results[0];
          trial.protectedComparisons.formalSearchIcon.afterSha256 = hashValue("changed-formal-icon");
          trial.protectedComparisons.formalSearchIcon.verdict = "changed";
        },
        expected: /formalSearchIcon.*acceptance.*pass/,
      },
      {
        label: "an automated acceptance fails while firstPass claims pass",
        mutate: (candidate) => {
          candidate.results[0].acceptanceEvidence[0].assessment.value = "fail";
        },
        expected: /automated criterion.*fail.*firstPass|firstPass.*automated criterion.*fail/,
      },
      {
        label: "targeted tests fail while firstPass claims pass",
        mutate: (candidate) => {
          candidate.results[0].artifacts.targetedTests.status = "failed";
          candidate.results[0].artifacts.targetedTests.exitCode = 1;
        },
        expected: /targetedTests.*failed.*firstPass|firstPass.*targetedTests.*failed/,
      },
    ];
    for (const consistencyCase of consistencyCases) {
      const candidate = structuredClone(document);
      consistencyCase.mutate(candidate);
      writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(candidate)}\n`);
      const rejected = runScript(verifierPath, fixtureRoot);
      expect(outputOf(rejected), consistencyCase.label).toMatch(consistencyCase.expected);
      expect(rejected.status, consistencyCase.label).toBe(1);
    }

    const honestFailure = structuredClone(document);
    honestFailure.results[0].acceptanceEvidence[0].assessment.value = "fail";
    honestFailure.results[0].metrics.firstPass = {
      value: "fail",
      evidence: "The automated target criterion failed on the recorded first pass.",
    };
    honestFailure.results[0].artifacts.targetedTests.status = "failed";
    honestFailure.results[0].artifacts.targetedTests.exitCode = 1;
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(honestFailure)}\n`);
    const honestFailureResult = runScript(verifierPath, fixtureRoot);
    expect(outputOf(honestFailureResult)).toMatch(/sealed native baseline.*mismatch/i);
    expect(honestFailureResult.status).toBe(1);

    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);

    document.results[0].metrics.continuationAssessment = {
      value: "clear",
      rubricVersion: "1.0",
      assessmentSource: "recorded-run-review",
      evidence: "P1 must not be counted as the continuation task.",
    };
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);
    const prematureContinuation = runScript(verifierPath, fixtureRoot);
    expect(outputOf(prematureContinuation)).toMatch(/P1.*continuationAssessment|continuationAssessment.*P1/);
    expect(prematureContinuation.status).toBe(1);

    document.results[0].metrics.continuationAssessment = {
      value: "not-measured",
      reason: "Only P3 measures continuation from the assembled P1 and P2 state.",
    };
    const replayRejected = structuredClone(document);
    const replayPatchPath = absolute(
      replayRejected.results[2].artifacts.diff.path,
      fixtureRoot,
    );
    const replayPatchSource = readFileSync(replayPatchPath, "utf8");
    writeFileSync(
      replayPatchPath,
      replayPatchSource.replace(/^@@[^\n]+/m, "@@ -9999,1 +9999,1 @@"),
    );
    replayRejected.results[2].artifacts.diff.byteSize = readFileSync(replayPatchPath).length;
    replayRejected.results[2].artifacts.diff.sha256 = hash(replayPatchPath);
    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(replayRejected)}\n`);
    const rejectedReplay = runScript(verifierPath, fixtureRoot);
    expect(outputOf(rejectedReplay)).toMatch(/patch must apply without fuzz|deterministic replay/);
    expect(rejectedReplay.status).toBe(1);
    writeFileSync(replayPatchPath, replayPatchSource);

    writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);
    writeFileSync(
      absolute("evidence/runtime/tailwind-b2/trials/b2-p1-local-input.patch", fixtureRoot),
      "tampered\n",
    );
    const tampered = runScript(verifierPath, fixtureRoot);
    expect(outputOf(tampered)).toMatch(/diff.*SHA-256|SHA-256.*diff/);
    expect(tampered.status).toBe(1);
  }, 60_000);
});

describe("Tailwind B2 Task 2 governance", () => {
  let fixtureRoot: string;

  beforeAll(() => {
    fixtureRoot = createHistoricalB2Fixture("rain-b2-boundary-");
  }, 60_000);

  afterAll(() => {
    if (fixtureRoot) rmSync(fixtureRoot, { recursive: true, force: true });
  }, 30_000);

  function mutate(filePath: string, content: string, script: "verify-boundaries.mjs" | "verify-workspace.mjs") {
    const target = absolute(filePath, fixtureRoot);
    const original = existsSync(target) ? readFileSync(target, "utf8") : undefined;
    try {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, content);
      return runScript(join(workspaceRoot, "scripts", script), fixtureRoot);
    } finally {
      if (original === undefined) rmSync(target, { force: true });
      else writeFileSync(target, original);
    }
  }

  it("keeps the Task 2 files while Task 5 promotes its verifier into governance", () => {
    const rootPackage = JSON.parse(readFileSync(absolute("package.json"), "utf8"));
    expect(rootPackage.scripts["verify:tailwind-b2"]).toBe(
      "node scripts/verify-tailwind-b2.mjs",
    );
    expect(rootPackage.scripts["verify:governance"]).toContain("verify:tailwind-b2");
    for (const script of ["verify-boundaries.mjs", "verify-workspace.mjs"]) {
      const result = runScript(join(workspaceRoot, "scripts", script), fixtureRoot);
      expect(outputOf(result)).toMatch(/verification passed/);
      expect(result.status).toBe(0);
    }
  });

  it("fails closed instead of blocking when the Task 2 baseline is a FIFO", () => {
    const filePath = absolute(baselinePath, fixtureRoot);
    const original = readFileSync(filePath);
    try {
      rmSync(filePath);
      expect(spawnSync("mkfifo", [filePath]).status).toBe(0);
      const result = runScript(boundaryVerifierPath, fixtureRoot, 1_000);
      expect(result.error).toBeUndefined();
      expect(outputOf(result)).toMatch(/Task 2.*baseline-results\.yaml.*regular file|Task 2 artifact.*regular file/i);
      expect(result.status).toBe(1);
    } finally {
      rmSync(filePath, { force: true });
      writeFileSync(filePath, original);
    }
  });

  it("fails closed instead of blocking when a referenced state manifest is a FIFO", () => {
    const document = readYaml(baselinePath, fixtureRoot);
    const manifestPath = absolute(document.fixture.stateManifest.path, fixtureRoot);
    const original = readFileSync(manifestPath);
    try {
      rmSync(manifestPath);
      expect(spawnSync("mkfifo", [manifestPath]).status).toBe(0);
      const result = runScript(boundaryVerifierPath, fixtureRoot, 1_000);
      expect(result.error).toBeUndefined();
      expect(outputOf(result)).toMatch(/state manifest.*regular non-symbolic file/i);
      expect(result.status).toBe(1);
    } finally {
      rmSync(manifestPath, { force: true });
      writeFileSync(manifestPath, original);
    }
  });

  it.each([
    ["benchmarks/tailwind-b2-extra.yaml", "kind: \"Unapproved\"\n", /Task 2 benchmark file|allowlist/],
    ["evidence/runtime/tailwind-b2/extra.yaml", "kind: \"Unapproved\"\n", /Task 2 runtime evidence|allowlist/],
    ["packages/ui/src/select/select-unapproved.tsx", "export const UnapprovedSelect = null;\n", /Core UI file outside|complete Day 3 Core UI file allowlist|complete Day 3 allowlist/],
    ["registry/tailwind-b2.json", "{}\n", /document outside the Icon library authorization/],
  ])("continues to reject an unauthorized adjacent file: %s", (filePath, content, reason) => {
    const result = mutate(filePath, content, "verify-boundaries.mjs");
    expect(outputOf(result)).toMatch(reason);
    expect(result.status).toBe(1);
  });

  it("rejects adding an unauthorized direct dependency", () => {
    const document = JSON.parse(readFileSync(absolute("packages/ui/package.json", fixtureRoot), "utf8"));
    document.dependencies.clsx = "2.1.1";
    const result = mutate("packages/ui/package.json", JSON.stringify(document), "verify-boundaries.mjs");
    expect(outputOf(result)).toMatch(/dependency allowlist|outside the frozen Day 3 dependency set/);
    expect(result.status).toBe(1);
  });

  it("rejects an unreferenced content-addressed state object", () => {
    const source = "unreferenced state object\n";
    const digest = hashValue(source);
    const result = mutate(
      `${stateObjectPrefix}${digest}.blob`,
      source,
      "verify-boundaries.mjs",
    );
    expect(outputOf(result)).toMatch(/runtime evidence outside the exact allowlist|unreferenced.*state object/i);
    expect(result.status).toBe(1);
  });

  it.each(["directory", "symlink"] as const)(
    "rejects an orphan state object hidden below a node_modules %s",
    (kind) => {
      const hiddenDirectory = absolute(`${stateObjectPrefix}node_modules`, fixtureRoot);
      const externalDirectory = mkdtempSync(join(tmpdir(), "rain-b2-hidden-orphan-"));
      try {
        mkdirSync(dirname(hiddenDirectory), { recursive: true });
        if (kind === "directory") mkdirSync(hiddenDirectory);
        else symlinkSync(externalDirectory, hiddenDirectory, "dir");
        const objectDirectory = kind === "directory" ? hiddenDirectory : externalDirectory;
        writeFileSync(join(objectDirectory, "orphan.blob"), "hidden unreferenced state object\n");

        const result = runScript(
          join(workspaceRoot, "scripts/verify-boundaries.mjs"),
          fixtureRoot,
        );
        expect(outputOf(result)).toMatch(/runtime evidence outside the exact allowlist|unreferenced.*state object/i);
        expect(result.status).toBe(1);
      } finally {
        rmSync(hiddenDirectory, { recursive: true, force: true });
        rmSync(externalDirectory, { recursive: true, force: true });
      }
    },
  );

  it("rejects replacing the governed Tailwind B2 evidence root with a directory symlink", () => {
    const evidenceRoot = absolute("evidence/runtime/tailwind-b2", fixtureRoot);
    const scratch = mkdtempSync(join(tmpdir(), "rain-b2-evidence-root-"));
    const movedEvidenceRoot = join(scratch, "tailwind-b2");
    try {
      renameSync(evidenceRoot, movedEvidenceRoot);
      symlinkSync(movedEvidenceRoot, evidenceRoot, "dir");
      const result = runScript(
        join(workspaceRoot, "scripts/verify-boundaries.mjs"),
        fixtureRoot,
      );
      expect(outputOf(result)).toMatch(/Tailwind B2 evidence.*real directory|symbolic link/i);
      expect(result.status).toBe(1);
    } finally {
      rmSync(evidenceRoot, { recursive: true, force: true });
      renameSync(movedEvidenceRoot, evidenceRoot);
      rmSync(scratch, { recursive: true, force: true });
    }
  });

  it.each([
    ["backslash", "evidence/runtime/tailwind-b2/trials/noncanonical\\p3.patch"],
    ["control character", "evidence/runtime/tailwind-b2/trials/noncanonical\u0001p3.patch"],
  ])("rejects a %s in an artifact path at both verification gates", (_label, unsafePath) => {
    const originalBaseline = readFileSync(absolute(baselinePath, fixtureRoot));
    const document = readYaml(baselinePath, fixtureRoot);
    const originalPath = document.results[2].artifacts.diff.path;
    const originalAbsolutePath = absolute(originalPath, fixtureRoot);
    const unsafeAbsolutePath = absolute(unsafePath, fixtureRoot);
    try {
      renameSync(originalAbsolutePath, unsafeAbsolutePath);
      document.results[2].artifacts.diff.path = unsafePath;
      writeFileSync(absolute(baselinePath, fixtureRoot), `${renderYaml(document)}\n`);

      for (const script of [verifierPath, join(workspaceRoot, "scripts/verify-boundaries.mjs")]) {
        const result = runScript(script, fixtureRoot);
        expect(outputOf(result)).toMatch(/canonical repository-relative POSIX path|outside the governed trial evidence directory/i);
        expect(result.status).toBe(1);
      }
    } finally {
      writeFileSync(absolute(baselinePath, fixtureRoot), originalBaseline);
      if (existsSync(unsafeAbsolutePath)) renameSync(unsafeAbsolutePath, originalAbsolutePath);
    }
  });

  it("requires verify:tailwind-b2 in the governance chain from Task 5 onward", () => {
    // The current chain includes the later Token gate; historical B2 inputs are tested above.
    const document = JSON.parse(readFileSync(absolute("package.json", workspaceRoot), "utf8"));
    expect(document.scripts["verify:governance"]).toBe(
      "pnpm verify:lockfile && pnpm verify:workspace && pnpm verify:evidence && pnpm verify:boundaries && pnpm verify:tailwind-b2 && pnpm verify:tokens",
    );
  });
});

describe("Tailwind B2 Task 5 machine-readable contract", () => {
  it.each([
    ["default palette", 'const classes = "bg-blue-500";', /default visual utility.*bg-blue-500/i],
    ["default text palette", 'const classes = "text-gray-700";', /default visual utility.*text-gray-700/i],
    ["default radius", 'const classes = "rounded-lg";', /default visual utility.*rounded-lg/i],
    ["default shadow", 'const classes = "shadow-md";', /default visual utility.*shadow-md/i],
    ["arbitrary color", 'const classes = "bg-[#ffffff]";', /arbitrary visual utility.*bg-\[#ffffff\]/i],
    ["arbitrary spacing", 'const classes = "p-[13px]";', /arbitrary visual utility.*p-\[13px\]/i],
    ["important modifier", 'const classes = "bg-rain-surface-panel!";', /important modifier.*bg-rain-surface-panel!/i],
    ["private reference Token", 'const value = "var(--rain-ref-blue-500)";', /private reference Token.*rain-ref-blue-500/i],
    ["dynamic class construction", 'const classes = `bg-${tone}-500`;', /dynamic Tailwind class construction/i],
  ])("rejects %s", (_label, source, expected) => {
    expect(validateProtectedTailwindSource({
      filePath: "packages/ui/src/button/button.styles.ts",
      source,
    })).toEqual(expect.arrayContaining([expect.stringMatching(expected)]));
  });

  it.each([
    "relative inline-flex flex-none items-center justify-center min-w-0",
    "text-rain-category-text-green-2 text-rain-category-text-orange-2 border-rain-category-border-neutral-3",
    "bg-rain-button-primary text-rain-text-inverse rounded-rain-button-medium",
    "h-rain-button-medium-height px-rain-button-medium-padding-inline gap-rain-button-gap",
  ])("accepts governed structural and Rain utilities: %s", (classes) => {
    expect(validateProtectedTailwindSource({
      filePath: "packages/ui/src/button/button.styles.ts",
      source: `const classes = ${JSON.stringify(classes)};`,
    })).toEqual([]);
  });

  it("validates the B2 contract and both UI manifests against real source paths", () => {
    expect(validateTailwindB2SystemContract({ root: workspaceRoot })).toEqual([]);

    const contract = readYaml("manifests/contracts/tailwind-b2.yaml");
    const button = readYaml("manifests/ui/button.yaml");
    const input = readYaml("manifests/ui/input.yaml");

    expect(contract.pilot.components).toEqual(["ui-button", "ui-input"]);
    expect(contract.localRecipe.requiredFields).toEqual([
      "id",
      "scope",
      "origin",
      "classes",
      "modifiedParts",
      "candidateTokens",
      "promotionStatus",
    ]);
    expect(button).toMatchObject({
      id: "ui-button",
      modificationMode: "managed",
      sourcePath: "packages/ui/src/button/button.tsx",
    });
    expect(button.parts).toEqual([
      "root",
      "leading-icon",
      "label",
      "trailing-icon",
      "loading-indicator",
    ]);
    expect(input).toMatchObject({
      id: "ui-input",
      modificationMode: "managed",
      sourcePath: "packages/ui/src/input/input.tsx",
    });
    expect(input.parts).toEqual([
      "root", "leading-icon", "prefix", "prefix-text", "control", "clear-slot", "clear-action", "suffix-text", "suffix", "trailing-icon",
      "count", "trailing-action",
    ]);
  });
});

describe("Tailwind B2 Task 3 dependency contract", () => {
  let fixtureRoot: string;
  let unsafeFixtureRoot: string;

  beforeAll(() => {
    fixtureRoot = mkdtempSync(join(tmpdir(), "rain-b2-task3-"));
    copyTask4GovernedFixture(fixtureRoot);
    // The FIFO guard needs only the frozen B2 phase and its dependency inputs,
    // not every later component and navigation preflight before Task 3 runs.
    unsafeFixtureRoot = mkdtempSync(join(tmpdir(), "rain-b2-task3-unsafe-"));
    const archive = absolute("evidence/runtime/token-foundations-v1/pre-token-runtime.tar.gz");
    expect(hash(archive)).toBe("39b6253185367626ddf8f66e6b1cd99ed2e8addd4937e7c93f3c12ad48289280");
    const extracted = spawnSync("tar", ["-xzf", archive, "-C", unsafeFixtureRoot,
      "status/current-phase.yaml", "package.json", "packages/ui/package.json", "pnpm-lock.yaml"], { encoding: "utf8" });
    expect(extracted.status, extracted.stderr).toBe(0);
  }, 60_000);

  afterAll(() => {
    if (fixtureRoot) rmSync(fixtureRoot, { recursive: true, force: true });
    if (unsafeFixtureRoot) rmSync(unsafeFixtureRoot, { recursive: true, force: true });
  }, 30_000);

  it("allows the audited class helpers and the precisely authorized TagSelect base", () => {
    const uiPackage = JSON.parse(
      readFileSync(absolute("packages/ui/package.json"), "utf8"),
    );

    expect(uiPackage.dependencies).toEqual({
      "@base-ui/react": "1.8.0",
      "@rain-next/foundations": "workspace:*",
      "class-variance-authority": "0.7.1",
      react: "^19.2.8",
      "tailwind-merge": "3.6.0",
      ...(hasG123PlaygroundAssetizationAuthorization(readYaml("status/current-phase.yaml")) ? { "react-resizable-panels": "4.12.4" } : {}),
      ...getRecordedChartSourceBindings(workspaceRoot, readYaml("status/current-phase.yaml"))?.dependencies["packages/ui/package.json"].dependencies,
      ...(hasG5ComponentsAuthorization(readYaml("status/current-phase.yaml")) ? { "react-day-picker": "9.13.2", "react-dom": "19.2.8" } : {}),
      ...(getG6SourceBindings(workspaceRoot)?.phase.dependencyInstallation === "completed" ? { "input-otp": "1.4.2", "embla-carousel-react": "8.5.2", "@shadcn/react": "0.3.1" } : {}),
    });
    expect(uiPackage.dependencies.clsx).toBe(getRecordedChartSourceBindings(workspaceRoot, readYaml("status/current-phase.yaml"))?.dependencies["packages/ui/package.json"].dependencies.clsx);
  });

  it.each([
    "packages/ui/package.json",
    "pnpm-lock.yaml",
  ])("fails closed instead of blocking when the Task 3 file is a FIFO: %s", (relativePath) => {
    const filePath = absolute(relativePath, unsafeFixtureRoot);
    const original = readFileSync(filePath);
    try {
      rmSync(filePath);
      expect(spawnSync("mkfifo", [filePath]).status).toBe(0);
      const result = runScript(boundaryVerifierPath, unsafeFixtureRoot, 1_000);
      expect(result.error).toBeUndefined();
      expect(outputOf(result)).toMatch(/regular non-symbolic file/i);
      expect(result.status).toBe(1);
    } finally {
      rmSync(filePath, { force: true });
      writeFileSync(filePath, original);
    }
  });

  it.each([
    "class-variance-authority",
    "tailwind-merge",
    "clsx",
  ])("rejects using %s outside its governed composition boundary", (packageName) => {
    const filePath = absolute("packages/ui/src/button/button.tsx", fixtureRoot);
    const original = readFileSync(filePath);
    try {
      writeFileSync(
        filePath,
        Buffer.concat([
          original,
          Buffer.from(`\nconst prematureTaskFourUse = () => import(${JSON.stringify(packageName)});\n`),
        ]),
      );
      const result = runScript(boundaryVerifierPath, fixtureRoot);
      expect(outputOf(result)).toMatch(/restricted|rainCn|forbidden|composition helper/i);
      expect(result.status).toBe(1);
    } finally {
      writeFileSync(filePath, original);
    }
  });
});

describe("Tailwind B2 Task 4 controlled theme bridge", () => {
  let fixtureRoot: string;

  beforeAll(() => {
    fixtureRoot = mkdtempSync(join(tmpdir(), "rain-b2-task4-"));
    copyTask4GovernedFixture(fixtureRoot);
  }, 60_000);

  afterAll(() => {
    if (fixtureRoot) rmSync(fixtureRoot, { recursive: true, force: true });
  }, 30_000);

  function mutateAndVerify(filePath: string, mutate: (source: string) => string) {
    const target = absolute(filePath, fixtureRoot);
    const original = readFileSync(target, "utf8");
    try {
      const mutated = mutate(original);
      expect(mutated, `mutation must change ${filePath}`).not.toBe(original);
      writeFileSync(target, mutated);
      return runScript(verifierPath, fixtureRoot);
    } finally {
      writeFileSync(target, original);
    }
  }

  function verifyComponentColorReviews(extraFiles: string[] = []) {
    // Run the production checks over real component colour owners and their
    // existing evidence; unrelated repository registrations have separate tests.
    const root = mkdtempSync(join(tmpdir(), "rain-b2-color-review-"));
    try {
      for (const path of ["status/current-phase.yaml", "packages/ui/src/question-number/question-number.styles.ts", "apps/playground/src/docs/components/question-number-page.css", "docs/plans/2026-09-08-question-number-implementation.md", ...extraFiles]) {
        mkdirSync(dirname(absolute(path, root)), { recursive: true });
        cpSync(absolute(path, fixtureRoot), absolute(path, root));
      }
      return verifyTokenFoundations({ root });
    } finally { rmSync(root, { recursive: true, force: true }); }
  }

  it("accepts Token Foundations V1 additions only with its complete phase authorization", () => {
    expect(validateTailwindB2CompositionBridge({ root: fixtureRoot })).toEqual([]);
    expect(validateTailwindB2SystemContract({ root: fixtureRoot })).toEqual([]);
  });

  it("keeps OptionButton 32 authorization and Group registry local without accepting its visual Gate", () => {
    expect(validateTailwindB2SystemContract({ root: fixtureRoot })).toEqual([]);
    const registryPath = absolute("registry/option-button.json", fixtureRoot);
    const original = readFileSync(registryPath, "utf8");
    try {
      for (const mutate of [
        (item: any) => { item.publication = "published"; },
        (item: any) => { item.items.pop(); },
        (item: any) => { item.humanGate = "not-evaluated"; },
        (item: any) => { item.items[0].exportName = "CheckboxGroup"; },
        (item: any) => { item.shared.registryDependencies = ["check", "close"]; },
      ]) {
        const registry = JSON.parse(original); mutate(registry);
        writeFileSync(registryPath, JSON.stringify(registry));
        expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/OptionButton Registry/);
      }
    } finally { writeFileSync(registryPath, original); }
  });

  it("keeps OptionButton CSS and wrapping confined to the registered native control", () => {
    const cssPath = absolute("packages/ui/src/styles.css", fixtureRoot);
    const original = readFileSync(cssPath, "utf8");
    try {
      for (const changed of [
        original.replace(".rain-option-button:has(input:focus-visible)", ".rain-option-button:focus"),
        `${original}\n.rain-option-button:hover { color: red; }`,
        original.replace(/(\.rain-option-button \[data-slot="control"\] \{[^}]*outline: 1px solid )ButtonText;/, "$1Highlight;"),
      ]) {
        expect(changed).not.toBe(original);
        writeFileSync(cssPath, changed);
        expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/OptionButton native CSS/);
      }
    } finally { writeFileSync(cssPath, original); }
    const buttonPath = absolute("packages/ui/src/button/button.tsx", fixtureRoot);
    const button = readFileSync(buttonPath, "utf8");
    try {
      writeFileSync(buttonPath, `${button}\nconst unapprovedWrapping = "flex-wrap";`);
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/flex-wrap.*outside.*authorized/);
    } finally { writeFileSync(buttonPath, button); }
  });

  it("requires independent OptionButton content authorization and preserves its unresolved contrast review", () => {
    const path = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(path, "utf8");
    const status = readYaml("status/current-phase.yaml", fixtureRoot);
    try {
      const baseOnly = structuredClone(status);
      delete baseOnly.componentRefinements.optionButton.contentRefinement;
      writeFileSync(path, renderYaml(baseOnly));
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/OptionButton result\/content sources require/);
      const filePath = "packages/ui/src/option-button/option-button.styles.ts";
      expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(absolute(filePath, fixtureRoot), "utf8"), root: fixtureRoot }).join("\n")).toMatch(/separate exact authorization/);
      for (const patch of [{ independentReview: "passed" }, { implementation: "completed", automatedVerification: "passed", independentReview: "passed" }]) {
        const candidate = structuredClone(status);
        delete candidate.componentRefinements.optionButton.contentRefinement.contrastAcceptance;
        Object.assign(candidate.componentRefinements.optionButton.contentRefinement, patch);
        writeFileSync(path, renderYaml(candidate));
        const result = verifyComponentColorReviews([
          "packages/ui/src/option-button/option-button.styles.ts",
          "docs/plans/2026-09-08-option-button-implementation.md",
          "docs/plans/2026-09-08-option-button-content-implementation.md",
        ]);
        expect(result.pendingContrastFindings.some((entry: any) => entry.recipeId.startsWith("option-button-content-"))).toBe(true);
        expect(result.failures.join("\n")).toMatch(/OptionButton content contrast findings remain pending/);
        expect(result.failures.join("\n")).not.toMatch(/QuestionNumber contrast findings remain pending/);
      }
    } finally { writeFileSync(path, original); }
  }, 15_000);

  it("rejects OptionButton content card CSS expansion and gate substitution", () => {
    const cssPath = absolute("packages/ui/src/styles.css", fixtureRoot);
    const original = readFileSync(cssPath, "utf8");
    try {
      for (const changed of [
        original.replace("calc(var(--rain-space-32) * 8)", "calc(var(--rain-space-32) * 9)"),
        original.replace("white-space: normal;\n    color: CanvasText;", "white-space: normal;\n    color: red;"),
        original.replace('.rain-option-button [data-slot="feedback"] {', '.rain-option-button [data-slot="content"] {'),
      ]) {
        expect(changed).not.toBe(original);
        writeFileSync(cssPath, changed);
        expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/OptionButton native CSS/);
      }
    } finally { writeFileSync(cssPath, original); }
    const registryPath = absolute("registry/option-button.json", fixtureRoot);
    const registry = readFileSync(registryPath, "utf8");
    try {
      const value = JSON.parse(registry);
      value.contentRefinement.humanGate = value.contentRefinement.humanGate === "accepted" ? "awaiting_human" : "accepted";
      writeFileSync(registryPath, JSON.stringify(value));
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/OptionButton Registry/);
    } finally { writeFileSync(registryPath, registry); }
  });

  it("keeps QuestionNumber authorization narrow and its implementation Human Gate separate", () => {
    const statusPath = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(statusPath, "utf8");
    const status = readYaml("status/current-phase.yaml", fixtureRoot);
    delete status.componentRefinements.questionNumber.humanGateDecision;
    status.componentRefinements.questionNumber.humanGate = "not-evaluated";
    try {
      for (const patch of [
        { scope: "all-question-components" },
        { authorization: "not-authorized" },
        { humanGate: "accepted" },
      ]) {
        const candidate = structuredClone(status);
        Object.assign(candidate.componentRefinements.questionNumber, patch);
        writeFileSync(statusPath, renderYaml(candidate));
        expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/authorization is invalid/);
      }
    } finally { writeFileSync(statusPath, original); }
  });

  it("accepts only the recorded QuestionNumber 32 px visual Gate without accepting contrast findings", () => {
    const paths = ["status/current-phase.yaml", "manifests/ui/question-number.yaml", "registry/question-number.json"] as const;
    const originals = paths.map((path) => readFileSync(absolute(path, fixtureRoot), "utf8"));
    const status = parseYamlSubset(originals[0]!) as any;
    const manifest = parseYamlSubset(originals[1]!) as any;
    const registry = JSON.parse(originals[2]!);
    const refinement = status.componentRefinements.questionNumber;
    delete refinement.contrastAcceptance;
    delete manifest.verification.contrastReview;
    delete registry.contrastReview;
    const decision = {
      acceptedAt: "2026-09-08", decisionSource: "explicit-user-confirmation",
      userStatement: "首版32px的题号按钮，已可以视觉验收", scope: "question-number-32-visual-only",
      evidence: "../evidence/runtime/question-number/verification.md",
    };
    Object.assign(refinement, { humanGate: "accepted", humanGateDecision: decision,
      implementation: "in-progress", independentReview: "findings" });
    manifest.verification.humanGate = registry.humanGate = "accepted";
    try {
      expect(hasQuestionNumberRefinementAuthorization(status)).toBe(true);
      writeFileSync(absolute(paths[0], fixtureRoot), renderYaml(status));
      writeFileSync(absolute(paths[1], fixtureRoot), renderYaml(manifest));
      writeFileSync(absolute(paths[2], fixtureRoot), JSON.stringify(registry));
      const scoped = validateTailwindB2SystemContract({ root: fixtureRoot });
      expect(scoped.filter((failure: string) => /QuestionNumber/.test(failure))).toEqual([]);
      expect(scoped.some((failure: string) => /preserve every previous phase record and Gate/.test(failure))).toBe(true);
      for (const filePath of ["packages/ui/src/question-number/question-number.styles.ts", "apps/playground/src/docs/components/question-number-page.css"]) {
        expect(validateRegisteredRecipeColors({ filePath, source: readFileSync(absolute(filePath, fixtureRoot), "utf8"), root: fixtureRoot })).toEqual([]);
      }
      const tokens = verifyComponentColorReviews();
      expect(tokens.failures.filter((failure: string) => /question-number|QuestionNumber/.test(failure))).toEqual([]);
      expect(tokens.pendingContrastFindings.some((entry: any) => entry.recipeId.startsWith("question-number-"))).toBe(true);
      expect(tokens.acceptedTextContrastExceptions.some((entry: any) => entry.recipeId.startsWith("question-number"))).toBe(false);
      expect(tokens.acceptedComponentContrastExceptions.some((entry: any) => entry.recipeId.startsWith("question-number"))).toBe(false);
      for (const mutation of [
        undefined,
        { ...decision, scope: "question-number-all-sizes" },
        { ...decision, scope: "question-number-contrast-exception" },
        { ...decision, userStatement: "继续" },
        { ...decision, evidence: "../evidence/runtime/icon-button/verification.md" },
        { ...decision, acceptedAt: "2026-09-09" },
        { ...decision, publication: "authorized" },
      ]) {
        const candidate = structuredClone(status);
        if (mutation) candidate.componentRefinements.questionNumber.humanGateDecision = mutation;
        else delete candidate.componentRefinements.questionNumber.humanGateDecision;
        expect(hasQuestionNumberRefinementAuthorization(candidate)).toBe(false);
      }
      for (const humanGate of ["not-evaluated", "awaiting_human"]) {
        const candidate = structuredClone(status);
        candidate.componentRefinements.questionNumber.humanGate = humanGate;
        expect(hasQuestionNumberRefinementAuthorization(candidate)).toBe(false);
        delete candidate.componentRefinements.questionNumber.humanGateDecision;
        expect(hasQuestionNumberRefinementAuthorization(candidate)).toBe(true);
      }
    } finally { paths.forEach((path, index) => writeFileSync(absolute(path, fixtureRoot), originals[index]!)); }
  });

  it("prevents closing QuestionNumber while its contrast findings remain pending", () => {
    const path = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(path, "utf8");
    try {
      const status = readYaml("status/current-phase.yaml", fixtureRoot);
      delete status.componentRefinements.questionNumber.contrastAcceptance;
      Object.assign(status.componentRefinements.questionNumber, { implementation: "completed", independentReview: "passed", automatedVerification: "passed" });
      writeFileSync(path, renderYaml(status));
      const result = verifyComponentColorReviews();
      expect(result.pendingContrastFindings.some((entry: any) => entry.recipeId.startsWith("question-number-"))).toBe(true);
      expect(result.failures.join("\n")).toMatch(/QuestionNumber contrast findings remain pending/);
    } finally { writeFileSync(path, original); }
  });

  it("keeps QuestionNumber local and rejects adjacent visual changes", () => {
    const path = absolute("registry/question-number.json", fixtureRoot);
    const original = readFileSync(path, "utf8");
    try {
      const item = JSON.parse(original);
      item.publication = "published";
      writeFileSync(path, JSON.stringify(item));
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/QuestionNumber Registry item must remain/);
    } finally { writeFileSync(path, original); }
    const cssPath = absolute("packages/ui/src/styles.css", fixtureRoot);
    const css = readFileSync(cssPath, "utf8");
    try {
      writeFileSync(cssPath, `${css}\n.rain-question-number:hover { color: red; }\n`);
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/QuestionNumber native CSS must preserve/);
    } finally { writeFileSync(cssPath, css); }
  });

  it("allows only the authorized Button color outputs and requires their theme boundaries", () => {
    const path = absolute("packages/foundations/src/tokens.css", fixtureRoot);
    const statusPath = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(path, "utf8");
    const originalStatus = readFileSync(statusPath, "utf8");
    const migrated = original.replace(/--rain-button-primary-bg: [^;]+;/, "--rain-button-primary-bg: var(--rain-category-fill-brand-solid-2);");
    try {
      writeFileSync(path, migrated);
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot })).toEqual([]);
      for (const mutate of [
        (source: string) => source.replace("--rain-button-primary-bg: var(--rain-category-fill-brand-solid-2);", "--rain-button-primary-bg: var(--rain-category-text-brand-1);"),
        (source: string) => source.replace(":root {", ":root {\n  --rain-button-unapproved-color: red;"),
        (source: string) => source.replace("--rain-button-mini-height: 28px;", "--rain-button-mini-height: 32px;"),
      ]) {
        const invalid = mutate(migrated);
        expect(invalid).not.toBe(migrated);
        writeFileSync(path, invalid);
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/component Token contract/);
      }
      const darkIndex = migrated.indexOf('[data-rain-theme="dark"] {');
      const missingDarkAlias = migrated.slice(0, darkIndex) + migrated.slice(darkIndex)
        .replace(/\s*--rain-button-primary-bg: [^;]+;/, "");
      expect(missingDarkAlias).not.toBe(migrated);
      writeFileSync(path, missingDarkAlias);
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/theme="dark"/);
      writeFileSync(path, migrated);
      const status = parseYamlSubset(originalStatus) as any;
      delete status.tokenRefinements.buttonTokenMigration;
      writeFileSync(statusPath, renderYaml(status));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/component Token contract|theme mapping contract/);
    } finally {
      writeFileSync(path, original);
      writeFileSync(statusPath, originalStatus);
    }
  });

  it("keeps the authorized Button Focus colors, geometry and interoperability exact", () => {
    expect(validateTailwindB2CompositionBridge({ root: fixtureRoot })).toEqual([]);
    for (const { filePath, before, after, expected } of [
      { filePath: "packages/foundations/src/tokens.css", before: "--rain-button-focus-outline-width: 1px;", after: "--rain-button-focus-outline-width: 2px;", expected: /component Token contract/ },
      { filePath: "packages/foundations/src/tokens.css", before: "--rain-button-focus-outline-offset: 0px;", after: "--rain-button-focus-outline-offset: 2px;", expected: /component Token contract/ },
      { filePath: "packages/foundations/src/tokens.css", before: "--rain-button-focus-outline: var(--rain-category-border-brand-1);", after: "--rain-button-focus-outline: var(--rain-category-border-brand-2);", expected: /component Token contract/ },
      { filePath: "packages/foundations/src/tokens.css", before: "--rain-button-focus-halo: var(--rain-category-fill-brand-alpha-3);", after: "--rain-button-focus-halo: var(--rain-category-fill-brand-alpha-4);", expected: /component Token contract/ },
      { filePath: "packages/foundations/src/tokens.css", before: "0 0 0 4px var(--rain-button-focus-halo)", after: "0 0 0 5px var(--rain-button-focus-halo)", expected: /component Token contract/ },
      { filePath: "packages/foundations/src/tailwind-theme.css", before: "--rain-focus-control: var(--rain-button-focus-outline);", after: "--rain-focus-control: var(--rain-focus-control-halo);", expected: /focus-rain-button utility/ },
      { filePath: "packages/foundations/src/tailwind-theme.css", before: "--rain-focus-danger: var(--rain-button-text-focus-outline);", after: "--rain-focus-danger: var(--rain-color-focus-danger);", expected: /focus-rain-button-text utility/ },
    ]) {
      const path = absolute(filePath, fixtureRoot);
      const original = readFileSync(path, "utf8");
      try {
        expect(original).toContain(before);
        writeFileSync(path, original.replace(before, after));
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(expected);
      } finally {
        writeFileSync(path, original);
      }
    }
  });

  it("requires exact global Focus values and only four color bindings at theme boundaries", () => {
    expect(validateTailwindB2CompositionBridge({ root: fixtureRoot })).toEqual([]);
    const path = absolute("packages/foundations/src/focus.css", fixtureRoot);
    const statusPath = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(path, "utf8");
    const originalStatus = readFileSync(statusPath, "utf8");
    try {
      for (const mutate of [
        (source: string) => source.replace("--rain-focus-width: 1px;", "--rain-focus-width: 2px;"),
        (source: string) => source.replace("--rain-focus-offset: 0px;", "--rain-focus-offset: 1px;"),
        (source: string) => source.replace("--rain-focus-item: var(--rain-color-focus-item);", "--rain-focus-item: var(--rain-color-focus-control);"),
        (source: string) => source.replace("--rain-focus-control-halo: var(--rain-category-fill-brand-alpha-3);", "--rain-focus-control-halo: var(--rain-category-fill-brand-alpha-4);"),
        (source: string) => source.replace("[data-rain-theme] {", "[data-rain-theme] {\n  --rain-focus-width: 1px;"),
        (source: string) => source.replace("[data-rain-theme] {", "[data-rain-theme] {\n  --rain-focus-extra: red;"),
        (source: string) => source.replace("[data-rain-theme] {", ".unapproved-scope {"),
        (source: string) => source.replace(/(\[data-rain-theme\] \{[\s\S]*?\n\})/, "$1\n$1"),
        (source: string) => source.replace(/(\[data-rain-theme\] \{[\s\S]*?)\s*--rain-focus-control-halo: [^;]+;/, "$1"),
      ]) {
        const invalid = mutate(original);
        expect(invalid).not.toBe(original);
        writeFileSync(path, invalid);
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/Focus Token/);
      }
      writeFileSync(path, original);
      const status = parseYamlSubset(originalStatus) as any;
      delete status.tokenRefinements.buttonTokenMigration.focusMigration;
      writeFileSync(statusPath, renderYaml(status));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/phase authorization is invalid/);
    } finally {
      writeFileSync(path, original);
      writeFileSync(statusPath, originalStatus);
    }
  });

  it("accepts authorized equal typography aliases but rejects a different pixel value", () => {
    const path = absolute("packages/foundations/src/typography.css", fixtureRoot);
    const statusPath = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(path, "utf8");
    const originalStatus = readFileSync(statusPath, "utf8");
    try {
      const authorized = originalStatus.includes("  foundationsAlignment:") ? originalStatus :
        originalStatus.replace("tokenRefinements:\n", "tokenRefinements:\n  foundationsAlignment:\n    authorization: \"authorized\"\n    scope: \"equal-value-aliases-and-foundations-entry\"\n");
      writeFileSync(statusPath, authorized);
      const alias = original.replace(/--rain-type-ui-size: [^;]+;/, "--rain-type-ui-size: var(--rain-font-size-14);");
      writeFileSync(path, alias);
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot })).toEqual([]);
      writeFileSync(path, alias.replace("--rain-type-ui-size: var(--rain-font-size-14);", "--rain-type-ui-size: var(--rain-font-size-16);"));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/typography Token contract/);
      writeFileSync(path, alias);
      writeFileSync(statusPath, authorized.replace('scope: "equal-value-aliases-and-foundations-entry"', 'scope: "unrelated"'));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/typography/);
    } finally {
      writeFileSync(path, original);
      writeFileSync(statusPath, originalStatus);
    }
  });

  it("allows only confirmed semantic color aliases and isolated legacy fills with explicit authorization", () => {
    const path = absolute("packages/foundations/src/tokens.css", fixtureRoot);
    const statusPath = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(path, "utf8");
    const originalStatus = readFileSync(statusPath, "utf8");
    try {
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot })).toEqual([]);
      for (const mutate of [
        (source: string) => source.replace("--rain-color-text-secondary: var(--rain-category-text-neutral-3);", "--rain-color-text-secondary: var(--rain-category-text-neutral-4);"),
        (source: string) => source.replace("--rain-color-action-primary-text: var(--rain-category-text-brand-1);", "--rain-color-action-primary-text: var(--rain-category-fill-brand-solid-1);"),
        (source: string) => source.replace("--rain-color-text-primary: var(--rain-ref-neutral-950);", "--rain-color-text-primary: var(--rain-category-text-neutral-1);"),
        (source: string) => source.replace("--rain-tag-neutral-fill: var(--rain-ref-neutral-700);", "--rain-tag-neutral-fill: var(--rain-category-text-neutral-3);"),
        (source: string) => source.replace(":root {", ":root {\n  --rain-tag-unapproved-fill: red;"),
        (source: string) => `${source}\n.unapproved { --rain-badge-neutral-fill: red; }\n`,
        (source: string) => source.replace('[data-rain-theme="dark"] {', '[data-rain-theme="dark"] {\n --rain-color-text-secondary: var(--rain-category-text-neutral-4);'),
        (source: string) => source.replace("--rain-ref-neutral-950: #14233C;", "--rain-ref-neutral-950: #142346;"),
      ]) {
        const mutated = mutate(original);
        expect(mutated).not.toBe(original);
        writeFileSync(path, mutated);
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).length).toBeGreaterThan(0);
      }
      writeFileSync(path, original);
      const status = parseYamlSubset(originalStatus) as any;
      delete status.tokenRefinements.foundationsColorAlignment;
      writeFileSync(statusPath, renderYaml(status));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/semantic color Token contract|legacy fill/);
    } finally {
      writeFileSync(path, original);
      writeFileSync(statusPath, originalStatus);
    }
  });

  it("keeps primary text and fill utilities separate and forwards Link in each theme", () => {
    const themePath = absolute("packages/foundations/src/tailwind-theme.css", fixtureRoot);
    const tokensPath = absolute("packages/foundations/src/tokens.css", fixtureRoot);
    const originalTheme = readFileSync(themePath, "utf8");
    const originalTokens = readFileSync(tokensPath, "utf8");
    try {
      expect(originalTheme).not.toContain("--color-rain-action-primary:");
      expect(originalTheme).toContain("@utility bg-rain-action-primary {");
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot })).toEqual([]);
      for (const mutate of [
        (source: string) => source.replace("@theme inline {", "@theme inline {\n --color-rain-action-primary: var(--rain-color-action-primary);"),
        (source: string) => source.replace("@utility text-rain-action-primary {\n  color: var(--rain-color-action-primary-text);", "@utility text-rain-action-primary {\n  color: var(--rain-color-action-primary);"),
        (source: string) => source.replace("@utility bg-rain-action-primary {\n  background-color: var(--rain-color-action-primary);", "@utility bg-rain-action-primary {\n  background-color: var(--rain-color-action-primary-text);"),
      ]) {
        const mutated = mutate(originalTheme);
        expect(mutated).not.toBe(originalTheme);
        writeFileSync(themePath, mutated);
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).length).toBeGreaterThan(0);
      }
      writeFileSync(themePath, originalTheme);
      const generatedTokens = originalTokens.slice(originalTokens.indexOf("/* token-foundations-v1:values:start"));
      for (const theme of ["light", "dark"]) {
        const block = generatedTokens.match(new RegExp(`^\\[data-rain-theme="${theme}"\\] \\{[^}]+\\}`, "m"))![0];
        const changed = block.replace("--rain-link-color: var(--rain-color-action-primary-text);", "--rain-link-color: var(--rain-color-action-primary);");
        expect(changed).not.toBe(block);
        writeFileSync(tokensPath, originalTokens.replace(block, changed));
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/link-color/);
      }
    } finally {
      writeFileSync(themePath, originalTheme);
      writeFileSync(tokensPath, originalTokens);
    }
  });

  it("safelists only the authorized primary text example without widening source detection", () => {
    const path = absolute("apps/playground/src/styles.css", fixtureRoot);
    const statusPath = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(path, "utf8");
    const originalStatus = readFileSync(statusPath, "utf8");
    const directive = '@source inline("text-rain-action-primary");';
    try {
      expect(original).toContain(directive);
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot })).toEqual([]);
      for (const replacement of [
        '@source inline("text-rain-action-primary bg-rain-action-primary");',
        '@source "./docs";',
        `${directive}\n${directive}`,
      ]) {
        writeFileSync(path, original.replace(directive, replacement));
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/source detection directives.*exactly/);
      }
      writeFileSync(path, original);
      const status = parseYamlSubset(originalStatus) as any;
      delete status.tokenRefinements.foundationsColorAlignment;
      writeFileSync(statusPath, renderYaml(status));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/source detection directives.*exactly/);
    } finally {
      writeFileSync(path, original);
      writeFileSync(statusPath, originalStatus);
    }
  });

  it("requires separate Dark authorization and exact direct Category theme overrides", () => {
    const statusPath = absolute("status/current-phase.yaml", fixtureRoot);
    const tokenPath = absolute("packages/foundations/src/tokens.css", fixtureRoot);
    const originalStatus = readFileSync(statusPath, "utf8");
    const originalTokens = readFileSync(tokenPath, "utf8");
    try {
      const status = parseYamlSubset(originalStatus) as any;
      delete status.tokenRefinements.colorDarkTheme;
      writeFileSync(statusPath, renderYaml(status));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/outside a direct allowed root scope|authorization is invalid/);
      writeFileSync(statusPath, originalStatus);
      const header = '[data-rain-theme="dark"] {';
      for (const replacement of [
        '[data-rain-theme="sepia"] {',
        `${header}\n --rain-color-text-primary: red;`,
        `${header}\n --rain-category-text-neutral-1: red;`,
        `${header}\n .nested { --rain-category-text-neutral-1: red; }`,
      ]) {
        writeFileSync(tokenPath, originalTokens.replace(header, replacement));
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).length).toBeGreaterThan(0);
      }
      const darkBlock = originalTokens.match(/^\[data-rain-theme="dark"\] \{[^}]+\}/m)![0];
      writeFileSync(tokenPath, `${originalTokens}\n${darkBlock}`);
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/theme scope exactly once/);
    } finally {
      writeFileSync(statusPath, originalStatus);
      writeFileSync(tokenPath, originalTokens);
    }
  });

  it.each(["authorization", "history"])("rejects Token Foundations V1 with forged %s", (field) => {
    const target = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(target, "utf8");
    try {
      const document = parseYamlSubset(original) as any;
      if (field === "authorization") document.currentPhase.authorizationScope = "tailwind-b2-task7-button-migration";
      else document.phaseHistory.tailwindB2.independentLifecycle.humanGate = "accepted";
      writeFileSync(target, renderYaml(document));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n"))
        .toMatch(/Token Foundations V1 phase authorization is invalid/i);
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n"))
        .toMatch(/Token Foundations V1 phase authorization is invalid/i);
    } finally {
      writeFileSync(target, original);
    }
  });

  it("requires separate IconButton authorization for its exports, tokens, utilities and review source", () => {
    const path = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(path, "utf8");
    try {
      const status = parseYamlSubset(original) as any;
      delete status.componentRefinements.iconButton;
      writeFileSync(path, renderYaml(status));
      const failures = validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n");
      expect(failures).toMatch(/public index full re-export inventory/);
      expect(failures).toMatch(/Icon Size and IconButton Token contract.*unexpected declaration/);
      expect(failures).toMatch(/theme bridge top-level structure/);
      expect(failures).toMatch(/source detection directives/);
    } finally {
      writeFileSync(path, original);
    }
  });

  it.each([
    "packages/ui/src/icon-button/unapproved.tsx",
    "packages/foundations/src/unapproved-icon-size.ts",
    "apps/playground/src/docs/components/unapproved-icon-button.tsx",
    "evidence/runtime/icon-button/unapproved.md",
    "packages/ui/src/question-number/unapproved.tsx",
    "apps/playground/src/docs/components/unapproved-question-number.tsx",
    "evidence/runtime/question-number/unapproved.md",
    "packages/ui/src/option-button/unapproved.tsx",
    "apps/playground/src/docs/components/unapproved-option-button.tsx",
    "evidence/runtime/option-button/unapproved.md",
  ])("keeps component refinement authorization limited to exact registered paths: %s", (path) => {
    const target = absolute(path, fixtureRoot);
    mkdirSync(dirname(target), { recursive: true });
    try {
      writeFileSync(target, "export const unapproved = true;\n");
      const result = runScript(boundaryVerifierPath, fixtureRoot);
      expect(result.status).toBe(1);
      expect(outputOf(result)).toMatch(/outside.*(?:allowlist|authorization)/);
    } finally {
      rmSync(target, { force: true });
    }
  }, 20_000);

  it("rejects extra static classes in the shared Icon Size source directive", () => {
    const path = absolute("packages/foundations/src/tailwind-theme.css", fixtureRoot);
    const original = readFileSync(path, "utf8");
    expect(original).toContain('@source inline("size-rain-icon-4');
    try {
      writeFileSync(path, original.replace('@source inline("size-rain-icon-4', '@source inline("size-rain-icon-99 size-rain-icon-4'));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/IconButton theme source must be only/);
    } finally {
      writeFileSync(path, original);
    }
  });

  it.each([
    ["packages/foundations/src/tokens.css", "--rain-icon-size-16: 16px;", "--rain-icon-size-16: 17px;"],
    ["packages/foundations/src/tokens.css", "--rain-icon-button-control-18: 18px;", "--rain-icon-button-control-18: 19px;"],
    ["packages/foundations/src/tokens.css", ":root {", ":root {\n --rain-icon-size-99: 99px;"],
    ["packages/foundations/src/tailwind-theme.css", "width: var(--rain-icon-size-16);", "width: 16px;"],
    ["packages/foundations/src/tailwind-theme.css", "height: var(--rain-icon-button-control-18);", "height: var(--rain-space-18);"],
    ["apps/playground/src/styles.css", '@source "./docs/components/icon-button-page.tsx";', '@source "./docs/components";'],
  ])("rejects unregistered IconButton bridge changes in %s", (path, before, after) => {
    const target = absolute(path, fixtureRoot);
    const original = readFileSync(target, "utf8");
    expect(original).toContain(before);
    try {
      writeFileSync(target, original.replace(before, after));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).length).toBeGreaterThan(0);
    } finally {
      writeFileSync(target, original);
    }
  });

  it("keeps the IconButton Registry candidate local, unpublished and within existing dependencies", () => {
    const path = absolute("registry/icon-button.json", fixtureRoot);
    const original = readFileSync(path, "utf8");
    try {
      for (const mutate of [
        (item: any) => { item.publication = "published"; },
        (item: any) => { item.humanGate = item.humanGate === "accepted" ? "awaiting_human" : "accepted"; },
        (item: any) => { item.shared.peerDependencies.push("unapproved-headless"); },
        (item: any) => { item.registryDependencies = ["unapproved-installer"]; },
        (item: any) => { item.items[0].files[0] = "packages/ui/src/button/button.tsx"; },
      ]) {
        const item = JSON.parse(original);
        mutate(item);
        writeFileSync(path, JSON.stringify(item));
        expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/IconButton Registry item must remain/);
      }
    } finally {
      writeFileSync(path, original);
    }
  });

  it("keeps the IconButton visual Human Gate synchronized without authorizing publication", () => {
    const paths = ["status/current-phase.yaml", "manifests/ui/icon-button.yaml", "registry/icon-button.json"];
    const originals = paths.map((path) => readFileSync(absolute(path, fixtureRoot), "utf8"));
    const status = parseYamlSubset(originals[0]!) as any;
    const manifest = parseYamlSubset(originals[1]!) as any;
    const registry = JSON.parse(originals[2]!);
    const write = () => {
      writeFileSync(absolute(paths[0]!, fixtureRoot), renderYaml(status));
      writeFileSync(absolute(paths[1]!, fixtureRoot), renderYaml(manifest));
      writeFileSync(absolute(paths[2]!, fixtureRoot), JSON.stringify(registry));
    };
    const refinement = status.componentRefinements.iconButton;
    Object.assign(refinement, { implementation: "completed", automatedVerification: "passed", independentReview: "passed", humanGate: "awaiting_human" });
    delete refinement.humanGateDecision;
    manifest.verification.humanGate = "awaiting_human";
    registry.humanGate = "awaiting_human";
    try {
      write();
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).filter((failure: string) => /IconButton/.test(failure))).toEqual([]);
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).some((failure: string) => /preserve every previous phase record and Gate/.test(failure))).toBe(true);
      refinement.humanGate = manifest.verification.humanGate = registry.humanGate = "accepted";
      refinement.humanGateDecision = {
        acceptedAt: "2026-09-07", decisionSource: "explicit-user-confirmation", userStatement: "确认视觉验收",
        scope: "icon-button-visual-only", evidence: "../evidence/runtime/icon-button/verification.md",
      };
      write();
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).filter((failure: string) => /IconButton/.test(failure))).toEqual([]);
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).some((failure: string) => /preserve every previous phase record and Gate/.test(failure))).toBe(true);
      for (const record of [manifest.verification, registry]) {
        record.humanGate = "awaiting_human";
        write();
        expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/IconButton.*Human Gate/);
        record.humanGate = "accepted";
      }
      for (const record of [manifest, registry]) {
        const publication = record.publication;
        record.publication = "published";
        write();
        expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/publication|unpublished/);
        record.publication = publication;
      }
      refinement.humanGate = "awaiting_human";
      delete refinement.humanGateDecision;
      write();
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/IconButton.*Human Gate/);
    } finally {
      paths.forEach((path, index) => writeFileSync(absolute(path, fixtureRoot), originals[index]!));
    }
  });

  it.each([
    ["--rain-icon-button-loading-mask-size", "--rain-button-loading-mask-size"],
    ["background-color: CanvasText;", "background-color: red;"],
    ["@layer base {", "@layer utilities {"],
    ["width: 1em;", "width: 16px;"],
    [".rain-icon > img {", ".rain-icon > img, .rain-button {"],
    [".rain-icon-button [data-slot=\"loading-indicator\"] {", ".rain-icon-button:hover [data-slot=\"loading-indicator\"] {"],
  ])("rejects IconButton CSS exception expansion: %s", (before, after) => {
    const path = absolute("packages/ui/src/styles.css", fixtureRoot);
    const original = readFileSync(path, "utf8");
    expect(original).toContain(before);
    try {
      writeFileSync(path, original.replace(before, after));
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/IconButton native CSS must preserve/);
    } finally {
      writeFileSync(path, original);
    }
  });

  it("keeps the original B2 bridge and manifest inventory valid without Token Foundations V1 additions", () => {
    // Restore the whole frozen runtime instead of removing a growing list of later assets.
    const root = createHistoricalB2Fixture("rain-b2-task4-historical-");
    try {
      expect(validateTailwindB2CompositionBridge({ root })).toEqual([]);
      expect(validateTailwindB2SystemContract({ root })).toEqual([]);
      writeFileSync(absolute("manifests/ui/select.yaml", root), renderYaml({ insideFieldLabels: { implementation: "completed" } }));
      expect(validateTailwindB2SystemContract({ root }).join("\n"))
        .toContain("select inside label record must retain the exact independent implementation and visual acceptance scope");
    } finally { rmSync(root, { recursive: true, force: true }); }
  });

  it("does not authorize Token Foundations V1 additions when phase status is missing", () => {
    const target = absolute("status/current-phase.yaml", fixtureRoot);
    const original = readFileSync(target);
    try {
      rmSync(target);
      const bridgeFailures = validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n");
      expect(bridgeFailures).toMatch(/unexpected declaration --rain-space-28/);
      expect(bridgeFailures).toMatch(/unexpected declaration --rain-line-thickness-1/);
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n")).toMatch(/manifest inventory must be exact/);
    } finally {
      writeFileSync(target, original);
    }
  });

  it.each(["border-dashed", "flex-wrap", "overflow-x-auto"])("keeps Token Foundations V1 structural utility %s out of old consumers", (utility) => {
    const target = absolute("packages/ui/src/button/button.tsx", fixtureRoot);
    const original = readFileSync(target, "utf8");
    try {
      writeFileSync(target, `${original}\nconst unauthorizedFoundationStyle = "${utility}";\n`);
      expect(validateTailwindB2SystemContract({ root: fixtureRoot }).join("\n"))
        .toMatch(/Token Foundations V1 structural utility.*outside its authorized demo scope/);
    } finally {
      writeFileSync(target, original);
    }
  });

  it.each([
    ["packages/foundations/src/tokens.css", "--rain-line-thickness-6: 6px;", "--rain-line-thickness-6: 7px;", /Line and Category values.*line-thickness-6.*expected/],
    ["packages/foundations/src/tokens.css", "--rain-space-28: 28px;", "--rain-space-28: 30px;", /CSS composition spacing.*space-28.*expected/],
    ["packages/foundations/src/tokens.css", "--rain-radius-16: 16px;", "--rain-radius-16: 18px;", /radius and shadow Token contract.*radius-16.*expected/],
    ["packages/foundations/src/tokens.css", "--rain-line-thickness-1: 1px;", ".evil { --rain-line-thickness-1: 1px; }", /line-thickness-1.*outside a direct allowed root scope/],
    ["packages/foundations/src/typography.css", "--rain-line-height-equal: 1;", "--rain-line-height-equal: 1px;", /typography Token contract.*line-height-equal.*expected/],
    ["packages/foundations/src/tailwind-theme.css", "border-width: var(--rain-line-thickness-6);", "border-width: var(--rain-space-6);", /utility border-rain-line-6.*exact flat declarations/],
    ["packages/foundations/src/tailwind-theme.css", "@utility h-rain-line-6 {", "@utility h-rain-line-7 {", /theme bridge top-level structure.*invalid/],
    ["packages/foundations/src/index.ts", 'export * from "./color-registry";', 'export * from "./unplanned-registry";', /public index re-export inventory.*invalid/],
    ["apps/playground/src/styles.css", '@source "./docs/token-foundations";', '@source "./docs";', /source detection directives.*exactly/],
  ] as const)("rejects Token Foundations V1 mutation in %s: %s", (path, search, replacement, expected) => {
    const target = absolute(path, fixtureRoot);
    const original = readFileSync(target, "utf8");
    expect(original).toContain(search);
    try {
      writeFileSync(target, original.replace(search, replacement));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(expected);
    } finally {
      writeFileSync(target, original);
    }
  });

  it("exports the bridge and uses the exact fail-closed application source roots", () => {
    const foundationsPackage = JSON.parse(
      readFileSync(absolute("packages/foundations/package.json"), "utf8"),
    );
    expect(foundationsPackage.exports["./tailwind-theme.css"]).toBe(
      "./src/tailwind-theme.css",
    );

    const applicationCss = readFileSync(
      absolute("apps/playground/src/styles.css"),
      "utf8",
    );
    expect(applicationCss.split(/\r?\n/).slice(0, 4)).toEqual([
      '@import "tailwindcss" source(none);',
      '@import "@rain-next/foundations/tailwind-theme.css";',
      '@source "./";',
      '@source "../../../packages/ui/src";',
    ]);
    const sourceStatements = applicationCss.match(/@source\s+["'][^"']*["'];/g) ?? [];
    expect(sourceStatements.filter((statement) => /docs|evidence|registry|\/private\/tmp/.test(statement)))
      .toEqual(['@source "./docs/token-foundations";', '@source "./docs/components/icon-button-page.tsx";', ...(hasInputNumberAuthorization(readYaml("status/current-phase.yaml")) ? ['@source "./docs/components/input-number-page.tsx";'] : []), '@source "./docs/components/input-page.tsx";', '@source "./docs/components/select-page.tsx";', '@source "./docs/components/tabs-page.tsx";', ...(hasTableRn08Authorization(readYaml("status/current-phase.yaml")) ? ['@source "./docs/components/table-page.tsx";'] : []), ...(hasAvatarFamilyAuthorization(readYaml("status/current-phase.yaml")) ? ['@source "./docs/components/avatar-page.tsx";'] : []), '@source "./docs/components/layouts-page.tsx";', '@source "./docs/components/dialog-page.tsx";', '@source "./docs/components/card-page.tsx";', '@source "./docs/components/dropdown-page.tsx";', '@source "./docs/components/tag-page.tsx";', '@source "./docs/components/question-number-page.tsx";', '@source "./docs/components/option-button-page.tsx";', '@source "./docs/components/checkbox-page.tsx";', '@source "./docs/components/radio-page.tsx";', '@source "./docs/components/selection-cards-page.tsx";', '@source "./docs/components/selection-patterns-page.tsx";', '@source "./docs/components/selection-playground-page.tsx";', ...(hasG123PlaygroundAssetizationAuthorization(readYaml("status/current-phase.yaml")) ? g123PlaygroundFiles.scanSources.map(file => `@source "./docs/components/${file}.tsx";`) : []), ...(hasG4ComponentsAuthorization(readYaml("status/current-phase.yaml")) ? ['@source "./docs/components/g4-component-pages.tsx";'] : []), ...(hasG5ComponentsAuthorization(readYaml("status/current-phase.yaml")) ? ['@source "./docs/components/g5-component-pages.tsx";'] : []), ...(getG6SourceBindings(workspaceRoot) ? ['@source "./docs/components/g6-media-pages.tsx";', '@source "./docs/components/g6-interaction-pages.tsx";', '@source "./docs/components/g6-conversation-pages.tsx";'] : [])]);
  });

  it("proves the fail-closed source roots with a fresh real Vite build", () => {
    const probeRoot = mkdtempSync(join(tmpdir(), "rain-b2-task4-vite-"));

    try {
      const playgroundRoot = absolute("apps/playground", probeRoot);
      const appRainPackages = join(playgroundRoot, "node_modules/@rain-next");
      for (const directory of [
        absolute("apps/playground/src", probeRoot),
        appRainPackages,
        absolute("packages/foundations/src", probeRoot),
        absolute("packages/ui/src/button", probeRoot),
        absolute("packages/ui/src/input", probeRoot),
      ]) {
        mkdirSync(directory, { recursive: true });
      }

      symlinkSync(join(workspaceRoot, "node_modules"), join(probeRoot, "node_modules"));
      symlinkSync("../../../../packages/foundations", join(appRainPackages, "foundations"));

      for (const relativePath of [
        "apps/playground/src/styles.css",
        "apps/playground/vite.config.ts",
        "packages/foundations/package.json",
        "packages/foundations/src/tailwind-theme.css",
      ]) {
        cpSync(absolute(relativePath), absolute(relativePath, probeRoot));
      }

      writeFileSync(
        absolute("apps/playground/index.html", probeRoot),
        '<div id="app"></div><script type="module" src="/src/main.ts"></script>',
      );
      // Current accepted Vite entry inventory; each entry uses this same minimal CSS probe.
      for (const name of ["question-option-sizes", "dropdown-review", "navigation-v042-consumer", "navigation-v042-w3-consumer", "navigation-v042-w6-consumer"]) {
        cpSync(absolute("apps/playground/index.html", probeRoot), absolute(`apps/playground/${name}.html`, probeRoot));
      }
      writeFileSync(
        absolute("apps/playground/src/main.ts", probeRoot),
        [
          'import "./styles.css";',
          'const playgroundProbe = "bg-rain-surface-panel text-rain-text-primary";',
          'const closedDefaults = "bg-blue-500 bg-gray-100 font-sans font-semibold text-sm gap-4 rounded-md shadow-sm sm:flex border outline filter underline ring";',
          "void playgroundProbe;",
          "void closedDefaults;",
        ].join("\n"),
      );

      writeFileSync(
        absolute("packages/ui/src/button/button.tsx", probeRoot),
        'export const tailwindTaskFourButtonSourceProbe = "bg-rain-button-secondary-hover gap-rain-8";\n',
      );
      writeFileSync(
        absolute("packages/ui/src/input/input.tsx", probeRoot),
        'export const tailwindTaskFourInputSourceProbe = "rounded-rain-6 h-rain-control min-w-0";\n',
      );
      mkdirSync(absolute("apps/playground/src/docs/token-foundations", probeRoot), { recursive: true });
      writeFileSync(
        absolute("apps/playground/src/docs/token-foundations/geometry-panel.tsx", probeRoot),
        'export const authorizedTokenFoundationProbe = "h-rain-line-6 rounded-rain-16";\n',
      );

      const excludedSelectors = [
        ["apps/playground/src/docs/task4-source-probe.ts", "bg-rain-button-primary"],
        ["apps/playground/src/docs/components/task4-source-probe.tsx", "bg-rain-button-text-primary"],
        ["apps/playground/src/docs/token-foundations/source-probe.test.tsx", "bg-rain-button-tertiary"],
        ["apps/playground/src/task4-source-probe.test.ts", "bg-rain-button-primary-hover"],
        ["packages/ui/src/icons/task4-source-probe.ts", "bg-rain-button-primary-pressed"],
        ["packages/ui/src/button/button.test.tsx", "bg-rain-button-secondary"],
        ["docs/task4-source-probe.ts", "bg-rain-button-danger-primary-pressed"],
        ["evidence/task4-source-probe.ts", "bg-rain-button-danger-subtle-hover"],
        ["registry/task4-source-probe.ts", "bg-rain-button-tertiary-pressed"],
        ["temporary-baseline/task4-source-probe.ts", "bg-rain-button-text-danger-pressed"],
      ] as const;
      for (const [relativePath, candidate] of excludedSelectors) {
        const filePath = absolute(relativePath, probeRoot);
        mkdirSync(dirname(filePath), { recursive: true });
        writeFileSync(filePath, `export const excluded = "${candidate}";\n`);
      }

      const environment: Record<string, string | undefined> = {
        ...process.env,
        NO_COLOR: "1",
      };
      delete environment.FORCE_COLOR;
      const result = spawnSync(
        process.execPath,
        [join(workspaceRoot, "node_modules/vite/bin/vite.js"), "build"],
        {
          cwd: playgroundRoot,
          encoding: "utf8",
          env: environment,
          maxBuffer: 4 * 1024 * 1024,
          timeout: 10_000,
        },
      );
      expect(outputOf(result), "fresh Vite build").toMatch(/built in/i);
      expect(result.status, outputOf(result)).toBe(0);

      const assetRoot = join(playgroundRoot, "dist/assets");
      const cssFiles = readdirSync(assetRoot).filter((fileName) => fileName.endsWith(".css"));
      expect(cssFiles.length).toBeGreaterThan(0);
      const builtCss = cssFiles
        .map((fileName) => readFileSync(join(assetRoot, fileName), "utf8"))
        .join("\n");

      for (const selector of [
        ".bg-rain-surface-panel",
        ".text-rain-text-primary",
        ".bg-rain-button-secondary-hover",
        ".gap-rain-8",
        ".rounded-rain-6",
        ".h-rain-control",
        ".min-w-0",
        ".h-rain-line-6",
        ".rounded-rain-16",
      ]) {
        expect(builtCss, selector).toContain(selector);
      }
      for (const selector of [
        ".bg-blue-500",
        ".bg-gray-100",
        ".font-sans",
        ".font-semibold",
        ".text-sm",
        ".gap-4",
        ".rounded-md",
        ".shadow-sm",
        ".sm\\:flex",
        ".border",
        ".outline",
        ".filter",
        ".underline",
        ...excludedSelectors.map(([, candidate]) => `.${candidate}`),
      ]) {
        const exactSelector = new RegExp(
          `${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{`,
        );
        expect(builtCss, selector).not.toMatch(exactSelector);
      }
    } finally {
      rmSync(probeRoot, { recursive: true, force: true });
    }
  }, 60_000);

  it("emits only Rain utilities or the current explicit structural allowlist from real sources", () => {
    const outputRoot = mkdtempSync(join(tmpdir(), "rain-b2-task4-real-source-"));
    try {
      const environment: Record<string, string | undefined> = {
        ...process.env,
        NO_COLOR: "1",
      };
      delete environment.FORCE_COLOR;
      const result = spawnSync(
        process.execPath,
        [
          join(workspaceRoot, "node_modules/vite/bin/vite.js"),
          "build",
          "--outDir",
          outputRoot,
          "--emptyOutDir",
        ],
        {
          cwd: absolute("apps/playground"),
          encoding: "utf8",
          env: environment,
          maxBuffer: 4 * 1024 * 1024,
          timeout: 10_000,
        },
      );
      expect(outputOf(result), "real-source Vite build").toMatch(/built in/i);
      expect(result.status, outputOf(result)).toBe(0);

      const cssFiles = readdirSync(join(outputRoot, "assets"))
        .filter((fileName) => fileName.endsWith(".css"));
      const builtCss = cssFiles
        .map((fileName) => readFileSync(join(outputRoot, "assets", fileName), "utf8"))
        .join("\n");
      const utilityBlock = extractCssBlock(builtCss, "@layer utilities");
      expect(utilityBlock, "Tailwind utilities layer").not.toBeNull();
      const require = createRequire(import.meta.url);
      const { transform: parseBuiltCss } = require(require.resolve("lightningcss", { paths: [dirname(require.resolve("@tailwindcss/vite"))] }));
      const collectCssClasses = (css: string) => {
        const emitted = new Set<string>();
        const relationMarker = (selector: any[]) => {
          const marker = selector[0], only = marker?.selectors?.[0]?.[0];
          if (marker?.type !== "pseudo-class" || marker.kind !== "where" || marker.selectors.length !== 1 || marker.selectors[0].length !== 1 || only?.type !== "class") return;
          const direction = /^group(?:\/[^/]+)?$/.test(only.name) ? "descendant" : /^peer(?:\/[^/]+)?$/.test(only.name) ? "later-sibling" : undefined;
          if (direction && selector.at(-2)?.type === "combinator" && selector.at(-2)?.value === direction && selector.at(-1)?.type === "universal"
            && selector.slice(1, -2).every(part => part.type === "attribute" || part.type === "pseudo-class" && !part.selectors)) return marker;
        };
        const collect = (selector: any[], ignoredMarker?: any) => {
          const anchored = selector.some(part => part.type === "class");
          for (const part of selector) {
            if (part === ignoredMarker) continue;
            if (part.type === "class") emitted.add(part.name);
            else if (part.type === "pseudo-class" && ["is", "where"].includes(part.kind))
              for (const nested of part.selectors) collect(nested, anchored ? relationMarker(nested) : undefined);
          }
        };
        parseBuiltCss({ code: Buffer.from(css), visitor: { Rule(rule: any) {
          if (rule.type === "style") for (const selector of rule.value.selectors) collect(selector);
        } } });
        return [...emitted].sort();
      };
      expect(collectCssClasses(':is(.\\*\\:h-full > *){height:100%}:where(:is(.\\*\\:w-full > *)){width:100%}')).toEqual(["*:h-full", "*:w-full"]);
      expect(collectCssClasses('.group-hover\\:block:is(:where(.group):hover *){display:block}.peer-checked\\:block:is(:where(.peer):checked ~ *){display:block}')).toEqual(["group-hover:block", "peer-checked:block"]);
      expect(collectCssClasses('.known:is(.unknown,:where(.nested)){display:block}:where(.group){display:block}')).toEqual(["group", "known", "nested", "unknown"]);
      const emittedUtilities = collectCssClasses(utilityBlock ?? "");
      const contract = readYaml("manifests/contracts/tailwind-b2.yaml");
      const currentStructuralAllowlist = new Set(
        contract.allowedStructuralUtilities,
      );
      validateTokenFoundationsV1Phase(readYaml("status/current-phase.yaml"));
      expect(validateTailwindB2SystemContract({ root: workspaceRoot })).toEqual([]);
      for (const utility of ["border-dashed", "flex-wrap", "overflow-x-auto"]) currentStructuralAllowlist.add(utility);
      if (hasTagBatchThreeAuthorization(readYaml("status/current-phase.yaml")))
        for (const utility of ["justify-between", "whitespace-normal"]) currentStructuralAllowlist.add(utility);
      if (hasDialogV2Authorization(readYaml("status/current-phase.yaml")))
        for (const utility of ["contents", "min-h-0", "overflow-y-auto", "shrink-0"]) currentStructuralAllowlist.add(utility);
      if (hasLayoutsV1Authorization(readYaml("status/current-phase.yaml")))
        for (const utility of ["flex-nowrap", "items-end", "items-stretch", "overflow-auto", "overflow-visible"]) currentStructuralAllowlist.add(utility);
      if (hasCardV2Authorization(readYaml("status/current-phase.yaml")))
        for (const utility of ["auto-rows-min", "col-start-1", "items-baseline", "justify-end", "wrap-anywhere", "order-1"]) currentStructuralAllowlist.add(utility);
      if (hasCardV2Authorization(readYaml("status/current-phase.yaml")) && readYaml("status/current-phase.yaml").componentRefinements.cardV2.visualRefinement)
        for (const utility of ["col-span-full", "grid-cols-1", "justify-start", "row-start-3"]) currentStructuralAllowlist.add(utility);
      if (hasTableRn08Authorization(readYaml("status/current-phase.yaml")))
        for (const utility of ["border-collapse", "caption-bottom", "list-none", "text-start"]) currentStructuralAllowlist.add(utility);
      if (hasBmBRn10Authorization(readYaml("status/current-phase.yaml")))
        for (const utility of ["flex-auto", "resize-none", "resize-y"]) currentStructuralAllowlist.add(utility);
      // Scanner output from comments, event/type strings and SVG/CSS attributes; no public class authorization.
      // Origins: evidence/runtime/rn15-delivery/tailwind-candidate-origins.json.
      const unusedScannerOutput = new Set(["container", "resize", "table", "transform"]);
      const { Scanner } = require(require.resolve("@tailwindcss/oxide", { paths: [dirname(require.resolve("@tailwindcss/vite"))] }));
      const stylesPath = absolute("apps/playground/src/styles.css");
      const scanner = new Scanner({ sources: [...readFileSync(stylesPath, "utf8").matchAll(/@source\s+(not\s+)?"([^"]+)";/g)]
        .map(match => ({ base: dirname(stylesPath), pattern: match[2], negated: Boolean(match[1]) })) });
      scanner.scan();
      const sources = new Map<string, string>(scanner.files.map((file: string) => [relative(workspaceRoot, file), readFileSync(file, "utf8")]));
      const expectedSources = JSON.parse(readFileSync(absolute("evidence/runtime/rn15-delivery/tailwind-candidate-origins.json"), "utf8")).unusedCandidateSources;
      const originPhase = readYaml("status/current-phase.yaml");
      const scopedOutput = new Set<string>();
      if (hasAvatarFamilyAuthorization(originPhase)) {
        const avatarOrigins = JSON.parse(readFileSync(absolute("evidence/runtime/avatar/tailwind-candidate-origins.json"), "utf8"));
        for (const [word, origins] of Object.entries(avatarOrigins)) Object.assign(expectedSources[word], origins);
      }
      if (hasInputNumberAuthorization(originPhase)) {
        const origins = JSON.parse(readFileSync(absolute("evidence/runtime/input-number/tailwind-candidate-origins.json"), "utf8"));
        for (const [word, entries] of Object.entries(origins)) Object.assign(expectedSources[word], entries);
      }
      // Later registered owners contain these scanner words as CSS properties,
      // Portal props, view/route ids, local variables and review prose, never utility classes.
      // Preserve RN15 bytes; exact successors remain invalid after any source mutation.
      if (hasAlertAuthorization(originPhase)) expectedSources.container["packages/ui/src/alert/alert.css"] = "7b659cde913b7f468edbe474b5c10ed6d80e8121743296bdb9300e697edb772d"; // alert/source-lock.json
      if (hasTooltipAuthorization(originPhase)) expectedSources.container["packages/ui/src/tooltip/tooltip.tsx"] = "d23bc3d21c01ae7686eea781d0ee6fcb5d561f26f4d76529b410221fba8b1fb9"; // tooltip-classic/source-sha256.json
      if (originPhase.navigationComponentsV042?.humanGate === "accepted" && originPhase.navigationComponentsV042W6W8?.authorization === "authorized") {
        const snapshotPath = "evidence/runtime/navigation-v042/w6/review-02/final-source.json";
        expect(hash(absolute(snapshotPath))).toBe("03dbe4ea246a33c8a31368e060e8a764e55854fbc85f1f25bb016cce8c0504d1");
        const snapshot = JSON.parse(readFileSync(absolute(snapshotPath), "utf8")).filesSha256;
        for (const [word, file] of [
          ["table", "apps/playground/src/recipes/navigation-v042/r4-r6.tsx"],
          ["table", "apps/playground/src/recipes/navigation-w6/review-workbench.css"],
          ["transform", "packages/ui/src/navigation/navigation.css"],
          ["transform", "packages/ui/src/styles.css"],
        ] as const) expectedSources[word][file] = snapshot[file];
        // 2026-10-06 source audit: table route literals, a browser-test local variable,
        // and README resize-review prose; no public class authorization is added.
        expectedSources.table["apps/playground/src/app.tsx"] = "620962061e2c090b5a4486a46a2daa6151ac4d4abab79ad47b259feade1a3e4a";
        expectedSources.container["packages/ui/src/navigation/navigation-isolation.browser.mjs"] = "ffc4d1dba9edd16c592515cd67fa56c1db088f493c7e4fd34b01d3729cb1a736";
        expectedSources.resize["apps/playground/src/recipes/navigation-v042/README-W5.md"] = "fa8435f93b968d3918c7be8a1ced0bc6b68ec4245365e8a4afe68f9a45abc4fd";
      }
      // G3's registered native geometry is a successor scope, not a B2 default.
      // Audit every emitting source, including lexical hits; another owner cannot use these classes.
      if (hasRecordedPostB2Refinement(originPhase, "tokenFirstV12G3") && hasTreeAuthorization(originPhase)) {
        expect(hasAvatarFamilyAuthorization(originPhase)).toBe(true);
        expect(originPhase.navigationComponentsV042?.humanGate).toBe("accepted");
        expect(originPhase.navigationComponentsV042W6W8?.authorization).toBe("authorized");
        const registered = new Set(JSON.parse(readFileSync(absolute("registry/token-first-g3.json"), "utf8")).items.flatMap((item: any) => item.files));
        for (const [file, checksum, candidates] of [
          ["scroll-area", "68209209455dc71401e6df78e52c54a6ad80f10d31fe83202d061ce4cc7d7982", ["border-l", "border-t", "min-w-full", "touch-none"]],
          ["sidebar", "6e8d36bf69f51173b33f88a51634ca0af912755ef882640641b033ea47d021f9", ["border-0"]],
          ["sheet", "e33d49d7a9c8725dea777e63682a3bb19ee7e38091c7f0aa694b010aaad3f168", ["fixed", "max-h-[100dvh]", "z-20", "z-30"]],
          ["menubar", "d88da91f79994c8b399cef7f4d8eb54492980c39a55ae8ba70b038e25b08f64c", ["border-0", "border-t"]],
          ["context-menu", "0c36c3385fc92b69d7cd1354993f7d3aeee56a3b268bb2ed18deb02d09e1be5d", ["border-t"]],
          ["navigation-menu", "efc4aaa448bc3371c4ef1a86bb5341082fc1fdd846bef9dbd5846cfdf166f688", ["border-0"]],
          ["hover-card", "5022e79a86c232dc9cc42ee188c8eec4339f7fce80919b83cd86139e991e9866", ["hover:underline", "underline-offset-2"]],
        ] as const) {
          const path = `packages/ui/src/${file}/${file}.tsx`;
          expect(registered.has(path), "geometry owner must remain in the scoped G3 Registry").toBe(true);
          for (const candidate of candidates) {
            (expectedSources[candidate] ??= {})[path] = checksum;
            scopedOutput.add(candidate.replaceAll("[", "\\[").replaceAll("]", "\\]").replaceAll(":", "\\:") + (candidate === "hover:underline" ? ":hover" : ""));
          }
        }
        // Only comments, native CSS terminology and README prose emit these additional hits.
        expectedSources.collapse = {
          "packages/ui/src/tree/tree.tsx": "5a2a4d79ff3f9ae6aeb8006501afc6f7282eb7c6b69bbe0d924c45cb798642d8",
          "packages/ui/src/tree/README.md": "31772f3d7039a559045015e6d7ce045c299bed26f51145106b627cbb19fd578c",
          "apps/playground/src/patterns/manage-tree/README.md": "b10553ab9b625ff90e909f522434755dc58509ed65528b8e3d2c8d79e88b22f4",
        };
        Object.assign(expectedSources.fixed, {
          "packages/ui/src/navigation/README-W3.md": "e8f079c438c7bb59588b5642fb14f2388d14b8d0f9ec0cbb98ef3994a73dbeb9",
          "packages/ui/src/tree/tree.tsx": "5a2a4d79ff3f9ae6aeb8006501afc6f7282eb7c6b69bbe0d924c45cb798642d8",
          "apps/playground/src/recipes/navigation-v042/r1-r3.css": "8f1862b217e2ab3167390489647a3c6fa34e393587ddd55876a6c37f4b6d9837",
          "apps/playground/src/recipes/navigation-v042/README-W5.md": "fa8435f93b968d3918c7be8a1ced0bc6b68ec4245365e8a4afe68f9a45abc4fd",
          "packages/ui/src/avatar/avatar.css": "7e3dc104d277cdd7248bc5f062b9e7cfb1a62603323b934ae8887bca0676d069",
        });
        scopedOutput.add("collapse");
      }
      if (hasG123PlaygroundAssetizationAuthorization(originPhase)) {
        // Keep prior origin audit files and hashes; only this finite successor inventory replaces its own current sources.
        const successor = getG123TailwindCandidateOrigins(workspaceRoot, originPhase);
        for (const candidate of successor.structuralClasses) scopedOutput.add(candidate);
        for (const origins of Object.values(expectedSources) as Record<string, string>[]) for (const file of Object.keys(successor.sourceFiles)) delete origins[file];
        for (const [word, origins] of Object.entries(successor.unusedCandidateSources)) Object.assign((expectedSources[word] ??= {}), origins);
      }
      const chart = getRecordedChartSourceBindings(workspaceRoot, originPhase);
      const g23 = getG23DocumentationSourceBindings(workspaceRoot, originPhase);
      const g4 = getG4SourceBindings(workspaceRoot, originPhase), g5 = getG5SourceBindings(workspaceRoot, originPhase);
      const g6 = getG6SourceBindings(workspaceRoot);
      const registeredOrigins = [getRecordedNavigationSourceBindings(workspaceRoot, originPhase)?.sourceFiles,
        g23.sourceFiles, g23.lexicalSourceFiles, g4.sourceFiles, g5.sourceFiles, chart?.sourceFiles, g6?.sourceFiles];
      const verifiedPaths = new Set(registeredOrigins.flatMap(record => Object.keys(record ?? {})));
      for (const [file, current] of [
        ["packages/ui/src/sidebar/sidebar.tsx", "a7c48c6fa67d60b48e5fbae80a0c7aea9af666e79250c9ddc9eefb6d0f47dbf3"],
        ["packages/ui/src/scroll-area/scroll-area.tsx", "edd0d79cd5ca6a1502623803170109d4539dee70f8e552eebbc886f7942e73e4"],
        ["packages/ui/src/accordion/accordion.tsx", "e3cf937ef64e666c4ce41080b56c8e54b2630a4484645f9a7e4c13dde8b6bdb8"],
      ] as const) {
        expect(hash(absolute(file)), file).toBe(current);
        verifiedPaths.add(file);
      }
      for (const file of verifiedPaths) {
        const content = sources.get(file); if (content === undefined) continue;
        if (g6?.sourceFiles[file]?.after) expect(createHash("sha256").update(content).digest("hex"), `finite G6 lexical source: ${file}`).toBe(g6.sourceFiles[file].after);
        const candidates = new Set<string>(scanner.getCandidatesWithPositions({ content, extension: file.split(".").at(-1) }).map((entry: { candidate: string }) => entry.candidate));
        for (const word of Object.keys(expectedSources)) {
          delete expectedSources[word][file];
          if (candidates.has(word)) expectedSources[word][file] = createHash("sha256").update(content).digest("hex");
        }
        if (chart?.sourceFiles[file] || g4.sourceFiles[file] || g5.sourceFiles[file] || g6?.sourceFiles[file]?.after) for (const candidate of candidates) scopedOutput.add(candidate.replaceAll("[", "\\[").replaceAll("]", "\\]").replaceAll(":", "\\:") + (candidate.startsWith("hover:") ? ":hover" : ""));
      }
      const auditedCandidates = new Set<string>(Object.keys(expectedSources));
      // ponytail: freeze audited origins; re-audit changed files instead of adding a class-dataflow analyzer.
      const collectOrigins = (sources: Map<string, string>) => {
        const origins: Record<string, Record<string, string>> = Object.fromEntries([...auditedCandidates].map(word => [word, {}]));
        for (const [file, content] of sources) {
          const candidates = new Set(scanner.getCandidatesWithPositions({ content, extension: file.split(".").at(-1) }).map((entry: { candidate: string }) => entry.candidate));
          for (const word of auditedCandidates) if (candidates.has(word)) {
            const expected = expectedSources[word]?.[file];
            origins[word]![file] = file === "packages/ui/src/styles.css" && expected && matchesRn15ProtectedSource(file, content, expected, originPhase, [])
              ? expected : createHash("sha256").update(content).digest("hex");
          }
        }
        return origins;
      };
      expect(collectOrigins(sources)).toEqual(expectedSources);
      const existingSource = "apps/playground/src/app.tsx";
      for (const word of auditedCandidates) for (const file of [existingSource, "apps/playground/src/rn15-unregistered.tsx"]) {
        for (const extra of [`\nconst probe = <div className="${word}" />;`, `\nconst recipe = defineRainLocalRecipe({ classes: { root: "${word}" } });`]) {
          expect(collectOrigins(new Map(sources).set(file, (sources.get(file) ?? "") + extra))).not.toEqual(expectedSources);
        }
      }
      expect(collectOrigins(new Map(sources).set("packages/ui/src/styles.css", sources.get("packages/ui/src/styles.css") + "\n.probe { transform: none; }"))).not.toEqual(expectedSources);
      const removedSource = new Map(sources); removedSource.delete(existingSource);
      expect(collectOrigins(removedSource)).not.toEqual(expectedSources);
      const normalizeUtility = (utility: string) => {
        if (utility === "\\[\\&\\>\\.rain-icon\\]\\:size-full>.rain-icon") return "size-full";
        const unescaped = utility.replaceAll("\\:", ":").replaceAll("\\*", "*");
        const withoutSelectorSuffix = unescaped.replace(/\[aria-(?:disabled|selected)=(?:true|false)\]/g, "").replace(/\[data-disabled\]/g, "").replace(/>\*\)$/, "").replace(/:has\(:disabled\)$/, "");
        const withoutStateSuffix = withoutSelectorSuffix.replace(
          /:(?:active|focus-visible|hover|disabled|enabled)$/,
          "",
        );
        return withoutStateSuffix.split(":").at(-1) ?? withoutStateSuffix;
      };
      expect(emittedUtilities).toEqual(expect.arrayContaining(["block"]));
      scopedOutput.add("[&_a]:underline");
      const currentScopedOutput = new Set([...scopedOutput].map(candidate => candidate.replace(/\\(.)/g, "$1").replace(/:hover$/, "")));
      const unexpectedUtilities = emittedUtilities.filter((utility) =>
        !currentStructuralAllowlist.has(normalizeUtility(utility)) &&
        !unusedScannerOutput.has(utility) && !currentScopedOutput.has(utility) && !/(?:^|-)rain-/.test(utility));
      expect(unexpectedUtilities, `unexpected non-Rain utilities: ${unexpectedUtilities.join(", ")}`).toEqual([]);
    } finally {
      rmSync(outputRoot, { recursive: true, force: true });
    }
  }, 60_000);

  it("keeps the complete generated icon tree aligned with its frozen source inventory", async () => {
    const result = await verifyIcons({ root: workspaceRoot, bundle: false });
    expect(result).toMatchObject({
      count: 899,
      available: 899,
      unavailable: 0,
      sourceFailures: [],
    });
    expect(result.generatedFiles).toBe(1806);
  }, 60_000);

  it("passes both the Task 4 bridge verifier and the fail-closed phase boundary", () => {
    for (const script of [verifierPath, boundaryVerifierPath]) {
      const result = runScript(script, workspaceRoot);
      expect(outputOf(result)).toMatch(/verification passed/i);
      expect(result.status).toBe(0);
    }
  }, 20000);

  it("keeps the Task 4 Foundations allowlist and package export exact", () => {
    const adjacentPath = absolute(
      "packages/foundations/src/tailwind-unplanned.ts",
      fixtureRoot,
    );
    try {
      writeFileSync(adjacentPath, "export const unplanned = true;\n");
      const adjacent = runScript(boundaryVerifierPath, fixtureRoot);
      expect(outputOf(adjacent)).toMatch(/source file outside.*allowlist/i);
      expect(adjacent.status).toBe(1);
    } finally {
      rmSync(adjacentPath, { force: true });
    }

    const packagePath = absolute("packages/foundations/package.json", fixtureRoot);
    const originalPackage = readFileSync(packagePath, "utf8");
    try {
      const document = JSON.parse(originalPackage);
      document.exports["./tailwind-unplanned.css"] = "./src/tokens.css";
      writeFileSync(packagePath, `${JSON.stringify(document, null, 2)}\n`);
      const extraExport = runScript(boundaryVerifierPath, fixtureRoot);
      expect(outputOf(extraExport)).toMatch(/Foundations source exports.*mismatch/i);
      expect(extraExport.status).toBe(1);
    } finally {
      writeFileSync(packagePath, originalPackage);
    }
  }, 20000);

  it("allows only the confirmed IconButton semantic manifest supplement while preserving the frozen baseline", () => {
    const path = absolute("manifests/icons.json", fixtureRoot);
    const original = readFileSync(path, "utf8");
    const usages = Object.fromEntries([
      ...["rating-star", "favorite", "like", "dislike", "like-alt-2", "pin-top-alt-2", "pin", "expand", "collapse"].map((slug) => [`icon/${slug}`, "default"]),
      ...["rating-star-100", "favorite-filled", "like-filled", "dislike-filled", "like-alt", "pin-top-alt", "filter-filled"].map((slug) => [`icon/${slug}`, "explicit"]),
    ]);
    const confirmed = JSON.parse(original);
    for (const item of confirmed.items) if (Object.hasOwn(usages, item.id)) item.usageStatus = usages[item.id];
    const baseline = structuredClone(confirmed);
    for (const item of baseline.items) if (Object.hasOwn(usages, item.id)) item.usageStatus = "unconfirmed";
    const write = (manifest: any) => writeFileSync(path, `${JSON.stringify(manifest, null, 2)}\n`);
    try {
      for (const manifest of [baseline, confirmed]) {
        write(manifest);
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot })).toEqual([]);
      }
      for (const mutate of [
        (manifest: any) => { manifest.items.find((item: any) => item.id === "icon/layout-split").usageStatus = "default"; },
        (manifest: any) => { manifest.items.find((item: any) => item.id === "icon/filter").usageStatus = "explicit"; },
        (manifest: any) => { manifest.items.find((item: any) => item.id === "icon/favorite").usageStatus = "explicit"; },
        (manifest: any) => { manifest.items.find((item: any) => item.id === "icon/pin").usageStatus = "unconfirmed"; },
        (manifest: any) => { manifest.items.find((item: any) => item.id === "icon/favorite").colorMode = "intrinsic"; },
        (manifest: any) => { manifest.humanGate = "not-evaluated"; },
      ]) {
        const invalid = structuredClone(confirmed);
        mutate(invalid);
        write(invalid);
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n"))
          .toMatch(/protected icon artifact changed: manifests\/icons.json/);
      }
      const statusPath = absolute("status/current-phase.yaml", fixtureRoot);
      const originalStatus = readFileSync(statusPath, "utf8");
      try {
        write(confirmed);
        const status = parseYamlSubset(originalStatus) as any;
        delete status.componentRefinements.iconButton;
        writeFileSync(statusPath, renderYaml(status));
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n"))
          .toMatch(/protected icon artifact changed: manifests\/icons.json/);
      } finally {
        writeFileSync(statusPath, originalStatus);
      }
    } finally {
      writeFileSync(path, original);
    }
  }, 20000);

  it("preserves the frozen icons while validating only the exact grading additions", () => {
    const path = absolute("manifests/icons.json", fixtureRoot);
    const original = readFileSync(path, "utf8");
    try {
      for (const mutate of [
        (manifest: any) => { manifest.items.find((item: any) => item.id === "icon/grading-pending").figmaMapping.componentKey = "f".repeat(40); },
        (manifest: any) => { manifest.sourceAdditions.humanGate = "accepted"; },
        (manifest: any) => { manifest.items.push({ ...manifest.items.find((item: any) => item.id === "icon/grading-reviewed"), id: "icon/grading-extra" }); },
      ]) {
        const candidate = JSON.parse(original);
        mutate(candidate);
        writeFileSync(path, JSON.stringify(candidate));
        expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/protected icon artifact changed: manifests\/icons.json/);
      }
    } finally { writeFileSync(path, original); }
    const glyphPath = absolute("packages/ui/src/icons/assets/grading-reviewed.svg", fixtureRoot);
    const glyph = readFileSync(glyphPath, "utf8");
    try {
      writeFileSync(glyphPath, glyph.replace('viewBox="0 0 12 12"', 'viewBox="0 0 24 24"'));
      expect(validateTailwindB2CompositionBridge({ root: fixtureRoot }).join("\n")).toMatch(/QuestionNumber grading icon differs/);
    } finally { writeFileSync(glyphPath, glyph); }
  });

  it.each([
    {
      label: "private reference color exposure",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace(
        "@theme inline {",
        "@theme inline {\n  --color-rain-private-blue: var(--rain-ref-blue-500);",
      ),
      expected: /private.*rain-ref|rain-ref.*bridge/i,
    },
    {
      label: "default breakpoint reintroduction",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace(
        "@theme inline {",
        "@theme inline {\n  --breakpoint-sm: 40rem;",
      ),
      expected: /breakpoint|default.*theme/i,
    },
    {
      label: "missing Tailwind reset",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace("--*: initial;", ""),
      expected: /reset|default.*theme/i,
    },
    {
      label: "changed Button color Token",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace(
        /--rain-button-secondary-hover-bg: [^;]+;/,
        "--rain-button-secondary-hover-bg: #ffffff;",
      ),
      expected: /component Token contract.*secondary-hover/i,
    },
    {
      label: "missing Input baseline Token",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace("  --rain-input-gap: var(--rain-space-8);\n", ""),
      expected: /component Token contract.*input-gap/i,
    },
    {
      label: "unexpected semantic color Token",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace(
        "  --rain-color-brand-primary: var(--rain-ref-blue-500);",
        "  --rain-color-brand-primary: var(--rain-ref-blue-500);\n  --rain-color-unplanned: #ffffff;",
      ),
      expected: /semantic color Token contract.*unexpected.*color-unplanned/i,
    },
    {
      label: "changed semantic color Token value",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace(
        "--rain-color-brand-primary: var(--rain-ref-blue-500);",
        "--rain-color-brand-primary: var(--rain-ref-blue-600);",
      ),
      expected: /semantic color Token contract.*brand-primary.*expected/i,
    },
    {
      label: "changed locked reference color",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace(
        "--rain-ref-blue-500: #1561F8;",
        "--rain-ref-blue-500: #FF0000;",
      ),
      expected: /private reference color baseline.*blue-500.*expected/i,
    },
    {
      label: "reference Token hidden in a CSS string",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace(
        "--rain-ref-blue-500: #1561F8;",
        'content: "--rain-ref-blue-500: #1561F8;";',
      ),
      expected: /private reference color baseline.*missing.*blue-500/i,
    },
    {
      label: "composition Token hidden in a CSS string",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace(
        "--rain-space-8: 8px;",
        'content: "--rain-space-8: 8px;";',
      ),
      expected: /CSS composition spacing.*missing.*space-8/i,
    },
    {
      label: "component Token hidden in a CSS string",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace(
        "--rain-input-gap: var(--rain-space-8);",
        'content: "--rain-input-gap: var(--rain-space-8);";',
      ),
      expected: /component Token contract.*missing.*input-gap/i,
    },
    {
      label: "non-numeric public composition Token",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace(
        "  --rain-space-32: 32px;",
        "  --rain-space-32: 32px;\n  --rain-space-business: 13px;",
      ),
      expected: /CSS composition spacing.*unexpected.*space-business/i,
    },
    {
      label: "changed locked radius Token",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace(
        "--rain-radius-6: 6px;",
        "--rain-radius-6: 99px;",
      ),
      expected: /radius and shadow Token contract.*radius-6.*expected/i,
    },
    {
      label: "protected Token nested under an allowed root",
      filePath: "packages/foundations/src/tokens.css",
      mutate: (source: string) => source.replace(
        "--rain-shadow-dialog: 0 24px 64px rgb(19 48 91 / 16%);",
        ".evil { --rain-shadow-dialog: 0 24px 64px rgb(19 48 91 / 16%); }",
      ),
      expected: /public Token source.*shadow-dialog.*outside a direct allowed root scope/i,
    },
    {
      label: "undefined bridge source Token",
      filePath: "packages/foundations/src/focus.css",
      mutate: (source: string) => source.replace(/  --rain-focus-width: [^;]+;\n/, ""),
      expected: /theme mapping source is not defined.*rain-focus-width/i,
    },
    {
      label: "changed Motion Token baseline",
      filePath: "packages/foundations/src/motion.css",
      mutate: (source: string) => source.replace(
        "--rain-motion-overlay-duration: 180ms;",
        "--rain-motion-overlay-duration: 999ms;",
      ),
      expected: /Motion Token contract.*overlay-duration.*expected/i,
    },
    {
      label: "typography Token nested outside the direct root scope",
      filePath: "packages/foundations/src/typography.css",
      mutate: (source: string) => source.replace(
        /--rain-type-data-line: (var\(--rain-line-height-[0-9]+\));/,
        ".evil { --rain-type-data-line: $1; }",
      ),
      expected: /typography Token source.*type-data-line.*outside a direct allowed root scope/i,
    },
    {
      label: "comment-camouflaged component mapping",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace(
        "  --color-rain-button-secondary-hover: var(--rain-button-secondary-hover-bg);",
        "  /* --color-rain-button-secondary-hover: var(--rain-button-secondary-hover-bg); */",
      ),
      expected: /theme mapping contract.*secondary-hover|does not expose.*secondary-hover/i,
    },
    {
      label: "duplicate component mapping",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace(
        "  --spacing-rain-input-gap: var(--rain-input-gap);",
        "  --spacing-rain-input-gap: var(--rain-input-gap);\n  --spacing-rain-input-gap: var(--rain-input-gap);",
      ),
      expected: /declare.*spacing-rain-input-gap.*exactly once/i,
    },
    {
      label: "missing Button icon-host font-size mapping",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace(
        "  --text-rain-button-text-regular-leading-icon: var(--rain-button-text-regular-leading-icon-size);\n",
        "",
      ),
      expected: /theme mapping contract.*missing.*text-rain-button-text-regular-leading-icon/i,
    },
    {
      label: "default visual alias reintroduction",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace(
        "@theme inline {",
        "@theme inline {\n  --color-red-500: var(--rain-color-action-danger);",
      ),
      expected: /unexpected declaration --color-red-500/i,
    },
    {
      label: "extra raw custom utility in the bridge",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => `${source}\n@utility bg-evil {\n  background: #f00;\n}\n`,
      expected: /theme bridge top-level structure.*invalid/i,
    },
    {
      label: "changed Button transition interoperability utility",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace(
        "transition-property: color, background-color, opacity;",
        "transition-property: all;",
      ),
      expected: /transition-rain-button utility.*directly and only/i,
    },
    {
      label: "changed ordinary Button Focus interoperability utility",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace(
        "--rain-focus-width: var(--rain-button-focus-outline-width);",
        "--rain-focus-width: 99px;",
      ),
      expected: /focus-rain-button utility.*directly and only/i,
    },
    {
      label: "changed text Button Focus interoperability utility",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace(
        "--rain-focus-width: var(--rain-button-text-focus-outline-width);",
        "--rain-focus-width: 99px;",
      ),
      expected: /focus-rain-button-text utility.*directly and only/i,
    },
    {
      label: "nested raw rule in the theme mapping block",
      filePath: "packages/foundations/src/tailwind-theme.css",
      mutate: (source: string) => source.replace(
        "@theme inline {",
        "@theme inline {\n  .evil { color: #f00; }",
      ),
      expected: /theme mapping block may contain only custom-property declarations/i,
    },
    {
      label: "extra TypeScript composition Token",
      filePath: "packages/foundations/src/composition-contract.ts",
      mutate: (source: string) => source.replace(
        '  32: "32px",',
        '  32: "32px",\n  30: "30px",',
      ),
      expected: /TypeScript composition spacing.*unexpected.*30/i,
    },
    {
      label: "comment-camouflaged TypeScript composition contract",
      filePath: "packages/foundations/src/composition-contract.ts",
      mutate: (source: string) => source.replace(
        /export const compositionSpaceTokens = \{[\s\S]*?\} as const;/,
        (contract) => `/* ${contract} */`,
      ),
      expected: /compositionSpaceTokens object is missing or malformed/i,
    },
    {
      label: "missing public composition export",
      filePath: "packages/foundations/src/index.ts",
      mutate: (source: string) => source.replace("  compositionSpaceTokens,\n", ""),
      expected: /public index runtime exports.*invalid/i,
    },
    {
      label: "comment-camouflaged public composition exports",
      filePath: "packages/foundations/src/index.ts",
      mutate: (source: string) => source.replace(
        /export \{\n  compositionSpaceTokenEntries,\n  compositionSpaceTokens,\n\} from "\.\/composition-contract";\nexport type \{ CompositionSpaceTokenName \} from "\.\/composition-contract";/,
        (exports) => `/* ${exports} */`,
      ),
      expected: /public index runtime exports.*invalid/i,
    },
    {
      label: "string-camouflaged public composition exports",
      filePath: "packages/foundations/src/index.ts",
      mutate: (source: string) => source.replace(
        /export \{\n  compositionSpaceTokenEntries,\n  compositionSpaceTokens,\n\} from "\.\/composition-contract";\nexport type \{ CompositionSpaceTokenName \} from "\.\/composition-contract";/,
        (exports) => `const compositionExportCamouflage = ${JSON.stringify(exports)};`,
      ),
      expected: /public index runtime exports.*invalid/i,
    },
    {
      label: "wildcard public composition re-export",
      filePath: "packages/foundations/src/index.ts",
      mutate: (source: string) => `${source}\nexport * from "./composition-contract";\n`,
      expected: /public index re-export inventory.*invalid/i,
    },
    {
      label: "namespace public composition re-export",
      filePath: "packages/foundations/src/index.ts",
      mutate: (source: string) => (
        `${source}\nexport * as compositionContract from "./composition-contract";\n`
      ),
      expected: /public index re-export inventory.*invalid/i,
    },
    {
      label: "regex-camouflaged wildcard public composition re-export",
      filePath: "packages/foundations/src/index.ts",
      mutate: (source: string) => (
        `${source}\nconst compositionExportCamouflage = /"/;\n` +
        'export * from "./composition-contract";\n'
      ),
      expected: /public index re-export inventory.*invalid/i,
    },
    {
      label: "control-statement regex-camouflaged wildcard public composition re-export",
      filePath: "packages/foundations/src/index.ts",
      mutate: (source: string) => (
        `${source}\nif (true) /"/.test("");\n` +
        'export * from "./composition-contract";\n'
      ),
      expected: /public index re-export inventory.*invalid/i,
    },
    {
      label: "JavaScript-suffixed alias public composition re-export",
      filePath: "packages/foundations/src/index.ts",
      mutate: (source: string) => (
        `${source}\nexport { compositionSpaceTokens as compositionSpaceTokensJs } ` +
        'from "./composition-contract.js";\n'
      ),
      expected: /public index full re-export inventory.*invalid/i,
    },
    {
      label: "unregistered inline source",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        "\n:root {",
        '\n@source inline("bg-[red]");\n\n:root {',
      ),
      expected: /source detection directives.*exactly/i,
    },
    {
      label: "second Tailwind import",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        '@source "../../../packages/ui/src";',
        '@source "../../../packages/ui/src";\n@import "tailwindcss";',
      ),
      expected: /application import directives.*exactly/i,
    },
    {
      label: "second Foundations theme import",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        '@source "../../../packages/ui/src";',
        '@source "../../../packages/ui/src";\n@import "@rain-next/foundations/tailwind-theme.css";',
      ),
      expected: /application import directives.*exactly/i,
    },
    {
      label: "selector-nested Tailwind theme import",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        ":root {",
        ':root {\n  @import "tailwindcss/theme.css";',
      ),
      expected: /application import directives.*exactly/i,
    },
    {
      label: "media-nested Tailwind theme import",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        "@media (max-width: 760px) {",
        '@media (max-width: 760px) {\n  @import "tailwindcss/theme.css";',
      ),
      expected: /application import directives.*exactly/i,
    },
    {
      label: "selector-nested Tailwind reference",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        ":root {",
        ':root {\n  @reference "tailwindcss/theme.css";',
      ),
      expected: /must not reopen Tailwind through a load directive.*reference/i,
    },
    {
      label: "media-nested source directive",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        "@media (max-width: 760px) {",
        '@media (max-width: 760px) {\n  @source inline("bg-rain-brand-primary");',
      ),
      expected: /source detection directives.*exactly/i,
    },
    {
      label: "application theme block reopens a default color",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => `${source}\n@theme { --color-blue-500: #f00; }\n`,
      expected: /must not reopen Tailwind through a block directive.*theme/i,
    },
    {
      label: "selector-nested application theme block reopens a default color",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        ":root {",
        ":root {\n  @theme { --color-blue-500: #f00; }",
      ),
      expected: /must not reopen Tailwind through a block directive.*theme/i,
    },
    {
      label: "media-nested application theme block reopens a default color",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        "@media (max-width: 760px) {",
        "@media (max-width: 760px) {\n  @theme { --color-blue-500: #f00; }",
      ),
      expected: /must not reopen Tailwind through a block directive.*theme/i,
    },
    {
      label: "application custom utility block",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => `${source}\n@utility bg-evil { background: #f00; }\n`,
      expected: /must not reopen Tailwind through a block directive.*utility/i,
    },
    {
      label: "commented icon source exclusion",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        '@source not "../../../packages/ui/src/icons";',
        '/* @source not "../../../packages/ui/src/icons"; */',
      ),
      expected: /source detection directives.*exactly/i,
    },
    {
      label: "commented UI test source exclusion",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        '@source not "../../../packages/ui/src/**/*.test.{ts,tsx}";',
        '/* @source not "../../../packages/ui/src/**/*.test.{ts,tsx}"; */',
      ),
      expected: /source detection directives.*exactly/i,
    },
    {
      label: "source exclusion hidden in a CSS string",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        '@source not "../../../packages/ui/src/icons";',
        `.fake::before { content: '@source not "../../../packages/ui/src/icons";'; }`,
      ),
      expected: /source detection directives.*exactly/i,
    },
    {
      label: "broad workspace source scan",
      filePath: "apps/playground/src/styles.css",
      mutate: (source: string) => source.replace(
        '@source "../../../packages/ui/src";',
        '@source "../../../";',
      ),
      expected: /source.*packages\/ui\/src|source detection|scan/i,
    },
    {
      label: "protected icon tree mutation",
      filePath: "packages/ui/src/icons/assets/arrow-down.svg",
      mutate: (source: string) => `${source}\n`,
      expected: /protected icon tree changed/i,
    },
  ])("rejects $label", ({ filePath, mutate, expected }) => {
    const result = mutateAndVerify(filePath, mutate);
    expect(outputOf(result)).toMatch(expected);
    expect(result.status).toBe(1);
  });
});

describe("Tailwind B2 Task 7 Button migration contract", () => {
  let fixtureRoot: string;

  beforeAll(() => {
    fixtureRoot = mkdtempSync(join(tmpdir(), "rain-b2-task7-"));
    copyCurrentGovernanceFixture(workspaceRoot, fixtureRoot);
  }, 60_000);

  afterAll(() => {
    if (fixtureRoot) rmSync(fixtureRoot, { recursive: true, force: true });
  }, 30_000);

  it("records the Tailwind-first Button source with the current authorized Human Gates", () => {
    const button = readYaml("manifests/ui/button.yaml");
    const contract = readYaml("manifests/contracts/tailwind-b2.yaml");
    const phase = readYaml("status/current-phase.yaml");
    expect(() => validateTokenFoundationsV1Phase(phase)).not.toThrow();

    expect(button).toMatchObject({
      styleSourcePath: "packages/ui/src/button/button.styles.ts",
      lifecycle: {
        implementation: "tailwind-first-cva-local-recipe",
        ordinaryHumanGate: "accepted",
        textHumanGate: phase.componentRefinements.textButton.humanGate,
      },
    });
    expect(button.props).toEqual(expect.arrayContaining(["className", "localRecipe"]));
    expect(
      contract.cssExceptions.entries
        .filter(({ component }: { component: string }) => component === "ui-button")
        .map(({ id, status }: { id: string; status: string }) => ({ id, status })),
    ).toEqual([
      { id: "button-loading-mask", status: "implemented-task-7" },
      { id: "button-forced-colors", status: "implemented-task-7" },
      { id: "button-reduced-motion", status: "implemented-task-7" },
    ]);
  });

  it("accepts the real Tailwind-first Button and its registered CSS exceptions", () => {
    expect(validateTailwindB2SystemContract({ root: workspaceRoot })).toEqual([]);
  });

  it.each([
    {
      label: "ordinary Button CSS returns",
      mutate: (source: string) => `${source}\n.rain-button[data-size="medium"] { height: 36px; }\n`,
      expected: /Button.*native CSS|unregistered Button CSS/i,
    },
    {
      label: "a Button exception loses its manifest marker",
      mutate: (source: string) => source.replace(
        "/* @rain-css-exception button-loading-mask */",
        "/* missing governed exception marker */",
      ),
      expected: /Button CSS exception.*marker|unregistered Button CSS/i,
    },
  ])("rejects when $label", ({ mutate, expected }) => {
    const filePath = absolute("packages/ui/src/styles.css", fixtureRoot);
    const original = readFileSync(filePath, "utf8");
    try {
      writeFileSync(filePath, mutate(original));
      expect(
        validateTailwindB2SystemContract({ root: fixtureRoot }),
      ).toEqual(expect.arrayContaining([expect.stringMatching(expected)]));
    } finally {
      writeFileSync(filePath, original);
    }
  });

  it("rejects a manifest that points Button styling back to global CSS", () => {
    const filePath = absolute("manifests/ui/button.yaml", fixtureRoot);
    const original = readFileSync(filePath, "utf8");
    try {
      writeFileSync(
        filePath,
        original.replace(
          'styleSourcePath: "packages/ui/src/button/button.styles.ts"',
          'styleSourcePath: "packages/ui/src/styles.css"',
        ),
      );
      expect(validateTailwindB2SystemContract({ root: fixtureRoot })).toEqual(
        expect.arrayContaining([
          expect.stringMatching(/Button.*styleSourcePath.*button\.styles\.ts/i),
        ]),
      );
    } finally {
      writeFileSync(filePath, original);
    }
  });
});
