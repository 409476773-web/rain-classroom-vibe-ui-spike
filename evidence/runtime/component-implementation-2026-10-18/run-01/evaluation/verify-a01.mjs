import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { lstatSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = path => JSON.parse(readFileSync(resolve(root, path), 'utf8'));
const hash = value => createHash('sha256').update(value).digest('hex');
const failures = [];
const checks = [];
function check(name, fn) {
  try { fn(); checks.push({ name, result: 'passed' }); }
  catch (error) { failures.push({ name, error: error.message }); }
}

// This validator implements every keyword used in this deliberately small schema.
// Unsupported keywords fail instead of being silently ignored.
function validate(schema, value, path = '$') {
  const keywords = new Set(['$schema', '$id', 'type', 'required', 'properties', 'additionalProperties', 'items', 'enum', 'minItems', 'minLength']);
  for (const key of Object.keys(schema)) assert(keywords.has(key), `${path}: unsupported schema keyword ${key}`);
  const type = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  assert(types.includes(type), `${path}: expected ${types.join('|')}, got ${type}`);
  if (schema.enum) assert(schema.enum.some(item => Object.is(item, value)), `${path}: unexpected enum value`);
  if (type === 'object') {
    for (const key of schema.required ?? []) assert(Object.hasOwn(value, key), `${path}: missing ${key}`);
    for (const [key, child] of Object.entries(value)) {
      if (schema.properties?.[key]) validate(schema.properties[key], child, `${path}.${key}`);
      else assert(schema.additionalProperties !== false, `${path}: unexpected ${key}`);
    }
  }
  if (type === 'array') {
    assert(value.length >= (schema.minItems ?? 0), `${path}: too few items`);
    if (schema.items) value.forEach((item, index) => validate(schema.items, item, `${path}[${index}]`));
  }
  if (type === 'string') assert(value.length >= (schema.minLength ?? 0), `${path}: empty string`);
}

function validateRecord(record) {
  validate(read('evaluation-record.schema.json'), record);
  if (record.executionStatus !== 'not-run') {
    assert(record.taskId && record.kind && record.consumerSnapshotId && record.profileId, 'running record needs task, kind, final snapshot and profile');
    assert(record.allowedInputs.length && record.initialContext.length && Object.keys(record.inputHashes).length, 'running record needs actual allowed inputs, initial context and hashes');
  }
  if (record.versions.T0) {
    assert(record.firstSelection, 'T0 requires pre-code selection');
    assert(Date.parse(record.firstSelection.recordedAt) <= Date.parse(record.versions.T0.frozenAt), 'selection must precede T0');
  }
  for (const [name, version] of Object.entries(record.versions)) {
    if (version && version.status !== 'not-run') {
      assert(version.frozenAt && version.sourceTreeHash && version.manifestPath, `${name}: captured version needs a timestamp, tree hash and file manifest`);
      assert(/^[0-9a-f]{64}$/.test(version.sourceTreeHash), `${name}: invalid SHA-256`);
      assert(version.sharedHashBefore && version.sharedHashAfter, `${name}: shared package hashes required`);
      if (record.finalOutcome === 'passed-scoped') assert.equal(version.sharedHashBefore, version.sharedHashAfter, `${name}: shared packages changed`);
    }
  }
  if (record.contaminated) assert.notEqual(record.finalOutcome, 'passed-scoped', 'contaminated run cannot claim an independent pass');
  if (record.humanReview.status === 'accepted') assert(record.humanReview.verbatimFeedback && record.humanReview.version && record.humanReview.scope, 'accepted needs actual scoped user feedback');
  if (record.finalOutcome === 'passed-scoped') {
    assert.equal(record.executionStatus, 'completed');
    assert(record.checks.length, 'passed-scoped requires actual checks');
    assert(record.firstSelection, 'passed-scoped requires first selection');
  }
}

check('frozen manifest and aggregate SHA-256', () => {
  const seal = read('frozen-manifest.json');
  assert.equal(hash(JSON.stringify(seal.files)), seal.fileMapSha256, 'seal file-map digest changed');
  for (const [path, expected] of Object.entries(seal.files)) {
    assert(!path.startsWith('/') && !path.split('/').includes('..'), `unsafe sealed path: ${path}`);
    const file = resolve(root, path);
    assert(lstatSync(file).isFile() && !lstatSync(file).isSymbolicLink(), `non-regular sealed file: ${path}`);
    assert.equal(hash(readFileSync(file)), expected, `frozen artifact changed: ${path}`);
  }
});
check('12 calibration questions and fixed threshold', () => {
  const questions = read('calibration/prompts.json').items;
  const rubric = read('calibration/evaluator-rubric.json');
  assert.equal(questions.length, 12);
  assert.equal(new Set(questions.map(x => x.id)).size, 12);
  assert.deepEqual(questions.map(x => x.id), rubric.items.map(x => x.id));
  assert.equal(rubric.acceptance.reasonableMinimum, 10);
  assert.equal(rubric.acceptance.hardFailureMaximum, 0);
  for (const q of questions) assert(!Object.hasOwn(q, 'evaluatorGuidance'), 'answers leaked into public prompt');
});
check('three E0 requirements, six separate structural edits and evaluator rubrics', () => {
  for (const task of ['EVAL-01', 'EVAL-02', 'EVAL-03']) {
    for (const stage of ['E0', 'E1', 'E2']) assert(readFileSync(resolve(root, `independent/${task}/${stage}.md`), 'utf8').trim().length > 100);
    const rubric = read(`evaluator/${task}-rubric.json`);
    assert.equal(rubric.taskId, task);
    assert.equal(rubric.requiredFlows.length, 6);
    assert.equal(rubric.E1Assertions.length, 3);
    assert.equal(rubric.E2Assertions.length, 3);
  }
});
check('synthetic data has stable IDs and required boundary cases', () => {
  const one = read('independent/EVAL-01/data.json');
  assert.equal(one.units.length, 3);
  const resources = one.units.flatMap(unit => unit.resources);
  assert.equal(new Set(resources.map(r => r.id)).size, resources.length);
  assert(resources.some(r => r.requiresDescription && !r.description));
  assert(resources.some(r => r.requiresAttachment && !r.attachments.length));
  assert(resources.some(r => r.title.length > 45));
  const two = read('independent/EVAL-02/data.json');
  assert.equal(two.records.length, 12);
  assert.equal(new Set(two.records.map(r => r.id)).size, 12);
  assert(two.records.some(r => r.readOnly));
  assert(two.records.some(r => r.problemCount === 0));
  assert(two.records.some(r => r.problemCount === null));
  const three = read('independent/EVAL-03/data.json');
  assert.equal(new Set(three.answers.map(a => a.id)).size, three.answers.length);
  for (const answer of three.answers) {
    const question = three.questions.find(q => q.id === answer.questionId);
    assert(question, 'unknown question ID');
    assert(answer.originalScore >= 0 && answer.originalScore <= question.maxScore);
  }
  assert(three.answers.some(a => a.originalScore === 0));
  assert(three.answers.some(a => a.answerText.length > 160));
});
check('template is unexecuted and passes its full schema', () => {
  const template = read('record-template.json');
  validateRecord(template);
  assert.equal(template.executionStatus, 'not-run');
  assert.equal(template.finalOutcome, 'not-run');
  assert.equal(template.humanReview.status, 'not-run');
  assert.equal(template.consumerSnapshotId, null);
});
check('negative records are rejected without writing files', () => {
  let invalid = read('record-template.json');
  delete invalid.versions;
  assert.throws(() => validateRecord(invalid), /missing versions/);
  invalid = read('record-template.json'); invalid.extraPassed = true;
  assert.throws(() => validateRecord(invalid), /unexpected extraPassed/);
  invalid = read('record-template.json'); invalid.executionStatus = 'running';
  assert.throws(() => validateRecord(invalid), /running record needs/);
  invalid = read('record-template.json'); invalid.humanReview.status = 'accepted';
  assert.throws(() => validateRecord(invalid), /accepted needs/);
  invalid = read('record-template.json'); invalid.finalOutcome = 'passed-scoped';
  assert.throws(() => validateRecord(invalid));
});
if (process.argv[2] === '--record') check('requested evaluation record', () => validateRecord(read(process.argv[3])));
else assert(process.argv.length === 2, 'Usage: node verify-a01.mjs [--record path]');
console.log(JSON.stringify({ status: failures.length ? 'failed' : 'passed', scope: 'A01 protocol/input/schema integrity only; no consumer evaluation or human acceptance', checkedAt: new Date().toISOString(), checks, failures }, null, 2));
if (failures.length) process.exitCode = 1;
