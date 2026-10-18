// @vitest-environment node
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import * as fs from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { createHash } from "node:crypto";
import { getValidatedTailwindB2History, hasRn14Authorization, parseYamlSubset, withSourceBindingTraversal } from "./verification-helpers.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
it.each(["M1", "M2"])("includes manifest paths written as inline code and indexes the portable guide closure in %s", async milestone => {
  const { exportStarter, verifyStarter } = await import("./rn14-starter.mjs");
  const temporary = mkdtempSync(join(tmpdir(), "rain-starter-contracts-"));
  try {
    const output = join(temporary, "starter"), lock = exportStarter(output, { milestone });
    const contract = "manifests/ui/resizable.yaml";
    expect(existsSync(join(output, contract)), "prototype-design requires this inline-code path").toBe(true);
    expect(readFileSync(join(output, contract))).toEqual(readFileSync(join(root, contract)));
    const index = readFileSync(join(output, "docs/ai/starter-index.md"), "utf8");
    expect(index).toContain("../../manifests/ui/resizable.yaml");
    expect(index).toContain("prototype-design.md");
    expect(index).toContain("原工作区追溯材料");
    expect(readFileSync(join(output, "AGENTS.md"), "utf8")).toContain("docs/ai/starter-index.md");
    expect(lock.files[contract]).toBe(lock.sourceFiles[contract]);
    const profile = JSON.parse(readFileSync(join(output, "docs/ai/starter-profile.json"), "utf8"));
    expect(profile.milestone).toBe(milestone);
    expect(JSON.parse(readFileSync(join(output, "docs/ai/starter-profiles.generated.json"), "utf8")).profiles.map((item: any) => item.milestone)).toEqual([milestone]);
    expect(profile.recommendedAssets.find((asset: any) => asset.id === "ui-button")).toMatchObject({ assetIdentity: "local-experiment", candidateEligible: false, entry: { importPath: "@rain-next/ui", exportNames: ["Button"] } });
    expect(profile.recommendedAssets.find((asset: any) => asset.id === "recipe-input-group").entry).toMatchObject({ kind: "usage-reference", exportNames: [] });
    for (const reference of profile.references.filter((reference: any) => reference.role === "required")) expect(existsSync(join(output, reference.target)), `${reference.from} -> ${reference.target}`).toBe(true);
    expect(profile.transformations.some((item: any) => item.file === "docs/ai/g6-components.md")).toBe(true);
    expect(readFileSync(join(output, "docs/ai/starter-assets.generated.md"), "utf8")).toContain("candidate-eligible");
    expect(verifyStarter(output)).toBe(lock.snapshotId);
  } finally { rmSync(temporary, { recursive: true, force: true }); }
});
it("builds the copyable public-API combinations as a standalone preview route", async () => {
  const { exportStarter } = await import("./rn14-starter.mjs");
  const temporary = mkdtempSync(join(tmpdir(), "rain-starter-compositions-"));
  try {
    const output = join(temporary, "starter"), lock = exportStarter(output);
    for (const name of ["filter-toolbar", "sectioned-form", "grading-actions"]) {
      const source = `apps/playground/src/docs/examples/${name}.tsx`, target = `apps/prototype/src/composition-examples/${name}.tsx`;
      expect(existsSync(join(output, target)), target).toBe(true);
      expect(readFileSync(join(output, target))).toEqual(readFileSync(join(root, source)));
      expect(lock.files[target]).toBe(lock.sourceFiles[source]);
    }
    expect(readFileSync(join(output, "apps/prototype/src/main.tsx"), "utf8")).toContain('route === "#compositions"');
    expect(readFileSync(join(output, "docs/ai/starter-index.md"), "utf8")).toContain("#compositions");
  } finally { rmSync(temporary, { recursive: true, force: true }); }
});
it("delivers reachable design guidance and locks it with each standalone starter", async () => {
  const { exportStarter, verifyStarter } = await import("./rn14-starter.mjs");
  const temporary = mkdtempSync(join(tmpdir(), "rain-design-guidance-"));
  try {
    for (const milestone of ["M1", "M2"]) {
      const output = join(temporary, milestone), lock = exportStarter(output, { milestone });
      expect(existsSync(join(output, "AGENTS.md"))).toBe(true);
      const pending = ["AGENTS.md", ...(milestone === "M2" ? ["docs/ai/m2-trial-guide.md"] : [])], visited = new Set<string>();
      while (pending.length) {
        const file = pending.pop()!;
        if (visited.has(file)) continue;
        visited.add(file);
        const content = readFileSync(join(output, file), "utf8");
        for (const match of content.matchAll(/`((?:manifests|packages)\/[^`\n]+\.(?:yaml|json|md|ts|tsx|css))`/g)) {
          expect(existsSync(join(output, match[1]!)), `${file}: required inline path ${match[1]}`).toBe(true);
        }
        for (const match of content.matchAll(/\]\(([^)]+)\)/g)) {
          const href = match[1];
          if (!href || /^(?:https?:|#)/.test(href)) continue;
          const target = resolve(output, dirname(file), href.split("#")[0] ?? "");
          expect(target.startsWith(output + "/"), `${file}: outside starter`).toBe(true);
          expect(existsSync(target), `${file}: ${match[1]}`).toBe(true);
          if (target.endsWith(".md")) pending.push(target.slice(output.length + 1));
        }
      }
      expect(visited).toContain("docs/ai/prototype-design.md");
      expect(visited).toContain("docs/ai/information-design.md");
      expect(visited).toContain("docs/ai/form-composition.md");
      expect(visited).toContain("docs/ai/g6-components.md");
      const g6 = JSON.parse(readFileSync(join(root, "registry/g6-assets.json"), "utf8"));
      for (const file of [...g6.items.flatMap((item: any) => [item.manifest, ...item.files]), ...g6.shared.files]) {
        expect(readFileSync(join(output, file)), file).toEqual(readFileSync(join(root, file)));
        expect(lock.files[file], file).toBe(lock.sourceFiles[file]);
      }
      const portableG6 = readFileSync(join(output, "docs/ai/g6-components.md"), "utf8");
      expect(portableG6).toContain("registry/g6-assets.json` 随统一模型闭包附带");
      expect(portableG6).toContain("本 Starter 使用 workspace 结构");
      expect(portableG6).toContain("sourceEvidence/examples 是原工作区追溯材料");
      expect(readFileSync(join(output, "registry/g6-assets.json"))).toEqual(readFileSync(join(root, "registry/g6-assets.json")));
      expect(lock.files["registry/g6-assets.json"]).toBe(lock.sourceFiles["registry/g6-assets.json"]);
      expect(portableG6).toContain("原独立消费夹具与运行日志仍未附带");
      expect(lock.sourceFiles["docs/ai/g6-components.md"]).toBe(createHash("sha256").update(readFileSync(join(root, "docs/ai/g6-components.md"))).digest("hex"));
      expect(lock.sourceFiles["docs/ai/g6-components.md"]).not.toBe(lock.files["docs/ai/g6-components.md"]);

      for (const guide of ["docs/ai/prototype-design.md", "docs/ai/information-design.md"]) {
        const original = readFileSync(join(root, guide), "utf8");
        const navigationCase = "当前导航E1–E6已在2026-10-05获得运行视觉、本地AI消费与实例隔离审阅确认，见[消费合同](navigation-v042-w6.md)及[决定范围](../../evidence/runtime/navigation-v042/g3-acceptance-review02/acceptance.json)。这是可参考的本地组合案例，候选仍未发布，完整质量门单列。";
        let expected = guide === "docs/ai/prototype-design.md" ? original.replace(navigationCase,
          "导航工作包的消费指南与验收材料在专用导航交付包中；当前 M1/M2 Starter 仅开放对应业务场景，以下组合经验可作为参考。") : original;
        if (guide === "docs/ai/prototype-design.md") {
          expected = expected.replace("使用 [G6 组件指南](./g6-components.md) 和 Registry/Manifest", "使用本包附带的 [G6 组件指南](./g6-components.md) 和对应 Manifest，按 sourcePath、随包组件 README 与 package.json/pnpm-lock.yaml 核对当前可用能力");
        }
        if (guide === "docs/ai/information-design.md") {
          for (const label of ["Breadcrumb验证记录", "导航使用指南", "Tree实施规则与审核记录", "导航review-04与review-07及验收范围", "独立消费合同", "当前人工决定", "网络体验记录", "P3反馈记录", "确认台账", "逐图规则"]) {
            const trace = new RegExp(`\\[${label}\\]\\([^)]+\\)`, "g");
            expect(original.match(trace)).toHaveLength(1);
            expected = expected.replace(trace, `${label}（原工作区追溯材料；本 Starter 未附带）`);
          }
        }
        expect(readFileSync(join(output, guide), "utf8")).toBe(expected);
        expect(readFileSync(join(root, guide), "utf8")).toBe(original);
        if (guide === "docs/ai/prototype-design.md") {
          expect(original.split(navigationCase)).toHaveLength(2);
          expect(lock.sourceFiles[guide]).not.toBe(lock.files[guide]);
        } else expect(lock.sourceFiles[guide]).not.toBe(lock.files[guide]);
      }
      expect(verifyStarter(output)).toBe(lock.snapshotId);
      writeFileSync(join(output, "docs/ai/information-design.md"), "changed guidance");
      expect(() => verifyStarter(output)).toThrow(/changed/);
    }
  } finally { rmSync(temporary, { recursive: true, force: true }); }
});
it.each(["M1", "M2"])("distributes the complete Rain Designer snapshot in %s and detects each missing or changed method file", async milestone => {
  const { exportStarter, verifyStarter } = await import("./rn14-starter.mjs");
  const temporary = mkdtempSync(join(tmpdir(), "rain-designer-starter-"));
  const output = join(temporary, "starter");
  const skill = ".agents/skills/rain-designer/";
  const files = ["SKILL.md", "agents/openai.yaml", "references/designer.md", "references/designer-sources-v0.3.md", "references/optical-alignment.md", "references/optical-sources.md"].map(file => skill + file);
  try {
    const lock = exportStarter(output, { milestone });
    for (const file of files) {
      expect(existsSync(join(output, file)), file).toBe(true);
      const original = readFileSync(join(root, file));
      expect(readFileSync(join(output, file))).toEqual(original);
      const hash = createHash("sha256").update(original).digest("hex");
      expect(lock.sourceFiles[file]).toBe(hash);
      expect(lock.files[file]).toBe(hash);
      writeFileSync(join(output, file), "changed");
      expect(() => verifyStarter(output), file).toThrow(/changed/);
      writeFileSync(join(output, file), original);
      rmSync(join(output, file));
      expect(() => verifyStarter(output), file).toThrow(/inventory/);
      writeFileSync(join(output, file), original);
    }
    const instructions = readFileSync(join(output, "AGENTS.md"), "utf8");
    expect(instructions).toContain(`[Rain Designer](${skill}SKILL.md)`);
    expect(instructions).toContain("先理解当前任务");
    expect(instructions).toContain("共享 packages 与锁文件保持只读");
    expect(instructions).not.toContain("先读 [设计方法库]");
    expect(readFileSync(join(output, skill + "SKILL.md"), "utf8")).toContain("0.2.1");
    expect(readFileSync(join(output, skill + "references/designer.md"), "utf8")).toContain("v0.5");
    for (const file of ["AGENTS.md", "docs/ai/prototype-design.md", "docs/ai/g4-components.md", ...files]) {
      expect(readFileSync(join(output, file), "utf8"), file).not.toContain(root);
    }
    expect(readFileSync(join(output, "docs/ai/g4-components.md"), "utf8")).toContain("原工作区追溯材料；本 Starter 未附带");
    expect(lock.sourceFiles["docs/ai/g4-components.md"]).not.toBe(lock.files["docs/ai/g4-components.md"]);
    expect(verifyStarter(output)).toBe(lock.snapshotId);
    expect(lock.snapshotId).not.toBe("rn14-90fc74205a764fb1");
  } finally { rmSync(temporary, { recursive: true, force: true }); }
});
it("exports M2 only when explicitly requested, while the default starter remains A/B", async () => {
  const { exportStarter, verifyStarter } = await import("./rn14-starter.mjs");
  const temporary = mkdtempSync(join(tmpdir(), "rain-m2-starter-check-"));
  try {
    exportStarter(join(temporary, "m1"));
    expect(existsSync(join(temporary, "m1/apps/prototype/src/scenarios/bm-c"))).toBe(false);
    const output = join(temporary, "m2"), lock = exportStarter(output, { milestone: "M2" });
    expect(existsSync(join(output, "apps/prototype/src/scenarios/bm-c/page.tsx"))).toBe(true);
    expect(existsSync(join(output, "apps/prototype/src/scenarios/bm-d/page.tsx"))).toBe(true);
    expect(existsSync(join(output, "apps/prototype/src/scenarios/bm-d/state.test.tsx"))).toBe(false);
    expect(readFileSync(join(output, "apps/prototype/src/main.tsx"), "utf8")).toContain("LearningReportScenario");
    expect(verifyStarter(output)).toBe(lock.snapshotId);
    expect(() => exportStarter(join(temporary, "invalid"), { milestone: "M3" })).toThrow(/milestone/);
  } finally { rmSync(temporary, { recursive: true, force: true }); }
});
it("exports a fixed local starter without links to the source workspace and detects changed shared files", async () => {
  expect(existsSync(join(root, "scripts/rn14-starter.mjs"))).toBe(true);
  const { exportStarter, verifyStarter } = await import("./rn14-starter.mjs");
  const temporary = mkdtempSync(join(tmpdir(), "rain-rn14-check-"));
  const output = join(temporary, "starter");
  try {
    const lock = exportStarter(output);
    expect(lock.inputCommit).toMatch(/^[a-f0-9]{40}$/);
    expect(lock.snapshotId).toMatch(/^rn14-[a-f0-9]{16}$/);
    expect(lock.workingTree).toBe("content-addressed-local-snapshot");
    expect(verifyStarter(output)).toEqual(lock.snapshotId);
    const lockPath = join(output, "source-lock.json"), lockBytes = readFileSync(lockPath, "utf8");
    try { writeFileSync(lockPath, JSON.stringify({ ...lock, profile: { ...lock.profile, milestone: "M2" } })); expect(() => verifyStarter(output)).toThrow(/profile binding/); }
    finally { writeFileSync(lockPath, lockBytes); }
    try { const { profile: _profile, ...invalid } = lock; writeFileSync(lockPath, JSON.stringify(invalid)); expect(() => verifyStarter(output)).toThrow(/profile binding/); }
    finally { writeFileSync(lockPath, lockBytes); }
    const tokens = "packages/foundations/src/tokens.css";
    expect(readFileSync(join(output, tokens), "utf8")).toBe(readFileSync(join(root, tokens), "utf8"));
    expect(existsSync(join(output, "apps/playground/package.json"))).toBe(false);
    expect(existsSync(join(output, "apps/playground/src/app.tsx"))).toBe(false);
    expect(existsSync(join(output, "node_modules"))).toBe(false);
    expect(readFileSync(join(output, "apps/prototype/src/main.tsx"), "utf8")).not.toContain(root);
    expect(readFileSync(join(output, "pnpm-lock.yaml"), "utf8")).toBe(readFileSync(join(root, "pnpm-lock.yaml"), "utf8"));
    expect(() => exportStarter(output)).toThrow(/exists/);
    expect(() => exportStarter(join(root, "rn14-unsafe-output"))).toThrow(/outside/);
    const extra = join(output, "apps/prototype/src/extra.ts");
    writeFileSync(extra, "const invalid: number = 'unexpected';");
    expect(() => verifyStarter(output)).toThrow(/inventory/);
    rmSync(extra);
    const nested = join(output, "apps/prototype/src/dist");
    fs.mkdirSync(nested);
    writeFileSync(join(nested, "extra.ts"), "const invalid: number = 'unexpected';");
    expect(() => verifyStarter(output)).toThrow(/inventory/);
    rmSync(nested, { recursive: true });
    writeFileSync(join(output, tokens), "changed");
    expect(() => verifyStarter(output)).toThrow(/changed/);
    rmSync(join(output, tokens));
    (fs as any).symlinkSync(join(root, tokens), join(output, tokens));
    expect(() => verifyStarter(output)).toThrow(/Symbolic link|Invalid path/);
  } finally { rmSync(temporary, { recursive: true, force: true }); }
});
it("preserves the existing RN14 authorization and frozen B2 history", () => withSourceBindingTraversal(root, () => {
  const phase = parseYamlSubset(readFileSync(join(root, "status/current-phase.yaml"), "utf8")) as any;
  expect(hasRn14Authorization(phase)).toBe(true);
  expect(getValidatedTailwindB2History(phase)).toEqual(phase.phaseHistory.tailwindB2);
  const decision = {
    acceptedAt: "2026-09-15", decisionSource: "explicit-user-rn14-final-sample-visual-confirmation", userStatement: "确认",
    scope: "rn14-bm-a-b-final-snapshot-runtime-visual-only", snapshotId: "rn14-90fc74205a764fb1",
    evidence: "../evidence/runtime/rn14-editability/human-gate.md",
  };
  const accepted = structuredClone(phase);
  Object.assign(accepted.componentRefinements.rn14Editability, { humanGate: "accepted", humanGateDecision: decision });
  expect(hasRn14Authorization(accepted)).toBe(true);
  expect(getValidatedTailwindB2History(accepted)).toEqual(phase.phaseHistory.tailwindB2);
  const pending = structuredClone(accepted);
  pending.componentRefinements.rn14Editability.humanGate = "awaiting_human";
  delete pending.componentRefinements.rn14Editability.humanGateDecision;
  expect(hasRn14Authorization(pending)).toBe(true);
  for (const mutation of [
    { humanGateDecision: undefined }, { humanGateDecision: { ...decision, scope: "all-components" } },
    { humanGateDecision: { ...decision, snapshotId: "another-snapshot" } }, { implementation: "in-progress" },
    { scope: "all-apps" }, { publication: "published" }, { businessMigration: "authorized" }, { contrastAcceptance: "granted" },
  ]) {
    const invalid = structuredClone(accepted);
    Object.assign(invalid.componentRefinements.rn14Editability, mutation);
    expect(hasRn14Authorization(invalid)).toBe(false);
    expect(() => getValidatedTailwindB2History(invalid)).toThrow();
  }
}));
