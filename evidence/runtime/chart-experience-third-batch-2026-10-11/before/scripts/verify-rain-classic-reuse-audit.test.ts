import { spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const verifierPath = join(
  workspaceRoot,
  "scripts/verify-rain-classic-reuse-audit.mjs",
);
const temporaryRoots: string[] = [];

const targetDefinitions = [
  ["button", "ui", "rain-classic/ui/button", "rewrite-from-rain"],
  ["input", "ui", "rain-classic/ui/input", "rewrite-from-rain"],
  ["select", "ui", "rain-classic/ui/select", "adapt-shadcn"],
  ["dialog", "ui", "none", "react-only"],
  ["tag-badge", "ui", "rain-classic/ui/tag", "rewrite-from-rain"],
  ["surface-card", "ui", "none", "react-only"],
  ["table-primitives", "ui", "rain-classic/ui/data-table", "rewrite-from-rain"],
  ["statistic", "ui", "none", "react-only"],
  ["stack", "layout", "none", "react-only"],
  ["inline", "layout", "none", "react-only"],
  ["grid", "layout", "none", "react-only"],
  ["split-sidebar", "layout", "rain-classic/layout/pane-group", "rewrite-from-rain"],
] as const;

function scalar(value: unknown) {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  if (value === null) return "null";
  throw new Error(`Unsupported scalar ${String(value)}`);
}

function renderYaml(value: unknown, indent = 0): string {
  const padding = " ".repeat(indent);
  const isEmptyCollection = (child: unknown) =>
    (Array.isArray(child) && child.length === 0) ||
    (child !== null &&
      typeof child === "object" &&
      !Array.isArray(child) &&
      Object.keys(child).length === 0);
  const emptyCollectionScalar = (child: unknown) =>
    Array.isArray(child) ? "[]" : "{}";
  if (Array.isArray(value)) {
    if (value.length === 0) return `${padding}[]`;
    return value
      .map((item) => {
        if (item === null || typeof item !== "object") {
          return `${padding}- ${scalar(item)}`;
        }
        const entries = Object.entries(item as Record<string, unknown>);
        if (entries.length === 0) return `${padding}- {}`;
        const firstEntry = entries[0];
        if (!firstEntry) return `${padding}- {}`;
        const [firstKey, firstValue] = firstEntry;
        const rest = entries.slice(1);
        const first = isEmptyCollection(firstValue)
          ? `${padding}- ${firstKey}: ${emptyCollectionScalar(firstValue)}`
          : firstValue !== null && typeof firstValue === "object"
            ? `${padding}- ${firstKey}:\n${renderYaml(firstValue, indent + 4)}`
            : `${padding}- ${firstKey}: ${scalar(firstValue)}`;
        const continuation = rest.map(([key, child]) =>
          isEmptyCollection(child)
            ? `${" ".repeat(indent + 2)}${key}: ${emptyCollectionScalar(child)}`
            : child !== null && typeof child === "object"
            ? `${" ".repeat(indent + 2)}${key}:\n${renderYaml(child, indent + 4)}`
            : `${" ".repeat(indent + 2)}${key}: ${scalar(child)}`,
        );
        return [first, ...continuation].join("\n");
      })
      .join("\n");
  }
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return `${padding}{}`;
    return entries
      .map(([key, child]) =>
        isEmptyCollection(child)
          ? `${padding}${key}: ${emptyCollectionScalar(child)}`
          : child !== null && typeof child === "object"
          ? `${padding}${key}:\n${renderYaml(child, indent + 2)}`
          : `${padding}${key}: ${scalar(child)}`,
      )
      .join("\n");
  }
  return `${padding}${scalar(value)}`;
}

function createAsset(
  id: string,
  options: { directInternal?: boolean; public?: boolean } = {},
) {
  return {
    id,
    stableName: id.split("/").at(-1) ?? id,
    identity: options.directInternal ? "internal" : "component",
    source: {
      owner: `src/${id.replaceAll("/", "-")}.js`,
      contract: `src/${id.replaceAll("/", "-")}.contract.js`,
      evidence: [],
      lifecycleStatus: "candidate",
      public: options.public ?? !options.directInternal,
      directInternal: options.directInternal ?? false,
    },
    audit: {
      staticReview: "reviewed",
      riskTier: "deep",
      runtimeReview: "not-run",
      browserReview: "not-run",
      confidence: "high",
      status: "reviewed",
    },
    inheritance: {
      retainedTraits: ["Rain semantic behavior"],
      redesignedTraits: ["React implementation"],
      intentionallyNotInherited: ["Vue API"],
    },
    decision: {
      migrationLabel: options.directInternal ? "adapt-shadcn" : "rewrite-from-rain",
      targetLayer: options.directInternal ? "primitive" : "ui",
      targetAsset: id.split("/").at(-1) ?? id,
      rationale: "Fixture evidence supports this migration boundary.",
      blockers: [] as string[],
    },
    implementation: "not-started",
    humanGate: "not-evaluated",
    publication: {
      figmaMaterial: "not-authorized",
      figmaComponent: "not-authorized",
      packageRegistry: "not-authorized",
    },
    businessMigration: "not-authorized",
  };
}

