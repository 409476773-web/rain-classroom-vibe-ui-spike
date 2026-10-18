import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { readComponentImplementationBaseline } from "./seal-component-implementation.mjs";
import { componentImplementationSha as sha } from "./component-implementation-successor.mjs";
const before = readComponentImplementationBaseline(process.cwd());
const paths = [...new Set(execFileSync("git", ["ls-files", "-z", "--cached", "--others", "--exclude-standard"], { maxBuffer: 32 * 1024 * 1024 }).toString().split("\0"))].filter(path => path && !/^(evidence|artifacts|outputs|node_modules)\//.test(path));
const scope = {}, unassigned = [];
const assign = (file, taskIds, reason) => { scope[file] = { taskIds, reason }; };
for (const file of paths.sort()) {
  if (!existsSync(file)) { unassigned.push({ file, reason: "deleted file requires explicit review" }); continue; }
  const previous = before(file); if (previous && sha(previous) === sha(readFileSync(file))) continue;
  if (file.includes("asset-config")) assign(file, ["D02"], "参数配置同步实际渲染与可复制源码，四组公共API消费者与独立编译浏览器证据");
  else if (file === "docs/ai/README.md") assign(file, ["D01", "S01", "C03"], "更新真实统一模型与组合消费入口，保留原设计方法正文与原身份");
  else if (file === "docs/ai/composition-recipes.md" || file.includes("compositions-page") || file.includes("docs/examples/") || file.includes("composition-async") || file.includes("composition-recipes.spec")) assign(file, ["C01", "C02", "C03"], "完整本地组合异步保存、失败保留、必要文字角色与教学阅读；不改公共状态owner");
  else if (file.includes("consumption-contrast")) assign(file, ["C02"], "记录真实主题/表面必要文字与focus复合消费，保留失败和待设计状态");
  else if (file === "docs/ai/teaching-reading-recipes.md") assign(file, ["C03"], "补教学动作对象状态语义和局部阅读配方，保留现有图标字体事实源");
  else if (file === "docs/ai/config-example-contracts.md") assign(file, ["D02"], "四组配置到画面和源码的消费合同与真实导出上下文说明");
  else if (file.startsWith("manifests/")) assign(file, ["M02", "M03", "M04"], "按实际源码追加规范发现元数据，保留原身份与历史状态；逐文件范围供整合者审阅");
  else if (file.includes("asset-discovery-pilot") || file.includes("asset-catalog") || file.includes("asset-discovery-contract") || file.includes("asset-documentation-routes") || file.includes("asset-discovery.yaml") || file.includes("asset-index")) assign(file, ["M01", "M04"], "统一事实模型、实际入口及唯一路由投影；旧候选过滤与来源合同不变");
  else if (/^scripts\/(component-|seal-component-|verification-helpers|deep-review-successor\.test|github-review-successor\.test|g1-g6-closeout-governance\.test)/.test(file) || file === "status/current-phase.yaml" || file === "tests/node-runtime.d.ts") assign(file, ["G02", "B09"], "有限后继绑定与测试闭包承接，保留此前来源锁、phase和人工接受，新增本批状态");
  else if (/^scripts\/(evidence-output|run-component-check|implementation-inputs|g5-evidence|verify-implementation-history|save-component-recovery)/.test(file) || file === "playwright.config.ts") assign(file, ["G01", "B00"], "测试输出隔离、实际输入绑定、历史哈希校验和可恢复本地阶段保存");
  else if (file.includes("verify-css-variables") || /(?:drawer-refinement-consumer|bklit-validation\/(?:main|catalog-main))\.tsx$/.test(file)) assign(file, ["B01"], "核验CSS真实入口依赖与局部消费者；仅在实测缺失后补齐样式入口");
  else if (file.includes("playground-status") || file.includes("library-status.generated")) assign(file, ["B09"], "从本批有效状态记录生成当前摘要，技术、人工、对比度、发布独立");
  else if (file.includes("rn14-starter") || file.includes("asset-starter") || file.includes("starter-assets.generated")) assign(file, ["B08", "S01"], "模型派生Starter合同闭包与生成指南，保留M1/M2和路径哈希拒绝策略");
  else if (file.startsWith("tests/e2e/")) {
    const tasks = /runtime-state/.test(file) ? ["B02", "B03", "B04"] : /button-contract/.test(file) ? ["B07"] : /asset-discovery/.test(file) ? ["D01", "B09"] : /css-/.test(file) ? ["B01", "C01"] : ["G01"];
    assign(file, tasks, "本批窄浏览器验证或原测试仅输出适配；保留既有断言、阈值和历史基准读取");
  } else if (/workspace(?:-state)?\.test\.tsx?$/.test(file)) assign(file,["B02"],"补合法模式子集、恢复与唯一状态owner边界测试，不重复修改已有修复");
  else if (/input(?:-field)?\.test\.tsx$/.test(file)) assign(file,["B03"],"补真实form reset取消、外部关联、默认值与IME一致性边界回归");
  else if (/tree\.test\.tsx$/.test(file)) assign(file,["B04"],"补根StrictMode请求重放、晚回调、卸载和并行分支隔离回归");
  else if (file.endsWith("g5-component-pages.test.tsx")) assign(file,["B05"],"补当前满分非整数草稿校验边界，保留全部既有示例断言");
  else if (file.endsWith("button/button.tsx") || file.endsWith("form-composition.md")) assign(file,["B07"],"澄清现有text aria-disabled与普通disabled/loading合同，不改变既有行为视觉");
  else if (file.startsWith("apps/playground/src/")) assign(file,["D01", "M02"],"任务家族与规范资产入口、共享文档路由和旧链接兼容，整合者负责共享UI");
  else unassigned.push({file,reason:"requires an explicit task assignment before sealing"});
}
writeFileSync("evidence/runtime/component-implementation-2026-10-18/run-01/governance/scope-proposed.json", JSON.stringify(scope,null,2)+"\n");
writeFileSync("evidence/runtime/component-implementation-2026-10-18/run-01/governance/scope-unassigned.json", JSON.stringify(unassigned,null,2)+"\n");
console.log(JSON.stringify({ proposed: Object.keys(scope).length, unassigned },null,2));
