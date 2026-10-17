# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w6-review01.spec.ts >> C04-F03 E3 single complementary dimension, public number field and keyed drafts at 1200
- Location: tests/e2e/navigation-v042-w6-review01.spec.ts:166:3

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 5
+ Received  + 1

- Array [
-   36,
-   36,
-   36,
- ]
+ Array []
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
          - button "隐藏批改队列" [expanded] [ref=e38] [cursor=pointer]
          - button "进入专注" [ref=e39] [cursor=pointer]
      - generic [ref=e41]:
        - generic "批改队列" [ref=e43]:
          - generic [ref=e44]:
            - heading "批改队列" [level=2] [ref=e45]
            - generic [ref=e46]: 3 位学生
          - generic [ref=e47]:
            - generic [ref=e48]: 批改顺序
            - radiogroup "批改方式" [ref=e50]:
              - generic [ref=e52]:
                - generic [ref=e53] [cursor=pointer]:
                  - radio "按人" [checked] [ref=e54]
                  - generic [ref=e55]: 按人
                - generic [ref=e56] [cursor=pointer]:
                  - radio "按题" [ref=e57]
                  - generic [ref=e58]: 按题
            - generic [ref=e59]: 显示方式
            - radiogroup "队列外观" [ref=e61]:
              - generic [ref=e63]:
                - generic [ref=e64] [cursor=pointer]:
                  - radio "列表队列" [checked] [ref=e65]
                  - generic [ref=e66]: 列表队列
                - generic [ref=e67] [cursor=pointer]:
                  - radio "卡片队列" [ref=e68]
                  - generic [ref=e69]: 卡片队列
          - paragraph [ref=e70]: 逐份批改学生的全部题目
          - group "当前批改对象" [ref=e71]:
            - group "当前学生选择" [ref=e72]:
              - list [ref=e73]:
                - listitem [ref=e74]:
                  - button "林宁" [ref=e76] [cursor=pointer]:
                    - generic [ref=e77]:
                      - generic [ref=e78]: 林宁
                      - generic [ref=e79]: 学号 2026001
                      - generic [ref=e80]: 待批改
                    - generic [ref=e84]: 0/3
                - listitem [ref=e85]:
                  - button "陈安" [active] [pressed] [ref=e87] [cursor=pointer]:
                    - generic [ref=e88]:
                      - generic [ref=e89]: 陈安
                      - generic [ref=e90]: 学号 2026002
                      - generic [ref=e91]: 待批改
                    - generic [ref=e95]: 0/3
                - listitem [ref=e96]:
                  - button "周岚" [ref=e98] [cursor=pointer]:
                    - generic [ref=e99]:
                      - generic [ref=e100]: 周岚
                      - generic [ref=e101]: 学号 2026003
                      - generic [ref=e102]: 待批改
                    - generic [ref=e106]: 0/3
          - paragraph [ref=e107]: 右侧数量表示本页已保存 / 全部。
        - separator "调整批改队列宽度" [ref=e108]
        - article [ref=e109]:
          - generic [ref=e110]:
            - paragraph [ref=e111]: 按学生批改
            - generic [ref=e112]:
              - generic [ref=e113]:
                - heading "陈安的实验报告" [level=1] [ref=e114]
                - generic [ref=e115]: 待批改
              - paragraph [ref=e118]: 学号 2026002第1题
          - region "选择该学生的题目" [ref=e120]:
            - generic [ref=e122]:
              - generic "分区导航" [ref=e124]:
                - tablist "当前题目选择" [ref=e128]:
                  - tab "第1题" [selected] [ref=e129] [cursor=pointer]
                  - tab "第2题" [ref=e133] [cursor=pointer]
                  - tab "第3题" [ref=e137] [cursor=pointer]
              - tabpanel "第1题" [ref=e143]:
                - generic [ref=e144]:
                  - generic [ref=e145]:
                    - generic [ref=e146]:
                      - generic [ref=e147]: 第1题
                      - generic [ref=e150]: 满分 20 分
                    - heading "建立可检验假设" [level=2] [ref=e151]
                    - paragraph [ref=e152]: 根据校园广场与林荫道的温度差异，提出一个可通过实地测量验证的研究假设。说明自变量、因变量，以及预期的变化方向。
                  - region "当前学生答案" [ref=e153]:
                    - generic [ref=e154]:
                      - heading "学生答案" [level=2] [ref=e155]
                      - generic [ref=e156]: 模拟作答
                    - paragraph [ref=e159]: 我认为阴影覆盖率会影响地表温度。我们比较校园中三个场地，预期遮阴更多的位置温度更低，并通过重复测量检验这个判断。
                  - generic [ref=e160]:
                    - heading "评分参考" [level=2] [ref=e161]
                    - list [ref=e162]:
                      - listitem [ref=e163]:
                        - generic [ref=e164]: "01"
                        - text: 研究问题明确
                      - listitem [ref=e165]:
                        - generic [ref=e166]: "02"
                        - text: 自变量与因变量对应
                      - listitem [ref=e167]:
                        - generic [ref=e168]: "03"
                        - text: 假设可通过测量验证
        - separator "调整评分区宽度" [ref=e169]
        - generic "评分区" [ref=e171]:
          - complementary "评分区" [ref=e172]:
            - generic [ref=e173]:
              - heading "评分区" [level=2] [ref=e174]
              - generic [ref=e175]: 第1题
            - paragraph [ref=e176]:
              - strong [ref=e177]: 陈安
              - generic [ref=e178]: 建立可检验假设
            - generic [ref=e179]:
              - text: 本题分数
              - generic [ref=e180]:
                - generic [ref=e181]:
                  - generic [ref=e182]:
                    - spinbutton "本题分数" [ref=e183]
                    - generic [ref=e184]: / 20 分
                  - generic:
                    - button "增加本题分数"
                    - button "减少本题分数"
                - generic [ref=e185]: 单位：/ 20 分
            - generic [ref=e186]:
              - text: 评分评语
              - textbox "评分评语" [ref=e188]:
                - /placeholder: 结合答案写下评价与改进建议
            - generic [ref=e189]:
              - button "保存本地草稿" [ref=e190] [cursor=pointer]
              - status [ref=e192]: 尚未保存到本地
              - generic [ref=e193]: 模拟批改 · 仅保留在当前页面，刷新清空。
