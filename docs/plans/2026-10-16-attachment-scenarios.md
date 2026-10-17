# Attachment Scenes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement the confirmed ordinary upload, compact draft, scrollable dialog and media grid designs with real local file actions and narrow layouts.

**Architecture:** Extend the existing controlled AttachmentList recipe and reuse its upload controller, primitive parts, permissions and resource handling. Scene containers own folding, counts and draft composition. Keep the nine Attachment parts, Tokens, dependencies, prior sealed evidence and transport engine unchanged.

**Tech Stack:** React, TypeScript, existing Rain UI/Tokens/icons, Vite, Vitest, Playwright.

---

## Scope and sources

System Mode, unpublished candidate increment for the attachment workflow recipe; page scenes remain private. User authorization: 2026-10-16 “开始实现”, following acceptance of the three ordinary/composer/modal drafts, short inline progress, 360px densities and media grid without format corner badges. Figma source MbWg1ft5zk1JRQiQ6dS30e node 1:15618. Selected images are copied into the evidence references folder. Normal/compact, item orientation and collection arrangement remain separate axes. Tens of files is the primary scale, with 24 an example, not a product cap.

Unverified assumptions: native video support depends on browser/codecs; local uploads simulate transport, not a production service. Draft submission demonstrates this page only. No implied general business policy for partial failure or attachment-only sending.

### Task 1: Preserve baseline and references

- Save targeted sources and hash list in evidence/runtime/attachment-scenarios-2026-10-16/baseline.
- Preserve git status, prior verification records and public Attachment parts.
- Copy selected design images and actual Figma source screenshot into references; record source identities.

### Task 2: Shared visual and density composition

Files: packages/ui/src/attachment-workflow/attachment-list.tsx, attachment-list.css, attachment-list.test.tsx.

1. Add failing behavioral tests: known progress uses short inline bar plus percent and no size/spinner; unknown processing has no fake percentage; compact draft offers direct remove and inline size on wide containers (hidden in narrow ones); media thumbnail has no format glyph, broken thumbnails retain file identity; permissions and replacement remain valid.
2. Run `pnpm exec vitest run packages/ui/src/attachment-workflow/attachment-list.test.tsx`; confirm expected assertion failures.
3. Add optional recipe props `size?: "default" | "sm"`, `orientation?: "horizontal" | "vertical"`, `layout?: "list" | "wrap" | "grid"`, `actions?: "default" | "draft"`. Defaults preserve current usage. Each item renders the same parts; CSS owns density/orientation, container owns collection layout. Keep formal static file icon helper. Use real thumbnail only; video overlay only on completed previewable compatible video.
4. Use `<span className="rain-attachment-list__transfer"><Progress value={progress ?? null} aria-label={...} /><span>{progress == null ? "正在上传" : `${Math.round(progress)}%`}</span></span>` beneath filename while uploading; processing uses indeterminate state. Preserve atomic replacement's original resource and separate progress context. Avoid extra spinner/full-card progress.
5. Run affected unit suite; verify removal focus and original operations.

### Task 3: Real video preview

Files: packages/ui/src/attachment-workflow/attachment-preview.tsx, attachment-preview.css, attachment-preview.test.tsx; shared helper only if needed.

1. Test supported MIME/extension matching, unsafe URL exclusion, local object URL disposal, error fallback and permission changes before implementation.
2. Add bounded native video preview without new engines/dependencies. Preserve image and PDF guards, download restriction behavior and dialog focus. Use real media events and fallback.
3. Run preview tests, then combined workflow tests.

### Task 4: Page scenarios and original workflows

Files: apps/playground/src/docs/components/attachment-scenarios-demo.tsx, .css, .test.tsx, optional -fixtures.ts; g6-media-pages.tsx.

1. Add tests for 24-item counts, fold/view-all, failed-only retry, independent drafts, close/reopen preservation, input attach/remove/text flow.
2. Build ordinary list, compact draft, fixed-footer dialog and vertical media gallery using shared List; each container owns its controller. Fold does not stop hidden uploads or reorder completion. Existing real pick/upload/cancel/retry/replace workflow remains reachable.
3. Generate separate classroom/lab photo assets in public/attachment-demo; create real short MP4 from a generated photo with ffmpeg. Record illustrative origin. Never download PDF under video filename.
4. Run page tests and typecheck/build. No global ConversationComposer changes.

### Task 5: Browser, design QA and traceability

Files: tests/e2e/attachment-scenarios.spec.ts/.config.ts; evidence/runtime/attachment-scenarios-2026-10-16; registry/attachment-workflow.json; manifests/recipes/attachment-workflow.yaml; status/current-phase.yaml; design-notes.md; design-qa.md.

1. Run new isolated Playwright server/report directory; check desktop and 360px, both surfaces/themes, fold/count/retry, picker, draft removal, dialog independent scrolling/focus, preview/play/download and thumbnail fallback.
2. Compare selected design references with actual rendered screenshots through CUA. Fix P0/P1/P2; report remaining P3s. Keep actual source screenshots and boundaries explicit.
3. Review spec compliance then code quality independently. Re-run only affected checks after fixes.
4. Append source bindings and scoped verification, keeping predecessor evidence sealed. Human Gate remains awaiting_human; contrast, Safari, VoiceOver, physical touch, publication, Figma writeback and production service stay separate. No Git mutation or release.
