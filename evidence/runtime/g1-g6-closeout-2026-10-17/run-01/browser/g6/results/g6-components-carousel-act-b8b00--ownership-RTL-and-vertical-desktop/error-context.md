# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g6-components.spec.ts >> carousel actual API, input key ownership, RTL and vertical
- Location: evidence/runtime/g1-g6-closeout-2026-10-17/run-01/browser/g6-components.spec.ts:50:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.press: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('region', { name: '纵向课程摘录', exact: true })

```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Carousel 内容轮播" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 共享候选 · 尚未发布
    - paragraph [ref=e11]: 以已确认的视觉与交互稿为参照，组合精选、多卡、纵向和播放场景；真实位置与运动统一由公共组件提供。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "精选内容" [level=2] [ref=e21]
      - paragraph [ref=e22]: 沿用已确认稿的专题插画、信息层级和浅灰控件；箭头相邻浏览，短条直接定位。覆盖控件为文字与查看入口保留空间。
      - generic [ref=e24]:
        - generic "精选内容设置" [ref=e25]:
          - generic [ref=e26]:
            - generic [ref=e27]: 控件布局
            - combobox "控件布局" [ref=e29] [cursor=pointer]:
              - option "覆盖内容" [selected]
              - option "与内容分离"
          - generic [ref=e30]:
            - generic [ref=e31]: 指示器
            - combobox "指示器" [ref=e33] [cursor=pointer]:
              - option "顶部"
              - option "底部" [selected]
              - option "左侧"
              - option "右侧"
        - region "精选内容" [ref=e34]:
          - generic [ref=e36]:
            - paragraph [ref=e37]: 本周精选
            - heading "每一次探索，都有新发现" [level=3] [ref=e38]
          - generic [ref=e39]:
            - generic [ref=e41]:
              - group "1 / 4：看见数学的形状" [ref=e42]:
                - article [ref=e43]:
                  - generic [ref=e44]:
                    - paragraph [ref=e45]: 数学与生活
                    - heading "看见数学的形状" [level=3] [ref=e46]
                    - paragraph [ref=e47]: 从一张纸、一束光开始，发现日常世界中的几何之美。
                    - generic [ref=e48]:
                      - button "查看专题" [ref=e49] [cursor=pointer]
                      - generic [ref=e51]: 4 个章节 · 36 分钟
              - group "2 / 4：让证据说话" [ref=e68]:
                - article [ref=e69]:
                  - generic [ref=e70]:
                    - paragraph [ref=e71]: 研究与表达
                    - heading "让证据说话" [level=3] [ref=e72]
                    - paragraph [ref=e73]: 把观察变成问题，把数据变成可以交流的观点。
                    - generic [ref=e74]:
                      - button "查看专题" [ref=e75] [cursor=pointer]
                      - generic [ref=e77]: 6 个章节 · 48 分钟
              - group "3 / 4：一片叶子的宇宙" [ref=e102]:
                - article [ref=e103]:
                  - generic [ref=e104]:
                    - paragraph [ref=e105]: 自然与科学
                    - heading "一片叶子的宇宙" [level=3] [ref=e106]
                    - paragraph [ref=e107]: 从植物的生长，理解生命如何与周围的环境连接。
                    - generic [ref=e108]:
                      - button "查看专题" [ref=e109] [cursor=pointer]
                      - generic [ref=e111]: 5 个章节 · 42 分钟
              - group "4 / 4：走进空间的秩序" [ref=e134]:
                - article [ref=e135]:
                  - generic [ref=e136]:
                    - paragraph [ref=e137]: 建筑与设计
                    - heading "走进空间的秩序" [level=3] [ref=e138]
                    - paragraph [ref=e139]: 观察光线、尺度与结构，读懂一座建筑的语言。
                    - generic [ref=e140]:
                      - button "查看专题" [ref=e141] [cursor=pointer]
                      - generic [ref=e143]: 4 个章节 · 32 分钟
            - generic:
              - button "上一项" [disabled] [ref=e169]
              - group "选择轮播位置" [ref=e172]:
                - button "转到第 1 项" [ref=e173] [cursor=pointer]
                - button "转到第 2 项" [ref=e175] [cursor=pointer]
                - button "转到第 3 项" [ref=e177] [cursor=pointer]
                - button "转到第 4 项" [ref=e179] [cursor=pointer]
              - button "下一项" [ref=e181] [cursor=pointer]
          - generic [ref=e184]:
            - generic [ref=e185]: 01 / 04
            - generic [ref=e186]: 支持拖动与左右方向键
    - generic [ref=e187]:
      - heading "多卡课程浏览" [level=2] [ref=e188]
      - paragraph [ref=e189]: 宽屏同时浏览多门课程，窄屏保留完整课程与下一张线索。短条对应真实停靠组，覆盖控件留在封面。
      - generic [ref=e191]:
        - generic "课程浏览设置" [ref=e192]:
          - generic [ref=e193]:
            - generic [ref=e194]: 控件布局
            - combobox "控件布局" [ref=e196] [cursor=pointer]:
              - option "覆盖内容" [selected]
              - option "与内容分离"
          - generic [ref=e197]:
            - generic [ref=e198]: 指示器
            - combobox "指示器" [ref=e200] [cursor=pointer]:
              - option "顶部"
              - option "底部" [selected]
              - option "左侧"
              - option "右侧"
        - region "课程浏览" [ref=e201]:
          - generic [ref=e203]:
            - paragraph [ref=e204]: 为你发现
            - heading "把好奇心，变成新的发现" [level=3] [ref=e205]
          - generic [ref=e206]:
            - generic [ref=e208]:
              - group "1 / 6：看见数学的形状" [ref=e209]:
                - article [ref=e210]:
                  - generic [ref=e227]:
                    - generic [ref=e228]: 数学与生活
                    - heading "看见数学的形状" [level=3] [ref=e229]
                    - paragraph [ref=e230]: 4 个章节 · 36 分钟
                    - button "查看课程" [ref=e231] [cursor=pointer]
              - group "2 / 6：让证据说话" [ref=e233]:
                - article [ref=e234]:
                  - generic [ref=e259]:
                    - generic [ref=e260]: 研究与表达
                    - heading "让证据说话" [level=3] [ref=e261]
                    - paragraph [ref=e262]: 6 个章节 · 48 分钟
                    - button "查看课程" [ref=e263] [cursor=pointer]
              - group "3 / 6：一片叶子的宇宙" [ref=e265]:
                - article [ref=e266]:
                  - generic [ref=e289]:
                    - generic [ref=e290]: 自然与科学
                    - heading "一片叶子的宇宙" [level=3] [ref=e291]
                    - paragraph [ref=e292]: 5 个章节 · 42 分钟
                    - button "查看课程" [ref=e293] [cursor=pointer]
              - group "4 / 6：走进空间的秩序" [ref=e295]:
                - article [ref=e296]:
                  - generic [ref=e322]:
                    - generic [ref=e323]: 建筑与设计
                    - heading "走进空间的秩序" [level=3] [ref=e324]
                    - paragraph [ref=e325]: 4 个章节 · 32 分钟
                    - button "查看课程" [ref=e326] [cursor=pointer]
              - group "5 / 6：用图表讲清一个问题" [ref=e328]:
                - article [ref=e329]:
                  - generic [ref=e354]:
                    - generic [ref=e355]: 数据素养
                    - heading "用图表讲清一个问题" [level=3] [ref=e356]
                    - paragraph [ref=e357]: 3 个章节 · 25 分钟
                    - button "查看课程" [ref=e358] [cursor=pointer]
              - group "6 / 6：校园里的微型生态" [ref=e360]:
                - article [ref=e361]:
                  - generic [ref=e384]:
                    - generic [ref=e385]: 观察练习
                    - heading "校园里的微型生态" [level=3] [ref=e386]
                    - paragraph [ref=e387]: 3 个章节 · 28 分钟
                    - button "查看课程" [ref=e388] [cursor=pointer]
            - generic:
              - button "上一项" [disabled] [ref=e390]
              - group "选择轮播位置" [ref=e393]:
                - button "转到第 1 组" [ref=e394] [cursor=pointer]
                - button "转到第 2 组" [ref=e396] [cursor=pointer]
              - button "下一项" [ref=e398] [cursor=pointer]
          - generic [ref=e401]:
            - generic [ref=e402]: 浏览位置 1 / 2 · 共 6 门课程
            - generic [ref=e403]: 支持拖动与左右方向键
    - generic [ref=e404]:
      - heading "纵向预览" [level=2] [ref=e405]
      - paragraph [ref=e406]: 上下拖动与方向键沿课程顺序切换，指示器位置可独立选择；内容区提供明确高度。
      - generic [ref=e408]:
        - generic "纵向专题预览设置" [ref=e409]:
          - generic [ref=e410]:
            - generic [ref=e411]: 控件布局
            - combobox "控件布局" [ref=e413] [cursor=pointer]:
              - option "覆盖内容" [selected]
              - option "与内容分离"
          - generic [ref=e414]:
            - generic [ref=e415]: 指示器
            - combobox "指示器" [ref=e417] [cursor=pointer]:
              - option "顶部"
              - option "底部"
              - option "左侧"
              - option "右侧" [selected]
        - region "纵向专题预览" [ref=e418]:
          - generic [ref=e420]:
            - paragraph [ref=e421]: 阅读与探索
            - heading "换个方向，看见更多" [level=3] [ref=e422]
          - generic [ref=e423]:
            - generic [ref=e425]:
              - group "1 / 4：看见数学的形状" [ref=e426]:
                - article [ref=e427]:
                  - generic [ref=e428]:
                    - paragraph [ref=e429]: 数学与生活
                    - heading "看见数学的形状" [level=3] [ref=e430]
                    - paragraph [ref=e431]: 从一张纸、一束光开始，发现日常世界中的几何之美。
                    - generic [ref=e432]:
                      - button "查看专题" [ref=e433] [cursor=pointer]
                      - generic [ref=e435]: 4 个章节 · 36 分钟
              - group "2 / 4：让证据说话" [ref=e452]:
                - article [ref=e453]:
                  - generic [ref=e454]:
                    - paragraph [ref=e455]: 研究与表达
                    - heading "让证据说话" [level=3] [ref=e456]
                    - paragraph [ref=e457]: 把观察变成问题，把数据变成可以交流的观点。
                    - generic [ref=e458]:
                      - button "查看专题" [ref=e459] [cursor=pointer]
                      - generic [ref=e461]: 6 个章节 · 48 分钟
              - group "3 / 4：一片叶子的宇宙" [ref=e486]:
                - article [ref=e487]:
                  - generic [ref=e488]:
                    - paragraph [ref=e489]: 自然与科学
                    - heading "一片叶子的宇宙" [level=3] [ref=e490]
                    - paragraph [ref=e491]: 从植物的生长，理解生命如何与周围的环境连接。
                    - generic [ref=e492]:
                      - button "查看专题" [ref=e493] [cursor=pointer]
                      - generic [ref=e495]: 5 个章节 · 42 分钟
              - group "4 / 4：走进空间的秩序" [ref=e518]:
                - article [ref=e519]:
                  - generic [ref=e520]:
                    - paragraph [ref=e521]: 建筑与设计
                    - heading "走进空间的秩序" [level=3] [ref=e522]
                    - paragraph [ref=e523]: 观察光线、尺度与结构，读懂一座建筑的语言。
                    - generic [ref=e524]:
                      - button "查看专题" [ref=e525] [cursor=pointer]
                      - generic [ref=e527]: 4 个章节 · 32 分钟
            - generic:
              - button "上一项" [disabled] [ref=e553]
              - group "选择轮播位置" [ref=e556]:
                - button "转到第 1 项" [ref=e557] [cursor=pointer]
                - button "转到第 2 项" [ref=e559] [cursor=pointer]
                - button "转到第 3 项" [ref=e561] [cursor=pointer]
                - button "转到第 4 项" [ref=e563] [cursor=pointer]
              - button "下一项" [ref=e565] [cursor=pointer]
          - generic [ref=e568]:
            - generic [ref=e569]: 01 / 04
            - generic [ref=e570]: 支持拖动与上下方向键
    - generic [ref=e571]:
      - heading "定时翻页 · 正向与反向" [level=2] [ref=e572]
      - paragraph [ref=e573]: 显式启用定时播放。悬停临时暂停；点击导航、拖动或键盘进入后持续暂停，点击继续才恢复。
      - generic [ref=e575]:
        - generic "定时精选内容设置" [ref=e576]:
          - generic [ref=e577]:
            - generic [ref=e578]: 控件布局
            - combobox "控件布局" [ref=e580] [cursor=pointer]:
              - option "覆盖内容" [selected]
              - option "与内容分离"
          - generic [ref=e581]:
            - generic [ref=e582]: 指示器
            - combobox "指示器" [ref=e584] [cursor=pointer]:
              - option "顶部"
              - option "底部" [selected]
              - option "左侧"
              - option "右侧"
          - generic [ref=e585]:
            - generic [ref=e586]: 停留
            - combobox "停留" [ref=e588] [cursor=pointer]:
              - option "3 秒"
              - option "5 秒" [selected]
              - option "8 秒"
          - generic [ref=e589]:
            - generic [ref=e590]: 顺序
            - combobox "顺序" [ref=e592] [cursor=pointer]:
              - option "正向" [selected]
              - option "反向"
        - region "定时精选内容" [ref=e593]:
          - generic [ref=e595]:
            - paragraph [ref=e596]: 本周精选
            - heading "每一次探索，都有新发现" [level=3] [ref=e597]
          - generic [ref=e598]:
            - generic [ref=e600]:
              - group "1 / 4：看见数学的形状" [ref=e601]:
                - article [ref=e602]:
                  - generic [ref=e603]:
                    - paragraph [ref=e604]: 数学与生活
                    - heading "看见数学的形状" [level=3] [ref=e605]
                    - paragraph [ref=e606]: 从一张纸、一束光开始，发现日常世界中的几何之美。
                    - generic [ref=e607]:
                      - button "查看专题" [ref=e608] [cursor=pointer]
                      - generic [ref=e610]: 4 个章节 · 36 分钟
              - group "2 / 4：让证据说话" [ref=e627]:
                - article [ref=e628]:
                  - generic [ref=e629]:
                    - paragraph [ref=e630]: 研究与表达
                    - heading "让证据说话" [level=3] [ref=e631]
                    - paragraph [ref=e632]: 把观察变成问题，把数据变成可以交流的观点。
                    - generic [ref=e633]:
                      - button "查看专题" [ref=e634] [cursor=pointer]
                      - generic [ref=e636]: 6 个章节 · 48 分钟
              - group "3 / 4：一片叶子的宇宙" [ref=e661]:
                - article [ref=e662]:
                  - generic [ref=e663]:
                    - paragraph [ref=e664]: 自然与科学
                    - heading "一片叶子的宇宙" [level=3] [ref=e665]
                    - paragraph [ref=e666]: 从植物的生长，理解生命如何与周围的环境连接。
                    - generic [ref=e667]:
                      - button "查看专题" [ref=e668] [cursor=pointer]
                      - generic [ref=e670]: 5 个章节 · 42 分钟
              - group "4 / 4：走进空间的秩序" [ref=e693]:
                - article [ref=e694]:
                  - generic [ref=e695]:
                    - paragraph [ref=e696]: 建筑与设计
                    - heading "走进空间的秩序" [level=3] [ref=e697]
                    - paragraph [ref=e698]: 观察光线、尺度与结构，读懂一座建筑的语言。
                    - generic [ref=e699]:
                      - button "查看专题" [ref=e700] [cursor=pointer]
                      - generic [ref=e702]: 4 个章节 · 32 分钟
            - generic:
              - button "上一项" [ref=e728] [cursor=pointer]
              - group "选择轮播位置" [ref=e731]:
                - button "转到第 1 项" [ref=e732] [cursor=pointer]
                - button "转到第 2 项" [ref=e734] [cursor=pointer]
                - button "转到第 3 项" [ref=e736] [cursor=pointer]
                - button "转到第 4 项" [ref=e738] [cursor=pointer]
              - button "下一项" [ref=e740] [cursor=pointer]
          - generic [ref=e743]:
            - generic [ref=e744]: 01 / 04
            - generic [ref=e745]:
              - status [ref=e746]: 暂时暂停
              - button "暂停播放" [ref=e747] [cursor=pointer]
    - generic [ref=e751]:
      - heading "连续展示 · 正向与反向" [level=2] [ref=e752]
      - paragraph [ref=e753]: 以稳定速度展示课程；可以切换横纵方向与播放顺序。暂停后仍保留真实拖动与导航。
      - generic [ref=e755]:
        - generic "连续课程展示设置" [ref=e756]:
          - generic [ref=e757]:
            - generic [ref=e758]: 控件布局
            - combobox "控件布局" [ref=e760] [cursor=pointer]:
              - option "覆盖内容" [selected]
              - option "与内容分离"
          - generic [ref=e761]:
            - generic [ref=e762]: 方向
            - combobox "方向" [ref=e764] [cursor=pointer]:
              - option "横向" [selected]
              - option "纵向"
          - generic [ref=e765]:
            - generic [ref=e766]: 速度
            - combobox "速度" [ref=e768] [cursor=pointer]:
              - option "舒缓"
              - option "适中" [selected]
              - option "轻快"
          - generic [ref=e769]:
            - generic [ref=e770]: 顺序
            - combobox "顺序" [ref=e772] [cursor=pointer]:
              - option "正向" [selected]
              - option "反向"
        - region "连续课程展示" [ref=e773]:
          - generic [ref=e775]:
            - paragraph [ref=e776]: 灵感持续发生
            - heading "探索的脚步，不止于课堂" [level=3] [ref=e777]
          - generic [ref=e778]:
            - generic [ref=e780]:
              - group "1 / 6：看见数学的形状" [ref=e781]:
                - article [ref=e782]:
                  - generic [ref=e799]:
                    - generic [ref=e800]: 数学与生活
                    - heading "看见数学的形状" [level=3] [ref=e801]
                    - paragraph [ref=e802]: 4 个章节 · 36 分钟
              - group "2 / 6：让证据说话" [ref=e803]:
                - article [ref=e804]:
                  - generic [ref=e829]:
                    - generic [ref=e830]: 研究与表达
                    - heading "让证据说话" [level=3] [ref=e831]
                    - paragraph [ref=e832]: 6 个章节 · 48 分钟
              - group "3 / 6：一片叶子的宇宙" [ref=e833]:
                - article [ref=e834]:
                  - generic [ref=e857]:
                    - generic [ref=e858]: 自然与科学
                    - heading "一片叶子的宇宙" [level=3] [ref=e859]
                    - paragraph [ref=e860]: 5 个章节 · 42 分钟
              - group "4 / 6：走进空间的秩序" [ref=e861]:
                - article [ref=e862]:
                  - generic [ref=e888]:
                    - generic [ref=e889]: 建筑与设计
                    - heading "走进空间的秩序" [level=3] [ref=e890]
                    - paragraph [ref=e891]: 4 个章节 · 32 分钟
              - group "5 / 6：用图表讲清一个问题" [ref=e892]:
                - article [ref=e893]:
                  - generic [ref=e918]:
                    - generic [ref=e919]: 数据素养
                    - heading "用图表讲清一个问题" [level=3] [ref=e920]
                    - paragraph [ref=e921]: 3 个章节 · 25 分钟
              - group "6 / 6：校园里的微型生态" [ref=e922]:
                - article [ref=e923]:
                  - generic [ref=e946]:
                    - generic [ref=e947]: 观察练习
                    - heading "校园里的微型生态" [level=3] [ref=e948]
                    - paragraph [ref=e949]: 3 个章节 · 28 分钟
            - generic:
              - button "上一项" [ref=e950] [cursor=pointer]
              - button "下一项" [ref=e953] [cursor=pointer]
          - generic [ref=e956]:
            - generic [ref=e957]: 共 6 门课程 · 支持拖动与方向键
            - generic [ref=e958]:
              - status [ref=e959]: 暂时暂停
              - button "暂停播放" [ref=e960] [cursor=pointer]
    - generic [ref=e964]:
      - heading "资料更新与输入边界" [level=2] [ref=e965]
      - paragraph [ref=e966]: 资料增删后计数来自实际 API；笔记输入保留自己的方向键，导航独立排在内容下方。
      - generic [ref=e968]:
        - generic [ref=e969]:
          - generic [ref=e970]:
            - generic [ref=e971]: 课堂观察 · 第04讲
            - heading "沿着学习任务阅读" [level=3] [ref=e972]
          - button "添加一份资料" [disabled] [ref=e973]
        - region "课程学习资料" [ref=e976]:
          - generic [ref=e978]:
            - group "1 / 4：课程导读：从问题到证据" [ref=e979]:
              - article [ref=e980]:
                - generic [ref=e981]:
                  - generic [ref=e982]: 01 / 课前导读
                  - strong [ref=e983]: 从问题到证据
                  - generic [ref=e984]: 课堂观察 · 学习资料
                - generic [ref=e985]:
                  - generic [ref=e986]: PDF · 6页
                  - heading "课程导读：从问题到证据" [level=3] [ref=e987]
                  - paragraph [ref=e988]: 先读三个真实观察案例，练习把笼统的感受转化为可追问的问题。
                  - generic [ref=e989]:
                    - generic [ref=e990]: 记录第1份资料笔记
                    - textbox "记录第1份资料笔记" [ref=e992]:
                      - /placeholder: 记录一个问题，方向键可编辑
                      - text: 课堂笔记
            - group "2 / 4：课堂观察记录表" [ref=e993]:
              - article [ref=e994]:
                - generic [ref=e995]:
                  - generic [ref=e996]: 02 / 观察与记录
                  - strong [ref=e997]: 从问题到证据
                  - generic [ref=e998]: 课堂观察 · 学习资料
                - generic [ref=e999]:
                  - generic [ref=e1000]: DOCX · 2页
                  - heading "课堂观察记录表" [level=3] [ref=e1001]
                  - paragraph [ref=e1002]: 记录现象、已有解释和需要补充的证据，课堂中可继续完善。
            - group "3 / 4：同伴反馈提示卡" [ref=e1003]:
              - article [ref=e1004]:
                - generic [ref=e1005]:
                  - generic [ref=e1006]: 03 / 同伴交流
                  - strong [ref=e1007]: 从问题到证据
                  - generic [ref=e1008]: 课堂观察 · 学习资料
                - generic [ref=e1009]:
                  - generic [ref=e1010]: PDF · 4页
                  - heading "同伴反馈提示卡" [level=3] [ref=e1011]
                  - paragraph [ref=e1012]: 用一个追问和一条证据反馈同伴的观点，让小组交流更具体。
            - group "4 / 4：小组讨论回顾" [ref=e1013]:
              - article [ref=e1014]:
                - generic [ref=e1015]:
                  - generic [ref=e1016]: 04 / 课堂回顾
                  - strong [ref=e1017]: 从问题到证据
                  - generic [ref=e1018]: 课堂观察 · 学习资料
                - generic [ref=e1019]:
                  - generic [ref=e1020]: PDF · 3页
                  - heading "小组讨论回顾" [level=3] [ref=e1021]
                  - paragraph [ref=e1022]: 整理共同观点与仍有分歧的问题，保留下一次课堂的讨论线索。
          - generic [ref=e1023]:
            - button "阅读上一份资料" [ref=e1024] [cursor=pointer]
            - group "选择轮播位置" [ref=e1027]:
              - button "阅读第 1 份资料" [ref=e1028] [cursor=pointer]
              - button "阅读第 2 份资料" [ref=e1030] [cursor=pointer]
              - button "阅读第 3 份资料" [ref=e1032] [cursor=pointer]
              - button "阅读第 4 份资料" [ref=e1034] [cursor=pointer]
            - button "阅读下一份资料" [ref=e1036] [cursor=pointer]
        - generic [ref=e1039]:
          - status [ref=e1040]: 第2份 / 共4份
          - button "恢复三份资料" [ref=e1041] [cursor=pointer]
    - generic [ref=e1043]:
      - heading "从右向左的学习资料" [level=2] [ref=e1044]
      - paragraph [ref=e1045]: DOM 与引擎使用同一 RTL 方向；显式文字导航保留公共控件的行为与焦点。
      - region "资料 RTL 示例" [active] [ref=e1048]:
        - generic [ref=e1050]:
          - group "1 / 3：课程导读：从问题到证据" [ref=e1051]:
            - article [ref=e1052]:
              - generic [ref=e1053]: مواد التعلم
              - heading "课程导读：从问题到证据" [level=3] [ref=e1054]
              - paragraph [ref=e1055]: 先读三个真实观察案例，练习把笼统的感受转化为可追问的问题。
          - group "2 / 3：课堂观察记录表" [ref=e1056]:
            - article [ref=e1057]:
              - generic [ref=e1058]: مواد التعلم
              - heading "课堂观察记录表" [level=3] [ref=e1059]
              - paragraph [ref=e1060]: 记录现象、已有解释和需要补充的证据，课堂中可继续完善。
          - group "3 / 3：同伴反馈提示卡" [ref=e1061]:
            - article [ref=e1062]:
              - generic [ref=e1063]: مواد التعلم
              - heading "同伴反馈提示卡" [level=3] [ref=e1064]
              - paragraph [ref=e1065]: 用一个追问和一条证据反馈同伴的观点，让小组交流更具体。
        - generic [ref=e1066]:
          - button "上一份" [ref=e1067] [cursor=pointer]
          - group "选择轮播位置" [ref=e1069]:
            - button "转到第 1 项" [ref=e1070] [cursor=pointer]
            - button "转到第 2 项" [ref=e1072] [cursor=pointer]
            - button "转到第 3 项" [ref=e1074] [cursor=pointer]
          - button "下一份" [ref=e1076] [cursor=pointer]
    - generic [ref=e1078]:
      - heading "在课程抽屉中阅读" [level=2] [ref=e1079]
      - paragraph [ref=e1080]: 保留轮播与抽屉各自的引擎。当前 Base UI 1.8 按 data-base-ui-swipe-ignore 属性的存在忽略该区域手势，不解析轴值；真实触摸仲裁仍需设备检查。
      - button "在抽屉中阅读资料" [ref=e1082] [cursor=pointer]
  - region [ref=e1084]:
    - heading "使用边界" [level=2] [ref=e1085]
    - generic [ref=e1086]:
      - generic [ref=e1087]:
        - heading "适合用在" [level=3] [ref=e1088]
        - list [ref=e1089]:
          - listitem [ref=e1090]: 少量专题、课程封面或学习资料适合逐项浏览。
          - listitem [ref=e1091]: 需要横纵拖动、真实停靠点定位，或显式开启定时与连续展示。
      - generic [ref=e1092]:
        - heading "避免用在" [level=3] [ref=e1093]
        - list [ref=e1094]:
          - listitem [ref=e1095]: 大量对象必须同时比较，或重要信息必须同时可见。
          - listitem [ref=e1096]: 隐藏必要内容，或默认开启没有暂停入口的自动播放。
  - generic [ref=e1097]:
    - region [ref=e1098]:
      - heading "API 与结构" [level=2] [ref=e1099]
      - table [ref=e1101]:
        - caption [ref=e1102]: Carousel 内容轮播 常用接口
        - rowgroup [ref=e1103]:
          - row [ref=e1104]:
            - columnheader "名称" [ref=e1105]
            - columnheader "类型" [ref=e1106]
            - columnheader "默认" [ref=e1107]
            - columnheader "说明" [ref=e1108]
        - rowgroup [ref=e1109]:
          - row [ref=e1110]:
            - rowheader [ref=e1111]:
              - code [ref=e1112]: opts / plugins
            - cell [ref=e1113]:
              - code [ref=e1114]: EmblaOptions / EmblaPlugin[]
            - cell "—" [ref=e1115]
            - cell "保留来源引擎入口；拖动、吸附、循环和尺寸变化均由 Embla 管理。" [ref=e1116]
          - row [ref=e1117]:
            - rowheader [ref=e1118]:
              - code [ref=e1119]: playback
            - cell [ref=e1120]:
              - code [ref=e1121]: autoplay / continuous
            - cell "—" [ref=e1122]
            - cell "显式开启定时或连续播放；可设置正反方向。默认手动浏览。" [ref=e1123]
          - row [ref=e1124]:
            - rowheader [ref=e1125]:
              - code [ref=e1126]: CarouselControls
            - cell [ref=e1127]:
              - code [ref=e1128]: layout / indicatorPlacement
            - cell "—" [ref=e1129]
            - cell "覆盖或独立排列；短条可以在顶部、底部、起侧或末侧。宿主为覆盖控件提供媒体安全区。" [ref=e1130]
          - row [ref=e1131]:
            - rowheader [ref=e1132]:
              - code [ref=e1133]: CarouselIndicators
            - cell [ref=e1134]:
              - code [ref=e1135]: getLabel(index)
            - cell "—" [ref=e1136]
            - cell "数量、当前项和直接定位来自实际停靠点；0/1 个停靠点不显示。" [ref=e1137]
          - row [ref=e1138]:
            - rowheader [ref=e1139]:
              - code [ref=e1140]: CarouselPlaybackControl
            - cell [ref=e1141]:
              - code [ref=e1142]: "showLabel?: boolean"
            - cell "true" [ref=e1143]
            - cell "默认带文字的暂停/继续按钮，false使用紧凑图标；悬停临时暂停，交互接管后保持暂停。" [ref=e1144]
          - row [ref=e1145]:
            - rowheader [ref=e1146]:
              - code [ref=e1147]: setApi / useCarousel
            - cell [ref=e1148]:
              - code [ref=e1149]: CarouselApi / Context
            - cell "—" [ref=e1150]
            - cell "读取实际位置及统一播放状态；setApi 订阅由宿主清理。" [ref=e1151]
          - row [ref=e1152]:
            - rowheader [ref=e1153]:
              - code [ref=e1154]: orientation / dir
            - cell [ref=e1155]:
              - code [ref=e1156]: horizontal / vertical · ltr / rtl
            - cell "horizontal" [ref=e1157]
            - cell "纵向提供明确可用高度；方向键与实际引擎方向一致。" [ref=e1158]
          - row [ref=e1159]:
            - rowheader [ref=e1160]:
              - code [ref=e1161]: Previous / Next
            - cell [ref=e1162]:
              - code [ref=e1163]: Rain ButtonProps
            - cell "—" [ref=e1164]
            - cell "默认浅灰 36px 圆形箭头；边缘保持焦点并阻止导航，支持显式文字按钮。" [ref=e1165]
      - paragraph [ref=e1166]: Parts / Slots：Carousel、Content、Item、Controls、Indicators、Previous、Next、PlaybackControl、useCarousel / CarouselApi
    - region [ref=e1167]:
      - heading "调用示例" [level=2] [ref=e1168]
      - generic [ref=e1169]:
        - generic [ref=e1170]:
          - button "复制代码" [ref=e1171] [cursor=pointer]
          - status
        - code [ref=e1174]: "<Carousel aria-label=\"本周精选\" tabIndex={0} opts={{ align: \"start\" }}> <CarouselContent>{courses.map(course => <CarouselItem key={course.title} aria-label={course.title}>{/* 专题内容 */}</CarouselItem> )}</CarouselContent> <CarouselControls layout=\"inline\" indicatorPlacement=\"bottom\"> <CarouselPrevious /><CarouselIndicators /><CarouselNext /> </CarouselControls> </Carousel> // 显式自动播放：playback={{ mode: \"autoplay\", delay: 5000, direction: \"forward\" }} // 连续播放：playback={{ mode: \"continuous\", speed: 36, direction: \"reverse\" }} // 覆盖式 Controls 的 height/style 指向实际媒体安全区；业务内容留在宿主。"
      - paragraph [ref=e1175]:
        - text: 当前源码：
        - code [ref=e1176]: packages/ui/src/carousel/carousel.tsx
```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { verifyConversationReading } from "/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/tests/e2e/helpers/conversation-scrolling";
  4   | const evidence="/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/evidence/runtime/g1-g6-closeout-2026-10-17/run-01/browser/g6";
  5   | mkdirSync(evidence,{recursive:true});
  6   | async function open(page:Page,id:string){await page.goto(`/#${id}`);await expect(page.locator(`#${id}-title`)).toBeVisible();}
  7   | const ids=["data-table","aspect-ratio","attachment","direction","drawer","input-otp","carousel","bubble","marker","message","message-scroller","questionnaire"];
  8   | test.beforeEach(({page})=>page.on("pageerror",error=>{throw error;}));
  9   | test("12 routes, themes, density, 390px and source examples",async({page,context},info)=>{
  10  |  await context.grantPermissions(["clipboard-read","clipboard-write"]);const facts=[];
  11  |  for(const id of ids){
  12  |   await page.goto(`/#${id}`); await expect(page.locator(`#${id}-title`)).toBeVisible();
  13  |   await expect(page.getByRole("heading",{name:"API 与结构",exact:true})).toBeVisible();
  14  |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),id).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  15  |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-light.png`});
  16  |   await page.getByRole("button",{name:"深色",exact:true}).click();await page.getByRole("button",{name:"紧凑密度",exact:true}).click();
  17  |   await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme","dark");
  18  |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),`${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  19  |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-dark-compact.png`});
  20  |   await page.getByRole("button",{name:"复制代码",exact:true}).last().click();await expect(page.getByText("已复制",{exact:true})).toBeVisible();
  21  |   facts.push({id,width:await page.evaluate(()=>document.documentElement.scrollWidth),copied:await page.evaluate(()=>navigator.clipboard.readText())});
  22  |  }
  23  |  writeFileSync(`${evidence}/matrix-${info.project.name}.json`,JSON.stringify(facts,null,2));
  24  | });
  25  | test("media ratio, attachment actions and direction islands",async({page})=>{
  26  |  await open(page,"aspect-ratio"); const ratios=await page.locator('.g6-media-grid').first().locator('[data-rain-id="ui-aspect-ratio"]').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return r.width/r.height;}));
  27  |  expect(ratios[0]).toBeCloseTo(16/9,1);expect(ratios[1]).toBeCloseTo(1,1);expect(ratios[2]).toBeCloseTo(4/3,1);
  28  |  await expect(page.locator('.g6-media-image--cover')).toHaveCSS('object-fit','cover');await expect(page.locator('.g6-media-image--contain')).toHaveCSS('object-fit','contain');
  29  |  await open(page,"attachment");await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('button',{name:'关闭',exact:true}).click();await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeFocused();
  30  |  await page.getByRole('button',{name:'移除 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.getByRole('button',{name:'预览 高等数学课程封面.png',exact:true})).toBeFocused();
  31  |  await page.locator('.rain-attachment-picker input[type="file"]').setInputFiles({name:'课堂补充说明.txt',mimeType:'text/plain',buffer:Buffer.from('课堂补充说明')});await page.getByRole('button',{name:'上传 课堂补充说明.txt',exact:true}).click();await expect(page.getByTestId('attachment-live-list')).toContainText('正在上传');await expect(page.getByRole('button',{name:'保存附件',exact:true})).toBeEnabled({timeout:4000});
  32  |  await open(page,"direction");await expect(page.locator('.g6-direction-example[dir="rtl"]')).toContainText('Context: rtl');await expect(page.locator('.g6-direction-example[dir="ltr"]')).toContainText('Context: ltr');
  33  | });
  34  | test("task drawer modality, draft protection, menu and nested focus",async({page},info)=>{
  35  |  await open(page,"drawer");await page.getByRole('button',{name:'深色',exact:true}).click();await page.getByRole('button',{name:'紧凑密度',exact:true}).click();
  36  |  const trigger=page.getByRole('button',{name:'编辑课前任务',exact:true});await trigger.click();const dialog=page.getByRole('dialog',{name:'编辑课前任务',exact:true});await expect(dialog).toHaveAttribute('data-density','compact');
  37  |  await page.getByRole('button',{name:'展开编辑',exact:true}).click();await dialog.getByRole('textbox',{name:'任务标题',exact:true}).fill('本地课堂任务草稿');await dialog.press('Escape');await expect(page.getByRole('alert')).toContainText('未保存');await page.getByRole('button',{name:'继续编辑',exact:true}).click();
  38  |  await page.getByRole('button',{name:'完成方式：个人记录',exact:true}).click();await page.getByRole('menuitem',{name:'小组讨论',exact:true}).click();await expect(page.getByRole('button',{name:'完成方式：小组讨论',exact:true})).toBeVisible();
  39  |  await page.getByRole('button',{name:'查看学生任务预览',exact:true}).click();await expect(page.getByRole('dialog',{name:'学生任务预览',exact:true})).toContainText('本地课堂任务草稿');await page.getByRole('button',{name:'返回编辑',exact:true}).click();await expect(page.getByRole('button',{name:'查看学生任务预览',exact:true})).toBeFocused();
  40  |  await dialog.screenshot({path:`${evidence}/drawer-task-${info.project.name}.png`});await page.getByRole('button',{name:'取消修改',exact:true}).click();await expect(trigger).toBeFocused();await expect(page.getByTestId('drawer-saved-title')).not.toContainText('本地课堂任务草稿');
  41  |  for(const side of ['底部','顶部','左侧','右侧']){await page.getByRole('button',{name:`从${side}打开`,exact:true}).click();await page.getByRole('button',{name:`关闭${side}抽屉`,exact:true}).click();await expect(page.getByRole('button',{name:`从${side}打开`,exact:true})).toBeFocused();}
  42  |  await page.getByRole('button',{name:'打开非模态记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑非模态记录');await page.getByRole('button',{name:'记录一次观察',exact:true}).click();await expect(page.getByTestId('drawer-observation-count')).toContainText('1次');await expect(page.getByRole('dialog',{name:'非模态课堂记录',exact:true})).toBeVisible();await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  43  |  await page.getByRole('button',{name:'打开焦点约束记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑焦点约束记录');await page.getByRole('button',{name:'关闭课堂记录',exact:true}).press('Tab');await expect.poll(()=>page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"]'))).toBe(true);await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  44  | });
  45  | test("OTP paste, explicit verification, error preservation and retry",async({page,context})=>{
  46  |  await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,"input-otp");const form=page.getByTestId('otp-verification-form'),input=form.getByRole('textbox',{name:'课堂验证码',exact:true});await expect(form.locator('input')).toHaveCount(1);
  47  |  await page.evaluate(()=>navigator.clipboard.writeText('123456'));await input.focus();await input.press('ControlOrMeta+V');await expect(input).toHaveValue('123456');await expect(page.getByTestId('otp-submitted-code')).toContainText('尚未提交');
  48  |  await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证码已过期');await expect(input).toHaveValue('123456');await expect(input).toHaveAttribute('aria-invalid','true');await input.fill('654321');await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证通过');
  49  | });
  50  | test("carousel actual API, input key ownership, RTL and vertical",async({page})=>{
  51  |  await open(page,"carousel");const first=page.getByRole('region',{name:'课程学习资料',exact:true});await expect(page.getByTestId('carousel-position')).toContainText('第1份 / 共3份');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).fill('课堂笔记');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).press('ArrowRight');await expect(page.getByTestId('carousel-position')).toContainText('第1份');
  52  |  await first.getByRole('button',{name:'阅读下一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('第2份');await page.getByRole('button',{name:'添加一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('共4份');
  53  |  const rtl=page.getByRole('region',{name:'资料 RTL 示例',exact:true});await expect(rtl).toHaveAttribute('dir','rtl');await rtl.press('ArrowLeft');await expect(rtl.getByRole('button',{name:'上一份',exact:true})).toBeEnabled();
> 54  |  const vertical=page.getByRole('region',{name:'纵向课程摘录',exact:true});await vertical.press('ArrowDown');await expect(vertical.getByRole('button',{name:'上一项',exact:true})).toBeEnabled();
      |                                                                                    ^ Error: locator.press: Test timeout of 60000ms exceeded.
  55  | });
  56  | test("conversation reactions, copy, local retry and meaningful marker",async({page,context})=>{
  57  |  await open(page,"bubble");const reaction=page.getByRole('button',{name:/有帮助/});await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','true');await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','false');
  58  |  await open(page,"marker");await page.getByRole('button',{name:'查看说明',exact:true}).click();await expect(page.locator('#g6-marker-details')).toBeVisible();
  59  |  await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,"message");await page.getByRole('button',{name:'复制辅导回答',exact:true}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('先写下你直接看到的事实');await page.getByRole('button',{name:'重试发送补充问题',exact:true}).click();await expect(page.getByText('已发送 · 本地模拟',{exact:true})).toBeVisible();
  60  | });
  61  | test("scroller preserves reading on stream/prepend, pauses and commands",async({page})=>{
  62  |  await verifyConversationReading(page);
  63  | });
  64  | test("questionnaire conditional validation, native summary, restore and submit failure",async({page})=>{
  65  |  await open(page,"questionnaire");const form=page.getByRole('form',{name:'课堂反馈',exact:true});await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('alert')).toBeVisible();await form.getByRole('radio',{name:/其他目标/}).check();await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('一');await page.getByRole('button',{name:'保存本页草稿',exact:true}).click();await page.getByRole('button',{name:'恢复草稿',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('progressbar')).toContainText('第 2 题');
  66  |  await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('checkbox',{name:/观察记录/}).check();await form.getByRole('button',{name:'上一题',exact:true}).click();await expect(form.getByRole('textbox',{name:'具体学习目标',exact:true})).toHaveValue('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await page.getByRole('button',{name:'模拟提交失败：关',exact:true}).click();await form.getByRole('button',{name:'跳过并提交',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'模拟提交失败：开',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toContainText('希望理解证据');
  67  | });
  68  | test("reduced motion and forced colors keep state readable",async({page})=>{
  69  |  await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});await open(page,"marker");await expect(page.locator('.rain-marker__content--shimmer')).toHaveCSS('animation-name','none');await expect(page.locator('.rain-marker__content--shimmer')).toBeVisible();await open(page,"attachment");await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeVisible();await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).press('Enter');await expect(page.getByRole('dialog')).toBeVisible();
  70  | });
  71  | test("isolated installed packages: default, local recipe, sibling and copied table",async({page})=>{
  72  |  await page.goto('http://127.0.0.1:5398');await expect(page.getByRole('heading',{name:'G6 独立包消费',exact:true})).toBeVisible();
  73  |  const first=page.getByTestId('default'),local=page.getByTestId('local'),sibling=page.getByTestId('sibling');
  74  |  const padding=(host:ReturnType<typeof page.getByTestId>)=>host.locator('.rain-bubble__content').first().evaluate(n=>getComputedStyle(n).paddingInlineStart);
  75  |  expect(await padding(first)).toBe(await padding(sibling));expect(await padding(local)).not.toBe(await padding(first));
  76  |  const drawerPadding=[];
  77  |  for (const [host,label] of [[first,'默认'],[local,'局改'],[sibling,'未改兄弟']] as const) {
  78  |   const trigger=host.getByRole('button',{name:`打开${label}任务`,exact:true});await trigger.click();const popup=page.getByRole('dialog',{name:`${label}任务`,exact:true});await expect(popup).toBeVisible();drawerPadding.push(await popup.evaluate(el=>getComputedStyle(el).paddingInlineStart));await popup.getByRole('button',{name:'关闭任务',exact:true}).click();await expect(trigger).toBeFocused();
  79  |  }
  80  |  expect(drawerPadding[0]).toBe(drawerPadding[2]);expect(drawerPadding[1]).not.toBe(drawerPadding[0]);
  81  |  await first.getByRole('textbox',{name:'默认验证码',exact:true}).fill('1234');await expect(first.getByRole('textbox',{name:'默认验证码',exact:true})).toHaveValue('1234');
  82  |  await first.getByRole('radio',{name:'复习课程',exact:true}).check();await first.getByRole('button',{name:'提交默认反馈',exact:true}).click();await expect(first.getByRole('status')).toContainText('反馈：review');
  83  |  await expect(page.getByTestId('table-default').getByRole('textbox',{name:'查找资料',exact:true})).toBeVisible();
  84  |  const localFacts=[];
  85  |  for (const [id,selector,property] of [
  86  |   ['aspect-ratio','[data-rain-id="ui-aspect-ratio"]','padding-inline-start'],['attachment','[data-rain-id="ui-attachment"]','padding-inline-start'],
  87  |   ['input-otp','[data-slot="input-otp-group"]','gap'],['carousel','[data-rain-id="ui-carousel"]','padding-inline-start'],
  88  |   ['marker','[data-rain-id="ui-marker"]','padding-inline-start'],['message','[data-rain-id="ui-message"]','padding-inline-start'],
  89  |   ['message-scroller','[data-rain-id="ui-message-scroller"]','height'],['questionnaire','[data-rain-id="ui-questionnaire"]','padding-inline-start'],
  90  |  ] as const) {
  91  |   const value=async(host:ReturnType<typeof page.getByTestId>)=>host.locator(selector).first().evaluate((element,name)=>getComputedStyle(element).getPropertyValue(name),property);
  92  |   const values=[await value(first),await value(local),await value(sibling)];expect(values[0],id).toBe(values[2]);expect(values[1],id).not.toBe(values[0]);localFacts.push({id,property,values});
  93  |  }
  94  |  expect(await local.locator('[dir="rtl"]').count()).toBe(1);expect(await sibling.locator('[dir="rtl"]').count()).toBe(0);
  95  |  const tablePadding=async(mode:string)=>page.getByTestId(`table-${mode}`).locator('.data-table-recipe').evaluate(el=>getComputedStyle(el).paddingInlineStart);
  96  |  expect(await tablePadding('default')).toBe(await tablePadding('sibling'));expect(await tablePadding('local')).not.toBe(await tablePadding('default'));
  97  |  writeFileSync(`${evidence}/consumer-local-isolation-${page.viewportSize()!.width}.json`,JSON.stringify({localFacts,drawerPadding,tableFork:'source-copy-export-and-one-root-class-only',tablePadding:[await tablePadding('default'),await tablePadding('local'),await tablePadding('sibling')],direction:'local RTL; sibling LTR'},null,2));
  98  | });
  99  | test("data table keeps stable selection, query scope, columns and failed refresh",async({page})=>{
  100 |  await open(page,'data-table');await page.getByRole('checkbox',{name:'选择当前页可操作资料',exact:true}).locator('..').click();await expect(page.getByText('已选 4 份资料',{exact:true})).toBeVisible();await expect(page.getByRole('checkbox',{name:'选择 课堂观察记录',exact:true})).toBeDisabled();await page.getByRole('button',{name:'取消选择',exact:true}).click();
  101 |  await page.getByRole('checkbox',{name:'选择 设计方法导论',exact:true}).press('Space');await page.getByRole('button',{name:'下一页',exact:true}).click();await expect(page.getByText('含其他页 1 份',{exact:true})).toBeVisible();await page.getByRole('button',{name:'上一页',exact:true}).click();await expect(page.getByRole('checkbox',{name:'选择 设计方法导论',exact:true})).toBeChecked();
  102 |  await page.getByRole('button',{name:'按资料名称排序',exact:true}).click();await page.getByRole('button',{name:'下一页',exact:true}).click();await expect(page.getByText('已选 1 份资料',{exact:true})).toBeVisible();
  103 |  await page.getByRole('textbox',{name:'查找资料',exact:true}).fill('教学案例');await page.getByRole('button',{name:'搜索',exact:true}).click();await expect(page.getByRole('button',{name:'上一页',exact:true})).toBeDisabled();await expect(page.getByRole('button',{name:'取消选择',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'清空筛选',exact:true}).click();
  104 |  await page.getByRole('button',{name:'显示列',exact:true}).click();await page.getByRole('menuitemcheckbox',{name:'资料类型',exact:true}).click();await page.keyboard.press('Escape');await expect(page.getByRole('columnheader',{name:'资料类型',exact:true})).toHaveCount(0);await page.getByText('试用加载与空数据状态',{exact:true}).click();await page.getByRole('checkbox',{name:'下次刷新模拟失败',exact:true}).locator('..').click();await page.getByRole('button',{name:'刷新资料',exact:true}).click();await expect(page.getByRole('alert')).toContainText('资料和选择已保留');await page.getByRole('button',{name:'重试',exact:true}).click();await expect(page.getByRole('alert')).toHaveCount(0);
  105 | });
  106 | test("drawer mouse swipe closes, while carousel drag retains its owning drawer",async({page})=>{
  107 |  await open(page,'drawer');await page.getByRole('button',{name:'从底部打开',exact:true}).click();const popup=page.getByRole('dialog',{name:'底部任务概览',exact:true});const handle=popup.locator('[data-slot="drawer-swipe-handle"]');await expect(handle).toBeVisible();await expect(popup).not.toHaveAttribute('data-starting-style','');await popup.evaluate(el=>Promise.all(el.getAnimations().map(animation=>animation.finished.catch(()=>{}))));
  108 |  const box=await handle.boundingBox();if(!box)throw new Error('Missing real swipe handle');await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2,Math.min(page.viewportSize()!.height-2,box.y+box.height/2+220),{steps:10});await page.mouse.up();await expect(popup).toHaveCount(0);
  109 |  await open(page,'carousel');await page.getByRole('button',{name:'在抽屉中阅读资料',exact:true}).click();const carouselPopup=page.getByRole('dialog',{name:'课堂资料阅读',exact:true});await expect(carouselPopup).toBeVisible();const viewport=carouselPopup.locator('[data-base-ui-swipe-ignore]');await expect(viewport).toHaveCount(1);const bounds=await viewport.boundingBox();if(!bounds)throw new Error('Missing Embla owned region');await page.mouse.move(bounds.x+bounds.width*.8,bounds.y+bounds.height*.5);await page.mouse.down();await page.mouse.move(bounds.x+bounds.width*.15,bounds.y+bounds.height*.5+3,{steps:12});await page.mouse.up();await expect(carouselPopup).toBeVisible();
  110 | });
  111 | 
```