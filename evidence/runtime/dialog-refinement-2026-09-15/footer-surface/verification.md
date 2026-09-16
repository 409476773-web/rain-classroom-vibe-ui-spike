# Dialog底部表面修订

2026-09-15，依据用户两张截图反馈实施。

- Dialog/AlertDialog.Footer去掉独立底色，直接显示Content表面，浅深色一致。
- 新增Footer.divider，默认false；短课程弹窗及确认框不画顶线，长课程与BM-B表单显式保留1px顶线。
- 保留原有内距、按钮间距、顺序、尺寸、焦点及滚动行为；同步公共类型、组件合同、预览说明和Token消费登记。

## 验证

- 新浏览器用例在修订前复现主体rgb(255,255,255)、底部rgb(247,249,255)不一致：[修改前](../footer-before.log)。
- 修订后首轮测试有2项场景切换超时：同一hash导航保留了上一层确认框。沿用已有用例的about:blank页面重置方式修复测试，未改动产品交互：[首轮记录](browser.log)。
- Chromium、Firefox、WebKit各通过浅深色×1440/375宽度×短/长内容×主弹窗/确认框，共48次表面、分割线和溢出检查，浏览器无错误：[3项通过](verified-browser.log)。
- 已有短窗间距、强制颜色、嵌套隔离及BM-B固定操作区回归：[5项通过](regression.log)。
- [组件/宿主/Token测试](focused-tests.log)：13/13；[类型检查](typecheck.log)：通过。
- [完整治理检查](governance.log)、[构建](build.log)及git diff --check通过；保留既有对比度待决项和包体积提示。

已查看实际渲染截图：

- [浅色课程弹窗](verified-results/dialog-refinement-footer-s-8b837-dividers-only-on-long-forms-chromium/footer-light-1440-short.png)
- [浅色放弃修改确认](verified-results/dialog-refinement-footer-s-8b837-dividers-only-on-long-forms-chromium/footer-light-1440-short-confirmation.png)
- [深色窄屏确认](verified-results/dialog-refinement-footer-s-8b837-dividers-only-on-long-forms-chromium/footer-dark-375-short-confirmation.png)
- [深色窄屏长表单](verified-results/dialog-refinement-footer-s-8b837-dividers-only-on-long-forms-chromium/footer-dark-375-long.png)

本次为主代理核对，未重新声明独立评审通过。原Human Gate与对比度验收状态保留，等待用户查看本次视觉修订。
