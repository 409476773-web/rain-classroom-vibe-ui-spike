import type { NetworkNode, NetworkEdge } from "@rain-next/ui/charts";

export type NetworkFixtureId = "elements" | "knowledge" | "courses" | "practice";
export type NetworkChartState = "normal" | "empty" | "single" | "long" | "invalid";
export type NetworkFixture = {
  id: NetworkFixtureId; reference: string; title: string; description: string;
  nodes: NetworkNode[]; edges: NetworkEdge[];
  categories: { id: string; label: string }[];
  relations: { id: string; label: string }[];
};

export const NETWORK_FIXTURES: { id: NetworkFixtureId; label: string }[] = [
  { id: "elements", label: "元素与知识点" }, { id: "knowledge", label: "知识点关联" },
  { id: "courses", label: "课程先修关系" }, { id: "practice", label: "理论与实践课程" },
];

export function makeNetworkFixtures(revision = 0, state: NetworkChartState = "normal"): NetworkFixture[] {
  const change = revision % 3;
  const fixtures: NetworkFixture[] = [
    {
      id: "elements", reference: "CH-065", title: "教学元素与知识点关系",
      description: "全 Mock 示例：资源、学习活动与知识点使用不同节点类别。支撑、考查和应用分别表示关系类型；箭头从教学元素指向知识点。",
      categories: [{ id: "resource", label: "教学资源" }, { id: "activity", label: "学习活动" }, { id: "knowledge", label: "知识点" }],
      relations: [{ id: "supports", label: "内容支撑" }, { id: "examines", label: "测验考查" }, { id: "applies", label: "练习应用" }],
      nodes: [
        { id: "guide", label: "课前导学视频", category: "resource", x: .58, y: .18 },
        { id: "reading", label: "概念讲解文本", category: "resource", x: .13, y: .5 },
        { id: "case", label: "变化率案例", category: "resource", x: .9, y: .5 },
        { id: "quiz", label: "随堂测验", category: "activity", x: .44, y: .5 },
        { id: "lab", label: "建模练习", category: "activity", x: .58, y: .82 },
        { id: "function", label: "函数与极限", category: "knowledge", x: .3, y: .18 },
        { id: "derivative", label: "导数与变化率", category: "knowledge", x: .71, y: .5 },
        { id: "integral", label: "积分与累积", category: "knowledge", x: .3, y: .82 },
      ],
      edges: [
        { id: "guide-function", source: "guide", target: "function", relation: "supports", directed: true, value: 3 },
        { id: "guide-derivative", source: "guide", target: "derivative", relation: "supports", directed: true, value: 2 },
        { id: "reading-function", source: "reading", target: "function", relation: "supports", directed: true, value: 4 },
        { id: "reading-integral", source: "reading", target: "integral", relation: "supports", directed: true, value: 2 },
        { id: "case-derivative", source: "case", target: "derivative", relation: "supports", directed: true, value: 4 },
        { id: "quiz-function", source: "quiz", target: "function", relation: "examines", directed: true, value: 3 },
        { id: "quiz-derivative", source: "quiz", target: "derivative", relation: "examines", directed: true, value: 2 },
        { id: "quiz-integral", source: "quiz", target: "integral", relation: "examines", directed: true, value: 1 },
        { id: "lab-derivative", source: "lab", target: "derivative", relation: "applies", directed: true, value: 3 },
        { id: "lab-integral", source: "lab", target: "integral", relation: "applies", directed: true, value: 4 },
      ],
    },
    {
      id: "knowledge", reference: "CH-070", title: "知识点先备与迁移关系",
      description: "全 Mock 示例：未提供坐标时使用稳定的自然环绕布局，连接较多的节点位于内部。先备和迁移带方向，概念关联不带方向；位置不表示知识掌握程度或优先级。",
      categories: [{ id: "foundation", label: "基础概念" }, { id: "method", label: "计算方法" }, { id: "application", label: "应用主题" }],
      relations: [{ id: "prerequisite", label: "先备知识" }, { id: "related", label: "概念关联" }, { id: "applies", label: "迁移应用" }],
      nodes: [
        { id: "variable", label: "变量与常量", category: "foundation" },
        { id: "mapping", label: "函数映射", category: "foundation" },
        { id: "limit", label: "极限与连续", category: "foundation" },
        { id: "derivative", label: "求导方法", category: "method" },
        { id: "integral", label: "积分方法", category: "method" },
        { id: "numerical", label: "数值求解", category: "method" },
        { id: "optimization", label: "最优化建模", category: "application" },
        { id: "dynamics", label: "动态系统分析", category: "application" },
      ],
      edges: [
        { id: "variable-mapping", source: "variable", target: "mapping", relation: "prerequisite", directed: true, value: 3 },
        { id: "mapping-limit", source: "mapping", target: "limit", relation: "prerequisite", directed: true, value: 4 },
        { id: "limit-derivative", source: "limit", target: "derivative", relation: "prerequisite", directed: true, value: 4 },
        { id: "limit-integral", source: "limit", target: "integral", relation: "prerequisite", directed: true, value: 3 },
        { id: "derivative-integral", source: "derivative", target: "integral", relation: "related", directed: false },
        { id: "integral-numerical", source: "integral", target: "numerical", relation: "related", directed: false },
        { id: "numerical-derivative", source: "numerical", target: "derivative", relation: "related", directed: false },
        { id: "derivative-optimization", source: "derivative", target: "optimization", relation: "applies", directed: true, value: 3 },
        { id: "integral-dynamics", source: "integral", target: "dynamics", relation: "applies", directed: true, value: 3 },
        { id: "numerical-dynamics", source: "numerical", target: "dynamics", relation: "applies", directed: true, value: 4 },
        { id: "numerical-optimization", source: "numerical", target: "optimization", relation: "applies", directed: true, value: 2 },
      ],
    },
    {
      id: "courses", reference: "CH-083", title: "课程先修与能力支撑关系",
      description: "全 Mock 示例：11门课程、19条关系，包含跨类别连接、多对多支撑与双向支撑。先修箭头由先修课指向后续课；同一课程对的不同关系使用独立曲线。",
      categories: [{ id: "foundation", label: "基础课程" }, { id: "professional", label: "专业课程" }, { id: "elective", label: "拓展课程" }],
      relations: [{ id: "prerequisite", label: "先修关系" }, { id: "related", label: "内容相似" }, { id: "supports", label: "能力支撑" }],
      nodes: [
        { id: "programming", label: "程序设计基础", category: "foundation", x: .07, y: .46 },
        { id: "mathematics", label: "离散数学", category: "foundation", x: .20, y: .22 },
        { id: "data-structures", label: "数据结构", category: "professional", x: .47, y: .09 },
        { id: "algorithms", label: "算法设计", category: "professional", x: .19, y: .70 },
        { id: "database", label: "数据库原理", category: "professional", x: .47, y: .43 },
        { id: "networks", label: "计算机网络", category: "professional", x: .34, y: .88 },
        { id: "intelligence", label: "人工智能导论", category: "elective", x: .91, y: .44 },
        { id: "engineering", label: "软件工程实践", category: "elective", x: .52, y: .74 },
        { id: "random-vectors", label: "Random vectors", category: "elective", x: .74, y: .21 },
        { id: "organization", label: "计算机组成原理", category: "professional", x: .71, y: .57 },
        { id: "statistics", label: "概率与统计", category: "foundation", x: .85, y: .82 },
      ],
      edges: [
        { id: "programming-data", source: "programming", target: "data-structures", relation: "prerequisite", directed: true, value: 4 },
        { id: "math-data", source: "mathematics", target: "data-structures", relation: "prerequisite", directed: true, value: 3 },
        { id: "data-algorithms", source: "data-structures", target: "algorithms", relation: "prerequisite", directed: true, value: 4 },
        { id: "algorithms-data", source: "algorithms", target: "data-structures", relation: "related", directed: false },
        { id: "programming-database", source: "programming", target: "database", relation: "prerequisite", directed: true, value: 3 },
        { id: "math-networks", source: "mathematics", target: "networks", relation: "supports", directed: true, value: 2 },
        { id: "algorithms-intelligence", source: "algorithms", target: "intelligence", relation: "prerequisite", directed: true, value: 4 },
        { id: "database-engineering", source: "database", target: "engineering", relation: "supports", directed: true, value: 3 },
        { id: "networks-engineering", source: "networks", target: "engineering", relation: "supports", directed: true, value: 2 },
        { id: "algorithms-engineering", source: "algorithms", target: "engineering", relation: "supports", directed: true, value: 3 },
        { id: "database-networks", source: "database", target: "networks", relation: "related", directed: false },
        { id: "programming-algorithms", source: "programming", target: "algorithms", relation: "prerequisite", directed: true, value: 3 },
        { id: "data-database", source: "data-structures", target: "database", relation: "supports", directed: true, value: 3 },
        { id: "math-database", source: "mathematics", target: "database", relation: "supports", directed: true, value: 2 },
        { id: "statistics-database", source: "statistics", target: "database", relation: "supports", directed: true, value: 2 },
        { id: "vectors-statistics", source: "random-vectors", target: "statistics", relation: "prerequisite", directed: true, value: 3 },
        { id: "organization-networks", source: "organization", target: "networks", relation: "prerequisite", directed: true, value: 3 },
        { id: "engineering-database", source: "engineering", target: "database", relation: "supports", directed: true, value: 2 },
        { id: "intelligence-algorithms", source: "intelligence", target: "algorithms", relation: "supports", directed: true, value: 2 },
      ],
    },
    {
      id: "practice", reference: "CH-086", title: "理论与实践课程联动",
      description: "全 Mock 示例：理论课支撑实践，实践和项目可反馈理论。理论—实践—项目反馈形成的多节点环路有效；反馈关系不表示循环先修要求。",
      categories: [{ id: "theory", label: "理论课程" }, { id: "practice", label: "实践课程" }, { id: "project", label: "综合项目" }],
      relations: [{ id: "theory-practice", label: "理论与实践支撑" }, { id: "feedback", label: "实践反馈" }, { id: "similar", label: "相似内容" }],
      nodes: [
        { id: "data-theory", label: "数据结构理论", category: "theory", x: .2, y: .15 },
        { id: "database-theory", label: "数据库理论", category: "theory", x: .11, y: .53 },
        { id: "network-theory", label: "网络系统理论", category: "theory", x: .29, y: .86 },
        { id: "program-lab", label: "程序设计实践", category: "practice", x: .5, y: .22 },
        { id: "data-lab", label: "数据工程实训", category: "practice", x: .44, y: .52 },
        { id: "network-lab", label: "网络系统实验", category: "practice", x: .6, y: .78 },
        { id: "integrated-project", label: "综合开发项目", category: "project", x: .78, y: .25 },
        { id: "research-project", label: "研究探索项目", category: "project", x: .88, y: .65 },
      ],
      edges: [
        { id: "data-to-program", source: "data-theory", target: "program-lab", relation: "theory-practice", directed: true, value: 4 },
        { id: "database-to-lab", source: "database-theory", target: "data-lab", relation: "theory-practice", directed: true, value: 4 },
        { id: "network-to-lab", source: "network-theory", target: "network-lab", relation: "theory-practice", directed: true, value: 3 },
        { id: "program-to-project", source: "program-lab", target: "integrated-project", relation: "theory-practice", directed: true, value: 3 },
        { id: "data-to-project", source: "data-lab", target: "integrated-project", relation: "theory-practice", directed: true, value: 3 },
        { id: "network-to-research", source: "network-lab", target: "research-project", relation: "theory-practice", directed: true, value: 2 },
        { id: "project-feedback-data", source: "integrated-project", target: "data-theory", relation: "feedback", directed: true, value: 2 },
        { id: "research-feedback-network", source: "research-project", target: "network-theory", relation: "feedback", directed: true, value: 3 },
        { id: "lab-feedback-database", source: "data-lab", target: "database-theory", relation: "feedback", directed: true, value: 1 },
        { id: "program-data-similar", source: "program-lab", target: "data-lab", relation: "similar", directed: false },
        { id: "project-similar", source: "integrated-project", target: "research-project", relation: "similar", directed: false },
      ],
    },
  ];
  return fixtures.map(fixture => ({
    ...fixture,
    description: `${fixture.description} 示例权重为0—5的关联强度，未提供权重表示未设定。`,
    nodes: (state === "empty" ? [] : fixture.nodes.slice(0, state === "single" ? 1 : undefined)).map((node, index) => ({
      ...node,
      ...(node.x !== undefined && (index === 1 || index === 4) ? { x: node.x + change * .035, y: node.y! + change * .02 } : {}),
      label: state === "long" ? `${node.label} · 跨学科智慧教育联合实验与综合能力培养课程` : node.label,
    })),
    edges: state === "empty" || state === "single" ? [] : fixture.edges.map((edge, index) => ({
      ...edge,
      ...(edge.value !== undefined ? { value: Number((edge.value + change * .2).toFixed(1)) } : {}),
      ...(state === "invalid" && index === 0 ? { target: "unknown-node" } : {}),
    })),
  }));
}
