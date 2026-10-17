# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042.spec.ts >> G1 review-05 course resources add, reorder, delete and save through ManageTree without losing hidden draft nodes
- Location: tests/e2e/navigation-v042.spec.ts:502:1

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 2
Received:   3
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
                          - button "移动函数的定义与表示" [active] [ref=e291] [cursor=pointer]
                          - generic [ref=e293]: 讲义
                          - generic "函数的定义与表示" [ref=e300]
                          - generic [ref=e302]:
                            - generic [ref=e303]: 已发布
                            - generic [ref=e304]: 09-24 更新
                          - generic [ref=e305]:
                            - button "编辑函数的定义与表示" [ref=e306] [cursor=pointer]
                            - button "在函数的定义与表示之后添加同级" [ref=e309] [cursor=pointer]
                            - button "删除函数的定义与表示" [ref=e312] [cursor=pointer]
                      - treeitem "函数的性质" [level=3] [ref=e315]:
                        - generic [ref=e316]:
                          - button "移动函数的性质" [ref=e317] [cursor=pointer]
                          - generic [ref=e319]: 视频
                          - generic "函数的性质" [ref=e326]
                          - generic [ref=e328]:
                            - generic [ref=e329]: 已发布
                            - generic [ref=e330]: 09-24 更新
                          - generic [ref=e331]:
                            - button "编辑函数的性质" [ref=e332] [cursor=pointer]
                            - button "在函数的性质之后添加同级" [ref=e335] [cursor=pointer]
                            - button "删除函数的性质" [ref=e338] [cursor=pointer]
                      - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e341]:
                        - generic [ref=e342]:
                          - button "收起1.2 极限与连续" [expanded] [ref=e343] [cursor=pointer]
                          - button "移动1.2 极限与连续" [ref=e345] [cursor=pointer]
                          - generic "1.2 极限与连续" [ref=e350]
                          - generic [ref=e352]:
                            - generic [ref=e353]: 8 个学习单元
                            - generic [ref=e354]: 09-24 更新
                      - treeitem "数列极限" [expanded] [level=3] [ref=e355]:
                        - generic [ref=e356]:
                          - button "收起数列极限" [expanded] [ref=e357] [cursor=pointer]
                          - button "移动数列极限" [ref=e359] [cursor=pointer]
                          - generic "数列极限" [ref=e364]
                          - generic [ref=e366]:
                            - generic [ref=e367]: 3 个学习单元
                            - generic [ref=e368]: 09-24 更新
                      - treeitem "极限的定义" [level=4] [ref=e369]:
                        - generic [ref=e370]:
                          - button "移动极限的定义" [ref=e371] [cursor=pointer]
                          - generic [ref=e373]: 讲义
                          - generic "极限的定义" [ref=e380]
                          - generic [ref=e382]:
                            - generic [ref=e383]: 已发布
                            - generic [ref=e384]: 09-24 更新
                      - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e385]:
                        - generic [ref=e386]:
                          - button "收起收敛性与极限运算" [expanded] [ref=e387] [cursor=pointer]
                          - button "移动收敛性与极限运算" [ref=e389] [cursor=pointer]
                          - generic "收敛性与极限运算" [ref=e394]
                          - generic [ref=e396]:
                            - generic [ref=e397]: 2 个学习单元
                            - generic [ref=e398]: 09-24 更新
                      - treeitem "两个重要极限" [expanded] [level=5] [ref=e399]:
                        - generic [ref=e400]:
                          - button "收起两个重要极限" [expanded] [ref=e401] [cursor=pointer]
                          - button "移动两个重要极限" [ref=e403] [cursor=pointer]
                          - generic "两个重要极限" [ref=e408]
                          - generic [ref=e410]:
                            - generic [ref=e411]: 2 个学习单元
                            - generic [ref=e412]: 09-24 更新
                      - treeitem "常见题型与方法" [expanded] [level=6] [ref=e413]:
                        - generic [ref=e414]:
                          - button "收起常见题型与方法" [expanded] [ref=e415] [cursor=pointer]
                          - button "移动常见题型与方法" [ref=e417] [cursor=pointer]
                          - generic "常见题型与方法" [ref=e422]
                          - generic [ref=e424]:
                            - generic [ref=e425]: 2 个学习单元
                            - generic [ref=e426]: 09-24 更新
                      - treeitem "例题与拓展练习" [level=7] [ref=e427]:
                        - generic [ref=e428]:
                          - button "移动例题与拓展练习" [ref=e429] [cursor=pointer]
                          - generic [ref=e431]: 作业
                          - generic "例题与拓展练习" [ref=e438]
                          - generic [ref=e440]:
                            - generic [ref=e441]: 已发布
                            - generic [ref=e442]: 09-24 更新
                      - treeitem "函数的连续性" [level=3] [ref=e443]:
                        - generic [ref=e444]:
                          - button "移动函数的连续性" [ref=e445] [cursor=pointer]
                          - generic [ref=e447]: 讲义
                          - generic "函数的连续性" [ref=e454]
                          - generic [ref=e456]:
                            - generic [ref=e457]: 已发布
                            - generic [ref=e458]: 09-24 更新
                      - treeitem "1.3 习题与应用" [level=2] [ref=e459]:
                        - generic [ref=e460]:
                          - button "移动1.3 习题与应用" [ref=e461] [cursor=pointer]
                          - generic [ref=e463]: 作业
                          - generic "1.3 习题与应用" [ref=e470]
                          - generic [ref=e472]:
                            - generic [ref=e473]: 已发布
                            - generic [ref=e474]: 09-24 更新
                      - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e475]:
                        - generic [ref=e476]:
                          - button "收起第二章 · 导数与微分" [expanded] [ref=e477] [cursor=pointer]
                          - button "移动第二章 · 导数与微分" [ref=e479] [cursor=pointer]
                          - generic "第二章 · 导数与微分" [ref=e484]
                          - generic [ref=e486]:
                            - generic [ref=e487]: 16 个学习单元
                            - generic [ref=e488]: 09-24 更新
                      - treeitem "2.1 导数的概念" [level=2] [ref=e489]:
                        - generic [ref=e490]:
                          - button "移动2.1 导数的概念" [ref=e491] [cursor=pointer]
                          - generic [ref=e493]: 讲义
                          - generic "2.1 导数的概念" [ref=e500]
                          - generic [ref=e502]:
                            - generic [ref=e503]: 已发布
                            - generic [ref=e504]: 09-24 更新
                      - treeitem "2.2 导数的应用" [level=2] [ref=e505]:
                        - generic [ref=e506]:
                          - button "移动2.2 导数的应用" [ref=e507] [cursor=pointer]
                          - generic [ref=e509]: 考试
                          - generic "2.2 导数的应用" [ref=e516]
                          - generic [ref=e518]:
                            - generic [ref=e519]: 已发布
                            - generic [ref=e520]: 09-24 更新
                      - generic [ref=e521]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                      - status [ref=e522]
              - generic [ref=e523]:
                - generic [ref=e524]: 公共资源的内容可供关联班级复用。
                - generic [ref=e525]: 模拟数据 · 未执行发布
  - generic [ref=e526]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  411 |       const items=[...el.querySelectorAll<HTMLElement>('.rain-connected-surface__row [role="tab"]')].map(tab=>{
  412 |         const t=tab.getBoundingClientRect(),paint=getComputedStyle(tab,'::before');
  413 |         const content=['.rain-tabs__icon','.rain-tabs__label','.rain-navigation__description','.rain-tabs__count'].flatMap(selector=>{
  414 |           const item=tab.querySelector(selector);if(!item) return [];
  415 |           const b=item.getBoundingClientRect();return [{selector,x:b.left-t.left,y:b.top-r.top,height:b.height}];
  416 |         });
  417 |         return {x:t.left-r.left,y:t.top-r.top,width:t.width,height:t.height,bottom:t.bottom-r.top,selected:tab.getAttribute('aria-selected'),content,paint:{bottom:paint.bottom,background:paint.backgroundColor,radius:paint.borderRadius},clearance:panel.top-t.bottom+parseFloat(paint.bottom)};
  418 |       });
  419 |       const more=el.querySelector<HTMLElement>('.rain-scope-navigation__more'),m=more?.getBoundingClientRect();
  420 |       return {seam,items,gaps:items.slice(1).map((t,i)=>t.x-items[i]!.x-items[i]!.width),path:path.getAttribute('d'),
  421 |         corners:{left:path.isPointInFill(new DOMPoint(1,seam+1)),right:path.isPointInFill(new DOMPoint(r.width-1,seam+1))},
  422 |         more:m?{x:m.left-r.left,y:m.top-r.top,height:m.height,gap:m.left-r.left-items.at(-1)!.x-items.at(-1)!.width}:null};
  423 |     });
  424 |     for(const connection of ['inset','merged']) {
  425 |       await page.getByRole('combobox',{name:/连接/}).selectOption(connection);
  426 |       await tabs.nth(0).click();await page.mouse.move(0,0);
  427 |       await expect(frame).toHaveAttribute('data-measured','true');
  428 |       const idle=await measure();
  429 |       await tabs.nth(1).hover();
  430 |       const hover=await measure();
  431 |       await frame.screenshot({path:`${dir}/${sample}-${connection}-hover.png`});
  432 |       await tabs.nth(1).click();
  433 |       await expect.poll(async()=> (await measure()).path).not.toBe(idle.path);
  434 |       const selected=await measure();
  435 |       await frame.screenshot({path:`${dir}/${sample}-${connection}-middle.png`});
  436 |       await tabs.last().click();
  437 |       await expect.poll(async()=> (await measure()).path).not.toBe(selected.path);
  438 |       const last=await measure();
  439 |       await frame.screenshot({path:`${dir}/${sample}-${connection}-last.png`});
  440 |       facts.push({sample,connection,idle,hover,selected,last});
  441 |     }
  442 |   }
  443 |   await writeFile(`${dir}/geometry.json`,JSON.stringify(facts,null,2));
  444 |   for(const {sample,connection,idle,hover,selected,last} of facts) {
  445 |     for(const gap of idle.gaps) expect(gap,`${sample}/${connection} tab gap`).toBeCloseTo(8,1);
  446 |     expect(hover.items[1]!.clearance,`${sample}/${connection} hover clearance`).toBeCloseTo(8,1);
  447 |     expect(hover.items[1]!.paint.background).not.toBe('rgba(0, 0, 0, 0)');
  448 |     expect(hover.path).toBe(idle.path);
  449 |     expect(selected.items[1]!.bottom).toBeCloseTo(selected.seam,1);
  450 |     expect(selected.corners).toEqual({left:false,right:false});
  451 |     expect(last.corners.right).toBe(false); // These samples leave room for More/controls or trailing space.
  452 |     expect(idle.corners).toEqual({left:connection==='merged',right:false});
  453 |     for(let i=0;i<idle.items.length;i++) {
  454 |       expect(hover.items[i]!.content).toEqual(idle.items[i]!.content);
  455 |       expect(selected.items[i]!.content).toEqual(idle.items[i]!.content);
  456 |     }
  457 |     if(idle.more) {
  458 |       expect(idle.more.gap).toBeCloseTo(8,1);
  459 |       expect(idle.more.y).toBe(idle.items[0]!.y);
  460 |       expect(idle.more.height).toBe(idle.items[0]!.height);
  461 |     }
  462 |     const other=facts.find(f=>f.sample===sample&&f.connection!==connection)!;
  463 |     expect(idle.seam).toBe(other.idle.seam);
  464 |     idle.items.forEach((tab,i)=>expect(tab.content).toEqual(other.idle.items[i]!.content));
  465 |   }
  466 | });
  467 | 
  468 | 
  469 | test('G1 review-05 uses standard Tree geometry and a compact pale More arrow', async ({page}) => {
  470 |   const { mkdir, writeFile } = await import('node:fs/promises');
  471 |   const phase=process.env.NAV_REVIEW_PHASE==='before'?'before':'after';
  472 |   const evidence=`evidence/runtime/navigation-v042/review-07/${phase}`;
  473 |   await mkdir(evidence,{recursive:true});
  474 |   await page.goto('/#navigation-v042');
  475 |   const root=page.locator('.nv42-r2'), more=root.getByRole('button',{name:'更多班级',exact:true});
  476 |   const tree=root.getByRole('tree',{name:'课程内容编辑树'});
  477 |   const facts=await root.evaluate(root=>{
  478 |     const more=root.querySelector('.rain-scope-navigation__more')!;
  479 |     const rows=[...root.querySelectorAll('.rain-tree-row')];
  480 |     return {gap:getComputedStyle(more).gap,arrow:getComputedStyle(more.querySelector('.rain-icon')!).color,
  481 |       rows:rows.slice(0,3).map(row=>({height:row.getBoundingClientRect().height,inset:getComputedStyle(row).paddingLeft,gap:getComputedStyle(row).gap})),
  482 |       lines:root.querySelectorAll('[data-slot="connector"]').length};
  483 |   });
  484 |   await root.screenshot({path:`${evidence}/R2.png`});
  485 |   await writeFile(`${evidence}/facts.json`,JSON.stringify(facts,null,2));
  486 |   expect(facts.gap).toBe('4px');
  487 |   expect(facts.arrow).toBe('rgb(150, 163, 193)');
  488 |   expect(facts.rows.map(row=>row.height)).toEqual([44,44,44]);
  489 |   expect(parseFloat(facts.rows[1]!.inset)-parseFloat(facts.rows[0]!.inset)).toBe(24);
  490 |   expect(facts.rows.every(row=>row.gap==='4px')).toBe(true);
  491 |   expect(facts.lines).toBeGreaterThan(0);
  492 |   await expect(root.locator('[data-rain-id="pattern-manage-tree"]')).toBeVisible();
  493 |   await expect(tree).toHaveAttribute('data-variant','basic');
  494 |   await more.click();
  495 |   await expect(more.locator('.rain-icon')).toHaveCSS('color','rgb(150, 163, 193)');
  496 |   await page.keyboard.press('Escape');
  497 |   await page.getByRole('combobox',{name:/画板宽度/}).selectOption('1200');
  498 |   await root.screenshot({path:`${evidence}/R2-1200.png`});
  499 | });
  500 | 
  501 | 
  502 | test('G1 review-05 course resources add, reorder, delete and save through ManageTree without losing hidden draft nodes', async ({page}) => {
  503 |   const evidence='evidence/runtime/navigation-v042/review-07/after';
  504 |   await page.goto('/#navigation-v042');
  505 |   const root=page.locator('.nv42-r2'), tree=root.getByRole('tree',{name:'课程内容编辑树'});
  506 |   const row=(name:string)=>tree.getByRole('treeitem',{name,exact:true});
  507 |   const editor=page.getByRole('dialog',{name:'编辑内容节点',exact:true});
  508 |   const rename='1.2 极限与连续（调整）';
  509 |   await row('函数的定义与表示').getByRole('button',{name:'移动函数的定义与表示',exact:true}).dragTo(row('函数的性质'),{targetPosition:{x:90,y:42}});
  510 |   const pointerOrder=await tree.getByRole('treeitem').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('aria-label')));
