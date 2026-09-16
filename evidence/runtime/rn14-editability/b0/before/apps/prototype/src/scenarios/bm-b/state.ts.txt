export const subjects = [
  { value: "design", label: "设计学" }, { value: "computer", label: "计算机科学" }, { value: "education", label: "教育学" },
];
export interface Attachment { id: string; name: string; size: number; status: "uploading" | "failed" | "ready"; }
export interface Textbook {
  title: string; author: string; publisher: string; subject: string;
  description: string; authorIntroduction: string; features: string; contents: string;
  attachments: Attachment[];
}
export const initialTextbook: Textbook = {
  title: "设计方法与实践", author: "教学示例编写组", publisher: "示例出版社", subject: "design",
  description: "从观察真实问题开始，学习调研、构思与原型验证。\n结合课堂讨论和实践项目，形成有依据的设计判断。",
  authorIntroduction: "由课程教学团队共同编写，供教学演示使用。",
  features: "以真实任务组织学习，连接方法、案例与课堂实践。",
  contents: "第一章 观察与提问\n第二章 理解使用者\n第三章 构思与表达\n第四章 原型与验证", attachments: [],
};
export function copyTextbook(value: Textbook): Textbook {
  return { ...value, attachments: value.attachments.map(file => ({ ...file })) };
}
export function validateTextbook(value: Textbook) {
  const errors: Partial<Record<keyof Textbook, string>> = {};
  const countCharacters = (text: string) => [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text)].length;
  if (!value.title.trim() || countCharacters(value.title) > 80) errors.title = "请输入教材标题，最多 80 个字符。";
  if (!subjects.some(subject => subject.value === value.subject)) errors.subject = "请选择所属学科。";
  if (!value.description.trim() || value.description.length > 2000) errors.description = "请输入内容简介，最多 2000 个字符。";
  for (const key of ["author", "publisher"] as const) {
    if (countCharacters(value[key]) > 80) errors[key] = "最多 80 个字符。";
  }
  for (const [key, max] of [["authorIntroduction", 1000], ["features", 1000], ["contents", 4000]] as const) {
    if (value[key].length > max) errors[key] = `最多 ${max} 个字符。`;
  }
  if (value.attachments.some(file => file.status !== "ready")) errors.attachments = "请先完成附件上传，或移除未完成的附件。";
  return errors;
}
export function validateFiles(files: File[], existingCount: number) {
  if (files.length + existingCount > 10) return "最多添加 10 个附件。";
  if (files.some(file => !/\.(pdf|png|jpe?g)$/i.test(file.name))) return "请选择 PDF、PNG 或 JPEG 文件。";
  if (files.some(file => file.size === 0 || file.size > 20 * 1024 * 1024)) return "文件不能为空，且每个文件不能超过 20 MB。";
  return "";
}
/** Local simulation only; no bytes are read or transmitted. */
export function simulateTask(signal: AbortSignal, fail: boolean): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal.aborted) { reject(signal.reason); return; }
    const abort = () => { clearTimeout(timer); reject(signal.reason); };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", abort);
      if (fail) reject(new Error("Simulated failure")); else resolve();
    }, 600);
    signal.addEventListener("abort", abort, { once: true });
  });
}
