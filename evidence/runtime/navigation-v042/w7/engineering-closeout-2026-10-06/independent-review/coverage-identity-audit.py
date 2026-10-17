import json,hashlib
from pathlib import Path
base=Path(__file__).resolve().parents[1]
record=json.loads((base/'browser-current-coverage.json').read_text())
def flatten(d,source):
 rows=[]
 def walk(s,path):
  path=path+[s['title']]
  for spec in s.get('specs',[]):
   for test in spec.get('tests',[]):
    rows.append({'project':test['projectId'],'file':spec['file'],'suite':path,'title':spec['title'],'status':test['status'],'lastResult':source,'runs':test['results'],'expectedStatus':test['expectedStatus'],'annotations':test.get('annotations',[])})
  for child in s.get('suites',[]):walk(child,path)
 for suite in d.get('suites',[]):walk(suite,[])
 return rows
def key(row):return (row['project'],row['file'],tuple(row['suite']),row['title'])
def read_run(pointer):
 raw=(base/pointer['result']).read_bytes();assert hashlib.sha256(raw).hexdigest()==pointer['sha256']
 d=json.loads(raw);rows=flatten(d,pointer['result']);assert len(rows)==pointer['cases'];assert len({key(row) for row in rows})==len(rows);assert len(d.get('errors',[]))==pointer['nonTestErrors']==0
 counts={state:sum(row['status']==state for row in rows) for state in ['expected','unexpected','skipped','flaky']}
 assert all(d['stats'][state]==value for state,value in counts.items())
 for row in rows:
  last=row['runs'][-1]
  if row['status']=='expected':
   assert last['status']==row['expectedStatus']
   if last['status']=='passed':assert not last.get('errors')
   else:assert row['expectedStatus']=='failed' and any(a.get('type')=='fail' for a in row['annotations'])
  elif row['status']=='skipped':assert last['status']=='skipped'
  elif row['status']=='unexpected':assert last['status'] in ['failed','timedOut','interrupted'] and last.get('errors')
 return d,rows
initial,rows=read_run(record['singleFullRun']);before={key(row):row for row in rows};current=before.copy();runs=[]
for pointer in record['repairRuns']:
 d,repair=read_run(pointer);assert all(key(row) in before for row in repair)
 assert d['stats']['startTime']>=initial['stats']['startTime']
 for row in repair:current[key(row)]=row
 runs.append({'result':pointer['result'],'cases':len(repair),'allSubsetOfOriginal':True})
counts={state:sum(row['status']==state for row in current.values()) for state in ['expected','unexpected','skipped']}
assert counts==record['combinedCoverage']['playwrightStatusBuckets'];assert len(before)==len(current)==record['discoveredCases']==737
originalFail={k for k,row in before.items() if row['status']=='unexpected'}
resolved={k for k in originalFail if current[k]['status']=='expected'}
assert len(originalFail)==14 and len(resolved)==13
assert resolved=={key(row) for row in record['resolvedOriginalUnexpectedFailures']}
assert {k for k,row in current.items() if row['status']=='unexpected'}=={key(row) for row in record['remainingUnexpectedFailures']}
assert {k for k,row in current.items() if row['status']=='skipped'}=={key(row) for row in record['captureOnlySkipped']}
assert {k for k,row in before.items() if row['status']=='skipped'}=={k for k,row in current.items() if row['status']=='skipped'}
assert all('capture' in row['title'] for row in record['captureOnlySkipped'])
assert not record['acceptedSourceChanged'] and not record['isSingleFreshFullGreenRun']
assert all('candidate' not in row['lastResult'] for row in current.values())
expectedFailures=[{k:v for k,v in row.items() if k not in ['runs','annotations']} for row in current.values() if row['status']=='expected' and row['expectedStatus']=='failed']
assert len(expectedFailures)==2
assert {key(r) for r in expectedFailures}=={k for k,r in before.items() if r['status']=='expected' and r['expectedStatus']=='failed'}
assert {key(r) for r in expectedFailures}=={key(r) for r in record['preExistingExpectedFailures']}
assert record['combinedCoverage']['actualPassed']==counts['expected']-len(expectedFailures)==732
assert record['combinedCoverage']['unexpectedFailed']==counts['unexpected']==1
assert record['combinedCoverage']['preExistingExpectedFailures']==len(expectedFailures)==2
assert record['combinedCoverage']['captureOnlySkipped']==counts['skipped']==2
for field in ['resolvedOriginalUnexpectedFailures','remainingUnexpectedFailures','preExistingExpectedFailures','captureOnlySkipped']:
 for row in record[field]:
  raw=current[key(row)]
  assert row['status']==raw['status'] and row['expectedStatus']==raw['expectedStatus']
  assert row['actualStatus']==raw['runs'][-1]['status'] and row['lastResult']==raw['lastResult']
remaining=[{k:v for k,v in row.items() if k not in ['runs','annotations']} for row in current.values() if row['status']=='unexpected']
print(json.dumps({'recordSha256':hashlib.sha256((base/'browser-current-coverage.json').read_bytes()).hexdigest(),'independentMergedCoverage':counts,'actualFinalPassed':counts['expected']-len(expectedFailures),'unchangedDeclaredExpectedFailures':expectedFailures,'originalIdentities':len(before),'retainedIdentities':len(current),'originalFailures':len(originalFail),'actuallyResolvedOriginalFailures':len(resolved),'duplicateIdentities':0,'unknownRepairIdentities':0,'originalCaptureSkipsUnchanged':True,'candidateResultsExcluded':True,'repairRuns':runs,'remaining':remaining,'singleFreshFullGreenRun':False},ensure_ascii=False,indent=2))
