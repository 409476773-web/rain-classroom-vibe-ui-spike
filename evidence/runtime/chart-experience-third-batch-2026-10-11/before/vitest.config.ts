import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    exclude: ["tests/e2e/**", "evidence/**", "artifacts/**", "**/node_modules/**", "**/dist/**"],
    setupFiles: ["./tests/setup.ts"],
  },
});
