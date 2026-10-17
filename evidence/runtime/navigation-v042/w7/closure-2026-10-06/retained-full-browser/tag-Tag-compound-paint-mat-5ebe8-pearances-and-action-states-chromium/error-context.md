# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tag.spec.ts >> Tag compound paint matches real browser pixels across appearances and action states
- Location: tests/e2e/tag.spec.ts:9:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.hover: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('[data-tag-size="24"] [data-appearance="solid"] [data-slot="remove-action"]')

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e5]:
      - link "返回组件总览" [ref=e6] [cursor=pointer]:
        - /url: "#components"
      - heading "Tag 标签" [level=1] [ref=e8]
      - paragraph [ref=e9]: 保留雨课堂的完整分类色。普通标签默认浅底，可独立关闭、导航，或用于单选与多选。
      - generic [ref=e10]:
        - generic [ref=e11]:
          - text: 主题
          - combobox "主题" [ref=e12]:
            - option "浅色"
            - option "深色" [selected]
        - generic [ref=e13]:
          - text: 标签所在底色
          - combobox "标签所在底色" [ref=e14]:
            - option "白色任务面" [selected]
            - option "浅色过渡面"
            - option "页面底色"
        - generic [ref=e15]:
          - text: 交互示例配色
          - combobox "交互示例配色" [ref=e16]:
            - option "neutral"
            - option "brand"
            - option "classroom"
            - option "olive"
            - option "paper" [selected]
            - option "exam"
            - option "courseware"
            - option "gold"
            - option "purple"
            - option "assignment"
            - option "live"
            - option "audio"
            - option "magenta"
            - option "brown"
            - option "vote"
            - option "self-test"
            - option "slate"
            - option "difficulty1"
            - option "difficulty2"
            - option "difficulty3"
            - option "difficulty4"
            - option "difficulty5"
        - generic [ref=e17]:
          - text: 交互示例外观
          - combobox "交互示例外观" [ref=e18]:
            - option "filled"
            - option "outlined"
            - option "solid" [selected]
        - generic [ref=e19]:
          - text: 交互示例尺寸
          - combobox "交互示例尺寸" [ref=e20]:
            - option "20px"
            - option "24px" [selected]
            - option "28px"
    - region [ref=e21]:
      - generic [ref=e22]:
        - heading "选择与自定义标签" [level=2] [ref=e23]
        - paragraph [ref=e24]: 切换学习环节，或为资料选择、创建和管理标签。示例使用本地数据，刷新后恢复。
      - generic [ref=e25]:
        - region "当前资料" [ref=e26]:
          - generic [ref=e27]:
            - paragraph [ref=e28]: 教学资料 / 设计方法
            - heading "设计方法复习资料" [level=3] [ref=e29]
          - generic [ref=e30]:
            - generic [ref=e31]: 学习环节
            - combobox "学习环节" [ref=e32] [cursor=pointer]:
              - generic [ref=e33]: 课前
            - textbox [ref=e37]: "0"
          - generic [ref=e39]:
            - group "当前资料标签" [ref=e40]:
              - generic "期末复习" [ref=e41]:
                - button "移除标签 期末复习" [ref=e44] [cursor=pointer]
              - generic "重点内容" [ref=e47]:
                - button "移除标签 重点内容" [ref=e50] [cursor=pointer]
            - button "设置资料标签" [ref=e53] [cursor=pointer]:
              - generic [ref=e54]: 设置标签
        - region "关联资料" [ref=e55]:
          - generic [ref=e56]:
            - paragraph [ref=e57]: 另一份资料
            - heading "第三周课堂练习" [level=3] [ref=e58]
          - generic "期末复习" [ref=e60]
          - paragraph [ref=e63]: 这份资料也使用“期末复习”标签。编辑该标签时，两处名称和颜色同步更新。
      - group [ref=e64]:
        - generic "尺寸、展开与边界检查" [ref=e65] [cursor=pointer]
    - region [ref=e66]:
      - heading "业务标签与专用形状" [level=2] [ref=e67]
      - paragraph [ref=e68]: 颜色随业务类型固定；方形标记提供完整尺寸。计分开关保持正文位置与外观。
      - generic [ref=e69]:
        - generic [ref=e70]:
          - checkbox "显示计分角标" [checked] [ref=e71]
          - text: 显示计分角标
        - generic [ref=e72]:
          - checkbox "显示新提醒" [checked] [ref=e73]
          - text: 显示新提醒
      - generic [ref=e74]:
        - heading "竖向与固定形状" [level=3] [ref=e75]
        - generic [ref=e76]:
          - generic [ref=e77]: 作业
          - generic [ref=e80]: 作业
          - generic [ref=e83]: 作业
          - generic [ref=e86]: 批量
          - generic [ref=e90]: 小组作答
          - generic [ref=e93]:
            - generic [ref=e94]: 开放型
            - generic [ref=e95]: 作业
        - heading "学习单元" [level=3] [ref=e96]
        - generic [ref=e97]:
          - generic [ref=e98]: 课堂
          - generic [ref=e100]: 图谱
          - generic [ref=e102]: 分组
          - generic [ref=e104]: 试卷
          - generic [ref=e106]: 考试
          - generic [ref=e108]: 课件
          - generic [ref=e110]: 公告
          - generic [ref=e112]: 视频
          - generic [ref=e114]: 作业
          - generic [ref=e116]: 实验
          - generic [ref=e118]: 直播
          - generic [ref=e120]: 音频
          - generic [ref=e122]: 讨论
          - generic [ref=e124]: 图文
          - generic [ref=e126]: 投票
          - generic [ref=e128]: 自测
          - generic [ref=e130]: 回放
          - generic [ref=e132]: 系统
          - generic [ref=e134]: 开放型作业
          - generic [ref=e136]: 单选
          - generic [ref=e138]: 拓展
          - generic [ref=e140]: 判断
          - generic [ref=e142]: 多选
          - generic [ref=e144]: 主观
          - generic [ref=e146]: 填空
        - heading "难度与分组" [level=3] [ref=e148]
        - generic [ref=e149]:
          - generic [ref=e150]: 1级
          - generic [ref=e152]: 2级
          - generic [ref=e154]: 3级
          - generic [ref=e156]: 4级
          - generic [ref=e158]: 5级
          - generic [ref=e160]: 学生自由分组
          - generic [ref=e162]: 老师指定分组
          - generic [ref=e164]: 随机分组
          - generic [ref=e166]: 自选分组
      - generic [ref=e168]:
        - heading "业务状态 · 20 / 24 / 32" [level=3] [ref=e169]
        - generic [ref=e170]:
          - generic [ref=e171]:
            - generic [ref=e172]: 进行中
            - generic [ref=e174]: 进行中
            - generic [ref=e177]: 未提交
            - generic [ref=e179]: 已结束
          - generic [ref=e181]:
            - generic [ref=e182]: 进行中
            - generic [ref=e184]: 进行中
            - generic [ref=e187]: 未提交
            - generic [ref=e189]: 已结束
        - generic [ref=e191]:
          - generic [ref=e192]:
            - generic [ref=e193]: 进行中
            - generic [ref=e195]: 进行中
            - generic [ref=e198]: 未提交
            - generic [ref=e200]: 已结束
          - generic [ref=e202]:
            - generic [ref=e203]: 进行中
            - generic [ref=e205]: 进行中
            - generic [ref=e208]: 未提交
            - generic [ref=e210]: 已结束
        - generic [ref=e212]:
          - generic [ref=e213]:
            - generic [ref=e214]: 进行中
            - generic [ref=e216]: 进行中
            - generic [ref=e219]: 未提交
            - generic [ref=e221]: 已结束
          - generic [ref=e223]:
            - generic [ref=e224]: 进行中
            - generic [ref=e226]: 进行中
            - generic [ref=e229]: 未提交
            - generic [ref=e231]: 已结束
        - heading "系统状态 · 20 / 24 / 28" [level=3] [ref=e233]
        - generic [ref=e234]:
          - generic [ref=e235]: 成功
          - generic [ref=e239]: 处理中
          - generic [ref=e243]: 警告
          - generic [ref=e247]: 错误
          - generic [ref=e251]: 信息
        - generic [ref=e255]:
          - generic [ref=e256]: 成功
          - generic [ref=e260]: 处理中
          - generic [ref=e264]: 警告
          - generic [ref=e268]: 错误
          - generic [ref=e272]: 信息
        - generic [ref=e276]:
          - generic [ref=e277]: 成功
          - generic [ref=e281]: 处理中
          - generic [ref=e285]: 警告
          - generic [ref=e289]: 错误
          - generic [ref=e293]: 信息
      - generic [ref=e297]:
        - heading "计分标记 · 单行 / 双行" [level=3] [ref=e298]
        - generic [ref=e299]:
          - generic [ref=e300]: small
          - generic [ref=e301]:
            - generic [ref=e302]:
              - generic [ref=e303]: 作业
              - generic [ref=e304]: 计分
            - generic [ref=e305]:
              - generic [ref=e306]:
                - generic [ref=e307]: 开放型
                - generic [ref=e308]: 作业
              - generic [ref=e309]: 计分
          - generic [ref=e310]:
            - generic [ref=e311]:
              - generic [ref=e312]: 作业
              - generic [ref=e313]: 计分
            - generic [ref=e314]:
              - generic [ref=e315]:
                - generic [ref=e316]: 开放型
                - generic [ref=e317]: 作业
              - generic [ref=e318]: 计分
        - generic [ref=e319]:
          - generic [ref=e320]: medium
          - generic [ref=e321]:
            - generic [ref=e322]:
              - generic [ref=e323]: 作业
              - generic [ref=e324]: 计分
            - generic [ref=e325]:
              - generic [ref=e326]:
                - generic [ref=e327]: 开放型
                - generic [ref=e328]: 作业
              - generic [ref=e329]: 计分
          - generic [ref=e330]:
            - generic [ref=e331]:
              - generic [ref=e332]: 作业
              - generic [ref=e333]: 计分
            - generic [ref=e334]:
              - generic [ref=e335]:
                - generic [ref=e336]: 开放型
                - generic [ref=e337]: 作业
              - generic [ref=e338]: 计分
        - generic [ref=e339]:
          - generic [ref=e340]: large
          - generic [ref=e341]:
            - generic [ref=e342]:
              - generic [ref=e343]: 作业
              - generic [ref=e344]: 计分
            - generic [ref=e345]:
              - generic [ref=e346]:
                - generic [ref=e347]: 开放型
                - generic [ref=e348]: 作业
              - generic [ref=e349]: 计分
          - generic [ref=e350]:
            - generic [ref=e351]:
              - generic [ref=e352]: 作业
              - generic [ref=e353]: 计分
            - generic [ref=e354]:
              - generic [ref=e355]:
                - generic [ref=e356]: 开放型
                - generic [ref=e357]: 作业
              - generic [ref=e358]: 计分
        - heading "新提醒 · 三档" [level=3] [ref=e359]
        - generic [ref=e360]:
          - generic [ref=e361]:
            - generic [ref=e362]: 作业
            - generic [ref=e363]: ，有新提醒
          - generic [ref=e365]:
            - generic [ref=e366]:
              - generic [ref=e367]: 开放型
              - generic [ref=e368]: 作业
            - generic [ref=e369]: ，有新提醒
        - generic [ref=e371]:
          - generic [ref=e372]:
            - generic [ref=e373]: 作业
            - generic [ref=e374]: ，有新提醒
          - generic [ref=e376]:
            - generic [ref=e377]:
              - generic [ref=e378]: 开放型
              - generic [ref=e379]: 作业
            - generic [ref=e380]: ，有新提醒
        - generic [ref=e382]:
          - generic [ref=e383]:
            - generic [ref=e384]: 作业
            - generic [ref=e385]: ，有新提醒
          - generic [ref=e387]:
            - generic [ref=e388]:
              - generic [ref=e389]: 开放型
              - generic [ref=e390]: 作业
            - generic [ref=e391]: ，有新提醒
        - heading "18 种标记类型" [level=3] [ref=e393]
        - generic [ref=e394]:
          - generic [ref=e395]:
            - generic [ref=e396]: 课堂
            - generic [ref=e397]: ，有新提醒
          - generic [ref=e399]:
            - generic [ref=e400]: 试卷
            - generic [ref=e401]: ，有新提醒
          - generic [ref=e403]:
            - generic [ref=e404]: 考试
            - generic [ref=e405]: ，有新提醒
          - generic [ref=e407]:
            - generic [ref=e408]: 课件
            - generic [ref=e409]: ，有新提醒
          - generic [ref=e411]:
            - generic [ref=e412]: 公告
            - generic [ref=e413]: ，有新提醒
          - generic [ref=e415]:
            - generic [ref=e416]: 视频
            - generic [ref=e417]: ，有新提醒
          - generic [ref=e419]:
            - generic [ref=e420]: 音频
            - generic [ref=e421]: ，有新提醒
          - generic [ref=e423]:
            - generic [ref=e424]: 讨论
            - generic [ref=e425]: ，有新提醒
          - generic [ref=e427]:
            - generic [ref=e428]: 图文
            - generic [ref=e429]: ，有新提醒
          - generic [ref=e431]:
            - generic [ref=e432]: 作业
            - generic [ref=e433]: ，有新提醒
          - generic [ref=e435]:
            - generic [ref=e436]: 实验
            - generic [ref=e437]: ，有新提醒
          - generic [ref=e439]:
            - generic [ref=e440]: 直播
            - generic [ref=e441]: ，有新提醒
          - generic [ref=e443]:
            - generic [ref=e444]: 图谱
            - generic [ref=e445]: ，有新提醒
          - generic [ref=e447]:
            - generic [ref=e448]: 自测
            - generic [ref=e449]: ，有新提醒
          - generic [ref=e451]:
            - generic [ref=e452]: 回放
            - generic [ref=e453]: ，有新提醒
          - generic [ref=e455]:
            - generic [ref=e456]: 分组
            - generic [ref=e457]: ，有新提醒
          - generic [ref=e459]:
            - generic [ref=e460]: 系统
            - generic [ref=e461]: ，有新提醒
          - generic [ref=e463]:
            - generic [ref=e464]:
              - generic [ref=e465]: 开放型
              - generic [ref=e466]: 作业
            - generic [ref=e467]: ，有新提醒
    - region [ref=e469]:
      - heading "20 组分类色" [level=2] [ref=e470]
      - paragraph [ref=e471]: 每组依次展示 Filled、Outlined、Solid；Solid 使用 700 字重。
      - generic [ref=e472]:
        - generic [ref=e473]:
          - code [ref=e474]: classroom
          - generic [ref=e475]:
            - generic [ref=e476]: 课堂
            - generic [ref=e479]: 课堂
            - generic [ref=e482]: 课堂
        - generic [ref=e485]:
          - code [ref=e486]: olive
          - generic [ref=e487]:
            - generic [ref=e488]: 分组
            - generic [ref=e491]: 分组
            - generic [ref=e494]: 分组
        - generic [ref=e497]:
          - code [ref=e498]: paper
          - generic [ref=e499]:
            - generic [ref=e500]: 试卷
            - generic [ref=e503]: 试卷
            - generic [ref=e506]: 试卷
        - generic [ref=e509]:
          - code [ref=e510]: exam
          - generic [ref=e511]:
            - generic [ref=e512]: 考试
            - generic [ref=e515]: 考试
            - generic [ref=e518]: 考试
        - generic [ref=e521]:
          - code [ref=e522]: courseware
          - generic [ref=e523]:
            - generic [ref=e524]: 课件
            - generic [ref=e527]: 课件
            - generic [ref=e530]: 课件
        - generic [ref=e533]:
          - code [ref=e534]: gold
          - generic [ref=e535]:
            - generic [ref=e536]: 公告
            - generic [ref=e539]: 公告
            - generic [ref=e542]: 公告
        - generic [ref=e545]:
          - code [ref=e546]: purple
          - generic [ref=e547]:
            - generic [ref=e548]: 视频
            - generic [ref=e551]: 视频
            - generic [ref=e554]: 视频
        - generic [ref=e557]:
          - code [ref=e558]: assignment
          - generic [ref=e559]:
            - generic [ref=e560]: 作业
            - generic [ref=e563]: 作业
            - generic [ref=e566]: 作业
        - generic [ref=e569]:
          - code [ref=e570]: live
          - generic [ref=e571]:
            - generic [ref=e572]: 直播
            - generic [ref=e575]: 直播
            - generic [ref=e578]: 直播
        - generic [ref=e581]:
          - code [ref=e582]: audio
          - generic [ref=e583]:
            - generic [ref=e584]: 音频
            - generic [ref=e587]: 音频
            - generic [ref=e590]: 音频
        - generic [ref=e593]:
          - code [ref=e594]: magenta
          - generic [ref=e595]:
            - generic [ref=e596]: 讨论
            - generic [ref=e599]: 讨论
            - generic [ref=e602]: 讨论
        - generic [ref=e605]:
          - code [ref=e606]: brown
          - generic [ref=e607]:
            - generic [ref=e608]: 图文
            - generic [ref=e611]: 图文
            - generic [ref=e614]: 图文
        - generic [ref=e617]:
          - code [ref=e618]: vote
          - generic [ref=e619]:
            - generic [ref=e620]: 投票
            - generic [ref=e623]: 投票
            - generic [ref=e626]: 投票
        - generic [ref=e629]:
          - code [ref=e630]: self-test
          - generic [ref=e631]:
            - generic [ref=e632]: 自测
            - generic [ref=e635]: 自测
            - generic [ref=e638]: 自测
        - generic [ref=e641]:
          - code [ref=e642]: slate
          - generic [ref=e643]:
            - generic [ref=e644]: 回放
            - generic [ref=e647]: 回放
            - generic [ref=e650]: 回放
        - generic [ref=e653]:
          - code [ref=e654]: difficulty1
          - generic [ref=e655]:
            - generic [ref=e656]: 1级
            - generic [ref=e659]: 1级
            - generic [ref=e662]: 1级
        - generic [ref=e665]:
          - code [ref=e666]: difficulty2
          - generic [ref=e667]:
            - generic [ref=e668]: 2级
            - generic [ref=e671]: 2级
            - generic [ref=e674]: 2级
        - generic [ref=e677]:
          - code [ref=e678]: difficulty3
          - generic [ref=e679]:
            - generic [ref=e680]: 3级
            - generic [ref=e683]: 3级
            - generic [ref=e686]: 3级
        - generic [ref=e689]:
          - code [ref=e690]: difficulty4
          - generic [ref=e691]:
            - generic [ref=e692]: 4级
            - generic [ref=e695]: 4级
            - generic [ref=e698]: 4级
        - generic [ref=e701]:
          - code [ref=e702]: difficulty5
          - generic [ref=e703]:
            - generic [ref=e704]: 5级
            - generic [ref=e707]: 5级
            - generic [ref=e710]: 5级
    - region [ref=e713]:
      - heading "完整尺寸" [level=2] [ref=e714]
      - generic [ref=e715]:
        - generic [ref=e716]:
          - heading "20px" [level=3] [ref=e717]
          - generic [ref=e718]:
            - generic [ref=e719]:
              - generic [ref=e720]: 期末复习
              - button "移除标签 期末复习" [ref=e724] [cursor=pointer]
            - generic [ref=e727]:
              - generic [ref=e728]: 期末复习
              - button "移除标签 期末复习" [ref=e732] [cursor=pointer]
            - generic [ref=e735]:
              - generic [ref=e736]: 期末复习
              - button "移除标签 期末复习" [ref=e740] [cursor=pointer]
        - generic [ref=e743]:
          - heading "24px" [level=3] [ref=e744]
          - generic [ref=e745]:
            - generic [ref=e746]:
              - generic [ref=e747]: 期末复习
              - button "移除标签 期末复习" [ref=e751] [cursor=pointer]
            - generic [ref=e754]:
              - generic [ref=e755]: 期末复习
              - button "移除标签 期末复习" [ref=e759] [cursor=pointer]
            - generic [ref=e762]:
              - generic [ref=e763]: 期末复习
              - button "移除标签 期末复习" [ref=e767] [cursor=pointer]
        - generic [ref=e770]:
          - heading "28px" [level=3] [ref=e771]
          - generic [ref=e772]:
            - generic [ref=e773]:
              - generic [ref=e774]: 期末复习
              - button "移除标签 期末复习" [ref=e778] [cursor=pointer]
            - generic [ref=e781]:
              - generic [ref=e782]: 期末复习
              - button "移除标签 期末复习" [ref=e786] [cursor=pointer]
            - generic [ref=e789]:
              - generic [ref=e790]: 期末复习
              - button "移除标签 期末复习" [ref=e794] [cursor=pointer]
        - generic [ref=e798]:
          - generic [ref=e799]: 紧凑默认
          - generic [ref=e800]: 静态 20
          - generic [ref=e803]:
            - generic [ref=e804]: 可关闭 24
            - button "移除标签 可关闭 24" [ref=e806] [cursor=pointer]
    - region [ref=e809]:
      - heading "独立操作" [level=2] [ref=e810]
      - generic [ref=e811]:
        - generic [ref=e812]:
          - generic [ref=e813]: 静态标签
          - generic [ref=e816]:
            - generic [ref=e817]: 已锁定
            - button "移除标签 已锁定" [disabled] [ref=e819]
          - generic [ref=e822]:
            - link "第三章课件" [ref=e823] [cursor=pointer]:
              - /url: "#tag"
            - button "移除标签 第三章课件" [ref=e827] [cursor=pointer]
          - link "学堂在线 （新标签页打开）" [ref=e831] [cursor=pointer]:
            - /url: https://www.xuetangx.com/
            - generic [ref=e832]: 学堂在线
            - generic [ref=e835]: （新标签页打开）
          - generic [ref=e836]:
            - link "禁用链接" [disabled] [ref=e837]
            - button "移除标签 禁用链接" [disabled] [ref=e840]
          - generic [ref=e843] [cursor=pointer]:
            - checkbox "可选分类" [ref=e844]
            - generic [ref=e845]: 可选分类
        - generic [ref=e847]:
          - generic [ref=e848]: neutral · filled
          - generic [ref=e851]: brand · filled
          - generic [ref=e854]: neutral · outlined
          - generic [ref=e857]: brand · outlined
          - generic [ref=e860]: neutral · solid
          - generic [ref=e863]: brand · solid
        - status [ref=e866]: 尚未操作
    - region [ref=e867]:
      - heading "选择与筛选" [level=2] [ref=e868]
      - generic [ref=e869]:
        - radiogroup "资源类型" [ref=e870]:
          - generic [ref=e872]:
            - generic [ref=e873] [cursor=pointer]:
              - radio "全部" [checked] [ref=e874]
              - generic [ref=e875]: 全部
            - generic [ref=e879] [cursor=pointer]:
              - radio "试卷" [ref=e880]
              - generic [ref=e881]: 试卷
            - generic [ref=e883] [cursor=pointer]:
              - radio "作业" [ref=e884]
              - generic [ref=e885]: 作业
            - generic [ref=e887]:
              - radio "未开放" [disabled] [ref=e888]
              - generic [ref=e889]: 未开放
            - button "清空资源类型" [ref=e891] [cursor=pointer]:
              - generic [ref=e892]: 清空
        - group "资源筛选" [ref=e893]:
          - generic [ref=e895]:
            - generic [ref=e896] [cursor=pointer]:
              - checkbox "试卷" [checked] [ref=e897]
              - generic [ref=e898]: 试卷
            - generic [ref=e902] [cursor=pointer]:
              - checkbox "作业" [ref=e903]
              - generic [ref=e904]: 作业
            - generic [ref=e906]:
              - checkbox "未开放" [disabled] [ref=e907]
              - generic [ref=e908]: 未开放
            - button "清空资源筛选" [ref=e910] [cursor=pointer]:
              - generic [ref=e911]: 清空
        - button "提交筛选" [ref=e913] [cursor=pointer]
    - region "管理标签" [ref=e915]:
      - heading "管理标签" [level=3] [ref=e916]
      - generic [ref=e917]:
        - generic [ref=e918]:
          - generic [ref=e919]: 期末复习
          - button "移除标签 期末复习" [ref=e921] [cursor=pointer]
        - generic [ref=e924]:
          - generic [ref=e925]: 第三章课件
          - button "移除标签 第三章课件" [ref=e927] [cursor=pointer]
        - generic [ref=e930]:
          - generic [ref=e931]: 个人笔记
          - button "移除标签 个人笔记" [ref=e933] [cursor=pointer]
        - button "添加示例标签" [disabled] [ref=e936]
      - generic [ref=e938]:
        - checkbox "模拟移除失败" [ref=e939]
        - text: 模拟移除失败
      - status [ref=e940]: 可移除标签，或模拟失败后的恢复。
    - region [ref=e941]:
      - heading "长名称与嵌套浅色" [level=2] [ref=e942]
      - generic [ref=e944]:
        - generic [ref=e945]: 面向跨学科项目的人工智能课程期末复习与课堂资料整理
        - button "移除标签 面向跨学科项目的人工智能课程期末复习与课堂资料整理" [ref=e949] [cursor=pointer]
      - group [ref=e952]:
        - generic "查看完整名称" [ref=e953] [cursor=pointer]
      - generic [ref=e954]:
        - generic [ref=e955]: 浅色区域
        - generic [ref=e956]: 试卷
        - generic [ref=e959]: 试卷
    - paragraph [ref=e962]: 三批视觉均已确认，包含标签选择、创建管理及关闭按钮右侧留白修订；对比度不足单独保留记录。
