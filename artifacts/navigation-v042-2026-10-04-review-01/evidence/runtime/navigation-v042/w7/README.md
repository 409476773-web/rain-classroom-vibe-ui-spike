# W7 · N01–N38真实回归映射

最终浏览器回归232/232通过（313.17秒、无skip/flaky）：Chromium DPR1 129、DPR2 21、Firefox 41、WebKit 41。36条合同具有映射后的真实浏览器断言；N30由存储边界单元验证，N34由70项旧消费者单元验证。每条合同的精确测试标题、文件、项目及剩余边界见`regression-map.json`；这不是38条全面视觉/读屏验收声明。

N06真实浏览器发现的Esc后hover抑制未清理已最小修复：只扩展既有pointer-leave处理条件，保留240ms延时、禁止立即反弹、焦点与偏好逻辑，不改CSS/Token。新增单元先red再green，workspace17/17及三引擎focused6/6通过；独立复核无P0/P1/P2。G2候选13历史43项source lock保留，当前行为差异及前后hash见`n06-behavior-repair.json`。

| 合同 | 本批真实断言 | 执行 | 明确边界 |
|---|---|---|---|
| N01 全部隐藏后恢复 | S1全部隐藏后，每个稳定入口一次Enter恢复；Esc焦点回入口且不落入hidden子树。 | 浏览器4/4 | 所列断言已验证；共通Gate仍独立。 |
| N02 跨区域首击原子性 | 临时context打开时，一次真实点击同时关闭旧暂态并隐藏directory。 | 浏览器1/1 | 所列断言已验证；共通Gate仍独立。 |
| N03 跨区域恢复首击 | directory隐藏时，一次真实恢复点击同时关闭旧暂态并显示directory。 | 浏览器1/1 | 所列断言已验证；共通Gate仍独立。 |
| N04 窄轨临时占位 | 临时查看不改变主工作面的x/width；单元验证compact占位及偏好不变。 | 浏览器3/3 | 偏好断言另由单元覆盖。 |
| N05 保持展开 | 只有pin移动主面；unpin/外点恢复原占位，区域DOM ID不变。 | 浏览器1/1 | 所列断言已验证；共通Gate仍独立。 |
| N06 hover正常清理 | 入口→面板hover可桥接；Esc后500ms不反弹；离开面板后一次进入、240ms正常重开。 | 浏览器3/3；单元17/17 | 所列断言已验证；共通Gate仍独立。 |
| N07 旧timeout不串场景 | S3排队hover后切至S6，600ms后无旧临时面板。 | 浏览器3/3 | 所列断言已验证；共通Gate仍独立。 |
| N08 专注精确恢复 | R5专注退出恢复原隐藏布局；显式seek到984的播放位置保留。 | 浏览器1/1 | 所列断言已验证；共通Gate仍独立。 |
| N09 跨S5/S6无快照 | S5专注/工具/草稿切至S6不带旧专注快照；单元验证session清空。 | 浏览器1/1 | 当前Recipe没有公开scope日志字段。 |
| N10 context切换清理 | R4批阅→互动→批阅清专注，学生/题目归属的草稿保留。 | 浏览器1/1 | 所列断言已验证；共通Gate仍独立。 |
| N11 非零滚动恢复 | 真实wheel产生非零scrollTop；hide/show后滚动和选中Tree ID保留。 | 浏览器3/3 | 160px pane高是测试宿主约束，不是认可视觉截图。 |
| N12 草稿独立 | R4/S4反馈、分数、学生/题目ID通过布局/主题/字号变化保留。 | 浏览器25/25 | 所列断言已验证；共通Gate仍独立。 |
| N13 不自动保存 | 真实R4/R6逐步布局/焦点/resize/视图操作后保存回调均为0；明确保存阳性为1且实际反馈改变。 | 浏览器1/1；callback 2/2 | 只覆盖实际Recipe本地保存；没有生产提交服务，不虚构后台覆盖。 |
| N14 SVG幂等 | 首/中/末真实选择、宽度变化及恢复后SVG有限；单元覆盖0/6/8/10/12圆角和边归属。 | 浏览器3/3 | 浏览器圆角逐值改动、像素接缝另属视觉证据。 |
| N15 队列零外缝 | 首/中/末队列选中+hover，每行76px，相邻top/bottom零外缝。 | 浏览器4/4 | 抗锯齿像素接缝另属视觉证据。 |
| N16 图标紧凑居中 | 12个R/S平台模式的18px图标；compact按钮与图标中心误差≤1px。 | 浏览器48/48 | 所列断言已验证；共通Gate仍独立。 |
| N17 全局头尾排布 | 展开收起控件在品牌右侧；账户/工具横排、compact工具在账户上方；真实动画保持品牌同节点和64→208→64占位。 | 浏览器57/57 | 所列断言已验证；共通Gate仍独立。 |
| N18 深色临时层 | inverse临时平台的背景、账户、原生链接、焦点及Esc恢复正确；12场景两模式配色受测。 | 浏览器51/51 | 对比度独立未通过。 |
| N19 搜索唯一focus | R2搜索popup与S3临时搜索只有一条外层Input焦点线；输入本体outline/shadow为none。 | 浏览器6/6 | 所列断言已验证；共通Gate仍独立。 |
| N20 单一共享竖边 | R2/R4/S3/S5边界常态opacity .4/handle 0；hover/focus为1，真实拖动与键盘改变宽度。 | 浏览器12/12 | 相邻重复paint边计数和像素接缝仍属视觉检查。 |
| N21 R2动态宽度 | cap3/4/5×宽度1200/1440/1600，公共锚点与active末项保留；DPR1/2覆盖。 | 浏览器12/12 | 所列断言已验证；共通Gate仍独立。 |
| N22 短高菜单 | 1200×420短高布局弹层的最后动作可达，恢复入口仍可见。 | 浏览器1/1 | 所列断言已验证；共通Gate仍独立。 |
| N23 R2搜索200项 | 真实搜索200项中的末项并选择，active末项与公共锚点保留。 | 浏览器12/12 | 所列断言已验证；共通Gate仍独立。 |
| N24 Splitter键盘 | 真实拖动与Shift/Arrow/Home/End/Enter验证物理方向、约束、隐藏及键盘恢复。 | 浏览器13/13 | 所列断言已验证；共通Gate仍独立。 |
| N25 顶部工具占位 | 工具区full/icons/tabs/hidden为111/83/41/0；临时112不移动正文，Esc及草稿保留。 | 浏览器1/1 | 所列断言已验证；共通Gate仍独立。 |
| N26 临时层嵌套popup | 临时层内真实子popup：第一Esc仅关popup，第二Esc关临时面板并还焦点。 | 浏览器1/1 | 实际子popup浏览器caller为R2；精确S3嵌套caller另行。 |
| N27 语义正确 | 原生href/aria-current、radio方向键、手动Tabs方向键+Enter及selected ARIA。 | 浏览器4/4 | VoiceOver/完整读屏未运行。 |
| N28 主题密度不重建 | R4/S4主题/字号变化保留同一输入DOM和草稿；实例B密度/连接变化不改变A。 | 浏览器25/25 | 输入仍持焦时改变主题/密度需保留键盘焦点的宿主路径。 |
| N29 同名不同ID | E1同名199/200按不同ID和不同草稿选择；disabled238不可选，移除current不自动替代，恢复可选。 | 浏览器3/3 | 所列断言已验证；共通Gate仍独立。 |
| N30 存储边界 | 拒绝storage、损坏JSON、SSR、v1迁移/未知version安全回退；仅持久化mode/expandedWidth。 | 单元通过 | storage注入在单元边界测试，不冒充浏览器storage覆盖。 |
| N31 StrictMode与观察器 | StrictMode观察器释放与计时器归零；独立consumer反复切场景无旧面板/pageerror。 | 浏览器3/3 | 精确observer/listener/timer释放由单元证明；浏览器不逐个计数。 |
| N32 按实际空间派生 | 同实例1600→1200→1600按实际空间派生并恢复；输入DOM、草稿、字号和ID保留，偏好不被覆盖。 | 浏览器3/3 | 所列断言已验证；共通Gate仍独立。 |
| N33 导出/干净消费 | 独立入口直接导入共享资产，无reference globals/iframe；R4/R5/R6/E6业务交互受测。 | 浏览器4/4 | 复制后build闭包由W6独立证据证明。 |
| N34 旧消费者兼容 | 旧Tabs15、Select50、Card5的完整单元套件70/70通过。 | 单元70/70 | 全仓工程Gate仍红；这些API/default断言不替代像素对比。 |
| N35 关联分割线 | A4相邻分割线ordinary .65→hover 0→blur .65→current 0。 | 浏览器4/4 | 所列断言已验证；共通Gate仍独立。 |
| N36 白底顶部指示 | 遵循已接受Review11：首/中/末选中hover保持gradient；顶线content:none/display:none。 | 浏览器3/3 | 原合同2px顶线被明确认可的Review11注释取代；肩部像素连续性另属视觉。 |
| N37 实例级AI改造 | 仅B改名称/条件密度/连接；A节点、尺寸、背景及草稿相同。 | 浏览器1/1 | 全局受保护文件hash由W6/root另行证明。 |
| N38 新业务组合 | 新E6材料评审使用共享资产；真实对象选择、意见草稿及面板恢复，无reference runtime。 | 浏览器3/3 | 新组合的人类视觉Gate/G3待审。 |

