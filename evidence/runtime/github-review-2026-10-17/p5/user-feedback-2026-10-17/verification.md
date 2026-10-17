# P5 用户反馈修订 · 2026-10-17

userFeedback: received  
humanGate: accepted  
humanGateScope: p5-current-select-small-secondary-comparison-button-and-pdf-visual-revision

用户要求使用标准下拉选择菜单、缩小“查看版本比较”二级按钮、采用库中 PDF 样式。本次只修改 page.tsx/page.css；不调整业务规则或共享资产。

## 改动与依据

- 课程筛选及详情中的同类选择框由 NativeSelect 改为公共 Select，36px、单选、不可清空，继续由页面持有原值。保留 FormItem 可见标签与原筛选范围。
- 比较入口继续使用 secondary，尺寸由 medium/36px 改为 small/32px；保留打开、Escape 关闭及焦点返回。
- 资源标题与范围检查的 PDF 标识使用 FileFormatPdfIcon（库内可用 intrinsic 资产）；移除标题处自制蓝底通用文件图标及重复 PDF 文字。48×56布局区域保持，标题图标用40px，未改文件本身或保存动作图标。
- 读取 prototype-design.md、Select/Button/Attachment 合同及真实实现、图标 catalog；按 Rain Designer v0.2.1 和 designer.md v0.5 的局部调整范围处理。第一次脚本定位失败按 systematic-debugging 核对可访问树：FormItem 将实际名称设为“课程”。只修正脚本，原输出保留在 harness-attempt-1。

## 已执行检查

- typecheck、build：通过；构建保留已有大 chunk 提示。
- Chromium 原有13组交互回归：13通过，0失败，0 pageerror。
- 1440×1000、777×788、390×844定向检查：3通过，0失败，0 pageerror。两个选择框均为标准 listbox；课程四选项、筛选外选择保留、备注保留、详情只读对象切换、Escape 仅关闭菜单、焦点返回与比较弹窗可用。三个窗口均无页面或菜单横向溢出。
- PDF 图像加载成功，资产身份为 icon/file-format-pdf，保留原有内置颜色；比较按钮三窗口均实测32px。
- integrity-report.json：固定 Starter 的2494份公共源/锁/基础配置在 prototype 和 starter-base 中均0变化；本轮另保护2493份文件（含公共包、锁及主入口）0变化。

## 实际视觉比较

已查看同条件1440px前后图及777px/390px修改后整页与展开菜单。标题旁由蓝色手工文档块变为红色PDF资产，标题及元信息阅读起点保持；比较入口由36px降为32px，仍位于版本变化区，低于检查范围主操作。课程菜单由系统弹出样式变为带选中勾选、圆角和统一行距的库内浮层，四个课程选项在777px与390px均完整可读。窄屏版本标记仍与资源正文共用内容列，标题无新增挤压。未见需要额外位置补偿的相关组合。

自动检查和上述视觉比较属于开发自查。2026-10-17，用户在本轮三项修订交付后回复“确定”，已记录为这三项当前视觉修订接受；[确认原话、范围与源码绑定](manual-acceptance.json)。未新增 Safari、真实触屏或屏幕阅读器结论。原型仍为本地虚构样本，未接真实保存。

[桌面](after-1440.png) · [777px](after-777.png) · [390px](after-390.png) · [777px下拉](select-open-777.png) · [390px下拉](select-open-390.png)

[定向结果](feedback-results.json) · [13组回归](regression/behavior-results.json) · [源码](source/) · [完整性](integrity-report.json)
