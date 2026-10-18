import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "../app";
import {
  benchmarkIndex,
  type BenchmarkIndexEntry,
} from "../docs/benchmark-index";
import delivery from "../docs/library-status.generated.json";
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
      "基础体系总入口",
    );
    expect(screen.getByRole("link", { name: /Components/i })).toHaveTextContent(
      "组件与组合入口",
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

  it("shows each implemented benchmark without promoting its separate human review", () => {
    render(<App />);
    for (const title of ["Compact Data Management", "Default Large Form"])
      expect(screen.getByText(title).closest("article")).toHaveAttribute("data-state", "completed");
    for (const title of ["Complex Workbench", "Report / Key Data"])
      expect(screen.getByText(title).closest("article")).not.toHaveAttribute("data-state", "not-started");
    expect(screen.queryByText("尚未实现")).not.toBeInTheDocument();
  });

  it("renders the current delivery summary separately from historical evidence", () => {
    render(<App />);

    expect(screen.getByLabelText("当前阶段")).toHaveTextContent(
      delivery.title,
    );
    expect(screen.getByLabelText("当前阶段")).toHaveTextContent(delivery.updatedAt);
    expect(screen.getByLabelText("资产范围")).toHaveTextContent(`${delivery.contracts} 份资产合同`);
    expect(screen.getByText(delivery.limitations)).toBeVisible();
    expect(screen.getByLabelText("历史基线")).toHaveTextContent("Day 3 Core UI 已完成本地实现和自动检查");
    expect(screen.getByLabelText("历史基线")).toHaveTextContent("图标库继续复用");
  });
});
