import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { generateIcons, iconExportName } from "./generate-icons.mjs";

const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export function compareFileSets(actual, expected) {
  return [
    ...expected.filter((path) => !actual.includes(path)).map((path) => `missing: ${path}`),
    ...actual.filter((path) => !expected.includes(path)).map((path) => `unexpected: ${path}`),
  ].sort();
}

export function inspectConsumerGraph(modules, requested) {
  const errors = [];
  const entries = modules.flatMap((id) => id.match(/\/packages\/ui\/src\/icons\/([^/?]+)\.tsx(?:\?.*)?$/)?.[1] ?? []);
  if (!entries.includes(requested)) errors.push("requested icon entry was not built");
  for (const entry of entries) if (entry !== requested) errors.push(`unexpected icon module: ${entry}`);
  if (modules.some((id) => /\/icons\/catalog\.generated\./.test(id))) errors.push("consumer includes full icon catalog");
  return errors;
}

export function inspectPageIconSources(source) {
  const errors = [];
  if (/<svg(?:\s|>)/i.test(source)) errors.push("page contains inline SVG");
  if (/from\s*["'][^"']*text-button-icons["']/.test(source)) errors.push("page consumes retired private icons");
  return errors;
}

function collectFiles(root, directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? collectFiles(root, path) : [relative(root, path)];
  }).sort();
}

/** A real Vite production consumer resolves the public package subpath. */
export async function verifySingleIconBundle(root = rootDirectory, requested = "edit-pencil") {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(requested)) throw new Error("invalid icon slug");
  // Use the existing dependency cache so parallel source audits never see a
  // transient implementation file; package resolution still uses real app links.
  const cache = resolve(root, "apps/playground/node_modules/.cache");
  mkdirSync(cache, { recursive: true });
  const temporary = mkdtempSync(resolve(cache, "rain-icon-consumer-"));
  let modules = [];
  try {
    const input = resolve(temporary, "entry.tsx");
    const exportName = iconExportName(requested);
    writeFileSync(input, `import React from "react";\nimport { createRoot } from "react-dom/client";\nimport { ${exportName} } from "@rain-next/ui/icons/${requested}";\nimport "@rain-next/foundations/tokens.css";\nimport "@rain-next/ui/styles.css";\ncreateRoot(document.getElementById("root")!).render(<${exportName} label="图标" />);\n`);
    const output = await build({
      configFile: false, root: temporary, publicDir: false, logLevel: "silent",
      build: { write: false, emptyOutDir: false, rolldownOptions: { input } },
      plugins: [{ name: "audit-icon-consumer", generateBundle() { modules = [...this.getModuleIds()].map((id) => decodeURI(id)); } }],
    });
    const errors = inspectConsumerGraph(modules, requested);
    if (errors.length) throw new Error(errors.join("\n"));
    const outputs = Array.isArray(output) ? output.flatMap((item) => item.output) : output.output;
    const iconModules = modules.filter((id) => /\/packages\/ui\/src\/icons\//.test(id)).map((id) => relative(root, id));
    return { consumer: `@rain-next/ui/icons/${requested}`, iconModules, fullCatalogIncluded: false, outputBytes: outputs.reduce((sum, item) => sum + Buffer.byteLength(item.type === "chunk" ? item.code : item.source), 0) };
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

export async function verifyIcons({ root = rootDirectory, bundle = true } = {}) {
  const { inventory, files } = generateIcons({ root, check: true });
  const allowed = ["packages/ui/src/icons/catalog.generated.ts", ...inventory.icons.flatMap((icon) => icon.availability === "available" ? [icon.runtime.modulePath, icon.runtime.assetPath] : [])];
  const allowedSources = inventory.icons.flatMap((icon) => [icon.sourceExport?.path, icon.rasterExport?.path].filter(Boolean));
  const errors = [
    ...compareFileSets(collectFiles(root, resolve(root, "packages/ui/src/icons")), allowed),
    ...compareFileSets([...collectFiles(root, resolve(root, "evidence/icons/source-exports")), ...collectFiles(root, resolve(root, "evidence/icons/source-additions"))], allowedSources),
  ];
  for (const file of ["apps/playground/src/docs/icons-page.tsx", "apps/playground/src/docs/components/text-button-page.tsx"]) {
    errors.push(...inspectPageIconSources(readFileSync(resolve(root, file), "utf8")).map((error) => `${file}: ${error}`));
  }
  const failures = JSON.parse(readFileSync(resolve(root, "evidence/icons/source-failures.json"), "utf8"));
  errors.push(...compareFileSets(failures.assets.map((asset) => asset.assetId), inventory.icons.filter((icon) => icon.availability === "source-unavailable").map((icon) => icon.assetId)));
  if (errors.length) throw new Error(errors.join("\n"));
  return { count: inventory.icons.length, available: inventory.availableCount, unavailable: inventory.unavailableCount, generatedFiles: files, sourceFailures: failures.assets.map((asset) => asset.assetId), ...(bundle ? { bundle: await verifySingleIconBundle(root) } : {}) };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = await verifyIcons();
    console.log(JSON.stringify(result, null, 2));
    console.log(`Icon integrity verified: ${result.available} usable / ${result.count} source identities; ${result.unavailable} explicitly blocked by source. Human Gate is separate.`);
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
