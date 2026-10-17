# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: g6-components.spec.ts >> media ratio, attachment actions and direction islands
- Location: evidence/runtime/g1-g6-closeout-2026-10-17/run-01/browser/g6-components.spec.ts:25:1

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: locator.click: Test timeout of 60000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: '移除 课程导读：从问题到证据.pdf', exact: true })

```

# Page snapshot

```yaml
- main [ref=e4]:
  - generic [ref=e5]:
    - link "返回组件目录" [ref=e6] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e8]:
      - heading "Attachment 文件附件" [level=1] [ref=e9]
      - generic [ref=e10]: UI · 共享候选 · 尚未发布
    - paragraph [ref=e11]: 选择课程文件、查看真实内容，并在上传、重试和替换中保留明确状态。
    - generic "预览设置" [ref=e12]:
      - button "浅色" [pressed] [ref=e13] [cursor=pointer]
      - button "深色" [ref=e15] [cursor=pointer]
      - button "紧凑密度" [ref=e17] [cursor=pointer]
  - generic [ref=e19]:
    - generic [ref=e20]:
      - heading "四种附件使用场景" [level=2] [ref=e21]
      - paragraph [ref=e22]: 普通列表、紧凑草稿、滚动弹窗与媒体网格共享同一附件工作流；折叠和汇总留在各自场景。
      - generic [ref=e24]:
        - paragraph [ref=e25]: 本地演示：选择、预览和下载使用真实文件；上传在本页模拟，不向服务器传输。四个场景独立，刷新后恢复示例。
        - region "普通附件列表" [ref=e26]:
          - group "添加课程附件" [ref=e27]:
            - generic [ref=e28]:
              - generic [ref=e29]:
                - heading "课程资料" [level=3] [ref=e30]
                - paragraph [ref=e31]: 普通列表 · 多文件与上传状态
              - button "添加课程附件" [ref=e32] [cursor=pointer]:
                - generic [ref=e35]: 添加文件
            - generic [ref=e36]:
              - status [ref=e37]:
                - generic [ref=e38]: 共 24 个
                - generic [ref=e39]: · 24 个已上传
              - generic [ref=e40]: 也可将文件拖入此区域
            - generic [ref=e42]:
              - generic [ref=e44]:
                - generic [ref=e46]:
                  - generic "课程导读.pdf" [ref=e47]:
                    - generic [ref=e48]: 课程导读
                    - generic [ref=e49]: .pdf
                  - generic "965 B" [ref=e50]
                - button "预览 课程导读.pdf" [ref=e51] [cursor=pointer]
                - generic [ref=e52]:
                  - button "下载 课程导读.pdf" [ref=e53] [cursor=pointer]
                  - button "更多操作 课程导读.pdf" [ref=e56] [cursor=pointer]
              - generic [ref=e60]:
                - generic [ref=e62]:
                  - generic "课堂讲义.txt" [ref=e63]:
                    - generic [ref=e64]: 课堂讲义
                    - generic [ref=e65]: .txt
                  - generic "80 B" [ref=e66]
                - button "预览 课堂讲义.txt" [ref=e67] [cursor=pointer]
                - generic [ref=e68]:
                  - button "下载 课堂讲义.txt" [ref=e69] [cursor=pointer]
                  - button "更多操作 课堂讲义.txt" [ref=e72] [cursor=pointer]
              - generic [ref=e76]:
                - generic [ref=e78]:
                  - generic "课堂观察数据.csv" [ref=e79]:
                    - generic [ref=e80]: 课堂观察数据
                    - generic [ref=e81]: .csv
                  - generic "66 B" [ref=e82]
                - button "预览 课堂观察数据.csv" [ref=e83] [cursor=pointer]
                - generic [ref=e84]:
                  - button "下载 课堂观察数据.csv" [ref=e85] [cursor=pointer]
                  - button "更多操作 课堂观察数据.csv" [ref=e88] [cursor=pointer]
              - generic [ref=e92]:
                - generic [ref=e94]:
                  - generic "小组讨论记录.md" [ref=e95]:
                    - generic [ref=e96]: 小组讨论记录
                    - generic [ref=e97]: .md
                  - generic "103 B" [ref=e98]
                - button "预览 小组讨论记录.md" [ref=e99] [cursor=pointer]
                - generic [ref=e100]:
                  - button "下载 小组讨论记录.md" [ref=e101] [cursor=pointer]
                  - button "更多操作 小组讨论记录.md" [ref=e104] [cursor=pointer]
              - generic [ref=e108]:
                - generic [ref=e110]:
                  - generic "课堂问题清单.json" [ref=e111]:
                    - generic [ref=e112]: 课堂问题清单
                    - generic [ref=e113]: .json
                  - generic "91 B" [ref=e114]
                - button "预览 课堂问题清单.json" [ref=e115] [cursor=pointer]
                - generic [ref=e116]:
                  - button "下载 课堂问题清单.json" [ref=e117] [cursor=pointer]
                  - button "更多操作 课堂问题清单.json" [ref=e120] [cursor=pointer]
              - generic [ref=e124]:
                - img "缩略图 课程封面.png" [ref=e126]
                - generic [ref=e127]:
                  - generic "课程封面.png" [ref=e128]:
                    - generic [ref=e129]: 课程封面
                    - generic [ref=e130]: .png
                  - generic "1 MB" [ref=e131]
                - button "预览 课程封面.png" [ref=e132] [cursor=pointer]
                - generic [ref=e133]:
                  - button "下载 课程封面.png" [ref=e134] [cursor=pointer]
                  - button "更多操作 课程封面.png" [ref=e137] [cursor=pointer]
            - generic [ref=e140]:
              - generic [ref=e141]: 当前显示 6 / 24 个附件
              - button "展开全部 24 个" [ref=e142] [cursor=pointer]
            - status [ref=e144]: 也可将文件拖入此区域。
          - generic [ref=e145]:
            - button "演示上传" [ref=e146] [cursor=pointer]
            - button "查看首次添加" [ref=e148] [cursor=pointer]
            - button "恢复普通列表示例" [ref=e150] [cursor=pointer]:
              - generic [ref=e151]: 恢复示例
        - region "紧凑草稿输入" [ref=e152]:
          - generic [ref=e153]:
            - generic [ref=e154]:
              - heading "发布课程消息" [level=3] [ref=e155]
              - paragraph [ref=e156]: 紧凑附件 · 草稿中的文件可直接移除
            - generic [ref=e157]:
              - button "查看首次添加" [ref=e158] [cursor=pointer]
              - button "恢复草稿示例" [ref=e160] [cursor=pointer]
          - generic [ref=e162]:
            - group "添加草稿附件" [ref=e163]:
              - generic [ref=e164]:
                - generic [ref=e166]:
                  - generic [ref=e167]:
                    - status [ref=e168]:
                      - generic [ref=e169]: 共 12 个
                      - generic [ref=e170]: · 12 个已上传
                    - button "查看全部 12 个" [ref=e171] [cursor=pointer]
                  - generic [ref=e174]:
                    - generic [ref=e176]:
                      - generic [ref=e178]:
                        - generic "课程导读.pdf" [ref=e179]:
                          - generic [ref=e180]: 课程导读
                          - generic [ref=e181]: .pdf
                        - generic "965 B" [ref=e182]
                      - button "预览 课程导读.pdf" [ref=e183] [cursor=pointer]
                      - button "移除 课程导读.pdf" [ref=e185] [cursor=pointer]
                    - generic [ref=e189]:
                      - generic [ref=e191]:
                        - generic "课堂讲义.txt" [ref=e192]:
                          - generic [ref=e193]: 课堂讲义
                          - generic [ref=e194]: .txt
                        - generic "80 B" [ref=e195]
                      - button "预览 课堂讲义.txt" [ref=e196] [cursor=pointer]
                      - button "移除 课堂讲义.txt" [ref=e198] [cursor=pointer]
                    - generic [ref=e202]:
                      - generic [ref=e204]:
                        - generic "课堂观察数据.csv" [ref=e205]:
                          - generic [ref=e206]: 课堂观察数据
                          - generic [ref=e207]: .csv
                        - generic "66 B" [ref=e208]
                      - button "预览 课堂观察数据.csv" [ref=e209] [cursor=pointer]
                      - button "移除 课堂观察数据.csv" [ref=e211] [cursor=pointer]
                    - generic [ref=e215]:
                      - generic [ref=e217]:
                        - generic "小组讨论记录.md" [ref=e218]:
                          - generic [ref=e219]: 小组讨论记录
                          - generic [ref=e220]: .md
                        - generic "103 B" [ref=e221]
                      - button "预览 小组讨论记录.md" [ref=e222] [cursor=pointer]
                      - button "移除 小组讨论记录.md" [ref=e224] [cursor=pointer]
                - textbox "课程消息" [ref=e227]: 这是一组本周课程资料，请结合课堂笔记阅读。
                - generic [ref=e229]:
                  - button "添加草稿附件" [ref=e230] [cursor=pointer]:
                    - generic [ref=e233]: 添加附件
                  - button "发送到本页" [ref=e234] [cursor=pointer]
              - status [ref=e236]: 也可将文件拖入此区域。
            - paragraph [ref=e237]: 仅在本页回显消息；此演示等待当前附件上传完成后发送，不提交真实课程消息。
        - region "弹窗附件列表" [ref=e238]:
          - generic [ref=e239]:
            - generic [ref=e240]:
              - heading "集中管理附件" [level=3] [ref=e241]
              - paragraph [ref=e242]: 弹窗内滚动列表，底部操作保持可见。
            - button "打开附件弹窗" [ref=e243] [cursor=pointer]
          - paragraph [ref=e245]: 当前有 24 个附件。关闭和重新打开不会重置文件；上传结果只保留在本页。
        - region "图片与视频网格" [ref=e246]:
          - generic [ref=e247]:
            - generic [ref=e248]:
              - heading "图片与视频" [level=3] [ref=e249]
              - paragraph [ref=e250]: 内容缩略图 · 文件名和操作留在画面下方
            - generic [ref=e251]:
              - button "查看首次添加" [ref=e252] [cursor=pointer]
              - button "恢复媒体示例" [ref=e254] [cursor=pointer]
          - group "添加图片或视频" [ref=e256]:
            - status [ref=e258]:
              - generic [ref=e259]: 共 12 个
              - generic [ref=e260]: · 12 个已上传
            - generic [ref=e261]:
              - generic [ref=e262]:
                - generic [ref=e264]:
                  - img "缩略图 课堂板书.png" [ref=e266]
                  - generic [ref=e267]:
                    - generic "课堂板书.png" [ref=e268]:
                      - generic [ref=e269]: 课堂板书
                      - generic [ref=e270]: .png
                    - generic "1.8 MB" [ref=e271]
                  - button "预览 课堂板书.png" [ref=e272] [cursor=pointer]
                  - generic [ref=e273]:
                    - button "下载 课堂板书.png" [ref=e274] [cursor=pointer]
                    - button "更多操作 课堂板书.png" [ref=e277] [cursor=pointer]
                - generic [ref=e281]:
                  - img "缩略图 课堂演示.mp4" [ref=e283]
                  - generic [ref=e286]:
                    - generic "课堂演示.mp4" [ref=e287]:
                      - generic [ref=e288]: 课堂演示
                      - generic [ref=e289]: .mp4
                    - generic "207.3 KB" [ref=e290]
                  - button "预览 课堂演示.mp4" [ref=e291] [cursor=pointer]
                  - generic [ref=e292]:
                    - button "下载 课堂演示.mp4" [ref=e293] [cursor=pointer]
                    - button "更多操作 课堂演示.mp4" [ref=e296] [cursor=pointer]
                - generic [ref=e300]:
                  - img "缩略图 分组讨论.png" [ref=e302]
                  - generic [ref=e303]:
                    - generic "分组讨论.png" [ref=e304]:
                      - generic [ref=e305]: 分组讨论
                      - generic [ref=e306]: .png
                    - generic "1.9 MB" [ref=e307]
                  - button "预览 分组讨论.png" [ref=e308] [cursor=pointer]
                  - generic [ref=e309]:
                    - button "下载 分组讨论.png" [ref=e310] [cursor=pointer]
                    - button "更多操作 分组讨论.png" [ref=e313] [cursor=pointer]
                - generic [ref=e317]:
                  - img "缩略图 实验过程.mp4" [ref=e319]
                  - generic [ref=e322]:
                    - generic "实验过程.mp4" [ref=e323]:
                      - generic [ref=e324]: 实验过程
                      - generic [ref=e325]: .mp4
                    - generic "207.3 KB" [ref=e326]
                  - button "预览 实验过程.mp4" [ref=e327] [cursor=pointer]
                  - generic [ref=e328]:
                    - button "下载 实验过程.mp4" [ref=e329] [cursor=pointer]
                    - button "更多操作 实验过程.mp4" [ref=e332] [cursor=pointer]
                - generic [ref=e336]:
                  - img "缩略图 实验装置.png" [ref=e338]
                  - generic [ref=e339]:
                    - generic "实验装置.png" [ref=e340]:
                      - generic [ref=e341]: 实验装置
                      - generic [ref=e342]: .png
                    - generic "1.8 MB" [ref=e343]
                  - button "预览 实验装置.png" [ref=e344] [cursor=pointer]
                  - generic [ref=e345]:
                    - button "下载 实验装置.png" [ref=e346] [cursor=pointer]
                    - button "更多操作 实验装置.png" [ref=e349] [cursor=pointer]
                - generic [ref=e353]:
                  - img "缩略图 课堂讲授.png" [ref=e355]
                  - generic [ref=e356]:
                    - generic "课堂讲授.png" [ref=e357]:
                      - generic [ref=e358]: 课堂讲授
                      - generic [ref=e359]: .png
                    - generic "1.9 MB" [ref=e360]
                  - button "预览 课堂讲授.png" [ref=e361] [cursor=pointer]
                  - generic [ref=e362]:
                    - button "下载 课堂讲授.png" [ref=e363] [cursor=pointer]
                    - button "更多操作 课堂讲授.png" [ref=e366] [cursor=pointer]
                - generic [ref=e370]:
                  - img "缩略图 自主阅读.png" [ref=e372]
                  - generic [ref=e373]:
                    - generic "自主阅读.png" [ref=e374]:
                      - generic [ref=e375]: 自主阅读
                      - generic [ref=e376]: .png
                    - generic "1.9 MB" [ref=e377]
                  - button "预览 自主阅读.png" [ref=e378] [cursor=pointer]
                  - generic [ref=e379]:
                    - button "下载 自主阅读.png" [ref=e380] [cursor=pointer]
                    - button "更多操作 自主阅读.png" [ref=e383] [cursor=pointer]
                - generic [ref=e387]:
                  - img "缩略图 课堂协作.png" [ref=e389]
                  - generic [ref=e390]:
                    - generic "课堂协作.png" [ref=e391]:
                      - generic [ref=e392]: 课堂协作
                      - generic [ref=e393]: .png
                    - generic "1.8 MB" [ref=e394]
                  - button "预览 课堂协作.png" [ref=e395] [cursor=pointer]
                  - generic [ref=e396]:
                    - button "下载 课堂协作.png" [ref=e397] [cursor=pointer]
                    - button "更多操作 课堂协作.png" [ref=e400] [cursor=pointer]
              - button "添加图片或视频" [ref=e403] [cursor=pointer]:
                - generic [ref=e404]:
                  - generic [ref=e406]: 添加图片或视频
                  - generic [ref=e407]: 点击选择或拖入
            - generic [ref=e408]:
              - generic [ref=e409]: 当前显示 8 / 12 个附件
              - button "展开全部 12 个" [ref=e410] [cursor=pointer]
            - status [ref=e412]: 也可将文件拖入此区域。
          - paragraph [ref=e413]: 图片为 AI 生成的教学情境示意；视频为实验室示意图制作的 4 秒无声合成短片，不是课堂现场实录。多个视频条目复用同一演示文件。
    - generic [ref=e414]:
      - heading "课程附件工作流" [level=2] [ref=e415]
      - paragraph [ref=e416]: 选择或拖入真实文件，查看预览与下载，再试试取消、失败重试、替换及只读查看。
      - generic [ref=e418]:
        - paragraph [ref=e419]: 本地演示：选择、预览和下载使用真实文件；上传与保存仅在本页模拟，不向服务器传输。刷新后恢复示例。
        - group [ref=e420]:
          - generic "演示选项" [ref=e421] [cursor=pointer]
        - form "课程附件" [ref=e422]:
          - group "添加附件" [ref=e423]:
            - generic [ref=e424]:
              - heading "课程附件" [level=3] [ref=e425]
              - button "添加附件" [ref=e426] [cursor=pointer]:
                - generic [ref=e429]: 添加文件
            - generic [ref=e431]:
              - generic [ref=e433]:
                - generic [ref=e435]:
                  - generic "课程导读：从问题到证据.pdf" [ref=e436]:
                    - generic [ref=e437]: 课程导读：从问题到证据
                    - generic [ref=e438]: .pdf
                  - generic "965 B" [ref=e439]
                - button "预览 课程导读：从问题到证据.pdf" [active] [ref=e440] [cursor=pointer]
                - generic [ref=e441]:
                  - button "下载 课程导读：从问题到证据.pdf" [ref=e442] [cursor=pointer]
                  - button "更多操作 课程导读：从问题到证据.pdf" [ref=e445] [cursor=pointer]
              - generic [ref=e449]:
                - img "缩略图 高等数学课程封面.png" [ref=e451]
                - generic [ref=e452]:
                  - generic "高等数学课程封面.png" [ref=e453]:
                    - generic [ref=e454]: 高等数学课程封面
                    - generic [ref=e455]: .png
                  - generic "1 MB" [ref=e456]
                - button "预览 高等数学课程封面.png" [ref=e457] [cursor=pointer]
                - generic [ref=e458]:
                  - button "下载 高等数学课程封面.png" [ref=e459] [cursor=pointer]
                  - button "更多操作 高等数学课程封面.png" [ref=e462] [cursor=pointer]
              - generic [ref=e466]:
                - generic [ref=e468]:
                  - generic "课堂观察记录与同伴反馈说明.txt" [ref=e469]:
                    - generic [ref=e470]: 课堂观察记录与同伴反馈说明
                    - generic [ref=e471]: .txt
                  - generic "341 B" [ref=e472]
                - button "预览 课堂观察记录与同伴反馈说明.txt" [ref=e473] [cursor=pointer]
                - generic [ref=e474]:
                  - button "下载 课堂观察记录与同伴反馈说明.txt" [ref=e475] [cursor=pointer]
                  - button "更多操作 课堂观察记录与同伴反馈说明.txt" [ref=e478] [cursor=pointer]
            - paragraph [ref=e481]: 支持 PDF、常见图片、文档、表格、演示文稿、TXT 和 ZIP。最多 8 个，每个不超过 10 MB，合计不超过 25 MB；不接收空文件和重复文件。
            - status [ref=e482]: 也可将文件拖入此区域。
          - generic [ref=e483]:
            - status [ref=e484]: 3 / 8 个附件 · 合计 1 MB / 25 MB。附件已就绪，可保存。
            - generic [ref=e485]:
              - button "保存附件" [ref=e486] [cursor=pointer]
              - button "恢复示例" [ref=e488] [cursor=pointer]
        - group [ref=e490]:
          - generic "权限与失效示例" [ref=e491] [cursor=pointer]
    - generic [ref=e492]:
      - heading "文件与任务状态" [level=2] [ref=e493]
      - paragraph [ref=e494]: 白底和浅灰底使用相同结构；文件身份、上传状态与关联任务分别表达。
      - generic [ref=e496]:
        - generic [ref=e497]:
          - paragraph [ref=e498]: 两列共享同一组示例状态。除课程导读的真实 PDF 外，文件信息、上传、字幕、报告和审核均为本页演示。
          - button "恢复示例" [ref=e499] [cursor=pointer]
        - generic [ref=e501]:
          - region "白底 · 浅描边" [ref=e502]:
            - heading "白底 · 浅描边" [level=3] [ref=e503]
            - generic [ref=e504]:
              - group "课程导读：从问题到证据.pdf 示例" [ref=e505]:
                - generic [ref=e506]:
                  - generic [ref=e508]:
                    - generic "课程导读：从问题到证据.pdf" [ref=e509]:
                      - generic [ref=e510]: 课程导读：从问题到证据
                      - generic [ref=e511]: .pdf
                    - generic [ref=e512]: 965 B
                  - button "预览示例 课程导读：从问题到证据.pdf" [ref=e513] [cursor=pointer]
                  - generic [ref=e515]:
                    - button "下载示例 课程导读：从问题到证据.pdf" [ref=e516] [cursor=pointer]
                    - button "更多操作 课程导读：从问题到证据.pdf" [ref=e519] [cursor=pointer]
              - group "课堂录像.mp4 示例" [ref=e522]:
                - generic [ref=e523]:
                  - generic [ref=e525]:
                    - generic "课堂录像.mp4" [ref=e526]:
                      - generic [ref=e527]: 课堂录像
                      - generic [ref=e528]: .mp4
                    - generic [ref=e530]:
                      - progressbar "模拟上传进度 课堂录像.mp4" [ref=e531]: x
                      - generic [ref=e534]: 42%
                  - button "预览示例 课堂录像.mp4" [disabled] [ref=e535]
                  - button "取消上传" [ref=e538] [cursor=pointer]:
                    - generic [ref=e539]: 取消
              - group "课堂录音.mp3 示例" [ref=e540]:
                - generic [ref=e541]:
                  - generic [ref=e543]:
                    - generic "课堂录音.mp3" [ref=e544]:
                      - generic [ref=e545]: 课堂录音
                      - generic [ref=e546]: .mp3
                    - generic [ref=e547]: 4.6 MB · 上传失败
                  - button "预览示例 课堂录音.mp3" [disabled] [ref=e548]
                  - generic [ref=e551]:
                    - button "重试上传" [ref=e552] [cursor=pointer]:
                      - generic [ref=e553]: 重试
                    - button "更多操作 课堂录音.mp3" [ref=e554] [cursor=pointer]
              - group "研究论文.pdf 示例" [ref=e557]:
                - generic [ref=e558]:
                  - generic [ref=e560]:
                    - generic "研究论文.pdf" [ref=e561]:
                      - generic [ref=e562]: 研究论文
                      - generic [ref=e563]: .pdf
                    - generic [ref=e564]: 1.8 MB · 检测报告未读
                  - button "预览示例 研究论文.pdf" [ref=e565] [cursor=pointer]
                  - generic [ref=e570]:
                    - button "查看报告" [ref=e571] [cursor=pointer]
                    - button "更多操作 研究论文.pdf" [ref=e573] [cursor=pointer]
              - group "授课录像.mp4 示例" [ref=e576]:
                - generic [ref=e577]:
                  - generic [ref=e579]:
                    - generic "授课录像.mp4" [ref=e580]:
                      - generic [ref=e581]: 授课录像
                      - generic [ref=e582]: .mp4
                    - generic [ref=e583]: 64 MB
                  - button "预览示例 授课录像.mp4" [ref=e584] [cursor=pointer]
                  - generic [ref=e586]:
                    - button "下载说明 授课录像.mp4" [ref=e587] [cursor=pointer]
                    - button "更多操作 授课录像.mp4" [ref=e590] [cursor=pointer]
                - generic [ref=e593]:
                  - generic [ref=e597]:
                    - text: 字幕生成失败
                    - paragraph [ref=e598]: 原视频状态正常 · 播放、下载为示例
                  - button "重试字幕" [ref=e599] [cursor=pointer]
              - group "设备申请.pdf 示例" [ref=e601]:
                - generic [ref=e602]:
                  - generic [ref=e604]:
                    - generic "设备申请.pdf" [ref=e605]:
                      - generic [ref=e606]: 设备申请
                      - generic [ref=e607]: .pdf
                    - generic [ref=e608]: 860 KB · 关联申请待你审核
                  - button "预览示例 设备申请.pdf" [ref=e609] [cursor=pointer]
                  - generic [ref=e612]:
                    - button "去审核" [ref=e613] [cursor=pointer]
                    - button "更多操作 设备申请.pdf" [ref=e615] [cursor=pointer]
              - group "课堂资料.pdf 示例" [ref=e618]:
                - generic [ref=e619]:
                  - generic [ref=e621]:
                    - generic "课堂资料.pdf" [ref=e622]:
                      - generic [ref=e623]: 课堂资料
                      - generic [ref=e624]: .pdf
                    - generic [ref=e625]: 2.1 MB · 禁止下载
                  - button "预览示例 课堂资料.pdf" [ref=e626] [cursor=pointer]
                  - generic [ref=e629]:
                    - button "预览" [ref=e630] [cursor=pointer]
                    - button "更多操作 课堂资料.pdf" [ref=e632] [cursor=pointer]
          - region "浅灰底" [ref=e635]:
            - heading "浅灰底" [level=3] [ref=e636]
            - generic [ref=e637]:
              - group "课程导读：从问题到证据.pdf 示例" [ref=e638]:
                - generic [ref=e639]:
                  - generic [ref=e641]:
                    - generic "课程导读：从问题到证据.pdf" [ref=e642]:
                      - generic [ref=e643]: 课程导读：从问题到证据
                      - generic [ref=e644]: .pdf
                    - generic [ref=e645]: 965 B
                  - button "预览示例 课程导读：从问题到证据.pdf" [ref=e646] [cursor=pointer]
                  - generic [ref=e648]:
                    - button "下载示例 课程导读：从问题到证据.pdf" [ref=e649] [cursor=pointer]
                    - button "更多操作 课程导读：从问题到证据.pdf" [ref=e652] [cursor=pointer]
              - group "课堂录像.mp4 示例" [ref=e655]:
                - generic [ref=e656]:
                  - generic [ref=e658]:
                    - generic "课堂录像.mp4" [ref=e659]:
                      - generic [ref=e660]: 课堂录像
                      - generic [ref=e661]: .mp4
                    - generic [ref=e663]:
                      - progressbar "模拟上传进度 课堂录像.mp4" [ref=e664]: x
                      - generic [ref=e667]: 42%
                  - button "预览示例 课堂录像.mp4" [disabled] [ref=e668]
                  - button "取消上传" [ref=e671] [cursor=pointer]:
                    - generic [ref=e672]: 取消
              - group "课堂录音.mp3 示例" [ref=e673]:
                - generic [ref=e674]:
                  - generic [ref=e676]:
                    - generic "课堂录音.mp3" [ref=e677]:
                      - generic [ref=e678]: 课堂录音
                      - generic [ref=e679]: .mp3
                    - generic [ref=e680]: 4.6 MB · 上传失败
                  - button "预览示例 课堂录音.mp3" [disabled] [ref=e681]
                  - generic [ref=e684]:
                    - button "重试上传" [ref=e685] [cursor=pointer]:
                      - generic [ref=e686]: 重试
                    - button "更多操作 课堂录音.mp3" [ref=e687] [cursor=pointer]
              - group "研究论文.pdf 示例" [ref=e690]:
                - generic [ref=e691]:
                  - generic [ref=e693]:
                    - generic "研究论文.pdf" [ref=e694]:
                      - generic [ref=e695]: 研究论文
                      - generic [ref=e696]: .pdf
                    - generic [ref=e697]: 1.8 MB · 检测报告未读
                  - button "预览示例 研究论文.pdf" [ref=e698] [cursor=pointer]
                  - generic [ref=e703]:
                    - button "查看报告" [ref=e704] [cursor=pointer]
                    - button "更多操作 研究论文.pdf" [ref=e706] [cursor=pointer]
              - group "授课录像.mp4 示例" [ref=e709]:
                - generic [ref=e710]:
                  - generic [ref=e712]:
                    - generic "授课录像.mp4" [ref=e713]:
                      - generic [ref=e714]: 授课录像
                      - generic [ref=e715]: .mp4
                    - generic [ref=e716]: 64 MB
                  - button "预览示例 授课录像.mp4" [ref=e717] [cursor=pointer]
                  - generic [ref=e719]:
                    - button "下载说明 授课录像.mp4" [ref=e720] [cursor=pointer]
                    - button "更多操作 授课录像.mp4" [ref=e723] [cursor=pointer]
                - generic [ref=e726]:
                  - generic [ref=e730]:
                    - text: 字幕生成失败
                    - paragraph [ref=e731]: 原视频状态正常 · 播放、下载为示例
                  - button "重试字幕" [ref=e732] [cursor=pointer]
              - group "设备申请.pdf 示例" [ref=e734]:
                - generic [ref=e735]:
                  - generic [ref=e737]:
                    - generic "设备申请.pdf" [ref=e738]:
                      - generic [ref=e739]: 设备申请
                      - generic [ref=e740]: .pdf
                    - generic [ref=e741]: 860 KB · 关联申请待你审核
                  - button "预览示例 设备申请.pdf" [ref=e742] [cursor=pointer]
                  - generic [ref=e745]:
                    - button "去审核" [ref=e746] [cursor=pointer]
                    - button "更多操作 设备申请.pdf" [ref=e748] [cursor=pointer]
              - group "课堂资料.pdf 示例" [ref=e751]:
                - generic [ref=e752]:
                  - generic [ref=e754]:
                    - generic "课堂资料.pdf" [ref=e755]:
                      - generic [ref=e756]: 课堂资料
                      - generic [ref=e757]: .pdf
                    - generic [ref=e758]: 2.1 MB · 禁止下载
                  - button "预览示例 课堂资料.pdf" [ref=e759] [cursor=pointer]
                  - generic [ref=e762]:
                    - button "预览" [ref=e763] [cursor=pointer]
                    - button "更多操作 课堂资料.pdf" [ref=e765] [cursor=pointer]
    - generic [ref=e768]:
      - heading "完整五态" [level=2] [ref=e769]
      - paragraph [ref=e770]: 处理中保留可读文字和动态提示；失败同时使用文字和图标。
      - group "附件状态对照" [ref=e772]:
        - generic [ref=e775]:
          - generic [ref=e776]: idle.pdf
          - generic [ref=e777]: 等待上传
        - generic [ref=e780]:
          - generic [ref=e781]: uploading.pdf
          - generic [ref=e782]: 正在上传
        - generic [ref=e785]:
          - generic [ref=e786]: processing.pdf
          - generic [ref=e787]: 正在处理
        - generic [ref=e790]:
          - generic [ref=e791]: error.pdf
          - generic [ref=e792]: 上传失败，请重试
        - generic [ref=e795]:
          - generic [ref=e796]: done.pdf
          - generic [ref=e797]: 已上传 · 1.8 MB
    - generic [ref=e798]:
      - heading "三档尺寸与竖排媒体" [level=2] [ref=e799]
      - generic [ref=e800]:
        - generic [ref=e801]:
          - generic [ref=e804]:
            - generic [ref=e805]: 课程资料.pdf
            - generic [ref=e806]: default · PDF
          - generic [ref=e809]:
            - generic [ref=e810]: 课程资料.pdf
            - generic [ref=e811]: sm · PDF
          - generic [ref=e814]:
            - generic [ref=e815]: 课程资料.pdf
            - generic [ref=e816]: xs · PDF
        - generic [ref=e817]:
          - img "课程封面占位：从问题到证据" [ref=e819]:
            - generic [ref=e820]:
              - generic [ref=e821]: 课堂观察 · 第 04 讲
              - strong [ref=e822]: 从问题到证据
              - generic [ref=e823]: 观察 · 记录 · 讨论
          - generic [ref=e824]:
            - generic [ref=e825]: 课程封面
            - generic [ref=e826]: 预览占位
  - region [ref=e827]:
    - heading "使用边界" [level=2] [ref=e828]
    - generic [ref=e829]:
      - generic [ref=e830]:
        - heading "适合用在" [level=3] [ref=e831]
        - list [ref=e832]:
          - listitem [ref=e833]: 表单、消息或资料区需要展示文件和处理状态。
          - listitem [ref=e834]: 课程附件需要选择、校验、上传、预览、下载或替换。
      - generic [ref=e835]:
        - heading "避免用在" [level=3] [ref=e836]
        - list [ref=e837]:
          - listitem [ref=e838]: 把前端校验和操作显隐当作服务器权限或安全校验。
          - listitem [ref=e839]: 把整卡按钮与移除按钮做成嵌套按钮。
  - generic [ref=e840]:
    - region [ref=e841]:
      - heading "API 与结构" [level=2] [ref=e842]
      - table [ref=e844]:
        - caption [ref=e845]: Attachment 文件附件 常用接口
        - rowgroup [ref=e846]:
          - row [ref=e847]:
            - columnheader "名称" [ref=e848]
            - columnheader "类型" [ref=e849]
            - columnheader "默认" [ref=e850]
            - columnheader "说明" [ref=e851]
        - rowgroup [ref=e852]:
          - row [ref=e853]:
            - rowheader [ref=e854]:
              - code [ref=e855]: useAttachmentUpload
            - cell [ref=e856]:
              - code [ref=e857]: items / constraints / upload / readOnly
            - cell "—" [ref=e858]
            - cell "管理文件选择、校验、上传、取消和重试；上传适配器由宿主提供。" [ref=e859]
          - row [ref=e860]:
            - rowheader [ref=e861]:
              - code [ref=e862]: AttachmentList
            - cell [ref=e863]:
              - code [ref=e864]: items / surface / readOnly
            - cell "—" [ref=e865]
            - cell "outlined / filled 两种表面；下载主操作与更多菜单遵循独立权限。" [ref=e866]
          - row [ref=e867]:
            - rowheader [ref=e868]:
              - code [ref=e869]: AttachmentList size
            - cell [ref=e870]:
              - code [ref=e871]: default / sm
            - cell "default" [ref=e872]
            - cell "普通附件行与紧凑草稿卡；不改变底层 Attachment 的三档尺寸。" [ref=e873]
          - row [ref=e874]:
            - rowheader [ref=e875]:
              - code [ref=e876]: AttachmentList orientation / layout
            - cell [ref=e877]:
              - code [ref=e878]: horizontal / vertical；list / wrap / grid
            - cell "horizontal / list" [ref=e879]
            - cell "卡片内部方向与集合排列独立；折叠、总数和重试范围由宿主控制。" [ref=e880]
          - row [ref=e881]:
            - rowheader [ref=e882]:
              - code [ref=e883]: AttachmentList actions
            - cell [ref=e884]:
              - code [ref=e885]: default / draft
            - cell "default" [ref=e886]
            - cell "常规查看下载操作，或草稿中的直接移除。" [ref=e887]
          - row [ref=e888]:
            - rowheader [ref=e889]:
              - code [ref=e890]: Attachment state
            - cell [ref=e891]:
              - code [ref=e892]: idle / uploading / processing / error / done
            - cell "done" [ref=e893]
            - cell "底层附件的五种显示状态。" [ref=e894]
          - row [ref=e895]:
            - rowheader [ref=e896]:
              - code [ref=e897]: Attachment size
            - cell [ref=e898]:
              - code [ref=e899]: default / sm / xs
            - cell "default" [ref=e900]
            - cell "三档源码尺寸，显式 size 不再次被密度缩放。" [ref=e901]
      - paragraph [ref=e902]: Parts / Slots：AttachmentPicker、AttachmentList、AttachmentPreview、useAttachmentUpload、Attachment、Group、Media、Content、Title、Description、Actions、Action、Trigger
    - region [ref=e903]:
      - heading "调用示例" [level=2] [ref=e904]
      - generic [ref=e905]:
        - generic [ref=e906]:
          - button "复制代码" [ref=e907] [cursor=pointer]
          - status
        - code [ref=e910]: "const attachments = useAttachmentUpload({ initialItems, constraints: { maxFiles: 8, maxFileSize: 10 * 1024 * 1024 }, upload: uploadFile, }); <AttachmentPicker onFiles={files => { attachments.addFiles(files); }} /> <AttachmentList items={attachments.items} onStart={item => { void attachments.start(item.id); }} onRetry={item => { void attachments.retry(item.id); }} onCancel={item => attachments.cancel(item.id)} onRemove={item => attachments.remove(item.id)} onReplace={(item, file) => { attachments.replaceFile(item.id, file); }} /> <Button disabled={!attachments.summary.canSubmit}>保存附件</Button>"
      - paragraph [ref=e911]:
        - text: 当前源码：
        - code [ref=e912]: packages/ui/src/attachment-workflow/index.ts
