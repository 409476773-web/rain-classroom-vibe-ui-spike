import { useId, useState, type CSSProperties, type ReactNode } from 'react';
import { DensityProvider, densityMetrics, type Density } from '@rain-next/foundations';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { FormItem, Kbd, Menubar, Select, Textarea } from '@rain-next/ui';
import { CheckBoldIcon } from '@rain-next/ui/icons/check-bold';
import { ArrowRightIcon } from '@rain-next/ui/icons/arrow-right';
import './commands.css';

const initialParagraphs = ['理解导数的变化率含义，能够解释函数在某一点的局部变化。', '结合切线与位移的例子，用自己的语言说明瞬时变化率。'];

function CommandRow({ label, checked, radio, keys, submenu }: { label: string; checked?: boolean; radio?: boolean; keys?: string[]; submenu?: boolean }) {
  return <><span data-slot="command-mark" aria-hidden="true">{checked && (radio ? <span className="nr-command-dot" /> : <CheckBoldIcon />)}</span><span data-slot="command-label">{label}</span><span data-slot="command-shortcut" aria-hidden="true">{keys && <Kbd keys={keys} />}</span><span data-slot="command-arrow" aria-hidden="true">{submenu && <ArrowRightIcon />}</span></>;
}

/** M01/M02 local candidate. V02: shared structure; D02/D05: four stable columns and wrapping labels. */
export function CommandWorkbench({ appearance = 'plain', instance = 'A' }: { appearance?: 'plain' | 'framed'; instance?: string }) {
  const noteId = useId();
  const [history, setHistory] = useState({ snapshots: [initialParagraphs], cursor: 0 });
  const [outline, setOutline] = useState(true);
  const [density, setDensity] = useState<Density>('default');
  const [surface, setSurface] = useState<'light' | 'dark'>('light');
  const [category, setCategory] = useState('随堂练习');
  const paragraphs = history.snapshots[history.cursor]!;
  const metrics = densityMetrics[density];
  const popupStyle = { '--rain-density-control-height': metrics.controlHeight, '--rain-density-control-padding-inline': metrics.controlPaddingInline, '--rain-density-item-gap': metrics.itemGap } as CSSProperties;
  function insert(text: string) {
    setHistory(value => ({ snapshots: [...value.snapshots.slice(0, value.cursor + 1), [...value.snapshots[value.cursor]!, text]], cursor: value.cursor + 1 }));
  }
  function popup(label: string, children: ReactNode, nested = false) {
    return <Menubar.Positioner side={nested ? 'right' : 'bottom'} align="start" collisionPadding={8}><Menubar.Popup aria-label={`${instance} ${label}命令`} data-command-instance={instance} data-command-menu={label} data-rain-theme={surface} data-density={density} className="nr-command-popup" style={popupStyle}>{children}</Menubar.Popup></Menubar.Positioner>;
  }
  return <DensityProvider density={density}><section aria-label={`命令工作台 ${instance}`} data-rain-id="navigation-rebuild-commands" data-slot="workbench" data-instance={instance} data-appearance={appearance} data-rain-theme={surface} data-density={density} className="nr-command-workbench">
    <header className="nr-command-heading"><div><span className="nr-command-eyebrow">{appearance === 'plain' ? 'M01 · 无框平铺' : 'M02 · 细边框条'}</span><h2>导数的概念与应用</h2><p>备课文档 · {category} · 本地演示</p></div><div className="nr-control-field"><span>命令面层</span><Select aria-label={`${instance} 命令面层`} value={surface} clearable={false} options={[{value:'light',label:'浅色'},{value:'dark',label:'深色'}]} onValueChange={value=>setSurface(value as 'light' | 'dark')}/></div></header>
    <div className="nr-command-strip"><Menubar.Root modal={false} className="nr-command-bar" aria-label={`${instance} 文档命令`} aria-describedby={noteId}>
      <Menubar.Menu><Menubar.Trigger>文件</Menubar.Trigger>{popup('文件', <><Menubar.Item className="nr-command-item" aria-label="重置示例" onClick={() => setHistory({ snapshots: [initialParagraphs], cursor: 0 })}><CommandRow label="重置示例" /></Menubar.Item><Menubar.Separator className="nr-command-separator" /><Menubar.Item className="nr-command-item" aria-label="发布到课程（未接入）" disabled><CommandRow label="发布到课程（未接入）" /></Menubar.Item></>)}</Menubar.Menu>
      <Menubar.Menu><Menubar.Trigger>编辑</Menubar.Trigger>{popup('编辑', <><Menubar.Item className="nr-command-item" aria-label="撤销" disabled={history.cursor === 0} onClick={() => setHistory(value => ({ ...value, cursor: Math.max(0, value.cursor - 1) }))}><CommandRow label="撤销" keys={['⌘', 'Z']} /></Menubar.Item><Menubar.Item className="nr-command-item" aria-label="重做" disabled={history.cursor === history.snapshots.length - 1} onClick={() => setHistory(value => ({ ...value, cursor: Math.min(value.snapshots.length - 1, value.cursor + 1) }))}><CommandRow label="重做" keys={['⇧', '⌘', 'Z']} /></Menubar.Item></>)}</Menubar.Menu>
      <Menubar.Menu><Menubar.Trigger>插入</Menubar.Trigger>{popup('插入', <><Menubar.Item className="nr-command-item" aria-label="插入讲解段落" onClick={() => insert('新增讲解：比较平均变化率与瞬时变化率，写下你的观察。')}><CommandRow label="插入讲解段落" keys={['⇧', '⌘', 'Enter']} /></Menubar.Item><Menubar.Item className="nr-command-item" aria-label="插入包含完整学习目标与评价标准的课堂讨论段落" onClick={() => insert('课堂讨论：以生活中的速度变化为例，陈述学习目标，并提出两条可观察的评价标准。')}><CommandRow label="插入包含完整学习目标与评价标准的课堂讨论段落" keys={['⌥', '⇧', '⌘', 'Enter']} /></Menubar.Item><Menubar.Separator className="nr-command-separator" /><Menubar.SubmenuRoot closeParentOnEsc={false}><Menubar.SubmenuTrigger className="nr-command-item" aria-label="练习类别" openOnHover={false}><CommandRow label="练习类别" submenu /></Menubar.SubmenuTrigger>{popup('练习类别', <BaseMenu.RadioGroup value={category} onValueChange={setCategory} aria-label="练习类别">{['随堂练习', '课后练习'].map(value => <BaseMenu.RadioItem key={value} value={value} closeOnClick className="nr-command-item" aria-label={value}><CommandRow label={value} checked={category === value} radio /></BaseMenu.RadioItem>)}</BaseMenu.RadioGroup>, true)}</Menubar.SubmenuRoot></>)}</Menubar.Menu>
      <Menubar.Menu><Menubar.Trigger>视图</Menubar.Trigger>{popup('视图', <><BaseMenu.CheckboxItem checked={outline} onCheckedChange={setOutline} closeOnClick={false} className="nr-command-item" aria-label="显示大纲"><CommandRow label="显示大纲" checked={outline} /></BaseMenu.CheckboxItem><Menubar.Separator className="nr-command-separator" /><div className="nr-command-group-label">阅读密度</div><BaseMenu.RadioGroup value={density} onValueChange={value => setDensity(value as Density)} aria-label="阅读密度">{(['compact', 'default'] as const).map(value => <BaseMenu.RadioItem key={value} value={value} closeOnClick={false} className="nr-command-item" aria-label={value === 'compact' ? '紧凑' : '标准'}><CommandRow label={value === 'compact' ? '紧凑' : '标准'} checked={density === value} radio /></BaseMenu.RadioItem>)}</BaseMenu.RadioGroup></>)}</Menubar.Menu>
    </Menubar.Root><span className="nr-command-count" role="status">{paragraphs.length} 段内容</span></div>
    <p className="nr-command-key-note" id={noteId}>键位仅作展示，未注册快捷键。</p>
    <div className="nr-command-body">{outline && <aside aria-label={`文档大纲 ${instance}`} className="nr-command-outline"><strong>文档大纲</strong><ol><li>学习目标</li><li>概念与例子</li>{paragraphs.slice(2).map((_, index) => <li key={index}>补充内容 {index + 1}</li>)}</ol></aside>}<article className="nr-command-paper"><span className="nr-command-eyebrow">第一讲</span><h3>从平均变化到瞬时变化</h3><ol aria-label={`文档段落 ${instance}`}>{paragraphs.map((text, index) => <li key={index}><h4>{index === 0 ? '学习目标' : index === 1 ? '概念与例子' : `补充内容 ${index - 1}`}</h4><p>{text}</p></li>)}</ol><FormItem className="nr-command-notes" label="备课备注"><Textarea placeholder="记录问题或课堂提示；浏览器原有编辑快捷键继续可用。" /></FormItem></article></div>
  </section></DensityProvider>;
}

export function CommandStateBoard() {
  return <section className="nr-command-state-board" aria-label="命令四列状态样本"><h3>同一命令行 · 四列对齐</h3><p>标记、名称、键位、子菜单；以下为不可操作的状态样本。</p><div className="nr-command-item"><CommandRow label="普通命令" keys={['⌘', 'Z']} /></div><div className="nr-command-item" data-checked><CommandRow label="已选中 · 显示大纲" checked /></div><div className="nr-command-item" data-disabled><CommandRow label="不可用 · 发布到课程" /></div><div className="nr-command-item"><CommandRow label="较长的命令名称保留完整文字与稳定的尾部列" keys={['⌥', '⇧', '⌘', 'Enter']} submenu /></div></section>;
}
