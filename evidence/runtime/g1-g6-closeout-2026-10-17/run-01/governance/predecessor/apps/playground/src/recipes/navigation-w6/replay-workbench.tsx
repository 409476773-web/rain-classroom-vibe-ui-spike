import { useEffect, useId, useState } from 'react';
import { Button, ObjectNavigator, Tag, Textarea } from '@rain-next/ui';
import { PaneSplitter, RecoverableRegion, RegionRestoreTrigger, WorkspaceLayout, useWorkspaceLayout } from '@rain-next/layouts';
import { PlayTriangleIcon } from '@rain-next/ui/icons/play-triangle';
import { PauseTriangleIcon } from '@rain-next/ui/icons/pause-triangle';
import { ArrowRightForwardIcon } from '@rain-next/ui/icons/arrow-right-forward';
import { EditPencilIcon } from '@rain-next/ui/icons/edit-pencil';
import { ActiveSessionGuard } from './active-session-guard';
import { Toolbar, sideRegion, workspaceSpec, type WidthProps } from './workbench-parts';
import './replay-workbench.css';

// Page-private mock playback; the public workspace manages layout, never media or notes.
const replaySpec = workspaceSpec('replay', 'E4', [sideRegion('knowledge-index', '知识索引', 'end', 280, 'hidden')], 500);
const transcript = [
  { id: 'intro', seconds: 0, time: '00:00', label: '提出研究问题', category: '研究问题', text: '今天我们通过校园微气候调查，学习如何把观察转化为能够验证的研究问题。', detail: '从“广场为什么更热”开始，把场地观察转化为可比较的变量。一个好的研究问题，应当能说明比较什么、记录什么，以及怎样判断结果。', takeaway: '先明确研究问题，再选择测量方法。' },
  { id: 'evidence', seconds: 75, time: '01:15', label: '从观察寻找证据', category: '证据采集', text: '同一时间采样很重要。需要比较三个位置，并保持测量工具与高度一致。', detail: '比较广场、林荫道与建筑阴影下的地表温度。每次采样保留场地、时刻、设备和测量高度，使用重复测量减少偶然误差。', takeaway: '一条测量记录，应当能追溯到采样条件。' },
  { id: 'variables', seconds: 130, time: '02:10', label: '控制变量', category: '实验设计', text: '请区分自变量、因变量与控制变量。测量时记录风速、湿度与遮阴条件。', detail: '遮阴覆盖率是本次比较的自变量，地表温度是因变量。测量时间、设备和高度保持一致；风速、湿度和材质差异另行记录，避免把其他影响当作遮阴效果。', takeaway: '保持采样口径一致，记录无法控制的条件。' },
  { id: 'conclusion', seconds: 240, time: '04:00', label: '解释结果与局限', category: '结果解释', text: '结论需要由证据支持。异常值不应直接删除，而应记录可能的原因与后续验证方法。', detail: '比较各场地的平均值与重复测量结果，再判断证据是否支持原假设。样本较少或材质不同，都会限制解释范围；对异常记录应说明原因并安排后续验证。', takeaway: '区分数据支持的结论与仍待验证的推测。' },
];
const duration = 300;
const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
function ReplayRecovery() {
  const { state, dispatch, viewportWidth } = useWorkspaceLayout(), temporary = state.session.temporary?.regionId === 'knowledge-index';
  return <><RegionRestoreTrigger regionId="knowledge-index" intent="peek" aria-label={temporary ? '关闭临时知识索引' : '临时查看知识索引'}>{temporary ? '关闭知识索引' : '知识索引'}</RegionRestoreTrigger>
    {temporary && <Button data-workspace-action="pin" variant="tertiary" size="small" onClick={() => dispatch({ type: 'PIN_TEMP', regionId: 'knowledge-index', viewportWidth })}>固定知识索引</Button>}</>;
}

