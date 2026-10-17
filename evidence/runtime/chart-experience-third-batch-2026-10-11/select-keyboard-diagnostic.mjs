import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';
const browser=await chromium.launch();const page=await browser.newPage();const facts=[];
await page.goto('http://127.0.0.1:5173/#chart-profit-loss');const host=page.locator('[data-rain-id="chart-profit-loss"]');await host.getByRole('combobox',{name:'盈亏线边界样本',exact:true}).selectOption('profit-loss-near-zero');const select=host.getByRole('combobox',{name:'读取日期',exact:true});
for(const keys of [['ArrowDown'],['Space','ArrowDown','Enter'],['Enter','ArrowDown','Enter'],['Alt+ArrowDown','ArrowDown','Enter'],['ArrowDown','ArrowDown','Enter'],['End'],['Space','End','Enter']]) { await select.selectOption(String(new Date(2026,8,4).getTime()));await select.focus();for(const key of keys){await select.press(key);await page.waitForTimeout(200);}facts.push({keys,value:await select.inputValue(),text:await host.locator('[data-point-reading] [role=status]').textContent()});await select.press('Escape'); }
await writeFile('evidence/runtime/chart-experience-third-batch-2026-10-11/select-keyboard-diagnostic.json',JSON.stringify(facts,null,2));console.log(JSON.stringify(facts));await browser.close();
