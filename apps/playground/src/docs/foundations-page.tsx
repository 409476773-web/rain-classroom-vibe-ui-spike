import {
  DensityProvider,
  densityMetrics,
  semanticColorGroups,
  semanticColorTokenEntries,
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
            <p className="eyebrow">RAIN NEXT · SYSTEM MODE · DAY 2</p>
            <h1 id="foundations-title" tabIndex={-1}>
              Foundations，先让系统说同一种语言
            </h1>
            <p className="foundation-lead rain-type-reading">
              这组夹具只验证颜色角色、字体分工、密度上下文、键盘焦点和动效降级。
              它不是 Day 3 UI 组件，也不代表已通过人工设计 Gate。
            </p>
          </div>
          <dl className="foundation-summary" aria-label="Foundations 合同摘要">
            <div>
              <dt>Semantic colors</dt>
              <dd>{semanticColorTokenEntries.length}</dd>
            </div>
            <div>
              <dt>Type roles</dt>
              <dd>03</dd>
            </div>
            <div>
              <dt>Densities</dt>
              <dd>02</dd>
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
            <h2 id="colors-title">语义色不是色板，是使用边界</h2>
          </div>
          <p>
            除锁定的 #1561F8 外，其他值只表达跨场景关系；未把旧页面裸色直接晋升为系统事实。
          </p>
        </div>

        <div
          className="color-architecture"
          data-rain-id="foundation-color-architecture"
          data-slot="color-architecture"
        >
          <ol className="color-layer-list" aria-label="颜色 Token 三层模型">
            <li data-slot="color-layer" data-variant="internal">
              <span className="color-layer__index">01</span>
              <div>
                <strong>Reference Palette</strong>
                <small>Internal · neutral / blue / status 原子色阶</small>
              </div>
            </li>
            <li data-slot="color-layer" data-variant="stable">
              <span className="color-layer__index">02</span>
              <div>
                <strong>Semantic Roles</strong>
                <small>Stable · 页面与组件可消费的 42 个角色</small>
              </div>
            </li>
            <li data-slot="color-layer" data-variant="on-demand">
              <span className="color-layer__index">03</span>
              <div>
                <strong>Component Tokens</strong>
                <small>On demand · Day 3 起只为已验证状态建立</small>
              </div>
            </li>
          </ol>
          <p>
            内部色阶提供扩展余量，语义角色保持稳定；业务页面不直接选色阶。
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
          <p>UI 保持紧凑，Reading 保持可读，Data 只承担少量关键数值锚点。</p>
        </div>

        <div className="type-grid">
          <article className="type-sample" data-rain-id="foundation-type-ui">
            <span className="type-role">UI / PingFang SC</span>
            <p className="rain-type-ui">
              课程资源 · 已更新 12 项 · 操作和辅助信息保持紧凑清晰
            </p>
          </article>
          <article className="type-sample" data-rain-id="foundation-type-reading">
            <span className="type-role">Reading / PingFang SC</span>
            <p className="rain-type-reading">
              报告结论、课程介绍和答案解析使用稳定行高。角色由内容任务决定，
              不根据字符串长短临时改变排版。
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
          </article>
        </div>
        <p className="font-status" data-slot="font-status">
          字体合同：仅声明目标与回退链；仓库不包含字体文件。文件授权与本机实际命中情况见 Day 2 字体环境证据。
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
          <p>对照使用原生控件夹具，不提前实现 Day 3 Button 或 Input 公共组件。</p>
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
            原生夹具，仅验证 Density 与 Focus；不代表 Day 3 Input / Button 最终外观。
          </span>
          <span>
            Input Focus 候选延续原稿的 1px 品牌边框、浅蓝表面和轻量外环。
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
          <p>依次按 Tab 可体验 control、item、danger；Hover 不替代 Focus。</p>
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
