import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { join, relative } from "node:path";

import {
  parsePnpmLockfileImporters,
  parseYamlSubset,
} from "./verification-helpers.mjs";

const workspaceRoot = process.cwd();
const failures = [];

const requiredDirectories = [
  "apps/playground/src/docs",
  "apps/playground/src/benchmarks",
  "apps/playground/src/experiments/headless",
  "apps/playground/src/routes",
  "packages/foundations",
  "packages/ui",
  "packages/layouts",
  "manifests",
  "registry",
  "tests/e2e",
  "evidence/runtime",
  "docs/adr",
  "docs/reports",
];

const requiredFiles = [
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
  "scripts/verification-helpers.mjs",
  "scripts/verification-helpers.test.ts",
  "scripts/verify-workspace.mjs",
  "scripts/verify-evidence.mjs",
  "scripts/verify-boundaries.mjs",
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
  "verify:governance":
    "pnpm verify:lockfile && pnpm verify:workspace && pnpm verify:evidence && pnpm verify:boundaries",
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
  for (const [scriptName, expectedCommand] of Object.entries(expectedScripts)) {
    if (rootPackage.scripts?.[scriptName] !== expectedCommand) {
      failures.push(
        `package.json script ${scriptName} must be exactly: ${expectedCommand}`,
      );
    }
  }
  if (JSON.stringify(rootPackage.scripts) !== JSON.stringify(expectedScripts)) {
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
      "tsconfig.tests.json must exactly cover Day 2 tests and test configs",
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

if (
  playgroundPackage?.dependencies?.["@rain-next/foundations"] !== "workspace:*"
) {
  failures.push(
    "apps/playground/package.json must consume @rain-next/foundations through workspace:*",
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
