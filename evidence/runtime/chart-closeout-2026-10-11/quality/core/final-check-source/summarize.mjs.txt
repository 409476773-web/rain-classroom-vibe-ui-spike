import { readFileSync, readdirSync, writeFileSync, statSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const base = resolve("evidence/runtime/chart-closeout-2026-10-11/quality/core");
const read = path => JSON.parse(readFileSync(resolve(base, path), "utf8"));
const selected = [];
for (const browser of ["chromium", "firefox", "webkit"]) for (const width of [1440, 390]) {
  const primary = `${browser}-${width}-entries.json`, facts = read(`cross-02/${primary}`);
  if (!facts.sourceFrozen || facts.errors.length) throw new Error(`Primary source/errors: ${primary}`);
  const supplemental = width === 390 ? read(`cross-05/${primary}`) : null;
  if (supplemental && (!supplemental.sourceFrozen || supplemental.errors.length || JSON.stringify(facts.before) !== JSON.stringify(supplemental.before))) throw new Error(`Supplement source/errors: ${primary}`);
  const observations = [...facts.observations, ...(supplemental?.observations ?? [])];
  if (observations.length !== 19 || new Set(observations.map(row => row.id)).size !== 19) throw new Error(`Not 19 distinct entries: ${primary}`);
  selected.push({ browser, width, primary: `cross-02/${primary}`, supplement: supplemental ? `cross-05/${primary}` : null, count: observations.length,
    entries: observations.map(row => ({ id: row.id, exactRows: row.rows.length, textReadings: row.renderedText.length,
      opaqueTextCandidates: row.renderedText.filter(item => item.ratio !== null).length,
      conditionalTextReadings: row.renderedText.filter(item => item.ratio === null).length,
      unacceptedOpaqueCandidates: row.renderedText.filter(item => item.ratio !== null && item.ratio < 4.5),
      narrowNetworkEquivalentReading: row.narrowNetworkEquivalentReading ?? false })) });
}
const terminal = [], pendingTerminal = [];
for (const width of [1440, 390]) for (const family of ["line", "scatter", "matrix"]) {
  const file = `${family === "line" ? "terminal-03" : "terminal-01"}/chromium-${width}-${family}-terminal.json`;
  if (!existsSync(resolve(base, file))) { pendingTerminal.push({ width, family, file, reason: "actual nonvacuous full-width path proof will run after Brush dependency freeze" }); continue; }
  const facts = read(file);
  if (!facts.sourceFrozen || facts.errors.length || !facts.actualMotion) throw new Error(`Terminal source/errors/motion: ${file}`);
  if (family === "line" && (facts.observations[0].lineProof?.length !== 3 || facts.observations[0].lineProof.some(row => Math.abs(row.width - row.expectedInnerWidth) >= 1))) throw new Error(`Missing actual full-width series proof: ${file}`);
  terminal.push({ width, family, file, plotCount: facts.observations.length, actualReducedMotion: facts.actualMotion });
}
const contrast = read("green-01/contrast-facts.json"), red = read("red-03/contrast-facts.json");
const allReadings = contrast.readings.flatMap(row => [...row.axes, ...row.legends]);
if (!contrast.sourceFrozen || contrast.errors.length || allReadings.length !== 29 || allReadings.some(row => row.ratio < 4.5)) throw new Error("Contrast GREEN invalid");
const sunburst = read("terminal-01/sunburst-text-audit.json");
if (!sunburst.sourceFrozen) throw new Error("Sunburst source changed");
const outline = [];
for (const width of [1440, 390]) for (const kind of ["default", "interactive"]) {
  const file = `sunburst-outline-03/chromium-${width}-sunburst-${kind}-outline.json`, facts = read(file);
  if (!facts.sourceFrozen || facts.errors.length || !["root", "drilled", "returned"].every(action => facts.observations.some(row => row.action === action))) throw new Error(`Outline source/errors/actions: ${file}`);
  const labels = facts.observations.flatMap(row => row.labels).filter(row => row.whiteAgainstHaloRatio != null);
  if (!labels.length || labels.some(row => !row.text || row.fill !== "rgb(255, 255, 255)" || row.strokeWidth !== "2px" || row.paintOrder !== "stroke" || row.opacity !== 1 || row.whiteAgainstHaloRatio < 4.5)) throw new Error(`Outline paint: ${file}`);
  const returned = facts.observations.find(row => row.action === "returned");
  if (!returned.returnProof.sameCommandsAndPalette || returned.returnProof.maximumCoordinateDelta >= 1e-8) throw new Error(`Outline return geometry: ${file}`);
  const mono = facts.observations.find(row => row.action === "default-monochrome-unchanged");
  if (kind === "default" && (!mono?.noOutline || !mono.labels.length || mono.labels.some(row => row.fill !== "rgb(20, 35, 70)" || row.stroke !== "none" || row.paintOrder !== "normal"))) throw new Error(`Mono paint: ${file}`);
  outline.push({ width, kind, file, haloReadings: labels.length, minimumHaloRatio: Math.min(...labels.map(row => row.whiteAgainstHaloRatio)), returnProof: returned.returnProof, unchangedMonochrome: kind === "default" });
}
const darkFile = "sunburst-dark-01/chromium-390-sunburst-dark-outline.json", dark = read(darkFile);
if (!dark.sourceFrozen || dark.errors.length || dark.observations.length !== 2 || dark.observations.some(row => !row.media.dark || !row.media.reduced || row.media.forced || row.media.theme !== "dark" || !row.labels.length || row.labels.some(label => label.opacity !== 1 || label.strokeWidth !== "2px" || label.paintOrder !== "stroke" || label.whiteAgainstHaloRatio < 4.5))) throw new Error("Dark outline proof");
const darkLabels = dark.observations.flatMap(row => row.labels);
const snapshot = resolve(base, "final-check-source");
mkdirSync(snapshot, { recursive: true });
for (const name of readdirSync(base).filter(name => /\.(ts|mjs)$/.test(name))) copyFileSync(resolve(base, name), resolve(snapshot, `${name}.txt`));
const source = "packages/ui/src/charts/styles.css";
const summary = {
  status: pendingTerminal.length ? "limited-quality-checks-passed; terminal-observations-pending; full-graphical-contrast-unaccepted" : "limited-quality-checks-passed; full-graphical-contrast-remains-unaccepted",
  defaultEntryObservations: 114, selected,
  terminalCases: terminal.length, terminalCasesRequested: 6, pendingTerminal, terminalPlotObservations: terminal.reduce((total, row) => total + row.plotCount, 0), terminal,
  ordinaryTextContrast: { red: "red-03/contrast-facts.json", green: "green-01/contrast-facts.json", actualReadings: allReadings.length,
    redMinimum: Math.min(...red.readings.flatMap(row => [...row.axes, ...row.legends]).map(row => row.ratio)), greenMinimum: Math.min(...allReadings.map(row => row.ratio)),
    target: 4.5, scope: "actual ordinary Line/Composed labels on opaque light surface; no full contrast acceptance" },
  sunburstSettledText: { file: "terminal-01/sunburst-text-audit.json", historicalOpaqueSectorFindings: sunburst.text.filter(row => row.ratio !== null && row.ratio < 4.5), conditionalSectorLabels: sunburst.text.filter(row => row.ratio === null).length, mitigation: "existing dark stroke halo verified below; historical raw sector comparison is retained and does not grant full graphical contrast acceptance" },
  sunburstOutline: { lightCases: 4, light: outline, darkRepresentativeCases: 1, darkPlots: 2, darkFile, darkHaloReadings: darkLabels.length, minimumDarkHaloRatio: Math.min(...darkLabels.map(row => row.whiteAgainstHaloRatio)), scope: "actual white glyph against existing dark halo; two callers and two light widths, one dark narrow page; monochrome remains no-outline" },
  nativeBrushReadOnlyReview: { file: "native-brush-review.md", hashes: "native-brush-review.json", nativeFiles: 181, changedFiles: 2, unchangedFiles: 179, finding: "no critical or important issue in current reviewed scope" },
  ownedRuntime: { path: source, sha256: createHash("sha256").update(readFileSync(source)).digest("hex"), lastWrite: statSync(source).mtime.toISOString(), deltaProof: "style-change-proof.json" },
  colorTargets: { file: "chart-color-consumers-green.log", testsPassed: 4 },
  installedDependencyIdentity: "dependency-before.json",
  updatedInstalledDependencyIdentity: existsSync(resolve(base, "dependency-after.json")) ? "dependency-after.json" : null,
  priorRuns: { "red-01": "sandbox browser launch failed; no business assertion", "red-02": "custom default legend selector did not match real DOM; harness failure",
    "red-03": "genuine ordinary text contrast RED", "cross-01": "five Network root selector failures plus one navigation execution-context destruction; no pageerror",
    "cross-02": "111 valid observations retained; three narrow Network hidden-SVG assertions were incompatible with existing equivalent-list contract",
    "cross-03": "snapshot spec mistakenly discovered before test; harness setup failure", "cross-04": "interrupted when scrollIntoView targeted intentionally hidden narrow Network plot; not runtime failure",
    "cross-05": "only affected three narrow Network equivalent-reading observations, all passed", "terminal-01-line": "initial clip predicate was vacuous because reduced Line has no clip; superseded by terminal-03 actual three full-width path proof on final native source", "terminal-02-line": "same strict two cases passed before final native public-type/extent adapter repair; terminal-03 retains final source proof", "sunburst-outline-01": "wrong strict >3 requirement for a valid drilled three-leaf geometry and attempting to scroll a lazy plot before its card; interrupted at exit130", "sunburst-outline-02": "all paint and drill assertions passed; exact d-string comparison rejected returned coordinates differing by about 1e-13; retained raw values and revised numeric coordinate proof", "sunburst-outline-03": "four light cases passed with exact commands/palette and coordinate delta <1e-8; actual maximum about9.24e-14", "sunburst-dark-01": "one explicit Rain dark narrow page with both actual affected callers passed" },
  boundaries: ["114 screenshots are ordinary-motion current-frame entry smoke, not terminal graphical appearance; initial private config reducedMotion key was unsupported and did not establish reduce mode; six terminal cases use explicit page.emulateMedia plus matchMedia and are recorded separately", "Original entry smoke and terminal-01 captures used Brush3.12.0/React19.2.8 identity; subsequent Brush dependency changes and terminal-02 dependency identity are recorded separately",
    "114 entry inventories and their opacity/underlay candidates are historical measurements before Sunburst halo repair; accepted targeted outline proof is recorded separately", "WebKit automation is not physical Safari; DOM/keyboard observations are not VoiceOver or physical touch acceptance", "No full palette/gradient/pattern/alpha/faded/forced-color contrast acceptance", "No arbitrary large data, real Live source, production reconnect/expiry, publication, migration, Figma or Git operation"]
};
writeFileSync(resolve(base, "summary.json"), JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ status: summary.status, entries: 114, terminalCasesRequested: 6, terminalPlots: summary.terminalPlotObservations,
  ordinaryTextReadings: allReadings.length, terminalCasesPassed: summary.terminalCases, pendingTerminal: pendingTerminal.length, historicalSunburstOpaqueFindings: summary.sunburstSettledText.historicalOpaqueSectorFindings.length, sunburstLightCases: 4, sunburstDarkCases: 1, ownedRuntime: summary.ownedRuntime }));
