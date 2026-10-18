// Optional Manifest 1.0 extension. This is the single set of discovery enums.
export const discoveryContract = Object.freeze({
  version: 1,
  roles: ["root", "specialization", "composition", "pattern", "layout", "recipe", "compatibility", "usage-reference", "helper", "foundation"],
  relationTypes: ["wraps", "usesBehavior", "sharesPresentation", "composes", "exampleUses", "requiresContext", "alternativeWhen"],
  evidenceKinds: ["render", "call", "selector", "contract", "example", "assignment"],
});
const object = value => value !== null && typeof value === "object" && !Array.isArray(value);
const fail = (path, message) => { throw new Error(`${path}: ${message}`); };
function keys(value, allowed, path) {
  if (!object(value)) fail(path, "expected an object");
  for (const key of Object.keys(value)) if (!allowed.includes(key)) fail(`${path}.${key}`, "unknown discovery field");
}
function string(value, path) {
  if (typeof value !== "string" || !value.trim()) fail(path, "expected a nonempty string");
}
function strings(value, path, required = false) {
  if (!Array.isArray(value) || (required && !value.length)) fail(path, "expected a nonempty string list");
  for (const item of value) string(item, path);
  if (new Set(value).size !== value.length) fail(path, "duplicate value");
}
export function validateVocabulary(value, path = "config/asset-discovery.yaml") {
  keys(value, ["version", "tasks", "families"], path);
  if (value.version !== 1) fail(path, "unsupported vocabulary version");
  for (const group of ["tasks", "families"]) {
    if (!Array.isArray(value[group]) || !value[group].length) fail(`${path}.${group}`, "expected vocabulary entries");
    const ids = new Set();
    for (const entry of value[group]) {
      keys(entry, ["id", "label", "description", "searchAliases"], `${path}.${group}`);
      string(entry.id, `${path}.${group}.id`); string(entry.label, `${path}.${group}.label`);
      if (!/^[a-z][a-z0-9-]*$/.test(entry.id) || ids.has(entry.id)) fail(`${path}.${group}.${entry.id}`, "invalid or duplicate vocabulary ID");
      ids.add(entry.id);
      if (entry.description !== undefined) string(entry.description, `${path}.${group}.${entry.id}.description`);
      if (entry.searchAliases !== undefined) strings(entry.searchAliases, `${path}.${group}.${entry.id}.searchAliases`);
    }
  }
  return value;
}
export function validateDiscovery(value, vocabulary, path = "Manifest.discovery") {
  if (value === undefined) return null;
  keys(value, ["version", "familyId", "taskIds", "searchAliases", "implementationRole", "controlScope", "stateOwner", "relationships"], path);
  if (value.version !== discoveryContract.version) fail(`${path}.version`, "unsupported discovery version");
  if (!vocabulary.families.some(entry => entry.id === value.familyId)) fail(`${path}.familyId`, `unknown family ${value.familyId}`);
  strings(value.taskIds, `${path}.taskIds`, true);
  for (const id of value.taskIds) if (!vocabulary.tasks.some(entry => entry.id === id)) fail(`${path}.taskIds`, `unknown task ${id}`);
  if (!discoveryContract.roles.includes(value.implementationRole)) fail(`${path}.implementationRole`, `unsupported role ${value.implementationRole}`);
  string(value.controlScope, `${path}.controlScope`); string(value.stateOwner, `${path}.stateOwner`);
  if (value.searchAliases !== undefined) strings(value.searchAliases, `${path}.searchAliases`);
  if (value.relationships !== undefined) {
    if (!Array.isArray(value.relationships)) fail(`${path}.relationships`, "expected a list");
    for (const [index, relation] of value.relationships.entries()) {
      const at = `${path}.relationships[${index}]`;
      keys(relation, ["type", "targetId", "condition", "requiredExports", "evidence"], at);
      if (!discoveryContract.relationTypes.includes(relation.type)) fail(`${at}.type`, `unsupported relation ${relation.type}`);
      string(relation.targetId, `${at}.targetId`);
      if (["alternativeWhen", "requiresContext"].includes(relation.type) || relation.condition !== undefined) string(relation.condition, `${at}.condition`);
      if (relation.requiredExports !== undefined) strings(relation.requiredExports, `${at}.requiredExports`, true);
      keys(relation.evidence, ["path", "symbol", "selector", "targetSymbol", "kind"], `${at}.evidence`);
      string(relation.evidence.path, `${at}.evidence.path`);
      if (!discoveryContract.evidenceKinds.includes(relation.evidence.kind)) fail(`${at}.evidence.kind`, "unknown evidence kind");
      if (!relation.evidence.symbol && !relation.evidence.selector) fail(`${at}.evidence`, "a symbol or selector is required");
      for (const key of ["symbol", "selector", "targetSymbol"]) if (relation.evidence[key] !== undefined) string(relation.evidence[key], `${at}.evidence.${key}`);
      if (relation.type === "wraps" && !["render", "call"].includes(relation.evidence.kind)) fail(at, "wraps needs render/call evidence, not co-location or import");
    }
  }
  return value;
}
