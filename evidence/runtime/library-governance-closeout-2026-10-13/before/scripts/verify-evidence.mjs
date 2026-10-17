import { hasM2Authorization, hasBmARn09Authorization, hasBmBRn10Authorization, hasRn13Authorization } from "./verification-helpers.mjs";
import { verifyAssetIndex } from "./asset-index.mjs";
import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import { createHash } from "node:crypto";
import {
  basename,
  extname,
  isAbsolute,
  join,
  relative,
  resolve,
} from "node:path";

import {
  getCurrentB2Status,
  parseStaticArrayExport,
  parseYamlSubset,
} from "./verification-helpers.mjs";

const workspaceRoot = process.cwd();
const failures = [];

const expectedEntryStatus = {
  registration: "registered",
  registrationBasis: "conversation-confirmed",
  liveInspection: "live-reinspected",
  implementation: "not-started",
  automatedVerification: "not-run",
  humanGate: "not-evaluated",
};

const expectedProjectLifecycle = {
  figmaMaterialWrite: "not-authorized",
  figmaComponentPublication: "not-authorized",
  packageRegistryPublication: "not-authorized",
  businessMigration: "not-authorized",
  localGitCommit: "not-created",
  remoteGit: "not-configured",
};

const lifecycleStatusMap = {
  figmaMaterialWrite: "figmaEditableMaterial",
  figmaComponentPublication: "figmaComponentPublication",
  packageRegistryPublication: "packageOrRegistryPublication",
  businessMigration: "businessMigration",
  localGitCommit: "localGitCommit",
  remoteGit: "remoteGit",
};

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function readRequired(filePath) {
  const absolutePath = join(workspaceRoot, filePath);
  if (!existsSync(absolutePath)) {
    failures.push(`missing required evidence file: ${filePath}`);
    return null;
  }

  return readFileSync(absolutePath, "utf8");
}

function parseYamlDocument(filePath) {
  const source = readRequired(filePath);
  if (source === null) {
    return null;
  }
  try {
    return parseYamlSubset(source);
  } catch (error) {
    failures.push(`${filePath} is not valid registry YAML: ${error.message}`);
    return null;
  }
}

function parseIndex(filePath, exportName) {
  const source = readRequired(filePath);
  if (source === null) {
    return [];
  }
  try {
    return parseStaticArrayExport(source, exportName);
  } catch (error) {
    failures.push(`${filePath} cannot be audited: ${error.message}`);
    return [];
  }
}

function assertExact(label, actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    failures.push(
      `${label} mismatch: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`,
    );
  }
}

function assertUnique(label, values) {
  const seen = new Set();
  for (const value of values) {
    if (seen.has(value)) {
      failures.push(`${label} must be unique; duplicate ${value}`);
    }
    seen.add(value);
  }
}

function isInside(parentPath, candidatePath) {
  const relativePath = relative(parentPath, candidatePath);
  return (
    relativePath.length > 0 &&
    relativePath !== ".." &&
    !relativePath.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`) &&
    !isAbsolute(relativePath)
  );
}

const evidenceRegistry = parseYamlDocument("evidence/visual-evidence.yaml");
const benchmarkRegistry = parseYamlDocument("benchmarks/benchmark-registry.yaml");
let phaseStatus = parseYamlDocument("status/current-phase.yaml");
if (hasRn13Authorization(phaseStatus)) {
  try { verifyAssetIndex(workspaceRoot); }
  catch (error) { failures.push(error.message); }
}
const m2 = hasM2Authorization(phaseStatus) ? phaseStatus.componentRefinements.m2Delivery.benchmarks : null;
const bmA = hasBmARn09Authorization(phaseStatus) ? phaseStatus.componentRefinements.bmARn09 : null;
const bmB = hasBmBRn10Authorization(phaseStatus) ? phaseStatus.componentRefinements.bmBRn10 : null;
try { phaseStatus = getCurrentB2Status(phaseStatus); }
catch (error) { failures.push(error.message); }
const evidenceIndex = parseIndex(
  "apps/playground/src/docs/evidence-index.ts",
  "evidenceIndex",
);
const benchmarkIndex = parseIndex(
  "apps/playground/src/docs/benchmark-index.ts",
  "benchmarkIndex",
);
const auditSource = readRequired(
  "docs/audits/2026-09-01-visual-asset-audit.md",
);

const auditScreenshots = new Map();
const auditEvidenceRecords = new Map();
for (const line of auditSource?.split(/\r?\n/) ?? []) {
  const match = line.match(
    /^\| (VE-\d{3}\.png) \| (\d+)×(\d+) \| `([a-f0-9]{64})` \|$/,
  );
  if (match) {
    if (auditScreenshots.has(match[1])) {
      failures.push(`visual asset audit duplicates screenshot row ${match[1]}`);
    }
    auditScreenshots.set(match[1], {
      width: Number(match[2]),
      height: Number(match[3]),
      sha256: match[4],
    });
  }

  const cells = line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
  if (/^VE-\d{3}$/.test(cells[0] ?? "") && cells.length === 7) {
    const benchmarkCell = cells[6];
    if (auditEvidenceRecords.has(cells[0])) {
      failures.push(`visual asset audit duplicates Evidence row ${cells[0]}`);
    }
    auditEvidenceRecords.set(cells[0], {
      label: cells[1],
      nodeId: cells[2].replaceAll("`", ""),
      artifactRetained: !cells[3].startsWith("不入库"),
      benchmarkRefs:
        benchmarkCell === "补充证据" ? [] : benchmarkCell.split("、"),
    });
  }
}

