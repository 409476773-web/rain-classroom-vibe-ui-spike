"""Local experiment: incremental receipts with one coverage review in an ephemeral read-only thread.

Usage: python3 -B run-coverage-chunked.py CONTEXT OUT PROMPT IMAGE IMAGE
No model/effort override; no reasoning events or command-output bodies are exported.
"""
import hashlib
import json
import mimetypes
import queue
import re
import subprocess
import sys
import threading
import time
from collections import Counter
from pathlib import Path

from PIL import Image

CLI = '/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex'
DEADLINE_SECONDS = 180
TOTAL_BUDGET_SECONDS = 900

def save_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def public_item(item):
    allowed = {'agentMessage': ('id', 'type', 'text', 'phase'),
               'imageView': ('id', 'type', 'path', 'status')}
    keys = allowed.get(item.get('type'))
    return {key: item[key] for key in keys if key in item} if keys else None


def is_turn_completed(event, thread_id, turn_id):
    params = event.get('params', {})
    return (event.get('method') == 'turn/completed' and params.get('threadId') == thread_id
            and params.get('turn', {}).get('id') == turn_id)


def image_inputs(images):
    return [{'type': 'localImage', 'path': str(path)} for path in images]




def matching_source_lines(source_lines, output):
    candidates = set()
    for line in output.splitlines():
        line = line.strip()
        candidates.add(line)
        candidates.add(re.sub(r'^\d+[:\t]\s*', '', line))
    return source_lines & candidates


def validate_receipt(value):
    if not isinstance(value, dict) or type(value.get('done')) is not bool:
        raise ValueError('receipt must be an object with boolean done')
    if value['done']:
        if set(value) != {'done', 'summary'} or not isinstance(value['summary'], str) or not value['summary'].strip():
            raise ValueError('completion requires only done and nonempty summary')
        return value
    fields = {'done', 'objects', 'reference', 'status', 'outcome', 'observation', 'evidence', 'limit'}
    if set(value) != fields or any(not isinstance(value[key], str) or not value[key].strip() for key in fields - {'done'}):
        raise ValueError('one receipt requires every text field')
    if value['status'] not in ('已检查', '未检查') or value['outcome'] not in ('正常', '异常', '无法判断'):
        raise ValueError('invalid status or outcome')
    if value['status'] == '未检查' and value['outcome'] != '无法判断':
        raise ValueError('an unchecked relation cannot be declared normal or abnormal')
    return value



def validate_coverage(value, receipts):
    if not isinstance(value, dict) or set(value) != {'coverage', 'decision', 'summary'}:
        raise ValueError('coverage response requires coverage, decision and summary')
    if value['decision'] not in ('补查', '结束') or not isinstance(value['summary'], str) or not value['summary'].strip():
        raise ValueError('invalid coverage decision or summary')
    if not isinstance(value['coverage'], list) or not value['coverage']:
        raise ValueError('coverage must be a nonempty list')
    known = {item['id'] for item in receipts}
    for item in value['coverage']:
        if not isinstance(item, dict) or set(item) != {'objects', 'dimension', 'status', 'receipts', 'note'}:
            raise ValueError('invalid coverage row fields')
        if any(not isinstance(item[key], str) or not item[key].strip() for key in ('objects', 'dimension', 'note')):
            raise ValueError('empty coverage description')
        if item['status'] not in ('已查', '未查', '证据不足') or not isinstance(item['receipts'], list):
            raise ValueError('invalid coverage status or receipt references')
        if any(not isinstance(rid, str) or rid not in known for rid in item['receipts']):
            raise ValueError('coverage references an unknown receipt')
        if len(set(item['receipts'])) != len(item['receipts']) or (item['status'] == '已查' and not item['receipts']):
            raise ValueError('duplicate or missing evidence references')
    return value


def can_start_stage(elapsed):
    return elapsed + DEADLINE_SECONDS <= TOTAL_BUDGET_SECONDS


