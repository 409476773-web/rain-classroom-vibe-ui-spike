import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "../app";
import {
  benchmarkIndex,
  type BenchmarkIndexEntry,
} from "../docs/benchmark-index";
import { OverviewPage } from "./overview-page";

describe("playground-shell", () => {
  it("provides direct links to Foundations, Components and Benchmarks from a flat overview", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: /Foundations/i }),
    ).toHaveAttribute("href", "#foundations");
    expect(
      screen.getByRole("link", { name: /Components/i }),
    ).toHaveAttribute("href", "#components");
    expect(
      screen.getByRole("link", { name: /^Benchmarks/i }),
    ).toHaveAttribute("href", "#benchmarks");
  });

  it("connects every direct entry to the shared item Focus contract", () => {
    render(<App />);

    for (const name of [/Foundations/i, /Components/i, /^Benchmarks/i]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute(
        "data-focus",
        "item",
      );
    }
    expect(screen.getByRole("link", { name: /Foundations/i })).toHaveTextContent(
      "42 个语义色角色",
    );
  });

  it.each(benchmarkIndex)(
    "renders $title from the registered Benchmark lifecycle",
    (benchmark) => {
      render(<App />);

      const benchmarkTitle = screen.getByText(benchmark.title);
      expect(benchmarkTitle.closest("a")).toBeNull();
      expect(benchmarkTitle.closest("article")).toHaveAttribute(
        "data-state",
        benchmark.implementation,
      );
    },
  );

  it("allows Benchmarks sharing one Evidence entry to progress independently", () => {
    const independentBenchmarks: readonly BenchmarkIndexEntry[] = [
      {
        ...benchmarkIndex[0]!,
        evidenceIds: ["VE-009"],
        implementation: "completed",
      },
      {
        ...benchmarkIndex[2]!,
        evidenceIds: ["VE-009"],
        implementation: "not-started",
      },
    ];

    render(<OverviewPage benchmarks={independentBenchmarks} />);

    expect(
      screen.getByText("Compact Data Management").closest("article"),
    ).toHaveAttribute("data-state", "completed");
    expect(screen.getByText("Complex Workbench").closest("article")).toHaveAttribute(
      "data-state",
      "not-started",
    );
  });

  it("keeps the shell free of persistent navigation and platform sidebars", () => {
    render(<App />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("marks every registered benchmark as not implemented", () => {
    render(<App />);

    expect(screen.getAllByText("尚未实现")).toHaveLength(4);
  });

  it("reports completed automation without claiming a Human Gate", () => {
    render(<App />);

    expect(screen.getByLabelText("当前阶段")).toHaveTextContent(
      "Day 3 Core UI 已完成 · 自动验证通过 · Human Gate 未评估",
    );
  });
});
