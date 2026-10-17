# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: r2-hierarchy.spec.ts >> R2 1600 hierarchy keeps component paint, geometry, and existing actions
- Location: evidence/runtime/navigation-v042/w5/review-10-visual-hierarchy/r2/r2-hierarchy.spec.ts:3:38

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

@@ -1,11 +1,11 @@
  Object {
    "bg": "rgba(0, 0, 0, 0)",
    "border": "rgba(0, 0, 0, 0)",
-   "color": "rgb(64, 77, 98)",
+   "color": "rgb(73, 93, 135)",
    "h": 32,
-   "label": "rgb(64, 77, 98)",
+   "label": "rgb(73, 93, 135)",
    "lead": Object {
      "color": "rgb(73, 93, 135)",
      "h": 16,
      "w": 16,
    },
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
                - tab "2026 秋 · 高等数学 3 班" [ref=e190] [cursor=pointer]:
                  - generic [ref=e194]:
                    - generic [ref=e195]: 教学班 · 2026 秋季学期
                    - generic [ref=e196]: 2026 秋 · 高等数学 3 班
              - button "更多班级" [ref=e199] [cursor=pointer]:
                - generic [ref=e201]: "197"
          - tabpanel "公共资源包" [ref=e205]:
            - generic [ref=e206]:
              - generic [ref=e207]:
                - navigation "面包屑" [ref=e209]:
                  - list [ref=e210]:
                    - listitem [ref=e211]:
                      - generic [ref=e212]: 课程内容
                    - listitem [ref=e213]:
                      - generic [ref=e214]: /
                      - generic [ref=e215]: 公共资源包
                - generic [ref=e216]:
                  - generic [ref=e217]:
                    - heading "知识点总览" [level=3] [ref=e218]
                    - paragraph [ref=e219]: 以知识点组织公共资源，在班级中安排教学。
                  - button "预览学生端" [ref=e221] [cursor=pointer]
              - generic [ref=e225]:
                - generic [ref=e226]:
                  - generic "已保存内容统计" [ref=e227]:
                    - generic [ref=e228]: 7 级结构
                    - generic [ref=e229]: 16 个内容节点
                    - generic [ref=e230]: 36 个学习单元
                  - radiogroup "内容类型" [ref=e232]:
                    - generic [ref=e234]:
                      - generic [ref=e235] [cursor=pointer]:
                        - radio "全部" [checked] [ref=e236]
                        - generic [ref=e237]: 全部
                      - generic [ref=e238] [cursor=pointer]:
                        - radio "作业" [ref=e239]
                        - generic [ref=e240]: 作业
                      - generic [ref=e241] [cursor=pointer]:
                        - radio "考试" [ref=e242]
                        - generic [ref=e243]: 考试
                - generic [ref=e244]:
                  - generic [ref=e245]:
                    - generic [ref=e246]: 编辑后请保存
                    - button "内容编辑说明" [ref=e247] [cursor=pointer]
                  - generic [ref=e250]:
                    - generic [ref=e251]:
                      - button "退出编辑" [ref=e252] [cursor=pointer]
                      - button "添加根节点" [ref=e254] [cursor=pointer]
                      - button "保存草稿" [ref=e256] [cursor=pointer]
                    - tree "课程内容编辑树" [ref=e258]:
                      - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e259]:
                        - generic [ref=e260]:
                          - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e261] [cursor=pointer]
                          - button "移动第一章 · 函数、极限与连续" [ref=e263] [cursor=pointer]
                          - generic "第一章 · 函数、极限与连续" [ref=e268]
                          - generic [ref=e270]:
                            - generic [ref=e271]: 20 个学习单元
                            - generic [ref=e272]: 09-24 更新
                      - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e273]:
                        - generic [ref=e274]:
                          - button "收起1.1 函数的基本概念" [expanded] [ref=e275] [cursor=pointer]
                          - button "移动1.1 函数的基本概念" [ref=e277] [cursor=pointer]
                          - generic "1.1 函数的基本概念" [ref=e282]
                          - generic [ref=e284]:
                            - generic [ref=e285]: 6 个学习单元
                            - generic [ref=e286]: 09-24 更新
                      - treeitem "函数的定义与表示" [level=3] [ref=e287]:
                        - generic [ref=e288]:
                          - button "移动函数的定义与表示" [ref=e289] [cursor=pointer]
                          - generic [ref=e291]: 讲义
                          - generic "函数的定义与表示" [ref=e298]
                          - generic [ref=e300]:
                            - generic [ref=e301]: 已发布
                            - generic [ref=e302]: 09-24 更新
                      - treeitem "函数的性质" [level=3] [ref=e303]:
                        - generic [ref=e304]:
                          - button "移动函数的性质" [ref=e305] [cursor=pointer]
                          - generic [ref=e307]: 视频
                          - generic "函数的性质" [ref=e314]
                          - generic [ref=e316]:
                            - generic [ref=e317]: 已发布
                            - generic [ref=e318]: 09-24 更新
                      - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e319]:
                        - generic [ref=e320]:
                          - button "收起1.2 极限与连续" [expanded] [ref=e321] [cursor=pointer]
                          - button "移动1.2 极限与连续" [ref=e323] [cursor=pointer]
                          - generic "1.2 极限与连续" [ref=e328]
                          - generic [ref=e330]:
                            - generic [ref=e331]: 8 个学习单元
                            - generic [ref=e332]: 09-24 更新
                      - treeitem "数列极限" [expanded] [level=3] [ref=e333]:
                        - generic [ref=e334]:
                          - button "收起数列极限" [expanded] [ref=e335] [cursor=pointer]
                          - button "移动数列极限" [ref=e337] [cursor=pointer]
                          - generic "数列极限" [ref=e342]
                          - generic [ref=e344]:
                            - generic [ref=e345]: 3 个学习单元
                            - generic [ref=e346]: 09-24 更新
                      - treeitem "极限的定义" [level=4] [ref=e347]:
                        - generic [ref=e348]:
                          - button "移动极限的定义" [ref=e349] [cursor=pointer]
                          - generic [ref=e351]: 讲义
                          - generic "极限的定义" [ref=e358]
                          - generic [ref=e360]:
                            - generic [ref=e361]: 已发布
                            - generic [ref=e362]: 09-24 更新
                      - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e363]:
                        - generic [ref=e364]:
                          - button "收起收敛性与极限运算" [expanded] [ref=e365] [cursor=pointer]
                          - button "移动收敛性与极限运算" [ref=e367] [cursor=pointer]
                          - generic "收敛性与极限运算" [ref=e372]
                          - generic [ref=e374]:
                            - generic [ref=e375]: 2 个学习单元
                            - generic [ref=e376]: 09-24 更新
                      - treeitem "两个重要极限" [expanded] [level=5] [ref=e377]:
                        - generic [ref=e378]:
                          - button "收起两个重要极限" [expanded] [ref=e379] [cursor=pointer]
                          - button "移动两个重要极限" [ref=e381] [cursor=pointer]
                          - generic "两个重要极限" [ref=e386]
                          - generic [ref=e388]:
                            - generic [ref=e389]: 2 个学习单元
                            - generic [ref=e390]: 09-24 更新
                      - treeitem "常见题型与方法" [expanded] [level=6] [ref=e391]:
                        - generic [ref=e392]:
                          - button "收起常见题型与方法" [expanded] [ref=e393] [cursor=pointer]
                          - button "移动常见题型与方法" [ref=e395] [cursor=pointer]
                          - generic "常见题型与方法" [ref=e400]
                          - generic [ref=e402]:
                            - generic [ref=e403]: 2 个学习单元
                            - generic [ref=e404]: 09-24 更新
                      - treeitem "例题与拓展练习" [level=7] [ref=e405]:
                        - generic [ref=e406]:
                          - button "移动例题与拓展练习" [ref=e407] [cursor=pointer]
                          - generic [ref=e409]: 作业
                          - generic "例题与拓展练习" [ref=e416]
                          - generic [ref=e418]:
                            - generic [ref=e419]: 已发布
                            - generic [ref=e420]: 09-24 更新
                      - treeitem "函数的连续性" [level=3] [ref=e421]:
                        - generic [ref=e422]:
                          - button "移动函数的连续性" [ref=e423] [cursor=pointer]
                          - generic [ref=e425]: 讲义
                          - generic "函数的连续性" [ref=e432]
                          - generic [ref=e434]:
                            - generic [ref=e435]: 已发布
                            - generic [ref=e436]: 09-24 更新
                      - treeitem "1.3 习题与应用" [level=2] [ref=e437]:
                        - generic [ref=e438]:
                          - button "移动1.3 习题与应用" [ref=e439] [cursor=pointer]
                          - generic [ref=e441]: 作业
                          - generic "1.3 习题与应用" [ref=e448]
                          - generic [ref=e450]:
                            - generic [ref=e451]: 已发布
                            - generic [ref=e452]: 09-24 更新
                      - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e453]:
                        - generic [ref=e454]:
                          - button "收起第二章 · 导数与微分" [expanded] [ref=e455] [cursor=pointer]
                          - button "移动第二章 · 导数与微分" [ref=e457] [cursor=pointer]
                          - generic "第二章 · 导数与微分" [ref=e462]
                          - generic [ref=e464]:
                            - generic [ref=e465]: 16 个学习单元
                            - generic [ref=e466]: 09-24 更新
                      - treeitem "2.1 导数的概念" [level=2] [ref=e467]:
                        - generic [ref=e468]:
                          - button "移动2.1 导数的概念" [ref=e469] [cursor=pointer]
                          - generic [ref=e471]: 讲义
                          - generic "2.1 导数的概念" [ref=e478]
                          - generic [ref=e480]:
                            - generic [ref=e481]: 已发布
                            - generic [ref=e482]: 09-24 更新
                      - treeitem "2.2 导数的应用" [level=2] [ref=e483]:
                        - generic [ref=e484]:
                          - button "移动2.2 导数的应用" [ref=e485] [cursor=pointer]
                          - generic [ref=e487]: 考试
                          - generic "2.2 导数的应用" [ref=e494]
                          - generic [ref=e496]:
                            - generic [ref=e497]: 已发布
                            - generic [ref=e498]: 09-24 更新
                      - generic [ref=e499]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                      - status [ref=e500]
              - generic [ref=e501]:
                - generic [ref=e502]: 公共资源的内容可供关联班级复用。
                - generic [ref=e503]: 模拟数据 · 未执行发布
  - generic [ref=e504]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
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
  9  |   const token=async(name:string)=>root.evaluate((el,name)=>{const probe=document.createElement('span');probe.style.color=`var(${name})`;el.append(probe);const result=getComputedStyle(probe).color;probe.remove();return result;},name);
  10 |   const paint=async(locator:typeof focus)=>locator.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect(),lead=el.querySelector('[data-slot="leading-icon"]');return {variant:el.getAttribute('data-variant'),color:s.color,bg:s.backgroundColor,border:s.borderTopColor,radius:s.borderRadius,w:r.width,h:r.height,lead:lead?{w:lead.getBoundingClientRect().width,h:lead.getBoundingClientRect().height,color:getComputedStyle(lead).color}:null,label:el.querySelector('[data-slot="label"]')?getComputedStyle(el.querySelector('[data-slot="label"]')!).color:null};});
  11 |   expect(await paint(focus)).toEqual({variant:'tertiary',color:await token('--rain-button-tertiary-text'),bg:'rgba(0, 0, 0, 0)',border:await token('--rain-button-tertiary-border'),radius:'6px',w:93,h:32,lead:{w:16,h:16,color:await token('--rain-button-neutral-icon')},label:await token('--rain-button-tertiary-text')});
