# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chart-business-map.spec.ts >> no-preference: compact tools, stable scale/readings, keyboard drill and saved national view
- Location: tests/e2e/chart-business-map.spec.ts:56:3

# Error details

```
Error: locator.evaluateAll: TypeError: Cannot read properties of null (reading 'getBoundingClientRect')
    at eval (eval at evaluate (:311:30), <anonymous>:3:38)
    at Array.map (<anonymous>)
    at eval (eval at evaluate (:311:30), <anonymous>:1:16)
    at UtilityScript.evaluate (<anonymous>:313:16)
    at UtilityScript.<anonymous> (<anonymous>:1:44)
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - link "返回组件目录" [ref=e5] [cursor=pointer]:
      - /url: "#components"
    - generic [ref=e7]:
      - heading "全国与省市下钻" [level=1] [ref=e8]
      - generic [ref=e9]: 业务配方 · 未发布 · 待视觉审阅
    - paragraph [ref=e10]: 从全国查看各省参与强度，再进入省内真实城市与省直管县级区域。边界有可追溯来源，统计与地区详情使用示例数据。
  - generic [ref=e11]:
    - generic [ref=e12]:
      - heading "全国 · 地区参与人数" [level=2] [ref=e13]
      - generic [ref=e14]: CH-117 · 示例数据
    - generic [ref=e15]:
      - navigation "当前地图层级" [ref=e16]:
        - list [ref=e17]:
          - listitem [ref=e18]:
            - generic [ref=e19]: 全国
      - button "选择地区" [ref=e20] [cursor=pointer]
    - generic [ref=e26]:
      - img [ref=e27]:
        - generic [ref=e29]:
          - generic [ref=e30] [cursor=pointer]
          - generic [ref=e31] [cursor=pointer]
          - generic [ref=e32] [cursor=pointer]
          - generic [ref=e33] [cursor=pointer]
          - generic [ref=e34] [cursor=pointer]
          - generic [ref=e35] [cursor=pointer]
          - generic [ref=e36] [cursor=pointer]
          - generic [ref=e37] [cursor=pointer]
          - generic [ref=e38] [cursor=pointer]
          - generic [ref=e39] [cursor=pointer]
          - generic [ref=e40] [cursor=pointer]
          - generic [ref=e41] [cursor=pointer]
          - generic [ref=e42] [cursor=pointer]
          - generic [ref=e43] [cursor=pointer]
          - generic [ref=e44] [cursor=pointer]
          - generic [ref=e45] [cursor=pointer]
          - generic [ref=e46] [cursor=pointer]
          - generic [ref=e47] [cursor=pointer]
          - generic [ref=e48] [cursor=pointer]
          - generic [ref=e49] [cursor=pointer]
          - generic [ref=e50] [cursor=pointer]
          - generic [ref=e51] [cursor=pointer]
          - generic [ref=e52] [cursor=pointer]
          - generic [ref=e53] [cursor=pointer]
          - generic [ref=e54] [cursor=pointer]
          - generic [ref=e55] [cursor=pointer]
          - generic [ref=e56] [cursor=pointer]
          - generic [ref=e57] [cursor=pointer]
          - generic [ref=e58] [cursor=pointer]
          - generic [ref=e59] [cursor=pointer]
          - generic [ref=e60] [cursor=pointer]
          - generic [ref=e61] [cursor=pointer]
          - generic [ref=e62] [cursor=pointer]
          - generic [ref=e63] [cursor=pointer]
      - group "地图视图工具" [ref=e64]:
        - button "放大地图" [ref=e65] [cursor=pointer]
        - button "缩小地图" [disabled] [ref=e68]
        - button "恢复地图视图" [disabled] [ref=e71]
    - group "参与人数色阶，0到300人，另有无数据" [ref=e74]:
      - generic [ref=e75]: 全国范围
      - generic [ref=e76]: 0 人
      - generic [ref=e83]: 300 人
      - generic [ref=e84]: 无数据
    - paragraph [ref=e87]: 指向地区查看人数，点击省份进入省内，点击城市保留读数。
    - generic [ref=e88]:
      - generic [ref=e89]: 边界来源
      - link "HDX/OCHA （新标签页打开）" [ref=e90] [cursor=pointer]:
        - /url: https://data.humdata.org/dataset/cod-ab-chn
        - generic [ref=e91]: HDX/OCHA
        - generic [ref=e92]: （新标签页打开）
      - text: ·
      - link "CC BY 3.0 IGO （新标签页打开）" [ref=e93] [cursor=pointer]:
        - /url: https://creativecommons.org/licenses/by/3.0/igo/
        - generic [ref=e94]: CC BY 3.0 IGO
        - generic [ref=e95]: （新标签页打开）
      - text: /
      - link "© OpenStreetMap contributors （新标签页打开）" [ref=e96] [cursor=pointer]:
        - /url: https://www.openstreetmap.org/copyright
        - generic [ref=e97]: © OpenStreetMap contributors
        - generic [ref=e98]: （新标签页打开）
      - text: ·
      - link "ODbL （新标签页打开）" [ref=e99] [cursor=pointer]:
        - /url: https://opendatacommons.org/licenses/odbl/1-0/
        - generic [ref=e100]: ODbL
        - generic [ref=e101]: （新标签页打开）
    - group [ref=e102]:
      - generic "查看精确数据" [ref=e103] [cursor=pointer]
    - group [ref=e104]:
      - generic "边界与统计说明" [ref=e105] [cursor=pointer]
  - group [ref=e106]:
    - generic "体验不同数据状态与配色" [ref=e107]
    - option "全国" [selected]
    - option "河北省"
    - option "山西省"
    - option "内蒙古自治区"
    - option "辽宁省"
    - option "吉林省"
    - option "黑龙江省"
    - option "江苏省"
    - option "浙江省"
    - option "安徽省"
    - option "福建省"
    - option "江西省"
    - option "山东省"
    - option "河南省"
    - option "湖北省"
    - option "湖南省"
    - option "广东省"
    - option "广西壮族自治区"
    - option "海南省"
    - option "四川省"
    - option "贵州省"
    - option "云南省"
    - option "西藏自治区"
    - option "陕西省"
    - option "甘肃省"
    - option "青海省"
    - option "宁夏回族自治区"
    - option "新疆维吾尔自治区"
    - option "正常" [selected]
    - option "全部为零"
    - option "全部缺测"
    - option "无效数值"
    - option "未匹配统计ID"
    - option "模拟加载失败"
    - option "蓝灰单色" [selected]
    - option "紫蓝强度"
  - group [ref=e108]:
    - generic "中国地图配置、完整源码与边界数据" [ref=e109] [cursor=pointer]
```