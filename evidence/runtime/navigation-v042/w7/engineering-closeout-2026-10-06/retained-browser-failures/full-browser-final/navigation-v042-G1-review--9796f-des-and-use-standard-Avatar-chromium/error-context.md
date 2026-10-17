# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-v042.spec.ts >> G1 review-08 rail transitions retain brand nodes and use standard Avatar
- Location: tests/e2e/navigation-v042.spec.ts:3:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 208
Received: 207
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
            - button "收起平台导航" [expanded] [ref=e68] [cursor=pointer]
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
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test('G1 review-08 rail transitions retain brand nodes and use standard Avatar', async ({page}) => {
  4   |   const {mkdir,writeFile}=await import('node:fs/promises');
  5   |   const evidence='evidence/runtime/navigation-v042/review-08/after';
  6   |   await mkdir(evidence,{recursive:true});
  7   |   await page.emulateMedia({reducedMotion:'no-preference'});
  8   |   await page.setViewportSize({width:1157,height:771});
  9   |   await page.goto('/#navigation-v042');
  10  |   const root=page.locator('.nv42-r2'),rail=root.locator('.nv42-rail');
  11  |   await expect(rail.locator('.nv42-brand strong')).toHaveCount(1);
  12  |   const avatar=rail.locator('[data-rain-id="ui-avatar"]');
  13  |   await expect(avatar).toHaveCount(1);await expect(avatar).toHaveAttribute('data-size','32');
  14  |   await expect(avatar).toHaveText('');
  15  |   await expect.poll(()=>avatar.locator('[data-slot="fallback"]').evaluate(img=>(img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  16  |   const trace=()=>rail.evaluate(async el=>{
  17  |     const text=el.querySelector('.nv42-brand strong')!;
  18  |     const frames:{time:number;width:number;logoX:number;logoY:number;opacity:number}[]=[];
  19  |     const start=performance.now();
  20  |     const sample=()=>{const r=el.querySelector('.nv42-brand > [data-rain-id="icon"]')!.getBoundingClientRect();frames.push({time:performance.now()-start,width:el.getBoundingClientRect().width,logoX:r.x,logoY:r.y,opacity:Number(getComputedStyle(text).opacity)});};
  21  |     sample();(el.querySelector('.nv42-rail-head button') as HTMLButtonElement).click();
  22  |     while(performance.now()-start<330){await new Promise(requestAnimationFrame);sample();}
  23  |     return{frames,retained:text===el.querySelector('.nv42-brand strong'),collapsed:el.getAttribute('data-collapsed')};
  24  |   });
  25  |   const opening=await trace();expect(opening.retained).toBe(true);expect(opening.collapsed).toBe('false');
> 26  |   expect(opening.frames.at(-1)!.width).toBe(208);
      |                                        ^ Error: expect(received).toBe(expected) // Object.is equality
  27  |   expect(opening.frames.filter(f=>f.width>64&&f.width<208).length).toBeGreaterThan(2);
  28  |   expect(opening.frames.some(f=>f.opacity>0&&f.opacity<1)).toBe(true);
  29  |   const closing=await trace();expect(closing.retained).toBe(true);expect(closing.frames.at(-1)!.width).toBe(64);
  30  |   expect(closing.frames.filter(f=>f.width>64&&f.width<208).length).toBeGreaterThan(2);
  31  |   for(const t of [opening,closing])expect(Math.max(...t.frames.slice(1).map((f,i)=>Math.abs(f.logoY-t.frames[i]!.logoY)))).toBeLessThan(30);
  32  |   await rail.getByRole('button',{name:'展开平台导航',exact:true}).click();
  33  |   await expect.poll(()=>rail.evaluate(el=>el.getBoundingClientRect().width)).toBe(208);
  34  |   await rail.screenshot({path:`${evidence}/expanded-rail.png`});
  35  |   await rail.getByRole('button',{name:'收起平台导航',exact:true}).click();
  36  |   await rail.getByRole('button',{name:'展开平台导航',exact:true}).click();
  37  |   await expect.poll(()=>rail.evaluate(el=>el.getBoundingClientRect().width)).toBe(208);
  38  |   await page.emulateMedia({reducedMotion:'reduce'});
  39  |   await expect(rail).toHaveCSS('transition-duration','0s');
  40  |   await rail.getByRole('button',{name:'收起平台导航',exact:true}).click();
  41  |   expect(await rail.evaluate(el=>el.getBoundingClientRect().width)).toBe(64);
  42  |   await rail.screenshot({path:`${evidence}/compact-rail.png`});
  43  |   await page.setViewportSize({width:832,height:771});
  44  |   await rail.getByRole('button',{name:'展开平台导航',exact:true}).click();
  45  |   expect(await rail.evaluate(el=>el.getBoundingClientRect().width)).toBe(208);
  46  |   await expect(rail.getByRole('button',{name:'当前账户：林老师',exact:true})).toBeVisible();
  47  |   await rail.screenshot({path:`${evidence}/expanded-832.png`});
  48  |   await page.setViewportSize({width:1600,height:1000});
  49  |   await root.screenshot({path:`${evidence}/R2-expanded.png`});
  50  |   await writeFile(`${evidence}/motion-facts.json`,JSON.stringify({opening,closing,reducedMotion:'0s',avatarSize:32},null,2));
  51  | });
  52  | 
  53  | test('G1 review-07 standard tags, concise toolbar and aligned metadata', async ({page}) => {
  54  |   const {mkdir,writeFile}=await import('node:fs/promises');
  55  |   const evidence='evidence/runtime/navigation-v042/review-07/after';
  56  |   await mkdir(evidence,{recursive:true});
  57  |   await page.setViewportSize({width:1600,height:1000});
  58  |   await page.goto('/#navigation-v042');
  59  |   const root=page.locator('.nv42-r2'),tree=root.getByRole('tree',{name:'课程内容编辑树'});
  60  |   const toolbar=root.locator('.rain-manage-tree > [data-slot="toolbar"]');
  61  |   await expect(tree).toBeVisible();
  62  |   await expect(tree.locator('[data-rain-id="ui-tag"]')).toHaveCount(8);
  63  |   await expect(tree.getByRole('treeitem',{name:'第一章 · 函数、极限与连续',exact:true}).locator('[data-slot="leading"]')).toHaveCount(0);
  64  |   await expect(tree.locator('[data-rain-id="ui-tag"]').first()).toHaveAttribute('data-size','20');
  65  |   await expect(toolbar.getByRole('button',{name:'保存草稿',exact:true})).toHaveAttribute('data-variant','primary');
  66  |   await expect(toolbar.getByRole('button',{name:'退出编辑',exact:true})).toHaveAttribute('data-variant','tertiary');
  67  |   const measure=()=>root.evaluate(el=>{
  68  |     const box=(n:Element)=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,height:r.height};};
  69  |     return {help:box(el.querySelector('.nv42-resource-help')!),toolbar:box(el.querySelector('.rain-manage-tree > [data-slot="toolbar"]')!),
  70  |       sheet:box(el.querySelector('.nv42-resource-manager')!),
  71  |       rows:Array.from(el.querySelectorAll('.rain-tree-row > [data-slot="meta"]')).map(n=>({depth:n.closest('[role="treeitem"]')!.getAttribute('aria-level'),right:n.getBoundingClientRect().right,columns:Array.from(n.querySelectorAll('.nv42-tree-meta > span')).map(c=>c.getBoundingClientRect().right)}))};
  72  |   });
  73  |   const aligned=(facts:Awaited<ReturnType<typeof measure>>)=>{
  74  |     expect(facts.toolbar.y).toBe(facts.help.y);
  75  |     expect(facts.toolbar.right).toBe(facts.sheet.right);
  76  |     expect(new Set(facts.rows.map(r=>r.right)).size).toBe(1);
  77  |     for(let i=0;i<2;i++)expect(new Set(facts.rows.map(r=>r.columns[i])).size).toBe(1);
  78  |   };
  79  |   const full=await measure();aligned(full);
  80  |   await root.screenshot({path:`${evidence}/resource-tree.png`});
  81  |   await page.setViewportSize({width:1129,height:771});
  82  |   const annotatedViewport=await measure();aligned(annotatedViewport);
  83  |   await root.getByRole('button',{name:'内容编辑说明',exact:true}).focus();
  84  |   await expect(page.getByRole('tooltip')).toContainText('统计为已保存内容');
  85  |   await page.screenshot({path:`${evidence}/help-1129.png`});
  86  |   await page.keyboard.press('Escape');await expect(page.getByRole('tooltip')).toHaveCount(0);
  87  |   await root.getByRole('button',{name:'更多班级',exact:true}).click();
  88  |   const dropdown=page.locator('.rain-navigation-scope-dropdown');
  89  |   await expect(dropdown).toBeVisible();
  90  |   const paint=await dropdown.locator('.rain-scope-navigation__result').nth(1).evaluate(el=>({icon:getComputedStyle(el.querySelector('.rain-scope-navigation__result-icon')!).color,background:getComputedStyle(el.querySelector('.rain-scope-navigation__result-icon')!).backgroundColor,text:getComputedStyle(el.querySelector('strong')!).color}));
  91  |   expect(paint.icon).toBe('rgb(184, 194, 216)');expect(paint.background).toBe('rgba(85, 112, 244, 0.06)');expect(paint.text).not.toBe(paint.icon);
  92  |   await page.screenshot({path:`${evidence}/dropdown-1129.png`});
  93  |   await dropdown.getByRole('textbox',{name:'搜索范围',exact:true}).press('Escape');
  94  |   await page.getByRole('combobox',{name:/画板宽度/}).selectOption('1200');
  95  |   const narrower=await measure();aligned(narrower);
  96  |   await page.setViewportSize({width:1400,height:900});
  97  |   await root.screenshot({path:`${evidence}/resource-tree-1200.png`});
  98  |   await root.getByRole('radio',{name:'作业',exact:true}).click();
  99  |   await expect(root.locator('.nv42-resource-help')).toContainText('筛选中不可排序');
  100 |   await root.getByRole('radio',{name:'全部',exact:true}).click();
  101 |   await toolbar.getByRole('button',{name:'退出编辑',exact:true}).click();
  102 |   await expect(toolbar.getByRole('button',{name:'进入编辑',exact:true})).toBeVisible();
  103 |   const view=await measure();aligned(view);
  104 |   await writeFile(`${evidence}/review-07-facts.json`,JSON.stringify({full,annotatedViewport,narrower,view,paint},null,2));
  105 | });
  106 | test('R2 exposes a real shared consumer, scope identity and editor survive layout changes', async ({page}) => {
  107 |   await page.goto('/#navigation-v042');
  108 |   await expect(page.getByRole('heading',{name:'导航组件 · v0.4.2'})).toBeVisible({timeout:4000});
  109 |   const root=page.locator('[data-rain-id="recipe-navigation-r2"]');
  110 |   await expect(root.getByRole('tab',{name:'公共资源包',exact:true})).toHaveAttribute('aria-selected','true');
  111 |   await root.getByRole('button',{name:'更多班级',exact:true}).click();
  112 |   await page.getByRole('textbox',{name:'搜索范围'}).fill('199');
  113 |   await page.getByRole('button',{name:/2026 秋 · 高等数学 199 班/}).click();
  114 |   await expect(root.getByRole('tab',{name:'2026 秋 · 高等数学 199 班',exact:true})).toHaveAttribute('aria-selected','true');
  115 |   await expect(root.locator('[data-slot="scope-path"]')).toContainText('199');
  116 |   await root.getByRole('button',{name:'隐藏课程导航',exact:true}).first().click();
  117 |   await expect(root.getByRole('button',{name:'恢复课程导航',exact:true})).toBeVisible();
  118 |   await root.getByRole('button',{name:'恢复课程导航',exact:true}).click();
  119 |   await expect(root.getByRole('tree')).toBeVisible();
  120 |   await expect(root.locator('[data-slot="scope-path"]')).toContainText('199');
  121 | });
  122 | 
  123 | test('A1 uses native links and keeps its 24 by 3 indicator centered on the label with inline counts', async ({page}) => {
  124 |   await page.goto('/#navigation-v042');
  125 |   await page.getByRole('navigation',{name:'导航候选样本'}).getByRole('button',{name:'A1',exact:true}).click();
  126 |   const global=page.getByTestId('candidate-A1');
```