```

# Test source

```ts
  1   | import { writeFileSync } from "node:fs";
  2   | import { expect, test, type Locator } from "@playwright/test";
  3   | import { resolveColor, tagColorProfiles, type ColorTheme } from "../../packages/foundations/src/index";
  4   | import { getTagColorConsumers, measureTagColorRecipe } from "../../scripts/token-foundation-outputs.mjs";
  5   | 
  6   | const rgba = (css: string) => { const values = css.match(/[\d.]+/g)!.map(Number); return { rgb: values.slice(0, 3), alpha: values[3] ?? 1 }; };
  7   | const saveEvidence = process.env.RAIN_UPDATE_TAG_EVIDENCE === "1";
  8   | 
  9   | test("Tag compound paint matches real browser pixels across appearances and action states", async ({ page }) => {
  10  |   test.setTimeout(60_000);
  11  |   await page.goto("/#tag");
  12  |   const recipes = getTagColorConsumers().colorRecipeConsumers[0]!.recipes;
  13  |   const samples: object[] = [];
  14  |   async function sample(target: Locator, expected: number[], context: object) {
  15  |     const png = await target.screenshot();
  16  |     const pixels = await page.evaluate(async (base64) => {
  17  |       const image = new Image(); image.src = `data:image/png;base64,${base64}`; await image.decode();
  18  |       const canvas = document.createElement("canvas"); canvas.width = image.width; canvas.height = image.height;
  19  |       const context = canvas.getContext("2d")!; context.drawImage(image, 0, 0);
  20  |       return {
  21  |         background: [...context.getImageData(3, Math.floor(image.height / 2), 1, 1).data].slice(0, 3),
  22  |         edge: [...context.getImageData(Math.floor(image.width / 2), 0, 1, 1).data].slice(0, 3),
  23  |       };
  24  |     }, png.toString("base64"));
  25  |     const actual = pixels.background;
  26  |     samples.push({ ...context, actual, expected, borderPixel: pixels.edge });
  27  |     for (const channel of [0, 1, 2]) expect(Math.abs(actual[channel]! - expected[channel]!), JSON.stringify({ ...context, actual, expected })).toBeLessThanOrEqual(2);
  28  |     return pixels.edge;
  29  |   }
  30  |   for (const theme of ["light", "dark"]) for (const color of ["paper", "neutral"]) for (const appearance of ["filled", "outlined", "solid"]) {
  31  |     await page.getByRole("combobox", { name: "主题", exact: true }).selectOption(theme);
  32  |     await page.getByRole("combobox", { name: "交互示例配色" }).selectOption(color);
  33  |     await page.getByRole("combobox", { name: "交互示例外观" }).selectOption(appearance);
  34  |     const recipe = recipes.find(({ id }) => id === `tag-${color}-${appearance}`)!;
  35  |     const choice = page.getByRole("checkbox", { name: "可选分类" }).locator("..");
  36  |     await choice.scrollIntoViewIfNeeded(); await page.mouse.move(0, 0);
  37  |     let borderPixel: number[] | undefined;
  38  |     for (const state of ["default", "hover", "pressed"]) {
  39  |       if (state === "hover") await choice.hover();
  40  |       if (state === "pressed") await page.mouse.down();
  41  |       const paint = measureTagColorRecipe(recipe, theme, "Background/Neutral/1", state);
  42  |       const edge = await sample(choice, paint.background.rgb, { theme, color, appearance, state });
  43  |       if (appearance === "outlined" && borderPixel) expect(edge).toEqual(borderPixel);
  44  |       borderPixel = edge;
  45  |     }
  46  |     await page.mouse.move(0, 0); await page.mouse.up();
  47  |     const disabled = page.locator('[data-rain-id="ui-tag"]').filter({ hasText: "已锁定" });
  48  |     await sample(disabled, measureTagColorRecipe(recipe, theme, "Background/Neutral/1", "disabled").background.rgb, { theme, color, appearance, state: "disabled" });
  49  |     const close = page.locator(`[data-tag-size="24"] [data-appearance="${appearance}"] [data-slot="remove-action"]`);
> 50  |     await close.hover();
      |                 ^ Error: locator.hover: Test timeout of 60000ms exceeded.
  51  |     for (const state of ["close-hover", "close-pressed"]) {
  52  |       if (state === "close-pressed") await page.mouse.down();
  53  |       await sample(close, measureTagColorRecipe(recipe, theme, "Background/Neutral/1", state).background.rgb, { theme, color, appearance, state });
  54  |     }
  55  |     await page.mouse.move(0, 0); await page.mouse.up();
  56  |   }
  57  |   if (saveEvidence) writeFileSync("evidence/runtime/tag-batch-one/paint-samples.json", JSON.stringify({ source: "Chromium screenshot pixels from the actual #tag page", tolerance: 2, samples }, null, 2) + "\n");
  58  | });
  59  | 
  60  | test("Tag paints all source profiles, complete sizes and an isolated Light scope", async ({ page }, testInfo) => {
  61  |   await page.setViewportSize({ width: 1440, height: 1000 });
  62  |   await page.goto("/#tag");
  63  |   await expect(page.getByRole("heading", { name: "Tag 标签", exact: true })).toBeVisible();
  64  |   for (const theme of ["light", "dark"] as ColorTheme[]) {
  65  |     await page.getByRole("combobox", { name: "主题", exact: true }).selectOption(theme);
  66  |     expect(rgba(await page.locator("#tag-title").evaluate((element) => getComputedStyle(element).color))).toEqual(resolveColor("Text/Neutral/1", theme));
  67  |     expect(rgba(await page.getByTestId("tag-light-island").evaluate((element) => getComputedStyle(element).color))).toEqual(resolveColor("Text/Neutral/1", "light"));
  68  |     for (const surface of ["1", "2", "3"]) {
  69  |       await page.getByRole("combobox", { name: "标签所在底色" }).selectOption(surface);
  70  |       const samples = await page.locator('[data-profile] [data-rain-id="ui-tag"]').evaluateAll((elements) => elements.map((element) => {
  71  |         const css = getComputedStyle(element);
  72  |         return { profile: element.getAttribute("data-color")!, appearance: element.getAttribute("data-appearance")!, text: css.color, background: css.backgroundColor, border: css.borderTopColor, weight: css.fontWeight, parent: getComputedStyle(element.closest(".tag-page__samples")!).backgroundColor };
  73  |       }));
  74  |       expect(samples).toHaveLength(60);
  75  |       for (const sample of samples) {
  76  |         const family = tagColorProfiles[sample.profile as keyof typeof tagColorProfiles].family;
  77  |         expect(rgba(sample.text), `${theme}/${sample.profile}/${sample.appearance}`).toEqual(resolveColor(sample.appearance === "solid" ? "OnColor/1" : `Text/${family}/1`, theme));
  78  |         expect(rgba(sample.parent)).toEqual(resolveColor(`Background/Neutral/${surface}`, theme));
  79  |         expect(sample.weight).toBe(sample.appearance === "solid" ? "700" : "400");
  80  |         if (sample.appearance === "outlined") { expect(rgba(sample.background).alpha).toBe(0); expect(rgba(sample.border)).toEqual(resolveColor(`Border/${family}/1`, theme)); }
  81  |         else { expect(rgba(sample.background)).toEqual(resolveColor(`Fill/${family}/${sample.appearance === "solid" ? "Solid" : "Alpha"}/1`, theme)); expect(rgba(sample.border).alpha).toBe(0); }
  82  |       }
  83  |     }
  84  |     await page.getByRole("combobox", { name: "标签所在底色" }).selectOption("1");
  85  |     await page.screenshot({ fullPage: true, path: saveEvidence ? `evidence/runtime/tag-batch-one/${theme}.png` : testInfo.outputPath(`${theme}.png`) });
  86  |   }
  87  |   const island = page.getByTestId("tag-light-island").locator('[data-rain-id="ui-tag"][data-appearance="filled"]');
  88  |   expect(rgba(await island.evaluate((element) => getComputedStyle(element).color))).toEqual(resolveColor("Text/TagPaper/1", "light"));
  89  |   const dimensions = await page.locator('[data-tag-size] [data-rain-id="ui-tag"]').evaluateAll((tags) => tags.map((tag) => {
  90  |     const css = getComputedStyle(tag), close = tag.querySelector('[data-slot="remove-action"]')!, icon = close.querySelector(".rain-icon")!;
  91  |     const content = tag.querySelector('[data-slot="content"]')!, box = close.getBoundingClientRect(), contentBox = content.getBoundingClientRect();
  92  |     const rootBox = tag.getBoundingClientRect();
  93  |     return { size: tag.getAttribute("data-size"), height: css.height, font: css.fontSize, line: css.lineHeight, padding: css.paddingLeft, close: [box.width, box.height], icon: [icon.getBoundingClientRect().width, icon.getBoundingClientRect().height], extraGap: box.left + parseFloat(getComputedStyle(close, "::after").left) - contentBox.right, inset: [box.top - rootBox.top, rootBox.bottom - box.bottom] };
  94  |   }));
  95  |   for (const item of dimensions) expect(item).toEqual({ size: item.size, height: `${item.size}px`, font: item.size === "20" ? "12px" : "13px", line: item.size === "20" ? "14px" : "18px", padding: item.size === "20" ? "6px" : item.size === "24" ? "8px" : "12px", close: [Number(item.size) - 2, Number(item.size) - 2], icon: item.size === "20" ? [12, 12] : [14, 14], extraGap: 0, inset: [1, 1] });
  96  |   const longSection = page.locator('[aria-labelledby="tag-long-title"]');
  97  |   const long = longSection.locator(".tag-page__long [data-slot=label]");
  98  |   expect(await long.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true);
  99  |   await page.getByText("查看完整名称", { exact: true }).focus(); await page.keyboard.press("Enter");
  100 |   await expect(longSection.locator("details[open] p")).toBeVisible();
  101 | });
  102 | 
  103 | test("native selection, link actions, removal focus and form values remain independent", async ({ page }) => {
  104 |   await page.goto("/#tag");
  105 |   const radioGroup = page.getByRole("radiogroup", { name: "资源类型" });
  106 |   await radioGroup.getByRole("radio", { name: "全部" }).focus(); await page.keyboard.press("ArrowRight");
  107 |   await expect(radioGroup.getByRole("radio", { name: "试卷" })).toBeChecked();
  108 |   await page.keyboard.press("ArrowRight"); await page.keyboard.press("ArrowRight");
  109 |   await expect(radioGroup.getByRole("radio", { name: "全部" })).toBeChecked();
  110 |   await page.keyboard.press("Enter"); await expect(radioGroup.getByRole("radio", { name: "全部" })).toBeChecked();
  111 |   const choice = page.getByRole("checkbox", { name: "可选分类" }), root = choice.locator("..");
  112 |   await expect(root.locator('[data-slot="selection-mark"]')).toHaveCount(0);
  113 |   await choice.focus(); await page.keyboard.press("Space");
  114 |   await expect(root.locator('[data-slot="label"] + [data-slot="selection-mark"]')).toHaveCount(1);
  115 |   const multiple = page.getByRole("group", { name: "资源筛选" });
  116 |   await multiple.getByRole("checkbox", { name: "作业" }).locator("..").click();
  117 |   await expect(multiple.getByRole("checkbox", { name: "作业" })).toBeChecked();
  118 |   await page.getByRole("button", { name: "提交筛选" }).click(); await expect(page.getByTestId("tag-action-status")).toHaveText("已提交 paper、assignment");
  119 |   const link = page.locator('[data-rain-id="ui-link-tag"]').filter({ has: page.getByRole("link", { name: "第三章课件", exact: true }) });
  120 |   await link.getByRole("button", { name: "移除标签 第三章课件" }).click();
  121 |   await expect(page.getByTestId("tag-action-status")).toHaveText("已移除链接标签");
  122 |   await expect(page.getByRole("button", { name: "恢复链接标签" })).toBeFocused();
  123 |   await page.getByRole("button", { name: "恢复链接标签" }).click();
  124 |   await expect(page.getByRole("link", { name: "第三章课件", exact: true })).toBeFocused();
  125 |   const external = page.getByRole("link", { name: /^学堂在线\s*（新标签页打开）$/ });
  126 |   await expect(external).toHaveAttribute("rel", "noopener noreferrer"); await expect(external).toHaveAttribute("target", "_blank");
  127 |   const collection = page.getByRole("region", { name: "管理标签" });
  128 |   await collection.getByRole("button", { name: "移除标签 期末复习" }).click();
  129 |   await expect(collection.getByRole("button", { name: "移除标签 第三章课件" })).toBeFocused();
  130 |   await collection.getByRole("button", { name: "撤销移除" }).click();
  131 |   await expect(collection.getByRole("button", { name: "移除标签 期末复习" })).toBeFocused();
  132 | });
  133 | 
  134 | test("Tag pointer feedback and keyboard Focus preserve the shared rules including forced colors", async ({ page }) => {
  135 |   await page.goto("/#tag");
  136 |   const choice = page.getByRole("checkbox", { name: "可选分类" }), root = choice.locator(".."), overlay = root.locator('[data-slot="interaction-overlay"]');
  137 |   await root.hover(); await expect(overlay).toHaveCSS("opacity", "0.12");
  138 |   await page.mouse.down(); await expect(overlay).toHaveCSS("opacity", "0.18"); await page.mouse.up();
  139 |   await choice.focus(); await page.keyboard.press("Shift+Tab"); await page.keyboard.press("Tab");
  140 |   await expect(root).toHaveCSS("outline-width", "1px"); await expect(root).toHaveCSS("outline-offset", "0px");
  141 |   expect(await root.evaluate((element) => getComputedStyle(element).boxShadow)).toContain("0px 0px 0px 3px");
  142 |   await page.emulateMedia({ forcedColors: "active" });
  143 |   await expect(root).toHaveCSS("outline-width", "2px"); await expect(root).toHaveCSS("box-shadow", "none");
  144 |   await expect(overlay).not.toBeVisible();
  145 |   const selectedMark = page.getByRole("radio", { name: "全部", exact: true }).locator("..").locator('[data-slot="selection-mark"]');
  146 |   expect(await selectedMark.locator(".rain-icon").evaluate((icon) => getComputedStyle(icon).color)).toBe(await selectedMark.evaluate((mark) => getComputedStyle(mark).color));
  147 |   const disabled = page.locator('[data-rain-id="ui-tag"]').filter({ hasText: "已锁定" });
  148 |   await expect(disabled).toHaveCSS("opacity", "1");
  149 | });
  150 | 
```