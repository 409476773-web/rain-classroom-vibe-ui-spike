# W8 干净环境安装与交付验证

2026-10-05（Asia/Shanghai）。验证当前已确认的本地交付包 `navigation-v042-f43719b448cf6043`；源码 ZIP SHA-256：`b47ff2c4097c1c595fba445ea2df9ecaac2f7ac47c6e7eb926b53ea5773384b5`。

## 实际执行与结果

- 在 `/private/tmp` 新建目录，从 ZIP 重新解压，初始无 `node_modules`；使用 Node v24.13.0、pnpm 10.28.1。
- 正常执行 `pnpm install --frozen-lockfile --store-dir <本次空临时store>`；188 个依赖全部下载，reused 0，退出码 0，55.2 秒。固定锁、根依赖声明和源码 ZIP 均未修改。未使用 ignore-scripts、临时缓存链接或原仓库依赖。
- 默认 pnpm 10 生命周期策略保留；源包各 workspace 无 preinstall/install/postinstall/prepare。全部 653 个依赖链接均解析到新解压包内，Rain workspace 链接也指向新解压包。
- 包内四 workspace 类型检查和构建通过；16 个测试文件、133 个测试通过。源码校验在构建前、构建后和开发服务检查后均通过。
- 本次新构建的 83 个 runtime 文件，与已确认 preview 的对应 83 个文件 SHA-256 全部一致。
- 新构建由独立临时 HTTP 服务启动；复用已有检查脚本，仅将 Playwright 导入绑定到本次安装的依赖。18 条 R/S/E 路由、E2 头像加载、E3 按题草稿、E4 实际点击固定与播放/笔记保持、E6 边缘恢复及显式保存均通过，无页面错误或失败请求。
- 文档中的 `pnpm dev --port <临时端口> --strictPort` 可启动；默认和 W6 HTML 中的真实入口均返回 JavaScript。初次附加检查猜错 `/src/handoff/main.tsx`，收到 Vite HTML fallback；初次记录保留为 `dev-startup-initial.*`，最终检查从服务返回的 HTML 读取入口并验证 JavaScript 类型，结果见 `dev-startup.json`。
- 两次开发服务和一个静态服务均已停止；未操作用户浏览器，也未停止 5368/5204 既有服务。

## 证据与范围

`summary.json` 汇总结果；安装、命令退出码、实际依赖归属、锁和 ZIP 摘要、83 文件比较、HTTP 和交互结果均保存在同目录。新解压目录保留在 `setup.json` 登记的临时路径，便于独立复核。构建仍给出单个共享 chunk 大于 500 kB 的提示，构建退出码 0。

这关闭当前本地交付包的“新目录正常安装、检查、构建和启动”验证缺口；不代表整个仓库质量检查通过，也不扩大为实际 Safari、VoiceOver、正式发布或生产迁移通过。历史包与其内嵌 README/verification 不回填，本次结果作为外部后续验证证据。
