# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-w4.spec.ts >> N05 N22 temporary pin, unpin and outside preserve one region instance
- Location: tests/e2e/navigation-v042-w4.spec.ts:26:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('.nv42-r2').getByRole('heading', { name: '知识点总览', exact: true })
    - locator resolved to <h3>知识点总览</h3>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <strong>高等数学 A</strong> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <strong>高等数学 A</strong> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv42-context-card">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
  5 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <strong>高等数学 A</strong> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <strong>高等数学 A</strong> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv42-context-card">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv42-context-card">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <strong>高等数学 A</strong> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="nv42-context-card">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
  - element was detached from the DOM, retrying
    - locator resolved to <h3>知识点总览</h3>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv42-cover">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="nv42-cover">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv42-context-card">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
  7 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv42-cover">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv42-cover">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv42-context-card">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv42-context-card">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
  2 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="nv42-cover">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="nv42-context-card">…</div> from <div data-side="start" data-region-slot="context" class="rain-workspace__region-slot">…</div> subtree intercepts pointer events
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
      - button "S1" [ref=e23]
      - button "S2" [ref=e24]
      - button "S3" [ref=e25]
      - button "S4" [ref=e26]
      - button "S5" [ref=e27]
      - button "S6" [ref=e28]
    - generic [ref=e29]:
      - text: 画板宽度
      - combobox "画板宽度" [ref=e30]:
        - option "1200"
        - option "1440" [selected]
        - option "1600"
    - generic [ref=e31]:
      - text: 连接
      - combobox "连接" [ref=e32]:
        - option "内缩 inset" [selected]
        - option "贴边 merged"
    - generic [ref=e33]:
      - text: 表面
      - combobox "表面" [ref=e34]:
        - option "中性底" [selected]
        - option "白底轮廓"
    - generic [ref=e35]:
      - text: 可见范围
      - combobox "可见范围" [ref=e36]:
        - option "3"
        - option "4" [selected]
        - option "5"
    - link "打开认可原稿 ↗" [ref=e37] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R2
  - generic [ref=e42]:
    - generic [ref=e43]:
      - button "恢复平台导航" [ref=e44] [cursor=pointer]
      - button "隐藏课程导航" [expanded] [ref=e46] [cursor=pointer]
      - generic [ref=e48]:
        - strong [ref=e49]: 高等数学 A · 课程内容
        - generic [ref=e50]: 公共资源包
      - button "布局" [ref=e51] [cursor=pointer]
      - button "专注内容" [ref=e53] [cursor=pointer]
    - generic [ref=e58]:
      - generic "课程导航" [ref=e59]:
        - generic [ref=e60]:
          - strong [ref=e61]: 课程导航
          - button "固定课程导航" [ref=e62] [cursor=pointer]
          - button "隐藏课程导航" [ref=e65] [cursor=pointer]
        - generic [ref=e68]:
          - button "返回我的课程" [ref=e69] [cursor=pointer]
          - generic [ref=e71]:
            - text: MATHEMATICS / 2026
            - strong [ref=e72]: 高等数学 A
            - generic [ref=e73]: ∫
          - heading "高等数学 A" [level=4] [ref=e74]
          - button "2026 秋季学期" [ref=e75] [cursor=pointer]
        - generic [ref=e77]: 教学空间
        - navigation "课程导航" [ref=e78]:
          - link "课程内容" [ref=e79] [cursor=pointer]:
            - /url: "#navigation-v042"
          - link "考核方案" [ref=e83] [cursor=pointer]:
            - /url: "#navigation-v042"
          - link "课程信息" [ref=e87] [cursor=pointer]:
            - /url: "#navigation-v042"
          - link "数据面板" [ref=e91] [cursor=pointer]:
            - /url: "#navigation-v042"
          - separator [ref=e95]
          - link "使用的班级 200" [ref=e96] [cursor=pointer]:
            - /url: "#navigation-v042"
            - generic [ref=e99]:
              - generic [ref=e100]: 使用的班级
              - generic [ref=e101]: "200"
          - link "关联的 AI 课 2" [ref=e102] [cursor=pointer]:
            - /url: "#navigation-v042"
            - generic [ref=e105]:
              - generic [ref=e106]: 关联的 AI 课
              - generic [ref=e107]: "2"
          - link "成员 12" [ref=e108] [cursor=pointer]:
            - /url: "#navigation-v042"
            - generic [ref=e111]:
              - generic [ref=e112]: 成员
              - generic [ref=e113]: "12"
        - button "课程建设记录" [ref=e114] [cursor=pointer]
      - generic [ref=e120]:
        - generic "分区导航" [ref=e122]:
          - generic [ref=e123]:
            - tablist "课程内容范围" [ref=e126]:
              - tab "公共资源包" [selected] [ref=e127] [cursor=pointer]:
                - generic [ref=e131]:
                  - generic [ref=e132]: 公共内容 · 班级共用
                  - generic [ref=e133]: 公共资源包
              - tab "2026 秋 · 高等数学 1 班" [ref=e135] [cursor=pointer]:
                - generic [ref=e139]:
                  - generic [ref=e140]: 教学班 · 2026 秋季学期
                  - generic [ref=e141]: 2026 秋 · 高等数学 1 班
              - tab "2026 秋 · 创新实验班" [ref=e143] [cursor=pointer]:
                - generic [ref=e147]:
                  - generic [ref=e148]: 教学班 · 2026 秋季学期
                  - generic [ref=e149]: 2026 秋 · 创新实验班
              - tab "2026 秋 · 高等数学 3 班" [ref=e151] [cursor=pointer]:
                - generic [ref=e155]:
                  - generic [ref=e156]: 教学班 · 2026 秋季学期
                  - generic [ref=e157]: 2026 秋 · 高等数学 3 班
            - button "更多班级" [ref=e160] [cursor=pointer]:
              - generic [ref=e162]: "197"
        - tabpanel "公共资源包" [ref=e166]:
          - generic [ref=e167]:
            - generic [ref=e168]:
              - navigation "面包屑" [ref=e170]:
                - list [ref=e171]:
                  - listitem [ref=e172]:
                    - generic [ref=e173]: 课程内容
                  - listitem [ref=e174]:
                    - generic [ref=e175]: /
                    - generic [ref=e176]: 公共资源包
              - generic [ref=e177]:
                - generic [ref=e178]:
                  - heading "知识点总览" [level=3] [ref=e179]
                  - paragraph [ref=e180]: 以知识点组织公共资源，在班级中安排教学。
                - button "预览学生端" [ref=e182] [cursor=pointer]
            - generic [ref=e186]:
              - generic [ref=e187]:
                - generic "已保存内容统计" [ref=e188]:
                  - generic [ref=e189]: 7 级结构
                  - generic [ref=e190]: 16 个内容节点
                  - generic [ref=e191]: 36 个学习单元
                - radiogroup "内容类型" [ref=e192]:
                  - radio "全部" [checked] [ref=e193] [cursor=pointer]
                  - radio "作业" [ref=e194] [cursor=pointer]
                  - radio "考试" [ref=e195] [cursor=pointer]
              - generic [ref=e196]:
                - generic [ref=e197]:
                  - generic [ref=e198]: 编辑后请保存
                  - button "内容编辑说明" [ref=e199] [cursor=pointer]
                - generic [ref=e202]:
                  - generic [ref=e203]:
                    - button "退出编辑" [ref=e204] [cursor=pointer]
                    - button "添加根节点" [ref=e206] [cursor=pointer]
                    - button "保存草稿" [ref=e208] [cursor=pointer]
                  - tree "课程内容编辑树" [ref=e210]:
                    - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e211]:
                      - generic [ref=e212]:
                        - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e213] [cursor=pointer]
                        - button "移动第一章 · 函数、极限与连续" [ref=e215] [cursor=pointer]
                        - generic "第一章 · 函数、极限与连续" [ref=e220]
                        - generic [ref=e222]:
                          - generic [ref=e223]: 20 个学习单元
                          - generic [ref=e224]: 09-24 更新
                    - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e225]:
                      - generic [ref=e226]:
                        - button "收起1.1 函数的基本概念" [expanded] [ref=e227] [cursor=pointer]
                        - button "移动1.1 函数的基本概念" [ref=e229] [cursor=pointer]
                        - generic "1.1 函数的基本概念" [ref=e234]
                        - generic [ref=e236]:
                          - generic [ref=e237]: 6 个学习单元
                          - generic [ref=e238]: 09-24 更新
                    - treeitem "函数的定义与表示" [level=3] [ref=e239]:
                      - generic [ref=e240]:
                        - button "移动函数的定义与表示" [ref=e241] [cursor=pointer]
                        - generic [ref=e243]: 讲义
                        - generic "函数的定义与表示" [ref=e250]
                        - generic [ref=e252]:
                          - generic [ref=e253]: 已发布
                          - generic [ref=e254]: 09-24 更新
                    - treeitem "函数的性质" [level=3] [ref=e255]:
                      - generic [ref=e256]:
                        - button "移动函数的性质" [ref=e257] [cursor=pointer]
                        - generic [ref=e259]: 视频
                        - generic "函数的性质" [ref=e266]
                        - generic [ref=e268]:
                          - generic [ref=e269]: 已发布
                          - generic [ref=e270]: 09-24 更新
                    - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e271]:
                      - generic [ref=e272]:
                        - button "收起1.2 极限与连续" [expanded] [ref=e273] [cursor=pointer]
                        - button "移动1.2 极限与连续" [ref=e275] [cursor=pointer]
                        - generic "1.2 极限与连续" [ref=e280]
                        - generic [ref=e282]:
                          - generic [ref=e283]: 8 个学习单元
                          - generic [ref=e284]: 09-24 更新
                    - treeitem "数列极限" [expanded] [level=3] [ref=e285]:
                      - generic [ref=e286]:
                        - button "收起数列极限" [expanded] [ref=e287] [cursor=pointer]
                        - button "移动数列极限" [ref=e289] [cursor=pointer]
                        - generic "数列极限" [ref=e294]
                        - generic [ref=e296]:
                          - generic [ref=e297]: 3 个学习单元
                          - generic [ref=e298]: 09-24 更新
                    - treeitem "极限的定义" [level=4] [ref=e299]:
                      - generic [ref=e300]:
                        - button "移动极限的定义" [ref=e301] [cursor=pointer]
                        - generic [ref=e303]: 讲义
                        - generic "极限的定义" [ref=e310]
                        - generic [ref=e312]:
                          - generic [ref=e313]: 已发布
                          - generic [ref=e314]: 09-24 更新
                    - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e315]:
                      - generic [ref=e316]:
                        - button "收起收敛性与极限运算" [expanded] [ref=e317] [cursor=pointer]
                        - button "移动收敛性与极限运算" [ref=e319] [cursor=pointer]
                        - generic "收敛性与极限运算" [ref=e324]
                        - generic [ref=e326]:
                          - generic [ref=e327]: 2 个学习单元
                          - generic [ref=e328]: 09-24 更新
                    - treeitem "两个重要极限" [expanded] [level=5] [ref=e329]:
                      - generic [ref=e330]:
                        - button "收起两个重要极限" [expanded] [ref=e331] [cursor=pointer]
                        - button "移动两个重要极限" [ref=e333] [cursor=pointer]
                        - generic "两个重要极限" [ref=e338]
                        - generic [ref=e340]:
                          - generic [ref=e341]: 2 个学习单元
                          - generic [ref=e342]: 09-24 更新
                    - treeitem "常见题型与方法" [expanded] [level=6] [ref=e343]:
                      - generic [ref=e344]:
                        - button "收起常见题型与方法" [expanded] [ref=e345] [cursor=pointer]
                        - button "移动常见题型与方法" [ref=e347] [cursor=pointer]
                        - generic "常见题型与方法" [ref=e352]
                        - generic [ref=e354]:
                          - generic [ref=e355]: 2 个学习单元
                          - generic [ref=e356]: 09-24 更新
                    - treeitem "例题与拓展练习" [level=7] [ref=e357]:
                      - generic [ref=e358]:
                        - button "移动例题与拓展练习" [ref=e359] [cursor=pointer]
                        - generic [ref=e361]: 作业
                        - generic "例题与拓展练习" [ref=e368]
                        - generic [ref=e370]:
                          - generic [ref=e371]: 已发布
                          - generic [ref=e372]: 09-24 更新
                    - treeitem "函数的连续性" [level=3] [ref=e373]:
                      - generic [ref=e374]:
                        - button "移动函数的连续性" [ref=e375] [cursor=pointer]
                        - generic [ref=e377]: 讲义
                        - generic "函数的连续性" [ref=e384]
                        - generic [ref=e386]:
                          - generic [ref=e387]: 已发布
                          - generic [ref=e388]: 09-24 更新
                    - treeitem "1.3 习题与应用" [level=2] [ref=e389]:
                      - generic [ref=e390]:
                        - button "移动1.3 习题与应用" [ref=e391] [cursor=pointer]
                        - generic [ref=e393]: 作业
                        - generic "1.3 习题与应用" [ref=e400]
                        - generic [ref=e402]:
                          - generic [ref=e403]: 已发布
                          - generic [ref=e404]: 09-24 更新
                    - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e405]:
                      - generic [ref=e406]:
                        - button "收起第二章 · 导数与微分" [expanded] [ref=e407] [cursor=pointer]
                        - button "移动第二章 · 导数与微分" [ref=e409] [cursor=pointer]
                        - generic "第二章 · 导数与微分" [ref=e414]
                        - generic [ref=e416]:
                          - generic [ref=e417]: 16 个学习单元
                          - generic [ref=e418]: 09-24 更新
                    - treeitem "2.1 导数的概念" [level=2] [ref=e419]:
                      - generic [ref=e420]:
                        - button "移动2.1 导数的概念" [ref=e421] [cursor=pointer]
                        - generic [ref=e423]: 讲义
                        - generic "2.1 导数的概念" [ref=e430]
                        - generic [ref=e432]:
                          - generic [ref=e433]: 已发布
                          - generic [ref=e434]: 09-24 更新
                    - treeitem "2.2 导数的应用" [level=2] [ref=e435]:
                      - generic [ref=e436]:
                        - button "移动2.2 导数的应用" [ref=e437] [cursor=pointer]
                        - generic [ref=e439]: 考试
                        - generic "2.2 导数的应用" [ref=e446]
                        - generic [ref=e448]:
                          - generic [ref=e449]: 已发布
                          - generic [ref=e450]: 09-24 更新
                    - generic [ref=e451]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                    - status [ref=e452]
            - generic [ref=e453]:
              - generic [ref=e454]: 公共资源的内容可供关联班级复用。
              - generic [ref=e455]: 模拟数据 · 未执行发布
  - generic [ref=e456]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import { expect, test, type Page } from '@playwright/test';
  2  | const open=async(page:Page,sample='R2')=>{await page.goto(`/?sample=${sample}#navigation-v042`);await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible();};
  3  | const box=async(page:Page,selector:string)=>page.locator(selector).evaluate(element=>{const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
  4  | 
  5  | test('N01 all-hidden R2 has stable named keyboard recovery and untouched scope',async({page})=>{
  6  |   await open(page);const root=page.locator('.nv42-r2');
  7  |   await root.getByRole('button',{name:'布局',exact:true}).click();
  8  |   const menu=page.getByRole('dialog',{name:'R2 布局'});
  9  |   await menu.getByRole('checkbox',{name:'显示平台导航',exact:true}).uncheck();
  10 |   await menu.getByRole('checkbox',{name:'显示课程导航',exact:true}).uncheck();
  11 |   await page.keyboard.press('Escape');
  12 |   await expect(root.locator('.rain-workspace__region[data-region-id="global"]')).toBeHidden();await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();
  13 |   const restore=root.getByRole('button',{name:'恢复课程导航',exact:true});const controlled=await restore.getAttribute('aria-controls');
  14 |   await expect(page.locator(`[id="${controlled}"]`)).toHaveCount(1);
  15 |   await restore.focus();await page.keyboard.press('Enter');await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeVisible();
  16 |   await expect(root.getByRole('tab',{name:'公共资源包',exact:true})).toHaveAttribute('aria-selected','true');
  17 | });
  18 | test('N02 N03 temporary dismiss and the next controller complete on the first click',async({page})=>{
  19 |   await open(page);const root=page.locator('.nv42-r2');
  20 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  21 |   await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  22 |   await root.locator('.nv42-workspace-bar').getByRole('button',{name:'展开平台导航',exact:true}).click();
  23 |   await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();await expect(root.locator('.rain-workspace__region[data-region-id="global"]')).toHaveAttribute('data-mode','expanded');
  24 |   await root.getByRole('button',{name:'恢复课程导航',exact:true}).click();await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeVisible();
  25 | });
  26 | test('N05 N22 temporary pin, unpin and outside preserve one region instance',async({page})=>{
  27 |   await open(page);const root=page.locator('.nv42-r2');const initial=await root.locator('.rain-workspace__region[data-region-id="context"]').getAttribute('id');
  28 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  29 |   const overlay=await box(page,'.nv42-main');
  30 |   await root.getByRole('button',{name:'固定课程导航',exact:true}).click();await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','false');
  31 |   expect((await box(page,'.nv42-main')).x-overlay.x).toBe(221);
  32 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  33 |   await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
> 34 |   await root.getByRole('heading',{name:'知识点总览',exact:true}).click();
     |                                                             ^ Error: locator.click: Test timeout of 30000ms exceeded.
  35 |   await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();expect(await box(page,'.nv42-main')).toEqual(overlay);
  36 |   expect(await root.locator('.rain-workspace__region[data-region-id="context"]').getAttribute('id')).toBe(initial);
  37 | });
  38 | test('N14 N15 nested semester popup consumes Escape before the temporary panel',async({page})=>{
  39 |   await open(page);const root=page.locator('.nv42-r2');
  40 |   await root.getByRole('button',{name:'取消固定，改为临时课程导航',exact:true}).click();
  41 |   await root.locator('.nv42-term').click();await expect(page.getByRole('menu')).toBeVisible();
  42 |   await page.keyboard.press('Escape');await expect(page.getByRole('menu')).toHaveCount(0);await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toHaveAttribute('data-temporary','true');
  43 |   await page.keyboard.press('Escape');await expect(root.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();await expect(root.getByRole('button',{name:'恢复课程导航',exact:true})).toBeFocused();
  44 | });
  45 | test('N08 N12 focus restores the hidden layout and an independent editor draft',async({page})=>{
  46 |   await page.goto('/navigation-v042-consumer.html');const text='布局切换保留的当前课程草稿';const draft=page.getByRole('textbox',{name:'教学目标草稿'});await draft.fill(text);
  47 |   await page.getByRole('button',{name:'隐藏课程导航',exact:true}).first().click();await page.getByRole('button',{name:'专注内容',exact:true}).click();await page.getByRole('button',{name:'退出专注',exact:true}).click();
  48 |   await expect(page.locator('.rain-workspace__region[data-region-id="context"]')).toBeHidden();await expect(page.locator('.rain-workspace__region[data-region-id="global"]')).toHaveAttribute('data-mode','compact');await expect(draft).toHaveValue(text);
  49 | });
  50 | test('N23 N24 N25 splitter keys clamp width, Enter hides and keyboard restores',async({page})=>{
  51 |   await open(page,'R3');const root=page.locator('[data-rain-id="recipe-navigation-r3"]');const splitter=root.getByRole('separator',{name:'调整资源目录宽度'});
  52 |   await splitter.focus();await page.keyboard.press('Shift+ArrowRight');await expect(splitter).toHaveAttribute('aria-valuenow','248');
  53 |   await page.keyboard.press('Home');await expect(splitter).toHaveAttribute('aria-valuenow','180');await page.keyboard.press('End');await expect(splitter).toHaveAttribute('aria-valuenow','420');
  54 |   await page.keyboard.press('Enter');await expect(splitter).toBeHidden();await expect(root.getByRole('button',{name:'显示资源目录',exact:true})).toBeFocused();
  55 |   await page.keyboard.press('Enter');await expect(splitter).toBeVisible();await expect(splitter).toHaveAttribute('aria-valuenow','420');
  56 | });
  57 | test('accepted R2 brand remains mounted through full, compact and reverse motion',async({page})=>{
  58 |   await open(page);await page.emulateMedia({reducedMotion:'no-preference'});const rail=page.locator('.nv42-rail');
  59 |   const facts=await rail.evaluate(async element=>{const brand=element.querySelector('.nv42-brand strong')!;const control=()=>element.querySelector<HTMLButtonElement>('.nv42-rail-head button')!;const widths:number[]=[];control().click();const start=performance.now();while(performance.now()-start<350){await new Promise(requestAnimationFrame);widths.push(element.getBoundingClientRect().width);}control().click();await new Promise(resolve=>setTimeout(resolve,350));return {same:brand===element.querySelector('.nv42-brand strong'),widths,final:element.getBoundingClientRect().width};});
  60 |   expect(facts.same).toBe(true);expect(facts.widths.at(-1)).toBe(208);expect(facts.widths.filter(width=>width>64&&width<208).length).toBeGreaterThan(2);expect(facts.final).toBe(64);
  61 |   await page.emulateMedia({reducedMotion:'reduce'});await expect(rail).toHaveCSS('transition-duration','0s');
  62 | });
  63 | 
```