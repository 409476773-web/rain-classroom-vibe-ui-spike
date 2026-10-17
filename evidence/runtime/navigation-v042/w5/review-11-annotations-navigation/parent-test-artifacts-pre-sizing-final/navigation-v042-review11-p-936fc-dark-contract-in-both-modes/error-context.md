# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-platform.spec.ts >> R3 platform follows the common light and dark contract in both modes
- Location: tests/e2e/navigation-v042-review11-platform.spec.ts:18:28

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 40
Received: 28
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
    - generic [ref=e42]: 轻品牌
    - generic "未勾选时使用轻品牌外框" [ref=e43]:
      - checkbox "深色外框" [ref=e44]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e45] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R3
  - generic "R3 工作区" [ref=e48]:
    - generic [ref=e50]:
      - generic [ref=e51]:
        - button "展开平台导航" [ref=e52] [cursor=pointer]
        - button "隐藏资源目录" [expanded] [ref=e54] [cursor=pointer]
        - generic [ref=e56]:
          - strong [ref=e57]: 云盘 · 全部文件
          - generic [ref=e58]: 当前范围不随目录隐藏改变
        - button "布局" [ref=e59] [cursor=pointer]
        - button "专注内容" [ref=e60] [cursor=pointer]
      - generic [ref=e61]:
        - generic "平台导航" [ref=e63]:
          - generic [ref=e64]:
            - generic [ref=e65]:
              - strong [ref=e66]
              - button "展开平台导航" [ref=e68] [cursor=pointer]
            - navigation "平台功能" [ref=e71]:
              - list [ref=e72]:
                - listitem [ref=e73]:
                  - link "工作台" [ref=e75] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e78]:
                  - link "课程" [ref=e80] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e83]:
                  - link "资源" [ref=e85] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e88]:
                  - link "专业" [ref=e90] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - generic [ref=e93]:
              - button "当前账户：林老师" [ref=e94] [cursor=pointer]
              - button "通知" [ref=e97] [cursor=pointer]
              - button "帮助" [ref=e99] [cursor=pointer]
        - generic [ref=e101]:
          - generic [ref=e102]:
            - generic [ref=e103]:
              - strong [ref=e106]: 我的资源
              - button "切换资源空间" [ref=e107] [cursor=pointer]
            - navigation "资源功能" [ref=e110]:
              - generic [ref=e111]:
                - link "云盘" [ref=e112] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "题库" [ref=e116] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "课件库" [ref=e120] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "试卷库" [ref=e124] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "问卷库" [ref=e128] [cursor=pointer]:
                  - /url: "#navigation-v042"
            - button "成员" [ref=e133] [cursor=pointer]
          - generic [ref=e139]:
            - generic "资源目录" [ref=e141]:
              - heading [level=3] [ref=e142]:
                - text: 资源目录
                - generic [ref=e143]:
                  - button "取消固定资源目录" [ref=e144] [cursor=pointer]
                  - button "隐藏资源目录" [ref=e147] [cursor=pointer]
              - heading "资源分类" [level=5] [ref=e150]
              - navigation "资源分类" [ref=e151]:
                - list [ref=e152]:
                  - listitem [ref=e153]:
                    - link "全部文件" [ref=e155] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e158]:
                    - link "图片" [ref=e160] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e163]:
                    - link "视频" [ref=e165] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e168]:
                    - link "音频" [ref=e170] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e173]:
                    - link "文档" [ref=e175] [cursor=pointer]:
                      - /url: "#navigation-v042"
              - heading "常用文件夹" [level=5] [ref=e178]
              - navigation "常用文件夹" [ref=e179]:
                - list [ref=e180]:
                  - listitem [ref=e181]:
                    - link "教学资料" [ref=e183] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e186]:
                    - link "课程案例" [ref=e188] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e191]:
                    - link "专业文献" [ref=e193] [cursor=pointer]:
                      - /url: "#navigation-v042"
              - generic [ref=e196]: 已使用 4.2 GB / 10 GB
            - separator "调整资源目录宽度" [ref=e197]
            - generic [ref=e199]:
              - generic [ref=e200]:
                - generic "资源路径" [ref=e201]:
                  - navigation "面包屑" [ref=e202]:
                    - list [ref=e203]:
                      - listitem [ref=e204]:
                        - generic [ref=e205]: 全部文件
                      - listitem [ref=e206]:
                        - generic [ref=e207]: /
                        - generic [ref=e208]: 教学资料
                - generic [ref=e209]:
                  - generic [ref=e210]:
                    - heading "全部文件" [level=3] [ref=e211]
                    - paragraph [ref=e212]: 分类、文件夹、文件选中和多选状态分别表达。
                  - button "上传文件" [ref=e213] [cursor=pointer]
              - generic [ref=e217]:
                - generic [ref=e218]:
                  - generic [ref=e219]: 共 8 项
                  - textbox "搜索当前范围内的文件" [ref=e223]
                  - radiogroup "文件显示模式" [ref=e226]:
                    - generic [ref=e228]:
                      - generic [ref=e229] [cursor=pointer]:
                        - radio "列表" [checked] [ref=e230]
                        - generic [ref=e233]: 列表
                      - generic [ref=e234] [cursor=pointer]:
                        - radio "网格" [ref=e235]
                        - generic [ref=e238]: 网格
                - table "云盘文件列表" [ref=e239]:
                  - rowgroup [ref=e240]:
                    - row [ref=e241]:
                      - columnheader [ref=e242]:
                        - checkbox "选择当前页全部文件" [ref=e244]
                      - columnheader "文件名" [ref=e247]
                      - columnheader "大小" [ref=e248]
                      - columnheader "审核状态" [ref=e249]
                      - columnheader "修改时间" [ref=e250]
                  - rowgroup [ref=e251]:
                    - row [ref=e252]:
                      - cell [ref=e253]:
                        - checkbox "选择 高等数学 · 课程资源包" [ref=e255]
                      - cell [ref=e258]:
                        - button "高等数学 · 课程资源包" [ref=e259] [cursor=pointer]
                      - cell "12 个文件" [ref=e261]
                      - cell "已共享" [ref=e262]
                      - cell "09-24 14:20" [ref=e266]
                    - row [ref=e267]:
                      - cell [ref=e268]:
                        - checkbox "选择 第一章 函数、极限与连续.pdf" [ref=e270]
                      - cell [ref=e273]:
                        - button "第一章 函数、极限与连续.pdf" [ref=e274] [cursor=pointer]
                      - cell "2.4 MB" [ref=e276]
                      - cell "已审核" [ref=e277]
                      - cell "09-24 11:36" [ref=e281]
                    - row [ref=e282]:
                      - cell [ref=e283]:
                        - checkbox "选择 2026 秋季课程教学大纲.docx" [ref=e285]
                      - cell [ref=e288]:
                        - button "2026 秋季课程教学大纲.docx" [ref=e289] [cursor=pointer]
                      - cell "348 KB" [ref=e291]
                      - cell "已审核" [ref=e292]
                      - cell "09-23 17:08" [ref=e296]
                    - row [ref=e297]:
                      - cell [ref=e298]:
                        - checkbox "选择 大学物理实验成绩与反馈汇总表.xlsx" [ref=e300]
                      - cell [ref=e303]:
                        - button "大学物理实验成绩与反馈汇总表.xlsx" [ref=e304] [cursor=pointer]
                      - cell "128 KB" [ref=e306]
                      - cell "审核中" [ref=e307]
                      - cell "09-23 15:42" [ref=e311]
                    - row [ref=e312]:
                      - cell [ref=e313]:
                        - checkbox "选择 函数连续性 · 课堂案例与图示.pdf" [ref=e315]
                      - cell [ref=e318]:
                        - button "函数连续性 · 课堂案例与图示.pdf" [ref=e319] [cursor=pointer]
                      - cell "1.8 MB" [ref=e321]
                      - cell "已审核" [ref=e322]
                      - cell "09-22 09:15" [ref=e326]
                    - row [ref=e327]:
                      - cell [ref=e328]:
                        - checkbox "选择 课程讨论与活动记录.docx" [ref=e330]
                      - cell [ref=e333]:
                        - button "课程讨论与活动记录.docx" [ref=e334] [cursor=pointer]
                      - cell "562 KB" [ref=e336]
                      - cell "已审核" [ref=e337]
                      - cell "09-21 16:30" [ref=e341]
                    - row [ref=e342]:
                      - cell [ref=e343]:
                        - checkbox "选择 工程实践项目参考文献汇编.pdf" [ref=e345]
                      - cell [ref=e348]:
                        - button "工程实践项目参考文献汇编.pdf" [ref=e349] [cursor=pointer]
                      - cell "4.1 MB" [ref=e351]
                      - cell "已审核" [ref=e352]
                      - cell "09-21 10:26" [ref=e356]
                    - row [ref=e357]:
                      - cell [ref=e358]:
                        - checkbox "选择 班级分组与小组成员名单.xlsx" [ref=e360]
                      - cell [ref=e363]:
                        - button "班级分组与小组成员名单.xlsx" [ref=e364] [cursor=pointer]
                      - cell "86 KB" [ref=e366]
                      - cell "已审核" [ref=e367]
                      - cell "09-20 13:07" [ref=e371]
                - generic [ref=e372]:
                  - generic [ref=e373]: 列表 / 网格切换保留当前目录
                  - generic [ref=e374]: 1 · 单页演示数据
                - status [ref=e375]
  - generic [ref=e376]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import { test, expect, type Page, type Locator } from '@playwright/test';
  2  | 
  3  | const scenes = ['R1','R2','R3','R4','R5','R6','S1','S2','S3','S4','S5','S6'];
  4  | async function open(page:Page, scene:string, width=1440) {
  5  |   await page.goto(`/?sample=${scene}#navigation-v042`);
  6  |   await page.getByLabel('画板宽度').selectOption(String(width));
  7  |   return page.getByTestId('candidate-canvas').locator('.rain-workspace');
  8  | }
  9  | const rgba=(v:string)=>{if(v.startsWith('color(srgb')){const a=v.match(/[\d.]+/g)!.map(Number);return [Math.round(a[0]!*255),Math.round(a[1]!*255),Math.round(a[2]!*255),a[3]??1];}const a=v.match(/[\d.]+/g)!.map(Number);return [a[0],a[1],a[2],a[3]??1];};
  10 | const paint = (el:Locator) => el.evaluate(e => { const s=getComputedStyle(e),r=e.getBoundingClientRect(); return {background:s.backgroundColor,color:s.color,width:r.width,height:r.height}; });
  11 | async function setMode(root:Locator, mode:'compact'|'expanded') {
  12 |   const rail=root.locator('.rain-workspace__region[data-region-id="global"]');
  13 |   const expanded=async()=>await rail.getAttribute('data-mode')==='expanded'||await rail.getAttribute('data-temporary')==='true';
  14 |   if(await expanded()!==(mode==='expanded')) await rail.getByRole('button',{name:mode==='expanded'?'展开平台导航':await rail.getAttribute('data-temporary')==='true'?'关闭临时平台导航':'收起平台导航',exact:true}).click();
  15 |   await expect.poll(expanded).toBe(mode==='expanded');
  16 |   return rail;
  17 | }
  18 | for(const scene of scenes) test(`${scene} platform follows the common light and dark contract in both modes`,async({page}) => {
  19 |   const root=await open(page,scene);
  20 |   const theme=page.getByLabel('深色外框', {exact:true});
  21 |   await expect(theme).toBeVisible();
  22 |   for(const dark of [false,true]) {
  23 |     await theme.setChecked(dark);
  24 |     for(const mode of ['compact','expanded'] as const) {
  25 |       const rail=await setMode(root,mode);
  26 |       const current=rail.locator('a[aria-current="page"]');
  27 |       const currentRow=scene==='R2'?current:current.locator('..');
  28 |       const normal=rail.locator('a:not([aria-current="page"])').first();
  29 |       const normalRow=scene==='R2'?normal:normal.locator('..');
  30 |       expect((await paint(rail)).width).toBe(mode==='compact'?64:208);
  31 |       expect((await paint(rail)).background).toBe(dark?'rgb(37, 45, 67)':'rgb(232, 237, 248)');
  32 |       expect(rgba((await paint(currentRow)).background)).toEqual([255,255,255,dark?0.08:1]);
  33 |       expect((await paint(currentRow)).height).toBe(40);
  34 |       expect((await paint(current.locator('[data-rain-id="icon"]')))).toMatchObject({width:20,height:20});
  35 |       const logo=rail.locator('.nv42-brand,.nv43-brand,.nv5-brand,.nv44-brand').locator('[data-rain-id="icon"]');
  36 |       expect(await paint(logo)).toMatchObject({width:23,height:23});
  37 |       if(dark) expect((await paint(logo)).color).toBe('rgb(255, 255, 255)');
  38 |       await normal.hover();
  39 |       expect(rgba((await paint(normalRow)).background)).toEqual([255,255,255,dark?0.06:0.51]);
  40 |       await page.mouse.move(1790,1090);
  41 |       await expect(current).toHaveAttribute('aria-current','page');
  42 |       const account=rail.getByRole('button',{name:'当前账户：林老师',exact:true}),notice=rail.getByRole('button',{name:'通知',exact:true}),help=rail.getByRole('button',{name:'帮助',exact:true});
  43 |       await expect(account.locator('[data-rain-id="ui-avatar"]')).toBeVisible();
  44 |       const a=await account.boundingBox(),n=await notice.boundingBox(),h=await help.boundingBox();
  45 |       if(mode==='expanded') { await expect(rail.getByText('教师工作区',{exact:true})).toBeVisible(); expect(a!.x).toBeLessThan(n!.x);expect(n!.x).toBeLessThan(h!.x);expect(a!.height).toBe(44); }
> 46 |       else { await expect(rail.getByText('教师工作区',{exact:true})).toBeHidden();expect(n!.y).toBeLessThan(h!.y);expect(h!.y).toBeLessThan(a!.y);expect(a!.height).toBe(40); }
     |                                                                                                                                                                ^ Error: expect(received).toBe(expected) // Object.is equality
  47 |       expect(await root.evaluate(e => e.getAttribute('data-rain-theme'))).not.toBe('dark');
  48 |       expect((await paint(root.locator('.nv42-workspace-bar,.nv43-workspace-bar,.nv5-recovery,.nv44-restorebar').first())).background).toBe('rgb(255, 255, 255)');
  49 |     }
  50 |   }
  51 | });
  52 | 
  53 | for(const scene of ['R2','R4','S3','S5']) test(`${scene} splitter is quiet normally and visible for pointer and keyboard use`,async({page}) => {
  54 |   const root=await open(page,scene,1200);
  55 |   const splitter=root.locator('.rain-workspace__splitter:not([hidden])').first();
  56 |   await splitter.scrollIntoViewIfNeeded();
  57 |   const state=()=>splitter.evaluate(e=>({before:getComputedStyle(e,'::before').opacity,after:getComputedStyle(e,'::after').opacity,width:e.getBoundingClientRect().width,value:Number(e.getAttribute('aria-valuenow')),tabIndex:(e as HTMLElement).tabIndex,focused:e.matches(':focus-visible')}));
  58 |   await page.mouse.move(1790,1090);
  59 |   const before=await state();
  60 |   expect(before.before).toBe('0');expect(before.after).toBe('0');expect(before.width).toBeGreaterThanOrEqual(5);expect(before.tabIndex).toBe(0);
  61 |   await splitter.hover();expect((await state()).before).toBe('1');
  62 |   const box=await splitter.boundingBox();
  63 |   await page.mouse.move(box!.x+box!.width/2,box!.y+box!.height/2);await page.mouse.down();await page.mouse.move(box!.x+box!.width/2+20,box!.y+box!.height/2,{steps:5});
  64 |   expect((await state()).before).toBe('1');await page.mouse.up();
  65 |   await page.mouse.move(1790,1090);await splitter.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');
  66 |   expect((await state()).focused).toBe(true);expect((await state()).before).toBe('1');
  67 |   const value=(await state()).value;await page.keyboard.press('ArrowRight');expect((await state()).value).not.toBe(value);
  68 |   await page.keyboard.press('Escape');await page.keyboard.press('Tab');await page.mouse.move(1790,1090);
  69 |   expect((await state()).before).toBe('0');
  70 | });
  71 | 
  72 | for(const scene of ['R1','R4','S5']) test(`${scene} whole account receives keyboard focus and opens the existing local feedback`,async({page})=>{
  73 |  const root=await open(page,scene),rail=await setMode(root,'expanded'),account=rail.getByRole('button',{name:'当前账户：林老师',exact:true});
  74 |  await account.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');await expect(account).toBeFocused();
  75 |  expect(await account.evaluate(e=>e.matches(':focus-visible'))).toBe(true);await page.keyboard.press('Enter');
  76 |  if(scene==='R1') {await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(account).toBeFocused();}
  77 |  else await expect(root.getByRole('status').filter({hasText:scene==='R4'?'账户入口示例。':'账户为本地入口示例；未连接身份服务。'})).toBeVisible();
  78 | });
  79 | 
```