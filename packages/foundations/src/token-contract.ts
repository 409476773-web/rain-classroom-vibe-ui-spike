/** @internal Foundations-only atoms. Consumers use semantic or component tokens. */
export const referenceColorTokens = {
  "neutral-0": "#FFFFFF",
  "neutral-25": "#FAFCFF",
  "neutral-50": "#F3F7FC",
  "neutral-100": "#EDF3FA",
  "neutral-150": "#E8EEF6",
  "neutral-200": "#D8E3F1",
  "neutral-250": "#C9D3E0",
  "neutral-300": "#AEC2DD",
  "neutral-400": "#97A4B7",
  "neutral-500": "#69778D",
  "neutral-600": "#596A82",
  "neutral-700": "#40506A",
  "neutral-950": "#14233C",
  "blue-25": "#EDF3FF",
  "blue-50": "#EAF2FF",
  "blue-100": "#DCE9FF",
  "blue-200": "#CFE0FF",
  "blue-500": "#1561F8",
  "blue-600": "#0F52DC",
  "blue-700": "#0B45B5",
  "green-50": "#EAF7F0",
  "green-600": "#18794E",
  "amber-50": "#FFF4D8",
  "amber-700": "#A55B00",
  "red-50": "#FDECEE",
  "red-600": "#C93842",
  "red-700": "#B52A36",
  "info-50": "#E9F4FC",
  "info-600": "#1769AA",
  "violet-50": "#F2F0FF",
  "violet-500": "#6857E5",
  "violet-600": "#5644C2",
  "cyan-500": "#27A9E8",
} as const;

const reference = referenceColorTokens;

export const semanticColorTokens = {
  "brand-primary": reference["blue-500"],
  "brand-primary-subtle": reference["blue-50"],
  "brand-primary-strong": reference["blue-700"],
  "text-primary": reference["neutral-950"],
  "text-secondary": reference["neutral-700"],
  "text-muted": reference["neutral-600"],
  "text-placeholder": reference["neutral-500"],
  "text-inverse": reference["neutral-0"],
  "text-link": reference["blue-600"],
  "text-disabled": reference["neutral-400"],
  "surface-page": reference["neutral-50"],
  "surface-panel": reference["neutral-0"],
  "surface-raised": reference["neutral-25"],
  "surface-overlay": reference["neutral-0"],
  "surface-subtle": reference["neutral-100"],
  "border-default": reference["neutral-200"],
  "border-subtle": reference["neutral-150"],
  "border-strong": reference["neutral-300"],
  "action-primary": reference["blue-500"],
  "action-primary-hover": reference["blue-600"],
  "action-primary-pressed": reference["blue-700"],
  "action-secondary": reference["blue-25"],
  "action-ghost": "transparent",
  "action-danger": reference["red-600"],
  "action-disabled": reference["neutral-250"],
  "selection-item": reference["blue-50"],
  "selection-item-hover": reference["blue-100"],
  "selection-text": reference["blue-200"],
  "focus-control": reference["blue-500"],
  "focus-item": reference["blue-500"],
  "focus-danger": reference["blue-500"],
  "semantic-success": reference["green-600"],
  "semantic-success-surface": reference["green-50"],
  "semantic-warning": reference["amber-700"],
  "semantic-warning-surface": reference["amber-50"],
  "semantic-error": reference["red-700"],
  "semantic-error-surface": reference["red-50"],
  "semantic-info": reference["info-600"],
  "semantic-info-surface": reference["info-50"],
  "intelligence-foreground": reference["violet-600"],
  "intelligence-surface": reference["violet-50"],
  "intelligence-gradient": `linear-gradient(110deg, ${reference["blue-500"]} 0%, ${reference["violet-500"]} 52%, ${reference["cyan-500"]} 100%)`,
} as const;

export const radiusTokens = {
  "4": "4px",
  "6": "6px",
  "8": "8px",
  "10": "10px",
  "full": "9999px",
} as const;

export const shadowTokens = {
  "none": "none",
  "overlay": "0 12px 32px rgb(28 62 108 / 12%)",
  "dialog": "0 24px 64px rgb(19 48 91 / 16%)",
} as const;

export type SemanticColorTokenName = keyof typeof semanticColorTokens;
export type RadiusTokenName = keyof typeof radiusTokens;
export type ShadowTokenName = keyof typeof shadowTokens;

