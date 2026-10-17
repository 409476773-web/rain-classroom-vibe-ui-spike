# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-motion.spec.ts >> fresh reduced motion commits both sizes of pie and progress directly to the new geometry
- Location: tests/e2e/chart-business-motion.spec.ts:69:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

  Array [
-   "M-13.963,-0.175A1,1,0,0,1,-14.947,-1.258A15,15,0,0,1,14.9905,0.15933A1,1,0,0,1,13.9096,1.14446L0,0Z",
+   "M-13.963,-0.175A1,1,0,0,1,-14.947,-1.258A15,15,0,0,1,14.97729,-0.80482A1,1,0,0,1,13.96087,0.24868L0,0Z",
    "M-15.181,6.288A1.5,1.5,0,0,1,-17.187,5.348A18,18,0,0,1,-16.139,-7.971A1.5,1.5,0,0,1,-14.01,-8.586L-14.01,-8.586A1.5,1.5,0,0,1,-13.449,-6.642A15,15,0,0,0,-14.323,4.457A1.5,1.5,0,0,1,-15.181,6.288Z",
-   "M-25.979,-0.325A1,1,0,0,1,-26.965,-1.376A27,27,0,0.67221,1,26.9641,0.90571A1,1,0,0,1,25.89365,1.86855L0,0Z",
+   "M-25.979,-0.325A1,1,0,0,1,-26.965,-1.376A27,27,0,-0.02948,1,26.99427,-0.66185A1,1,0,0,1,25.98066,0.36274L0,0Z",
    "M-27.655,11.455A2,2,0,0,1,-30.315,10.248A32,32,0,0,1,-28.338,-14.864A2,2,0,0,1,-25.522,-15.64L-25.522,-15.64A2,2,0,0,1,-24.796,-13.006A28,28,0,0,0,-26.525,8.967A2,2,0,0,1,-27.655,11.455Z",
  ]
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "迷你图表与业务组合" [level=1] [ref=e8]
      - generic [ref=e9]: 共享候选 · 未发布 · 待视觉审阅
    - paragraph [ref=e10]: 大小条形、轻量趋势、构成与进度，组合进日常阅读数据的地方。
  - generic [ref=e11]:
    - generic [ref=e12]:
      - text: 配色
      - combobox "业务图表配色" [ref=e13]:
        - option "蓝灰单色" [selected]
        - option "蓝紫近邻"
        - option "多色类别"
    - generic [ref=e14]:
      - text: 数据状态
      - combobox "业务数据状态" [ref=e15]:
        - option "正常" [selected]
        - option "全零"
        - option "缺测"
        - option "无效数据"
        - option "无数据"
        - option "单项"
        - option "长名称"
    - button "更新数据" [active] [ref=e16] [cursor=pointer]
    - button "重播动效" [ref=e18] [cursor=pointer]
    - button "按数量排序" [ref=e20] [cursor=pointer]
    - button "只看50人以上" [ref=e22] [cursor=pointer]
    - button "40行场景" [ref=e24] [cursor=pointer]
  - status [ref=e26]: 示例数据 · 更新 1 次 · 已按系统设置减少动效
  - generic [ref=e27]:
    - region [ref=e28]:
      - heading "同一量程，大小都能比较" [level=2] [ref=e29]
      - generic [ref=e30]:
        - generic [ref=e32]:
          - generic:
            - generic:
              - generic "计算机学院"
            - generic:
              - generic "经济管理学院"
            - generic:
              - generic "人文学院"
            - generic:
              - generic "理学院"
            - generic:
              - generic "外国语学院"
        - list [ref=e44]:
          - listitem [ref=e45]:
            - generic [ref=e46]: 计算机学院
            - generic [ref=e49]: 75 人
          - listitem [ref=e50]:
            - generic [ref=e51]: 经济管理学院
            - generic [ref=e54]: 53 人
          - listitem [ref=e55]:
            - generic [ref=e56]: 人文学院
            - generic [ref=e59]: 100 人
          - listitem [ref=e60]:
            - generic [ref=e61]: 理学院
            - generic [ref=e64]: 78 人
          - listitem [ref=e65]:
            - generic [ref=e66]: 外国语学院
            - generic [ref=e69]: 48 人
    - generic [ref=e70]:
      - heading "分组比较与互斥堆叠" [level=2] [ref=e71]
      - generic [ref=e72]:
        - figure "本期与上期参与人数" [ref=e73]:
          - generic [ref=e76]:
            - generic:
              - generic:
                - generic "计算机学院"
              - generic:
                - generic "经济管理学院"
              - generic:
                - generic "人文学院"
              - generic:
                - generic "理学院"
              - generic:
                - generic "外国语学院"
          - paragraph [ref=e94]:
            - generic [ref=e95]: 本期
            - generic [ref=e97]: 上期
          - group [ref=e99]:
            - generic "查看分项读数" [ref=e100]
        - figure "互斥课程构成" [ref=e101]:
          - generic [ref=e104]:
            - generic:
              - generic:
                - generic "计算机学院"
              - generic:
                - generic "经济管理学院"
              - generic:
                - generic "人文学院"
              - generic:
                - generic "理学院"
              - generic:
                - generic "外国语学院"
          - paragraph [ref=e128]:
            - generic [ref=e129]: 已完成
            - generic [ref=e131]: 进行中
            - generic [ref=e133]: 待开始
          - group [ref=e135]:
            - generic "查看分项读数" [ref=e136]
      - generic [ref=e137]:
        - generic [ref=e138]: 评分 7.5 / 10
        - generic [ref=e142]: 相对位置 12 / 60（从前到后）
    - region [ref=e146]:
      - heading "同一图形，两种阅读密度" [level=2] [ref=e147]
      - generic [ref=e148]:
        - figure "数量条 · 紧凑 本期人数 · 75 人" [ref=e149]:
          - generic [ref=e155]:
            - strong [ref=e156]: 数量条 · 紧凑
            - generic [ref=e157]: 本期人数 · 75 人
        - figure "数量条 · 舒展 本期人数 · 75 人" [ref=e158]:
          - generic [ref=e164]:
            - strong [ref=e165]: 数量条 · 舒展
            - generic [ref=e166]: 本期人数 · 75 人
        - figure "构成分段 · 紧凑 已完成 38 人 进行中 23 人 待开始 14 人" [ref=e167]:
          - generic [ref=e184]:
            - strong [ref=e185]: 构成分段 · 紧凑
            - list [ref=e186]:
              - listitem [ref=e187]:
                - text: 已完成
                - generic [ref=e189]: 38 人
              - listitem [ref=e190]:
                - text: 进行中
                - generic [ref=e192]: 23 人
              - listitem [ref=e193]:
                - text: 待开始
                - generic [ref=e195]: 14 人
        - figure "构成分段 · 舒展 已完成 38 人 进行中 23 人 待开始 14 人" [ref=e196]:
          - generic [ref=e213]:
            - strong [ref=e214]: 构成分段 · 舒展
            - list [ref=e215]:
              - listitem [ref=e216]:
                - text: 已完成
                - generic [ref=e218]: 38 人
              - listitem [ref=e219]:
                - text: 进行中
                - generic [ref=e221]: 23 人
              - listitem [ref=e222]:
                - text: 待开始
                - generic [ref=e224]: 14 人
        - figure "每日柱图 · 紧凑 近8天每日人数 · 共同上限 88 人" [ref=e225]:
          - generic [ref=e245]:
            - strong [ref=e246]: 每日柱图 · 紧凑
            - generic [ref=e247]: 近8天每日人数 · 共同上限 88 人
        - figure "每日柱图 · 舒展 近8天每日人数 · 共同上限 88 人" [ref=e248]:
          - generic [ref=e268]:
            - strong [ref=e269]: 每日柱图 · 舒展
            - generic [ref=e270]: 近8天每日人数 · 共同上限 88 人
        - figure "小饼 · 紧凑 已完成 38 人 进行中 23 人 待开始 14 人" [ref=e271]:
          - img [ref=e278]:
            - generic [ref=e279]:
              - generic [ref=e280] [cursor=pointer]
              - generic [ref=e282] [cursor=pointer]
              - generic [ref=e284] [cursor=pointer]
          - generic [ref=e286]:
            - strong [ref=e287]: 小饼 · 紧凑
            - list [ref=e288]:
              - listitem [ref=e289]:
                - text: 已完成
                - generic [ref=e291]: 38 人
              - listitem [ref=e292]:
                - text: 进行中
                - generic [ref=e294]: 23 人
              - listitem [ref=e295]:
                - text: 待开始
                - generic [ref=e297]: 14 人
        - figure "小饼 · 舒展 已完成 38 人 进行中 23 人 待开始 14 人" [ref=e298]:
          - img [ref=e305]:
            - generic [ref=e306]:
              - generic [ref=e307] [cursor=pointer]
              - generic [ref=e309] [cursor=pointer]
              - generic [ref=e311] [cursor=pointer]
          - generic [ref=e313]:
            - strong [ref=e314]: 小饼 · 舒展
            - list [ref=e315]:
              - listitem [ref=e316]:
                - text: 已完成
                - generic [ref=e318]: 38 人
              - listitem [ref=e319]:
                - text: 进行中
                - generic [ref=e321]: 23 人
              - listitem [ref=e322]:
                - text: 待开始
                - generic [ref=e324]: 14 人
        - figure "环饼 · 紧凑 已完成 38 人 进行中 23 人 待开始 14 人" [ref=e325]:
          - img [ref=e332]:
            - generic [ref=e333]:
              - generic [ref=e334] [cursor=pointer]
              - generic [ref=e336] [cursor=pointer]
              - generic [ref=e338] [cursor=pointer]
          - generic [ref=e340]:
            - strong [ref=e341]: 环饼 · 紧凑
            - list [ref=e342]:
              - listitem [ref=e343]:
                - text: 已完成
                - generic [ref=e345]: 38 人
              - listitem [ref=e346]:
                - text: 进行中
                - generic [ref=e348]: 23 人
              - listitem [ref=e349]:
                - text: 待开始
                - generic [ref=e351]: 14 人
        - figure "环饼 · 舒展 已完成 38 人 进行中 23 人 待开始 14 人" [ref=e352]:
          - img [ref=e359]:
            - generic [ref=e360]:
              - generic [ref=e361] [cursor=pointer]
              - generic [ref=e363] [cursor=pointer]
              - generic [ref=e365] [cursor=pointer]
          - generic [ref=e367]:
            - strong [ref=e368]: 环饼 · 舒展
            - list [ref=e369]:
              - listitem [ref=e370]:
                - text: 已完成
                - generic [ref=e372]: 38 人
              - listitem [ref=e373]:
                - text: 进行中
                - generic [ref=e375]: 23 人
              - listitem [ref=e376]:
                - text: 待开始
                - generic [ref=e378]: 14 人
        - figure "完成环 · 紧凑 完成 24 人 · 目标 100 人 · 24%" [ref=e379]:
          - img [ref=e386]:
            - generic [ref=e388] [cursor=pointer]
          - generic [ref=e391]:
            - strong [ref=e392]: 完成环 · 紧凑
            - generic [ref=e393]: 完成 24 人 · 目标 100 人 · 24%
        - figure "完成环 · 舒展 完成 24 人 · 目标 100 人" [ref=e394]:
          - generic [ref=e396]:
            - img [ref=e401]:
              - generic [ref=e403] [cursor=pointer]
            - generic:
              - strong: 24%
              - generic: 完成率
          - generic [ref=e406]:
            - strong [ref=e407]: 完成环 · 舒展
            - generic [ref=e408]: 完成 24 人 · 目标 100 人
        - figure "完成弧 · 紧凑 完成 24 人 · 目标 100 人 · 24%" [ref=e409]:
          - img [ref=e416]:
            - generic [ref=e418] [cursor=pointer]
          - generic [ref=e421]:
            - strong [ref=e422]: 完成弧 · 紧凑
            - generic [ref=e423]: 完成 24 人 · 目标 100 人 · 24%
        - figure "完成弧 · 舒展 完成 24 人 · 目标 100 人" [ref=e424]:
          - generic [ref=e426]:
            - img [ref=e431]:
              - generic [ref=e433] [cursor=pointer]
            - generic:
              - strong: 24%
              - generic: 完成率
          - generic [ref=e436]:
            - strong [ref=e437]: 完成弧 · 舒展
            - generic [ref=e438]: 完成 24 人 · 目标 100 人
        - figure [ref=e439]:
          - generic [ref=e452]:
            - strong [ref=e453]: 折线走势 · 紧凑
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e454]:
          - generic [ref=e467]:
            - strong [ref=e468]: 折线走势 · 舒展
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e469]:
          - generic [ref=e483]:
            - strong [ref=e484]: 面积走势 · 紧凑
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e485]:
          - generic [ref=e499]:
            - strong [ref=e500]: 面积走势 · 舒展
            - text: 近8天每日人数 · 观察变化
    - region [ref=e501]:
      - heading "指标卡：舒展型号" [level=2] [ref=e502]
      - generic [ref=e503]:
        - article [ref=e504]:
          - heading "本期参与人数" [level=3] [ref=e506]
          - generic [ref=e507]:
            - generic [ref=e508]: 75 人
            - paragraph [ref=e521]: 近8天每日人数 · 趋势按自身范围展开
        - article [ref=e522]:
          - heading "课程构成" [level=3] [ref=e524]
          - generic [ref=e525]:
            - generic [ref=e526]:
              - generic [ref=e527]: 75 门
              - img [ref=e533]:
                - generic [ref=e534]:
                  - generic [ref=e535] [cursor=pointer]
                  - generic [ref=e537] [cursor=pointer]
                  - generic [ref=e539] [cursor=pointer]
            - generic [ref=e541]:
              - generic [ref=e542]:
                - text: 已完成
                - generic [ref=e544]: "38"
              - generic [ref=e545]:
                - text: 进行中
                - generic [ref=e547]: "23"
              - generic [ref=e548]:
                - text: 待开始
                - generic [ref=e550]: "14"
        - article [ref=e551]:
          - heading "目标完成" [level=3] [ref=e553]
          - generic [ref=e554]:
            - generic [ref=e555]:
              - generic [ref=e556]:
                - img [ref=e561]:
                  - generic [ref=e563] [cursor=pointer]
                - generic:
                  - strong: 24%
                  - generic: 完成率
              - generic [ref=e566]: 已完成 24 项
            - paragraph [ref=e567]: 目标 100 项
    - region [ref=e568]:
      - heading "表格：紧凑型号，一起比较" [level=2] [ref=e569]
      - paragraph [ref=e570]: 参与人数共用 0—100 人量程；每日柱图共用 0—88 人量程。折线用于看各自走势；点击学院名称读取每个数据点。
      - region "学院数据与迷你图表" [ref=e571]:
        - table [ref=e572]:
          - rowgroup [ref=e573]:
            - row [ref=e574]:
              - columnheader "学院" [ref=e575]
              - columnheader "参与人数" [ref=e576]
              - columnheader "近8天趋势" [ref=e577]
              - columnheader "每日分布" [ref=e578]
              - columnheader "课程构成" [ref=e579]
              - columnheader "目标完成" [ref=e580]
          - rowgroup [ref=e581]:
            - row [ref=e582]:
              - cell [ref=e583]:
                - button "计算机学院" [ref=e584] [cursor=pointer]
              - cell "75 人" [ref=e586]
              - cell [ref=e591]
              - cell [ref=e594]
              - cell "共 75 门" [ref=e597]:
                - generic "已完成 38 / 进行中 23 / 待开始 14" [ref=e598]: 共 75 门
              - cell "24%" [ref=e602]
            - row [ref=e607]:
              - cell [ref=e608]:
                - button "经济管理学院" [ref=e609] [cursor=pointer]
              - cell "53 人" [ref=e611]
              - cell [ref=e616]
              - cell [ref=e619]
              - cell "共 53 门" [ref=e622]:
                - generic "已完成 27 / 进行中 16 / 待开始 10" [ref=e623]: 共 53 门
              - cell "39%" [ref=e627]
            - row [ref=e632]:
              - cell [ref=e633]:
                - button "人文学院" [ref=e634] [cursor=pointer]
              - cell "100 人" [ref=e636]
              - cell [ref=e641]
              - cell [ref=e644]
              - cell "共 100 门" [ref=e647]:
                - generic "已完成 50 / 进行中 30 / 待开始 20" [ref=e648]: 共 100 门
              - cell "54%" [ref=e652]
            - row [ref=e657]:
              - cell [ref=e658]:
                - button "理学院" [ref=e659] [cursor=pointer]
              - cell "78 人" [ref=e661]
              - cell [ref=e666]
              - cell [ref=e669]
              - cell "共 78 门" [ref=e672]:
                - generic "已完成 39 / 进行中 23 / 待开始 16" [ref=e673]: 共 78 门
              - cell "69%" [ref=e677]
            - row [ref=e682]:
              - cell [ref=e683]:
                - button "外国语学院" [ref=e684] [cursor=pointer]
              - cell "48 人" [ref=e686]
              - cell [ref=e691]
              - cell [ref=e694]
              - cell "共 48 门" [ref=e697]:
                - generic "已完成 24 / 进行中 14 / 待开始 10" [ref=e698]: 共 48 门
              - cell "84%" [ref=e702]
    - region [ref=e707]:
      - heading "课程列表：读数就近成组" [level=2] [ref=e708]
      - list [ref=e709]:
        - listitem [ref=e710]:
          - strong [ref=e712]: 计算机学院 · 教学任务
          - generic [ref=e713]: 评分 7.5 / 10
          - generic [ref=e717]:
            - img [ref=e723]:
              - generic [ref=e725] [cursor=pointer]
            - generic [ref=e728]:
              - generic [ref=e729]: 24%
              - generic [ref=e730]: 已完成 24 / 100 项
        - listitem [ref=e731]:
          - strong [ref=e733]: 经济管理学院 · 教学任务
          - generic [ref=e734]: 评分 5.3 / 10
          - generic [ref=e738]:
            - img [ref=e744]:
              - generic [ref=e746] [cursor=pointer]
            - generic [ref=e749]:
              - generic [ref=e750]: 39%
              - generic [ref=e751]: 已完成 39 / 100 项
        - listitem [ref=e752]:
          - strong [ref=e754]: 人文学院 · 教学任务
          - generic [ref=e755]: 评分 10.0 / 10
          - generic [ref=e759]:
            - img [ref=e765]:
              - generic [ref=e767] [cursor=pointer]
            - generic [ref=e770]:
              - generic [ref=e771]: 54%
              - generic [ref=e772]: 已完成 54 / 100 项
      - generic [ref=e773]:
        - generic [ref=e774]:
          - img [ref=e779]:
            - generic [ref=e781] [cursor=pointer]
          - generic:
            - strong: 24%
            - generic: 完成率
        - generic [ref=e784]:
          - strong [ref=e785]: 计算机学院 · 本期教学任务
          - paragraph [ref=e786]: 已完成 24 / 100 项
    - region [ref=e787]:
      - heading "分类交叉矩阵" [level=2] [ref=e788]
      - paragraph [ref=e789]: 示例数据
      - group "相似度矩阵规模" [ref=e790]:
        - button "4×4" [ref=e791] [cursor=pointer]
        - button "6×6" [pressed] [ref=e793] [cursor=pointer]
        - button "12×12" [ref=e795] [cursor=pointer]
      - region "每周学习时段 · 次数" [ref=e797]:
        - generic [ref=e798]:
          - region "每周学习时段 · 次数，可横向滚动" [ref=e799]:
            - table [ref=e800]:
              - caption [ref=e801]: 每周学习时段 · 次数
              - rowgroup [ref=e802]:
                - row [ref=e803]:
                  - columnheader "星期" [ref=e804]
                  - columnheader "00:00" [ref=e805]
                  - columnheader "01:00" [ref=e806]
                  - columnheader "02:00" [ref=e807]
                  - columnheader "03:00" [ref=e808]
                  - columnheader "04:00" [ref=e809]
                  - columnheader "05:00" [ref=e810]
                  - columnheader "06:00" [ref=e811]
                  - columnheader "07:00" [ref=e812]
                  - columnheader "08:00" [ref=e813]
                  - columnheader "09:00" [ref=e814]
                  - columnheader "10:00" [ref=e815]
                  - columnheader "11:00" [ref=e816]
                  - columnheader "12:00" [ref=e817]
                  - columnheader "13:00" [ref=e818]
                  - columnheader "14:00" [ref=e819]
                  - columnheader "15:00" [ref=e820]
                  - columnheader "16:00" [ref=e821]
                  - columnheader "17:00" [ref=e822]
                  - columnheader "18:00" [ref=e823]
                  - columnheader "19:00" [ref=e824]
                  - columnheader "20:00" [ref=e825]
                  - columnheader "21:00" [ref=e826]
                  - columnheader "22:00" [ref=e827]
                  - columnheader "23:00" [ref=e828]
              - rowgroup [ref=e829]:
                - row [ref=e830]:
                  - rowheader "周一" [ref=e831]
                  - cell "2" [ref=e832]
                  - cell "5" [ref=e836]
                  - cell "8" [ref=e840]
                  - cell "11" [ref=e844]
                  - cell "14" [ref=e848]
                  - cell "17" [ref=e852]
                  - cell "20" [ref=e856]
                  - cell "2" [ref=e860]
                  - cell "5" [ref=e864]
                  - cell "8" [ref=e868]
                  - cell "11" [ref=e872]
                  - cell "14" [ref=e876]
                  - cell "17" [ref=e880]
                  - cell "20" [ref=e884]
                  - cell "2" [ref=e888]
                  - cell "5" [ref=e892]
                  - cell "8" [ref=e896]
                  - cell "11" [ref=e900]
                  - cell "14" [ref=e904]
                  - cell "17" [ref=e908]
                  - cell "20" [ref=e912]
                  - cell "2" [ref=e916]
                  - cell "5" [ref=e920]
                  - cell "8" [ref=e924]
                - row [ref=e928]:
                  - rowheader "周二" [ref=e929]
                  - cell "9" [ref=e930]
                  - cell "12" [ref=e934]
                  - cell "15" [ref=e938]
                  - cell "18" [ref=e942]
                  - cell "0" [ref=e946]
                  - cell "3" [ref=e950]
                  - cell "6" [ref=e954]
                  - cell "9" [ref=e958]
                  - cell "12" [ref=e962]
                  - cell "15" [ref=e966]
                  - cell "18" [ref=e970]
                  - cell "0" [ref=e974]
                  - cell "3" [ref=e978]
                  - cell "6" [ref=e982]
                  - cell "9" [ref=e986]
                  - cell "12" [ref=e990]
                  - cell "15" [ref=e994]
                  - cell "18" [ref=e998]
                  - cell "0" [ref=e1002]
                  - cell "3" [ref=e1006]
                  - cell "6" [ref=e1010]
                  - cell "9" [ref=e1014]
                  - cell "12" [ref=e1018]
                  - cell "15" [ref=e1022]
                - row [ref=e1026]:
                  - rowheader "周三" [ref=e1027]
                  - cell "16" [ref=e1028]
                  - cell "19" [ref=e1032]
                  - cell "1" [ref=e1036]
                  - cell "4" [ref=e1040]
                  - cell "7" [ref=e1044]
                  - cell "10" [ref=e1048]
                  - cell "13" [ref=e1052]
                  - cell "16" [ref=e1056]
                  - cell "19" [ref=e1060]
                  - cell "1" [ref=e1064]
                  - cell "4" [ref=e1068]
                  - cell "7" [ref=e1072]
                  - cell "10" [ref=e1076]
                  - cell "13" [ref=e1080]
                  - cell "16" [ref=e1084]
                  - cell "19" [ref=e1088]
                  - cell "1" [ref=e1092]
                  - cell "4" [ref=e1096]
                  - cell "7" [ref=e1100]
                  - cell "10" [ref=e1104]
                  - cell "13" [ref=e1108]
                  - cell "16" [ref=e1112]
                  - cell "19" [ref=e1116]
                  - cell "1" [ref=e1120]
                - row [ref=e1124]:
                  - rowheader "周四" [ref=e1125]
                  - cell "2" [ref=e1126]
                  - cell "5" [ref=e1130]
                  - cell "8" [ref=e1134]
                  - cell "11" [ref=e1138]
                  - cell "14" [ref=e1142]
                  - cell "17" [ref=e1146]
                  - cell "20" [ref=e1150]
                  - cell "2" [ref=e1154]
                  - cell "5" [ref=e1158]
                  - cell "8" [ref=e1162]
                  - cell "11" [ref=e1166]
                  - cell "14" [ref=e1170]
                  - cell "17" [ref=e1174]
                  - cell "20" [ref=e1178]
                  - cell "2" [ref=e1182]
                  - cell "5" [ref=e1186]
                  - cell "8" [ref=e1190]
                  - cell "11" [ref=e1194]
                  - cell "14" [ref=e1198]
                  - cell "17" [ref=e1202]
                  - cell "20" [ref=e1206]
                  - cell "2" [ref=e1210]
                  - cell "5" [ref=e1214]
                  - cell "8" [ref=e1218]
                - row [ref=e1222]:
                  - rowheader "周五" [ref=e1223]
                  - cell "9" [ref=e1224]
                  - cell "12" [ref=e1228]
                  - cell "15" [ref=e1232]
                  - cell "18" [ref=e1236]
                  - cell "0" [ref=e1240]
                  - cell "3" [ref=e1244]
                  - cell "6" [ref=e1248]
                  - cell "9" [ref=e1252]
                  - cell "12" [ref=e1256]
                  - cell "15" [ref=e1260]
                  - cell "18" [ref=e1264]
                  - cell "0" [ref=e1268]
                  - cell "3" [ref=e1272]
                  - cell "6" [ref=e1276]
                  - cell "9" [ref=e1280]
                  - cell "12" [ref=e1284]
                  - cell "15" [ref=e1288]
                  - cell "18" [ref=e1292]
                  - cell "0" [ref=e1296]
                  - cell "3" [ref=e1300]
                  - cell "6" [ref=e1304]
                  - cell "9" [ref=e1308]
                  - cell "12" [ref=e1312]
                  - cell "15" [ref=e1316]
                - row [ref=e1320]:
                  - rowheader "周六" [ref=e1321]
                  - cell "16" [ref=e1322]
                  - cell "19" [ref=e1326]
                  - cell "1" [ref=e1330]
                  - cell "4" [ref=e1334]
                  - cell "7" [ref=e1338]
                  - cell "10" [ref=e1342]
                  - cell "13" [ref=e1346]
                  - cell "16" [ref=e1350]
                  - cell "19" [ref=e1354]
                  - cell "1" [ref=e1358]
                  - cell "4" [ref=e1362]
                  - cell "7" [ref=e1366]
                  - cell "10" [ref=e1370]
                  - cell "13" [ref=e1374]
                  - cell "16" [ref=e1378]
                  - cell "19" [ref=e1382]
                  - cell "1" [ref=e1386]
                  - cell "4" [ref=e1390]
                  - cell "7" [ref=e1394]
                  - cell "10" [ref=e1398]
                  - cell "13" [ref=e1402]
                  - cell "16" [ref=e1406]
                  - cell "19" [ref=e1410]
                  - cell "1" [ref=e1414]
                - row [ref=e1418]:
                  - rowheader "周日" [ref=e1419]
                  - cell "2" [ref=e1420]
                  - cell "5" [ref=e1424]
                  - cell "8" [ref=e1428]
                  - cell "11" [ref=e1432]
                  - cell "14" [ref=e1436]
                  - cell "17" [ref=e1440]
                  - cell "20" [ref=e1444]
                  - cell "2" [ref=e1448]
                  - cell "5" [ref=e1452]
                  - cell "8" [ref=e1456]
                  - cell "11" [ref=e1460]
                  - cell "14" [ref=e1464]
                  - cell "17" [ref=e1468]
                  - cell "20" [ref=e1472]
                  - cell "2" [ref=e1476]
                  - cell "5" [ref=e1480]
                  - cell "8" [ref=e1484]
                  - cell "11" [ref=e1488]
                  - cell "14" [ref=e1492]
                  - cell "17" [ref=e1496]
                  - cell "20" [ref=e1500]
                  - cell "2" [ref=e1504]
                  - cell "5" [ref=e1508]
                  - cell "缺测" [ref=e1512]
          - list "每周学习时段 · 次数图例" [ref=e1514]:
            - listitem [ref=e1515]:
              - generic [ref=e1516]: "0"
            - listitem [ref=e1519]:
              - generic [ref=e1520]: "20"
        - paragraph [ref=e1523]: 按星期与小时比较学习次数，0 也是有效观测。
      - region "课程与培养方案版本 · 开课学期" [ref=e1524]:
        - generic [ref=e1525]:
          - region "课程与培养方案版本 · 开课学期，可横向滚动" [ref=e1526]:
            - table [ref=e1527]:
              - caption [ref=e1528]: 课程与培养方案版本 · 开课学期
              - rowgroup [ref=e1529]:
                - row [ref=e1530]:
                  - columnheader "课程" [ref=e1531]
                  - columnheader "2022 版" [ref=e1532]
                  - columnheader "2023 版" [ref=e1533]
                  - columnheader "2024 版" [ref=e1534]
                  - columnheader "2025 版" [ref=e1535]
              - rowgroup [ref=e1536]:
                - row [ref=e1537]:
                  - rowheader "高等数学" [ref=e1538]
                  - cell "第2学期" [ref=e1539]
                  - cell "第3学期" [ref=e1543]
                  - cell "未设学期" [ref=e1547]
                  - cell "第5学期" [ref=e1549]
                - row [ref=e1553]:
                  - rowheader "线性代数" [ref=e1554]
                  - cell "第3学期" [ref=e1555]
                  - cell "第4学期" [ref=e1559]
                  - cell "第5学期" [ref=e1563]
                  - cell "第6学期" [ref=e1567]
                - row [ref=e1571]:
                  - rowheader "概率论与数理统计" [ref=e1572]
                  - cell "第4学期" [ref=e1573]
                  - cell "无该课程" [ref=e1577]
                  - cell "第6学期" [ref=e1579]
                  - cell "第7学期" [ref=e1583]
                - row [ref=e1587]:
                  - rowheader "大学物理" [ref=e1588]
                  - cell "第5学期" [ref=e1589]
                  - cell "第6学期" [ref=e1593]
                  - cell "第7学期" [ref=e1597]
                  - cell "第8学期" [ref=e1601]
                - row [ref=e1605]:
                  - rowheader "程序设计基础" [ref=e1606]
                  - cell "第6学期" [ref=e1607]
                  - cell "第7学期" [ref=e1611]
                  - cell "第8学期" [ref=e1615]
                  - cell "第1学期" [ref=e1619]
                - row [ref=e1623]:
                  - rowheader "数据结构" [ref=e1624]
                  - cell "第7学期" [ref=e1625]
                  - cell "第8学期" [ref=e1629]
                  - cell "第1学期" [ref=e1633]
                  - cell "第2学期" [ref=e1637]
          - list "课程与培养方案版本 · 开课学期图例" [ref=e1641]:
            - listitem [ref=e1642]:
              - generic [ref=e1643]: 第1学期
            - listitem [ref=e1646]:
              - generic [ref=e1647]: 第8学期
        - paragraph [ref=e1650]: 学期按 1—8 排列；未设学期与无该课程分别记录。
      - region "课程相似度" [ref=e1651]:
        - generic [ref=e1652]:
          - region "课程相似度，可横向滚动" [ref=e1653]:
            - table [ref=e1654]:
              - caption [ref=e1655]: 课程相似度
              - rowgroup [ref=e1656]:
                - row [ref=e1657]:
                  - columnheader "课程" [ref=e1658]
                  - columnheader "高等数学" [ref=e1659]
                  - columnheader "线性代数" [ref=e1660]
                  - columnheader "概率论与数理统计" [ref=e1661]
                  - columnheader "大学物理" [ref=e1662]
                  - columnheader "程序设计基础" [ref=e1663]
                  - columnheader "数据结构" [ref=e1664]
              - rowgroup [ref=e1665]:
                - row [ref=e1666]:
                  - rowheader "高等数学" [ref=e1667]
                  - cell "缺测" [ref=e1668]
                  - cell "40%" [ref=e1670]
                  - cell "70%" [ref=e1674]
                  - cell "100%" [ref=e1678]
                  - cell "20%" [ref=e1682]
                  - cell "50%" [ref=e1686]
                - row [ref=e1690]:
                  - rowheader "线性代数" [ref=e1691]
                  - cell "80%" [ref=e1692]
                  - cell "0%" [ref=e1696]
                  - cell "30%" [ref=e1700]
                  - cell "60%" [ref=e1704]
                  - cell "90%" [ref=e1708]
                  - cell "10%" [ref=e1712]
                - row [ref=e1716]:
                  - rowheader "概率论与数理统计" [ref=e1717]
                  - cell "40%" [ref=e1718]
                  - cell "70%" [ref=e1722]
                  - cell "100%" [ref=e1726]
                  - cell "20%" [ref=e1730]
                  - cell "50%" [ref=e1734]
                  - cell "80%" [ref=e1738]
                - row [ref=e1742]:
                  - rowheader "大学物理" [ref=e1743]
                  - cell "0%" [ref=e1744]
                  - cell "30%" [ref=e1748]
                  - cell "60%" [ref=e1752]
                  - cell "缺测" [ref=e1756]
                  - cell "10%" [ref=e1758]
                  - cell "40%" [ref=e1762]
                - row [ref=e1766]:
                  - rowheader "程序设计基础" [ref=e1767]
                  - cell "70%" [ref=e1768]
                  - cell "100%" [ref=e1772]
                  - cell "20%" [ref=e1776]
                  - cell "50%" [ref=e1780]
                  - cell "80%" [ref=e1784]
                  - cell "0%" [ref=e1788]
                - row [ref=e1792]:
                  - rowheader "数据结构" [ref=e1793]
                  - cell "30%" [ref=e1794]
                  - cell "60%" [ref=e1798]
                  - cell "90%" [ref=e1802]
                  - cell "10%" [ref=e1806]
                  - cell "40%" [ref=e1810]
                  - cell "70%" [ref=e1814]
          - list "课程相似度图例" [ref=e1818]:
            - listitem [ref=e1819]:
              - generic [ref=e1820]: 0%
            - listitem [ref=e1823]:
              - generic [ref=e1824]: 100%
        - paragraph [ref=e1827]: 同一课程对应两轴；方向不同的读数分别保留，缺测位置留空。
      - region "课程类别与学院 · 课程数" [ref=e1828]:
        - generic [ref=e1829]:
          - region "课程类别与学院 · 课程数，可横向滚动" [ref=e1830]:
            - table [ref=e1831]:
              - caption [ref=e1832]: 课程类别与学院 · 课程数
              - rowgroup [ref=e1833]:
                - row [ref=e1834]:
                  - columnheader "课程类别" [ref=e1835]
                  - columnheader "计算机学院" [ref=e1836]
                  - columnheader "经济管理学院" [ref=e1837]
                  - columnheader "人文学院" [ref=e1838]
                  - columnheader "理学院" [ref=e1839]
                  - columnheader "外国语学院" [ref=e1840]
                  - columnheader "教育学院" [ref=e1841]
              - rowgroup [ref=e1842]:
                - row [ref=e1843]:
                  - rowheader "通识课程" [ref=e1844]
                  - cell "3" [ref=e1845]
                  - cell "10" [ref=e1850]
                  - cell "17" [ref=e1855]
                  - cell "24" [ref=e1860]
                  - cell "31" [ref=e1865]
                  - cell "38" [ref=e1870]
                - row [ref=e1875]:
                  - rowheader "学科基础" [ref=e1876]
                  - cell "14" [ref=e1877]
                  - cell "21" [ref=e1882]
                  - cell "28" [ref=e1887]
                  - cell "35" [ref=e1892]
                  - cell "42" [ref=e1897]
                  - cell "49" [ref=e1902]
                - row [ref=e1907]:
                  - rowheader "专业必修" [ref=e1908]
                  - cell "25" [ref=e1909]
                  - cell "32" [ref=e1914]
                  - cell "39" [ref=e1919]
                  - cell "46" [ref=e1924]
                  - cell "53" [ref=e1929]
                  - cell "60" [ref=e1934]
                - row [ref=e1939]:
                  - rowheader "专业选修" [ref=e1940]
                  - cell "36" [ref=e1941]
                  - cell "43" [ref=e1946]
                  - cell "50" [ref=e1951]
                  - cell "57" [ref=e1956]
                  - cell "64" [ref=e1961]
                  - cell "71" [ref=e1966]
                - row [ref=e1971]:
                  - rowheader "实践课程" [ref=e1972]
                  - cell "47" [ref=e1973]
                  - cell "54" [ref=e1978]
                  - cell "61" [ref=e1983]
                  - cell "68" [ref=e1988]
                  - cell "75" [ref=e1993]
                  - cell "82" [ref=e1998]
                - row [ref=e2003]:
                  - rowheader "创新课程" [ref=e2004]
                  - cell "58" [ref=e2005]
                  - cell "65" [ref=e2010]
                  - cell "72" [ref=e2015]
                  - cell "79" [ref=e2020]
                  - cell "86" [ref=e2025]
                  - cell "93" [ref=e2030]
          - list "课程类别与学院 · 课程数图例" [ref=e2035]:
            - listitem [ref=e2036]:
              - generic [ref=e2037]: "0"
            - listitem [ref=e2040]:
              - generic [ref=e2041]: "25"
            - listitem [ref=e2045]:
              - generic [ref=e2046]: "100"
        - paragraph [ref=e2050]: 圆面积表示数量，每个位置同时保留精确课程数。
      - region "课程支撑关系" [ref=e2051]:
        - generic [ref=e2052]:
          - region "课程支撑关系，可横向滚动" [ref=e2053]:
            - table [ref=e2054]:
              - caption [ref=e2055]: 课程支撑关系
              - rowgroup [ref=e2056]:
                - row [ref=e2057]:
                  - columnheader "课程" [ref=e2058]
                  - columnheader "知识与能力" [ref=e2059]
                  - columnheader "分析与表达" [ref=e2060]
                  - columnheader "协作与实践" [ref=e2061]
                  - columnheader "创新与反思" [ref=e2062]
              - rowgroup [ref=e2063]:
                - row [ref=e2064]:
                  - rowheader "高等数学" [ref=e2065]
                  - cell "一般支撑" [ref=e2066]
                  - cell "核心支撑" [ref=e2071]
                  - cell "无直接支撑" [ref=e2076]
                  - cell "一般支撑" [ref=e2081]
                - row [ref=e2086]:
                  - rowheader "线性代数" [ref=e2087]
                  - cell "核心支撑" [ref=e2088]
                  - cell "无直接支撑" [ref=e2093]
                  - cell "一般支撑" [ref=e2098]
                  - cell "核心支撑" [ref=e2103]
                - row [ref=e2108]:
                  - rowheader "概率论与数理统计" [ref=e2109]
                  - cell "无直接支撑" [ref=e2110]
                  - cell "一般支撑" [ref=e2115]
                  - cell "核心支撑" [ref=e2120]
                  - cell "无直接支撑" [ref=e2125]
                - row [ref=e2130]:
                  - rowheader "大学物理" [ref=e2131]
                  - cell "一般支撑" [ref=e2132]
                  - cell "核心支撑" [ref=e2137]
                  - cell "无直接支撑" [ref=e2142]
                  - cell "一般支撑" [ref=e2147]
                - row [ref=e2152]:
                  - rowheader "程序设计基础" [ref=e2153]
                  - cell "核心支撑" [ref=e2154]
                  - cell "无直接支撑" [ref=e2159]
                  - cell "一般支撑" [ref=e2164]
                  - cell "核心支撑" [ref=e2169]
                - row [ref=e2174]:
                  - rowheader "数据结构" [ref=e2175]
                  - cell "无直接支撑" [ref=e2176]
                  - cell "一般支撑" [ref=e2181]
                  - cell "核心支撑" [ref=e2186]
                  - cell "无直接支撑" [ref=e2191]
          - list "课程支撑关系图例" [ref=e2196]:
            - listitem [ref=e2197]:
              - generic [ref=e2198]: 无直接支撑
            - listitem [ref=e2202]:
              - generic [ref=e2203]: 一般支撑
            - listitem [ref=e2207]:
              - generic [ref=e2208]: 核心支撑
        - paragraph [ref=e2212]: 支撑关系只有无直接支撑、一般支撑和核心支撑三个等级。
  - group [ref=e2213]:
    - generic "条形与嵌入组合源码" [ref=e2214] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-business/mini-data.ts"
    - option "chart-business/mini-layout.ts"
    - option "chart-business/mini-examples.tsx"
    - option "chart-business/bar-examples.tsx"
    - option "chart-business/embedding-examples.tsx"
    - option "chart-business/chart-business.css"
    - option "chart-business/matrix-examples.tsx"
    - option "chart-business/matrix-data.ts"
