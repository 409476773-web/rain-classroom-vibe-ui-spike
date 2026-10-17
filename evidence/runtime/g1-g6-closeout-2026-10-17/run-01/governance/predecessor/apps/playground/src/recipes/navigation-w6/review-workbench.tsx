import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DensityProvider } from '@rain-next/foundations';
import { Button, FormItem, IconButton, Input, ObjectNavigator, Tag, Textarea, defineRainLocalRecipe } from '@rain-next/ui';
import { ExpandIcon } from '@rain-next/ui/icons/expand';
import { createWorkspaceKey, PaneSplitter, RecoverableRegion, RegionRestoreTrigger, useWorkspaceLayout, WorkspaceLayout, type WorkspaceSpec, type WorkspaceStorage } from '@rain-next/layouts';
import './review-workbench.css';
import { ActiveSessionGuard } from './active-session-guard';

interface Resource {
  id: string;
  code: string;
  title: string;
  type: string;
  version: string;
  pages: number;
  source: string;
  summary: string;
}

const resources: readonly Resource[] = [
  { id: 'resource-humanities-042', code: 'R-042', title: '数字人文研究中的多模态史料整理、版本校勘与长期开放获取方案（修订稿）', type: '研究工作论文', version: 'v2.1', pages: 24, source: '开放研究文库', summary: '本文讨论文字、图像与口述史料共同进入研究档案时的整理路径。研究将原始载体、转写文本与校勘说明分层记录，并保留可追溯的版本关联，便于后续研究者核查引用依据。' },
  { id: 'resource-climate-057', code: 'R-057', title: '城市微气候观测数据的跨尺度校验、缺测处理与可复现分析流程说明', type: '数据方法说明', version: 'v1.4', pages: 18, source: '环境研究资料集', summary: '这份方法说明整理了多站点温湿度观测的校验流程，比较不同采样频率下的缺测处理策略，并将分析步骤与数据字典一起提供，支持独立重复实验。' },
  { id: 'resource-archive-063', code: 'R-063', title: '地方档案开放利用中的元数据互操作规范与跨馆检索质量评估报告', type: '评估报告', version: 'v3.0', pages: 36, source: '联合档案研究计划', summary: '报告对照多个档案目录的字段映射、时间范围与主题标引，记录跨馆检索中的同名实体和粒度差异，给出可供复核的评估样本。' },
  { id: 'resource-biology-071', code: 'R-071', title: '湿地生物多样性长期监测样线设计、样本标注与观测偏差控制手册', type: '研究操作手册', version: 'v1.8', pages: 42, source: '生态观测共享中心', summary: '手册说明固定样线与随机样点的组合设计，列出影像标注、样本复核与天气条件记录要求，并分析不同观察条件对结果解释的影响。' },
  { id: 'resource-linguistics-086', code: 'R-086', title: '面向低资源语言的语料清洗、标注一致性检验与公开发布伦理说明', type: '语料规范', version: 'v2.3', pages: 27, source: '语言资源联合文库', summary: '规范覆盖原始语料筛选、标注分歧处理和公开许可确认。每项转换保留处理记录，便于从发布版本回溯到来源及其使用条件。' },
  { id: 'resource-materials-092', code: 'R-092', title: '新型储能材料循环寿命实验的测试条件对齐与结果复核记录汇编', type: '实验记录汇编', version: 'v1.2', pages: 33, source: '材料实验开放仓库', summary: '汇编记录了不同批次样品的测试条件、设备校准与失效判据，通过同口径表格展示重复实验中观察到的差异。' },
  { id: 'resource-policy-108', code: 'R-108', title: '公共文化服务可达性研究：空间测量方法、调查口径与证据解释边界', type: '政策研究附件', version: 'v2.0', pages: 31, source: '社会研究共享平台', summary: '附件将空间距离、开放时间与服务体验分开测量，说明样本覆盖范围和解释边界，避免用单一指标替代完整的可达性判断。' },
  { id: 'resource-software-119', code: 'R-119', title: '科研软件环境依赖锁定、计算结果再现与长期维护交接清单（完整附录）', type: '技术附录', version: 'v4.1', pages: 22, source: '可复现研究资料库', summary: '附录按运行环境、数据输入和结果输出组织交接信息，记录依赖锁定与再现检查的前提，便于维护者理解失败发生的位置。' },
];

