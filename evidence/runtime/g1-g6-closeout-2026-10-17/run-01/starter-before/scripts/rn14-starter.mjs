import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sha = value => createHash("sha256").update(value).digest("hex");
const inside = (parent, path) => { const part = relative(parent, path); return !part || (!part.startsWith("..") && !isAbsolute(part)); };
const json = value => JSON.stringify(value, null, 2) + "\n";
function filesIn(directory, ignored = new Set()) {
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap(entry => {
    const path = join(directory, entry.name);
    if (ignored.has(path)) return [];
    if (entry.isSymbolicLink()) throw new Error(`Symbolic link is not allowed: ${path}`);
    if (entry.isDirectory()) return filesIn(path, ignored);
    if (!entry.isFile()) throw new Error(`Not a regular file: ${path}`);
    return [path];
  });
}

const main = `import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { DensityProvider } from "@rain-next/foundations";
import { Button, Checkbox } from "@rain-next/ui";
import { Inline } from "@rain-next/layouts";
import { MaterialManagementScenario } from "./scenarios/bm-a/page";
import { TextbookFormScenario } from "./scenarios/bm-b/page";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/motion.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "@rain-next/layouts/styles.css";
import "./styles.css";
function App() {
  const [route, setRoute] = useState(location.hash), [compact, setCompact] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => { const update = () => setRoute(location.hash); addEventListener("hashchange", update); return () => removeEventListener("hashchange", update); }, []);
  const form = route === "#bm-b";
  return <DensityProvider density={form ? "default" : compact ? "compact" : "default"}>
    <main className="rain-prototype" data-rain-theme={theme} data-rain-id={form ? "prototype-bm-b" : "prototype-bm-a"}>
      <header className="rain-prototype-heading"><h1>{form ? "教材资料" : "课程资料"}</h1>
        <Inline gap={16} align="center"><Button variant="secondary" onClick={() => { location.hash = form ? "bm-a" : "bm-b"; }}>{form ? "课程资料" : "教材资料"}</Button>
          {!form && <Checkbox label="紧凑密度" checked={compact} onCheckedChange={setCompact} />}
          <Button variant="secondary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? "切换深色" : "切换浅色"}</Button></Inline>
      </header>
      {form ? <TextbookFormScenario /> : <MaterialManagementScenario />}
    </main>
  </DensityProvider>;
}
createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
`;

