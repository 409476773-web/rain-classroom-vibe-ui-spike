import { forwardRef } from "react";
import { useRender } from "@base-ui/react/use-render";
import { rainCn } from "../utils/rain-class-names";
import { Avatar, type AvatarMember } from "./avatar";

export interface AvatarGridProps extends Omit<useRender.ComponentProps<"span">, "children"> {
  members: readonly AvatarMember[];
  label: string;
  emptyLabel?: string;
}
const rows = [[1], [1], [2], [1, 2], [2, 2], [2, 3], [3, 3], [1, 3, 3], [2, 3, 3], [3, 3, 3]];
export const AvatarGrid = forwardRef<HTMLElement, AvatarGridProps>(function AvatarGrid({
  members, label, emptyLabel = "暂无", render, className, ...props
}, ref) {
  const visible = members.slice(0, 9), count = visible.length;
  let offset = 0;
  return useRender({ defaultTagName: "span", render, ref,
    props: { ...props, role: render ? undefined : "img", "aria-label": count ? label : `${label}，${emptyLabel}`, "data-rain-id": "ui-avatar-grid", "data-slot": "root",
      "data-count": count, "data-focus": "control", className: rainCn("rain-avatar-grid", className),
      children: <span className="rain-avatar-grid__content">{rows[count]!.map((length, row) => {
        const rowMembers = visible.slice(offset, offset += length);
        return <span key={row} className="rain-avatar-grid__row" aria-hidden="true">
          {count === 0 ? <span data-slot="empty">{emptyLabel}</span> : rowMembers.map(member => <Avatar key={member.id} alt="" src={member.src} shape="square" />)}
        </span>;
      })}</span>,
    },
  });
});
