import { useEffect, useRef, useState, type ReactNode } from "react";

import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button, Input, Link, type ButtonTextSize, type ButtonTextTone } from "@rain-next/ui";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { ArrowUpIcon } from "@rain-next/ui/icons/arrow-up";
import { DoubleArrowDownIcon } from "@rain-next/ui/icons/double-arrow-down";
import { DoubleArrowUpIcon } from "@rain-next/ui/icons/double-arrow-up";
import { EditPencilIcon } from "@rain-next/ui/icons/edit-pencil";
import "./text-button-page.css";

const tones: ReadonlyArray<{ name: string; tone: ButtonTextTone; action: string }> = [
  { name: "普通灰蓝", tone: "default", action: "编辑示例" },
  { name: "突出主题蓝", tone: "brand", action: "查看示例" },
  { name: "危险红", tone: "danger", action: "移除示例" },
];

const sizes: ReadonlyArray<{ name: string; size: ButtonTextSize; detail: string }> = [
  { name: "小号", size: "small", detail: "12px 字号 · 20px 候选高度" },
  { name: "紧凑号", size: "compact", detail: "13px 字号 · 24px 候选高度" },
  { name: "常规号", size: "regular", detail: "14px 字号 · 26px 候选高度" },
];

// Local demonstration only. The ref also rejects two activations before React
// commits the loading state; unmounting cancels the pending callback entirely.
function useDemoDelay() {
  const timer = useRef<number | undefined>(undefined);
  const [pending, setPending] = useState(false);

  useEffect(() => () => {
    if (timer.current !== undefined) window.clearTimeout(timer.current);
  }, []);

  function begin(onComplete: () => void) {
    if (timer.current !== undefined) return false;
    setPending(true);
    timer.current = window.setTimeout(() => {
      timer.current = undefined;
      setPending(false);
      onComplete();
    }, 2000);
    return true;
  }

  return { pending, begin };
}

