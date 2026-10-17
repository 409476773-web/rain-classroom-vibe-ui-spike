# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: attachment-scenarios.spec.ts >> modal body scrolls independently and closing preserves uploads and focus
- Location: tests/e2e/attachment-scenarios.spec.ts:50:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 737.9689331054688
Received: 738.8597412109375
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
        - heading [level=1] [ref=e9]: Attachment 文件附件
        - generic [ref=e10]: UI · 共享候选 · 尚未发布
      - paragraph [ref=e11]: 选择课程文件、查看真实内容，并在上传、重试和替换中保留明确状态。
      - generic [ref=e12]:
        - button [pressed] [ref=e13] [cursor=pointer]:
          - generic [ref=e14]: 浅色
        - button [ref=e15] [cursor=pointer]:
          - generic [ref=e16]: 深色
        - button [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: 紧凑密度
    - generic [ref=e19]:
      - generic [ref=e20]:
        - heading [level=2] [ref=e21]: 四种附件使用场景
        - paragraph [ref=e22]: 普通列表、紧凑草稿、滚动弹窗与媒体网格共享同一附件工作流；折叠和汇总留在各自场景。
        - generic [ref=e24]:
          - paragraph [ref=e25]: 本地演示：选择、预览和下载使用真实文件；上传在本页模拟，不向服务器传输。四个场景独立，刷新后恢复示例。
          - region [ref=e26]:
            - generic [ref=e27]:
              - generic [ref=e28]:
                - heading [level=3] [ref=e29]: 课程资料
                - paragraph [ref=e30]: 普通列表 · 多文件与上传状态
              - generic [ref=e31]:
                - button [ref=e32] [cursor=pointer]:
                  - generic [ref=e33]: 演示上传
                - button [ref=e34] [cursor=pointer]:
                  - generic [ref=e35]: 恢复示例
            - group [ref=e36]:
              - generic [ref=e37]:
                - button [ref=e38] [cursor=pointer]:
                  - generic [ref=e39]: 添加课程附件
                - status [ref=e40]: 或将文件拖到这里。
            - status [ref=e42]:
              - generic [ref=e43]: 共 24 个
              - generic [ref=e44]: · 24 个已上传
            - generic [ref=e46]:
              - generic [ref=e48]:
                - generic [ref=e50]:
                  - generic [ref=e51]:
                    - generic [ref=e52]: 课程导读
                    - generic [ref=e53]: .pdf
                  - generic [ref=e54]: 965 B
                - button [ref=e55] [cursor=pointer]
                - generic [ref=e56]:
                  - button [ref=e57] [cursor=pointer]
                  - button [ref=e60] [cursor=pointer]
              - generic [ref=e64]:
                - generic [ref=e66]:
                  - generic [ref=e67]:
                    - generic [ref=e68]: 课堂讲义
                    - generic [ref=e69]: .txt
                  - generic [ref=e70]: 80 B
                - button [ref=e71] [cursor=pointer]
                - generic [ref=e72]:
                  - button [ref=e73] [cursor=pointer]
                  - button [ref=e76] [cursor=pointer]
              - generic [ref=e80]:
                - generic [ref=e82]:
                  - generic [ref=e83]:
                    - generic [ref=e84]: 课堂观察数据
                    - generic [ref=e85]: .csv
                  - generic [ref=e86]: 66 B
                - button [ref=e87] [cursor=pointer]
                - generic [ref=e88]:
                  - button [ref=e89] [cursor=pointer]
                  - button [ref=e92] [cursor=pointer]
              - generic [ref=e96]:
                - generic [ref=e98]:
                  - generic [ref=e99]:
                    - generic [ref=e100]: 小组讨论记录
                    - generic [ref=e101]: .md
                  - generic [ref=e102]: 103 B
                - button [ref=e103] [cursor=pointer]
                - generic [ref=e104]:
                  - button [ref=e105] [cursor=pointer]
                  - button [ref=e108] [cursor=pointer]
              - generic [ref=e112]:
                - generic [ref=e114]:
                  - generic [ref=e115]:
                    - generic [ref=e116]: 课堂问题清单
                    - generic [ref=e117]: .json
                  - generic [ref=e118]: 91 B
                - button [ref=e119] [cursor=pointer]
                - generic [ref=e120]:
                  - button [ref=e121] [cursor=pointer]
                  - button [ref=e124] [cursor=pointer]
              - generic [ref=e128]:
                - generic [ref=e131]:
                  - generic [ref=e132]:
                    - generic [ref=e133]: 课程封面
                    - generic [ref=e134]: .png
                  - generic [ref=e135]: 1 MB
                - button [ref=e136] [cursor=pointer]
                - generic [ref=e137]:
                  - button [ref=e138] [cursor=pointer]
                  - button [ref=e141] [cursor=pointer]
            - generic [ref=e144]:
              - generic [ref=e145]: 当前显示 6 / 24 个附件
              - button [ref=e146] [cursor=pointer]:
                - generic [ref=e147]: 展开全部 24 个
          - region [ref=e148]:
            - generic [ref=e149]:
              - generic [ref=e150]:
                - heading [level=3] [ref=e151]: 发布课程消息
                - paragraph [ref=e152]: 紧凑附件 · 草稿中的文件可直接移除
              - button [ref=e153] [cursor=pointer]:
                - generic [ref=e154]: 恢复草稿示例
            - generic [ref=e155]:
              - generic [ref=e156]:
                - generic [ref=e158]:
                  - generic [ref=e159]:
                    - status [ref=e160]:
                      - generic [ref=e161]: 共 12 个
                      - generic [ref=e162]: · 12 个已上传
                    - button [ref=e163] [cursor=pointer]:
                      - generic [ref=e164]: 查看全部 12 个
                  - generic [ref=e166]:
                    - generic [ref=e168]:
                      - generic [ref=e171]:
                        - generic [ref=e172]: 课程导读
                        - generic [ref=e173]: .pdf
                      - button [ref=e174] [cursor=pointer]
                      - button [ref=e176] [cursor=pointer]
                    - generic [ref=e180]:
                      - generic [ref=e183]:
                        - generic [ref=e184]: 课堂讲义
                        - generic [ref=e185]: .txt
                      - button [ref=e186] [cursor=pointer]
                      - button [ref=e188] [cursor=pointer]
                - textbox [ref=e191]: 这是一组本周课程资料，请结合课堂笔记阅读。
                - generic [ref=e193]:
                  - group [ref=e194]:
                    - generic [ref=e195]:
                      - button [ref=e196] [cursor=pointer]:
                        - generic [ref=e197]: 添加草稿附件
                      - status [ref=e198]: 或将文件拖到这里。
                  - button [ref=e199] [cursor=pointer]:
                    - generic [ref=e200]: 发送到本页
              - paragraph [ref=e201]: 仅在本页回显消息；此演示等待当前附件上传完成后发送，不提交真实课程消息。
          - region [ref=e202]:
            - generic [ref=e203]:
              - generic [ref=e204]:
                - heading [level=3] [ref=e205]: 集中管理附件
                - paragraph [ref=e206]: 弹窗内滚动列表，底部操作保持可见。
              - button [expanded] [ref=e207] [cursor=pointer]:
                - generic [ref=e208]: 打开附件弹窗
            - paragraph [ref=e209]: 当前有 24 个附件。关闭和重新打开不会重置文件；上传结果只保留在本页。
          - region [ref=e210]:
            - generic [ref=e211]:
              - generic [ref=e212]:
                - heading [level=3] [ref=e213]: 图片与视频
                - paragraph [ref=e214]: 内容缩略图 · 文件名和操作留在画面下方
              - button [ref=e215] [cursor=pointer]:
                - generic [ref=e216]: 恢复媒体示例
            - group [ref=e217]:
              - generic [ref=e218]:
                - button [ref=e219] [cursor=pointer]:
                  - generic [ref=e220]: 添加图片或视频
                - status [ref=e221]: 或将文件拖到这里。
            - status [ref=e223]:
              - generic [ref=e224]: 共 12 个
              - generic [ref=e225]: · 12 个已上传
            - generic [ref=e227]:
              - generic [ref=e229]:
                - generic [ref=e232]:
                  - generic [ref=e233]:
                    - generic [ref=e234]: 课堂板书
                    - generic [ref=e235]: .png
                  - generic [ref=e236]: 大小未知
                - button [ref=e237] [cursor=pointer]
                - generic [ref=e238]:
                  - button [ref=e239] [cursor=pointer]
                  - button [ref=e242] [cursor=pointer]
              - generic [ref=e246]:
                - generic [ref=e251]:
                  - generic [ref=e252]:
                    - generic [ref=e253]: 课堂演示
                    - generic [ref=e254]: .mp4
                  - generic [ref=e255]: 207.3 KB
                - button [ref=e256] [cursor=pointer]
                - generic [ref=e257]:
                  - button [ref=e258] [cursor=pointer]
                  - button [ref=e261] [cursor=pointer]
              - generic [ref=e265]:
                - generic [ref=e268]:
                  - generic [ref=e269]:
                    - generic [ref=e270]: 分组讨论
                    - generic [ref=e271]: .png
                  - generic [ref=e272]: 大小未知
                - button [ref=e273] [cursor=pointer]
                - generic [ref=e274]:
                  - button [ref=e275] [cursor=pointer]
                  - button [ref=e278] [cursor=pointer]
              - generic [ref=e282]:
                - generic [ref=e287]:
                  - generic [ref=e288]:
                    - generic [ref=e289]: 实验过程
                    - generic [ref=e290]: .mp4
                  - generic [ref=e291]: 207.3 KB
                - button [ref=e292] [cursor=pointer]
                - generic [ref=e293]:
                  - button [ref=e294] [cursor=pointer]
                  - button [ref=e297] [cursor=pointer]
              - generic [ref=e301]:
                - generic [ref=e304]:
                  - generic [ref=e305]:
                    - generic [ref=e306]: 实验装置
                    - generic [ref=e307]: .png
                  - generic [ref=e308]: 大小未知
                - button [ref=e309] [cursor=pointer]
                - generic [ref=e310]:
                  - button [ref=e311] [cursor=pointer]
                  - button [ref=e314] [cursor=pointer]
              - generic [ref=e318]:
                - generic [ref=e321]:
                  - generic [ref=e322]:
                    - generic [ref=e323]: 课堂讲授
                    - generic [ref=e324]: .png
                  - generic [ref=e325]: 大小未知
                - button [ref=e326] [cursor=pointer]
                - generic [ref=e327]:
                  - button [ref=e328] [cursor=pointer]
                  - button [ref=e331] [cursor=pointer]
              - generic [ref=e335]:
                - generic [ref=e338]:
                  - generic [ref=e339]:
                    - generic [ref=e340]: 自主阅读
                    - generic [ref=e341]: .png
                  - generic [ref=e342]: 大小未知
                - button [ref=e343] [cursor=pointer]
                - generic [ref=e344]:
                  - button [ref=e345] [cursor=pointer]
                  - button [ref=e348] [cursor=pointer]
              - generic [ref=e352]:
                - generic [ref=e355]:
                  - generic [ref=e356]:
                    - generic [ref=e357]: 课堂协作
                    - generic [ref=e358]: .png
                  - generic [ref=e359]: 大小未知
                - button [ref=e360] [cursor=pointer]
                - generic [ref=e361]:
                  - button [ref=e362] [cursor=pointer]
                  - button [ref=e365] [cursor=pointer]
            - generic [ref=e368]:
              - generic [ref=e369]: 当前显示 8 / 12 个附件
              - button [ref=e370] [cursor=pointer]:
                - generic [ref=e371]: 展开全部 12 个
            - paragraph [ref=e372]: 图片为 AI 生成的教学情境示意，视频为示意图制作的短片；多个视频条目复用同一个演示文件。
      - generic [ref=e373]:
        - heading [level=2] [ref=e374]: 课程附件工作流
        - paragraph [ref=e375]: 选择或拖入真实文件，查看预览与下载，再试试取消、失败重试、替换及只读查看。
        - generic [ref=e377]:
          - paragraph [ref=e378]: 本地演示：选择、预览和下载使用真实文件；上传与保存仅在本页模拟，不向服务器传输。刷新后恢复示例。
          - group [ref=e379]:
            - generic [ref=e380] [cursor=pointer]: 演示选项
          - form [ref=e381]:
            - group [ref=e382]:
              - generic [ref=e383]:
                - button [ref=e384] [cursor=pointer]:
                  - generic [ref=e385]: 添加附件
                - status [ref=e386]: 或将文件拖到这里。
              - generic [ref=e387]: 支持 PDF、常见图片、文档、表格、演示文稿、TXT 和 ZIP。最多 8 个，每个不超过 10 MB，合计不超过 25 MB；不接收空文件和重复文件。
            - generic [ref=e389]:
              - generic [ref=e391]:
                - generic [ref=e393]:
                  - generic [ref=e394]:
                    - generic [ref=e395]: 课程导读：从问题到证据
                    - generic [ref=e396]: .pdf
                  - generic [ref=e397]: 965 B
                - button [ref=e398] [cursor=pointer]
                - generic [ref=e399]:
                  - button [ref=e400] [cursor=pointer]
                  - button [ref=e403] [cursor=pointer]
              - generic [ref=e407]:
                - generic [ref=e410]:
                  - generic [ref=e411]:
                    - generic [ref=e412]: 高等数学课程封面
                    - generic [ref=e413]: .png
                  - generic [ref=e414]: 1 MB
                - button [ref=e415] [cursor=pointer]
                - generic [ref=e416]:
                  - button [ref=e417] [cursor=pointer]
                  - button [ref=e420] [cursor=pointer]
              - generic [ref=e424]:
                - generic [ref=e426]:
                  - generic [ref=e427]:
                    - generic [ref=e428]: 课堂观察记录与同伴反馈说明
                    - generic [ref=e429]: .txt
                  - generic [ref=e430]: 341 B
                - button [ref=e431] [cursor=pointer]
                - generic [ref=e432]:
                  - button [ref=e433] [cursor=pointer]
                  - button [ref=e436] [cursor=pointer]
            - generic [ref=e439]:
              - status [ref=e440]: 3 / 8 个附件 · 合计 1 MB / 25 MB。附件已就绪，可保存。
              - generic [ref=e441]:
                - button [ref=e442] [cursor=pointer]:
                  - generic [ref=e443]: 保存附件
                - button [ref=e444] [cursor=pointer]:
                  - generic [ref=e445]: 恢复示例
          - group [ref=e446]:
            - generic [ref=e447] [cursor=pointer]: 权限与失效示例
      - generic [ref=e448]:
        - heading [level=2] [ref=e449]: 文件与任务状态
        - paragraph [ref=e450]: 白底和浅灰底使用相同结构；文件身份、上传状态与关联任务分别表达。
        - generic [ref=e452]:
          - generic [ref=e453]:
            - paragraph [ref=e454]: 两列共享同一组示例状态。除课程导读的真实 PDF 外，文件信息、上传、字幕、报告和审核均为本页演示。
            - button [ref=e455] [cursor=pointer]:
              - generic [ref=e456]: 恢复示例
          - generic [ref=e457]:
            - region [ref=e458]:
              - heading [level=3] [ref=e459]: 白底 · 浅描边
              - generic [ref=e460]:
                - group [ref=e461]:
                  - generic [ref=e462]:
                    - generic [ref=e464]:
                      - generic [ref=e465]:
                        - generic [ref=e466]: 课程导读：从问题到证据
                        - generic [ref=e467]: .pdf
                      - generic [ref=e468]: 965 B
                    - button [ref=e469] [cursor=pointer]
                    - generic [ref=e471]:
                      - button [ref=e472] [cursor=pointer]
                      - button [ref=e475] [cursor=pointer]
                - group [ref=e478]:
                  - generic [ref=e479]:
                    - generic [ref=e481]:
                      - generic [ref=e482]:
                        - generic [ref=e483]: 课堂录像
                        - generic [ref=e484]: .mp4
                      - generic [ref=e486]:
                        - progressbar [ref=e487]: x
                        - generic [ref=e490]: 42%
                    - button [disabled] [ref=e491]
                    - button [ref=e494] [cursor=pointer]:
                      - generic [ref=e495]: 取消
                - group [ref=e496]:
                  - generic [ref=e497]:
                    - generic [ref=e499]:
                      - generic [ref=e500]:
                        - generic [ref=e501]: 课堂录音
                        - generic [ref=e502]: .mp3
                      - generic [ref=e503]: 4.6 MB · 上传失败
                    - button [disabled] [ref=e504]
                    - generic [ref=e507]:
                      - button [ref=e508] [cursor=pointer]:
                        - generic [ref=e509]: 重试
                      - button [ref=e510] [cursor=pointer]
                - group [ref=e513]:
                  - generic [ref=e514]:
                    - generic [ref=e516]:
                      - generic [ref=e517]:
                        - generic [ref=e518]: 研究论文
                        - generic [ref=e519]: .pdf
                      - generic [ref=e520]: 1.8 MB · 检测报告未读
                    - button [ref=e521] [cursor=pointer]
                    - generic [ref=e526]:
                      - button [ref=e527] [cursor=pointer]:
                        - generic [ref=e528]: 查看报告
                      - button [ref=e529] [cursor=pointer]
                - group [ref=e532]:
                  - generic [ref=e533]:
                    - generic [ref=e535]:
                      - generic [ref=e536]:
                        - generic [ref=e537]: 授课录像
                        - generic [ref=e538]: .mp4
                      - generic [ref=e539]: 64 MB
                    - button [ref=e540] [cursor=pointer]
                    - generic [ref=e542]:
                      - button [ref=e543] [cursor=pointer]
                      - button [ref=e546] [cursor=pointer]
                  - generic [ref=e549]:
                    - generic [ref=e553]:
                      - text: 字幕生成失败
                      - paragraph [ref=e554]: 原视频状态正常 · 播放、下载为示例
                    - button [ref=e555] [cursor=pointer]:
                      - generic [ref=e556]: 重试字幕
                - group [ref=e557]:
                  - generic [ref=e558]:
                    - generic [ref=e560]:
                      - generic [ref=e561]:
                        - generic [ref=e562]: 设备申请
                        - generic [ref=e563]: .pdf
                      - generic [ref=e564]: 860 KB · 关联申请待你审核
                    - button [ref=e565] [cursor=pointer]
                    - generic [ref=e568]:
                      - button [ref=e569] [cursor=pointer]:
                        - generic [ref=e570]: 去审核
                      - button [ref=e571] [cursor=pointer]
                - group [ref=e574]:
                  - generic [ref=e575]:
                    - generic [ref=e577]:
                      - generic [ref=e578]:
                        - generic [ref=e579]: 课堂资料
                        - generic [ref=e580]: .pdf
                      - generic [ref=e581]: 2.1 MB · 禁止下载
                    - button [ref=e582] [cursor=pointer]
                    - generic [ref=e585]:
                      - button [ref=e586] [cursor=pointer]:
                        - generic [ref=e587]: 预览
                      - button [ref=e588] [cursor=pointer]
            - region [ref=e591]:
              - heading [level=3] [ref=e592]: 浅灰底
              - generic [ref=e593]:
                - group [ref=e594]:
                  - generic [ref=e595]:
                    - generic [ref=e597]:
                      - generic [ref=e598]:
                        - generic [ref=e599]: 课程导读：从问题到证据
                        - generic [ref=e600]: .pdf
                      - generic [ref=e601]: 965 B
                    - button [ref=e602] [cursor=pointer]
                    - generic [ref=e604]:
                      - button [ref=e605] [cursor=pointer]
                      - button [ref=e608] [cursor=pointer]
                - group [ref=e611]:
                  - generic [ref=e612]:
                    - generic [ref=e614]:
                      - generic [ref=e615]:
                        - generic [ref=e616]: 课堂录像
                        - generic [ref=e617]: .mp4
                      - generic [ref=e619]:
                        - progressbar [ref=e620]: x
                        - generic [ref=e623]: 42%
                    - button [disabled] [ref=e624]
                    - button [ref=e627] [cursor=pointer]:
                      - generic [ref=e628]: 取消
                - group [ref=e629]:
                  - generic [ref=e630]:
                    - generic [ref=e632]:
                      - generic [ref=e633]:
                        - generic [ref=e634]: 课堂录音
                        - generic [ref=e635]: .mp3
                      - generic [ref=e636]: 4.6 MB · 上传失败
                    - button [disabled] [ref=e637]
                    - generic [ref=e640]:
                      - button [ref=e641] [cursor=pointer]:
                        - generic [ref=e642]: 重试
                      - button [ref=e643] [cursor=pointer]
                - group [ref=e646]:
                  - generic [ref=e647]:
                    - generic [ref=e649]:
                      - generic [ref=e650]:
                        - generic [ref=e651]: 研究论文
                        - generic [ref=e652]: .pdf
                      - generic [ref=e653]: 1.8 MB · 检测报告未读
                    - button [ref=e654] [cursor=pointer]
                    - generic [ref=e659]:
                      - button [ref=e660] [cursor=pointer]:
                        - generic [ref=e661]: 查看报告
                      - button [ref=e662] [cursor=pointer]
                - group [ref=e665]:
                  - generic [ref=e666]:
                    - generic [ref=e668]:
                      - generic [ref=e669]:
                        - generic [ref=e670]: 授课录像
                        - generic [ref=e671]: .mp4
                      - generic [ref=e672]: 64 MB
                    - button [ref=e673] [cursor=pointer]
                    - generic [ref=e675]:
                      - button [ref=e676] [cursor=pointer]
                      - button [ref=e679] [cursor=pointer]
                  - generic [ref=e682]:
                    - generic [ref=e686]:
                      - text: 字幕生成失败
                      - paragraph [ref=e687]: 原视频状态正常 · 播放、下载为示例
                    - button [ref=e688] [cursor=pointer]:
                      - generic [ref=e689]: 重试字幕
                - group [ref=e690]:
                  - generic [ref=e691]:
                    - generic [ref=e693]:
                      - generic [ref=e694]:
                        - generic [ref=e695]: 设备申请
                        - generic [ref=e696]: .pdf
                      - generic [ref=e697]: 860 KB · 关联申请待你审核
                    - button [ref=e698] [cursor=pointer]
                    - generic [ref=e701]:
                      - button [ref=e702] [cursor=pointer]:
                        - generic [ref=e703]: 去审核
                      - button [ref=e704] [cursor=pointer]
                - group [ref=e707]:
                  - generic [ref=e708]:
                    - generic [ref=e710]:
                      - generic [ref=e711]:
                        - generic [ref=e712]: 课堂资料
                        - generic [ref=e713]: .pdf
                      - generic [ref=e714]: 2.1 MB · 禁止下载
                    - button [ref=e715] [cursor=pointer]
                    - generic [ref=e718]:
                      - button [ref=e719] [cursor=pointer]:
                        - generic [ref=e720]: 预览
                      - button [ref=e721] [cursor=pointer]
      - generic [ref=e724]:
        - heading [level=2] [ref=e725]: 完整五态
        - paragraph [ref=e726]: 处理中保留可读文字和动态提示；失败同时使用文字和图标。
        - group [ref=e728]:
          - generic [ref=e731]:
            - generic [ref=e732]: idle.pdf
            - generic [ref=e733]: 等待上传
          - generic [ref=e736]:
            - generic [ref=e737]: uploading.pdf
            - generic [ref=e738]: 正在上传
          - generic [ref=e741]:
            - generic [ref=e742]: processing.pdf
            - generic [ref=e743]: 正在处理
          - generic [ref=e746]:
            - generic [ref=e747]: error.pdf
            - generic [ref=e748]: 上传失败，请重试
          - generic [ref=e751]:
            - generic [ref=e752]: done.pdf
            - generic [ref=e753]: 已上传 · 1.8 MB
      - generic [ref=e754]:
        - heading [level=2] [ref=e755]: 三档尺寸与竖排媒体
        - generic [ref=e756]:
          - generic [ref=e757]:
            - generic [ref=e760]:
              - generic [ref=e761]: 课程资料.pdf
              - generic [ref=e762]: default · PDF
            - generic [ref=e765]:
              - generic [ref=e766]: 课程资料.pdf
              - generic [ref=e767]: sm · PDF
            - generic [ref=e770]:
              - generic [ref=e771]: 课程资料.pdf
              - generic [ref=e772]: xs · PDF
          - generic [ref=e773]:
            - img [ref=e775]:
              - generic [ref=e776]:
                - generic [ref=e777]: 课堂观察 · 第 04 讲
                - strong [ref=e778]: 从问题到证据
                - generic [ref=e779]: 观察 · 记录 · 讨论
            - generic [ref=e780]:
              - generic [ref=e781]: 课程封面
              - generic [ref=e782]: 预览占位
    - region [ref=e783]:
      - heading [level=2] [ref=e784]: 使用边界
      - generic [ref=e785]:
        - generic [ref=e786]:
          - heading [level=3] [ref=e787]: 适合用在
          - list [ref=e788]:
            - listitem [ref=e789]: 表单、消息或资料区需要展示文件和处理状态。
            - listitem [ref=e790]: 课程附件需要选择、校验、上传、预览、下载或替换。
        - generic [ref=e791]:
          - heading [level=3] [ref=e792]: 避免用在
          - list [ref=e793]:
            - listitem [ref=e794]: 把前端校验和操作显隐当作服务器权限或安全校验。
            - listitem [ref=e795]: 把整卡按钮与移除按钮做成嵌套按钮。
    - generic [ref=e796]:
      - region [ref=e797]:
        - heading [level=2] [ref=e798]: API 与结构
        - table [ref=e800]:
          - caption [ref=e801]: Attachment 文件附件 常用接口
          - rowgroup [ref=e802]:
            - row [ref=e803]:
              - columnheader [ref=e804]: 名称
              - columnheader [ref=e805]: 类型
              - columnheader [ref=e806]: 默认
              - columnheader [ref=e807]: 说明
          - rowgroup [ref=e808]:
            - row [ref=e809]:
              - rowheader [ref=e810]:
                - code [ref=e811]: useAttachmentUpload
              - cell [ref=e812]:
                - code [ref=e813]: items / constraints / upload / readOnly
              - cell [ref=e814]: —
              - cell [ref=e815]: 管理文件选择、校验、上传、取消和重试；上传适配器由宿主提供。
            - row [ref=e816]:
              - rowheader [ref=e817]:
                - code [ref=e818]: AttachmentList
              - cell [ref=e819]:
                - code [ref=e820]: items / surface / readOnly
              - cell [ref=e821]: —
              - cell [ref=e822]: outlined / filled 两种表面；下载主操作与更多菜单遵循独立权限。
            - row [ref=e823]:
              - rowheader [ref=e824]:
                - code [ref=e825]: AttachmentList size
              - cell [ref=e826]:
                - code [ref=e827]: default / sm
              - cell [ref=e828]: default
              - cell [ref=e829]: 普通附件行与紧凑草稿卡；不改变底层 Attachment 的三档尺寸。
            - row [ref=e830]:
              - rowheader [ref=e831]:
                - code [ref=e832]: AttachmentList orientation / layout
              - cell [ref=e833]:
                - code [ref=e834]: horizontal / vertical；list / wrap / grid
              - cell [ref=e835]: horizontal / list
              - cell [ref=e836]: 卡片内部方向与集合排列独立；折叠、总数和重试范围由宿主控制。
            - row [ref=e837]:
              - rowheader [ref=e838]:
                - code [ref=e839]: AttachmentList actions
              - cell [ref=e840]:
                - code [ref=e841]: default / draft
              - cell [ref=e842]: default
              - cell [ref=e843]: 常规查看下载操作，或草稿中的直接移除。
            - row [ref=e844]:
              - rowheader [ref=e845]:
                - code [ref=e846]: Attachment state
              - cell [ref=e847]:
                - code [ref=e848]: idle / uploading / processing / error / done
              - cell [ref=e849]: done
              - cell [ref=e850]: 底层附件的五种显示状态。
            - row [ref=e851]:
              - rowheader [ref=e852]:
                - code [ref=e853]: Attachment size
              - cell [ref=e854]:
                - code [ref=e855]: default / sm / xs
              - cell [ref=e856]: default
              - cell [ref=e857]: 三档源码尺寸，显式 size 不再次被密度缩放。
        - paragraph [ref=e858]: Parts / Slots：AttachmentPicker、AttachmentList、AttachmentPreview、useAttachmentUpload、Attachment、Group、Media、Content、Title、Description、Actions、Action、Trigger
      - region [ref=e859]:
        - heading [level=2] [ref=e860]: 调用示例
        - generic [ref=e861]:
          - button [ref=e863] [cursor=pointer]:
            - generic [ref=e864]: 复制代码
          - code [ref=e866]: "const attachments = useAttachmentUpload({ initialItems, constraints: { maxFiles: 8, maxFileSize: 10 * 1024 * 1024 }, upload: uploadFile, }); <AttachmentPicker onFiles={files => { attachments.addFiles(files); }} /> <AttachmentList items={attachments.items} onStart={item => { void attachments.start(item.id); }} onRetry={item => { void attachments.retry(item.id); }} onCancel={item => attachments.cancel(item.id)} onRemove={item => attachments.remove(item.id)} onReplace={(item, file) => { attachments.replaceFile(item.id, file); }} /> <Button disabled={!attachments.summary.canSubmit}>保存附件</Button>"
        - paragraph [ref=e867]:
          - text: 当前源码：
          - code [ref=e868]: packages/ui/src/attachment-workflow/index.ts
  - dialog [ref=e872]:
    - generic [ref=e873]:
      - generic [ref=e874]:
        - heading "本次附件" [level=2] [ref=e875]
        - paragraph [ref=e876]: 关闭视图后保留本页内容，上传可以继续。
        - status [ref=e877]:
          - generic [ref=e878]: 共 24 个
          - generic [ref=e879]: · 24 个已上传
        - generic [ref=e880]:
          - group "添加弹窗附件" [ref=e881]:
            - generic [ref=e882]:
              - button "添加弹窗附件" [active] [ref=e883] [cursor=pointer]
              - status [ref=e885]: 或将文件拖到这里。
          - generic [ref=e886]:
            - button "演示上传" [ref=e887] [cursor=pointer]
            - button "恢复弹窗示例" [ref=e889] [cursor=pointer]
      - generic [ref=e893]:
        - generic [ref=e895]:
          - generic [ref=e897]:
            - generic "课程导读.pdf" [ref=e898]:
              - generic [ref=e899]: 课程导读
              - generic [ref=e900]: .pdf
            - generic [ref=e901]: 965 B
          - button "预览 课程导读.pdf" [ref=e902] [cursor=pointer]
          - generic [ref=e903]:
            - button "下载 课程导读.pdf" [ref=e904] [cursor=pointer]
            - button "更多操作 课程导读.pdf" [ref=e907] [cursor=pointer]
        - generic [ref=e911]:
          - generic [ref=e913]:
            - generic "课堂讲义.txt" [ref=e914]:
              - generic [ref=e915]: 课堂讲义
              - generic [ref=e916]: .txt
            - generic [ref=e917]: 80 B
          - button "预览 课堂讲义.txt" [ref=e918] [cursor=pointer]
          - generic [ref=e919]:
            - button "下载 课堂讲义.txt" [ref=e920] [cursor=pointer]
            - button "更多操作 课堂讲义.txt" [ref=e923] [cursor=pointer]
        - generic [ref=e927]:
          - generic [ref=e929]:
            - generic "课堂观察数据.csv" [ref=e930]:
              - generic [ref=e931]: 课堂观察数据
              - generic [ref=e932]: .csv
            - generic [ref=e933]: 66 B
          - button "预览 课堂观察数据.csv" [ref=e934] [cursor=pointer]
          - generic [ref=e935]:
            - button "下载 课堂观察数据.csv" [ref=e936] [cursor=pointer]
            - button "更多操作 课堂观察数据.csv" [ref=e939] [cursor=pointer]
        - generic [ref=e943]:
          - generic [ref=e945]:
            - generic "小组讨论记录.md" [ref=e946]:
              - generic [ref=e947]: 小组讨论记录
              - generic [ref=e948]: .md
            - generic [ref=e949]: 103 B
          - button "预览 小组讨论记录.md" [ref=e950] [cursor=pointer]
          - generic [ref=e951]:
            - button "下载 小组讨论记录.md" [ref=e952] [cursor=pointer]
            - button "更多操作 小组讨论记录.md" [ref=e955] [cursor=pointer]
        - generic [ref=e959]:
          - generic [ref=e961]:
            - generic "课堂问题清单.json" [ref=e962]:
              - generic [ref=e963]: 课堂问题清单
              - generic [ref=e964]: .json
            - generic [ref=e965]: 91 B
          - button "预览 课堂问题清单.json" [ref=e966] [cursor=pointer]
          - generic [ref=e967]:
            - button "下载 课堂问题清单.json" [ref=e968] [cursor=pointer]
            - button "更多操作 课堂问题清单.json" [ref=e971] [cursor=pointer]
        - generic [ref=e975]:
          - img "缩略图 课程封面.png" [ref=e977]
          - generic [ref=e978]:
            - generic "课程封面.png" [ref=e979]:
              - generic [ref=e980]: 课程封面
              - generic [ref=e981]: .png
            - generic [ref=e982]: 1 MB
          - button "预览 课程封面.png" [ref=e983] [cursor=pointer]
          - generic [ref=e984]:
            - button "下载 课程封面.png" [ref=e985] [cursor=pointer]
            - button "更多操作 课程封面.png" [ref=e988] [cursor=pointer]
        - generic [ref=e992]:
          - generic [ref=e994]:
            - generic "补充阅读与问题记录.txt" [ref=e995]:
              - generic [ref=e996]: 补充阅读与问题记录
              - generic [ref=e997]: .txt
            - generic [ref=e998]: 89 B
          - button "预览 补充阅读与问题记录.txt" [ref=e999] [cursor=pointer]
          - generic [ref=e1000]:
            - button "下载 补充阅读与问题记录.txt" [ref=e1001] [cursor=pointer]
            - button "更多操作 补充阅读与问题记录.txt" [ref=e1004] [cursor=pointer]
        - generic [ref=e1008]:
          - generic [ref=e1010]:
            - generic "阶段学习记录.csv" [ref=e1011]:
              - generic [ref=e1012]: 阶段学习记录
              - generic [ref=e1013]: .csv
            - generic [ref=e1014]: 77 B
          - button "预览 阶段学习记录.csv" [ref=e1015] [cursor=pointer]
          - generic [ref=e1016]:
            - button "下载 阶段学习记录.csv" [ref=e1017] [cursor=pointer]
            - button "更多操作 阶段学习记录.csv" [ref=e1020] [cursor=pointer]
        - generic [ref=e1024]:
          - generic [ref=e1026]:
            - generic "课程导读（第 2 周）.pdf" [ref=e1027]:
              - generic [ref=e1028]: 课程导读（第 2 周）
              - generic [ref=e1029]: .pdf
            - generic [ref=e1030]: 965 B
          - button "预览 课程导读（第 2 周）.pdf" [ref=e1031] [cursor=pointer]
          - generic [ref=e1032]:
            - button "下载 课程导读（第 2 周）.pdf" [ref=e1033] [cursor=pointer]
            - button "更多操作 课程导读（第 2 周）.pdf" [ref=e1036] [cursor=pointer]
        - generic [ref=e1040]:
          - generic [ref=e1042]:
            - generic "课堂讲义（第 2 周）.txt" [ref=e1043]:
              - generic [ref=e1044]: 课堂讲义（第 2 周）
              - generic [ref=e1045]: .txt
            - generic [ref=e1046]: 80 B
          - button "预览 课堂讲义（第 2 周）.txt" [ref=e1047] [cursor=pointer]
          - generic [ref=e1048]:
            - button "下载 课堂讲义（第 2 周）.txt" [ref=e1049] [cursor=pointer]
            - button "更多操作 课堂讲义（第 2 周）.txt" [ref=e1052] [cursor=pointer]
        - generic [ref=e1056]:
          - generic [ref=e1058]:
            - generic "课堂观察数据（第 2 周）.csv" [ref=e1059]:
              - generic [ref=e1060]: 课堂观察数据（第 2 周）
              - generic [ref=e1061]: .csv
            - generic [ref=e1062]: 66 B
          - button "预览 课堂观察数据（第 2 周）.csv" [ref=e1063] [cursor=pointer]
          - generic [ref=e1064]:
            - button "下载 课堂观察数据（第 2 周）.csv" [ref=e1065] [cursor=pointer]
            - button "更多操作 课堂观察数据（第 2 周）.csv" [ref=e1068] [cursor=pointer]
        - generic [ref=e1072]:
          - generic [ref=e1074]:
            - generic "小组讨论记录（第 2 周）.md" [ref=e1075]:
              - generic [ref=e1076]: 小组讨论记录（第 2 周）
              - generic [ref=e1077]: .md
            - generic [ref=e1078]: 103 B
          - button "预览 小组讨论记录（第 2 周）.md" [ref=e1079] [cursor=pointer]
          - generic [ref=e1080]:
            - button "下载 小组讨论记录（第 2 周）.md" [ref=e1081] [cursor=pointer]
            - button "更多操作 小组讨论记录（第 2 周）.md" [ref=e1084] [cursor=pointer]
        - generic [ref=e1088]:
          - generic [ref=e1090]:
            - generic "课堂问题清单（第 2 周）.json" [ref=e1091]:
              - generic [ref=e1092]: 课堂问题清单（第 2 周）
              - generic [ref=e1093]: .json
            - generic [ref=e1094]: 91 B
          - button "预览 课堂问题清单（第 2 周）.json" [ref=e1095] [cursor=pointer]
          - generic [ref=e1096]:
            - button "下载 课堂问题清单（第 2 周）.json" [ref=e1097] [cursor=pointer]
            - button "更多操作 课堂问题清单（第 2 周）.json" [ref=e1100] [cursor=pointer]
        - generic [ref=e1104]:
          - img "缩略图 课程封面（第 2 周）.png" [ref=e1106]
          - generic [ref=e1107]:
            - generic "课程封面（第 2 周）.png" [ref=e1108]:
              - generic [ref=e1109]: 课程封面（第 2 周）
              - generic [ref=e1110]: .png
            - generic [ref=e1111]: 1 MB
          - button "预览 课程封面（第 2 周）.png" [ref=e1112] [cursor=pointer]
          - generic [ref=e1113]:
            - button "下载 课程封面（第 2 周）.png" [ref=e1114] [cursor=pointer]
            - button "更多操作 课程封面（第 2 周）.png" [ref=e1117] [cursor=pointer]
        - generic [ref=e1121]:
          - generic [ref=e1123]:
            - generic "补充阅读与问题记录（第 2 周）.txt" [ref=e1124]:
              - generic [ref=e1125]: 补充阅读与问题记录（第 2 周）
              - generic [ref=e1126]: .txt
            - generic [ref=e1127]: 89 B
          - button "预览 补充阅读与问题记录（第 2 周）.txt" [ref=e1128] [cursor=pointer]
          - generic [ref=e1129]:
            - button "下载 补充阅读与问题记录（第 2 周）.txt" [ref=e1130] [cursor=pointer]
            - button "更多操作 补充阅读与问题记录（第 2 周）.txt" [ref=e1133] [cursor=pointer]
        - generic [ref=e1137]:
          - generic [ref=e1139]:
            - generic "阶段学习记录（第 2 周）.csv" [ref=e1140]:
              - generic [ref=e1141]: 阶段学习记录（第 2 周）
              - generic [ref=e1142]: .csv
            - generic [ref=e1143]: 77 B
          - button "预览 阶段学习记录（第 2 周）.csv" [ref=e1144] [cursor=pointer]
          - generic [ref=e1145]:
            - button "下载 阶段学习记录（第 2 周）.csv" [ref=e1146] [cursor=pointer]
            - button "更多操作 阶段学习记录（第 2 周）.csv" [ref=e1149] [cursor=pointer]
        - generic [ref=e1153]:
          - generic [ref=e1155]:
            - generic "课程导读（第 3 周）.pdf" [ref=e1156]:
              - generic [ref=e1157]: 课程导读（第 3 周）
              - generic [ref=e1158]: .pdf
            - generic [ref=e1159]: 965 B
          - button "预览 课程导读（第 3 周）.pdf" [ref=e1160] [cursor=pointer]
          - generic [ref=e1161]:
            - button "下载 课程导读（第 3 周）.pdf" [ref=e1162] [cursor=pointer]
            - button "更多操作 课程导读（第 3 周）.pdf" [ref=e1165] [cursor=pointer]
        - generic [ref=e1169]:
          - generic [ref=e1171]:
            - generic "课堂讲义（第 3 周）.txt" [ref=e1172]:
              - generic [ref=e1173]: 课堂讲义（第 3 周）
              - generic [ref=e1174]: .txt
            - generic [ref=e1175]: 80 B
          - button "预览 课堂讲义（第 3 周）.txt" [ref=e1176] [cursor=pointer]
          - generic [ref=e1177]:
            - button "下载 课堂讲义（第 3 周）.txt" [ref=e1178] [cursor=pointer]
            - button "更多操作 课堂讲义（第 3 周）.txt" [ref=e1181] [cursor=pointer]
        - generic [ref=e1185]:
          - generic [ref=e1187]:
            - generic "课堂观察数据（第 3 周）.csv" [ref=e1188]:
              - generic [ref=e1189]: 课堂观察数据（第 3 周）
              - generic [ref=e1190]: .csv
            - generic [ref=e1191]: 66 B
          - button "预览 课堂观察数据（第 3 周）.csv" [ref=e1192] [cursor=pointer]
          - generic [ref=e1193]:
            - button "下载 课堂观察数据（第 3 周）.csv" [ref=e1194] [cursor=pointer]
            - button "更多操作 课堂观察数据（第 3 周）.csv" [ref=e1197] [cursor=pointer]
        - generic [ref=e1201]:
          - generic [ref=e1203]:
            - generic "小组讨论记录（第 3 周）.md" [ref=e1204]:
              - generic [ref=e1205]: 小组讨论记录（第 3 周）
              - generic [ref=e1206]: .md
            - generic [ref=e1207]: 103 B
          - button "预览 小组讨论记录（第 3 周）.md" [ref=e1208] [cursor=pointer]
          - generic [ref=e1209]:
            - button "下载 小组讨论记录（第 3 周）.md" [ref=e1210] [cursor=pointer]
            - button "更多操作 小组讨论记录（第 3 周）.md" [ref=e1213] [cursor=pointer]
        - generic [ref=e1217]:
          - generic [ref=e1219]:
            - generic "课堂问题清单（第 3 周）.json" [ref=e1220]:
              - generic [ref=e1221]: 课堂问题清单（第 3 周）
              - generic [ref=e1222]: .json
            - generic [ref=e1223]: 91 B
          - button "预览 课堂问题清单（第 3 周）.json" [ref=e1224] [cursor=pointer]
          - generic [ref=e1225]:
            - button "下载 课堂问题清单（第 3 周）.json" [ref=e1226] [cursor=pointer]
            - button "更多操作 课堂问题清单（第 3 周）.json" [ref=e1229] [cursor=pointer]
        - generic [ref=e1233]:
          - img "缩略图 课程封面（第 3 周）.png" [ref=e1235]
          - generic [ref=e1236]:
            - generic "课程封面（第 3 周）.png" [ref=e1237]:
              - generic [ref=e1238]: 课程封面（第 3 周）
              - generic [ref=e1239]: .png
            - generic [ref=e1240]: 1 MB
          - button "预览 课程封面（第 3 周）.png" [ref=e1241] [cursor=pointer]
          - generic [ref=e1242]:
            - button "下载 课程封面（第 3 周）.png" [ref=e1243] [cursor=pointer]
            - button "更多操作 课程封面（第 3 周）.png" [ref=e1246] [cursor=pointer]
        - generic [ref=e1250]:
          - generic [ref=e1252]:
            - generic "补充阅读与问题记录（第 3 周）.txt" [ref=e1253]:
              - generic [ref=e1254]: 补充阅读与问题记录（第 3 周）
              - generic [ref=e1255]: .txt
            - generic [ref=e1256]: 89 B
          - button "预览 补充阅读与问题记录（第 3 周）.txt" [ref=e1257] [cursor=pointer]
          - generic [ref=e1258]:
            - button "下载 补充阅读与问题记录（第 3 周）.txt" [ref=e1259] [cursor=pointer]
            - button "更多操作 补充阅读与问题记录（第 3 周）.txt" [ref=e1262] [cursor=pointer]
        - generic [ref=e1266]:
          - generic [ref=e1268]:
            - generic "阶段学习记录（第 3 周）.csv" [ref=e1269]:
              - generic [ref=e1270]: 阶段学习记录（第 3 周）
              - generic [ref=e1271]: .csv
            - generic [ref=e1272]: 77 B
          - button "预览 阶段学习记录（第 3 周）.csv" [ref=e1273] [cursor=pointer]
          - generic [ref=e1274]:
            - button "下载 阶段学习记录（第 3 周）.csv" [ref=e1275] [cursor=pointer]
            - button "更多操作 阶段学习记录（第 3 周）.csv" [ref=e1278] [cursor=pointer]
      - generic [ref=e1281]:
        - generic [ref=e1282]: 共 24 个附件
        - button "关闭附件弹窗" [ref=e1283] [cursor=pointer]:
          - generic [ref=e1284]: 关闭
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
  40  |   await scene.locator('input[type="file"]').setInputFiles({ name: fileName, mimeType: "text/plain", buffer: Buffer.from("scene draft actual bytes") });
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
> 59  |   expect(after!.y).toBe(before!.y);
      |                    ^ Error: expect(received).toBe(expected) // Object.is equality
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