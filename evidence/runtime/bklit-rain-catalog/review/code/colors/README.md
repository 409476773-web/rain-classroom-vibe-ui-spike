# Color registration review

Verdict: **no blocking governance findings** in the chart-specific ledger,
native alias preparation, pending branches, four tests, and Foundation contract
increment. This does not grant chart readability or dark-theme acceptance.

- Fresh `scripts/chart-color-consumers.test.ts`: 4 passed, 0 failed. See
  `four-tests.log`.
- All 27 contrast and 16 weak-content findings remain `pending-review`,
  `acceptedException: false`, and `theme: light`. See
  `current-registration.json`; the supplied parent result is retained as
  `parent-registration.json`.
- The native preparation masks individual exact selector/property/value/media
  matches once. Missing or duplicate bindings, changed values, scope drift,
  and unregistered paints remain failures; the normal remaining-source
  validator still runs. This is not an entire-file exemption.
- Extra probes rejected undeclared data-color use as text, a native paint
  outside its scope, duplicate native aliases, an unregistered alias to a
  native token, and weakening the critical Tooltip foreground to Neutral/5.
- Strong foreground, Tooltip, popover, Marker/Badge, and center readouts keep
  Neutral/1 or Neutral/2 and `critical: true`. Their text/large-text thresholds
  remain 4.5/3. Weak critical or interactive content is reported as pending
  eligibility, not relabeled as decorative to make it pass.
- Correction to the requested contract description: the actual increment is
  **131 `colorCssConsumers` plus four `consumerPaths`**, not only one field.
  Removing both increments restores the exact P0 Foundation contract SHA-256
  `39efd352a108c86f6920cfe0f63581a59e92ed26f11ddbc4709ecf11b66a7168`.
  Tokens, color registry, Token contract, typography, and Tailwind theme remain
  byte-identical to P0. Hashes and probe failures are in `review.facts.json`.

The light/full-opacity measurements do not certify graph overlap, gradients,
faded states, physical display contrast, or dark charts. Those limitations
remain explicit. No implementation, styles, ledger, contract, or test files
were changed by this reviewer; only this evidence directory was written.
