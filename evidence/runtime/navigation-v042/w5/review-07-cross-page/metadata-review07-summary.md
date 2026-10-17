# Review07 source metadata verification

Current metadata was frozen after the page owners supplied their final source locks. Verification is recorded in `metadata-validation.json` and `metadata-validation.log`; `metadata-before.json` retains the prior Registry and candidate manifest metadata.

- 4 navigation Registries and 12 candidate asset manifests record current source hashes. 67 Registry entries and 12 primary source/style manifest checks match the live files.
- 12 candidates, 4 reused Avatar/IconButton assets and the explicitly declared ManageTree Pattern pass asset schema validation. Existing reused Avatar source was not changed.
- The business standalone fixture has a complete 14-file local source closure including `platform-navigation.css`.
- R2 has 9 local fixture files plus the 4 source files provided by its existing `registry/tree.json#manage-tree` dependency. The dependency was expanded, recursively checked and hash locked through `resolvedRegisteredDependencies`; it is not duplicated into R2 local item files.
- The optional Gallery fixture records its 4 local files and existing Avatar, NavigationTabs, ConnectedSurface, Tag and official icon dependencies. Shared NavigationList/ObjectNavigator/SegmentedControl item files retain their pure library source boundary.
- New platform CSS is imported by all 5 relevant host stylesheets. The mapping uses existing public category Tokens and is scoped to the outer platform rails and the A2 icon navigation example. Existing context and object navigation mappings retain their own boundaries. Independent dark inspections covered S1/S3/S4/S5/S6.
- Accepted G1 Registry history, source snapshot, review and Gate fields are unchanged; all 7 protected Registry fields and 16 protected R2 manifest fields compare equal to the prior metadata. The prior review06 current Registry snapshot remains available.
- R5 browser range pseudo-elements are registered as a local browser adaptation of existing Tokens; native CSS exception registration found no newly unregistered values in the 11 current G2 candidates.

The initial failed metadata check was caused by the checker resolving Vite `/src` HTML entries from the repository root and omitting expansion of the already declared ManageTree Registry dependency. Both checker errors were corrected; current validation is `passed` with zero missing source references. No application source repair was needed for those findings.

This verifies source metadata and closure, not Human G2, contrast, assistive technologies or production readiness. The parent task records final runtime/build results separately. The R2 historical 36px native-CSS registration gap remains a prior recorded limitation; accepted G1 fields were not rewritten to absorb it.
