# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-matrix-sticky-layout.spec.ts >> quantity legend uses compact small medium large hints with unchanged values and colors
- Location: tests/e2e/chart-matrix-sticky-layout.spec.ts:54:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 3
+ Received  + 3

  Array [
-   8,
-   12,
-   16,
+   18,
+   25.455810546875,
+   36,
  ]
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "分类矩阵" [level=1] [ref=e8]
      - generic [ref=e9]: G4 · 共享候选 · 未发布 · 视觉待复核
    - paragraph [ref=e10]: 任意分类行列的热度、数量气泡与离散支撑等级。
  - generic [ref=e11]:
    - heading "分类矩阵组件与业务实例" [level=2] [ref=e12]
    - paragraph [ref=e13]: 热度、开课学期、相似度、数量气泡与支撑等级，共用矩阵组件、图例与精确读数。示例均为 Mock 数据。
    - generic [ref=e14]:
      - generic [ref=e15]:
        - generic [ref=e16]:
          - text: 视觉配方
          - combobox "视觉配方" [ref=e17]:
            - option "连续强度色阶" [selected]
            - option "蓝灰单色"
        - generic [ref=e18]:
          - text: 示例状态
          - combobox "示例状态" [ref=e19]:
            - option "正常" [selected]
            - option "无数据"
            - option "零值"
            - option "单项／单点"
            - option "长标签"
            - option "缺测"
            - option "无效数据"
        - button "更新数据" [ref=e20] [cursor=pointer]
        - button "重播动效" [ref=e22] [cursor=pointer]
        - button "反转行列顺序" [ref=e24] [cursor=pointer]
      - region [ref=e27]:
        - heading "分类交叉矩阵" [level=2] [ref=e28]
        - paragraph [ref=e29]: 示例数据
        - group "相似度矩阵规模" [ref=e30]:
          - button "4×4" [ref=e31] [cursor=pointer]
          - button "6×6" [pressed] [ref=e33] [cursor=pointer]
          - button "12×12" [ref=e35] [cursor=pointer]
        - region "每周学习时段 · 次数" [ref=e37]:
          - generic [ref=e38]:
            - generic [ref=e39]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
            - status [ref=e40]
            - region "每周学习时段 · 次数，可横向滚动" [ref=e41]:
              - table [ref=e42]:
                - caption [ref=e43]: 每周学习时段 · 次数
                - rowgroup [ref=e70]:
                  - row [ref=e71]:
                    - columnheader "星期" [ref=e72]
                    - columnheader "00:00" [ref=e73]
                    - columnheader "01:00" [ref=e74]
                    - columnheader "02:00" [ref=e75]
                    - columnheader "03:00" [ref=e76]
                    - columnheader "04:00" [ref=e77]
                    - columnheader "05:00" [ref=e78]
                    - columnheader "06:00" [ref=e79]
                    - columnheader "07:00" [ref=e80]
                    - columnheader "08:00" [ref=e81]
                    - columnheader "09:00" [ref=e82]
                    - columnheader "10:00" [ref=e83]
                    - columnheader "11:00" [ref=e84]
                    - columnheader "12:00" [ref=e85]
                    - columnheader "13:00" [ref=e86]
                    - columnheader "14:00" [ref=e87]
                    - columnheader "15:00" [ref=e88]
                    - columnheader "16:00" [ref=e89]
                    - columnheader "17:00" [ref=e90]
                    - columnheader "18:00" [ref=e91]
                    - columnheader "19:00" [ref=e92]
                    - columnheader "20:00" [ref=e93]
                    - columnheader "21:00" [ref=e94]
                    - columnheader "22:00" [ref=e95]
                    - columnheader "23:00" [ref=e96]
                - rowgroup [ref=e97]:
                  - row [ref=e98]:
                    - rowheader "周一" [ref=e99]
                    - cell "0" [ref=e100]
                    - cell "3" [ref=e104]
                    - cell "6" [ref=e108]
                    - cell "9" [ref=e112]
                    - cell "12" [ref=e116]
                    - cell "15" [ref=e120]
                    - cell "18" [ref=e124]
                    - cell "0" [ref=e128]
                    - cell "3" [ref=e132]
                    - cell "6" [ref=e136]
                    - cell "9" [ref=e140]
                    - cell "12" [ref=e144]
                    - cell "15" [ref=e148]
                    - cell "18" [ref=e152]
                    - cell "0" [ref=e156]
                    - cell "3" [ref=e160]
                    - cell "6" [ref=e164]
                    - cell "9" [ref=e168]
                    - cell "12" [ref=e172]
                    - cell "15" [ref=e176]
                    - cell "18" [ref=e180]
                    - cell "0" [ref=e184]
                    - cell "3" [ref=e188]
                    - cell "6" [ref=e192]
                  - row [ref=e196]:
                    - rowheader "周二" [ref=e197]
                    - cell "7" [ref=e198]
                    - cell "10" [ref=e202]
                    - cell "13" [ref=e206]
                    - cell "16" [ref=e210]
                    - cell "19" [ref=e214]
                    - cell "1" [ref=e218]
                    - cell "4" [ref=e222]
                    - cell "7" [ref=e226]
                    - cell "10" [ref=e230]
                    - cell "13" [ref=e234]
                    - cell "16" [ref=e238]
                    - cell "19" [ref=e242]
                    - cell "1" [ref=e246]
                    - cell "4" [ref=e250]
                    - cell "7" [ref=e254]
                    - cell "10" [ref=e258]
                    - cell "13" [ref=e262]
                    - cell "16" [ref=e266]
                    - cell "19" [ref=e270]
                    - cell "1" [ref=e274]
                    - cell "4" [ref=e278]
                    - cell "7" [ref=e282]
                    - cell "10" [ref=e286]
                    - cell "13" [ref=e290]
                  - row [ref=e294]:
                    - rowheader "周三" [ref=e295]
                    - cell "14" [ref=e296]
                    - cell "17" [ref=e300]
                    - cell "20" [ref=e304]
                    - cell "2" [ref=e308]
                    - cell "5" [ref=e312]
                    - cell "8" [ref=e316]
                    - cell "11" [ref=e320]
                    - cell "14" [ref=e324]
                    - cell "17" [ref=e328]
                    - cell "20" [ref=e332]
                    - cell "2" [ref=e336]
                    - cell "5" [ref=e340]
                    - cell "8" [ref=e344]
                    - cell "11" [ref=e348]
                    - cell "14" [ref=e352]
                    - cell "17" [ref=e356]
                    - cell "20" [ref=e360]
                    - cell "2" [ref=e364]
                    - cell "5" [ref=e368]
                    - cell "8" [ref=e372]
                    - cell "11" [ref=e376]
                    - cell "14" [ref=e380]
                    - cell "17" [ref=e384]
                    - cell "20" [ref=e388]
                  - row [ref=e392]:
                    - rowheader "周四" [ref=e393]
                    - cell "0" [ref=e394]
                    - cell "3" [ref=e398]
                    - cell "6" [ref=e402]
                    - cell "9" [ref=e406]
                    - cell "12" [ref=e410]
                    - cell "15" [ref=e414]
                    - cell "18" [ref=e418]
                    - cell "0" [ref=e422]
                    - cell "3" [ref=e426]
                    - cell "6" [ref=e430]
                    - cell "9" [ref=e434]
                    - cell "12" [ref=e438]
                    - cell "15" [ref=e442]
                    - cell "18" [ref=e446]
                    - cell "0" [ref=e450]
                    - cell "3" [ref=e454]
                    - cell "6" [ref=e458]
                    - cell "9" [ref=e462]
                    - cell "12" [ref=e466]
                    - cell "15" [ref=e470]
                    - cell "18" [ref=e474]
                    - cell "0" [ref=e478]
                    - cell "3" [ref=e482]
                    - cell "6" [ref=e486]
                  - row [ref=e490]:
                    - rowheader "周五" [ref=e491]
                    - cell "7" [ref=e492]
                    - cell "10" [ref=e496]
                    - cell "13" [ref=e500]
                    - cell "16" [ref=e504]
                    - cell "19" [ref=e508]
                    - cell "1" [ref=e512]
                    - cell "4" [ref=e516]
                    - cell "7" [ref=e520]
                    - cell "10" [ref=e524]
                    - cell "13" [ref=e528]
                    - cell "16" [ref=e532]
                    - cell "19" [ref=e536]
                    - cell "1" [ref=e540]
                    - cell "4" [ref=e544]
                    - cell "7" [ref=e548]
                    - cell "10" [ref=e552]
                    - cell "13" [ref=e556]
                    - cell "16" [ref=e560]
                    - cell "19" [ref=e564]
                    - cell "1" [ref=e568]
                    - cell "4" [ref=e572]
                    - cell "7" [ref=e576]
                    - cell "10" [ref=e580]
                    - cell "13" [ref=e584]
                  - row [ref=e588]:
                    - rowheader "周六" [ref=e589]
                    - cell "14" [ref=e590]
                    - cell "17" [ref=e594]
                    - cell "20" [ref=e598]
                    - cell "2" [ref=e602]
                    - cell "5" [ref=e606]
                    - cell "8" [ref=e610]
                    - cell "11" [ref=e614]
                    - cell "14" [ref=e618]
                    - cell "17" [ref=e622]
                    - cell "20" [ref=e626]
                    - cell "2" [ref=e630]
                    - cell "5" [ref=e634]
                    - cell "8" [ref=e638]
                    - cell "11" [ref=e642]
                    - cell "14" [ref=e646]
                    - cell "17" [ref=e650]
                    - cell "20" [ref=e654]
                    - cell "2" [ref=e658]
                    - cell "5" [ref=e662]
                    - cell "8" [ref=e666]
                    - cell "11" [ref=e670]
                    - cell "14" [ref=e674]
                    - cell "17" [ref=e678]
                    - cell "20" [ref=e682]
                  - row [ref=e686]:
                    - rowheader "周日" [ref=e687]
                    - cell "0" [ref=e688]
                    - cell "3" [ref=e692]
                    - cell "6" [ref=e696]
                    - cell "9" [ref=e700]
                    - cell "12" [ref=e704]
                    - cell "15" [ref=e708]
                    - cell "18" [ref=e712]
                    - cell "0" [ref=e716]
                    - cell "3" [ref=e720]
                    - cell "6" [ref=e724]
                    - cell "9" [ref=e728]
                    - cell "12" [ref=e732]
                    - cell "15" [ref=e736]
                    - cell "18" [ref=e740]
                    - cell "0" [ref=e744]
                    - cell "3" [ref=e748]
                    - cell "6" [ref=e752]
                    - cell "9" [ref=e756]
                    - cell "12" [ref=e760]
                    - cell "15" [ref=e764]
                    - cell "18" [ref=e768]
                    - cell "0" [ref=e772]
                    - cell "3" [ref=e776]
                    - cell "缺测" [ref=e780]
            - list "每周学习时段 · 次数图例" [ref=e783]:
              - listitem [ref=e784]:
                - generic [ref=e785]:
                  - button "0–4" [ref=e786] [cursor=pointer]
                  - button "4–8" [ref=e787] [cursor=pointer]
                  - button "8–12" [ref=e788] [cursor=pointer]
                  - button "12–16" [ref=e789] [cursor=pointer]
                  - button "16–20" [ref=e790] [cursor=pointer]
                - generic [ref=e791]:
                  - generic [ref=e792]: "0"
                  - generic [ref=e793]: "20"
          - paragraph [ref=e794]: 按星期与小时比较学习次数，0 也是有效观测。
        - region "课程与培养方案版本 · 开课学期" [ref=e795]:
          - generic [ref=e796]:
            - generic [ref=e797]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
            - status [ref=e798]
            - region "课程与培养方案版本 · 开课学期，可横向滚动" [ref=e799]:
              - table [ref=e800]:
                - caption [ref=e801]: 课程与培养方案版本 · 开课学期
                - rowgroup [ref=e808]:
                  - row [ref=e809]:
                    - columnheader "课程" [ref=e810]
                    - columnheader "2022 版" [ref=e811]
                    - columnheader "2023 版" [ref=e812]
                    - columnheader "2024 版" [ref=e813]
                    - columnheader "2025 版" [ref=e814]
                - rowgroup [ref=e815]:
                  - row [ref=e816]:
                    - rowheader "高等数学" [ref=e817]
                    - cell "1" [ref=e818]
                    - cell "2" [ref=e822]
                    - cell "未设学期" [ref=e826]
                    - cell "4" [ref=e829]
                  - row [ref=e833]:
                    - rowheader "线性代数" [ref=e834]
                    - cell "2" [ref=e835]
                    - cell "3" [ref=e839]
                    - cell "4" [ref=e843]
                    - cell "5" [ref=e847]
                  - row [ref=e851]:
                    - rowheader "概率论与数理统计" [ref=e852]
                    - cell "3" [ref=e853]
                    - cell "无该课程" [ref=e857]:
                      - generic [ref=e858]: —
                    - cell "5" [ref=e860]
                    - cell "6" [ref=e864]
                  - row [ref=e868]:
                    - rowheader "大学物理" [ref=e869]
                    - cell "4" [ref=e870]
                    - cell "5" [ref=e874]
                    - cell "6" [ref=e878]
                    - cell "7" [ref=e882]
                  - row [ref=e886]:
                    - rowheader "程序设计基础" [ref=e887]
                    - cell "5" [ref=e888]
                    - cell "6" [ref=e892]
                    - cell "7" [ref=e896]
                    - cell "8" [ref=e900]
                  - row [ref=e904]:
                    - rowheader "数据结构" [ref=e905]
                    - cell "6" [ref=e906]
                    - cell "7" [ref=e910]
                    - cell "8" [ref=e914]
                    - cell "1" [ref=e918]
            - list "课程与培养方案版本 · 开课学期图例" [ref=e922]:
              - button "1" [ref=e923] [cursor=pointer]
              - button "2" [ref=e926] [cursor=pointer]
              - button "3" [ref=e929] [cursor=pointer]
              - button "4" [ref=e932] [cursor=pointer]
              - button "5" [ref=e935] [cursor=pointer]
              - button "6" [ref=e938] [cursor=pointer]
              - button "7" [ref=e941] [cursor=pointer]
              - button "8" [ref=e944] [cursor=pointer]
          - paragraph [ref=e947]: 学期按 1—8 排列；未设学期与无该课程分别记录。
        - region "课程相似度" [ref=e948]:
          - generic [ref=e949]:
            - generic [ref=e950]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
            - status [ref=e951]
            - region "课程相似度，可横向滚动" [ref=e952]:
              - table [ref=e953]:
                - caption [ref=e954]: 课程相似度
                - rowgroup [ref=e963]:
                  - row [ref=e964]:
                    - columnheader "课程" [ref=e965]
                    - columnheader "高等数学" [ref=e966]
                    - columnheader "线性代数" [ref=e967]
                    - columnheader "概率论与数理统计" [ref=e968]
                    - columnheader "大学物理" [ref=e969]
                    - columnheader "程序设计基础" [ref=e970]
                    - columnheader "数据结构" [ref=e971]
                - rowgroup [ref=e972]:
                  - row [ref=e973]:
                    - rowheader "高等数学" [ref=e974]
                    - cell "缺测" [ref=e975]
                    - cell "30%" [ref=e978]
                    - cell "60%" [ref=e982]
                    - cell "90%" [ref=e986]
                    - cell "10%" [ref=e990]
                    - cell "40%" [ref=e994]
                  - row [ref=e998]:
                    - rowheader "线性代数" [ref=e999]
                    - cell "70%" [ref=e1000]
                    - cell "100%" [ref=e1004]
                    - cell "20%" [ref=e1008]
                    - cell "50%" [ref=e1012]
                    - cell "80%" [ref=e1016]
                    - cell "0%" [ref=e1020]
                  - row [ref=e1024]:
                    - rowheader "概率论与数理统计" [ref=e1025]
                    - cell "30%" [ref=e1026]
                    - cell "60%" [ref=e1030]
                    - cell "90%" [ref=e1034]
                    - cell "10%" [ref=e1038]
                    - cell "40%" [ref=e1042]
                    - cell "70%" [ref=e1046]
                  - row [ref=e1050]:
                    - rowheader "大学物理" [ref=e1051]
                    - cell "100%" [ref=e1052]
                    - cell "20%" [ref=e1056]
                    - cell "50%" [ref=e1060]
                    - cell "缺测" [ref=e1064]
                    - cell "0%" [ref=e1067]
                    - cell "30%" [ref=e1071]
                  - row [ref=e1075]:
                    - rowheader "程序设计基础" [ref=e1076]
                    - cell "60%" [ref=e1077]
                    - cell "90%" [ref=e1081]
                    - cell "10%" [ref=e1085]
                    - cell "40%" [ref=e1089]
                    - cell "70%" [ref=e1093]
                    - cell "100%" [ref=e1097]
                  - row [ref=e1101]:
                    - rowheader "数据结构" [ref=e1102]
                    - cell "20%" [ref=e1103]
                    - cell "50%" [ref=e1107]
                    - cell "80%" [ref=e1111]
                    - cell "0%" [ref=e1115]
                    - cell "30%" [ref=e1119]
                    - cell "60%" [ref=e1123]
            - list "课程相似度图例" [ref=e1127]:
              - listitem [ref=e1128]:
                - generic [ref=e1129]:
                  - button "0%–20%" [ref=e1130] [cursor=pointer]
                  - button "20%–40%" [ref=e1131] [cursor=pointer]
                  - button "40%–60%" [ref=e1132] [cursor=pointer]
                  - button "60%–80%" [ref=e1133] [cursor=pointer]
                  - button "80%–100%" [ref=e1134] [cursor=pointer]
                - generic [ref=e1135]:
                  - generic [ref=e1136]: 0%
                  - generic [ref=e1137]: 100%
          - paragraph [ref=e1138]: 同一课程对应两轴；方向不同的读数分别保留，缺测位置留空。
        - region "课程类别与学院 · 课程数" [ref=e1139]:
          - generic [ref=e1140]:
            - generic [ref=e1141]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
            - status [ref=e1142]
            - region "课程类别与学院 · 课程数，可横向滚动" [ref=e1143]:
              - table [ref=e1144]:
                - caption [ref=e1145]: 课程类别与学院 · 课程数
                - rowgroup [ref=e1154]:
                  - row [ref=e1155]:
                    - columnheader "课程类别" [ref=e1156]
                    - columnheader "计算机学院" [ref=e1157]
                    - columnheader "经济管理学院" [ref=e1158]
                    - columnheader "人文学院" [ref=e1159]
                    - columnheader "理学院" [ref=e1160]
                    - columnheader "外国语学院" [ref=e1161]
                    - columnheader "教育学院" [ref=e1162]
                - rowgroup [ref=e1163]:
                  - row [ref=e1164]:
                    - rowheader "通识课程" [ref=e1165]
                    - cell "0" [ref=e1166]
                    - cell "7" [ref=e1170]
                    - cell "14" [ref=e1174]
                    - cell "21" [ref=e1178]
                    - cell "28" [ref=e1182]
                    - cell "35" [ref=e1186]
                  - row [ref=e1190]:
                    - rowheader "学科基础" [ref=e1191]
                    - cell "11" [ref=e1192]
                    - cell "18" [ref=e1196]
                    - cell "25" [ref=e1200]
                    - cell "32" [ref=e1204]
                    - cell "39" [ref=e1208]
                    - cell "46" [ref=e1212]:
                      - img [ref=e1214]:
                        - generic [ref=e1216]: "46"
                  - row [ref=e1218]:
                    - rowheader "专业必修" [ref=e1219]
                    - cell "22" [ref=e1220]
                    - cell "29" [ref=e1224]
                    - cell "36" [ref=e1228]
                    - cell "43" [ref=e1232]
                    - cell "50" [ref=e1236]:
                      - img [ref=e1238]:
                        - generic [ref=e1240]: "50"
                    - cell "57" [ref=e1242]:
                      - img [ref=e1244]:
                        - generic [ref=e1246]: "57"
                  - row [ref=e1248]:
                    - rowheader "专业选修" [ref=e1249]
                    - cell "33" [ref=e1250]
                    - cell "40" [ref=e1254]
                    - cell "47" [ref=e1258]:
                      - img [ref=e1260]:
                        - generic [ref=e1262]: "47"
                    - cell "54" [ref=e1264]:
                      - img [ref=e1266]:
                        - generic [ref=e1268]: "54"
                    - cell "61" [ref=e1270]:
                      - img [ref=e1272]:
                        - generic [ref=e1274]: "61"
                    - cell "68" [ref=e1276]:
                      - img [ref=e1278]:
                        - generic [ref=e1280]: "68"
                  - row [ref=e1282]:
                    - rowheader "实践课程" [ref=e1283]
                    - cell "44" [ref=e1284]:
                      - img [ref=e1286]:
                        - generic [ref=e1288]: "44"
                    - cell "51" [ref=e1290]:
                      - img [ref=e1292]:
                        - generic [ref=e1294]: "51"
                    - cell "58" [ref=e1296]:
                      - img [ref=e1298]:
                        - generic [ref=e1300]: "58"
                    - cell "65" [ref=e1302]:
                      - img [ref=e1304]:
                        - generic [ref=e1306]: "65"
                    - cell "72" [ref=e1308]:
                      - img [ref=e1310]:
                        - generic [ref=e1312]: "72"
                    - cell "79" [ref=e1314]:
                      - img [ref=e1316]:
                        - generic [ref=e1318]: "79"
                  - row [ref=e1320]:
                    - rowheader "创新课程" [ref=e1321]
                    - cell "55" [ref=e1322]:
                      - img [ref=e1324]:
                        - generic [ref=e1326]: "55"
                    - cell "62" [ref=e1328]:
                      - img [ref=e1330]:
                        - generic [ref=e1332]: "62"
                    - cell "69" [ref=e1334]:
                      - img [ref=e1336]:
                        - generic [ref=e1338]: "69"
                    - cell "76" [ref=e1340]:
                      - img [ref=e1342]:
                        - generic [ref=e1344]: "76"
                    - cell "83" [ref=e1346]:
                      - img [ref=e1348]:
                        - generic [ref=e1350]: "83"
                    - cell "90" [ref=e1352]:
                      - img [ref=e1354]:
                        - generic [ref=e1356]: "90"
            - list "课程类别与学院 · 课程数图例" [ref=e1358]:
              - button "25" [ref=e1359] [cursor=pointer]
              - button "50" [ref=e1364] [cursor=pointer]
              - button "100" [ref=e1369] [cursor=pointer]
          - paragraph [ref=e1374]: 圆面积与颜色深浅共用课程数量程；指向或用方向键查看精确课程数。
        - region "课程支撑关系" [ref=e1375]:
          - generic [ref=e1376]:
            - generic [ref=e1377]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
            - status [ref=e1378]
            - region "课程支撑关系，可横向滚动" [ref=e1379]:
              - table [ref=e1380]:
                - caption [ref=e1381]: 课程支撑关系
                - rowgroup [ref=e1388]:
                  - row [ref=e1389]:
                    - columnheader "课程" [ref=e1390]
                    - columnheader "知识与能力" [ref=e1391]
                    - columnheader "分析与表达" [ref=e1392]
                    - columnheader "协作与实践" [ref=e1393]
                    - columnheader "创新与反思" [ref=e1394]
                - rowgroup [ref=e1395]:
                  - row [ref=e1396]:
                    - rowheader "高等数学" [ref=e1397]
                    - cell "无直接支撑" [ref=e1398]
                    - cell "一般支撑" [ref=e1402]
                    - cell "核心支撑" [ref=e1406]
                    - cell "无直接支撑" [ref=e1410]
                  - row [ref=e1414]:
                    - rowheader "线性代数" [ref=e1415]
                    - cell "一般支撑" [ref=e1416]
                    - cell "核心支撑" [ref=e1420]
                    - cell "无直接支撑" [ref=e1424]
                    - cell "一般支撑" [ref=e1428]
                  - row [ref=e1432]:
                    - rowheader "概率论与数理统计" [ref=e1433]
                    - cell "核心支撑" [ref=e1434]
                    - cell "无直接支撑" [ref=e1438]
                    - cell "一般支撑" [ref=e1442]
                    - cell "核心支撑" [ref=e1446]
                  - row [ref=e1450]:
                    - rowheader "大学物理" [ref=e1451]
                    - cell "无直接支撑" [ref=e1452]
                    - cell "一般支撑" [ref=e1456]
                    - cell "核心支撑" [ref=e1460]
                    - cell "无直接支撑" [ref=e1464]
                  - row [ref=e1468]:
                    - rowheader "程序设计基础" [ref=e1469]
                    - cell "一般支撑" [ref=e1470]
                    - cell "核心支撑" [ref=e1474]
                    - cell "无直接支撑" [ref=e1478]
                    - cell "一般支撑" [ref=e1482]
                  - row [ref=e1486]:
                    - rowheader "数据结构" [ref=e1487]
                    - cell "核心支撑" [ref=e1488]
                    - cell "无直接支撑" [ref=e1492]
                    - cell "一般支撑" [ref=e1496]
                    - cell "核心支撑" [ref=e1500]
            - list "课程支撑关系图例" [ref=e1504]:
              - button "无直接支撑" [ref=e1505] [cursor=pointer]
              - button "一般支撑" [ref=e1510] [cursor=pointer]
              - button "核心支撑" [ref=e1515] [cursor=pointer]
          - paragraph [ref=e1520]: 支撑关系只有无直接支撑、一般支撑和核心支撑三个等级。
      - status [ref=e1521]: 示例数据 · 已更新 0 次 · 已按系统设置减少动效
  - generic [ref=e1522]:
    - heading "数据与使用边界" [level=2] [ref=e1523]
    - paragraph [ref=e1524]: 稳定rowId/columnId、唯一坐标；0、缺测与不适用分开，气泡面积正比于数量。
    - paragraph [ref=e1525]: 独立分类矩阵，不复用日历合同；已验证12×12与7×24，较大范围先测量。
    - paragraph [ref=e1526]: 五组分类矩阵统一展示于本页，指向或方向键查看精确读数，图例聚焦辅助比较。
  - generic [ref=e1527]:
    - region [ref=e1528]:
      - heading "API 与结构" [level=2] [ref=e1529]
      - table [ref=e1531]:
        - caption [ref=e1532]: 分类矩阵 常用接口
        - rowgroup [ref=e1533]:
          - row [ref=e1534]:
            - columnheader "名称" [ref=e1535]
            - columnheader "类型" [ref=e1536]
            - columnheader "默认" [ref=e1537]
            - columnheader "说明" [ref=e1538]
        - rowgroup [ref=e1539]:
          - row [ref=e1540]:
            - rowheader [ref=e1541]:
              - code [ref=e1542]: rows / columns / cells
            - cell [ref=e1543]:
              - code [ref=e1544]: 分类轴与明确单元格状态
            - cell "—" [ref=e1545]
            - cell "稳定rowId/columnId、唯一坐标；0、缺测与不适用分开，气泡面积正比于数量。" [ref=e1546]
          - row [ref=e1547]:
            - rowheader [ref=e1548]:
              - code [ref=e1549]: encoding
            - cell [ref=e1550]:
              - code [ref=e1551]: heat / bubble / level
            - cell "—" [ref=e1552]
            - cell "明确递增连续域、非负数量最大值或离散等级映射；图例与精确读数同源。" [ref=e1553]
          - row [ref=e1554]:
            - rowheader [ref=e1555]:
              - code [ref=e1556]: caption / valueFormat / reducedMotion
            - cell [ref=e1557]:
              - code [ref=e1558]: 文本与过渡
            - cell "—" [ref=e1559]
            - cell "行列标题和精确文字始终可读；滚动限于矩阵自身，连续编码短过渡、离散等级即时变化。" [ref=e1560]
      - paragraph [ref=e1561]: Parts / Slots：table、legend、scroll-container
    - region [ref=e1562]:
      - heading "调用示例" [level=2] [ref=e1563]
      - generic [ref=e1564]:
        - generic [ref=e1565]:
          - button "复制代码" [ref=e1566] [cursor=pointer]
          - status
        - code [ref=e1569]: "import { createRoot } from \"react-dom/client\"; import { useState } from \"react\"; import { MotionConfig, useReducedMotion } from \"motion/react\"; import { Button } from \"@rain-next/ui\"; import \"@rain-next/foundations/tokens.css\"; import \"@rain-next/foundations/typography.css\"; import \"@rain-next/foundations/focus.css\"; import \"@rain-next/ui/styles.css\"; import \"@rain-next/ui/charts/styles.css\"; import \"./chart-business/chart-business.css\"; import { MatrixExamples } from \"./chart-business/matrix-examples\"; function App() { const [revision,setRevision] = useState(0); const [replay,setReplay] = useState(0); const reduced = !!useReducedMotion(); return <MotionConfig reducedMotion=\"user\"><main className=\"rain-chart\" data-recipe=\"intensity\" style={{ maxWidth:880,margin:\"auto\",padding:\"var(--rain-space-24)\" }}> <h1>分类矩阵</h1> <div className=\"rain-business-controls\"><Button size=\"small\" variant=\"secondary\" onClick={()=>setRevision(value=>value+1)}>更新数据</Button><Button size=\"small\" variant=\"secondary\" onClick={()=>setReplay(value=>value+1)}>重播动效</Button></div> <MatrixExamples recipe=\"intensity\" state=\"normal\" revision={revision} reduced={reduced} replay={replay} initialSize={6} descending={false} /> </main></MotionConfig>; } createRoot(document.getElementById(\"root\")!).render(<App />);"
      - paragraph [ref=e1570]:
        - text: 当前源码：
        - code [ref=e1571]: packages/ui/src/charts/matrix/matrix-chart.tsx
  - group [ref=e1572]:
    - generic "调用配置、完整源码与示例数据" [ref=e1573] [cursor=pointer]
    - option "main.tsx" [selected]
    - option "index.html"
    - option "chart-business/matrix-examples.tsx"
    - option "chart-business/matrix-data.ts"
    - option "chart-business/chart-business.css"
    - option "chart-data.ts"
    - option "chart-variants/data/world.geojson"
  - navigation "相关图型" [ref=e1574]:
    - link "面积图" [ref=e1575] [cursor=pointer]:
      - /url: "#chart-area"
    - link "折线图" [ref=e1577] [cursor=pointer]:
      - /url: "#chart-line"
    - link "柱状图" [ref=e1579] [cursor=pointer]:
      - /url: "#chart-bar"
    - link "组合图" [ref=e1581] [cursor=pointer]:
      - /url: "#chart-composed"
    - link "饼图 / 环饼" [ref=e1583] [cursor=pointer]:
      - /url: "#chart-pie"
    - link "多目标进度环" [ref=e1585] [cursor=pointer]:
      - /url: "#chart-ring"
    - link "雷达图" [ref=e1587] [cursor=pointer]:
      - /url: "#chart-radar"
    - link "时间散点" [ref=e1589] [cursor=pointer]:
      - /url: "#chart-scatter"
    - link "漏斗图" [ref=e1591] [cursor=pointer]:
      - /url: "#chart-funnel"
    - link "仪表图" [ref=e1593] [cursor=pointer]:
      - /url: "#chart-gauge"
    - link "桑基图" [ref=e1595] [cursor=pointer]:
      - /url: "#chart-sankey"
    - link "旭日图" [ref=e1597] [cursor=pointer]:
      - /url: "#chart-sunburst"
    - link "日历热图" [ref=e1599] [cursor=pointer]:
      - /url: "#chart-heatmap"
    - link "分区地图" [ref=e1601] [cursor=pointer]:
      - /url: "#chart-choropleth"
    - link "K线图" [ref=e1603] [cursor=pointer]:
      - /url: "#chart-candlestick"
    - link "盈亏线" [ref=e1605] [cursor=pointer]:
      - /url: "#chart-profit-loss"
    - link "实时折线" [ref=e1607] [cursor=pointer]:
      - /url: "#chart-live-line"
    - link "分类矩阵" [ref=e1609] [cursor=pointer]:
      - /url: "#chart-matrix"
