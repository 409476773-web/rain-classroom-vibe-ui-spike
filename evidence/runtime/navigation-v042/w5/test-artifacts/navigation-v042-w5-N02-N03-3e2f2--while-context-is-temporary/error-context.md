# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w5.spec.ts >> N02 N03 S3 other region hide/show executes on the first click while context is temporary
- Location: tests/e2e/navigation-v042-w5.spec.ts:57:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-recipe-id="recipe-navigation-r6"]').locator('.rain-workspace__region[data-region-id="directory"]').getByRole('button', { name: /隐藏/ })
    - locator resolved to <button aria-label="隐藏内部目录" data-workspace-action="hide">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv5-document-app">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv5-document-app">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    57 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="nv5-document-app">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

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
      - checkbox "深色外框" [ref=e41]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e42] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#S3
  - generic "R6 工作区" [ref=e46]:
    - generic "当前工作区与区域恢复" [ref=e47]:
      - generic "显示与隐藏区域" [ref=e48]:
        - button "展开平台导航" [ref=e49] [cursor=pointer]
        - button "关闭临时工作区" [expanded] [active] [ref=e50] [cursor=pointer]:
          - generic [ref=e52]: 显示工作区
        - button "隐藏内部目录" [expanded] [ref=e53] [cursor=pointer]
        - button "隐藏编辑工具" [expanded] [ref=e54] [cursor=pointer]
      - generic [ref=e56]:
        - strong [ref=e57]: 课程教学协作空间
        - generic [ref=e58]: 学习反馈 / 反馈表单
      - button "专注内容" [ref=e59] [cursor=pointer]
      - button "布局设置" [ref=e62] [cursor=pointer]:
        - generic [ref=e64]: 布局
    - generic [ref=e65]:
      - generic "平台导航" [ref=e67]:
        - generic [ref=e68]:
          - navigation "平台功能" [ref=e71]:
            - list [ref=e72]:
              - listitem [ref=e73]:
                - link "工作台" [ref=e75] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e80]:
                - link "课程" [ref=e82] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e87]:
                - link "资源" [ref=e89] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e94]:
                - link "专业" [ref=e96] [cursor=pointer]:
                  - /url: "#navigation-v042"
          - generic [ref=e101]:
            - button "通知" [ref=e102] [cursor=pointer]
            - button "帮助" [ref=e104] [cursor=pointer]
            - generic [ref=e106]: 林
      - generic "工作区" [ref=e108]:
        - generic [ref=e109]:
          - strong [ref=e110]: 工作区
          - generic [ref=e111]: 临时
          - button "固定工作区" [ref=e112] [cursor=pointer]
          - button "隐藏工作区" [ref=e114] [cursor=pointer]
        - strong [ref=e118]: 云文档
        - textbox "搜索工作区" [ref=e122]
        - navigation "云文档功能" [ref=e124]:
          - list [ref=e125]:
            - listitem [ref=e126]:
              - link "主页" [ref=e128] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e133]:
              - link "云盘" [ref=e135] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e140]:
              - link "知识库" [ref=e142] [cursor=pointer]:
                - /url: "#navigation-v042"
        - heading "置顶工作区" [level=5] [ref=e147]
        - navigation "置顶工作区" [ref=e148]:
          - list [ref=e149]:
            - listitem [ref=e150]:
              - link "课程教学协作空间" [ref=e152] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e157]:
              - link "教学设计与教研" [ref=e159] [cursor=pointer]:
                - /url: "#navigation-v042"
        - heading "我的文档" [level=5] [ref=e164]
        - navigation "我的文档" [ref=e165]:
          - list [ref=e166]:
            - listitem [ref=e167]:
              - link "2026 学期工作计划" [ref=e169] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e174]:
              - link "课程目标与评价方案" [ref=e176] [cursor=pointer]:
                - /url: "#navigation-v042"
        - generic [ref=e181]: 个人空间 · 本地示例
      - generic [ref=e182]:
        - generic [ref=e183]:
          - generic [ref=e184]:
            - generic [ref=e185]:
              - strong [ref=e188]: 课程教学协作空间
              - generic [ref=e189]: / 学习反馈
            - generic [ref=e191]: 教学协作 / 2026 秋季学期 · 演示空间
          - button "分享" [ref=e192] [cursor=pointer]
          - button "更多工作区操作" [ref=e196] [cursor=pointer]
        - generic [ref=e198]:
          - generic "内部目录" [ref=e200]:
            - generic [ref=e201]:
              - strong [ref=e202]: 内部目录
              - generic [ref=e203]: 常驻
              - button "取消固定内部目录" [ref=e204] [cursor=pointer]
              - button "隐藏内部目录" [ref=e206] [cursor=pointer]
            - generic [ref=e208]: 工作区内部
            - navigation "工作区页面" [ref=e209]:
              - list [ref=e210]:
                - listitem [ref=e211]:
                  - link "课程任务" [ref=e213] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e218]:
                  - link "学习反馈" [ref=e220] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e225]:
                  - link "教研周报" [ref=e227] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e232]:
                  - link "资源素材" [ref=e234] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - heading "扩展内容" [level=5] [ref=e239]
            - navigation "工作区扩展页面" [ref=e240]:
              - list [ref=e241]:
                - listitem [ref=e242]:
                  - link "课程介绍" [ref=e244] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e249]:
                  - link "参考资料" [ref=e251] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - button "+ 新建页面" [ref=e257] [cursor=pointer]
          - separator "调整内部目录宽度" [ref=e259]
          - generic [ref=e261]:
            - generic "分区导航" [ref=e263]:
              - tablist "页面内容视图" [ref=e267]:
                - tab "表格" [ref=e268] [cursor=pointer]
                - tab "状态分组" [ref=e274] [cursor=pointer]
                - tab "画册" [ref=e280] [cursor=pointer]
                - tab "反馈表单" [selected] [ref=e286] [cursor=pointer]
            - tabpanel "反馈表单" [ref=e294]:
              - generic [ref=e295]:
                - generic [ref=e296]:
                  - radiogroup "反馈表单模式" [ref=e298]:
                    - generic [ref=e300]:
                      - generic [ref=e301] [cursor=pointer]:
                        - radio "编辑表单" [checked] [ref=e302]
                        - generic [ref=e303]: 编辑表单
                      - generic [ref=e304] [cursor=pointer]:
                        - radio "填写预览" [ref=e305]
                        - generic [ref=e306]: 填写预览
                  - button "筛选视图" [ref=e307] [cursor=pointer]
                  - button "链接选项" [ref=e309] [cursor=pointer]
                  - button "视图设置" [ref=e311] [cursor=pointer]
                - generic [ref=e313]:
                  - generic "编辑工具" [ref=e315]:
                    - generic [ref=e316]:
                      - strong [ref=e317]: 编辑工具
                      - generic [ref=e318]: 常驻
                      - button "取消固定编辑工具" [ref=e319] [cursor=pointer]
                      - button "隐藏编辑工具" [ref=e321] [cursor=pointer]
                    - heading "表单内容" [level=4] [ref=e323]
                    - generic [ref=e324]: 课程信息
                    - generic [ref=e326]: 学习体验
                    - generic [ref=e328]: 建议与反馈
                    - separator [ref=e330]
                    - heading "新增题目" [level=4] [ref=e331]
                    - button "新增文本题" [ref=e332] [cursor=pointer]:
                      - text: 文本
                      - generic [ref=e334]: +
                    - button "新增单选题" [ref=e335] [cursor=pointer]:
                      - text: 单选
                      - generic [ref=e337]: +
                    - button "新增评分题" [ref=e338] [cursor=pointer]:
                      - text: 评分
                      - generic [ref=e340]: +
                    - button "新增附件题" [ref=e341] [cursor=pointer]:
                      - text: 附件
                      - generic [ref=e343]: +
                    - paragraph [ref=e344]: 新增内容只影响当前表单示例。
                  - separator "调整编辑工具宽度" [ref=e345]
                  - generic [ref=e347]:
                    - generic [ref=e348]: COURSE FEEDBACK / 2026
                    - generic [ref=e351]:
                      - heading "课程学习反馈" [level=2] [ref=e352]
                      - paragraph [ref=e353]: 让每一次反馈，帮助我们一起改进课堂。本地示例，反馈不会发送给教师。
                      - generic [ref=e354]:
                        - generic [ref=e355]: 你正在学习的课程 *
                        - textbox "课程名称" [ref=e357]:
                          - /placeholder: 请输入课程名称
                          - text: 高等数学 A
                      - radiogroup "本阶段课程内容的理解程度" [ref=e360]:
                        - generic [ref=e362]:
                          - generic [ref=e363] [cursor=pointer]:
                            - radio "能够理解并独立应用" [ref=e364]
                            - generic [ref=e367]: 能够理解并独立应用
                          - generic [ref=e369] [cursor=pointer]:
                            - radio "基本理解，需要更多练习" [checked] [ref=e370]
                            - generic [ref=e374]: 基本理解，需要更多练习
                          - generic [ref=e376] [cursor=pointer]:
                            - radio "希望获得进一步的讲解" [ref=e377]
                            - generic [ref=e380]: 希望获得进一步的讲解
                      - generic [ref=e382]:
                        - generic [ref=e383]: 你希望补充哪些内容？
                        - textbox "你希望我们改进的地方" [ref=e385]:
                          - /placeholder: 写下你的具体建议…
                      - button "本地保存示例" [ref=e386] [cursor=pointer]
  - generic [ref=e388]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
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
  29 |   expect(await shape(root.locator('.nv5-group-detail'))).toEqual(main);await expect(root.getByRole('group',{name:'小组结果'}).getByRole('button',{name:'探索者小组'})).toHaveAttribute('aria-pressed','true');
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
> 59 |   await region(root,'directory').getByRole('button',{name:/隐藏/}).click();await expect(region(root,'context')).toBeHidden();await expect(region(root,'directory')).toBeHidden();
     |                                                                  ^ Error: locator.click: Test timeout of 30000ms exceeded.
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