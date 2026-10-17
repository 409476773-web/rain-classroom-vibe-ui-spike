"""No-model checks; reads an existing image and writes only browser screenshots."""
import importlib.util
import json
import subprocess
import sys
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
runner = HERE / 'run-observation.py'
assert runner.is_file(), 'missing observation runner'
spec = importlib.util.spec_from_file_location('observation', runner)
observation = importlib.util.module_from_spec(spec)
spec.loader.exec_module(observation)

source = Path(sys.argv[1]).resolve()
with Image.open(source) as image:
    size = image.size
valid = {'regions': [{'image': 1, 'x': 0, 'y': 0, 'width': 320, 'height': 240,
                      'relation': 'selfcheck region'}], 'initialFindings': 'selfcheck only'}
assert observation.validate_selection(valid, [size]) == valid
assert observation.validate_selection({'regions': [], 'initialFindings': ''}, [size])['regions'] == []
invalid = [
    dict(valid, regions=valid['regions'] * 9),
    dict(valid, initialFindings=1),
    dict(valid, extra=True),
    *[dict(valid, regions=[dict(valid['regions'][0], **change)]) for change in [
        {'image': 0}, {'image': 2}, {'image': True}, {'x': -1}, {'x': 0.5},
        {'x': size[0] - 319}, {'y': size[1] - 239}, {'width': 79},
        {'height': 79}, {'width': True}, {'relation': ''}, {'extra': True},
    ]],
]
for selection in invalid:
    try:
        observation.validate_selection(selection, [size])
    except ValueError:
        pass
    else:
        raise AssertionError(f'accepted invalid selection: {selection}')

assert observation.public_item({'type': 'reasoning', 'text': 'private'}) is None
assert observation.public_item({'type': 'agentMessage', 'id': 'a', 'text': 'public',
                                'reasoning': 'private'}) == {
    'type': 'agentMessage', 'id': 'a', 'text': 'public'}
event = {'method': 'turn/completed', 'params': {'threadId': 'root', 'turn': {'id': 't1'}}}
assert observation.is_turn_completed(event, 'root', 't1')
assert not observation.is_turn_completed(event, 'child', 't1')
assert not observation.is_turn_completed(event, 'root', 't2')

output = HERE / 'selfcheck-output'
output.mkdir(exist_ok=True)
manifest = output / 'input.json'
manifest.write_text(json.dumps({'images': [{'path': str(source), 'width': size[0], 'height': size[1]}],
                                'regions': valid['regions']}))
subprocess.run(['node', str(HERE / 'render-regions.mjs'), str(manifest), str(output)], check=True)
rendered = json.loads((output / 'rendered.json').read_text())
checks = observation.verify_region_pixels([source], valid['regions'], rendered)
assert len(checks) == 1 and checks[0]['pixelsEqual']
try:
    observation.verify_region_pixels([source], [dict(valid['regions'][0], x=1)], rendered)
except ValueError as error:
    assert 'pixels differ' in str(error)
else:
    raise AssertionError('accepted pixels from a different source region')
bad_render = [dict(rendered[0], dpr=2)]
try:
    observation.verify_region_pixels([source], valid['regions'], bad_render)
except ValueError:
    pass
else:
    raise AssertionError('accepted wrong DPR')
bad_manifest = output / 'invalid.json'
bad_manifest.write_text(json.dumps({'images': [{'path': str(source), 'width': size[0], 'height': size[1]}],
                                    'regions': [dict(valid['regions'][0], x=size[0])]}))
rejected = subprocess.run(['node', str(HERE / 'render-regions.mjs'), str(bad_manifest), str(output)],
                          capture_output=True, text=True)
assert rejected.returncode != 0 and 'outside image' in rejected.stderr
result = {'status': 'passed', 'modelCalls': 0, 'validationCases': 2 + len(invalid),
          'publicExportFilter': 'passed', 'rootTurnMatching': 'passed',
          'browserOutOfBounds': 'rejected', 'wrongDpr': 'rejected',
          'wrongRegionPixels': 'rejected', 'pixelChecks': checks}
(output / 'result.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
print(json.dumps(result, ensure_ascii=False, indent=2))
