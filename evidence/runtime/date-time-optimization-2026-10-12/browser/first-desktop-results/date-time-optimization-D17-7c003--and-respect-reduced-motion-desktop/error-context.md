# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: date-time-optimization.spec.ts >> D17 rapid month changes leave one live month and respect reduced motion
- Location: tests/e2e/date-time-optimization.spec.ts:277:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "220ms"
Received: ".22s"
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
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "单日与带时分的单日" [level=2] [ref=e21]
      - paragraph [ref=e22]: 字段显示已确认值，面板中的修改在确定前保持为草稿。
      - generic [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]: 截止日期
          - generic [ref=e28]:
            - button "截止日期" [expanded] [ref=e31] [cursor=pointer]:
              - generic [ref=e32]: 2026-10-20
            - generic [ref=e36]: 2026-10-20
            - status [ref=e37]
          - dialog [ref=e40]:
            - generic [ref=e41]:
              - heading "选择日期" [level=2] [ref=e42]
              - generic [ref=e43]:
                - generic [ref=e45]:
                  - generic [ref=e46]: 日期
                  - textbox "日期" [ref=e48]:
                    - /placeholder: YYYY-MM-DD
                    - text: 2026-10-20
                - generic [ref=e51]:
                  - navigation "切换月份":
                    - button "上个月" [ref=e52] [cursor=pointer]
                    - button "下个月" [ref=e55] [cursor=pointer]
                  - generic [ref=e58]:
                    - generic [ref=e60]:
                      - generic [ref=e61]:
                        - combobox "选择年份" [ref=e63] [cursor=pointer]:
                          - generic "2026年" [ref=e65]
                        - generic [ref=e69]: 已选：2026年
                      - textbox [ref=e70]: "2026"
                      - generic [ref=e71]:
                        - combobox "选择月份" [ref=e73] [cursor=pointer]:
                          - generic "10月" [ref=e75]
                        - generic [ref=e79]: 已选：10月
                      - textbox [ref=e80]: "9"
                      - status [ref=e81]: 2026年10月
                    - grid "2026年10月" [ref=e82]:
                      - rowgroup [ref=e83]:
                        - row [ref=e84]:
                          - columnheader [ref=e85]: 一
                          - columnheader [ref=e86]: 二
                          - columnheader [ref=e87]: 三
                          - columnheader [ref=e88]: 四
                          - columnheader [ref=e89]: 五
                          - columnheader [ref=e90]: 六
                          - columnheader [ref=e91]: 日
                      - rowgroup [ref=e92]:
                        - row [ref=e93]:
                          - gridcell [ref=e94]:
                            - button "2026年9月28日" [ref=e95] [cursor=pointer]:
                              - generic [ref=e96]: "28"
                          - gridcell [ref=e97]:
                            - button "2026年9月29日" [ref=e98] [cursor=pointer]:
                              - generic [ref=e99]: "29"
                          - gridcell [ref=e100]:
                            - button "2026年9月30日" [ref=e101] [cursor=pointer]:
                              - generic [ref=e102]: "30"
                          - gridcell [ref=e103]:
                            - button "2026年10月1日" [ref=e104] [cursor=pointer]:
                              - generic [ref=e105]: "1"
                          - gridcell [ref=e106]:
                            - button "2026年10月2日" [ref=e107] [cursor=pointer]:
                              - generic [ref=e108]: "2"
                          - gridcell [ref=e109]:
                            - button "2026年10月3日" [ref=e110] [cursor=pointer]:
                              - generic [ref=e111]: "3"
                          - gridcell [ref=e112]:
                            - button "2026年10月4日" [ref=e113] [cursor=pointer]:
                              - generic [ref=e114]: "4"
                        - row [ref=e115]:
                          - gridcell [ref=e116]:
                            - button "2026年10月5日" [ref=e117] [cursor=pointer]:
                              - generic [ref=e118]: "5"
                          - gridcell [ref=e119]:
                            - button "2026年10月6日" [ref=e120] [cursor=pointer]:
                              - generic [ref=e121]: "6"
                          - gridcell [ref=e122]:
                            - button "2026年10月7日" [ref=e123] [cursor=pointer]:
                              - generic [ref=e124]: "7"
                          - gridcell [ref=e125]:
                            - button "2026年10月8日" [ref=e126] [cursor=pointer]:
                              - generic [ref=e127]: "8"
                          - gridcell [ref=e128]:
                            - button "2026年10月9日" [ref=e129] [cursor=pointer]:
                              - generic [ref=e130]: "9"
                          - gridcell [ref=e131]:
                            - button "2026年10月10日" [ref=e132] [cursor=pointer]:
                              - generic [ref=e133]: "10"
                          - gridcell [ref=e134]:
                            - button "2026年10月11日" [ref=e135] [cursor=pointer]:
                              - generic [ref=e136]: "11"
                        - row [ref=e137]:
                          - gridcell [ref=e138]:
                            - button "2026年10月12日，今天" [ref=e139] [cursor=pointer]:
                              - generic [ref=e140]: "12"
                          - gridcell [ref=e141]:
                            - button "2026年10月13日" [ref=e142] [cursor=pointer]:
                              - generic [ref=e143]: "13"
                          - gridcell [ref=e144]:
                            - button "2026年10月14日" [ref=e145] [cursor=pointer]:
                              - generic [ref=e146]: "14"
                          - gridcell [ref=e147]:
                            - button "2026年10月15日" [ref=e148] [cursor=pointer]:
                              - generic [ref=e149]: "15"
                          - gridcell [ref=e150]:
                            - button "2026年10月16日" [ref=e151] [cursor=pointer]:
                              - generic [ref=e152]: "16"
                          - gridcell [ref=e153]:
                            - button "2026年10月17日" [ref=e154] [cursor=pointer]:
                              - generic [ref=e155]: "17"
                          - gridcell [ref=e156]:
                            - button "2026年10月18日" [ref=e157] [cursor=pointer]:
                              - generic [ref=e158]: "18"
                        - row [ref=e159]:
                          - gridcell [ref=e160]:
                            - button "2026年10月19日" [ref=e161] [cursor=pointer]:
                              - generic [ref=e162]: "19"
                          - gridcell [selected] [ref=e163]:
                            - button "2026年10月20日，已选中" [active] [ref=e164] [cursor=pointer]:
                              - generic [ref=e165]: "20"
                          - gridcell [ref=e166]:
                            - button "2026年10月21日" [ref=e167] [cursor=pointer]:
                              - generic [ref=e168]: "21"
                          - gridcell [ref=e169]:
                            - button "2026年10月22日" [ref=e170] [cursor=pointer]:
                              - generic [ref=e171]: "22"
                          - gridcell [ref=e172]:
                            - button "2026年10月23日" [ref=e173] [cursor=pointer]:
                              - generic [ref=e174]: "23"
                          - gridcell [ref=e175]:
                            - button "2026年10月24日" [ref=e176] [cursor=pointer]:
                              - generic [ref=e177]: "24"
                          - gridcell [ref=e178]:
                            - button "2026年10月25日" [ref=e179] [cursor=pointer]:
                              - generic [ref=e180]: "25"
                        - row [ref=e181]:
                          - gridcell [ref=e182]:
                            - button "2026年10月26日" [ref=e183] [cursor=pointer]:
                              - generic [ref=e184]: "26"
                          - gridcell [ref=e185]:
                            - button "2026年10月27日" [ref=e186] [cursor=pointer]:
                              - generic [ref=e187]: "27"
                          - gridcell [ref=e188]:
                            - button "2026年10月28日" [ref=e189] [cursor=pointer]:
                              - generic [ref=e190]: "28"
                          - gridcell [ref=e191]:
                            - button "2026年10月29日" [ref=e192] [cursor=pointer]:
                              - generic [ref=e193]: "29"
                          - gridcell [ref=e194]:
                            - button "2026年10月30日" [ref=e195] [cursor=pointer]:
                              - generic [ref=e196]: "30"
                          - gridcell [ref=e197]:
                            - button "2026年10月31日" [ref=e198] [cursor=pointer]:
                              - generic [ref=e199]: "31"
                          - gridcell [ref=e200]:
                            - button "2026年11月1日" [ref=e201] [cursor=pointer]:
                              - generic [ref=e202]: "1"
                        - row [ref=e203]:
                          - gridcell [ref=e204]:
                            - button "2026年11月2日" [ref=e205] [cursor=pointer]:
                              - generic [ref=e206]: "2"
                          - gridcell [ref=e207]:
                            - button "2026年11月3日" [ref=e208] [cursor=pointer]:
                              - generic [ref=e209]: "3"
                          - gridcell [ref=e210]:
                            - button "2026年11月4日" [ref=e211] [cursor=pointer]:
                              - generic [ref=e212]: "4"
                          - gridcell [ref=e213]:
                            - button "2026年11月5日" [ref=e214] [cursor=pointer]:
                              - generic [ref=e215]: "5"
                          - gridcell [ref=e216]:
                            - button "2026年11月6日" [ref=e217] [cursor=pointer]:
                              - generic [ref=e218]: "6"
                          - gridcell [ref=e219]:
                            - button "2026年11月7日" [ref=e220] [cursor=pointer]:
                              - generic [ref=e221]: "7"
                          - gridcell [ref=e222]:
                            - button "2026年11月8日" [ref=e223] [cursor=pointer]:
                              - generic [ref=e224]: "8"
                - generic [ref=e225]: 2026-10-20
              - generic [ref=e227]:
                - button "清空" [ref=e228] [cursor=pointer]
                - button "取消" [ref=e230] [cursor=pointer]
                - button "确定" [ref=e232] [cursor=pointer]
        - generic [ref=e236]:
          - generic [ref=e237]: 截止时间
          - generic [ref=e238]:
            - button "截止时间" [ref=e240] [cursor=pointer]:
              - generic [ref=e241]: 2026-10-20 18:00
            - generic [ref=e244]: 2026-10-20 18:00
            - status [ref=e245]: 2026-10-20 18:00
    - generic [ref=e246]:
      - heading "日期区间与日期时间区间" [level=2] [ref=e247]
      - paragraph [ref=e248]: 宽屏并排展示连续两个月，窄屏切换单月；日期与时分可以直接编辑。取消、外点或 Escape 放弃草稿。
      - generic [ref=e251]:
        - generic [ref=e252]:
          - generic [ref=e253]:
            - text: 开放时间
            - generic [ref=e254]: "*"
          - generic [ref=e255]:
            - button "开放时间" [ref=e257] [cursor=pointer]:
              - generic [ref=e258]: 2026-10-12 09:00 至 2026-10-20 18:00
            - generic [ref=e261]: 2026-10-12 09:00 至 2026-10-20 18:00
            - status [ref=e262]: 2026-10-12 09:00 至 2026-10-20 18:00
        - generic [ref=e263]:
          - generic [ref=e264]: 日期区间
          - generic [ref=e265]:
            - button "日期区间" [ref=e267] [cursor=pointer]:
              - generic [ref=e268]: 请选择日期范围
            - generic [ref=e271]: 尚未选择日期
            - status [ref=e272]
    - generic [ref=e274]:
      - heading "作业：开放与截止" [level=2] [ref=e275]
      - paragraph [ref=e276]: 立即开放只保存开放意图；定时开放与截止分别编辑，外层保存时再次检查时间关系。
      - form "作业发布设置" [ref=e278]:
        - generic [ref=e279]:
          - heading "作业发布设置" [level=3] [ref=e280]
          - paragraph [ref=e281]: 本地样板 · 人工智能导论 · 第五讲
        - generic [ref=e282]:
          - generic [ref=e283]:
            - generic [ref=e284]:
              - text: 作业名称
              - generic [ref=e285]: "*"
            - textbox "作业名称" [ref=e287]: 第五讲案例分析
          - generic [ref=e289]:
            - generic [ref=e290]: 作业类型
            - combobox "作业类型" [ref=e292] [cursor=pointer]:
              - option "案例报告" [selected]
              - option "课堂练习"
              - option "讨论任务"
          - generic [ref=e293]:
            - generic [ref=e294]:
              - text: 所属课程
              - generic [ref=e295]: "*"
            - group [ref=e296]:
              - generic [ref=e297]:
                - combobox "所属课程" [ref=e298]: 人工智能导论
                - generic [ref=e300]:
                  - button "清除所属课程" [ref=e301] [cursor=pointer]
                  - button "展开选项" [ref=e304] [cursor=pointer]
            - textbox [ref=e307]: ai
          - generic [ref=e308]:
            - generic [ref=e309]:
              - text: 满分
              - generic [ref=e310]: "*"
            - generic [ref=e311]:
              - generic [ref=e312]:
                - button "减少满分" [ref=e313] [cursor=pointer]
                - generic [ref=e315]:
                  - spinbutton "满分" [ref=e316]: "100"
                  - generic [ref=e317]: 分
                - button "增加满分" [ref=e318] [cursor=pointer]
              - generic [ref=e320]: 单位：分
        - generic [ref=e321]:
          - generic [ref=e322]: 作业说明
          - generic [ref=e323]:
            - textbox "作业说明" [ref=e324]: 结合课堂案例，说明你的判断及支持它的证据。
            - generic [ref=e325]: 21 / 500
          - generic [ref=e327]: 说明学习目标、提交内容和判断依据。
        - radiogroup "开放方式" [ref=e328]:
          - generic [ref=e330]:
            - generic [ref=e331] [cursor=pointer]:
              - radio "立即开放" [checked] [ref=e332]
              - generic [ref=e336]: 立即开放
            - generic [ref=e338] [cursor=pointer]:
              - radio "定时开放" [ref=e339]
              - generic [ref=e342]: 定时开放
        - generic [ref=e345]:
          - generic [ref=e346]:
            - text: 作业截止时间
            - generic [ref=e347]: "*"
          - generic [ref=e348]:
            - button "作业截止时间" [ref=e350] [cursor=pointer]:
              - generic [ref=e351]: 2026-10-13 23:59
            - generic [ref=e354]: 2026-10-13 23:59
            - status [ref=e355]: 2026-10-13 23:59
          - generic [ref=e356]: 23:59 是明确时刻；到达该时间后停止提交。
        - generic "作业设置摘要" [ref=e357]:
          - generic [ref=e358]:
            - term [ref=e359]: 开放方式
            - definition [ref=e360]: 保存后立即开放
          - generic [ref=e361]:
            - term [ref=e362]: 截止时间
            - definition [ref=e363]: 2026-10-13 23:59
          - generic [ref=e364]:
            - term [ref=e365]: 时间基准
            - definition [ref=e366]: 本机时间（Asia/Shanghai · 北京时间）
        - generic [ref=e367]:
          - status "作业保存结果" [ref=e368]: 面板确定后更新草稿，保存后更新本地作业设置。
          - button "保存设置" [ref=e369] [cursor=pointer]
    - generic [ref=e372]:
      - heading "考试：开放窗口与答题时长" [level=2] [ref=e373]
      - paragraph [ref=e374]: 窗口决定何时可以作答，答题时长单独设置。下方入场模拟使用明确的本地关闭策略。
      - form "考试开放设置" [ref=e376]:
        - generic [ref=e377]:
          - heading "考试开放与答题时长" [level=3] [ref=e378]
          - paragraph [ref=e379]: 本地样板 · 开放窗口与每位学生的答题时长分别设置。
        - generic [ref=e380]:
          - generic [ref=e381]:
            - text: 考试开放窗口
            - generic [ref=e382]: "*"
          - generic [ref=e383]:
            - button "考试开放窗口" [ref=e385] [cursor=pointer]:
              - generic [ref=e386]: 2026-10-13 09:00 至 2026-10-13 11:00
            - generic [ref=e389]: 2026-10-13 09:00 至 2026-10-13 11:00
            - status [ref=e390]: 2026-10-13 09:00 至 2026-10-13 11:00
        - generic [ref=e391]:
          - generic [ref=e392]:
            - generic [ref=e393]:
              - text: 答题时长
              - generic [ref=e394]: "*"
            - generic [ref=e395]:
              - generic [ref=e396]:
                - button "减少答题时长" [ref=e397] [cursor=pointer]
                - generic [ref=e399]:
                  - spinbutton "答题时长" [ref=e400]: "60"
                  - generic [ref=e401]: 分钟
                - button "增加答题时长" [ref=e402] [cursor=pointer]
              - generic [ref=e404]: 单位：分钟
            - generic [ref=e405]: 每位学生开始作答后计时。
          - generic [ref=e406]:
            - strong [ref=e407]: 关闭规则
            - paragraph [ref=e408]: 本地演示策略：到达关闭时间统一结束。
        - generic "考试设置摘要" [ref=e409]:
          - generic [ref=e410]:
            - term [ref=e411]: 开放窗口
            - definition [ref=e412]: 2026-10-13 09:00 → 11:00
          - generic [ref=e413]:
            - term [ref=e414]: 窗口长度
            - definition [ref=e415]: 2 小时
          - generic [ref=e416]:
            - term [ref=e417]: 时间基准
            - definition [ref=e418]: 本机时间（Asia/Shanghai · 北京时间）
        - generic [ref=e419]:
          - generic [ref=e420]:
            - generic [ref=e421]: 模拟入场时间
            - generic [ref=e422]:
              - button "模拟入场时间" [ref=e424] [cursor=pointer]:
                - generic [ref=e425]: 2026-10-13 10:30
              - generic [ref=e428]: 2026-10-13 10:30
              - status [ref=e429]: 2026-10-13 10:30
            - generic [ref=e430]: 可选择开放前、窗口中或关闭时，查看能否开始以及实际可用时长。
          - paragraph [ref=e431]: 可答题 30 分钟；最晚于 2026-10-13 11:00 结束。
        - generic [ref=e432]:
          - status "考试保存结果" [ref=e433]: 面板确定后更新草稿，保存后更新本地考试设置。
          - button "保存考试设置" [ref=e434] [cursor=pointer]
    - generic [ref=e437]:
      - heading "时间段：同日、跨午夜与跨月" [level=2] [ref=e438]
      - paragraph [ref=e439]: 先看完整起止结果再保存；常用场景和按时长操作都保持为待确认草稿。
      - form "时间段设置" [ref=e441]:
        - generic [ref=e442]:
          - heading "同日与跨日时间段" [level=3] [ref=e443]
          - paragraph [ref=e444]: 本地活动样板 · 可直接修改任一端，或在面板内选择常用场景。
        - generic [ref=e445]:
          - generic [ref=e446]:
            - text: 活动时间段
            - generic [ref=e447]: "*"
          - generic [ref=e448]:
            - button "活动时间段" [ref=e450] [cursor=pointer]:
              - generic [ref=e451]: 2026-10-13 23:00 至 2026-10-14 01:00
            - generic [ref=e454]: 2026-10-13 23:00 至 2026-10-14 01:00
            - status [ref=e455]: 2026-10-13 23:00 至 2026-10-14 01:00
        - generic "时间段摘要" [ref=e456]:
          - generic [ref=e457]:
            - term [ref=e458]: 起止时间
            - definition [ref=e459]: 2026-10-13 23:00 → 2026-10-14 01:00（次日）
          - generic [ref=e460]:
            - term [ref=e461]: 时段长度
            - definition [ref=e462]: 2 小时
          - generic [ref=e463]:
            - term [ref=e464]: 时间基准
            - definition [ref=e465]: 本机时间（Asia/Shanghai · 北京时间）
        - paragraph [ref=e466]: 修改开始不会自动移动结束；需要保持时长时，在面板中重新选择“按时长设置结束”。
        - generic [ref=e467]:
          - status "时间段保存结果" [ref=e468]: 选择、取消和清空均先作用于面板草稿。
          - button "保存时间段" [ref=e469] [cursor=pointer]
      - generic [ref=e471]:
        - generic [ref=e472]:
          - button "复制代码" [ref=e473] [cursor=pointer]
          - status
        - code [ref=e476]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"活动时间段\" required> <DatePicker mode=\"range\" showTime size={36} value={value} onValueChange={setValue} timeStep={15} minDurationMinutes={1} durationPresets={[30, 60, 90, 120]} presets={[{ label: \"明天 09:00–10:30\", getValue: now => ({ from: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9), to: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30), }) }]} /> </FormItem>; }"
    - generic [ref=e477]:
      - heading "在筛选区组合使用" [level=2] [ref=e478]
      - paragraph [ref=e479]: 课程与成绩即时改变结果；统计日期按面板确认后的值更新。
      - generic [ref=e481]:
        - generic [ref=e482]:
          - heading "教学数据筛选" [level=3] [ref=e483]
          - paragraph [ref=e484]: 以下为本地课程样例数据。
        - generic [ref=e485]:
          - generic [ref=e486]:
            - generic [ref=e487]: 筛选课程
            - group [ref=e488]:
              - generic [ref=e489]:
                - combobox "筛选课程" [ref=e490]: 人工智能导论
                - generic [ref=e492]:
                  - button "清除筛选课程" [ref=e493] [cursor=pointer]
                  - button "展开选项" [ref=e496] [cursor=pointer]
            - textbox [ref=e499]: ai
          - generic [ref=e500]:
            - generic [ref=e501]: 统计日期
            - generic [ref=e502]:
              - button "统计日期" [ref=e504] [cursor=pointer]:
                - generic [ref=e505]: 2026-10-01 至 2026-10-31
              - generic [ref=e508]: 2026-10-01 至 2026-10-31
              - status [ref=e509]: 2026-10-01 至 2026-10-31
        - generic [ref=e510]:
          - generic [ref=e511]: 成绩范围 60–100 分
          - group "成绩范围 60–100 分" [ref=e512]:
            - generic [ref=e513] [cursor=pointer]:
              - slider "筛选成绩下限" [ref=e517]: "60"
              - slider "筛选成绩上限" [ref=e519]: "100"
        - status [ref=e520]:
          - strong [ref=e521]: "2"
          - generic [ref=e522]: 位学生符合当前筛选
          - paragraph [ref=e523]: 2026-10-01 至 2026-10-31
    - generic [ref=e524]:
      - heading "在对话框和侧栏中编辑" [level=2] [ref=e525]
      - paragraph [ref=e526]: 日期面板先处理自己的关闭，再回到当前编辑任务。
      - generic [ref=e529]:
        - button "对话框设置日期" [ref=e530] [cursor=pointer]
        - button "侧栏设置时间" [ref=e532] [cursor=pointer]
    - group [ref=e534]:
      - generic "来源、复用关系与当前边界" [ref=e535] [cursor=pointer]
  - region [ref=e536]:
    - heading "使用边界" [level=2] [ref=e537]
    - generic [ref=e538]:
      - generic [ref=e539]:
        - heading "适合用在" [level=3] [ref=e540]
        - list [ref=e541]:
          - listitem [ref=e542]: 设置截止日期、开放时间或起止区间。
          - listitem [ref=e543]: 需要检查选择结果后再明确提交。
      - generic [ref=e544]:
        - heading "避免用在" [level=3] [ref=e545]
        - list [ref=e546]:
          - listitem [ref=e547]: 需要自然语言日期解析、复杂时区转换或秒级排班。
          - listitem [ref=e548]: 把面板里每次选择都立即写入业务数据。
  - generic [ref=e549]:
    - region [ref=e550]:
      - heading "API 与结构" [level=2] [ref=e551]
      - table [ref=e553]:
        - caption [ref=e554]: Date Picker 日期与时间 常用接口
        - rowgroup [ref=e555]:
          - row [ref=e556]:
            - columnheader "名称" [ref=e557]
            - columnheader "类型" [ref=e558]
            - columnheader "默认" [ref=e559]
            - columnheader "说明" [ref=e560]
        - rowgroup [ref=e561]:
          - row [ref=e562]:
            - rowheader [ref=e563]:
              - code [ref=e564]: size / appearance / status
            - cell [ref=e565]:
              - code [ref=e566]: 24 | 28 | 32 | 36 / outlined | filled | underlined / default | warning | error
            - cell "—" [ref=e567]
            - cell "沿用 Rain 字段尺寸、外观和状态；FormItem 可以统一传递状态。" [ref=e568]
          - row [ref=e569]:
            - rowheader [ref=e570]:
              - code [ref=e571]: disabled / required
            - cell [ref=e572]:
              - code [ref=e573]: boolean
            - cell "—" [ref=e574]
            - cell "禁用与必填按真实控件语义使用，提供可见标签或可访问名称。" [ref=e575]
          - row [ref=e576]:
            - rowheader [ref=e577]:
              - code [ref=e578]: mode / showTime
            - cell [ref=e579]:
              - code [ref=e580]: single | range / boolean
            - cell "single / false" [ref=e581]
            - cell "单日、日期区间及各自的时分模式；面板内可手输 YYYY-MM-DD 和时分。" [ref=e582]
          - row [ref=e583]:
            - rowheader [ref=e584]:
              - code [ref=e585]: value / onValueChange
            - cell [ref=e586]:
              - code [ref=e587]: Date | DateRange | null / callback
            - cell "—" [ref=e588]
            - cell "公开区间必须完整，仅确定时提交；清空也经过确定。" [ref=e589]
          - row [ref=e590]:
            - rowheader [ref=e591]:
              - code [ref=e592]: minDate / maxDate / disabledDates
            - cell [ref=e593]:
              - code [ref=e594]: Date / Date / Matcher
            - cell "—" [ref=e595]
            - cell "无时间时按日比较，带时间时比较分钟；当前时间限制由宿主更新，保存时精确复核。" [ref=e596]
          - row [ref=e597]:
            - rowheader [ref=e598]:
              - code [ref=e599]: presets / timeStep
            - cell [ref=e600]:
              - code [ref=e601]: DatePickerPreset[] / 5 | 15 | 30
            - cell "—" [ref=e602]
            - cell "快捷值在点击时计算；时间步长只影响建议列表，手输仍精确到分钟。" [ref=e603]
          - row [ref=e604]:
            - rowheader [ref=e605]:
              - code [ref=e606]: durationPresets / minDurationMinutes / maxDurationMinutes
            - cell [ref=e607]:
              - code [ref=e608]: number[] / number / number
            - cell "—" [ref=e609]
            - cell "仅日期时间范围使用；按时长设置结束只执行一次，教学窗口显式设置最短 1 分钟。" [ref=e610]
          - row [ref=e611]:
            - rowheader [ref=e612]:
              - code [ref=e613]: excludeDisabled
            - cell [ref=e614]:
              - code [ref=e615]: boolean
            - cell "true" [ref=e616]
            - cell "默认整段不能跨禁用日期；false 时仍禁止选择禁用端点。" [ref=e617]
    - region [ref=e618]:
      - heading "调用示例" [level=2] [ref=e619]
      - generic [ref=e620]:
        - generic [ref=e621]:
          - button "复制代码" [ref=e622] [cursor=pointer]
          - status
        - code [ref=e625]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"开放时间\" required><DatePicker mode=\"range\" showTime value={value} onValueChange={setValue} size={36} /></FormItem>; }"
      - paragraph [ref=e626]:
        - text: 当前源码：
        - code [ref=e627]: packages/ui/src/date-picker/date-picker.tsx
