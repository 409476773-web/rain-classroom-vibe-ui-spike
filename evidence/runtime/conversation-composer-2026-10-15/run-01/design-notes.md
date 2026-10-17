# 设计选择与本地检查

本轮按用户已确认的六张图稿实施，并使用当前 Rain 组件和 Token。图稿确认与运行结果的人为接受分别记录；当前 humanGate 为 awaiting_human。

## 依据与选择

- 读取 AGENTS、SPIKE_BRIEF、当前阶段、Evidence/Benchmark 索引、Rain Designer 与原型接入、图标规范、两份规划及现有附件/输入/浮层/消息源码。
- 新建一个共享 Pattern/Recipe；正文使用原生 textarea，由 Composer 拥有表面和整体输入焦点。保留旧 Field 默认值。
- 文件复用既有上传 Hook 和 Attachment Parts；资料选择器复用 Popover/Checkbox，范围复用 RadioGroup；没有新增运行时依赖。
- 所有普通图标保持资产几何与宿主色。实际核对 up 为有竖杆的发送箭头，microphone-on 为线性麦克风，maximize/minimize 为布局操作；voice/voice-input 的圆形声波不用于麦克风入口。

## 首次运行与修订

- 初始测试基线 34/34；修改前文件哈希和已有 Git 状态保存在 baseline.json。
- 首次浏览器画面在 browser/surfaces-*.png，初始检查与失败追踪在 browser/results 和 browser/report.json。后续 round-02 至 round-06、final、visual-details、delivery 各自保留，未覆盖首轮失败。
- 初稿在约 480px 示例中紧凑态与展开态过于接近，随后将紧凑工具放在输入行两侧，展开增加四行起始书写空间与独立工具行；窄容器自动将工具放到下一行，正文保持可读宽度。
- 初稿 textarea 自身和外框同时获得 Focus；改为 Composer 拥有唯一输入焦点，工具保持自身可见 Focus。
- 计时打开资料选择器和异步移除曾缺少会话/权限守卫；已补先红后绿的回归及独立复核。语音的 disabled/readonly/generation 变化也由 enabled 守卫取消或保留录音。
- 索引生成器只识别明确文件导出：UI 根入口对 Attachment Workflow 和 Composer 使用 /index，导出能力不变。

## 实际比较

桌面 1440×1000、窄视口 390×844，浅/深色；同一正文与相同布局分别比较两种表面，Focus 另拍，不把有焦点和无焦点的表面作为同状态对比。

- 桌面紧凑态中，加号/范围图标位于正文左侧，麦克风/展开/发送位于右侧；两种表面保持同一内容和控件排列。展开态正文区明显增大，布局按钮在正文右上，添加/范围与语音/发送分别位于底部两端。
- 窄视口和单独 320px 容器中，紧凑工具换到下行，正文保留整行宽度；展开仍保留更大的初始书写区。浏览器检查未发现本范围横向页面溢出。
- 两种表面的圆角与间距一致，灰底使用中性语义表面，白底用轻描边及已有 overlay 阴影在底部投影；主发送使用品牌 Token，编辑器没有原 Field 整框浅蓝填色。
- 资料弹层打开前后输入框高度相同；多选确认与范围单选分别操作。引用取消、失败恢复、波形/停止及转写保留状态通过实际操作验证，相关状态截图在 browser/delivery。
- 布局切换保留同一编辑器和草稿，取消回复保留正文；历史 prepend 的比较使用消息相对滚动视口的位置，避免把页面滚动误算成消息跳变。

以上为本地技术和视觉自查。真实设备的麦克风、Safari/VoiceOver、物理触摸与软键盘、实际业务服务、正式对比度与用户运行视觉接受仍未验证。
