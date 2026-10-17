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

Locator: locator('[data-recipe-id="recipe-navigation-r4"]').locator('[data-region-id="queue"]')
Expected: "true"
Error: strict mode violation: locator('[data-recipe-id="recipe-navigation-r4"]').locator('[data-region-id="queue"]') resolved to 2 elements:
    1) <div data-side="start" aria-label="小组列表" data-mode="hidden" data-forced="false" data-temporary="true" data-region-id="queue" id="_r_1_-workspace-queue" class="rain-workspace__region nv5-queue">…</div> aka getByLabel('小组列表', { exact: true })
    2) <div hidden="" tabindex="-1" role="separator" aria-valuemin="212" aria-valuemax="320" aria-valuenow="240" aria-label="调整小组列表宽度" data-region-id="queue" aria-orientation="vertical" class="rain-workspace__splitter " aria-controls="_r_1_-workspace-queue"></div> aka getByLabel('调整小组列表宽度')

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for locator('[data-recipe-id="recipe-navigation-r4"]').locator('[data-region-id="queue"]')

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
        - option "课堂互动" [selected]
        - option "教师批改"
    - generic [ref=e42]:
      - checkbox "深色外框" [ref=e43]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e44] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#S4
  - generic "R4 工作区" [ref=e48]:
    - generic "当前工作区与区域恢复" [ref=e49]:
      - generic "显示与隐藏区域" [ref=e50]:
        - button "展开平台导航" [ref=e51] [cursor=pointer]
        - button "隐藏课堂功能" [expanded] [ref=e53] [cursor=pointer]
        - button "关闭临时小组列表" [expanded] [ref=e55] [cursor=pointer]:
          - generic [ref=e57]: 关闭小组列表
      - generic [ref=e59]:
        - strong [ref=e60]: 辩论赛：大学校园是否应该免费开放
        - generic [ref=e61]: 探索者小组 · 智能汇报
      - button "专注内容" [ref=e62] [cursor=pointer]
      - button "布局设置" [ref=e66] [cursor=pointer]:
        - generic [ref=e68]: 布局
    - generic [ref=e69]:
      - generic "平台导航" [ref=e71]:
        - generic [ref=e72]:
          - button "展开平台导航" [ref=e76] [cursor=pointer]
          - navigation "平台功能" [ref=e78]:
            - list [ref=e79]:
              - listitem [ref=e80]:
                - link "工作台" [ref=e82] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e85]:
                - link "课程" [ref=e87] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e90]:
                - link "资源" [ref=e92] [cursor=pointer]:
                  - /url: "#navigation-v042"
              - listitem [ref=e95]:
                - link "专业" [ref=e97] [cursor=pointer]:
                  - /url: "#navigation-v042"
          - generic [ref=e100]:
            - button "通知" [ref=e101] [cursor=pointer]
            - button "帮助" [ref=e104] [cursor=pointer]
            - button "当前账户：林老师" [ref=e107] [cursor=pointer]
      - generic [ref=e109]:
        - generic [ref=e110]:
          - strong [ref=e111]: 大学物理 · 第九章课堂回顾
          - generic [ref=e112]: 2026-09-24 11:21
          - button "导出数据" [ref=e113] [cursor=pointer]
        - generic [ref=e117]:
          - generic "课堂功能" [ref=e119]:
            - generic [ref=e120]:
              - strong [ref=e121]: 课堂功能
              - button "取消固定课堂功能" [ref=e122] [cursor=pointer]
              - button "隐藏课堂功能" [ref=e125] [cursor=pointer]
            - heading "课堂数据" [level=4] [ref=e128]
            - navigation "课堂功能" [ref=e129]:
              - list [ref=e130]:
                - listitem [ref=e131]:
                  - link "综合数据" [ref=e133] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e138]:
                  - link "学生表现" [ref=e140] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e145]:
                  - link "课堂习题" [ref=e147] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e152]:
                  - link "课堂互动" [ref=e154] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e159]:
                  - link "教学内容" [ref=e161] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - generic [ref=e166]: 课堂范围内的功能导航
          - separator "调整课堂功能宽度" [ref=e167]
          - main [ref=e168]:
            - generic [ref=e169]:
              - generic "分区导航" [ref=e170]:
                - tablist "课堂互动内容" [ref=e174]:
                  - tab "投稿" [ref=e175] [cursor=pointer]
                  - tab "随机点名" [ref=e179] [cursor=pointer]
                  - tab "分组讨论" [ref=e183] [cursor=pointer]
                  - tab "智能汇报" [selected] [ref=e187] [cursor=pointer]
              - tabpanel "智能汇报" [ref=e192]:
                - generic [ref=e193]:
                  - group "课堂活动" [ref=e194]:
                    - list [ref=e195]:
                      - listitem [ref=e196]:
                        - button "辩论赛：大学校园是否应该免费开放" [pressed] [ref=e198] [cursor=pointer]:
                          - generic [ref=e199]:
                            - generic [ref=e200]: 辩论赛：大学校园是否应该免费开放
                            - generic [ref=e201]:
                              - generic [ref=e202]: "6"
                              - text: 组已完成
                              - generic [ref=e203]: ·
                              - text: 21 分钟
                            - progressbar "辩论赛：大学校园是否应该免费开放完成进度" [ref=e204]:
                              - generic [ref=e206]: 完成 75%
                      - listitem [ref=e207]:
                        - button "小组汇报：从概念到真实应用" [ref=e209] [cursor=pointer]:
                          - generic [ref=e210]:
                            - generic [ref=e211]: 小组汇报：从概念到真实应用
                            - generic [ref=e212]:
                              - generic [ref=e213]: "8"
                              - text: 组已完成
                              - generic [ref=e214]: ·
                              - text: 36 分钟
                            - progressbar "小组汇报：从概念到真实应用完成进度" [ref=e215]:
                              - generic [ref=e217]: 完成 100%
                  - generic [ref=e218]:
                    - generic "小组列表" [ref=e219]:
                      - generic [ref=e220]:
                        - strong [ref=e221]: 小组列表
                        - generic [ref=e222]: 临时
                        - button "固定小组列表" [active] [ref=e223] [cursor=pointer]
                        - button "隐藏小组列表" [ref=e226] [cursor=pointer]
                      - generic [ref=e229]:
                        - generic [ref=e230]:
                          - radiogroup "小组提交状态" [ref=e232]:
                            - generic [ref=e234]:
                              - generic [ref=e235] [cursor=pointer]:
                                - radio "全部" [checked] [ref=e236]
                                - generic [ref=e237]: 全部
                              - generic [ref=e238] [cursor=pointer]:
                                - radio "已提交" [ref=e239]
                                - generic [ref=e240]: 已提交
                              - generic [ref=e241] [cursor=pointer]:
                                - radio "未评分" [ref=e242]
                                - generic [ref=e243]: 未评分
                          - generic [ref=e244]: 6 组
                        - textbox "搜索小组" [ref=e248]:
                          - /placeholder: 搜索小组名称
                      - group "小组结果" [ref=e250]:
                        - list [ref=e251]:
                          - listitem [ref=e252]:
                            - button "第一小分队" [ref=e254] [cursor=pointer]:
                              - generic [ref=e255]:
                                - generic [ref=e256]: 第一小分队
                                - generic [ref=e257]: 已提交 · 思维碰撞
                                - group "第一小分队成员" [ref=e260]:
                                  - img "林可" [ref=e262]
                                  - img "王思齐" [ref=e264]
                                  - img "陈宁" [ref=e266]
                                  - img "周晓" [ref=e268]
                              - generic [ref=e269]: "9.0"
                          - listitem [ref=e270]:
                            - button "探索者小组" [pressed] [ref=e272] [cursor=pointer]:
                              - generic [ref=e273]:
                                - generic [ref=e274]: 探索者小组
                                - generic [ref=e275]: 已提交 · 论据充分
                                - group "探索者小组成员" [ref=e278]:
                                  - img "林可" [ref=e280]
                                  - img "王思齐" [ref=e282]
                                  - img "陈宁" [ref=e284]
                                  - img "周晓" [ref=e286]
                              - generic [ref=e287]: "8.5"
                          - listitem [ref=e288]:
                            - button "向量研究组" [ref=e290] [cursor=pointer]:
                              - generic [ref=e291]:
                                - generic [ref=e292]: 向量研究组
                                - generic [ref=e293]: 已提交 · 观点清晰
                                - group "向量研究组成员" [ref=e296]:
                                  - img "林可" [ref=e298]
                                  - img "王思齐" [ref=e300]
                                  - img "陈宁" [ref=e302]
                                  - img "周晓" [ref=e304]
                              - generic [ref=e305]: "9.5"
                          - listitem [ref=e306]:
                            - button "第四学习小组" [ref=e308] [cursor=pointer]:
                              - generic [ref=e309]:
                                - generic [ref=e310]: 第四学习小组
                                - generic [ref=e311]: 已提交 · 积极参与
                                - group "第四学习小组成员" [ref=e314]:
                                  - img "林可" [ref=e316]
                                  - img "王思齐" [ref=e318]
                                  - img "陈宁" [ref=e320]
                                  - img "周晓" [ref=e322]
                              - generic [ref=e323]: "8.0"
                          - listitem [ref=e324]:
                            - button "知行合一" [ref=e326] [cursor=pointer]:
                              - generic [ref=e327]:
                                - generic [ref=e328]: 知行合一
                                - generic [ref=e329]: 未评分 · 待教师反馈
                                - group "知行合一成员" [ref=e332]:
                                  - img "林可" [ref=e334]
                                  - img "王思齐" [ref=e336]
                                  - img "陈宁" [ref=e338]
                                  - img "周晓" [ref=e340]
                              - generic [ref=e341]: —
                          - listitem [ref=e342]:
                            - button "未进组" [ref=e344] [cursor=pointer]:
                              - generic [ref=e345]:
                                - generic [ref=e346]: 未进组
                                - generic [ref=e347]: 未评分 · 待教师反馈
                                - group "未进组成员" [ref=e350]:
                                  - img "林可" [ref=e352]
                                  - img "王思齐" [ref=e354]
                                  - img "陈宁" [ref=e356]
                                  - img "周晓" [ref=e358]
                              - generic [ref=e359]: —
                      - generic [ref=e360]: 展示 6 组演示对象 · 选择后结果同步更新
                    - article [ref=e361]:
                      - generic [ref=e362]:
                        - img "探索者小组成员" [ref=e363]
                        - generic [ref=e375]:
                          - heading "探索者小组" [level=3] [ref=e376]
                          - paragraph [ref=e377]: 辩论赛：大学校园是否应该免费开放 · 已提交
                        - generic "当前小组得分" [ref=e378]: 8.5 / 10
                      - generic [ref=e379]:
                        - heading "讨论摘要 示例" [level=4] [ref=e380]:
                          - text: 讨论摘要
                          - generic [ref=e382]: 示例
                        - paragraph [ref=e385]: 本组从资源容量、安全管理和开放边界三个方面展开分析。预约规则应公开，教学区域与公共区域应有清楚的区别。
                        - generic [ref=e386]:
                          - generic [ref=e387]: 论据充分
                          - generic [ref=e390]: 观点组织
                      - generic [ref=e393]:
                        - heading "最终结论" [level=4] [ref=e394]
                        - paragraph [ref=e395]: 本组从资源容量、安全管理和开放边界三个方面展开分析。预约规则应公开，教学区域与公共区域应有清楚的区别。
                      - heading "讨论过程 3 条示例" [level=4] [ref=e396]
                      - generic [ref=e397]:
                        - generic [ref=e401]:
                          - generic [ref=e402]:
                            - generic [ref=e403]: 林可
                            - generic [ref=e404]: 11:32
                          - paragraph [ref=e405]: 我们先把问题分为几个独立的方面，再分别寻找依据。
                        - generic [ref=e409]:
                          - generic [ref=e410]:
                            - generic [ref=e411]: 陈宁
                            - generic [ref=e412]: 11:35
                          - paragraph [ref=e413]: 这份结论需要明确实施条件与适用的边界。
                        - generic [ref=e417]:
                          - generic [ref=e418]:
                            - generic [ref=e419]: 周晓
                            - generic [ref=e420]: 11:38
                          - paragraph [ref=e421]: 可以将上述分析整理为可执行的方案，再与其他组比较。
  - generic [ref=e422]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
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
  43 |     const root=await open(page,'S4'),queue=root.locator('[data-region-id="queue"]'),context=root.locator('[data-region-id="context"]');
  44 |     const other=root.getByRole('group',{name:'小组结果',exact:true}).getByRole('button',{name:'探索者小组',exact:true});await other.click();
  45 |     for(const [pane,label,id] of [[queue,'小组列表','queue'],[context,'课堂功能','context']] as const){
> 46 |       await pane.getByRole('button',{name:`取消固定${label}`,exact:true}).click();await expect(pane).toHaveAttribute('data-temporary','true');
     |                                                                                                  ^ Error: expect(locator).toHaveAttribute(expected) failed
  47 |       const pin=pane.getByRole('button',{name:`固定${label}`,exact:true});await expect(pin).toHaveAttribute('data-size','32/14');await pin.focus();await page.keyboard.press('Enter');await expect(pane).toHaveAttribute('data-temporary','false');
  48 |       const hide=pane.getByRole('button',{name:`隐藏${label}`,exact:true});await hide.focus();await page.keyboard.press('Enter');await expect(pane).toBeHidden();
  49 |       await root.locator(`.rain-workspace__restore[aria-controls$="-workspace-${id}"]`).first().click();await expect(pane).toBeVisible();
  50 |     }
  51 |     await expect(other).toHaveAttribute('aria-pressed','true');await expect(root.getByRole('heading',{name:'探索者小组',exact:true})).toBeVisible();
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