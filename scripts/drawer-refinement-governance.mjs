import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstatSync, readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { parseSync } from "vite";
import { carouselBindingBytes, carouselProjectedPredecessor, carouselSourceMode, readCarouselUpgradeSourceBindings } from "./carousel-upgrade-governance.mjs";

export const drawerRefinementEvidence = "evidence/runtime/drawer-refinement-2026-10-14/";
export const drawerRefinementScope = "drawer-container-and-task-examples-only";
const modulePath = "scripts/drawer-refinement-governance.mjs";
const sourceSeal = "7c7c80fdcfd474834543acdc034d8d8082a369f2146a6b5e7b49124039af9ddf";
const moduleHash = "349cd1a67d7ae82a777484feb1324feaf867732dfe74af09fe81591365c7e30a";
const baselineHash = "b3877e428237f8a8619b8be708f62acb1f1ef97fbcac41c7aa9d84b1046fcca2";
const oldG6BindingsPath = "evidence/runtime/g6-components-2026-10-14/source-bindings.json";
const oldG6BaselinePath = "evidence/runtime/g6-components-2026-10-14/baseline.json";
const oldG6BindingsHash = "cbeb6d69d2fa734a43a4012575c57a96ad54b561c8d5d55137604589e8c8e0cb";
const oldG6BaselineHash = "81ec04702dbf90420a46c3f0250be1a29133ea35e6657d935dc5603050d1b552";
const predecessorPrefix = drawerRefinementEvidence + "predecessor/";
const interactionPrefix = "apps/playground/src/docs/components/g6-interaction-pages";

export const drawerRefinementRequiredFiles = Object.freeze([
  "packages/ui/src/drawer/drawer.tsx", "packages/ui/src/drawer/drawer.css", "packages/ui/src/drawer/README.md",
  "manifests/ui/drawer.yaml", "apps/playground/src/docs/components/g6-task-drawer.tsx",
  "apps/playground/src/docs/components/g6-task-drawer.css", "apps/playground/src/docs/components/g6-task-drawer.test.tsx",
  "registry/g6-assets.json", "status/current-phase.yaml", "docs/plans/2026-10-14-drawer-refinement.md",
  modulePath, "scripts/drawer-refinement-governance.test.ts",
]);
export const drawerRefinementFiles = Object.freeze([...drawerRefinementRequiredFiles,
  "packages/ui/src/drawer/drawer.test.tsx", "packages/ui/src/drawer/drawer-body.test.tsx",
  interactionPrefix + ".tsx", interactionPrefix + ".css", interactionPrefix + ".test.tsx",
  "docs/ai/g6-components.md", "tests/e2e/drawer-refinement.config.ts", "tests/e2e/drawer-refinement.spec.ts",
  "scripts/drawer-refinement-integration.test.ts",
  "apps/playground/drawer-refinement-consumer.html", "apps/playground/src/drawer-refinement-consumer.tsx",
  "scripts/drawer-color-consumers.mjs", "scripts/drawer-color-consumers.test.ts",
  // These are byte-bound integration hooks, not permission to change another component family.
  "scripts/g6-governance.mjs", "scripts/g6-color-consumers.mjs", "scripts/verify-g6-components.mjs",
  "scripts/verification-helpers.mjs", "scripts/verify-boundaries.mjs", "scripts/verify-token-foundations.mjs",
]);
export const drawerRefinementAuthorization = Object.freeze({
  kind: "DrawerRefinementUserAuthorization", authorization: "authorized", authorizedAt: "2026-10-14",
  decisionSource: "explicit-user-visual-confirmation-and-continue-in-existing-drawer-upgrade",
  userStatement: "确定.\n继续下一步", scope: drawerRefinementScope, workMode: "system-mode", assetIdentity: "registry-candidate",
  plan: "docs/plans/2026-10-14-drawer-refinement.md", authorizedNewDependencies: [],
  previousHumanGateScope: "local-drawer-visual-proposals-and-state-examples-only",
  humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished",
  figmaWrite: "not-authorized", businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
});
export const sha256 = value => createHash("sha256").update(value).digest("hex");
function bytes(root, path) {
  assert(typeof path === "string" && !isAbsolute(path) && path.split("/").every(part => part && part !== "." && part !== ".."), "Drawer source path must stay inside its root");
  const parts = path.split("/");
  for (let index = 1; index <= parts.length; index++) {
    const info = lstatSync(join(root, ...parts.slice(0, index)));
    assert(!info.isSymbolicLink() && (index < parts.length ? info.isDirectory() : info.isFile()), "Drawer source must be a regular file: " + path);
  }
  return readFileSync(join(root, path));
}
const json = (root, path) => JSON.parse(bytes(root, path).toString());
function hashIfPresent(root, path) {
  try { return sha256(bytes(root, path)); }
  catch (error) { if (error.code === "ENOENT") return null; throw error; }
}
function exactKeys(value, keys, message) { assert.deepEqual(Object.keys(value).sort(), [...keys].sort(), message); }

