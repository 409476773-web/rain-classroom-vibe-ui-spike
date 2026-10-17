import { useId, useState } from "react";
import { Button } from "@rain-next/ui";
import { MatrixChart, type RainChartRecipe } from "@rain-next/ui/charts";
import type { ChartState } from "../chart-data";
import { makeMatrixFixtures, type MatrixFixture } from "./matrix-data";

export interface MatrixExamplesProps {
  state?: ChartState;
  revision?: number;
  reduced?: boolean;
  replay?: number;
  descending?: boolean;
  fixtureId?: MatrixFixture["id"];
  recipe?: RainChartRecipe;
  initialSize?: 4 | 6 | 12;
  onSizeChange?: (size: 4 | 6 | 12) => void;
}

export function MatrixExamples({ state = "normal", revision = 0, reduced = false, replay = 0, descending = false, fixtureId, recipe = "monochrome-blue", initialSize = 6, onSizeChange }: MatrixExamplesProps) {
  const headingId = useId();
  const [similaritySize, setSimilaritySize] = useState<4 | 6 | 12>(initialSize);
  const fixtures = makeMatrixFixtures(revision, state, similaritySize).filter(fixture => !fixtureId || fixture.id === fixtureId);
  return <section className="rain-business-section" data-rain-id="doc-chart-matrix" aria-labelledby={fixtureId ? undefined : headingId}>
    {!fixtureId && <h2 id={headingId}>分类交叉矩阵</h2>}
    <p className="rain-business-note">示例数据</p>
    {(!fixtureId || fixtureId === "course-similarity") && <div className="rain-business-controls" role="group" aria-label="相似度矩阵规模">{([4, 6, 12] as const).map(size => <Button key={size} size="small" variant="secondary" aria-pressed={similaritySize === size} onClick={() => { setSimilaritySize(size); onSizeChange?.(size); }}>{size}×{size}</Button>)}</div>}
    {fixtures.map(fixture => {
      const invalid = fixture.cells.some(cell => cell.kind === "value" && !Number.isFinite(cell.value));
      return <section key={fixture.id} className="rain-business-section" data-matrix-example={fixture.id} aria-label={fixture.caption}>
        {invalid ? <><h3>{fixture.caption}</h3><p role="alert">无效数据：请提供有效的矩阵读数。</p></> : <MatrixChart key={`${fixture.id}-${replay}`} caption={fixture.caption} rowHeaderLabel={fixture.rowHeaderLabel} data-recipe={recipe}
          rows={descending ? [...fixture.rows].reverse() : fixture.rows} columns={descending ? [...fixture.columns].reverse() : fixture.columns}
          cells={fixture.cells} encoding={fixture.encoding} valueFormat={fixture.valueFormat} reducedMotion={reduced} />}
        <p className="rain-business-note">{fixture.description}</p>
      </section>;
    })}
  </section>;
}
