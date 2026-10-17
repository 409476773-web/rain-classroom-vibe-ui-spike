import { resolve } from "node:path";

/** Output routing only: historical source locks and baselines keep their original paths. */
export function getG5EvidenceDirectory(root, original = "evidence/runtime/g5-components-2026-10-12") {
  return resolve(root, process.env.RAIN_G5_EVIDENCE_DIR || original);
}
