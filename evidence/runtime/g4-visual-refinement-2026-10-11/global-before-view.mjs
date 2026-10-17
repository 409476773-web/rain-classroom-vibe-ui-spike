import fs from "node:fs";
import { resolve, relative, join } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { registerHooks, syncBuiltinESMExports } from "node:module";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

// Read-only overlay of this batch's saved original bytes. The two E2E
// predecessors are separately reconstructed and verified, never recaptured.
const workspace = process.cwd(), evidence = "evidence/runtime/g4-visual-refinement-2026-10-11/", beforeDirectory = evidence + "before/";
const original = Object.fromEntries(["readFileSync", "existsSync", "statSync", "lstatSync", "readdirSync", "realpathSync"].map(name => [name, fs[name].bind(fs)]));
const originalRealpathNative = fs.realpathSync.native.bind(fs);
const baseline = JSON.parse(original.readFileSync(join(workspace, evidence, "baseline.json"), "utf8"));
const addendum = JSON.parse(original.readFileSync(join(workspace, evidence, "baseline-addendum.json"), "utf8"));
const sha = path => createHash("sha256").update(original.readFileSync(path)).digest("hex");
for (const [file, expected] of Object.entries(baseline.files)) assert.equal(sha(join(workspace, beforeDirectory, file)), expected, `Saved actual before bytes changed: ${file}`);
const overrides = new Map();
for (const [file, entry] of Object.entries(addendum.files)) {
  assert.equal(entry.capturedBefore.sha256, baseline.files[file]);
  assert.equal(sha(join(workspace, entry.predecessor.path)), entry.predecessor.sha256, `Derived predecessor changed: ${file}`);
  overrides.set(file, join(workspace, entry.predecessor.path));
}
const oldBindings = JSON.parse(original.readFileSync(join(workspace, beforeDirectory, "evidence/runtime/g4-components-2026-10-11/source-bindings.json"), "utf8"));
for (const [file, path] of overrides) assert.equal(sha(path), oldBindings.sourceFiles[file].after, `Derived predecessor does not match the immutable G4 record: ${file}`);
const added = [...baseline.notPresent, evidence.slice(0, -1)];
const nameOf = path => {
  if (typeof path === "number") return null;
  const absolute = path instanceof URL ? fileURLToPath(path) : resolve(String(path)), name = relative(workspace, absolute);
  return name.startsWith("../") || name === ".." ? null : name;
};
const removed = name => name !== null && added.some(file => name === file || name.startsWith(file + "/"));
const beforePath = path => {
  const name = nameOf(path);
  if (name === null) return path;
  if (removed(name)) throw Object.assign(new Error(`Before view has no current G4 feedback addition: ${name}`), { code: "ENOENT", path: String(path) });
  return overrides.get(name) ?? (Object.hasOwn(baseline.files, name) ? join(workspace, beforeDirectory, name) : path);
};
fs.readFileSync = (path, ...args) => original.readFileSync(beforePath(path), ...args);
fs.statSync = (path, ...args) => original.statSync(beforePath(path), ...args);
fs.lstatSync = (path, ...args) => original.lstatSync(beforePath(path), ...args);
fs.existsSync = path => { try { return original.existsSync(beforePath(path)); } catch (error) { if (error.code === "ENOENT") return false; throw error; } };
fs.realpathSync = (path, ...args) => { beforePath(path); return original.realpathSync(path, ...args); };
fs.realpathSync.native = (path, ...args) => { beforePath(path); return originalRealpathNative(path, ...args); };
fs.readdirSync = (path, ...args) => {
  beforePath(path);
  const absolute = path instanceof URL ? fileURLToPath(path) : String(path);
  return original.readdirSync(path, ...args).filter(entry => !removed(nameOf(join(absolute, typeof entry === "string" ? entry : entry.name))));
};
syncBuiltinESMExports();
assert.equal(fs.readFileSync(join(workspace, "status/current-phase.yaml"), "utf8"), original.readFileSync(join(workspace, beforeDirectory, "status/current-phase.yaml"), "utf8"));
for (const file of baseline.notPresent) assert.equal(fs.existsSync(join(workspace, file)), false);
assert.equal(fs.readFileSync(join(workspace, "scripts/verification-helpers.mjs"), "utf8").includes("getG4VisualRefinementSourceBindings"), false);
registerHooks({ load(url, context, nextLoad) {
  if (!url.startsWith("file:")) return nextLoad(url, context);
  const name = nameOf(new URL(url));
  if (removed(name)) throw Object.assign(new Error(`Before view cannot import current G4 feedback addition: ${name}`), { code: "ENOENT" });
  const loaded = nextLoad(url, context);
  if (name !== null && (Object.hasOwn(baseline.files, name) || overrides.has(name)) && /\.[cm]?[jt]s$/.test(name)) return { ...loaded, source: original.readFileSync(beforePath(new URL(url))), shortCircuit: true };
  return loaded;
} });
const script = process.argv[2];
if (!script || !["scripts/verify-token-foundations.mjs", "scripts/verify-tailwind-b2.mjs", "scripts/verify-workspace.mjs", "scripts/verify-boundaries.mjs", "scripts/verify-evidence.mjs"].includes(script)) throw new Error("Only the five requested read-only verifiers are allowed.");
console.log(`G4 feedback before view self-checks passed: ${Object.keys(baseline.files).length} saved actual SHA values; two separately reconstructed E2E predecessors match the immutable G4 SHA. Two source additions and the new evidence directory are absent. Unchanged dependencies use current filesystem bytes.`);
process.argv[1] = join(workspace, script);
await import(pathToFileURL(process.argv[1]).href);
