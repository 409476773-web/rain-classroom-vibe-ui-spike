"""Offline checks for batch preservation and inherited public-only capture."""
import ast
import importlib.util
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('runner', HERE / 'run-batches.py')
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)
tree = ast.parse((HERE / 'run-batches.py').read_text())
previous = ast.parse((HERE.parent / 'round7/run-receipt.py').read_text())


class BatchChecks(unittest.TestCase):
    def test_every_relation_preserved_once_in_order(self):
        relations = [dict(id=f'R{i:02d}', objects='a vs b', dimension='visible text start')
                     for i in range(1, 9)]
        groups = runner.observation_groups(dict(scope='table', relations=relations))
        self.assertEqual([len(group) for group in groups], [3, 3, 2])
        self.assertEqual([item for group in groups for item in group], relations)

    def test_invalid_inventory_stops_before_observation(self):
        relation = dict(id='R01', objects='a vs b', dimension='visible text start')
        for relations in ([], [relation, relation], [dict(id='R1', objects='', dimension='x')]):
            with self.assertRaises(ValueError):
                runner.observation_groups(dict(scope='table', relations=relations))

    def test_inherited_capture_rpc_and_timeout_unchanged(self):
        for name in ('public_item', 'is_turn_completed', 'receive', 'run_stage', 'rpc', 'send', 'listen'):
            before = next(n for n in ast.walk(previous) if isinstance(n, ast.FunctionDef) and n.name == name)
            after = next(n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef) and n.name == name)
            self.assertEqual(ast.dump(after), ast.dump(before), name)
        self.assertEqual(runner.DEADLINE_SECONDS, 180)
        self.assertIsNone(runner.public_item(dict(type='reasoning', text='private')))
        self.assertIsNone(runner.public_item(dict(type='commandExecution', aggregatedOutput='private')))

    def test_no_model_or_effort_override(self):
        for node in ast.walk(tree):
            if (isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == 'rpc'
                    and isinstance(node.args[0], ast.Constant)
                    and node.args[0].value in ('thread/start', 'turn/start')):
                self.assertFalse({key.value for key in node.args[1].keys}
                                 & {'model', 'reasoningEffort', 'effort', 'modelProvider'})


if __name__ == '__main__':
    unittest.main()