def main():
    if len(sys.argv) != 6:
        raise ValueError(__doc__)
    context, output, prompt_path = (Path(arg).resolve() for arg in sys.argv[1:4])
    images = [Path(arg).resolve() for arg in sys.argv[4:]]
    if not context.is_dir() or not all(path.is_file() for path in images):
        raise ValueError('invalid context or image paths')
    skill = context / '.agents/skills/rain-designer/SKILL.md'
    designer = skill.parent / 'references/designer.md'
    source_paths = {'skill': skill, 'designer': designer, 'guide': context / 'docs/ai/prototype-design.md'}
    source_texts = {name: path.read_text().strip() for name, path in source_paths.items()}
    source_lines = {name: {line.strip() for line in text.splitlines() if line.strip()} for name, text in source_texts.items()}
    seen_source_lines = {name: set() for name in source_texts}
    prompt = prompt_path.read_text()
    metadata = []
    for path in images:
        with Image.open(path) as image:
            metadata.append({'path': str(path), 'width': image.width, 'height': image.height,
                             'mime': mimetypes.guess_type(path)[0] or 'image/png',
                             'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
    output.mkdir(parents=True, exist_ok=False)
    summary = {'assetIdentity': 'local-experiment', 'cwd': str(context), 'images': metadata,
               'promptSha256': hashlib.sha256(prompt.encode()).hexdigest(), 'status': 'starting',
               'modelOverride': False, 'effortOverride': False, 'stages': [],
               'requestedReadOnly': {'ephemeral': True, 'sandbox': 'read-only', 'approvalPolicy': 'never',
                                     'networkAccess': False},
               'readEvidence': {name: {'fullTextInCommandOutput': False, 'itemIds': [],
                                      'fullTextAcrossCommandOutputs': False, 'lineMatchItemIds': [],
                                      'expectedUniqueNonblankLines': len(source_lines[name]), 'matchedUniqueNonblankLines': 0,
                                      'strippedTextSha256': hashlib.sha256(text.encode()).hexdigest(),
                                      'fileSha256': hashlib.sha256(source_paths[name].read_bytes()).hexdigest()}
                                for name, text in source_texts.items()},
               'approvalOrExternalRequestsRejected': 0}
    started = time.monotonic()
    process = subprocess.Popen([CLI, 'app-server', '--stdio'], cwd=context, stdin=subprocess.PIPE,
                               stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True, bufsize=1)
    incoming = queue.Queue()
    sent = []
    deadline = time.monotonic() + DEADLINE_SECONDS
    root_id = None
    active = None
    completed = []
    item_types = Counter()
    root_items = {}
    turn_completions = {}

    def listen():
        for line in process.stdout:
            try:
                incoming.put(json.loads(line))
            except json.JSONDecodeError:
                pass
        incoming.put(None)

    threading.Thread(target=listen, daemon=True).start()

    def send(method, params, request_id=None):
        request = {'method': method, 'params': params}
        if request_id is not None:
            request['id'] = request_id
        sent.append(request)
        process.stdin.write(json.dumps(request, ensure_ascii=False) + '\n')
        process.stdin.flush()

    def receive():
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            raise TimeoutError('native observation stage exceeded 180 seconds')
        event = incoming.get(timeout=min(remaining, 20))
        if event is None:
            raise RuntimeError('app server ended')
        params = event.get('params', {})
        if event.get('method') == 'item/started' and params.get('item', {}).get('type') in ('mcpToolCall', 'webSearch', 'fileChange'):
            summary['forbiddenActionObserved'] = {'type': params['item']['type'], 'threadId': params.get('threadId')}
            raise RuntimeError('external access or file mutation was attempted; stopping review')
        if 'id' in event and 'method' in event:
            summary['approvalOrExternalRequestsRejected'] += 1
            process.stdin.write(json.dumps({'id': event['id'], 'error': {'code': -32601,
                'message': 'No approval or external request is authorized in this read-only review'}}) + '\n')
            process.stdin.flush()
        if event.get('method') == 'item/completed':
            item = params.get('item', {})
            item_types[item.get('type', 'unknown')] += 1
            if params.get('threadId') == root_id:
                # Keep public items only; command bodies are inspected in memory, never exported.
                bucket = root_items.setdefault(params.get('turnId'), {'types': [], 'public': []})
                bucket['types'].append(item.get('type'))
                public = public_item(item)
                if public is not None:
                    bucket['public'].append(public)
                if item.get('type') == 'commandExecution':
                    command_output = item.get('aggregatedOutput', item.get('aggregateOutput', '')) or ''
                    for name, text in source_texts.items():
                        if text and text in command_output:
                            summary['readEvidence'][name]['fullTextInCommandOutput'] = True
                            summary['readEvidence'][name]['itemIds'].append(item.get('id'))
                        matched = matching_source_lines(source_lines[name], command_output)
                        if matched:
                            seen_source_lines[name].update(matched)
                            evidence = summary['readEvidence'][name]
                            evidence['lineMatchItemIds'].append(item.get('id'))
                            evidence['matchedUniqueNonblankLines'] = len(seen_source_lines[name])
                            evidence['fullTextAcrossCommandOutputs'] = seen_source_lines[name] == source_lines[name]
                            evidence['unmatchedNonblankLineNumbers'] = [number for number, line in enumerate(text.splitlines(), 1)
                                if line.strip() and line.strip() not in seen_source_lines[name]]
        if event.get('method') == 'turn/completed' and params.get('threadId') == root_id:
            turn_completions[params['turn']['id']] = params['turn']
        return event

    def rpc(method, params, request_id):
        send(method, params, request_id)
        while True:
            try:
                event = receive()
            except queue.Empty:
                continue
            if event.get('id') == request_id and 'method' not in event:
                if 'error' in event:
                    raise RuntimeError(event['error'])
                return event['result']

    def run_stage(name, inputs, request_id):
        nonlocal deadline, active, completed
        deadline = time.monotonic() + DEADLINE_SECONDS
        stage_started = time.monotonic()
        directory = output / name
        directory.mkdir()
        completed = []
        active = {'name': name, 'status': 'starting', 'completedItemTypes': []}
        summary['stages'].append(active)
        save_json(directory / 'input.json', inputs)
        try:
            response = rpc('turn/start', {'threadId': root_id, 'input': inputs,
                'sandboxPolicy': {'type': 'readOnly', 'networkAccess': False}, 'approvalPolicy': 'never'}, request_id)
            active['turnId'] = response['turn']['id']
            print(json.dumps({'state': name, 'threadId': root_id, 'turnId': active['turnId']}), flush=True)
            while active['turnId'] not in turn_completions:
                try:
                    event = receive()
                except queue.Empty:
                    continue
                # receive stores only completions from this root thread, keyed by turn.
                if is_turn_completed(event, root_id, active['turnId']):
                    break
            active['status'] = turn_completions[active['turnId']]['status']
            active['turnError'] = turn_completions[active['turnId']].get('error')
            completed = root_items.get(active['turnId'], {}).get('public', [])
            agents = [item for item in completed if item['type'] == 'agentMessage']
            final = [item.get('text', '') for item in agents if item.get('phase') == 'final_answer']
            if not final and agents:
                final = [agents[-1].get('text', '')]
            review = '\n\n'.join(final)
            (directory / 'review.md').write_text(review + '\n')
            if active['status'] != 'completed' or not review.strip():
                raise RuntimeError(f'{name}: incomplete turn or missing public result')
            active['finalChars'] = len(review)
            return review
        except (Exception, KeyboardInterrupt) as error:
            active.update(status='runner-error', error=str(error))
            raise
        finally:
            bucket = root_items.get(active.get('turnId'), {'types': [], 'public': []})
            active['completedItemTypes'] = bucket['types']
            completed = bucket['public']
            active['elapsedSeconds'] = round(time.monotonic() - stage_started, 2)
            save_json(directory / 'completed-items.json', completed)
            if not (directory / 'review.md').exists():
                (directory / 'review.md').write_text('')
            save_json(directory / 'execution-facts.json', active)

    try:
        rpc('initialize', {'clientInfo': {'name': 'rain_designer_observation', 'version': '1.0'},
                          'capabilities': {'experimentalApi': True}}, 1)
        send('initialized', {})
        discovery = rpc('skills/list', {'cwds': [str(context)], 'forceReload': True}, 2)
        matches = []
        for entry in discovery.get('data', []):
            for found in entry.get('skills', []):
                if found.get('name') == 'rain-designer':
                    matches.append({'name': found['name'], 'path': found.get('path'), 'enabled': found.get('enabled'),
                                    'pathMatches': Path(found.get('path', '')).resolve() == skill.resolve()})
        summary['skillDiscovery'] = {'matches': matches,
                                    'enabledPathMatches': any(item['enabled'] and item['pathMatches'] for item in matches)}
        save_json(output / 'discovery.json', summary['skillDiscovery'])
        if not summary['skillDiscovery']['enabledPathMatches']:
            raise RuntimeError('native discovery did not find enabled target skill at the expected path')
        thread = rpc('thread/start', {'cwd': str(context), 'ephemeral': True,
                                     'sandbox': 'read-only', 'approvalPolicy': 'never'}, 3)
        root_id = thread['thread']['id']
        summary.update(threadId=root_id, threadPath=thread['thread'].get('path'), model=thread.get('model'),
                       reasoningEffort=thread.get('reasoningEffort'), modelProvider=thread.get('modelProvider'),
                       threadSettings={key: thread.get(key) for key in ['approvalPolicy', 'sandbox', 'reasoningEffort']})
        summary['preparation'] = run_stage('prepare', [{'type': 'text', 'text': prompt},
            {'type': 'skill', 'name': 'rain-designer', 'path': str(skill)}], 4)
        if not all(item['fullTextAcrossCommandOutputs'] for item in summary['readEvidence'].values()):
            raise RuntimeError('preparation ended without full-text reading evidence for all three documents')
        next_prompt = prompt_path.with_name('next-prompt.txt').read_text()
        summary['receipts'] = []
        index = 1
        stage_prefix = 'receipt'
        summary['coverageReviewPerformed'] = False
        while can_start_stage(time.monotonic() - started):
            review = run_stage(f'{stage_prefix}-{index:02d}', [{'type': 'text', 'text': next_prompt},
                *image_inputs(images)], 10 + index)
            receipt = validate_receipt(json.loads(review))
            if receipt['done']:
                if not summary['coverageReviewPerformed']:
                    summary['preCoverage'] = {'receipts': list(summary['receipts']), 'finalFindings': receipt['summary'],
                        'elapsedSeconds': round(time.monotonic() - started, 2)}
                    save_json(output / 'before-coverage.json', summary['preCoverage'])
                    if not can_start_stage(time.monotonic() - started):
                        summary['status'] = 'budget-exhausted-before-coverage'
                        break
                    coverage_prompt = prompt_path.with_name('coverage-prompt.txt').read_text()
                    audit = run_stage('coverage-audit', [{'type': 'text', 'text': coverage_prompt
                        + json.dumps(summary['receipts'], ensure_ascii=False)}, *image_inputs(images)], 6000)
                    coverage = validate_coverage(json.loads(audit), summary['receipts'])
                    save_json(output / 'coverage.json', coverage)
                    summary.update(coverageReviewPerformed=True, coverageDecision=coverage['decision'])
                    if coverage['decision'] == '补查':
                        stage_prefix = 'supplement'
                        next_prompt = prompt_path.with_name('supplement-prompt.txt').read_text() + '\n' + next_prompt
                        continue
                    receipt['summary'] = coverage['summary']
                summary.update(status='completed', finalFindings=receipt['summary'])
                break
            receipt['id'] = f'R{index:02d}'
            summary['receipts'].append(receipt)
            if index == 1:
                summary['firstReceiptTotalSeconds'] = round(time.monotonic() - started, 2)
                summary['firstReceiptStageSeconds'] = active['elapsedSeconds']
            save_json(output / 'receipts.json', summary['receipts'])
            save_json(output / 'progress.json', {'deliveredCount': index, 'elapsedSeconds': round(time.monotonic() - started, 2)})
            print(json.dumps({'receiptDelivered': index, 'totalSeconds': round(time.monotonic() - started, 2)}), flush=True)
            index += 1
        else:
            summary['status'] = 'budget-exhausted'
        send('thread/unsubscribe', {'threadId': root_id}, 9999)
    except (Exception, KeyboardInterrupt) as error:
        summary.update(status='runner-error', error=str(error))
    finally:
        try:
            process.stdin.close()
            process.wait(timeout=8)
        except (subprocess.TimeoutExpired, BrokenPipeError):
            process.terminate()
            try:
                process.wait(timeout=8)
            except subprocess.TimeoutExpired:
                process.kill()
                process.wait()
        summary.update(processExitCode=process.returncode, elapsedSeconds=round(time.monotonic() - started, 2),
                       allThreadCompletedItemCounts=dict(item_types),
                       observedFileChanges=item_types['fileChange'], observedMcpCalls=item_types['mcpToolCall'],
                       observedWebSearches=item_types['webSearch'])
        summary['readOnlyObserved'] = not summary.get('forbiddenActionObserved') and not any(
            summary[key] for key in ('observedFileChanges', 'observedMcpCalls', 'observedWebSearches'))
        summary['readOnlyEvidenceLimit'] = 'Requested sandbox plus observable tool events; context hashes must be compared separately. This does not prove all network capabilities were disabled.'
        save_json(output / 'summary.json', summary)
        save_json(output / 'requests.json', sent)
        print(json.dumps({'status': summary['status'], 'summary': str(output / 'summary.json')}), flush=True)
    return 0 if summary['status'] == 'completed' else 1


if __name__ == '__main__':
    sys.exit(main())
