import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Alert, AlertTitle } from "./alert";
import { Switch } from "./switch";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible";

test("source adapters preserve named keyboard controls, disabled state and quiet static messages", async () => {
  const user = userEvent.setup();
  render(<><Alert><AlertTitle>评分仅保存在当前演示</AlertTitle></Alert>
    <Switch aria-label="仅看待批改" /><Switch disabled aria-label="不可编辑设置" />
    <Accordion><AccordionItem value="rubric"><AccordionTrigger>评分细则</AccordionTrigger><AccordionContent>明确惯性不是力。</AccordionContent></AccordionItem></Accordion>
    <Collapsible><CollapsibleTrigger>更多说明</CollapsibleTrigger><CollapsibleContent>刷新将恢复示例数据。</CollapsibleContent></Collapsible></>);
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  const toggle = screen.getByRole("switch", { name: "仅看待批改" });
  toggle.focus(); await user.keyboard(" "); expect(toggle).toHaveAttribute("aria-checked", "true");
  const disabled = screen.getByRole("switch", { name: "不可编辑设置" });
  expect(disabled).toHaveAttribute("aria-disabled", "true");
  await user.click(disabled); expect(disabled).toHaveAttribute("aria-checked", "false");
  const trigger = screen.getByRole("button", { name: "评分细则" });
  trigger.focus(); await user.keyboard("{Enter}"); expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText("明确惯性不是力。")).toBeVisible();
  await user.click(screen.getByRole("button", { name: "更多说明" }));
  expect(screen.getByText("刷新将恢复示例数据。")).toBeVisible();
});

test("accordion starts collapsed, can close its last open item, and supports multiple items", async () => {
  const user = userEvent.setup();
  render(<Accordion variant="contained">
    <AccordionItem value="one"><AccordionTrigger>第一项</AccordionTrigger><AccordionContent>第一项内容</AccordionContent></AccordionItem>
    <AccordionItem value="two"><AccordionTrigger>第二项</AccordionTrigger><AccordionContent>第二项内容</AccordionContent></AccordionItem>
  </Accordion>);

  const first = screen.getByRole("button", { name: "第一项" });
  const second = screen.getByRole("button", { name: "第二项" });
  expect(first).toHaveAttribute("aria-expanded", "false");
  expect(second).toHaveAttribute("aria-expanded", "false");
  expect(first.closest('[data-rain-id="ui-accordion"]')).toHaveAttribute("data-rain-variant", "contained");

  await user.click(first);
  expect(first).toHaveAttribute("aria-expanded", "true");
  await user.click(first);
  expect(first).toHaveAttribute("aria-expanded", "false");

  render(<Accordion multiple defaultValue={[]} variant="tinted">
    <AccordionItem value="one"><AccordionTrigger>多项第一项</AccordionTrigger><AccordionContent>多项第一项内容</AccordionContent></AccordionItem>
    <AccordionItem value="two"><AccordionTrigger>多项第二项</AccordionTrigger><AccordionContent>多项第二项内容</AccordionContent></AccordionItem>
  </Accordion>);
  const multipleFirst = screen.getByRole("button", { name: "多项第一项" });
  const multipleSecond = screen.getByRole("button", { name: "多项第二项" });
  await user.click(multipleFirst);
  await user.click(multipleSecond);
  expect(multipleFirst).toHaveAttribute("aria-expanded", "true");
  expect(multipleSecond).toHaveAttribute("aria-expanded", "true");
});

test("collapsible starts closed and owns the shared arrow icon", async () => {
  const user = userEvent.setup();
  render(<Collapsible variant="quiet"><CollapsibleTrigger>更多说明</CollapsibleTrigger><CollapsibleContent>说明内容</CollapsibleContent></Collapsible>);
  const trigger = screen.getByRole("button", { name: "更多说明" });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(trigger.querySelector('[data-slot="collapsible-trigger-icon"]')).toBeInTheDocument();
  expect(trigger.closest('[data-rain-id="ui-collapsible"]')).toHaveAttribute("data-rain-variant", "quiet");
  await user.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  await user.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "false");
});
