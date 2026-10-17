# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review07.spec.ts >> R3 1200 platform states consume category Tokens and preserve icon geometry
- Location: tests/e2e/navigation-v042-review07.spec.ts:4:119

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    11
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
      - button "R3" [active] [ref=e22]
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
                  - generic [ref=e208]: 共 8 项
                  - textbox "搜索当前范围内的文件" [ref=e212]
                  - radiogroup "文件显示模式" [ref=e215]:
                    - generic [ref=e217]:
                      - generic [ref=e218] [cursor=pointer]:
                        - radio "列表" [checked] [ref=e219]
                        - generic [ref=e222]: 列表
                      - generic [ref=e223] [cursor=pointer]:
                        - radio "网格" [ref=e224]
                        - generic [ref=e227]: 网格
                - table "云盘文件列表" [ref=e228]:
                  - rowgroup [ref=e229]:
                    - row [ref=e230]:
                      - columnheader [ref=e231]:
                        - checkbox "选择当前页全部文件" [ref=e233]
                      - columnheader "文件名" [ref=e236]
                      - columnheader "大小" [ref=e237]
                      - columnheader "审核状态" [ref=e238]
                      - columnheader "修改时间" [ref=e239]
                  - rowgroup [ref=e240]:
                    - row [ref=e241]:
                      - cell [ref=e242]:
                        - checkbox "选择 高等数学 · 课程资源包" [ref=e244]
                      - cell [ref=e247]:
                        - button "高等数学 · 课程资源包" [ref=e248] [cursor=pointer]
                      - cell "12 个文件" [ref=e250]
                      - cell "已共享" [ref=e251]
                      - cell "09-24 14:20" [ref=e255]
                    - row [ref=e256]:
                      - cell [ref=e257]:
                        - checkbox "选择 第一章 函数、极限与连续.pdf" [ref=e259]
                      - cell [ref=e262]:
                        - button "第一章 函数、极限与连续.pdf" [ref=e263] [cursor=pointer]
                      - cell "2.4 MB" [ref=e265]
                      - cell "已审核" [ref=e266]
                      - cell "09-24 11:36" [ref=e270]
                    - row [ref=e271]:
                      - cell [ref=e272]:
                        - checkbox "选择 2026 秋季课程教学大纲.docx" [ref=e274]
                      - cell [ref=e277]:
                        - button "2026 秋季课程教学大纲.docx" [ref=e278] [cursor=pointer]
                      - cell "348 KB" [ref=e280]
                      - cell "已审核" [ref=e281]
                      - cell "09-23 17:08" [ref=e285]
                    - row [ref=e286]:
                      - cell [ref=e287]:
                        - checkbox "选择 大学物理实验成绩与反馈汇总表.xlsx" [ref=e289]
                      - cell [ref=e292]:
                        - button "大学物理实验成绩与反馈汇总表.xlsx" [ref=e293] [cursor=pointer]
                      - cell "128 KB" [ref=e295]
                      - cell "审核中" [ref=e296]
                      - cell "09-23 15:42" [ref=e300]
                    - row [ref=e301]:
                      - cell [ref=e302]:
                        - checkbox "选择 函数连续性 · 课堂案例与图示.pdf" [ref=e304]
                      - cell [ref=e307]:
                        - button "函数连续性 · 课堂案例与图示.pdf" [ref=e308] [cursor=pointer]
                      - cell "1.8 MB" [ref=e310]
                      - cell "已审核" [ref=e311]
                      - cell "09-22 09:15" [ref=e315]
                    - row [ref=e316]:
                      - cell [ref=e317]:
                        - checkbox "选择 课程讨论与活动记录.docx" [ref=e319]
                      - cell [ref=e322]:
                        - button "课程讨论与活动记录.docx" [ref=e323] [cursor=pointer]
                      - cell "562 KB" [ref=e325]
                      - cell "已审核" [ref=e326]
                      - cell "09-21 16:30" [ref=e330]
                    - row [ref=e331]:
                      - cell [ref=e332]:
                        - checkbox "选择 工程实践项目参考文献汇编.pdf" [ref=e334]
                      - cell [ref=e337]:
                        - button "工程实践项目参考文献汇编.pdf" [ref=e338] [cursor=pointer]
                      - cell "4.1 MB" [ref=e340]
                      - cell "已审核" [ref=e341]
                      - cell "09-21 10:26" [ref=e345]
                    - row [ref=e346]:
                      - cell [ref=e347]:
                        - checkbox "选择 班级分组与小组成员名单.xlsx" [ref=e349]
                      - cell [ref=e352]:
                        - button "班级分组与小组成员名单.xlsx" [ref=e353] [cursor=pointer]
                      - cell "86 KB" [ref=e355]
                      - cell "已审核" [ref=e356]
                      - cell "09-20 13:07" [ref=e360]
                - generic [ref=e361]:
                  - generic [ref=e362]: 列表 / 网格切换保留当前目录
                  - generic [ref=e363]: 1 · 单页演示数据
                - status [ref=e364]
  - generic [ref=e365]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | const evidence=process.env.NAVIGATION_PLATFORM_EVIDENCE_DIR??'evidence/runtime/navigation-v042/w5/review-07-cross-page/platform-final';
  3  | const open=async(page:import('@playwright/test').Page,sample:string,width:number)=>{await page.goto('/#navigation-v042');await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));};
  4  | for(const sample of ['R1','R2','R3','R4','R5','R6','S1','S2','S3','S4','S5','S6'])for(const width of [1200,1440,1600])test(`${sample} ${width} platform states consume category Tokens and preserve icon geometry`,async({page})=>{
  5  |  await open(page,sample,width);
  6  |  const platform=page.locator('.rain-workspace__region:is(.nv43-platform,.nv42-global-region,.nv5-platform,.nv44-global)').first();
  7  |  if(!await platform.isVisible())await page.locator('.rain-workspace__restore[aria-controls$="-workspace-global"]').first().click();
  8  |  await expect(platform).toBeVisible();
  9  |  const current=platform.locator('.rain-navigation-family__item[data-active="true"] .rain-navigation-family__row,.nv42-rail [data-slot="item"][data-active]').first();
  10 |  await expect(current).toBeVisible();
  11 |  const fact=await current.evaluate(el=>{const s=getComputedStyle(el);const t=s.getPropertyValue('--rain-category-fill-brand-solid-3').trim();return {bg:s.backgroundColor,token:t};});
  12 |  expect(fact.bg).toBe('rgb(198, 216, 255)');expect(fact.token.match(/\d+/g)?.map(Number)).toEqual([198,216,255]);
  13 |  const other=platform.locator('.rain-navigation-family__item:not([data-active="true"]) .rain-navigation-family__row,.nv42-rail [data-slot="item"]:not([data-active])').first();
  14 |  await other.hover();
  15 |  expect(await other.evaluate(el=>getComputedStyle(el).backgroundColor)).toBe('rgba(74, 102, 209, 0.2)');
  16 |  await platform.screenshot({path:`${evidence}/${sample}-${width}-hover.png`});
  17 |  await page.mouse.move(1750,1000);
  18 |  const icons=platform.locator('.rain-navigation-family__leading>[data-rain-id="icon"],.nv42-rail-links [data-slot="icon"]');
  19 |  const sizes=()=>icons.evaluateAll(els=>els.map(el=>{const r=el.getBoundingClientRect();return [r.width,r.height];}));
  20 |  const before=await sizes();expect(before).toHaveLength(4);
  21 |  const alignment=await icons.evaluateAll(els=>els.map(el=>{const entry=el.closest('.rain-navigation-family__entry,.nv42-rail [data-slot="item"]')!,a=entry.getBoundingClientRect(),b=el.getBoundingClientRect();const compact=entry.closest('.rain-navigation-list')?.getAttribute('data-appearance')==='icons'||entry.closest('.rain-workspace__region')?.getAttribute('data-mode')==='compact';return {x:compact?Math.abs(b.x+b.width/2-a.x-a.width/2):0,y:Math.abs(b.y+b.height/2-a.y-a.height/2)};}));
> 22 |  for(const icon of alignment){expect(icon.x).toBeLessThanOrEqual(1);expect(icon.y).toBeLessThanOrEqual(1);}
     |                                                                                    ^ Error: expect(received).toBeLessThanOrEqual(expected)
  23 |  await platform.screenshot({path:`${evidence}/${sample}-${width}-initial.png`});
  24 |  if(width===1600){
  25 |  const expand=page.getByRole('button',{name:'展开平台导航',exact:true});
  26 |  if(await expand.count())await expand.first().click();else await page.getByRole('button',{name:'收起平台导航',exact:true}).first().click();
  27 |  await expect.poll(sizes).toEqual(before);
  28 |  const bounds=await platform.boundingBox(),row=await current.boundingBox();expect(row!.x).toBeGreaterThanOrEqual(bounds!.x);expect(row!.x+row!.width).toBeLessThanOrEqual(bounds!.x+bounds!.width);
  29 |  await platform.screenshot({path:`${evidence}/${sample}-${width}-toggled.png`});
  30 |  if(sample==='R3')await page.locator('.rain-workspace').screenshot({path:`${evidence}/R3-expanded-workspace.png`});
  31 |  }
  32 | });
  33 | for(const sample of ['A4','Connections'])test(`${sample} search no match gives a visible status and retains focus return`,async({page})=>{
  34 |  await open(page,sample,1440);await page.getByRole('button',{name:sample==='A4'?'全部班级':'全部',exact:true}).click();await page.getByRole('textbox',{name:'搜索范围'}).fill('没有这个班级');await expect(page.getByRole('status')).toHaveText('无匹配范围');await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:sample==='A4'?'全部班级':'全部',exact:true})).toBeFocused();
  35 | });
  36 | test('R2 content filters, scope identity and temporary layout preserve the existing resource draft',async({page})=>{
  37 |  await open(page,'R2',1600);const root=page.locator('.nv42-r2-frame');
  38 |  if(await root.getByRole('button',{name:'进入编辑',exact:true}).count())await root.getByRole('button',{name:'进入编辑',exact:true}).click();await expect(root.getByRole('button',{name:'退出编辑'})).toBeVisible();
  39 |  await root.getByRole('radio',{name:'作业',exact:true}).click();await expect(root.getByRole('tree',{name:'课程内容编辑树'})).toBeVisible();
  40 |  await root.getByRole('button',{name:'专注内容',exact:true}).click();await expect(root.getByRole('button',{name:'退出编辑'})).toBeVisible();
  41 |  await root.getByRole('button',{name:'退出专注',exact:true}).click();await expect(root.getByRole('radio',{name:'作业',exact:true})).toBeChecked();
  42 |  await root.getByRole('button',{name:'更多班级',exact:true}).click();await expect(page.getByRole('textbox',{name:'搜索范围'})).toBeVisible();await page.getByRole('textbox',{name:'搜索范围'}).fill('不存在的范围');await expect(page.getByRole('status').filter({hasText:'没有匹配的范围'})).toBeVisible();await page.keyboard.press('Escape');
  43 | });
  44 | 
```