export type BenchmarkIndexEntry = {
  id: `BM-${string}`;
  key:
    | "compact-data-management"
    | "default-large-form"
    | "complex-workbench"
    | "report-key-data";
  title: string;
  evidenceIds: readonly `VE-${string}`[];
  implementation: "not-started" | "in-progress" | "completed";
  automatedVerification: "not-run";
  humanGate: "not-evaluated";
};

export const benchmarkIndex: readonly BenchmarkIndexEntry[] = [
  {
    id: "BM-A",
    key: "compact-data-management",
    title: "Compact Data Management",
    evidenceIds: ["VE-001", "VE-009"],
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "BM-B",
    key: "default-large-form",
    title: "Default Large Form",
    evidenceIds: ["VE-014"],
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "BM-C",
    key: "complex-workbench",
    title: "Complex Workbench",
    evidenceIds: ["VE-003", "VE-012", "VE-009"],
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "BM-D",
    key: "report-key-data",
    title: "Report / Key Data",
    evidenceIds: ["VE-010", "VE-007"],
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
];
