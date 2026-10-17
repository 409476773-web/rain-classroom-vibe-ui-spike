# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: select.spec.ts >> implemented Select placeholders and option descriptions preserve real permissions in dark
- Location: tests/e2e/select.spec.ts:9:49

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.evaluate: Test timeout of 120000ms exceeded.
Call log:
  - waiting for locator('#select-closure-fixture').locator('[data-closure-cell="filled-24"]').locator('[data-closure-select="normal"] [role=combobox]')
    - locator resolved to visible <button tabindex="0" type="button" role="combobox" id="base-ui-_r_55_" data-slot="control" data-placeholder="" aria-expanded="false" aria-haspopup="listbox" aria-label="filled 24 normal" class="rain-select__control flex min-w-0 flex-1 items-center gap-rain-4 border-none bg-transparent p-rain-0 text-left text-inherit outline-none cursor-pointer disabled:cursor-not-allowed">…</button>

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - heading "dark · outlined · 24px · 实施后" [level=2] [ref=e5]
    - generic [ref=e6]:
      - generic [ref=e7]: normal
      - combobox "outlined 24 normal" [ref=e10] [cursor=pointer]:
        - generic [ref=e11]: 请选择课程
      - textbox [ref=e17]
    - generic [ref=e18]:
      - generic [ref=e19]: multiple
      - combobox "outlined 24 multiple" [ref=e22] [cursor=pointer]:
        - generic [ref=e23]: 请选择课程
      - textbox [ref=e29]
    - generic [ref=e30]:
      - generic [ref=e31]: searchable
      - combobox "outlined 24 searchable" [ref=e34] [cursor=pointer]:
        - generic [ref=e35]: 请选择课程
      - textbox [ref=e41]
    - generic [ref=e42]:
      - generic [ref=e43]: searchable-multiple
      - combobox "outlined 24 searchable-multiple" [ref=e46] [cursor=pointer]:
        - generic [ref=e47]: 请选择课程
      - textbox [ref=e53]
    - generic [ref=e54]:
      - generic [ref=e55]: warning
      - combobox "outlined 24 warning" [ref=e58] [cursor=pointer]:
        - generic [ref=e59]: 请选择课程
      - textbox [ref=e65]
    - generic [ref=e66]:
      - generic [ref=e67]: error
      - combobox "outlined 24 error" [invalid] [ref=e70] [cursor=pointer]:
        - generic [ref=e71]: 请选择课程
      - textbox [ref=e77]
    - generic [ref=e78]:
      - generic [ref=e79]: readonly
      - combobox "outlined 24 readonly" [disabled] [ref=e82]:
        - generic [ref=e83]: 请选择课程
      - textbox [ref=e88]
    - generic [ref=e89]:
      - generic [ref=e90]: disabled
      - combobox "outlined 24 disabled" [disabled] [ref=e93]:
        - generic [ref=e94]: 请选择课程
      - textbox [disabled] [ref=e99]
    - generic [ref=e101]:
      - generic [ref=e102]: outlined 24 inherited-disabled
      - combobox "描边输入" [disabled] [ref=e105]:
        - generic [ref=e106]: 请选择课程
      - textbox [disabled] [ref=e111]
    - generic [ref=e112]:
      - generic [ref=e113]: loading
      - combobox "outlined 24 loading" [ref=e116] [cursor=pointer]:
        - generic [ref=e117]: 请选择课程
      - textbox [ref=e123]
  - generic [ref=e124]:
    - heading "dark · outlined · 28px · 实施后" [level=2] [ref=e125]
    - generic [ref=e126]:
      - generic [ref=e127]: normal
      - combobox "outlined 28 normal" [ref=e130] [cursor=pointer]:
        - generic [ref=e131]: 请选择课程
      - textbox [ref=e137]
    - generic [ref=e138]:
      - generic [ref=e139]: multiple
      - combobox "outlined 28 multiple" [ref=e142] [cursor=pointer]:
        - generic [ref=e143]: 请选择课程
      - textbox [ref=e149]
    - generic [ref=e150]:
      - generic [ref=e151]: searchable
      - combobox "outlined 28 searchable" [ref=e154] [cursor=pointer]:
        - generic [ref=e155]: 请选择课程
      - textbox [ref=e161]
    - generic [ref=e162]:
      - generic [ref=e163]: searchable-multiple
      - combobox "outlined 28 searchable-multiple" [ref=e166] [cursor=pointer]:
        - generic [ref=e167]: 请选择课程
      - textbox [ref=e173]
    - generic [ref=e174]:
      - generic [ref=e175]: warning
      - combobox "outlined 28 warning" [ref=e178] [cursor=pointer]:
        - generic [ref=e179]: 请选择课程
      - textbox [ref=e185]
    - generic [ref=e186]:
      - generic [ref=e187]: error
      - combobox "outlined 28 error" [invalid] [ref=e190] [cursor=pointer]:
        - generic [ref=e191]: 请选择课程
      - textbox [ref=e197]
    - generic [ref=e198]:
      - generic [ref=e199]: readonly
      - combobox "outlined 28 readonly" [disabled] [ref=e202]:
        - generic [ref=e203]: 请选择课程
      - textbox [ref=e208]
    - generic [ref=e209]:
      - generic [ref=e210]: disabled
      - combobox "outlined 28 disabled" [disabled] [ref=e213]:
        - generic [ref=e214]: 请选择课程
      - textbox [disabled] [ref=e219]
    - generic [ref=e221]:
      - generic [ref=e222]: outlined 28 inherited-disabled
      - combobox "outlined 28 inherited-disabled" [disabled] [ref=e225]:
        - generic [ref=e226]: 请选择课程
      - textbox [disabled] [ref=e231]
    - generic [ref=e232]:
      - generic [ref=e233]: loading
      - combobox "outlined 28 loading" [ref=e236] [cursor=pointer]:
        - generic [ref=e237]: 请选择课程
      - textbox [ref=e243]
  - generic [ref=e244]:
    - heading "dark · outlined · 32px · 实施后" [level=2] [ref=e245]
    - generic [ref=e246]:
      - generic [ref=e247]: normal
      - combobox "outlined 32 normal" [ref=e250] [cursor=pointer]:
        - generic [ref=e251]: 请选择课程
      - textbox [ref=e257]
    - generic [ref=e258]:
      - generic [ref=e259]: multiple
      - combobox "outlined 32 multiple" [ref=e262] [cursor=pointer]:
        - generic [ref=e263]: 请选择课程
      - textbox [ref=e269]
    - generic [ref=e270]:
      - generic [ref=e271]: searchable
      - combobox "outlined 32 searchable" [ref=e274] [cursor=pointer]:
        - generic [ref=e275]: 请选择课程
      - textbox [ref=e281]
    - generic [ref=e282]:
      - generic [ref=e283]: searchable-multiple
      - combobox "outlined 32 searchable-multiple" [ref=e286] [cursor=pointer]:
        - generic [ref=e287]: 请选择课程
      - textbox [ref=e293]
    - generic [ref=e294]:
      - generic [ref=e295]: warning
      - combobox "outlined 32 warning" [ref=e298] [cursor=pointer]:
        - generic [ref=e299]: 请选择课程
      - textbox [ref=e305]
    - generic [ref=e306]:
      - generic [ref=e307]: error
      - combobox "outlined 32 error" [invalid] [ref=e310] [cursor=pointer]:
        - generic [ref=e311]: 请选择课程
      - textbox [ref=e317]
    - generic [ref=e318]:
      - generic [ref=e319]: readonly
      - combobox "outlined 32 readonly" [disabled] [ref=e322]:
        - generic [ref=e323]: 请选择课程
      - textbox [ref=e328]
    - generic [ref=e329]:
      - generic [ref=e330]: disabled
      - combobox "outlined 32 disabled" [disabled] [ref=e333]:
        - generic [ref=e334]: 请选择课程
      - textbox [disabled] [ref=e339]
    - generic [ref=e341]:
      - generic [ref=e342]: outlined 32 inherited-disabled
      - combobox "outlined 32 inherited-disabled" [disabled] [ref=e345]:
        - generic [ref=e346]: 请选择课程
      - textbox [disabled] [ref=e351]
    - generic [ref=e352]:
      - generic [ref=e353]: loading
      - combobox "outlined 32 loading" [ref=e356] [cursor=pointer]:
        - generic [ref=e357]: 请选择课程
      - textbox [ref=e363]
  - generic [ref=e364]:
    - heading "dark · outlined · 36px · 实施后" [level=2] [ref=e365]
    - generic [ref=e366]:
      - generic [ref=e367]: normal
      - combobox "outlined 36 normal" [ref=e370] [cursor=pointer]:
        - generic [ref=e371]: 请选择课程
      - textbox [ref=e377]
    - generic [ref=e378]:
      - generic [ref=e379]: multiple
      - combobox "outlined 36 multiple" [ref=e382] [cursor=pointer]:
        - generic [ref=e383]: 请选择课程
      - textbox [ref=e389]
    - generic [ref=e390]:
      - generic [ref=e391]: searchable
      - combobox "outlined 36 searchable" [ref=e394] [cursor=pointer]:
        - generic [ref=e395]: 请选择课程
      - textbox [ref=e401]
    - generic [ref=e402]:
      - generic [ref=e403]: searchable-multiple
      - combobox "outlined 36 searchable-multiple" [ref=e406] [cursor=pointer]:
        - generic [ref=e407]: 请选择课程
      - textbox [ref=e413]
    - generic [ref=e414]:
      - generic [ref=e415]: warning
      - combobox "outlined 36 warning" [ref=e418] [cursor=pointer]:
        - generic [ref=e419]: 请选择课程
      - textbox [ref=e425]
    - generic [ref=e426]:
      - generic [ref=e427]: error
      - combobox "outlined 36 error" [invalid] [ref=e430] [cursor=pointer]:
        - generic [ref=e431]: 请选择课程
      - textbox [ref=e437]
    - generic [ref=e438]:
      - generic [ref=e439]: readonly
      - combobox "outlined 36 readonly" [disabled] [ref=e442]:
        - generic [ref=e443]: 请选择课程
      - textbox [ref=e448]
    - generic [ref=e449]:
      - generic [ref=e450]: disabled
      - combobox "outlined 36 disabled" [disabled] [ref=e453]:
        - generic [ref=e454]: 请选择课程
      - textbox [disabled] [ref=e459]
    - generic [ref=e461]:
      - generic [ref=e462]: outlined 36 inherited-disabled
      - combobox "outlined 36 inherited-disabled" [disabled] [ref=e465]:
        - generic [ref=e466]: 请选择课程
      - textbox [disabled] [ref=e471]
    - generic [ref=e472]:
      - generic [ref=e473]: loading
      - combobox "outlined 36 loading" [ref=e476] [cursor=pointer]:
        - generic [ref=e477]: 请选择课程
      - textbox [ref=e483]
  - generic [ref=e484]:
    - heading "dark · filled · 24px · 实施后" [level=2] [ref=e485]
    - generic [ref=e486]:
      - generic [ref=e487]: normal
      - combobox "filled 24 normal" [active] [ref=e490] [cursor=pointer]:
        - generic [ref=e491]: 请选择课程
      - textbox [ref=e497]
    - generic [ref=e498]:
      - generic [ref=e499]: multiple
      - combobox "filled 24 multiple" [ref=e502] [cursor=pointer]:
        - generic [ref=e503]: 请选择课程
      - textbox [ref=e509]
    - generic [ref=e510]:
      - generic [ref=e511]: searchable
      - combobox "filled 24 searchable" [ref=e514] [cursor=pointer]:
        - generic [ref=e515]: 请选择课程
      - textbox [ref=e521]
    - generic [ref=e522]:
      - generic [ref=e523]: searchable-multiple
      - combobox "filled 24 searchable-multiple" [ref=e526] [cursor=pointer]:
        - generic [ref=e527]: 请选择课程
      - textbox [ref=e533]
    - generic [ref=e534]:
      - generic [ref=e535]: warning
      - combobox "filled 24 warning" [ref=e538] [cursor=pointer]:
        - generic [ref=e539]: 请选择课程
      - textbox [ref=e545]
    - generic [ref=e546]:
      - generic [ref=e547]: error
      - combobox "filled 24 error" [invalid] [ref=e550] [cursor=pointer]:
        - generic [ref=e551]: 请选择课程
      - textbox [ref=e557]
    - generic [ref=e558]:
      - generic [ref=e559]: readonly
      - combobox "filled 24 readonly" [disabled] [ref=e562]:
        - generic [ref=e563]: 请选择课程
      - textbox [ref=e568]
    - generic [ref=e569]:
      - generic [ref=e570]: disabled
      - combobox "filled 24 disabled" [disabled] [ref=e573]:
        - generic [ref=e574]: 请选择课程
      - textbox [disabled] [ref=e579]
    - generic [ref=e581]:
      - generic [ref=e582]: filled 24 inherited-disabled
      - combobox "filled 24 inherited-disabled" [disabled] [ref=e585]:
        - generic [ref=e586]: 请选择课程
      - textbox [disabled] [ref=e591]
    - generic [ref=e592]:
      - generic [ref=e593]: loading
      - combobox "filled 24 loading" [ref=e596] [cursor=pointer]:
        - generic [ref=e597]: 请选择课程
      - textbox [ref=e603]
  - generic [ref=e604]:
    - heading "dark · filled · 28px · 实施后" [level=2] [ref=e605]
    - generic [ref=e606]:
      - generic [ref=e607]: normal
      - combobox "filled 28 normal" [ref=e610] [cursor=pointer]:
        - generic [ref=e611]: 请选择课程
      - textbox [ref=e617]
    - generic [ref=e618]:
      - generic [ref=e619]: multiple
      - combobox "filled 28 multiple" [ref=e622] [cursor=pointer]:
        - generic [ref=e623]: 请选择课程
      - textbox [ref=e629]
    - generic [ref=e630]:
      - generic [ref=e631]: searchable
      - combobox "filled 28 searchable" [ref=e634] [cursor=pointer]:
        - generic [ref=e635]: 请选择课程
      - textbox [ref=e641]
    - generic [ref=e642]:
      - generic [ref=e643]: searchable-multiple
      - combobox "filled 28 searchable-multiple" [ref=e646] [cursor=pointer]:
        - generic [ref=e647]: 请选择课程
      - textbox [ref=e653]
    - generic [ref=e654]:
      - generic [ref=e655]: warning
      - combobox "filled 28 warning" [ref=e658] [cursor=pointer]:
        - generic [ref=e659]: 请选择课程
      - textbox [ref=e665]
    - generic [ref=e666]:
      - generic [ref=e667]: error
      - combobox "filled 28 error" [invalid] [ref=e670] [cursor=pointer]:
        - generic [ref=e671]: 请选择课程
      - textbox [ref=e677]
    - generic [ref=e678]:
      - generic [ref=e679]: readonly
      - combobox "filled 28 readonly" [disabled] [ref=e682]:
        - generic [ref=e683]: 请选择课程
      - textbox [ref=e688]
    - generic [ref=e689]:
      - generic [ref=e690]: disabled
      - combobox "filled 28 disabled" [disabled] [ref=e693]:
        - generic [ref=e694]: 请选择课程
      - textbox [disabled] [ref=e699]
    - generic [ref=e701]:
      - generic [ref=e702]: filled 28 inherited-disabled
      - combobox "filled 28 inherited-disabled" [disabled] [ref=e705]:
        - generic [ref=e706]: 请选择课程
      - textbox [disabled] [ref=e711]
    - generic [ref=e712]:
      - generic [ref=e713]: loading
      - combobox "filled 28 loading" [ref=e716] [cursor=pointer]:
        - generic [ref=e717]: 请选择课程
      - textbox [ref=e723]
  - generic [ref=e724]:
    - heading "dark · filled · 32px · 实施后" [level=2] [ref=e725]
    - generic [ref=e726]:
      - generic [ref=e727]: normal
      - combobox "filled 32 normal" [ref=e730] [cursor=pointer]:
        - generic [ref=e731]: 请选择课程
      - textbox [ref=e737]
    - generic [ref=e738]:
      - generic [ref=e739]: multiple
      - combobox "filled 32 multiple" [ref=e742] [cursor=pointer]:
        - generic [ref=e743]: 请选择课程
      - textbox [ref=e749]
    - generic [ref=e750]:
      - generic [ref=e751]: searchable
      - combobox "filled 32 searchable" [ref=e754] [cursor=pointer]:
        - generic [ref=e755]: 请选择课程
      - textbox [ref=e761]
    - generic [ref=e762]:
      - generic [ref=e763]: searchable-multiple
      - combobox "filled 32 searchable-multiple" [ref=e766] [cursor=pointer]:
        - generic [ref=e767]: 请选择课程
      - textbox [ref=e773]
    - generic [ref=e774]:
      - generic [ref=e775]: warning
      - combobox "filled 32 warning" [ref=e778] [cursor=pointer]:
        - generic [ref=e779]: 请选择课程
      - textbox [ref=e785]
    - generic [ref=e786]:
      - generic [ref=e787]: error
      - combobox "filled 32 error" [invalid] [ref=e790] [cursor=pointer]:
        - generic [ref=e791]: 请选择课程
      - textbox [ref=e797]
    - generic [ref=e798]:
      - generic [ref=e799]: readonly
      - combobox "filled 32 readonly" [disabled] [ref=e802]:
        - generic [ref=e803]: 请选择课程
      - textbox [ref=e808]
    - generic [ref=e809]:
      - generic [ref=e810]: disabled
      - combobox "filled 32 disabled" [disabled] [ref=e813]:
        - generic [ref=e814]: 请选择课程
      - textbox [disabled] [ref=e819]
    - generic [ref=e821]:
      - generic [ref=e822]: filled 32 inherited-disabled
      - combobox "filled 32 inherited-disabled" [disabled] [ref=e825]:
        - generic [ref=e826]: 请选择课程
      - textbox [disabled] [ref=e831]
    - generic [ref=e832]:
      - generic [ref=e833]: loading
      - combobox "filled 32 loading" [ref=e836] [cursor=pointer]:
        - generic [ref=e837]: 请选择课程
      - textbox [ref=e843]
  - generic [ref=e844]:
    - heading "dark · filled · 36px · 实施后" [level=2] [ref=e845]
    - generic [ref=e846]:
      - generic [ref=e847]: normal
      - combobox "filled 36 normal" [ref=e850] [cursor=pointer]:
        - generic [ref=e851]: 请选择课程
      - textbox [ref=e857]
    - generic [ref=e858]:
      - generic [ref=e859]: multiple
      - combobox "filled 36 multiple" [ref=e862] [cursor=pointer]:
        - generic [ref=e863]: 请选择课程
      - textbox [ref=e869]
    - generic [ref=e870]:
      - generic [ref=e871]: searchable
      - combobox "filled 36 searchable" [ref=e874] [cursor=pointer]:
        - generic [ref=e875]: 请选择课程
      - textbox [ref=e881]
    - generic [ref=e882]:
      - generic [ref=e883]: searchable-multiple
      - combobox "filled 36 searchable-multiple" [ref=e886] [cursor=pointer]:
        - generic [ref=e887]: 请选择课程
      - textbox [ref=e893]
    - generic [ref=e894]:
      - generic [ref=e895]: warning
      - combobox "filled 36 warning" [ref=e898] [cursor=pointer]:
        - generic [ref=e899]: 请选择课程
      - textbox [ref=e905]
    - generic [ref=e906]:
      - generic [ref=e907]: error
      - combobox "filled 36 error" [invalid] [ref=e910] [cursor=pointer]:
        - generic [ref=e911]: 请选择课程
      - textbox [ref=e917]
    - generic [ref=e918]:
      - generic [ref=e919]: readonly
      - combobox "filled 36 readonly" [disabled] [ref=e922]:
        - generic [ref=e923]: 请选择课程
      - textbox [ref=e928]
    - generic [ref=e929]:
      - generic [ref=e930]: disabled
      - combobox "filled 36 disabled" [disabled] [ref=e933]:
        - generic [ref=e934]: 请选择课程
      - textbox [disabled] [ref=e939]
    - generic [ref=e941]:
      - generic [ref=e942]: filled 36 inherited-disabled
      - combobox "filled 36 inherited-disabled" [disabled] [ref=e945]:
        - generic [ref=e946]: 请选择课程
      - textbox [disabled] [ref=e951]
    - generic [ref=e952]:
      - generic [ref=e953]: loading
      - combobox "filled 36 loading" [ref=e956] [cursor=pointer]:
        - generic [ref=e957]: 请选择课程
      - textbox [ref=e963]
  - generic [ref=e964]:
    - heading "dark · underlined · 24px · 实施后" [level=2] [ref=e965]
    - generic [ref=e966]:
      - generic [ref=e967]: normal
      - combobox "underlined 24 normal" [ref=e970] [cursor=pointer]:
        - generic [ref=e971]: 请选择课程
      - textbox [ref=e977]
    - generic [ref=e978]:
      - generic [ref=e979]: multiple
      - combobox "underlined 24 multiple" [ref=e982] [cursor=pointer]:
        - generic [ref=e983]: 请选择课程
      - textbox [ref=e989]
    - generic [ref=e990]:
      - generic [ref=e991]: searchable
      - combobox "underlined 24 searchable" [ref=e994] [cursor=pointer]:
        - generic [ref=e995]: 请选择课程
      - textbox [ref=e1001]
    - generic [ref=e1002]:
      - generic [ref=e1003]: searchable-multiple
      - combobox "underlined 24 searchable-multiple" [ref=e1006] [cursor=pointer]:
        - generic [ref=e1007]: 请选择课程
      - textbox [ref=e1013]
    - generic [ref=e1014]:
      - generic [ref=e1015]: warning
      - combobox "underlined 24 warning" [ref=e1018] [cursor=pointer]:
        - generic [ref=e1019]: 请选择课程
      - textbox [ref=e1025]
    - generic [ref=e1026]:
      - generic [ref=e1027]: error
      - combobox "underlined 24 error" [invalid] [ref=e1030] [cursor=pointer]:
        - generic [ref=e1031]: 请选择课程
      - textbox [ref=e1037]
    - generic [ref=e1038]:
      - generic [ref=e1039]: readonly
      - combobox "underlined 24 readonly" [disabled] [ref=e1042]:
        - generic [ref=e1043]: 请选择课程
      - textbox [ref=e1048]
    - generic [ref=e1049]:
      - generic [ref=e1050]: disabled
      - combobox "underlined 24 disabled" [disabled] [ref=e1053]:
        - generic [ref=e1054]: 请选择课程
      - textbox [disabled] [ref=e1059]
    - generic [ref=e1061]:
      - generic [ref=e1062]: underlined 24 inherited-disabled
      - combobox "underlined 24 inherited-disabled" [disabled] [ref=e1065]:
        - generic [ref=e1066]: 请选择课程
      - textbox [disabled] [ref=e1071]
    - generic [ref=e1072]:
      - generic [ref=e1073]: loading
      - combobox "underlined 24 loading" [ref=e1076] [cursor=pointer]:
        - generic [ref=e1077]: 请选择课程
      - textbox [ref=e1083]
  - generic [ref=e1084]:
    - heading "dark · underlined · 28px · 实施后" [level=2] [ref=e1085]
    - generic [ref=e1086]:
      - generic [ref=e1087]: normal
      - combobox "underlined 28 normal" [ref=e1090] [cursor=pointer]:
        - generic [ref=e1091]: 请选择课程
      - textbox [ref=e1097]
    - generic [ref=e1098]:
      - generic [ref=e1099]: multiple
      - combobox "underlined 28 multiple" [ref=e1102] [cursor=pointer]:
        - generic [ref=e1103]: 请选择课程
      - textbox [ref=e1109]
    - generic [ref=e1110]:
      - generic [ref=e1111]: searchable
      - combobox "underlined 28 searchable" [ref=e1114] [cursor=pointer]:
        - generic [ref=e1115]: 请选择课程
      - textbox [ref=e1121]
    - generic [ref=e1122]:
      - generic [ref=e1123]: searchable-multiple
      - combobox "underlined 28 searchable-multiple" [ref=e1126] [cursor=pointer]:
        - generic [ref=e1127]: 请选择课程
      - textbox [ref=e1133]
    - generic [ref=e1134]:
      - generic [ref=e1135]: warning
      - combobox "underlined 28 warning" [ref=e1138] [cursor=pointer]:
        - generic [ref=e1139]: 请选择课程
      - textbox [ref=e1145]
    - generic [ref=e1146]:
      - generic [ref=e1147]: error
      - combobox "underlined 28 error" [invalid] [ref=e1150] [cursor=pointer]:
        - generic [ref=e1151]: 请选择课程
      - textbox [ref=e1157]
    - generic [ref=e1158]:
      - generic [ref=e1159]: readonly
      - combobox "underlined 28 readonly" [disabled] [ref=e1162]:
        - generic [ref=e1163]: 请选择课程
      - textbox [ref=e1168]
    - generic [ref=e1169]:
      - generic [ref=e1170]: disabled
      - combobox "underlined 28 disabled" [disabled] [ref=e1173]:
        - generic [ref=e1174]: 请选择课程
      - textbox [disabled] [ref=e1179]
    - generic [ref=e1181]:
      - generic [ref=e1182]: underlined 28 inherited-disabled
      - combobox "underlined 28 inherited-disabled" [disabled] [ref=e1185]:
        - generic [ref=e1186]: 请选择课程
      - textbox [disabled] [ref=e1191]
    - generic [ref=e1192]:
      - generic [ref=e1193]: loading
      - combobox "underlined 28 loading" [ref=e1196] [cursor=pointer]:
        - generic [ref=e1197]: 请选择课程
      - textbox [ref=e1203]
  - generic [ref=e1204]:
    - heading "dark · underlined · 32px · 实施后" [level=2] [ref=e1205]
    - generic [ref=e1206]:
      - generic [ref=e1207]: normal
      - combobox "underlined 32 normal" [ref=e1210] [cursor=pointer]:
        - generic [ref=e1211]: 请选择课程
      - textbox [ref=e1217]
    - generic [ref=e1218]:
      - generic [ref=e1219]: multiple
      - combobox "underlined 32 multiple" [ref=e1222] [cursor=pointer]:
        - generic [ref=e1223]: 请选择课程
      - textbox [ref=e1229]
    - generic [ref=e1230]:
      - generic [ref=e1231]: searchable
      - combobox "underlined 32 searchable" [ref=e1234] [cursor=pointer]:
        - generic [ref=e1235]: 请选择课程
      - textbox [ref=e1241]
    - generic [ref=e1242]:
      - generic [ref=e1243]: searchable-multiple
      - combobox "underlined 32 searchable-multiple" [ref=e1246] [cursor=pointer]:
        - generic [ref=e1247]: 请选择课程
      - textbox [ref=e1253]
    - generic [ref=e1254]:
      - generic [ref=e1255]: warning
      - combobox "underlined 32 warning" [ref=e1258] [cursor=pointer]:
        - generic [ref=e1259]: 请选择课程
      - textbox [ref=e1265]
    - generic [ref=e1266]:
      - generic [ref=e1267]: error
      - combobox "underlined 32 error" [invalid] [ref=e1270] [cursor=pointer]:
        - generic [ref=e1271]: 请选择课程
      - textbox [ref=e1277]
    - generic [ref=e1278]:
      - generic [ref=e1279]: readonly
      - combobox "underlined 32 readonly" [disabled] [ref=e1282]:
        - generic [ref=e1283]: 请选择课程
      - textbox [ref=e1288]
    - generic [ref=e1289]:
      - generic [ref=e1290]: disabled
      - combobox "underlined 32 disabled" [disabled] [ref=e1293]:
        - generic [ref=e1294]: 请选择课程
      - textbox [disabled] [ref=e1299]
    - generic [ref=e1301]:
      - generic [ref=e1302]: underlined 32 inherited-disabled
      - combobox "underlined 32 inherited-disabled" [disabled] [ref=e1305]:
        - generic [ref=e1306]: 请选择课程
      - textbox [disabled] [ref=e1311]
    - generic [ref=e1312]:
      - generic [ref=e1313]: loading
      - combobox "underlined 32 loading" [ref=e1316] [cursor=pointer]:
        - generic [ref=e1317]: 请选择课程
      - textbox [ref=e1323]
  - generic [ref=e1324]:
    - heading "dark · underlined · 36px · 实施后" [level=2] [ref=e1325]
    - generic [ref=e1326]:
      - generic [ref=e1327]: normal
      - combobox "underlined 36 normal" [ref=e1330] [cursor=pointer]:
        - generic [ref=e1331]: 请选择课程
      - textbox [ref=e1337]
    - generic [ref=e1338]:
      - generic [ref=e1339]: multiple
      - combobox "underlined 36 multiple" [ref=e1342] [cursor=pointer]:
        - generic [ref=e1343]: 请选择课程
      - textbox [ref=e1349]
    - generic [ref=e1350]:
      - generic [ref=e1351]: searchable
      - combobox "underlined 36 searchable" [ref=e1354] [cursor=pointer]:
        - generic [ref=e1355]: 请选择课程
      - textbox [ref=e1361]
    - generic [ref=e1362]:
      - generic [ref=e1363]: searchable-multiple
      - combobox "underlined 36 searchable-multiple" [ref=e1366] [cursor=pointer]:
        - generic [ref=e1367]: 请选择课程
      - textbox [ref=e1373]
    - generic [ref=e1374]:
      - generic [ref=e1375]: warning
      - combobox "underlined 36 warning" [ref=e1378] [cursor=pointer]:
        - generic [ref=e1379]: 请选择课程
      - textbox [ref=e1385]
    - generic [ref=e1386]:
      - generic [ref=e1387]: error
      - combobox "underlined 36 error" [invalid] [ref=e1390] [cursor=pointer]:
        - generic [ref=e1391]: 请选择课程
      - textbox [ref=e1397]
    - generic [ref=e1398]:
      - generic [ref=e1399]: readonly
      - combobox "underlined 36 readonly" [disabled] [ref=e1402]:
        - generic [ref=e1403]: 请选择课程
      - textbox [ref=e1408]
    - generic [ref=e1409]:
      - generic [ref=e1410]: disabled
      - combobox "underlined 36 disabled" [disabled] [ref=e1413]:
        - generic [ref=e1414]: 请选择课程
      - textbox [disabled] [ref=e1419]
    - generic [ref=e1421]:
      - generic [ref=e1422]: underlined 36 inherited-disabled
      - combobox "underlined 36 inherited-disabled" [disabled] [ref=e1425]:
        - generic [ref=e1426]: 请选择课程
      - textbox [disabled] [ref=e1431]
    - generic [ref=e1432]:
      - generic [ref=e1433]: loading
      - combobox "underlined 36 loading" [ref=e1436] [cursor=pointer]:
        - generic [ref=e1437]: 请选择课程
      - textbox [ref=e1443]
  - generic [ref=e1444]:
    - generic [ref=e1445]:
      - generic [ref=e1446]:
        - combobox "保留计数" [ref=e1447] [cursor=pointer]:
          - generic "可选课程、已有课程" [ref=e1449]: 已选 2 项
        - button "清除保留计数" [ref=e1452] [cursor=pointer]
      - generic [ref=e1458]: 已选：可选课程、已有课程
    - textbox [ref=e1459]
    - generic [ref=e1460]:
      - generic [ref=e1461]:
        - generic "已有课程" [ref=e1464]:
          - button "移除 已有课程" [ref=e1467] [cursor=pointer]
        - combobox "保留标签" [ref=e1470] [cursor=pointer]
        - button "清除保留标签" [ref=e1475] [cursor=pointer]
      - generic [ref=e1478]: 已选：已有课程
    - textbox [ref=e1479]