export function drawerRefinementBindingSeal(record) {
  const clone = structuredClone(record);
  clone.sourceFiles[modulePath].after = "self";
  return sha256(JSON.stringify(clone));
}
export function validateDrawerRefinementPhase(status, previous, entry) {
  const { implementation, automatedVerification, independentReview, ...authorization } = entry;
  assert.deepEqual(authorization, { ...drawerRefinementAuthorization,
    evidence: drawerRefinementEvidence + "verification.md", sourceBindings: drawerRefinementEvidence + "source-bindings.json",
    colorConsumers: drawerRefinementEvidence + "color-consumers.json" }, "Drawer requires its exact finite authorization");
  assert(["in-progress", "completed"].includes(implementation));
  assert(["not-run", "failed", "passed-scoped"].includes(automatedVerification));
  assert(["not-run", "findings", "passed-scoped"].includes(independentReview));
  assert(implementation !== "completed" || automatedVerification === "passed-scoped" && independentReview === "passed-scoped", "Drawer cannot claim unchecked completion");
  const unchanged = structuredClone(status); delete unchanged.componentRefinements.drawerRefinement;
  assert.deepEqual(unchanged, previous, "Drawer must preserve every previous phase record and Gate");
}
export function validateDrawerRefinementRegistry(current, previous) {
  const old = previous.items.find(item => item.name === "drawer"), next = current.items.find(item => item.name === "drawer");
  assert(old && next && current.items.filter(item => item.name === "drawer").length === 1, "Drawer registry identity must stay unique");
  assert.deepEqual([...next.exportNames].sort(), [...old.exportNames, "DrawerBody"].sort(), "Drawer registry permits only the new Body export");
  const restored = structuredClone(current);
  restored.items = restored.items.map(item => item.name === "drawer" ? { ...item, exportNames: old.exportNames } : item);
  assert.deepEqual(restored, previous, "Drawer cannot change another G6 registry asset, dependency, file or Gate");
}
function statements(source) {
  const parsed = parseSync("g6-interaction-pages.tsx", source);
  assert.equal(parsed.errors.length, 0, "Drawer shared source must parse");
  return parsed.program.body;
}
const drawerDeclarations = new Set(["taskSeed", "TaskDraftDrawer", "DrawerPage", "DirectionalDrawers", "ModalityDrawers"]);
function isDrawerDeclaration(node) {
  if (node.type === "FunctionDeclaration") return node.id && drawerDeclarations.has(node.id.name);
  return node.type === "VariableDeclaration" && node.declarations.every(item => item.id.type === "Identifier" && drawerDeclarations.has(item.id.name));
}
function importSignature(node) {
  const module = node.source.value;
  if (module === "./g6-task-drawer") {
    assert(node.specifiers.length === 1 && node.specifiers[0].type === "ImportSpecifier"
      && ["TaskDraftDrawer", "G6TaskDrawer"].includes(node.specifiers[0].imported.name)
      && node.specifiers[0].local.name === node.specifiers[0].imported.name, "Drawer task import must use its one actual component");
    return null;
  }
  if (module === "@rain-next/ui/icons/close") {
    assert(node.specifiers.length === 1 && node.specifiers[0].type === "ImportSpecifier"
      && node.specifiers[0].imported.name === "CloseIcon" && node.specifiers[0].local.name === "CloseIcon"
      && node.importKind !== "type", "Drawer close icon import must use its exact source and name");
    return null;
  }
  const drawerImports = ["DropdownMenu", "DrawerBody", "DrawerFooter", "IconButton"];
  if (module === "@rain-next/ui") for (const item of node.specifiers.filter(item => item.type === "ImportSpecifier" && drawerImports.includes(item.imported.name)))
    assert.equal(item.local.name, item.imported.name, "Drawer-owned imports cannot alias another shared symbol");
  return JSON.stringify({ module, importKind: node.importKind, attributes: node.attributes,
    specifiers: node.specifiers.filter(item => module !== "@rain-next/ui" || item.type !== "ImportSpecifier" || !drawerImports.includes(item.imported.name))
      .map(item => [item.type, item.imported?.name ?? item.imported?.value, item.local.name, item.importKind]).sort() });
}
function elements(node, name) {
  const result = [];
  function visit(value) {
    if (!value || typeof value !== "object") return;
    if (value.type === "JSXElement" && value.openingElement.name.type === "JSXIdentifier" && value.openingElement.name.name === name) result.push(value);
    for (const child of Object.values(value)) if (child && typeof child === "object") {
      if (Array.isArray(child)) child.forEach(visit); else visit(child);
    }
  }
  visit(node); return result;
}
function jsxShape(value) {
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(jsxShape).filter(value => value !== null);
  if (value.type === "JSXText" && !value.value.trim()) return null;
  return Object.fromEntries(Object.entries(value).filter(([key]) => !["start", "end", "loc", "range", "raw"].includes(key))
    .map(([key, item]) => [key, key === "attributes" ? jsxShape(item).sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))) : jsxShape(item)]));
}
function expectedJsx(source) { return statements("const expected = " + source + ";")[0].declarations[0].init; }
function drawerCarouselWithoutCloseChrome(node, source) {
  const headers = elements(node, "DrawerHeader"), footers = elements(node, "DrawerFooter");
  assert.equal(headers.length, 1, "DrawerCarousel must retain exactly one Header");
  const header = headers[0], titles = elements(header, "DrawerTitle"), descriptions = elements(header, "DrawerDescription");
  assert(titles.length === 1 && descriptions.length === 1, "DrawerCarousel must retain its actual title and description");
  const title = source.slice(titles[0].start, titles[0].end), description = source.slice(descriptions[0].start, descriptions[0].end);
  const upgraded = header.openingElement.attributes.length > 0;
  const expectedHeader = upgraded
    ? '<DrawerHeader className="g6-drawer-example-header"><div className="g6-drawer-example-copy">' + title + description + '</div><DrawerClose render={<IconButton size="36/20" icon={<CloseIcon />} aria-label="关闭资料阅读" />} /></DrawerHeader>'
    : "<DrawerHeader>" + title + description + "</DrawerHeader>";
  assert.deepEqual(jsxShape(header), jsxShape(expectedJsx(expectedHeader)), "DrawerCarousel permits only the explicit top-right close Header");
  assert.equal(footers.length, upgraded ? 0 : 1, "DrawerCarousel close moves from its one Footer to Header");
  const edits = [{ start: header.start, end: header.end, replacement: "[DRAWER_HEADER]" }];
  if (!upgraded) {
    const footer = footers[0];
    assert.deepEqual(jsxShape(footer), jsxShape(expectedJsx('<DrawerFooter><DrawerClose render={<Button variant="secondary">返回课程</Button>} /></DrawerFooter>')),
      "DrawerCarousel may remove only its original close-only Footer");
    const leading = source.slice(node.start, footer.start).match(/\s*$/)[0].length;
    edits.push({ start: footer.start - leading, end: footer.end, replacement: "" });
  }
  let retained = source.slice(node.start, node.end);
  for (const edit of edits.sort((a, b) => b.start - a.start)) retained = retained.slice(0, edit.start - node.start) + edit.replacement + retained.slice(edit.end - node.start);
  return { retained, title, description };
}
export function validateDrawerInteractionSource(current, previous) {
  function parts(source) {
    const nodes = statements(source);
    return { imports: nodes.filter(node => node.type === "ImportDeclaration").map(importSignature).filter(Boolean).sort(),
      retained: nodes.filter(node => node.type !== "ImportDeclaration" && !isDrawerDeclaration(node))
        .map(node => node.type === "FunctionDeclaration" && node.id?.name === "DrawerCarousel" ? drawerCarouselWithoutCloseChrome(node, source) : source.slice(node.start, node.end)) };
  }
  const before = parts(previous), after = parts(current);
  assert.deepEqual(after.imports, before.imports, "Drawer cannot change unrelated shared imports");
  assert.deepEqual(after.retained, before.retained, "Drawer cannot change non-Drawer shared declarations");
}
export function validateDrawerInteractionCss(current, previous) {
  const owned = /^\.g6-(?:task-drawer|interaction-(?:drawer-body|fixed-footer|footer-actions|close-guard|preview-drawer|preserve))(?:[\s[:.#>]|$)/;
  function retained(source) {
    return source.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/([^{}]+)\{([^{}]*)\}/g, (block, selector) => {
      const selectors = selector.trim().split(",");
      return selectors.every(item => owned.test(item.trim()) && !/[+~]/.test(item)) ? " " : block;
    }).replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1").trim();
  }
  assert.equal(retained(current), retained(previous), "Drawer cannot change non-Drawer or mixed shared CSS rules");
}
const legacyDrawerTests = new Set([
  "cancels a task draft and reopens the saved value without submitting",
  "uses source close cancellation to keep a dirty task, then explicitly discards it",
]);
export function validateDrawerInteractionTests(current, previous) {
  function retained(source) {
    return statements(source).filter(node => {
      if (node.type !== "ExpressionStatement" || node.expression.type !== "CallExpression") return true;
      const call = node.expression, title = call.arguments[0];
      return !(call.callee.type === "Identifier" && ["it", "test"].includes(call.callee.name)
        && title?.type === "Literal" && legacyDrawerTests.has(title.value));
    }).map(node => source.slice(node.start, node.end));
  }
  assert.deepEqual(retained(current), retained(previous), "Drawer cannot remove or alter non-Drawer shared tests");
}
export function validateDrawerRefinementGuide(current, previous) {
  const changes = [
    ["| 可拖动课前任务抽屉 | `ui-drawer` / Drawer和全部Compound Parts | Base UI 1.8四方向/三模态/snap/nested；details.cancel保护草稿；独立滚动正文和Footer |",
      "| 可拖动课前任务抽屉 | `ui-drawer` / Drawer和全部Compound Parts，含DrawerBody | Base UI 1.8四方向/三模态/snap/nested；Body独立滚动，首尾对齐；同层编辑/预览及退出确认、模拟保存留在宿主 |"],
    ['import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Button, FormItem, InputOTP, InputOTPGroup, InputOTPSlot, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@rain-next/ui";',
      'import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose, Button, FormItem, InputOTP, InputOTPGroup, InputOTPSlot, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@rain-next/ui";'],
    [' {body}<DrawerFooter><DrawerClose render={<Button>取消</Button>} /></DrawerFooter></DrawerContent>',
      ' <DrawerBody>{body}</DrawerBody><DrawerFooter><DrawerClose render={<Button>取消</Button>} /></DrawerFooter></DrawerContent>'],
  ];
  let restored = current;
  for (const [before, after] of changes) {
    assert.equal(previous.split(before).length, 2, "Drawer guide predecessor must contain each exact owned fragment once");
    assert.equal(restored.split(after).length, 2, "Drawer guide must contain each exact permitted update once");
    restored = restored.replace(after, before);
  }
  assert.equal(restored, previous, "Drawer guide must preserve every other row, example and paragraph");
}
export function validateDrawerBindingSources(root, sourceFiles, expectedPredecessors) {
  const paths = Object.keys(sourceFiles);
  assert(paths.every(path => drawerRefinementFiles.includes(path)) && drawerRefinementRequiredFiles.every(path => paths.includes(path)), "Drawer binding paths must stay finite and include the required public assets");
  for (const [path, binding] of Object.entries(sourceFiles)) {
    exactKeys(binding, ["before", "beforeSnapshot", "after"], "Drawer bindings must preserve an exact predecessor");
    const before = expectedPredecessors[path] ?? null;
    assert.equal(binding.before, before, "Drawer predecessor must match original G6 or the verified Carousel successor: " + path);
    assert.equal(binding.beforeSnapshot, before ? predecessorPrefix + path : null, "Drawer predecessor path changed: " + path);
    if (before) assert.equal(sha256(bytes(root, binding.beforeSnapshot)), before, "Drawer before snapshot changed: " + path);
    assert(/^[a-f0-9]{64}$/.test(binding.after), "Drawer cannot bind an absent or unsealed source: " + path);
    assert.equal(hashIfPresent(root, path), binding.after, "Drawer current source changed: " + path);
  }
}
export function validateDrawerRetainedSources(root, expectedPredecessors, sourceFiles, carousel = null) {
  for (const [path, expected] of Object.entries(expectedPredecessors)) {
    if (Object.hasOwn(sourceFiles, path)) continue;
    const binding = carousel?.sourceFiles[path];
    if (binding) assert.equal(binding.mode, carouselSourceMode(path), "Drawer Carousel ownership mode changed: " + path);
    if (binding && binding.mode !== "whole-file") {
      assert.equal(hashIfPresent(root, binding.beforeSnapshot), binding.before, "Drawer Carousel before snapshot changed: " + path);
      assert.equal(sha256(carouselBindingBytes(root, path, binding.beforeSnapshot)), expected, "Carousel source outside Drawer scope changed: " + path);
      assert.equal(sha256(carouselProjectedPredecessor(root, path, binding)), binding.before,
        "Unbound Carousel shared siblings changed; concurrent work remains unaccepted: " + path);
    } else assert.equal(hashIfPresent(root, path), expected, "Source outside Drawer scope changed; concurrent work remains unaccepted: " + path);
  }
}
export function validateDrawerCarouselPredecessorView(view, carousel) {
  for (const [path, binding] of Object.entries(carousel.sourceFiles)) {
    assert.equal(binding.mode, carouselSourceMode(path), "Drawer Carousel predecessor mode changed: " + path);
    assert.equal(sha256(bytes(view, path)), binding.after, "Drawer Carousel predecessor must contain canonical binding bytes: " + path);
  }
}
export function readDrawerInheritedG6Observations(root, oldBindings, oldBaseline) {
  const prefix = "evidence/runtime/g6-components-2026-10-14/", expected = {};
  function readObservation(path, hash) {
    const source = bytes(root, path);
    assert.equal(sha256(source), hash, "Drawer inherited G6 observation record changed: " + path);
    return JSON.parse(source.toString());
  }
  function observedSource(path, observed, before, snapshot) {
    exactKeys(observed, ["before", "after", "beforeSnapshot"], "Drawer inherited observation source must remain finite");
    assert.equal(observed.before, before, "Drawer inherited observation must retain its original baseline source: " + path);
    assert.equal(observed.beforeSnapshot, snapshot, "Drawer inherited observation snapshot path changed: " + path);
    assert.equal(sha256(bytes(root, snapshot)), before, "Drawer inherited observation before snapshot changed: " + path);
    assert(/^[a-f0-9]{64}$/.test(observed.after), "Drawer inherited observation requires an exact after hash");
    assert(!Object.hasOwn(oldBindings.sourceFiles, path) && !drawerRefinementFiles.includes(path), "Inherited observation cannot become editable Drawer or G6 scope");
    expected[path] = observed.after;
  }
  const sourceObservation = readObservation(prefix + "concurrent-source-observation.json", "569c0f267fa6157c9046ac09c24e0d5d3acf8dfa2ead3a5014fe085960ecd881");
  exactKeys(sourceObservation, ["kind", "observedAt", "scope", "mode", "origin", "sourceFiles"], "Drawer inherited source observation must stay finite");
  assert.equal(sourceObservation.kind, "G6ReadOnlyConcurrentSourceObservation");
  assert.equal(sourceObservation.observedAt, "2026-10-14");
  assert.equal(sourceObservation.scope, "two-rn14-starter-files-parallel-rain-designer-consumption");
  assert.equal(sourceObservation.mode, "read-only-observation-not-g6-edit-authorization");
  exactKeys(sourceObservation.sourceFiles, ["scripts/rn14-starter.mjs", "scripts/rn14-starter.test.ts"], "Drawer inherits only the two original RN14 observation paths");
  for (const [path, observed] of Object.entries(sourceObservation.sourceFiles))
    observedSource(path, observed, oldBaseline.protectedSources[path], prefix + "concurrent/before/" + path);
  const documentObservation = readObservation(prefix + "concurrent-document-observation.json", "7a5e3c867011452b4c8265b8cc1deeb45b7205849c57be89a3a33d1f3e772d04");
  exactKeys(documentObservation, ["kind", "observedAt", "scope", "mode", "previousObservation", "origin", "sourceFiles"], "Drawer inherited document observation must stay finite");
  assert.equal(documentObservation.kind, "G6ReadOnlyConcurrentDocumentObservation");
  assert.equal(documentObservation.observedAt, "2026-10-14");
  assert.equal(documentObservation.scope, "one-parallel-rain-designer-integration-document");
  assert.equal(documentObservation.mode, "read-only-observation-not-g6-edit-authorization");
  assert.equal(documentObservation.origin.humanAcceptanceInherited, false);
  assert.equal(documentObservation.origin.publicationAuthorized, false);
  const priorPath = "evidence/runtime/library-governance-closeout-2026-10-13/concurrent-document-observation-02.json";
  assert.deepEqual(documentObservation.previousObservation, { path: priorPath, sha256: oldBaseline.retainedEvidence[priorPath] }, "Drawer inherited document observation must retain its sealed predecessor");
  const prior = readObservation(priorPath, documentObservation.previousObservation.sha256);
  const documentPath = "docs/ai/rain-designer-integration.md";
  exactKeys(documentObservation.sourceFiles, [documentPath], "Drawer inherits only the original Rain Designer document observation");
  exactKeys(prior.sourceFiles, [documentPath], "Drawer inherited document predecessor must retain its exact path");
  assert(!Object.hasOwn(oldBaseline.protectedSources, documentPath), "Inherited document observation cannot become G6 editable or protected scope");
  observedSource(documentPath, documentObservation.sourceFiles[documentPath], prior.sourceFiles[documentPath].after, prefix + "concurrent-document/before/" + documentPath);
  return expected;
}
function readVerifiedPredecessor(root, declaration, parsePhase, oldBindings, oldBaseline) {
  exactKeys(declaration, ["kind", "root", "sourceBindings", "sha256"], "Drawer predecessor declaration must stay finite");
  assert.equal(declaration.root, predecessorPrefix.slice(0, -1), "Drawer predecessor view must use its independent snapshot");
  const view = join(root, declaration.root), phaseSource = bytes(view, "status/current-phase.yaml");
  const phase = parsePhase(phaseSource.toString());
  const expected = { ...oldBaseline.protectedSources, ...Object.fromEntries(Object.entries(oldBindings.sourceFiles).map(([path, binding]) => [path, binding.after])),
    ...readDrawerInheritedG6Observations(root, oldBindings, oldBaseline) };
  let carousel = null;
  if (declaration.kind === "carousel") {
    assert.equal(declaration.sourceBindings, "evidence/runtime/carousel-upgrade-2026-10-14/source-bindings.json");
    assert.equal(sha256(bytes(view, declaration.sourceBindings)), declaration.sha256, "Drawer Carousel predecessor record changed");
    // The actual Carousel verifier must accept this frozen view; a draft descriptor or callback cannot substitute for it.
    carousel = readCarouselUpgradeSourceBindings(view, phase, parsePhase);
    assert(carousel, "Drawer requires a sealed Carousel predecessor, not an observed draft");
    validateDrawerCarouselPredecessorView(view, carousel);
    assert.equal(sha256(bytes(root, declaration.sourceBindings)), declaration.sha256, "Drawer cannot rewrite its Carousel predecessor proof");
    for (const [path, binding] of Object.entries(carousel.sourceFiles)) {
      if (binding.before) assert.equal(sha256(bytes(root, binding.beforeSnapshot)), binding.before, "Drawer cannot rewrite a Carousel before snapshot: " + path);
      expected[path] = binding.after;
    }
    for (const [path, hash] of Object.entries(carousel.evidenceFiles)) assert.equal(sha256(bytes(root, path)), hash, "Drawer cannot change Carousel evidence: " + path);
  } else {
    assert.equal(declaration.kind, "g6", "Drawer accepts only original G6 or a separately sealed Carousel predecessor");
    assert.equal(declaration.sourceBindings, oldG6BindingsPath);
    assert.equal(declaration.sha256, oldG6BindingsHash);
    assert(!phase?.componentRefinements?.carouselUpgrade, "Drawer cannot accept an unverified Carousel phase as original G6");
  }
  assert.equal(sha256(phaseSource), expected["status/current-phase.yaml"], "Drawer predecessor phase must match its verified source record");
  assert(!phase?.componentRefinements?.drawerRefinement, "Drawer predecessor cannot contain itself");
  return { expected, phase, carousel, view };
}

export function readDrawerRefinementSourceBindings(root, status, parsePhase) {
  const actualPhase = parsePhase(bytes(root, "status/current-phase.yaml").toString());
  if (status !== undefined && status !== null) assert.deepEqual(status, actualPhase, "Drawer supplied phase must match the bound disk record");
  if (!actualPhase?.componentRefinements?.drawerRefinement) return null;
  assert([sourceSeal, moduleHash, baselineHash].every(value => /^[a-f0-9]{64}$/.test(value)), "Drawer refinement is not sealed; draft and concurrent predecessors are not passing evidence");
  const entry = actualPhase.componentRefinements.drawerRefinement;
  assert.equal(entry.sourceBindings, drawerRefinementEvidence + "source-bindings.json");
  assert.equal(sha256(bytes(root, oldG6BindingsPath)), oldG6BindingsHash, "Drawer cannot rewrite original G6 bindings");
  assert.equal(sha256(bytes(root, oldG6BaselinePath)), oldG6BaselineHash, "Drawer cannot rewrite original G6 baseline");
  const baselinePath = drawerRefinementEvidence + "baseline.json";
  assert.equal(sha256(bytes(root, baselinePath)), baselineHash, "Drawer observed baseline changed");
  const baseline = json(root, baselinePath), bindings = json(root, entry.sourceBindings);
  exactKeys(bindings, ["kind", "scope", "authorization", "baseline", "predecessor", "sourceFiles", "evidenceFiles"], "Drawer binding record must stay finite");
  assert.equal(bindings.kind, "DrawerRefinementSourceBindings"); assert.equal(bindings.scope, drawerRefinementScope);
  assert.deepEqual(bindings.authorization, drawerRefinementAuthorization);
  assert.deepEqual(bindings.baseline, { path: baselinePath, sha256: baselineHash });
  assert.equal(drawerRefinementBindingSeal(bindings), sourceSeal, "Drawer source binding seal changed");
  const normalized = bytes(root, modulePath).toString().replace(/const moduleHash = "[^"]*";/, 'const moduleHash = "' + "0".repeat(64) + '";');
  assert.equal(sha256(normalized), moduleHash, "Drawer verifier source changed");
  const oldBindings = json(root, oldG6BindingsPath), oldBaseline = json(root, oldG6BaselinePath);
  for (const [path, hash] of Object.entries({ ...oldBaseline.retainedEvidence, ...baseline.retainedG6Evidence }))
    assert.equal(sha256(bytes(root, path)), hash, "Drawer cannot change original G6 or older evidence: " + path);
  for (const [path, observed] of Object.entries(baseline.sourceFiles)) {
    assert.equal(observed.snapshot, drawerRefinementEvidence + "before/" + path, "Drawer observation snapshot path changed");
    assert.equal(sha256(bytes(root, observed.snapshot)), observed.before, "Drawer observed before snapshot changed: " + path);
  }
  const predecessor = readVerifiedPredecessor(root, bindings.predecessor, parsePhase, oldBindings, oldBaseline);
  validateDrawerRefinementPhase(actualPhase, predecessor.phase, entry);
  validateDrawerBindingSources(root, bindings.sourceFiles, predecessor.expected);
  exactKeys(bindings.evidenceFiles, [drawerRefinementEvidence + "authorization.json", drawerRefinementEvidence + "color-consumers.json"], "Drawer evidence inventory must stay finite");
  for (const [path, hash] of Object.entries(bindings.evidenceFiles)) assert.equal(sha256(bytes(root, path)), hash, "Drawer current evidence changed: " + path);
  const recorded = json(root, drawerRefinementEvidence + "authorization.json");
  assert.equal(recorded.userStatement, drawerRefinementAuthorization.userStatement);
  assert.equal(recorded.scope, drawerRefinementScope); assert.deepEqual(recorded.newDependencies, []);
  assert.equal(recorded.runtimeHumanGate, "awaiting_human"); assert.equal(recorded.contrastAcceptance, "not-granted"); assert.equal(recorded.publication, "unpublished");
  const before = path => bytes(predecessor.view, path).toString(), current = path => bytes(root, path).toString();
  validateDrawerRefinementRegistry(JSON.parse(current("registry/g6-assets.json")), JSON.parse(before("registry/g6-assets.json")));
  for (const [suffix, verify] of [[".tsx", validateDrawerInteractionSource], [".css", validateDrawerInteractionCss], [".test.tsx", validateDrawerInteractionTests]])
    if (bindings.sourceFiles[interactionPrefix + suffix]) verify(current(interactionPrefix + suffix), before(interactionPrefix + suffix));
  if (bindings.sourceFiles["docs/ai/g6-components.md"]) validateDrawerRefinementGuide(current("docs/ai/g6-components.md"), before("docs/ai/g6-components.md"));
  const manifest = parsePhase(current("manifests/ui/drawer.yaml")), oldManifest = parsePhase(before("manifests/ui/drawer.yaml"));
  for (const key of ["id", "assetIdentity", "maturity", "publication", "humanGate", "contrastAcceptance", "dependencies", "sourcePath", "styleSourcePath"])
    assert.deepEqual(manifest[key], oldManifest[key], "Drawer manifest cannot change identity, dependencies or Gates: " + key);
  assert(manifest.parts.includes("body") && manifest.slots.includes("DrawerBody"), "Drawer manifest must describe its actual Body part");
  for (const reference of oldManifest.sourceEvidence) assert(manifest.sourceEvidence.includes(reference), "Drawer cannot remove its original source evidence");
  validateDrawerRetainedSources(root, predecessor.expected, bindings.sourceFiles, predecessor.carousel);
  return { ...bindings, phase: entry, predecessorPhase: predecessor.phase, carouselUpgrade: predecessor.carousel, predecessorRoot: predecessor.view };
}
