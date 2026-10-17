# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: attachment-action-feedback.spec.ts >> neutral draft, filled-dialog and media actions preserve download height in both themes
- Location: tests/e2e/attachment-action-feedback.spec.ts:40:1

# Error details

```
Error: expect(received).toMatch(expected)

Expected pattern: /^#[\da-f]{6}$/i
Received string:  "rgb(73 93 135)"
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
                - generic "965 B" [ref=e54]
              - button "预览 课程导读.pdf" [ref=e55] [cursor=pointer]
              - generic [ref=e56]:
                - button "下载 课程导读.pdf" [ref=e57] [cursor=pointer]
                - button "更多操作 课程导读.pdf" [ref=e60] [cursor=pointer]
            - generic [ref=e64]:
              - generic [ref=e66]:
                - generic "课堂讲义.txt" [ref=e67]:
                  - generic [ref=e68]: 课堂讲义
                  - generic [ref=e69]: .txt
                - generic "80 B" [ref=e70]
              - button "预览 课堂讲义.txt" [ref=e71] [cursor=pointer]
              - generic [ref=e72]:
                - button "下载 课堂讲义.txt" [ref=e73] [cursor=pointer]
                - button "更多操作 课堂讲义.txt" [ref=e76] [cursor=pointer]
            - generic [ref=e80]:
              - generic [ref=e82]:
                - generic "课堂观察数据.csv" [ref=e83]:
                  - generic [ref=e84]: 课堂观察数据
                  - generic [ref=e85]: .csv
                - generic "66 B" [ref=e86]
              - button "预览 课堂观察数据.csv" [ref=e87] [cursor=pointer]
              - generic [ref=e88]:
                - button "下载 课堂观察数据.csv" [ref=e89] [cursor=pointer]
                - button "更多操作 课堂观察数据.csv" [ref=e92] [cursor=pointer]
            - generic [ref=e96]:
              - generic [ref=e98]:
                - generic "小组讨论记录.md" [ref=e99]:
                  - generic [ref=e100]: 小组讨论记录
                  - generic [ref=e101]: .md
                - generic "103 B" [ref=e102]
              - button "预览 小组讨论记录.md" [ref=e103] [cursor=pointer]
              - generic [ref=e104]:
                - button "下载 小组讨论记录.md" [ref=e105] [cursor=pointer]
                - button "更多操作 小组讨论记录.md" [ref=e108] [cursor=pointer]
            - generic [ref=e112]:
              - generic [ref=e114]:
                - generic "课堂问题清单.json" [ref=e115]:
                  - generic [ref=e116]: 课堂问题清单
                  - generic [ref=e117]: .json
                - generic "91 B" [ref=e118]
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
                - generic "1 MB" [ref=e135]
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
                    - generic [ref=e161]: 共 12 个
                    - generic [ref=e162]: · 12 个已上传
                  - button "查看全部 12 个" [ref=e163] [cursor=pointer]
                - generic [ref=e166]:
                  - generic [ref=e168]:
                    - generic "课程导读.pdf" [ref=e171]:
                      - generic [ref=e172]: 课程导读
                      - generic [ref=e173]: .pdf
                    - button "预览 课程导读.pdf" [ref=e174] [cursor=pointer]
                    - button "移除 课程导读.pdf" [ref=e176] [cursor=pointer]
                  - generic [ref=e180]:
                    - generic "课堂讲义.txt" [ref=e183]:
                      - generic [ref=e184]: 课堂讲义
                      - generic [ref=e185]: .txt
                    - button "预览 课堂讲义.txt" [ref=e186] [cursor=pointer]
                    - button "移除 课堂讲义.txt" [ref=e188] [cursor=pointer]
              - textbox "课程消息" [ref=e191]: 这是一组本周课程资料，请结合课堂笔记阅读。
              - generic [ref=e193]:
                - group "添加草稿附件" [ref=e194]:
                  - generic [ref=e195]:
                    - button "添加草稿附件" [ref=e196] [cursor=pointer]
                    - status [ref=e200]: 或将文件拖到这里。
                - button "发送到本页" [ref=e201] [cursor=pointer]
            - paragraph [ref=e203]: 仅在本页回显消息；此演示等待当前附件上传完成后发送，不提交真实课程消息。
        - region "弹窗附件列表" [ref=e204]:
          - generic [ref=e205]:
            - generic [ref=e206]:
              - heading "集中管理附件" [level=3] [ref=e207]
              - paragraph [ref=e208]: 弹窗内滚动列表，底部操作保持可见。
            - button "打开附件弹窗" [ref=e209] [cursor=pointer]
          - paragraph [ref=e211]: 当前有 24 个附件。关闭和重新打开不会重置文件；上传结果只保留在本页。
        - region "图片与视频网格" [ref=e212]:
          - generic [ref=e213]:
            - generic [ref=e214]:
              - heading "图片与视频" [level=3] [ref=e215]
              - paragraph [ref=e216]: 内容缩略图 · 文件名和操作留在画面下方
            - button "恢复媒体示例" [ref=e217] [cursor=pointer]
          - group "添加图片或视频" [ref=e219]:
            - generic [ref=e220]:
              - button "添加图片或视频" [ref=e221] [cursor=pointer]
              - status [ref=e223]: 或将文件拖到这里。
          - status [ref=e225]:
            - generic [ref=e226]: 共 12 个
            - generic [ref=e227]: · 12 个已上传
          - generic [ref=e229]:
            - generic [ref=e231]:
              - img "缩略图 课堂板书.png" [ref=e233]
              - generic [ref=e234]:
                - generic "课堂板书.png" [ref=e235]:
                  - generic [ref=e236]: 课堂板书
                  - generic [ref=e237]: .png
                - generic "1.8 MB" [ref=e238]
              - button "预览 课堂板书.png" [ref=e239] [cursor=pointer]
              - generic [ref=e240]:
                - button "下载 课堂板书.png" [ref=e241] [cursor=pointer]
                - button "更多操作 课堂板书.png" [ref=e244] [cursor=pointer]
            - generic [ref=e248]:
              - img "缩略图 课堂演示.mp4" [ref=e250]
              - generic [ref=e253]:
                - generic "课堂演示.mp4" [ref=e254]:
                  - generic [ref=e255]: 课堂演示
                  - generic [ref=e256]: .mp4
                - generic "207.3 KB" [ref=e257]
              - button "预览 课堂演示.mp4" [ref=e258] [cursor=pointer]
              - generic [ref=e259]:
                - button "下载 课堂演示.mp4" [ref=e260] [cursor=pointer]
                - button "更多操作 课堂演示.mp4" [ref=e263] [cursor=pointer]
            - generic [ref=e267]:
              - img "缩略图 分组讨论.png" [ref=e269]
              - generic [ref=e270]:
                - generic "分组讨论.png" [ref=e271]:
                  - generic [ref=e272]: 分组讨论
                  - generic [ref=e273]: .png
                - generic "1.9 MB" [ref=e274]
              - button "预览 分组讨论.png" [ref=e275] [cursor=pointer]
              - generic [ref=e276]:
                - button "下载 分组讨论.png" [ref=e277] [cursor=pointer]
                - button "更多操作 分组讨论.png" [ref=e280] [cursor=pointer]
            - generic [ref=e284]:
              - img "缩略图 实验过程.mp4" [ref=e286]
              - generic [ref=e289]:
                - generic "实验过程.mp4" [ref=e290]:
                  - generic [ref=e291]: 实验过程
                  - generic [ref=e292]: .mp4
                - generic "207.3 KB" [ref=e293]
              - button "预览 实验过程.mp4" [ref=e294] [cursor=pointer]
              - generic [ref=e295]:
                - button "下载 实验过程.mp4" [ref=e296] [cursor=pointer]
                - button "更多操作 实验过程.mp4" [ref=e299] [cursor=pointer]
            - generic [ref=e303]:
              - img "缩略图 实验装置.png" [ref=e305]
              - generic [ref=e306]:
                - generic "实验装置.png" [ref=e307]:
                  - generic [ref=e308]: 实验装置
                  - generic [ref=e309]: .png
                - generic "1.8 MB" [ref=e310]
              - button "预览 实验装置.png" [ref=e311] [cursor=pointer]
              - generic [ref=e312]:
                - button "下载 实验装置.png" [ref=e313] [cursor=pointer]
                - button "更多操作 实验装置.png" [ref=e316] [cursor=pointer]
            - generic [ref=e320]:
              - img "缩略图 课堂讲授.png" [ref=e322]
              - generic [ref=e323]:
                - generic "课堂讲授.png" [ref=e324]:
                  - generic [ref=e325]: 课堂讲授
                  - generic [ref=e326]: .png
                - generic "1.9 MB" [ref=e327]
              - button "预览 课堂讲授.png" [ref=e328] [cursor=pointer]
              - generic [ref=e329]:
                - button "下载 课堂讲授.png" [ref=e330] [cursor=pointer]
                - button "更多操作 课堂讲授.png" [ref=e333] [cursor=pointer]
            - generic [ref=e337]:
              - img "缩略图 自主阅读.png" [ref=e339]
              - generic [ref=e340]:
                - generic "自主阅读.png" [ref=e341]:
                  - generic [ref=e342]: 自主阅读
                  - generic [ref=e343]: .png
                - generic "1.9 MB" [ref=e344]
              - button "预览 自主阅读.png" [ref=e345] [cursor=pointer]
              - generic [ref=e346]:
                - button "下载 自主阅读.png" [ref=e347] [cursor=pointer]
                - button "更多操作 自主阅读.png" [ref=e350] [cursor=pointer]
            - generic [ref=e354]:
              - img "缩略图 课堂协作.png" [ref=e356]
              - generic [ref=e357]:
                - generic "课堂协作.png" [ref=e358]:
                  - generic [ref=e359]: 课堂协作
                  - generic [ref=e360]: .png
                - generic "1.8 MB" [ref=e361]
              - button "预览 课堂协作.png" [ref=e362] [cursor=pointer]
              - generic [ref=e363]:
                - button "下载 课堂协作.png" [ref=e364] [cursor=pointer]
                - button "更多操作 课堂协作.png" [ref=e367] [cursor=pointer]
          - generic [ref=e370]:
            - generic [ref=e371]: 当前显示 8 / 12 个附件
            - button "展开全部 12 个" [ref=e372] [cursor=pointer]
          - paragraph [ref=e374]: 图片为 AI 生成的教学情境示意；视频为实验室示意图制作的 4 秒无声合成短片，不是课堂现场实录。多个视频条目复用同一演示文件。
    - generic [ref=e375]:
      - heading "课程附件工作流" [level=2] [ref=e376]
      - paragraph [ref=e377]: 选择或拖入真实文件，查看预览与下载，再试试取消、失败重试、替换及只读查看。
      - generic [ref=e379]:
        - paragraph [ref=e380]: 本地演示：选择、预览和下载使用真实文件；上传与保存仅在本页模拟，不向服务器传输。刷新后恢复示例。
        - group [ref=e381]:
          - generic "演示选项" [ref=e382] [cursor=pointer]
        - form "课程附件" [ref=e383]:
          - group "添加附件" [ref=e384]:
            - generic [ref=e385]:
              - button "添加附件" [ref=e386] [cursor=pointer]
              - status [ref=e388]: 或将文件拖到这里。
            - generic [ref=e389]: 支持 PDF、常见图片、文档、表格、演示文稿、TXT 和 ZIP。最多 8 个，每个不超过 10 MB，合计不超过 25 MB；不接收空文件和重复文件。
          - generic [ref=e391]:
            - generic [ref=e393]:
              - generic [ref=e395]:
                - generic "课程导读：从问题到证据.pdf" [ref=e396]:
                  - generic [ref=e397]: 课程导读：从问题到证据
                  - generic [ref=e398]: .pdf
                - generic "965 B" [ref=e399]
              - button "预览 课程导读：从问题到证据.pdf" [ref=e400] [cursor=pointer]
              - generic [ref=e401]:
                - button "下载 课程导读：从问题到证据.pdf" [ref=e402] [cursor=pointer]
                - button "更多操作 课程导读：从问题到证据.pdf" [ref=e405] [cursor=pointer]
            - generic [ref=e409]:
              - img "缩略图 高等数学课程封面.png" [ref=e411]
              - generic [ref=e412]:
                - generic "高等数学课程封面.png" [ref=e413]:
                  - generic [ref=e414]: 高等数学课程封面
                  - generic [ref=e415]: .png
                - generic "1 MB" [ref=e416]
              - button "预览 高等数学课程封面.png" [ref=e417] [cursor=pointer]
              - generic [ref=e418]:
                - button "下载 高等数学课程封面.png" [ref=e419] [cursor=pointer]
                - button "更多操作 高等数学课程封面.png" [ref=e422] [cursor=pointer]
            - generic [ref=e426]:
              - generic [ref=e428]:
                - generic "课堂观察记录与同伴反馈说明.txt" [ref=e429]:
                  - generic [ref=e430]: 课堂观察记录与同伴反馈说明
                  - generic [ref=e431]: .txt
                - generic "341 B" [ref=e432]
              - button "预览 课堂观察记录与同伴反馈说明.txt" [ref=e433] [cursor=pointer]
              - generic [ref=e434]:
                - button "下载 课堂观察记录与同伴反馈说明.txt" [ref=e435] [cursor=pointer]
                - button "更多操作 课堂观察记录与同伴反馈说明.txt" [ref=e438] [cursor=pointer]
          - generic [ref=e441]:
            - status [ref=e442]: 3 / 8 个附件 · 合计 1 MB / 25 MB。附件已就绪，可保存。
            - generic [ref=e443]:
              - button "保存附件" [ref=e444] [cursor=pointer]
              - button "恢复示例" [ref=e446] [cursor=pointer]
        - group [ref=e448]:
          - generic "权限与失效示例" [ref=e449] [cursor=pointer]
    - generic [ref=e450]:
      - heading "文件与任务状态" [level=2] [ref=e451]
      - paragraph [ref=e452]: 白底和浅灰底使用相同结构；文件身份、上传状态与关联任务分别表达。
      - generic [ref=e454]:
        - generic [ref=e455]:
          - paragraph [ref=e456]: 两列共享同一组示例状态。除课程导读的真实 PDF 外，文件信息、上传、字幕、报告和审核均为本页演示。
          - button "恢复示例" [ref=e457] [cursor=pointer]
        - generic [ref=e459]:
          - region "白底 · 浅描边" [ref=e460]:
            - heading "白底 · 浅描边" [level=3] [ref=e461]
            - generic [ref=e462]:
              - group "课程导读：从问题到证据.pdf 示例" [ref=e463]:
                - generic [ref=e464]:
                  - generic [ref=e466]:
                    - generic "课程导读：从问题到证据.pdf" [ref=e467]:
                      - generic [ref=e468]: 课程导读：从问题到证据
                      - generic [ref=e469]: .pdf
                    - generic [ref=e470]: 965 B
                  - button "预览示例 课程导读：从问题到证据.pdf" [ref=e471] [cursor=pointer]
                  - generic [ref=e473]:
                    - button "下载示例 课程导读：从问题到证据.pdf" [ref=e474] [cursor=pointer]
                    - button "更多操作 课程导读：从问题到证据.pdf" [ref=e477] [cursor=pointer]
              - group "课堂录像.mp4 示例" [ref=e480]:
                - generic [ref=e481]:
                  - generic [ref=e483]:
                    - generic "课堂录像.mp4" [ref=e484]:
                      - generic [ref=e485]: 课堂录像
                      - generic [ref=e486]: .mp4
                    - generic [ref=e488]:
                      - progressbar "模拟上传进度 课堂录像.mp4" [ref=e489]: x
                      - generic [ref=e492]: 42%
                  - button "预览示例 课堂录像.mp4" [disabled] [ref=e493]
                  - button "取消上传" [ref=e496] [cursor=pointer]:
                    - generic [ref=e497]: 取消
              - group "课堂录音.mp3 示例" [ref=e498]:
                - generic [ref=e499]:
                  - generic [ref=e501]:
                    - generic "课堂录音.mp3" [ref=e502]:
                      - generic [ref=e503]: 课堂录音
                      - generic [ref=e504]: .mp3
                    - generic [ref=e505]: 4.6 MB · 上传失败
                  - button "预览示例 课堂录音.mp3" [disabled] [ref=e506]
                  - generic [ref=e509]:
                    - button "重试上传" [ref=e510] [cursor=pointer]:
                      - generic [ref=e511]: 重试
                    - button "更多操作 课堂录音.mp3" [ref=e512] [cursor=pointer]
              - group "研究论文.pdf 示例" [ref=e515]:
                - generic [ref=e516]:
                  - generic [ref=e518]:
                    - generic "研究论文.pdf" [ref=e519]:
                      - generic [ref=e520]: 研究论文
                      - generic [ref=e521]: .pdf
                    - generic [ref=e522]: 1.8 MB · 检测报告未读
                  - button "预览示例 研究论文.pdf" [ref=e523] [cursor=pointer]
                  - generic [ref=e528]:
                    - button "查看报告" [ref=e529] [cursor=pointer]
                    - button "更多操作 研究论文.pdf" [ref=e531] [cursor=pointer]
              - group "授课录像.mp4 示例" [ref=e534]:
                - generic [ref=e535]:
                  - generic [ref=e537]:
                    - generic "授课录像.mp4" [ref=e538]:
                      - generic [ref=e539]: 授课录像
                      - generic [ref=e540]: .mp4
                    - generic [ref=e541]: 64 MB
                  - button "预览示例 授课录像.mp4" [ref=e542] [cursor=pointer]
                  - generic [ref=e544]:
                    - button "下载说明 授课录像.mp4" [ref=e545] [cursor=pointer]
                    - button "更多操作 授课录像.mp4" [ref=e548] [cursor=pointer]
                - generic [ref=e551]:
                  - generic [ref=e555]:
                    - text: 字幕生成失败
                    - paragraph [ref=e556]: 原视频状态正常 · 播放、下载为示例
                  - button "重试字幕" [ref=e557] [cursor=pointer]
              - group "设备申请.pdf 示例" [ref=e559]:
                - generic [ref=e560]:
                  - generic [ref=e562]:
                    - generic "设备申请.pdf" [ref=e563]:
                      - generic [ref=e564]: 设备申请
                      - generic [ref=e565]: .pdf
                    - generic [ref=e566]: 860 KB · 关联申请待你审核
                  - button "预览示例 设备申请.pdf" [ref=e567] [cursor=pointer]
                  - generic [ref=e570]:
                    - button "去审核" [ref=e571] [cursor=pointer]
                    - button "更多操作 设备申请.pdf" [ref=e573] [cursor=pointer]
              - group "课堂资料.pdf 示例" [ref=e576]:
                - generic [ref=e577]:
                  - generic [ref=e579]:
                    - generic "课堂资料.pdf" [ref=e580]:
                      - generic [ref=e581]: 课堂资料
                      - generic [ref=e582]: .pdf
                    - generic [ref=e583]: 2.1 MB · 禁止下载
                  - button "预览示例 课堂资料.pdf" [ref=e584] [cursor=pointer]
                  - generic [ref=e587]:
                    - button "预览" [ref=e588] [cursor=pointer]
                    - button "更多操作 课堂资料.pdf" [ref=e590] [cursor=pointer]
          - region "浅灰底" [ref=e593]:
            - heading "浅灰底" [level=3] [ref=e594]
            - generic [ref=e595]:
              - group "课程导读：从问题到证据.pdf 示例" [ref=e596]:
                - generic [ref=e597]:
                  - generic [ref=e599]:
                    - generic "课程导读：从问题到证据.pdf" [ref=e600]:
                      - generic [ref=e601]: 课程导读：从问题到证据
                      - generic [ref=e602]: .pdf
                    - generic [ref=e603]: 965 B
                  - button "预览示例 课程导读：从问题到证据.pdf" [ref=e604] [cursor=pointer]
                  - generic [ref=e606]:
                    - button "下载示例 课程导读：从问题到证据.pdf" [ref=e607] [cursor=pointer]
                    - button "更多操作 课程导读：从问题到证据.pdf" [ref=e610] [cursor=pointer]
              - group "课堂录像.mp4 示例" [ref=e613]:
                - generic [ref=e614]:
                  - generic [ref=e616]:
                    - generic "课堂录像.mp4" [ref=e617]:
                      - generic [ref=e618]: 课堂录像
                      - generic [ref=e619]: .mp4
                    - generic [ref=e621]:
                      - progressbar "模拟上传进度 课堂录像.mp4" [ref=e622]: x
                      - generic [ref=e625]: 42%
                  - button "预览示例 课堂录像.mp4" [disabled] [ref=e626]
                  - button "取消上传" [ref=e629] [cursor=pointer]:
                    - generic [ref=e630]: 取消
              - group "课堂录音.mp3 示例" [ref=e631]:
                - generic [ref=e632]:
                  - generic [ref=e634]:
                    - generic "课堂录音.mp3" [ref=e635]:
                      - generic [ref=e636]: 课堂录音
                      - generic [ref=e637]: .mp3
                    - generic [ref=e638]: 4.6 MB · 上传失败
                  - button "预览示例 课堂录音.mp3" [disabled] [ref=e639]
                  - generic [ref=e642]:
                    - button "重试上传" [ref=e643] [cursor=pointer]:
                      - generic [ref=e644]: 重试
                    - button "更多操作 课堂录音.mp3" [ref=e645] [cursor=pointer]
              - group "研究论文.pdf 示例" [ref=e648]:
                - generic [ref=e649]:
                  - generic [ref=e651]:
                    - generic "研究论文.pdf" [ref=e652]:
                      - generic [ref=e653]: 研究论文
                      - generic [ref=e654]: .pdf
                    - generic [ref=e655]: 1.8 MB · 检测报告未读
                  - button "预览示例 研究论文.pdf" [ref=e656] [cursor=pointer]
                  - generic [ref=e661]:
                    - button "查看报告" [ref=e662] [cursor=pointer]
                    - button "更多操作 研究论文.pdf" [ref=e664] [cursor=pointer]
              - group "授课录像.mp4 示例" [ref=e667]:
                - generic [ref=e668]:
                  - generic [ref=e670]:
                    - generic "授课录像.mp4" [ref=e671]:
                      - generic [ref=e672]: 授课录像
                      - generic [ref=e673]: .mp4
                    - generic [ref=e674]: 64 MB
                  - button "预览示例 授课录像.mp4" [ref=e675] [cursor=pointer]
                  - generic [ref=e677]:
                    - button "下载说明 授课录像.mp4" [ref=e678] [cursor=pointer]
                    - button "更多操作 授课录像.mp4" [ref=e681] [cursor=pointer]
                - generic [ref=e684]:
                  - generic [ref=e688]:
                    - text: 字幕生成失败
                    - paragraph [ref=e689]: 原视频状态正常 · 播放、下载为示例
                  - button "重试字幕" [ref=e690] [cursor=pointer]
              - group "设备申请.pdf 示例" [ref=e692]:
                - generic [ref=e693]:
                  - generic [ref=e695]:
                    - generic "设备申请.pdf" [ref=e696]:
                      - generic [ref=e697]: 设备申请
                      - generic [ref=e698]: .pdf
                    - generic [ref=e699]: 860 KB · 关联申请待你审核
                  - button "预览示例 设备申请.pdf" [ref=e700] [cursor=pointer]
                  - generic [ref=e703]:
                    - button "去审核" [ref=e704] [cursor=pointer]
                    - button "更多操作 设备申请.pdf" [ref=e706] [cursor=pointer]
              - group "课堂资料.pdf 示例" [ref=e709]:
                - generic [ref=e710]:
                  - generic [ref=e712]:
                    - generic "课堂资料.pdf" [ref=e713]:
                      - generic [ref=e714]: 课堂资料
                      - generic [ref=e715]: .pdf
                    - generic [ref=e716]: 2.1 MB · 禁止下载
                  - button "预览示例 课堂资料.pdf" [ref=e717] [cursor=pointer]
                  - generic [ref=e720]:
                    - button "预览" [ref=e721] [cursor=pointer]
                    - button "更多操作 课堂资料.pdf" [ref=e723] [cursor=pointer]
    - generic [ref=e726]:
      - heading "完整五态" [level=2] [ref=e727]
      - paragraph [ref=e728]: 处理中保留可读文字和动态提示；失败同时使用文字和图标。
      - group "附件状态对照" [ref=e730]:
        - generic [ref=e733]:
          - generic [ref=e734]: idle.pdf
          - generic [ref=e735]: 等待上传
        - generic [ref=e738]:
          - generic [ref=e739]: uploading.pdf
          - generic [ref=e740]: 正在上传
        - generic [ref=e743]:
          - generic [ref=e744]: processing.pdf
          - generic [ref=e745]: 正在处理
        - generic [ref=e748]:
          - generic [ref=e749]: error.pdf
          - generic [ref=e750]: 上传失败，请重试
        - generic [ref=e753]:
          - generic [ref=e754]: done.pdf
          - generic [ref=e755]: 已上传 · 1.8 MB
    - generic [ref=e756]:
      - heading "三档尺寸与竖排媒体" [level=2] [ref=e757]
      - generic [ref=e758]:
        - generic [ref=e759]:
          - generic [ref=e762]:
            - generic [ref=e763]: 课程资料.pdf
            - generic [ref=e764]: default · PDF
          - generic [ref=e767]:
            - generic [ref=e768]: 课程资料.pdf
            - generic [ref=e769]: sm · PDF
          - generic [ref=e772]:
            - generic [ref=e773]: 课程资料.pdf
            - generic [ref=e774]: xs · PDF
        - generic [ref=e775]:
          - img "课程封面占位：从问题到证据" [ref=e777]:
            - generic [ref=e778]:
              - generic [ref=e779]: 课堂观察 · 第 04 讲
              - strong [ref=e780]: 从问题到证据
              - generic [ref=e781]: 观察 · 记录 · 讨论
          - generic [ref=e782]:
            - generic [ref=e783]: 课程封面
            - generic [ref=e784]: 预览占位
  - region [ref=e785]:
    - heading "使用边界" [level=2] [ref=e786]
    - generic [ref=e787]:
      - generic [ref=e788]:
        - heading "适合用在" [level=3] [ref=e789]
        - list [ref=e790]:
          - listitem [ref=e791]: 表单、消息或资料区需要展示文件和处理状态。
          - listitem [ref=e792]: 课程附件需要选择、校验、上传、预览、下载或替换。
      - generic [ref=e793]:
        - heading "避免用在" [level=3] [ref=e794]
        - list [ref=e795]:
          - listitem [ref=e796]: 把前端校验和操作显隐当作服务器权限或安全校验。
          - listitem [ref=e797]: 把整卡按钮与移除按钮做成嵌套按钮。
  - generic [ref=e798]:
    - region [ref=e799]:
      - heading "API 与结构" [level=2] [ref=e800]
      - table [ref=e802]:
        - caption [ref=e803]: Attachment 文件附件 常用接口
        - rowgroup [ref=e804]:
          - row [ref=e805]:
            - columnheader "名称" [ref=e806]
            - columnheader "类型" [ref=e807]
            - columnheader "默认" [ref=e808]
            - columnheader "说明" [ref=e809]
        - rowgroup [ref=e810]:
          - row [ref=e811]:
            - rowheader [ref=e812]:
              - code [ref=e813]: useAttachmentUpload
            - cell [ref=e814]:
              - code [ref=e815]: items / constraints / upload / readOnly
            - cell "—" [ref=e816]
            - cell "管理文件选择、校验、上传、取消和重试；上传适配器由宿主提供。" [ref=e817]
          - row [ref=e818]:
            - rowheader [ref=e819]:
              - code [ref=e820]: AttachmentList
            - cell [ref=e821]:
              - code [ref=e822]: items / surface / readOnly
            - cell "—" [ref=e823]
            - cell "outlined / filled 两种表面；下载主操作与更多菜单遵循独立权限。" [ref=e824]
          - row [ref=e825]:
            - rowheader [ref=e826]:
              - code [ref=e827]: AttachmentList size
            - cell [ref=e828]:
              - code [ref=e829]: default / sm
            - cell "default" [ref=e830]
            - cell "普通附件行与紧凑草稿卡；不改变底层 Attachment 的三档尺寸。" [ref=e831]
          - row [ref=e832]:
            - rowheader [ref=e833]:
              - code [ref=e834]: AttachmentList orientation / layout
            - cell [ref=e835]:
              - code [ref=e836]: horizontal / vertical；list / wrap / grid
            - cell "horizontal / list" [ref=e837]
            - cell "卡片内部方向与集合排列独立；折叠、总数和重试范围由宿主控制。" [ref=e838]
          - row [ref=e839]:
            - rowheader [ref=e840]:
              - code [ref=e841]: AttachmentList actions
            - cell [ref=e842]:
              - code [ref=e843]: default / draft
            - cell "default" [ref=e844]
            - cell "常规查看下载操作，或草稿中的直接移除。" [ref=e845]
          - row [ref=e846]:
            - rowheader [ref=e847]:
              - code [ref=e848]: Attachment state
            - cell [ref=e849]:
              - code [ref=e850]: idle / uploading / processing / error / done
            - cell "done" [ref=e851]
            - cell "底层附件的五种显示状态。" [ref=e852]
          - row [ref=e853]:
            - rowheader [ref=e854]:
              - code [ref=e855]: Attachment size
            - cell [ref=e856]:
              - code [ref=e857]: default / sm / xs
            - cell "default" [ref=e858]
            - cell "三档源码尺寸，显式 size 不再次被密度缩放。" [ref=e859]
      - paragraph [ref=e860]: Parts / Slots：AttachmentPicker、AttachmentList、AttachmentPreview、useAttachmentUpload、Attachment、Group、Media、Content、Title、Description、Actions、Action、Trigger
    - region [ref=e861]:
      - heading "调用示例" [level=2] [ref=e862]
      - generic [ref=e863]:
        - generic [ref=e864]:
          - button "复制代码" [ref=e865] [cursor=pointer]
          - status
        - code [ref=e868]: "const attachments = useAttachmentUpload({ initialItems, constraints: { maxFiles: 8, maxFileSize: 10 * 1024 * 1024 }, upload: uploadFile, }); <AttachmentPicker onFiles={files => { attachments.addFiles(files); }} /> <AttachmentList items={attachments.items} onStart={item => { void attachments.start(item.id); }} onRetry={item => { void attachments.retry(item.id); }} onCancel={item => attachments.cancel(item.id)} onRemove={item => attachments.remove(item.id)} onReplace={(item, file) => { attachments.replaceFile(item.id, file); }} /> <Button disabled={!attachments.summary.canSubmit}>保存附件</Button>"
      - paragraph [ref=e869]:
        - text: 当前源码：
        - code [ref=e870]: packages/ui/src/attachment-workflow/index.ts
```

