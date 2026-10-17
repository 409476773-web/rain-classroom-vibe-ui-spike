# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042.spec.ts >> G1 review keeps R2 alignment, local tokens and real semester/breadcrumb semantics at both artboard widths
- Location: tests/e2e/navigation-v042.spec.ts:212:1

# Error details

```
Error: expect(received).toMatchObject(expected)

- Expected  - 3
+ Received  + 3

@@ -1,9 +1,9 @@
  Object {
    "accountBeforeUtilities": true,
    "activeColor": "rgb(15, 85, 223)",
-   "activeWeight": "600",
+   "activeWeight": "400",
    "backGap": "4px",
    "backIcon": 16,
    "contextHead": "rgba(0, 0, 0, 0)",
    "contextTitle": "15px",
    "description": "rgb(160, 172, 197)",
@@ -12,12 +12,12 @@
    "historyLabelOffset": 0,
    "historyOffset": 0,
    "iconSize": 16,
    "logoLeft": 0,
    "mainTop": "8px",
-   "navFont": "15px",
-   "navIcon": 15,
+   "navFont": "14px",
+   "navIcon": 18,
    "scopeTitle": "15px",
    "stats": "14px",
    "subtitle": "rgb(160, 172, 197)",
    "subtitleGap": "2px",
    "title": "17px",
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
    - paragraph [ref=e9]: W3–W5 人工视觉已通过 含 R3 补充调整
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
      - /url: http://127.0.0.1:5199/reference/approved-v0.4.2.html#R2
  - generic [ref=e48]:
    - generic [ref=e49]:
      - button "收起平台导航" [expanded] [ref=e50] [cursor=pointer]
      - button "隐藏课程导航" [expanded] [ref=e52] [cursor=pointer]
      - generic [ref=e54]:
        - strong [ref=e55]: 高等数学 A · 课程内容
        - generic [ref=e56]: 公共资源包
      - button "布局" [ref=e57] [cursor=pointer]
      - button "专注内容" [ref=e59] [cursor=pointer]
    - generic [ref=e63]:
      - generic "平台导航" [ref=e65]:
        - navigation "平台导航" [ref=e66]:
          - generic [ref=e67]:
            - button "收起平台导航" [expanded] [active] [ref=e68] [cursor=pointer]
            - strong [ref=e73]: 雨课堂
          - generic [ref=e74]:
            - link "工作台" [ref=e75] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "课程" [ref=e79] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "资源" [ref=e83] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "专业" [ref=e87] [cursor=pointer]:
              - /url: "#navigation-v042"
          - generic [ref=e91]:
            - button "当前账户：林老师" [ref=e92] [cursor=pointer]:
              - generic [ref=e95]:
                - strong [ref=e96]: 林老师
                - generic [ref=e97]: 教师工作区
            - generic [ref=e98]:
              - button "通知" [ref=e99] [cursor=pointer]
              - button "帮助" [ref=e102] [cursor=pointer]
      - generic [ref=e105]:
        - generic "课程导航" [ref=e107]:
          - generic [ref=e108]:
            - strong [ref=e109]: 课程导航
            - button "取消固定，改为临时课程导航" [ref=e110] [cursor=pointer]
            - button "隐藏课程导航" [ref=e113] [cursor=pointer]
          - generic [ref=e116]:
            - button "返回我的课程" [ref=e117] [cursor=pointer]
            - generic [ref=e119]:
              - text: MATHEMATICS / 2026
              - strong [ref=e120]: 高等数学 A
              - generic [ref=e121]: ∫
            - heading "高等数学 A" [level=4] [ref=e122]
            - button "2026 秋季学期" [ref=e123] [cursor=pointer]
          - generic [ref=e125]: 教学空间
          - navigation "课程导航" [ref=e126]:
            - link "课程内容" [ref=e127] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "考核方案" [ref=e131] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "课程信息" [ref=e135] [cursor=pointer]:
              - /url: "#navigation-v042"
            - link "数据面板" [ref=e139] [cursor=pointer]:
              - /url: "#navigation-v042"
            - separator [ref=e143]
            - link "使用的班级 200" [ref=e144] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e147]:
                - generic [ref=e148]: 使用的班级
                - generic [ref=e149]: "200"
            - link "关联的 AI 课 2" [ref=e150] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e153]:
                - generic [ref=e154]: 关联的 AI 课
                - generic [ref=e155]: "2"
            - link "成员 12" [ref=e156] [cursor=pointer]:
              - /url: "#navigation-v042"
              - generic [ref=e159]:
                - generic [ref=e160]: 成员
                - generic [ref=e161]: "12"
          - button "课程建设记录" [ref=e162] [cursor=pointer]
        - separator "调整课程导航宽度" [ref=e165]
        - generic [ref=e169]:
          - generic "分区导航" [ref=e171]:
            - generic [ref=e172]:
              - tablist "课程内容范围" [ref=e175]:
                - tab "公共资源包" [selected] [ref=e176] [cursor=pointer]:
                  - generic [ref=e180]:
                    - generic [ref=e181]: 公共内容 · 班级共用
                    - generic [ref=e182]: 公共资源包
                - tab "2026 秋 · 高等数学 1 班" [ref=e184] [cursor=pointer]:
                  - generic [ref=e188]:
                    - generic [ref=e189]: 教学班 · 2026 秋季学期
                    - generic [ref=e190]: 2026 秋 · 高等数学 1 班
                - tab "2026 秋 · 创新实验班" [ref=e192] [cursor=pointer]:
                  - generic [ref=e196]:
                    - generic [ref=e197]: 教学班 · 2026 秋季学期
                    - generic [ref=e198]: 2026 秋 · 创新实验班
                - tab "2026 秋 · 高等数学 3 班" [ref=e200] [cursor=pointer]:
                  - generic [ref=e204]:
                    - generic [ref=e205]: 教学班 · 2026 秋季学期
                    - generic [ref=e206]: 2026 秋 · 高等数学 3 班
              - button "更多班级" [ref=e209] [cursor=pointer]:
                - generic [ref=e211]: "197"
          - tabpanel "公共资源包" [ref=e215]:
            - generic [ref=e216]:
              - generic [ref=e217]:
                - navigation "面包屑" [ref=e219]:
                  - list [ref=e220]:
                    - listitem [ref=e221]:
                      - generic [ref=e222]: 课程内容
                    - listitem [ref=e223]:
                      - generic [ref=e224]: /
                      - generic [ref=e225]: 公共资源包
                - generic [ref=e226]:
                  - generic [ref=e227]:
                    - heading "知识点总览" [level=3] [ref=e228]
                    - paragraph [ref=e229]: 以知识点组织公共资源，在班级中安排教学。
                  - button "预览学生端" [ref=e231] [cursor=pointer]
              - generic [ref=e235]:
                - generic [ref=e236]:
                  - generic "已保存内容统计" [ref=e237]:
                    - generic [ref=e238]: 7 级结构
                    - generic [ref=e239]: 16 个内容节点
                    - generic [ref=e240]: 36 个学习单元
                  - radiogroup "内容类型" [ref=e242]:
                    - generic [ref=e244]:
                      - generic [ref=e245] [cursor=pointer]:
                        - radio "全部" [checked] [ref=e246]
                        - generic [ref=e247]: 全部
                      - generic [ref=e248] [cursor=pointer]:
                        - radio "作业" [ref=e249]
                        - generic [ref=e250]: 作业
                      - generic [ref=e251] [cursor=pointer]:
                        - radio "考试" [ref=e252]
                        - generic [ref=e253]: 考试
                - generic [ref=e254]:
                  - generic [ref=e255]:
                    - generic [ref=e256]: 编辑后请保存
                    - button "内容编辑说明" [ref=e257] [cursor=pointer]
                  - generic [ref=e260]:
                    - generic [ref=e261]:
                      - button "退出编辑" [ref=e262] [cursor=pointer]
                      - button "添加根节点" [ref=e264] [cursor=pointer]
                      - button "保存草稿" [ref=e266] [cursor=pointer]
                    - tree "课程内容编辑树" [ref=e268]:
                      - treeitem "第一章 · 函数、极限与连续" [expanded] [level=1] [ref=e269]:
                        - generic [ref=e270]:
                          - button "收起第一章 · 函数、极限与连续" [expanded] [ref=e271] [cursor=pointer]
                          - button "移动第一章 · 函数、极限与连续" [ref=e273] [cursor=pointer]
                          - generic "第一章 · 函数、极限与连续" [ref=e278]
                          - generic [ref=e280]:
                            - generic [ref=e281]: 20 个学习单元
                            - generic [ref=e282]: 09-24 更新
                      - treeitem "1.1 函数的基本概念" [expanded] [level=2] [ref=e283]:
                        - generic [ref=e284]:
                          - button "收起1.1 函数的基本概念" [expanded] [ref=e285] [cursor=pointer]
                          - button "移动1.1 函数的基本概念" [ref=e287] [cursor=pointer]
                          - generic "1.1 函数的基本概念" [ref=e292]
                          - generic [ref=e294]:
                            - generic [ref=e295]: 6 个学习单元
                            - generic [ref=e296]: 09-24 更新
                      - treeitem "函数的定义与表示" [level=3] [ref=e297]:
                        - generic [ref=e298]:
                          - button "移动函数的定义与表示" [ref=e299] [cursor=pointer]
                          - generic [ref=e301]: 讲义
                          - generic "函数的定义与表示" [ref=e308]
                          - generic [ref=e310]:
                            - generic [ref=e311]: 已发布
                            - generic [ref=e312]: 09-24 更新
                      - treeitem "函数的性质" [level=3] [ref=e313]:
                        - generic [ref=e314]:
                          - button "移动函数的性质" [ref=e315] [cursor=pointer]
                          - generic [ref=e317]: 视频
                          - generic "函数的性质" [ref=e324]
                          - generic [ref=e326]:
                            - generic [ref=e327]: 已发布
                            - generic [ref=e328]: 09-24 更新
                      - treeitem "1.2 极限与连续" [expanded] [level=2] [selected] [ref=e329]:
                        - generic [ref=e330]:
                          - button "收起1.2 极限与连续" [expanded] [ref=e331] [cursor=pointer]
                          - button "移动1.2 极限与连续" [ref=e333] [cursor=pointer]
                          - generic "1.2 极限与连续" [ref=e338]
                          - generic [ref=e340]:
                            - generic [ref=e341]: 8 个学习单元
                            - generic [ref=e342]: 09-24 更新
                      - treeitem "数列极限" [expanded] [level=3] [ref=e343]:
                        - generic [ref=e344]:
                          - button "收起数列极限" [expanded] [ref=e345] [cursor=pointer]
                          - button "移动数列极限" [ref=e347] [cursor=pointer]
                          - generic "数列极限" [ref=e352]
                          - generic [ref=e354]:
                            - generic [ref=e355]: 3 个学习单元
                            - generic [ref=e356]: 09-24 更新
                      - treeitem "极限的定义" [level=4] [ref=e357]:
                        - generic [ref=e358]:
                          - button "移动极限的定义" [ref=e359] [cursor=pointer]
                          - generic [ref=e361]: 讲义
                          - generic "极限的定义" [ref=e368]
                          - generic [ref=e370]:
                            - generic [ref=e371]: 已发布
                            - generic [ref=e372]: 09-24 更新
                      - treeitem "收敛性与极限运算" [expanded] [level=4] [ref=e373]:
                        - generic [ref=e374]:
                          - button "收起收敛性与极限运算" [expanded] [ref=e375] [cursor=pointer]
                          - button "移动收敛性与极限运算" [ref=e377] [cursor=pointer]
                          - generic "收敛性与极限运算" [ref=e382]
                          - generic [ref=e384]:
                            - generic [ref=e385]: 2 个学习单元
                            - generic [ref=e386]: 09-24 更新
                      - treeitem "两个重要极限" [expanded] [level=5] [ref=e387]:
                        - generic [ref=e388]:
                          - button "收起两个重要极限" [expanded] [ref=e389] [cursor=pointer]
                          - button "移动两个重要极限" [ref=e391] [cursor=pointer]
                          - generic "两个重要极限" [ref=e396]
                          - generic [ref=e398]:
                            - generic [ref=e399]: 2 个学习单元
                            - generic [ref=e400]: 09-24 更新
                      - treeitem "常见题型与方法" [expanded] [level=6] [ref=e401]:
                        - generic [ref=e402]:
                          - button "收起常见题型与方法" [expanded] [ref=e403] [cursor=pointer]
                          - button "移动常见题型与方法" [ref=e405] [cursor=pointer]
                          - generic "常见题型与方法" [ref=e410]
                          - generic [ref=e412]:
                            - generic [ref=e413]: 2 个学习单元
                            - generic [ref=e414]: 09-24 更新
                      - treeitem "例题与拓展练习" [level=7] [ref=e415]:
                        - generic [ref=e416]:
                          - button "移动例题与拓展练习" [ref=e417] [cursor=pointer]
                          - generic [ref=e419]: 作业
                          - generic "例题与拓展练习" [ref=e426]
                          - generic [ref=e428]:
                            - generic [ref=e429]: 已发布
                            - generic [ref=e430]: 09-24 更新
                      - treeitem "函数的连续性" [level=3] [ref=e431]:
                        - generic [ref=e432]:
                          - button "移动函数的连续性" [ref=e433] [cursor=pointer]
                          - generic [ref=e435]: 讲义
                          - generic "函数的连续性" [ref=e442]
                          - generic [ref=e444]:
                            - generic [ref=e445]: 已发布
                            - generic [ref=e446]: 09-24 更新
                      - treeitem "1.3 习题与应用" [level=2] [ref=e447]:
                        - generic [ref=e448]:
                          - button "移动1.3 习题与应用" [ref=e449] [cursor=pointer]
                          - generic [ref=e451]: 作业
                          - generic "1.3 习题与应用" [ref=e458]
                          - generic [ref=e460]:
                            - generic [ref=e461]: 已发布
                            - generic [ref=e462]: 09-24 更新
                      - treeitem "第二章 · 导数与微分" [expanded] [level=1] [ref=e463]:
                        - generic [ref=e464]:
                          - button "收起第二章 · 导数与微分" [expanded] [ref=e465] [cursor=pointer]
                          - button "移动第二章 · 导数与微分" [ref=e467] [cursor=pointer]
                          - generic "第二章 · 导数与微分" [ref=e472]
                          - generic [ref=e474]:
                            - generic [ref=e475]: 16 个学习单元
                            - generic [ref=e476]: 09-24 更新
                      - treeitem "2.1 导数的概念" [level=2] [ref=e477]:
                        - generic [ref=e478]:
                          - button "移动2.1 导数的概念" [ref=e479] [cursor=pointer]
                          - generic [ref=e481]: 讲义
                          - generic "2.1 导数的概念" [ref=e488]
                          - generic [ref=e490]:
                            - generic [ref=e491]: 已发布
                            - generic [ref=e492]: 09-24 更新
                      - treeitem "2.2 导数的应用" [level=2] [ref=e493]:
                        - generic [ref=e494]:
                          - button "移动2.2 导数的应用" [ref=e495] [cursor=pointer]
                          - generic [ref=e497]: 考试
                          - generic "2.2 导数的应用" [ref=e504]
                          - generic [ref=e506]:
                            - generic [ref=e507]: 已发布
                            - generic [ref=e508]: 09-24 更新
                      - generic [ref=e509]: 方向键浏览节点，F6 进入行内控件，Escape 返回节点。
                      - status [ref=e510]
              - generic [ref=e511]:
                - generic [ref=e512]: 公共资源的内容可供关联班级复用。
                - generic [ref=e513]: 模拟数据 · 未执行发布
  - generic [ref=e514]: 100% CSS 原尺寸；横向滚动查看。共享组件候选 + 本地演示内容。布局、编辑与范围选择独立；未执行同步或发布。
```