export interface ReviewWorkbenchProps {
  active?: boolean;
  instanceId?: string;
  viewportWidth?: number;
  storage?: WorkspaceStorage;
}

const edgeRestoreRecipe = defineRainLocalRecipe<'root', 'ui-icon-button'>({
  id: 'navigation-w6-review-edge-restore', scope: 'feature', origin: 'ui-icon-button',
  classes: { root: 'w6-review-edge-control' }, modifiedParts: ['root'], candidateTokens: [], promotionStatus: 'not-proposed',
});

/** Local edge affordance; Workspace remains the visibility and narrow-space authority. */
function ReviewEdgeRestore({ regionId }: { regionId: 'queue' | 'comments' }) {
  const { state, effective, dispatch, viewportWidth, regionDomId } = useWorkspaceLayout();
  const button = useRef<HTMLButtonElement>(null), openedFromEdge = useRef(false), wasTemporary = useRef(false);
  const temporary = state.session.temporary?.regionId === regionId;
  const visible = effective.regions[regionId]!.mode === 'hidden' && !temporary && !state.session.focused;
  const controls = regionDomId(regionId), label = regionId === 'queue' ? '资源队列' : '评审面板';
  useLayoutEffect(() => {
    if (wasTemporary.current && !temporary && openedFromEdge.current) {
      // The shared Escape/close path returns to the stable toolbar owner first.
      // Return to this nearby entry only for a session that it opened; outside clicks retain their target.
      const focused = button.current?.ownerDocument.activeElement;
      if (focused instanceof HTMLElement && focused.dataset.workspaceAction === 'restore' && focused.getAttribute('aria-controls') === controls) button.current?.focus();
      openedFromEdge.current = false;
    } else if (openedFromEdge.current && !temporary && effective.regions[regionId]!.mode === 'expanded') {
      const panel = document.getElementById(controls);
      panel?.querySelector<HTMLElement>('input:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]')?.focus();
      openedFromEdge.current = false;
    }
    wasTemporary.current = temporary;
  }, [temporary, effective.regions[regionId]!.mode, controls]);
  if (!visible) return null;
  return <IconButton ref={button} icon={<ExpandIcon />} size="32/18" className="w6-review-edge-restore" localRecipe={edgeRestoreRecipe}
    data-side={regionId === 'queue' ? 'start' : 'end'} data-workspace-action="restore" data-region-target={regionId}
    aria-label={`展开${label}`} title={`展开${label}`} aria-controls={controls} aria-expanded={false}
    onClick={() => { openedFromEdge.current = true; dispatch({ type: 'SHOW_REGION', regionId, viewportWidth }); }} />;
}

function ReviewToolbar({ ownerId }: { ownerId: string }) {
  const { state, dispatch } = useWorkspaceLayout();
  return <header className="w6-review-toolbar" id={ownerId}>
    <div className="w6-review-toolbar__identity"><strong>学术资源评审</strong><span>演示数据 · Mock</span></div>
    <div className="w6-review-toolbar__actions">
      <RegionRestoreTrigger regionId="queue" />
      <RegionRestoreTrigger regionId="comments" />
      <Button variant="tertiary" size="medium" onClick={() => dispatch({ type: state.session.focused ? 'EXIT_FOCUS' : 'ENTER_FOCUS' })}>{state.session.focused ? '退出专注' : '专注阅读'}</Button>
    </div>
  </header>;
}

