# Actual Safari / VoiceOver runnable preparation — 2026-10-06

This is an installed-Safari smoke, using `/usr/bin/safaridriver` and Python standard-library HTTP. No Playwright WebKit result is counted as Safari. The accepted mock-page service remains `http://127.0.0.1:5368`; the script does not start, stop or modify that service.

## Final actual-environment status

The user explicitly chose **“Safari 此项留作人工检查”**. Safari is **`deferred-to-human-by-user`**, and actual E3/E4/E6 Safari behavioral checks remain **not-run**. Do not run the prepared commands below under this current decision. No WebKit result substitutes for actual Safari.

Before that deferral, the user authorized temporary enabling and restoration. Normal Safari UI enabled developer features from `0` to `1`; normal Remote Automation enabling remained `0` and opened device authentication. No credentials were read or entered. The owned sheet was canceled and developer features restored to `0`, verified with zero sheets and no Developer menu. The first restoration command returned a stale AX-reference error after removing the Developer tab; the independent fresh check in `safari-restore-verified.json` confirms the result. Remote Automation never completed enabling, and no later mutation occurred. No Safari session or test page was created during that attempt.

VoiceOver was actually started through normal Command-F5 and its **使用旁白** welcome button; the “不再显示此信息” checkbox stayed `0`. The reader ran as PID `68773`. With it running, installed macOS `AEDeterminePermissionToAutomateTarget` for the current Python caller and `com.apple.VoiceOver` returned **`-1744`** (`errAEEventWouldRequireUserConsent`) with `askUserIfNeeded=false`. No new consent prompt was requested and no VoiceOver-target Apple Event was sent. Its AppleScript-control checkbox was originally `0`; a temporary normal UI click still left it at `0`. No actual `last phrase.content`, page speech, clipboard content, or representative page interaction was captured. VoiceOver speech checks therefore remain **not-run**, with the specific permission and control conditions recorded; AX or DOM text is not counted as speech.

Temporary VoiceOver state is restored: reader not running, `voiceOverOnOffKey=false`, AppleScript-control `0`, welcome setting `1`, zero sheets. The utility PID `41808` and launch time matched this task's own open record; it was quit normally and confirmed stopped. Initial utility-existence UI probing had timed out, so it is not claimed as a verified original negative. Original Codex foreground is restored. The protected full preference stores were unreadable, so restoration claims are limited to these directly inspected states. User preview services and existing browser tabs were preserved.

Exact current results and evidence pointers: [current-status.json](current-status.json), [reader permission](voiceover-running-permission.json), [reader/control restoration](voiceover-restore-verified.json), [cleanup verification](voiceover-final-cleanup-verified.json), [Safari restoration](safari-restore-verified.json). The prepared script and earlier raw capability output below remain historical preparation, not an accepted actual-environment pass.

## Caption-panel alternative attempted and cleaned up

