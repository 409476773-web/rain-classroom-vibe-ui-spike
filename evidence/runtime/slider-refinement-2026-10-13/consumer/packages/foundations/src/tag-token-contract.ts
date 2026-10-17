// Confirmed Tag source facts. Geometry, role identity and source RGBA stay separate.
export const tagColorSource = "evidence/runtime/tag-batch-one/source-colors.json";
export type TagPaint = readonly [hex: string, alphaPercent?: number];
export const tagColorProfiles = {
  "classroom": { family: "TagClassroom",
    light: { text: ["#019550"], bg: ["#019550", 10], border: ["#019550", 35], solid: ["#59a17f"] },
    dark: { text: ["#01a458"], bg: ["#019550", 18], border: ["#01a458", 66], solid: ["#478065"] },
  },
  "olive": { family: "TagOlive",
    light: { text: ["#609300"], bg: ["#609300", 10], border: ["#609300", 35], solid: ["#85a44b"] },
    dark: { text: ["#68a000"], bg: ["#609300", 18], border: ["#68a000", 65], solid: ["#667d39"] },
  },
  "paper": { family: "TagPaper",
    light: { text: ["#07978f"], bg: ["#07978f", 10], border: ["#07978f", 35], solid: ["#21b3aa"] },
    dark: { text: ["#07a199"], bg: ["#07978f", 18], border: ["#07a199", 66], solid: ["#18827c"] },
  },
  "exam": { family: "TagExam",
    light: { text: ["#008fbc"], bg: ["#008fbc", 10], border: ["#008fbc", 35], solid: ["#30a7bc"] },
    dark: { text: ["#009acb"], bg: ["#008fbc", 18], border: ["#009acb", 66], solid: ["#257f90"] },
  },
  "courseware": { family: "TagCourseware",
    light: { text: ["#da6814"], bg: ["#da6814", 10], border: ["#da6814", 35], solid: ["#e38f28"] },
    dark: { text: ["#e66e15"], bg: ["#da6814", 18], border: ["#e66e15", 65], solid: ["#a76616"] },
  },
  "gold": { family: "TagGold",
    light: { text: ["#967800"], bg: ["#967800", 10], border: ["#967800", 35], solid: ["#c1a01c"] },
    dark: { text: ["#ad8c00"], bg: ["#9a7c00", 18], border: ["#ad8c00", 65], solid: ["#8b7314"] },
  },
  "purple": { family: "TagPurple",
    light: { text: ["#7240e7"], bg: ["#7240e7", 10], border: ["#7240e7", 35], solid: ["#8c72dd"] },
    dark: { text: ["#9d7bef"], bg: ["#8e66ec", 18], border: ["#9d7bef", 65], solid: ["#7e60d9"] },
  },
  "assignment": { family: "TagAssignment",
    light: { text: ["#3e56ff"], bg: ["#3e56ff", 10], border: ["#3e56ff", 35], solid: ["#6d7df1"] },
    dark: { text: ["#7284ff"], bg: ["#5c71ff", 18], border: ["#7284ff", 66], solid: ["#5467ef"] },
  },
  "live": { family: "TagLive",
    light: { text: ["#2481ff"], bg: ["#2481ff", 10], border: ["#2481ff", 35], solid: ["#399fff"] },
    dark: { text: ["#3b8eff"], bg: ["#2481ff", 18], border: ["#3b8eff", 66], solid: ["#0073e0"] },
  },
  "audio": { family: "TagAudio",
    light: { text: ["#09a21d"], bg: ["#09a21d", 10], border: ["#09a21d", 35], solid: ["#61b06b"] },
    dark: { text: ["#09a81e"], bg: ["#09a21d", 18], border: ["#09a81e", 65], solid: ["#41824a"] },
  },
  "magenta": { family: "TagMagenta",
    light: { text: ["#c652be"], bg: ["#c652be", 10], border: ["#c652be", 35], solid: ["#dc75b1"] },
    dark: { text: ["#cd69c7"], bg: ["#c652be", 18], border: ["#cd69c7", 66], solid: ["#cd388f"] },
  },
  "brown": { family: "TagBrown",
    light: { text: ["#9a593c"], bg: ["#9a593c", 10], border: ["#9a593c", 35], solid: ["#c2816e"] },
    dark: { text: ["#c17f61"], bg: ["#b86c49", 18], border: ["#c17f61", 66], solid: ["#ad6049"] },
  },
  "vote": { family: "TagVote",
    light: { text: ["#687cac"], bg: ["#687cac", 10], border: ["#687cac", 35], solid: ["#7d94cc"] },
    dark: { text: ["#7e8fb8"], bg: ["#6b7fae", 18], border: ["#7e8fb8", 65], solid: ["#5573bc"] },
  },
  "self-test": { family: "TagSelfTest",
    light: { text: ["#994af4"], bg: ["#994af4", 10], border: ["#994af4", 35], solid: ["#ab72dd"] },
    dark: { text: ["#ae70f6"], bg: ["#a159f5", 18], border: ["#ae70f6", 66], solid: ["#9953d6"] },
  },
  "slate": { family: "TagSlate",
    light: { text: ["#6d84ac"], bg: ["#6d84ac", 10], border: ["#6d84ac", 35], solid: ["#8699b9"] },
    dark: { text: ["#7d91b5"], bg: ["#6d84ac", 18], border: ["#7d91b5", 65], solid: ["#5d76a0"] },
  },
  "difficulty1": { family: "TagDifficulty1",
    light: { text: ["#24af8e"], bg: ["#24af8e", 10], border: ["#24af8e", 35], solid: ["#3fb498"] },
    dark: { text: ["#24af8e"], bg: ["#24af8e", 18], border: ["#24af8e", 60], solid: ["#2e826e"] },
  },
  "difficulty2": { family: "TagDifficulty2",
    light: { text: ["#5ba219"], bg: ["#5ba219", 10], border: ["#5ba219", 35], solid: ["#77b140"] },
    dark: { text: ["#5ca419"], bg: ["#5ba219", 18], border: ["#5ca419", 64], solid: ["#56802e"] },
  },
  "difficulty3": { family: "TagDifficulty3",
    light: { text: ["#a88400"], bg: ["#a88400", 10], border: ["#a88400", 35], solid: ["#bea134"] },
    dark: { text: ["#b28c00"], bg: ["#a88400", 18], border: ["#b28c00", 65], solid: ["#887325"] },
  },
  "difficulty4": { family: "TagDifficulty4",
    light: { text: ["#e46700"], bg: ["#e46700", 10], border: ["#e46700", 35], solid: ["#e38827"] },
    dark: { text: ["#eb6a00"], bg: ["#e46700", 18], border: ["#eb6a00", 66], solid: ["#ac6316"] },
  },
  "difficulty5": { family: "TagDifficulty5",
    light: { text: ["#e13411"], bg: ["#e13411", 10], border: ["#e13411", 35], solid: ["#e9684e"] },
    dark: { text: ["#f15a3c"], bg: ["#ee3b17", 18], border: ["#f15a3c", 68], solid: ["#d83b1b"] },
  },
} as const;
export type TagColorProfile = keyof typeof tagColorProfiles;
export const tagColorProfileNames = Object.freeze(Object.keys(tagColorProfiles)) as readonly TagColorProfile[];

