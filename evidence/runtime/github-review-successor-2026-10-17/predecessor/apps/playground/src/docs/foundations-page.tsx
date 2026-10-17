import {
  DensityProvider,
  densityMetrics,
  semanticColorGroups,
  semanticColorTokenEntries,
  typographyPresets,
  type SemanticColorGroup,
} from "@rain-next/foundations";

const groupOrder: readonly SemanticColorGroup[] = [
  "brand",
  "text",
  "surface",
  "border",
  "action",
  "selection",
  "focus",
  "semantic",
  "intelligence",
];

const {
  "ui-default": uiPreset,
  "reading-default": readingPreset,
  "data-default": dataPreset,
} = typographyPresets;

function DensityFixture({ density }: { density: "compact" | "default" }) {
  const label = density === "compact" ? "Compact" : "Default";

  return (
    <DensityProvider
      className="density-fixture"
      density={density}
      rainId={`foundation-density-${density}`}
    >
      <div className="density-fixture__label" data-slot="density-label">
        <strong>{label}</strong>
        <span>{densityMetrics[density].controlHeight} control</span>
      </div>
      <label className="fixture-field">
        <span>课程名称</span>
        <input
          aria-label={`${label} 课程名称`}
          aria-describedby="foundation-native-fixture-boundary"
          data-asset-identity="fixture-only"
          data-focus="control"
          placeholder="输入课程名称"
        />
      </label>
      <button
        className="fixture-native-action"
        aria-describedby="foundation-native-fixture-boundary"
        data-asset-identity="fixture-only"
        data-focus="control"
        type="button"
      >
        保存草稿
      </button>
    </DensityProvider>
  );
}

