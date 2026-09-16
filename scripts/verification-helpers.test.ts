import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  isDayOneForbiddenDependency,
  parseStaticArrayExport,
  parseYamlSubset,
} from "./verification-helpers.mjs";
import * as verificationHelpers from "./verification-helpers.mjs";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readWorkspaceFile(filePath: string) {
  return readFileSync(join(workspaceRoot, filePath), "utf8");
}

function createEvidenceFixture() {
  const fixtureRoot = mkdtempSync(join(tmpdir(), "rain-day2-evidence-lock-"));
  for (const filePath of [
    "evidence",
    "benchmarks/benchmark-registry.yaml",
    "status/current-phase.yaml",
    "apps/playground/src/docs/evidence-index.ts",
    "apps/playground/src/docs/benchmark-index.ts",
    "docs/audits/2026-09-01-visual-asset-audit.md",
  ]) {
    const sourcePath = join(workspaceRoot, filePath);
    const targetPath = join(fixtureRoot, filePath);
    mkdirSync(dirname(targetPath), { recursive: true });
    cpSync(sourcePath, targetPath, { recursive: true });
  }
  return fixtureRoot;
}

function createBoundaryFixture() {
  const fixtureRoot = mkdtempSync(join(tmpdir(), "rain-day3-boundary-lock-"));
  const fixtureEntries = [
    ".gitignore",
    "AGENTS.md",
    "SPIKE_BRIEF.md",
    "apps",
    "benchmarks",
    "docs",
    "evidence",
    "manifests",
    "package.json",
    "packages",
    "playwright.config.ts",
    "pnpm-lock.yaml",
    "pnpm-workspace.yaml",
    "registry",
    "scripts",
    "status",
    "tests",
    "tsconfig.base.json",
    "tsconfig.tests.json",
    "vitest.config.ts",
  ];

  for (const entry of fixtureEntries) {
    const sourceRoot = join(workspaceRoot, entry);
    cpSync(
      sourceRoot,
      join(fixtureRoot, entry),
      {
        recursive: true,
        filter: (sourcePath) => {
          const nestedSegments = sourcePath
            .slice(sourceRoot.length)
            .split("/")
            .filter(Boolean);
          return !nestedSegments.some((segment) =>
            [
              ".vite",
              "coverage",
              "dist",
              "node_modules",
              "playwright-report",
              "test-results",
            ].includes(segment),
          );
        },
      },
    );
  }

  const gitInit = spawnSync("git", ["init", "--quiet"], {
    cwd: fixtureRoot,
    encoding: "utf8",
  });
  if (gitInit.status !== 0) {
    throw new Error(
      `Unable to initialize boundary fixture: ${gitInit.stdout}${gitInit.stderr}`,
    );
  }

  const physicalRoot = spawnSync("git", ["rev-parse", "--show-toplevel"], {
    cwd: fixtureRoot,
    encoding: "utf8",
  });
  if (physicalRoot.status !== 0) {
    throw new Error(
      `Unable to resolve boundary fixture root: ${physicalRoot.stdout}${physicalRoot.stderr}`,
    );
  }

  return physicalRoot.stdout.trim();
}

function replaceAfter(
  source: string,
  marker: string,
  before: string,
  after: string,
) {
  const markerIndex = source.indexOf(marker);
  const valueIndex = source.indexOf(before, markerIndex);
  if (markerIndex < 0 || valueIndex < 0) {
    throw new Error(`Unable to mutate ${before} after ${marker}`);
  }
  return `${source.slice(0, valueIndex)}${after}${source.slice(
    valueIndex + before.length,
  )}`;
}

function writeFixtureMutation(
  fixtureRoot: string,
  filePath: string,
  marker: string,
  before: string,
  after: string,
) {
  const absolutePath = join(fixtureRoot, filePath);
  writeFileSync(
    absolutePath,
    replaceAfter(readFileSync(absolutePath, "utf8"), marker, before, after),
  );
}

function runEvidenceVerification(fixtureRoot: string) {
  return spawnSync(
    process.execPath,
    [join(workspaceRoot, "scripts/verify-evidence.mjs")],
    {
      cwd: fixtureRoot,
      encoding: "utf8",
    },
  );
}

