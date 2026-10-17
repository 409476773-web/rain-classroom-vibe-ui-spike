import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { W6Consumer } from './consumer-app';
export { W6Consumer } from './consumer-app';
import '@rain-next/foundations/tokens.css';
import '@rain-next/foundations/typography.css';
import '@rain-next/foundations/motion.css';
import '@rain-next/foundations/focus.css';
import '@rain-next/ui/styles.css';
import '@rain-next/layouts/styles.css';
import './consumer.css';

const root = document.getElementById('root');
if (!root) throw new Error('W6 consumer root was not found');
createRoot(root).render(<StrictMode><W6Consumer /></StrictMode>);
