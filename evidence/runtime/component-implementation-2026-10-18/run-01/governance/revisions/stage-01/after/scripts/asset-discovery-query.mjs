/** Shared pure query for CLI and Playground; no filesystem or browser state.
 * @param {any} catalog
 * @param {{query?: string, task?: string, family?: string, includeLocal?: boolean}} [options] */
export function queryAssetCatalog(catalog, { query="", task, family, includeLocal=false } = {}) {
  const term=query.trim().toLocaleLowerCase();
  const rows=catalog.assets.filter(asset=>{
    if (!includeLocal && !asset.candidateEligible) return false;
    if (task && !asset.taskIds.includes(task)) return false;
    if (family && asset.familyId!==family) return false;
    const words=[asset.id,asset.name,asset.description,...asset.useWhen,...asset.searchAliases,...(asset.entry.exportNames??[]),...asset.api.members.map(x=>x.reference),...asset.documentation.map(x=>x.href.slice(1)),...catalog.vocabulary.tasks.filter(x=>asset.taskIds.includes(x.id)).flatMap(x=>[x.label,...(x.searchAliases??[])]),...catalog.vocabulary.families.filter(x=>x.id===asset.familyId).flatMap(x=>[x.label,...(x.searchAliases??[])])];
    return !term || words.join(" ").toLocaleLowerCase().includes(term);
  });
  return rows.sort((a,b)=>{
    const exact=x=>[x.id,x.name,...(x.entry.exportNames??[]),...x.api.members.map(y=>y.reference),...x.searchAliases].some(v=>v.toLocaleLowerCase()===term)?0:1;
    return exact(a)-exact(b) || a.id.localeCompare(b.id);
  });
}
