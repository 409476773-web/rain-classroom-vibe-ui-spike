"""Offline checks only: no native session, model request, or generated image."""
import ast
import importlib.util
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parent
spec = importlib.util.spec_from_file_location('runner', HERE / 'run-receipt.py')
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)
source = (HERE / 'run-receipt.py').read_text()
tree = ast.parse(source)
previous = ast.parse((HERE.parent / 'round6/run-observation.py').read_text())


class ReceiptRunner(unittest.TestCase):
    def test_single_stage_timeout_and_default_settings(self):
        self.assertEqual(runner.DEADLINE_SECONDS, 180)
        calls = [node for node in ast.walk(tree) if isinstance(node, ast.Call)]
        stages = [node for node in calls if isinstance(node.func, ast.Name) and node.func.id == 'run_stage']
        self.assertEqual(len(stages), 1)
        self.assertEqual(stages[0].args[0].value, 'observation')
        requests = [node for node in calls if isinstance(node.func, ast.Name) and node.func.id == 'rpc'
                    and isinstance(node.args[0], ast.Constant)
                    and node.args[0].value in ('thread/start', 'turn/start')]
        self.assertEqual(len(requests), 2)
        for request in requests:
            keys = {key.value for key in request.args[1].keys}
            self.assertFalse(keys & {'model', 'reasoningEffort', 'effort', 'modelProvider'})
        self.assertIn("'modelOverride': False, 'effortOverride': False", source)
        self.assertNotIn('subprocess.run', source)

    def test_private_items_filtered_and_public_fields_limited(self):
        for kind in ('reasoning', 'commandExecution', 'mcpToolCall', 'webSearch', 'fileChange'):
            self.assertIsNone(runner.public_item(dict(type=kind, text='private', aggregatedOutput='private')))
        self.assertEqual(runner.public_item(dict(type='agentMessage', id='a', text='public',
                                                 phase='final_answer', private='secret')),
                         dict(type='agentMessage', id='a', text='public', phase='final_answer'))
        self.assertEqual(runner.public_item(dict(type='imageView', path='/image.png', private='secret')),
                         dict(type='imageView', path='/image.png'))

    def test_turn_matching(self):
        event = dict(method='turn/completed', params=dict(threadId='thread', turn=dict(id='turn')))
        self.assertTrue(runner.is_turn_completed(event, 'thread', 'turn'))
        self.assertFalse(runner.is_turn_completed(event, 'other', 'turn'))
        self.assertFalse(runner.is_turn_completed(event, 'thread', 'other'))
        self.assertFalse(runner.is_turn_completed({}, 'thread', 'turn'))

    def test_inherited_safety_and_timing_unchanged(self):
        for name in ('public_item', 'is_turn_completed', 'receive', 'run_stage', 'rpc', 'send', 'listen'):
            before = next(node for node in ast.walk(previous) if isinstance(node, ast.FunctionDef) and node.name == name)
            after = next(node for node in ast.walk(tree) if isinstance(node, ast.FunctionDef) and node.name == name)
            expected = ast.dump(before).replace('exceeded 480 seconds', 'exceeded 180 seconds')
            self.assertEqual(ast.dump(after), expected, name)
        self.assertIn("active['elapsedSeconds'] = round(time.monotonic() - stage_started, 2)", source)
        self.assertIn('elapsedSeconds=round(time.monotonic() - started, 2)', source)


if __name__ == '__main__':
    unittest.main()
