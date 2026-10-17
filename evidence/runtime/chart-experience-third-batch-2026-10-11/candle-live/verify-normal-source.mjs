import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const run = "evidence/runtime/chart-experience-third-batch-2026-10-11";
const path = "apps/playground/src/docs/components/chart-data.ts";
const beforeText = await readFile(`${run}/before/${path}`, "utf8");
const afterText = await readFile(path, "utf8");
const names = ["makeCandles", "makeLivePoints"];
// Both actual declarations use an unindented closing brace; nested blocks are indented.
const exact = (text, name) => text.match(new RegExp(`^export function ${name}\\b[^\\n]*\\n[\\s\\S]*?^}`, "m"))?.[0];
const hash = text => createHash("sha256").update(text).digest("hex");
const results = names.map(name => {
  const original = exact(beforeText, name), current = exact(afterText, name);
  if (!original || !current) throw new Error(`Missing actual declaration ${name}`);
  return {name, beforeSha256: hash(original), afterSha256: hash(current), bytesEqual: original === current};
});
const facts = {scope: "Actual baseline/current function declarations, including normal Mock generation; no evaluation or data rewriting", results};
await writeFile(`${run}/candle-live/normal-source-preservation.json`, JSON.stringify(facts, null, 2));
if (results.some(result => !result.bytesEqual)) throw new Error("Normal Mock declarations changed");
console.log(JSON.stringify(facts, null, 2));
