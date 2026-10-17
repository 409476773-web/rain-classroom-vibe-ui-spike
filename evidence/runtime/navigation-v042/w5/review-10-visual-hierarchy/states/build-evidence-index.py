from pathlib import Path
from datetime import datetime,timezone
import json,hashlib,struct,shutil
from PIL import Image,ImageDraw
repo=Path('/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/.worktrees/card-v2');base=repo/'evidence/runtime/navigation-v042/w5/review-10-visual-hierarchy/states'
names=['before-2026-10-03T09-08-11-528Z','after-2026-10-03T09-15-23-511Z','after-final-2026-10-03T09-17-20-988Z','after-retry-2026-10-03T09-18-59-214Z','supplement-2026-10-03T09-20-41-643Z','supplement-2026-10-03T09-21-17-249Z']
runs={name:json.loads((base/name/'audit.json').read_text()) for name in names};before={c['id']:(names[0],c) for c in runs[names[0]]['cases']};after={};supp={}
for name in names[2:4]:
 for c in runs[name]['cases']:
  if not c.get('failure'):after[c['id']]=(name,c)
for name in names[4:]:
 for c in runs[name]['cases']:
  if not c.get('failure'):supp[c['id']]=(name,c)
assert len(before)==len(after)==28 and len(supp)==8
source={f:hashlib.sha256((repo/'apps/playground/src/recipes/navigation-v042'/f).read_bytes()).hexdigest() for f in ['workspace-states.tsx','workspace-states.css']}
assert all(d['sourceStable'] for d in runs.values());assert all(d['sourceAfter']==source for k,d in runs.items() if k!=names[0])
geometry=[];roles=[];cases=[];assets={}
for id,(br,b) in before.items():
 ar,a=after[id]
 local=[]
 for sect in ['root','default','s5','menu']:
  bd=b if sect=='root' else b.get(sect,{})
  ad=a if sect=='root' else a.get(sect,{})
  pairs=[('root',bd['root'],ad['root'])] if sect=='root' else [(k,v,ad[k]) for k,v in bd.items() if isinstance(v,dict) and 'rect' in v and k in ad]
  for k,v,w in pairs:
   if sect=='s5' and k=='contextPin' and v.get('name')!=w.get('name'):w=ad['platformExpand']
   delta={dim:round(w['rect'][dim]-v['rect'][dim],6) for dim in ['x','y','width','height']}
   item={'case':id,'selectorRole':sect+'.'+k,'delta':delta,'sameRect':not any(delta.values())}
   if sect=='s5' or sect=='root' or (sect=='default' and k in ['restorebar','identity','subtitle']):assert item['sameRect'],item
   if not item['sameRect']:geometry.append(item)
   local.append(item)
 if a['scene']=='S5':
  for key in ['primaryTitle','body','fieldLabel','currentNav']:
   assert a['s5'][key]['color']==b['s5'][key]['color']
   roles.append({'case':id,'role':key,'before':b['s5'][key]['color'],'after':a['s5'][key]['color'],'assertion':'unchanged-primary-or-contextual-color','pass':True})
  for key,col in [('contextMeta','rgb(116, 133, 168)'),('contextGroup','rgb(116, 133, 168)'),('eyebrow','rgb(116, 133, 168)'),('footer','rgb(160, 172, 197)'),('demo','rgb(160, 172, 197)'),('ribbonHint','rgb(160, 172, 197)')]:
   assert a['s5'][key]['color']==col
   roles.append({'case':id,'role':key,'before':b['s5'][key]['color'],'after':col,'assertion':'role-specific-existing-token','pass':True})
  for key in ['ribbonClose','notification']:
   expected='rgb(132, 144, 181)' if a['inverse'] and key=='notification' else 'rgb(150, 163, 193)'
   assert a['s5'][key]['iconColor']==expected and a['s5'][key]['radius']=='6px'
   roles.append({'case':id,'role':key,'before':b['s5'][key]['iconColor'],'after':expected,'assertion':'actual-svg-Icon4-and-radius6','pass':True})
 for key in ['reset','hide']:
  assert a['menu'][key]['color']=='rgb(73, 93, 135)' and a['menu'][key]['borderColor']=='rgba(16, 63, 183, 0.1)' and a['menu'][key]['radius']=='6px'
  assert a['menu'][key]['rect']['width']==b['menu'][key]['rect']['width'] and a['menu'][key]['rect']['height']==b['menu'][key]['rect']['height']
  roles.append({'case':id,'role':'menu.'+key,'before':b['menu'][key]['color'],'after':a['menu'][key]['color'],'assertion':'tertiary-neutral-Text3-Border4-radius6-and-original-size','pass':True})
 cases.append({'id':id,'beforeAudit':str((base/br/'audit.json').relative_to(repo)),'afterAudit':str((base/ar/'audit.json').relative_to(repo)),'beforeScreens':b['screens'],'afterScreens':a['screens'],'checks':a['checks'],'geometry':local})
for id,(name,c) in supp.items():
 assert not c.get('failure') and all(x['pass'] for x in c['checks'])