export function ReplayWorkbench({ viewportWidth, active = true }: WidthProps = {}) {
  const instanceId = useId(), progressId = `${instanceId}-progress`, notesId = `${instanceId}-notes`;
  const [seconds, setSeconds] = useState(0), [playing, setPlaying] = useState(false), [notes, setNotes] = useState('');
  const current = [...transcript].reverse().find(point => seconds >= point.seconds)!;
  const selected = current.id;
  const seek = (id: string) => setSeconds(transcript.find(point => point.id === id)!.seconds);
  useEffect(() => {
    if (!active) setPlaying(false);
    if (!playing || !active) return;
    const timer = window.setInterval(() => setSeconds(value => Math.min(duration, value + 1)), 1000);
    return () => window.clearInterval(timer);
  }, [active, playing]);
  useEffect(() => { if (seconds === duration) setPlaying(false); }, [seconds]);
  const togglePlay = () => { if (!playing && seconds === duration) setSeconds(0); setPlaying(value => !value); };
  return <WorkspaceLayout spec={replaySpec} viewportWidth={viewportWidth} className="w6-workspace w6-replay-workspace" data-rain-id-consumer="local-navigation-w6-e4"
    toolbar={<Toolbar title="校园微气候调查 · 课堂回放" regions={[]}><ReplayRecovery /></Toolbar>}>
    <ActiveSessionGuard active={active} />
    <article className="w6-main w6-replay-main">
      <header className="w6-replay-course-heading"><div><p>跨学科项目课 / 调查方法</p><h1>从校园观察到研究设计</h1></div><div className="w6-replay-course-meta"><Tag size={20} color="courseware">课堂回放</Tag><span>05:00<span aria-hidden="true" />4 个章节</span></div></header>
      <section className="w6-replay-media" aria-label="模拟课堂媒体">
        <div className="w6-replay-board-top"><span>课堂板书 · 微气候与控制变量</span><Tag size={20} color="neutral">模拟画面</Tag></div>
        <div className="w6-replay-board">
          <div className="w6-replay-board-problem"><p>研究问题</p><h2>一片树荫，如何改变地表温度？</h2><div className="w6-replay-variable-flow"><div><span>自变量</span><strong>遮阴覆盖率</strong></div><ArrowRightForwardIcon aria-hidden="true" /><div><span>因变量</span><strong>地表温度</strong></div></div>
            <div className="w6-replay-conditions"><span>保持一致</span><Tag size={20} color="neutral">测量时刻</Tag><Tag size={20} color="neutral">设备</Tag><Tag size={20} color="neutral">离地高度</Tag></div>
          </div>
          <figure className="w6-replay-samples"><figcaption>三处场地的采样对照 <span>示意数据</span></figcaption><div className="w6-replay-sample-header"><span>场地</span><span>地表温度</span></div>
            {[['广场', '40.4'], ['林荫道', '34.1'], ['建筑阴影', '31.6']].map(([place, temperature]) => <div className="w6-replay-sample" key={place}><span>{place}</span><strong>{temperature}<small> °C</small></strong></div>)}
            <p>同一时段 · 同一设备 · 每处重复测量 3 次</p>
          </figure>
        </div>
        <div className="w6-replay-media-caption"><span>当前章节</span><strong>{current.label}</strong><time>{current.time}</time></div>
      </section>
      <div className="w6-replay-controls"><Button variant="tertiary" size="small" leadingIcon={playing ? <PauseTriangleIcon /> : <PlayTriangleIcon />} onClick={togglePlay}>{playing ? '暂停回放' : '播放回放'}</Button><div className="w6-replay-progress"><label className="w6-replay-sr" htmlFor={progressId}>回放进度</label><input id={progressId} type="range" min={0} max={duration} step={1} value={seconds} aria-label="回放进度" aria-valuetext={`${formatTime(seconds)} / 05:00`} onChange={event => setSeconds(Number(event.target.value))} /></div><div className="w6-replay-time"><strong data-testid="playback-time" aria-label="当前模拟播放时间">{formatTime(seconds)}</strong><span>/ 05:00</span></div><Button variant="text" size="small" onClick={() => setSeconds(value => Math.min(duration, value + 10))}>模拟前进10秒</Button></div>
      <div className="w6-replay-study-grid">
        <section className="w6-replay-chapters"><div className="w6-replay-section-title"><h2>章节目录</h2><span>点击定位</span></div><div role="group" aria-label="课堂讲稿定位">{transcript.map((point, index) => <button type="button" key={point.id} aria-label={`讲稿 ${point.time}`} aria-pressed={selected === point.id} onClick={() => seek(point.id)}><span className="w6-replay-chapter-number">{String(index + 1).padStart(2, '0')}</span><span><strong>{point.label}</strong><time>{point.time}</time></span></button>)}</div></section>
        <section className="w6-replay-transcript"><div className="w6-replay-section-title"><h2>课堂讲稿</h2><Tag size={20} color="neutral">{current.category}</Tag></div><p className="w6-replay-current-chapter"><time>{current.time}</time>{current.label}</p><blockquote>{current.text}</blockquote><p className="w6-replay-transcript-detail">{current.detail}</p><div className="w6-replay-takeaway"><span>本节要点</span><p>{current.takeaway}</p></div></section>
      </div>
      <section className="w6-replay-notes"><div className="w6-replay-section-title"><h2><EditPencilIcon aria-hidden="true" />我的回放笔记</h2><span>整段课堂共享一份笔记</span></div><label className="w6-replay-sr" htmlFor={notesId}>回放笔记</label><Textarea id={notesId} aria-label="回放笔记" rows={3} value={notes} placeholder="记录研究问题、采样方法或需要继续核查的内容……" onValueChange={setNotes} /><p>模拟课堂与本页笔记 · 切换章节保留，刷新页面清空。</p></section>
    </article><PaneSplitter regionId="knowledge-index" /><RecoverableRegion regionId="knowledge-index" className="w6-pane w6-replay-knowledge"><header><div><p>关联到课堂章节</p><h2>知识索引</h2></div><Tag size={20} color="neutral">4 个知识点</Tag></header><p className="w6-replay-knowledge-hint">点击定位；临时展开不改变播放位置。</p><ObjectNavigator aria-label="知识索引对象" appearance="queue" content="info" items={transcript.map(point => ({ id: point.id, label: `${point.label} · ${point.time}`, meta: <div className="w6-replay-knowledge-meta"><Tag size={20} color="courseware">{point.category}</Tag><span>{point.time}</span></div>, description: point.takeaway }))} value={selected} onValueChange={seek} /></RecoverableRegion>
  </WorkspaceLayout>;
}
