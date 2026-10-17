import { useState, createRef } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OptionButton, OptionGroup } from "./option-button";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { DensityProvider } from "@rain-next/foundations";

const options = [{ value: "a", label: "A" }, { value: "b", label: "B", text: "完整的选项文字" }, { value: "c", label: "C", disabled: true }];

function Single({ legend = "单选题" }: { legend?: string }) {
  const [value, setValue] = useState<string | null>(null);
  return <OptionGroup legend={legend} options={options} value={value} onValueChange={setValue} />;
}

describe("OptionButton and OptionGroup", () => {
  it("defaults to 28 and applies one explicit size to every group option in either density", () => {
    const { container, rerender } = render(<OptionButton type="checkbox" value="A" label="A" checked={false} />);
    expect(container.querySelector('[data-rain-id="ui-option-button"]')).toHaveAttribute("data-size", "28");
    for (const density of ["default", "compact"] as const) {
      rerender(<DensityProvider density={density}><OptionGroup legend="尺寸" options={options} value={null} onValueChange={() => {}} /></DensityProvider>);
      expect(screen.getByRole("radiogroup")).toHaveAttribute("data-size", "28");
      for (const size of [20, 24, 28, 32, 36, 40] as const) {
        rerender(<DensityProvider density={density}><OptionGroup size={size} legend="尺寸" options={options} value={null} onValueChange={() => {}} /></DensityProvider>);
        expect(screen.getByRole("radiogroup")).toHaveAttribute("data-size", String(size));
        for (const option of container.querySelectorAll('[data-rain-id="ui-option-button"]')) expect(option).toHaveAttribute("data-size", String(size));
      }
    }
    expect(() => render(<OptionButton type="checkbox" value="A" label="A" checked={false} size={30 as 28} />)).toThrow(/size/i);
    expect(() => render(<OptionGroup size={"28" as unknown as 28} legend="尺寸" options={options} value={null} onValueChange={() => {}} />)).toThrow(/size/i);
  });

  it("selects the whole row once, retains an already checked radio and isolates generated names", async () => {
    const user = userEvent.setup();
    render(<><Single /><Single legend="另一题" /></>);
    const group = screen.getByRole("radiogroup", { name: "单选题" });
    const a = within(group).getByRole("radio", { name: "A" });
    const b = within(group).getByRole("radio", { name: /B.*完整的选项文字/ });
    expect(a).not.toBeChecked();
    await user.click(within(group).getByText("完整的选项文字"));
    expect(b).toBeChecked();
    await user.click(b);
    expect(b).toBeChecked();
    await user.click(a);
    expect(a).toBeChecked();
    expect(b).not.toBeChecked();
    const other = within(screen.getByRole("radiogroup", { name: "另一题" })).getByRole("radio", { name: "A" });
    await user.click(other);
    expect(other).toBeChecked();
    expect(a).toBeChecked();
    expect(a.getAttribute("name")).not.toBe(other.getAttribute("name"));
  });

  it("adds and removes multiple values without duplicates and retains disabled selections", async () => {
    const user = userEvent.setup();
    const changes = vi.fn();
    function Multiple() {
      const [value, setValue] = useState<string[]>(["c"]);
      return <OptionGroup mode="multiple" legend="多选题" options={options} value={value} onValueChange={(next) => { changes(next); setValue(next); }} />;
    }
    render(<Multiple />);
    await user.click(screen.getByRole("checkbox", { name: "A" }));
    expect(changes).toHaveBeenLastCalledWith(["c", "a"]);
    await user.click(screen.getByText("完整的选项文字"));
    expect(changes).toHaveBeenLastCalledWith(["c", "a", "b"]);
    await user.click(screen.getByRole("checkbox", { name: "A" }));
    expect(changes).toHaveBeenLastCalledWith(["c", "b"]);
    await user.click(screen.getByRole("checkbox", { name: "C" }));
    expect(screen.getByRole("checkbox", { name: "C" })).toBeChecked();
    expect(changes).toHaveBeenCalledTimes(3);
  });

  it("uses one native form control per choice and blocks disabled groups", async () => {
    const change = vi.fn();
    const { container } = render(<form><OptionGroup mode="multiple" name="answers" legend="答案" options={options} value={["a", "b", "c"]} onValueChange={change} />
      <OptionGroup name="locked" legend="暂不可用" options={options} value="a" disabled onValueChange={change} /></form>);
    const data = new FormData(container.querySelector("form")!);
    expect(data.getAll("answers")).toEqual(["a", "b"]);
    expect(data.has("locked")).toBe(false);
    const locked = within(screen.getByRole("radiogroup", { name: "暂不可用" })).getAllByRole("radio");
    expect(locked.every((input) => (input as HTMLInputElement).disabled)).toBe(true);
    await userEvent.click(locked[1]!);
    expect(change).not.toHaveBeenCalled();
    expect(container.querySelectorAll("button")).toHaveLength(0);
  });

  it("exposes native ref, contextual labels and declared local recipe parts", async () => {
    const ref = createRef<HTMLInputElement>(), change = vi.fn();
    const recipe = defineRainLocalRecipe({ id: "feature-option", scope: "feature", origin: "ui-option-button", classes: { label: "tracking-rain-default" }, modifiedParts: ["label"], candidateTokens: [], promotionStatus: "not-proposed" } as const);
    const { container } = render(<OptionButton ref={ref} type="checkbox" value="b" label="B" checked onCheckedChange={change} aria-label="第2题选项B" localRecipe={recipe} />);
    expect(ref.current).toBe(screen.getByRole("checkbox", { name: "第2题选项B" }));
    expect(ref.current).toBeChecked();
    expect(container.querySelector('[data-slot="label"]')).toHaveClass("font-rain-bold", "tracking-rain-default");
    expect(container.querySelector('[data-rain-id="ui-option-button"]')).toHaveAttribute("data-local-recipe", "feature-option");
    await userEvent.click(ref.current!);
    expect(change).toHaveBeenCalledExactlyOnceWith(false);
  });

  it("rejects invalid option identities and incompatible controlled values", () => {
    expect(() => render(<OptionButton type="radio" value="a" label="A" checked={false} />)).toThrow(/name/);
    expect(() => render(<OptionGroup legend="重复" options={[options[0]!, options[0]!]} value={null} onValueChange={() => {}} />)).toThrow(/unique/);
    expect(() => render(<OptionGroup legend="无效值" options={options} value="missing" onValueChange={() => {}} />)).toThrow(/value/);
    expect(() => render(<OptionGroup mode="multiple" legend="重复值" options={options} value={["a", "a"]} onValueChange={() => {}} />)).toThrow(/value/);
  });

  it("respects an explicit contextual group name instead of overriding it with the legend", () => {
    render(<OptionGroup legend="选择答案" aria-label="第2题的选项" options={options} value={null} onValueChange={() => {}} />);
    expect(screen.getByRole("radiogroup", { name: "第2题的选项" })).toBeInTheDocument();
  });

  it("keeps readonly answers focusable and submittable while blocking row, space and arrow changes", async () => {
    const user = userEvent.setup(), change = vi.fn();
    const { container } = render(<form>
      <OptionGroup name="review" legend="单选回顾" options={options} value="a" readOnly onValueChange={change} />
      <OptionGroup name="review-multi" legend="多选回顾" mode="multiple" options={options} value={["a"]} readOnly onValueChange={change} />
    </form>);
    const group = screen.getByRole("radiogroup", { name: "单选回顾" });
    const [a, b] = within(group).getAllByRole("radio");
    expect(group).toHaveAttribute("aria-readonly", "true");
    expect(a).not.toBeDisabled();
    await user.click(within(group).getByText("完整的选项文字"));
    a!.focus();
    await user.keyboard("{ArrowRight} ");
    expect(b).toHaveFocus();
    expect(a).toBeChecked();
    expect(b).not.toBeChecked();
    const multi = screen.getByRole("group", { name: "多选回顾" });
    await user.click(within(multi).getByRole("checkbox", { name: "A" }));
    expect(within(multi).getByRole("checkbox", { name: "A" })).toHaveAttribute("aria-readonly", "true");
    expect(change).not.toHaveBeenCalled();
    expect(new FormData(container.querySelector("form")!).getAll("review")).toEqual(["a"]);
    expect(new FormData(container.querySelector("form")!).getAll("review-multi")).toEqual(["a"]);
  });

  it("discloses only explicitly visible checked feedback and never exposes an unselected correct answer", () => {
    const review = [{ value: "a", label: "A", feedback: "wrong" as const }, { value: "b", label: "B", feedback: "correct" as const }];
    const { container, rerender } = render(<OptionGroup legend="结果" options={review} value="a" readOnly onValueChange={() => {}} />);
    expect(container.querySelector('[data-slot="feedback"]')).toBeNull();
    rerender(<OptionGroup legend="结果" options={review} value="a" readOnly feedbackVisibility="visible" onValueChange={() => {}} />);
    expect(screen.getByText("回答错误")).toBeInTheDocument();
    expect(screen.queryByText("回答正确")).not.toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "A" })).toHaveAccessibleDescription(/回答错误/);
    expect(screen.getByRole("radio", { name: "A" })).not.toHaveAttribute("aria-invalid");
    rerender(<OptionGroup legend="结果" options={review} value={null} readOnly feedbackVisibility="visible" onValueChange={() => {}} />);
    expect(container.querySelector('[data-slot="feedback"]')).toBeNull();
  });

  it("keeps judgment identity separate from result and makes media part of the same native choice", async () => {
    const user = userEvent.setup(), change = vi.fn();
    const { container } = render(<>
      <OptionButton type="radio" name="judgment" value="false" label="错" symbol="false" checked readOnly feedback="correct" feedbackVisibility="visible" />
      <OptionButton type="checkbox" value="chart" label="B" text="图 B" checked={false} onCheckedChange={change} media={{ src: "/sample-chart.svg", alt: "开口向上的抛物线" }} />
    </>);
    expect(screen.getByRole("radio", { name: "错" })).toHaveAccessibleDescription(/回答正确/);
    expect(container.querySelector('[data-slot="label"] [data-icon="icon/close-bold"]')).not.toBeNull();
    expect(container.querySelector('[data-slot="feedback"]')).toHaveClass("sr-only");
    expect(container.querySelector('[data-slot="feedback"] [data-rain-id="icon"]')).toBeNull();
    await user.click(screen.getByRole("img", { name: "开口向上的抛物线" }));
    expect(screen.getByRole("img", { name: "开口向上的抛物线" }).closest('[data-slot="content"]')).not.toBeNull();
    expect(change).toHaveBeenCalledExactlyOnceWith(true);
    expect(container.querySelectorAll("input")).toHaveLength(2);
    expect(container.querySelectorAll("button")).toHaveLength(0);
  });
});
