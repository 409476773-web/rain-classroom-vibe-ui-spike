import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@rain-next/ui";
import { ChevronRightIcon } from "@rain-next/ui/icons/chevron-right";

<Item variant="outline" render={<a href="#typography" />}>
  <ItemContent>
    <ItemTitle>文字排版规范</ItemTitle>
    <ItemDescription>查看标题、正文和关键数字的使用方式。</ItemDescription>
  </ItemContent>
  <ItemMedia><ChevronRightIcon aria-hidden="true" /></ItemMedia>
</Item>