function ReviewSection({
  children,
  id,
  number,
  title,
  description,
}: {
  children: ReactNode;
  id: string;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="text-button-page__section" data-slot="review-section">
      <header className="text-button-page__section-heading">
        <span aria-hidden="true" className="text-button-page__number">{number}</span>
        <div>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{description}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

function InputExample({ density, name, unavailable }: { density: Density; name: string; unavailable: boolean }) {
  const inputId = `text-button-input-${density}`;
  const [value, setValue] = useState("");
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("输入演示文字后，可以点击检查或按 Enter。");
  const { pending, begin } = useDemoDelay();
  const cannotStart = unavailable || value.trim().length === 0;

  function checkValue() {
    if (cannotStart) return;
    const snapshot = value;
    const nextCount = count + 1;
    if (!begin(() => setMessage(`已完成 ${nextCount} 次：仅检查触发时的“${snapshot}”。`))) return;
    setCount(nextCount);
    setMessage(`已触发 ${nextCount} 次：正在检查触发时的“${snapshot}”，约 2 秒后完成。`);
  }

  return (
    <div aria-labelledby={`${inputId}-title`} className="text-button-page__input-example" role="group">
      <h3 id={`${inputId}-title`}>{name}</h3>
      <p className="text-button-page__note">
        {density === "compact" ? "紧凑密度 · 13px 文字操作" : "常规密度 · 14px 文字操作"}
      </p>
      <DensityProvider density={density} rainId={`text-button-${density}-context`}>
        <label className="text-button-page__input-label" htmlFor={inputId}>演示内容</label>
        <Input
          aria-describedby={`${inputId}-status`}
          id={inputId}
          onPressEnter={checkValue}
          onValueChange={setValue}
          placeholder="输入一段演示文字"
          trailingAction={(
            <Button
              disabled={!pending && cannotStart}
              loading={pending}
              onClick={checkValue}
              variant="text"
            >
              检查
            </Button>
          )}
          value={value}
        />
      </DensityProvider>
      <p aria-atomic="true" className="text-button-page__feedback" id={`${inputId}-status`} role="status">
        {message}
      </p>
    </div>
  );
}

export function TextButtonPage() {
  const [colorFeedback, setColorFeedback] = useState({ name: "", count: 0 });
  const [sizeFeedback, setSizeFeedback] = useState({ name: "", count: 0 });
  const [iconFeedback, setIconFeedback] = useState({ message: "点击示例体验操作；右侧箭头表示展开。", count: 0 });
  const [showDescription, setShowDescription] = useState(false);
  const [showEditOptions, setShowEditOptions] = useState(false);
  const [compareLoading, setCompareLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [exportCount, setExportCount] = useState(0);
  const [narrowActionCount, setNarrowActionCount] = useState(0);
  const [exportMessage, setExportMessage] = useState("点击后等待 2 秒，期间再次操作不会重复执行。");
  const exportDemo = useDemoDelay();

  function recordIcon(message: string) {
    setIconFeedback((current) => ({ message, count: current.count + 1 }));
  }

  function exportData() {
    const nextCount = exportCount + 1;
    if (!exportDemo.begin(() => setExportMessage(`已完成 ${nextCount} 次：演示导出结束，没有生成或下载真实文件。`))) return;
    setExportCount(nextCount);
    setExportMessage(`已触发 ${nextCount} 次：正在模拟导出，约 2 秒后完成。`);
  }

  return (
    <main className="text-button-page" data-asset-identity="local-experiment" data-rain-id="text-button-page" data-slot="component-review">
      <div className="text-button-page__content">
        <header className="text-button-page__hero">
          <Link href="#components">返回组件页</Link>
          <p className="text-button-page__eyebrow">Rain Next · 组件体验</p>
          <h1 id="text-button-title" tabIndex={-1}>TextButton 文字按钮</h1>
          <p className="text-button-page__lead">轻量操作与真正链接，放在一起亲自试一试。</p>
          <p className="text-button-page__review-state">最新配方 · 视觉验收已通过</p>
          <p>当前已接入新 Token 配色，完整尺寸组合与新外观已确认。<Link href="#button-tokens">查看主题、状态与尺寸对照</Link></p>
          <p className="text-button-page__notice">演示数据，不会连接后台或修改课程</p>
        </header>

        <ReviewSection id="text-button-colors" number="01" title="颜色与状态" description="普通操作用灰蓝，需要突出时用主题蓝，有风险时用危险红。移入和按下，观察浅底反馈。">
          <div className="text-button-page__three-column">
            {tones.map(({ name, tone, action }) => (
              <div aria-label={name} className="text-button-page__tone" key={tone} role="group">
                <h3>{name}</h3>
                <div className="text-button-page__state-list">
                  <div><span>默认</span><Button onClick={() => setColorFeedback((current) => ({ name, count: current.count + 1 }))} tone={tone} variant="text">{action}</Button></div>
                  <div><span>禁用</span><Button disabled tone={tone} variant="text">{action}</Button></div>
                  <div><span>加载中</span><Button loading tone={tone} variant="text">{action}</Button></div>
                </div>
              </div>
            ))}
          </div>
          <p aria-atomic="true" className="text-button-page__feedback" role="status">
            {colorFeedback.count > 0 ? `最近操作：${colorFeedback.name}；本区已触发 ${colorFeedback.count} 次，仅本地演示。` : "可以点击默认状态；禁用与加载示例不会触发操作。"}
          </p>
          <p className="text-button-page__note">禁用淡化与双层键盘焦点已通过视觉验收。</p>
        </ReviewSection>

        <ReviewSection id="text-button-sizes" number="02" title="三档尺寸" description="12 / 13 / 14px 三档字号，配合 20 / 24 / 26px 高度，完整组合已确认。">
          <div className="text-button-page__three-column">
            {sizes.map(({ name, size, detail }) => (
              <div className="text-button-page__size" key={size}>
                <h3>{name}</h3>
                <p className="text-button-page__note">{detail}</p>
                <div className="text-button-page__action-space">
                  <Button onClick={() => setSizeFeedback((current) => ({ name, count: current.count + 1 }))} size={size} variant="text">编辑内容</Button>
                </div>
              </div>
            ))}
          </div>
          <p aria-atomic="true" className="text-button-page__feedback" role="status">
            {sizeFeedback.count > 0 ? `最近操作：${sizeFeedback.name}；本区已触发 ${sizeFeedback.count} 次，仅本地演示。` : "分别点一下，感受留白与点击范围。"}
          </p>
          <p className="text-button-page__note">示例之间保留操作间距；20px 高度不代表已经通过点击目标的无障碍验收。</p>
        </ReviewSection>

        <ReviewSection id="text-button-icons" number="03" title="图标组合" description="图标和文字共用一个点击目标。左侧识别编辑操作，右侧箭头表示展开内容。">
          <div className="text-button-page__icon-grid">
            <div>
              <h3>纯文字</h3>
              <Button loading={compareLoading} onClick={() => recordIcon("已触发编辑说明，仅本地演示。")} variant="text">编辑说明</Button>
            </div>
            <div>
              <h3>左图标</h3>
              <Button leadingIcon={<EditPencilIcon />} loading={compareLoading} onClick={() => recordIcon("已触发编辑标题，仅本地演示。")} variant="text">编辑标题</Button>
            </div>
            <div>
              <h3>右图标</h3>
              <Button aria-controls="text-button-description" aria-expanded={showDescription} loading={compareLoading} onClick={() => {
                setShowDescription(!showDescription);
                recordIcon(showDescription ? "已收起说明。" : "已展开说明。");
              }} trailingIcon={showDescription ? <DoubleArrowUpIcon /> : <DoubleArrowDownIcon />} variant="text">{showDescription ? "收起说明" : "展开说明"}</Button>
            </div>
            <div>
              <h3>双侧图标</h3>
              <Button aria-controls="text-button-edit-options" aria-expanded={showEditOptions} leadingIcon={<EditPencilIcon />} loading={compareLoading} onClick={() => {
                setShowEditOptions(!showEditOptions);
                recordIcon(showEditOptions ? "已收起编辑选项。" : "已展开编辑选项。");
              }} trailingIcon={showEditOptions ? <ArrowUpIcon /> : <ArrowDownIcon />} variant="text">编辑选项</Button>
            </div>
          </div>
          <div className="text-button-page__disclosure" hidden={!showDescription} id="text-button-description">这是当前页面内的演示说明。箭头展开内容，没有打开浮层或跳转页面。</div>
          <div className="text-button-page__disclosure" hidden={!showEditOptions} id="text-button-edit-options">编辑选项演示：左侧图标标识编辑，右侧箭头展开这一段内容，整体仍是同一个操作。</div>
          <label className="text-button-page__toggle">
            <input checked={compareLoading} data-focus="control" onChange={(event) => {
              const checked = event.currentTarget.checked;
              setCompareLoading(checked);
              setIconFeedback((current) => ({ ...current, message: checked ? "已进入加载状态对比；四个示例暂停操作，关闭开关即可恢复。" : "已恢复默认状态与原图标。" }));
            }} type="checkbox" />
            对比加载前后
          </label>
          <p aria-atomic="true" className="text-button-page__feedback" role="status">
            {iconFeedback.message}{iconFeedback.count > 0 ? ` 已触发 ${iconFeedback.count} 次。` : ""}
          </p>
          <p className="text-button-page__note">这里只做状态对比：观察左侧替换、右图标隐藏及实际宽度变化，不预设固定宽度。自动结束的真实演示在下方。</p>
          <p className="text-button-page__note">编辑默认使用线性铅笔；带“展开／收起”文案使用双箭头，普通展开区域使用单箭头。<Link href="#icons">查看完整图标库</Link></p>
        </ReviewSection>

        <ReviewSection id="text-button-loading" number="04" title="试试加载" description="保留操作原文案，使用与普通 Button 相同的加载图形。可用鼠标、Enter 或空格触发。">
          <div className="text-button-page__action-space">
            <Button loading={exportDemo.pending} onClick={exportData} tone="brand" variant="text">导出演示数据</Button>
          </div>
          <p aria-atomic="true" className="text-button-page__feedback" role="status">{exportMessage}</p>
          <p className="text-button-page__note">加载不抢走键盘位置；这不是文件下载功能。</p>
        </ReviewSection>

        <ReviewSection id="text-button-inputs" number="05" title="放进输入框" description="尾部操作始终在原位。空白或模拟不可用时禁用；输入有内容后，可以点击或按 Enter 检查。">
          <div className="text-button-page__input-grid">
            <InputExample density="default" name="常规输入框" unavailable={unavailable} />
            <InputExample density="compact" name="紧凑输入框" unavailable={unavailable} />
          </div>
          <label className="text-button-page__toggle">
            <input checked={unavailable} data-focus="control" onChange={(event) => setUnavailable(event.currentTarget.checked)} type="checkbox" />
            模拟暂不可用
          </label>
          <p aria-atomic="true" className="text-button-page__note" role="status">
            {unavailable ? "两处检查操作暂不可用，输入仍可编辑；已经开始的演示会正常结束。" : "加载时仍可编辑，结果只对应触发时的内容；点击检查后不会把焦点抢回输入框。"}
          </p>
          <p className="text-button-page__note">中文组字期间的 Enter 留给输入法；真实系统输入法和 Input 内焦点效果仍请亲自检查。</p>
        </ReviewSection>

        <ReviewSection id="text-button-links" number="06" title="真正的链接" description="链接用于跳转：不铺浅底，默认当前标签页；确需另开时，提前显示提示。">
          <div className="text-button-page__links">
            <Link href="#text-button-help">打开演示帮助</Link>
            <Link href="#text-button-help" target="_blank">另开帮助</Link>
          </div>
          <p className="text-button-page__reading">
            文字操作与页面跳转的用法不同。需要了解这些示例时，可以<Link appearance="inline" href="#text-button-help">阅读使用说明</Link>，
            再返回这里继续体验。正文在窄空间自然换行，链接保留细下划线；打开帮助不代表已读、已学完或自动保存。
          </p>
          <p className="text-button-page__note">这里都是真实本地链接，可以右键复制地址或自行选择打开方式。</p>
        </ReviewSection>

        <ReviewSection id="text-button-narrow" number="07" title="完整文字与窄空间" description="较长的短操作完整单行展示；正文链接在约 240px 的空间内自然换行，不缩字、不省略。">
          <div className="text-button-page__narrow-example">
            <div className="text-button-page__action-space">
              <Button onClick={() => setNarrowActionCount((count) => count + 1)} variant="text">为本课程重新生成课堂练习</Button>
            </div>
            <p className="text-button-page__reading">
              继续操作前，请先<Link appearance="inline" href="#text-button-help">了解课堂练习的生成方式与使用注意事项</Link>，确认内容适合当前课堂后再决定。
            </p>
          </div>
          <p aria-atomic="true" className="text-button-page__feedback" role="status">
            {narrowActionCount > 0 ? `已触发 ${narrowActionCount} 次：仅本地演示，没有生成或修改课程练习。` : "可以点击完整操作文案；这里不会生成或修改真实课程练习。"}
          </p>
        </ReviewSection>

        <footer className="text-button-page__footer">
          三档高度、禁用淡化、双层焦点、图标与加载布局，均已通过本次视觉验收。
        </footer>
      </div>
    </main>
  );
}

export function TextButtonHelpPage() {
  return (
    <main className="text-button-page" data-asset-identity="local-experiment" data-rain-id="text-button-help-page" data-slot="local-help">
      <div className="text-button-page__content">
        <header className="text-button-page__hero">
          <Link href="#text-button">返回 TextButton 验收页</Link>
          <p className="text-button-page__eyebrow">本地演示帮助</p>
          <h1 id="text-button-help-title" tabIndex={-1}>TextButton 演示帮助</h1>
          <p className="text-button-page__notice">演示数据，不会连接后台或修改课程</p>
        </header>
        <div className="text-button-page__section text-button-page__reading">
          <h2>操作与跳转，分开体验</h2>
          <p>点击文字按钮会改变当前页的演示状态；链接会导航到真正的本地地址。新标签页的提示是打开方式说明，不表示内容已保存。</p>
          <p>加载固定等待 2 秒，不执行后台请求。输入检查只记录触发时的演示内容，等待期间新增的内容不会被误报为已检查。</p>
          <p>可返回体验页，对比已确认的三种颜色、三档大小、图标组合和键盘焦点。</p>
        </div>
      </div>
    </main>
  );
}
