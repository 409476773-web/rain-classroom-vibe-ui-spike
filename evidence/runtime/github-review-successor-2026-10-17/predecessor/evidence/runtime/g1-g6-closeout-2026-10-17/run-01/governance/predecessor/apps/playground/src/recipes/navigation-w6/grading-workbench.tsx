import { useState } from 'react';
import { Button, InputNumber, NavigationTabs, ObjectNavigator, SegmentedControl, Tag, Textarea } from '@rain-next/ui';
import { ConnectedSurface, PaneSplitter, RecoverableRegion, WorkspaceLayout } from '@rain-next/layouts';
import { ActiveSessionGuard } from './active-session-guard';
import { Toolbar, sideRegion, workspaceSpec, type WidthProps } from './workbench-parts';
import './grading-workbench.css';

// Local G3 review-02 composition: business identity and drafts stay with this host.
const gradingSpec = workspaceSpec('grading', 'E3', [sideRegion('grading-queue', '批改队列', 'start', 250, 'hidden'), sideRegion('score', '评分区', 'end', 300, 'expanded', true)], 400);
const students = [
  { id: 'lin-ning', label: '林宁', number: '2026001' },
  { id: 'chen-an', label: '陈安', number: '2026002' },
  { id: 'zhou-lan', label: '周岚', number: '2026003' },
];
const questions = [
  { id: 'q1', label: '第1题', title: '建立可检验假设', fullScore: 20, prompt: '根据校园广场与林荫道的温度差异，提出一个可通过实地测量验证的研究假设。说明自变量、因变量，以及预期的变化方向。', criteria: ['研究问题明确', '自变量与因变量对应', '假设可通过测量验证'] },
  { id: 'q2', label: '第2题', title: '设计控制变量', fullScore: 20, prompt: '为比较遮阴条件对地表温度的影响，设计一次采样方案。说明哪些条件必须保持一致，以及如何记录可能干扰结果的外部条件。', criteria: ['采样条件保持一致', '重复测量方法合理', '干扰因素有记录'] },
  { id: 'q3', label: '第3题', title: '解释实验结果', fullScore: 20, prompt: '根据三个场地的测量结果，解释地表温度差异。区分数据支持的结论与尚需验证的推测，并说明研究局限。', criteria: ['结论由证据支持', '异常数据有解释', '明确局限与后续验证'] },
];
const answers: Record<string, string[]> = {
  'lin-ning': [
    '我们的假设是：同一时段内，树冠遮阴覆盖率越高，地表温度越低。自变量是遮阴覆盖率，因变量是地表温度；我们将在广场、林荫道和建筑阴影下分别测量。',
    '三个地点使用同一台红外测温仪，在午后 14:00、距地面相同高度测量。每个地点重复三次，取平均值；同时记录风速、湿度和地面材质。',
    '林荫道的平均温度最低，广场最高，与遮阴能够降低地表温度的假设一致。但不同地点的材质也有差异，目前不能把全部温差归因于树冠覆盖率。',
  ],
  'chen-an': [
    '我认为阴影覆盖率会影响地表温度。我们比较校园中三个场地，预期遮阴更多的位置温度更低，并通过重复测量检验这个判断。',
    '测量工具、时间与离地高度保持一致，每个地点重复测量三次。我们会先选定采样点，记录当天的风速和湿度，再比较各场地的平均温度。',
    '广场午后比林荫道更热，可能与遮阴和地面材质都有关。现有结果支持继续研究遮阴的影响，但还需要增加同材质场地的对照，才能更好地排除其他原因。',
  ],
  'zhou-lan': [
    '在天气和测量时间相同的条件下，无遮阴的硬质地面可能比树冠下的地面温度更高。我们计划以遮阴比例为自变量，用地表温度作为观察结果。',
    '我们在三个地点各选三个采样点，使用同一设备，在相同高度测量。各地点采样尽量在同一时间完成，并记录云量、风速和周边建筑的阴影变化。',
    '三处测量的差异说明场地条件与地表温度有关，但样本数量有限。若某个数值偏离其他测量，我们会保留记录并检查当时的采样条件，而不直接删除。',
  ],
};
type GradeDraft = { score: number | null; comment: string; saved: boolean };

