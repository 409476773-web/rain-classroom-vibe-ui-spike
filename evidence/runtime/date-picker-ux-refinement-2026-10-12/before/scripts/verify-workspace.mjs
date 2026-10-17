import { hasG5ComponentsAuthorization, getG5SourceBindings, g5ComponentFiles, hasDateTimeOptimizationAuthorization, dateTimeOptimizationFiles } from "./verification-helpers.mjs";
import { hasButtonGroupRepairAuthorization, getButtonGroupRepairSourceBindings, buttonGroupRepairFiles, hasG123PlaygroundAssetizationAuthorization, g123PlaygroundFiles, hasG4ComponentsAuthorization, hasG4VisualRefinementAuthorization, hasG4SizingReviewAuthorization, g4SizingReviewSourcePaths, g4ComponentFiles } from "./verification-helpers.mjs";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { join, relative } from "node:path";

import {
  getIconLibraryRefinementFiles,
  getValidatedDayThreeHistory,
  getCurrentB2Status,
  tokenFoundationsV1Files,
  validateTokenFoundationsV1Phase,
  parsePnpmLockfileImporters,
  parseYamlSubset,
} from "./verification-helpers.mjs";

const workspaceRoot = process.cwd();
const failures = [];
let workspacePhaseId = null;
let isTokenFoundationsV1 = false;
let g123PlaygroundAuthorized = false;
let g5Authorized = false;
let dateTimeOptimizationAuthorized = false;
let g4Authorized = false;
let g4VisualAuthorized = false;
let g4SizingAuthorized = false;
let buttonGroupRepairAuthorized = false;
let buttonGroupRepairStatus = null;

try {
  const phasePath = join(workspaceRoot, "status/current-phase.yaml");
  if (existsSync(phasePath)) {
    const status = parseYamlSubset(readFileSync(phasePath, "utf8"));
    g123PlaygroundAuthorized = hasG123PlaygroundAssetizationAuthorization(status);
    g5Authorized = hasG5ComponentsAuthorization(status);
    dateTimeOptimizationAuthorized = hasDateTimeOptimizationAuthorization(status);
    g4Authorized = hasG4ComponentsAuthorization(status);
    g4VisualAuthorized = hasG4VisualRefinementAuthorization(status);
    g4SizingAuthorized = hasG4SizingReviewAuthorization(status);
    buttonGroupRepairAuthorized = hasButtonGroupRepairAuthorization(status);
    buttonGroupRepairStatus = buttonGroupRepairAuthorized ? status : null;
    isTokenFoundationsV1 = status?.currentPhase?.id === "token-foundations-v1";
    if (isTokenFoundationsV1) validateTokenFoundationsV1Phase(status);
    workspacePhaseId = getCurrentB2Status(status)?.currentPhase?.id ?? null;
  }
} catch (error) {
  failures.push(`status/current-phase.yaml cannot be parsed: ${error.message}`);
}
if (buttonGroupRepairStatus) {
  try { getButtonGroupRepairSourceBindings(workspaceRoot, buttonGroupRepairStatus); }
  catch (error) { failures.push(`Button Group repair source bindings: ${error.message}`); }
}

const hasTailwindB2Surface = [
  "benchmarks/tailwind-b2-ai-editability.yaml",
  "evidence/runtime/tailwind-b2/baseline-results.yaml",
  "scripts/verify-tailwind-b2.mjs",
].some((filePath) => existsSync(join(workspaceRoot, filePath)));
const isTailwindB2Workspace = workspacePhaseId === "tailwind-b2-composition-contract"
  && (existsSync(join(workspaceRoot, ".git")) || hasTailwindB2Surface);

const requiredDirectories = [
  "apps/playground/src/docs",
  "apps/playground/src/docs/components",
  "apps/playground/src/benchmarks",
  "apps/playground/src/experiments/headless",
  "apps/playground/src/routes",
  "packages/foundations",
  "packages/ui",
  "packages/ui/src/button",
  "packages/ui/src/input",
  "packages/ui/src/tag",
  "packages/ui/src/badge",
  "packages/ui/src/surface",
  "packages/ui/src/card",
  ...(isTailwindB2Workspace ? ["packages/ui/src/utils", "packages/ui/src/recipes"] : []),
  "packages/layouts",
  "manifests",
  ...(isTailwindB2Workspace ? ["manifests/contracts", "manifests/ui"] : []),
  "registry",
  "tests/e2e",
  "evidence/runtime",
  ...(isTailwindB2Workspace ? ["evidence/runtime/tailwind-b2"] : []),
  "docs/adr",
  "docs/reports",
];

