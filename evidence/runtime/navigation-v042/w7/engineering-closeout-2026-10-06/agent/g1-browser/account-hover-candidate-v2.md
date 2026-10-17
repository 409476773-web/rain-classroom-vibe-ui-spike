# R2 account hover candidate v2 — local-experiment

Status: **validated in the isolated root run, not adopted**. V1 diff, JSON, explanation and original failed browser report are preserved. Main application source and accepted ZIP remain unchanged.

V1 was actually tested in the isolated copy: `browser-account-hover-candidate.json` reports **13 passed / 1 failed / 0 skipped**, with the R2 account still transparent on hover. Its selector and the later platform normal rule both have specificity `(0,5,0)`; repeated-import ordering lets normal `background:transparent` override the candidate. This is a real failed candidate run, not a passing restoration.

V2 adds only this selector to the original R2 course/history rule:

```css
.rain-workspace.nv42-r2 .rain-workspace__region[data-region-id="global"] .nv42-account:enabled:not([aria-disabled="true"]):hover,
```

Its specificity is `(0,8,0)`, exceeding platform normal `(0,5,0)` regardless of their order. It stays within the R2 global-region account, uses the original `--rain-category-fill-neutral-alpha-6` declaration, retains native-disabled / aria-disabled protection, and uses no `!important`, new Token or new value. Historical confirmed hover source remains `review-02/README.md:25` and Review11 `source-before/.../r2.css:46`, as detailed in `account-hover-candidate.md` and `followup.md`.

`account-hover-candidate-v2.diff` is against the unchanged frozen CSS, SHA-256 `c81cbfe619065408231f7ff039c4d235f3f0b221fb85e426f503037951eb1ae0`. V2 candidate source SHA is `6c3145aa2efafcbe0f10414b9de69989d7e5aad09823b4b646c02715424d6ee1`. Read-only `git apply --check` exited 0; this agent did not apply it or start a service.

Historical execution preparation: root replaced V1's single selector with V2 in the isolated copy and ran all **14 G1 tests**. Both original reports remain. After validation, the isolated CSS was restored to the exact frozen SHA above. Neither candidate was applied to main application source or accepted archives.

V2 runtime verification passed in the isolated copy. Frozen-source baseline, failed V1, passing V2 experiment and restoration remain separate. The passing V2 experiment does not make the frozen W7 baseline green or inherit review02 acceptance. Adoption and new source lineage remain pending.

## 根实跑结果 · 2026-10-06

隔离副本G1完整14项全部实际通过，0失败/0跳过/0flaky、exit0；见[原始浏览器JSON](../../browser-account-hover-candidate-v2.json)。隔离候选r2.css SHA为`6c3145aa2efafcbe0f10414b9de69989d7e5aad09823b4b646c02715424d6ee1`。主源码仍为原`c81cbfe6…1ae0`，候选未采用，既有review02 ZIP和人审不变；该候选成功没有填回冻结基线的失败。V1原13通过/1失败记录保留。
