"""Local experiment: inventory and small public receipt batches in an ephemeral read-only thread.

Usage: python3 -B run-batches.py CONTEXT OUT PROMPT IMAGE IMAGE
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


def validate_inventory(value):
    if not isinstance(value, dict) or set(value) != {'relations', 'scope'}:
        raise ValueError('inventory must contain exactly relations and scope')
    if not isinstance(value['scope'], str) or not value['scope'].strip():
        raise ValueError('inventory scope must be nonempty text')
    relations = value['relations']
    if not isinstance(relations, list) or not relations:
        raise ValueError('inventory relations must be a nonempty list')
    seen = set()
    for relation in relations:
        if not isinstance(relation, dict) or set(relation) != {'id', 'objects', 'dimension'}:
            raise ValueError('inventory relation fields must be exactly id, objects, dimension')
        rid = relation['id']
        if not isinstance(rid, str) or not re.fullmatch(r'R\d+', rid) or rid in seen:
            raise ValueError('inventory relation IDs must match R\\d+ and be unique')
        if any(not isinstance(relation[key], str) or not relation[key].strip()
               for key in ('objects', 'dimension')):
            raise ValueError('inventory objects and dimension must be nonempty text')
        seen.add(rid)
    return value


def observation_groups(inventory):
    relations = validate_inventory(inventory)["relations"]
    return [relations[i:i + 3] for i in range(0, len(relations), 3)]


def main():
    if len(sys.argv) != 6:
        raise ValueError(__doc__)
    context, output, prompt_path = (Path(arg).resolve() for arg in sys.argv[1:4])
    images = [Path(arg).resolve() for arg in sys.argv[4:]]
    if not context.is_dir() or not all(path.is_file() for path in images):
        raise ValueError('invalid context or image paths')
    skill = context / '.agents/skills/rain-designer/SKILL.md'
    designer = skill.parent / 'references/designer.md'
    source_texts = {name: path.read_text().strip() for name, path in [('skill', skill), ('designer', designer)]}
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
                                      'strippedTextSha256': hashlib.sha256(text.encode()).hexdigest(),
                                      'fileSha256': hashlib.sha256((skill if name == 'skill' else designer).read_bytes()).hexdigest()}
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
        inventory_text = run_stage('inventory', [{'type': 'text', 'text': prompt},
            {'type': 'skill', 'name': 'rain-designer', 'path': str(skill)}, *image_inputs(images)], 4)
        inventory = validate_inventory(json.loads(inventory_text))
        save_json(output / 'inventory.json', inventory)
        summary['inventoryCount'] = len(inventory['relations'])
        observation_prompt = prompt_path.with_name('observation-prompt.txt').read_text()
        summary['observationFindings'] = []
        for index, group in enumerate(observation_groups(inventory), 1):
            review = run_stage(f'batch-{index:02d}', [{'type': 'text', 'text': observation_prompt
                + json.dumps(group, ensure_ascii=False)}, *image_inputs(images)], 4 + index)
            summary['observationFindings'].append(review)
        final_prompt = prompt_path.with_name('final-prompt.txt').read_text()
        summary['finalFindings'] = run_stage('final', [{'type': 'text', 'text': final_prompt},
            *image_inputs(images)], 90)
        summary['status'] = 'completed'
        send('thread/unsubscribe', {'threadId': root_id}, 99)
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
