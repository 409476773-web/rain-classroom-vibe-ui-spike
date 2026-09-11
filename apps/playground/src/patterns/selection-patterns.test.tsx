import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { CheckboxGroup, Input } from "@rain-next/ui";
import { DependentFields, PageSelection } from "./selection-patterns";
import { SelectionCardsPage } from "../docs/components/selection-cards-page";

it("opens a real independent preview of an unselected card without submitting or changing the value", async () => {
  const user = userEvent.setup();
  render(<SelectionCardsPage />);
  await user.click(screen.getByRole("button", { name: "查看预览：课程项目量规" }));
  const dialog = screen.getByRole("dialog", { name: "课程项目量规" });
  expect(dialog).toBeVisible();
  await user.click(screen.getByRole("button", { name: "关闭预览" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(screen.getByRole("radio", { name: "实验报告量规" })).toBeChecked();
  expect(screen.getByTestId("card-changes")).toHaveTextContent("选择变化：0 次");
  expect(screen.getByTestId("card-form-values")).toHaveTextContent("尚未读取");
});

it("selects only eligible IDs, preserves locked/outside values and submits no aggregate option", async () => {
  const user = userEvent.setup();
  function Example() {
    const [value, setValue] = useState(["outside", "locked", "a"]);
    return <form aria-label="Selection">
      <PageSelection label="Select this page" eligibleIds={["a", "a", "b"]} value={value} onValueChange={setValue} />
      <CheckboxGroup legend="Items" name="item" value={value} onValueChange={setValue} options={[
        { value: "a", label: "A" }, { value: "b", label: "B" }, { value: "locked", label: "Locked", disabled: true },
      ]} />
      <output>{JSON.stringify(value)}</output>
    </form>;
  }
  render(<Example />);
  const all = screen.getByRole("checkbox", { name: "Select this page" });
  expect(all).toBePartiallyChecked();
  await user.click(all);
  expect(all).toBeChecked();
  expect(screen.getByRole("status")).toHaveTextContent('["outside","locked","a","b"]');
  const form = screen.getByRole("form", { name: "Selection" }) as HTMLFormElement;
  expect([...new FormData(form)]).toEqual([["item", "a"], ["item", "b"]]);
  await user.click(all);
  expect(all).not.toBeChecked();
  expect(screen.getByRole("status")).toHaveTextContent('["outside","locked"]');
  expect(screen.getByRole("checkbox", { name: "Locked" })).toBeChecked();
});

it("distinguishes an empty or unknown page from a known partially selected page", () => {
  const onValueChange = vi.fn();
  const props = { label: "This page", value: ["a"], onValueChange };
  const { rerender } = render(<PageSelection {...props} eligibleIds={[]} />);
  const all = screen.getByRole("checkbox", { name: "This page" });
  expect(all).toBeDisabled(); expect(all).not.toBeChecked(); expect(all).not.toBePartiallyChecked();
  fireEvent.click(all); expect(onValueChange).not.toHaveBeenCalled();
  rerender(<PageSelection {...props} eligibleIds={["a", "b"]} loading />);
  expect(all).toBeDisabled(); expect(all).not.toBePartiallyChecked(); expect(all).not.toBeChecked();
  rerender(<PageSelection {...props} eligibleIds={["a", "b"]} />);
  expect(all).toBeEnabled(); expect(all).toBePartiallyChecked();
  rerender(<PageSelection {...props} eligibleIds={["c"]} />);
  expect(all).not.toBeChecked(); expect(all).not.toBePartiallyChecked();
});

it("disables inactive validation and submission while preserving the owner's draft", async () => {
  const user = userEvent.setup();
  function Example() {
    const [active, setActive] = useState(true), [draft, setDraft] = useState("");
    return <form aria-label="Draft">
      <button type="button" onClick={() => setActive(!active)}>Switch branch</button>
      <DependentFields active={active} legend="Extra settings">
        <Input aria-label="Attempt count" name="attempts" required pattern="[1-9][0-9]*" value={draft} onValueChange={setDraft} />
      </DependentFields>
    </form>;
  }
  render(<Example />);
  const form = screen.getByRole("form", { name: "Draft" }) as HTMLFormElement;
  const input = screen.getByRole("textbox", { name: "Attempt count" });
  expect(form.checkValidity()).toBe(false);
  await user.type(input, "invalid draft");
  await user.click(screen.getByRole("button", { name: "Switch branch" }));
  expect(form.checkValidity()).toBe(true); expect([...new FormData(form)]).toEqual([]);
  expect(input).toBeDisabled(); expect(input.closest("fieldset")).toHaveAttribute("hidden");
  await user.click(screen.getByRole("button", { name: "Switch branch" }));
  expect(input).toHaveValue("invalid draft"); expect(input).toBeEnabled();
  expect(screen.getByRole("button", { name: "Switch branch" })).toHaveFocus();
  expect(form.checkValidity()).toBe(false);
});
