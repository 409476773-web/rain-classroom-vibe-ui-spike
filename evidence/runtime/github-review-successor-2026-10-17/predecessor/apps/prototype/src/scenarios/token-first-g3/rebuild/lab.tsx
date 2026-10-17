import { useEffect, useId, useState, type MouseEvent } from 'react';
import { Inline, Stack } from '@rain-next/layouts';
import { Alert, AlertDescription, Button, Empty, EmptyTitle, Input, Popover, Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SystemStatusTag } from '@rain-next/ui';
import { HomeIcon } from '@rain-next/ui/icons/home';
import { InstructionTaskIcon } from '@rain-next/ui/icons/instruction-task';
import { HelpIcon } from '@rain-next/ui/icons/help';
import { ChevronDownIcon } from '@rain-next/ui/icons/chevron-down';
import { NavRow, type NavEntry } from './parts';
import './rebuild.css';
import './lab.css';

const laboratories = [
  { id: 'bio', name: '生命科学实验室', place: '实验楼 A 座 · 3 层', manager: '王珊', hours: '09:00–18:00' },
  { id: 'precision', name: '精密仪器实验室', place: '分析测试中心 · 2 层', manager: '周宁', hours: '09:00–17:00' },
];
const equipment = [
  { id: 'C-01', lab: 'bio', name: '高速冷冻离心机', model: 'Centrifuge 5810 R', category: '样品分离', place: 'A301', available: true, note: '请使用配平后的离心管，结束后清洁转子。' },
  { id: 'S-02', lab: 'bio', name: '紫外可见分光光度计', model: 'UV-2600i', category: '光谱分析', place: 'A302', available: true, note: '开机预热 30 分钟；比色皿请自行准备。' },
  { id: 'P-03', lab: 'bio', name: '实时荧光定量 PCR 仪', model: 'QuantStudio 5', category: '分子检测', place: 'A303', available: true, note: '请提前准备反应体系，并核对程序与样品布局。' },
  { id: 'M-04', lab: 'bio', name: '倒置荧光显微镜', model: 'IX83', category: '成像观察', place: 'A302', available: false, note: '光路校准中，恢复时间待管理员通知。' },
  { id: 'E-01', lab: 'precision', name: '扫描电子显微镜', model: 'SU5000', category: '微观成像', place: 'B201', available: true, note: '样品须干燥且无磁性；首次使用请联系管理员。' },
  { id: 'X-02', lab: 'precision', name: 'X 射线衍射仪', model: 'SmartLab', category: '物相分析', place: 'B203', available: true, note: '粉末样品需研磨均匀，单次预约两小时。' },
];

function readLabRoute(instance: string) {
  const query = new URLSearchParams(window.location.hash.split('?')[1]);
  const view = query.get(`lab${instance}View`) ?? 'equipment';
  const labId = query.get(`lab${instance}Scope`) ?? 'bio';
  return {
    view: ['equipment', 'bookings', 'guide'].includes(view) ? view : 'equipment',
    labId: laboratories.some(item => item.id === labId) ? labId : 'bio',
    filter: query.get(`lab${instance}Filter`) === 'available' ? 'available' : 'all',
  };
}

