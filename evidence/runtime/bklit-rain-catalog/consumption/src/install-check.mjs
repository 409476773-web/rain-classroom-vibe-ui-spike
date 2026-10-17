import { lstatSync, readdirSync, realpathSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const require = createRequire(import.meta.url);
const host = realpathSync('.');
const symlinks = [];
function walk(path) {
  for (const name of readdirSync(path)) {
    const file = join(path, name);
    const stat = lstatSync(file);
    if (stat.isSymbolicLink()) symlinks.push({ path: file, target: realpathSync(file) });
    else if (stat.isDirectory()) walk(file);
  }
}
walk(resolve('node_modules'));
const external = symlinks.filter(link => !link.target.startsWith(`${host}/`));
assert.deepEqual(external, []);
const snapshot = JSON.parse(readFileSync('logs/source-snapshot.json', 'utf8'));
for (const item of snapshot.sourceFiles) {
  const pkg = item.path.startsWith('packages/ui/') ? 'ui' : 'foundations';
  const installed = join(realpathSync(`node_modules/@rain-next/${pkg}`), item.path.slice(`packages/${pkg}/`.length));
  assert.equal(createHash('sha256').update(readFileSync(installed)).digest('hex'), item.sha256, item.path);
}
const manifest = JSON.parse(readFileSync('package.json', 'utf8'));
const facts = { host, nodeVersion: process.version, packageManager: 'pnpm 10.28.1', localTarballDependencies: Object.fromEntries(Object.entries(manifest.dependencies).filter(([key]) => key.startsWith('@rain-next/'))), uiEntry: require.resolve('@rain-next/ui/charts'), uiStyleEntry: require.resolve('@rain-next/ui/charts/styles.css'), symlinkCount: symlinks.length, externalSymlinkCount: external.length, sourceHashMatchCount: snapshot.sourceFiles.length, hostTailwindDependencyCount: Object.keys({ ...manifest.dependencies, ...manifest.devDependencies }).filter(key => /tailwind/.test(key)).length, workspaceNodeModulesLink: false, publication: 'unpublished' };
assert.equal(facts.hostTailwindDependencyCount, 0);
writeFileSync('logs/clean-install-facts.json', JSON.stringify(facts, null, 2));
console.log(JSON.stringify(facts, null, 2));
