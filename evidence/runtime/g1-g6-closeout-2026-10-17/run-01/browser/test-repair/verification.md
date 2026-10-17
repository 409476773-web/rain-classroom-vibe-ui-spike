# G6 总回归测试收尾修复

2026-10-17。只修改 `tests/e2e/g6-components.spec.ts` 与 `g6-components.config.ts`，没有修改 UI、旧 Registry、Manifest、阶段或冻结证据。原两份测试已保存于 [test-repair-before](../test-repair-before/)。

## 根因与等价覆盖

原总用例编写于10月14日。后续获授权的示例升级改变了交互入口，但总用例未同步。旧用例在当前构建上寻找已删除控件，失败证据保留于 [旧运行日志](../g6-executed.log) 和 [旧结果](../g6/results/)。

| 范围 | 当前真实流程与保留断言 |
| --- | --- |
| Attachment | 作用域限定到“课程附件”表单；更多菜单→移除，保留下一预览焦点；真实文件选择后显式上传，上传中保存禁用，结束后可保存。预览打开/关闭/返回焦点及比例/cover/contain/direction断言保留。 |
| Drawer / 编辑组合 | 当前单项编辑使用Dialog、RadioGroup和同层预览。检查未保存确认的安全焦点、继续编辑保留值、完成方式选择、唯一预览层、返回编辑恢复焦点、放弃后不改已存值。真实Drawer四方向、非模态页面操作、焦点约束与拖动关闭仍分别执行。 |
| Carousel | 用当前“纵向专题预览”替换已删除的“纵向课程摘录”；上下键前后导航可用状态及第2项aria-current均检查。实际API计数、输入拥有方向键、增删资料、RTL、抽屉内拖动所有权保留。 |
| Marker / Message / Bubble | 当前Marker使用会话主题提示和完成/重新整理动作；检查真实文字状态与来回切换。Bubble反应切换、Message剪贴板正文与失败重试均保留。 |
| Questionnaire | 点击实际原生label并确认checked；打开折叠“演示控制”；空必填、条件题、短文本校验、保存/恢复、向后回改、跳过自动提交失败、补写后成功提交与摘要保留。 |
| 其余 | 12项路由、浅深主题、双密度、390px不溢出、API与源码复制；OTP单输入/粘贴/明确验证/失败保留/重试；Scroller阅读位置/流式追加/历史前插/暂停与返回最新；Data Table稳定选择/筛选范围/列显隐/失败刷新；forced-colors和reduced-motion全部保留。 |

原12个用例没有删除；当前场景11个与冻结独立consumer 1个改为分别执行，两种视口合计仍为24个。

## 配置与输出

- `G6_EVIDENCE_DIR`：所有截图、矩阵、JSON报告与失败trace的输出根；缺省采用 `g6-components-current/<时间戳>` 新目录，不覆盖10月14日历史。
- `G6_BASE_URL`：显式使用已有当前构建服务；未设置时启动默认Playground预览。
- `G6_TEST_SCOPE=current`：缺省，只运行当前Playground的11个用例。
- `G6_TEST_SCOPE=frozen-consumer`：单独运行10月14日已安装consumer；JSON报告标注冻结来源，不作为当前P5独立消费。
- `G6_CONSUMER_URL`：可显式指定已有冻结consumer服务；未设置时按原固定consumer目录启动预览。

## 鲜活结果

| 检查 | 结果 |
| --- | --- |
| 当前构建，1440px与390px | **22/22通过，0失败、跳过或flaky**；[报告](current/report.json)、[日志](current.log)、[截图/矩阵](current/) |
| 冻结10/14 consumer，1440px与390px | **2/2通过，0失败、跳过或flaky**；[报告](frozen-consumer/report.json)、[日志](frozen-consumer.log)；不计当前P5 |
| 修复试跑 | 首次5项桌面试跑2通过/3失败：保留于[first/report.json](first/report.json)。修正表单中显式上传动作、Marker精确状态作用域，以及跳过失败后补写才显示“提交反馈”的实际条件后，完整当前22项通过。 |
| 文本差异 | `git diff --check` 对两份测试通过。 |

运行命令：

```sh
G6_BASE_URL=http://127.0.0.1:5507 G6_EVIDENCE_DIR=evidence/runtime/g1-g6-closeout-2026-10-17/run-01/browser/test-repair/current pnpm exec playwright test --config tests/e2e/g6-components.config.ts
G6_TEST_SCOPE=frozen-consumer G6_EVIDENCE_DIR=evidence/runtime/g1-g6-closeout-2026-10-17/run-01/browser/test-repair/frozen-consumer pnpm exec playwright test --config tests/e2e/g6-components.config.ts
```

精确前后源码SHA和报告统计见 [summary.json](summary.json)。当前构建运行专项通过不授予用户视觉、对比度、Safari/VoiceOver、真实触屏、发布或业务采用；10月14日冻结consumer不能冒充当前源码的干净消费。
