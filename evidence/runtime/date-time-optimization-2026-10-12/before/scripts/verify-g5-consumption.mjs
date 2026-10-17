import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cpSync, existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { basename, dirname, extname, isAbsolute, join, relative, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Narrow Registry/source closure, following the existing navigation exporter.
// Installed third-party dependencies are copied as in verify-chart-variant-consumption.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const evidence = join(root, "evidence/runtime/g5-components-2026-10-12");
const host = join(evidence, "consumer"), marker = "rain-g5-isolated-consumer-v1\n";
const read = path => readFileSync(path, "utf8");
const json = path => JSON.parse(read(path));
const sha = content => createHash("sha256").update(content).digest("hex");
const put = (path, data) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, data); };
const inside = (base, path) => { const part = relative(base, path); return !part || !part.startsWith("..") && !isAbsolute(part); };
const entries = ["native-select", "combobox", "slider", "calendar", "date-picker"].map(name => `registry/g5-assets.json#${name}`)
  .concat("registry/textarea.json#textarea", "registry/core-ui.json#input", "registry/core-ui.json#form-item");
const publicModules = ["native-select/native-select", "combobox/combobox", "slider/slider", "calendar/calendar", "date-picker/date-picker", "textarea/textarea", "input/input", "input/form-item", "button/button"];