// Search labels only; these do not rename Families or change their role/state contract.
export const tagColorSearchTerms = {
  classroom: ["翠绿", "绿色", "green"], olive: ["橄榄绿", "绿色", "green"],
  paper: ["青绿", "青色", "teal"], exam: ["青蓝", "蓝色", "cyan"],
  courseware: ["暖橙", "橙色", "orange"], gold: ["金黄", "黄色", "gold"],
  purple: ["蓝紫", "紫色", "violet"], assignment: ["靛蓝", "蓝色", "indigo"],
  live: ["亮蓝", "蓝色", "blue"], audio: ["叶绿", "绿色", "green"],
  magenta: ["洋红", "粉色", "magenta"], brown: ["棕褐", "棕色", "brown"],
  vote: ["雾蓝", "紫调灰蓝", "蓝色"], "self-test": ["明紫", "兰紫", "紫色"],
  slate: ["石板蓝", "灰蓝", "蓝色"], difficulty1: ["薄荷绿", "绿色", "难度1"],
  difficulty2: ["草绿", "绿色", "难度2"], difficulty3: ["芥末金", "黄色", "难度3"],
  difficulty4: ["鲜橙", "橙色", "难度4"], difficulty5: ["朱红", "红色", "难度5"],
} as const satisfies Record<TagColorProfile, readonly string[]>;

