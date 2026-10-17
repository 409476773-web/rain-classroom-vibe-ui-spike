# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-platform.spec.ts >> S1 platform follows the common light and dark contract in both modes
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
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#S1
  - generic "R1 工作区" [ref=e47]:
    - generic "当前工作区与区域恢复" [ref=e48]:
      - generic "显示与隐藏区域" [ref=e49]:
        - button "展开平台导航" [ref=e50] [cursor=pointer]
        - button "隐藏专业导航" [expanded] [ref=e52] [cursor=pointer]
      - generic [ref=e55]:
        - strong [ref=e56]: 软件工程专业
        - generic [ref=e57]: 课程体系诊断
      - button "专注内容" [ref=e58] [cursor=pointer]
      - button "布局设置" [ref=e62] [cursor=pointer]:
        - generic [ref=e64]: 布局
    - generic [ref=e67]:
      - generic "平台导航" [ref=e69]:
        - generic [ref=e70]:
          - generic [ref=e71]:
            - strong [ref=e72]
            - button "展开平台导航" [active] [ref=e74] [cursor=pointer]
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
            - strong [ref=e112]: 软件工程专业
            - button "切换专业" [ref=e113] [cursor=pointer]
          - navigation "专业功能" [ref=e116]:
            - generic [ref=e117]:
              - link "培养方案" [ref=e118] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "专业引擎" [ref=e122] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "产教模型" [ref=e126] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "专业应用" [ref=e130] [cursor=pointer]:
                - /url: "#navigation-v042"
              - link "决策中心" [ref=e134] [cursor=pointer]:
                - /url: "#navigation-v042"
          - button "成员" [ref=e139] [cursor=pointer]
        - generic [ref=e145]:
          - generic "专业导航" [ref=e147]:
            - heading [level=3] [ref=e148]:
              - text: 专业导航
              - generic [ref=e149]:
                - button "取消固定专业导航" [ref=e150] [cursor=pointer]
                - button "隐藏专业导航" [ref=e153] [cursor=pointer]
            - generic [ref=e156]: PROFESSIONAL WORKSPACE
            - heading "专业建设" [level=4] [ref=e157]
            - paragraph [ref=e158]: 2026 秋季 · 建设与分析
            - generic [ref=e159]:
              - heading "专业建设治理" [level=5] [ref=e160]
              - navigation "专业建设治理" [ref=e161]:
                - list [ref=e162]:
                  - listitem [ref=e163]:
                    - link "培养方案分析" [ref=e165] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e168]:
                    - link "课程体系诊断" [ref=e170] [cursor=pointer]:
                      - /url: "#navigation-v042"
            - generic [ref=e173]:
              - heading "质量监控" [level=5] [ref=e174]
              - navigation "质量监控" [ref=e175]:
                - list [ref=e176]:
                  - listitem [ref=e177]:
                    - link "专业达成度分析" [ref=e179] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e182]:
                    - link "学生培养分析" [ref=e184] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e187]:
                    - link "专业改进建议" [ref=e189] [cursor=pointer]:
                      - /url: "#navigation-v042"
            - generic [ref=e192]:
              - heading "运行记录" [level=5] [ref=e193]
              - navigation "运行记录" [ref=e194]:
                - list [ref=e195]:
                  - listitem [ref=e196]:
                    - link "应用洞察" [ref=e198] [cursor=pointer]:
                      - /url: "#navigation-v042"
                  - listitem [ref=e201]:
                    - link "建设记录" [ref=e203] [cursor=pointer]:
                      - /url: "#navigation-v042"
            - generic [ref=e206]: 当前专业内的功能入口
          - separator "调整专业导航宽度" [ref=e207]
          - generic [ref=e209]:
            - generic [ref=e210]:
              - navigation "面包屑" [ref=e211]:
                - list [ref=e212]:
                  - listitem [ref=e213]:
                    - generic [ref=e214]: 培养方案
                  - listitem [ref=e215]:
                    - generic [ref=e216]: /
                    - generic [ref=e217]: 课程体系诊断
              - generic [ref=e218]:
                - heading "课程体系诊断" [level=3] [ref=e219]
                - button "重新分析" [ref=e220] [cursor=pointer]
              - paragraph [ref=e224]: 以课程之间的关联，检查培养方案的一致性。
            - generic [ref=e225]:
              - generic [ref=e226]:
                - generic "分区导航" [ref=e227]:
                  - tablist "专业分析" [ref=e231]:
                    - tab "课程交叉分析" [selected] [ref=e232] [cursor=pointer]
                    - tab "学分结构" [ref=e236] [cursor=pointer]
                    - tab "能力覆盖" [ref=e240] [cursor=pointer]
                - tabpanel "课程交叉分析" [ref=e245]:
                  - generic [ref=e246]:
                    - button "2026 版培养方案" [ref=e247] [cursor=pointer]
                    - generic [ref=e248]: 分析结果为示例 · 不代表真实课程数据
                  - generic [ref=e249]:
                    - generic [ref=e250]:
                      - generic [ref=e251]: 课程总数
                      - strong [ref=e252]: "12"
                      - generic [ref=e253]: 12 门课程纳入分析
                    - generic [ref=e254]:
                      - generic [ref=e255]: 先修依赖关系
                      - strong [ref=e256]: "19"
                      - generic [ref=e257]: 覆盖 3 个学习阶段
                    - generic [ref=e258]:
                      - generic [ref=e259]: 能力覆盖
                      - strong [ref=e260]: 92%
                      - generic [ref=e261]: 以课程目标为依据
                  - generic [ref=e262]:
                    - heading "课程交叉关系" [level=4] [ref=e263]
                    - generic [ref=e264]: 当前专业 · 2026 版
                  - generic [ref=e265]:
                    - img "课程交叉关系布局示意，非真实分析结果" [ref=e266]:
                      - generic [ref=e274]:
                        - generic [ref=e277]: "1"
                        - generic [ref=e278]: 高等数学
                        - generic [ref=e279]: 12 学分
                      - generic [ref=e280]:
                        - generic [ref=e283]: "2"
                        - generic [ref=e284]: 大学物理
                        - generic [ref=e285]: 8 学分
                      - generic [ref=e286]:
                        - generic [ref=e289]: "3"
                        - generic [ref=e290]: 工程数学
                        - generic [ref=e291]: 6 学分
                      - generic [ref=e292]:
                        - generic [ref=e295]: "4"
                        - generic [ref=e296]: 数据结构
                        - generic [ref=e297]: 4 学分
                      - generic [ref=e298]:
                        - generic [ref=e301]: "5"
                        - generic [ref=e302]: 工程实践
                        - generic [ref=e303]: 3 学分
                    - generic [ref=e304]: 布局示意 · 实线：先修关系 虚线：内容关联
              - status [ref=e305]
  - generic [ref=e306]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
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