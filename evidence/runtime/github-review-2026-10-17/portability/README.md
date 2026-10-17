# GitHub 审核工作集的体积与可移植性

本次只压缩送审副本，原始 card-v2 工作区和完整历史媒体仍在本地保留。普通源码、组件合同、文本证据、当前治理实际读取文件、封存来源闭包、必要归档与单测历史源码均保留。仅按 exclusions.json 的精确路径移出未链接的历史矩阵截图、浏览器原始 trace、重复导出和编译产物；广泛的历史工作区清单引用不自动等于当前依赖。

- `exclusions.json`：26,560 个精确排除文件、分组体积与必须保留的例外。
- `required-governance-reads.json`：原候选的 9,737 项实际读取观察；原 Evidence、Boundary 与 Tailwind B2 校验通过。
- `delivery-check.json`：副本处理结果与必要文件存在性。
- `restored-files.json`：初次宽泛排除后恢复的选定文件。

Date/Time 的历史治理逐字校验部分失败 trace，因此保留这 26 个固定 trace，不能改成一律忽略 trace.zip。必需测试归档包括 Token 原运行时、RN14 Starter 和 G6 锁定引擎来源包；它们不包含 node_modules、Git 元数据、环境文件、字体或已知不入库的身份截图。字体仍使用 README 中说明的系统字体和回退策略。

实际读取观察不是完整单测依赖跟踪；送审副本仍须执行本轮治理、相关测试、类型和构建验证。Git 托管不改变组件成熟度、人工验收、对比度、辅助技术或生产接入状态。

固定证据的补充：6 个历史 consumer/dist 文件虽然被普通 dist 规则忽略，仍被当前治理逐字读取，已精确恢复。4 个封存 node_modules/source-lock.json 同样属于固定证据；完整的 10 文件 force-add 白名单见 `force-add-files.json`。根 node_modules 中的 7 项实际运行依赖继续由正常安装重建，不上传。

直接文档链接的补复核：进一步检查 3,113 份 staged Markdown，仅针对本轮排除/删除的媒体，精确恢复 15 张被明确链接的图片（约 6717570 字节）。清单见 `omitted-media-link-audit.json`；`exclusions.json` 已从有效排除路径中移除这些文件，原始排除统计保留其测量时点。
