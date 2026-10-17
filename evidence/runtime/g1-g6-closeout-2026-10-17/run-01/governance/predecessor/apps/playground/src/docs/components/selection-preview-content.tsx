/** Fictional rubric content shared by the card and Pattern review pages. */
export function SelectionPreviewContent({ kind }: { kind: string }) {
  if (kind === "restricted") return <p>此模板已归档，当前不能选择。已有评分记录仍然保留；如需恢复使用，请由课程管理员调整模板状态。</p>;
  const rows = kind === "lab" ? [
    ["实验准备", "15 分", "理解实验目标，说明原理、材料与安全要求。"],
    ["过程记录", "25 分", "完整记录关键步骤、原始数据及操作中的调整。"],
    ["结果分析", "30 分", "解释实验结果，比较理论预期，并分析误差来源。"],
    ["报告表达", "15 分", "结构清晰，图表与单位准确，结论有证据支持。"],
    ["总结反思", "15 分", "回顾遇到的问题，并提出可验证的改进方法。"],
  ] : [
    ["问题与方案", "25 分", "明确项目问题、目标与设计方案，说明选择依据。"],
    ["过程投入", "25 分", "展示阶段成果、团队协作及个人贡献。"],
    ["最终成果", "35 分", "依据目标检验成果质量、完整性与实际效果。"],
    ["展示与反思", "15 分", "清楚呈现成果，并总结后续改进方向。"],
  ];
  return <dl className="selection-preview-content">{rows.map(([name, score, description]) => <div key={name}>
    <dt>{name} · {score}</dt><dd>{description}</dd>
  </div>)}</dl>;
}