const requiredFiles = [
  ...(g5Authorized ? Object.values(g5ComponentFiles).flat() : []),
  ...(dateTimeOptimizationAuthorized ? Object.values(dateTimeOptimizationFiles).flat() : []),
  ...(g4SizingAuthorized ? g4SizingReviewSourcePaths : []),
  ...(g4VisualAuthorized ? ["docs/plans/2026-10-11-g4-visual-refinement.md", "scripts/g4-visual-refinement.test.ts"] : []),
  ...(g4Authorized ? [...g4ComponentFiles.application, ...g4ComponentFiles.ui, ...g4ComponentFiles.documents, ...g4ComponentFiles.workspace] : []),
  ...(g123PlaygroundAuthorized ? [...g123PlaygroundFiles.application, ...g123PlaygroundFiles.documents, ...g123PlaygroundFiles.workspace] : []),
  ...(buttonGroupRepairAuthorized ? [...buttonGroupRepairFiles.application, ...buttonGroupRepairFiles.documents, ...buttonGroupRepairFiles.workspace] : []),
  ...(isTokenFoundationsV1 ? [...tokenFoundationsV1Files.foundations, ...tokenFoundationsV1Files.application, ...tokenFoundationsV1Files.workspace, ...tokenFoundationsV1Files.documents] : []),
  ".gitignore",
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "tsconfig.base.json",
  "tsconfig.tests.json",
  "apps/playground/package.json",
  "apps/playground/index.html",
  "apps/playground/vite.config.ts",
  "apps/playground/tsconfig.json",
  "apps/playground/src/main.tsx",
  "apps/playground/src/app.tsx",
  "apps/playground/src/styles.css",
  "apps/playground/src/docs/evidence-index.ts",
  "apps/playground/src/docs/benchmark-index.ts",
  "apps/playground/src/docs/foundations-page.tsx",
  "apps/playground/src/docs/foundations-page.test.tsx",
  "apps/playground/src/docs/components/core-ui-page.tsx",
  "apps/playground/src/docs/components/core-ui-page.test.tsx",
  "apps/playground/src/routes/route-registry.ts",
  "apps/playground/src/routes/overview-page.tsx",
  "apps/playground/src/routes/playground-shell.test.tsx",
  "vitest.config.ts",
  "playwright.config.ts",
  "tests/setup.ts",
  "tests/node-runtime.d.ts",
  "tests/color-contrast.test.ts",
  "tests/e2e/color-contrast.ts",
  "tests/e2e/playground-shell.spec.ts",
  "tests/e2e/foundations.spec.ts",
  "tests/e2e/core-ui.spec.ts",
  "packages/foundations/package.json",
  "packages/foundations/tsconfig.json",
  "packages/foundations/src/index.ts",
  "packages/foundations/src/tokens.css",
  "packages/foundations/src/token-contract.ts",
  "packages/foundations/src/token-contract.test.ts",
  "packages/foundations/src/typography.css",
  "packages/foundations/src/density.tsx",
  "packages/foundations/src/density.test.tsx",
  "packages/foundations/src/motion.css",
  "packages/foundations/src/focus.css",
  "packages/ui/package.json",
  "packages/ui/tsconfig.json",
  "packages/ui/src/index.ts",
  "packages/ui/src/styles.css",
  "packages/ui/src/button/assets/button-loading.png",
  "packages/ui/src/button/button.tsx",
  "packages/ui/src/button/button.test.tsx",
  ...(isTailwindB2Workspace
    ? [
        "packages/ui/src/button/button.styles.ts",
        "packages/ui/src/button/button.styles.test.ts",
      ]
    : []),
  "packages/ui/src/input/input.tsx",
  "packages/ui/src/input/input.test.tsx",
  "packages/ui/src/input/input.utils.ts",
  "packages/ui/src/input/input.utils.test.ts",
  "packages/ui/src/tag/tag.tsx",
  "packages/ui/src/tag/tag-badge.test.tsx",
  "packages/ui/src/badge/badge.tsx",
  "packages/ui/src/surface/surface.tsx",
  "packages/ui/src/surface/surface-card.test.tsx",
  "packages/ui/src/card/card.tsx",
  ...(isTailwindB2Workspace
    ? [
        "packages/ui/src/utils/rain-class-names.ts",
        "packages/ui/src/utils/rain-class-names.test.ts",
        "packages/ui/src/recipes/local-recipe.ts",
        "packages/ui/src/recipes/local-recipe.test.ts",
      ]
    : []),
  "status/current-phase.yaml",
  "docs/plans/2026-09-01-foundation-spike-implementation.md",
  "docs/plans/2026-09-01-rain-classic-to-rain-next-reuse-audit.md",
  "docs/plans/2026-09-02-day-3-core-ui-design.md",
  "docs/plans/2026-09-02-day-3-core-ui-implementation.md",
  "docs/audits/2026-09-01-rain-classic-reuse-audit.md",
  "evidence/rain-classic/source-lock.yaml",
  "evidence/rain-classic/reuse-matrix.yaml",
  "scripts/verification-helpers.mjs",
  "scripts/verification-helpers.test.ts",
  "scripts/verify-workspace.mjs",
  "scripts/verify-evidence.mjs",
  "scripts/verify-boundaries.mjs",
  "scripts/verify-rain-classic-reuse-audit.mjs",
  "scripts/verify-rain-classic-reuse-audit.test.ts",
  "scripts/collect-rain-classic-inventory.mjs",
  "scripts/collect-rain-classic-inventory.test.ts",
  ...(isTailwindB2Workspace ? [
    "scripts/verify-tailwind-b2.mjs",
    "scripts/verify-tailwind-b2.test.ts",
    "benchmarks/tailwind-b2-ai-editability.yaml",
    "evidence/runtime/tailwind-b2/README.md",
    "evidence/runtime/tailwind-b2/baseline-results.yaml",
    "manifests/contracts/tailwind-b2.yaml",
    "manifests/ui/button.yaml",
    "manifests/ui/input.yaml",
  ] : []),
];

