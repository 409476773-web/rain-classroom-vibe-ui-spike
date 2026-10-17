import { createHash } from "node:crypto";
import { lstatSync, readFileSync } from "node:fs";
import { join } from "node:path";

// Preserve RN-06/RN-08 historical hashes while accepting only the exact upstream
// width implementation approved on 2026-09-14. See the table-card-parity plan.
export function restoreDropdownWidthBaseline(file, source) {
  const hash = createHash("sha256").update(source).digest("hex");
  if (file === "packages/ui/src/dropdown-menu/dropdown-menu.tsx" && hash === "b79118bdc3401d3aeab5cf38b794028771fbbe0c6f5d1a1e625b5c054c70f4cc") {
    return source.toString().replace('width?: number | "auto";', 'width?: number;')
      .replace('width = "auto"', 'width = 280')
      .replace('style={width === "auto" ? undefined : popupWidthStyle(width)}', 'style={popupWidthStyle(width)}');
  }
  if (file === "packages/ui/src/dropdown-menu/dropdown-menu.css" && hash === "c0b31c91a2ea6cc500324141397b0aa66a7664c8c7b3d0b098e18a5c138cea29") {
    return source.toString().replace(/\.rain-menu \{\n[\s\S]*?\n\}\n/, "");
  }
  return source;
}

function yamlError(line, message) {
  const location = line ? ` at line ${line.number}` : "";
  return new Error(`Invalid YAML subset${location}: ${message}`);
}

function parseYamlScalar(value, line) {
  if (value === "[]") {
    return [];
  }
  if (value === "{}") {
    return {};
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value === "null") {
    return null;
  }
  if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value)) {
    return Number(value);
  }
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw yamlError(line, `invalid quoted scalar (${error.message})`);
    }
  }

  throw yamlError(
    line,
    `unsupported scalar ${JSON.stringify(value)}; registry scalars must be quoted or JSON-like`,
  );
}

function parseYamlPair(content, line) {
  const match = content.match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s+(.*))?$/);
  if (!match) {
    throw yamlError(line, `expected a mapping pair, received ${JSON.stringify(content)}`);
  }

  return { key: match[1], rawValue: match[2] ?? "" };
}

export function parseYamlSubset(source) {
  const lines = source
    .split(/\r?\n/)
    .map((raw, index) => ({ raw, number: index + 1 }))
    .filter(({ raw }) => raw.trim().length > 0 && !raw.trimStart().startsWith("#"))
    .map((line) => {
      if (line.raw.includes("\t")) {
        throw yamlError(line, "tabs are not allowed for indentation");
      }

      const indent = line.raw.length - line.raw.trimStart().length;
      if (indent % 2 !== 0) {
        throw yamlError(line, "indentation must use multiples of two spaces");
      }

      return { ...line, indent, content: line.raw.slice(indent) };
    });

  if (lines.length === 0) {
    throw yamlError(null, "document is empty");
  }

  function parseMapping(start, indent) {
    const value = {};
    let cursor = start;

    while (cursor < lines.length && lines[cursor].indent === indent) {
      const line = lines[cursor];
      if (line.content.startsWith("-")) {
        break;
      }

      const { key, rawValue } = parseYamlPair(line.content, line);
      if (Object.hasOwn(value, key)) {
        throw yamlError(line, `duplicate key ${key}`);
      }

      cursor += 1;
      if (rawValue.length > 0) {
        value[key] = parseYamlScalar(rawValue, line);
        continue;
      }

      const child = lines[cursor];
      if (!child || child.indent !== indent + 2) {
        throw yamlError(line, `key ${key} must have a value indented by two spaces`);
      }
      const parsed = parseBlock(cursor, indent + 2);
      value[key] = parsed.value;
      cursor = parsed.cursor;
    }

    return { value, cursor };
  }

  function parseSequence(start, indent) {
    const value = [];
    let cursor = start;

    while (cursor < lines.length && lines[cursor].indent === indent) {
      const line = lines[cursor];
      const match = line.content.match(/^-\s+(.*)$/);
      if (!match) {
        break;
      }

      const itemSource = match[1];
      cursor += 1;
      if (/^[A-Za-z][A-Za-z0-9_-]*:/.test(itemSource)) {
        const { key, rawValue } = parseYamlPair(itemSource, line);
        const item = {};

        if (rawValue.length > 0) {
          item[key] = parseYamlScalar(rawValue, line);
        } else {
          const child = lines[cursor];
          if (!child || child.indent !== indent + 2) {
            throw yamlError(line, `key ${key} must have a value indented by two spaces`);
          }
          const parsed = parseBlock(cursor, indent + 2);
          item[key] = parsed.value;
          cursor = parsed.cursor;
        }

        if (cursor < lines.length && lines[cursor].indent === indent + 2) {
          const continuation = parseMapping(cursor, indent + 2);
          for (const [continuationKey, continuationValue] of Object.entries(
            continuation.value,
          )) {
            if (Object.hasOwn(item, continuationKey)) {
              throw yamlError(lines[cursor], `duplicate key ${continuationKey}`);
            }
            item[continuationKey] = continuationValue;
          }
          cursor = continuation.cursor;
        }

        value.push(item);
      } else {
        value.push(parseYamlScalar(itemSource, line));
      }
    }

    return { value, cursor };
  }

  function parseBlock(start, indent) {
    const line = lines[start];
    if (!line || line.indent !== indent) {
      throw yamlError(line, `expected indentation level ${indent}`);
    }

    return line.content.startsWith("-")
      ? parseSequence(start, indent)
      : parseMapping(start, indent);
  }

  if (lines[0].indent !== 0) {
    throw yamlError(lines[0], "top-level content must not be indented");
  }

  const parsed = parseBlock(0, 0);
  if (parsed.cursor !== lines.length) {
    const line = lines[parsed.cursor];
    throw yamlError(line, `unexpected indentation level ${line.indent}`);
  }

  return parsed.value;
}

export function parseStaticArrayExport(source, exportName) {
  function maskCommentsAndStrings() {
    const masked = [...source];
    let index = 0;

    function maskCharacter(position) {
      if (masked[position] !== "\n" && masked[position] !== "\r") {
        masked[position] = " ";
      }
    }

    while (index < source.length) {
      if (source.startsWith("//", index)) {
        while (index < source.length && source[index] !== "\n") {
          maskCharacter(index);
          index += 1;
        }
        continue;
      }
      if (source.startsWith("/*", index)) {
        const start = index;
        while (index < source.length && !source.startsWith("*/", index)) {
          maskCharacter(index);
          index += 1;
        }
        if (index >= source.length) {
          throw new Error(`Unterminated comment at offset ${start}`);
        }
        maskCharacter(index);
        maskCharacter(index + 1);
        index += 2;
        continue;
      }

      const quote = source[index];
      if (quote === '"' || quote === "'" || quote === "`") {
        const start = index;
        maskCharacter(index);
        index += 1;
        let escaped = false;
        while (index < source.length) {
          const character = source[index];
          maskCharacter(index);
          index += 1;
          if (!escaped && character === quote) {
            break;
          }
          escaped = !escaped && character === "\\";
          if (character !== "\\") {
            escaped = false;
          }
        }
        if (source[index - 1] !== quote) {
          throw new Error(`Unterminated string at offset ${start}`);
        }
        continue;
      }
      index += 1;
    }

    return masked.join("");
  }

  const codeOnlySource = maskCommentsAndStrings();
  const escapedName = exportName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const declaration = new RegExp(
    `export\\s+const\\s+${escapedName}\\b[^=]*=\\s*`,
  ).exec(codeOnlySource);
  if (!declaration) {
    throw new Error(`Missing exported static array ${exportName}`);
  }

  let cursor = declaration.index + declaration[0].length;

  function skipTrivia() {
    while (cursor < source.length) {
      if (/\s/.test(source[cursor])) {
        cursor += 1;
        continue;
      }
      if (source.startsWith("//", cursor)) {
        const newline = source.indexOf("\n", cursor + 2);
        cursor = newline === -1 ? source.length : newline + 1;
        continue;
      }
      if (source.startsWith("/*", cursor)) {
        const end = source.indexOf("*/", cursor + 2);
        if (end === -1) {
          throw new Error("Unterminated comment in static literal export");
        }
        cursor = end + 2;
        continue;
      }
      break;
    }
  }

  function readString() {
    const start = cursor;
    cursor += 1;
    let escaped = false;
    while (cursor < source.length) {
      const character = source[cursor];
      if (!escaped && character === '"') {
        cursor += 1;
        try {
          return JSON.parse(source.slice(start, cursor));
        } catch (error) {
          throw new Error(`Invalid string in static literal: ${error.message}`);
        }
      }
      escaped = !escaped && character === "\\";
      if (character !== "\\") {
        escaped = false;
      }
      cursor += 1;
    }
    throw new Error("Unterminated string in static literal export");
  }

  function readIdentifier() {
    const match = source.slice(cursor).match(/^[A-Za-z_$][A-Za-z0-9_$-]*/);
    if (!match) {
      throw new Error(
        `Expected a static literal identifier near ${JSON.stringify(source.slice(cursor, cursor + 24))}`,
      );
    }
    cursor += match[0].length;
    return match[0];
  }

  function parseValue() {
    skipTrivia();
    const character = source[cursor];
    if (character === '"') {
      return readString();
    }
    if (character === "[") {
      cursor += 1;
      const values = [];
      skipTrivia();
      while (source[cursor] !== "]") {
        values.push(parseValue());
        skipTrivia();
        if (source[cursor] === ",") {
          cursor += 1;
          skipTrivia();
          if (source[cursor] === "]") {
            break;
          }
        } else if (source[cursor] !== "]") {
          throw new Error("Expected comma or closing bracket in static literal array");
        }
      }
      if (source[cursor] !== "]") {
        throw new Error("Unterminated static literal array");
      }
      cursor += 1;
      return values;
    }
    if (character === "{") {
      cursor += 1;
      const value = {};
      skipTrivia();
      while (source[cursor] !== "}") {
        const key = source[cursor] === '"' ? readString() : readIdentifier();
        skipTrivia();
        if (source[cursor] !== ":") {
          throw new Error(`Expected colon after static literal property ${key}`);
        }
        cursor += 1;
        if (Object.hasOwn(value, key)) {
          throw new Error(`Duplicate static literal property ${key}`);
        }
        value[key] = parseValue();
        skipTrivia();
        if (source[cursor] === ",") {
          cursor += 1;
          skipTrivia();
          if (source[cursor] === "}") {
            break;
          }
        } else if (source[cursor] !== "}") {
          throw new Error("Expected comma or closing brace in static literal object");
        }
      }
      if (source[cursor] !== "}") {
        throw new Error("Unterminated static literal object");
      }
      cursor += 1;
      return value;
    }
    if (character === "-" || /\d/.test(character ?? "")) {
      const match = source.slice(cursor).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?/);
      if (!match) {
        throw new Error("Invalid number in static literal export");
      }
      cursor += match[0].length;
      return Number(match[0]);
    }
    if (/[A-Za-z_$]/.test(character ?? "")) {
      const identifier = readIdentifier();
      if (identifier === "true") return true;
      if (identifier === "false") return false;
      if (identifier === "null") return null;
      throw new Error(`Expected a static literal, received ${identifier}`);
    }

    throw new Error(
      `Expected a static literal near ${JSON.stringify(source.slice(cursor, cursor + 24))}`,
    );
  }

  const value = parseValue();
  if (!Array.isArray(value)) {
    throw new Error(`Export ${exportName} must be a static literal array`);
  }
  return value;
}

export function isDayOneForbiddenDependency(dependency) {
  return (
    dependency === "radix-ui" ||
    dependency.startsWith("@radix-ui/") ||
    dependency === "@base-ui/react" ||
    dependency.startsWith("@base-ui-components/") ||
    dependency === "shadcn" ||
    dependency === "shadcn-ui" ||
    dependency.startsWith("@shadcn/")
  );
}

export function getExpectedDayThreeLifecycle(
  progress,
  automatedVerification,
) {
  const implementationByProgress = {
    "task-4-core-ui-in-progress": "in-progress",
    "task-4-core-ui-completed": "completed",
  };
  const evidenceByVerification = {
    "not-run": "not-run",
    failed: "pnpm-verify-failed",
    passed: "pnpm-verify-and-reuse-audit-passed",
  };
  const implementation = implementationByProgress[progress];
  const automatedVerificationEvidence =
    evidenceByVerification[automatedVerification];

  if (!implementation || !automatedVerificationEvidence) {
    throw new Error(
      `Invalid Day 3 lifecycle outcome: ${progress} / ${automatedVerification}`,
    );
  }
  if (
    progress === "task-4-core-ui-completed" &&
    automatedVerification !== "passed"
  ) {
    throw new Error(
      `Invalid Day 3 lifecycle outcome: completed work requires passed verification`,
    );
  }

  return {
    visualEvidence: "live-reinspected",
    benchmark: "registered",
    implementation,
    implementationScope: "day-3-task-4-core-ui-families",
    automatedVerification,
    automatedVerificationScope: "day-3-task-4-core-ui-families",
    automatedVerificationEvidence,
    humanGate: "not-evaluated",
    figmaEditableMaterial: "not-authorized",
    figmaComponentPublication: "not-authorized",
    packageOrRegistryPublication: "not-authorized",
    businessMigration: "not-authorized",
    localGitCommit: "not-created",
    remoteGit: "not-configured",
  };
}

export const tailwindB2AllowedActions = [
  "只读检查已登记的设计、代码、图标来源与验证证据",
  "创建或修订 B2 架构、计划、治理和状态文档",
  "仅安装 class-variance-authority@0.7.1 与 tailwind-merge@3.6.0 两项直接依赖",
  "建立 Rain Token 到 Tailwind 的映射与受约束组合合同",
  "仅迁移 Button 与 Input Master 的样式实现",
  "建立搜索操作区 Local Recipe 与 Local Fork 隔离试点",
  "创建 B2 Manifest、基线、测试、浏览器证据与决策报告",
  "运行既有质量门、图标验证、类型检查、构建与浏览器验证",
];

export const tailwindB2BlockedActions = [
  "安装其他直接依赖或执行依赖升级",
  "实现 Select、Dialog、Table、Statistic、Layout、Headless 实验或原定 Benchmark 页面",
  "迁移 Tag、Badge、Surface、Card 或图标资产实现",
  "使用 Tailwind 默认视觉体系或未登记的视觉值",
  "批量安装或复制 shadcn 资产",
  "执行 Figma 写入或发布 Figma Component/Variant",
  "创建新的 Git branch 或 worktree",
  "创建本地 Git commit",
  "创建或配置远程仓库、push、PR 或 merge",
  "发布包、新增 B2 源码 Registry 或执行业务迁移",
];

export const tailwindB2Checkpoint = {
  id: "tailwind-b2-composition-contract",
  label: "Tailwind B2 组合合同与局部隔离试点",
  status: "authorized",
  decisionSource: "explicit-user-authorization-tailwind-b2-composition-contract",
  requiredEvidence: [
    "B2 设计与实施计划已确认",
    "Day 3 与图标库的既有实现、验证和独立 Human Gate 已保留",
    "试点仅限 Input、Button 与搜索操作区",
  ],
  unlocks: [
    "Rain Token 到 Tailwind 的受约束映射与组合合同",
    "仅 Input、Button Master 迁移及搜索操作区 Local Recipe / Local Fork 试点",
    "仅 class-variance-authority@0.7.1 与 tailwind-merge@3.6.0 两项直接依赖",
    "B2 基线、隔离验证与独立 Human Gate 证据",
  ],
};

const tailwindB2PriorCheckpoints = [
  {
    id: "day-1-runtime-start", label: "Day 1 运行骨架启动", status: "authorized",
    requiredEvidence: [
      "14 个 Visual Evidence 均完成现场复核；安全截图入库，含身份字段的截图按隐私规则不入库",
      "四个 Benchmark 的来源映射完成复核",
      "资产审计报告记录保留、重设、不继承和未知项",
      "Day 1–Day 10 实施计划通过文档与引用检查",
    ],
    unlocks: ["依赖安装", "最小运行骨架", "测试基础设施"],
  },
  {
    id: "day-2-foundations-start", label: "Day 2 Foundations 启动", status: "authorized",
    decisionSource: "用户确认 Day 1 页面无问题并明确要求开始下一批任务",
    requiredEvidence: [
      "Day 1 空壳、质量门与证据入口已完成自动验证",
      "Task 3 的范围、工作模式、验证方法与未验证字体假设已声明",
    ],
    unlocks: [
      "Foundations token 合同", "Typography、Density、Radius、Shadow、Focus 与 Motion 最小规则",
      "Foundations 展示夹具与 Day 2 运行证据",
    ],
  },
  {
    id: "day-3-core-ui-start", label: "Day 3 Core UI 启动", status: "authorized",
    decisionSource: "用户明确要求继续进入 Rain Next 组件实现",
    requiredEvidence: [
      "Day 2 Foundations 与 Day 2.1 Focus/颜色修正已完成自动验证",
      "Rain Classic → Rain Next 复用审核 CP3 已接受", "Task 4 设计边界已按最终复用矩阵修订",
    ],
    unlocks: [
      "Button、Input、Tag/Badge 与 Surface/Card 基础 UI 家族",
      "Core UI 状态矩阵、说明页与修改边界", "Day 3 单元、交互、浏览器测试与运行证据",
    ],
  },
];

export function getExpectedTailwindB2Lifecycle(progress, automatedVerification) {
  const implementationByProgress = {
    "tailwind-b2-pilot-in-progress": "in-progress",
    "tailwind-b2-pilot-completed": "completed",
  };
  const evidenceByVerification = {
    "not-run": "not-run",
    failed: "pnpm-verify-failed",
    passed: "pnpm-verify-tailwind-b2-and-verify-and-reuse-audit-passed",
  };
  const implementation = implementationByProgress[progress];
  const automatedVerificationEvidence = evidenceByVerification[automatedVerification];
  if (!Object.hasOwn(implementationByProgress, progress) || !Object.hasOwn(evidenceByVerification, automatedVerification)
    || (implementation === "completed" && automatedVerification !== "passed")) {
    throw new Error(`Invalid B2 lifecycle outcome: ${progress} / ${automatedVerification}`);
  }
  return {
    visualEvidence: "live-reinspected", benchmark: "registered", implementation,
    implementationScope: "input-button-search-operation-pilot",
    automatedVerification, automatedVerificationScope: "input-button-search-operation-pilot",
    automatedVerificationEvidence,
    humanGate: implementation === "completed" ? "awaiting_human" : "not-evaluated",
    figmaEditableMaterial: "not-authorized", figmaComponentPublication: "not-authorized",
    packageOrRegistryPublication: "not-authorized", businessMigration: "not-authorized",
    localGitCommit: "not-created", remoteGit: "not-configured",
  };
}

function exactRecord(actual, expected) {
  return actual && typeof actual === "object" && !Array.isArray(actual)
    && Object.keys(actual).length === Object.keys(expected).length
    && Object.entries(expected).every(([key, value]) => JSON.stringify(actual[key]) === JSON.stringify(value));
}

export const tokenFoundationsV1AllowedActions = [
  "只读核对最新 Token 设计、Rain Classic 来源、现有消费者与冻结基线",
  "建立第 0/1 批独立阶段、实施计划、ADR、精确合同与验证证据",
  "增量建设 Light Color Registry、Typography、Line Thickness、Radius 与 Spacing 基础合同",
  "建立单源生成输出、受控 Tailwind 桥接、AI 使用文档与静态校验",
  "建立独立 Token Foundations 演示路由、对照样例与第 0/1 批测试",
  "运行专项检查及既有完整质量门、浏览器验证和独立技术审阅",
];

export const tokenFoundationsV1BlockedActions = [
  "迁移或改变既有组件视觉数值、状态、行为与独立 Human Gate",
  "实现新的公共 UI、Layout、Recipe 家族或原定 Benchmark 页面",
  "执行第 2 批及后续组件迁移、Size/Density 配方建设或 Dark Mode 实现",
  "修改 Rain Classic、写入或发布 Figma 资产",
  "安装新依赖、升级依赖或批量复制 shadcn 资产",
  "创建 Git branch、worktree、commit、远程仓库、push、PR 或 merge",
  "发布包、源码 Registry 或执行业务迁移",
];

export const tokenFoundationsV1Checkpoint = {
  id: "token-foundations-v1", label: "Token Foundations V1 第 0/1 批", status: "authorized",
  decisionSource: "explicit-user-authorization-token-foundations-v1-batch-0-1",
  requiredEvidence: [
    "最新有效 Token 文档及依赖顺序已审阅，用户明确授权开始第 0/1 批",
    "原运行文件与 B2 完整阶段状态已冻结；旧验收与生命周期分别保留",
    "新增能力通过精确文件、权限、生成来源与独立验证范围登记",
  ],
  unlocks: [
    "Light 颜色登记与 Typography、Line、Radius、Spacing 基础合同",
    "受控桥接、单源生成、静态校验与独立演示入口",
    "第 0/1 批专项及回归证据，不授权既有组件迁移或后续批次",
  ],
};

export const tokenFoundationsV1Files = {
  foundations: [
    "packages/foundations/src/color-registry.ts", "packages/foundations/src/color-registry.test.ts",
    "packages/foundations/src/typography-contract.ts", "packages/foundations/src/typography-contract.test.ts",
    "packages/foundations/src/line-foundation.test.ts",
  ],
  application: [
    "token-foundations-page.tsx", "token-foundations-page.test.tsx", "token-foundations.css",
    "color-panel.tsx", "color-panel.test.tsx", "color-pairing-preview.tsx", "typography-panel.tsx", "typography-panel.test.tsx",
    "geometry-panel.tsx", "token-classes.generated.ts",
  ].map((name) => `apps/playground/src/docs/token-foundations/${name}`),
  workspace: [
    "scripts/token-foundation-outputs.mjs", "scripts/generate-token-foundations.mjs",
    "scripts/verify-token-foundations.mjs", "scripts/verify-token-foundations.test.ts",
    "tests/e2e/token-foundations.spec.ts",
  ],
  documents: [
    "docs/adr/0003-size-and-density-responsibilities.md", "docs/adr/0004-token-foundations-v1.md", "docs/plans/2026-09-05-token-foundations-v1-implementation.md",
    "docs/plans/2026-09-05-size-density-first-recipes.md", "docs/ai/token-selection.md",
    "docs/plans/2026-09-06-color-family-supplement-design.md", "docs/plans/2026-09-06-color-dark-theme.md",
    "manifests/contracts/token-foundations-v1.json",
  ],
  evidence: [
    "pre-token-runtime.tar.gz", "pre-token-runtime.json", "verification.md", "line.png",
    "typography.png", "colors.png", "geometry.png", "baseline-red.log", "final-verify.log", "independent-review.md",
  ].map((name) => `evidence/runtime/token-foundations-v1/${name}`),
};

export function getExpectedTokenFoundationsV1Lifecycle(progress, automatedVerification) {
  const implementations = {
    "token-foundations-v1-batch-0-1-in-progress": "in-progress",
    "token-foundations-v1-batch-0-1-completed": "completed",
  };
  if (!Object.hasOwn(implementations, progress)
    || !["not-run", "failed", "passed"].includes(automatedVerification)
    || (implementations[progress] === "completed" && automatedVerification !== "passed")) {
    throw new Error(`Invalid Token Foundations V1 phase lifecycle: ${progress} / ${automatedVerification}`);
  }
  return {
    visualEvidence: "live-reinspected", benchmark: "registered", implementation: implementations[progress],
    implementationScope: "token-foundations-v1-batch-0-1", automatedVerification,
    automatedVerificationScope: "token-foundations-v1-batch-0-1",
    automatedVerificationEvidence: automatedVerification === "passed" ? "pnpm-verify-tokens-and-pnpm-verify-passed" : automatedVerification === "failed" ? "pnpm-verify-failed" : "not-run",
    humanGate: implementations[progress] === "completed" ? "awaiting_human" : "not-evaluated",
    figmaEditableMaterial: "not-authorized", figmaComponentPublication: "not-authorized",
    packageOrRegistryPublication: "not-authorized", businessMigration: "not-authorized",
    localGitCommit: "not-created", remoteGit: "not-configured",
  };
}

export const inputRefinementFiles = {
  foundations: ["packages/foundations/src/input-token-contract.ts", "packages/foundations/src/input-token-contract.test.ts"],
  ui: [
    ...["input.tsx", "input.utils.ts", "input.test.tsx", "input.utils.test.ts", "input.styles.ts", "input-field.test.tsx"].map((name) => `packages/ui/src/input/${name}`),
    ...["form-item", "search-input"].map((name) => `packages/ui/src/input/${name}.tsx`),
  ],
  application: ["input-page.tsx", "input-page.css", "input-page.test.tsx"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: [
    "scripts/input-governance.test.ts", "scripts/input-color-consumers.test.ts", "tests/e2e/input.spec.ts",
    "tests/e2e/core-ui.spec.ts", "tests/e2e/foundations.spec.ts", "packages/foundations/src/index.ts",
    "packages/ui/src/index.ts", "packages/ui/src/styles.css", "apps/playground/src/app.tsx",
    "apps/playground/src/styles.css", "apps/playground/src/routes/route-registry.ts", "apps/playground/src/docs/components/core-ui-page.tsx",
    "scripts/token-foundation-outputs.mjs", "scripts/generate-token-foundations.mjs", "scripts/verification-helpers.mjs", "scripts/verification-helpers.test.ts",
    "scripts/verify-boundaries.mjs", "scripts/verify-tailwind-b2.mjs", "scripts/verify-tailwind-b2.test.ts", "scripts/verify-token-foundations.mjs",
    "manifests/contracts/tailwind-b2.yaml", "status/current-phase.yaml",
  ],
  documents: ["docs/plans/2026-09-08-input-design.md", "docs/plans/2026-09-08-input-implementation.md", "manifests/ui/input.yaml", "manifests/ui/form-item.yaml", "manifests/ui/search-input.yaml"],
  evidence: ["verification.md", "light.png", "dark.png", "compact.png", "color-findings.json", "inline-text-button-colors.json"].map((name) => `evidence/runtime/input/${name}`),
};

export const selectRefinementFiles = {
  foundations: ["packages/foundations/src/select-token-contract.ts", "packages/foundations/src/select-token-contract.test.ts"],
  ui: ["packages/ui/src/field/field.styles.ts", ...["select.tsx", "select.styles.ts", "select.utils.ts", "select.test.tsx"].map((name) => `packages/ui/src/select/${name}`)],
  application: ["select-page.tsx", "select-page.css", "select-page.test.tsx"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: ["scripts/select-governance.test.ts", "scripts/select-color-consumers.test.ts", "tests/e2e/select.spec.ts"],
  documents: ["docs/plans/2026-09-08-input-select-field-recipes-design.md", "docs/plans/2026-09-09-select-implementation.md", "docs/plans/2026-09-10-select-formal-dependencies.md", "manifests/ui/select.yaml", "registry/select.json"],
  evidence: ["source-baseline.json", "formal-dependencies.md", "formal-color-findings.json", "formal-light.png", "formal-dark.png", "formal-compact.png", "verification.md", "color-findings.json", "independent-review.md", "light.png", "dark.png", "compact.png"].map((name) => `evidence/runtime/select/${name}`),
};

export function isSelectFormalImport(filePath, specifier) {
  return filePath === "packages/ui/src/select/select.tsx" && ["@base-ui/react/select", "@base-ui/react/combobox"].includes(specifier);
}

function validAssetClosureVisualGate(entry, scope) {
  if (entry?.humanGate === "awaiting_human") return entry.humanGateDecision === undefined;
  return Boolean(entry?.humanGate === "accepted" && entry.automatedVerification === "passed"
    && ["findings", "passed"].includes(entry.independentReview)
    && exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-12", decisionSource: "explicit-user-confirmation", userStatement: "视觉已完成人工和检验。",
      scope, evidence: "../docs/plans/2026-09-12-existing-assets-closure.md",
      doesNotAuthorize: ["contrast-or-color-eligibility-acceptance", "manual-keyboard-ime-screen-reader-or-physical-touch", "new-components-global-token-changes-publication-migration-or-git"],
    }));
}

export function hasSelectFormalDependenciesAuthorization(status) {
  const record = status?.componentRefinements?.select?.formalDependencies;
  return Boolean(record && status?.currentPhase?.id === "token-foundations-v1" && ["in-progress", "completed"].includes(record.implementation)
    && ["not-run", "failed", "passed"].includes(record.automatedVerification)
    && ["not-run", "findings", "passed"].includes(record.independentReview)
    && (record.implementation !== "completed" || record.automatedVerification === "passed" && record.independentReview === "passed")
    && validAssetClosureVisualGate(record, "select-formal-dependencies-runtime-visual-only")
    && exactRecord(record, {
      authorization: "authorized", authorizedAt: "2026-09-10", decisionSource: "explicit-user-continue-after-placeholder-audit",
      userStatement: "继续", scope: "select-popup-options-and-selected-tag-integration",
      plan: "../docs/plans/2026-09-10-select-formal-dependencies.md", headless: "@base-ui/react@1.8.0-select-combobox",
      implementation: record.implementation, automatedVerification: record.automatedVerification, independentReview: record.independentReview,
      humanGate: record.humanGate, ...(record.humanGate === "accepted" ? { humanGateDecision: record.humanGateDecision } : {}), contrastAcceptance: "not-granted",
    }));
}

export function hasSelectRefinementAuthorization(status) {
  const refinement = status?.componentRefinements?.select;
  return Boolean(refinement && status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(refinement.implementation)
    && ["not-run", "failed", "passed"].includes(refinement.automatedVerification)
    && ["not-run", "findings", "passed"].includes(refinement.independentReview)
    && (refinement.implementation !== "completed" || (refinement.automatedVerification === "passed" && refinement.independentReview === "passed"))
    && (!refinement.formalDependencies || hasSelectFormalDependenciesAuthorization(status))
    && validAssetClosureVisualGate(refinement, "select-runtime-visual-only")
    && exactRecord(refinement, {
      ...(refinement.formalDependencies ? { formalDependencies: refinement.formalDependencies } : {}),
      authorization: "authorized", authorizedAt: "2026-09-09",
      decisionSource: "explicit-user-continue-select-implementation-after-api-plan", userStatement: "继续推进",
      scope: "select-four-capabilities-and-shared-input-field-appearance",
      plan: "../docs/plans/2026-09-09-select-implementation.md", design: "../docs/plans/2026-09-08-input-select-field-recipes-design.md",
      visualBaseline: "accepted-preview-visual-only", implementation: refinement.implementation,
      automatedVerification: refinement.automatedVerification, independentReview: refinement.independentReview,
      humanGate: refinement.humanGate, ...(refinement.humanGate === "accepted" ? { humanGateDecision: refinement.humanGateDecision } : {}), contrastAcceptance: "not-granted",
      doesNotAuthorize: ["public-menu-layer-or-headless-selection", "other-components-or-global-focus", "new-colors-dependencies-or-contrast-exceptions", "figma-publication-business-migration-or-git"],
    }));
}

export const tabsPreflightFiles = {
  foundations: [], ui: [],
  application: ["apps/playground/src/experiments/tabs-preflight.tsx", "apps/playground/src/experiments/tabs-preflight.css"],
  workspace: ["scripts/tabs-governance.test.ts", "tests/e2e/tabs-preflight.spec.ts"],
  documents: ["docs/plans/2026-09-10-tabs-implementation.md", "docs/plans/2026-09-10-tabs-design.md", "docs/audits/2026-09-10-tabs-reference-review.md", "docs/adr/0008-tabs-headless.md"],
  evidence: ["evidence/runtime/tabs/source-baseline.json", "evidence/runtime/tabs/preflight.md"],
};

export const tabsTokenFiles = {
  foundations: ["packages/foundations/src/tabs-token-contract.ts", "packages/foundations/src/tabs-token-contract.test.ts"],
};

export const tabsColorFiles = {
  ui: ["packages/ui/src/tabs/tabs.styles.ts"],
  workspace: ["scripts/tabs-color-consumers.test.ts"],
  evidence: ["evidence/runtime/tabs/soft-text-eligibility.md"],
};

export const tabsRetiredPaths = ["apps/playground/src/experiments/tabs-preflight.tsx", "apps/playground/src/experiments/tabs-preflight.css", "tests/e2e/tabs-preflight.spec.ts"];

export const tabsComponentFiles = {
  evidence: ["verification.md", "independent-review.md", "source-hashes.json", "contact-sheet.png", "supplemental-facts.json", "browser-facts.json", "color-findings.json", "coarse-pointer.png", "forced-colors.png", "narrow-360.png", "zoom-200.png", "more-open.png", "more-selected.png", ...["light", "dark"].flatMap(theme => ["line", "contained", "soft"].flatMap(appearance => [28, 32, 38].map(size => `${theme}-${appearance}-${size}-top.png`)))].map(name => `evidence/runtime/tabs/${name}`),
  documents: ["manifests/ui/tabs.yaml", "registry/tabs.json"],
  application: ["tabs-page.tsx", "tabs-page.css", "tabs-page.test.tsx"].map(name => `apps/playground/src/docs/components/${name}`),
  workspace: ["tests/e2e/tabs.spec.ts"],
  ui: ["tabs.tsx", "tabs.test.tsx", "tabs-full-label.tsx", "tabs-overflow.ts", "tabs-overflow.test.ts"].map(name => `packages/ui/src/tabs/${name}`),
};