/** E12 local composition: S05 scopes + S08 replaceable identity. Mock state belongs to each host. */
export function LabWorkbench({ instance = 'A' }: { instance?: string }) {
  const id = useId();
  const [route, setRoute] = useState(() => readLabRoute(instance));
  const { view, labId, filter } = route;
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('C-01');
  const [scopeOpen, setScopeOpen] = useState(false);
  const [booked, setBooked] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    const sync = () => setRoute(readLabRoute(instance));
    window.addEventListener('hashchange', sync);
    sync();
    return () => window.removeEventListener('hashchange', sync);
  }, [instance]);
  useEffect(() => {
    setSelectedId(equipment.find(item => item.lab === labId)!.id);
    setQuery(''); setNotice('');
  }, [labId]);
  const lab = laboratories.find(item => item.id === labId)!;
  const selected = equipment.find(item => item.id === selectedId)!;
  const href = (nextView: string, nextLab = labId, nextFilter = filter) => {
    const query = new URLSearchParams(window.location.hash.split('?')[1]);
    query.set('rebuild', '1'); query.set('scene', 'lab');
    query.set(`lab${instance}View`, nextView); query.set(`lab${instance}Scope`, nextLab); query.set(`lab${instance}Filter`, nextFilter);
    return `#token-first-g3?${query}`;
  };
  const navigateTo = (target: string) => { window.location.hash = target; setRoute(readLabRoute(instance)); };
  const globalEntries: NavEntry[] = [
    { id: 'equipment', label: '设备预约', href: href('equipment'), icon: <HomeIcon aria-hidden="true" /> },
    { id: 'bookings', label: '我的预约', href: href('bookings'), icon: <InstructionTaskIcon aria-hidden="true" /> },
    { id: 'guide', label: '使用指南', href: href('guide'), icon: <HelpIcon aria-hidden="true" /> },
  ];
  const scopeEntries: NavEntry[] = [
    { id: 'all', label: '全部设备', href: href('equipment', labId, 'all'), badge: String(equipment.filter(item => item.lab === labId).length) },
    { id: 'available', label: '可立即预约', href: href('equipment', labId, 'available') },
  ];
  const visible = equipment.filter(item => item.lab === labId && (filter === 'all' || item.available)
    && `${item.name} ${item.model} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase())
    && (view !== 'bookings' || booked.includes(item.id)));
  const navigate = (event: MouseEvent<HTMLElement>, entries: NavEntry[]) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as HTMLElement).closest('a');
    const entry = entries.find(item => item.href === link?.getAttribute('href'));
    if (entry) { event.preventDefault(); navigateTo(entry.href); }
  };
  const switchLab = (next: string) => {
    navigateTo(href(view, next)); setScopeOpen(false);
  };
  const reserve = () => {
    if (!selected.available) return;
    const exists = booked.includes(selected.id);
    setBooked(items => exists ? items.filter(item => item !== selected.id) : [...items, selected.id]);
    setNotice(exists ? `已取消预约：${selected.name}` : `已预约：${selected.name}，9 月 24 日 14:00–16:00`);
  };
  return <section className="nr-lab" aria-label={`设备预约工作台 ${instance}`} data-lab-instance={instance} data-local-recipe="e12-lab-s05-s08">
    <div className="nr-lab-shell">
      <Sidebar className="nr-rail nr-lab-global" data-mode="short" data-rain-theme="dark" collapsed aria-label="实验平台全局入口"
        onClick={event => navigate(event, globalEntries)}>
        <SidebarHeader className="nr-lab-brand"><span>LAB</span></SidebarHeader>
        <SidebarContent>{globalEntries.map(entry => <NavRow key={entry.id} entry={entry} current={view} mode="short" surface="dark" />)}</SidebarContent>
        <SidebarFooter className="nr-lab-profile"><span className="nr-avatar" aria-label="当前用户：陈思">陈</span></SidebarFooter>
      </Sidebar>
      <Sidebar className="nr-lab-context" aria-label="当前实验室范围">
        <SidebarHeader className="nr-lab-context-head">
          <span className="nr-lab-caption">共享仪器平台</span>
          <Popover.Root open={scopeOpen} onOpenChange={setScopeOpen}>
            <Popover.Trigger className="nr-lab-switch" aria-label="切换实验室"><span>{lab.name}<small>{lab.place}</small></span><ChevronDownIcon aria-hidden="true" /></Popover.Trigger>
            <Popover.Content className="nr-lab-popup" width={288} aria-label={`选择实验室 ${instance}`} data-lab-instance={instance}>
              <Popover.Title>选择实验室 {instance}</Popover.Title>
              <Stack gap={8}>{laboratories.map(item => <button key={item.id} type="button" className="nr-lab-scope-option" aria-pressed={item.id === labId} onClick={() => switchLab(item.id)}>{item.name}<small>{item.place}</small></button>)}</Stack>
            </Popover.Content>
          </Popover.Root>
        </SidebarHeader>
        <SidebarContent onClick={event => navigate(event, scopeEntries)}>
          <p className="nr-lab-caption">当前范围</p>{scopeEntries.map(entry => <NavRow key={entry.id} entry={entry} current={filter} />)}
        </SidebarContent>
        <SidebarFooter className="nr-lab-context-foot"><Stack gap={8}><span>开放时间 {lab.hours}</span><span>管理员 · {lab.manager}</span><span className="nr-lab-caption">原型演示 · 模拟数据</span></Stack></SidebarFooter>
      </Sidebar>
      <div className="nr-lab-main">
        <header className="nr-lab-heading"><Stack gap={8}><span className="nr-lab-caption">共享仪器 / {lab.name}</span><h1>{view === 'bookings' ? '我的预约' : view === 'guide' ? '使用指南' : '可预约设备'}</h1><p>{view === 'bookings' ? '查看当前实验室内的预约安排。' : view === 'guide' ? '预约前确认设备条件，使用后及时归还。' : '先选择设备，再确认使用时段。'}</p></Stack></header>
        {view === 'guide' ? <Stack className="nr-lab-guide" gap={20}><h2>预约与使用</h2><p>1. 在左侧切换实验室，按设备名称或检测类型查找仪器。</p><p>2. 查看设备状态与使用要求；维护中的设备暂不可预约。</p><p>3. 确认预约后可在「我的预约」查看，计划变化时请及时取消。</p><p>本页仅演示预约流程，所有记录保存在当前页面实例中。</p></Stack> : <div className="nr-lab-body">
          <section className="nr-lab-equipment" aria-label="设备列表"><Inline className="nr-lab-toolbar" gap={16}><Input id={`${id}-search`} aria-label="搜索设备" placeholder="搜索名称、型号或检测类型" value={query} onValueChange={setQuery} size={36} /><span>{visible.length} 台设备</span></Inline>
            <div className="nr-lab-equipment-list">{visible.map(item => <button key={item.id} type="button" className="nr-lab-device" aria-label={`查看 ${item.name}`} aria-pressed={selectedId === item.id} onClick={() => { setSelectedId(item.id); setNotice(''); }}>
              <span className="nr-lab-device-id">{item.id}</span><span className="nr-lab-device-content"><strong>{item.name}</strong><small>{item.model} · {item.place}</small><span>{item.category}</span></span><SystemStatusTag className="nr-lab-device-state" status={item.available?'success':'warning'}>{booked.includes(item.id) ? '已预约' : item.available ? '可预约' : '维护中'}</SystemStatusTag>
            </button>)}{!visible.length && <Empty presentation="text" className="nr-lab-empty"><EmptyTitle as="p">{view === 'bookings' ? '当前范围暂无预约。' : '没有找到设备，请调整搜索条件。'}</EmptyTitle></Empty>}</div>
          </section>
          <aside className="nr-lab-detail" aria-label="预订详情"><Stack gap={24}><div><span className="nr-lab-caption">预订详情</span><h2>{selected.name}</h2><p>{selected.id} · {selected.model}</p></div><dl><div><dt>实验室</dt><dd>{lab.name}</dd></div><div><dt>位置</dt><dd>{selected.place}</dd></div><div><dt>设备状态</dt><dd>{selected.available ? '可预约' : '维护中'}</dd></div></dl><div className="nr-lab-time"><span>可用时段</span><strong>9 月 24 日 · 周四</strong><span>14:00–16:00 · 2 小时</span></div><div><h3>使用须知</h3><p>{selected.note}</p></div><Button size="medium" disabled={!selected.available} onClick={reserve}>{booked.includes(selected.id) ? '取消预约' : '确认预约'}</Button><div role="status" aria-live="polite" className="nr-lab-notice">{notice && <Alert tone={notice.startsWith('已预约')?'success':'info'}><AlertDescription>{notice}</AlertDescription></Alert>}</div></Stack></aside>
        </div>}
      </div>
    </div>
  </section>;
}
