import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Full source-history checks traverse thousands of sealed files per case.
    maxWorkers: 2,
    testTimeout: 60_000,
    environment: "jsdom",
    exclude: ["tests/e2e/**", "evidence/**", "artifacts/**", "**/node_modules/**", "**/dist/**"],
    setupFiles: ["./tests/setup.ts"],
  },
});
