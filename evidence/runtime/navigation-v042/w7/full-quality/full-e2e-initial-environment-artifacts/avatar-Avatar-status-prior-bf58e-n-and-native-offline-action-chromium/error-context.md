# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: avatar.spec.ts >> Avatar status priority restores state, reduced motion and native offline action
- Location: tests/e2e/avatar.spec.ts:45:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - link "返回组件" [ref=e7] [cursor=pointer]:
        - /url: "#components"
      - heading "头像与成员" [level=1] [ref=e9]
      - paragraph [ref=e10]: 用人物图片识别成员，用组合表达关系，让状态始终有明确含义。
      - paragraph [ref=e11]: 待评审候选 · 人物图片与雨课堂默认图 · 以下姓名和课堂数据均为虚构
    - generic "预览设置" [ref=e12]:
      - generic [ref=e13] [cursor=pointer]:
        - checkbox "深色主题" [ref=e14]
        - generic [ref=e17]: 深色主题
      - generic [ref=e19] [cursor=pointer]:
        - checkbox "紧凑密度" [ref=e20]
        - generic [ref=e23]: 紧凑密度
    - generic [ref=e26]:
      - generic [ref=e27]:
        - heading "01 · 单头像" [level=2] [ref=e28]
        - paragraph [ref=e29]: 24、32、40 三档尺寸；圆形与圆角方形。缺失或损坏的图片回退到同一张雨课堂默认图。
      - generic [ref=e30]:
        - generic [ref=e31]:
          - strong [ref=e32]: 圆形
          - generic [ref=e33]:
            - generic [ref=e34]:
              - img "林雨" [ref=e36]
              - generic [ref=e37]: "24"
            - generic [ref=e38]:
              - img "林雨" [ref=e40]
              - generic [ref=e41]: "32"
            - generic [ref=e42]:
              - img "林雨" [ref=e44]
              - generic [ref=e45]: "40"
        - generic [ref=e46]:
          - strong [ref=e47]: 圆角方形
          - generic [ref=e48]:
            - generic [ref=e49]:
              - img "林雨" [ref=e51]
              - generic [ref=e52]: "24"
            - generic [ref=e53]:
              - img "林雨" [ref=e55]
              - generic [ref=e56]: "32"
            - generic [ref=e57]:
              - img "林雨" [ref=e59]
              - generic [ref=e60]: "40"
        - generic [ref=e61]:
          - strong [ref=e62]: 稳定回退
          - generic [ref=e63]:
            - generic [ref=e64]:
              - img "未设置头像" [ref=e66]
              - generic [ref=e67]: 无图片
            - generic [ref=e68]:
              - img "图片加载失败" [ref=e70]
              - generic [ref=e71]: 图片损坏
      - generic [ref=e72]:
        - generic [ref=e73]:
          - img "陈星" [ref=e75]
          - generic [ref=e76]: 未声明在线状态
        - generic [ref=e77]:
          - img "陈星，在线" [ref=e79]
          - generic [ref=e80]: 在线 · 保留原图
        - generic [ref=e81]:
          - img "陈星，离线" [ref=e83]
          - generic [ref=e84]: 离线 · 灰度
      - generic [ref=e85]:
        - button "查看周明（离线）" [ref=e86] [cursor=pointer]
        - generic [ref=e88]: 离线仍可查看成员
        - link "返回组件目录" [ref=e89] [cursor=pointer]:
          - /url: "#components"
        - generic [ref=e91]: 页面跳转使用链接
    - generic [ref=e93]:
      - generic [ref=e94]:
        - heading "02 · 横向头像组" [level=2] [ref=e95]
        - paragraph [ref=e96]: 上限包含 More 槽位。9 人全部显示；超过 9 人显示前 8 人和 More。
      - generic [ref=e97]:
        - generic [ref=e98]:
          - generic [ref=e99]: 24px
          - generic [ref=e100]:
            - group "24px 课程成员" [ref=e101]:
              - img "林雨" [ref=e103]
              - img "陈星" [ref=e105]
              - img "周明" [ref=e107]
              - img "苏禾" [ref=e109]
              - img "李晴" [ref=e111]
              - img "王远" [ref=e113]
              - img "何悦" [ref=e115]
              - img "赵宁" [ref=e117]
            - button "查看其余4位成员" [ref=e118] [cursor=pointer]
        - generic [ref=e120]:
          - generic [ref=e121]: 32px
          - generic [ref=e122]:
            - group "32px 课程成员" [ref=e123]:
              - img "林雨" [ref=e125]
              - img "陈星" [ref=e127]
              - img "周明" [ref=e129]
              - img "苏禾" [ref=e131]
              - img "李晴" [ref=e133]
              - img "王远" [ref=e135]
              - img "何悦" [ref=e137]
              - img "赵宁" [ref=e139]
            - button "查看其余4位成员" [ref=e140] [cursor=pointer]
        - generic [ref=e142]:
          - generic [ref=e143]: 40px
          - generic [ref=e144]:
            - group "40px 课程成员" [ref=e145]:
              - img "林雨" [ref=e147]
              - img "陈星" [ref=e149]
              - img "周明" [ref=e151]
              - img "苏禾" [ref=e153]
              - img "李晴" [ref=e155]
              - img "王远" [ref=e157]
              - img "何悦" [ref=e159]
              - img "赵宁" [ref=e161]
            - button "查看其余4位成员" [ref=e162] [cursor=pointer]
      - generic [ref=e164]:
        - generic [ref=e165]:
          - generic [ref=e166]: 刚好 9 人
          - group "九位成员" [ref=e168]:
            - img "林雨" [ref=e170]
            - img "陈星" [ref=e172]
            - img "周明" [ref=e174]
            - img "苏禾" [ref=e176]
            - img "李晴" [ref=e178]
            - img "王远" [ref=e180]
            - img "何悦" [ref=e182]
            - img "赵宁" [ref=e184]
            - img "吴桐" [ref=e186]
        - generic [ref=e187]:
          - generic [ref=e188]: 整组与 More 分别操作
          - generic [ref=e189]:
            - button "查看全部课程成员" [ref=e190] [cursor=pointer]
            - button "查看其余4位成员" [ref=e207] [cursor=pointer]
    - generic [ref=e210]:
      - generic [ref=e211]:
        - heading "03 · 九宫格头像" [level=2] [ref=e212]
        - paragraph [ref=e213]: 固定 40 × 40。保留 1–9 人排列，超过 9 人只展示前 9 人；点击行为属于整个小组。
      - generic [ref=e214]:
        - generic [ref=e215]:
          - img "0 人学习小组，暂无" [ref=e216]:
            - generic [ref=e217]: 暂无
          - generic [ref=e220]: 0 人
        - generic [ref=e221]:
          - img "1 人学习小组" [ref=e222]
          - generic [ref=e227]: 1 人
        - generic [ref=e228]:
          - img "2 人学习小组" [ref=e229]
          - generic [ref=e236]: 2 人
        - generic [ref=e237]:
          - img "3 人学习小组" [ref=e238]
          - generic [ref=e248]: 3 人
        - generic [ref=e249]:
          - img "4 人学习小组" [ref=e250]
          - generic [ref=e262]: 4 人
        - generic [ref=e263]:
          - img "5 人学习小组" [ref=e264]
          - generic [ref=e278]: 5 人
        - generic [ref=e279]:
          - img "6 人学习小组" [ref=e280]
          - generic [ref=e296]: 6 人
        - generic [ref=e297]:
          - img "7 人学习小组" [ref=e298]
          - generic [ref=e317]: 7 人
        - generic [ref=e318]:
          - img "8 人学习小组" [ref=e319]
          - generic [ref=e340]: 8 人
        - generic [ref=e341]:
          - img "9 人学习小组" [ref=e342]
          - generic [ref=e365]: 9 人
        - generic [ref=e366]:
          - img "10 人学习小组" [ref=e367]
          - generic [ref=e390]: 10 人 → 9 格
    - generic [ref=e392]:
      - generic [ref=e393]:
        - heading "04 · 状态装饰" [level=2] [ref=e394]
        - paragraph [ref=e395]: 边缘最多两个状态。活动状态出现时暂时隐藏边缘状态，结束后恢复；操作放在头像之外。
      - generic [ref=e396]:
        - generic [ref=e397]:
          - generic [ref=e398]:
            - img "李晴" [ref=e399]
            - generic:
              - img "电脑加入"
              - img "摄像头关闭"
          - generic [ref=e400]: 下左
        - generic [ref=e401]:
          - generic [ref=e402]:
            - img "李晴" [ref=e403]
            - generic:
              - img "电脑加入"
              - img "摄像头关闭"
          - generic [ref=e404]: 下中
        - generic [ref=e405]:
          - generic [ref=e406]:
            - img "李晴" [ref=e407]
            - generic:
              - img "电脑加入"
              - img "摄像头关闭"
          - generic [ref=e408]: 下右
        - generic [ref=e409]:
          - generic [ref=e410]:
            - img "王远" [ref=e411]
            - img "正在连接"
          - generic [ref=e412]: 连接中
        - generic [ref=e413]:
          - generic [ref=e414]:
            - img "何悦" [ref=e415]
            - img "正在发言"
          - generic [ref=e416]: 正在发言
      - generic [ref=e417]:
        - img "neutral 示例状态"
        - img "info 示例状态"
        - img "success 示例状态"
        - img "warning 示例状态"
        - img "danger 示例状态"
      - generic [ref=e418]:
        - generic [ref=e419]:
          - generic [ref=e420]:
            - img "连接处理中"
            - img "已阻止"
          - generic [ref=e421]: 16px · 处理中 / 已阻止
        - generic [ref=e422]:
          - generic [ref=e423]:
            - img "连接处理中"
            - img "已阻止"
          - generic [ref=e424]: 20px · 处理中 / 已阻止
        - generic [ref=e425]:
          - generic [ref=e426]:
            - img "连接处理中"
            - img "已阻止"
          - generic [ref=e427]: 24px · 处理中 / 已阻止
    - generic [ref=e429]:
      - generic [ref=e430]:
        - heading "05 · 在场景中组合" [level=2] [ref=e431]
        - paragraph [ref=e432]: 同一套头像分别进入名单、课程摘要和课堂状态。人物状态与操作由所在页面管理。
      - generic [ref=e433]:
        - generic [ref=e434]:
          - heading "课程名单" [level=3] [ref=e435]
          - generic [ref=e436]:
            - generic [ref=e439]:
              - strong [ref=e440]: 林雨
              - generic [ref=e441]: 在线 · 学生
            - button "查看资料" [ref=e442] [cursor=pointer]
          - generic [ref=e444] [cursor=pointer]:
            - checkbox "模拟成员离线" [ref=e445]
            - generic [ref=e448]: 模拟成员离线
        - generic [ref=e450]:
          - heading "设计研究 · 第三组" [level=3] [ref=e451]
          - generic [ref=e452]:
            - button "查看第三组" [ref=e453] [cursor=pointer]
            - generic [ref=e469]: 6 位小组成员
          - generic [ref=e470]:
            - group "设计研究课程成员" [ref=e471]:
              - img "林雨" [ref=e473]
              - img "陈星" [ref=e475]
              - img "周明" [ref=e477]
              - img "苏禾" [ref=e479]
              - img "李晴" [ref=e481]
              - img "王远" [ref=e483]
              - img "何悦" [ref=e485]
              - img "赵宁" [ref=e487]
            - button "查看其余4位成员" [ref=e488] [cursor=pointer]
          - generic [ref=e490]: 课程共有 12 位成员
        - generic [ref=e491]:
          - heading "课堂成员状态" [level=3] [ref=e492]
          - generic [ref=e493]:
            - generic [ref=e494]:
              - img "赵宁正在发言"
            - generic [ref=e496]:
              - strong [ref=e497]: 赵宁
              - generic [ref=e498]: 正在发言
          - button "结束发言" [ref=e499] [cursor=pointer]
    - generic [ref=e502]:
      - generic [ref=e503]:
        - heading "06 · 头像图库" [level=2] [ref=e504]
        - paragraph [ref=e505]: 默认图 1 张、学生 25 张、教师 25 张。复制素材引用；人物分配应在完整成员集合上完成，再筛选和分页。
      - status [ref=e506]: 素材引用可复制，也可直接选中文本。
      - generic [ref=e507]:
        - heading "雨课堂默认图" [level=3] [ref=e508]
        - figure [ref=e510]:
          - generic [ref=e511]:
            - strong [ref=e512]: default
            - code [ref=e513]: avatarAssets["default"]
          - button "复制 default 引用" [ref=e514] [cursor=pointer]:
            - generic [ref=e515]: 复制引用
      - generic [ref=e516]:
        - heading "学生" [level=3] [ref=e517]
        - generic [ref=e518]:
          - figure [ref=e519]:
            - generic [ref=e520]:
              - strong [ref=e521]: student-01
              - code [ref=e522]: avatarAssets["student-01"]
            - button "复制 student-01 引用" [ref=e523] [cursor=pointer]:
              - generic [ref=e524]: 复制引用
          - figure [ref=e525]:
            - generic [ref=e526]:
              - strong [ref=e527]: student-02
              - code [ref=e528]: avatarAssets["student-02"]
            - button "复制 student-02 引用" [ref=e529] [cursor=pointer]:
              - generic [ref=e530]: 复制引用
          - figure [ref=e531]:
            - generic [ref=e532]:
              - strong [ref=e533]: student-03
              - code [ref=e534]: avatarAssets["student-03"]
            - button "复制 student-03 引用" [ref=e535] [cursor=pointer]:
              - generic [ref=e536]: 复制引用
          - figure [ref=e537]:
            - generic [ref=e538]:
              - strong [ref=e539]: student-04
              - code [ref=e540]: avatarAssets["student-04"]
            - button "复制 student-04 引用" [ref=e541] [cursor=pointer]:
              - generic [ref=e542]: 复制引用
          - figure [ref=e543]:
            - generic [ref=e544]:
              - strong [ref=e545]: student-05
              - code [ref=e546]: avatarAssets["student-05"]
            - button "复制 student-05 引用" [ref=e547] [cursor=pointer]:
              - generic [ref=e548]: 复制引用
          - figure [ref=e549]:
            - generic [ref=e550]:
              - strong [ref=e551]: student-06
              - code [ref=e552]: avatarAssets["student-06"]
            - button "复制 student-06 引用" [ref=e553] [cursor=pointer]:
              - generic [ref=e554]: 复制引用
          - figure [ref=e555]:
            - generic [ref=e556]:
              - strong [ref=e557]: student-07
              - code [ref=e558]: avatarAssets["student-07"]
            - button "复制 student-07 引用" [ref=e559] [cursor=pointer]:
              - generic [ref=e560]: 复制引用
          - figure [ref=e561]:
            - generic [ref=e562]:
              - strong [ref=e563]: student-08
              - code [ref=e564]: avatarAssets["student-08"]
            - button "复制 student-08 引用" [ref=e565] [cursor=pointer]:
              - generic [ref=e566]: 复制引用
          - figure [ref=e567]:
            - generic [ref=e568]:
              - strong [ref=e569]: student-09
              - code [ref=e570]: avatarAssets["student-09"]
            - button "复制 student-09 引用" [ref=e571] [cursor=pointer]:
              - generic [ref=e572]: 复制引用
          - figure [ref=e573]:
            - generic [ref=e574]:
              - strong [ref=e575]: student-10
              - code [ref=e576]: avatarAssets["student-10"]
            - button "复制 student-10 引用" [ref=e577] [cursor=pointer]:
              - generic [ref=e578]: 复制引用
          - figure [ref=e579]:
            - generic [ref=e580]:
              - strong [ref=e581]: student-11
              - code [ref=e582]: avatarAssets["student-11"]
            - button "复制 student-11 引用" [ref=e583] [cursor=pointer]:
              - generic [ref=e584]: 复制引用
          - figure [ref=e585]:
            - generic [ref=e586]:
              - strong [ref=e587]: student-12
              - code [ref=e588]: avatarAssets["student-12"]
            - button "复制 student-12 引用" [ref=e589] [cursor=pointer]:
              - generic [ref=e590]: 复制引用
          - figure [ref=e591]:
            - generic [ref=e592]:
              - strong [ref=e593]: student-13
              - code [ref=e594]: avatarAssets["student-13"]
            - button "复制 student-13 引用" [ref=e595] [cursor=pointer]:
              - generic [ref=e596]: 复制引用
          - figure [ref=e597]:
            - generic [ref=e598]:
              - strong [ref=e599]: student-14
              - code [ref=e600]: avatarAssets["student-14"]
            - button "复制 student-14 引用" [ref=e601] [cursor=pointer]:
              - generic [ref=e602]: 复制引用
          - figure [ref=e603]:
            - generic [ref=e604]:
              - strong [ref=e605]: student-15
              - code [ref=e606]: avatarAssets["student-15"]
            - button "复制 student-15 引用" [ref=e607] [cursor=pointer]:
              - generic [ref=e608]: 复制引用
          - figure [ref=e609]:
            - generic [ref=e610]:
              - strong [ref=e611]: student-16
              - code [ref=e612]: avatarAssets["student-16"]
            - button "复制 student-16 引用" [ref=e613] [cursor=pointer]:
              - generic [ref=e614]: 复制引用
          - figure [ref=e615]:
            - generic [ref=e616]:
              - strong [ref=e617]: student-17
              - code [ref=e618]: avatarAssets["student-17"]
            - button "复制 student-17 引用" [ref=e619] [cursor=pointer]:
              - generic [ref=e620]: 复制引用
          - figure [ref=e621]:
            - generic [ref=e622]:
              - strong [ref=e623]: student-18
              - code [ref=e624]: avatarAssets["student-18"]
            - button "复制 student-18 引用" [ref=e625] [cursor=pointer]:
              - generic [ref=e626]: 复制引用
          - figure [ref=e627]:
            - generic [ref=e628]:
              - strong [ref=e629]: student-19
              - code [ref=e630]: avatarAssets["student-19"]
            - button "复制 student-19 引用" [ref=e631] [cursor=pointer]:
              - generic [ref=e632]: 复制引用
          - figure [ref=e633]:
            - generic [ref=e634]:
              - strong [ref=e635]: student-20
              - code [ref=e636]: avatarAssets["student-20"]
            - button "复制 student-20 引用" [ref=e637] [cursor=pointer]:
              - generic [ref=e638]: 复制引用
          - figure [ref=e639]:
            - generic [ref=e640]:
              - strong [ref=e641]: student-21
              - code [ref=e642]: avatarAssets["student-21"]
            - button "复制 student-21 引用" [ref=e643] [cursor=pointer]:
              - generic [ref=e644]: 复制引用
          - figure [ref=e645]:
            - generic [ref=e646]:
              - strong [ref=e647]: student-22
              - code [ref=e648]: avatarAssets["student-22"]
            - button "复制 student-22 引用" [ref=e649] [cursor=pointer]:
              - generic [ref=e650]: 复制引用
          - figure [ref=e651]:
            - generic [ref=e652]:
              - strong [ref=e653]: student-23
              - code [ref=e654]: avatarAssets["student-23"]
            - button "复制 student-23 引用" [ref=e655] [cursor=pointer]:
              - generic [ref=e656]: 复制引用
          - figure [ref=e657]:
            - generic [ref=e658]:
              - strong [ref=e659]: student-24
              - code [ref=e660]: avatarAssets["student-24"]
            - button "复制 student-24 引用" [ref=e661] [cursor=pointer]:
              - generic [ref=e662]: 复制引用
          - figure [ref=e663]:
            - generic [ref=e664]:
              - strong [ref=e665]: student-25
              - code [ref=e666]: avatarAssets["student-25"]
            - button "复制 student-25 引用" [ref=e667] [cursor=pointer]:
              - generic [ref=e668]: 复制引用
      - generic [ref=e669]:
        - heading "教师" [level=3] [ref=e670]
        - generic [ref=e671]:
          - figure [ref=e672]:
            - generic [ref=e673]:
              - strong [ref=e674]: teacher-01
              - code [ref=e675]: avatarAssets["teacher-01"]
            - button "复制 teacher-01 引用" [ref=e676] [cursor=pointer]:
              - generic [ref=e677]: 复制引用
          - figure [ref=e678]:
            - generic [ref=e679]:
              - strong [ref=e680]: teacher-02
              - code [ref=e681]: avatarAssets["teacher-02"]
            - button "复制 teacher-02 引用" [ref=e682] [cursor=pointer]:
              - generic [ref=e683]: 复制引用
          - figure [ref=e684]:
            - generic [ref=e685]:
              - strong [ref=e686]: teacher-03
              - code [ref=e687]: avatarAssets["teacher-03"]
            - button "复制 teacher-03 引用" [ref=e688] [cursor=pointer]:
              - generic [ref=e689]: 复制引用
          - figure [ref=e690]:
            - generic [ref=e691]:
              - strong [ref=e692]: teacher-04
              - code [ref=e693]: avatarAssets["teacher-04"]
            - button "复制 teacher-04 引用" [ref=e694] [cursor=pointer]:
              - generic [ref=e695]: 复制引用
          - figure [ref=e696]:
            - generic [ref=e697]:
              - strong [ref=e698]: teacher-05
              - code [ref=e699]: avatarAssets["teacher-05"]
            - button "复制 teacher-05 引用" [ref=e700] [cursor=pointer]:
              - generic [ref=e701]: 复制引用
          - figure [ref=e702]:
            - generic [ref=e703]:
              - strong [ref=e704]: teacher-06
              - code [ref=e705]: avatarAssets["teacher-06"]
            - button "复制 teacher-06 引用" [ref=e706] [cursor=pointer]:
              - generic [ref=e707]: 复制引用
          - figure [ref=e708]:
            - generic [ref=e709]:
              - strong [ref=e710]: teacher-07
              - code [ref=e711]: avatarAssets["teacher-07"]
            - button "复制 teacher-07 引用" [ref=e712] [cursor=pointer]:
              - generic [ref=e713]: 复制引用
          - figure [ref=e714]:
            - generic [ref=e715]:
              - strong [ref=e716]: teacher-08
              - code [ref=e717]: avatarAssets["teacher-08"]
            - button "复制 teacher-08 引用" [ref=e718] [cursor=pointer]:
              - generic [ref=e719]: 复制引用
          - figure [ref=e720]:
            - generic [ref=e721]:
              - strong [ref=e722]: teacher-09
              - code [ref=e723]: avatarAssets["teacher-09"]
            - button "复制 teacher-09 引用" [ref=e724] [cursor=pointer]:
              - generic [ref=e725]: 复制引用
          - figure [ref=e726]:
            - generic [ref=e727]:
              - strong [ref=e728]: teacher-10
              - code [ref=e729]: avatarAssets["teacher-10"]
            - button "复制 teacher-10 引用" [ref=e730] [cursor=pointer]:
              - generic [ref=e731]: 复制引用
          - figure [ref=e732]:
            - generic [ref=e733]:
              - strong [ref=e734]: teacher-11
              - code [ref=e735]: avatarAssets["teacher-11"]
            - button "复制 teacher-11 引用" [ref=e736] [cursor=pointer]:
              - generic [ref=e737]: 复制引用
          - figure [ref=e738]:
            - generic [ref=e739]:
              - strong [ref=e740]: teacher-12
              - code [ref=e741]: avatarAssets["teacher-12"]
            - button "复制 teacher-12 引用" [ref=e742] [cursor=pointer]:
              - generic [ref=e743]: 复制引用
          - figure [ref=e744]:
            - generic [ref=e745]:
              - strong [ref=e746]: teacher-13
              - code [ref=e747]: avatarAssets["teacher-13"]
            - button "复制 teacher-13 引用" [ref=e748] [cursor=pointer]:
              - generic [ref=e749]: 复制引用
          - figure [ref=e750]:
            - generic [ref=e751]:
              - strong [ref=e752]: teacher-14
              - code [ref=e753]: avatarAssets["teacher-14"]
            - button "复制 teacher-14 引用" [ref=e754] [cursor=pointer]:
              - generic [ref=e755]: 复制引用
          - figure [ref=e756]:
            - generic [ref=e757]:
              - strong [ref=e758]: teacher-15
              - code [ref=e759]: avatarAssets["teacher-15"]
            - button "复制 teacher-15 引用" [ref=e760] [cursor=pointer]:
              - generic [ref=e761]: 复制引用
          - figure [ref=e762]:
            - generic [ref=e763]:
              - strong [ref=e764]: teacher-16
              - code [ref=e765]: avatarAssets["teacher-16"]
            - button "复制 teacher-16 引用" [ref=e766] [cursor=pointer]:
              - generic [ref=e767]: 复制引用
          - figure [ref=e768]:
            - generic [ref=e769]:
              - strong [ref=e770]: teacher-17
              - code [ref=e771]: avatarAssets["teacher-17"]
            - button "复制 teacher-17 引用" [ref=e772] [cursor=pointer]:
              - generic [ref=e773]: 复制引用
          - figure [ref=e774]:
            - generic [ref=e775]:
              - strong [ref=e776]: teacher-18
              - code [ref=e777]: avatarAssets["teacher-18"]
            - button "复制 teacher-18 引用" [ref=e778] [cursor=pointer]:
              - generic [ref=e779]: 复制引用
          - figure [ref=e780]:
            - generic [ref=e781]:
              - strong [ref=e782]: teacher-19
              - code [ref=e783]: avatarAssets["teacher-19"]
            - button "复制 teacher-19 引用" [ref=e784] [cursor=pointer]:
              - generic [ref=e785]: 复制引用
          - figure [ref=e786]:
            - generic [ref=e787]:
              - strong [ref=e788]: teacher-20
              - code [ref=e789]: avatarAssets["teacher-20"]
            - button "复制 teacher-20 引用" [ref=e790] [cursor=pointer]:
              - generic [ref=e791]: 复制引用
          - figure [ref=e792]:
            - generic [ref=e793]:
              - strong [ref=e794]: teacher-21
              - code [ref=e795]: avatarAssets["teacher-21"]
            - button "复制 teacher-21 引用" [ref=e796] [cursor=pointer]:
              - generic [ref=e797]: 复制引用
          - figure [ref=e798]:
            - generic [ref=e799]:
              - strong [ref=e800]: teacher-22
              - code [ref=e801]: avatarAssets["teacher-22"]
            - button "复制 teacher-22 引用" [ref=e802] [cursor=pointer]:
              - generic [ref=e803]: 复制引用
          - figure [ref=e804]:
            - generic [ref=e805]:
              - strong [ref=e806]: teacher-23
              - code [ref=e807]: avatarAssets["teacher-23"]
            - button "复制 teacher-23 引用" [ref=e808] [cursor=pointer]:
              - generic [ref=e809]: 复制引用
          - figure [ref=e810]:
            - generic [ref=e811]:
              - strong [ref=e812]: teacher-24
              - code [ref=e813]: avatarAssets["teacher-24"]
            - button "复制 teacher-24 引用" [ref=e814] [cursor=pointer]:
              - generic [ref=e815]: 复制引用
          - figure [ref=e816]:
            - generic [ref=e817]:
              - strong [ref=e818]: teacher-25
              - code [ref=e819]: avatarAssets["teacher-25"]
            - button "复制 teacher-25 引用" [ref=e820] [cursor=pointer]:
              - generic [ref=e821]: 复制引用
    - group [ref=e822]:
      - generic "使用约定与来源" [ref=e823] [cursor=pointer]
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | 
  4   | const evidence = "evidence/runtime/avatar";
  5   | test.beforeEach(async ({ page }) => {
  6   |   await page.setViewportSize({ width: 1280, height: 900 });
  7   |   await page.goto("/#avatar");
  8   |   await expect(page.getByRole("heading", { name: "头像与成员", exact: true })).toBeVisible();
  9   |   await expect.poll(() => page.locator('[data-asset-id] img').evaluateAll(images =>
> 10  |     images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth === 240))).toBe(true);
      |                                                                                                                       ^ Error: expect(received).toBe(expected) // Object.is equality
  11  |   mkdirSync(evidence, { recursive: true });
  12  | });
  13  | 
  14  | test("Avatar geometry, 51 assets, image failure and keyboard More", async ({ page }) => {
  15  |   const errors: string[] = [];
  16  |   page.on("pageerror", error => errors.push(error.message));
  17  |   await expect(page.locator("[data-asset-id]")).toHaveCount(51);
  18  |   const sizes = await page.locator(".avatar-review-matrix .rain-avatar").evaluateAll(nodes => nodes.map(node => ({
  19  |     size: node.getAttribute("data-size"), width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height,
  20  |   })));
  21  |   for (const entry of sizes) { expect(entry.width).toBe(Number(entry.size)); expect(entry.height).toBe(Number(entry.size)); }
  22  |   await expect(page.locator('img[src="data:image/png;base64,invalid"]')).toHaveAttribute("data-ready", "false");
  23  |   await expect(page.locator('img[src="data:image/png;base64,invalid"]')).toBeHidden();
  24  |   const grids = await page.locator('[data-rain-id="ui-avatar-grid"]').evaluateAll(nodes => nodes.map(node => ({
  25  |     width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height,
  26  |     count: Number(node.getAttribute("data-count")), portraits: node.querySelectorAll('[data-rain-id="ui-avatar"]').length,
  27  |   })));
  28  |   for (const grid of grids) { expect(grid.width).toBe(40); expect(grid.height).toBe(40); expect(grid.portraits).toBe(grid.count); }
  29  |   await expect(page.getByText("暂无", { exact: true })).toBeVisible();
  30  |   const group = page.locator('.rain-avatar-group[data-size="40"]').first();
  31  |   await expect(group.locator(".rain-avatar")).toHaveCount(8);
  32  |   const more = group.getByRole("button", { name: "查看其余4位成员" });
  33  |   await more.focus(); await page.keyboard.press("Enter");
  34  |   const dialog = page.getByRole("dialog", { name: "40px 课程成员 · 其余 4 位" });
  35  |   await expect(dialog).toBeVisible();
  36  |   await expect(dialog.getByText("吴桐")).toBeVisible(); await expect(dialog.getByText("方可")).toBeVisible();
  37  |   await page.screenshot({ path: `${evidence}/more-open.png` });
  38  |   await page.keyboard.press("Escape"); await expect(dialog).toBeHidden(); await expect(more).toBeFocused();
  39  |   await expect(page.locator("button button, a button")).toHaveCount(0);
  40  |   await page.screenshot({ path: `${evidence}/light.png`, fullPage: true });
  41  |   writeFileSync(`${evidence}/geometry.json`, JSON.stringify({ sizes, grids, pageErrors: errors }, null, 2));
  42  |   expect(errors).toEqual([]);
  43  | });
  44  | 
  45  | test("Avatar status priority restores state, reduced motion and native offline action", async ({ page }) => {
  46  |   const live = page.getByTestId("live-avatar"), edge = live.locator(".rain-status-indicator-group");
  47  |   await expect(edge).toBeHidden();
  48  |   await expect(live.getByRole("img", { name: "赵宁正在发言" })).toBeVisible();
  49  |   await page.getByRole("button", { name: "结束发言", exact: true }).click();
  50  |   await expect(edge).toBeVisible();
  51  |   await expect(live.getByRole("img", { name: "手机加入" })).toBeVisible();
  52  |   await expect(live.getByRole("img", { name: "摄像头关闭" })).toBeVisible();
  53  |   await page.getByRole("button", { name: "开始发言", exact: true }).click();
  54  |   await expect(edge).toBeHidden();
  55  |   await page.emulateMedia({ reducedMotion: "reduce" });
  56  |   const animations = await page.locator(".rain-activity-overlay").evaluateAll(nodes => nodes.map(node => ({
  57  |     icon: getComputedStyle(node.querySelector('[data-rain-id="icon"]')!).animationName,
  58  |     ring: getComputedStyle(node, "::after").animationName,
  59  |   })));
  60  |   expect(animations.every(entry => entry.icon === "none" && entry.ring === "none")).toBe(true);
  61  |   const offline = page.getByRole("button", { name: "查看周明（离线）" });
  62  |   await offline.focus(); await page.keyboard.press("Enter");
  63  |   await expect(page.getByRole("dialog", { name: "周明", exact: true })).toBeVisible();
  64  |   await page.keyboard.press("Escape");
  65  |   await page.locator(".avatar-review-section").nth(3).screenshot({ path: `${evidence}/status.png` });
  66  |   writeFileSync(`${evidence}/motion.json`, JSON.stringify(animations, null, 2));
  67  | });
  68  | 
  69  | test("Avatar dark compact, narrow layout, forced colors and accessible focus", async ({ page }) => {
  70  |   for (const name of ["深色主题", "紧凑密度"]) {
  71  |     await page.getByRole("checkbox", { name, exact: true }).focus();
  72  |     await page.keyboard.press("Space");
  73  |     await expect(page.getByRole("checkbox", { name, exact: true })).toBeChecked();
  74  |   }
  75  |   await expect(page.getByRole("img", { name: "正在连接", exact: true })).toHaveCSS("background-color", "rgba(5, 9, 26, 0.7)");
  76  |   await page.screenshot({ path: `${evidence}/dark-compact.png`, fullPage: true });
  77  |   await page.setViewportSize({ width: 390, height: 844 });
  78  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  79  |   await page.screenshot({ path: `${evidence}/narrow.png`, fullPage: true });
  80  |   await page.emulateMedia({ forcedColors: "active" });
  81  |   const action = page.getByRole("button", { name: "查看周明（离线）" });
  82  |   await action.focus(); await page.keyboard.press("Tab"); await page.keyboard.press("Shift+Tab");
  83  |   await expect(action).toBeFocused();
  84  |   const focus = await action.evaluate(node => ({
  85  |     outline: getComputedStyle(node).outlineStyle, width: getComputedStyle(node).outlineWidth,
  86  |   }));
  87  |   expect(focus.outline).toBe("solid"); expect(focus.width).toBe("2px");
  88  |   await page.screenshot({ path: `${evidence}/forced-colors.png` });
  89  | });
  90  | 
  91  | test("Avatar gallery copies stable source references", async ({ page, context }) => {
  92  |   await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  93  |   await page.getByRole("button", { name: "复制 teacher-01 引用", exact: true }).click();
  94  |   await expect(page.getByRole("status")).toHaveText("已复制 teacher-01 的引用");
  95  |   expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('avatarAssets["teacher-01"]');
  96  | });
  97  | 
  98  | test("Classic status geometry and solid icon surfaces", async ({ page }) => {
  99  |   await page.emulateMedia({ reducedMotion: "reduce" });
  100 |   const status = page.getByRole("img", { name: "neutral 示例状态", exact: true });
  101 |   const visual = await status.evaluate(node => ({
  102 |     fill: getComputedStyle(node).backgroundColor, ink: getComputedStyle(node).color,
  103 |     outline: getComputedStyle(node).outlineStyle,
  104 |     icon: node.querySelector('[data-rain-id="icon"]')!.getBoundingClientRect().width,
  105 |   }));
  106 |   expect(visual).toEqual({ fill: "rgb(134, 153, 185)", ink: "rgb(255, 255, 255)", outline: "none", icon: 16 });
  107 |   const activity = page.getByRole("img", { name: "正在连接", exact: true });
  108 |   await expect(activity).toHaveCSS("background-color", "rgba(34, 48, 81, 0.15)");
  109 |   const ring = await activity.evaluate(node => ({
  110 |     inset: getComputedStyle(node, "::after").top, width: getComputedStyle(node, "::after").borderTopWidth,
```