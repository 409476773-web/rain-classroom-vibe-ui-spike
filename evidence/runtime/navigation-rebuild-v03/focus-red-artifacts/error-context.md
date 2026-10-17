# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation-rebuild-a11y.spec.ts >> N03 N04 dark popup keyboard focus has 3:1 contrast against its adjacent surface
- Location: tests/e2e/navigation-rebuild-a11y.spec.ts:23:1

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 3
Received:    2.572793361121892
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - link "G3 导航重建 v0.3 · 视觉待审核" [ref=e6] [cursor=pointer]:
      - /url: "#token-first-g3?rebuild=1&scene=tools&page=exams&course=math&scope=package&recipe=N03&view=page&count=4"
    - navigation "候选分区" [ref=e7]:
      - link "完整页面" [ref=e8] [cursor=pointer]:
        - /url: "#token-first-g3?rebuild=1&scene=tools&page=exams&course=math&scope=package&recipe=N03&view=page&count=4"
      - link "12 个组合" [ref=e9] [cursor=pointer]:
        - /url: "#token-first-g3?rebuild=1&scene=tools&page=exams&course=math&scope=package&recipe=N03&view=catalog&count=4"
      - link "共同基础 / 状态" [ref=e10] [cursor=pointer]:
        - /url: "#token-first-g3?rebuild=1&scene=tools&page=exams&course=math&scope=package&recipe=N03&view=states&count=4"
      - link "实例隔离" [ref=e11] [cursor=pointer]:
        - /url: "#token-first-g3?rebuild=1&scene=tools&page=exams&course=math&scope=package&recipe=N03&view=isolation&count=4"
      - link "专注预览" [ref=e12] [cursor=pointer]:
        - /url: "#token-first-g3?rebuild=1&scene=tools&page=exams&course=math&scope=package&recipe=N03&view=focus&count=4"
      - link "旧版对照" [ref=e13] [cursor=pointer]:
        - /url: "#token-first-g3"
  - generic [ref=e14]:
    - generic [ref=e15]:
      - text: 样例
      - combobox "页面样例" [ref=e16]:
        - option "平台考试"
        - option "课程 / 班级"
        - option "导航面板" [selected]
        - option "文档命令"
        - option "设备预约"
    - generic [ref=e17]:
      - text: 组合
      - combobox "导航组合" [ref=e18]:
        - option "S01 深色贴边"
        - option "S02 浅色贴边"
        - option "S04 图标收起"
        - option "S05 窄轨＋次级栏"
        - option "S06 内嵌主区"
        - option "S08 上下文抬头"
        - option "N01 文字＋指示线"
        - option "N02 柔和圆角块"
        - option "N03 紧凑展开" [selected]
        - option "N04 图标＋说明"
        - option "M01 无框命令栏"
        - option "M02 细边框命令栏"
        - option "S03 边缘指示"
        - option "S07 浮动对照"
        - option "C01 顶部＋左侧"
    - generic [ref=e19]:
      - text: 面层
      - combobox "导航表面" [ref=e20]:
        - option "深色" [selected]
        - option "浅色"
    - generic [ref=e21]:
      - text: 密度
      - combobox "导航密度" [ref=e22]:
        - option "标准" [selected]
        - option "紧凑"
    - generic [ref=e23]:
      - text: 形态
      - combobox "导航形态" [ref=e24]:
        - option "完整" [selected]
        - option "纯图标"
        - option "图标＋短文字"
    - generic [ref=e25]:
      - text: 区域
      - combobox "页面关系" [ref=e26]:
        - option "贴边" [selected]
        - option "内嵌主区"
        - option "浮动对照"
    - generic [ref=e27]:
      - text: 当前项
      - combobox "导航当前表达" [ref=e28]:
        - option "弱填充" [selected]
        - option "边缘指示"
  - generic [ref=e30]:
    - navigation "全局导航" [ref=e31]:
      - link "雨课堂教学工作台" [ref=e33] [cursor=pointer]:
        - /url: "#token-first-g3?rebuild=1&scene=platform&page=home&course=math&scope=package&recipe=N03&view=page&count=4"
        - generic [ref=e35]:
          - text: 雨课堂
          - generic [ref=e36]: 教学管理
      - generic [ref=e37]:
        - generic [ref=e38]: 教学空间
        - link "教学工作台" [ref=e41] [cursor=pointer]:
          - /url: "#token-first-g3?rebuild=1&scene=platform&page=home&course=math&scope=package&recipe=N03&view=page&count=4"
        - generic [ref=e45]:
          - generic [ref=e46]:
            - link "课程建设" [ref=e47] [cursor=pointer]:
              - /url: "#token-first-g3?rebuild=1&scene=course&page=courses&course=math&scope=package&recipe=N03&view=page&count=4"
            - button "收起课程建设" [expanded] [ref=e51] [cursor=pointer]
          - generic [ref=e53]:
            - link "课程内容" [ref=e56] [cursor=pointer]:
              - /url: "#token-first-g3?rebuild=1&scene=course&page=course-content&course=math&scope=package&recipe=N03&view=page&count=4"
            - link "课程概览" [ref=e60] [cursor=pointer]:
              - /url: "#token-first-g3?rebuild=1&scene=course&page=course-overview&course=math&scope=package&recipe=N03&view=page&count=4"
        - link "资源中心" [ref=e64] [cursor=pointer]:
          - /url: "#token-first-g3?rebuild=1&scene=platform&page=resources&course=math&scope=package&recipe=N03&view=page&count=4"
          - generic [ref=e68]: "128"
        - link "考试管理" [ref=e71] [cursor=pointer]:
          - /url: "#token-first-g3?rebuild=1&scene=platform&page=exams&course=math&scope=package&recipe=N03&view=page&count=4"
        - link "学习数据与教学质量分析" [ref=e77] [cursor=pointer]:
          - /url: "#token-first-g3?rebuild=1&scene=platform&page=analysis&course=math&scope=package&recipe=N03&view=page&count=4"
        - link "团队协作" [ref=e83] [cursor=pointer]:
          - /url: "#token-first-g3?rebuild=1&scene=platform&page=team&course=math&scope=package&recipe=N03&view=page&count=4"
        - link "消息中心" [ref=e89] [cursor=pointer]:
          - /url: "#token-first-g3?rebuild=1&scene=platform&page=messages&course=math&scope=package&recipe=N03&view=page&count=4"
        - link "设置" [ref=e95] [cursor=pointer]:
          - /url: "#token-first-g3?rebuild=1&scene=platform&page=settings&course=math&scope=package&recipe=N03&view=page&count=4"
      - generic [ref=e99]:
        - button "收起全局导航" [ref=e100] [cursor=pointer]: 收起导航
        - generic [ref=e102]:
          - generic [ref=e103]: 林
          - generic [ref=e104]:
            - text: 林老师
            - generic [ref=e105]: 教师工作空间
    - generic [ref=e106]:
      - generic [ref=e107]:
        - button "隐藏全局导航" [ref=e108] [cursor=pointer]: 隐藏导航
        - generic [ref=e110]: 教师工作空间
        - generic [ref=e111]:
          - text: 2026 秋季学期
          - generic [ref=e112]: 林
      - main [ref=e113]:
        - generic [ref=e114]:
          - generic [ref=e115]:
            - generic [ref=e116]:
              - heading "AI 教学工具" [level=1] [ref=e117]
              - paragraph [ref=e118]: 从备课、练习到反馈，找到当前教学任务需要的工具。
            - generic [ref=e119]: 本地模拟 · 未连接 AI 服务
          - region "后台点击导航示例" [ref=e120]:
            - generic [ref=e121]:
              - heading "后台工作区" [level=2] [ref=e122]
              - generic [ref=e123]:
                - generic [ref=e124]:
                  - text: 当前实例面层
                  - combobox "实例 A 面层" [ref=e125]:
                    - option "浅色"
                    - option "深色" [selected]
                - generic [ref=e126]:
                  - text: 密度
                  - combobox "实例 A 密度" [ref=e127]:
                    - option "标准" [selected]
                    - option "紧凑"
            - navigation "实例 A 导航" [ref=e130]:
              - list [ref=e131]:
                - listitem [ref=e132]:
                  - link "教学工作台" [ref=e133] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=home&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e134]:
                  - link "课程建设" [ref=e135] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=course&page=courses&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e136]:
                  - link "资源中心" [ref=e137] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=resources&course=math&scope=package&recipe=N03&view=page&count=4"
                  - button "收起资源中心入口" [expanded] [ref=e139] [cursor=pointer]
                  - dialog "实例 A 导航：二级入口" [ref=e144]:
                    - generic [ref=e145]:
                      - heading "教学工具入口" [level=2] [ref=e146]
                      - generic [ref=e147]:
                        - link "课程提纲" [active] [ref=e148] [cursor=pointer]:
                          - /url: "#token-first-g3?rebuild=1&scene=tools&page=tool-outline&course=math&scope=package&recipe=N03&view=page&count=4"
                        - link "题目草拟" [ref=e153] [cursor=pointer]:
                          - /url: "#token-first-g3?rebuild=1&scene=tools&page=tool-questions&course=math&scope=package&recipe=N03&view=page&count=4"
                        - link "作业反馈" [ref=e158] [cursor=pointer]:
                          - /url: "#token-first-g3?rebuild=1&scene=tools&page=tool-feedback&course=math&scope=package&recipe=N03&view=page&count=4"
                        - link "学习分析" [ref=e163] [cursor=pointer]:
                          - /url: "#token-first-g3?rebuild=1&scene=tools&page=tool-analysis&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e170]:
                  - link "考试管理" [ref=e171] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=exams&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e172]:
                  - link "学习数据与教学质量分析" [ref=e173] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=analysis&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e174]:
                  - link "团队协作" [ref=e175] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=team&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e176]:
                  - link "消息中心" [ref=e177] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=messages&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e178]:
                  - link "设置" [ref=e179] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=settings&course=math&scope=package&recipe=N03&view=page&count=4"
          - region "工具内容" [ref=e180]:
            - generic [ref=e181]:
              - text: 开始一项教学任务
              - heading "把教学准备放在同一个工作空间" [level=2] [ref=e182]
              - paragraph [ref=e183]: 通过“资源中心”旁的展开入口浏览工具。选择用途后，这里显示对应的本地工作内容。
            - generic [ref=e184]:
              - link [ref=e185] [cursor=pointer]:
                - /url: "#token-first-g3?rebuild=1&scene=tools&page=tool-outline&course=math&scope=package&recipe=N03&view=page&count=4"
                - generic [ref=e187]:
                  - strong [ref=e188]: 课程提纲
                  - paragraph [ref=e189]: 梳理教学目标与章节顺序，形成可调整的课程结构。
              - link [ref=e190] [cursor=pointer]:
                - /url: "#token-first-g3?rebuild=1&scene=tools&page=tool-questions&course=math&scope=package&recipe=N03&view=page&count=4"
                - generic [ref=e192]:
                  - strong [ref=e193]: 题目草拟
                  - paragraph [ref=e194]: 按知识点组织练习题草稿，供教师检查与修改。
              - link [ref=e195] [cursor=pointer]:
                - /url: "#token-first-g3?rebuild=1&scene=tools&page=tool-feedback&course=math&scope=package&recipe=N03&view=page&count=4"
                - generic [ref=e197]:
                  - strong [ref=e198]: 作业反馈
                  - paragraph [ref=e199]: 整理学生作业中的共性问题，并根据教学目标归纳需要进一步解释的概念、课堂讨论方向与反馈要点；所有建议均由教师确认后使用。
              - link [ref=e200] [cursor=pointer]:
                - /url: "#token-first-g3?rebuild=1&scene=tools&page=tool-analysis&course=math&scope=package&recipe=N03&view=page&count=4"
                - generic [ref=e202]:
                  - strong [ref=e203]: 学习分析
                  - paragraph [ref=e204]: 汇总学习进度与薄弱知识点，为后续教学安排提供参考。
          - region "门户悬停导航示例" [ref=e205]:
            - generic [ref=e206]:
              - heading "门户入口对照" [level=2] [ref=e207]
              - generic [ref=e208]: 延迟悬停；也可点击或使用键盘
            - navigation "实例 B 导航" [ref=e211]:
              - list [ref=e212]:
                - listitem [ref=e213]:
                  - link "教学工作台" [ref=e214] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=home&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e215]:
                  - link "课程建设" [ref=e216] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=course&page=courses&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e217]:
                  - link "资源中心" [ref=e218] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=resources&course=math&scope=package&recipe=N03&view=page&count=4"
                  - button "展开资源中心入口" [ref=e219] [cursor=pointer]
                - listitem [ref=e221]:
                  - link "考试管理" [ref=e222] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=exams&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e223]:
                  - link "学习数据与教学质量分析" [ref=e224] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=analysis&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e225]:
                  - link "团队协作" [ref=e226] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=team&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e227]:
                  - link "消息中心" [ref=e228] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=messages&course=math&scope=package&recipe=N03&view=page&count=4"
                - listitem [ref=e229]:
                  - link "设置" [ref=e230] [cursor=pointer]:
                    - /url: "#token-first-g3?rebuild=1&scene=platform&page=settings&course=math&scope=package&recipe=N03&view=page&count=4"
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test';
  2  | import {writeFileSync} from 'node:fs';
  3  | import {contrastRatio} from './color-contrast';
  4  | const url='http://127.0.0.1:4174/#token-first-g3?rebuild=1';
  5  | test('scoped rendered token values, required text contrast and target sizes',async({page})=>{
  6  |  const facts:unknown[]=[];
  7  |  for(const recipe of ['S01','S02','N04','M02']){
  8  |   const scene=recipe==='N04'?'tools':recipe==='M02'?'commands':'platform';await page.goto(url+`&recipe=${recipe}&scene=${scene}`);
  9  |   if(recipe==='N04')await page.getByRole('navigation',{name:'实例 A 导航',exact:true}).getByRole('button',{name:'展开资源中心入口'}).click();
  10 |   if(recipe==='M02')await page.getByRole('region',{name:'命令工作台 A'}).getByRole('menuitem',{name:'视图',exact:true}).click();
  11 |   const root=recipe==='N04'?page.locator('.nr-topnav-popup'):recipe==='M02'?page.locator('.nr-command-popup'):page.getByRole('navigation',{name:'全局导航',exact:true});
  12 |   const data=await root.evaluate(root=>{
  13 |    const values=Array.from(root.querySelectorAll('a,button,[role^=menuitem],.nr-topnav-tool-copy>span,.nr-group-label')).filter(el=>{const rect=el.getBoundingClientRect();return rect.width&&rect.height&&!el.hasAttribute('disabled')&&el.getAttribute('aria-disabled')!=='true';}).map(el=>{
  14 |     const style=getComputedStyle(el);const backgrounds:string[]=[];let parent:Element|null=el;while(parent&&backgrounds.length<2){const bg=getComputedStyle(parent).backgroundColor;if(!['rgba(0, 0, 0, 0)','transparent'].includes(bg))backgrounds.push(bg);parent=parent.parentElement;}const rect=el.getBoundingClientRect();
  15 |     return {text:el.textContent?.trim(),color:style.color,background:backgrounds[0]??'rgb(255,255,255)',parentBackground:backgrounds[1]??'rgb(255,255,255)',width:rect.width,height:rect.height,interactive:el.matches('a,button,[role^=menuitem]')};
  16 |    });return values;
  17 |   });
  18 |   for(const row of data){const ratio=contrastRatio(row.color,row.background,row.parentBackground);facts.push({recipe,...row,ratio});expect.soft(ratio,`${recipe} ${row.text}`).toBeGreaterThanOrEqual(4.5);if(row.interactive){expect.soft(row.width,`${recipe} target width ${row.text}`).toBeGreaterThanOrEqual(24);expect.soft(row.height,`${recipe} target height ${row.text}`).toBeGreaterThanOrEqual(24);}}
  19 |  }
  20 |  writeFileSync('evidence/runtime/navigation-rebuild-v03/contrast-and-targets.json',JSON.stringify(facts,null,2));
  21 | });
  22 | 
  23 | test('N03 N04 dark popup keyboard focus has 3:1 contrast against its adjacent surface',async({page})=>{
  24 |  const facts:unknown[]=[];
  25 |  for(const recipe of ['N03','N04']){
  26 |   await page.goto(url+`&recipe=${recipe}&scene=tools`);
  27 |   await page.getByRole('combobox',{name:'实例 A 面层'}).selectOption('dark');
  28 |   const trigger=page.getByRole('navigation',{name:'实例 A 导航',exact:true}).getByRole('button',{name:'展开资源中心入口'});
  29 |   await trigger.focus();await page.keyboard.press('Enter');
  30 |   const link=page.locator('.nr-topnav-popup').getByRole('link',{name:'课程提纲',exact:true});
  31 |   await expect(link).toBeFocused();
  32 |   const colors=await link.evaluate(el=>({outline:getComputedStyle(el).outlineColor,background:getComputedStyle(el.closest('.nr-topnav-popup')!).backgroundColor,width:getComputedStyle(el).outlineWidth,visible:el.matches(':focus-visible')}));
  33 |   const ratio=contrastRatio(colors.outline,colors.background,'rgb(255,255,255)');
> 34 |   facts.push({recipe,...colors,ratio});expect(colors.visible).toBe(true);expect(ratio).toBeGreaterThanOrEqual(3);
     |                                                                                        ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  35 |   await page.screenshot({path:`evidence/runtime/navigation-rebuild-v03/${recipe}-dark-focus.png`});
  36 |  }
  37 |  writeFileSync('evidence/runtime/navigation-rebuild-v03/dark-focus-contrast.json',JSON.stringify(facts,null,2));
  38 | });
  39 | 
```