import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";

// This run's isolated Registry consumer, adapted from the existing G5 source-consumer workflow.
const root = process.cwd(), evidence = join(root, "evidence/runtime/questionnaire-reuse-2026-10-16");
const host = mkdtempSync("/tmp/rain-questionnaire-reuse-");
const files = new Map(), visited = new Set(), edges = [], packages = new Set();
const json = path => JSON.parse(readFileSync(path, "utf8"));
function installed(name) {
  const path = [".", "packages/ui", "apps/playground"].map(base => join(root, base, "node_modules", name, "package.json")).find(existsSync);
  assert(path, `Missing installed package ${name}`);
  return json(path);
}
const put = (path, value) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, value); };
function packageEntry(specifier) {
  const [, name, ...parts] = specifier.split("/");
  const manifest = json(join(root, `packages/${name}/package.json`));
  return `packages/${name}/${manifest.exports[parts.length ? `./${parts.join("/")}` : "."].replace(/^\.\//, "")}`;
}
function copy(file) {
  if (files.has(file)) return;
  const source = readFileSync(join(root, file)); files.set(file, source); put(join(host, file), source);
  if (!/\.(?:[jt]sx?|css)$/.test(file)) return;
  if (file.endsWith(".css") && existsSync(join(root, file + ".d.ts"))) copy(file + ".d.ts");
  const specifiers = [...source.toString().matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)["']([^"'\n]+)["']|new URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url|@import\s+["']([^"']+)["']/g)].map(m => m[1] || m[2] || m[3]);
  for (const specifier of new Set(specifiers)) {
    const base = specifier.startsWith(".") ? resolve(root, dirname(file), specifier) : specifier.startsWith("@rain-next/") ? join(root, packageEntry(specifier)) : null;
    if (!base) { packages.add(specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0]); continue; }
    const target = [base, ...[".ts", ".tsx", "/index.ts"].map(suffix => base + suffix)].find(path => existsSync(path));
    assert(target && !relative(root, target).startsWith(".."), `Unresolved local import: ${file} → ${specifier}`);
    const to = relative(root, target); edges.push({ from: file, specifier, to }); copy(to);
  }
}
function visit(reference) {
  if (!reference.startsWith("registry/")) reference = `registry/icons.json#${reference}`;
  if (visited.has(reference)) return; visited.add(reference);
  const [file, name] = reference.split("#"), registry = json(join(root, file)); copy(file);
  const items = name ? registry.items.filter(item => item.name === name) : registry.items;
  assert(items.length, `Missing Registry reference ${reference}`);
  for (const entry of [registry.shared ?? {}, ...items]) {
    for (const item of entry.files ?? []) copy(typeof item === "string" ? item : item.path);
    for (const path of [...(entry.componentDependencies ?? []), entry.manifest, entry.sourceLock, entry.license].filter(Boolean)) copy(path);
    for (const path of entry.styleDependencies ?? []) copy(packageEntry(path));
    for (const dependency of [...(entry.registryDependencies ?? []), ...(entry.typeDependencies ?? [])]) visit(dependency);
  }
}
for (const entry of ["registry/g6-assets.json#questionnaire", "registry/selection-cards.json#radio-card", "registry/selection-cards.json#checkbox-card", "registry/dropdown-family.json#dropdown-menu", "registry/core-ui.json#input"]) visit(entry);
for (const style of ["tokens", "typography", "motion", "focus", "tailwind-theme"]) copy(`packages/foundations/src/${style}.css`);
const modules = ["questionnaire/questionnaire", "selection-card/selection-card", "radio/radio", "checkbox/checkbox", "dropdown-menu/dropdown-menu", "button/button", "input/input", "input/form-item", "recipes/local-recipe"];
const source = readFileSync(join(root, "packages/ui/src/index.ts"), "utf8");
const exports = [...source.matchAll(/^export (?:type )?\{[^}]+\} from "\.\/([^"]+)";|^export \* from "\.\/([^"]+)";/gm)].filter(m => modules.includes(m[1] || m[2])).map(m => m[0]);
put(join(host, "packages/ui/src/index.ts"), exports.join("\n") + "\n");
const canonical = json(join(root, "packages/ui/package.json"));
const runtime = Object.fromEntries([...packages].filter(name => !name.startsWith("@rain-next/")).map(name => [name, canonical.dependencies[name] || installed(name).version]));
for (const name of ["ui", "foundations"]) {
  const original = json(join(root, `packages/${name}/package.json`));
  const exports = Object.fromEntries(Object.entries(original.exports).filter(([key, target]) => key === "." || files.has(`packages/${name}/${target.replace(/^\.\//, "")}`)));
  put(join(host, `packages/${name}/package.json`), JSON.stringify({ name: original.name, version: "0.0.0", type: "module", private: true, exports, dependencies: name === "ui" ? { ...runtime, "@rain-next/foundations": "file:../foundations" } : { react: "19.2.8" } }, null, 2));
}
const devNames = ["vite", "typescript", "@tailwindcss/vite", "tailwindcss", "@types/react", "@types/react-dom"];
const devDependencies = Object.fromEntries(devNames.map(name => [name, installed(name).version]));
put(join(host, "package.json"), JSON.stringify({ name: "questionnaire-reuse-isolated-consumer", private: true, type: "module", scripts: { typecheck: "tsc --noEmit", build: "vite build" }, dependencies: { "@rain-next/ui": "file:./packages/ui", "@rain-next/foundations": "file:./packages/foundations", react: "19.2.8", "react-dom": "19.2.8" }, devDependencies, pnpm: { overrides: { "@rain-next/foundations": "file:./packages/foundations" } } }, null, 2));
put(join(host, "tsconfig.json"), JSON.stringify({ compilerOptions: { target: "ES2022", module: "ESNext", moduleResolution: "Bundler", jsx: "react-jsx", strict: true, skipLibCheck: true, allowImportingTsExtensions: true, lib: ["ES2022", "DOM", "DOM.Iterable"], types: ["vite/client"], noEmit: true }, include: ["src"] }, null, 2));
put(join(host, "vite.config.ts"), 'import { defineConfig } from "vite"; import tailwind from "@tailwindcss/vite"; export default defineConfig({plugins:[tailwind()]});\n');
put(join(host, "index.html"), '<!doctype html><html lang="zh-CN"><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Questionnaire 独立消费</title><div id="root"></div><script type="module" src="/src/main.tsx"></script></html>');
put(join(host, "src/styles.css"), '@import "tailwindcss" source(none);\n@import "@rain-next/foundations/tailwind-theme.css";\n@import "@rain-next/foundations/tokens.css";\n@import "@rain-next/foundations/typography.css";\n@import "@rain-next/foundations/focus.css";\n@import "@rain-next/foundations/motion.css";\n@import "@rain-next/ui/styles.css";\n@source "../packages/ui/src";\n@source "./";\n');
put(join(host, "src/main.tsx"), `import { createRoot } from "react-dom/client";
import { createRef } from "react";
import { Questionnaire, QuestionnaireItem, QuestionnaireTitle, QuestionnaireChoices, QuestionnaireChoice, QuestionnaireInput, QuestionnaireSubmit, Radio, Checkbox, RadioCard, CheckboxCard, DropdownMenu, Input, FormItem, type QuestionnaireRecipe } from "@rain-next/ui";
import "./styles.css";
const recipe: QuestionnaireRecipe = {id:"consumer-field",origin:"ui-questionnaire",scope:"feature",classes:{"input-wrapper":"w-full"},modifiedParts:["input-wrapper"],candidateTokens:[],promotionStatus:"not-proposed"};
const labelRef=createRef<HTMLLabelElement>(), inputRef=createRef<HTMLInputElement>();
type PublicExports=typeof import("@rain-next/ui");
// @ts-expect-error Internal presentation must remain absent from the public barrel.
type PrivateSurface=PublicExports["SelectionControlSurface"];
createRoot(document.getElementById("root")!).render(<main style={{padding:24,display:"grid",gap:16,maxWidth:640}}><h1>Questionnaire 独立消费</h1>
<Questionnaire aria-label="独立反馈" items={[{name:"goal",choices:[{value:"review"}]}]} localRecipe={recipe} onSubmit={e=>e.preventDefault()}>
<QuestionnaireItem name="goal"><QuestionnaireTitle>学习目标</QuestionnaireTitle><QuestionnaireChoices><QuestionnaireChoice ref={labelRef} value="review">复习</QuestionnaireChoice><QuestionnaireInput ref={inputRef} aria-label="其他目标" size={20} maxLength={120} /></QuestionnaireChoices></QuestionnaireItem><QuestionnaireSubmit />
</Questionnaire><Radio name="original" value="one" label="普通单选" checked={false} onCheckedChange={()=>{}}/><Checkbox label="普通多选"/><RadioCard name="card" value="one" label="单选卡片" checked={false} onCheckedChange={()=>{}}/><CheckboxCard label="多选卡片"/>
<FormItem label="原有输入"><Input defaultValue="课堂" clearable maxLength={8} /></FormItem>
<DropdownMenu.Root><DropdownMenu.Trigger>显示方式</DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.CheckboxItem label="显示说明" defaultChecked /></DropdownMenu.Content></DropdownMenu.Root>
</main>);\n`);
const commands = [ ["install", ["install", "--offline", "--ignore-scripts", "--package-import-method=copy"]], ["typecheck", ["typecheck"]], ["build", ["build"]] ];
const results = [];
for (const [name, args] of commands) {
  const result = spawnSync("pnpm", args, { cwd: host, encoding: "utf8", timeout: 180000 });
  put(join(evidence, `consumer-${name}.log`), (result.stdout ?? "") + (result.stderr ?? ""));
  results.push({ name, exitCode: result.status });
  if (result.status !== 0) break;
}
const saved = join(evidence, "consumer");
cpSync(host, saved, { recursive: true, filter: path => !path.includes("node_modules") && !path.includes("/dist") });
const facts = { validationHost: host, source: "Exact Registry entries and their imports; selected public barrel only", wholeUiSourceCopied: false, registryEntries: [...visited], files: [...files].map(([path, bytes]) => ({ path, sha256: createHash("sha256").update(bytes).digest("hex") })), edges, results, limits: ["Offline installation of the same installed dependency versions; no new dependency/version or publication", "Source closure/typecheck/build only; browser and human acceptance recorded separately"] };
put(join(evidence, "consumer-validation.json"), JSON.stringify(facts, null, 2) + "\n");
console.log(JSON.stringify({ host, files: files.size, registryEntries: visited.size, results }));
assert(results.length === 3 && results.every(row => row.exitCode === 0), "See consumer-*.log for isolated validation failure");