const tabsVisualRefinementAuthorization = {
  authorization: "authorized", authorizedAt: "2026-09-11", userStatement: "继续推进",
  scope: "tabs-confirmed-visual-layout-refinement",
  plan: "../docs/plans/2026-09-11-tabs-visual-refinement-implementation.md",
  design: "../docs/plans/2026-09-11-tabs-visual-refinement-design.md",
};

export const tabsVisualRefinementFiles = {
  documents: ["docs/plans/2026-09-11-tabs-visual-refinement-design.md", "docs/plans/2026-09-11-tabs-visual-refinement-implementation.md"],
  workspace: ["tests/e2e/tabs-visual-refinement.spec.ts"],
  evidence: [
    ...tabsComponentFiles.evidence.map(path => path.replace("runtime/tabs/", "runtime/tabs-visual-refinement/")),
    ...["source-baseline.json", "layout-facts.json", "layout-contact.png", "native-scrollbar.jpg", "indicator-baseline.json", "indicator-facts.json", "indicator-light.png", "indicator-dark.png"].map(name => `evidence/runtime/tabs-visual-refinement/${name}`),
    ...["audit-notes.md", "matrix-facts-light.json", "matrix-facts-dark.json", "recipe-contained-38-start.json",
      "01-initial.jpg", "02-vertical-selected-edge.jpg", "03-vertical-keyboard.jpg", "04-contained-first.jpg", "05-contained-last.jpg", "06-contained-vertical.jpg",
      "07-soft-selected.jpg", "08-soft-focus-selected.jpg", "09-mobile-vertical.jpg", "10-more-menu.jpg", "11-dark-soft.jpg", "12-right-vertical.jpg",
    ].map(name => `evidence/runtime/tabs-visual-refinement/before/${name}`),
    ...["light", "dark"].flatMap(theme => ["line", "contained", "soft"].flatMap(appearance => [28, 32, 38].flatMap(size => ["top", "bottom", "start", "end"].map(position =>
      `evidence/runtime/tabs-visual-refinement/layout-${theme}-${appearance}-${size}-${position}.png`)))),
  ],
};

export function hasTabsRefinementAuthorization(status) {
  const entry = status?.componentRefinements?.tabs;
  const accepted = entry?.humanGate === "accepted";
  const preflightStage = entry?.stage === "preflight";
  const documentationStage = entry?.stage === "documentation";
  const lifecycle = documentationStage
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed" && entry.independentReview === "passed");
  return status?.currentPhase?.id === "token-foundations-v1" && Boolean(entry)
    && ["preflight", "tokens", "colors", "component", "documentation"].includes(entry.stage)
    && (!documentationStage || lifecycle)
    && ["not-evaluated", "accepted"].includes(entry.humanGate)
    && (!accepted || documentationStage && entry.implementation === "completed" && Boolean(entry.visualRefinement) && Boolean(exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-12", decisionSource: "explicit-user-confirmation", userStatement: "完成视觉验收",
      scope: "tabs-runtime-visual-only", evidence: "../evidence/runtime/tabs-visual-refinement/verification.md",
    })))
    && (entry.visualRefinement === undefined || documentationStage && exactRecord(entry.visualRefinement, tabsVisualRefinementAuthorization))
    && (preflightStage ? ["not-run", "failed", "passed"].includes(entry.preflight) : entry.preflight === "passed")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-10",
      decisionSource: "explicit-user-start-tabs-implementation", userStatement: "开始实施",
      scope: "tabs-three-appearances-three-sizes-four-positions",
      plan: "../docs/plans/2026-09-10-tabs-implementation.md", design: "../docs/plans/2026-09-10-tabs-design.md",
      stage: entry.stage, preflight: entry.preflight, headless: preflightStage ? "candidate-base-ui-1.8.0" : "base-ui-1.8.0",
      implementation: documentationStage ? entry.implementation : preflightStage ? "not-started" : "in-progress",
      automatedVerification: documentationStage ? entry.automatedVerification : "not-run", independentReview: documentationStage ? entry.independentReview : "not-run",
      humanGate: entry.humanGate, contrastAcceptance: "not-granted",
      ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}),
      doesNotAuthorize: ["other-components-or-global-weak-neutral-rules", "new-dependencies-or-color-values", "figma-publication-business-migration-or-git"],
      ...(entry.visualRefinement === undefined ? {} : { visualRefinement: tabsVisualRefinementAuthorization }),
    });
}

export function getTabsRefinementFiles(status) {
  return Object.fromEntries(Object.entries(tabsPreflightFiles).map(([kind, files]) => [kind, hasTabsRefinementAuthorization(status) ? [
    ...files.filter(file => status.componentRefinements.tabs.stage !== "documentation" || !tabsRetiredPaths.includes(file)),
    ...(status.componentRefinements.tabs.stage !== "preflight" ? tabsTokenFiles[kind] ?? [] : []),
    ...(["colors", "component", "documentation"].includes(status.componentRefinements.tabs.stage) ? tabsColorFiles[kind] ?? [] : []),
    ...(["component", "documentation"].includes(status.componentRefinements.tabs.stage) ? tabsComponentFiles[kind] ?? [] : []),
    ...(status.componentRefinements.tabs.visualRefinement ? tabsVisualRefinementFiles[kind] ?? [] : []),
  ] : []]));
}

export function validateTabsPreflightInventory({ status, files, protectedPaths }) {
  const failures = [];
  const retired = hasTabsRefinementAuthorization(status) && status.componentRefinements.tabs.stage === "documentation";
  if (retired && tabsRetiredPaths.some(file => files.has(file))) failures.push("Tabs documentation stage must retire its technical runtime and tests");
  for (const file of tabsPreflightFiles.application.filter(path => path.endsWith(".tsx"))) {
    if (files.has(file) && !protectedPaths?.optional?.includes(file)) failures.push("Tabs preflight must protect its exact source");
  }
  if (hasTabsRefinementAuthorization(status) && status.componentRefinements.tabs.preflight === "passed") {
    for (const file of Object.values(tabsPreflightFiles).flat().filter(file => !retired || !tabsRetiredPaths.includes(file))) {
      if (!files.get(file)?.trim()) failures.push(`Tabs passed preflight requires a nonempty regular file: ${file}`);
    }
  }
  return failures;
}

export function isTabsImport(status, filePath, specifier) {
  return hasTabsRefinementAuthorization(status) && (
    (status.componentRefinements.tabs.stage !== "documentation" && filePath === "apps/playground/src/experiments/tabs-preflight.tsx" && ["@base-ui/react/tabs", "@base-ui/react/tooltip"].includes(specifier))
    || (["component", "documentation"].includes(status.componentRefinements.tabs.stage) && ({ "packages/ui/src/tabs/tabs.tsx": "@base-ui/react/tabs", "packages/ui/src/tabs/tabs-full-label.tsx": "@base-ui/react/tooltip" })[filePath] === specifier)
  );
}

export const tagRefinementFiles = {
  foundations: ["packages/foundations/src/tag-token-contract.ts", "packages/foundations/src/tag-token-contract.test.ts"],
  ui: ["tag.styles.ts", "link-tag.tsx", "checkable-tag.tsx", "tag-interactions.test.tsx"].map((name) => `packages/ui/src/tag/${name}`),
  application: ["tag-page.tsx", "tag-page.css", "tag-page.test.tsx"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: ["scripts/tag-governance.test.ts", "scripts/tag-color-consumers.test.ts", "tests/e2e/tag.spec.ts", "packages/ui/src/tag/tag.tsx", "packages/ui/src/tag/tag-badge.test.tsx"],
  documents: ["docs/plans/2026-09-08-tag-design.md", "docs/plans/2026-09-09-tag-batch-one-implementation.md", "registry/tag.json", ...["tag", "link-tag", "checkable-tag", "checkable-tag-group"].map((name) => `manifests/ui/${name}.yaml`)],
  evidence: ["source-colors.json", "verification.md", "independent-review.md", "light.png", "dark.png", "compact.png", "color-findings.json", "paint-samples.json"].map((name) => `evidence/runtime/tag-batch-one/${name}`),
};

export const tagBatchTwoNames = ["learning-unit-tag", "difficulty-tag", "group-type-tag", "status-tag", "system-status-tag", "learning-unit-reminder-mark", "scored-task-type-mark"];
export const tagBatchTwoRefinementFiles = {
  foundations: [],
  ui: ["domain-tags.tsx", "domain-tags.styles.ts", "domain-tags.test.tsx"].map((name) => `packages/ui/src/tag/${name}`),
  application: [],
  workspace: ["tests/e2e/tag-domain.spec.ts"],
  documents: ["docs/plans/2026-09-09-tag-batch-two-implementation.md", ...tagBatchTwoNames.map((name) => `manifests/ui/${name}.yaml`)],
  evidence: ["verification.md", "independent-review.md", "light.png", "dark.png", "compact.png", "color-findings.json", "paint-samples.json"].map((name) => `evidence/runtime/tag-batch-two/${name}`),
};

export const tagBatchThreeFiles = {
  foundations: [],
  ui: ["tag-select.tsx", "tag-select.styles.ts", "tag-select.test.tsx"].map((name) => `packages/ui/src/tag/${name}`),
  application: ["tag-management-recipe.tsx", "tag-management-recipe.test.tsx", "tag-flow-examples.tsx"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: ["scripts/tag-batch-three-governance.test.ts", "tests/e2e/tag-batch-three.spec.ts"],
  documents: ["docs/plans/2026-09-09-tag-batch-three-design.md", "docs/plans/2026-09-09-tag-batch-three-implementation.md", "manifests/ui/tag-select.yaml", "registry/tag-select.json"],
  evidence: ["verification.md", "independent-review.md", "light.png", "dark.png", "narrow.png", "create.png", "edit.png", "forced-colors.png", "browser-facts.json"].map((name) => `evidence/runtime/tag-batch-three/${name}`),
};
export const tagBatchThreeDependencies = Object.freeze({ "@base-ui/react": "1.8.0" });

export function hasTagBatchThreeAuthorization(status) {
  const entry = status?.componentRefinements?.tagBatchThree;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry) && hasTagBatchTwoRefinementAuthorization(status) && hasDropdownBatchOneAuthorization(status)
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && ["not-evaluated", "awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || (entry.implementation === "completed" && Boolean(entry.humanGateDecision) && exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-10", decisionSource: "explicit-user-confirmation",
      userStatement: "好的，这一版视觉已经完成人工验收，没有问题。", scope: "tag-batch-three-runtime-visual-only",
      evidence: "../evidence/runtime/tag-batch-three/verification.md",
    })))
    && (entry.implementation !== "completed" || (entry.automatedVerification === "passed" && entry.independentReview === "passed"))
    && (entry.humanGate !== "awaiting_human" || entry.implementation === "completed")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-09",
      decisionSource: "explicit-user-continue-tag-next-step", userStatement: "继续建设tag的下一步",
      scope: "tag-select-and-local-tag-management-recipe",
      plan: "../docs/plans/2026-09-09-tag-batch-three-implementation.md", design: "../docs/plans/2026-09-09-tag-batch-three-design.md",
      headless: "base-ui-1.8.0-select-and-popover-only", implementationBaseline: "same-panel-immediate-selection",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate, ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}), contrastAcceptance: "not-granted",
      doesNotAuthorize: ["other-public-overlay-or-selection-migration", "new-color-values-or-global-visual-rules", "other-headless-dependencies-or-contrast-exceptions", "figma-publication-business-migration-or-git"],
    });
}

export function isTagBatchThreeImport(filePath, specifier) {
  return filePath === "packages/ui/src/tag/tag-select.tsx" && specifier === "@base-ui/react/select"
    || filePath === "apps/playground/src/docs/components/tag-management-recipe.tsx" && specifier === "@base-ui/react/popover";
}

export function hasTagBatchTwoRefinementAuthorization(status) {
  const refinement = status?.componentRefinements?.tagBatchTwo;
  const accepted = refinement?.humanGate === "accepted";
  return Boolean(refinement && status?.currentPhase?.id === "token-foundations-v1"
    && hasTagRefinementAuthorization(status)
    && ["awaiting_human", "accepted"].includes(refinement.humanGate)
    && (!accepted || (refinement.automatedVerification === "passed"
      && ["findings", "passed"].includes(refinement.independentReview)
      && exactRecord(refinement.humanGateDecision, {
        acceptedAt: "2026-09-09", decisionSource: "explicit-user-confirmation",
        userStatement: "视觉没问题。继续推进", scope: "tag-batch-two-runtime-visual-only",
        evidence: "../evidence/runtime/tag-batch-two/verification.md",
      })))
    && ["in-progress", "completed"].includes(refinement.implementation)
    && ["not-run", "failed", "passed"].includes(refinement.automatedVerification)
    && ["not-run", "findings", "passed"].includes(refinement.independentReview)
    && (refinement.implementation !== "completed" || (refinement.automatedVerification === "passed" && refinement.independentReview === "passed"))
    && exactRecord(refinement, {
      authorization: "authorized", authorizedAt: "2026-09-09", decisionSource: "explicit-user-start-tag-batch-two-implementation",
      userStatement: "确定。开始实施", scope: "tag-batch-two-domain-shapes-solid-oncolor-internal-score",
      plan: "../docs/plans/2026-09-09-tag-batch-two-implementation.md", design: "../docs/plans/2026-09-08-tag-design.md",
      implementation: refinement.implementation, automatedVerification: refinement.automatedVerification, independentReview: refinement.independentReview,
      humanGate: refinement.humanGate, ...(accepted ? { humanGateDecision: refinement.humanGateDecision } : {}), contrastAcceptance: "not-granted",
      doesNotAuthorize: ["tag-select-or-creation", "other-components-or-global-visual-rules", "new-dependencies-or-contrast-exceptions", "figma-publication-business-migration-or-git"],
    }));
}

export function hasTagRefinementAuthorization(status) {
  const refinement = status?.componentRefinements?.tag;
  const accepted = refinement?.humanGate === "accepted";
  return Boolean(refinement && status?.currentPhase?.id === "token-foundations-v1"
    && ["awaiting_human", "accepted"].includes(refinement.humanGate)
    && (!accepted || (refinement.automatedVerification === "passed"
      && ["findings", "passed"].includes(refinement.independentReview)
      && exactRecord(refinement.humanGateDecision, {
        acceptedAt: "2026-09-09", decisionSource: "explicit-user-confirmation",
        userStatement: "没问题。完成本轮视觉校验。推进下一步",
        scope: "tag-batch-one-runtime-visual-only", evidence: "../evidence/runtime/tag-batch-one/verification.md",
      })))
    && ["in-progress", "completed"].includes(refinement.implementation)
    && ["not-run", "failed", "passed"].includes(refinement.automatedVerification)
    && ["not-run", "findings", "passed"].includes(refinement.independentReview)
    && (refinement.implementation !== "completed" || (refinement.automatedVerification === "passed" && refinement.independentReview === "passed"))
    && exactRecord(refinement, {
      authorization: "authorized", authorizedAt: "2026-09-09",
      decisionSource: "explicit-user-enter-tag-batch-one-implementation", userStatement: "进入下一步",
      scope: "tag-batch-one-full-palette-sizes-dismiss-link-and-selection",
      plan: "../docs/plans/2026-09-09-tag-batch-one-implementation.md", design: "../docs/plans/2026-09-08-tag-design.md",
      visualBaseline: "accepted-preview-visual-only", implementation: refinement.implementation,
      automatedVerification: refinement.automatedVerification, independentReview: refinement.independentReview,
      humanGate: refinement.humanGate, ...(accepted ? { humanGateDecision: refinement.humanGateDecision } : {}), contrastAcceptance: "not-granted",
      doesNotAuthorize: ["tag-domain-shapes-or-tag-select-and-creation", "other-components-or-global-visual-rules", "new-dependencies-or-unreviewed-contrast-exceptions", "figma-publication-business-migration-or-git"],
    }));
}

export function hasInputRefinementAuthorization(status) {
  const refinement = status?.componentRefinements?.input;
  if (!refinement) return false;
  return status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(refinement.implementation)
    && ["not-run", "failed", "passed"].includes(refinement.automatedVerification)
    && ["not-run", "findings", "passed"].includes(refinement.independentReview)
    && (refinement.implementation !== "completed" || (refinement.automatedVerification === "passed" && refinement.independentReview === "passed"))
    && validAssetClosureVisualGate(refinement, "input-search-input-form-item-runtime-visual-only")
    && exactRecord(refinement, {
      authorization: "authorized", authorizedAt: "2026-09-08",
      decisionSource: "explicit-user-start-input-construction", userStatement: "开始建设该组件",
      scope: "input-search-input-form-item-token-recipes-and-review",
      plan: "../docs/plans/2026-09-08-input-implementation.md", design: "../docs/plans/2026-09-08-input-design.md",
      implementation: refinement.implementation, automatedVerification: refinement.automatedVerification,
      independentReview: refinement.independentReview, humanGate: refinement.humanGate, ...(refinement.humanGate === "accepted" ? { humanGateDecision: refinement.humanGateDecision } : {}),
      ...(refinement.visualRevision ? { visualRevision: {
        authorization: "authorized", authorizedAt: "2026-09-08",
        decisionSource: "explicit-user-start-confirmed-input-visual-revision", userStatement: "开始调整代码",
        scope: "input-clear-order-spacing-focus-status-and-text-color-revision", contrastAcceptance: "not-granted",
      } } : {}),
      doesNotAuthorize: ["other-components-or-public-control-height-scale", "new-colors-or-dependencies", "figma-publication-business-migration-or-git"],
    });
}

export const iconButtonRefinementFiles = {
  foundations: ["packages/foundations/src/icon-size-contract.ts", "packages/foundations/src/icon-size-contract.test.ts"],
  ui: ["icon-button.tsx", "icon-button.styles.ts", "icon-button.test.tsx"].map((name) => `packages/ui/src/icon-button/${name}`),
  application: ["icon-button-page.tsx", "icon-button-page.css", "icon-button-page.test.tsx"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: ["tests/e2e/icon-button.spec.ts", "scripts/icon-size-outputs.test.ts", "scripts/icon-button-color-consumers.test.ts"],
  documents: ["docs/plans/2026-09-07-icon-button-implementation.md", "manifests/ui/icon-button.yaml", "registry/icon-button.json"],
  evidence: ["verification.md", "light.png", "dark.png", "compact.png"].map((name) => `evidence/runtime/icon-button/${name}`),
};

export function hasIconButtonRefinementAuthorization(status) {
  const refinement = status?.componentRefinements?.iconButton;
  if (!refinement) return false;
  return status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(refinement.implementation)
    && ["not-run", "failed", "passed"].includes(refinement.automatedVerification)
    && ["not-run", "findings", "passed"].includes(refinement.independentReview)
    && ["awaiting_human", "accepted"].includes(refinement.humanGate)
    && (refinement.humanGate !== "accepted" || refinement.implementation === "completed")
    && (refinement.implementation !== "completed"
      || (refinement.automatedVerification === "passed" && refinement.independentReview === "passed"))
    && exactRecord(refinement, {
      authorization: "authorized",
      authorizedAt: "2026-09-07",
      decisionSource: "explicit-user-start-implementation-after-icon-button-design-confirmation",
      userStatement: "开始实现",
      scope: "public-icon-size-foundations-icon-button-and-review-verification",
      plan: "../docs/plans/2026-09-07-icon-button-implementation.md",
      designConfirmation: "accepted",
      implementation: refinement.implementation,
      automatedVerification: refinement.automatedVerification,
      independentReview: refinement.independentReview,
      humanGate: refinement.humanGate,
      ...(refinement.humanGate === "accepted" ? {
        humanGateDecision: {
          acceptedAt: "2026-09-07", decisionSource: "explicit-user-confirmation", userStatement: "确认视觉验收",
          scope: "icon-button-visual-only", evidence: "../evidence/runtime/icon-button/verification.md",
        },
      } : {}),
      doesNotAuthorize: [
        "existing-component-migration-or-visual-changes",
        "tooltip-or-headless-library-selection",
        "new-dependencies",
        "figma-publication-business-migration-or-git",
      ],
    });
}

export const questionOptionSizeReviewFiles = {
  application: [
    "apps/playground/question-option-sizes.html",
    ...["main.tsx", "review.css", "manifest.json"].map((name) => `apps/playground/src/experiments/question-option-sizes/${name}`),
  ],
  workspace: ["tests/e2e/question-option-sizes.spec.ts"],
};

export const dropdownBatchOneDependencies = Object.freeze({
  "@base-ui/react": "1.8.0",
  "@radix-ui/react-dialog": "1.1.23",
  "@radix-ui/react-dropdown-menu": "2.1.24",
  "@radix-ui/react-popover": "1.1.23",
  "@radix-ui/react-select": "2.3.7",
});

export const dropdownFamilyFiles = {
  ui: ["packages/ui/src/_internal/popup.tsx",
    ...["dropdown-menu.tsx", "dropdown-menu.styles.ts", "dropdown-menu.css", "dropdown-menu.css.d.ts", "dropdown-menu.test.tsx"].map(name => `packages/ui/src/dropdown-menu/${name}`),
    ...["popover.tsx", "popover.test.tsx"].map(name => `packages/ui/src/popover/${name}`)],
  application: ["dropdown-page.tsx", "dropdown-page.css"].map(name => `apps/playground/src/docs/components/${name}`),
  workspace: ["scripts/dropdown-family.test.ts", "tests/e2e/dropdown.spec.ts"],
  documents: ["manifests/ui/dropdown-menu.yaml", "manifests/ui/popover.yaml", "registry/dropdown-family.json"],
  evidence: ["verification.md", "composition.md", "checks.log", "initial-checks.log", "browser.json", "color-review.json", "menu-light.png", "menu-dark.png", "template.png", "narrow.png", "selection-visual-reuse.md", "selection-checks.log", "selection-light.png", "selection-dark.png", "selection-light.json", "selection-dark.json", "selection-color-review.json"].map(name => `evidence/runtime/dropdown/${name}`),
};

function validDropdownSelectionVisualReuse(entry) {
  return Boolean(entry)
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || (entry.automatedVerification === "passed" && entry.independentReview === "passed"))
    && validAssetClosureVisualGate(entry, "menu-passive-selection-indicators-runtime-visual-only")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-10", decisionSource: "explicit-user-share-checkbox-radio-menu-visuals",
      userStatement: "需要统一复用视觉", scope: "passive-checkbox-radio-visuals-in-menu",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification,
      independentReview: entry.independentReview, humanGate: entry.humanGate, ...(entry.humanGate === "accepted" ? { humanGateDecision: entry.humanGateDecision } : {}), contrastAcceptance: "not-granted",
    });
}

export function hasDropdownSelectionVisualReuseAuthorization(status) {
  return hasDropdownFamilyAuthorization(status) && validDropdownSelectionVisualReuse(status.componentRefinements.dropdownFamily.selectionVisualReuse);
}

export function hasDropdownFamilyAuthorization(status) {
  const entry = status?.componentRefinements?.dropdownFamily;
  return Boolean(entry) && status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || (entry.automatedVerification === "passed" && entry.independentReview === "passed"))
    && (entry.selectionVisualReuse === undefined || validDropdownSelectionVisualReuse(entry.selectionVisualReuse))
    && validAssetClosureVisualGate(entry, "dropdown-menu-popover-runtime-visual-only")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-10",
      decisionSource: "explicit-user-resume-dropdown-construction-from-handoff",
      userStatement: "请先读取 HANDOFF.md，了解项目上下文，再继续推进建设 下拉菜单组件。",
      scope: "public-dropdown-menu-popover-and-three-composition-recipes",
      plan: "../docs/plans/2026-09-09-dropdown-family-construction-plan.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification,
      independentReview: entry.independentReview, humanGate: entry.humanGate, ...(entry.humanGate === "accepted" ? { humanGateDecision: entry.humanGateDecision } : {}), contrastAcceptance: "not-granted",
      ...(entry.selectionVisualReuse ? { selectionVisualReuse: entry.selectionVisualReuse } : {}),
      doesNotAuthorize: ["existing-select-dialog-or-choice-control-migration", "global-token-value-changes-or-new-dependencies", "figma-publication-business-migration-or-git"],
    });
}

export function isDropdownFamilyImport(filePath, specifier) {
  return ({
    "packages/ui/src/dropdown-menu/dropdown-menu.tsx": "@base-ui/react/menu",
    "packages/ui/src/popover/popover.tsx": "@base-ui/react/popover",
    "apps/playground/src/docs/components/dropdown-page.tsx": "@base-ui/react/dialog",
  })[filePath] === specifier;
}

export const dropdownBatchOneFiles = {
  application: [
    "apps/playground/dropdown-review.html",
    ...["main.tsx", "content.tsx", "base.tsx", "radix.tsx", "review.css", "manifest.json"]
      .map((name) => `apps/playground/src/experiments/headless/${name}`),
  ],
  workspace: ["scripts/dropdown-batch-one.test.ts", "tests/e2e/dropdown-batch-one.spec.ts"],
  documents: ["docs/adr/0005-headless-base.md"],
};

export function hasDropdownBatchOneAuthorization(status) {
  return status?.currentPhase?.id === "token-foundations-v1"
    && exactRecord(status.localExperiments?.dropdownBatchOne, {
      authorization: "authorized", authorizedAt: "2026-09-09",
      decisionSource: "explicit-user-start-dropdown-batch-one", userStatement: "开始进入第一批",
      scope: "dropdown-visual-and-headless-comparison-only", assetIdentity: "local-experiment",
      plan: "../docs/plans/2026-09-09-dropdown-family-construction-plan.md",
      manifest: "../apps/playground/src/experiments/headless/manifest.json",
    });
}

export function isDropdownExperimentImport(filePath, specifier) {
  if (filePath === "apps/playground/src/experiments/headless/base.tsx") {
    return ["menu", "popover", "select", "dialog"].some((part) => specifier === `@base-ui/react/${part}`);
  }
  return filePath === "apps/playground/src/experiments/headless/radix.tsx"
    && Object.hasOwn(dropdownBatchOneDependencies, specifier) && specifier !== "@base-ui/react";
}

export const questionOptionSizeRefinementFiles = {
  ui: ["packages/ui/src/recipes/question-option-size.ts"],
  documents: ["docs/plans/2026-09-08-question-option-size-implementation.md"],
};

export function hasQuestionOptionSizeRefinementAuthorization(status) {
  const refinement = status?.componentRefinements?.questionOptionSizes;
  return Boolean(refinement)
    && hasQuestionNumberRefinementAuthorization(status) && hasOptionButtonContentRefinementAuthorization(status)
    && ["in-progress", "completed"].includes(refinement.implementation)
    && ["not-run", "failed", "passed"].includes(refinement.automatedVerification)
    && ["not-run", "findings", "passed"].includes(refinement.independentReview)
    && ["awaiting_human", "accepted"].includes(refinement.humanGate)
    && (refinement.humanGate !== "accepted" || refinement.implementation === "completed")
    && (refinement.implementation !== "completed" || (refinement.automatedVerification === "passed" && refinement.independentReview === "passed"))
    && exactRecord(refinement, {
      authorization: "authorized", authorizedAt: "2026-09-08",
      decisionSource: "explicit-user-continue-after-six-size-visual-acceptance", userStatement: "继续推进",
      scope: "question-option-six-public-sizes-default-28-and-density-spacing",
      plan: "../docs/plans/2026-09-08-question-option-size-implementation.md", designConfirmation: "accepted",
      implementation: refinement.implementation, automatedVerification: refinement.automatedVerification,
      independentReview: refinement.independentReview, humanGate: refinement.humanGate,
      ...(refinement.humanGate === "accepted" ? {
        humanGateDecision: {
          acceptedAt: "2026-09-08", decisionSource: "explicit-user-confirmation",
          userStatement: "视觉确认，", scope: "question-option-six-public-sizes-visual-only",
          evidence: "../docs/plans/2026-09-08-question-option-size-implementation.md",
        },
      } : {}),
      doesNotAuthorize: ["top-right-feedback-or-new-business-behavior", "new-tokens-dependencies-or-contrast-exceptions", "other-component-gates-or-publication-business-migration-git"],
    });
}

export function hasQuestionOptionSizeReviewAuthorization(status) {
  return status?.currentPhase?.id === "token-foundations-v1"
    && Boolean(status.localExperiments)
    && exactRecord(status.localExperiments.questionOptionSizeReview, {
        authorization: "authorized", authorizedAt: "2026-09-08",
        decisionSource: "explicit-user-continue-size-comparison", userStatement: "继续推进",
        scope: "question-option-six-size-local-review-only", assetIdentity: "local-experiment",
        plan: "../docs/plans/2026-09-08-question-option-size-design.md",
        manifest: "../apps/playground/src/experiments/question-option-sizes/manifest.json",
    });
}

