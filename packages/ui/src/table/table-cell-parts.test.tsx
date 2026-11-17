import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Table, TableBody, TableRow } from "./table";
import { AddBoldIcon } from "../icons/add-bold";
import {
  TableActionCell, TableCellActionButton, TableRowActions, TableRowCheckbox,
  TableInlineInput, TableReadonlyMark, TableImageValue, TableFileValue, TablePersonValue,
} from "./table-cell-parts";

describe("Table direct editing parts", () => {
  it("selects only through the checkbox and keeps row actions in the approved order", () => {
    const select = vi.fn(), activate = vi.fn(), edit = vi.fn(), move = vi.fn();
    render(<Table interaction="cell"><TableBody><TableRow><TableActionCell identity onActivate={activate}
      leading={<TableRowActions selection={<TableRowCheckbox aria-label="选择记录" defaultChecked={false} onCheckedChange={select}/>}
        move={<TableCellActionButton tip="移动" aria-label="移动此记录" icon={<AddBoldIcon/>} onClick={move}/>}
        add={<TableCellActionButton tip="新增" aria-label="新增子记录" icon={<AddBoldIcon/>}/>}/>}
    ><button onClick={edit}>记录名称</button></TableActionCell></TableRow></TableBody></Table>);
    const row = screen.getByRole("row");
    expect(Array.from(row.querySelectorAll('input[type=checkbox],button')).map(el => el.getAttribute("aria-label") ?? el.textContent))
      .toEqual(["选择记录", "移动此记录", "新增子记录", "记录名称"]);
    fireEvent.click(screen.getByRole("cell"));
    expect(activate).toHaveBeenCalledOnce(); expect(select).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", {name:"记录名称"}));
    fireEvent.click(screen.getByRole("button", {name:"移动此记录"}));
    expect(edit).toHaveBeenCalledOnce(); expect(move).toHaveBeenCalledOnce();
    expect(select).not.toHaveBeenCalled(); expect(activate).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("checkbox")); expect(select).toHaveBeenCalledWith(true);
  });

  it("retains a native mixed checkbox with an accessible name", () => {
    render(<TableRowCheckbox aria-label="全选本页" checked={false} indeterminate onCheckedChange={() => {}}/>);
    expect(screen.getByRole("checkbox",{name:"全选本页"})).toBePartiallyChecked();
  });

  it("separates the cell edit boundary and the controlled input", () => {
    const change = vi.fn();
    render(<Table><TableBody><TableRow><TableActionCell active editing invalid>
      <TableInlineInput aria-label="修改分数" value="101" onValueChange={change} aria-invalid/>
    </TableActionCell></TableRow></TableBody></Table>);
    expect(screen.getByRole("cell")).toHaveAttribute("data-editing");
    expect(screen.getByRole("cell")).toHaveAttribute("data-invalid");
    fireEvent.change(screen.getByRole("textbox"), {target:{value:"98"}}); expect(change).toHaveBeenCalledWith("98");
  });

  it("retains a detailed readonly reason while using the uniform icon", () => {
    render(<TableReadonlyMark reason="成绩已归档"/>);
    expect(screen.getByRole("img", {name:"不可编辑：成绩已归档"})).toHaveAttribute("tabindex","0");
  });

  it("leaves an unfilled collection blank", () => {
    const {container} = render(<><TableImageValue images={[]} onPreview={() => {}}/>
      <TableFileValue files={[]} onPreview={() => {}} onManage={() => {}}/></>);
    expect(container).toBeEmptyDOMElement();
  });

  it("opens the third image from the remaining-count control", () => {
    const preview = vi.fn(), images = [1,2,3].map(id=>({id:String(id),name:`图片${id}.png`,url:`/${id}.png`}));
    render(<TableImageValue images={images} onPreview={preview}/>);
    expect(screen.getAllByRole("button")).toHaveLength(3);
    fireEvent.click(screen.getByRole("button",{name:"查看其余1张图片"})); expect(preview).toHaveBeenCalledWith(images[2]);
  });

  it("keeps the file extension and routes the count to management", () => {
    const preview = vi.fn(), manage = vi.fn(), files = [{id:"a",name:"很长的文件名称.pdf",url:"/a.pdf"},{id:"b",name:"附件.txt",url:"/b.txt"}];
    render(<TableFileValue files={files} onPreview={preview} onManage={manage}/>);
    expect(screen.getByText(".pdf")).toBeVisible();
    fireEvent.click(screen.getByRole("button",{name:"查看其余1个附件"}));
    expect(manage).toHaveBeenCalledOnce(); expect(preview).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button",{name:"预览很长的文件名称.pdf"})); expect(preview).toHaveBeenCalledWith(files[0]);
  });

  it("shows the person name as one value without nested interactive elements", () => {
    const {container} = render(<button><TablePersonValue name="林知夏" src="/avatar.png"/></button>);
    expect(screen.getByRole("button")).toHaveTextContent("林知夏");
    expect(container.querySelector("button button")).toBeNull();
  });
});