## 运行与范围

`navigation-v042-w7.config.ts`将8个既有spec与新增W7 spec统一运行；保留既有文件。Chromium DPR1覆盖既有88项+新41项，DPR2覆盖21项关键矩阵，Firefox/WebKit各覆盖新41项。配置不启动服务，使用root拥有的5198预览。命令：

```sh
RAIN_W7_BROWSER_MATRIX=all pnpm exec playwright test --config tests/e2e/navigation-v042-w7.config.ts
```

旧G1 review/review09 tooltip case写死历史证据路径，故本批排除以保留原认可记录。旧Review11平台20px/zero-opacity假设由已接受18px/.4断言替代。旧W4品牌case把内层rail认成208px且用evaluate点击；正式region slot实际208px、内层207px。新case用真实点击、动画采样及同节点证明，旧文件不改。

原始每轮证据均保留：smoke01 CLI未入UI；smoke02沙箱无法启动浏览器；smoke03 32/40（测试选择器假设与N06）；smoke04 7/8（仅N06）；full01 226/230（N06三引擎+旧品牌假设）；smoke05 6/6；full02 232/232。各轮有独立log/results/artifacts；最终精确标题与项目见`browser-final-summary.json`。

## 工程与未关闭Gate

- 正式导航基线8文件99/99通过；N06改后workspace17/17通过；N13实际业务回调2/2；旧Tabs/Select/Card兼容70/70。最初默认focused red包括归档source-before导入与5秒并发超时，原结果不删除；root已排除evidence归档。
- 最终测试typecheck仍exit1：唯一已有`packages/ui/src/command/command.test.tsx:20`回调TS2322，W6/W7诊断0；六项navigation fs声明已由root关闭。
- 全仓工程结果另见`full-quality/`：全仓治理/typecheck/unit/e2e有独立失败；build/icons通过。局部回归通过不能表述全仓全绿。
- 对比度保留已接受视觉并独立记录：先前R3表头3.38、解释3.71、容量2.28、辅助icon2.53、Gallery提示1.54；最终完整render/contrast矩阵由root采集，不把这些低值写成通过。
- VoiceOver、实际Safari未运行；Playwright WebKit不能当作实际Safari验收。G3仍待人类审阅；发布、迁移、Git操作均不由本批测试授权。
