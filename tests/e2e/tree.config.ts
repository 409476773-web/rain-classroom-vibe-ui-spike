import { defineConfig, devices } from "@playwright/test";

const production = process.env.TREE_PREVIEW === "1";
const port = production ? 5372 : 5371;

export default defineConfig({
  testDir: ".", testMatch: "tree.spec.ts", workers: 1, retries: 0,
  outputDir: "../../evidence/runtime/tree/test-results", reporter: "list",
  use: { ...devices["Desktop Chrome"], baseURL: `http://127.0.0.1:${port}`, viewport: { width: 1280, height: 900 }, trace: "retain-on-failure" },
  webServer: { command: `pnpm --filter @rain-next/playground ${production ? "exec vite preview" : "dev"} --host 127.0.0.1 --port ${port} --strictPort`, url: `http://127.0.0.1:${port}`, reuseExistingServer: !production, timeout: 120_000 },
});
