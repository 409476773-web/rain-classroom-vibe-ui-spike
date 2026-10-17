"""Local experiment: inventory, coordinates, observation, final in one read-only thread.

Usage: python3 -B run-observation.py CONTEXT OUT PROMPT ARM(whole|local) IMAGE
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
HERE = Path(__file__).resolve().parent
DEADLINE_SECONDS = 480
COORDINATE_PROMPT = '''现在进入第二阶段，只生成截图坐标。第一阶段关系清单已经冻结，以下附上完整清单和原始单页截图。
把每个关系分配到一个能同时完整显示比较双方和参照的区域；多个关系可以共享一个区域。每个关系恰好出现一次，不准增、删、改关系 ID、objects 或 dimension。
最多 8 个区域只是本次实验材料预算，不是设计规则。全部区域只可来自原图 1，坐标为原图像素，整数 x、y、width、height，宽高至少 80，不能超出原图。
仅输出有效 JSON，不加代码围栏或说明，顶层恰好是 regions 和 initialFindings。regions 每项恰好是 image、x、y、width、height、relation。
relation 按行列出该区域承担的关系，每行严格为 id｜objects｜dimension，逐字沿用冻结清单字段，以全角竖线分隔，不添加空格、标题或结论。initialFindings 只写简短的初步发现或尚未判断。
只分配坐标，不自行截图，不修改、生成或编辑图像，不访问页面源码、外部服务或以前评审，不输出内部思考。
冻结关系清单：\n'''
OBSERVATION_PROMPT = '''现在进入第三阶段。以下材料与第二阶段自主选择的区域一一对应，图序号就是标签中的“关系 n”。
逐项检查冻结清单中的每个 ID：实际比较该 ID 对应对象和那一个维度，不得只因区域中含有对象就声明已检查。
每个 ID 恰好输出一行公开观察回执，其他位置不再重复 ID，不用代码围栏、表格或项目符号。
格式必须为：R01｜已检查｜正常/异常/无法判断｜具体可见事实及图序号；其中正常/异常/无法判断只选一个。
尚未实际比较则写：R01｜未检查｜原因；确认不适用则写：R01｜不适用｜原因。不为填满回执而虚构检查，不把无法判断写成正常。
坐标仅用于定位，不是偏移量答案；不要推测精确偏移。材料未完整显示参照和比较双方时，不得硬判关系有问题，明确标为未验证。
维持第一阶段相同的任务范围、设计依据和只读约束，不新增选区、不访问页面源码、外部服务或以前评审，不修改、生成或编辑图像。
用简洁中文公开评议，不输出内部思考。'''
FINAL_PROMPT = '''现在进入第四阶段。重新提供最初的单页原始整图，请回到正常显示尺寸和页面整体上下文复查，仅完成该页主表格的最终简洁评审，不扩大范围。
给出有依据的结论，说明相对初步发现及第三阶段观察新增、保留或撤销的发现；没有变化就如实说明。
不要把局部聚焦后的印象直接当作整体问题，不推测精确偏移；未完整显示关系双方或证据不足时，不得硬判。
维持相同的设计依据与只读范围，不访问页面源码、外部服务或以前评审，不修改或生成图像。说明静态评审范围及尚未验证项，不输出内部思考。'''


def save_json(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


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


def validate_mapping(selection, inventory):
    expected = {item['id']: [item['id'], item['objects'], item['dimension']]
                for item in validate_inventory(inventory)['relations']}
    seen = set()
    for region in selection['regions']:
        for line in region['relation'].splitlines():
            parts = line.split('｜')
            if len(parts) != 3 or parts[0] not in expected or parts != expected[parts[0]]:
                raise ValueError('region relation must exactly match a frozen inventory entry')
            if parts[0] in seen:
                raise ValueError('inventory relation mapped more than once')
            seen.add(parts[0])
    if seen != expected.keys():
        raise ValueError('selection does not map every frozen inventory relation')
    return selection


def validate_selection(value, sizes):
    if not isinstance(value, dict) or set(value) != {'regions', 'initialFindings'}:
        raise ValueError('selection must contain exactly regions and initialFindings')
    regions = value['regions']
    if not isinstance(regions, list) or len(regions) > 8 or not isinstance(value['initialFindings'], str):
        raise ValueError('invalid selection fields or more than 8 regions')
    for index, region in enumerate(regions, 1):
        if not isinstance(region, dict) or set(region) != {'image', 'x', 'y', 'width', 'height', 'relation'}:
            raise ValueError(f'region {index}: invalid fields')
        if any(type(region[key]) is not int for key in ('image', 'x', 'y', 'width', 'height')):
            raise ValueError(f'region {index}: image and bounds must be integers')
        if not 1 <= region['image'] <= len(sizes):
            raise ValueError(f'region {index}: invalid image index')
        width, height = sizes[region['image'] - 1]
        if (region['x'] < 0 or region['y'] < 0 or region['width'] < 80 or region['height'] < 80
                or region['x'] + region['width'] > width or region['y'] + region['height'] > height):
            raise ValueError(f'region {index}: invalid bounds or outside image')
        if not isinstance(region['relation'], str) or not region['relation'].strip():
            raise ValueError(f'region {index}: relation must be nonempty text')
    return value


def verify_region_pixels(images, regions, rendered):
    if len(regions) != len(rendered):
        raise ValueError('rendered region count differs')
    checks = []
    for index, (region, render) in enumerate(zip(regions, rendered), 1):
        with Image.open(images[region['image'] - 1]) as source, Image.open(render['path']) as screenshot:
            expected = (region['width'], region['height'])
            if (render['region'] != index or render['image'] != region['image'] or render['dpr'] != 1
                    or render['zoom'] != 1 or screenshot.size != expected
                    or (render['naturalWidth'], render['naturalHeight']) != source.size
                    or (render['width'], render['height']) != source.size
                    or render['x'] != 0 or render['y'] != 0
                    or (render['screenshotWidth'], render['screenshotHeight']) != expected):
                raise ValueError(f'region {index}: natural size, DPR or screenshot dimensions differ')
            x, y = region['x'], region['y']
            source_pixels = source.convert('RGBA').crop((x, y, x + expected[0], y + expected[1])).tobytes()
            if screenshot.convert('RGBA').tobytes() != source_pixels:
                raise ValueError(f'region {index}: screenshot pixels differ from source region')
            checks.append({'region': index, 'pixelsEqual': True, 'size': list(expected),
                           'sourceRegionRgbaSha256': hashlib.sha256(source_pixels).hexdigest(),
                           'screenshotSha256': hashlib.sha256(Path(render['path']).read_bytes()).hexdigest()})
    return checks


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


def main():
    if len(sys.argv) != 6:
        raise ValueError(__doc__)
    context, output, prompt_path = (Path(arg).resolve() for arg in sys.argv[1:4])
    arm = sys.argv[4]
    images = [Path(arg).resolve() for arg in sys.argv[5:]]
    if arm not in ('whole', 'local') or not context.is_dir() or not all(path.is_file() for path in images):
        raise ValueError('invalid context, arm, or image paths')
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
    summary = {'assetIdentity': 'local-experiment', 'arm': arm, 'cwd': str(context), 'images': metadata,
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
            raise TimeoutError('native observation stage exceeded 480 seconds')
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
        inventory_review = run_stage('inventory', [{'type': 'text', 'text': prompt},
            {'type': 'skill', 'name': 'rain-designer', 'path': str(skill)}, *image_inputs(images)], 4)
        inventory = validate_inventory(json.loads(inventory_review))
        save_json(output / 'inventory.json', inventory)
        summary.update(inventoryCount=len(inventory['relations']),
                       inventorySha256=hashlib.sha256((output / 'inventory.json').read_bytes()).hexdigest())
        initial = run_stage('initial', [{'type': 'text', 'text': COORDINATE_PROMPT + json.dumps(inventory, ensure_ascii=False)},
                                       *image_inputs(images)], 5)
        selection = validate_selection(json.loads(initial), [(item['width'], item['height']) for item in metadata])
        validate_mapping(selection, inventory)
        save_json(output / 'selection.json', selection)
        summary.update(initialFindings=selection['initialFindings'], regionCount=len(selection['regions']),
                       localInspectionPerformed=False)
        regions = selection['regions']
        observation_images = [images[region['image'] - 1] for region in regions]
        if arm == 'local' and regions:
            manifest = output / 'render-input.json'
            save_json(manifest, {'images': metadata, 'regions': regions})
            subprocess.run(['node', str(HERE.parent / 'round4/render-regions.mjs'), str(manifest), str(output / 'regions')],
                           check=True, timeout=120, capture_output=True, text=True)
            rendered = json.loads((output / 'regions/rendered.json').read_text())
            summary['pixelChecks'] = verify_region_pixels(images, regions, rendered)
            observation_images = [Path(item['path']) for item in rendered]
            summary['localInspectionPerformed'] = True
        observation_input = [{'type': 'text', 'text': OBSERVATION_PROMPT}]
        if not regions:
            observation_input.append({'type': 'text', 'text': '第一阶段自主选区为空；本阶段没有新增观察材料，不做局部检查，只说明此前判断的未验证范围。'})
        for index, (region, path) in enumerate(zip(regions, observation_images), 1):
            observation_input.extend([{'type': 'text', 'text': f'关系 {index}（原图坐标，仅用于定位）：' + json.dumps(region, ensure_ascii=False)},
                                      {'type': 'localImage', 'path': str(path)}])
        summary['observationFindings'] = run_stage('observation', observation_input, 6)
        summary['finalFindings'] = run_stage('final', [{'type': 'text', 'text': FINAL_PROMPT}, *image_inputs(images)], 7)
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
