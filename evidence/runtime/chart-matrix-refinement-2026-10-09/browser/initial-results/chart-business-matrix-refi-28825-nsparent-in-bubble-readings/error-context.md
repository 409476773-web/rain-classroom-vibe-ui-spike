# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-matrix-refinement.spec.ts >> quantity bubbles use a shared area and color scale with white transparent in-bubble readings
- Location: tests/e2e/chart-business-matrix-refinement.spec.ts:39:1

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
          - region "每周学习时段 · 次数，可横向滚动" [ref=e769]:
            - table [ref=e770]:
              - caption [ref=e771]: 每周学习时段 · 次数
              - rowgroup [ref=e772]:
                - row [ref=e773]:
                  - columnheader "星期" [ref=e774]
                  - columnheader "00:00" [ref=e775]
                  - columnheader "01:00" [ref=e776]
                  - columnheader "02:00" [ref=e777]
                  - columnheader "03:00" [ref=e778]
                  - columnheader "04:00" [ref=e779]
                  - columnheader "05:00" [ref=e780]
                  - columnheader "06:00" [ref=e781]
                  - columnheader "07:00" [ref=e782]
                  - columnheader "08:00" [ref=e783]
                  - columnheader "09:00" [ref=e784]
                  - columnheader "10:00" [ref=e785]
                  - columnheader "11:00" [ref=e786]
                  - columnheader "12:00" [ref=e787]
                  - columnheader "13:00" [ref=e788]
                  - columnheader "14:00" [ref=e789]
                  - columnheader "15:00" [ref=e790]
                  - columnheader "16:00" [ref=e791]
                  - columnheader "17:00" [ref=e792]
                  - columnheader "18:00" [ref=e793]
                  - columnheader "19:00" [ref=e794]
                  - columnheader "20:00" [ref=e795]
                  - columnheader "21:00" [ref=e796]
                  - columnheader "22:00" [ref=e797]
                  - columnheader "23:00" [ref=e798]
              - rowgroup [ref=e799]:
                - row [ref=e800]:
                  - rowheader "周一" [ref=e801]
                  - cell "0" [ref=e802]
                  - cell "3" [ref=e806]
                  - cell "6" [ref=e810]
                  - cell "9" [ref=e814]
                  - cell "12" [ref=e818]
                  - cell "15" [ref=e822]
                  - cell "18" [ref=e826]
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
                - row [ref=e898]:
                  - rowheader "周二" [ref=e899]
                  - cell "7" [ref=e900]
                  - cell "10" [ref=e904]
                  - cell "13" [ref=e908]
                  - cell "16" [ref=e912]
                  - cell "19" [ref=e916]
                  - cell "1" [ref=e920]
                  - cell "4" [ref=e924]
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
                - row [ref=e996]:
                  - rowheader "周三" [ref=e997]
                  - cell "14" [ref=e998]
                  - cell "17" [ref=e1002]
                  - cell "20" [ref=e1006]
                  - cell "2" [ref=e1010]
                  - cell "5" [ref=e1014]
                  - cell "8" [ref=e1018]
                  - cell "11" [ref=e1022]
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
                - row [ref=e1094]:
                  - rowheader "周四" [ref=e1095]
                  - cell "0" [ref=e1096]
                  - cell "3" [ref=e1100]
                  - cell "6" [ref=e1104]
                  - cell "9" [ref=e1108]
                  - cell "12" [ref=e1112]
                  - cell "15" [ref=e1116]
                  - cell "18" [ref=e1120]
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
                - row [ref=e1192]:
                  - rowheader "周五" [ref=e1193]
                  - cell "7" [ref=e1194]
                  - cell "10" [ref=e1198]
                  - cell "13" [ref=e1202]
                  - cell "16" [ref=e1206]
                  - cell "19" [ref=e1210]
                  - cell "1" [ref=e1214]
                  - cell "4" [ref=e1218]
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
                - row [ref=e1290]:
                  - rowheader "周六" [ref=e1291]
                  - cell "14" [ref=e1292]
                  - cell "17" [ref=e1296]
                  - cell "20" [ref=e1300]
                  - cell "2" [ref=e1304]
                  - cell "5" [ref=e1308]
                  - cell "8" [ref=e1312]
                  - cell "11" [ref=e1316]
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
                - row [ref=e1388]:
                  - rowheader "周日" [ref=e1389]
                  - cell "0" [ref=e1390]
                  - cell "3" [ref=e1394]
                  - cell "6" [ref=e1398]
                  - cell "9" [ref=e1402]
                  - cell "12" [ref=e1406]
                  - cell "15" [ref=e1410]
                  - cell "18" [ref=e1414]
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
                  - cell "缺测" [ref=e1482]
          - list "每周学习时段 · 次数图例" [ref=e1485]:
            - listitem [ref=e1486]:
              - generic [ref=e1487]: "0"
            - listitem [ref=e1490]:
              - generic [ref=e1491]: "20"
        - paragraph [ref=e1494]: 按星期与小时比较学习次数，0 也是有效观测。
      - region "课程与培养方案版本 · 开课学期" [ref=e1495]:
        - generic [ref=e1496]:
          - region "课程与培养方案版本 · 开课学期，可横向滚动" [ref=e1497]:
            - table [ref=e1498]:
              - caption [ref=e1499]: 课程与培养方案版本 · 开课学期
              - rowgroup [ref=e1500]:
                - row [ref=e1501]:
                  - columnheader "课程" [ref=e1502]
                  - columnheader "2022 版" [ref=e1503]
                  - columnheader "2023 版" [ref=e1504]
                  - columnheader "2024 版" [ref=e1505]
                  - columnheader "2025 版" [ref=e1506]
              - rowgroup [ref=e1507]:
                - row [ref=e1508]:
                  - rowheader "高等数学" [ref=e1509]
                  - cell "1" [ref=e1510]
                  - cell "2" [ref=e1514]
                  - cell "未设学期" [ref=e1518]
                  - cell "4" [ref=e1521]
                - row [ref=e1525]:
                  - rowheader "线性代数" [ref=e1526]
                  - cell "2" [ref=e1527]
                  - cell "3" [ref=e1531]
                  - cell "4" [ref=e1535]
                  - cell "5" [ref=e1539]
                - row [ref=e1543]:
                  - rowheader "概率论与数理统计" [ref=e1544]
                  - cell "3" [ref=e1545]
                  - cell "无该课程" [ref=e1549]:
                    - generic [ref=e1550]: —
                  - cell "5" [ref=e1552]
                  - cell "6" [ref=e1556]
                - row [ref=e1560]:
                  - rowheader "大学物理" [ref=e1561]
                  - cell "4" [ref=e1562]
                  - cell "5" [ref=e1566]
                  - cell "6" [ref=e1570]
                  - cell "7" [ref=e1574]
                - row [ref=e1578]:
                  - rowheader "程序设计基础" [ref=e1579]
                  - cell "5" [ref=e1580]
                  - cell "6" [ref=e1584]
                  - cell "7" [ref=e1588]
                  - cell "8" [ref=e1592]
                - row [ref=e1596]:
                  - rowheader "数据结构" [ref=e1597]
                  - cell "6" [ref=e1598]
                  - cell "7" [ref=e1602]
                  - cell "8" [ref=e1606]
                  - cell "1" [ref=e1610]
          - list "课程与培养方案版本 · 开课学期图例" [ref=e1614]:
            - listitem [ref=e1615]:
              - generic [ref=e1616]: "1"
            - listitem [ref=e1619]:
              - generic [ref=e1620]: "8"
        - paragraph [ref=e1623]: 学期按 1—8 排列；未设学期与无该课程分别记录。
      - region "课程相似度" [ref=e1624]:
        - generic [ref=e1625]:
          - region "课程相似度，可横向滚动" [ref=e1626]:
            - table [ref=e1627]:
              - caption [ref=e1628]: 课程相似度
              - rowgroup [ref=e1629]:
                - row [ref=e1630]:
                  - columnheader "课程" [ref=e1631]
                  - columnheader "高等数学" [ref=e1632]
                  - columnheader "线性代数" [ref=e1633]
                  - columnheader "概率论与数理统计" [ref=e1634]
                  - columnheader "大学物理" [ref=e1635]
                  - columnheader "程序设计基础" [ref=e1636]
                  - columnheader "数据结构" [ref=e1637]
              - rowgroup [ref=e1638]:
                - row [ref=e1639]:
                  - rowheader "高等数学" [ref=e1640]
                  - cell "缺测" [ref=e1641]
                  - cell "30%" [ref=e1644]
                  - cell "60%" [ref=e1648]
                  - cell "90%" [ref=e1652]
                  - cell "10%" [ref=e1656]
                  - cell "40%" [ref=e1660]
                - row [ref=e1664]:
                  - rowheader "线性代数" [ref=e1665]
                  - cell "70%" [ref=e1666]
                  - cell "100%" [ref=e1670]
                  - cell "20%" [ref=e1674]
                  - cell "50%" [ref=e1678]
                  - cell "80%" [ref=e1682]
                  - cell "0%" [ref=e1686]
                - row [ref=e1690]:
                  - rowheader "概率论与数理统计" [ref=e1691]
                  - cell "30%" [ref=e1692]
                  - cell "60%" [ref=e1696]
                  - cell "90%" [ref=e1700]
                  - cell "10%" [ref=e1704]
                  - cell "40%" [ref=e1708]
                  - cell "70%" [ref=e1712]
                - row [ref=e1716]:
                  - rowheader "大学物理" [ref=e1717]
                  - cell "100%" [ref=e1718]
                  - cell "20%" [ref=e1722]
                  - cell "50%" [ref=e1726]
                  - cell "缺测" [ref=e1730]
                  - cell "0%" [ref=e1733]
                  - cell "30%" [ref=e1737]
                - row [ref=e1741]:
                  - rowheader "程序设计基础" [ref=e1742]
                  - cell "60%" [ref=e1743]
                  - cell "90%" [ref=e1747]
                  - cell "10%" [ref=e1751]
                  - cell "40%" [ref=e1755]
                  - cell "70%" [ref=e1759]
                  - cell "100%" [ref=e1763]
                - row [ref=e1767]:
                  - rowheader "数据结构" [ref=e1768]
                  - cell "20%" [ref=e1769]
                  - cell "50%" [ref=e1773]
                  - cell "80%" [ref=e1777]
                  - cell "0%" [ref=e1781]
                  - cell "30%" [ref=e1785]
                  - cell "60%" [ref=e1789]
          - list "课程相似度图例" [ref=e1793]:
            - listitem [ref=e1794]:
              - generic [ref=e1795]: 0%
            - listitem [ref=e1798]:
              - generic [ref=e1799]: 100%
        - paragraph [ref=e1802]: 同一课程对应两轴；方向不同的读数分别保留，缺测位置留空。
      - region "课程类别与学院 · 课程数" [ref=e1803]:
        - generic [ref=e1804]:
          - region "课程类别与学院 · 课程数，可横向滚动" [ref=e1805]:
            - table [ref=e1806]:
              - caption [ref=e1807]: 课程类别与学院 · 课程数
              - rowgroup [ref=e1808]:
                - row [ref=e1809]:
                  - columnheader "课程类别" [ref=e1810]
                  - columnheader "计算机学院" [ref=e1811]
                  - columnheader "经济管理学院" [ref=e1812]
                  - columnheader "人文学院" [ref=e1813]
                  - columnheader "理学院" [ref=e1814]
                  - columnheader "外国语学院" [ref=e1815]
                  - columnheader "教育学院" [ref=e1816]
              - rowgroup [ref=e1817]:
                - row [ref=e1818]:
                  - rowheader "通识课程" [ref=e1819]
                  - cell "0" [ref=e1820]
                  - cell "7" [ref=e1824]
                  - cell "14" [ref=e1828]
                  - cell "21" [ref=e1832]
                  - cell "28" [ref=e1836]
                  - cell "35" [ref=e1840]
                - row [ref=e1844]:
                  - rowheader "学科基础" [ref=e1845]
                  - cell "11" [ref=e1846]
                  - cell "18" [ref=e1850]
                  - cell "25" [ref=e1854]
                  - cell "32" [ref=e1858]
                  - cell "39" [ref=e1862]
                  - cell "46" [ref=e1866]
                - row [ref=e1870]:
                  - rowheader "专业必修" [ref=e1871]
                  - cell "22" [ref=e1872]
                  - cell "29" [ref=e1876]
                  - cell "36" [ref=e1880]
                  - cell "43" [ref=e1884]
                  - cell "50" [ref=e1888]
                  - cell "57" [ref=e1892]:
                    - img [ref=e1894]:
                      - generic [ref=e1896]: "57"
                - row [ref=e1898]:
                  - rowheader "专业选修" [ref=e1899]
                  - cell "33" [ref=e1900]
                  - cell "40" [ref=e1904]
                  - cell "47" [ref=e1908]
                  - cell "54" [ref=e1912]
                  - cell "61" [ref=e1916]:
                    - img [ref=e1918]:
                      - generic [ref=e1920]: "61"
                  - cell "68" [ref=e1922]:
                    - img [ref=e1924]:
                      - generic [ref=e1926]: "68"
                - row [ref=e1928]:
                  - rowheader "实践课程" [ref=e1929]
                  - cell "44" [ref=e1930]
                  - cell "51" [ref=e1934]:
                    - img [ref=e1936]:
                      - generic [ref=e1938]: "51"
                  - cell "58" [ref=e1940]:
                    - img [ref=e1942]:
                      - generic [ref=e1944]: "58"
                  - cell "65" [ref=e1946]:
                    - img [ref=e1948]:
                      - generic [ref=e1950]: "65"
                  - cell "72" [ref=e1952]:
                    - img [ref=e1954]:
                      - generic [ref=e1956]: "72"
                  - cell "79" [ref=e1958]:
                    - img [ref=e1960]:
                      - generic [ref=e1962]: "79"
                - row [ref=e1965]:
                  - rowheader "创新课程" [ref=e1966]
                  - cell "55" [ref=e1967]:
                    - img [ref=e1969]:
                      - generic [ref=e1971]: "55"
                  - cell "62" [ref=e1973]:
                    - img [ref=e1975]:
                      - generic [ref=e1977]: "62"
                  - cell "69" [ref=e1979]:
                    - img [ref=e1981]:
                      - generic [ref=e1983]: "69"
                  - cell "76" [ref=e1985]:
                    - img [ref=e1987]:
                      - generic [ref=e1989]: "76"
                  - cell "83" [ref=e1992]:
                    - img [ref=e1994]:
                      - generic [ref=e1996]: "83"
                  - cell "90" [ref=e1999]:
                    - img [ref=e2001]:
                      - generic [ref=e2003]: "90"
          - list "课程类别与学院 · 课程数图例" [ref=e2005]:
            - listitem [ref=e2006]:
              - generic [ref=e2007]: "25"
            - listitem [ref=e2011]:
              - generic [ref=e2012]: "50"
            - listitem [ref=e2016]:
              - generic [ref=e2017]: "100"
        - paragraph [ref=e2021]: 圆面积表示数量，每个位置同时保留精确课程数。
      - region "课程支撑关系" [ref=e2022]:
        - generic [ref=e2023]:
          - region "课程支撑关系，可横向滚动" [ref=e2024]:
            - table [ref=e2025]:
              - caption [ref=e2026]: 课程支撑关系
              - rowgroup [ref=e2027]:
                - row [ref=e2028]:
                  - columnheader "课程" [ref=e2029]
                  - columnheader "知识与能力" [ref=e2030]
                  - columnheader "分析与表达" [ref=e2031]
                  - columnheader "协作与实践" [ref=e2032]
                  - columnheader "创新与反思" [ref=e2033]
              - rowgroup [ref=e2034]:
                - row [ref=e2035]:
                  - rowheader "高等数学" [ref=e2036]
                  - cell "无直接支撑" [ref=e2037]
                  - cell "一般支撑" [ref=e2041]
                  - cell "核心支撑" [ref=e2045]
                  - cell "无直接支撑" [ref=e2049]
                - row [ref=e2053]:
                  - rowheader "线性代数" [ref=e2054]
                  - cell "一般支撑" [ref=e2055]
                  - cell "核心支撑" [ref=e2059]
                  - cell "无直接支撑" [ref=e2063]
                  - cell "一般支撑" [ref=e2067]
                - row [ref=e2071]:
                  - rowheader "概率论与数理统计" [ref=e2072]
                  - cell "核心支撑" [ref=e2073]
                  - cell "无直接支撑" [ref=e2077]
                  - cell "一般支撑" [ref=e2081]
                  - cell "核心支撑" [ref=e2085]
                - row [ref=e2089]:
                  - rowheader "大学物理" [ref=e2090]
                  - cell "无直接支撑" [ref=e2091]
                  - cell "一般支撑" [ref=e2095]
                  - cell "核心支撑" [ref=e2099]
                  - cell "无直接支撑" [ref=e2103]
                - row [ref=e2107]:
                  - rowheader "程序设计基础" [ref=e2108]
                  - cell "一般支撑" [ref=e2109]
                  - cell "核心支撑" [ref=e2113]
                  - cell "无直接支撑" [ref=e2117]
                  - cell "一般支撑" [ref=e2121]
                - row [ref=e2125]:
                  - rowheader "数据结构" [ref=e2126]
                  - cell "核心支撑" [ref=e2127]
                  - cell "无直接支撑" [ref=e2131]
                  - cell "一般支撑" [ref=e2135]
                  - cell "核心支撑" [ref=e2139]
          - list "课程支撑关系图例" [ref=e2143]:
            - listitem [ref=e2144]:
              - generic [ref=e2145]: 无直接支撑
            - listitem [ref=e2149]:
              - generic [ref=e2150]: 一般支撑
            - listitem [ref=e2154]:
              - generic [ref=e2155]: 核心支撑
        - paragraph [ref=e2159]: 支撑关系只有无直接支撑、一般支撑和核心支撑三个等级。
  - group [ref=e2160]:
    - generic "条形与嵌入组合源码" [ref=e2161] [cursor=pointer]
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
  1   | import { expect, test, type Locator, type Page } from "@playwright/test";
  2   | import { mkdir, writeFile } from "node:fs/promises";
  3   | 
  4   | const evidence = "evidence/runtime/chart-matrix-refinement-2026-10-09/browser";
  5   | const matrix = (page: Page, fixture: string) => page.locator(`[data-matrix-example="${fixture}"] [data-rain-id="ui-chart-matrix"]`);
  6   | const cell = (chart: Locator, row: string, column: string) => chart.locator(`[data-slot="cell"][data-row-id="${row}"][data-column-id="${column}"]`);
  7   | async function record(name: string, facts: unknown) {
  8   |   await mkdir(evidence, { recursive: true });
  9   |   await writeFile(`${evidence}/${name}.json`, JSON.stringify(facts, null, 2));
  10  | }
  11  | async function open(page: Page, reduced = true) {
  12  |   await page.emulateMedia({ reducedMotion: reduced ? "reduce" : "no-preference" });
  13  |   await page.goto("/#chart-business");
  14  |   await expect(matrix(page, "course-count").locator('[data-slot="cell"]')).toHaveCount(36);
  15  | }
  16  | async function equalColumns(chart: Locator, size: number) {
  17  |   const widths = await chart.locator("tbody tr").first().locator('[data-slot="cell"]').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().width));
  18  |   expect(widths).toHaveLength(size);
  19  |   expect(Math.max(...widths) - Math.min(...widths)).toBeLessThanOrEqual(1);
  20  |   return widths;
  21  | }
  22  | 
  23  | for (const size of [6, 12]) test(`${size}x${size} matrices keep equal columns with long headers and contained narrow scrolling`, async ({ page }) => {
  24  |   await open(page);
  25  |   await page.getByRole("combobox", { name: "业务数据状态" }).selectOption("long");
  26  |   await page.getByRole("button", { name: `${size}×${size}`, exact: true }).click();
  27  |   const chart = matrix(page, "course-similarity");
  28  |   await chart.scrollIntoViewIfNeeded();
  29  |   const desktop = await equalColumns(chart, size);
  30  |   await page.setViewportSize({ width: 390, height: 844 });
  31  |   const narrow = await equalColumns(chart, size);
  32  |   const scroll = await chart.locator('[data-slot="scroll-container"]').evaluate(node => ({ width: node.clientWidth, content: node.scrollWidth }));
  33  |   expect(scroll.content).toBeGreaterThan(scroll.width);
  34  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  35  |   await record(`equal-columns-${size}`, { desktop, narrow, scroll });
  36  |   await chart.screenshot({ path: `${evidence}/matrix-${size}-narrow.png` });
  37  | });
  38  | 
  39  | test("quantity bubbles use a shared area and color scale with white transparent in-bubble readings", async ({ page }) => {
  40  |   await open(page);
  41  |   const chart = matrix(page, "course-count");
  42  |   await chart.scrollIntoViewIfNeeded();
  43  |   const bubbles = await chart.locator('[data-slot="cell"][data-state="value"]').evaluateAll(nodes => nodes.map(node => {
  44  |     const circle = node.querySelector<SVGCircleElement>("circle")!;
  45  |     const reading = node.querySelector<SVGTextElement>('text[data-slot="reading"]');
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
> 57  |   expect(visible.every(item => item.readingFill === "rgb(255, 255, 255)" && item.readingBackground === "rgba(0, 0, 0, 0)")).toBe(true);
      |                                                                                                                             ^ Error: expect(received).toBe(expected) // Object.is equality
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
  146 |   expect(samples.some(frame => frame.width > 0 && frame.width < final.width - .1 || frame.opacity > 0 && frame.opacity < .99)).toBe(true);
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
```