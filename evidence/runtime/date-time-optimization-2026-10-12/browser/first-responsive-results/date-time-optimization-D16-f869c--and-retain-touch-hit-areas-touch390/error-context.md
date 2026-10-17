# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: date-time-optimization.spec.ts >> D16 responsive panels preserve draft, contain overflow and retain touch hit areas
- Location: tests/e2e/date-time-optimization.spec.ts:236:1

# Error details

```
Error: [{"tag":"上个月","width":14,"height":14},{"tag":"下个月","width":14,"height":14},{"tag":"2026年10月1日","width":51.140625,"height":14},{"tag":"2026年10月2日","width":51.140625,"height":14},{"tag":"2026年10月3日","width":51.140625,"height":14},{"tag":"2026年10月4日","width":51.15625,"height":14},{"tag":"2026年10月5日","width":51.140625,"height":14},{"tag":"2026年10月6日","width":51.140625,"height":14},{"tag":"2026年10月7日","width":51.140625,"height":14},{"tag":"2026年10月8日","width":51.140625,"height":14},{"tag":"2026年10月9日","width":51.140625,"height":14},{"tag":"2026年10月10日","width":51.140625,"height":14},{"tag":"2026年10月11日","width":51.15625,"height":14},{"tag":"2026年10月12日，今天","width":51.140625,"height":14},{"tag":"2026年10月13日，已选中","width":51.140625,"height":14},{"tag":"2026年10月14日，已选中","width":51.140625,"height":14},{"tag":"2026年10月15日","width":51.140625,"height":14},{"tag":"2026年10月16日","width":51.140625,"height":14},{"tag":"2026年10月17日","width":51.140625,"height":14},{"tag":"2026年10月18日","width":51.15625,"height":14},{"tag":"2026年10月19日","width":51.140625,"height":14},{"tag":"2026年10月20日","width":51.140625,"height":14},{"tag":"2026年10月21日","width":51.140625,"height":14},{"tag":"2026年10月22日","width":51.140625,"height":14},{"tag":"2026年10月23日","width":51.140625,"height":14},{"tag":"2026年10月24日","width":51.140625,"height":14},{"tag":"2026年10月25日","width":51.15625,"height":14},{"tag":"2026年10月26日","width":51.140625,"height":14},{"tag":"2026年10月27日","width":51.140625,"height":14},{"tag":"2026年10月28日","width":51.140625,"height":14},{"tag":"2026年10月29日","width":51.140625,"height":14},{"tag":"2026年10月30日","width":51.140625,"height":14},{"tag":"2026年10月31日","width":51.140625,"height":14},{"tag":"2026年11月1日","width":51.15625,"height":14},{"tag":"2026年11月2日","width":51.140625,"height":14},{"tag":"2026年11月3日","width":51.140625,"height":14},{"tag":"2026年11月4日","width":51.140625,"height":14},{"tag":"2026年11月5日","width":51.140625,"height":14},{"tag":"2026年11月6日","width":51.140625,"height":14},{"tag":"2026年11月7日","width":51.140625,"height":14},{"tag":"2026年11月8日","width":51.15625,"height":14},{"tag":"清空","width":36,"height":20},{"tag":"取消","width":70,"height":32.00006103515625},{"tag":"确定","width":70,"height":32.00006103515625}]

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - main [ref=e4]:
    - generic [ref=e5]:
      - link [ref=e6] [cursor=pointer]:
        - /url: "#components"
        - generic [ref=e7]: 返回组件目录
      - generic [ref=e8]:
        - heading [level=1] [ref=e9]: Date Picker 日期与时间
        - generic [ref=e10]: G5 · 表单与日期 · 共享候选 · 视觉与体验待审阅
      - paragraph [ref=e11]: 在面板里编辑日期与时分，确认后更新字段；取消或关闭会放弃未确认修改。
      - generic [ref=e12]:
        - button [pressed] [ref=e13] [cursor=pointer]:
          - generic [ref=e14]: 浅色
        - button [ref=e15] [cursor=pointer]:
          - generic [ref=e16]: 深色
        - button [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: 紧凑密度
    - generic [ref=e19]:
      - generic [ref=e20]:
        - heading [level=2] [ref=e21]: 单日与带时分的单日
        - paragraph [ref=e22]: 字段显示已确认值，面板中的修改在确定前保持为草稿。
        - generic [ref=e25]:
          - generic [ref=e26]:
            - generic [ref=e27]: 截止日期
            - generic [ref=e28]:
              - button [ref=e30] [cursor=pointer]:
                - generic [ref=e31]: 2026-10-20
              - generic [ref=e34]: 2026-10-20
              - status [ref=e35]: 2026-10-20
          - generic [ref=e36]:
            - generic [ref=e37]: 截止时间
            - generic [ref=e38]:
              - button [ref=e40] [cursor=pointer]:
                - generic [ref=e41]: 2026-10-20 18:00
              - generic [ref=e44]: 2026-10-20 18:00
              - status [ref=e45]: 2026-10-20 18:00
      - generic [ref=e46]:
        - heading [level=2] [ref=e47]: 日期区间与日期时间区间
        - paragraph [ref=e48]: 宽屏并排展示连续两个月，窄屏切换单月；日期与时分可以直接编辑。取消、外点或 Escape 放弃草稿。
        - generic [ref=e51]:
          - generic [ref=e52]:
            - generic [ref=e53]:
              - text: 开放时间
              - generic [ref=e54]: "*"
            - generic [ref=e55]:
              - button [ref=e57] [cursor=pointer]:
                - generic [ref=e58]: 2026-10-12 09:00 至 2026-10-20 18:00
              - generic [ref=e61]: 2026-10-12 09:00 至 2026-10-20 18:00
              - status [ref=e62]: 2026-10-12 09:00 至 2026-10-20 18:00
          - generic [ref=e63]:
            - generic [ref=e64]: 日期区间
            - generic [ref=e65]:
              - button [ref=e67] [cursor=pointer]:
                - generic [ref=e68]: 请选择日期范围
              - generic [ref=e71]: 尚未选择日期
              - status [ref=e72]
      - generic [ref=e74]:
        - heading [level=2] [ref=e75]: 作业：开放与截止
        - paragraph [ref=e76]: 立即开放只保存开放意图；定时开放与截止分别编辑，外层保存时再次检查时间关系。
        - form "作业发布设置" [ref=e78]:
          - generic [ref=e79]:
            - heading [level=3] [ref=e80]: 作业发布设置
            - paragraph [ref=e81]: 本地样板 · 人工智能导论 · 第五讲
          - generic [ref=e82]:
            - generic [ref=e83]:
              - generic [ref=e84]:
                - text: 作业名称
                - generic [ref=e85]: "*"
              - generic [ref=e86]:
                - textbox [ref=e87]: 第五讲案例分析
                - button [ref=e89] [cursor=pointer]
            - generic [ref=e92]:
              - generic [ref=e93]: 作业类型
              - combobox [ref=e95] [cursor=pointer]
            - generic [ref=e96]:
              - generic [ref=e97]:
                - text: 所属课程
                - generic [ref=e98]: "*"
              - group [ref=e99]:
                - generic [ref=e100]:
                  - combobox "所属课程 *" [ref=e101]: 人工智能导论
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
                  - button [ref=e116] [cursor=pointer]
                  - generic [ref=e118]:
                    - spinbutton [ref=e119]: "100"
                    - generic [ref=e120]: 分
                  - button [ref=e121] [cursor=pointer]
                - generic [ref=e123]: 单位：分
          - generic [ref=e124]:
            - generic [ref=e125]: 作业说明
            - generic [ref=e126]:
              - textbox [ref=e127]: 结合课堂案例，说明你的判断及支持它的证据。
              - generic [ref=e128]: 21 / 500
            - generic [ref=e130]: 说明学习目标、提交内容和判断依据。
          - radiogroup [ref=e131]:
            - generic [ref=e132]: 开放方式
            - generic [ref=e133]:
              - generic [ref=e134] [cursor=pointer]:
                - radio [checked] [ref=e135]
                - generic [ref=e139]: 立即开放
              - generic [ref=e141] [cursor=pointer]:
                - radio [ref=e142]
                - generic [ref=e145]: 定时开放
          - generic [ref=e148]:
            - generic [ref=e149]:
              - text: 作业截止时间
              - generic [ref=e150]: "*"
            - generic [ref=e151]:
              - button [ref=e153] [cursor=pointer]:
                - generic [ref=e154]: 2026-10-13 23:59
              - generic [ref=e157]: 2026-10-13 23:59
              - status [ref=e158]: 2026-10-13 23:59
            - generic [ref=e159]: 23:59 是明确时刻；到达该时间后停止提交。
          - generic [ref=e160]:
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
            - status [ref=e171]: 面板确定后更新草稿，保存后更新本地作业设置。
            - button [ref=e172] [cursor=pointer]:
              - generic [ref=e173]: 保存设置
      - generic [ref=e175]:
        - heading [level=2] [ref=e176]: 考试：开放窗口与答题时长
        - paragraph [ref=e177]: 窗口决定何时可以作答，答题时长单独设置。下方入场模拟使用明确的本地关闭策略。
        - form [ref=e179]:
          - generic [ref=e180]:
            - heading [level=3] [ref=e181]: 考试开放与答题时长
            - paragraph [ref=e182]: 本地样板 · 开放窗口与每位学生的答题时长分别设置。
          - generic [ref=e183]:
            - generic [ref=e184]:
              - text: 考试开放窗口
              - generic [ref=e185]: "*"
            - generic [ref=e186]:
              - button [ref=e188] [cursor=pointer]:
                - generic [ref=e189]: 2026-10-13 09:00 至 2026-10-13 11:00
              - generic [ref=e192]: 2026-10-13 09:00 至 2026-10-13 11:00
              - status [ref=e193]: 2026-10-13 09:00 至 2026-10-13 11:00
          - generic [ref=e194]:
            - generic [ref=e195]:
              - generic [ref=e196]:
                - text: 答题时长
                - generic [ref=e197]: "*"
              - generic [ref=e198]:
                - generic [ref=e199]:
                  - button [ref=e200] [cursor=pointer]
                  - generic [ref=e202]:
                    - spinbutton [ref=e203]: "60"
                    - generic [ref=e204]: 分钟
                  - button [ref=e205] [cursor=pointer]
                - generic [ref=e207]: 单位：分钟
              - generic [ref=e208]: 每位学生开始作答后计时。
            - generic [ref=e209]:
              - strong [ref=e210]: 关闭规则
              - paragraph [ref=e211]: 本地演示策略：到达关闭时间统一结束。
          - generic [ref=e212]:
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
                - button [ref=e227] [cursor=pointer]:
                  - generic [ref=e228]: 2026-10-13 10:30
                - generic [ref=e231]: 2026-10-13 10:30
                - status [ref=e232]: 2026-10-13 10:30
              - generic [ref=e233]: 可选择开放前、窗口中或关闭时，查看能否开始以及实际可用时长。
            - paragraph [ref=e234]: 可答题 30 分钟；最晚于 2026-10-13 11:00 结束。
          - generic [ref=e235]:
            - status [ref=e236]: 面板确定后更新草稿，保存后更新本地考试设置。
            - button [ref=e237] [cursor=pointer]:
              - generic [ref=e238]: 保存考试设置
      - generic [ref=e240]:
        - heading [level=2] [ref=e241]: 时间段：同日、跨午夜与跨月
        - paragraph [ref=e242]: 先看完整起止结果再保存；常用场景和按时长操作都保持为待确认草稿。
        - form [ref=e244]:
          - generic [ref=e245]:
            - heading [level=3] [ref=e246]: 同日与跨日时间段
            - paragraph [ref=e247]: 本地活动样板 · 可直接修改任一端，或在面板内选择常用场景。
          - generic [ref=e248]:
            - generic [ref=e249]:
              - text: 活动时间段
              - generic [ref=e250]: "*"
            - generic [ref=e251]:
              - button [expanded] [ref=e253] [cursor=pointer]:
                - generic [ref=e254]: 2026-10-13 23:00 至 2026-10-14 01:00
              - generic [ref=e257]: 2026-10-13 23:00 至 2026-10-14 01:00
              - status [ref=e258]
          - generic [ref=e259]:
            - generic [ref=e260]:
              - term [ref=e261]: 起止时间
              - definition [ref=e262]: 2026-10-13 23:00 → 2026-10-14 01:00（次日）
            - generic [ref=e263]:
              - term [ref=e264]: 时段长度
              - definition [ref=e265]: 2 小时
            - generic [ref=e266]:
              - term [ref=e267]: 时间基准
              - definition [ref=e268]: 本机时间（Asia/Shanghai · 北京时间）
          - paragraph [ref=e269]: 修改开始不会自动移动结束；需要保持时长时，在面板中重新选择“按时长设置结束”。
          - generic [ref=e270]:
            - status [ref=e271]: 选择、取消和清空均先作用于面板草稿。
            - button [ref=e272] [cursor=pointer]:
              - generic [ref=e273]: 保存时间段
        - generic [ref=e274]:
          - button [ref=e276] [cursor=pointer]:
            - generic [ref=e277]: 复制代码
          - code [ref=e279]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"活动时间段\" required> <DatePicker mode=\"range\" showTime size={36} value={value} onValueChange={setValue} timeStep={15} minDurationMinutes={1} durationPresets={[30, 60, 90, 120]} presets={[{ label: \"明天 09:00–10:30\", getValue: now => ({ from: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9), to: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30), }) }]} /> </FormItem>; }"
      - generic [ref=e280]:
        - heading [level=2] [ref=e281]: 在筛选区组合使用
        - paragraph [ref=e282]: 课程与成绩即时改变结果；统计日期按面板确认后的值更新。
        - generic [ref=e284]:
          - generic [ref=e285]:
            - heading [level=3] [ref=e286]: 教学数据筛选
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
                - button [ref=e307] [cursor=pointer]:
                  - generic [ref=e308]: 2026-10-01 至 2026-10-31
                - generic [ref=e311]: 2026-10-01 至 2026-10-31
                - status [ref=e312]: 2026-10-01 至 2026-10-31
          - generic [ref=e313]:
            - generic [ref=e314]: 成绩范围 60–100 分
            - group [ref=e315]:
              - generic [ref=e316] [cursor=pointer]:
                - slider [ref=e320]: "60"
                - slider [ref=e322]: "100"
          - status [ref=e323]:
            - strong [ref=e324]: "2"
            - generic [ref=e325]: 位学生符合当前筛选
            - paragraph [ref=e326]: 2026-10-01 至 2026-10-31
      - generic [ref=e327]:
        - heading [level=2] [ref=e328]: 在对话框和侧栏中编辑
        - paragraph [ref=e329]: 日期面板先处理自己的关闭，再回到当前编辑任务。
        - generic [ref=e332]:
          - button [ref=e333] [cursor=pointer]:
            - generic [ref=e334]: 对话框设置日期
          - button [ref=e335] [cursor=pointer]:
            - generic [ref=e336]: 侧栏设置时间
      - group [ref=e337]:
        - generic [ref=e338] [cursor=pointer]: 来源、复用关系与当前边界
    - region [ref=e339]:
      - heading [level=2] [ref=e340]: 使用边界
      - generic [ref=e341]:
        - generic [ref=e342]:
          - heading [level=3] [ref=e343]: 适合用在
          - list [ref=e344]:
            - listitem [ref=e345]: 设置截止日期、开放时间或起止区间。
            - listitem [ref=e346]: 需要检查选择结果后再明确提交。
        - generic [ref=e347]:
          - heading [level=3] [ref=e348]: 避免用在
          - list [ref=e349]:
            - listitem [ref=e350]: 需要自然语言日期解析、复杂时区转换或秒级排班。
            - listitem [ref=e351]: 把面板里每次选择都立即写入业务数据。
    - generic [ref=e352]:
      - region [ref=e353]:
        - heading [level=2] [ref=e354]: API 与结构
        - table [ref=e356]:
          - caption [ref=e357]: Date Picker 日期与时间 常用接口
          - rowgroup [ref=e358]:
            - row [ref=e359]:
              - columnheader [ref=e360]: 名称
              - columnheader [ref=e361]: 类型
              - columnheader [ref=e362]: 默认
              - columnheader [ref=e363]: 说明
          - rowgroup [ref=e364]:
            - row [ref=e365]:
              - rowheader [ref=e366]:
                - code [ref=e367]: size / appearance / status
              - cell [ref=e368]:
                - code [ref=e369]: 24 | 28 | 32 | 36 / outlined | filled | underlined / default | warning | error
              - cell [ref=e370]: —
              - cell [ref=e371]: 沿用 Rain 字段尺寸、外观和状态；FormItem 可以统一传递状态。
            - row [ref=e372]:
              - rowheader [ref=e373]:
                - code [ref=e374]: disabled / required
              - cell [ref=e375]:
                - code [ref=e376]: boolean
              - cell [ref=e377]: —
              - cell [ref=e378]: 禁用与必填按真实控件语义使用，提供可见标签或可访问名称。
            - row [ref=e379]:
              - rowheader [ref=e380]:
                - code [ref=e381]: mode / showTime
              - cell [ref=e382]:
                - code [ref=e383]: single | range / boolean
              - cell [ref=e384]: single / false
              - cell [ref=e385]: 单日、日期区间及各自的时分模式；面板内可手输 YYYY-MM-DD 和时分。
            - row [ref=e386]:
              - rowheader [ref=e387]:
                - code [ref=e388]: value / onValueChange
              - cell [ref=e389]:
                - code [ref=e390]: Date | DateRange | null / callback
              - cell [ref=e391]: —
              - cell [ref=e392]: 公开区间必须完整，仅确定时提交；清空也经过确定。
            - row [ref=e393]:
              - rowheader [ref=e394]:
                - code [ref=e395]: minDate / maxDate / disabledDates
              - cell [ref=e396]:
                - code [ref=e397]: Date / Date / Matcher
              - cell [ref=e398]: —
              - cell [ref=e399]: 无时间时按日比较，带时间时比较分钟；当前时间限制由宿主更新，保存时精确复核。
            - row [ref=e400]:
              - rowheader [ref=e401]:
                - code [ref=e402]: presets / timeStep
              - cell [ref=e403]:
                - code [ref=e404]: DatePickerPreset[] / 5 | 15 | 30
              - cell [ref=e405]: —
              - cell [ref=e406]: 快捷值在点击时计算；时间步长只影响建议列表，手输仍精确到分钟。
            - row [ref=e407]:
              - rowheader [ref=e408]:
                - code [ref=e409]: durationPresets / minDurationMinutes / maxDurationMinutes
              - cell [ref=e410]:
                - code [ref=e411]: number[] / number / number
              - cell [ref=e412]: —
              - cell [ref=e413]: 仅日期时间范围使用；按时长设置结束只执行一次，教学窗口显式设置最短 1 分钟。
            - row [ref=e414]:
              - rowheader [ref=e415]:
                - code [ref=e416]: excludeDisabled
              - cell [ref=e417]:
                - code [ref=e418]: boolean
              - cell [ref=e419]: "true"
              - cell [ref=e420]: 默认整段不能跨禁用日期；false 时仍禁止选择禁用端点。
      - region [ref=e421]:
        - heading [level=2] [ref=e422]: 调用示例
        - generic [ref=e423]:
          - button [ref=e425] [cursor=pointer]:
            - generic [ref=e426]: 复制代码
          - code [ref=e428]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"开放时间\" required><DatePicker mode=\"range\" showTime value={value} onValueChange={setValue} size={36} /></FormItem>; }"
        - paragraph [ref=e429]:
          - text: 当前源码：
          - code [ref=e430]: packages/ui/src/date-picker/date-picker.tsx
  - dialog [ref=e434]:
    - generic [ref=e435]:
      - heading "选择日期范围与时间" [level=2] [ref=e437]
      - generic [ref=e439]:
        - generic [ref=e440]:
          - generic [ref=e441]:
            - generic [ref=e442]: 开始
            - textbox "开始日期" [ref=e444]:
              - /placeholder: YYYY-MM-DD
              - text: 2026-10-13
            - group "开始时间" [ref=e445]:
              - generic [ref=e447]:
                - textbox "开始小时" [ref=e450]: "23"
                - generic [ref=e451]:
                  - generic [ref=e452]: ":"
                  - textbox "开始分钟" [ref=e454]: "00"
                - generic [ref=e455]:
                  - combobox "开始常用时间" [ref=e457] [cursor=pointer]:
                    - generic "23:00" [ref=e459]
                  - generic [ref=e463]: 已选：23:00
                - textbox [ref=e464]: 23:00
          - generic [ref=e465]:
            - generic [ref=e466]: 结束
            - textbox "结束日期" [ref=e468]:
              - /placeholder: YYYY-MM-DD
              - text: 2026-10-14
            - group "结束时间" [ref=e469]:
              - generic [ref=e471]:
                - textbox "结束小时" [ref=e474]: "01"
                - generic [ref=e475]:
                  - generic [ref=e476]: ":"
                  - textbox "结束分钟" [active] [ref=e478]: "15"
                - generic [ref=e479]:
                  - combobox "结束常用时间" [ref=e481] [cursor=pointer]:
                    - generic "01:15" [ref=e483]
                  - generic [ref=e487]: 已选：01:15
                - textbox [ref=e488]: 01:15
        - generic [ref=e489]: 当前正在编辑：结束
        - generic "常用日期" [ref=e490]:
          - button "同日 90 分钟" [ref=e492] [cursor=pointer]
          - button "跨午夜" [ref=e495] [cursor=pointer]
          - button "跨月时段" [ref=e498] [cursor=pointer]
        - generic [ref=e502]:
          - navigation "切换月份":
            - button "上个月" [disabled] [ref=e503]
            - button "下个月" [ref=e506] [cursor=pointer]
          - generic [ref=e509]:
            - generic [ref=e511]:
              - generic [ref=e512]:
                - combobox "选择年份" [ref=e514] [cursor=pointer]:
                  - generic "2026年" [ref=e516]
                - generic [ref=e520]: 已选：2026年
              - textbox [ref=e521]: "2026"
              - generic [ref=e522]:
                - combobox "选择月份" [ref=e524] [cursor=pointer]:
                  - generic "10月" [ref=e526]
                - generic [ref=e530]: 已选：10月
              - textbox [ref=e531]: "9"
              - status [ref=e532]: 2026年10月
            - grid "2026年10月" [ref=e533]:
              - rowgroup [ref=e534]:
                - row [ref=e535]:
                  - columnheader [ref=e536]: 一
                  - columnheader [ref=e537]: 二
                  - columnheader [ref=e538]: 三
                  - columnheader [ref=e539]: 四
                  - columnheader [ref=e540]: 五
                  - columnheader [ref=e541]: 六
                  - columnheader [ref=e542]: 日
              - rowgroup [ref=e543]:
                - row [ref=e544]:
                  - gridcell [ref=e545]:
                    - button "2026年10月1日" [disabled] [ref=e546]:
                      - generic [ref=e547]: "1"
                  - gridcell [ref=e548]:
                    - button "2026年10月2日" [disabled] [ref=e549]:
                      - generic [ref=e550]: "2"
                  - gridcell [ref=e551]:
                    - button "2026年10月3日" [disabled] [ref=e552]:
                      - generic [ref=e553]: "3"
                  - gridcell [ref=e554]:
                    - button "2026年10月4日" [disabled] [ref=e555]:
                      - generic [ref=e556]: "4"
                - row [ref=e557]:
                  - gridcell [ref=e558]:
                    - button "2026年10月5日" [disabled] [ref=e559]:
                      - generic [ref=e560]: "5"
                  - gridcell [ref=e561]:
                    - button "2026年10月6日" [disabled] [ref=e562]:
                      - generic [ref=e563]: "6"
                  - gridcell [ref=e564]:
                    - button "2026年10月7日" [disabled] [ref=e565]:
                      - generic [ref=e566]: "7"
                  - gridcell [ref=e567]:
                    - button "2026年10月8日" [disabled] [ref=e568]:
                      - generic [ref=e569]: "8"
                  - gridcell [ref=e570]:
                    - button "2026年10月9日" [disabled] [ref=e571]:
                      - generic [ref=e572]: "9"
                  - gridcell [ref=e573]:
                    - button "2026年10月10日" [disabled] [ref=e574]:
                      - generic [ref=e575]: "10"
                  - gridcell [ref=e576]:
                    - button "2026年10月11日" [disabled] [ref=e577]:
                      - generic [ref=e578]: "11"
                - row [ref=e579]:
                  - gridcell [ref=e580]:
                    - button "2026年10月12日，今天" [ref=e581] [cursor=pointer]:
                      - generic [ref=e582]: "12"
                  - gridcell [selected] [ref=e583]:
                    - button "2026年10月13日，已选中" [ref=e584] [cursor=pointer]:
                      - generic [ref=e585]: "13"
                  - gridcell [selected] [ref=e586]:
                    - button "2026年10月14日，已选中" [ref=e587] [cursor=pointer]:
                      - generic [ref=e588]: "14"
                  - gridcell [ref=e589]:
                    - button "2026年10月15日" [ref=e590] [cursor=pointer]:
                      - generic [ref=e591]: "15"
                  - gridcell [ref=e592]:
                    - button "2026年10月16日" [ref=e593] [cursor=pointer]:
                      - generic [ref=e594]: "16"
                  - gridcell [ref=e595]:
                    - button "2026年10月17日" [ref=e596] [cursor=pointer]:
                      - generic [ref=e597]: "17"
                  - gridcell [ref=e598]:
                    - button "2026年10月18日" [ref=e599] [cursor=pointer]:
                      - generic [ref=e600]: "18"
                - row [ref=e601]:
                  - gridcell [ref=e602]:
                    - button "2026年10月19日" [ref=e603] [cursor=pointer]:
                      - generic [ref=e604]: "19"
                  - gridcell [ref=e605]:
                    - button "2026年10月20日" [ref=e606] [cursor=pointer]:
                      - generic [ref=e607]: "20"
                  - gridcell [ref=e608]:
                    - button "2026年10月21日" [ref=e609] [cursor=pointer]:
                      - generic [ref=e610]: "21"
                  - gridcell [ref=e611]:
                    - button "2026年10月22日" [ref=e612] [cursor=pointer]:
                      - generic [ref=e613]: "22"
                  - gridcell [ref=e614]:
                    - button "2026年10月23日" [ref=e615] [cursor=pointer]:
                      - generic [ref=e616]: "23"
                  - gridcell [ref=e617]:
                    - button "2026年10月24日" [ref=e618] [cursor=pointer]:
                      - generic [ref=e619]: "24"
                  - gridcell [ref=e620]:
                    - button "2026年10月25日" [ref=e621] [cursor=pointer]:
                      - generic [ref=e622]: "25"
                - row [ref=e623]:
                  - gridcell [ref=e624]:
                    - button "2026年10月26日" [ref=e625] [cursor=pointer]:
                      - generic [ref=e626]: "26"
                  - gridcell [ref=e627]:
                    - button "2026年10月27日" [ref=e628] [cursor=pointer]:
                      - generic [ref=e629]: "27"
                  - gridcell [ref=e630]:
                    - button "2026年10月28日" [ref=e631] [cursor=pointer]:
                      - generic [ref=e632]: "28"
                  - gridcell [ref=e633]:
                    - button "2026年10月29日" [ref=e634] [cursor=pointer]:
                      - generic [ref=e635]: "29"
                  - gridcell [ref=e636]:
                    - button "2026年10月30日" [ref=e637] [cursor=pointer]:
                      - generic [ref=e638]: "30"
                  - gridcell [ref=e639]:
                    - button "2026年10月31日" [ref=e640] [cursor=pointer]:
                      - generic [ref=e641]: "31"
                  - gridcell [ref=e642]:
                    - button "2026年11月1日" [ref=e643] [cursor=pointer]:
                      - generic [ref=e644]: "1"
                - row [ref=e645]:
                  - gridcell [ref=e646]:
                    - button "2026年11月2日" [ref=e647] [cursor=pointer]:
                      - generic [ref=e648]: "2"
                  - gridcell [ref=e649]:
                    - button "2026年11月3日" [ref=e650] [cursor=pointer]:
                      - generic [ref=e651]: "3"
                  - gridcell [ref=e652]:
                    - button "2026年11月4日" [ref=e653] [cursor=pointer]:
                      - generic [ref=e654]: "4"
                  - gridcell [ref=e655]:
                    - button "2026年11月5日" [ref=e656] [cursor=pointer]:
                      - generic [ref=e657]: "5"
                  - gridcell [ref=e658]:
                    - button "2026年11月6日" [ref=e659] [cursor=pointer]:
                      - generic [ref=e660]: "6"
                  - gridcell [ref=e661]:
                    - button "2026年11月7日" [ref=e662] [cursor=pointer]:
                      - generic [ref=e663]: "7"
                  - gridcell [ref=e664]:
                    - button "2026年11月8日" [ref=e665] [cursor=pointer]:
                      - generic [ref=e666]: "8"
        - generic [ref=e667]:
          - generic [ref=e668]: 按时长设置结束
          - generic [ref=e669]:
            - button "30分钟" [ref=e670] [cursor=pointer]
            - button "60分钟" [ref=e672] [cursor=pointer]
            - button "90分钟" [ref=e674] [cursor=pointer]
            - button "120分钟" [ref=e676] [cursor=pointer]
          - generic [ref=e678]:
            - textbox "自定义时长（分钟）" [ref=e680]:
              - /placeholder: 自定义分钟
            - button "应用时长" [disabled] [ref=e681]
        - generic [ref=e683]: 2026-10-13 23:00 至 2026-10-14 01:15 · 次日 01:15 · 时段长度 2 小时 15 分钟
      - generic [ref=e686]:
        - button "清空" [ref=e687] [cursor=pointer]
        - button "取消" [ref=e689] [cursor=pointer]
        - button "确定" [ref=e691] [cursor=pointer]
```

