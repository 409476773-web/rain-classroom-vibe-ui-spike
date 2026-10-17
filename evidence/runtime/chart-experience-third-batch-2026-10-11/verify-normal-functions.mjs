import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { parseSync } from "vite";

const run = "evidence/runtime/chart-experience-third-batch-2026-10-11";
const path = "apps/playground/src/docs/components/chart-data.ts";
const declarations = (text) => {
  const { program, errors } = parseSync(path, text);
  assert.equal(errors.length, 0);
  return new Map(program.body.map(node => node.declaration ?? node).filter(node => node.type === "FunctionDeclaration").map(node => [node.id.name, text.slice(node.start, node.end)]));
};
const before = declarations(readFileSync(`${run}/before/${path}`, "utf8"));
const after = declarations(readFileSync(path, "utf8"));
const hash = value => createHash("sha256").update(value).digest("hex");
const normalNames = [...before.keys()].filter(name => !name.startsWith("apply"));
assert.equal(normalNames.length, 27);
const results = [...before].map(([name, value]) => {
  assert.ok(after.has(name), `Missing original function: ${name}`);
  assert.equal(after.get(name), value, `Changed original function: ${name}`);
  return { name, normalFunction: normalNames.includes(name), beforeSha256: hash(value), afterSha256: hash(after.get(name)), bytesEqual: true };
});
const facts = { path, originalFunctions: before.size, normalFunctions: normalNames.length, results };
writeFileSync(`${run}/normal-functions-preservation.json`, `${JSON.stringify(facts, null, 2)}\n`);
console.log(`${before.size} original declarations preserved, including all ${normalNames.length} normal functions.`);
