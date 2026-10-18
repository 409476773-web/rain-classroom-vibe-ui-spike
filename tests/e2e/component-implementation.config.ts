import { defineConfig } from "@playwright/test";
import base from "../../playwright.config";

// This batch uses the real 4173/4174 apps and isolates every testInfo artifact.
export default defineConfig({ ...base, testDir: ".", workers: 1 });