const expectedScripts = {
  dev: "pnpm --filter @rain-next/playground dev",
  build: "pnpm -r build",
  typecheck: "pnpm -r typecheck && tsc --noEmit --project tsconfig.tests.json",
  test: "vitest run",
  "test:e2e": "playwright test",
  "verify:lockfile":
    "pnpm install --lockfile-only --frozen-lockfile --offline --ignore-scripts",
  "verify:workspace": "node scripts/verify-workspace.mjs",
  "verify:evidence": "node scripts/verify-evidence.mjs",
  "verify:boundaries": "node scripts/verify-boundaries.mjs",
  ...(workspacePhaseId === "tailwind-b2-composition-contract" ? {
    "verify:tailwind-b2": "node scripts/verify-tailwind-b2.mjs",
  } : {}),
  ...(isTokenFoundationsV1 ? { "generate:tokens": "node scripts/generate-token-foundations.mjs", "verify:tokens": "node scripts/verify-token-foundations.mjs" } : {}),
  "verify:reuse-audit": "node scripts/verify-rain-classic-reuse-audit.mjs",
  "verify:governance":
    "pnpm verify:lockfile && pnpm verify:workspace && pnpm verify:evidence && pnpm verify:boundaries && pnpm verify:tailwind-b2" + (isTokenFoundationsV1 ? " && pnpm verify:tokens" : ""),
  verify:
    "pnpm verify:governance && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e",
};

function absolute(filePath) {
  return join(workspaceRoot, filePath);
}

function loadJson(filePath) {
  if (!existsSync(absolute(filePath))) {
    return null;
  }

  try {
    return JSON.parse(readFileSync(absolute(filePath), "utf8"));
  } catch (error) {
    failures.push(`${filePath} is not valid JSON: ${error.message}`);
    return null;
  }
}

function collectFiles(directory) {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    return [];
  }

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
  });
}

for (const directory of requiredDirectories) {
  const directoryPath = absolute(directory);
  if (!existsSync(directoryPath) || !statSync(directoryPath).isDirectory()) {
    failures.push(`missing required directory: ${directory}`);
  }
}

for (const filePath of requiredFiles) {
  if (!existsSync(absolute(filePath))) {
    failures.push(`missing required file: ${filePath}`);
  }
}

function discoverWorkspacePackageFiles() {
  const packageFiles = ["package.json"];

  for (const workspaceDirectory of ["apps", "packages"]) {
    const directoryPath = absolute(workspaceDirectory);
    if (!existsSync(directoryPath) || !statSync(directoryPath).isDirectory()) {
      continue;
    }

    for (const entry of readdirSync(directoryPath, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }
      const packageFile = join(workspaceDirectory, entry.name, "package.json");
      if (existsSync(absolute(packageFile))) {
        packageFiles.push(packageFile);
      }
    }
  }

  return packageFiles.sort();
}

const packageDocuments = discoverWorkspacePackageFiles()
  .map((filePath) => [filePath, loadJson(filePath)])
  .filter(([, document]) => document !== null);
