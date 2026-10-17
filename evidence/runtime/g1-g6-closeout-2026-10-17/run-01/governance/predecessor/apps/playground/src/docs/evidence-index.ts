export type EvidenceIndexEntry = {
  id: `VE-${string}`;
  label: string;
  nodeId: string;
  benchmarkIds: readonly `BM-${string}`[];
  artifact:
    | { status: "retained"; screenshotPath: string }
    | { status: "privacy-withheld" };
  implementation: "not-started";
  automatedVerification: "not-run";
  humanGate: "not-evaluated";
};

export const evidenceIndex: readonly EvidenceIndexEntry[] = [
  {
    id: "VE-001",
    label: "课程资源包（表格视图）",
    nodeId: "2526:33858",
    benchmarkIds: ["BM-A"],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-001.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-002",
    label: "课程资源包（卡片视图）",
    nodeId: "2526:34646",
    benchmarkIds: [],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-002.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-003",
    label: "教师-课堂回顾",
    nodeId: "2671:46854",
    benchmarkIds: ["BM-C"],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-003.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-004",
    label: "云盘",
    nodeId: "2526:39475",
    benchmarkIds: [],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-004.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-005",
    label: "成果展示",
    nodeId: "2526:52857",
    benchmarkIds: [],
    artifact: { status: "privacy-withheld" },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-006",
    label: "习题组卷",
    nodeId: "2526:51547",
    benchmarkIds: [],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-006.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-007",
    label: "产业链图谱",
    nodeId: "2526:59312",
    benchmarkIds: ["BM-D"],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-007.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-008",
    label: "岗位画像分析",
    nodeId: "2572:63140",
    benchmarkIds: [],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-008.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-009",
    label: "题库（主从预览）",
    nodeId: "2526:57267",
    benchmarkIds: ["BM-A", "BM-C"],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-009.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-010",
    label: "培训总览（教师画像）",
    nodeId: "2572:68083",
    benchmarkIds: ["BM-D"],
    artifact: { status: "privacy-withheld" },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-011",
    label: "错题集",
    nodeId: "2572:77172",
    benchmarkIds: [],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-011.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-012",
    label: "课程知识树（教学内容管理）",
    nodeId: "2671:48125",
    benchmarkIds: ["BM-C"],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-012.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-013",
    label: "资源包-班级",
    nodeId: "2671:50628",
    benchmarkIds: [],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-013.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
  {
    id: "VE-014",
    label: "新建教材弹窗",
    nodeId: "2672:55669",
    benchmarkIds: ["BM-B"],
    artifact: {
      status: "retained",
      screenshotPath: "evidence/screenshots/VE-014.png",
    },
    implementation: "not-started",
    automatedVerification: "not-run",
    humanGate: "not-evaluated",
  },
];

