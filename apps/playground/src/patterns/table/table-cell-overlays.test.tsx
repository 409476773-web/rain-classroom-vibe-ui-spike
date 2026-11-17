import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect,it,vi } from "vitest";
import { TablePreviewDrawer } from "./table-cell-overlays";

it("limits preview navigation to its supplied collection and offers a fallback for unsupported files",async()=>{
  const user=userEvent.setup(),select=vi.fn(),close=vi.fn();
  const files=[{id:"a",name:"资料.txt",url:"/a.txt"},{id:"b",name:"表格.xlsx",url:"/b.xlsx"}];
  render(<TablePreviewDrawer open collection="files" items={files} selectedId="a" onSelect={select} onClose={close}/>);
  expect(screen.getByText("此文件暂不支持直接预览")).toBeVisible();
  expect(screen.getByRole("link",{name:"下载资料.txt"})).toHaveAttribute("download","资料.txt");
  expect(screen.getByRole("button",{name:"上一个附件"})).toBeDisabled();
  await user.click(screen.getByRole("button",{name:"下一个附件"}));expect(select).toHaveBeenCalledWith(files[1]);
  await user.click(screen.getByRole("button",{name:"关闭预览"}));expect(close).toHaveBeenCalledOnce();
});
