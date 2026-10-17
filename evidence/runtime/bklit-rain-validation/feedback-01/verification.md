# 图表标注间距与文字层级反馈01

用户依据四张截图要求：左右纵轴数字与图形留出间距，坐标、图例、桑基标签等辅助文字调浅。

模式：Prototype Mode / local-experiment。范围仅Bklit对照页、页面私有YAxis及来源记录；两列采用同样间距修正。方法V04用于文字层级，D02用于标签与图形留白。复用现有色彩、字体和间距Token，图形配色与原生动效沿用。

验证：测量纵轴标签到首尾柱子的实际距离；查看桌面及390px窄屏、桑基标签和悬停读数；运行现有六项Bklit检查、类型检查与独立构建。辅助色需结合真实背景观察，尚未代替用户视觉确认。

状态：局部修订完成，待用户视觉审阅。修订前源码和来源清单已保存在before目录。

## 修订与验证结果

- 两列Y轴标签内边距由8px调整为20px，同时增加对应绘图区边距12px。真实柱形向外延伸的半宽已计入；1440px、900px、390px视口下左右实际空隙分别约12.72px、8.92px、16.42px，无横向溢出，见[label-spacing-facts.json](label-spacing-facts.json)。
- Rain坐标、日期、图例采用现有Text/Neutral/5（`#7485A8`）；桑基标签采用Text/Neutral/4（`#56688F`），兼顾叠在彩色流线上的辨识。两列图例和桑基标签均为Regular 400。原生列使用原有中性色家族中更浅的stone-500。图形颜色、提示精确值、KPI和动效不随辅助标注一起淡化。
- 页面私有YAxis增加CSS变量间距入口，缺省仍为上游8px；source-lock已更新，74个文件本地哈希全部核对一致。其余上游源码未增加改动。
- 六项现有Bklit浏览器检查通过（[playwright.log](playwright.log)），类型检查exit 0（[typecheck.log](typecheck.log)），独立构建exit 0（[build.log](build.log)）。构建体积提示延续首轮，未扩大为体积优化任务。
- 浏览器核对[组合图](composed-rest.png)、[桑基图](sankey-rest.png)、[窄屏](narrow-reduced.png)及悬停状态。12个桑基标签均实测Regular 400，见[sankey-label-facts.json](sankey-label-facts.json)。
- 本次用户反馈允许两列进行相同的标注间距与层级微调，属于对首轮严格保留原生外观范围的明确补充。仅登记页面局部经验，未升级公共Token、全库默认或视觉Gate。