Apple documents that the [caption panel shows VoiceOver's current spoken output](https://support.apple.com/guide/voiceover/use-the-braille-and-caption-panel-unac078/10/mac/27). This provides a distinct candidate source **VoiceOver-caption-panel**, rather than browser AX text, DOM/ARIA, cursor content or braille. Native Utility inspection found **显示字幕面板=1** and **显示盲文面板=自动**; neither setting was changed.

An owned Chrome for Testing `151.0.7922.34` process `80526`, with isolated profile `/private/tmp/rain-vo-caption-9pxp3tv_`, opened the accepted local preview. The task resumed after a root-orchestrator interruption by checking existing processes first. Normal keyboard navigation targeted its local E3 page. A normal VoiceOver start briefly produced a running-reader probe; its native caption-window inventory then returned AppleScript **-1712** after the 5-second timeout, and the reader was no longer running. An earlier inventory had found no reader (**-1728**). No actual caption text was captured, so **E3/E6 spoken semantic cases remain not-run**. The process exit cause was not established; the read-only diagnostic-name probe found no matching VoiceOver crash-report file. No new AppleEvent consent or VoiceOver-target AppleEvent was requested, and no DOM/AX substitute counts as speech.

The original controls were independently re-read before closing Utility: **caption1, scripting0, welcome1, sheets0**; its pane was returned to original General. Normal Quit stopped owned Utility `72857`, but did not stop Chromium's background process. This was reported as an incomplete intermediate cleanup, then the owned PID, independent process group and exact temporary-profile argument were verified before SIGTERM. All known owned browser children stopped and only that profile was removed. Final read verifies reader/Quickstart/owned Utility/owned browser children not running, `voiceOverOnOffKey=false`, and Codex foreground. The user preview still returned HTTP200; no service was restarted.

Evidence: [original panel controls](voiceover-caption-original.json), [caption-read timeout](voiceover-caption-resume-panel-inventory.json), [restored controls](voiceover-caption-final-controls.json), [owned-child cleanup](voiceover-caption-owned-child-termination.json), [final independent verification](voiceover-caption-final-after-cleanup.json). The earlier `voiceover-caption-final-verified.json` deliberately retains the intermediate background-browser finding; it is superseded by the final cleanup evidence, not rewritten. One settings-navigation call never created a process because automatic approval review timed out; its one permitted retry succeeded. This was not an unsafe-action rejection.

## Prepared runnable operation — suspended by the current user decision

From this worktree, capability only (default):

```sh
python3 evidence/runtime/navigation-v042/w7/actual-a11y-2026-10-06/safari-smoke.py
```

Only after a future explicit decision to resume actual Safari automation, and after Remote Automation is available, the prepared smoke would be:

```sh
python3 evidence/runtime/navigation-v042/w7/actual-a11y-2026-10-06/safari-smoke.py --run
```

The script starts one owned driver on a dynamically reserved loopback port, requests a new Safari automation session, and changes only its mock-page session. Existing user tabs are never enumerated or selected. It sends native WebDriver pointer/keyboard/input commands; injected JavaScript only reads page state and geometry. It does not set DOM state, call React, synthesize input events, alter browser preferences or install dependencies.

Each HTTP call has a 5-second timeout; page load 8 seconds; script execution 3 seconds; subprocess waits at most 5 seconds. One total 120-second deadline aborts the smoke. Cleanup deletes only the owned WebDriver session, terminates the owned driver, waits 3 seconds, and kills that child if required. JSON output includes the actual driver version, raw error, native capabilities, individual checks, and cleanup result. Exit `0` means ready/passed, `1` means a smoke failed, and `2` means not-run. A successful capability probe alone never counts as behavioral validation.

## Scope and test lineage

The selectors and expected behavior come from `tests/e2e/navigation-v042-w6-review02.spec.ts` and the existing E6 review-workbench tests, checked against their owning source. Actual inner viewport remains Safari's measured viewport; the requested 1440×1000 outer window is not a hard responsive breakpoint or a product change.

- **E3:** Native ArrowRight/Enter selects the next question. Scoring remains mounted; focus/layout changes do not save; changing student leaves the other student's fields empty; returning restores the score, comment and saved state for the same student/question identity.
- **E4:** Temporary knowledge index preserves main geometry; pin allocates a permanent pane; focus and restoration preserve pinned mode, chapter `02:10`, paused playback and notes.
- **E6:** A nearby edge button remains visible after hiding the queue; native Option+Shift+Tab and Enter restore it; queue, preview and review identify the same document; draft changes follow the resource when moving forward and back. Safari settings governing Tab traversal are not altered.

This is representative behavior, not full browser coverage, contrast approval, VoiceOver approval or publication approval. The user's manual contrast/readability approval remains separate.

## VoiceOver interface — installed dictionary only

Read `/System/Library/CoreServices/VoiceOver.app/Contents/Resources/VoiceOver.sdef` and its `Info.plist`: VoiceOver `10`, build `993`. The dictionary provides:

- `last phrase` → read-only `content`: the text of VoiceOver's last output. Candidate read command: `tell application "VoiceOver" to get content of last phrase`.
- `vo cursor` → read-only `text under cursor`: cursor content; this alone does **not** prove the spoken phrase.
- `output announcement history`: displays recent announcements. The installed dictionary does not expose a readable history array.

The General setting **Allow VoiceOver to be controlled with AppleScript** governs script control. [Apple's VoiceOver Utility documentation](https://support.apple.com/en-in/guide/voiceover/cpvougen) documents that setting. The existence of the dictionary and `NSAppleScriptEnabled=true` does not establish the user's permission state. The prior read of `com.apple.VoiceOver4 AppleScriptEnabled` returned no such key and is not evidence that the correct control setting is enabled or disabled. During the dictionary-only preparation, no Apple Event was sent to VoiceOver. The later temporary attempt is reported above; it still sent no VoiceOver-target Apple Event.

Actual VoiceOver validation still requires a running reader, the relevant existing script/automation permissions, a controlled test page, and captured `last phrase.content` after real navigation. AX trust and DOM/ARIA inspection cannot replace that evidence. This script only inventories the dictionary and current process state; it never toggles VoiceOver or reads the clipboard.

## Earlier capability-only execution — before temporary authorization and human deferral

Prepared; Python AST syntax and `--help` passed. The earlier capability-only run on 2026-10-06 01:08 Asia/Shanghai returned exit `2`. Actual Safari smoke and VoiceOver speech remain **not-run**. There was no Safari session to close; the owned driver exited `0` and stopped. No preferences, VoiceOver state, user tabs or HTTP services changed.

Exact capability output (UTC timestamps):

```json
{
  "kind": "actual-installed-Safari-WebDriver",
  "status": "not-run",
  "cases": [],
  "checks": [],
  "settingsChanged": false,
  "userTabsReused": false,
  "servicesStarted": [],
  "voiceOver": {
    "status": "not-run",
    "version": "10",
    "build": "993",
    "runningProbeExit": 1,
    "dictionarySha256": "393ade36b8b9e18ee954484f4a89e6ca715a75273323756fb8f6a91d21549e53",
    "lastPhraseContentInterface": true,
    "cursorTextInterface": true,
    "reason": "Installed dictionary read only. No VoiceOver launch, Apple Events, speech capture or permission changes."
  },
  "startedAt": "2026-10-05T17:08:45Z",
  "driverVersion": "Included with Safari 26.6.2 (21624.5.1.11.3)",
  "driverCommand": ["/usr/bin/safaridriver", "-p", "54315"],
  "reason": "{\"error\": \"session not created\", \"message\": \"Could not create a session: You must enable 'Allow remote automation' in the Developer section of Safari Settings to control Safari via WebDriver.\", \"stacktrace\": \"\"}",
  "driverCleanup": {"pid": 40294, "exitCode": 0, "stopped": true},
  "driverLog": "",
  "finishedAt": "2026-10-05T17:08:46Z"
}
```
