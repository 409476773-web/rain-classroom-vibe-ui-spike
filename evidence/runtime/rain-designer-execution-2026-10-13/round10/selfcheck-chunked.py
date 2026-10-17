"""Offline checks; no model or browser call."""
import ast
import importlib.util
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('runner', HERE / 'run-coverage-chunked.py')
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)
tree = ast.parse((HERE / 'run-coverage-chunked.py').read_text())
previous = ast.parse((HERE.parent / 'round9/run-incremental.py').read_text())


class IncrementalChecks(unittest.TestCase):
    def test_whole_chunked_and_numbered_reading(self):
        source = '# A\nfirst complete paragraph\n\n# B\nsecond complete paragraph'
        expected = {line.strip() for line in source.splitlines() if line.strip()}
        self.assertEqual(runner.matching_source_lines(expected, source), expected)
        chunks = ['# A\nfirst complete paragraph', '# B\nsecond complete paragraph']
        self.assertFalse(any(source in chunk for chunk in chunks))
        observed = set().union(*(runner.matching_source_lines(expected, chunk) for chunk in chunks))
        self.assertEqual(observed, expected)
        numbered = '\n'.join(f'{i}\t{line}' for i, line in enumerate(source.splitlines(), 1))
        self.assertEqual(runner.matching_source_lines(expected, numbered), expected)

    def test_truncated_or_self_reported_reading_is_not_complete(self):
        expected = {'# A', 'first complete paragraph', '# B', 'second complete paragraph'}
        for output in ('# A\n# B', '# A\nfirst complete...\n# B\nsecond complete paragraph',
                       '已完整读取全部资料'):
            self.assertNotEqual(runner.matching_source_lines(expected, output), expected)

    def test_actual_designer_can_be_read_in_chunks(self):
        source = (HERE.parents[3] / '.agents/skills/rain-designer/references/designer.md').read_text().strip()
        lines = source.splitlines(); expected = {line.strip() for line in lines if line.strip()}
        chunks = ['\n'.join(lines[i:i+50]) for i in range(0, len(lines), 50)]
        self.assertFalse(any(source in chunk for chunk in chunks))
        self.assertEqual(set().union(*(runner.matching_source_lines(expected, chunk) for chunk in chunks)), expected)

    def test_valid_coverage_uses_real_receipt_ids(self):
        value = {'coverage': [{'objects': 'a and b', 'dimension': 'left start', 'status': '已查',
                              'receipts': ['R01'], 'note': 'visible fact'}],
                 'decision': '补查', 'summary': 'another relation remains'}
        self.assertEqual(runner.validate_coverage(value, [{'id': 'R01'}]), value)

    def test_coverage_cannot_invent_or_omit_evidence(self):
        for references in (['R02'], [], ['R01', 'R01']):
            value = {'coverage': [{'objects': 'a and b', 'dimension': 'left start', 'status': '已查',
                                  'receipts': references, 'note': 'visible fact'}],
                     'decision': '结束', 'summary': 'bounded summary'}
            with self.assertRaises(ValueError):
                runner.validate_coverage(value, [{'id': 'R01'}])

    def test_complete_receipt_and_explicit_done(self):
        value = dict(done=False, objects='a vs b', reference='visible left start', status='已检查',
                     outcome='正常', observation='same start', evidence='图1/图2', limit='static only')
        self.assertEqual(runner.validate_receipt(value), value)
        self.assertTrue(runner.validate_receipt(dict(done=True, summary='bounded summary'))['done'])

    def test_malformed_or_unchecked_judgments_rejected(self):
        for value in ({}, {'done': 'true'}, {'done': True, 'summary': ''},
                      dict(done=False, objects='a', reference='b', status='未检查', outcome='正常',
                           observation='x', evidence='图1', limit='x')):
            with self.assertRaises(ValueError):
                runner.validate_receipt(value)

    def test_no_new_turn_without_full_time_budget(self):
        self.assertTrue(runner.can_start_stage(720))
        self.assertFalse(runner.can_start_stage(720.01))
        self.assertEqual(runner.DEADLINE_SECONDS, 180)

    def test_public_capture_and_turn_matching_unchanged(self):
        for name in ('public_item', 'is_turn_completed', 'run_stage', 'rpc', 'send', 'listen'):
            before = next(n for n in ast.walk(previous) if isinstance(n, ast.FunctionDef) and n.name == name)
            after = next(n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef) and n.name == name)
            self.assertEqual(ast.dump(after), ast.dump(before), name)
        self.assertIsNone(runner.public_item(dict(type='reasoning', text='private')))

    def test_no_model_or_effort_override(self):
        for node in ast.walk(tree):
            if (isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == 'rpc'
                    and isinstance(node.args[0], ast.Constant)
                    and node.args[0].value in ('thread/start', 'turn/start')):
                self.assertFalse({key.value for key in node.args[1].keys}
                                 & {'model', 'reasoningEffort', 'effort', 'modelProvider'})


if __name__ == '__main__':
    unittest.main()