export const semanticColorGroups = {
  brand: {
    label: "Brand",
    description: "品牌锚点与必要强弱关系；主蓝保持锁定。",
  },
  text: {
    label: "Text",
    description: "冷深蓝灰文字层级、占位、反色、链接与禁用信息。",
  },
  surface: {
    label: "Surface",
    description: "浅冷工作区、白色任务面与浮层承载关系。",
  },
  border: {
    label: "Border",
    description: "用轻冷边界表达层级，不依赖厚重阴影。",
  },
  action: {
    label: "Action",
    description: "普通操作的主、次、幽灵、危险与禁用状态。",
  },
  selection: {
    label: "Selection",
    description: "选中项、悬停项与文本选区的独立反馈。",
  },
  focus: {
    label: "Focus",
    description: "保留 control、item、danger 语义，统一键盘可见信号。",
  },
  semantic: {
    label: "Semantic",
    description: "成功、警告、错误与信息的前景/表面配对。",
  },
  intelligence: {
    label: "Intelligence",
    description: "仅用于生成、识别、洞察、预测与推荐。",
  },
} as const;

export type SemanticColorGroup = keyof typeof semanticColorGroups;

export const semanticColorTokenUsage: Record<SemanticColorTokenName, string> = {
  "brand-primary": "主要品牌锚点与核心链接。",
  "brand-primary-subtle": "低强调品牌背景，不承载正文。",
  "brand-primary-strong": "品牌色上的按压或高对比强调。",
  "text-primary": "页面标题、关键名称与主信息。",
  "text-secondary": "常规正文、表格与控件文字。",
  "text-muted": "辅助说明、时间与次要元数据。",
  "text-placeholder": "白色输入表面上的占位提示。",
  "text-inverse": "深色或品牌色表面上的文字。",
  "text-link": "可导航文本与明确链接操作。",
  "text-disabled": "不可操作或不可编辑的信息。",
  "surface-page": "浅冷全局工作区背景。",
  "surface-panel": "主要任务面与普通面板。",
  "surface-raised": "轻抬升的局部任务区域。",
  "surface-overlay": "菜单、气泡与对话浮层底色。",
  "surface-subtle": "筛选、提示和分区的弱承载面。",
  "border-default": "输入、卡片与区域的常规边界。",
  "border-subtle": "列表分隔与低强调结构线。",
  "border-strong": "当前区域或高优先层级边界。",
  "action-primary": "普通业务的主要操作。",
  "action-primary-hover": "主要操作的指针悬停反馈。",
  "action-primary-pressed": "主要操作的按压反馈。",
  "action-secondary": "次要操作的浅色承载。",
  "action-ghost": "不增加表面的低强调操作。",
  "action-danger": "删除、移除等危险意图。",
  "action-disabled": "不可用操作的承载色。",
  "selection-item": "当前选中行或列表项。",
  "selection-item-hover": "可选项的悬停预览。",
  "selection-text": "浏览器文本选择背景。",
  "focus-control": "表单与按钮的统一品牌色键盘焦点。",
  "focus-item": "菜单、列表与树项的统一品牌色键盘焦点。",
  "focus-danger": "危险操作的键盘焦点；危险意图由控件外观表达。",
  "semantic-success": "成功状态文字与图标。",
  "semantic-success-surface": "成功状态的弱背景。",
  "semantic-warning": "警告状态文字与图标。",
  "semantic-warning-surface": "警告状态的弱背景。",
  "semantic-error": "错误状态文字与图标。",
  "semantic-error-surface": "错误状态的弱背景。",
  "semantic-info": "信息状态文字与图标。",
  "semantic-info-surface": "信息状态的弱背景。",
  "intelligence-foreground": "智能能力的图标、标签与短文字。",
  "intelligence-surface": "智能建议、摘要与结果模块。",
  "intelligence-gradient": "仅用于明确的智能语义标记或英雄区域。",
};

export const semanticColorTokenEntries = (
  Object.entries(semanticColorTokens) as [SemanticColorTokenName, string][]
).map(([name, value]) => ({
  category: name.split("-")[0] as SemanticColorGroup,
  name,
  usage: semanticColorTokenUsage[name],
  value,
}));
