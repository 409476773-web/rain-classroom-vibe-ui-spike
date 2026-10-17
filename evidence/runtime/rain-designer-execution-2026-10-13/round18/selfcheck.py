"""Checks for one ordinary native request and unchanged privacy/read-only guards."""
import ast
import importlib.util
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
source = (HERE / 'run-implicit.py').read_text()
tree = ast.parse(source)
before = ast.parse((HERE.parent / 'round13/run-review.py').read_text().replace(
    'native observation stage exceeded 180 seconds', 'native observation stage deadline exceeded'))
spec = importlib.util.spec_from_file_location('implicit_runner', HERE / 'run-implicit.py')
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)


class OrdinaryRequestChecks(unittest.TestCase):
    def test_one_ordinary_request(self):
        calls = [n for n in ast.walk(tree) if isinstance(n, ast.Call)
                 and isinstance(n.func, ast.Name) and n.func.id == 'run_stage']
        self.assertEqual([n.args[0].value for n in calls], ['review'])
        typed_skill_inputs = [n for n in ast.walk(tree) if isinstance(n, ast.Dict)
                              if any(isinstance(k, ast.Constant) and k.value == 'type'
                                     and isinstance(v, ast.Constant) and v.value == 'skill'
                                     for k, v in zip(n.keys, n.values))]
        self.assertEqual(typed_skill_inputs, [])

    def test_capture_read_and_safety_core_unchanged(self):
        for name in ('public_item', 'is_turn_completed', 'run_stage', 'rpc', 'send',
                     'listen', 'receive', 'matching_source_lines'):
            previous = next(n for n in ast.walk(before) if isinstance(n, ast.FunctionDef) and n.name == name)
            current = next(n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef) and n.name == name)
            self.assertEqual(ast.dump(previous), ast.dump(current), name)

    def test_private_items_and_self_reports_do_not_prove_reading(self):
        for kind in ('reasoning', 'commandExecution', 'mcpToolCall'):
            self.assertIsNone(runner.public_item({'type': kind, 'text': 'private'}))
        expected = {'# Title', 'whole first paragraph', 'whole second paragraph'}
        self.assertNotEqual(runner.matching_source_lines(expected, '已完整读取全部资料'), expected)
        self.assertEqual(runner.matching_source_lines(expected,
                         '1\t# Title\n2\twhole first paragraph\n3\twhole second paragraph'), expected)
        self.assertEqual(runner.image_inputs([]), [])

    def test_no_override_and_bounded_request(self):
        self.assertEqual(runner.DEADLINE_SECONDS, 300)
        for node in ast.walk(tree):
            if (isinstance(node, ast.Call) and isinstance(node.func, ast.Name)
                    and node.func.id == 'rpc' and isinstance(node.args[0], ast.Constant)
                    and node.args[0].value in ('thread/start', 'turn/start')):
                self.assertFalse({key.value for key in node.args[1].keys}
                                 & {'model', 'reasoningEffort', 'effort', 'modelProvider'})


if __name__ == '__main__':
    unittest.main()
