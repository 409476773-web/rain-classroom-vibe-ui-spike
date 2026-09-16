import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  statSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";

import {
  isDayOneForbiddenDependency,
  inspectPngMetadata,
  parsePnpmLockfileImporters,
  parseYamlSubset,
  usesPrivateReferenceColor,
} from "./verification-helpers.mjs";

const workspaceRoot = process.cwd();
const failures = [];

function collectFiles(directory) {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    return [];
  }

  const ignoredDirectories = new Set(
    [
      ".git",
      ".vite",
      "coverage",
      "dist",
      "node_modules",
      "playwright-report",
      "test-results",
      "apps/playground/dist",
      "apps/playground/node_modules",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);
    if (
      (entry.name === "node_modules" || ignoredDirectories.has(entryPath)) &&
      (entry.isDirectory() || entry.isSymbolicLink())
    ) {
      return [];
    }
    return entry.isDirectory() ? collectFiles(entryPath) : [entryPath];
  });
}

function discoverPackageFiles() {
  const packageFiles = ["package.json"];
  for (const workspaceDirectory of ["apps", "packages"]) {
    const directory = join(workspaceRoot, workspaceDirectory);
    if (!existsSync(directory)) {
      continue;
    }
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }
      const filePath = join(workspaceDirectory, entry.name, "package.json");
      if (existsSync(join(workspaceRoot, filePath))) {
        packageFiles.push(filePath);
      }
    }
  }
  return packageFiles.sort();
}

function loadPackage(filePath) {
  try {
    return JSON.parse(readFileSync(join(workspaceRoot, filePath), "utf8"));
  } catch (error) {
    failures.push(`${filePath} cannot be audited: ${error.message}`);
    return null;
  }
}

function loadPhaseStatus() {
  const filePath = join(workspaceRoot, "status/current-phase.yaml");
  try {
    return parseYamlSubset(readFileSync(filePath, "utf8"));
  } catch (error) {
    failures.push(`status/current-phase.yaml cannot be audited: ${error.message}`);
    return null;
  }
}

const phaseStatus = loadPhaseStatus();
const phaseId = phaseStatus?.currentPhase?.id;
const isDayOne = phaseId === "foundation-spike-day-1";
const isDayTwo = phaseId === "foundation-spike-day-2";
const isDayThree = phaseId === "foundation-spike-day-3";
const packageFiles = discoverPackageFiles();

function assertExact(label, actual, expected) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    failures.push(
      `${label} mismatch: expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`,
    );
  }
}

function parseImportSpecifiers(source) {
  const tokens = [];
  let cursor = 0;

  while (cursor < source.length) {
    const character = source[cursor];
    if (/\s/.test(character)) {
      cursor += 1;
      continue;
    }
    if (source.startsWith("//", cursor)) {
      const newline = source.indexOf("\n", cursor + 2);
      cursor = newline === -1 ? source.length : newline + 1;
      continue;
    }
    if (source.startsWith("/*", cursor)) {
      const commentEnd = source.indexOf("*/", cursor + 2);
      cursor = commentEnd === -1 ? source.length : commentEnd + 2;
      continue;
    }
    if (character === '"' || character === "'") {
      const quote = character;
      const start = cursor + 1;
      cursor += 1;
      let escaped = false;
      while (cursor < source.length) {
        const stringCharacter = source[cursor];
        if (!escaped && stringCharacter === quote) {
          break;
        }
        escaped = !escaped && stringCharacter === "\\";
        if (stringCharacter !== "\\") {
          escaped = false;
        }
        cursor += 1;
      }
      tokens.push({ type: "string", value: source.slice(start, cursor) });
      cursor += 1;
      continue;
    }
    if (character === "`") {
      cursor += 1;
      let escaped = false;
      while (cursor < source.length) {
        const templateCharacter = source[cursor];
        cursor += 1;
        if (!escaped && templateCharacter === "`") {
          break;
        }
        escaped = !escaped && templateCharacter === "\\";
        if (templateCharacter !== "\\") {
          escaped = false;
        }
      }
      continue;
    }
    if (/[A-Za-z_$]/.test(character)) {
      const start = cursor;
      cursor += 1;
      while (cursor < source.length && /[A-Za-z0-9_$]/.test(source[cursor])) {
        cursor += 1;
      }
      tokens.push({ type: "identifier", value: source.slice(start, cursor) });
      continue;
    }
    tokens.push({ type: "punctuation", value: character });
    cursor += 1;
  }

  const specifiers = [];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.type !== "identifier" || token.value !== "import") {
      if (token.type !== "identifier" || token.value !== "export") {
        continue;
      }
      for (let scan = index + 1; scan < tokens.length; scan += 1) {
        if (tokens[scan].value === ";") break;
        if (
          tokens[scan].type === "identifier" &&
          tokens[scan].value === "from" &&
          tokens[scan + 1]?.type === "string"
        ) {
          specifiers.push(tokens[scan + 1].value);
          break;
        }
      }
      continue;
    }

    if (tokens[index + 1]?.value === ".") {
      continue;
    }
    if (
      tokens[index + 1]?.value === "(" &&
      tokens[index + 2]?.type === "string"
    ) {
      specifiers.push(tokens[index + 2].value);
      continue;
    }
    for (let scan = index + 1; scan < tokens.length; scan += 1) {
      if (tokens[scan].value === ";") break;
      if (tokens[scan].type === "string") {
        specifiers.push(tokens[scan].value);
        break;
      }
    }
  }

  return specifiers;
}

function isPathAtOrInside(directoryPath, candidatePath) {
  const relativePath = relative(directoryPath, candidatePath);
  return (
    relativePath === "" ||
    (relativePath !== ".." &&
      !relativePath.startsWith(`..${sep}`) &&
      !isAbsolute(relativePath))
  );
}

function findUiReverseDependency(filePath, source) {
  const uiPackageRoot = join(workspaceRoot, "packages/ui");
  return parseImportSpecifiers(source).find((specifier) => {
    if (
      specifier === "@rain-next/ui" ||
      specifier.startsWith("@rain-next/ui/")
    ) {
      return true;
    }
    if (!specifier.startsWith(".")) {
      return false;
    }
    return isPathAtOrInside(
      uiPackageRoot,
      resolve(dirname(filePath), specifier),
    );
  });
}

if (!phaseId) {
  failures.push("status/current-phase.yaml must declare currentPhase.id");
} else if (!isDayOne && !isDayTwo && !isDayThree) {
  failures.push(
    `no explicit boundary policy exists for phase ${phaseId}; add and test a policy before changing phases`,
  );
}

