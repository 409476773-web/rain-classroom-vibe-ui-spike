import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Tabs } from '@rain-next/ui';
import { R2Recipe } from './r2';
import '@rain-next/foundations/tokens.css';
import '@rain-next/foundations/typography.css';
import '@rain-next/foundations/motion.css';
import '@rain-next/foundations/focus.css';
import '@rain-next/ui/styles.css';
import '@rain-next/layouts/styles.css';
import './consumer.css';

// A consumer entry with no App, review controls, reference DOM, or demo globals.
function Editor() {
  const [draft, setDraft] = useState('');
  return <Tabs aria-label="编辑器内部视图" items={[
    { value: 'edit', label: '编辑', content: <label>教学目标草稿<textarea aria-label="教学目标草稿" value={draft} onChange={event => setDraft(event.target.value)} style={{ display: 'block', width: '100%', minHeight: 120 }} /></label> },
    { value: 'preview', label: '预览', content: <p>{draft || '暂无内容'}</p> },
  ]} />;
}
const root = document.getElementById('root');
if (!root) throw new Error('Consumer root was not found.');
createRoot(root).render(<StrictMode><R2Recipe instanceId="independent-r2" editor={<Editor/>}/></StrictMode>);