export const questionNumberRefinementFiles = {
  foundations: [],
  ui: ["question-number.tsx", "question-number.styles.ts", "question-number.test.tsx"].map((name) => `packages/ui/src/question-number/${name}`),
  application: ["question-number-page.tsx", "question-number-page.css", "question-number-page.test.tsx"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: ["tests/e2e/question-number.spec.ts"],
  documents: ["docs/plans/2026-09-08-question-number-implementation.md", "manifests/ui/question-number.yaml", "registry/question-number.json"],
  evidence: ["verification.md", "light.png", "dark.png", "compact.png"].map((name) => `evidence/runtime/question-number/${name}`),
};

export const textButtonVisualAcceptance = Object.freeze({
  acceptedAt: "2026-09-08", decisionSource: "explicit-user-confirmation",
  userStatement: "TextButton：最新配方的视觉验收确认", scope: "text-button-current-token-recipe-visual-only",
  evidence: "../docs/verification/2026-09-03-text-button-implementation.md",
});

export const questionNumberContrastAcceptance = Object.freeze({
  acceptedAt: "2026-09-08", decisionSource: "explicit-user-component-acceptance-after-contrast-review",
  userStatement: "题号按钮：完成验收。题号右上角反馈方案暂时先不建设了。",
  scope: "question-number-declared-contrast-combinations-only", findingCount: 93,
  findingsSha256: "df163ed1e0011b628f0549421c27575929209f3cd5012994b9d6f69e2044ade8",
  outcome: "report-actual-contrast-user-accepted", evidence: "../evidence/runtime/question-number/verification.md",
});

export const optionButtonContentContrastAcceptance = Object.freeze({
  acceptedAt: "2026-09-08", decisionSource: "explicit-user-contrast-acceptance",
  userStatement: "选项按钮：基础选择和六档尺寸已验收；结果、只读、判断、图文已实现，对比度完成验收。",
  scope: "option-button-content-declared-contrast-combinations-only", findingCount: 9,
  findingsSha256: "93eec9a4677e563320da4ffc5ded2111baadd2c25c7d3556709a8c39548a2d33",
  outcome: "report-actual-contrast-user-accepted", evidence: "../evidence/runtime/option-button-content/verification.md",
});

export function hasQuestionNumberRefinementAuthorization(status) {
  const refinement = status?.componentRefinements?.questionNumber;
  if (!refinement) return false;
  return status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(refinement.implementation)
    && ["not-run", "failed", "passed"].includes(refinement.automatedVerification)
    && ["not-run", "findings", "passed"].includes(refinement.independentReview)
    && ["not-evaluated", "awaiting_human", "accepted"].includes(refinement.humanGate)
    && (refinement.implementation !== "completed"
      || (refinement.automatedVerification === "passed" && refinement.independentReview === "passed"))
    && exactRecord(refinement, {
      authorization: "authorized", authorizedAt: "2026-09-08",
      decisionSource: "explicit-user-continue-after-question-number-reference-confirmation",
      userStatement: "继续", scope: "question-number-32-bottom-feedback-and-two-grading-icons",
      plan: "../docs/plans/2026-09-08-question-number-implementation.md", designConfirmation: "accepted",
      implementation: refinement.implementation, automatedVerification: refinement.automatedVerification,
      independentReview: refinement.independentReview, humanGate: refinement.humanGate,
      ...(refinement.humanGate === "accepted" ? {
        humanGateDecision: {
          acceptedAt: "2026-09-08", decisionSource: "explicit-user-confirmation",
          userStatement: "首版32px的题号按钮，已可以视觉验收", scope: "question-number-32-visual-only",
          evidence: "../evidence/runtime/question-number/verification.md",
        },
      } : {}),
      ...(refinement.contrastAcceptance ? { contrastAcceptance: questionNumberContrastAcceptance } : {}),
      doesNotAuthorize: [
        "other-sizes-top-right-markers-or-option-button", "existing-component-migration-or-visual-changes",
        "tooltip-or-new-dependencies", "figma-publication-business-migration-or-git",
      ],
    });
}

export const optionButtonRefinementFiles = {
  foundations: [],
  ui: ["option-button.tsx", "option-button.styles.ts", "option-button.test.tsx"].map((name) => `packages/ui/src/option-button/${name}`),
  application: ["option-button-page.tsx", "option-button-page.css", "option-button-page.test.tsx"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: ["tests/e2e/option-button.spec.ts"],
  documents: ["docs/plans/2026-09-08-option-button-implementation.md", "manifests/ui/option-button.yaml", "registry/option-button.json"],
  evidence: ["verification.md", "light.png", "dark.png", "compact.png"].map((name) => `evidence/runtime/option-button/${name}`),
};

export const optionButtonContentRefinementFiles = {
  application: ["option-chart-linear.svg", "option-chart-parabola.svg"].map((name) => `apps/playground/src/docs/components/${name}`),
  documents: ["docs/plans/2026-09-08-option-button-content-implementation.md"],
  evidence: ["verification.md", "light.png", "dark.png", "compact.png"].map((name) => `evidence/runtime/option-button-content/${name}`),
};

function validOptionButtonContentRefinement(refinement) {
  return Boolean(refinement)
    && ["in-progress", "completed"].includes(refinement.implementation)
    && ["not-run", "failed", "passed"].includes(refinement.automatedVerification)
    && ["not-run", "findings", "passed"].includes(refinement.independentReview)
    && ["not-evaluated", "awaiting_human", "accepted"].includes(refinement.humanGate)
    && (refinement.humanGate !== "accepted" || refinement.implementation === "completed")
    && (refinement.implementation !== "completed" || (refinement.automatedVerification === "passed" && refinement.independentReview === "passed"))
    && exactRecord(refinement, {
      authorization: "authorized", authorizedAt: "2026-09-08",
      decisionSource: "explicit-user-continue-after-option-selection-visual-confirmation",
      userStatement: "视觉没问题。推进下一步", scope: "option-button-32-results-readonly-judgment-media",
      plan: "../docs/plans/2026-09-08-option-button-content-implementation.md", designConfirmation: "accepted",
      implementation: refinement.implementation, automatedVerification: refinement.automatedVerification,
      independentReview: refinement.independentReview, humanGate: refinement.humanGate,
      ...(refinement.humanGate === "accepted" ? {
        humanGateDecision: {
          acceptedAt: "2026-09-08", decisionSource: "explicit-user-component-and-contrast-confirmation",
          userStatement: "选项按钮：基础选择和六档尺寸已验收；结果、只读、判断、图文已实现，对比度完成验收。",
          scope: "option-button-results-readonly-judgment-media-and-contrast",
          evidence: "../evidence/runtime/option-button-content/verification.md",
        },
      } : {}),
      ...(refinement.contrastAcceptance ? { contrastAcceptance: optionButtonContentContrastAcceptance } : {}),
      doesNotAuthorize: [
        "other-sizes-new-tokens-or-new-dependencies", "existing-component-migration-or-question-number-contrast-exceptions",
        "business-progress-appeals-or-grading-workflows", "figma-publication-business-migration-or-git",
      ],
    });
}

export function hasOptionButtonRefinementAuthorization(status) {
  const refinement = status?.componentRefinements?.optionButton;
  if (!refinement) return false;
  const accepted = refinement.humanGate === "accepted";
  const content = refinement.contentRefinement;
  return status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(refinement.implementation)
    && ["not-run", "failed", "passed"].includes(refinement.automatedVerification)
    && ["not-run", "findings", "passed"].includes(refinement.independentReview)
    && ["not-evaluated", "awaiting_human", "accepted"].includes(refinement.humanGate)
    && ((!accepted && refinement.implementation !== "completed")
      || (refinement.implementation === "completed" && refinement.automatedVerification === "passed" && refinement.independentReview === "passed"))
    && (!accepted || Boolean(exactRecord(refinement.humanGateDecision, {
      acceptedAt: "2026-09-08", decisionSource: "explicit-user-confirmation",
      userStatement: "视觉没问题。推进下一步", scope: "option-button-32-selection-visual-only",
      evidence: "../evidence/runtime/option-button/verification.md",
    })))
    && (content === undefined || (accepted && validOptionButtonContentRefinement(content)))
    && exactRecord(refinement, {
      authorization: "authorized", authorizedAt: "2026-09-08",
      decisionSource: "explicit-user-continue-next-question-option-batch", userStatement: "继续推进下一批",
      scope: "option-button-32-single-multiple-standalone-and-text-row",
      plan: "../docs/plans/2026-09-08-option-button-implementation.md", designConfirmation: "accepted",
      implementation: refinement.implementation, automatedVerification: refinement.automatedVerification,
      independentReview: refinement.independentReview, humanGate: refinement.humanGate,
      ...(accepted ? { humanGateDecision: refinement.humanGateDecision } : {}),
      ...(content !== undefined ? { contentRefinement: content } : {}),
      doesNotAuthorize: [
        "other-sizes-result-feedback-readonly-judgment-or-rich-media", "existing-component-migration-or-visual-changes",
        "new-dependencies-or-business-progress", "figma-publication-business-migration-or-git",
      ],
    });
}

export function hasOptionButtonContentRefinementAuthorization(status) {
  return hasOptionButtonRefinementAuthorization(status)
    && validOptionButtonContentRefinement(status.componentRefinements.optionButton.contentRefinement);
}

export const selectionPlaygroundSc04Files = {
  foundations: [], ui: [],
  application: ["selection-playground-page.tsx", "selection-playground-page.css", "selection-playground-page.test.tsx"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: ["scripts/selection-playground-governance.test.ts", "tests/e2e/selection-playground.spec.ts"],
  documents: ["docs/plans/2026-09-10-selection-playground-sc04-implementation.md"],
  evidence: ["verification.md", "acceptance.json", "checks.log", "light.png", "dark.png", "narrow.png", "compact.png", "forced-colors.png", "long-preview.png", "browser-facts.json"].map((name) => `evidence/runtime/selection-playground/${name}`),
};

export function hasSelectionPlaygroundSc04Authorization(status) {
  const entry = status?.componentRefinements?.selectionPlaygroundSc04;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry) && status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || (entry.automatedVerification === "passed" && entry.independentReview === "passed"))
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-10", decisionSource: "explicit-user-advance-after-sc03-acceptance",
      userStatement: "推进下一步", scope: "classified-selection-playground-real-source-lookup-acceptance-evidence",
      sharedPreviewRepair: "wrap-and-scroll-overlong-preview-heading",
      plan: "../docs/plans/2026-09-10-selection-playground-sc04-implementation.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate, ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}), contrastAcceptance: "not-granted",
      doesNotAuthorize: ["new-public-components-or-registry-installer", "global-token-value-changes-or-new-dependencies", "figma-publication-business-migration-or-git"],
    })
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || (entry.implementation === "completed" && Boolean(exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-12", decisionSource: "explicit-user-confirmation", userStatement: "基础页通过； 综合页通过",
      scope: "selection-playground-sc04-edit-classify-preview-close-runtime-visual-interaction-only",
      evidence: "../evidence/runtime/selection-playground/verification.md",
      doesNotAuthorize: ["color-or-contrast-acceptance", "remaining-manual-keyboard-at-or-real-device-checks", "source-lookup-or-registry-publication", "figma-publication-business-migration-or-git"],
    }))));
}

export const selectionPatternsSc03Files = {
  foundations: [], ui: [],
  application: ["patterns/selection-patterns.tsx", "patterns/selection-patterns.css", "patterns/selection-patterns.test.tsx", "docs/components/selection-patterns-page.tsx", "docs/components/selection-preview-content.tsx"].map((name) => `apps/playground/src/${name}`),
  workspace: ["scripts/selection-patterns-governance.test.ts", "tests/e2e/selection-patterns.spec.ts"],
  documents: ["docs/plans/2026-09-10-selection-patterns-sc03-implementation.md", "manifests/patterns/independent-preview.yaml", "manifests/patterns/dependent-fields.yaml", "manifests/patterns/page-selection.yaml", "registry/selection-patterns.json"],
  evidence: ["verification.md", "light.png", "dark.png", "preview-light.png", "preview-dark.png", "narrow.png", "compact.png", "forced-colors.png", "browser-facts.json"].map((name) => `evidence/runtime/selection-patterns/${name}`),
};

export function hasSelectionPatternsSc03Authorization(status) {
  const entry = status?.componentRefinements?.selectionPatternsSc03;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry) && status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || (entry.automatedVerification === "passed" && entry.independentReview === "passed"))
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-10", decisionSource: "explicit-user-continue-after-selection-cards-acceptance",
      userStatement: "继续推进", scope: "independent-preview-dependent-fields-current-page-selection",
      plan: "../docs/plans/2026-09-10-selection-patterns-sc03-implementation.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate, ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}), contrastAcceptance: "not-granted",
      doesNotAuthorize: ["server-wide-selection-or-public-dialog-component", "global-token-value-changes-or-new-dependencies", "figma-publication-business-migration-or-git"],
    })
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || (entry.implementation === "completed" && Boolean(exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-10", decisionSource: "explicit-user-confirmation", userStatement: "没问题，完成验收",
      scope: "selection-patterns-sc03-runtime-visual-interaction-only", evidence: "../evidence/runtime/selection-patterns/verification.md",
    }))));
}

export const selectionCardsSc02Files = {
  foundations: [],
  ui: ["packages/ui/src/selection-card/selection-card.tsx", "packages/ui/src/selection-card/selection-card.test.tsx", "packages/ui/src/recipes/selection-card-recipes.tsx"],
  application: ["selection-cards-page.tsx", "selection-cards-page.css", "assets/selection-cards/list-workbench.png", "assets/selection-cards/report-layout.png"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: ["scripts/selection-cards-governance.test.ts", "tests/e2e/selection-cards.spec.ts"],
  documents: ["docs/plans/2026-09-10-selection-cards-sc02-implementation.md", "manifests/ui/checkbox-card.yaml", "manifests/ui/radio-card.yaml", "manifests/recipes/radio-preview-card.yaml", "manifests/recipes/checkbox-object-card.yaml", "manifests/recipes/radio-comparison-card.yaml", "manifests/recipes/radio-card-with-preview.yaml", "registry/selection-cards.json"],
  evidence: ["verification.md", "figma-reference.json", "figma-reference.png", "light.png", "dark.png", "light-hover.png", "dark-hover.png", "light-pressed.png", "dark-pressed.png", "narrow.png", "compact.png", "forced-colors.png", "browser-facts.json"].map((name) => `evidence/runtime/selection-cards/${name}`),
};

export function hasSelectionCardsSc02Authorization(status) {
  const entry = status?.componentRefinements?.selectionCardsSc02;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry) && status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || (entry.automatedVerification === "passed" && entry.independentReview === "passed"))
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || (entry.implementation === "completed" && Boolean(exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-10", decisionSource: "explicit-user-confirmation", userStatement: "完成视觉验收。",
      scope: "selection-cards-sc02-runtime-visual-only", evidence: "../evidence/runtime/selection-cards/verification.md",
    }))))
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-10", decisionSource: "explicit-user-continue-after-standard-radio",
      userStatement: "确定。推进下一步", scope: "checkbox-radio-cards-four-composition-recipes",
      plan: "../docs/plans/2026-09-10-selection-cards-sc02-implementation.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate, ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}),
      contrastAcceptance: "not-granted", selectedBorder: "Border/Brand/1-current-theme",
      doesNotAuthorize: ["preview-presenter-conditional-fields-page-selection-patterns", "global-token-value-changes-or-new-dependencies", "figma-publication-business-migration-or-git"],
    });
}

export const radioSc01Files = {
  foundations: [],
  ui: ["packages/ui/src/radio/radio.tsx", "packages/ui/src/radio/radio.test.tsx", "packages/ui/src/utils/use-default-reset.ts"],
  application: ["radio-page.tsx", "radio-page.css"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: ["scripts/radio-governance.test.ts", "tests/e2e/radio.spec.ts"],
  documents: ["docs/plans/2026-09-10-radio-sc01-implementation.md", "docs/adr/0007-native-radio.md", "manifests/ui/radio.yaml", "manifests/ui/radio-group.yaml", "registry/radio.json"],
  evidence: ["verification.md", "figma-reference.json", "figma-reference.png", "light.png", "dark.png", "light-hover.png", "dark-hover.png", "light-pressed.png", "dark-pressed.png", "narrow.png", "compact.png", "forced-colors.png", "browser-facts.json"].map((name) => `evidence/runtime/radio/${name}`),
};

export function hasRadioSc01Authorization(status) {
  const entry = status?.componentRefinements?.radioSc01;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry) && status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || (entry.automatedVerification === "passed" && entry.independentReview === "passed"))
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || (entry.implementation === "completed" && Boolean(exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-10", decisionSource: "explicit-user-confirmation", userStatement: "确定。推进下一步",
      scope: "radio-radiogroup-sc01-runtime-visual-only", evidence: "../evidence/runtime/radio/verification.md",
    }))))
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-10", decisionSource: "explicit-user-start-standard-radio-and-radiogroup",
      userStatement: "开始建设标准单选框 Radio + RadioGroup", scope: "radio-radiogroup-standard-description-and-native-form",
      plan: "../docs/plans/2026-09-10-radio-sc01-implementation.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate, ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}), contrastAcceptance: "not-granted",
      doesNotAuthorize: ["cards-preview-conditional-panel-patterns", "global-token-value-changes-or-new-dependencies", "figma-publication-business-migration-or-git"],
    });
}

export const switchSc01Files = {
  foundations: [],
  ui: ["packages/ui/src/switch/switch.tsx", "packages/ui/src/switch/switch.test.tsx", "packages/ui/src/switch/switch.styles.test.ts"],
  application: ["switch-page.tsx"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: [],
  documents: ["docs/plans/2026-09-20-switch-implementation.md", "docs/adr/0009-native-switch.md", "manifests/ui/switch.yaml", "registry/switch.json"],
  evidence: ["verification.md"].map((name) => `evidence/runtime/switch/${name}`),
};

export function hasSwitchSc01Authorization(status) {
  const entry = status?.componentRefinements?.switchSc01;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry) && status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed")
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || (entry.implementation === "completed" && Boolean(exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-20", decisionSource: "explicit-user-confirmation", userStatement: "确定，继续",
      scope: "switch-runtime-visual-only", evidence: "../evidence/runtime/switch/verification.md",
    }))))
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-20", decisionSource: "explicit-user-start-switch-construction",
      userStatement: "开始建设", scope: "switch-three-size-native-form-and-loading-control",
      plan: "../docs/plans/2026-09-20-switch-implementation.md", implementation: entry.implementation,
      automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate, ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}), contrastAcceptance: "not-granted",
      doesNotAuthorize: ["global-token-value-changes-or-new-dependencies", "figma-publication-business-migration-or-git"],
    });
}

export function isSwitchImport(status, filePath, specifier) {
  return hasSwitchSc01Authorization(status)
    && filePath === "packages/ui/src/switch/switch.tsx"
    && specifier === "@base-ui/react/switch";
}

export const checkboxSc01Files = {
  foundations: [],
  ui: ["checkbox.tsx", "checkbox.test.tsx"].map((name) => `packages/ui/src/checkbox/${name}`),
  application: ["checkbox-page.tsx", "checkbox-page.css"].map((name) => `apps/playground/src/docs/components/${name}`),
  workspace: ["scripts/checkbox-governance.test.ts", "tests/e2e/checkbox.spec.ts"],
  documents: ["docs/plans/2026-09-09-checkbox-sc01-implementation.md", "docs/adr/0006-native-checkbox.md", "manifests/ui/checkbox.yaml", "manifests/ui/checkbox-group.yaml", "registry/checkbox.json"],
  evidence: ["verification.md", "light.png", "dark.png", "narrow.png", "compact.png", "forced-colors.png", "browser-facts.json",
    "interactions/light-hover.png", "interactions/dark-hover.png", "interactions/light-pressed.png", "interactions/dark-pressed.png", "interactions/browser-facts.json", "interactions/figma-reference.json", "interactions/figma-reference.png"].map((name) => `evidence/runtime/checkbox/${name}`),
};

export function hasCheckboxSc01Authorization(status) {
  const entry = status?.componentRefinements?.checkboxSc01;
  const accepted = entry?.humanGate === "accepted";
  const interaction = entry?.interactionRefinement;
  const interactionAccepted = interaction?.humanGate === "accepted";
  return Boolean(entry) && status?.currentPhase?.id === "token-foundations-v1"
    && (interaction === undefined || (Boolean(interaction)
      && ["in-progress", "completed"].includes(interaction.implementation)
      && ["not-run", "failed", "passed"].includes(interaction.automatedVerification)
      && ["not-run", "findings", "passed"].includes(interaction.independentReview)
      && (interaction.implementation !== "completed" || (interaction.automatedVerification === "passed" && interaction.independentReview === "passed"))
      && ["awaiting_human", "accepted"].includes(interaction.humanGate)
      && (!interactionAccepted || (interaction.implementation === "completed" && Boolean(exactRecord(interaction.humanGateDecision, {
        acceptedAt: "2026-09-10", decisionSource: "explicit-user-confirmation", userStatement: "确认",
        scope: "checkbox-checkboxgroup-interaction-runtime-visual-only", evidence: "../evidence/runtime/checkbox/verification.md",
      }))))
      && exactRecord(interaction, {
        authorization: "authorized", authorizedAt: "2026-09-09", decisionSource: "explicit-user-checkbox-interaction-request",
        designReference: "https://www.figma.com/design/MbWg1ft5zk1JRQiQ6dS30e?node-id=1-7814",
        userStatement: "补全选择框 normal、hover、选中、选中以后 hover 等交互状态样式",
        scope: "checkbox-checkboxgroup-interaction-paints-only", implementation: interaction.implementation,
        automatedVerification: interaction.automatedVerification, independentReview: interaction.independentReview,
        humanGate: interaction.humanGate, contrastAcceptance: "not-granted",
        ...(interactionAccepted ? { humanGateDecision: interaction.humanGateDecision } : {}),
      })))
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || (entry.automatedVerification === "passed" && entry.independentReview === "passed"))
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || (entry.implementation === "completed" && Boolean(exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-09", decisionSource: "explicit-user-confirmation", userStatement: "确定",
      scope: "checkbox-checkboxgroup-sc01-runtime-visual-only", evidence: "../evidence/runtime/checkbox/verification.md",
    }))))
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-09", decisionSource: "explicit-user-continue-after-selection-sc00",
      userStatement: "选中卡片描边使用当前主题色系 border；所有 icon 使用现有 icon 库；继续推进下一步",
      scope: "checkbox-checkboxgroup-standard-description-and-native-form",
      plan: "../docs/plans/2026-09-09-checkbox-sc01-implementation.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification,
      independentReview: entry.independentReview, humanGate: entry.humanGate, contrastAcceptance: "not-granted",
      ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}),
      ...(interaction !== undefined ? { interactionRefinement: interaction } : {}),
      selectedCardBorderDecision: "Border/Brand/1-current-theme-for-later-card-slice",
      doesNotAuthorize: ["radio-cards-preview-conditional-panel-check-all-patterns", "global-token-value-changes-or-new-dependencies", "figma-publication-business-migration-or-git"],
    });
}

export const tablePaginationFiles = {
  ui: ["pagination.utils.ts", "pagination.styles.ts", "pagination.css", "pagination.css.d.ts", "pagination.test.tsx"].map(name => `packages/ui/src/pagination/${name}`),
  workspace: ["scripts/pagination-color-consumers.mjs"],
};
export function hasTablePaginationReplacementAuthorization(status) {
  const entry = status?.componentRefinements?.tableRn08?.paginationReplacement;
  return Boolean(entry && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-14", decisionSource: "explicit-user-replace-table-pagination",
      scope: "existing-table-consumers-use-confirmed-pagination", plan: "../docs/plans/2026-09-14-table-pagination-replacement.md",
      evidence: "../evidence/runtime/table-pagination-replacement/verification.md",
      sourceLock: "../evidence/runtime/table-pagination-replacement/source-lock.json",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "not-authorized",
    }));
}

export function hasTableVisualRefinementAuthorization(status) {
  const entry = status?.componentRefinements?.tableRn08?.visualRefinement;
  return Boolean(entry && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-14", decisionSource: "explicit-user-table-visual-four-points",
      scope: "table-hover-header-row-heights-and-local-toolbar-sizes",
      plan: "../docs/plans/2026-09-14-table-visual-refinement.md", evidence: "../evidence/runtime/table-visual-refinement/verification.md",
      hover: "Fill/Neutral/Alpha/5", headerTypography: "13/18/400-Text/Neutral/4",
      heights: { defaultHeader: 44, defaultBody: 50, compactHeader: 32, compactBody: 44 },
      toolbarHeights: { default: 32, compact: 28 },
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "not-authorized",
    }));
}

export const insideFieldLabelBrowserFiles = ["tests/e2e/inside-labels.spec.ts", "tests/e2e/inside-labels.config.ts"];
export const insideFieldLabelFiles = [
  "packages/ui/src/input/form-item.tsx", "packages/ui/src/input/input.tsx", "packages/ui/src/select/select.tsx", "packages/ui/src/styles.css",
  "packages/ui/src/input/input-field.test.tsx", "packages/ui/src/select/select.test.tsx",
];
export function hasInsideFieldLabelsAuthorization(status) {
  const entry = status?.componentRefinements?.tableRn08?.insideFieldLabels;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || (entry.implementation === "completed" && entry.automatedVerification === "passed" && exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-14", decisionSource: "explicit-user-confirmation", userStatement: "确定，没问题。",
      scope: "input-search-input-select-inside-labels-runtime-visual-only", evidence: "../evidence/runtime/inside-field-labels/visual-acceptance.md",
    })))
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-14", decisionSource: "explicit-user-start-confirmed-inside-field-labels",
      scope: "optional-fixed-inside-labels-for-input-search-input-select-and-local-toolbar",
      plan: "../docs/plans/2026-09-14-inside-field-labels.md", evidence: "../evidence/runtime/inside-field-labels/verification.md",
      baseline: "../evidence/runtime/inside-field-labels/before/source-lock.json",
      labelPosition: { default: "top", optional: "inside" }, labelColor: "Text/Neutral/4", labelColorDecisionSource: "explicit-user-lighter-inside-labels",
      toolbarHeights: { default: 32, compact: 28 }, multipleDisplay: "existing-single-line-summary-or-count",
      sharedFiles: insideFieldLabelFiles,
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate, ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}), contrastAcceptance: "not-granted", publication: "not-authorized",
      doesNotAuthorize: ["in-frame-search-or-multiline-labels", "global-size-token-changes", "figma-publication-business-migration-or-git"],
    }));
}

export const avatarFamilyFiles = {
  application: ["apps/playground/src/docs/components/avatar-page.tsx", "apps/playground/src/docs/components/avatar-page.css"],
  ui: [
    ...["avatar.tsx", "avatar-assets.ts", "avatar.css", "avatar.css.d.ts", "avatar.test.tsx", "avatar-group.tsx", "avatar-grid.tsx", "avatar-group.test.tsx",
      ...["default", ...["student", "teacher"].flatMap(role => Array.from({ length: 25 }, (_, i) => `${role}-${String(i + 1).padStart(2, "0")}`))].map(id => `assets/${id}.png`),
    ].map(file => `packages/ui/src/avatar/${file}`),
    ...["status-indicator.tsx", "status-indicator.css", "status-indicator.css.d.ts", "status-indicator.test.tsx"].map(file => `packages/ui/src/status-indicator/${file}`),
  ],
  documents: [...["avatar", "avatar-group", "avatar-grid", "status-indicator", "status-indicator-group", "activity-overlay"].map(name => `manifests/ui/${name}.yaml`), "registry/avatar.json", "registry/status-indicator.json"],
  workspace: ["tests/e2e/avatar.spec.ts", "scripts/avatar-family.mjs", "scripts/avatar-family.test.ts"],
};
export function hasAvatarFamilyAuthorization(status) {
  const entry = status?.componentRefinements?.avatarFamily;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || (entry.implementation === "completed" && entry.automatedVerification === "passed" && entry.independentReview === "passed"
      && exactRecord(entry.humanGateDecision, {
        acceptedAt: "2026-09-16", decisionSource: "explicit-user-confirmation", userStatement: "确定。完成视觉检验",
        scope: "avatar-current-runtime-visual-only", evidence: "../evidence/runtime/avatar/refinement-2026-09-16.md",
        doesNotAuthorize: ["contrast-or-accessibility-acceptance", "other-component-human-gates", "figma-publication-business-migration-or-git"],
      }))) && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-16", decisionSource: "explicit-user-start-avatar-family",
      userStatement: "开始实施建设", scope: "avatar-assets-gallery-group-grid-and-passive-status-decorations",
      plan: "../docs/plans/2026-09-16-avatar-family-design-and-construction.md", evidence: "../evidence/runtime/avatar/verification.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate, ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}), contrastAcceptance: "not-granted", publication: "not-authorized",
    }));
}
export function isAvatarFamilyImport(status, filePath, specifier) {
  return hasAvatarFamilyAuthorization(status) && ["avatar", "avatar-group", "avatar-grid"].some(name => filePath === `packages/ui/src/avatar/${name}.tsx`) && specifier === "@base-ui/react/use-render";
}

export const emptyRefinementFiles = {
  ui: ["empty-illustrations.ts", "empty.css", "empty.css.d.ts", "empty.test.tsx",
    ...["empty-box", "empty-search", "empty-paper", "no-one", "outer-space", "empty-sofa", "simple"].flatMap(name => ["light", "dark"].map(theme => `assets/${name}-${theme}.svg`)),
  ].map(name => `packages/ui/src/empty/${name}`),
};
export function hasEmptyRefinementAuthorization(status) {
  const entry = status?.componentRefinements?.tableRn08?.emptyRefinement;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || (entry.implementation === "completed" && entry.automatedVerification === "passed" && exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-14", decisionSource: "explicit-user-confirmation", userStatement: "确定，没问题",
      scope: "empty-presentations-typography-and-actions-runtime-visual-only", evidence: "../evidence/runtime/empty-refinement/visual-acceptance.md",
    })))
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-14", decisionSource: "explicit-user-start-confirmed-empty-refinement",
      scope: "empty-media-presentations-and-typography-without-business-scenarios",
      plan: "../docs/plans/2026-09-14-empty-refinement.md", evidence: "../evidence/runtime/empty-refinement/verification.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate, ...(accepted ? { humanGateDecision: entry.humanGateDecision } : {}), contrastAcceptance: "not-granted", publication: "not-authorized",
    }));
}

export const tableRn08Files = {
  application: ["apps/playground/src/docs/components/table-page.tsx", "apps/prototype/src/data-table-recipe.tsx", "apps/prototype/src/data-table-recipe.css", "apps/prototype/src/data-table-recipe.test.tsx"],
  ui: ["packages/ui/src/table/table.tsx", "packages/ui/src/table/table.styles.ts", "packages/ui/src/table/table.css", "packages/ui/src/table/table.css.d.ts", "packages/ui/src/table/table.test.tsx", "packages/ui/src/pagination/pagination.tsx", "packages/ui/src/empty/empty.tsx"],
  documents: ["manifests/ui/table.yaml", "manifests/ui/pagination.yaml", "manifests/ui/empty.yaml", "registry/table.json"],
  workspace: ["scripts/table-rn08.test.ts", "tests/e2e/table.spec.ts", "tests/e2e/table.config.ts"],
};
export function hasTableRn08Authorization(status) {
  const entry = status?.componentRefinements?.tableRn08;
  if (entry?.paginationReplacement !== undefined && !hasTablePaginationReplacementAuthorization(status)) return false;
  if (entry?.visualRefinement !== undefined && !hasTableVisualRefinementAuthorization(status)) return false;
  if (entry?.insideFieldLabels !== undefined && !hasInsideFieldLabelsAuthorization(status)) return false;
  if (entry?.emptyRefinement !== undefined && !hasEmptyRefinementAuthorization(status)) return false;
  return Boolean(entry && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-14", decisionSource: "explicit-user-start-next-v2-rn08", userStatement: "开始建设",
      scope: "rn08-table-pagination-empty-and-local-data-recipe", plan: "../docs/plans/2026-09-14-table-rn08.md",
      evidence: "../evidence/runtime/table-rn08/verification.md", implementation: entry.implementation,
      automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", packageOrRegistryPublication: "not-authorized", businessMigration: "not-authorized",
      dependencies: { reactTable: "8.21.3", tableCore: "8.21.3" },
      ...(entry.paginationReplacement ? { paginationReplacement: entry.paginationReplacement } : {}),
      ...(entry.visualRefinement ? { visualRefinement: entry.visualRefinement } : {}),
      ...(entry.insideFieldLabels ? { insideFieldLabels: entry.insideFieldLabels } : {}),
      ...(entry.emptyRefinement ? { emptyRefinement: entry.emptyRefinement } : {}),
    }));
}

export const layoutsV1Files = {
  application: ["apps/playground/src/docs/components/layouts-page.tsx", "apps/playground/src/docs/components/layouts-page.css", "apps/prototype/src/layout-recipes.tsx", "apps/prototype/src/layout-recipes.css"],
  layouts: ["packages/layouts/package.json", "packages/layouts/tsconfig.json", ...["index.ts", "layout.tsx", "layout.css", "layout.css.d.ts", "layout.test.tsx"].map(name => `packages/layouts/src/${name}`)],
  documents: ["docs/adr/0009-minimal-layouts.md", ...["stack", "inline", "grid", "split"].map(name => `manifests/layouts/${name}.yaml`), "registry/layouts.json"],
  workspace: ["tests/e2e/layouts.spec.ts", "scripts/layouts-v1.test.ts"],
};

export function hasLayoutsV1Authorization(status) {
  const entry = status?.componentRefinements?.layoutsV1;
  const spacing = entry?.spacingHierarchy;
  const spacingAccepted = spacing?.humanGate === "accepted";
  if (spacing !== undefined && (!exactRecord(spacing, {
    authorization: "authorized", authorizedAt: "2026-09-13", decisionSource: "explicit-user-continue-confirmed-spacing-hierarchy",
    scope: "layout-spacing-contract-and-existing-local-consumers", plan: "../docs/plans/2026-09-13-spacing-hierarchy-design.md",
    evidence: "../evidence/runtime/spacing-hierarchy/verification.md", implementation: spacing.implementation,
    automatedVerification: spacing.automatedVerification, independentReview: spacing.independentReview,
    humanGate: spacing.humanGate, contrastAcceptance: "not-granted",
    ...(spacingAccepted ? { humanGateDecision: spacing.humanGateDecision } : {}),
  }) || !["in-progress", "completed"].includes(spacing.implementation)
    || !["not-run", "failed", "passed"].includes(spacing.automatedVerification)
    || !["not-run", "findings", "passed"].includes(spacing.independentReview)
    || !["awaiting_human", "accepted"].includes(spacing.humanGate)
    || (spacingAccepted && (spacing.implementation !== "completed" || spacing.automatedVerification !== "passed" || spacing.independentReview !== "passed"
      || !exactRecord(spacing.humanGateDecision, {
        acceptedAt: "2026-09-13", decisionSource: "explicit-user-confirmation", userStatement: "确定。没问题",
        scope: "layouts-spacing-runtime-visual-only", evidence: "../evidence/runtime/spacing-hierarchy/outer-cards/visual-acceptance.md",
      }))))) return false;
  return Boolean(entry && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-13", decisionSource: "explicit-user-continue-v2-after-dialog-refinement",
      userStatement: "继续", scope: "rn-06-stack-inline-grid-split-and-local-consumers",
      plan: "../docs/plans/2026-09-13-layouts-v1-implementation.md", evidence: "../evidence/runtime/layouts-v1/verification.md",
      ...(spacing === undefined ? {} : { spacingHierarchy: spacing }),
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted",
      doesNotAuthorize: ["rn-07-and-later-or-complete-benchmarks", "existing-ui-or-foundation-values-migration", "drag-resize-persistence-navigation-sidebar-or-new-third-party-dependencies", "human-gate-or-contrast-acceptance", "new-commit-remote-writes-figma-publication-or-business-migration"],
    }));
}

export function hasDialogRefinementAuthorization(status) {
  const entry = status?.componentRefinements?.dialogRefinement;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || entry.implementation === "completed" && entry.automatedVerification === "passed" && entry.independentReview === "passed")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-15", decisionSource: "explicit-user-start-dialog-refinement",
      userStatement: "开始实施", scope: "dialog-alert-dialog-overlay-tokens-course-and-bm-b",
      plan: "../docs/plans/2026-09-15-dialog-refinement-implementation.md",
      evidence: "../evidence/runtime/dialog-refinement-2026-09-15/verification.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification,
      independentReview: entry.independentReview, humanGate: entry.humanGate, contrastAcceptance: "not-granted",
      ...(accepted ? { humanGateDecision: {
        acceptedAt: "2026-09-15", decisionSource: "explicit-user-request-rule-based-visual-acceptance",
        userStatement: "根据已经建设的dialog设计规则，完成 Dialog 和 BM-B 大表单的整体视觉验收",
        scope: "dialog-alert-dialog-runtime-visual-only", evidence: "../evidence/runtime/dialog-bm-b-visual-2026-09-15/verification.md",
      } } : {}),
    }));
}

