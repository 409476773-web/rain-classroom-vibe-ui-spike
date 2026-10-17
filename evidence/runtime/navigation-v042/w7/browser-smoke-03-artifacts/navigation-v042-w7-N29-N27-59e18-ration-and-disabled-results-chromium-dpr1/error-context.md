# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w7.spec.ts >> N29 N27 same-label scopes retain separate IDs and drafts through removal, restoration and disabled results
- Location: tests/e2e/navigation-v042-w7.spec.ts:285:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('button', { name: '同名跨学院联合班', exact: true })
Expected: 2
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for getByRole('button', { name: '同名跨学院联合班', exact: true })
    14 × locator resolved to 0 elements
       - unexpected value "0"

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
  - region "E1 课程资源" [ref=e33]:
    - generic [ref=e34]:
      - generic [ref=e35]:
        - generic [ref=e36]:
          - paragraph [ref=e37]: 跨学科项目课程 · 2026秋季
          - heading "课程资源管理" [level=1] [ref=e38]
        - generic [ref=e39]: 公共资源包 + 240个教学班 · 模拟数据
      - generic [ref=e42]:
        - generic "分区导航" [ref=e44]:
          - generic [ref=e45]:
            - tablist "课程资源范围" [ref=e48]:
              - tab "公共资源包" [selected] [ref=e49] [cursor=pointer]:
                - generic [ref=e51]:
                  - generic [ref=e52]: 所有教学班共享 · 12项资料
                  - generic [ref=e53]: 公共资源包
              - tab "跨学科项目课程：人工智能、教育创新与可持续城市设计 · 001班" [ref=e55] [cursor=pointer]:
                - generic [ref=e57]:
                  - generic [ref=e58]: 教学班 001 · 25人 · 2026秋季
                  - generic [ref=e59]: 跨学科项目课程：人工智能、教育创新与可持续城市设计 · 001班
              - tab "跨学科项目课程：人工智能、教育创新与可持续城市设计 · 002班" [ref=e61] [cursor=pointer]:
                - generic [ref=e63]:
                  - generic [ref=e64]: 教学班 002 · 26人 · 2026秋季
                  - generic [ref=e65]: 跨学科项目课程：人工智能、教育创新与可持续城市设计 · 002班
              - tab "跨学科项目课程：人工智能、教育创新与可持续城市设计 · 003班" [ref=e67] [cursor=pointer]:
                - generic [ref=e69]:
                  - generic [ref=e70]: 教学班 003 · 27人 · 2026秋季
                  - generic [ref=e71]: 跨学科项目课程：人工智能、教育创新与可持续城市设计 · 003班
            - generic [ref=e73]:
              - button "更多班级" [expanded] [ref=e75] [cursor=pointer]:
                - generic [ref=e77]: "237"
              - dialog [ref=e82]:
                - generic [ref=e83]:
                  - generic [ref=e84]:
                    - heading "选择课程内容范围" [level=2] [ref=e85]
                    - button "关闭范围选择" [ref=e86]
                  - generic [ref=e89]:
                    - textbox "搜索范围" [active] [ref=e92]:
                      - /placeholder: 搜索班级名称或序号
                      - text: 同名跨学院联合班
                    - button "清除搜索范围" [ref=e94] [cursor=pointer]
                  - generic "范围搜索结果" [ref=e97]:
                    - button "同名跨学院联合班 教学班 199 · 25人 · 2026秋季" [ref=e98]:
                      - generic [ref=e99]:
                        - strong [ref=e100]: 同名跨学院联合班
                        - generic [ref=e101]: 教学班 199 · 25人 · 2026秋季
                    - button "同名跨学院联合班 教学班 200 · 26人 · 2026秋季" [ref=e102]:
                      - generic [ref=e103]:
                        - strong [ref=e104]: 同名跨学院联合班
                        - generic [ref=e105]: 教学班 200 · 26人 · 2026秋季
        - tabpanel "公共资源包" [ref=e110]:
          - article [ref=e111]:
            - generic [ref=e112]:
              - heading "公共资源包资源" [level=2] [ref=e113]
              - button "移除当前班级" [disabled] [ref=e114]
            - paragraph [ref=e116]: 所有教学班共享 · 12项资料。范围切换保留本地说明，内容仅用于演示。
            - table [ref=e117]:
              - rowgroup [ref=e118]:
                - row [ref=e119]:
                  - columnheader "资源名称" [ref=e120]
                  - columnheader "类型" [ref=e121]
                  - columnheader "维护人" [ref=e122]
                  - columnheader "更新日期" [ref=e123]
              - rowgroup [ref=e124]:
                - row [ref=e125]:
                  - cell "项目任务书：校园微气候与公共空间设计" [ref=e126]
                  - cell "任务书" [ref=e127]
                  - cell "教师团队" [ref=e128]
                  - cell "2026-09-29" [ref=e129]
                - row [ref=e130]:
                  - cell "证据采集表与访谈记录模板" [ref=e131]
                  - cell "资料模板" [ref=e132]
                  - cell "课程负责人" [ref=e133]
                  - cell "2026-09-28" [ref=e134]
                - row [ref=e135]:
                  - cell "第一阶段文献导读与实验安全说明" [ref=e136]
                  - cell "阅读材料" [ref=e137]
                  - cell "教师团队" [ref=e138]
                  - cell "2026-09-25" [ref=e139]
            - generic [ref=e140]:
              - text: 资源说明草稿
              - textbox "资源说明草稿" [ref=e142]:
                - /placeholder: 填写当前范围的本地说明
