import { mkdirSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve, sep } from "node:path";

/** Route newly produced artifacts only. Never use this for historical baselines. */
export function evidenceOutputPath(originalPath, root = process.cwd()) {
  const outputRoot = resolve(root, process.env.RAIN_IMPLEMENTATION_EVIDENCE_DIR || "artifacts/e2e");
  const original = resolve(root, originalPath);
  const alreadyRouted = relative(outputRoot, original);
  if (alreadyRouted === "" || (!alreadyRouted.startsWith(`..${sep}`) && alreadyRouted !== ".." && !isAbsolute(alreadyRouted))) {
    mkdirSync(dirname(original), { recursive: true });
    return original;
  }
  const local = relative(root, original);
  if (local === ".." || local.startsWith(`..${sep}`) || isAbsolute(local)) {
    throw new Error(`Evidence output must be inside the workspace or explicit run directory: ${originalPath}`);
  }
  const target = resolve(outputRoot, "legacy", local);
  mkdirSync(dirname(target), { recursive: true });
  return target;
}
