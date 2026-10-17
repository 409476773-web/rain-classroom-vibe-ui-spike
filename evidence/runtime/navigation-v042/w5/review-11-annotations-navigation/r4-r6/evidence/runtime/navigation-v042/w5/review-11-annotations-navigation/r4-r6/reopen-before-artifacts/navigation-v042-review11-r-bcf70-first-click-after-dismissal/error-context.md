# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-r4-r6-platform-reopen.spec.ts >> Review11 R5 light forced compact reopens on the first click after dismissal
- Location: tests/e2e/navigation-v042-review11-r4-r6-platform-reopen.spec.ts:2:73

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('candidate-canvas').locator('.rain-workspace').locator('.nv5-platform').locator('.nv5-platform-expand')
    - locator resolved to <button aria-label="展开平台导航" aria-expanded="false" data-workspace-action="restore" aria-controls="_r_2_-workspace-global" class="nv5-platform-expand rain-workspace__restore">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not visible
    - retrying click action
      - waiting 100ms
    57 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms

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
    - generic [ref=e40]: 轻品牌
    - generic "未勾选时使用轻品牌外框" [ref=e41]:
      - checkbox "深色外框" [ref=e42]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e43] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R5
  - generic "R5 工作区" [ref=e46]:
    - generic [ref=e47]:
      - button "显示平台导航" [ref=e48] [cursor=pointer]:
        - generic [ref=e50]: 平台导航
      - button "隐藏回顾列表" [expanded] [ref=e51] [cursor=pointer]:
        - generic [ref=e53]: 回顾列表
      - button "隐藏知识索引" [expanded] [ref=e54] [cursor=pointer]:
        - generic [ref=e56]: 知识索引
      - generic [ref=e58]:
        - strong [ref=e59]: 课堂回顾 · 第九章
        - generic "课堂导入 · 认识等效关系 · 00:00 / 25:00" [ref=e60]
      - button "布局" [ref=e61] [cursor=pointer]
      - button "专注内容" [ref=e63] [cursor=pointer]
    - status [ref=e65]: 为保留主内容空间，平台导航暂时采用紧凑／按需显示。你的展开偏好未被覆盖。
    - generic [ref=e68]:
      - generic [ref=e69]:
        - button "返回课堂列表" [ref=e70] [cursor=pointer]
        - strong [ref=e72]: 第九章 · 戴维南定理
        - generic [ref=e73]: 课堂回顾
        - button "回放管理" [ref=e74] [cursor=pointer]
      - generic [ref=e78]:
        - generic "回顾列表" [ref=e80]:
          - generic [ref=e81]:
            - strong [ref=e82]: 回顾列表
            - button "取消固定回顾列表" [ref=e83] [cursor=pointer]
            - button "隐藏回顾列表" [ref=e86] [cursor=pointer]
          - generic [ref=e89]:
            - generic [ref=e90]:
              - heading "课堂回顾" [level=4] [ref=e91]
              - generic [ref=e92]: 4 项
            - radiogroup "回顾事件类型" [ref=e96]:
              - generic [ref=e98]:
                - generic [ref=e99] [cursor=pointer]:
                  - radio "全部" [checked] [ref=e100]
                  - generic [ref=e101]: 全部
                - generic [ref=e102] [cursor=pointer]:
                  - radio "课件" [ref=e103]
                  - generic [ref=e104]: 课件
                - generic [ref=e105] [cursor=pointer]:
                  - radio "习题" [ref=e106]
                  - generic [ref=e107]: 习题
          - group "课堂回顾事件" [ref=e108]:
            - list [ref=e109]:
              - listitem [ref=e110]:
                - button "课堂导入 · 认识等效关系" [pressed] [ref=e112] [cursor=pointer]:
                  - generic [ref=e114]:
                    - strong [ref=e115]: 认识电路中的
                    - generic [ref=e116]: CLASS / 1
                  - generic [ref=e117]:
                    - generic [ref=e118]: 课堂导入 · 认识等效关系
                    - generic [ref=e119]:
                      - generic [ref=e120]: 课件
                      - generic [ref=e123]: 00:00
              - listitem [ref=e124]:
                - button "戴维南定理与模型边界" [ref=e126] [cursor=pointer]:
                  - generic [ref=e128]:
                    - strong [ref=e129]: 戴维南定理
                    - generic [ref=e130]: CLASS / 2
                  - generic [ref=e131]:
                    - generic [ref=e132]: 戴维南定理与模型边界
                    - generic [ref=e133]:
                      - generic [ref=e134]: 课件
                      - generic [ref=e137]: 08:56
              - listitem [ref=e138]:
                - button "随堂练习 · 等效电路" [ref=e140] [cursor=pointer]:
                  - generic [ref=e142]:
                    - strong [ref=e143]: 一起试一试
                    - generic [ref=e144]: CLASS / 3
                  - generic [ref=e145]:
                    - generic [ref=e146]: 随堂练习 · 等效电路
                    - generic [ref=e147]:
                      - generic [ref=e148]: 习题
                      - generic [ref=e151]: 16:24
              - listitem [ref=e152]:
                - button "课堂小结 · 三个关键步骤" [ref=e154] [cursor=pointer]:
                  - generic [ref=e156]:
                    - strong [ref=e157]: 三个步骤
                    - generic [ref=e158]: CLASS / 4
                  - generic [ref=e159]:
                    - generic [ref=e160]: 课堂小结 · 三个关键步骤
                    - generic [ref=e161]:
                      - generic [ref=e162]: 课件
                      - generic [ref=e165]: 22:00
          - generic [ref=e167] [cursor=pointer]:
            - checkbox "跟随播放定位" [ref=e168]
            - generic [ref=e171]: 跟随播放定位
        - separator "调整回顾列表宽度" [ref=e173]
        - generic [ref=e174]:
          - generic [ref=e175]:
            - generic [ref=e176]: 课堂导入 · 认识等效关系
            - generic [ref=e177]: 模拟媒体 · 无真实视频
          - generic [ref=e179]:
            - generic [ref=e180]: RAIN CLASSROOM / PHYSICS
            - heading "认识电路中的 等效关系" [level=2] [ref=e182]: 认识电路中的等效关系
            - paragraph [ref=e183]: 从真实电路出发，用更简单的结构理解复杂问题。
            - generic [ref=e184]:
              - generic [ref=e185]: 大学物理 · 教学资料
              - generic [ref=e186]: 01 / 04
          - generic [ref=e187]:
            - slider "模拟播放位置" [ref=e188] [cursor=pointer]: "0"
            - generic [ref=e189]:
              - generic [ref=e190]:
                - button "播放回放" [ref=e191] [cursor=pointer]
                - generic "回放时间" [ref=e193]: 00:00 / 25:00
              - generic [ref=e194]:
                - generic [ref=e195]: 1.0 ×
                - button "专注回放" [ref=e198] [cursor=pointer]
        - separator "调整知识索引宽度" [ref=e200]
        - generic "知识索引" [ref=e202]:
          - generic [ref=e203]:
            - strong [ref=e204]: 知识索引
            - button "取消固定知识索引" [ref=e205] [cursor=pointer]
            - button "隐藏知识索引" [ref=e208] [cursor=pointer]
          - generic [ref=e211]:
            - generic "分区导航" [ref=e212]:
              - tablist "回放参考内容" [ref=e216]:
                - tab "知识导引" [selected] [ref=e217] [cursor=pointer]
                - tab "讲稿" [ref=e221] [cursor=pointer]
            - tabpanel "知识导引" [ref=e226]:
              - generic [ref=e227]:
                - heading "课堂总结脑图" [level=4] [ref=e229]
                - img "等效电路示意脑图" [ref=e231]:
                  - generic [ref=e232]: 等效电路
                  - generic [ref=e233]:
                    - generic [ref=e234]: 端口关系
                    - generic [ref=e235]: 等效模型
                    - generic [ref=e236]: 适用条件
                - radiogroup "课堂脑图" [ref=e239]:
                  - generic [ref=e241]:
                    - generic [ref=e242] [cursor=pointer]:
                      - radio "脑图 1" [checked] [ref=e243]
                      - generic [ref=e244]: 脑图 1
                    - generic [ref=e245] [cursor=pointer]:
                      - radio "脑图 2" [ref=e246]
                      - generic [ref=e247]: 脑图 2
                    - generic [ref=e248] [cursor=pointer]:
                      - radio "脑图 3" [ref=e249]
                      - generic [ref=e250]: 脑图 3
                - heading "知识索引" [level=4] [ref=e251]
                - generic [ref=e252]:
                  - button "00:00 认识电路中的" [pressed] [ref=e253] [cursor=pointer]:
                    - generic [ref=e254]: 00:00
                    - generic [ref=e255]: 课堂导入 · 认识等效关系从真实电路出发，用更简单的结构理解复杂问题。
                  - button "08:56 戴维南定理" [ref=e257] [cursor=pointer]:
                    - generic [ref=e258]: 08:56
                    - generic [ref=e259]: 戴维南定理与模型边界明确研究对象、端口与条件，建立可解释的等效模型。
                  - button "16:24 一起试一试" [ref=e261] [cursor=pointer]:
                    - generic [ref=e262]: 16:24
                    - generic [ref=e263]: 随堂练习 · 等效电路画出端口，说明条件，并记录你的推导过程。
                  - button "22:00 三个步骤" [ref=e265] [cursor=pointer]:
                    - generic [ref=e266]: 22:00
                    - generic [ref=e267]: 课堂小结 · 三个关键步骤确定边界 · 提取条件 · 验证结果
  - generic [ref=e269]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | for (const sample of ['R4','R5','R6']) for (const dark of [false,true]) test(`Review11 ${sample} ${dark?'dark':'light'} forced compact reopens on the first click after dismissal`,async({page},info)=>{
  3  |  await page.goto(`/?sample=${sample}#navigation-v042`);
  4  |  await page.getByRole('combobox',{name:'画板宽度'}).selectOption('1200');
  5  |  if(dark) await page.getByRole('checkbox',{name:'深色外框',exact:true}).check();
  6  |  const root=page.getByTestId('candidate-canvas').locator('.rain-workspace'),region=root.locator('.nv5-platform'),button=region.locator('.nv5-platform-expand');
  7  |  const steps:any[]=[];const record=async(label:string)=>steps.push({label,...await region.evaluate(e=>({mode:e.dataset.mode,forced:e.dataset.forced,temporary:e.dataset.temporary,width:e.getBoundingClientRect().width,expanded:e.querySelector('.nv5-platform-expand')?.getAttribute('aria-expanded')}))});
  8  |  await expect(button).toHaveAttribute('aria-expanded','false');await record('initial');
> 9  |  await button.click();await expect(region).toHaveAttribute('data-temporary','true');await expect(button).toHaveAttribute('aria-expanded','true');await record('first open');
     |               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  10 |  await button.click();await expect(region).toHaveAttribute('data-temporary','false');await expect(button).toHaveAttribute('aria-expanded','false');await record('dismiss');
  11 |  await button.click();await record('reopen first click');
  12 |  await info.attach('actual-transition',{body:JSON.stringify(steps,null,2),contentType:'application/json'});
  13 |  await expect(region).toHaveAttribute('data-temporary','true');await expect(button).toHaveAttribute('aria-expanded','true');expect((await region.boundingBox())!.width).toBe(208);
  14 |  await page.keyboard.press('Escape');await expect(region).toHaveAttribute('data-temporary','false');
  15 | });
  16 | 
```