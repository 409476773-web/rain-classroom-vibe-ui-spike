from pathlib import Path
import hashlib,json,subprocess,datetime
repo=Path.cwd();out=repo/'evidence/runtime/navigation-v042/w5/review-10-visual-hierarchy'
before=json.loads((out/'protection-before.json').read_text());pack=Path(before['pack'])
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
allowed={'apps/playground/src/recipes/navigation-v042/'+x for x in ['r1-r3.tsx','r1-r3.css','r2.tsx','r2.css','r4-r6.tsx','r4-r6.css','workspace-states.tsx','workspace-states.css','README-W5.md']}
allowed|={'apps/playground/src/docs/components/navigation-v042-page.css','tests/e2e/navigation-v042-review09.spec.ts','docs/ai/navigation-v042-w3.md','docs/ai/navigation-v042-w5.md','status/current-phase.yaml'}
allowed|={'registry/'+x for x in ['navigation-v042.json','navigation-v042-w3.json','navigation-v042-recipes.json','navigation-v042-workspaces.json']}
allowed|={'manifests/recipes/navigation-'+x+'.yaml' for x in ['r1','r2','r3','r4','r5','r6','states']}
added={'tests/e2e/navigation-v042-review10.config.ts','tests/e2e/navigation-v042-review10.spec.ts'}
pack_allowed={'11-设计师验收表.md','reports/CHANGELOG.md','reports/progress.json','reports/G2-composition-candidate.md'}
def audit(root,old,allow):
 changed=[];deleted=[]
 for rel,h in old.items():
  p=root/rel
  if not p.is_file():deleted.append(rel)
  elif sha(p)!=h:changed.append(rel)
 return changed,deleted,sorted(set(changed)-allow)
changed,deleted,unexpected=audit(repo,before['repoFiles'],allowed)
pc,pd,pu=audit(pack,before['packFiles'],pack_allowed)
names=set(subprocess.check_output(['rg','--files','--hidden','-g','!.git','-g','!node_modules'],text=True).splitlines());names={n for n in names if not n.startswith('evidence/runtime/navigation-v042/w5/review-10-visual-hierarchy/')}
new=sorted(names-set(before['repoFiles']));newp=sorted({str(p.relative_to(pack)) for p in pack.rglob('*') if p.is_file()}-set(before['packFiles']))
head=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip();branch=subprocess.check_output(['git','branch','--show-current'],text=True).strip()
progress=json.loads((pack/'reports/progress.json').read_text())
gates={'G1':'accepted','G2':'pending-human','G3':'pending-human'}
result={'recordedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'repoFilesBefore':len(before['repoFiles']),'workpackFilesBefore':len(before['packFiles']),'authorizedChangedFiles':changed,'authorizedChangedWorkpackFiles':pc,'authorizedAddedFiles':new,'authorizedAddedWorkpackFiles':newp,'unexpectedChanged':unexpected,'deleted':deleted,'workpackUnexpectedChanged':pu,'workpackDeleted':pd,'unexpectedAdded':sorted(set(new)-added),'workpackUnexpectedAdded':sorted(set(newp)-{'reports/G2-review-10.md'}),'headUnchanged':head==before['head'],'branchUnchanged':branch==before['branch'],'allOldEvidenceUnchanged':not any(x.startswith('evidence/') for x in changed+deleted),'frozenReferenceUnchanged':sha(pack/'reference/approved-v0.4.2.html')=='d2574eaae899bb48b7a3201914861d27b23e0bc58a05bf1a75898eba697dd03c','gatesUnchanged':progress['gates']==gates and progress['gateDecisions']['G1']['scope']=='A1+A4+R2-runtime-visual-only','sharedAndFoundationSourceUnchanged':not any(x.startswith('packages/') for x in changed+deleted),'mode':'System Mode scoped local candidate, no publication/Git/Figma/W6-W8 completion'}
bad=['unexpectedChanged','deleted','workpackUnexpectedChanged','workpackDeleted','unexpectedAdded','workpackUnexpectedAdded'];good=['headUnchanged','branchUnchanged','allOldEvidenceUnchanged','frozenReferenceUnchanged','gatesUnchanged','sharedAndFoundationSourceUnchanged']
okay=not any(result[k] for k in bad) and all(result[k] for k in good);result['status']='passed' if okay else 'failed'
(out/'protection-final.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False,indent=2));assert okay
