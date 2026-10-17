# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: date-time-optimization.spec.ts >> D16 additional CSS zoom stress at 390px keeps all content reachable
- Location: tests/e2e/date-time-optimization.spec.ts:344:1

# Error details

```
Error: the complete panel stays within the viewport after layout settles

the complete panel stays within the viewport after layout settles

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    27326

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Date Picker 日期与时间" [level=1] [ref=e9]
      - generic [ref=e10]: G5 · 表单与日期 · 共享候选 · 视觉与体验待审阅
    - paragraph [ref=e11]: 在面板里编辑日期与时分，确认后更新字段；取消或关闭会放弃未确认修改。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [ref=e13] [cursor=pointer]
      - button "深色" [pressed] [ref=e15] [cursor=pointer]
      - button "紧凑密度" [pressed] [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "单日与带时分的单日" [level=2] [ref=e21]
      - paragraph [ref=e22]: 字段显示已确认值，面板中的修改在确定前保持为草稿。
      - generic [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]: 截止日期
          - generic [ref=e28]:
            - button "截止日期" [ref=e30] [cursor=pointer]:
              - generic [ref=e31]: 2026-10-20
            - generic [ref=e34]: 2026-10-20
            - status [ref=e35]
        - generic [ref=e36]:
          - generic [ref=e37]: 截止时间
          - generic [ref=e38]:
            - button "截止时间" [ref=e40] [cursor=pointer]:
              - generic [ref=e41]: 2026-10-20 18:00
            - generic [ref=e44]: 2026-10-20 18:00
            - status [ref=e45]
    - generic [ref=e46]:
      - heading "日期区间与日期时间区间" [level=2] [ref=e47]
      - paragraph [ref=e48]: 宽屏并排展示连续两个月，窄屏切换单月；日期与时分可以直接编辑。取消、外点或 Escape 放弃草稿。
      - generic [ref=e51]:
        - generic [ref=e52]:
          - generic [ref=e53]:
            - text: 开放时间
            - generic [ref=e54]: "*"
          - generic [ref=e55]:
            - button "开放时间" [ref=e57] [cursor=pointer]:
              - generic [ref=e58]: 2026-10-12 09:00 至 2026-10-20 18:00
            - generic [ref=e61]: 2026-10-12 09:00 至 2026-10-20 18:00
            - status [ref=e62]
        - generic [ref=e63]:
          - generic [ref=e64]: 日期区间
          - generic [ref=e65]:
            - button "日期区间" [ref=e67] [cursor=pointer]:
              - generic [ref=e68]: 请选择日期范围
            - generic [ref=e71]: 尚未选择日期
            - status [ref=e72]
    - generic [ref=e74]:
      - heading "作业：开放与截止" [level=2] [ref=e75]
      - paragraph [ref=e76]: 立即开放只保存开放意图；定时开放与截止分别编辑，外层保存时再次检查时间关系。
      - form "作业发布设置" [ref=e78]:
        - generic [ref=e79]:
          - heading "作业发布设置" [level=3] [ref=e80]
          - paragraph [ref=e81]: 本地样板 · 人工智能导论 · 第五讲
        - generic [ref=e82]:
          - generic [ref=e83]:
            - generic [ref=e84]:
              - text: 作业名称
              - generic [ref=e85]: "*"
            - textbox "作业名称" [ref=e87]: 第五讲案例分析
          - generic [ref=e89]:
            - generic [ref=e90]: 作业类型
            - combobox "作业类型" [ref=e92] [cursor=pointer]:
              - option "案例报告" [selected]
              - option "课堂练习"
              - option "讨论任务"
          - generic [ref=e93]:
            - generic [ref=e94]:
              - text: 所属课程
              - generic [ref=e95]: "*"
            - group [ref=e96]:
              - generic [ref=e97]:
                - combobox "所属课程" [ref=e98]: 人工智能导论
                - generic [ref=e100]:
                  - button "清除所属课程" [ref=e101] [cursor=pointer]
                  - button "展开选项" [ref=e104] [cursor=pointer]
            - textbox [ref=e107]: ai
          - generic [ref=e108]:
            - generic [ref=e109]:
              - text: 满分
              - generic [ref=e110]: "*"
            - generic [ref=e111]:
              - generic [ref=e112]:
                - button "减少满分" [ref=e113] [cursor=pointer]
                - generic [ref=e115]:
                  - spinbutton "满分" [ref=e116]: "100"
                  - generic [ref=e117]: 分
                - button "增加满分" [ref=e118] [cursor=pointer]
              - generic [ref=e120]: 单位：分
        - generic [ref=e121]:
          - generic [ref=e122]: 作业说明
          - generic [ref=e123]:
            - textbox "作业说明" [ref=e124]: 结合课堂案例，说明你的判断及支持它的证据。
            - generic [ref=e125]: 21 / 500
          - generic [ref=e127]: 说明学习目标、提交内容和判断依据。
        - radiogroup "开放方式" [ref=e128]:
          - generic [ref=e130]:
            - generic [ref=e131] [cursor=pointer]:
              - radio "立即开放" [checked] [ref=e132]
              - generic [ref=e136]: 立即开放
            - generic [ref=e138] [cursor=pointer]:
              - radio "定时开放" [ref=e139]
              - generic [ref=e142]: 定时开放
        - generic [ref=e145]:
          - generic [ref=e146]:
            - text: 作业截止时间
            - generic [ref=e147]: "*"
          - generic [ref=e148]:
            - button "作业截止时间" [ref=e150] [cursor=pointer]:
              - generic [ref=e151]: 2026-10-13 23:59
            - generic [ref=e154]: 2026-10-13 23:59
            - status [ref=e155]
          - generic [ref=e156]: 23:59 是明确时刻；到达该时间后停止提交。
        - generic "作业设置摘要" [ref=e157]:
          - generic [ref=e158]:
            - term [ref=e159]: 开放方式
            - definition [ref=e160]: 保存后立即开放
          - generic [ref=e161]:
            - term [ref=e162]: 截止时间
            - definition [ref=e163]: 2026-10-13 23:59
          - generic [ref=e164]:
            - term [ref=e165]: 时间基准
            - definition [ref=e166]: 本机时间（Asia/Shanghai · 北京时间）
        - generic [ref=e167]:
          - status "作业保存结果" [ref=e168]: 面板确定后更新草稿，保存后更新本地作业设置。
          - button "保存设置" [ref=e169] [cursor=pointer]
    - generic [ref=e172]:
      - heading "考试：开放窗口与答题时长" [level=2] [ref=e173]
      - paragraph [ref=e174]: 窗口决定何时可以作答，答题时长单独设置。下方入场模拟使用明确的本地关闭策略。
      - form "考试开放设置" [ref=e176]:
        - generic [ref=e177]:
          - heading "考试开放与答题时长" [level=3] [ref=e178]
          - paragraph [ref=e179]: 本地样板 · 开放窗口与每位学生的答题时长分别设置。
        - generic [ref=e180]:
          - generic [ref=e181]:
            - text: 考试开放窗口
            - generic [ref=e182]: "*"
          - generic [ref=e183]:
            - button "考试开放窗口" [ref=e185] [cursor=pointer]:
              - generic [ref=e186]: 2026-10-13 09:00 至 2026-10-13 11:00
            - generic [ref=e189]: 2026-10-13 09:00 至 2026-10-13 11:00
            - status [ref=e190]
        - generic [ref=e191]:
          - generic [ref=e192]:
            - generic [ref=e193]:
              - text: 答题时长
              - generic [ref=e194]: "*"
            - generic [ref=e195]:
              - generic [ref=e196]:
                - button "减少答题时长" [ref=e197] [cursor=pointer]
                - generic [ref=e199]:
                  - spinbutton "答题时长" [ref=e200]: "60"
                  - generic [ref=e201]: 分钟
                - button "增加答题时长" [ref=e202] [cursor=pointer]
              - generic [ref=e204]: 单位：分钟
            - generic [ref=e205]: 每位学生开始作答后计时。
          - generic [ref=e206]:
            - strong [ref=e207]: 关闭规则
            - paragraph [ref=e208]: 本地演示策略：到达关闭时间统一结束。
        - generic "考试设置摘要" [ref=e209]:
          - generic [ref=e210]:
            - term [ref=e211]: 开放窗口
            - definition [ref=e212]: 2026-10-13 09:00 → 11:00
          - generic [ref=e213]:
            - term [ref=e214]: 窗口长度
            - definition [ref=e215]: 2 小时
          - generic [ref=e216]:
            - term [ref=e217]: 时间基准
            - definition [ref=e218]: 本机时间（Asia/Shanghai · 北京时间）
        - generic [ref=e219]:
          - generic [ref=e220]:
            - generic [ref=e221]: 模拟入场时间
            - generic [ref=e222]:
              - button "模拟入场时间" [ref=e224] [cursor=pointer]:
                - generic [ref=e225]: 2026-10-13 10:30
              - generic [ref=e228]: 2026-10-13 10:30
              - status [ref=e229]
            - generic [ref=e230]: 可选择开放前、窗口中或关闭时，查看能否开始以及实际可用时长。
          - paragraph [ref=e231]: 可答题 30 分钟；最晚于 2026-10-13 11:00 结束。
        - generic [ref=e232]:
          - status "考试保存结果" [ref=e233]: 面板确定后更新草稿，保存后更新本地考试设置。
          - button "保存考试设置" [ref=e234] [cursor=pointer]
    - generic [ref=e237]:
      - heading "时间段：同日、跨午夜与跨月" [level=2] [ref=e238]
      - paragraph [ref=e239]: 先看完整起止结果再保存；常用场景和按时长操作都保持为待确认草稿。
      - form "时间段设置" [ref=e241]:
        - generic [ref=e242]:
          - heading "同日与跨日时间段" [level=3] [ref=e243]
          - paragraph [ref=e244]: 本地活动样板 · 可直接修改任一端，或在面板内选择常用场景。
        - generic [ref=e245]:
          - generic [ref=e246]:
            - text: 活动时间段
            - generic [ref=e247]: "*"
          - generic [ref=e248]:
            - button "活动时间段" [expanded] [ref=e251] [cursor=pointer]:
              - generic [ref=e252]: 2026-10-13 23:00 至 2026-10-14 01:00
            - generic [ref=e256]: 2026-10-13 23:00 至 2026-10-14 01:00
            - status [ref=e257]
          - dialog [ref=e260]:
            - generic [ref=e261]:
              - heading "选择日期范围与时间" [level=2] [ref=e262]
              - generic [ref=e263]:
                - generic [ref=e264]:
                  - generic [ref=e265]:
                    - generic [ref=e266]: 开始
                    - textbox "开始日期" [ref=e268]:
                      - /placeholder: YYYY-MM-DD
                      - text: 2026-10-13
                    - group "开始时间" [ref=e269]:
                      - generic [ref=e271]:
                        - textbox "开始小时" [ref=e274]: "23"
                        - generic [ref=e275]:
                          - generic [ref=e276]: ":"
                          - textbox "开始分钟" [ref=e278]: "00"
                        - generic [ref=e279]:
                          - combobox "开始常用时间" [ref=e281] [cursor=pointer]:
                            - generic "23:00" [ref=e283]
                          - generic [ref=e287]: 已选：23:00
                        - textbox [ref=e288]: 23:00
                  - generic [ref=e289]:
                    - generic [ref=e290]: 结束
                    - textbox "结束日期" [ref=e292]:
                      - /placeholder: YYYY-MM-DD
                      - text: 2026-10-14
                    - group "结束时间" [ref=e293]:
                      - generic [ref=e295]:
                        - textbox "结束小时" [ref=e298]: "01"
                        - generic [ref=e299]:
                          - generic [ref=e300]: ":"
                          - textbox "结束分钟" [active] [ref=e302]: "30"
                        - generic [ref=e303]:
                          - combobox "结束常用时间" [ref=e305] [cursor=pointer]:
                            - generic "01:30" [ref=e307]
                          - generic [ref=e311]: 已选：01:30
                        - textbox [ref=e312]: 01:30
                - generic [ref=e313]: 当前正在编辑：结束
                - generic "常用日期" [ref=e314]:
                  - button "同日 90 分钟" [ref=e316] [cursor=pointer]
                  - button "跨午夜" [ref=e319] [cursor=pointer]
                  - button "跨月时段" [ref=e322] [cursor=pointer]
                - generic [ref=e326]:
                  - navigation "切换月份":
                    - button "上个月" [disabled] [ref=e327]
                    - button "下个月" [ref=e330] [cursor=pointer]
                  - generic [ref=e333]:
                    - generic [ref=e335]:
                      - generic [ref=e336]:
                        - combobox "选择年份" [ref=e338] [cursor=pointer]:
                          - generic "2026年" [ref=e340]
                        - generic [ref=e344]: 已选：2026年
                      - textbox [ref=e345]: "2026"
                      - generic [ref=e346]:
                        - combobox "选择月份" [ref=e348] [cursor=pointer]:
                          - generic "10月" [ref=e350]
                        - generic [ref=e354]: 已选：10月
                      - textbox [ref=e355]: "9"
                      - status [ref=e356]: 2026年10月
                    - grid "2026年10月" [ref=e357]:
                      - rowgroup [ref=e358]:
                        - row [ref=e359]:
                          - columnheader [ref=e360]: 一
                          - columnheader [ref=e361]: 二
                          - columnheader [ref=e362]: 三
                          - columnheader [ref=e363]: 四
                          - columnheader [ref=e364]: 五
                          - columnheader [ref=e365]: 六
                          - columnheader [ref=e366]: 日
                      - rowgroup [ref=e367]:
                        - row [ref=e368]:
                          - gridcell [ref=e369]:
                            - button "2026年10月1日" [disabled] [ref=e370]:
                              - generic [ref=e371]: "1"
                          - gridcell [ref=e372]:
                            - button "2026年10月2日" [disabled] [ref=e373]:
                              - generic [ref=e374]: "2"
                          - gridcell [ref=e375]:
                            - button "2026年10月3日" [disabled] [ref=e376]:
                              - generic [ref=e377]: "3"
                          - gridcell [ref=e378]:
                            - button "2026年10月4日" [disabled] [ref=e379]:
                              - generic [ref=e380]: "4"
                        - row [ref=e381]:
                          - gridcell [ref=e382]:
                            - button "2026年10月5日" [disabled] [ref=e383]:
                              - generic [ref=e384]: "5"
                          - gridcell [ref=e385]:
                            - button "2026年10月6日" [disabled] [ref=e386]:
                              - generic [ref=e387]: "6"
                          - gridcell [ref=e388]:
                            - button "2026年10月7日" [disabled] [ref=e389]:
                              - generic [ref=e390]: "7"
                          - gridcell [ref=e391]:
                            - button "2026年10月8日" [disabled] [ref=e392]:
                              - generic [ref=e393]: "8"
                          - gridcell [ref=e394]:
                            - button "2026年10月9日" [disabled] [ref=e395]:
                              - generic [ref=e396]: "9"
                          - gridcell [ref=e397]:
                            - button "2026年10月10日" [disabled] [ref=e398]:
                              - generic [ref=e399]: "10"
                          - gridcell [ref=e400]:
                            - button "2026年10月11日" [disabled] [ref=e401]:
                              - generic [ref=e402]: "11"
                        - row [ref=e403]:
                          - gridcell [ref=e404]:
                            - button "2026年10月12日，今天" [ref=e405] [cursor=pointer]:
                              - generic [ref=e406]: "12"
                          - gridcell [selected] [ref=e407]:
                            - button "2026年10月13日，已选中" [ref=e408] [cursor=pointer]:
                              - generic [ref=e409]: "13"
                          - gridcell [selected] [ref=e410]:
                            - button "2026年10月14日，已选中" [ref=e411] [cursor=pointer]:
                              - generic [ref=e412]: "14"
                          - gridcell [ref=e413]:
                            - button "2026年10月15日" [ref=e414] [cursor=pointer]:
                              - generic [ref=e415]: "15"
                          - gridcell [ref=e416]:
                            - button "2026年10月16日" [ref=e417] [cursor=pointer]:
                              - generic [ref=e418]: "16"
                          - gridcell [ref=e419]:
                            - button "2026年10月17日" [ref=e420] [cursor=pointer]:
                              - generic [ref=e421]: "17"
                          - gridcell [ref=e422]:
                            - button "2026年10月18日" [ref=e423] [cursor=pointer]:
                              - generic [ref=e424]: "18"
                        - row [ref=e425]:
                          - gridcell [ref=e426]:
                            - button "2026年10月19日" [ref=e427] [cursor=pointer]:
                              - generic [ref=e428]: "19"
                          - gridcell [ref=e429]:
                            - button "2026年10月20日" [ref=e430] [cursor=pointer]:
                              - generic [ref=e431]: "20"
                          - gridcell [ref=e432]:
                            - button "2026年10月21日" [ref=e433] [cursor=pointer]:
                              - generic [ref=e434]: "21"
                          - gridcell [ref=e435]:
                            - button "2026年10月22日" [ref=e436] [cursor=pointer]:
                              - generic [ref=e437]: "22"
                          - gridcell [ref=e438]:
                            - button "2026年10月23日" [ref=e439] [cursor=pointer]:
                              - generic [ref=e440]: "23"
                          - gridcell [ref=e441]:
                            - button "2026年10月24日" [ref=e442] [cursor=pointer]:
                              - generic [ref=e443]: "24"
                          - gridcell [ref=e444]:
                            - button "2026年10月25日" [ref=e445] [cursor=pointer]:
                              - generic [ref=e446]: "25"
                        - row [ref=e447]:
                          - gridcell [ref=e448]:
                            - button "2026年10月26日" [ref=e449] [cursor=pointer]:
                              - generic [ref=e450]: "26"
                          - gridcell [ref=e451]:
                            - button "2026年10月27日" [ref=e452] [cursor=pointer]:
                              - generic [ref=e453]: "27"
                          - gridcell [ref=e454]:
                            - button "2026年10月28日" [ref=e455] [cursor=pointer]:
                              - generic [ref=e456]: "28"
                          - gridcell [ref=e457]:
                            - button "2026年10月29日" [ref=e458] [cursor=pointer]:
                              - generic [ref=e459]: "29"
                          - gridcell [ref=e460]:
                            - button "2026年10月30日" [ref=e461] [cursor=pointer]:
                              - generic [ref=e462]: "30"
                          - gridcell [ref=e463]:
                            - button "2026年10月31日" [ref=e464] [cursor=pointer]:
                              - generic [ref=e465]: "31"
                          - gridcell [ref=e466]:
                            - button "2026年11月1日" [ref=e467] [cursor=pointer]:
                              - generic [ref=e468]: "1"
                        - row [ref=e469]:
                          - gridcell [ref=e470]:
                            - button "2026年11月2日" [ref=e471] [cursor=pointer]:
                              - generic [ref=e472]: "2"
                          - gridcell [ref=e473]:
                            - button "2026年11月3日" [ref=e474] [cursor=pointer]:
                              - generic [ref=e475]: "3"
                          - gridcell [ref=e476]:
                            - button "2026年11月4日" [ref=e477] [cursor=pointer]:
                              - generic [ref=e478]: "4"
                          - gridcell [ref=e479]:
                            - button "2026年11月5日" [ref=e480] [cursor=pointer]:
                              - generic [ref=e481]: "5"
                          - gridcell [ref=e482]:
                            - button "2026年11月6日" [ref=e483] [cursor=pointer]:
                              - generic [ref=e484]: "6"
                          - gridcell [ref=e485]:
                            - button "2026年11月7日" [ref=e486] [cursor=pointer]:
                              - generic [ref=e487]: "7"
                          - gridcell [ref=e488]:
                            - button "2026年11月8日" [ref=e489] [cursor=pointer]:
                              - generic [ref=e490]: "8"
                - generic [ref=e491]:
                  - generic [ref=e492]: 按时长设置结束
                  - generic [ref=e493]:
                    - button "30分钟" [ref=e495] [cursor=pointer]
                    - button "60分钟" [ref=e498] [cursor=pointer]
                    - button "90分钟" [ref=e501] [cursor=pointer]
                    - button "120分钟" [ref=e504] [cursor=pointer]
                  - generic [ref=e506]:
                    - textbox "自定义时长（分钟）" [ref=e508]:
                      - /placeholder: 自定义分钟
                    - button "应用时长" [disabled] [ref=e509]
                - generic [ref=e511]: 2026-10-13 23:00 至 2026-10-14 01:30 · 次日 01:30 · 时段长度 2 小时 30 分钟
              - generic [ref=e513]:
                - button "清空" [ref=e514] [cursor=pointer]
                - button "取消" [ref=e516] [cursor=pointer]
                - button "确定" [ref=e518] [cursor=pointer]
        - generic "时间段摘要" [ref=e522]:
          - generic [ref=e523]:
            - term [ref=e524]: 起止时间
            - definition [ref=e525]: 2026-10-13 23:00 → 2026-10-14 01:00（次日）
          - generic [ref=e526]:
            - term [ref=e527]: 时段长度
            - definition [ref=e528]: 2 小时
          - generic [ref=e529]:
            - term [ref=e530]: 时间基准
            - definition [ref=e531]: 本机时间（Asia/Shanghai · 北京时间）
        - paragraph [ref=e532]: 修改开始不会自动移动结束；需要保持时长时，在面板中重新选择“按时长设置结束”。
        - generic [ref=e533]:
          - status "时间段保存结果" [ref=e534]: 选择、取消和清空均先作用于面板草稿。
          - button "保存时间段" [ref=e535] [cursor=pointer]
      - generic [ref=e537]:
        - generic [ref=e538]:
          - button "复制代码" [ref=e539] [cursor=pointer]
          - status
        - code [ref=e542]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"活动时间段\" required> <DatePicker mode=\"range\" showTime size={36} value={value} onValueChange={setValue} timeStep={15} minDurationMinutes={1} durationPresets={[30, 60, 90, 120]} presets={[{ label: \"明天 09:00–10:30\", getValue: now => ({ from: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9), to: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30), }) }]} /> </FormItem>; }"
    - generic [ref=e543]:
      - heading "在筛选区组合使用" [level=2] [ref=e544]
      - paragraph [ref=e545]: 课程与成绩即时改变结果；统计日期按面板确认后的值更新。
      - generic [ref=e547]:
        - generic [ref=e548]:
          - heading "教学数据筛选" [level=3] [ref=e549]
          - paragraph [ref=e550]: 以下为本地课程样例数据。
        - generic [ref=e551]:
          - generic [ref=e552]:
            - generic [ref=e553]: 筛选课程
            - group [ref=e554]:
              - generic [ref=e555]:
                - combobox "筛选课程" [ref=e556]: 人工智能导论
                - generic [ref=e558]:
                  - button "清除筛选课程" [ref=e559] [cursor=pointer]
                  - button "展开选项" [ref=e562] [cursor=pointer]
            - textbox [ref=e565]: ai
          - generic [ref=e566]:
            - generic [ref=e567]: 统计日期
            - generic [ref=e568]:
              - button "统计日期" [ref=e570] [cursor=pointer]:
                - generic [ref=e571]: 2026-10-01 至 2026-10-31
              - generic [ref=e574]: 2026-10-01 至 2026-10-31
              - status [ref=e575]
        - generic [ref=e576]:
          - generic [ref=e577]: 成绩范围 60–100 分
          - group "成绩范围 60–100 分" [ref=e578]:
            - generic [ref=e579] [cursor=pointer]:
              - slider "筛选成绩下限" [ref=e583]: "60"
              - slider "筛选成绩上限" [ref=e585]: "100"
        - status [ref=e586]:
          - strong [ref=e587]: "2"
          - generic [ref=e588]: 位学生符合当前筛选
          - paragraph [ref=e589]: 2026-10-01 至 2026-10-31
    - generic [ref=e590]:
      - heading "在对话框和侧栏中编辑" [level=2] [ref=e591]
      - paragraph [ref=e592]: 日期面板先处理自己的关闭，再回到当前编辑任务。
      - generic [ref=e595]:
        - button "对话框设置日期" [ref=e596] [cursor=pointer]
        - button "侧栏设置时间" [ref=e598] [cursor=pointer]
    - group [ref=e600]:
      - generic "来源、复用关系与当前边界" [ref=e601] [cursor=pointer]
  - region [ref=e602]:
    - heading "使用边界" [level=2] [ref=e603]
    - generic [ref=e604]:
      - generic [ref=e605]:
        - heading "适合用在" [level=3] [ref=e606]
        - list [ref=e607]:
          - listitem [ref=e608]: 设置截止日期、开放时间或起止区间。
          - listitem [ref=e609]: 需要检查选择结果后再明确提交。
      - generic [ref=e610]:
        - heading "避免用在" [level=3] [ref=e611]
        - list [ref=e612]:
          - listitem [ref=e613]: 需要自然语言日期解析、复杂时区转换或秒级排班。
          - listitem [ref=e614]: 把面板里每次选择都立即写入业务数据。
  - generic [ref=e615]:
    - region [ref=e616]:
      - heading "API 与结构" [level=2] [ref=e617]
      - table [ref=e619]:
        - caption [ref=e620]: Date Picker 日期与时间 常用接口
        - rowgroup [ref=e621]:
          - row [ref=e622]:
            - columnheader "名称" [ref=e623]
            - columnheader "类型" [ref=e624]
            - columnheader "默认" [ref=e625]
            - columnheader "说明" [ref=e626]
        - rowgroup [ref=e627]:
          - row [ref=e628]:
            - rowheader [ref=e629]:
              - code [ref=e630]: size / appearance / status
            - cell [ref=e631]:
              - code [ref=e632]: 24 | 28 | 32 | 36 / outlined | filled | underlined / default | warning | error
            - cell "—" [ref=e633]
            - cell "沿用 Rain 字段尺寸、外观和状态；FormItem 可以统一传递状态。" [ref=e634]
          - row [ref=e635]:
            - rowheader [ref=e636]:
              - code [ref=e637]: disabled / required
            - cell [ref=e638]:
              - code [ref=e639]: boolean
            - cell "—" [ref=e640]
            - cell "禁用与必填按真实控件语义使用，提供可见标签或可访问名称。" [ref=e641]
          - row [ref=e642]:
            - rowheader [ref=e643]:
              - code [ref=e644]: mode / showTime
            - cell [ref=e645]:
              - code [ref=e646]: single | range / boolean
            - cell "single / false" [ref=e647]
            - cell "单日、日期区间及各自的时分模式；面板内可手输 YYYY-MM-DD 和时分。" [ref=e648]
          - row [ref=e649]:
            - rowheader [ref=e650]:
              - code [ref=e651]: value / onValueChange
            - cell [ref=e652]:
              - code [ref=e653]: Date | DateRange | null / callback
            - cell "—" [ref=e654]
            - cell "公开区间必须完整，仅确定时提交；清空也经过确定。" [ref=e655]
          - row [ref=e656]:
            - rowheader [ref=e657]:
              - code [ref=e658]: minDate / maxDate / disabledDates
            - cell [ref=e659]:
              - code [ref=e660]: Date / Date / Matcher
            - cell "—" [ref=e661]
            - cell "无时间时按日比较，带时间时比较分钟；当前时间限制由宿主更新，保存时精确复核。" [ref=e662]
          - row [ref=e663]:
            - rowheader [ref=e664]:
              - code [ref=e665]: presets / timeStep
            - cell [ref=e666]:
              - code [ref=e667]: DatePickerPreset[] / 5 | 15 | 30
            - cell "—" [ref=e668]
            - cell "快捷值在点击时计算；时间步长只影响建议列表，手输仍精确到分钟。" [ref=e669]
          - row [ref=e670]:
            - rowheader [ref=e671]:
              - code [ref=e672]: durationPresets / minDurationMinutes / maxDurationMinutes
            - cell [ref=e673]:
              - code [ref=e674]: number[] / number / number
            - cell "—" [ref=e675]
            - cell "仅日期时间范围使用；按时长设置结束只执行一次，教学窗口显式设置最短 1 分钟。" [ref=e676]
          - row [ref=e677]:
            - rowheader [ref=e678]:
              - code [ref=e679]: excludeDisabled
            - cell [ref=e680]:
              - code [ref=e681]: boolean
            - cell "true" [ref=e682]
            - cell "默认整段不能跨禁用日期；false 时仍禁止选择禁用端点。" [ref=e683]
    - region [ref=e684]:
      - heading "调用示例" [level=2] [ref=e685]
      - generic [ref=e686]:
        - generic [ref=e687]:
          - button "复制代码" [ref=e688] [cursor=pointer]
          - status
        - code [ref=e691]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"开放时间\" required><DatePicker mode=\"range\" showTime value={value} onValueChange={setValue} size={36} /></FormItem>; }"
      - paragraph [ref=e692]:
        - text: 当前源码：
        - code [ref=e693]: packages/ui/src/date-picker/date-picker.tsx
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page, type TestInfo } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { fileURLToPath } from "node:url";
  4   | 
  5   | const evidenceRoot = fileURLToPath(new URL("../../evidence/runtime/date-time-optimization-2026-10-12/browser/", import.meta.url));
  6   | const evidence = process.env.RAIN_DATE_TIME_CSS_ZOOM_STRESS === "1" ? `${evidenceRoot}/css-zoom-stress` : evidenceRoot;
  7   | mkdirSync(evidence, { recursive: true });
  8   | const fixedNow = new Date("2026-10-12T10:00:30+08:00");
  9   | const consoleErrors = new Map<string, string[]>();
  10  | const panel = (page: Page) => page.getByRole("dialog", { name: /^选择日期/ });
  11  | const confirm = (page: Page) => panel(page).getByRole("button", { name: "确定", exact: true });
  12  | const box = (page: Page, label: string) => panel(page).getByRole("textbox", { name: label, exact: true });
  13  | const summary = (page: Page) => panel(page).locator('[data-slot="summary"]');
  14  | const hint = (page: Page) => panel(page).getByRole("status", { name: "日期选择提示" });
  15  | const basicProject = (info: TestInfo) => ["desktop", "webkit"].includes(info.project.name);
  16  | const day = (page: Page, year: number, month: number, date: number) => panel(page).getByRole("button", { name: new RegExp(`^${year}年${month}月${date}日`) }).first();
  17  | async function open(page: Page, label: string) {
  18  |   await expect(panel(page)).toHaveCount(0);
  19  |   const trigger = page.getByRole("button", { name: label, exact: true });
  20  |   await trigger.click(); await expect(panel(page)).toBeVisible(); return trigger;
  21  | }
  22  | async function dateTime(page: Page, endpoint: "开始" | "结束" | "日期", date: string, hour: string, minute: string) {
  23  |   await box(page, endpoint === "日期" ? "日期" : `${endpoint}日期`).fill(date);
  24  |   await box(page, `${endpoint}小时`).fill(hour); await box(page, `${endpoint}分钟`).fill(minute);
  25  |   await box(page, `${endpoint}分钟`).press("Tab");
  26  | }
  27  | async function screenshot(locator: Locator, info: TestInfo, name: string) {
  28  |   await locator.screenshot({ path: `${evidence}/${name}-${info.project.name}.png` });
  29  | }
  30  | async function hasNoDuplicateIds(page: Page) {
  31  |   expect(await page.evaluate(() => {
  32  |     const ids = [...document.querySelectorAll("[id]")].map(node => node.id);
  33  |     return ids.filter((id, index) => ids.indexOf(id) !== index);
  34  |   })).toEqual([]);
  35  | }
  36  | async function assertPanelGeometry(page: Page) {
  37  |   const popup = panel(page);
  38  |   await expect.poll(async () => {
  39  |     const bounds = await popup.boundingBox(), viewport = page.viewportSize()!;
  40  |     return Math.max(-bounds!.x, -bounds!.y, bounds!.x + bounds!.width - viewport.width, bounds!.y + bounds!.height - viewport.height);
> 41  |   }, { message: "the complete panel stays within the viewport after layout settles" }).toBeLessThanOrEqual(1);
      |                                                                                        ^ Error: the complete panel stays within the viewport after layout settles
  42  |   const sheet = await popup.evaluate(node => node.classList.contains("rain-date-picker__sheet"));
  43  |   const content = popup.locator(sheet ? ".rain-sheet-body" : ".rain-date-picker__body");
  44  |   const actions = popup.locator('[data-slot="actions"]');
  45  |   await expect.poll(async () => {
  46  |     const body = await content.boundingBox(), footer = await actions.boundingBox();
  47  |     return body!.y + body!.height - footer!.y;
  48  |   }, { message: "the scrollable body must finish before the action footer" }).toBeLessThanOrEqual(1);
  49  |   expect(await popup.evaluate(node => node.scrollWidth - node.clientWidth), "date panel has no horizontal overflow").toBeLessThanOrEqual(1);
  50  |   expect(await content.evaluate(node => node.scrollWidth - node.clientWidth), "scrolling body has no horizontal overflow").toBeLessThanOrEqual(1);
  51  | }
  52  | 
  53  | test.beforeEach(async ({ page }, info) => {
  54  |   const messages: string[] = []; consoleErrors.set(info.testId, messages);
  55  |   page.on("pageerror", error => messages.push(error.message));
  56  |   page.on("console", message => { if (message.type() === "error") messages.push(message.text()); });
  57  |   // Freeze Date only. Normal browser timers continue to run for Base UI and animations.
  58  |   await page.clock.setFixedTime(fixedNow);
  59  | });
  60  | test.afterEach(async ({}, info) => {
  61  |   const messages = consoleErrors.get(info.testId) ?? [];
  62  |   writeFileSync(`${evidence}/console-${info.project.name}-${info.line}.json`, JSON.stringify(messages, null, 2));
  63  |   expect(messages, "uncaught browser errors").toEqual([]);
  64  | });
  65  | 
  66  | test("D18 D20 all three task samples save locally with complete dates and timezone", async ({ page, browser }, info) => {
  67  |   await page.goto("/#date-picker");
  68  |   const environment = await page.evaluate(() => ({ timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, currentDate: new Date().toISOString(), coarsePointer: matchMedia("(pointer: coarse)").matches, width: innerWidth, height: innerHeight }));
  69  |   writeFileSync(`${evidence}/environment-${info.project.name}.json`, JSON.stringify({ browser: browser.browserType().name(), version: browser.version(), ...environment }, null, 2));
  70  |   for (const [id, button, status, label, text] of [
  71  |     ["date-time-homework", "保存设置", "作业保存结果", "作业设置摘要", "截止 2026-10-13 23:59"],
  72  |     ["date-time-exam", "保存考试设置", "考试保存结果", "考试设置摘要", "答题时长 60 分钟"],
  73  |     ["date-time-cross-day", "保存时间段", "时间段保存结果", "时间段摘要", "2026-10-14 01:00"],
  74  |   ]) {
  75  |     const section = page.getByTestId(id!);
  76  |     await section.getByRole("button", { name: button!, exact: true }).click();
  77  |     await expect(section.getByRole("status", { name: status! })).toContainText(text!);
  78  |     await expect(section.getByLabel(label!, { exact: true })).toContainText("Asia/Shanghai · 北京时间");
  79  |     await screenshot(section, info, id!);
  80  |   }
  81  |   await hasNoDuplicateIds(page);
  82  | });
  83  | 
  84  | test("D01 D02 D03 strict typed dates and minute precision preserve the committed value", async ({ page }, info) => {
  85  |   test.skip(!basicProject(info), "Input semantics exercised in Chromium and WebKit.");
  86  |   await page.goto("/#date-picker"); const trigger = await open(page, "截止时间");
  87  |   const date = box(page, "日期");
  88  |   await date.fill("2026-02-30"); await date.press("Tab");
  89  |   await expect(confirm(page)).toBeDisabled(); await expect(date).toHaveValue("2026-02-30");
  90  |   await expect(hint(page)).toContainText("日期无效");
  91  |   await date.fill("2028-02-29"); await expect(panel(page).getByRole("combobox", { name: "选择月份" })).toHaveText("2月");
  92  |   await panel(page).getByRole("button", { name: "下个月", exact: true }).click();
  93  |   await box(page, "日期小时").fill("9"); await box(page, "日期分钟").fill("5"); await box(page, "日期分钟").press("Tab");
  94  |   await expect(panel(page).getByRole("combobox", { name: "选择月份" })).toHaveText("3月");
  95  |   await expect(summary(page)).toHaveText("2028-02-29 09:05");
  96  |   await box(page, "日期小时").fill("25"); await expect(confirm(page)).toBeDisabled();
  97  |   await box(page, "日期小时").fill("23"); await box(page, "日期分钟").fill(""); await expect(confirm(page)).toBeDisabled();
  98  |   await expect(date).toHaveValue("2028-02-29");
  99  |   await box(page, "日期分钟").fill("59"); await confirm(page).click();
  100 |   await expect(trigger).toHaveText("2028-02-29 23:59");
  101 |   await open(page, "开放时间"); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  102 |   await expect(confirm(page)).toBeDisabled(); await expect(hint(page)).not.toHaveAttribute("data-invalid", "true");
  103 |   await day(page, 2026, 10, 13).click(); await expect(confirm(page)).toBeDisabled();
  104 |   await expect(hint(page)).toHaveText("请选择结束日期");
  105 | });
  106 | 
  107 | test("D03 pasted HH:mm and IME composition never commit an unfinished value", async ({ page }, info) => {
  108 |   test.skip(info.project.name !== "desktop", "Clipboard permissions and simulated IME are Chromium browser checks.");
  109 |   await page.goto("/#date-picker"); await open(page, "截止时间");
  110 |   await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  111 |   await page.evaluate(() => navigator.clipboard.writeText("09:30"));
  112 |   const hour = box(page, "日期小时"); await hour.focus(); await hour.press("ControlOrMeta+V");
  113 |   await expect(hour).toHaveValue("09"); await expect(box(page, "日期分钟")).toHaveValue("30");
  114 |   await hour.dispatchEvent("compositionstart", { data: "9" });
  115 |   await expect(confirm(page)).toBeDisabled();
  116 |   await hour.press("Enter"); await expect(panel(page)).toBeVisible();
  117 |   await hour.dispatchEvent("compositionend", { data: "9" }); await expect(confirm(page)).toBeEnabled();
  118 |   await box(page, "日期").dispatchEvent("compositionstart", { data: "2026" });
  119 |   await expect(confirm(page)).toBeDisabled();
  120 |   await box(page, "日期").dispatchEvent("compositionend", { data: "2026" }); await expect(confirm(page)).toBeEnabled();
  121 | });
  122 | 
  123 | test("D04 D05 D06 D07 endpoint editing preserves identities and enforces a positive teaching window", async ({ page }, info) => {
  124 |   test.skip(!basicProject(info), "Endpoint semantics exercised in Chromium and WebKit.");
  125 |   await page.goto("/#date-picker"); const trigger = await open(page, "考试开放窗口");
  126 |   await box(page, "结束分钟").fill("30");
  127 |   await expect(box(page, "开始日期")).toHaveValue("2026-10-13"); await expect(box(page, "开始小时")).toHaveValue("09");
  128 |   await box(page, "结束小时").fill("10"); await expect(summary(page)).toContainText(/1\s*小时\s*30\s*分钟/);
  129 |   await box(page, "结束小时").fill("09"); await box(page, "结束分钟").fill("00");
  130 |   await expect(confirm(page)).toBeDisabled(); await expect(hint(page)).toContainText("至少1分钟");
  131 |   await box(page, "结束小时").fill("10"); await box(page, "结束分钟").fill("30");
  132 |   await box(page, "开始小时").fill("11"); await expect(confirm(page)).toBeDisabled();
  133 |   await expect(box(page, "结束小时")).toHaveValue("10"); await expect(hint(page)).toContainText("不能早于");
  134 |   await box(page, "开始小时").fill("09"); await confirm(page).click();
  135 |   await expect(trigger).toHaveText("2026-10-13 09:00 至 2026-10-13 10:30");
  136 |   await expect(page.getByLabel("考试设置摘要", { exact: true })).toContainText("1 小时 30 分钟");
  137 |   // The generic date-only range still accepts a same-day value.
  138 |   const dateTrigger = await open(page, "日期区间");
  139 |   await day(page, 2026, 10, 20).click(); await day(page, 2026, 10, 20).click(); await confirm(page).click();
  140 |   await expect(dateTrigger).toHaveText("2026-10-20 至 2026-10-20");
  141 | });
```