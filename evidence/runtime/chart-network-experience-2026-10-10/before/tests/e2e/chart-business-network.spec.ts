import { expect, test, type Locator } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { makeNetworkFixtures } from "../../apps/playground/src/docs/components/chart-business/network-data";
import { measureColorContrast, type ColorValue } from "../../packages/foundations/src/color-registry";

const evidence = "evidence/runtime/chart-network-arrow-feedback-2026-10-10/browser";
const fixtures = makeNetworkFixtures();

async function geometryAudit(chart: Locator, links: { id: string; source: string; target: string }[]) {
  return chart.locator(".rain-network__svg").evaluate((element, links) => {
    const svg = element as SVGSVGElement, inverse = svg.getCTM()!.inverse();
    const variant = svg.closest(".rain-network")!.getAttribute("data-variant");
    function box(element: SVGGraphicsElement) {
      const b = element.getBBox(), transform = inverse.multiply(element.getCTM()!);
      const a = new DOMPoint(b.x, b.y).matrixTransform(transform), z = new DOMPoint(b.x + b.width, b.y + b.height).matrixTransform(transform);
      return { x: a.x, y: a.y, width: z.x - a.x, height: z.y - a.y };
    }
    const nodes = [...svg.querySelectorAll<SVGGElement>("[data-network-node]")].map(node => ({ id: node.getAttribute("data-network-node")!, body: box(node.querySelector<SVGGraphicsElement>('[data-slot="node-core"]')!), label: box(node.querySelector<SVGGraphicsElement>('[data-slot="node-label"]')!) }));
    const contains = (p: { x: number; y: number }, b: typeof nodes[number]["body"]) => p.x > b.x && p.x < b.x + b.width && p.y > b.y && p.y < b.y + b.height;
    const hits = new Set<string>();
    for (const path of svg.querySelectorAll<SVGPathElement>("[data-network-edge]")) {
      const id = path.getAttribute("data-network-edge")!, link = links.find(link => link.id === id)!;
      const length = path.getTotalLength();
      for (let step = 0; step <= 400; step++) {
        const p = path.getPointAtLength(length * step / 400);
        for (const node of nodes) {
          if (contains(p, node.label)) hits.add(`${id}/${node.id}/label`);
          if (node.id === link.source || node.id === link.target) {
            if (variant === "structured" && contains(p, node.body)) hits.add(`${id}/${node.id}/endpoint-card`);
            continue;
          }
          if (variant === "structured" ? contains(p, node.body) : Math.hypot(p.x - node.body.x - node.body.width / 2, p.y - node.body.y - node.body.height / 2) < node.body.width / 2) hits.add(`${id}/${node.id}/body`);
        }
      }
    }
    return { variant, nodes: nodes.length, edges: svg.querySelectorAll("[data-network-edge]").length, hits: [...hits] };
  }, links);
}