export const dialogV2Files = {
  application: ["apps/playground/src/docs/components/dialog-page.tsx", "apps/playground/src/docs/components/dialog-page.css", "apps/prototype/src/course-dialog.tsx", "apps/prototype/src/course-dialog.css"],
  ui: ["packages/ui/src/dialog/dialog.tsx", "packages/ui/src/dialog/dialog.css", "packages/ui/src/dialog/dialog.css.d.ts", "packages/ui/src/dialog/dialog.test.tsx", "packages/ui/src/separator/separator.tsx", "packages/ui/src/separator/separator.css", "packages/ui/src/separator/separator.css.d.ts"],
  documents: ["manifests/ui/dialog.yaml", "manifests/ui/separator.yaml", "registry/dialog.json"],
  workspace: ["tests/e2e/dialog.spec.ts", "scripts/dialog-v2.test.ts"],
};

export function hasDialogV2Authorization(status) {
  const entry = status?.componentRefinements?.dialogV2;
  const revision = entry?.visualRefinement;
  if (revision !== undefined && (
    !["in-progress", "completed"].includes(revision?.implementation)
    || !["not-run", "failed", "passed"].includes(revision.automatedVerification)
    || !["not-run", "findings", "passed"].includes(revision.independentReview)
    || !exactRecord(revision, {
      authorization: "authorized", authorizedAt: "2026-09-13", decisionSource: "explicit-user-refine-dialog-and-composition-rules",
      scope: "dialog-parts-course-example-review-and-composition-rules",
      plan: "../docs/plans/2026-09-13-dialog-visual-refinement-plan.md",
      evidence: "../evidence/runtime/dialog-visual-2026-09-13/verification.md",
      implementation: revision.implementation, automatedVerification: revision.automatedVerification,
      independentReview: revision.independentReview, humanGate: "awaiting_human", contrastAcceptance: "not-granted",
    })
  )) return false;
  return Boolean(entry && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-13", decisionSource: "explicit-user-continue-v2-after-card",
      scope: "rn-05-dialog-separator-and-course-edit-consumer", plan: "../docs/plans/2026-09-13-dialog-v2-implementation.md",
      ...(revision === undefined ? {} : { visualRefinement: revision }),
      evidence: "../evidence/runtime/dialog-v2/verification.md", implementation: entry.implementation,
      automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted",
      doesNotAuthorize: ["rn-06-and-later-or-complete-benchmarks", "card-or-existing-component-visual-migration", "foundation-values-or-dependency-upgrades", "human-gate-or-contrast-acceptance", "new-commit-remote-writes-figma-publication-or-business-migration"],
    }));
}

export function isDialogV2Import(file, specifier) {
  return (file === "packages/ui/src/dialog/dialog.tsx" && specifier === "@base-ui/react/dialog")
    || (file === "packages/ui/src/separator/separator.tsx" && specifier === "@base-ui/react/separator");
}

export const cardV2Files = {
  application: [
    "apps/playground/src/docs/components/card-page.tsx", "apps/playground/src/docs/components/card-page.css",
    "apps/prototype/package.json", "apps/prototype/tsconfig.json", "apps/prototype/vite.config.ts", "apps/prototype/index.html",
    "apps/prototype/src/main.tsx", "apps/prototype/src/styles.css", "apps/prototype/src/card-recipes.tsx", "apps/prototype/src/card-recipes.css",
  ],
  ui: ["packages/ui/src/card/card.styles.ts", "packages/ui/src/card/card.css", "packages/ui/src/card/card.css.d.ts", "packages/ui/src/card/card.test.tsx"],
  documents: ["manifests/ui/card.yaml", "registry/card.json"],
  workspace: ["tests/e2e/card.spec.ts"],
};

export function hasCardV2Authorization(status) {
  const entry = status?.componentRefinements?.cardV2;
  const revision = entry?.visualRefinement;
  if (revision !== undefined && (
    !["in-progress", "completed"].includes(revision.implementation)
    || !["not-run", "failed", "passed"].includes(revision.automatedVerification)
    || !["not-run", "findings", "passed"].includes(revision.independentReview)
    || !exactRecord(revision, {
      authorization: "authorized", authorizedAt: "2026-09-13",
      decisionSource: "explicit-user-start-card-visual-plan", userStatement: "开始按计划实施",
      scope: "card-typography-header-four-recipes-and-review-presentation",
      plan: "../docs/plans/2026-09-13-card-visual-refinement-plan.md",
      evidence: "../evidence/runtime/card-visual-2026-09-13/verification.md",
      implementation: revision.implementation, automatedVerification: revision.automatedVerification,
      independentReview: revision.independentReview, humanGate: "awaiting_human", contrastAcceptance: "not-granted",
    })
  )) return false;
  if (!entry || !["in-progress", "completed"].includes(entry.implementation)
    || !["not-run", "failed", "passed"].includes(entry.automatedVerification)
    || !["not-run", "findings", "passed"].includes(entry.independentReview)
    || !["not-evaluated", "awaiting_human"].includes(entry.humanGate)) return false;
  return exactRecord(entry, {
    authorization: "authorized", authorizedAt: "2026-09-12",
    decisionSource: "explicit-user-start-v2-card-batch", userStatement: "开始工作",
    scope: "card-replacement-recipes-and-minimal-prototype",
    plan: "../docs/plans/2026-09-12-card-v2-implementation.md",
    ...(revision !== undefined ? { visualRefinement: revision } : {}),
    implementation: entry.implementation, automatedVerification: entry.automatedVerification,
    independentReview: entry.independentReview, humanGate: entry.humanGate, contrastAcceptance: "not-granted",
    sourceControl: {
      baselineCommit: "321e1a0c1b5f9284e0fcb5167fa059d6174b1752", existingRemote: "origin",
      existingRemoteUrl: "https://github.com/409476773-web/rain-classroom-vibe-ui-spike.git",
      priorAuthorization: "../docs/plans/2026-09-12-existing-assets-closure.md",
      localIsolation: "codex/card-v2", newCommit: "not-created", remoteWrite: "not-authorized",
    },
    doesNotAuthorize: [
      "dialog-or-other-component-batches", "global-brand-font-focus-or-existing-accepted-visual-changes",
      "new-headless-or-dependency-upgrades", "human-gate-or-contrast-acceptance",
      "new-commit-remote-writes-figma-publication-or-business-migration",
    ],
  });
}

export function hasGenerationQualityAuthorization(status) {
  const entry = status?.componentRefinements?.generationQuality;
  return Boolean(entry) && hasM2Authorization(status)
    && ["asset-entry", "bm-c-layout", "bm-d-layout", "bm-d-chart", "transfer", "complete"].includes(entry.progress)
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.progress === "complete" && entry.automatedVerification === "passed" && entry.independentReview === "passed")
    && (entry.progress !== "complete" || entry.implementation === "completed")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-15", decisionSource: "explicit-user-start-generation-quality-plan",
      userStatement: "开始按计划实施", scope: "rain-generation-quality-entry-report-chart-and-transfer",
      plan: "../docs/plans/2026-09-15-rain-generation-quality-improvement.md", evidence: "../evidence/runtime/generation-quality/review.md",
      ...(entry.designKnowledgeDelivery ? { designKnowledgeDelivery: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-continue-design-knowledge", userStatement: "继续",
        scope: "ai-design-guides-starter-and-isolated-form-trial", plan: "../docs/plans/2026-09-16-design-knowledge-delivery.md",
        evidence: "../evidence/runtime/design-knowledge/review.md",
      } } : {}),
      ...(entry.regressionRepair ? { regressionRepair: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-continue-after-select-regressions", userStatement: "继续推进",
        scope: "select-popup-width-and-preview-overflow", evidence: "../evidence/runtime/generation-quality/select-repair.md",
      } } : {}),
      ...(entry.visualRefinement ? { visualRefinement: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-bm-d-browser-comments",
        scope: "bm-d-thirteen-visual-comments", evidence: "../evidence/runtime/generation-quality/bm-d-feedback/review.md",
      } } : {}),
      ...(entry.bmCVisualRefinement ? { bmCVisualRefinement: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-bm-c-browser-comments",
        scope: "bm-c-fourteen-visual-comments", evidence: "../evidence/runtime/generation-quality/bm-c-feedback/review.md",
      } } : {}),
      ...(entry.compositionRefinement ? { compositionRefinement: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-self-repair-after-composition-audit",
        scope: "bm-d-composition-convergence", evidence: "../evidence/runtime/generation-quality/composition-refinement/review.md",
      } } : {}),
      ...(entry.listCompositionPilot ? { listCompositionPilot: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-start-after-composition-discussion", userStatement: "开始",
        scope: "local-list-composition-reference-and-guided-transfer", plan: "../docs/plans/2026-09-16-list-composition-pilot.md",
        evidence: "../evidence/runtime/list-composition/review.md",
        implementation: "completed", automatedVerification: "passed", independentReview: "not-run", humanGate: "awaiting_human",
      } } : {}),
      ...(entry.bmCCompositionRefinement ? { bmCCompositionRefinement: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-bm-c-second-browser-comments",
        scope: "bm-c-thirteen-comments-and-composition", evidence: "../evidence/runtime/generation-quality/bm-c-composition/review.md",
      } } : {}),
      ...(entry.bmCPrimaryWorkflowRefinement ? { bmCPrimaryWorkflowRefinement: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-bm-c-primary-workflow-comments",
        scope: "bm-c-input-status-alignment-grouping-and-duplicate-removal", evidence: "../evidence/runtime/generation-quality/bm-c-primary-workflow/review.md",
      } } : {}),
      ...(entry.bmCDirectoryRefinement ? { bmCDirectoryRefinement: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-bm-c-directory-score-avatar-comments",
        scope: "bm-c-score-color-groups-short-input-and-student-avatars", evidence: "../evidence/runtime/generation-quality/bm-c-directory-detail/review.md",
      } } : {}),
      ...(entry.bmCQuestionSwitchRefinement ? { bmCQuestionSwitchRefinement: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-bm-c-student-question-number-switch",
        scope: "bm-c-student-question-number-navigation", evidence: "../evidence/runtime/generation-quality/bm-c-question-switch/review.md",
      } } : {}),
      progress: entry.progress, implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
    });
}

export function hasSelectRegressionRepairAuthorization(status) {
  return hasGenerationQualityAuthorization(status) && Boolean(status.componentRefinements.generationQuality.regressionRepair);
}

export const rn13AssetIndexFiles = {
  documents: ["manifests/ui/badge.yaml", "manifests/ui/surface.yaml", "manifests/ui/link.yaml", "registry/core-ui.json", "docs/ai/README.md", "docs/ai/asset-index.md", "docs/plans/2026-09-15-rn13-asset-index.md"],
  workspace: ["scripts/asset-index.mjs", "scripts/asset-index.test.ts"],
};
export const rn14EditabilityFiles = {
  documents: ["docs/plans/2026-09-15-rn14-editability.md"],
  workspace: ["scripts/rn14-starter.mjs", "scripts/rn14-starter.test.ts", "scripts/rn14-browser.mjs"],
};
export const rn15DeliveryFiles = {
  documents: ["docs/plans/2026-09-15-rn15-delivery.md", "docs/ai/trial-guide.md"],
  workspace: ["scripts/rn15-delivery.test.ts", "tests/e2e/rn15.config.ts"],
};
export const m2DeliveryFiles = {
  application: ["bm-c", "bm-d"].flatMap(scene => ["page.tsx", "page.css", "state.ts", "state.test.tsx", "state-contract.md"].map(file => `apps/prototype/src/scenarios/${scene}/${file}`)),
  documents: ["docs/plans/2026-09-15-m2-workbench-report.md", "docs/ai/m2-trial-guide.md"],
  workspace: ["scripts/m2.test.ts", "tests/e2e/m2.config.ts", "tests/e2e/m2.spec.ts"],
};
export function hasM2Authorization(status) {
  const entry = status?.componentRefinements?.m2Delivery;
  const lifecycle = record => Boolean(record)
    && ["in-progress", "completed"].includes(record.implementation)
    && ["not-run", "failed", "passed"].includes(record.automatedVerification)
    && ["not-run", "findings", "passed"].includes(record.independentReview)
    && (record.implementation !== "completed" || record.automatedVerification === "passed" && record.independentReview === "passed");
  const benchmark = record => lifecycle(record) && exactRecord(record, {
    implementation: record.implementation, automatedVerification: record.automatedVerification,
    independentReview: record.independentReview, humanGate: "awaiting_human",
  });
  return Boolean(entry) && hasRn15Authorization(status) && hasLayoutsV1Authorization(status) && hasTableRn08Authorization(status)
    && lifecycle(entry) && benchmark(entry.benchmarks?.bmC) && benchmark(entry.benchmarks?.bmD)
    && (entry.implementation !== "completed" || [entry.benchmarks.bmC, entry.benchmarks.bmD].every(record => record.implementation === "completed"))
    && exactRecord(entry.benchmarks, { bmC: entry.benchmarks.bmC, bmD: entry.benchmarks.bmD })
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-15", decisionSource: "explicit-user-continue-m2", userStatement: "继续m2",
      scope: "m2-bm-c-d-local-scenarios-editability-and-scoped-delivery",
      plan: "../docs/plans/2026-09-15-m2-workbench-report.md", evidence: "../evidence/runtime/m2/verification.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      benchmarks: entry.benchmarks, humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
    });
}

export function prepareM2NavigationSource(file, source, status) {
  const directory = '<nav aria-label="分层批改目录">';
  return file === "apps/prototype/src/scenarios/bm-c/page.tsx" && hasM2Authorization(status) && source.split(directory).length === 2
    ? source.replace(directory, "") : source;
}

// Literal authorized additions only: arbitrary code inside or outside a marker stays protected.
function restoreM2PrototypeEntry(file, source, status) {
  if (file !== "apps/prototype/src/main.tsx" || !hasM2Authorization(status)) return source;
  if (hasGenerationQualityAuthorization(status) && status.componentRefinements.generationQuality.listCompositionPilot) {
    for (const addition of [
      'import { ListCompositionPreview } from "./scenarios/list-composition/page";\n',
      '  if (route === "#list-composition") return <DensityProvider density="default"><ListCompositionPreview /></DensityProvider>;\n',
    ]) if (source.toString().split(addition).length === 2) source = source.toString().replace(addition, "");
  }
  const additions = [
    '// m2-entry:start\nimport { useEffect } from "react";\nimport { GradingWorkbenchScenario } from "./scenarios/bm-c/page";\nimport { LearningReportScenario } from "./scenarios/bm-d/page";\n// m2-entry:end\n',
    '  // m2-routes:start\n  const [route, setRoute] = useState(window.location.hash);\n  useEffect(() => { const change = () => setRoute(window.location.hash); window.addEventListener("hashchange", change); return () => window.removeEventListener("hashchange", change); }, []);\n  if (route === "#bm-c") return <DensityProvider density="default"><GradingWorkbenchScenario /></DensityProvider>;\n  if (route === "#bm-d") return <DensityProvider density="default"><LearningReportScenario /></DensityProvider>;\n  // m2-routes:end\n',
  ];
  const text = source.toString();
  const contexts = [
    `import { TextbookFormScenario } from "./scenarios/bm-b/page";\n${additions[0]}import "@rain-next/foundations/tokens.css";`,
    `  const [compact, setCompact] = useState(true);\n${additions[1]}  if (window.location.hash === "#bm-b")`,
  ];
  return additions.every(addition => text.split(addition).length === 2) && contexts.every(context => text.includes(context))
    ? additions.reduce((current, addition) => current.replace(addition, ""), text) : source;
}

export function hasRn15Authorization(status) {
  const entry = status?.componentRefinements?.rn15Delivery;
  return Boolean(entry) && hasRn14Authorization(status) && status.componentRefinements.rn14Editability.humanGate === "accepted"
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed" && entry.independentReview === "passed")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-15", decisionSource: "explicit-user-continue-rn15", userStatement: "继续 RN-15",
      scope: "rn15-m1-scoped-local-trial-validation-docs-and-test-maintenance", snapshotId: "rn14-90fc74205a764fb1",
      plan: "../docs/plans/2026-09-15-rn15-delivery.md", evidence: "../evidence/runtime/rn15-delivery/verification.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "not-evaluated", contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
    });
}

// Compare current bytes with a named, authorized successor without rewriting the old checksum.
export function matchesRn15ProtectedSource(file, source, expected, status, transitions) {
  if (hasTooltipAuthorization(status)) {
    const additions = {
      "packages/ui/src/index.ts": '\nexport { Tooltip, type TooltipProps, type TooltipPlacement } from "./tooltip/tooltip";\n',
      "packages/foundations/src/index.ts": '\nexport * from "./tooltip-token-contract";\n',
      "packages/foundations/src/tokens.css": "  --rain-tooltip-background: #2F3545;\n  --rain-tooltip-foreground: var(--rain-color-text-inverse);\n  --rain-tooltip-padding-block: 7px;\n  --rain-tooltip-arrow-width: 14px;\n  --rain-tooltip-arrow-height: 6px;\n  --rain-tooltip-max-width: 250px;\n",
    };
    const addition = additions[file];
    if (addition && source.toString().split(addition).length === 2) source = source.toString().replace(addition, "");
  }

  if (file === "packages/ui/src/input/form-item.tsx" && hasInputNumberAuthorization(status)
    && createHash("sha256").update(source).digest("hex") === "384e95d4804d3e75514df87646c90bf7cfd9f31e8a3aa9861803eef94432fe8a") {
    source = source.toString()
      .replace("import { Children, createContext, useContext, useId, useState, type MouseEventHandler, type ReactElement, type ReactNode } from \"react\";\n", "import { Children, createContext, useContext, useId, type MouseEventHandler, type ReactElement, type ReactNode } from \"react\";\n")
      .replace("  /** Child-owned numeric validation is presentation-only here; the child owns its value. */\n  setControlMessage: (message: string) => void;\n", "")
      .replace("  /** One Input, InputNumber, SearchInput, Select or Textarea (top label); owns label and validation presentation. */\n", "  /** One Input, SearchInput, Select or Textarea (top label); owns label and validation presentation. */\n")
      .replace("  /** Fixed inside label for Input, InputNumber, SearchInput and single-line Select compositions. */\n", "  /** Fixed inside label for Input, SearchInput and single-line Select compositions. */\n")
      .replace("  const [controlMessage, setControlMessage] = useState(\"\");\n", "")
      .replace("  const displayedStatus = controlMessage && !disabled ? \"error\" : status;\n", "")
      .replace("    descriptionIds: [hasHelp && `${controlId}-help`, hasMessage && `${controlId}-message`, controlMessage && !disabled && `${controlId}-control-message`].filter(Boolean).join(\" \"),\n    status: displayedStatus, disabled, required, setControlMessage }}>\n    <div className={rainCn(\"rain-form-item flex flex-col min-w-0 gap-rain-4 rain-type-ui-default\", formItemColors.root, className)} data-rain-id=\"ui-form-item\" data-slot=\"root\" data-status={displayedStatus} data-label-position={labelPosition}>\n", "    descriptionIds: [hasHelp && `${controlId}-help`, hasMessage && `${controlId}-message`].filter(Boolean).join(\" \"),\n    status, disabled, required }}>\n    <div className={rainCn(\"rain-form-item flex flex-col min-w-0 gap-rain-4 rain-type-ui-default\", formItemColors.root, className)} data-rain-id=\"ui-form-item\" data-slot=\"root\" data-status={status} data-label-position={labelPosition}>\n")
      .replace("      {controlMessage && !disabled ? <span id={`${controlId}-control-message`} data-slot=\"control-message\" className={formItemColors.error}>{controlMessage}</span> : null}\n", "");
  }

  if (file === "packages/ui/src/index.ts" && hasInputNumberAuthorization(status)) {
    const addition = 'export { InputNumber, type InputNumberProps, type InputNumberValidity } from "./input-number/input-number";\n';
    if (source.toString().endsWith(addition)) source = source.toString().slice(0, -addition.length);
  }
  if (file === "packages/ui/src/index.ts" && hasAvatarFamilyAuthorization(status)) {
    const additions = [
    "export { Avatar, type AvatarProps, type AvatarSize, type AvatarShape } from \"./avatar/avatar\";\n",
    "export { AvatarGroup, type AvatarGroupProps, type AvatarMember } from \"./avatar/avatar-group\";\n",
    "export { AvatarGrid, type AvatarGridProps } from \"./avatar/avatar-grid\";\n",
    "export { avatarAssets, assignAvatarAssets, type AvatarAssetId, type AvatarAssetRole } from \"./avatar/avatar-assets\";\n",
    "export { StatusIndicator, StatusIndicatorGroup, ActivityOverlay } from \"./status-indicator/status-indicator\";\n",
    "export type { StatusIndicatorProps, StatusIndicatorGroupProps, ActivityOverlayProps, StatusTone } from \"./status-indicator/status-indicator\";\n"
    ].join("");
    if (source.toString().endsWith(additions)) source = source.toString().slice(0, -additions.length);
  }
  if (file === "packages/ui/src/styles.css" && hasSelectRegressionRepairAuthorization(status)) {
    source = source.toString().replace('.rain-select__popup { --rain-popup-width: var(--anchor-width); width: 100%; }', '.rain-select__popup { width: 100%; }');
  }
  if (file === "packages/ui/src/dropdown-menu/dropdown-menu.css" && hasTokenFirstV12Authorization(status)) {
    const layeredPaint = "/* Default paint belongs below caller utilities; portal geometry stays shared. */\n@layer base {\n  .rain-popup {\n    background-color: var(--rain-category-background-neutral-1);\n    border-color: var(--rain-category-border-neutral-3);\n    color: var(--rain-category-text-neutral-3);\n  }\n}\n";
    const geometry = ".rain-popup {\n  width: var(--rain-popup-width);\n  max-width: min(var(--available-width), calc(100vw - var(--rain-space-8) * 2));\n  max-height: var(--available-height);\n}";
    const current = source.toString();
    if (current.split(layeredPaint).length === 2 && current.split(geometry).length === 2) {
      source = current.replace(layeredPaint, "").replace(geometry, geometry.slice(0, -1) + "  background-color: var(--rain-category-background-neutral-1);\n  border-color: var(--rain-category-border-neutral-3);\n  color: var(--rain-category-text-neutral-3);\n}");
    }
  }
  source = restoreM2PrototypeEntry(file, source, status);
  const checksum = createHash("sha256").update(source).digest("hex");
  if (checksum === expected) return true;
  if (!hasRn15Authorization(status)) return false;
  if (hasTableRn08Authorization(status) && createHash("sha256").update(restoreDropdownWidthBaseline(file, source)).digest("hex") === expected) return true;
  const entry = transitions.find(item => item.file === file && item.beforeSha256 === expected && item.afterSha256 === checksum);
  if (!entry) return false;
  return ({
    "dialog-refinement": hasDialogRefinementAuthorization(status),
    "inside-field-labels": hasInsideFieldLabelsAuthorization(status),
    "bm-b-rn10": hasBmBRn10Authorization(status),
    "inside-labels-and-bm-b": hasInsideFieldLabelsAuthorization(status) && hasBmBRn10Authorization(status),
    "table-and-bm-b-and-dialog": hasTableRn08Authorization(status) && hasBmBRn10Authorization(status) && hasDialogRefinementAuthorization(status),
  })[entry.authorization] === true;
}
export function hasRn14Authorization(status) {
  const entry = status?.componentRefinements?.rn14Editability;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry) && hasRn13Authorization(status) && hasBmARn09Authorization(status) && hasBmBRn10Authorization(status)
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed" && entry.independentReview === "passed")
    && (!accepted || entry.implementation === "completed")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-15", decisionSource: "explicit-user-continue-after-rn13",
      userStatement: "继续下一步", scope: "rn14-bm-a-b-local-edit-trials-and-fixed-starter-consumption-only",
      plan: "../docs/plans/2026-09-15-rn14-editability.md", evidence: "../evidence/runtime/rn14-editability/verification.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: accepted ? "accepted" : "awaiting_human",
      ...(accepted ? { humanGateDecision: {
        acceptedAt: "2026-09-15", decisionSource: "explicit-user-rn14-final-sample-visual-confirmation", userStatement: "确认",
        scope: "rn14-bm-a-b-final-snapshot-runtime-visual-only", snapshotId: "rn14-90fc74205a764fb1",
        evidence: "../evidence/runtime/rn14-editability/human-gate.md",
      } } : {}),
      contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
    });
}
export function hasRn13Authorization(status) {
  const entry = status?.componentRefinements?.rn13AssetIndex;
  return Boolean(entry) && hasCardV2Authorization(status) && hasDialogV2Authorization(status)
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed" && entry.independentReview === "passed")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-15", decisionSource: "explicit-user-continue-after-rn10",
      userStatement: "RN10已经完成建设了。继续推进下一步", scope: "rn13-local-asset-index-manifests-registry-and-docs-only",
      plan: "../docs/plans/2026-09-15-rn13-asset-index.md", evidence: "../evidence/runtime/rn13-asset-index/verification.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "not-evaluated", contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
    });
}

export const bmBRn10Files = {
  application: ["apps/prototype/src/scenarios/bm-b/page.tsx", "apps/prototype/src/scenarios/bm-b/page.css", "apps/prototype/src/scenarios/bm-b/state.ts", "apps/prototype/src/scenarios/bm-b/state-contract.md", "apps/prototype/src/scenarios/bm-b/state.test.tsx"],
  ui: ["packages/ui/src/textarea/textarea.tsx", "packages/ui/src/textarea/textarea.test.tsx"],
  documents: ["docs/plans/2026-09-15-bm-b-rn10.md", "evidence/runtime/bm-b-rn10/verification.md", "evidence/runtime/bm-b-rn10/textarea-source.json", "manifests/ui/textarea.yaml", "registry/textarea.json"],
  workspace: ["tests/e2e/bm-b.spec.ts", "tests/e2e/bm-b.config.ts"],
};
export function hasBmBRn10Authorization(status) {
  const entry = status?.componentRefinements?.bmBRn10;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry) && hasLayoutsV1Authorization(status) && hasDialogV2Authorization(status)
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed")
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || entry.implementation === "completed" && entry.automatedVerification === "passed" && entry.independentReview === "passed")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-15", decisionSource: "explicit-user-start-rn10",
      userStatement: "开始按计划建设 RN-10", scope: "rn10-bm-b-local-large-form-and-rn07-textarea-integration",
      plan: "../docs/plans/2026-09-15-bm-b-rn10.md", evidence: "../evidence/runtime/bm-b-rn10/verification.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate, contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
      ...(accepted ? { humanGateDecision: {
        acceptedAt: "2026-09-15", decisionSource: "explicit-user-request-rule-based-visual-acceptance",
        userStatement: "根据已经建设的dialog设计规则，完成 Dialog 和 BM-B 大表单的整体视觉验收",
        scope: "bm-b-dialog-form-runtime-visual-only", evidence: "../evidence/runtime/dialog-bm-b-visual-2026-09-15/verification.md",
      } } : {}),
    });
}

export const bmARn09Files = {
  application: ["apps/prototype/src/scenarios/bm-a/page.tsx", "apps/prototype/src/scenarios/bm-a/state-contract.md", "apps/prototype/src/scenarios/bm-a/state.test.tsx"],
  documents: ["docs/plans/2026-09-15-bm-a-rn09.md", "evidence/runtime/bm-a-rn09/verification.md"],
  workspace: ["tests/e2e/bm-a.spec.ts", "tests/e2e/bm-a.config.ts"],
};
export function hasBmARn09Authorization(status) {
  const entry = status?.componentRefinements?.bmARn09;
  const accepted = entry?.humanGate === "accepted";
  return Boolean(entry) && hasTableRn08Authorization(status) && hasLayoutsV1Authorization(status) && hasCardV2Authorization(status)
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed")
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || entry.implementation === "completed" && entry.automatedVerification === "passed" && entry.independentReview === "passed")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-15", decisionSource: "explicit-user-continue-v2-after-table-page",
      userStatement: "继续按计划建设", scope: "rn09-bm-a-local-data-management-and-state-contract",
      plan: "../docs/plans/2026-09-15-bm-a-rn09.md", evidence: "../evidence/runtime/bm-a-rn09/verification.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate,
      ...(accepted ? { humanGateDecision: {
        acceptedAt: "2026-09-15", decisionSource: "explicit-user-confirmation-after-density-repair",
        userStatement: "确认。", scope: "bm-a-page-and-density-switching-only",
        evidence: "../evidence/runtime/bm-a-rn09/verification.md",
      } } : {}),
      contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
    });
}

export function hasTokenFirstV12Authorization(status) {
  const entry = status?.componentRefinements?.tokenFirstV12;
  if (entry?.humanGate === "accepted") return createHash("sha256").update(JSON.stringify(entry)).digest("hex") === "5cfb5cadc6ca85fa063071c90d4c79e37533b6213f217bcd2ea33ef37925e313";
  return entry?.authorization === "authorized"
    && entry.decisionSource === "explicit-user-continue-v1.2-token-first-workpack"
    && entry.scope === "g0-g1-token-preflight-and-real-compositions"
    && entry.humanGate === "awaiting_human"
    && entry.contrastAcceptance === "not-granted"
    && entry.publication === "unpublished"
    && entry.git === "no-operations-authorized";
}

export function hasTokenFirstV12G1NextAuthorization(status) {
  const entry = status?.componentRefinements?.tokenFirstV12?.g1Next;
  if (entry?.humanGate === "accepted") return hasTokenFirstV12Authorization(status)
    && createHash("sha256").update(JSON.stringify(entry)).digest("hex") === "136ec873f3fc629468559d1141984c3109574c6ddd2d10f490d4cea9ab8023f6";
  return hasTokenFirstV12Authorization(status) && entry?.authorization === "authorized"
    && entry.decisionSource === "explicit-user-confirm-continue-new-workpack"
    && entry.scope === "local-tooltip-resizable-only" && entry.dependency === "react-resizable-panels@4.12.4"
    && entry.humanGate === "awaiting_human" && entry.contrastAcceptance === "not-granted" && entry.publication === "unpublished";
}

export function hasTokenFirstV12G2Authorization(status) {
  const entry = status?.componentRefinements?.tokenFirstV12G2;
  if (entry?.humanGate === "accepted") return createHash("sha256").update(JSON.stringify(entry)).digest("hex") === "1219761f062f944d0bb293130ef2a47eae36b50478b930f6b31f69056046ceb1";
  return entry?.authorization === "authorized"
    && entry.authorizedAt === "2026-09-21"
    && entry.decisionSource === "explicit-user-continue-after-g1-with-shadcn-source-adaptation"
    && entry.scope === "g2-six-local-source-adapters-and-composition-preview"
    && entry.plan === "docs/plans/2026-09-21-token-first-g2.md"
    && entry.evidence === "evidence/runtime/token-first-v12-g2/verification.md"
    && entry.humanGate === "awaiting_human" && entry.contrastAcceptance === "not-granted"
    && entry.publication === "unpublished" && entry.git === "no-operations-authorized";
}


// This authorization permits only the current candidate extraction and finite documentation set.
export const g123PlaygroundRegistrySnapshots = {"g1": "72745982bec8a2f1572ba2426cef2a77a93a5e1eb14b634c95986602978815b3", "g2": "333c776986568f83f5695dddb9e5e5b8e8eb2775d4f610b7fe151098ef4c7019"};
export const g4ComponentFiles = {
  application: ["g4-component-pages.tsx", "g4-component-pages.css", "g4-component-pages.test.tsx"].map(file => `apps/playground/src/docs/components/${file}`),
  ui: ["item", "progress"].flatMap(name => ["tsx", "css", "css.d.ts", "test.tsx"].map(extension => `packages/ui/src/${name}/${name}.${extension}`).concat(`packages/ui/src/${name}/README.md`)),
  documents: ["typography", "item", "progress"].map(name => `manifests/ui/${name}.yaml`).concat("registry/g4-assets.json"),
  workspace: ["scripts/g4-components-governance.test.ts", "tests/e2e/g4-components.config.ts", "tests/e2e/g4-components.spec.ts"],
};

