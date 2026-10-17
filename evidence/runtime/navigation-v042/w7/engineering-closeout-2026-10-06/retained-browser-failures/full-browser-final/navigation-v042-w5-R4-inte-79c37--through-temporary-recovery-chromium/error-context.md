# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w5.spec.ts >> R4 interaction selected group and activity stay synchronized through temporary recovery
- Location: tests/e2e/navigation-v042-w5.spec.ts:30:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 1

  Object {
    "height": 538,
    "width": 938,
    "x": 515,
-   "y": 115.1875,
+   "y": 513.1875,
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
    - paragraph [ref=e9]: W3–W5 人工视觉已通过 含 R3 补充调整
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
    - generic [ref=e42]: 轻品牌
    - generic "未勾选时使用轻品牌外框" [ref=e43]:
      - checkbox "深色外框" [ref=e44]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e45] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R4
  - generic "R4 工作区" [ref=e48]:
    - generic [ref=e49]:
      - button "展开平台导航" [ref=e50] [cursor=pointer]:
        - generic [ref=e52]: 平台导航
      - button "隐藏课堂功能" [expanded] [ref=e53] [cursor=pointer]:
        - generic [ref=e55]: 课堂功能
      - button "隐藏小组列表" [expanded] [active] [ref=e56] [cursor=pointer]:
        - generic [ref=e58]: 小组列表
      - generic [ref=e60]:
        - strong [ref=e61]: 小组汇报：从概念到真实应用
        - generic "探索者小组 · 智能汇报" [ref=e62]
      - button "布局" [ref=e63] [cursor=pointer]
      - button "专注内容" [ref=e65] [cursor=pointer]
    - generic [ref=e67]:
      - generic "平台导航" [ref=e69]:
        - generic [ref=e70]:
          - button "展开平台导航" [ref=e74] [cursor=pointer]
          - navigation "平台功能" [ref=e76]:
            - list [ref=e77]:
              - listitem [ref=e78]:
                - link "工作台" [ref=e80] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e83]:
                - link "课程" [ref=e85] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e88]:
                - link "资源" [ref=e90] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e93]:
                - link "专业" [ref=e95] [cursor=pointer]:
                  - /url: "#navigation-v042"
          - generic [ref=e98]:
            - button "当前账户：林老师" [ref=e99] [cursor=pointer]
            - button "通知" [ref=e102] [cursor=pointer]
            - button "帮助" [ref=e105] [cursor=pointer]
      - generic [ref=e108]:
        - generic [ref=e109]:
          - strong [ref=e110]: 大学物理 · 第九章课堂回顾
          - generic [ref=e111]: 2026-09-24 11:21
          - button "导出数据" [ref=e112] [cursor=pointer]
        - generic [ref=e116]:
          - generic "课堂功能" [ref=e118]:
            - generic [ref=e119]:
              - strong [ref=e120]: 课堂功能
              - button "取消固定课堂功能" [ref=e121] [cursor=pointer]
              - button "隐藏课堂功能" [ref=e124] [cursor=pointer]
            - heading "课堂数据" [level=4] [ref=e127]
            - navigation "课堂功能" [ref=e128]:
              - list [ref=e129]:
                - listitem [ref=e130]:
                  - link "综合数据" [ref=e132] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e137]:
                  - link "学生表现" [ref=e139] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e144]:
                  - link "课堂习题" [ref=e146] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e151]:
                  - link "课堂互动" [ref=e153] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e158]:
                  - link "教学内容" [ref=e160] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - generic [ref=e165]: 课堂范围内的功能导航
          - separator "调整课堂功能宽度" [ref=e166]
          - main [ref=e167]:
            - generic [ref=e168]:
              - generic "分区导航" [ref=e169]:
                - tablist "课堂互动内容" [ref=e173]:
                  - tab "投稿" [ref=e174] [cursor=pointer]
                  - tab "随机点名" [ref=e178] [cursor=pointer]
                  - tab "分组讨论" [ref=e182] [cursor=pointer]
                  - tab "智能汇报" [selected] [ref=e186] [cursor=pointer]
              - tabpanel "智能汇报" [ref=e191]:
                - generic [ref=e192]:
                  - group "课堂活动" [ref=e193]:
                    - list [ref=e194]:
                      - listitem [ref=e195]:
                        - button "辩论赛：大学校园是否应该免费开放" [ref=e197] [cursor=pointer]:
                          - generic [ref=e198]:
                            - generic [ref=e199]: 辩论赛：大学校园是否应该免费开放
                            - generic [ref=e200]:
                              - generic [ref=e201]: 6 组已完成
                              - generic [ref=e203]: 21 分钟
                            - progressbar "辩论赛：大学校园是否应该免费开放完成进度" [ref=e204]:
                              - generic [ref=e206]: 完成 75%
                      - listitem [ref=e207]:
                        - button "小组汇报：从概念到真实应用" [pressed] [ref=e209] [cursor=pointer]:
                          - generic [ref=e210]:
                            - generic [ref=e211]: 小组汇报：从概念到真实应用
                            - generic [ref=e212]:
                              - generic [ref=e213]: 8 组已完成
                              - generic [ref=e215]: 36 分钟
                            - progressbar "小组汇报：从概念到真实应用完成进度" [ref=e216]:
                              - generic [ref=e218]: 完成 100%
                  - generic [ref=e219]:
                    - generic "小组列表" [ref=e221]:
                      - generic [ref=e222]:
                        - strong [ref=e223]: 小组列表
                        - button "取消固定小组列表" [ref=e224] [cursor=pointer]
                        - button "隐藏小组列表" [ref=e227] [cursor=pointer]
                      - generic [ref=e230]:
                        - generic [ref=e231]:
                          - radiogroup "小组提交状态" [ref=e233]:
                            - generic [ref=e235]:
                              - generic [ref=e236] [cursor=pointer]:
                                - radio "全部" [checked] [ref=e237]
                                - generic [ref=e238]: 全部
                              - generic [ref=e239] [cursor=pointer]:
                                - radio "已提交" [ref=e240]
                                - generic [ref=e241]: 已提交
                              - generic [ref=e242] [cursor=pointer]:
                                - radio "未评分" [ref=e243]
                                - generic [ref=e244]: 未评分
                          - generic [ref=e245]: 6 组
                        - textbox "搜索小组" [ref=e249]:
                          - /placeholder: 搜索小组名称
                      - group "小组结果" [ref=e251]:
                        - list [ref=e252]:
                          - listitem [ref=e253]:
                            - button "第一小分队" [ref=e255] [cursor=pointer]:
                              - generic [ref=e256]:
                                - generic [ref=e257]: 第一小分队
                                - generic [ref=e258]: 已提交 | 思维碰撞
                                - group "第一小分队成员" [ref=e261]:
                                  - img "林可" [ref=e263]
                                  - img "王思齐" [ref=e265]
                                  - img "陈宁" [ref=e267]
                                  - img "周晓" [ref=e269]
                              - generic [ref=e270]: "9.0"
                          - listitem [ref=e271]:
                            - button "探索者小组" [pressed] [ref=e273] [cursor=pointer]:
                              - generic [ref=e274]:
                                - generic [ref=e275]: 探索者小组
                                - generic [ref=e276]: 已提交 | 论据充分
                                - group "探索者小组成员" [ref=e279]:
                                  - img "林可" [ref=e281]
                                  - img "王思齐" [ref=e283]
                                  - img "陈宁" [ref=e285]
                                  - img "周晓" [ref=e287]
                              - generic [ref=e288]: "8.5"
                          - listitem [ref=e289]:
                            - button "向量研究组" [ref=e291] [cursor=pointer]:
                              - generic [ref=e292]:
                                - generic [ref=e293]: 向量研究组
                                - generic [ref=e294]: 已提交 | 观点清晰
                                - group "向量研究组成员" [ref=e297]:
                                  - img "林可" [ref=e299]
                                  - img "王思齐" [ref=e301]
                                  - img "陈宁" [ref=e303]
                                  - img "周晓" [ref=e305]
                              - generic [ref=e306]: "9.5"
                          - listitem [ref=e307]:
                            - button "第四学习小组" [ref=e309] [cursor=pointer]:
                              - generic [ref=e310]:
                                - generic [ref=e311]: 第四学习小组
                                - generic [ref=e312]: 已提交 | 积极参与
                                - group "第四学习小组成员" [ref=e315]:
                                  - img "林可" [ref=e317]
                                  - img "王思齐" [ref=e319]
                                  - img "陈宁" [ref=e321]
                                  - img "周晓" [ref=e323]
                              - generic [ref=e324]: "8.0"
                          - listitem [ref=e325]:
                            - button "知行合一" [ref=e327] [cursor=pointer]:
                              - generic [ref=e328]:
                                - generic [ref=e329]: 知行合一
                                - generic [ref=e330]: 未评分 | 待教师反馈
                                - group "知行合一成员" [ref=e333]:
                                  - img "林可" [ref=e335]
                                  - img "王思齐" [ref=e337]
                                  - img "陈宁" [ref=e339]
                                  - img "周晓" [ref=e341]
                              - generic [ref=e342]: —
                          - listitem [ref=e343]:
                            - button "未进组" [ref=e345] [cursor=pointer]:
                              - generic [ref=e346]:
                                - generic [ref=e347]: 未进组
                                - generic [ref=e348]: 未评分 | 待教师反馈
                                - group "未进组成员" [ref=e351]:
                                  - img "林可" [ref=e353]
                                  - img "王思齐" [ref=e355]
                                  - img "陈宁" [ref=e357]
                                  - img "周晓" [ref=e359]
                              - generic [ref=e360]: —
                      - generic [ref=e361]: 共 6 个小组
                    - separator "调整小组列表宽度" [ref=e362]
                    - article [ref=e363]:
                      - generic [ref=e364]:
                        - img "探索者小组成员" [ref=e365]
                        - generic [ref=e377]:
                          - heading "探索者小组" [level=3] [ref=e378]
                          - paragraph [ref=e379]: 小组汇报：从概念到真实应用 · 已提交
                        - generic "当前小组得分" [ref=e380]: 8.5 / 10
                      - generic [ref=e381]:
                        - heading "讨论摘要 示例" [level=4] [ref=e382]:
                          - text: 讨论摘要
                          - generic [ref=e384]: 示例
                        - paragraph [ref=e387]: 本组从资源容量、安全管理和开放边界三个方面展开分析。预约规则应公开，教学区域与公共区域应有清楚的区别。
                        - generic [ref=e388]:
                          - generic [ref=e389]: 论据充分
                          - generic [ref=e392]: 观点组织
                      - generic [ref=e395]:
                        - heading "最终结论" [level=4] [ref=e396]
                        - paragraph [ref=e397]: 本组从资源容量、安全管理和开放边界三个方面展开分析。预约规则应公开，教学区域与公共区域应有清楚的区别。
                      - heading "讨论过程 3 条示例" [level=4] [ref=e398]
                      - generic [ref=e399]:
                        - generic [ref=e403]:
                          - generic [ref=e404]:
                            - generic [ref=e405]: 林可
                            - generic [ref=e406]: 11:32
                          - paragraph [ref=e407]: 我们先把问题分为几个独立的方面，再分别寻找依据。
                        - generic [ref=e411]:
                          - generic [ref=e412]:
                            - generic [ref=e413]: 陈宁
                            - generic [ref=e414]: 11:35
                          - paragraph [ref=e415]: 这份结论需要明确实施条件与适用的边界。
                        - generic [ref=e419]:
                          - generic [ref=e420]:
                            - generic [ref=e421]: 周晓
                            - generic [ref=e422]: 11:38
                          - paragraph [ref=e423]: 可以将上述分析整理为可执行的方案，再与其他组比较。
  - generic [ref=e424]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page } from '@playwright/test';
  2   | const open=async(page:Page,sample:string)=>{await page.goto(`/?sample=${sample}#navigation-v042`);await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();};
  3   | const region=(root:Locator,id:string)=>root.locator(`.rain-workspace__region[data-region-id="${id}"]`);
  4   | const restore=(root:Locator,id:string)=>root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`);
  5   | const shape=async(locator:Locator)=>locator.evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
  6   | 
  7   | for(const width of [1200,1440,1600])for(const [sample,scene] of [['R1','plan'],['R1','industry'],['R2',''],['R3','files'],['R3','errors'],['R4','interaction'],['R4','grading'],['R5',''],['R6','']]){
  8   |   test(`nine-scene matrix ${sample}/${scene||'default'} at ${width}`,async({page},testInfo)=>{
  9   |     const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));await open(page,sample!);
  10  |     if(scene)await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
  11  |     await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  12  |     const canvas=page.getByTestId('candidate-canvas'),root=canvas.locator('.rain-workspace');
  13  |     await expect(root).toHaveCount(1);await expect(root).toBeVisible();expect((await shape(root)).width).toBe(width);
  14  |     expect(await root.locator('.rain-workspace__region:not([hidden])').count()).toBeGreaterThan(0);
  15  |     if(width>=1440){for(const pane of await root.locator('.rain-workspace__region').all())await expect(pane).toHaveAttribute('data-mode',await pane.getAttribute('data-region-id')==='global'?'compact':'expanded');}
  16  |     if(width===1200&&(sample==='R5'||sample==='R6')){
  17  |       await expect(region(root,'global')).toHaveAttribute('data-mode','hidden');
  18  |       const note=root.locator('.nv5-adaptation');await expect(note).toContainText('你的展开偏好未被覆盖');expect((await shape(note)).height).toBe(24);
  19  |       if(sample==='R6')await expect(region(root,'fields')).toHaveAttribute('data-mode','hidden');
  20  |     }
  21  |     const controls=root.locator('.rain-workspace__restore');expect(await controls.count()).toBeGreaterThan(0);
  22  |     for(const control of await controls.all()){
  23  |       expect(await control.getAttribute('aria-label')).toBeTruthy();const id=await control.getAttribute('aria-controls');await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  24  |     }
  25  |     expect(await root.evaluate(e=>Array.from(e.querySelectorAll('path')).some(path=>/NaN|Infinity/.test(path.getAttribute('d')??'')))).toBe(false);
  26  |     expect(errors).toEqual([]);
  27  |     await root.screenshot({path:testInfo.outputPath('workspace.png')});
  28  |   });
  29  | }
  30  | test('R4 interaction selected group and activity stay synchronized through temporary recovery',async({page})=>{
  31  |   await open(page,'R4');const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  32  |   await root.getByRole('group',{name:'课堂活动'}).getByRole('button',{name:'小组汇报：从概念到真实应用'}).click();
  33  |   await root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'}).click();
  34  |   await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();await expect(root.getByLabel('当前小组得分')).toContainText('8.5');
  35  |   const main=await shape(root.locator('.nv5-group-detail'));await region(root,'queue').getByRole('button',{name:/取消固定/}).click();await expect(region(root,'queue')).toHaveAttribute('data-temporary','true');
  36  |   await page.keyboard.press('Escape');await expect(region(root,'queue')).toBeHidden();await restore(root,'queue').click();
> 37  |   expect(await shape(root.locator('.nv5-group-detail'))).toEqual(main);await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'})).toHaveAttribute('aria-pressed','true');
      |                                                          ^ Error: expect(received).toEqual(expected) // deep equality
  38  | });
  39  | test('N10 N12 N13 R4 grading ownership survives layout and subscene changes without saving',async({page})=>{
  40  |   await open(page,'R4');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  41  |   const draft=root.getByRole('textbox',{name:'给当前作答的反馈'});await draft.fill('请说明推导条件。');await root.getByRole('spinbutton',{name:'当前作答得分'}).fill('9.2');
  42  |   await region(root,'review').getByRole('button',{name:/隐藏/}).click();await restore(root,'review').click();await expect(draft).toHaveValue('请说明推导条件。');
  43  |   await root.getByRole('button',{name:'专注作答预览',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();
  44  |   await expect(root.locator('.nv5-demo-note')).toContainText('未提交成绩');
  45  |   await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'欧阳小明'}).click();await expect(draft).toHaveValue('');await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('7.0');
  46  |   await root.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'李梦'}).click();await expect(draft).toHaveValue('请说明推导条件。');
  47  |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('interaction');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');
  48  |   await expect(root).toHaveAttribute('data-focused','false');await expect(draft).toHaveValue('请说明推导条件。');await expect(root.getByRole('spinbutton',{name:'当前作答得分'})).toHaveValue('9.2');
  49  | });
  50  | test('N08 R5 explicit seek and focus restore preserve playback and hidden knowledge',async({page})=>{
  51  |   await open(page,'R5');const root=page.locator('[data-recipe-id="recipe-navigation-r5"]');
  52  |   await root.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'随堂练习 · 等效电路'}).click();
  53  |   await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(root.getByLabel('回放时间')).toContainText('16:24');await expect(root.getByRole('button',{name:'16:24 一起试一试'})).toHaveAttribute('aria-pressed','true');
  54  |   await region(root,'knowledge').getByRole('button',{name:/隐藏/}).click();await root.getByRole('button',{name:'专注回放',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(region(root,'knowledge')).toBeHidden();
  55  |   await restore(root,'knowledge').click();await expect(root.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(root.getByRole('button',{name:'播放回放',exact:true})).toBeVisible();
  56  | });
  57  | test('R6 views, page identity, added fields and form drafts have independent ownership',async({page})=>{
  58  |   await open(page,'R6');const root=page.locator('[data-recipe-id="recipe-navigation-r6"]'),draft=root.getByRole('textbox',{name:'你希望我们改进的地方'});await draft.fill('增加概念辨析练习。');
  59  |   await root.getByRole('button',{name:'新增文本题'}).click();await root.getByRole('textbox',{name:'新增文本题 1'}).fill('本实例附加题');
  60  |   await region(root,'fields').getByRole('button',{name:/隐藏/}).click();await restore(root,'fields').click();await expect(draft).toHaveValue('增加概念辨析练习。');
  61  |   await root.getByRole('tab',{name:'表格',exact:true}).click();await root.getByRole('tab',{name:'反馈表单',exact:true}).click();await expect(root.getByRole('textbox',{name:'新增文本题 1'})).toHaveValue('本实例附加题');
  62  |   await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'课程任务',exact:true}).click();await expect(root.getByRole('table',{name:'课程任务记录'})).toBeVisible();
  63  |   await root.getByRole('navigation',{name:'工作区页面'}).getByRole('link',{name:'学习反馈',exact:true}).click();await expect(root.getByRole('tab',{name:'反馈表单',exact:true})).toHaveAttribute('aria-selected','true');await expect(draft).toHaveValue('增加概念辨析练习。');
  64  | });
  65  | test('N02 N03 S3 other region hide/show executes on the first click while context is temporary',async({page})=>{
  66  |   await open(page,'S3');const root=page.locator('[data-recipe-id="recipe-navigation-r6"]');await restore(root,'context').click();await expect(region(root,'context')).toHaveAttribute('data-temporary','true');
  67  |   await restore(root,'directory').click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeHidden();
  68  |   await restore(root,'context').click();await restore(root,'directory').click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeVisible();
  69  | });
  70  | test('N09 N25 S5 ribbon modes have exact persistent heights and no temporary document displacement',async({page})=>{
  71  |   await open(page,'S5');const root=page.locator('.nv44-workspace'),ribbon=region(root,'ribbon'),paper=root.locator('.nv44-editor-paper'),draft=root.getByRole('textbox',{name:'教学目标草稿'});await draft.fill('工具区切换保留此目标。');
  72  |   for(const [mode,height] of [['full',111],['icons',83],['tabs',41],['hidden',0]] as const){
  73  |     await root.getByRole('button',{name:'布局设置'}).click();await page.getByRole('combobox',{name:'文档工具显示模式'}).selectOption(mode);await page.keyboard.press('Escape');
  74  |     if(height)expect((await shape(ribbon)).height).toBe(height);else await expect(ribbon).toBeHidden();
  75  |     if(mode==='tabs'||mode==='hidden'){
  76  |       const y=(await shape(paper)).y;
  77  |       if(mode==='tabs'){
  78  |         await ribbon.getByRole('tab',{name:'开始',exact:true}).click();
  79  |         await expect(ribbon).toHaveAttribute('data-temporary','true');
  80  |         expect((await shape(paper)).y).toBe(y);await page.keyboard.press('Escape');
  81  |         await ribbon.getByRole('tab',{name:'插入',exact:true}).click();
  82  |       }else await restore(root,'ribbon').click();
  83  |       await expect(ribbon).toHaveAttribute('data-temporary','true');expect((await shape(ribbon)).height).toBe(112);expect((await shape(paper)).y).toBe(y);await page.keyboard.press('Escape');expect((await shape(paper)).y).toBe(y);
  84  |     }
  85  |     await expect(draft).toHaveValue('工具区切换保留此目标。');
  86  |   }
  87  |   await root.getByRole('button',{name:'专注内容',exact:true}).click();await expect(root.locator('.nv44-workspace-head')).toBeHidden();
  88  |   await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(root.locator('.nv44-workspace-head')).toBeVisible();await expect(draft).toHaveValue('工具区切换保留此目标。');
  89  |   await root.getByRole('button',{name:'专注内容',exact:true}).click();await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:'S6',exact:true}).click();await expect(page.locator('[data-recipe-id="recipe-navigation-r5"]')).toHaveAttribute('data-focused','false');
  90  | });
  91  | test('N22 short-height layout menu keeps the last control reachable',async({page})=>{
  92  |   await page.setViewportSize({width:1200,height:420});await open(page,'S3');await page.locator('[data-recipe-id="recipe-navigation-r6"]').getByRole('button',{name:'布局设置'}).click();
  93  |   const dialog=page.getByRole('dialog');await dialog.getByRole('button',{name:'隐藏全部区域',exact:true}).click();
  94  |   await expect(dialog.getByRole('button',{name:'隐藏全部区域',exact:true})).toBeInViewport();await page.keyboard.press('Escape');await expect(page.locator('.rain-workspace__restore[aria-controls$="-workspace-directory"]')).toBeVisible();
  95  | });
  96  | test('S3 and S4 recovery identity follows the actual page, view and grading object',async({page})=>{
  97  |   await open(page,'S3');const document=page.locator('[data-recipe-id="recipe-navigation-r6"]');
  98  |   await document.getByRole('tab',{name:'状态分组',exact:true}).click();
  99  |   await expect(document.locator('.nv44-identity small')).toContainText('状态分组');
  100 |   await document.getByRole('link',{name:'课程任务',exact:true}).click();
  101 |   await expect(document.locator('.nv44-identity small')).toContainText('课程任务 / 表格');
  102 |   await open(page,'S4');await page.getByRole('combobox',{name:'业务子场景'}).selectOption('grading');
  103 |   const grading=page.locator('[data-recipe-id="recipe-navigation-r4"]');
  104 |   expect((await shape(grading.locator('.nv5-pdf-page:visible'))).width).toBe(826);
  105 |   await expect(grading.locator('.nv44-identity strong')).toContainText('李梦');
  106 |   await grading.getByRole('group',{name:'学生队列'}).getByRole('button',{name:'欧阳小明',exact:true}).click();
  107 |   await expect(grading.locator('.nv44-identity strong')).toContainText('欧阳小明');
  108 |   await grading.getByRole('radio',{name:'按人批改',exact:true}).locator('..').click();
  109 |   await expect(grading.locator('.nv44-identity small')).toContainText('按人批改');
  110 | });
  111 | test('N33 independent nine-scene consumer has no reference runtime and runs new business states',async({page})=>{
  112 |   await page.goto('/navigation-v042-w3-consumer.html');
  113 |   for(const [label,id] of [['课堂互动','r4'],['教师批改','r4'],['课堂回放','r5'],['协作空间','r6']] as const){await page.getByRole('radio',{name:label,exact:true}).locator('..').click();await expect(page.locator(`[data-recipe-id="recipe-navigation-${id}"]`)).toBeVisible();}
  114 |   expect(await page.evaluate(()=>['YKT_DEBUG','YKT_VISIBILITY','ui','vApply'].filter(key=>key in window))).toEqual([]);await expect(page.locator('iframe')).toHaveCount(0);
  115 | });
  116 | test('N37 instance B name, condition density and connection preserve instance A DOM and draft',async({page})=>{
  117 |   await page.goto('/navigation-v042-w3-consumer.html');await page.getByRole('radio',{name:'实例隔离',exact:true}).locator('..').click();const a=page.getByRole('region',{name:'实例 A',exact:true}),b=page.getByRole('region',{name:'实例 B',exact:true});
  118 |   await a.getByRole('textbox',{name:'实例 A 草稿'}).fill('只属于 A 的草稿');await b.getByRole('textbox',{name:'实例 B 草稿'}).fill('只属于 B 的草稿');
  119 |   const snapshot=async()=>a.evaluate(e=>{const control=e.querySelector('[data-slot="items"]')!,surface=e.querySelector('[data-rain-id="layout-connected-surface"]')!;return {html:control.outerHTML,controlHeight:control.getBoundingClientRect().height,surfaceWidth:surface.getBoundingClientRect().width,background:getComputedStyle(surface).backgroundColor};});
  120 |   const before=await snapshot();await a.getByRole('textbox',{name:'实例 A 草稿'}).evaluate(e=>e.setAttribute('data-proof-instance','original'));
  121 |   await page.getByRole('textbox',{name:'实例 B 名称'}).fill('研究资料 B');await page.getByRole('checkbox',{name:'紧凑条件'}).check();await page.getByRole('combobox',{name:'实例 B 连接'}).selectOption('merged');
  122 |   await expect(b.getByRole('tab',{name:'研究资料 B',exact:true})).toHaveAttribute('aria-selected','true');await expect(b.locator('[data-rain-id="ui-segmented-control"]')).toHaveAttribute('data-nav-density','compact');await expect(b.locator('[data-rain-id="layout-connected-surface"]')).toHaveAttribute('data-connection','merged');
  123 |   expect(await snapshot()).toEqual(before);await expect(a.getByRole('textbox',{name:'实例 A 草稿'})).toHaveAttribute('data-proof-instance','original');await expect(a.getByRole('textbox',{name:'实例 A 草稿'})).toHaveValue('只属于 A 的草稿');await expect(b.getByRole('textbox',{name:'实例 B 草稿'})).toHaveValue('只属于 B 的草稿');
  124 | });
  125 | test('actual paired R5 recipes isolate native filters and playback position',async({page})=>{
  126 |   await page.goto('/navigation-v042-w3-consumer.html');await page.getByRole('radio',{name:'双回放实例',exact:true}).locator('..').click();const a=page.getByRole('region',{name:'回放实例 A',exact:true}),b=page.getByRole('region',{name:'回放实例 B',exact:true});
  127 |   const aAll=a.getByRole('radiogroup',{name:'回顾事件类型'}).getByRole('radio',{name:'全部',exact:true});
  128 |   await b.getByRole('radiogroup',{name:'回顾事件类型'}).getByRole('radio',{name:'习题',exact:true}).locator('..').click();await expect(aAll).toBeChecked();
  129 |   await b.getByRole('group',{name:'课堂回顾事件'}).getByRole('button',{name:'随堂练习 · 等效电路'}).click();await expect(b.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('984');await expect(a.getByRole('slider',{name:'模拟播放位置'})).toHaveValue('0');
  130 |   await b.locator('.rain-workspace__restore[aria-controls$="-workspace-events"]').click();await expect(a.locator('.rain-workspace__region[data-region-id="events"]')).toBeVisible();await expect(b.locator('.rain-workspace__region[data-region-id="events"]')).toBeHidden();
  131 | });
  132 | 
```