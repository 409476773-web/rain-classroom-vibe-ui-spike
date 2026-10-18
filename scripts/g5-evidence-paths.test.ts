import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { afterEach, expect, it, vi } from "vitest";

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

function configFor(name: "dates" | "components") {
  const result = spawnSync(process.execPath, ["--input-type=module", "-e",
    `const { default: config } = await import('./tests/e2e/g5-${name}.config.ts'); console.log(JSON.stringify({ outputDir: config.outputDir, reporter: config.reporter }));`,
  ], { encoding: "utf8", env: process.env });
  expect(result.error).toBeUndefined();
  expect(result.status, result.stderr).toBe(0);
  return JSON.parse(result.stdout);
}

it("routes the date browser report and result files to the explicit evidence directory", async () => {
  vi.stubEnv("RAIN_G5_EVIDENCE_DIR", "evidence/runtime/date-time-optimization-2026-10-12/test-route/dates");
  vi.resetModules();
  const config = configFor("dates");
  const directory = resolve(process.env.RAIN_G5_EVIDENCE_DIR!);
  expect(config.outputDir).toBe(resolve(directory, "results"));
  expect(config.reporter).toContainEqual(["json", { outputFile: resolve(directory, "report.json") }]);
});

it("routes the G5 browser report and result files to the explicit evidence directory", async () => {
  vi.stubEnv("RAIN_G5_EVIDENCE_DIR", "/tmp/rain-g5-route-check");
  vi.resetModules();
  const config = configFor("components");
  expect(config.outputDir).toBe("/tmp/rain-g5-route-check/results");
  expect(config.reporter).toContainEqual(["json", { outputFile: "/tmp/rain-g5-route-check/report.json" }]);
});

it("routes the date browser's default output away from historical evidence", async () => {
  vi.stubEnv("RAIN_G5_EVIDENCE_DIR", "");
  vi.resetModules();
  vi.stubEnv("RAIN_IMPLEMENTATION_EVIDENCE_DIR", "");
  const defaultConfig = configFor("dates");
  expect(resolve(defaultConfig.outputDir)).toBe(resolve("artifacts/e2e/legacy/evidence/runtime/g5-components-2026-10-12/browser-dates/results"));
});
