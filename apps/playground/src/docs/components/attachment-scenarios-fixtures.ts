import type { AttachmentRecord } from "@rain-next/ui";

/** Small, actual local files; names, contents and MIME types agree. */
export function createDocumentFixtures(prefix: string, count = 24): AttachmentRecord[] {
  return Array.from({ length: count }, (_, index) => {
    const week = Math.floor(index / 8) + 1;
    const suffix = week === 1 ? "" : `（第 ${week} 周）`;
    const templates = [
      { name: `课程导读${suffix}.pdf`, type: "application/pdf", url: "/attachment-demo/course-guide.pdf", size: 965 },
      { name: `课堂讲义${suffix}.txt`, type: "text/plain", text: `第 ${week} 周课堂讲义\n观察问题，记录事实，再讨论可能的解释。\n` },
      { name: `课堂观察数据${suffix}.csv`, type: "text/csv", text: "小组,观察次数,证据条数\n一组,6,4\n二组,8,5\n三组,5,3\n" },
      { name: `小组讨论记录${suffix}.md`, type: "text/markdown", text: `# 第 ${week} 周小组讨论\n\n- 观察到什么？\n- 有什么证据？\n- 还有哪些问题需要验证？\n` },
      { name: `课堂问题清单${suffix}.json`, type: "application/json", text: JSON.stringify({ week, questions: ["观察到什么？", "证据支持什么？"] }, null, 2) },
      { name: `课程封面${suffix}.png`, type: "image/png", url: "/attachment-demo/course-cover.png", size: 1084837 },
      { name: `补充阅读与问题记录${suffix}.txt`, type: "text/plain", text: `第 ${week} 周补充阅读\n记录一个观察、两条证据与一个尚未解决的问题。\n` },
      { name: `阶段学习记录${suffix}.csv`, type: "text/csv", text: "任务,状态\n阅读导读,完成\n记录观察,完成\n提出问题,待讨论\n" },
    ];
    const template = templates[index % templates.length]!;
    const file = "text" in template ? new File([template.text!], template.name, { type: template.type, lastModified: 0 }) : undefined;
    return {
      id: `${prefix}-${index + 1}`, name: template.name, type: template.type,
      size: file?.size ?? template.size, file, url: template.url,
      status: "done", availability: "available", uploadedBy: "课程教学组",
      description: "本页演示资料，不代表真实课程记录。",
    };
  });
}

export function createMediaFixtures(): AttachmentRecord[] {
  const pictures = [
    ["classroom", "课堂板书", 1835527], ["lab", "实验装置", 1891274], ["discussion", "分组讨论", 2000171], ["lecture", "课堂讲授", 1941491],
    ["library", "自主阅读", 2022425], ["workshop", "课堂协作", 1932106], ["campus", "校园观察", 2841137], ["experiment", "实验记录", 1768705],
  ] as const;
  const image = (index: number): AttachmentRecord => {
    const [key, name, size] = pictures[index]!;
    return { id: `media-image-${key}`, name: `${name}.png`, type: "image/png", size, url: `/attachment-demo/scenario-${key}.png`, status: "done", availability: "available", description: "AI 生成的教学情境示意图，不是真实课堂照片。" };
  };
  const video = (index: number, name: string): AttachmentRecord => ({
    id: `media-video-${index}`, name: `${name}.mp4`, type: "video/mp4", url: "/attachment-demo/scenario-video.mp4",
    thumbnailUrl: "/attachment-demo/scenario-lab.png", size: 212279, status: "done", availability: "available",
    description: "由 AI 实验室示意图制作的 4 秒无声合成短片，不是课堂现场实录；多个视频条目复用此文件。",
  });
  return [image(0), video(1, "课堂演示"), image(2), video(2, "实验过程"), image(1), image(3), image(4), image(5), image(6), image(7), video(3, "教学片段"), video(4, "实验回顾")];
}
