# R05 · Starter 必读合同与组合消费

日期：2026-10-17（Asia/Shanghai）。System Mode；本轮只修既有导出脚本、测试与实际便携交付，不升级依赖，不自动发布，不迁移历史人工接受。

## 复现与修复

先添加 M1/M2 导出回归：`prototype-design.md` 的反引号路径要求读取 `manifests/ui/resizable.yaml`，两种原始导出均缺失该文件，测试按预期失败。

`rn14-starter.mjs` 现从实际附带的 `docs/ai` 指南同时解析 Markdown 链接和反引号中的 Manifest 路径，补齐推荐合同；原有导出清单保持兼容。生成的 `docs/ai/starter-index.md` 通过 AGENTS 可达，列出本包真实指南、合同与组合源码。Manifest 的 sourceEvidence、历史 Registry 和导航/G6 审阅材料不递归导出，边界在索引中明示。

三个小组合的唯一来源为 `apps/playground/src/docs/examples/*.tsx`，原路径随包保留供指南链接访问；相同字节复制到 `apps/prototype/src/composition-examples/` 并接入 `#compositions`。因此真实公开 API 在独立应用中参与 TypeScript 检查与 Vite 构建，没有根目录别名、依赖升级或私有源码导入补丁。仅携带三份示例，不携带 Playground 应用壳。

测试还逐条检查可达指南中的 Markdown 本地链接，以及反引号中的 `manifests/`、`packages/` 文件路径；避免只检查可点击链接而再次漏掉必读合同。

## 独立目录验证

| 交付 | 快照 | 精确离线安装 | typecheck | build | 安装构建后文件锁 |
| --- | --- | --- | --- | --- | --- |
| M1 | `rn14-f8a782f6d1c6f6ce` | 通过 | 通过 | 通过 | 通过 |
| M2 | `rn14-b6ba96953610d862` | 通过 | 通过 | 通过 | 通过 |

- M1：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/outputs/deep-review-starters-2026-10-17-M1`
- M2：`/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/outputs/deep-review-starters-2026-10-17-M2`
- 命令：`pnpm install --frozen-lockfile --offline --ignore-scripts --package-import-method=copy` → `pnpm typecheck` → `pnpm build` → 原工作区 `node scripts/rn14-starter.mjs --check <目录>`。
- 两份 Vite 构建均有大于 500 kB 的 chunk 提示，不是构建错误；没有为本修复引入打包重构。
- 日志：本目录 `starter-M1-install.log` / `starter-M1-typecheck.log` / `starter-M1-build.log` 与 M2 对应文件。实际目录、文件数量和锁校验见 `starter-runtime.json`。
- 启动独立应用后访问 `#compositions` 可操作三个组合；现有 M1 A/B 与 M2 A/B/C/D 入口保持可用。

## 测试与边界

Starter 的 8 项导出、路径、完整 Rain Designer 分发、文件锁与组合复制检查通过。完整 `scripts/rn14-starter.test.ts` 在并行修订期间为 8 通过 / 1 失败：剩余测试是原有治理历史检查，明确检出 `.deep-review-playwright.config.ts` 在本轮 successor 封存后继续变化。该记录保留在 `starter-tests.log`；父任务完成统一封存后需要重跑完整脚本，不能把本条写成已通过。

三组合的源工作区浏览器行为和视觉证据由组合子任务记录，本文件只证明独立 M1/M2 的精确依赖安装、类型与构建消费、导出路径及来源锁。没有新增人审、Safari/VoiceOver、真实触摸、对比度、生产接入、包/Registry 发布、Figma 或 Git 操作。

## 最终补充验证

统一源码封存后，完整 Starter / Tabs / 本轮 successor 三个文件合计 25 项全部通过（2026-10-17 23:30，本地时间）；Starter 的 9 项全部通过。先前记录保留为中途结果。串行组一度在纯内存 phase 测试中重复读取相同证据而超时，最终使用已有只读 traversal 作用域避免重复读取；未删除断言、未调高超时，也未给文件变异测试共享缓存。

最终日志：`logs/rain-deep-review-governance-final-tests.log`。父任务另再次验证两份交付文件锁，快照仍分别为 `rn14-f8a782f6d1c6f6ce` / `rn14-b6ba96953610d862`。