const evidenceEntries = Array.isArray(evidenceRegistry?.evidence)
  ? evidenceRegistry.evidence
  : [];
const benchmarkEntries = Array.isArray(benchmarkRegistry?.benchmarks)
  ? benchmarkRegistry.benchmarks
  : [];
const evidenceLifecycleLockedPhases = new Set([
  "foundation-spike-day-1",
  "foundation-spike-day-2",
  "foundation-spike-day-3",
  "tailwind-b2-composition-contract",
]);
const isEvidenceLifecycleLocked = evidenceLifecycleLockedPhases.has(
  phaseStatus?.currentPhase?.id,
);

if (evidenceRegistry) {
  assertExact("Visual Evidence schemaVersion", evidenceRegistry.schemaVersion, "1.0");
  assertExact("Visual Evidence kind", evidenceRegistry.kind, "VisualEvidenceRegistry");
  assertExact(
    "Visual Evidence source URL storage policy",
    evidenceRegistry.metadata?.sourceUrlStored,
    false,
  );
}
if (benchmarkRegistry) {
  assertExact("Benchmark schemaVersion", benchmarkRegistry.schemaVersion, "1.0");
  assertExact("Benchmark kind", benchmarkRegistry.kind, "BenchmarkRegistry");
}

const expectedEvidenceIds = Array.from(
  { length: 14 },
  (_, index) => `VE-${String(index + 1).padStart(3, "0")}`,
);
const expectedBenchmarkIds = ["BM-A", "BM-B", "BM-C", "BM-D"];

assertExact(
  "Visual Evidence IDs",
  evidenceEntries.map(({ id }) => id),
  expectedEvidenceIds,
);
assertExact(
  "Benchmark IDs",
  benchmarkEntries.map(({ id }) => id),
  expectedBenchmarkIds,
);
assertUnique(
  "Visual Evidence node IDs",
  evidenceEntries.map(({ source }) => source?.nodeId),
);
assertUnique(
  "Visual Evidence screenshot paths",
  evidenceEntries
    .map(({ inspection }) => inspection?.screenshotPath)
    .filter(Boolean),
);

if (isEvidenceLifecycleLocked) {
  assertExact(
    "Visual Evidence project lifecycle",
    evidenceRegistry?.projectLifecycle,
    expectedProjectLifecycle,
  );
  assertExact(
    "Benchmark project lifecycle",
    benchmarkRegistry?.projectLifecycle,
    expectedProjectLifecycle,
  );
}

for (const [registryName, lifecycle] of [
  ["Visual Evidence", evidenceRegistry?.projectLifecycle],
  ["Benchmark", benchmarkRegistry?.projectLifecycle],
]) {
  for (const [registryKey, statusKey] of Object.entries(lifecycleStatusMap)) {
    if (lifecycle?.[registryKey] !== phaseStatus?.independentLifecycle?.[statusKey]) {
      failures.push(
        `${registryName} lifecycle ${registryKey} must match status.independentLifecycle.${statusKey}`,
      );
    }
  }
}

const screenshotRoot = resolve(workspaceRoot, "evidence/screenshots");
const retainedScreenshotPaths = [];
const withheldIds = [];
const allowedArtifactValidations = new Set([
  "valid-png",
  "valid-png-with-visible-overflow",
]);
const registryFileKey = evidenceRegistry?.metadata?.figmaFileKey;

assertExact(
  "registered Figma file key",
  registryFileKey,
  "MbWg1ft5zk1JRQiQ6dS30e",
);

