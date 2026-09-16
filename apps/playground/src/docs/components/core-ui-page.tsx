import { useState, type ReactNode } from "react";

import { DensityProvider } from "@rain-next/foundations";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Surface,
  Tag,
} from "@rain-next/ui";

type ContractItem = {
  label:
    | "Use when"
    | "Do not use when"
    | "Anatomy"
    | "Accessibility"
    | "Visual lineage"
    | "Modification boundary";
  value: ReactNode;
};

function FamilyContract({ items }: { items: readonly ContractItem[] }) {
  return (
    <dl className="family-contract" data-slot="family-contract">
      {items.map((item) => (
        <div className="family-contract__item" key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function FamilyHeading({
  index,
  title,
  summary,
}: {
  index: string;
  title: string;
  summary: string;
}) {
  return (
    <header className="core-family__heading">
      <span className="core-family__index">{index}</span>
      <div>
        <h2>{title}</h2>
        <p>{summary}</p>
      </div>
      <span className="maturity-chip">prototype-ready</span>
    </header>
  );
}

export function CoreUiPage() {
  const [showManagedTag, setShowManagedTag] = useState(true);

  return (
    <main
      className="core-ui-shell"
      data-asset-identity="local-experiment"
      data-maturity="prototype-ready"
      data-rain-id="core-ui-page"
      data-slot="component-document"
    >
      <header className="core-ui-hero" data-slot="component-hero">
        <a className="back-link" data-focus="item" href="#overview">
          返回 Playground
        </a>
        <div className="core-ui-hero__grid">
          <div>
            <p className="eyebrow">RAIN NEXT · SYSTEM MODE · DAY 3</p>
            <h1 id="core-ui-title" tabIndex={-1}>
              Core UI，先把高频动作做准
            </h1>
            <p className="core-ui-lead rain-type-reading">
              四个家族先证明品牌、密度、状态和键盘合同能共用一套语义。
              它们是可复用方向的本地实验，不是已登记或发布组件。
            </p>
          </div>
          <dl className="core-ui-summary" aria-label="Core UI 批次摘要">
            <div>
              <dt>Families</dt>
              <dd>04</dd>
            </div>
            <div>
              <dt>Modes</dt>
              <dd>02</dd>
            </div>
            <div>
              <dt>Headless deps</dt>
              <dd>00</dd>
            </div>
            <div>
              <dt>Human Gate</dt>
              <dd className="core-ui-summary__text">NOT EVALUATED</dd>
            </div>
          </dl>
        </div>
      </header>

      <section
        className="core-family"
        data-rain-id="core-ui-button"
        data-slot="component-family"
      >
        <FamilyHeading
          index="01"
          title="Button"
          summary="主次层级是任务决策，Loading 和 Disabled 是真实行为。"
        />
        <div className="family-layout">
          <div className="component-stage" data-slot="component-preview">
            <div className="stage-caption">
              <span>VARIANTS</span>
              <small>Default density</small>
            </div>
            <DensityProvider
              className="component-row"
              density="default"
              rainId="core-button-variants"
            >
              <Button variant="primary">创建课程</Button>
              <Button variant="secondary">保存草稿</Button>
              <Button variant="ghost">查看详情</Button>
              <Button variant="danger">删除课程</Button>
            </DensityProvider>
            <div className="stage-rule" />
            <div className="stage-caption">
              <span>STATES + DENSITY</span>
              <small>同一实现</small>
            </div>
            <div className="component-row">
              <Button aria-label="正在保存" loading variant="primary">
                保存中
              </Button>
              <Button disabled variant="secondary">
                已停用
              </Button>
              <DensityProvider density="compact" rainId="core-button-compact">
                <Button variant="secondary">紧凑筛选</Button>
              </DensityProvider>
              <DensityProvider density="default" rainId="core-button-default">
                <Button variant="secondary">默认筛选</Button>
              </DensityProvider>
            </div>
          </div>
          <FamilyContract
            items={[
              { label: "Use when", value: "触发明确的单步业务动作。" },
              { label: "Do not use when", value: "页面导航或无动作的状态文字。" },
              { label: "Anatomy", value: "Root / Label / Loading indicator" },
              { label: "Accessibility", value: "Native button、busy/disabled、focus-visible。" },
              { label: "Visual lineage", value: "VE-001 筛选工具栏与主操作层级。" },
              { label: "Modification boundary", value: "可组合内容；不覆盖品牌、Focus 或密度 recipe。" },
            ]}
          />
        </div>
      </section>

      <section
        className="core-family"
        data-rain-id="core-ui-input"
        data-slot="component-family"
      >
        <FamilyHeading
          index="02"
          title="Input"
          summary="Field 语义保持完整，Focus 继承原稿的细品牌边框和轻 halo。"
        />
        <div className="family-layout">
          <div className="component-stage component-stage--fields" data-slot="component-preview">
            <Input
              clearable
              description="最多输入 30 个字"
              label="课程名称"
              placeholder="输入课程名称"
            />
            <Input
              defaultValue="BK-2026-001"
              errorMessage="该编号已存在，请检查后重试"
              label="教材编号"
            />
            <Input
              defaultValue="仅用于教学班"
              label="使用范围"
              readOnly
            />
            <Input
              disabled
              label="同步来源"
              placeholder="等待授权"
            />
            <Input
              endAdornment={<span>学分</span>}
              label="课程学分"
              startAdornment={<span>建议</span>}
            />
          </div>
          <FamilyContract
            items={[
              { label: "Use when", value: "收集短文本、编号或可编辑单值。" },
              { label: "Do not use when", value: "选择集合、长文本或自动完成查询。" },
              { label: "Anatomy", value: "Field / Label / Control / Adornment / Description / Message" },
              { label: "Accessibility", value: "Label、describedby、invalid、disabled/read-only 保持原生语义。" },
              { label: "Visual lineage", value: "VE-014 的表单分组、清除、禁用与激活边界。" },
              { label: "Modification boundary", value: "可插入语义 Adornment；不把搜索或业务状态写入基础 API。" },
            ]}
          />
        </div>
      </section>

      <section
        className="core-family"
        data-rain-id="core-ui-tag-badge"
        data-slot="component-family"
      >
        <FamilyHeading
          index="03"
          title="Tag / Badge"
          summary="Tag 是可管理属性，Badge 是静态信息；两者不混用交互身份。"
        />
        <div className="family-layout">
          <div className="component-stage" data-slot="component-preview">
            <div className="stage-caption">
              <span>MANAGED TAGS</span>
              <small>文字操作，无临时图标</small>
            </div>
            <div className="component-row">
              {showManagedTag ? (
                <div data-testid="removable-tag-fixture">
                  <Tag onRemove={() => setShowManagedTag(false)} variant="neutral">
                    专业必修
                  </Tag>
                </div>
              ) : null}
              <Tag data-testid="static-tag-fixture" variant="info">
                课堂资料
              </Tag>
              <Tag disabled onRemove={() => undefined} variant="neutral">
                已锁定
              </Tag>
            </div>
            <div className="stage-rule" />
            <div className="stage-caption">
              <span>STATUS BADGES</span>
              <small>颜色 + 文字双重表达</small>
            </div>
            <div className="component-row">
              <Badge variant="neutral">待开始</Badge>
              <Badge variant="info">进行中</Badge>
              <Badge variant="success">已发布</Badge>
              <Badge variant="warning">需复核</Badge>
              <Badge variant="error">失败</Badge>
            </div>
            <div className="stage-rule" />
            <div className="stage-caption">
              <span>COMPACT DENSITY</span>
              <small>同一公开实现</small>
            </div>
            <DensityProvider
              className="component-row"
              density="compact"
              rainId="core-tag-badge-compact"
            >
              <Tag data-testid="compact-tag-fixture" variant="neutral">
                紧凑标签
              </Tag>
              <Badge variant="success">紧凑状态</Badge>
            </DensityProvider>
          </div>
          <FamilyContract
            items={[
              { label: "Use when", value: "表达对象属性、分类或稳定状态。" },
              { label: "Do not use when", value: "承担主操作、导航或无文字图标按钮。" },
              { label: "Anatomy", value: "Tag: label / remove action; Badge: status label" },
              { label: "Accessibility", value: "可移除 Tag 使用真实 button；Badge 不进入 Tab 序。" },
              { label: "Visual lineage", value: "VE-001 的筛选标签、状态信息与紧凑密度。" },
              { label: "Modification boundary", value: "可换文案与已登记状态；不自建类别色或伪造 AI 语义。" },
            ]}
          />
        </div>
      </section>

      <section
        className="core-family"
        data-rain-id="core-ui-surface-card"
        data-slot="component-family"
      >
        <FamilyHeading
          index="04"
          title="Surface / Card"
          summary="Surface 定义承载层级，Card 只在独立对象需要明确边界时出现。"
        />
        <div className="family-layout">
          <div className="component-stage" data-slot="component-preview">
            <div className="surface-strip">
              <Surface variant="page">Page</Surface>
              <Surface variant="panel">Panel</Surface>
              <Surface variant="raised">Raised</Surface>
            </div>
            <div className="card-grid">
              <Card>
                <CardHeader>
                  <CardTitle>课程资源包</CardTitle>
                  <CardDescription>课程资料 · 24 个文件</CardDescription>
                </CardHeader>
                <CardContent>最近更新：今天 09:30</CardContent>
                <CardFooter>归属：专业必修</CardFooter>
              </Card>
              <Card variant="raised">
                <CardHeader>
                  <CardTitle>课堂回顾</CardTitle>
                  <CardDescription>待完成 3 项</CardDescription>
                </CardHeader>
                <CardContent>独立对象内容保持清晰的阅读节奏。</CardContent>
              </Card>
            </div>
          </div>
          <FamilyContract
            items={[
              { label: "Use when", value: "划分任务表面，或展示可独立识别的对象。" },
              { label: "Do not use when", value: "仅为获得间距或把每个布局区块装进 Card。" },
              { label: "Anatomy", value: "Surface; Card / Header / Title / Description / Content / Footer" },
              { label: "Accessibility", value: "保留语义根节点；Card 本身不伪装成按钮。" },
              { label: "Visual lineage", value: "VE-002、VE-005 与 VE-008 的对象 Card 与阅读表面。" },
              { label: "Modification boundary", value: "可组合 Parts；不覆盖表面、圆角、阴影或把 Card 当 Layout。" },
            ]}
          />
        </div>
      </section>

      <footer className="core-ui-boundary" data-slot="lifecycle-boundary">
        <strong>生命周期边界</strong>
        <span>
          Implementation: Day 3 Task 4 · Human Gate: not-evaluated · Figma / Registry / Package:
          not-authorized
        </span>
      </footer>
    </main>
  );
}
