# Input OTP

来源：shadcn-ui/ui 固定 `3ba91b1cc83e1bbe4ab35a422ff2a694849c5048` Base UI InputOTP 和同版 Nova；MIT，源码记录在 `evidence/runtime/g6-preflight-2026-10-14/source-lock.json`。实际输入引擎 `input-otp@1.4.2`，不实现多原生输入或新的粘贴/选区状态机。

四个来源出口完整保留：`InputOTP`、`InputOTPGroup`、`InputOTPSlot`、`InputOTPSeparator`，并导出对应 Props。Root Props 直接保留 OTPInput 的 render/children 互斥类型、真实输入 ref、`value/defaultValue/onChange/onComplete`、`maxLength`、`pattern/pasteTransformer`、`name/form`、原生 size/属性/事件、`inputMode/autoComplete`、`textAlign`、密码管理器与 noScript 降级入口。额外 `status=default|warning|error` 对接既有 FormItem，不增加验证码长度枚举或尺寸轴。

```tsx
<FormItem label="课堂验证码" help="输入收到的4位数字" status={error ? "error" : "default"} message={error}>
  <InputOTP maxLength={4} name="code" pattern="^\d+$" onComplete={handleComplete}>
    <InputOTPGroup>
      {[0, 1, 2, 3].map(index => <InputOTPSlot key={index} index={index} />)}
    </InputOTPGroup>
  </InputOTP>
</FormItem>
```

FormItem 使用 top 标签；id/label/descriptions/required/disabled/error 关联真实单 input。禁用与 FormItem 合并，field 状态优先。可见 slots/group 的错误样式根据真实 input 的 aria-invalid 反馈；显式 slot aria-invalid 也保留。Slots只是镜像展示，不增加Tab stop；分隔符默认装饰，避免多余朗读。

默认保留引擎 `autocomplete=one-time-code`、numeric 键盘；字母数字样例同时指定 `inputMode="text"` 与 pattern。password manager 默认策略和 noScriptCSSFallback 沿引擎，未为消除测试噪音关闭它们。姓名、倒计时、重发、校验后端、过期、异步提交以及验证成功状态属于宿主；onComplete只代表长度完成，不能代替业务验证/自动提交。失败保留内容并提供具体说明。

来源差额：

- 根与 Group/Slot/Separator 的类转译到组件 CSS；默认32px、compact24px可见槽位通过 useDensity 和现有Input值表达；原生 size 属性保留原含义。没有修改字符长度或重写引擎输入逻辑。
- 来源 slot 只显示 char，适配补显示已有 placeholderChar；index非法/越界/脱离Root、maxLength非正安全整数清楚失败。
- FormItem/根status绑定真实input，并同步可见错误状态。首末圆角用 logical corners、边界方向用 logical inline，颜色用已有Field/Focus Token。
- active slot投影单input焦点；源码光标1×16px/1秒周期保留为局部几何/时间，reduced-motion稳定显示，forced-colors保留真实边界和焦点。没有新全局Token。
- Separator用正式MinusIcon代替作者IconPlaceholder；支持原生div/ref/className/style等Props。

测试使用真实input-otp：单input/FormItem/ref、placeholder、FormData/onComplete、粘贴归一化/pattern、受控父级拒绝。jsdom仅补ResizeObserver与密码管理器检测需要的elementFromPoint平台入口；没有mock引擎，没有证明实际密码管理器或短信自动填充。浏览器还需选区/删改、disabled/readOnly、RTL、reduced-motion与真实移动键盘/辅助技术检查。
