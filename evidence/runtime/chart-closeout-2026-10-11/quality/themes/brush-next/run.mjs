import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, realpathSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

assert.equal(process.env.RAIN_BRUSH_FROZEN, "1", "Wait for explicit parent/root dependency-freeze notification before launching this private browser runner");
const root = process.cwd(), directory = fileURLToPath(new URL(".", import.meta.url)), output = resolve(process.argv[2]);
assert.ok(!existsSync(output), "Use a fresh output directory; keep prior evidence intact"); mkdirSync(output, { recursive: true });
const sha = path => createHash("sha256").update(readFileSync(path)).digest("hex");
const read = path => JSON.parse(readFileSync(path, "utf8"));
const baseline = read(resolve(root, "evidence/runtime/chart-closeout-2026-10-11/baseline-files.json"));
const paths = [...new Set([...baseline.map(item => item.path).filter(path => /^(packages\/(ui\/src\/charts|foundations\/src)|apps\/playground\/src\/(docs\/components\/chart|styles\.css))/.test(path) && /\.(tsx?|css|json|geojson)$/.test(path) && !path.includes(".test.")), "package.json", "packages/ui/package.json", "apps/playground/package.json", "pnpm-lock.yaml"])].sort();
const sourceHashes = () => paths.map(path => ({ path, sha256: sha(resolve(root, path)) }));
const requireUi = createRequire(resolve(root, "packages/ui/package.json"));
function identity(name, request = requireUi) {
  let manifestPath;
  try { manifestPath = realpathSync(request.resolve(`${name}/package.json`)); }
  catch {
    let current = dirname(realpathSync(request.resolve(name)));
    while (current !== dirname(current)) {
      const candidate = resolve(current, "package.json");
      if (existsSync(candidate) && read(candidate).name === name) { manifestPath = candidate; break; }
      current = dirname(current);
    }
  }
  assert.ok(manifestPath, `Unable to locate installed manifest for ${name}`);
  const manifest = read(manifestPath);
  return { name, version: manifest.version, manifestPath, manifestSha256: sha(manifestPath), peerDependencies: manifest.peerDependencies ?? {}, dependencies: manifest.dependencies ?? {} };
}
function installed() {
  const brush = identity("@visx/brush"), react = identity("react"), manifest = read(resolve(root, "packages/ui/package.json"));
  assert.equal(brush.version, "4.0.1-alpha.0"); assert.equal(manifest.dependencies["@visx/brush"], brush.version);
  const lock = readFileSync(resolve(root, "pnpm-lock.yaml"), "utf8"); assert.ok(lock.includes("'@visx/brush@4.0.1-alpha.0"));
  const packageDirectory = dirname(brush.manifestPath), files = [];
  function visit(directoryPath) {
    for (const entry of readdirSync(directoryPath, { withFileTypes: true })) {
      const path = resolve(directoryPath, entry.name); if (entry.isDirectory()) visit(path); else if (/\.(?:js|json|ts)$/.test(entry.name)) files.push({ path: path.slice(packageDirectory.length + 1), sha256: sha(path) });
    }
  }
  visit(packageDirectory); files.sort((a, b) => a.path.localeCompare(b.path));
  const brushRequire = createRequire(brush.manifestPath), resolvedDependencies = Object.keys(brush.dependencies).map(name => identity(name, brushRequire));
  return { brush, react, declaredBrush: manifest.dependencies["@visx/brush"], lockSha256: sha(resolve(root, "pnpm-lock.yaml")), brushInstalledFiles: files, resolvedBrushDependencies: resolvedDependencies, boundary: "Existing workspace installation identity only; no independent clean-install claim" };
}
const before = sourceHashes(), dependenciesBefore = installed();
writeFileSync(resolve(output, "source-before.json"), JSON.stringify(before, null, 2)); writeFileSync(resolve(output, "dependencies-before.json"), JSON.stringify(dependenciesBefore, null, 2));
const scripts = ["config.ts", "brush.spec.ts", "run.mjs", "tsconfig.json"].map(file => ({ file, sha256: sha(resolve(directory, file)) }));
writeFileSync(resolve(output, "scripts-before.json"), JSON.stringify(scripts, null, 2)); writeFileSync(resolve(output, "spec-executed.ts"), readFileSync(resolve(directory, "brush.spec.ts")));
const cli = createRequire(import.meta.url).resolve("@playwright/test/cli");
const result = spawnSync(process.execPath, [cli, "test", "--config", resolve(directory, "config.ts"), ...process.argv.slice(3)], { cwd: root, env: { ...process.env, RAIN_BRUSH_OUTPUT: output }, stdio: "inherit" });
const after = sourceHashes(), dependenciesAfter = installed(), changes = after.filter((item, index) => item.sha256 !== before[index].sha256), dependenciesUnchanged = JSON.stringify(dependenciesBefore) === JSON.stringify(dependenciesAfter);
writeFileSync(resolve(output, "source-after.json"), JSON.stringify(after, null, 2)); writeFileSync(resolve(output, "dependencies-after.json"), JSON.stringify(dependenciesAfter, null, 2));
writeFileSync(resolve(output, "run-facts.json"), JSON.stringify({ status: result.status === 0 && changes.length === 0 && dependenciesUnchanged ? "passed" : "failed", exitCode: result.status, sourceCount: before.length, sourceChanges: changes, dependenciesUnchanged, scripts, selection: process.argv.slice(3), expectedInstalledBrush: "4.0.1-alpha.0", limits: ["Actual line-trio-brush caller only; Area temporary segment selection and Composed have no current ChartBrush caller", "Two tests per engine and width cover four critical action paths, not the earlier 36 theme paths", "Playwright engines and mouse/keyboard only; not real Safari/VoiceOver or physical touch"] }, null, 2));
assert.deepEqual(changes, []); assert.ok(dependenciesUnchanged); process.exitCode = result.status ?? 1;
