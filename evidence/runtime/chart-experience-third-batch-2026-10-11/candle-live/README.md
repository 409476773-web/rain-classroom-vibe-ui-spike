Candle / Live 第三批当前验核已完成，范围为现有 Mock 展示。本 owner 的运行改动仅在 `chart-variants/special.tsx`：K 线接入已有具名密集／平盘样本、真实非法 OHLC 拒绘和私有日期精确读取；Live 只观察图形容器，长表仍可见时图形离屏也会停止生产。正常数组、既有材质、颜色、尺寸和原生几何保留。

[总验证记录](./verification-summary.json)包含最终源码、脚本与明细哈希；[正常 Mock 字节比对](./normal-source-preservation.json)确认 baseline 与当前 `makeCandles`、`makeLivePoints` 声明逐字相同。总记录整理时重新读取 18 个运行文件，均与真实浏览器使用的指纹一致，`sourceChangesSinceBrowserFreeze=[]`。

- [17 项目标单测](./targets-green-06.log)全部通过：13 项 special、1 项原生同日期 OHLC 浮层刷新、3 项默认 Live 生命周期。明确包含没有 IntersectionObserver 时按 active 安全降级、长表与图形分开观察、暂停／重播保留 Chart 身份与冻结窗口、手动追加、interval／原生时钟清理和 snapshot 恢复。
- [K 线当前浏览器总结](./candle-browser/summary.json)：1440／390、普通／减少动效四组全部通过；默认和 11 个变体共 48 个宿主观察，48 次非法拒绘、8 次原生固定指针更新、96 张截图、0 页面异常。每个宿主都检验 96 日期完整原始 OHLC、20 条全平盘、同源精确表／日期读取、既有方向颜色、图例 Escape 后同按钮再次读取和正常几何恢复。
- [Live 当前浏览器总结](./live-browser/summary.json)：保留 `run-02` 四组 40 个宿主观察；最新 `run-03-affected` 为两宽度 × 默认／共享变体工厂四条独立深路径。当前计 8 项测试、88 张截图、0 页面异常。最新同页 hash 切换保留原探针函数身份及累计创建数，所属生产者、原生 RAF、IO 与 visibility 监听均清零。
- [最终新增 E2E 类型检查](./live-browser/test-types-04-current-spa.log)退出 0，无诊断，覆盖当前 Candle 与 Live 脚本；owned 文件差异检查也通过。

真实 RED 与 harness 问题保留且分别记录在总验证记录的 `history`。真实缺口是密集／平盘／非法入口与日期读取缺失、同日期数据更新后浮层仍读旧 OHLC、默认 snapshot 两点恢复成 60 点、以及长表保持宿主可见时 Live 缺少图形观察。早期尺寸／RAF／别名／JSON 入口／类型问题不被记为业务失败。

特别保留 [Live 原卸载证据限制](./live-browser/run-02/disposal-audit-limitation.json)：旧整页导航会重建探针，只算导航 smoke，旧 48 次零计数不能证明 SPA 清理；旧深层 8 个观察不叠加当前独立数量。最新四条路径才作为同页清理证明。类型修补的旧 JavaScript 等价证据只适用于当时版本，后续卸载逻辑已单独重跑。

这里的 390 是 Chromium 窄视口；后台是 `document.hidden`／`visibilitychange` 模拟，65 秒暂停是虚拟时钟推进。原生日期控件验证焦点和真实选值，不宣称操作系统菜单方向键提交已验证。浏览器 Live 未达到 120 点，bounded120 来自既有目标单测。没有真实数据源、生产订阅或断流重连保证；物理设备、跨浏览器、VoiceOver、其他批次及全局 Human Gate、发布和迁移仍保持各自状态。
