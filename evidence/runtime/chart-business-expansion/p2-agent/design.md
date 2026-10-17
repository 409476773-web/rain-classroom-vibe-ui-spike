# P2 MatrixChart scoped implementation

- Mode: System Mode; `registry-candidate`, unpublished. User authorized implementation; no Git, Figma, dependency or production actions.
- Scope: new `packages/ui/src/charts/matrix/{matrix-data.ts,matrix-data.test.ts,matrix-chart.tsx,matrix-chart.test.tsx,matrix.css}`, application-private `chart-business/{matrix-data.ts,matrix-examples.tsx}`, and `manifests/ui/chart-matrix.yaml`. Root owns shared exports, catalog, registry, source downloads and overall evidence.
- Existing calendar Heatmap remains separate. Business data stays in the application fixtures.
- I02: relational data uses a native matrix with precise cell readings and one scale shared by the legend and marks. D05: preserve labels and table associations, allow local horizontal scrolling and retain row headings. V04: ordinary table readings use UI typography; marks do not replace text or create fake controls.
- Public data: stable row/column IDs, discriminated `value` / `missing` / `not-applicable` cells. Missing coordinates remain missing. Duplicate IDs/coordinates, unknown references and non-finite readings are rejected.
- Encodings: explicit increasing finite heat domain; square-root bubble radius so area is proportional to non-negative quantity; explicit numeric level mapping without interpolation. Similarity fixtures use `[0, 1]`, do not fill a diagonal or enforce symmetry. CH145 has three declared grades.
- Anatomy: chart root, scroll container, native caption/header/body cells, visible exact readings, legend. Pure data cells have no Tab stop; no action is invented.
- Motion: short CSS transition only for continuous heat color and bubble radius; level changes are immediate. System reduced motion cancels transition. No persistent animation loop.
- Verification: RED then GREEN scoped data and rendering tests; typecheck production and tests; root performs integration, browser and download checks. Proven layout sizes target 12×12 and 7×24; larger tables and real screen-reader behavior remain unverified.

## Scope checks before writing

- No existing MatrixChart callers; this is a new module. Callers added only in the five application fixtures/examples.
- Shared index/export, styling entry, registry and downloads require root integration after the module is delivered.
- Native table avoids framework, Canvas, resize measurements and virtualization dependencies. Invalid input is a rejected contract rather than silently replacing data with zero.
- No student or teacher data enters fixtures; all business data is explicitly Mock.
