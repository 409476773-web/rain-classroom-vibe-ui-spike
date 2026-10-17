# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-matrix-refinement.spec.ts >> semester legend shows the eight discrete semesters without fractional intervals
- Location: tests/e2e/chart-business-matrix-refinement.spec.ts:280:1

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 8
Received length: 5
Received array:  ["1–2.4", "2.4–3.8", "3.8–5.2", "5.2–6.6", "6.6–8"]
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
  - status [ref=e26]: 示例数据 · 更新 0 次 · 已按系统设置减少动效
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
            - generic [ref=e49]: 25 人
          - listitem [ref=e50]:
            - generic [ref=e51]: 经济管理学院
            - generic [ref=e54]: 50 人
          - listitem [ref=e55]:
            - generic [ref=e56]: 人文学院
            - generic [ref=e59]: 100 人
          - listitem [ref=e60]:
            - generic [ref=e61]: 理学院
            - generic [ref=e64]: 75 人
          - listitem [ref=e65]:
            - generic [ref=e66]: 外国语学院
            - generic [ref=e69]: 45 人
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
        - figure "数量条 · 紧凑 本期人数 · 25 人" [ref=e149]:
          - generic [ref=e155]:
            - strong [ref=e156]: 数量条 · 紧凑
            - generic [ref=e157]: 本期人数 · 25 人
        - figure "数量条 · 舒展 本期人数 · 25 人" [ref=e158]:
          - generic [ref=e164]:
            - strong [ref=e165]: 数量条 · 舒展
            - generic [ref=e166]: 本期人数 · 25 人
        - figure "构成分段 · 紧凑 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e167]:
          - generic [ref=e184]:
            - strong [ref=e185]: 构成分段 · 紧凑
            - list [ref=e186]:
              - listitem [ref=e187]:
                - text: 已完成
                - generic [ref=e189]: 13 人
              - listitem [ref=e190]:
                - text: 进行中
                - generic [ref=e192]: 8 人
              - listitem [ref=e193]:
                - text: 待开始
                - generic [ref=e195]: 4 人
        - figure "构成分段 · 舒展 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e196]:
          - generic [ref=e213]:
            - strong [ref=e214]: 构成分段 · 舒展
            - list [ref=e215]:
              - listitem [ref=e216]:
                - text: 已完成
                - generic [ref=e218]: 13 人
              - listitem [ref=e219]:
                - text: 进行中
                - generic [ref=e221]: 8 人
              - listitem [ref=e222]:
                - text: 待开始
                - generic [ref=e224]: 4 人
        - figure "每日柱图 · 紧凑 近8天每日人数 · 共同上限 88 人" [ref=e225]:
          - generic [ref=e245]:
            - strong [ref=e246]: 每日柱图 · 紧凑
            - generic [ref=e247]: 近8天每日人数 · 共同上限 88 人
        - figure "每日柱图 · 舒展 近8天每日人数 · 共同上限 88 人" [ref=e248]:
          - generic [ref=e268]:
            - strong [ref=e269]: 每日柱图 · 舒展
            - generic [ref=e270]: 近8天每日人数 · 共同上限 88 人
        - figure "小饼 · 紧凑 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e271]:
          - generic [ref=e280]:
            - strong [ref=e281]: 小饼 · 紧凑
            - list [ref=e282]:
              - listitem [ref=e283]:
                - text: 已完成
                - generic [ref=e285]: 13 人
              - listitem [ref=e286]:
                - text: 进行中
                - generic [ref=e288]: 8 人
              - listitem [ref=e289]:
                - text: 待开始
                - generic [ref=e291]: 4 人
        - figure "小饼 · 舒展 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e292]:
          - generic [ref=e301]:
            - strong [ref=e302]: 小饼 · 舒展
            - list [ref=e303]:
              - listitem [ref=e304]:
                - text: 已完成
                - generic [ref=e306]: 13 人
              - listitem [ref=e307]:
                - text: 进行中
                - generic [ref=e309]: 8 人
              - listitem [ref=e310]:
                - text: 待开始
                - generic [ref=e312]: 4 人
        - figure "环饼 · 紧凑 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e313]:
          - generic [ref=e322]:
            - strong [ref=e323]: 环饼 · 紧凑
            - list [ref=e324]:
              - listitem [ref=e325]:
                - text: 已完成
                - generic [ref=e327]: 13 人
              - listitem [ref=e328]:
                - text: 进行中
                - generic [ref=e330]: 8 人
              - listitem [ref=e331]:
                - text: 待开始
                - generic [ref=e333]: 4 人
        - figure "环饼 · 舒展 已完成 13 人 进行中 8 人 待开始 4 人" [ref=e334]:
          - generic [ref=e343]:
            - strong [ref=e344]: 环饼 · 舒展
            - list [ref=e345]:
              - listitem [ref=e346]:
                - text: 已完成
                - generic [ref=e348]: 13 人
              - listitem [ref=e349]:
                - text: 进行中
                - generic [ref=e351]: 8 人
              - listitem [ref=e352]:
                - text: 待开始
                - generic [ref=e354]: 4 人
        - figure "完成环 · 紧凑 完成 20 人 · 目标 100 人 · 20%" [ref=e355]:
          - img [ref=e362]:
            - generic [ref=e364] [cursor=pointer]
          - generic [ref=e367]:
            - strong [ref=e368]: 完成环 · 紧凑
            - generic [ref=e369]: 完成 20 人 · 目标 100 人 · 20%
        - figure "完成环 · 舒展 完成 20 人 · 目标 100 人" [ref=e370]:
          - generic [ref=e372]:
            - img [ref=e377]:
              - generic [ref=e379] [cursor=pointer]
            - generic:
              - strong: 20%
              - generic: 完成率
          - generic [ref=e382]:
            - strong [ref=e383]: 完成环 · 舒展
            - generic [ref=e384]: 完成 20 人 · 目标 100 人
        - figure "完成弧 · 紧凑 完成 20 人 · 目标 100 人 · 20%" [ref=e385]:
          - img [ref=e392]:
            - generic [ref=e394] [cursor=pointer]
          - generic [ref=e397]:
            - strong [ref=e398]: 完成弧 · 紧凑
            - generic [ref=e399]: 完成 20 人 · 目标 100 人 · 20%
        - figure "完成弧 · 舒展 完成 20 人 · 目标 100 人" [ref=e400]:
          - generic [ref=e402]:
            - img [ref=e407]:
              - generic [ref=e409] [cursor=pointer]
            - generic:
              - strong: 20%
              - generic: 完成率
          - generic [ref=e412]:
            - strong [ref=e413]: 完成弧 · 舒展
            - generic [ref=e414]: 完成 20 人 · 目标 100 人
        - figure [ref=e415]:
          - generic [ref=e428]:
            - strong [ref=e429]: 折线走势 · 紧凑
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e430]:
          - generic [ref=e443]:
            - strong [ref=e444]: 折线走势 · 舒展
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e445]:
          - generic [ref=e459]:
            - strong [ref=e460]: 面积走势 · 紧凑
            - text: 近8天每日人数 · 观察变化
        - figure [ref=e461]:
          - generic [ref=e475]:
            - strong [ref=e476]: 面积走势 · 舒展
            - text: 近8天每日人数 · 观察变化
    - region [ref=e477]:
      - heading "指标卡：舒展型号" [level=2] [ref=e478]
      - generic [ref=e479]:
        - article [ref=e480]:
          - heading "本期参与人数" [level=3] [ref=e482]
          - generic [ref=e483]:
            - generic [ref=e484]: 25 人
            - paragraph [ref=e497]: 近8天每日人数 · 趋势按自身范围展开
        - article [ref=e498]:
          - heading "课程构成" [level=3] [ref=e500]
          - generic [ref=e501]:
            - generic [ref=e502]: 25 门
            - generic [ref=e511]:
              - generic [ref=e512]:
                - text: 已完成
                - generic [ref=e514]: "13"
              - generic [ref=e515]:
                - text: 进行中
                - generic [ref=e517]: "8"
              - generic [ref=e518]:
                - text: 待开始
                - generic [ref=e520]: "4"
        - article [ref=e521]:
          - heading "目标完成" [level=3] [ref=e523]
          - generic [ref=e524]:
            - generic [ref=e525]:
              - generic [ref=e526]:
                - img [ref=e531]:
                  - generic [ref=e533] [cursor=pointer]
                - generic:
                  - strong: 20%
                  - generic: 完成率
              - generic [ref=e536]: 已完成 20 项
            - paragraph [ref=e537]: 目标 100 项
    - region [ref=e538]:
      - heading "表格：紧凑型号，一起比较" [level=2] [ref=e539]
      - paragraph [ref=e540]: 参与人数共用 0—100 人量程；每日柱图共用 0—88 人量程。折线用于看各自走势；点击学院名称读取每个数据点。
      - region "学院数据与迷你图表" [ref=e541]:
        - table [ref=e542]:
          - rowgroup [ref=e543]:
            - row [ref=e544]:
              - columnheader "学院" [ref=e545]
              - columnheader "参与人数" [ref=e546]
              - columnheader "近8天趋势" [ref=e547]
              - columnheader "每日分布" [ref=e548]
              - columnheader "课程构成" [ref=e549]
              - columnheader "目标完成" [ref=e550]
          - rowgroup [ref=e551]:
            - row [ref=e552]:
              - cell [ref=e553]:
                - button "计算机学院" [ref=e554] [cursor=pointer]
              - cell "25 人" [ref=e556]
              - cell [ref=e561]
              - cell [ref=e564]
              - cell "共 25 门" [ref=e567]:
                - generic "已完成 13 / 进行中 8 / 待开始 4" [ref=e568]: 共 25 门
              - cell "20%" [ref=e572]
            - row [ref=e577]:
              - cell [ref=e578]:
                - button "经济管理学院" [ref=e579] [cursor=pointer]
              - cell "50 人" [ref=e581]
              - cell [ref=e586]
              - cell [ref=e589]
              - cell "共 50 门" [ref=e592]:
                - generic "已完成 25 / 进行中 15 / 待开始 10" [ref=e593]: 共 50 门
              - cell "35%" [ref=e597]
            - row [ref=e602]:
              - cell [ref=e603]:
                - button "人文学院" [ref=e604] [cursor=pointer]
              - cell "100 人" [ref=e606]
              - cell [ref=e611]
              - cell [ref=e614]
              - cell "共 100 门" [ref=e617]:
                - generic "已完成 50 / 进行中 30 / 待开始 20" [ref=e618]: 共 100 门
              - cell "50%" [ref=e622]
            - row [ref=e627]:
              - cell [ref=e628]:
                - button "理学院" [ref=e629] [cursor=pointer]
              - cell "75 人" [ref=e631]
              - cell [ref=e636]
              - cell [ref=e639]
              - cell "共 75 门" [ref=e642]:
                - generic "已完成 38 / 进行中 23 / 待开始 14" [ref=e643]: 共 75 门
              - cell "65%" [ref=e647]
            - row [ref=e652]:
              - cell [ref=e653]:
                - button "外国语学院" [ref=e654] [cursor=pointer]
              - cell "45 人" [ref=e656]
              - cell [ref=e661]
              - cell [ref=e664]
              - cell "共 45 门" [ref=e667]:
                - generic "已完成 23 / 进行中 14 / 待开始 8" [ref=e668]: 共 45 门
              - cell "80%" [ref=e672]
    - region [ref=e677]:
      - heading "课程列表：读数就近成组" [level=2] [ref=e678]
      - list [ref=e679]:
        - listitem [ref=e680]:
          - strong [ref=e682]: 计算机学院 · 教学任务
          - generic [ref=e683]: 评分 2.5 / 10
          - generic [ref=e687]:
            - img [ref=e693]:
              - generic [ref=e695] [cursor=pointer]
            - generic [ref=e698]:
              - generic [ref=e699]: 20%
              - generic [ref=e700]: 已完成 20 / 100 项
        - listitem [ref=e701]:
          - strong [ref=e703]: 经济管理学院 · 教学任务
          - generic [ref=e704]: 评分 5.0 / 10
          - generic [ref=e708]:
            - img [ref=e714]:
              - generic [ref=e716] [cursor=pointer]
            - generic [ref=e719]:
              - generic [ref=e720]: 35%
              - generic [ref=e721]: 已完成 35 / 100 项
        - listitem [ref=e722]:
          - strong [ref=e724]: 人文学院 · 教学任务
          - generic [ref=e725]: 评分 10.0 / 10
          - generic [ref=e729]:
            - img [ref=e735]:
              - generic [ref=e737] [cursor=pointer]
            - generic [ref=e740]:
              - generic [ref=e741]: 50%
              - generic [ref=e742]: 已完成 50 / 100 项
      - generic [ref=e743]:
        - generic [ref=e744]:
          - img [ref=e749]:
            - generic [ref=e751] [cursor=pointer]
          - generic:
            - strong: 20%
            - generic: 完成率
        - generic [ref=e754]:
          - strong [ref=e755]: 计算机学院 · 本期教学任务
          - paragraph [ref=e756]: 已完成 20 / 100 项
    - region [ref=e757]:
      - heading "分类交叉矩阵" [level=2] [ref=e758]
      - paragraph [ref=e759]: 示例数据
      - group "相似度矩阵规模" [ref=e760]:
        - button "4×4" [ref=e761] [cursor=pointer]
        - button "6×6" [pressed] [ref=e763] [cursor=pointer]
        - button "12×12" [ref=e765] [cursor=pointer]
      - region "每周学习时段 · 次数" [ref=e767]:
        - generic [ref=e768]:
          - generic [ref=e769]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=e770]
          - region "每周学习时段 · 次数，可横向滚动" [ref=e771]:
            - table [ref=e772]:
              - caption [ref=e773]: 每周学习时段 · 次数
              - rowgroup [ref=e800]:
                - row [ref=e801]:
                  - columnheader "星期" [ref=e802]
                  - columnheader "00:00" [ref=e803]
                  - columnheader "01:00" [ref=e804]
                  - columnheader "02:00" [ref=e805]
                  - columnheader "03:00" [ref=e806]
                  - columnheader "04:00" [ref=e807]
                  - columnheader "05:00" [ref=e808]
                  - columnheader "06:00" [ref=e809]
                  - columnheader "07:00" [ref=e810]
                  - columnheader "08:00" [ref=e811]
                  - columnheader "09:00" [ref=e812]
                  - columnheader "10:00" [ref=e813]
                  - columnheader "11:00" [ref=e814]
                  - columnheader "12:00" [ref=e815]
                  - columnheader "13:00" [ref=e816]
                  - columnheader "14:00" [ref=e817]
                  - columnheader "15:00" [ref=e818]
                  - columnheader "16:00" [ref=e819]
                  - columnheader "17:00" [ref=e820]
                  - columnheader "18:00" [ref=e821]
                  - columnheader "19:00" [ref=e822]
                  - columnheader "20:00" [ref=e823]
                  - columnheader "21:00" [ref=e824]
                  - columnheader "22:00" [ref=e825]
                  - columnheader "23:00" [ref=e826]
              - rowgroup [ref=e827]:
                - row [ref=e828]:
                  - rowheader "周一" [ref=e829]
                  - cell "0" [ref=e830]
                  - cell "3" [ref=e834]
                  - cell "6" [ref=e838]
                  - cell "9" [ref=e842]
                  - cell "12" [ref=e846]
                  - cell "15" [ref=e850]
                  - cell "18" [ref=e854]
                  - cell "0" [ref=e858]
                  - cell "3" [ref=e862]
                  - cell "6" [ref=e866]
                  - cell "9" [ref=e870]
                  - cell "12" [ref=e874]
                  - cell "15" [ref=e878]
                  - cell "18" [ref=e882]
                  - cell "0" [ref=e886]
                  - cell "3" [ref=e890]
                  - cell "6" [ref=e894]
                  - cell "9" [ref=e898]
                  - cell "12" [ref=e902]
                  - cell "15" [ref=e906]
                  - cell "18" [ref=e910]
                  - cell "0" [ref=e914]
                  - cell "3" [ref=e918]
                  - cell "6" [ref=e922]
                - row [ref=e926]:
                  - rowheader "周二" [ref=e927]
                  - cell "7" [ref=e928]
                  - cell "10" [ref=e932]
                  - cell "13" [ref=e936]
                  - cell "16" [ref=e940]
                  - cell "19" [ref=e944]
                  - cell "1" [ref=e948]
                  - cell "4" [ref=e952]
                  - cell "7" [ref=e956]
                  - cell "10" [ref=e960]
                  - cell "13" [ref=e964]
                  - cell "16" [ref=e968]
                  - cell "19" [ref=e972]
                  - cell "1" [ref=e976]
                  - cell "4" [ref=e980]
                  - cell "7" [ref=e984]
                  - cell "10" [ref=e988]
                  - cell "13" [ref=e992]
                  - cell "16" [ref=e996]
                  - cell "19" [ref=e1000]
                  - cell "1" [ref=e1004]
                  - cell "4" [ref=e1008]
                  - cell "7" [ref=e1012]
                  - cell "10" [ref=e1016]
                  - cell "13" [ref=e1020]
                - row [ref=e1024]:
                  - rowheader "周三" [ref=e1025]
                  - cell "14" [ref=e1026]
                  - cell "17" [ref=e1030]
                  - cell "20" [ref=e1034]
                  - cell "2" [ref=e1038]
                  - cell "5" [ref=e1042]
                  - cell "8" [ref=e1046]
                  - cell "11" [ref=e1050]
                  - cell "14" [ref=e1054]
                  - cell "17" [ref=e1058]
                  - cell "20" [ref=e1062]
                  - cell "2" [ref=e1066]
                  - cell "5" [ref=e1070]
                  - cell "8" [ref=e1074]
                  - cell "11" [ref=e1078]
                  - cell "14" [ref=e1082]
                  - cell "17" [ref=e1086]
                  - cell "20" [ref=e1090]
                  - cell "2" [ref=e1094]
                  - cell "5" [ref=e1098]
                  - cell "8" [ref=e1102]
                  - cell "11" [ref=e1106]
                  - cell "14" [ref=e1110]
                  - cell "17" [ref=e1114]
                  - cell "20" [ref=e1118]
                - row [ref=e1122]:
                  - rowheader "周四" [ref=e1123]
                  - cell "0" [ref=e1124]
                  - cell "3" [ref=e1128]
                  - cell "6" [ref=e1132]
                  - cell "9" [ref=e1136]
                  - cell "12" [ref=e1140]
                  - cell "15" [ref=e1144]
                  - cell "18" [ref=e1148]
                  - cell "0" [ref=e1152]
                  - cell "3" [ref=e1156]
                  - cell "6" [ref=e1160]
                  - cell "9" [ref=e1164]
                  - cell "12" [ref=e1168]
                  - cell "15" [ref=e1172]
                  - cell "18" [ref=e1176]
                  - cell "0" [ref=e1180]
                  - cell "3" [ref=e1184]
                  - cell "6" [ref=e1188]
                  - cell "9" [ref=e1192]
                  - cell "12" [ref=e1196]
                  - cell "15" [ref=e1200]
                  - cell "18" [ref=e1204]
                  - cell "0" [ref=e1208]
                  - cell "3" [ref=e1212]
                  - cell "6" [ref=e1216]
                - row [ref=e1220]:
                  - rowheader "周五" [ref=e1221]
                  - cell "7" [ref=e1222]
                  - cell "10" [ref=e1226]
                  - cell "13" [ref=e1230]
                  - cell "16" [ref=e1234]
                  - cell "19" [ref=e1238]
                  - cell "1" [ref=e1242]
                  - cell "4" [ref=e1246]
                  - cell "7" [ref=e1250]
                  - cell "10" [ref=e1254]
                  - cell "13" [ref=e1258]
                  - cell "16" [ref=e1262]
                  - cell "19" [ref=e1266]
                  - cell "1" [ref=e1270]
                  - cell "4" [ref=e1274]
                  - cell "7" [ref=e1278]
                  - cell "10" [ref=e1282]
                  - cell "13" [ref=e1286]
                  - cell "16" [ref=e1290]
                  - cell "19" [ref=e1294]
                  - cell "1" [ref=e1298]
                  - cell "4" [ref=e1302]
                  - cell "7" [ref=e1306]
                  - cell "10" [ref=e1310]
                  - cell "13" [ref=e1314]
                - row [ref=e1318]:
                  - rowheader "周六" [ref=e1319]
                  - cell "14" [ref=e1320]
                  - cell "17" [ref=e1324]
                  - cell "20" [ref=e1328]
                  - cell "2" [ref=e1332]
                  - cell "5" [ref=e1336]
                  - cell "8" [ref=e1340]
                  - cell "11" [ref=e1344]
                  - cell "14" [ref=e1348]
                  - cell "17" [ref=e1352]
                  - cell "20" [ref=e1356]
                  - cell "2" [ref=e1360]
                  - cell "5" [ref=e1364]
                  - cell "8" [ref=e1368]
                  - cell "11" [ref=e1372]
                  - cell "14" [ref=e1376]
                  - cell "17" [ref=e1380]
                  - cell "20" [ref=e1384]
                  - cell "2" [ref=e1388]
                  - cell "5" [ref=e1392]
                  - cell "8" [ref=e1396]
                  - cell "11" [ref=e1400]
                  - cell "14" [ref=e1404]
                  - cell "17" [ref=e1408]
                  - cell "20" [ref=e1412]
                - row [ref=e1416]:
                  - rowheader "周日" [ref=e1417]
                  - cell "0" [ref=e1418]
                  - cell "3" [ref=e1422]
                  - cell "6" [ref=e1426]
                  - cell "9" [ref=e1430]
                  - cell "12" [ref=e1434]
                  - cell "15" [ref=e1438]
                  - cell "18" [ref=e1442]
                  - cell "0" [ref=e1446]
                  - cell "3" [ref=e1450]
                  - cell "6" [ref=e1454]
                  - cell "9" [ref=e1458]
                  - cell "12" [ref=e1462]
                  - cell "15" [ref=e1466]
                  - cell "18" [ref=e1470]
                  - cell "0" [ref=e1474]
                  - cell "3" [ref=e1478]
                  - cell "6" [ref=e1482]
                  - cell "9" [ref=e1486]
                  - cell "12" [ref=e1490]
                  - cell "15" [ref=e1494]
                  - cell "18" [ref=e1498]
                  - cell "0" [ref=e1502]
                  - cell "3" [ref=e1506]
                  - cell "缺测" [ref=e1510]
          - list "每周学习时段 · 次数图例" [ref=e1513]:
            - listitem [ref=e1514]:
              - generic [ref=e1515]:
                - button "0–4" [ref=e1516] [cursor=pointer]
                - button "4–8" [ref=e1517] [cursor=pointer]
                - button "8–12" [ref=e1518] [cursor=pointer]
                - button "12–16" [ref=e1519] [cursor=pointer]
                - button "16–20" [ref=e1520] [cursor=pointer]
              - generic [ref=e1521]:
                - generic [ref=e1522]: "0"
                - generic [ref=e1523]: "20"
        - paragraph [ref=e1524]: 按星期与小时比较学习次数，0 也是有效观测。
      - region "课程与培养方案版本 · 开课学期" [ref=e1525]:
        - generic [ref=e1526]:
          - generic [ref=e1527]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=e1528]
          - region "课程与培养方案版本 · 开课学期，可横向滚动" [ref=e1529]:
            - table [ref=e1530]:
              - caption [ref=e1531]: 课程与培养方案版本 · 开课学期
              - rowgroup [ref=e1538]:
                - row [ref=e1539]:
                  - columnheader "课程" [ref=e1540]
                  - columnheader "2022 版" [ref=e1541]
                  - columnheader "2023 版" [ref=e1542]
                  - columnheader "2024 版" [ref=e1543]
                  - columnheader "2025 版" [ref=e1544]
              - rowgroup [ref=e1545]:
                - row [ref=e1546]:
                  - rowheader "高等数学" [ref=e1547]
                  - cell "1" [ref=e1548]
                  - cell "2" [ref=e1552]
                  - cell "未设学期" [ref=e1556]
                  - cell "4" [ref=e1559]
                - row [ref=e1563]:
                  - rowheader "线性代数" [ref=e1564]
                  - cell "2" [ref=e1565]
                  - cell "3" [ref=e1569]
                  - cell "4" [ref=e1573]
                  - cell "5" [ref=e1577]
                - row [ref=e1581]:
                  - rowheader "概率论与数理统计" [ref=e1582]
                  - cell "3" [ref=e1583]
                  - cell "无该课程" [ref=e1587]:
                    - generic [ref=e1588]: —
                  - cell "5" [ref=e1590]
                  - cell "6" [ref=e1594]
                - row [ref=e1598]:
                  - rowheader "大学物理" [ref=e1599]
                  - cell "4" [ref=e1600]
                  - cell "5" [ref=e1604]
                  - cell "6" [ref=e1608]
                  - cell "7" [ref=e1612]
                - row [ref=e1616]:
                  - rowheader "程序设计基础" [ref=e1617]
                  - cell "5" [ref=e1618]
                  - cell "6" [ref=e1622]
                  - cell "7" [ref=e1626]
                  - cell "8" [ref=e1630]
                - row [ref=e1634]:
                  - rowheader "数据结构" [ref=e1635]
                  - cell "6" [ref=e1636]
                  - cell "7" [ref=e1640]
                  - cell "8" [ref=e1644]
                  - cell "1" [ref=e1648]
          - list "课程与培养方案版本 · 开课学期图例" [ref=e1652]:
            - listitem [ref=e1653]:
              - generic [ref=e1654]:
                - button "1–2.4" [ref=e1655] [cursor=pointer]
                - button "2.4–3.8" [ref=e1656] [cursor=pointer]
                - button "3.8–5.2" [ref=e1657] [cursor=pointer]
                - button "5.2–6.6" [ref=e1658] [cursor=pointer]
                - button "6.6–8" [ref=e1659] [cursor=pointer]
              - generic [ref=e1660]:
                - generic [ref=e1661]: "1"
                - generic [ref=e1662]: "2"
                - generic [ref=e1663]: "3"
                - generic [ref=e1664]: "4"
                - generic [ref=e1665]: "5"
                - generic [ref=e1666]: "6"
                - generic [ref=e1667]: "7"
                - generic [ref=e1668]: "8"
        - paragraph [ref=e1669]: 学期按 1—8 排列；未设学期与无该课程分别记录。
      - region "课程相似度" [ref=e1670]:
        - generic [ref=e1671]:
          - generic [ref=e1672]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=e1673]
          - region "课程相似度，可横向滚动" [ref=e1674]:
            - table [ref=e1675]:
              - caption [ref=e1676]: 课程相似度
              - rowgroup [ref=e1685]:
                - row [ref=e1686]:
                  - columnheader "课程" [ref=e1687]
                  - columnheader "高等数学" [ref=e1688]
                  - columnheader "线性代数" [ref=e1689]
                  - columnheader "概率论与数理统计" [ref=e1690]
                  - columnheader "大学物理" [ref=e1691]
                  - columnheader "程序设计基础" [ref=e1692]
                  - columnheader "数据结构" [ref=e1693]
              - rowgroup [ref=e1694]:
                - row [ref=e1695]:
                  - rowheader "高等数学" [ref=e1696]
                  - cell "缺测" [ref=e1697]
                  - cell "30%" [ref=e1700]
                  - cell "60%" [ref=e1704]
                  - cell "90%" [ref=e1708]
                  - cell "10%" [ref=e1712]
                  - cell "40%" [ref=e1716]
                - row [ref=e1720]:
                  - rowheader "线性代数" [ref=e1721]
                  - cell "70%" [ref=e1722]
                  - cell "100%" [ref=e1726]
                  - cell "20%" [ref=e1730]
                  - cell "50%" [ref=e1734]
                  - cell "80%" [ref=e1738]
                  - cell "0%" [ref=e1742]
                - row [ref=e1746]:
                  - rowheader "概率论与数理统计" [ref=e1747]
                  - cell "30%" [ref=e1748]
                  - cell "60%" [ref=e1752]
                  - cell "90%" [ref=e1756]
                  - cell "10%" [ref=e1760]
                  - cell "40%" [ref=e1764]
                  - cell "70%" [ref=e1768]
                - row [ref=e1772]:
                  - rowheader "大学物理" [ref=e1773]
                  - cell "100%" [ref=e1774]
                  - cell "20%" [ref=e1778]
                  - cell "50%" [ref=e1782]
                  - cell "缺测" [ref=e1786]
                  - cell "0%" [ref=e1789]
                  - cell "30%" [ref=e1793]
                - row [ref=e1797]:
                  - rowheader "程序设计基础" [ref=e1798]
                  - cell "60%" [ref=e1799]
                  - cell "90%" [ref=e1803]
                  - cell "10%" [ref=e1807]
                  - cell "40%" [ref=e1811]
                  - cell "70%" [ref=e1815]
                  - cell "100%" [ref=e1819]
                - row [ref=e1823]:
                  - rowheader "数据结构" [ref=e1824]
                  - cell "20%" [ref=e1825]
                  - cell "50%" [ref=e1829]
                  - cell "80%" [ref=e1833]
                  - cell "0%" [ref=e1837]
                  - cell "30%" [ref=e1841]
                  - cell "60%" [ref=e1845]
          - list "课程相似度图例" [ref=e1849]:
            - listitem [ref=e1850]:
              - generic [ref=e1851]:
                - button "0%–20%" [ref=e1852] [cursor=pointer]
                - button "20%–40%" [ref=e1853] [cursor=pointer]
                - button "40%–60%" [ref=e1854] [cursor=pointer]
                - button "60%–80%" [ref=e1855] [cursor=pointer]
                - button "80%–100%" [ref=e1856] [cursor=pointer]
              - generic [ref=e1857]:
                - generic [ref=e1858]: 0%
                - generic [ref=e1859]: 100%
        - paragraph [ref=e1860]: 同一课程对应两轴；方向不同的读数分别保留，缺测位置留空。
      - region "课程类别与学院 · 课程数" [ref=e1861]:
        - generic [ref=e1862]:
          - generic [ref=e1863]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=e1864]
          - region "课程类别与学院 · 课程数，可横向滚动" [ref=e1865]:
            - table [ref=e1866]:
              - caption [ref=e1867]: 课程类别与学院 · 课程数
              - rowgroup [ref=e1876]:
                - row [ref=e1877]:
                  - columnheader "课程类别" [ref=e1878]
                  - columnheader "计算机学院" [ref=e1879]
                  - columnheader "经济管理学院" [ref=e1880]
                  - columnheader "人文学院" [ref=e1881]
                  - columnheader "理学院" [ref=e1882]
                  - columnheader "外国语学院" [ref=e1883]
                  - columnheader "教育学院" [ref=e1884]
              - rowgroup [ref=e1885]:
                - row [ref=e1886]:
                  - rowheader "通识课程" [ref=e1887]
                  - cell "0" [ref=e1888]
                  - cell "7" [ref=e1892]
                  - cell "14" [ref=e1896]
                  - cell "21" [ref=e1900]
                  - cell "28" [ref=e1904]
                  - cell "35" [ref=e1908]
                - row [ref=e1912]:
                  - rowheader "学科基础" [ref=e1913]
                  - cell "11" [ref=e1914]
                  - cell "18" [ref=e1918]
                  - cell "25" [ref=e1922]
                  - cell "32" [ref=e1926]
                  - cell "39" [ref=e1930]
                  - cell "46" [ref=e1934]:
                    - img [ref=e1936]:
                      - generic [ref=e1938]: "46"
                - row [ref=e1940]:
                  - rowheader "专业必修" [ref=e1941]
                  - cell "22" [ref=e1942]
                  - cell "29" [ref=e1946]
                  - cell "36" [ref=e1950]
                  - cell "43" [ref=e1954]
                  - cell "50" [ref=e1958]:
                    - img [ref=e1960]:
                      - generic [ref=e1962]: "50"
                  - cell "57" [ref=e1964]:
                    - img [ref=e1966]:
                      - generic [ref=e1968]: "57"
                - row [ref=e1970]:
                  - rowheader "专业选修" [ref=e1971]
                  - cell "33" [ref=e1972]
                  - cell "40" [ref=e1976]
                  - cell "47" [ref=e1980]:
                    - img [ref=e1982]:
                      - generic [ref=e1984]: "47"
                  - cell "54" [ref=e1986]:
                    - img [ref=e1988]:
                      - generic [ref=e1990]: "54"
                  - cell "61" [ref=e1992]:
                    - img [ref=e1994]:
                      - generic [ref=e1996]: "61"
                  - cell "68" [ref=e1998]:
                    - img [ref=e2000]:
                      - generic [ref=e2002]: "68"
                - row [ref=e2004]:
                  - rowheader "实践课程" [ref=e2005]
                  - cell "44" [ref=e2006]:
                    - img [ref=e2008]:
                      - generic [ref=e2010]: "44"
                  - cell "51" [ref=e2012]:
                    - img [ref=e2014]:
                      - generic [ref=e2016]: "51"
                  - cell "58" [ref=e2018]:
                    - img [ref=e2020]:
                      - generic [ref=e2022]: "58"
                  - cell "65" [ref=e2024]:
                    - img [ref=e2026]:
                      - generic [ref=e2028]: "65"
                  - cell "72" [ref=e2030]:
                    - img [ref=e2032]:
                      - generic [ref=e2034]: "72"
                  - cell "79" [ref=e2036]:
                    - img [ref=e2038]:
                      - generic [ref=e2040]: "79"
                - row [ref=e2042]:
                  - rowheader "创新课程" [ref=e2043]
                  - cell "55" [ref=e2044]:
                    - img [ref=e2046]:
                      - generic [ref=e2048]: "55"
                  - cell "62" [ref=e2050]:
                    - img [ref=e2052]:
                      - generic [ref=e2054]: "62"
                  - cell "69" [ref=e2056]:
                    - img [ref=e2058]:
                      - generic [ref=e2060]: "69"
                  - cell "76" [ref=e2062]:
                    - img [ref=e2064]:
                      - generic [ref=e2066]: "76"
                  - cell "83" [ref=e2068]:
                    - img [ref=e2070]:
                      - generic [ref=e2072]: "83"
                  - cell "90" [ref=e2074]:
                    - img [ref=e2076]:
                      - generic [ref=e2078]: "90"
          - list "课程类别与学院 · 课程数图例" [ref=e2080]:
            - button "25" [ref=e2081] [cursor=pointer]
            - button "50" [ref=e2086] [cursor=pointer]
            - button "100" [ref=e2091] [cursor=pointer]
        - paragraph [ref=e2096]: 圆面积与颜色深浅共用课程数量程；指向或用方向键查看精确课程数。
      - region "课程支撑关系" [ref=e2097]:
        - generic [ref=e2098]:
          - generic [ref=e2099]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=e2100]
          - region "课程支撑关系，可横向滚动" [ref=e2101]:
            - table [ref=e2102]:
              - caption [ref=e2103]: 课程支撑关系
              - rowgroup [ref=e2110]:
                - row [ref=e2111]:
                  - columnheader "课程" [ref=e2112]
                  - columnheader "知识与能力" [ref=e2113]
                  - columnheader "分析与表达" [ref=e2114]
                  - columnheader "协作与实践" [ref=e2115]
                  - columnheader "创新与反思" [ref=e2116]
              - rowgroup [ref=e2117]:
                - row [ref=e2118]:
                  - rowheader "高等数学" [ref=e2119]
                  - cell "无直接支撑" [ref=e2120]
                  - cell "一般支撑" [ref=e2124]
                  - cell "核心支撑" [ref=e2128]
                  - cell "无直接支撑" [ref=e2132]
                - row [ref=e2136]:
                  - rowheader "线性代数" [ref=e2137]
                  - cell "一般支撑" [ref=e2138]
                  - cell "核心支撑" [ref=e2142]
                  - cell "无直接支撑" [ref=e2146]
                  - cell "一般支撑" [ref=e2150]
                - row [ref=e2154]:
                  - rowheader "概率论与数理统计" [ref=e2155]
                  - cell "核心支撑" [ref=e2156]
                  - cell "无直接支撑" [ref=e2160]
                  - cell "一般支撑" [ref=e2164]
                  - cell "核心支撑" [ref=e2168]
                - row [ref=e2172]:
                  - rowheader "大学物理" [ref=e2173]
                  - cell "无直接支撑" [ref=e2174]
                  - cell "一般支撑" [ref=e2178]
                  - cell "核心支撑" [ref=e2182]
                  - cell "无直接支撑" [ref=e2186]
                - row [ref=e2190]:
                  - rowheader "程序设计基础" [ref=e2191]
                  - cell "一般支撑" [ref=e2192]
                  - cell "核心支撑" [ref=e2196]
                  - cell "无直接支撑" [ref=e2200]
                  - cell "一般支撑" [ref=e2204]
                - row [ref=e2208]:
                  - rowheader "数据结构" [ref=e2209]
                  - cell "核心支撑" [ref=e2210]
                  - cell "无直接支撑" [ref=e2214]
                  - cell "一般支撑" [ref=e2218]
                  - cell "核心支撑" [ref=e2222]
          - list "课程支撑关系图例" [ref=e2226]:
            - button "无直接支撑" [ref=e2227] [cursor=pointer]
            - button "一般支撑" [ref=e2232] [cursor=pointer]
            - button "核心支撑" [ref=e2237] [cursor=pointer]
        - paragraph [ref=e2242]: 支撑关系只有无直接支撑、一般支撑和核心支撑三个等级。
  - group [ref=e2243]:
    - generic "条形与嵌入组合源码" [ref=e2244] [cursor=pointer]
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
  185 |   const chart = matrix(page, "course-count");
  186 |   const target = cell(chart, "category-4", "college-4");
  187 |   await chart.scrollIntoViewIfNeeded();
  188 |   await page.waitForTimeout(1800);
  189 |   await target.evaluate(node => node.setAttribute("data-test-stable-coordinate", "true"));
  190 |   const circle = target.locator("circle").first();
  191 |   const before = await circle.evaluate(node => node.getBoundingClientRect().width);
  192 |   await page.getByRole("button", { name: "更新数据", exact: true }).evaluate(node => (node as HTMLButtonElement).click());
  193 |   const updateFrames = await circle.evaluate(async node => {
  194 |     const frames: { width: number; readingVisible: boolean }[] = [], start = performance.now();
  195 |     await new Promise<void>(resolve => {
  196 |       const frame = (now: number) => {
  197 |         const reading = node.closest('[data-slot="cell"]')!.querySelector('text[data-slot="reading"]')!;
  198 |         frames.push({ width: node.getBoundingClientRect().width, readingVisible: getComputedStyle(reading).visibility === "visible" });
  199 |         if (now - start < 1100) requestAnimationFrame(frame); else resolve();
  200 |       };
  201 |       requestAnimationFrame(frame);
  202 |     });
  203 |     return frames;
  204 |   });
  205 |   const after = updateFrames.at(-1)!.width;
  206 |   expect(after).toBeGreaterThan(before);
  207 |   expect(updateFrames.some(frame => frame.width > before + .01 && frame.width < after - .01)).toBe(true);
  208 |   expect(updateFrames.every(frame => frame.readingVisible)).toBe(true);
  209 |   await expect(target).toHaveAttribute("data-test-stable-coordinate", "true");
  210 |   const original = await circle.evaluate(node => { const box = node.getBoundingClientRect(), chart = node.closest('[data-rain-id="ui-chart-matrix"]')!.getBoundingClientRect(); return { x: box.x + box.width / 2 - chart.x, y: box.y + box.height / 2 - chart.y }; });
  211 |   await page.getByRole("button", { name: "按数量排序" }).evaluate(node => (node as HTMLButtonElement).click());
  212 |   const sortFrames = await circle.evaluate(async node => {
  213 |     const positions: { x: number; y: number }[] = [], start = performance.now();
  214 |     await new Promise<void>(resolve => {
  215 |       const frame = (now: number) => { const box = node.getBoundingClientRect(), chart = node.closest('[data-rain-id="ui-chart-matrix"]')!.getBoundingClientRect(); positions.push({ x: box.x + box.width / 2 - chart.x, y: box.y + box.height / 2 - chart.y }); if (now - start < 1100) requestAnimationFrame(frame); else resolve(); };
  216 |       requestAnimationFrame(frame);
  217 |     });
  218 |     return positions;
  219 |   });
  220 |   const end = sortFrames.at(-1)!;
  221 |   const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);
  222 |   expect(distance(original, end)).toBeGreaterThan(5);
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
> 285 |   expect(labels).toHaveLength(8);
      |                  ^ Error: expect(received).toHaveLength(expected)
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
  323 |   expect(frames.filter(frame => frame.visible).every(frame => frame.farthestGlyphCorner <= frame.radius + 1)).toBe(true);
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