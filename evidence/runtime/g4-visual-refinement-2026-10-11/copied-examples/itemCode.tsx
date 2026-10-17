import { useState } from "react";
import { Button, Dialog, Item, ItemActions, ItemContent, ItemDescription,
  ItemGroup, ItemMedia, ItemSeparator, ItemTitle, Link, Tag } from "@rain-next/ui";
import { FileIcon } from "@rain-next/ui/icons/file";

const resources = [
  { id: "guide", label: "课程导读", title: "课程导读：从问题到证据", category: "课前必读",
    meta: "阅读材料 · 约 5 分钟 · 林老师", available: true,
    body: "先描述你观察到的现象，再说明它能够支持什么判断。" },
  { id: "evidence", label: "案例阅读", title: "案例阅读：如何识别一条可靠的学习证据", category: "拓展阅读",
    meta: "案例材料 · 约 8 分钟 · 林老师", available: true,
    body: "比较两份学习记录，找出支持判断的具体依据。" },
  { id: "discussion", label: "课堂讨论任务", title: "课堂讨论任务与提交说明", category: "课堂活动",
    meta: "讨论任务 · 10 月 16 日 09:00 开放", available: false, body: "" },
];

export function CourseResources() {
  const [readIds, setReadIds] = useState<string[]>([]);
  return <section aria-label="课程资料示例">
    <h3 className="rain-type-heading-section">从问题到证据</h3>
    <ItemGroup aria-label="本讲课程资料">
      {resources.map((resource, index) => <div role="listitem" key={resource.id}>
        {index > 0 && <ItemSeparator decorative />}
        <Dialog.Root>
          <Item>
            <ItemMedia><FileIcon aria-hidden="true" /></ItemMedia>
            <ItemContent>
              <ItemTitle>{resource.title}</ItemTitle>
              <Tag size={20} color={index === 0 ? "brand" : "neutral"}>{resource.category}</Tag>
              <ItemDescription>{resource.meta}</ItemDescription>
              <span className="rain-type-ui-caption">{resource.available
                ? readIds.includes(resource.id) ? "已读" : "未读"
                : "尚未开放"}</span>
            </ItemContent>
            <ItemActions>
              {resource.available ? <>
                <Dialog.Trigger render={<Button variant="text" size="regular" tone="brand"
                  aria-label={"阅读" + resource.label}>阅读</Button>} />
                <Link href={"data:text/markdown;charset=utf-8," + encodeURIComponent("# " + resource.title + "\n\n" + resource.body)}
                  download={resource.label + ".md"} aria-label={"下载" + resource.label}>下载</Link>
              </> : <Button variant="text" size="regular" disabled>未开放</Button>}
            </ItemActions>
          </Item>
          {resource.available && <Dialog.Content>
            <Dialog.Header><Dialog.Title>{resource.title}</Dialog.Title><Dialog.Description>{resource.meta}</Dialog.Description></Dialog.Header>
            <Dialog.Body><article className="rain-type-reading-default"><p>{resource.body}</p></article></Dialog.Body>
            <Dialog.Footer>
              <Dialog.Close render={<Button variant="text">返回列表</Button>} />
              <Dialog.Close render={<Button variant="primary" onClick={() => setReadIds(ids =>
                ids.includes(resource.id) ? ids : [...ids, resource.id])}>
                {readIds.includes(resource.id) ? "完成阅读" : "标记已读"}</Button>} />
            </Dialog.Footer>
          </Dialog.Content>}
        </Dialog.Root>
      </div>)}
    </ItemGroup>
    <p role="status" className="rain-type-ui-caption">已读 {readIds.length} / 2 份</p>
  </section>;
}
