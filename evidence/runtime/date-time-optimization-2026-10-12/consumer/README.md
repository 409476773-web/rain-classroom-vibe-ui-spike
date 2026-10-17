# Rain G5 独立源码包

本地候选源码，未发布。包含 NativeSelect、Combobox、Slider、Calendar、DatePicker，以及复用的 FormItem / Input / Textarea / Button 和实际依赖闭包。Label / Field 不增加平行组件；Input Group 通过 Input 附加区与 Textarea 上下操作区组合。

## 运行

需要 Node.js 22.13+（或 24+）。解压后在本目录执行：

```sh
npm install
npm run typecheck
npm run build
npm run dev
```

本次本机验证的依赖从已有缓存完整复制，未执行清洁联网安装。压缩包不含 node_modules、依赖缓存或构建结果；首次运行须安装依赖。直接依赖固定版本见 package.json，验证时的完整依赖版本见 dependency-versions.json。Base UI 1.8.0、DayPicker 9.13.2、React / React DOM 19.2.8。npm install 尚未在清洁联网环境验收，不将本机检查当作该结论。

## 范围

UI 根入口是本包专用的窄导出，其余组件文件与登记源码字节一致。保留登记要求的共享 styles.css 及其 CSS 引用闭包；不复制完整 UI TypeScript 树、不引用原工作区 @rain-next/ui。构建检查会拒绝越界模块。DatePicker 四种模式都在点击确定后提交，取消、Escape 或外部关闭丢弃草稿。时间使用内部 HH:mm Input 编辑、键盘增减和可选快捷时间；相关内部源码随 DatePicker 一起交付。

独立示例通过公开 DatePickerPreset / DateRange 类型构造跨午夜快捷项，并使用受控起止时间、最短 1 分钟、30/60/90/120 分钟时长设置与已确认结果输出。

源码索引与哈希见 source-files.json，来源锁定和 MIT 许可证在 evidence/runtime/g5-components-2026-10-12/。自动类型 / 构建通过不授予人眼视觉、读屏、触屏或发布验收。