```

# Test source

```ts
  181 |   await box(page, "日期小时").fill("9"); await box(page, "日期小时").press("Enter");
  182 |   await expect(panel(page)).toBeVisible(); await expect(page.getByRole("status", { name: "作业保存结果" })).not.toContainText("设置已保存");
  183 |   await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  184 |   for (const [opener, title, field] of [["对话框设置日期", "作业日期设置", "对话框截止日期"], ["侧栏设置时间", "作业时间设置", "侧栏截止时间"]]) {
  185 |     await page.getByRole("button", { name: opener!, exact: true }).click();
  186 |     const outer = page.getByRole("dialog", { name: title!, exact: true });
  187 |     await outer.getByRole("button", { name: field!, exact: true }).click(); await expect(panel(page)).toBeVisible();
  188 |     await page.keyboard.press("Escape"); await expect(panel(page)).toHaveCount(0); await expect(outer).toBeVisible();
  189 |     await page.keyboard.press("Escape"); await expect(outer).toHaveCount(0);
  190 |   }
  191 | });
  192 | 
  193 | test("D15 D18 current time refresh rejects expired drafts and host save preserves data", async ({ page }, info) => {
  194 |   test.skip(!basicProject(info), "Clock and host validation exercised in Chromium and WebKit.");
  195 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  196 |   await dateTime(page, "日期", "2026-10-12", "10", "01"); await expect(confirm(page)).toBeEnabled();
  197 |   await page.clock.setFixedTime(new Date("2026-10-12T10:01:30+08:00"));
  198 |   // The host subscribes to foreground focus; dispatch that lifecycle notification without reloading the draft.
  199 |   await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  200 |   await expect(confirm(page)).toBeDisabled(); await expect(box(page, "日期分钟")).toHaveValue("01");
  201 |   await box(page, "日期分钟").fill("02"); await confirm(page).click();
  202 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  203 |   await page.clock.setFixedTime(new Date("2026-10-12T10:02:00+08:00"));
  204 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  205 |   await expect(page.getByText("截止时间必须晚于当前时间，请重新选择。", { exact: true })).toBeVisible();
  206 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  207 |   await open(page, "作业截止时间"); await panel(page).getByRole("button", { name: "明天 23:59", exact: true }).click(); await confirm(page).click();
  208 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  209 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("设置已保存");
  210 |   await page.getByRole("radio", { name: "定时开放", exact: true }).check();
  211 |   await page.clock.setFixedTime(new Date("2026-10-13T10:00:00+08:00"));
  212 |   await page.getByRole("radio", { name: "立即开放", exact: true }).check();
  213 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  214 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("立即开放");
  215 |   await page.getByRole("radio", { name: "定时开放", exact: true }).check();
  216 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  217 |   await expect(page.getByText("开放时间已经过去，请重新选择。", { exact: true })).toBeVisible();
  218 | });
  219 | 
  220 | test("D18 exam entry boundaries clamp late entry and keep duration independent", async ({ page }, info) => {
  221 |   test.skip(!basicProject(info), "Admission behavior exercised in Chromium and WebKit.");
  222 |   await page.goto("/#date-picker");
  223 |   for (const [preset, result] of [["开放前 1 分钟", "尚未开放"], ["开放时刻", "可答题 1 小时"], ["关闭前 30 分钟", "可答题 30 分钟"], ["关闭时刻", "考试已关闭"]]) {
  224 |     await open(page, "模拟入场时间"); await panel(page).getByRole("button", { name: preset!, exact: true }).click(); await confirm(page).click();
  225 |     await expect(page.getByLabel("模拟入场结果", { exact: true })).toContainText(result!);
  226 |   }
  227 |   const duration = page.getByRole("spinbutton", { name: "答题时长", exact: true }); await duration.fill("180"); await duration.press("Tab");
  228 |   await expect(page.getByText("答题时长超过开放窗口；按本演示策略，所有人最晚在关闭时间结束，原时长设置保留。", { exact: true })).toBeVisible();
  229 |   await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  230 |   await expect(page.getByRole("status", { name: "考试保存结果" })).toContainText("答题时长 180 分钟");
  231 |   await duration.fill("-"); await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  232 |   await expect(page.getByText("请输入正整数答题时长。", { exact: true })).toBeVisible();
  233 | });
  234 | 
  235 | test("D16 responsive panels preserve draft, contain overflow and retain touch hit areas", async ({ page }, info) => {
  236 |   await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  237 |   await expect(panel(page).getByRole("grid")).toHaveCount(basicProject(info) ? 2 : 1);
  238 |   await box(page, "结束分钟").fill("15");
  239 |   const coarse = info.project.name.startsWith("touch");
  240 |   if (coarse) {
  241 |     await expect(panel(page)).toHaveClass(/rain-date-picker__sheet/);
  242 |     const targets = await panel(page).locator('.rain-calendar__day-button, .rain-date-picker__actions > button, .rain-calendar__nav > button').evaluateAll(nodes => nodes.map(node => ({ tag: node.getAttribute("aria-label") || node.textContent, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
  243 |     expect(targets.every(target => target.width >= 44 && target.height >= 44), JSON.stringify(targets)).toBe(true);
  244 |   }
  245 |   await hasNoDuplicateIds(page);
  246 |   const bounds = await panel(page).boundingBox(); const viewport = page.viewportSize()!;
  247 |   expect(bounds!.x).toBeGreaterThanOrEqual(-1); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
  248 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  249 |   await screenshot(panel(page), info, "datetime-panel");
  250 |   if (coarse) {
  251 |     await page.setViewportSize({ width: viewport.width, height: 480 });
  252 |     await box(page, "结束分钟").scrollIntoViewIfNeeded(); await expect(box(page, "结束分钟")).toHaveValue("15");
  253 |     await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  254 |   }
  255 |   await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 23:00 至 2026-10-14 01:15");
  256 | });
  257 | 
  258 | test("D16 D17 dark compact forced colors zoom and reduced motion keep controls reachable", async ({ page }, info) => {
  259 |   test.skip(!["desktop", "narrow390", "touch600"].includes(info.project.name), "Visual stress cases use representative fine and coarse pointers.");
  260 |   await page.goto("/#date-picker");
  261 |   await page.getByRole("button", { name: "深色", exact: true }).click(); await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  262 |   await open(page, "活动时间段"); await screenshot(panel(page), info, "datetime-dark-compact");
  263 |   await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  264 |   await expect(panel(page)).toHaveCSS("transition-duration", "0s");
  265 |   await box(page, "开始日期").focus(); await expect(box(page, "开始日期")).toBeFocused();
  266 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  267 |   await screenshot(panel(page), info, "datetime-forced-colors");
  268 |   await page.keyboard.press("Escape");
  269 |   // CSS zoom exercises layout at 200%; OS/browser zoom and physical keyboards remain human checks.
  270 |   await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  271 |   await open(page, "活动时间段"); await box(page, "结束分钟").fill("30");
  272 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  273 |   await screenshot(panel(page), info, "datetime-200-percent");
  274 |   await confirm(page).click();
  275 | });
  276 | 
  277 | test("D17 rapid month changes leave one live month and respect reduced motion", async ({ page }, info) => {
  278 |   test.skip(!basicProject(info), "Calendar motion exercised in Chromium and WebKit.");
  279 |   await page.goto("/#date-picker"); await open(page, "截止日期");
  280 |   const calendar = panel(page).locator('[data-rain-id="ui-calendar"]');
> 281 |   expect(await calendar.evaluate(node => getComputedStyle(node).getPropertyValue("--rdp-animation_duration").trim())).toBe("220ms");
      |                                                                                                                       ^ Error: expect(received).toBe(expected) // Object.is equality
  282 |   const next = calendar.getByRole("button", { name: "下个月", exact: true });
  283 |   await next.click({ delay: 0 }); await next.click({ delay: 0 }); await next.click({ delay: 0 });
  284 |   await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText(/1月/);
  285 |   await expect(calendar.locator('[data-animated-month][aria-hidden="true"]')).toHaveCount(0);
  286 |   await expect(calendar.getByRole("grid")).toHaveCount(1);
  287 |   await page.emulateMedia({ reducedMotion: "reduce" }); await next.click();
  288 |   await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText(/2月/);
  289 |   await expect(calendar.locator("[data-animated-month]")).toHaveCount(0);
  290 |   await expect(calendar.locator(".rain-calendar__day-button").first()).toHaveCSS("transition-duration", "0s");
  291 | });
  292 | 
  293 | test("D20 UTC labels reflect the actual host timezone", async ({ browser }, info) => {
  294 |   test.skip(info.project.name !== "desktop", "Timezone behavior is browser-locale independent and exercised once in UTC.");
  295 |   const context = await browser.newContext({ timezoneId: "UTC", locale: "zh-CN", viewport: { width: 1440, height: 1000 } });
  296 |   const page = await context.newPage(); await page.clock.setFixedTime(fixedNow); await page.goto("http://127.0.0.1:5395/#date-picker");
  297 |   for (const label of ["作业设置摘要", "考试设置摘要", "时间段摘要"]) {
  298 |     await expect(page.getByLabel(label, { exact: true })).toContainText("本机时间（UTC）");
  299 |     await expect(page.getByLabel(label, { exact: true })).not.toContainText("北京时间");
  300 |   }
  301 |   await page.getByTestId("date-time-exam").screenshot({ path: `${evidence}/timezone-utc.png` }); await context.close();
  302 | });
  303 | 
```