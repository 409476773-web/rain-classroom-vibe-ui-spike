"""Local-experiment, read-only: python3 -B check-receipts.py RUN_DIR. JSON stdout only."""
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

IDS = re.compile(r'R\d+')
OUTCOMES = ('正常', '异常', '无法判断')


def check(root):
    selection = json.loads((root / 'selection.json').read_text())
    inputs = json.loads((root / 'observation/input.json').read_text())
    review = (root / 'observation/review.md').read_text()
    regions = selection['regions']
    assignments, selection_errors, mapping_errors, mappings = [], [], [], {}
    for index, region in enumerate(regions, 1):
        relation = region['relation']
        lines = relation.splitlines() if isinstance(relation, str) else []
        if not lines or not relation.strip():
            selection_errors.append(f'region {index}: empty or non-text relation')
        for line in filter(str.strip, lines):
            ids = IDS.findall(line)
            parts = [part.strip() for part in re.split('[｜|]', line)]
            if len(ids) != 1 or len(parts) != 3 or parts[0] != ids[0] or not all(parts):
                selection_errors.append(f'region {index}: invalid atomic relation: {line}')
            assignments.extend(dict(id=rid, region=index, image=region['image'], relation=line) for rid in ids)
    assigned = Counter(item['id'] for item in assignments)
    duplicate_assigned = sorted(rid for rid, count in assigned.items() if count > 1)
    for position, item in enumerate(inputs):
        label = re.match(r'^关系 (\d+)（原图坐标，仅用于定位）：(.*)$', item.get('text', ''), re.S)
        if item.get('type') != 'text' or not label:
            continue
        index = int(label[1])
        image = inputs[position + 1] if position + 1 < len(inputs) else {}
        if (index in mappings or not 1 <= index <= len(regions)
                or json.loads(label[2]) != regions[index - 1] or image.get('type') != 'localImage'
                or not isinstance(image.get('path'), str) or not image['path']):
            mapping_errors.append(f'region {index}: duplicate/mismatched label or missing following localImage')
            continue
        path = Path(image['path'])
        mappings[index] = str((path if path.is_absolute() else root / path).resolve())
    missing_mappings = sorted(set(range(1, len(regions) + 1)) - mappings.keys())
    mapping_errors.extend(f'region {index}: no matching label/image pair' for index in missing_mappings)
    receipts, invalid_lines, invalid_outcome = defaultdict(list), [], []
    occurrences = Counter(IDS.findall(review))
    for number, line in enumerate(review.splitlines(), 1):
        ids = IDS.findall(line)
        if not ids:
            continue
        parts = [part.strip() for part in re.split('[｜|]', line)]
        valid = len(ids) == 1 and len(parts) >= 3 and parts[0] == ids[0] and all(parts)
        status = parts[1] if len(parts) > 1 else ''
        outcome = parts[2] if len(parts) > 2 and status == '已检查' else None
        if status == '已检查' and (outcome not in OUTCOMES or len(parts) < 4):
            invalid_outcome.extend(ids)
            valid = False
        if not valid or status not in ('已检查', '未检查', '不适用'):
            invalid_lines.append(dict(line=number, text=line))
            continue
        receipts[ids[0]].append(dict(status=status, outcome=outcome, observation='｜'.join(parts[3:] if outcome else parts[2:])))
    missing = sorted(assigned.keys() - occurrences.keys())
    duplicate = sorted(rid for rid, count in occurrences.items() if count > 1)
    unknown = sorted(occurrences.keys() - assigned.keys())
    selection_valid = bool(assignments) and not selection_errors and not duplicate_assigned
    complete = selection_valid and not (missing or duplicate or unknown or invalid_lines)
    not_checked = sorted(rid for rid, values in receipts.items() if any(v['status'] == '未检查' for v in values))
    not_applicable = sorted(rid for rid, values in receipts.items() if any(v['status'] == '不适用' for v in values))
    missing_images = sorted(path for path in set(mappings.values()) if not Path(path).is_file())
    for item in assignments:
        path = mappings.get(item['region'])
        item.update(imagePath=path, imageExists=bool(path and Path(path).is_file()),
                    receiptOccurrences=occurrences[item['id']], receipts=receipts[item['id']])
    return dict(assetIdentity='local-experiment', runDir=str(root), selectionValid=selection_valid,
                selectionErrors=selection_errors, duplicateAssignedIds=duplicate_assigned,
                assignedCount=len(assignments), missingIds=missing, duplicateReceiptIds=duplicate,
                unknownIds=unknown, invalidReceiptLines=invalid_lines, invalidOutcome=sorted(set(invalid_outcome)),
                notChecked=not_checked, notApplicable=not_applicable,
                outcomes={outcome: sum(v['outcome'] == outcome for values in receipts.values() for v in values)
                          for outcome in OUTCOMES}, checks=assignments,
                imageMappingErrors=mapping_errors, missingImages=missing_images,
                imageEvidenceAvailable=bool(regions) and not mapping_errors and not missing_images,
                receiptComplete=complete, allChecked=complete and not (not_checked or not_applicable),
                limit='仅核对声明文本和图片文件存在；receiptComplete 为回执齐全，allChecked 为全部声明已检查（可含无法判断）。'
                      '图片可用性单列；均不证明语义覆盖、视觉准确或人类验收，真实观察仍需独立看图。')


if __name__ == '__main__':
    try:
        if len(sys.argv) != 2:
            raise ValueError(__doc__)
        result = check(Path(sys.argv[1]).resolve())
    except (OSError, ValueError, KeyError, TypeError, AttributeError) as error:
        result = dict(assetIdentity='local-experiment', receiptComplete=False, allChecked=False,
                      imageEvidenceAvailable=False, error=str(error))
    print(json.dumps(result, ensure_ascii=False, indent=2))
    sys.exit(0 if result['receiptComplete'] and result['imageEvidenceAvailable'] else 1)
