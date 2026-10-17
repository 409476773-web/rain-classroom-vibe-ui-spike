# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w6.spec.ts >> E3 score stays visible while keyed draft survives display and mode without implicit save
- Location: tests/e2e/navigation-v042-w6.spec.ts:9:1

# Error details

```
Error: locator.click: Error: strict mode violation: locator('[data-scene="E3"]').getByRole('button', { name: '陈安', exact: true }) resolved to 2 elements:
    1) <button title="陈安" type="button" aria-label="陈安" data-slot="entry" aria-pressed="false" class="rain-navigation-family__entry" aria-describedby="_r_19_-chen-an-description">…</button> aka getByRole('button', { name: '陈安', description: '2026002 · 3题待批改' })
    2) <button title="陈安" type="button" aria-label="陈安" data-slot="entry" aria-pressed="false" class="rain-navigation-family__entry">…</button> aka getByTestId('grading-identity').getByRole('button', { name: '陈安' })

Call log:
  - waiting for locator('[data-scene="E3"]').getByRole('button', { name: '陈安', exact: true })

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - strong [ref=e5]: Rain · 独立业务工作区
    - generic [ref=e6]: W6 消费试验 · 模拟数据与本地草稿
  - navigation "W6独立消费任务" [ref=e7]:
    - generic [ref=e8]:
      - link "课程资源" [ref=e9] [cursor=pointer]:
        - /url: "#E1"
      - link "课堂互动" [ref=e13] [cursor=pointer]:
        - /url: "#E2"
      - link "连续批改" [ref=e17] [cursor=pointer]:
        - /url: "#E3"
      - link "课堂回放" [ref=e21] [cursor=pointer]:
        - /url: "#E4"
      - link "实例隔离" [ref=e25] [cursor=pointer]:
        - /url: "#E5"
      - link "新建审阅台" [ref=e29] [cursor=pointer]:
        - /url: "#E6"
  - region "E3 连续批改" [ref=e33]:
    - generic [ref=e34]:
      - generic [ref=e35]:
        - strong [ref=e36]: 校园微气候实验报告 · 连续批改
        - generic [ref=e37]:
          - button "隐藏批改队列" [expanded] [active] [ref=e38] [cursor=pointer]
          - button "进入专注" [ref=e39]
      - generic [ref=e40]:
        - generic "批改队列" [ref=e42]:
          - heading "批改队列" [level=2] [ref=e43]
          - radiogroup "批改方式" [ref=e45]:
            - generic [ref=e47]:
              - generic [ref=e48]:
                - radio "按人" [checked] [ref=e49]
                - generic [ref=e50]: 按人
              - generic [ref=e51]:
                - radio "按题" [ref=e52]
                - generic [ref=e53]: 按题
          - radiogroup "队列外观" [ref=e55]:
            - generic [ref=e57]:
              - generic [ref=e58]:
                - radio "列表队列" [checked] [ref=e59]
                - generic [ref=e60]: 列表队列
              - generic [ref=e61]:
                - radio "卡片队列" [ref=e62]
                - generic [ref=e63]: 卡片队列
          - group "当前批改对象" [ref=e64]:
            - list [ref=e65]:
              - listitem [ref=e66]:
                - button "林宁" [pressed] [ref=e68] [cursor=pointer]:
                  - generic [ref=e69]:
                    - generic [ref=e70]: 林宁
                    - generic [ref=e71]: 2026001 · 3题待批改
              - listitem [ref=e72]:
                - button "陈安" [ref=e74] [cursor=pointer]:
                  - generic [ref=e75]:
                    - generic [ref=e76]: 陈安
                    - generic [ref=e77]: 2026002 · 3题待批改
              - listitem [ref=e78]:
                - button "周岚" [ref=e80] [cursor=pointer]:
                  - generic [ref=e81]:
                    - generic [ref=e82]: 周岚
                    - generic [ref=e83]: 2026003 · 3题待批改
        - separator "调整批改队列宽度" [ref=e84]
        - article [ref=e85]:
          - paragraph [ref=e86]: 当前批改身份
          - heading "林宁 · 第1题" [level=1] [ref=e87]
          - group "当前题目选择" [ref=e88]:
            - list [ref=e89]:
              - listitem [ref=e90]:
                - button "第1题" [pressed] [ref=e92] [cursor=pointer]
              - listitem [ref=e95]:
                - button "第2题" [ref=e97] [cursor=pointer]
              - listitem [ref=e100]:
                - button "第3题" [ref=e102] [cursor=pointer]
          - group "当前学生选择" [ref=e105]:
            - list [ref=e106]:
              - listitem [ref=e107]:
                - button "林宁" [pressed] [ref=e109] [cursor=pointer]
              - listitem [ref=e112]:
                - button "陈安" [ref=e114] [cursor=pointer]
              - listitem [ref=e117]:
                - button "周岚" [ref=e119] [cursor=pointer]
          - generic [ref=e122]:
            - heading "建立可检验假设 · 20分" [level=2] [ref=e123]
            - paragraph [ref=e124]: 学生答案（模拟）：我们选择阴影覆盖率作为自变量，比较三个不同场地的地表温度。测量工具、时间与离地高度保持一致，每个地点重复测量三次。
            - paragraph [ref=e125]: 实验设计应说明如何选择采样点，并记录可能影响结果的外部条件。所有得分与评语仅保存在此页面的本地状态中。
        - separator "调整评分区宽度" [ref=e126]
        - generic "评分区" [ref=e128]:
          - complementary "评分区" [ref=e129]:
            - heading "评分区" [level=2] [ref=e130]
            - paragraph [ref=e131]: 林宁 · 第1题
            - generic [ref=e132]:
              - text: 本题分数
              - spinbutton "本题分数" [ref=e133]
            - generic [ref=e134]:
              - text: 评分评语
              - textbox "评分评语" [ref=e136]
            - button "保存本地草稿" [ref=e137]
            - status [ref=e138]: 尚未保存到本地
```

