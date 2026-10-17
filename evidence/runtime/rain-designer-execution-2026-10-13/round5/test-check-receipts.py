"""Local-experiment fixtures only: python3 -B test-check-receipts.py."""
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SCRIPT = Path(__file__).with_name('check-receipts.py')


class ReceiptsTest(unittest.TestCase):
    def check(self, review='R01｜已检查｜正常｜对象与参照同一水平线，局部1',
              relation='R01｜对象与参照｜水平对齐', image=True, alter_label=False):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / 'observation').mkdir()
            picture = root / 'region.png'
            if image:
                picture.write_bytes(b'fixture: existence only, no visual claim')
            region = dict(image=1, x=0, y=0, width=100, height=100, relation=relation)
            (root / 'selection.json').write_text(json.dumps(dict(regions=[region], initialFindings='fixture')))
            label_region = dict(region, image=2) if alter_label else region
            inputs = [dict(type='text', text='第二阶段'),
                      dict(type='text', text='关系 1（原图坐标，仅用于定位）：' + json.dumps(label_region)),
                      dict(type='localImage', path=str(picture))]
            (root / 'observation/input.json').write_text(json.dumps(inputs))
            (root / 'observation/review.md').write_text(review)
            before = {str(p): p.read_bytes() for p in root.rglob('*') if p.is_file()}
            result = subprocess.run([sys.executable, '-B', str(SCRIPT), str(root)], capture_output=True, text=True)
            self.assertTrue(result.stdout.strip(), result.stderr)
            self.assertEqual(result.stderr, '')
            self.assertEqual(before, {str(p): p.read_bytes() for p in root.rglob('*') if p.is_file()})
            return json.loads(result.stdout)

    def test_valid(self):
        result = self.check()
        self.assertTrue(result['receiptComplete'])
        self.assertTrue(result['allChecked'])
        self.assertTrue(result['imageEvidenceAvailable'])
        self.assertEqual(result['checks'][0]['region'], 1)
        self.assertEqual(result['checks'][0]['image'], 1)
        self.assertEqual(result['outcomes']['正常'], 1)

    def test_missing(self):
        result = self.check('无回执')
        self.assertEqual(result['missingIds'], ['R01'])
        self.assertFalse(result['receiptComplete'])

    def test_duplicate(self):
        result = self.check('R01｜已检查｜正常｜事实\nR01｜已检查｜异常｜另一事实')
        self.assertEqual(result['duplicateReceiptIds'], ['R01'])
        self.assertFalse(result['receiptComplete'])

    def test_unknown(self):
        result = self.check('R01｜已检查｜正常｜事实\nR99｜已检查｜正常｜未知')
        self.assertEqual(result['unknownIds'], ['R99'])
        self.assertFalse(result['receiptComplete'])

    def test_not_checked_and_not_applicable(self):
        for status, field in [('未检查', 'notChecked'), ('不适用', 'notApplicable')]:
            result = self.check(f'R01｜{status}｜双方未完整显示')
            self.assertTrue(result['receiptComplete'])
            self.assertFalse(result['allChecked'])
            self.assertEqual(result[field], ['R01'])

    def test_missing_image_and_changed_label(self):
        for args in [dict(image=False), dict(alter_label=True)]:
            result = self.check(**args)
            self.assertFalse(result['imageEvidenceAvailable'])
            self.assertTrue(result['receiptComplete'])

    def test_multiple_atoms_in_one_region(self):
        result = self.check('R01｜已检查｜正常｜局部1水平对齐\nR02｜已检查｜异常｜局部1垂直偏低',
                            relation='R01｜甲与乙｜水平对齐\nR02｜甲与丙｜垂直对齐')
        self.assertTrue(result['allChecked'])
        self.assertEqual([item['id'] for item in result['checks']], ['R01', 'R02'])
        self.assertEqual(result['checks'][0]['imagePath'], result['checks'][1]['imagePath'])
        self.assertEqual(result['outcomes']['异常'], 1)

    def test_id_in_prose_is_not_silently_ignored(self):
        result = self.check('R01｜已检查｜正常｜局部1事实\n重复提及 R01')
        self.assertEqual(result['duplicateReceiptIds'], ['R01'])
        self.assertFalse(result['receiptComplete'])

    def test_selection_invalid(self):
        for relation in ['对象与参照｜水平对齐', 'R01｜甲与乙｜对齐\nR01｜丙与丁｜对齐', 'R01｜甲与乙｜对齐\n另一个无ID项']:
            result = self.check(relation=relation)
            self.assertFalse(result['selectionValid'])
            self.assertFalse(result['receiptComplete'])

    def test_outcome_required_and_uncertain(self):
        for review in ['R01｜已检查｜对象对齐', 'R01｜已检查｜通过｜对象对齐']:
            result = self.check(review)
            self.assertEqual(result['invalidOutcome'], ['R01'])
            self.assertFalse(result['receiptComplete'])
        self.assertEqual(self.check('R01｜已检查｜无法判断｜局部1缺少参照')['outcomes']['无法判断'], 1)


if __name__ == '__main__':
    unittest.main()
