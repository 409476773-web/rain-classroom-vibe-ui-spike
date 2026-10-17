# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: date-time-optimization.spec.ts >> D16 responsive panels preserve draft, contain overflow and retain touch hit areas
- Location: tests/e2e/date-time-optimization.spec.ts:272:1

# Error details

```
Error: [{"tag":"上个月","width":44,"height":44},{"tag":"下个月","width":44,"height":44},{"tag":"2026年10月1日","width":51.140625,"height":44},{"tag":"2026年10月2日","width":51.140625,"height":44},{"tag":"2026年10月3日","width":51.140625,"height":44},{"tag":"2026年10月4日","width":51.15625,"height":44},{"tag":"2026年10月5日","width":51.140625,"height":44},{"tag":"2026年10月6日","width":51.140625,"height":44},{"tag":"2026年10月7日","width":51.140625,"height":44},{"tag":"2026年10月8日","width":51.140625,"height":44},{"tag":"2026年10月9日","width":51.140625,"height":44},{"tag":"2026年10月10日","width":51.140625,"height":44},{"tag":"2026年10月11日","width":51.15625,"height":44},{"tag":"2026年10月12日，今天","width":51.140625,"height":44},{"tag":"2026年10月13日，已选中","width":51.140625,"height":44},{"tag":"2026年10月14日，已选中","width":51.140625,"height":44},{"tag":"2026年10月15日","width":51.140625,"height":44},{"tag":"2026年10月16日","width":51.140625,"height":44},{"tag":"2026年10月17日","width":51.140625,"height":44},{"tag":"2026年10月18日","width":51.15625,"height":44},{"tag":"2026年10月19日","width":51.140625,"height":44},{"tag":"2026年10月20日","width":51.140625,"height":44},{"tag":"2026年10月21日","width":51.140625,"height":44},{"tag":"2026年10月22日","width":51.140625,"height":44},{"tag":"2026年10月23日","width":51.140625,"height":44},{"tag":"2026年10月24日","width":51.140625,"height":44},{"tag":"2026年10月25日","width":51.15625,"height":44},{"tag":"2026年10月26日","width":51.140625,"height":44},{"tag":"2026年10月27日","width":51.140625,"height":44},{"tag":"2026年10月28日","width":51.140625,"height":44},{"tag":"2026年10月29日","width":51.140625,"height":44},{"tag":"2026年10月30日","width":51.140625,"height":44},{"tag":"2026年10月31日","width":51.140625,"height":44},{"tag":"2026年11月1日","width":51.15625,"height":44},{"tag":"2026年11月2日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月3日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月4日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月5日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月6日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月7日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月8日","width":51.15625,"height":43.99993896484375},{"tag":"清空","width":36,"height":44},{"tag":"取消","width":70,"height":44},{"tag":"确定","width":70,"height":44}]

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
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
              - generic [ref=e86]:
                - textbox "作业名称" [ref=e87]: 第五讲案例分析
                - button "清除作业名称" [ref=e89] [cursor=pointer]
            - generic [ref=e92]:
              - generic [ref=e93]: 作业类型
              - combobox "作业类型" [ref=e95] [cursor=pointer]:
                - option "案例报告" [selected]
                - option "课堂练习"
                - option "讨论任务"
            - generic [ref=e96]:
              - generic [ref=e97]:
                - text: 所属课程
                - generic [ref=e98]: "*"
              - group [ref=e99]:
                - generic [ref=e100]:
                  - combobox "所属课程" [ref=e101]: 人工智能导论
                  - generic [ref=e103]:
                    - button "清除所属课程" [ref=e104] [cursor=pointer]
                    - button "展开选项" [ref=e107] [cursor=pointer]
              - textbox [ref=e110]: ai
            - generic [ref=e111]:
              - generic [ref=e112]:
                - text: 满分
                - generic [ref=e113]: "*"
              - generic [ref=e114]:
                - generic [ref=e115]:
                  - button "减少满分" [ref=e116] [cursor=pointer]
                  - generic [ref=e118]:
                    - spinbutton "满分" [ref=e119]: "100"
                    - generic [ref=e120]: 分
                  - button "增加满分" [ref=e121] [cursor=pointer]
                - generic [ref=e123]: 单位：分
          - generic [ref=e124]:
            - generic [ref=e125]: 作业说明
            - generic [ref=e126]:
              - textbox "作业说明" [ref=e127]: 结合课堂案例，说明你的判断及支持它的证据。
              - generic [ref=e128]: 21 / 500
            - generic [ref=e130]: 说明学习目标、提交内容和判断依据。
          - radiogroup "开放方式" [ref=e131]:
            - generic [ref=e133]:
              - generic [ref=e134] [cursor=pointer]:
                - radio "立即开放" [checked] [ref=e135]
                - generic [ref=e139]: 立即开放
              - generic [ref=e141] [cursor=pointer]:
                - radio "定时开放" [ref=e142]
                - generic [ref=e145]: 定时开放
          - generic [ref=e148]:
            - generic [ref=e149]:
              - text: 作业截止时间
              - generic [ref=e150]: "*"
            - generic [ref=e151]:
              - button "作业截止时间" [ref=e153] [cursor=pointer]:
                - generic [ref=e154]: 2026-10-13 23:59
              - generic [ref=e157]: 2026-10-13 23:59
              - status [ref=e158]
            - generic [ref=e159]: 23:59 是明确时刻；到达该时间后停止提交。
          - generic "作业设置摘要" [ref=e160]:
            - generic [ref=e161]:
              - term [ref=e162]: 开放方式
              - definition [ref=e163]: 保存后立即开放
            - generic [ref=e164]:
              - term [ref=e165]: 截止时间
              - definition [ref=e166]: 2026-10-13 23:59
            - generic [ref=e167]:
              - term [ref=e168]: 时间基准
              - definition [ref=e169]: 本机时间（Asia/Shanghai · 北京时间）
          - generic [ref=e170]:
            - status "作业保存结果" [ref=e171]: 面板确定后更新草稿，保存后更新本地作业设置。
            - button "保存设置" [ref=e172] [cursor=pointer]
      - generic [ref=e175]:
        - heading "考试：开放窗口与答题时长" [level=2] [ref=e176]
        - paragraph [ref=e177]: 窗口决定何时可以作答，答题时长单独设置。下方入场模拟使用明确的本地关闭策略。
        - form "考试开放设置" [ref=e179]:
          - generic [ref=e180]:
            - heading "考试开放与答题时长" [level=3] [ref=e181]
            - paragraph [ref=e182]: 本地样板 · 开放窗口与每位学生的答题时长分别设置。
          - generic [ref=e183]:
            - generic [ref=e184]:
              - text: 考试开放窗口
              - generic [ref=e185]: "*"
            - generic [ref=e186]:
              - button "考试开放窗口" [ref=e188] [cursor=pointer]:
                - generic [ref=e189]: 2026-10-13 09:00 至 2026-10-13 11:00
              - generic [ref=e192]: 2026-10-13 09:00 至 2026-10-13 11:00
              - status [ref=e193]
          - generic [ref=e194]:
            - generic [ref=e195]:
              - generic [ref=e196]:
                - text: 答题时长
                - generic [ref=e197]: "*"
              - generic [ref=e198]:
                - generic [ref=e199]:
                  - button "减少答题时长" [ref=e200] [cursor=pointer]
                  - generic [ref=e202]:
                    - spinbutton "答题时长" [ref=e203]: "60"
                    - generic [ref=e204]: 分钟
                  - button "增加答题时长" [ref=e205] [cursor=pointer]
                - generic [ref=e207]: 单位：分钟
              - generic [ref=e208]: 每位学生开始作答后计时。
            - generic [ref=e209]:
              - strong [ref=e210]: 关闭规则
              - paragraph [ref=e211]: 本地演示策略：到达关闭时间统一结束。
          - generic "考试设置摘要" [ref=e212]:
            - generic [ref=e213]:
              - term [ref=e214]: 开放窗口
              - definition [ref=e215]: 2026-10-13 09:00 → 11:00
            - generic [ref=e216]:
              - term [ref=e217]: 窗口长度
              - definition [ref=e218]: 2 小时
            - generic [ref=e219]:
              - term [ref=e220]: 时间基准
              - definition [ref=e221]: 本机时间（Asia/Shanghai · 北京时间）
          - generic [ref=e222]:
            - generic [ref=e223]:
              - generic [ref=e224]: 模拟入场时间
              - generic [ref=e225]:
                - button "模拟入场时间" [ref=e227] [cursor=pointer]:
                  - generic [ref=e228]: 2026-10-13 10:30
                - generic [ref=e231]: 2026-10-13 10:30
                - status [ref=e232]
              - generic [ref=e233]: 可选择开放前、窗口中或关闭时，查看能否开始以及实际可用时长。
            - paragraph [ref=e234]: 可答题 30 分钟；最晚于 2026-10-13 11:00 结束。
          - generic [ref=e235]:
            - status "考试保存结果" [ref=e236]: 面板确定后更新草稿，保存后更新本地考试设置。
            - button "保存考试设置" [ref=e237] [cursor=pointer]
      - generic [ref=e240]:
        - heading "时间段：同日、跨午夜与跨月" [level=2] [ref=e241]
        - paragraph [ref=e242]: 先看完整起止结果再保存；常用场景和按时长操作都保持为待确认草稿。
        - form "时间段设置" [ref=e244]:
          - generic [ref=e245]:
            - heading "同日与跨日时间段" [level=3] [ref=e246]
            - paragraph [ref=e247]: 本地活动样板 · 可直接修改任一端，或在面板内选择常用场景。
          - generic [ref=e248]:
            - generic [ref=e249]:
              - text: 活动时间段
              - generic [ref=e250]: "*"
            - generic [ref=e251]:
              - button "活动时间段" [ref=e253] [cursor=pointer]:
                - generic [ref=e254]: 2026-10-13 23:00 至 2026-10-14 01:15
              - generic [ref=e257]: 2026-10-13 23:00 至 2026-10-14 01:15
              - status [ref=e258]: 已选择 2026-10-13 23:00 至 2026-10-14 01:15
          - generic "时间段摘要" [ref=e259]:
            - generic [ref=e260]:
              - term [ref=e261]: 起止时间
              - definition [ref=e262]: 2026-10-13 23:00 → 2026-10-14 01:15（次日）
            - generic [ref=e263]:
              - term [ref=e264]: 时段长度
              - definition [ref=e265]: 2 小时 15 分钟
            - generic [ref=e266]:
              - term [ref=e267]: 时间基准
              - definition [ref=e268]: 本机时间（Asia/Shanghai · 北京时间）
          - paragraph [ref=e269]: 修改开始不会自动移动结束；需要保持时长时，在面板中重新选择“按时长设置结束”。
          - generic [ref=e270]:
            - status "时间段保存结果" [ref=e271]: 选择、取消和清空均先作用于面板草稿。
            - button "保存时间段" [ref=e272] [cursor=pointer]
        - generic [ref=e274]:
          - generic [ref=e275]:
            - button "复制代码" [ref=e276] [cursor=pointer]
            - status
          - code [ref=e279]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"活动时间段\" required> <DatePicker mode=\"range\" showTime size={36} value={value} onValueChange={setValue} timeStep={15} minDurationMinutes={1} durationPresets={[30, 60, 90, 120]} presets={[{ label: \"明天 09:00–10:30\", getValue: now => ({ from: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9), to: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30), }) }]} /> </FormItem>; }"
      - generic [ref=e280]:
        - heading "在筛选区组合使用" [level=2] [ref=e281]
        - paragraph [ref=e282]: 课程与成绩即时改变结果；统计日期按面板确认后的值更新。
        - generic [ref=e284]:
          - generic [ref=e285]:
            - heading "教学数据筛选" [level=3] [ref=e286]
            - paragraph [ref=e287]: 以下为本地课程样例数据。
          - generic [ref=e288]:
            - generic [ref=e289]:
              - generic [ref=e290]: 筛选课程
              - group [ref=e291]:
                - generic [ref=e292]:
                  - combobox "筛选课程" [ref=e293]: 人工智能导论
                  - generic [ref=e295]:
                    - button "清除筛选课程" [ref=e296] [cursor=pointer]
                    - button "展开选项" [ref=e299] [cursor=pointer]
              - textbox [ref=e302]: ai
            - generic [ref=e303]:
              - generic [ref=e304]: 统计日期
              - generic [ref=e305]:
                - button "统计日期" [ref=e307] [cursor=pointer]:
                  - generic [ref=e308]: 2026-10-01 至 2026-10-31
                - generic [ref=e311]: 2026-10-01 至 2026-10-31
                - status [ref=e312]
          - generic [ref=e313]:
            - generic [ref=e314]: 成绩范围 60–100 分
            - group "成绩范围 60–100 分" [ref=e315]:
              - generic [ref=e316] [cursor=pointer]:
                - slider "筛选成绩下限" [ref=e320]: "60"
                - slider "筛选成绩上限" [ref=e322]: "100"
          - status [ref=e323]:
            - strong [ref=e324]: "2"
            - generic [ref=e325]: 位学生符合当前筛选
            - paragraph [ref=e326]: 2026-10-01 至 2026-10-31
      - generic [ref=e327]:
        - heading "在对话框和侧栏中编辑" [level=2] [ref=e328]
        - paragraph [ref=e329]: 日期面板先处理自己的关闭，再回到当前编辑任务。
        - generic [ref=e332]:
          - button "对话框设置日期" [ref=e333] [cursor=pointer]
          - button "侧栏设置时间" [ref=e335] [cursor=pointer]
      - group [ref=e337]:
        - generic "来源、复用关系与当前边界" [ref=e338] [cursor=pointer]
    - region [ref=e339]:
      - heading "使用边界" [level=2] [ref=e340]
      - generic [ref=e341]:
        - generic [ref=e342]:
          - heading "适合用在" [level=3] [ref=e343]
          - list [ref=e344]:
            - listitem [ref=e345]: 设置截止日期、开放时间或起止区间。
            - listitem [ref=e346]: 需要检查选择结果后再明确提交。
        - generic [ref=e347]:
          - heading "避免用在" [level=3] [ref=e348]
          - list [ref=e349]:
            - listitem [ref=e350]: 需要自然语言日期解析、复杂时区转换或秒级排班。
            - listitem [ref=e351]: 把面板里每次选择都立即写入业务数据。
    - generic [ref=e352]:
      - region [ref=e353]:
        - heading "API 与结构" [level=2] [ref=e354]
        - table [ref=e356]:
          - caption [ref=e357]: Date Picker 日期与时间 常用接口
          - rowgroup [ref=e358]:
            - row [ref=e359]:
              - columnheader "名称" [ref=e360]
              - columnheader "类型" [ref=e361]
              - columnheader "默认" [ref=e362]
              - columnheader "说明" [ref=e363]
          - rowgroup [ref=e364]:
            - row [ref=e365]:
              - rowheader [ref=e366]:
                - code [ref=e367]: size / appearance / status
              - cell [ref=e368]:
                - code [ref=e369]: 24 | 28 | 32 | 36 / outlined | filled | underlined / default | warning | error
              - cell "—" [ref=e370]
              - cell "沿用 Rain 字段尺寸、外观和状态；FormItem 可以统一传递状态。" [ref=e371]
            - row [ref=e372]:
              - rowheader [ref=e373]:
                - code [ref=e374]: disabled / required
              - cell [ref=e375]:
                - code [ref=e376]: boolean
              - cell "—" [ref=e377]
              - cell "禁用与必填按真实控件语义使用，提供可见标签或可访问名称。" [ref=e378]
            - row [ref=e379]:
              - rowheader [ref=e380]:
                - code [ref=e381]: mode / showTime
              - cell [ref=e382]:
                - code [ref=e383]: single | range / boolean
              - cell "single / false" [ref=e384]
              - cell "单日、日期区间及各自的时分模式；面板内可手输 YYYY-MM-DD 和时分。" [ref=e385]
            - row [ref=e386]:
              - rowheader [ref=e387]:
                - code [ref=e388]: value / onValueChange
              - cell [ref=e389]:
                - code [ref=e390]: Date | DateRange | null / callback
              - cell "—" [ref=e391]
              - cell "公开区间必须完整，仅确定时提交；清空也经过确定。" [ref=e392]
            - row [ref=e393]:
              - rowheader [ref=e394]:
                - code [ref=e395]: minDate / maxDate / disabledDates
              - cell [ref=e396]:
                - code [ref=e397]: Date / Date / Matcher
              - cell "—" [ref=e398]
              - cell "无时间时按日比较，带时间时比较分钟；当前时间限制由宿主更新，保存时精确复核。" [ref=e399]
            - row [ref=e400]:
              - rowheader [ref=e401]:
                - code [ref=e402]: presets / timeStep
              - cell [ref=e403]:
                - code [ref=e404]: DatePickerPreset[] / 5 | 15 | 30
              - cell "—" [ref=e405]
              - cell "快捷值在点击时计算；时间步长只影响建议列表，手输仍精确到分钟。" [ref=e406]
            - row [ref=e407]:
              - rowheader [ref=e408]:
                - code [ref=e409]: durationPresets / minDurationMinutes / maxDurationMinutes
              - cell [ref=e410]:
                - code [ref=e411]: number[] / number / number
              - cell "—" [ref=e412]
              - cell "仅日期时间范围使用；按时长设置结束只执行一次，教学窗口显式设置最短 1 分钟。" [ref=e413]
            - row [ref=e414]:
              - rowheader [ref=e415]:
                - code [ref=e416]: excludeDisabled
              - cell [ref=e417]:
                - code [ref=e418]: boolean
              - cell "true" [ref=e419]
              - cell "默认整段不能跨禁用日期；false 时仍禁止选择禁用端点。" [ref=e420]
      - region [ref=e421]:
        - heading "调用示例" [level=2] [ref=e422]
        - generic [ref=e423]:
          - generic [ref=e424]:
            - button "复制代码" [ref=e425] [cursor=pointer]
            - status
          - code [ref=e428]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"开放时间\" required><DatePicker mode=\"range\" showTime value={value} onValueChange={setValue} size={36} /></FormItem>; }"
        - paragraph [ref=e429]:
          - text: 当前源码：
          - code [ref=e430]: packages/ui/src/date-picker/date-picker.tsx
  - generic:
    - dialog "选择日期范围与时间":
      - generic:
        - generic:
          - heading "选择日期范围与时间" [level=2]
        - generic:
          - generic:
            - generic:
              - generic:
                - generic: 开始
                - generic:
                  - textbox "开始日期":
                    - /placeholder: YYYY-MM-DD
                    - text: 2026-10-13
                - group "开始时间":
                  - generic:
                    - generic:
                      - generic:
                        - textbox "开始小时": "23"
                    - generic:
                      - generic: ":"
                      - generic:
                        - textbox "开始分钟": "00"
                    - generic:
                      - generic:
                        - combobox "开始常用时间":
                          - generic:
                            - generic "23:00"
                      - generic: 已选：23:00
                    - textbox: 23:00
              - generic:
                - generic: 结束
                - generic:
                  - textbox "结束日期":
                    - /placeholder: YYYY-MM-DD
                    - text: 2026-10-14
                - group "结束时间":
                  - generic:
                    - generic:
                      - generic:
                        - textbox "结束小时": "01"
                    - generic:
                      - generic: ":"
                      - generic:
                        - textbox "结束分钟": "15"
                    - generic:
                      - generic:
                        - combobox "结束常用时间":
                          - generic:
                            - generic "01:15"
                      - generic: 已选：01:15
                    - textbox: 01:15
            - generic "常用日期":
              - generic:
                - button "同日 90 分钟"
              - generic:
                - button "跨午夜"
              - generic:
                - button "跨月时段"
            - generic:
              - generic:
                - generic:
                  - navigation "切换月份":
                    - button "上个月" [disabled] [ref=e431]
                    - button "下个月" [ref=e434] [cursor=pointer]
                  - generic:
                    - generic:
                      - generic:
                        - generic:
                          - generic:
                            - combobox "选择年份":
                              - generic:
                                - generic "2026年"
                          - generic: 已选：2026年
                        - textbox: "2026"
                        - generic:
                          - generic:
                            - combobox "选择月份":
                              - generic:
                                - generic "10月"
                          - generic: 已选：10月
                        - textbox: "9"
                        - status: 2026年10月
                    - grid "2026年10月":
                      - rowgroup:
                        - row:
                          - columnheader: 一
                          - columnheader: 二
                          - columnheader: 三
                          - columnheader: 四
                          - columnheader: 五
                          - columnheader: 六
                          - columnheader: 日
                      - rowgroup:
                        - row "2026年10月1日 2026年10月2日 2026年10月3日 2026年10月4日":
                          - gridcell "2026年10月1日":
                            - button "2026年10月1日" [disabled]:
                              - generic: "1"
                          - gridcell "2026年10月2日":
                            - button "2026年10月2日" [disabled]:
                              - generic: "2"
                          - gridcell "2026年10月3日":
                            - button "2026年10月3日" [disabled]:
                              - generic: "3"
                          - gridcell "2026年10月4日":
                            - button "2026年10月4日" [disabled]:
                              - generic: "4"
                        - row "2026年10月5日 2026年10月6日 2026年10月7日 2026年10月8日 2026年10月9日 2026年10月10日 2026年10月11日":
                          - gridcell "2026年10月5日":
                            - button "2026年10月5日" [disabled]:
                              - generic: "5"
                          - gridcell "2026年10月6日":
                            - button "2026年10月6日" [disabled]:
                              - generic: "6"
                          - gridcell "2026年10月7日":
                            - button "2026年10月7日" [disabled]:
                              - generic: "7"
                          - gridcell "2026年10月8日":
                            - button "2026年10月8日" [disabled]:
                              - generic: "8"
                          - gridcell "2026年10月9日":
                            - button "2026年10月9日" [disabled]:
                              - generic: "9"
                          - gridcell "2026年10月10日":
                            - button "2026年10月10日" [disabled]:
                              - generic: "10"
                          - gridcell "2026年10月11日":
                            - button "2026年10月11日" [disabled]:
                              - generic: "11"
                        - row "2026年10月12日，今天 2026年10月13日，已选中 2026年10月14日，已选中 2026年10月15日 2026年10月16日 2026年10月17日 2026年10月18日":
                          - gridcell "2026年10月12日，今天":
                            - button "2026年10月12日，今天":
                              - generic: "12"
                          - gridcell "2026年10月13日，已选中" [selected]:
                            - button "2026年10月13日，已选中":
                              - generic: "13"
                          - gridcell "2026年10月14日，已选中" [selected]:
                            - button "2026年10月14日，已选中":
                              - generic: "14"
                          - gridcell "2026年10月15日":
                            - button "2026年10月15日":
                              - generic: "15"
                          - gridcell "2026年10月16日":
                            - button "2026年10月16日":
                              - generic: "16"
                          - gridcell "2026年10月17日":
                            - button "2026年10月17日":
                              - generic: "17"
                          - gridcell "2026年10月18日":
                            - button "2026年10月18日":
                              - generic: "18"
                        - row "2026年10月19日 2026年10月20日 2026年10月21日 2026年10月22日 2026年10月23日 2026年10月24日 2026年10月25日":
                          - gridcell "2026年10月19日":
                            - button "2026年10月19日":
                              - generic: "19"
                          - gridcell "2026年10月20日":
                            - button "2026年10月20日":
                              - generic: "20"
                          - gridcell "2026年10月21日":
                            - button "2026年10月21日":
                              - generic: "21"
                          - gridcell "2026年10月22日":
                            - button "2026年10月22日":
                              - generic: "22"
                          - gridcell "2026年10月23日":
                            - button "2026年10月23日":
                              - generic: "23"
                          - gridcell "2026年10月24日":
                            - button "2026年10月24日":
                              - generic: "24"
                          - gridcell "2026年10月25日":
                            - button "2026年10月25日":
                              - generic: "25"
                        - row "2026年10月26日 2026年10月27日 2026年10月28日 2026年10月29日 2026年10月30日 2026年10月31日 2026年11月1日":
                          - gridcell "2026年10月26日":
                            - button "2026年10月26日":
                              - generic: "26"
                          - gridcell "2026年10月27日":
                            - button "2026年10月27日":
                              - generic: "27"
                          - gridcell "2026年10月28日":
                            - button "2026年10月28日":
                              - generic: "28"
                          - gridcell "2026年10月29日":
                            - button "2026年10月29日":
                              - generic: "29"
                          - gridcell "2026年10月30日":
                            - button "2026年10月30日":
                              - generic: "30"
                          - gridcell "2026年10月31日":
                            - button "2026年10月31日":
                              - generic: "31"
                          - gridcell "2026年11月1日":
                            - button "2026年11月1日":
                              - generic: "1"
                        - row "2026年11月2日 2026年11月3日 2026年11月4日 2026年11月5日 2026年11月6日 2026年11月7日 2026年11月8日":
                          - gridcell "2026年11月2日":
                            - button "2026年11月2日":
                              - generic: "2"
                          - gridcell "2026年11月3日":
                            - button "2026年11月3日":
                              - generic: "3"
                          - gridcell "2026年11月4日":
                            - button "2026年11月4日":
                              - generic: "4"
                          - gridcell "2026年11月5日":
                            - button "2026年11月5日":
                              - generic: "5"
                          - gridcell "2026年11月6日":
                            - button "2026年11月6日":
                              - generic: "6"
                          - gridcell "2026年11月7日":
                            - button "2026年11月7日":
                              - generic: "7"
                          - gridcell "2026年11月8日":
                            - button "2026年11月8日":
                              - generic: "8"
            - generic:
              - generic: 按时长设置结束
              - generic:
                - generic:
                  - button "30分钟"
                - generic:
                  - button "60分钟"
                - generic:
                  - button "90分钟"
                - generic:
                  - button "120分钟"
              - generic:
                - generic:
                  - textbox "自定义时长（分钟）":
                    - /placeholder: 自定义分钟
                - button "应用时长" [disabled]
            - generic: 2026-10-13 23:00 至 2026-10-14 01:15 · 次日 01:15 · 时段长度 2 小时 15 分钟
        - generic:
          - generic:
            - button "清空"
            - button "取消"
            - button "确定" [active]
```

