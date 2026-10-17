import { Button, Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@rain-next/ui";

export function CourseMaterialItem({ onOpenDetails }: { onOpenDetails: () => void }) {
  return (
    <ItemGroup aria-label="课程资料">
      <div role="listitem">
        <Item variant="outline">
          <ItemContent>
            <ItemTitle>第一讲阅读资料</ItemTitle>
            <ItemDescription>PDF · 12 页</ItemDescription>
          </ItemContent>
          <ItemActions><Button variant="text" onClick={onOpenDetails}>查看详情</Button></ItemActions>
        </Item>
      </div>
    </ItemGroup>
  );
}
