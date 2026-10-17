import { expect, type Page } from "@playwright/test";

/** The real course flow, shared by the original G6 check and Composer regression. */
export async function verifyConversationReading(page: Page) {
  await page.goto('/#message-scroller');
  await expect(page.locator('#message-scroller-title')).toBeVisible();
  const scene=page.locator('.g6-course-shell'), viewport=scene.getByRole('region',{name:'课程答疑记录',exact:true});
  await scene.getByRole('textbox',{name:'输入课程问题',exact:true}).fill('解释一段新的课堂观察。');
  await scene.getByRole('button',{name:'发送问题',exact:true}).click();
  await expect(scene.getByRole('button',{name:'停止生成',exact:true})).toBeVisible();
  await viewport.hover();
  await page.mouse.wheel(0,-1500);
  await expect.poll(()=>viewport.evaluate(node=>node.scrollTop)).toBeLessThan(100);
  await page.waitForTimeout(100);
  const before=await viewport.evaluate(node=>node.scrollTop);
  await page.waitForTimeout(250);
  expect(await viewport.evaluate(node=>node.scrollTop)).toBeLessThanOrEqual(before+2);
  await scene.getByRole('button',{name:'展开输入框',exact:true}).click();
  expect(await viewport.evaluate(node=>node.scrollTop)).toBeLessThanOrEqual(before+2);
  await scene.getByRole('textbox',{name:'输入课程问题',exact:true}).fill('停止后保留的下一问');
  await scene.getByRole('button',{name:'停止生成',exact:true}).click();
  await expect(scene.getByRole('textbox',{name:'输入课程问题',exact:true})).toHaveValue('停止后保留的下一问');
  const anchor=scene.locator('[data-message-id="question-example"]');
  const relativeAnchor=()=>anchor.evaluate(node=>node.getBoundingClientRect().top-node.closest(".rain-message-scroller__viewport")!.getBoundingClientRect().top);
  const old=await relativeAnchor();
  await scene.getByRole('button',{name:'加载更早记录',exact:true}).click();
  await expect.poll(async()=>Math.abs(await relativeAnchor()-old)).toBeLessThan(3);
  await scene.getByRole('button',{name:'返回最新',exact:true}).click();
  await expect.poll(()=>viewport.evaluate(node=>node.scrollHeight-node.clientHeight-node.scrollTop)).toBeLessThan(3);
  await expect(scene.locator('.g6-course-latest')).toHaveAttribute('data-active','false');
  await expect(scene.locator('.g6-course-latest')).toBeHidden();
}
