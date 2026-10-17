# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-r1-r3.spec.ts >> Review11 White 1200 gradient no top line, title/type hierarchy and count track state
- Location: tests/e2e/navigation-v042-review11-r1-r3.spec.ts:24:2

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "none"
Received: "\"\""
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
    - link "打开认可原稿 ↗" [ref=e40] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#white
  - generic [ref=e44]:
    - generic [ref=e45]:
      - generic [ref=e46]:
        - heading "W1 / 白底指示线" [level=3] [ref=e47]
        - radiogroup "W1 / 白底指示线" [ref=e49]:
          - generic [ref=e51]:
            - generic [ref=e52] [cursor=pointer]:
              - radio "全部" [ref=e53]
              - generic [ref=e54]: 全部
              - generic [ref=e55]: "32"
            - generic [ref=e56] [cursor=pointer]:
              - radio "未练对" [checked] [ref=e57]
              - generic [ref=e58]: 未练对
              - generic [ref=e59]: "20"
            - generic [ref=e60] [cursor=pointer]:
              - radio "已练对" [ref=e61]
              - generic [ref=e62]: 已练对
              - generic [ref=e63]: "12"
            - generic [ref=e64] [cursor=pointer]:
              - radio "加星" [ref=e65]
              - generic [ref=e66]: 加星
              - generic [ref=e67]: "7"
        - paragraph [ref=e68]: 当前状态：未练对 · 只筛选当前内容集合
        - list [ref=e69]:
          - listitem [ref=e70]:
            - text: 极限的定义与计算
            - generic [ref=e71]: 单选题
          - listitem [ref=e72]:
            - text: 函数的连续性
            - generic [ref=e73]: 填空题
      - generic [ref=e74]:
        - heading "W2 / 仅选中项填充" [level=3] [ref=e75]
        - radiogroup "W2 / 仅选中项填充" [ref=e77]:
          - generic [ref=e79]:
            - generic [ref=e80] [cursor=pointer]:
              - radio "全部" [ref=e81]
              - generic [ref=e82]: 全部
              - generic [ref=e83]: "32"
            - generic [ref=e84] [cursor=pointer]:
              - radio "未练对" [checked] [ref=e85]
              - generic [ref=e86]: 未练对
              - generic [ref=e87]: "20"
            - generic [ref=e88] [cursor=pointer]:
              - radio "已练对" [ref=e89]
              - generic [ref=e90]: 已练对
              - generic [ref=e91]: "12"
            - generic [ref=e92] [cursor=pointer]:
              - radio "加星" [ref=e93]
              - generic [ref=e94]: 加星
              - generic [ref=e95]: "7"
        - paragraph [ref=e96]: 当前状态：未练对 · 只筛选当前内容集合
        - list [ref=e97]:
          - listitem [ref=e98]:
            - text: 极限的定义与计算
            - generic [ref=e99]: 单选题
          - listitem [ref=e100]:
            - text: 函数的连续性
            - generic [ref=e101]: 填空题
    - heading "W3 / 白底轮廓连体" [level=3] [ref=e102]
    - generic [ref=e105]:
      - generic "分区导航" [ref=e107]:
        - tablist "白底课程范围" [ref=e111]:
          - tab "教学资料" [selected] [ref=e112] [cursor=pointer]
          - tab "参考案例" [ref=e118] [cursor=pointer]
          - tab "协作记录" [ref=e124] [cursor=pointer]
      - tabpanel "教学资料" [ref=e132]:
        - generic [ref=e133]:
          - generic [ref=e134]: 课程内容 / 教学资料
          - heading "知识点总览" [level=3] [ref=e135]
          - paragraph [ref=e136]: 以知识点组织公共资源，在班级中安排教学。此处为本地视觉与交互示例。
          - list [ref=e137]:
            - listitem [ref=e138]:
              - generic [ref=e140]: 第一章 函数、极限与连续
              - generic [ref=e141]: 12 个单元
            - listitem [ref=e142]:
              - generic [ref=e144]: 第二章 导数与微分
              - generic [ref=e145]: 8 个单元
            - listitem [ref=e146]:
              - generic [ref=e148]: 第三章 积分及其应用
              - generic [ref=e149]: 待完善
  - generic [ref=e150]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import {test,expect,type Page,type Locator} from '@playwright/test';
  2  | const open=async(page:Page,sample:string,width:number)=>{await page.goto(`/?sample=${sample}#navigation-v042`);await page.getByRole('combobox',{name:'画板宽度'}).selectOption(String(width));};
  3  | const style=(node:Locator,property:string)=>node.evaluate((e,property)=>getComputedStyle(e).getPropertyValue(property),property);
  4  | const root=(page:Page,id:string)=>page.locator(`[data-rain-id=recipe-navigation-${id}]`);
  5  | for(const width of [1200,1440,1600]){
  6  |  test(`Review11 R1 ${width} white context and restrained stat hierarchy preserve scene selection`,async({page})=>{
  7  |   await open(page,'R1',width);const r=root(page,'r1');
  8  |   await expect.poll(()=>style(r.locator('.nv43-context'),'background-color')).toBe('rgb(255, 255, 255)');
  9  |   for(const selector of ['.nv43-statistics>div>span','.nv43-statistics>div>small']){const entries=r.locator(selector);await expect(entries).toHaveCount(3);for(const entry of await entries.all()){expect(await style(entry,'font-size')).toBe('13px');expect(await style(entry,'line-height')).toBe('20px');}}
  10 |   expect(await style(r.locator('.nv43-page-top>p'),'color')).toBe('rgb(160, 172, 197)');expect(await style(r.locator('.nv43-workspace-actions'),'gap')).toBe('16px');
  11 |   await r.getByRole('tab',{name:'学分结构',exact:true}).click();await page.getByRole('combobox',{name:'业务子场景'}).selectOption('industry');
  12 |   expect(await style(r.locator('.nv43-context'),'background-color')).toBe('rgb(255, 255, 255)');expect(await style(r.locator('.nv43-page-top>p'),'color')).toBe('rgb(160, 172, 197)');
  13 |   await r.getByRole('radio',{name:'桑基图',exact:true}).locator('..').click();await expect(r.getByRole('radio',{name:'桑基图',exact:true})).toBeChecked();
  14 |   await page.getByRole('combobox',{name:'业务子场景'}).selectOption('plan');await expect(r.getByRole('tab',{name:'学分结构',exact:true})).toHaveAttribute('aria-selected','true');
  15 |  });
  16 |  test(`Review11 R3 ${width} heading16 file16 name15 resource color and list-grid selection`,async({page})=>{
  17 |   await open(page,'R3',width);const r=root(page,'r3'),h=r.locator('.nv43-resource-heading h3');expect(await style(h,'font-size')).toBe('16px');expect(await style(h,'line-height')).toBe('22px');expect((await h.boundingBox())?.height).toBe(22);
  18 |   expect(await style(r.locator('.nv43-workspace-actions'),'gap')).toBe('16px');expect(await style(r.locator('.nv43-icon-tile'),'background-color')).toBe('rgb(255, 242, 235)');expect(await style(r.locator('.nv43-icon-tile [data-rain-id=icon]'),'color')).toBe('rgb(221, 92, 0)');
  19 |   for(const name of await r.locator('.nv43-file-name').all())expect(await style(name,'font-size')).toBe('15px');for(const icon of await r.locator('.nv43-file-name [data-rain-id=icon]').all()){const box=await icon.boundingBox();expect(box?.width).toBe(16);expect(box?.height).toBe(16);}
  20 |   const file='第一章 函数、极限与连续.pdf';await r.getByRole('checkbox',{name:`选择 ${file}`,exact:true}).check();await r.getByRole('radio',{name:'网格',exact:true}).locator('..').click();await expect(r.getByRole('checkbox',{name:`选择 ${file}`,exact:true})).toBeChecked();expect((await r.locator('.nv43-file-open [data-rain-id=icon]').nth(1).boundingBox())?.width).toBe(24);
  21 |   await r.getByRole('radio',{name:'列表',exact:true}).locator('..').click();await r.getByRole('textbox',{name:'搜索当前范围内的文件'}).fill('教学大纲');await expect(r.locator('tbody tr')).toHaveCount(1);await page.getByRole('combobox',{name:'业务子场景'}).selectOption('errors');expect(await style(h,'font-size')).toBe('16px');
  22 |   await r.getByRole('radio',{name:'加星',exact:true}).locator('..').click();await expect(r.locator('tbody tr')).toHaveCount(3);await r.getByRole('button',{name:'取消加星 · 第 1 题',exact:true}).click();await expect(r.locator('tbody tr')).toHaveCount(2);
  23 |  });
  24 |  test(`Review11 White ${width} gradient no top line, title/type hierarchy and count track state`,async({page})=>{
  25 |   await open(page,'White',width);const w=page.getByTestId('candidate-White');
  26 |   for(const item of await w.locator('.nv43-white-example li').all())expect(await style(item,'font-size')).toBe('15px');for(const item of await w.locator('.nv43-white-example li>small').all())expect(await style(item,'font-size')).toBe('13px');
  27 |   for(const item of await w.locator('.nv43-white-panel li>span:not([data-rain-id=icon])').all())expect(await style(item,'font-size')).toBe('15px');
> 28 |   const selected=w.locator('.nv43-white-connected .rain-tabs__tab[data-selected=true]');expect(await selected.evaluate(e=>getComputedStyle(e,'::before').content)).toBe('none');expect(await style(selected,'background-image')).toBe('linear-gradient(rgb(224, 234, 255), rgb(255, 255, 255))');
     |                                                                                                                                                                    ^ Error: expect(received).toBe(expected) // Object.is equality
  29 |   const soft=w.locator('.nv43-white-soft');expect(await style(soft.locator('[data-state=checked] [data-slot=count]'),'color')).toBe('rgb(15, 85, 223)');expect(await style(soft.locator('[data-state=unchecked] [data-slot=count]').first(),'color')).toBe('rgb(103, 115, 134)');
  30 |   await soft.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();await expect(soft.getByRole('radio',{name:'已练对',exact:true})).toBeChecked();expect(await style(soft.locator('[data-state=checked] [data-slot=count]'),'color')).toBe('rgb(15, 85, 223)');
  31 |   await w.getByRole('tab',{name:'参考案例',exact:true}).click();await expect(w.getByRole('tab',{name:'参考案例',exact:true})).toHaveAttribute('aria-selected','true');expect(await style(selected,'background-image')).toContain('linear-gradient');
  32 |   const line=w.getByRole('radiogroup',{name:'W1 / 白底指示线'});await line.getByRole('radio',{name:'已练对',exact:true}).locator('..').click();expect(await line.locator('[data-state=checked]').evaluate(e=>getComputedStyle(e,'::after').height)).toBe('2px');
  33 |  });
  34 |  test(`Review11 Connections ${width} pale directional chevron preserves dialog search Escape and selection`,async({page})=>{
  35 |   await open(page,'Connections',width);const c=page.getByTestId('candidate-Connections'),all=c.getByRole('button',{name:'全部',exact:true}),icon=all.locator('[data-rain-id=icon]');
  36 |   await expect(all).toHaveAttribute('aria-expanded','false');expect(await style(icon,'color')).toBe('rgb(184, 194, 216)');expect(await style(icon,'mask-image')).toContain('arrow-down');await all.click();await expect(all).toHaveAttribute('aria-expanded','true');expect(await style(icon,'mask-image')).toContain('arrow-up');
  37 |   const dialog=page.getByRole('dialog',{name:'选择课程内容范围'});await expect(dialog).toBeVisible();await dialog.getByRole('textbox',{name:'搜索范围'}).fill('不存在');await expect(dialog.getByRole('status')).toHaveText('无匹配范围');await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(all).toHaveAttribute('aria-expanded','false');
  38 |   await all.click();await dialog.getByRole('textbox',{name:'搜索范围'}).fill('创新');await dialog.getByRole('button',{name:/创新实验班/}).click();await expect(dialog).not.toBeVisible();await expect(c.getByRole('tab',{name:/创新实验班/})).toHaveAttribute('aria-selected','true');
  39 |  });
  40 | }
  41 | 
```