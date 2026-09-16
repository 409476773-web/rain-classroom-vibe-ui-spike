import { useEffect, useRef, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { DensityProvider, type Density } from "@rain-next/foundations";
import { Button, Checkbox, DropdownMenu, IconButton, Input, Link, Popover, Radio, RadioGroup, Tabs, defineRainLocalRecipe } from "@rain-next/ui";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { DeleteIcon } from "@rain-next/ui/icons/delete";
import { CopyIcon } from "@rain-next/ui/icons/copy";
import { RatingStarIcon } from "@rain-next/ui/icons/rating-star";
import linearChart from "./option-chart-linear.svg";
import parabolaChart from "./option-chart-parabola.svg";
import "./dropdown-page.css";

const templates = [
  { value: "linear", label: "函数图像练习", description: "从图像理解变化趋势", category: "数学", image: linearChart },
  { value: "parabola", label: "函数单元测验", description: "检查二次函数的理解", category: "数学", image: parabolaChart },
  { value: "discussion", label: "课堂观点讨论", description: "以一个图像问题发起讨论", category: "讨论", image: linearChart },
];
const templateRadioRecipe = defineRainLocalRecipe({
  id: "dropdown-template-radio", origin: "ui-radio", scope: "feature",
  classes: { root: "dropdown-template-radio gap-rain-6", label: "text-rain-size-13 leading-rain-20", description: "text-rain-size-12 leading-rain-18" },
  modifiedParts: ["root", "label", "description"], candidateTokens: [], promotionStatus: "not-proposed",
});
const templateTabsRecipe = defineRainLocalRecipe({
  id: "dropdown-template-tabs", origin: "ui-tabs", scope: "feature",
  classes: { root: "dropdown-template-tabs" }, modifiedParts: ["root"], candidateTokens: [], promotionStatus: "not-proposed",
});

function TemplateContent({ onComplete }: { onComplete: (label: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null), [pending, setPending] = useState(false), [error, setError] = useState(false);
  const [query, setQuery] = useState(""), [category, setCategory] = useState("全部"), [favorites, setFavorites] = useState<string[]>([]);
  const attempt = useRef(0), timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  function create() {
    if (!selected || pending) return;
    setPending(true); setError(false);
    timer.current = setTimeout(() => {
      setPending(false);
      if (attempt.current++ === 0) { setError(true); return; }
      onComplete(templates.find(item => item.value === selected)!.label);
    }, 450);
  }
  return <>
    <div className="dropdown-panel-body">
      <Input aria-label="搜索模板" placeholder="搜索模板" value={query} disabled={pending} onChange={event => setQuery(event.target.value)} />
      <Tabs size={28} appearance="contained" aria-label="模板分类" value={category} onValueChange={value => { if (value !== null) setCategory(String(value)); }}
        panelMount="unmount" localRecipe={templateTabsRecipe} items={["全部", "数学", "讨论"].map(category => {
          const visible = templates.filter(item => (category === "全部" || item.category === category) && `${item.label} ${item.description}`.includes(query.trim()));
          return { value: category, label: category, disabled: pending, content: <>
            <RadioGroup legend="学习模板" legendHidden options={visible.map(({ value, label, description }) => ({ value, label, description }))}
              value={selected} onValueChange={setSelected} disabled={pending} renderOption={props => {
                const item = templates.find(item => item.value === props.value)!;
                const favorite = favorites.includes(item.value);
                return <div className="dropdown-template-row">
                  <img src={item.image} alt="" />
                  <Radio {...props} localRecipe={templateRadioRecipe} />
                  <IconButton icon={<RatingStarIcon />} size="24/14" aria-label={`${favorite ? "取消收藏" : "收藏"} ${item.label}`}
                    aria-pressed={favorite} highlight={favorite ? "icon" : "none"} disabled={pending}
                    onClick={() => setFavorites(values => favorite ? values.filter(value => value !== item.value) : [...values, item.value])} />
                </div>;
              }} />
            {!visible.length && <p role="status">没有匹配的模板，请调整搜索或分类。</p>}
          </> };
        })} />
      {error && <p role="alert">暂时未能创建，选择和搜索已保留，请重试。</p>}
    </div>
    <footer className="dropdown-panel-footer"><span>{selected ? "已选择 1 个模板" : "选择一个模板开始"}</span>
      <Button variant="primary" disabled={!selected} loading={pending} onClick={create}>{error ? "重试创建" : "创建学习单元"}</Button>
    </footer>
  </>;
}

export function DropdownPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light"), [density, setDensity] = useState<Density>("default");
  const [closeOnAction, setCloseOnAction] = useState(true), [courseOpen, setCourseOpen] = useState(false), [confirm, setConfirm] = useState(false);
  const [archived, setArchived] = useState(false), [sort, setSort] = useState("date"), [event, setEvent] = useState("尚未操作");
  const [typeOpen, setTypeOpen] = useState(false), [panelOpen, setPanelOpen] = useState(false), [fromTypeMenu, setFromTypeMenu] = useState(false);
  const courseTrigger = useRef<HTMLElement>(null), typeTrigger = useRef<HTMLElement>(null);
  return <DensityProvider density={density}>
    <main className="core-ui-shell dropdown-page" data-rain-id="dropdown-page" data-asset-identity="local-experiment" data-rain-theme={theme}>
      <header className="flex flex-col gap-rain-12">
        <Link href="#components">返回组件</Link>
        <h1 id="dropdown-title" tabIndex={-1} className="m-rain-0 rain-type-page-title">Dropdown 下拉菜单</h1>
        <p className="m-rain-0 rain-type-reading">选择一份完整用法，再按任务替换内容。以下操作使用演示数据。</p>
        <div className="flex flex-wrap items-center gap-rain-12" aria-label="预览设置">
          <Button aria-pressed={theme === "light"} variant={theme === "light" ? "primary" : "secondary"} onClick={() => setTheme("light")}>浅色</Button>
          <Button aria-pressed={theme === "dark"} variant={theme === "dark" ? "primary" : "secondary"} onClick={() => setTheme("dark")}>深色</Button>
          <Button variant="text" aria-pressed={density === "compact"} onClick={() => setDensity(density === "compact" ? "default" : "compact")}>紧凑密度</Button>
          <Checkbox label="操作后关闭" checked={closeOnAction} onCheckedChange={setCloseOnAction} />
        </div>
      </header>

      <section className="core-family" aria-labelledby="menu-width-title">
        <h2 id="menu-width-title">短菜单 · 按内容定宽</h2>
        <p>默认宽度随最长条目和必要留白收缩，最小 140px。需要固定布局时，也可指定宽度。</p>
        <div className="flex flex-wrap gap-rain-12">
          {([undefined, 240, 400] as const).map(width => <DropdownMenu.Root key={width ?? "auto"}>
            <DropdownMenu.Trigger render={<Button>{width ? `固定 ${width}px` : "内容自适应"}</Button>} />
            <DropdownMenu.Content width={width}>
              <DropdownMenu.Item label="查看资料" onClick={() => setEvent("已打开资料预览")} />
              <DropdownMenu.Item label="记录稍后处理" onClick={() => setEvent("已记录稍后处理")} />
            </DropdownMenu.Content>
          </DropdownMenu.Root>)}
        </div>
      </section>

      <section className="core-family" aria-labelledby="course-menu-title">
        <h2 id="course-menu-title">课程卡片 · 更多操作</h2>
        <div className="flex flex-wrap items-center justify-between gap-rain-16">
          <div><h3>设计方法与实践</h3><p>12 个学习单元 · 36 名学习者 · 演示课程</p></div>
          <DropdownMenu.Root open={courseOpen} onOpenChange={setCourseOpen} closeOnAction={closeOnAction}>
            <DropdownMenu.Trigger ref={courseTrigger} render={<Button>课程更多<ArrowDownIcon /></Button>} />
            <DropdownMenu.Content width={240} finalFocus={confirm ? false : undefined}>
              <DropdownMenu.Item label="查看课程" onClick={() => setEvent("已打开课程预览")} />
              <DropdownMenu.Item label="复制课程" leading={<CopyIcon />} onClick={() => setEvent("已复制课程（演示）")} />
              <DropdownMenu.Item label="记录稍后处理" closeOnClick={false} meta="保持打开" onClick={() => setEvent("已记录稍后处理")} />
              <DropdownMenu.SubmenuRoot><DropdownMenu.SubmenuTrigger label="导出" />
                <DropdownMenu.Content width={280}>
                  <DropdownMenu.Item label="导出当前视图" meta="Excel" onClick={() => setEvent("已提交当前视图导出")} />
                  <DropdownMenu.Item label="导出学生成绩" disabled description="需要课程管理员权限，完整成绩包含本课程所有教学班。" critical />
                </DropdownMenu.Content>
              </DropdownMenu.SubmenuRoot>
              <DropdownMenu.LinkItem label="查看组件说明" href="#dropdown" selected aria-current="page" closeOnClick />
              <DropdownMenu.Separator />
              <DropdownMenu.Item label="删除课程" leading={<DeleteIcon />} tone="danger" onClick={() => { setConfirm(true); setCourseOpen(false); }} />
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </section>

      <section className="core-family" aria-labelledby="view-menu-title">
        <h2 id="view-menu-title">表格 · 视图设置</h2>
        <p>连续调整时保持打开；底部“完成设置”结束操作。单个按钮铺满一行，两个按钮时各自按内容定宽。</p>
        <div className="flex flex-wrap gap-rain-12">
          <DropdownMenu.Root closeOnAction={false}>
            <DropdownMenu.Trigger render={<Button>视图设置<ArrowDownIcon /></Button>} />
            <DropdownMenu.Content>
              <DropdownMenu.Group><DropdownMenu.GroupLabel>显示内容</DropdownMenu.GroupLabel>
                <DropdownMenu.CheckboxItem label="显示已归档" checked={archived} onCheckedChange={setArchived} />
                <DropdownMenu.CheckboxItem label="保留教师资料" checked disabled description="管理员已锁定此项，当前设置仍然生效。" critical />
              </DropdownMenu.Group>
              <DropdownMenu.Separator />
              <DropdownMenu.RadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenu.GroupLabel>排序方式</DropdownMenu.GroupLabel>
                <DropdownMenu.RadioItem label="按时间排序" value="date" />
                <DropdownMenu.RadioItem label="按名称排序" value="name" />
              </DropdownMenu.RadioGroup>
              <DropdownMenu.Separator />
              <div className="flex justify-end gap-rain-8 px-rain-4 py-rain-6">
                <DropdownMenu.Item label="完成设置" closeOnClick nativeButton render={props =>
                  <Button {...props} className="only:w-full" size="small" variant="secondary">完成设置</Button>} />
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Popover.Root><Popover.Trigger render={<Button>视图设置面板版</Button>} />
            <Popover.Content className="gap-rain-12">
              <Popover.Title>视图设置面板</Popover.Title>
              <Checkbox label="显示已归档" checked={archived} onCheckedChange={setArchived} />
              <RadioGroup legend="排序方式" options={[{ value: "date", label: "按时间排序" }, { value: "name", label: "按名称排序" }]} value={sort} onValueChange={setSort} />
              <div className="flex justify-end gap-rain-8"><Popover.Close render={<Button className="only:w-full" size="small" variant="secondary">完成设置</Button>} /></div>
            </Popover.Content>
          </Popover.Root>
        </div>
        <p role="status">{archived ? "包含已归档" : "隐藏已归档"} · {sort === "date" ? "按时间排序" : "按名称排序"}</p>
      </section>

      <section className="core-family" aria-labelledby="unit-menu-title">
        <h2 id="unit-menu-title">新建学习单元 · 类型与模板</h2>
        <p>常规操作从菜单开始；模板选择在独立面板里完成。</p>
        <div className="flex flex-wrap gap-rain-12">
          <DropdownMenu.Root open={typeOpen} onOpenChange={setTypeOpen}>
            <DropdownMenu.Trigger ref={typeTrigger} render={<Button variant="primary">新建学习单元<ArrowDownIcon /></Button>} />
            <DropdownMenu.Content finalFocus={panelOpen ? false : undefined}>
              <DropdownMenu.Item label="新建空白单元" description="从一个标题开始组织教学内容" onClick={() => setEvent("已创建空白单元（演示）")} />
              <DropdownMenu.Item label="从模板新建" description="浏览现有模板，再调整内容" onClick={() => { setFromTypeMenu(true); setPanelOpen(true); setTypeOpen(false); }} />
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <Popover.Root open={panelOpen} onOpenChange={setPanelOpen}>
            <Popover.Trigger render={<Button onClick={() => setFromTypeMenu(false)}>浏览模板</Button>} />
            <Popover.Content width={360} className="dropdown-template-panel" finalFocus={fromTypeMenu ? typeTrigger : undefined}>
              <header className="dropdown-panel-heading"><Popover.Title>选择学习模板</Popover.Title><Popover.Description>选择模板后可以继续修改内容。</Popover.Description></header>
              <TemplateContent onComplete={label => { setEvent(`已创建：${label}`); setPanelOpen(false); }} />
            </Popover.Content>
          </Popover.Root>
        </div>
      </section>
      <div className="core-family"><p role="status" data-testid="dropdown-event">{event}</p><Input aria-label="菜单外输入" placeholder="可点击此处离开菜单" /></div>
      <section className="core-family" aria-labelledby="dropdown-usage-title">
        <h2 id="dropdown-usage-title">使用与改造边界</h2>
        <p>操作、链接和单选/复选设置使用 DropdownMenu；有搜索、预览或独立按钮的内容使用 Popover。默认使用完整示例，需要时替换触发器、条目内容或面板区域。</p>
        <p>菜单默认随内容定宽，最小 140px，较长内容在 320px 内换行；可显式指定更宽的尺寸。内容面板从 320/360px 开始，均随可用视口适配。Escape、Tab 与外部点击各自保留退出规则。</p>
        <p>当前为未发布候选，已有运行视觉已完成人工验收；菜单宽度调整已确认，底部结束按钮待视觉确认。颜色用途问题独立保留；演示首次创建会失败，重试后成功。</p>
      </section>
      <Dialog.Root open={confirm} onOpenChange={setConfirm}><Dialog.Portal>
        <Dialog.Backdrop data-rain-theme={theme} className="dropdown-example-backdrop" />
        <Dialog.Popup data-rain-theme={theme} className="dropdown-example-dialog" finalFocus={courseTrigger}>
          <Dialog.Title>删除课程</Dialog.Title><Dialog.Description>将删除「设计方法与实践」课程及其全部教学资料。此处只演示流程，不会删除真实数据。</Dialog.Description>
          <div className="flex gap-rain-8"><Dialog.Close render={<Button>取消</Button>} /><Button tone="danger" variant="primary" onClick={() => { setConfirm(false); setEvent("已完成删除流程演示"); }}>确认删除</Button></div>
        </Dialog.Popup>
      </Dialog.Portal></Dialog.Root>
    </main>
  </DensityProvider>;
}
