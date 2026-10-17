"""Offline regression checks for the shortened review runner and scoped candidate."""
import ast
import importlib.util
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('runner', HERE / 'run-review.py')
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)
tree = ast.parse((HERE / 'run-review.py').read_text())
previous = ast.parse((HERE.parent / 'round11/run-gaps.py').read_text())


class ReviewChecks(unittest.TestCase):
    def test_full_and_split_reading(self):
        expected = {'# A', 'first paragraph', '# B', 'second paragraph'}
        for chunks in (['\n'.join(expected)], ['# A\nfirst paragraph', '# B\nsecond paragraph'],
                       ['1\t# A\n2\tfirst paragraph', '4\t# B\n5\tsecond paragraph']):
            self.assertEqual(set().union(*(runner.matching_source_lines(expected, s) for s in chunks)), expected)
        for text in ('已完整读取全部资料', '# A\nfirst...\n# B\nsecond paragraph'):
            self.assertNotEqual(runner.matching_source_lines(expected, text), expected)

    def test_capture_and_read_gate_core_unchanged(self):
        for name in ('public_item', 'is_turn_completed', 'run_stage', 'rpc', 'send', 'listen',
                     'receive', 'matching_source_lines'):
            before = next(n for n in ast.walk(previous) if isinstance(n, ast.FunctionDef) and n.name == name)
            after = next(n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef) and n.name == name)
            self.assertEqual(ast.dump(after), ast.dump(before), name)

    def test_private_items_excluded(self):
        for kind in ('reasoning', 'commandExecution', 'mcpToolCall'):
            self.assertIsNone(runner.public_item({'type': kind, 'text': 'private'}))
        self.assertEqual(runner.public_item({'type': 'agentMessage', 'text': 'visible', 'extra': 'private'}),
                         {'type': 'agentMessage', 'text': 'visible'})

    def test_other_thread_or_turn_does_not_complete(self):
        event = {'method': 'turn/completed', 'params': {'threadId': 't', 'turn': {'id': 'v'}}}
        self.assertTrue(runner.is_turn_completed(event, 't', 'v'))
        self.assertFalse(runner.is_turn_completed(event, 'other', 'v'))
        self.assertFalse(runner.is_turn_completed(event, 't', 'other'))

    def test_exactly_one_prepare_and_review_stage(self):
        calls = [n for n in ast.walk(tree) if isinstance(n, ast.Call)
                 and isinstance(n.func, ast.Name) and n.func.id == 'run_stage']
        self.assertEqual([n.args[0].value for n in calls], ['prepare', 'review'])
        self.assertEqual(runner.DEADLINE_SECONDS, 180)

    def test_no_model_override(self):
        for node in ast.walk(tree):
            if (isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == 'rpc'
                    and isinstance(node.args[0], ast.Constant)
                    and node.args[0].value in ('thread/start', 'turn/start')):
                self.assertFalse({key.value for key in node.args[1].keys}
                                 & {'model', 'reasoningEffort', 'effort', 'modelProvider'})

    def test_only_section_five_changes(self):
        before = (HERE / 'SKILL.C2.md').read_text()
        after = (HERE / 'SKILL.C5.md').read_text()
        def outside(text):
            start = text.index('## 5.')
            end = text.index('## 6.', start)
            return text[:start], text[end:]
        self.assertEqual(outside(before), outside(after))
        self.assertNotEqual(before, after)


if __name__ == '__main__':
    unittest.main()