const rootPackage = packageDocuments.find(([filePath]) => filePath === "package.json")?.[1];
const playgroundPackage = packageDocuments.find(
  ([filePath]) => filePath === "apps/playground/package.json",
)?.[1];
const foundationsPackage = packageDocuments.find(
  ([filePath]) => filePath === "packages/foundations/package.json",
)?.[1];
const uiPackage = packageDocuments.find(
  ([filePath]) => filePath === "packages/ui/package.json",
)?.[1];
const testsTypeConfig = loadJson("tsconfig.tests.json");

const packageNames = new Map();
for (const [filePath, document] of packageDocuments) {
  if (typeof document.name !== "string" || document.name.length === 0) {
    failures.push(`${filePath} must declare a package name`);
    continue;
  }

  if (packageNames.has(document.name)) {
    failures.push(
      `duplicate package name ${document.name}: ${packageNames.get(document.name)} and ${filePath}`,
    );
  } else {
    packageNames.set(document.name, filePath);
  }

  if (document.private !== true) {
    failures.push(`${filePath} must remain private during the spike`);
  }

  if (filePath !== "package.json") {
    for (const scriptName of ["build", "typecheck"]) {
      if (typeof document.scripts?.[scriptName] !== "string") {
        failures.push(`${filePath} must declare a ${scriptName} script`);
      }
    }
  }
}

if (rootPackage) {
  try {
    const phase = getCurrentB2Status(parseYamlSubset(readFileSync(absolute("status/current-phase.yaml"), "utf8")));
    const parentPhase = phase.currentPhase?.id === "tailwind-b2-composition-contract"
      ? getValidatedDayThreeHistory(phase).currentPhase : phase.currentPhase;
    const iconFiles = getIconLibraryRefinementFiles(phase.componentRefinements, parentPhase?.progress);
    if (iconFiles.authorized) {
      for (const [name, command] of Object.entries({
        "generate:icons": "node scripts/generate-icons.mjs",
        "verify:icons": "node scripts/verify-icons.mjs",
      })) {
        if (iconFiles.requireComplete || Object.hasOwn(rootPackage.scripts ?? {}, name)) expectedScripts[name] = command;
      }
      const iconVerification = "pnpm verify:governance && pnpm verify:icons && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e";
      if (iconFiles.requireComplete || rootPackage.scripts?.verify === iconVerification) expectedScripts.verify = iconVerification;
    }
  } catch (error) {
    failures.push(`Icon workspace authorization cannot be audited: ${error.message}`);
  }
  for (const [scriptName, expectedCommand] of Object.entries(expectedScripts)) {
    if (rootPackage.scripts?.[scriptName] !== expectedCommand) {
      failures.push(
        `package.json script ${scriptName} must be exactly: ${expectedCommand}`,
      );
    }
  }
  if (JSON.stringify(Object.fromEntries(Object.entries(rootPackage.scripts ?? {}).sort()))
    !== JSON.stringify(Object.fromEntries(Object.entries(expectedScripts).sort()))) {
    failures.push("package.json scripts must match the exact workspace command set");
  }

  if (rootPackage.engines?.node !== "^22.13.0 || >=24.0.0") {
    failures.push(
      "package.json engines.node must be ^22.13.0 || >=24.0.0 for the installed Vite/jsdom toolchain",
    );
  }

  if (rootPackage.packageManager !== "pnpm@10.28.1") {
    failures.push("package.json packageManager must be pinned to pnpm@10.28.1");
  }
}

if (testsTypeConfig) {
  const expectedTestsTypeConfig = {
    extends: "./tsconfig.base.json",
    compilerOptions: {
      allowJs: true,
      checkJs: false,
      jsx: "react-jsx",
      lib: ["ES2022", "DOM", "DOM.Iterable"],
      noEmit: true,
      types: ["vite/client"],
    },
    include: [
      "apps/**/*.test.ts",
      "apps/**/*.test.tsx",
      "packages/**/*.test.ts",
      "packages/**/*.test.tsx",
      "tests/**/*.ts",
      "scripts/**/*.test.ts",
      "playwright.config.ts",
      "vitest.config.ts",
    ],
  };
  if (JSON.stringify(testsTypeConfig) !== JSON.stringify(expectedTestsTypeConfig)) {
    failures.push(
      "tsconfig.tests.json must exactly cover workspace tests and test configs",
    );
  }
}

const [nodeMajor, nodeMinor] = process.versions.node.split(".").map(Number);
if (!((nodeMajor === 22 && nodeMinor >= 13) || nodeMajor >= 24)) {
  failures.push(
    `current Node ${process.versions.node} does not satisfy ^22.13.0 || >=24.0.0`,
  );
}