# Test source

```ts
  181 |   await box(page, "日期").fill("2026-12-25"); await panel(page).getByRole("button", { name: "取消", exact: true }).click();
  182 |   await expect(trigger).toHaveText("2026-10-20 18:00"); await expect(trigger).toBeFocused();
  183 |   await open(page, "截止时间"); await box(page, "日期小时").fill("12"); await page.keyboard.press("Escape");
  184 |   await expect(trigger).toHaveText("2026-10-20 18:00");
  185 |   await open(page, "截止时间"); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  186 |   await panel(page).getByRole("button", { name: "取消", exact: true }).click(); await expect(trigger).toHaveText("2026-10-20 18:00");
  187 |   await open(page, "截止时间"); await box(page, "日期").fill("2026-11-10");
  188 |   await page.getByRole("button", { name: "深色", exact: true }).click(); await expect(panel(page)).toHaveCount(0);
  189 |   await expect(trigger).toHaveText("2026-10-20 18:00");
  190 |   const rangeTrigger = await open(page, "活动时间段");
  191 |   await box(page, "结束日期").focus(); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  192 |   await day(page, 2026, 10, 20).click(); await expect(confirm(page)).toBeDisabled();
  193 |   await day(page, 2026, 10, 21).click(); await confirm(page).click();
  194 |   await expect(rangeTrigger).toHaveText("2026-10-20 23:00 至 2026-10-21 01:00");
  195 | });
  196 | 
  197 | test("D13 nested month and time menus own Escape and Enter never saves the host form", async ({ page }, info) => {
  198 |   test.skip(!basicProject(info), "Keyboard layering exercised in Chromium and WebKit.");
  199 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  200 |   const month = panel(page).getByRole("combobox", { name: "选择月份", exact: true });
  201 |   await month.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  202 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(panel(page)).toBeVisible(); await expect(month).toBeFocused();
  203 |   const suggestions = panel(page).getByRole("combobox", { name: "日期常用时间", exact: true });
  204 |   await suggestions.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  205 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(suggestions).toBeFocused();
  206 |   await box(page, "日期小时").fill("9"); await box(page, "日期小时").press("Enter");
  207 |   await expect(panel(page)).toBeVisible(); await expect(page.getByRole("status", { name: "作业保存结果" })).not.toContainText("设置已保存");
  208 |   await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  209 |   for (const [opener, title, field] of [["对话框设置日期", "作业日期设置", "对话框截止日期"], ["侧栏设置时间", "作业时间设置", "侧栏截止时间"]]) {
  210 |     await page.getByRole("button", { name: opener!, exact: true }).click();
  211 |     const outer = page.getByRole("dialog", { name: title!, exact: true });
  212 |     await outer.getByRole("button", { name: field!, exact: true }).click(); await expect(panel(page)).toBeVisible();
  213 |     await page.keyboard.press("Escape"); await expect(panel(page)).toHaveCount(0); await expect(outer).toBeVisible();
  214 |     await page.keyboard.press("Escape"); await expect(outer).toHaveCount(0);
  215 |   }
  216 | });
  217 | 
  218 | test("D15 D18 current time refresh rejects expired drafts and host save preserves data", async ({ page }, info) => {
  219 |   test.skip(!basicProject(info), "Clock and host validation exercised in Chromium and WebKit.");
  220 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  221 |   await dateTime(page, "日期", "2026-10-12", "10", "01"); await expect(confirm(page)).toBeEnabled();
  222 |   await page.clock.setFixedTime(new Date("2026-10-12T10:01:30+08:00"));
  223 |   // The host subscribes to foreground focus; dispatch that lifecycle notification without reloading the draft.
  224 |   await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  225 |   await expect(confirm(page)).toBeDisabled(); await expect(box(page, "日期分钟")).toHaveValue("01");
  226 |   await box(page, "日期分钟").fill("02"); await confirm(page).click();
  227 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  228 |   await page.clock.setFixedTime(new Date("2026-10-12T10:02:00+08:00"));
  229 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  230 |   await expect(page.getByText("截止时间必须晚于当前时间，请重新选择。", { exact: true })).toBeVisible();
  231 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  232 |   await open(page, "作业截止时间"); await panel(page).getByRole("button", { name: "明天 23:59", exact: true }).click(); await confirm(page).click();
  233 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  234 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("设置已保存");
  235 |   await page.getByText("定时开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "定时开放", exact: true })).toBeChecked();
  236 |   await page.clock.setFixedTime(new Date("2026-10-13T10:00:00+08:00"));
  237 |   await page.getByText("立即开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "立即开放", exact: true })).toBeChecked();
  238 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  239 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("立即开放");
  240 |   await page.getByText("定时开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "定时开放", exact: true })).toBeChecked();
  241 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  242 |   await expect(page.getByText("开放时间已经过去，请重新选择。", { exact: true })).toBeVisible();
  243 | });
  244 | 
  245 | test("D18 exam entry boundaries clamp late entry and keep duration independent", async ({ page }, info) => {
  246 |   test.skip(!basicProject(info), "Admission behavior exercised in Chromium and WebKit.");
  247 |   await page.goto("/#date-picker");
  248 |   for (const [preset, result] of [["开放前 1 分钟", "尚未开放"], ["开放时刻", "可答题 1 小时"], ["关闭前 30 分钟", "可答题 30 分钟"], ["关闭时刻", "考试已关闭"]]) {
  249 |     await open(page, "模拟入场时间"); await panel(page).getByRole("button", { name: preset!, exact: true }).click(); await confirm(page).click();
  250 |     await expect(page.getByLabel("模拟入场结果", { exact: true })).toContainText(result!);
  251 |   }
  252 |   const duration = page.getByRole("spinbutton", { name: "答题时长", exact: true }); await duration.fill("180"); await duration.press("Tab");
  253 |   await expect(page.getByText("答题时长超过开放窗口；按本演示策略，所有人最晚在关闭时间结束，原时长设置保留。", { exact: true })).toBeVisible();
  254 |   await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  255 |   await expect(page.getByRole("status", { name: "考试保存结果" })).toContainText("答题时长 180 分钟");
  256 |   await duration.fill("-"); await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  257 |   await expect(page.getByText("请输入正整数答题时长。", { exact: true })).toBeVisible();
  258 | });
  259 | 
  260 | test("D15 an open panel refreshes automatically at the next minute without focus or reopening", async ({ page }, info) => {
  261 |   test.skip(!basicProject(info), "Automatic host clock refresh exercised in Chromium and WebKit.");
  262 |   // Install a running clock before page load; do not pause the timers used by floating layers.
  263 |   await page.clock.install({ time: fixedNow });
  264 |   await page.clock.setSystemTime(fixedNow);
  265 |   await page.goto("/#date-picker"); await open(page, "作业截止时间");
  266 |   await dateTime(page, "日期", "2026-10-12", "10", "01"); await expect(confirm(page)).toBeEnabled();
  267 |   await page.clock.fastForward(31_000);
  268 |   await expect(confirm(page)).toBeDisabled(); await expect(box(page, "日期分钟")).toHaveValue("01");
  269 |   await expect(hint(page)).toContainText("超出允许范围");
  270 | });
  271 | 
  272 | test("D16 responsive panels preserve draft, contain overflow and retain touch hit areas", async ({ page }, info) => {
  273 |   await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  274 |   await expect(panel(page).getByRole("grid")).toHaveCount(basicProject(info) ? 2 : 1);
  275 |   await box(page, "结束分钟").fill("15");
  276 |   const coarse = info.project.name.startsWith("touch");
  277 |   if (coarse) {
  278 |     await expect(panel(page)).toHaveClass(/rain-date-picker__sheet/);
  279 |     const targets = await panel(page).locator('.rain-calendar__day-button, .rain-date-picker__actions > button, .rain-calendar__nav > button').evaluateAll(nodes => nodes.map(node => ({ tag: node.getAttribute("aria-label") || node.textContent, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
  280 |     writeFileSync(`${evidence}/touch-targets-${info.project.name}.json`, JSON.stringify(targets, null, 2));
> 281 |     expect.soft(targets.every(target => target.width + 0.01 >= 44 && target.height + 0.01 >= 44), JSON.stringify(targets)).toBe(true);
      |                                                                                                                            ^ Error: [{"tag":"上个月","width":44,"height":44},{"tag":"下个月","width":44,"height":44},{"tag":"2026年10月1日","width":51.140625,"height":44},{"tag":"2026年10月2日","width":51.140625,"height":44},{"tag":"2026年10月3日","width":51.140625,"height":44},{"tag":"2026年10月4日","width":51.15625,"height":44},{"tag":"2026年10月5日","width":51.140625,"height":44},{"tag":"2026年10月6日","width":51.140625,"height":44},{"tag":"2026年10月7日","width":51.140625,"height":44},{"tag":"2026年10月8日","width":51.140625,"height":44},{"tag":"2026年10月9日","width":51.140625,"height":44},{"tag":"2026年10月10日","width":51.140625,"height":44},{"tag":"2026年10月11日","width":51.15625,"height":44},{"tag":"2026年10月12日，今天","width":51.140625,"height":44},{"tag":"2026年10月13日，已选中","width":51.140625,"height":44},{"tag":"2026年10月14日，已选中","width":51.140625,"height":44},{"tag":"2026年10月15日","width":51.140625,"height":44},{"tag":"2026年10月16日","width":51.140625,"height":44},{"tag":"2026年10月17日","width":51.140625,"height":44},{"tag":"2026年10月18日","width":51.15625,"height":44},{"tag":"2026年10月19日","width":51.140625,"height":44},{"tag":"2026年10月20日","width":51.140625,"height":44},{"tag":"2026年10月21日","width":51.140625,"height":44},{"tag":"2026年10月22日","width":51.140625,"height":44},{"tag":"2026年10月23日","width":51.140625,"height":44},{"tag":"2026年10月24日","width":51.140625,"height":44},{"tag":"2026年10月25日","width":51.15625,"height":44},{"tag":"2026年10月26日","width":51.140625,"height":44},{"tag":"2026年10月27日","width":51.140625,"height":44},{"tag":"2026年10月28日","width":51.140625,"height":44},{"tag":"2026年10月29日","width":51.140625,"height":44},{"tag":"2026年10月30日","width":51.140625,"height":44},{"tag":"2026年10月31日","width":51.140625,"height":44},{"tag":"2026年11月1日","width":51.15625,"height":44},{"tag":"2026年11月2日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月3日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月4日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月5日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月6日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月7日","width":51.140625,"height":43.99993896484375},{"tag":"2026年11月8日","width":51.15625,"height":43.99993896484375},{"tag":"清空","width":36,"height":44},{"tag":"取消","width":70,"height":44},{"tag":"确定","width":70,"height":44}]
  282 |     await panel(page).getByRole("combobox", { name: "开始常用时间", exact: true }).click();
  283 |     const options = page.getByRole("option"); await expect(options.first()).toBeVisible();
  284 |     const timeTargets = await options.evaluateAll(nodes => nodes.map(node => ({ label: node.textContent, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
  285 |     writeFileSync(`${evidence}/touch-time-targets-${info.project.name}.json`, JSON.stringify(timeTargets, null, 2));
  286 |     expect.soft(timeTargets.every(target => target.width + 0.01 >= 44 && target.height + 0.01 >= 44), JSON.stringify(timeTargets)).toBe(true);
  287 |     await page.keyboard.press("Escape"); await expect(page.getByRole("listbox")).toHaveCount(0); await expect(panel(page)).toBeVisible();
  288 |   }
  289 |   await hasNoDuplicateIds(page);
  290 |   const viewport = page.viewportSize()!;
  291 |   await assertPanelGeometry(page);
  292 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  293 |   await screenshot(panel(page), info, "datetime-panel");
  294 |   if (coarse) {
  295 |     await page.setViewportSize({ width: viewport.width, height: 480 });
  296 |     await box(page, "结束分钟").scrollIntoViewIfNeeded(); await expect(box(page, "结束分钟")).toHaveValue("15");
  297 |     await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  298 |   }
  299 |   await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 23:00 至 2026-10-14 01:15");
  300 | });
  301 | 
  302 | test("D16 D17 dark compact forced colors zoom and reduced motion keep controls reachable", async ({ page }, info) => {
  303 |   test.skip(!["desktop", "narrow390", "touch600"].includes(info.project.name), "Visual stress cases use representative fine and coarse pointers.");
  304 |   await page.goto("/#date-picker");
  305 |   await page.getByRole("button", { name: "深色", exact: true }).click(); await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  306 |   await open(page, "活动时间段"); await screenshot(panel(page), info, "datetime-dark-compact");
  307 |   await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  308 |   await expect(panel(page)).toHaveCSS("transition-duration", "0s");
  309 |   await box(page, "开始日期").focus(); await expect(box(page, "开始日期")).toBeFocused();
  310 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  311 |   await screenshot(panel(page), info, "datetime-forced-colors");
  312 |   await page.keyboard.press("Escape");
  313 |   // CSS zoom exercises layout at 200%; OS/browser zoom and physical keyboards remain human checks.
  314 |   await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  315 |   await open(page, "活动时间段"); await box(page, "结束分钟").fill("30");
  316 |   await assertPanelGeometry(page);
  317 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  318 |   await screenshot(panel(page), info, "datetime-200-percent");
  319 |   await confirm(page).click();
  320 | });
  321 | 
  322 | test("D17 rapid month changes leave one live month and respect reduced motion", async ({ page }, info) => {
  323 |   test.skip(!basicProject(info), "Calendar motion exercised in Chromium and WebKit.");
  324 |   await page.goto("/#date-picker"); await open(page, "截止日期");
  325 |   const calendar = panel(page).locator('[data-rain-id="ui-calendar"]');
  326 |   const duration = await calendar.evaluate(node => getComputedStyle(node).getPropertyValue("--rdp-animation_duration").trim());
  327 |   expect(parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1000)).toBe(220);
  328 |   const next = calendar.getByRole("button", { name: "下个月", exact: true });
  329 |   await next.click({ delay: 0 }); await next.click({ delay: 0 }); await next.click({ delay: 0 });
  330 |   await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText("1月");
  331 |   await expect(calendar.locator('[data-animated-month][aria-hidden="true"]')).toHaveCount(0);
  332 |   await expect(calendar.getByRole("grid")).toHaveCount(1);
  333 |   await page.emulateMedia({ reducedMotion: "reduce" }); await next.click();
  334 |   await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText("2月");
  335 |   await expect(calendar.locator("[data-animated-month]")).toHaveCount(0);
  336 |   await expect(calendar.locator(".rain-calendar__day-button").first()).toHaveCSS("transition-duration", "0s");
  337 | });
  338 | 
  339 | test("D20 UTC labels reflect the actual host timezone", async ({ browser }, info) => {
  340 |   test.skip(info.project.name !== "desktop", "Timezone behavior is browser-locale independent and exercised once in UTC.");
  341 |   const context = await browser.newContext({ timezoneId: "UTC", locale: "zh-CN", viewport: { width: 1440, height: 1000 } });
  342 |   const page = await context.newPage();
  343 |   const messages = consoleErrors.get(info.testId)!;
  344 |   page.on("pageerror", error => messages.push(error.message));
  345 |   page.on("console", message => { if (message.type() === "error") messages.push(message.text()); });
  346 |   await page.clock.setFixedTime(fixedNow); await page.goto("http://127.0.0.1:5395/#date-picker");
  347 |   for (const label of ["作业设置摘要", "考试设置摘要", "时间段摘要"]) {
  348 |     await expect(page.getByLabel(label, { exact: true })).toContainText("本机时间（UTC）");
  349 |     await expect(page.getByLabel(label, { exact: true })).not.toContainText("北京时间");
  350 |   }
  351 |   await page.getByTestId("date-time-exam").screenshot({ path: `${evidence}/timezone-utc.png` }); await context.close();
  352 | });
  353 | 
```