function validSourceLock() {
  return {
    schemaVersion: "1.0",
    kind: "RainClassicSourceLock",
    auditId: "RC2RN-REUSE-AUDIT-001",
    source: {
      repository: "409476773-web/rain-classroom-design-system",
      branch: "main",
      commit: "a".repeat(40),
      tree: "b".repeat(40),
      packageName: "@rain-classroom/design-system",
      packageVersion: "0.1.0",
      trackedWorktreeClean: true,
      untrackedFilesExcluded: true,
      localPathStored: false,
    },
    facts: [
      { path: "src/index.js", sha256: "1".repeat(64) },
      { path: "src/component-lifecycle.js", sha256: "2".repeat(64) },
      {
        path: "src/registry/component-registry.generated.js",
        sha256: "3".repeat(64),
      },
    ],
    target: {
      project: "rain-classroom-vibe-ui-spike",
      phaseAtStart: "foundation-spike-day-2",
    },
    boundaries: {
      sourceReadOnly: true,
      figmaWrite: "not-authorized",
      publication: "not-authorized",
      businessMigration: "not-authorized",
    },
  };
}

function validMatrix() {
  return {
    schemaVersion: "1.0",
    kind: "RainClassicReuseMatrix",
    auditId: "RC2RN-REUSE-AUDIT-001",
    sourceLockRef: "evidence/rain-classic/source-lock.yaml",
    inventory: {
      publicAssetIds: ["rain-classic/ui/button"],
      higherLevelAssetIds: ["rain-classic/template/page"],
      directInternalAssetIds: ["rain-classic/internal/popup"],
      excludedAssetIds: ["rain-classic/internal/isolated-experiment"],
    },
    assets: [
      createAsset("rain-classic/ui/button", { public: true }),
      Object.assign(
        createAsset("rain-classic/template/page", { public: false }),
        { identity: "template" },
      ),
      createAsset("rain-classic/internal/popup", { directInternal: true }),
    ],
    exclusions: [
      {
        id: "rain-classic/internal/isolated-experiment",
        stableName: "IsolatedExperiment",
        riskTier: "record-only",
        reason: "excluded-isolated-internal",
        replacement: "none",
        evidence: ["registry-consumer-count-zero"],
      },
    ],
    targetGaps: targetDefinitions.map(
      ([target, targetLayer, classicSource, migrationLabel]) => ({
        target,
        targetLayer,
        classicSource,
        migrationLabel,
        rationale: "Fixture target coverage.",
        status: "reviewed",
      }),
    ),
    lifecycle: {
      implementation: "not-started",
      humanGate: "not-evaluated",
      figmaMaterialWrite: "not-authorized",
      figmaComponentPublication: "not-authorized",
      packageRegistryPublication: "not-authorized",
      businessMigration: "not-authorized",
      localGitCommit: "not-created",
      remoteGit: "not-configured",
    },
  };
}

function assetAt(matrix: ReturnType<typeof validMatrix>, index: number) {
  const asset = matrix.assets[index];
  if (!asset) throw new Error(`Missing fixture asset at index ${index}`);
  return asset;
}

function targetAt(matrix: ReturnType<typeof validMatrix>, index: number) {
  const target = matrix.targetGaps[index];
  if (!target) throw new Error(`Missing fixture target at index ${index}`);
  return target;
}

function runCommand(root: string, command: string, args: readonly string[]) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8" });
  if (result.status !== 0) {
    throw new Error(
      `${command} ${args.join(" ")} failed: ${result.stderr || result.stdout}`,
    );
  }
  return result.stdout.trim();
}

function sha256(root: string, filePath: string) {
  const [hash] = runCommand(root, "shasum", ["-a", "256", filePath]).split(
    /\s+/,
  );
  if (!hash) throw new Error(`Could not hash ${filePath}`);
  return hash;
}

function writeDocument(root: string, filePath: string, value: unknown) {
  const absolutePath = join(root, filePath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${renderYaml(value)}\n`);
}

function createAuditFixture() {
  const root = mkdtempSync(join(tmpdir(), "rain-reuse-audit-fixture-"));
  temporaryRoots.push(root);
  writeDocument(root, "evidence/rain-classic/source-lock.yaml", validSourceLock());
  writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", validMatrix());
  const reportPath = join(
    root,
    "docs/audits/2026-09-01-rain-classic-reuse-audit.md",
  );
  mkdirSync(dirname(reportPath), { recursive: true });
  writeFileSync(
    reportPath,
    "# Fixture reuse audit\n\n- Audit ID: `RC2RN-REUSE-AUDIT-001`\n- Source commit: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`\n",
  );
  return root;
}