export function GradingWorkbench({ viewportWidth, active = true }: WidthProps = {}) {
  const [student, setStudent] = useState('lin-ning'), [question, setQuestion] = useState('q1');
  const [mode, setMode] = useState('student'), [appearance, setAppearance] = useState('queue');
  const [drafts, setDrafts] = useState<Record<string, GradeDraft>>({});
  const [numberValid, setNumberValid] = useState(true);
  const key = `paper-microclimate/${question}/${student}`;
  const draft = drafts[key] ?? { score: null, comment: '', saved: false };
  const patch = (value: Partial<GradeDraft>) => setDrafts(previous => ({ ...previous, [key]: { ...(previous[key] ?? { score: null, comment: '', saved: false }), ...value } }));
  const currentStudent = students.find(item => item.id === student)!, currentQuestion = questions.find(item => item.id === question)!;
  const savedFor = (studentId?: string, questionId?: string) => Object.entries(drafts).filter(([draftKey, value]) => value.saved && (!studentId || draftKey.endsWith(`/${studentId}`)) && (!questionId || draftKey.includes(`/${questionId}/`))).length;
  const studentItems = students.map(item => ({ id: item.id, label: item.label, description: `学号 ${item.number}`, count: `${savedFor(item.id)}/3`, meta: <Tag size={20} color={savedFor(item.id) === 3 ? 'olive' : 'neutral'}>{savedFor(item.id) === 3 ? '本页已完成' : '待批改'}</Tag> }));
  const questionItems = questions.map(item => ({ id: item.id, label: item.label, description: item.title, count: `${savedFor(undefined, item.id)}/3`, meta: <span className="w6-grade-item-meta">满分 {item.fullScore} 分</span> }));
  const scoreInRange = draft.score === null || Number.isInteger(draft.score) && draft.score >= 0 && draft.score <= currentQuestion.fullScore;
  return <WorkspaceLayout spec={gradingSpec} viewportWidth={viewportWidth} className="w6-workspace w6-grading-workspace" data-rain-id-consumer="local-navigation-w6-e3"
    toolbar={<Toolbar title="校园微气候实验报告 · 连续批改" regions={['grading-queue']} />}>
    <ActiveSessionGuard active={active} />
    <RecoverableRegion regionId="grading-queue" className="w6-pane w6-grade-queue">
      <div className="w6-grade-queue-heading"><h2>批改队列</h2><span>{mode === 'student' ? '3 位学生' : '3 道题目'}</span></div>
      <div className="w6-grade-queue-options"><span className="w6-grade-control-label">批改顺序</span>
        <SegmentedControl legend="批改方式" name="grading-mode" options={[{ value: 'student', label: '按人' }, { value: 'question', label: '按题' }]} value={mode} onValueChange={value => value && setMode(value)} />
        <span className="w6-grade-control-label">显示方式</span><SegmentedControl legend="队列外观" name="grading-appearance" options={[{ value: 'queue', label: '列表队列' }, { value: 'cards', label: '卡片队列' }]} value={appearance} onValueChange={value => value && setAppearance(value)} />
      </div>
      <p className="w6-grade-queue-purpose">{mode === 'student' ? '逐份批改学生的全部题目' : '逐题比较不同学生的答案'}</p>
      <div role="group" aria-label="当前批改对象"><ObjectNavigator aria-label={mode === 'student' ? '当前学生选择' : '当前题目选择'} appearance={appearance === 'queue' ? 'queue' : 'cards'} content="identity" items={mode === 'student' ? studentItems : questionItems} value={mode === 'student' ? student : question} onValueChange={mode === 'student' ? setStudent : setQuestion} /></div>
      <p className="w6-grade-queue-footnote">右侧数量表示本页已保存 / 全部。</p>
    </RecoverableRegion><PaneSplitter regionId="grading-queue" />
    <article className="w6-main w6-grade-main" data-testid="grading-identity" data-student-id={student} data-question-id={question} data-draft-key={key}>
      <header className="w6-grade-answer-heading"><p className="w6-grade-eyebrow">{mode === 'student' ? '按学生批改' : '按题目批改'}</p><div className="w6-grade-title-row"><div className="w6-grade-title-status"><h1>{currentStudent.label}的实验报告</h1><Tag size={20} color={draft.saved ? 'olive' : 'gold'}>{draft.saved ? '本页已保存' : '待批改'}</Tag></div><p className="w6-grade-identity-meta">学号 {currentStudent.number}<span aria-hidden="true" />{currentQuestion.label}</p></div></header>
      <section className="w6-grade-secondary-nav" aria-label={mode === 'student' ? '选择该学生的题目' : '选择本题的学生'}>
        <NavigationTabs.Root aria-label={mode === 'student' ? '当前题目选择' : '当前学生选择'} className="w6-grade-shortcuts" visualPreset="navigation-browser" value={mode === 'student' ? question : student} onValueChange={value => { if (typeof value === 'string') (mode === 'student' ? setQuestion : setStudent)(value); }} items={(mode === 'student' ? questions : students).map(item => ({ value: item.id, label: item.label, content: null }))}>
          <ConnectedSurface instanceId="w6-e3-answer-axis" connection="merged" surfaceMode="tonal" geometry={{ panelRadius: 0, tabRadius: 6, shoulder: 4, trackInset: 0 }} activeKey={`${mode}:${mode === 'student' ? question : student}`} track={<NavigationTabs.Nav />}>
            <NavigationTabs.Panels sharedContent={<div className="w6-grade-answer-content">
      <section className="w6-grade-prompt"><div className="w6-grade-question-line"><Tag size={20} color="exam">{currentQuestion.label}</Tag><span>满分 {currentQuestion.fullScore} 分</span></div><h2>{currentQuestion.title}</h2><p>{currentQuestion.prompt}</p></section>
      <section className="w6-grade-answer" aria-label="当前学生答案"><div className="w6-grade-subheading"><h2>学生答案</h2><Tag size={20} color="neutral">模拟作答</Tag></div><p>{answers[student]![questions.findIndex(item => item.id === question)]}</p></section>
      <section className="w6-grade-criteria"><h2>评分参考</h2><ol>{currentQuestion.criteria.map((criterion, index) => <li key={criterion}><span>{String(index + 1).padStart(2, '0')}</span>{criterion}</li>)}</ol></section>
            </div>} />
          </ConnectedSurface>
        </NavigationTabs.Root>
      </section>
    </article>
    <PaneSplitter regionId="score" /><RecoverableRegion regionId="score" className="w6-pane w6-score w6-grade-score"><aside aria-label="评分区">
      <header className="w6-grade-score-heading"><h2>评分区</h2><span>{currentQuestion.label}</span></header><p className="w6-grade-score-identity"><strong>{currentStudent.label}</strong><span>{currentQuestion.title}</span></p>
      <label className="w6-field w6-grade-score-field">本题分数<InputNumber key={key} aria-label="本题分数" size={36} appearance="filled" min={0} max={currentQuestion.fullScore} precision={0} step={1} controlsLayout="stacked" suffixText={`/ ${currentQuestion.fullScore} 分`} placeholder="分数" value={draft.score} onValueChange={score => patch({ score, saved: false })} onValidityChange={validity => setNumberValid(validity.valid)} /></label>
      <label className="w6-field w6-grade-comment-field">评分评语<Textarea aria-label="评分评语" appearance="filled" rows={6} value={draft.comment} placeholder="结合答案写下评价与改进建议" onValueChange={comment => patch({ comment, saved: false })} /></label>
      <div className="w6-grade-save"><Button variant="primary" size="medium" disabled={!numberValid || !scoreInRange} onClick={() => patch({ saved: true })}>保存本地草稿</Button><p role="status">{draft.saved ? '已保存到本地状态' : '尚未保存到本地'}</p><span>模拟批改 · 仅保留在当前页面，刷新清空。</span></div>
    </aside></RecoverableRegion>
  </WorkspaceLayout>;
}
