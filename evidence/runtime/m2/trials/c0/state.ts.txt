export type Paper = "A" | "B";
export type Order = "question" | "student";
export type AnswerFilter = "all" | "pending" | "graded" | "unanswered";
export interface Answer { id: string; paper: Paper; student: string; question: number; title: string; prompt: string; text: string; maxScore: number; }
export interface Grade { score: number; comment: string; }
export interface Draft { score: string; comment: string; }
export type Grades = Record<string, Grade>;

const questions = [
  ["运动与受力", "公交车突然刹车时，乘客为什么向前倾？请用惯性与受力分析说明，并区分力与运动状态的关系。", 10],
  ["能量转化", "小球从斜面顶端由静止释放。请说明下降过程中动能和势能如何变化，以及机械能守恒成立的条件。", 15],
  ["实验与误差", "设计实验测量弹簧劲度系数。说明控制变量、数据记录方式，以及如何降低测量误差。", 20],
] as const;

/** Fictional text-only slice. No student identity or source screenshot content is copied. */
export const answers: readonly Answer[] = (["A", "B"] as const).flatMap(paper => Array.from({ length: 6 }, (_, student) => questions.map(([title, prompt, maxScore], question) => ({
  id: `${paper}-${student + 1}-${question + 1}`, paper, student: `示例学生 ${String(student + 1).padStart(2, "0")}`,
  question: question + 1, title, prompt: paper === "B" ? `请结合生活实例展开分析：${prompt}` : prompt, maxScore,
  text: student === 5 && question === 2 ? "" : [
    "先明确研究对象，再分析所处条件。我将题目中的对象单独考虑，区分外部作用和对象本身的运动状态。",
    question === 0 ? "车辆制动时，脚部随车辆减速，身体上部由于惯性仍倾向保持原来的运动状态，所以人会向前倾。惯性是物体的属性，不是一种额外的力。" : question === 1 ? "小球下降时重力势能减小，动能增加。若忽略摩擦和空气阻力，系统机械能保持不变；若存在阻力，还需要考虑内能的增加。" : "保持同一根弹簧，逐次增加已知质量的砝码，在弹性限度内记录平衡位置。测量伸长量并绘制力与伸长量的关系图，由斜率求出劲度系数。",
    "分析中需要交代条件，避免直接把结论套用到所有情形。改变条件时，应重新检查上述解释是否仍然成立。",
    "验证思路：通过重复观察比较不同条件下的变化，记录现象，再用所学规律解释结果。对不符合预期的数据保留记录，并检查可能的测量误差。",
  ].join("\n\n"),
})))).flat();
export const initialGrades: Grades = Object.fromEntries(answers.filter((answer, index) => answer.text && index % 7 === 6).map(answer => [answer.id, { score: answer.maxScore - 2, comment: "思路清楚，请补充适用条件。" }]));

export function filterAnswers(paper: Paper, filter: AnswerFilter, query: string, grades: Grades): Answer[] {
  return answers.filter(answer => answer.paper === paper && `${answer.student} 第 ${answer.question} 题 ${answer.title}`.includes(query.trim())
    && (filter === "all" || (filter === "graded" ? Object.hasOwn(grades, answer.id) : filter === "unanswered" ? !answer.text : Boolean(answer.text) && !Object.hasOwn(grades, answer.id))));
}
export function groupSequence(current: Answer, order: Order, visible: readonly Answer[]): Answer[] {
  return visible.filter(answer => answer.paper === current.paper && (order === "question" ? answer.question === current.question : answer.student === current.student));
}
export function scoreError(score: string, maximum: number): string {
  return /^\d+(?:\.[05])?$/.test(score.trim()) && Number(score) >= 0 && Number(score) <= maximum ? "" : `请输入 0–${maximum} 分，支持 0.5 分。`;
}