```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { verifyConversationReading } from "/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/tests/e2e/helpers/conversation-scrolling";
  4   | const evidence="/Users/wenchengkai/CodexFile/\u96e8\u8bfe\u5802-shadcn\u7ec4\u4ef6\u5e93\u67b6\u6784/.worktrees/card-v2/evidence/runtime/g1-g6-closeout-2026-10-17/run-01/browser/g6";
  5   | mkdirSync(evidence,{recursive:true});
  6   | async function open(page:Page,id:string){await page.goto(`/#${id}`);await expect(page.locator(`#${id}-title`)).toBeVisible();}
  7   | const ids=["data-table","aspect-ratio","attachment","direction","drawer","input-otp","carousel","bubble","marker","message","message-scroller","questionnaire"];
  8   | test.beforeEach(({page})=>page.on("pageerror",error=>{throw error;}));
  9   | test("12 routes, themes, density, 390px and source examples",async({page,context},info)=>{
  10  |  await context.grantPermissions(["clipboard-read","clipboard-write"]);const facts=[];
  11  |  for(const id of ids){
  12  |   await page.goto(`/#${id}`); await expect(page.locator(`#${id}-title`)).toBeVisible();
  13  |   await expect(page.getByRole("heading",{name:"API 与结构",exact:true})).toBeVisible();
  14  |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),id).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  15  |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-light.png`});
  16  |   await page.getByRole("button",{name:"深色",exact:true}).click();await page.getByRole("button",{name:"紧凑密度",exact:true}).click();
  17  |   await expect(page.locator("main.component-doc")).toHaveAttribute("data-rain-theme","dark");
  18  |   expect(await page.evaluate(()=>document.documentElement.scrollWidth),`${id} dark`).toBeLessThanOrEqual(page.viewportSize()!.width+1);
  19  |   await page.locator(".component-doc__example").first().screenshot({path:`${evidence}/${id}-${info.project.name}-dark-compact.png`});
  20  |   await page.getByRole("button",{name:"复制代码",exact:true}).last().click();await expect(page.getByText("已复制",{exact:true})).toBeVisible();
  21  |   facts.push({id,width:await page.evaluate(()=>document.documentElement.scrollWidth),copied:await page.evaluate(()=>navigator.clipboard.readText())});
  22  |  }
  23  |  writeFileSync(`${evidence}/matrix-${info.project.name}.json`,JSON.stringify(facts,null,2));
  24  | });
  25  | test("media ratio, attachment actions and direction islands",async({page})=>{
  26  |  await open(page,"aspect-ratio"); const ratios=await page.locator('.g6-media-grid').first().locator('[data-rain-id="ui-aspect-ratio"]').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return r.width/r.height;}));
  27  |  expect(ratios[0]).toBeCloseTo(16/9,1);expect(ratios[1]).toBeCloseTo(1,1);expect(ratios[2]).toBeCloseTo(4/3,1);
  28  |  await expect(page.locator('.g6-media-image--cover')).toHaveCSS('object-fit','cover');await expect(page.locator('.g6-media-image--contain')).toHaveCSS('object-fit','contain');
  29  |  await open(page,"attachment");await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('button',{name:'关闭',exact:true}).click();await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeFocused();
> 30  |  await page.getByRole('button',{name:'移除 课程导读：从问题到证据.pdf',exact:true}).click();await expect(page.getByRole('dialog')).toHaveCount(0);await expect(page.getByRole('button',{name:'预览 高等数学课程封面.png',exact:true})).toBeFocused();
      |                                                                        ^ Error: locator.click: Test timeout of 60000ms exceeded.
  31  |  await page.locator('.rain-attachment-picker input[type="file"]').setInputFiles({name:'课堂补充说明.txt',mimeType:'text/plain',buffer:Buffer.from('课堂补充说明')});await page.getByRole('button',{name:'上传 课堂补充说明.txt',exact:true}).click();await expect(page.getByTestId('attachment-live-list')).toContainText('正在上传');await expect(page.getByRole('button',{name:'保存附件',exact:true})).toBeEnabled({timeout:4000});
  32  |  await open(page,"direction");await expect(page.locator('.g6-direction-example[dir="rtl"]')).toContainText('Context: rtl');await expect(page.locator('.g6-direction-example[dir="ltr"]')).toContainText('Context: ltr');
  33  | });
  34  | test("task drawer modality, draft protection, menu and nested focus",async({page},info)=>{
  35  |  await open(page,"drawer");await page.getByRole('button',{name:'深色',exact:true}).click();await page.getByRole('button',{name:'紧凑密度',exact:true}).click();
  36  |  const trigger=page.getByRole('button',{name:'编辑课前任务',exact:true});await trigger.click();const dialog=page.getByRole('dialog',{name:'编辑课前任务',exact:true});await expect(dialog).toHaveAttribute('data-density','compact');
  37  |  await page.getByRole('button',{name:'展开编辑',exact:true}).click();await dialog.getByRole('textbox',{name:'任务标题',exact:true}).fill('本地课堂任务草稿');await dialog.press('Escape');await expect(page.getByRole('alert')).toContainText('未保存');await page.getByRole('button',{name:'继续编辑',exact:true}).click();
  38  |  await page.getByRole('button',{name:'完成方式：个人记录',exact:true}).click();await page.getByRole('menuitem',{name:'小组讨论',exact:true}).click();await expect(page.getByRole('button',{name:'完成方式：小组讨论',exact:true})).toBeVisible();
  39  |  await page.getByRole('button',{name:'查看学生任务预览',exact:true}).click();await expect(page.getByRole('dialog',{name:'学生任务预览',exact:true})).toContainText('本地课堂任务草稿');await page.getByRole('button',{name:'返回编辑',exact:true}).click();await expect(page.getByRole('button',{name:'查看学生任务预览',exact:true})).toBeFocused();
  40  |  await dialog.screenshot({path:`${evidence}/drawer-task-${info.project.name}.png`});await page.getByRole('button',{name:'取消修改',exact:true}).click();await expect(trigger).toBeFocused();await expect(page.getByTestId('drawer-saved-title')).not.toContainText('本地课堂任务草稿');
  41  |  for(const side of ['底部','顶部','左侧','右侧']){await page.getByRole('button',{name:`从${side}打开`,exact:true}).click();await page.getByRole('button',{name:`关闭${side}抽屉`,exact:true}).click();await expect(page.getByRole('button',{name:`从${side}打开`,exact:true})).toBeFocused();}
  42  |  await page.getByRole('button',{name:'打开非模态记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑非模态记录');await page.getByRole('button',{name:'记录一次观察',exact:true}).click();await expect(page.getByTestId('drawer-observation-count')).toContainText('1次');await expect(page.getByRole('dialog',{name:'非模态课堂记录',exact:true})).toBeVisible();await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  43  |  await page.getByRole('button',{name:'打开焦点约束记录',exact:true}).click();await page.getByRole('textbox',{name:'随堂记录',exact:true}).fill('可以编辑焦点约束记录');await page.getByRole('button',{name:'关闭课堂记录',exact:true}).press('Tab');await expect.poll(()=>page.evaluate(()=>!!document.activeElement?.closest('[role="dialog"]'))).toBe(true);await page.getByRole('button',{name:'关闭课堂记录',exact:true}).click();
  44  | });
  45  | test("OTP paste, explicit verification, error preservation and retry",async({page,context})=>{
  46  |  await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,"input-otp");const form=page.getByTestId('otp-verification-form'),input=form.getByRole('textbox',{name:'课堂验证码',exact:true});await expect(form.locator('input')).toHaveCount(1);
  47  |  await page.evaluate(()=>navigator.clipboard.writeText('123456'));await input.focus();await input.press('ControlOrMeta+V');await expect(input).toHaveValue('123456');await expect(page.getByTestId('otp-submitted-code')).toContainText('尚未提交');
  48  |  await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证码已过期');await expect(input).toHaveValue('123456');await expect(input).toHaveAttribute('aria-invalid','true');await input.fill('654321');await form.getByRole('button',{name:'验证并进入课堂',exact:true}).click();await expect(form).toContainText('验证通过');
  49  | });
  50  | test("carousel actual API, input key ownership, RTL and vertical",async({page})=>{
  51  |  await open(page,"carousel");const first=page.getByRole('region',{name:'课程学习资料',exact:true});await expect(page.getByTestId('carousel-position')).toContainText('第1份 / 共3份');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).fill('课堂笔记');await page.getByRole('textbox',{name:'记录第1份资料笔记',exact:true}).press('ArrowRight');await expect(page.getByTestId('carousel-position')).toContainText('第1份');
  52  |  await first.getByRole('button',{name:'阅读下一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('第2份');await page.getByRole('button',{name:'添加一份资料',exact:true}).click();await expect(page.getByTestId('carousel-position')).toContainText('共4份');
  53  |  const rtl=page.getByRole('region',{name:'资料 RTL 示例',exact:true});await expect(rtl).toHaveAttribute('dir','rtl');await rtl.press('ArrowLeft');await expect(rtl.getByRole('button',{name:'上一份',exact:true})).toBeEnabled();
  54  |  const vertical=page.getByRole('region',{name:'纵向课程摘录',exact:true});await vertical.press('ArrowDown');await expect(vertical.getByRole('button',{name:'上一项',exact:true})).toBeEnabled();
  55  | });
  56  | test("conversation reactions, copy, local retry and meaningful marker",async({page,context})=>{
  57  |  await open(page,"bubble");const reaction=page.getByRole('button',{name:/有帮助/});await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','true');await reaction.click();await expect(reaction).toHaveAttribute('aria-pressed','false');
  58  |  await open(page,"marker");await page.getByRole('button',{name:'查看说明',exact:true}).click();await expect(page.locator('#g6-marker-details')).toBeVisible();
  59  |  await context.grantPermissions(['clipboard-read','clipboard-write']);await open(page,"message");await page.getByRole('button',{name:'复制辅导回答',exact:true}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('先写下你直接看到的事实');await page.getByRole('button',{name:'重试发送补充问题',exact:true}).click();await expect(page.getByText('已发送 · 本地模拟',{exact:true})).toBeVisible();
  60  | });
  61  | test("scroller preserves reading on stream/prepend, pauses and commands",async({page})=>{
  62  |  await verifyConversationReading(page);
  63  | });
  64  | test("questionnaire conditional validation, native summary, restore and submit failure",async({page})=>{
  65  |  await open(page,"questionnaire");const form=page.getByRole('form',{name:'课堂反馈',exact:true});await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('alert')).toBeVisible();await form.getByRole('radio',{name:/其他目标/}).check();await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('一');await page.getByRole('button',{name:'保存本页草稿',exact:true}).click();await page.getByRole('button',{name:'恢复草稿',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await expect(form.getByRole('progressbar')).toContainText('第 2 题');
  66  |  await form.getByRole('textbox',{name:'具体学习目标',exact:true}).fill('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('checkbox',{name:/观察记录/}).check();await form.getByRole('button',{name:'上一题',exact:true}).click();await expect(form.getByRole('textbox',{name:'具体学习目标',exact:true})).toHaveValue('希望理解证据');await form.getByRole('button',{name:'下一题',exact:true}).click();await form.getByRole('button',{name:'下一题',exact:true}).click();await page.getByRole('button',{name:'模拟提交失败：关',exact:true}).click();await form.getByRole('button',{name:'跳过并提交',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'模拟提交失败：开',exact:true}).click();await form.getByRole('button',{name:'提交反馈',exact:true}).click();await expect(page.getByRole('region',{name:'反馈摘要',exact:true})).toContainText('希望理解证据');
  67  | });
  68  | test("reduced motion and forced colors keep state readable",async({page})=>{
  69  |  await page.emulateMedia({reducedMotion:'reduce',forcedColors:'active'});await open(page,"marker");await expect(page.locator('.rain-marker__content--shimmer')).toHaveCSS('animation-name','none');await expect(page.locator('.rain-marker__content--shimmer')).toBeVisible();await open(page,"attachment");await expect(page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true})).toBeVisible();await page.getByRole('button',{name:'预览 课程导读：从问题到证据.pdf',exact:true}).press('Enter');await expect(page.getByRole('dialog')).toBeVisible();
  70  | });
  71  | test("isolated installed packages: default, local recipe, sibling and copied table",async({page})=>{
  72  |  await page.goto('http://127.0.0.1:5398');await expect(page.getByRole('heading',{name:'G6 独立包消费',exact:true})).toBeVisible();
  73  |  const first=page.getByTestId('default'),local=page.getByTestId('local'),sibling=page.getByTestId('sibling');
  74  |  const padding=(host:ReturnType<typeof page.getByTestId>)=>host.locator('.rain-bubble__content').first().evaluate(n=>getComputedStyle(n).paddingInlineStart);
  75  |  expect(await padding(first)).toBe(await padding(sibling));expect(await padding(local)).not.toBe(await padding(first));
  76  |  const drawerPadding=[];
  77  |  for (const [host,label] of [[first,'默认'],[local,'局改'],[sibling,'未改兄弟']] as const) {
  78  |   const trigger=host.getByRole('button',{name:`打开${label}任务`,exact:true});await trigger.click();const popup=page.getByRole('dialog',{name:`${label}任务`,exact:true});await expect(popup).toBeVisible();drawerPadding.push(await popup.evaluate(el=>getComputedStyle(el).paddingInlineStart));await popup.getByRole('button',{name:'关闭任务',exact:true}).click();await expect(trigger).toBeFocused();
  79  |  }
  80  |  expect(drawerPadding[0]).toBe(drawerPadding[2]);expect(drawerPadding[1]).not.toBe(drawerPadding[0]);
  81  |  await first.getByRole('textbox',{name:'默认验证码',exact:true}).fill('1234');await expect(first.getByRole('textbox',{name:'默认验证码',exact:true})).toHaveValue('1234');
  82  |  await first.getByRole('radio',{name:'复习课程',exact:true}).check();await first.getByRole('button',{name:'提交默认反馈',exact:true}).click();await expect(first.getByRole('status')).toContainText('反馈：review');
  83  |  await expect(page.getByTestId('table-default').getByRole('textbox',{name:'查找资料',exact:true})).toBeVisible();
  84  |  const localFacts=[];
  85  |  for (const [id,selector,property] of [
  86  |   ['aspect-ratio','[data-rain-id="ui-aspect-ratio"]','padding-inline-start'],['attachment','[data-rain-id="ui-attachment"]','padding-inline-start'],
  87  |   ['input-otp','[data-slot="input-otp-group"]','gap'],['carousel','[data-rain-id="ui-carousel"]','padding-inline-start'],
  88  |   ['marker','[data-rain-id="ui-marker"]','padding-inline-start'],['message','[data-rain-id="ui-message"]','padding-inline-start'],
  89  |   ['message-scroller','[data-rain-id="ui-message-scroller"]','height'],['questionnaire','[data-rain-id="ui-questionnaire"]','padding-inline-start'],
  90  |  ] as const) {
  91  |   const value=async(host:ReturnType<typeof page.getByTestId>)=>host.locator(selector).first().evaluate((element,name)=>getComputedStyle(element).getPropertyValue(name),property);
  92  |   const values=[await value(first),await value(local),await value(sibling)];expect(values[0],id).toBe(values[2]);expect(values[1],id).not.toBe(values[0]);localFacts.push({id,property,values});
  93  |  }
  94  |  expect(await local.locator('[dir="rtl"]').count()).toBe(1);expect(await sibling.locator('[dir="rtl"]').count()).toBe(0);
  95  |  const tablePadding=async(mode:string)=>page.getByTestId(`table-${mode}`).locator('.data-table-recipe').evaluate(el=>getComputedStyle(el).paddingInlineStart);
  96  |  expect(await tablePadding('default')).toBe(await tablePadding('sibling'));expect(await tablePadding('local')).not.toBe(await tablePadding('default'));
  97  |  writeFileSync(`${evidence}/consumer-local-isolation-${page.viewportSize()!.width}.json`,JSON.stringify({localFacts,drawerPadding,tableFork:'source-copy-export-and-one-root-class-only',tablePadding:[await tablePadding('default'),await tablePadding('local'),await tablePadding('sibling')],direction:'local RTL; sibling LTR'},null,2));
  98  | });
  99  | test("data table keeps stable selection, query scope, columns and failed refresh",async({page})=>{
  100 |  await open(page,'data-table');await page.getByRole('checkbox',{name:'选择当前页可操作资料',exact:true}).locator('..').click();await expect(page.getByText('已选 4 份资料',{exact:true})).toBeVisible();await expect(page.getByRole('checkbox',{name:'选择 课堂观察记录',exact:true})).toBeDisabled();await page.getByRole('button',{name:'取消选择',exact:true}).click();
  101 |  await page.getByRole('checkbox',{name:'选择 设计方法导论',exact:true}).press('Space');await page.getByRole('button',{name:'下一页',exact:true}).click();await expect(page.getByText('含其他页 1 份',{exact:true})).toBeVisible();await page.getByRole('button',{name:'上一页',exact:true}).click();await expect(page.getByRole('checkbox',{name:'选择 设计方法导论',exact:true})).toBeChecked();
  102 |  await page.getByRole('button',{name:'按资料名称排序',exact:true}).click();await page.getByRole('button',{name:'下一页',exact:true}).click();await expect(page.getByText('已选 1 份资料',{exact:true})).toBeVisible();
  103 |  await page.getByRole('textbox',{name:'查找资料',exact:true}).fill('教学案例');await page.getByRole('button',{name:'搜索',exact:true}).click();await expect(page.getByRole('button',{name:'上一页',exact:true})).toBeDisabled();await expect(page.getByRole('button',{name:'取消选择',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'清空筛选',exact:true}).click();
  104 |  await page.getByRole('button',{name:'显示列',exact:true}).click();await page.getByRole('menuitemcheckbox',{name:'资料类型',exact:true}).click();await page.keyboard.press('Escape');await expect(page.getByRole('columnheader',{name:'资料类型',exact:true})).toHaveCount(0);await page.getByText('试用加载与空数据状态',{exact:true}).click();await page.getByRole('checkbox',{name:'下次刷新模拟失败',exact:true}).locator('..').click();await page.getByRole('button',{name:'刷新资料',exact:true}).click();await expect(page.getByRole('alert')).toContainText('资料和选择已保留');await page.getByRole('button',{name:'重试',exact:true}).click();await expect(page.getByRole('alert')).toHaveCount(0);
  105 | });
  106 | test("drawer mouse swipe closes, while carousel drag retains its owning drawer",async({page})=>{
  107 |  await open(page,'drawer');await page.getByRole('button',{name:'从底部打开',exact:true}).click();const popup=page.getByRole('dialog',{name:'底部任务概览',exact:true});const handle=popup.locator('[data-slot="drawer-swipe-handle"]');await expect(handle).toBeVisible();await expect(popup).not.toHaveAttribute('data-starting-style','');await popup.evaluate(el=>Promise.all(el.getAnimations().map(animation=>animation.finished.catch(()=>{}))));
  108 |  const box=await handle.boundingBox();if(!box)throw new Error('Missing real swipe handle');await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2,Math.min(page.viewportSize()!.height-2,box.y+box.height/2+220),{steps:10});await page.mouse.up();await expect(popup).toHaveCount(0);
  109 |  await open(page,'carousel');await page.getByRole('button',{name:'在抽屉中阅读资料',exact:true}).click();const carouselPopup=page.getByRole('dialog',{name:'课堂资料阅读',exact:true});await expect(carouselPopup).toBeVisible();const viewport=carouselPopup.locator('[data-base-ui-swipe-ignore]');await expect(viewport).toHaveCount(1);const bounds=await viewport.boundingBox();if(!bounds)throw new Error('Missing Embla owned region');await page.mouse.move(bounds.x+bounds.width*.8,bounds.y+bounds.height*.5);await page.mouse.down();await page.mouse.move(bounds.x+bounds.width*.15,bounds.y+bounds.height*.5+3,{steps:12});await page.mouse.up();await expect(carouselPopup).toBeVisible();
  110 | });
  111 | 
```