```

# Test source

```ts
  76  |     const descriptions = root.locator('.rain-navigation__description');
  77  |     await expect(descriptions.first()).toHaveText('所有教学班共享 | 12项资料');
  78  |     expect(await descriptions.allTextContents()).toEqual(expect.arrayContaining([expect.stringContaining(' | ')]));
  79  |     const facts = await track.evaluate(element => {
  80  |       const color = (value: string) => {
  81  |         const canvas = document.createElement('canvas');
  82  |         canvas.width = canvas.height = 1;
  83  |         const context = canvas.getContext('2d')!;
  84  |         context.fillStyle = value.trim();
  85  |         context.fillRect(0, 0, 1, 1);
  86  |         return [...context.getImageData(0, 0, 1, 1).data];
  87  |       };
  88  |       const css = getComputedStyle(element);
  89  |       const description = element.querySelector('.rain-navigation__description')!;
  90  |       return {
  91  |         background: css.backgroundColor,
  92  |         tokenBackground: css.getPropertyValue('--rain-category-background-neutral-2').trim(),
  93  |         backgroundPixels: color(css.backgroundColor),
  94  |         tokenBackgroundPixels: color(css.getPropertyValue('--rain-category-background-neutral-2')),
  95  |         metadata: getComputedStyle(description).color,
  96  |         tokenMetadata: css.getPropertyValue('--rain-category-text-neutral-6').trim(),
  97  |         metadataPixels: color(getComputedStyle(description).color),
  98  |         tokenMetadataPixels: color(css.getPropertyValue('--rain-category-text-neutral-6')),
  99  |         descriptionText: description.textContent,
  100 |       };
  101 |     });
  102 |     expect(facts.backgroundPixels).toEqual(facts.tokenBackgroundPixels);
  103 |     expect(facts.metadataPixels).toEqual(facts.tokenMetadataPixels);
  104 |     const types = root.locator('.w6-table [data-rain-id="ui-tag"]');
  105 |     await expect(types).toHaveCount(3);
  106 |     for (const tag of await types.all()) await expect(tag).toHaveAttribute('data-size', '20');
  107 |     const draft = root.getByRole('textbox', { name: '资源说明草稿' });
  108 |     await draft.fill('公共范围的复核草稿');
  109 |     await root.getByRole('button', { name: '更多班级', exact: true }).click();
  110 |     await page.getByRole('textbox', { name: '搜索范围' }).fill('237');
  111 |     await page.getByRole('button', { name: /跨学科项目课程.*237班/ }).click();
  112 |     await expect(root.getByRole('heading', { name: /237班资源/ })).toBeVisible();
  113 |     await draft.fill('237班的复核草稿');
  114 |     await root.getByRole('tab', { name: '公共资源包', exact: true }).click();
  115 |     await expect(draft).toHaveValue('公共范围的复核草稿');
  116 |     await record('E1-Token-facts', facts);
  117 |     await screenshot(page, `E1-${width}x796`);
  118 |   });
  119 | 
  120 |   test(`F06 E2 activity hierarchy differs from groups and selected ownership follows at ${width}`, async ({ page }) => {
  121 |     const root = await open(page, 'E2', width);
  122 |     const activities = region(root, 'activities');
  123 |     const groups = region(root, 'groups');
  124 |     await expect(activities.getByRole('heading', { name: '课堂内', exact: true })).toBeVisible();
  125 |     await expect(activities.getByRole('heading', { name: '课后', exact: true })).toBeVisible();
  126 |     const activityCards = activities.locator('[data-rain-id="ui-object-navigator"]');
  127 |     expect(await activityCards.count()).toBeGreaterThanOrEqual(2);
  128 |     for (const group of await activityCards.all()) await expect(group).toHaveAttribute('data-appearance', 'cards');
  129 |     const classroomButtons = activities.getByRole('group', { name: '课堂内活动', exact: true }).getByRole('button');
  130 |     await expect(classroomButtons).toHaveCount(2);
  131 |     const activityBox = await activities.boundingBox();
  132 |     const cardBoxes = await Promise.all((await classroomButtons.all()).map(button => button.boundingBox()));
  133 |     expect(Math.abs(cardBoxes[0]!.x - cardBoxes[1]!.x)).toBeLessThanOrEqual(1);
  134 |     expect(cardBoxes[1]!.y).toBeGreaterThanOrEqual(cardBoxes[0]!.y + cardBoxes[0]!.height);
  135 |     for (const box of cardBoxes) {
  136 |       expect(box!.x).toBeGreaterThanOrEqual(activityBox!.x);
  137 |       expect(box!.x + box!.width).toBeLessThanOrEqual(activityBox!.x + activityBox!.width);
  138 |     }
  139 |     await record('E2-complete-vertical-activity-cards', { activityBox, cardBoxes });
  140 |     await expect(groups.getByRole('group', { name: '小组对象', exact: true })).toHaveAttribute('data-appearance', 'queue');
  141 |     await activities.getByRole('button', { name: '课后反思', exact: true }).click();
  142 |     await groups.getByRole('button', { name: '第二研究组', exact: true }).click();
  143 |     await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-activity-id', 'reflection');
  144 |     await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-group-id', 'reflection-g2');
  145 |     await expect(root.getByRole('heading', { name: '第二研究组 · 课后反思' })).toBeVisible();
  146 |     await root.getByRole('textbox', { name: '课堂反馈草稿' }).fill('反思第二组独立反馈');
  147 |     await activities.getByRole('button', { name: '方案投票', exact: true }).click();
  148 |     await expect(root.getByTestId('interaction-identity')).toHaveAttribute('data-group-id', 'vote-g1');
  149 |     await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('');
  150 |     await activities.getByRole('button', { name: '课后反思', exact: true }).click();
  151 |     await groups.getByRole('button', { name: '第二研究组', exact: true }).click();
  152 |     await expect(root.getByRole('textbox', { name: '课堂反馈草稿' })).toHaveValue('反思第二组独立反馈');
  153 |     const facts = await root.evaluate(element => {
  154 |       const style = (selector: string) => {
  155 |         const row = element.querySelector(selector)!;
  156 |         const css = getComputedStyle(row);
  157 |         return { borderRadius: css.borderRadius, padding: css.padding, background: css.backgroundColor, height: row.getBoundingClientRect().height };
  158 |       };
  159 |       return { activity: style('[data-region-id="activities"] .rain-navigation-family__row'), group: style('[data-region-id="groups"] .rain-navigation-family__row') };
  160 |     });
  161 |     expect(facts.activity).not.toEqual(facts.group);
  162 |     await record('E2-hierarchy-facts', facts);
  163 |     await screenshot(page, `E2-${width}x796`);
  164 |   });
  165 | 
  166 |   test(`C04-F03 E3 single complementary dimension, public number field and keyed drafts at ${width}`, async ({ page }) => {
  167 |     const root = await open(page, 'E3', width);
  168 |     const scorePane = root.getByRole('complementary', { name: '评分区', exact: true });
  169 |     await expect(scorePane).toBeVisible();
  170 |     await root.getByRole('button', { name: '显示批改队列', exact: true }).click();
  171 |     const queue = region(root, 'grading-queue');
  172 |     await queue.getByRole('button', { name: '陈安', exact: true }).click();
  173 |     const answer = root.getByTestId('grading-identity');
  174 |     await expect(answer.getByRole('group', { name: '当前学生选择', exact: true })).toHaveCount(0);
  175 |     const rowHeights = await answer.locator('.w6-grade-shortcuts .rain-navigation-family__row').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().height));