function runVerifier(
  root: string,
  options: { liveRoot?: string; strict?: boolean } = {},
) {
  const environment = {
    ...(process as unknown as { env: Record<string, string | undefined> }).env,
  };
  delete environment.RAIN_CLASSIC_AUDIT_ROOT;
  delete environment.RAIN_REUSE_AUDIT_REQUIRE_COMPLETE;
  if (options.liveRoot) environment.RAIN_CLASSIC_AUDIT_ROOT = options.liveRoot;
  if (options.strict) environment.RAIN_REUSE_AUDIT_REQUIRE_COMPLETE = "1";
  return spawnSync(process.execPath, [verifierPath], {
    cwd: root,
    encoding: "utf8",
    env: environment,
  } as any);
}

function output(result: ReturnType<typeof runVerifier>) {
  return `${result.stdout}${result.stderr}`;
}

function createLiveSource() {
  const root = mkdtempSync(join(tmpdir(), "rain-classic-live-fixture-"));
  temporaryRoots.push(root);
  const facts = [
    "src/index.js",
    "src/component-lifecycle.js",
    "src/registry/component-registry.generated.js",
  ];
  for (const [index, filePath] of facts.entries()) {
    const absolutePath = join(root, filePath);
    mkdirSync(dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, `export const fixture${index} = true;\n`);
  }
  writeFileSync(
    join(root, "package.json"),
    `${JSON.stringify(
      { name: "@rain-classroom/design-system", version: "0.1.0" },
      null,
      2,
    )}\n`,
  );
  runCommand(root, "git", ["init", "-b", "main"]);
  runCommand(root, "git", ["add", "."]);
  runCommand(
    root,
    "git",
    [
      "-c",
      "user.name=Rain Fixture",
      "-c",
      "user.email=rain-fixture@example.invalid",
      "commit",
      "-m",
      "fixture",
    ],
  );
  return {
    root,
    commit: runCommand(root, "git", ["rev-parse", "HEAD"]),
    tree: runCommand(root, "git", ["rev-parse", "HEAD^{tree}"]),
    facts: facts.map((filePath) => ({
      path: filePath,
      sha256: sha256(root, filePath),
    })),
  };
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe("Rain Classic reuse audit verifier", () => {
  it("accepts a structurally complete snapshot", () => {
    const root = createAuditFixture();
    const result = runVerifier(root);
    expect(output(result)).toContain("verification passed");
    expect(result.status).toBe(0);
  });

  it("allows pending decisions only on unreviewed non-strict snapshots", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    const asset = assetAt(matrix, 0);
    asset.audit.status = "unreviewed";
    asset.audit.staticReview = "unreviewed";
    Object.assign(asset.decision, {
      migrationLabel: null,
      targetLayer: null,
      targetAsset: null,
      rationale: null,
    });
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);

    const snapshotResult = runVerifier(root);
    expect(output(snapshotResult)).toContain("verification passed");
    expect(snapshotResult.status).toBe(0);

    asset.audit.status = "reviewed";
    asset.audit.staticReview = "reviewed";
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const reviewedResult = runVerifier(root);
    expect(output(reviewedResult)).toContain("illegal migration label null");
    expect(reviewedResult.status).toBe(1);
  });

  it("allows pending Rain Next target mappings only in non-strict snapshots", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    const target = targetAt(matrix, 0);
    Object.assign(target, {
      classicSource: null,
      migrationLabel: null,
      rationale: null,
      status: "unreviewed",
    });
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);

    const snapshotResult = runVerifier(root);
    expect(output(snapshotResult)).toContain("verification passed");
    expect(snapshotResult.status).toBe(0);

    target.status = "reviewed";
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const reviewedResult = runVerifier(root);
    expect(output(reviewedResult)).toContain(
      "illegal migration label null on target button",
    );
    expect(reviewedResult.status).toBe(1);
  });

  it("requires source-lock.yaml", () => {
    const root = createAuditFixture();
    rmSync(join(root, "evidence/rain-classic/source-lock.yaml"));
    const result = runVerifier(root);
    expect(output(result)).toContain("missing source lock");
    expect(result.status).toBe(1);
  });

  it("rejects non-40-character commit and tree values", () => {
    const root = createAuditFixture();
    const lock = validSourceLock();
    lock.source.commit = "short";
    lock.source.tree = "also-short";
    writeDocument(root, "evidence/rain-classic/source-lock.yaml", lock);
    const result = runVerifier(root);
    expect(output(result)).toContain("source.commit must be a 40-character Git object ID");
    expect(output(result)).toContain("source.tree must be a 40-character Git object ID");
    expect(result.status).toBe(1);
  });

  it("rejects duplicate asset IDs", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    matrix.assets.push(assetAt(matrix, 0));
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root);
    expect(output(result)).toContain("duplicate asset ID rain-classic/ui/button");
    expect(result.status).toBe(1);
  });

  it("rejects stored inventory counts that drift from the matrix", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    Object.assign(matrix.inventory, {
      scopeAssetCount: 99,
      publicAssetCount: 1,
      higherLevelAssetCount: 1,
      directInternalAssetCount: 1,
      excludedAssetCount: 1,
    });
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root);
    expect(output(result)).toContain(
      "inventory.scopeAssetCount must equal 3, received 99",
    );
    expect(result.status).toBe(1);
  });

  it("requires every exclusion to stay record-only and auditable", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    const exclusion = matrix.exclusions[0];
    if (!exclusion) throw new Error("Missing fixture exclusion");
    exclusion.riskTier = "deep";
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root);
    expect(output(result)).toContain(
      "rain-classic/internal/isolated-experiment exclusion.riskTier must be record-only",
    );
    expect(result.status).toBe(1);
  });

  it("rejects an illegal migration label", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    assetAt(matrix, 0).decision.migrationLabel = "copy-vue";
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root);
    expect(output(result)).toContain("illegal migration label copy-vue");
    expect(result.status).toBe(1);
  });

  it("reports a public asset coverage gap", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    matrix.inventory.publicAssetIds.push("rain-classic/ui/missing-public");
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root);
    expect(output(result)).toContain(
      "public asset missing from matrix: rain-classic/ui/missing-public",
    );
    expect(result.status).toBe(1);
  });

  it("reports a higher-level asset coverage gap", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    matrix.inventory.higherLevelAssetIds.push(
      "rain-classic/template/missing-page",
    );
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root);
    expect(output(result)).toContain(
      "higher-level asset missing from matrix: rain-classic/template/missing-page",
    );
    expect(result.status).toBe(1);
  });

  it("reports an unregistered direct Internal dependency", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    matrix.inventory.directInternalAssetIds.push(
      "rain-classic/internal/missing-direct",
    );
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root);
    expect(output(result)).toContain(
      "direct Internal missing from matrix: rain-classic/internal/missing-direct",
    );
    expect(result.status).toBe(1);
  });

  it("requires all Rain Next 8+4 targets", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    matrix.targetGaps.pop();
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root);
    expect(output(result)).toContain("Rain Next target missing: split-sidebar");
    expect(result.status).toBe(1);
  });

  it("does not accept an audit while another asset needs a decision", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    const acceptedAsset = assetAt(matrix, 0);
    const blockedAsset = assetAt(matrix, 1);
    acceptedAsset.audit.status = "accepted";
    acceptedAsset.humanGate = "accepted";
    blockedAsset.audit.status = "needs-decision";
    blockedAsset.decision.blockers.push("contract conflict");
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root);
    expect(output(result)).toContain(
      "accepted audit cannot coexist with needs-decision assets",
    );
    expect(result.status).toBe(1);
  });

  it("rejects implementation, publication, and migration overclaims", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    const asset = assetAt(matrix, 0);
    asset.implementation = "completed";
    asset.publication.packageRegistry = "published";
    asset.businessMigration = "completed";
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root);
    expect(output(result)).toContain("implementation must remain not-started");
    expect(output(result)).toContain("packageRegistry must remain not-authorized");
    expect(output(result)).toContain("businessMigration must remain not-authorized");
    expect(result.status).toBe(1);
  });

  it("rejects unreviewed entries in strict completion mode", () => {
    const root = createAuditFixture();
    const matrix = validMatrix();
    const asset = assetAt(matrix, 0);
    asset.audit.status = "unreviewed";
    asset.audit.staticReview = "unreviewed";
    writeDocument(root, "evidence/rain-classic/reuse-matrix.yaml", matrix);
    const result = runVerifier(root, { strict: true });
    expect(output(result)).toContain(
      "strict completion forbids unreviewed asset rain-classic/ui/button",
    );
    expect(result.status).toBe(1);
  });

  it("detects a strict live source commit mismatch", () => {
    const root = createAuditFixture();
    const live = createLiveSource();
    const lock = validSourceLock();
    lock.source.commit = "0".repeat(40);
    lock.source.tree = live.tree;
    lock.facts = live.facts;
    writeDocument(root, "evidence/rain-classic/source-lock.yaml", lock);
    const result = runVerifier(root, { liveRoot: live.root, strict: true });
    expect(output(result)).toContain(
      `source commit mismatch: locked ${"0".repeat(40)}, live ${live.commit}`,
    );
    expect(result.status).toBe(1);
  });
});
