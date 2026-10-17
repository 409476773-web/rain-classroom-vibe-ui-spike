import { useEffect, useState } from 'react';
import { DensityProvider } from '@rain-next/foundations';
import { Popover, Select } from '@rain-next/ui';
import { ArrowDownIcon } from '@rain-next/ui/icons/arrow-down';
import { ArrowUpIcon } from '@rain-next/ui/icons/arrow-up';
import { CourseBuilderIcon } from '@rain-next/ui/icons/course-builder';
import { EditPencilIcon } from '@rain-next/ui/icons/edit-pencil';
import { InstructionTaskIcon } from '@rain-next/ui/icons/instruction-task';
import { SearchIcon } from '@rain-next/ui/icons/search';
import { globalEntries } from './parts';
import { routeHref, type Route } from './model';
import './top-navigation.css';

type Props = { route: Route; variant?: 'underline' | 'soft'; panel?: 'compact' | 'rich'; portalHover?: boolean; label?: string };
const tools = [
  { id: 'tool-outline', title: '课程提纲', description: '梳理教学目标与章节顺序，形成可调整的课程结构。', icon: CourseBuilderIcon, example: '电路原理 · 基础概念、分析方法与实验安排', items: ['课程目标与能力要求', '章节结构与课时建议', '实验任务与评价方式'] },
  { id: 'tool-questions', title: '题目草拟', description: '按知识点组织练习题草稿，供教师检查与修改。', icon: EditPencilIcon, example: '基尔霍夫定律 · 课堂练习草稿', items: ['节点电流关系辨析', '回路电压的计算过程', '开放问题与参考答案'] },
  { id: 'tool-feedback', title: '作业反馈', description: '整理学生作业中的共性问题，并根据教学目标归纳需要进一步解释的概念、课堂讨论方向与反馈要点；所有建议均由教师确认后使用。', icon: InstructionTaskIcon, example: '一阶电路 · 本周作业反馈示例', items: ['初始条件判断的共性问题', '暂态与稳态概念对照', '下一次课堂的讨论要点'] },
  { id: 'tool-analysis', title: '学习分析', description: '汇总学习进度与薄弱知识点，为后续教学安排提供参考。', icon: SearchIcon, example: '单元学习情况 · 模拟分析记录', items: ['知识点完成情况', '高频错误与薄弱环节', '分层练习建议'] },
] as const;

/** Local N01–N04 recipe. Link destinations come from the same records as the rail. */
export function TopNavigation({ route, variant = 'underline', panel, portalHover = false, label = '顶部全局导航' }: Props) {
  const [open, setOpen] = useState(false);
  const current = route.scene === 'course' ? 'courses' : route.page.startsWith('tool-') ? 'resources' : route.page;
  useEffect(() => setOpen(false), [route.page, route.scene]);
  return <nav className="nr-topnav" aria-label={label} data-variant={variant} data-panel={panel}>
    <ul className="nr-topnav-list">{globalEntries(route).map(entry => <li key={entry.id} className="nr-topnav-item">
      <a className="nr-topnav-link" data-focus="item" href={entry.href} aria-current={current === entry.id ? 'page' : undefined} onClick={() => setOpen(false)}>{entry.label}</a>
      {panel && entry.id === 'resources' && <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger className="nr-topnav-disclosure" aria-label={`${open ? '收起' : '展开'}资源中心入口`} openOnHover={portalHover}>
          {open ? <ArrowUpIcon aria-hidden="true" /> : <ArrowDownIcon aria-hidden="true" />}
        </Popover.Trigger>
        <Popover.Content className="nr-topnav-popup" width={panel === 'rich' ? 640 : 320} aria-label={`${label}：${panel === 'rich' ? '教学工具' : '二级入口'}`} initialFocus={type => type === 'keyboard'}>
          <h2 className="nr-topnav-panel-title">{panel === 'rich' ? 'AI 教学工具' : '教学工具入口'}</h2>
          <div className="nr-topnav-links" data-layout={panel}>{tools.map(tool => <a key={tool.id} className="nr-topnav-panel-link" data-focus="item" aria-label={tool.title} aria-current={route.page === tool.id ? 'page' : undefined} href={routeHref(route, { scene: 'tools', page: tool.id, unit: '' })} onClick={() => setOpen(false)}>
            <span className="nr-topnav-tool-icon" aria-hidden="true"><tool.icon /></span><span className="nr-topnav-tool-copy"><span data-slot="title">{tool.title}</span>{panel === 'rich' && <span data-slot="description">{tool.description}</span>}</span>
          </a>)}</div>
        </Popover.Content>
      </Popover.Root>}
    </li>)}</ul>
  </nav>;
}