export function exportStarter(destination, { milestone = "M1" } = {}) {
  if (!["M1", "M2"].includes(milestone)) throw new Error("Unsupported starter milestone");
  const output = resolve(destination);
  if (inside(root, output) || inside(root, join(realpathSync(dirname(output)), "placeholder"))) throw new Error("Starter must be outside the source workspace");
  if (existsSync(output)) throw new Error("Output already exists; refusing to overwrite");
  /** @type {Record<string, string>} */
  const sourceFiles = {};
  /** @type {Record<string, string>} */
  const exportedFiles = {};
  const entries = ["pnpm-lock.yaml", "pnpm-workspace.yaml", "tsconfig.base.json", "apps/prototype/package.json", "apps/prototype/tsconfig.json", "apps/prototype/vite.config.ts", "apps/prototype/index.html", "apps/prototype/src/styles.css", "apps/prototype/src/data-table-recipe.tsx", "apps/prototype/src/data-table-recipe.css"];
  entries.push(...filesIn(join(root, ".agents/skills/rain-designer")).map(path => relative(root, path)));
  entries.push("docs/ai/prototype-design.md", "docs/ai/information-design.md", "docs/ai/form-composition.md", "docs/ai/g4-components.md", "docs/ai/g6-components.md", "manifests/recipes/data-table.yaml",
    "evidence/runtime/design-knowledge/form-desktop.png", "evidence/runtime/design-knowledge/form-narrow.png",
    "evidence/runtime/bm-b-rn10/section-surfaces-2026-09-15.md", "evidence/runtime/bm-b-rn10/header-hint-2026-09-15.md");
  for (const name of ["tabs", "radio-group", "checkable-tag-group", "select", "input", "search-input", "button", "dropdown-menu", "icon-button", "form-item", "dialog", "alert-dialog", "textarea", "typography", "item", "progress", "aspect-ratio", "attachment", "direction", "drawer", "input-otp", "carousel", "bubble", "marker", "message", "message-scroller", "questionnaire"]) entries.push(`manifests/ui/${name}.yaml`);
  for (const name of ["foundations", "ui", "layouts"]) {
    entries.push(`packages/${name}/package.json`, `packages/${name}/tsconfig.json`);
    entries.push(...filesIn(join(root, `packages/${name}/src`)).map(path => relative(root, path)));
  }
  for (const name of milestone === "M2" ? ["bm-a", "bm-b", "bm-c", "bm-d"] : ["bm-a", "bm-b"]) entries.push(...filesIn(join(root, `apps/prototype/src/scenarios/${name}`)).filter(path => !path.includes(".test.")).map(path => relative(root, path)));
  if (milestone === "M2") entries.push("docs/ai/m2-trial-guide.md", "evidence/runtime/m2/color-consumers.json");
  // ponytail: full existing package sources preserve their export surface; prune only if snapshot size becomes a problem.
  for (const file of entries) {
    if (lstatSync(join(root, file)).isSymbolicLink()) throw new Error(`Symbolic link is not allowed: ${file}`);
    const bytes = readFileSync(join(root, file));
    sourceFiles[file] = sha(bytes);
    mkdirSync(dirname(join(output, file)), { recursive: true });
    // M1/M2 keep their existing scene entry points; navigation has a dedicated delivery package.
    const navigationCase = "当前导航E1–E6已在2026-10-05获得运行视觉、本地AI消费与实例隔离审阅确认，见[消费合同](navigation-v042-w6.md)及[决定范围](../../evidence/runtime/navigation-v042/g3-acceptance-review02/acceptance.json)。这是可参考的本地组合案例，候选仍未发布，完整质量门单列。";
    const guide = file === "docs/ai/prototype-design.md" ? bytes.toString("utf8") : null;
    if (guide?.includes("navigation-v042-w6.md") && guide.split(navigationCase).length !== 2) throw new Error("Starter navigation guidance differs from its single recorded paragraph");
    let exported = guide?.includes(navigationCase) ? Buffer.from(guide.replace(navigationCase,
      "导航工作包的消费指南与验收材料在专用导航交付包中；当前 M1/M2 Starter 仅开放对应业务场景，以下组合经验可作为参考。")) : bytes;
    if (file === "docs/ai/prototype-design.md") {
      const original = "使用 [G6 组件指南](./g6-components.md) 和 Registry/Manifest";
      if (exported.toString("utf8").split(original).length !== 2) throw new Error("Starter G6 guidance changed");
      exported = Buffer.from(exported.toString("utf8").replace(original, "使用本包附带的 [G6 组件指南](./g6-components.md) 和对应 Manifest，按 sourcePath、随包组件 README 与 package.json/pnpm-lock.yaml 核对当前可用能力"));
    }
    if (file === "docs/ai/g6-components.md") {
      let text = bytes.toString("utf8");
      for (const [original, portable] of [
  [
    "依赖与源码见 `registry/g6-assets.json`。",
    "源码与依赖按本包各 Manifest 的 sourcePath、随包组件 README、packages/ui/package.json、apps/prototype/package.json 及 pnpm-lock.yaml 核对。`registry/g6-assets.json` 是原工作区追溯材料，本 Starter 未附带。"
  ],
  [
    "Registry每项列出真实来源、Parts、依赖与可获取文件，Manifest不得省略；",
    "本 Starter 附带12个对应 Manifest、组件源码与 README；按 Manifest 的 sourcePath 定位实现，并按随包 package.json 和 pnpm-lock.yaml 核对依赖。Registry 独立消费及其下游来源闭包未随本包提供；"
  ],
  [
    "Message、Scroller和Questionnaire完整可运行组合见三组独立Playground页面和本轮独立消费夹具。",
    "Message、Scroller和Questionnaire的三组 Playground 页面、原独立消费夹具及 Manifest 中的 sourceEvidence/examples 是原工作区追溯材料，本 Starter 未附带，不能声称已读取或验证。随包组件 README 可供核对 API 与组合说明。"
  ],
  [
    "Default、局改和未改兄弟需要在实际任务中检查；来源、逐项差额与验证范围见本轮 `source-differences.md`、各组件README、`verification.md`。",
    "Default、局改和未改兄弟需要在实际任务中检查；各组件 README 已随包附带。`source-differences.md`、`verification.md` 及来源证据是原工作区追溯材料，本 Starter 未附带，不能将其视为本包已完成验证。"
  ],
  [
    "源码包消费的TypeScript采用Bundler模块解析、react-jsx、allowImportingTsExtensions及noEmit；本地未发布的Rain包通过tarball与精确override统一为单一Foundations实例，不能向npm请求私有0.0.0包。独立消费夹具记录安装及构建日志。",
    "本 Starter 使用 workspace 结构，安装、类型检查与构建按[本库接入说明](prototype-design.md)执行。原工作区的 tarball/精确 override 独立消费夹具及其安装构建日志未随本包附带，不能用该方式替换本包 workspace 锁，也不要向 npm 请求私有0.0.0包。"
  ]
]) {
        if (text.split(original).length !== 2) throw new Error("Starter G6 consumer reference changed");
        text = text.replace(original, portable);
      }
      exported = Buffer.from(text);
    }
    if (["docs/ai/information-design.md", "docs/ai/g4-components.md", "docs/ai/m2-trial-guide.md"].includes(file)) {
      let text = bytes.toString("utf8");
      // These optional case traces live in their own work packages; keep the methods readable here.
      const traces = file === "docs/ai/information-design.md" ? [
        "[Breadcrumb验证记录](../../evidence/runtime/breadcrumb/verification.md)",
        "[导航使用指南](navigation-v042.md#g1-人工视觉验收--2026-10-01)",
        "[Tree实施规则与审核记录](../plans/2026-09-25-tree-implementation-rules.md)",
        "[导航review-04与review-07及验收范围](navigation-v042.md#g1-人工视觉验收--2026-10-01)",
        "[独立消费合同](navigation-v042-w6.md)",
        "[当前人工决定](../../evidence/runtime/navigation-v042/g3-acceptance-review02/acceptance.json)",
        "[网络体验记录](../../evidence/runtime/chart-network-experience-2026-10-10/verification.md)",
        "[P3反馈记录](../../evidence/runtime/chart-business-expansion/p3/feedback-2026-10-09/verification.md)",
        "[确认台账](../../evidence/runtime/chart-experience-second-batch-2026-10-11/human-review.md)",
        "[逐图规则](chart-legend-rules.md)",
      ] : file === "docs/ai/g4-components.md" ? [
        "[视觉反馈记录](../../evidence/runtime/g4-visual-refinement-2026-10-11/verification.md)",
        "[字号与图标反馈记录](../../evidence/runtime/g4-review-sizing-2026-10-11/verification.md)",
        "[来源锁](../../evidence/runtime/g4-components-2026-10-11/source-lock.json)",
        "[本轮记录](../../evidence/runtime/g4-components-2026-10-11/verification.md)",
        "[页面验收记录](../../evidence/runtime/g4-pages-acceptance-2026-10-12/verification.md)",
      ] : [
        "[修订证据](../../evidence/runtime/generation-quality/bm-c-feedback/review.md)",
        "[本轮证据](../../evidence/runtime/generation-quality/bm-c-composition/review.md)",
        "[本轮记录](../../evidence/runtime/generation-quality/composition-refinement/review.md)",
        "[本轮证据](../../evidence/runtime/generation-quality/bm-c-primary-workflow/review.md)",
        "[本轮证据](../../evidence/runtime/generation-quality/bm-c-directory-detail/review.md)",
        "[本轮证据](../../evidence/runtime/generation-quality/bm-c-question-switch/review.md)",
      ];
      for (const link of traces) {
        if (text.split(link).length !== 2) throw new Error(`Starter optional case trace changed: ${link}`);
        text = text.replace(link, link.slice(1, link.indexOf("]")) + "（原工作区追溯材料；本 Starter 未附带）");
      }
      exported = Buffer.from(text);
    }
    writeFileSync(join(output, file), exported);
    exportedFiles[file] = sha(exported);
  }
  const manifest = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  manifest.name = "@rain-next/rn14-local-starter";
  manifest.scripts = { dev: "pnpm --filter @rain-next/prototype dev", build: "pnpm -r build", typecheck: "pnpm -r typecheck" };
  const entry = milestone === "M2" ? main
    .replace('import { TextbookFormScenario } from "./scenarios/bm-b/page";', 'import { TextbookFormScenario } from "./scenarios/bm-b/page";\nimport { GradingWorkbenchScenario } from "./scenarios/bm-c/page";\nimport { LearningReportScenario } from "./scenarios/bm-d/page";')
    .replace('  const form = route === "#bm-b";', '  if (route === "#bm-c") return <DensityProvider density="default"><GradingWorkbenchScenario /></DensityProvider>;\n  if (route === "#bm-d") return <DensityProvider density="default"><LearningReportScenario /></DensityProvider>;\n  const form = route === "#bm-b";')
    .replace('<Inline gap={16} align="center"><Button', '<Inline gap={16} align="center"><Button variant="secondary" onClick={() => { location.hash = "bm-c"; }}>作业批改</Button><Button variant="secondary" onClick={() => { location.hash = "bm-d"; }}>学习报告</Button><Button') : main;
  const instructions = "# Rain Next 本地原型\n\n生成、优化或评审原型界面时，使用 [Rain Designer](.agents/skills/rain-designer/SKILL.md)，并读取 [本库接入说明](docs/ai/prototype-design.md)。先理解当前任务和信息关系，再核对和复用合适能力；历史整页不作为默认模板，示例仅在明确要求参考/还原或核实具体用法时读取。设计方法在 Skill 中维护，品牌、组件 API、真实导出与实现边界按本库说明查找；已读内容可复用，不循环启动。记录依据、选择原因、实际检查与未验证项，局部参数不升级为全库规则，AI 自查不替代用户验收。\n\n默认 Prototype Mode：共享 packages 与锁文件保持只读，优先已有 Variant、页面 Local Recipe、Local Fork。业务状态由页面持有；不扩大旧视觉接受，不自动发布、迁移、写入 Figma 或执行 Git 操作。用户的新任务指令优先。\n";
  sourceFiles["scripts/rn14-starter.mjs"] = sha(readFileSync(join(root, "scripts/rn14-starter.mjs")));
  for (const [file, content] of Object.entries({ "package.json": json(manifest), "apps/prototype/src/main.tsx": entry, "AGENTS.md": instructions })) {
    sourceFiles[file] = sha(readFileSync(join(root, file)));
    writeFileSync(join(output, file), content);
    exportedFiles[file] = sha(content);
  }
  const lock = { schemaVersion: "1.0", snapshotId: `rn14-${sha(json(exportedFiles)).slice(0, 16)}`, inputCommit: execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim(), workingTree: "content-addressed-local-snapshot", assetIdentity: "local-experiment", publication: "not-authorized", sourceFiles, files: exportedFiles };
  writeFileSync(join(output, "source-lock.json"), json(lock));
  return lock;
}

