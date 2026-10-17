# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-platform.spec.ts >> S2 platform follows the common light and dark contract in both modes
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
    - generic [ref=e40]: 轻品牌
    - generic "未勾选时使用轻品牌外框" [ref=e41]:
      - checkbox "深色外框" [ref=e42]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e43] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#S2
  - generic "R3 工作区" [ref=e47]:
    - generic "当前工作区与区域恢复" [ref=e48]:
      - generic "显示与隐藏区域" [ref=e49]:
        - button "展开平台导航" [ref=e50] [cursor=pointer]
        - button "隐藏资源目录" [expanded] [ref=e52] [cursor=pointer]
      - generic [ref=e55]:
        - strong [ref=e56]: 错题集 · 1.2 极限与连续
        - generic [ref=e57]: 当前范围不随目录隐藏改变
      - button "专注内容" [ref=e58] [cursor=pointer]
      - button "布局设置" [ref=e62] [cursor=pointer]:
        - generic [ref=e64]: 布局
    - generic [ref=e67]:
      - generic "平台导航" [ref=e69]:
        - generic [ref=e70]:
          - generic [ref=e71]:
            - strong [ref=e72]
            - button "展开平台导航" [ref=e74] [cursor=pointer]
          - navigation "平台功能" [ref=e77]:
            - list [ref=e78]:
              - listitem [ref=e79]:
                - link "工作台" [ref=e81] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e84]:
                - link "课程" [ref=e86] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e89]:
                - link "资源" [ref=e91] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e94]:
                - link "专业" [ref=e96] [cursor=pointer]:
                  - /url: "#navigation-v042"
          - generic [ref=e99]:
            - button "当前账户：林老师" [ref=e100] [cursor=pointer]
            - button "通知" [ref=e103] [cursor=pointer]
            - button "帮助" [ref=e105] [cursor=pointer]
      - generic [ref=e107]:
        - generic [ref=e108]:
          - generic [ref=e109]:
            - strong [ref=e112]: 我的资源
            - button "切换资源空间" [ref=e113] [cursor=pointer]
          - navigation "资源功能" [ref=e116]:
            - generic [ref=e117]:
              - link "云盘" [ref=e118] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "题库" [ref=e122] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "课件库" [ref=e126] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "试卷库" [ref=e130] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "问卷库" [ref=e134] [cursor=pointer]:
                - /url: "#navigation-v042"
          - button "成员" [ref=e139] [cursor=pointer]
        - generic [ref=e145]:
          - generic "资源目录" [ref=e147]:
            - heading [level=3] [ref=e148]:
              - text: 资源目录
              - generic [ref=e149]:
                - button "取消固定资源目录" [ref=e150] [cursor=pointer]
                - button "隐藏资源目录" [ref=e153] [cursor=pointer]
            - generic [ref=e156]:
              - heading "错题集" [level=4] [ref=e157]
              - paragraph [ref=e158]: 练习结果不影响原始成绩
            - generic [ref=e159]:
              - generic "分区导航" [ref=e160]:
                - tablist "目录内容" [ref=e164]:
                  - tab "学习目录" [selected] [ref=e165] [cursor=pointer]
                  - tab "学习日志" [ref=e169] [cursor=pointer]
              - tabpanel "学习目录" [ref=e174]:
                - tree "学习目录导航" [ref=e175]:
                  - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e176]:
                    - generic [ref=e177]:
                      - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e178] [cursor=pointer]
                      - generic "第一章 · 函数、极限与连续" [ref=e183]
                      - generic [ref=e184]: "20"
                  - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e185]:
                    - generic [ref=e186]:
                      - button "收起1.1 函数的基本概念" [expanded] [ref=e187] [cursor=pointer]
                      - generic "1.1 函数的基本概念" [ref=e192]
                      - generic [ref=e193]: "6"
                  - treeitem "函数的定义与表示" [level=3] [ref=e194]:
                    - generic [ref=e195]:
                      - generic [ref=e196]: 讲义
                      - generic "函数的定义与表示" [ref=e203]
                      - generic [ref=e204]: "2"
                  - treeitem "函数的性质" [level=3] [ref=e205]:
                    - generic [ref=e206]:
                      - generic [ref=e207]: 视频
                      - generic "函数的性质" [ref=e214]
                      - generic [ref=e215]: "4"
                  - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e216]:
                    - generic [ref=e217]:
                      - button "收起1.2 极限与连续" [expanded] [ref=e218] [cursor=pointer]
                      - generic "1.2 极限与连续" [ref=e223]
                      - generic [ref=e224]: "8"
                  - treeitem "数列极限" [expanded] [level=3] [ref=e225]:
                    - generic [ref=e226]:
                      - button "收起数列极限" [expanded] [ref=e227] [cursor=pointer]
                      - generic "数列极限" [ref=e232]
                      - generic [ref=e233]: "3"
                  - treeitem "极限的定义" [level=4] [ref=e234]:
                    - generic [ref=e235]:
                      - generic [ref=e236]: 讲义
                      - generic "极限的定义" [ref=e243]
                      - generic [ref=e244]: "1"
                  - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e245]:
                    - generic [ref=e246]:
                      - button "收起收敛性与极限运算" [expanded] [ref=e247] [cursor=pointer]
                      - generic "收敛性与极限运算" [ref=e252]
                      - generic [ref=e253]: "2"
                  - treeitem "两个重要极限" [expanded] [level=5] [ref=e254]:
                    - generic [ref=e255]:
                      - button "收起两个重要极限" [expanded] [ref=e256] [cursor=pointer]
                      - generic "两个重要极限" [ref=e261]
                      - generic [ref=e262]: "2"
                  - treeitem "常见题型与方法" [expanded] [level=6] [ref=e263]:
                    - generic [ref=e264]:
                      - button "收起常见题型与方法" [expanded] [ref=e265] [cursor=pointer]
                      - generic "常见题型与方法" [ref=e270]
                      - generic [ref=e271]: "2"
                  - treeitem "例题与拓展练习" [level=7] [ref=e272]:
                    - generic [ref=e273]:
                      - generic [ref=e274]: 作业
                      - generic "例题与拓展练习" [ref=e281]
                      - generic [ref=e282]: "2"
                  - treeitem "函数的连续性" [level=3] [ref=e283]:
                    - generic [ref=e284]:
                      - generic [ref=e285]: 讲义
                      - generic "函数的连续性" [ref=e292]
                      - generic [ref=e293]: "5"
                  - treeitem "1.3 习题与应用" [level=2] [ref=e294]:
                    - generic [ref=e295]:
                      - generic [ref=e296]: 作业
                      - generic "1.3 习题与应用" [ref=e303]
                      - generic [ref=e304]: "6"
                  - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e305]:
                    - generic [ref=e306]:
                      - button "收起第二章 · 导数与微分" [expanded] [ref=e307] [cursor=pointer]
                      - generic "第二章 · 导数与微分" [ref=e312]
                      - generic [ref=e313]: "16"
                  - treeitem "2.1 导数的概念" [level=2] [ref=e314]:
                    - generic [ref=e315]:
                      - generic [ref=e316]: 讲义
                      - generic "2.1 导数的概念" [ref=e323]
                      - generic [ref=e324]: "8"
                  - treeitem "2.2 导数的应用" [level=2] [ref=e325]:
                    - generic [ref=e326]:
                      - generic [ref=e327]: 考试
                      - generic "2.2 导数的应用" [ref=e334]
                      - generic [ref=e335]: "8"
                  - generic [ref=e336]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                  - status [ref=e337]
          - separator "调整资源目录宽度" [ref=e338]
          - generic [ref=e340]:
            - generic [ref=e341]:
              - generic "资源路径" [ref=e342]:
                - navigation "面包屑" [ref=e343]:
                  - list [ref=e344]:
                    - listitem [ref=e345]:
                      - generic [ref=e346]: 学习目录
                    - listitem [ref=e347]:
                      - generic [ref=e348]: /
                      - generic [ref=e349]: 第一章 · 函数、极限与连续
                    - listitem [ref=e350]:
                      - generic [ref=e351]: /
                      - generic [ref=e352]: 1.2 极限与连续
              - generic [ref=e353]:
                - generic [ref=e354]:
                  - heading "1.2 极限与连续" [level=3] [ref=e355]
                  - paragraph [ref=e356]: 基于当前知识范围整理练习状态。
                - button "开始练习" [ref=e357] [cursor=pointer]
            - generic [ref=e361]:
              - radiogroup "习题练习状态" [ref=e363]:
                - generic [ref=e365]:
                  - generic [ref=e366] [cursor=pointer]:
                    - radio "全部" [checked] [ref=e367]
                    - generic [ref=e368]: 全部
                    - generic [ref=e369]: "6"
                  - generic [ref=e370] [cursor=pointer]:
                    - radio "未练对" [ref=e371]
                    - generic [ref=e372]: 未练对
                    - generic [ref=e373]: "4"
                  - generic [ref=e374] [cursor=pointer]:
                    - radio "已练对" [ref=e375]
                    - generic [ref=e376]: 已练对
                    - generic [ref=e377]: "2"
                  - generic [ref=e378] [cursor=pointer]:
                    - radio "加星" [ref=e379]
                    - generic [ref=e380]: 加星
                    - generic [ref=e381]: "3"
              - generic [ref=e382]:
                - generic [ref=e383]: 当前范围 · 6 道示例习题
                - textbox "搜索习题内容" [ref=e387]
              - table "当前范围习题" [ref=e389]:
                - rowgroup [ref=e390]:
                  - row [ref=e391]:
                    - columnheader "序号" [ref=e392]
                    - columnheader "题型" [ref=e393]
                    - columnheader "习题内容" [ref=e394]
                    - columnheader "难度" [ref=e395]
                    - columnheader "来源" [ref=e396]
                    - columnheader "加星" [ref=e397]
                - rowgroup [ref=e398]:
                  - row [ref=e399]:
                    - cell "1" [ref=e400]
                    - cell "单选" [ref=e401]
                    - cell "若函数在某点可导，以下关于该点连续性的结论正确的是？" [ref=e405]
                    - cell "基础" [ref=e406]
                    - cell "试卷" [ref=e407]
                    - cell [ref=e411]:
                      - button "取消加星 · 第 1 题" [pressed] [ref=e412] [cursor=pointer]
                  - row [ref=e414]:
                    - cell "2" [ref=e415]
                    - cell "多选" [ref=e416]
                    - cell "下列关于极限运算法则的表述中，哪些条件是必要的？" [ref=e420]
                    - cell "中等" [ref=e421]
                    - cell "作业" [ref=e422]
                    - cell [ref=e426]:
                      - button "添加加星 · 第 2 题" [ref=e427] [cursor=pointer]
                  - row [ref=e429]:
                    - cell "3" [ref=e430]
                    - cell "判断" [ref=e431]
                    - cell "函数在某一点连续，则该函数在该点一定可导。" [ref=e435]
                    - cell "基础" [ref=e436]
                    - cell "课堂" [ref=e437]
                    - cell [ref=e441]:
                      - button "添加加星 · 第 3 题" [ref=e442] [cursor=pointer]
                  - row [ref=e444]:
                    - cell "4" [ref=e445]
                    - cell "单选" [ref=e446]
                    - cell "在下列区间中，函数满足闭区间上连续函数性质的是？" [ref=e450]
                    - cell "中等" [ref=e451]
                    - cell "试卷" [ref=e452]
                    - cell [ref=e456]:
                      - button "取消加星 · 第 4 题" [pressed] [ref=e457] [cursor=pointer]
                  - row [ref=e459]:
                    - cell "5" [ref=e460]
                    - cell "填空" [ref=e461]
                    - cell "根据导数的定义，写出给定函数在指定点的导数表达式。" [ref=e465]
                    - cell "提升" [ref=e466]
                    - cell "作业" [ref=e467]
                    - cell [ref=e471]:
                      - button "取消加星 · 第 5 题" [pressed] [ref=e472] [cursor=pointer]
                  - row [ref=e474]:
                    - cell "6" [ref=e475]
                    - cell "多选" [ref=e476]
                    - cell "以下哪些情形可以使用洛必达法则计算函数的极限？" [ref=e480]
                    - cell "中等" [ref=e481]
                    - cell "课堂" [ref=e482]
                    - cell [ref=e486]:
                      - button "添加加星 · 第 6 题" [ref=e487] [cursor=pointer]
              - generic [ref=e489]:
                - generic [ref=e490]: 状态筛选不等于内容页面层级
                - generic [ref=e491]: 1 · 单页演示数据
              - status [ref=e492]
  - generic [ref=e493]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
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