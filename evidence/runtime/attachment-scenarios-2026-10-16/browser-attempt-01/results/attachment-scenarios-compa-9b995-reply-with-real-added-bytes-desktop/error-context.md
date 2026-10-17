# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: attachment-scenarios.spec.ts >> compact draft removes directly and sends a local reply with real added bytes
- Location: tests/e2e/attachment-scenarios.spec.ts:29:1

# Error details

```
Error: locator.setInputFiles: Error: strict mode violation: getByTestId('attachment-scenario-composer').locator('input[type="file"]') resolved to 5 elements:
    1) <input type="file" aria-label="选择替换文件 课堂讲义.txt" class="rain-attachment-list__input"/> aka getByTestId('attachment-scenario-composer').getByLabel('选择替换文件 课堂讲义.txt')
    2) <input type="file" aria-label="选择替换文件 课堂观察数据.csv" class="rain-attachment-list__input"/> aka getByTestId('attachment-scenario-composer').getByLabel('选择替换文件 课堂观察数据.csv')
    3) <input type="file" aria-label="选择替换文件 小组讨论记录.md" class="rain-attachment-list__input"/> aka getByTestId('attachment-scenario-composer').getByLabel('选择替换文件 小组讨论记录.md')
    4) <input type="file" aria-label="选择替换文件 课堂问题清单.json" class="rain-attachment-list__input"/> aka getByTestId('attachment-scenario-composer').getByLabel('选择替换文件 课堂问题清单.json')
    5) <input multiple hidden="" type="file" aria-label="添加草稿附件" aria-invalid="false" aria-describedby="_r_1g_-hint"/> aka getByRole('group', { name: '添加草稿附件' }).getByLabel('添加草稿附件')

Call log:
  - waiting for getByTestId('attachment-scenario-composer').locator('input[type="file"]')

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
          - generic [ref=e27]:
            - generic [ref=e28]:
              - heading "课程资料" [level=3] [ref=e29]
              - paragraph [ref=e30]: 普通列表 · 多文件与上传状态
            - generic [ref=e31]:
              - button "演示上传" [ref=e32] [cursor=pointer]
              - button "恢复普通列表示例" [ref=e34] [cursor=pointer]:
                - generic [ref=e35]: 恢复示例
          - group "添加课程附件" [ref=e36]:
            - generic [ref=e37]:
              - button "添加课程附件" [ref=e38] [cursor=pointer]
              - status [ref=e40]: 或将文件拖到这里。
          - status [ref=e42]:
            - generic [ref=e43]: 共 24 个
            - generic [ref=e44]: · 24 个已上传
          - generic [ref=e46]:
            - generic [ref=e48]:
              - generic [ref=e50]:
                - generic "课程导读.pdf" [ref=e51]:
                  - generic [ref=e52]: 课程导读
                  - generic [ref=e53]: .pdf
                - generic [ref=e54]: 965 B
              - button "预览 课程导读.pdf" [ref=e55] [cursor=pointer]
              - generic [ref=e56]:
                - button "下载 课程导读.pdf" [ref=e57] [cursor=pointer]
                - button "更多操作 课程导读.pdf" [ref=e60] [cursor=pointer]
            - generic [ref=e64]:
              - generic [ref=e66]:
                - generic "课堂讲义.txt" [ref=e67]:
                  - generic [ref=e68]: 课堂讲义
                  - generic [ref=e69]: .txt
                - generic [ref=e70]: 80 B
              - button "预览 课堂讲义.txt" [ref=e71] [cursor=pointer]
              - generic [ref=e72]:
                - button "下载 课堂讲义.txt" [ref=e73] [cursor=pointer]
                - button "更多操作 课堂讲义.txt" [ref=e76] [cursor=pointer]
            - generic [ref=e80]:
              - generic [ref=e82]:
                - generic "课堂观察数据.csv" [ref=e83]:
                  - generic [ref=e84]: 课堂观察数据
                  - generic [ref=e85]: .csv
                - generic [ref=e86]: 66 B
              - button "预览 课堂观察数据.csv" [ref=e87] [cursor=pointer]
              - generic [ref=e88]:
                - button "下载 课堂观察数据.csv" [ref=e89] [cursor=pointer]
                - button "更多操作 课堂观察数据.csv" [ref=e92] [cursor=pointer]
            - generic [ref=e96]:
              - generic [ref=e98]:
                - generic "小组讨论记录.md" [ref=e99]:
                  - generic [ref=e100]: 小组讨论记录
                  - generic [ref=e101]: .md
                - generic [ref=e102]: 103 B
              - button "预览 小组讨论记录.md" [ref=e103] [cursor=pointer]
              - generic [ref=e104]:
                - button "下载 小组讨论记录.md" [ref=e105] [cursor=pointer]
                - button "更多操作 小组讨论记录.md" [ref=e108] [cursor=pointer]
            - generic [ref=e112]:
              - generic [ref=e114]:
                - generic "课堂问题清单.json" [ref=e115]:
                  - generic [ref=e116]: 课堂问题清单
                  - generic [ref=e117]: .json
                - generic [ref=e118]: 91 B
              - button "预览 课堂问题清单.json" [ref=e119] [cursor=pointer]
              - generic [ref=e120]:
                - button "下载 课堂问题清单.json" [ref=e121] [cursor=pointer]
                - button "更多操作 课堂问题清单.json" [ref=e124] [cursor=pointer]
            - generic [ref=e128]:
              - img "缩略图 课程封面.png" [ref=e130]
              - generic [ref=e131]:
                - generic "课程封面.png" [ref=e132]:
                  - generic [ref=e133]: 课程封面
                  - generic [ref=e134]: .png
                - generic [ref=e135]: 1 MB
              - button "预览 课程封面.png" [ref=e136] [cursor=pointer]
              - generic [ref=e137]:
                - button "下载 课程封面.png" [ref=e138] [cursor=pointer]
                - button "更多操作 课程封面.png" [ref=e141] [cursor=pointer]
          - generic [ref=e144]:
            - generic [ref=e145]: 当前显示 6 / 24 个附件
            - button "展开全部 24 个" [ref=e146] [cursor=pointer]
        - region "紧凑草稿输入" [ref=e148]:
          - generic [ref=e149]:
            - generic [ref=e150]:
              - heading "发布课程消息" [level=3] [ref=e151]
              - paragraph [ref=e152]: 紧凑附件 · 草稿中的文件可直接移除
            - button "恢复草稿示例" [ref=e153] [cursor=pointer]
          - generic [ref=e155]:
            - generic [ref=e156]:
              - generic [ref=e158]:
                - generic [ref=e159]:
                  - status [ref=e160]:
                    - generic [ref=e161]: 共 11 个
                    - generic [ref=e162]: · 11 个已上传
                  - button "查看全部 11 个" [ref=e163] [cursor=pointer]
                - generic [ref=e166]:
                  - generic [ref=e168]:
                    - generic "课堂讲义.txt" [ref=e171]:
                      - generic [ref=e172]: 课堂讲义
                      - generic [ref=e173]: .txt
                    - button "预览 课堂讲义.txt" [active] [ref=e174] [cursor=pointer]
                    - button "移除 课堂讲义.txt" [ref=e176] [cursor=pointer]
                  - generic [ref=e180]:
                    - generic "课堂观察数据.csv" [ref=e183]:
                      - generic [ref=e184]: 课堂观察数据
                      - generic [ref=e185]: .csv
                    - button "预览 课堂观察数据.csv" [ref=e186] [cursor=pointer]
                    - button "移除 课堂观察数据.csv" [ref=e188] [cursor=pointer]
                  - generic [ref=e192]:
                    - generic "小组讨论记录.md" [ref=e195]:
                      - generic [ref=e196]: 小组讨论记录
                      - generic [ref=e197]: .md
                    - button "预览 小组讨论记录.md" [ref=e198] [cursor=pointer]
                    - button "移除 小组讨论记录.md" [ref=e200] [cursor=pointer]
                  - generic [ref=e204]:
                    - generic "课堂问题清单.json" [ref=e207]:
                      - generic [ref=e208]: 课堂问题清单
                      - generic [ref=e209]: .json
                    - button "预览 课堂问题清单.json" [ref=e210] [cursor=pointer]
                    - button "移除 课堂问题清单.json" [ref=e212] [cursor=pointer]
              - textbox "课程消息" [ref=e215]: 这是一组本周课程资料，请结合课堂笔记阅读。
              - generic [ref=e217]:
                - group "添加草稿附件" [ref=e218]:
                  - generic [ref=e219]:
                    - button "添加草稿附件" [ref=e220] [cursor=pointer]
                    - status [ref=e222]: 或将文件拖到这里。
                - button "发送到本页" [ref=e223] [cursor=pointer]
            - paragraph [ref=e225]: 仅在本页回显消息；此演示等待当前附件上传完成后发送，不提交真实课程消息。
        - region "弹窗附件列表" [ref=e226]:
          - generic [ref=e227]:
            - generic [ref=e228]:
              - heading "集中管理附件" [level=3] [ref=e229]
              - paragraph [ref=e230]: 弹窗内滚动列表，底部操作保持可见。
            - button "打开附件弹窗" [ref=e231] [cursor=pointer]
          - paragraph [ref=e233]: 当前有 24 个附件。关闭和重新打开不会重置文件；上传结果只保留在本页。
        - region "图片与视频网格" [ref=e234]:
          - generic [ref=e235]:
            - generic [ref=e236]:
              - heading "图片与视频" [level=3] [ref=e237]
              - paragraph [ref=e238]: 内容缩略图 · 文件名和操作留在画面下方
            - button "恢复媒体示例" [ref=e239] [cursor=pointer]
          - group "添加图片或视频" [ref=e241]:
            - generic [ref=e242]:
              - button "添加图片或视频" [ref=e243] [cursor=pointer]
              - status [ref=e245]: 或将文件拖到这里。
          - status [ref=e247]:
            - generic [ref=e248]: 共 12 个
            - generic [ref=e249]: · 12 个已上传
          - generic [ref=e251]:
            - generic [ref=e253]:
              - img "缩略图 课堂板书.png" [ref=e255]
              - generic [ref=e256]:
                - generic "课堂板书.png" [ref=e257]:
                  - generic [ref=e258]: 课堂板书
                  - generic [ref=e259]: .png
                - generic [ref=e260]: 大小未知
              - button "预览 课堂板书.png" [ref=e261] [cursor=pointer]
              - generic [ref=e262]:
                - button "下载 课堂板书.png" [ref=e263] [cursor=pointer]
                - button "更多操作 课堂板书.png" [ref=e266] [cursor=pointer]
            - generic [ref=e270]:
              - img "缩略图 课堂演示.mp4" [ref=e272]
              - generic [ref=e275]:
                - generic "课堂演示.mp4" [ref=e276]:
                  - generic [ref=e277]: 课堂演示
                  - generic [ref=e278]: .mp4
                - generic [ref=e279]: 207.3 KB
              - button "预览 课堂演示.mp4" [ref=e280] [cursor=pointer]
              - generic [ref=e281]:
                - button "下载 课堂演示.mp4" [ref=e282] [cursor=pointer]
                - button "更多操作 课堂演示.mp4" [ref=e285] [cursor=pointer]
            - generic [ref=e289]:
              - img "缩略图 分组讨论.png" [ref=e291]
              - generic [ref=e292]:
                - generic "分组讨论.png" [ref=e293]:
                  - generic [ref=e294]: 分组讨论
                  - generic [ref=e295]: .png
                - generic [ref=e296]: 大小未知
              - button "预览 分组讨论.png" [ref=e297] [cursor=pointer]
              - generic [ref=e298]:
                - button "下载 分组讨论.png" [ref=e299] [cursor=pointer]
                - button "更多操作 分组讨论.png" [ref=e302] [cursor=pointer]
            - generic [ref=e306]:
              - img "缩略图 实验过程.mp4" [ref=e308]
              - generic [ref=e311]:
                - generic "实验过程.mp4" [ref=e312]:
                  - generic [ref=e313]: 实验过程
                  - generic [ref=e314]: .mp4
                - generic [ref=e315]: 207.3 KB
              - button "预览 实验过程.mp4" [ref=e316] [cursor=pointer]
              - generic [ref=e317]:
                - button "下载 实验过程.mp4" [ref=e318] [cursor=pointer]
                - button "更多操作 实验过程.mp4" [ref=e321] [cursor=pointer]
            - generic [ref=e325]:
              - img "缩略图 实验装置.png" [ref=e327]
              - generic [ref=e328]:
                - generic "实验装置.png" [ref=e329]:
                  - generic [ref=e330]: 实验装置
                  - generic [ref=e331]: .png
                - generic [ref=e332]: 大小未知
              - button "预览 实验装置.png" [ref=e333] [cursor=pointer]
              - generic [ref=e334]:
                - button "下载 实验装置.png" [ref=e335] [cursor=pointer]
                - button "更多操作 实验装置.png" [ref=e338] [cursor=pointer]
            - generic [ref=e342]:
              - img "缩略图 课堂讲授.png" [ref=e344]
              - generic [ref=e345]:
                - generic "课堂讲授.png" [ref=e346]:
                  - generic [ref=e347]: 课堂讲授
                  - generic [ref=e348]: .png
                - generic [ref=e349]: 大小未知
              - button "预览 课堂讲授.png" [ref=e350] [cursor=pointer]
              - generic [ref=e351]:
                - button "下载 课堂讲授.png" [ref=e352] [cursor=pointer]
                - button "更多操作 课堂讲授.png" [ref=e355] [cursor=pointer]
            - generic [ref=e359]:
              - img "缩略图 自主阅读.png" [ref=e361]
              - generic [ref=e362]:
                - generic "自主阅读.png" [ref=e363]:
                  - generic [ref=e364]: 自主阅读
                  - generic [ref=e365]: .png
                - generic [ref=e366]: 大小未知
              - button "预览 自主阅读.png" [ref=e367] [cursor=pointer]
              - generic [ref=e368]:
                - button "下载 自主阅读.png" [ref=e369] [cursor=pointer]
                - button "更多操作 自主阅读.png" [ref=e372] [cursor=pointer]
            - generic [ref=e376]:
              - img "缩略图 课堂协作.png" [ref=e378]
              - generic [ref=e379]:
                - generic "课堂协作.png" [ref=e380]:
                  - generic [ref=e381]: 课堂协作
                  - generic [ref=e382]: .png
                - generic [ref=e383]: 大小未知
              - button "预览 课堂协作.png" [ref=e384] [cursor=pointer]
              - generic [ref=e385]:
                - button "下载 课堂协作.png" [ref=e386] [cursor=pointer]
                - button "更多操作 课堂协作.png" [ref=e389] [cursor=pointer]
          - generic [ref=e392]:
            - generic [ref=e393]: 当前显示 8 / 12 个附件
            - button "展开全部 12 个" [ref=e394] [cursor=pointer]
          - paragraph [ref=e396]: 图片为 AI 生成的教学情境示意，视频为示意图制作的短片；多个视频条目复用同一个演示文件。
    - generic [ref=e397]:
      - heading "课程附件工作流" [level=2] [ref=e398]
      - paragraph [ref=e399]: 选择或拖入真实文件，查看预览与下载，再试试取消、失败重试、替换及只读查看。
      - generic [ref=e401]:
        - paragraph [ref=e402]: 本地演示：选择、预览和下载使用真实文件；上传与保存仅在本页模拟，不向服务器传输。刷新后恢复示例。
        - group [ref=e403]:
          - generic "演示选项" [ref=e404] [cursor=pointer]
        - form "课程附件" [ref=e405]:
          - group "添加附件" [ref=e406]:
            - generic [ref=e407]:
              - button "添加附件" [ref=e408] [cursor=pointer]
              - status [ref=e410]: 或将文件拖到这里。
            - generic [ref=e411]: 支持 PDF、常见图片、文档、表格、演示文稿、TXT 和 ZIP。最多 8 个，每个不超过 10 MB，合计不超过 25 MB；不接收空文件和重复文件。
          - generic [ref=e413]:
            - generic [ref=e415]:
              - generic [ref=e417]:
                - generic "课程导读：从问题到证据.pdf" [ref=e418]:
                  - generic [ref=e419]: 课程导读：从问题到证据
                  - generic [ref=e420]: .pdf
                - generic [ref=e421]: 965 B
              - button "预览 课程导读：从问题到证据.pdf" [ref=e422] [cursor=pointer]
              - generic [ref=e423]:
                - button "下载 课程导读：从问题到证据.pdf" [ref=e424] [cursor=pointer]
                - button "更多操作 课程导读：从问题到证据.pdf" [ref=e427] [cursor=pointer]
            - generic [ref=e431]:
              - img "缩略图 高等数学课程封面.png" [ref=e433]
              - generic [ref=e434]:
                - generic "高等数学课程封面.png" [ref=e435]:
                  - generic [ref=e436]: 高等数学课程封面
                  - generic [ref=e437]: .png
                - generic [ref=e438]: 1 MB
              - button "预览 高等数学课程封面.png" [ref=e439] [cursor=pointer]
              - generic [ref=e440]:
                - button "下载 高等数学课程封面.png" [ref=e441] [cursor=pointer]
                - button "更多操作 高等数学课程封面.png" [ref=e444] [cursor=pointer]
            - generic [ref=e448]:
              - generic [ref=e450]:
                - generic "课堂观察记录与同伴反馈说明.txt" [ref=e451]:
                  - generic [ref=e452]: 课堂观察记录与同伴反馈说明
                  - generic [ref=e453]: .txt
                - generic [ref=e454]: 341 B
              - button "预览 课堂观察记录与同伴反馈说明.txt" [ref=e455] [cursor=pointer]
              - generic [ref=e456]:
                - button "下载 课堂观察记录与同伴反馈说明.txt" [ref=e457] [cursor=pointer]
                - button "更多操作 课堂观察记录与同伴反馈说明.txt" [ref=e460] [cursor=pointer]
          - generic [ref=e463]:
            - status [ref=e464]: 3 / 8 个附件 · 合计 1 MB / 25 MB。附件已就绪，可保存。
            - generic [ref=e465]:
              - button "保存附件" [ref=e466] [cursor=pointer]
              - button "恢复示例" [ref=e468] [cursor=pointer]
        - group [ref=e470]:
          - generic "权限与失效示例" [ref=e471] [cursor=pointer]
    - generic [ref=e472]:
      - heading "文件与任务状态" [level=2] [ref=e473]
      - paragraph [ref=e474]: 白底和浅灰底使用相同结构；文件身份、上传状态与关联任务分别表达。
      - generic [ref=e476]:
        - generic [ref=e477]:
          - paragraph [ref=e478]: 两列共享同一组示例状态。除课程导读的真实 PDF 外，文件信息、上传、字幕、报告和审核均为本页演示。
          - button "恢复示例" [ref=e479] [cursor=pointer]
        - generic [ref=e481]:
          - region "白底 · 浅描边" [ref=e482]:
            - heading "白底 · 浅描边" [level=3] [ref=e483]
            - generic [ref=e484]:
              - group "课程导读：从问题到证据.pdf 示例" [ref=e485]:
                - generic [ref=e486]:
                  - generic [ref=e488]:
                    - generic "课程导读：从问题到证据.pdf" [ref=e489]:
                      - generic [ref=e490]: 课程导读：从问题到证据
                      - generic [ref=e491]: .pdf
                    - generic [ref=e492]: 965 B
                  - button "预览示例 课程导读：从问题到证据.pdf" [ref=e493] [cursor=pointer]
                  - generic [ref=e495]:
                    - button "下载示例 课程导读：从问题到证据.pdf" [ref=e496] [cursor=pointer]
                    - button "更多操作 课程导读：从问题到证据.pdf" [ref=e499] [cursor=pointer]
              - group "课堂录像.mp4 示例" [ref=e502]:
                - generic [ref=e503]:
                  - generic [ref=e505]:
                    - generic "课堂录像.mp4" [ref=e506]:
                      - generic [ref=e507]: 课堂录像
                      - generic [ref=e508]: .mp4
                    - generic [ref=e510]:
                      - progressbar "模拟上传进度 课堂录像.mp4" [ref=e511]: x
                      - generic [ref=e514]: 42%
                  - button "预览示例 课堂录像.mp4" [disabled] [ref=e515]
                  - button "取消上传" [ref=e518] [cursor=pointer]:
                    - generic [ref=e519]: 取消
              - group "课堂录音.mp3 示例" [ref=e520]:
                - generic [ref=e521]:
                  - generic [ref=e523]:
                    - generic "课堂录音.mp3" [ref=e524]:
                      - generic [ref=e525]: 课堂录音
                      - generic [ref=e526]: .mp3
                    - generic [ref=e527]: 4.6 MB · 上传失败
                  - button "预览示例 课堂录音.mp3" [disabled] [ref=e528]
                  - generic [ref=e531]:
                    - button "重试上传" [ref=e532] [cursor=pointer]:
                      - generic [ref=e533]: 重试
                    - button "更多操作 课堂录音.mp3" [ref=e534] [cursor=pointer]
              - group "研究论文.pdf 示例" [ref=e537]:
                - generic [ref=e538]:
                  - generic [ref=e540]:
                    - generic "研究论文.pdf" [ref=e541]:
                      - generic [ref=e542]: 研究论文
                      - generic [ref=e543]: .pdf
                    - generic [ref=e544]: 1.8 MB · 检测报告未读
                  - button "预览示例 研究论文.pdf" [ref=e545] [cursor=pointer]
                  - generic [ref=e550]:
                    - button "查看报告" [ref=e551] [cursor=pointer]
                    - button "更多操作 研究论文.pdf" [ref=e553] [cursor=pointer]
              - group "授课录像.mp4 示例" [ref=e556]:
                - generic [ref=e557]:
                  - generic [ref=e559]:
                    - generic "授课录像.mp4" [ref=e560]:
                      - generic [ref=e561]: 授课录像
                      - generic [ref=e562]: .mp4
                    - generic [ref=e563]: 64 MB
                  - button "预览示例 授课录像.mp4" [ref=e564] [cursor=pointer]
                  - generic [ref=e566]:
                    - button "下载说明 授课录像.mp4" [ref=e567] [cursor=pointer]
                    - button "更多操作 授课录像.mp4" [ref=e570] [cursor=pointer]
                - generic [ref=e573]:
                  - generic [ref=e577]:
                    - text: 字幕生成失败
                    - paragraph [ref=e578]: 原视频状态正常 · 播放、下载为示例
                  - button "重试字幕" [ref=e579] [cursor=pointer]
              - group "设备申请.pdf 示例" [ref=e581]:
                - generic [ref=e582]:
                  - generic [ref=e584]:
                    - generic "设备申请.pdf" [ref=e585]:
                      - generic [ref=e586]: 设备申请
                      - generic [ref=e587]: .pdf
                    - generic [ref=e588]: 860 KB · 关联申请待你审核
                  - button "预览示例 设备申请.pdf" [ref=e589] [cursor=pointer]
                  - generic [ref=e592]:
                    - button "去审核" [ref=e593] [cursor=pointer]
                    - button "更多操作 设备申请.pdf" [ref=e595] [cursor=pointer]
              - group "课堂资料.pdf 示例" [ref=e598]:
                - generic [ref=e599]:
                  - generic [ref=e601]:
                    - generic "课堂资料.pdf" [ref=e602]:
                      - generic [ref=e603]: 课堂资料
                      - generic [ref=e604]: .pdf
                    - generic [ref=e605]: 2.1 MB · 禁止下载
                  - button "预览示例 课堂资料.pdf" [ref=e606] [cursor=pointer]
                  - generic [ref=e609]:
                    - button "预览" [ref=e610] [cursor=pointer]
                    - button "更多操作 课堂资料.pdf" [ref=e612] [cursor=pointer]
          - region "浅灰底" [ref=e615]:
            - heading "浅灰底" [level=3] [ref=e616]
            - generic [ref=e617]:
              - group "课程导读：从问题到证据.pdf 示例" [ref=e618]:
                - generic [ref=e619]:
                  - generic [ref=e621]:
                    - generic "课程导读：从问题到证据.pdf" [ref=e622]:
                      - generic [ref=e623]: 课程导读：从问题到证据
                      - generic [ref=e624]: .pdf
                    - generic [ref=e625]: 965 B
                  - button "预览示例 课程导读：从问题到证据.pdf" [ref=e626] [cursor=pointer]
                  - generic [ref=e628]:
                    - button "下载示例 课程导读：从问题到证据.pdf" [ref=e629] [cursor=pointer]
                    - button "更多操作 课程导读：从问题到证据.pdf" [ref=e632] [cursor=pointer]
              - group "课堂录像.mp4 示例" [ref=e635]:
                - generic [ref=e636]:
                  - generic [ref=e638]:
                    - generic "课堂录像.mp4" [ref=e639]:
                      - generic [ref=e640]: 课堂录像
                      - generic [ref=e641]: .mp4
                    - generic [ref=e643]:
                      - progressbar "模拟上传进度 课堂录像.mp4" [ref=e644]: x
                      - generic [ref=e647]: 42%
                  - button "预览示例 课堂录像.mp4" [disabled] [ref=e648]
                  - button "取消上传" [ref=e651] [cursor=pointer]:
                    - generic [ref=e652]: 取消
              - group "课堂录音.mp3 示例" [ref=e653]:
                - generic [ref=e654]:
                  - generic [ref=e656]:
                    - generic "课堂录音.mp3" [ref=e657]:
                      - generic [ref=e658]: 课堂录音
                      - generic [ref=e659]: .mp3
                    - generic [ref=e660]: 4.6 MB · 上传失败
                  - button "预览示例 课堂录音.mp3" [disabled] [ref=e661]
                  - generic [ref=e664]:
                    - button "重试上传" [ref=e665] [cursor=pointer]:
                      - generic [ref=e666]: 重试
                    - button "更多操作 课堂录音.mp3" [ref=e667] [cursor=pointer]
              - group "研究论文.pdf 示例" [ref=e670]:
                - generic [ref=e671]:
                  - generic [ref=e673]:
                    - generic "研究论文.pdf" [ref=e674]:
                      - generic [ref=e675]: 研究论文
                      - generic [ref=e676]: .pdf
                    - generic [ref=e677]: 1.8 MB · 检测报告未读
                  - button "预览示例 研究论文.pdf" [ref=e678] [cursor=pointer]
                  - generic [ref=e683]:
                    - button "查看报告" [ref=e684] [cursor=pointer]
                    - button "更多操作 研究论文.pdf" [ref=e686] [cursor=pointer]
              - group "授课录像.mp4 示例" [ref=e689]:
                - generic [ref=e690]:
                  - generic [ref=e692]:
                    - generic "授课录像.mp4" [ref=e693]:
                      - generic [ref=e694]: 授课录像
                      - generic [ref=e695]: .mp4
                    - generic [ref=e696]: 64 MB
                  - button "预览示例 授课录像.mp4" [ref=e697] [cursor=pointer]
                  - generic [ref=e699]:
                    - button "下载说明 授课录像.mp4" [ref=e700] [cursor=pointer]
                    - button "更多操作 授课录像.mp4" [ref=e703] [cursor=pointer]
                - generic [ref=e706]:
                  - generic [ref=e710]:
                    - text: 字幕生成失败
                    - paragraph [ref=e711]: 原视频状态正常 · 播放、下载为示例
                  - button "重试字幕" [ref=e712] [cursor=pointer]
              - group "设备申请.pdf 示例" [ref=e714]:
                - generic [ref=e715]:
                  - generic [ref=e717]:
                    - generic "设备申请.pdf" [ref=e718]:
                      - generic [ref=e719]: 设备申请
                      - generic [ref=e720]: .pdf
                    - generic [ref=e721]: 860 KB · 关联申请待你审核
                  - button "预览示例 设备申请.pdf" [ref=e722] [cursor=pointer]
                  - generic [ref=e725]:
                    - button "去审核" [ref=e726] [cursor=pointer]
                    - button "更多操作 设备申请.pdf" [ref=e728] [cursor=pointer]
              - group "课堂资料.pdf 示例" [ref=e731]:
                - generic [ref=e732]:
                  - generic [ref=e734]:
                    - generic "课堂资料.pdf" [ref=e735]:
                      - generic [ref=e736]: 课堂资料
                      - generic [ref=e737]: .pdf
                    - generic [ref=e738]: 2.1 MB · 禁止下载
                  - button "预览示例 课堂资料.pdf" [ref=e739] [cursor=pointer]
                  - generic [ref=e742]:
                    - button "预览" [ref=e743] [cursor=pointer]
                    - button "更多操作 课堂资料.pdf" [ref=e745] [cursor=pointer]
    - generic [ref=e748]:
      - heading "完整五态" [level=2] [ref=e749]
      - paragraph [ref=e750]: 处理中保留可读文字和动态提示；失败同时使用文字和图标。
      - group "附件状态对照" [ref=e752]:
        - generic [ref=e755]:
          - generic [ref=e756]: idle.pdf
          - generic [ref=e757]: 等待上传
        - generic [ref=e760]:
          - generic [ref=e761]: uploading.pdf
          - generic [ref=e762]: 正在上传
        - generic [ref=e765]:
          - generic [ref=e766]: processing.pdf
          - generic [ref=e767]: 正在处理
        - generic [ref=e770]:
          - generic [ref=e771]: error.pdf
          - generic [ref=e772]: 上传失败，请重试
        - generic [ref=e775]:
          - generic [ref=e776]: done.pdf
          - generic [ref=e777]: 已上传 · 1.8 MB
    - generic [ref=e778]:
      - heading "三档尺寸与竖排媒体" [level=2] [ref=e779]
      - generic [ref=e780]:
        - generic [ref=e781]:
          - generic [ref=e784]:
            - generic [ref=e785]: 课程资料.pdf
            - generic [ref=e786]: default · PDF
          - generic [ref=e789]:
            - generic [ref=e790]: 课程资料.pdf
            - generic [ref=e791]: sm · PDF
          - generic [ref=e794]:
            - generic [ref=e795]: 课程资料.pdf
            - generic [ref=e796]: xs · PDF
        - generic [ref=e797]:
          - img "课程封面占位：从问题到证据" [ref=e799]:
            - generic [ref=e800]:
              - generic [ref=e801]: 课堂观察 · 第 04 讲
              - strong [ref=e802]: 从问题到证据
              - generic [ref=e803]: 观察 · 记录 · 讨论
          - generic [ref=e804]:
            - generic [ref=e805]: 课程封面
            - generic [ref=e806]: 预览占位
  - region [ref=e807]:
    - heading "使用边界" [level=2] [ref=e808]
    - generic [ref=e809]:
      - generic [ref=e810]:
        - heading "适合用在" [level=3] [ref=e811]
        - list [ref=e812]:
          - listitem [ref=e813]: 表单、消息或资料区需要展示文件和处理状态。
          - listitem [ref=e814]: 课程附件需要选择、校验、上传、预览、下载或替换。
      - generic [ref=e815]:
        - heading "避免用在" [level=3] [ref=e816]
        - list [ref=e817]:
          - listitem [ref=e818]: 把前端校验和操作显隐当作服务器权限或安全校验。
          - listitem [ref=e819]: 把整卡按钮与移除按钮做成嵌套按钮。
  - generic [ref=e820]:
    - region [ref=e821]:
      - heading "API 与结构" [level=2] [ref=e822]
      - table [ref=e824]:
        - caption [ref=e825]: Attachment 文件附件 常用接口
        - rowgroup [ref=e826]:
          - row [ref=e827]:
            - columnheader "名称" [ref=e828]
            - columnheader "类型" [ref=e829]
            - columnheader "默认" [ref=e830]
            - columnheader "说明" [ref=e831]
        - rowgroup [ref=e832]:
          - row [ref=e833]:
            - rowheader [ref=e834]:
              - code [ref=e835]: useAttachmentUpload
            - cell [ref=e836]:
              - code [ref=e837]: items / constraints / upload / readOnly
            - cell "—" [ref=e838]
            - cell "管理文件选择、校验、上传、取消和重试；上传适配器由宿主提供。" [ref=e839]
          - row [ref=e840]:
            - rowheader [ref=e841]:
              - code [ref=e842]: AttachmentList
            - cell [ref=e843]:
              - code [ref=e844]: items / surface / readOnly
            - cell "—" [ref=e845]
            - cell "outlined / filled 两种表面；下载主操作与更多菜单遵循独立权限。" [ref=e846]
          - row [ref=e847]:
            - rowheader [ref=e848]:
              - code [ref=e849]: AttachmentList size
            - cell [ref=e850]:
              - code [ref=e851]: default / sm
            - cell "default" [ref=e852]
            - cell "普通附件行与紧凑草稿卡；不改变底层 Attachment 的三档尺寸。" [ref=e853]
          - row [ref=e854]:
            - rowheader [ref=e855]:
              - code [ref=e856]: AttachmentList orientation / layout
            - cell [ref=e857]:
              - code [ref=e858]: horizontal / vertical；list / wrap / grid
            - cell "horizontal / list" [ref=e859]
            - cell "卡片内部方向与集合排列独立；折叠、总数和重试范围由宿主控制。" [ref=e860]
          - row [ref=e861]:
            - rowheader [ref=e862]:
              - code [ref=e863]: AttachmentList actions
            - cell [ref=e864]:
              - code [ref=e865]: default / draft
            - cell "default" [ref=e866]
            - cell "常规查看下载操作，或草稿中的直接移除。" [ref=e867]
          - row [ref=e868]:
            - rowheader [ref=e869]:
              - code [ref=e870]: Attachment state
            - cell [ref=e871]:
              - code [ref=e872]: idle / uploading / processing / error / done
            - cell "done" [ref=e873]
            - cell "底层附件的五种显示状态。" [ref=e874]
          - row [ref=e875]:
            - rowheader [ref=e876]:
              - code [ref=e877]: Attachment size
            - cell [ref=e878]:
              - code [ref=e879]: default / sm / xs
            - cell "default" [ref=e880]
            - cell "三档源码尺寸，显式 size 不再次被密度缩放。" [ref=e881]
      - paragraph [ref=e882]: Parts / Slots：AttachmentPicker、AttachmentList、AttachmentPreview、useAttachmentUpload、Attachment、Group、Media、Content、Title、Description、Actions、Action、Trigger
    - region [ref=e883]:
      - heading "调用示例" [level=2] [ref=e884]
      - generic [ref=e885]:
        - generic [ref=e886]:
          - button "复制代码" [ref=e887] [cursor=pointer]
          - status
        - code [ref=e890]: "const attachments = useAttachmentUpload({ initialItems, constraints: { maxFiles: 8, maxFileSize: 10 * 1024 * 1024 }, upload: uploadFile, }); <AttachmentPicker onFiles={files => { attachments.addFiles(files); }} /> <AttachmentList items={attachments.items} onStart={item => { void attachments.start(item.id); }} onRetry={item => { void attachments.retry(item.id); }} onCancel={item => attachments.cancel(item.id)} onRemove={item => attachments.remove(item.id)} onReplace={(item, file) => { attachments.replaceFile(item.id, file); }} /> <Button disabled={!attachments.summary.canSubmit}>保存附件</Button>"
      - paragraph [ref=e891]:
        - text: 当前源码：
        - code [ref=e892]: packages/ui/src/attachment-workflow/index.ts
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | import { readFileSync } from "node:fs";
  3   | 
  4   | test.beforeEach(async ({ page }) => { await page.goto("/#attachment"); });
  5   | 
  6   | test("folding keeps full counts, failed-only retry and hidden uploads alive", async ({ page }, info) => {
  7   |   const scene = page.getByTestId("attachment-scenario-ordinary");
  8   |   const rows = scene.locator(".rain-attachment-list__item");
  9   |   await expect(rows).toHaveCount(6);
  10  |   await expect(page.getByTestId("ordinary-summary")).toContainText("24 个已上传");
  11  |   await scene.getByRole("button", { name: "演示上传", exact: true }).click();
  12  |   await expect(page.getByTestId("ordinary-summary")).toContainText("2 个失败");
  13  |   await expect(page.getByTestId("ordinary-summary")).toContainText("4 个上传中");
  14  |   const bar = scene.getByRole("progressbar").first();
  15  |   expect((await bar.boundingBox())!.width).toBe(64);
  16  |   expect((await bar.locator(".rain-progress-track").boundingBox())!.height).toBe(4);
  17  |   await scene.screenshot({ path: info.outputPath("ordinary-progress.png") });
  18  |   await scene.getByRole("button", { name: "查看 2 个失败附件", exact: true }).click();
  19  |   await expect(rows).toHaveCount(24);
  20  |   await expect(scene.getByRole("button", { name: /^重试上传 / }).first()).toBeFocused();
  21  |   await scene.getByRole("button", { name: "收起附件", exact: true }).click();
  22  |   await expect(rows).toHaveCount(6);
  23  |   await expect(page.getByTestId("ordinary-summary")).toContainText("22 个已上传");
  24  |   await scene.getByRole("button", { name: "重试失败项（2）", exact: true }).click();
  25  |   await expect(page.getByTestId("ordinary-summary")).toContainText("24 个已上传", { timeout: 10000 });
  26  |   await expect(page.getByTestId("composer-summary")).toContainText("12 个已上传");
  27  | });
  28  | 
  29  | test("compact draft removes directly and sends a local reply with real added bytes", async ({ page }, info) => {
  30  |   const scene = page.getByTestId("attachment-scenario-composer");
  31  |   const row = scene.locator(".rain-attachment-list__item").first();
  32  |   const height = (await row.boundingBox())!.height;
  33  |   expect(height).toBe(40);
  34  |   const visibleCount = await scene.locator(".rain-attachment-list__item:visible").count();
  35  |   expect(visibleCount).toBe(info.project.name === "narrow" ? 2 : 4);
  36  |   await scene.getByRole("button", { name: "移除 课程导读.pdf", exact: true }).click();
  37  |   await expect(page.getByTestId("composer-summary")).toContainText("共 11 个");
  38  |   await expect(scene.getByRole("button", { name: "预览 课堂讲义.txt", exact: true })).toBeFocused();
  39  |   const fileName = "长文件名用于检查紧凑附件保留扩展名与操作空间".repeat(3) + ".txt";
> 40  |   await scene.locator('input[type="file"]').setInputFiles({ name: fileName, mimeType: "text/plain", buffer: Buffer.from("scene draft actual bytes") });
      |   ^ Error: locator.setInputFiles: Error: strict mode violation: getByTestId('attachment-scenario-composer').locator('input[type="file"]') resolved to 5 elements:
  41  |   await expect(page.getByTestId("composer-summary")).toContainText("12 个已上传", { timeout: 10000 });
  42  |   await scene.getByRole("textbox", { name: "课程消息", exact: true }).fill("请阅读课堂资料后记录一个问题。");
  43  |   await scene.getByRole("button", { name: "发送到本页", exact: true }).click();
  44  |   await expect(scene.getByRole("article", { name: "本页消息 1", exact: true })).toContainText("请阅读课堂资料后记录一个问题。");
  45  |   await expect(scene.getByRole("textbox", { name: "课程消息", exact: true })).toHaveValue("");
  46  |   await expect(page.getByTestId("ordinary-summary")).toContainText("24 个已上传");
  47  |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  48  | });
  49  | 
  50  | test("modal body scrolls independently and closing preserves uploads and focus", async ({ page }, info) => {
  51  |   const trigger = page.getByRole("button", { name: "打开附件弹窗", exact: true });
  52  |   await trigger.click();
  53  |   const modal = page.getByRole("dialog", { name: "本次附件", exact: true });
  54  |   await expect(modal.locator(".rain-attachment-list__item")).toHaveCount(24);
  55  |   const body = modal.locator(".rain-dialog-body");
  56  |   const before = await modal.locator(".rain-dialog-footer").boundingBox();
  57  |   await body.evaluate(node => { node.scrollTop = node.scrollHeight; });
  58  |   const after = await modal.locator(".rain-dialog-footer").boundingBox();
  59  |   expect(after!.y).toBe(before!.y);
  60  |   expect(await body.evaluate(node => node.scrollHeight > node.clientHeight && node.scrollTop > 0)).toBe(true);
  61  |   await modal.screenshot({ path: info.outputPath("modal.png") });
  62  |   await modal.getByRole("button", { name: "演示上传", exact: true }).click();
  63  |   await modal.getByRole("button", { name: "关闭附件弹窗", exact: true }).click();
  64  |   await expect(trigger).toBeFocused();
  65  |   await trigger.click();
  66  |   await expect(page.getByTestId("dialog-summary")).toContainText("2 个失败", { timeout: 10000 });
  67  |   await expect(page.getByTestId("dialog-summary")).toContainText("22 个已上传", { timeout: 10000 });
  68  |   await page.keyboard.press("Escape");
  69  |   await expect(trigger).toBeFocused();
  70  | });
  71  | 
  72  | test("media fills grid tracks, has no format badges and plays actual video", async ({ page }, info) => {
  73  |   const scene = page.getByTestId("attachment-scenario-media");
  74  |   const rows = scene.locator(".rain-attachment-list__item");
  75  |   await expect(rows).toHaveCount(8);
  76  |   for (const img of await scene.getByRole("img").all()) {
  77  |     await expect.poll(() => img.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  78  |   }
  79  |   await expect(scene.locator('[data-icon^="icon/file-format-"]')).toHaveCount(0);
  80  |   const track = await rows.first().boundingBox(), card = await rows.first().locator(".rain-attachment-list__card").boundingBox();
  81  |   expect(Math.abs(track!.width - card!.width)).toBeLessThan(1);
  82  |   await scene.screenshot({ path: info.outputPath("media.png") });
  83  |   await scene.getByRole("button", { name: "预览 课堂演示.mp4", exact: true }).click();
  84  |   const modal = page.getByRole("dialog", { name: "课堂演示.mp4", exact: true });
  85  |   const video = modal.locator("video");
  86  |   await expect(video).toBeVisible();
  87  |   await expect.poll(() => video.evaluate(node => (node as HTMLVideoElement).readyState)).toBeGreaterThanOrEqual(2);
  88  |   await video.press("Space");
  89  |   await expect.poll(() => video.evaluate(node => (node as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
  90  |   await modal.screenshot({ path: info.outputPath("video.png") });
  91  |   await page.keyboard.press("Escape");
  92  |   await expect(scene.getByRole("button", { name: "预览 课堂演示.mp4", exact: true })).toBeFocused();
  93  |   const event = page.waitForEvent("download");
  94  |   await scene.getByRole("button", { name: "下载 课堂演示.mp4", exact: true }).click();
  95  |   const download = await event;
  96  |   expect(download.suggestedFilename()).toBe("课堂演示.mp4");
  97  |   expect(readFileSync((await download.path())!)).toEqual(readFileSync("apps/playground/public/attachment-demo/scenario-video.mp4"));
  98  |   await scene.getByRole("button", { name: "展开全部 12 个", exact: true }).click();
  99  |   await expect(rows).toHaveCount(12);
  100 | });
  101 | 
  102 | test("both themes retain narrow layout and broken thumbnail identity", async ({ page }, info) => {
  103 |   const media = page.getByTestId("attachment-scenario-media");
  104 |   await page.route("**/attachment-demo/scenario-classroom.png", route => route.abort());
  105 |   await page.reload();
  106 |   await expect(media.getByRole("img", { name: "缩略图 课堂板书.png", exact: true })).toHaveCount(0);
  107 |   await expect(media.locator('[data-attachment-id="media-image-classroom"] [data-icon="icon/file-format-image-png"]')).toBeVisible();
  108 |   for (const theme of ["light", "dark"]) {
  109 |     if (theme === "dark") await page.getByRole("button", { name: "深色", exact: true }).click();
  110 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  111 |     await page.getByTestId("attachment-scenario-ordinary").screenshot({ path: info.outputPath(theme + "-ordinary.png") });
  112 |     await page.getByTestId("attachment-scenario-composer").screenshot({ path: info.outputPath(theme + "-composer.png") });
  113 |     await media.screenshot({ path: info.outputPath(theme + "-media-fallback.png") });
  114 |   }
  115 | });
  116 | 
```