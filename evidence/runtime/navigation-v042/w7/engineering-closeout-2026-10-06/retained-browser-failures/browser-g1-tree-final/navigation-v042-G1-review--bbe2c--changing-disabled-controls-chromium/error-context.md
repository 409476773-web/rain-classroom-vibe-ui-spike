# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042.spec.ts >> G1 review-02 interactive controls expose hover without changing disabled controls
- Location: tests/e2e/navigation-v042.spec.ts:280:1

# Error details

```
Error: R2 .nv42-account

expect(received).not.toEqual(expected) // deep equality

Expected: not {"background": "rgba(0, 0, 0, 0)", "before": "rgba(0, 0, 0, 0)", "border": "rgb(58, 72, 101)", "color": "rgb(58, 72, 101)", "descendants": [{"background": "rgba(0, 0, 0, 0)", "clipPath": "none", "color": "rgb(58, 72, 101)", "opacity": "1", "outline": "rgb(58, 72, 101) none 3px", "part": "root"}, {"background": "rgba(0, 0, 0, 0)", "clipPath": "none", "color": "rgb(58, 72, 101)", "opacity": "1", "outline": "rgb(58, 72, 101) none 3px", "part": "rain-avatar__picture"}, {"background": "rgba(0, 0, 0, 0)", "clipPath": "none", "color": "rgb(58, 72, 101)", "opacity": "1", "outline": "rgb(58, 72, 101) none 3px", "part": "fallback"}, {"background": "rgba(0, 0, 0, 0)", "clipPath": "none", "color": "rgb(58, 72, 101)", "opacity": "1", "outline": "rgb(58, 72, 101) none 3px", "part": ""}, {"background": "rgba(0, 0, 0, 0)", "clipPath": "none", "color": "rgb(160, 172, 197)", "opacity": "1", "outline": "rgb(160, 172, 197) none 3px", "part": ""}], "label": null, "shadow": "none"}

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
    - paragraph [ref=e9]: W3–W5 人工视觉已通过 含 R3 补充调整
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
      - button "R2" [active] [ref=e21]
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
    - generic [ref=e40]: 轻品牌
    - generic "未勾选时使用轻品牌外框" [ref=e41]:
      - checkbox "深色外框" [ref=e42]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e43] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R2
  - generic [ref=e48]:
    - generic [ref=e49]:
      - button "展开平台导航" [ref=e50] [cursor=pointer]
      - button "隐藏课程导航" [expanded] [ref=e52] [cursor=pointer]
      - generic [ref=e54]:
        - strong [ref=e55]: 高等数学 A · 课程内容
        - generic [ref=e56]: 公共资源包
      - button "布局" [ref=e57] [cursor=pointer]
      - button "专注内容" [ref=e59] [cursor=pointer]
    - generic [ref=e63]:
      - generic "平台导航" [ref=e65]:
        - navigation "平台导航" [ref=e66]:
          - button "展开平台导航" [ref=e68] [cursor=pointer]
          - generic [ref=e73]:
            - link "工作台" [ref=e74] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "课程" [ref=e77] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "资源" [ref=e80] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "专业" [ref=e83] [cursor=pointer]:
              - /url: "#navigation-v042"
          - generic [ref=e86]:
            - button "当前账户：林老师" [ref=e87] [cursor=pointer]
            - generic [ref=e90]:
              - button "通知" [ref=e91] [cursor=pointer]
              - button "帮助" [ref=e94] [cursor=pointer]
      - generic [ref=e97]:
        - generic "课程导航" [ref=e99]:
          - generic [ref=e100]:
            - strong [ref=e101]: 课程导航
            - button "取消固定，改为临时课程导航" [ref=e102] [cursor=pointer]
            - button "隐藏课程导航" [ref=e105] [cursor=pointer]
          - generic [ref=e108]:
            - button "返回我的课程" [ref=e109] [cursor=pointer]
            - generic [ref=e111]:
              - text: MATHEMATICS / 2026
              - strong [ref=e112]: 高等数学 A
              - generic [ref=e113]: ∫
            - heading "高等数学 A" [level=4] [ref=e114]
            - button "2026 秋季学期" [ref=e115] [cursor=pointer]
          - generic [ref=e117]: 教学空间
          - navigation "课程导航" [ref=e118]:
            - link "课程内容" [ref=e119] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "考核方案" [ref=e123] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "课程信息" [ref=e127] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "数据面板" [ref=e131] [cursor=pointer]:
              - /url: "#navigation-v042"
            - separator [ref=e135]
            - link "使用的班级 200" [ref=e136] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e139]:
                - generic [ref=e140]: 使用的班级
                - generic [ref=e141]: "200"
            - link "关联的 AI 课 2" [ref=e142] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e145]:
                - generic [ref=e146]: 关联的 AI 课
                - generic [ref=e147]: "2"
            - link "成员 12" [ref=e148] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e151]:
                - generic [ref=e152]: 成员
                - generic [ref=e153]: "12"
          - button "课程建设记录" [ref=e154] [cursor=pointer]
        - separator "调整课程导航宽度" [ref=e157]
        - generic [ref=e161]:
          - generic "分区导航" [ref=e163]:
            - generic [ref=e164]:
              - tablist "课程内容范围" [ref=e167]:
                - tab "公共资源包" [selected] [ref=e168] [cursor=pointer]:
                  - generic [ref=e172]:
                    - generic [ref=e173]: 公共内容 · 班级共用
                    - generic [ref=e174]: 公共资源包
                - tab "2026 秋 · 高等数学 1 班" [ref=e176] [cursor=pointer]:
                  - generic [ref=e180]:
                    - generic [ref=e181]: 教学班 · 2026 秋季学期
                    - generic [ref=e182]: 2026 秋 · 高等数学 1 班
                - tab "2026 秋 · 创新实验班" [ref=e184] [cursor=pointer]:
                  - generic [ref=e188]:
                    - generic [ref=e189]: 教学班 · 2026 秋季学期
                    - generic [ref=e190]: 2026 秋 · 创新实验班
                - tab "2026 秋 · 高等数学 3 班" [ref=e192] [cursor=pointer]:
                  - generic [ref=e196]:
                    - generic [ref=e197]: 教学班 · 2026 秋季学期
                    - generic [ref=e198]: 2026 秋 · 高等数学 3 班
              - button "更多班级" [ref=e201] [cursor=pointer]:
                - generic [ref=e203]: "197"
          - tabpanel "公共资源包" [ref=e207]:
            - generic [ref=e208]:
              - generic [ref=e209]:
                - navigation "面包屑" [ref=e211]:
                  - list [ref=e212]:
                    - listitem [ref=e213]:
                      - generic [ref=e214]: 课程内容
                    - listitem [ref=e215]:
                      - generic [ref=e216]: /
                      - generic [ref=e217]: 公共资源包
                - generic [ref=e218]:
                  - generic [ref=e219]:
                    - heading "知识点总览" [level=3] [ref=e220]
                    - paragraph [ref=e221]: 以知识点组织公共资源，在班级中安排教学。
                  - button "预览学生端" [ref=e223] [cursor=pointer]
              - generic [ref=e227]:
                - generic [ref=e228]:
                  - generic "已保存内容统计" [ref=e229]:
                    - generic [ref=e230]: 7 级结构
                    - generic [ref=e231]: 16 个内容节点
                    - generic [ref=e232]: 36 个学习单元
                  - radiogroup "内容类型" [ref=e234]:
                    - generic [ref=e236]:
                      - generic [ref=e237] [cursor=pointer]:
                        - radio "全部" [checked] [ref=e238]
                        - generic [ref=e239]: 全部
                      - generic [ref=e240] [cursor=pointer]:
                        - radio "作业" [ref=e241]
                        - generic [ref=e242]: 作业
                      - generic [ref=e243] [cursor=pointer]:
                        - radio "考试" [ref=e244]
                        - generic [ref=e245]: 考试
                - generic [ref=e246]:
                  - generic [ref=e247]:
                    - generic [ref=e248]: 编辑后请保存
                    - button "内容编辑说明" [ref=e249] [cursor=pointer]
                  - generic [ref=e252]:
                    - generic [ref=e253]:
                      - button "退出编辑" [ref=e254] [cursor=pointer]
                      - button "添加根节点" [ref=e256] [cursor=pointer]
                      - button "保存草稿" [ref=e258] [cursor=pointer]
                    - tree "课程内容编辑树" [ref=e260]:
                      - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e261]:
                        - generic [ref=e262]:
                          - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e263] [cursor=pointer]
                          - button "移动第一章 · 函数、极限与连续" [ref=e265] [cursor=pointer]
                          - generic "第一章 · 函数、极限与连续" [ref=e270]
                          - generic [ref=e272]:
                            - generic [ref=e273]: 20 个学习单元
                            - generic [ref=e274]: 09-24 更新
                      - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e275]:
                        - generic [ref=e276]:
                          - button "收起1.1 函数的基本概念" [expanded] [ref=e277] [cursor=pointer]
                          - button "移动1.1 函数的基本概念" [ref=e279] [cursor=pointer]
                          - generic "1.1 函数的基本概念" [ref=e284]
                          - generic [ref=e286]:
                            - generic [ref=e287]: 6 个学习单元
                            - generic [ref=e288]: 09-24 更新
                      - treeitem "函数的定义与表示" [level=3] [ref=e289]:
                        - generic [ref=e290]:
                          - button "移动函数的定义与表示" [ref=e291] [cursor=pointer]
                          - generic [ref=e293]: 讲义
                          - generic "函数的定义与表示" [ref=e300]
                          - generic [ref=e302]:
                            - generic [ref=e303]: 已发布
                            - generic [ref=e304]: 09-24 更新
                      - treeitem "函数的性质" [level=3] [ref=e305]:
                        - generic [ref=e306]:
                          - button "移动函数的性质" [ref=e307] [cursor=pointer]
                          - generic [ref=e309]: 视频
                          - generic "函数的性质" [ref=e316]
                          - generic [ref=e318]:
                            - generic [ref=e319]: 已发布
                            - generic [ref=e320]: 09-24 更新
                      - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e321]:
                        - generic [ref=e322]:
                          - button "收起1.2 极限与连续" [expanded] [ref=e323] [cursor=pointer]
                          - button "移动1.2 极限与连续" [ref=e325] [cursor=pointer]
                          - generic "1.2 极限与连续" [ref=e330]
                          - generic [ref=e332]:
                            - generic [ref=e333]: 8 个学习单元
                            - generic [ref=e334]: 09-24 更新
                      - treeitem "数列极限" [expanded] [level=3] [ref=e335]:
                        - generic [ref=e336]:
                          - button "收起数列极限" [expanded] [ref=e337] [cursor=pointer]
                          - button "移动数列极限" [ref=e339] [cursor=pointer]
                          - generic "数列极限" [ref=e344]
                          - generic [ref=e346]:
                            - generic [ref=e347]: 3 个学习单元
                            - generic [ref=e348]: 09-24 更新
                      - treeitem "极限的定义" [level=4] [ref=e349]:
                        - generic [ref=e350]:
                          - button "移动极限的定义" [ref=e351] [cursor=pointer]
                          - generic [ref=e353]: 讲义
                          - generic "极限的定义" [ref=e360]
                          - generic [ref=e362]:
                            - generic [ref=e363]: 已发布
                            - generic [ref=e364]: 09-24 更新
                      - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e365]:
                        - generic [ref=e366]:
                          - button "收起收敛性与极限运算" [expanded] [ref=e367] [cursor=pointer]
                          - button "移动收敛性与极限运算" [ref=e369] [cursor=pointer]
                          - generic "收敛性与极限运算" [ref=e374]
                          - generic [ref=e376]:
                            - generic [ref=e377]: 2 个学习单元
                            - generic [ref=e378]: 09-24 更新
                      - treeitem "两个重要极限" [expanded] [level=5] [ref=e379]:
                        - generic [ref=e380]:
                          - button "收起两个重要极限" [expanded] [ref=e381] [cursor=pointer]
                          - button "移动两个重要极限" [ref=e383] [cursor=pointer]
                          - generic "两个重要极限" [ref=e388]
                          - generic [ref=e390]:
                            - generic [ref=e391]: 2 个学习单元
                            - generic [ref=e392]: 09-24 更新
                      - treeitem "常见题型与方法" [expanded] [level=6] [ref=e393]:
                        - generic [ref=e394]:
                          - button "收起常见题型与方法" [expanded] [ref=e395] [cursor=pointer]
                          - button "移动常见题型与方法" [ref=e397] [cursor=pointer]
                          - generic "常见题型与方法" [ref=e402]
                          - generic [ref=e404]:
                            - generic [ref=e405]: 2 个学习单元
                            - generic [ref=e406]: 09-24 更新
                      - treeitem "例题与拓展练习" [level=7] [ref=e407]:
                        - generic [ref=e408]:
                          - button "移动例题与拓展练习" [ref=e409] [cursor=pointer]
                          - generic [ref=e411]: 作业
                          - generic "例题与拓展练习" [ref=e418]
                          - generic [ref=e420]:
                            - generic [ref=e421]: 已发布
                            - generic [ref=e422]: 09-24 更新
                      - treeitem "函数的连续性" [level=3] [ref=e423]:
                        - generic [ref=e424]:
                          - button "移动函数的连续性" [ref=e425] [cursor=pointer]
                          - generic [ref=e427]: 讲义
                          - generic "函数的连续性" [ref=e434]
                          - generic [ref=e436]:
                            - generic [ref=e437]: 已发布
                            - generic [ref=e438]: 09-24 更新
                      - treeitem "1.3 习题与应用" [level=2] [ref=e439]:
                        - generic [ref=e440]:
                          - button "移动1.3 习题与应用" [ref=e441] [cursor=pointer]
                          - generic [ref=e443]: 作业
                          - generic "1.3 习题与应用" [ref=e450]
                          - generic [ref=e452]:
                            - generic [ref=e453]: 已发布
                            - generic [ref=e454]: 09-24 更新
                      - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e455]:
                        - generic [ref=e456]:
                          - button "收起第二章 · 导数与微分" [expanded] [ref=e457] [cursor=pointer]
                          - button "移动第二章 · 导数与微分" [ref=e459] [cursor=pointer]
                          - generic "第二章 · 导数与微分" [ref=e464]
                          - generic [ref=e466]:
                            - generic [ref=e467]: 16 个学习单元
                            - generic [ref=e468]: 09-24 更新
                      - treeitem "2.1 导数的概念" [level=2] [ref=e469]:
                        - generic [ref=e470]:
                          - button "移动2.1 导数的概念" [ref=e471] [cursor=pointer]
                          - generic [ref=e473]: 讲义
                          - generic "2.1 导数的概念" [ref=e480]
                          - generic [ref=e482]:
                            - generic [ref=e483]: 已发布
                            - generic [ref=e484]: 09-24 更新
                      - treeitem "2.2 导数的应用" [level=2] [ref=e485]:
                        - generic [ref=e486]:
                          - button "移动2.2 导数的应用" [ref=e487] [cursor=pointer]
                          - generic [ref=e489]: 考试
                          - generic "2.2 导数的应用" [ref=e496]
                          - generic [ref=e498]:
                            - generic [ref=e499]: 已发布
                            - generic [ref=e500]: 09-24 更新
                      - generic [ref=e501]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                      - status [ref=e502]
              - generic [ref=e503]:
                - generic [ref=e504]: 公共资源的内容可供关联班级复用。
                - generic [ref=e505]: 模拟数据 · 未执行发布
  - generic [ref=e506]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  206 |   const draft=page.getByRole('textbox',{name:'教学目标草稿'});
  207 |   const text='独立消费：掌握极限定义，保留正在编辑的教学目标。';
  208 |   await draft.fill(text);
  209 |   const before=await editor.getByRole('tab',{name:'编辑',exact:true}).evaluate(tab=>({height:tab.getBoundingClientRect().height,indicator:getComputedStyle(tab.querySelector('[data-part="indicator"]')!).height,paint:getComputedStyle(tab.querySelector('[data-part="paint"]')!).display}));
  210 |   expect(before).toEqual({height:38,indicator:'3px',paint:'block'});
  211 |   await page.getByRole('button',{name:'更多班级',exact:true}).click();
  212 |   await page.getByRole('textbox',{name:'搜索范围'}).fill('199');
  213 |   await page.getByRole('button',{name:/2026 秋 · 高等数学 199 班/}).click();
  214 |   await expect(draft).toHaveValue(text);
  215 |   await page.getByRole('button',{name:'隐藏课程导航',exact:true}).first().click();
  216 |   await page.getByRole('button',{name:'恢复课程导航',exact:true}).click();
  217 |   await page.getByRole('button',{name:'专注内容',exact:true}).click();
  218 |   await page.getByRole('button',{name:'退出专注',exact:true}).click();
  219 |   await editor.getByRole('tab',{name:'预览',exact:true}).click();
  220 |   await expect(page.getByRole('tabpanel',{name:'预览',exact:true}).getByText(text,{exact:true})).toBeVisible();
  221 |   await editor.getByRole('tab',{name:'编辑',exact:true}).click();
  222 |   await expect(draft).toHaveValue(text);
  223 |   expect(await editor.getByRole('tab',{name:'编辑',exact:true}).evaluate(tab=>({height:tab.getBoundingClientRect().height,indicator:getComputedStyle(tab.querySelector('[data-part="indicator"]')!).height,paint:getComputedStyle(tab.querySelector('[data-part="paint"]')!).display}))).toEqual(before);
  224 | });
  225 | 
  226 | test('G1 review keeps R2 alignment, local tokens and real semester/breadcrumb semantics at both artboard widths', async ({page}) => {
  227 |   await page.goto('/#navigation-v042');
  228 |   const root=page.locator('.nv42-r2'),rail=root.getByRole('navigation',{name:'平台导航',exact:true});
  229 |   await rail.getByRole('button',{name:'展开平台导航',exact:true}).click();
  230 |   for (const width of [1440,1200]) {
  231 |     await page.getByRole('combobox',{name:/画板宽度/}).selectOption(String(width));
  232 |     await page.evaluate(()=>document.fonts.ready);
  233 |     await expect.poll(()=>root.locator('.nv42-brand').evaluate(el=>el.getBoundingClientRect().left-el.parentElement!.getBoundingClientRect().left)).toBe(0);
  234 |     const facts=await root.evaluate(root=>{
  235 |       const el=(s:string)=>root.querySelector<HTMLElement>(s)!;
  236 |       const css=(s:string,p:string)=>getComputedStyle(el(s)).getPropertyValue(p);
  237 |       const rect=(s:string)=>el(s).getBoundingClientRect();
  238 |       const head=rect('.nv42-rail-head'),logo=rect('.nv42-brand'),toggle=rect('.nv42-rail-head button');
  239 |       const contextIcon=rect('.nv42-course-links [data-slot="icon"]'),historyIcon=rect('.nv42-history .rain-icon');
  240 |       return { logoLeft:logo.left-head.left,toggleRight:head.right-toggle.right,
  241 |         iconSize:rect('.nv42-rail-head .rain-icon').width,navIcon:rect('.nv42-rail-links .rain-icon').width,
  242 |         navFont:css('.nv42-rail-links [data-slot="item"]','font-size'),activeWeight:css('.nv42-rail-links [data-active]','font-weight'),activeColor:css('.nv42-rail-links [data-active]','color'),
  243 |         contextHead:css('.nv42-context-head','background-color'),contextTitle:css('.nv42-context-head strong','font-size'),
  244 |         backGap:css('.nv42-back','gap'),backIcon:rect('.nv42-back .rain-icon').width,
  245 |         scopeTitle:css('.rain-navigation__identity .rain-tabs__label','font-size'),description:css('.rain-navigation__description','color'),
  246 |         title:css('.nv42-title-row h3','font-size'),subtitle:css('.nv42-title-row p','color'),subtitleGap:css('.nv42-title-row p','margin-top'),stats:css('.nv42-stats','font-size'),
  247 |         mainTop:css('.nv42-main','padding-top'),shell:css('.nv42-workspace-body','background-color'),track:css('.rain-connected-surface','background-color'),
  248 |         historyIcon:historyIcon.width,historyOffset:historyIcon.left-contextIcon.left,historyFont:css('.nv42-history','font-size'),
  249 |         historyLabelOffset:rect('.nv42-history>span:not(.rain-icon)').left-rect('.nv42-course-links [data-slot="label"]').left,
  250 |         accountBeforeUtilities:rect('.nv42-account').right<=rect('.nv42-utilities').left,
  251 |       };
  252 |     });
  253 |     // Accepted Review11/12 platform contract: regular 14px text and 18px glyphs.
  254 |     expect(facts).toMatchObject({logoLeft:0,toggleRight:0,iconSize:16,navIcon:18,navFont:'14px',activeWeight:'400',activeColor:'rgb(15, 85, 223)',contextHead:'rgba(0, 0, 0, 0)',contextTitle:'15px',backGap:'4px',backIcon:16,scopeTitle:'15px',description:'rgb(160, 172, 197)',title:'17px',subtitle:'rgb(160, 172, 197)',subtitleGap:'2px',stats:'14px',mainTop:'8px',track:'rgb(242, 244, 255)',historyIcon:16,historyOffset:0,historyFont:'14px',historyLabelOffset:0,accountBeforeUtilities:true});
  255 |     for (const name of ['工作台','数据面板']) {
  256 |       const item=root.getByRole('link',{name,exact:true}); await item.hover();
  257 |       await expect.poll(()=>item.evaluate(el=>{
  258 |         const color=getComputedStyle(el).backgroundColor,values=color.match(/[\d.]+/g)!.map(Number);
  259 |         return color.startsWith('color(srgb')?values.map((value,i)=>i<3?Math.round(value*255):value):values;
  260 |       })).toEqual(name==='工作台'?[255,255,255,0.51]:[85,112,244,0.06]);
  261 |     }
  262 |     await expect(root.locator('.nv42-account-copy')).toHaveText('林老师教师工作区');
  263 |     expect(await root.locator('.nv42-account-avatar').evaluate(el=>el.getBoundingClientRect().left-el.parentElement!.getBoundingClientRect().left)).toBe(2);
  264 |   }
  265 |   const term=root.getByRole('button',{name:'2026 秋季学期',exact:true});
  266 |   await expect(term.locator('[data-icon="icon/arrow-down"]')).toHaveCount(1);
  267 |   await term.focus(); await page.keyboard.press('Enter');
  268 |   await expect(term).toHaveAttribute('aria-expanded','true');
  269 |   await expect(term.locator('[data-icon="icon/arrow-up"]')).toHaveCount(1);
  270 |   await expect(page.getByRole('menuitem',{name:'2026 秋季学期',exact:true})).toBeVisible();
  271 |   await page.keyboard.press('Escape'); await expect(term).toBeFocused();
  272 |   await expect(term).toHaveAttribute('aria-expanded','false');
  273 |   await root.getByRole('tab',{name:'2026 秋 · 高等数学 1 班',exact:true}).click();
  274 |   await expect(root.getByRole('navigation',{name:'面包屑'}).locator('[aria-current="page"]')).toHaveText('2026 秋 · 高等数学 1 班');
  275 |   await rail.getByRole('button',{name:'收起平台导航',exact:true}).click();
  276 |   await expect(root.locator('.nv42-account-copy')).toBeHidden();
  277 |   await expect(rail.getByRole('button',{name:'当前账户：林老师'})).toBeVisible();
  278 | });
  279 | 
  280 | test('G1 review-02 interactive controls expose hover without changing disabled controls', async ({page}) => {
  281 |   const { mkdir, writeFile } = await import('node:fs/promises');
  282 |   const phase=process.env.NAV_REVIEW_PHASE==='before'?'before':'after';
  283 |   const evidence=`evidence/runtime/navigation-v042/review-07/regression-02-${phase}`;
  284 |   await mkdir(evidence,{recursive:true});
  285 |   const facts: Record<string,unknown>={};
  286 |   await page.goto('/#navigation-v042');
  287 |   const switcher=page.getByRole('navigation',{name:'导航候选样本'});
  288 |   const paint=async (element: ReturnType<typeof page.locator>)=>element.evaluate(async el=>{
  289 |     await Promise.all(el.getAnimations({subtree:true}).map(animation=>animation.finished));
  290 |     const css=getComputedStyle(el),label=el.querySelector('[data-slot="label"]');
  291 |     const descendants=Array.from(el.querySelectorAll('[data-rain-id="ui-avatar"],.rain-avatar__picture,img,.nv42-account-copy strong,.nv42-account-copy small')).map(node=>{
  292 |       const style=getComputedStyle(node);return{part:node.getAttribute('data-slot')??node.className,background:style.backgroundColor,color:style.color,outline:style.outline,opacity:style.opacity,clipPath:style.clipPath};
  293 |     });
  294 |     return {background:css.backgroundColor,color:css.color,shadow:css.boxShadow,border:css.borderColor,before:getComputedStyle(el,'::before').backgroundColor,label:label?getComputedStyle(label).color:null,descendants};
  295 |   });
  296 |   const hover=async (name:string,element:ReturnType<typeof page.locator>,disabled=false)=>{
  297 |     await page.mouse.move(0,0);
  298 |     const before=await paint(element);
  299 |     await element.hover();
  300 |     expect(await element.evaluate(el=>el.matches(':hover')),`${name} receives the real pointer hover`).toBe(true);
  301 |     const after=await paint(element);
  302 |     facts[name]={before,after,disabled};
  303 |     await writeFile(`${evidence}/hover-facts.json`,JSON.stringify(facts,null,2));
  304 |     if(phase==='after') {
  305 |       if(disabled) expect(after,name).toEqual(before);
> 306 |       else expect(after,name).not.toEqual(before);
      |                                   ^ Error: R2 .nv42-account
  307 |     }
  308 |   };
  309 |   for(const name of ['A1','A4','Connections','R2']) {
  310 |     await switcher.getByRole('button',{name,exact:true}).click();
  311 |     await page.mouse.move(0,0);
  312 |     await page.getByTestId('candidate-canvas').screenshot({path:`${evidence}/${name}.png`});
  313 |     if(name==='A1') {
  314 |       await page.getByRole('link',{name:'教学工作台',exact:true}).click();
  315 |       const selected=page.getByRole('link',{name:'教学工作台',exact:true});
  316 |       facts.a1=await selected.evaluate(el=>{
  317 |         const label=el.querySelector('.rain-tabs__label')!,line=getComputedStyle(label,'::after');
  318 |         return {lineHeight:line.height,lineWidth:line.width,labelHeight:label.getBoundingClientRect().height,tabHeight:el.getBoundingClientRect().height};
  319 |       });
  320 |       await page.getByTestId('candidate-A1').screenshot({path:`${evidence}/A1-selected.png`});
  321 |       await hover('A1 destination',page.getByRole('link',{name:'课程建设',exact:true}));
  322 |       await hover('A1 counted tab',page.getByRole('tab',{name:'学分结构',exact:true}));
  323 |     }
  324 |     if(name==='A4') {
  325 |       const sample=page.getByTestId('candidate-A4');
  326 |       facts.a4=await sample.locator('.nv42-a4-panel').evaluate(el=>{
  327 |         const title=getComputedStyle(el.querySelector('h3')!),description=getComputedStyle(el.querySelector('p')!);
  328 |         return {title:title.fontSize,description:description.color,gap:description.marginTop};
  329 |       });
  330 |       await hover('A4 unselected tab',sample.getByRole('tab').nth(1));
  331 |       await sample.screenshot({path:`${evidence}/A4-hover.png`});
  332 |       await hover('A4 all classes',sample.getByRole('button',{name:'全部班级',exact:true}));
  333 |     }
  334 |     if(name==='Connections') {
  335 |       for(const label of ['向前浏览','向后浏览','定位当前','全部']) await hover(`Connections ${label}`,page.getByRole('button',{name:label,exact:true}),label.includes('浏览'));
  336 |     }
  337 |     if(name==='R2') {
  338 |       const root=page.locator('.nv42-r2');
  339 |       for(const selector of ['.nv42-icon','.nv42-layout-button','.nv42-back','.nv42-term','[data-rain-id="pattern-manage-tree"] [data-slot="toolbar"] button:last-child','.nv42-action:not([data-variant="primary"])','.nv42-filter label:not([data-state="checked"])','.nv42-account','.nv42-history','.rain-scope-navigation__more']) await hover(`R2 ${selector}`,root.locator(selector).first());
  340 |       await root.getByRole('button',{name:'保存草稿',exact:true}).hover();
  341 |       await root.screenshot({path:`${evidence}/R2-primary-hover.png`});
  342 |       await root.getByRole('button',{name:'更多班级',exact:true}).click();
  343 |       await hover('Scope close',page.getByRole('button',{name:'关闭范围选择'}));
  344 |       await page.getByRole('button',{name:'关闭范围选择'}).focus();
  345 |       await hover('Scope search',page.locator('.rain-navigation-scope-popup [data-rain-id="ui-input"]'));
  346 |       await hover('Scope result',page.locator('.rain-scope-navigation__result').nth(1));
  347 |       await page.getByRole('dialog').screenshot({path:`${evidence}/scope-hover.png`});
  348 |       await page.keyboard.press('Escape');
  349 |       if(phase==='after') {
  350 |         await hover('R2 preview action',root.getByRole('button',{name:'预览学生端',exact:true}));
  351 |         await hover('R2 tree row',root.locator('.rain-tree-node:not([data-selected="true"])>.rain-tree-row').first());
  352 |         await root.getByRole('button',{name:'返回我的课程',exact:true}).click();
  353 |         await hover('R2 toast close',root.getByRole('button',{name:'关闭提示',exact:true}));
  354 |         await root.getByRole('button',{name:'关闭提示',exact:true}).click();
  355 |         await root.locator('.rain-tree-node[data-selected="true"]').hover();
  356 |         await root.locator('.rain-tree-node[data-selected="true"] [data-slot="actions"] button').first().click();
  357 |         await page.getByRole('heading',{name:'编辑内容节点',exact:true}).click();
  358 |         await hover('R2 edit input',page.getByRole('dialog',{name:'编辑内容节点'}).locator('[data-rain-id="ui-input"]'));
  359 |         await page.keyboard.press('Escape');
  360 |       }
  361 |     }
  362 |   }
  363 |   await hover('Review sample control',switcher.getByRole('button',{name:'A1',exact:true}));
  364 |   await hover('Review width select',page.getByRole('combobox',{name:/画板宽度/}));
  365 |   await hover('Review reference link',page.getByRole('link',{name:/打开认可原稿/}));
  366 |   if(phase==='after') {
  367 |     await page.setViewportSize({width:1055,height:770});
  368 |     for(const name of ['A1','A4','R2']) {
  369 |       await switcher.getByRole('button',{name,exact:true}).click();
  370 |       await page.mouse.move(0,0);
  371 |       await page.screenshot({path:`${evidence}/${name}-viewport-1055.png`});
  372 |     }
  373 |   }
  374 |   await writeFile(`${evidence}/hover-facts.json`,JSON.stringify(facts,null,2));
  375 |   if(phase==='after') {
  376 |     expect(facts.a1).toMatchObject({lineHeight:'3px',lineWidth:'24px'});
  377 |     expect(facts.a4).toEqual({title:'16px',description:'rgb(160, 172, 197)',gap:'2px'});
  378 |   }
  379 | });
  380 | 
  381 | test('G1 review-03 More reports hidden classes and opens an anchored standard dropdown', async ({page}) => {
  382 |   const {mkdir,writeFile}=await import('node:fs/promises');
  383 |   const phase=process.env.NAV_REVIEW_PHASE==='before'?'before':'after';
  384 |   const dir=`evidence/runtime/navigation-v042/review-07/${phase}`;
  385 |   await mkdir(dir,{recursive:true});
  386 |   await page.goto('/#navigation-v042');
  387 |   const root=page.locator('.nv42-r2'),more=root.getByRole('button',{name:'更多班级',exact:true});
  388 |   await root.screenshot({path:`${dir}/R2.png`});
  389 |   await more.click();
  390 |   const popup=page.getByRole('dialog',{name:'选择课程内容范围'});
  391 |   await page.screenshot({path:`${dir}/dropdown-page.png`});
  392 |   if(phase==='before') return;
  393 |   await expect(more).toHaveText(/197/);
  394 |   await expect(more).toHaveAttribute('aria-expanded','true');
  395 |   await expect(popup).not.toHaveAttribute('aria-modal','true');
  396 |   const triggerBox=(await more.boundingBox())!,popupBox=(await popup.boundingBox())!;
  397 |   expect(popupBox.y).toBeGreaterThanOrEqual(triggerBox.y+triggerBox.height);
  398 |   expect(popupBox.y-triggerBox.y-triggerBox.height).toBeLessThanOrEqual(8);
  399 |   expect(Math.abs(popupBox.x+popupBox.width-triggerBox.x-triggerBox.width)).toBeLessThan(2);
  400 |   const paint=await popup.evaluate(el=>({background:getComputedStyle(el).backgroundColor,layer:getComputedStyle(el).backgroundImage,mask:getComputedStyle(el).getPropertyValue('--rain-overlay-separation').trim()}));
  401 |   expect(paint.layer).toBe('none');
  402 |   await expect(popup).toHaveCSS('background-color','rgb(255, 255, 255)');
  403 |   await expect(page.locator('.rain-dialog-backdrop')).toHaveCount(0);
  404 |   const search=popup.getByRole('textbox',{name:'搜索范围'});
  405 |   await expect(search).toBeFocused();
  406 |   await search.fill('不存在的班级');
```