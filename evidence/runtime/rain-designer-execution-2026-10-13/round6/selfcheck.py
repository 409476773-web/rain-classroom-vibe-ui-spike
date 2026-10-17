"""Run local validation self-checks only; never start a native model session."""
import copy
import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location('runner', Path(__file__).with_name('run-observation.py'))
runner = importlib.util.module_from_spec(spec)
spec.loader.exec_module(runner)


class SplitValidation(unittest.TestCase):
    def setUp(self):
        self.inventory = {'relations': [
            {'id': 'R01', 'objects': '甲与乙', 'dimension': '文字起点'},
            {'id': 'R02', 'objects': '丙与丁', 'dimension': '文字基线'},
        ], 'scope': '单页主表格'}
        self.selection = {'regions': [dict(image=1, x=0, y=0, width=200, height=100,
                                          relation='R01｜甲与乙｜文字起点\nR02｜丙与丁｜文字基线')],
                          'initialFindings': '尚未判断'}

    def test_valid_shared_region_and_separate_regions(self):
        self.assertIs(runner.validate_inventory(self.inventory), self.inventory)
        runner.validate_selection(self.selection, [(500, 500)])
        self.assertIs(runner.validate_mapping(self.selection, self.inventory), self.selection)
        second = copy.deepcopy(self.selection['regions'][0])
        self.selection['regions'][0]['relation'], second['relation'] = second['relation'].splitlines()
        self.selection['regions'].append(second)
        runner.validate_mapping(self.selection, self.inventory)

    def test_inventory_missing_extra_and_empty_fields(self):
        for mutation in ('missing-key', 'extra-key', 'empty-list', 'empty-scope',
                         'extra-relation-key', 'missing-dimension', 'empty-dimension', 'empty-objects'):
            with self.subTest(mutation=mutation):
                value = copy.deepcopy(self.inventory)
                if mutation == 'missing-key': del value['scope']
                elif mutation == 'extra-key': value['notes'] = ''
                elif mutation == 'empty-list': value['relations'] = []
                elif mutation == 'empty-scope': value['scope'] = ' '
                elif mutation == 'extra-relation-key': value['relations'][0]['notes'] = ''
                elif mutation == 'missing-dimension': del value['relations'][0]['dimension']
                elif mutation == 'empty-dimension': value['relations'][0]['dimension'] = ' '
                elif mutation == 'empty-objects': value['relations'][0]['objects'] = ''
                with self.assertRaises(ValueError): runner.validate_inventory(value)

    def test_inventory_duplicate_invalid_id_and_types(self):
        for rid in ('R02', 'r01', '', 'R01 text', 1):
            with self.subTest(rid=rid):
                value = copy.deepcopy(self.inventory)
                value['relations'][0]['id'] = rid
                with self.assertRaises(ValueError): runner.validate_inventory(value)
        for field in ('objects', 'dimension'):
            value = copy.deepcopy(self.inventory)
            value['relations'][0][field] = None
            with self.assertRaises(ValueError): runner.validate_inventory(value)

    def test_mapping_missing_duplicate_unknown_and_tampered(self):
        for text in ('R01｜甲与乙｜文字起点',
                     'R01｜甲与乙｜文字起点\nR01｜甲与乙｜文字起点\nR02｜丙与丁｜文字基线',
                     'R03｜甲与乙｜文字起点\nR02｜丙与丁｜文字基线',
                     'R01｜甲与丁｜文字起点\nR02｜丙与丁｜文字基线',
                     'R01｜甲与乙｜文字基线\nR02｜丙与丁｜文字基线',
                     'R01｜甲与乙｜文字起点｜额外内容\nR02｜丙与丁｜文字基线',
                     'R01 | 甲与乙 | 文字起点\nR02｜丙与丁｜文字基线',
                     ''):
            with self.subTest(text=text):
                self.selection['regions'][0]['relation'] = text
                with self.assertRaises(ValueError): runner.validate_mapping(self.selection, self.inventory)

    def test_mapping_cross_region_duplicate_and_zero_regions(self):
        self.selection['regions'].append(copy.deepcopy(self.selection['regions'][0]))
        with self.assertRaises(ValueError): runner.validate_mapping(self.selection, self.inventory)
        self.selection['regions'] = []
        with self.assertRaises(ValueError): runner.validate_mapping(self.selection, self.inventory)


if __name__ == '__main__':
    unittest.main()