function runBoundaryVerification(fixtureRoot: string) {
  return spawnSync(
    process.execPath,
    [join(fixtureRoot, "scripts/verify-boundaries.mjs")],
    {
      cwd: fixtureRoot,
      encoding: "utf8",
    },
  );
}

describe("parseYamlSubset", () => {
  it("parses the registry subset without losing nested arrays or booleans", () => {
    expect(
      parseYamlSubset(`schemaVersion: "1.0"
metadata:
  retainedScreenshotCount: 1
evidence:
  - id: "VE-001"
    benchmarkRefs:
      - "BM-A"
    inspection:
      repositoryArtifact: false
`),
    ).toEqual({
      schemaVersion: "1.0",
      metadata: { retainedScreenshotCount: 1 },
      evidence: [
        {
          id: "VE-001",
          benchmarkRefs: ["BM-A"],
          inspection: { repositoryArtifact: false },
        },
      ],
    });
  });

  it("rejects duplicate keys and malformed indentation", () => {
    expect(() => parseYamlSubset('kind: "A"\nkind: "B"\n')).toThrow(
      /duplicate key/i,
    );
    expect(() =>
      parseYamlSubset('metadata:\n   project: "rain-next"\n'),
    ).toThrow(/indentation/i);
  });
});

describe("parseStaticArrayExport", () => {
  it("reads only static object and array literals from a TypeScript export", () => {
    const source = `
      export const evidenceIndex: readonly unknown[] = [
        { id: "VE-001", refs: ["BM-A"], artifact: { retained: true } },
      ];
    `;

    expect(parseStaticArrayExport(source, "evidenceIndex")).toEqual([
      {
        id: "VE-001",
        refs: ["BM-A"],
        artifact: { retained: true },
      },
    ]);
  });

  it("rejects executable expressions", () => {
    expect(() =>
      parseStaticArrayExport(
        'export const evidenceIndex = [makeEntry("VE-001")];',
        "evidenceIndex",
      ),
    ).toThrow(/static literal/i);
  });

  it("ignores fake exports inside comments", () => {
    const source = `
      // export const evidenceIndex = [{ id: "VE-001" }];
      export const evidenceIndex = [{ id: "VE-999" }];
    `;

    expect(parseStaticArrayExport(source, "evidenceIndex")).toEqual([
      { id: "VE-999" },
    ]);
  });
});

describe("isDayOneForbiddenDependency", () => {
  it.each([
    "radix-ui",
    "@radix-ui/react-dialog",
    "@base-ui/react",
    "@base-ui-components/react",
    "shadcn",
    "shadcn-ui",
    "@shadcn/ui",
  ])("blocks %s during Day 1", (dependency) => {
    expect(isDayOneForbiddenDependency(dependency)).toBe(true);
  });

  it.each(["react", "react-dom", "@playwright/test"])(
    "allows the Day 1 dependency %s",
    (dependency) => {
      expect(isDayOneForbiddenDependency(dependency)).toBe(false);
    },
  );
});

describe("Day 3 boundary fault injection", () => {
  it("rejects a Foundations-to-UI reverse dependency expressed as a relative import", () => {
    const fixtureRoot = createBoundaryFixture();
    try {
      const baseline = runBoundaryVerification(fixtureRoot);
      expect(
        baseline.status,
        `${baseline.stdout}${baseline.stderr}`,
      ).toBe(0);

      const foundationsSourcePath = join(
        fixtureRoot,
        "packages/foundations/src/density.tsx",
      );
      writeFileSync(
        foundationsSourcePath,
        `${readFileSync(foundationsSourcePath, "utf8")}\nimport "../../ui/src/index.ts";\n`,
      );

      const result = runBoundaryVerification(fixtureRoot);
      expect(result.status).toBe(1);
      expect(`${result.stdout}${result.stderr}`).toMatch(
        /Foundations reverses the dependency direction in packages\/foundations\/src\/density\.tsx/,
      );
    } finally {
      rmSync(fixtureRoot, { force: true, recursive: true });
    }
  });
});