test("normal light external node names stay readable independently of the glow palette", async ({ page }) => {
  await page.emulateMedia({ reducedMotion:"reduce" });
  await page.goto("/#chart-network");
  await page.getByRole("combobox", { name:"网络业务场景" }).selectOption("courses");
  const facts = [];
  const rgb = (value: string) => value.match(/[\d.]+/g)!.slice(0,3).map(Number) as unknown as ColorValue["rgb"];
  for (const recipe of ["monochrome-blue", "category-near", "category-wide"]) {
    await page.getByRole("combobox", { name:"网络图表配色" }).selectOption(recipe);
    const paints = await page.locator(".rain-network__svg [data-network-node]").evaluateAll(nodes => nodes.map(node => {
      const circle = node.querySelector("circle")!, text = node.querySelector("text")!;
      const id = circle.getAttribute("fill")!.match(/^url\(#(.+)\)$/)![1]!;
      const stop = document.getElementById(id)!.querySelector("stop")!;
      return { foreground:getComputedStyle(text).fill, border:getComputedStyle(circle).stroke, centre:getComputedStyle(stop).stopColor, opacity:Number(getComputedStyle(stop).stopOpacity), background:getComputedStyle(document.body).backgroundColor };
    }));
    const ratios = paints.map(paint => {
      const background = { rgb:rgb(paint.background),alpha:1 };
      const centre = rgb(paint.centre).map((channel,index) => channel*paint.opacity+background.rgb[index]!*(1-paint.opacity)) as unknown as ColorValue["rgb"];
      return { text:measureColorContrast({rgb:rgb(paint.foreground),alpha:1},background), core:measureColorContrast({rgb:centre,alpha:1},background) };
    });
    facts.push({recipe,paints,ratios});
    expect(Math.min(...ratios.map(row => row.text))).toBeGreaterThanOrEqual(4.5);
    expect(paints.every(paint => paint.border === "none")).toBe(true);
  }
  await mkdir(evidence,{recursive:true});
  await writeFile(`${evidence}/network-contrast-facts.json`,JSON.stringify({scope:"normal light external names on actual opaque body; core ratios reported without granting graphical contrast; faded/forced-colors/dark not accepted",facts},null,2));
});

for (const motion of ["no-preference", "reduce"] as const) {
  test(`${motion}: four network examples support equivalent selection, filtering and stable updates`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto("/#chart-network");
    await mkdir(evidence, { recursive:true });
    await expect(page.getByRole("heading", { name:"网络关系图", exact:true })).toBeVisible();
    await expect(page.locator("[data-network-example]")).toHaveCount(4);
    for (const fixture of fixtures) {
      const chart = page.locator(`[data-network-example="${fixture.id}"]`);
      await expect(chart.locator("[data-network-node]")).toHaveCount(fixture.nodes.length);
      await expect(chart.locator("[data-network-edge]")).toHaveCount(fixture.edges.length);
      expect(await chart.locator("path[data-network-edge]").evaluateAll(paths => paths.every(path => !/NaN|Infinity/.test(path.getAttribute("d") ?? "")))).toBe(true);
      await expect(chart.getByText(fixture.reference, { exact:true })).toBeVisible();
      if (motion === "no-preference") await chart.screenshot({ path:`${evidence}/network-${fixture.id}-desktop.png` });
    }
    const markers = await page.locator(".rain-network__svg marker").evaluateAll(nodes => nodes.map(node => node.id));
    expect(new Set(markers).size).toBe(markers.length);
    expect(markers.length).toBeGreaterThanOrEqual(4);

    await page.getByRole("combobox", { name:"网络业务场景" }).selectOption("elements");
    const fixture = fixtures.find(item => item.id === "elements")!;
    const chart = page.locator('[data-network-example="elements"]');
    const first = fixture.nodes[0]!;
    const nodeName = `${first.label}，${fixture.categories.find(item => item.id === first.category)!.label}`;
    await chart.locator(`[data-network-node="${first.id}"]`).click();
    await expect(chart.getByRole("region", { name:"节点详情" })).toHaveAttribute("data-selected-node", first.id);
    await chart.getByRole("button", { name:"清除节点选择" }).click();
    const quiz = fixture.nodes.find(node => node.id === "quiz")!;
    const quizName = `${quiz.label}，${fixture.categories.find(item => item.id === quiz.category)!.label}`;
    await chart.locator(`[data-network-node="${first.id}"]`).hover();
    await chart.getByRole("button", { name:quizName, exact:true }).focus();
    const quizAdjacent = new Set([quiz.id, ...fixture.edges.filter(edge => edge.source === quiz.id || edge.target === quiz.id).flatMap(edge => [edge.source, edge.target])]);
    for (const node of fixture.nodes) await expect(chart.locator(`[data-network-node="${node.id}"]`)).toHaveAttribute("data-highlighted", String(quizAdjacent.has(node.id)));
    await chart.screenshot({ path:`${evidence}/network-hover-focus-${motion}.png` });
    await page.mouse.move(0, 0);
    await chart.locator(`[data-network-node="${first.id}"]`).hover();
    await expect(chart.locator(`[data-network-node="${first.id}"]`)).toHaveAttribute("data-highlighted", "true");
    await expect(chart.locator(`[data-network-node="${quiz.id}"]`)).toHaveAttribute("data-highlighted", "false");
    await chart.getByRole("button", { name:nodeName, exact:true }).focus();
    const adjacent = new Set([first.id, ...fixture.edges.filter(edge => edge.source === first.id || edge.target === first.id).flatMap(edge => [edge.source, edge.target])]);
    for (const node of fixture.nodes) await expect(chart.locator(`[data-network-node="${node.id}"]`)).toHaveAttribute("data-highlighted", String(adjacent.has(node.id)));
    await page.keyboard.press("Enter");
    await expect(chart.getByRole("region", { name:"节点详情" })).toHaveAttribute("data-selected-node", first.id);
    await expect(chart.locator(".rain-network-feedback")).toHaveText(`已选择：${first.label}`);

    const moving = chart.locator(`[data-network-node="${fixture.nodes[1]!.id}"]`);
    await moving.evaluate(node => node.setAttribute("data-test-retained-node", "true"));
    await chart.locator(".rain-network").evaluate(node => node.setAttribute("data-test-retained-root", "true"));
    const position = () => moving.evaluate(node => { const box = node.getBoundingClientRect(), viewport = node.closest("svg")!.getBoundingClientRect(); return { x:Number((box.x - viewport.x).toFixed(1)), y:Number((box.y - viewport.y).toFixed(1)) }; });
    if (motion === "no-preference") await page.waitForTimeout(500);
    const before = await position();
    await page.getByRole("button", { name:"更新数据", exact:true }).click();
    await page.waitForTimeout(80);
    const middle = await position();
    await page.waitForTimeout(500);
    const after = await position();
    expect(Math.hypot(after.x - before.x, after.y - before.y)).toBeGreaterThan(1);
    if (motion === "reduce") expect(middle).toEqual(after);
    else expect(middle).not.toEqual(after);
    await expect(chart.locator('[data-test-retained-node="true"]')).toHaveCount(1);
    await expect(chart.locator(".rain-network")).toHaveAttribute("data-recipe", "monochrome-blue");
    const recipeColors = await chart.locator(".rain-network").evaluate(node => ({ first:getComputedStyle(node).getPropertyValue("--chart-1").trim(), last:getComputedStyle(node).getPropertyValue("--chart-3").trim() }));
    expect(recipeColors.first.toLowerCase()).toBe("#6288c7");
    expect(recipeColors.last.toLowerCase()).toBe("#91b0e1");
    await expect(chart.getByRole("region", { name:"节点详情" })).toHaveAttribute("data-selected-node", first.id);

    await page.getByRole("combobox", { name:"网络关系类型" }).selectOption("examines");
    const expectedEdges = fixture.edges.filter(edge => edge.relation === "examines");
    const expectedNodes = new Set(expectedEdges.flatMap(edge => [edge.source, edge.target]));
    await expect(chart.locator("[data-network-edge]")).toHaveCount(expectedEdges.length);
    await expect(chart.locator("[data-network-node]")).toHaveCount(expectedNodes.size);
    await expect(chart.locator('[data-test-retained-root="true"]')).toHaveCount(1);
    await expect(chart.locator(".rain-network__detail[data-selected-node]")).toHaveCount(0);
    await expect(chart.locator(".rain-network-feedback")).not.toContainText("已选择");
    await chart.locator(".rain-network__nodes button").first().focus();
    await page.keyboard.press("Enter");
    await expect(chart.locator(".rain-network__detail[data-selected-node]")).toHaveCount(1);
    await chart.getByRole("button", { name:"清除节点选择" }).click();
    await expect(chart.locator(".rain-network__detail[data-selected-node]")).toHaveCount(0);

    await page.getByRole("combobox", { name:"网络关系类型" }).selectOption("all");
    await page.getByText("网络图配置、完整源码与示例数据", { exact:true }).click();
    const source = await page.locator('a[download="main.tsx"]').getAttribute("href");
    expect(decodeURIComponent(source ?? "")).toContain('"fixtureId":"elements"');
    expect(decodeURIComponent(source ?? "")).toContain('"revision":1');
    await page.getByText("网络图配置、完整源码与示例数据", { exact:true }).click();
    expect(errors).toEqual([]);
    await mkdir(evidence, { recursive:true });
    await page.screenshot({ path:`${evidence}/network-elements-${motion}.png`, fullPage:true });
    await writeFile(`${evidence}/network-motion-${motion}.json`, JSON.stringify({ motion, before, middle, after, stableIdentity:true, instanceMarkerIds:markers, pageErrors:errors }, null, 2));
  });

  test(`${motion}: long network labels remain readable at 390px and invalid, empty and single states are explicit`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion:motion });
    await page.setViewportSize({ width:390, height:844 });
    await page.goto("/#chart-network");
    await page.getByRole("combobox", { name:"网络业务场景" }).selectOption("practice");
    await page.getByRole("combobox", { name:"网络数据状态" }).selectOption("long");
    const chart = page.locator('[data-network-example="practice"]');
    await expect(chart.locator(".rain-network__nodes button")).toHaveCount(8);
    await expect(chart.locator(".rain-network__scroll")).not.toBeVisible();
    await expect(chart.locator(".rain-network__relations li")).toHaveCount(11);
    await expect(chart.locator(".rain-network__relations")).toBeVisible();
    const labels = await chart.locator('.rain-network__nodes button [data-slot="label"]').evaluateAll(nodes => nodes.map(node => ({ whiteSpace:getComputedStyle(node).whiteSpace, overflow:getComputedStyle(node).overflow, height:node.getBoundingClientRect().height })));
    expect(labels.every(label => label.whiteSpace === "normal" && label.overflow === "visible")).toBe(true);
    expect(labels.some(label => label.height > 30)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
    await chart.locator(".rain-network__nodes button").first().focus();
    await page.keyboard.press("Enter");
    await expect(chart.getByRole("region", { name:"节点详情" })).toContainText("跨学科智慧教育联合实验与综合能力培养课程");
    await mkdir(evidence, { recursive:true });
    await page.screenshot({ path:`${evidence}/network-long-390-${motion}.png`, fullPage:true });
    await page.getByRole("combobox", { name:"网络数据状态" }).selectOption("invalid");
    await expect(chart.getByRole("alert")).toContainText("已拒绝无效数据");
    await expect(chart.locator(".rain-network")).toHaveCount(0);
    await page.getByRole("combobox", { name:"网络数据状态" }).selectOption("single");
    await expect(chart.locator("[data-network-node]")).toHaveCount(1);
    await expect(chart.locator("[data-network-edge]")).toHaveCount(0);
    await expect(chart.locator(".rain-network-feedback")).not.toContainText("已选择");
    await page.getByRole("combobox", { name:"网络数据状态" }).selectOption("empty");
    await expect(chart).toContainText("暂无");
    expect(errors).toEqual([]);
  });

  test(`${motion}: switching style and palette retains selection, and updated long graphs avoid real text bounds`, async ({ page }) => {
    test.setTimeout(120000);
    await mkdir(evidence, { recursive:true });
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto("/#chart-network");
    await page.getByRole("combobox", { name:"网络业务场景" }).selectOption("courses");
    const chart = page.locator('[data-network-example="courses"]'), course = fixtures.find(fixture => fixture.id === "courses")!;
    await chart.getByRole("button", { name:"数据库原理，专业课程" }).click();
    const positions = await chart.locator("[data-network-node]").evaluateAll(nodes => Object.fromEntries(nodes.map(node => [node.getAttribute("data-network-node"), [node.getAttribute("data-x"), node.getAttribute("data-y")]])));
    await page.getByRole("radiogroup", { name:"呈现样式" }).getByText("结构化关系", { exact:true }).click();
    await expect(chart.locator(".rain-network")).toHaveAttribute("data-variant", "structured");
    await expect(chart.getByRole("region", { name:"节点详情" })).toHaveAttribute("data-selected-node", "database");
    expect((await geometryAudit(chart, course.edges)).hits).toEqual([]);
    const structuredPositions = await chart.locator("[data-network-node]").evaluateAll(nodes => Object.fromEntries(nodes.map(node => [node.getAttribute("data-network-node"), [node.getAttribute("data-x"), node.getAttribute("data-y")]])));
    await page.getByRole("combobox", { name:"网络图表配色" }).selectOption("category-wide");
    await page.getByRole("combobox", { name:"网络关系类型" }).selectOption("supports");
    await expect(chart.getByRole("region", { name:"节点详情" })).toHaveAttribute("data-selected-node", "database");
    const remaining = await chart.locator("[data-network-node]").evaluateAll(nodes => nodes.map(node => ({ id: node.getAttribute("data-network-node")!, position: [node.getAttribute("data-x"), node.getAttribute("data-y")] })));
    for (const node of remaining) expect(node.position).toEqual(structuredPositions[node.id]);
    await page.getByRole("radiogroup", { name:"呈现样式" }).getByText("柔光网络", { exact:true }).click();
    await expect(chart.locator(".rain-network")).toHaveAttribute("data-recipe", "category-wide");
    await expect(chart.getByRole("region", { name:"节点详情" })).toHaveAttribute("data-selected-node", "database");
    const restored = await chart.locator("[data-network-node]").evaluateAll(nodes => nodes.map(node => ({id:node.getAttribute("data-network-node")!,position:[node.getAttribute("data-x"),node.getAttribute("data-y")]})));
    for (const node of restored) expect(node.position).toEqual(positions[node.id]);
    await page.getByRole("combobox", { name:"网络关系类型" }).selectOption("all");
    await chart.getByRole("button", { name:"清除节点选择" }).click();
    const facts = [];
    for (const fixture of fixtures) {
      await page.getByRole("combobox", { name:"网络业务场景" }).selectOption(fixture.id);
      await page.getByRole("radiogroup", { name:"呈现样式" }).getByText("结构化关系", {exact:true}).click();
      const example = page.locator(`[data-network-example="${fixture.id}"]`);
      const audit = await geometryAudit(example, fixture.edges);
      expect(audit.hits, `${fixture.id}/structured/normal`).toEqual([]);
      facts.push({fixture:fixture.id,state:"normal",...audit});
      await example.screenshot({path:`${evidence}/network-${fixture.id}-structured-normal-${motion}.png`});
    }
    await page.getByRole("button", { name:"更新数据", exact:true }).click();
    await page.getByRole("button", { name:"更新数据", exact:true }).click();
    await page.getByRole("combobox", { name:"网络数据状态" }).selectOption("long");
    await page.waitForTimeout(400);
    for (const fixture of fixtures) {
      await page.getByRole("combobox", { name:"网络业务场景" }).selectOption(fixture.id);
      const example = page.locator(`[data-network-example="${fixture.id}"]`);
      for (const [variant, label] of [["glow", "柔光网络"], ["structured", "结构化关系"]] as const) {
        await page.getByRole("radiogroup", { name:"呈现样式" }).getByText(label, { exact:true }).click();
        await page.waitForTimeout(300);
        const audit = await geometryAudit(example, fixture.edges);
        expect(audit.hits, `${fixture.id}/${variant}`).toEqual([]);
        facts.push({ fixture: fixture.id, ...audit });
        await example.screenshot({ path:`${evidence}/network-${fixture.id}-${variant}-long-revision2-${motion}.png` });
      }
    }
    await mkdir(evidence, { recursive:true });
    await writeFile(`${evidence}/network-real-geometry-${motion}.json`, JSON.stringify({ scope:"actual SVG text/card bounds including the source and target card interior; 401 arc-length samples per edge; normal structured and long/revision2/both styles", facts }, null, 2));
    await page.setViewportSize({ width:390, height:844 });
    await page.getByRole("combobox", { name:"网络业务场景" }).selectOption("courses");
    const narrow = page.locator('[data-network-example="courses"]');
    await expect(narrow.locator(".rain-network__scroll")).not.toBeVisible();
    await expect(narrow.locator(".rain-network__relations li")).toHaveCount(19);
    await page.setViewportSize({ width:1280, height:720 });
    await expect(narrow.locator(".rain-network__scroll")).toBeVisible();
  });
}
