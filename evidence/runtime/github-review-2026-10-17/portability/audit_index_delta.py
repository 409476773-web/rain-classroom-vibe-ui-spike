#!/usr/bin/env python3
"""Read-only Git-index credential/archive delta audit; writes only local audit records."""
from pathlib import Path, PurePosixPath
from datetime import datetime
from zoneinfo import ZoneInfo
import subprocess, hashlib, collections, json, re, io, tarfile, zipfile

ROOT = Path.cwd()
PROOF = ROOT / 'evidence/runtime/github-review-2026-10-17/portability'
ORIGINAL = ROOT.parent / 'card-v2'
CACHE = PROOF / '.vite/upload-audit-blobs.json'
BASE = json.loads((PROOF / 'upload-audit.json').read_text())
CACHE.parent.mkdir(parents=True, exist_ok=True)
raw = subprocess.check_output(['git', 'ls-files', '--stage', '-z'])
entries, owners = {}, collections.defaultdict(list)
for row in raw.split(b'\0'):
    if not row:
        continue
    header, name = row.split(b'\t', 1)
    mode, oid, stage = header.decode().split()
    path = name.decode()
    entries[path] = {'mode': mode, 'oid': oid, 'stage': int(stage)}
    owners[oid].append(path)
checked = subprocess.run(['git', 'cat-file', '--batch-check=%(objectname) %(objecttype) %(objectsize)'], input='\n'.join(owners) + '\n', text=True, capture_output=True, check=True)
sizes = {oid: int(size) for oid, kind, size in (line.split() for line in checked.stdout.splitlines())}
proc = subprocess.Popen(['git', 'cat-file', '--batch'], stdin=subprocess.PIPE, stdout=subprocess.PIPE)

def blob(oid):
    proc.stdin.write((oid + '\n').encode()); proc.stdin.flush()
    header = proc.stdout.readline().split()
    value = proc.stdout.read(int(header[2])); proc.stdout.read(1)
    return value

def git_oid(value):
    return hashlib.sha1(b'blob ' + str(len(value)).encode() + b'\0' + value).hexdigest()

