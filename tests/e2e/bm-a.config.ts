import { defineConfig, devices } from "@playwright/test";
export default defineConfig({ testDir: ".", testMatch: "bm-a.spec.ts", workers: 1, retries: 0, reporter: "list",
  outputDir: "../../test-results/bm-a-rn09", use: { baseURL: "http://127.0.0.1:5200", trace: "retain-on-failure" },
  webServer: { command: "pnpm --filter @rain-next/prototype exec vite preview --host 127.0.0.1 --port 5200 --strictPort", url: "http://127.0.0.1:5200", reuseExistingServer: false },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
