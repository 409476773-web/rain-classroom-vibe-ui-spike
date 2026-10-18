import { createHash } from "node:crypto";
import { existsSync, readFileSync, realpathSync } from "node:fs";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseSync } from "vite";
import { parseYamlSubset } from "./verification-helpers.mjs";
import { validateDiscovery, validateVocabulary } from "./asset-discovery-contract.mjs";

const workspace = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const catalogPaths = Object.freeze({ json: "docs/ai/asset-catalog.generated.json", playground: "apps/playground/src/docs/components/asset-catalog.generated.ts" });
const names = item => item ? item.exportNames ?? [item.exportName] : [];
const sha = value => createHash("sha256").update(value).digest("hex");
const json = value => JSON.stringify(value, null, 2) + "\n";
function localFile(root, path, at) {
  if (typeof path !== "string" || isAbsolute(path)) throw new Error(`${at}: invalid evidence path ${path}`);
  const absolute = resolve(root, path), rel = relative(root, absolute);
  if (rel === ".." || rel.startsWith("../") || !existsSync(absolute)) throw new Error(`${at}: missing or escaping source ${path}`);
  const real = relative(realpathSync(root), realpathSync(absolute));
  if (real === ".." || real.startsWith("../")) throw new Error(`${at}: source symlink escapes workspace ${path}`);
  return absolute;
}
function walk(node, callback) {
  if (!node || typeof node !== "object") return;
  if (typeof node.type === "string") callback(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(child => walk(child, callback));
    else if (value && typeof value === "object") walk(value, callback);
  }
}
function ref(node) {
  if (!node) return null;
  if (["Identifier", "JSXIdentifier"].includes(node.type)) return node.name;
  if (["MemberExpression", "JSXMemberExpression"].includes(node.type) && !node.computed) return `${ref(node.object)}.${ref(node.property)}`;
  return null;
}
function readSource(root, path, cache, at) {
  if (cache.has(path)) return cache.get(path);
  const source = readFileSync(localFile(root,path,at),"utf8");
  const value = { source, sha256:sha(source), declarations:new Map(), imports:[] };
  if (/\.[cm]?[jt]sx?$/.test(path)) {
    const parsed = parseSync(path, source);
    if (parsed.errors.length) throw new Error(`${at}: cannot parse source ${path}`);
    for (const node of parsed.program.body) {
      if (node.type === "ImportDeclaration" && node.importKind !== "type") value.imports.push(node);
      const declaration = node.type === "ExportNamedDeclaration" ? node.declaration : node;
      if (declaration?.type === "VariableDeclaration") {
        for (const item of declaration.declarations) if (item.id.type === "Identifier") value.declarations.set(item.id.name,item);
      }
      if (["FunctionDeclaration", "ClassDeclaration"].includes(declaration?.type) && declaration.id?.name) value.declarations.set(declaration.id.name,declaration);
    }
  }
  cache.set(path,value); return value;
}
function membersOf(source, exportNames) {
  function propertiesOf(name, active=new Set()) {
    if (active.has(name)) return new Map();
    const seen=new Set([...active,name]);
    let expression=source.declarations.get(name)?.init;
    if (expression?.type === "CallExpression" && ref(expression.callee)==="Object.assign") expression=expression.arguments[1];
    if (expression?.type !== "ObjectExpression") return new Map();
    const properties=new Map();
    for (const property of expression.properties) {
      if (property.type === "SpreadElement" && property.argument.type === "Identifier") {
        for (const [key,target] of propertiesOf(property.argument.name,seen)) properties.set(key,target);
      } else if (property.type === "Property" && !property.computed && property.key.type === "Identifier") {
        const target=ref(property.value);
        if (target) properties.set(property.key.name,target);
      }
    }
    return properties;
  }
  return exportNames.flatMap(name=>[...propertiesOf(name)].map(([member,target])=>({reference:`${name}.${member}`,member,owner:name,target,kind:target.includes(".")?"member-reference":"runtime-member"})));
}
function aliasesOf(source, exportNames, members) {
  const aliases=[];
  for (const name of exportNames) {
    const target=ref(source.declarations.get(name)?.init);
    if (!target) continue;
    const member=members.find(item=>item.owner!==name && item.target===target);
    if (member) aliases.push({type:"runtimeAliasOf",reference:name,target:member.reference});
  }
  return aliases;
}
export function isCandidateEligible(manifest) {
  // Keep the original asset-index identity/maturity/automated qualification.
  const automated=manifest.verification?.automated ?? manifest.automatedVerification;
  return ["registry-candidate","system-approved"].includes(manifest.assetIdentity)
    && !["local-experiment","deprecated"].includes(manifest.maturity)
    && ["passed","scoped-passed"].includes(automated);
}
function validateRoutes(routes, assetIds) {
  if (routes?.version!==1 || !Array.isArray(routes.routes)) throw new Error("config/asset-documentation-routes.json: invalid route contract");
  const seen=new Set();
  for (const route of routes.routes) {
    if (typeof route.href!=="string" || !/^#[a-z0-9-]+$/.test(route.href) || seen.has(route.href)) throw new Error(`Duplicate or invalid documentation route: ${route.href}`);
    seen.add(route.href);
    for (const key of ["pageKey","focusTargetId","viewKind"]) if (typeof route[key]!=="string" || !route[key]) throw new Error(`${route.href}: missing ${key}`);
    if (!Array.isArray(route.assetIds) || new Set(route.assetIds).size!==route.assetIds.length) throw new Error(`${route.href}: invalid assetIds`);
    for (const id of route.assetIds) if (!assetIds.has(id)) throw new Error(`${route.href}: unknown asset ${id}`);
    if (route.pageKey==="component-asset" && typeof route.componentId!=="string") throw new Error(`${route.href}: component loader needs componentId`);
  }
  return routes.routes;
}
function validateRelation(relation, asset, byId, root, cache, apiTools) {
  const at=`${asset.manifestPath}.discovery (${asset.manifest.id}) -> ${relation.targetId}`;
  const target=byId.get(relation.targetId);
  if (!target) throw new Error(`${at}: unknown relationship target`);
  if (target===asset) throw new Error(`${at}: self relationship is not meaningful`);
  const evidence=relation.evidence;
  if (["wraps","usesBehavior","composes"].includes(relation.type)) {
    const owned=new Set([asset.manifest.sourcePath,...(asset.item?.files??[])]);
    if (!owned.has(evidence.path)) throw new Error(`${at}: implementation evidence ownership mismatch: ${evidence.path}`);
  }
  const source=readSource(root,evidence.path,cache,at);
  const declaration=evidence.symbol?source.declarations.get(evidence.symbol):null;
  if (evidence.symbol && !declaration) throw new Error(`${at}: evidence symbol does not exist: ${evidence.symbol}`);
  if (evidence.selector && !source.source.includes(evidence.selector)) throw new Error(`${at}: evidence selector does not exist: ${evidence.selector}`);
  if (["wraps","composes","exampleUses","usesBehavior"].includes(relation.type)) {
    if (!declaration) throw new Error(`${at}: render/call evidence requires a declaration symbol`);
    const targetSource=readSource(root,target.manifest.sourcePath,cache,at);
    const targetNames=evidence.targetSymbol?[evidence.targetSymbol]:names(target.item);
    if (evidence.targetSymbol && !targetSource.declarations.has(evidence.targetSymbol)) throw new Error(`${at}: missing target behavior symbol ${evidence.targetSymbol}`);
    const localNames=new Set(evidence.path===target.manifest.sourcePath?targetNames:[]);
    for (const imported of source.imports) {
      const specifier=imported.source.value;
      const targetPath=specifier.startsWith(".")?resolve(root,dirname(evidence.path),specifier):null;
      const paths=targetPath?[targetPath,`${targetPath}.ts`,`${targetPath}.tsx`,resolve(targetPath,"index.ts")]:[];
      const registeredPath=[target.manifest.sourcePath,...(target.item?.files??[])].find(path=>paths.includes(resolve(root,path)));
      const matches=targetPath ? Boolean(registeredPath) : specifier===target.item?.importPath;
      if (!matches) continue;
      for (const binding of imported.specifiers) if (binding.type==="ImportSpecifier" && binding.importKind!=="type" && targetNames.includes(binding.imported.name)) {
        // A registered secondary file must actually declare the public symbol;
        // being another file in the same Registry item does not establish use.
        if (registeredPath && registeredPath!==target.manifest.sourcePath && !readSource(root,registeredPath,cache,at).declarations.has(binding.imported.name)) continue;
        localNames.add(binding.local.name);
      }
    }
    let used=false;
    walk(declaration,node=>{
      const called=node.type==="JSXOpeningElement"?ref(node.name):node.type==="CallExpression"?ref(node.callee):null;
      if (called && localNames.has(called.split(".")[0])) used=true;
    });
    if (!used) throw new Error(`${at}: no target render/call in ${evidence.symbol}; import or co-location is insufficient`);
  }
  if (relation.requiredExports) {
    let available=new Set(names(target.item));
    if (apiTools && target.item?.importPath) available=apiTools.exportsOf(root,apiTools.packageEntry(root,target.item.importPath));
    for (const name of relation.requiredExports) {
      const [owner,member,...rest]=name.split(".");
      if (rest.length || !available.has(owner)) throw new Error(`${at}: unverified required public export ${name}`);
      if (member && !membersOf(readSource(root,target.manifest.sourcePath,cache,at),[owner]).some(item=>item.reference===name)) throw new Error(`${at}: unverified required public member ${name}`);
    }
  }
  const position=declaration?.start ?? (evidence.selector?source.source.indexOf(evidence.selector):0);
  return {...relation,evidence:{...evidence,line:source.source.slice(0,position).split("\n").length,sha256:source.sha256}};
}
function verificationOf(manifest) {
  const result=structuredClone(manifest.verification??{
    automated:manifest.automatedVerification??"not-recorded",
    humanGate:manifest.humanGate??"not-recorded",
    contrastAcceptance:manifest.contrastAcceptance??"not-recorded",
    scope:manifest.humanGateScope??null,
    independentReview:manifest.independentReview??"not-recorded",
    evidence:manifest.verificationEvidence??manifest.evidence??null,
  });
  const scoped=[];
  for (const area of ["lifecycle","tokenMigration"]) {
    const record=manifest[area];
    if (!record || typeof record!=="object") continue;
    for (const [field,value] of Object.entries(record)) {
      const dimension=/HumanGate$|^humanGate$/.test(field)?"humanGate":field==="automatedVerification"?"automated":field==="contrastAcceptance"?"contrastAcceptance":field==="independentReview"?"independentReview":null;
      if (dimension && typeof value==="string") scoped.push({scope:`${area}.${field}`,sourceField:`${area}.${field}`,dimension,value,evidence:record.evidence??record.reviewRoute??record.source??null});
    }
  }
  return {...result,scoped};
}
/** Input must come from readAssets, which owns Registry/package/source validation. */
export function buildAssetCatalog(assets, options = {}) {
  const root=options.root??workspace;
  const vocabulary=validateVocabulary(options.vocabulary??parseYamlSubset(readFileSync(resolve(root,"config/asset-discovery.yaml"),"utf8")));
  const routeInput=options.routes??JSON.parse(readFileSync(resolve(root,"config/asset-documentation-routes.json"),"utf8"));
  const byId=new Map();
  for (const asset of assets) { if (byId.has(asset.manifest.id)) throw new Error(`Duplicate canonical asset ID: ${asset.manifest.id}`); byId.set(asset.manifest.id,asset); }
  const routes=validateRoutes(routeInput,new Set(byId.keys()));
  const cache=new Map();
  const normalized=assets.map(asset=>{
    const m=asset.manifest;
    const d=validateDiscovery(m.discovery,vocabulary,`${asset.manifestPath}.discovery`);
    const source=readSource(root,m.sourcePath,cache,m.id);
    const entryNames=names(asset.item);
    const members=membersOf(source,entryNames);
    const relationships=(d?.relationships??[]).map(relation=>validateRelation(relation,asset,byId,root,cache,options.apiTools));
    return {
      id:m.id,name:m.name,category:m.category,manifestPath:asset.manifestPath,sourcePath:m.sourcePath,
      description:m.description??"",useWhen:m.useWhen??[],doNotUseWhen:m.doNotUseWhen??[],
      assetIdentity:m.assetIdentity,maturity:m.maturity,publication:m.publication??"not-recorded",
      verification:verificationOf(m),
      candidateEligible:isCandidateEligible(m),discoveryStatus:d?"registered":"pending-discovery",
      familyId:d?.familyId??null,taskIds:d?.taskIds??[],searchAliases:d?.searchAliases??[],
      implementationRole:d?.implementationRole??null,controlScope:d?.controlScope??null,stateOwner:d?.stateOwner??null,
      entry:{kind:asset.item?.importPath?"public-import":asset.item?"source-copy":"usage-reference",importPath:asset.item?.importPath??null,exportNames:entryNames,sourcePath:m.sourcePath,registryPath:asset.registryPath??null},
      api:{exports:entryNames,members,aliases:aliasesOf(source,entryNames,members),styleParts:m.parts??[],slots:m.slots??[],memberDiscovery:"static-supported-shapes-only"},
      modification:{mode:m.modificationMode??null,allowed:m.allowedModifications??[],restricted:m.restrictedModifications??[],compositionRules:m.compositionRules??[]},
      documentation:routes.filter(route=>route.assetIds.includes(m.id)),relationships,
      legacyRelatedHints:m.relatedComponents??[],
    };
  });
  // Structural implementation edges may not recurse. Reference/alternative/presentation
  // links can legitimately point both ways and are deliberately excluded.
  const graph=new Map(normalized.map(asset=>[asset.id,asset.relationships.filter(edge=>edge.type==="wraps").map(edge=>edge.targetId)]));
  const done=new Set(), active=new Set();
  function visit(id) {
    if (active.has(id)) throw new Error(`Structural relationship cycle: ${[...active,id].join(" -> ")}`);
    if (done.has(id)) return;
    active.add(id); for (const target of graph.get(id)??[]) visit(target); active.delete(id); done.add(id);
  }
  for (const id of graph.keys()) visit(id);
  if (options.apiTools) {
    for (const specifier of new Set(assets.map(asset=>asset.item?.importPath).filter(Boolean))) {
      const entry=options.apiTools.packageEntry(root,specifier), visited=new Set();
      options.apiTools.exportsOf(root,entry,visited);
      readSource(root,`packages/${specifier.split("/")[1]}/package.json`,cache,specifier);
      readSource(root,entry,cache,specifier);
      for (const path of visited) readSource(root,path,cache,specifier);
    }
  }
  const sourceHashes=Object.fromEntries([...cache.entries()].sort(([a],[b])=>a.localeCompare(b)).map(([path,value])=>[path,value.sha256]));
  const sourceDigest=sha(JSON.stringify({assets:assets.map(({manifest,manifestPath,item,registry,registryPath})=>({manifest,manifestPath,item,registry,registryPath})),vocabulary,routes,sourceHashes}));
  return {version:1,sourceDigest,vocabulary,routes,coverage:{total:normalized.length,registered:normalized.filter(x=>x.discoveryStatus==="registered").length,pending:normalized.filter(x=>x.discoveryStatus!=="registered").map(x=>x.id)},assets:normalized};
}
/** @param {any} catalog
 * @param {{query?: string, task?: string, family?: string, includeLocal?: boolean}} [options] */
export { queryAssetCatalog } from "./asset-discovery-query.mjs";
export function renderCatalogOutputs(catalog) {
  const light={version:catalog.version,sourceDigest:catalog.sourceDigest,vocabulary:catalog.vocabulary,coverage:catalog.coverage,assets:catalog.assets.map(asset=>({
    id:asset.id,name:asset.name,category:asset.category,description:asset.description,
    manifestPath:asset.manifestPath,sourcePath:asset.sourcePath,
    assetIdentity:asset.assetIdentity,maturity:asset.maturity,publication:asset.publication,
    verification:{automated:asset.verification.automated??"not-recorded",humanGate:asset.verification.humanGate??"not-recorded",contrastAcceptance:asset.verification.contrastAcceptance??"not-recorded",scope:asset.verification.scope??null,evidence:asset.verification.evidence??null,scoped:asset.verification.scoped},
    candidateEligible:asset.candidateEligible,discoveryStatus:asset.discoveryStatus,
    familyId:asset.familyId,taskIds:asset.taskIds,searchAliases:asset.searchAliases,
    implementationRole:asset.implementationRole,controlScope:asset.controlScope,stateOwner:asset.stateOwner,
    useWhen:asset.useWhen,doNotUseWhen:asset.doNotUseWhen,entry:asset.entry,
    api:{exports:asset.api.exports,members:asset.api.members,aliases:asset.api.aliases,styleParts:asset.api.styleParts},modificationMode:asset.modification.mode,modification:{mode:asset.modification.mode,allowed:asset.modification.allowed,restricted:asset.modification.restricted},
    documentation:asset.documentation.map(({href,viewKind})=>({href,viewKind})),relationships:asset.relationships,
  }))};
  return {[catalogPaths.json]:json(catalog),[catalogPaths.playground]:`// Generated by scripts/asset-index.mjs --write; do not edit.\nexport const assetCatalog = ${JSON.stringify(light,null,2)} as const;\n`};
}
