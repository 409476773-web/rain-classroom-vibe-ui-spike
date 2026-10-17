import { spawnSync } from "node:child_process";
import {
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
import { afterEach, describe, expect, it } from "vitest";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const collectorPath = join(
  workspaceRoot,
  "scripts/collect-rain-classic-inventory.mjs",
);
const temporaryRoots: string[] = [];

function writeFixtureFile(root: string, filePath: string, source: string) {
  const absolutePath = join(root, filePath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, source);
}

function createSourceFixture() {
  const root = mkdtempSync(join(tmpdir(), "rain-classic-collector-source-"));
  temporaryRoots.push(root);

  const baseline = {
    schemaVersion: "1.0",
    package: {
      name: "@rain-classroom/design-system",
      version: "0.1.0",
      private: true,
      exports: null,
    },
    publicApi: {
      count: 6,
      exports: [
        {
          localName: "Button",
          name: "Button",
          source: "./components/Button/Button.vue",
          canonicalName: "Button",
          kind: "component",
          layer: "UI Component",
          stability: "verified",
          publication: {
            figmaLibrary: "unpublished",
            codePackage: "unpublished",
            businessMigration: "unpublished",
          },
          owner: "src/components/Button/Button.vue",
          evidence: ["src/components/Button/button.contract.js"],
          lifecycleName: "Button",
          alias: false,
        },
        {
          localName: "Button",
          name: "RainButton",
          source: "./components/Button/Button.vue",
          canonicalName: "Button",
          kind: "component",
          layer: "UI Component",
          stability: "verified",
          publication: {
            figmaLibrary: "unpublished",
            codePackage: "unpublished",
            businessMigration: "unpublished",
          },
          owner: "src/components/Button/Button.vue",
          evidence: ["src/components/Button/button.contract.js"],
          lifecycleName: "Button",
          alias: true,
        },
        {
          localName: "QueryTable",
          name: "QueryTable",
          source: "./components/Table/QueryTable.vue",
          canonicalName: "QueryTable",
          kind: "pattern",
          layer: "Pattern",
          stability: "candidate",
          publication: {
            figmaLibrary: "unpublished",
            codePackage: "unpublished",
            businessMigration: "unpublished",
          },
          owner: "src/components/Table/QueryTable.vue",
          evidence: ["src/components/Table/query-table.contract.js"],
          lifecycleName: "QueryTable",
          alias: false,
        },
        {
          localName: "StatusTag",
          name: "StatusTag",
          source: "./components/Tag/StatusTag.vue",
          canonicalName: "StatusTag",
          kind: "domain-component",
          layer: "Domain",
          stability: "candidate",
          publication: {
            figmaLibrary: "unpublished",
            codePackage: "unpublished",
            businessMigration: "unpublished",
          },
          owner: "src/components/Tag/StatusTag.vue",
          evidence: ["src/components/Tag/tag.contract.js"],
          lifecycleName: "Tag",
          alias: false,
        },
        {
          localName: "AvatarGroup",
          name: "AvatarGroup",
          source: "./components/Avatar/AvatarGroup.vue",
          canonicalName: "AvatarGroup",
          kind: "component",
          layer: "UI Component",
          stability: "candidate",
          publication: {
            figmaLibrary: "unpublished",
            codePackage: "unpublished",
            businessMigration: "unpublished",
          },
          owner: "src/components/Avatar/AvatarGroup.vue",
          evidence: ["src/components/Avatar/avatar.contract.js"],
          lifecycleName: "Avatar",
          alias: false,
        },
        {
          localName: "buttonContract",
          name: "buttonContract",
          source: "./components/Button/button.contract.js",
          canonicalName: "buttonContract",
          kind: "contract",
          layer: "AI Contract",
          stability: "public-candidate",
          publication: {
            figmaLibrary: "not-applicable",
            codePackage: "unpublished",
            businessMigration: "not-applicable",
          },
          owner: "src/components/Button/button.contract.js",
          evidence: ["src/components/Button/button.contract.js"],
          lifecycleName: null,
          alias: false,
        },
      ],
      unclassified: [],
      coveragePercent: 100,
      classificationCounts: {
        component: 3,
        pattern: 1,
        "domain-component": 1,
        contract: 1,
      },
    },
    components: [
      {
        canonicalName: "AvatarGroup",
        lifecycleName: "Avatar",
        stability: "candidate",
      },
      {
        canonicalName: "Button",
        lifecycleName: "Button",
        stability: "verified",
      },
      {
        canonicalName: "QueryTable",
        lifecycleName: "QueryTable",
        stability: "candidate",
      },
      {
        canonicalName: "StatusTag",
        lifecycleName: "Tag",
        stability: "candidate",
      },
    ],
    patterns: [
      {
        canonicalName: "QueryTable",
        name: "QueryTable",
        kind: "pattern",
        layer: "Pattern",
      },
      {
        name: "PrivatePage",
        kind: "page-pattern",
        layer: "Template",
      },
      {
        name: "PublicTemplate",
        kind: "page-pattern",
        layer: "Template",
      },
    ],
    lifecycle: {
      count: 4,
      names: ["Avatar", "Button", "QueryTable", "Tag"],
      duplicateEntries: [],
      rootComponentsWithoutLifecycle: [],
      lifecycleWithoutRootComponent: [],
      publicationInconsistencies: [],
      statusCounts: {
        candidate: 3,
        verified: 1,
      },
    },
  };

  const registry = [
    {
      stableName: "_InternalPopup",
      public: false,
      kind: "internal-component",
      layer: "Internal",
      stability: "internal",
      publication: {
        figmaLibrary: "not-applicable",
        codePackage: "not-exported",
        businessMigration: "not-applicable",
      },
      owner: "src/components/Popup/PopupLayer.vue",
      evidence: ["src/components/Popup/popup.contract.js"],
      aliases: [],
      contract: "src/components/Popup/popup.contract.js",
      dependencies: [],
    },
    {
      stableName: "OrphanInternal",
      public: false,
      kind: "internal-component",
      layer: "Internal",
      stability: "internal",
      publication: {
        figmaLibrary: "not-applicable",
        codePackage: "not-exported",
        businessMigration: "not-applicable",
      },
      owner: "src/internal/OrphanInternal.js",
      evidence: ["src/internal/orphan.contract.js"],
      aliases: [],
      contract: "src/internal/orphan.contract.js",
      dependencies: [],
    },
    {
      stableName: "AvatarGroup",
      public: true,
      kind: "component",
      layer: "UI Component",
      stability: "candidate",
      publication: {
        figmaLibrary: "unpublished",
        codePackage: "unpublished",
        businessMigration: "unpublished",
      },
      owner: "src/components/Avatar/AvatarGroup.vue",
      evidence: ["src/components/Avatar/avatar.contract.js"],
      aliases: ["AvatarGroup", "RainAvatarGroup"],
      contract: "src/components/Avatar/avatar.contract.js",
      dependencies: [],
    },
    {
      stableName: "Button",
      public: true,
      kind: "component",
      layer: "UI Component",
      stability: "verified",
      publication: {
        figmaLibrary: "unpublished",
        codePackage: "unpublished",
        businessMigration: "unpublished",
      },
      owner: "src/components/Button/Button.vue",
      evidence: ["src/components/Button/button.contract.js"],
      aliases: ["Button", "RainButton"],
      contract: "src/components/Button/button.contract.js",
      dependencies: [],
    },
    {
      stableName: "QueryTable",
      public: true,
      kind: "pattern",
      layer: "Pattern",
      stability: "candidate",
      publication: {
        figmaLibrary: "unpublished",
        codePackage: "unpublished",
        businessMigration: "unpublished",
      },
      owner: "src/components/Table/QueryTable.vue",
      evidence: ["src/components/Table/query-table.contract.js"],
      aliases: ["QueryTable", "RainQueryTable"],
      contract: "src/components/Table/query-table.contract.js",
      dependencies: ["_InternalPopup"],
    },
    {
      stableName: "PublicTemplate",
      public: true,
      kind: "page-pattern",
      layer: "Template",
      stability: "verified-legacy-page",
      publication: {
        figmaLibrary: "unpublished",
        codePackage: "not-exported",
        businessMigration: "unpublished",
      },
      owner: "demo/pages/PublicTemplate.vue",
      evidence: ["demo/pages/PublicTemplate.vue"],
      aliases: [],
      contract: null,
      dependencies: [],
    },
    {
      stableName: "StatusTag",
      public: true,
      kind: "domain-component",
      layer: "Domain",
      stability: "candidate",
      publication: {
        figmaLibrary: "unpublished",
        codePackage: "unpublished",
        businessMigration: "unpublished",
      },
      owner: "src/components/Tag/StatusTag.vue",
      evidence: ["src/components/Tag/tag.contract.js"],
      aliases: ["StatusTag"],
      contract: "src/components/Tag/tag.contract.js",
      dependencies: [],
    },
    {
      stableName: "PrivatePage",
      public: false,
      kind: "page-pattern",
      layer: "Template",
      stability: "verified-legacy-page",
      publication: {
        figmaLibrary: "unpublished",
        codePackage: "not-exported",
        businessMigration: "unpublished",
      },
      owner: "demo/pages/PrivatePage.vue",
      evidence: ["demo/pages/PrivatePage.vue"],
      aliases: [],
      contract: null,
      dependencies: [],
    },
  ];

  writeFixtureFile(
    root,
    "scripts/generate-refactor-baseline.mjs",
    [
      "import { writeFileSync } from \"node:fs\";",
      "export async function collectRefactorBaseline() {",
      "  return " + JSON.stringify(baseline, null, 2) + ";",
      "}",
      "export function writeRefactorBaseline(projectRoot) {",
      "  writeFileSync(projectRoot + \"/WRITE_CALLED\", \"unexpected\\n\");",
      "}",
      "",
    ].join("\n"),
  );
  writeFixtureFile(
    root,
    "src/registry/component-registry.generated.js",
    "export const componentRegistry = " + JSON.stringify(registry, null, 2) + ";\n",
  );
  writeFixtureFile(
    root,
    "src/components/Avatar/avatar.contract.js",
    [
      "export const avatarGroupContract = Object.freeze({",
      "  stableName: \"AvatarGroup\",",
      "  popup: Object.freeze({ dependency: \"_InternalPopup\" }),",
      "});",
      "",
    ].join("\n"),
  );

  for (const filePath of [
    "src/components/Popup/popup.contract.js",
    "src/internal/orphan.contract.js",
    "src/components/Button/button.contract.js",
    "src/components/Table/query-table.contract.js",
    "src/components/Tag/tag.contract.js",
  ]) {
    writeFixtureFile(root, filePath, "export const fixtureContract = Object.freeze({});\n");
  }

  return root;
}

function runCollector(sourceRoot: string) {
  const outputRoot = mkdtempSync(join(tmpdir(), "rain-classic-collector-output-"));
  temporaryRoots.push(outputRoot);
  const outputPath = join(outputRoot, "inventory.json");
  const result = spawnSync(
    process.execPath,
    [collectorPath, "--source", sourceRoot, "--output", outputPath],
    { cwd: workspaceRoot, encoding: "utf8" },
  );
  return {
    result,
    outputPath,
    inventory:
      result.status === 0
        ? JSON.parse(readFileSync(outputPath, "utf8"))
        : null,
  };
}

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe("Rain Classic inventory collector", () => {
  it("reads every root export and deduplicates aliases canonically", () => {
    const sourceRoot = createSourceFixture();
    const { result, inventory } = runCollector(sourceRoot);

    expect(result.status).toBe(0);
    expect(inventory.publicExports.entries.map((entry: any) => entry.name)).toEqual([
      "Button",
      "RainButton",
      "QueryTable",
      "StatusTag",
      "AvatarGroup",
      "buttonContract",
    ]);
    const button = inventory.canonicalRootExports.find(
      (entry: any) => entry.canonicalName === "Button",
    );
    expect(button.exportNames).toEqual(["Button", "RainButton"]);
    expect(
      inventory.canonicalRootExports.filter(
        (entry: any) => entry.canonicalName === "Button",
      ),
    ).toHaveLength(1);
  });

  it("associates lifecycle facts with canonical public components", () => {
    const sourceRoot = createSourceFixture();
    const { result, inventory } = runCollector(sourceRoot);

    expect(result.status).toBe(0);
    const button = inventory.assets.find(
      (asset: any) => asset.stableName === "Button",
    );
    expect(button.lifecycle).toEqual({
      linked: true,
      name: "Button",
      status: "verified",
    });
  });

  it("retains public Component, Pattern, Template, and Domain assets", () => {
    const sourceRoot = createSourceFixture();
    const { result, inventory } = runCollector(sourceRoot);

    expect(result.status).toBe(0);
    const byName = new Map<string, any>(
      inventory.assets.map((asset: any) => [asset.stableName, asset]),
    );
    expect(byName.get("Button").identity).toBe("component");
    expect(byName.get("QueryTable").identity).toBe("pattern");
    expect(byName.get("PublicTemplate").identity).toBe("template");
    expect(byName.get("StatusTag").identity).toBe("domain");
  });

  it("includes a public asset direct Internal dependency from machine facts", () => {
    const sourceRoot = createSourceFixture();
    const { result, inventory } = runCollector(sourceRoot);

    expect(result.status).toBe(0);
    const popup = inventory.assets.find(
      (asset: any) => asset.stableName === "_InternalPopup",
    );
    expect(popup.directInternal).toBe(true);
    expect(popup.dependencyEvidence).toEqual([
      "contract:AvatarGroup",
      "registry:QueryTable",
    ]);
    expect(existsSync(join(sourceRoot, "WRITE_CALLED"))).toBe(false);
  });

  it("marks an Internal asset without a machine consumer as excluded", () => {
    const sourceRoot = createSourceFixture();
    const { result, inventory } = runCollector(sourceRoot);

    expect(result.status).toBe(0);
    expect(inventory.exclusions).toContainEqual({
      id: "rain-classic/internal/orphan-internal",
      stableName: "OrphanInternal",
      riskTier: "record-only",
      reason: "excluded-isolated-internal",
      replacement: "none",
      evidence: ["registry-consumer-count-zero"],
    });
  });

  it("retains a page Template even when it has no component lifecycle", () => {
    const sourceRoot = createSourceFixture();
    const { result, inventory } = runCollector(sourceRoot);

    expect(result.status).toBe(0);
    const page = inventory.assets.find(
      (asset: any) => asset.stableName === "PrivatePage",
    );
    expect(page.higherLevel).toBe(true);
    expect(page.public).toBe(false);
    expect(page.lifecycle).toEqual({
      linked: false,
      name: null,
      status: null,
    });
  });

  it("includes all Rain Next 8+4 audit targets", () => {
    const sourceRoot = createSourceFixture();
    const { result, inventory } = runCollector(sourceRoot);

    expect(result.status).toBe(0);
    expect(inventory.targetGaps.map((target: any) => target.target)).toEqual([
      "button",
      "input",
      "select",
      "dialog",
      "tag-badge",
      "surface-card",
      "table-primitives",
      "statistic",
      "stack",
      "inline",
      "grid",
      "split-sidebar",
    ]);
  });
});
