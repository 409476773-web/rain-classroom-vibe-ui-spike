# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-matrix-refinement.spec.ts >> zero-to-large bubble transition never paints a visible glyph beyond its current circle
- Location: tests/e2e/chart-business-matrix-refinement.spec.ts:292:1

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
          - generic [ref=e856]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=e857]
          - region "每周学习时段 · 次数，可横向滚动" [ref=e858]:
            - table [ref=e859]:
              - caption [ref=e860]: 每周学习时段 · 次数
              - rowgroup [ref=e887]:
                - row [ref=e888]:
                  - columnheader "星期" [ref=e889]
                  - columnheader "00:00" [ref=e890]
                  - columnheader "01:00" [ref=e891]
                  - columnheader "02:00" [ref=e892]
                  - columnheader "03:00" [ref=e893]
                  - columnheader "04:00" [ref=e894]
                  - columnheader "05:00" [ref=e895]
                  - columnheader "06:00" [ref=e896]
                  - columnheader "07:00" [ref=e897]
                  - columnheader "08:00" [ref=e898]
                  - columnheader "09:00" [ref=e899]
                  - columnheader "10:00" [ref=e900]
                  - columnheader "11:00" [ref=e901]
                  - columnheader "12:00" [ref=e902]
                  - columnheader "13:00" [ref=e903]
                  - columnheader "14:00" [ref=e904]
                  - columnheader "15:00" [ref=e905]
                  - columnheader "16:00" [ref=e906]
                  - columnheader "17:00" [ref=e907]
                  - columnheader "18:00" [ref=e908]
                  - columnheader "19:00" [ref=e909]
                  - columnheader "20:00" [ref=e910]
                  - columnheader "21:00" [ref=e911]
                  - columnheader "22:00" [ref=e912]
                  - columnheader "23:00" [ref=e913]
              - rowgroup [ref=e914]:
                - row [ref=e915]:
                  - rowheader "周一" [ref=e916]
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
                  - cell "9" [ref=e985]
                  - cell "12" [ref=e989]
                  - cell "15" [ref=e993]
                  - cell "18" [ref=e997]
                  - cell "0" [ref=e1001]
                  - cell "3" [ref=e1005]
                  - cell "6" [ref=e1009]
                - row [ref=e1013]:
                  - rowheader "周二" [ref=e1014]
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
                  - cell "16" [ref=e1083]
                  - cell "19" [ref=e1087]
                  - cell "1" [ref=e1091]
                  - cell "4" [ref=e1095]
                  - cell "7" [ref=e1099]
                  - cell "10" [ref=e1103]
                  - cell "13" [ref=e1107]
                - row [ref=e1111]:
                  - rowheader "周三" [ref=e1112]
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
                  - cell "2" [ref=e1181]
                  - cell "5" [ref=e1185]
                  - cell "8" [ref=e1189]
                  - cell "11" [ref=e1193]
                  - cell "14" [ref=e1197]
                  - cell "17" [ref=e1201]
                  - cell "20" [ref=e1205]
                - row [ref=e1209]:
                  - rowheader "周四" [ref=e1210]
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
                  - cell "9" [ref=e1279]
                  - cell "12" [ref=e1283]
                  - cell "15" [ref=e1287]
                  - cell "18" [ref=e1291]
                  - cell "0" [ref=e1295]
                  - cell "3" [ref=e1299]
                  - cell "6" [ref=e1303]
                - row [ref=e1307]:
                  - rowheader "周五" [ref=e1308]
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
                  - cell "16" [ref=e1377]
                  - cell "19" [ref=e1381]
                  - cell "1" [ref=e1385]
                  - cell "4" [ref=e1389]
                  - cell "7" [ref=e1393]
                  - cell "10" [ref=e1397]
                  - cell "13" [ref=e1401]
                - row [ref=e1405]:
                  - rowheader "周六" [ref=e1406]
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
                  - cell "2" [ref=e1475]
                  - cell "5" [ref=e1479]
                  - cell "8" [ref=e1483]
                  - cell "11" [ref=e1487]
                  - cell "14" [ref=e1491]
                  - cell "17" [ref=e1495]
                  - cell "20" [ref=e1499]
                - row [ref=e1503]:
                  - rowheader "周日" [ref=e1504]
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
                  - cell "6" [ref=e1569]
                  - cell "9" [ref=e1573]
                  - cell "12" [ref=e1577]
                  - cell "15" [ref=e1581]
                  - cell "18" [ref=e1585]
                  - cell "0" [ref=e1589]
                  - cell "3" [ref=e1593]
                  - cell "缺测" [ref=e1597]
          - list "每周学习时段 · 次数图例" [ref=e1600]:
            - listitem [ref=e1601]:
              - generic [ref=e1602]:
                - button "0–4" [ref=e1603] [cursor=pointer]
                - button "4–8" [ref=e1604] [cursor=pointer]
                - button "8–12" [ref=e1605] [cursor=pointer]
                - button "12–16" [ref=e1606] [cursor=pointer]
                - button "16–20" [ref=e1607] [cursor=pointer]
              - generic [ref=e1608]:
                - generic [ref=e1609]: "0"
                - generic [ref=e1610]: "20"
        - paragraph [ref=e1611]: 按星期与小时比较学习次数，0 也是有效观测。
      - region "课程与培养方案版本 · 开课学期" [ref=e1612]:
        - generic [ref=e1613]:
          - generic [ref=e1614]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=e1615]
          - region "课程与培养方案版本 · 开课学期，可横向滚动" [ref=e1616]:
            - table [ref=e1617]:
              - caption [ref=e1618]: 课程与培养方案版本 · 开课学期
              - rowgroup [ref=e1625]:
                - row [ref=e1626]:
                  - columnheader "课程" [ref=e1627]
                  - columnheader "2022 版" [ref=e1628]
                  - columnheader "2023 版" [ref=e1629]
                  - columnheader "2024 版" [ref=e1630]
                  - columnheader "2025 版" [ref=e1631]
              - rowgroup [ref=e1632]:
                - row [ref=e1633]:
                  - rowheader "高等数学" [ref=e1634]
                  - cell "1" [ref=e1635]
                  - cell "2" [ref=e1639]
                  - cell "未设学期" [ref=e1643]
                  - cell "4" [ref=e1646]
                - row [ref=e1650]:
                  - rowheader "线性代数" [ref=e1651]
                  - cell "2" [ref=e1652]
                  - cell "3" [ref=e1656]
                  - cell "4" [ref=e1660]
                  - cell "5" [ref=e1664]
                - row [ref=e1668]:
                  - rowheader "概率论与数理统计" [ref=e1669]
                  - cell "3" [ref=e1670]
                  - cell "无该课程" [ref=e1674]:
                    - generic [ref=e1675]: —
                  - cell "5" [ref=e1677]
                  - cell "6" [ref=e1681]
                - row [ref=e1685]:
                  - rowheader "大学物理" [ref=e1686]
                  - cell "4" [ref=e1687]
                  - cell "5" [ref=e1691]
                  - cell "6" [ref=e1695]
                  - cell "7" [ref=e1699]
                - row [ref=e1703]:
                  - rowheader "程序设计基础" [ref=e1704]
                  - cell "5" [ref=e1705]
                  - cell "6" [ref=e1709]
                  - cell "7" [ref=e1713]
                  - cell "8" [ref=e1717]
                - row [ref=e1721]:
                  - rowheader "数据结构" [ref=e1722]
                  - cell "6" [ref=e1723]
                  - cell "7" [ref=e1727]
                  - cell "8" [ref=e1731]
                  - cell "1" [ref=e1735]
          - list "课程与培养方案版本 · 开课学期图例" [ref=e1739]:
            - listitem [ref=e1740]:
              - generic [ref=e1741]:
                - button "1–2.4" [ref=e1742] [cursor=pointer]
                - button "2.4–3.8" [ref=e1743] [cursor=pointer]
                - button "3.8–5.2" [ref=e1744] [cursor=pointer]
                - button "5.2–6.6" [ref=e1745] [cursor=pointer]
                - button "6.6–8" [ref=e1746] [cursor=pointer]
              - generic [ref=e1747]:
                - generic [ref=e1748]: "1"
                - generic [ref=e1749]: "2"
                - generic [ref=e1750]: "3"
                - generic [ref=e1751]: "4"
                - generic [ref=e1752]: "5"
                - generic [ref=e1753]: "6"
                - generic [ref=e1754]: "7"
                - generic [ref=e1755]: "8"
        - paragraph [ref=e1756]: 学期按 1—8 排列；未设学期与无该课程分别记录。
      - region "课程相似度" [ref=e1757]:
        - generic [ref=e1758]:
          - generic [ref=e1759]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=e1760]
          - region "课程相似度，可横向滚动" [ref=e1761]:
            - table [ref=e1762]:
              - caption [ref=e1763]: 课程相似度
              - rowgroup [ref=e1772]:
                - row [ref=e1773]:
                  - columnheader "课程" [ref=e1774]
                  - columnheader "高等数学" [ref=e1775]
                  - columnheader "线性代数" [ref=e1776]
                  - columnheader "概率论与数理统计" [ref=e1777]
                  - columnheader "大学物理" [ref=e1778]
                  - columnheader "程序设计基础" [ref=e1779]
                  - columnheader "数据结构" [ref=e1780]
              - rowgroup [ref=e1781]:
                - row [ref=e1782]:
                  - rowheader "高等数学" [ref=e1783]
                  - cell "缺测" [ref=e1784]
                  - cell "30%" [ref=e1787]
                  - cell "60%" [ref=e1791]
                  - cell "90%" [ref=e1795]
                  - cell "10%" [ref=e1799]
                  - cell "40%" [ref=e1803]
                - row [ref=e1807]:
                  - rowheader "线性代数" [ref=e1808]
                  - cell "70%" [ref=e1809]
                  - cell "100%" [ref=e1813]
                  - cell "20%" [ref=e1817]
                  - cell "50%" [ref=e1821]
                  - cell "80%" [ref=e1825]
                  - cell "0%" [ref=e1829]
                - row [ref=e1833]:
                  - rowheader "概率论与数理统计" [ref=e1834]
                  - cell "30%" [ref=e1835]
                  - cell "60%" [ref=e1839]
                  - cell "90%" [ref=e1843]
                  - cell "10%" [ref=e1847]
                  - cell "40%" [ref=e1851]
                  - cell "70%" [ref=e1855]
                - row [ref=e1859]:
                  - rowheader "大学物理" [ref=e1860]
                  - cell "100%" [ref=e1861]
                  - cell "20%" [ref=e1865]
                  - cell "50%" [ref=e1869]
                  - cell "缺测" [ref=e1873]
                  - cell "0%" [ref=e1876]
                  - cell "30%" [ref=e1880]
                - row [ref=e1884]:
                  - rowheader "程序设计基础" [ref=e1885]
                  - cell "60%" [ref=e1886]
                  - cell "90%" [ref=e1890]
                  - cell "10%" [ref=e1894]
                  - cell "40%" [ref=e1898]
                  - cell "70%" [ref=e1902]
                  - cell "100%" [ref=e1906]
                - row [ref=e1910]:
                  - rowheader "数据结构" [ref=e1911]
                  - cell "20%" [ref=e1912]
                  - cell "50%" [ref=e1916]
                  - cell "80%" [ref=e1920]
                  - cell "0%" [ref=e1924]
                  - cell "30%" [ref=e1928]
                  - cell "60%" [ref=e1932]
          - list "课程相似度图例" [ref=e1936]:
            - listitem [ref=e1937]:
              - generic [ref=e1938]:
                - button "0%–20%" [ref=e1939] [cursor=pointer]
                - button "20%–40%" [ref=e1940] [cursor=pointer]
                - button "40%–60%" [ref=e1941] [cursor=pointer]
                - button "60%–80%" [ref=e1942] [cursor=pointer]
                - button "80%–100%" [ref=e1943] [cursor=pointer]
              - generic [ref=e1944]:
                - generic [ref=e1945]: 0%
                - generic [ref=e1946]: 100%
        - paragraph [ref=e1947]: 同一课程对应两轴；方向不同的读数分别保留，缺测位置留空。
      - region "课程类别与学院 · 课程数" [ref=e1948]:
        - generic [ref=e1949]:
          - generic [ref=e1950]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=e1951]
          - region "课程类别与学院 · 课程数，可横向滚动" [ref=e1952]:
            - table [ref=e1953]:
              - caption [ref=e1954]: 课程类别与学院 · 课程数
              - rowgroup [ref=e1963]:
                - row [ref=e1964]:
                  - columnheader "课程类别" [ref=e1965]
                  - columnheader "计算机学院" [ref=e1966]
                  - columnheader "经济管理学院" [ref=e1967]
                  - columnheader "人文学院" [ref=e1968]
                  - columnheader "理学院" [ref=e1969]
                  - columnheader "外国语学院" [ref=e1970]
                  - columnheader "教育学院" [ref=e1971]
              - rowgroup [ref=e1972]:
                - row [ref=e1973]:
                  - rowheader "通识课程" [ref=e1974]
                  - cell "0" [ref=e1975]
                  - cell "7" [ref=e1979]
                  - cell "14" [ref=e1983]
                  - cell "21" [ref=e1987]
                  - cell "28" [ref=e1991]
                  - cell "35" [ref=e1995]
                - row [ref=e1999]:
                  - rowheader "学科基础" [ref=e2000]
                  - cell "11" [ref=e2001]
                  - cell "18" [ref=e2005]
                  - cell "25" [ref=e2009]
                  - cell "32" [ref=e2013]
                  - cell "39" [ref=e2017]
                  - cell "46" [ref=e2021]:
                    - img [ref=e2023]:
                      - generic [ref=e2025]: "46"
                - row [ref=e2027]:
                  - rowheader "专业必修" [ref=e2028]
                  - cell "22" [ref=e2029]
                  - cell "29" [ref=e2033]
                  - cell "36" [ref=e2037]
                  - cell "43" [ref=e2041]
                  - cell "50" [ref=e2045]:
                    - img [ref=e2047]:
                      - generic [ref=e2049]: "50"
                  - cell "57" [ref=e2051]:
                    - img [ref=e2053]:
                      - generic [ref=e2055]: "57"
                - row [ref=e2057]:
                  - rowheader "专业选修" [ref=e2058]
                  - cell "33" [ref=e2059]
                  - cell "40" [ref=e2063]
                  - cell "47" [ref=e2067]:
                    - img [ref=e2069]:
                      - generic [ref=e2071]: "47"
                  - cell "54" [ref=e2073]:
                    - img [ref=e2075]:
                      - generic [ref=e2077]: "54"
                  - cell "61" [ref=e2079]:
                    - img [ref=e2081]:
                      - generic [ref=e2083]: "61"
                  - cell "68" [ref=e2085]:
                    - img [ref=e2087]:
                      - generic [ref=e2089]: "68"
                - row [ref=e2091]:
                  - rowheader "实践课程" [ref=e2092]
                  - cell "44" [ref=e2093]:
                    - img [ref=e2095]:
                      - generic [ref=e2097]: "44"
                  - cell "51" [ref=e2099]:
                    - img [ref=e2101]:
                      - generic [ref=e2103]: "51"
                  - cell "58" [ref=e2105]:
                    - img [ref=e2107]:
                      - generic [ref=e2109]: "58"
                  - cell "65" [ref=e2111]:
                    - img [ref=e2113]:
                      - generic [ref=e2115]: "65"
                  - cell "72" [ref=e2117]:
                    - img [ref=e2119]:
                      - generic [ref=e2121]: "72"
                  - cell "79" [ref=e2123]:
                    - img [ref=e2125]:
                      - generic [ref=e2127]: "79"
                - row [ref=e2129]:
                  - rowheader "创新课程" [ref=e2130]
                  - cell "55" [ref=e2131]:
                    - img [ref=e2133]:
                      - generic [ref=e2135]: "55"
                  - cell "62" [ref=e2137]:
                    - img [ref=e2139]:
                      - generic [ref=e2141]: "62"
                  - cell "69" [ref=e2143]:
                    - img [ref=e2145]:
                      - generic [ref=e2147]: "69"
                  - cell "76" [ref=e2149]:
                    - img [ref=e2151]:
                      - generic [ref=e2153]: "76"
                  - cell "83" [ref=e2155]:
                    - img [ref=e2157]:
                      - generic [ref=e2159]: "83"
                  - cell "90" [ref=e2161]:
                    - img [ref=e2163]:
                      - generic [ref=e2165]: "90"
          - list "课程类别与学院 · 课程数图例" [ref=e2167]:
            - button "25" [ref=e2168] [cursor=pointer]
            - button "50" [ref=e2173] [cursor=pointer]
            - button "100" [ref=e2178] [cursor=pointer]
        - paragraph [ref=e2183]: 圆面积与颜色深浅共用课程数量程；指向或用方向键查看精确课程数。
      - region "课程支撑关系" [ref=e2184]:
        - generic [ref=e2185]:
          - generic [ref=e2186]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=e2187]
          - region "课程支撑关系，可横向滚动" [ref=e2188]:
            - table [ref=e2189]:
              - caption [ref=e2190]: 课程支撑关系
              - rowgroup [ref=e2197]:
                - row [ref=e2198]:
                  - columnheader "课程" [ref=e2199]
                  - columnheader "知识与能力" [ref=e2200]
                  - columnheader "分析与表达" [ref=e2201]
                  - columnheader "协作与实践" [ref=e2202]
                  - columnheader "创新与反思" [ref=e2203]
              - rowgroup [ref=e2204]:
                - row [ref=e2205]:
                  - rowheader "高等数学" [ref=e2206]
                  - cell "无直接支撑" [ref=e2207]
                  - cell "一般支撑" [ref=e2211]
                  - cell "核心支撑" [ref=e2215]
                  - cell "无直接支撑" [ref=e2219]
                - row [ref=e2223]:
                  - rowheader "线性代数" [ref=e2224]
                  - cell "一般支撑" [ref=e2225]
                  - cell "核心支撑" [ref=e2229]
                  - cell "无直接支撑" [ref=e2233]
                  - cell "一般支撑" [ref=e2237]
                - row [ref=e2241]:
                  - rowheader "概率论与数理统计" [ref=e2242]
                  - cell "核心支撑" [ref=e2243]
                  - cell "无直接支撑" [ref=e2247]
                  - cell "一般支撑" [ref=e2251]
                  - cell "核心支撑" [ref=e2255]
                - row [ref=e2259]:
                  - rowheader "大学物理" [ref=e2260]
                  - cell "无直接支撑" [ref=e2261]
                  - cell "一般支撑" [ref=e2265]
                  - cell "核心支撑" [ref=e2269]
                  - cell "无直接支撑" [ref=e2273]
                - row [ref=e2277]:
                  - rowheader "程序设计基础" [ref=e2278]
                  - cell "一般支撑" [ref=e2279]
                  - cell "核心支撑" [ref=e2283]
                  - cell "无直接支撑" [ref=e2287]
                  - cell "一般支撑" [ref=e2291]
                - row [ref=e2295]:
                  - rowheader "数据结构" [ref=e2296]
                  - cell "核心支撑" [ref=e2297]
                  - cell "无直接支撑" [ref=e2301]
                  - cell "一般支撑" [ref=e2305]
                  - cell "核心支撑" [ref=e2309]
          - list "课程支撑关系图例" [ref=e2313]:
            - button "无直接支撑" [ref=e2314] [cursor=pointer]
            - button "一般支撑" [ref=e2319] [cursor=pointer]
            - button "核心支撑" [ref=e2324] [cursor=pointer]
        - paragraph [ref=e2329]: 支撑关系只有无直接支撑、一般支撑和核心支撑三个等级。
  - group [ref=e2330]:
    - generic "条形与嵌入组合源码" [ref=e2331] [cursor=pointer]
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
  223 |   const totalDistance = distance(original, end);
  224 |   expect(sortFrames.some(position => distance(position, original) > totalDistance * .1 && distance(position, end) > totalDistance * .1)).toBe(true);
  225 |   await expect(target).toHaveAttribute("data-test-stable-coordinate", "true");
  226 |   await record("update-sort", { before, after, updateFrames, original, sortFrames, end, retainedCoordinate: true });
  227 | });
  228 | 
  229 | test("reduced motion exposes final values immediately without hidden readouts after update", async ({ page }) => {
  230 |   await open(page);
  231 |   const chart = matrix(page, "course-count");
  232 |   await chart.scrollIntoViewIfNeeded();
  233 |   const target = cell(chart, "category-6", "college-6");
  234 |   const circle = target.locator("circle").first();
  235 |   const first = await circle.evaluate(node => node.getBoundingClientRect().width);
  236 |   await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  237 |   await expect(target).toHaveAttribute("aria-label", "93");
  238 |   const immediate = await circle.evaluate(node => node.getBoundingClientRect().width);
  239 |   expect(immediate).toBeGreaterThan(first);
  240 |   await page.waitForTimeout(60);
  241 |   expect(await circle.evaluate(node => node.getBoundingClientRect().width)).toBeCloseTo(immediate, 2);
  242 |   expect(await target.locator('text[data-slot="reading"]').evaluate(node => getComputedStyle(node).visibility)).toBe("visible");
  243 |   expect(await target.locator('[data-slot="mark-container"]').evaluate(node => Number(getComputedStyle(node).opacity))).toBe(1);
  244 |   await record("reduced-motion", { first, immediate, readoutVisible: true });
  245 | });
  246 | 
  247 | test("clicking a hovered nonfirst cell preserves its inspected coordinate", async ({ page }) => {
  248 |   await open(page);
  249 |   const chart = matrix(page, "course-count"), target = cell(chart, "category-2", "college-3");
  250 |   await target.hover();
  251 |   await expect(target).toHaveAttribute("data-active", "true");
  252 |   await target.click();
  253 |   const facts = await chart.locator('[data-slot="cell"][data-active="true"]').evaluateAll(nodes => nodes.map(node => ({ row: node.getAttribute("data-row-id"), column: node.getAttribute("data-column-id") })));
  254 |   await record("pointer-focus", { expected: { row: "category-2", column: "college-3" }, actual: facts });
  255 |   await expect(target).toHaveAttribute("data-active", "true");
  256 |   await expect(page.locator(".rain-matrix__tooltip")).toContainText("25");
  257 | });
  258 | 
  259 | test("keyboard focus reveals the inspected coordinate beyond a sticky row heading after horizontal scrolling", async ({ page }) => {
  260 |   await open(page);
  261 |   await page.setViewportSize({ width: 390, height: 844 });
  262 |   const chart = matrix(page, "weekday-hour"), region = chart.locator('[data-slot="scroll-container"]');
  263 |   await region.scrollIntoViewIfNeeded();
  264 |   await page.mouse.move(0, 0);
  265 |   await page.waitForTimeout(150);
  266 |   await region.evaluate(node => { node.scrollLeft = node.scrollWidth - node.clientWidth; });
  267 |   await region.focus();
  268 |   const active = chart.locator('[data-slot="cell"][data-active="true"]');
  269 |   await expect(active).toHaveCount(1);
  270 |   const facts = await active.evaluate(node => {
  271 |     const cell = node.getBoundingClientRect(), heading = node.parentElement!.querySelector("th")!.getBoundingClientRect();
  272 |     const region = node.closest('[data-slot="scroll-container"]')!.getBoundingClientRect();
  273 |     return { left: cell.left, right: cell.right, headingRight: heading.right, regionRight: region.right, row: node.getAttribute("data-row-id"), column: node.getAttribute("data-column-id") };
  274 |   });
  275 |   await record("keyboard-scrolled-focus", facts);
  276 |   expect(facts.left).toBeGreaterThanOrEqual(facts.headingRight - 1);
  277 |   expect(facts.right).toBeLessThanOrEqual(facts.regionRight + 1);
  278 | });
  279 | 
  280 | test("semester legend shows the eight discrete semesters without fractional intervals", async ({ page }) => {
  281 |   await open(page);
  282 |   const legend = matrix(page, "course-version").locator('[data-slot="legend"]');
  283 |   const labels = await legend.getByRole("button").evaluateAll(nodes => nodes.map(node => node.getAttribute("aria-label") ?? node.textContent!.trim()));
  284 |   await record("semester-legend", { labels });
  285 |   expect(labels).toHaveLength(8);
  286 |   labels.forEach((label, index) => {
  287 |     expect(label).not.toMatch(/\d+\.\d+/);
  288 |     expect(label.match(/\d+/g)).toEqual([String(index + 1)]);
  289 |   });
  290 | });
  291 | 
  292 | test("zero-to-large bubble transition never paints a visible glyph beyond its current circle", async ({ page }) => {
  293 |   await open(page, false);
  294 |   const control = page.getByRole("combobox", { name: "业务数据状态" });
  295 |   await control.selectOption("zero");
  296 |   const chart = matrix(page, "course-count"), target = cell(chart, "category-6", "college-6");
  297 |   await chart.scrollIntoViewIfNeeded();
  298 |   await page.mouse.move(0, 0);
  299 |   await page.waitForTimeout(1800);
  300 |   await target.evaluate(node => node.setAttribute("data-test-painted-coordinate", "true"));
  301 |   await control.evaluate(node => { (node as HTMLSelectElement).value = "normal"; node.dispatchEvent(new Event("change", { bubbles: true })); });
  302 |   const frames = await target.evaluate(async node => {
  303 |     const frames: { time: number; radius: number; visible: boolean; farthestGlyphCorner: number }[] = [], start = performance.now();
  304 |     await new Promise<void>(resolve => {
  305 |       const sample = (now: number) => {
  306 |         const circle = node.querySelector<SVGCircleElement>("circle")!, text = node.querySelector<SVGTextElement>('text[data-slot="reading"]')!;
  307 |         const bounds = circle.getBoundingClientRect(), center = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
  308 |         const textBounds = text.getBBox(), transform = text.getScreenCTM()!;
  309 |         const corners = [[textBounds.x, textBounds.y], [textBounds.x + textBounds.width, textBounds.y], [textBounds.x, textBounds.y + textBounds.height], [textBounds.x + textBounds.width, textBounds.y + textBounds.height]];
  310 |         const farthestGlyphCorner = Math.max(...corners.map(([x, y]) => { const point = new DOMPoint(x, y).matrixTransform(transform); return Math.hypot(point.x - center.x, point.y - center.y); }));
  311 |         let opacity = 1;
  312 |         for (let parent: Element | null = text; parent && parent !== node; parent = parent.parentElement) opacity *= Number(getComputedStyle(parent).opacity);
  313 |         frames.push({ time: now - start, radius: bounds.width / 2, visible: getComputedStyle(text).visibility === "visible" && opacity > .01, farthestGlyphCorner });
  314 |         if (now - start < 900) requestAnimationFrame(sample); else resolve();
  315 |       };
  316 |       requestAnimationFrame(sample);
  317 |     });
  318 |     return frames;
  319 |   });
  320 |   await record("painted-bubble-fit", { frames, tolerancePx: 1 });
  321 |   await expect(target).toHaveAttribute("data-test-painted-coordinate", "true");
  322 |   expect(frames.some(frame => frame.visible)).toBe(true);
> 323 |   expect(frames.filter(frame => frame.visible).every(frame => frame.farthestGlyphCorner <= frame.radius + 1)).toBe(true);
      |                                                                                                               ^ Error: expect(received).toBe(expected) // Object.is equality
  324 | });
  325 | 
  326 | test("heat readout tone follows the painted light-to-dark and dark-to-light fill without a plate", async ({ page }) => {
  327 |   await open(page, false);
  328 |   const control = page.getByRole("combobox", { name: "业务数据状态" });
  329 |   await control.selectOption("zero");
  330 |   const chart = matrix(page, "course-similarity"), target = cell(chart, "course-4", "course-1");
  331 |   await chart.scrollIntoViewIfNeeded();
  332 |   await page.mouse.move(0, 0);
  333 |   await page.waitForTimeout(1800);
  334 |   const results = [];
  335 |   for (const state of ["normal", "zero"]) {
  336 |     await control.evaluate((node, state) => { (node as HTMLSelectElement).value = state; node.dispatchEvent(new Event("change", { bubbles: true })); }, state);
  337 |     const frames = await target.evaluate(async node => {
  338 |       const luminance = (color: string) => {
  339 |         const rgb = color.match(/^rgba?\((.+)\)$/), srgb = color.match(/^color\(srgb (.+)\)$/);
  340 |         const channels = (rgb?.[1] ?? srgb?.[1] ?? "").split(/[\s,\/]+/).filter(Boolean).slice(0, 3).map(part => parseFloat(part) / (part.endsWith("%") ? 100 : rgb ? 255 : 1));
  341 |         return channels.map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index]!, 0);
  342 |       };
  343 |       const chart = node.closest('[data-rain-id="ui-chart-matrix"]')!;
  344 |       const dark = luminance(getComputedStyle(chart.querySelector(".rain-matrix__color-probe--dark")!).color);
  345 |       const light = luminance(getComputedStyle(chart.querySelector(".rain-matrix__color-probe--light")!).color);
  346 |       const frames: { time: number; background: string; readout: string; plate: string; chosenRatio: number; bestRatio: number }[] = [], start = performance.now();
  347 |       await new Promise<void>(resolve => {
  348 |         const sample = (now: number) => {
  349 |           const mark = node.querySelector('[data-slot="cell-mark"]')!, reading = node.querySelector('[data-slot="reading"]')!, container = node.querySelector('[data-slot="reading-container"]')!;
  350 |           const background = getComputedStyle(mark).backgroundColor, readout = getComputedStyle(reading).color, fill = luminance(background);
  351 |           const ratio = (tone: number) => (Math.max(tone, fill) + .05) / (Math.min(tone, fill) + .05);
  352 |           frames.push({ time: now - start, background, readout, plate: getComputedStyle(container).backgroundColor, chosenRatio: ratio(luminance(readout)), bestRatio: Math.max(ratio(dark), ratio(light)) });
  353 |           if (now - start < 900) requestAnimationFrame(sample); else resolve();
  354 |         };
  355 |         requestAnimationFrame(sample);
  356 |       });
  357 |       return frames;
  358 |     });
  359 |     results.push({ state, frames });
  360 |   }
  361 |   await record("painted-heat-tone", { results, contrastChoiceTolerance: .1 });
  362 |   for (const { frames } of results) {
  363 |     expect(new Set(frames.map(frame => frame.background)).size).toBeGreaterThan(2);
  364 |     expect(frames.every(frame => frame.plate === "rgba(0, 0, 0, 0)")).toBe(true);
  365 |     expect(frames.every(frame => frame.chosenRatio >= frame.bestRatio - .1)).toBe(true);
  366 |   }
  367 | });
  368 | 
```