export function FoundationsPage() {
  return (
    <main
      className="foundation-shell"
      data-rain-id="foundations-page"
      data-slot="foundations-document"
    >
      <header className="foundation-hero" data-slot="foundations-hero">
        <a className="back-link" data-focus="item" href="#overview">
          返回 Playground
        </a>
        <div className="foundation-hero__content">
          <div>
            <p className="eyebrow">RAIN NEXT · FOUNDATIONS</p>
            <h1 id="foundations-title" tabIndex={-1}>
              Foundations，先让系统说同一种语言
            </h1>
            <p className="foundation-lead rain-type-reading">
              Foundations 是基础体系总入口，包含 Token、完整排版方案和使用规则。
              Token 定义基础值与用途，排版方案组合这些值，使用规则说明何时选用；Tailwind 提供它们的代码入口。
            </p>
            <p>
              <a className="back-link" data-focus="item" href="#token-foundations">
                查看 Token 目录与完整排版方案
              </a>
            </p>
            <p>下方查看现有组件兼容定义，以及字体、密度、键盘焦点与动效的使用规则。</p>
            <p><a className="back-link" data-focus="item" href="#icon-sizes">查看公共图标尺寸 IconSize</a></p>
          </div>
          <dl className="foundation-summary" aria-label="Foundations 合同摘要">
            <div>
              <dt>兼容语义色</dt>
              <dd>{semanticColorTokenEntries.length}</dd>
            </div>
            <div>
              <dt>完整排版方案</dt>
              <dd>{Object.keys(typographyPresets).length}</dd>
            </div>
            <div>
              <dt>Densities</dt>
              <dd>{Object.keys(densityMetrics).length}</dd>
            </div>
            <div>
              <dt>Focus roles</dt>
              <dd>03</dd>
            </div>
          </dl>
        </div>
      </header>

      <section
        className="foundation-section"
        aria-labelledby="colors-title"
        data-rain-id="foundation-semantic-colors"
        data-slot="semantic-colors"
      >
        <div className="foundation-section__heading">
          <div>
            <p className="section-index">01 / COLOR CONTRACT</p>
            <h2 id="colors-title">现有组件兼容区：语义色与使用边界</h2>
          </div>
          <p>
            {semanticColorTokenEntries.length} 个语义色保留原入口，其中 {semanticColorTokenEntries.filter((entry) => entry.categoryId).length} 项已按确认的用途共享新 Category 色源，下面显示 Light 数值与来源。
            其余保留原定义；紫色、青色与 AI 色系待补充。
          </p>
        </div>

        <div
          className="color-architecture"
          data-rain-id="foundation-color-architecture"
          data-slot="color-architecture"
        >
          <ol className="color-layer-list" aria-label="颜色 Token 来源与消费边界">
            <li data-slot="color-layer" data-variant="internal">
              <span className="color-layer__index">01</span>
              <div>
                <strong>Reference Palette</strong>
                <small>私有来源 · 不供页面或组件直接消费</small>
              </div>
            </li>
            <li data-slot="color-layer" data-variant="stable">
              <span className="color-layer__index">02</span>
              <div>
                <strong>Public Category</strong>
                <small>公共用途分类 · 文字、图标、填充等按资格直接使用</small>
              </div>
            </li>
            <li data-slot="color-layer" data-variant="on-demand">
              <span className="color-layer__index">03</span>
              <div>
                <strong>Semantic / Component</strong>
                <small>按需别名 · 稳定角色与组件状态需要时建立</small>
              </div>
            </li>
          </ol>
          <p>
            颜色相同不代表用途相同。公共 Category 可以直接使用，无需先增加 Semantic 别名；
            旧 Semantic 与新 Category 的对应关系也不能只靠色值判断。
          </p>
          <p>
            页面底默认 Background/Neutral/3，可按层级选择 /4；常规和轻分隔边界用 Border/Neutral/3，
            轻强调与 strong 默认用 /2，极重要边界才用 /1。
            成功、警告、错误、信息弱背景分别使用 Green、Orange、Red、Second 的 Alpha/2（10%）。
          </p>
          <p>
            来源对应不代表所有组件的可读性与主题表现都已验收。
            当前占位色 Text/Neutral/5 在白底约 3.708:1，尚未达到普通文字 4.5:1，需继续解决。
          </p>
        </div>

        <div className="token-groups">
          {groupOrder.map((groupName) => {
            const group = semanticColorGroups[groupName];
            const entries = semanticColorTokenEntries.filter(
              ({ category }) => category === groupName,
            );

            return (
              <article
                className="token-group"
                data-rain-id={`foundation-token-group-${groupName}`}
                data-slot="token-group"
                key={groupName}
              >
                <header className="token-group__header">
                  <div>
                    <span>{group.label}</span>
                    <strong>{String(entries.length).padStart(2, "0")}</strong>
                  </div>
                  <p>{group.description}</p>
                </header>
                <ul className="token-list">
                  {entries.map((entry) => (
                    <li
                      className="token-row"
                      data-rain-id={`foundation-token-${entry.name}`}
                      data-slot="semantic-token"
                      data-variant={entry.category}
                      key={entry.name}
                    >
                      <span
                        aria-label={`${entry.name} 色样`}
                        className={`token-swatch${
                          entry.value === "transparent" ? " is-transparent" : ""
                        }`}
                        style={
                          entry.value === "transparent"
                            ? undefined
                            : { background: entry.value }
                        }
                      />
                      <span className="token-copy">
                        <code>{entry.name}</code>
                        <small>{entry.usage}</small>
                        {entry.categoryId ? (
                          <small data-slot="semantic-token-source">
                            {entry.textCategoryId ? `填充：${entry.categoryId} · 文字：${entry.textCategoryId}` : `来源：${entry.categoryId}`}
                          </small>
                        ) : <small>保留原定义</small>}
                        {entry.textCategoryId && (
                          <span className="text-rain-action-primary" data-slot="semantic-token-text-sample">主要操作文字</span>
                        )}
                      </span>
                      <span className="token-value">{entry.value}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="foundation-section"
        aria-labelledby="type-title"
        data-rain-id="foundation-typography"
        data-slot="typography-roles"
      >
        <div className="foundation-section__heading">
          <div>
            <p className="section-index">02 / TYPOGRAPHY</p>
            <h2 id="type-title">一种界面，三种阅读任务</h2>
          </div>
          <p>
            默认选择完整方案，只有明确需求才调整单项 Token。
            旧 UI、Reading、Data 入口的字号与行高已共享基础 Token；下列数值依次为字号 / 行高 / 字重。
            旧类保留原有字距和数字属性的继承方式，完整方案会显式设置这些属性，替换时需一并检查。
          </p>
        </div>

        <div className="type-grid">
          <article className="type-sample" data-rain-id="foundation-type-ui">
            <span className="type-role">UI / PingFang SC</span>
            <p className="rain-type-ui">
              课程资源 · 已更新 12 项 · 操作和辅助信息保持紧凑清晰
            </p>
            <p className="rain-type-ui-caption">
              <code>rain-type-ui</code> → <code>rain-type-ui-default</code>
              <br />{uiPreset.label} · {uiPreset.fontSize}px / {uiPreset.lineHeight}px / {uiPreset.fontWeight}
            </p>
          </article>
          <article className="type-sample" data-rain-id="foundation-type-reading">
            <span className="type-role">Reading / PingFang SC</span>
            <p className="rain-type-reading">
              报告结论、课程介绍和答案解析使用稳定行高。角色由内容任务决定，
              不根据字符串长短临时改变排版。
            </p>
            <p className="rain-type-ui-caption">
              <code>rain-type-reading</code> → <code>rain-type-reading-default</code>
              <br />{readingPreset.label} · {readingPreset.fontSize}px / {readingPreset.lineHeight}px / {readingPreset.fontWeight}
            </p>
          </article>
          <article className="type-sample type-sample--data" data-rain-id="foundation-type-data">
            <span className="type-role">Data / Key metric only</span>
            <p className="metric-lockup" data-slot="statistic">
              <span className="rain-type-data" data-slot="statistic-value">
                98.6
              </span>
              <span className="rain-type-ui" data-slot="statistic-unit">
                分
              </span>
              <span className="metric-label rain-type-ui" data-slot="statistic-label">
                平均成绩
              </span>
            </p>
            <p className="rain-type-ui-caption">
              <code>rain-type-data</code> → <code>rain-type-data-default</code>
              <br />{dataPreset.label} · {dataPreset.fontSize}px / {dataPreset.lineHeight}px / {dataPreset.fontWeight}
            </p>
          </article>
        </div>
        <p className="font-status" data-slot="font-status">
          关键数据只让数值使用 LINE Seed，中文单位和标签保持 PingFang SC。
          字体文件未随组件库分发，实际字体与回退效果仍需在使用环境中核对。
        </p>
      </section>

      <section
        className="foundation-section"
        aria-labelledby="density-title"
        data-rain-id="foundation-density-comparison"
        data-slot="density-comparison"
      >
        <div className="foundation-section__heading">
          <div>
            <p className="section-index">03 / DENSITY</p>
            <h2 id="density-title">同一控件，由场景上下文决定密度</h2>
          </div>
          <p>密度由场景或父级上下文决定；同一局部控件组使用一致密度。下方以原生控件比较。</p>
        </div>
        <div className="density-grid">
          <DensityFixture density="compact" />
          <DensityFixture density="default" />
        </div>
        <p
          className="fixture-boundary-note"
          data-slot="fixture-boundary"
          id="foundation-native-fixture-boundary"
        >
          <span>
            原生示例用于比较 Density 与 Focus；实际 Input / Button 的外观见组件目录。
          </span>
          <span>
            Input Focus 已接入统一品牌细环与浅色外圈，保留浅蓝表面；其他状态的完整 Token 迁移另行推进。
          </span>
        </p>
      </section>

      <section
        className="foundation-section"
        aria-labelledby="focus-title"
        data-rain-id="foundation-focus"
        data-slot="focus-semantics"
      >
        <div className="foundation-section__heading">
          <div>
            <p className="section-index">04 / FOCUS</p>
            <h2 id="focus-title">键盘焦点必须清楚表达对象与意图</h2>
          </div>
          <p>依次按 Tab 可体验 control、item、danger；全局共用 Border/Brand/1 的贴边细环与 Fill/Brand/Alpha/3 的浅色外圈。Hover 不替代 Focus，危险意图仍由组件自身配色表达。</p>
        </div>
        <div className="focus-grid">
          <button
            className="focus-fixture"
            data-asset-identity="fixture-only"
            data-focus="control"
            data-testid="focus-control"
            type="button"
          >
            <span>Control</span>
            <small>表单与主要控件</small>
          </button>
          <button
            className="focus-fixture focus-fixture--item"
            data-asset-identity="fixture-only"
            data-focus="item"
            data-testid="focus-item"
            type="button"
          >
            <span>Item</span>
            <small>菜单、列表与树项</small>
          </button>
          <button
            className="focus-fixture focus-fixture--danger"
            data-asset-identity="fixture-only"
            data-focus="danger"
            data-testid="focus-danger"
            type="button"
          >
            <span>Danger</span>
            <small>删除与危险意图</small>
          </button>
        </div>
      </section>

      <section
        className="foundation-section"
        aria-labelledby="motion-title"
        data-rain-id="foundation-motion"
        data-slot="motion-comparison"
      >
        <div className="foundation-section__heading">
          <div>
            <p className="section-index">05 / MOTION</p>
            <h2 id="motion-title">动效帮助理解变化，也必须允许安静下来</h2>
          </div>
          <p>系统开启“减少动态效果”后，即时反馈、浮层和区域动效都降为 0ms。</p>
        </div>
        <div className="motion-grid">
          <article
            aria-label="Feedback motion fixture"
            className="motion-card"
            data-focus="control"
            data-motion="feedback"
            data-testid="motion-feedback"
            tabIndex={0}
          >
            <span className="motion-card__label">System preference</span>
            <div
              className="motion-track"
              data-motion="overlay"
              data-testid="motion-overlay"
            >
              <span
                className="motion-marker"
                data-motion="region"
                data-testid="motion-region"
              />
            </div>
            <small>跟随当前系统偏好</small>
          </article>
          <article className="motion-card motion-card--reduced">
            <span className="motion-card__label">Reduced comparison</span>
            <div className="motion-track">
              <span className="motion-marker" data-testid="motion-reduced" />
            </div>
            <small>静态对照，无位移动画</small>
          </article>
        </div>
      </section>
    </main>
  );
}