export function NavigationPanelsDemo({ route }: { route: Route }) {
  const [surface, setSurface] = useState<'light' | 'dark'>('light');
  const [density, setDensity] = useState<'compact' | 'default'>('default');
  const panel = route.recipe === 'N03' ? 'compact' : 'rich';
  const selected = tools.find(tool => tool.id === route.page);
  return <div className="nr-page-content nr-navigation-demo">
    <div className="nr-page-heading"><div><h1>{selected?.title ?? 'AI 教学工具'}</h1><p>从备课、练习到反馈，找到当前教学任务需要的工具。</p></div><span className="nr-topnav-demo-note">本地模拟 · 未连接 AI 服务</span></div>
    <section className="nr-topnav-example" aria-label="后台点击导航示例">
      <div className="nr-topnav-example-heading"><h2>后台工作区</h2><div className="nr-topnav-demo-controls"><div className="nr-control-field"><span>当前实例面层</span><Select aria-label="实例 A 面层" value={surface} clearable={false} options={[{value:'light',label:'浅色'},{value:'dark',label:'深色'}]} onValueChange={value=>setSurface(value as 'light' | 'dark')}/></div><div className="nr-control-field"><span>密度</span><Select aria-label="实例 A 密度" value={density} clearable={false} options={[{value:'default',label:'标准'},{value:'compact',label:'紧凑'}]} onValueChange={value=>setDensity(value as 'compact' | 'default')}/></div></div></div>
      <DensityProvider density={density}><div className="nr-topnav-surface" data-rain-theme={surface}><TopNavigation route={route} variant="underline" panel={panel} label="实例 A 导航" /></div></DensityProvider>
    </section>
    <section className="nr-topnav-destination" aria-label="工具内容">
      <div><span className="nr-topnav-eyebrow">{selected ? '当前工具 / 示例工作内容' : '开始一项教学任务'}</span><h2>{selected?.example ?? '把教学准备放在同一个工作空间'}</h2><p>{selected?.description ?? '通过“资源中心”旁的展开入口浏览工具。选择用途后，这里显示对应的本地工作内容。'}</p></div>
      {selected ? <ol className="nr-topnav-work-items">{selected.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{item}</strong><p>示例内容 · 等待教师整理与确认</p></div></li>)}</ol> : <div className="nr-topnav-tool-overview">{tools.map(tool => <a key={tool.id} href={routeHref(route, { scene: 'tools', page: tool.id, unit: '' })}><tool.icon aria-hidden="true" /><span><strong>{tool.title}</strong><p>{tool.description}</p></span></a>)}</div>}
    </section>
    <section className="nr-topnav-example" aria-label="门户悬停导航示例"><div className="nr-topnav-example-heading"><h2>门户入口对照</h2><span className="nr-topnav-demo-note">延迟悬停；也可点击或使用键盘</span></div><DensityProvider density="default"><div className="nr-topnav-surface" data-rain-theme="light"><TopNavigation route={route} variant="soft" panel={panel} portalHover label="实例 B 导航" /></div></DensityProvider></section>
  </div>;
}
