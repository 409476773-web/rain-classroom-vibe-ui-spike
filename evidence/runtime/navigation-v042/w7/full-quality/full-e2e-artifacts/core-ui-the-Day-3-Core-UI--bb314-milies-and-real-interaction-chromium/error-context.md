# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: core-ui.spec.ts >> the Day 3 Core UI page exposes truthful families and real interaction
- Location: tests/e2e/core-ui.spec.ts:117:1

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('[data-slot="component-family"]')
Expected: 6
Received: 9
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('[data-slot="component-family"]')
    14 × locator resolved to 9 elements
       - unexpected value "9"

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回 Playground" [ref=e5] [cursor=pointer]:
      - /url: "#overview"
    - generic [ref=e6]:
      - generic [ref=e7]:
        - paragraph [ref=e8]: RAIN NEXT · COMPONENT OVERVIEW
        - heading "Core UI，把高频动作先做准" [active] [level=1] [ref=e9]
        - paragraph [ref=e10]: 这里展示六个可运行的基础家族。Input 与 Select 各有一个完整用法入口， 当前运行视觉已确认，组件仍为未发布的本地候选。
        - link "查看 Checkbox 与分组表单" [ref=e11] [cursor=pointer]:
          - /url: "#checkbox"
        - link "打开分类选择 Playground 与源码检索" [ref=e13] [cursor=pointer]:
          - /url: "#selection-playground"
        - link "查看 Radio 与单选分组" [ref=e15] [cursor=pointer]:
          - /url: "#radio"
        - link "查看四类选择卡片" [ref=e17] [cursor=pointer]:
          - /url: "#selection-cards"
        - link "体验预览、关联字段与本页全选" [ref=e19] [cursor=pointer]:
          - /url: "#selection-patterns"
        - link "查看 DropdownMenu 与 Popover" [ref=e21] [cursor=pointer]:
          - /url: "#dropdown"
      - generic "Core UI 批次摘要" [ref=e23]:
        - generic [ref=e24]:
          - term [ref=e25]: Families
          - definition [ref=e26]: "06"
        - generic [ref=e27]:
          - term [ref=e28]: Densities
          - definition [ref=e29]: "02"
        - generic [ref=e30]:
          - term [ref=e31]: Publication
          - definition [ref=e32]: 未发布
        - generic [ref=e33]:
          - term [ref=e34]: Human Gate
          - definition [ref=e35]: 分批验收
  - generic [ref=e36]:
    - generic [ref=e37]:
      - generic [ref=e38]: "01"
      - generic [ref=e39]:
        - heading "Button" [level=2] [ref=e40]
        - paragraph [ref=e41]: 操作层级与危险意图分开；Loading 保持可聚焦，但不会重复触发。
      - generic [ref=e42]: prototype-ready
    - paragraph [ref=e43]:
      - link "体验 TextButton 文字按钮" [ref=e44] [cursor=pointer]:
        - /url: "#text-button"
      - text: ·
      - link "查看新 Token 按钮与尺寸对照" [ref=e46] [cursor=pointer]:
        - /url: "#button-tokens"
      - text: ·
      - link "体验 IconButton 图标按钮" [ref=e48] [cursor=pointer]:
        - /url: "#icon-button"
      - text: ·
      - link "体验 QuestionNumber 题号按钮" [ref=e50] [cursor=pointer]:
        - /url: "#question-number"
      - text: ·
      - link "体验 OptionButton 选项按钮" [ref=e52] [cursor=pointer]:
        - /url: "#option-button"
    - paragraph [ref=e54]: 当前按钮 Token 配方已完成限定范围的视觉验收，危险文字的精确对比度例外继续保留。危险主按钮使用红底反白，悬停加深；加载仅背景与边框保留 82%，文字和图标保持原色。禁用保留各自色系与原有淡化。
    - generic [ref=e55]:
      - generic [ref=e56]:
        - generic [ref=e57]:
          - generic [ref=e58]:
            - generic [ref=e59]: 三级操作层级
            - generic [ref=e60]: 36px 是常用默认
          - generic [ref=e61]:
            - button "创建课程" [ref=e62] [cursor=pointer]
            - button "继续编辑" [ref=e64] [cursor=pointer]
            - button "保存草稿" [ref=e66] [cursor=pointer]
          - status [ref=e68]: 主操作已触发 0 次
        - generic [ref=e69]:
          - generic [ref=e70]:
            - generic [ref=e71]: 五档高度
            - generic [ref=e72]: 28 / 32 / 36 / 40 / 48
          - generic [ref=e73]:
            - button "28 · Mini" [ref=e74] [cursor=pointer]
            - button "32 · Small" [ref=e76] [cursor=pointer]
            - button "36 · Medium" [ref=e78] [cursor=pointer]
            - button "40 · Large" [ref=e80] [cursor=pointer]
            - button "48 · XL" [ref=e82] [cursor=pointer]
            - button "紧凑筛选" [ref=e85] [cursor=pointer]
          - paragraph [ref=e87]: 36 是大多数页面的最大常用尺寸；40 只用于按钮很多的页面级操作区；48 只用于极少数大型重要操作。
        - generic [ref=e88]:
          - generic [ref=e89]:
            - generic [ref=e90]: 危险操作也有三级
            - generic [ref=e91]: 红色已通过本次 Button 视觉验收
          - generic [ref=e92]:
            - button "删除课程" [ref=e93] [cursor=pointer]
            - button "移出班级" [ref=e95] [cursor=pointer]
            - button "确认永久删除" [ref=e97] [cursor=pointer]
          - paragraph [ref=e99]: 普通页面里的删除使用低强调红；只有最终确认中的关键危险动作使用实心红。
        - generic [ref=e100]:
          - generic [ref=e101]:
            - generic [ref=e102]: 加载中
            - generic [ref=e103]: 沿用 Rain 的统一图形与旋转动效
          - generic [ref=e104]:
            - button "保存课程，正在处理" [disabled] [ref=e105]:
              - generic [ref=e107]: 保存课程
            - button "保存中…" [disabled] [ref=e108]
            - button "清理记录" [disabled] [ref=e111]
          - paragraph [ref=e114]: 默认保留原文案；业务确有必要时才明确换成“保存中…”一类进度文案。
        - generic [ref=e115]:
          - generic [ref=e116]:
            - generic [ref=e117]: 停用
            - generic [ref=e118]: 保留原层级，不压成同一种灰
          - generic [ref=e119]:
            - button "主按钮停用" [disabled] [ref=e120]
            - button "次按钮停用" [disabled] [ref=e122]
            - button "三级按钮停用" [disabled] [ref=e124]
            - button "危险按钮停用" [disabled] [ref=e126]
        - generic [ref=e128]:
          - generic [ref=e129]:
            - generic [ref=e130]: 真实悬停、按下与键盘外圈
            - generic [ref=e131]: 用鼠标操作，或按 Tab 逐个体验
          - generic [ref=e132]:
            - button "体验悬停和按下" [ref=e133] [cursor=pointer]
            - button "用 Tab 查看焦点" [ref=e135] [cursor=pointer]
            - button "危险操作也用蓝色焦点" [ref=e137] [cursor=pointer]
          - paragraph [ref=e139]: 反馈状态不位移；键盘焦点使用已确认的深色细圈与浅色外圈，颜色和几何由共享 Focus 配方提供。
        - generic [ref=e140]:
          - generic [ref=e141]:
            - generic [ref=e142]: 宽度与长文案
            - generic [ref=e143]: 全宽必须显式开启
          - generic [ref=e144]:
            - generic [ref=e145]:
              - generic [ref=e146]: 自然宽度
              - button "为本课程批量生成课堂练习" [ref=e147] [cursor=pointer]
            - generic [ref=e149]:
              - generic [ref=e150]: 窄栏整行
              - button "窄栏中的整行主要操作" [ref=e152] [cursor=pointer]
            - generic [ref=e154]:
              - generic [ref=e155]: 严格受限时才省略，完整文案保留在 title
              - button "为本课程批量生成全部章节的课堂练习" [ref=e157] [cursor=pointer]
      - generic [ref=e159]:
        - generic [ref=e160]:
          - term [ref=e161]: 适合用在
          - definition [ref=e162]: 触发一个明确动作，例如保存、创建、删除。
        - generic [ref=e163]:
          - term [ref=e164]: 不适合
          - definition [ref=e165]: 页面导航、纯图标动作、状态文字或整张卡片点击。纯图标动作留给 IconButton。
        - generic [ref=e166]:
          - term [ref=e167]: 外观与状态
          - definition [ref=e168]: Primary / Secondary / Tertiary 与 Default / Danger 分开组合；含 Hover、Pressed、Loading、Disabled、Focus。
        - generic [ref=e169]:
          - term [ref=e170]: 密度
          - definition [ref=e171]: 五档为 28 / 32 / 36 / 40 / 48；未指定时 Compact 使用 32、Default 使用 36。
        - generic [ref=e172]:
          - term [ref=e173]: 结构
          - definition [ref=e174]: Root / Leading / Label / Trailing / Loading indicator。
        - generic [ref=e175]:
          - term [ref=e176]: 无障碍
          - definition [ref=e177]: 原生按钮且必须有可见文字；Loading 可聚焦并阻止重复操作；Danger 的焦点仍是品牌蓝。
        - generic [ref=e178]:
          - term [ref=e179]: 参考成熟库
          - definition [ref=e180]: 学习 shadcn/ui 的组合清晰度，学习 Ant Design 的完整状态覆盖。
        - generic [ref=e181]:
          - term [ref=e182]: Rain 来源
          - definition [ref=e183]: 复用 Button + TextButton 的视觉层级、五档尺寸依据和全局加载图形；40 档沿用 Rain Next 已确认的按钮尺寸。
        - generic [ref=e184]:
          - term [ref=e185]: 修改边界
          - definition [ref=e186]: 可换文案和受治理图标；全宽需显式开启；不能把导航、确认流程或业务请求塞进 Button。
  - generic [ref=e187]:
    - generic [ref=e188]:
      - generic [ref=e189]: "02"
      - generic [ref=e190]:
        - heading "Input" [level=2] [ref=e191]
        - paragraph [ref=e192]: 一套完整输入框，支持描边、填充和底线外观。SearchInput 是同一家族的搜索快捷用法。
      - generic [ref=e193]: prototype-ready
    - generic [ref=e194]:
      - generic [ref=e195]:
        - generic [ref=e196]: 课程名称
        - textbox "课程名称" [ref=e198]:
          - /placeholder: 输入课程名称
      - generic [ref=e200]:
        - paragraph [ref=e201]: 四档尺寸、单位与前后文案、内部按钮、清空、计数和搜索集中在详情页。
        - link "查看 Input 全部用法" [ref=e202] [cursor=pointer]:
          - /url: "#input"
  - generic [ref=e204]:
    - generic [ref=e205]:
      - heading "InputNumber 数字输入框" [level=2] [ref=e206]
      - paragraph [ref=e207]: 数量与分值填写，左右增减、范围与小数校验，继承 Input 的三种外观。
      - link "查看 InputNumber 全部用法" [ref=e208] [cursor=pointer]:
        - /url: "#input-number"
    - generic [ref=e211]:
      - generic [ref=e212]: 练习题数
      - generic [ref=e213]:
        - generic [ref=e214]:
          - button "减少练习题数" [ref=e215] [cursor=pointer]
          - generic [ref=e217]:
            - spinbutton "练习题数" [ref=e218]: "3"
            - generic [ref=e219]: 题
          - button "增加练习题数" [ref=e220] [cursor=pointer]
        - generic [ref=e222]: 单位：题
  - generic [ref=e223]:
    - generic [ref=e224]:
      - heading "Alert 提示" [level=2] [ref=e225]
      - paragraph [ref=e226]: 持续的页面提示，四种状态、可组合内容与操作，保留 Rain 轻量视觉。
      - link "查看 Alert 全部用法" [ref=e227] [cursor=pointer]:
        - /url: "#alert"
    - generic [ref=e229]: 成绩发布后，学生才能查看批改结果。
  - generic [ref=e233]:
    - heading "Breadcrumb 面包屑" [level=2] [ref=e234]
    - paragraph [ref=e235]: 返回上级、切换同级，长路径按容器宽度折叠。
    - link "查看 Breadcrumb 全部用法" [ref=e236] [cursor=pointer]:
      - /url: "#breadcrumb"
  - generic [ref=e239]:
    - heading "Tabs 分区切换" [level=2] [ref=e240]
    - paragraph [ref=e241]: 完整的导航与面板，三种外观、连续更多菜单，以及本页内容保留。
    - link "查看 Tabs 全部用法" [ref=e242] [cursor=pointer]:
      - /url: "#tabs"
    - link "导航 v0.4.2 · G1 待评审样板" [ref=e244] [cursor=pointer]:
      - /url: "#navigation-v042"
  - generic [ref=e246]:
    - generic [ref=e247]:
      - generic [ref=e248]: "03"
      - generic [ref=e249]:
        - heading "Select" [level=2] [ref=e250]
        - paragraph [ref=e251]: 一套选择器，通过单选、多选和可搜索组合覆盖不同选择需求。
      - generic [ref=e252]: registry-candidate
    - generic [ref=e253]:
      - generic [ref=e254]:
        - generic [ref=e255]: 课程教学班
        - generic [ref=e256]:
          - generic [ref=e257]:
            - combobox "课程教学班" [ref=e258] [cursor=pointer]:
              - generic "视传 2401" [ref=e260]
            - button "清除课程教学班" [ref=e262] [cursor=pointer]
          - generic [ref=e268]: 已选：视传 2401
        - textbox [ref=e269]: a
      - generic [ref=e270]:
        - paragraph [ref=e271]: 选择方式、三种外观、摘要与标签、候选数据及表单草稿集中在详情页。
        - link "查看 Select 全部用法" [ref=e272] [cursor=pointer]:
          - /url: "#select"
  - generic [ref=e274]:
    - link "查看 Tag 全配色、尺寸与交互" [ref=e275] [cursor=pointer]:
      - /url: "#tag"
    - generic [ref=e277]:
      - generic [ref=e278]: "04"
      - generic [ref=e279]:
        - heading "Tag / Badge" [level=2] [ref=e280]
        - paragraph [ref=e281]: Tag 表示语义标签；Badge 只补充圆点、数量或极短标记。
      - generic [ref=e282]: prototype-ready
    - generic [ref=e283]:
      - generic [ref=e284]:
        - generic [ref=e285]:
          - generic [ref=e286]: Tag：静态或独立移除
          - generic [ref=e287]: 不是选择器或状态灯
        - generic [ref=e288]:
          - generic [ref=e290]:
            - generic [ref=e291]: 重点
            - button "移除标签 重点" [ref=e293] [cursor=pointer]
          - generic [ref=e296]: 补充
          - generic [ref=e299]: 内部
          - generic [ref=e302]:
            - generic [ref=e303]: 已锁定
            - button "移除标签 已锁定" [disabled] [ref=e305]
        - generic [ref=e309]:
          - generic [ref=e310]: Badge：附着信息
          - generic [ref=e311]: Dot / Count / Label
        - generic [ref=e312]:
          - generic "王老师有新消息" [ref=e315]: 王
          - generic [ref=e317]:
            - generic "资源更新，3 条更新" [ref=e319]: 资源更新
            - generic [ref=e320]: "3"
          - generic [ref=e322]: NEW
          - generic [ref=e325]: 99+
        - paragraph [ref=e328]: 成功、警告、失败等命名状态不由普通 Badge 承担；它们留给后续 BadgeStatus / StatusIndicator。
      - generic [ref=e329]:
        - generic [ref=e330]:
          - term [ref=e331]: 适合用在
          - definition [ref=e332]: Tag 表达属性；Badge 为宿主补充变化、数量或短标记。
        - generic [ref=e333]:
          - term [ref=e334]: 不适合
          - definition [ref=e335]: 主操作、导航、选择器或命名系统状态。
        - generic [ref=e336]:
          - term [ref=e337]: 外观与状态
          - definition [ref=e338]: Tag 有受限外观/色调；Badge 只有 Dot / Count / Label 与九种合法位置组合。
        - generic [ref=e339]:
          - term [ref=e340]: 密度
          - definition [ref=e341]: Tag 跟随页面密度；Badge 的 Dot 固定，Count/Label 只有 Small/Medium。
        - generic [ref=e342]:
          - term [ref=e343]: 结构
          - definition [ref=e344]: "Tag: Label + Remove；Badge: Host + Indicator。"
        - generic [ref=e345]:
          - term [ref=e346]: 无障碍
          - definition [ref=e347]: Tag 根不聚焦；移除是独立按钮。Badge 不点击、不进入 Tab，宿主保留最终名称。
        - generic [ref=e348]:
          - term [ref=e349]: 参考成熟库
          - definition [ref=e350]: 学习 shadcn/ui 的小部件组合，学习 Ant Design 的 Badge 附着位置与计数完整度。
        - generic [ref=e351]:
          - term [ref=e352]: Rain 来源
          - definition [ref=e353]: 复用 Classic Tag 与 Badge 的静态语义、独立移除、0 隐藏和 99+ 规则。
        - generic [ref=e354]:
          - term [ref=e355]: 修改边界
          - definition [ref=e356]: 七种教育业务标签已由 Tag 家族提供，完整用法见 Tag 页面；不开放任意颜色，也不把状态塞进 Badge。
  - generic [ref=e357]:
    - generic [ref=e358]:
      - generic [ref=e359]: "05"
      - generic [ref=e360]:
        - heading "Surface / Card" [level=2] [ref=e361]
        - paragraph [ref=e362]: Surface 只定义表面；Card 只在一个对象需要独立边界时出现。
      - generic [ref=e363]: prototype-ready
    - generic [ref=e364]:
      - generic [ref=e365]:
        - generic [ref=e366]:
          - generic [ref=e367]: Page · 无卡片边界
          - generic [ref=e368]: Panel · 白色细边框
          - generic [ref=e369]: Raised · 抬高表面
        - generic [ref=e370]:
          - link "查看 Card 完整用法与局部修改" [ref=e371] [cursor=pointer]:
            - /url: "#card"
          - link "查看 Dialog 与 Separator" [ref=e373] [cursor=pointer]:
            - /url: "#dialog"
          - link "查看布局与组合" [ref=e375] [cursor=pointer]:
            - /url: "#layouts"
          - link "查看表格、分页与空态" [ref=e377] [cursor=pointer]:
            - /url: "#table"
          - link "查看头像、成员组与头像图库" [ref=e379] [cursor=pointer]:
            - /url: "#avatar"
          - article [ref=e381]:
            - generic [ref=e382]:
              - heading "课程资源包" [level=3] [ref=e383]
              - paragraph [ref=e384]: 课程资料 · 24 个文件
              - generic [ref=e385]: 今天 09:30
            - generic [ref=e386]: 一个可被独立识别、复用和操作的内容对象。
            - generic [ref=e387]: 归属信息由业务页面提供
          - article [ref=e388]:
            - generic [ref=e389]:
              - heading "课堂回顾" [level=3] [ref=e390]
              - paragraph [ref=e391]: 阅读任务摘要
              - button "查看" [ref=e393] [cursor=pointer]
            - generic [ref=e395]: 按钮保持独立焦点，整张 Card 不伪装成一个按钮。
      - generic [ref=e396]:
        - generic [ref=e397]:
          - term [ref=e398]: 适合用在
          - definition [ref=e399]: Surface 划分任务表面；Card 展示独立对象。
        - generic [ref=e400]:
          - term [ref=e401]: 不适合
          - definition [ref=e402]: 仅为了间距、滚动、页面宽度或把每块布局都装进卡片。
        - generic [ref=e403]:
          - term [ref=e404]: 外观与状态
          - definition [ref=e405]: "Surface: Page / Panel / Raised；Card: Panel / Raised。"
        - generic [ref=e406]:
          - term [ref=e407]: 密度
          - definition [ref=e408]: 表面不制造控件尺寸；内部组件继续跟随所在密度。
        - generic [ref=e409]:
          - term [ref=e410]: 结构
          - definition [ref=e411]: Card / Header / Title / Description / Action / Content / Footer。
        - generic [ref=e412]:
          - term [ref=e413]: 无障碍
          - definition [ref=e414]: Card 默认是独立 article；标题级别由页面决定；整卡非交互。
        - generic [ref=e415]:
          - term [ref=e416]: 参考成熟库
          - definition [ref=e417]: 学习 shadcn/ui Card 的清晰 Parts，学习 Ant Design 后台对象卡的内容完整度。
        - generic [ref=e418]:
          - term [ref=e419]: Rain 来源
          - definition [ref=e420]: Card 按 shadcn 作者源码与 Nova 样式转译为 Rain；Surface 保留现有实现。视觉采用 Rain Token。
        - generic [ref=e421]:
          - term [ref=e422]: 修改边界
          - definition [ref=e423]: Container 仍只管宽度与左右留白；滚动和布局不归 Surface/Card。
  - generic [ref=e424]:
    - strong [ref=e425]: 截至 2026-09-12 的验收摘要
    - generic [ref=e426]: Button / TextButton、Tag 分批外观、Tabs、Input / Select 及 Dropdown / Popover 已完成各自视觉验收；Badge / Surface / Card 仍按各自记录待验收。对比度与颜色用途问题单独保留，组件均未发布。
