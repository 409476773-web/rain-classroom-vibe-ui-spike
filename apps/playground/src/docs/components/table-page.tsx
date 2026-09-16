import { useState } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Inline, Stack } from "@rain-next/layouts";
import { Checkbox, Link, Tag } from "@rain-next/ui";
import { DataTableRecipe } from "../../../../prototype/src/data-table-recipe";
import "./layouts-page.css";

export function TablePage() {
  const [dark, setDark] = useState(false), [compact, setCompact] = useState(true);
  return <DensityProvider density={compact ? "compact" : "default"}><main className="layouts-review py-rain-32" data-rain-id="table-page" data-rain-theme={dark ? "dark" : "light"}>
    <Stack gap={24} className="layouts-review-content"><Stack gap={12}><Link href="#components">返回组件</Link><h1 id="table-title" tabIndex={-1}>表格与数据管理</h1>
      <p>用表格扫描信息，用筛选缩小范围，再对选中的资料进行操作。</p><Inline><Tag size={20} color="neutral">待评审候选</Tag></Inline></Stack>
      <Inline gap={16} aria-label="预览设置"><Checkbox label="深色主题" checked={dark} onCheckedChange={setDark} /><Checkbox label="紧凑密度" checked={compact} onCheckedChange={setCompact} /></Inline>
      <DataTableRecipe />
      <details><summary>使用与组合边界</summary><Stack gap={12} className="pt-rain-16">
        <p>Table 保留原生表格、表头、行、单元格和标题语义。横向滚动属于具名 TableScrollArea；分页放在滚动区外，统一提供总数、页码、每页条数和跳页。Empty 的标题、说明和操作可以独立组合。</p>
        <p>本例以客户端方式处理全部虚构资料。查询改变时回到首页并清空选择；翻页与视图切换保留按资料 ID 记录的选择；列设置只影响表格。接入真实接口时，宿主应明确采用服务端模式并处理过期请求。</p>
        <pre>{`<TableScrollArea aria-label="资料表滚动区">
  <Table><TableCaption>课程资料</TableCaption>
    <TableHeader><TableRow><TableHead>名称</TableHead></TableRow></TableHeader>
    <TableBody><TableRow><TableCell>教学案例</TableCell></TableRow></TableBody>
  </Table>
</TableScrollArea>
<Pagination variant="data" total={total} page={page} pageSize={pageSize}
  pageSizePlacement="inline" onChange={({ page, pageSize }) => setPagination({ page, pageSize })} />`}</pre>
        <p>安装入口：当前工作区 @rain-next/ui。公共表格不依赖数据引擎；可复制的本地配方位于 apps/prototype/src/data-table-recipe.tsx，锁定 TanStack Table 8.21.3。保留 Rain 样式、Focus 与主题入口。</p>
        <p>来源沿用 Rain 资源管理的表格/卡片结构，样式使用 Rain Token；当前资料库页面已获限定视觉确认；RN-09在独立原型 #bm-a 复用此页并补齐异步刷新与状态合同。共享组件、正式场景和真实辅助技术的验收各自记录。</p>
      </Stack></details>
    </Stack>
  </main></DensityProvider>;
}
