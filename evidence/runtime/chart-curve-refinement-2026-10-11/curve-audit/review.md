# Curated demo curve audit

Read-only audit of installed `d3-shape` Natural and MonotoneX interpolation. No runtime, data, dependencies, CSS, or native curve defaults were edited by this reviewer. The parent owns implementation and browser verification.

**Natural is suitable for the current fullprecision rate, mini trends, and the three business area fixtures. It cannot be applied to every current count series without adding an extremum.**

## Definition and method

An observed turn is a sign change between nonzero adjacent differences. Flat platforms count once. A curve turn is a sign change across the complete cubic derivative, including exact derivative roots inside each segment and joins between segments. Moving an existing peak between observations is allowed; counting every interior derivative root as an invented peak would be incorrect.

The audit runs the installed implementation with its real Bézier control points, computes exact derivative roots, and uses source value units. The initial bounds audit supplements this with 1,001 samples per interval. These fixtures have equally spaced daily or ordinal x coordinates, so affine chart scaling preserves the turn and bounds conclusions. This does not certify transient motion frames, arbitrary caller data, or browser appearance.

## Current factory results

| Family | Series examined | Natural keeps turn count | Nonnegative Natural range | Maximum local deviation beyond adjacent endpoints |
| --- | ---: | ---: | --- | ---: |
| Timeline counts, 5 keys × 3 revisions | 15 | 10 | 26.924387–360.079179 people | 0.777719 people |
| Timeline fullprecision rate, 3 revisions | 3 | 3 | 55–73.128320% | 0.051397 percentage points |
| Mini trends, 5 rows × complete 12-revision cycle | 60 | 60 | 8–90 people | 0.518727 people |
| Business semester area, 3 revisions | 3 | 3 | 144–284 people | 4.076369 people |
| Business period areas, 2 series × 3 revisions | 6 | 6 | 20–60 observations | 2.116709 observations |
| Business version area, 3 revisions | 3 | 3 | 42–60 courses | 0.167670 courses |

Both curves pass exactly through all input values. MonotoneX preserves observed turn counts for every examined current series and stays between each pair of adjacent endpoint values. No examined Natural fixture becomes negative, and the fullprecision rate remains within 0–100%.

All 15 count arrays and all 60 mini trend arrays are byte-equivalent as serialized values to the initial snapshots. The current factory rate equals `completed / enrolled * 100` without rounding. The current count and mini turn counts match the independently implemented initial turn audit. Initial `results.json`, `timeline-source.txt`, and `mini-source.txt` hashes remain unchanged.

Rounding the current actual rate explicitly with `Math.round` is a separate control. Each original rate sequence has one turn; Natural on the rounded controls has 5, 8, and 5 turns. Fullprecision geometry removes these quantization-induced oscillations while display precision can remain an independent choice.

## Count exceptions

| Key and revision | Observed turns | Natural turns | Contains adjacent equal values |
| --- | ---: | ---: | --- |
| reviewed, revision 0 | 2 | 3 | Yes |
| enrolled, revision 1 | 2 | 3 | **No** |
| completed, revision 1 | 2 | 3 | Yes |
| reviewed, revision 1 | 2 | 6 | Yes |
| reviewed, revision 2 | 2 | 4 | Yes |

The no-platform counterexample is the last `enrolled` interval in revision 1: the true values rise from 359 to 360, but Natural rises to 360.079179 at x=22.694521 before falling to 360. This creates a new terminal peak despite every input being positive and every adjacent pair being unequal.

The proposed selector “Natural only for non-null, non-zero values without adjacent equality” therefore still fails for this one current series. It passes the other 14 count sequences, 3 fullprecision rates, 60 mini trends, and 12 business area sequences. It is a fixture-specific heuristic, not a general interpolation guarantee.

A small safe host choice is to keep enrolled, completed, and reviewed on MonotoneX throughout their revision cycle; returned and answered are Natural-safe throughout all three revisions. Keeping the complete count host on MonotoneX is also safe and requires no data alteration or curve engine. Native defaults, caller-selected curves, Linear, and Step need not change.

### Follow-up: local endpoint guard

The parent's final candidate adds two endpoint tests to the null/zero/platform checks: fall back to MonotoneX when `abs(first slope) < abs(second slope) / 3` or `abs(last slope) < abs(previous slope) / 3`. This catches the no-platform enrolled revision-1 counterexample because its last slopes are 8 then 1.

Applied to the audited 15 count sequences and 3 fullprecision rates, this candidate selects native curves that preserve every observed turn and remain nonnegative. Eligible Natural sequences are:

| Revision | Count keys eligible for Natural | Fullprecision rate |
| --- | --- | --- |
| 0 | enrolled, completed, answered | Natural |
| 1 | returned | Natural |
| 2 | enrolled, returned | Natural |

The other nine count sequences use MonotoneX. This is an approved-current-fixture selection check, not a generic safety guarantee and not a curve engine. Mini and business area safety was audited separately and does not need this endpoint selector. The explicit interactive curve overrides and Linear/Step are outside this proposed change.

For the business areas, all current finite portions are Natural-safe. The previous-period series has a null final observation in every revision; the audit checks its four observed values and never fills the missing tail. Zero and missing-state policies remain the parent’s existing MonotoneX behavior.

## Evidence

- `results.json`: original range audit and original source hashes, preserved.
- `turn-results.json`: initial independent global turn audit, preserved.
- `current-precision-turn-results.json`: current values, source hashes, exact extrema, input identity, and turn cross-checks.
- `business-area-turn-results.json`: all semester, period, and version area revisions, with null tails recorded.
- `host-selection-results.json`: proposed selector decisions and the enrolled revision-1 counterexample.
- `endpoint-selection-results.json`: final endpoint candidate, all selected turn counts, every slope guard, eligible sequences, and fresh source hashes.
- `endpoint-selection-audit.mjs`: reproducible endpoint candidate verification against the previously audited actual curves.
- `current-and-business-audit.mjs`: reproducible read-only current factory audit.
- `current-and-business-audit.log`: successful current audit output.

The bounds controls in the original audit intentionally include `[0,0,100,100]` and its reverse. Natural can cross both 0 and 100 and add turns on those controls. They are not current demo data; they demonstrate why no arbitrary-input native default guarantee is claimed.