export const g5ComponentFiles = {
  application: ["g5-component-pages.tsx", "g5-component-pages.css", "g5-component-pages.test.tsx"].map(file => `apps/playground/src/docs/components/${file}`),
  ui: ["native-select", "combobox", "slider", "calendar", "date-picker", "textarea"].flatMap(name => ["tsx", "css", "css.d.ts", "test.tsx"].map(extension => `packages/ui/src/${name}/${name}.${extension}`)),
  documents: ["native-select", "combobox", "slider", "calendar", "date-picker", "textarea"].map(name => `manifests/ui/${name}.yaml`).concat("manifests/recipes/input-group.yaml", "registry/g5-assets.json", "registry/textarea.json", "docs/ai/g5-components.md", "docs/plans/2026-10-12-token-first-g5.md"),
  workspace: ["scripts/verify-g5-components.mjs", "scripts/g5-components-governance.test.ts", "scripts/g5-color-consumers.mjs", "scripts/g5-color-consumers.test.ts", "scripts/verify-g5-consumption.mjs", ...["components", "dates"].flatMap(name => [`tests/e2e/g5-${name}.spec.ts`, `tests/e2e/g5-${name}.config.ts`])],
};

export function hasG5ComponentsAuthorization(status) {
  const entry = status?.componentRefinements?.g5Components;
  return status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(entry?.implementation)
    && ["not-run", "passed-scoped", "failed"].includes(entry?.automatedVerification)
    && ["not-run", "findings", "passed-scoped"].includes(entry?.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped" && entry.independentReview === "passed-scoped")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-10-12", decisionSource: "explicit-user-start-approved-g5-plan", userStatement: "开始执行此计划",
      scope: "label-field-input-group-reuse-native-select-combobox-slider-calendar-date-picker", workMode: "system-mode", assetIdentity: "registry-candidate",
      plan: "docs/plans/2026-10-12-token-first-g5.md", evidence: "evidence/runtime/g5-components-2026-10-12/verification.md",
      sourceLock: "evidence/runtime/g5-components-2026-10-12/source-lock.json", sourceBindings: "evidence/runtime/g5-components-2026-10-12/source-bindings.json",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished", figmaWrite: "not-authorized", businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
    });
}

export const g5SourceBindingPaths = [...Object.values(g5ComponentFiles).flat(),
  "packages/ui/src/index.ts", "packages/ui/package.json", "pnpm-lock.yaml", "apps/playground/src/styles.css",
  "apps/playground/src/docs/components/component-catalog.tsx", "apps/playground/src/docs/components/component-asset-page.tsx",
  "docs/ai/README.md", "docs/ai/asset-index.md", "status/current-phase.yaml",
  "scripts/verification-helpers.mjs", "scripts/verify-boundaries.mjs", "scripts/verify-workspace.mjs", "scripts/verify-token-foundations.mjs",
  "scripts/g4-page-acceptance.test.ts", "evidence/runtime/g5-components-2026-10-12/before/scripts/g4-page-acceptance.test.ts",
  "scripts/g4-components-governance.test.ts", "evidence/runtime/g5-components-2026-10-12/before/scripts/g4-components-governance.test.ts",
  "evidence/runtime/g5-components-2026-10-12/before/apps/playground/src/styles.css", "evidence/runtime/g5-components-2026-10-12/before/docs/ai/asset-index.md",
];

const g5G4AcceptanceSnapshots = {
  "scripts/verification-helpers.mjs": "e1b6731708c00498c8e7d26ccc48b731465201a026e39f8e9cd54a422f1dc249",
  "scripts/g4-page-acceptance.test.ts": "c0894e44cccba77b4b3a4e7ad2dc4543a2aedbcd26b6f0892f80d2d5fa971c71",
  "scripts/g4-components-governance.test.ts": "4fd13e18415c4bf778ef13ebe31e59708cf4dde5129511c6e7c0aa4a22bc97a4",
  "apps/playground/src/styles.css": "a52740f01004735e9f86c71a1ba94f977911a336b9ac23006ef140d0e38095ba",
  "docs/ai/asset-index.md": "a590763aebbfa9edd4f96eb2517842b91b36a711155358e7788b51f0e955f742",
};

export function getG5SourceBindings(root, status) {
  if (!hasG5ComponentsAuthorization(status)) throw new Error("G5 requires the explicit approved plan and finite unpublished scope");
  const directory = "evidence/runtime/g5-components-2026-10-12/";
  const hash = file => {
    const info = lstatSync(join(root, file));
    if (!info.isFile() || info.isSymbolicLink()) throw new Error(`G5 source must be a regular file: ${file}`);
    return createHash("sha256").update(readFileSync(join(root, file))).digest("hex");
  };
  const record = JSON.parse(readFileSync(join(root, directory + "source-bindings.json"), "utf8"));
  if (hash(directory + "baseline.json") !== "3d583c993fcd85dad98f78e2e325e5195e86835ca5fd672f230104aaaad38d00"
    || hash(directory + "protected-source-sha256.json") !== "185a7553d46014baf5c185290ef607583d4d891be9fe274cebeae8e693c0d29e") throw new Error("G5 cannot rewrite the original baseline or protected source inventory");
  if (record.kind !== "G5ComponentSourceBindings" || record.scope !== status.componentRefinements.g5Components.scope
    || JSON.stringify(Object.keys(record.sourceFiles ?? {}).sort()) !== JSON.stringify([...g5SourceBindingPaths].sort())) throw new Error("G5 source inventory must match its finite declared paths");
  for (const [file, expected] of Object.entries(record.sourceFiles)) if (hash(file) !== expected) throw new Error(`G5 current source changed: ${file}`);
  for (const [file, expected] of Object.entries(g5G4AcceptanceSnapshots)) if (hash(directory + "before/" + file) !== expected) throw new Error(`G5 must retain the frozen G4 acceptance snapshot: ${file}`);
  const baseline = JSON.parse(readFileSync(join(root, directory + "baseline.json"), "utf8"));
  if (hash(directory + "before/current-phase.yaml") !== baseline.files["status/current-phase.yaml"]) throw new Error("G5 must retain the actual original phase snapshot");
  const before = parseYamlSubset(readFileSync(join(root, directory + "before/current-phase.yaml"), "utf8"));
  const current = structuredClone(status); delete current.componentRefinements.g5Components;
  if (!exactRecord(current, before)) throw new Error("G5 must preserve all previous phase records and Gates");
  const protectedFiles = JSON.parse(readFileSync(join(root, directory + "protected-source-sha256.json"), "utf8"));
  for (const [file, expected] of Object.entries(protectedFiles)) if (hash(file) !== expected) throw new Error(`G5 changed an unrelated shared source: ${file}`);
  return record;
}

// Only G4's proof readers use this bridge; their original expected hashes still have to match.
// Later G4 predecessors are resolved first by each reader before consulting the G5 snapshot.
function getG4G5SuccessorHash(root, status) {
  if (!Object.hasOwn(status?.componentRefinements ?? {}, "g5Components")) return null;
  const successor = getG5SourceBindings(root, status), directory = "evidence/runtime/g5-components-2026-10-12/";
  const baseline = JSON.parse(readFileSync(join(root, directory + "baseline.json"), "utf8"));
  const snapshots = [...Object.keys(g5G4AcceptanceSnapshots), "scripts/verify-boundaries.mjs", "scripts/verify-workspace.mjs", "scripts/verify-token-foundations.mjs"];
  return file => {
    if (!Object.hasOwn(successor.sourceFiles, file)) return undefined;
    if (Object.hasOwn(baseline.files, file)) return baseline.files[file];
    if (!snapshots.includes(file)) return undefined;
    const path = join(root, directory, "before", file), info = lstatSync(path);
    if (!info.isFile() || info.isSymbolicLink()) throw new Error(`G5 predecessor must be a regular file: ${file}`);
    return createHash("sha256").update(readFileSync(path)).digest("hex");
  };
}

export const g4PageAcceptanceDecision = {
  acceptedAt: "2026-10-12", decisionSource: "explicit-user-three-g4-pages-acceptance",
  userStatement: "确定。完成这3个页面的验收。", pages: ["typography", "item", "progress"],
  scope: "typography-item-progress-current-playground-pages-visual-only", humanGate: "accepted",
  evidence: "evidence/runtime/g4-pages-acceptance-2026-10-12/acceptance.json",
  contrastAcceptance: "not-granted", publication: "unpublished", figmaWrite: "not-authorized",
  businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
};
export const g4PageAcceptanceGuideNote = "\n2026-10-12 用户明确确认 Typography、Item、Progress 三个当前 Playground 页面的视觉与使用展示验收通过。当前限定结果见[页面验收记录](../../evidence/runtime/g4-pages-acceptance-2026-10-12/verification.md)；此前阶段记录保留，完整对比、无障碍、发布与生产采用分别记录。\n";
const g4PageAcceptanceSources = ["scripts/verification-helpers.mjs", "scripts/g4-sizing-review.test.ts", "scripts/g4-page-acceptance.test.ts", ...["typography", "item", "progress"].map(name => `manifests/ui/${name}.yaml`), "registry/g4-assets.json", "docs/ai/g4-components.md"];

export function getG4PageAcceptanceBindings(root, status) {
  const g5PredecessorHash = getG4G5SuccessorHash(root, status);
  const decision = status?.componentRefinements?.g4Components?.pageAcceptance;
  if (decision === undefined) return null;
  if (!exactRecord(decision, g4PageAcceptanceDecision) || !hasG4SizingReviewAuthorization(status)) throw new Error("G4 page acceptance requires the exact explicit user decision and completed scoped delivery");
  const directory = "evidence/runtime/g4-pages-acceptance-2026-10-12/", previous = "evidence/runtime/g4-review-sizing-2026-10-11/";
  const hash = file => {
    const predecessor = g5PredecessorHash?.(file); if (predecessor !== undefined) return predecessor;
    const info = lstatSync(join(root, file));
    if (!info.isFile() || info.isSymbolicLink()) throw new Error(`G4 acceptance requires a regular file: ${file}`);
    return createHash("sha256").update(readFileSync(join(root, file))).digest("hex");
  };
  if (hash(directory + "baseline.json") !== "0aa40e6d83d9392a32c4de434045cbaedc7335d1251c72538b2e8fe99460eb46") throw new Error("G4 page acceptance must preserve its actual original snapshot");
  const baseline = JSON.parse(readFileSync(join(root, directory + "baseline.json"), "utf8"));
  for (const [file, expected] of Object.entries(baseline.files)) if (hash(directory + "before/" + file) !== expected) throw new Error(`G4 acceptance original changed: ${file}`);
  if (hash(previous + "source-bindings.json") !== "020d3a314defd6a1168ac1a58bb074801adf1cc5fa9d395dedb19658d2145fd1"
    || hash(previous + "final-metadata-freeze.json") !== "758dbfdef392a5c736ad9e623e1cfd152a76139d189ca9789e6fcff9ff4f1429") throw new Error("G4 page acceptance cannot rewrite the frozen technical delivery");
  const record = JSON.parse(readFileSync(join(root, directory + "source-bindings.json"), "utf8"));
  if (!exactRecord(record, { kind: "G4PageAcceptanceSourceBindings", decision, baseline: { path: directory + "baseline.json", sha256: hash(directory + "baseline.json") }, sourceFiles: Object.fromEntries(g4PageAcceptanceSources.map(file => [file, { before: baseline.files[file] ?? null, after: hash(file) }])) })) throw new Error("G4 page acceptance source inventory or current metadata changed");
  const previousPhase = parseYamlSubset(readFileSync(join(root, directory + "before/status/current-phase.yaml"), "utf8")), currentPhase = structuredClone(status);
  if (g5PredecessorHash) delete currentPhase.componentRefinements.g5Components;
  delete currentPhase.componentRefinements.g4Components.pageAcceptance;
  if (!exactRecord(currentPhase, previousPhase)) throw new Error("G4 page acceptance cannot transfer any earlier Gate or permission");
  for (const name of ["typography", "item", "progress"]) {
    const file = `manifests/ui/${name}.yaml`, original = parseYamlSubset(readFileSync(join(root, directory + "before/" + file), "utf8")), current = parseYamlSubset(readFileSync(join(root, file), "utf8"));
    if (!exactRecord(current, { ...original, verification: { ...original.verification, pageAcceptance: decision } })) throw new Error(`G4 page acceptance may add only scoped page metadata: ${file}`);
  }
  const registry = "registry/g4-assets.json", originalRegistry = JSON.parse(readFileSync(join(root, directory + "before/" + registry), "utf8"));
  if (!exactRecord(JSON.parse(readFileSync(join(root, registry), "utf8")), { ...originalRegistry, pageAcceptance: decision })) throw new Error("G4 page acceptance cannot promote the shared Registry candidates");
  const guide = "docs/ai/g4-components.md";
  if (readFileSync(join(root, guide), "utf8") !== readFileSync(join(root, directory + "before/" + guide), "utf8") + g4PageAcceptanceGuideNote) throw new Error("G4 page acceptance may append only its scoped guide decision");
  const confirmation = JSON.parse(readFileSync(join(root, decision.evidence), "utf8"));
  if (!exactRecord(confirmation, { kind: "G4PageVisualAcceptance", decision, sourceBindings: { path: directory + "source-bindings.json", sha256: hash(directory + "source-bindings.json") }, previousTechnicalFreeze: { path: previous + "final-metadata-freeze.json", sha256: hash(previous + "final-metadata-freeze.json") } })) throw new Error("G4 page acceptance evidence must match the explicit decision and frozen source");
  return record;
}

export function hasG4ComponentsAuthorization(status) {
  const entry = status?.componentRefinements?.g4Components;
  const visual = entry?.visualRefinement, sizing = entry?.sizingReview, acceptance = entry?.pageAcceptance;
  return status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(entry?.implementation)
    && ["not-run", "passed-scoped", "failed"].includes(entry?.automatedVerification)
    && ["not-run", "findings", "passed-scoped"].includes(entry?.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped" && entry.independentReview === "passed-scoped")
    && (visual === undefined || entry.implementation === "completed" && validG4VisualRefinement(visual))
    && (sizing === undefined || visual?.implementation === "completed" && validG4SizingReview(sizing))
    && (acceptance === undefined || sizing?.implementation === "completed" && exactRecord(acceptance, g4PageAcceptanceDecision))
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-10-11", decisionSource: "explicit-user-g4-components-implementation",
      userStatement: "确定，先补齐 G4：Typography 复用收口，建设 Item 和 Progress，并补齐 Playground 展示和使用说明。",
      scope: "typography-reuse-item-progress-and-playground-docs", workMode: "system-mode", assetIdentity: "registry-candidate",
      plan: "docs/plans/2026-10-11-g4-components.md", evidence: "evidence/runtime/g4-components-2026-10-11/verification.md",
      sourceLock: "evidence/runtime/g4-components-2026-10-11/source-lock.json",
      sourceBindings: "evidence/runtime/g4-components-2026-10-11/source-bindings.json",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished", figmaWrite: "not-authorized",
      businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
      ...(visual ? { visualRefinement: visual } : {}),
      ...(sizing ? { sizingReview: sizing } : {}),
      ...(acceptance ? { pageAcceptance: acceptance } : {}),
    });
}

function validG4VisualRefinement(entry) {
  return ["in-progress", "completed"].includes(entry?.implementation)
    && ["not-run", "passed-scoped", "failed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed-scoped"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped" && entry.independentReview === "passed-scoped")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-10-11", decisionSource: "explicit-user-g4-typography-cascade-and-course-material-refinement",
      scope: "preview-typography-cascade-and-course-material-compositions", workMode: "system-mode",
      plan: "docs/plans/2026-10-11-g4-visual-refinement.md", evidence: "evidence/runtime/g4-visual-refinement-2026-10-11/verification.md",
      sourceBindings: "evidence/runtime/g4-visual-refinement-2026-10-11/source-bindings.json",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished", figmaWrite: "not-authorized",
      businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
    });
}

export function hasG4VisualRefinementAuthorization(status) {
  return hasG4ComponentsAuthorization(status) && validG4VisualRefinement(status.componentRefinements.g4Components.visualRefinement);
}

function validG4SizingReview(entry) {
  return ["in-progress", "completed"].includes(entry?.implementation)
    && ["not-run", "passed-scoped", "failed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed-scoped"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped" && entry.independentReview === "passed-scoped")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-10-11", decisionSource: "explicit-user-g4-title-data-sizing-and-item-icon-feedback",
      scope: "title-16-exceptions-17-18-data-max-28-and-item-icons", workMode: "system-mode",
      plan: "docs/plans/2026-10-11-g4-sizing-and-icons.md", evidence: "evidence/runtime/g4-review-sizing-2026-10-11/verification.md",
      sourceBindings: "evidence/runtime/g4-review-sizing-2026-10-11/source-bindings.json",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "unpublished", figmaWrite: "not-authorized",
      businessMigration: "not-authorized", gitOperations: "no-operations-authorized",
    });
}

export function hasG4SizingReviewAuthorization(status) {
  return hasG4VisualRefinementAuthorization(status) && validG4SizingReview(status.componentRefinements.g4Components.sizingReview);
}

export const g4SizingReviewSourcePaths = [
  ...g4ComponentFiles.application, "apps/playground/src/docs/components/component-doc.css",
  ...["input", "select", "input-number", "tag"].map(name => `apps/playground/src/docs/components/${name}-page.css`),
  ...["typography-panel.tsx", "typography-panel.test.tsx"].map(file => `apps/playground/src/docs/token-foundations/${file}`),
  ...["typography-contract.ts", "typography-contract.test.ts", "typography.css", "tailwind-theme.css"].map(file => `packages/foundations/src/${file}`),
  "manifests/contracts/token-foundations-v1.json", ...g4ComponentFiles.documents,
  "tests/e2e/g4-components.config.ts", "tests/e2e/g4-components.spec.ts", "tests/e2e/token-foundations.spec.ts",
  ...["verification-helpers.mjs", "token-foundation-outputs.mjs", "verify-token-foundations.mjs", "verify-tailwind-b2.mjs", "verify-workspace.mjs", "verify-boundaries.mjs", "g4-components-governance.test.ts", "g4-visual-refinement.test.ts", "g4-sizing-review.test.ts"].map(file => `scripts/${file}`),
  "docs/ai/g4-components.md", "docs/ai/token-selection.md", "docs/plans/2026-10-11-g4-sizing-and-icons.md",
];
const g4SizingBaselinePath = "evidence/runtime/g4-review-sizing-2026-10-11/baseline.json";
const g4SizingBaselineChecksum = "d8148dfbef438f91786cf93976e93ad81600b2713653e8fe7f608b4a2f651503";

export function validateG4SizingCssSuccessor(file, before, current) {
  let expected = before;
  if (file === "apps/playground/src/docs/components/component-doc.css") {
    expected = before.replace("font-size:var(--rain-font-size-28); line-height:var(--rain-line-height-36);", "font-size:var(--rain-font-size-16); line-height:var(--rain-line-height-24);")
      .replace("font-size:var(--rain-font-size-18); line-height:var(--rain-line-height-24);", "font-size:var(--rain-font-size-16); line-height:var(--rain-line-height-24);")
      .replace(" .component-doc__title > h1 { font-size:var(--rain-font-size-24); line-height:var(--rain-line-height-32); }", "");
  } else if (["input", "select", "input-number", "tag"].some(name => file === `apps/playground/src/docs/components/${name}-page.css`)) {
    expected = before.replace("font-size: var(--rain-font-size-24); line-height: var(--rain-line-height-32);", "font-size: var(--rain-font-size-16); line-height: var(--rain-line-height-24);");
  } else return ["G4 sizing CSS successor requires an exact registered title caller"];
  return current === expected && expected !== before ? [] : [`G4 sizing may change only the exact title declarations: ${file}`];
}

export function getG4SizingReviewSourceBindings(root, status) {
  const g5PredecessorHash = getG4G5SuccessorHash(root, status);
  if (!hasG4SizingReviewAuthorization(status)) throw new Error("G4 sizing review requires its exact independent user authorization");
  const entry = status.componentRefinements.g4Components.sizingReview, beforeRoot = "evidence/runtime/g4-review-sizing-2026-10-11/before/";
  const acceptance = getG4PageAcceptanceBindings(root, status);
  const predecessorFile = file => acceptance?.sourceFiles[file] ? `evidence/runtime/g4-pages-acceptance-2026-10-12/before/${file}` : file;
  const hash = input => {
    const file = predecessorFile(input);
    const predecessor = g5PredecessorHash?.(file); if (predecessor !== undefined) return predecessor;
    const info = lstatSync(join(root, file));
    if (!info.isFile() || info.isSymbolicLink()) throw new Error(`G4 sizing source must be a regular file: ${file}`);
    return createHash("sha256").update(readFileSync(join(root, file))).digest("hex");
  };
  if (hash(g4SizingBaselinePath) !== g4SizingBaselineChecksum) throw new Error("G4 sizing review must preserve its original 81-file baseline manifest bytes");
  const baseline = JSON.parse(readFileSync(join(root, g4SizingBaselinePath), "utf8"));
  for (const [file, expected] of Object.entries(baseline.files)) if (hash(beforeRoot + file) !== expected) throw new Error(`G4 sizing actual before snapshot changed: ${file}`);
  const record = JSON.parse(readFileSync(join(root, entry.sourceBindings), "utf8"));
  const retainedPaths = Object.keys(baseline.files).filter(file => !g4SizingReviewSourcePaths.includes(file) && file !== "status/current-phase.yaml");
  const sameKeys = (value, keys) => JSON.stringify(Object.keys(value ?? {}).sort()) === JSON.stringify([...keys].sort());
  if (record.kind !== "G4SizingReviewSourceBindings" || record.authorizedAt !== "2026-10-11" || record.scope !== entry.scope
    || !sameKeys(record, ["kind", "authorizedAt", "scope", "baseline", "sourceFiles", "retainedRecords"])
    || !exactRecord(record.baseline, { path: g4SizingBaselinePath, sha256: g4SizingBaselineChecksum })
    || !sameKeys(record.sourceFiles, g4SizingReviewSourcePaths) || !sameKeys(record.retainedRecords, retainedPaths)) throw new Error("G4 sizing must retain its exact finite source inventory and unchanged predecessor records");
  for (const [file, binding] of Object.entries(record.sourceFiles)) if (!exactRecord(binding, { before: baseline.files[file] ?? null, after: hash(file) })) throw new Error(`G4 sizing source successor changed: ${file}`);
  for (const [file, expected] of Object.entries(record.retainedRecords)) if (expected !== baseline.files[file] || hash(file) !== expected) throw new Error(`G4 sizing retained predecessor or raw token changed: ${file}`);
  for (const file of ["component-doc", "input-page", "select-page", "input-number-page", "tag-page"].map(name => `apps/playground/src/docs/components/${name}.css`)) {
    const failures = validateG4SizingCssSuccessor(file, readFileSync(join(root, beforeRoot, file), "utf8"), readFileSync(join(root, file), "utf8"));
    if (failures.length) throw new Error(failures.join("; "));
  }
  const beforeStatus = parseYamlSubset(readFileSync(join(root, beforeRoot, "status/current-phase.yaml"), "utf8")), current = structuredClone(status);
  if (g5PredecessorHash) delete current.componentRefinements.g5Components;
  delete current.componentRefinements.g4Components.sizingReview;
  delete current.componentRefinements.g4Components.pageAcceptance;
  if (!exactRecord(current, beforeStatus)) throw new Error("G4 sizing review must preserve every prior phase record and Gate");
  for (const name of ["typography", "item", "progress"]) {
    const file = `manifests/ui/${name}.yaml`, before = parseYamlSubset(readFileSync(join(root, beforeRoot, file), "utf8")), actual = parseYamlSubset(readFileSync(join(root, predecessorFile(file)), "utf8"));
    const metadata = { scope: entry.scope, evidence: entry.evidence, automated: entry.automatedVerification === "passed-scoped" ? "scoped-passed" : entry.automatedVerification, independentReview: entry.independentReview, humanGate: "awaiting_human", contrastAcceptance: "not-granted" };
    const typographyChanges = name === "typography" ? { sourceVersion: "user-sizing-feedback-2026-10-11", migrationNotes: "标题默认 16px，显式例外 17/18px；关键数字最大 28px。本轮修改现有 Foundations 合同，旧验收保留，新反馈独立待审。", visualLineage: { ...before.visualLineage, redesignedTraits: ["独立使用页与检索映射；本轮按用户反馈修订 Heading/Data 字号合同，旧验收记录保留。"] } } : {};
    if (!exactRecord(actual, { ...before, ...typographyChanges, verification: { ...before.verification, sizingReview: metadata } })) throw new Error(`G4 sizing Manifest must preserve capability and earlier Gates: ${file}`);
  }
  const registryFile = "registry/g4-assets.json", registry = JSON.parse(readFileSync(join(root, beforeRoot, registryFile), "utf8"));
  registry.items[0].localStatus = "modified";
  if (!exactRecord(JSON.parse(readFileSync(join(root, predecessorFile(registryFile)), "utf8")), registry)) throw new Error("G4 sizing Registry may change only Typography localStatus to modified");
  return record;
}

export const g4VisualRefinementSourcePaths = [
  "apps/playground/src/docs/components/component-doc.css", ...g4ComponentFiles.application,
  "tests/e2e/g4-components.config.ts", "tests/e2e/g4-components.spec.ts",
  "scripts/verification-helpers.mjs", "scripts/token-foundation-outputs.mjs", "scripts/verify-token-foundations.mjs", "scripts/verify-workspace.mjs", "scripts/verify-boundaries.mjs", "scripts/g4-components-governance.test.ts", "scripts/g4-visual-refinement.test.ts",
  "docs/ai/g4-components.md", "docs/plans/2026-10-11-g4-visual-refinement.md", ...g4ComponentFiles.documents.filter(file => file.startsWith("manifests/")),
];
export const g4VisualRetainedRecordPaths = ["source-bindings.json", "source-integrity.json", "source-lock.json", "color-consumers.json", "color-verification.json", "verification.md", "global-before-current-comparison.json"].map(file => `evidence/runtime/g4-components-2026-10-11/${file}`);
const g4OriginalBindingsChecksum = "27437c4f91707e8965a743f7b8b376e681c5c2353e1c612752ec216cae3e1a4d";
const g4VisualBeforePhaseChecksum = "02e22e64a5202fa2aa6894b2d09c3c2d5e83901e8a4cdc48fd7fdbd0e27544a3";
const g4VisualBaselineChecksum = "e59f06c8221d8de6d1a0782e9dc4dd9b5fe5720ba92bebed08985220f7b159d9";

export function validateG4PreviewTypographySuccessor(before, current) {
  const paragraphs = ".component-doc__header p,.component-doc__example p { margin:0; line-height:var(--rain-line-height-24); }";
  const preview = before.match(/^\.component-doc__preview \{[^\n]+\}$/m)?.[0];
  if (before.split(paragraphs).length !== 2 || !preview) return ["G4 preview typography predecessor must retain its exact paragraph and container rules"];
  const expected = before.replace(paragraphs, ".component-doc__header p,.component-doc__example p { margin:0; }\n.component-doc__header p { line-height:var(--rain-line-height-24); }")
    .replace(preview, preview.replace("min-width:0; }", "min-width:0; line-height:var(--rain-line-height-24); }"));
  return current === expected ? [] : ["G4 preview typography must change only paragraph line-height ownership and the preview inherited default"];
}

export function getG4VisualRefinementSourceBindings(root, status) {
  const g5PredecessorHash = getG4G5SuccessorHash(root, status);
  if (!hasG4VisualRefinementAuthorization(status)) throw new Error("G4 visual source bindings require their exact independent feedback authorization");
  const sizing = hasG4SizingReviewAuthorization(status) ? getG4SizingReviewSourceBindings(root, status) : null;
  const predecessorFile = file => sizing?.sourceFiles[file] ? `evidence/runtime/g4-review-sizing-2026-10-11/before/${file}` : file;
  const entry = status.componentRefinements.g4Components.visualRefinement, beforeRoot = "evidence/runtime/g4-visual-refinement-2026-10-11/before/";
  const hash = input => {
    const file = predecessorFile(input);
    const predecessor = g5PredecessorHash?.(file); if (predecessor !== undefined) return predecessor;
    const info = lstatSync(join(root, file));
    if (!info.isFile() || info.isSymbolicLink()) throw new Error(`G4 visual source must be a regular file: ${file}`);
    return createHash("sha256").update(readFileSync(join(root, file))).digest("hex");
  };
  const record = JSON.parse(readFileSync(join(root, entry.sourceBindings), "utf8"));
  const baselinePath = "evidence/runtime/g4-visual-refinement-2026-10-11/baseline.json";
  if (hash(baselinePath) !== g4VisualBaselineChecksum) throw new Error("G4 visual refinement must preserve its original actual baseline manifest bytes");
  const baseline = JSON.parse(readFileSync(join(root, baselinePath), "utf8"));
  for (const [file, expected] of Object.entries(baseline.files)) if (hash(beforeRoot + file) !== expected) throw new Error(`G4 visual refinement actual before snapshot changed: ${file}`);
  const sameKeys = (value, keys) => JSON.stringify(Object.keys(value ?? {}).sort()) === JSON.stringify([...keys].sort());
  const oldPath = "evidence/runtime/g4-components-2026-10-11/source-bindings.json";
  if (hash(oldPath) !== g4OriginalBindingsChecksum || hash(beforeRoot + oldPath) !== g4OriginalBindingsChecksum) throw new Error("G4 visual refinement must preserve the original G4 source binding bytes");
  if (record.kind !== "G4VisualRefinementSourceBindings" || record.authorizedAt !== "2026-10-11" || record.scope !== entry.scope
    || !sameKeys(record, ["kind", "authorizedAt", "scope", "predecessor", "sourceFiles", "retainedRecords"])
    || !exactRecord(record.predecessor, { path: oldPath, sha256: g4OriginalBindingsChecksum })
    || !sameKeys(record.sourceFiles, g4VisualRefinementSourcePaths) || !sameKeys(record.retainedRecords, g4VisualRetainedRecordPaths)) throw new Error("G4 visual bindings must retain their exact finite source inventory and immutable predecessor");
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    const added = ["docs/plans/2026-10-11-g4-visual-refinement.md", "scripts/g4-visual-refinement.test.ts"].includes(file);
    // These two test captures already contained the current feedback RED/output-path delta.
    // Their separate inverse reconstructions must match the immutable original G4 after SHA below.
    const predecessorRoot = ["tests/e2e/g4-components.config.ts", "tests/e2e/g4-components.spec.ts"].includes(file) ? "evidence/runtime/g4-visual-refinement-2026-10-11/predecessor/" : beforeRoot;
    if (!exactRecord(binding, { before: added ? null : hash(predecessorRoot + file), after: hash(file) })) throw new Error(`G4 visual source successor changed: ${file}`);
  }
  for (const [file, expected] of Object.entries(record.retainedRecords)) if (hash(file) !== expected || hash(beforeRoot + file) !== expected) throw new Error(`G4 visual refinement retained prior G4 evidence changed: ${file}`);
  const old = JSON.parse(readFileSync(join(root, oldPath), "utf8"));
  for (const [file, binding] of Object.entries(old.sourceFiles)) {
    const visual = record.sourceFiles[file];
    if (visual ? visual.before !== binding.after : hash(file) !== binding.after) throw new Error(`G4 visual refinement cannot rewrite the original source outside its exact scope: ${file}`);
  }
  for (const [file, expected] of Object.entries(old.retainedRecords)) if (hash(file) !== expected) throw new Error(`G4 visual refinement cannot change retained Foundation or prior Gate: ${file}`);
  if (hash(beforeRoot + "status/current-phase.yaml") !== g4VisualBeforePhaseChecksum) throw new Error("G4 visual refinement before phase must preserve the actual completed G4 predecessor");
  const original = parseYamlSubset(readFileSync(join(root, beforeRoot, "status/current-phase.yaml"), "utf8")), current = structuredClone(status);
  if (g5PredecessorHash) delete current.componentRefinements.g5Components;
  delete current.componentRefinements.g4Components.visualRefinement;
  delete current.componentRefinements.g4Components.sizingReview;
  delete current.componentRefinements.g4Components.pageAcceptance;
  if (JSON.stringify(current) !== JSON.stringify(original)) throw new Error("G4 visual refinement must preserve every prior phase record and Gate");
  const docFile = "apps/playground/src/docs/components/component-doc.css", docFailures = validateG4PreviewTypographySuccessor(readFileSync(join(root, beforeRoot, docFile), "utf8"), readFileSync(join(root, predecessorFile(docFile)), "utf8"));
  if (docFailures.length) throw new Error(docFailures.join("; "));
  for (const name of ["typography", "item", "progress"]) {
    const file = `manifests/ui/${name}.yaml`, before = parseYamlSubset(readFileSync(join(root, beforeRoot, file), "utf8")), actual = parseYamlSubset(readFileSync(join(root, predecessorFile(file)), "utf8"));
    const metadata = { scope: "playground-documentation-visual-only", evidence: entry.evidence,
      automated: entry.automatedVerification === "passed-scoped" ? "scoped-passed" : entry.automatedVerification, independentReview: entry.independentReview, humanGate: "awaiting_human", contrastAcceptance: "not-granted" };
    if (!exactRecord(actual, { ...before, verification: { ...before.verification, visualRefinement: metadata } })) throw new Error(`G4 visual Manifest must preserve its original capability and Gate, adding only independent feedback metadata: ${file}`);
  }
  for (const [file, binding] of Object.entries(record.sourceFiles)) if (sizing?.sourceFiles[file]) {
    if (binding.after !== sizing.sourceFiles[file].before) throw new Error(`G4 sizing must start from the recorded visual source: ${file}`);
    binding.after = sizing.sourceFiles[file].after;
  }
  return record;
}

