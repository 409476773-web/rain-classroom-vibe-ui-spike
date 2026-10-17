# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w3.spec.ts >> R3 two scenes keep directory/view/filter/star concerns independent
- Location: tests/e2e/navigation-v042-w3.spec.ts:70:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-rain-id="recipe-navigation-r3"]').locator('.nv43-file-grid>button')
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('[data-rain-id="recipe-navigation-r3"]').locator('.nv43-file-grid>button')
    14 × locator resolved to 0 elements
       - unexpected value "0"

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
              - strong [ref=e98]: 我的资源
              - button "切换资源空间" [ref=e99] [cursor=pointer]
            - navigation "资源功能" [ref=e101]:
              - generic [ref=e102]:
                - link "云盘" [ref=e103] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "题库" [ref=e107] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "课件库" [ref=e111] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "试卷库" [ref=e115] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "问卷库" [ref=e119] [cursor=pointer]:
                  - /url: "#navigation-v042"
            - button "成员" [ref=e124] [cursor=pointer]
          - generic [ref=e130]:
            - generic "资源目录" [ref=e132]:
              - heading [level=3] [ref=e133]:
                - text: 资源目录
                - generic [ref=e134]:
                  - button "取消固定资源目录" [ref=e135] [cursor=pointer]
                  - button "隐藏资源目录" [ref=e137] [cursor=pointer]
              - heading "资源分类" [level=5] [ref=e139]
              - navigation "资源分类" [ref=e140]:
                - list [ref=e141]:
                  - listitem [ref=e142]:
                    - link "全部文件" [ref=e144] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e147]:
                    - link "图片" [ref=e149] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e152]:
                    - link "视频" [ref=e154] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e157]:
                    - link "音频" [ref=e159] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e162]:
                    - link "文档" [ref=e164] [cursor=pointer]:
                      - /url: "#navigation-v042"
              - heading "常用文件夹" [level=5] [ref=e167]
              - navigation "常用文件夹" [ref=e168]:
                - list [ref=e169]:
                  - listitem [ref=e170]:
                    - link "教学资料" [ref=e172] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e175]:
                    - link "课程案例" [ref=e177] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e180]:
                    - link "专业文献" [ref=e182] [cursor=pointer]:
                      - /url: "#navigation-v042"
              - generic [ref=e185]: 已使用 4.2 GB / 10 GB
            - separator "调整资源目录宽度" [ref=e186]
            - generic [ref=e188]:
              - generic [ref=e189]:
                - generic "资源路径" [ref=e190]:
                  - navigation "面包屑" [ref=e191]:
                    - list [ref=e192]:
                      - listitem [ref=e193]:
                        - generic [ref=e194]: 全部文件
                      - listitem [ref=e195]:
                        - generic [ref=e196]: /
                        - generic [ref=e197]: 教学资料
                - generic [ref=e198]:
                  - generic [ref=e199]:
                    - heading "全部文件" [level=3] [ref=e200]
                    - paragraph [ref=e201]: 分类、文件夹、文件选中和多选状态分别表达。
                  - button "上传文件" [ref=e202] [cursor=pointer]
              - generic [ref=e206]:
                - generic [ref=e207]:
                  - generic [ref=e208]: 共 1 项
                  - textbox "搜索当前范围内的文件" [ref=e212]: 教学大纲
                  - radiogroup "文件显示模式" [ref=e215]:
                    - generic [ref=e217]:
                      - generic [ref=e218] [cursor=pointer]:
                        - radio "列表" [ref=e219]
                        - generic [ref=e222]: 列表
                      - generic [ref=e223] [cursor=pointer]:
                        - radio "网格" [checked] [active] [ref=e224]
                        - generic [ref=e227]: 网格
                - group "云盘文件网格" [ref=e228]:
                  - generic [ref=e229]:
                    - checkbox "选择 2026 秋季课程教学大纲.docx" [ref=e231]
                    - button "2026 秋季课程教学大纲.docx" [ref=e234] [cursor=pointer]:
                      - strong [ref=e236]: 2026 秋季课程教学大纲.docx
                      - generic [ref=e237]: 348 KB · 已审核
                - generic [ref=e238]:
                  - generic [ref=e239]: 列表 / 网格切换保留当前目录
                  - generic [ref=e240]: 1 · 单页演示数据
                - status [ref=e241]
  - generic [ref=e242]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
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
  64 |   const restore=root.locator('.nv43-workspace-bar .rain-workspace__restore[aria-controls$="-workspace-context"]');
  65 |   await restore.click();await expect(restore).toHaveAttribute('aria-label','显示专业导航');await restore.click();
  66 |   await expect(root.getByRole('radio',{name:'桑基图',exact:true})).toBeChecked();
  67 |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('plan');
  68 |   await expect(root.getByRole('tab',{name:'学分结构',exact:true})).toHaveAttribute('aria-selected','true');
  69 | });
  70 | test('R3 two scenes keep directory/view/filter/star concerns independent',async({page})=>{
  71 |   await open(page,'R3');
  72 |   const root=page.locator('[data-rain-id="recipe-navigation-r3"]');
  73 |   await root.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('教学大纲');
  74 |   await expect(root.locator('tbody tr')).toHaveCount(1);
  75 |   await root.getByRole('radio',{name:'网格',exact:true}).locator('..').click();
> 76 |   await expect(root.locator('.nv43-file-grid>button')).toHaveCount(1);
     |                                                        ^ Error: expect(locator).toHaveCount(expected) failed
  77 |   const restore=root.locator('.nv43-workspace-bar .rain-workspace__restore[aria-controls$="-workspace-context"]');
  78 |   await restore.click();await expect(restore).toHaveAttribute('aria-label','显示资源目录');await restore.click();
  79 |   await expect(root.getByLabel('资源路径')).toContainText('教学资料');
  80 |   await root.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('');
  81 |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('errors');
  82 |   await expect(root.getByRole('tree',{name:'学习目录导航'})).toBeVisible();
  83 |   await expect(root.getByRole('button',{name:'进入编辑'})).toHaveCount(0);
  84 |   await root.getByRole('radio',{name:'加星',exact:true}).locator('..').click();
  85 |   await expect(root.getByRole('table',{name:'当前范围习题'}).locator('tbody tr')).toHaveCount(3);
  86 |   await root.getByRole('button',{name:'取消加星 · 第 1 题',exact:true}).click();
  87 |   await expect(root.getByRole('table',{name:'当前范围习题'}).locator('tbody tr')).toHaveCount(2);
  88 | });
  89 | test('W3 standalone consumer uses shared imports and no reference runtime globals',async({page})=>{
  90 |   await page.goto('/navigation-v042-w3-consumer.html');
  91 |   await expect(page.locator('[data-rain-id="recipe-navigation-r1"]')).toBeVisible();
  92 |   await page.getByRole('radio',{name:'错题集',exact:true}).locator('..').click();
  93 |   await expect(page.getByRole('tree',{name:'学习目录导航'})).toBeVisible();
  94 |   expect(await page.evaluate(()=>['YKT_DEBUG','YKT_VISIBILITY','ui','vApply'].filter(key=>key in window))).toEqual([]);
  95 |   await expect(page.locator('iframe')).toHaveCount(0);
  96 | });
  97 | 
```