describe("private reference color detection", () => {
  it("detects direct runtime consumption while ignoring comments", () => {
    const usesPrivateReferenceColor = (
      verificationHelpers as unknown as {
        usesPrivateReferenceColor?: (source: string) => boolean;
      }
    ).usesPrivateReferenceColor;
    expect(usesPrivateReferenceColor).toBeTypeOf("function");
    if (!usesPrivateReferenceColor) return;

    expect(
      usesPrivateReferenceColor(
        ".consumer { color: var(--rain-ref-blue-500); }",
      ),
    ).toBe(true);
    expect(
      usesPrivateReferenceColor(
        ".consumer { color: var(--rain-color-text-link); }",
      ),
    ).toBe(false);
    expect(
      usesPrivateReferenceColor(
        "/* never consume var(--rain-ref-blue-500) here */",
      ),
    ).toBe(false);
  });
});

describe("Day 2 binary and lockfile evidence helpers", () => {
  it("reads PNG signature and IHDR dimensions while rejecting corrupt input", () => {
    const inspectPngMetadata = (
      verificationHelpers as unknown as {
        inspectPngMetadata?: (source: Buffer) => {
          height: number;
          width: number;
        };
      }
    ).inspectPngMetadata;
    expect(inspectPngMetadata).toBeTypeOf("function");
    if (!inspectPngMetadata) return;

    const pngHeader = Buffer.alloc(33);
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(
      pngHeader,
    );
    pngHeader.writeUInt32BE(13, 8);
    pngHeader.write("IHDR", 12, "ascii");
    pngHeader.writeUInt32BE(1440, 16);
    pngHeader.writeUInt32BE(4368, 20);

    expect(inspectPngMetadata(pngHeader)).toEqual({
      height: 4368,
      width: 1440,
    });
    expect(() => inspectPngMetadata(Buffer.from("x"))).toThrow(/PNG/i);

    const invalidSignature = Buffer.from(pngHeader);
    invalidSignature[0] = 0;
    expect(() => inspectPngMetadata(invalidSignature)).toThrow(/signature/i);

    const invalidIhdr = Buffer.from(pngHeader);
    invalidIhdr.write("IDAT", 12, "ascii");
    expect(() => inspectPngMetadata(invalidIhdr)).toThrow(/IHDR/i);
  });

  it("extracts every top-level pnpm importer, including phantom entries", () => {
    const parsePnpmLockfileImporters = (
      verificationHelpers as unknown as {
        parsePnpmLockfileImporters?: (source: string) => string[];
      }
    ).parsePnpmLockfileImporters;
    expect(parsePnpmLockfileImporters).toBeTypeOf("function");
    if (!parsePnpmLockfileImporters) return;

    const importers = parsePnpmLockfileImporters(`lockfileVersion: '9.0'

importers:

  .:
    devDependencies: {}

  apps/playground:
    dependencies: {}

  packages/foundations:
    dependencies: {}

  packages/ui:
    dependencies: {}

packages: {}
`);

    expect(importers).toEqual([
      ".",
      "apps/playground",
      "packages/foundations",
      "packages/ui",
    ]);

    expect(() =>
      parsePnpmLockfileImporters(`lockfileVersion: '9.0'\n\npackages: {}\n`),
    ).toThrow(/importers/i);
  });
});

