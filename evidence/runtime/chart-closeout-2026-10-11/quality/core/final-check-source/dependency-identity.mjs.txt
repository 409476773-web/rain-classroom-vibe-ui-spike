import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname, parse } from "node:path";

const requireFromUi = createRequire(resolve("packages/ui/package.json"));
const packages = ["react", "react-dom", "@visx/brush", "@visx/shape", "@visx/curve", "@visx/responsive"].map(name => {
  const entry = requireFromUi.resolve(name);
  let directory = dirname(entry), metadata;
  while (directory !== parse(directory).root) {
    const file = resolve(directory, "package.json");
    if (existsSync(file)) {
      const candidate = JSON.parse(readFileSync(file, "utf8"));
      if (candidate.name === name) { metadata = { path: file, name, version: candidate.version, peerDependencies: candidate.peerDependencies }; break; }
    }
    directory = dirname(directory);
  }
  if (!metadata) throw new Error(`Package metadata not found: ${name}`);
  return { ...metadata, entry, entrySha256: createHash("sha256").update(readFileSync(entry)).digest("hex") };
});
const sources = ["packages/ui/package.json", "pnpm-lock.yaml"].map(path => ({ path, sha256: createHash("sha256").update(readFileSync(path)).digest("hex") }));
const output = resolve("evidence/runtime/chart-closeout-2026-10-11/quality/core", process.argv[2] ?? "dependency-before.json");
writeFileSync(output, JSON.stringify({ capturedAt: new Date().toISOString(), packages, sources }, null, 2));
console.log(JSON.stringify({ output, packages: packages.map(({ name, version }) => ({ name, version })), sources }));
