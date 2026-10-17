import fs from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { registerHooks, syncBuiltinESMExports } from 'node:module';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const workspace = process.cwd();
const beforeDirectory = 'evidence/runtime/g4-components-2026-10-11/before/';
const original = Object.fromEntries(['readFileSync', 'existsSync', 'statSync', 'lstatSync', 'readdirSync', 'realpathSync'].map(name => [name, fs[name].bind(fs)]));
const originalRealpathNative = fs.realpathSync.native.bind(fs);
const bindings = JSON.parse(original.readFileSync(join(workspace, 'evidence/runtime/g4-components-2026-10-11/source-bindings.json'), 'utf8'));
const baseline = JSON.parse(original.readFileSync(join(workspace, 'evidence/runtime/g4-components-2026-10-11/baseline.json'), 'utf8'));
const extra = JSON.parse(original.readFileSync(join(workspace, 'evidence/runtime/g4-components-2026-10-11/baseline-extra.json'), 'utf8'));
const beforeHashes = { ...baseline.files, ...Object.fromEntries(Object.entries(extra).map(([file, record]) => [file, record.sha256])) };
for (const [file, expected] of Object.entries(beforeHashes)) {
  assert.equal(createHash('sha256').update(original.readFileSync(join(workspace, beforeDirectory, file))).digest('hex'), expected, `Saved before bytes changed: ${file}`);
}
const added = Object.entries(bindings.sourceFiles).filter(([, binding]) => binding.before === null).map(([file]) => file);
added.push('evidence/runtime/g4-components-2026-10-11');
const nameOf = path => {
  if (typeof path === 'number') return null;
  const absolute = path instanceof URL ? fileURLToPath(path) : resolve(String(path));
  const name = relative(workspace, absolute);
  return name.startsWith('../') || name === '..' ? null : name;
};
const removed = name => name !== null && added.some(file => name === file || name.startsWith(file + '/'));
const beforePath = path => {
  const name = nameOf(path);
  if (name === null) return path;
  if (removed(name)) throw Object.assign(new Error(`Before view has no G4 addition: ${name}`), { code: 'ENOENT', path: String(path) });
  const snapshot = join(workspace, beforeDirectory, name);
  return original.existsSync(snapshot) ? snapshot : path;
};
fs.readFileSync = (path, ...args) => original.readFileSync(beforePath(path), ...args);
fs.statSync = (path, ...args) => original.statSync(beforePath(path), ...args);
fs.lstatSync = (path, ...args) => original.lstatSync(beforePath(path), ...args);
fs.existsSync = path => { try { return original.existsSync(beforePath(path)); } catch (error) { if (error.code === 'ENOENT') return false; throw error; } };
fs.realpathSync = (path, ...args) => { beforePath(path); return original.realpathSync(path, ...args); };
fs.realpathSync.native = (path, ...args) => { beforePath(path); return originalRealpathNative(path, ...args); };
fs.readdirSync = (path, ...args) => {
  beforePath(path);
  const absolute = path instanceof URL ? fileURLToPath(path) : String(path);
  return original.readdirSync(path, ...args).filter(entry => !removed(nameOf(join(absolute, typeof entry === 'string' ? entry : entry.name))));
};
syncBuiltinESMExports();
assert.equal(fs.readFileSync(join(workspace, 'status/current-phase.yaml'), 'utf8'), original.readFileSync(join(workspace, beforeDirectory, 'status/current-phase.yaml'), 'utf8'));
for (const file of added.slice(0, -1)) assert.equal(fs.existsSync(join(workspace, file)), false);
assert.equal(fs.readFileSync(join(workspace, 'packages/ui/src/styles.css'), 'utf8').includes('@import "./item/item.css";'), false);
registerHooks({ load(url, context, nextLoad) {
  if (!url.startsWith('file:')) return nextLoad(url, context);
  const name = nameOf(new URL(url));
  if (removed(name)) throw Object.assign(new Error(`Before view cannot import G4 addition: ${name}`), { code: 'ENOENT' });
  const loaded = nextLoad(url, context);
  if (name !== null && original.existsSync(join(workspace, beforeDirectory, name)) && /\.[cm]?[jt]s$/.test(name)) {
    return { ...loaded, source: original.readFileSync(join(workspace, beforeDirectory, name)), shortCircuit: true };
  }
  return loaded;
}});
const script = process.argv[2];
if (!script || !script.startsWith('scripts/verify-')) throw new Error('Only the requested read-only verification script is allowed.');
console.log(`G4 before view self-checks passed: ${Object.keys(beforeHashes).length} saved before SHA values, saved status/style/module bytes, all 22 additions absent. Two saved files are explicitly reconstructed; unchanged dependencies use current filesystem bytes.`);
process.argv[1] = join(workspace, script);
await import(pathToFileURL(process.argv[1]).href);
