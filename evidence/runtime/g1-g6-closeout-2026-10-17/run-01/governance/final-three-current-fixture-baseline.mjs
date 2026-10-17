import assert from 'node:assert/strict';
import fs from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { copyCurrentGovernanceFixture } from '../../../../../scripts/select-unification-test-fixture.ts';
import { validateTailwindB2SystemContract } from '../../../../../scripts/verify-tailwind-b2.mjs';
const root = process.cwd(), base = 'evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/';
const fixture = fs.mkdtempSync(path.join(tmpdir(), 'rain-current-system-contract-baseline-'));
const report = { kind: 'ExactCurrentFixtureSystemContractBaseline', fixtureScope: 'Existing source-reader/SystemContract/Boundary callers only; not a deliverable Markdown link closure', bindingSHA256: createHash('sha256').update(fs.readFileSync(base + 'source-bindings.json')).digest('hex') };
try {
  let started = performance.now();
  copyCurrentGovernanceFixture(root, fixture);
  report.copyDurationMs = performance.now() - started;
  assert(report.copyDurationMs < 60000, 'Current fixture copy must fit its unchanged 60-second hook budget');
  started = performance.now();
  report.failures = validateTailwindB2SystemContract({ root: fixture });
  report.validationDurationMs = performance.now() - started;
  assert.deepEqual(report.failures, []);
  assert(report.validationDurationMs < 60000, 'Public baseline validation must fit its unchanged default budget');
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.error = error.stack;
  process.exitCode = 1;
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
  fs.writeFileSync(base + 'final-three-current-fixture-baseline.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report));
}
