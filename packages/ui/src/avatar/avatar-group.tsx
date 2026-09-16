import { forwardRef, type ReactNode } from "react";
import { useRender } from "@base-ui/react/use-render";
import { IconButton } from "../icon-button/icon-button";
import { CloseIcon } from "../icons/close";
import { MoreHorizontalIcon } from "../icons/more-horizontal";
import { Popover } from "../popover/popover";
import { rainCn } from "../utils/rain-class-names";
import { Avatar, type AvatarSize, type AvatarMember } from "./avatar";

export type { AvatarMember } from "./avatar";
export interface AvatarGroupProps extends Omit<useRender.ComponentProps<"span">, "children"> {
  members: readonly AvatarMember[];
  label: string;
  size?: AvatarSize;
  /** Includes the More slot; must be an integer >= 2. */
  max?: number;
  /** Optional rich content in the existing Popover; defaults to readable member names. */
  renderMember?: (member: AvatarMember) => ReactNode;
}
export const AvatarGroup = forwardRef<HTMLElement, AvatarGroupProps>(function AvatarGroup({
  members, label, size = 32, max = 9, render, renderMember, className, ...props
}, ref) {
  if (!Number.isInteger(max) || max < 2) throw new RangeError("AvatarGroup max must be an integer >= 2");
  const limit = members.length > max ? max - 1 : members.length;
  const visible = members.slice(0, limit), remaining = members.slice(limit);
  const strip = useRender({ defaultTagName: "span", render, ref,
    props: { ...props, "aria-label": label, role: render ? undefined : "group", "data-focus": "control", className: "rain-avatar-group__strip",
      children: visible.map((member, index) => <Avatar key={member.id} src={member.src} alt={render ? "" : member.name} size={size} style={{ zIndex: visible.length - index }} />) },
  });
  return <span data-rain-id="ui-avatar-group" data-slot="root" data-size={size} className={rainCn("rain-avatar-group", className)}>
    {strip}
    {remaining.length > 0 && <Popover.Root>
      <Popover.Trigger aria-label={`查看其余${remaining.length}位成员`} className="rain-avatar-group__more">
        <MoreHorizontalIcon size={size === 24 ? 14 : 16} />
      </Popover.Trigger>
      <Popover.Content width={280}>
        <div className="rain-avatar-group__header"><Popover.Title>{label} · 其余 {remaining.length} 位</Popover.Title>
          <Popover.Close render={<IconButton icon={<CloseIcon />} size="24/16" aria-label="关闭" />} /></div>
        <ul className="rain-avatar-group__members">
          {remaining.map(member => <li key={member.id}>{renderMember ? renderMember(member) : <>
            <Avatar src={member.src} alt="" size={32} /><span>{member.name}</span>
          </>}</li>)}
        </ul>
      </Popover.Content>
    </Popover.Root>}
  </span>;
});
