from pathlib import Path
from hashlib import sha256
import json,re,sys
root=Path.cwd();d=root/'evidence/runtime/g6-components-2026-10-14';b=json.loads((d/'baseline.json').read_text());sha=lambda data:sha256(data).hexdigest()
module_path=root/'scripts/g6-governance.mjs'
module_source=module_path.read_text()
expected_baseline=re.search(r'^const g6BaselineHash = "([a-f0-9]{64})";',module_source,re.M).group(1)
assert sha((d/'baseline.json').read_bytes())==expected_baseline, 'G6 baseline changed'
expected_module=re.search(r'^const g6ModuleHash = "([a-f0-9]{64})";',module_source,re.M).group(1)
normalized=re.sub(r'^const g6ModuleHash = "[a-f0-9]{64}";', 'const g6ModuleHash = "'+'0'*64+'";', module_source,count=1,flags=re.M)
assert sha(normalized.encode())==expected_module, 'G6 module body changed; review and repair its seal explicitly'
supplement_path=d/'test-fixture-supplement.json'
expected_supplement=re.search(r'^const g6TestFixtureSupplementHash = "([a-f0-9]{64})";',module_source,re.M).group(1)
assert sha(supplement_path.read_bytes())==expected_supplement, 'Test fixture supplement changed'
supplement=json.loads(supplement_path.read_text());assert set(supplement['sourceFiles'])=={'scripts/verify-tailwind-b2.test.ts'}
supplemented={}
for path,row in supplement['sourceFiles'].items():
 assert row['before']==b['protectedSources'][path] and row['beforeSnapshot']=='evidence/runtime/g6-components-2026-10-14/before/'+path
 assert sha((root/row['beforeSnapshot']).read_bytes())==row['before'], 'Supplement original changed'
 supplemented[path]=row['before']
finite_files={**b['files'],**supplemented}
for path,expected in finite_files.items():
 if expected is not None: assert sha((d/'before'/path).read_bytes())==expected, 'G6 before snapshot changed: '+path
observation_path=d/'concurrent-source-observation.json'
expected_observation=re.search(r'^const g6ConcurrentObservationHash = "([a-f0-9]{64})";',module_source,re.M).group(1)
assert sha(observation_path.read_bytes())==expected_observation, 'Concurrent observation changed'
observations=json.loads(observation_path.read_text())['sourceFiles']
assert set(observations)=={'scripts/rn14-starter.mjs','scripts/rn14-starter.test.ts'}, 'Concurrent scope expanded'
for path,expected in {**b['protectedSources'],**b['retainedEvidence']}.items():
 if path in supplemented:
  assert expected==supplemented[path]
 elif path in observations:
  observed=observations[path]
  assert path in b['protectedSources'] and observed['before']==expected
  assert observed['beforeSnapshot']=='evidence/runtime/g6-components-2026-10-14/concurrent/before/'+path
  assert sha((root/observed['beforeSnapshot']).read_bytes())==expected, 'Concurrent before changed'
  assert sha((root/path).read_bytes())==observed['after'], 'Concurrent after changed'
 else: assert sha((root/path).read_bytes())==expected, 'Protected source or old evidence changed: '+path
document_path='docs/ai/rain-designer-integration.md'
document_observation_path=d/'concurrent-document-observation.json'
expected_document_observation=re.search(r'^const g6ConcurrentDocumentObservationHash = "([a-f0-9]{64})";',module_source,re.M).group(1)
assert sha(document_observation_path.read_bytes())==expected_document_observation, 'Parallel document observation changed'
document_observation=json.loads(document_observation_path.read_text());assert set(document_observation['sourceFiles'])=={document_path}
prior_path='evidence/runtime/library-governance-closeout-2026-10-13/concurrent-document-observation-02.json'
assert document_observation['previousObservation']=={'path':prior_path,'sha256':b['retainedEvidence'][prior_path]}
document=document_observation['sourceFiles'][document_path]
assert document['before']==json.loads((root/prior_path).read_text())['sourceFiles'][document_path]['after']
assert document['beforeSnapshot']=='evidence/runtime/g6-components-2026-10-14/concurrent-document/before/'+document_path
assert sha((root/document['beforeSnapshot']).read_bytes())==document['before'], 'Parallel document before changed'
assert sha((root/document_path).read_bytes())==document['after'], 'Parallel document after changed'
before_package=json.loads((d/'before/packages/ui/package.json').read_text())
package=json.loads((root/'packages/ui/package.json').read_text())
expected_installed={**before_package,'dependencies':{**before_package['dependencies'],'input-otp':'1.4.2','embla-carousel-react':'8.5.2','@shadcn/react':'0.3.1'}}
assert package in [before_package,expected_installed], 'Unapproved package changes'
requiredNew={'scripts/g6-governance.mjs','scripts/g6-governance.test.ts'}
previous=json.loads((d/'source-bindings.json').read_text()) if (d/'source-bindings.json').exists() else {'sourceFiles':{}}
files={f:{'before':h,'after':sha((root/f).read_bytes()) if (h is not None or f in requiredNew or '--bind-new' in sys.argv or previous['sourceFiles'].get(f,{}).get('after') is not None) and (root/f).is_file() else None} for f,h in finite_files.items()}
record={'kind':'G6ComponentSourceBindings','authorizedAt':'2026-10-14','scope':b['scope'],'baseline':{'path':'evidence/runtime/g6-components-2026-10-14/baseline.json','sha256':sha((d/'baseline.json').read_bytes())},'sourceFiles':files}
for f in ['scripts/verification-helpers.mjs','scripts/g6-governance.mjs']:record['sourceFiles'][f]['after']='self'
seal=sha(json.dumps(record,ensure_ascii=False,separators=(',',':')).encode())
p=root/'scripts/g6-governance.mjs';s=p.read_text();s=re.sub(r'const g6SourceSeal = "[^"]+";',f'const g6SourceSeal = "{seal}";',s);s=re.sub(r'const g6HelperHash = "[^"]+";',f'const g6HelperHash = "{sha((root/"scripts/verification-helpers.mjs").read_bytes())}";',s);s=re.sub(r'^const g6ModuleHash = "[^"]+";',f'const g6ModuleHash = "{"0"*64}";',s,count=1,flags=re.M);h=sha(s.encode());s=s.replace('const g6ModuleHash = "'+'0'*64+'";',f'const g6ModuleHash = "{h}";',1);p.write_text(s)
for f in ['scripts/verification-helpers.mjs','scripts/g6-governance.mjs']:record['sourceFiles'][f]['after']=sha((root/f).read_bytes())
(d/'source-bindings.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
print('G6 source seal:',seal)
