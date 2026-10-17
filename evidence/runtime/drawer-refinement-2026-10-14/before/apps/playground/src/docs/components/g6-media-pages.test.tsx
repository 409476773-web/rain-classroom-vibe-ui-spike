import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe,it,expect } from "vitest";
import { G6MediaPage } from "./g6-media-pages";
describe("G6 media hosts",()=>{
 it("keeps independent remove actions out of preview and restores neighbor focus",async()=>{
  const user=userEvent.setup();render(<G6MediaPage component="attachment"/>);
  await user.click(screen.getByRole("button",{name:"移除 课程导读：从问题到证据.pdf"}));
  expect(screen.queryByRole("dialog")).toBeNull();
  await waitFor(()=>expect(screen.getByRole("button",{name:"预览 课堂观察记录与同伴反馈说明.docx"})).toHaveFocus());
  await user.click(screen.getByRole("button",{name:"预览 课堂观察记录与同伴反馈说明.docx"}));
  expect(screen.getByRole("dialog")).toHaveTextContent("课堂观察记录与同伴反馈说明.docx");
 });
 it("keeps direction provider paired with explicit DOM direction without sibling leakage",()=>{
  render(<G6MediaPage component="direction"/>);
  expect(screen.getByText("Context: rtl · DOM: rtl").closest('[dir]')).toHaveAttribute("dir","rtl");
  expect(screen.getByText("Context: ltr · DOM: ltr").closest('[dir]')).toHaveAttribute("dir","ltr");
 });
 it("renders real local media with independent cover and contain and complete labels",()=>{
  render(<G6MediaPage component="aspect-ratio"/>);
  expect(screen.getAllByRole("img",{name:"课堂观察路径示意：记录事实、寻找证据并回到讨论"})).toHaveLength(2);
  expect(screen.getByText("封面暂不可用")).toBeInTheDocument();
 });
});
