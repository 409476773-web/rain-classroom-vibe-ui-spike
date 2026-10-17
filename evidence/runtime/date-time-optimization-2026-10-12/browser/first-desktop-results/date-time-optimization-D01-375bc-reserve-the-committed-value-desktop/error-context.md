# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: date-time-optimization.spec.ts >> D01 D02 D03 strict typed dates and minute precision preserve the committed value
- Location: tests/e2e/date-time-optimization.spec.ts:64:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('dialog', { name: /^选择日期/ })
Expected: visible
Error: strict mode violation: getByRole('dialog', { name: /^选择日期/ }) resolved to 2 elements:
    1) <div id="_r_7_" role="dialog" tabindex="-1" data-closed="" data-side="bottom" data-align="start" data-slot="content" data-month-count="1" data-ending-style="" data-base-ui-focusable="" data-rain-id="ui-popover" aria-labelledby="base-ui-_r_2d_" class="rain-popup box-border min-w-rain-0 rounded-rain-10 border-solid border-rain-line-1 shadow-rain-overlay font-rain-ui text-rain-size-15 leading-rain-22 tracking-rain-default font-rain-regular rain-popover flex flex-col p-rain-12 rain-date-picker__popup">…</div> aka getByRole('dialog', { name: '选择日期与时间' })
    2) <div id="_r_b_" data-open="" role="dialog" tabindex="-1" data-side="bottom" data-align="start" data-slot="content" data-month-count="2" data-base-ui-focusable="" data-rain-id="ui-popover" aria-labelledby="base-ui-_r_31_" class="rain-popup box-border min-w-rain-0 rounded-rain-10 border-solid border-rain-line-1 shadow-rain-overlay font-rain-ui text-rain-size-15 leading-rain-22 tracking-rain-default font-rain-regular rain-popover flex flex-col p-rain-12 rain-date-picker__popup">…</div> aka getByRole('dialog', { name: '选择日期范围与时间' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('dialog', { name: /^选择日期/ })

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
            - button "截止时间" [active] [ref=e40] [cursor=pointer]:
              - generic [ref=e41]: 2028-02-29 23:59
            - generic [ref=e44]: 2028-02-29 23:59
            - status [ref=e45]: 2028-02-29 23:59
    - generic [ref=e46]:
      - heading "日期区间与日期时间区间" [level=2] [ref=e47]
      - paragraph [ref=e48]: 宽屏并排展示连续两个月，窄屏切换单月；日期与时分可以直接编辑。取消、外点或 Escape 放弃草稿。
      - generic [ref=e51]:
        - generic [ref=e52]:
          - generic [ref=e53]:
            - text: 开放时间
            - generic [ref=e54]: "*"
          - generic [ref=e55]:
            - button "开放时间" [expanded] [ref=e58] [cursor=pointer]:
              - generic [ref=e59]: 2026-10-12 09:00 至 2026-10-20 18:00
            - generic [ref=e63]: 2026-10-12 09:00 至 2026-10-20 18:00
            - status [ref=e64]
          - dialog [ref=e67]:
            - generic [ref=e68]:
              - heading "选择日期范围与时间" [level=2] [ref=e69]
              - generic [ref=e70]:
                - generic [ref=e71]:
                  - generic [ref=e72]:
                    - generic [ref=e73]: 开始
                    - textbox "开始日期" [ref=e75]:
                      - /placeholder: YYYY-MM-DD
                      - text: 2026-10-12
                    - group "开始时间" [ref=e76]:
                      - generic [ref=e78]:
                        - textbox "开始小时" [ref=e81]: "09"
                        - generic [ref=e82]:
                          - generic [ref=e83]: ":"
                          - textbox "开始分钟" [ref=e85]: "00"
                        - generic [ref=e86]:
                          - combobox "开始常用时间" [ref=e88] [cursor=pointer]:
                            - generic "09:00" [ref=e90]
                          - generic [ref=e94]: 已选：09:00
                        - textbox [ref=e95]: 09:00
                  - generic [ref=e96]:
                    - generic [ref=e97]: 结束
                    - textbox "结束日期" [ref=e99]:
                      - /placeholder: YYYY-MM-DD
                      - text: 2026-10-20
                    - group "结束时间" [ref=e100]:
                      - generic [ref=e102]:
                        - textbox "结束小时" [ref=e105]: "18"
                        - generic [ref=e106]:
                          - generic [ref=e107]: ":"
                          - textbox "结束分钟" [ref=e109]: "00"
                        - generic [ref=e110]:
                          - combobox "结束常用时间" [ref=e112] [cursor=pointer]:
                            - generic "18:00" [ref=e114]
                          - generic [ref=e118]: 已选：18:00
                        - textbox [ref=e119]: 18:00
                - generic [ref=e122]:
                  - navigation "切换月份":
                    - button "上个月" [ref=e123] [cursor=pointer]
                    - button "下个月" [ref=e126] [cursor=pointer]
                  - generic [ref=e129]:
                    - generic [ref=e131]:
                      - generic [ref=e132]:
                        - combobox "选择年份" [ref=e134] [cursor=pointer]:
                          - generic "2026年" [ref=e136]
                        - generic [ref=e140]: 已选：2026年
                      - textbox [ref=e141]: "2026"
                      - generic [ref=e142]:
                        - combobox "选择月份" [ref=e144] [cursor=pointer]:
                          - generic "10月" [ref=e146]
                        - generic [ref=e150]: 已选：10月
                      - textbox [ref=e151]: "9"
                      - status [ref=e152]: 2026年10月
                    - grid "2026年10月" [ref=e153]:
                      - rowgroup [ref=e154]:
                        - row [ref=e155]:
                          - columnheader [ref=e156]: 一
                          - columnheader [ref=e157]: 二
                          - columnheader [ref=e158]: 三
                          - columnheader [ref=e159]: 四
                          - columnheader [ref=e160]: 五
                          - columnheader [ref=e161]: 六
                          - columnheader [ref=e162]: 日
                      - rowgroup [ref=e163]:
                        - row [ref=e164]:
                          - gridcell [ref=e165]:
                            - button "2026年9月28日" [ref=e166] [cursor=pointer]:
                              - generic [ref=e167]: "28"
                          - gridcell [ref=e168]:
                            - button "2026年9月29日" [ref=e169] [cursor=pointer]:
                              - generic [ref=e170]: "29"
                          - gridcell [ref=e171]:
                            - button "2026年9月30日" [ref=e172] [cursor=pointer]:
                              - generic [ref=e173]: "30"
                          - gridcell [ref=e174]:
                            - button "2026年10月1日" [ref=e175] [cursor=pointer]:
                              - generic [ref=e176]: "1"
                          - gridcell [ref=e177]:
                            - button "2026年10月2日" [ref=e178] [cursor=pointer]:
                              - generic [ref=e179]: "2"
                          - gridcell [ref=e180]:
                            - button "2026年10月3日" [ref=e181] [cursor=pointer]:
                              - generic [ref=e182]: "3"
                          - gridcell [ref=e183]:
                            - button "2026年10月4日" [ref=e184] [cursor=pointer]:
                              - generic [ref=e185]: "4"
                        - row [ref=e186]:
                          - gridcell [ref=e187]:
                            - button "2026年10月5日" [ref=e188] [cursor=pointer]:
                              - generic [ref=e189]: "5"
                          - gridcell [ref=e190]:
                            - button "2026年10月6日" [ref=e191] [cursor=pointer]:
                              - generic [ref=e192]: "6"
                          - gridcell [ref=e193]:
                            - button "2026年10月7日" [ref=e194] [cursor=pointer]:
                              - generic [ref=e195]: "7"
                          - gridcell [ref=e196]:
                            - button "2026年10月8日" [ref=e197] [cursor=pointer]:
                              - generic [ref=e198]: "8"
                          - gridcell [ref=e199]:
                            - button "2026年10月9日" [ref=e200] [cursor=pointer]:
                              - generic [ref=e201]: "9"
                          - gridcell [ref=e202]:
                            - button "2026年10月10日" [ref=e203] [cursor=pointer]:
                              - generic [ref=e204]: "10"
                          - gridcell [ref=e205]:
                            - button "2026年10月11日" [ref=e206] [cursor=pointer]:
                              - generic [ref=e207]: "11"
                        - row [ref=e208]:
                          - gridcell [selected] [ref=e209]:
                            - button "2026年10月12日，今天，已选中" [ref=e210] [cursor=pointer]:
                              - generic [ref=e211]: "12"
                          - gridcell [selected] [ref=e212]:
                            - button "2026年10月13日，已选中" [ref=e213] [cursor=pointer]:
                              - generic [ref=e214]: "13"
                          - gridcell [selected] [ref=e215]:
                            - button "2026年10月14日，已选中" [ref=e216] [cursor=pointer]:
                              - generic [ref=e217]: "14"
                          - gridcell [selected] [ref=e218]:
                            - button "2026年10月15日，已选中" [ref=e219] [cursor=pointer]:
                              - generic [ref=e220]: "15"
                          - gridcell [selected] [ref=e221]:
                            - button "2026年10月16日，已选中" [ref=e222] [cursor=pointer]:
                              - generic [ref=e223]: "16"
                          - gridcell [selected] [ref=e224]:
                            - button "2026年10月17日，已选中" [ref=e225] [cursor=pointer]:
                              - generic [ref=e226]: "17"
                          - gridcell [selected] [ref=e227]:
                            - button "2026年10月18日，已选中" [ref=e228] [cursor=pointer]:
                              - generic [ref=e229]: "18"
                        - row [ref=e230]:
                          - gridcell [selected] [ref=e231]:
                            - button "2026年10月19日，已选中" [ref=e232] [cursor=pointer]:
                              - generic [ref=e233]: "19"
                          - gridcell [selected] [ref=e234]:
                            - button "2026年10月20日，已选中" [ref=e235] [cursor=pointer]:
                              - generic [ref=e236]: "20"
                          - gridcell [ref=e237]:
                            - button "2026年10月21日" [ref=e238] [cursor=pointer]:
                              - generic [ref=e239]: "21"
                          - gridcell [ref=e240]:
                            - button "2026年10月22日" [ref=e241] [cursor=pointer]:
                              - generic [ref=e242]: "22"
                          - gridcell [ref=e243]:
                            - button "2026年10月23日" [ref=e244] [cursor=pointer]:
                              - generic [ref=e245]: "23"
                          - gridcell [ref=e246]:
                            - button "2026年10月24日" [ref=e247] [cursor=pointer]:
                              - generic [ref=e248]: "24"
                          - gridcell [ref=e249]:
                            - button "2026年10月25日" [ref=e250] [cursor=pointer]:
                              - generic [ref=e251]: "25"
                        - row [ref=e252]:
                          - gridcell [ref=e253]:
                            - button "2026年10月26日" [ref=e254] [cursor=pointer]:
                              - generic [ref=e255]: "26"
                          - gridcell [ref=e256]:
                            - button "2026年10月27日" [ref=e257] [cursor=pointer]:
                              - generic [ref=e258]: "27"
                          - gridcell [ref=e259]:
                            - button "2026年10月28日" [ref=e260] [cursor=pointer]:
                              - generic [ref=e261]: "28"
                          - gridcell [ref=e262]:
                            - button "2026年10月29日" [ref=e263] [cursor=pointer]:
                              - generic [ref=e264]: "29"
                          - gridcell [ref=e265]:
                            - button "2026年10月30日" [ref=e266] [cursor=pointer]:
                              - generic [ref=e267]: "30"
                          - gridcell [ref=e268]:
                            - button "2026年10月31日" [ref=e269] [cursor=pointer]:
                              - generic [ref=e270]: "31"
                          - gridcell [ref=e271]:
                            - button "2026年11月1日" [ref=e272] [cursor=pointer]:
                              - generic [ref=e273]: "1"
                        - row [ref=e274]:
                          - gridcell [ref=e275]:
                            - button "2026年11月2日" [ref=e276] [cursor=pointer]:
                              - generic [ref=e277]: "2"
                          - gridcell [ref=e278]:
                            - button "2026年11月3日" [ref=e279] [cursor=pointer]:
                              - generic [ref=e280]: "3"
                          - gridcell [ref=e281]:
                            - button "2026年11月4日" [ref=e282] [cursor=pointer]:
                              - generic [ref=e283]: "4"
                          - gridcell [ref=e284]:
                            - button "2026年11月5日" [ref=e285] [cursor=pointer]:
                              - generic [ref=e286]: "5"
                          - gridcell [ref=e287]:
                            - button "2026年11月6日" [ref=e288] [cursor=pointer]:
                              - generic [ref=e289]: "6"
                          - gridcell [ref=e290]:
                            - button "2026年11月7日" [ref=e291] [cursor=pointer]:
                              - generic [ref=e292]: "7"
                          - gridcell [ref=e293]:
                            - button "2026年11月8日" [ref=e294] [cursor=pointer]:
                              - generic [ref=e295]: "8"
                  - generic [ref=e296]:
                    - generic [ref=e298]:
                      - generic [ref=e299]:
                        - combobox "选择年份" [ref=e301] [cursor=pointer]:
                          - generic "2026年" [ref=e303]
                        - generic [ref=e307]: 已选：2026年
                      - textbox [ref=e308]: "2026"
                      - generic [ref=e309]:
                        - combobox "选择月份" [ref=e311] [cursor=pointer]:
                          - generic "11月" [ref=e313]
                        - generic [ref=e317]: 已选：11月
                      - textbox [ref=e318]: "10"
                      - status [ref=e319]: 2026年11月
                    - grid "2026年11月" [ref=e320]:
                      - rowgroup [ref=e321]:
                        - row [ref=e322]:
                          - columnheader [ref=e323]: 一
                          - columnheader [ref=e324]: 二
                          - columnheader [ref=e325]: 三
                          - columnheader [ref=e326]: 四
                          - columnheader [ref=e327]: 五
                          - columnheader [ref=e328]: 六
                          - columnheader [ref=e329]: 日
                      - rowgroup [ref=e330]:
                        - row [ref=e331]:
                          - gridcell [ref=e332]:
                            - button "2026年10月26日" [ref=e333] [cursor=pointer]:
                              - generic [ref=e334]: "26"
                          - gridcell [ref=e335]:
                            - button "2026年10月27日" [ref=e336] [cursor=pointer]:
                              - generic [ref=e337]: "27"
                          - gridcell [ref=e338]:
                            - button "2026年10月28日" [ref=e339] [cursor=pointer]:
                              - generic [ref=e340]: "28"
                          - gridcell [ref=e341]:
                            - button "2026年10月29日" [ref=e342] [cursor=pointer]:
                              - generic [ref=e343]: "29"
                          - gridcell [ref=e344]:
                            - button "2026年10月30日" [ref=e345] [cursor=pointer]:
                              - generic [ref=e346]: "30"
                          - gridcell [ref=e347]:
                            - button "2026年10月31日" [ref=e348] [cursor=pointer]:
                              - generic [ref=e349]: "31"
                          - gridcell [ref=e350]:
                            - button "2026年11月1日" [ref=e351] [cursor=pointer]:
                              - generic [ref=e352]: "1"
                        - row [ref=e353]:
                          - gridcell [ref=e354]:
                            - button "2026年11月2日" [ref=e355] [cursor=pointer]:
                              - generic [ref=e356]: "2"
                          - gridcell [ref=e357]:
                            - button "2026年11月3日" [ref=e358] [cursor=pointer]:
                              - generic [ref=e359]: "3"
                          - gridcell [ref=e360]:
                            - button "2026年11月4日" [ref=e361] [cursor=pointer]:
                              - generic [ref=e362]: "4"
                          - gridcell [ref=e363]:
                            - button "2026年11月5日" [ref=e364] [cursor=pointer]:
                              - generic [ref=e365]: "5"
                          - gridcell [ref=e366]:
                            - button "2026年11月6日" [ref=e367] [cursor=pointer]:
                              - generic [ref=e368]: "6"
                          - gridcell [ref=e369]:
                            - button "2026年11月7日" [ref=e370] [cursor=pointer]:
                              - generic [ref=e371]: "7"
                          - gridcell [ref=e372]:
                            - button "2026年11月8日" [ref=e373] [cursor=pointer]:
                              - generic [ref=e374]: "8"
                        - row [ref=e375]:
                          - gridcell [ref=e376]:
                            - button "2026年11月9日" [ref=e377] [cursor=pointer]:
                              - generic [ref=e378]: "9"
                          - gridcell [ref=e379]:
                            - button "2026年11月10日" [ref=e380] [cursor=pointer]:
                              - generic [ref=e381]: "10"
                          - gridcell [ref=e382]:
                            - button "2026年11月11日" [ref=e383] [cursor=pointer]:
                              - generic [ref=e384]: "11"
                          - gridcell [ref=e385]:
                            - button "2026年11月12日" [ref=e386] [cursor=pointer]:
                              - generic [ref=e387]: "12"
                          - gridcell [ref=e388]:
                            - button "2026年11月13日" [ref=e389] [cursor=pointer]:
                              - generic [ref=e390]: "13"
                          - gridcell [ref=e391]:
                            - button "2026年11月14日" [ref=e392] [cursor=pointer]:
                              - generic [ref=e393]: "14"
                          - gridcell [ref=e394]:
                            - button "2026年11月15日" [ref=e395] [cursor=pointer]:
                              - generic [ref=e396]: "15"
                        - row [ref=e397]:
                          - gridcell [ref=e398]:
                            - button "2026年11月16日" [ref=e399] [cursor=pointer]:
                              - generic [ref=e400]: "16"
                          - gridcell [ref=e401]:
                            - button "2026年11月17日" [ref=e402] [cursor=pointer]:
                              - generic [ref=e403]: "17"
                          - gridcell [ref=e404]:
                            - button "2026年11月18日" [ref=e405] [cursor=pointer]:
                              - generic [ref=e406]: "18"
                          - gridcell [ref=e407]:
                            - button "2026年11月19日" [ref=e408] [cursor=pointer]:
                              - generic [ref=e409]: "19"
                          - gridcell [ref=e410]:
                            - button "2026年11月20日" [ref=e411] [cursor=pointer]:
                              - generic [ref=e412]: "20"
                          - gridcell [ref=e413]:
                            - button "2026年11月21日" [ref=e414] [cursor=pointer]:
                              - generic [ref=e415]: "21"
                          - gridcell [ref=e416]:
                            - button "2026年11月22日" [ref=e417] [cursor=pointer]:
                              - generic [ref=e418]: "22"
                        - row [ref=e419]:
                          - gridcell [ref=e420]:
                            - button "2026年11月23日" [ref=e421] [cursor=pointer]:
                              - generic [ref=e422]: "23"
                          - gridcell [ref=e423]:
                            - button "2026年11月24日" [ref=e424] [cursor=pointer]:
                              - generic [ref=e425]: "24"
                          - gridcell [ref=e426]:
                            - button "2026年11月25日" [ref=e427] [cursor=pointer]:
                              - generic [ref=e428]: "25"
                          - gridcell [ref=e429]:
                            - button "2026年11月26日" [ref=e430] [cursor=pointer]:
                              - generic [ref=e431]: "26"
                          - gridcell [ref=e432]:
                            - button "2026年11月27日" [ref=e433] [cursor=pointer]:
                              - generic [ref=e434]: "27"
                          - gridcell [ref=e435]:
                            - button "2026年11月28日" [ref=e436] [cursor=pointer]:
                              - generic [ref=e437]: "28"
                          - gridcell [ref=e438]:
                            - button "2026年11月29日" [ref=e439] [cursor=pointer]:
                              - generic [ref=e440]: "29"
                        - row [ref=e441]:
                          - gridcell [ref=e442]:
                            - button "2026年11月30日" [ref=e443] [cursor=pointer]:
                              - generic [ref=e444]: "30"
                          - gridcell [ref=e445]:
                            - button "2026年12月1日" [ref=e446] [cursor=pointer]:
                              - generic [ref=e447]: "1"
                          - gridcell [ref=e448]:
                            - button "2026年12月2日" [ref=e449] [cursor=pointer]:
                              - generic [ref=e450]: "2"
                          - gridcell [ref=e451]:
                            - button "2026年12月3日" [ref=e452] [cursor=pointer]:
                              - generic [ref=e453]: "3"
                          - gridcell [ref=e454]:
                            - button "2026年12月4日" [ref=e455] [cursor=pointer]:
                              - generic [ref=e456]: "4"
                          - gridcell [ref=e457]:
                            - button "2026年12月5日" [ref=e458] [cursor=pointer]:
                              - generic [ref=e459]: "5"
                          - gridcell [ref=e460]:
                            - button "2026年12月6日" [ref=e461] [cursor=pointer]:
                              - generic [ref=e462]: "6"
                - generic [ref=e463]: 2026-10-12 09:00 至 2026-10-20 18:00 · 时段长度 201 小时
              - generic [ref=e465]:
                - button "清空" [ref=e466] [cursor=pointer]
                - button "取消" [ref=e468] [cursor=pointer]
                - button "确定" [ref=e470] [cursor=pointer]
        - generic [ref=e474]:
          - generic [ref=e475]: 日期区间
          - generic [ref=e476]:
            - button "日期区间" [ref=e478] [cursor=pointer]:
              - generic [ref=e479]: 请选择日期范围
            - generic [ref=e482]: 尚未选择日期
            - status [ref=e483]
    - generic [ref=e485]:
      - heading "作业：开放与截止" [level=2] [ref=e486]
      - paragraph [ref=e487]: 立即开放只保存开放意图；定时开放与截止分别编辑，外层保存时再次检查时间关系。
      - form "作业发布设置" [ref=e489]:
        - generic [ref=e490]:
          - heading "作业发布设置" [level=3] [ref=e491]
          - paragraph [ref=e492]: 本地样板 · 人工智能导论 · 第五讲
        - generic [ref=e493]:
          - generic [ref=e494]:
            - generic [ref=e495]:
              - text: 作业名称
              - generic [ref=e496]: "*"
            - textbox "作业名称" [ref=e498]: 第五讲案例分析
          - generic [ref=e500]:
            - generic [ref=e501]: 作业类型
            - combobox "作业类型" [ref=e503] [cursor=pointer]:
              - option "案例报告" [selected]
              - option "课堂练习"
              - option "讨论任务"
          - generic [ref=e504]:
            - generic [ref=e505]:
              - text: 所属课程
              - generic [ref=e506]: "*"
            - group [ref=e507]:
              - generic [ref=e508]:
                - combobox "所属课程" [ref=e509]: 人工智能导论
                - generic [ref=e511]:
                  - button "清除所属课程" [ref=e512] [cursor=pointer]
                  - button "展开选项" [ref=e515] [cursor=pointer]
            - textbox [ref=e518]: ai
          - generic [ref=e519]:
            - generic [ref=e520]:
              - text: 满分
              - generic [ref=e521]: "*"
            - generic [ref=e522]:
              - generic [ref=e523]:
                - button "减少满分" [ref=e524] [cursor=pointer]
                - generic [ref=e526]:
                  - spinbutton "满分" [ref=e527]: "100"
                  - generic [ref=e528]: 分
                - button "增加满分" [ref=e529] [cursor=pointer]
              - generic [ref=e531]: 单位：分
        - generic [ref=e532]:
          - generic [ref=e533]: 作业说明
          - generic [ref=e534]:
            - textbox "作业说明" [ref=e535]: 结合课堂案例，说明你的判断及支持它的证据。
            - generic [ref=e536]: 21 / 500
          - generic [ref=e538]: 说明学习目标、提交内容和判断依据。
        - radiogroup "开放方式" [ref=e539]:
          - generic [ref=e541]:
            - generic [ref=e542] [cursor=pointer]:
              - radio "立即开放" [checked] [ref=e543]
              - generic [ref=e547]: 立即开放
            - generic [ref=e549] [cursor=pointer]:
              - radio "定时开放" [ref=e550]
              - generic [ref=e553]: 定时开放
        - generic [ref=e556]:
          - generic [ref=e557]:
            - text: 作业截止时间
            - generic [ref=e558]: "*"
          - generic [ref=e559]:
            - button "作业截止时间" [ref=e561] [cursor=pointer]:
              - generic [ref=e562]: 2026-10-13 23:59
            - generic [ref=e565]: 2026-10-13 23:59
            - status [ref=e566]: 2026-10-13 23:59
          - generic [ref=e567]: 23:59 是明确时刻；到达该时间后停止提交。
        - generic "作业设置摘要" [ref=e568]:
          - generic [ref=e569]:
            - term [ref=e570]: 开放方式
            - definition [ref=e571]: 保存后立即开放
          - generic [ref=e572]:
            - term [ref=e573]: 截止时间
            - definition [ref=e574]: 2026-10-13 23:59
          - generic [ref=e575]:
            - term [ref=e576]: 时间基准
            - definition [ref=e577]: 本机时间（Asia/Shanghai · 北京时间）
        - generic [ref=e578]:
          - status "作业保存结果" [ref=e579]: 面板确定后更新草稿，保存后更新本地作业设置。
          - button "保存设置" [ref=e580] [cursor=pointer]
    - generic [ref=e583]:
      - heading "考试：开放窗口与答题时长" [level=2] [ref=e584]
      - paragraph [ref=e585]: 窗口决定何时可以作答，答题时长单独设置。下方入场模拟使用明确的本地关闭策略。
      - form "考试开放设置" [ref=e587]:
        - generic [ref=e588]:
          - heading "考试开放与答题时长" [level=3] [ref=e589]
          - paragraph [ref=e590]: 本地样板 · 开放窗口与每位学生的答题时长分别设置。
        - generic [ref=e591]:
          - generic [ref=e592]:
            - text: 考试开放窗口
            - generic [ref=e593]: "*"
          - generic [ref=e594]:
            - button "考试开放窗口" [ref=e596] [cursor=pointer]:
              - generic [ref=e597]: 2026-10-13 09:00 至 2026-10-13 11:00
            - generic [ref=e600]: 2026-10-13 09:00 至 2026-10-13 11:00
            - status [ref=e601]: 2026-10-13 09:00 至 2026-10-13 11:00
        - generic [ref=e602]:
          - generic [ref=e603]:
            - generic [ref=e604]:
              - text: 答题时长
              - generic [ref=e605]: "*"
            - generic [ref=e606]:
              - generic [ref=e607]:
                - button "减少答题时长" [ref=e608] [cursor=pointer]
                - generic [ref=e610]:
                  - spinbutton "答题时长" [ref=e611]: "60"
                  - generic [ref=e612]: 分钟
                - button "增加答题时长" [ref=e613] [cursor=pointer]
              - generic [ref=e615]: 单位：分钟
            - generic [ref=e616]: 每位学生开始作答后计时。
          - generic [ref=e617]:
            - strong [ref=e618]: 关闭规则
            - paragraph [ref=e619]: 本地演示策略：到达关闭时间统一结束。
        - generic "考试设置摘要" [ref=e620]:
          - generic [ref=e621]:
            - term [ref=e622]: 开放窗口
            - definition [ref=e623]: 2026-10-13 09:00 → 11:00
          - generic [ref=e624]:
            - term [ref=e625]: 窗口长度
            - definition [ref=e626]: 2 小时
          - generic [ref=e627]:
            - term [ref=e628]: 时间基准
            - definition [ref=e629]: 本机时间（Asia/Shanghai · 北京时间）
        - generic [ref=e630]:
          - generic [ref=e631]:
            - generic [ref=e632]: 模拟入场时间
            - generic [ref=e633]:
              - button "模拟入场时间" [ref=e635] [cursor=pointer]:
                - generic [ref=e636]: 2026-10-13 10:30
              - generic [ref=e639]: 2026-10-13 10:30
              - status [ref=e640]: 2026-10-13 10:30
            - generic [ref=e641]: 可选择开放前、窗口中或关闭时，查看能否开始以及实际可用时长。
          - paragraph [ref=e642]: 可答题 30 分钟；最晚于 2026-10-13 11:00 结束。
        - generic [ref=e643]:
          - status "考试保存结果" [ref=e644]: 面板确定后更新草稿，保存后更新本地考试设置。
          - button "保存考试设置" [ref=e645] [cursor=pointer]
    - generic [ref=e648]:
      - heading "时间段：同日、跨午夜与跨月" [level=2] [ref=e649]
      - paragraph [ref=e650]: 先看完整起止结果再保存；常用场景和按时长操作都保持为待确认草稿。
      - form "时间段设置" [ref=e652]:
        - generic [ref=e653]:
          - heading "同日与跨日时间段" [level=3] [ref=e654]
          - paragraph [ref=e655]: 本地活动样板 · 可直接修改任一端，或在面板内选择常用场景。
        - generic [ref=e656]:
          - generic [ref=e657]:
            - text: 活动时间段
            - generic [ref=e658]: "*"
          - generic [ref=e659]:
            - button "活动时间段" [ref=e661] [cursor=pointer]:
              - generic [ref=e662]: 2026-10-13 23:00 至 2026-10-14 01:00
            - generic [ref=e665]: 2026-10-13 23:00 至 2026-10-14 01:00
            - status [ref=e666]: 2026-10-13 23:00 至 2026-10-14 01:00
        - generic "时间段摘要" [ref=e667]:
          - generic [ref=e668]:
            - term [ref=e669]: 起止时间
            - definition [ref=e670]: 2026-10-13 23:00 → 2026-10-14 01:00（次日）
          - generic [ref=e671]:
            - term [ref=e672]: 时段长度
            - definition [ref=e673]: 2 小时
          - generic [ref=e674]:
            - term [ref=e675]: 时间基准
            - definition [ref=e676]: 本机时间（Asia/Shanghai · 北京时间）
        - paragraph [ref=e677]: 修改开始不会自动移动结束；需要保持时长时，在面板中重新选择“按时长设置结束”。
        - generic [ref=e678]:
          - status "时间段保存结果" [ref=e679]: 选择、取消和清空均先作用于面板草稿。
          - button "保存时间段" [ref=e680] [cursor=pointer]
      - generic [ref=e682]:
        - generic [ref=e683]:
          - button "复制代码" [ref=e684] [cursor=pointer]
          - status
        - code [ref=e687]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"活动时间段\" required> <DatePicker mode=\"range\" showTime size={36} value={value} onValueChange={setValue} timeStep={15} minDurationMinutes={1} durationPresets={[30, 60, 90, 120]} presets={[{ label: \"明天 09:00–10:30\", getValue: now => ({ from: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9), to: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30), }) }]} /> </FormItem>; }"
    - generic [ref=e688]:
      - heading "在筛选区组合使用" [level=2] [ref=e689]
      - paragraph [ref=e690]: 课程与成绩即时改变结果；统计日期按面板确认后的值更新。
      - generic [ref=e692]:
        - generic [ref=e693]:
          - heading "教学数据筛选" [level=3] [ref=e694]
          - paragraph [ref=e695]: 以下为本地课程样例数据。
        - generic [ref=e696]:
          - generic [ref=e697]:
            - generic [ref=e698]: 筛选课程
            - group [ref=e699]:
              - generic [ref=e700]:
                - combobox "筛选课程" [ref=e701]: 人工智能导论
                - generic [ref=e703]:
                  - button "清除筛选课程" [ref=e704] [cursor=pointer]
                  - button "展开选项" [ref=e707] [cursor=pointer]
            - textbox [ref=e710]: ai
          - generic [ref=e711]:
            - generic [ref=e712]: 统计日期
            - generic [ref=e713]:
              - button "统计日期" [ref=e715] [cursor=pointer]:
                - generic [ref=e716]: 2026-10-01 至 2026-10-31
              - generic [ref=e719]: 2026-10-01 至 2026-10-31
              - status [ref=e720]: 2026-10-01 至 2026-10-31
        - generic [ref=e721]:
          - generic [ref=e722]: 成绩范围 60–100 分
          - group "成绩范围 60–100 分" [ref=e723]:
            - generic [ref=e724] [cursor=pointer]:
              - slider "筛选成绩下限" [ref=e728]: "60"
              - slider "筛选成绩上限" [ref=e730]: "100"
        - status [ref=e731]:
          - strong [ref=e732]: "2"
          - generic [ref=e733]: 位学生符合当前筛选
          - paragraph [ref=e734]: 2026-10-01 至 2026-10-31
    - generic [ref=e735]:
      - heading "在对话框和侧栏中编辑" [level=2] [ref=e736]
      - paragraph [ref=e737]: 日期面板先处理自己的关闭，再回到当前编辑任务。
      - generic [ref=e740]:
        - button "对话框设置日期" [ref=e741] [cursor=pointer]
        - button "侧栏设置时间" [ref=e743] [cursor=pointer]
    - group [ref=e745]:
      - generic "来源、复用关系与当前边界" [ref=e746] [cursor=pointer]
  - region [ref=e747]:
    - heading "使用边界" [level=2] [ref=e748]
    - generic [ref=e749]:
      - generic [ref=e750]:
        - heading "适合用在" [level=3] [ref=e751]
        - list [ref=e752]:
          - listitem [ref=e753]: 设置截止日期、开放时间或起止区间。
          - listitem [ref=e754]: 需要检查选择结果后再明确提交。
      - generic [ref=e755]:
        - heading "避免用在" [level=3] [ref=e756]
        - list [ref=e757]:
          - listitem [ref=e758]: 需要自然语言日期解析、复杂时区转换或秒级排班。
          - listitem [ref=e759]: 把面板里每次选择都立即写入业务数据。
  - generic [ref=e760]:
    - region [ref=e761]:
      - heading "API 与结构" [level=2] [ref=e762]
      - table [ref=e764]:
        - caption [ref=e765]: Date Picker 日期与时间 常用接口
        - rowgroup [ref=e766]:
          - row [ref=e767]:
            - columnheader "名称" [ref=e768]
            - columnheader "类型" [ref=e769]
            - columnheader "默认" [ref=e770]
            - columnheader "说明" [ref=e771]
        - rowgroup [ref=e772]:
          - row [ref=e773]:
            - rowheader [ref=e774]:
              - code [ref=e775]: size / appearance / status
            - cell [ref=e776]:
              - code [ref=e777]: 24 | 28 | 32 | 36 / outlined | filled | underlined / default | warning | error
            - cell "—" [ref=e778]
            - cell "沿用 Rain 字段尺寸、外观和状态；FormItem 可以统一传递状态。" [ref=e779]
          - row [ref=e780]:
            - rowheader [ref=e781]:
              - code [ref=e782]: disabled / required
            - cell [ref=e783]:
              - code [ref=e784]: boolean
            - cell "—" [ref=e785]
            - cell "禁用与必填按真实控件语义使用，提供可见标签或可访问名称。" [ref=e786]
          - row [ref=e787]:
            - rowheader [ref=e788]:
              - code [ref=e789]: mode / showTime
            - cell [ref=e790]:
              - code [ref=e791]: single | range / boolean
            - cell "single / false" [ref=e792]
            - cell "单日、日期区间及各自的时分模式；面板内可手输 YYYY-MM-DD 和时分。" [ref=e793]
          - row [ref=e794]:
            - rowheader [ref=e795]:
              - code [ref=e796]: value / onValueChange
            - cell [ref=e797]:
              - code [ref=e798]: Date | DateRange | null / callback
            - cell "—" [ref=e799]
            - cell "公开区间必须完整，仅确定时提交；清空也经过确定。" [ref=e800]
          - row [ref=e801]:
            - rowheader [ref=e802]:
              - code [ref=e803]: minDate / maxDate / disabledDates
            - cell [ref=e804]:
              - code [ref=e805]: Date / Date / Matcher
            - cell "—" [ref=e806]
            - cell "无时间时按日比较，带时间时比较分钟；当前时间限制由宿主更新，保存时精确复核。" [ref=e807]
          - row [ref=e808]:
            - rowheader [ref=e809]:
              - code [ref=e810]: presets / timeStep
            - cell [ref=e811]:
              - code [ref=e812]: DatePickerPreset[] / 5 | 15 | 30
            - cell "—" [ref=e813]
            - cell "快捷值在点击时计算；时间步长只影响建议列表，手输仍精确到分钟。" [ref=e814]
          - row [ref=e815]:
            - rowheader [ref=e816]:
              - code [ref=e817]: durationPresets / minDurationMinutes / maxDurationMinutes
            - cell [ref=e818]:
              - code [ref=e819]: number[] / number / number
            - cell "—" [ref=e820]
            - cell "仅日期时间范围使用；按时长设置结束只执行一次，教学窗口显式设置最短 1 分钟。" [ref=e821]
          - row [ref=e822]:
            - rowheader [ref=e823]:
              - code [ref=e824]: excludeDisabled
            - cell [ref=e825]:
              - code [ref=e826]: boolean
            - cell "true" [ref=e827]
            - cell "默认整段不能跨禁用日期；false 时仍禁止选择禁用端点。" [ref=e828]
    - region [ref=e829]:
      - heading "调用示例" [level=2] [ref=e830]
      - generic [ref=e831]:
        - generic [ref=e832]:
          - button "复制代码" [ref=e833] [cursor=pointer]
          - status
        - code [ref=e836]: "import { useState } from \"react\"; import { DatePicker, FormItem, type DateRange } from \"@rain-next/ui\"; export function Example() { const [value, setValue] = useState<DateRange | null>(null); return <FormItem label=\"开放时间\" required><DatePicker mode=\"range\" showTime value={value} onValueChange={setValue} size={36} /></FormItem>; }"
      - paragraph [ref=e837]:
        - text: 当前源码：
        - code [ref=e838]: packages/ui/src/date-picker/date-picker.tsx
```

# Test source

```ts
  1   | import { expect, test, type Locator, type Page, type TestInfo } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { fileURLToPath } from "node:url";
  4   | 
  5   | const evidence = fileURLToPath(new URL("../../evidence/runtime/date-time-optimization-2026-10-12/browser/", import.meta.url));
  6   | mkdirSync(evidence, { recursive: true });
  7   | const fixedNow = new Date("2026-10-12T10:00:30+08:00");
  8   | const consoleErrors = new Map<string, string[]>();
  9   | const panel = (page: Page) => page.getByRole("dialog", { name: /^选择日期/ });
  10  | const confirm = (page: Page) => panel(page).getByRole("button", { name: "确定", exact: true });
  11  | const box = (page: Page, label: string) => panel(page).getByRole("textbox", { name: label, exact: true });
  12  | const summary = (page: Page) => panel(page).locator('[data-slot="summary"]');
  13  | const hint = (page: Page) => panel(page).getByRole("status", { name: "日期选择提示" });
  14  | const basicProject = (info: TestInfo) => ["desktop", "webkit"].includes(info.project.name);
  15  | const day = (page: Page, year: number, month: number, date: number) => panel(page).getByRole("button", { name: new RegExp(`^${year}年${month}月${date}日`) }).first();
  16  | async function open(page: Page, label: string) {
  17  |   const trigger = page.getByRole("button", { name: label, exact: true });
> 18  |   await trigger.click(); await expect(panel(page)).toBeVisible(); return trigger;
      |                                                    ^ Error: expect(locator).toBeVisible() failed
  19  | }
  20  | async function dateTime(page: Page, endpoint: "开始" | "结束" | "日期", date: string, hour: string, minute: string) {
  21  |   await box(page, endpoint === "日期" ? "日期" : `${endpoint}日期`).fill(date);
  22  |   await box(page, `${endpoint}小时`).fill(hour); await box(page, `${endpoint}分钟`).fill(minute);
  23  |   await box(page, `${endpoint}分钟`).press("Tab");
  24  | }
  25  | async function screenshot(locator: Locator, info: TestInfo, name: string) {
  26  |   await locator.screenshot({ path: `${evidence}/${name}-${info.project.name}.png` });
  27  | }
  28  | async function hasNoDuplicateIds(page: Page) {
  29  |   expect(await page.evaluate(() => {
  30  |     const ids = [...document.querySelectorAll("[id]")].map(node => node.id);
  31  |     return ids.filter((id, index) => ids.indexOf(id) !== index);
  32  |   })).toEqual([]);
  33  | }
  34  | 
  35  | test.beforeEach(async ({ page }, info) => {
  36  |   const messages: string[] = []; consoleErrors.set(info.testId, messages);
  37  |   page.on("pageerror", error => messages.push(error.message));
  38  |   page.on("console", message => { if (message.type() === "error") messages.push(message.text()); });
  39  |   // Freeze Date only. Normal browser timers continue to run for Base UI and animations.
  40  |   await page.clock.setFixedTime(fixedNow);
  41  | });
  42  | test.afterEach(async ({}, info) => {
  43  |   const messages = consoleErrors.get(info.testId) ?? [];
  44  |   writeFileSync(`${evidence}/console-${info.project.name}-${info.line}.json`, JSON.stringify(messages, null, 2));
  45  |   expect(messages, "uncaught browser errors").toEqual([]);
  46  | });
  47  | 
  48  | test("D18 D20 all three task samples save locally with complete dates and timezone", async ({ page }, info) => {
  49  |   await page.goto("/#date-picker");
  50  |   for (const [id, button, status, label, text] of [
  51  |     ["date-time-homework", "保存设置", "作业保存结果", "作业设置摘要", "截止 2026-10-13 23:59"],
  52  |     ["date-time-exam", "保存考试设置", "考试保存结果", "考试设置摘要", "答题时长 60 分钟"],
  53  |     ["date-time-cross-day", "保存时间段", "时间段保存结果", "时间段摘要", "2026-10-14 01:00"],
  54  |   ]) {
  55  |     const section = page.getByTestId(id!);
  56  |     await section.getByRole("button", { name: button!, exact: true }).click();
  57  |     await expect(section.getByRole("status", { name: status! })).toContainText(text!);
  58  |     await expect(section.getByLabel(label!, { exact: true })).toContainText("Asia/Shanghai · 北京时间");
  59  |     await screenshot(section, info, id!);
  60  |   }
  61  |   await hasNoDuplicateIds(page);
  62  | });
  63  | 
  64  | test("D01 D02 D03 strict typed dates and minute precision preserve the committed value", async ({ page }, info) => {
  65  |   test.skip(!basicProject(info), "Input semantics exercised in Chromium and WebKit.");
  66  |   await page.goto("/#date-picker"); const trigger = await open(page, "截止时间");
  67  |   const date = box(page, "日期");
  68  |   await date.fill("2026-02-30"); await date.press("Tab");
  69  |   await expect(confirm(page)).toBeDisabled(); await expect(date).toHaveValue("2026-02-30");
  70  |   await expect(hint(page)).toContainText("日期无效");
  71  |   await date.fill("2028-02-29"); await expect(panel(page).getByRole("combobox", { name: "选择月份" })).toHaveText(/2月/);
  72  |   await panel(page).getByRole("button", { name: "下个月", exact: true }).click();
  73  |   await box(page, "日期小时").fill("9"); await box(page, "日期分钟").fill("5"); await box(page, "日期分钟").press("Tab");
  74  |   await expect(panel(page).getByRole("combobox", { name: "选择月份" })).toHaveText(/3月/);
  75  |   await expect(summary(page)).toHaveText("2028-02-29 09:05");
  76  |   await box(page, "日期小时").fill("25"); await expect(confirm(page)).toBeDisabled();
  77  |   await box(page, "日期小时").fill("23"); await box(page, "日期分钟").fill(""); await expect(confirm(page)).toBeDisabled();
  78  |   await expect(date).toHaveValue("2028-02-29");
  79  |   await box(page, "日期分钟").fill("59"); await confirm(page).click();
  80  |   await expect(trigger).toHaveText("2028-02-29 23:59");
  81  |   await open(page, "开放时间"); await panel(page).getByRole("button", { name: "清空", exact: true }).click();
  82  |   await expect(confirm(page)).toBeDisabled(); await expect(hint(page)).not.toHaveAttribute("data-invalid", "true");
  83  |   await day(page, 2026, 10, 13).click(); await expect(confirm(page)).toBeDisabled();
  84  |   await expect(hint(page)).toHaveText("请选择结束日期");
  85  | });
  86  | 
  87  | test("D03 pasted HH:mm and IME composition never commit an unfinished value", async ({ page }, info) => {
  88  |   test.skip(info.project.name !== "desktop", "Clipboard permissions and simulated IME are Chromium browser checks.");
  89  |   await page.goto("/#date-picker"); await open(page, "截止时间");
  90  |   await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  91  |   await page.evaluate(() => navigator.clipboard.writeText("09:30"));
  92  |   const hour = box(page, "日期小时"); await hour.focus(); await hour.press("ControlOrMeta+V");
  93  |   await expect(hour).toHaveValue("09"); await expect(box(page, "日期分钟")).toHaveValue("30");
  94  |   await hour.dispatchEvent("compositionstart", { data: "9" });
  95  |   await expect(confirm(page)).toBeDisabled();
  96  |   await hour.press("Enter"); await expect(panel(page)).toBeVisible();
  97  |   await hour.dispatchEvent("compositionend", { data: "9" }); await expect(confirm(page)).toBeEnabled();
  98  |   await box(page, "日期").dispatchEvent("compositionstart", { data: "2026" });
  99  |   await expect(confirm(page)).toBeDisabled();
  100 |   await box(page, "日期").dispatchEvent("compositionend", { data: "2026" }); await expect(confirm(page)).toBeEnabled();
  101 | });
  102 | 
  103 | test("D04 D05 D06 D07 endpoint editing preserves identities and enforces a positive teaching window", async ({ page }, info) => {
  104 |   test.skip(!basicProject(info), "Endpoint semantics exercised in Chromium and WebKit.");
  105 |   await page.goto("/#date-picker"); const trigger = await open(page, "考试开放窗口");
  106 |   await box(page, "结束分钟").fill("30");
  107 |   await expect(box(page, "开始日期")).toHaveValue("2026-10-13"); await expect(box(page, "开始小时")).toHaveValue("09");
  108 |   await box(page, "结束小时").fill("10"); await expect(summary(page)).toContainText("1小时30分钟");
  109 |   await box(page, "结束小时").fill("09"); await box(page, "结束分钟").fill("00");
  110 |   await expect(confirm(page)).toBeDisabled(); await expect(hint(page)).toContainText("至少1分钟");
  111 |   await box(page, "结束小时").fill("10"); await box(page, "结束分钟").fill("30");
  112 |   await box(page, "开始小时").fill("11"); await expect(confirm(page)).toBeDisabled();
  113 |   await expect(box(page, "结束小时")).toHaveValue("10"); await expect(hint(page)).toContainText("不能早于");
  114 |   await box(page, "开始小时").fill("09"); await confirm(page).click();
  115 |   await expect(trigger).toHaveText("2026-10-13 09:00 至 2026-10-13 10:30");
  116 |   await expect(page.getByLabel("考试设置摘要", { exact: true })).toContainText("1 小时 30 分钟");
  117 |   // The generic date-only range still accepts a same-day value.
  118 |   const dateTrigger = await open(page, "日期区间");
```