> 12 |   expect(await paint(preview)).toEqual({variant:'text',color:await token('--rain-button-text-default'),bg:'rgba(0, 0, 0, 0)',border:'rgba(0, 0, 0, 0)',radius:'6px',w:103,h:32,lead:{w:16,h:16,color:await token('--rain-button-neutral-icon')},label:await token('--rain-button-text-default')});
     |                                ^ Error: expect(received).toEqual(expected) // deep equality
  13 |   expect(await pin.evaluate(el=>{const r=el.getBoundingClientRect(),i=el.querySelector('[data-slot="icon"]')!.getBoundingClientRect();return{w:r.width,h:r.height,iw:i.width,ih:i.height,radius:getComputedStyle(el).borderRadius,color:getComputedStyle(el).color};})).toEqual({w:28,h:28,iw:14,ih:14,radius:'6px',color:await token('--rain-category-icon-neutral-4')});
  14 |   await pin.hover();expect(await pin.evaluate(el=>getComputedStyle(el).color)).toBe(await token('--rain-category-icon-neutral-2'));
  15 |   await focus.hover();expect(await focus.evaluate(el=>getComputedStyle(el).backgroundColor)).toBe(await token('--rain-button-tertiary-hover-bg'));
  16 |   await page.mouse.move(1700,1050);await focus.focus();expect(await focus.evaluate(el=>getComputedStyle(el).outlineWidth)).toBe('2px');
  17 |   await focus.click();await expect(root.getByRole('button',{name:'退出专注',exact:true})).toBeVisible();await root.getByRole('button',{name:'退出专注',exact:true}).click();
  18 |   await preview.click();await expect(root.getByRole('status')).toContainText('预览学生端：本地演示');await root.getByRole('button',{name:'关闭提示',exact:true}).click();await expect(root.getByRole('status')).toHaveCount(0);
  19 |   await root.getByRole('button',{name:'隐藏课程导航',exact:true}).last().click();await expect(root.locator('.nv42-context')).not.toBeVisible();await root.getByRole('button',{name:'恢复课程导航',exact:true}).click();await expect(root.locator('.nv42-context')).toBeVisible();
  20 |   await root.locator('.nv42-term').click();await expect(page.getByRole('menuitemcheckbox',{name:'2026 秋季学期',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(root.locator('.nv42-term')).toBeFocused();
  21 |   await expect(root.getByRole('button',{name:'退出编辑',exact:true})).toBeVisible();await expect(root.getByRole('button',{name:'保存',exact:true})).toHaveAttribute('data-variant','primary');
  22 |   expect(await root.locator('.rain-tree-node [data-slot="title"]').first().evaluate(el=>getComputedStyle(el).fontWeight)).toBe('400');
  23 |   expect(await root.locator('table').count()).toBe(0);expect(errors).toEqual([]);
  24 | });
  25 | 
```