> 511 |   expect(pointerOrder.indexOf('函数的性质')).toBeLessThan(pointerOrder.indexOf('函数的定义与表示'));
      |                                         ^ Error: expect(received).toBeLessThan(expected)
  512 |   await root.screenshot({path:`${evidence}/pointer-sort.png`});
  513 |   await row('1.2 极限与连续').focus(); await page.keyboard.press('F2');
  514 |   await editor.getByRole('textbox',{name:'节点名称',exact:true}).fill('');
  515 |   await editor.getByRole('button',{name:'确认编辑',exact:true}).click();
  516 |   await expect(editor.getByRole('alert')).toHaveText('标题不能为空');
  517 |   await editor.getByRole('textbox',{name:'节点名称',exact:true}).fill(rename);
  518 |   await editor.getByRole('button',{name:'确认编辑',exact:true}).click();
  519 |   await expect(row(rename)).toBeVisible();
  520 |   await row(rename).hover(); await row(rename).getByRole('button',{name:/下添加子级/}).click();
  521 |   await editor.getByRole('textbox',{name:'节点名称',exact:true}).fill('课堂练习');
  522 |   await editor.getByRole('combobox',{name:'内容类型',exact:true}).click();
  523 |   await page.getByRole('option',{name:'作业',exact:true}).click();
  524 |   await editor.screenshot({path:`${evidence}/task-editor.png`});
  525 |   await editor.getByRole('button',{name:'确认编辑',exact:true}).click();
  526 |   await root.getByRole('radio',{name:'作业',exact:true}).click();
  527 |   await expect(row('课堂练习')).toBeVisible();
  528 |   await expect(row('函数的定义与表示')).toHaveCount(0);
  529 |   await expect(tree.locator('[data-slot="drag-handle"]')).toHaveCount(0);
  530 |   await root.getByRole('tab',{name:'2026 秋 · 高等数学 1 班',exact:true}).click();
  531 |   await root.getByRole('button',{name:'隐藏课程导航',exact:true}).first().click();
  532 |   await root.getByRole('button',{name:'恢复课程导航',exact:true}).click();
  533 |   await expect(row('课堂练习')).toBeVisible();
  534 |   await root.getByRole('radio',{name:'全部',exact:true}).click();
  535 |   await expect(row('函数的定义与表示')).toBeVisible();
  536 |   await row('课堂练习').getByRole('button',{name:'移动课堂练习',exact:true}).focus();
  537 |   await page.keyboard.press('Space'); await page.keyboard.press('ArrowUp'); await page.keyboard.press('ArrowRight');
  538 |   await expect(tree.locator('[data-slot="drop-indicator"]')).toHaveAttribute('data-placement','before');
  539 |   await root.screenshot({path:`${evidence}/keyboard-sort.png`});
  540 |   await page.keyboard.press('Enter');
  541 |   await expect(row('课堂练习')).toHaveAttribute('aria-level','3');
  542 |   const order=await tree.getByRole('treeitem').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('aria-label')));
  543 |   expect(order.indexOf('课堂练习')).toBeLessThan(order.indexOf('函数的连续性'));
  544 |   await row('函数的性质').hover(); await row('函数的性质').getByRole('button',{name:'删除函数的性质',exact:true}).click();
  545 |   await page.getByRole('button',{name:'继续编辑',exact:true}).click();
  546 |   await expect(row('函数的性质')).toBeVisible();
  547 |   await row('函数的性质').hover(); await row('函数的性质').getByRole('button',{name:'删除函数的性质',exact:true}).click();
  548 |   await page.getByText('确认删除当前节点及其子节点？',{exact:true}).screenshot({path:`${evidence}/delete-confirmation.png`});
  549 |   await page.getByRole('button',{name:'确认删除',exact:true}).click();
  550 |   await expect(row('函数的性质')).toHaveCount(0);
  551 |   await root.getByRole('button',{name:'保存草稿',exact:true}).click();
  552 |   await expect(root.getByRole('button',{name:'进入编辑',exact:true})).toBeVisible();
  553 |   await expect(root.locator('.nv42-stats')).toHaveText('7 级结构16 个内容节点33 个学习单元');
  554 |   await expect(row('课堂练习')).toBeVisible();
  555 |   await expect(row(rename)).toBeVisible();
  556 |   await root.screenshot({path:`${evidence}/saved.png`});
  557 |   await root.getByRole('button',{name:'进入编辑',exact:true}).click();
  558 |   await root.getByRole('button',{name:'添加根节点',exact:true}).click();
  559 |   await editor.getByRole('button',{name:'取消编辑',exact:true}).click();
  560 |   await expect(row('新知识点')).toHaveCount(0);
  561 |   await row(rename).focus(); await page.keyboard.press('F2');
  562 |   await editor.getByRole('textbox',{name:'节点名称',exact:true}).fill('放弃的改名');
  563 |   await editor.getByRole('button',{name:'确认编辑',exact:true}).click();
  564 |   await root.getByRole('button',{name:'退出编辑',exact:true}).click();
  565 |   await page.getByRole('button',{name:'放弃修改',exact:true}).click();
  566 |   await expect(row(rename)).toBeVisible();
  567 |   await expect(row('放弃的改名')).toHaveCount(0);
  568 | });
  569 | 
```