export const g4SourceBindingPaths = [
  ...g4ComponentFiles.ui, ...g4ComponentFiles.application, ...g4ComponentFiles.documents,
  "apps/playground/src/docs/components/component-catalog.tsx", "apps/playground/src/docs/components/component-asset-page.tsx", "apps/playground/src/styles.css",
  "packages/ui/src/index.ts", "packages/ui/src/styles.css",
  "docs/ai/g4-components.md", "docs/ai/prototype-design.md", "docs/ai/asset-index.md", "docs/plans/2026-10-11-g4-components.md",
  "scripts/verification-helpers.mjs", "scripts/verify-tailwind-b2.mjs", "scripts/verify-token-foundations.mjs", "scripts/token-foundation-outputs.mjs",
  ...g4ComponentFiles.workspace, "manifests/contracts/tailwind-b2.yaml",
  "scripts/asset-index.mjs", "scripts/asset-index.test.ts", "scripts/verify-workspace.mjs", "scripts/verify-boundaries.mjs",
];
export const g4RetainedRecordPaths = [
  "packages/foundations/src/typography-contract.ts", "packages/foundations/src/typography.css", "packages/foundations/src/tokens.css", "packages/foundations/src/tailwind-theme.css",
  "pnpm-lock.yaml", "packages/ui/package.json", "registry/g1-assets.json", "registry/g2-assets.json",
  "evidence/runtime/g123-playground-2026-10-07/color-consumers.json", "evidence/runtime/g123-playground-2026-10-07/tailwind-candidate-origins.json",
];

export function validateG4Registry(registry) {
  if (registry.pageAcceptance !== undefined) {
    if (!exactRecord(registry.pageAcceptance, g4PageAcceptanceDecision)) return ["G4 Registry page acceptance requires its exact scoped user decision"];
    registry = { ...registry }; delete registry.pageAcceptance;
  }
  const sourceLock = "evidence/runtime/g4-components-2026-10-11/source-lock.json", license = "evidence/runtime/g4-components-2026-10-11/upstream/LICENSE.md";
  const expected = {
    schemaVersion: 1, kind: "RainLocalSourceRegistry", publication: "not-published", scope: "current-workspace", assetIdentity: "registry-candidate",
    humanGate: "awaiting_human", contrastAcceptance: "not-granted", sourceLock,
    dependencies: { "@base-ui/react": "1.8.0", "class-variance-authority": "0.7.1", clsx: "2.1.1", "tailwind-merge": "3.6.0" },
    shared: {
      files: ["packages/ui/src/utils/rain-class-names.ts", "packages/ui/src/separator/separator.tsx", "packages/ui/src/separator/separator.css", "packages/ui/src/separator/separator.css.d.ts"],
      peerDependencies: ["react", "@rain-next/foundations"],
      styleDependencies: ["@rain-next/foundations/tokens.css", "@rain-next/foundations/typography.css", "@rain-next/foundations/focus.css", "@rain-next/foundations/motion.css", "@rain-next/foundations/tailwind-theme.css", "@rain-next/ui/styles.css"],
    },
    items: [
      { name: "typography", exportNames: ["typographyPresets", "typographyUtilityClassNames", "resolveTypographyPreset", "validateTypographyComposition", "validateDataFontUsage"], importPath: "@rain-next/foundations", manifest: "manifests/ui/typography.yaml",
        files: ["packages/foundations/src/typography-contract.ts", "packages/foundations/src/typography.css", "packages/foundations/src/tailwind-theme.css"], modificationMode: "managed", localStatus: "clean-existing-source-reused" },
      { name: "item", exportNames: ["Item", "ItemActions", "ItemContent", "ItemDescription", "ItemFooter", "ItemGroup", "ItemHeader", "ItemMedia", "ItemSeparator", "ItemTitle"], importPath: "@rain-next/ui", manifest: "manifests/ui/item.yaml",
        files: ["packages/ui/src/item/item.tsx", "packages/ui/src/item/item.css", "packages/ui/src/item/item.css.d.ts", "packages/ui/src/item/README.md"], registryDependencies: ["registry/core-ui.json#button"], sourceLock, license, modificationMode: "managed", localStatus: "modified" },
      { name: "progress", exportNames: ["Progress", "ProgressIndicator", "ProgressLabel", "ProgressTrack", "ProgressValue"], importPath: "@rain-next/ui", manifest: "manifests/ui/progress.yaml",
        files: ["packages/ui/src/progress/progress.tsx", "packages/ui/src/progress/progress.css", "packages/ui/src/progress/progress.css.d.ts", "packages/ui/src/progress/README.md"], sourceLock, license, modificationMode: "managed", localStatus: "modified" },
    ],
  };
  return exactRecord(registry, expected) ? [] : ["G4 Registry must retain its exact three unpublished candidates, sources, existing dependencies and independent Gates"];
}

export function getG4SourceBindings(root, status) {
  const g5PredecessorHash = getG4G5SuccessorHash(root, status);
  if (!hasG4ComponentsAuthorization(status)) throw new Error("G4 source bindings require their exact candidate authorization");
  const record = JSON.parse(readFileSync(join(root, status.componentRefinements.g4Components.sourceBindings), "utf8"));
  const sizing = hasG4SizingReviewAuthorization(status) ? getG4SizingReviewSourceBindings(root, status) : null;
  const visual = hasG4VisualRefinementAuthorization(status) ? getG4VisualRefinementSourceBindings(root, status) : null;
  const predecessorFile = file => sizing?.sourceFiles[file] ? `evidence/runtime/g4-review-sizing-2026-10-11/before/${file}` : file;
  const beforeRoot = "evidence/runtime/g4-components-2026-10-11/before/";
  const hash = input => {
    const path = predecessorFile(input);
    const predecessor = g5PredecessorHash?.(path); if (predecessor !== undefined) return predecessor;
    const stat = lstatSync(join(root, path));
    if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`G4 source must be a regular file: ${path}`);
    return createHash("sha256").update(readFileSync(join(root, path))).digest("hex");
  };
  const keysEqual = (record, keys) => JSON.stringify(Object.keys(record ?? {}).sort()) === JSON.stringify([...keys].sort());
  if (record.kind !== "G4ComponentSourceBindings" || record.scope !== status.componentRefinements.g4Components.scope || record.authorizedAt !== "2026-10-11"
    || !keysEqual(record, ["kind", "scope", "authorizedAt", "sourceFiles", "retainedRecords"])
    || !keysEqual(record.sourceFiles, g4SourceBindingPaths) || !keysEqual(record.retainedRecords, g4RetainedRecordPaths)) throw new Error("G4 bindings must retain their exact finite source and predecessor inventory");
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    const added = [...g4ComponentFiles.ui, ...g4ComponentFiles.application, ...g4ComponentFiles.documents, ...g4ComponentFiles.workspace, "docs/ai/g4-components.md", "docs/plans/2026-10-11-g4-components.md"].includes(file);
    const before = added ? null : hash(beforeRoot + file);
    const successor = visual?.sourceFiles[file];
    if (!exactRecord(binding, { before, after: successor?.before ?? hash(file) })) throw new Error(`G4 source successor changed: ${file}`);
    if (successor) binding.after = successor.after;
    else if (sizing?.sourceFiles[file]) {
      if (binding.after !== sizing.sourceFiles[file].before) throw new Error(`G4 sizing must start from the original source: ${file}`);
      binding.after = sizing.sourceFiles[file].after;
    }
  }
  for (const [file, expected] of Object.entries(record.retainedRecords)) if (hash(file) !== expected || hash(beforeRoot + file) !== expected) throw new Error(`G4 retained source or record changed: ${file}`);
  const stylesPath = "packages/ui/src/styles.css", styles = readFileSync(join(root, stylesPath), "utf8");
  const imports = '@import "./item/item.css";\n@import "./progress/progress.css";\n';
  if (styles.split(imports).length !== 2 || createHash("sha256").update(styles.replace(imports, "")).digest("hex") !== record.sourceFiles[stylesPath].before) throw new Error("G4 shared styles must add only the two exact component imports and preserve all prior styles");
  const registryFailures = validateG4Registry(JSON.parse(readFileSync(join(root, predecessorFile("registry/g4-assets.json")), "utf8")));
  if (registryFailures.length) throw new Error(registryFailures.join("; "));
  const baseline = parseYamlSubset(readFileSync(join(root, beforeRoot + "status/current-phase.yaml"), "utf8"));
  const current = { ...status, componentRefinements: Object.fromEntries(Object.entries(status.componentRefinements).filter(([name]) => name !== "g4Components")) };
  if (g5PredecessorHash) delete current.componentRefinements.g5Components;
  if (JSON.stringify(current) !== JSON.stringify(baseline)) throw new Error("G4 must preserve every prior phase record and Gate");
  return record;
}

export function validateG4SourceDirectives(source, status, root = process.cwd()) {
  if (!hasG4ComponentsAuthorization(status)) return ["G4 scanning requires its exact candidate authorization"];
  const directive = '@source "./docs/components/g4-component-pages.tsx";';
  const successorDirectives = hasG5ComponentsAuthorization(status) ? ['@source "./docs/components/g5-component-pages.tsx";'] : [];
  const before = readFileSync(join(root, "evidence/runtime/g4-components-2026-10-11/before/apps/playground/src/styles.css"), "utf8");
  const directives = text => text.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|(\/\*[\s\S]*?\*\/)/g, (match, comment) => comment ? "" : match).match(/@source\b[^;]+;/g) ?? [];
  const expected = directives(before).flatMap(line => line.startsWith("@source inline") ? [directive, ...successorDirectives, line] : [line]);
  return JSON.stringify(directives(source)) === JSON.stringify(expected) ? [] : ["G4 must add only its exact page scan source and preserve existing scan directives"];
}

export const g123PlaygroundFiles = {
  application: [
    "component-doc.tsx", "component-doc.css", "component-catalog.tsx", "component-asset-page.tsx",
    "alert-page.tsx", "breadcrumb-page.tsx", "switch-page.tsx", "accordion-page.tsx", "collapsible-page.tsx", "resizable-page.tsx", "tooltip-page.tsx",
    "button-group-page.tsx", "toggle-page.tsx", "toggle-group-page.tsx", "spinner-page.tsx", "skeleton-page.tsx", "skeleton-page.css", "toast-page.tsx",
    "g1-component-pages.css", "g3-demo-location.ts", "g3-component-pages.tsx", "g3-component-pages.css", "g3-component-pages.test.tsx", "navigation-component-pages.tsx", "navigation-doc-pages.css",
  ].map(file => `apps/playground/src/docs/components/${file}`).concat("apps/playground/src/routes/component-assets.test.tsx"),
  ui: ["sheet", "context-menu", "hover-card", "menubar", "navigation-menu"].map(name => `packages/ui/src/${name}/${name}.tsx`).concat("packages/ui/src/_internal/popup.tsx", "packages/ui/src/_internal/g3-popup-context.test.tsx"),
  documents: ["docs/plans/2026-10-07-g1-g3-playground.md", "evidence/runtime/g123-playground-2026-10-07/verification.md", "evidence/runtime/g123-playground-2026-10-07/color-consumers.json", "evidence/runtime/g123-playground-2026-10-07/token-current-result.json", "evidence/runtime/g123-playground-2026-10-07/token-initial-new-doc-findings.json", "evidence/runtime/g123-playground-2026-10-07/tailwind-candidate-origins.json"],
  workspace: ["scripts/g123-playground-governance.test.ts", "tests/e2e/g123-playground.config.ts", "tests/e2e/g123-playground.spec.ts"],
  scanSources: ["component-doc", "component-catalog", "switch-page", "accordion-page", "collapsible-page", "resizable-page", "tooltip-page", "button-group-page", "toggle-page", "toggle-group-page", "spinner-page", "skeleton-page", "toast-page", "g3-component-pages", "navigation-component-pages"],
};
export function hasG123PlaygroundAssetizationAuthorization(status) {
  const entry = status?.componentRefinements?.g123PlaygroundAssetization;
  return status?.currentPhase?.id === "token-foundations-v1"
    && hasTokenFirstV12Authorization(status) && hasTokenFirstV12G1NextAuthorization(status) && hasTokenFirstV12G2Authorization(status)
    && hasRecordedPostB2Refinement(status, "tokenFirstV12G3")
    && ["in-progress", "completed"].includes(entry?.implementation)
    && ["not-run", "passed-scoped", "failed"].includes(entry?.automatedVerification)
    && ["not-run", "findings", "passed-scoped"].includes(entry?.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-10-07", decisionSource: "explicit-user-g1-g3-assetization-and-playground",
      userStatement: "补齐这批已有成果的组件沉淀与 Playground 展示", scope: "g1-g3-existing-candidates-and-independent-playground-docs",
      workMode: "system-mode", assetIdentity: "registry-candidate",
      plan: "docs/plans/2026-10-07-g1-g3-playground.md", evidence: "evidence/runtime/g123-playground-2026-10-07/verification.md",
      g1RegistrySha256: g123PlaygroundRegistrySnapshots.g1, g2RegistrySha256: g123PlaygroundRegistrySnapshots.g2,
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
      figmaWrite: "not-authorized", gitOperations: "no-operations-authorized",
    });
}

export function hasG23FamilyVisualRefinementAuthorization(status) {
  const entry = status?.componentRefinements?.g23FamilyVisualRefinement;
  return status?.currentPhase?.id === "token-foundations-v1"
    && ["in-progress", "completed"].includes(entry?.implementation)
    && ["not-run", "failed", "passed-scoped"].includes(entry?.automatedVerification)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-10-08",
      decisionSource: "explicit-user-family-route-and-visual-target-confirmation",
      userStatement: "按家族精修；确定，继续；确定。",
      scope: "toggle-group-command-sidebar-first-samples-and-document-preview", workMode: "system-mode",
      plan: "docs/plans/2026-10-08-g2-g3-family-refinement.md",
      visualTarget: "evidence/runtime/g2-g3-family-refinement-2026-10-08/approved-visual-target.png",
      evidence: "evidence/runtime/g2-g3-family-refinement-2026-10-08/verification.md",
      sourceBindings: "evidence/runtime/g2-g3-family-refinement-2026-10-08/source-bindings.json",
      designDirection: "user-confirmed-image", implementation: entry.implementation,
      automatedVerification: entry.automatedVerification, runtimeVisualReview: "awaiting-user-review",
      contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
      figmaWrite: "not-authorized", gitOperations: "no-operations-authorized",
    });
}

export function hasG23RemainingVisualRefinementAuthorization(status) {
  const entry = status?.componentRefinements?.g23RemainingVisualRefinement;
  return hasG23FamilyVisualRefinementAuthorization(status)
    && status.componentRefinements.g23FamilyVisualRefinement.implementation === "completed"
    && ["in-progress", "completed"].includes(entry?.implementation)
    && ["not-run", "failed", "passed-scoped"].includes(entry?.automatedVerification)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped")
    && exactRecord(entry, {
      authorization:"authorized", authorizedAt:"2026-10-08", decisionSource:"explicit-user-continue-remaining-g2-g3-styles",
      userStatement:"继续优化g2、g3下，其他组件的样式", scope:"remaining-g2-g3-styles-and-existing-playground-examples",
      workMode:"system-mode", plan:"docs/plans/2026-10-08-g2-g3-remaining-families.md",
      visualTarget:"evidence/runtime/g2-g3-family-refinement-2026-10-08/approved-visual-target.png",
      evidence:"evidence/runtime/g2-g3-remaining-families-2026-10-08/verification.md",
      sourceBindings:"evidence/runtime/g2-g3-remaining-families-2026-10-08/source-bindings.json",
      designDirection:"continue-user-confirmed-family-direction", implementation:entry.implementation,
      automatedVerification:entry.automatedVerification, runtimeVisualReview:"awaiting-user-review",
      contrastAcceptance:"not-granted", publication:"not-authorized", businessMigration:"not-authorized",
      figmaWrite:"not-authorized", gitOperations:"no-operations-authorized",
    });
}

const g23DocBindingsPath = "evidence/runtime/g2-g3-family-refinement-2026-10-08/source-bindings.json";
export function hasToastActionPositionRefinementAuthorization(status) {
  const entry = status?.componentRefinements?.toastActionPositionRefinement;
  return hasG23RemainingVisualRefinementAuthorization(status)
    && status.componentRefinements.g23RemainingVisualRefinement.implementation === "completed"
    && ["in-progress", "completed"].includes(entry?.implementation)
    && ["not-run", "failed", "passed-scoped"].includes(entry?.automatedVerification)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-10-08", decisionSource: "explicit-user-toast-text-action-and-top-position",
      scope: "toast-text-action-and-top-centered-feedback", workMode: "system-mode",
      plan: "docs/plans/2026-10-08-toast-action-position.md", evidence: "evidence/runtime/toast-action-position-2026-10-08/verification.md",
      sourceBindings: "evidence/runtime/toast-action-position-2026-10-08/source-bindings.json",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, runtimeVisualReview: "awaiting-user-review",
      contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
      figmaWrite: "not-authorized", gitOperations: "no-operations-authorized",
    });
}

const g23DocBindingsChecksum = "cadd8cd894a7581e317b601a829a72c3a44f8a327106e4c8cfaaceb9b42dbf00";
export function hasSheetTaskRefinementAuthorization(status) {
  const entry = status?.componentRefinements?.sheetTaskRefinement;
  const feedback = entry?.feedbackRefinement;
  const feedbackAuthorized = feedback === undefined || ["in-progress", "completed"].includes(feedback?.implementation)
    && ["not-run", "failed", "passed-scoped"].includes(feedback.automatedVerification)
    && (feedback.implementation !== "completed" || feedback.automatedVerification === "passed-scoped")
    && exactRecord(feedback, {
      authorization: "authorized", authorizedAt: "2026-10-09", decisionSource: "explicit-user-sheet-field-buttons-and-icon-feedback",
      scope: "sheet-standard-input-native-history-off-neutral-name-fill-primary-save-tertiary-cancel-pdf-28",
      evidence: "evidence/runtime/sheet-feedback-2026-10-09/verification.md",
      sourceBindings: "evidence/runtime/sheet-feedback-2026-10-09/source-bindings.json",
      implementation: feedback.implementation, automatedVerification: feedback.automatedVerification,
      runtimeVisualReview: "awaiting-user-review", publication: "not-authorized",
    });
  const detailAccepted = entry?.implementation === "completed" && entry.runtimeVisualReview === "detail-accepted-other-states-pending"
    && exactRecord(entry.detailVisualApproval, {
      acceptedAt: "2026-10-09", decisionSource: "explicit-user-confirmation-after-sheet-runtime-handoff", userStatement: "确定",
      scope: "presented-right-detail-visual-and-information-layout", evidence: "evidence/runtime/sheet-task-refinement-2026-10-09/visual-acceptance.json",
    });
  return hasToastActionPositionRefinementAuthorization(status)
    && feedbackAuthorized
    && ["in-progress", "completed"].includes(entry?.implementation)
    && ["not-run", "failed", "passed-scoped"].includes(entry?.automatedVerification)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-10-09", decisionSource: "explicit-user-sheet-selected-visual-and-start-refinement",
      userStatement: "确定，开始改造", scope: "sheet-task-parts-and-existing-playground-detail-edit", workMode: "system-mode",
      plan: "docs/plans/2026-10-09-sheet-task-refinement.md",
      visualTarget: "evidence/runtime/sheet-task-refinement-2026-10-09/approved-visual-target.png",
      evidence: "evidence/runtime/sheet-task-refinement-2026-10-09/verification.md",
      sourceBindings: "evidence/runtime/sheet-task-refinement-2026-10-09/source-bindings.json",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification,
      runtimeVisualReview: detailAccepted ? "detail-accepted-other-states-pending" : "awaiting-user-review",
      ...(detailAccepted ? { detailVisualApproval: entry.detailVisualApproval } : {}),
      ...(feedback ? { feedbackRefinement: feedback } : {}),
      contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized", figmaWrite: "not-authorized", gitOperations: "no-operations-authorized",
    });
}

export function getG23DocumentationSourceBindings(root, status) {
  if (!hasG23FamilyVisualRefinementAuthorization(status)) throw new Error("G2–G3 documentation bindings require the exact first sample authorization");
  const source = readFileSync(join(root, g23DocBindingsPath), "utf8");
  if (createHash("sha256").update(source).digest("hex") !== g23DocBindingsChecksum) throw new Error("G2–G3 documentation bindings must preserve their recorded bytes");
  const record = JSON.parse(source);
  const successors = [];
  if (hasG23RemainingVisualRefinementAuthorization(status)) successors.push({
    path: status.componentRefinements.g23RemainingVisualRefinement.sourceBindings,
    checksum: "dea5ca215723a2f512d1b17bd7f1248bfd9c371698c181bc22c36134919cb507",
  });
  if (hasToastActionPositionRefinementAuthorization(status)) successors.push({
    path: status.componentRefinements.toastActionPositionRefinement.sourceBindings,
    checksum: "ccdd8e9591489dba6529a378c83dcb46bedbb721931e6a0d8716fa806c499ceb",
  });
  if (hasSheetTaskRefinementAuthorization(status)) successors.push({
    path: status.componentRefinements.sheetTaskRefinement.sourceBindings,
    checksum: "d142bf0f5ae1edb03857a29c15ed10a0721ca1a11f26083d091795b98ec8b036",
  });
  if (hasSheetTaskRefinementAuthorization(status) && status.componentRefinements.sheetTaskRefinement.feedbackRefinement) successors.push({
    path: status.componentRefinements.sheetTaskRefinement.feedbackRefinement.sourceBindings,
    checksum: "1dcd5563e5bba6259e3154a72de25aea8ecc27504a0c530c919f0e182a4201e9",
  });
  for (const { path, checksum } of successors) {
    const bytes = readFileSync(join(root, path));
    if (createHash("sha256").update(bytes).digest("hex") !== checksum) throw new Error("G2–G3 remaining documentation bindings must preserve their recorded bytes");
    const successor = JSON.parse(bytes);
    for (const [file, binding] of Object.entries(successor.sourceFiles)) {
      if (record.sourceFiles[file] && record.sourceFiles[file].after !== binding.before) throw new Error(`G2–G3 remaining documentation predecessor changed: ${file}`);
      record.sourceFiles[file] = record.sourceFiles[file] ? { ...record.sourceFiles[file], after:binding.after } : binding;
    }
    record.lexicalSourceFiles ??= {};
    for (const [file, binding] of Object.entries(successor.lexicalSourceFiles)) {
      const previous = record.lexicalSourceFiles[file];
      if (previous && previous.after !== binding.before) throw new Error(`G2–G3 lexical predecessor changed: ${file}`);
      record.lexicalSourceFiles[file] = previous ? { ...previous, after: binding.after } : binding;
      record.retainedRecords[file] = binding.after;
    }
    Object.assign(record.retainedRecords, successor.retainedRecords, { [path]:checksum });
  }
  if (hasSheetTaskRefinementAuthorization(status) && status.componentRefinements.sheetTaskRefinement.detailVisualApproval) {
    const path = status.componentRefinements.sheetTaskRefinement.detailVisualApproval.evidence;
    const bytes = readFileSync(join(root, path)), checksum = "112fd7de77a4f316c359a65c8101e0f6d5f60912af79fa7930936b0999d5dada";
    if (createHash("sha256").update(bytes).digest("hex") !== checksum) throw new Error("Sheet detail acceptance must preserve its recorded bytes");
    const approval = JSON.parse(bytes);
    record.retainedRecords[path] = checksum;
    record.retainedRecords[approval.reviewedSurface.screenshot] = approval.reviewedSurface.sha256;
  }
  if (hasG4ComponentsAuthorization(status)) {
    const successor = getG4SourceBindings(root, status), stylesPath = "packages/ui/src/styles.css";
    const binding = successor.sourceFiles[stylesPath];
    if (record.sourceFiles[stylesPath]?.after !== binding.before) throw new Error("G4 shared-style predecessor must match the unchanged G2–G3 source record");
    record.sourceFiles[stylesPath].after = binding.after;
    const path = status.componentRefinements.g4Components.sourceBindings;
    record.retainedRecords[path] = createHash("sha256").update(readFileSync(join(root, path))).digest("hex");
    if (hasG4VisualRefinementAuthorization(status)) {
      const visual = getG4VisualRefinementSourceBindings(root, status), docPath = "apps/playground/src/docs/components/component-doc.css", binding = visual.sourceFiles[docPath];
      if (record.sourceFiles[docPath]?.after !== binding.before) throw new Error("G4 typography cascade predecessor must match the unchanged G2–G3 documentation record");
      record.sourceFiles[docPath].after = binding.after;
      const path = status.componentRefinements.g4Components.visualRefinement.sourceBindings;
      record.retainedRecords[path] = createHash("sha256").update(readFileSync(join(root, path))).digest("hex");
    }
  }
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    if (createHash("sha256").update(readFileSync(join(root, file))).digest("hex") !== binding.after) throw new Error(`G2–G3 documentation actual source changed: ${file}`);
  }
  for (const [file, expected] of Object.entries(record.retainedRecords)) {
    if (createHash("sha256").update(readFileSync(join(root, file))).digest("hex") !== expected) throw new Error(`G2–G3 documentation retained record changed: ${file}`);
  }
  return record;
}

export const buttonGroupRepairFiles = {
  application: ["apps/playground/src/docs/components/button-group-page.tsx", "apps/playground/src/docs/components/button-group-page.css", "apps/playground/src/docs/components/button-group-page.test.tsx"],
  ui: ["button-group.tsx", "button-group.css"].map(file => `packages/ui/src/button-group/${file}`),
  documents: ["manifests/ui/button-group.yaml", "docs/plans/2026-10-07-button-group-repair.md", "evidence/runtime/button-group-repair-2026-10-07/verification.md", "evidence/runtime/button-group-repair-2026-10-07/source-bindings.json", "evidence/runtime/button-group-repair-2026-10-07/source-bindings-before-dark-fix.json", "evidence/runtime/button-group-repair-2026-10-07/doc-color-consumers.json", "docs/plans/2026-10-08-button-group-style.md", "evidence/runtime/button-group-style-2026-10-08/verification.md", "evidence/runtime/button-group-style-2026-10-08/source-bindings.json", "evidence/runtime/button-group-style-2026-10-08/doc-color-consumers.json", "docs/plans/2026-10-08-button-group-sizes.md", "evidence/runtime/button-group-sizes-2026-10-08/verification.md", "evidence/runtime/button-group-sizes-2026-10-08/source-bindings.json", "evidence/runtime/button-group-sizes-2026-10-08/doc-color-consumers.json", "evidence/runtime/button-group-sizes-2026-10-08/style-human-gate.json"],
  workspace: ["scripts/g123-playground-governance.test.ts", "tests/e2e/button-group-repair.config.ts", "tests/e2e/button-group-repair.spec.ts"],
};
export function hasButtonGroupRepairAuthorization(status) {
  const entry = status?.componentRefinements?.buttonGroupRepair;
  const style = entry?.styleRefinement;
  const styleAccepted = style?.humanGate === "accepted" && style.implementation === "completed"
    && style.automatedVerification === "passed-scoped" && style.independentReview === "passed-scoped"
    && exactRecord(style.humanGateDecision, {
      acceptedAt: "2026-10-08", decisionSource: "explicit-user-button-group-style-current-runtime-confirmation",
      userStatement: "确定。需要补充多尺寸，现在只有1个尺寸。", scope: "button-group-style-current-runtime-visual-only",
      evidence: "evidence/runtime/button-group-sizes-2026-10-08/style-human-gate.json",
    });
  const styleAuthorized = style === undefined || ["in-progress", "completed"].includes(style.implementation)
    && ["not-run", "passed-scoped", "failed"].includes(style.automatedVerification)
    && ["not-run", "findings", "passed-scoped"].includes(style.independentReview)
    && (style.implementation !== "completed" || style.automatedVerification === "passed-scoped" && style.independentReview === "passed-scoped")
    && exactRecord(style, {
      authorization: "authorized", authorizedAt: "2026-10-08", decisionSource: "explicit-user-button-group-style-implementation",
      userStatement: "开始改代码", scope: "button-group-disabled-content-continuous-seams-and-local-docs",
      plan: "docs/plans/2026-10-08-button-group-style.md", evidence: "evidence/runtime/button-group-style-2026-10-08/verification.md",
      sourceBindings: "evidence/runtime/button-group-style-2026-10-08/source-bindings.json",
      implementation: style.implementation, automatedVerification: style.automatedVerification, independentReview: style.independentReview,
      humanGate: styleAccepted ? "accepted" : "awaiting_human", ...(styleAccepted ? { humanGateDecision: style.humanGateDecision } : {}),
    });
  const sizes = entry?.sizeRefinement;
  const sizesAuthorized = sizes === undefined || styleAccepted && entry.implementation === "completed"
    && ["in-progress", "completed"].includes(sizes.implementation)
    && ["not-run", "passed-scoped", "failed"].includes(sizes.automatedVerification)
    && ["not-run", "findings", "passed-scoped"].includes(sizes.independentReview)
    && (sizes.implementation !== "completed" || sizes.automatedVerification === "passed-scoped" && sizes.independentReview === "passed-scoped")
    && exactRecord(sizes, {
      authorization: "authorized", authorizedAt: "2026-10-08", decisionSource: "explicit-user-button-group-five-sizes",
      userStatement: "确定。需要补充多尺寸，现在只有1个尺寸。", scope: "button-group-existing-five-button-sizes-and-local-docs-only",
      plan: "docs/plans/2026-10-08-button-group-sizes.md", evidence: "evidence/runtime/button-group-sizes-2026-10-08/verification.md",
      sourceBindings: "evidence/runtime/button-group-sizes-2026-10-08/source-bindings.json",
      implementation: sizes.implementation, automatedVerification: sizes.automatedVerification, independentReview: sizes.independentReview, humanGate: "awaiting_human",
    });
  return hasG123PlaygroundAssetizationAuthorization(status)
    && styleAuthorized && sizesAuthorized
    && status.componentRefinements.g123PlaygroundAssetization.implementation === "completed"
    && createHash("sha256").update(JSON.stringify(status.componentRefinements.g123PlaygroundAssetization)).digest("hex") === "4b9b15d5c814cac94b8f4ef0208f48a34caecbdd889fd67f11e88b3f1c9f3c0f"
    && ["in-progress", "completed"].includes(entry?.implementation)
    && ["not-run", "passed-scoped", "failed"].includes(entry?.automatedVerification)
    && ["not-run", "findings", "passed-scoped"].includes(entry?.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped" && entry.independentReview === "passed-scoped")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-10-07", decisionSource: "explicit-user-continue-button-group-repair",
      userStatement: "继续修复", scope: "button-group-existing-part-contract-seams-and-playground-only",
      workMode: "system-mode", assetIdentity: "registry-candidate",
      evidence: "evidence/runtime/button-group-repair-2026-10-07/verification.md",
      sourceBindings: "evidence/runtime/button-group-repair-2026-10-07/source-bindings.json",
      g2RegistrySha256: g123PlaygroundRegistrySnapshots.g2,
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: "awaiting_human", contrastAcceptance: "not-granted", publication: "not-authorized", businessMigration: "not-authorized",
      figmaWrite: "not-authorized", gitOperations: "no-operations-authorized",
      ...(style ? { styleRefinement: style } : {}),
      ...(sizes ? { sizeRefinement: sizes } : {}),
    });
}
export function hasButtonGroupSizeRefinementAuthorization(status) {
  return hasButtonGroupRepairAuthorization(status) && Boolean(status.componentRefinements.buttonGroupRepair.sizeRefinement);
}

