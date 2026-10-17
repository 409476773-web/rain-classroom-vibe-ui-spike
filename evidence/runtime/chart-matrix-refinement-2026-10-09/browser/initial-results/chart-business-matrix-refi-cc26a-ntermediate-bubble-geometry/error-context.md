# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-matrix-refinement.spec.ts >> offscreen entry starts when viewed and includes intermediate bubble geometry
- Location: tests/e2e/chart-business-matrix-refinement.spec.ts:122:1

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
    - button "按数量排序" [ref=e20] [cursor=pointer]
    - button "只看50人以上" [ref=e22] [cursor=pointer]
    - button "40行场景" [ref=e24] [cursor=pointer]
  - status [ref=e26]: 示例数据 · 更新 0 次
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
        - list [ref=e49]:
          - listitem [ref=e50]:
            - generic [ref=e51]: 计算机学院
            - generic [ref=e54]: 25 人
          - listitem [ref=e55]:
            - generic [ref=e56]: 经济管理学院
            - generic [ref=e59]: 50 人
          - listitem [ref=e60]:
            - generic [ref=e61]: 人文学院
            - generic [ref=e64]: 100 人
          - listitem [ref=e65]:
            - generic [ref=e66]: 理学院
            - generic [ref=e69]: 75 人
          - listitem [ref=e70]:
            - generic [ref=e71]: 外国语学院
            - generic [ref=e74]: 45 人
    - generic [ref=e75]:
      - heading "分组比较与互斥堆叠" [level=2] [ref=e76]
      - generic [ref=e77]:
        - figure "本期与上期参与人数" [ref=e78]:
          - generic [ref=e81]:
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
          - paragraph [ref=e109]:
            - generic [ref=e110]: 本期
            - generic [ref=e112]: 上期
          - group [ref=e114]:
            - generic "查看分项读数" [ref=e115]
        - figure "互斥课程构成" [ref=e116]:
          - generic [ref=e119]:
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
        - figure "数量条 · 紧凑 本期人数 · 25 人" [ref=e179]:
          - generic [ref=e185]:
            - strong [ref=e186]: 数量条 · 紧凑
            - generic [ref=e187]: 本期人数 · 25 人
        - figure "数量条 · 舒展 本期人数 · 25 人" [ref=e188]:
          - generic [ref=e194]:
            - strong [ref=e195]: 数量条 · 舒展
            - generic [ref=e196]: 本期人数 · 25 人
        - figure "构成分段 · 紧凑 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e197]:
          - generic [ref=e217]:
            - strong [ref=e218]: 构成分段 · 紧凑
            - list [ref=e219]:
              - listitem [ref=e220]:
                - text: 已完成
                - generic [ref=e222]: 13 人
              - listitem [ref=e223]:
                - text: 进行中
                - generic [ref=e225]: 8 人
              - listitem [ref=e226]:
                - text: 待开始
                - generic [ref=e228]: 4 人
        - figure "构成分段 · 舒展 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e229]:
          - generic [ref=e249]:
            - strong [ref=e250]: 构成分段 · 舒展
            - list [ref=e251]:
              - listitem [ref=e252]:
                - text: 已完成
                - generic [ref=e254]: 13 人
              - listitem [ref=e255]:
                - text: 进行中
                - generic [ref=e257]: 8 人
              - listitem [ref=e258]:
                - text: 待开始
                - generic [ref=e260]: 4 人
        - figure "每日柱图 · 紧凑 近8天每日人数 · 共同上限 88 人" [ref=e261]:
          - generic [ref=e289]:
            - strong [ref=e290]: 每日柱图 · 紧凑
            - generic [ref=e291]: 近8天每日人数 · 共同上限 88 人
        - figure "每日柱图 · 舒展 近8天每日人数 · 共同上限 88 人" [ref=e292]:
          - generic [ref=e320]:
            - strong [ref=e321]: 每日柱图 · 舒展
            - generic [ref=e322]: 近8天每日人数 · 共同上限 88 人
        - figure "小饼 · 紧凑 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e323]:
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
                - generic [ref=e343]: 13 人
              - listitem [ref=e344]:
                - text: 进行中
                - generic [ref=e346]: 8 人
              - listitem [ref=e347]:
                - text: 待开始
                - generic [ref=e349]: 4 人
        - figure "小饼 · 舒展 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e350]:
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
                - generic [ref=e370]: 13 人
              - listitem [ref=e371]:
                - text: 进行中
                - generic [ref=e373]: 8 人
              - listitem [ref=e374]:
                - text: 待开始
                - generic [ref=e376]: 4 人
        - figure "环饼 · 紧凑 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e377]:
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
                - generic [ref=e397]: 13 人
              - listitem [ref=e398]:
                - text: 进行中
                - generic [ref=e400]: 8 人
              - listitem [ref=e401]:
                - text: 待开始
                - generic [ref=e403]: 4 人
        - figure "环饼 · 舒展 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e404]:
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
                - generic [ref=e424]: 13 人
              - listitem [ref=e425]:
                - text: 进行中
                - generic [ref=e427]: 8 人
              - listitem [ref=e428]:
                - text: 待开始
                - generic [ref=e430]: 4 人
        - figure "完成环 · 紧凑 完成 20 人 · 目标 100 人 · 20%" [ref=e431]:
          - img [ref=e438]:
            - generic [ref=e440] [cursor=pointer]
          - generic [ref=e443]:
            - strong [ref=e444]: 完成环 · 紧凑
            - generic [ref=e445]: 完成 20 人 · 目标 100 人 · 20%
        - figure "完成环 · 舒展 完成 20 人 · 目标 100 人" [ref=e446]:
          - generic [ref=e448]:
            - img [ref=e453]:
              - generic [ref=e455] [cursor=pointer]
            - generic:
              - strong: 20%
              - generic: 完成率
          - generic [ref=e458]:
            - strong [ref=e459]: 完成环 · 舒展
            - generic [ref=e460]: 完成 20 人 · 目标 100 人
        - figure "完成弧 · 紧凑 完成 20 人 · 目标 100 人 · 20%" [ref=e461]:
          - img [ref=e468]:
            - generic [ref=e470] [cursor=pointer]
          - generic [ref=e473]:
            - strong [ref=e474]: 完成弧 · 紧凑
            - generic [ref=e475]: 完成 20 人 · 目标 100 人 · 20%
        - figure "完成弧 · 舒展 完成 20 人 · 目标 100 人" [ref=e476]:
          - generic [ref=e478]:
            - img [ref=e483]:
              - generic [ref=e485] [cursor=pointer]
            - generic:
              - strong: 20%
              - generic: 完成率
          - generic [ref=e488]:
            - strong [ref=e489]: 完成弧 · 舒展
            - generic [ref=e490]: 完成 20 人 · 目标 100 人
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
            - generic [ref=e564]: 25 人
            - paragraph [ref=e578]: 近8天每日人数 · 趋势按自身范围展开
        - article [ref=e579]:
          - heading "课程构成" [level=3] [ref=e581]
          - generic [ref=e582]:
            - generic [ref=e583]:
              - generic [ref=e584]: 25 门
              - img [ref=e590]:
                - generic [ref=e591]:
                  - generic [ref=e592] [cursor=pointer]
                  - generic [ref=e594] [cursor=pointer]
                  - generic [ref=e596] [cursor=pointer]
            - generic [ref=e598]:
              - generic [ref=e599]:
                - text: 已完成
                - generic [ref=e601]: "13"
              - generic [ref=e602]:
                - text: 进行中
                - generic [ref=e604]: "8"
              - generic [ref=e605]:
                - text: 待开始
                - generic [ref=e607]: "4"
        - article [ref=e608]:
          - heading "目标完成" [level=3] [ref=e610]
          - generic [ref=e611]:
            - generic [ref=e612]:
              - generic [ref=e613]:
                - img [ref=e618]:
                  - generic [ref=e620] [cursor=pointer]
                - generic:
                  - strong: 20%
                  - generic: 完成率
              - generic [ref=e623]: 已完成 20 项
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
                - button "计算机学院" [ref=e641] [cursor=pointer]
              - cell "25 人" [ref=e643]
              - cell [ref=e648]
              - cell [ref=e651]
              - cell "共 25 门" [ref=e654]:
                - generic "已完成 13 / 进行中 8 / 待开始 4" [ref=e655]: 共 25 门
              - cell "20%" [ref=e659]
            - row [ref=e664]:
              - cell [ref=e665]:
                - button "经济管理学院" [ref=e666] [cursor=pointer]
              - cell "50 人" [ref=e668]
              - cell [ref=e673]
              - cell [ref=e676]
              - cell "共 50 门" [ref=e679]:
                - generic "已完成 25 / 进行中 15 / 待开始 10" [ref=e680]: 共 50 门
              - cell "35%" [ref=e684]
            - row [ref=e689]:
              - cell [ref=e690]:
                - button "人文学院" [ref=e691] [cursor=pointer]
              - cell "100 人" [ref=e693]
              - cell [ref=e698]
              - cell [ref=e701]
              - cell "共 100 门" [ref=e704]:
                - generic "已完成 50 / 进行中 30 / 待开始 20" [ref=e705]: 共 100 门
              - cell "50%" [ref=e709]
            - row [ref=e714]:
              - cell [ref=e715]:
                - button "理学院" [ref=e716] [cursor=pointer]
              - cell "75 人" [ref=e718]
              - cell [ref=e723]
              - cell [ref=e726]
              - cell "共 75 门" [ref=e729]:
                - generic "已完成 38 / 进行中 23 / 待开始 14" [ref=e730]: 共 75 门
              - cell "65%" [ref=e734]
            - row [ref=e739]:
              - cell [ref=e740]:
                - button "外国语学院" [ref=e741] [cursor=pointer]
              - cell "45 人" [ref=e743]
              - cell [ref=e748]
              - cell [ref=e751]
              - cell "共 45 门" [ref=e754]:
                - generic "已完成 23 / 进行中 14 / 待开始 8" [ref=e755]: 共 45 门
              - cell "80%" [ref=e759]
    - region [ref=e764]:
      - heading "课程列表：读数就近成组" [level=2] [ref=e765]
      - list [ref=e766]:
        - listitem [ref=e767]:
          - strong [ref=e769]: 计算机学院 · 教学任务
          - generic [ref=e770]: 评分 2.5 / 10
          - generic [ref=e774]:
            - img [ref=e780]:
              - generic [ref=e782] [cursor=pointer]
            - generic [ref=e785]:
              - generic [ref=e786]: 20%
              - generic [ref=e787]: 已完成 20 / 100 项
        - listitem [ref=e788]:
          - strong [ref=e790]: 经济管理学院 · 教学任务
          - generic [ref=e791]: 评分 5.0 / 10
          - generic [ref=e795]:
            - img [ref=e801]:
              - generic [ref=e803] [cursor=pointer]
            - generic [ref=e806]:
              - generic [ref=e807]: 35%
              - generic [ref=e808]: 已完成 35 / 100 项
        - listitem [ref=e809]:
          - strong [ref=e811]: 人文学院 · 教学任务
          - generic [ref=e812]: 评分 10.0 / 10
          - generic [ref=e816]:
            - img [ref=e822]:
              - generic [ref=e824] [cursor=pointer]
            - generic [ref=e827]:
              - generic [ref=e828]: 50%
              - generic [ref=e829]: 已完成 50 / 100 项
      - generic [ref=e830]:
        - generic [ref=e831]:
          - img [ref=e836]:
            - generic [ref=e838] [cursor=pointer]
          - generic:
            - strong: 20%
            - generic: 完成率
        - generic [ref=e841]:
          - strong [ref=e842]: 计算机学院 · 本期教学任务
          - paragraph [ref=e843]: 已完成 20 / 100 项
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
                  - columnheader "00:00" [ref=e862]
                  - columnheader "01:00" [ref=e863]
                  - columnheader "02:00" [ref=e864]
                  - columnheader "03:00" [ref=e865]
                  - columnheader "04:00" [ref=e866]
                  - columnheader "05:00" [ref=e867]
                  - columnheader "06:00" [ref=e868]
                  - columnheader "07:00" [ref=e869]
                  - columnheader "08:00" [ref=e870]
                  - columnheader "09:00" [ref=e871]
                  - columnheader "10:00" [ref=e872]
                  - columnheader "11:00" [ref=e873]
                  - columnheader "12:00" [ref=e874]
                  - columnheader "13:00" [ref=e875]
                  - columnheader "14:00" [ref=e876]
                  - columnheader "15:00" [ref=e877]
                  - columnheader "16:00" [ref=e878]
                  - columnheader "17:00" [ref=e879]
                  - columnheader "18:00" [ref=e880]
                  - columnheader "19:00" [ref=e881]
                  - columnheader "20:00" [ref=e882]
                  - columnheader "21:00" [ref=e883]
                  - columnheader "22:00" [ref=e884]
                  - columnheader "23:00" [ref=e885]
              - rowgroup [ref=e886]:
                - row [ref=e887]:
                  - rowheader "周一" [ref=e888]
                  - cell "0" [ref=e889]
                  - cell "3" [ref=e893]
                  - cell "6" [ref=e897]
                  - cell "9" [ref=e901]
                  - cell "12" [ref=e905]
                  - cell "15" [ref=e909]
                  - cell "18" [ref=e913]
                  - cell "0" [ref=e917]
                  - cell "3" [ref=e921]
                  - cell "6" [ref=e925]
                  - cell "9" [ref=e929]
                  - cell "12" [ref=e933]
                  - cell "15" [ref=e937]
                  - cell "18" [ref=e941]
                  - cell "0" [ref=e945]
                  - cell "3" [ref=e949]
                  - cell "6" [ref=e953]
                  - cell "9" [ref=e957]
                  - cell "12" [ref=e961]
                  - cell "15" [ref=e965]
                  - cell "18" [ref=e969]
                  - cell "0" [ref=e973]
                  - cell "3" [ref=e977]
                  - cell "6" [ref=e981]
                - row [ref=e985]:
                  - rowheader "周二" [ref=e986]
                  - cell "7" [ref=e987]
                  - cell "10" [ref=e991]
                  - cell "13" [ref=e995]
                  - cell "16" [ref=e999]
                  - cell "19" [ref=e1003]
                  - cell "1" [ref=e1007]
                  - cell "4" [ref=e1011]
                  - cell "7" [ref=e1015]
                  - cell "10" [ref=e1019]
                  - cell "13" [ref=e1023]
                  - cell "16" [ref=e1027]
                  - cell "19" [ref=e1031]
                  - cell "1" [ref=e1035]
                  - cell "4" [ref=e1039]
                  - cell "7" [ref=e1043]
                  - cell "10" [ref=e1047]
                  - cell "13" [ref=e1051]
                  - cell "16" [ref=e1055]
                  - cell "19" [ref=e1059]
                  - cell "1" [ref=e1063]
                  - cell "4" [ref=e1067]
                  - cell "7" [ref=e1071]
                  - cell "10" [ref=e1075]
                  - cell "13" [ref=e1079]
                - row [ref=e1083]:
                  - rowheader "周三" [ref=e1084]
                  - cell "14" [ref=e1085]
                  - cell "17" [ref=e1089]
                  - cell "20" [ref=e1093]
                  - cell "2" [ref=e1097]
                  - cell "5" [ref=e1101]
                  - cell "8" [ref=e1105]
                  - cell "11" [ref=e1109]
                  - cell "14" [ref=e1113]
                  - cell "17" [ref=e1117]
                  - cell "20" [ref=e1121]
                  - cell "2" [ref=e1125]
                  - cell "5" [ref=e1129]
                  - cell "8" [ref=e1133]
                  - cell "11" [ref=e1137]
                  - cell "14" [ref=e1141]
                  - cell "17" [ref=e1145]
                  - cell "20" [ref=e1149]
                  - cell "2" [ref=e1153]
                  - cell "5" [ref=e1157]
                  - cell "8" [ref=e1161]
                  - cell "11" [ref=e1165]
                  - cell "14" [ref=e1169]
                  - cell "17" [ref=e1173]
                  - cell "20" [ref=e1177]
                - row [ref=e1181]:
                  - rowheader "周四" [ref=e1182]
                  - cell "0" [ref=e1183]
                  - cell "3" [ref=e1187]
                  - cell "6" [ref=e1191]
                  - cell "9" [ref=e1195]
                  - cell "12" [ref=e1199]
                  - cell "15" [ref=e1203]
                  - cell "18" [ref=e1207]
                  - cell "0" [ref=e1211]
                  - cell "3" [ref=e1215]
                  - cell "6" [ref=e1219]
                  - cell "9" [ref=e1223]
                  - cell "12" [ref=e1227]
                  - cell "15" [ref=e1231]
                  - cell "18" [ref=e1235]
                  - cell "0" [ref=e1239]
                  - cell "3" [ref=e1243]
                  - cell "6" [ref=e1247]
                  - cell "9" [ref=e1251]
                  - cell "12" [ref=e1255]
                  - cell "15" [ref=e1259]
                  - cell "18" [ref=e1263]
                  - cell "0" [ref=e1267]
                  - cell "3" [ref=e1271]
                  - cell "6" [ref=e1275]
                - row [ref=e1279]:
                  - rowheader "周五" [ref=e1280]
                  - cell "7" [ref=e1281]
                  - cell "10" [ref=e1285]
                  - cell "13" [ref=e1289]
                  - cell "16" [ref=e1293]
                  - cell "19" [ref=e1297]
                  - cell "1" [ref=e1301]
                  - cell "4" [ref=e1305]
                  - cell "7" [ref=e1309]
                  - cell "10" [ref=e1313]
                  - cell "13" [ref=e1317]
                  - cell "16" [ref=e1321]
                  - cell "19" [ref=e1325]
                  - cell "1" [ref=e1329]
                  - cell "4" [ref=e1333]
                  - cell "7" [ref=e1337]
                  - cell "10" [ref=e1341]
                  - cell "13" [ref=e1345]
                  - cell "16" [ref=e1349]
                  - cell "19" [ref=e1353]
                  - cell "1" [ref=e1357]
                  - cell "4" [ref=e1361]
                  - cell "7" [ref=e1365]
                  - cell "10" [ref=e1369]
                  - cell "13" [ref=e1373]
                - row [ref=e1377]:
                  - rowheader "周六" [ref=e1378]
                  - cell "14" [ref=e1379]
                  - cell "17" [ref=e1383]
                  - cell "20" [ref=e1387]
                  - cell "2" [ref=e1391]
                  - cell "5" [ref=e1395]
                  - cell "8" [ref=e1399]
                  - cell "11" [ref=e1403]
                  - cell "14" [ref=e1407]
                  - cell "17" [ref=e1411]
                  - cell "20" [ref=e1415]
                  - cell "2" [ref=e1419]
                  - cell "5" [ref=e1423]
                  - cell "8" [ref=e1427]
                  - cell "11" [ref=e1431]
                  - cell "14" [ref=e1435]
                  - cell "17" [ref=e1439]
                  - cell "20" [ref=e1443]
                  - cell "2" [ref=e1447]
                  - cell "5" [ref=e1451]
                  - cell "8" [ref=e1455]
                  - cell "11" [ref=e1459]
                  - cell "14" [ref=e1463]
                  - cell "17" [ref=e1467]
                  - cell "20" [ref=e1471]
                - row [ref=e1475]:
                  - rowheader "周日" [ref=e1476]
                  - cell "0" [ref=e1477]
                  - cell "3" [ref=e1481]
                  - cell "6" [ref=e1485]
                  - cell "9" [ref=e1489]
                  - cell "12" [ref=e1493]
                  - cell "15" [ref=e1497]
                  - cell "18" [ref=e1501]
                  - cell "0" [ref=e1505]
                  - cell "3" [ref=e1509]
                  - cell "6" [ref=e1513]
                  - cell "9" [ref=e1517]
                  - cell "12" [ref=e1521]
                  - cell "15" [ref=e1525]
                  - cell "18" [ref=e1529]
                  - cell "0" [ref=e1533]
                  - cell "3" [ref=e1537]
                  - cell "6" [ref=e1541]
                  - cell "9" [ref=e1545]
                  - cell "12" [ref=e1549]
                  - cell "15" [ref=e1553]
                  - cell "18" [ref=e1557]
                  - cell "0" [ref=e1561]
                  - cell "3" [ref=e1565]
                  - cell "缺测" [ref=e1569]
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
                  - columnheader "2022 版" [ref=e1590]
                  - columnheader "2023 版" [ref=e1591]
                  - columnheader "2024 版" [ref=e1592]
                  - columnheader "2025 版" [ref=e1593]
              - rowgroup [ref=e1594]:
                - row [ref=e1595]:
                  - rowheader "高等数学" [ref=e1596]
                  - cell "1" [ref=e1597]
                  - cell "2" [ref=e1601]
                  - cell "未设学期" [ref=e1605]
                  - cell "4" [ref=e1608]
                - row [ref=e1612]:
                  - rowheader "线性代数" [ref=e1613]
                  - cell "2" [ref=e1614]
                  - cell "3" [ref=e1618]
                  - cell "4" [ref=e1622]
                  - cell "5" [ref=e1626]
                - row [ref=e1630]:
                  - rowheader "概率论与数理统计" [ref=e1631]
                  - cell "3" [ref=e1632]
                  - cell "无该课程" [ref=e1636]:
                    - generic [ref=e1637]: —
                  - cell "5" [ref=e1639]
                  - cell "6" [ref=e1643]
                - row [ref=e1647]:
                  - rowheader "大学物理" [ref=e1648]
                  - cell "4" [ref=e1649]
                  - cell "5" [ref=e1653]
                  - cell "6" [ref=e1657]
                  - cell "7" [ref=e1661]
                - row [ref=e1665]:
                  - rowheader "程序设计基础" [ref=e1666]
                  - cell "5" [ref=e1667]
                  - cell "6" [ref=e1671]
                  - cell "7" [ref=e1675]
                  - cell "8" [ref=e1679]
                - row [ref=e1683]:
                  - rowheader "数据结构" [ref=e1684]
                  - cell "6" [ref=e1685]
                  - cell "7" [ref=e1689]
                  - cell "8" [ref=e1693]
                  - cell "1" [ref=e1697]
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
                  - columnheader "高等数学" [ref=e1719]
                  - columnheader "线性代数" [ref=e1720]
                  - columnheader "概率论与数理统计" [ref=e1721]
                  - columnheader "大学物理" [ref=e1722]
                  - columnheader "程序设计基础" [ref=e1723]
                  - columnheader "数据结构" [ref=e1724]
              - rowgroup [ref=e1725]:
                - row [ref=e1726]:
                  - rowheader "高等数学" [ref=e1727]
                  - cell "缺测" [ref=e1728]
                  - cell "30%" [ref=e1731]
                  - cell "60%" [ref=e1735]
                  - cell "90%" [ref=e1739]
                  - cell "10%" [ref=e1743]
                  - cell "40%" [ref=e1747]
                - row [ref=e1751]:
                  - rowheader "线性代数" [ref=e1752]
                  - cell "70%" [ref=e1753]
                  - cell "100%" [ref=e1757]
                  - cell "20%" [ref=e1761]
                  - cell "50%" [ref=e1765]
                  - cell "80%" [ref=e1769]
                  - cell "0%" [ref=e1773]
                - row [ref=e1777]:
                  - rowheader "概率论与数理统计" [ref=e1778]
                  - cell "30%" [ref=e1779]
                  - cell "60%" [ref=e1783]
                  - cell "90%" [ref=e1787]
                  - cell "10%" [ref=e1791]
                  - cell "40%" [ref=e1795]
                  - cell "70%" [ref=e1799]
                - row [ref=e1803]:
                  - rowheader "大学物理" [ref=e1804]
                  - cell "100%" [ref=e1805]
                  - cell "20%" [ref=e1809]
                  - cell "50%" [ref=e1813]
                  - cell "缺测" [ref=e1817]
                  - cell "0%" [ref=e1820]
                  - cell "30%" [ref=e1824]
                - row [ref=e1828]:
                  - rowheader "程序设计基础" [ref=e1829]
                  - cell "60%" [ref=e1830]
                  - cell "90%" [ref=e1834]
                  - cell "10%" [ref=e1838]
                  - cell "40%" [ref=e1842]
                  - cell "70%" [ref=e1846]
                  - cell "100%" [ref=e1850]
                - row [ref=e1854]:
                  - rowheader "数据结构" [ref=e1855]
                  - cell "20%" [ref=e1856]
                  - cell "50%" [ref=e1860]
                  - cell "80%" [ref=e1864]
                  - cell "0%" [ref=e1868]
                  - cell "30%" [ref=e1872]
                  - cell "60%" [ref=e1876]
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
                  - columnheader "计算机学院" [ref=e1898]
                  - columnheader "经济管理学院" [ref=e1899]
                  - columnheader "人文学院" [ref=e1900]
                  - columnheader "理学院" [ref=e1901]
                  - columnheader "外国语学院" [ref=e1902]
                  - columnheader "教育学院" [ref=e1903]
              - rowgroup [ref=e1904]:
                - row [ref=e1905]:
                  - rowheader "通识课程" [ref=e1906]
                  - cell "0" [ref=e1907]
                  - cell "7" [ref=e1911]
                  - cell "14" [ref=e1915]
                  - cell "21" [ref=e1919]
                  - cell "28" [ref=e1923]
                  - cell "35" [ref=e1927]
                - row [ref=e1931]:
                  - rowheader "学科基础" [ref=e1932]
                  - cell "11" [ref=e1933]
                  - cell "18" [ref=e1937]
                  - cell "25" [ref=e1941]
                  - cell "32" [ref=e1945]
                  - cell "39" [ref=e1949]
                  - cell "46" [ref=e1953]
                - row [ref=e1957]:
                  - rowheader "专业必修" [ref=e1958]
                  - cell "22" [ref=e1959]
                  - cell "29" [ref=e1963]
                  - cell "36" [ref=e1967]
                  - cell "43" [ref=e1971]
                  - cell "50" [ref=e1975]
                  - cell "57" [ref=e1979]:
                    - img [ref=e1981]:
                      - generic [ref=e1983]: "57"
                - row [ref=e1985]:
                  - rowheader "专业选修" [ref=e1986]
                  - cell "33" [ref=e1987]
                  - cell "40" [ref=e1991]
                  - cell "47" [ref=e1995]
                  - cell "54" [ref=e1999]
                  - cell "61" [ref=e2003]:
                    - img [ref=e2005]:
                      - generic [ref=e2007]: "61"
                  - cell "68" [ref=e2009]:
                    - img [ref=e2011]:
                      - generic [ref=e2013]: "68"
                - row [ref=e2015]:
                  - rowheader "实践课程" [ref=e2016]
                  - cell "44" [ref=e2017]
                  - cell "51" [ref=e2021]:
                    - img [ref=e2023]:
                      - generic [ref=e2025]: "51"
                  - cell "58" [ref=e2027]:
                    - img [ref=e2029]:
                      - generic [ref=e2031]: "58"
                  - cell "65" [ref=e2033]:
                    - img [ref=e2035]:
                      - generic [ref=e2037]: "65"
                  - cell "72" [ref=e2039]:
                    - img [ref=e2041]:
                      - generic [ref=e2043]: "72"
                  - cell "79" [ref=e2045]:
                    - img [ref=e2047]:
                      - generic [ref=e2049]: "79"
                - row [ref=e2052]:
                  - rowheader "创新课程" [ref=e2053]
                  - cell "55" [ref=e2054]:
                    - img [ref=e2056]:
                      - generic [ref=e2058]: "55"
                  - cell "62" [ref=e2060]:
                    - img [ref=e2062]:
                      - generic [ref=e2064]: "62"
                  - cell "69" [ref=e2066]:
                    - img [ref=e2068]:
                      - generic [ref=e2070]: "69"
                  - cell "76" [ref=e2072]:
                    - img [ref=e2074]:
                      - generic [ref=e2076]: "76"
                  - cell "83" [ref=e2079]:
                    - img [ref=e2081]:
                      - generic [ref=e2083]: "83"
                  - cell "90" [ref=e2086]:
                    - img [ref=e2088]:
                      - generic [ref=e2090]: "90"
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
                  - columnheader "知识与能力" [ref=e2117]
                  - columnheader "分析与表达" [ref=e2118]
                  - columnheader "协作与实践" [ref=e2119]
                  - columnheader "创新与反思" [ref=e2120]
              - rowgroup [ref=e2121]:
                - row [ref=e2122]:
                  - rowheader "高等数学" [ref=e2123]
                  - cell "无直接支撑" [ref=e2124]
                  - cell "一般支撑" [ref=e2128]
                  - cell "核心支撑" [ref=e2132]
                  - cell "无直接支撑" [ref=e2136]
                - row [ref=e2140]:
                  - rowheader "线性代数" [ref=e2141]
                  - cell "一般支撑" [ref=e2142]
                  - cell "核心支撑" [ref=e2146]
                  - cell "无直接支撑" [ref=e2150]
                  - cell "一般支撑" [ref=e2154]
                - row [ref=e2158]:
                  - rowheader "概率论与数理统计" [ref=e2159]
                  - cell "核心支撑" [ref=e2160]
                  - cell "无直接支撑" [ref=e2164]
                  - cell "一般支撑" [ref=e2168]
                  - cell "核心支撑" [ref=e2172]
                - row [ref=e2176]:
                  - rowheader "大学物理" [ref=e2177]
                  - cell "无直接支撑" [ref=e2178]
                  - cell "一般支撑" [ref=e2182]
                  - cell "核心支撑" [ref=e2186]
                  - cell "无直接支撑" [ref=e2190]
                - row [ref=e2194]:
                  - rowheader "程序设计基础" [ref=e2195]
                  - cell "一般支撑" [ref=e2196]
                  - cell "核心支撑" [ref=e2200]
                  - cell "无直接支撑" [ref=e2204]
                  - cell "一般支撑" [ref=e2208]
                - row [ref=e2212]:
                  - rowheader "数据结构" [ref=e2213]
                  - cell "核心支撑" [ref=e2214]
                  - cell "无直接支撑" [ref=e2218]
                  - cell "一般支撑" [ref=e2222]
                  - cell "核心支撑" [ref=e2226]
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
  46  |     const container = reading?.closest('[data-slot="reading-container"]');
  47  |     return { value: Number(node.getAttribute("aria-label")), radius: circle.r.baseVal.value, fill: getComputedStyle(circle).fill,
  48  |       visibleReading: !!reading && getComputedStyle(reading).visibility !== "hidden" && (!container || getComputedStyle(container).visibility !== "hidden"),
  49  |       readingFill: reading ? getComputedStyle(reading).fill : null, readingBackground: container ? getComputedStyle(container).backgroundColor : null };
  50  |   }));
  51  |   expect(bubbles.length).toBeGreaterThan(10);
  52  |   expect(new Set(bubbles.map(item => item.fill)).size).toBeGreaterThan(3);
  53  |   const normalizedAreas = bubbles.filter(item => item.value > 0).map(item => item.radius ** 2 / item.value);
  54  |   expect(Math.max(...normalizedAreas) - Math.min(...normalizedAreas)).toBeLessThan(.001);
  55  |   const visible = bubbles.filter(item => item.visibleReading);
  56  |   expect(visible.length).toBeGreaterThan(0);
  57  |   expect(visible.every(item => item.readingFill === "rgb(255, 255, 255)" && item.readingBackground === "rgba(0, 0, 0, 0)")).toBe(true);
  58  |   await expect(chart.locator('[data-slot="reading-plate"]')).toHaveCount(0);
  59  |   await record("bubble-encoding", { bubbles, normalizedAreas });
  60  |   await chart.screenshot({ path: `${evidence}/bubble-matrix.png` });
  61  | });
  62  | 
  63  | test("heat readings have no backing plate and legends match continuous, quantity and level encodings", async ({ page }) => {
  64  |   await open(page);
  65  |   const heat = matrix(page, "course-similarity");
  66  |   await heat.scrollIntoViewIfNeeded();
  67  |   const backgrounds = await heat.locator('[data-slot="cell"] [data-slot="reading-container"]').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor));
  68  |   expect(backgrounds.length).toBeGreaterThan(0);
  69  |   expect(backgrounds.every(value => value === "rgba(0, 0, 0, 0)")).toBe(true);
  70  |   await expect(heat.locator('[data-slot="reading-plate"]')).toHaveCount(0);
  71  |   const gradient = heat.locator('[data-slot="legend-gradient"]');
  72  |   await expect(gradient).toHaveCount(1);
  73  |   const gradientFacts = await gradient.evaluate(node => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height, background: getComputedStyle(node).backgroundImage }));
  74  |   expect(gradientFacts.height).toBeLessThanOrEqual(12);
  75  |   expect(gradientFacts.width).toBeGreaterThan(gradientFacts.height * 10);
  76  |   expect(gradientFacts.background).toContain("gradient");
  77  |   const quantity = matrix(page, "course-count").locator('[data-slot="legend"]');
  78  |   const quantityFacts = await quantity.locator("circle").evaluateAll(nodes => nodes.map(node => ({ radius: (node as SVGCircleElement).r.baseVal.value, fill: getComputedStyle(node).fill })));
  79  |   expect(quantityFacts).toHaveLength(3);
  80  |   expect(quantityFacts.every(item => item.radius > 0)).toBe(true);
  81  |   expect(new Set(quantityFacts.map(item => item.fill)).size).toBe(3);
  82  |   expect(await quantity.evaluate(node => node.getBoundingClientRect().height)).toBeLessThanOrEqual(72);
  83  |   const levels = matrix(page, "support-level").locator('[data-slot="legend"]');
  84  |   await expect(levels).toContainText("无直接支撑");
  85  |   await expect(levels).toContainText("一般支撑");
  86  |   await expect(levels).toContainText("核心支撑");
  87  |   const radii = await levels.locator("circle").evaluateAll(nodes => nodes.map(node => (node as SVGCircleElement).r.baseVal.value));
  88  |   expect(radii).toHaveLength(3);
  89  |   expect(new Set(radii).size).toBe(1);
  90  |   await record("legends", { backgrounds, gradientFacts, quantityFacts, levelRadii: radii });
  91  | });
  92  | 
  93  | test("adjacent cells reuse one tooltip and keyboard arrows inspect matching row and column", async ({ page }) => {
  94  |   await open(page);
  95  |   const chart = matrix(page, "course-count");
  96  |   const first = cell(chart, "category-2", "college-2");
  97  |   const next = cell(chart, "category-2", "college-3");
  98  |   await first.hover();
  99  |   const tooltip = page.locator(".rain-matrix__tooltip");
  100 |   await expect(tooltip).toHaveCount(1);
  101 |   await expect(tooltip).toBeVisible();
  102 |   await expect(tooltip).toContainText("18");
  103 |   await tooltip.evaluate(node => node.setAttribute("data-test-same-tooltip", "true"));
  104 |   await next.hover();
  105 |   await expect(tooltip).toHaveAttribute("data-test-same-tooltip", "true");
  106 |   await expect(tooltip).toContainText("25");
  107 |   await expect(next).toHaveAttribute("data-active", "true");
  108 |   await first.focus();
  109 |   await expect(first).toHaveAttribute("data-active", "true");
  110 |   await page.keyboard.press("ArrowRight");
  111 |   await expect(next).toBeFocused();
  112 |   await expect(next).toHaveAttribute("data-active", "true");
  113 |   await expect(tooltip).toContainText("人文学院");
  114 |   await expect(tooltip).toContainText("学科基础");
  115 |   await page.keyboard.press("ArrowDown");
  116 |   const below = cell(chart, "category-3", "college-3");
  117 |   await expect(below).toBeFocused();
  118 |   await expect(tooltip).toContainText("36");
  119 |   await record("inspection", { sharedTooltipNode: true, horizontalAndVerticalKeyboardNavigation: true });
  120 | });
  121 | 
  122 | test("offscreen entry starts when viewed and includes intermediate bubble geometry", async ({ page }) => {
  123 |   await open(page, false);
  124 |   const chart = matrix(page, "course-count");
  125 |   const target = cell(chart, "category-6", "college-6").locator("circle").first();
  126 |   expect(await chart.evaluate(node => node.getBoundingClientRect().top)).toBeGreaterThan(1000);
  127 |   await page.waitForTimeout(1800);
  128 |   await chart.scrollIntoViewIfNeeded();
  129 |   const samples = await target.evaluate(async node => {
  130 |     const circle = node as SVGCircleElement;
  131 |     const frames: { time: number; width: number; opacity: number }[] = [];
  132 |     const start = performance.now();
  133 |     await new Promise<void>(resolve => {
  134 |       const sample = (now: number) => {
  135 |         const parent = circle.closest('[data-slot="mark-container"]')!;
  136 |         frames.push({ time: now - start, width: circle.getBoundingClientRect().width, opacity: Number(getComputedStyle(parent).opacity) });
  137 |         if (now - start < 1800) requestAnimationFrame(sample); else resolve();
  138 |       };
  139 |       requestAnimationFrame(sample);
  140 |     });
  141 |     return frames;
  142 |   });
  143 |   const final = samples.at(-1)!;
  144 |   expect(final.width).toBeGreaterThan(0);
  145 |   expect(final.opacity).toBeCloseTo(1, 2);
> 146 |   expect(samples.some(frame => frame.width > 0 && frame.width < final.width - .1 || frame.opacity > 0 && frame.opacity < .99)).toBe(true);
      |                                                                                                                                ^ Error: expect(received).toBe(expected) // Object.is equality
  147 |   await record("viewport-entry", { samples, intermediateFrame: true });
  148 | });
  149 | 
  150 | test("updates and sorting retain coordinate nodes and animate through intermediate geometry", async ({ page }) => {
  151 |   await open(page, false);
  152 |   const chart = matrix(page, "course-count");
  153 |   const target = cell(chart, "category-4", "college-4");
  154 |   await chart.scrollIntoViewIfNeeded();
  155 |   await page.waitForTimeout(1800);
  156 |   await target.evaluate(node => node.setAttribute("data-test-stable-coordinate", "true"));
  157 |   const circle = target.locator("circle").first();
  158 |   const before = await circle.evaluate(node => node.getBoundingClientRect().width);
  159 |   await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  160 |   const updateFrames = await circle.evaluate(async node => {
  161 |     const widths: number[] = [], start = performance.now();
  162 |     await new Promise<void>(resolve => {
  163 |       const frame = (now: number) => { widths.push(node.getBoundingClientRect().width); if (now - start < 1100) requestAnimationFrame(frame); else resolve(); };
  164 |       requestAnimationFrame(frame);
  165 |     });
  166 |     return widths;
  167 |   });
  168 |   const after = updateFrames.at(-1)!;
  169 |   expect(after).toBeGreaterThan(before);
  170 |   expect(updateFrames.some(width => width > before + .01 && width < after - .01)).toBe(true);
  171 |   await expect(target).toHaveAttribute("data-test-stable-coordinate", "true");
  172 |   const mark = target.locator('[data-slot="mark-container"]');
  173 |   const original = await mark.evaluate(node => { const box = node.getBoundingClientRect(); return { x: box.x, y: box.y }; });
  174 |   await page.getByRole("button", { name: "按数量排序" }).evaluate(node => (node as HTMLButtonElement).click());
  175 |   const sortFrames = await mark.evaluate(async node => {
  176 |     const positions: { x: number; y: number }[] = [], start = performance.now();
  177 |     await new Promise<void>(resolve => {
  178 |       const frame = (now: number) => { const box = node.getBoundingClientRect(); positions.push({ x: box.x, y: box.y }); if (now - start < 1100) requestAnimationFrame(frame); else resolve(); };
  179 |       requestAnimationFrame(frame);
  180 |     });
  181 |     return positions;
  182 |   });
  183 |   const end = sortFrames.at(-1)!;
  184 |   const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
  185 |   expect(distance(original, end)).toBeGreaterThan(5);
  186 |   expect(sortFrames.some(position => distance(position, original) > .5 && distance(position, end) > .5)).toBe(true);
  187 |   await expect(target).toHaveAttribute("data-test-stable-coordinate", "true");
  188 |   await record("update-sort", { before, after, updateFrames, original, sortFrames, end, retainedCoordinate: true });
  189 | });
  190 | 
  191 | test("reduced motion exposes final values immediately without hidden readouts after update", async ({ page }) => {
  192 |   await open(page);
  193 |   const chart = matrix(page, "course-count");
  194 |   await chart.scrollIntoViewIfNeeded();
  195 |   const target = cell(chart, "category-6", "college-6");
  196 |   const circle = target.locator("circle").first();
  197 |   const first = await circle.evaluate(node => node.getBoundingClientRect().width);
  198 |   await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  199 |   await expect(target).toHaveAttribute("aria-label", "93");
  200 |   const immediate = await circle.evaluate(node => node.getBoundingClientRect().width);
  201 |   expect(immediate).toBeGreaterThan(first);
  202 |   await page.waitForTimeout(60);
  203 |   expect(await circle.evaluate(node => node.getBoundingClientRect().width)).toBeCloseTo(immediate, 2);
  204 |   expect(await target.locator('text[data-slot="reading"]').evaluate(node => getComputedStyle(node).visibility)).toBe("visible");
  205 |   expect(await target.locator('[data-slot="mark-container"]').evaluate(node => Number(getComputedStyle(node).opacity))).toBe(1);
  206 |   await record("reduced-motion", { first, immediate, readoutVisible: true });
  207 | });
  208 | 
```