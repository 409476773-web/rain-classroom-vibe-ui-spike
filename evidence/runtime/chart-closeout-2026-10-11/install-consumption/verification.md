# 完整打包、严格安装与独立图表消费

最终当前来源检查通过。最终数据为 [run-02/facts.json](run-02/facts.json)，原始输出为 [run-02.log](run-02.log)。本项与Root另行完成的170变体复制缓存检查分别记账；不将20入口或40次浏览器运行累加成新的变体数量。

## 当前包与真实安装

从冻结后的实际 `packages/ui` 与 `packages/foundations` 执行 `pnpm pack`，没有另造精简包。完整UI含2299份源码、2301个文件、905项声明exports；Foundations含36份源码、38个文件、9项声明exports。每份源码及每项export对应文件均与当前仓库逐字节一致；UI原生 `src/charts/vendor/LICENSE` MIT许可随包保留。

新宿主为 `/private/tmp/rain-chart-strict-tarball-consumer-hkLrjH`，Node24.13.0、pnpm10.28.1、macOS arm64。依赖store与metadata cache起初为空；使用官方npm registry下载依赖，没有复制旧工作区node_modules。实际严格peer安装exit0，解析190包、下载及安装126包、reused0，耗时80.745秒，peer warning为0。原始 [安装记录](run-02/cold-store-strict-install.log) 与 [实际依赖树](run-02/dependency-tree.log) 保留。

安装禁用包脚本。`pnpm pack` 按官方规则将UI的Foundations `workspace:*` 转为0.0.0；只有独立宿主以pnpm override将该版本绑定到同次生成的真实Foundations tarball。没有更改候选版本、公开exports或共享package manifest。两包仍是未发布的private0.0.0候选。

| 完整tarball | SHA256 |
| --- | --- |
| UI | `7cb63a0d8c0a831415df9d562d5eb8e3dc71b6aac162910608a54fd3d97c36a0` |
| Foundations | `599ff3f282909318a25cf833928ec4eee0ae84c13f80a1f96c0f6f9d889538b1` |

完整安装后的所有源码再次匹配当前仓库；所有依赖软链接及解析模块均留在新宿主中。上述905/9项是完整包的export文件存在与字节检查，不表示对每个非图表UI出口作功能验收。

## 当前真实下载与浏览器

通过当前生产源码导出函数取得19个默认图表下载及官方 `line-trio-brush` 下载，共20套真实文件。包括Matrix的HTML分类表与Network的关系样本，保留当前数据、配方及原始main/index。宿主批量HTML只为入口添加路径前缀，并接入明确的Tailwind源码扫描。直接依赖包含下载文件实际导入的Motion；没有依赖hoist偶然使裸导入可用。

20套当前下载使用安装后的公共包完成严格类型检查与Vite/Tailwind构建，均exit0。19项Registry文件集合的相对导入与资源闭包通过；此项使用完整包，不宣称最小单项Registry安装。

client构建解析2267个绝对源码模块，SSR构建解析1942个；alias均为空，模块路径外逃0，外部依赖软链接0。检查期间及结束后2360个包／下载来源文件SHA未变化。

20个真实构建页面分别运行于Chromium1440px与390px、减少动效，共40次。HTML响应与实际构建文件SHA一致；对应图形或Matrix表可见，SVG没有NaN/Infinity，页面宽度不超过视口。page error、请求失败、HTTP错误及外部浏览器origin均为0。

独立安装后的Brush使用实际鼠标与键盘操作：初始30行；ArrowRight后29行且可见左手柄同步移动；左右拖拽同步改变窗口、路径与精确数据行数；reset恢复30行、原始全部数值及原路径。1440px右拖后24行、左拖后25行；390px分别21行、22行。最终图像为 [宽屏](run-02/brush-1440-reduce.png) 与 [窄屏](run-02/brush-390-reduce.png)，已检查图像布局，尚不替代用户视觉Human Gate。窄屏精确表由原有可聚焦局部横向滚动容器承载。补充实测聚焦该容器后按ArrowRight，局部scrollLeft从0到22，原本右缘裁切的第一行平板值102完整进入容器，页面宽度仍390px；见 [键盘横向读取](run-02/table-scroll-supplement.json) 与 [读取图像](run-02/brush-390-keyboard-table-scroll.png)。该补充不增加40个主浏览器案例的计数。

## SSR边界

通过新宿主安装的公共包生成Node SSR bundle；没有window/document/ResizeObserver shim，也没有工作区alias。观察与预检一致：

| 实际renderToString样本 | 结果 |
| --- | --- |
| 公共DataBar | 输出精确语义读数“人数，25人” |
| 公共Line、Live | 输出未测量的容器shell，SVG为0 |
| 默认Line示例 | 输出原始数据表，图形仍未测量 |
| 默认Live示例 | 真实拒绝：`ReferenceError: document is not defined` |

当前完整源码示例的支持边界为浏览器CSR；默认Live初始化读取document.hidden。此项将真实限制如实记录，不声称完整SSR、hydration、额外框架或浏览器外运行时支持。

## 原始失败与本轮修复来源

最初旧Brush3配React19的空store严格peer失败保留于 [预检记录](peer-preflight-facts.json)。Brush4官方候选的43包严格安装与API检查分别保留，不替代最终完整安装。

完整第一轮 [run-01/facts.json](run-01/facts.json) 的126包严格安装已通过，但类型检查真实失败：Brush4 exports阻止三个旧type-only lib深层导入；同时私有宿主缺少源下载直接需要的Motion声明。没有使用alias绕过。Root随后最小修正两个native公共type导入，并按实际失败修正Brush受控extent回写、更新source-lock；本agent仅补私有宿主Motion直接声明。第一轮源码、脚本版本及日志保留，最终第二轮重新打包新源码并使用新的空store执行。

本agent没有修改共享运行时、Registry、README或lock；上述Root修复全部包含于最终实际包。关键最终来源：

| 当前来源 | SHA256 |
| --- | --- |
| chart-brush.tsx | `683f693a7609d093c9c893498ca984d4d4e8e8b180d93b39ddcac6911eb1354a` |
| chart-brush-handle.tsx | `8f4533a77d70037d7a4dd3d8e17c23b998b376ff0068bd930036101a156348da` |
| source-lock.json | `3fe8489aabc28fb5fff71ebb4857d314e6605c411b5e9eef8e9c083313328a33` |
| UI图表README | `d3e52cf81bbcb39a7ef31690538797788871b39cd072c0b85b08ffe883872f03` |

最终facts SHA256为 `ce2b796e0c5aaff868dc2d29276260dc9da85748a6dbed9729f92a17ddcabe85`。安装、构建、限定浏览器与边界观测是技术证据，不授予人工验收、出版／发布、业务迁移、生产实时数据、Safari实机、VoiceOver或实体触摸验收。