export function getG123TailwindCandidateOrigins(root, status) {
  if (!hasG123PlaygroundAssetizationAuthorization(status)) throw new Error("Current lexical origins require the exact G1–G3 authorization");
  const source = readFileSync(join(root, "evidence/runtime/g123-playground-2026-10-07/tailwind-candidate-origins.json"), "utf8");
  const originalChecksum = "9d11352daa27460cd8076e68f56e9833f511dcfaa2f78cfcf9551e4aeea71518";
  const repair = hasButtonGroupRepairAuthorization(status) ? getButtonGroupRepairSourceBindings(root, status) : null;
  if (createHash("sha256").update(source).digest("hex") !== originalChecksum) {
    // The completed G123 route revision changed only its two lexical hash entries.
    const projection = repair?.lexicalProjection;
    if (!projection || createHash("sha256").update(source.replaceAll(projection.completedRouteSha256, projection.originalRouteSha256)).digest("hex") !== originalChecksum) throw new Error("G1–G3 lexical origin inventory must preserve its recorded bytes");
  }
  const record = JSON.parse(source);
  const family = hasG23RemainingVisualRefinementAuthorization(status) ? getG23DocumentationSourceBindings(root, status) : null;
  const g4 = hasG4ComponentsAuthorization(status) ? getG4SourceBindings(root, status) : null;
  for (const [file, expected] of Object.entries(record.sourceFiles)) {
    const successor = file === "packages/ui/src/button-group/button-group.tsx" ? repair?.sourceFiles[file] : g4?.sourceFiles[file] ?? family?.lexicalSourceFiles[file];
    const current = successor?.after ?? expected;
    if (successor && successor.before !== expected || createHash("sha256").update(readFileSync(join(root, file))).digest("hex") !== current) throw new Error(`G1–G3 lexical origin successor changed: ${file}`);
    if (successor) {
      record.sourceFiles[file] = current;
      for (const [candidate, origins] of Object.entries(record.unusedCandidateSources)) if (Object.hasOwn(origins, file)) {
        if (readFileSync(join(root, file), "utf8").includes(candidate)) origins[file] = current;
        else delete origins[file];
      }
    }
  }
  return record;
}

export function getButtonGroupRepairSourceBindings(root, status) {
  if (!hasButtonGroupRepairAuthorization(status)) throw new Error("Button Group source bindings require the exact repair authorization");
  const source = readFileSync(join(root, "evidence/runtime/button-group-repair-2026-10-07/source-bindings.json"), "utf8");
  if (createHash("sha256").update(source).digest("hex") !== "8d497cc6315043155b478f0c48fd2a99004fb26a1c2c1e8a12de947615bc668b") throw new Error("Button Group source binding inventory must preserve its recorded bytes");
  const record = JSON.parse(source);
  const repair = status.componentRefinements.buttonGroupRepair;
  for (const [refinement, checksum, label, beforeDirectory] of [
    [repair.styleRefinement, "fa011732378deaabfd0a6ab40564e3dfed9617a10aff14a69cdfbe13c81edd5c", "style", "evidence/runtime/button-group-style-2026-10-08/before"],
    [repair.sizeRefinement, "99b3202343ddf86340b8ffd579088b0c648711528fe751f81ac35d9b046f0f6b", "size", "evidence/runtime/button-group-sizes-2026-10-08/before"],
  ]) {
    if (!refinement) continue;
    const source = readFileSync(join(root, refinement.sourceBindings), "utf8");
    if (createHash("sha256").update(source).digest("hex") !== checksum) throw new Error(`Button Group ${label} bindings must preserve their recorded bytes`);
    const successor = JSON.parse(source);
    for (const [file, binding] of Object.entries(successor.sourceFiles)) {
      if (record.sourceFiles[file]?.after !== binding.before) throw new Error(`Button Group ${label} predecessor changed: ${file}`);
      record.sourceFiles[file].after = binding.after;
      record.retainedRecords[`${beforeDirectory}/${file}`] = binding.before;
    }
    Object.assign(record.retainedRecords, successor.retainedRecords, { [refinement.sourceBindings]: checksum });
  }
  if (hasG23FamilyVisualRefinementAuthorization(status)) {
    const successor = getG23DocumentationSourceBindings(root, status);
    for (const [file, binding] of Object.entries(successor.sourceFiles)) {
      const predecessor = record.sourceFiles[file]?.after ?? record.retainedRecords[file];
      if (predecessor && predecessor !== binding.before) throw new Error(`G2–G3 documentation predecessor changed: ${file}`);
      if (record.sourceFiles[file]) record.sourceFiles[file].after = binding.after;
      record.retainedRecords[file] = binding.after;
    }
    Object.assign(record.retainedRecords, successor.retainedRecords, { [g23DocBindingsPath]: g23DocBindingsChecksum });
  }
  for (const [file, binding] of Object.entries(record.sourceFiles)) {
    if (createHash("sha256").update(readFileSync(join(root, file))).digest("hex") !== binding.after) throw new Error(`Button Group repair actual source changed: ${file}`);
    if (binding.before && createHash("sha256").update(readFileSync(join(root, "evidence/runtime/button-group-repair-2026-10-07/before", file))).digest("hex") !== binding.before) throw new Error(`Button Group repair prior source changed: ${file}`);
  }
  for (const [file, expected] of Object.entries(record.retainedRecords)) if (createHash("sha256").update(readFileSync(join(root, file))).digest("hex") !== expected) throw new Error(`Button Group repair retained record changed: ${file}`);
  return record;
}

export function hasAlertAuthorization(status) {
  const entry = status?.componentRefinements?.alert;
  const accepted = entry?.humanGate === "accepted";
  return status?.currentPhase?.id === "token-foundations-v1" && Boolean(entry)
    && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "passed-scoped"].includes(entry.automatedVerification)
    && ["not-run", "passed-scoped"].includes(entry.independentReview)
    && (entry.implementation !== "completed" || entry.automatedVerification === "passed-scoped" && entry.independentReview === "passed-scoped")
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && (!accepted || entry.implementation === "completed" && entry.automatedVerification === "passed-scoped" && entry.independentReview === "passed-scoped")
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-20", decisionSource: "explicit-user-start-alert", userStatement: "开始建设",
      scope: "shared-alert-four-tones-page-banner-b-default-a-recipe", plan: "docs/plans/2026-09-20-alert.md", evidence: "evidence/runtime/alert/verification.md",
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: accepted ? "accepted" : "awaiting_human",
      ...(accepted ? { humanGateDecision: {
        acceptedAt: "2026-09-20", decisionSource: "explicit-user-alert-visual-confirmation",
        userStatement: "确定。完成视觉验收", scope: "alert-current-runtime-visual-only", evidence: "evidence/runtime/alert/verification.md",
      } } : {}),
      contrastAcceptance: "not-granted", publication: "unpublished", git: "no-operations-authorized",
    });
}
export const alertFiles = {
  application: ["alert-page.tsx", "alert-page.css"].map(file => `apps/playground/src/docs/components/${file}`),
  ui: ["alert.tsx", "alert.css", "alert.css.d.ts", "alert.test.tsx", "README.md"].map(file => `packages/ui/src/alert/${file}`),
  documents: ["manifests/ui/alert.yaml", "registry/alert.json"],
  workspace: ["scripts/alert.mjs", "scripts/alert.test.ts", "tests/e2e/alert.spec.ts", "tests/e2e/alert.config.ts"],
};

export function hasTooltipAuthorization(status) {
  const entry = status?.componentRefinements?.tooltip;
  const accepted = entry?.humanGate === "accepted";
  return hasTokenFirstV12G1NextAuthorization(status) && entry?.authorization === "authorized"
    && entry.decisionSource === "explicit-user-classic-tooltip-and-missing-token"
    && entry.scope === "shared-tooltip-classic-visual-behavior-and-preview-replacement"
    && entry.tokenAddition === "fixed-tooltip-background-2F3545"
    && (accepted ? entry.implementation === "implemented-shared-candidate"
      && entry.automatedVerification === "passed-scoped" && entry.independentReview === "passed-scoped-read-only-review"
      && exactRecord(entry.humanGateDecision, {
        acceptedAt: "2026-09-20", decisionSource: "explicit-user-tooltip-confirmation", userStatement: "确定。",
        scope: "tooltip-current-runtime-visual-and-bottom-first-interaction",
        evidence: "evidence/runtime/tooltip-classic/verification.md",
      }) === true : entry.humanGate === "awaiting_human" && entry.humanGateDecision === undefined)
    && entry.contrastAcceptance === "not-granted"
    && entry.publication === "unpublished" && entry.git === "no-operations-authorized";
}

export const tooltipFiles = {
  ui: ["tooltip.tsx", "tooltip.css", "tooltip.css.d.ts", "tooltip.test.tsx", "README.md"].map(file => `packages/ui/src/tooltip/${file}`),
  workspace: ["packages/foundations/src/tooltip-token-contract.ts", "scripts/tooltip.test.ts"],
  documents: ["manifests/ui/tooltip.yaml", "registry/tooltip.json"],
};

export function hasTreeAuthorization(status) {
  const entry = status?.componentRefinements?.treeDesignAndImplementationRules;
  return entry?.authorization === "authorized-local-implementation"
    && entry.authorizedAt === "2026-09-25"
    && entry.decisionSource === "explicit-user-request-to-implement-approved-plan"
    && entry.userStatement === "开始按照计划实施建设"
    && entry.scope === "rain-next-tree-ui-and-manage-tree-pattern-per-approved-plan"
    && entry.workMode === "system-mode-local-candidate-implementation"
    && entry.plan === "../docs/plans/2026-09-25-tree-implementation-rules.md"
    && entry.acceptedVisual === "../docs/design-reviews/tree/accepted-layout-a.html"
    && entry.humanGate === "accepted"
    && entry.humanGateScope === "tree-layout-a-representative-visual-design-only"
    && exactRecord(entry.humanGateDecision, {
      acceptedAt: "2026-09-25", decisionSource: "explicit-user-visual-acceptance",
      userStatement: "确定。已经完成视觉审核。", scope: "basic-checkable-rich-manage-layout-a-visuals",
      evidence: "../docs/plans/2026-09-25-tree-implementation-rules.md",
    })
    && entry.runtimeAcceptance === "accepted-current-local-tree-and-manage-tree-runtime-visual-after-feedback"
    && entry.contrastAcceptance === "not-granted-known-preview-contrast-findings"
    && entry.publication === "unpublished"
    && JSON.stringify(entry.doesNotAuthorize) === JSON.stringify(["global-token-or-other-component-changes", "figma-write-or-publication", "package-registry-publication-or-business-migration", "git-commit-push-or-merge"]);
}

// ponytail: these three recorded scopes use exact snapshots; a changed scope needs a reviewed hash.
const recordedPostB2Refinements = {
  breadcrumbSingleSize: "77eb9fb138e33c35f33edc175144efcee9d03900b902225cddf248004300b018",
  tokenFirstG3NavigationRebuildV03: "d10978b4ba37a8b36d55b9deeebc66145e6f1c61ea7ca786fc1194d606df0c3c",
  tokenFirstV12G3: "d8669a9fc0d788589e316b61aa931a25ee5ed054dda62bfa26cdab63428b651b",
};

export function hasRecordedPostB2Refinement(status, name) {
  return Object.hasOwn(recordedPostB2Refinements, name)
    && createHash("sha256").update(JSON.stringify(status?.componentRefinements?.[name] ?? null)).digest("hex") === recordedPostB2Refinements[name];
}

export function getValidatedTailwindB2History(status) {
  const fail = () => { throw new Error("Invalid Token Foundations V1 history: the complete frozen B2 state and existing Gates must remain unchanged"); };
  const history = status?.phaseHistory?.tailwindB2;
  if (status?.currentPhase?.id !== "token-foundations-v1" || !history
    || createHash("sha256").update(JSON.stringify(history)).digest("hex") !== "fb9b518f55944a74c8081d88a83d2385c8615e95887efe0cd1eae9b16ae186fe"
    || !exactRecord(status.phaseHistory, { foundationSpikeDay3: history.phaseHistory?.foundationSpikeDay3, tailwindB2: history })) fail();
  for (const key of ["schemaVersion", "kind", "preparationOutputs", "preparationChecks", "componentRefinements", "componentHumanGates", "independentAuditCheckpoints", "pendingGitActions"]) {
    const current = key === "componentRefinements"
      ? Object.fromEntries(Object.entries(status[key]).filter(([name, record]) =>
        !hasRecordedPostB2Refinement(status, name)
        && !(name === "g23FamilyVisualRefinement" && hasG23FamilyVisualRefinementAuthorization(status))
        && !(name === "g23RemainingVisualRefinement" && hasG23RemainingVisualRefinementAuthorization(status))
        && !(name === "toastActionPositionRefinement" && hasToastActionPositionRefinementAuthorization(status))
        && !(name === "sheetTaskRefinement" && hasSheetTaskRefinementAuthorization(status))
        && !(name === "g123PlaygroundAssetization" && hasG123PlaygroundAssetizationAuthorization(status))
        && !(name === "g4Components" && hasG4ComponentsAuthorization(status))
        && !(name === "g5Components" && hasG5ComponentsAuthorization(status))
        && !(name === "buttonGroupRepair" && hasButtonGroupRepairAuthorization(status))
        && !(name === "tokenFirstV12G2" && hasTokenFirstV12G2Authorization(status))
        && !(name === "treeDesignAndImplementationRules" && hasTreeAuthorization(status))
        && !(name === "alert" && hasAlertAuthorization(status))
        && !(name === "tooltip" && hasTooltipAuthorization(status))
        && !(name === "tokenFirstV12" && hasTokenFirstV12Authorization(status))
        && !(name === "inputNumber" && hasInputNumberAuthorization(status))
        && !(name === "generationQuality" && hasGenerationQualityAuthorization(status))
        && !(name === "avatarFamily" && hasAvatarFamilyAuthorization(status))
        && !(name === "m2Delivery" && hasM2Authorization(status))
        && !(name === "rn15Delivery" && hasRn15Authorization(status))
        && !(name === "rn14Editability" && hasRn14Authorization(status))
        && !(name === "rn13AssetIndex" && hasRn13Authorization(status))
        && !(name === "bmBRn10" && hasBmBRn10Authorization(status))
        && !(name === "dialogRefinement" && hasDialogRefinementAuthorization(status))
        && !(name === "bmARn09" && hasBmARn09Authorization(status))
        && !(name === "tableRn08" && hasTableRn08Authorization(status))
        && !(name === "layoutsV1" && hasLayoutsV1Authorization(status))
        && !(name === "dialogV2" && hasDialogV2Authorization(status))
        && !(name === "cardV2" && hasCardV2Authorization(status))
        && !(name === "dropdownFamily" && hasDropdownFamilyAuthorization(status))
        && !(name === "tabs" && hasTabsRefinementAuthorization(status))
        && !(name === "selectionPlaygroundSc04" && hasSelectionPlaygroundSc04Authorization(status))
        && !(name === "selectionPatternsSc03" && hasSelectionPatternsSc03Authorization(status))
        && !(name === "selectionCardsSc02" && hasSelectionCardsSc02Authorization(status))
        && !(name === "radioSc01" && hasRadioSc01Authorization(status))
        && !(name === "switchSc01" && hasSwitchSc01Authorization(status))
        && !(name === "checkboxSc01" && hasCheckboxSc01Authorization(status))
        && !(name === "select" && hasSelectRefinementAuthorization(status))
        && !(name === "tag" && hasTagRefinementAuthorization(status))
        && !(name === "tagBatchTwo" && hasTagBatchTwoRefinementAuthorization(status))
        && !(name === "tagBatchThree" && hasTagBatchThreeAuthorization(status))
        && !(name === "input" && hasInputRefinementAuthorization(status))
        && !(name === "iconButton" && hasIconButtonRefinementAuthorization(status))
        && !(name === "questionNumber" && hasQuestionNumberRefinementAuthorization(status))
        && !(name === "optionButton" && hasOptionButtonRefinementAuthorization(status))
        && !(name === "questionOptionSizes" && hasQuestionOptionSizeRefinementAuthorization(status)))
        .map(([name, record]) => [name, name === "textButton" && exactRecord(record, {
          ...history.componentRefinements.textButton, humanGate: "accepted", humanGateDecision: textButtonVisualAcceptance,
        }) ? history.componentRefinements.textButton : record]))
      : status[key];
    if (JSON.stringify(current) !== JSON.stringify(history[key])) fail();
  }
  validateTailwindB2Phase(history);
  return history;
}

export function getCurrentB2Status(status) {
  return status?.currentPhase?.id === "token-foundations-v1" ? getValidatedTailwindB2History(status) : status;
}

export const buttonTextContrastException = Object.freeze({
  id: "danger-primary-label",
  decisionSource: "explicit-user-acceptance-danger-primary-text-contrast",
  userStatement: "不满足文字对比度也没事。我认为能看清。normal使用fill-red-solid-2，hover时底色加深",
  variant: "primary", tone: "danger", part: "label", foreground: "OnColor/1",
  defaultFill: "Fill/Red/Solid/2",
  feedbackFills: { light: "Fill/Red/Solid/1", dark: "Fill/Red/Solid/2" },
  darkFeedbackAlpha: 85,
  loadingFills: { light: "Fill/Red/Solid/1", dark: "Fill/Red/Solid/2" },
  loadingSurfaceOpacity: 0.82,
  states: ["default", "hover", "pressed", "loading"],
  themes: ["light", "dark"],
  parentSurfaces: ["Background/Neutral/1", "Background/Neutral/3"],
  minimumContrast: 4.5,
  outcome: "report-actual-contrast-user-accepted",
});

export function validateTokenFoundationsV1Phase(status) {
  const fail = (reason) => { throw new Error(`Invalid Token Foundations V1 phase contract: ${reason}`); };
  const history = getValidatedTailwindB2History(status);
  const phase = status.currentPhase;
  const experiments = Object.keys(status.localExperiments ?? {});
  const allowedExperiments = [
    ...(hasQuestionOptionSizeReviewAuthorization(status) ? ["questionOptionSizeReview"] : []),
    ...(hasDropdownBatchOneAuthorization(status) ? ["dropdownBatchOne"] : []),
  ];
  if (JSON.stringify(experiments.sort()) !== JSON.stringify(allowedExperiments.sort())) fail("unapproved local experiment");
  const recordedNavigationScopes = {
    navigationComponentsV042: "4e39d5b5bf2ebe6d4d39515b8f8f730cc9e308ba7c45dcdf95edde0c14e83247",
    navigationComponentsV042Continuation: "93380b695e0c9f5df744626b8615e0be17c1132e79176f061555c4eebbcfd03b",
  };
  for (const [key, hash] of Object.entries(recordedNavigationScopes)) {
    if (status[key] && createHash("sha256").update(JSON.stringify(status[key])).digest("hex") !== hash) fail(`navigation scope ${key}`);
  }
  const navigation = status.navigationComponentsV042W6W8;
  const acceptedNavigationKeys = ["authorization", "authorizedAt", "decisionSource", "userStatement", "workMode", "priorAcceptedBaseline", "scope", "plan", "humanGateG3", "publication", "gitOperations", "figmaWrite", "currentHumanReview01", "currentHumanReview02", "currentVisualAcceptanceRecord", "currentReviewDecision", "contrastReadabilityHumanReview", "nextAuthorizedWork"];
  const navigationKeysAllowed = [...acceptedNavigationKeys, "currentBatch", "implementation", "protectedSnapshot", "scopedVerification", "globalQuality", "contrast", "voiceOver", "actualSafari", "handoffSnapshot", "handoff", "staticPreview", "finalSourceFreeze", "independentArchiveVerification", "finalReport", "currentW7Closeout"];
  if (navigation && (Object.keys(navigation).some(key => !navigationKeysAllowed.includes(key))
    || createHash("sha256").update(JSON.stringify(Object.fromEntries(acceptedNavigationKeys.map(key => [key, navigation[key]])))).digest("hex") !== "826ffd07b94f07e874fb1326a2301b3e4eecde98f54259b96f69628cce442212")) fail("navigation W6-W8 scope or permissions");
  const navigationKeys = [...Object.keys(recordedNavigationScopes), "navigationComponentsV042W6W8"].filter(key => Object.hasOwn(status, key));
  const expectedKeys = [...Object.keys(history), ...(status.tokenRefinements ? ["tokenRefinements"] : []), ...(allowedExperiments.length ? ["localExperiments"] : []), ...navigationKeys];
  if (JSON.stringify(Object.keys(status).sort()) !== JSON.stringify(expectedKeys.sort())) fail("unknown status fields");
  if (status.tokenRefinements) {
    const discovery = status.tokenRefinements.tagColorDiscovery;
    const discoveryComplete = ["completed", "completed-local-adaptation-and-visual-refinement"].includes(discovery?.implementation);
    if (discovery && (!["in-progress", "completed", "completed-local-adaptation-and-visual-refinement"].includes(discovery.implementation)
      || !["not-run", "failed", "passed"].includes(discovery.automatedVerification)
      || !["not-run", "findings", "passed"].includes(discovery.independentReview)
      || !["not-evaluated", "awaiting_human", "accepted"].includes(discovery.humanGate)
      || (discoveryComplete && (discovery.automatedVerification !== "passed" || discovery.independentReview !== "passed"))
      || (["awaiting_human", "accepted"].includes(discovery.humanGate) && !discoveryComplete)
      || !exactRecord(discovery, {
        authorization: "authorized", authorizedAt: "2026-09-09",
        decisionSource: "explicit-user-confirmation-tag-color-discovery-scope", userStatement: "确认范围",
        scope: "existing-tag-color-discovery-ai-entry-and-use-validation",
        plan: "../docs/plans/2026-09-09-tag-color-discovery-implementation.md",
        evidence: "../evidence/runtime/tag-color-discovery/verification.md",
        implementation: discovery.implementation, automatedVerification: discovery.automatedVerification,
        independentReview: discovery.independentReview, humanGate: discovery.humanGate, contrastAcceptance: "not-granted",
        ...(discovery.humanGate === "accepted" ? {
          humanGateDecision: {
            acceptedAt: "2026-09-09", decisionSource: "explicit-user-confirmation", userStatement: "确定。",
            scope: "tag-color-directory-search-and-pairing-experience-only",
            evidence: "../evidence/runtime/tag-color-discovery/verification.md",
          },
        } : {}),
        doesNotAuthorize: ["color-identity-value-or-component-visual-changes", "tag-batch-three-or-new-public-component-and-recipe-families", "relaxed-color-use-contract-or-contrast-exceptions", "new-dependencies-figma-publication-business-migration-or-git"],
      }))) fail("Tag color discovery scope or lifecycle");
    const buttonMigration = status.tokenRefinements.buttonTokenMigration;
    if (buttonMigration && (!["in-progress", "completed"].includes(buttonMigration.implementation)
      || !["not-run", "failed", "passed"].includes(buttonMigration.automatedVerification)
      || !["not-run", "findings", "passed"].includes(buttonMigration.independentReview)
      || !["awaiting_human", "accepted"].includes(buttonMigration.humanGate)
      || (buttonMigration.humanGate === "accepted" && buttonMigration.implementation !== "completed")
      || (buttonMigration.focusMigration?.humanGate === "accepted" && buttonMigration.implementation !== "completed")
      || (buttonMigration.implementation === "completed" && (buttonMigration.automatedVerification !== "passed" || buttonMigration.independentReview !== "passed"))
      || !exactRecord(buttonMigration, {
        authorization: "authorized", authorizedAt: "2026-09-06",
        decisionSource: "explicit-user-request-continue-button-token-migration",
        scope: "button-and-text-button-token-recipes",
        design: "../docs/plans/2026-09-05-size-density-first-recipes.md",
        implementation: buttonMigration.implementation, automatedVerification: buttonMigration.automatedVerification,
        independentReview: buttonMigration.independentReview, humanGate: buttonMigration.humanGate,
        ...(buttonMigration.humanGate === "accepted" ? {
          humanGateDecision: {
            acceptedAt: "2026-09-08", decisionSource: "explicit-user-confirmation",
            userStatement: "普通 Button：最新 Token 配方的整体验确认\nTextButton：最新配方的视觉验收确认",
            scope: "button-and-text-button-current-token-recipes-visual-only",
            evidence: "../docs/plans/2026-09-05-size-density-first-recipes.md",
          },
        } : {}),
        unresolved: [],
        focusMigration: {
          authorization: "authorized", authorizedAt: "2026-09-07",
          decisionSource: "explicit-user-request-global-two-layer-focus",
          scope: "all-keyboard-focusable-library-components",
          ...(buttonMigration.focusMigration?.humanGate ? {
            humanGate: "accepted",
            humanGateDecision: {
              acceptedAt: "2026-09-07", decisionSource: "explicit-user-confirmation",
              userStatement: "确定。", scope: "global-two-layer-focus-only",
            },
          } : {}),
          outline: "Border/Brand/1", halo: "Fill/Brand/Alpha/3",
          outlineWidth: "1px", outlineOffset: "0px", haloWidth: "3px",
          buttonOuterShadowWidths: { primary: "4px", secondaryAndTertiary: "3px", text: "3px" },
          forcedColors: { outline: "2px solid CanvasText", outlineOffset: "2px", boxShadow: "none" },
          doesNotAuthorize: ["non-focus-component-states", "new-public-color-values", "figma-publication-business-migration-or-git"],
        },
        contrastException: buttonTextContrastException,
        doesNotAuthorize: ["new-public-color-values", "global-size-density-remapping", "figma-publication-business-migration-or-git"],
      }))) fail("Button Token migration scope or lifecycle");
    const alignment = status.tokenRefinements.foundationsAlignment;
    if (alignment && (!["in-progress", "completed"].includes(alignment.implementation)
      || !["not-run", "failed", "passed"].includes(alignment.automatedVerification)
      || !["not-run", "findings", "passed"].includes(alignment.independentReview)
      || (alignment.implementation === "completed" && (alignment.automatedVerification !== "passed" || alignment.independentReview !== "passed"))
      || !exactRecord(alignment, {
        authorization: "authorized", authorizedAt: "2026-09-06",
        decisionSource: "explicit-user-confirmation-foundations-entry-and-token-alignment",
        scope: "equal-value-aliases-and-foundations-entry",
        design: "../docs/plans/2026-09-06-foundations-alignment.md",
        implementation: alignment.implementation, automatedVerification: alignment.automatedVerification,
        independentReview: alignment.independentReview, humanGate: "awaiting_human", colorMigration: "proposal-only",
        doesNotAuthorize: ["changed-visual-values-or-component-color-migration", "figma-publication-business-migration-or-git"],
      }))) fail("Foundations alignment scope or lifecycle");
    const pageVisualAcceptance = status.tokenRefinements.foundationsPageVisualAcceptance;
    if (pageVisualAcceptance && (phase.progress !== "token-foundations-v1-batch-0-1-completed"
      || status.independentLifecycle?.automatedVerification !== "passed"
      || alignment?.implementation !== "completed" || alignment?.automatedVerification !== "passed" || alignment?.independentReview !== "passed"
      || !exactRecord(pageVisualAcceptance, {
        humanGate: "accepted",
        humanGateDecision: {
          acceptedAt: "2026-09-12", decisionSource: "explicit-user-confirmation", userStatement: "基础页通过； 综合页通过",
          scope: "foundations-entry-typography-line-radius-spacing-runtime-visual-only",
          evidence: "../evidence/runtime/token-foundations-v1/verification.md",
        },
        doesNotAuthorize: ["color-or-contrast-acceptance", "component-token-mappings-or-global-size-density", "other-machine-font-or-real-device-checks", "other-human-gates", "figma-publication-business-migration-or-git"],
      }))) fail("Foundations page visual acceptance");
    const colorAlignment = status.tokenRefinements.foundationsColorAlignment;
    if (colorAlignment && (!["in-progress", "completed"].includes(colorAlignment.implementation)
      || !["not-run", "failed", "passed"].includes(colorAlignment.automatedVerification)
      || !["not-run", "findings", "passed"].includes(colorAlignment.independentReview)
      || (colorAlignment.implementation === "completed" && (colorAlignment.automatedVerification !== "passed" || colorAlignment.independentReview !== "passed"))
      || !exactRecord(colorAlignment, {
        authorization: "authorized", authorizedAt: "2026-09-06",
        decisionSource: "explicit-user-correction-foundations-color-mapping",
        scope: "confirmed-semantic-color-aliases-and-role-splits",
        design: "../docs/plans/2026-09-06-foundations-color-alignment.md",
        implementation: colorAlignment.implementation, automatedVerification: colorAlignment.automatedVerification,
        independentReview: colorAlignment.independentReview, humanGate: "awaiting_human",
        accessibility: "open-placeholder-and-consumer-eligibility",
        doesNotAuthorize: ["unconfirmed-color-mappings-or-new-color-values", "full-component-dark-migration", "figma-publication-business-migration-or-git"],
      }))) fail("Foundations color alignment scope or lifecycle");
    const refinement = status.tokenRefinements.colorFamilySupplement;
    const dark = status.tokenRefinements.colorDarkTheme;
    const humanGateDecision = {
      acceptedAt: "2026-09-06",
      decisionSource: "explicit-user-confirmation",
      userStatement: "这些颜色token的视觉已没问题。接下来应该做什么？",
      scope: "color-token-visual-only",
      evidence: "../evidence/runtime/color-dark-theme/verification.md",
    };
    for (const record of [refinement, dark].filter(Boolean)) {
      if (!["awaiting_human", "accepted"].includes(record.humanGate)
        || (record.humanGate === "accepted" && record.implementation !== "completed")) fail("color visual acceptance");
    }
    if (!exactRecord(status.tokenRefinements, {colorFamilySupplement: refinement, ...(discovery ? {tagColorDiscovery: discovery} : {}), ...(dark ? {colorDarkTheme: dark} : {}), ...(alignment ? {foundationsAlignment: alignment} : {}), ...(pageVisualAcceptance ? {foundationsPageVisualAcceptance: pageVisualAcceptance} : {}), ...(colorAlignment ? {foundationsColorAlignment: colorAlignment} : {}), ...(buttonMigration ? {buttonTokenMigration: buttonMigration} : {})}) || !refinement
      || !["in-progress", "completed"].includes(refinement.implementation)
      || !["not-run", "failed", "passed"].includes(refinement.automatedVerification)
      || !["not-run", "findings", "passed"].includes(refinement.independentReview)
      || (refinement.implementation === "completed" && (refinement.automatedVerification !== "passed" || refinement.independentReview !== "passed"))
      || !exactRecord(refinement, {
        authorization: "authorized", authorizedAt: "2026-09-06",
        decisionSource: "explicit-user-confirmation-and-continue-after-supplement-plan",
        scope: "48-light-color-records-pairing-validation-and-playground",
        design: "../docs/plans/2026-09-06-color-family-supplement-design.md",
        implementation: refinement.implementation, automatedVerification: refinement.automatedVerification,
        independentReview: refinement.independentReview, humanGate: refinement.humanGate,
        ...(refinement.humanGate === "accepted" ? {humanGateDecision} : {}),
        doesNotAuthorize: ["existing-component-color-migration", "new-color-values-or-dark-theme", "figma-publication-business-migration-or-git"],
      })) fail("color supplement scope or lifecycle");
    if (dark && (!["in-progress", "completed"].includes(dark.implementation)
      || !["not-run", "failed", "passed"].includes(dark.automatedVerification)
      || !["not-run", "findings", "passed"].includes(dark.independentReview)
      || (dark.implementation === "completed" && (dark.automatedVerification !== "passed" || dark.independentReview !== "passed"))
      || !exactRecord(dark, {
        authorization: "authorized", authorizedAt: "2026-09-06",
        decisionSource: "explicit-user-authorization-dark-token-library-and-playground",
        scope: "105-dark-color-values-theme-output-and-playground",
        design: "../docs/plans/2026-09-06-color-dark-theme.md",
        implementation: dark.implementation, automatedVerification: dark.automatedVerification,
        independentReview: dark.independentReview, humanGate: dark.humanGate,
        ...(dark.humanGate === "accepted" ? {humanGateDecision} : {}),
        doesNotAuthorize: ["existing-component-semantic-migration", "new-or-adjusted-color-values", "figma-publication-business-migration-or-git"],
      }))) fail("Dark color scope or lifecycle");
  }
  if (!exactRecord(status.metadata, {
    project: "rain-classroom-vibe-ui-spike", updatedAt: "2026-09-05",
    decisionSource: "explicit-user-authorization-token-foundations-v1-batch-0-1",
  }) || !exactRecord(phase, {
    id: "token-foundations-v1", label: "Token Foundations V1 第 0/1 批", status: "authorized",
    workMode: "system-mode-token-foundations",
    objective: "增量建设已确认的颜色登记、字体、线条、圆角与间距基础，保留既有运行视觉和独立验收。",
    authorizationScope: "token-foundations-v1-batch-0-1", progress: phase.progress,
  })) fail("authorization");
  if (JSON.stringify(status.allowedActions) !== JSON.stringify(tokenFoundationsV1AllowedActions)
    || JSON.stringify(status.blockedActions) !== JSON.stringify(tokenFoundationsV1BlockedActions)) fail("action allowlist");
  if (JSON.stringify(status.checkpoints) !== JSON.stringify([...history.checkpoints, tokenFoundationsV1Checkpoint])) fail("checkpoint");
  if (!exactRecord(status.independentLifecycle, getExpectedTokenFoundationsV1Lifecycle(phase.progress, status.independentLifecycle?.automatedVerification))) fail("lifecycle");
}

