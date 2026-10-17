import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import * as UI from "../index";
import { getTagRecipe } from "./tag.styles";

describe("Tag batch two", () => {
  it("exports the seven named domain displays", () => {
    for (const name of ["LearningUnitTag", "DifficultyTag", "GroupTypeTag", "StatusTag", "SystemStatusTag", "LearningUnitReminderMark", "ScoredTaskTypeMark"]) {
      expect(UI, name).toHaveProperty(name);
    }
  });

  it("uses white foreground for every Solid part including neutral", () => {
    const recipe = getTagRecipe("neutral", "solid", 24);
    expect(recipe.root).toContain("text-rain-category-oncolor-1");
    expect(recipe.icon).toContain("text-rain-category-oncolor-1");
    expect(recipe.selectionIcon).toContain("text-rain-category-oncolor-1");
    expect(recipe.close).toContain("text-rain-category-oncolor-1");
  });

  it("keeps fixed learning-unit identities and rejects incompatible fixed shapes", () => {
    const { container } = render(<><UI.LearningUnitTag type="考试" /><UI.LearningUnitTag type="批量" /><UI.LearningUnitTag type="小组作答" /><UI.LearningUnitTag type="开放型作业" layout="stacked" /></>);
    const roots = container.querySelectorAll('[data-rain-id="ui-learning-unit-tag"]');
    expect(roots).toHaveLength(4);
    expect(roots[0]).toHaveAttribute("data-color", "exam");
    expect(roots[3]?.querySelectorAll('[data-slot="line"]')).toHaveLength(2);
    expect(container.querySelector("button,a,[tabindex]")).toBeNull();
    expect(() => render(<UI.LearningUnitTag {...{ type: "批量", size: 28 } as any} />)).toThrow(/predefined|固定/i);
    expect(() => render(<UI.LearningUnitTag {...{ type: "unknown" } as any} />)).toThrow(/type|类型/i);
  });

  it("maps difficulty, group and system status without caller-supplied colors", () => {
    const { container } = render(<><UI.DifficultyTag level={5} /><UI.GroupTypeTag type="随机分组" /><UI.SystemStatusTag status="processing" size={28}>处理中</UI.SystemStatusTag></>);
    expect(container.querySelector('[data-rain-id="ui-difficulty-tag"]')).toHaveAttribute("data-color", "difficulty5");
    expect(container.querySelector('[data-rain-id="ui-group-type-tag"]')).toHaveAttribute("data-color", "live");
    expect(container.querySelector('[data-icon="icon/button-loading"]')).not.toBeNull();
    expect(() => render(<UI.DifficultyTag {...{ level: 6 } as any} />)).toThrow(/level/i);
    expect(() => render(<UI.SystemStatusTag {...{ status: "success", size: "20" } as any} />)).toThrow(/size/i);
  });

  it("makes the ongoing Solid dot follow the white foreground", () => {
    const { container } = render(<UI.StatusTag status="进行中" showDot appearance="solid" size={32} />);
    expect(container.querySelector('[data-slot="status-dot"]')).not.toHaveClass("text-rain-category-icon-tagongoing-1");
    expect(container.firstElementChild).toHaveClass("text-rain-category-oncolor-tagongoing-1");
  });

  it("toggles only the internal score badge while preserving the body and both text lines", () => {
    const { container, rerender } = render(<UI.ScoredTaskTypeMark type="开放型作业" appearance="solid" size="small" />);
    const before = container.firstElementChild!.className;
    rerender(<UI.ScoredTaskTypeMark type="开放型作业" appearance="solid" size="small" scored />);
    expect(container.firstElementChild!.className).toBe(before);
    expect(container.querySelector('[data-slot="score-badge"]')).toHaveTextContent("计分");
    expect(container.querySelectorAll('[data-slot="line"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-slot="label"]')).toHaveLength(1);
  });

  it("exposes reminder meaning and rejects unsupported mark types", () => {
    const { container } = render(<UI.LearningUnitReminderMark id="lesson-type" type="课堂" showReminder />);
    expect(container.firstElementChild).toHaveAttribute("id", "lesson-type");
    expect(container.querySelector('[data-slot="reminder-hint"]')).toHaveTextContent("有新提醒");
    expect(container.querySelector('[data-slot="reminder"]')).toHaveAttribute("aria-hidden", "true");
    expect(() => render(<UI.ScoredTaskTypeMark {...{ type: "投票" } as any} />)).toThrow(/type|类型/i);
  });
});
