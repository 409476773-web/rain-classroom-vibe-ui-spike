# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w5.spec.ts >> R4 interaction selected group and activity stay synchronized through temporary recovery
- Location: tests/e2e/navigation-v042-w5.spec.ts:22:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

  Object {
    "height": 503,
-   "width": 1181,
-   "x": 271,
+   "width": 936,
+   "x": 516,
    "y": 532.6875,
  }
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件库" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - heading "导航组件 · v0.4.2" [level=1] [ref=e6]
    - link "R2 独立消费样本 ↗" [ref=e7] [cursor=pointer]:
      - /url: /navigation-v042-consumer.html
    - link "W3 独立消费样本 ↗" [ref=e8] [cursor=pointer]:
      - /url: /navigation-v042-w3-consumer.html
    - paragraph [ref=e9]: A1 · A4 · R2 人工视觉已通过 W3–W5 组合建设 · G2 待评审
  - generic [ref=e10]:
    - navigation "导航候选样本" [ref=e11]:
      - button "A1" [ref=e12]
      - button "A2" [ref=e13]
      - button "A3" [ref=e14]
      - button "A4" [ref=e15]
      - button "A5" [ref=e16]
      - button "Contents" [ref=e17]
      - button "White" [ref=e18]
      - button "Connections" [ref=e19]
      - button "R1" [ref=e20]
      - button "R2" [ref=e21]
      - button "R3" [ref=e22]
      - button "R4" [ref=e23]
      - button "R5" [ref=e24]
      - button "R6" [ref=e25]
      - button "S1" [ref=e26]
      - button "S2" [ref=e27]
      - button "S3" [ref=e28]
      - button "S4" [ref=e29]
      - button "S5" [ref=e30]
      - button "S6" [ref=e31]
    - generic [ref=e32]:
      - text: 画板宽度
      - combobox "画板宽度" [ref=e33]:
        - option "1200"
        - option "1440" [selected]
        - option "1600"
    - generic [ref=e34]:
      - text: 连接
      - combobox "连接" [ref=e35]:
        - option "内缩 inset" [selected]
        - option "贴边 merged"
    - generic [ref=e36]:
      - text: 表面
      - combobox "表面" [ref=e37]:
        - option "中性底" [selected]
        - option "白底轮廓"
    - generic [ref=e38]:
      - text: 可见范围
      - combobox "可见范围" [ref=e39]:
        - option "3"
        - option "4" [selected]
        - option "5"
    - generic [ref=e40]:
      - text: 业务子场景
      - combobox "业务子场景" [ref=e41]:
        - option "课堂互动" [selected]
        - option "教师批改"
    - link "打开认可原稿 ↗" [ref=e42] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R4
  - generic "R4 工作区" [ref=e45]:
    - generic [ref=e46]:
      - button "展开平台导航" [ref=e47] [cursor=pointer]:
        - generic [ref=e49]: 平台导航
      - button "隐藏课堂功能" [expanded] [ref=e50] [cursor=pointer]:
        - generic [ref=e52]: 课堂功能
      - button "隐藏小组列表" [expanded] [active] [ref=e53] [cursor=pointer]:
        - generic [ref=e55]: 小组列表
      - generic [ref=e57]:
        - strong [ref=e58]: 小组汇报：从概念到真实应用
        - generic "探索者小组 · 智能汇报" [ref=e59]
      - button "布局" [ref=e60] [cursor=pointer]
      - button "专注内容" [ref=e62] [cursor=pointer]
    - generic [ref=e64]:
      - generic "平台导航" [ref=e66]:
        - generic [ref=e67]:
          - navigation "平台功能" [ref=e70]:
            - list [ref=e71]:
              - listitem [ref=e72]:
                - link "工作台" [ref=e74] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e79]:
                - link "课程" [ref=e81] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e86]:
                - link "资源" [ref=e88] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e93]:
                - link "专业" [ref=e95] [cursor=pointer]:
                  - /url: "#navigation-v042"
          - generic [ref=e100]:
            - button "通知" [ref=e101] [cursor=pointer]
            - button "帮助" [ref=e103] [cursor=pointer]
            - generic [ref=e105]: 林
      - generic [ref=e107]:
        - generic [ref=e108]:
          - strong [ref=e109]: 大学物理 · 第九章课堂回顾
          - generic [ref=e110]: 2026-09-24 11:21
          - button "导出数据" [ref=e111] [cursor=pointer]
        - generic [ref=e115]:
          - generic "课堂功能" [ref=e117]:
            - generic [ref=e118]:
              - strong [ref=e119]: 课堂功能
              - generic [ref=e120]: 常驻
              - button "取消固定课堂功能" [ref=e121] [cursor=pointer]
              - button "隐藏课堂功能" [ref=e123] [cursor=pointer]
            - heading "课堂数据" [level=4] [ref=e125]
            - navigation "课堂功能" [ref=e126]:
              - list [ref=e127]:
                - listitem [ref=e128]:
                  - link "综合数据" [ref=e130] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e135]:
                  - link "学生表现" [ref=e137] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e142]:
                  - link "课堂习题" [ref=e144] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e149]:
                  - link "课堂互动" [ref=e151] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e156]:
                  - link "教学内容" [ref=e158] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - generic [ref=e163]: 课堂范围内的功能导航
          - separator "调整课堂功能宽度" [ref=e164]
          - generic [ref=e165]:
            - generic "分区导航" [ref=e166]:
              - tablist "课堂互动内容" [ref=e170]:
                - tab "投稿" [ref=e171] [cursor=pointer]
                - tab "随机点名" [ref=e175] [cursor=pointer]
                - tab "分组讨论" [ref=e179] [cursor=pointer]
                - tab "智能汇报" [selected] [ref=e183] [cursor=pointer]
            - tabpanel "智能汇报" [ref=e188]:
              - generic [ref=e189]:
                - group "课堂活动" [ref=e190]:
                  - list [ref=e191]:
                    - listitem [ref=e192]:
                      - button "辩论赛：大学校园是否应该免费开放" [ref=e194] [cursor=pointer]:
                        - generic [ref=e195]:
                          - generic [ref=e196]: 辩论赛：大学校园是否应该免费开放
                          - generic [ref=e197]: 智能汇报 · 6 组 · 21 分钟
                          - progressbar "辩论赛：大学校园是否应该免费开放完成进度" [ref=e198]:
                            - generic [ref=e200]: 完成 75%
                    - listitem [ref=e201]:
                      - button "小组汇报：从概念到真实应用" [pressed] [ref=e203] [cursor=pointer]:
                        - generic [ref=e204]:
                          - generic [ref=e205]: 小组汇报：从概念到真实应用
                          - generic [ref=e206]: 智能汇报 · 8 组 · 36 分钟
                          - progressbar "小组汇报：从概念到真实应用完成进度" [ref=e207]:
                            - generic [ref=e209]: 完成 100%
                - generic [ref=e210]:
                  - generic "小组列表" [ref=e212]:
                    - generic [ref=e213]:
                      - strong [ref=e214]: 小组列表
                      - generic [ref=e215]: 常驻
                      - button "取消固定小组列表" [ref=e216] [cursor=pointer]
                      - button "隐藏小组列表" [ref=e218] [cursor=pointer]
                    - generic [ref=e220]:
                      - generic [ref=e221]:
                        - heading "小组结果" [level=4] [ref=e222]
                        - generic [ref=e223]: 6 组
                      - radiogroup "小组提交状态" [ref=e225]:
                        - generic [ref=e227]:
                          - generic [ref=e228] [cursor=pointer]:
                            - radio "全部" [checked] [ref=e229]
                            - generic [ref=e230]: 全部
                          - generic [ref=e231] [cursor=pointer]:
                            - radio "已提交" [ref=e232]
                            - generic [ref=e233]: 已提交
                          - generic [ref=e234] [cursor=pointer]:
                            - radio "未评分" [ref=e235]
                            - generic [ref=e236]: 未评分
                      - textbox "搜索小组" [ref=e240]
                    - group "小组结果" [ref=e242]:
                      - list [ref=e243]:
                        - listitem [ref=e244]:
                          - button "第一小分队" [ref=e246] [cursor=pointer]:
                            - generic [ref=e247]:
                              - generic [ref=e248]: 第一小分队
                              - generic [ref=e249]: 已提交 · 思维碰撞
                              - generic [ref=e251]:
                                - generic [ref=e252]: 林
                                - generic [ref=e254]: 王
                                - generic [ref=e256]: 陈
                                - generic [ref=e258]: 周
                            - generic [ref=e260]: "9.0"
                        - listitem [ref=e261]:
                          - button "探索者小组" [pressed] [ref=e263] [cursor=pointer]:
                            - generic [ref=e264]:
                              - generic [ref=e265]: 探索者小组
                              - generic [ref=e266]: 已提交 · 论据充分
                              - generic [ref=e268]:
                                - generic [ref=e269]: 林
                                - generic [ref=e271]: 王
                                - generic [ref=e273]: 陈
                                - generic [ref=e275]: 周
                            - generic [ref=e277]: "8.5"
                        - listitem [ref=e278]:
                          - button "向量研究组" [ref=e280] [cursor=pointer]:
                            - generic [ref=e281]:
                              - generic [ref=e282]: 向量研究组
                              - generic [ref=e283]: 已提交 · 观点清晰
                              - generic [ref=e285]:
                                - generic [ref=e286]: 林
                                - generic [ref=e288]: 王
                                - generic [ref=e290]: 陈
                                - generic [ref=e292]: 周
                            - generic [ref=e294]: "9.5"
                        - listitem [ref=e295]:
                          - button "第四学习小组" [ref=e297] [cursor=pointer]:
                            - generic [ref=e298]:
                              - generic [ref=e299]: 第四学习小组
                              - generic [ref=e300]: 已提交 · 积极参与
                              - generic [ref=e302]:
                                - generic [ref=e303]: 林
                                - generic [ref=e305]: 王
                                - generic [ref=e307]: 陈
                                - generic [ref=e309]: 周
                            - generic [ref=e311]: "8.0"
                        - listitem [ref=e312]:
                          - button "知行合一" [ref=e314] [cursor=pointer]:
                            - generic [ref=e315]:
                              - generic [ref=e316]: 知行合一
                              - generic [ref=e317]: 未评分 · 待教师反馈
                              - generic [ref=e319]:
                                - generic [ref=e320]: 林
                                - generic [ref=e322]: 王
                                - generic [ref=e324]: 陈
                                - generic [ref=e326]: 周
                            - generic [ref=e328]: —
                        - listitem [ref=e329]:
                          - button "未进组" [ref=e331] [cursor=pointer]:
                            - generic [ref=e332]:
                              - generic [ref=e333]: 未进组
                              - generic [ref=e334]: 未评分 · 待教师反馈
                              - generic [ref=e336]:
                                - generic [ref=e337]: 林
                                - generic [ref=e339]: 王
                                - generic [ref=e341]: 陈
                                - generic [ref=e343]: 周
                            - generic [ref=e345]: —
                    - generic [ref=e346]: 点击对象，右侧内容随之更新
                  - separator "调整小组列表宽度" [ref=e347]
                  - article [ref=e348]:
                    - generic [ref=e349]:
                      - generic [ref=e350]:
                        - heading "探索者小组" [level=3] [ref=e351]
                        - paragraph [ref=e352]: 小组汇报：从概念到真实应用 · 已提交
                      - generic "当前小组得分" [ref=e353]: 8.5 / 10 分
                    - generic [ref=e354]:
                      - heading "小组观点摘要 论据充分" [level=4] [ref=e355]:
                        - text: 小组观点摘要
                        - generic [ref=e356]: 论据充分
                      - paragraph [ref=e359]: 本组从资源容量、安全管理和开放边界三个方面展开分析。预约规则应公开，教学区域与公共区域应有清楚的区别。
                    - heading "讨论过程与成员参与" [level=4] [ref=e360]
                    - generic [ref=e361]:
                      - generic [ref=e362]:
                        - generic [ref=e363]: 林
                        - generic [ref=e365]:
                          - generic [ref=e366]:
                            - generic [ref=e367]: 林可
                            - generic [ref=e368]: 11:32
                          - paragraph [ref=e369]: 我们先把问题分为几个独立的方面，再分别寻找依据。
                      - generic [ref=e370]:
                        - generic [ref=e371]: 陈
                        - generic [ref=e373]:
                          - generic [ref=e374]:
                            - generic [ref=e375]: 陈宁
                            - generic [ref=e376]: 11:35
                          - paragraph [ref=e377]: 这份结论需要明确实施条件与适用的边界。
                      - generic [ref=e378]:
                        - generic [ref=e379]: 周
                        - generic [ref=e381]:
                          - generic [ref=e382]:
                            - generic [ref=e383]: 周晓
                            - generic [ref=e384]: 11:38
                          - paragraph [ref=e385]: 可以将上述分析整理为可执行的方案，再与其他组比较。
  - generic [ref=e386]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import { expect, test, type Locator, type Page } from '@playwright/test';
  2  | const open=async(page:Page,sample:string)=>{await page.goto(`/?sample=${sample}#navigation-v042`);await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();};
  3  | const region=(root:Locator,id:string)=>root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
  4  | const restore=(root:Locator,id:string)=>root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`);
  5  | const shape=async(locator:Locator)=>locator.evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
  6  | 
  7  | for(const width of [1200,1440,1600])for(const [sample,scene] of [['R1','plan'],['R1','industry'],['R2',''],['R3','files'],['R3','errors'],['R4','interaction'],['R4','grading'],['R5',''],['R6','']]){
  8  |   test(`nine-scene matrix ${sample}/${scene||'default'} at ${width}`,async({page})=>{
  9  |     const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));await open(page,sample!);
  10 |     if(scene)await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
  11 |     await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  12 |     const canvas=page.getByTestId('candidate-canvas'),root=canvas.locator('.rain-workspace');
  13 |     await expect(root).toHaveCount(1);await expect(root).toBeVisible();expect((await shape(root)).width).toBe(width);
  14 |     const controls=root.locator('.rain-workspace__restore');expect(await controls.count()).toBeGreaterThan(0);
  15 |     for(const control of await controls.all()){
  16 |       expect(await control.getAttribute('aria-label')).toBeTruthy();const id=await control.getAttribute('aria-controls');await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  17 |     }
  18 |     expect(await root.evaluate(e=>Array.from(e.querySelectorAll('path')).some(path=>/NaN|Infinity/.test(path.getAttribute('d')??'')))).toBe(false);
  19 |     expect(errors).toEqual([]);
  20 |   });
  21 | }
  22 | test('R4 interaction selected group and activity stay synchronized through temporary recovery',async({page})=>{
  23 |   await open(page,'R4');const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  24 |   await root.getByRole('group',{name:'课堂活动'}).getByRole('button',{name:'小组汇报：从概念到真实应用'}).click();
  25 |   await root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'}).click();
  26 |   await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();await expect(root.getByLabel('当前小组得分')).toContainText('8.5');
  27 |   await region(root,'queue').getByRole('button',{name:/取消固定/}).click();const main=await shape(root.locator('.nv5-group-detail'));
  28 |   await page.keyboard.press('Escape');await expect(region(root,'queue')).toBeHidden();await restore(root,'queue').click();
> 29 |   expect(await shape(root.locator('.nv5-group-detail'))).toEqual(main);await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'})).toHaveAttribute('aria-pressed','true');
     |                                                          ^ Error: expect(received).toEqual(expected) // deep equality
  30 | });
  31 | test('N10 N12 N13 R4 grading ownership survives layout and subscene changes without saving',async({page})=>{
  32 |   await open(page,'R4');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  33 |   const draft=root.getByRole('textbox',{name:'给当前作答的反馈'});await draft.fill('请说明推导条件。');await root.getByRole('spinbutton',{name:'当前作答得分'}).fill('9.2');
  34 |   await region(root,'review').getByRole('button',{name:/隐藏/}).click();await restore(root,'review').click();await expect(draft).toHaveValue('请说明推导条件。');
  35 |   await root.getByRole('button',{name:'专注作答预览',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();
  36 |   await expect(root.locator('.nv5-demo-note')).toContainText('未提交成绩');
  37 |   await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'欧阳小明'}).click();await expect(draft).toHaveValue('');await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('7');
  38 |   await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'李梦'}).click();await expect(draft).toHaveValue('请说明推导条件。');
  39 |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('interaction');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');
  40 |   await expect(root).toHaveAttribute('data-focused','false');await expect(draft).toHaveValue('请说明推导条件。');await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('9.2');
  41 | });
  42 | test('N08 R5 explicit seek and focus restore preserve playback and hidden knowledge',async({page})=>{
  43 |   await open(page,'R5');const root=page.locator('[data-recipe-id="recipe-navigation-r5"]');
  44 |   await root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'随堂练习 · 等效电路'}).click();
  45 |   await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(root.getByLabel('回放时间')).toContainText('16:24');await expect(root.getByRole('button',{name:'16:24 一起试一试'})).toHaveAttribute('aria-pressed','true');
  46 |   await region(root,'knowledge').getByRole('button',{name:/隐藏/}).click();await root.getByRole('button',{name:'专注回放',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(region(root,'knowledge')).toBeHidden();
  47 |   await restore(root,'knowledge').click();await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(root.getByRole('button',{name:'播放回放',exact:true})).toBeVisible();
  48 | });
  49 | test('R6 views, page identity, added fields and form drafts have independent ownership',async({page})=>{
  50 |   await open(page,'R6');const root=page.locator('[data-recipe-id="recipe-navigation-r6"]'),draft=root.getByRole('textbox',{name:'你希望我们改进的地方'});await draft.fill('增加概念辨析练习。');
  51 |   await root.getByRole('button',{name:'新增文本题'}).click();await root.getByRole('textbox',{name:'新增文本题 1'}).fill('本实例附加题');
  52 |   await region(root,'fields').getByRole('button',{name:/隐藏/}).click();await restore(root,'fields').click();await expect(draft).toHaveValue('增加概念辨析练习。');
  53 |   await root.getByRole('tab',{name:'表格',exact:true}).click();await root.getByRole('tab',{name:'反馈表单',exact:true}).click();await expect(root.getByRole('textbox',{name:'新增文本题 1'})).toHaveValue('本实例附加题');
  54 |   await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'课程任务',exact:true}).click();await expect(root.getByRole('table',{name:'课程任务记录'})).toBeVisible();
  55 |   await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'学习反馈',exact:true}).click();await expect(root.getByRole('tab',{name:'反馈表单',exact:true})).toHaveAttribute('aria-selected','true');await expect(draft).toHaveValue('增加概念辨析练习。');
  56 | });
  57 | test('N02 N03 S3 other region hide/show executes on the first click while context is temporary',async({page})=>{
  58 |   await open(page,'S3');const root=page.locator('[data-recipe-id="recipe-navigation-r6"]');await restore(root,'context').click();await expect(region(root,'context')).toHaveAttribute('data-temporary','true');
  59 |   await region(root,'directory').getByRole('button',{name:/隐藏/}).click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeHidden();
  60 |   await restore(root,'context').click();await restore(root,'directory').click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeVisible();
  61 | });
  62 | test('N09 N25 S5 ribbon modes have exact persistent heights and no temporary document displacement',async({page})=>{
  63 |   await open(page,'S5');const root=page.locator('.nv44-workspace'),ribbon=region(root,'ribbon'),paper=root.locator('.nv44-editor-paper'),draft=root.getByRole('textbox',{name:'教学目标草稿'});await draft.fill('工具区切换保留此目标。');
  64 |   for(const [mode,height] of [['full',111],['icons',83],['tabs',41],['hidden',0]] as const){
  65 |     await root.getByRole('button',{name:'布局设置'}).click();await page.getByRole('combobox',{name:'文档工具显示模式'}).selectOption(mode);await page.keyboard.press('Escape');
  66 |     if(height)expect((await shape(ribbon)).height).toBe(height);else await expect(ribbon).toBeHidden();
  67 |     if(mode==='tabs'||mode==='hidden'){
  68 |       const y=(await shape(paper)).y;if(mode==='tabs')await ribbon.getByRole('tab',{name:'插入',exact:true}).click();else await restore(root,'ribbon').click();
  69 |       await expect(ribbon).toHaveAttribute('data-temporary','true');expect((await shape(ribbon)).height).toBe(112);expect((await shape(paper)).y).toBe(y);await page.keyboard.press('Escape');expect((await shape(paper)).y).toBe(y);
  70 |     }
  71 |     await expect(draft).toHaveValue('工具区切换保留此目标。');
  72 |   }
  73 |   await root.getByRole('button',{name:'专注内容',exact:true}).click();await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:'S6',exact:true}).click();await expect(page.locator('[data-recipe-id="recipe-navigation-r5"]')).toHaveAttribute('data-focused','false');
  74 | });
  75 | test('N22 short-height layout menu keeps the last control reachable',async({page})=>{
  76 |   await page.setViewportSize({width:1200,height:420});await open(page,'S3');await page.locator('[data-recipe-id="recipe-navigation-r6"]').getByRole('button',{name:'布局设置'}).click();
  77 |   const dialog=page.getByRole('dialog');await dialog.getByRole('button',{name:'隐藏全部区域',exact:true}).click();
  78 |   await expect(dialog.getByRole('button',{name:'隐藏全部区域',exact:true})).toBeInViewport();await page.keyboard.press('Escape');await expect(page.locator('.rain-workspace__restore[aria-controls$="-workspace-directory"]')).toBeVisible();
  79 | });
  80 | test('N33 independent nine-scene consumer has no reference runtime and runs new business states',async({page})=>{
  81 |   await page.goto('/navigation-v042-w3-consumer.html');
  82 |   for(const [label,id] of [['课堂互动','r4'],['教师批改','r4'],['课堂回放','r5'],['协作空间','r6']] as const){await page.getByRole('radio',{name:label,exact:true}).locator('..').click();await expect(page.locator(`[data-recipe-id="recipe-navigation-${id}"]`)).toBeVisible();}
  83 |   expect(await page.evaluate(()=>['YKT_DEBUG','YKT_VISIBILITY','ui','vApply'].filter(key=>key in window))).toEqual([]);await expect(page.locator('iframe')).toHaveCount(0);
  84 | });
  85 | 
```