export function getValidatedDayThreeHistory(status) {
  const expectedPhase = {
    id: "foundation-spike-day-3", label: "Foundation Spike Day 3", status: "authorized",
    workMode: "system-mode-ui",
    objective: "实现 Button、Input、Tag/Badge 与 Surface/Card 四个基础 UI 家族，并补齐可运行说明与真实浏览器证据。",
    authorizationScope: "day-3-task-4-core-ui-families", progress: "task-4-core-ui-completed",
  };
  const history = status?.phaseHistory?.foundationSpikeDay3;
  if (status?.currentPhase?.id !== "tailwind-b2-composition-contract"
    || !exactRecord(status.phaseHistory, { foundationSpikeDay3: history })
    || !exactRecord(history, { currentPhase: history?.currentPhase, independentLifecycle: history?.independentLifecycle })
    || !exactRecord(history.currentPhase, expectedPhase)
    || !exactRecord(history.independentLifecycle, getExpectedDayThreeLifecycle("task-4-core-ui-completed", "passed"))) {
    throw new Error("Invalid B2 Day 3 history: an exact completed and verified parent snapshot is required");
  }
  return history;
}

export function validateTailwindB2Phase(status) {
  const fail = (reason) => { throw new Error(`Invalid B2 phase contract: ${reason}`); };
  getValidatedDayThreeHistory(status);
  const phase = status.currentPhase;
  if (phase.status !== "authorized" || phase.workMode !== "system-mode-tailwind-b2"
    || phase.authorizationScope !== "input-button-search-operation-pilot"
    || typeof phase.label !== "string" || phase.label.trim().length === 0
    || typeof phase.objective !== "string" || phase.objective.trim().length === 0
    || Object.keys(phase).sort().join(",") !== "authorizationScope,id,label,objective,progress,status,workMode"
    || status.metadata?.decisionSource !== "explicit-user-authorization-tailwind-b2-composition-contract") fail("authorization");
  if (JSON.stringify(status.allowedActions) !== JSON.stringify(tailwindB2AllowedActions)
    || JSON.stringify(status.blockedActions) !== JSON.stringify(tailwindB2BlockedActions)) fail("action allowlist");
  const refinements = status.componentRefinements;
  for (const [record, humanGate] of [
    [refinements?.iconLibrary, "accepted"],
    [refinements?.iconLibrary?.sourceRepair, "accepted"],
    [refinements?.textButton, "awaiting_human"],
  ]) {
    if (record?.implementation !== "completed" || record?.automatedVerification !== "passed"
      || record?.humanGate !== humanGate) fail("preserved component refinements");
  }
  if (!exactRecord(status.independentLifecycle,
    getExpectedTailwindB2Lifecycle(phase.progress, status.independentLifecycle?.automatedVerification))) fail("lifecycle");
  if (JSON.stringify(status.checkpoints?.map(({ id }) => id)) !== JSON.stringify([
    "day-1-runtime-start", "day-2-foundations-start", "day-3-core-ui-start", "tailwind-b2-composition-contract",
  ]) || !tailwindB2PriorCheckpoints.every((checkpoint, index) => exactRecord(status.checkpoints?.[index], checkpoint))
    || !exactRecord(status.checkpoints?.[3], tailwindB2Checkpoint)) fail("checkpoint");
}

export function getTextButtonRefinementFiles(refinements, parentProgress) {
  const empty = {
    application: [], ui: [], workspace: [], evidence: [], required: [], requireComplete: false,
  };
  if (refinements === undefined) return empty;
  const fail = () => {
    throw new Error("Invalid TextButton refinement authorization or lifecycle");
  };
  if (
    parentProgress !== "task-4-core-ui-completed" ||
    !refinements ||
    !Object.hasOwn(refinements, "textButton") ||
    Object.keys(refinements).some((key) => !["textButton", "iconLibrary"].includes(key))
  ) fail();
  const iconsReplacePrivateFixture = Object.hasOwn(refinements, "iconLibrary")
    && getIconLibraryRefinementFiles(refinements, parentProgress).requireComplete;

  const record = refinements.textButton;
  if (!record || typeof record !== "object" || Array.isArray(record)) fail();
  const complete = record.implementation === "completed";
  const inProgress = record.implementation === "in-progress";
  if (
    (!complete && !inProgress) ||
    (complete && (record.automatedVerification !== "passed" || !["awaiting_human", "accepted"].includes(record.humanGate))) ||
    (inProgress && (!['not-run', 'failed', 'passed'].includes(record.automatedVerification) || record.humanGate !== "not-evaluated"))
  ) fail();

  const expected = {
    authorization: "authorized",
    authorizedAt: "2026-09-03",
    decisionSource: "explicit-user-request-for-text-button-implementation",
    scope: "button-text-variant-link-recipe-and-interactive-review-page",
    design: "../docs/plans/2026-09-03-text-button-design.md",
    plan: "../docs/plans/2026-09-03-text-button-implementation.md",
    designConfirmation: "accepted",
    implementation: record.implementation,
    automatedVerification: record.automatedVerification,
    humanGate: record.humanGate,
    ...(record.humanGate === "accepted" ? { humanGateDecision: textButtonVisualAcceptance } : {}),
    doesNotAuthorize: [
      "other-component-redesigns",
      "current-phase-advance",
      "new-dependencies-or-headless-selection",
      "figma-write-or-publication",
      "package-or-registry-publication",
      "business-migration",
      "local-or-remote-git",
    ],
  };
  if (
    Object.keys(record).length !== Object.keys(expected).length ||
    Object.entries(expected).some(([key, value]) => JSON.stringify(record[key]) !== JSON.stringify(value))
  ) fail();

  const files = {
    application: [
      "apps/playground/src/docs/components/text-button-page.tsx",
      "apps/playground/src/docs/components/text-button-page.css",
      "apps/playground/src/docs/components/text-button-page.test.tsx",
      ...(!iconsReplacePrivateFixture ? ["apps/playground/src/docs/components/text-button-icons.tsx"] : []),
    ],
    ui: [
      "packages/ui/src/button/button-text.test.tsx",
      "packages/ui/src/link/link.tsx",
      "packages/ui/src/link/link.test.tsx",
    ],
    workspace: ["tests/e2e/text-button.spec.ts"],
    evidence: [
      "evidence/runtime/day-3/text-button-desktop.png",
      "evidence/runtime/day-3/text-button-mobile.png",
    ],
    requireComplete: complete,
  };
  return {
    ...files,
    required: complete ? [
      ...files.application, ...files.ui, ...files.workspace, ...files.evidence,
      "docs/verification/2026-09-03-text-button-implementation.md",
    ] : [],
  };
}

export function getIconLibraryRefinementFiles(refinements, parentProgress, inventory, questionNumberAuthorized = false) {
  const empty = {
    authorized: false, application: [], ui: [], foundations: [], workspace: [],
    evidence: [], documents: [], sourceExports: [], referencedEvidence: [], generated: [],
    required: [], requireComplete: false, uiExports: {}, foundationsExports: {},
  };
  if (refinements === undefined) return empty;
  const fail = () => { throw new Error("Invalid Icon library refinement authorization or lifecycle"); };
  if (!refinements || typeof refinements !== "object" || Array.isArray(refinements)
    || Object.keys(refinements).some((key) => !["textButton", "iconLibrary"].includes(key))) fail();
  if (!Object.hasOwn(refinements, "iconLibrary")) return empty;
  if (parentProgress !== "task-4-core-ui-completed") fail();
  const record = refinements.iconLibrary;
  if (!record || typeof record !== "object" || Array.isArray(record)) fail();
  const complete = record.implementation === "completed";
  if ((!complete && record.implementation !== "in-progress")
    || (complete && (record.automatedVerification !== "passed" || !["awaiting_human", "accepted"].includes(record.humanGate)))
    || (!complete && (!['not-run', 'failed', 'passed'].includes(record.automatedVerification)
      || record.humanGate !== "not-evaluated"))) fail();
  const hasSourceRepair = Object.hasOwn(record, "sourceRepair");
  let expectedSourceRepair;
  let sourceRepairComplete = false;
  if (hasSourceRepair) {
    const repair = record.sourceRepair;
    if (record.humanGate !== "accepted" || !repair || typeof repair !== "object" || Array.isArray(repair)) fail();
    sourceRepairComplete = repair.implementation === "completed";
    if ((!sourceRepairComplete && repair.implementation !== "in-progress")
      || (sourceRepairComplete && (repair.automatedVerification !== "passed"
        || !["awaiting_human", "accepted"].includes(repair.humanGate)))
      || (!sourceRepairComplete && (!["not-run", "failed", "passed"].includes(repair.automatedVerification)
        || repair.humanGate !== "awaiting_human"))) fail();
    expectedSourceRepair = {
      authorization: "authorized",
      authorizedAt: "2026-09-03",
      decisionSource: "explicit-user-request-to-repair-two-source-icon-anomalies",
      userStatement: "修复两个源图形异常",
      scope: "two-source-icons-original-geometry-repair-and-local-reexport",
      source: {
        fileKey: "olqwu95QD6n4Y3IAwUdgF4",
        nodes: [
          { assetId: "icon/editor-redo", nodeId: "84:35" },
          { assetId: "icon/editor-undo", nodeId: "84:32" },
        ],
      },
      allowedActions: [
        "restore-original-geometry-only-at-listed-source-nodes",
        "reexport-two-icons-and-update-local-runtime-and-evidence",
      ],
      evidence: "../evidence/icons/source-repairs.json",
      visualEvidence: "../evidence/runtime/icon-migration/source-repair.png",
      implementation: repair.implementation,
      automatedVerification: repair.automatedVerification,
      humanGate: repair.humanGate,
      ...(repair.humanGate === "accepted" ? {
        humanGateDecision: {
          acceptedAt: "2026-09-03",
          decisionSource: "explicit-user-confirmation",
          userStatement: "确定",
          scope: "two-source-icons-visual-only",
          evidence: "../evidence/runtime/icon-migration/verification.md",
        },
      } : {}),
      doesNotAuthorize: [
        "other-figma-node-writes", "figma-component-or-variant-publication",
        "other-component-redesigns", "current-phase-advance",
        "new-dependencies-or-headless-selection", "package-or-registry-publication",
        "business-migration", "local-or-remote-git",
      ],
    };
    if (Object.keys(repair).length !== Object.keys(expectedSourceRepair).length
      || Object.entries(expectedSourceRepair).some(([key, value]) => JSON.stringify(repair[key]) !== JSON.stringify(value))) fail();
  }
  const expected = {
    authorization: "authorized",
    authorizedAt: "2026-09-03",
    decisionSource: "explicit-user-request-to-enter-icon-library-implementation",
    scope: "full-figma-icon-library-runtime-and-ai-consumption",
    plan: "../docs/plans/2026-09-03-icon-library-migration.md",
    preflight: "../docs/audits/2026-09-03-icon-migration-preflight.md",
    baseline: "../evidence/runtime/icon-migration/baseline.json",
    source: { fileKey: "olqwu95QD6n4Y3IAwUdgF4", pageId: "1:3" },
    implementation: record.implementation,
    automatedVerification: record.automatedVerification,
    humanGate: record.humanGate,
    ...(record.humanGate === "accepted" ? {
      humanGateDecision: {
        acceptedAt: "2026-09-03",
        decisionSource: "explicit-user-confirmation",
        userStatement: "视觉验收完成",
        scope: "icon-library-visual-only",
        evidence: "../evidence/runtime/icon-migration/verification.md",
      },
    } : {}),
    ...(hasSourceRepair ? { sourceRepair: record.sourceRepair } : {}),
    doesNotAuthorize: [
      "other-component-redesigns", "current-phase-advance",
      "new-dependencies-or-headless-selection", "figma-write-or-publication",
      "package-or-registry-publication", "business-migration", "local-or-remote-git",
    ],
  };
  if (Object.keys(record).length !== Object.keys(expected).length
    || Object.entries(expected).some(([key, value]) => JSON.stringify(record[key]) !== JSON.stringify(value))) fail();
  const entries = inventory === undefined ? [] : validateIconLibraryInventory(inventory, questionNumberAuthorized);
  const generated = entries.filter((icon) => icon.availability === "available");
  const sourceExports = entries.flatMap((icon) => [icon.sourceExport?.path, icon.rasterExport?.path].filter(Boolean));
  const sourceRepairEvidence = hasSourceRepair ? [
    "evidence/icons/source-repairs.json",
    "evidence/runtime/icon-migration/source-repair.png",
  ] : [];
  const sourceRepairWorkspace = hasSourceRepair ? ["tests/e2e/icon-source-repair.spec.ts"] : [];
  const pendingSourceRepairFiles = sourceRepairComplete ? [] : [...sourceRepairEvidence, ...sourceRepairWorkspace];
  const files = {
    authorized: true,
    application: [
      "apps/playground/src/docs/icons-page.tsx",
      "apps/playground/src/docs/icons-page.css",
      "apps/playground/src/docs/icons-page.test.tsx",
    ],
    ui: [
      "packages/ui/src/icon/icon.tsx", "packages/ui/src/icon/icon.test.tsx",
      "packages/ui/src/icons/catalog.generated.ts",
      ...generated.flatMap((icon) => [icon.runtime.modulePath, icon.runtime.assetPath]),
    ],
    foundations: [
      "packages/foundations/src/icons/icon-contract.ts",
      "packages/foundations/src/icons/semantic-rules.json",
      "packages/foundations/src/icons/semantic-rules.generated.ts",
      "packages/foundations/src/icons/catalog.generated.ts",
      "packages/foundations/src/icons/semantic-rules.test.ts",
    ],
    workspace: [
      "scripts/generate-icons.mjs", "scripts/generate-icons.test.ts",
      "scripts/generate-icon-semantics.mjs", "scripts/generate-icon-semantics.test.ts",
      "scripts/verify-icons.mjs", "scripts/verify-icons.test.ts", "tests/e2e/icons.spec.ts",
      "tests/e2e/icon-rendering.spec.ts",
      ...sourceRepairWorkspace,
    ],
    evidence: [
      "evidence/icons/source-lock.yaml", "evidence/icons/inventory.json", "evidence/icons/README.md",
      "evidence/icons/source-nodes.json", "evidence/icons/color-decisions.json", "evidence/icons/source-failures.json",
      ...(questionNumberAuthorized ? ["evidence/icons/source-additions.json"] : []),
      "evidence/runtime/icon-migration/baseline.json",
      "evidence/runtime/icon-migration/verification.md",
      "evidence/runtime/icon-migration/vibe-coding-cases.md",
      "evidence/runtime/icon-migration/visual-references.json",
      "evidence/runtime/icon-migration/consumer-bundle.json",
      "evidence/runtime/icon-migration/gallery.png",
      "evidence/runtime/icon-migration/semantic-examples.png",
      "evidence/runtime/icon-migration/source-failures.png",
      "evidence/runtime/icon-migration/color-review.png",
      "evidence/runtime/icon-migration/vibe-consumer.tsx",
      "evidence/runtime/icon-migration/vibe-consumer.png",
      "evidence/runtime/icon-migration/baseline-comparison.json",
      ...sourceRepairEvidence,
    ],
    documents: [
      "docs/ai/icon-selection.md", "manifests/icons.json", "registry/icons.json",
      "docs/adr/0001-icon-assets-and-semantic-consumption.md",
    ],
    sourceExports,
    referencedEvidence: [...new Set([
      ...sourceExports, ...entries.flatMap((icon) => icon.sourceFailure ? [icon.sourceFailure.evidencePath] : []),
    ])],
    generated, requireComplete: complete,
    uiExports: {
      "./icon": "./src/icon/icon.tsx",
      "./icons/catalog": "./src/icons/catalog.generated.ts",
      ...Object.fromEntries(generated.map((icon) => [`./icons/${icon.slug}`, `./src/icons/${icon.slug}.tsx`])),
    },
    foundationsExports: {
      "./icons/icon-contract": "./src/icons/icon-contract.ts",
      "./icons/semantic-rules": "./src/icons/semantic-rules.generated.ts",
      "./icons/catalog": "./src/icons/catalog.generated.ts",
    },
  };
  return { ...files, required: complete ? [
    ...files.application, ...files.ui, ...files.foundations, ...files.workspace,
    ...files.evidence, ...files.documents, ...files.sourceExports,
  ].filter((file) => !pendingSourceRepairFiles.includes(file)) : [] };
}

function validateIconLibraryInventory(inventory, questionNumberAuthorized = false) {
  const additions = questionNumberAuthorized && inventory?.sourceAdditions;
  const addedSources = { "grading-pending": ["2761:19670", "2761:19672"], "grading-reviewed": ["2761:19678", "2761:19680"] };
  const fail = (reason) => { throw new Error(`Icon inventory ${reason}`); };
  if (!inventory || inventory.schemaVersion !== "1.0"
    || inventory.source?.fileKey !== "olqwu95QD6n4Y3IAwUdgF4"
    || inventory.source?.pageId !== "1:3"
    || !Array.isArray(inventory.icons) || inventory.icons.length === 0
    || (additions && inventory.source.count !== 897)
    || inventory.source.count + (additions ? 2 : 0) !== inventory.icons.length) fail("source or count is invalid");
  if (additions && (!exactRecord(additions, { path: "evidence/icons/source-additions.json", sha256: additions.sha256, count: 2 })
    || !/^[a-f0-9]{64}$/.test(additions.sha256)
    || inventory.icons.filter((icon) => Object.hasOwn(addedSources, icon.slug)).length !== 2)) fail("source additions are invalid");
  const availableCount = inventory.icons.filter((icon) => icon?.availability === "available").length;
  if (inventory.availableCount !== availableCount
    || inventory.unavailableCount !== inventory.icons.length - availableCount) fail("availability counts are invalid");
  const identities = new Set();
  const slugs = new Set();
  const nodes = new Set();
  const components = new Set();
  const exports = new Set();
  for (const icon of inventory.icons) {
    const added = additions && Object.hasOwn(addedSources, icon?.slug ?? "");
    const nodesForAddition = addedSources[icon?.slug];
    if (added && (!exactRecord(icon.source, { fileKey: "MbWg1ft5zk1JRQiQ6dS30e", nodeId: nodesForAddition[0], foregroundNodeId: nodesForAddition[1], kind: "non-component" })
      || icon.nodeId !== nodesForAddition[0] || icon.componentKey !== null || icon.availability !== "available")) fail("supplemental source identity is invalid");
    if (!icon || icon.assetId !== `icon/${icon.slug}` || icon.name !== icon.assetId
      || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(icon.slug)
      || !/^\d+:\d+$/.test(icon.nodeId)
      || (!added && !/^[a-f0-9]{40}$/.test(icon.componentKey))
      || JSON.stringify(icon.canvas) !== (added ? "[12,12]" : "[24,24]")) fail("identity or canvas is invalid");
    if (identities.has(icon.assetId) || slugs.has(icon.slug) || nodes.has(icon.nodeId)
      || (icon.componentKey !== null && components.has(icon.componentKey))) fail("contains duplicate identities");
    identities.add(icon.assetId); slugs.add(icon.slug); nodes.add(icon.nodeId);
    if (icon.componentKey !== null) components.add(icon.componentKey);
    if (!["available", "source-unavailable"].includes(icon.availability)) fail("availability is invalid");
    if (icon.rasterExport != null && (
      icon.rasterExport.path !== `evidence/icons/source-exports/${icon.slug}.png`
      || !/^[a-f0-9]{64}$/.test(icon.rasterExport.sha256)
    )) fail("raster evidence path or hash is invalid");
    if (icon.availability === "source-unavailable") {
      if (icon.runtime != null || icon.sourceExport != null || icon.rendering != null || icon.viewBox != null) {
        fail("unavailable source must not expose runtime or SVG output");
      }
      if (icon.sourceFailure?.evidencePath !== "evidence/icons/source-failures.json"
        || typeof icon.sourceFailure.error !== "string" || icon.sourceFailure.error.trim().length === 0) {
        fail("unavailable source requires explicit failure evidence");
      }
      continue;
    }
    if (icon.sourceFailure != null || icon.viewBox !== (added ? "0 0 12 12" : "0 0 24 24")) fail("available source evidence or viewBox is invalid");
    if (exports.has(icon.runtime?.exportName)) fail("contains duplicate runtime exports");
    exports.add(icon.runtime?.exportName);
    const sourcePath = icon.sourceExport?.path;
    const assetPath = icon.runtime?.assetPath;
    const pascalName = icon.slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
    const exportName = /^\d/.test(pascalName) ? `Icon${pascalName}` : `${pascalName}Icon`;
    if (sourcePath !== (added ? `evidence/icons/source-additions/${icon.slug}.source.svg` : `evidence/icons/source-exports/${icon.slug}.svg`)
      || !/^[a-f0-9]{64}$/.test(icon.sourceExport?.sha256)
      || icon.runtime?.modulePath !== `packages/ui/src/icons/${icon.slug}.tsx`
      || !["svg", "png"].some((extension) => assetPath === `packages/ui/src/icons/assets/${icon.slug}.${extension}`)
      || icon.runtime?.exportName !== exportName) fail("file path or export is invalid");
    const isRasterRuntime = assetPath.endsWith(".png");
    if ((isRasterRuntime && icon.rasterExport == null)
      || icon.runtime.sourcePath !== (isRasterRuntime ? icon.rasterExport.path : sourcePath)) {
      fail("runtime must reference its registered source export");
    }
    if (!(["svg-mask", "png-mask"].includes(icon.rendering) && icon.colorMode === "host")
      && !(icon.rendering === "image" && icon.colorMode === "intrinsic")) fail("color or rendering mode is invalid");
    if ((icon.rendering === "svg-mask" && !assetPath.endsWith(".svg"))
      || (icon.rendering === "png-mask" && !assetPath.endsWith(".png"))) fail("rendering asset extension is invalid");
  }
  return inventory.icons;
}

export function hasRainUiModuleDependency(source) {
  // Keep quoted examples opaque: metadata describing a UI import is not an import.
  const tokens = source.match(/\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|`(?:\\[\s\S]|[^`\\])*`|[A-Za-z_$][\w$]*|[^\s]/g) ?? [];
  const code = tokens.filter((token) => !token.startsWith("//") && !token.startsWith("/*"));
  const isUiSpecifier = (token) => {
    if (!token || !["\"", "'", "`"].includes(token[0])) return false;
    const specifier = token.slice(1, -1)
      .replace(/\\u([0-9a-f]{4})|\\x([0-9a-f]{2})/gi, (_, unicode, hex) => String.fromCharCode(parseInt(unicode ?? hex, 16)))
      .replace(/\\([\\/'"])/g, "$1");
    return specifier === "@rain-next/ui" || specifier.startsWith("@rain-next/ui/");
  };
  return code.some((token, index) =>
    ((token === "from" || token === "import") && isUiSpecifier(code[index + 1]))
    || ((token === "import" || token === "require") && code[index + 1] === "(" && isUiSpecifier(code[index + 2])),
  );
}

export function usesPrivateReferenceColor(source) {
  if (typeof source !== "string") {
    throw new Error("source must be text");
  }
  const withoutComments = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\r\n]*/g, "");
  return /var\(\s*--rain-ref-[a-z0-9-]+\s*\)/i.test(withoutComments);
}

export function inspectPngMetadata(source) {
  if (!Buffer.isBuffer(source) || source.length < 33) {
    throw new Error("PNG evidence must contain a complete signature and IHDR chunk");
  }

  const expectedSignature = Buffer.from([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ]);
  if (!source.subarray(0, 8).equals(expectedSignature)) {
    throw new Error("PNG evidence has an invalid file signature");
  }
  if (
    source.readUInt32BE(8) !== 13 ||
    source.toString("ascii", 12, 16) !== "IHDR"
  ) {
    throw new Error("PNG evidence is missing the canonical IHDR chunk");
  }

  const width = source.readUInt32BE(16);
  const height = source.readUInt32BE(20);
  if (width < 1 || height < 1) {
    throw new Error("PNG evidence must declare positive IHDR dimensions");
  }

  return { height, width };
}

export function parsePnpmLockfileImporters(source) {
  if (typeof source !== "string") {
    throw new Error("pnpm lockfile source must be text");
  }

  const lines = source.replaceAll("\r\n", "\n").split("\n");
  const importerSectionIndexes = lines.flatMap((line, index) =>
    line === "importers:" ? [index] : [],
  );
  if (importerSectionIndexes.length !== 1) {
    throw new Error("pnpm lockfile must contain exactly one top-level importers section");
  }

  const importers = [];
  for (let index = importerSectionIndexes[0] + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.trim().length === 0) continue;
    if (!line.startsWith(" ")) break;
    if (!line.startsWith("  ") || line.startsWith("   ")) continue;

    const match = line.match(/^  (.+):\s*$/);
    if (!match) {
      throw new Error(`invalid top-level pnpm importer declaration: ${line}`);
    }

    let importer = match[1];
    if (
      (importer.startsWith('"') && importer.endsWith('"')) ||
      (importer.startsWith("'") && importer.endsWith("'"))
    ) {
      importer = importer.slice(1, -1);
    }
    importers.push(importer);
  }

  if (importers.length === 0) {
    throw new Error("pnpm lockfile importers section must not be empty");
  }
  return importers;
}

export const inputNumberFiles = {
  application: ["input-number-page.tsx", "input-number-page.css"].map(name => `apps/playground/src/docs/components/${name}`),
  ui: [".tsx", ".utils.ts", ".css", ".css.d.ts", ".test.tsx"].map(ext => `packages/ui/src/input-number/input-number${ext}`),
  documents: ["manifests/ui/input-number.yaml", "registry/input-number.json", "docs/adr/0010-input-number-native-editing.md"],
  workspace: ["tests/e2e/input-number.spec.ts", "scripts/input-number.test.ts", "scripts/input-number.mjs", "evidence/runtime/input-number/playwright.config.ts"],
};
export function hasInputNumberAuthorization(status) {
  const entry = status?.componentRefinements?.inputNumber;
  return Boolean(entry && ["in-progress", "completed"].includes(entry.implementation)
    && ["not-run", "failed", "passed"].includes(entry.automatedVerification)
    && ["not-run", "findings", "passed"].includes(entry.independentReview)
    && ["awaiting_human", "accepted"].includes(entry.humanGate)
    && exactRecord(entry, {
      authorization: "authorized", authorizedAt: "2026-09-16", decisionSource: "explicit-user-start-input-number", userStatement: "开始实施",
      scope: "input-number-native-editing-three-appearances-and-stepper", plan: "../docs/plans/2026-09-16-input-number.md", evidence: "../evidence/runtime/input-number/verification.md",
      ...(entry.compactControls ? { compactControls: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-retain-legacy-input-number",
        userStatement: "除了 + - 的这一版以外，我还是希望保留原组件库的数组输入框。（方便嵌入到各个场景）",
        scope: "classic-stacked-controls-and-embedded-examples",
      } } : {}),
      ...(entry.keyDataTypography ? { keyDataTypography: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-important-input-numbers",
        userStatement: "补充一点。有时数字输入框中输入的数字属于关键、重要数字。此时，数字应用字体token中用于强调的特殊数字字体，并始终粗字重。（字号不变）",
        scope: "input-number-key-data-font-bold-at-existing-size",
      } } : {}),
      ...(entry.compactSizing ? { compactSizing: {
        authorizedAt: "2026-09-16", decisionSource: "explicit-user-five-digit-width-and-32px-embedding",
        userStatement: "修正一下，默认为32",
        scope: "five-character-intrinsic-width-and-32px-embedding",
      } } : {}),
      implementation: entry.implementation, automatedVerification: entry.automatedVerification, independentReview: entry.independentReview,
      humanGate: entry.humanGate,
      ...(entry.humanGate === "accepted" ? { humanGateDecision: {
        acceptedAt: "2026-09-16", decisionSource: "explicit-user-confirmation", userStatement: "视觉确认",
        scope: "input-number-current-runtime-visual-only", evidence: "../evidence/runtime/input-number/verification.md",
        doesNotAuthorize: ["contrast-or-accessibility-acceptance", "other-component-human-gates", "figma-publication-business-migration-or-git"],
      } } : {}),
      contrastAcceptance: "not-granted", publication: "not-authorized",
    }));
}

export function readTaskFourFile(root, filePath, label, failures, { binary = false } = {}) {
  const absolutePath = join(root, filePath);
  try {
    const stat = lstatSync(absolutePath);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size === 0) {
      failures.push(`${label} must be a non-empty regular non-symbolic file: ${filePath}`);
      return null;
    }
    return readFileSync(absolutePath, binary ? undefined : "utf8");
  } catch (error) {
    failures.push(`${label} cannot be read: ${filePath}: ${error.message}`);
    return null;
  }
}


function restoreNavigationW7RegistryBaseline(source, root, status, failures) {
  const hash = value => createHash("sha256").update(value).digest("hex");
  if (hash(source) !== "71d3f204385bf2aa7f74bc61b4d0a03c0928e369cadb3d5b7bb2201284e2d7dd") return source;
  try { validateTokenFoundationsV1Phase(status); } catch { return source; }
  const files = [
    ["manifests/recipes/navigation-r2.yaml", "d4b10b46ffc4dbd923496b8770cff302ddd191091d8e241d535af4f84e3a5070"],
    ["apps/playground/src/recipes/navigation-v042/r2.css", "6c3145aa2efafcbe0f10414b9de69989d7e5aad09823b4b646c02715424d6ee1"],
  ];
  for (const [path, expected] of files) {
    const content = readTaskFourFile(root, path, "W7 recorded navigation successor", failures);
    if (!content || hash(content) !== expected) return source;
  }
  // Preserve the accepted inventory; only this exact metadata successor projects back to it.
  const record = JSON.parse(source);
  record.currentSourceSnapshot = record.priorW7AccountHoverSourceSnapshot;
  delete record.priorW7AccountHoverSourceSnapshot;
  delete record.currentW7Repair;
  const baseline = JSON.stringify(record, null, 2) + "\n";
  return hash(baseline) === "6c2596329a392d4d4a06f17613fb123f3ec1e32c35bff4ac15b839cb96f60535" ? baseline : source;
}

export function collectRecordedPostB2Documents(root, status, failures) {
  const navigation = status?.navigationComponentsV042?.humanGate === "accepted"
    && status?.navigationComponentsV042W6W8?.authorization === "authorized";
  // Recorded Registry bytes bind each finite inventory to its existing sources and dependencies.
  const snapshots = [
    [hasG123PlaygroundAssetizationAuthorization(status), "g1-assets", g123PlaygroundRegistrySnapshots.g1],
    [hasG123PlaygroundAssetizationAuthorization(status), "g2-assets", g123PlaygroundRegistrySnapshots.g2],
    [hasRecordedPostB2Refinement(status, "breadcrumbSingleSize"), "breadcrumb", "05f9c806af22dd1e1d7acad6cfdf04406fed76f66e8d8f63a37062a3e4c2207e"],
    [hasTreeAuthorization(status), "tree", "8e61a13126dc17fd8cb6d5ef1effb4eeb492ff4428fbf97c6d3128ec7cac7a62"],
    [hasSwitchSc01Authorization(status), "switch", "f0a7bc35ce8466490193664322e86809ea40e28dc6e19379f92f7cca0f3c68c4"],
    [hasRecordedPostB2Refinement(status, "tokenFirstV12G3"), "token-first-g3", "7ac9280e2373750ab3c632d1aca3c98cdbc2ecf2510186fdea0a2fcebbf4ed5e"],
    [navigation, "navigation-v042", "6c2596329a392d4d4a06f17613fb123f3ec1e32c35bff4ac15b839cb96f60535"],
    [navigation, "navigation-v042-w3", "a4870f9047a5b9154e5076e66da5e69e14ab69bcb1d038ef4695958547615af0"],
    [navigation, "navigation-v042-workspaces", "9ed631f4aeb1cfeebda0469cff2f290364af6c8793971eeeb7c88b4eab02bfad"],
    [navigation, "navigation-v042-recipes", "3954a81c2f761a5484ea8ea8fbe00b9fb33e0793243c39154ea93e6f7865603f"],
  ];
  const manifests = [], registries = [];
  for (const [authorized, name, expected] of snapshots) {
    if (!authorized) continue;
    const path = `registry/${name}.json`;
    let source = readTaskFourFile(root, path, "Task 5 recorded Registry", failures);
    if (!source) continue;
    if (name === "navigation-v042") source = restoreNavigationW7RegistryBaseline(source, root, status, failures);
    if (createHash("sha256").update(source).digest("hex") !== expected) {
      failures.push(`Task 5 recorded Registry must preserve its existing sources, dependencies and unpublished identity: ${path}`);
      continue;
    }
    registries.push(path);
    manifests.push(...JSON.parse(source).items.map(item => item.manifest));
  }
  if (hasG4ComponentsAuthorization(status)) {
    try {
      getG4SourceBindings(root, status);
      registries.push("registry/g4-assets.json");
      manifests.push(...g4ComponentFiles.documents.filter(file => file.startsWith("manifests/")));
    } catch (error) { failures.push(`G4 recorded sources cannot be checked: ${error.message}`); }
  }
  if (hasG5ComponentsAuthorization(status)) {
    try {
      getG5SourceBindings(root, status);
      registries.push("registry/g5-assets.json");
      manifests.push(...g5ComponentFiles.documents.filter(file => file.startsWith("manifests/")));
    } catch (error) { failures.push(`G5 recorded sources cannot be checked: ${error.message}`); }
  }
  return { manifests, registries };
}