```

# Test source

```ts
  35  |             return top.rgb.map((channel, i) => channel * top.alpha + bottom[i]! * (1 - top.alpha));
  36  |           }
  37  |           const base = color(getComputedStyle(element.closest(".button-token-review__samples")!).backgroundColor).rgb;
  38  |           const inner = over(color(style.backgroundColor), base);
  39  |           const opacity = Number(style.opacity);
  40  |           const background = over({ rgb: inner, alpha: opacity }, base);
  41  |           const label = getComputedStyle(element.querySelector('[data-slot="label"]')!);
  42  |           const labelColor = color(label.color);
  43  |           labelColor.alpha *= Number(label.opacity);
  44  |           const foreground = over({ rgb: over(labelColor, inner), alpha: opacity }, base);
  45  |           const indicator = element.querySelector('[data-slot="loading-indicator"]');
  46  |           const icon = indicator ? getComputedStyle(indicator) : undefined;
  47  |           const iconColor = icon ? color(icon.color) : undefined;
  48  |           if (iconColor) iconColor.alpha *= Number(icon!.opacity);
  49  |           const iconForeground = iconColor ? over({ rgb: over(iconColor, inner), alpha: opacity }, base) : undefined;
  50  |           return { background, foreground, iconForeground, opacity, css: { background: style.backgroundColor, label: label.color, icon: icon?.color ?? "" } };
  51  |         });
  52  |         if (recipe.state === "pressed") await page.mouse.up();
  53  |         const expected = validateButtonColorRecipe(recipe, theme, parent);
  54  |         expect(actual.opacity, recipe.id).toBe(recipe.opacity);
  55  |         for (let channel = 0; channel < 3; channel++) expect(Math.abs(actual.background[channel]! - expected.paintedBackground.rgb[channel]!), `${recipe.id}/${theme}/${surface} background`).toBeLessThan(1.2);
  56  |         if (recipe.state !== "disabled") {
  57  |           const textContrast = contrastRatio(`rgb(${actual.foreground.join(",")})`, `rgb(${actual.background.join(",")})`);
  58  |           if (expected.acceptedTextContrastException) {
  59  |             expect([recipe.variant, recipe.tone]).toEqual(["primary", "danger"]);
  60  |             expect(textContrast).toBeLessThan(4.5);
  61  |             expect(Math.abs(textContrast - expected.textContrast)).toBeLessThan(0.05);
  62  |           } else expect(textContrast, `${recipe.id}/${theme}/${surface}`).toBeGreaterThanOrEqual(4.5);
  63  |         }
  64  |         if (actual.iconForeground) expect(contrastRatio(`rgb(${actual.iconForeground.join(",")})`, `rgb(${actual.background.join(",")})`), `${recipe.id}/${theme}/${surface} loading icon`).toBeGreaterThanOrEqual(3);
  65  |         if (theme === "light" && surface === "task" && recipe.variant === "primary" && recipe.tone === "default" && recipe.state === "loading") lightLoading = actual.css;
  66  |       }
  67  |       // Tab must show two token-backed rings for every active and loading appearance.
  68  |       await page.mouse.move(0, 0);
  69  |       await page.getByRole("combobox", { name: "默认密度", exact: true }).focus();
  70  |       for (const button of await region.locator('button:not([disabled])').all()) {
  71  |         await page.keyboard.press("Tab");
  72  |         await expect(button).toBeFocused();
  73  |         const ring = await button.evaluate((element) => {
  74  |           const css = getComputedStyle(element);
  75  |           return { outline: css.outlineColor, width: css.outlineWidth, offset: css.outlineOffset, shadow: css.boxShadow };
  76  |         });
  77  |         expect(ring.outline).toBe(theme === "light" ? "rgb(61, 123, 255)" : "rgb(42, 93, 203)");
  78  |         expect(ring.width).toBe("1px");
  79  |         expect(ring.offset).toBe("0px");
  80  |         expect(ring.shadow).toContain(theme === "light" ? "rgba(61, 123, 255, 0.2)" : "rgba(56, 96, 255, 0.3)");
  81  |         expect(ring.shadow).toContain(await button.getAttribute("data-variant") === "primary" ? "0px 0px 0px 4px" : "0px 0px 0px 3px");
  82  |       }
  83  |       await region.locator("button").last().evaluate((button) => (button as HTMLElement).blur());
  84  |       const iconPairs = await page.locator('[aria-labelledby="button-token-sizes-title"] tbody button').evaluateAll((buttons) => buttons.map((button) => ({
  85  |         leading: getComputedStyle(button.querySelector('[data-slot="leading-icon"]')!).color,
  86  |         trailing: getComputedStyle(button.querySelector('[data-slot="trailing-icon"]')!).color,
  87  |       })));
  88  |       expect(iconPairs).toHaveLength(8);
  89  |       for (const pair of iconPairs) expect(pair.trailing, `${theme}/${surface} secondary icon`).not.toBe(pair.leading);
  90  |     }
  91  |   }
  92  |   const measured = await page.locator('[aria-labelledby="button-token-sizes-title"]').locator("tbody button").evaluateAll((buttons) => buttons.map((button) => {
  93  |     const css = getComputedStyle(button);
  94  |     return [parseFloat(css.height), parseFloat(css.paddingInlineStart), parseFloat(css.gap), parseFloat(css.paddingBlockStart)];
  95  |   }));
  96  |   expect(measured).toEqual([[28,12,4,0],[32,20,4,0],[36,20,4,0],[40,24,4,0],[48,28,6,0],[20,6,4,3],[24,6,4,3],[26,6,4,3]]);
  97  |   // Use the real rendered Button to check that a Light island restores aliases inside Dark.
  98  |   const nestedLight = await region.locator('button[data-variant="primary"][data-tone="default"][data-state="loading"]').evaluate((button) => {
  99  |     const scope = document.createElement("div");
  100 |     scope.dataset.rainTheme = "light";
  101 |     const clone = button.cloneNode(true) as HTMLButtonElement;
  102 |     scope.append(clone);
  103 |     button.parentElement!.append(scope);
  104 |     const result = { background: getComputedStyle(clone).backgroundColor, label: getComputedStyle(clone.querySelector('[data-slot="label"]')!).color, icon: getComputedStyle(clone.querySelector('[data-slot="loading-indicator"]')!).color };
  105 |     scope.remove();
  106 |     return result;
  107 |   });
  108 |   expect(nestedLight).toEqual(lightLoading);
  109 | });
  110 | 
  111 | const runtimeEnvironment = (
  112 |   globalThis as typeof globalThis & {
  113 |     process?: { env?: Record<string, string | undefined> };
  114 |   }
  115 | ).process?.env ?? {};
  116 | 
  117 | test("the Day 3 Core UI page exposes truthful families and real interaction", async ({
  118 |   page,
  119 | }, testInfo) => {
  120 |   await page.setViewportSize({ width: 1440, height: 1100 });
  121 |   await page.emulateMedia({ reducedMotion: "no-preference" });
  122 |   await page.goto("/");
  123 |   await page.getByRole("link", { name: /Components/i }).click();
  124 |   await expect(page).toHaveURL(/#components$/);
  125 | 
  126 |   const title = page.getByRole("heading", {
  127 |     level: 1,
  128 |     name: "Core UI，把高频动作先做准",
  129 |   });
  130 |   await expect(title).toBeFocused();
  131 |   await expect(page.locator('[data-rain-id="core-ui-page"]')).toHaveAttribute(
  132 |     "data-maturity",
  133 |     "prototype-ready",
  134 |   );
> 135 |   await expect(page.locator('[data-slot="component-family"]')).toHaveCount(6);
      |                                                                ^ Error: expect(locator).toHaveCount(expected) failed
  136 |   await expect(page.getByRole('link', { name: '查看 Tabs 全部用法' })).toHaveAttribute('href', '#tabs');
  137 |   await expect(page.getByText("prototype-ready")).toHaveCount(4);
  138 |   await expect(page.getByText("分批验收")).toBeVisible();
  139 |   await expect(
  140 |     page.getByText(/Input \/ Select 及 Dropdown \/ Popover 已完成各自视觉验收/),
  141 |   ).toBeVisible();
  142 | 
  143 |   const actionOutput = page.getByTestId("button-action-count");
  144 |   const primaryButton = page.getByRole("button", { name: "创建课程" });
  145 |   await primaryButton.click();
  146 |   await expect(actionOutput).toContainText("1 次");
  147 | 
  148 |   await primaryButton.focus();
  149 |   await page.keyboard.press("Enter");
  150 |   await expect(actionOutput).toContainText("2 次");
  151 |   await page.keyboard.press("Space");
  152 |   await expect(actionOutput).toContainText("3 次");
  153 | 
  154 |   const loadingButton = page.getByRole("button", {
  155 |     name: "保存课程，正在处理",
  156 |   });
  157 |   await expect(loadingButton).toHaveAttribute("aria-busy", "true");
  158 |   await expect(loadingButton).toHaveAttribute("aria-disabled", "true");
  159 |   await expect(loadingButton).not.toHaveAttribute("disabled");
  160 |   await loadingButton.focus();
  161 |   await page.keyboard.press("Enter");
  162 |   await expect(actionOutput).toContainText("3 次");
  163 | 
  164 |   await primaryButton.focus();
  165 |   const focusStyle = await primaryButton.evaluate((element) => {
  166 |     const style = getComputedStyle(element);
  167 |     return {
  168 |       boxShadow: style.boxShadow,
  169 |       outlineStyle: style.outlineStyle,
  170 |     };
  171 |   });
  172 |   expect(focusStyle.boxShadow).toContain("rgba(61, 123, 255, 0.2)");
  173 |   expect(focusStyle.boxShadow).toMatch(
  174 |     /rgb\(255, 255, 255\) 0px 0px 0px 1px/,
  175 |   );
  176 |   expect(focusStyle.boxShadow).toMatch(
  177 |     /rgba\(61, 123, 255, 0\.2\) 0px 0px 0px 4px/,
  178 |   );
  179 |   expect(focusStyle.outlineStyle).not.toBe("none");
  180 | 
  181 |   for (const name of ["继续编辑", "保存草稿"]) {
  182 |     const outlinedButton = page.getByRole("button", { name });
  183 |     await outlinedButton.focus();
  184 |     const outlinedFocus = await outlinedButton.evaluate((element) => {
  185 |       const style = getComputedStyle(element);
  186 |       return { borderColor: style.borderColor, boxShadow: style.boxShadow };
  187 |     });
  188 |     expect(outlinedFocus.borderColor).toBe("rgb(61, 123, 255)");
  189 |     expect(outlinedFocus.boxShadow).toMatch(
  190 |       /rgba\(61, 123, 255, 0\.2\) 0px 0px 0px 3px/,
  191 |     );
  192 |   }
  193 | 
  194 |   await primaryButton.evaluate((element) => element.blur());
  195 |   await primaryButton.hover();
  196 |   await expect(primaryButton).toHaveCSS("background-color", "rgba(0, 58, 173, 0.85)");
  197 |   await expect(primaryButton).toHaveCSS("box-shadow", "none");
  198 |   const primaryBox = await primaryButton.boundingBox();
  199 |   expect(primaryBox).not.toBeNull();
  200 |   if (primaryBox) {
  201 |     await page.mouse.move(
  202 |       primaryBox.x + primaryBox.width / 2,
  203 |       primaryBox.y + primaryBox.height / 2,
  204 |     );
  205 |     await page.mouse.down();
  206 |     await expect(primaryButton).toHaveCSS("background-color", "rgba(0, 58, 173, 0.85)");
  207 |     await expect(primaryButton).toHaveCSS("border-color", "rgb(61, 123, 255)");
  208 |     await expect(primaryButton).toHaveCSS("transform", "none");
  209 |     await page.mouse.up();
  210 |     await expect(actionOutput).toContainText("4 次");
  211 |   }
  212 | 
  213 |   const primaryDisabled = page.getByRole("button", { name: "主按钮停用" });
  214 |   const secondaryDisabled = page.getByRole("button", { name: "次按钮停用" });
  215 |   const tertiaryDisabled = page.getByRole("button", { name: "三级按钮停用" });
  216 |   await expect(primaryDisabled).toBeDisabled();
  217 |   await expect(secondaryDisabled).toBeDisabled();
  218 |   await expect(tertiaryDisabled).toBeDisabled();
  219 |   await expect(primaryDisabled).toHaveCSS("opacity", "0.3");
  220 |   await expect(secondaryDisabled).toHaveCSS("opacity", "0.4");
  221 |   await expect(tertiaryDisabled).toHaveCSS("opacity", "0.4");
  222 |   const disabledAppearance = await Promise.all(
  223 |     [primaryDisabled, secondaryDisabled, tertiaryDisabled].map((button) =>
  224 |       button.evaluate((element) => {
  225 |         const style = getComputedStyle(element);
  226 |         return {
  227 |           backgroundColor: style.backgroundColor,
  228 |           borderColor: style.borderColor,
  229 |           transform: style.transform,
  230 |         };
  231 |       }),
  232 |     ),
  233 |   );
  234 |   for (const [index, button] of [
  235 |     primaryDisabled,
```