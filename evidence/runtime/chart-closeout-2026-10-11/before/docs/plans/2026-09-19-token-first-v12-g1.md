# v1.2 · G0/G1 首批

用户 2026-09-19 明确授权按主工作区 `docs/rain-next-v1.2-token-first/00-START-HERE.md` 继续；本记录不重启进度。工作区 `.worktrees/card-v2`，HEAD `321e1a0`，已有未提交 M1/M2、teacher-grading、exam-editor 等成果保留，改动前散列见 `evidence/runtime/token-first-v12-g1/baseline-sha256.json`。

模式：组合样板与四个来源适配先为 Prototype Mode / local-experiment；如样板复现共享样式缺陷，修复按 System Mode 单独记录。四项尚不进入公共 Registry，不把源码存在计作本轮可用。

本批目标：核对 64 项现实差距与 F01；以 shadcn 既有 Card 使用的固定提交 `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` 的 Base UI 源码适配 Alert、Switch、Collapsible、Accordion；统一转译到现有 Rain Token，不开放 Tailwind 默认视觉。交付工具栏、内容卡与浮层两组可操作样板，保留默认、局改、兄弟实例。同期提供工作台与报告的两个布局方向供选择，沿用已有业务数据/公式；选定后再进行 P2/P4 深度交互。

读取依据：00/01/02/04/05/06/07、冻结 03、09 与短记录模板；当前 AGENTS、SPIKE_BRIEF、phase、prototype-design、icon-selection、相关 Input/Select/Card/Dialog/Dropdown API、BM-C/D 状态合同与 teacher-grading 说明。Frontend Design、执行计划、TDD、完成前验证技能已实际读取。技能通用美术建议服从本次 Rain 品牌、字体、常规尺寸要求。

范围：新增 `apps/prototype/src/scenarios/token-first-g1/` 及路由；修正两处现行 Token 文档计数，增补新原型消费建议；现有 phase 内记录批次，证据放本批目录。只在实际复现时修复 Dropdown 默认 paint 对局部 utility 的层叠阻挡。源码源文件与 Nova 样式分别保存完整哈希、MIT 许可；不执行 CLI、不分发字体。Prototype 必要的 Base UI/CVA 直接依赖声明已补齐，离线复用已有锁定版本，未增加新版本。

验证：先基线原型类型检查；来源适配交互小测试；真实构建产物浏览器检查尺寸、浅深主题/Portal、嵌套菜单、键盘/焦点、局改隔离和长内容；相关旧组件回归与已有治理检查。整页截图实际查看。新组件状态和 P1/P3 方向均待用户判断，F05 未确认前不扩同类批量。

本批实际字体、配对对比度、Portal 动态主题与窄屏已验证，详见[检查记录](../../evidence/runtime/token-first-v12-g1/verification.md)。完整读屏/物理触摸/跨机字体和独立审阅本批尚未完成。F06 复用现有空间和阴影；F07 只核对本批嵌套浮层/局部响应；F08 留到报告组。

交付预览：构建产物 `http://127.0.0.1:5369/#token-first-g1`，同页导航进入工作台与报告两版方向。既有开发服务5368保留；5326未运行。首个基线原型类型检查通过，最终完整类型检查与限域回归见检查记录。

用户本轮选择工作台 A、报告 A；组合样板按后续具体反馈修订为 Tab 在前、带图标即时搜索在后、小卡片紧凑操作、浅底摘要、评分细则弹层、可折叠作答。Switch 本体明确暂留。修改限定在样板及必要验证/记录，不推导为 F05 已通过；反馈与落地关系见本批 design-notes。
