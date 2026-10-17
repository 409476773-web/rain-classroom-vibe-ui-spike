# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: r2-hierarchy.spec.ts >> R2 1200 hierarchy keeps component paint, geometry, and existing actions
- Location: evidence/runtime/navigation-v042/w5/review-10-visual-hierarchy/r2/r2-hierarchy.spec.ts:3:38

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.nv42-r2').first().getByRole('status')
Expected substring: "预览学生端：本地演示"
Error: strict mode violation: locator('.nv42-r2').first().getByRole('status') resolved to 2 elements:
    1) <span role="status" class="sr-only" aria-live="polite"></span> aka getByRole('tree', { name: '课程内容编辑树' }).getByRole('status')
    2) <div role="status" class="nv42-toast">…</div> aka getByText('预览学生端：本地演示，未连接真实服务。')

Call log:
  - Expect "toContainText" with timeout 6000ms
  - waiting for locator('.nv42-r2').first().getByRole('status')

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
        - option "1200" [selected]
        - option "1440"
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
    - link "打开认可原稿 ↗" [ref=e40] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R2
  - generic [ref=e45]:
    - generic [ref=e46]:
      - button "展开平台导航" [ref=e47] [cursor=pointer]
      - button "隐藏课程导航" [expanded] [ref=e49] [cursor=pointer]
      - generic [ref=e51]:
        - strong [ref=e52]: 高等数学 A · 课程内容
        - generic [ref=e53]: 公共资源包
      - button "布局" [ref=e54] [cursor=pointer]
      - button "专注内容" [ref=e56] [cursor=pointer]
    - generic [ref=e60]:
      - generic "平台导航" [ref=e62]:
        - navigation "平台导航" [ref=e63]:
          - generic [ref=e64]:
            - button "展开平台导航" [ref=e65] [cursor=pointer]
            - strong [ref=e70]: 雨课堂
          - generic [ref=e71]:
            - link "工作台" [ref=e72] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "课程" [ref=e75] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "资源" [ref=e78] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "专业" [ref=e81] [cursor=pointer]:
              - /url: "#navigation-v042"
          - generic [ref=e84]:
            - button "当前账户：林老师" [ref=e85] [cursor=pointer]
            - generic [ref=e88]:
              - button "通知" [ref=e89] [cursor=pointer]
              - button "帮助" [ref=e92] [cursor=pointer]
      - generic [ref=e95]:
        - generic "课程导航" [ref=e97]:
          - generic [ref=e98]:
            - strong [ref=e99]: 课程导航
            - button "取消固定，改为临时课程导航" [ref=e100] [cursor=pointer]
            - button "隐藏课程导航" [ref=e103] [cursor=pointer]
          - generic [ref=e106]:
            - button "返回我的课程" [ref=e107] [cursor=pointer]
            - generic [ref=e109]:
              - text: MATHEMATICS / 2026
              - strong [ref=e110]: 高等数学 A
              - generic [ref=e111]: ∫
            - heading "高等数学 A" [level=4] [ref=e112]
            - button "2026 秋季学期" [ref=e113] [cursor=pointer]
          - generic [ref=e115]: 教学空间
          - navigation "课程导航" [ref=e116]:
            - link "课程内容" [ref=e117] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "考核方案" [ref=e121] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "课程信息" [ref=e125] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "数据面板" [ref=e129] [cursor=pointer]:
              - /url: "#navigation-v042"
            - separator [ref=e133]
            - link "使用的班级 200" [ref=e134] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e137]:
                - generic [ref=e138]: 使用的班级
                - generic [ref=e139]: "200"
            - link "关联的 AI 课 2" [ref=e140] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e143]:
                - generic [ref=e144]: 关联的 AI 课
                - generic [ref=e145]: "2"
            - link "成员 12" [ref=e146] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e149]:
                - generic [ref=e150]: 成员
                - generic [ref=e151]: "12"
          - button "课程建设记录" [ref=e152] [cursor=pointer]
        - separator "调整课程导航宽度" [ref=e155]
        - generic [ref=e159]:
          - generic "分区导航" [ref=e161]:
            - generic [ref=e162]:
              - tablist "课程内容范围" [ref=e165]:
                - tab "公共资源包" [selected] [ref=e166] [cursor=pointer]:
                  - generic [ref=e170]:
                    - generic [ref=e171]: 公共内容 · 班级共用
                    - generic [ref=e172]: 公共资源包
                - tab "2026 秋 · 高等数学 1 班" [ref=e174] [cursor=pointer]:
                  - generic [ref=e178]:
                    - generic [ref=e179]: 教学班 · 2026 秋季学期
                    - generic [ref=e180]: 2026 秋 · 高等数学 1 班
                - tab "2026 秋 · 创新实验班" [ref=e182] [cursor=pointer]:
                  - generic [ref=e186]:
                    - generic [ref=e187]: 教学班 · 2026 秋季学期
                    - generic [ref=e188]: 2026 秋 · 创新实验班
              - button "更多班级" [ref=e191] [cursor=pointer]:
                - generic [ref=e193]: "198"
          - tabpanel "公共资源包" [ref=e197]:
            - generic [ref=e198]:
              - generic [ref=e199]:
                - navigation "面包屑" [ref=e201]:
                  - list [ref=e202]:
                    - listitem [ref=e203]:
                      - generic [ref=e204]: 课程内容
                    - listitem [ref=e205]:
                      - generic [ref=e206]: /
                      - generic [ref=e207]: 公共资源包
                - generic [ref=e208]:
                  - generic [ref=e209]:
                    - heading "知识点总览" [level=3] [ref=e210]
                    - paragraph [ref=e211]: 以知识点组织公共资源，在班级中安排教学。
                  - button "预览学生端" [active] [ref=e213] [cursor=pointer]
              - generic [ref=e217]:
                - generic [ref=e218]:
                  - generic "已保存内容统计" [ref=e219]:
                    - generic [ref=e220]: 7 级结构
                    - generic [ref=e221]: 16 个内容节点
                    - generic [ref=e222]: 36 个学习单元
                  - radiogroup "内容类型" [ref=e224]:
                    - generic [ref=e226]:
                      - generic [ref=e227] [cursor=pointer]:
                        - radio "全部" [checked] [ref=e228]
                        - generic [ref=e229]: 全部
                      - generic [ref=e230] [cursor=pointer]:
                        - radio "作业" [ref=e231]
                        - generic [ref=e232]: 作业
                      - generic [ref=e233] [cursor=pointer]:
                        - radio "考试" [ref=e234]
                        - generic [ref=e235]: 考试
                - generic [ref=e236]:
                  - generic [ref=e237]:
                    - generic [ref=e238]: 编辑后请保存
                    - button "内容编辑说明" [ref=e239] [cursor=pointer]
                  - generic [ref=e242]:
                    - generic [ref=e243]:
                      - button "退出编辑" [ref=e244] [cursor=pointer]
                      - button "添加根节点" [ref=e246] [cursor=pointer]
                      - button "保存草稿" [ref=e248] [cursor=pointer]
                    - tree "课程内容编辑树" [ref=e250]:
                      - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e251]:
                        - generic [ref=e252]:
                          - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e253] [cursor=pointer]
                          - button "移动第一章 · 函数、极限与连续" [ref=e255] [cursor=pointer]
                          - generic "第一章 · 函数、极限与连续" [ref=e260]
                          - generic [ref=e262]:
                            - generic [ref=e263]: 20 个学习单元
                            - generic [ref=e264]: 09-24 更新
                      - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e265]:
                        - generic [ref=e266]:
                          - button "收起1.1 函数的基本概念" [expanded] [ref=e267] [cursor=pointer]
                          - button "移动1.1 函数的基本概念" [ref=e269] [cursor=pointer]
                          - generic "1.1 函数的基本概念" [ref=e274]
                          - generic [ref=e276]:
                            - generic [ref=e277]: 6 个学习单元
                            - generic [ref=e278]: 09-24 更新
                      - treeitem "函数的定义与表示" [level=3] [ref=e279]:
                        - generic [ref=e280]:
                          - button "移动函数的定义与表示" [ref=e281] [cursor=pointer]
                          - generic [ref=e283]: 讲义
                          - generic "函数的定义与表示" [ref=e290]
                          - generic [ref=e292]:
                            - generic [ref=e293]: 已发布
                            - generic [ref=e294]: 09-24 更新
                      - treeitem "函数的性质" [level=3] [ref=e295]:
                        - generic [ref=e296]:
                          - button "移动函数的性质" [ref=e297] [cursor=pointer]
                          - generic [ref=e299]: 视频
                          - generic "函数的性质" [ref=e306]
                          - generic [ref=e308]:
                            - generic [ref=e309]: 已发布
                            - generic [ref=e310]: 09-24 更新
                      - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e311]:
                        - generic [ref=e312]:
                          - button "收起1.2 极限与连续" [expanded] [ref=e313] [cursor=pointer]
                          - button "移动1.2 极限与连续" [ref=e315] [cursor=pointer]
                          - generic "1.2 极限与连续" [ref=e320]
                          - generic [ref=e322]:
                            - generic [ref=e323]: 8 个学习单元
                            - generic [ref=e324]: 09-24 更新
                      - treeitem "数列极限" [expanded] [level=3] [ref=e325]:
                        - generic [ref=e326]:
                          - button "收起数列极限" [expanded] [ref=e327] [cursor=pointer]
                          - button "移动数列极限" [ref=e329] [cursor=pointer]
                          - generic "数列极限" [ref=e334]
                          - generic [ref=e336]:
                            - generic [ref=e337]: 3 个学习单元
                            - generic [ref=e338]: 09-24 更新
                      - treeitem "极限的定义" [level=4] [ref=e339]:
                        - generic [ref=e340]:
                          - button "移动极限的定义" [ref=e341] [cursor=pointer]
                          - generic [ref=e343]: 讲义
                          - generic "极限的定义" [ref=e350]
                          - generic [ref=e352]:
                            - generic [ref=e353]: 已发布
                            - generic [ref=e354]: 09-24 更新
                      - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e355]:
                        - generic [ref=e356]:
                          - button "收起收敛性与极限运算" [expanded] [ref=e357] [cursor=pointer]
                          - button "移动收敛性与极限运算" [ref=e359] [cursor=pointer]
                          - generic "收敛性与极限运算" [ref=e364]
                          - generic [ref=e366]:
                            - generic [ref=e367]: 2 个学习单元
                            - generic [ref=e368]: 09-24 更新
                      - treeitem "两个重要极限" [expanded] [level=5] [ref=e369]:
                        - generic [ref=e370]:
                          - button "收起两个重要极限" [expanded] [ref=e371] [cursor=pointer]
                          - button "移动两个重要极限" [ref=e373] [cursor=pointer]
                          - generic "两个重要极限" [ref=e378]
                          - generic [ref=e380]:
                            - generic [ref=e381]: 2 个学习单元
                            - generic [ref=e382]: 09-24 更新
                      - treeitem "常见题型与方法" [expanded] [level=6] [ref=e383]:
                        - generic [ref=e384]:
                          - button "收起常见题型与方法" [expanded] [ref=e385] [cursor=pointer]
                          - button "移动常见题型与方法" [ref=e387] [cursor=pointer]
                          - generic "常见题型与方法" [ref=e392]
                          - generic [ref=e394]:
                            - generic [ref=e395]: 2 个学习单元
                            - generic [ref=e396]: 09-24 更新
                      - treeitem "例题与拓展练习" [level=7] [ref=e397]:
                        - generic [ref=e398]:
                          - button "移动例题与拓展练习" [ref=e399] [cursor=pointer]
                          - generic [ref=e401]: 作业
                          - generic "例题与拓展练习" [ref=e408]
                          - generic [ref=e410]:
                            - generic [ref=e411]: 已发布
                            - generic [ref=e412]: 09-24 更新
                      - treeitem "函数的连续性" [level=3] [ref=e413]:
                        - generic [ref=e414]:
                          - button "移动函数的连续性" [ref=e415] [cursor=pointer]
                          - generic [ref=e417]: 讲义
                          - generic "函数的连续性" [ref=e424]
                          - generic [ref=e426]:
                            - generic [ref=e427]: 已发布
                            - generic [ref=e428]: 09-24 更新
                      - treeitem "1.3 习题与应用" [level=2] [ref=e429]:
                        - generic [ref=e430]:
                          - button "移动1.3 习题与应用" [ref=e431] [cursor=pointer]
                          - generic [ref=e433]: 作业
                          - generic "1.3 习题与应用" [ref=e440]
                          - generic [ref=e442]:
                            - generic [ref=e443]: 已发布
                            - generic [ref=e444]: 09-24 更新
                      - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e445]:
                        - generic [ref=e446]:
                          - button "收起第二章 · 导数与微分" [expanded] [ref=e447] [cursor=pointer]
                          - button "移动第二章 · 导数与微分" [ref=e449] [cursor=pointer]
                          - generic "第二章 · 导数与微分" [ref=e454]
                          - generic [ref=e456]:
                            - generic [ref=e457]: 16 个学习单元
                            - generic [ref=e458]: 09-24 更新
                      - treeitem "2.1 导数的概念" [level=2] [ref=e459]:
                        - generic [ref=e460]:
                          - button "移动2.1 导数的概念" [ref=e461] [cursor=pointer]
                          - generic [ref=e463]: 讲义
                          - generic "2.1 导数的概念" [ref=e470]
                          - generic [ref=e472]:
                            - generic [ref=e473]: 已发布
                            - generic [ref=e474]: 09-24 更新
                      - treeitem "2.2 导数的应用" [level=2] [ref=e475]:
                        - generic [ref=e476]:
                          - button "移动2.2 导数的应用" [ref=e477] [cursor=pointer]
                          - generic [ref=e479]: 考试
                          - generic "2.2 导数的应用" [ref=e486]
                          - generic [ref=e488]:
                            - generic [ref=e489]: 已发布
                            - generic [ref=e490]: 09-24 更新
                      - generic [ref=e491]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                      - status [ref=e492]
              - generic [ref=e493]:
                - generic [ref=e494]: 公共资源的内容可供关联班级复用。
                - generic [ref=e495]: 模拟数据 · 未执行发布
    - status [ref=e496]:
      - text: 预览学生端：本地演示，未连接真实服务。
      - button "关闭提示" [ref=e497] [cursor=pointer]
  - generic [ref=e499]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | 
  3  | for(const width of [1200,1440,1600]) test(`R2 ${width} hierarchy keeps component paint, geometry, and existing actions`,async({page})=>{
  4  |   const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  5  |   await page.goto('/?sample=R2#navigation-v042');
  6  |   await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  7  |   const root=page.locator('.nv42-r2').first(),focus=root.getByRole('button',{name:'专注内容',exact:true}),preview=root.getByRole('button',{name:'预览学生端',exact:true}),pin=root.locator('.nv42-context-head .nv42-icon').first();
  8  |   await expect(root).toBeVisible();
  9  |   const token=async(name:string)=>{expect(await root.evaluate((el,name)=>getComputedStyle(el).getPropertyValue(name).trim(),name),`${name} must be an existing Token`).not.toBe('');return root.evaluate((el,name)=>{const probe=document.createElement('span');probe.style.cssText=`position:fixed;left:-10000px;width:0;height:0;pointer-events:none;color:var(${name})`;el.append(probe);const result=getComputedStyle(probe).color;probe.remove();return result;},name);};
  10 |   const paint=async(locator:typeof focus)=>locator.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect(),lead=el.querySelector('[data-slot="leading-icon"]');return {variant:el.getAttribute('data-variant'),color:s.color,bg:s.backgroundColor,border:s.borderTopColor,radius:s.borderRadius,w:r.width,h:r.height,lead:lead?{w:lead.getBoundingClientRect().width,h:lead.getBoundingClientRect().height,color:getComputedStyle(lead).color}:null,label:el.querySelector('[data-slot="label"]')?getComputedStyle(el.querySelector('[data-slot="label"]')!).color:null};});
  11 |   expect(await paint(focus)).toEqual({variant:'tertiary',color:await token('--rain-button-tertiary-text'),bg:'rgba(0, 0, 0, 0)',border:await token('--rain-button-tertiary-border'),radius:'6px',w:93,h:32,lead:{w:16,h:16,color:await token('--rain-button-neutral-icon')},label:await token('--rain-button-tertiary-text')});
  12 |   expect(await paint(preview)).toEqual({variant:'text',color:await token('--rain-button-text-default-color'),bg:'rgba(0, 0, 0, 0)',border:'rgba(0, 0, 0, 0)',radius:'6px',w:103,h:32,lead:{w:16,h:16,color:await token('--rain-button-neutral-icon')},label:await token('--rain-button-text-default-color')});
  13 |   expect(await pin.evaluate(el=>{const r=el.getBoundingClientRect(),i=el.querySelector('[data-slot="icon"]')!.getBoundingClientRect();return{w:r.width,h:r.height,iw:i.width,ih:i.height,radius:getComputedStyle(el).borderRadius,color:getComputedStyle(el).color};})).toEqual({w:28,h:28,iw:14,ih:14,radius:'6px',color:await token('--rain-category-icon-neutral-4')});
  14 |   const hoverIcon=await token('--rain-category-icon-neutral-2');await pin.hover();await expect.poll(()=>pin.evaluate(el=>getComputedStyle(el).color)).toBe(hoverIcon);
  15 |   const hoverBackground=await token('--rain-button-tertiary-hover-bg');await focus.hover();await expect.poll(()=>focus.evaluate(el=>getComputedStyle(el).backgroundColor)).toBe(hoverBackground);
  16 |   await page.mouse.move(1700,1050);await focus.focus();expect(await focus.evaluate(el=>getComputedStyle(el).outlineWidth)).toBe('2px');
  17 |   await focus.click();await expect(root.getByRole('button',{name:'退出专注',exact:true})).toBeVisible();await root.getByRole('button',{name:'退出专注',exact:true}).click();
