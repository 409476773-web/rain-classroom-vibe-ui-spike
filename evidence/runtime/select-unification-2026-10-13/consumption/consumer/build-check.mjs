import { build } from "vite";
import assert from "node:assert/strict";
import { writeFileSync, realpathSync } from "node:fs";
import { isAbsolute } from "node:path";
const host=realpathSync(process.cwd());
await build({plugins:[{name:"isolated-g5-audit",generateBundle(){const modules=[...this.getModuleIds()].filter(id=>isAbsolute(id.split("?")[0]));for(const id of modules)assert(realpathSync(id.split("?")[0]).startsWith(host+"/"),"Module escaped host: "+id);writeFileSync("module-paths.json",JSON.stringify({moduleCount:modules.length,externalModulePaths:0,modules},null,2));}}]});
