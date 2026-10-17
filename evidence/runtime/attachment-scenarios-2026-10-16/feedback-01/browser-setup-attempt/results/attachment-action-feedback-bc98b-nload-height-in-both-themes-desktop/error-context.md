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
                    - generic [ref=e170]:
                      - generic "课程导读.pdf" [ref=e171]:
                        - generic [ref=e172]: 课程导读
                        - generic [ref=e173]: .pdf
                      - generic "965 B" [ref=e174]
                    - button "预览 课程导读.pdf" [ref=e175] [cursor=pointer]
                    - button "移除 课程导读.pdf" [ref=e177] [cursor=pointer]
                  - generic [ref=e181]:
                    - generic [ref=e183]:
                      - generic "课堂讲义.txt" [ref=e184]:
                        - generic [ref=e185]: 课堂讲义
                        - generic [ref=e186]: .txt
                      - generic "80 B" [ref=e187]
                    - button "预览 课堂讲义.txt" [ref=e188] [cursor=pointer]
                    - button "移除 课堂讲义.txt" [ref=e190] [cursor=pointer]
                  - generic [ref=e194]:
                    - generic [ref=e196]:
                      - generic "课堂观察数据.csv" [ref=e197]:
                        - generic [ref=e198]: 课堂观察数据
                        - generic [ref=e199]: .csv
                      - generic "66 B" [ref=e200]
                    - button "预览 课堂观察数据.csv" [ref=e201] [cursor=pointer]
                    - button "移除 课堂观察数据.csv" [ref=e203] [cursor=pointer]
                  - generic [ref=e207]:
                    - generic [ref=e209]:
                      - generic "小组讨论记录.md" [ref=e210]:
                        - generic [ref=e211]: 小组讨论记录
                        - generic [ref=e212]: .md
                      - generic "103 B" [ref=e213]
                    - button "预览 小组讨论记录.md" [ref=e214] [cursor=pointer]
                    - button "移除 小组讨论记录.md" [ref=e216] [cursor=pointer]
              - textbox "课程消息" [ref=e219]: 这是一组本周课程资料，请结合课堂笔记阅读。
              - generic [ref=e221]:
                - group "添加草稿附件" [ref=e222]:
                  - generic [ref=e223]:
                    - button "添加草稿附件" [ref=e224] [cursor=pointer]
                    - status [ref=e228]: 或将文件拖到这里。
                - button "发送到本页" [ref=e229] [cursor=pointer]
            - paragraph [ref=e231]: 仅在本页回显消息；此演示等待当前附件上传完成后发送，不提交真实课程消息。
        - region "弹窗附件列表" [ref=e232]:
          - generic [ref=e233]:
            - generic [ref=e234]:
              - heading "集中管理附件" [level=3] [ref=e235]
              - paragraph [ref=e236]: 弹窗内滚动列表，底部操作保持可见。
            - button "打开附件弹窗" [ref=e237] [cursor=pointer]
          - paragraph [ref=e239]: 当前有 24 个附件。关闭和重新打开不会重置文件；上传结果只保留在本页。
        - region "图片与视频网格" [ref=e240]:
          - generic [ref=e241]:
            - generic [ref=e242]:
              - heading "图片与视频" [level=3] [ref=e243]
              - paragraph [ref=e244]: 内容缩略图 · 文件名和操作留在画面下方
            - button "恢复媒体示例" [ref=e245] [cursor=pointer]
          - group "添加图片或视频" [ref=e247]:
            - generic [ref=e248]:
              - button "添加图片或视频" [ref=e249] [cursor=pointer]
              - status [ref=e251]: 或将文件拖到这里。
          - status [ref=e253]:
            - generic [ref=e254]: 共 12 个
            - generic [ref=e255]: · 12 个已上传
          - generic [ref=e257]:
            - generic [ref=e259]:
              - img "缩略图 课堂板书.png" [ref=e261]
              - generic [ref=e262]:
                - generic "课堂板书.png" [ref=e263]:
                  - generic [ref=e264]: 课堂板书
                  - generic [ref=e265]: .png
                - generic "1.8 MB" [ref=e266]
              - button "预览 课堂板书.png" [ref=e267] [cursor=pointer]
              - generic [ref=e268]:
                - button "下载 课堂板书.png" [ref=e269] [cursor=pointer]
                - button "更多操作 课堂板书.png" [ref=e272] [cursor=pointer]
            - generic [ref=e276]:
              - img "缩略图 课堂演示.mp4" [ref=e278]
              - generic [ref=e281]:
                - generic "课堂演示.mp4" [ref=e282]:
                  - generic [ref=e283]: 课堂演示
                  - generic [ref=e284]: .mp4
                - generic "207.3 KB" [ref=e285]
              - button "预览 课堂演示.mp4" [ref=e286] [cursor=pointer]
              - generic [ref=e287]:
                - button "下载 课堂演示.mp4" [ref=e288] [cursor=pointer]
                - button "更多操作 课堂演示.mp4" [ref=e291] [cursor=pointer]
            - generic [ref=e295]:
              - img "缩略图 分组讨论.png" [ref=e297]
              - generic [ref=e298]:
                - generic "分组讨论.png" [ref=e299]:
                  - generic [ref=e300]: 分组讨论
                  - generic [ref=e301]: .png
                - generic "1.9 MB" [ref=e302]
              - button "预览 分组讨论.png" [ref=e303] [cursor=pointer]
              - generic [ref=e304]:
                - button "下载 分组讨论.png" [ref=e305] [cursor=pointer]
                - button "更多操作 分组讨论.png" [ref=e308] [cursor=pointer]
            - generic [ref=e312]:
              - img "缩略图 实验过程.mp4" [ref=e314]
              - generic [ref=e317]:
                - generic "实验过程.mp4" [ref=e318]:
                  - generic [ref=e319]: 实验过程
                  - generic [ref=e320]: .mp4
                - generic "207.3 KB" [ref=e321]
              - button "预览 实验过程.mp4" [ref=e322] [cursor=pointer]
              - generic [ref=e323]:
                - button "下载 实验过程.mp4" [ref=e324] [cursor=pointer]
                - button "更多操作 实验过程.mp4" [ref=e327] [cursor=pointer]
            - generic [ref=e331]:
              - img "缩略图 实验装置.png" [ref=e333]
              - generic [ref=e334]:
                - generic "实验装置.png" [ref=e335]:
                  - generic [ref=e336]: 实验装置
                  - generic [ref=e337]: .png
                - generic "1.8 MB" [ref=e338]
              - button "预览 实验装置.png" [ref=e339] [cursor=pointer]
              - generic [ref=e340]:
                - button "下载 实验装置.png" [ref=e341] [cursor=pointer]
                - button "更多操作 实验装置.png" [ref=e344] [cursor=pointer]
            - generic [ref=e348]:
              - img "缩略图 课堂讲授.png" [ref=e350]
              - generic [ref=e351]:
                - generic "课堂讲授.png" [ref=e352]:
                  - generic [ref=e353]: 课堂讲授
                  - generic [ref=e354]: .png
                - generic "1.9 MB" [ref=e355]
              - button "预览 课堂讲授.png" [ref=e356] [cursor=pointer]
              - generic [ref=e357]:
                - button "下载 课堂讲授.png" [ref=e358] [cursor=pointer]
                - button "更多操作 课堂讲授.png" [ref=e361] [cursor=pointer]
            - generic [ref=e365]:
              - img "缩略图 自主阅读.png" [ref=e367]
              - generic [ref=e368]:
                - generic "自主阅读.png" [ref=e369]:
                  - generic [ref=e370]: 自主阅读
                  - generic [ref=e371]: .png
                - generic "1.9 MB" [ref=e372]
              - button "预览 自主阅读.png" [ref=e373] [cursor=pointer]
              - generic [ref=e374]:
                - button "下载 自主阅读.png" [ref=e375] [cursor=pointer]
                - button "更多操作 自主阅读.png" [ref=e378] [cursor=pointer]
            - generic [ref=e382]:
              - img "缩略图 课堂协作.png" [ref=e384]
              - generic [ref=e385]:
                - generic "课堂协作.png" [ref=e386]:
                  - generic [ref=e387]: 课堂协作
                  - generic [ref=e388]: .png
                - generic "1.8 MB" [ref=e389]
              - button "预览 课堂协作.png" [ref=e390] [cursor=pointer]
              - generic [ref=e391]:
                - button "下载 课堂协作.png" [ref=e392] [cursor=pointer]
                - button "更多操作 课堂协作.png" [ref=e395] [cursor=pointer]
          - generic [ref=e398]:
            - generic [ref=e399]: 当前显示 8 / 12 个附件
            - button "展开全部 12 个" [ref=e400] [cursor=pointer]
          - paragraph [ref=e402]: 图片为 AI 生成的教学情境示意；视频为实验室示意图制作的 4 秒无声合成短片，不是课堂现场实录。多个视频条目复用同一演示文件。
    - generic [ref=e403]:
      - heading "课程附件工作流" [level=2] [ref=e404]
      - paragraph [ref=e405]: 选择或拖入真实文件，查看预览与下载，再试试取消、失败重试、替换及只读查看。
      - generic [ref=e407]:
        - paragraph [ref=e408]: 本地演示：选择、预览和下载使用真实文件；上传与保存仅在本页模拟，不向服务器传输。刷新后恢复示例。
        - group [ref=e409]:
          - generic "演示选项" [ref=e410] [cursor=pointer]
        - form "课程附件" [ref=e411]:
          - group "添加附件" [ref=e412]:
            - generic [ref=e413]:
              - button "添加附件" [ref=e414] [cursor=pointer]
              - status [ref=e416]: 或将文件拖到这里。
            - generic [ref=e417]: 支持 PDF、常见图片、文档、表格、演示文稿、TXT 和 ZIP。最多 8 个，每个不超过 10 MB，合计不超过 25 MB；不接收空文件和重复文件。
          - generic [ref=e419]:
            - generic [ref=e421]:
              - generic [ref=e423]:
                - generic "课程导读：从问题到证据.pdf" [ref=e424]:
                  - generic [ref=e425]: 课程导读：从问题到证据
                  - generic [ref=e426]: .pdf
                - generic "965 B" [ref=e427]
              - button "预览 课程导读：从问题到证据.pdf" [ref=e428] [cursor=pointer]
              - generic [ref=e429]:
                - button "下载 课程导读：从问题到证据.pdf" [ref=e430] [cursor=pointer]
                - button "更多操作 课程导读：从问题到证据.pdf" [ref=e433] [cursor=pointer]
            - generic [ref=e437]:
              - img "缩略图 高等数学课程封面.png" [ref=e439]
              - generic [ref=e440]:
                - generic "高等数学课程封面.png" [ref=e441]:
                  - generic [ref=e442]: 高等数学课程封面
                  - generic [ref=e443]: .png
                - generic "1 MB" [ref=e444]
              - button "预览 高等数学课程封面.png" [ref=e445] [cursor=pointer]
              - generic [ref=e446]:
                - button "下载 高等数学课程封面.png" [ref=e447] [cursor=pointer]
                - button "更多操作 高等数学课程封面.png" [ref=e450] [cursor=pointer]
            - generic [ref=e454]:
              - generic [ref=e456]:
                - generic "课堂观察记录与同伴反馈说明.txt" [ref=e457]:
                  - generic [ref=e458]: 课堂观察记录与同伴反馈说明
                  - generic [ref=e459]: .txt
                - generic "341 B" [ref=e460]
              - button "预览 课堂观察记录与同伴反馈说明.txt" [ref=e461] [cursor=pointer]
              - generic [ref=e462]:
                - button "下载 课堂观察记录与同伴反馈说明.txt" [ref=e463] [cursor=pointer]
                - button "更多操作 课堂观察记录与同伴反馈说明.txt" [ref=e466] [cursor=pointer]
          - generic [ref=e469]:
            - status [ref=e470]: 3 / 8 个附件 · 合计 1 MB / 25 MB。附件已就绪，可保存。
            - generic [ref=e471]:
              - button "保存附件" [ref=e472] [cursor=pointer]
              - button "恢复示例" [ref=e474] [cursor=pointer]
        - group [ref=e476]:
          - generic "权限与失效示例" [ref=e477] [cursor=pointer]
    - generic [ref=e478]:
      - heading "文件与任务状态" [level=2] [ref=e479]
      - paragraph [ref=e480]: 白底和浅灰底使用相同结构；文件身份、上传状态与关联任务分别表达。
      - generic [ref=e482]:
        - generic [ref=e483]:
          - paragraph [ref=e484]: 两列共享同一组示例状态。除课程导读的真实 PDF 外，文件信息、上传、字幕、报告和审核均为本页演示。
          - button "恢复示例" [ref=e485] [cursor=pointer]
        - generic [ref=e487]:
          - region "白底 · 浅描边" [ref=e488]:
            - heading "白底 · 浅描边" [level=3] [ref=e489]
            - generic [ref=e490]:
              - group "课程导读：从问题到证据.pdf 示例" [ref=e491]:
                - generic [ref=e492]:
                  - generic [ref=e494]:
                    - generic "课程导读：从问题到证据.pdf" [ref=e495]:
                      - generic [ref=e496]: 课程导读：从问题到证据
                      - generic [ref=e497]: .pdf
                    - generic [ref=e498]: 965 B
                  - button "预览示例 课程导读：从问题到证据.pdf" [ref=e499] [cursor=pointer]
                  - generic [ref=e501]:
                    - button "下载示例 课程导读：从问题到证据.pdf" [ref=e502] [cursor=pointer]
                    - button "更多操作 课程导读：从问题到证据.pdf" [ref=e505] [cursor=pointer]
              - group "课堂录像.mp4 示例" [ref=e508]:
                - generic [ref=e509]:
                  - generic [ref=e511]:
                    - generic "课堂录像.mp4" [ref=e512]:
                      - generic [ref=e513]: 课堂录像
                      - generic [ref=e514]: .mp4
                    - generic [ref=e516]:
                      - progressbar "模拟上传进度 课堂录像.mp4" [ref=e517]: x
                      - generic [ref=e520]: 42%
                  - button "预览示例 课堂录像.mp4" [disabled] [ref=e521]
                  - button "取消上传" [ref=e524] [cursor=pointer]:
                    - generic [ref=e525]: 取消
              - group "课堂录音.mp3 示例" [ref=e526]:
                - generic [ref=e527]:
                  - generic [ref=e529]:
                    - generic "课堂录音.mp3" [ref=e530]:
                      - generic [ref=e531]: 课堂录音
                      - generic [ref=e532]: .mp3
                    - generic [ref=e533]: 4.6 MB · 上传失败
                  - button "预览示例 课堂录音.mp3" [disabled] [ref=e534]
                  - generic [ref=e537]:
                    - button "重试上传" [ref=e538] [cursor=pointer]:
                      - generic [ref=e539]: 重试
                    - button "更多操作 课堂录音.mp3" [ref=e540] [cursor=pointer]
              - group "研究论文.pdf 示例" [ref=e543]:
                - generic [ref=e544]:
                  - generic [ref=e546]:
                    - generic "研究论文.pdf" [ref=e547]:
                      - generic [ref=e548]: 研究论文
                      - generic [ref=e549]: .pdf
                    - generic [ref=e550]: 1.8 MB · 检测报告未读
                  - button "预览示例 研究论文.pdf" [ref=e551] [cursor=pointer]
                  - generic [ref=e556]:
                    - button "查看报告" [ref=e557] [cursor=pointer]
                    - button "更多操作 研究论文.pdf" [ref=e559] [cursor=pointer]
              - group "授课录像.mp4 示例" [ref=e562]:
                - generic [ref=e563]:
                  - generic [ref=e565]:
                    - generic "授课录像.mp4" [ref=e566]:
                      - generic [ref=e567]: 授课录像
                      - generic [ref=e568]: .mp4
                    - generic [ref=e569]: 64 MB
                  - button "预览示例 授课录像.mp4" [ref=e570] [cursor=pointer]
                  - generic [ref=e572]:
                    - button "下载说明 授课录像.mp4" [ref=e573] [cursor=pointer]
                    - button "更多操作 授课录像.mp4" [ref=e576] [cursor=pointer]
                - generic [ref=e579]:
                  - generic [ref=e583]:
                    - text: 字幕生成失败
                    - paragraph [ref=e584]: 原视频状态正常 · 播放、下载为示例
                  - button "重试字幕" [ref=e585] [cursor=pointer]
              - group "设备申请.pdf 示例" [ref=e587]:
                - generic [ref=e588]:
                  - generic [ref=e590]:
                    - generic "设备申请.pdf" [ref=e591]:
                      - generic [ref=e592]: 设备申请
                      - generic [ref=e593]: .pdf
                    - generic [ref=e594]: 860 KB · 关联申请待你审核
                  - button "预览示例 设备申请.pdf" [ref=e595] [cursor=pointer]
                  - generic [ref=e598]:
                    - button "去审核" [ref=e599] [cursor=pointer]
                    - button "更多操作 设备申请.pdf" [ref=e601] [cursor=pointer]
              - group "课堂资料.pdf 示例" [ref=e604]:
                - generic [ref=e605]:
                  - generic [ref=e607]:
                    - generic "课堂资料.pdf" [ref=e608]:
                      - generic [ref=e609]: 课堂资料
                      - generic [ref=e610]: .pdf
                    - generic [ref=e611]: 2.1 MB · 禁止下载
                  - button "预览示例 课堂资料.pdf" [ref=e612] [cursor=pointer]
                  - generic [ref=e615]:
                    - button "预览" [ref=e616] [cursor=pointer]
                    - button "更多操作 课堂资料.pdf" [ref=e618] [cursor=pointer]
          - region "浅灰底" [ref=e621]:
            - heading "浅灰底" [level=3] [ref=e622]
            - generic [ref=e623]:
              - group "课程导读：从问题到证据.pdf 示例" [ref=e624]:
                - generic [ref=e625]:
                  - generic [ref=e627]:
                    - generic "课程导读：从问题到证据.pdf" [ref=e628]:
                      - generic [ref=e629]: 课程导读：从问题到证据
                      - generic [ref=e630]: .pdf
                    - generic [ref=e631]: 965 B
                  - button "预览示例 课程导读：从问题到证据.pdf" [ref=e632] [cursor=pointer]
                  - generic [ref=e634]:
                    - button "下载示例 课程导读：从问题到证据.pdf" [ref=e635] [cursor=pointer]
                    - button "更多操作 课程导读：从问题到证据.pdf" [ref=e638] [cursor=pointer]
              - group "课堂录像.mp4 示例" [ref=e641]:
                - generic [ref=e642]:
                  - generic [ref=e644]:
                    - generic "课堂录像.mp4" [ref=e645]:
                      - generic [ref=e646]: 课堂录像
                      - generic [ref=e647]: .mp4
                    - generic [ref=e649]:
                      - progressbar "模拟上传进度 课堂录像.mp4" [ref=e650]: x
                      - generic [ref=e653]: 42%
                  - button "预览示例 课堂录像.mp4" [disabled] [ref=e654]
                  - button "取消上传" [ref=e657] [cursor=pointer]:
                    - generic [ref=e658]: 取消
              - group "课堂录音.mp3 示例" [ref=e659]:
                - generic [ref=e660]:
                  - generic [ref=e662]:
                    - generic "课堂录音.mp3" [ref=e663]:
                      - generic [ref=e664]: 课堂录音
                      - generic [ref=e665]: .mp3
                    - generic [ref=e666]: 4.6 MB · 上传失败
                  - button "预览示例 课堂录音.mp3" [disabled] [ref=e667]
                  - generic [ref=e670]:
                    - button "重试上传" [ref=e671] [cursor=pointer]:
                      - generic [ref=e672]: 重试
                    - button "更多操作 课堂录音.mp3" [ref=e673] [cursor=pointer]
              - group "研究论文.pdf 示例" [ref=e676]:
                - generic [ref=e677]:
                  - generic [ref=e679]:
                    - generic "研究论文.pdf" [ref=e680]:
                      - generic [ref=e681]: 研究论文
                      - generic [ref=e682]: .pdf
                    - generic [ref=e683]: 1.8 MB · 检测报告未读
                  - button "预览示例 研究论文.pdf" [ref=e684] [cursor=pointer]
                  - generic [ref=e689]:
                    - button "查看报告" [ref=e690] [cursor=pointer]
                    - button "更多操作 研究论文.pdf" [ref=e692] [cursor=pointer]
              - group "授课录像.mp4 示例" [ref=e695]:
                - generic [ref=e696]:
                  - generic [ref=e698]:
                    - generic "授课录像.mp4" [ref=e699]:
                      - generic [ref=e700]: 授课录像
                      - generic [ref=e701]: .mp4
                    - generic [ref=e702]: 64 MB
                  - button "预览示例 授课录像.mp4" [ref=e703] [cursor=pointer]
                  - generic [ref=e705]:
                    - button "下载说明 授课录像.mp4" [ref=e706] [cursor=pointer]
                    - button "更多操作 授课录像.mp4" [ref=e709] [cursor=pointer]
                - generic [ref=e712]:
                  - generic [ref=e716]:
                    - text: 字幕生成失败
                    - paragraph [ref=e717]: 原视频状态正常 · 播放、下载为示例
                  - button "重试字幕" [ref=e718] [cursor=pointer]
              - group "设备申请.pdf 示例" [ref=e720]:
                - generic [ref=e721]:
                  - generic [ref=e723]:
                    - generic "设备申请.pdf" [ref=e724]:
                      - generic [ref=e725]: 设备申请
                      - generic [ref=e726]: .pdf
                    - generic [ref=e727]: 860 KB · 关联申请待你审核
                  - button "预览示例 设备申请.pdf" [ref=e728] [cursor=pointer]
                  - generic [ref=e731]:
                    - button "去审核" [ref=e732] [cursor=pointer]
                    - button "更多操作 设备申请.pdf" [ref=e734] [cursor=pointer]
              - group "课堂资料.pdf 示例" [ref=e737]:
                - generic [ref=e738]:
                  - generic [ref=e740]:
                    - generic "课堂资料.pdf" [ref=e741]:
                      - generic [ref=e742]: 课堂资料
                      - generic [ref=e743]: .pdf
                    - generic [ref=e744]: 2.1 MB · 禁止下载
                  - button "预览示例 课堂资料.pdf" [ref=e745] [cursor=pointer]
                  - generic [ref=e748]:
                    - button "预览" [ref=e749] [cursor=pointer]
                    - button "更多操作 课堂资料.pdf" [ref=e751] [cursor=pointer]
    - generic [ref=e754]:
      - heading "完整五态" [level=2] [ref=e755]
      - paragraph [ref=e756]: 处理中保留可读文字和动态提示；失败同时使用文字和图标。
      - group "附件状态对照" [ref=e758]:
        - generic [ref=e761]:
          - generic [ref=e762]: idle.pdf
          - generic [ref=e763]: 等待上传
        - generic [ref=e766]:
          - generic [ref=e767]: uploading.pdf
          - generic [ref=e768]: 正在上传
        - generic [ref=e771]:
          - generic [ref=e772]: processing.pdf
          - generic [ref=e773]: 正在处理
        - generic [ref=e776]:
          - generic [ref=e777]: error.pdf
          - generic [ref=e778]: 上传失败，请重试
        - generic [ref=e781]:
          - generic [ref=e782]: done.pdf
          - generic [ref=e783]: 已上传 · 1.8 MB
    - generic [ref=e784]:
      - heading "三档尺寸与竖排媒体" [level=2] [ref=e785]
      - generic [ref=e786]:
        - generic [ref=e787]:
          - generic [ref=e790]:
            - generic [ref=e791]: 课程资料.pdf
            - generic [ref=e792]: default · PDF
          - generic [ref=e795]:
            - generic [ref=e796]: 课程资料.pdf
            - generic [ref=e797]: sm · PDF
          - generic [ref=e800]:
            - generic [ref=e801]: 课程资料.pdf
            - generic [ref=e802]: xs · PDF
        - generic [ref=e803]:
          - img "课程封面占位：从问题到证据" [ref=e805]:
            - generic [ref=e806]:
              - generic [ref=e807]: 课堂观察 · 第 04 讲
              - strong [ref=e808]: 从问题到证据
              - generic [ref=e809]: 观察 · 记录 · 讨论
          - generic [ref=e810]:
            - generic [ref=e811]: 课程封面
            - generic [ref=e812]: 预览占位
  - region [ref=e813]:
    - heading "使用边界" [level=2] [ref=e814]
    - generic [ref=e815]:
      - generic [ref=e816]:
        - heading "适合用在" [level=3] [ref=e817]
        - list [ref=e818]:
          - listitem [ref=e819]: 表单、消息或资料区需要展示文件和处理状态。
          - listitem [ref=e820]: 课程附件需要选择、校验、上传、预览、下载或替换。
      - generic [ref=e821]:
        - heading "避免用在" [level=3] [ref=e822]
        - list [ref=e823]:
          - listitem [ref=e824]: 把前端校验和操作显隐当作服务器权限或安全校验。
          - listitem [ref=e825]: 把整卡按钮与移除按钮做成嵌套按钮。
  - generic [ref=e826]:
    - region [ref=e827]:
      - heading "API 与结构" [level=2] [ref=e828]
      - table [ref=e830]:
        - caption [ref=e831]: Attachment 文件附件 常用接口
        - rowgroup [ref=e832]:
          - row [ref=e833]:
            - columnheader "名称" [ref=e834]
            - columnheader "类型" [ref=e835]
            - columnheader "默认" [ref=e836]
            - columnheader "说明" [ref=e837]
        - rowgroup [ref=e838]:
          - row [ref=e839]:
            - rowheader [ref=e840]:
              - code [ref=e841]: useAttachmentUpload
            - cell [ref=e842]:
              - code [ref=e843]: items / constraints / upload / readOnly
            - cell "—" [ref=e844]
            - cell "管理文件选择、校验、上传、取消和重试；上传适配器由宿主提供。" [ref=e845]
          - row [ref=e846]:
            - rowheader [ref=e847]:
              - code [ref=e848]: AttachmentList
            - cell [ref=e849]:
              - code [ref=e850]: items / surface / readOnly
            - cell "—" [ref=e851]
            - cell "outlined / filled 两种表面；下载主操作与更多菜单遵循独立权限。" [ref=e852]
          - row [ref=e853]:
            - rowheader [ref=e854]:
              - code [ref=e855]: AttachmentList size
            - cell [ref=e856]:
              - code [ref=e857]: default / sm
            - cell "default" [ref=e858]
            - cell "普通附件行与紧凑草稿卡；不改变底层 Attachment 的三档尺寸。" [ref=e859]
          - row [ref=e860]:
            - rowheader [ref=e861]:
              - code [ref=e862]: AttachmentList orientation / layout
            - cell [ref=e863]:
              - code [ref=e864]: horizontal / vertical；list / wrap / grid
            - cell "horizontal / list" [ref=e865]
            - cell "卡片内部方向与集合排列独立；折叠、总数和重试范围由宿主控制。" [ref=e866]
          - row [ref=e867]:
            - rowheader [ref=e868]:
              - code [ref=e869]: AttachmentList actions
            - cell [ref=e870]:
              - code [ref=e871]: default / draft
            - cell "default" [ref=e872]
            - cell "常规查看下载操作，或草稿中的直接移除。" [ref=e873]
          - row [ref=e874]:
            - rowheader [ref=e875]:
              - code [ref=e876]: Attachment state
            - cell [ref=e877]:
              - code [ref=e878]: idle / uploading / processing / error / done
            - cell "done" [ref=e879]
            - cell "底层附件的五种显示状态。" [ref=e880]
          - row [ref=e881]:
            - rowheader [ref=e882]:
              - code [ref=e883]: Attachment size
            - cell [ref=e884]:
              - code [ref=e885]: default / sm / xs
            - cell "default" [ref=e886]
            - cell "三档源码尺寸，显式 size 不再次被密度缩放。" [ref=e887]
      - paragraph [ref=e888]: Parts / Slots：AttachmentPicker、AttachmentList、AttachmentPreview、useAttachmentUpload、Attachment、Group、Media、Content、Title、Description、Actions、Action、Trigger
    - region [ref=e889]:
      - heading "调用示例" [level=2] [ref=e890]
      - generic [ref=e891]:
        - generic [ref=e892]:
          - button "复制代码" [ref=e893] [cursor=pointer]
          - status
        - code [ref=e896]: "const attachments = useAttachmentUpload({ initialItems, constraints: { maxFiles: 8, maxFileSize: 10 * 1024 * 1024 }, upload: uploadFile, }); <AttachmentPicker onFiles={files => { attachments.addFiles(files); }} /> <AttachmentList items={attachments.items} onStart={item => { void attachments.start(item.id); }} onRetry={item => { void attachments.retry(item.id); }} onCancel={item => attachments.cancel(item.id)} onRemove={item => attachments.remove(item.id)} onReplace={(item, file) => { attachments.replaceFile(item.id, file); }} /> <Button disabled={!attachments.summary.canSubmit}>保存附件</Button>"
      - paragraph [ref=e897]:
        - text: 当前源码：
        - code [ref=e898]: packages/ui/src/attachment-workflow/index.ts
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