# Rain 导航本地可编辑包

这是本地试验源码快照。共享 UI/Layout 保持 Registry Candidate、未发布；R/S/E 业务页面仍为 Local Experiment，数据与服务均为 Mock。历史 G2 视觉验收与 W7 行为修复独立记录，不授予生产迁移、Figma 组件绑定或新的 Human Gate。

## 免依赖预览

解压相邻的 `navigation-v042-2026-10-04-built-preview.zip`，在其父目录运行：

```sh
python3 -m http.server 5357 --bind 127.0.0.1 --directory navigation-v042-2026-10-04-built-preview
```

浏览器打开 `http://127.0.0.1:5357/`。预览根目录含 `index.html` 和本地 assets；无需原仓库、Vite 或开发依赖，静态资源 base 为 `./`。源码 ZIP 不含 dist；若从源码已完成构建，可在源码包根目录运行：

```sh
python3 -m http.server 5357 --bind 127.0.0.1 --directory apps/playground/dist
```

## 安装、运行和编辑

在源码包根目录使用冻结锁文件安装相同版本，再运行本包工具链：

```sh
pnpm install --frozen-lockfile
pnpm verify:source
pnpm typecheck
pnpm test
pnpm build
pnpm dev --port 5357 --strictPort
```

离线安装是已有完整 pnpm 缓存时的可选方式，例如：

```sh
pnpm install --frozen-lockfile --offline --ignore-scripts --package-import-method=copy --store-dir /path/to/existing-pnpm-store
```

本轮离线安装真实失败：现有缓存缺少 `playwright@1.62.1` 压缩包，下载数为 0，未改依赖或转联网安装。本轮四个 workspace 类型检查、119 个导航测试和构建使用逐依赖的既有缓存链接验证；所有 Rain 链接指向包内副本，临时链接已移除。包不附 `node_modules` 或缓存；正常安装使用用户自己的环境与冻结版本。

根依赖与 app 依赖声明保持原样，运行脚本只覆盖本包的四个 workspace。默认入口 `index.html`；`#R1`–`#R6`、`#S1`–`#S6`、`#E1`–`#E6` 可定位场景。原 R2、W3、W6 独立 HTML 入口也保留。修改 `apps/playground/src/recipes` 内的副本；包内修改不会同步原仓库。恢复包内默认会重建当前页面的包内实例，使内存布局偏好和业务草稿恢复 Mock 默认；浏览器本地记录保持原样。

## 验证与来源

`source-lock.json` 锁定复制文件、派生宿主和生成脚本。`pnpm verify:source` 校验交付快照；有意编辑后会报告变化，恢复文件后再次校验。实际检查记录见 `verification/summary.json`。本轮导出构建的 HTTP 检查已通过全部 18 个 R/S/E 路由、R5 布局/专注默认恢复、E6 双侧恢复/明确保存/草稿默认恢复、无关 localStorage 保留；页面错误和缺失资源均为 0。独立 ZIP 解压检查由后续记录补齐，自动检查不替代 Human Gate、AT 或对比度确认。

原仓库：/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2
冻结记录：evidence/runtime/navigation-v042/w7/final-source.json
详细来源：`provenance.json`。Manifest/Registry 的历史元信息逐字保留；其报告、截图、Figma、参考 HTML 等引用并未全部打包。`provenance.json` 明列未附历史引用及原路径，不能把这些元信息链接解释为包内文件。独立消费所需源、样式和 runtime 资产已闭合，历史 evidence 约 1.9GB 未复制。

本包未增依赖，没有发布、迁移、Figma 或 Git 操作。
