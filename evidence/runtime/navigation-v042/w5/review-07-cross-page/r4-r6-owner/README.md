# Review07 · R4–R6 / S1–S6 owner 自查

日期：2026-10-03。范围为当前 `card-v2` 的页面 Recipe；G1 / G2 的人工验收状态保持独立。

## 实际查看与操作

先在现有 5198 预览逐页打开 R4 互动/批改、R5、R6 表单/表格/状态分组/画册，以及 S1–S6（S4 两场景），按 1200 / 1440 / 1600 × 800 保存 42 张整页截图和 DOM 几何。见 [before/measurements.json](before/measurements.json)。未发现主工作区横向控件越界；队列、表单、讲稿的纵向超出均有对应滚动容器，Tabs 的连接肩部不作为溢出缺陷。当前页的正常 Mock 入口不扩展为真实业务服务。

方法：D05 用实际容器检查窄宽度与状态；D02 保留工作区分区关系；V05 按现有 Avatar 合同使用完整组件；V04 保留 review06 已确认的字级和进度条浅色。用户截图 viewport 不新增断点。

## 已复现并修复

| 问题 | 修复前事实 | 当前行为与依据 |
| --- | --- | --- |
| S5 账户头像错误 | `picture` 被隐藏，叠加“林”；compact 实测 29 × 0 | 使用官方默认 Avatar32 图片，账户文字单独 class，Avatar 不再受 footer 文字的隐藏/伸缩规则影响；compact / expanded 三宽度均 32 × 32 |
| S1–S6“恢复默认”未恢复宽度 | S5 课程导航 216 → 246 后，恢复默认仍 246 | 通过现有 controller `SWITCH_CONTEXT(spec)` 复原当前 spec 的默认布局与会话，回到 216；不重建业务草稿宿主，实际文本保留 |
| R4 小组过滤结果说明错误 | 未评分只剩 2 组，footer 仍写“展示 6 组” | 过滤/搜索时显示实际 `2 / 6`、`1 / 6`、`0 / 6`；全部结果保留原 6 组文案，选中详情不因过滤而丢失 |
| R5 / S6 原生播放条深色粗轨道 | 现有 input 命中区域 16px，默认轨道深色；未消费现有轨道/拇指颜色 Token | 实际打开冻结原稿 R5 并测得其 range 为 4px；当前命中区域仍为 16px / 770px，显示轨道使用 Line4、FillNeutralSolid3，拇指使用 FillBrandSolid2；没有新增控制状态或虚假进度 |

主题消费补齐：两份 owner CSS 导入根负责的 `platform-navigation.css`；R5、R6、S5 实际平台区域消费传入的 inverse / dark Token，正文保持现有主题。R4 grading 本身没有平台导航区域，其 spec 为 queue / review；R4 interaction 已有主题传递保留。

## 验证与证据

- 默认宽度测试先失败 246 ≠ 216：[default-reset-red.log](default-reset-red.log)。
- 小组过滤计数测试先失败“展示 6 组”：[filter-count-red.log](filter-count-red.log)。
- 19 个 owner 单元通过（原 17 + 2 个行为回归）：[owner-unit-green-final-02.log](owner-unit-green-final-02.log)。首轮新测试 matcher 的两个 TypeScript options 已改为精确锚定正则；没有放宽配置。
- 13 个定向真实浏览器场景通过，0 pageerror，执行期间 5 个 source hash 稳定：[owner-browser-results.json](owner-browser-results.json) / [owner-browser.log](owner-browser.log)。覆盖 S5 三宽度头像与默认恢复、R4 搜索/过滤/选中恢复和跨卷/题草稿、R5 模拟播放/暂停/跟随/讲稿、R6 四视图/新增字段/预览/页面草稿，以及 S1–S6 临时查看/恢复/专注。
- 最后追加的 R5 CSS 在以上 13 场景后完成；其独立 Chromium 检查通过：[range-browser-results.json](range-browser-results.json)。键盘 ArrowRight / End / Home 实际值为 1 / 1500 / 0，跳到事件 984，模拟播放到 985 后暂停保持；0 pageerror。[range-pixel-measurement.json](range-pixel-measurement.json) 从真实截图的 Token 色像素量得轨道 4px。Firefox / Safari 未实测；相应伪元素只是本地浏览器适配，未声称跨浏览器验证。
- 修复前确证数据：[before/bugs.json](before/bugs.json)、[原稿 range 测量](before/range-geometry.json)与[原稿实际截图](before/approved-R5-range.png)。当前 21 张操作后截图见 [after/](after/)；例如 [S5 expanded](after/S5-expanded-1440.png)、[R4 过滤未评分](after/R4-filtered-ungraded-1440.png)、[R4 草稿恢复](after/R4-grading-restored-1440.png)、[R5 最终轨道](after/R5-range-tokens-1440.png)。
- 第一次浏览器检查 9 / 13，4 个失败来自重复按钮与 sr-only Checkbox 的脚本定位，诊断保存于 [first-browser-diagnostic/](first-browser-diagnostic/)。改为范围内按钮与真实 label 点击后 13 / 13；未用 force 绕过产品交互。脚本中文 file URL 解码错误产生的本次临时编码目录已搬回实际证据路径，只移除其空目录。

S5 品牌颜色一致性与 S1 选中底色的边缘观察已报告根负责评估，本 owner 不把尚未确证的样式候选当交互缺陷。未验证 VoiceOver、全面对比度、跨浏览器、真实服务 / PDF / 视频接入；没有宣布 G2 人工通过。公共组件、Token 源、Classic、Figma、依赖和 Git 不由本 owner 修改。