function rejectStoredSourceUrls(value, path = "Visual Evidence registry") {
  if (Array.isArray(value)) {
    value.forEach((item, index) => rejectStoredSourceUrls(item, `${path}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") {
    if (typeof value === "string" && /^https?:\/\//i.test(value)) {
      failures.push(`${path} must not store a source URL`);
    }
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    if (/url/i.test(key) && !(key === "sourceUrlStored" && child === false)) {
      failures.push(`${path}.${key} is a forbidden URL-bearing field`);
    }
    rejectStoredSourceUrls(child, `${path}.${key}`);
  }
}

rejectStoredSourceUrls(evidenceRegistry);
rejectStoredSourceUrls(benchmarkRegistry, "Benchmark registry");

if (
  !existsSync(screenshotRoot) ||
  !lstatSync(screenshotRoot).isDirectory() ||
  lstatSync(screenshotRoot).isSymbolicLink()
) {
  failures.push("evidence/screenshots must be a real local directory");
}

if (auditScreenshots.size !== 12) {
  failures.push(
    `visual asset audit must contain 12 exact screenshot hashes, found ${auditScreenshots.size}`,
  );
}
if (auditEvidenceRecords.size !== 14) {
  failures.push(
    `visual asset audit must contain 14 independent Evidence records, found ${auditEvidenceRecords.size}`,
  );
}

for (const evidence of evidenceEntries) {
  if (typeof evidence.id !== "string" || !/^VE-\d{3}$/.test(evidence.id)) {
    failures.push(`invalid Visual Evidence ID: ${evidence.id}`);
    continue;
  }
  if (evidence.source?.fileKey !== registryFileKey || !registryFileKey) {
    failures.push(`${evidence.id} source fileKey must match registry metadata`);
  }
  if (typeof evidence.source?.nodeId !== "string" || !/^\d+:\d+$/.test(evidence.source.nodeId)) {
    failures.push(`${evidence.id} has an invalid source nodeId`);
  }
  assertExact(`${evidence.id} label confidence`, evidence.labelConfidence, "live-confirmed");
  if (!Array.isArray(evidence.benchmarkRefs)) {
    failures.push(`${evidence.id} benchmarkRefs must be an array`);
    continue;
  }
  assertUnique(`${evidence.id} Benchmark references`, evidence.benchmarkRefs);
  const auditedEvidence = auditEvidenceRecords.get(evidence.id);
  assertExact(`${evidence.id} source identity and membership`, {
    label: evidence.label,
    nodeId: evidence.source?.nodeId,
    artifactRetained: evidence.inspection?.repositoryArtifact !== false,
    benchmarkRefs: evidence.benchmarkRefs,
  }, auditedEvidence);
  if (isEvidenceLifecycleLocked) {
    assertExact(`${evidence.id} lifecycle`, evidence.status, expectedEntryStatus);
  }

  const inspection = evidence.inspection ?? {};
  assertExact(`${evidence.id} inspection date`, inspection.inspectedAt, "2026-09-01");
  if (inspection.repositoryArtifact === false) {
    withheldIds.push(evidence.id);
    assertExact(`${evidence.id} privacy-safe inspection`, inspection, {
      inspectedAt: "2026-09-01",
      artifactStatus: "withheld-sensitive-content",
      repositoryArtifact: false,
    });
    const forbiddenArtifact = join(screenshotRoot, `${evidence.id}.png`);
    if (existsSync(forbiddenArtifact)) {
      failures.push(`${evidence.id} is privacy-withheld but has a repository screenshot`);
    }
    continue;
  }

  const screenshotPath = inspection.screenshotPath;
  if (typeof screenshotPath !== "string") {
    failures.push(
      `${evidence.id} must have a retained PNG or repositoryArtifact: false`,
    );
    continue;
  }
  if (Object.hasOwn(inspection, "repositoryArtifact")) {
    failures.push(`${evidence.id} retained inspection must not declare repositoryArtifact`);
  }
  if (!allowedArtifactValidations.has(inspection.artifactValidation)) {
    failures.push(`${evidence.id} must declare a supported PNG artifactValidation`);
  }

  const absoluteScreenshotPath = resolve(workspaceRoot, "evidence", screenshotPath);
  if (!isInside(screenshotRoot, absoluteScreenshotPath)) {
    failures.push(`${evidence.id} screenshot must stay inside evidence/screenshots`);
    continue;
  }
  if (
    extname(absoluteScreenshotPath).toLowerCase() !== ".png" ||
    basename(absoluteScreenshotPath) !== `${evidence.id}.png`
  ) {
    failures.push(`${evidence.id} screenshot must be named ${evidence.id}.png`);
    continue;
  }
  if (!existsSync(absoluteScreenshotPath)) {
    failures.push(`${evidence.id} references a missing screenshot: ${screenshotPath}`);
    continue;
  }
  const screenshotStat = lstatSync(absoluteScreenshotPath);
  if (!screenshotStat.isFile() || screenshotStat.isSymbolicLink()) {
    failures.push(`${evidence.id} screenshot must be a regular, non-symlink file`);
    continue;
  }

  const screenshotBuffer = readFileSync(absoluteScreenshotPath);
  const signature = screenshotBuffer.subarray(0, 8);
  if (!signature.equals(pngSignature)) {
    failures.push(`${evidence.id} screenshot is not a valid PNG file signature`);
    continue;
  }
  if (
    screenshotBuffer.length < 33 ||
    screenshotBuffer.readUInt32BE(8) !== 13 ||
    screenshotBuffer.toString("ascii", 12, 16) !== "IHDR"
  ) {
    failures.push(`${evidence.id} screenshot is missing a valid PNG IHDR chunk`);
    continue;
  }

  const auditEntry = auditScreenshots.get(basename(absoluteScreenshotPath));
  const actualArtifact = {
    width: screenshotBuffer.readUInt32BE(16),
    height: screenshotBuffer.readUInt32BE(20),
    sha256: createHash("sha256").update(screenshotBuffer).digest("hex"),
  };
  assertExact(`${evidence.id} audited PNG dimensions and hash`, actualArtifact, auditEntry);
  retainedScreenshotPaths.push(absoluteScreenshotPath);
}

assertExact(
  "retained screenshot count",
  retainedScreenshotPaths.length,
  evidenceRegistry?.metadata?.retainedScreenshotCount,
);
assertExact(
  "privacy-withheld screenshot count",
  withheldIds.length,
  evidenceRegistry?.metadata?.withheldScreenshotCount,
);
assertExact("privacy-withheld Evidence IDs", withheldIds, ["VE-005", "VE-010"]);

if (existsSync(screenshotRoot)) {
  const actualScreenshotNames = readdirSync(screenshotRoot).sort();
  const expectedScreenshotNames = retainedScreenshotPaths
    .map((filePath) => basename(filePath))
    .sort();
  assertExact(
    "repository Visual Evidence screenshot set",
    actualScreenshotNames,
    expectedScreenshotNames,
  );
  assertExact(
    "visual asset audit screenshot set",
    [...auditScreenshots.keys()].sort(),
    expectedScreenshotNames,
  );
}

for (const evidence of evidenceEntries) {
  for (const benchmarkId of evidence.benchmarkRefs ?? []) {
    const benchmark = benchmarkEntries.find(({ id }) => id === benchmarkId);
    if (!benchmark) {
      failures.push(`${evidence.id} references unknown Benchmark ${benchmarkId}`);
      continue;
    }
    if (
      !benchmark.visualEvidenceRefs?.some(
        ({ evidenceId, nodeId }) =>
          evidenceId === evidence.id && nodeId === evidence.source?.nodeId,
      )
    ) {
      failures.push(
        `${evidence.id} -> ${benchmarkId} is missing its exact reverse reference`,
      );
    }
  }
}

const expectedBenchmarkContracts = {
  "BM-A": {
    key: "compact-data-management",
    title: "Compact Data Management",
    evaluationScope: [
      "Search and filter toolbar",
      "Batch actions",
      "Compact table",
      "Tags and status",
      "Selected-row state",
      "Pagination",
    ],
  },
  "BM-B": {
    key: "default-large-form",
    title: "Default Large Form",
    evaluationScope: [
      "Dialog or Sheet container",
      "Form sections",
      "One-column and two-column layouts",
      "Upload",
      "Long text",
      "Validation",
      "Fixed footer actions",
    ],
  },
  "BM-C": {
    key: "complex-workbench",
    title: "Complex Workbench",
    evaluationScope: [
      "Task bar",
      "Left context pane",
      "Main task surface",
      "Right inspector",
      "Independent scrolling",
      "Pane collapse",
    ],
  },
  "BM-D": {
    key: "report-key-data",
    title: "Report / Key Data",
    evaluationScope: [
      "Report title",
      "Four KPIs",
      "Trend",
      "Summary",
      "AI insight",
    ],
  },
};

for (const benchmark of benchmarkEntries) {
  const scenario = benchmark.id === "BM-A" ? bmA : benchmark.id === "BM-B" ? bmB : benchmark.id === "BM-C" ? m2?.bmC : benchmark.id === "BM-D" ? m2?.bmD : null;
  if (scenario) {
    const key = benchmark.id.toLowerCase(), task = benchmark.id === "BM-A" ? "rn09" : "rn10";
    const reference = { entry: `../apps/prototype/src/scenarios/${key}/page.tsx`, stateContract: `../apps/prototype/src/scenarios/${key}/state-contract.md`, evidence: ["BM-C", "BM-D"].includes(benchmark.id) ? "../evidence/runtime/m2/verification.md" : `../evidence/runtime/${key}-${task}/verification.md` };
    assertExact(`${benchmark.id} implementation reference`, benchmark.currentImplementation, reference);
    for (const file of Object.values(reference)) if (!existsSync(resolve(workspaceRoot, "benchmarks", file))) failures.push(`Missing ${benchmark.id} implementation file: ${file}`);
  } else if (benchmark.currentImplementation !== undefined) failures.push(`Unapproved Benchmark implementation: ${benchmark.id}`);
  assertExact(`${benchmark.id} registered contract`, {
    key: benchmark.key,
    title: benchmark.title,
    evaluationScope: benchmark.evaluationScope,
  }, expectedBenchmarkContracts[benchmark.id]);
  if (isEvidenceLifecycleLocked) {
    assertExact(`${benchmark.id} lifecycle`, benchmark.status, scenario ? { ...expectedEntryStatus, implementation: scenario.implementation, automatedVerification: scenario.automatedVerification, humanGate: scenario.humanGate } : expectedEntryStatus);
  }
  if (!Array.isArray(benchmark.visualEvidenceRefs)) {
    failures.push(`${benchmark.id} visualEvidenceRefs must be an array`);
    continue;
  }
  assertUnique(
    `${benchmark.id} Visual Evidence references`,
    benchmark.visualEvidenceRefs.map(({ evidenceId }) => evidenceId),
  );
  for (const reference of benchmark.visualEvidenceRefs) {
    const evidence = evidenceEntries.find(({ id }) => id === reference.evidenceId);
    if (!evidence) {
      failures.push(
        `${benchmark.id} references unknown Visual Evidence ${reference.evidenceId}`,
      );
      continue;
    }
    if (evidence.source?.nodeId !== reference.nodeId) {
      failures.push(
        `${benchmark.id} records ${reference.evidenceId} with mismatched nodeId ${reference.nodeId}`,
      );
    }
    if (!evidence.benchmarkRefs.includes(benchmark.id)) {
      failures.push(
        `${benchmark.id} -> ${reference.evidenceId} is missing its reverse Visual Evidence reference`,
      );
    }
  }
}

const expectedEvidenceIndex = evidenceEntries.map((evidence) => {
  const withheld = evidence.inspection?.repositoryArtifact === false;
  return {
    id: evidence.id,
    label: evidence.label,
    nodeId: evidence.source?.nodeId,
    benchmarkIds: evidence.benchmarkRefs,
    artifact: withheld
      ? { status: "privacy-withheld" }
      : {
          status: "retained",
          screenshotPath: `evidence/${evidence.inspection?.screenshotPath}`,
        },
    implementation: evidence.status?.implementation,
    automatedVerification: evidence.status?.automatedVerification,
    humanGate: evidence.status?.humanGate,
  };
});

const expectedBenchmarkIndex = benchmarkEntries.map((benchmark) => ({
  id: benchmark.id,
  key: benchmark.key,
  title: benchmark.title,
  evidenceIds: benchmark.visualEvidenceRefs?.map(({ evidenceId }) => evidenceId),
  implementation: benchmark.status?.implementation,
  automatedVerification: benchmark.status?.automatedVerification,
  humanGate: benchmark.status?.humanGate,
}));

assertExact("TypeScript Visual Evidence index", evidenceIndex, expectedEvidenceIndex);
assertExact("TypeScript Benchmark index", benchmarkIndex, expectedBenchmarkIndex);

if (failures.length > 0) {
  console.error("Evidence verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Evidence verification passed: ${evidenceEntries.length} exact Visual Evidence entries (${retainedScreenshotPaths.length} retained PNGs with audited dimensions/SHA-256, ${withheldIds.length} privacy-withheld), a clean screenshot directory, and ${benchmarkEntries.length} exact Benchmarks symmetric across YAML and TypeScript indexes.`,
  );
}