export function verifyStarter(directory) {
  const output = realpathSync(directory), lock = JSON.parse(readFileSync(join(output, "source-lock.json"), "utf8"));
  const generated = new Set(["node_modules", "apps/prototype/node_modules", "apps/prototype/dist", ...["foundations", "ui", "layouts"].map(name => `packages/${name}/node_modules`)].map(file => join(output, file)));
  const actual = filesIn(output, generated).map(path => relative(output, path)).filter(file => file !== "source-lock.json").sort();
  if (JSON.stringify(actual) !== JSON.stringify(Object.keys(lock.files).sort())) throw new Error("Starter file inventory changed");
  for (const [file, expected] of Object.entries(lock.files)) {
    const path = resolve(output, file);
    if (!inside(output, path) || !inside(output, realpathSync(path)) || lstatSync(path).isSymbolicLink()) throw new Error(`Invalid path: ${file}`);
    if (sha(readFileSync(path)) !== expected) throw new Error(`Starter file changed: ${file}`);
  }
  if (lock.snapshotId !== `rn14-${sha(json(lock.files)).slice(0, 16)}`) throw new Error("Snapshot identity changed");
  return lock.snapshotId;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [command, destination] = process.argv.slice(2);
  if (!destination || !["--export", "--export-m2", "--check"].includes(command)) throw new Error("Usage: node scripts/rn14-starter.mjs --export|--export-m2|--check /absolute/new-directory");
  console.log(command === "--check" ? verifyStarter(destination) : exportStarter(destination, { milestone: command === "--export-m2" ? "M2" : "M1" }).snapshotId);
}
