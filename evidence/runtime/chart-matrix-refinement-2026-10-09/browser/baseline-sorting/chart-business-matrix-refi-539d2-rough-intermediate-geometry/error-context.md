# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-matrix-refinement.spec.ts >> updates and sorting retain coordinate nodes and animate through intermediate geometry
- Location: tests/e2e/chart-business-matrix-refinement.spec.ts:154:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
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
    - button "更新数据" [ref=e16] [cursor=pointer]
    - button "重播动效" [ref=e18] [cursor=pointer]
    - button "按数量排序" [pressed] [ref=e20] [cursor=pointer]
    - button "只看50人以上" [ref=e22] [cursor=pointer]
    - button "40行场景" [ref=e24] [cursor=pointer]
  - status [ref=e26]: 示例数据 · 更新 1 次
  - generic [ref=e27]:
    - region [ref=e28]:
      - heading "同一量程，大小都能比较" [level=2] [ref=e29]
      - generic [ref=e30]:
        - generic [ref=e32]:
          - generic:
            - generic:
              - generic "人文学院"
            - generic:
              - generic "理学院"
            - generic:
              - generic "计算机学院"
            - generic:
              - generic "经济管理学院"
            - generic:
              - generic "外国语学院"
        - list [ref=e49]:
          - listitem [ref=e50]:
            - generic [ref=e51]: 人文学院
            - generic [ref=e54]: 100 人
          - listitem [ref=e55]:
            - generic [ref=e56]: 理学院
            - generic [ref=e59]: 78 人
          - listitem [ref=e60]:
            - generic [ref=e61]: 计算机学院
            - generic [ref=e64]: 75 人
          - listitem [ref=e65]:
            - generic [ref=e66]: 经济管理学院
            - generic [ref=e69]: 53 人
          - listitem [ref=e70]:
            - generic [ref=e71]: 外国语学院
            - generic [ref=e74]: 48 人
    - generic [ref=e75]:
      - heading "分组比较与互斥堆叠" [level=2] [ref=e76]
      - generic [ref=e77]:
        - figure "本期与上期参与人数" [ref=e78]:
          - generic [ref=e81]:
            - generic:
              - generic:
                - generic "人文学院"
              - generic:
                - generic "理学院"
              - generic:
                - generic "计算机学院"
              - generic:
                - generic "经济管理学院"
              - generic:
                - generic "外国语学院"
          - paragraph [ref=e109]:
            - generic [ref=e110]: 本期
            - generic [ref=e112]: 上期
          - group [ref=e114]:
            - generic "查看分项读数" [ref=e115]
        - figure "互斥课程构成" [ref=e116]:
          - generic [ref=e119]:
            - generic:
              - generic:
                - generic "人文学院"
              - generic:
                - generic "理学院"
              - generic:
                - generic "计算机学院"
              - generic:
                - generic "经济管理学院"
              - generic:
                - generic "外国语学院"
          - paragraph [ref=e158]:
            - generic [ref=e159]: 已完成
            - generic [ref=e161]: 进行中
            - generic [ref=e163]: 待开始
          - group [ref=e165]:
            - generic "查看分项读数" [ref=e166]
      - generic [ref=e167]:
        - generic [ref=e168]: 评分 7.5 / 10
        - generic [ref=e172]: 相对位置 12 / 60（从前到后）
    - region [ref=e176]:
      - heading "同一图形，两种阅读密度" [level=2] [ref=e177]
      - generic [ref=e178]:
        - figure "数量条 · 紧凑 本期人数 · 100 人" [ref=e179]:
          - generic [ref=e185]:
            - strong [ref=e186]: 数量条 · 紧凑
            - generic [ref=e187]: 本期人数 · 100 人
        - figure "数量条 · 舒展 本期人数 · 100 人" [ref=e188]:
          - generic [ref=e194]:
            - strong [ref=e195]: 数量条 · 舒展
            - generic [ref=e196]: 本期人数 · 100 人
        - figure "构成分段 · 紧凑 已完成 50 人 进行中 30 人 待开始 20 人" [ref=e197]:
          - generic [ref=e217]:
            - strong [ref=e218]: 构成分段 · 紧凑
            - list [ref=e219]:
              - listitem [ref=e220]:
                - text: 已完成
                - generic [ref=e222]: 50 人
              - listitem [ref=e223]:
                - text: 进行中
                - generic [ref=e225]: 30 人
              - listitem [ref=e226]:
                - text: 待开始
                - generic [ref=e228]: 20 人
        - figure "构成分段 · 舒展 已完成 50 人 进行中 30 人 待开始 20 人" [ref=e229]:
          - generic [ref=e249]:
            - strong [ref=e250]: 构成分段 · 舒展
            - list [ref=e251]:
              - listitem [ref=e252]:
                - text: 已完成
                - generic [ref=e254]: 50 人
              - listitem [ref=e255]:
                - text: 进行中
                - generic [ref=e257]: 30 人
              - listitem [ref=e258]:
                - text: 待开始
                - generic [ref=e260]: 20 人
        - figure "每日柱图 · 紧凑 近8天每日人数 · 共同上限 88 人" [ref=e261]:
          - generic [ref=e289]:
            - strong [ref=e290]: 每日柱图 · 紧凑
            - generic [ref=e291]: 近8天每日人数 · 共同上限 88 人
        - figure "每日柱图 · 舒展 近8天每日人数 · 共同上限 88 人" [ref=e292]:
          - generic [ref=e320]:
            - strong [ref=e321]: 每日柱图 · 舒展
            - generic [ref=e322]: 近8天每日人数 · 共同上限 88 人
        - figure "小饼 · 紧凑 已完成 50 人 进行中 30 人 待开始 20 人" [ref=e323]:
          - img [ref=e330]:
            - generic [ref=e331]:
              - generic [ref=e332] [cursor=pointer]
              - generic [ref=e334] [cursor=pointer]
              - generic [ref=e336] [cursor=pointer]
          - generic [ref=e338]:
            - strong [ref=e339]: 小饼 · 紧凑
            - list [ref=e340]:
              - listitem [ref=e341]:
                - text: 已完成
                - generic [ref=e343]: 50 人
              - listitem [ref=e344]:
                - text: 进行中
                - generic [ref=e346]: 30 人
              - listitem [ref=e347]:
                - text: 待开始
                - generic [ref=e349]: 20 人
        - figure "小饼 · 舒展 已完成 50 人 进行中 30 人 待开始 20 人" [ref=e350]:
          - img [ref=e357]:
            - generic [ref=e358]:
              - generic [ref=e359] [cursor=pointer]
              - generic [ref=e361] [cursor=pointer]
              - generic [ref=e363] [cursor=pointer]
          - generic [ref=e365]:
            - strong [ref=e366]: 小饼 · 舒展
            - list [ref=e367]:
              - listitem [ref=e368]:
                - text: 已完成
                - generic [ref=e370]: 50 人
              - listitem [ref=e371]:
                - text: 进行中
                - generic [ref=e373]: 30 人
              - listitem [ref=e374]:
                - text: 待开始
                - generic [ref=e376]: 20 人
        - figure "环饼 · 紧凑 已完成 50 人 进行中 30 人 待开始 20 人" [ref=e377]:
          - img [ref=e384]:
            - generic [ref=e385]:
              - generic [ref=e386] [cursor=pointer]
              - generic [ref=e388] [cursor=pointer]
              - generic [ref=e390] [cursor=pointer]
          - generic [ref=e392]:
            - strong [ref=e393]: 环饼 · 紧凑
            - list [ref=e394]:
              - listitem [ref=e395]:
                - text: 已完成
                - generic [ref=e397]: 50 人
              - listitem [ref=e398]:
                - text: 进行中
                - generic [ref=e400]: 30 人
              - listitem [ref=e401]:
                - text: 待开始
                - generic [ref=e403]: 20 人
        - figure "环饼 · 舒展 已完成 50 人 进行中 30 人 待开始 20 人" [ref=e404]:
          - img [ref=e411]:
            - generic [ref=e412]:
              - generic [ref=e413] [cursor=pointer]
              - generic [ref=e415] [cursor=pointer]
              - generic [ref=e417] [cursor=pointer]
          - generic [ref=e419]:
            - strong [ref=e420]: 环饼 · 舒展
            - list [ref=e421]:
              - listitem [ref=e422]:
                - text: 已完成
                - generic [ref=e424]: 50 人
              - listitem [ref=e425]:
                - text: 进行中
                - generic [ref=e427]: 30 人
              - listitem [ref=e428]:
                - text: 待开始
                - generic [ref=e430]: 20 人
        - figure "完成环 · 紧凑 完成 54 人 · 目标 100 人 · 54%" [ref=e431]:
          - img [ref=e438]:
            - generic [ref=e440] [cursor=pointer]
          - generic [ref=e443]:
            - strong [ref=e444]: 完成环 · 紧凑
            - generic [ref=e445]: 完成 54 人 · 目标 100 人 · 54%
        - figure "完成环 · 舒展 完成 54 人 · 目标 100 人" [ref=e446]:
          - generic [ref=e448]:
            - img [ref=e453]:
              - generic [ref=e455] [cursor=pointer]
            - generic:
              - strong: 54%
              - generic: 完成率
          - generic [ref=e458]:
            - strong [ref=e459]: 完成环 · 舒展
            - generic [ref=e460]: 完成 54 人 · 目标 100 人
        - figure "完成弧 · 紧凑 完成 54 人 · 目标 100 人 · 54%" [ref=e461]:
          - img [ref=e468]:
            - generic [ref=e470] [cursor=pointer]
          - generic [ref=e473]:
            - strong [ref=e474]: 完成弧 · 紧凑
            - generic [ref=e475]: 完成 54 人 · 目标 100 人 · 54%
        - figure "完成弧 · 舒展 完成 54 人 · 目标 100 人" [ref=e476]:
          - generic [ref=e478]:
            - img [ref=e483]:
              - generic [ref=e485] [cursor=pointer]
            - generic:
              - strong: 54%
              - generic: 完成率
          - generic [ref=e488]:
            - strong [ref=e489]: 完成弧 · 舒展
            - generic [ref=e490]: 完成 54 人 · 目标 100 人
        - figure [ref=e491]:
          - generic [ref=e505]:
            - strong [ref=e506]: 折线走势 · 紧凑
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e507]:
          - generic [ref=e521]:
            - strong [ref=e522]: 折线走势 · 舒展
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e523]:
          - generic [ref=e538]:
            - strong [ref=e539]: 面积走势 · 紧凑
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e540]:
          - generic [ref=e555]:
            - strong [ref=e556]: 面积走势 · 舒展
            - text: 近8天每日人数 · 观察变化
    - region [ref=e557]:
      - heading "指标卡：舒展型号" [level=2] [ref=e558]
      - generic [ref=e559]:
        - article [ref=e560]:
          - heading "本期参与人数" [level=3] [ref=e562]
          - generic [ref=e563]:
            - generic [ref=e564]: 100 人
            - paragraph [ref=e578]: 近8天每日人数 · 趋势按自身范围展开
        - article [ref=e579]:
          - heading "课程构成" [level=3] [ref=e581]
          - generic [ref=e582]:
            - generic [ref=e583]:
              - generic [ref=e584]: 100 门
              - img [ref=e590]:
                - generic [ref=e591]:
                  - generic [ref=e592] [cursor=pointer]
                  - generic [ref=e594] [cursor=pointer]
                  - generic [ref=e596] [cursor=pointer]
            - generic [ref=e598]:
              - generic [ref=e599]:
                - text: 已完成
                - generic [ref=e601]: "50"
              - generic [ref=e602]:
                - text: 进行中
                - generic [ref=e604]: "30"
              - generic [ref=e605]:
                - text: 待开始
                - generic [ref=e607]: "20"
        - article [ref=e608]:
          - heading "目标完成" [level=3] [ref=e610]
          - generic [ref=e611]:
            - generic [ref=e612]:
              - generic [ref=e613]:
                - img [ref=e618]:
                  - generic [ref=e620] [cursor=pointer]
                - generic:
                  - strong: 54%
                  - generic: 完成率
              - generic [ref=e623]: 已完成 54 项
            - paragraph [ref=e624]: 目标 100 项
    - region [ref=e625]:
      - heading "表格：紧凑型号，一起比较" [level=2] [ref=e626]
      - paragraph [ref=e627]: 参与人数共用 0—100 人量程；每日柱图共用 0—88 人量程。折线用于看各自走势；点击学院名称读取每个数据点。
      - region "学院数据与迷你图表" [ref=e628]:
        - table [ref=e629]:
          - rowgroup [ref=e630]:
            - row [ref=e631]:
              - columnheader "学院" [ref=e632]
              - columnheader "参与人数" [ref=e633]
              - columnheader "近8天趋势" [ref=e634]
              - columnheader "每日分布" [ref=e635]
              - columnheader "课程构成" [ref=e636]
              - columnheader "目标完成" [ref=e637]
          - rowgroup [ref=e638]:
            - row [ref=e639]:
              - cell [ref=e640]:
                - button "人文学院" [ref=e641] [cursor=pointer]
              - cell "100 人" [ref=e643]
              - cell [ref=e648]
              - cell [ref=e651]
              - cell "共 100 门" [ref=e654]:
                - generic "已完成 50 / 进行中 30 / 待开始 20" [ref=e655]: 共 100 门
              - cell "54%" [ref=e659]
            - row [ref=e664]:
              - cell [ref=e665]:
                - button "理学院" [ref=e666] [cursor=pointer]
              - cell "78 人" [ref=e668]
              - cell [ref=e673]
              - cell [ref=e676]
              - cell "共 78 门" [ref=e679]:
                - generic "已完成 39 / 进行中 23 / 待开始 16" [ref=e680]: 共 78 门
              - cell "69%" [ref=e684]
            - row [ref=e689]:
              - cell [ref=e690]:
                - button "计算机学院" [ref=e691] [cursor=pointer]
              - cell "75 人" [ref=e693]
              - cell [ref=e698]
              - cell [ref=e701]
              - cell "共 75 门" [ref=e704]:
                - generic "已完成 38 / 进行中 23 / 待开始 14" [ref=e705]: 共 75 门
              - cell "24%" [ref=e709]
            - row [ref=e714]:
              - cell [ref=e715]:
                - button "经济管理学院" [ref=e716] [cursor=pointer]
              - cell "53 人" [ref=e718]
              - cell [ref=e723]
              - cell [ref=e726]
              - cell "共 53 门" [ref=e729]:
                - generic "已完成 27 / 进行中 16 / 待开始 10" [ref=e730]: 共 53 门
              - cell "39%" [ref=e734]
            - row [ref=e739]:
              - cell [ref=e740]:
                - button "外国语学院" [ref=e741] [cursor=pointer]
              - cell "48 人" [ref=e743]
              - cell [ref=e748]
              - cell [ref=e751]
              - cell "共 48 门" [ref=e754]:
                - generic "已完成 24 / 进行中 14 / 待开始 10" [ref=e755]: 共 48 门
              - cell "84%" [ref=e759]
    - region [ref=e764]:
      - heading "课程列表：读数就近成组" [level=2] [ref=e765]
      - list [ref=e766]:
        - listitem [ref=e767]:
          - strong [ref=e769]: 人文学院 · 教学任务
          - generic [ref=e770]: 评分 10.0 / 10
          - generic [ref=e774]:
            - img [ref=e780]:
              - generic [ref=e782] [cursor=pointer]
            - generic [ref=e785]:
              - generic [ref=e786]: 54%
              - generic [ref=e787]: 已完成 54 / 100 项
        - listitem [ref=e788]:
          - strong [ref=e790]: 理学院 · 教学任务
          - generic [ref=e791]: 评分 7.8 / 10
          - generic [ref=e795]:
            - img [ref=e801]:
              - generic [ref=e803] [cursor=pointer]
            - generic [ref=e806]:
              - generic [ref=e807]: 69%
              - generic [ref=e808]: 已完成 69 / 100 项
        - listitem [ref=e809]:
          - strong [ref=e811]: 计算机学院 · 教学任务
          - generic [ref=e812]: 评分 7.5 / 10
          - generic [ref=e816]:
            - img [ref=e822]:
              - generic [ref=e824] [cursor=pointer]
            - generic [ref=e827]:
              - generic [ref=e828]: 24%
              - generic [ref=e829]: 已完成 24 / 100 项
      - generic [ref=e830]:
        - generic [ref=e831]:
          - img [ref=e836]:
            - generic [ref=e838] [cursor=pointer]
          - generic:
            - strong: 54%
            - generic: 完成率
        - generic [ref=e841]:
          - strong [ref=e842]: 人文学院 · 本期教学任务
          - paragraph [ref=e843]: 已完成 54 / 100 项
    - region [ref=e844]:
      - heading "分类交叉矩阵" [level=2] [ref=e845]
      - paragraph [ref=e846]: 示例数据
      - group "相似度矩阵规模" [ref=e847]:
        - button "4×4" [ref=e848] [cursor=pointer]
        - button "6×6" [pressed] [ref=e850] [cursor=pointer]
        - button "12×12" [ref=e852] [cursor=pointer]
      - region "每周学习时段 · 次数" [ref=e854]:
        - generic [ref=e855]:
          - region "每周学习时段 · 次数，可横向滚动" [ref=e856]:
            - table [ref=e857]:
              - caption [ref=e858]: 每周学习时段 · 次数
              - rowgroup [ref=e859]:
                - row [ref=e860]:
                  - columnheader "星期" [ref=e861]
                  - columnheader "23:00" [ref=e862]
                  - columnheader "22:00" [ref=e863]
                  - columnheader "21:00" [ref=e864]
                  - columnheader "20:00" [ref=e865]
                  - columnheader "19:00" [ref=e866]
                  - columnheader "18:00" [ref=e867]
                  - columnheader "17:00" [ref=e868]
                  - columnheader "16:00" [ref=e869]
                  - columnheader "15:00" [ref=e870]
                  - columnheader "14:00" [ref=e871]
                  - columnheader "13:00" [ref=e872]
                  - columnheader "12:00" [ref=e873]
                  - columnheader "11:00" [ref=e874]
                  - columnheader "10:00" [ref=e875]
                  - columnheader "09:00" [ref=e876]
                  - columnheader "08:00" [ref=e877]
                  - columnheader "07:00" [ref=e878]
                  - columnheader "06:00" [ref=e879]
                  - columnheader "05:00" [ref=e880]
                  - columnheader "04:00" [ref=e881]
                  - columnheader "03:00" [ref=e882]
                  - columnheader "02:00" [ref=e883]
                  - columnheader "01:00" [ref=e884]
                  - columnheader "00:00" [ref=e885]
              - rowgroup [ref=e886]:
                - row [ref=e887]:
                  - rowheader "周日" [ref=e888]
                  - cell "缺测" [ref=e889]
                  - cell "5" [ref=e892]
                  - cell "2" [ref=e896]
                  - cell "20" [ref=e900]
                  - cell "17" [ref=e904]
                  - cell "14" [ref=e908]
                  - cell "11" [ref=e912]
                  - cell "8" [ref=e916]
                  - cell "5" [ref=e920]
                  - cell "2" [ref=e924]
                  - cell "20" [ref=e928]
                  - cell "17" [ref=e932]
                  - cell "14" [ref=e936]
                  - cell "11" [ref=e940]
                  - cell "8" [ref=e944]
                  - cell "5" [ref=e948]
                  - cell "2" [ref=e952]
                  - cell "20" [ref=e956]
                  - cell "17" [ref=e960]
                  - cell "14" [ref=e964]
                  - cell "11" [ref=e968]
                  - cell "8" [ref=e972]
                  - cell "5" [ref=e976]
                  - cell "2" [ref=e980]
                - row [ref=e984]:
                  - rowheader "周六" [ref=e985]
                  - cell "1" [ref=e986]
                  - cell "19" [ref=e990]
                  - cell "16" [ref=e994]
                  - cell "13" [ref=e998]
                  - cell "10" [ref=e1002]
                  - cell "7" [ref=e1006]
                  - cell "4" [ref=e1010]
                  - cell "1" [ref=e1014]
                  - cell "19" [ref=e1018]
                  - cell "16" [ref=e1022]
                  - cell "13" [ref=e1026]
                  - cell "10" [ref=e1030]
                  - cell "7" [ref=e1034]
                  - cell "4" [ref=e1038]
                  - cell "1" [ref=e1042]
                  - cell "19" [ref=e1046]
                  - cell "16" [ref=e1050]
                  - cell "13" [ref=e1054]
                  - cell "10" [ref=e1058]
                  - cell "7" [ref=e1062]
                  - cell "4" [ref=e1066]
                  - cell "1" [ref=e1070]
                  - cell "19" [ref=e1074]
                  - cell "16" [ref=e1078]
                - row [ref=e1082]:
                  - rowheader "周五" [ref=e1083]
                  - cell "15" [ref=e1084]
                  - cell "12" [ref=e1088]
                  - cell "9" [ref=e1092]
                  - cell "6" [ref=e1096]
                  - cell "3" [ref=e1100]
                  - cell "0" [ref=e1104]
                  - cell "18" [ref=e1108]
                  - cell "15" [ref=e1112]
                  - cell "12" [ref=e1116]
                  - cell "9" [ref=e1120]
                  - cell "6" [ref=e1124]
                  - cell "3" [ref=e1128]
                  - cell "0" [ref=e1132]
                  - cell "18" [ref=e1136]
                  - cell "15" [ref=e1140]
                  - cell "12" [ref=e1144]
                  - cell "9" [ref=e1148]
                  - cell "6" [ref=e1152]
                  - cell "3" [ref=e1156]
                  - cell "0" [ref=e1160]
                  - cell "18" [ref=e1164]
                  - cell "15" [ref=e1168]
                  - cell "12" [ref=e1172]
                  - cell "9" [ref=e1176]
                - row [ref=e1180]:
                  - rowheader "周四" [ref=e1181]
                  - cell "8" [ref=e1182]
                  - cell "5" [ref=e1186]
                  - cell "2" [ref=e1190]
                  - cell "20" [ref=e1194]
                  - cell "17" [ref=e1198]
                  - cell "14" [ref=e1202]
                  - cell "11" [ref=e1206]
                  - cell "8" [ref=e1210]
                  - cell "5" [ref=e1214]
                  - cell "2" [ref=e1218]
                  - cell "20" [ref=e1222]
                  - cell "17" [ref=e1226]
                  - cell "14" [ref=e1230]
                  - cell "11" [ref=e1234]
                  - cell "8" [ref=e1238]
                  - cell "5" [ref=e1242]
                  - cell "2" [ref=e1246]
                  - cell "20" [ref=e1250]
                  - cell "17" [ref=e1254]
                  - cell "14" [ref=e1258]
                  - cell "11" [ref=e1262]
                  - cell "8" [ref=e1266]
                  - cell "5" [ref=e1270]
                  - cell "2" [ref=e1274]
                - row [ref=e1278]:
                  - rowheader "周三" [ref=e1279]
                  - cell "1" [ref=e1280]
                  - cell "19" [ref=e1284]
                  - cell "16" [ref=e1288]
                  - cell "13" [ref=e1292]
                  - cell "10" [ref=e1296]
                  - cell "7" [ref=e1300]
                  - cell "4" [ref=e1304]
                  - cell "1" [ref=e1308]
                  - cell "19" [ref=e1312]
                  - cell "16" [ref=e1316]
                  - cell "13" [ref=e1320]
                  - cell "10" [ref=e1324]
                  - cell "7" [ref=e1328]
                  - cell "4" [ref=e1332]
                  - cell "1" [ref=e1336]
                  - cell "19" [ref=e1340]
                  - cell "16" [ref=e1344]
                  - cell "13" [ref=e1348]
                  - cell "10" [ref=e1352]
                  - cell "7" [ref=e1356]
                  - cell "4" [ref=e1360]
                  - cell "1" [ref=e1364]
                  - cell "19" [ref=e1368]
                  - cell "16" [ref=e1372]
                - row [ref=e1376]:
                  - rowheader "周二" [ref=e1377]
                  - cell "15" [ref=e1378]
                  - cell "12" [ref=e1382]
                  - cell "9" [ref=e1386]
                  - cell "6" [ref=e1390]
                  - cell "3" [ref=e1394]
                  - cell "0" [ref=e1398]
                  - cell "18" [ref=e1402]
                  - cell "15" [ref=e1406]
                  - cell "12" [ref=e1410]
                  - cell "9" [ref=e1414]
                  - cell "6" [ref=e1418]
                  - cell "3" [ref=e1422]
                  - cell "0" [ref=e1426]
                  - cell "18" [ref=e1430]
                  - cell "15" [ref=e1434]
                  - cell "12" [ref=e1438]
                  - cell "9" [ref=e1442]
                  - cell "6" [ref=e1446]
                  - cell "3" [ref=e1450]
                  - cell "0" [ref=e1454]
                  - cell "18" [ref=e1458]
                  - cell "15" [ref=e1462]
                  - cell "12" [ref=e1466]
                  - cell "9" [ref=e1470]
                - row [ref=e1474]:
                  - rowheader "周一" [ref=e1475]
                  - cell "8" [ref=e1476]
                  - cell "5" [ref=e1480]
                  - cell "2" [ref=e1484]
                  - cell "20" [ref=e1488]
                  - cell "17" [ref=e1492]
                  - cell "14" [ref=e1496]
                  - cell "11" [ref=e1500]
                  - cell "8" [ref=e1504]
                  - cell "5" [ref=e1508]
                  - cell "2" [ref=e1512]
                  - cell "20" [ref=e1516]
                  - cell "17" [ref=e1520]
                  - cell "14" [ref=e1524]
                  - cell "11" [ref=e1528]
                  - cell "8" [ref=e1532]
                  - cell "5" [ref=e1536]
                  - cell "2" [ref=e1540]
                  - cell "20" [ref=e1544]
                  - cell "17" [ref=e1548]
                  - cell "14" [ref=e1552]
                  - cell "11" [ref=e1556]
                  - cell "8" [ref=e1560]
                  - cell "5" [ref=e1564]
                  - cell "2" [ref=e1568]
          - list "每周学习时段 · 次数图例" [ref=e1572]:
            - listitem [ref=e1573]:
              - generic [ref=e1574]: "0"
            - listitem [ref=e1577]:
              - generic [ref=e1578]: "20"
        - paragraph [ref=e1581]: 按星期与小时比较学习次数，0 也是有效观测。
      - region "课程与培养方案版本 · 开课学期" [ref=e1582]:
        - generic [ref=e1583]:
          - region "课程与培养方案版本 · 开课学期，可横向滚动" [ref=e1584]:
            - table [ref=e1585]:
              - caption [ref=e1586]: 课程与培养方案版本 · 开课学期
              - rowgroup [ref=e1587]:
                - row [ref=e1588]:
                  - columnheader "课程" [ref=e1589]
                  - columnheader "2025 版" [ref=e1590]
                  - columnheader "2024 版" [ref=e1591]
                  - columnheader "2023 版" [ref=e1592]
                  - columnheader "2022 版" [ref=e1593]
              - rowgroup [ref=e1594]:
                - row [ref=e1595]:
                  - rowheader "数据结构" [ref=e1596]
                  - cell "2" [ref=e1597]
                  - cell "1" [ref=e1601]
                  - cell "8" [ref=e1605]
                  - cell "7" [ref=e1609]
                - row [ref=e1613]:
                  - rowheader "程序设计基础" [ref=e1614]
                  - cell "1" [ref=e1615]
                  - cell "8" [ref=e1619]
                  - cell "7" [ref=e1623]
                  - cell "6" [ref=e1627]
                - row [ref=e1631]:
                  - rowheader "大学物理" [ref=e1632]
                  - cell "8" [ref=e1633]
                  - cell "7" [ref=e1637]
                  - cell "6" [ref=e1641]
                  - cell "5" [ref=e1645]
                - row [ref=e1649]:
                  - rowheader "概率论与数理统计" [ref=e1650]
                  - cell "7" [ref=e1651]
                  - cell "6" [ref=e1655]
                  - cell "无该课程" [ref=e1659]:
                    - generic [ref=e1660]: —
                  - cell "4" [ref=e1662]
                - row [ref=e1666]:
                  - rowheader "线性代数" [ref=e1667]
                  - cell "6" [ref=e1668]
                  - cell "5" [ref=e1672]
                  - cell "4" [ref=e1676]
                  - cell "3" [ref=e1680]
                - row [ref=e1684]:
                  - rowheader "高等数学" [ref=e1685]
                  - cell "5" [ref=e1686]
                  - cell "未设学期" [ref=e1690]
                  - cell "3" [ref=e1693]
                  - cell "2" [ref=e1697]
          - list "课程与培养方案版本 · 开课学期图例" [ref=e1701]:
            - listitem [ref=e1702]:
              - generic [ref=e1703]: "1"
            - listitem [ref=e1706]:
              - generic [ref=e1707]: "8"
        - paragraph [ref=e1710]: 学期按 1—8 排列；未设学期与无该课程分别记录。
      - region "课程相似度" [ref=e1711]:
        - generic [ref=e1712]:
          - region "课程相似度，可横向滚动" [ref=e1713]:
            - table [ref=e1714]:
              - caption [ref=e1715]: 课程相似度
              - rowgroup [ref=e1716]:
                - row [ref=e1717]:
                  - columnheader "课程" [ref=e1718]
                  - columnheader "数据结构" [ref=e1719]
                  - columnheader "程序设计基础" [ref=e1720]
                  - columnheader "大学物理" [ref=e1721]
                  - columnheader "概率论与数理统计" [ref=e1722]
                  - columnheader "线性代数" [ref=e1723]
                  - columnheader "高等数学" [ref=e1724]
              - rowgroup [ref=e1725]:
                - row [ref=e1726]:
                  - rowheader "数据结构" [ref=e1727]
                  - cell "70%" [ref=e1728]
                  - cell "40%" [ref=e1732]
                  - cell "10%" [ref=e1736]
                  - cell "90%" [ref=e1740]
                  - cell "60%" [ref=e1744]
                  - cell "30%" [ref=e1748]
                - row [ref=e1752]:
                  - rowheader "程序设计基础" [ref=e1753]
                  - cell "0%" [ref=e1754]
                  - cell "80%" [ref=e1758]
                  - cell "50%" [ref=e1762]
                  - cell "20%" [ref=e1766]
                  - cell "100%" [ref=e1770]
                  - cell "70%" [ref=e1774]
                - row [ref=e1778]:
                  - rowheader "大学物理" [ref=e1779]
                  - cell "40%" [ref=e1780]
                  - cell "10%" [ref=e1784]
                  - cell "缺测" [ref=e1788]
                  - cell "60%" [ref=e1791]
                  - cell "30%" [ref=e1795]
                  - cell "0%" [ref=e1799]
                - row [ref=e1803]:
                  - rowheader "概率论与数理统计" [ref=e1804]
                  - cell "80%" [ref=e1805]
                  - cell "50%" [ref=e1809]
                  - cell "20%" [ref=e1813]
                  - cell "100%" [ref=e1817]
                  - cell "70%" [ref=e1821]
                  - cell "40%" [ref=e1825]
                - row [ref=e1829]:
                  - rowheader "线性代数" [ref=e1830]
                  - cell "10%" [ref=e1831]
                  - cell "90%" [ref=e1835]
                  - cell "60%" [ref=e1839]
                  - cell "30%" [ref=e1843]
                  - cell "0%" [ref=e1847]
                  - cell "80%" [ref=e1851]
                - row [ref=e1855]:
                  - rowheader "高等数学" [ref=e1856]
                  - cell "50%" [ref=e1857]
                  - cell "20%" [ref=e1861]
                  - cell "100%" [ref=e1865]
                  - cell "70%" [ref=e1869]
                  - cell "40%" [ref=e1873]
                  - cell "缺测" [ref=e1877]
          - list "课程相似度图例" [ref=e1880]:
            - listitem [ref=e1881]:
              - generic [ref=e1882]: 0%
            - listitem [ref=e1885]:
              - generic [ref=e1886]: 100%
        - paragraph [ref=e1889]: 同一课程对应两轴；方向不同的读数分别保留，缺测位置留空。
      - region "课程类别与学院 · 课程数" [ref=e1890]:
        - generic [ref=e1891]:
          - region "课程类别与学院 · 课程数，可横向滚动" [ref=e1892]:
            - table [ref=e1893]:
              - caption [ref=e1894]: 课程类别与学院 · 课程数
              - rowgroup [ref=e1895]:
                - row [ref=e1896]:
                  - columnheader "课程类别" [ref=e1897]
                  - columnheader "教育学院" [ref=e1898]
                  - columnheader "外国语学院" [ref=e1899]
                  - columnheader "理学院" [ref=e1900]
                  - columnheader "人文学院" [ref=e1901]
                  - columnheader "经济管理学院" [ref=e1902]
                  - columnheader "计算机学院" [ref=e1903]
              - rowgroup [ref=e1904]:
                - row [ref=e1905]:
                  - rowheader "创新课程" [ref=e1906]
                  - cell "93" [ref=e1907]:
                    - img [ref=e1909]:
                      - generic [ref=e1911]: "93"
                  - cell "86" [ref=e1913]:
                    - img [ref=e1915]:
                      - generic [ref=e1917]: "86"
                  - cell "79" [ref=e1919]:
                    - img [ref=e1921]:
                      - generic [ref=e1923]: "79"
                  - cell "72" [ref=e1926]:
                    - img [ref=e1928]:
                      - generic [ref=e1930]: "72"
                  - cell "65" [ref=e1932]:
                    - img [ref=e1934]:
                      - generic [ref=e1936]: "65"
                  - cell "58" [ref=e1938]:
                    - img [ref=e1940]:
                      - generic [ref=e1942]: "58"
                - row [ref=e1944]:
                  - rowheader "实践课程" [ref=e1945]
                  - cell "82" [ref=e1946]:
                    - img [ref=e1948]:
                      - generic [ref=e1950]: "82"
                  - cell "75" [ref=e1953]:
                    - img [ref=e1955]:
                      - generic [ref=e1957]: "75"
                  - cell "68" [ref=e1960]:
                    - img [ref=e1962]:
                      - generic [ref=e1964]: "68"
                  - cell "61" [ref=e1966]:
                    - img [ref=e1968]:
                      - generic [ref=e1970]: "61"
                  - cell "54" [ref=e1972]
                  - cell "47" [ref=e1976]
                - row [ref=e1980]:
                  - rowheader "专业选修" [ref=e1981]
                  - cell "71" [ref=e1982]:
                    - img [ref=e1984]:
                      - generic [ref=e1986]: "71"
                  - cell "64" [ref=e1988]:
                    - img [ref=e1990]:
                      - generic [ref=e1992]: "64"
                  - cell "57" [ref=e1994]:
                    - img [ref=e1996]:
                      - generic [ref=e1998]: "57"
                  - cell "50" [ref=e2000]
                  - cell "43" [ref=e2004]
                  - cell "36" [ref=e2008]
                - row [ref=e2012]:
                  - rowheader "专业必修" [ref=e2013]
                  - cell "60" [ref=e2014]:
                    - img [ref=e2016]:
                      - generic [ref=e2018]: "60"
                  - cell "53" [ref=e2020]
                  - cell "46" [ref=e2024]
                  - cell "39" [ref=e2028]
                  - cell "32" [ref=e2032]
                  - cell "25" [ref=e2036]
                - row [ref=e2040]:
                  - rowheader "学科基础" [ref=e2041]
                  - cell "49" [ref=e2042]
                  - cell "42" [ref=e2046]
                  - cell "35" [ref=e2050]
                  - cell "28" [ref=e2054]
                  - cell "21" [ref=e2058]
                  - cell "14" [ref=e2062]
                - row [ref=e2066]:
                  - rowheader "通识课程" [ref=e2067]
                  - cell "38" [ref=e2068]
                  - cell "31" [ref=e2072]
                  - cell "24" [ref=e2076]
                  - cell "17" [ref=e2080]
                  - cell "10" [ref=e2084]
                  - cell "3" [ref=e2088]
          - list "课程类别与学院 · 课程数图例" [ref=e2092]:
            - listitem [ref=e2093]:
              - generic [ref=e2094]: "25"
            - listitem [ref=e2098]:
              - generic [ref=e2099]: "50"
            - listitem [ref=e2103]:
              - generic [ref=e2104]: "100"
        - paragraph [ref=e2108]: 圆面积表示数量，每个位置同时保留精确课程数。
      - region "课程支撑关系" [ref=e2109]:
        - generic [ref=e2110]:
          - region "课程支撑关系，可横向滚动" [ref=e2111]:
            - table [ref=e2112]:
              - caption [ref=e2113]: 课程支撑关系
              - rowgroup [ref=e2114]:
                - row [ref=e2115]:
                  - columnheader "课程" [ref=e2116]
                  - columnheader "创新与反思" [ref=e2117]
                  - columnheader "协作与实践" [ref=e2118]
                  - columnheader "分析与表达" [ref=e2119]
                  - columnheader "知识与能力" [ref=e2120]
              - rowgroup [ref=e2121]:
                - row [ref=e2122]:
                  - rowheader "数据结构" [ref=e2123]
                  - cell "无直接支撑" [ref=e2124]
                  - cell "核心支撑" [ref=e2128]
                  - cell "一般支撑" [ref=e2132]
                  - cell "无直接支撑" [ref=e2136]
                - row [ref=e2140]:
                  - rowheader "程序设计基础" [ref=e2141]
                  - cell "核心支撑" [ref=e2142]
                  - cell "一般支撑" [ref=e2146]
                  - cell "无直接支撑" [ref=e2150]
                  - cell "核心支撑" [ref=e2154]
                - row [ref=e2158]:
                  - rowheader "大学物理" [ref=e2159]
                  - cell "一般支撑" [ref=e2160]
                  - cell "无直接支撑" [ref=e2164]
                  - cell "核心支撑" [ref=e2168]
                  - cell "一般支撑" [ref=e2172]
                - row [ref=e2176]:
                  - rowheader "概率论与数理统计" [ref=e2177]
                  - cell "无直接支撑" [ref=e2178]
                  - cell "核心支撑" [ref=e2182]
                  - cell "一般支撑" [ref=e2186]
                  - cell "无直接支撑" [ref=e2190]
                - row [ref=e2194]:
                  - rowheader "线性代数" [ref=e2195]
                  - cell "核心支撑" [ref=e2196]
                  - cell "一般支撑" [ref=e2200]
                  - cell "无直接支撑" [ref=e2204]
                  - cell "核心支撑" [ref=e2208]
                - row [ref=e2212]:
                  - rowheader "高等数学" [ref=e2213]
                  - cell "一般支撑" [ref=e2214]
                  - cell "无直接支撑" [ref=e2218]
                  - cell "核心支撑" [ref=e2222]
                  - cell "一般支撑" [ref=e2226]
          - list "课程支撑关系图例" [ref=e2230]:
            - listitem [ref=e2231]:
              - generic [ref=e2232]: 无直接支撑
            - listitem [ref=e2236]:
              - generic [ref=e2237]: 一般支撑
            - listitem [ref=e2241]:
              - generic [ref=e2242]: 核心支撑
        - paragraph [ref=e2246]: 支撑关系只有无直接支撑、一般支撑和核心支撑三个等级。
  - group [ref=e2247]:
    - generic "条形与嵌入组合源码" [ref=e2248] [cursor=pointer]
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
  90  |   expect(new Set(radii).size).toBe(1);
  91  |   await record("legends", { backgrounds, gradientFacts, quantityFacts, levelRadii: radii });
  92  | });
  93  | 
  94  | test("adjacent cells reuse one tooltip and keyboard arrows inspect matching row and column", async ({ page }) => {
  95  |   await open(page);
  96  |   const chart = matrix(page, "course-count");
  97  |   const first = cell(chart, "category-2", "college-2");
  98  |   const next = cell(chart, "category-2", "college-3");
  99  |   await first.hover();
  100 |   const tooltip = page.locator(".rain-matrix__tooltip");
  101 |   await expect(tooltip).toHaveCount(1);
  102 |   await expect(tooltip).toBeVisible();
  103 |   await expect(tooltip).toContainText("18");
  104 |   await tooltip.evaluate(node => node.setAttribute("data-test-same-tooltip", "true"));
  105 |   await next.hover();
  106 |   await expect(tooltip).toHaveAttribute("data-test-same-tooltip", "true");
  107 |   await expect(tooltip).toContainText("25");
  108 |   await expect(next).toHaveAttribute("data-active", "true");
  109 |   await chart.locator('[data-slot="scroll-container"]').focus();
  110 |   await expect(cell(chart, "category-1", "college-1")).toHaveAttribute("data-active", "true");
  111 |   await page.keyboard.press("ArrowDown");
  112 |   await page.keyboard.press("ArrowRight");
  113 |   await expect(first).toHaveAttribute("data-active", "true");
  114 |   await page.keyboard.press("ArrowRight");
  115 |   await expect(next).toHaveAttribute("data-active", "true");
  116 |   await expect(chart.locator('[data-slot="scroll-container"]')).toBeFocused();
  117 |   await expect(tooltip).toContainText("人文学院");
  118 |   await expect(tooltip).toContainText("学科基础");
  119 |   await page.keyboard.press("ArrowDown");
  120 |   const below = cell(chart, "category-3", "college-3");
  121 |   await expect(below).toHaveAttribute("data-active", "true");
  122 |   await expect(tooltip).toContainText("36");
  123 |   await record("inspection", { sharedTooltipNode: true, horizontalAndVerticalKeyboardNavigation: true });
  124 | });
  125 | 
  126 | test("offscreen entry starts when viewed and includes intermediate bubble geometry", async ({ page }) => {
  127 |   await open(page, false);
  128 |   const chart = matrix(page, "course-count");
  129 |   const target = cell(chart, "category-6", "college-6").locator("circle").first();
  130 |   expect(await chart.evaluate(node => node.getBoundingClientRect().top)).toBeGreaterThan(1000);
  131 |   await page.waitForTimeout(1800);
  132 |   await chart.scrollIntoViewIfNeeded();
  133 |   const samples = await target.evaluate(async node => {
  134 |     const circle = node as SVGCircleElement;
  135 |     const frames: { time: number; width: number; opacity: number }[] = [];
  136 |     const start = performance.now();
  137 |     await new Promise<void>(resolve => {
  138 |       const sample = (now: number) => {
  139 |         const parent = circle.closest('[data-slot="mark-container"]')!;
  140 |         frames.push({ time: now - start, width: circle.getBoundingClientRect().width, opacity: Number(getComputedStyle(parent).opacity) });
  141 |         if (now - start < 1800) requestAnimationFrame(sample); else resolve();
  142 |       };
  143 |       requestAnimationFrame(sample);
  144 |     });
  145 |     return frames;
  146 |   });
  147 |   const final = samples.at(-1)!;
  148 |   expect(final.width).toBeGreaterThan(0);
  149 |   expect(final.opacity).toBeCloseTo(1, 2);
  150 |   expect(samples.some(frame => frame.width > 0 && frame.width < final.width - .1 || frame.opacity > 0 && frame.opacity < .99)).toBe(true);
  151 |   await record("viewport-entry", { samples, intermediateFrame: true });
  152 | });
  153 | 
  154 | test("updates and sorting retain coordinate nodes and animate through intermediate geometry", async ({ page }) => {
  155 |   await open(page, false);
  156 |   const chart = matrix(page, "course-count");
  157 |   const target = cell(chart, "category-4", "college-4");
  158 |   await chart.scrollIntoViewIfNeeded();
  159 |   await page.waitForTimeout(1800);
  160 |   await target.evaluate(node => node.setAttribute("data-test-stable-coordinate", "true"));
  161 |   const circle = target.locator("circle").first();
  162 |   const before = await circle.evaluate(node => node.getBoundingClientRect().width);
  163 |   await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  164 |   const updateFrames = await circle.evaluate(async node => {
  165 |     const widths: number[] = [], start = performance.now();
  166 |     await new Promise<void>(resolve => {
  167 |       const frame = (now: number) => { widths.push(node.getBoundingClientRect().width); if (now - start < 1100) requestAnimationFrame(frame); else resolve(); };
  168 |       requestAnimationFrame(frame);
  169 |     });
  170 |     return widths;
  171 |   });
  172 |   const after = updateFrames.at(-1)!;
  173 |   expect(after).toBeGreaterThan(before);
  174 |   expect(updateFrames.some(width => width > before + .01 && width < after - .01)).toBe(true);
  175 |   await expect(target).toHaveAttribute("data-test-stable-coordinate", "true");
  176 |   const original = await circle.evaluate(node => { const box = node.getBoundingClientRect(), chart = node.closest('[data-rain-id="ui-chart-matrix"]')!.getBoundingClientRect(); return { x: box.x + box.width / 2 - chart.x, y: box.y + box.height / 2 - chart.y }; });
  177 |   await page.getByRole("button", { name: "按数量排序" }).evaluate(node => (node as HTMLButtonElement).click());
  178 |   const sortFrames = await circle.evaluate(async node => {
  179 |     const positions: { x: number; y: number }[] = [], start = performance.now();
  180 |     await new Promise<void>(resolve => {
  181 |       const frame = (now: number) => { const box = node.getBoundingClientRect(), chart = node.closest('[data-rain-id="ui-chart-matrix"]')!.getBoundingClientRect(); positions.push({ x: box.x + box.width / 2 - chart.x, y: box.y + box.height / 2 - chart.y }); if (now - start < 1100) requestAnimationFrame(frame); else resolve(); };
  182 |       requestAnimationFrame(frame);
  183 |     });
  184 |     return positions;
  185 |   });
  186 |   const end = sortFrames.at(-1)!;
  187 |   const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
  188 |   expect(distance(original, end)).toBeGreaterThan(5);
  189 |   const totalDistance = distance(original, end);
> 190 |   expect(sortFrames.some(position => distance(position, original) > totalDistance * .1 && distance(position, end) > totalDistance * .1)).toBe(true);
      |                                                                                                                                          ^ Error: expect(received).toBe(expected) // Object.is equality
  191 |   await expect(target).toHaveAttribute("data-test-stable-coordinate", "true");
  192 |   await record("update-sort", { before, after, updateFrames, original, sortFrames, end, retainedCoordinate: true });
  193 | });
  194 | 
  195 | test("reduced motion exposes final values immediately without hidden readouts after update", async ({ page }) => {
  196 |   await open(page);
  197 |   const chart = matrix(page, "course-count");
  198 |   await chart.scrollIntoViewIfNeeded();
  199 |   const target = cell(chart, "category-6", "college-6");
  200 |   const circle = target.locator("circle").first();
  201 |   const first = await circle.evaluate(node => node.getBoundingClientRect().width);
  202 |   await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  203 |   await expect(target).toHaveAttribute("aria-label", "93");
  204 |   const immediate = await circle.evaluate(node => node.getBoundingClientRect().width);
  205 |   expect(immediate).toBeGreaterThan(first);
  206 |   await page.waitForTimeout(60);
  207 |   expect(await circle.evaluate(node => node.getBoundingClientRect().width)).toBeCloseTo(immediate, 2);
  208 |   expect(await target.locator('text[data-slot="reading"]').evaluate(node => getComputedStyle(node).visibility)).toBe("visible");
  209 |   expect(await target.locator('[data-slot="mark-container"]').evaluate(node => Number(getComputedStyle(node).opacity))).toBe(1);
  210 |   await record("reduced-motion", { first, immediate, readoutVisible: true });
  211 | });
  212 | 
```