```

# Test source

```ts
  1  | import { test,expect } from '@playwright/test';
  2  | import { mkdir,writeFile } from 'node:fs/promises';
  3  | test('normal bar updates and sorting keep the same keyed geometry and continue through intermediate values',async({page})=>{
  4  |   await page.emulateMedia({reducedMotion:'no-preference'}); await page.goto('/#chart-business');
  5  |   const bar=page.locator('[data-business="horizontal"] g[class^="bar-series-"] rect').first(); await expect(bar).toBeVisible(); await page.waitForTimeout(1800);
  6  |   await bar.evaluate(node=>node.setAttribute('data-test-stable','first'));
  7  |   const start=await bar.evaluate(node=>(node as SVGGraphicsElement).getBBox().width); await page.getByRole('button',{name:'更新数据',exact:true}).click();
  8  |   await page.waitForTimeout(160); const middle=await bar.evaluate(node=>(node as SVGGraphicsElement).getBBox().width); await page.waitForTimeout(1200); const end=await bar.evaluate(node=>(node as SVGGraphicsElement).getBBox().width);
  9  |   expect(middle).toBeGreaterThan(start); expect(middle).toBeLessThan(end); expect(end/start).toBeCloseTo(75/25,1);
  10 |   await page.getByRole('button',{name:'更新数据',exact:true}).click(); await page.waitForTimeout(160);
  11 |   const descending=await bar.evaluate(node=>(node as SVGGraphicsElement).getBBox().width); expect(descending).toBeLessThan(end); expect(descending).toBeGreaterThan(start*2);
  12 |   await page.waitForTimeout(1200); expect((await bar.evaluate(node=>(node as SVGGraphicsElement).getBBox().width))/start).toBeCloseTo(50/25,1);
  13 |   await page.getByRole('button',{name:'按数量排序'}).click(); await expect(page.locator('[data-business="horizontal"] [data-test-stable="first"]')).toHaveCount(1);
  14 | });
  15 | test('horizontal stacked segments retain distinct origins through entry and updates',async({page})=>{
  16 |   await page.emulateMedia({reducedMotion:'no-preference'}); await page.goto('/#chart-business');
  17 |   const stack=page.locator('[data-business="horizontal-stacked"]');
  18 |   const rects=stack.locator('g[class^="bar-series-"] rect'); await expect(rects).toHaveCount(15); await page.waitForTimeout(1800);
  19 |   const geometry=()=>rects.evaluateAll(nodes=>[0,5,10].map(index=>{const box=nodes[index]!.getBoundingClientRect();return {x:box.x-nodes[0]!.getBoundingClientRect().x,width:box.width};}));
  20 |   const before=await geometry(); expect(before[1]!.x).toBeCloseTo(before[0]!.x+before[0]!.width,0); expect(before[2]!.x).toBeCloseTo(before[1]!.x+before[1]!.width,0);
  21 |   await page.getByRole('button',{name:'更新数据',exact:true}).click(); await page.waitForTimeout(160); const middle=await geometry();
  22 |   expect(middle[0]!.width).toBeGreaterThan(before[0]!.width); expect(middle[1]!.x).toBeGreaterThan(before[1]!.x);
  23 |   expect(Math.abs(middle[1]!.x-middle[0]!.width)).toBeLessThan(2); expect(Math.abs(middle[2]!.x-middle[1]!.x-middle[1]!.width)).toBeLessThan(2);
  24 |   await page.waitForTimeout(1300); const after=await geometry(); expect(after[0]!.width).toBeGreaterThan(middle[0]!.width);
  25 |   expect(after[1]!.x).toBeCloseTo(after[0]!.width,0); expect(after[2]!.x).toBeCloseTo(after[1]!.x+after[1]!.width,0);
  26 | });
  27 | for (const size of ['compact','comfortable']) for (const kind of ['pie','arc']) test(`${size} mini ${kind} updates keep the mounted path and animate through intermediate geometry`,async({page})=>{
  28 |   await page.emulateMedia({reducedMotion:'no-preference'}); await page.goto('/#chart-business');
  29 |   const mini=page.locator(`.rain-business-mini-gallery [data-mini-kind="${kind}"][data-size="${size}"]`);
  30 |   const path=kind === 'pie' ? mini.locator('path[pointer-events="none"]').first() : mini.locator('path').last();
  31 |   await mini.scrollIntoViewIfNeeded(); await expect(path).toBeVisible(); await page.waitForTimeout(1100);
  32 |   await path.evaluate(node=>node.setAttribute('data-test-owned-sector','first')); const initial=await path.getAttribute('d');
  33 |   const started=Date.now(); await page.getByRole('button',{name:'更新数据',exact:true}).evaluate(node=>(node as HTMLButtonElement).click());
  34 |   await page.waitForTimeout(120); const middle=await path.getAttribute('d');
  35 |   await expect.poll(async()=>{const previous=await path.getAttribute('d');await page.waitForTimeout(120);return previous===await path.getAttribute('d');},{timeout:4000}).toBe(true);
  36 |   const elapsedMs=Date.now()-started, end=await path.getAttribute('d');
  37 |   expect(end).not.toBe(initial); expect(middle).not.toBe(initial); expect(middle).not.toBe(end);
  38 |   await expect(mini.locator('[data-test-owned-sector="first"]')).toHaveCount(1);
  39 |   await page.getByRole('combobox',{name:'业务图表配色'}).selectOption('category-near');
  40 |   expect(await path.getAttribute('d')).toBe(end);
  41 |   await expect(mini.locator('[data-test-owned-sector="first"]')).toHaveCount(1);
  42 |   const evidence='evidence/runtime/chart-mini-refinement/browser/motion'; await mkdir(evidence,{recursive:true});
  43 |   await writeFile(`${evidence}/${kind}-${size}.json`,JSON.stringify({kind,size,elapsedUntilStableMs:elapsedMs,intermediateGeometry:true,mountedPathPreserved:true},null,2));
  44 | });
  45 | 
  46 | for (const size of ['compact','comfortable']) test(`${size} mini data bar follows 25 to 75 to 50 and reduced motion reaches terminal geometry immediately`,async({page})=>{
  47 |   await page.emulateMedia({reducedMotion:'no-preference'}); await page.goto('/#chart-business');
  48 |   const mini=page.locator(`.rain-business-mini-gallery [data-mini-kind="quantity"][data-size="${size}"]`);
  49 |   const fill=mini.locator('.rain-data-bar__fill');
  50 |   await mini.scrollIntoViewIfNeeded(); await expect(fill).toBeVisible(); await page.waitForTimeout(800);
  51 |   await fill.evaluate(node=>node.setAttribute('data-test-stable-fill','true'));
  52 |   const width=()=>fill.evaluate(node=>node.getBoundingClientRect().width);
  53 |   const first=await width();
  54 |   await page.getByRole('button',{name:'更新数据',exact:true}).evaluate(node=>(node as HTMLButtonElement).click());
  55 |   await page.waitForTimeout(120); const ascending=await width(); await page.waitForTimeout(650); const second=await width();
  56 |   expect(ascending).toBeGreaterThan(first); expect(ascending).toBeLessThan(second); expect(second/first).toBeCloseTo(3,1);
  57 |   await page.getByRole('button',{name:'更新数据',exact:true}).evaluate(node=>(node as HTMLButtonElement).click());
  58 |   await page.waitForTimeout(120); const descending=await width(); await page.waitForTimeout(650); const third=await width();
  59 |   expect(descending).toBeLessThan(second); expect(descending).toBeGreaterThan(third); expect(third/first).toBeCloseTo(2,1);
  60 |   await expect(fill).toHaveAttribute('data-test-stable-fill','true');
  61 |   await page.emulateMedia({reducedMotion:'reduce'});
  62 |   await page.reload(); await mini.scrollIntoViewIfNeeded(); await expect(fill).toBeVisible();
  63 |   await page.getByRole('button',{name:'更新数据',exact:true}).evaluate(node=>(node as HTMLButtonElement).click());
  64 |   await expect(mini.locator('.rain-data-bar')).toHaveAttribute('data-fraction','0.75');
  65 |   const immediate=await width(); await page.waitForTimeout(60);
  66 |   expect(await width()).toBeCloseTo(immediate,2); expect(immediate/first).toBeCloseTo(3,1);
  67 | });
  68 | 
  69 | test('fresh reduced motion commits both sizes of pie and progress directly to the new geometry',async({page})=>{
  70 |   await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('/#chart-business');
  71 |   const paths=[];
  72 |   for(const size of ['compact','comfortable'])for(const kind of ['pie','arc']){
  73 |     const mini=page.locator(`.rain-business-mini-gallery [data-mini-kind="${kind}"][data-size="${size}"]`);
  74 |     const path=kind === 'pie' ? mini.locator('path[pointer-events="none"]').first() : mini.locator('path').last();
  75 |     await expect(path).toBeAttached(); paths.push(path);
  76 |   }
  77 |   const before=await Promise.all(paths.map(path=>path.getAttribute('d')));
  78 |   await page.getByRole('button',{name:'更新数据',exact:true}).click();
  79 |   await expect(page.getByRole('status').filter({hasText:'更新 1 次'})).toBeVisible();
  80 |   const immediate=await Promise.all(paths.map(path=>path.getAttribute('d')));
  81 |   await page.waitForTimeout(60);
> 82 |   expect(await Promise.all(paths.map(path=>path.getAttribute('d')))).toEqual(immediate);
     |                                                                      ^ Error: expect(received).toEqual(expected) // deep equality
  83 |   immediate.forEach((value,index)=>expect(value).not.toBe(before[index]));
  84 | });
  85 | 
```