if (isDayOne) {
  if (
    phaseStatus.currentPhase.status !== "authorized" ||
    phaseStatus.currentPhase.authorizationScope !==
      "day-1-runtime-scaffold-and-quality-gates"
  ) {
    failures.push("Day 1 phase authorization is not exact");
  }
  assertExact("Day 1 allowedActions", phaseStatus.allowedActions, [
    "只读检查已登记的 Figma 来源节点",
    "保存来源节点截图作为 Visual Evidence 复核产物",
    "更新 Visual Evidence 与 Benchmark 的现场复核状态",
    "创建或修订审计、计划、治理和状态文档",
    "执行文档、YAML、引用、截图和 Git 工作区的只读或非运行时验证",
    "安装 Day 1 实施计划明确列出的最小依赖",
    "初始化最小 React、Vite、Tailwind 运行骨架",
    "建立测试基础设施、质量门、证据入口与扁平 Overview",
  ]);
  assertExact("Day 1 blockedActions", phaseStatus.blockedActions, [
    "安装 Day 1 实施计划范围外的依赖或执行依赖升级",
    "实现公共组件、Layout 或 Benchmark 页面",
    "批量安装或复制 shadcn 资产",
    "执行 Figma 写入或发布 Figma Component/Variant",
    "创建本地 Git commit",
    "创建或配置远程仓库、push、PR 或 merge",
    "发布包、源码 Registry 或执行业务迁移",
  ]);
  const runtimeCheckpoint = phaseStatus.checkpoints?.find(
    ({ id }) => id === "day-1-runtime-start",
  );
  assertExact(
    "Day 1 checkpoint IDs",
    phaseStatus.checkpoints?.map(({ id }) => id),
    ["day-1-runtime-start"],
  );
  if (runtimeCheckpoint?.status !== "authorized") {
    failures.push("day-1-runtime-start checkpoint must remain explicitly authorized");
  }
  assertExact("Day 1 checkpoint unlocks", runtimeCheckpoint?.unlocks, [
    "依赖安装",
    "最小运行骨架",
    "测试基础设施",
  ]);

  const expectedDayOneLifecycle = {
    visualEvidence: "live-reinspected",
    benchmark: "registered",
    implementation: "in-progress",
    implementationScope: "day-1-task-1-and-task-2-completed",
    automatedVerification: "passed",
    automatedVerificationScope: "day-1-pnpm-verify",
    automatedVerificationEvidence:
      "pnpm-verify-governance-typecheck-vitest-build-chromium-e2e",
    humanGate: "not-evaluated",
    figmaEditableMaterial: "not-authorized",
    figmaComponentPublication: "not-authorized",
    packageOrRegistryPublication: "not-authorized",
    businessMigration: "not-authorized",
    localGitCommit: "not-created",
    remoteGit: "not-configured",
  };
  if (
    JSON.stringify(phaseStatus.independentLifecycle) !==
    JSON.stringify(expectedDayOneLifecycle)
  ) {
    failures.push(
      "Day 1 independentLifecycle must preserve exact implementation, verification, Human Gate, publication, and Git states",
    );
  }
  if (phaseStatus.currentPhase.progress !== "task-1-and-task-2-completed") {
    failures.push("Day 1 progress must be scoped to completed Task 1 and Task 2 only");
  }
  assertExact("Day 1 pending local commits", phaseStatus.pendingGitActions, {
    localCommits: [
      {
        message: "chore: scaffold rain next spike workspace",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "test: add playground and evidence quality gates",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
    ],
  });

  const expectedDayOneContractHashes = {
    "pnpm-lock.yaml":
      "2b459950686b50935fceff05e35a2ff8c76902072d6a1c211c2dc0e6ba3e1d71",
    "tsconfig.base.json":
      "fabf20400ad19b68965b95a530a0ca6e5165a44c803c50c8fb29c91ac85fddd5",
    "apps/playground/tsconfig.json":
      "874753eacd3f357ec0943f448fabf4330917fd8593909753bdcba1224801fbff",
    "apps/playground/vite.config.ts":
      "e63f2245bf7c5a094357bf2b04ba59dc20eea282dcd406cf39aba7ed8f580690",
    "apps/playground/src/main.tsx":
      "e416bd9301caa45509d9a428f005443c0a896533e4f7fd50e2d764e2eecf4e33",
    "apps/playground/src/app.tsx":
      "72d8612e5a1a2f4bb6935394b5abdbd83f2a6d777f792425730614883177fba6",
    "apps/playground/src/styles.css":
      "e177b3c6b4c3b3cd9acabbf4168b06c79823a8f092e9648fb9183393e5716b42",
    "apps/playground/src/docs/evidence-index.ts":
      "ec1ed5eebf79b0ad0cbf93ab63aba81c1690c93189a42df7eec97d7609dafb36",
    "apps/playground/src/docs/benchmark-index.ts":
      "80e46cbfbd74205413bc558f98b1f33674fb4c349054e8964715644f6fa6579b",
    "apps/playground/src/routes/route-registry.ts":
      "c06d0ba67273980d1bc2d675b3b8ea125b3feea6bc244ba00d937b45f87c00f8",
    "apps/playground/src/routes/overview-page.tsx":
      "e3834457a5c0031a1fbd90958726dc9c156418b20c1443a0123e231e77e5d35d",
    "vitest.config.ts":
      "b35a3fb10725188d9102c6c7238f7924a45c9e311f66a5b7f56682afdf62338b",
    "playwright.config.ts":
      "75b501fae911a415e5f942cfc309b44fba58c5c37902695a65de49e50997633a",
    "tests/setup.ts":
      "027df60e5248c77994462dc39bbd1e4b762c7fb9709a081c1f0adbb8b0b6ac86",
    "tests/e2e/playground-shell.spec.ts":
      "306603c5ddc65a57b06d44686169e923a856e88ae471998cde53c3ef0784363e",
    "apps/playground/src/routes/playground-shell.test.tsx":
      "233e65f865ff553b43ea36048b2065cca088970f0eefe79e814000022411ec59",
    "scripts/verification-helpers.test.ts":
      "c08a57603f6800014cfdf3aa449248a8fb5d5df44596d0c5afe7cfda1c145aef",
  };
  for (const [filePath, expectedHash] of Object.entries(
    expectedDayOneContractHashes,
  )) {
    const actualHash = createHash("sha256")
      .update(readFileSync(join(workspaceRoot, filePath)))
      .digest("hex");
    if (actualHash !== expectedHash) {
      failures.push(
        `${filePath} changed without updating the explicit Day 1 implementation and verification contract`,
      );
    }
  }

  try {
    const gitRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (gitRoot !== workspaceRoot) {
      failures.push(`Git root must be the spike workspace, received ${gitRoot}`);
    }
  } catch (error) {
    failures.push(`Git workspace cannot be audited: ${error.message}`);
  }

  let hasLocalCommit = false;
  try {
    execFileSync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: workspaceRoot,
      stdio: "ignore",
    });
    hasLocalCommit = true;
  } catch {
    hasLocalCommit = false;
  }
  if (hasLocalCommit) {
    failures.push(
      "Git has a local HEAD commit while Day 1 localGitCommit is not-created",
    );
  }

  try {
    const remotes = execFileSync("git", ["remote"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
      .trim()
      .split(/\r?\n/)
      .filter(Boolean);
    if (remotes.length > 0) {
      failures.push(
        `Git has configured remotes while Day 1 remoteGit is not-configured: ${remotes.join(", ")}`,
      );
    }
  } catch (error) {
    failures.push(`Git remotes cannot be audited: ${error.message}`);
  }

  assertExact("Day 1 package manifest set", packageFiles, [
    "apps/playground/package.json",
    "package.json",
  ]);
  const expectedDependencySets = {
    "package.json": {
      dependencies: {},
      devDependencies: {
        "@playwright/test": "^1.62.1",
        "@tailwindcss/vite": "^4.3.3",
        "@testing-library/jest-dom": "^7.0.1",
        "@testing-library/react": "^16.3.3",
        "@testing-library/user-event": "^14.6.6",
        "@vitejs/plugin-react": "^6.1.1",
        jsdom: "^29.1.1",
        tailwindcss: "^4.3.3",
        typescript: "^7.0.2",
        vite: "^8.2.2",
        vitest: "^4.1.11",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "apps/playground/package.json": {
      dependencies: { react: "^19.2.8", "react-dom": "^19.2.8" },
      devDependencies: {
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.5",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
  };

  function normalizedDependencyMap(dependencies) {
    return Object.fromEntries(Object.entries(dependencies ?? {}).sort());
  }

  for (const packageFile of packageFiles) {
    const document = loadPackage(packageFile);
    if (!document) {
      continue;
    }
    const expectedManifestKeys =
      packageFile === "package.json"
        ? [
            "devDependencies",
            "engines",
            "name",
            "packageManager",
            "private",
            "scripts",
            "type",
            "version",
          ]
        : [
            "dependencies",
            "devDependencies",
            "name",
            "private",
            "scripts",
            "type",
            "version",
          ];
    assertExact(
      `${packageFile} Day 1 manifest shape`,
      Object.keys(document).sort(),
      expectedManifestKeys,
    );
    if (packageFile === "apps/playground/package.json") {
      assertExact("Playground Day 1 scripts", document.scripts, {
        dev: "vite --host 127.0.0.1",
        build: "tsc --noEmit --project tsconfig.json && vite build",
        typecheck: "tsc --noEmit --project tsconfig.json",
      });
    } else {
      assertExact("Root Day 1 scripts", document.scripts, {
        dev: "pnpm --filter @rain-next/playground dev",
        build: "pnpm -r build",
        typecheck: "pnpm -r typecheck",
        test: "vitest run",
        "test:e2e": "playwright test",
        "verify:lockfile":
          "pnpm install --lockfile-only --frozen-lockfile --offline --ignore-scripts",
        "verify:workspace": "node scripts/verify-workspace.mjs",
        "verify:evidence": "node scripts/verify-evidence.mjs",
        "verify:boundaries": "node scripts/verify-boundaries.mjs",
        "verify:governance":
          "pnpm verify:lockfile && pnpm verify:workspace && pnpm verify:evidence && pnpm verify:boundaries",
        verify:
          "pnpm verify:governance && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e",
      });
    }
    const directDependencies = new Set([
      ...Object.keys(document.dependencies ?? {}),
      ...Object.keys(document.devDependencies ?? {}),
      ...Object.keys(document.peerDependencies ?? {}),
      ...Object.keys(document.optionalDependencies ?? {}),
    ]);
    const actualDependencySets = {
      dependencies: normalizedDependencyMap(document.dependencies),
      devDependencies: normalizedDependencyMap(document.devDependencies),
      peerDependencies: normalizedDependencyMap(document.peerDependencies),
      optionalDependencies: normalizedDependencyMap(document.optionalDependencies),
    };
    assertExact(
      `${packageFile} Day 1 dependency allowlist`,
      actualDependencySets,
      expectedDependencySets[packageFile],
    );
    for (const dependency of directDependencies) {
      if (isDayOneForbiddenDependency(dependency)) {
        failures.push(
          `${packageFile} installs Day 4/5 dependency ${dependency} during Day 1`,
        );
      }
    }

    for (const lifecycleScript of [
      "preinstall",
      "install",
      "postinstall",
      "prepare",
      "prepublish",
      "prepublishOnly",
    ]) {
      if (Object.hasOwn(document.scripts ?? {}, lifecycleScript)) {
        failures.push(
          `${packageFile} must not add lifecycle script ${lifecycleScript} during Day 1`,
        );
      }
    }
  }

  for (const forbiddenResolutionFile of [
    ".npmrc",
    ".pnpmfile.cjs",
    "pnpmfile.cjs",
    ".yarnrc",
    ".yarnrc.yml",
    "npm-shrinkwrap.json",
  ]) {
    if (existsSync(join(workspaceRoot, forbiddenResolutionFile))) {
      failures.push(
        `${forbiddenResolutionFile} is not authorized during Day 1 dependency setup`,
      );
    }
  }
}

const applicationFiles = collectFiles(join(workspaceRoot, "apps/playground/src"));
const applicationSources = applicationFiles.filter((filePath) =>
  /\.(?:[cm]?[jt]sx?|css)$/.test(filePath),
);

if (isDayOne) {
  const allowedDayOneApplicationSources = new Set(
    [
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );

  for (const filePath of applicationSources) {
    if (!allowedDayOneApplicationSources.has(filePath)) {
      failures.push(
        `application implementation outside the Day 1 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }

    const source = readFileSync(filePath, "utf8");
    if (/<(?:nav|aside)\b/i.test(source)) {
      failures.push(
        `persistent navigation or platform sidebar found in ${relative(workspaceRoot, filePath)}`,
      );
    }
    if (
      /(?:from\s+|import\s*)["'][^"']*(?:shadcn|radix-ui|@base-ui)/.test(
        source,
      )
    ) {
      failures.push(
        `unapproved external component import found in ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  for (const blockedDirectory of [
    "packages/foundations",
    "packages/ui",
    "packages/layouts",
    "apps/playground/src/benchmarks",
    "apps/playground/src/experiments/headless",
    "manifests",
    "registry",
  ]) {
    const directoryPath = join(workspaceRoot, blockedDirectory);
    const directoryFiles = collectFiles(directoryPath);
    const placeholderPath = join(directoryPath, ".gitkeep");
    if (
      directoryFiles.length !== 1 ||
      directoryFiles[0] !== placeholderPath ||
      statSync(placeholderPath).size !== 1 ||
      readFileSync(placeholderPath, "utf8") !== "\n"
    ) {
      failures.push(
        `${blockedDirectory} must contain only the canonical newline-only .gitkeep during Day 1: ${directoryFiles
          .map((filePath) => relative(workspaceRoot, filePath))
          .join(", ")}`,
      );
    }
  }

  const expectedAppDirectories = ["playground"];
  const actualAppDirectories = existsSync(join(workspaceRoot, "apps"))
    ? readdirSync(join(workspaceRoot, "apps"), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map(({ name }) => name)
        .sort()
    : [];
  if (JSON.stringify(actualAppDirectories) !== JSON.stringify(expectedAppDirectories)) {
    failures.push(
      `Day 1 apps must contain only playground, found ${actualAppDirectories.join(", ")}`,
    );
  }

  const expectedAppFiles = [
    "apps/playground/index.html",
    "apps/playground/package.json",
    "apps/playground/tsconfig.json",
    "apps/playground/vite.config.ts",
    "apps/playground/src/app.tsx",
    "apps/playground/src/main.tsx",
    "apps/playground/src/styles.css",
    "apps/playground/src/benchmarks/.gitkeep",
    "apps/playground/src/docs/benchmark-index.ts",
    "apps/playground/src/docs/evidence-index.ts",
    "apps/playground/src/experiments/headless/.gitkeep",
    "apps/playground/src/routes/overview-page.tsx",
    "apps/playground/src/routes/playground-shell.test.tsx",
    "apps/playground/src/routes/route-registry.ts",
  ].sort();
  const actualAppFiles = collectFiles(join(workspaceRoot, "apps"))
    .map((filePath) => relative(workspaceRoot, filePath))
    .sort();
  assertExact("complete Day 1 app file allowlist", actualAppFiles, expectedAppFiles);

  const indexHtml = readFileSync(
    join(workspaceRoot, "apps/playground/index.html"),
    "utf8",
  );
  const expectedIndexHtml = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="description"
      content="Rain Next Foundation Spike 的本地运行与验证入口"
    />
    <title>Rain Next Foundation Spike</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
  assertExact("canonical Day 1 index.html", indexHtml, expectedIndexHtml);

  const expectedPackageDirectories = ["foundations", "layouts", "ui"];
  const actualPackageDirectories = existsSync(join(workspaceRoot, "packages"))
    ? readdirSync(join(workspaceRoot, "packages"), { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map(({ name }) => name)
        .sort()
    : [];
  if (
    JSON.stringify(actualPackageDirectories) !==
    JSON.stringify(expectedPackageDirectories)
  ) {
    failures.push(
      `Day 1 packages must contain only foundations, layouts, and ui placeholders, found ${actualPackageDirectories.join(", ")}`,
    );
  }

  const allowedDayOneWorkspaceSources = new Set(
    [
      "apps/playground/vite.config.ts",
      "apps/playground/index.html",
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
      "playwright.config.ts",
      "vitest.config.ts",
      "scripts/verification-helpers.mjs",
      "scripts/verification-helpers.test.ts",
      "scripts/verify-workspace.mjs",
      "scripts/verify-evidence.mjs",
      "scripts/verify-boundaries.mjs",
      "tests/setup.ts",
      "tests/e2e/playground-shell.spec.ts",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  const workspaceSources = collectFiles(workspaceRoot).filter((filePath) =>
    /\.(?:[cm]?[jt]sx?|astro|css|html|mdx|svelte|svg|vue)$/.test(filePath),
  );
  for (const filePath of workspaceSources) {
    if (!allowedDayOneWorkspaceSources.has(filePath)) {
      failures.push(
        `source file outside the complete Day 1 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }
  }
}

if (isDayTwo) {
  const privateReferenceDefinitionFiles = new Set(
    [
      "packages/foundations/src/token-contract.ts",
      "packages/foundations/src/tokens.css",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  const runtimeColorConsumers = [
    ...applicationSources,
    ...collectFiles(join(workspaceRoot, "packages/foundations/src")).filter(
      (filePath) => /\.(?:[cm]?[jt]sx?|css)$/.test(filePath),
    ),
  ].filter((filePath) => !/\.test\.[^.]+$/.test(filePath));
  for (const filePath of runtimeColorConsumers) {
    if (
      !privateReferenceDefinitionFiles.has(filePath) &&
      usesPrivateReferenceColor(readFileSync(filePath, "utf8"))
    ) {
      failures.push(
        `private reference color consumed outside Foundations definitions: ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  if (
    phaseStatus.currentPhase.status !== "authorized" ||
    phaseStatus.currentPhase.workMode !== "system-mode-foundations" ||
    phaseStatus.currentPhase.authorizationScope !==
      "day-2-foundations-contract-and-fixtures" ||
    phaseStatus.currentPhase.progress !==
      "task-3-focus-color-correction-completed"
  ) {
    failures.push("Day 2 phase authorization is not exact");
  }

  assertExact("Day 2 allowedActions", phaseStatus.allowedActions, [
    "只读检查已登记的 Figma 来源节点",
    "保存来源节点截图作为 Visual Evidence 复核产物",
    "更新 Visual Evidence 与 Benchmark 的现场复核状态",
    "创建或修订审计、计划、治理和状态文档",
    "执行文档、YAML、引用、截图和 Git 工作区的只读或非运行时验证",
    "创建 Task 3 明确列出的 Foundations 包、合同与样式文件",
    "建立 Foundations 展示夹具、单元测试与浏览器测试",
    "保存 Day 2 运行截图与字体环境说明",
    "运行现有质量门、类型检查、构建与浏览器验证",
  ]);
  assertExact("Day 2 blockedActions", phaseStatus.blockedActions, [
    "安装新依赖或执行依赖升级",
    "实现公共组件、Layout 或 Benchmark 页面",
    "批量安装或复制 shadcn 资产",
    "执行 Figma 写入或发布 Figma Component/Variant",
    "创建本地 Git commit",
    "创建或配置远程仓库、push、PR 或 merge",
    "发布包、源码 Registry 或执行业务迁移",
  ]);
  assertExact(
    "Day 2 checkpoint IDs",
    phaseStatus.checkpoints?.map(({ id }) => id),
    ["day-1-runtime-start", "day-2-foundations-start"],
  );
  const foundationsCheckpoint = phaseStatus.checkpoints?.find(
    ({ id }) => id === "day-2-foundations-start",
  );
  if (foundationsCheckpoint?.status !== "authorized") {
    failures.push(
      "day-2-foundations-start checkpoint must remain explicitly authorized",
    );
  }
  assertExact("Day 2 checkpoint unlocks", foundationsCheckpoint?.unlocks, [
    "Foundations token 合同",
    "Typography、Density、Radius、Shadow、Focus 与 Motion 最小规则",
    "Foundations 展示夹具与 Day 2 运行证据",
  ]);

  assertExact("Day 2 independentLifecycle", phaseStatus.independentLifecycle, {
    visualEvidence: "live-reinspected",
    benchmark: "registered",
    implementation: "completed",
    implementationScope: "day-2-task-3-plus-focus-color-correction",
    automatedVerification: "passed",
    automatedVerificationScope: "day-2-task-3-focus-color-correction",
    automatedVerificationEvidence:
      "pnpm-verify-governance-typecheck-vitest-build-chromium-e2e",
    humanGate: "not-evaluated",
    figmaEditableMaterial: "not-authorized",
    figmaComponentPublication: "not-authorized",
    packageOrRegistryPublication: "not-authorized",
    businessMigration: "not-authorized",
    localGitCommit: "not-created",
    remoteGit: "not-configured",
  });
  assertExact("Day 2 pending local commits", phaseStatus.pendingGitActions, {
    localCommits: [
      {
        message: "chore: scaffold rain next spike workspace",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "test: add playground and evidence quality gates",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "feat: establish rain next foundations",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
    ],
  });

  assertExact("Day 2 package manifest set", packageFiles, [
    "apps/playground/package.json",
    "package.json",
    "packages/foundations/package.json",
  ]);

  const expectedDependencySets = {
    "package.json": {
      dependencies: {},
      devDependencies: {
        "@playwright/test": "^1.62.1",
        "@tailwindcss/vite": "^4.3.3",
        "@testing-library/jest-dom": "^7.0.1",
        "@testing-library/react": "^16.3.3",
        "@testing-library/user-event": "^14.6.6",
        "@vitejs/plugin-react": "^6.1.1",
        jsdom: "^29.1.1",
        tailwindcss: "^4.3.3",
        typescript: "^7.0.2",
        vite: "^8.2.2",
        vitest: "^4.1.11",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "apps/playground/package.json": {
      dependencies: {
        "@rain-next/foundations": "workspace:*",
        react: "^19.2.8",
        "react-dom": "^19.2.8",
      },
      devDependencies: {
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.5",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "packages/foundations/package.json": {
      dependencies: { react: "^19.2.8" },
      devDependencies: { "@types/react": "^19.2.18" },
      peerDependencies: {},
      optionalDependencies: {},
    },
  };
  const expectedScripts = {
    "package.json": {
      dev: "pnpm --filter @rain-next/playground dev",
      build: "pnpm -r build",
      typecheck:
        "pnpm -r typecheck && tsc --noEmit --project tsconfig.tests.json",
      test: "vitest run",
      "test:e2e": "playwright test",
      "verify:lockfile":
        "pnpm install --lockfile-only --frozen-lockfile --offline --ignore-scripts",
      "verify:workspace": "node scripts/verify-workspace.mjs",
      "verify:evidence": "node scripts/verify-evidence.mjs",
      "verify:boundaries": "node scripts/verify-boundaries.mjs",
      "verify:governance":
        "pnpm verify:lockfile && pnpm verify:workspace && pnpm verify:evidence && pnpm verify:boundaries",
      verify:
        "pnpm verify:governance && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e",
    },
    "apps/playground/package.json": {
      dev: "vite --host 127.0.0.1",
      build: "tsc --noEmit --project tsconfig.json && vite build",
      typecheck: "tsc --noEmit --project tsconfig.json",
    },
    "packages/foundations/package.json": {
      build: "tsc --noEmit --project tsconfig.json",
      typecheck: "tsc --noEmit --project tsconfig.json",
    },
  };
  const expectedManifestKeys = {
    "package.json": [
      "devDependencies",
      "engines",
      "name",
      "packageManager",
      "private",
      "scripts",
      "type",
      "version",
    ],
    "apps/playground/package.json": [
      "dependencies",
      "devDependencies",
      "name",
      "private",
      "scripts",
      "type",
      "version",
    ],
    "packages/foundations/package.json": [
      "dependencies",
      "devDependencies",
      "exports",
      "name",
      "private",
      "scripts",
      "type",
      "version",
    ],
  };
  const allowedExternalDependencies = new Set([
    "@playwright/test",
    "@tailwindcss/vite",
    "@testing-library/jest-dom",
    "@testing-library/react",
    "@testing-library/user-event",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "jsdom",
    "react",
    "react-dom",
    "tailwindcss",
    "typescript",
    "vite",
    "vitest",
  ]);
  const internalPackageNames = new Set(
    packageFiles
      .map((packageFile) => loadPackage(packageFile)?.name)
      .filter(Boolean),
  );

  function normalizedDependencyMap(dependencies) {
    return Object.fromEntries(Object.entries(dependencies ?? {}).sort());
  }

  for (const packageFile of packageFiles) {
    const document = loadPackage(packageFile);
    if (!document) continue;

    assertExact(
      `${packageFile} Day 2 manifest shape`,
      Object.keys(document).sort(),
      expectedManifestKeys[packageFile],
    );
    assertExact(
      `${packageFile} Day 2 scripts`,
      document.scripts,
      expectedScripts[packageFile],
    );
    assertExact(
      `${packageFile} Day 2 dependency allowlist`,
      {
        dependencies: normalizedDependencyMap(document.dependencies),
        devDependencies: normalizedDependencyMap(document.devDependencies),
        peerDependencies: normalizedDependencyMap(document.peerDependencies),
        optionalDependencies: normalizedDependencyMap(document.optionalDependencies),
      },
      expectedDependencySets[packageFile],
    );

    for (const dependencyGroup of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ]) {
      for (const [dependency, version] of Object.entries(
        document[dependencyGroup] ?? {},
      )) {
        if (
          internalPackageNames.has(dependency) &&
          (typeof version !== "string" || !version.startsWith("workspace:"))
        ) {
          failures.push(
            `${packageFile} must reference internal package ${dependency} with workspace: during Day 2`,
          );
        }
        if (
          !internalPackageNames.has(dependency) &&
          !allowedExternalDependencies.has(dependency)
        ) {
          failures.push(
            `${packageFile} adds dependency ${dependency} outside the Day 1 dependency set`,
          );
        }
        if (isDayOneForbiddenDependency(dependency)) {
          failures.push(
            `${packageFile} installs Day 4/5 dependency ${dependency} during Day 2`,
          );
        }
      }
    }

    for (const lifecycleScript of [
      "preinstall",
      "install",
      "postinstall",
      "prepare",
      "prepublish",
      "prepublishOnly",
    ]) {
      if (Object.hasOwn(document.scripts ?? {}, lifecycleScript)) {
        failures.push(
          `${packageFile} must not add lifecycle script ${lifecycleScript} during Day 2`,
        );
      }
    }
  }

  const foundationsPackage = loadPackage("packages/foundations/package.json");
  assertExact("Foundations source exports", foundationsPackage?.exports, {
    ".": "./src/index.ts",
    "./tokens.css": "./src/tokens.css",
    "./typography.css": "./src/typography.css",
    "./motion.css": "./src/motion.css",
    "./focus.css": "./src/focus.css",
  });

  const allowedDayTwoApplicationSources = new Set(
    [
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/docs/foundations-page.tsx",
      "apps/playground/src/docs/foundations-page.test.tsx",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  for (const filePath of applicationSources) {
    if (!allowedDayTwoApplicationSources.has(filePath)) {
      failures.push(
        `application implementation outside the Day 2 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }
    const source = readFileSync(filePath, "utf8");
    if (/<(?:nav|aside)\b/i.test(source)) {
      failures.push(
        `persistent navigation or platform sidebar found in ${relative(workspaceRoot, filePath)}`,
      );
    }
    if (
      /(?:from\s+|import\s*)["'][^"']*(?:shadcn|radix-ui|@base-ui)/.test(
        source,
      )
    ) {
      failures.push(
        `unapproved external component import found in ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  const expectedAppFiles = [
    "apps/playground/index.html",
    "apps/playground/package.json",
    "apps/playground/tsconfig.json",
    "apps/playground/vite.config.ts",
    "apps/playground/src/app.tsx",
    "apps/playground/src/main.tsx",
    "apps/playground/src/styles.css",
    "apps/playground/src/benchmarks/.gitkeep",
    "apps/playground/src/docs/benchmark-index.ts",
    "apps/playground/src/docs/evidence-index.ts",
    "apps/playground/src/docs/foundations-page.test.tsx",
    "apps/playground/src/docs/foundations-page.tsx",
    "apps/playground/src/experiments/headless/.gitkeep",
    "apps/playground/src/routes/overview-page.tsx",
    "apps/playground/src/routes/playground-shell.test.tsx",
    "apps/playground/src/routes/route-registry.ts",
  ].sort();
  assertExact(
    "complete Day 2 app file allowlist",
    collectFiles(join(workspaceRoot, "apps"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    expectedAppFiles,
  );

  const expectedFoundationsFiles = [
    "packages/foundations/package.json",
    "packages/foundations/tsconfig.json",
    "packages/foundations/src/density.test.tsx",
    "packages/foundations/src/density.tsx",
    "packages/foundations/src/focus.css",
    "packages/foundations/src/index.ts",
    "packages/foundations/src/motion.css",
    "packages/foundations/src/token-contract.test.ts",
    "packages/foundations/src/token-contract.ts",
    "packages/foundations/src/tokens.css",
    "packages/foundations/src/typography.css",
  ].sort();
  assertExact(
    "complete Day 2 Foundations file allowlist",
    collectFiles(join(workspaceRoot, "packages/foundations"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    expectedFoundationsFiles,
  );

  for (const blockedDirectory of [
    "packages/ui",
    "packages/layouts",
    "apps/playground/src/benchmarks",
    "apps/playground/src/experiments/headless",
    "manifests",
    "registry",
  ]) {
    const directoryPath = join(workspaceRoot, blockedDirectory);
    const directoryFiles = collectFiles(directoryPath);
    const placeholderPath = join(directoryPath, ".gitkeep");
    if (
      directoryFiles.length !== 1 ||
      directoryFiles[0] !== placeholderPath ||
      statSync(placeholderPath).size !== 1 ||
      readFileSync(placeholderPath, "utf8") !== "\n"
    ) {
      failures.push(
        `${blockedDirectory} must remain a canonical empty placeholder during Day 2`,
      );
    }
  }

  const expectedDayTwoEvidenceFiles = [
    "evidence/runtime/day-2/README.md",
    "evidence/runtime/day-2/font-environment.md",
    "evidence/runtime/day-2/foundations-page.png",
    "evidence/runtime/day-2/red-green-summary.md",
  ].sort();
  assertExact(
    "Day 2 runtime evidence allowlist",
    collectFiles(join(workspaceRoot, "evidence/runtime/day-2"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    expectedDayTwoEvidenceFiles,
  );

  const dayTwoScreenshotPath = join(
    workspaceRoot,
    "evidence/runtime/day-2/foundations-page.png",
  );
  const dayTwoEvidenceReadmePath = join(
    workspaceRoot,
    "evidence/runtime/day-2/README.md",
  );
  try {
    const screenshotStat = lstatSync(dayTwoScreenshotPath);
    if (!screenshotStat.isFile() || screenshotStat.isSymbolicLink()) {
      failures.push(
        "Day 2 Foundations screenshot must be a regular, non-symlink file",
      );
    } else {
      const screenshotBuffer = readFileSync(dayTwoScreenshotPath);
      if (screenshotBuffer.length < 100_000) {
        failures.push(
          `Day 2 Foundations screenshot is anomalously small: ${screenshotBuffer.length} bytes`,
        );
      }

      const screenshotMetadata = inspectPngMetadata(screenshotBuffer);
      assertExact("Day 2 Foundations screenshot IHDR dimensions", screenshotMetadata, {
        height: 4636,
        width: 1440,
      });

      const actualScreenshotHash = createHash("sha256")
        .update(screenshotBuffer)
        .digest("hex");
      const evidenceReadme = readFileSync(dayTwoEvidenceReadmePath, "utf8");

      const recordedSizeMatches = [
        ...evidenceReadme.matchAll(/^  - 文件大小：`([1-9]\d*) bytes`$/gm),
      ];
      if (recordedSizeMatches.length !== 1) {
        failures.push(
          "Day 2 runtime evidence README must record exactly one Foundations screenshot byte size",
        );
      } else {
        const recordedSize = Number(recordedSizeMatches[0][1]);
        if (recordedSize !== screenshotBuffer.length) {
          failures.push(
            `Day 2 Foundations screenshot byte-size mismatch: recorded ${recordedSize}, received ${screenshotBuffer.length}`,
          );
        }
      }

      const recordedHashMatches = [
        ...evidenceReadme.matchAll(/^  - SHA-256：`([a-f0-9]{64})`$/gm),
      ];
      if (recordedHashMatches.length !== 1) {
        failures.push(
          "Day 2 runtime evidence README must record exactly one Foundations screenshot SHA-256",
        );
      } else {
        const recordedHash = recordedHashMatches[0][1];
        if (recordedHash !== actualScreenshotHash) {
          failures.push(
            `Day 2 Foundations screenshot SHA-256 mismatch: recorded ${recordedHash}, received ${actualScreenshotHash}`,
          );
        }
      }
    }
  } catch (error) {
    failures.push(`Day 2 Foundations screenshot cannot be audited: ${error.message}`);
  }

  const allowedDayTwoWorkspaceSources = new Set(
    [
      "apps/playground/vite.config.ts",
      "apps/playground/index.html",
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/docs/foundations-page.tsx",
      "apps/playground/src/docs/foundations-page.test.tsx",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
      "packages/foundations/src/index.ts",
      "packages/foundations/src/tokens.css",
      "packages/foundations/src/token-contract.ts",
      "packages/foundations/src/token-contract.test.ts",
      "packages/foundations/src/typography.css",
      "packages/foundations/src/density.tsx",
      "packages/foundations/src/density.test.tsx",
      "packages/foundations/src/motion.css",
      "packages/foundations/src/focus.css",
      "playwright.config.ts",
      "vitest.config.ts",
      "scripts/verification-helpers.mjs",
      "scripts/verification-helpers.test.ts",
      "scripts/verify-workspace.mjs",
      "scripts/verify-evidence.mjs",
      "scripts/verify-boundaries.mjs",
      "tests/setup.ts",
      "tests/node-runtime.d.ts",
      "tests/color-contrast.test.ts",
      "tests/e2e/color-contrast.ts",
      "tests/e2e/playground-shell.spec.ts",
      "tests/e2e/foundations.spec.ts",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  const workspaceSources = collectFiles(workspaceRoot).filter((filePath) =>
    /\.(?:[cm]?[jt]sx?|astro|css|html|mdx|svelte|svg|vue)$/.test(filePath),
  );
  for (const filePath of workspaceSources) {
    if (!allowedDayTwoWorkspaceSources.has(filePath)) {
      failures.push(
        `source file outside the complete Day 2 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  try {
    const testsTypeConfig = JSON.parse(
      readFileSync(join(workspaceRoot, "tsconfig.tests.json"), "utf8"),
    );
    assertExact("Day 2 test typecheck config", testsTypeConfig, {
      extends: "./tsconfig.base.json",
      compilerOptions: {
        allowJs: true,
        checkJs: false,
        jsx: "react-jsx",
        lib: ["ES2022", "DOM", "DOM.Iterable"],
        noEmit: true,
        types: ["vite/client"],
      },
      include: [
        "apps/**/*.test.ts",
        "apps/**/*.test.tsx",
        "packages/**/*.test.ts",
        "packages/**/*.test.tsx",
        "tests/**/*.ts",
        "scripts/**/*.test.ts",
        "playwright.config.ts",
        "vitest.config.ts",
      ],
    });
  } catch (error) {
    failures.push(`tsconfig.tests.json cannot be audited: ${error.message}`);
  }

  const fontFiles = collectFiles(workspaceRoot).filter((filePath) =>
    /\.(?:otf|ttc|ttf|woff2?)$/i.test(filePath),
  );
  if (fontFiles.length > 0) {
    failures.push(
      `font files are not authorized in Day 2: ${fontFiles
        .map((filePath) => relative(workspaceRoot, filePath))
        .join(", ")}`,
    );
  }

  const foundationsPageSource = readFileSync(
    join(workspaceRoot, "apps/playground/src/docs/foundations-page.tsx"),
    "utf8",
  );
  for (const marker of [
    'data-rain-id="foundations-page"',
    'data-slot="semantic-colors"',
    'data-slot="typography-roles"',
    'data-slot="density-comparison"',
    'data-slot="focus-semantics"',
    'data-slot="motion-comparison"',
  ]) {
    if (!foundationsPageSource.includes(marker)) {
      failures.push(`Foundations page is missing tracking marker ${marker}`);
    }
  }

  const overviewPageSource = readFileSync(
    join(workspaceRoot, "apps/playground/src/routes/overview-page.tsx"),
    "utf8",
  );
  if (
    !overviewPageSource.includes(
      "Day 2.1 Focus / Color 修正已完成 · 自动验证通过 · Human Gate 未评估",
    )
  ) {
    failures.push(
      "Overview phase copy must reflect completed automation and an unevaluated Human Gate",
    );
  }

  try {
    const gitRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (gitRoot !== workspaceRoot) {
      failures.push(`Git root must be the spike workspace, received ${gitRoot}`);
    }
  } catch (error) {
    failures.push(`Git workspace cannot be audited: ${error.message}`);
  }

  let hasLocalCommit = false;
  try {
    execFileSync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: workspaceRoot,
      stdio: "ignore",
    });
    hasLocalCommit = true;
  } catch {
    hasLocalCommit = false;
  }
  if (hasLocalCommit) {
    failures.push(
      "Git has a local HEAD commit while Day 2 localGitCommit is not-created",
    );
  }

  try {
    const remotes = execFileSync("git", ["remote"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
      .trim()
      .split(/\r?\n/)
      .filter(Boolean);
    if (remotes.length > 0) {
      failures.push(
        `Git has configured remotes while Day 2 remoteGit is not-configured: ${remotes.join(", ")}`,
      );
    }
  } catch (error) {
    failures.push(`Git remotes cannot be audited: ${error.message}`);
  }
}

if (isDayThree) {
  const privateReferenceDefinitionFiles = new Set(
    [
      "packages/foundations/src/token-contract.ts",
      "packages/foundations/src/tokens.css",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  const foundationsRuntimeSources = collectFiles(
    join(workspaceRoot, "packages/foundations/src"),
  ).filter((filePath) => /\.(?:[cm]?[jt]sx?|css)$/.test(filePath));
  const uiRuntimeSources = collectFiles(
    join(workspaceRoot, "packages/ui/src"),
  ).filter((filePath) => /\.(?:[cm]?[jt]sx?|css)$/.test(filePath));
  const runtimeColorConsumers = [
    ...applicationSources,
    ...foundationsRuntimeSources,
    ...uiRuntimeSources,
  ].filter((filePath) => !/\.test\.[^.]+$/.test(filePath));
  for (const filePath of runtimeColorConsumers) {
    if (
      !privateReferenceDefinitionFiles.has(filePath) &&
      usesPrivateReferenceColor(readFileSync(filePath, "utf8"))
    ) {
      failures.push(
        `private reference color consumed outside Foundations definitions: ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  if (
    phaseStatus.currentPhase.status !== "authorized" ||
    phaseStatus.currentPhase.workMode !== "system-mode-ui" ||
    phaseStatus.currentPhase.authorizationScope !==
      "day-3-core-ui-families-and-docs" ||
    phaseStatus.currentPhase.progress !== "task-4-core-ui-completed"
  ) {
    failures.push("Day 3 phase authorization is not exact");
  }

  assertExact("Day 3 allowedActions", phaseStatus.allowedActions, [
    "只读检查已登记的 Figma 来源节点",
    "保存来源节点截图作为 Visual Evidence 复核产物",
    "更新 Visual Evidence 与 Benchmark 的现场复核状态",
    "创建或修订审计、计划、治理和状态文档",
    "执行文档、YAML、引用、截图和 Git 工作区的只读或非运行时验证",
    "创建 Task 4 明确列出的 UI 包、Button、Input、Tag/Badge 与 Surface/Card 家族",
    "建立 Core UI 文档夹具、单元测试、交互测试与浏览器测试",
    "保存 Day 3 Core UI 运行截图与验证说明",
    "运行现有质量门、类型检查、构建与浏览器验证",
  ]);
  assertExact("Day 3 blockedActions", phaseStatus.blockedActions, [
    "安装新依赖或执行依赖升级",
    "实现 Select、Dialog、Table、Statistic、Layout、Headless 实验或 Benchmark 页面",
    "批量安装或复制 shadcn 资产",
    "执行 Figma 写入或发布 Figma Component/Variant",
    "创建本地 Git commit",
    "创建或配置远程仓库、push、PR 或 merge",
    "发布包、源码 Registry 或执行业务迁移",
  ]);
  assertExact(
    "Day 3 checkpoint IDs",
    phaseStatus.checkpoints?.map(({ id }) => id),
    [
      "day-1-runtime-start",
      "day-2-foundations-start",
      "day-3-core-ui-start",
    ],
  );
  const coreUiCheckpoint = phaseStatus.checkpoints?.find(
    ({ id }) => id === "day-3-core-ui-start",
  );
  if (coreUiCheckpoint?.status !== "authorized") {
    failures.push(
      "day-3-core-ui-start checkpoint must remain explicitly authorized",
    );
  }
  assertExact("Day 3 checkpoint unlocks", coreUiCheckpoint?.unlocks, [
    "Button、Input、Tag/Badge 与 Surface/Card 公共 UI 家族",
    "Core UI 状态矩阵与修改边界文档",
    "Day 3 单元、交互、浏览器测试与运行证据",
  ]);

  assertExact("Day 3 independentLifecycle", phaseStatus.independentLifecycle, {
    visualEvidence: "live-reinspected",
    benchmark: "registered",
    implementation: "completed",
    implementationScope: "day-3-task-4-core-ui-families",
    automatedVerification: "passed",
    automatedVerificationScope: "day-3-task-4-core-ui-families",
    automatedVerificationEvidence:
      "pnpm verify: governance, root and workspace typecheck, 262 Vitest tests, three workspace builds, and 8 Chromium E2E tests",
    humanGate: "not-evaluated",
    figmaEditableMaterial: "not-authorized",
    figmaComponentPublication: "not-authorized",
    packageOrRegistryPublication: "not-authorized",
    businessMigration: "not-authorized",
    localGitCommit: "not-created",
    remoteGit: "not-configured",
  });
  assertExact("Day 3 pending local commits", phaseStatus.pendingGitActions, {
    localCommits: [
      {
        message: "chore: scaffold rain next spike workspace",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "test: add playground and evidence quality gates",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "feat: establish rain next foundations",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
      {
        message: "feat: add core rain ui families",
        status: "pending-authorization",
        reason: "Local Git Commit 未授权。",
      },
    ],
  });

  assertExact("Day 3 package manifest set", packageFiles, [
    "apps/playground/package.json",
    "package.json",
    "packages/foundations/package.json",
    "packages/ui/package.json",
  ]);

  const expectedDependencySets = {
    "package.json": {
      dependencies: {},
      devDependencies: {
        "@playwright/test": "^1.62.1",
        "@tailwindcss/vite": "^4.3.3",
        "@testing-library/jest-dom": "^7.0.1",
        "@testing-library/react": "^16.3.3",
        "@testing-library/user-event": "^14.6.6",
        "@vitejs/plugin-react": "^6.1.1",
        jsdom: "^29.1.1",
        tailwindcss: "^4.3.3",
        typescript: "^7.0.2",
        vite: "^8.2.2",
        vitest: "^4.1.11",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "apps/playground/package.json": {
      dependencies: {
        "@rain-next/foundations": "workspace:*",
        "@rain-next/ui": "workspace:*",
        react: "^19.2.8",
        "react-dom": "^19.2.8",
      },
      devDependencies: {
        "@types/react": "^19.2.18",
        "@types/react-dom": "^19.2.5",
      },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "packages/foundations/package.json": {
      dependencies: { react: "^19.2.8" },
      devDependencies: { "@types/react": "^19.2.18" },
      peerDependencies: {},
      optionalDependencies: {},
    },
    "packages/ui/package.json": {
      dependencies: {
        "@rain-next/foundations": "workspace:*",
        react: "^19.2.8",
      },
      devDependencies: { "@types/react": "^19.2.18" },
      peerDependencies: {},
      optionalDependencies: {},
    },
  };
  const expectedScripts = {
    "package.json": {
      dev: "pnpm --filter @rain-next/playground dev",
      build: "pnpm -r build",
      typecheck:
        "pnpm -r typecheck && tsc --noEmit --project tsconfig.tests.json",
      test: "vitest run",
      "test:e2e": "playwright test",
      "verify:lockfile":
        "pnpm install --lockfile-only --frozen-lockfile --offline --ignore-scripts",
      "verify:workspace": "node scripts/verify-workspace.mjs",
      "verify:evidence": "node scripts/verify-evidence.mjs",
      "verify:boundaries": "node scripts/verify-boundaries.mjs",
      "verify:governance":
        "pnpm verify:lockfile && pnpm verify:workspace && pnpm verify:evidence && pnpm verify:boundaries",
      verify:
        "pnpm verify:governance && pnpm typecheck && pnpm test && pnpm build && pnpm test:e2e",
    },
    "apps/playground/package.json": {
      dev: "vite --host 127.0.0.1",
      build: "tsc --noEmit --project tsconfig.json && vite build",
      typecheck: "tsc --noEmit --project tsconfig.json",
    },
    "packages/foundations/package.json": {
      build: "tsc --noEmit --project tsconfig.json",
      typecheck: "tsc --noEmit --project tsconfig.json",
    },
    "packages/ui/package.json": {
      build: "tsc --noEmit --project tsconfig.json",
      typecheck: "tsc --noEmit --project tsconfig.json",
    },
  };
  const expectedManifestKeys = {
    "package.json": [
      "devDependencies",
      "engines",
      "name",
      "packageManager",
      "private",
      "scripts",
      "type",
      "version",
    ],
    "apps/playground/package.json": [
      "dependencies",
      "devDependencies",
      "name",
      "private",
      "scripts",
      "type",
      "version",
    ],
    "packages/foundations/package.json": [
      "dependencies",
      "devDependencies",
      "exports",
      "name",
      "private",
      "scripts",
      "type",
      "version",
    ],
    "packages/ui/package.json": [
      "dependencies",
      "devDependencies",
      "exports",
      "name",
      "private",
      "scripts",
      "type",
      "version",
    ],
  };
  const allowedExternalDependencies = new Set([
    "@playwright/test",
    "@tailwindcss/vite",
    "@testing-library/jest-dom",
    "@testing-library/react",
    "@testing-library/user-event",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "jsdom",
    "react",
    "react-dom",
    "tailwindcss",
    "typescript",
    "vite",
    "vitest",
  ]);
  const internalPackageNames = new Set(
    packageFiles
      .map((packageFile) => loadPackage(packageFile)?.name)
      .filter(Boolean),
  );

  function normalizedDependencyMap(dependencies) {
    return Object.fromEntries(Object.entries(dependencies ?? {}).sort());
  }

  for (const packageFile of packageFiles) {
    const document = loadPackage(packageFile);
    if (!document) continue;

    assertExact(
      `${packageFile} Day 3 manifest shape`,
      Object.keys(document).sort(),
      expectedManifestKeys[packageFile],
    );
    assertExact(
      `${packageFile} Day 3 scripts`,
      document.scripts,
      expectedScripts[packageFile],
    );
    assertExact(
      `${packageFile} Day 3 dependency allowlist`,
      {
        dependencies: normalizedDependencyMap(document.dependencies),
        devDependencies: normalizedDependencyMap(document.devDependencies),
        peerDependencies: normalizedDependencyMap(document.peerDependencies),
        optionalDependencies: normalizedDependencyMap(document.optionalDependencies),
      },
      expectedDependencySets[packageFile],
    );

    for (const dependencyGroup of [
      "dependencies",
      "devDependencies",
      "peerDependencies",
      "optionalDependencies",
    ]) {
      for (const [dependency, version] of Object.entries(
        document[dependencyGroup] ?? {},
      )) {
        if (
          internalPackageNames.has(dependency) &&
          (typeof version !== "string" || !version.startsWith("workspace:"))
        ) {
          failures.push(
            `${packageFile} must reference internal package ${dependency} with workspace: during Day 3`,
          );
        }
        if (
          !internalPackageNames.has(dependency) &&
          !allowedExternalDependencies.has(dependency)
        ) {
          failures.push(
            `${packageFile} adds dependency ${dependency} outside the frozen Day 3 dependency set`,
          );
        }
        if (isDayOneForbiddenDependency(dependency)) {
          failures.push(
            `${packageFile} installs a Day 4/5 Headless or shadcn dependency during Day 3`,
          );
        }
      }
    }

    for (const lifecycleScript of [
      "preinstall",
      "install",
      "postinstall",
      "prepare",
      "prepublish",
      "prepublishOnly",
    ]) {
      if (Object.hasOwn(document.scripts ?? {}, lifecycleScript)) {
        failures.push(
          `${packageFile} must not add lifecycle script ${lifecycleScript} during Day 3`,
        );
      }
    }
  }

  const foundationsPackage = loadPackage("packages/foundations/package.json");
  assertExact("Foundations source exports during Day 3", foundationsPackage?.exports, {
    ".": "./src/index.ts",
    "./tokens.css": "./src/tokens.css",
    "./typography.css": "./src/typography.css",
    "./motion.css": "./src/motion.css",
    "./focus.css": "./src/focus.css",
  });
  const uiPackage = loadPackage("packages/ui/package.json");
  assertExact("Core UI source exports", uiPackage?.exports, {
    ".": "./src/index.ts",
    "./styles.css": "./src/styles.css",
  });

  try {
    assertExact(
      "Day 3 pnpm lockfile importers",
      parsePnpmLockfileImporters(
        readFileSync(join(workspaceRoot, "pnpm-lock.yaml"), "utf8"),
      ).sort(),
      [".", "apps/playground", "packages/foundations", "packages/ui"].sort(),
    );
  } catch (error) {
    failures.push(`Day 3 pnpm lockfile cannot be audited: ${error.message}`);
  }

  const allowedDayThreeApplicationSources = new Set(
    [
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/docs/foundations-page.tsx",
      "apps/playground/src/docs/foundations-page.test.tsx",
      "apps/playground/src/docs/components/core-ui-page.tsx",
      "apps/playground/src/docs/components/core-ui-page.test.tsx",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  for (const filePath of applicationSources) {
    if (!allowedDayThreeApplicationSources.has(filePath)) {
      failures.push(
        `application implementation outside the Day 3 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }
    const source = readFileSync(filePath, "utf8");
    if (/<(?:nav|aside)\b/i.test(source)) {
      failures.push(
        `persistent navigation or platform sidebar found in ${relative(workspaceRoot, filePath)}`,
      );
    }
    if (
      /(?:from\s+|import\s*)["'][^"']*(?:shadcn|radix-ui|@base-ui)/.test(
        source,
      )
    ) {
      failures.push(
        `unapproved external component import found in ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  const expectedAppFiles = [
    "apps/playground/index.html",
    "apps/playground/package.json",
    "apps/playground/tsconfig.json",
    "apps/playground/vite.config.ts",
    "apps/playground/src/app.tsx",
    "apps/playground/src/main.tsx",
    "apps/playground/src/styles.css",
    "apps/playground/src/benchmarks/.gitkeep",
    "apps/playground/src/docs/benchmark-index.ts",
    "apps/playground/src/docs/evidence-index.ts",
    "apps/playground/src/docs/foundations-page.test.tsx",
    "apps/playground/src/docs/foundations-page.tsx",
    "apps/playground/src/docs/components/core-ui-page.test.tsx",
    "apps/playground/src/docs/components/core-ui-page.tsx",
    "apps/playground/src/experiments/headless/.gitkeep",
    "apps/playground/src/routes/overview-page.tsx",
    "apps/playground/src/routes/playground-shell.test.tsx",
    "apps/playground/src/routes/route-registry.ts",
  ].sort();
  assertExact(
    "complete Day 3 app file allowlist",
    collectFiles(join(workspaceRoot, "apps"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    expectedAppFiles,
  );

  const expectedFoundationsFiles = [
    "packages/foundations/package.json",
    "packages/foundations/tsconfig.json",
    "packages/foundations/src/density.test.tsx",
    "packages/foundations/src/density.tsx",
    "packages/foundations/src/focus.css",
    "packages/foundations/src/index.ts",
    "packages/foundations/src/motion.css",
    "packages/foundations/src/token-contract.test.ts",
    "packages/foundations/src/token-contract.ts",
    "packages/foundations/src/tokens.css",
    "packages/foundations/src/typography.css",
  ].sort();
  assertExact(
    "complete Day 3 Foundations file allowlist",
    collectFiles(join(workspaceRoot, "packages/foundations"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    expectedFoundationsFiles,
  );

  const expectedUiFiles = [
    "packages/ui/package.json",
    "packages/ui/tsconfig.json",
    "packages/ui/src/index.ts",
    "packages/ui/src/styles.css",
    "packages/ui/src/button/button.tsx",
    "packages/ui/src/button/button.test.tsx",
    "packages/ui/src/input/input.tsx",
    "packages/ui/src/input/input.test.tsx",
    "packages/ui/src/tag/tag.tsx",
    "packages/ui/src/badge/badge.tsx",
    "packages/ui/src/tag/tag-badge.test.tsx",
    "packages/ui/src/surface/surface.tsx",
    "packages/ui/src/card/card.tsx",
    "packages/ui/src/surface/surface-card.test.tsx",
  ].sort();
  assertExact(
    "complete Day 3 Core UI file allowlist",
    collectFiles(join(workspaceRoot, "packages/ui"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    expectedUiFiles,
  );

  for (const blockedDirectory of [
    "packages/layouts",
    "apps/playground/src/benchmarks",
    "apps/playground/src/experiments/headless",
    "docs/adr",
    "manifests",
    "registry",
  ]) {
    const directoryPath = join(workspaceRoot, blockedDirectory);
    const directoryFiles = collectFiles(directoryPath);
    const placeholderPath = join(directoryPath, ".gitkeep");
    if (
      directoryFiles.length !== 1 ||
      directoryFiles[0] !== placeholderPath ||
      statSync(placeholderPath).size !== 1 ||
      readFileSync(placeholderPath, "utf8") !== "\n"
    ) {
      failures.push(
        `${blockedDirectory} must remain a canonical empty placeholder during Day 3`,
      );
    }
  }

  const expectedDayThreeEvidenceFiles = [
    "evidence/runtime/day-3/README.md",
    "evidence/runtime/day-3/core-ui-page.png",
    "evidence/runtime/day-3/red-green-summary.md",
  ].sort();
  assertExact(
    "Day 3 runtime evidence allowlist",
    collectFiles(join(workspaceRoot, "evidence/runtime/day-3"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    expectedDayThreeEvidenceFiles,
  );

  const dayThreeScreenshotPath = join(
    workspaceRoot,
    "evidence/runtime/day-3/core-ui-page.png",
  );
  const dayThreeEvidenceReadmePath = join(
    workspaceRoot,
    "evidence/runtime/day-3/README.md",
  );
  try {
    const screenshotStat = lstatSync(dayThreeScreenshotPath);
    if (!screenshotStat.isFile() || screenshotStat.isSymbolicLink()) {
      failures.push("Day 3 Core UI screenshot must be a regular, non-symlink file");
    } else {
      const screenshotBuffer = readFileSync(dayThreeScreenshotPath);
      if (screenshotBuffer.length < 100_000) {
        failures.push(
          `Day 3 Core UI screenshot is anomalously small: ${screenshotBuffer.length} bytes`,
        );
      }
      const screenshotMetadata = inspectPngMetadata(screenshotBuffer);
      if (screenshotMetadata.width < 1_200 || screenshotMetadata.height < 800) {
        failures.push(
          `Day 3 Core UI screenshot dimensions are too small: ${screenshotMetadata.width}x${screenshotMetadata.height}`,
        );
      }

      const actualScreenshotHash = createHash("sha256")
        .update(screenshotBuffer)
        .digest("hex");
      const evidenceReadme = readFileSync(dayThreeEvidenceReadmePath, "utf8");
      const recordedSizeMatches = [
        ...evidenceReadme.matchAll(/^  - 文件大小：`([1-9]\d*) bytes`$/gm),
      ];
      if (recordedSizeMatches.length !== 1) {
        failures.push(
          "Day 3 runtime evidence README must record exactly one Core UI screenshot byte size",
        );
      } else if (Number(recordedSizeMatches[0][1]) !== screenshotBuffer.length) {
        failures.push("Day 3 Core UI screenshot byte size does not match its README");
      }
      const recordedHashMatches = [
        ...evidenceReadme.matchAll(/^  - SHA-256：`([a-f0-9]{64})`$/gm),
      ];
      if (recordedHashMatches.length !== 1) {
        failures.push(
          "Day 3 runtime evidence README must record exactly one Core UI screenshot SHA-256",
        );
      } else if (recordedHashMatches[0][1] !== actualScreenshotHash) {
        failures.push("Day 3 Core UI screenshot SHA-256 does not match its README");
      }
    }
  } catch (error) {
    failures.push(`Day 3 Core UI screenshot cannot be audited: ${error.message}`);
  }

  assertExact(
    "Day 3 plan document allowlist",
    collectFiles(join(workspaceRoot, "docs/plans"))
      .map((filePath) => relative(workspaceRoot, filePath))
      .sort(),
    [
      "docs/plans/2026-09-01-day-0-bootstrap.md",
      "docs/plans/2026-09-01-day-2-1-focus-color-correction-design.md",
      "docs/plans/2026-09-01-day-2-1-focus-color-correction-implementation.md",
      "docs/plans/2026-09-01-day-3-core-ui-design.md",
      "docs/plans/2026-09-01-foundation-spike-implementation.md",
    ].sort(),
  );

  const allowedDayThreeWorkspaceSources = new Set(
    [
      "apps/playground/vite.config.ts",
      "apps/playground/index.html",
      "apps/playground/src/main.tsx",
      "apps/playground/src/app.tsx",
      "apps/playground/src/styles.css",
      "apps/playground/src/docs/evidence-index.ts",
      "apps/playground/src/docs/benchmark-index.ts",
      "apps/playground/src/docs/foundations-page.tsx",
      "apps/playground/src/docs/foundations-page.test.tsx",
      "apps/playground/src/docs/components/core-ui-page.tsx",
      "apps/playground/src/docs/components/core-ui-page.test.tsx",
      "apps/playground/src/routes/route-registry.ts",
      "apps/playground/src/routes/overview-page.tsx",
      "apps/playground/src/routes/playground-shell.test.tsx",
      "packages/foundations/src/index.ts",
      "packages/foundations/src/tokens.css",
      "packages/foundations/src/token-contract.ts",
      "packages/foundations/src/token-contract.test.ts",
      "packages/foundations/src/typography.css",
      "packages/foundations/src/density.tsx",
      "packages/foundations/src/density.test.tsx",
      "packages/foundations/src/motion.css",
      "packages/foundations/src/focus.css",
      "packages/ui/src/index.ts",
      "packages/ui/src/styles.css",
      "packages/ui/src/button/button.tsx",
      "packages/ui/src/button/button.test.tsx",
      "packages/ui/src/input/input.tsx",
      "packages/ui/src/input/input.test.tsx",
      "packages/ui/src/tag/tag.tsx",
      "packages/ui/src/badge/badge.tsx",
      "packages/ui/src/tag/tag-badge.test.tsx",
      "packages/ui/src/surface/surface.tsx",
      "packages/ui/src/card/card.tsx",
      "packages/ui/src/surface/surface-card.test.tsx",
      "playwright.config.ts",
      "vitest.config.ts",
      "scripts/verification-helpers.mjs",
      "scripts/verification-helpers.test.ts",
      "scripts/verify-workspace.mjs",
      "scripts/verify-evidence.mjs",
      "scripts/verify-boundaries.mjs",
      "tests/setup.ts",
      "tests/node-runtime.d.ts",
      "tests/color-contrast.test.ts",
      "tests/e2e/color-contrast.ts",
      "tests/e2e/playground-shell.spec.ts",
      "tests/e2e/foundations.spec.ts",
      "tests/e2e/core-ui.spec.ts",
    ].map((filePath) => join(workspaceRoot, filePath)),
  );
  const workspaceSources = collectFiles(workspaceRoot).filter((filePath) =>
    /\.(?:[cm]?[jt]sx?|astro|css|html|mdx|svelte|svg|vue)$/.test(filePath),
  );
  for (const filePath of workspaceSources) {
    if (!allowedDayThreeWorkspaceSources.has(filePath)) {
      failures.push(
        `source file outside the complete Day 3 allowlist: ${relative(workspaceRoot, filePath)}`,
      );
    }
  }

  try {
    const testsTypeConfig = JSON.parse(
      readFileSync(join(workspaceRoot, "tsconfig.tests.json"), "utf8"),
    );
    assertExact("Day 3 test typecheck config", testsTypeConfig, {
      extends: "./tsconfig.base.json",
      compilerOptions: {
        allowJs: true,
        checkJs: false,
        jsx: "react-jsx",
        lib: ["ES2022", "DOM", "DOM.Iterable"],
        noEmit: true,
        types: ["vite/client"],
      },
      include: [
        "apps/**/*.test.ts",
        "apps/**/*.test.tsx",
        "packages/**/*.test.ts",
        "packages/**/*.test.tsx",
        "tests/**/*.ts",
        "scripts/**/*.test.ts",
        "playwright.config.ts",
        "vitest.config.ts",
      ],
    });
  } catch (error) {
    failures.push(`tsconfig.tests.json cannot be audited: ${error.message}`);
  }

  const fontFiles = collectFiles(workspaceRoot).filter((filePath) =>
    /\.(?:otf|ttc|ttf|woff2?)$/i.test(filePath),
  );
  if (fontFiles.length > 0) {
    failures.push(
      `font files are not authorized in Day 3: ${fontFiles
        .map((filePath) => relative(workspaceRoot, filePath))
        .join(", ")}`,
    );
  }

  for (const filePath of uiRuntimeSources) {
    const source = readFileSync(filePath, "utf8");
    if (
      /(?:from\s+|import\s*)["'][^"']*(?:shadcn|radix-ui|@base-ui)/.test(
        source,
      )
    ) {
      failures.push(
        `unapproved Headless or shadcn import found in ${relative(workspaceRoot, filePath)}`,
      );
    }
  }
  for (const filePath of foundationsRuntimeSources) {
    const source = readFileSync(filePath, "utf8");
    const reverseDependency = findUiReverseDependency(filePath, source);
    if (reverseDependency) {
      failures.push(
        `Foundations reverses the dependency direction in ${relative(workspaceRoot, filePath)} via import ${JSON.stringify(reverseDependency)}`,
      );
    }
  }

  try {
    const gitRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (gitRoot !== workspaceRoot) {
      failures.push(`Git root must be the spike workspace, received ${gitRoot}`);
    }
  } catch (error) {
    failures.push(`Git workspace cannot be audited: ${error.message}`);
  }

  let hasLocalCommit = false;
  try {
    execFileSync("git", ["rev-parse", "--verify", "HEAD"], {
      cwd: workspaceRoot,
      stdio: "ignore",
    });
    hasLocalCommit = true;
  } catch {
    hasLocalCommit = false;
  }
  if (hasLocalCommit) {
    failures.push(
      "Git has a local HEAD commit while Day 3 localGitCommit is not-created",
    );
  }

  try {
    const remotes = execFileSync("git", ["remote"], {
      cwd: workspaceRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
      .trim()
      .split(/\r?\n/)
      .filter(Boolean);
    if (remotes.length > 0) {
      failures.push(
        `Git has configured remotes while Day 3 remoteGit is not-configured: ${remotes.join(", ")}`,
      );
    }
  } catch (error) {
    failures.push(`Git remotes cannot be audited: ${error.message}`);
  }
}

const sharedPackageSources = collectFiles(join(workspaceRoot, "packages")).filter(
  (filePath) => /\.(?:[cm]?[jt]sx?|json|css)$/.test(filePath),
);

for (const filePath of sharedPackageSources) {
  const source = readFileSync(filePath, "utf8");
  if (
    source.includes("@rain-next/playground") ||
    source.includes("apps/playground") ||
    source.includes("/benchmarks/")
  ) {
    failures.push(
      `shared package reverses the dependency direction in ${relative(workspaceRoot, filePath)}`,
    );
  }
}

if (failures.length > 0) {
  console.error("Boundary verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exitCode = 1;
} else {
  console.log(
    `Boundary verification passed for ${phaseId}: ${packageFiles.length} package manifests, ${applicationSources.length} application sources, ${sharedPackageSources.length} shared-package sources; fail-closed dependency, lifecycle, full-source allowlist, and blocked-layer restrictions applied.`,
  );
}
