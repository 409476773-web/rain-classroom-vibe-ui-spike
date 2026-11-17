import { Button, DatePicker, DropdownMenu } from "@rain-next/ui";
import { TableSelectionBar } from "../patterns/table/table-selection-bar";
import { OwnerChoices } from "./cell-content";

export function RowSelectionBar({ count, hiddenCount, disabled, guard, onClear, onOwner, onDate }: {
  count: number; hiddenCount: number; disabled: boolean; guard: () => boolean;
  onClear: () => void; onOwner: (owner: string) => void; onDate: (date: Date | null) => void;
}) {
  return <div className="ca-selection-slot" inert={disabled || undefined} onPointerDownCapture={event => {
    if (!guard()) { event.preventDefault(); event.stopPropagation(); }
  }}>
    {count ? <TableSelectionBar className="ca-selection-bar" aria-label="批量操作" onClear={onClear}
      status={<span className="ca-selection-count" role="status">已选 <strong>{count}</strong> 行{hiddenCount > 0 && <span>，含 {hiddenCount} 行已折叠</span>}</span>}>
      <DropdownMenu.Root><DropdownMenu.Trigger render={<Button variant="tertiary" size="small">修改负责人</Button>} />
        <DropdownMenu.Content width={200}><DropdownMenu.Group><DropdownMenu.GroupLabel>应用到已选 {count} 行</DropdownMenu.GroupLabel><OwnerChoices onSelect={onOwner} /></DropdownMenu.Group></DropdownMenu.Content>
      </DropdownMenu.Root>
      <DatePicker size={32} value={null} placeholder="修改截止日期" aria-label={`批量修改已选${count}行的截止日期`}
        onValueChange={onDate} />
    </TableSelectionBar> : <p className="ca-selection-guide">使用行首勾选框选择任务，点击内容直接操作；表头可全选当前页。</p>}
  </div>;
}
