import { useRef, useState, type SyntheticEvent } from "react";
import * as Menu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";
import * as Select from "@radix-ui/react-select";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@rain-next/ui";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { DeleteIcon } from "@rain-next/ui/icons/delete";
import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";
import { CourseFields, ItemContent, TemplateContent, layerAttributes, selectItems, type FixtureProps } from "./content";

export function RadixFixture(settings: FixtureProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [dialog, setDialog] = useState<"edit" | "delete" | null>(null);
  const [archived, setArchived] = useState(false);
  const [sort, setSort] = useState("date");
  const [scope, setScope] = useState("all");
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const dialogInput = useRef<HTMLInputElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const attrs = layerAttributes(settings);
  const perform = (name: string) => settings.onEvent(name);
  const onSelect = (event: Event | SyntheticEvent, action?: string, close = settings.closeOnAction) => {
    if (!close) event.preventDefault();
    if (action) perform(action);
  };
  const openDialog = (value: "edit" | "delete") => { setDialog(value); setMenuOpen(false); };
  return <div className="dr-fixture" data-candidate="radix">
    <div className="dr-fixture-actions">
      <Menu.Root open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
        <Menu.Trigger asChild><Button ref={menuTrigger} variant="secondary">课程操作<ArrowDownIcon /></Button></Menu.Trigger>
        <Menu.Portal><Menu.Content {...attrs} sideOffset={6} align="start" collisionPadding={8} className="dropdown-layer dr-surface dr-menu"
          onCloseAutoFocus={event => { if (dialog) event.preventDefault(); }}>
          <Menu.Item className="dr-item" data-focus="item" aria-label="查看课程" onSelect={event => onSelect(event, "已打开课程预览")}><ItemContent label="查看课程" /></Menu.Item>
          <Menu.Item className="dr-item" data-focus="item" aria-label="记录稍后处理" onSelect={event => onSelect(event, "已记录稍后处理；此项保持菜单打开", false)}><ItemContent label="记录稍后处理" meta="保持打开" /></Menu.Item>
          <Menu.Separator className="dr-separator" />
          <Menu.Group><Menu.Label className="dr-group-label">视图设置</Menu.Label>
            <Menu.CheckboxItem className="dr-item" data-focus="item" checked={archived} onCheckedChange={value => setArchived(value === true)}
              data-selected={archived} aria-label="显示已归档" onSelect={event => onSelect(event)}><ItemContent label="显示已归档" indicator="check" /></Menu.CheckboxItem>
            <Menu.CheckboxItem className="dr-item" data-focus="item" checked disabled data-selected="true" aria-label="保留教师资料" aria-describedby="radix-locked-reason">
              <ItemContent label="保留教师资料" indicator="check" description="管理员已锁定此项，当前设置仍然生效。" descriptionId="radix-locked-reason" critical />
            </Menu.CheckboxItem>
          </Menu.Group>
          <Menu.RadioGroup value={sort} onValueChange={setSort}>
            <Menu.RadioItem value="date" className="dr-item" data-focus="item" data-selected={sort === "date"} onSelect={event => onSelect(event)} aria-label="按时间排序"><ItemContent label="按时间排序" indicator="radio" /></Menu.RadioItem>
            <Menu.RadioItem value="name" className="dr-item" data-focus="item" data-selected={sort === "name"} onSelect={event => onSelect(event)} aria-label="按名称排序"><ItemContent label="按名称排序" indicator="radio" /></Menu.RadioItem>
          </Menu.RadioGroup>
          <Menu.Separator className="dr-separator" />
          <Menu.Sub>
            <Menu.SubTrigger className="dr-item" data-focus="item" aria-label="导出"><ItemContent label="导出" submenu /></Menu.SubTrigger>
            <Menu.Portal><Menu.SubContent {...attrs} sideOffset={6} collisionPadding={8} className="dropdown-layer dr-surface dr-menu">
              <Menu.Item className="dr-item" data-focus="item" aria-label="导出当前视图" onSelect={event => onSelect(event, "已提交当前视图导出")}><ItemContent label="导出当前视图" meta="Excel" /></Menu.Item>
              <Menu.Item className="dr-item" disabled aria-label="导出成绩" aria-describedby="radix-export-reason"><ItemContent label="导出成绩" description="需要课程管理员权限" descriptionId="radix-export-reason" critical /></Menu.Item>
            </Menu.SubContent></Menu.Portal>
          </Menu.Sub>
          <Menu.Item asChild className="dr-item" data-focus="item" onSelect={event => onSelect(event, undefined, true)}><a href="#visual-review" aria-label="查看视觉对照"><ItemContent label="查看视觉对照" /></a></Menu.Item>
          <Menu.Item className="dr-item" data-focus="item" aria-label="编辑课程" onSelect={() => openDialog("edit")}><ItemContent label="编辑课程" /></Menu.Item>
          <Menu.Item className="dr-item" data-focus="item" data-tone="danger" aria-label="删除课程" onSelect={() => openDialog("delete")}><ItemContent label="删除课程" leading={<DeleteIcon />} /></Menu.Item>
        </Menu.Content></Menu.Portal>
      </Menu.Root>

      <Popover.Root open={panelOpen} onOpenChange={setPanelOpen} modal={false}>
        <Popover.Trigger asChild><Button>新建学习单元<ArrowDownIcon /></Button></Popover.Trigger>
        <Popover.Portal><Popover.Content {...attrs} sideOffset={6} align="start" collisionPadding={8} className="dropdown-layer dr-surface dr-panel"
          aria-labelledby="radix-template-title" aria-describedby="radix-template-description"
          onOpenAutoFocus={event => { event.preventDefault(); searchInput.current?.focus(); }}>
          <header className="dr-panel-heading"><h2 id="radix-template-title">选择学习模板</h2><p id="radix-template-description">选择模板后可以继续修改内容。</p></header>
          <TemplateContent inputRef={searchInput} onComplete={label => { perform(`已创建：${label}`); setPanelOpen(false); }} />
        </Popover.Content></Popover.Portal>
      </Popover.Root>

      <Select.Root value={scope} onValueChange={setScope}>
        <Select.Trigger className="dr-select-trigger" data-focus="control" aria-label="课程范围"><Select.Value /><Select.Icon><ArrowDownIcon /></Select.Icon></Select.Trigger>
        <Select.Portal><Select.Content {...attrs} position="popper" sideOffset={6} align="start" collisionPadding={8} className="dropdown-layer dr-surface dr-menu"><Select.Viewport>
          {selectItems.map(item => <Select.Item className="dr-item" data-focus="item" key={item.value} value={item.value} disabled={item.disabled} data-selected={scope === item.value}>
            <Select.ItemIndicator className="dr-selection-mark"><CheckBoldIcon /></Select.ItemIndicator><Select.ItemText data-slot="label">{item.label}</Select.ItemText>
          </Select.Item>)}
        </Select.Viewport></Select.Content></Select.Portal>
      </Select.Root>
    </div>

    <Dialog.Root open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}>
      <Dialog.Portal>
        <Dialog.Overlay {...attrs} className="dropdown-layer dr-backdrop" />
        <Dialog.Content {...attrs} className="dropdown-layer dr-surface dr-dialog"
          onOpenAutoFocus={event => { if (dialog === "edit") { event.preventDefault(); dialogInput.current?.focus(); } }}
          onCloseAutoFocus={event => { event.preventDefault(); menuTrigger.current?.focus(); }}>
          <header className="dr-panel-heading"><Dialog.Title>{dialog === "edit" ? "编辑课程" : "删除课程"}</Dialog.Title><Dialog.Description>{dialog === "edit" ? "调整课程资料，保存后生效。" : "此处仅演示确认流程，不会删除真实数据。"}</Dialog.Description></header>
          {dialog === "edit" ? <CourseFields inputRef={dialogInput} /> : <p className="dr-delete-copy">将删除「设计方法与实践」课程及其全部教学资料，请确认操作范围。</p>}
          <footer className="dr-dialog-footer">
            <Dialog.Close asChild><Button variant="secondary">取消</Button></Dialog.Close>
            <Button tone={dialog === "delete" ? "danger" : "default"} onClick={() => { perform(dialog === "edit" ? "课程资料已保存" : "已完成删除流程演示"); setDialog(null); }}>{dialog === "edit" ? "保存课程" : "确认删除"}</Button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </div>;
}
