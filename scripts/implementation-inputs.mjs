import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readlinkSync } from "node:fs";
import { resolve } from "node:path";
export const digest = bytes => createHash("sha256").update(bytes).digest("hex");
/** Finite working-file contents, including staged and untracked sources. Historic evidence is checked separately. */
export function captureImplementationInputs(root = process.cwd()) {
  const files = [...new Set(execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], { cwd: root, maxBuffer: 32 * 1024 * 1024 }).toString().split("\0"))]
    .filter(path => path && !/^(evidence|artifacts|outputs|dist|node_modules)\//.test(path) && /\.(?:[cm]?[jt]sx?|json|ya?ml|css|md|html|toml|py|sh)$/.test(path)).sort();
  const contents = Object.fromEntries(files.map(path => {
    const file = resolve(root, path);
    return [path, !existsSync(file) ? { kind: "missing", sha256: null }
      : lstatSync(file).isSymbolicLink() ? { kind: "symlink", sha256: digest(readlinkSync(file)) }
      : { kind: "file", sha256: digest(readFileSync(file)) }];
  }));
  return { schemaVersion: 1, scope: "Git-listed tracked/staged/untracked source, contract, config and documentation contents; historical evidence excluded and separately protected", files: contents, sha256: digest(JSON.stringify(contents)) };
}
export function changedImplementationInputs(before, after) {
  return [...new Set([...Object.keys(before.files), ...Object.keys(after.files)])].filter(path => JSON.stringify(before.files[path]) !== JSON.stringify(after.files[path]));
}
