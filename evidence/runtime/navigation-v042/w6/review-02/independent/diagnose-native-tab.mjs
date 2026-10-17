import { firefox } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser = await firefox.launch({ headless: true, firefoxUserPrefs: { 'accessibility.tabfocus': 7 } });
const observations = [];
try {
 const page = await browser.newPage({ viewport: { width: 800, height: 747 } });
 for (const scene of ['minimal', 'E2', 'E1']) {
  if (scene === 'minimal') { await page.setContent('<label>Draft <textarea aria-label="Draft"></textarea></label><button aria-label="Recover">Recover</button><a href="#here">Link</a>'); await page.getByRole('textbox').fill('fixture'); }
  else { await page.goto(`http://127.0.0.1:5204/navigation-v042-w6-consumer.html#${scene}`); await page.getByRole('textbox', {name: scene === 'E2' ? '课堂反馈草稿' : '资源说明草稿'}).fill('fixture'); }
  await page.bringToFront();
  await page.evaluate(() => {
   window.focusDiagnosticEvents = [];
   document.addEventListener('keydown', event => queueMicrotask(() => window.focusDiagnosticEvents.push({key:event.key, code:event.code, prevented:event.defaultPrevented, target:event.target.tagName, alt:event.altKey, ctrl:event.ctrlKey})), {once:false});
  });
  const transitions = [];
  for (const key of ['Tab','Tab','Shift+Tab','Alt+Tab','Alt+Tab','Shift+Alt+Tab']) {
   await page.keyboard.press(key);
   transitions.push(await page.evaluate(key => ({key, focus:document.activeElement?.tagName, name:document.activeElement?.getAttribute('aria-label'), hasFocus:document.hasFocus(), value:document.querySelector('textarea')?.value}), key));
  }
  const environment = await page.evaluate(() => ({ events:window.focusDiagnosticEvents, buttons:[...document.querySelectorAll('[data-workspace-action="restore"]')].map(element=>({name:element.getAttribute('aria-label'), tabIndex:element.tabIndex, hidden:element.hidden, inert:element.closest('[inert]')!=null, disabled:element.disabled})), userAgent:navigator.userAgent }));
  observations.push({scene, transitions, environment});
 }
} finally { await browser.close(); }
await writeFile('evidence/runtime/navigation-v042/w6/review-02/independent/diagnose-native-tab.json', JSON.stringify(observations, null, 2)+'\n');
console.log(JSON.stringify(observations, null, 2));
