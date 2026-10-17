# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w3.spec.ts >> R1 double scenes retain content tab and isolate graph modes from navigation
- Location: tests/e2e/navigation-v042-w3.spec.ts:57:1

# Error details

```
Error: locator.click: Error: strict mode violation: locator('[data-rain-id="recipe-navigation-r1"]').getByRole('button', { name: '隐藏专业导航', exact: true }) resolved to 2 elements:
    1) <button type="button" title="隐藏专业导航" data-active="false" aria-label="隐藏专业导航" data-mode="expanded" aria-expanded="true" data-workspace-action="restore" class="rain-workspace__restore " aria-controls="_r_2a_-workspace-context">…</button> aka getByRole('button', { name: '隐藏专业导航', description: '隐藏专业导航' })
    2) <button aria-label="隐藏专业导航" data-workspace-action="hide">…</button> aka getByRole('heading', { name: '专业导航 固定专业导航 隐藏专业导航' }).getByLabel('隐藏专业导航')

Call log:
  - waiting for locator('[data-rain-id="recipe-navigation-r1"]').getByRole('button', { name: '隐藏专业导航', exact: true })

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
        - option "课程体系诊断"
        - option "产业链图谱" [selected]
    - link "打开认可原稿 ↗" [ref=e42] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R1
  - generic "R1 工作区" [ref=e45]:
    - generic [ref=e47]:
      - generic [ref=e48]:
        - button "展开平台导航" [ref=e49] [cursor=pointer]
        - button "隐藏专业导航" [expanded] [ref=e51] [cursor=pointer]
        - generic [ref=e53]:
          - strong [ref=e54]: 软件工程专业
          - generic [ref=e55]: 产业链图谱
        - button "布局" [ref=e56] [cursor=pointer]
        - button "专注内容" [ref=e57] [cursor=pointer]
      - generic [ref=e58]:
        - generic "平台导航" [ref=e60]:
          - generic [ref=e61]:
            - strong [ref=e62]
            - navigation "平台功能" [ref=e64]:
              - list [ref=e65]:
                - listitem [ref=e66]:
                  - link "工作台" [ref=e68] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e71]:
                  - link "课程" [ref=e73] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e76]:
                  - link "资源" [ref=e78] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e81]:
                  - link "专业" [ref=e83] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - generic [ref=e86]:
              - button "通知" [ref=e89] [cursor=pointer]
              - button "帮助" [ref=e91] [cursor=pointer]
        - generic [ref=e93]:
          - generic [ref=e94]:
            - generic [ref=e95]:
              - strong [ref=e98]: 软件工程专业
              - button "切换专业" [ref=e99] [cursor=pointer]
            - navigation "专业功能" [ref=e101]:
              - generic [ref=e102]:
                - link "培养方案" [ref=e103] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "专业引擎" [ref=e107] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "产教模型" [ref=e111] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "专业应用" [ref=e115] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "决策中心" [ref=e119] [cursor=pointer]:
                  - /url: "#navigation-v042"
            - button "成员" [ref=e124] [cursor=pointer]
          - generic [ref=e130]:
            - generic "专业导航" [ref=e132]:
              - heading [level=3] [ref=e133]:
                - text: 专业导航
                - generic [ref=e134]:
                  - button "固定专业导航" [ref=e135] [cursor=pointer]
                  - button "隐藏专业导航" [ref=e137] [cursor=pointer]
              - generic [ref=e139]: PROFESSIONAL WORKSPACE
              - heading "专业应用" [level=4] [ref=e140]
              - paragraph [ref=e141]: 2026 秋季 · 建设与分析
              - generic [ref=e142]:
                - heading "产业调研" [level=5] [ref=e143]
                - navigation "产业调研" [ref=e144]:
                  - list [ref=e145]:
                    - listitem [ref=e146]:
                      - link "产业链图谱" [ref=e148] [cursor=pointer]:
                        - /url: "#navigation-v042"
                    - listitem [ref=e151]:
                      - link "区域产业分析" [ref=e153] [cursor=pointer]:
                        - /url: "#navigation-v042"
                    - listitem [ref=e156]:
                      - link "产业政策库" [ref=e158] [cursor=pointer]:
                        - /url: "#navigation-v042"
                    - listitem [ref=e161]:
                      - link "产业企业库" [ref=e163] [cursor=pointer]:
                        - /url: "#navigation-v042"
              - generic [ref=e166]:
                - heading "专业分析" [level=5] [ref=e167]
                - navigation "专业分析" [ref=e168]:
                  - list [ref=e169]:
                    - listitem [ref=e170]:
                      - link "专业布局分析" [ref=e172] [cursor=pointer]:
                        - /url: "#navigation-v042"
                    - listitem [ref=e175]:
                      - link "岗位画像分析" [ref=e177] [cursor=pointer]:
                        - /url: "#navigation-v042"
              - generic [ref=e180]:
                - heading "运行记录" [level=5] [ref=e181]
                - navigation "运行记录" [ref=e182]:
                  - list [ref=e183]:
                    - listitem [ref=e184]:
                      - link "应用洞察" [ref=e186] [cursor=pointer]:
                        - /url: "#navigation-v042"
                    - listitem [ref=e189]:
                      - link "建设记录" [ref=e191] [cursor=pointer]:
                        - /url: "#navigation-v042"
              - generic [ref=e194]: 当前专业内的功能入口
            - separator "调整专业导航宽度" [ref=e195]
            - generic [ref=e197]:
              - generic [ref=e198]:
                - navigation "面包屑" [ref=e199]:
                  - list [ref=e200]:
                    - listitem [ref=e201]:
                      - generic [ref=e202]: 专业应用
                    - listitem [ref=e203]:
                      - generic [ref=e204]: /
                      - generic [ref=e205]: 产业链图谱
                - generic [ref=e206]:
                  - heading "产业链图谱" [level=3] [ref=e207]
                  - button "重新分析" [ref=e208] [cursor=pointer]
                - paragraph [ref=e212]: 以产业链理解岗位能力与课程建设方向。
              - generic [ref=e213]:
                - radiogroup "产业链范围" [ref=e215]:
                  - generic [ref=e217]:
                    - generic [ref=e218] [cursor=pointer]:
                      - radio "智能建造产业链" [checked] [ref=e219]
                      - generic [ref=e220]: 智能建造产业链
                    - generic [ref=e221] [cursor=pointer]:
                      - radio "建筑数字化服务链" [ref=e222]
                      - generic [ref=e223]: 建筑数字化服务链
                    - generic [ref=e224] [cursor=pointer]:
                      - radio "绿色低碳建造产业链" [ref=e225]
                      - generic [ref=e226]: 绿色低碳建造产业链
                - heading "产业链结构分析" [level=4] [ref=e227]
                - paragraph [ref=e228]: 智能建造产业链将设计、工程实施与运行维护串联为完整的工作流程。下方数据为布局示例。
                - generic [ref=e229]:
                  - heading "产业链结构图谱" [level=4] [ref=e230]
                  - radiogroup "图谱显示模式" [ref=e232]:
                    - generic [ref=e234]:
                      - generic [ref=e235] [cursor=pointer]:
                        - radio "矩形树图" [ref=e236]
                        - generic [ref=e237]: 矩形树图
                      - generic [ref=e238] [cursor=pointer]:
                        - radio "桑基图" [checked] [active] [ref=e239]
                        - generic [ref=e240]: 桑基图
                - generic [ref=e241]:
                  - generic [ref=e242]:
                    - heading "上游 · 设计与材料" [level=4] [ref=e243]
                    - generic [ref=e244]:
                      - text: 建筑设计产业
                      - generic [ref=e245]: 186 家示例企业
                    - generic [ref=e246]:
                      - text: 工程勘察产业
                      - generic [ref=e247]: 145 家示例企业
                    - generic [ref=e248]:
                      - text: 智能材料与部件
                      - generic [ref=e249]: 104 家示例企业
                  - generic [ref=e250]:
                    - heading "中游 · 建造与实施" [level=4] [ref=e251]
                    - generic [ref=e252]:
                      - text: 工程施工与管理
                      - generic [ref=e253]: 186 家示例企业
                    - generic [ref=e254]:
                      - text: 装配式建筑
                      - generic [ref=e255]: 145 家示例企业
                    - generic [ref=e256]:
                      - text: 数字化建造
                      - generic [ref=e257]: 104 家示例企业
                  - generic [ref=e258]:
                    - heading "下游 · 运营与交付" [level=4] [ref=e259]
                    - generic [ref=e260]:
                      - text: 工程监测与运维
                      - generic [ref=e261]: 186 家示例企业
                    - generic [ref=e262]:
                      - text: 建筑节能改造
                      - generic [ref=e263]: 145 家示例企业
                    - generic [ref=e264]:
                      - text: 智慧物业服务
                      - generic [ref=e265]: 104 家示例企业
                - status [ref=e266]
  - generic [ref=e267]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | const open=async(page:import('@playwright/test').Page,sample:string)=>{
  3  |   await page.goto('/#navigation-v042');
  4  |   await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();
  5  | };
  6  | test('A2 native destinations and zero-gap 76px queue keep business state colors',async({page})=>{
  7  |   await open(page,'A2');
  8  |   const sample=page.getByTestId('candidate-A2'),nav=sample.getByRole('navigation',{name:'课程空间功能'});
  9  |   await nav.getByRole('link',{name:'考核方案',exact:true}).click();
  10 |   await expect(nav.getByRole('link',{name:'考核方案',exact:true})).toHaveAttribute('aria-current','page');
  11 |   const queue=sample.getByRole('group',{name:'当前学生队列'}),rows=queue.locator('[data-slot="entry"]');
  12 |   await rows.nth(2).click();
  13 |   await expect(rows.nth(2)).toHaveAttribute('aria-pressed','true');
  14 |   const rects=await queue.locator('.rain-navigation-family__row').evaluateAll(elements=>elements.map(e=>{const r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:r.height};}));
  15 |   rects.forEach(r=>expect(r.height).toBe(76));
  16 |   rects.slice(1).forEach((r,i)=>expect(r.top).toBe(rects[i]!.bottom));
  17 |   await expect(rows.nth(1)).toContainText('7.0');
  18 |   expect(await rows.nth(1).locator('[data-slot="status"] span').evaluate(e=>getComputedStyle(e).color)).not.toBe(await rows.nth(1).evaluate(e=>getComputedStyle(e).color));
  19 | });
  20 | test('A3 native radio keyboard uses the exact regular/compact slot geometry',async({page})=>{
  21 |   await open(page,'A3');
  22 |   const modes=page.getByRole('radiogroup',{name:'图谱显示模式'});
  23 |   await modes.getByRole('radio',{name:'矩形树图',exact:true}).focus();
  24 |   await page.keyboard.press('ArrowRight');
  25 |   await expect(modes.getByRole('radio',{name:'桑基图',exact:true})).toBeChecked();
  26 |   await expect(page.locator('.nv43-chart-blocks')).toHaveAttribute('data-mode','sankey');
  27 |   const facts=await page.getByTestId('candidate-A3').locator('[data-rain-id="ui-segmented-control"]').evaluateAll(roots=>roots.map(root=>({density:root.getAttribute('data-nav-density'),track:root.querySelector('[data-slot="items"]')!.getBoundingClientRect().height,item:root.querySelector('label')!.getBoundingClientRect().height})));
  28 |   expect(facts.filter(f=>f.density==='regular').map(f=>[f.track,f.item])).toEqual([[32,26],[32,26]]);
  29 |   expect(facts.find(f=>f.density==='compact')).toMatchObject({track:30,item:24});
  30 | });
  31 | test('A5 current object identity and progress follow stable selection',async({page})=>{
  32 |   await open(page,'A5');
  33 |   const sample=page.getByTestId('candidate-A5');
  34 |   const item=sample.getByRole('button',{name:'小组汇报：从概念到真实应用',exact:true});
  35 |   await item.click();
  36 |   await expect(item).toHaveAttribute('aria-pressed','true');
  37 |   await expect(sample.getByRole('heading',{name:'小组汇报：从概念到真实应用',exact:true})).toBeVisible();
  38 |   await expect(item.getByRole('progressbar')).toHaveAttribute('aria-valuenow','100');
  39 |   expect((await item.locator('..').boundingBox())!.width).toBe(300);
  40 | });
  41 | test('C1-C5 and W1/W2/W3 preserve semantic content ownership and native focus',async({page})=>{
  42 |   await open(page,'Contents');
  43 |   const sample=page.getByTestId('candidate-Contents');
  44 |   for(const label of ['C1 · 简单','C2 · 带信息','C3 · 双行身份','C4 · 摘要','C5 · 预览'])await expect(sample.getByRole('heading',{name:label,exact:true})).toBeVisible();
  45 |   await sample.getByRole('button',{name:'等效电路的求解方法',exact:true}).click();
  46 |   await expect(sample.getByRole('button',{name:'等效电路的求解方法',exact:true})).toHaveAttribute('aria-pressed','true');
  47 |   await open(page,'White');
  48 |   const white=page.getByTestId('candidate-White'),line=white.getByRole('radiogroup',{name:'W1 / 白底指示线'});
  49 |   await line.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();
  50 |   await expect(line.getByRole('radio',{name:'已练对',exact:true})).toBeChecked();
  51 |   expect(await line.locator('label[data-state="checked"]').evaluate(e=>getComputedStyle(e,'::after').height)).toBe('2px');
  52 |   const soft=white.getByRole('radiogroup',{name:'W2 / 仅选中项填充'});
  53 |   expect(await soft.locator('[data-slot="items"]').evaluate(e=>getComputedStyle(e).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
  54 |   const tabs=white.getByRole('tab',{name:'教学资料',exact:true});
  55 |   expect(await tabs.evaluate(e=>getComputedStyle(e,'::before').height)).toBe('2px');
  56 | });
  57 | test('R1 double scenes retain content tab and isolate graph modes from navigation',async({page})=>{
  58 |   await open(page,'R1');
  59 |   const root=page.locator('[data-rain-id="recipe-navigation-r1"]');
  60 |   await root.getByRole('tab',{name:'学分结构',exact:true}).click();
  61 |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('industry');
  62 |   await root.getByRole('radio',{name:'桑基图',exact:true}).locator('..').click();
  63 |   await expect(root.getByRole('heading',{name:'产业链图谱',exact:true})).toBeVisible();
> 64 |   await root.getByRole('button',{name:'隐藏专业导航',exact:true}).click();
     |                                                             ^ Error: locator.click: Error: strict mode violation: locator('[data-rain-id="recipe-navigation-r1"]').getByRole('button', { name: '隐藏专业导航', exact: true }) resolved to 2 elements:
  65 |   await expect(root.getByRole('button',{name:'恢复专业导航',exact:true})).toBeVisible();
  66 |   await root.getByRole('button',{name:'恢复专业导航',exact:true}).click();
  67 |   await expect(root.getByRole('radio',{name:'桑基图',exact:true})).toBeChecked();
  68 |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('plan');
  69 |   await expect(root.getByRole('tab',{name:'学分结构',exact:true})).toHaveAttribute('aria-selected','true');
  70 | });
  71 | test('R3 two scenes keep directory/view/filter/star concerns independent',async({page})=>{
  72 |   await open(page,'R3');
  73 |   const root=page.locator('[data-rain-id="recipe-navigation-r3"]');
  74 |   await root.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('教学大纲');
  75 |   await expect(root.locator('tbody tr')).toHaveCount(1);
  76 |   await root.getByRole('radio',{name:'网格',exact:true}).locator('..').click();
  77 |   await expect(root.locator('.nv43-file-grid>button')).toHaveCount(1);
  78 |   await root.getByRole('button',{name:'隐藏资源目录',exact:true}).click();
  79 |   await root.getByRole('button',{name:'恢复资源目录',exact:true}).click();
  80 |   await expect(root.getByLabel('资源路径')).toContainText('教学资料');
  81 |   await root.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('');
  82 |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('errors');
  83 |   await expect(root.getByRole('tree',{name:'学习目录导航'})).toBeVisible();
  84 |   await expect(root.getByRole('button',{name:'进入编辑'})).toHaveCount(0);
  85 |   await root.getByRole('radio',{name:'加星',exact:true}).locator('..').click();
  86 |   await expect(root.getByRole('table',{name:'当前范围习题'}).locator('tbody tr')).toHaveCount(3);
  87 |   await root.getByRole('button',{name:'取消加星 · 第 1 题',exact:true}).click();
  88 |   await expect(root.getByRole('table',{name:'当前范围习题'}).locator('tbody tr')).toHaveCount(2);
  89 | });
  90 | test('W3 standalone consumer uses shared imports and no reference runtime globals',async({page})=>{
  91 |   await page.goto('/navigation-v042-w3-consumer.html');
  92 |   await expect(page.locator('[data-rain-id="recipe-navigation-r1"]')).toBeVisible();
  93 |   await page.getByRole('radio',{name:'错题集',exact:true}).locator('..').click();
  94 |   await expect(page.getByRole('tree',{name:'学习目录导航'})).toBeVisible();
  95 |   expect(await page.evaluate(()=>['YKT_DEBUG','YKT_VISIBILITY','ui','vApply'].filter(key=>key in window))).toEqual([]);
  96 |   await expect(page.locator('iframe')).toHaveCount(0);
  97 | });
  98 | 
```