> 176 |     expect(rowHeights).toEqual([36, 36, 36]);
      |                        ^ Error: expect(received).toEqual(expected) // deep equality
  177 |     await answer.getByRole('group', { name: '当前题目选择', exact: true }).getByRole('button', { name: '第2题', exact: true }).click();
  178 |     const score = root.getByRole('spinbutton', { name: '本题分数', exact: true });
  179 |     await expect(score.locator('xpath=ancestor::*[@data-rain-id="ui-input-number"]')).toHaveCount(1);
  180 |     await expect(score).toHaveAttribute('aria-valuemin', '0');
  181 |     await expect(score).toHaveAttribute('aria-valuemax', '20');
  182 |     const draft = root.getByRole('textbox', { name: '评分评语', exact: true });
  183 |     await score.fill('17');
  184 |     await score.press('Tab');
  185 |     await draft.fill('第2题陈安：请补充依据');
  186 |     await queue.getByText('按题', { exact: true }).click();
  187 |     await expect(root.getByRole('radio', { name: '按题', exact: true })).toBeChecked();
  188 |     await expect(answer.getByRole('group', { name: '当前题目选择', exact: true })).toHaveCount(0);
  189 |     await expect(answer.getByRole('group', { name: '当前学生选择', exact: true })).toBeVisible();
  190 |     await queue.getByText('卡片队列', { exact: true }).click();
  191 |     await expect(root.getByRole('radio', { name: '卡片队列', exact: true })).toBeChecked();
  192 |     await expect(answer).toHaveAttribute('data-student-id', 'chen-an');
  193 |     await expect(answer).toHaveAttribute('data-question-id', 'q2');
  194 |     await expect(score).toHaveValue('17');
  195 |     await expect(draft).toHaveValue('第2题陈安：请补充依据');
  196 |     await root.getByRole('button', { name: '隐藏批改队列', exact: true }).click();
  197 |     await root.getByRole('button', { name: '进入专注', exact: true }).click();
  198 |     await expect(scorePane).toBeVisible();
  199 |     await expect(root.getByText('尚未保存到本地', { exact: true })).toBeVisible();
  200 |     await root.getByRole('button', { name: '退出专注', exact: true }).click();
  201 |     await root.getByRole('button', { name: '保存本地草稿', exact: true }).click();
  202 |     await expect(root.getByText('已保存到本地状态', { exact: true })).toBeVisible();
  203 |     await answer.getByRole('group', { name: '当前学生选择', exact: true }).getByRole('button', { name: '林宁', exact: true }).click();
  204 |     await expect(score).toHaveValue('');
  205 |     await expect(draft).toHaveValue('');
  206 |     await answer.getByRole('group', { name: '当前学生选择', exact: true }).getByRole('button', { name: '陈安', exact: true }).click();
  207 |     await expect(score).toHaveValue('17');
  208 |     await expect(draft).toHaveValue('第2题陈安：请补充依据');
  209 |     await screenshot(page, `E3-${width}x796`);
  210 |   });
  211 | 
  212 |   test(`F04 E4 structured chapter and transcript, playback and nonmodal knowledge at ${width}`, async ({ page }) => {
  213 |     const root = await open(page, 'E4', width);
  214 |     const main = root.locator('.w6-replay-main');
  215 |     await expect(root.getByRole('group', { name: '课堂讲稿定位', exact: true })).toBeVisible();
  216 |     await expect(root.getByRole('heading', { name: /课堂讲稿|章节与讲稿/ })).toBeVisible();
  217 |     await expect(root.getByRole('heading', { name: '章节目录', exact: true })).toBeVisible();
  218 |     await expect(root.getByRole('heading', { name: '我的回放笔记', exact: true })).toBeVisible();
  219 |     await expect(root.getByRole('slider', { name: '回放进度', exact: true })).toHaveAttribute('aria-valuetext', '00:00 / 05:00');
  220 |     const chapters = await root.locator('.w6-replay-chapters').boundingBox();
  221 |     const transcript = await root.locator('.w6-replay-transcript').boundingBox();
  222 |     const hierarchy = await root.locator('.w6-replay-transcript').evaluate(element => ({
  223 |       excerpt: getComputedStyle(element.querySelector('blockquote')!).fontSize,
  224 |       detail: getComputedStyle(element.querySelector('.w6-replay-transcript-detail')!).fontSize,
  225 |       excerptWeight: getComputedStyle(element.querySelector('blockquote')!).fontWeight,
  226 |       detailWeight: getComputedStyle(element.querySelector('.w6-replay-transcript-detail')!).fontWeight,
  227 |     }));
  228 |     expect(transcript!.x).toBeGreaterThan(chapters!.x + chapters!.width + 16);
  229 |     expect(hierarchy.excerpt).not.toBe(hierarchy.detail);
  230 |     expect(hierarchy.excerptWeight).not.toBe(hierarchy.detailWeight);
  231 |     await expect(root.getByRole('button', { name: '讲稿 00:00', exact: true })).toBeInViewport();
  232 |     await expect(root.locator('.w6-replay-transcript blockquote')).toBeInViewport();
  233 |     await record('E4-information-hierarchy', { chapters, transcript, hierarchy });
  234 |     await screenshot(page, `E4-initial-${width}x796`);
  235 |     await root.getByRole('textbox', { name: '回放笔记', exact: true }).fill('控制变量需要核对测量高度');
  236 |     await root.getByRole('button', { name: '讲稿 02:10', exact: true }).click();
  237 |     await expect(root.getByTestId('playback-time')).toHaveText('02:10');
  238 |     const before = await main.boundingBox();
  239 |     await root.getByRole('button', { name: '临时查看知识索引', exact: true }).click();
  240 |     await expect(region(root, 'knowledge-index')).toHaveAttribute('data-temporary', 'true');
  241 |     await compareGeometry(main, before);
  242 |     await expect(root.getByTestId('playback-time')).toHaveText('02:10');
  243 |     await expect(root.getByRole('textbox', { name: '回放笔记', exact: true })).toHaveValue('控制变量需要核对测量高度');
  244 |     await page.keyboard.press('Escape');
  245 |     await expect(root.getByRole('button', { name: '临时查看知识索引', exact: true })).toBeFocused();
  246 |     await expect(region(root, 'knowledge-index')).toBeHidden();
  247 |     await root.getByRole('button', { name: '进入专注', exact: true }).click();
  248 |     await root.getByRole('button', { name: '退出专注', exact: true }).click();
  249 |     await compareGeometry(main, before);
  250 |     await expect(root.getByTestId('playback-time')).toHaveText('02:10');
  251 |     await expect(root.getByRole('textbox', { name: '回放笔记', exact: true })).toHaveValue('控制变量需要核对测量高度');
  252 |     await root.getByRole('button', { name: '播放回放', exact: true }).click();
  253 |     await expect(root.getByRole('button', { name: '暂停回放', exact: true })).toBeVisible();
  254 |     await expect.poll(async () => root.getByTestId('playback-time').textContent(), { timeout: 3500 }).not.toBe('02:10');
  255 |     await root.getByRole('button', { name: '暂停回放', exact: true }).click();
  256 |     const paused = await root.getByTestId('playback-time').textContent();
  257 |     await page.waitForTimeout(1200);
  258 |     await expect(root.getByTestId('playback-time')).toHaveText(paused!);
  259 |     const slider = root.getByRole('slider', { name: '回放进度', exact: true });
  260 |     await slider.click();
  261 |     await slider.press('Home');
  262 |     await slider.press('ArrowRight');
  263 |     await expect(root.getByTestId('playback-time')).toHaveText('00:01');
  264 |     await expect(root.getByRole('textbox', { name: '回放笔记', exact: true })).toHaveValue('控制变量需要核对测量高度');
  265 |     await record('E4-preserved-geometry', before);
  266 |     await screenshot(page, `E4-${width}x796`);
  267 |   });
  268 | 
  269 |   test(`F02 E5 existing instance isolation survives A-only local patch at ${width}`, async ({ page }) => {
  270 |     const root = await open(page, 'E5', width);
  271 |     const b = root.getByRole('region', { name: '实例 B', exact: true });
  272 |     await b.getByRole('button', { name: '实验方法', exact: true }).click();
  273 |     await b.getByRole('textbox', { name: '实例 B 草稿', exact: true }).fill('B 的独立说明与尺寸保持');
  274 |     const facts = () => b.evaluate(element => ({
  275 |       html: element.innerHTML,
  276 |       rect: { width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height },
```