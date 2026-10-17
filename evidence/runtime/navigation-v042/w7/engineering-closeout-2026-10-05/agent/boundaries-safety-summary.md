# W7 boundary safety closeout · 2026-10-06

The first 11-test result is superseded by independent review: Registry, freeze/map self-registration and a runtime import through the docs data domain could pass. The original report and every red/probe log remain intact.

The corrected live boundary CLI passes. All 18 direct tests pass (18.21s), as does the direct test type check. The final boundary SHA is `bde47d00309d7aebb82ec99651c80e7a5ce2109a3d8e2cc5e98e6a79083819b7`; the original four independent probes now all reject with exit 1, while Boundary and B2 baselines both pass with exit 0. The unknown-UI control remains rejected; independent temporary fixtures were removed and real source remained unchanged.

The guard now reuses the original eight Registry SHA/scope checks from a pure shared helper, verifies four immutable accepted freeze/map blob identities before authorizing source keys, excludes mutable Manifest examples from authorization, and blocks literal relative executable imports into docs/evidence/artifacts or other unregistered live sources. It does not load the product code it audits. Known non-code data references remain separate.

Evidence: `boundaries-safety-live-final.log`, `boundaries-safety-final.log/results`, `boundaries-safety-direct-typecheck.log`, `boundary-safety-final/`, `boundaries-safety-task-only.diff` and machine-readable `boundaries-safety-summary.json`. The four new escape tests are preserved red in `boundaries-safety-red.log/results`. A B2-module-loading rejection and one temporary legacy-block reordering are also retained as superseded intermediate diagnostics; final source was restored from the verified pre-review SHA before applying the narrow guards.

Our code scope stays at the boundary checker and its direct test. Root's reviewer moved the existing shared guard verbatim. No real Registry, freeze, regression map, product runtime, accepted UI, Token, archive, publication, migration, Git or Figma write was performed by this subtask.

This is scoped boundary evidence, not a general JavaScript sandbox or full-project conformance. Final global quality remains with root; independently sealed data still has its own integrity checks, while the boundary CLI itself now enforces concrete inventory identities and literal relative code-import ownership.

Independent re-test evidence: `../boundary-independent-2026-10-06-after/results.json` and its raw logs. B2 alone rejects Registry corruption; freeze/map and runtime data-domain ownership remain Boundary checks. This is explicit responsibility separation, not a claim that standalone B2 covers those three probes.