function specifiers(file, source) {
  const values = [...source.matchAll(/(?:\bfrom\s*|\bimport\s*\(\s*|\bimport\s*)["']([^"'\n]+)["']/g)].map(match => match[1]);
  values.push(...[...source.matchAll(/new URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url/g)].map(match => match[1]));
  if (file.endsWith(".css")) values.push(...[...source.matchAll(/@import\s+["']([^"']+)["']|url\(\s*["']?([^"'\s)]+)["']?\s*\)/g)].map(match => match[1] || match[2]));
  return [...new Set(values.filter(specifier => !/^(?:data:|https?:|#)/.test(specifier)))];
}
function packageEntry(specifier) {
  const [, name, ...parts] = specifier.split("/");
  const manifest = json(join(root, `packages/${name}/package.json`));
  const target = manifest.exports[parts.length ? `./${parts.join("/")}` : "."];
  assert.equal(typeof target, "string", `Unexported Rain import: ${specifier}`);
  return `packages/${name}/${target}`;
}
function localImport(origin, specifier) {
  const clean = specifier.split(/[?#]/)[0];
  const base = clean.startsWith(".") ? resolve(root, dirname(origin), clean) : clean.startsWith("@rain-next/") ? resolve(root, packageEntry(clean)) : null;
  if (!base) return null;
  assert(inside(root, base), `Import leaves source root: ${origin} -> ${specifier}`);
  const file = [base, ...[".ts", ".tsx", ".js", ".json", ".css", "/index.ts", "/index.tsx"].map(suffix => base + suffix)].find(path => existsSync(path) && lstatSync(path).isFile());
  assert(file, `Missing source: ${origin} -> ${specifier}`);
  return relative(root, file);
}
function collectSources() {
  const files = new Map(), registryItems = new Set(), edges = [], packages = new Set();
  const copy = file => {
    const path = resolve(root, file), relativePath = relative(root, path);
    assert(inside(root, path) && inside(root, realpathSync(path)) && !lstatSync(path).isSymbolicLink(), `Invalid source: ${file}`);
    if (files.has(relativePath)) return;
    files.set(relativePath, readFileSync(path));
    if (!/\.(?:[cm]?[jt]sx?|css)$/.test(file)) return;
    if (file.endsWith(".css") && existsSync(path + ".d.ts")) copy(relativePath + ".d.ts");
    for (const specifier of specifiers(file, files.get(relativePath).toString())) {
      const target = localImport(relativePath, specifier);
      if (target) { edges.push({ from: relativePath, specifier, to: target }); copy(target); }
      else packages.add(specifier.startsWith("@") ? specifier.split("/").slice(0, 2).join("/") : specifier.split("/")[0]);
    }
  };
  function visit(reference) {
    if (!reference.startsWith("registry/")) reference = `registry/icons.json#${reference}`;
    if (registryItems.has(reference)) return;
    registryItems.add(reference);
    const [file, name] = reference.split("#"), registry = json(join(root, file));
    copy(file);
    for (const dependency of Object.keys(registry.dependencies ?? {})) if (!dependency.startsWith("@rain-next/")) packages.add(dependency);
    const selected = name ? registry.items.filter(item => item.name === name) : registry.items;
    assert(selected.length, `Missing Registry item: ${reference}`);
    for (const entry of [registry.shared ?? {}, ...selected]) {
      for (const source of entry.files ?? []) copy(typeof source === "string" ? source : source.path);
      for (const source of [...(entry.componentDependencies ?? []), entry.manifest, entry.sourceLock, entry.license, registry.sourceLock].filter(Boolean)) copy(source);
      for (const style of entry.styleDependencies ?? []) copy(packageEntry(style));
      for (const dependency of [...(entry.registryDependencies ?? []), ...(entry.typeDependencies ?? [])]) visit(dependency);
    }
  }
  entries.forEach(visit);
  for (const module of publicModules) copy(`packages/ui/src/${module}.tsx`);
  for (const style of ["tokens", "typography", "motion", "focus", "tailwind-theme"]) copy(`packages/foundations/src/${style}.css`);
  const lock = "evidence/runtime/g5-components-2026-10-12/source-lock.json";
  copy(lock); for (const source of json(join(root, lock)).sources) copy(source.stored);
  copy("docs/plans/2026-10-12-token-first-g5.md");
  return { files, registryItems: [...registryItems], edges, packages };
}

const main = `import { useState } from "react";
import { createRoot } from "react-dom/client";
import { DensityProvider } from "@rain-next/foundations";
import { Button, Calendar, Combobox, DatePicker, FormItem, Input, NativeSelect, NativeSelectOption, Slider, Textarea } from "@rain-next/ui";
import "./styles.css";
function App() {
  const [date,setDate]=useState<Date | undefined>(new Date(2026,9,12));
  const [text,setText]=useState("填写课堂说明");
  return <DensityProvider density="default"><main>
    <header><h1>G5 · 独立源码消费</h1><p>本地候选组件；Label / Field 复用 FormItem，Input Group 复用 Input / Textarea。</p></header>
    <section><h2>Native Select</h2><FormItem label="课程" required help="浏览器原生选择和表单提交"><NativeSelect name="course" defaultValue="rain"><NativeSelectOption value="rain">雨课堂</NativeSelectOption><NativeSelectOption value="mooc">慕课</NativeSelectOption></NativeSelect></FormItem></section>
    <section><h2>Combobox</h2><FormItem label="课程名称" help="可搜索或输入自定义值"><Combobox allowCustomValue options={[{value:"rain",label:"雨课堂"},{value:"mooc",label:"慕课"}]} /></FormItem></section>
    <section><h2>Slider</h2><FormItem label="进度"><Slider defaultValue={36} /></FormItem><FormItem label="范围"><Slider range defaultValue={[20,80]} thumbLabels={["起点","终点"]} /></FormItem></section>
    <section><h2>Calendar</h2><Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026,9)} /></section>
    <section><h2>Date Picker</h2><FormItem label="单日"><DatePicker defaultValue={new Date(2026,9,12)} /></FormItem><FormItem label="单日和时间"><DatePicker showTime defaultValue={new Date(2026,9,12,9,5)} /></FormItem><FormItem label="日期范围"><DatePicker mode="range" defaultValue={{from:new Date(2026,9,12),to:new Date(2026,9,15)}} /></FormItem><FormItem label="日期时间范围"><DatePicker mode="range" showTime defaultValue={{from:new Date(2026,9,12,9,5),to:new Date(2026,9,15,18,30)}} /></FormItem></section>
    <section><h2>Label / Field / Input Group</h2><FormItem label="链接" required help="标签、帮助和验证仍由 FormItem 负责"><Input prefixText="https://" suffixText=".cn" placeholder="rain" /></FormItem><FormItem label="课堂说明"><Textarea value={text} onValueChange={setText} blockStart={<Button size="small" onClick={()=>setText(previous=>"课堂目标："+previous)}>添加标题</Button>} blockEnd={<Button size="small" onClick={()=>setText("")}>清空说明</Button>} /></FormItem><FormItem label="只读说明"><Textarea readOnly defaultValue="只读值" blockStart={<span>只读内容</span>} blockEndChangesValue={false} blockEnd={<Button size="small" onClick={()=>navigator.clipboard?.writeText("只读值")}>复制</Button>} /></FormItem></section>
  </main></DensityProvider>;
}
createRoot(document.getElementById("root")!).render(<App />);
`;
const styles = `@import "tailwindcss" source(none);
@import "@rain-next/foundations/tailwind-theme.css";
@import "@rain-next/foundations/tokens.css";
@import "@rain-next/foundations/typography.css";
@import "@rain-next/foundations/motion.css";
@import "@rain-next/foundations/focus.css";
@import "@rain-next/ui/styles.css";
@source "./";
@source "../packages/ui/src";
body { margin:0; background:var(--rain-category-background-neutral-3); color:var(--rain-category-text-neutral-1); font-family:var(--rain-font-ui); }
main { margin:auto; padding:24px; max-width:900px; }
header { margin-bottom:24px; } h1 { font-size:24px; } h2 { font-size:18px; margin:0 0 16px; }
section { margin-bottom:20px; padding:20px; background:var(--rain-category-background-neutral-1); border:1px solid var(--rain-category-border-neutral-3); border-radius:8px; }
section>.rain-form-item+* { margin-top:16px; }
`;

function cachedPackage(name, from) {
  for (let directory = from; ; directory = dirname(directory)) {
    const path = join(directory, "node_modules", name);
    if (existsSync(join(path, "package.json"))) return realpathSync(path);
    if (dirname(directory) === directory) return null;
  }
}

export function verifyG5Consumption() {
  const facts = { startedAt: new Date().toISOString(), command: "node scripts/verify-g5-consumption.mjs", mode: "isolated source closure with copied installed dependency cache; not a clean install", publication: "not-published", host, entries, commands: [] };
  let validationHost;
  mkdirSync(evidence, { recursive: true });
  try {
    const plan = collectSources();
    const assertClosure = files => { for (const edge of plan.edges) assert(files.has(edge.to), `Missing packaged dependency: ${edge.from} -> ${edge.to}`); };
    assertClosure(plan.files);
    const broken = new Map(plan.files); broken.delete("packages/ui/src/native-select/native-select.css");
    assert.throws(() => assertClosure(broken), /Missing packaged dependency/);
    facts.missingDependencySelfCheck = "passed";
    if (existsSync(host)) {
      assert.equal(read(join(host, ".g5-consumer-owned")), marker, "Refuse to replace an unrelated folder");
      rmSync(host, { recursive: true });
    }
    put(join(host, ".g5-consumer-owned"), marker);
    put(join(host, ".gitignore"), "node_modules/\n.dependency-cache/\ndist/\nmodule-paths.json\n");
    for (const [file, bytes] of plan.files) put(join(host, file), bytes);
    facts.registryItems = plan.registryItems;
    facts.sourceFiles = [...plan.files].map(([path, bytes]) => ({ path, sha256: sha(bytes) }));
    facts.localImportEdges = plan.edges;
    facts.uiSourceFiles = facts.sourceFiles.filter(file => file.path.startsWith("packages/ui/src/")).length;
    facts.fullUiSourceTreeCopied = false;
    const copied = new Map(), dependencyVersions = [];
    function link(name, target, directory = join(host, "node_modules")) {
      const path = join(directory, name); if (existsSync(path)) return;
      mkdirSync(dirname(path), { recursive: true }); symlinkSync(relative(dirname(path), target), path, "dir");
    }
    function copyDependency(name, from, optional = false) {
      const actual = cachedPackage(name, from);
      if (!actual && optional) return null;
      assert(actual, `Missing installed dependency: ${name} from ${from}`);
      if (copied.has(actual)) return copied.get(actual);
      const manifest = json(join(actual, "package.json"));
      const target = join(host, ".dependency-cache", `${manifest.name.replaceAll("/", "+")}-${manifest.version}-${sha(actual).slice(0, 8)}`);
      copied.set(actual, target);
      cpSync(actual, target, { recursive: true, dereference: true, filter: path => basename(path) !== "node_modules" });
      dependencyVersions.push({ name: manifest.name, version: manifest.version, cacheSource: actual, installedPath: relative(host, target) });
      for (const dependency of Object.keys({ ...manifest.peerDependencies, ...manifest.optionalDependencies, ...manifest.dependencies })) {
        const installed = copyDependency(dependency, actual, Object.hasOwn(manifest.optionalDependencies ?? {}, dependency) || manifest.peerDependenciesMeta?.[dependency]?.optional);
        if (installed) link(dependency, installed, join(target, "node_modules"));
      }
      return target;
    }
    const tools = ["vite", "typescript", "@tailwindcss/vite", "tailwindcss", "@types/react", "@types/react-dom"];
    const direct = [...new Set([...plan.packages, "react-dom", ...tools])], versions = {};
    for (const name of direct) {
      const from = ["packages/ui", "apps/prototype", "."].map(path => join(root, path)).find(path => cachedPackage(name, path));
      assert(from, `Cannot resolve dependency ${name}`);
      const target = copyDependency(name, from); link(name, target);
      const manifest = json(join(target, "package.json"));
      versions[name] = manifest.version;
      for (const [command, file] of Object.entries(typeof manifest.bin === "string" ? { [basename(name)]: manifest.bin } : manifest.bin ?? {})) {
        const bin = join(host, "node_modules/.bin", command); mkdirSync(dirname(bin), { recursive: true });
        if (!existsSync(bin)) symlinkSync(relative(dirname(bin), join(target, file)), bin, "file");
      }
    }
    for (const [name, version] of Object.entries({ "@base-ui/react": "1.8.0", "react-day-picker": "9.13.2", react: "19.2.8", "react-dom": "19.2.8" })) assert.equal(versions[name], version, `Wrong locked dependency ${name}`);
    facts.dependencies = dependencyVersions;
    facts.directDependencies = versions;
    for (const name of ["ui", "foundations"]) {
      const canonical = json(join(root, `packages/${name}/package.json`));
      const exports = Object.fromEntries(Object.entries(canonical.exports).filter(([key, path]) => key === "." || plan.files.has(`packages/${name}/${path.replace(/^\.\//, "")}`)));
      const dependencies = Object.fromEntries(Object.keys(canonical.dependencies ?? {}).filter(key => key !== "@rain-next/foundations" && versions[key]).map(key => [key, versions[key]]));
      if (name === "ui") dependencies["@rain-next/foundations"] = "0.0.0";
      put(join(host, `packages/${name}/package.json`), JSON.stringify({ name: canonical.name, version: "0.0.0", private: true, type: "module", exports, dependencies }, null, 2));
      link(canonical.name, join(host, `packages/${name}`));
    }
    const publicExports = [...read(join(root, "packages/ui/src/index.ts")).matchAll(/^export (?:type )?\{[^}]+\} from "\.\/([^"]+)";/gm)]
      .filter(match => publicModules.includes(match[1])).map(match => match[0]);
    assert(publicModules.every(module => publicExports.some(line => line.endsWith(`from "./${module}";`))), "Each consumer module needs an existing public export");
    put(join(host, "packages/ui/src/index.ts"), publicExports.join("\n") + "\n");
    const dependencies = Object.fromEntries(Object.entries(versions).filter(([name]) => !tools.includes(name)));
    const devDependencies = Object.fromEntries(tools.map(name => [name, versions[name]]));
    put(join(host, "package.json"), JSON.stringify({ name: "rain-g5-source-consumer", private: true, type: "module", workspaces: ["packages/*"], engines: { node: "^22.13.0 || >=24.0.0" }, scripts: { dev: "vite --host 127.0.0.1", typecheck: "tsc --project tsconfig.json", build: "node build-check.mjs", preview: "vite preview --host 127.0.0.1" }, dependencies: { ...dependencies, "@rain-next/ui": "file:./packages/ui", "@rain-next/foundations": "file:./packages/foundations" }, devDependencies }, null, 2));
    put(join(host, "index.html"), '<!doctype html><html lang="zh-CN"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Rain G5 源码消费</title></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>\n');
    put(join(host, "src/main.tsx"), main); put(join(host, "src/styles.css"), styles);
    put(join(host, "env.d.ts"), '/// <reference types="vite/client" />\n');
    put(join(host, "tsconfig.json"), JSON.stringify({ compilerOptions: { target: "ES2022", lib: ["ES2022", "DOM", "DOM.Iterable"], module: "ESNext", moduleResolution: "Bundler", jsx: "react-jsx", strict: true, skipLibCheck: true, noEmit: true, allowImportingTsExtensions: true }, include: ["src", "packages", "env.d.ts"] }, null, 2));
    put(join(host, "vite.config.mjs"), 'import tailwindcss from "@tailwindcss/vite";\nexport default { base:"./", plugins:[tailwindcss()], oxc:{jsx:{runtime:"automatic"}} };\n');
    put(join(host, "build-check.mjs"), `import { build } from "vite";\nimport assert from "node:assert/strict";\nimport { writeFileSync, realpathSync } from "node:fs";\nimport { isAbsolute } from "node:path";\nconst host=realpathSync(process.cwd());\nawait build({plugins:[{name:"isolated-g5-audit",generateBundle(){const modules=[...this.getModuleIds()].filter(id=>isAbsolute(id.split("?")[0]));for(const id of modules)assert(realpathSync(id.split("?")[0]).startsWith(host+"/"),"Module escaped host: "+id);writeFileSync("module-paths.json",JSON.stringify({moduleCount:modules.length,externalModulePaths:0,modules},null,2));}}]});\n`);
    put(join(host, "README.md"), `# Rain G5 独立源码包\n\n本地候选源码，未发布。包含 NativeSelect、Combobox、Slider、Calendar、DatePicker，以及复用的 FormItem / Input / Textarea / Button 和实际依赖闭包。Label / Field 不增加平行组件；Input Group 通过 Input 附加区与 Textarea 上下操作区组合。\n\n## 运行\n\n需要 Node.js 22.13+（或 24+）。解压后在本目录执行：\n\n\`\`\`sh\nnpm install\nnpm run typecheck\nnpm run build\nnpm run dev\n\`\`\`\n\n本次本机验证的依赖从已有缓存完整复制，未执行清洁联网安装。压缩包不含 node_modules、依赖缓存或构建结果；首次运行须安装依赖。直接依赖固定版本见 package.json，验证时的完整依赖版本见 dependency-versions.json。Base UI 1.8.0、DayPicker 9.13.2、React / React DOM 19.2.8。npm install 尚未在清洁联网环境验收，不将本机检查当作该结论。\n\n## 范围\n\nUI 根入口是本包专用的窄导出，其余组件文件与登记源码字节一致。保留登记要求的共享 styles.css 及其 CSS 引用闭包；不复制完整 UI TypeScript 树、不引用原工作区 @rain-next/ui。构建检查会拒绝越界模块。DatePicker 四种模式都在点击确定后提交，取消、Escape 或外部关闭丢弃草稿。时间复用 InputNumber 的小时 / 分钟编辑。\n\n源码索引与哈希见 source-files.json，来源锁定和 MIT 许可证在 evidence/runtime/g5-components-2026-10-12/。自动类型 / 构建通过不授予人眼视觉、读屏、触屏或发布验收。\n`);
    put(join(host, "source-files.json"), JSON.stringify(facts.sourceFiles, null, 2));
    put(join(host, "dependency-versions.json"), JSON.stringify(dependencyVersions.map(({ name, version }) => ({ name, version })), null, 2));
    let internalLinks = 0;
    function checkLinks(directory) { for (const entry of readdirSync(directory)) { const path = join(directory, entry), stat = lstatSync(path); if (stat.isSymbolicLink()) { assert(inside(host, realpathSync(path)), `External symlink: ${path}`); internalLinks++; } else if (stat.isDirectory()) checkLinks(path); } }
    checkLinks(host); facts.internalLinks = internalLinks; facts.externalLinks = 0;
    function run(label, executable, args, cwd = host) {
      const started = Date.now(), result = spawnSync(executable, args, { cwd, encoding: "utf8", env: { ...process.env, NODE_PATH: "" }, maxBuffer: 64 * 1024 * 1024 });
      put(join(evidence, `consumer-${label}.log`), `${result.stdout ?? ""}${result.stderr ?? ""}${result.error ?? ""}`);
      facts.commands.push({ label, executable, args, cwd, exitCode: result.status, elapsedMs: Date.now() - started });
      assert.equal(result.status, 0, `${label} failed; see consumer-${label}.log`); return result.stdout;
    }
    // A sibling temporary host cannot accidentally resolve missing tools from this workspace's ancestors.
    validationHost = realpathSync(mkdtempSync("/tmp/rain-g5-source-consumer-"));
    cpSync(host, validationHost, { recursive: true, dereference: false, verbatimSymlinks: true });
    facts.validationHost = validationHost;
    const externalRequire = createRequire(join(validationHost, "package.json"));
    for (const name of ["vitest", "@playwright/test"]) assert.throws(() => externalRequire.resolve(name), /Cannot find module/, `Unrelated workspace tool resolved: ${name}`);
    for (const name of ["vite", "@tailwindcss/vite", "typescript", "@rain-next/ui", "@rain-next/foundations"]) assert(inside(validationHost, realpathSync(externalRequire.resolve(name))), `Tool or Rain package escaped isolation: ${name}`);
    facts.toolResolutionAudit = { checkedPackages: ["vite", "@tailwindcss/vite", "typescript", "@rain-next/ui", "@rain-next/foundations"], unrelatedWorkspacePackagesUnavailable: true, workspaceOutsideValidationHost: true };
    const compiler = json(join(validationHost, "node_modules/typescript/package.json"));
    const typechecked = run("typecheck", process.execPath, [join(validationHost, "node_modules/typescript", compiler.bin.tsc), "--project", "tsconfig.json", "--listFiles"], validationHost);
    const typeFiles = typechecked.split(/\r?\n/).filter(file => isAbsolute(file) && existsSync(file));
    assert(typeFiles.length > 0); for (const file of typeFiles) assert(inside(validationHost, realpathSync(file)), `Typecheck escaped host: ${file}`);
    facts.typecheckAudit = { fileCount: typeFiles.length, externalFilePaths: 0 };
    run("build", process.execPath, [join(validationHost, "build-check.mjs")], validationHost);
    facts.moduleAudit = json(join(validationHost, "module-paths.json"));
    cpSync(join(validationHost, "dist"), join(host, "dist"), { recursive: true });
    facts.canonicalChanges = facts.sourceFiles.filter(({ path, sha256 }) => sha(readFileSync(join(root, path))) !== sha256).map(file => file.path);
    assert.deepEqual(facts.canonicalChanges, [], "Sources changed while checking; rerun against final snapshot");
    const zip = join(evidence, "g5-source-consumer.zip"); if (existsSync(zip)) rmSync(zip);
    run("zip", "/usr/bin/zip", ["-q", "-r", zip, ".", "-x", "node_modules/*", ".dependency-cache/*", "dist/*", "module-paths.json", ".g5-consumer-owned"]);
    run("zip-integrity", "/usr/bin/unzip", ["-t", zip]);
    const zipEntries = run("zip-inventory", "/usr/bin/unzip", ["-Z1", zip]).split(/\r?\n/).filter(Boolean);
    assert(zipEntries.every(path => !/^(?:node_modules|\.dependency-cache|dist)\//.test(path)), "Archive must exclude installed dependencies and build outputs");
    for (const file of facts.sourceFiles) assert(zipEntries.includes(file.path), `Archive omits source: ${file.path}`);
    facts.zipInventory = { entries: zipEntries.length, allCanonicalSourceFilesIncluded: true, installedDependenciesIncluded: false };
    facts.zip = { path: relative(root, zip), sha256: sha(readFileSync(zip)), bytes: lstatSync(zip).size, dependenciesIncluded: false };
    facts.status = "passed";
    facts.limits = ["Copied installed dependency cache; no clean online install validation.", "Typecheck/build and source closure only; browser/accessibility/human acceptance handled separately.", "Dedicated consumer barrel exports selected G5/reused components only; shared registered CSS is retained."];
    console.log(`G5 independent source consumption passed: ${facts.uiSourceFiles} UI files; ${facts.moduleAudit.moduleCount} bundled modules; ${facts.zip.path}`);
    return facts;
  } catch (error) { facts.status = "failed"; facts.error = String(error); throw error; }
  finally { if (validationHost) rmSync(validationHost, { recursive: true }); facts.validationHostRetained = false; facts.finishedAt = new Date().toISOString(); facts.verifierSha256 = sha(readFileSync(fileURLToPath(import.meta.url))); put(join(evidence, "consumer-validation.json"), JSON.stringify(facts, null, 2) + "\n"); }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) verifyG5Consumption();
