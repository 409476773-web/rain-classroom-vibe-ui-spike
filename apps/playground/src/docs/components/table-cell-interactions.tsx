import { CellActionExample } from "../../cell-action-review/review";
import { DocCode } from "./component-doc";

export function TableCellInteractions({active,navigationGuard}:{active:boolean;navigationGuard:{current:()=>boolean}}) {
  return <div className="table-doc-section table-cell-interactions">
    <section aria-labelledby="table-direct-edit-title"><h2 id="table-direct-edit-title">单元格直接编辑与行多选</h2><p className="table-doc-note">悬停查看可用操作，点击内容直接修改；行首勾选框选择记录。试用下方的说明、人物选择、图片预览与批量修改。</p>
      <CellActionExample embedded active={active} navigationGuard={navigationGuard}/>
    </section>
    <section aria-labelledby="table-cell-contract"><h2 id="table-cell-contract">已确认的交互规则</h2><dl className="table-doc-facts">
      <div><dt>编辑与选行</dt><dd>独立字段直接编辑；完整记录另设编辑入口。只有行首勾选框选行，点击空白只激活单元格。</dd></div>
      <div><dt>操作分工</dt><dd>左侧仅行首：勾选 → 移动 → 新增。右侧：当前字段的编辑、选择、说明、预览或管理。</dd></div>
      <div><dt>层级与范围</dt><dd>父子独立勾选；折叠保留选择。表头全选当前页可选记录，包含折叠子行；批量条说明隐藏数量。</dd></div>
      <div><dt>阅读与对齐</dt><dd>默认内容与表头同轴。悬停或激活后只为字段操作让位，内容始终垂直居中；展开按钮默认无底色。</dd></div>
      <div><dt>状态与反馈</dt><dd>空值留白；不可编辑统一锁图标。激活格承接编辑边界，内部输入无第二层蓝框；非法值原位修正。</dd></div>
      <div><dt>气泡与抽屉</dt><dd>短说明与集合管理就近使用气泡；图片、文档与较大内容使用右侧抽屉。桌面无遮罩，关闭回到来源格。</dd></div>
    </dl></section>
    <section aria-labelledby="table-cell-visual"><h2 id="table-cell-visual">视觉与内容规范</h2><dl className="table-doc-facts">
      <div><dt>按钮</dt><dd>18px 画布 / 12px 图标 / 4px 间隔；不透明浅中性底。操作提示2–4字，完整说明保留给辅助技术。</dd></div>
      <div><dt>勾选框</dt><dd>18px 画布内14px框体；未选使用 Border/Neutral/2，选中与半选保留品牌色。</dd></div>
      <div><dt>边线与底色</dt><dd>边线 Border/Neutral/3；单元格悬停 Neutral/Alpha/6，行选中 Brand/Alpha/4。表头不添加编辑图标或只读标签。</dd></div>
      <div><dt>人物</dt><dd>头像24px，位于姓名左侧；下拉选项保持对应头像与姓名。</dd></div>
      <div><dt>图片与附件</dt><dd>始终分列。图片32px缩略图，前两张＋剩余数量；附件16px格式图标，首文件＋独立数量入口，保留扩展名。</dd></div>
      <div><dt>重要数值</dt><dd>仅关键数据使用 Data 字体加粗；中文单位独立，12px、常规字重与浅色。</dd></div>
    </dl></section>
    <section aria-labelledby="table-cell-usage"><h2 id="table-cell-usage">组合调用</h2><p className="table-doc-note">基础部件从 @rain-next/ui 导入；气泡与预览抽屉从 Table Pattern 导入。使用宿主自己的记录、字段和回调。</p>
      <DocCode code={`import {
  Table, TableBody, TableRow, TableActionCell, TableActionHeader,
  TableRowActions, TableRowCheckbox, TableCellActionButton, TableInlineInput,
} from "@rain-next/ui";

<Table interaction="cell">
  <TableBody><TableRow selected={selected}>
    <TableActionCell identity active={active} editing={editing}
      leading={<TableRowActions
        selection={<TableRowCheckbox aria-label="选择当前记录"
          checked={selected} onCheckedChange={setSelected} />}
        move={moveButton} add={addMenu} />}
      disclosure={disclosureButton} actions={fieldActions} actionCount={2}
      onActivate={activateCell}>
      {editing
        ? <TableInlineInput aria-label="编辑名称" value={draft}
            onValueChange={setDraft} onKeyDown={handleEditKeys} />
        : <button onClick={beginEdit}>{name}</button>}
    </TableActionCell>
  </TableRow></TableBody>
</Table>`}/>
      <details><summary>部件、参数与使用边界</summary><dl className="table-doc-facts">
        <div><dt>TableActionCell</dt><dd>active / editing / invalid；leading / disclosure / actions；identity / depth / leadingSpace；align / actionCount / persistentActions / onActivate。actions 只作用于当前字段。</dd></div>
        <div><dt>TableActionHeader</dt><dd>selection / identity / leadingSpace；与表体共用文字轴与行首全选位置。</dd></div>
        <div><dt>TableRowActions</dt><dd>selection / move / add 三个有序槽，仅放在行首单元格。Checkbox 状态、全选范围与父子关系由宿主提供。</dd></div>
        <div><dt>TableCellActionButton</dt><dd>icon / tip / aria-label 及按钮原生事件；可用作 DropdownMenu.Trigger。tip 为短操作名，aria-label 包含完整上下文。</dd></div>
        <div><dt>TableInlineInput</dt><dd>沿用 Input 的受控输入与原生事件。宿主处理 Enter / Esc / blur、IME、校验、草稿和保存；只能在带有激活边界的格内使用。</dd></div>
        <div><dt>内容与只读</dt><dd>TablePersonValue、TableImageValue、TableFileValue、TableFileName、TableDataValue；TableReadonlyMark 接收不可编辑的 reason。</dd></div>
        <div><dt>TableCellPopover</dt><dd>open / title / description / anchor / children / footer，关闭原因通过 onOpenChange 交还宿主；不内置确认或保存策略。</dd></div>
        <div><dt>TablePreviewDrawer</dt><dd>open / items / selectedId / collection / onSelect / onClose / finalFocus。一次只传一个字段的图片或文件集合，宿主提供权限允许的地址。</dd></div>
      </dl></details>
    </section>
  </div>;
}
