"""Checks one bounded delivery turn while retaining the tested safety core."""
import ast
import importlib.util
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
source = (HERE / 'run-workflow.py').read_text()
tree = ast.parse(source)
previous = ast.parse((HERE.parent / 'round13/run-review.py').read_text())
spec = importlib.util.spec_from_file_location('workflow', HERE / 'run-workflow.py')
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)


class WorkflowChecks(unittest.TestCase):
    def test_one_review_and_one_delivery_only(self):
        calls = [n for n in ast.walk(tree) if isinstance(n, ast.Call)
                 and isinstance(n.func, ast.Name) and n.func.id == 'run_stage']
        self.assertEqual([n.args[0].value for n in calls], ['prepare', 'review', 'delivery'])

    def test_safety_and_public_capture_unchanged(self):
        for name in ('public_item', 'is_turn_completed', 'run_stage', 'rpc', 'send',
                     'listen', 'receive', 'matching_source_lines'):
            before = next(n for n in ast.walk(previous) if isinstance(n, ast.FunctionDef) and n.name == name)
            after = next(n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef) and n.name == name)
            self.assertEqual(ast.dump(before), ast.dump(after), name)
        for kind in ('reasoning', 'commandExecution', 'mcpToolCall'):
            self.assertIsNone(runner.public_item({'type': kind, 'text': 'private'}))

    def test_no_override_and_same_deadline(self):
        self.assertEqual(runner.DEADLINE_SECONDS, 180)
        for node in ast.walk(tree):
            if (isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == 'rpc'
                    and isinstance(node.args[0], ast.Constant)
                    and node.args[0].value in ('thread/start', 'turn/start')):
                self.assertFalse({key.value for key in node.args[1].keys}
                                 & {'model', 'reasoningEffort', 'effort', 'modelProvider'})

    def test_only_section_five_and_no_source_install(self):
        before = (HERE / 'SKILL.C2.md').read_text()
        after = (HERE / 'SKILL.C7.md').read_text()
        def outside(text):
            start = text.index('## 5.')
            end = text.index('## 6.', start)
            return text[:start], text[end:]
        self.assertEqual(outside(before), outside(after))
        self.assertNotEqual(before, after)


if __name__ == '__main__':
    unittest.main()
