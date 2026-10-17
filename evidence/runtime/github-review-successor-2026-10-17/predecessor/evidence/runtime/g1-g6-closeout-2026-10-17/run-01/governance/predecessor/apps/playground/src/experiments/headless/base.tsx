import { useRef, useState } from "react";
import { Menu } from "@base-ui/react/menu";
import { Popover } from "@base-ui/react/popover";
import { Select } from "@base-ui/react/select";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@rain-next/ui";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import { DeleteIcon } from "@rain-next/ui/icons/delete";
import { CheckBoldIcon } from "@rain-next/ui/icons/check-bold";
import { CourseFields, ItemContent, TemplateContent, layerAttributes, selectItems, type FixtureProps } from "./content";

export function BaseFixture(settings: FixtureProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [dialog, setDialog] = useState<"edit" | "delete" | null>(null);
  const [archived, setArchived] = useState(false);
  const [sort, setSort] = useState("date");
  const [scope, setScope] = useState<string | null>("all");
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const dialogInput = useRef<HTMLInputElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const attrs = layerAttributes(settings);
  const perform = (name: string) => settings.onEvent(name);
  const openDialog = (value: "edit" | "delete") => { setDialog(value); setMenuOpen(false); };
  return <div className="dr-fixture" data-candidate="base">
    <div className="dr-fixture-actions">
      <Menu.Root open={menuOpen} onOpenChange={setMenuOpen} modal={false}>
        <Menu.Trigger render={<Button ref={menuTrigger} variant="secondary">课程操作<ArrowDownIcon /></Button>} />
        <Menu.Portal><Menu.Positioner sideOffset={6} align="start" collisionPadding={8} className="dr-positioner">
          <Menu.Popup {...attrs} className="dropdown-layer dr-surface dr-menu" finalFocus={dialog ? false : undefined}>
            <Menu.Item className="dr-item" data-focus="item" aria-label="查看课程" closeOnClick={settings.closeOnAction} onClick={() => perform("已打开课程预览")}><ItemContent label="查看课程" /></Menu.Item>
            <Menu.Item className="dr-item" data-focus="item" aria-label="记录稍后处理" closeOnClick={false} onClick={() => perform("已记录稍后处理；此项保持菜单打开")}><ItemContent label="记录稍后处理" meta="保持打开" /></Menu.Item>
            <Menu.Separator className="dr-separator" />
            <Menu.Group><Menu.GroupLabel className="dr-group-label">视图设置</Menu.GroupLabel>
              <Menu.CheckboxItem className="dr-item" data-focus="item" checked={archived} onCheckedChange={setArchived}
                data-selected={archived} aria-label="显示已归档" closeOnClick={settings.closeOnAction}><ItemContent label="显示已归档" indicator="check" /></Menu.CheckboxItem>
              <Menu.CheckboxItem className="dr-item" data-focus="item" checked disabled data-selected="true" aria-label="保留教师资料" aria-describedby="base-locked-reason">
                <ItemContent label="保留教师资料" indicator="check" description="管理员已锁定此项，当前设置仍然生效。" descriptionId="base-locked-reason" critical />
              </Menu.CheckboxItem>
            </Menu.Group>
            <Menu.RadioGroup value={sort} onValueChange={setSort}>
              <Menu.RadioItem value="date" className="dr-item" data-focus="item" data-selected={sort === "date"} closeOnClick={settings.closeOnAction} aria-label="按时间排序"><ItemContent label="按时间排序" indicator="radio" /></Menu.RadioItem>
              <Menu.RadioItem value="name" className="dr-item" data-focus="item" data-selected={sort === "name"} closeOnClick={settings.closeOnAction} aria-label="按名称排序"><ItemContent label="按名称排序" indicator="radio" /></Menu.RadioItem>
            </Menu.RadioGroup>
            <Menu.Separator className="dr-separator" />
            <Menu.SubmenuRoot>
              <Menu.SubmenuTrigger className="dr-item" data-focus="item" aria-label="导出"><ItemContent label="导出" submenu /></Menu.SubmenuTrigger>
              <Menu.Portal><Menu.Positioner side="right" sideOffset={6} align="start" collisionPadding={8} className="dr-positioner">
                <Menu.Popup {...attrs} className="dropdown-layer dr-surface dr-menu">
                  <Menu.Item className="dr-item" data-focus="item" aria-label="导出当前视图" closeOnClick={settings.closeOnAction} onClick={() => perform("已提交当前视图导出")}><ItemContent label="导出当前视图" meta="Excel" /></Menu.Item>
                  <Menu.Item className="dr-item" disabled aria-label="导出成绩" aria-describedby="base-export-reason"><ItemContent label="导出成绩" description="需要课程管理员权限" descriptionId="base-export-reason" critical /></Menu.Item>
                </Menu.Popup>
              </Menu.Positioner></Menu.Portal>
            </Menu.SubmenuRoot>
            <Menu.LinkItem className="dr-item" data-focus="item" href="#visual-review" closeOnClick aria-label="查看视觉对照"><ItemContent label="查看视觉对照" /></Menu.LinkItem>
            <Menu.Item className="dr-item" data-focus="item" aria-label="编辑课程" onClick={() => openDialog("edit")}><ItemContent label="编辑课程" /></Menu.Item>
            <Menu.Item className="dr-item" data-focus="item" data-tone="danger" aria-label="删除课程" onClick={() => openDialog("delete")}><ItemContent label="删除课程" leading={<DeleteIcon />} /></Menu.Item>
          </Menu.Popup>
        </Menu.Positioner></Menu.Portal>
      </Menu.Root>

      <Popover.Root open={panelOpen} onOpenChange={setPanelOpen} modal={false}>
        <Popover.Trigger render={<Button>新建学习单元<ArrowDownIcon /></Button>} />
        <Popover.Portal><Popover.Positioner sideOffset={6} align="start" collisionPadding={8} className="dr-positioner">
          <Popover.Popup {...attrs} className="dropdown-layer dr-surface dr-panel" initialFocus={searchInput}>
            <header className="dr-panel-heading"><Popover.Title>选择学习模板</Popover.Title><Popover.Description>选择模板后可以继续修改内容。</Popover.Description></header>
            <TemplateContent inputRef={searchInput} onComplete={label => { perform(`已创建：${label}`); setPanelOpen(false); }} />
          </Popover.Popup>
        </Popover.Positioner></Popover.Portal>
      </Popover.Root>

      <Select.Root items={selectItems} value={scope} onValueChange={setScope}>
        <Select.Trigger className="dr-select-trigger" data-focus="control" aria-label="课程范围"><Select.Value /><Select.Icon><ArrowDownIcon /></Select.Icon></Select.Trigger>
        <Select.Portal><Select.Positioner alignItemWithTrigger={false} sideOffset={6} align="start" collisionPadding={8} className="dr-positioner">
          <Select.Popup {...attrs} className="dropdown-layer dr-surface dr-menu"><Select.List>
            {selectItems.map(item => <Select.Item className="dr-item" data-focus="item" key={item.value} value={item.value} disabled={item.disabled} data-selected={scope === item.value}>
              <Select.ItemIndicator className="dr-selection-mark"><CheckBoldIcon /></Select.ItemIndicator><Select.ItemText data-slot="label">{item.label}</Select.ItemText>
            </Select.Item>)}
          </Select.List></Select.Popup>
        </Select.Positioner></Select.Portal>
      </Select.Root>
    </div>

    <Dialog.Root open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}>
      <Dialog.Portal>
        <Dialog.Backdrop {...attrs} className="dropdown-layer dr-backdrop" />
        <Dialog.Popup {...attrs} className="dropdown-layer dr-surface dr-dialog" initialFocus={dialog === "edit" ? dialogInput : true} finalFocus={menuTrigger}>
          <header className="dr-panel-heading"><Dialog.Title>{dialog === "edit" ? "编辑课程" : "删除课程"}</Dialog.Title><Dialog.Description>{dialog === "edit" ? "调整课程资料，保存后生效。" : "此处仅演示确认流程，不会删除真实数据。"}</Dialog.Description></header>
          {dialog === "edit" ? <CourseFields inputRef={dialogInput} /> : <p className="dr-delete-copy">将删除「设计方法与实践」课程及其全部教学资料，请确认操作范围。</p>}
          <footer className="dr-dialog-footer">
            <Dialog.Close render={<Button variant="secondary">取消</Button>} />
            <Button tone={dialog === "delete" ? "danger" : "default"} onClick={() => { perform(dialog === "edit" ? "课程资料已保存" : "已完成删除流程演示"); setDialog(null); }}>{dialog === "edit" ? "保存课程" : "确认删除"}</Button>
          </footer>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  </div>;
}
