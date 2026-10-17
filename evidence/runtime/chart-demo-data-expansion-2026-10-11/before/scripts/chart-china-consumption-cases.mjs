const settings = (provinceId = null, selectedId = null, state = "normal", recipe = "monochrome-blue") => ({ provinceId, selectedId, state, revision:2, recipe });

export const chinaConsumptionCases = [
  { name:"china-national", settings:settings(), count:34 },
  { name:"china-guangdong", settings:settings("440000"), count:21 },
  { name:"china-zhejiang", settings:settings("330000",null,"normal","intensity"), count:11 },
  { name:"china-xinjiang", settings:settings("650000"), count:26 },
  { name:"china-municipality", settings:settings(null,"110000"), count:34, detail:"直辖市" },
  { name:"china-hong-kong", settings:settings(null,"810000"), count:34, detail:"当前来源未提供下级地图" },
  { name:"china-macao", settings:settings(null,"820000"), count:34, detail:"当前来源未提供下级地图" },
  { name:"china-taiwan", settings:settings(null,"710000"), count:34, detail:"当前来源未提供下级地图" },
  { name:"china-direct-county", settings:settings("650000","659009"), count:26, detail:"省直管县级" },
  { name:"china-zero", settings:settings("440000",null,"zero"), count:21 },
  { name:"china-missing", settings:settings("330000",null,"missing"), count:11 },
  { name:"china-invalid", settings:settings(null,null,"invalid"), count:0 },
  { name:"china-unmatched", settings:settings(null,null,"unmatched"), count:34 },
  { name:"china-load-error", settings:settings("440000",null,"load-error"), count:21 },
  { name:"china-invalid-province", settings:settings("999999"), count:0, configurationError:true },
  { name:"china-invalid-selection", settings:settings(null,"440100"), count:0, configurationError:true },
];
