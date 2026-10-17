# G2 review07 · 跨页反馈与自查

本轮目标：最左平台 hover/current 更清楚、展开与单图标模式尺寸一致；云盘文件名与图标15px、主次文字层级使用现有Token；逐页修复可复现的小视觉/交互问题。G2人工评审仍待用户，不改历史G1接受范围。

## 已修复

| 范围 | 结果 |
| --- | --- |
| R1–R6、S1–S6实际平台与A2图标导航 | Hover使用FillNeutralAlpha2；current与current-hover使用FillBrandSolid3。Dark只放在实际平台区域；正文保持现有主题。R4批改没有平台区域，不虚构该区域。 |
| NavigationList图标 | 官方图标为span mask，原SVG规则未命中；现leading固定18。R2保留15、S5保留20，同页展开/收起一致，不按1176批注窗口新增断点。 |
| R3云盘 | 文件名和真实图标15；TextNeutral1深色；大小和时间TextNeutral6浅色。 |
| R3网格 | 正确文件类型图标；原选择状态通过Checkbox显露；打开文件与选择分开。 |
| R1/R3 | 固定按钮名称跟随实际固定动作；expanded内部208px越过有padding区域，改填满可用宽度，保留pane默认208。 |
| R3错题 | 序号列64px/nowrap，窄画板不把“序号”拆两行。深层Tree计数横滚可达，保留现有滚动策略。 |
| S1–S6 | 恢复默认也恢复拖动宽度与默认会话；业务草稿宿主保持。 |
| R4互动 | 过滤/搜索数量说明正确显示2/6、1/6、0/6；完整结果仍为原6组文案。 |
| S5、A2/A5 | 使用库中实际Avatar图片；取消hidden-picture+字母覆盖。S5两个模式均32px。A1历史原稿占位保留，未宣称所有头像重构。 |
| A4/Connections | 无匹配搜索有role=status提示，并保持Escape焦点返回。 |
| R5/S6播放条 | 原稿实测4px轨道；现用Line4和浅NeutralSolid3、BrandSolid2拇指，保留16px输入区域。 |
| 禁用NavigationList | 不再出现表示可点击的hover高亮。 |

## 实际检查范围

Gallery八类×1200/1440/1600共24布局实操；R1/R3四场景×三宽度12状态与54操作序列；R4两场景/R5/R6四视图/S1–S6共42修前布局；13定向业务操作场景及1个播放条检查。矩阵数量与操作序列数量不当作独立测试数。

最终统一回归、截图、源锁和保护结果以[review-evidence-index.json](review-evidence-index.json)为准。105项focused unit；正式browser包括36个平台宽度/状态合同、2个空搜索、1个R2状态、7个W3、38个W5和6个review06回归；截图专用case单独跳过。Playground编译构建与独立metadata校验单列。测试项目完整typecheck仍保留7项既有错误；没有更改依赖或放宽配置。

## 对照证据

- 用户两张原始附件：[user-evidence/](user-evidence/)。
- 修前平台截图/尺寸：[navigation-before/](navigation-before/)。图标修复后的中间色证据保留在navigation-icons-after，最终用platform-final。
- 最终平台hover与双模式：[platform-final/](platform-final/)，[R3展开整页](platform-final/R3-expanded-workspace.png)。
- 文件主次层级：[r1-r3/README.md](r1-r3/README.md)；内部宽度最终以containment最后版本为准，after04是此前中间源。
- Gallery全部操作：[navigation-component-review.md](navigation-component-review.md)；A2/A5与A4/Connections最终修复在根正式回归中验证。
- R4–R6/S业务操作：[r4-r6-owner/README.md](r4-r6-owner/README.md)。
- review06原尺寸/浅进度/头像/恢复逻辑的本轮回归保存到prior-feedback-regression；review06原证据不改。

## 边界

使用实例样式platform-navigation.css随Recipe消费；业务闭包14文件、R2独立闭包9文件、Gallery可选闭包另列，公共family库不反向依赖业务示例。没有新增Token值、重置全局主题或替换默认组件外观。原稿SHA保持d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c；G1历史sourceSnapshot/验收不改。

Chromium实操覆盖；没有将它视为VoiceOver、完整对比度、全浏览器或真实视频/PDF/后端验收。未执行Git提交、push、发布、Classic/Figma写入。W6–W8与G3没有借本轮反馈自动完成。
