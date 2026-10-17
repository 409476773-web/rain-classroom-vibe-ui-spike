import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const workspace = resolve(process.argv[2]);
const host = resolve(process.argv[3]);
const source = dirname(fileURLToPath(import.meta.url));
const registry = JSON.parse(readFileSync(join(workspace, 'registry/charts.json'), 'utf8'));
const uiFixtureVersion = '0.0.0-consumption.20261008-freeze-final';
const commands = [];
function run(command, args, cwd) {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' });
  commands.push({ command, args, cwd, exit: result.status, stdout: result.stdout, stderr: result.stderr });
  if (result.status !== 0) throw new Error(`${command} exited ${result.status}`);
}
mkdirSync(join(host, 'packages'), { recursive: true });
mkdirSync(join(host, 'src'), { recursive: true });
mkdirSync(join(host, 'logs'), { recursive: true });
const files = [...new Set([...registry.shared.files, ...registry.items.flatMap(item => item.files)])];
const snapshots = [];
for (const path of files) {
  const destination = join(host, 'source-packages/ui', path.replace(/^packages\/ui\//, ''));
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(join(workspace, path), destination);
  snapshots.push({ path, sha256: createHash('sha256').update(readFileSync(destination)).digest('hex') });
}
const foundationStyles = ['tokens.css', 'typography.css', 'focus.css'];
for (const file of foundationStyles) {
  const path = `packages/foundations/src/${file}`;
  const destination = join(host, 'source-packages/foundations/src', file);
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(join(workspace, path), destination);
  snapshots.push({ path, sha256: createHash('sha256').update(readFileSync(destination)).digest('hex') });
}
const runtime = { ...registry.dependencies };
delete runtime.react;
delete runtime['react-dom'];
writeFileSync(join(host, 'source-packages/ui/package.json'), JSON.stringify({
  name: '@rain-next/ui', version: uiFixtureVersion, private: true, type: 'module', files: ['src'],
  exports: { './charts': './src/charts/index.ts', './charts/styles.css': './src/charts/styles.css' },
  peerDependencies: { react: registry.dependencies.react, 'react-dom': registry.dependencies['react-dom'], '@rain-next/foundations': '0.0.0' },
  dependencies: runtime,
}, null, 2));
writeFileSync(join(host, 'source-packages/foundations/package.json'), JSON.stringify({
  name: '@rain-next/foundations', version: '0.0.0', private: true, type: 'module', files: ['src'],
  exports: Object.fromEntries(foundationStyles.map(file => [`./${file}`, `./src/${file}`])),
}, null, 2));
for (const pkg of ['foundations', 'ui']) run('npm', ['pack', '--ignore-scripts', '--pack-destination', join(host, 'packages')], join(host, 'source-packages', pkg));
writeFileSync(join(host, 'package.json'), JSON.stringify({
  name: 'rain-charts-independent-consumer', version: '0.0.0', private: true, type: 'module',
  scripts: { dev: 'vite --host 127.0.0.1 --port 5391 --strictPort', build: 'vite build', check: 'tsc --noEmit', data: 'node src/data-check.mjs', installation: 'node src/install-check.mjs', browser: 'node src/browser-check.mjs' },
  dependencies: { '@rain-next/ui': `file:./packages/rain-next-ui-${uiFixtureVersion}.tgz`, '@rain-next/foundations': 'file:./packages/rain-next-foundations-0.0.0.tgz', react: registry.dependencies.react, 'react-dom': registry.dependencies['react-dom'], motion: registry.dependencies.motion },
  devDependencies: { ...registry.devDependencies, vite: '7.3.6', typescript: '5.9.3', '@playwright/test': '1.61.1' },
}, null, 2));
for (const file of ['main.tsx', 'report.tsx', 'regional.tsx', 'data.mjs', 'data-check.mjs', 'install-check.mjs', 'browser-check.mjs', 'app.css']) copyFileSync(join(source, file), join(host, 'src', file));
for (const file of ['index.html', 'vite.config.mjs', 'tsconfig.json']) copyFileSync(join(source, file), join(host, file));
writeFileSync(join(host, 'logs/source-snapshot.json'), JSON.stringify({ workspace, host, createdAt: new Date().toISOString(), publication: 'unpublished', uiFixtureVersion, registrySha256: createHash('sha256').update(readFileSync(join(workspace, 'registry/charts.json'))).digest('hex'), registrySourceVersion: registry.sourceVersion, sourceFiles: snapshots, tarballs: [`rain-next-ui-${uiFixtureVersion}.tgz`, 'rain-next-foundations-0.0.0.tgz'].map(file => ({ file, sha256: createHash('sha256').update(readFileSync(join(host, 'packages', file))).digest('hex') })) }, null, 2));
writeFileSync(join(host, 'logs/package-pack.json'), JSON.stringify(commands, null, 2));
console.log(`Prepared ${host}: ${files.length} chart files, 3 Foundation styles, 2 private local tarballs.`);