function ResourceQueue({ activeId, onSelect, saved }: { activeId: string; onSelect: (id: string) => void; saved: Record<string, string> }) {
  const [query, setQuery] = useState('');
  const { state, dispatch } = useWorkspaceLayout();
  const matches = resources.filter(resource => `${resource.title} ${resource.code} ${resource.type}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  const currentInResult = matches.some(resource => resource.id === activeId);
  return <>
    <div className="w6-review-pane-head"><h2>资源队列</h2><span>{matches.length} 份</span></div>
    <div className="w6-review-search"><Input aria-label="筛选资源" size={36} value={query} onValueChange={setQuery} placeholder="筛选名称、编号或类型" clearLabel="清空资源筛选" /></div>
    {!currentInResult && <p className="w6-review-filter-note">当前预览资源不在筛选结果中</p>}
    <ObjectNavigator aria-label="待评审学术资源" appearance="queue" content="identity" className="w6-review-queue" value={currentInResult ? activeId : null}
      emptyLabel="没有匹配的资源，试试其他关键词"
      items={matches.map(resource => ({ id: resource.id, label: resource.title, meta: <>
        <span className="w6-review-resource-tags"><Tag color="neutral" size={20}>{resource.type}</Tag><Tag color={Object.hasOwn(saved, resource.id) ? 'olive' : 'gold'} size={20}>{Object.hasOwn(saved, resource.id) ? '本页已评审' : '待评审'}</Tag></span>
        <span className="w6-review-resource-details"><span>{resource.code}</span><span>{resource.version}</span><span>{resource.pages} 页</span></span>
      </> }))}
      onValueChange={id => { onSelect(id); if (state.session.temporary?.regionId === 'queue') dispatch({ type: 'DISMISS_TEMP', reason: 'action' }); }} />
    <p className="w6-review-queue-foot">资源与评审记录均为脱敏示例。</p>
  </>;
}

function DocumentPreview({ resource, onPrevious, onNext, index }: { resource: Resource; onPrevious: () => void; onNext: () => void; index: number }) {
  return <main className="w6-review-preview" aria-label="当前资源预览" data-resource-id={resource.id}>
    <div className="w6-review-preview-bar"><span>文档预览 · Mock</span><div><Button variant="text" size="regular" onClick={onPrevious} disabled={index === 0}>上一份</Button><span>{index + 1} / {resources.length}</span><Button variant="text" size="regular" onClick={onNext} disabled={index === resources.length - 1}>下一份</Button></div></div>
    <div className="w6-review-document-scroll">
      <article className="w6-review-document">
        <div className="w6-review-document__kicker">{resource.code} · {resource.type}</div>
        <h1>{resource.title}</h1>
        <dl className="w6-review-document__metadata"><div><dt>资料来源</dt><dd>{resource.source}</dd></div><div><dt>提交版本</dt><dd>{resource.version}</dd></div><div><dt>文件范围</dt><dd>{resource.pages} 页 · 文字预览示例</dd></div></dl>
        <section><h2>摘要与评审范围</h2><p>{resource.summary}</p><p>本轮评审关注方法说明是否完整、证据能否追溯，以及资料版本与引用范围是否一致。预览内容为 Mock 文本，不代表真实上传文件或正式研究结论。</p></section>
        <section><h2>01 资料组织与方法说明</h2><p>研究资料按来源、处理步骤和使用条件组织。原始记录与整理后的内容分别保留，对影响判断的转换给出说明；有争议的条目进入复核记录，不在汇总时直接抹平差异。</p><blockquote>核查重点：读者能否从当前版本找到原始依据，并理解资料在何种条件下支持本文的解释？</blockquote></section>
        <section><h2>02 证据记录与复核路径</h2><table><caption>表 1 · 证据索引示例（Mock）</caption><thead><tr><th scope="col">记录范围</th><th scope="col">可追溯依据</th><th scope="col">复核提示</th></tr></thead><tbody><tr><td>核心方法</td><td>{resource.code}-M01 / 方法附件</td><td>补充处理前后示例</td></tr><tr><td>结果说明</td><td>{resource.code}-E02 / 证据目录</td><td>确认版本与引用一致</td></tr></tbody></table><p>复核时应把具体证据位置写入右侧意见，方便作者定位。缺少材料与材料之间出现冲突分别记录，避免用概括性的评价替代核查结论。</p></section>
        <section><h2>03 解释边界与开放使用</h2><p>示例资料仅用于讨论当前范围内的方法和组织方式。后续使用需重新确认来源许可、版本关系与适用条件；本工作台没有连接真实发布或审批服务。</p></section>
        <footer>Mock 文字预览 · {resource.code} · {resource.version}</footer>
      </article>
    </div>
  </main>;
}

/** W6 independent consumption: new local experiment, application owns resource IDs and drafts. */
export function ReviewWorkbench({ instanceId = 'e6-independent-review', viewportWidth, storage, active = true }: ReviewWorkbenchProps) {
  const [activeId, setActiveId] = useState(resources[0]!.id);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, string>>({});
  const ownerId = `w6-review-toolbar-${encodeURIComponent(instanceId)}`;
  const spec = useMemo<WorkspaceSpec>(() => ({ workspaceKey: createWorkspaceKey({ userScope: 'mock-reviewer', workspaceId: 'academic-resource-review', subsceneId: 'document-workbench', instanceId }), stableRestoreOwnerIds: [ownerId], minMainWidth: 480,
    regions: [
      { id: 'queue', label: '资源队列', side: 'start', allowedModes: ['expanded', 'hidden'], defaultMode: 'expanded', minWidth: 240, defaultWidth: 288, maxWidth: 400, boundaryWidth: 5, adaptationPriority: 1, restoreOwnerId: ownerId },
      { id: 'comments', label: '评审面板', side: 'end', allowedModes: ['expanded', 'hidden'], defaultMode: 'expanded', minWidth: 280, defaultWidth: 320, maxWidth: 480, boundaryWidth: 5, adaptationPriority: 0, restoreOwnerId: ownerId },
    ] }), [instanceId, ownerId]);
  const resource = resources.find(item => item.id === activeId)!;
  const index = resources.indexOf(resource);
  const draft = drafts[activeId] ?? '';
  const dirty = draft !== (saved[activeId] ?? '');
  const savedHere = Object.hasOwn(saved, activeId);
  return <DensityProvider density="default"><section className="w6-review-workbench" data-ai-task="E6" data-rain-id="local-experiment-academic-resource-review" data-instance-id={instanceId} data-resource-id={activeId} aria-label="学术资源评审工作台">
    <WorkspaceLayout spec={spec} viewportWidth={viewportWidth} storage={storage} className="w6-review-workspace" toolbar={<ReviewToolbar ownerId={ownerId} />}>
      <ActiveSessionGuard active={active} />
      <ReviewEdgeRestore regionId="queue" />
      <ReviewEdgeRestore regionId="comments" />
      <RecoverableRegion regionId="queue" className="w6-review-side"><ResourceQueue activeId={activeId} onSelect={setActiveId} saved={saved} /></RecoverableRegion>
      <PaneSplitter regionId="queue" className="w6-review-splitter" />
      <DocumentPreview resource={resource} index={index} onPrevious={() => setActiveId(resources[index - 1]!.id)} onNext={() => setActiveId(resources[index + 1]!.id)} />
      <PaneSplitter regionId="comments" className="w6-review-splitter" />
      <RecoverableRegion regionId="comments" className="w6-review-side">
        <section className="w6-review-comments" aria-label="当前资源评审" data-resource-id={activeId}>
          <div className="w6-review-pane-head"><h2>评审面板</h2><span>{resource.code}</span></div>
          <div className="w6-review-comments__body"><p className="w6-review-comment-context">正在评审 {resource.code} · {resource.version}</p>
            <section className="w6-review-checklist"><h3>本轮核查</h3><ul><li>方法与处理步骤是否完整</li><li>证据位置是否明确、可追溯</li><li>引用版本与解释范围是否一致</li></ul></section>
            <FormItem id={`w6-review-note-${encodeURIComponent(instanceId)}`} label="审核意见" help="建议写明证据位置及需要补充的材料。"><Textarea rows={8} value={draft} onValueChange={value => setDrafts(before => ({ ...before, [activeId]: value }))} placeholder="例如：方法附件第 3 节需补充……" /></FormItem>
            <div className="w6-review-save"><span role="status" aria-label="本地保存状态">{dirty ? '未保存' : savedHere ? '本页已保存' : '尚未编辑'}</span><Button variant="primary" size="medium" disabled={!dirty} onClick={() => setSaved(before => ({ ...before, [activeId]: draft }))}>保存本地评审</Button></div>
            <p className="w6-review-save-note">Mock 评审记录仅保留于当前页面，刷新后清空。</p>
            <section className="w6-review-saved-note"><h3>当前资源的本地记录</h3>{savedHere ? <p>{saved[activeId] || '已保存空白意见'}</p> : <p className="w6-review-muted">尚无本地评审记录</p>}</section>
          </div>
        </section>
      </RecoverableRegion>
    </WorkspaceLayout>
  </section></DensityProvider>;
}