# Test source

```ts
  1  | import {test,expect,type Page} from '@playwright/test';
  2  | async function open(page:Page,id:string){await page.goto(`/navigation-v042-w6-consumer.html#${id}`);const root=page.locator(`[data-scene="${id}"]`);await expect(root).toBeVisible();return root;}
  3  | for(const width of [1200,1440,1600])test(`E1 source selection, all-class search and missing-current draft at ${width}`,async({page})=>{
  4  |  await page.setViewportSize({width,height:1100});const root=await open(page,'E1');const draft=root.getByRole('textbox',{name:'资源说明草稿'});await draft.fill('公共资源的独立草稿');
  5  |  await root.getByRole('button',{name:'更多班级',exact:true}).click();await page.getByRole('textbox',{name:'搜索范围'}).fill('237');await page.getByRole('button',{name:/跨学科项目课程.*237班/}).click();await expect(root.getByRole('heading',{name:/237班资源/})).toBeVisible();await draft.fill('237班独立草稿');await root.getByRole('tab',{name:'公共资源包',exact:true}).click();await expect(draft).toHaveValue('公共资源的独立草稿');
  6  |  await root.getByRole('button',{name:'更多班级',exact:true}).click();await page.getByRole('textbox',{name:'搜索范围'}).fill('237');await page.getByRole('button',{name:/跨学科项目课程.*237班/}).click();await root.getByRole('button',{name:'移除当前班级',exact:true}).click();await expect(root.getByText('当前范围已不可用，请重新选择。')).toBeVisible();await expect(root.getByRole('tab',{name:'公共资源包',exact:true})).toHaveAttribute('aria-selected','false');await root.getByRole('button',{name:'恢复刚移除的班级',exact:true}).click();await expect(draft).toHaveValue('237班独立草稿');await root.screenshot({path:test.info().outputPath(`E1-${width}.png`)});
  7  | });
  8  | test('E2 activity and group details remain one stable identity',async({page})=>{const root=await open(page,'E2');await root.getByRole('button',{name:'证据分析讨论',exact:true}).click();await root.getByRole('button',{name:'第二研究组',exact:true}).click();await expect(root.getByRole('heading',{name:'第二研究组 · 证据分析讨论'})).toBeVisible();await root.getByRole('button',{name:'方案投票',exact:true}).click();await expect(root.getByRole('heading',{name:'第一研究组 · 方案投票'})).toBeVisible();await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-group-id','vote-g1');});
> 9  | test('E3 score stays visible while keyed draft survives display and mode without implicit save',async({page})=>{const root=await open(page,'E3');await expect(root.getByRole('complementary',{name:'评分区'})).toBeVisible();await root.getByRole('button',{name:'显示批改队列',exact:true}).click();await root.getByRole('button',{name:'陈安',exact:true}).click();await root.getByRole('group',{name:'当前题目选择',exact:true}).getByRole('button',{name:'第2题',exact:true}).click();const draft=root.getByRole('textbox',{name:'评分评语'});await draft.fill('请补充实验依据');await root.getByRole('spinbutton',{name:'本题分数'}).fill('17');await root.getByRole('button',{name:'显示批改队列',exact:true}).click();await root.getByRole('radio',{name:'按题',exact:true}).click();await root.getByRole('radio',{name:'卡片队列',exact:true}).click();await root.getByRole('button',{name:'隐藏批改队列',exact:true}).click();await root.getByRole('button',{name:'进入专注',exact:true}).click();await expect(root.getByRole('complementary',{name:'评分区'})).toBeVisible();await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(draft).toHaveValue('请补充实验依据');await expect(root.getByTestId('grading-identity')).toHaveAttribute('data-student-id','chen-an');await expect(root.getByTestId('grading-identity')).toHaveAttribute('data-question-id','q2');await expect(root.getByText('尚未保存到本地')).toBeVisible();});
     |                                                                                                                                                                                                                                                                                                                                                   ^ Error: locator.click: Error: strict mode violation: locator('[data-scene="E3"]').getByRole('button', { name: '陈安', exact: true }) resolved to 2 elements:
  10 | test('E4 nonmodal temporary knowledge preserves geometry, playback and exact focus exit',async({page})=>{const root=await open(page,'E4');const main=root.locator('.w6-replay-main');const before=await main.boundingBox();await root.getByRole('button',{name:'临时查看知识索引',exact:true}).click();await expect(root.locator('.rain-workspace__region[data-region-id="knowledge-index"]')).toHaveAttribute('data-temporary','true');expect(await main.boundingBox()).toEqual(before);await root.getByRole('button',{name:'控制变量 · 02:10',exact:true}).click();await expect(root.getByTestId('playback-time')).toHaveText('02:10');await page.keyboard.press('Escape');await expect(root.getByRole('button',{name:'临时查看知识索引',exact:true})).toBeFocused();await root.getByRole('button',{name:'进入专注',exact:true}).click();await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(root.getByTestId('playback-time')).toHaveText('02:10');await expect(root.getByRole('button',{name:'讲稿 02:10',exact:true})).toHaveAttribute('aria-pressed','true');});
  11 | test('E5 instance-local density leaves B selection, draft and computed geometry unchanged',async({page})=>{const root=await open(page,'E5');const b=root.getByRole('region',{name:'实例 B',exact:true});await b.getByRole('button',{name:'实验方法',exact:true}).click();await b.getByRole('textbox',{name:'实例 B 草稿'}).fill('B保留的审阅说明');const facts=()=>b.evaluate(e=>({html:e.innerHTML,rect:{width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height},styles:[...e.querySelectorAll('.rain-navigation-family__row')].map(n=>({height:getComputedStyle(n).height,padding:getComputedStyle(n).padding,font:getComputedStyle(n).fontSize}))}));const before=await facts();await root.getByRole('button',{name:'仅当前实例 A 使用紧凑目录',exact:true}).click();await expect(root.getByRole('region',{name:'实例 A',exact:true})).toHaveAttribute('data-directory-density','compact');expect(await facts()).toEqual(before);await expect(b.getByRole('textbox',{name:'实例 B 草稿'})).toHaveValue('B保留的审阅说明');});
  12 | for(const width of [1200,1440,1600])test(`E6 unseen review identity, two-side recovery and explicit local save at ${width}`,async({page})=>{await page.setViewportSize({width,height:1100});const root=await open(page,'E6');const work=root.locator('[data-ai-task="E6"]');const draft=work.getByRole('textbox',{name:/审核意见|评审意见/});await draft.fill('第一份资料未保存的意见');await work.getByRole('button',{name:'隐藏资源队列',exact:true}).click();await work.getByRole('button',{name:'隐藏评审面板',exact:true}).click();await work.getByRole('button',{name:'显示资源队列',exact:true}).click();await work.getByRole('button',{name:'显示评审面板',exact:true}).click();await expect(draft).toHaveValue('第一份资料未保存的意见');await expect(work.getByText('未保存',{exact:true})).toBeVisible();await work.getByRole('button',{name:'保存本地评审',exact:true}).click();await expect(work.getByRole('status',{name:'本地保存状态'})).toHaveText('本页已保存');const list=work.getByRole('group',{name:'待评审学术资源'});await list.getByRole('button',{name:'城市微气候观测数据的跨尺度校验、缺测处理与可复现分析流程说明',exact:true}).click();await expect(draft).toHaveValue('');await list.getByRole('button',{name:'数字人文研究中的多模态史料整理、版本校勘与长期开放获取方案（修订稿）',exact:true}).click();await expect(draft).toHaveValue('第一份资料未保存的意见');await expect(work.getByRole('tab')).toHaveCount(0);await root.screenshot({path:test.info().outputPath(`E6-${width}.png`)});expect(await page.evaluate(()=>['YKT_DEBUG','YKT_VISIBILITY','vApply'].filter(k=>k in window))).toEqual([]);});
  13 | 
```