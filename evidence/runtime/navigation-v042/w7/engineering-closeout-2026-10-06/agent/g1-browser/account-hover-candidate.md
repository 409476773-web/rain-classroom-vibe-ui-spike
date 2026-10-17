# R2 account hover candidate — local-experiment

Status: **pending validation, not adopted**. This candidate does not inherit review02 acceptance. Only evidence artifacts were created; current application source, accepted ZIP and frozen runtime remain unchanged.

`account-hover-candidate.diff` adds one selector to the existing R2 course/history hover rule:

```css
.nv42-r2 .nv42-account:enabled:not([aria-disabled="true"]):hover,
```

It restores the existing `--rain-category-fill-neutral-alpha-6` paint without adding a Token or value, stays inside R2, and excludes native-disabled and `aria-disabled="true"` accounts.

Historical source: `review-02/README.md:25` explicitly reports passing account hover feedback. `w5/review-11-annotations-navigation/source-before/apps/playground/src/recipes/navigation-v042/r2.css:46` contains the original `.nv42-account:hover,.nv42-history:hover` rule using this exact Token. Review11's extracted platform account rules did not replace that feedback; the actual standard Avatar is a span inside the account button, so its own interactive-root hover rules do not match. Four current source files were verified against the accepted ZIP; details are in `followup-source-lineage.json` and `followup.md`.

Read-only patch validation: `git apply --check account-hover-candidate.diff` from the actual Card V2 worktree exited 0. The patch was **not applied**. Current R2 CSS remains SHA-256 `c81cbfe619065408231f7ff039c4d235f3f0b221fb85e426f503037951eb1ae0`; candidate bytes would be `d7730f939c21589390ed732f438156bf8255fa32af1eabdff6c10cd63ba64630`. Accepted source ZIP remains `b47ff2c4097c1c595fba445ea2df9ecaac2f7ac47c6e7eb926b53ea5773384b5`.

Apply and restore **only in root's isolated test copy**. Let `DIFF` be the absolute path to `agent/g1-browser/account-hover-candidate.diff`; from `/private/tmp/rain-nav-w7-browser-20261006`:

```sh
git apply --check "$DIFF"
git apply "$DIFF"
# Root runs all 14 G1 tests using its existing isolated configuration and distinct candidate evidence.
git apply --reverse --check "$DIFF"
git apply --reverse "$DIFF"
```

After application, verify the candidate CSS SHA; after restoration, verify the exact original SHA. Do not apply the candidate to the Card V2 application source or accepted artifacts. No service should be started by this candidate procedure; root owns runtime execution.

Required reporting remains separate: latest frozen-source G1 + Tree baseline, candidate full-14 G1 run, candidate CSS hash, unchanged accepted baseline hash and restoration. A candidate passing run does not turn the frozen W7 baseline green. Adoption, new acceptance and new source lineage remain pending.
