# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-r1-r3.spec.ts >> Review11 R3 1600 heading16 file16 name15 resource color and list-grid selection
- Location: tests/e2e/navigation-v042-review11-r1-r3.spec.ts:16:2

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.check: Test timeout of 45000ms exceeded.
Call log:
  - waiting for locator('[data-rain-id=recipe-navigation-r3]').getByRole('checkbox', { name: '选择 第一章 函数、极限与连续.pdf', exact: true })
    - locator resolved to <input value="on" class="sr-only" type="checkbox" data-slot="input" aria-checked="false" data-focus="control" aria-label="选择 第一章 函数、极限与连续.pdf"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
      - waiting 100ms
    45 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying
    - locator resolved to <input value="on" class="sr-only" type="checkbox" data-slot="input" aria-checked="false" data-focus="control" aria-label="选择 第一章 函数、极限与连续.pdf"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
      - waiting 100ms
    39 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
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
        - option "1440"
        - option "1600" [selected]
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
        - option "云盘" [selected]
        - option "错题集"
    - link "打开认可原稿 ↗" [ref=e42] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R3
  - generic "R3 工作区" [ref=e45]:
    - generic [ref=e47]:
      - generic [ref=e48]:
        - button "展开平台导航" [ref=e49] [cursor=pointer]
        - button "隐藏资源目录" [expanded] [ref=e51] [cursor=pointer]
        - generic [ref=e53]:
          - strong [ref=e54]: 云盘 · 全部文件
          - generic [ref=e55]: 当前范围不随目录隐藏改变
        - button "布局" [ref=e56] [cursor=pointer]
        - button "专注内容" [ref=e57] [cursor=pointer]
      - generic [ref=e58]:
        - generic "平台导航" [ref=e60]:
          - generic [ref=e61]:
            - generic [ref=e62]:
              - strong [ref=e63]
              - button "展开平台导航" [ref=e65] [cursor=pointer]
            - navigation "平台功能" [ref=e68]:
              - list [ref=e69]:
                - listitem [ref=e70]:
                  - link "工作台" [ref=e72] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e75]:
                  - link "课程" [ref=e77] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e80]:
                  - link "资源" [ref=e82] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e85]:
                  - link "专业" [ref=e87] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - generic [ref=e90]:
              - generic [ref=e94]:
                - strong [ref=e95]: 林老师
                - text: 教师工作区
              - button "通知" [ref=e96] [cursor=pointer]
              - button "帮助" [ref=e98] [cursor=pointer]
        - generic [ref=e100]:
          - generic [ref=e101]:
            - generic [ref=e102]:
              - strong [ref=e105]: 我的资源
              - button "切换资源空间" [ref=e106] [cursor=pointer]
            - navigation "资源功能" [ref=e109]:
              - generic [ref=e110]:
                - link "云盘" [ref=e111] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "题库" [ref=e115] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "课件库" [ref=e119] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "试卷库" [ref=e123] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "问卷库" [ref=e127] [cursor=pointer]:
                  - /url: "#navigation-v042"
            - button "成员" [ref=e132] [cursor=pointer]
          - generic [ref=e138]:
            - generic "资源目录" [ref=e140]:
              - heading [level=3] [ref=e141]:
                - text: 资源目录
                - generic [ref=e142]:
                  - button "取消固定资源目录" [ref=e143] [cursor=pointer]
                  - button "隐藏资源目录" [ref=e146] [cursor=pointer]
              - heading "资源分类" [level=5] [ref=e149]
              - navigation "资源分类" [ref=e150]:
                - list [ref=e151]:
                  - listitem [ref=e152]:
                    - link "全部文件" [ref=e154] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e157]:
                    - link "图片" [ref=e159] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e162]:
                    - link "视频" [ref=e164] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e167]:
                    - link "音频" [ref=e169] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e172]:
                    - link "文档" [ref=e174] [cursor=pointer]:
                      - /url: "#navigation-v042"
              - heading "常用文件夹" [level=5] [ref=e177]
              - navigation "常用文件夹" [ref=e178]:
                - list [ref=e179]:
                  - listitem [ref=e180]:
                    - link "教学资料" [ref=e182] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e185]:
                    - link "课程案例" [ref=e187] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e190]:
                    - link "专业文献" [ref=e192] [cursor=pointer]:
                      - /url: "#navigation-v042"
              - generic [ref=e195]: 已使用 4.2 GB / 10 GB
            - separator "调整资源目录宽度" [ref=e196]
            - generic [ref=e198]:
              - generic [ref=e199]:
                - generic "资源路径" [ref=e200]:
                  - navigation "面包屑" [ref=e201]:
                    - list [ref=e202]:
                      - listitem [ref=e203]:
                        - generic [ref=e204]: 全部文件
                      - listitem [ref=e205]:
                        - generic [ref=e206]: /
                        - generic [ref=e207]: 教学资料
                - generic [ref=e208]:
                  - generic [ref=e209]:
                    - heading "全部文件" [level=3] [ref=e210]
                    - paragraph [ref=e211]: 分类、文件夹、文件选中和多选状态分别表达。
                  - button "上传文件" [ref=e212] [cursor=pointer]
              - generic [ref=e216]:
                - generic [ref=e217]:
                  - generic [ref=e218]: 共 8 项
                  - textbox "搜索当前范围内的文件" [ref=e222]
                  - radiogroup "文件显示模式" [ref=e225]:
                    - generic [ref=e227]:
                      - generic [ref=e228] [cursor=pointer]:
                        - radio "列表" [checked] [ref=e229]
                        - generic [ref=e232]: 列表
                      - generic [ref=e233] [cursor=pointer]:
                        - radio "网格" [ref=e234]
                        - generic [ref=e237]: 网格
                - table "云盘文件列表" [ref=e238]:
                  - rowgroup [ref=e239]:
                    - row [ref=e240]:
                      - columnheader [ref=e241]:
                        - checkbox "选择当前页全部文件" [ref=e243]
                      - columnheader "文件名" [ref=e246]
                      - columnheader "大小" [ref=e247]
                      - columnheader "审核状态" [ref=e248]
                      - columnheader "修改时间" [ref=e249]
                  - rowgroup [ref=e250]:
                    - row [ref=e251]:
                      - cell [ref=e252]:
                        - checkbox "选择 高等数学 · 课程资源包" [ref=e254]
                      - cell [ref=e257]:
                        - button "高等数学 · 课程资源包" [ref=e258] [cursor=pointer]
                      - cell "12 个文件" [ref=e260]
                      - cell "已共享" [ref=e261]
                      - cell "09-24 14:20" [ref=e265]
                    - row [ref=e266]:
                      - cell [ref=e267]:
                        - checkbox "选择 第一章 函数、极限与连续.pdf" [ref=e269]
                      - cell [ref=e272]:
                        - button "第一章 函数、极限与连续.pdf" [ref=e273] [cursor=pointer]
                      - cell "2.4 MB" [ref=e275]
                      - cell "已审核" [ref=e276]
                      - cell "09-24 11:36" [ref=e280]
                    - row [ref=e281]:
                      - cell [ref=e282]:
                        - checkbox "选择 2026 秋季课程教学大纲.docx" [ref=e284]
                      - cell [ref=e287]:
                        - button "2026 秋季课程教学大纲.docx" [ref=e288] [cursor=pointer]
                      - cell "348 KB" [ref=e290]
                      - cell "已审核" [ref=e291]
                      - cell "09-23 17:08" [ref=e295]
                    - row [ref=e296]:
                      - cell [ref=e297]:
                        - checkbox "选择 大学物理实验成绩与反馈汇总表.xlsx" [ref=e299]
                      - cell [ref=e302]:
                        - button "大学物理实验成绩与反馈汇总表.xlsx" [ref=e303] [cursor=pointer]
                      - cell "128 KB" [ref=e305]
                      - cell "审核中" [ref=e306]
                      - cell "09-23 15:42" [ref=e310]
                    - row [ref=e311]:
                      - cell [ref=e312]:
                        - checkbox "选择 函数连续性 · 课堂案例与图示.pdf" [ref=e314]
                      - cell [ref=e317]:
                        - button "函数连续性 · 课堂案例与图示.pdf" [ref=e318] [cursor=pointer]
                      - cell "1.8 MB" [ref=e320]
                      - cell "已审核" [ref=e321]
                      - cell "09-22 09:15" [ref=e325]
                    - row [ref=e326]:
                      - cell [ref=e327]:
                        - checkbox "选择 课程讨论与活动记录.docx" [ref=e329]
                      - cell [ref=e332]:
                        - button "课程讨论与活动记录.docx" [ref=e333] [cursor=pointer]
                      - cell "562 KB" [ref=e335]
                      - cell "已审核" [ref=e336]
                      - cell "09-21 16:30" [ref=e340]
                    - row [ref=e341]:
                      - cell [ref=e342]:
                        - checkbox "选择 工程实践项目参考文献汇编.pdf" [ref=e344]
                      - cell [ref=e347]:
                        - button "工程实践项目参考文献汇编.pdf" [ref=e348] [cursor=pointer]
                      - cell "4.1 MB" [ref=e350]
                      - cell "已审核" [ref=e351]
                      - cell "09-21 10:26" [ref=e355]
                    - row [ref=e356]:
                      - cell [ref=e357]:
                        - checkbox "选择 班级分组与小组成员名单.xlsx" [ref=e359]
                      - cell [ref=e362]:
                        - button "班级分组与小组成员名单.xlsx" [ref=e363] [cursor=pointer]
                      - cell "86 KB" [ref=e365]
                      - cell "已审核" [ref=e366]
                      - cell "09-20 13:07" [ref=e370]
                - generic [ref=e371]:
                  - generic [ref=e372]: 列表 / 网格切换保留当前目录
                  - generic [ref=e373]: 1 · 单页演示数据
                - status [ref=e374]
  - generic [ref=e375]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import {test,expect,type Page,type Locator} from '@playwright/test';
  2  | const open=async(page:Page,sample:string,width:number)=>{await page.goto(`/?sample=${sample}#navigation-v042`);await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));};
  3  | const style=(node:Locator,property:string)=>node.evaluate((e,property)=>getComputedStyle(e).getPropertyValue(property),property);
  4  | const root=(page:Page,id:string)=>page.locator(`[data-rain-id=recipe-navigation-${id}]`);
  5  | for(const width of [1200,1440,1600]){
  6  |  test(`Review11 R1 ${width} white context and restrained stat hierarchy preserve scene selection`,async({page})=>{
  7  |   await open(page,'R1',width);const r=root(page,'r1');
  8  |   await expect.poll(()=>style(r.locator('.nv43-context'),'background-color')).toBe('rgb(255, 255, 255)');
  9  |   for(const selector of ['.nv43-statistics>div>span','.nv43-statistics>div>small']){const entries=r.locator(selector);await expect(entries).toHaveCount(3);for(const entry of await entries.all()){expect(await style(entry,'font-size')).toBe('13px');expect(await style(entry,'line-height')).toBe('20px');}}
  10 |   expect(await style(r.locator('.nv43-page-top>p'),'color')).toBe('rgb(160, 172, 197)');expect(await style(r.locator('.nv43-workspace-actions'),'gap')).toBe('16px');
  11 |   await r.getByRole('tab',{name:'学分结构',exact:true}).click();await page.getByRole('combobox',{name:'业务子场景'}).selectOption('industry');
  12 |   expect(await style(r.locator('.nv43-context'),'background-color')).toBe('rgb(255, 255, 255)');expect(await style(r.locator('.nv43-page-top>p'),'color')).toBe('rgb(160, 172, 197)');
  13 |   await r.getByRole('radio',{name:'桑基图',exact:true}).locator('..').click();await expect(r.getByRole('radio',{name:'桑基图',exact:true})).toBeChecked();
  14 |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('plan');await expect(r.getByRole('tab',{name:'学分结构',exact:true})).toHaveAttribute('aria-selected','true');
  15 |  });
  16 |  test(`Review11 R3 ${width} heading16 file16 name15 resource color and list-grid selection`,async({page})=>{
  17 |   await open(page,'R3',width);const r=root(page,'r3'),h=r.locator('.nv43-resource-heading h3');expect(await style(h,'font-size')).toBe('16px');expect(await style(h,'line-height')).toBe('22px');expect((await h.boundingBox())?.height).toBe(22);
  18 |   expect(await style(r.locator('.nv43-workspace-actions'),'gap')).toBe('16px');expect(await style(r.locator('.nv43-icon-tile'),'background-color')).toBe('rgb(255, 242, 235)');expect(await style(r.locator('.nv43-icon-tile [data-rain-id=icon]'),'color')).toBe('rgb(221, 92, 0)');
  19 |   for(const name of await r.locator('.nv43-file-name').all())expect(await style(name,'font-size')).toBe('15px');for(const icon of await r.locator('.nv43-file-name [data-rain-id=icon]').all()){const box=await icon.boundingBox();expect(box?.width).toBe(16);expect(box?.height).toBe(16);}
> 20 |   const file='第一章 函数、极限与连续.pdf';await r.getByRole('checkbox',{name:`选择 ${file}`,exact:true}).check();await r.getByRole('radio',{name:'网格',exact:true}).locator('..').click();await expect(r.getByRole('checkbox',{name:`选择 ${file}`,exact:true})).toBeChecked();expect((await r.locator('.nv43-file-open [data-rain-id=icon]').nth(1).boundingBox())?.width).toBe(24);
     |                                                                                              ^ Error: locator.check: Test timeout of 45000ms exceeded.
  21 |   await r.getByRole('radio',{name:'列表',exact:true}).locator('..').click();await r.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('教学大纲');await expect(r.locator('tbody tr')).toHaveCount(1);await page.getByRole('combobox',{name:'业务子场景'}).selectOption('errors');expect(await style(h,'font-size')).toBe('16px');
  22 |   await r.getByRole('radio',{name:'加星',exact:true}).locator('..').click();await expect(r.locator('tbody tr')).toHaveCount(3);await r.getByRole('button',{name:'取消加星 · 第 1 题',exact:true}).click();await expect(r.locator('tbody tr')).toHaveCount(2);
  23 |  });
  24 |  test(`Review11 White ${width} gradient no top line, title/type hierarchy and count track state`,async({page})=>{
  25 |   await open(page,'White',width);const w=page.getByTestId('candidate-White');
  26 |   for(const item of await w.locator('.nv43-white-example li').all())expect(await style(item,'font-size')).toBe('15px');for(const item of await w.locator('.nv43-white-example li>small').all())expect(await style(item,'font-size')).toBe('13px');
  27 |   for(const item of await w.locator('.nv43-white-panel li>span:not([data-rain-id=icon])').all())expect(await style(item,'font-size')).toBe('15px');
  28 |   const selected=w.locator('.nv43-white-connected .rain-tabs__tab[data-selected=true]');expect(await selected.evaluate(e=>getComputedStyle(e,'::before').content)).toBe('none');expect(await style(selected,'background-image')).toBe('linear-gradient(rgb(224, 234, 255), rgb(255, 255, 255))');
  29 |   const soft=w.locator('.nv43-white-soft');expect(await style(soft.locator('[data-state=checked] [data-slot=count]'),'color')).toBe('rgb(15, 85, 223)');expect(await style(soft.locator('[data-state=unchecked] [data-slot=count]').first(),'color')).toBe('rgb(103, 115, 134)');
  30 |   await soft.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();await expect(soft.getByRole('radio',{name:'已练对',exact:true})).toBeChecked();expect(await style(soft.locator('[data-state=checked] [data-slot=count]'),'color')).toBe('rgb(15, 85, 223)');
  31 |   await w.getByRole('tab',{name:'参考案例',exact:true}).click();await expect(w.getByRole('tab',{name:'参考案例',exact:true})).toHaveAttribute('aria-selected','true');expect(await style(selected,'background-image')).toContain('linear-gradient');
  32 |   const line=w.getByRole('radiogroup',{name:'W1 / 白底指示线'});await line.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();expect(await line.locator('[data-state=checked]').evaluate(e=>getComputedStyle(e,'::after').height)).toBe('2px');
  33 |  });
  34 |  test(`Review11 Connections ${width} pale directional chevron preserves dialog search Escape and selection`,async({page})=>{
  35 |   await open(page,'Connections',width);const c=page.getByTestId('candidate-Connections'),all=c.getByRole('button',{name:'全部',exact:true}),icon=all.locator('[data-rain-id=icon]');
  36 |   await expect(all).toHaveAttribute('aria-expanded','false');expect(await style(icon,'color')).toBe('rgb(184, 194, 216)');expect(await style(icon,'mask-image')).toContain('arrow-down');await all.click();await expect(all).toHaveAttribute('aria-expanded','true');expect(await style(icon,'mask-image')).toContain('arrow-up');
  37 |   const dialog=page.getByRole('dialog',{name:'选择课程内容范围'});await expect(dialog).toBeVisible();await dialog.getByRole('textbox',{name:'搜索范围'}).fill('不存在');await expect(dialog.getByRole('status')).toHaveText('无匹配范围');await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(all).toHaveAttribute('aria-expanded','false');
  38 |   await all.click();await dialog.getByRole('textbox',{name:'搜索范围'}).fill('创新');await dialog.getByRole('button',{name:/创新实验班/}).click();await expect(dialog).not.toBeVisible();await expect(c.getByRole('tab',{name:/创新实验班/})).toHaveAttribute('aria-selected','true');
  39 |  });
  40 | }
  41 | 
```