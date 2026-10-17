# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-matrix-refinement.spec.ts >> heat readout tone follows the painted light-to-dark and dark-to-light fill without a plate
- Location: tests/e2e/chart-business-matrix-refinement.spec.ts:326:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 2
Received:   1
```

# Page snapshot

```yaml
- main [ref=f1e3]:
  - generic [ref=f1e4]:
    - link "返回组件目录" [ref=f1e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=f1e7]:
      - heading "迷你图表与业务组合" [level=1] [ref=f1e8]
      - generic [ref=f1e9]: 共享候选 · 未发布 · 待视觉审阅
    - paragraph [ref=f1e10]: 大小条形、轻量趋势、构成与进度，组合进日常阅读数据的地方。
  - generic [ref=f1e11]:
    - generic [ref=f1e12]:
      - text: 配色
      - combobox "业务图表配色" [ref=f1e13]:
        - option "蓝灰单色" [selected]
        - option "蓝紫近邻"
        - option "多色类别"
    - generic [ref=f1e14]:
      - text: 数据状态
      - combobox "业务数据状态" [ref=f1e15]:
        - option "正常"
        - option "全零" [selected]
        - option "缺测"
        - option "无效数据"
        - option "无数据"
        - option "单项"
        - option "长名称"
    - button "更新数据" [ref=f1e16] [cursor=pointer]
    - button "重播动效" [ref=f1e18] [cursor=pointer]
    - button "按数量排序" [ref=f1e20] [cursor=pointer]
    - button "只看50人以上" [ref=f1e22] [cursor=pointer]
    - button "40行场景" [ref=f1e24] [cursor=pointer]
  - status [ref=f1e26]: 示例数据 · 更新 0 次
  - generic [ref=f1e27]:
    - region [ref=f1e28]:
      - heading "同一量程，大小都能比较" [level=2] [ref=f1e29]
      - generic [ref=f1e30]:
        - generic [ref=f1e32]:
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
        - list [ref=f1e38]:
          - listitem [ref=f1e39]:
            - generic [ref=f1e40]: 计算机学院
            - generic [ref=f1e42]: 0 人
          - listitem [ref=f1e43]:
            - generic [ref=f1e44]: 经济管理学院
            - generic [ref=f1e46]: 0 人
          - listitem [ref=f1e47]:
            - generic [ref=f1e48]: 人文学院
            - generic [ref=f1e50]: 0 人
          - listitem [ref=f1e51]:
            - generic [ref=f1e52]: 理学院
            - generic [ref=f1e54]: 0 人
          - listitem [ref=f1e55]:
            - generic [ref=f1e56]: 外国语学院
            - generic [ref=f1e58]: 0 人
    - generic [ref=f1e59]:
      - heading "分组比较与互斥堆叠" [level=2] [ref=f1e60]
      - generic [ref=f1e61]:
        - figure "本期与上期参与人数" [ref=f1e62]:
          - generic [ref=f1e65]:
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
          - paragraph [ref=f1e71]:
            - generic [ref=f1e72]: 本期
            - generic [ref=f1e74]: 上期
          - group [ref=f1e76]:
            - generic "查看分项读数" [ref=f1e77]
        - figure "互斥课程构成" [ref=f1e78]:
          - generic [ref=f1e81]:
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
          - paragraph [ref=f1e87]:
            - generic [ref=f1e88]: 已完成
            - generic [ref=f1e90]: 进行中
            - generic [ref=f1e92]: 待开始
          - group [ref=f1e94]:
            - generic "查看分项读数" [ref=f1e95]
      - generic [ref=f1e96]:
        - generic [ref=f1e97]: 评分 7.5 / 10
        - generic [ref=f1e101]: 相对位置 12 / 60（从前到后）
    - region [ref=f1e105]:
      - heading "同一图形，两种阅读密度" [level=2] [ref=f1e106]
      - generic [ref=f1e107]:
        - figure "数量条 · 紧凑 本期人数 · 0 人" [ref=f1e108]:
          - generic [ref=f1e113]:
            - strong [ref=f1e114]: 数量条 · 紧凑
            - generic [ref=f1e115]: 本期人数 · 0 人
        - figure "数量条 · 舒展 本期人数 · 0 人" [ref=f1e116]:
          - generic [ref=f1e121]:
            - strong [ref=f1e122]: 数量条 · 舒展
            - generic [ref=f1e123]: 本期人数 · 0 人
        - figure "构成分段 · 紧凑 已完成 0 人 进行中 0 人 待开始 0 人" [ref=f1e124]:
          - generic [ref=f1e125]: 零总量
          - generic [ref=f1e129]:
            - strong [ref=f1e130]: 构成分段 · 紧凑
            - list [ref=f1e131]:
              - listitem [ref=f1e132]:
                - text: 已完成
                - generic [ref=f1e134]: 0 人
              - listitem [ref=f1e135]:
                - text: 进行中
                - generic [ref=f1e137]: 0 人
              - listitem [ref=f1e138]:
                - text: 待开始
                - generic [ref=f1e140]: 0 人
        - figure "构成分段 · 舒展 已完成 0 人 进行中 0 人 待开始 0 人" [ref=f1e141]:
          - generic [ref=f1e142]: 零总量
          - generic [ref=f1e146]:
            - strong [ref=f1e147]: 构成分段 · 舒展
            - list [ref=f1e148]:
              - listitem [ref=f1e149]:
                - text: 已完成
                - generic [ref=f1e151]: 0 人
              - listitem [ref=f1e152]:
                - text: 进行中
                - generic [ref=f1e154]: 0 人
              - listitem [ref=f1e155]:
                - text: 待开始
                - generic [ref=f1e157]: 0 人
        - figure "每日柱图 · 紧凑 近8天每日人数 · 共同上限 0 人" [ref=f1e158]:
          - generic [ref=f1e169]:
            - strong [ref=f1e170]: 每日柱图 · 紧凑
            - generic [ref=f1e171]: 近8天每日人数 · 共同上限 0 人
        - figure "每日柱图 · 舒展 近8天每日人数 · 共同上限 0 人" [ref=f1e172]:
          - generic [ref=f1e183]:
            - strong [ref=f1e184]: 每日柱图 · 舒展
            - generic [ref=f1e185]: 近8天每日人数 · 共同上限 0 人
        - figure "小饼 · 紧凑 已完成 0 人 进行中 0 人 待开始 0 人" [ref=f1e186]:
          - generic [ref=f1e187]: 零总量
          - generic [ref=f1e191]:
            - strong [ref=f1e192]: 小饼 · 紧凑
            - list [ref=f1e193]:
              - listitem [ref=f1e194]:
                - text: 已完成
                - generic [ref=f1e196]: 0 人
              - listitem [ref=f1e197]:
                - text: 进行中
                - generic [ref=f1e199]: 0 人
              - listitem [ref=f1e200]:
                - text: 待开始
                - generic [ref=f1e202]: 0 人
        - figure "小饼 · 舒展 已完成 0 人 进行中 0 人 待开始 0 人" [ref=f1e203]:
          - generic [ref=f1e204]: 零总量
          - generic [ref=f1e208]:
            - strong [ref=f1e209]: 小饼 · 舒展
            - list [ref=f1e210]:
              - listitem [ref=f1e211]:
                - text: 已完成
                - generic [ref=f1e213]: 0 人
              - listitem [ref=f1e214]:
                - text: 进行中
                - generic [ref=f1e216]: 0 人
              - listitem [ref=f1e217]:
                - text: 待开始
                - generic [ref=f1e219]: 0 人
        - figure "环饼 · 紧凑 已完成 0 人 进行中 0 人 待开始 0 人" [ref=f1e220]:
          - generic [ref=f1e221]: 零总量
          - generic [ref=f1e225]:
            - strong [ref=f1e226]: 环饼 · 紧凑
            - list [ref=f1e227]:
              - listitem [ref=f1e228]:
                - text: 已完成
                - generic [ref=f1e230]: 0 人
              - listitem [ref=f1e231]:
                - text: 进行中
                - generic [ref=f1e233]: 0 人
              - listitem [ref=f1e234]:
                - text: 待开始
                - generic [ref=f1e236]: 0 人
        - figure "环饼 · 舒展 已完成 0 人 进行中 0 人 待开始 0 人" [ref=f1e237]:
          - generic [ref=f1e238]: 零总量
          - generic [ref=f1e242]:
            - strong [ref=f1e243]: 环饼 · 舒展
            - list [ref=f1e244]:
              - listitem [ref=f1e245]:
                - text: 已完成
                - generic [ref=f1e247]: 0 人
              - listitem [ref=f1e248]:
                - text: 进行中
                - generic [ref=f1e250]: 0 人
              - listitem [ref=f1e251]:
                - text: 待开始
                - generic [ref=f1e253]: 0 人
        - figure "完成环 · 紧凑 完成 0 人 · 目标 0 人" [ref=f1e254]:
          - generic [ref=f1e255]: 不适用
          - generic [ref=f1e259]:
            - strong [ref=f1e260]: 完成环 · 紧凑
            - generic [ref=f1e261]: 完成 0 人 · 目标 0 人
        - figure "完成环 · 舒展 完成 0 人 · 目标 0 人" [ref=f1e262]:
          - generic [ref=f1e263]: 不适用
          - generic [ref=f1e267]:
            - strong [ref=f1e268]: 完成环 · 舒展
            - generic [ref=f1e269]: 完成 0 人 · 目标 0 人
        - figure "完成弧 · 紧凑 完成 0 人 · 目标 0 人" [ref=f1e270]:
          - generic [ref=f1e271]: 不适用
          - generic [ref=f1e275]:
            - strong [ref=f1e276]: 完成弧 · 紧凑
            - generic [ref=f1e277]: 完成 0 人 · 目标 0 人
        - figure "完成弧 · 舒展 完成 0 人 · 目标 0 人" [ref=f1e278]:
          - generic [ref=f1e279]: 不适用
          - generic [ref=f1e283]:
            - strong [ref=f1e284]: 完成弧 · 舒展
            - generic [ref=f1e285]: 完成 0 人 · 目标 0 人
        - figure [ref=f1e286]:
          - generic [ref=f1e297]:
            - strong [ref=f1e298]: 折线走势 · 紧凑
            - text: 近8天每日人数 · 观察变化
        - figure [ref=f1e299]:
          - generic [ref=f1e310]:
            - strong [ref=f1e311]: 折线走势 · 舒展
            - text: 近8天每日人数 · 观察变化
        - figure [ref=f1e312]:
          - generic [ref=f1e323]:
            - strong [ref=f1e324]: 面积走势 · 紧凑
            - text: 近8天每日人数 · 观察变化
        - figure [ref=f1e325]:
          - generic [ref=f1e336]:
            - strong [ref=f1e337]: 面积走势 · 舒展
            - text: 近8天每日人数 · 观察变化
    - region [ref=f1e338]:
      - heading "指标卡：舒展型号" [level=2] [ref=f1e339]
      - generic [ref=f1e340]:
        - article [ref=f1e341]:
          - heading "本期参与人数" [level=3] [ref=f1e343]
          - generic [ref=f1e344]:
            - generic [ref=f1e345]: 0 人
            - paragraph [ref=f1e356]: 近8天每日人数 · 趋势按自身范围展开
        - article [ref=f1e357]:
          - heading "课程构成" [level=3] [ref=f1e359]
          - generic [ref=f1e360]:
            - generic [ref=f1e361]:
              - generic [ref=f1e362]: 0 门
              - generic [ref=f1e363]: 零总量
            - generic [ref=f1e366]:
              - generic [ref=f1e367]:
                - text: 已完成
                - generic [ref=f1e369]: "0"
              - generic [ref=f1e370]:
                - text: 进行中
                - generic [ref=f1e372]: "0"
              - generic [ref=f1e373]:
                - text: 待开始
                - generic [ref=f1e375]: "0"
        - article [ref=f1e376]:
          - heading "目标完成" [level=3] [ref=f1e378]
          - generic [ref=f1e379]:
            - generic [ref=f1e380]:
              - generic [ref=f1e381]: 不适用
              - generic [ref=f1e384]: 已完成 0 项
            - paragraph [ref=f1e385]: 目标未设置
    - region [ref=f1e386]:
      - heading "表格：紧凑型号，一起比较" [level=2] [ref=f1e387]
      - paragraph [ref=f1e388]: 参与人数共用 全零量程；每日柱图共用 全零量程。折线用于看各自走势；点击学院名称读取每个数据点。
      - region "学院数据与迷你图表" [ref=f1e389]:
        - table [ref=f1e390]:
          - rowgroup [ref=f1e391]:
            - row [ref=f1e392]:
              - columnheader "学院" [ref=f1e393]
              - columnheader "参与人数" [ref=f1e394]
              - columnheader "近8天趋势" [ref=f1e395]
              - columnheader "每日分布" [ref=f1e396]
              - columnheader "课程构成" [ref=f1e397]
              - columnheader "目标完成" [ref=f1e398]
          - rowgroup [ref=f1e399]:
            - row [ref=f1e400]:
              - cell [ref=f1e401]:
                - button "计算机学院" [ref=f1e402] [cursor=pointer]
              - cell "0 人" [ref=f1e404]
              - cell [ref=f1e408]
              - cell [ref=f1e411]
              - cell "共 0 门" [ref=f1e414]:
                - generic "已完成 0 / 进行中 0 / 待开始 0" [ref=f1e415]: 共 0 门
              - cell "不适用" [ref=f1e419]
            - row [ref=f1e424]:
              - cell [ref=f1e425]:
                - button "经济管理学院" [ref=f1e426] [cursor=pointer]
              - cell "0 人" [ref=f1e428]
              - cell [ref=f1e432]
              - cell [ref=f1e435]
              - cell "共 0 门" [ref=f1e438]:
                - generic "已完成 0 / 进行中 0 / 待开始 0" [ref=f1e439]: 共 0 门
              - cell "不适用" [ref=f1e443]
            - row [ref=f1e448]:
              - cell [ref=f1e449]:
                - button "人文学院" [ref=f1e450] [cursor=pointer]
              - cell "0 人" [ref=f1e452]
              - cell [ref=f1e456]
              - cell [ref=f1e459]
              - cell "共 0 门" [ref=f1e462]:
                - generic "已完成 0 / 进行中 0 / 待开始 0" [ref=f1e463]: 共 0 门
              - cell "不适用" [ref=f1e467]
            - row [ref=f1e472]:
              - cell [ref=f1e473]:
                - button "理学院" [ref=f1e474] [cursor=pointer]
              - cell "0 人" [ref=f1e476]
              - cell [ref=f1e480]
              - cell [ref=f1e483]
              - cell "共 0 门" [ref=f1e486]:
                - generic "已完成 0 / 进行中 0 / 待开始 0" [ref=f1e487]: 共 0 门
              - cell "不适用" [ref=f1e491]
            - row [ref=f1e496]:
              - cell [ref=f1e497]:
                - button "外国语学院" [ref=f1e498] [cursor=pointer]
              - cell "0 人" [ref=f1e500]
              - cell [ref=f1e504]
              - cell [ref=f1e507]
              - cell "共 0 门" [ref=f1e510]:
                - generic "已完成 0 / 进行中 0 / 待开始 0" [ref=f1e511]: 共 0 门
              - cell "不适用" [ref=f1e515]
    - region [ref=f1e520]:
      - heading "课程列表：读数就近成组" [level=2] [ref=f1e521]
      - list [ref=f1e522]:
        - listitem [ref=f1e523]:
          - strong [ref=f1e525]: 计算机学院 · 教学任务
          - generic [ref=f1e526]: 评分 0.0 / 10
          - generic [ref=f1e529]:
            - generic [ref=f1e530]: 不适用
            - generic [ref=f1e533]: 目标未设置
        - listitem [ref=f1e535]:
          - strong [ref=f1e537]: 经济管理学院 · 教学任务
          - generic [ref=f1e538]: 评分 0.0 / 10
          - generic [ref=f1e541]:
            - generic [ref=f1e542]: 不适用
            - generic [ref=f1e545]: 目标未设置
        - listitem [ref=f1e547]:
          - strong [ref=f1e549]: 人文学院 · 教学任务
          - generic [ref=f1e550]: 评分 0.0 / 10
          - generic [ref=f1e553]:
            - generic [ref=f1e554]: 不适用
            - generic [ref=f1e557]: 目标未设置
      - generic [ref=f1e559]:
        - generic [ref=f1e560]: 不适用
        - generic [ref=f1e563]:
          - strong [ref=f1e564]: 计算机学院 · 本期教学任务
          - paragraph [ref=f1e565]: 目标未设置
    - region [ref=f1e566]:
      - heading "分类交叉矩阵" [level=2] [ref=f1e567]
      - paragraph [ref=f1e568]: 示例数据
      - group "相似度矩阵规模" [ref=f1e569]:
        - button "4×4" [ref=f1e570] [cursor=pointer]
        - button "6×6" [pressed] [ref=f1e572] [cursor=pointer]
        - button "12×12" [ref=f1e574] [cursor=pointer]
      - region "每周学习时段 · 次数" [ref=f1e576]:
        - generic [ref=f1e577]:
          - generic [ref=f1e578]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=f1e579]
          - region "每周学习时段 · 次数，可横向滚动" [ref=f1e580]:
            - table [ref=f1e581]:
              - caption [ref=f1e582]: 每周学习时段 · 次数
              - rowgroup [ref=f1e609]:
                - row [ref=f1e610]:
                  - columnheader "星期" [ref=f1e611]
                  - columnheader "00:00" [ref=f1e612]
                  - columnheader "01:00" [ref=f1e613]
                  - columnheader "02:00" [ref=f1e614]
                  - columnheader "03:00" [ref=f1e615]
                  - columnheader "04:00" [ref=f1e616]
                  - columnheader "05:00" [ref=f1e617]
                  - columnheader "06:00" [ref=f1e618]
                  - columnheader "07:00" [ref=f1e619]
                  - columnheader "08:00" [ref=f1e620]
                  - columnheader "09:00" [ref=f1e621]
                  - columnheader "10:00" [ref=f1e622]
                  - columnheader "11:00" [ref=f1e623]
                  - columnheader "12:00" [ref=f1e624]
                  - columnheader "13:00" [ref=f1e625]
                  - columnheader "14:00" [ref=f1e626]
                  - columnheader "15:00" [ref=f1e627]
                  - columnheader "16:00" [ref=f1e628]
                  - columnheader "17:00" [ref=f1e629]
                  - columnheader "18:00" [ref=f1e630]
                  - columnheader "19:00" [ref=f1e631]
                  - columnheader "20:00" [ref=f1e632]
                  - columnheader "21:00" [ref=f1e633]
                  - columnheader "22:00" [ref=f1e634]
                  - columnheader "23:00" [ref=f1e635]
              - rowgroup [ref=f1e636]:
                - row [ref=f1e637]:
                  - rowheader "周一" [ref=f1e638]
                  - cell "0" [ref=f1e639]
                  - cell "0" [ref=f1e643]
                  - cell "0" [ref=f1e647]
                  - cell "0" [ref=f1e651]
                  - cell "0" [ref=f1e655]
                  - cell "0" [ref=f1e659]
                  - cell "0" [ref=f1e663]
                  - cell "0" [ref=f1e667]
                  - cell "0" [ref=f1e671]
                  - cell "0" [ref=f1e675]
                  - cell "0" [ref=f1e679]
                  - cell "0" [ref=f1e683]
                  - cell "0" [ref=f1e687]
                  - cell "0" [ref=f1e691]
                  - cell "0" [ref=f1e695]
                  - cell "0" [ref=f1e699]
                  - cell "0" [ref=f1e703]
                  - cell "0" [ref=f1e707]
                  - cell "0" [ref=f1e711]
                  - cell "0" [ref=f1e715]
                  - cell "0" [ref=f1e719]
                  - cell "0" [ref=f1e723]
                  - cell "0" [ref=f1e727]
                  - cell "0" [ref=f1e731]
                - row [ref=f1e735]:
                  - rowheader "周二" [ref=f1e736]
                  - cell "0" [ref=f1e737]
                  - cell "0" [ref=f1e741]
                  - cell "0" [ref=f1e745]
                  - cell "0" [ref=f1e749]
                  - cell "0" [ref=f1e753]
                  - cell "0" [ref=f1e757]
                  - cell "0" [ref=f1e761]
                  - cell "0" [ref=f1e765]
                  - cell "0" [ref=f1e769]
                  - cell "0" [ref=f1e773]
                  - cell "0" [ref=f1e777]
                  - cell "0" [ref=f1e781]
                  - cell "0" [ref=f1e785]
                  - cell "0" [ref=f1e789]
                  - cell "0" [ref=f1e793]
                  - cell "0" [ref=f1e797]
                  - cell "0" [ref=f1e801]
                  - cell "0" [ref=f1e805]
                  - cell "0" [ref=f1e809]
                  - cell "0" [ref=f1e813]
                  - cell "0" [ref=f1e817]
                  - cell "0" [ref=f1e821]
                  - cell "0" [ref=f1e825]
                  - cell "0" [ref=f1e829]
                - row [ref=f1e833]:
                  - rowheader "周三" [ref=f1e834]
                  - cell "0" [ref=f1e835]
                  - cell "0" [ref=f1e839]
                  - cell "0" [ref=f1e843]
                  - cell "0" [ref=f1e847]
                  - cell "0" [ref=f1e851]
                  - cell "0" [ref=f1e855]
                  - cell "0" [ref=f1e859]
                  - cell "0" [ref=f1e863]
                  - cell "0" [ref=f1e867]
                  - cell "0" [ref=f1e871]
                  - cell "0" [ref=f1e875]
                  - cell "0" [ref=f1e879]
                  - cell "0" [ref=f1e883]
                  - cell "0" [ref=f1e887]
                  - cell "0" [ref=f1e891]
                  - cell "0" [ref=f1e895]
                  - cell "0" [ref=f1e899]
                  - cell "0" [ref=f1e903]
                  - cell "0" [ref=f1e907]
                  - cell "0" [ref=f1e911]
                  - cell "0" [ref=f1e915]
                  - cell "0" [ref=f1e919]
                  - cell "0" [ref=f1e923]
                  - cell "0" [ref=f1e927]
                - row [ref=f1e931]:
                  - rowheader "周四" [ref=f1e932]
                  - cell "0" [ref=f1e933]
                  - cell "0" [ref=f1e937]
                  - cell "0" [ref=f1e941]
                  - cell "0" [ref=f1e945]
                  - cell "0" [ref=f1e949]
                  - cell "0" [ref=f1e953]
                  - cell "0" [ref=f1e957]
                  - cell "0" [ref=f1e961]
                  - cell "0" [ref=f1e965]
                  - cell "0" [ref=f1e969]
                  - cell "0" [ref=f1e973]
                  - cell "0" [ref=f1e977]
                  - cell "0" [ref=f1e981]
                  - cell "0" [ref=f1e985]
                  - cell "0" [ref=f1e989]
                  - cell "0" [ref=f1e993]
                  - cell "0" [ref=f1e997]
                  - cell "0" [ref=f1e1001]
                  - cell "0" [ref=f1e1005]
                  - cell "0" [ref=f1e1009]
                  - cell "0" [ref=f1e1013]
                  - cell "0" [ref=f1e1017]
                  - cell "0" [ref=f1e1021]
                  - cell "0" [ref=f1e1025]
                - row [ref=f1e1029]:
                  - rowheader "周五" [ref=f1e1030]
                  - cell "0" [ref=f1e1031]
                  - cell "0" [ref=f1e1035]
                  - cell "0" [ref=f1e1039]
                  - cell "0" [ref=f1e1043]
                  - cell "0" [ref=f1e1047]
                  - cell "0" [ref=f1e1051]
                  - cell "0" [ref=f1e1055]
                  - cell "0" [ref=f1e1059]
                  - cell "0" [ref=f1e1063]
                  - cell "0" [ref=f1e1067]
                  - cell "0" [ref=f1e1071]
                  - cell "0" [ref=f1e1075]
                  - cell "0" [ref=f1e1079]
                  - cell "0" [ref=f1e1083]
                  - cell "0" [ref=f1e1087]
                  - cell "0" [ref=f1e1091]
                  - cell "0" [ref=f1e1095]
                  - cell "0" [ref=f1e1099]
                  - cell "0" [ref=f1e1103]
                  - cell "0" [ref=f1e1107]
                  - cell "0" [ref=f1e1111]
                  - cell "0" [ref=f1e1115]
                  - cell "0" [ref=f1e1119]
                  - cell "0" [ref=f1e1123]
                - row [ref=f1e1127]:
                  - rowheader "周六" [ref=f1e1128]
                  - cell "0" [ref=f1e1129]
                  - cell "0" [ref=f1e1133]
                  - cell "0" [ref=f1e1137]
                  - cell "0" [ref=f1e1141]
                  - cell "0" [ref=f1e1145]
                  - cell "0" [ref=f1e1149]
                  - cell "0" [ref=f1e1153]
                  - cell "0" [ref=f1e1157]
                  - cell "0" [ref=f1e1161]
                  - cell "0" [ref=f1e1165]
                  - cell "0" [ref=f1e1169]
                  - cell "0" [ref=f1e1173]
                  - cell "0" [ref=f1e1177]
                  - cell "0" [ref=f1e1181]
                  - cell "0" [ref=f1e1185]
                  - cell "0" [ref=f1e1189]
                  - cell "0" [ref=f1e1193]
                  - cell "0" [ref=f1e1197]
                  - cell "0" [ref=f1e1201]
                  - cell "0" [ref=f1e1205]
                  - cell "0" [ref=f1e1209]
                  - cell "0" [ref=f1e1213]
                  - cell "0" [ref=f1e1217]
                  - cell "0" [ref=f1e1221]
                - row [ref=f1e1225]:
                  - rowheader "周日" [ref=f1e1226]
                  - cell "0" [ref=f1e1227]
                  - cell "0" [ref=f1e1231]
                  - cell "0" [ref=f1e1235]
                  - cell "0" [ref=f1e1239]
                  - cell "0" [ref=f1e1243]
                  - cell "0" [ref=f1e1247]
                  - cell "0" [ref=f1e1251]
                  - cell "0" [ref=f1e1255]
                  - cell "0" [ref=f1e1259]
                  - cell "0" [ref=f1e1263]
                  - cell "0" [ref=f1e1267]
                  - cell "0" [ref=f1e1271]
                  - cell "0" [ref=f1e1275]
                  - cell "0" [ref=f1e1279]
                  - cell "0" [ref=f1e1283]
                  - cell "0" [ref=f1e1287]
                  - cell "0" [ref=f1e1291]
                  - cell "0" [ref=f1e1295]
                  - cell "0" [ref=f1e1299]
                  - cell "0" [ref=f1e1303]
                  - cell "0" [ref=f1e1307]
                  - cell "0" [ref=f1e1311]
                  - cell "0" [ref=f1e1315]
                  - cell "缺测" [ref=f1e1319]
          - list "每周学习时段 · 次数图例" [ref=f1e1322]:
            - listitem [ref=f1e1323]:
              - generic [ref=f1e1324]:
                - button "0–4" [ref=f1e1325] [cursor=pointer]
                - button "4–8" [ref=f1e1326] [cursor=pointer]
                - button "8–12" [ref=f1e1327] [cursor=pointer]
                - button "12–16" [ref=f1e1328] [cursor=pointer]
                - button "16–20" [ref=f1e1329] [cursor=pointer]
              - generic [ref=f1e1330]:
                - generic [ref=f1e1331]: "0"
                - generic [ref=f1e1332]: "20"
        - paragraph [ref=f1e1333]: 按星期与小时比较学习次数，0 也是有效观测。
      - region "课程与培养方案版本 · 开课学期" [ref=f1e1334]:
        - generic [ref=f1e1335]:
          - generic [ref=f1e1336]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=f1e1337]
          - region "课程与培养方案版本 · 开课学期，可横向滚动" [ref=f1e1338]:
            - table [ref=f1e1339]:
              - caption [ref=f1e1340]: 课程与培养方案版本 · 开课学期
              - rowgroup [ref=f1e1347]:
                - row [ref=f1e1348]:
                  - columnheader "课程" [ref=f1e1349]
                  - columnheader "2022 版" [ref=f1e1350]
                  - columnheader "2023 版" [ref=f1e1351]
                  - columnheader "2024 版" [ref=f1e1352]
                  - columnheader "2025 版" [ref=f1e1353]
              - rowgroup [ref=f1e1354]:
                - row [ref=f1e1355]:
                  - rowheader "高等数学" [ref=f1e1356]
                  - cell "未设学期" [ref=f1e1357]
                  - cell "未设学期" [ref=f1e1360]
                  - cell "未设学期" [ref=f1e1363]
                  - cell "未设学期" [ref=f1e1366]
                - row [ref=f1e1369]:
                  - rowheader "线性代数" [ref=f1e1370]
                  - cell "未设学期" [ref=f1e1371]
                  - cell "未设学期" [ref=f1e1374]
                  - cell "未设学期" [ref=f1e1377]
                  - cell "未设学期" [ref=f1e1380]
                - row [ref=f1e1383]:
                  - rowheader "概率论与数理统计" [ref=f1e1384]
                  - cell "未设学期" [ref=f1e1385]
                  - cell "无该课程" [ref=f1e1388]:
                    - generic [ref=f1e1389]: —
                  - cell "未设学期" [ref=f1e1391]
                  - cell "未设学期" [ref=f1e1394]
                - row [ref=f1e1397]:
                  - rowheader "大学物理" [ref=f1e1398]
                  - cell "未设学期" [ref=f1e1399]
                  - cell "未设学期" [ref=f1e1402]
                  - cell "未设学期" [ref=f1e1405]
                  - cell "未设学期" [ref=f1e1408]
                - row [ref=f1e1411]:
                  - rowheader "程序设计基础" [ref=f1e1412]
                  - cell "未设学期" [ref=f1e1413]
                  - cell "未设学期" [ref=f1e1416]
                  - cell "未设学期" [ref=f1e1419]
                  - cell "未设学期" [ref=f1e1422]
                - row [ref=f1e1425]:
                  - rowheader "数据结构" [ref=f1e1426]
                  - cell "未设学期" [ref=f1e1427]
                  - cell "未设学期" [ref=f1e1430]
                  - cell "未设学期" [ref=f1e1433]
                  - cell "未设学期" [ref=f1e1436]
          - list "课程与培养方案版本 · 开课学期图例" [ref=f1e1439]:
            - listitem [ref=f1e1440]:
              - generic [ref=f1e1441]:
                - button "1–2.4" [ref=f1e1442] [cursor=pointer]
                - button "2.4–3.8" [ref=f1e1443] [cursor=pointer]
                - button "3.8–5.2" [ref=f1e1444] [cursor=pointer]
                - button "5.2–6.6" [ref=f1e1445] [cursor=pointer]
                - button "6.6–8" [ref=f1e1446] [cursor=pointer]
              - generic [ref=f1e1447]:
                - generic [ref=f1e1448]: "1"
                - generic [ref=f1e1449]: "2"
                - generic [ref=f1e1450]: "3"
                - generic [ref=f1e1451]: "4"
                - generic [ref=f1e1452]: "5"
                - generic [ref=f1e1453]: "6"
                - generic [ref=f1e1454]: "7"
                - generic [ref=f1e1455]: "8"
        - paragraph [ref=f1e1456]: 学期按 1—8 排列；未设学期与无该课程分别记录。
      - region "课程相似度" [ref=f1e1457]:
        - generic [ref=f1e1458]:
          - generic [ref=f1e1459]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=f1e1460]
          - region "课程相似度，可横向滚动" [ref=f1e1461]:
            - table [ref=f1e1462]:
              - caption [ref=f1e1463]: 课程相似度
              - rowgroup [ref=f1e1472]:
                - row [ref=f1e1473]:
                  - columnheader "课程" [ref=f1e1474]
                  - columnheader "高等数学" [ref=f1e1475]
                  - columnheader "线性代数" [ref=f1e1476]
                  - columnheader "概率论与数理统计" [ref=f1e1477]
                  - columnheader "大学物理" [ref=f1e1478]
                  - columnheader "程序设计基础" [ref=f1e1479]
                  - columnheader "数据结构" [ref=f1e1480]
              - rowgroup [ref=f1e1481]:
                - row [ref=f1e1482]:
                  - rowheader "高等数学" [ref=f1e1483]
                  - cell "缺测" [ref=f1e1484]
                  - cell "0%" [ref=f1e1487]
                  - cell "0%" [ref=f1e1491]
                  - cell "0%" [ref=f1e1495]
                  - cell "0%" [ref=f1e1499]
                  - cell "0%" [ref=f1e1503]
                - row [ref=f1e1507]:
                  - rowheader "线性代数" [ref=f1e1508]
                  - cell "0%" [ref=f1e1509]
                  - cell "0%" [ref=f1e1513]
                  - cell "0%" [ref=f1e1517]
                  - cell "0%" [ref=f1e1521]
                  - cell "0%" [ref=f1e1525]
                  - cell "0%" [ref=f1e1529]
                - row [ref=f1e1533]:
                  - rowheader "概率论与数理统计" [ref=f1e1534]
                  - cell "0%" [ref=f1e1535]
                  - cell "0%" [ref=f1e1539]
                  - cell "0%" [ref=f1e1543]
                  - cell "0%" [ref=f1e1547]
                  - cell "0%" [ref=f1e1551]
                  - cell "0%" [ref=f1e1555]
                - row [ref=f1e1559]:
                  - rowheader "大学物理" [ref=f1e1560]
                  - cell "0%" [ref=f1e1561]
                  - cell "0%" [ref=f1e1565]
                  - cell "0%" [ref=f1e1569]
                  - cell "缺测" [ref=f1e1573]
                  - cell "0%" [ref=f1e1576]
                  - cell "0%" [ref=f1e1580]
                - row [ref=f1e1584]:
                  - rowheader "程序设计基础" [ref=f1e1585]
                  - cell "0%" [ref=f1e1586]
                  - cell "0%" [ref=f1e1590]
                  - cell "0%" [ref=f1e1594]
                  - cell "0%" [ref=f1e1598]
                  - cell "0%" [ref=f1e1602]
                  - cell "0%" [ref=f1e1606]
                - row [ref=f1e1610]:
                  - rowheader "数据结构" [ref=f1e1611]
                  - cell "0%" [ref=f1e1612]
                  - cell "0%" [ref=f1e1616]
                  - cell "0%" [ref=f1e1620]
                  - cell "0%" [ref=f1e1624]
                  - cell "0%" [ref=f1e1628]
                  - cell "0%" [ref=f1e1632]
          - list "课程相似度图例" [ref=f1e1636]:
            - listitem [ref=f1e1637]:
              - generic [ref=f1e1638]:
                - button "0%–20%" [ref=f1e1639] [cursor=pointer]
                - button "20%–40%" [ref=f1e1640] [cursor=pointer]
                - button "40%–60%" [ref=f1e1641] [cursor=pointer]
                - button "60%–80%" [ref=f1e1642] [cursor=pointer]
                - button "80%–100%" [ref=f1e1643] [cursor=pointer]
              - generic [ref=f1e1644]:
                - generic [ref=f1e1645]: 0%
                - generic [ref=f1e1646]: 100%
        - paragraph [ref=f1e1647]: 同一课程对应两轴；方向不同的读数分别保留，缺测位置留空。
      - region "课程类别与学院 · 课程数" [ref=f1e1648]:
        - generic [ref=f1e1649]:
          - generic [ref=f1e1650]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=f1e1651]
          - region "课程类别与学院 · 课程数，可横向滚动" [ref=f1e1652]:
            - table [ref=f1e1653]:
              - caption [ref=f1e1654]: 课程类别与学院 · 课程数
              - rowgroup [ref=f1e1663]:
                - row [ref=f1e1664]:
                  - columnheader "课程类别" [ref=f1e1665]
                  - columnheader "计算机学院" [ref=f1e1666]
                  - columnheader "经济管理学院" [ref=f1e1667]
                  - columnheader "人文学院" [ref=f1e1668]
                  - columnheader "理学院" [ref=f1e1669]
                  - columnheader "外国语学院" [ref=f1e1670]
                  - columnheader "教育学院" [ref=f1e1671]
              - rowgroup [ref=f1e1672]:
                - row [ref=f1e1673]:
                  - rowheader "通识课程" [ref=f1e1674]
                  - cell "0" [ref=f1e1675]
                  - cell "0" [ref=f1e1679]
                  - cell "0" [ref=f1e1683]
                  - cell "0" [ref=f1e1687]
                  - cell "0" [ref=f1e1691]
                  - cell "0" [ref=f1e1695]
                - row [ref=f1e1699]:
                  - rowheader "学科基础" [ref=f1e1700]
                  - cell "0" [ref=f1e1701]
                  - cell "0" [ref=f1e1705]
                  - cell "0" [ref=f1e1709]
                  - cell "0" [ref=f1e1713]
                  - cell "0" [ref=f1e1717]
                  - cell "0" [ref=f1e1721]
                - row [ref=f1e1725]:
                  - rowheader "专业必修" [ref=f1e1726]
                  - cell "0" [ref=f1e1727]
                  - cell "0" [ref=f1e1731]
                  - cell "0" [ref=f1e1735]
                  - cell "0" [ref=f1e1739]
                  - cell "0" [ref=f1e1743]
                  - cell "0" [ref=f1e1747]
                - row [ref=f1e1751]:
                  - rowheader "专业选修" [ref=f1e1752]
                  - cell "0" [ref=f1e1753]
                  - cell "0" [ref=f1e1757]
                  - cell "0" [ref=f1e1761]
                  - cell "0" [ref=f1e1765]
                  - cell "0" [ref=f1e1769]
                  - cell "0" [ref=f1e1773]
                - row [ref=f1e1777]:
                  - rowheader "实践课程" [ref=f1e1778]
                  - cell "0" [ref=f1e1779]
                  - cell "0" [ref=f1e1783]
                  - cell "0" [ref=f1e1787]
                  - cell "0" [ref=f1e1791]
                  - cell "0" [ref=f1e1795]
                  - cell "0" [ref=f1e1799]
                - row [ref=f1e1803]:
                  - rowheader "创新课程" [ref=f1e1804]
                  - cell "0" [ref=f1e1805]
                  - cell "0" [ref=f1e1809]
                  - cell "0" [ref=f1e1813]
                  - cell "0" [ref=f1e1817]
                  - cell "0" [ref=f1e1821]
                  - cell "0" [ref=f1e1825]
          - list "课程类别与学院 · 课程数图例" [ref=f1e1829]:
            - button "0" [ref=f1e1830] [cursor=pointer]
        - paragraph [ref=f1e1835]: 圆面积与颜色深浅共用课程数量程；指向或用方向键查看精确课程数。
      - region "课程支撑关系" [ref=f1e1836]:
        - generic [ref=f1e1837]:
          - generic [ref=f1e1838]: 使用方向键查看相邻数据，Home 和 End 查看行首行尾，Escape 关闭提示。
          - status [ref=f1e1839]
          - region "课程支撑关系，可横向滚动" [ref=f1e1840]:
            - table [ref=f1e1841]:
              - caption [ref=f1e1842]: 课程支撑关系
              - rowgroup [ref=f1e1849]:
                - row [ref=f1e1850]:
                  - columnheader "课程" [ref=f1e1851]
                  - columnheader "知识与能力" [ref=f1e1852]
                  - columnheader "分析与表达" [ref=f1e1853]
                  - columnheader "协作与实践" [ref=f1e1854]
                  - columnheader "创新与反思" [ref=f1e1855]
              - rowgroup [ref=f1e1856]:
                - row [ref=f1e1857]:
                  - rowheader "高等数学" [ref=f1e1858]
                  - cell "无直接支撑" [ref=f1e1859]
                  - cell "无直接支撑" [ref=f1e1863]
                  - cell "无直接支撑" [ref=f1e1867]
                  - cell "无直接支撑" [ref=f1e1871]
                - row [ref=f1e1875]:
                  - rowheader "线性代数" [ref=f1e1876]
                  - cell "无直接支撑" [ref=f1e1877]
                  - cell "无直接支撑" [ref=f1e1881]
                  - cell "无直接支撑" [ref=f1e1885]
                  - cell "无直接支撑" [ref=f1e1889]
                - row [ref=f1e1893]:
                  - rowheader "概率论与数理统计" [ref=f1e1894]
                  - cell "无直接支撑" [ref=f1e1895]
                  - cell "无直接支撑" [ref=f1e1899]
                  - cell "无直接支撑" [ref=f1e1903]
                  - cell "无直接支撑" [ref=f1e1907]
                - row [ref=f1e1911]:
                  - rowheader "大学物理" [ref=f1e1912]
                  - cell "无直接支撑" [ref=f1e1913]
                  - cell "无直接支撑" [ref=f1e1917]
                  - cell "无直接支撑" [ref=f1e1921]
                  - cell "无直接支撑" [ref=f1e1925]
                - row [ref=f1e1929]:
                  - rowheader "程序设计基础" [ref=f1e1930]
                  - cell "无直接支撑" [ref=f1e1931]
                  - cell "无直接支撑" [ref=f1e1935]
                  - cell "无直接支撑" [ref=f1e1939]
                  - cell "无直接支撑" [ref=f1e1943]
                - row [ref=f1e1947]:
                  - rowheader "数据结构" [ref=f1e1948]
                  - cell "无直接支撑" [ref=f1e1949]
                  - cell "无直接支撑" [ref=f1e1953]
                  - cell "无直接支撑" [ref=f1e1957]
                  - cell "无直接支撑" [ref=f1e1961]
          - list "课程支撑关系图例" [ref=f1e1965]:
            - button "无直接支撑" [ref=f1e1966] [cursor=pointer]
            - button "一般支撑" [ref=f1e1971] [cursor=pointer]
            - button "核心支撑" [ref=f1e1976] [cursor=pointer]
        - paragraph [ref=f1e1981]: 支撑关系只有无直接支撑、一般支撑和核心支撑三个等级。
  - group [ref=f1e1982]:
    - generic "条形与嵌入组合源码" [ref=f1e1983] [cursor=pointer]
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
> 363 |     expect(new Set(frames.map(frame => frame.background)).size).toBeGreaterThan(2);
      |                                                                 ^ Error: expect(received).toBeGreaterThan(expected)
  364 |     expect(frames.every(frame => frame.plate === "rgba(0, 0, 0, 0)")).toBe(true);
  365 |     expect(frames.every(frame => frame.chosenRatio >= frame.bestRatio - .1)).toBe(true);
  366 |   }
  367 | });
  368 | 
```