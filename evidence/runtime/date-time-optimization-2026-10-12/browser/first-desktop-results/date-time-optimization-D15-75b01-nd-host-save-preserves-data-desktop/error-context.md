# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: date-time-optimization.spec.ts >> D15 D18 current time refresh rejects expired drafts and host save preserves data
- Location: tests/e2e/date-time-optimization.spec.ts:193:1

# Error details

```
Test timeout of 45000ms exceeded.
```

```
Error: locator.check: Test timeout of 45000ms exceeded.
Call log:
  - waiting for getByRole('radio', { name: '定时开放', exact: true })
    - locator resolved to <input type="radio" name="_r_u_" class="sr-only" data-slot="input" value="scheduled" data-focus="control" aria-labelledby="_r_10_-label"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <html lang="zh-CN" data-rain-theme="light">…</html> intercepts pointer events
  - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
    - retrying click action
      - waiting 100ms
    21 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <html lang="zh-CN" data-rain-theme="light">…</html> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <span data-slot="canvas" aria-hidden="true" class="flex h-rain-24 w-rain-24 flex-none items-center justify-center">…</span> intercepts pointer events
  - retrying click action
    - waiting 500ms

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
            - button "截止日期" [ref=e30] [cursor=pointer]:
              - generic [ref=e31]: 2026-10-20
            - generic [ref=e34]: 2026-10-20
            - status [ref=e35]: 2026-10-20
        - generic [ref=e36]:
          - generic [ref=e37]: 截止时间
          - generic [ref=e38]:
            - button "截止时间" [ref=e40] [cursor=pointer]:
              - generic [ref=e41]: 2026-10-20 18:00
            - generic [ref=e44]: 2026-10-20 18:00
            - status [ref=e45]: 2026-10-20 18:00
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
            - status [ref=e62]: 2026-10-12 09:00 至 2026-10-20 18:00
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
            - button "作业截止时间" [active] [ref=e150] [cursor=pointer]:
              - generic [ref=e151]: 2026-10-13 23:59
            - generic [ref=e154]: 2026-10-13 23:59
            - status [ref=e155]: 2026-10-13 23:59
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
          - status "作业保存结果" [ref=e168]: 《第五讲案例分析》设置已保存（仅当前页面）；立即开放；截止 2026-10-13 23:59；满分 100 分。
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
            - status [ref=e190]: 2026-10-13 09:00 至 2026-10-13 11:00
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
              - status [ref=e229]: 2026-10-13 10:30
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
            - button "活动时间段" [ref=e250] [cursor=pointer]:
              - generic [ref=e251]: 2026-10-13 23:00 至 2026-10-14 01:00
            - generic [ref=e254]: 2026-10-13 23:00 至 2026-10-14 01:00
            - status [ref=e255]: 2026-10-13 23:00 至 2026-10-14 01:00
        - generic "时间段摘要" [ref=e256]:
          - generic [ref=e257]:
            - term [ref=e258]: 起止时间
            - definition [ref=e259]: 2026-10-13 23:00 → 2026-10-14 01:00（次日）
          - generic [ref=e260]:
            - term [ref=e261]: 时段长度
            - definition [ref=e262]: 2 小时
          - generic [ref=e263]:
            - term [ref=e264]: 时间基准
            - definition [ref=e265]: 本机时间（Asia/Shanghai · 北京时间）
        - paragraph [ref=e266]: 修改开始不会自动移动结束；需要保持时长时，在面板中重新选择“按时长设置结束”。
        - generic [ref=e267]:
          - status "时间段保存结果" [ref=e268]: 选择、取消和清空均先作用于面板草稿。
          - button "保存时间段" [ref=e269] [cursor=pointer]
      - generic [ref=e271]:
        - generic [ref=e272]:
          - button "复制代码" [ref=e273] [cursor=pointer]
          - status
        - code [ref=e276]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"活动时间段\" required> <DatePicker mode=\"range\" showTime size={36} value={value} onValueChange={setValue} timeStep={15} minDurationMinutes={1} durationPresets={[30, 60, 90, 120]} presets={[{ label: \"明天 09:00–10:30\", getValue: now => ({ from: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9), to: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30), }) }]} /> </FormItem>; }"
    - generic [ref=e277]:
      - heading "在筛选区组合使用" [level=2] [ref=e278]
      - paragraph [ref=e279]: 课程与成绩即时改变结果；统计日期按面板确认后的值更新。
      - generic [ref=e281]:
        - generic [ref=e282]:
          - heading "教学数据筛选" [level=3] [ref=e283]
          - paragraph [ref=e284]: 以下为本地课程样例数据。
        - generic [ref=e285]:
          - generic [ref=e286]:
            - generic [ref=e287]: 筛选课程
            - group [ref=e288]:
              - generic [ref=e289]:
                - combobox "筛选课程" [ref=e290]: 人工智能导论
                - generic [ref=e292]:
                  - button "清除筛选课程" [ref=e293] [cursor=pointer]
                  - button "展开选项" [ref=e296] [cursor=pointer]
            - textbox [ref=e299]: ai
          - generic [ref=e300]:
            - generic [ref=e301]: 统计日期
            - generic [ref=e302]:
              - button "统计日期" [ref=e304] [cursor=pointer]:
                - generic [ref=e305]: 2026-10-01 至 2026-10-31
              - generic [ref=e308]: 2026-10-01 至 2026-10-31
              - status [ref=e309]: 2026-10-01 至 2026-10-31
        - generic [ref=e310]:
          - generic [ref=e311]: 成绩范围 60–100 分
          - group "成绩范围 60–100 分" [ref=e312]:
            - generic [ref=e313] [cursor=pointer]:
              - slider "筛选成绩下限" [ref=e317]: "60"
              - slider "筛选成绩上限" [ref=e319]: "100"
        - status [ref=e320]:
          - strong [ref=e321]: "2"
          - generic [ref=e322]: 位学生符合当前筛选
          - paragraph [ref=e323]: 2026-10-01 至 2026-10-31
    - generic [ref=e324]:
      - heading "在对话框和侧栏中编辑" [level=2] [ref=e325]
      - paragraph [ref=e326]: 日期面板先处理自己的关闭，再回到当前编辑任务。
      - generic [ref=e329]:
        - button "对话框设置日期" [ref=e330] [cursor=pointer]
        - button "侧栏设置时间" [ref=e332] [cursor=pointer]
    - group [ref=e334]:
      - generic "来源、复用关系与当前边界" [ref=e335] [cursor=pointer]
  - region [ref=e336]:
    - heading "使用边界" [level=2] [ref=e337]
    - generic [ref=e338]:
      - generic [ref=e339]:
        - heading "适合用在" [level=3] [ref=e340]
        - list [ref=e341]:
          - listitem [ref=e342]: 设置截止日期、开放时间或起止区间。
          - listitem [ref=e343]: 需要检查选择结果后再明确提交。
      - generic [ref=e344]:
        - heading "避免用在" [level=3] [ref=e345]
        - list [ref=e346]:
          - listitem [ref=e347]: 需要自然语言日期解析、复杂时区转换或秒级排班。
          - listitem [ref=e348]: 把面板里每次选择都立即写入业务数据。
  - generic [ref=e349]:
    - region [ref=e350]:
      - heading "API 与结构" [level=2] [ref=e351]
      - table [ref=e353]:
        - caption [ref=e354]: Date Picker 日期与时间 常用接口
        - rowgroup [ref=e355]:
          - row [ref=e356]:
            - columnheader "名称" [ref=e357]
            - columnheader "类型" [ref=e358]
            - columnheader "默认" [ref=e359]
            - columnheader "说明" [ref=e360]
        - rowgroup [ref=e361]:
          - row [ref=e362]:
            - rowheader [ref=e363]:
              - code [ref=e364]: size / appearance / status
            - cell [ref=e365]:
              - code [ref=e366]: 24 | 28 | 32 | 36 / outlined | filled | underlined / default | warning | error
            - cell "—" [ref=e367]
            - cell "沿用 Rain 字段尺寸、外观和状态；FormItem 可以统一传递状态。" [ref=e368]
          - row [ref=e369]:
            - rowheader [ref=e370]:
              - code [ref=e371]: disabled / required
            - cell [ref=e372]:
              - code [ref=e373]: boolean
            - cell "—" [ref=e374]
            - cell "禁用与必填按真实控件语义使用，提供可见标签或可访问名称。" [ref=e375]
          - row [ref=e376]:
            - rowheader [ref=e377]:
              - code [ref=e378]: mode / showTime
            - cell [ref=e379]:
              - code [ref=e380]: single | range / boolean
            - cell "single / false" [ref=e381]
            - cell "单日、日期区间及各自的时分模式；面板内可手输 YYYY-MM-DD 和时分。" [ref=e382]
          - row [ref=e383]:
            - rowheader [ref=e384]:
              - code [ref=e385]: value / onValueChange
            - cell [ref=e386]:
              - code [ref=e387]: Date | DateRange | null / callback
            - cell "—" [ref=e388]
            - cell "公开区间必须完整，仅确定时提交；清空也经过确定。" [ref=e389]
          - row [ref=e390]:
            - rowheader [ref=e391]:
              - code [ref=e392]: minDate / maxDate / disabledDates
            - cell [ref=e393]:
              - code [ref=e394]: Date / Date / Matcher
            - cell "—" [ref=e395]
            - cell "无时间时按日比较，带时间时比较分钟；当前时间限制由宿主更新，保存时精确复核。" [ref=e396]
          - row [ref=e397]:
            - rowheader [ref=e398]:
              - code [ref=e399]: presets / timeStep
            - cell [ref=e400]:
              - code [ref=e401]: DatePickerPreset[] / 5 | 15 | 30
            - cell "—" [ref=e402]
            - cell "快捷值在点击时计算；时间步长只影响建议列表，手输仍精确到分钟。" [ref=e403]
          - row [ref=e404]:
            - rowheader [ref=e405]:
              - code [ref=e406]: durationPresets / minDurationMinutes / maxDurationMinutes
            - cell [ref=e407]:
              - code [ref=e408]: number[] / number / number
            - cell "—" [ref=e409]
            - cell "仅日期时间范围使用；按时长设置结束只执行一次，教学窗口显式设置最短 1 分钟。" [ref=e410]
          - row [ref=e411]:
            - rowheader [ref=e412]:
              - code [ref=e413]: excludeDisabled
            - cell [ref=e414]:
              - code [ref=e415]: boolean
            - cell "true" [ref=e416]
            - cell "默认整段不能跨禁用日期；false 时仍禁止选择禁用端点。" [ref=e417]
    - region [ref=e418]:
      - heading "调用示例" [level=2] [ref=e419]
      - generic [ref=e420]:
        - generic [ref=e421]:
          - button "复制代码" [ref=e422] [cursor=pointer]
          - status
        - code [ref=e425]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"开放时间\" required><DatePicker mode=\"range\" showTime value={value} onValueChange={setValue} size={36} /></FormItem>; }"
      - paragraph [ref=e426]:
        - text: 当前源码：
        - code [ref=e427]: packages/ui/src/date-picker/date-picker.tsx
```

