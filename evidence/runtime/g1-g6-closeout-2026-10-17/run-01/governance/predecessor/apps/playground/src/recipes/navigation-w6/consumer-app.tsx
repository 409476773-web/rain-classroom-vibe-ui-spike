import { useEffect, useState } from 'react';
import { NavigationBar } from '@rain-next/ui';
import { ClassroomInteraction, CourseResources, GradingWorkbench, InstanceIsolation, ReplayWorkbench } from './scenes';
import { ReviewWorkbench } from './review-workbench';

const tasks = [{ id: 'E1', label: '课程资源' }, { id: 'E2', label: '课堂互动' }, { id: 'E3', label: '连续批改' }, { id: 'E4', label: '课堂回放' }, { id: 'E5', label: '实例隔离' }, { id: 'E6', label: '新建审阅台' }];
function selectedTask() { return tasks.some(item => item.id === window.location.hash.slice(1)) ? window.location.hash.slice(1) : 'E1'; }
export function W6Consumer() {
  const [active, setActive] = useState(selectedTask);
  useEffect(() => { const select = () => setActive(selectedTask()); window.addEventListener('hashchange', select); return () => window.removeEventListener('hashchange', select); }, []);
  const scenes = [<CourseResources active={active === 'E1'} />, <ClassroomInteraction active={active === 'E2'} />, <GradingWorkbench active={active === 'E3'} />, <ReplayWorkbench active={active === 'E4'} />, <InstanceIsolation active={active === 'E5'} />, <ReviewWorkbench active={active === 'E6'} />];
  return <main className="w6-consumer" data-rain-id="local-navigation-w6-consumer" data-asset-identity="local-experiment" data-active-task={active}>
    <header className="w6-consumer-heading"><strong>Rain · 独立业务工作区</strong><span>W6 消费试验 · 模拟数据与本地草稿</span></header>
    <NavigationBar aria-label="W6独立消费任务" activeId={active} items={tasks.map(item => ({ ...item, href: `#${item.id}` }))} />
    {tasks.map((task, index) => <section key={task.id} data-scene={task.id} aria-label={`${task.id} ${task.label}`} hidden={active !== task.id} inert={active !== task.id}>{scenes[index]}</section>)}
  </main>;
}
