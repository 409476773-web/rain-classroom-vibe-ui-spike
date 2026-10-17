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

Expected: 812.7678833007812
Received: 813.4481811523438
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
                    - generic [ref=e192]:
                      - generic [ref=e195]:
                        - generic [ref=e196]: 课堂观察数据
                        - generic [ref=e197]: .csv
                      - button [ref=e198] [cursor=pointer]
                      - button [ref=e200] [cursor=pointer]
                    - generic [ref=e204]:
                      - generic [ref=e207]:
                        - generic [ref=e208]: 小组讨论记录
                        - generic [ref=e209]: .md
                      - button [ref=e210] [cursor=pointer]
                      - button [ref=e212] [cursor=pointer]
                - textbox [ref=e215]: 这是一组本周课程资料，请结合课堂笔记阅读。
                - generic [ref=e217]:
                  - group [ref=e218]:
                    - generic [ref=e219]:
                      - button [ref=e220] [cursor=pointer]:
                        - generic [ref=e221]: 添加草稿附件
                      - status [ref=e222]: 或将文件拖到这里。
                  - button [ref=e223] [cursor=pointer]:
                    - generic [ref=e224]: 发送到本页
              - paragraph [ref=e225]: 仅在本页回显消息；此演示等待当前附件上传完成后发送，不提交真实课程消息。
          - region [ref=e226]:
            - generic [ref=e227]:
              - generic [ref=e228]:
                - heading [level=3] [ref=e229]: 集中管理附件
                - paragraph [ref=e230]: 弹窗内滚动列表，底部操作保持可见。
              - button [expanded] [ref=e231] [cursor=pointer]:
                - generic [ref=e232]: 打开附件弹窗
            - paragraph [ref=e233]: 当前有 24 个附件。关闭和重新打开不会重置文件；上传结果只保留在本页。
          - region [ref=e234]:
            - generic [ref=e235]:
              - generic [ref=e236]:
                - heading [level=3] [ref=e237]: 图片与视频
                - paragraph [ref=e238]: 内容缩略图 · 文件名和操作留在画面下方
              - button [ref=e239] [cursor=pointer]:
                - generic [ref=e240]: 恢复媒体示例
            - group [ref=e241]:
              - generic [ref=e242]:
                - button [ref=e243] [cursor=pointer]:
                  - generic [ref=e244]: 添加图片或视频
                - status [ref=e245]: 或将文件拖到这里。
            - status [ref=e247]:
              - generic [ref=e248]: 共 12 个
              - generic [ref=e249]: · 12 个已上传
            - generic [ref=e251]:
              - generic [ref=e253]:
                - generic [ref=e256]:
                  - generic [ref=e257]:
                    - generic [ref=e258]: 课堂板书
                    - generic [ref=e259]: .png
                  - generic [ref=e260]: 大小未知
                - button [ref=e261] [cursor=pointer]
                - generic [ref=e262]:
                  - button [ref=e263] [cursor=pointer]
                  - button [ref=e266] [cursor=pointer]
              - generic [ref=e270]:
                - generic [ref=e275]:
                  - generic [ref=e276]:
                    - generic [ref=e277]: 课堂演示
                    - generic [ref=e278]: .mp4
                  - generic [ref=e279]: 207.3 KB
                - button [ref=e280] [cursor=pointer]
                - generic [ref=e281]:
                  - button [ref=e282] [cursor=pointer]
                  - button [ref=e285] [cursor=pointer]
              - generic [ref=e289]:
                - generic [ref=e292]:
                  - generic [ref=e293]:
                    - generic [ref=e294]: 分组讨论
                    - generic [ref=e295]: .png
                  - generic [ref=e296]: 大小未知
                - button [ref=e297] [cursor=pointer]
                - generic [ref=e298]:
                  - button [ref=e299] [cursor=pointer]
                  - button [ref=e302] [cursor=pointer]
              - generic [ref=e306]:
                - generic [ref=e311]:
                  - generic [ref=e312]:
                    - generic [ref=e313]: 实验过程
                    - generic [ref=e314]: .mp4
                  - generic [ref=e315]: 207.3 KB
                - button [ref=e316] [cursor=pointer]
                - generic [ref=e317]:
                  - button [ref=e318] [cursor=pointer]
                  - button [ref=e321] [cursor=pointer]
              - generic [ref=e325]:
                - generic [ref=e328]:
                  - generic [ref=e329]:
                    - generic [ref=e330]: 实验装置
                    - generic [ref=e331]: .png
                  - generic [ref=e332]: 大小未知
                - button [ref=e333] [cursor=pointer]
                - generic [ref=e334]:
                  - button [ref=e335] [cursor=pointer]
                  - button [ref=e338] [cursor=pointer]
              - generic [ref=e342]:
                - generic [ref=e345]:
                  - generic [ref=e346]:
                    - generic [ref=e347]: 课堂讲授
                    - generic [ref=e348]: .png
                  - generic [ref=e349]: 大小未知
                - button [ref=e350] [cursor=pointer]
                - generic [ref=e351]:
                  - button [ref=e352] [cursor=pointer]
                  - button [ref=e355] [cursor=pointer]
              - generic [ref=e359]:
                - generic [ref=e362]:
                  - generic [ref=e363]:
                    - generic [ref=e364]: 自主阅读
                    - generic [ref=e365]: .png
                  - generic [ref=e366]: 大小未知
                - button [ref=e367] [cursor=pointer]
                - generic [ref=e368]:
                  - button [ref=e369] [cursor=pointer]
                  - button [ref=e372] [cursor=pointer]
              - generic [ref=e376]:
                - generic [ref=e379]:
                  - generic [ref=e380]:
                    - generic [ref=e381]: 课堂协作
                    - generic [ref=e382]: .png
                  - generic [ref=e383]: 大小未知
                - button [ref=e384] [cursor=pointer]
                - generic [ref=e385]:
                  - button [ref=e386] [cursor=pointer]
                  - button [ref=e389] [cursor=pointer]
            - generic [ref=e392]:
              - generic [ref=e393]: 当前显示 8 / 12 个附件
              - button [ref=e394] [cursor=pointer]:
                - generic [ref=e395]: 展开全部 12 个
            - paragraph [ref=e396]: 图片为 AI 生成的教学情境示意，视频为示意图制作的短片；多个视频条目复用同一个演示文件。
      - generic [ref=e397]:
        - heading [level=2] [ref=e398]: 课程附件工作流
        - paragraph [ref=e399]: 选择或拖入真实文件，查看预览与下载，再试试取消、失败重试、替换及只读查看。
        - generic [ref=e401]:
          - paragraph [ref=e402]: 本地演示：选择、预览和下载使用真实文件；上传与保存仅在本页模拟，不向服务器传输。刷新后恢复示例。
          - group [ref=e403]:
            - generic [ref=e404] [cursor=pointer]: 演示选项
          - form [ref=e405]:
            - group [ref=e406]:
              - generic [ref=e407]:
                - button [ref=e408] [cursor=pointer]:
                  - generic [ref=e409]: 添加附件
                - status [ref=e410]: 或将文件拖到这里。
              - generic [ref=e411]: 支持 PDF、常见图片、文档、表格、演示文稿、TXT 和 ZIP。最多 8 个，每个不超过 10 MB，合计不超过 25 MB；不接收空文件和重复文件。
            - generic [ref=e413]:
              - generic [ref=e415]:
                - generic [ref=e417]:
                  - generic [ref=e418]:
                    - generic [ref=e419]: 课程导读：从问题到证据
                    - generic [ref=e420]: .pdf
                  - generic [ref=e421]: 965 B
                - button [ref=e422] [cursor=pointer]
                - generic [ref=e423]:
                  - button [ref=e424] [cursor=pointer]
                  - button [ref=e427] [cursor=pointer]
              - generic [ref=e431]:
                - generic [ref=e434]:
                  - generic [ref=e435]:
                    - generic [ref=e436]: 高等数学课程封面
                    - generic [ref=e437]: .png
                  - generic [ref=e438]: 1 MB
                - button [ref=e439] [cursor=pointer]
                - generic [ref=e440]:
                  - button [ref=e441] [cursor=pointer]
                  - button [ref=e444] [cursor=pointer]
              - generic [ref=e448]:
                - generic [ref=e450]:
                  - generic [ref=e451]:
                    - generic [ref=e452]: 课堂观察记录与同伴反馈说明
                    - generic [ref=e453]: .txt
                  - generic [ref=e454]: 341 B
                - button [ref=e455] [cursor=pointer]
                - generic [ref=e456]:
                  - button [ref=e457] [cursor=pointer]
                  - button [ref=e460] [cursor=pointer]
            - generic [ref=e463]:
              - status [ref=e464]: 3 / 8 个附件 · 合计 1 MB / 25 MB。附件已就绪，可保存。
              - generic [ref=e465]:
                - button [ref=e466] [cursor=pointer]:
                  - generic [ref=e467]: 保存附件
                - button [ref=e468] [cursor=pointer]:
                  - generic [ref=e469]: 恢复示例
          - group [ref=e470]:
            - generic [ref=e471] [cursor=pointer]: 权限与失效示例
      - generic [ref=e472]:
        - heading [level=2] [ref=e473]: 文件与任务状态
        - paragraph [ref=e474]: 白底和浅灰底使用相同结构；文件身份、上传状态与关联任务分别表达。
        - generic [ref=e476]:
          - generic [ref=e477]:
            - paragraph [ref=e478]: 两列共享同一组示例状态。除课程导读的真实 PDF 外，文件信息、上传、字幕、报告和审核均为本页演示。
            - button [ref=e479] [cursor=pointer]:
              - generic [ref=e480]: 恢复示例
          - generic [ref=e481]:
            - region [ref=e482]:
              - heading [level=3] [ref=e483]: 白底 · 浅描边
              - generic [ref=e484]:
                - group [ref=e485]:
                  - generic [ref=e486]:
                    - generic [ref=e488]:
                      - generic [ref=e489]:
                        - generic [ref=e490]: 课程导读：从问题到证据
                        - generic [ref=e491]: .pdf
                      - generic [ref=e492]: 965 B
                    - button [ref=e493] [cursor=pointer]
                    - generic [ref=e495]:
                      - button [ref=e496] [cursor=pointer]
                      - button [ref=e499] [cursor=pointer]
                - group [ref=e502]:
                  - generic [ref=e503]:
                    - generic [ref=e505]:
                      - generic [ref=e506]:
                        - generic [ref=e507]: 课堂录像
                        - generic [ref=e508]: .mp4
                      - generic [ref=e510]:
                        - progressbar [ref=e511]: x
                        - generic [ref=e514]: 42%
                    - button [disabled] [ref=e515]
                    - button [ref=e518] [cursor=pointer]:
                      - generic [ref=e519]: 取消
                - group [ref=e520]:
                  - generic [ref=e521]:
                    - generic [ref=e523]:
                      - generic [ref=e524]:
                        - generic [ref=e525]: 课堂录音
                        - generic [ref=e526]: .mp3
                      - generic [ref=e527]: 4.6 MB · 上传失败
                    - button [disabled] [ref=e528]
                    - generic [ref=e531]:
                      - button [ref=e532] [cursor=pointer]:
                        - generic [ref=e533]: 重试
                      - button [ref=e534] [cursor=pointer]
                - group [ref=e537]:
                  - generic [ref=e538]:
                    - generic [ref=e540]:
                      - generic [ref=e541]:
                        - generic [ref=e542]: 研究论文
                        - generic [ref=e543]: .pdf
                      - generic [ref=e544]: 1.8 MB · 检测报告未读
                    - button [ref=e545] [cursor=pointer]
                    - generic [ref=e550]:
                      - button [ref=e551] [cursor=pointer]:
                        - generic [ref=e552]: 查看报告
                      - button [ref=e553] [cursor=pointer]
                - group [ref=e556]:
                  - generic [ref=e557]:
                    - generic [ref=e559]:
                      - generic [ref=e560]:
                        - generic [ref=e561]: 授课录像
                        - generic [ref=e562]: .mp4
                      - generic [ref=e563]: 64 MB
                    - button [ref=e564] [cursor=pointer]
                    - generic [ref=e566]:
                      - button [ref=e567] [cursor=pointer]
                      - button [ref=e570] [cursor=pointer]
                  - generic [ref=e573]:
                    - generic [ref=e577]:
                      - text: 字幕生成失败
                      - paragraph [ref=e578]: 原视频状态正常 · 播放、下载为示例
                    - button [ref=e579] [cursor=pointer]:
                      - generic [ref=e580]: 重试字幕
                - group [ref=e581]:
                  - generic [ref=e582]:
                    - generic [ref=e584]:
                      - generic [ref=e585]:
                        - generic [ref=e586]: 设备申请
                        - generic [ref=e587]: .pdf
                      - generic [ref=e588]: 860 KB · 关联申请待你审核
                    - button [ref=e589] [cursor=pointer]
                    - generic [ref=e592]:
                      - button [ref=e593] [cursor=pointer]:
                        - generic [ref=e594]: 去审核
                      - button [ref=e595] [cursor=pointer]
                - group [ref=e598]:
                  - generic [ref=e599]:
                    - generic [ref=e601]:
                      - generic [ref=e602]:
                        - generic [ref=e603]: 课堂资料
                        - generic [ref=e604]: .pdf
                      - generic [ref=e605]: 2.1 MB · 禁止下载
                    - button [ref=e606] [cursor=pointer]
                    - generic [ref=e609]:
                      - button [ref=e610] [cursor=pointer]:
                        - generic [ref=e611]: 预览
                      - button [ref=e612] [cursor=pointer]
            - region [ref=e615]:
              - heading [level=3] [ref=e616]: 浅灰底
              - generic [ref=e617]:
                - group [ref=e618]:
                  - generic [ref=e619]:
                    - generic [ref=e621]:
                      - generic [ref=e622]:
                        - generic [ref=e623]: 课程导读：从问题到证据
                        - generic [ref=e624]: .pdf
                      - generic [ref=e625]: 965 B
                    - button [ref=e626] [cursor=pointer]
                    - generic [ref=e628]:
                      - button [ref=e629] [cursor=pointer]
                      - button [ref=e632] [cursor=pointer]
                - group [ref=e635]:
                  - generic [ref=e636]:
                    - generic [ref=e638]:
                      - generic [ref=e639]:
                        - generic [ref=e640]: 课堂录像
                        - generic [ref=e641]: .mp4
                      - generic [ref=e643]:
                        - progressbar [ref=e644]: x
                        - generic [ref=e647]: 42%
                    - button [disabled] [ref=e648]
                    - button [ref=e651] [cursor=pointer]:
                      - generic [ref=e652]: 取消
                - group [ref=e653]:
                  - generic [ref=e654]:
                    - generic [ref=e656]:
                      - generic [ref=e657]:
                        - generic [ref=e658]: 课堂录音
                        - generic [ref=e659]: .mp3
                      - generic [ref=e660]: 4.6 MB · 上传失败
                    - button [disabled] [ref=e661]
                    - generic [ref=e664]:
                      - button [ref=e665] [cursor=pointer]:
                        - generic [ref=e666]: 重试
                      - button [ref=e667] [cursor=pointer]
                - group [ref=e670]:
                  - generic [ref=e671]:
                    - generic [ref=e673]:
                      - generic [ref=e674]:
                        - generic [ref=e675]: 研究论文
                        - generic [ref=e676]: .pdf
                      - generic [ref=e677]: 1.8 MB · 检测报告未读
                    - button [ref=e678] [cursor=pointer]
                    - generic [ref=e683]:
                      - button [ref=e684] [cursor=pointer]:
                        - generic [ref=e685]: 查看报告
                      - button [ref=e686] [cursor=pointer]
                - group [ref=e689]:
                  - generic [ref=e690]:
                    - generic [ref=e692]:
                      - generic [ref=e693]:
                        - generic [ref=e694]: 授课录像
                        - generic [ref=e695]: .mp4
                      - generic [ref=e696]: 64 MB
                    - button [ref=e697] [cursor=pointer]
                    - generic [ref=e699]:
                      - button [ref=e700] [cursor=pointer]
                      - button [ref=e703] [cursor=pointer]
                  - generic [ref=e706]:
                    - generic [ref=e710]:
                      - text: 字幕生成失败
                      - paragraph [ref=e711]: 原视频状态正常 · 播放、下载为示例
                    - button [ref=e712] [cursor=pointer]:
                      - generic [ref=e713]: 重试字幕
                - group [ref=e714]:
                  - generic [ref=e715]:
                    - generic [ref=e717]:
                      - generic [ref=e718]:
                        - generic [ref=e719]: 设备申请
                        - generic [ref=e720]: .pdf
                      - generic [ref=e721]: 860 KB · 关联申请待你审核
                    - button [ref=e722] [cursor=pointer]
                    - generic [ref=e725]:
                      - button [ref=e726] [cursor=pointer]:
                        - generic [ref=e727]: 去审核
                      - button [ref=e728] [cursor=pointer]
                - group [ref=e731]:
                  - generic [ref=e732]:
                    - generic [ref=e734]:
                      - generic [ref=e735]:
                        - generic [ref=e736]: 课堂资料
                        - generic [ref=e737]: .pdf
                      - generic [ref=e738]: 2.1 MB · 禁止下载
                    - button [ref=e739] [cursor=pointer]
                    - generic [ref=e742]:
                      - button [ref=e743] [cursor=pointer]:
                        - generic [ref=e744]: 预览
                      - button [ref=e745] [cursor=pointer]
      - generic [ref=e748]:
        - heading [level=2] [ref=e749]: 完整五态
        - paragraph [ref=e750]: 处理中保留可读文字和动态提示；失败同时使用文字和图标。
        - group [ref=e752]:
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
        - heading [level=2] [ref=e779]: 三档尺寸与竖排媒体
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
            - img [ref=e799]:
              - generic [ref=e800]:
                - generic [ref=e801]: 课堂观察 · 第 04 讲
                - strong [ref=e802]: 从问题到证据
                - generic [ref=e803]: 观察 · 记录 · 讨论
            - generic [ref=e804]:
              - generic [ref=e805]: 课程封面
              - generic [ref=e806]: 预览占位
    - region [ref=e807]:
      - heading [level=2] [ref=e808]: 使用边界
      - generic [ref=e809]:
        - generic [ref=e810]:
          - heading [level=3] [ref=e811]: 适合用在
          - list [ref=e812]:
            - listitem [ref=e813]: 表单、消息或资料区需要展示文件和处理状态。
            - listitem [ref=e814]: 课程附件需要选择、校验、上传、预览、下载或替换。
        - generic [ref=e815]:
          - heading [level=3] [ref=e816]: 避免用在
          - list [ref=e817]:
            - listitem [ref=e818]: 把前端校验和操作显隐当作服务器权限或安全校验。
            - listitem [ref=e819]: 把整卡按钮与移除按钮做成嵌套按钮。
    - generic [ref=e820]:
      - region [ref=e821]:
        - heading [level=2] [ref=e822]: API 与结构
        - table [ref=e824]:
          - caption [ref=e825]: Attachment 文件附件 常用接口
          - rowgroup [ref=e826]:
            - row [ref=e827]:
              - columnheader [ref=e828]: 名称
              - columnheader [ref=e829]: 类型
              - columnheader [ref=e830]: 默认
              - columnheader [ref=e831]: 说明
          - rowgroup [ref=e832]:
            - row [ref=e833]:
              - rowheader [ref=e834]:
                - code [ref=e835]: useAttachmentUpload
              - cell [ref=e836]:
                - code [ref=e837]: items / constraints / upload / readOnly
              - cell [ref=e838]: —
              - cell [ref=e839]: 管理文件选择、校验、上传、取消和重试；上传适配器由宿主提供。
            - row [ref=e840]:
              - rowheader [ref=e841]:
                - code [ref=e842]: AttachmentList
              - cell [ref=e843]:
                - code [ref=e844]: items / surface / readOnly
              - cell [ref=e845]: —
              - cell [ref=e846]: outlined / filled 两种表面；下载主操作与更多菜单遵循独立权限。
            - row [ref=e847]:
              - rowheader [ref=e848]:
                - code [ref=e849]: AttachmentList size
              - cell [ref=e850]:
                - code [ref=e851]: default / sm
              - cell [ref=e852]: default
              - cell [ref=e853]: 普通附件行与紧凑草稿卡；不改变底层 Attachment 的三档尺寸。
            - row [ref=e854]:
              - rowheader [ref=e855]:
                - code [ref=e856]: AttachmentList orientation / layout
              - cell [ref=e857]:
                - code [ref=e858]: horizontal / vertical；list / wrap / grid
              - cell [ref=e859]: horizontal / list
              - cell [ref=e860]: 卡片内部方向与集合排列独立；折叠、总数和重试范围由宿主控制。
            - row [ref=e861]:
              - rowheader [ref=e862]:
                - code [ref=e863]: AttachmentList actions
              - cell [ref=e864]:
                - code [ref=e865]: default / draft
              - cell [ref=e866]: default
              - cell [ref=e867]: 常规查看下载操作，或草稿中的直接移除。
            - row [ref=e868]:
              - rowheader [ref=e869]:
                - code [ref=e870]: Attachment state
              - cell [ref=e871]:
                - code [ref=e872]: idle / uploading / processing / error / done
              - cell [ref=e873]: done
              - cell [ref=e874]: 底层附件的五种显示状态。
            - row [ref=e875]:
              - rowheader [ref=e876]:
                - code [ref=e877]: Attachment size
              - cell [ref=e878]:
                - code [ref=e879]: default / sm / xs
              - cell [ref=e880]: default
              - cell [ref=e881]: 三档源码尺寸，显式 size 不再次被密度缩放。
        - paragraph [ref=e882]: Parts / Slots：AttachmentPicker、AttachmentList、AttachmentPreview、useAttachmentUpload、Attachment、Group、Media、Content、Title、Description、Actions、Action、Trigger
      - region [ref=e883]:
        - heading [level=2] [ref=e884]: 调用示例
        - generic [ref=e885]:
          - button [ref=e887] [cursor=pointer]:
            - generic [ref=e888]: 复制代码
          - code [ref=e890]: "const attachments = useAttachmentUpload({ initialItems, constraints: { maxFiles: 8, maxFileSize: 10 * 1024 * 1024 }, upload: uploadFile, }); <AttachmentPicker onFiles={files => { attachments.addFiles(files); }} /> <AttachmentList items={attachments.items} onStart={item => { void attachments.start(item.id); }} onRetry={item => { void attachments.retry(item.id); }} onCancel={item => attachments.cancel(item.id)} onRemove={item => attachments.remove(item.id)} onReplace={(item, file) => { attachments.replaceFile(item.id, file); }} /> <Button disabled={!attachments.summary.canSubmit}>保存附件</Button>"
        - paragraph [ref=e891]:
          - text: 当前源码：
          - code [ref=e892]: packages/ui/src/attachment-workflow/index.ts
  - dialog [ref=e896]:
    - generic [ref=e897]:
      - generic [ref=e898]:
        - heading "本次附件" [level=2] [ref=e899]
        - paragraph [ref=e900]: 关闭视图后保留本页内容，上传可以继续。
        - status [ref=e901]:
          - generic [ref=e902]: 共 24 个
          - generic [ref=e903]: · 24 个已上传
        - generic [ref=e904]:
          - group "添加弹窗附件" [ref=e905]:
            - generic [ref=e906]:
              - button "添加弹窗附件" [active] [ref=e907] [cursor=pointer]
              - status [ref=e909]: 或将文件拖到这里。
          - generic [ref=e910]:
            - button "演示上传" [ref=e911] [cursor=pointer]
            - button "恢复弹窗示例" [ref=e913] [cursor=pointer]
      - generic [ref=e917]:
        - generic [ref=e919]:
          - generic [ref=e921]:
            - generic "课程导读.pdf" [ref=e922]:
              - generic [ref=e923]: 课程导读
              - generic [ref=e924]: .pdf
            - generic [ref=e925]: 965 B
          - button "预览 课程导读.pdf" [ref=e926] [cursor=pointer]
          - generic [ref=e927]:
            - button "下载 课程导读.pdf" [ref=e928] [cursor=pointer]
            - button "更多操作 课程导读.pdf" [ref=e931] [cursor=pointer]
        - generic [ref=e935]:
          - generic [ref=e937]:
            - generic "课堂讲义.txt" [ref=e938]:
              - generic [ref=e939]: 课堂讲义
              - generic [ref=e940]: .txt
            - generic [ref=e941]: 80 B
          - button "预览 课堂讲义.txt" [ref=e942] [cursor=pointer]
          - generic [ref=e943]:
            - button "下载 课堂讲义.txt" [ref=e944] [cursor=pointer]
            - button "更多操作 课堂讲义.txt" [ref=e947] [cursor=pointer]
        - generic [ref=e951]:
          - generic [ref=e953]:
            - generic "课堂观察数据.csv" [ref=e954]:
              - generic [ref=e955]: 课堂观察数据
              - generic [ref=e956]: .csv
            - generic [ref=e957]: 66 B
          - button "预览 课堂观察数据.csv" [ref=e958] [cursor=pointer]
          - generic [ref=e959]:
            - button "下载 课堂观察数据.csv" [ref=e960] [cursor=pointer]
            - button "更多操作 课堂观察数据.csv" [ref=e963] [cursor=pointer]
        - generic [ref=e967]:
          - generic [ref=e969]:
            - generic "小组讨论记录.md" [ref=e970]:
              - generic [ref=e971]: 小组讨论记录
              - generic [ref=e972]: .md
            - generic [ref=e973]: 103 B
          - button "预览 小组讨论记录.md" [ref=e974] [cursor=pointer]
          - generic [ref=e975]:
            - button "下载 小组讨论记录.md" [ref=e976] [cursor=pointer]
            - button "更多操作 小组讨论记录.md" [ref=e979] [cursor=pointer]
        - generic [ref=e983]:
          - generic [ref=e985]:
            - generic "课堂问题清单.json" [ref=e986]:
              - generic [ref=e987]: 课堂问题清单
              - generic [ref=e988]: .json
            - generic [ref=e989]: 91 B
          - button "预览 课堂问题清单.json" [ref=e990] [cursor=pointer]
          - generic [ref=e991]:
            - button "下载 课堂问题清单.json" [ref=e992] [cursor=pointer]
            - button "更多操作 课堂问题清单.json" [ref=e995] [cursor=pointer]
        - generic [ref=e999]:
          - img "缩略图 课程封面.png" [ref=e1001]
          - generic [ref=e1002]:
            - generic "课程封面.png" [ref=e1003]:
              - generic [ref=e1004]: 课程封面
              - generic [ref=e1005]: .png
            - generic [ref=e1006]: 1 MB
          - button "预览 课程封面.png" [ref=e1007] [cursor=pointer]
          - generic [ref=e1008]:
            - button "下载 课程封面.png" [ref=e1009] [cursor=pointer]
            - button "更多操作 课程封面.png" [ref=e1012] [cursor=pointer]
        - generic [ref=e1016]:
          - generic [ref=e1018]:
            - generic "补充阅读与问题记录.txt" [ref=e1019]:
              - generic [ref=e1020]: 补充阅读与问题记录
              - generic [ref=e1021]: .txt
            - generic [ref=e1022]: 89 B
          - button "预览 补充阅读与问题记录.txt" [ref=e1023] [cursor=pointer]
          - generic [ref=e1024]:
            - button "下载 补充阅读与问题记录.txt" [ref=e1025] [cursor=pointer]
            - button "更多操作 补充阅读与问题记录.txt" [ref=e1028] [cursor=pointer]
        - generic [ref=e1032]:
          - generic [ref=e1034]:
            - generic "阶段学习记录.csv" [ref=e1035]:
              - generic [ref=e1036]: 阶段学习记录
              - generic [ref=e1037]: .csv
            - generic [ref=e1038]: 77 B
          - button "预览 阶段学习记录.csv" [ref=e1039] [cursor=pointer]
          - generic [ref=e1040]:
            - button "下载 阶段学习记录.csv" [ref=e1041] [cursor=pointer]
            - button "更多操作 阶段学习记录.csv" [ref=e1044] [cursor=pointer]
        - generic [ref=e1048]:
          - generic [ref=e1050]:
            - generic "课程导读（第 2 周）.pdf" [ref=e1051]:
              - generic [ref=e1052]: 课程导读（第 2 周）
              - generic [ref=e1053]: .pdf
            - generic [ref=e1054]: 965 B
          - button "预览 课程导读（第 2 周）.pdf" [ref=e1055] [cursor=pointer]
          - generic [ref=e1056]:
            - button "下载 课程导读（第 2 周）.pdf" [ref=e1057] [cursor=pointer]
            - button "更多操作 课程导读（第 2 周）.pdf" [ref=e1060] [cursor=pointer]
        - generic [ref=e1064]:
          - generic [ref=e1066]:
            - generic "课堂讲义（第 2 周）.txt" [ref=e1067]:
              - generic [ref=e1068]: 课堂讲义（第 2 周）
              - generic [ref=e1069]: .txt
            - generic [ref=e1070]: 80 B
          - button "预览 课堂讲义（第 2 周）.txt" [ref=e1071] [cursor=pointer]
          - generic [ref=e1072]:
            - button "下载 课堂讲义（第 2 周）.txt" [ref=e1073] [cursor=pointer]
            - button "更多操作 课堂讲义（第 2 周）.txt" [ref=e1076] [cursor=pointer]
        - generic [ref=e1080]:
          - generic [ref=e1082]:
            - generic "课堂观察数据（第 2 周）.csv" [ref=e1083]:
              - generic [ref=e1084]: 课堂观察数据（第 2 周）
              - generic [ref=e1085]: .csv
            - generic [ref=e1086]: 66 B
          - button "预览 课堂观察数据（第 2 周）.csv" [ref=e1087] [cursor=pointer]
          - generic [ref=e1088]:
            - button "下载 课堂观察数据（第 2 周）.csv" [ref=e1089] [cursor=pointer]
            - button "更多操作 课堂观察数据（第 2 周）.csv" [ref=e1092] [cursor=pointer]
        - generic [ref=e1096]:
          - generic [ref=e1098]:
            - generic "小组讨论记录（第 2 周）.md" [ref=e1099]:
              - generic [ref=e1100]: 小组讨论记录（第 2 周）
              - generic [ref=e1101]: .md
            - generic [ref=e1102]: 103 B
          - button "预览 小组讨论记录（第 2 周）.md" [ref=e1103] [cursor=pointer]
          - generic [ref=e1104]:
            - button "下载 小组讨论记录（第 2 周）.md" [ref=e1105] [cursor=pointer]
            - button "更多操作 小组讨论记录（第 2 周）.md" [ref=e1108] [cursor=pointer]
        - generic [ref=e1112]:
          - generic [ref=e1114]:
            - generic "课堂问题清单（第 2 周）.json" [ref=e1115]:
              - generic [ref=e1116]: 课堂问题清单（第 2 周）
              - generic [ref=e1117]: .json
            - generic [ref=e1118]: 91 B
          - button "预览 课堂问题清单（第 2 周）.json" [ref=e1119] [cursor=pointer]
          - generic [ref=e1120]:
            - button "下载 课堂问题清单（第 2 周）.json" [ref=e1121] [cursor=pointer]
            - button "更多操作 课堂问题清单（第 2 周）.json" [ref=e1124] [cursor=pointer]
        - generic [ref=e1128]:
          - img "缩略图 课程封面（第 2 周）.png" [ref=e1130]
          - generic [ref=e1131]:
            - generic "课程封面（第 2 周）.png" [ref=e1132]:
              - generic [ref=e1133]: 课程封面（第 2 周）
              - generic [ref=e1134]: .png
            - generic [ref=e1135]: 1 MB
          - button "预览 课程封面（第 2 周）.png" [ref=e1136] [cursor=pointer]
          - generic [ref=e1137]:
            - button "下载 课程封面（第 2 周）.png" [ref=e1138] [cursor=pointer]
            - button "更多操作 课程封面（第 2 周）.png" [ref=e1141] [cursor=pointer]
        - generic [ref=e1145]:
          - generic [ref=e1147]:
            - generic "补充阅读与问题记录（第 2 周）.txt" [ref=e1148]:
              - generic [ref=e1149]: 补充阅读与问题记录（第 2 周）
              - generic [ref=e1150]: .txt
            - generic [ref=e1151]: 89 B
          - button "预览 补充阅读与问题记录（第 2 周）.txt" [ref=e1152] [cursor=pointer]
          - generic [ref=e1153]:
            - button "下载 补充阅读与问题记录（第 2 周）.txt" [ref=e1154] [cursor=pointer]
            - button "更多操作 补充阅读与问题记录（第 2 周）.txt" [ref=e1157] [cursor=pointer]
        - generic [ref=e1161]:
          - generic [ref=e1163]:
            - generic "阶段学习记录（第 2 周）.csv" [ref=e1164]:
              - generic [ref=e1165]: 阶段学习记录（第 2 周）
              - generic [ref=e1166]: .csv
            - generic [ref=e1167]: 77 B
          - button "预览 阶段学习记录（第 2 周）.csv" [ref=e1168] [cursor=pointer]
          - generic [ref=e1169]:
            - button "下载 阶段学习记录（第 2 周）.csv" [ref=e1170] [cursor=pointer]
            - button "更多操作 阶段学习记录（第 2 周）.csv" [ref=e1173] [cursor=pointer]
        - generic [ref=e1177]:
          - generic [ref=e1179]:
            - generic "课程导读（第 3 周）.pdf" [ref=e1180]:
              - generic [ref=e1181]: 课程导读（第 3 周）
              - generic [ref=e1182]: .pdf
            - generic [ref=e1183]: 965 B
          - button "预览 课程导读（第 3 周）.pdf" [ref=e1184] [cursor=pointer]
          - generic [ref=e1185]:
            - button "下载 课程导读（第 3 周）.pdf" [ref=e1186] [cursor=pointer]
            - button "更多操作 课程导读（第 3 周）.pdf" [ref=e1189] [cursor=pointer]
        - generic [ref=e1193]:
          - generic [ref=e1195]:
            - generic "课堂讲义（第 3 周）.txt" [ref=e1196]:
              - generic [ref=e1197]: 课堂讲义（第 3 周）
              - generic [ref=e1198]: .txt
            - generic [ref=e1199]: 80 B
          - button "预览 课堂讲义（第 3 周）.txt" [ref=e1200] [cursor=pointer]
          - generic [ref=e1201]:
            - button "下载 课堂讲义（第 3 周）.txt" [ref=e1202] [cursor=pointer]
            - button "更多操作 课堂讲义（第 3 周）.txt" [ref=e1205] [cursor=pointer]
        - generic [ref=e1209]:
          - generic [ref=e1211]:
            - generic "课堂观察数据（第 3 周）.csv" [ref=e1212]:
              - generic [ref=e1213]: 课堂观察数据（第 3 周）
              - generic [ref=e1214]: .csv
            - generic [ref=e1215]: 66 B
          - button "预览 课堂观察数据（第 3 周）.csv" [ref=e1216] [cursor=pointer]
          - generic [ref=e1217]:
            - button "下载 课堂观察数据（第 3 周）.csv" [ref=e1218] [cursor=pointer]
            - button "更多操作 课堂观察数据（第 3 周）.csv" [ref=e1221] [cursor=pointer]
        - generic [ref=e1225]:
          - generic [ref=e1227]:
            - generic "小组讨论记录（第 3 周）.md" [ref=e1228]:
              - generic [ref=e1229]: 小组讨论记录（第 3 周）
              - generic [ref=e1230]: .md
            - generic [ref=e1231]: 103 B
          - button "预览 小组讨论记录（第 3 周）.md" [ref=e1232] [cursor=pointer]
          - generic [ref=e1233]:
            - button "下载 小组讨论记录（第 3 周）.md" [ref=e1234] [cursor=pointer]
            - button "更多操作 小组讨论记录（第 3 周）.md" [ref=e1237] [cursor=pointer]
        - generic [ref=e1241]:
          - generic [ref=e1243]:
            - generic "课堂问题清单（第 3 周）.json" [ref=e1244]:
              - generic [ref=e1245]: 课堂问题清单（第 3 周）
              - generic [ref=e1246]: .json
            - generic [ref=e1247]: 91 B
          - button "预览 课堂问题清单（第 3 周）.json" [ref=e1248] [cursor=pointer]
          - generic [ref=e1249]:
            - button "下载 课堂问题清单（第 3 周）.json" [ref=e1250] [cursor=pointer]
            - button "更多操作 课堂问题清单（第 3 周）.json" [ref=e1253] [cursor=pointer]
        - generic [ref=e1257]:
          - img "缩略图 课程封面（第 3 周）.png" [ref=e1259]
          - generic [ref=e1260]:
            - generic "课程封面（第 3 周）.png" [ref=e1261]:
              - generic [ref=e1262]: 课程封面（第 3 周）
              - generic [ref=e1263]: .png
            - generic [ref=e1264]: 1 MB
          - button "预览 课程封面（第 3 周）.png" [ref=e1265] [cursor=pointer]
          - generic [ref=e1266]:
            - button "下载 课程封面（第 3 周）.png" [ref=e1267] [cursor=pointer]
            - button "更多操作 课程封面（第 3 周）.png" [ref=e1270] [cursor=pointer]
        - generic [ref=e1274]:
          - generic [ref=e1276]:
            - generic "补充阅读与问题记录（第 3 周）.txt" [ref=e1277]:
              - generic [ref=e1278]: 补充阅读与问题记录（第 3 周）
              - generic [ref=e1279]: .txt
            - generic [ref=e1280]: 89 B
          - button "预览 补充阅读与问题记录（第 3 周）.txt" [ref=e1281] [cursor=pointer]
          - generic [ref=e1282]:
            - button "下载 补充阅读与问题记录（第 3 周）.txt" [ref=e1283] [cursor=pointer]
            - button "更多操作 补充阅读与问题记录（第 3 周）.txt" [ref=e1286] [cursor=pointer]
        - generic [ref=e1290]:
          - generic [ref=e1292]:
            - generic "阶段学习记录（第 3 周）.csv" [ref=e1293]:
              - generic [ref=e1294]: 阶段学习记录（第 3 周）
              - generic [ref=e1295]: .csv
            - generic [ref=e1296]: 77 B
          - button "预览 阶段学习记录（第 3 周）.csv" [ref=e1297] [cursor=pointer]
          - generic [ref=e1298]:
            - button "下载 阶段学习记录（第 3 周）.csv" [ref=e1299] [cursor=pointer]
            - button "更多操作 阶段学习记录（第 3 周）.csv" [ref=e1302] [cursor=pointer]
      - generic [ref=e1305]:
        - generic [ref=e1306]: 共 24 个附件
        - button "关闭附件弹窗" [ref=e1307] [cursor=pointer]:
          - generic [ref=e1308]: 关闭
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