font_suffixes = ('.otf', '.ttf', '.woff', '.woff2')
archive_suffixes = ('.zip', '.tar', '.tar.gz', '.tgz', '.gz')
patterns = [
    ('github-token', re.compile(rb'(?<![A-Za-z0-9_-])(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]{20,}'), (b'gh', b'github_pat_')),
    ('openai-key', re.compile(rb'(?<![A-Za-z0-9_-])sk-(?:proj-)?[A-Za-z0-9_-]{20,}'), (b'sk-',)),
    ('aws-access-key', re.compile(rb'(?<![A-Za-z0-9_-])AKIA[0-9A-Z]{16}(?![A-Za-z0-9_-])'), (b'AKIA',)),
    ('private-key-header', re.compile(rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----'), (b'PRIVATE KEY',)),
    ('literal-credential-assignment', re.compile(rb'''(?i)(?:api[_-]?key|access[_-]?token|client[_-]?secret|password|_authToken)\s*[:=]\s*["']([A-Za-z0-9_./+=-]{16,})["']'''), (b'api', b'Api', b'API', b'token', b'Token', b'TOKEN', b'password', b'secret')),
    ('literal-bearer-credential', re.compile(rb'(?i)\bBearer\s+([A-Za-z0-9_./+=-]{20,})'), (b'Bearer', b'bearer')),
    ('embedded-url-credential', re.compile(rb'''https?://[^\s/:@"'<>]{1,100}:[^\s/@"'<>]{3,100}@'''), (b'://',)),
]
hits, fresh_archives = [], []
counts = collections.Counter()

def scan(path, value):
    if b'\0' in value[:8192]:
        counts['binaryBlobsInspected'] += 1
        return 'binary'
    try:
        value.decode('utf-8')
    except UnicodeError:
        counts['binaryBlobsInspected'] += 1
        return 'binary'
    counts['textBlobsScanned'] += 1; counts['textBytesScanned'] += len(value)
    for kind, pattern, gates in patterns:
        if not any(gate in value for gate in gates):
            continue
        matches = list(pattern.finditer(value))
        if matches:
            classification = collections.Counter()
            for match in matches:
                candidate = match.group(1) if match.lastindex else match.group(0)
                lower = candidate.lower()
                placeholder = len(set(candidate)) <= 3 or any(x in lower for x in [b'example', b'dummy', b'placeholder', b'not-a-secret', b'test-secret', b'mock-token'])
                classification['obvious-placeholder-value' if placeholder else 'unresolved-secret-shape'] += 1
            hits.append({'path': path, 'type': kind, 'matches': len(matches), 'classifications': dict(classification)})
    return 'text'

def inspect_archive(path, value, depth=0):
    record = {'path': path, 'depth': depth, 'entries': 0, 'issues': []}
    fresh_archives.append(record)
    def entry(name, size, reader=None, link=None):
        record['entries'] += 1
        parts = PurePosixPath(name).parts
        if name.startswith('/') or '..' in parts: record['issues'].append({'member': name, 'type': 'unsafe-member-path'})
        if name.lower().endswith(font_suffixes): record['issues'].append({'member': name, 'type': 'font-file'})
        if '.git' in parts: record['issues'].append({'member': name, 'type': 'git-metadata'})
        if 'node_modules' in parts: record['issues'].append({'member': name, 'type': 'bundled-dependencies'})
        if parts and parts[-1].startswith('.env') and parts[-1] not in ['.env.example', '.env.sample']: record['issues'].append({'member': name, 'type': 'environment-credential-file'})
        if link and (link.startswith('/') or '..' in PurePosixPath(link).parts): record['issues'].append({'member': name, 'type': 'external-link-target'})
        if reader is None: return
        if size > 32 * 1024**2: record['issues'].append({'member': name, 'type': 'member-over-32MiB-budget'}); return
        data = reader()
        if name.lower().endswith(archive_suffixes) and depth < 2: inspect_archive(path + '!' + name, data, depth + 1)
        elif name.lower().endswith(archive_suffixes): record['issues'].append({'member': name, 'type': 'nested-archive-depth-limit'})
        else: scan(path + '!' + name, data)
    try:
        if path.lower().endswith('.zip'):
            with zipfile.ZipFile(io.BytesIO(value)) as archive:
                for item in archive.infolist():
                    is_link = ((item.external_attr >> 16) & 0o170000) == 0o120000
                    entry(item.filename, item.file_size, None if item.is_dir() or is_link else lambda item=item: archive.read(item), archive.read(item).decode('utf-8', 'replace') if is_link else None)
        else:
            with tarfile.open(fileobj=io.BytesIO(value), mode='r:*') as archive:
                for item in archive:
                    entry(item.name, item.size, (lambda item=item: archive.extractfile(item).read()) if item.isfile() else None, item.linkname if item.issym() or item.islnk() else None)
        record['status'] = 'inspected'
    except Exception as error:
        record['status'] = 'inspection-error'; record['errorType'] = type(error).__name__

cache = json.loads(CACHE.read_text()) if CACHE.exists() else {'schemaVersion': '1.0', 'blobs': {}, 'baselineReconstruction': None}
known = cache['blobs']
if not known:
    # The original card-v2 is unchanged. Only same-path, same-content staged blobs
    # can be conservatively inherited from the prior full upload audit. New or
    # successor content is scanned below, even if that repeats harmless text.
    inherited = 0
    restored_media = set(json.loads((PROOF / 'omitted-media-link-audit.json').read_text())['restoredFiles'])
    for path, row in entries.items():
        if row['oid'] in known or path in restored_media: continue
        source = ORIGINAL / path
        if not source.is_file() or source.is_symlink(): continue
        value = source.read_bytes()
        if git_oid(value) != row['oid']: continue
        if path.lower().endswith(archive_suffixes):
            prior = next((x for x in BASE['archiveScan']['archives'] if x['path'] == path and x.get('status') == 'inspected'), None)
            if not prior: continue
            kind = 'archive'
        else:
            kind = 'inherited-prior-full-audit-content'
        known[row['oid']] = {'kind': kind, 'bytes': len(value), 'credentialScan': 'clear', 'baseline': 'original-same-path-same-blob'}
        inherited += 1
    cache['baselineReconstruction'] = {'priorFullIndexSha256': BASE['stagedInventorySha256'], 'method': 'untouched original same-path same-content blobs; other current text is freshly scanned', 'inheritedBlobs': inherited, 'note': 'The first full report retained an index digest, not a complete individual-blob list. This conservative reconstruction does not claim an exact historical per-path diff.'}
new_blob_paths = []
for oid, paths in owners.items():
    if oid in known and known[oid].get('credentialScan') == 'clear' and known[oid].get('archiveSafe', True):
        counts['cachedBlobsReused'] += 1
        continue
    value = blob(oid); path = paths[0]
    archive_start = len(fresh_archives)
    if any(x.lower().endswith(archive_suffixes) for x in paths):
        inspect_archive(path, value); kind = 'archive'
    else:
        kind = scan(path, value)
    known[oid] = {'kind': kind, 'bytes': len(value), 'credentialScan': 'clear' if not any(x['path'] == path or x['path'].startswith(path + '!') for x in hits) else 'requires-review'}
    if kind == 'archive': known[oid]['archiveSafe'] = all(x.get('status') == 'inspected' and not x['issues'] for x in fresh_archives[archive_start:])
    new_blob_paths.append({'oid': oid, 'path': path, 'bytes': len(value), 'kind': kind})

binding_path = 'evidence/runtime/github-review-successor-2026-10-17/source-bindings.json'
binding_bytes = blob(entries[binding_path]['oid']); bindings = json.loads(binding_bytes)
source_results, before_results, external_findings = [], [], []
external_pattern = re.compile(rb'''(?:readFileSync|writeFileSync|readdirSync|existsSync|cpSync|statSync|lstatSync|require|import)\(\s*["'](?:/Users/|/Volumes/|/Library/|file://)''')
for path, binding in bindings['sourceFiles'].items():
    current_value = blob(entries[path]['oid']) if path in entries else None
    actual = hashlib.sha256(current_value).hexdigest() if current_value is not None else None
    if current_value is not None and external_pattern.search(current_value): external_findings.append({'path': path, 'type': 'absolute-external-filesystem-read-or-import-literal'})
    source_results.append({'path': path, 'expectedSha256': binding['after'], 'stagedSha256': actual, 'matches': actual == binding['after']})
    if binding.get('before') is not None:
        prior = binding.get('beforeSnapshot')
        actual_before = hashlib.sha256(blob(entries[prior]['oid'])).hexdigest() if prior in entries else None
        before_results.append({'path': prior, 'expectedSha256': binding['before'], 'stagedSha256': actual_before, 'matches': actual_before == binding['before']})
bad_zip = 'evidence/runtime/chart-radar-feedback-2026-10-09/baseline-browser-results/.playwright-artifacts-1/978ebbc29e6a2f455e3ebdcaf791cda7.zip'
media_record = json.loads((PROOF / 'omitted-media-link-audit.json').read_text())
media_results = []
for path in media_record['restoredFiles']:
    value = blob(entries[path]['oid']) if path in entries else None
    original = ORIGINAL / path
    media_results.append({'path': path, 'indexed': path in entries, 'matchesOriginal': value is not None and original.is_file() and hashlib.sha256(value).digest() == hashlib.sha256(original.read_bytes()).digest()})
force = json.loads((PROOF / 'force-add-files.json').read_text())['files']
required = [x for x in json.loads((PROOF / 'required-governance-reads.json').read_text())['paths'] if not x.startswith('node_modules/')]
raw_after = subprocess.check_output(['git', 'ls-files', '--stage', '-z'])
report = {
    'schemaVersion': '1.0', 'scope': 'current-index-incremental-upload-audit', 'auditedAt': datetime.now(ZoneInfo('Asia/Shanghai')).isoformat(),
    'indexInventorySha256': hashlib.sha256(raw).hexdigest(), 'indexChangedDuringAudit': raw_after != raw,
    'filecount': len(entries), 'totalbytes': sum(sizes[x['oid']] for x in entries.values()), 'uniqueBlobs': len(owners), 'uniqueBlobBytes': sum(sizes.values()),
    'maxfiles': [{'path': p, 'bytes': sizes[v['oid']]} for p, v in sorted(entries.items(), key=lambda pair: -sizes[pair[1]['oid']])[:12]],
    'sourceBindingFileSha256': hashlib.sha256(binding_bytes).hexdigest(), 'sourceBindingFiles': source_results, 'sourceBindingFilesCount': len(source_results), 'sourceBindingsAllMatchIndex': all(x['matches'] for x in source_results), 'beforeSnapshotsAllMatchIndex': all(x['matches'] for x in before_results),
    'removedDamagedZipAbsentFromIndex': bad_zip not in entries, 'restored15Media': media_results, 'allRestored15MediaIndexedAndByteEqual': len(media_results) == 15 and all(x['indexed'] and x['matchesOriginal'] for x in media_results),
    'missingForceAddFiles': [x for x in force if x not in entries], 'missingFixedGovernanceReads': [x for x in required if x not in entries],
    'fonts': [x for x in entries if x.lower().endswith(font_suffixes)], 'symlinks': [x for x, v in entries.items() if v['mode'] == '120000'], 'gitlinks': [x for x, v in entries.items() if v['mode'] == '160000'], 'rootNodeModulesFiles': [x for x in entries if x.startswith('node_modules/')],
    'scanCounts': dict(counts), 'credentialHits': hits, 'newArchivesInspected': fresh_archives, 'newOrUncachedBlobPaths': new_blob_paths,
    'baselineReconstruction': cache['baselineReconstruction'],
    'externalRequiredPaths': {'knownMandatoryExternalFilesystemPaths': external_findings, 'newSourceDirectAbsoluteReadImportScan': 'all25-source-bindings', 'optionalLiveClassicAudit': 'RAIN_CLASSIC_AUDIT_ROOT is explicit optional live-source mode, not a default runtime/test requirement', 'runtimeDependencies': 'Root node_modules is reconstructed by a frozen install'},
    'limits': ['Reuses already audited exact blobs; inherited originals are verified same-path and same-blob against the untouched original worktree.', 'Freshly scans every remaining current text blob rather than asserting an unavailable exact old path diff.', 'Existing archive contents are not rescanned if their exact original bytes match the prior successful full archive inspection.', 'No OCR, external network access or full tests; credential scanning is heuristic.', 'Generated audit files and ignored local cache are outside the audited snapshot and are staged afterward.'],
    'reusableScript': 'audit_index_delta.py', 'localIgnoredCache': '.vite/upload-audit-blobs.json',
}
(PROOF / 'final-delta-audit.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
cache['indexInventorySha256'] = report['indexInventorySha256']; cache['auditedAt'] = report['auditedAt']
CACHE.write_text(json.dumps(cache, ensure_ascii=False, separators=(',', ':')) + '\n')
proc.stdin.close(); proc.wait()
print(json.dumps({'filecount': report['filecount'], 'totalbytes': report['totalbytes'], 'indexChangedDuringAudit': report['indexChangedDuringAudit'], 'sourceBindingFileSha256': report['sourceBindingFileSha256'], 'sourceBindingFilesCount': len(source_results), 'sourceBindingsAllMatchIndex': report['sourceBindingsAllMatchIndex'], 'beforeSnapshotsAllMatchIndex': report['beforeSnapshotsAllMatchIndex'], 'removedDamagedZipAbsentFromIndex': report['removedDamagedZipAbsentFromIndex'], 'allRestored15MediaIndexedAndByteEqual': report['allRestored15MediaIndexedAndByteEqual'], 'credentialHitRecords': len(hits), 'newArchiveInspections': len(fresh_archives), 'scanCounts': dict(counts), 'missingForceAddFiles': report['missingForceAddFiles'], 'missingFixedGovernanceReads': report['missingFixedGovernanceReads']}, ensure_ascii=False, indent=2))
