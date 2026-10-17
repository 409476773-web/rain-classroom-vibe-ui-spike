# R4 浏览器反馈 · review-06

2026-10-03，本目录仅登记用户 23 条 R4 新批注的浏览器验证。候选05为修改前状态；冻结的 v0.4.2 原稿继续作为历史设计基准，本轮新视觉指令覆盖对应的局部数值。未修改原稿或共享 Token。

## 实际结果

最终冻结源码下6项契约通过（原5项R4，加1项S4 inverse，重复补跑不叠加），见contracts-final-08.log。原5项修前RED；新增inverse检查在后续Token闭环中登记。9个修改前与最终after-04九个修改后状态独立保存，均使用Chromium、DPR1，浏览器窗口1800×1100，画板1200／1440／1600。修改后采集和inverse最终检查均无pageerror。

| 测量 | 修改前 | 修改后 |
| --- | --- | --- |
| 活动轨高度 | 115px | 92px |
| 活动卡高度 | 85px | 66px，按内容自然增长 |
| 队列条件区高度 | 138px | 91px，合并数量与筛选为一行 |
| 小组列表可见高度 | 272px | 350px，增加78px |
| 课堂导航条目至分割线 | 10px | 4px |
| 恢复栏／课程标题栏 | 48px／56px | 56px／44px |
| 进度条／活动metadata间距 | 3px／11px | 4px／4px |
| 小组区域标题栏／标题字 | 40px／13px | 36px／15px，左右padding12px |
| 小组名称／详情标题 | 13px／18px | 14px／16px；详情标题行高22px |

表中列表高度为 compact 或常驻 expanded；1200 临时 expanded 有既有24px适配提示，因此列表248→326px，同样增加78px。1200打开平台导航使用已有临时覆盖层，选择小组后关闭覆盖层并保留业务身份。1176×771是批注时的浏览器语境，本轮没有新增此宽度断点。

AvatarGroup 四成员的官方图片可见并解码成功，未嵌套button。AvatarGrid用于详情标题。未评分颜色解析为公共 TextNeutral3。活动背景、进度底／填充、平台背景与选中底色逐一与已有公共 Token 的浏览器computed值比较通过。平台三个控件均32×32，expanded与temporary同排，compact同列，控件均在实际区域边界内。

筛选、搜索、切换活动／未评分小组、隐藏恢复小组列表、课堂导航键盘与指针调宽、隐藏恢复课堂导航，均保留所选对象和对应结果。三种画板宽度下详情区域没有横向内容溢出。已打开并查看修改前与最终after-04的1440展开态完整原尺寸截图，以及inverse-final-03临时课堂导航截图。

## 文件

- [机器结果与源码摘要](browser-validation.json)
- [修改前九状态测量](before-v2/measurements.json)、[最终修改后九状态测量](after-04/measurements.json)
- [最终展开态前后对照](R4-interaction-1440-expanded-before-after-final-04.png)、[最终紧凑态前后对照](R4-interaction-1440-compact-before-after-final-04.png)、[最终未评分前后对照](R4-interaction-1440-ungraded-before-after-final-04.png)：左为修改前，右为修改后，保留截图原像素。
- [RED日志](contracts-red.log)、[最终六项契约日志](contracts-final-08.log)、[最终九状态采集日志](capture-after-04.log)、[inverse最终测量](inverse-final-03-measurements.json)、[inverse最终截图](S4-interaction-1440-inverse-final-03.png)

首次修前采集因同URL导航未重置React状态而超时，失败日志与部分R4截图保留于capture-before.log和before-capture-diagnostic。使用独立宽度查询参数后，完整before-v2在实现开始前采集通过。该问题属于采集fixture，未作为实现缺陷或通过结果。

[测试项目类型核对](tests-typecheck-final.log) exit1：仅保留原有command测试和6处旧navigation-v042动态node:fs/promises错误，新反馈spec／config没有类型错误。此检查已包含Token探针／inverse检查，后续只追加临时标题几何断言与截图命名。Playground构建由主任务另行记录。

Human Gate、VoiceOver、完整对比度、多浏览器／DPR2、全部N01–N38及W6–W8尚未验证。R5／R6共享头像与控制的回归由主任务的既有W5浏览器集覆盖，不由此5项R4契约推导。

## 最终Token与临时标题闭环

最终TSX SHA-256为`02d4d49f5c6635d897dbeb32132016eb46c3881342e30f7396fcf6ead126ab40`，CSS为`b17fd7cdc05a802b23b1ae03b870739399a89eff2f311a68eb2ce58a865793a6`。after-04九图与六项最终契约均对应这次冻结，详见机器结果的finalClosures。

补测Tabs选中／未选文字、Segmented选中文字、分割线普通／hover／focus、恢复入口hidden／hover、非平台临时表面和阴影，均与公共Token实际computed值一致。inverse使用平台自身的dark主题作用域；容器文字、实际span mask图标、选中／未选文字、普通／选中hover和恢复入口均实测通过。此场景没有显示Tabs计数，不推导计数的视觉验收。

使用32×32标准IconButton后，临时课堂功能头原先会将标题压成44px两行。已通过局部头padding调整、标题nowrap和隐藏重复状态字解决；固定／恢复按钮的具名状态继续保留。最终标题22px、头36px，无水平溢出，4个RegionHead控件仍完整为32×32。队列头左右padding12px保持。

初版[机器结果](browser-validation-initial-01.json)与[初版QA说明](BROWSER-QA-initial-01.md)、after-01／02／03及全部诊断日志、旧对照图均保留。green-03的过宽temporary规则误将平台背景变白，已收窄为非平台；green-04的fixture误将常驻SHOW视为临时，已改为真实UNPIN操作。inverse-final-02中发现的临时标题换行不再作为残差接受，最终inverse-final-03明确关闭此缺陷。current-light-proof只证明较早dark增量未改after-03亮色像素；随后头padding变化已用after-04九图重新采集，不借旧证明替代当前视觉证据。