```

# Test source

```ts
  1  | import { expect, test, type Page } from "@playwright/test";
  2  | import { mkdir, writeFile } from "node:fs/promises";
  3  | 
  4  | const evidence="evidence/runtime/chart-matrix-sticky-layout-2026-10-09/browser";
  5  | const matrix=(page:Page,id:string)=>page.locator(`[data-matrix-example="${id}"] [data-rain-id="ui-chart-matrix"]`);
  6  | async function open(page:Page) {
  7  |   await page.emulateMedia({reducedMotion:"reduce"});
  8  |   await page.goto("/#chart-matrix");
  9  |   await expect(matrix(page,"weekday-hour").locator("tbody tr")).toHaveCount(7);
  10 | }
  11 | async function record(name:string,facts:unknown) {
  12 |   await mkdir(evidence,{recursive:true});
  13 |   await writeFile(`${evidence}/${name}.json`,JSON.stringify(facts,null,2));
  14 | }
  15 | 
  16 | test("row headings fit short and long labels while data columns stay equal",async({page})=>{
  17 |   await open(page);
  18 |   const chart=matrix(page,"weekday-hour");
  19 |   const short=await chart.locator("tbody th").first().evaluate(node=>node.getBoundingClientRect().width);
  20 |   const course=await matrix(page,"course-similarity").locator("tbody th").first().evaluate(node=>node.getBoundingClientRect().width);
  21 |   await record("heading-baseline",{short,course});
  22 |   expect(short).toBeLessThan(72);
  23 |   expect(course).toBeGreaterThan(short+30);
  24 |   await page.getByRole("combobox",{name:"示例状态",exact:true}).selectOption("long");
  25 |   const long=await chart.locator("tbody th").first().evaluate(node=>node.getBoundingClientRect().width);
  26 |   expect(long).toBeGreaterThan(short);
  27 |   expect(long).toBeLessThanOrEqual(240);
  28 |   await page.setViewportSize({width:390,height:844});
  29 |   const narrow=await chart.locator('[data-slot="scroll-container"]').evaluate(node=>({width:node.clientWidth,heading:node.querySelector("tbody th")!.getBoundingClientRect().width,cells:[...node.querySelectorAll("tbody tr:first-child td")].map(cell=>cell.getBoundingClientRect().width)}));
  30 |   expect(narrow.heading).toBeLessThanOrEqual(narrow.width*.4+1);
  31 |   expect(Math.max(...narrow.cells)-Math.min(...narrow.cells)).toBeLessThan(1);
  32 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  33 |   await record("heading-fit",{short,course,long,narrow});
  34 | });
  35 | 
  36 | test("hovered sticky row remains opaque while the matrix scrolls underneath",async({page})=>{
  37 |   await open(page);
  38 |   const chart=matrix(page,"weekday-hour"), region=chart.locator('[data-slot="scroll-container"]');
  39 |   await region.scrollIntoViewIfNeeded();
  40 |   await chart.locator('[data-row-id="weekday-4"][data-column-id="hour-6"]').hover();
  41 |   const heading=chart.locator('tbody th[data-active="true"]');
  42 |   await expect(heading).toContainText("周四");
  43 |   await page.mouse.wheel(260,0);
  44 |   await expect.poll(()=>region.evaluate(node=>node.scrollLeft)).toBeGreaterThan(0);
  45 |   await page.waitForTimeout(300);
  46 |   const facts=await heading.evaluate(node=>({text:node.textContent,background:getComputedStyle(node).backgroundColor,tint:getComputedStyle(node).backgroundImage,width:node.getBoundingClientRect().width,hit:document.elementFromPoint(node.getBoundingClientRect().left+node.getBoundingClientRect().width/2,node.getBoundingClientRect().top+node.getBoundingClientRect().height/2)?.closest("th")===node}));
  47 |   await record("sticky-hover-scroll",facts);
  48 |   await chart.screenshot({path:`${evidence}/sticky-hover-scroll.png`});
  49 |   expect(facts.background).toMatch(/^rgb\(/);
  50 |   expect(facts.tint).toContain("linear-gradient");
  51 |   expect(facts.hit).toBe(true);
  52 | });
  53 | 
  54 | test("quantity legend uses compact small medium large hints with unchanged values and colors",async({page})=>{
  55 |   await open(page);
  56 |   const chart=matrix(page,"course-count"), legend=chart.locator('[data-slot="legend"]');
  57 |   await legend.scrollIntoViewIfNeeded();
  58 |   const symbols=await legend.locator("li").evaluateAll(nodes=>nodes.map(node=>({value:node.getAttribute("aria-label"),diameter:node.querySelector("circle")!.getBoundingClientRect().width,height:node.getBoundingClientRect().height,fill:getComputedStyle(node.querySelector("circle")!).fill})));
  59 |   await record("legend-hints",symbols);
  60 |   expect(symbols.map(symbol=>symbol.value)).toEqual(["25","50","100"]);
> 61 |   expect(symbols.map(symbol=>symbol.diameter)).toEqual([8,12,16]);
     |                                                ^ Error: expect(received).toEqual(expected) // deep equality
  62 |   expect(symbols.every(symbol=>symbol.height<=24)).toBe(true);
  63 |   await chart.screenshot({path:`${evidence}/compact-legend.png`});
  64 | });
  65 | 
```