for name in set(ar for ar,_ in after.values()):
 usedIds={i for i,(ar,_) in after.items() if ar==name}
 assert not any(e['id'] in usedIds for e in runs[name]['pageErrors']+runs[name]['consoleErrors'])
for name,c in list(before.values())+list(after.values())+list(supp.values()):
 for raw in c['screens']:
  p=Path(raw);blob=p.read_bytes();assert blob[:8]==b'\x89PNG\r\n\x1a\n';width,height=struct.unpack('>II',blob[16:24]);assets[str(p.relative_to(repo))]={'path':str(p),'width':width,'height':height,'bytes':len(blob),'sha256':hashlib.sha256(blob).hexdigest()}
comparison=[]
for id,suffix in [('S5-interaction-1440-light','default'),('S5-interaction-1200-inverse','default'),('S1-interaction-1440-light','layout-menu')]:
 br,b=before[id];ar,a=after[id];paths=[next(x for x in c['screens'] if x.endswith('-'+suffix+'.png')) for c in [b,a]];ims=[Image.open(p).convert('RGB') for p in paths];gap=20;bar=34
 canvas=Image.new('RGB',(sum(i.width for i in ims)+gap,max(i.height for i in ims)+bar),'#EDF0F5');draw=ImageDraw.Draw(canvas);draw.text((12,10),'BEFORE - Review09 candidate',fill='#495D87');draw.text((ims[0].width+gap+12,10),'AFTER - Review10 role hierarchy',fill='#495D87');canvas.paste(ims[0],(0,bar));canvas.paste(ims[1],(ims[0].width+gap,bar));p=base/(id+'-'+suffix+'-before-after.png');assert not p.exists();canvas.save(p);comparison.append(str(p));blob=p.read_bytes();assets[str(p.relative_to(repo))]={'path':str(p),'width':canvas.width,'height':canvas.height,'bytes':len(blob),'sha256':hashlib.sha256(blob).hexdigest()}
unit=base/'unit-2026-10-03T09-15-24-879Z.json';u=json.loads(unit.read_text());assert u['success'] and u['numPassedTests']==14
for src,dest in [('/private/tmp/rain-review10-states.mjs','capture-states.mjs'),('/private/tmp/rain-review10-states-supplement.mjs','capture-supplement.mjs'),('/private/tmp/rain-review10-state-index.py','build-evidence-index.py')]:shutil.copyfile(src,base/dest)
index={'kind':'Review10-local-state-wrapper-hierarchy-evidence','createdAt':datetime.now(timezone.utc).isoformat(),'scope':['workspace-states.tsx','workspace-states.css'],'sourceLock':source,'beforeSourceLock':runs[names[0]]['sourceBefore'],'canonicalCaseCount':28,'supplementCaseCount':8,'beforeInteractionChecks':sum(len(c['checks']) for _,c in before.values()),'afterInteractionChecks':sum(len(c['checks']) for _,c in after.values())+sum(len(c['checks']) for _,c in supp.values()),'roleAssertionCount':len(roles),'roleAssertions':roles,'unit':{'path':str(unit),'passed':14,'failed':0},'cases':cases,'supplement':[{'audit':str(base/n/'audit.json'),'case':c} for n,c in supp.values()],'assets':list(assets.values()),'assetCount':len(assets),'comparisons':comparison,'geometryDrifts':geometry,'geometryConclusion':'All state root/RestoreBar/identity/subtitle boxes and all S5 measured rectangles are unchanged. Eight-pixel focus width and corresponding menu anchor shifts in inherited R1/R3 scenes accompany parallel host-reset cleanup; standalone S5 remains 88px. Menu action sizes remain98/126x32.','integrationAttempts':[{'audit':str(base/n/'audit.json'),'errors':d['pageErrors'],'failedCases':[{'id':c['id'],'failure':c['failure']} for c in d['cases'] if c.get('failure')]} for n,d in runs.items() if d['pageErrors'] or any(c.get('failure') for c in d['cases'])],'measurementCorrection':'The before script contextPin key selected first pane helper (platform expand); comparisons resolve after platformExpand explicitly when names differ. The raw before record is unchanged.', 'knownAttemptResolution':{'localRecipePrefix':'Intermediate R2 candidate token alias caused first4 page failures; root corrected candidateTokens=[]; identical own source targeted repeats pass.','strictLocator':'Supplement targeted selector matched both context region and splitter; script corrected to .rain-workspace__region; only twoS5 repeats required.'},'canonicalRuntimeErrors':0,'sourceStable':True,'humanVisualApproval':'pending-review','frozenApprovedHTML':'untouched; this evidence compares Review09 candidate to local Review10 hierarchy correction, not a new46-case reference acceptance'}
p=base/'review-evidence-index.json';assert not p.exists();p.write_text(json.dumps(index,ensure_ascii=False,indent=2));print(p);print(json.dumps({'cases':len(cases),'supplement':len(supp),'beforeChecks':index['beforeInteractionChecks'],'afterChecks':index['afterInteractionChecks'],'roleAssertions':len(roles),'assets':len(assets),'geometryDrifts':len(geometry),'source':source},ensure_ascii=False))
