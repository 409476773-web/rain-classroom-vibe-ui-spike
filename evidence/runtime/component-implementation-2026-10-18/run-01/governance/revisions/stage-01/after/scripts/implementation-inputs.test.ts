import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, it } from "vitest";
import { captureImplementationInputs, changedImplementationInputs } from "./implementation-inputs.mjs";
it("binds staged, unstaged and new source contents and detects changes during a check", () => {
  const root = mkdtempSync(join(tmpdir(), "rain-input-binding-"));
  try {
    execFileSync("git", ["init", "--quiet"], { cwd: root });
    writeFileSync(join(root, "staged.ts"), "before");
    execFileSync("git", ["add", "staged.ts"], { cwd: root });
    writeFileSync(join(root, "staged.ts"), "working file differs from index");
    writeFileSync(join(root, "untracked.ts"), "new model");
    const before = captureImplementationInputs(root);
    expect(Object.keys(before.files)).toEqual(["staged.ts", "untracked.ts"]);
    writeFileSync(join(root, "untracked.ts"), "changed during execution");
    const after = captureImplementationInputs(root);
    expect(before.sha256).not.toBe(after.sha256);
    expect(changedImplementationInputs(before, after)).toEqual(["untracked.ts"]);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