describe("Day 3 lifecycle and typecheck governance", () => {
  it("records the authorized Core UI batch without claiming verification or a Human Gate", () => {
    const status = parseYamlSubset(
      readWorkspaceFile("status/current-phase.yaml"),
    ) as {
      currentPhase?: { progress?: string };
      independentLifecycle?: Record<string, unknown>;
    };

    expect(status.currentPhase?.progress).toBe("task-4-core-ui-completed");
    expect(status.independentLifecycle).toMatchObject({
      implementation: "completed",
      implementationScope: "day-3-task-4-core-ui-families",
      automatedVerification: "passed",
      automatedVerificationScope: "day-3-task-4-core-ui-families",
      automatedVerificationEvidence:
        "pnpm verify: governance, root and workspace typecheck, 262 Vitest tests, three workspace builds, and 8 Chromium E2E tests",
      humanGate: "not-evaluated",
    });
  });

  it("makes the root typecheck cover Day 3 tests and test configs", () => {
    const rootPackage = JSON.parse(readWorkspaceFile("package.json"));
    const configPath = join(workspaceRoot, "tsconfig.tests.json");

    expect(rootPackage.scripts.typecheck).toBe(
      "pnpm -r typecheck && tsc --noEmit --project tsconfig.tests.json",
    );
    expect(existsSync(configPath)).toBe(true);
    if (!existsSync(configPath)) return;

    const testsConfig = JSON.parse(readFileSync(configPath, "utf8"));
    expect(testsConfig.compilerOptions?.noEmit).toBe(true);
    expect(testsConfig.include).toEqual([
      "apps/**/*.test.ts",
      "apps/**/*.test.tsx",
      "packages/**/*.test.ts",
      "packages/**/*.test.tsx",
      "tests/**/*.ts",
      "scripts/**/*.test.ts",
      "playwright.config.ts",
      "vitest.config.ts",
    ]);
  });

  it("rejects a coordinated Day 3 project lifecycle drift", () => {
    const fixtureRoot = createEvidenceFixture();
    try {
      for (const registryPath of [
        "evidence/visual-evidence.yaml",
        "benchmarks/benchmark-registry.yaml",
      ]) {
        writeFixtureMutation(
          fixtureRoot,
          registryPath,
          "projectLifecycle:",
          'figmaMaterialWrite: "not-authorized"',
          'figmaMaterialWrite: "authorized"',
        );
      }
      writeFixtureMutation(
        fixtureRoot,
        "status/current-phase.yaml",
        "independentLifecycle:",
        'figmaEditableMaterial: "not-authorized"',
        'figmaEditableMaterial: "authorized"',
      );

      const result = runEvidenceVerification(fixtureRoot);
      expect(result.status).toBe(1);
      expect(`${result.stdout}${result.stderr}`).toMatch(
        /project lifecycle mismatch/i,
      );
    } finally {
      rmSync(fixtureRoot, { force: true, recursive: true });
    }
  });

  it.each([
    ["implementation", "not-started", "in-progress"],
    ["automatedVerification", "not-run", "passed"],
    ["humanGate", "not-evaluated", "passed"],
  ] as const)(
    "rejects a coordinated Day 3 Visual Evidence %s drift",
    (field, before, after) => {
      const fixtureRoot = createEvidenceFixture();
      try {
        writeFixtureMutation(
          fixtureRoot,
          "evidence/visual-evidence.yaml",
          '  - id: "VE-001"',
          `${field}: "${before}"`,
          `${field}: "${after}"`,
        );
        writeFixtureMutation(
          fixtureRoot,
          "apps/playground/src/docs/evidence-index.ts",
          'id: "VE-001"',
          `${field}: "${before}"`,
          `${field}: "${after}"`,
        );

        const result = runEvidenceVerification(fixtureRoot);
        expect(result.status).toBe(1);
        expect(`${result.stdout}${result.stderr}`).toMatch(
          /VE-001 lifecycle mismatch/i,
        );
      } finally {
        rmSync(fixtureRoot, { force: true, recursive: true });
      }
    },
  );

  it.each([
    ["implementation", "not-started", "in-progress"],
    ["automatedVerification", "not-run", "passed"],
    ["humanGate", "not-evaluated", "passed"],
  ] as const)(
    "rejects a coordinated Day 3 Benchmark %s drift",
    (field, before, after) => {
      const fixtureRoot = createEvidenceFixture();
      try {
        writeFixtureMutation(
          fixtureRoot,
          "benchmarks/benchmark-registry.yaml",
          '  - id: "BM-A"',
          `${field}: "${before}"`,
          `${field}: "${after}"`,
        );
        writeFixtureMutation(
          fixtureRoot,
          "apps/playground/src/docs/benchmark-index.ts",
          'id: "BM-A"',
          `${field}: "${before}"`,
          `${field}: "${after}"`,
        );

        const result = runEvidenceVerification(fixtureRoot);
        expect(result.status).toBe(1);
        expect(`${result.stdout}${result.stderr}`).toMatch(
          /BM-A lifecycle mismatch/i,
        );
      } finally {
        rmSync(fixtureRoot, { force: true, recursive: true });
      }
    },
  );
});