# Test source

```ts
  110 |   await expect(confirm(page)).toBeDisabled(); await expect(hint(page)).toContainText("至少1分钟");
  111 |   await box(page, "结束小时").fill("10"); await box(page, "结束分钟").fill("30");
  112 |   await box(page, "开始小时").fill("11"); await expect(confirm(page)).toBeDisabled();
  113 |   await expect(box(page, "结束小时")).toHaveValue("10"); await expect(hint(page)).toContainText("不能早于");
  114 |   await box(page, "开始小时").fill("09"); await confirm(page).click();
  115 |   await expect(trigger).toHaveText("2026-10-13 09:00 至 2026-10-13 10:30");
  116 |   await expect(page.getByLabel("考试设置摘要", { exact: true })).toContainText("1 小时 30 分钟");
  117 |   // The generic date-only range still accepts a same-day value.
  118 |   const dateTrigger = await open(page, "日期区间");
  119 |   await day(page, 2026, 10, 20).click(); await day(page, 2026, 10, 20).click(); await confirm(page).click();
  120 |   await expect(dateTrigger).toHaveText("2026-10-20 至 2026-10-20");
  121 | });
  122 | 
  123 | test("D08 D09 month-end and year-end midnight repair is explicit and happens once", async ({ page }, info) => {
  124 |   test.skip(!basicProject(info), "Calendar boundaries exercised in Chromium and WebKit.");
  125 |   await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  126 |   await dateTime(page, "开始", "2026-10-31", "23", "00");
  127 |   await dateTime(page, "结束", "2026-10-31", "01", "00"); await expect(confirm(page)).toBeDisabled();
  128 |   await panel(page).getByRole("button", { name: "结束日期改为次日", exact: true }).click();
  129 |   await expect(box(page, "结束日期")).toHaveValue("2026-11-01");
  130 |   await expect(summary(page)).toContainText("次日 01:00 · 时段长度 2小时");
  131 |   await expect(panel(page).getByRole("button", { name: "结束日期改为次日", exact: true })).toHaveCount(0);
  132 |   await confirm(page).click(); await expect(trigger).toHaveText("2026-10-31 23:00 至 2026-11-01 01:00");
  133 |   await open(page, "活动时间段");
  134 |   await dateTime(page, "开始", "2026-12-31", "23", "00"); await dateTime(page, "结束", "2027-01-01", "01", "00");
  135 |   await expect(summary(page)).toContainText("2小时"); await confirm(page).click();
  136 |   await expect(trigger).toHaveText("2026-12-31 23:00 至 2027-01-01 01:00");
  137 | });
  138 | 
  139 | test("D10 D11 presets and custom duration change only the draft and never lock later edits", async ({ page }, info) => {
  140 |   test.skip(!basicProject(info), "Duration behavior exercised in Chromium and WebKit.");
  141 |   await page.goto("/#date-picker"); const trigger = await open(page, "活动时间段");
  142 |   await panel(page).getByRole("button", { name: "同日 90 分钟", exact: true }).click();
  143 |   await expect(trigger).toHaveText("2026-10-13 23:00 至 2026-10-14 01:00");
  144 |   await expect(summary(page)).toContainText("1小时30分钟");
  145 |   await box(page, "自定义时长（分钟）").fill("45"); await panel(page).getByRole("button", { name: "应用时长", exact: true }).click();
  146 |   await expect(box(page, "结束小时")).toHaveValue("09"); await expect(box(page, "结束分钟")).toHaveValue("45");
  147 |   await box(page, "开始分钟").fill("15"); await expect(box(page, "结束分钟")).toHaveValue("45");
  148 |   await expect(summary(page)).toContainText("30分钟");
  149 |   await box(page, "自定义时长（分钟）").fill("0"); await expect(panel(page).getByRole("button", { name: "应用时长", exact: true })).toBeDisabled();
  150 |   await confirm(page).click(); await expect(trigger).toHaveText("2026-10-13 09:15 至 2026-10-13 09:45");
  151 | });
  152 | 
  153 | test("D12 cancel Escape outside and clear do not leak drafts; reopen resets selection intent", async ({ page }, info) => {
  154 |   test.skip(!basicProject(info), "Dismissal behavior exercised in Chromium and WebKit.");
  155 |   await page.goto("/#date-picker"); const trigger = await open(page, "截止时间");
  156 |   await box(page, "日期").fill("2026-12-25"); await panel(page).getByRole("button", { name: "取消", exact: true }).click();
  157 |   await expect(trigger).toHaveText("2026-10-20 18:00"); await expect(trigger).toBeFocused();
  158 |   await open(page, "截止时间"); await box(page, "日期小时").fill("12"); await page.keyboard.press("Escape");
  159 |   await expect(trigger).toHaveText("2026-10-20 18:00");
  160 |   await open(page, "截止时间"); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  161 |   await panel(page).getByRole("button", { name: "取消", exact: true }).click(); await expect(trigger).toHaveText("2026-10-20 18:00");
  162 |   await open(page, "截止时间"); await box(page, "日期").fill("2026-11-10");
  163 |   await page.getByRole("button", { name: "深色", exact: true }).click(); await expect(panel(page)).toHaveCount(0);
  164 |   await expect(trigger).toHaveText("2026-10-20 18:00");
  165 |   const rangeTrigger = await open(page, "活动时间段");
  166 |   await box(page, "结束日期").focus(); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  167 |   await day(page, 2026, 10, 20).click(); await expect(confirm(page)).toBeDisabled();
  168 |   await day(page, 2026, 10, 21).click(); await confirm(page).click();
  169 |   await expect(rangeTrigger).toHaveText("2026-10-20 23:00 至 2026-10-21 01:00");
  170 | });
  171 | 
  172 | test("D13 nested month and time menus own Escape and Enter never saves the host form", async ({ page }, info) => {
  173 |   test.skip(!basicProject(info), "Keyboard layering exercised in Chromium and WebKit.");
  174 |   await page.goto("/#date-picker"); const trigger = await open(page, "作业截止时间");
  175 |   const month = panel(page).getByRole("combobox", { name: "选择月份", exact: true });
  176 |   await month.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  177 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(panel(page)).toBeVisible(); await expect(month).toBeFocused();
  178 |   const suggestions = panel(page).getByRole("combobox", { name: "日期常用时间", exact: true });
  179 |   await suggestions.click(); await expect(page.getByRole("listbox")).toBeVisible(); await page.keyboard.press("Escape");
  180 |   await expect(page.getByRole("listbox")).toHaveCount(0); await expect(suggestions).toBeFocused();
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
> 210 |   await page.getByRole("radio", { name: "定时开放", exact: true }).check();
      |                                                                ^ Error: locator.check: Test timeout of 45000ms exceeded.
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
  281 |   expect(await calendar.evaluate(node => getComputedStyle(node).getPropertyValue("--rdp-animation_duration").trim())).toBe("220ms");
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