type TagColorSource = { profileId: string; rows: readonly (readonly [key: number, light: TagPaint, dark: TagPaint])[] };
const alpha = (paint: TagPaint, percent: number): TagPaint => [paint[0], percent];
export const tagCategorySources: readonly TagColorSource[] = [
  ...Object.values(tagColorProfiles).flatMap(({ family, light, dark }) => [
    { profileId: `Text/${family}`, rows: [[1, light.text, dark.text]] as const },
    { profileId: `Icon/${family}`, rows: [[1, light.text, dark.text]] as const },
    { profileId: `Border/${family}`, rows: [[1, light.border, dark.border]] as const },
    { profileId: `Fill/${family}/Solid`, rows: [[1, light.solid, dark.solid]] as const },
    { profileId: `Fill/${family}/Alpha`, rows: [[1, light.bg, dark.bg], [2, alpha(light.text, 12), alpha(dark.text, 12)], [3, alpha(light.text, 18), alpha(dark.text, 18)]] as const },
  ]),
  { profileId: "Fill/TagOngoing/Alpha", rows: [[1, ["#14b565", 18], ["#14b565", 18]]] },
  { profileId: "Text/TagOngoing", rows: [[1, ["#058952"], ["#06aa65"]]] },
  { profileId: "Icon/TagOngoing", rows: [[1, ["#0e9954"], ["#0e9954"]]] },
  { profileId: "Fill/TagOngoing/Solid", rows: [[1, ["#14b565"], ["#0e7b45"]]] },
  { profileId: "OnColor/TagOngoing", rows: [[1, ["#ffffff", 90], ["#ffffff", 90]]] },
  { profileId: "Fill/TagUnsubmitted/Alpha", rows: [[1, ["#f78600", 18], ["#f78600", 24]]] },
  { profileId: "Text/TagUnsubmitted", rows: [[1, ["#dd5c00"], ["#ff7716"]]] },
  { profileId: "Fill/TagEnded", rows: [[1, ["#5075fe", 12], ["#5075fe", 20]], [2, ["#d7def5"], ["#5075fe", 24]]] },
  { profileId: "Text/TagEnded", rows: [[1, ["#56688f"], ["#8291b3"]], [2, ["#495d87"], ["#d7def5"]]] },
  { profileId: "Fill/TagBatch/Solid", rows: [[1, ["#728ccb"], ["#728ccb"]]] },
  // Confirmed addition: Classic has no independent unsubmitted Solid.
  { profileId: "Fill/TagUnsubmitted/Solid", rows: [[1, ["#f78600"], ["#f78600"]]] },
  { profileId: "Icon/TagReminder", rows: [[1, ["#f34848"], ["#f34848"]]] },
  { profileId: "Border/TagReminder", rows: [[1, ["#ffffff"], ["#ffffff"]]] },
];

export const tagStrongFillFamilies = [...Object.values(tagColorProfiles).map(({ family }) => family), "TagOngoing", "TagUnsubmitted", "TagBatch"] as const;
export const tagActionColorSources = { neutral: "Text/Neutral/3", brand: "Text/Brand/1", solid: "OnColor/1", neutralSolid: "Text/Neutral/1" } as const;
export const tagSurfaceForegroundPairs: Readonly<Record<string, string>> = { "Fill/TagEnded/1": "Text/TagEnded/1", "Fill/TagEnded/2": "Text/TagEnded/2" };
export const tagSystemProfiles = { success: "classroom", processing: "live", warning: "courseware", error: "difficulty5", neutral: "slate" } as const;

export const tagSizeTokens = { 20: "20px", 24: "24px", 28: "28px" } as const;
export type TagSize = keyof typeof tagSizeTokens;
export const tagSizeClassNames = { 20: "h-rain-tag-20", 24: "h-rain-tag-24", 28: "h-rain-tag-28" } as const;
export const tagSizeRecipes = {
  20: { fontSize: 12, lineHeight: 14, padding: 6, radius: 4, icon: 12, selectionIcon: 10 },
  24: { fontSize: 13, lineHeight: 18, padding: 8, radius: 6, icon: 14, selectionIcon: 12 },
  28: { fontSize: 13, lineHeight: 18, padding: 12, radius: 6, icon: 14, selectionIcon: 12 },
} as const;
export const tagSelectionMarkColorRecipe = { alpha: 90, alphaOperation: "apply" } as const;
export const tagScoreBadgeColorRecipe = {
  tokenId: "Fill/TagSolidAction/Alpha/1", role: "fill", property: "background-color", content: "surface",
  context: "component-recipe", recipeId: "tag-score-badge-solid", evidenceRef: "docs/plans/2026-09-08-tag-design.md",
  interaction: "non-interactive", critical: true, alpha: 30, alphaOperation: "replace",
} as const;
export const tagStateTokens = { hover: 0.12, pressed: 0.18, disabled: 0.3 } as const;

