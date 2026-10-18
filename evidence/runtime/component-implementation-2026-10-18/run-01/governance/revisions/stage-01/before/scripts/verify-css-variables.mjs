import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const sourceRoots = ["packages/foundations/src", "packages/ui/src", "packages/layouts/src", "apps/playground/src", "apps/prototype/src"];

// These four names are written by trackViewport, not by a CSS declaration.
// The exact producer is checked below; no prefix-wide runtime exemption is used.
const viewportProducer = "packages/ui/src/dialog/dialog.tsx";
const viewportVariables = ["width", "height", "left", "top"].map(key => `--rain-dialog-viewport-${key}`);

// Only these existing, finite token-contract consumers construct Rain names.
// verify:tokens checks their generated definitions; contract tests check size/type domains.
const templateConsumers = new Map([
  ["packages/foundations/src/button-token-contract.ts", ["--rain-button-${name}"]],
  ["packages/foundations/src/select-token-contract.ts", ["--rain-input-height-${size}"]],
  ["packages/foundations/src/typography-contract.ts", ["--rain-font-${value.fontRole}", "--rain-font-size-${value.fontSize}", "--rain-line-height-${value.lineHeight}", '--rain-font-numeric-${value.numeric === "normal" ? "normal" : "data"}', "--rain-font-size-${key}", "--rain-line-height-${key}"]],
  ["packages/ui/src/tabs/tabs.tsx", ["--rain-tabs-height-two-line-${size}", "--rain-tabs-height-${size}", "--rain-font-size-${geometry.fontSize}", "--rain-line-height-${geometry.lineHeight}", "--rain-font-size-${geometry.countFontSize}", "--rain-line-height-${geometry.countLineHeight}"]],
]);

function readSources(root) {
  const sources = new Map();
  function walk(directory) {
    for (const entry of readdirSync(join(root, directory), { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else if (/\.(?:css|[cm]?[jt]sx?)$/.test(path) && !/\.(?:test|spec)\.|\.d\.ts$/.test(path)) sources.set(path, readFileSync(join(root, path), "utf8"));
    }
  }
  for (const directory of sourceRoots) walk(directory);
  return sources;
}

/** Existence only: CSS cascade, valid role, color contrast and runtime imports need separate checks. */
export function checkCssVariables(sources) {
  const definitions = new Set(), failures = [], dynamicSources = [];
  const cleaned = new Map([...sources].map(([path, source]) => [path, source.replace(/\/\*[\s\S]*?\*\//g, match => match.replace(/[^\n]/g, " "))]));
  for (const source of cleaned.values()) {
    for (const match of source.matchAll(/(--rain-[\w-]+)["'`]?\s*:/g)) definitions.add(match[1]);
    for (const match of source.matchAll(/\.setProperty\(\s*["'](--rain-[\w-]+)["']/g)) definitions.add(match[1]);
  }
  const producer = cleaned.get(viewportProducer) ?? "";
  if (/\.setProperty\(`--rain-dialog-viewport-\$\{key\}`/.test(producer)
    && /Object\.entries\(\{ width: viewport\.width, height: viewport\.height, left: viewport\.offsetLeft, top: viewport\.offsetTop \}\)/.test(producer)) {
    viewportVariables.forEach(name => definitions.add(name));
    dynamicSources.push({ file: viewportProducer, variables: viewportVariables, reason: "trackViewport writes native visualViewport geometry with CSS fallbacks." });
  }
  let references = 0;
  for (const [file, source] of cleaned) {
    for (const match of source.matchAll(/(?=var\(\s*(--rain-[^)]*)\))/g)) {
      references++;
      const expression = match[1].trim(), line = source.slice(0, match.index).split("\n").length;
      if (expression.includes("${")) {
        if (templateConsumers.get(file)?.includes(expression)) dynamicSources.push({ file, line, expression, reason: "Finite contract-derived name; generated definitions checked by verify:tokens and token-contract tests." });
        else failures.push(`${file}:${line}: unregistered dynamic Rain variable ${expression}`);
      } else {
        const variable = expression.split(",", 1)[0].trim();
        if (!definitions.has(variable)) failures.push(`${file}:${line}: undefined ${variable}`);
      }
    }
  }
  return { files: sources.size, references, definitions: definitions.size, dynamicSources, failures };
}

export function verifyCssVariables({ root = process.cwd() } = {}) {
  return checkCssVariables(readSources(root));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = verifyCssVariables();
  if (result.failures.length) {
    console.error(result.failures.join("\n"));
    process.exitCode = 1;
  } else console.log(`CSS variables passed: ${result.references} Rain references in ${result.files} source files; ${result.dynamicSources.length} documented dynamic sources.`);
}
