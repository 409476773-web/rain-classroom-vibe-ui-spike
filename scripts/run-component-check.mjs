import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { captureImplementationInputs, changedImplementationInputs } from "./implementation-inputs.mjs";

// Append-only command evidence for this finite implementation batch.
const [taskId, checkId, executable, ...args] = process.argv.slice(2);
if (!/^[A-Z][0-9]{2}$/.test(taskId || "") || !/^[a-z0-9-]+$/.test(checkId || "") || !executable) {
  throw new Error("Usage: node scripts/run-component-check.mjs TASK check-id executable ...args");
}
const run = resolve("evidence/runtime/component-implementation-2026-10-18/run-01");
const directory = resolve(run, "checks", taskId, checkId);
if (existsSync(directory)) throw new Error("Check evidence already exists; use a new check-id");
mkdirSync(directory, { recursive: true });
const logPath = resolve(directory, "output.log"), log = openSync(logPath, "wx");
const env = { ...process.env, RAIN_IMPLEMENTATION_EVIDENCE_DIR: directory,
  RAIN_G5_EVIDENCE_DIR: resolve(directory, "g5"), RAIN_CLOSURE_EVIDENCE_DIR: resolve(directory, "closure"),
  RAIN_TABS_EVIDENCE_DIR: resolve(directory, "tabs") };
const startedAt = new Date().toISOString();
const workingDiffHash = createHash("sha256").update(execFileSync("git", ["diff", "--binary"], { maxBuffer: 16 * 1024 * 1024 })).digest("hex");
const inputHashes = { lockfile: createHash("sha256").update(readFileSync("pnpm-lock.yaml")).digest("hex") };
const inputsBefore = captureImplementationInputs();
writeFileSync(resolve(directory, "inputs-before.json"), JSON.stringify(inputsBefore, null, 2) + "\n");
const stagedDiffHash = createHash("sha256").update(execFileSync("git", ["diff", "--cached", "--binary"], { maxBuffer: 16 * 1024 * 1024 })).digest("hex");
const child = spawn(executable, args, { cwd: process.cwd(), env, stdio: ["ignore", log, log] });
let launchError = null;
child.on("error", error => { launchError = error.message; });
child.on("close", (exitCode, signal) => {
  closeSync(log);
  const inputsAfter = captureImplementationInputs();
  writeFileSync(resolve(directory, "inputs-after.json"), JSON.stringify(inputsAfter, null, 2) + "\n");
  const changedInputs = changedImplementationInputs(inputsBefore, inputsAfter);
  const record = { runId: "component-implementation-2026-10-18/run-01", taskId, checkId,
    baselineCommit: "6a2364c8b0325a243b2de8ebe12361e305aab333", candidateCommit: null,
    cwd: process.cwd(), command: [executable, ...args], startedAt, endedAt: new Date().toISOString(),
    exitCode, signal, launchError, workingDiffHash, stagedDiffHash, inputHashes,
    candidateInputs: { before: inputsBefore.sha256, after: inputsAfter.sha256, files: Object.keys(inputsBefore.files).length, changedInputs, stableDuringCheck: changedInputs.length === 0, generatedOutputs: Object.fromEntries(Object.entries(inputsAfter.files).filter(([path]) => path.includes(".generated.") || path.includes("generated/"))) },
    environment: { node: process.version, platform: process.platform, arch: process.arch },
    logPath, logSha256: createHash("sha256").update(readFileSync(logPath)).digest("hex"), humanReview: "not-evaluated" };
  writeFileSync(resolve(directory, "command.json"), JSON.stringify(record, null, 2) + "\n");
  console.log(JSON.stringify(record, null, 2));
  console.log(readFileSync(logPath, "utf8").slice(-14000));
  process.exitCode = exitCode ?? 1;
});