# Test source

```ts
  139 | 
  140 | test('A4 keeps manual keyboard activation, hover separators and the outlined top accent', async ({page}) => {
  141 |   await page.goto('/#navigation-v042');
  142 |   await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:'A4',exact:true}).click();
  143 |   const sample=page.getByTestId('candidate-A4'),tabs=sample.getByRole('tab');
  144 |   await tabs.nth(0).focus();
  145 |   await page.keyboard.press('ArrowRight');
  146 |   await expect(tabs.nth(1)).toBeFocused();
  147 |   await expect(tabs.nth(0)).toHaveAttribute('aria-selected','true');
  148 |   await expect(tabs.nth(1)).toHaveAttribute('aria-selected','false');
  149 |   await page.keyboard.press('Enter');
  150 |   await expect(tabs.nth(1)).toHaveAttribute('aria-selected','true');
  151 |   await tabs.nth(0).click();
  152 |   await page.getByRole('heading',{name:'导航组件 · v0.4.2'}).hover();
  153 |   await expect.poll(()=>tabs.nth(1).evaluate(el=>getComputedStyle(el,'::after').opacity)).toBe('0.65');
  154 |   await tabs.nth(2).hover();
  155 |   await expect.poll(()=>tabs.nth(1).evaluate(el=>getComputedStyle(el,'::after').opacity)).toBe('0');
  156 |   await page.getByRole('combobox',{name:/表面/}).selectOption('outlined');
  157 |   expect(await tabs.nth(0).evaluate(el=>({height:getComputedStyle(el,'::before').height,top:getComputedStyle(el,'::before').top,color:getComputedStyle(el,'::before').backgroundColor}))).toEqual({height:'2px',top:'1px',color:'rgb(21, 97, 248)'});
  158 | });
  159 | 
  160 | test('R2 range dropdown remains searchable and keyboard operable at 420px viewport height', async ({page}) => {
  161 |   await page.setViewportSize({width:1440,height:420});
  162 |   await page.goto('/#navigation-v042');
  163 |   await page.getByRole('button',{name:'更多班级',exact:true}).click();
  164 |   const dialog=page.getByRole('dialog',{name:'选择课程内容范围'});
  165 |   await expect(dialog).not.toHaveAttribute('aria-modal','true');
  166 |   const search=dialog.getByRole('textbox',{name:'搜索范围'});
  167 |   await expect(search).toBeFocused();
  168 |   await search.fill('200');
  169 |   const result=dialog.getByRole('button',{name:/2026 秋 · 高等数学 200 班/});
  170 |   await expect(result).toBeVisible();
  171 |   await result.focus(); await page.keyboard.press('Enter');
  172 |   await expect(dialog).toHaveCount(0);
  173 |   await expect(page.getByRole('tab',{name:'2026 秋 · 高等数学 200 班',exact:true})).toBeFocused();
  174 |   await page.getByRole('button',{name:'更多班级',exact:true}).click();
  175 |   await dialog.getByRole('button',{name:'关闭范围选择'}).focus(); await page.keyboard.press('Enter');
  176 |   await expect(dialog).toHaveCount(0);
  177 | });
  178 | 
  179 | test('scope cap follows the approved 1200 and 1440 viewport width budget', async ({page}) => {
  180 |   await page.goto('/#navigation-v042');
  181 |   const scope=page.getByRole('tablist',{name:'课程内容范围'});
  182 |   await page.getByRole('combobox',{name:/画板宽度/}).selectOption('1200');
  183 |   await expect(scope.getByRole('tab')).toHaveCount(3);
  184 |   await page.getByRole('combobox',{name:/画板宽度/}).selectOption('1440');
  185 |   await expect(scope.getByRole('tab')).toHaveCount(4);
  186 | });
  187 | 
  188 | test('independent consumer preserves an editor draft through scope, layout, focus and inner Tabs changes', async ({page}) => {
  189 |   await page.goto('/navigation-v042-consumer.html');
  190 |   await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toHaveCount(0);
  191 |   const editor=page.getByRole('tablist',{name:'编辑器内部视图'});
  192 |   const draft=page.getByRole('textbox',{name:'教学目标草稿'});
  193 |   const text='独立消费：掌握极限定义，保留正在编辑的教学目标。';
  194 |   await draft.fill(text);
  195 |   const before=await editor.getByRole('tab',{name:'编辑',exact:true}).evaluate(tab=>({height:tab.getBoundingClientRect().height,indicator:getComputedStyle(tab.querySelector('[data-part="indicator"]')!).height,paint:getComputedStyle(tab.querySelector('[data-part="paint"]')!).display}));
  196 |   expect(before).toEqual({height:38,indicator:'3px',paint:'block'});
  197 |   await page.getByRole('button',{name:'更多班级',exact:true}).click();
  198 |   await page.getByRole('textbox',{name:'搜索范围'}).fill('199');
  199 |   await page.getByRole('button',{name:/2026 秋 · 高等数学 199 班/}).click();
  200 |   await expect(draft).toHaveValue(text);
  201 |   await page.getByRole('button',{name:'隐藏课程导航',exact:true}).first().click();
  202 |   await page.getByRole('button',{name:'恢复课程导航',exact:true}).click();
  203 |   await page.getByRole('button',{name:'专注内容',exact:true}).click();
  204 |   await page.getByRole('button',{name:'退出专注',exact:true}).click();
  205 |   await editor.getByRole('tab',{name:'预览',exact:true}).click();
  206 |   await expect(page.getByRole('tabpanel',{name:'预览',exact:true}).getByText(text,{exact:true})).toBeVisible();
  207 |   await editor.getByRole('tab',{name:'编辑',exact:true}).click();
  208 |   await expect(draft).toHaveValue(text);
  209 |   expect(await editor.getByRole('tab',{name:'编辑',exact:true}).evaluate(tab=>({height:tab.getBoundingClientRect().height,indicator:getComputedStyle(tab.querySelector('[data-part="indicator"]')!).height,paint:getComputedStyle(tab.querySelector('[data-part="paint"]')!).display}))).toEqual(before);
  210 | });
  211 | 
  212 | test('G1 review keeps R2 alignment, local tokens and real semester/breadcrumb semantics at both artboard widths', async ({page}) => {
  213 |   await page.goto('/#navigation-v042');
  214 |   const root=page.locator('.nv42-r2'),rail=root.getByRole('navigation',{name:'平台导航',exact:true});
  215 |   await rail.getByRole('button',{name:'展开平台导航',exact:true}).click();
  216 |   for (const width of [1440,1200]) {
  217 |     await page.getByRole('combobox',{name:/画板宽度/}).selectOption(String(width));
  218 |     await page.evaluate(()=>document.fonts.ready);
  219 |     await expect.poll(()=>root.locator('.nv42-brand').evaluate(el=>el.getBoundingClientRect().left-el.parentElement!.getBoundingClientRect().left)).toBe(0);
  220 |     const facts=await root.evaluate(root=>{
  221 |       const el=(s:string)=>root.querySelector<HTMLElement>(s)!;
  222 |       const css=(s:string,p:string)=>getComputedStyle(el(s)).getPropertyValue(p);
  223 |       const rect=(s:string)=>el(s).getBoundingClientRect();
  224 |       const head=rect('.nv42-rail-head'),logo=rect('.nv42-brand'),toggle=rect('.nv42-rail-head button');
  225 |       const contextIcon=rect('.nv42-course-links [data-slot="icon"]'),historyIcon=rect('.nv42-history .rain-icon');
  226 |       return { logoLeft:logo.left-head.left,toggleRight:head.right-toggle.right,
  227 |         iconSize:rect('.nv42-rail-head .rain-icon').width,navIcon:rect('.nv42-rail-links .rain-icon').width,
  228 |         navFont:css('.nv42-rail-links [data-slot="item"]','font-size'),activeWeight:css('.nv42-rail-links [data-active]','font-weight'),activeColor:css('.nv42-rail-links [data-active]','color'),
  229 |         contextHead:css('.nv42-context-head','background-color'),contextTitle:css('.nv42-context-head strong','font-size'),
  230 |         backGap:css('.nv42-back','gap'),backIcon:rect('.nv42-back .rain-icon').width,
  231 |         scopeTitle:css('.rain-navigation__identity .rain-tabs__label','font-size'),description:css('.rain-navigation__description','color'),
  232 |         title:css('.nv42-title-row h3','font-size'),subtitle:css('.nv42-title-row p','color'),subtitleGap:css('.nv42-title-row p','margin-top'),stats:css('.nv42-stats','font-size'),
  233 |         mainTop:css('.nv42-main','padding-top'),shell:css('.nv42-workspace-body','background-color'),track:css('.rain-connected-surface','background-color'),
  234 |         historyIcon:historyIcon.width,historyOffset:historyIcon.left-contextIcon.left,historyFont:css('.nv42-history','font-size'),
  235 |         historyLabelOffset:rect('.nv42-history>span:not(.rain-icon)').left-rect('.nv42-course-links [data-slot="label"]').left,
  236 |         accountBeforeUtilities:rect('.nv42-account').right<=rect('.nv42-utilities').left,
  237 |       };
  238 |     });
> 239 |     expect(facts).toMatchObject({logoLeft:0,toggleRight:0,iconSize:16,navIcon:15,navFont:'15px',activeWeight:'600',activeColor:'rgb(15, 85, 223)',contextHead:'rgba(0, 0, 0, 0)',contextTitle:'15px',backGap:'4px',backIcon:16,scopeTitle:'15px',description:'rgb(160, 172, 197)',title:'17px',subtitle:'rgb(160, 172, 197)',subtitleGap:'2px',stats:'14px',mainTop:'8px',track:'rgb(242, 244, 255)',historyIcon:16,historyOffset:0,historyFont:'14px',historyLabelOffset:0,accountBeforeUtilities:true});
      |                   ^ Error: expect(received).toMatchObject(expected)
  240 |     for (const name of ['工作台','数据面板']) {
  241 |       const item=root.getByRole('link',{name,exact:true}); await item.hover();
  242 |       await expect(item).toHaveCSS('background-color','rgba(85, 112, 244, 0.06)');
  243 |     }
  244 |     await expect(root.locator('.nv42-account-copy')).toHaveText('林老师教师工作区');
  245 |     expect(await root.locator('.nv42-account-avatar').evaluate(el=>el.getBoundingClientRect().left-el.parentElement!.getBoundingClientRect().left)).toBe(2);
  246 |   }
  247 |   const term=root.getByRole('button',{name:'2026 秋季学期',exact:true});
  248 |   await expect(term.locator('[data-icon="icon/arrow-down"]')).toHaveCount(1);
  249 |   await term.focus(); await page.keyboard.press('Enter');
  250 |   await expect(term).toHaveAttribute('aria-expanded','true');
  251 |   await expect(term.locator('[data-icon="icon/arrow-up"]')).toHaveCount(1);
  252 |   await expect(page.getByRole('menuitem',{name:'2026 秋季学期',exact:true})).toBeVisible();
  253 |   await page.keyboard.press('Escape'); await expect(term).toBeFocused();
  254 |   await expect(term).toHaveAttribute('aria-expanded','false');
  255 |   await root.getByRole('tab',{name:'2026 秋 · 高等数学 1 班',exact:true}).click();
  256 |   await expect(root.getByRole('navigation',{name:'面包屑'}).locator('[aria-current="page"]')).toHaveText('2026 秋 · 高等数学 1 班');
  257 |   await rail.getByRole('button',{name:'收起平台导航',exact:true}).click();
  258 |   await expect(root.locator('.nv42-account-copy')).toBeHidden();
  259 |   await expect(rail.getByRole('button',{name:'当前账户：林老师'})).toBeVisible();
  260 | });
  261 | 
  262 | test('G1 review-02 interactive controls expose hover without changing disabled controls', async ({page}) => {
  263 |   const { mkdir, writeFile } = await import('node:fs/promises');
  264 |   const phase=process.env.NAV_REVIEW_PHASE==='before'?'before':'after';
  265 |   const evidence=`evidence/runtime/navigation-v042/review-07/regression-02-${phase}`;
  266 |   await mkdir(evidence,{recursive:true});
  267 |   const facts: Record<string,unknown>={};
  268 |   await page.goto('/#navigation-v042');
  269 |   const switcher=page.getByRole('navigation',{name:'导航候选样本'});
  270 |   const paint=async (element: ReturnType<typeof page.locator>)=>element.evaluate(el=>{
  271 |     const css=getComputedStyle(el);return {background:css.backgroundColor,color:css.color,shadow:css.boxShadow,border:css.borderColor,before:getComputedStyle(el,'::before').backgroundColor};
  272 |   });
  273 |   const hover=async (name:string,element:ReturnType<typeof page.locator>,disabled=false)=>{
  274 |     await page.mouse.move(0,0);
  275 |     const before=await paint(element);
  276 |     await element.hover();
  277 |     const after=await paint(element);
  278 |     facts[name]={before,after,disabled};
  279 |     if(phase==='after') {
  280 |       if(disabled) expect(after,name).toEqual(before);
  281 |       else expect(after,name).not.toEqual(before);
  282 |     }
  283 |   };
  284 |   for(const name of ['A1','A4','Connections','R2']) {
  285 |     await switcher.getByRole('button',{name,exact:true}).click();
  286 |     await page.mouse.move(0,0);
  287 |     await page.getByTestId('candidate-canvas').screenshot({path:`${evidence}/${name}.png`});
  288 |     if(name==='A1') {
  289 |       await page.getByRole('link',{name:'教学工作台',exact:true}).click();
  290 |       const selected=page.getByRole('link',{name:'教学工作台',exact:true});
  291 |       facts.a1=await selected.evaluate(el=>{
  292 |         const label=el.querySelector('.rain-tabs__label')!,line=getComputedStyle(label,'::after');
  293 |         return {lineHeight:line.height,lineWidth:line.width,labelHeight:label.getBoundingClientRect().height,tabHeight:el.getBoundingClientRect().height};
  294 |       });
  295 |       await page.getByTestId('candidate-A1').screenshot({path:`${evidence}/A1-selected.png`});
  296 |       await hover('A1 destination',page.getByRole('link',{name:'课程建设',exact:true}));
  297 |       await hover('A1 counted tab',page.getByRole('tab',{name:'学分结构',exact:true}));
  298 |     }
  299 |     if(name==='A4') {
  300 |       const sample=page.getByTestId('candidate-A4');
  301 |       facts.a4=await sample.locator('.nv42-a4-panel').evaluate(el=>{
  302 |         const title=getComputedStyle(el.querySelector('h3')!),description=getComputedStyle(el.querySelector('p')!);
  303 |         return {title:title.fontSize,description:description.color,gap:description.marginTop};
  304 |       });
  305 |       await hover('A4 unselected tab',sample.getByRole('tab').nth(1));
  306 |       await sample.screenshot({path:`${evidence}/A4-hover.png`});
  307 |       await hover('A4 all classes',sample.getByRole('button',{name:'全部班级',exact:true}));
  308 |     }
  309 |     if(name==='Connections') {
  310 |       for(const label of ['向前浏览','向后浏览','定位当前','全部']) await hover(`Connections ${label}`,page.getByRole('button',{name:label,exact:true}),label.includes('浏览'));
  311 |     }
  312 |     if(name==='R2') {
  313 |       const root=page.locator('.nv42-r2');
  314 |       for(const selector of ['.nv42-icon','.nv42-layout-button','.nv42-back','.nv42-term','[data-rain-id="pattern-manage-tree"] [data-slot="toolbar"] button:last-child','.nv42-action:not([data-variant="primary"])','.nv42-filter button:not([aria-checked="true"])','.nv42-account','.nv42-history','.rain-scope-navigation__more']) await hover(`R2 ${selector}`,root.locator(selector).first());
  315 |       await root.getByRole('button',{name:'保存草稿',exact:true}).hover();
  316 |       await root.screenshot({path:`${evidence}/R2-primary-hover.png`});
  317 |       await root.getByRole('button',{name:'更多班级',exact:true}).click();
  318 |       await hover('Scope close',page.getByRole('button',{name:'关闭范围选择'}));
  319 |       await page.getByRole('button',{name:'关闭范围选择'}).focus();
  320 |       await hover('Scope search',page.locator('.rain-navigation-scope-popup [data-rain-id="ui-input"]'));
  321 |       await hover('Scope result',page.locator('.rain-scope-navigation__result').nth(1));
  322 |       await page.getByRole('dialog').screenshot({path:`${evidence}/scope-hover.png`});
  323 |       await page.keyboard.press('Escape');
  324 |       if(phase==='after') {
  325 |         await hover('R2 preview action',root.getByRole('button',{name:'预览学生端',exact:true}));
  326 |         await hover('R2 tree row',root.locator('.rain-tree-node:not([data-selected="true"])>.rain-tree-row').first());
  327 |         await root.getByRole('button',{name:'返回我的课程',exact:true}).click();
  328 |         await hover('R2 toast close',root.getByRole('button',{name:'关闭提示',exact:true}));
  329 |         await root.getByRole('button',{name:'关闭提示',exact:true}).click();
  330 |         await root.locator('.rain-tree-node[data-selected="true"]').hover();
  331 |         await root.locator('.rain-tree-node[data-selected="true"] [data-slot="actions"] button').first().click();
  332 |         await page.getByRole('heading',{name:'编辑内容节点',exact:true}).click();
  333 |         await hover('R2 edit input',page.getByRole('dialog',{name:'编辑内容节点'}).locator('[data-rain-id="ui-input"]'));
  334 |         await page.keyboard.press('Escape');
  335 |       }
  336 |     }
  337 |   }
  338 |   await hover('Review sample control',switcher.getByRole('button',{name:'A1',exact:true}));
  339 |   await hover('Review width select',page.getByRole('combobox',{name:/画板宽度/}));
```