import {
  existsSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const targetDefinitions = Object.freeze([
  {
    target: "button",
    targetLayer: "ui",
    candidateStableNames: ["Button"],
  },
  {
    target: "input",
    targetLayer: "ui",
    candidateStableNames: ["Input", "InputNumber", "TextArea"],
  },
  {
    target: "select",
    targetLayer: "ui",
    candidateStableNames: ["Select", "TagSelect"],
  },
  {
    target: "dialog",
    targetLayer: "ui",
    candidateStableNames: [],
  },
  {
    target: "tag-badge",
    targetLayer: "ui",
    candidateStableNames: [
      "Tag",
      "Badge",
      "BadgeStatus",
      "StatusIndicator",
    ],
  },
  {
    target: "surface-card",
    targetLayer: "ui",
    candidateStableNames: ["Container", "Section"],
  },
  {
    target: "table-primitives",
    targetLayer: "ui",
    candidateStableNames: [
      "DataTable",
      "QueryTable",
      "TableEditableCell",
      "TablePagination",
      "TableRowReorder",
    ],
  },
  {
    target: "statistic",
    targetLayer: "ui",
    candidateStableNames: [],
  },
  {
    target: "stack",
    targetLayer: "layout",
    candidateStableNames: ["Container"],
  },
  {
    target: "inline",
    targetLayer: "layout",
    candidateStableNames: ["Container"],
  },
  {
    target: "grid",
    targetLayer: "layout",
    candidateStableNames: ["Container"],
  },
  {
    target: "split-sidebar",
    targetLayer: "layout",
    candidateStableNames: ["PaneGroup", "MasterDetail"],
  },
]);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function collectStrings(value, output = []) {
  if (typeof value === "string") {
    output.push(value);
    return output;
  }
  if (Array.isArray(value)) {
    for (const child of value) collectStrings(child, output);
    return output;
  }
  if (isObject(value)) {
    for (const child of Object.values(value)) collectStrings(child, output);
  }
  return output;
}

function collectMachineDependencies(value, output = new Set(), seen = new WeakSet()) {
  if (!isObject(value) && !Array.isArray(value)) return output;
  if (seen.has(value)) return output;
  seen.add(value);

  if (Array.isArray(value)) {
    for (const child of value) collectMachineDependencies(child, output, seen);
    return output;
  }

  for (const [key, child] of Object.entries(value)) {
    if (key === "dependency" || key === "dependencies") {
      for (const dependency of collectStrings(child)) output.add(dependency);
    }
    collectMachineDependencies(child, output, seen);
  }
  return output;
}

function isHigherLevel(entry) {
  return (
    entry.layer === "Pattern" ||
    entry.layer === "Template" ||
    entry.layer === "Domain" ||
    entry.kind === "pattern" ||
    entry.kind === "page-pattern" ||
    entry.kind === "domain-component"
  );
}

function identityFor(entry) {
  if (entry.layer === "Internal" || entry.kind === "internal-component") {
    return "internal";
  }
  if (entry.layer === "Template" || entry.kind === "page-pattern") {
    return "template";
  }
  if (entry.layer === "Pattern" || entry.kind === "pattern") {
    return "pattern";
  }
  if (entry.layer === "Domain" || entry.kind === "domain-component") {
    return "domain";
  }
  if (entry.layer === "Foundation") return "foundation";
  if (entry.kind === "configuration-model") return "configuration";
  return "component";
}

function kebabCase(stableName, identity) {
  const normalized =
    identity === "internal"
      ? stableName.replace(/^_?Internal/, "").replace(/^_+/, "")
      : stableName.replace(/^_+/, "");
  return normalized
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function assetId(entry) {
  const identity = identityFor(entry);
  const namespace = identity === "component" ? "ui" : identity;
  return "rain-classic/" + namespace + "/" + kebabCase(entry.stableName, identity);
}

function repositoryRelativeContract(entry) {
  if (entry.contract === null || entry.contract === undefined) return null;
  if (
    typeof entry.contract !== "string" ||
    entry.contract.length === 0 ||
    isAbsolute(entry.contract) ||
    relative(".", entry.contract).startsWith("..")
  ) {
    throw new Error(
      "Registry contract for " + String(entry.stableName) + " must be repository-relative",
    );
  }
  return entry.contract;
}

async function dependenciesFromContract(sourceRoot, entry) {
  const contract = repositoryRelativeContract(entry);
  if (!contract) return [];
  const contractPath = join(sourceRoot, contract);
  if (!existsSync(contractPath)) {
    throw new Error(
      "Registry contract for " + entry.stableName + " is missing: " + contract,
    );
  }

  const contractModule = await import(pathToFileURL(contractPath).href);
  const matchingContracts = Object.values(contractModule).filter(
    (value) => isObject(value) && value.stableName === entry.stableName,
  );
  const dependencies = new Set();
  for (const contractValue of matchingContracts) {
    collectMachineDependencies(contractValue, dependencies);
  }
  return [...dependencies].sort();
}

function canonicalizeRootExports(exports) {
  const groups = new Map();
  for (const entry of exports) {
    const canonicalName = entry.canonicalName || entry.name;
    if (!groups.has(canonicalName)) {
      groups.set(canonicalName, {
        canonicalName,
        exportNames: [],
        owner: entry.owner,
        kind: entry.kind,
        layer: entry.layer,
        lifecycleName: entry.lifecycleName ?? null,
      });
    }
    const group = groups.get(canonicalName);
    if (!group.exportNames.includes(entry.name)) group.exportNames.push(entry.name);
  }
  return [...groups.values()];
}

function lifecycleFor(entry, baselineComponents) {
  const component = baselineComponents.get(entry.stableName);
  if (!component || !component.lifecycleName) {
    return {
      linked: false,
      name: null,
      status: null,
    };
  }
  return {
    linked: true,
    name: component.lifecycleName,
    status: component.stability ?? null,
  };
}

function makeAsset(
  entry,
  baselineComponents,
  contractDependencies,
  directInternal,
  dependencyEvidence,
) {
  return {
    id: assetId(entry),
    stableName: entry.stableName,
    identity: identityFor(entry),
    public: entry.public === true,
    higherLevel: isHigherLevel(entry),
    directInternal,
    registryKind: entry.kind,
    layer: entry.layer,
    stability: entry.stability,
    owner: entry.owner,
    contract: repositoryRelativeContract(entry),
    evidence: Array.isArray(entry.evidence) ? [...entry.evidence] : [],
    aliases: Array.isArray(entry.aliases) ? [...entry.aliases] : [],
    dependencies: {
      registry: collectStrings(entry.dependencies ?? []).sort(),
      contract: [...contractDependencies].sort(),
    },
    dependencyEvidence: [...dependencyEvidence].sort(),
    lifecycle: lifecycleFor(entry, baselineComponents),
    publication: entry.publication,
  };
}

function assertUniqueIds(assets, exclusions) {
  const seen = new Set();
  for (const entry of [...assets, ...exclusions]) {
    if (seen.has(entry.id)) {
      throw new Error("Duplicate inventory asset ID " + entry.id);
    }
    seen.add(entry.id);
  }
}

export async function collectRainClassicInventory(sourceRootInput) {
  if (typeof sourceRootInput !== "string" || sourceRootInput.length === 0) {
    throw new Error("A non-empty Rain Classic source root is required");
  }
  const sourceRoot = resolve(sourceRootInput);
  const baselinePath = join(sourceRoot, "scripts/generate-refactor-baseline.mjs");
  const registryPath = join(
    sourceRoot,
    "src/registry/component-registry.generated.js",
  );
  if (!existsSync(baselinePath)) {
    throw new Error("Missing Rain Classic baseline collector");
  }
  if (!existsSync(registryPath)) {
    throw new Error("Missing Rain Classic component registry");
  }

  const baselineModule = await import(pathToFileURL(baselinePath).href);
  const registryModule = await import(pathToFileURL(registryPath).href);
  if (typeof baselineModule.collectRefactorBaseline !== "function") {
    throw new Error("Rain Classic baseline module lacks collectRefactorBaseline()");
  }
  if (!Array.isArray(registryModule.componentRegistry)) {
    throw new Error("Rain Classic registry module lacks componentRegistry");
  }

  const baseline = await baselineModule.collectRefactorBaseline(sourceRoot);
  const registry = registryModule.componentRegistry;
  const registryByName = new Map(
    registry.map((entry) => [entry.stableName, entry]),
  );
  const internalNames = new Set(
    registry
      .filter(
        (entry) =>
          entry.layer === "Internal" || entry.kind === "internal-component",
      )
      .map((entry) => entry.stableName),
  );
  const scopeEntries = registry.filter(
    (entry) => entry.public === true || isHigherLevel(entry),
  );
  const baselineComponents = new Map(
    baseline.components.map((entry) => [entry.canonicalName, entry]),
  );

  const contractDependenciesByName = new Map();
  const dependencyEvidenceByInternal = new Map(
    [...internalNames].map((name) => [name, new Set()]),
  );
  const unresolvedMachineDependencies = [];

  for (const entry of scopeEntries) {
    const registryDependencies = collectStrings(entry.dependencies ?? []);
    for (const dependency of registryDependencies) {
      if (internalNames.has(dependency)) {
        dependencyEvidenceByInternal
          .get(dependency)
          .add("registry:" + entry.stableName);
      }
    }

    const contractDependencies = await dependenciesFromContract(sourceRoot, entry);
    contractDependenciesByName.set(entry.stableName, contractDependencies);
    for (const dependency of contractDependencies) {
      if (internalNames.has(dependency)) {
        dependencyEvidenceByInternal
          .get(dependency)
          .add("contract:" + entry.stableName);
      } else if (dependency.startsWith("_") && !registryByName.has(dependency)) {
        unresolvedMachineDependencies.push({
          consumer: entry.stableName,
          dependency,
          evidence: "contract:" + repositoryRelativeContract(entry),
        });
      }
    }
  }

  const directInternalEntries = registry.filter(
    (entry) =>
      internalNames.has(entry.stableName) &&
      dependencyEvidenceByInternal.get(entry.stableName).size > 0,
  );
  const includedEntries = [...scopeEntries, ...directInternalEntries];
  const includedNames = new Set(includedEntries.map((entry) => entry.stableName));
  const assets = includedEntries
    .map((entry) =>
      makeAsset(
        entry,
        baselineComponents,
        contractDependenciesByName.get(entry.stableName) ?? [],
        directInternalEntries.includes(entry),
        dependencyEvidenceByInternal.get(entry.stableName) ?? [],
      ),
    )
    .sort((left, right) => left.id.localeCompare(right.id));

  const exclusions = registry
    .filter((entry) => !includedNames.has(entry.stableName))
    .map((entry) => {
      const internal = internalNames.has(entry.stableName);
      return {
        id: assetId(entry),
        stableName: entry.stableName,
        riskTier: "record-only",
        reason: internal
          ? "excluded-isolated-internal"
          : "excluded-nonpublic-non-higher-level",
        replacement: "none",
        evidence: internal
          ? ["registry-consumer-count-zero"]
          : ["registry-public-false", "registry-not-higher-level"],
      };
    })
    .sort((left, right) => left.id.localeCompare(right.id));

  assertUniqueIds(assets, exclusions);

  const publicAssetIds = assets
    .filter((asset) => asset.public)
    .map((asset) => asset.id);
  const higherLevelAssetIds = assets
    .filter((asset) => asset.higherLevel)
    .map((asset) => asset.id);
  const directInternalAssetIds = assets
    .filter((asset) => asset.directInternal)
    .map((asset) => asset.id);
  const excludedAssetIds = exclusions.map((entry) => entry.id);
  const publicExports = baseline.publicApi.exports.map((entry) => ({
    name: entry.name,
    canonicalName: entry.canonicalName || entry.name,
    owner: entry.owner,
    kind: entry.kind,
    layer: entry.layer,
    lifecycleName: entry.lifecycleName ?? null,
    alias: entry.alias === true,
  }));
  const canonicalRootExports = canonicalizeRootExports(
    baseline.publicApi.exports,
  );

  return {
    schemaVersion: "1.0",
    kind: "RainClassicInventory",
    source: {
      package: baseline.package,
      baselineSchemaVersion: baseline.schemaVersion,
      registryEntryCount: registry.length,
    },
    publicExports: {
      count: publicExports.length,
      entries: publicExports,
    },
    canonicalRootExports,
    inventory: {
      publicAssetIds,
      higherLevelAssetIds,
      directInternalAssetIds,
      excludedAssetIds,
    },
    assets,
    exclusions,
    unresolvedMachineDependencies: unresolvedMachineDependencies.sort(
      (left, right) =>
        left.consumer.localeCompare(right.consumer) ||
        left.dependency.localeCompare(right.dependency),
    ),
    lifecycle: baseline.lifecycle,
    targetGaps: targetDefinitions.map((target) => ({
      ...target,
      status: "unreviewed",
    })),
    summary: {
      publicExportCount: publicExports.length,
      canonicalRootExportCount: canonicalRootExports.length,
      registryEntryCount: registry.length,
      inScopeAssetCount: assets.length,
      publicAssetCount: publicAssetIds.length,
      higherLevelAssetCount: higherLevelAssetIds.length,
      directInternalAssetCount: directInternalAssetIds.length,
      excludedAssetCount: excludedAssetIds.length,
    },
  };
}

function parseArguments(argv) {
  const values = new Map();
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!["--source", "--output"].includes(flag) || !value) {
      throw new Error("Usage: collect-rain-classic-inventory.mjs --source <root> --output <file>");
    }
    values.set(flag, value);
  }
  if (values.size !== 2 || !values.has("--source") || !values.has("--output")) {
    throw new Error("Usage: collect-rain-classic-inventory.mjs --source <root> --output <file>");
  }
  return {
    sourceRoot: resolve(values.get("--source")),
    outputPath: resolve(values.get("--output")),
  };
}

function isInside(parent, candidate) {
  const relation = relative(parent, candidate);
  return relation === "" || (!relation.startsWith("..") && !isAbsolute(relation));
}

async function main() {
  const { sourceRoot, outputPath } = parseArguments(process.argv.slice(2));
  if (isInside(sourceRoot, outputPath)) {
    throw new Error("Collector output must be outside the read-only Rain Classic source");
  }
  const inventory = await collectRainClassicInventory(sourceRoot);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(inventory, null, 2) + "\n");
  process.stdout.write(
    [
      "Rain Classic inventory collected",
      "public exports: " + inventory.summary.publicExportCount,
      "canonical root exports: " + inventory.summary.canonicalRootExportCount,
      "in-scope assets: " + inventory.summary.inScopeAssetCount,
      "direct Internal: " + inventory.summary.directInternalAssetCount,
      "excluded: " + inventory.summary.excludedAssetCount,
    ].join("; ") + "\n",
  );
}

const scriptPath = fileURLToPath(import.meta.url);
if (process.argv[1] && resolve(process.argv[1]) === scriptPath) {
  main().catch((error) => {
    process.stderr.write("Rain Classic inventory collection failed: " + error.message + "\n");
    process.exitCode = 1;
  });
}
