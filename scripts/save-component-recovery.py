"""Save a finite local recovery package. Does not change Git, restore, or publish."""
import datetime, hashlib, io, json, pathlib, subprocess, sys, tarfile
root=pathlib.Path.cwd(); destination=pathlib.Path(sys.argv[1]).resolve()
if destination.exists(): raise SystemExit('Recovery target must not exist')
destination.mkdir(parents=True)
def git(*args): return subprocess.check_output(['git',*args],cwd=root)
paths=set(p.decode() for p in git('diff','HEAD','--name-only','-z').split(b'\0') if p)
paths.update(p.decode() for p in git('ls-files','--others','--exclude-standard','-z').split(b'\0') if p)
initial=json.loads((root/'evidence/runtime/component-implementation-2026-10-18/run-01/baseline/existing-files.sha256.json').read_text())
paths.update(initial)
manifest={'version':1,'root':str(root),'head':git('rev-parse','HEAD').decode().strip(),'startedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'files':{},'missing':[],'originalEvidenceFiles':0,'notAtomic':True}
with tarfile.open(destination/'working-files.tar.gz','w:gz') as archive:
 for path in sorted(paths):
  file=root/path
  if not file.exists(): manifest['missing'].append(path); continue
  if file.is_symlink(): raise SystemExit('Review symlink before recovery archive: '+path)
  if not file.is_file(): raise SystemExit('Non-file in finite scope: '+path)
  data=file.read_bytes(); digest=hashlib.sha256(data).hexdigest()
  if path.startswith('evidence/') and path in initial:
   if digest!=initial[path]: raise SystemExit('Original evidence changed: '+path)
   manifest['originalEvidenceFiles']+=1
  item=tarfile.TarInfo(path); item.size=len(data); item.mode=file.stat().st_mode & 0o777
  archive.addfile(item,io.BytesIO(data))
  manifest['files'][path]={'sha256':digest,'size':len(data),'mode':item.mode,'existedAtStart':path in initial}
manifest['changedSinceRead']=[p for p,v in manifest['files'].items() if not (root/p).exists() or hashlib.sha256((root/p).read_bytes()).hexdigest()!=v['sha256']]
manifest['endedAt']=datetime.datetime.now(datetime.timezone.utc).isoformat()
(destination/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
(destination/'index.patch').write_bytes(git('diff','--cached','--binary'))
(destination/'working.patch').write_bytes(git('diff','--binary'))
(destination/'status.txt').write_bytes(git('status','--porcelain=v1','-uall'))
with tarfile.open(destination/'working-files.tar.gz') as archive:
 for member in archive.getmembers():
  assert hashlib.sha256(archive.extractfile(member).read()).hexdigest()==manifest['files'][member.name]['sha256']
checks={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in destination.iterdir() if p.is_file()}
(destination/'SHA256.json').write_text(json.dumps(checks,indent=2)+'\n')
(destination/'README.md').write_text('''# 本地阶段恢复点\n\n仅本地保存，未提交、推送或发布。manifest.json 逐文件记录归档实际内容哈希、模式、缺失路径和开工来源；SHA256.json 可校验归档及清单。文件可能在并行实施中先后读取，changedSinceRead 明确期间变化；此包是恢复材料，不冒充固定测试候选。\n\n推荐恢复到新的空工作区：先从 manifest.head 建立本地 Git checkout（保留原工作区），验证归档 SHA256，再将 working-files.tar.gz 解到新工作区，按 manifest.missing 删除新工作区对应路径。逐项核验 manifest.files 哈希。index.patch/working.patch 仅供审阅或恢复暂存边界；归档已含实际工作文件，不重复应用差异。依赖按原锁文件安装。\n\n恢复到开工状态：在另一新基准 checkout 中，使用归档内 baseline/existing-source-files.tar.gz 恢复68个既有源码文件，originalEvidenceFiles 对应的既有证据由本包按初始SHA核验后保存；baseline/user-working.patch 仅供对照。不要在当前工作区直接 git reset/clean 或覆盖用户后续改动。\n\n本包只含 HEAD 之外的有限差异与全部本批新产物；未改的 Git 文件来自所记HEAD，node_modules、服务进程、外部Starter导出目录不在本包内。外部导出有各自source-lock，可保留或重新导出到新路径。失败记录和历史接受不被恢复操作改写。\n''')
print(json.dumps({'destination':str(destination),'files':len(manifest['files']),'originalEvidenceFiles':manifest['originalEvidenceFiles'],'archiveSHA256':checks['working-files.tar.gz'],'changedDuringCapture':manifest['changedSinceRead']},ensure_ascii=False))