# Test source

```ts
  144 |   await expect(trigger).toHaveText("2026-10-13 23:00 至 2026-10-14 01:00");
  145 |   await expect(summary(page)).toContainText(/1\s*小时\s*30\s*分钟/);
  146 |   await box(page, "自定义时长（分钟）").fill("45"); await panel(page).getByRole("button", { name: "应用时长", exact: true }).click();
  147 |   await expect(box(page, "结束小时")).toHaveValue("09"); await expect(box(page, "结束分钟")).toHaveValue("45");
  148 |   await box(page, "开始分钟").fill("15"); await expect(box(page, "结束分钟")).toHaveValue("45");
  149 |   await expect(summary(page)).toContainText(/30\s*分钟/);
  150 |   await box(page, "自定义时长（分钟）").fill("0"); await expect(panel(page).getByRole("button", { name: "应用时长", exact: true })).toBeDisabled();
  151 |   await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 09:15 至 2026-10-13 09:45");
  152 | });
  153 | 
  154 | test("D12 cancel Escape outside and clear do not leak drafts; reopen resets selection intent", async ({ page }, info) => {
  155 |   test.skip(!basicProject(info), "Dismissal behavior exercised in Chromium and WebKit.");
  156 |   await page.goto("/#date-picker"); const trigger = await open(page, "截止时间");
  157 |   await box(page, "日期").fill("2026-12-25"); await panel(page).getByRole("button", { name: "取消", exact: true }).click();
  158 |   await expect(trigger).toHaveText("2026-10-20 18:00"); await expect(trigger).toBeFocused();
  159 |   await open(page, "截止时间"); await box(page, "日期小时").fill("12"); await page.keyboard.press("Escape");
  160 |   await expect(trigger).toHaveText("2026-10-20 18:00");
  161 |   await open(page, "截止时间"); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  162 |   await panel(page).getByRole("button", { name: "取消", exact: true }).click(); await expect(trigger).toHaveText("2026-10-20 18:00");
  163 |   await open(page, "截止时间"); await box(page, "日期").fill("2026-11-10");
  164 |   await page.getByRole("button", { name: "深色", exact: true }).click(); await expect(panel(page)).toHaveCount(0);
  165 |   await expect(trigger).toHaveText("2026-10-20 18:00");
  166 |   const rangeTrigger = await open(page, "活动时间段");
  167 |   await box(page, "结束日期").focus(); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  168 |   await day(page, 2026, 10, 20).click(); await expect(confirm(page)).toBeDisabled();
  169 |   await day(page, 2026, 10, 21).click(); await confirm(page).click();
  170 |   await expect(rangeTrigger).toHaveText("2026-10-20 23:00 至 2026-10-21 01:00");
  171 | });
  172 | 
  173 | test("D13 nested month and time menus own Escape and Enter never saves the host form", async ({ page }, info) => {
  174 |   test.skip(!basicProject(info), "Keyboard layering exercised in Chromium and WebKit.");
  175 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  176 |   const month = panel(page).getByRole("combobox", { name: "选择月份", exact: true });
  177 |   await month.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  178 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(panel(page)).toBeVisible(); await expect(month).toBeFocused();
  179 |   const suggestions = panel(page).getByRole("combobox", { name: "日期常用时间", exact: true });
  180 |   await suggestions.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  181 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(suggestions).toBeFocused();
  182 |   await box(page, "日期小时").fill("9"); await box(page, "日期小时").press("Enter");
  183 |   await expect(panel(page)).toBeVisible(); await expect(page.getByRole("status", { name: "作业保存结果" })).not.toContainText("设置已保存");
  184 |   await page.keyboard.press("Escape"); await expect(trigger).toBeFocused();
  185 |   for (const [opener, title, field] of [["对话框设置日期", "作业日期设置", "对话框截止日期"], ["侧栏设置时间", "作业时间设置", "侧栏截止时间"]]) {
  186 |     await page.getByRole("button", { name: opener!, exact: true }).click();
  187 |     const outer = page.getByRole("dialog", { name: title!, exact: true });
  188 |     await outer.getByRole("button", { name: field!, exact: true }).click(); await expect(panel(page)).toBeVisible();
  189 |     await page.keyboard.press("Escape"); await expect(panel(page)).toHaveCount(0); await expect(outer).toBeVisible();
  190 |     await page.keyboard.press("Escape"); await expect(outer).toHaveCount(0);
  191 |   }
  192 | });
  193 | 
  194 | test("D15 D18 current time refresh rejects expired drafts and host save preserves data", async ({ page }, info) => {
  195 |   test.skip(!basicProject(info), "Clock and host validation exercised in Chromium and WebKit.");
  196 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  197 |   await dateTime(page, "日期", "2026-10-12", "10", "01"); await expect(confirm(page)).toBeEnabled();
  198 |   await page.clock.setFixedTime(new Date("2026-10-12T10:01:30+08:00"));
  199 |   // The host subscribes to foreground focus; dispatch that lifecycle notification without reloading the draft.
  200 |   await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  201 |   await expect(confirm(page)).toBeDisabled(); await expect(box(page, "日期分钟")).toHaveValue("01");
  202 |   await box(page, "日期分钟").fill("02"); await confirm(page).click();
  203 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  204 |   await page.clock.setFixedTime(new Date("2026-10-12T10:02:00+08:00"));
  205 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  206 |   await expect(page.getByText("截止时间必须晚于当前时间，请重新选择。", { exact: true })).toBeVisible();
  207 |   await expect(trigger).toHaveText("2026-10-12 10:02");
  208 |   await open(page, "作业截止时间"); await panel(page).getByRole("button", { name: "明天 23:59", exact: true }).click(); await confirm(page).click();
  209 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  210 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("设置已保存");
  211 |   await page.getByText("定时开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "定时开放", exact: true })).toBeChecked();
  212 |   await page.clock.setFixedTime(new Date("2026-10-13T10:00:00+08:00"));
  213 |   await page.getByText("立即开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "立即开放", exact: true })).toBeChecked();
  214 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  215 |   await expect(page.getByRole("status", { name: "作业保存结果" })).toContainText("立即开放");
  216 |   await page.getByText("定时开放", { exact: true }).click(); await expect(page.getByRole("radio", { name: "定时开放", exact: true })).toBeChecked();
  217 |   await page.getByTestId("date-time-homework").getByRole("button", { name: "保存设置", exact: true }).click();
  218 |   await expect(page.getByText("开放时间已经过去，请重新选择。", { exact: true })).toBeVisible();
  219 | });
  220 | 
  221 | test("D18 exam entry boundaries clamp late entry and keep duration independent", async ({ page }, info) => {
  222 |   test.skip(!basicProject(info), "Admission behavior exercised in Chromium and WebKit.");
  223 |   await page.goto("/#date-picker");
  224 |   for (const [preset, result] of [["开放前 1 分钟", "尚未开放"], ["开放时刻", "可答题 1 小时"], ["关闭前 30 分钟", "可答题 30 分钟"], ["关闭时刻", "考试已关闭"]]) {
  225 |     await open(page, "模拟入场时间"); await panel(page).getByRole("button", { name: preset!, exact: true }).click(); await confirm(page).click();
  226 |     await expect(page.getByLabel("模拟入场结果", { exact: true })).toContainText(result!);
  227 |   }
  228 |   const duration = page.getByRole("spinbutton", { name: "答题时长", exact: true }); await duration.fill("180"); await duration.press("Tab");
  229 |   await expect(page.getByText("答题时长超过开放窗口；按本演示策略，所有人最晚在关闭时间结束，原时长设置保留。", { exact: true })).toBeVisible();
  230 |   await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  231 |   await expect(page.getByRole("status", { name: "考试保存结果" })).toContainText("答题时长 180 分钟");
  232 |   await duration.fill("-"); await page.getByRole("button", { name: "保存考试设置", exact: true }).click();
  233 |   await expect(page.getByText("请输入正整数答题时长。", { exact: true })).toBeVisible();
  234 | });
  235 | 
  236 | test("D16 responsive panels preserve draft, contain overflow and retain touch hit areas", async ({ page }, info) => {
  237 |   await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  238 |   await expect(panel(page).getByRole("grid")).toHaveCount(basicProject(info) ? 2 : 1);
  239 |   await box(page, "结束分钟").fill("15");
  240 |   const coarse = info.project.name.startsWith("touch");
  241 |   if (coarse) {
  242 |     await expect(panel(page)).toHaveClass(/rain-date-picker__sheet/);
  243 |     const targets = await panel(page).locator('.rain-calendar__day-button, .rain-date-picker__actions > button, .rain-calendar__nav > button').evaluateAll(nodes => nodes.map(node => ({ tag: node.getAttribute("aria-label") || node.textContent, width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height })));
> 244 |     expect(targets.every(target => target.width >= 44 && target.height >= 44), JSON.stringify(targets)).toBe(true);
      |                                                                                                         ^ Error: [{"tag":"上个月","width":14,"height":14},{"tag":"下个月","width":14,"height":14},{"tag":"2026年10月1日","width":51.140625,"height":14},{"tag":"2026年10月2日","width":51.140625,"height":14},{"tag":"2026年10月3日","width":51.140625,"height":14},{"tag":"2026年10月4日","width":51.15625,"height":14},{"tag":"2026年10月5日","width":51.140625,"height":14},{"tag":"2026年10月6日","width":51.140625,"height":14},{"tag":"2026年10月7日","width":51.140625,"height":14},{"tag":"2026年10月8日","width":51.140625,"height":14},{"tag":"2026年10月9日","width":51.140625,"height":14},{"tag":"2026年10月10日","width":51.140625,"height":14},{"tag":"2026年10月11日","width":51.15625,"height":14},{"tag":"2026年10月12日，今天","width":51.140625,"height":14},{"tag":"2026年10月13日，已选中","width":51.140625,"height":14},{"tag":"2026年10月14日，已选中","width":51.140625,"height":14},{"tag":"2026年10月15日","width":51.140625,"height":14},{"tag":"2026年10月16日","width":51.140625,"height":14},{"tag":"2026年10月17日","width":51.140625,"height":14},{"tag":"2026年10月18日","width":51.15625,"height":14},{"tag":"2026年10月19日","width":51.140625,"height":14},{"tag":"2026年10月20日","width":51.140625,"height":14},{"tag":"2026年10月21日","width":51.140625,"height":14},{"tag":"2026年10月22日","width":51.140625,"height":14},{"tag":"2026年10月23日","width":51.140625,"height":14},{"tag":"2026年10月24日","width":51.140625,"height":14},{"tag":"2026年10月25日","width":51.15625,"height":14},{"tag":"2026年10月26日","width":51.140625,"height":14},{"tag":"2026年10月27日","width":51.140625,"height":14},{"tag":"2026年10月28日","width":51.140625,"height":14},{"tag":"2026年10月29日","width":51.140625,"height":14},{"tag":"2026年10月30日","width":51.140625,"height":14},{"tag":"2026年10月31日","width":51.140625,"height":14},{"tag":"2026年11月1日","width":51.15625,"height":14},{"tag":"2026年11月2日","width":51.140625,"height":14},{"tag":"2026年11月3日","width":51.140625,"height":14},{"tag":"2026年11月4日","width":51.140625,"height":14},{"tag":"2026年11月5日","width":51.140625,"height":14},{"tag":"2026年11月6日","width":51.140625,"height":14},{"tag":"2026年11月7日","width":51.140625,"height":14},{"tag":"2026年11月8日","width":51.15625,"height":14},{"tag":"清空","width":36,"height":20},{"tag":"取消","width":70,"height":32.00006103515625},{"tag":"确定","width":70,"height":32.00006103515625}]
  245 |   }
  246 |   await hasNoDuplicateIds(page);
  247 |   const bounds = await panel(page).boundingBox(); const viewport = page.viewportSize()!;
  248 |   expect(bounds!.x).toBeGreaterThanOrEqual(-1); expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
  249 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  250 |   await screenshot(panel(page), info, "datetime-panel");
  251 |   if (coarse) {
  252 |     await page.setViewportSize({ width: viewport.width, height: 480 });
  253 |     await box(page, "结束分钟").scrollIntoViewIfNeeded(); await expect(box(page, "结束分钟")).toHaveValue("15");
  254 |     await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  255 |   }
  256 |   await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 23:00 至 2026-10-14 01:15");
  257 | });
  258 | 
  259 | test("D16 D17 dark compact forced colors zoom and reduced motion keep controls reachable", async ({ page }, info) => {
  260 |   test.skip(!["desktop", "narrow390", "touch600"].includes(info.project.name), "Visual stress cases use representative fine and coarse pointers.");
  261 |   await page.goto("/#date-picker");
  262 |   await page.getByRole("button", { name: "深色", exact: true }).click(); await page.getByRole("button", { name: "紧凑密度", exact: true }).click();
  263 |   await open(page, "活动时间段"); await screenshot(panel(page), info, "datetime-dark-compact");
  264 |   await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
  265 |   await expect(panel(page)).toHaveCSS("transition-duration", "0s");
  266 |   await box(page, "开始日期").focus(); await expect(box(page, "开始日期")).toBeFocused();
  267 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  268 |   await screenshot(panel(page), info, "datetime-forced-colors");
  269 |   await page.keyboard.press("Escape");
  270 |   // CSS zoom exercises layout at 200%; OS/browser zoom and physical keyboards remain human checks.
  271 |   await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
  272 |   await open(page, "活动时间段"); await box(page, "结束分钟").fill("30");
  273 |   await confirm(page).scrollIntoViewIfNeeded(); await expect(confirm(page)).toBeInViewport();
  274 |   await screenshot(panel(page), info, "datetime-200-percent");
  275 |   await confirm(page).click();
  276 | });
  277 | 
  278 | test("D17 rapid month changes leave one live month and respect reduced motion", async ({ page }, info) => {
  279 |   test.skip(!basicProject(info), "Calendar motion exercised in Chromium and WebKit.");
  280 |   await page.goto("/#date-picker"); await open(page, "截止日期");
  281 |   const calendar = panel(page).locator('[data-rain-id="ui-calendar"]');
  282 |   const duration = await calendar.evaluate(node => getComputedStyle(node).getPropertyValue("--rdp-animation_duration").trim());
  283 |   expect(parseFloat(duration) * (duration.endsWith("ms") ? 1 : 1000)).toBe(220);
  284 |   const next = calendar.getByRole("button", { name: "下个月", exact: true });
  285 |   await next.click({ delay: 0 }); await next.click({ delay: 0 }); await next.click({ delay: 0 });
  286 |   await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText(/1月/);
  287 |   await expect(calendar.locator('[data-animated-month][aria-hidden="true"]')).toHaveCount(0);
  288 |   await expect(calendar.getByRole("grid")).toHaveCount(1);
  289 |   await page.emulateMedia({ reducedMotion: "reduce" }); await next.click();
  290 |   await expect(calendar.getByRole("combobox", { name: "选择月份" })).toHaveText(/2月/);
  291 |   await expect(calendar.locator("[data-animated-month]")).toHaveCount(0);
  292 |   await expect(calendar.locator(".rain-calendar__day-button").first()).toHaveCSS("transition-duration", "0s");
  293 | });
  294 | 
  295 | test("D20 UTC labels reflect the actual host timezone", async ({ browser }, info) => {
  296 |   test.skip(info.project.name !== "desktop", "Timezone behavior is browser-locale independent and exercised once in UTC.");
  297 |   const context = await browser.newContext({ timezoneId: "UTC", locale: "zh-CN", viewport: { width: 1440, height: 1000 } });
  298 |   const page = await context.newPage(); await page.clock.setFixedTime(fixedNow); await page.goto("http://127.0.0.1:5395/#date-picker");
  299 |   for (const label of ["作业设置摘要", "考试设置摘要", "时间段摘要"]) {
  300 |     await expect(page.getByLabel(label, { exact: true })).toContainText("本机时间（UTC）");
  301 |     await expect(page.getByLabel(label, { exact: true })).not.toContainText("北京时间");
  302 |   }
  303 |   await page.getByTestId("date-time-exam").screenshot({ path: `${evidence}/timezone-utc.png` }); await context.close();
  304 | });
  305 | 
```