```

# Test source

```ts
  1   | import { expect, test, type Locator } from "@playwright/test";
  2   | import { mkdirSync, writeFileSync } from "node:fs";
  3   | import { contrastRatio } from "./color-contrast";
  4   | 
  5   | const frame = (control: Locator) => control.locator("xpath=..");
  6   | const widget = (control: Locator) => frame(control).locator("xpath=..");
  7   | const popup = (control: Locator) => control.page().locator('[data-rain-id="ui-select-popup"]:visible');
  8   | 
  9   | for (const theme of ["light", "dark"] as const) test(`implemented Select placeholders and option descriptions preserve real permissions in ${theme}`, async ({ page }, testInfo) => {
  10  |   test.setTimeout(120_000);
  11  |   await page.setViewportSize({ width: 1440, height: 1100 });
  12  |   await page.emulateMedia({ reducedMotion: "reduce" });
  13  |   await page.goto("/#select");
  14  |   await page.evaluate(async ({ theme, uiPath }) => {
  15  |     const reactPath = "/node_modules/.vite/deps/react.js", clientPath = "/node_modules/.vite/deps/react-dom_client.js";
  16  |     const { createElement: h } = (await import(reactPath)).default;
  17  |     const { createRoot } = (await import(clientPath)).default;
  18  |     const { Select, FormItem } = await import(uiPath);
  19  |     document.getElementById("root")!.style.display = "none";
  20  |     const host = document.createElement("section");
  21  |     host.id = "select-closure-fixture"; host.setAttribute("data-rain-theme", theme);
  22  |     host.style.cssText = "padding:24px;background:var(--rain-category-background-neutral-1);color:var(--rain-category-text-neutral-1);font-family:var(--rain-font-ui)";
  23  |     document.body.append(host);
  24  |     const options = [{ value: "alpha", label: "可选课程", description: "普通未选说明" }, { value: "beta", label: "已有课程", description: "选中后保留品牌说明" }, { value: "blocked", label: "暂不可选", description: "禁用说明保留原色", disabled: true }];
  25  |     const cells = ["outlined", "filled", "underlined"].flatMap(appearance => [24, 28, 32, 36].map(size => h("section", { key: `${appearance}-${size}`, "data-closure-cell": `${appearance}-${size}`, style: { display: "grid", gap: "12px", alignContent: "start" } },
  26  |       h("h2", { style: { fontSize: "16px", margin: 0 } }, `${theme} · ${appearance} · ${size}px · 实施后`),
  27  |       ...["normal", "multiple", "searchable", "searchable-multiple", "warning", "error", "readonly", "disabled", "inherited-disabled", "loading"].map(state => {
  28  |         const label = `${appearance} ${size} ${state}`;
  29  |         const control = h(Select, { options, appearance, size, placeholder: "请选择课程", "aria-label": label,
  30  |           multiple: state.includes("multiple"), searchable: state.startsWith("searchable"), loading: state === "loading",
  31  |           readOnly: state === "readonly", disabled: state === "disabled", status: ["warning", "error"].includes(state) ? state : "default" });
  32  |         return h("div", { key: state, "data-closure-select": state, style: { display: "grid", gap: "4px" } },
  33  |           state === "inherited-disabled" ? h(FormItem, { label, disabled: true }, control) : [h("span", { key: "label", style: { fontSize: "12px" } }, state), control]);
  34  |       }))));
  35  |     cells.push(h("section", { key: "retained", "data-closure-retained": true, style: { display: "grid", gap: "12px" } },
  36  |       h(Select, { options, "aria-label": "保留计数", multiple: true, display: "count", defaultValue: ["alpha", "beta"] }),
  37  |       h(Select, { options, "aria-label": "保留标签", multiple: true, display: "tags", size: 32, defaultValue: ["beta"] })));
  38  |     createRoot(host).render(h("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "24px" } }, ...cells));
  39  |   }, { theme, uiPath: `/@fs${new URL("../../packages/ui/src/index.ts", import.meta.url).pathname}` });
  40  |   const host = page.locator("#select-closure-fixture");
  41  |   await expect(host.locator("[data-closure-select] [role=combobox]")).toHaveCount(120);
  42  |   const colors = theme === "light"
  43  |     ? { placeholder: "rgb(116, 133, 168)", strongText: "rgb(73, 93, 135)", disabled: "rgb(160, 172, 197)", arrow: "rgb(150, 163, 193)", disabledArrow: "rgb(184, 194, 216)", text: "rgb(20, 35, 70)", description: "rgb(86, 104, 143)", selected: "rgb(21, 97, 248)" }
  44  |     : { placeholder: "rgb(136, 145, 173)", strongText: "rgb(183, 193, 224)", disabled: "rgb(111, 122, 158)", arrow: "rgb(132, 144, 181)", disabledArrow: "rgb(85, 95, 128)", text: "rgb(239, 241, 245)", description: "rgb(148, 156, 184)", selected: "rgb(81, 136, 255)" };
  45  |   const records: unknown[] = [];
  46  |   async function record(control: Locator, interaction: string) {
> 47  |     const paint = await control.evaluate(node => {
      |                                 ^ Error: locator.evaluate: Test timeout of 120000ms exceeded.
  48  |       const trigger = node as HTMLButtonElement, frame = trigger.closest('[data-slot="frame"]')!, owner = trigger.closest('[data-rain-id="ui-select"]')!;
  49  |       const value = getComputedStyle(trigger.querySelector('[data-slot="value"] > span')!), frameCss = getComputedStyle(frame);
  50  |       return { appearance: owner.getAttribute("data-appearance"), size: owner.getAttribute("data-size"),
  51  |         state: owner.closest("[data-closure-select]")!.getAttribute("data-closure-select"), permission: owner.getAttribute("data-permission"),
  52  |         disabled: trigger.disabled, ariaDisabled: trigger.getAttribute("aria-disabled"), open: trigger.getAttribute("aria-expanded"),
  53  |         focused: trigger === document.activeElement, focusVisible: trigger.matches(":focus-visible"), hover: trigger.matches(":hover"),
  54  |         placeholder: value.color, label: trigger.textContent, opacity: value.opacity,
  55  |         foreground: getComputedStyle(trigger).color, arrow: getComputedStyle(frame.querySelector('[data-slot="arrow"]')!).color,
  56  |         background: frameCss.backgroundColor, parentBackground: getComputedStyle(document.getElementById("select-closure-fixture")!).backgroundColor,
  57  |         border: frameCss.borderColor, outline: frameCss.outlineColor, shadow: frameCss.boxShadow };
  58  |     });
  59  |     expect(paint.placeholder).toBe(paint.disabled ? colors.disabled : colors.placeholder);
  60  |     expect(paint.label).toBe("请选择课程"); expect(paint.opacity).toBe("1");
  61  |     expect(paint.disabled).toBe(["disabled", "inherited-disabled"].includes(paint.state!));
  62  |     expect(paint.permission).toBe(paint.disabled ? "disabled" : paint.state === "readonly" ? "readonly" : "editable");
  63  |     expect(paint.arrow).toBe(paint.disabled ? colors.disabledArrow : colors.arrow);
  64  |     const contrast = contrastRatio(paint.placeholder, paint.background, paint.parentBackground);
  65  |     records.push({ theme, interaction, ...paint, contrast, contrastRequired: paint.disabled ? null : 4.5, contrastPass: paint.disabled ? null : contrast >= 4.5 });
  66  |     return paint;
  67  |   }
  68  |   for (const control of await host.locator("[data-closure-select] [role=combobox]").all()) await record(control, "closed");
  69  |   const directory = process.env.RAIN_CLOSURE_EVIDENCE_DIR;
  70  |   if (directory) mkdirSync(directory, { recursive: true });
  71  |   const artifact = (name: string) => directory ? `${directory}/${name}` : testInfo.outputPath(name);
  72  |   await host.locator('[data-closure-cell="outlined-32"]').screenshot({ path: artifact(`implemented-select-${theme}.png`) });
  73  |   for (const appearance of ["outlined", "filled", "underlined"]) for (const size of [24, 28, 32, 36]) {
  74  |     const cell = host.locator(`[data-closure-cell="${appearance}-${size}"]`);
  75  |     const readonly = cell.locator('[data-closure-select="readonly"] [role=combobox]');
  76  |     await readonly.focus(); await readonly.press("Tab"); await page.keyboard.press("Shift+Tab");
  77  |     expect((await record(readonly, "readonly-keyboard-focus")).focusVisible).toBe(true);
  78  |     await readonly.press("ArrowDown"); await expect(readonly).toHaveAttribute("aria-expanded", "false");
  79  |     for (const state of ["normal", "multiple", "searchable", "searchable-multiple"]) {
  80  |       const control = cell.locator(`[data-closure-select="${state}"] [role=combobox]`);
  81  |       await control.hover(); expect((await record(control, "hover")).hover).toBe(true);
  82  |       await control.focus(); await control.press("Tab"); await page.keyboard.press("Shift+Tab");
  83  |       expect((await record(control, "keyboard-focus")).focusVisible).toBe(true);
  84  |       await control.press("ArrowDown"); const panel = popup(control); await expect(panel).toBeVisible();
  85  |       expect((await record(control, "open-empty")).open).toBe("true");
  86  |       await expect(panel.locator("xpath=..")).toHaveAttribute("data-rain-theme", theme);
  87  |       if (state.startsWith("searchable")) {
  88  |         const search = panel.getByRole("combobox", { name: "搜索选项", exact: true });
  89  |         await expect(search).toBeFocused(); await expect(search).toHaveValue("");
  90  |         const paint = await search.evaluate(node => ({ placeholder: getComputedStyle(node, "::placeholder").color, status: node.closest('[data-rain-id="ui-input"]')!.getAttribute("data-status") }));
  91  |         expect(paint).toEqual({ placeholder: colors.placeholder, status: "default" });
  92  |         records.push({ theme, appearance, size, state, interaction: "popup-search", ...paint });
  93  |       }
  94  |       const ordinary = panel.getByRole("option", { name: "可选课程", exact: true });
  95  |       const selected = panel.getByRole("option", { name: "已有课程", exact: true });
  96  |       const disabled = panel.getByRole("option", { name: "暂不可选", exact: true });
  97  |       await expect(ordinary.locator('[data-slot="description"]')).toHaveCSS("color", colors.strongText);
  98  |       await expect(disabled).toHaveAttribute("aria-disabled", "true");
  99  |       await expect(disabled.locator('[data-slot="description"]')).toHaveCSS("color", colors.description);
  100 |       await selected.click();
  101 |       if (!state.includes("multiple")) await control.press("ArrowDown");
  102 |       await expect(selected).toHaveAttribute("aria-selected", "true");
  103 |       await expect(selected.locator('[data-slot="description"]')).toHaveCSS("color", colors.selected);
  104 |       records.push({ theme, appearance, size, state, interaction: "option-description", ordinary: await ordinary.locator('[data-slot="description"]').evaluate(node => getComputedStyle(node).color), selected: await selected.locator('[data-slot="description"]').evaluate(node => getComputedStyle(node).color), disabled: await disabled.locator('[data-slot="description"]').evaluate(node => getComputedStyle(node).color), note: "Selected Brand/2 and disabled Neutral/4 are preserved, not accepted contrast exceptions." });
  105 |       await page.keyboard.press("Escape"); await expect(control).toBeFocused();
  106 |       await expect(control.locator('[data-slot="value"]')).toHaveCSS("color", colors.text);
  107 |       await widget(control).getByRole("button", { name: `清除${appearance} ${size} ${state}`, exact: true }).click();
  108 |       await record(control, "after-clear");
  109 |     }
  110 |   }
  111 |   const retained = host.locator("[data-closure-retained]");
  112 |   await expect(retained.getByRole("combobox", { name: "保留计数" }).locator('[data-slot="value"]')).toHaveCSS("color", colors.text);
  113 |   await expect(retained.getByText("已选 2 项", { exact: true })).toHaveCSS("color", colors.strongText);
  114 |   await expect(retained.locator('[data-rain-id="ui-tag"] [data-slot="label"]')).toHaveCSS("color", colors.text);
  115 |   records.push({ interaction: "retained-count-and-tag", value: colors.text, count: colors.strongText, tag: colors.text });
  116 |   writeFileSync(artifact(`implemented-select-${theme}.json`), JSON.stringify({ scope: "Real Select/FormItem props; three appearances x four sizes; empty single/multiple/searchable/searchable-multiple/warning/error/readonly/disabled/inherited-disabled/loading. Actual keyboard opening, Portal search, selection and clear; ordinary option Neutral/3, selected Brand/2, disabled Neutral/4. No manually assigned component state or color overrides.", theme, records }, null, 2));
  117 | });
  118 | 
  119 | test("formal popups escape clipping, inherit themes and retain keyboard focus within viewport bounds", async ({ page }) => {
  120 |   await page.goto("/#select");
  121 |   for (const theme of ["浅色", "深色"]) {
  122 |     await page.getByRole("button", { name: theme, exact: true }).click();
  123 |     for (const name of ["普通单选", "普通多选", "搜索单选", "搜索多选"]) {
  124 |       const control = page.getByRole("combobox", { name, exact: true });
  125 |       await control.evaluate((node) => {
  126 |         const root = node.closest('[data-rain-id="ui-select"]') as HTMLElement;
  127 |         root.style.overflow = "hidden";
  128 |       });
  129 |       await control.press("ArrowDown");
  130 |       const panel = popup(control);
  131 |       await expect(panel).toBeVisible();
  132 |       expect(await control.evaluate((node) => node.closest('[data-rain-id="ui-select"]')!.contains(document.querySelector('[data-rain-id="ui-select-popup"]')))).toBe(false);
  133 |       await expect(panel.locator("xpath=..")).toHaveAttribute("data-rain-theme", theme === "浅色" ? "light" : "dark");
  134 |       const anchor = (await frame(control).boundingBox())!, box = (await panel.boundingBox())!;
  135 |       expect(Math.abs(anchor.width - box.width)).toBeLessThanOrEqual(1);
  136 |       expect(box.x).toBeGreaterThanOrEqual(8);
  137 |       expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width - 8);
  138 |       expect(box.y + box.height).toBeLessThanOrEqual(page.viewportSize()!.height - 8);
  139 |       if (name === "普通单选") {
  140 |         const first = panel.getByRole("option", { name: "视传 2401", exact: true });
  141 |         await expect(first).toBeFocused();
  142 |         await expect(first).toHaveCSS("outline-style", "solid");
  143 |       }
  144 |       await page.keyboard.press("Escape");
  145 |       await expect(control).toBeFocused();
  146 |     }
  147 |   }
```