# Independent boundary recheck — 2026-10-06

Repeated the same four payloads from the preserved pre-repair audit in an isolated temporary copy. Actual verifier SHA-256: `bde47d00309d7aebb82ec99651c80e7a5ce2109a3d8e2cc5e98e6a79083819b7`.

Baseline Boundary and B2 both exited `0` and printed their real pass messages. The unknown-source control exited `1`. All four previous escapes now exit `1` in Boundary:

| Payload | Boundary exit | Independent B2 exit |
|---|---:|---:|
| Registry self-registration | 1 | 1 |
| Freeze keys self-registration | 1 | 0 |
| Regression-map self-registration | 1 | 0 |
| Live runtime import of unregistered `docs` executable source | 1 | 0 |

B2's scope is independent; the repaired Boundary is what rejects the last three paths. Input records, product sources, old reports and real-worktree settings were not mutated. All payloads were reverted inside the copy and the temporary copy was removed. Raw logs and `results.json` are beside this document. No remaining escape was observed for these four checks; this is not a claim about arbitrary dynamic imports or all dependency graphs.

Reproduction from the worktree:

```sh
node evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-05/boundary-independent-2026-10-06.mjs evidence/runtime/navigation-v042/w7/engineering-closeout-2026-10-05/boundary-independent-2026-10-06-after
```
