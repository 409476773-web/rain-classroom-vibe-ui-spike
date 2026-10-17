"""One ephemeral read-only native review; source/rubric remain outside the reviewer root."""
import hashlib,json,queue,subprocess,sys,threading,time
from pathlib import Path
cli='/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex'
ctx=Path(sys.argv[1]).resolve(); out=Path(sys.argv[2]).resolve(); prompt=Path(sys.argv[3]).read_text()
images=[Path(p).resolve() for p in sys.argv[4:]]
assert ctx.is_dir() and images and all(p.is_file() for p in images)
out.mkdir(parents=True,exist_ok=False)
raw=out/'events.jsonl'; messages=[]; sent=[]; q=queue.Queue(); started=time.monotonic()
err=(out/'stderr.log').open('w')
p=subprocess.Popen([cli,'app-server','--stdio'],stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=err,text=True,cwd=ctx,bufsize=1)
def listen():
 for line in p.stdout:
  try:q.put(json.loads(line))
  except json.JSONDecodeError: pass
 q.put(None)
threading.Thread(target=listen,daemon=True).start()
def send(method,params,rid=None):
 v={'method':method,'params':params}
 if rid is not None:v['id']=rid
 sent.append(v);p.stdin.write(json.dumps(v,ensure_ascii=False)+'\n');p.stdin.flush()
def receive():
 remain=480-(time.monotonic()-started)
 if remain<=0:raise TimeoutError('native review deadline')
 v=q.get(timeout=min(remain,20))
 if v is None:raise RuntimeError('app server ended')
 messages.append(v)
 with raw.open('a') as f:f.write(json.dumps(v,ensure_ascii=False)+'\n')
 if 'id' in v and 'method' in v:
  p.stdin.write(json.dumps({'id':v['id'],'error':{'code':-32601,'message':'No approval or external request is authorized in this read-only review'}})+'\n');p.stdin.flush()
 return v
def rpc(method,params,rid):
 send(method,params,rid)
 while True:
  try:v=receive()
  except queue.Empty:continue
  if v.get('id')==rid:
   if 'error' in v:raise RuntimeError(v['error'])
   return v['result']
summary={'cwd':str(ctx),'images':[{'name':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in images],'skillSha256':hashlib.sha256((ctx/'.agents/skills/rain-designer/SKILL.md').read_bytes()).hexdigest(),'promptSha256':hashlib.sha256(prompt.encode()).hexdigest(),'status':'starting'}
try:
 rpc('initialize',{'clientInfo':{'name':'rain_designer_execution_comparison','version':'1.0'},'capabilities':{'experimentalApi':True}},1)
 send('initialized',{})
 discovery=rpc('skills/list',{'cwds':[str(ctx)],'forceReload':True},2)
 (out/'discovery.json').write_text(json.dumps(discovery,ensure_ascii=False,indent=2))
 t=rpc('thread/start',{'cwd':str(ctx),'ephemeral':True,'sandbox':'read-only','approvalPolicy':'never'},3)
 tid=t['thread']['id'];summary.update(threadId=tid,threadPath=t['thread'].get('path'),model=t.get('model'),reasoningEffort=t.get('reasoningEffort'),modelProvider=t.get('modelProvider'),threadSettings={k:t.get(k) for k in ['approvalPolicy','sandbox','reasoningEffort']})
 inputs=[{'type':'text','text':prompt},{'type':'skill','name':'rain-designer','path':str(ctx/'.agents/skills/rain-designer/SKILL.md')},*[{'type':'localImage','path':str(p)} for p in images]]
 turn=rpc('turn/start',{'threadId':tid,'input':inputs,'sandboxPolicy':{'type':'readOnly','networkAccess':False},'approvalPolicy':'never'},4)
 summary['turnId']=turn['turn']['id']
 print(json.dumps({'state':'reviewing','model':summary['model'],'effort':summary['reasoningEffort'],'threadId':tid}),flush=True)
 while True:
  try:v=receive()
  except queue.Empty:continue
  if v.get('method')=='turn/completed' and v['params'].get('threadId')==tid and v['params']['turn']['id']==summary['turnId']:
   summary['status']=v['params']['turn']['status'];summary['turnError']=v['params']['turn'].get('error');break
 completed=[v['params']['item'] for v in messages if v.get('method')=='item/completed' and v['params'].get('threadId')==tid and v['params'].get('turnId')==summary['turnId']]
 all_completed=[v['params']['item'] for v in messages if v.get('method')=='item/completed']
 summary['allThreadFileChanges']=[v for v in all_completed if v.get('type')=='fileChange']
 summary['allThreadMcpCalls']=[v for v in all_completed if v.get('type')=='mcpToolCall']
 agents=[v for v in completed if v.get('type')=='agentMessage']
 final=[v.get('text','') for v in agents if v.get('phase')=='final_answer']
 if not final and agents:final=[agents[-1].get('text','')]
 (out/'review.md').write_text('\n\n'.join(final)+'\n')
 (out/'completed-items.json').write_text(json.dumps(completed,ensure_ascii=False,indent=2))
 summary['completedItemTypes']=[v.get('type') for v in completed];summary['finalChars']=sum(map(len,final))
 summary['fileChanges']=[v for v in completed if v.get('type')=='fileChange'];summary['mcpCalls']=[v for v in completed if v.get('type')=='mcpToolCall']
 send('thread/unsubscribe',{'threadId':tid},99)
except (Exception,KeyboardInterrupt) as e:summary.update(status='runner-error',error=repr(e))
finally:
 try:p.stdin.close();p.wait(timeout=8)
 except subprocess.TimeoutExpired:p.terminate();p.wait(timeout=8)
 err.close();summary['processExitCode']=p.returncode;summary['elapsedSeconds']=round(time.monotonic()-started,2)
 (out/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n');(out/'requests.json').write_text(json.dumps(sent,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps(summary,ensure_ascii=False),flush=True)
if summary['status']!='completed':sys.exit(1)