```

# Test source

```ts
  193 |   expect(facts.innerShadow).toBe('none');
  194 |   expect(facts.outerShadow !== 'none' || facts.outerOutline !== 'none').toBe(true);
  195 |   await page.keyboard.press('Escape');
  196 |   await expect(root.getByRole('button', { name: '更多班级', exact: true })).toBeFocused();
  197 | });
  198 | 
  199 | test('N19 S3 temporary context search retains its single shared Input focus ring', async ({ page }) => {
  200 |   const root = await open(page, 'S3');
  201 |   await restore(root, 'context').click();
  202 |   const input = region(root, 'context').getByRole('textbox', { name: '搜索工作区', exact: true });
  203 |   await input.focus();
  204 |   await expect(input).toBeFocused();
  205 |   const styles = await input.evaluate(element => {
  206 |     const inner = getComputedStyle(element), outer = getComputedStyle(element.closest('[data-rain-id="ui-input"]')!);
  207 |     return { innerOutline: inner.outlineStyle, innerShadow: inner.boxShadow, outerOutline: outer.outlineStyle, outerShadow: outer.boxShadow };
  208 |   });
  209 |   expect(styles.innerOutline).toBe('none'); expect(styles.innerShadow).toBe('none');
  210 |   expect(styles.outerOutline !== 'none' || styles.outerShadow !== 'none').toBe(true);
  211 | });
  212 | 
  213 | test('N14 connected geometry remains finite after first middle last selection, resize and region recovery', async ({ page }) => {
  214 |   const root = await open(page, 'R2');
  215 |   const scope = root.locator('[data-rain-id="ui-scope-navigation"]');
  216 |   for (const label of ['公共资源包', '2026 秋 · 高等数学 1 班', '2026 秋 · 创新实验班']) {
  217 |     await scope.getByRole('tab', { name: label, exact: true }).click();
  218 |     await expect(scope.getByRole('tab', { name: label, exact: true })).toHaveAttribute('aria-selected', 'true');
  219 |     const paths = await scope.locator('svg path').evaluateAll(elements => elements.map(element => element.getAttribute('d')));
  220 |     expect(paths.length).toBeGreaterThan(0);
  221 |     expect(paths.every(path => Boolean(path) && !/NaN|Infinity|undefined/.test(path!))).toBe(true);
  222 |   }
  223 |   for (const width of [1200, 1600, 1440]) await page.getByRole('combobox', { name: '画板宽度' }).selectOption(String(width));
  224 |   await root.locator('.nv42-workspace-bar').getByRole('button', { name: '隐藏课程导航', exact: true }).click();
  225 |   await root.getByRole('button', { name: '恢复课程导航', exact: true }).click();
  226 |   await expect(scope.getByRole('tab', { name: '2026 秋 · 创新实验班', exact: true })).toHaveAttribute('aria-selected', 'true');
  227 |   expect(await scope.locator('svg path').evaluateAll(elements => elements.every(element => !/NaN|Infinity/.test(element.getAttribute('d') ?? '')))).toBe(true);
  228 | });
  229 | 
  230 | for (const width of [1200, 1440, 1600]) test(`N21 N23 W7 matrix scope caps and search 200 classes at ${width}`, async ({ page }) => {
  231 |   const root = await open(page, 'R2', width);
  232 |   const scope = root.locator('[data-rain-id="ui-scope-navigation"]');
  233 |   for (const cap of [3, 4, 5]) {
  234 |     await page.getByRole('combobox', { name: '可见范围' }).selectOption(String(cap));
  235 |     const tabs = scope.getByRole('tab');
  236 |     expect(await tabs.count()).toBeLessThanOrEqual(cap);
  237 |     await expect(tabs.first()).toHaveAccessibleName('公共资源包');
  238 |     await root.getByRole('button', { name: '更多班级', exact: true }).click();
  239 |     await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('高等数学 200 班');
  240 |     await page.getByRole('button', { name: '2026 秋 · 高等数学 200 班', exact: true }).click();
  241 |     await expect(tabs.last()).toHaveAccessibleName('2026 秋 · 高等数学 200 班');
  242 |     await expect(tabs.last()).toHaveAttribute('aria-selected', 'true');
  243 |     await expect(tabs.first()).toHaveAccessibleName('公共资源包');
  244 |   }
  245 | });
  246 | 
  247 | for (const sample of ['R4', 'S4']) for (const width of [1200, 1440, 1600]) test(`N12 N28 W7 matrix ${sample} grading theme retains draft and input identity at ${width}`, async ({ page }) => {
  248 |   const root = await open(page, sample, width);
  249 |   await page.getByRole('combobox', { name: '业务子场景' }).selectOption('grading');
  250 |   const draft = root.getByRole('textbox', { name: '给当前作答的反馈', exact: true });
  251 |   await draft.fill('W7 同一作答的未保存草稿');
  252 |   await draft.evaluate(element => element.setAttribute('data-w7-original-input', 'true'));
  253 |   const selected = await root.getByRole('group', { name: '学生队列' }).locator('[aria-pressed="true"]').getAttribute('aria-label');
  254 |   for (const inverse of [true, false]) {
  255 |     await page.getByRole('checkbox', { name: '深色外框', exact: true }).setChecked(inverse);
  256 |     await expect(draft).toHaveValue('W7 同一作答的未保存草稿');
  257 |     await expect(draft).toHaveAttribute('data-w7-original-input', 'true');
  258 |     expect(await root.getByRole('group', { name: '学生队列' }).locator('[aria-pressed="true"]').getAttribute('aria-label')).toBe(selected);
  259 |   }
  260 |   await root.getByRole('radio', { name: '大', exact: true }).locator('..').click();
  261 |   await expect(draft).toHaveValue('W7 同一作答的未保存草稿');
  262 |   await expect(draft).toHaveAttribute('data-w7-original-input', 'true');
  263 |   await expect(root.locator('.nv5-demo-note')).toContainText('未提交成绩');
  264 | });
  265 | 
  266 | test('N31 StrictMode standalone repeatedly mounts workspaces without stale temporary state', async ({ page }) => {
  267 |   const errors: string[] = [];
  268 |   page.on('pageerror', error => errors.push(error.message));
  269 |   await page.goto('/navigation-v042-w3-consumer.html');
  270 |   for (let cycle = 0; cycle < 3; cycle++) {
  271 |     await page.getByRole('radio', { name: '协作空间', exact: true }).locator('..').click();
  272 |     const root = page.locator('[data-recipe-id="recipe-navigation-r6"]');
  273 |     await restore(root, 'context').click();
  274 |     await restore(root, 'context').click();
  275 |     await page.getByRole('radio', { name: '课堂回放', exact: true }).locator('..').click();
  276 |     const replay = page.locator('[data-recipe-id="recipe-navigation-r5"]');
  277 |     await replay.getByRole('button', { name: '播放回放', exact: true }).click();
  278 |     await page.getByRole('radio', { name: '云盘', exact: true }).locator('..').click();
  279 |     await expect(page.locator('[data-rain-id="recipe-navigation-r3"]').first()).toBeVisible();
  280 |     await expect(page.locator('.rain-workspace__region[data-temporary="true"]')).toHaveCount(0);
  281 |   }
  282 |   expect(errors).toEqual([]);
  283 | });
  284 | 
  285 | test('N29 N27 same-label scopes retain separate IDs and drafts through removal, restoration and disabled results', async ({ page }) => {
  286 |   await page.goto('/navigation-v042-w6-consumer.html#E1');
  287 |   const root = page.locator('[data-rain-id="local-navigation-w6-e1"]');
  288 |   const more = root.getByRole('button', { name: '更多班级', exact: true });
  289 |   const choose = async (index: number, id: string) => {
  290 |     await more.click();
  291 |     await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('同名跨学院联合班');
  292 |     const results = page.getByRole('button', { name: '同名跨学院联合班', exact: true });
> 293 |     await expect(results).toHaveCount(2);
      |                           ^ Error: expect(locator).toHaveCount(expected) failed
  294 |     await results.nth(index).click();
  295 |     await expect(root).toHaveAttribute('data-scope-id', id);
  296 |   };
  297 |   await choose(0, 'class-199');
  298 |   const draft = root.getByRole('textbox', { name: '资源说明草稿', exact: true });
  299 |   await draft.fill('只属于199的说明');
  300 |   await choose(1, 'class-200'); await expect(draft).toHaveValue(''); await draft.fill('只属于200的说明');
  301 |   await choose(0, 'class-199'); await expect(draft).toHaveValue('只属于199的说明');
  302 |   await choose(1, 'class-200'); await expect(draft).toHaveValue('只属于200的说明');
  303 |   await more.click();
  304 |   await page.getByRole('textbox', { name: '搜索范围', exact: true }).fill('238班');
  305 |   await expect(page.getByRole('button', { name: /238班/, exact: false })).toBeDisabled();
  306 |   await page.keyboard.press('Escape'); await expect(root).toHaveAttribute('data-scope-id', 'class-200');
  307 |   await root.getByRole('button', { name: '移除当前班级', exact: true }).click();
  308 |   await expect(root.getByText('当前范围已不可用，请重新选择。', { exact: true })).toBeVisible();
  309 |   await expect(root.locator('[role="tab"][aria-selected="true"]')).toHaveCount(0);
  310 |   await expect(root).toHaveAttribute('data-scope-id', 'class-200');
  311 |   await root.getByRole('button', { name: '恢复刚移除的班级', exact: true }).click();
  312 |   await expect(root.locator('[role="tab"][aria-selected="true"]')).toHaveCount(1);
  313 |   await expect(draft).toHaveValue('只属于200的说明');
  314 | });
  315 | 
  316 | test('N32 N28 R6 wide narrow wide derives layout without losing draft, region instance or font size', async ({ page }) => {
  317 |   const root = await open(page, 'R6', 1600);
  318 |   const fields = region(root, 'fields');
  319 |   const draft = root.getByRole('textbox', { name: '你希望我们改进的地方', exact: true });
  320 |   await draft.fill('宽度只改变可用布局');
  321 |   await draft.evaluate(element => element.setAttribute('data-w7-original-input', 'true'));
  322 |   const originalId = await fields.getAttribute('id');
  323 |   const font = await draft.evaluate(element => getComputedStyle(element).fontSize);
  324 |   await expect(fields).toBeVisible();
  325 |   await page.getByRole('combobox', { name: '画板宽度' }).selectOption('1200');
  326 |   await expect(fields).toBeHidden();
  327 |   await expect(root.locator('.nv5-adaptation')).toContainText('你的展开偏好未被覆盖');
  328 |   await page.getByRole('combobox', { name: '画板宽度' }).selectOption('1600');
  329 |   await expect(fields).toHaveAttribute('data-mode', 'expanded');
  330 |   await expect(fields).toBeVisible();
  331 |   expect(await fields.getAttribute('id')).toBe(originalId);
  332 |   await expect(draft).toHaveAttribute('data-w7-original-input', 'true');
  333 |   await expect(draft).toHaveValue('宽度只改变可用布局');
  334 |   expect(await draft.evaluate(element => getComputedStyle(element).fontSize)).toBe(font);
  335 | });
  336 | 
  337 | test('N36 accepted Review11 W3 exception retains gradient without a top accent for first middle last', async ({ page }) => {
  338 |   await open(page, 'White');
  339 |   const root = page.getByTestId('candidate-White');
  340 |   const tabs = root.getByRole('tab');
  341 |   for (const tab of await tabs.all()) {
  342 |     await tab.hover(); await tab.click(); await page.mouse.move(0, 0);
  343 |     await expect(tab).toHaveAttribute('aria-selected', 'true');
  344 |     expect(await tab.evaluate(element => ({ content: getComputedStyle(element, '::before').content, display: getComputedStyle(element, '::before').display, fill: getComputedStyle(element).backgroundImage }))).toEqual({ content: 'none', display: 'none', fill: 'linear-gradient(rgb(224, 234, 255), rgb(255, 255, 255))' });
  345 |     expect(await root.locator('.rain-connected-surface__union').evaluateAll(elements => elements.every(element => Boolean(element.getAttribute('d')) && !/NaN|Infinity/.test(element.getAttribute('d')!)))).toBe(true);
  346 |   }
  347 | });
  348 | 
  349 | test('N35 A4 adjacent separators follow ordinary hover current and blur without duplication', async ({ page }) => {
  350 |   await open(page, 'A4');
  351 |   const tabs = page.getByTestId('candidate-A4').getByRole('tab');
  352 |   const separator = tabs.nth(1);
  353 |   const opacity = () => separator.evaluate(element => getComputedStyle(element, '::after').opacity);
  354 |   await tabs.nth(0).click(); await page.mouse.move(0, 0);
  355 |   await expect.poll(opacity).toBe('0.65');
  356 |   await tabs.nth(2).hover(); await expect.poll(opacity).toBe('0');
  357 |   await page.mouse.move(0, 0); await expect.poll(opacity).toBe('0.65');
  358 |   await tabs.nth(2).click(); await page.mouse.move(0, 0); await expect.poll(opacity).toBe('0');
  359 | });
  360 | 
  361 | test('N33 N38 standalone E6 material review runs native selection, drafts and recovery without reference globals', async ({ page }) => {
  362 |   await page.goto('/navigation-v042-w6-consumer.html#E6');
  363 |   await expect(page.locator('[data-ai-task="E6"]')).toBeVisible();
  364 |   expect(await page.evaluate(() => ['YKT_DEBUG', 'YKT_VISIBILITY', 'ui', 'vApply'].filter(key => key in window))).toEqual([]);
  365 |   await expect(page.locator('iframe')).toHaveCount(0);
  366 |   const root = page.locator('[data-ai-task="E6"] .rain-workspace');
  367 |   await expect(root).toHaveCount(1);
  368 |   const draft = root.getByRole('textbox', { name: '审核意见', exact: true });
  369 |   await expect(draft).toBeVisible();
  370 |   await draft.fill('W7 审核工作台草稿');
  371 |   const controls = root.locator('.rain-workspace__restore');
  372 |   expect(await controls.count()).toBeGreaterThan(0);
  373 |   await controls.first().click();
  374 |   await controls.first().click();
  375 |   await expect(draft).toHaveValue('W7 审核工作台草稿');
  376 | });
  377 | 
```