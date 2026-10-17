import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@rain-next/ui";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
export function Example(){return (<Item variant="outline" render={<a href="#typography" />}>
  <ItemContent>
    <ItemTitle>文字排版规范</ItemTitle>
    <ItemDescription>查看标题、正文和关键数字的使用方式。</ItemDescription>
  </ItemContent>
  <ItemMedia className="text-rain-category-icon-neutral-3"><ArrowRightIcon aria-hidden="true" /></ItemMedia>
</Item>);}
