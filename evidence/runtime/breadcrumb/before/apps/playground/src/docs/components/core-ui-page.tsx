import { useState, type ReactNode } from "react";

import { DensityProvider } from "@rain-next/foundations";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FormItem,
  Input,
  InputNumber,
  Link,
  Select,
  Surface,
  Tag,
} from "@rain-next/ui";

type ContractItem = {
  label:
    | "适合用在"
    | "不适合"
    | "外观与状态"
    | "密度"
    | "结构"
    | "无障碍"
    | "参考成熟库"
    | "Rain 来源"
    | "修改边界";
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
  maturity = "prototype-ready",
  summary,
  title,
}: {
  index: string;
  maturity?: "prototype-ready" | "registry-candidate";
  summary: string;
  title: string;
}) {
  return (
    <header className="core-family__heading">
      <span className="core-family__index">{index}</span>
      <div>
        <h2>{title}</h2>
        <p>{summary}</p>
      </div>
      <span className="maturity-chip">{maturity}</span>
    </header>
  );
}

export function CoreUiPage() {
  const [actionCount, setActionCount] = useState(0);
  const [courseName, setCourseName] = useState("");
  const [showTag, setShowTag] = useState(true);

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
            <p className="eyebrow">RAIN NEXT · COMPONENT OVERVIEW</p>
            <h1 id="core-ui-title" tabIndex={-1}>
              Core UI，把高频动作先做准
            </h1>
            <p className="core-ui-lead rain-type-reading">
              这里展示六个可运行的基础家族。Input 与 Select 各有一个完整用法入口，
              当前运行视觉已确认，组件仍为未发布的本地候选。
            </p>
            <Link href="#checkbox">查看 Checkbox 与分组表单</Link>
            <Link href="#selection-playground">打开分类选择 Playground 与源码检索</Link>
            <Link href="#radio">查看 Radio 与单选分组</Link>
            <Link href="#selection-cards">查看四类选择卡片</Link>
            <Link href="#selection-patterns">体验预览、关联字段与本页全选</Link>
            <Link href="#dropdown">查看 DropdownMenu 与 Popover</Link>
          </div>
          <dl className="core-ui-summary" aria-label="Core UI 批次摘要">
            <div>
              <dt>Families</dt>
              <dd>06</dd>
            </div>
            <div>
              <dt>Densities</dt>
              <dd>02</dd>
            </div>
            <div>
              <dt>Publication</dt>
              <dd>未发布</dd>
            </div>
            <div>
              <dt>Human Gate</dt>
              <dd className="core-ui-summary__text">分批验收</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="core-family" data-rain-id="core-ui-button" data-slot="component-family">
        <FamilyHeading
          index="01"
          summary="操作层级与危险意图分开；Loading 保持可聚焦，但不会重复触发。"
          title="Button"
        />
        <p><Link href="#text-button">体验 TextButton 文字按钮</Link> · <Link href="#button-tokens">查看新 Token 按钮与尺寸对照</Link> · <Link href="#icon-button">体验 IconButton 图标按钮</Link> · <Link href="#question-number">体验 QuestionNumber 题号按钮</Link> · <Link href="#option-button">体验 OptionButton 选项按钮</Link></p>
        <p>当前按钮 Token 配方已完成限定范围的视觉验收，危险文字的精确对比度例外继续保留。危险主按钮使用红底反白，悬停加深；加载仅背景与边框保留 82%，文字和图标保持原色。禁用保留各自色系与原有淡化。</p>
        <div className="family-layout">
          <div className="component-stage button-stage" data-slot="component-preview">
            <div className="button-demo-group" data-button-demo="hierarchy">
              <div className="stage-caption">
                <span>三级操作层级</span>
                <small>36px 是常用默认</small>
              </div>
              <DensityProvider className="component-row" density="default" rainId="core-button-default">
                <Button variant="primary" onClick={() => setActionCount((count) => count + 1)}>
                  创建课程
                </Button>
                <Button variant="secondary">继续编辑</Button>
                <Button variant="tertiary">保存草稿</Button>
              </DensityProvider>
              <output className="interaction-output" data-testid="button-action-count">
                主操作已触发 {actionCount} 次
              </output>
            </div>

            <div className="button-demo-group" data-button-demo="sizes">
              <div className="stage-caption">
                <span>五档高度</span>
                <small>28 / 32 / 36 / 40 / 48</small>
              </div>
              <div className="component-row component-row--baseline">
                <Button size="mini">28 · Mini</Button>
                <Button size="small">32 · Small</Button>
                <Button size="medium">36 · Medium</Button>
                <Button size="large">40 · Large</Button>
                <Button size="xl">48 · XL</Button>
                <DensityProvider density="compact" rainId="core-button-compact">
                  <Button>紧凑筛选</Button>
                </DensityProvider>
              </div>
              <p className="stage-note">
                36 是大多数页面的最大常用尺寸；40 只用于按钮很多的页面级操作区；48 只用于极少数大型重要操作。
              </p>
            </div>

            <div className="button-demo-group" data-button-demo="danger">
              <div className="stage-caption">
                <span>危险操作也有三级</span>
                <small>红色已通过本次 Button 视觉验收</small>
              </div>
              <div className="component-row">
                <Button tone="danger" variant="tertiary">删除课程</Button>
                <Button tone="danger" variant="secondary">移出班级</Button>
                <Button tone="danger" variant="primary">确认永久删除</Button>
              </div>
              <p className="stage-note">普通页面里的删除使用低强调红；只有最终确认中的关键危险动作使用实心红。</p>
            </div>

            <div className="button-demo-group" data-button-demo="loading">
              <div className="stage-caption">
                <span>加载中</span>
                <small>沿用 Rain 的统一图形与旋转动效</small>
              </div>
              <div className="component-row">
                <Button aria-label="保存课程，正在处理" loading variant="primary">保存课程</Button>
                <Button loading loadingLabel="保存中…" variant="secondary">保存教材</Button>
                <Button loading tone="danger" variant="tertiary">清理记录</Button>
              </div>
              <p className="stage-note">默认保留原文案；业务确有必要时才明确换成“保存中…”一类进度文案。</p>
            </div>

            <div className="button-demo-group" data-button-demo="disabled">
              <div className="stage-caption">
                <span>停用</span>
                <small>保留原层级，不压成同一种灰</small>
              </div>
              <div className="component-row">
                <Button disabled variant="primary">主按钮停用</Button>
                <Button disabled variant="secondary">次按钮停用</Button>
                <Button disabled variant="tertiary">三级按钮停用</Button>
                <Button disabled tone="danger" variant="tertiary">危险按钮停用</Button>
              </div>
            </div>

            <div className="button-demo-group" data-button-demo="focus-states">
              <div className="stage-caption">
                <span>真实悬停、按下与键盘外圈</span>
                <small>用鼠标操作，或按 Tab 逐个体验</small>
              </div>
              <div className="component-row">
                <Button variant="primary">体验悬停和按下</Button>
                <Button variant="secondary">用 Tab 查看焦点</Button>
                <Button tone="danger" variant="tertiary">危险操作也用蓝色焦点</Button>
              </div>
              <p className="stage-note">反馈状态不位移；键盘焦点使用已确认的深色细圈与浅色外圈，颜色和几何由共享 Focus 配方提供。</p>
            </div>

            <div className="button-demo-group" data-button-demo="width-and-label">
              <div className="stage-caption">
                <span>宽度与长文案</span>
                <small>全宽必须显式开启</small>
              </div>
              <div className="button-width-grid">
                <div className="button-width-example">
                  <small>自然宽度</small>
                  <Button variant="secondary">为本课程批量生成课堂练习</Button>
                </div>
                <div className="button-width-example">
                  <small>窄栏整行</small>
                  <div className="button-demo-block-host" data-testid="button-block-host">
                    <Button block variant="primary">窄栏中的整行主要操作</Button>
                  </div>
                </div>
                <div className="button-width-example">
                  <small>严格受限时才省略，完整文案保留在 title</small>
                  <div className="button-demo-constrained">
                    <Button
                      block
                      title="为本课程批量生成全部章节的课堂练习"
                      variant="tertiary"
                    >
                      为本课程批量生成全部章节的课堂练习
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FamilyContract items={[
            { label: "适合用在", value: "触发一个明确动作，例如保存、创建、删除。" },
            { label: "不适合", value: "页面导航、纯图标动作、状态文字或整张卡片点击。纯图标动作留给 IconButton。" },
            { label: "外观与状态", value: "Primary / Secondary / Tertiary 与 Default / Danger 分开组合；含 Hover、Pressed、Loading、Disabled、Focus。" },
            { label: "密度", value: "五档为 28 / 32 / 36 / 40 / 48；未指定时 Compact 使用 32、Default 使用 36。" },
            { label: "结构", value: "Root / Leading / Label / Trailing / Loading indicator。" },
            { label: "无障碍", value: "原生按钮且必须有可见文字；Loading 可聚焦并阻止重复操作；Danger 的焦点仍是品牌蓝。" },
            { label: "参考成熟库", value: "学习 shadcn/ui 的组合清晰度，学习 Ant Design 的完整状态覆盖。" },
            { label: "Rain 来源", value: "复用 Button + TextButton 的视觉层级、五档尺寸依据和全局加载图形；40 档沿用 Rain Next 已确认的按钮尺寸。" },
            { label: "修改边界", value: "可换文案和受治理图标；全宽需显式开启；不能把导航、确认流程或业务请求塞进 Button。" },
          ]} />
        </div>
      </section>

      <section className="core-family" data-rain-id="core-ui-input" data-slot="component-family">
        <FamilyHeading
          index="02"
          summary="一套完整输入框，支持描边、填充和底线外观。SearchInput 是同一家族的搜索快捷用法。"
          title="Input"
        />
        <div className="component-stage component-stage--fields" data-slot="component-preview">
          <FormItem id="core-course-name" label="课程名称">
            <Input
              placeholder="输入课程名称"
              onValueChange={setCourseName}
              value={courseName}
            />
          </FormItem>
          <div className="grid min-w-0 gap-rain-8">
            <p>四档尺寸、单位与前后文案、内部按钮、清空、计数和搜索集中在详情页。</p>
            <Link href="#input">查看 Input 全部用法</Link>
          </div>
        </div>
      </section>

      <section className="core-family" data-rain-id="core-ui-input-number" data-slot="component-family">
        <div className="core-family__intro"><h2>InputNumber 数字输入框</h2><p>数量与分值填写，左右增减、范围与小数校验，继承 Input 的三种外观。</p><Link href="#input-number">查看 InputNumber 全部用法</Link></div>
        <div className="component-stage component-stage--fields"><FormItem label="练习题数"><InputNumber defaultValue={3} min={0} suffixText="题" /></FormItem></div>
      </section>

      <section className="core-family" data-rain-id="core-ui-alert" data-slot="component-family">
        <div className="core-family__intro"><h2>Alert 提示</h2><p>持续的页面提示，四种状态、可组合内容与操作，保留 Rain 轻量视觉。</p><Link href="#alert">查看 Alert 全部用法</Link></div>
        <div className="component-stage"><Alert>成绩发布后，学生才能查看批改结果。</Alert></div>
      </section>

      <section className="core-family" data-rain-id="core-ui-tabs" data-slot="component-family">
        <div className="core-family__intro"><h2>Tabs 分区切换</h2><p>完整的导航与面板，三种外观、连续更多菜单，以及本页内容保留。</p><Link href="#tabs">查看 Tabs 全部用法</Link></div>
      </section>
      <section className="core-family" data-rain-id="core-ui-select" data-slot="component-family">
        <FamilyHeading
          index="03"
          maturity="registry-candidate"
          summary="一套选择器，通过单选、多选和可搜索组合覆盖不同选择需求。"
          title="Select"
        />
        <div className="component-stage component-stage--fields" data-slot="component-preview">
          <FormItem id="core-course-class" label="课程教学班">
            <Select options={[{ value: "a", label: "视传 2401" }, { value: "b", label: "数媒 2401" }]} defaultValue="a" />
          </FormItem>
          <div className="grid min-w-0 gap-rain-8">
            <p>选择方式、三种外观、摘要与标签、候选数据及表单草稿集中在详情页。</p>
            <Link href="#select">查看 Select 全部用法</Link>
          </div>
        </div>
      </section>

      <section className="core-family" data-rain-id="core-ui-tag-badge" data-slot="component-family">
        <Link href="#tag">查看 Tag 全配色、尺寸与交互</Link>
        <FamilyHeading
          index="04"
          summary="Tag 表示语义标签；Badge 只补充圆点、数量或极短标记。"
          title="Tag / Badge"
        />
        <div className="family-layout">
          <div className="component-stage" data-slot="component-preview">
            <div className="stage-caption">
              <span>Tag：静态或独立移除</span>
              <small>不是选择器或状态灯</small>
            </div>
            <div className="component-row">
              {showTag ? (
                <span data-testid="removable-tag-fixture">
                  <Tag appearance="outlined" onRemove={() => setShowTag(false)} tone="brand">重点</Tag>
                </span>
              ) : null}
              <Tag>补充</Tag>
              <Tag appearance="solid" tone="neutral">内部</Tag>
              <Tag disabled onRemove={() => undefined}>已锁定</Tag>
            </div>
            <div className="stage-rule" />
            <div className="stage-caption">
              <span>Badge：附着信息</span>
              <small>Dot / Count / Label</small>
            </div>
            <div className="badge-demo-row">
              <Badge tone="processing" type="dot">
                <span className="badge-demo-host" aria-label="王老师有新消息">王</span>
              </Badge>
              <Badge count={3} tone="info" type="count">
                <span
                  aria-label="资源更新，3 条更新"
                  className="badge-demo-resource"
                >
                  资源更新
                </span>
              </Badge>
              <Badge label="NEW" placement="standalone" tone="neutral" type="label" />
              <Badge count={120} max={99} placement="standalone" tone="error" type="count" />
            </div>
            <p className="stage-note">成功、警告、失败等命名状态不由普通 Badge 承担；它们留给后续 BadgeStatus / StatusIndicator。</p>
          </div>
          <FamilyContract items={[
            { label: "适合用在", value: "Tag 表达属性；Badge 为宿主补充变化、数量或短标记。" },
            { label: "不适合", value: "主操作、导航、选择器或命名系统状态。" },
            { label: "外观与状态", value: "Tag 有受限外观/色调；Badge 只有 Dot / Count / Label 与九种合法位置组合。" },
            { label: "密度", value: "Tag 跟随页面密度；Badge 的 Dot 固定，Count/Label 只有 Small/Medium。" },
            { label: "结构", value: "Tag: Label + Remove；Badge: Host + Indicator。" },
            { label: "无障碍", value: "Tag 根不聚焦；移除是独立按钮。Badge 不点击、不进入 Tab，宿主保留最终名称。" },
            { label: "参考成熟库", value: "学习 shadcn/ui 的小部件组合，学习 Ant Design 的 Badge 附着位置与计数完整度。" },
            { label: "Rain 来源", value: "复用 Classic Tag 与 Badge 的静态语义、独立移除、0 隐藏和 99+ 规则。" },
            { label: "修改边界", value: "七种教育业务标签已由 Tag 家族提供，完整用法见 Tag 页面；不开放任意颜色，也不把状态塞进 Badge。" },
          ]} />
        </div>
      </section>

      <section className="core-family" data-rain-id="core-ui-surface-card" data-slot="component-family">
        <FamilyHeading
          index="05"
          summary="Surface 只定义表面；Card 只在一个对象需要独立边界时出现。"
          title="Surface / Card"
        />
        <div className="family-layout">
          <div className="component-stage" data-slot="component-preview">
            <div className="surface-strip">
              <Surface variant="page">Page · 无卡片边界</Surface>
              <Surface variant="panel">Panel · 白色细边框</Surface>
              <Surface variant="raised">Raised · 抬高表面</Surface>
            </div>
            <div className="card-grid">
              <Link href="#card">查看 Card 完整用法与局部修改</Link>
              <Link href="#dialog">查看 Dialog 与 Separator</Link>
              <Link href="#layouts">查看布局与组合</Link>
              <Link href="#table">查看表格、分页与空态</Link>
              <Link href="#avatar">查看头像、成员组与头像图库</Link>
              <Card>
                <CardHeader>
                  <CardTitle as="h3">课程资源包</CardTitle>
                  <CardDescription>课程资料 · 24 个文件</CardDescription>
                  <CardAction>今天 09:30</CardAction>
                </CardHeader>
                <CardContent>一个可被独立识别、复用和操作的内容对象。</CardContent>
                <CardFooter>归属信息由业务页面提供</CardFooter>
              </Card>
              <Card variant="raised">
                <CardHeader>
                  <CardTitle as="h3">课堂回顾</CardTitle>
                  <CardDescription>阅读任务摘要</CardDescription>
                  <CardAction><Button size="mini" variant="tertiary">查看</Button></CardAction>
                </CardHeader>
                <CardContent>按钮保持独立焦点，整张 Card 不伪装成一个按钮。</CardContent>
              </Card>
            </div>
          </div>
          <FamilyContract items={[
            { label: "适合用在", value: "Surface 划分任务表面；Card 展示独立对象。" },
            { label: "不适合", value: "仅为了间距、滚动、页面宽度或把每块布局都装进卡片。" },
            { label: "外观与状态", value: "Surface: Page / Panel / Raised；Card: Panel / Raised。" },
            { label: "密度", value: "表面不制造控件尺寸；内部组件继续跟随所在密度。" },
            { label: "结构", value: "Card / Header / Title / Description / Action / Content / Footer。" },
            { label: "无障碍", value: "Card 默认是独立 article；标题级别由页面决定；整卡非交互。" },
            { label: "参考成熟库", value: "学习 shadcn/ui Card 的清晰 Parts，学习 Ant Design 后台对象卡的内容完整度。" },
            { label: "Rain 来源", value: "Card 按 shadcn 作者源码与 Nova 样式转译为 Rain；Surface 保留现有实现。视觉采用 Rain Token。" },
            { label: "修改边界", value: "Container 仍只管宽度与左右留白；滚动和布局不归 Surface/Card。" },
          ]} />
        </div>
      </section>

      <footer className="core-ui-boundary" data-slot="lifecycle-boundary">
        <strong>截至 2026-09-12 的验收摘要</strong>
        <span>Button / TextButton、Tag 分批外观、Tabs、Input / Select 及 Dropdown / Popover 已完成各自视觉验收；Badge / Surface / Card 仍按各自记录待验收。对比度与颜色用途问题单独保留，组件均未发布。</span>
      </footer>
    </main>
  );
}
