import { mkdtempSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { carouselBindingBytes, carouselGuideOwnedSource, carouselPhaseOwnedSource, carouselRegistryOwnedSource, carouselOwnedSource, carouselSourceMode } from "./carousel-upgrade-governance.mjs";

const modules = import.meta.glob("./drawer-refinement-governance.mjs", { eager: true }) as Record<string, any>;
function governance() {
  const module = modules["./drawer-refinement-governance.mjs"];
  expect(module?.readDrawerRefinementSourceBindings).toBeTypeOf("function");
  return module;
}
const roots: string[] = [];
afterEach(() => { for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true }); });
function tempRoot() { const root = mkdtempSync(join(tmpdir(), "rain-drawer-governance-")); roots.push(root); return root; }
function put(root: string, file: string, value: string) { mkdirSync(dirname(join(root, file)), { recursive: true }); writeFileSync(join(root, file), value); }
function phaseEntry(module: any) {
  return { ...module.drawerRefinementAuthorization, evidence: module.drawerRefinementEvidence + "verification.md",
    sourceBindings: module.drawerRefinementEvidence + "source-bindings.json", colorConsumers: module.drawerRefinementEvidence + "color-consumers.json",
    implementation: "in-progress", automatedVerification: "not-run", independentReview: "not-run" };
}
const previous = { componentRefinements: { g6Components: { humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished" }, sliderCloseout: { humanGate: "accepted" } } };

describe("finite Drawer refinement successor", () => {
  it("keeps the original G6 gates and a separately verified Carousel phase unchanged", () => {
    const module = governance(), entry = phaseEntry(module);
    for (const before of [previous, { componentRefinements: { ...previous.componentRefinements, carouselUpgrade: { implementation: "completed", sourceBindings: "carousel-sealed-record" } } }]) {
      const current = { componentRefinements: { ...before.componentRefinements, drawerRefinement: entry } };
      expect(() => module.validateDrawerRefinementPhase(current, before, entry)).not.toThrow();
      const widened = structuredClone(current) as any; widened.componentRefinements.g6Components.humanGate = "accepted";
      expect(() => module.validateDrawerRefinementPhase(widened, before, entry)).toThrow(/previous phase/);
      widened.componentRefinements.g6Components.humanGate = "awaiting_human";
      widened.componentRefinements.unknownUpgrade = { implementation: "completed" };
      expect(() => module.validateDrawerRefinementPhase(widened, before, entry)).toThrow(/previous phase/);
    }
  });

  it("rejects publication, dependency expansion and unchecked completion", () => {
    const module = governance(), entry = phaseEntry(module);
    for (const change of [{ publication: "published" }, { humanGate: "accepted" }, { authorizedNewDependencies: ["vaul@1.0.0"] }, { implementation: "completed" }]) {
      const next = { ...entry, ...change };
      expect(() => module.validateDrawerRefinementPhase({ componentRefinements: { ...previous.componentRefinements, drawerRefinement: next } }, previous, next)).toThrow();
    }
  });

  it("refuses an incomplete draft before any predecessor can be treated as accepted", () => {
    const module = governance(), entry = phaseEntry(module), root = tempRoot();
    const phase = { componentRefinements: { ...previous.componentRefinements, drawerRefinement: entry } };
    put(root, "status/current-phase.yaml", JSON.stringify(phase));
    mkdirSync(join(root, "evidence/runtime/g6-components-2026-10-14"), { recursive: true });
    // The draft fails at the seal now, and at the missing original proof after final sealing.
    expect(() => module.readDrawerRefinementSourceBindings(root, phase, JSON.parse)).toThrow(/not sealed|ENOENT.*source-bindings\.json/);
    expect(() => module.readDrawerRefinementSourceBindings(root, previous, JSON.parse)).toThrow(/supplied phase/);
    put(root, "status/current-phase.yaml", JSON.stringify(previous));
    expect(module.readDrawerRefinementSourceBindings(root, previous, JSON.parse)).toBeNull();
  });

  it("changes only the Drawer registry exports, retaining every sibling and dependency", () => {
    const module = governance();
    const drawer = { name: "drawer", exportNames: ["Drawer", "DrawerContent", "DrawerFooter"], files: ["drawer.tsx"] };
    const before = { dependencies: { "embla-carousel-react": "8.5.2" }, publication: "unpublished", items: [drawer, { name: "carousel", exportNames: ["Carousel"] }] };
    const current = structuredClone(before); current.items[0]!.exportNames!.splice(2, 0, "DrawerBody");
    expect(() => module.validateDrawerRefinementRegistry(current, before)).not.toThrow();
    for (const mutate of [
      (next: any) => { next.items[1].exportNames.push("NewCarousel"); },
      (next: any) => { next.dependencies.vaul = "1"; },
      (next: any) => { next.items[0].files.push("outside.tsx"); },
      (next: any) => { next.items[0].exportNames.push("DrawerBody"); },
    ]) { const next = structuredClone(current); mutate(next); expect(() => module.validateDrawerRefinementRegistry(next, before)).toThrow(); }
  });

  it("allows extracted task UI while preserving OTP, Carousel and all other declarations", () => {
    const module = governance();
    const before = `import { Button, DropdownMenu, InputOTP } from "@rain-next/ui";\nconst taskSeed = { title: "old" };\nfunction TaskDraftDrawer() { return <DropdownMenu />; }\nfunction DrawerPage() { return <TaskDraftDrawer />; }\nfunction OTPPage() { return <InputOTP maxLength={6} />; }\nfunction CarouselPage() { return <Button>next</Button>; }`;
    const current = `import { Button, InputOTP } from "@rain-next/ui";\nimport { TaskDraftDrawer } from "./g6-task-drawer";\nfunction DrawerPage() { return <TaskDraftDrawer />; }\nfunction OTPPage() { return <InputOTP maxLength={6} />; }\nfunction CarouselPage() { return <Button>next</Button>; }`;
    expect(() => module.validateDrawerInteractionSource(current, before)).not.toThrow();
    expect(() => module.validateDrawerInteractionSource(current.replace("maxLength={6}", "maxLength={4}"), before)).toThrow(/non-Drawer/);
    expect(() => module.validateDrawerInteractionSource(current + "\nconst unrelatedFeature = true;", before)).toThrow(/non-Drawer/);
    expect(() => module.validateDrawerInteractionSource(current.replace('"./g6-task-drawer"', '"./other-feature"'), before)).toThrow(/import/);
    expect(() => module.validateDrawerInteractionSource(current.replace("InputOTP }", "InputOTP, NewCarousel }"), before)).toThrow(/import/);
  });

  it("moves only DrawerCarousel close chrome while retaining its engine, gesture marker and children", () => {
    const module = governance();
    const header = '<DrawerHeader><DrawerTitle>课堂资料阅读</DrawerTitle><DrawerDescription>资料区横向拖动交给轮播。</DrawerDescription></DrawerHeader>';
    const footer = '<DrawerFooter><DrawerClose render={<Button variant="secondary">返回课程</Button>} /></DrawerFooter>';
    const nextHeader = '<DrawerHeader className="g6-drawer-example-header"><div className="g6-drawer-example-copy"><DrawerTitle>课堂资料阅读</DrawerTitle><DrawerDescription>资料区横向拖动交给轮播。</DrawerDescription></div><DrawerClose render={<IconButton size="36/20" icon={<CloseIcon />} aria-label="关闭资料阅读" />} /></DrawerHeader>';
    const before = `import { Button, DrawerFooter, DrawerClose } from "@rain-next/ui";\nfunction DrawerCarousel() { const count = api.scrollSnapList().length; return <Drawer><DrawerContent>${header}<div><Carousel data-base-ui-swipe-ignore="" opts={{ align: "start" }}><CarouselContent>课程资料</CarouselContent></Carousel><p>{count}</p></div>${footer}</DrawerContent></Drawer>; }`;
    const current = before.replace('DrawerClose }', 'DrawerClose, IconButton }').replace('function DrawerCarousel()', 'import { CloseIcon } from "@rain-next/ui/icons/close";\nfunction DrawerCarousel()').replace(header, nextHeader).replace(footer, "");
    expect(() => module.validateDrawerInteractionSource(current, before)).not.toThrow();
    for (const changed of [
      current.replace('data-base-ui-swipe-ignore=""', ""), current.replace('align: "start"', 'align: "end"'),
      current.replace("scrollSnapList()", "otherSlides()"), current.replace("<CarouselContent>课程资料", "<CarouselContent>替换资料"),
      current.replace("<DrawerTitle>课堂资料阅读", "<DrawerTitle>替换标题"), current.replace('size="36/20"', 'size="36/20" onClick={() => removeSlide()}'),
      current.replace('"@rain-next/ui/icons/close"', '"./unapproved-icon"'), current.replace("CloseIcon }", "CloseIcon as Carousel }"),
      current.replace("IconButton }", "IconButton as Carousel }"),
    ]) expect(() => module.validateDrawerInteractionSource(changed, before)).toThrow();
  });

  it("allows only Drawer-owned CSS rules and keeps mixed or Carousel selectors intact", () => {
    const module = governance();
    const before = "@layer components { .g6-task-drawer { height:100px; } .g6-interaction-actions { display:flex; } .g6-interaction-reading-drawer { height:560px; } }";
    const next = "@layer components { .g6-task-drawer { height:200px; } .g6-interaction-actions { display:flex; } .g6-interaction-reading-drawer { height:560px; } }";
    expect(() => module.validateDrawerInteractionCss(next, before)).not.toThrow();
    expect(() => module.validateDrawerInteractionCss(next.replace("display:flex", "display:none"), before)).toThrow(/non-Drawer/);
    expect(() => module.validateDrawerInteractionCss(next.replace("height:560px", "height:200px"), before)).toThrow(/non-Drawer/);
    expect(() => module.validateDrawerInteractionCss(next.replace(".g6-task-drawer {", ".g6-task-drawer,.g6-interaction-actions {"), before)).toThrow(/non-Drawer/);
  });

  it("can move the two legacy dirty tests without deleting Carousel-in-Drawer coverage", () => {
    const module = governance();
    const task = 'it("uses source close cancellation to keep a dirty task, then explicitly discards it", () => { expect(true).toBe(true); });';
    const carousel = 'it("keeps actual carousel navigation inside its Drawer and marks the engine-owned gesture region", () => { expect(true).toBe(true); });';
    expect(() => module.validateDrawerInteractionTests(carousel, task + "\n" + carousel)).not.toThrow();
    expect(() => module.validateDrawerInteractionTests("", task + "\n" + carousel)).toThrow(/non-Drawer/);
  });

  it("rejects the known Conversation drift instead of adopting the observed preflight bytes", () => {
    const module = governance(), root = tempRoot(), path = "apps/playground/src/docs/components/g6-conversation-pages.tsx";
    put(root, path, "original Conversation");
    const expected = { [path]: module.sha256("original Conversation") };
    expect(() => module.validateDrawerRetainedSources(root, expected, {})).not.toThrow();
    put(root, path, "unaccepted Conversation change");
    expect(() => module.validateDrawerRetainedSources(root, expected, {})).toThrow(/outside Drawer scope.*conversation/);
  });

  it("inherits only the three exact sources from original G6 sealed concurrent observations", () => {
    const module = governance(), root = tempRoot(), fixture = inheritedObservationFixture(root);
    const expected = module.readDrawerInheritedG6Observations(root, fixture.bindings, fixture.baseline);
    expect(Object.keys(expected).sort()).toEqual(["scripts/rn14-starter.mjs", "scripts/rn14-starter.test.ts", "docs/ai/rain-designer-integration.md"].sort());
    for (const path of Object.keys(expected)) {
      expect(module.drawerRefinementFiles).not.toContain(path);
      const source = readFileSync("evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/predecessor/" + path, "utf8");
      expect(module.sha256(source), path).toBe(expected[path]);
      put(root, path, source);
    }
    expect(expected["scripts/rn14-starter.mjs"]).not.toBe(fixture.baseline.protectedSources["scripts/rn14-starter.mjs"]);
    expect(() => module.validateDrawerRetainedSources(root, expected, {})).not.toThrow();
    put(root, "scripts/rn14-starter.mjs", "unaccepted later RN14 change");
    expect(() => module.validateDrawerRetainedSources(root, expected, {})).toThrow(/outside Drawer scope/);
    expect(Object.keys(expected).some(path => path.includes("conversation"))).toBe(false);
  });

  it("rejects forged inherited records, altered before snapshots, and expanded observation ownership", () => {
    const module = governance(), root = tempRoot(), fixture = inheritedObservationFixture(root);
    const read = (bindings = fixture.bindings, baseline = fixture.baseline) => module.readDrawerInheritedG6Observations(root, bindings, baseline);
    for (const path of fixture.records) {
      const original = readFileSync(path, "utf8"), changed = JSON.parse(original);
      changed.sourceFiles["apps/playground/src/docs/components/g6-conversation-pages.tsx"] = { before: null, after: "0".repeat(64), beforeSnapshot: null };
      put(root, path, JSON.stringify(changed, null, 2) + "\n");
      expect(read).toThrow(/observation|Observation/);
      put(root, path, original);
    }
    for (const path of fixture.snapshots) {
      put(root, path, "altered before bytes"); expect(read).toThrow(/snapshot/);
      put(root, path, readFileSync(path, "utf8"));
    }
    const wrongBaseline = structuredClone(fixture.baseline); wrongBaseline.protectedSources["scripts/rn14-starter.mjs"] = "0".repeat(64);
    expect(() => read(fixture.bindings, wrongBaseline)).toThrow(/baseline/);
    const editable = structuredClone(fixture.bindings); editable.sourceFiles["scripts/rn14-starter.mjs"] = { before: null, after: "0".repeat(64) };
    expect(() => read(editable)).toThrow(/editable/);
  });

  it("compares Carousel scoped after hashes as canonical bytes and still rejects unbound sibling drift", () => {
    const module = governance(), root = tempRoot(), path = "status/current-phase.yaml";
    const before = 'schemaVersion: "1"\ncomponentRefinements:\n  g6Components:\n    status: "original"\n';
    const current = before + '  carouselUpgrade:\n    status: "owned"\n';
    const canonical = carouselPhaseOwnedSource(current, before);
    expect(current).not.toBe(canonical);
    const snapshot = "evidence/runtime/carousel-upgrade-2026-10-14/before/" + path;
    const binding = { before: module.sha256(before), beforeSnapshot: snapshot, after: module.sha256(canonical), mode: "carousel-phase-only" };
    const carousel = { sourceFiles: { [path]: binding } }, expected = { [path]: binding.after };
    put(root, snapshot, before); put(root, path, current);
    expect(() => module.validateDrawerRetainedSources(root, expected, {}, carousel)).not.toThrow();
    put(root, path, current.replace('status: "original"', 'status: "unaccepted sibling"'));
    expect(() => module.validateDrawerRetainedSources(root, expected, {}, carousel)).toThrow(/sibling/);
    put(root, path, current); put(root, snapshot, before + "# altered proof\n");
    expect(() => module.validateDrawerRetainedSources(root, expected, {}, carousel)).toThrow(/snapshot/);
    put(root, snapshot, before);
    expect(() => module.validateDrawerRetainedSources(root, expected, {}, { sourceFiles: { [path]: { ...binding, mode: "unknown-projection" } } })).toThrow(/mode/);
  });

  it("requires canonical Carousel bytes in the frozen Drawer predecessor view", () => {
    const module = governance(), root = tempRoot(), path = "status/current-phase.yaml";
    const before = 'schemaVersion: "1"\ncomponentRefinements:\n  g6Components:\n    status: "original"\n';
    const raw = before + '  carouselUpgrade:\n    status: "owned"\n', canonical = carouselPhaseOwnedSource(raw, before);
    const carousel = { sourceFiles: { [path]: { before: module.sha256(before), beforeSnapshot: "original-phase.yaml", after: module.sha256(canonical), mode: "carousel-phase-only" } } };
    put(root, path, canonical);
    expect(() => module.validateDrawerCarouselPredecessorView(root, carousel)).not.toThrow();
    put(root, path, raw);
    expect(() => module.validateDrawerCarouselPredecessorView(root, carousel)).toThrow(/canonical/);
  });

  it("retains live siblings for each Carousel TSX, registry and guide projection", () => {
    const module = governance(), root = tempRoot();
    for (const [path, project, mutate] of [
      ["apps/playground/src/docs/components/g6-interaction-pages.tsx", carouselOwnedSource, (source: string) => source.replace("function OTPVerification() {", "function OTPVerification() { /* unaccepted sibling */")],
      ["registry/g6-assets.json", carouselRegistryOwnedSource, (source: string) => source.replace('"DrawerHeader",', '"DrawerHeader",\n        "UnapprovedDrawerPart",')],
      ["docs/ai/g6-components.md", carouselGuideOwnedSource, (source: string) => source.replace("七variant", "八variant")],
    ] as const) {
      const snapshot = "evidence/runtime/carousel-upgrade-2026-10-14/before/" + path;
      const before = readFileSync(snapshot, "utf8"), canonical = project(readFileSync(path, "utf8"), before);
      const binding = { before: module.sha256(before), beforeSnapshot: snapshot, after: module.sha256(canonical), mode: carouselSourceMode(path) };
      const carousel = { sourceFiles: { [path]: binding } }, expected = { [path]: binding.after };
      put(root, snapshot, before); put(root, path, canonical);
      expect(() => module.validateDrawerRetainedSources(root, expected, {}, carousel), path).not.toThrow();
      const sibling = mutate(canonical); expect(sibling, path).not.toBe(canonical); put(root, path, sibling);
      expect(module.sha256(carouselBindingBytes(root, path, snapshot)), path).toBe(binding.after);
      expect(() => module.validateDrawerRetainedSources(root, expected, {}, carousel), path).toThrow(/sibling/);
    }
  });

  it("limits the shared guide to its exact Drawer row, Body import and Body wrapper", () => {
    const module = governance(), path = "docs/ai/g6-components.md";
    const original = readFileSync("evidence/runtime/carousel-upgrade-2026-10-14/before/" + path, "utf8");
    const current = readFileSync("evidence/runtime/g1-g6-closeout-2026-10-17/run-01/governance/predecessor/" + path, "utf8"), previous = carouselGuideOwnedSource(current, original);
    expect(() => module.validateDrawerRefinementGuide(current, previous)).not.toThrow();
    for (const changed of [
      current.replace("七variant", "八variant"), current.replace("本地共享候选，尚未发布。", "已经发布。"),
      current.replace("同层编辑/预览及退出确认", "所有交互已验收"), current.replace("<DrawerBody>{body}</DrawerBody>", "<DrawerBody>{otherBody}</DrawerBody>"),
      current + "\n## 未授权章节\n其他组件已完成。\n", current.replace("<Carousel aria-label=", "<Carousel changed aria-label="),
    ]) expect(() => module.validateDrawerRefinementGuide(changed, previous)).toThrow(/guide|Guide|Drawer/);
  });

  it("binds only finite declared files and rejects forged predecessor snapshots and symlinks", () => {
    const module = governance(), root = tempRoot(), expected: Record<string, string | null> = {}, bindings: Record<string, any> = {};
    for (const path of module.drawerRefinementRequiredFiles as string[]) {
      const old = "before " + path, current = "after " + path;
      const snapshot = module.drawerRefinementEvidence + "predecessor/" + path;
      put(root, snapshot, old); put(root, path, current);
      expected[path] = module.sha256(old); bindings[path] = { before: expected[path], beforeSnapshot: snapshot, after: module.sha256(current) };
    }
    expect(() => module.validateDrawerBindingSources(root, bindings, expected)).not.toThrow();
    const widened = { ...bindings, "packages/ui/src/carousel/carousel.tsx": { before: null, beforeSnapshot: null, after: module.sha256("extra") } };
    expect(() => module.validateDrawerBindingSources(root, widened, expected)).toThrow(/finite/);
    const first = module.drawerRefinementRequiredFiles[0] as string, snapshot = bindings[first].beforeSnapshot;
    put(root, snapshot, "forged");
    expect(() => module.validateDrawerBindingSources(root, bindings, expected)).toThrow(/before snapshot/);
    put(root, snapshot, "before " + first); rmSync(join(root, first)); symlinkSync(join(root, snapshot), join(root, first));
    expect(() => module.validateDrawerBindingSources(root, bindings, expected)).toThrow(/regular file/);
  });
});

function inheritedObservationFixture(root: string) {
  const prefix = "evidence/runtime/g6-components-2026-10-14/";
  const bindings = JSON.parse(readFileSync(prefix + "source-bindings.json", "utf8"));
  const baseline = JSON.parse(readFileSync(prefix + "baseline.json", "utf8"));
  const records = [prefix + "concurrent-source-observation.json", prefix + "concurrent-document-observation.json",
    "evidence/runtime/library-governance-closeout-2026-10-13/concurrent-document-observation-02.json"];
  const snapshots = records.slice(0, 2).flatMap(path => Object.values(JSON.parse(readFileSync(path, "utf8")).sourceFiles).map((binding: any) => binding.beforeSnapshot as string));
  for (const path of [...records, ...snapshots]) put(root, path, readFileSync(path, "utf8"));
  return { bindings, baseline, records, snapshots };
}
