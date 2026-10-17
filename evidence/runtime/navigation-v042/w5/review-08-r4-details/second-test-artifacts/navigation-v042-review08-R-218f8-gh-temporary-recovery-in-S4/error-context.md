# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review08.spec.ts >> Review08 local feedback >> small pin and hide controls preserve selection through temporary recovery in S4
- Location: tests/e2e/navigation-v042-review08.spec.ts:42:3

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator: locator('[data-recipe-id="recipe-navigation-r4"]').getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '探索者小组', exact: true })
Expected: "true"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-recipe-id="recipe-navigation-r4"]').getByRole('group', { name: '小组结果', exact: true }).getByRole('button', { name: '探索者小组', exact: true })

```

```yaml
- main:
  - link "返回组件库":
    - /url: "#components"
  - heading "导航组件 · v0.4.2" [level=1]
  - link "R2 独立消费样本 ↗":
    - /url: /navigation-v042-consumer.html
  - link "W3 独立消费样本 ↗":
    - /url: /navigation-v042-w3-consumer.html
  - paragraph: A1 · A4 · R2 人工视觉已通过 W3–W5 组合建设 · G2 待评审
  - navigation "导航候选样本":
    - button "A1"
    - button "A2"
    - button "A3"
    - button "A4"
    - button "A5"
    - button "Contents"
    - button "White"
    - button "Connections"
    - button "R1"
    - button "R2"
    - button "R3"
    - button "R4"
    - button "R5"
    - button "R6"
    - button "S1"
    - button "S2"
    - button "S3"
    - button "S4"
    - button "S5"
    - button "S6"
  - text: 画板宽度
  - combobox "画板宽度":
    - option "1200"
    - option "1440" [selected]
    - option "1600"
  - text: 连接
  - combobox "连接":
    - option "内缩 inset" [selected]
    - option "贴边 merged"
  - text: 表面
  - combobox "表面":
    - option "中性底" [selected]
    - option "白底轮廓"
  - text: 可见范围
  - combobox "可见范围":
    - option "3"
    - option "4" [selected]
    - option "5"
  - text: 业务子场景
  - combobox "业务子场景":
    - option "课堂互动" [selected]
    - option "教师批改"
  - checkbox "深色外框"
  - text: 深色外框
  - link "打开认可原稿 ↗":
    - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#S4
  - button "展开平台导航"
  - button "关闭临时课堂功能" [expanded]: 关闭课堂功能
  - button "显示小组列表"
  - strong: 辩论赛：大学校园是否应该免费开放
  - text: 探索者小组 · 智能汇报
  - button "专注内容"
  - button "布局设置": 布局
  - button "展开平台导航"
  - navigation "平台功能":
    - list:
      - listitem:
        - link "工作台":
          - /url: "#navigation-v042"
      - listitem:
        - link "课程":
          - /url: "#navigation-v042"
      - listitem:
        - link "资源":
          - /url: "#navigation-v042"
      - listitem:
        - link "专业":
          - /url: "#navigation-v042"
  - button "通知"
  - button "帮助"
  - button "当前账户：林老师"
  - strong: 大学物理 · 第九章课堂回顾
  - text: 2026-09-24 11:21
  - button "导出数据"
  - strong: 课堂功能
  - button "固定课堂功能"
  - button "隐藏课堂功能"
  - heading "课堂数据" [level=4]
  - navigation "课堂功能":
    - list:
      - listitem:
        - link "综合数据":
          - /url: "#navigation-v042"
      - listitem:
        - link "学生表现":
          - /url: "#navigation-v042"
      - listitem:
        - link "课堂习题":
          - /url: "#navigation-v042"
      - listitem:
        - link "课堂互动":
          - /url: "#navigation-v042"
      - listitem:
        - link "教学内容":
          - /url: "#navigation-v042"
  - text: 课堂范围内的功能导航
  - main:
    - tablist "课堂互动内容":
      - tab "投稿"
      - tab "随机点名"
      - tab "分组讨论"
      - tab "智能汇报" [selected]
    - tabpanel "智能汇报":
      - group "课堂活动":
        - list:
          - listitem:
            - button "辩论赛：大学校园是否应该免费开放" [pressed]:
              - text: 辩论赛：大学校园是否应该免费开放 6 组已完成 · 21 分钟
              - progressbar "辩论赛：大学校园是否应该免费开放完成进度": 完成 75%
          - listitem:
            - button "小组汇报：从概念到真实应用":
              - text: 小组汇报：从概念到真实应用 8 组已完成 · 36 分钟
              - progressbar "小组汇报：从概念到真实应用完成进度": 完成 100%
      - article:
        - img "探索者小组成员"
        - heading "探索者小组" [level=3]
        - paragraph: 辩论赛：大学校园是否应该免费开放 · 已提交
        - text: 8.5 / 10
        - heading "讨论摘要 示例" [level=4]
        - paragraph: 本组从资源容量、安全管理和开放边界三个方面展开分析。预约规则应公开，教学区域与公共区域应有清楚的区别。
        - text: 论据充分 观点组织
        - heading "最终结论" [level=4]
        - paragraph: 本组从资源容量、安全管理和开放边界三个方面展开分析。预约规则应公开，教学区域与公共区域应有清楚的区别。
        - heading "讨论过程 3 条示例" [level=4]
        - text: 林可 11:32
        - paragraph: 我们先把问题分为几个独立的方面，再分别寻找依据。
        - text: 陈宁 11:35
        - paragraph: 这份结论需要明确实施条件与适用的边界。
        - text: 周晓 11:38
        - paragraph: 可以将上述分析整理为可执行的方案，再与其他组比较。
  - text: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import {expect,test,type Locator,type Page} from '@playwright/test';
  2  | import {mkdirSync,writeFileSync} from 'node:fs';
  3  | import {resolve} from 'node:path';
  4  | 
  5  | const evidence=resolve('evidence/runtime/navigation-v042/w5/review-08-r4-details');
  6  | const capture=process.env.R4_DETAILS_CAPTURE;
  7  | const open=async(page:Page,sample='R4',width=1440,scene='interaction')=>{
  8  |   await page.goto(`/?sample=${sample}#navigation-v042`);
  9  |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption(scene);
  10 |   await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));
  11 |   const root=page.locator('[data-recipe-id="recipe-navigation-r4"]');await expect(root).toBeVisible();return root;
  12 | };
  13 | const metrics=(root:Locator)=>root.evaluate(el=>{
  14 |   const rect=(node:Element)=>{const r=node.getBoundingClientRect();return {width:r.width,height:r.height};};
  15 |   const label=el.querySelector('.nv5-class-context>h4')!;
  16 |   const row=el.querySelector('.nv5-group-objects [data-active="true"] .rain-navigation-family__row')!;
  17 |   return {headers:Array.from(el.querySelectorAll('.nv5-region-head>[data-rain-id="ui-icon-button"]')).map(button=>({name:button.getAttribute('aria-label'),size:button.getAttribute('data-size'),target:rect(button),icon:rect(button.querySelector('[data-slot="icon"]')!)})),label:{weight:getComputedStyle(label).fontWeight,color:getComputedStyle(label).color},selected:{text:row.textContent,background:getComputedStyle(row).backgroundColor},tokens:{brandAlpha:getComputedStyle(row).getPropertyValue('--rain-category-fill-brand-alpha-3').trim(),label:getComputedStyle(label).getPropertyValue('--rain-category-text-neutral-6').trim()}};
  18 | });
  19 | const tokenColor=(root:Locator,token:string)=>root.evaluate((el,token)=>{const probe=document.createElement('span');probe.style.color=`var(${token})`;probe.style.visibility='hidden';el.append(probe);const color=getComputedStyle(probe).color;probe.remove();return color;},token);
  20 | const settle=async(page:Page,root:Locator)=>{await root.locator('img').evaluateAll(async images=>{await Promise.all(images.map(async img=>{try{await (img as HTMLImageElement).decode();}catch{}}));});await page.mouse.move(1790,1090);};
  21 | 
  22 | test('capture review08 before or after at all existing canvas widths',async({page})=>{
  23 |   test.skip(!capture,'Separate immutable visual evidence capture.');
  24 |   const dir=resolve(evidence,capture!);mkdirSync(dir,{recursive:true});const cases:Record<string,unknown>={};
  25 |   for(const width of [1200,1440,1600]){const root=await open(page,'R4',width);await settle(page,root);cases[`R4-${width}`]=await metrics(root);await root.screenshot({path:resolve(dir,`R4-${width}.png`)});}
  26 |   const root=await open(page,'S4');await settle(page,root);cases.S4=await metrics(root);await root.screenshot({path:resolve(dir,'S4-1440.png')});
  27 |   writeFileSync(resolve(dir,'measurements.json'),JSON.stringify({recordedAt:new Date().toISOString(),cases},null,2));
  28 | });
  29 | test.describe('Review08 local feedback',()=>{
  30 |   test.skip(Boolean(capture),'Assertions are separate from before/after evidence.');
  31 |   for(const width of [1200,1440,1600])test(`smaller header icons retain usable targets and selected group theme at ${width}`,async({page})=>{
  32 |     const root=await open(page,'R4',width),now=await metrics(root);expect(now.headers).toHaveLength(4);
  33 |     for(const button of now.headers){expect(button.size).toBe('32/14');expect(button.target).toEqual({width:32,height:32});expect(button.icon).toEqual({width:14,height:14});}
  34 |     expect(now.label.weight).toBe('400');expect(now.label.color).toBe(await tokenColor(root,'--rain-category-text-neutral-6'));
  35 |     expect(now.selected.background).toBe(await tokenColor(root,'--rain-category-fill-brand-alpha-3'));expect(now.selected.background).toMatch(/^rgba\(/);
  36 |     const rows=root.getByRole('group',{name:'小组结果',exact:true}),selected=rows.getByRole('button',{name:'第一小分队',exact:true}),other=rows.getByRole('button',{name:'探索者小组',exact:true});
  37 |     await selected.hover();expect((await metrics(root)).selected.background).toBe(now.selected.background);
  38 |     await other.focus();await page.keyboard.press('Enter');await expect(other).toHaveAttribute('aria-pressed','true');await expect(selected).toHaveAttribute('aria-pressed','false');
  39 |     await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();await expect(root.getByLabel('当前小组得分')).toContainText('8.5');
  40 |     expect((await metrics(root)).selected.background).toBe(now.selected.background);
  41 |   });
  42 |   test('small pin and hide controls preserve selection through temporary recovery in S4',async({page})=>{
  43 |     const root=await open(page,'S4'),queue=root.locator('.rain-workspace__region[data-region-id="queue"]'),context=root.locator('.rain-workspace__region[data-region-id="context"]');
  44 |     const other=root.getByRole('group',{name:'小组结果',exact:true}).getByRole('button',{name:'探索者小组',exact:true});await other.click();
  45 |     for(const [pane,label,id] of [[queue,'小组列表','queue'],[context,'课堂功能','context']] as const){
  46 |       await pane.getByRole('button',{name:`取消固定${label}`,exact:true}).click();await expect(pane).toHaveAttribute('data-temporary','true');
  47 |       const pin=pane.getByRole('button',{name:`固定${label}`,exact:true});await expect(pin).toHaveAttribute('data-size','32/14');await pin.focus();await page.keyboard.press('Enter');await expect(pane).toHaveAttribute('data-temporary','false');
  48 |       const hide=pane.getByRole('button',{name:`隐藏${label}`,exact:true});await hide.focus();await page.keyboard.press('Enter');await expect(pane).toBeHidden();
  49 |       await root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`).first().click();await expect(pane).toBeVisible();
  50 |     }
> 51 |     await expect(other).toHaveAttribute('aria-pressed','true');await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();
     |                         ^ Error: expect(locator).toHaveAttribute(expected) failed
  52 |     expect((await metrics(root)).label.weight).toBe('400');
  53 |   });
  54 |   test('shared RegionHead defaults stay at 32/18 in grading, replay and documents',async({page})=>{
  55 |     await open(page,'R4',1440,'grading');
  56 |     for(const sample of ['R4','R5','R6']){
  57 |       if(sample!=='R4'){await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:sample,exact:true}).click();}
  58 |       const controls=page.getByTestId('candidate-canvas').locator('.nv5-region-head>[data-rain-id="ui-icon-button"]');expect(await controls.count()).toBeGreaterThan(0);
  59 |       for(const button of await controls.all()){await expect(button).toHaveAttribute('data-size','32/18');expect(await button.locator('[data-slot="icon"]').evaluate(el=>el.getBoundingClientRect().width)).toBe(18);}
  60 |     }
  61 |   });
  62 | });
  63 | 
```