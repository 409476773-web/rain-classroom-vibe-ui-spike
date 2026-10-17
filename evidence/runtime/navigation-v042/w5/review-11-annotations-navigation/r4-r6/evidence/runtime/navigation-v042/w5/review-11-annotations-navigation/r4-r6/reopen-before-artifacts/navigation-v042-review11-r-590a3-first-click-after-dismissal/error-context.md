# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042-review11-r4-r6-platform-reopen.spec.ts >> Review11 R6 dark forced compact reopens on the first click after dismissal
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
    56 × waiting for element to be visible, enabled and stable
       - element is not visible
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable

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
      - checkbox "深色外框" [checked] [active] [ref=e42]
      - text: 深色外框
    - link "打开认可原稿 ↗" [ref=e43] [cursor=pointer]:
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R6
  - generic "R6 工作区" [ref=e46]:
    - generic [ref=e47]:
      - button "显示平台导航" [ref=e48] [cursor=pointer]:
        - generic [ref=e50]: 平台导航
      - button "隐藏工作区" [expanded] [ref=e51] [cursor=pointer]:
        - generic [ref=e53]: 工作区
      - button "隐藏内部目录" [expanded] [ref=e54] [cursor=pointer]:
        - generic [ref=e56]: 内部目录
      - button "显示编辑工具" [ref=e57] [cursor=pointer]:
        - generic [ref=e59]: 编辑工具
      - generic [ref=e61]:
        - strong [ref=e62]: 课程教学协作空间
        - generic "学习反馈 / 反馈表单" [ref=e63]
      - button "布局" [ref=e64] [cursor=pointer]
      - button "专注内容" [ref=e66] [cursor=pointer]
    - status [ref=e68]: 为保留主内容空间，平台导航、编辑工具暂时采用紧凑／按需显示。你的展开偏好未被覆盖。
    - generic [ref=e70]:
      - generic "工作区" [ref=e72]:
        - generic [ref=e73]:
          - strong [ref=e74]: 工作区
          - button "取消固定工作区" [ref=e75] [cursor=pointer]
          - button "隐藏工作区" [ref=e78] [cursor=pointer]
        - strong [ref=e83]: 云文档
        - textbox "搜索工作区" [ref=e87]
        - navigation "云文档功能" [ref=e89]:
          - list [ref=e90]:
            - listitem [ref=e91]:
              - link "主页" [ref=e93] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e98]:
              - link "云盘" [ref=e100] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e105]:
              - link "知识库" [ref=e107] [cursor=pointer]:
                - /url: "#navigation-v042"
        - heading "置顶工作区" [level=5] [ref=e112]
        - navigation "置顶工作区" [ref=e113]:
          - list [ref=e114]:
            - listitem [ref=e115]:
              - link "课程教学协作空间" [ref=e117] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e122]:
              - link "教学设计与教研" [ref=e124] [cursor=pointer]:
                - /url: "#navigation-v042"
        - heading "我的文档" [level=5] [ref=e129]
        - navigation "我的文档" [ref=e130]:
          - list [ref=e131]:
            - listitem [ref=e132]:
              - link "2026 学期工作计划" [ref=e134] [cursor=pointer]:
                - /url: "#navigation-v042"
            - listitem [ref=e139]:
              - link "课程目标与评价方案" [ref=e141] [cursor=pointer]:
                - /url: "#navigation-v042"
        - generic [ref=e146]: 个人空间 · 本地示例
      - separator "调整工作区宽度" [ref=e147]
      - generic [ref=e148]:
        - generic [ref=e149]:
          - generic [ref=e150]:
            - generic [ref=e151]:
              - strong [ref=e154]: 课程教学协作空间
              - generic [ref=e155]: / 学习反馈
            - generic [ref=e157]: 教学协作 / 2026 秋季学期 · 演示空间
          - button "分享" [ref=e158] [cursor=pointer]
          - button "更多工作区操作" [ref=e162] [cursor=pointer]
        - generic [ref=e164]:
          - generic "内部目录" [ref=e166]:
            - generic [ref=e167]:
              - strong [ref=e168]: 内部目录
              - button "取消固定内部目录" [ref=e169] [cursor=pointer]
              - button "隐藏内部目录" [ref=e172] [cursor=pointer]
            - generic [ref=e175]: 工作区内部
            - navigation "工作区页面" [ref=e176]:
              - list [ref=e177]:
                - listitem [ref=e178]:
                  - link "课程任务" [ref=e180] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e185]:
                  - link "学习反馈" [ref=e187] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e192]:
                  - link "教研周报" [ref=e194] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e199]:
                  - link "资源素材" [ref=e201] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - heading "扩展内容" [level=5] [ref=e206]
            - navigation "工作区扩展页面" [ref=e207]:
              - list [ref=e208]:
                - listitem [ref=e209]:
                  - link "课程介绍" [ref=e211] [cursor=pointer]:
                    - /url: "#navigation-v042"
                - listitem [ref=e216]:
                  - link "参考资料" [ref=e218] [cursor=pointer]:
                    - /url: "#navigation-v042"
            - button "+ 新建页面" [ref=e224] [cursor=pointer]
          - separator "调整内部目录宽度" [ref=e226]
          - generic [ref=e228]:
            - generic "分区导航" [ref=e230]:
              - tablist "页面内容视图" [ref=e234]:
                - tab "表格" [ref=e235] [cursor=pointer]
                - tab "状态分组" [ref=e241] [cursor=pointer]
                - tab "画册" [ref=e247] [cursor=pointer]
                - tab "反馈表单" [selected] [ref=e253] [cursor=pointer]
            - tabpanel "反馈表单" [ref=e261]:
              - generic [ref=e262]:
                - generic [ref=e263]:
                  - radiogroup "反馈表单模式" [ref=e265]:
                    - generic [ref=e267]:
                      - generic [ref=e268] [cursor=pointer]:
                        - radio "编辑表单" [checked] [ref=e269]
                        - generic [ref=e270]: 编辑表单
                      - generic [ref=e271] [cursor=pointer]:
                        - radio "填写预览" [ref=e272]
                        - generic [ref=e273]: 填写预览
                  - button "筛选视图" [ref=e274] [cursor=pointer]
                  - button "链接选项" [ref=e276] [cursor=pointer]
                  - button "视图设置" [ref=e278] [cursor=pointer]
                - generic [ref=e282]:
                  - generic [ref=e283]: COURSE FEEDBACK / 2026
                  - generic [ref=e286]:
                    - heading "课程学习反馈" [level=2] [ref=e287]
                    - paragraph [ref=e288]: 让每一次反馈，帮助我们一起改进课堂。本地示例，反馈不会发送给教师。
                    - generic [ref=e289]:
                      - generic [ref=e290]: 你正在学习的课程 *
                      - textbox "课程名称" [ref=e292]:
                        - /placeholder: 请输入课程名称
                        - text: 高等数学 A
                    - radiogroup "本阶段课程内容的理解程度" [ref=e295]:
                      - generic [ref=e297]:
                        - generic [ref=e298] [cursor=pointer]:
                          - radio "能够理解并独立应用" [ref=e299]
                          - generic [ref=e302]: 能够理解并独立应用
                        - generic [ref=e304] [cursor=pointer]:
                          - radio "基本理解，需要更多练习" [checked] [ref=e305]
                          - generic [ref=e309]: 基本理解，需要更多练习
                        - generic [ref=e311] [cursor=pointer]:
                          - radio "希望获得进一步的讲解" [ref=e312]
                          - generic [ref=e315]: 希望获得进一步的讲解
                    - generic [ref=e317]:
                      - generic [ref=e318]: 你希望补充哪些内容？
                      - textbox "你希望我们改进的地方" [ref=e320]:
                        - /placeholder: 写下你的具体建议…
                    - button "本地保存示例" [ref=e322] [cursor=pointer]
  - generic [ref=e324]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
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