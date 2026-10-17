import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const folder="evidence/runtime/chart-experience-third-batch-2026-10-11/profit-loss-browser";
for(const width of [1440,390]) for(const motion of ["no-preference","reduce"] as const) {
  test(`[third-profit-loss] exact near-zero signs, zero platforms and same-date update ${width} ${motion}`,async({page})=>{
    await mkdir(folder,{recursive:true});
    await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:motion});
    const errors:string[]=[];page.on("pageerror",error=>errors.push(String(error)));
    await page.goto("http://127.0.0.1:5173/#chart-profit-loss");
    const observations:unknown[]=[];
    for(const host of [page.locator('[data-rain-id="chart-profit-loss"]'),page.locator('[data-chart-variant="line-profit-loss"]')]) {
      await host.scrollIntoViewIfNeeded();
      const scenario=host.getByRole("combobox",{name:"盈亏线边界样本",exact:true});await expect(scenario).toBeVisible();
      await scenario.selectOption("profit-loss-near-zero");
      await host.getByText("查看精确数据",{exact:true}).click();
      await expect(host.locator("tbody tr")).toHaveCount(8);
      await expect(host.locator("tbody td")).toHaveText(["-0.004","-0.001","0","0.001","0.004","0","-0.002","0.003"]);
      const select=host.getByRole("combobox",{name:"读取日期",exact:true}); const reading=host.locator("[data-point-reading] [role=status]");
      for(const [day,value,sign] of [[1,"-0.004","负值"],[3,"0","基准值"],[4,"0.001","正值"]] as const) {
        await select.selectOption(String(new Date(2026,8,day).getTime())); await expect(reading).toContainText(`相对基准变化 ${value}`);await expect(reading).toContainText(sign);
      }
      await select.focus();await expect(select).toBeFocused();await select.selectOption(String(new Date(2026,8,5).getTime()));await expect(reading).toContainText("0.004");
      const svg=host.locator(".rain-chart-plot svg").first();await expect(svg).toBeVisible();
      await svg.scrollIntoViewIfNeeded();const box=(await svg.boundingBox())!;
      await expect.poll(async()=>{await page.mouse.move(0,0);await page.mouse.move(box.x+58+(box.width-82)*3/7,box.y+box.height/2);return host.locator(".rain-chart-tooltip").isVisible();}).toBe(true);
      await expect(host.locator(".rain-chart-tooltip .tabular-nums")).toHaveText("+0.001");
      const paths=await host.locator('[data-slot="profit-loss-line"] path').evaluateAll(nodes=>nodes.map(node=>({d:node.getAttribute("d"),stroke:node.getAttribute("stroke")})));
      expect(paths.every(path=>!!path.d&&!/NaN|Infinity/.test(path.d))).toBe(true);expect(new Set(paths.map(path=>path.stroke))).toEqual(new Set(["var(--chart-positive)","var(--chart-negative)"]));
      await scenario.selectOption("profit-loss-zero-run");await expect(host.locator("tbody td")).toHaveText(["-2","0","0","3","0","0","-1","0"]);
      await scenario.selectOption("normal");await select.selectOption(String(new Date(2026,8,6).getTime()));await expect(reading).toContainText("相对基准变化 43");
      const update=await host.getAttribute("data-chart-variant") ? host.getByRole("button",{name:"更新数据",exact:true}) : page.locator("[data-chart-default-controls]").getByRole("button",{name:"更新数据",exact:true});
      await update.focus();await update.press("Enter");await expect(reading).toContainText("相对基准变化 65");
      await host.screenshot({path:`${folder}/${width}-${motion}-${await host.getAttribute("data-chart-variant")??"default"}.png`});observations.push({host:await host.getAttribute("data-chart-variant")??"default",paths,reading:await reading.textContent(),rows:await host.locator("tbody tr").allTextContents()});
    }
    expect(errors).toEqual([]);await writeFile(`${folder}/${width}-${motion}.json`,JSON.stringify({width,motion,errors,observations},null,2));
  });
}