> 18 |   await preview.click();await expect(root.getByRole('status')).toContainText('预览学生端：本地演示');await root.getByRole('button',{name:'关闭提示',exact:true}).click();await expect(root.getByRole('status')).toHaveCount(0);
     |                                                                ^ Error: expect(locator).toContainText(expected) failed
  19 |   await root.getByRole('button',{name:'隐藏课程导航',exact:true}).last().click();await expect(root.locator('.nv42-context')).not.toBeVisible();await root.getByRole('button',{name:'恢复课程导航',exact:true}).click();await expect(root.locator('.nv42-context')).toBeVisible();
  20 |   await root.locator('.nv42-term').click();await expect(page.getByRole('menuitem',{name:'2026 秋季学期',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(root.locator('.nv42-term')).toBeFocused();
  21 |   await expect(root.getByRole('button',{name:'退出编辑',exact:true})).toBeVisible();await expect(root.getByRole('button',{name:'保存草稿',exact:true})).toHaveAttribute('data-variant','primary');
  22 |   expect(await root.locator('.rain-tree-node [data-slot="title"]').first().evaluate(el=>getComputedStyle(el).fontWeight)).toBe('400');
  23 |   expect(await root.locator('table').count()).toBe(0);expect(errors).toEqual([]);
  24 | });
  25 | 
```