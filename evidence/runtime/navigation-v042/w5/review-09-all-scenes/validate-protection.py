from pathlib import Path
import hashlib,json,subprocess,datetime
repo=Path.cwd();pack=Path('/Users/wenchengkai/CodexFile/雨课堂-shadcn组件库架构/rain-classroom-vibe-ui-spike/docs/rain-navigation-codex-workpack');ev=repo/'evidence/runtime/navigation-v042/w5/review-09-all-scenes';before=json.loads((ev/'protection-before.json').read_text())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
allowed={
'apps/playground/src/recipes/navigation-v042/'+x for x in ['platform-navigation.css','r1-r3.tsx','r1-r3.css','r2.tsx','r2.css','course-resources.tsx','r4-r6.tsx','r4-r6.css','r4-r6.test.tsx','workspace-states.tsx','workspace-states.css','workspace-states.test.tsx','README-W5.md']}
allowed|={'packages/ui/src/navigation/navigation-families.tsx','packages/ui/src/navigation/navigation-families.test.tsx','tests/e2e/navigation-v042-review07.spec.ts','docs/ai/navigation-v042-w3.md','docs/ai/navigation-v042-w5.md','status/current-phase.yaml'}
allowed|={'registry/'+x for x in ['navigation-v042.json','navigation-v042-w3.json','navigation-v042-recipes.json','navigation-v042-workspaces.json']}
allowed|={'manifests/ui/'+x+'.yaml' for x in ['navigation-list','object-navigator','segmented-control']}
allowed|={'manifests/recipes/navigation-'+x+'.yaml' for x in ['r1','r2','r3','r4','r5','r6','states']}
added_allowed={'tests/e2e/navigation-v042-review09.config.ts','tests/e2e/navigation-v042-review09.spec.ts','tests/e2e/navigation-v042-review09-r1-r3.config.ts','tests/e2e/navigation-v042-review09-r1-r3.spec.ts'}
pack_allowed={'11-设计师验收表.md','reports/CHANGELOG.md','reports/progress.json','reports/G2-composition-candidate.md'}
pack_added={'reports/G2-review-09.md'}
def audit(root,old,allowed):
 changed=[];deleted=[]
 for rel,h in old.items():
  p=root/rel
  if not p.is_file():deleted.append(rel)
  elif sha(p)!=h:changed.append(rel)
 return changed,deleted,sorted(set(changed)-allowed)
changed,deleted,unexpected=audit(repo,before['repo'],allowed)
pc,pd,pu=audit(pack,before['workpack'],pack_allowed)
files=set(subprocess.check_output(['rg','--files','--hidden','-g','!.git','-g','!node_modules'],cwd=repo,text=True).splitlines());files={x for x in files if not x.startswith('evidence/runtime/navigation-v042/w5/review-09-all-scenes/')}
new=sorted(files-set(before['repo']));newp=sorted({str(x.relative_to(pack)) for x in pack.rglob('*') if x.is_file()}-set(before['workpack']))
head=subprocess.check_output(['git','rev-parse','HEAD'],cwd=repo,text=True).strip();branch=subprocess.check_output(['git','branch','--show-current'],cwd=repo,text=True).strip()
ref=pack/'reference/approved-v0.4.2.html';ref_ok=sha(ref)=='d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c'
result={'recordedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'repoFileCountBefore':len(before['repo']),'workpackFileCountBefore':len(before['workpack']),'changedAuthorizedFiles':changed,'changedAuthorizedWorkpackFiles':pc,'addedAuthorizedFiles':new,'addedAuthorizedWorkpackFiles':newp,'unexpectedChanged':unexpected,'deleted':deleted,'workpackUnexpectedChanged':pu,'workpackDeleted':pd,'unexpectedAdded':sorted(set(new)-added_allowed),'workpackUnexpectedAdded':sorted(set(newp)-pack_added),'headUnchanged':head==before['head'],'branchUnchanged':branch==before['branch'],'allOldEvidenceUnchanged':not any(x.startswith('evidence/') for x in changed+deleted),'frozenReferenceUnchanged':ref_ok,'gateBoundary':'historical accepted G1 remains; G2/G3 pending; W6-W8 not complete'}
okay=not any(result[k] for k in ['unexpectedChanged','deleted','workpackUnexpectedChanged','workpackDeleted','unexpectedAdded','workpackUnexpectedAdded']) and all(result[k] for k in ['headUnchanged','branchUnchanged','allOldEvidenceUnchanged','frozenReferenceUnchanged'])
result['status']='passed' if okay else 'failed';(ev/'protection-final.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False,indent=2));assert okay
