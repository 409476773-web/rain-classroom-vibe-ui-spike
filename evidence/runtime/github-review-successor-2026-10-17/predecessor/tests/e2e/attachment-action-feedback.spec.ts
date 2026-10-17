import { expect, test, type Locator } from "@playwright/test";
async function neutral(button: Locator) {
  await expect.poll(async()=>{
    const paint=await button.evaluate(node=>{const s=getComputedStyle(node);return {actual:s.color,token:s.getPropertyValue("--rain-category-icon-neutral-2").trim()};});
    const channels=(value:string)=>value.startsWith("#")?[1,3,5].map(index=>Number.parseInt(value.slice(index,index+2),16)):(value.match(/[\d.]+/g)??[]).map(Number);
    return JSON.stringify(channels(paint.actual))===JSON.stringify(channels(paint.token));
  }).toBe(true);
}
test.beforeEach(async({page})=>{await page.goto("/#attachment");});

test("download and upload feedback stay in the original two-line row",async({page},info)=>{
  const scene=page.getByTestId("attachment-scenario-ordinary"), row=scene.locator('[data-attachment-id="ordinary-1"] .rain-attachment-list__card');
  const initial=(await row.boundingBox())!.height;expect(initial).toBe(56);
  await neutral(row.getByRole("button",{name:"下载 课程导读.pdf",exact:true}));
  await neutral(row.getByRole("button",{name:"更多操作 课程导读.pdf",exact:true}));
  let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve;});
  await page.route("**/attachment-demo/course-guide.pdf",async route=>{await gate;await route.continue();});
  const downloaded=page.waitForEvent("download");
  await row.getByRole("button",{name:"下载 课程导读.pdf",exact:true}).click();
  await expect(row.getByRole("status")).toHaveText("正在准备下载");
  expect((await row.boundingBox())!.height).toBe(initial);
  release();await downloaded;
  await expect(row.getByRole("status")).toHaveText("已发起下载");
  expect((await row.boundingBox())!.height).toBe(initial);
  await row.screenshot({path:info.outputPath("outlined-download-initiated.png")});
  const more=row.getByRole("button",{name:"更多操作 课程导读.pdf",exact:true});
  await more.click();await page.getByRole("menuitem",{name:"文件信息",exact:true}).click();
  const details=page.getByRole("dialog",{name:"文件信息",exact:true});
  await expect(details).toContainText("已发起下载");
  await expect(details).toContainText("965 B");
  await page.keyboard.press("Escape");await expect(more).toBeFocused();
  await page.unroute("**/attachment-demo/course-guide.pdf");
  await page.route("**/attachment-demo/course-guide.pdf",route=>route.fulfill({status:503,body:"unavailable"}));
  await row.getByRole("button",{name:"下载 课程导读.pdf",exact:true}).click();
  await expect(row.getByRole("alert")).toContainText("下载失败（503）");
  expect((await row.boundingBox())!.height).toBe(initial);
  await expect(row.locator('[data-slot="attachment-description"]')).toHaveAttribute("title",/下载失败/);
  await page.unroute("**/attachment-demo/course-guide.pdf");
  await scene.getByRole("button",{name:"演示上传",exact:true}).click();
  const failed=scene.locator('[data-attachment-id="ordinary-4"] .rain-attachment-list__card');
  await expect(failed.getByRole("alert")).toContainText("连接中断");
  expect((await failed.boundingBox())!.height).toBe(initial);
  expect((await failed.locator('[data-slot="attachment-description"]').boundingBox())!.height).toBe(20);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test("neutral draft, filled-dialog and media actions preserve download height in both themes",async({page},info)=>{
  for(const theme of ["light","dark"]){
    if(theme==="dark")await page.getByRole("button",{name:"深色",exact:true}).click();
    const draft=page.getByTestId("attachment-scenario-composer");
    const remove=draft.getByRole("button",{name:"移除 课程导读.pdf",exact:true});
    await neutral(remove);await remove.hover();await neutral(remove);
    const legacy=page.getByRole("region",{name:"白底 · 浅描边",exact:true});
    await neutral(legacy.getByRole("button",{name:"下载示例 课程导读：从问题到证据.pdf",exact:true}));
    await neutral(legacy.getByRole("button",{name:"更多操作 课程导读：从问题到证据.pdf",exact:true}));
    await page.getByRole("button",{name:"打开附件弹窗",exact:true}).click();
    const dialog=page.getByRole("dialog",{name:"本次附件",exact:true});
    await dialog.evaluate(async node=>{await Promise.all(node.getAnimations({subtree:true}).map(a=>a.finished.catch(()=>{})));});
    const row=dialog.locator('[data-attachment-id="dialog-1"] .rain-attachment-list__card');
    const height=(await row.boundingBox())!.height;
    const down=row.getByRole("button",{name:"下载 课程导读.pdf",exact:true});await neutral(down);
    const event=page.waitForEvent("download");await down.click();await event;
    await expect(row.getByRole("status")).toHaveText("已发起下载");
    expect((await row.boundingBox())!.height).toBe(height);
    await row.screenshot({path:info.outputPath(theme+"-filled-download.png")});
    await page.keyboard.press("Escape");
    const media=page.getByTestId("attachment-scenario-media");
    const card=media.locator('[data-attachment-id="media-image-classroom"] .rain-attachment-list__card');
    const before=(await card.boundingBox())!.height;
    const mediaDown=card.getByRole("button",{name:"下载 课堂板书.png",exact:true});await neutral(mediaDown);
    await neutral(card.getByRole("button",{name:"更多操作 课堂板书.png",exact:true}));
    const event2=page.waitForEvent("download");await mediaDown.click();await event2;
    await expect(card.getByRole("status")).toHaveText("已发起下载");expect((await card.boundingBox())!.height).toBe(before);
    await card.screenshot({path:info.outputPath(theme+"-media-download.png")});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
});

test("compact cancellation and retry keep forty-pixel height",async({page},info)=>{
  const scene=page.getByTestId("attachment-scenario-composer"),name="课堂补充记录.txt";
  await scene.locator('.rain-attachment-picker input[type="file"]').setInputFiles({name,mimeType:"text/plain",buffer:Buffer.from("真实的紧凑上传状态测试")});
  await scene.getByRole("button",{name:"查看全部 13 个",exact:true}).click();
  const row=scene.locator('.rain-attachment-list__card').filter({has:page.getByRole("button",{name:"预览 "+name,exact:true})});
  expect((await row.boundingBox())!.height).toBe(40);
  await row.getByRole("button",{name:"取消上传 "+name,exact:true}).click();
  await expect(row).toContainText("已取消上传");expect((await row.boundingBox())!.height).toBe(40);
  await row.getByRole("button",{name:"重试上传 "+name,exact:true}).click();
  await expect(row.getByRole("progressbar")).toBeVisible();expect((await row.boundingBox())!.height).toBe(40);
  await expect(page.getByTestId("composer-summary")).toContainText("13 个已上传",{timeout:10000});
  expect((await row.boundingBox())!.height).toBe(40);
  await row.screenshot({path:info.outputPath("compact-after-retry.png")});
});
