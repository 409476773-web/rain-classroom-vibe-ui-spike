# 安装与SSR预检

本目录属于2026-10-11图表技术收尾；仍是未发布候选。所有预检使用私有临时宿主，没有修改共享依赖、运行时或旧证据。

当前 React `19.2.8` 配合旧 `@visx/brush@3.12.0`，空store离线安装因无缓存失败；联网严格peer安装真实失败，原因是该Brush及其同代依赖声明仅接受React至18。原始失败见 `peer-preflight-facts.json` 和 `cold-store-online-strict.log`。

同代 `@visx/brush@4.0.1-alpha.0` 候选联网严格安装43包通过，exit 0，没有peer warning；保持React19及其它直接依赖。两份Brush官方tarball与其npm metadata SHA512 integrity一致。静态API检查保留当前适配所用的14个props、3个BaseBrush方法、start/end/extent及类型入口。API存在不证明交互等价；最终依赖修复由Root负责，需同步Registry与lock并重验真实Brush行为。见 `peer-candidate-facts.json`、`brush-api-facts.json`。

SSR预检通过Vite生成Node bundle，在没有window/document/ResizeObserver shim的Node环境调用React renderToString。公共DataBar输出精确语义读数；公共Line、Live组件只输出没有测量宽高的shell（SVG数为0）。默认Line示例可输出原始表，默认Live示例因初始化读取document.hidden而真实抛出document is not defined。当前完整示例的支持边界为浏览器CSR；上述有限server render观测不构成完整SSR、hydration或任意框架支持。见 `ssr-preflight-facts.json`、`ssr-preflight-02.log`；第一轮工具路径解析失败保留于 `attempts/ssr-01/`。

最终 `run.mjs` 与 `browser.mjs` 在共享依赖与源码冻结后执行：真实pnpm pack完整UI/Foundations、保留MIT和所有源码、空store严格peer安装、19默认真实下载加官方Brush下载、公共入口类型与构建、Registry19闭包、无alias/外逃路径审计、独立宿主SSR边界复验以及宽窄屏真实Brush左右拖拽/键盘/重置。此项与复制已安装缓存的170入口验证分别记账，不将局部package或API预检称为完整消费通过。
