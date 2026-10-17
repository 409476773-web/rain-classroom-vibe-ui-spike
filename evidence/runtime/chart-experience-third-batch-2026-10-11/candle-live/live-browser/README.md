Live 浏览器专项为第三批独立证据，仅新增测试与证据文件，未修改运行源码。

当前证据为 8 项独立测试：保留 `run-02` 的 4 项完整宿主测试（1440px／390px、普通动效／减少动效，共 40 个宿主观察、80 张截图），加上 `run-03-affected` 的 4 条深层生命周期路径（两宽度 × 默认／`live-line-default`，8 张截图）。两次运行均无失败、跳过或页面错误；12 项运行源码在两次检查前后及整理时哈希一致，精确范围与当前脚本哈希见 `summary.json`。

40 个宿主观察覆盖实际自动追加或初始 reduced 停止、暂停、键盘 Enter 手动追加、有限原生路径与实际 Unix 秒数据、无脉冲暂停、恢复和减少动效切换。其原执行版本保留于 `run-02/spec-before-types.ts`，类型修正等价关系见 `run-02/type-only-equivalence.json`。这 40 次检查的整页导航只作为导航 smoke，不计入同页面卸载证明。

最新 4 条重点路径实际通过，耗时 28.7 秒。每条覆盖原生图形完全离屏但精确表仍可见、自动停止及返回恢复、模拟后台停止、用户暂停 65 秒后重播保持同一个 Chart DOM 与相同点表／路径／时间刻度、手动推进、更新后每个活动宿主仅一个生产者和原生时钟。卸载改用同页面 `location.hash` 切换，原 `__liveResources` 函数身份与累计创建数保留，先前已观察到的 interval、原生 RAF、IntersectionObserver 和 visibility 监听均清理为 0。当前同页面卸载证明计 4 次，执行脚本保留于 `run-03-affected/spec-executed.ts`。

`run-02` 原有 12 项通过及 96 张截图全部保留；其中 8 个深层观察为历史记录，不叠加为当前独立路径。审计发现原 `page.goto` 可能整页重建探针，原 48 次卸载零值不能证明 SPA 清理。限制单独保留于 `run-02/disposal-audit-limitation.json`；原总结保留于 `summary-run02-pre-spa-audit.json`，以当前 `summary.json` 为准。

资源按真实调用栈识别：Mock 600／1000ms 定时器来自默认或 special 展示；原生 RAF 同时要求回调名 `tick` 和 `live-line-chart.tsx` 调用栈。Motion 自身帧循环不计入，不能据此声称全页面或浏览器全部帧资源归零。

`run-01` 在测试入口加载时因 JSON 导入缺少类型标注失败，未启动测试；原日志保留。新增测试的两个类型检查失败也保留。`test-types-03.log` 为空且当时检查退出 0；修正只有类型标注、cast 与 override。`run-02/type-only-equivalence.json` 仅证明当时类型修正与 `run-02` 已运行版本的 JavaScript 字节一致，不适用于之后实质修改的 SPA 卸载逻辑。该逻辑已由最新四条浏览器路径重跑验证，未重复其余 40 个已通过观察。最新含探针身份声明的完整测试脚本通过最终类型检查，`test-types-04-current-spa.log` 为空且退出 0。

后台为覆盖 `document.hidden` 后派发 `visibilitychange` 的浏览器内模拟，非真实 OS 后台。长暂停采用 Playwright clock.fastForward 推进 65 秒，非性能或真实墙钟时长测量。最新四条重点路径均以普通动效启动，随后检查 reduced 切换；保留的 40 个完整宿主观察保持各组合的初始动效设置。

代表性截图已查看：1440px 普通默认暂停、390px 普通默认暂停、390px reduced 变体手动追加；原生曲线、刻度和末端读数可见。这不替代用户视觉 Human Gate。

未检查原生日期菜单、真实触摸设备、Safari／VoiceOver、生产订阅及断流重连；本浏览器样本未达到 120 点，不新增持续 120 点压力验证声明。证据不表示发布、生产接入或人工验收。
