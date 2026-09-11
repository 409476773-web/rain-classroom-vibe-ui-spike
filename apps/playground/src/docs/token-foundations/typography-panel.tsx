import {
  fontSizeTokens,
  lineHeightTokens,
  resolveTypographyPreset,
  typographyIssueMessages,
  typographyPresets,
  typographyUtilityClassNames,
  validateDataFontUsage,
  validateTypographyComposition,
  type TypographyComposition,
  type TypographyPresetName,
} from "@rain-next/foundations";
import { rainCn } from "@rain-next/ui";
import { useState } from "react";

const presetEntries = Object.entries(typographyPresets) as Array<[TypographyPresetName, (typeof typographyPresets)[TypographyPresetName]]>;

function TypographySample({ presetName, className, live = false }: {
  presetName: TypographyPresetName;
  className: string;
  live?: boolean;
}) {
  if (typographyPresets[presetName].fontRole === "data") {
    const value = "98.6";
    if (!validateDataFontUsage({ keyData: true, part: "value", text: value })) return null;
    return (
      <div data-testid={live ? "typography-live-preview" : undefined} data-slot="typography-data-sample">
        <span className="rain-type-ui-default" data-slot="statistic-label">关键得分</span>{" "}
        <span className={className} data-slot="statistic-value">{value}</span>{" "}
        <span className="rain-type-ui-default" data-slot="statistic-unit">分</span>
      </div>
    );
  }
  return (
    <p className={className} data-testid={live ? "typography-live-preview" : undefined} data-slot="typography-text-sample">
      学习与探索，让每一次思考都有回响。Rain Classroom 2026，课程说明支持中文、English 与普通数字混排。
    </p>
  );
}

export function TypographyPanel() {
  const [presetName, setPresetName] = useState<TypographyPresetName>("ui-default");
  const [overrides, setOverrides] = useState<Partial<TypographyComposition>>({});
  const { composition, validation } = resolveTypographyPreset(presetName, overrides);
  if (!composition) return null;
  const previewClassName = rainCn(
    typographyUtilityClassNames.preset[presetName],
    overrides.fontSize === undefined ? undefined : typographyUtilityClassNames.fontSize[overrides.fontSize],
    overrides.lineHeight === undefined ? undefined : typographyUtilityClassNames.lineHeight[overrides.lineHeight],
  );

  return (
    <section className="foundation-section" aria-labelledby="token-typography-title" data-rain-id="token-typography-panel">
      <h2 id="token-typography-title">排版：默认完整方案，按需调整</h2>
      <p>19 档字号、14 档固定行高与等于字号的选项。先选用途，再调整必要字段；变更只作用于下方样本。</p>
      <p>界面和阅读使用 PingFang SC，关键数据使用 LINE Seed。未分发字体文件，本机字体是否安装与实际字形仍需视觉核对；回退字体仅用于环境容错。</p>

      <fieldset className="flex flex-wrap gap-rain-16" aria-describedby="typography-editing-help">
        <legend>试用排版组合</legend>
        <label className="grid gap-rain-4">
          <span>排版方案</span>
          <select value={presetName} data-focus="control" onChange={(event) => {
            if (!Object.hasOwn(typographyPresets, event.target.value)) return;
            setPresetName(event.target.value as TypographyPresetName);
            setOverrides({});
          }}>
            {presetEntries.map(([name, value]) => <option key={name} value={name}>{value.label}</option>)}
          </select>
        </label>
        <label className="grid gap-rain-4">
          <span>字号</span>
          <select value={composition.fontSize} data-focus="control" onChange={(event) => {
            const fontSize = Number(event.target.value);
            const previousLineHeight = composition.lineHeight;
            const lineHeight = typeof previousLineHeight === "number" && !validateTypographyComposition({ ...composition, fontSize }).valid
              ? Object.values(lineHeightTokens)
                .filter((token) => token.type === "dimension")
                .map((token) => token.value)
                .filter((candidate) => validateTypographyComposition({ ...composition, fontSize, lineHeight: candidate }).valid)
                .sort((a, b) => Math.abs(a - previousLineHeight) - Math.abs(b - previousLineHeight))[0] ?? "equal"
              : previousLineHeight;
            setOverrides({ ...overrides, fontSize, lineHeight });
          }}>
            {Object.keys(fontSizeTokens).map((value) => <option key={value} value={value}>{value}px</option>)}
          </select>
        </label>
        <label className="grid gap-rain-4">
          <span>行高</span>
          <select value={composition.lineHeight} data-focus="control" onChange={(event) => setOverrides({ ...overrides, lineHeight: event.target.value === "equal" ? "equal" : Number(event.target.value) })}>
            {Object.keys(lineHeightTokens).map((value) => <option key={value} value={value}>{value === "equal" ? "等于字号" : `${value}px`}</option>)}
          </select>
        </label>
        <button type="button" data-focus="control" onClick={() => setOverrides({})}>恢复完整方案</button>
      </fieldset>
      <p id="typography-editing-help">切换字号时，超出范围的行高会同步调整到最近的可用档位；仍可手动选择行高。局部调整保留原方案的字体、字重和字距，切换方案会清除局部调整。</p>
      <p>这里的设计检查不会限制浏览器缩放或用户的辅助阅读样式。</p>
      {validation.valid ? (
        <>
          <p role="status">组合范围通过：{composition.fontSize}px / {validation.resolvedLineHeight}px。实际字形与容器仍需检查。</p>
          <TypographySample presetName={presetName} className={previewClassName} live />
        </>
      ) : (
        <p role="alert">{validation.issues.map((issue) => typographyIssueMessages[issue]).join(" ")} 调整后即可继续查看样本。</p>
      )}

      <div className="overflow-x-auto">
        <table aria-label="10 个排版默认方案">
          <thead><tr><th scope="col">方案</th><th scope="col">默认字号 / 行高 / 字重</th><th scope="col">默认用途与样本</th></tr></thead>
          <tbody>
            {presetEntries.map(([name, value]) => (
              <tr key={name}>
                <th scope="row">{value.label}</th>
                <td>{value.fontSize} / {value.lineHeight} / {value.fontWeight}</td>
                <td>
                  <p>{value.useWhen}</p>
                  <TypographySample presetName={name} className={typographyUtilityClassNames.preset[name]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