# Test source

```ts
  1  | import { expect, test, type Locator } from "@playwright/test";
  2  | async function neutral(button: Locator) {
  3  |   const paint=await button.evaluate(node=>{const s=getComputedStyle(node);return {actual:s.color,hex:s.getPropertyValue("--rain-category-icon-neutral-2").trim()};});
> 4  |   expect(paint.hex).toMatch(/^#[\da-f]{6}$/i);
     |                     ^ Error: expect(received).toMatch(expected)
  5  |   const channels=[1,3,5].map(index=>Number.parseInt(paint.hex.slice(index,index+2),16));
  6  |   expect(paint.actual).toBe(`rgb(${channels.join(", ")})`);
  7  | }
  8  | test.beforeEach(async({page})=>{await page.goto("/#attachment");});
  9  | 
  10 | test("download and upload feedback stay in the original two-line row",async({page},info)=>{
  11 |   const scene=page.getByTestId("attachment-scenario-ordinary"), row=scene.locator('[data-attachment-id="ordinary-1"] .rain-attachment-list__card');
  12 |   const initial=(await row.boundingBox())!.height;expect(initial).toBe(56);
  13 |   await neutral(row.getByRole("button",{name:"下载 课程导读.pdf",exact:true}));
  14 |   await neutral(row.getByRole("button",{name:"更多操作 课程导读.pdf",exact:true}));
  15 |   let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve;});
  16 |   await page.route("**/attachment-demo/course-guide.pdf",async route=>{await gate;await route.continue();});
  17 |   const downloaded=page.waitForEvent("download");
  18 |   await row.getByRole("button",{name:"下载 课程导读.pdf",exact:true}).click();
  19 |   await expect(row.getByRole("status")).toHaveTextContent("正在准备下载");
  20 |   expect((await row.boundingBox())!.height).toBe(initial);
  21 |   release();await downloaded;
  22 |   await expect(row.getByRole("status")).toHaveTextContent("已发起下载");
  23 |   expect((await row.boundingBox())!.height).toBe(initial);
  24 |   await row.screenshot({path:info.outputPath("outlined-download-initiated.png")});
  25 |   await page.unroute("**/attachment-demo/course-guide.pdf");
  26 |   await page.route("**/attachment-demo/course-guide.pdf",route=>route.fulfill({status:503,body:"unavailable"}));
  27 |   await row.getByRole("button",{name:"下载 课程导读.pdf",exact:true}).click();
  28 |   await expect(row.getByRole("alert")).toContainText("下载失败（503）");
  29 |   expect((await row.boundingBox())!.height).toBe(initial);
  30 |   await expect(row.locator('[data-slot="attachment-description"]')).toHaveAttribute("title",/下载失败/);
  31 |   await page.unroute("**/attachment-demo/course-guide.pdf");
  32 |   await scene.getByRole("button",{name:"演示上传",exact:true}).click();
  33 |   const failed=scene.locator('[data-attachment-id="ordinary-4"] .rain-attachment-list__card');
  34 |   await expect(failed.getByRole("alert")).toContainText("连接中断");
  35 |   expect((await failed.boundingBox())!.height).toBe(initial);
  36 |   expect((await failed.locator('[data-slot="attachment-description"]').boundingBox())!.height).toBe(20);
  37 |   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  38 | });
  39 | 
  40 | test("neutral draft, filled-dialog and media actions preserve download height in both themes",async({page},info)=>{
  41 |   for(const theme of ["light","dark"]){
  42 |     if(theme==="dark")await page.getByRole("button",{name:"深色",exact:true}).click();
  43 |     const draft=page.getByTestId("attachment-scenario-composer");
  44 |     const remove=draft.getByRole("button",{name:"移除 课程导读.pdf",exact:true});
  45 |     await neutral(remove);await remove.hover();await neutral(remove);
  46 |     const legacy=page.getByRole("region",{name:"白底 · 浅描边",exact:true});
  47 |     await neutral(legacy.getByRole("button",{name:"下载示例 课程导读：从问题到证据.pdf",exact:true}));
  48 |     await neutral(legacy.getByRole("button",{name:"更多操作 课程导读：从问题到证据.pdf",exact:true}));
  49 |     await page.getByRole("button",{name:"打开附件弹窗",exact:true}).click();
  50 |     const dialog=page.getByRole("dialog",{name:"本次附件",exact:true});
  51 |     await dialog.evaluate(async node=>{await Promise.all(node.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));});
  52 |     const row=dialog.locator('[data-attachment-id="dialog-1"] .rain-attachment-list__card');
  53 |     const height=(await row.boundingBox())!.height;
  54 |     const down=row.getByRole("button",{name:"下载 课程导读.pdf",exact:true});await neutral(down);
  55 |     const event=page.waitForEvent("download");await down.click();await event;
  56 |     await expect(row.getByRole("status")).toHaveTextContent("已发起下载");
  57 |     expect((await row.boundingBox())!.height).toBe(height);
  58 |     await row.screenshot({path:info.outputPath(theme+"-filled-download.png")});
  59 |     await page.keyboard.press("Escape");
  60 |     const media=page.getByTestId("attachment-scenario-media");
  61 |     const card=media.locator('[data-attachment-id="media-image-classroom"] .rain-attachment-list__card');
  62 |     const before=(await card.boundingBox())!.height;
  63 |     const mediaDown=card.getByRole("button",{name:"下载 课堂板书.png",exact:true});await neutral(mediaDown);
  64 |     await neutral(card.getByRole("button",{name:"更多操作 课堂板书.png",exact:true}));
  65 |     const event2=page.waitForEvent("download");await mediaDown.click();await event2;
  66 |     await expect(card.getByRole("status")).toHaveTextContent("已发起下载");expect((await card.boundingBox())!.height).toBe(before);
  67 |     await card.screenshot({path:info.outputPath(theme+"-media-download.png")});
  68 |     expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  69 |   }
  70 | });
  71 | 
  72 | test("compact cancellation and retry keep forty-pixel height",async({page},info)=>{
  73 |   const scene=page.getByTestId("attachment-scenario-composer"),name="课堂补充记录.txt";
  74 |   await scene.locator('.rain-attachment-picker input[type="file"]').setInputFiles({name,mimeType:"text/plain",buffer:Buffer.from("真实的紧凑上传状态测试")});
  75 |   await scene.getByRole("button",{name:"查看全部 13 个",exact:true}).click();
  76 |   const row=scene.locator('.rain-attachment-list__card').filter({has:page.getByRole("button",{name:"预览 "+name,exact:true})});
  77 |   expect((await row.boundingBox())!.height).toBe(40);
  78 |   await row.getByRole("button",{name:"取消上传 "+name,exact:true}).click();
  79 |   await expect(row).toContainText("已取消上传");expect((await row.boundingBox())!.height).toBe(40);
  80 |   await row.getByRole("button",{name:"重试上传 "+name,exact:true}).click();
  81 |   await expect(row.getByRole("progressbar")).toBeVisible();expect((await row.boundingBox())!.height).toBe(40);
  82 |   await expect(page.getByTestId("composer-summary")).toContainText("13 个已上传",{timeout:10000});
  83 |   expect((await row.boundingBox())!.height).toBe(40);
  84 |   await row.screenshot({path:info.outputPath("compact-after-retry.png")});
  85 | });
  86 | 
```