export const learningUnitTagProfiles = {
  课堂: "classroom", 图谱: "olive", 分组: "olive", 试卷: "paper", 考试: "exam", 课件: "courseware", 公告: "gold",
  视频: "purple", 作业: "assignment", 实验: "purple", 直播: "live", 音频: "audio", 讨论: "magenta", 图文: "brown",
  投票: "vote", 自测: "self-test", 回放: "slate", 系统: "live", 开放型作业: "assignment", 单选: "live", 拓展: "slate",
  判断: "exam", 多选: "assignment", 主观: "difficulty4", 填空: "purple",
} as const satisfies Record<string, TagColorProfile>;
export type LearningUnitType = keyof typeof learningUnitTagProfiles;
export const groupTypeTagProfiles = { 学生自由分组: "paper", 老师指定分组: "gold", 随机分组: "live", 自选分组: "magenta" } as const;
export const learningUnitMarkTypes = ["课堂", "试卷", "考试", "课件", "公告", "视频", "音频", "讨论", "图文", "作业", "实验", "直播", "图谱", "自测", "回放", "分组", "系统", "开放型作业"] as const;
export type LearningUnitMarkType = typeof learningUnitMarkTypes[number];
export type TagMarkSize = "small" | "medium" | "large";

// Complete intrinsic frames: minimum geometry grows with user text enlargement.
const shape = (width: number, height: number, fontSize: number, lineHeight: number, radius: number, paddingInline: number, paddingBlock: number) =>
  ({ width, height, fontSize, lineHeight, radius, paddingInline, paddingBlock });
export const tagShapeRecipes = {
  "vertical-20": shape(18, 36, 12, 14, 4, 2, 2), "vertical-24": shape(22, 40, 13, 15, 6, 2, 2), "vertical-28": shape(26, 44, 13, 15, 6, 2, 2),
  batch: shape(36, 20, 12, 14, 4, 0, 0), "batch-layer": shape(33, 18, 12, 14, 4, 2, 2),
  group: shape(64, 20, 13, 18, 6, 4, 0), stacked: shape(40, 32, 12, 14, 4, 0, 0),
  "status-20": shape(0, 20, 12, 14, 4, 6, 2), "status-24": shape(0, 24, 13, 18, 6, 8, 2), "status-32": shape(0, 32, 14, 20, 6, 12, 2),
  "system-20": shape(0, 20, 12, 14, 4, 6, 2), "system-24": shape(0, 24, 13, 18, 6, 8, 2), "system-28": shape(0, 28, 14, 20, 6, 12, 2),
  "reminder-small": shape(28, 28, 12, 14, 6, 2, 2), "reminder-medium": shape(32, 32, 13, 18, 6, 2, 2), "reminder-large": shape(40, 40, 13, 18, 8, 2, 2),
  "reminder-stacked-small": shape(40, 40, 12, 14, 6, 2, 2), "reminder-stacked-medium": shape(44, 44, 13, 16, 6, 2, 2), "reminder-stacked-large": shape(48, 48, 13, 18, 8, 2, 2),
  "score-small": shape(48, 48, 12, 14, 6, 0, 0), "score-medium": shape(52, 52, 13, 18, 6, 0, 0), "score-large": shape(56, 56, 13, 18, 8, 0, 0),
  "score-stacked-small": shape(60, 60, 12, 14, 6, 0, 0), "score-stacked-medium": shape(64, 64, 13, 16, 6, 0, 0), "score-stacked-large": shape(68, 68, 13, 18, 8, 0, 0),
  "score-badge": shape(28, 14, 10, 12, 4, 2, 0),
} as const;
export type TagShape = keyof typeof tagShapeRecipes;
export const tagShapeClassNames = Object.fromEntries(Object.keys(tagShapeRecipes).map((name) => [name, `rain-tag-shape-${name}`])) as Record<TagShape, string>;
export const tagDetailTokens = { "status-dot": 6, "reminder-diameter": 12, "reminder-ring": 2, "reminder-offset": -4, "batch-back-alpha": 80 } as const;
