# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-platform.spec.ts >> R1 platform follows the common light and dark contract in both modes
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
        - option "课程体系诊断" [selected]
        - option "产业链图谱"
    - generic [ref=e42]: 轻品牌
    - generic "未勾选时使用轻品牌外框" [ref=e43]:
      - checkbox "深色外框" [ref=e44]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e45] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R1
  - generic "R1 工作区" [ref=e48]:
    - generic [ref=e50]:
      - generic [ref=e51]:
        - button "展开平台导航" [ref=e52] [cursor=pointer]
        - button "隐藏专业导航" [expanded] [ref=e54] [cursor=pointer]
        - generic [ref=e56]:
          - strong [ref=e57]: 软件工程专业
          - generic [ref=e58]: 课程体系诊断
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
              - strong [ref=e106]: 软件工程专业
              - button "切换专业" [ref=e107] [cursor=pointer]
            - navigation "专业功能" [ref=e110]:
              - generic [ref=e111]:
                - link "培养方案" [ref=e112] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "专业引擎" [ref=e116] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "产教模型" [ref=e120] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "专业应用" [ref=e124] [cursor=pointer]:
                  - /url: "#navigation-v042"
                - link "决策中心" [ref=e128] [cursor=pointer]:
                  - /url: "#navigation-v042"
            - button "成员" [ref=e133] [cursor=pointer]
          - generic [ref=e139]:
            - generic "专业导航" [ref=e141]:
              - heading [level=3] [ref=e142]:
                - text: 专业导航
                - generic [ref=e143]:
                  - button "取消固定专业导航" [ref=e144] [cursor=pointer]
                  - button "隐藏专业导航" [ref=e147] [cursor=pointer]
              - generic [ref=e150]: PROFESSIONAL WORKSPACE
              - heading "专业建设" [level=4] [ref=e151]
              - paragraph [ref=e152]: 2026 秋季 · 建设与分析
              - generic [ref=e153]:
                - heading "专业建设治理" [level=5] [ref=e154]
                - navigation "专业建设治理" [ref=e155]:
                  - list [ref=e156]:
                    - listitem [ref=e157]:
                      - link "培养方案分析" [ref=e159] [cursor=pointer]:
                        - /url: "#navigation-v042"
                    - listitem [ref=e162]:
                      - link "课程体系诊断" [ref=e164] [cursor=pointer]:
                        - /url: "#navigation-v042"
              - generic [ref=e167]:
                - heading "质量监控" [level=5] [ref=e168]
                - navigation "质量监控" [ref=e169]:
                  - list [ref=e170]:
                    - listitem [ref=e171]:
                      - link "专业达成度分析" [ref=e173] [cursor=pointer]:
                        - /url: "#navigation-v042"
                    - listitem [ref=e176]:
                      - link "学生培养分析" [ref=e178] [cursor=pointer]:
                        - /url: "#navigation-v042"
                    - listitem [ref=e181]:
                      - link "专业改进建议" [ref=e183] [cursor=pointer]:
                        - /url: "#navigation-v042"
              - generic [ref=e186]:
                - heading "运行记录" [level=5] [ref=e187]
                - navigation "运行记录" [ref=e188]:
                  - list [ref=e189]:
                    - listitem [ref=e190]:
                      - link "应用洞察" [ref=e192] [cursor=pointer]:
                        - /url: "#navigation-v042"
                    - listitem [ref=e195]:
                      - link "建设记录" [ref=e197] [cursor=pointer]:
                        - /url: "#navigation-v042"
              - generic [ref=e200]: 当前专业内的功能入口
            - separator "调整专业导航宽度" [ref=e201]
            - generic [ref=e203]:
              - generic [ref=e204]:
                - navigation "面包屑" [ref=e205]:
                  - list [ref=e206]:
                    - listitem [ref=e207]:
                      - generic [ref=e208]: 培养方案
                    - listitem [ref=e209]:
                      - generic [ref=e210]: /
                      - generic [ref=e211]: 课程体系诊断
                - generic [ref=e212]:
                  - heading "课程体系诊断" [level=3] [ref=e213]
                  - button "重新分析" [ref=e214] [cursor=pointer]
                - paragraph [ref=e218]: 以课程之间的关联，检查培养方案的一致性。
              - generic [ref=e219]:
                - generic [ref=e220]:
                  - generic "分区导航" [ref=e221]:
                    - tablist "专业分析" [ref=e225]:
                      - tab "课程交叉分析" [selected] [ref=e226] [cursor=pointer]
                      - tab "学分结构" [ref=e230] [cursor=pointer]
                      - tab "能力覆盖" [ref=e234] [cursor=pointer]
                  - tabpanel "课程交叉分析" [ref=e239]:
                    - generic [ref=e240]:
                      - button "2026 版培养方案" [ref=e241] [cursor=pointer]
                      - generic [ref=e242]: 分析结果为示例 · 不代表真实课程数据
                    - generic [ref=e243]:
                      - generic [ref=e244]:
                        - generic [ref=e245]: 课程总数
                        - strong [ref=e246]: "12"
                        - generic [ref=e247]: 12 门课程纳入分析
                      - generic [ref=e248]:
                        - generic [ref=e249]: 先修依赖关系
                        - strong [ref=e250]: "19"
                        - generic [ref=e251]: 覆盖 3 个学习阶段
                      - generic [ref=e252]:
                        - generic [ref=e253]: 能力覆盖
                        - strong [ref=e254]: 92%
                        - generic [ref=e255]: 以课程目标为依据
                    - generic [ref=e256]:
                      - heading "课程交叉关系" [level=4] [ref=e257]
                      - generic [ref=e258]: 当前专业 · 2026 版
                    - generic [ref=e259]:
                      - img "课程交叉关系布局示意，非真实分析结果" [ref=e260]:
                        - generic [ref=e268]:
                          - generic [ref=e271]: "1"
                          - generic [ref=e272]: 高等数学
                          - generic [ref=e273]: 12 学分
                        - generic [ref=e274]:
                          - generic [ref=e277]: "2"
                          - generic [ref=e278]: 大学物理
                          - generic [ref=e279]: 8 学分
                        - generic [ref=e280]:
                          - generic [ref=e283]: "3"
                          - generic [ref=e284]: 工程数学
                          - generic [ref=e285]: 6 学分
                        - generic [ref=e286]:
                          - generic [ref=e289]: "4"
                          - generic [ref=e290]: 数据结构
                          - generic [ref=e291]: 4 学分
                        - generic [ref=e292]:
                          - generic [ref=e295]: "5"
                          - generic [ref=e296]: 工程实践
                          - generic [ref=e297]: 3 学分
                      - generic [ref=e298]: 布局示意 · 实线：先修关系 虚线：内容关联
                - status [ref=e299]
  - generic [ref=e300]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
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