try {
  const pnpmVersion = execFileSync("pnpm", ["--version"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
  if (pnpmVersion !== "10.28.1") {
    failures.push(`current pnpm ${pnpmVersion} must match packageManager pnpm@10.28.1`);
  }
} catch (error) {
  failures.push(`pnpm toolchain cannot be verified: ${error.message}`);
}

if (existsSync(absolute("pnpm-lock.yaml"))) {
  const lockfileSource = readFileSync(absolute("pnpm-lock.yaml"), "utf8");
  if (!lockfileSource.startsWith("lockfileVersion: '9.0'\n")) {
    failures.push("pnpm-lock.yaml must use the pnpm 10 lockfileVersion 9.0");
  }
  try {
    const actualImporters = parsePnpmLockfileImporters(lockfileSource).sort();
    const expectedImporters = packageDocuments
      .map(([filePath]) =>
        filePath === "package.json"
          ? "."
          : filePath.slice(0, -"/package.json".length),
      )
      .sort();
    if (JSON.stringify(actualImporters) !== JSON.stringify(expectedImporters)) {
      failures.push(
        `pnpm-lock.yaml importers must exactly match workspace packages: expected ${JSON.stringify(expectedImporters)}, received ${JSON.stringify(actualImporters)}`,
      );
    }
  } catch (error) {
    failures.push(`pnpm-lock.yaml importers cannot be audited: ${error.message}`);
  }
}

if (playgroundPackage?.name !== "@rain-next/playground") {
  failures.push(
    "apps/playground/package.json must use the unique name @rain-next/playground",
  );
}

if (foundationsPackage?.name !== "@rain-next/foundations") {
  failures.push(
    "packages/foundations/package.json must use the unique name @rain-next/foundations",
  );
}

if (uiPackage?.name !== "@rain-next/ui") {
  failures.push("packages/ui/package.json must use the unique name @rain-next/ui");
}

if (
  playgroundPackage?.dependencies?.["@rain-next/foundations"] !== "workspace:*"
) {
  failures.push(
    "apps/playground/package.json must consume @rain-next/foundations through workspace:*",
  );
}

if (playgroundPackage?.dependencies?.["@rain-next/ui"] !== "workspace:*") {
  failures.push(
    "apps/playground/package.json must consume @rain-next/ui through workspace:*",
  );
}

if (uiPackage?.dependencies?.["@rain-next/foundations"] !== "workspace:*") {
  failures.push(
    "packages/ui/package.json must consume @rain-next/foundations through workspace:*",
  );
}

for (const [filePath, document] of packageDocuments) {
  for (const dependencyGroup of [
    "dependencies",
    "devDependencies",
    "peerDependencies",
    "optionalDependencies",
  ]) {
    for (const [dependency, version] of Object.entries(
      document[dependencyGroup] ?? {},
    )) {
      if (
        packageNames.has(dependency) &&
        typeof version === "string" &&
        !version.startsWith("workspace:")
      ) {
        failures.push(
          `${filePath} must reference internal package ${dependency} with the workspace: protocol`,
        );
      }
    }
  }
}

if (existsSync(absolute("pnpm-workspace.yaml"))) {
  const workspaceDefinition = readFileSync(
    absolute("pnpm-workspace.yaml"),
    "utf8",
  );

  try {
    const workspaceDocument = parseYamlSubset(workspaceDefinition);
    if (
      JSON.stringify(workspaceDocument) !==
      JSON.stringify({ packages: ["apps/*", "packages/*"] })
    ) {
      failures.push(
        'pnpm-workspace.yaml must contain exactly packages: ["apps/*", "packages/*"]',
      );
    }
  } catch (error) {
    failures.push(`pnpm-workspace.yaml is invalid: ${error.message}`);
  }
}

const sharedPackageFiles = collectFiles(absolute("packages"));
for (const filePath of sharedPackageFiles) {
  if (!/\.(?:[cm]?[jt]sx?|json)$/.test(filePath)) {
    continue;
  }

  const source = readFileSync(filePath, "utf8");
  if (
    source.includes("@rain-next/playground") ||
    source.includes("apps/playground") ||
    source.includes("/benchmarks/")
  ) {
    failures.push(
      `forbidden reverse dependency from shared package: ${relative(workspaceRoot, filePath)}`,
    );
  }
}

if (failures.length > 0) {
  console.error("Workspace verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Workspace verification passed: ${requiredDirectories.length} directories, ${requiredFiles.length} files, ${packageNames.size} discovered unique packages, and canonical governance scripts.`,
  );
}
