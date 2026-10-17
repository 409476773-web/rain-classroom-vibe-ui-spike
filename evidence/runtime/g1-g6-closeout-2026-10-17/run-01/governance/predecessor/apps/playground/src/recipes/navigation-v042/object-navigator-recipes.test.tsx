import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { ActivityProgress } from "./object-navigator-recipes";

afterEach(cleanup);

it.each([
  [0, 8, "0%", true], [3, 8, "37.5%", true], [8, 8, "100%", true],
  [null, 8, "缺测", false], [0, 0, "不适用", false], [-1, 8, "无效数据", false], [9, 8, "超出范围", false],
] as const)("keeps the progress reading honest for %s / %s", (completed, total, text, plotted) => {
  const { container } = render(<ActivityProgress label="课堂活动" completed={completed} total={total} minutes={12} />);
  expect(screen.getByText(text)).toBeInTheDocument();
  expect(Boolean(container.querySelector(".rain-data-bar"))).toBe(plotted);
  expect(container.querySelector("button,input,a")).toBeNull();
});
