import { forwardRef, useRef, useState, type ReactNode } from "react";
import { useRender } from "@base-ui/react/use-render";
import { rainCn } from "../utils/rain-class-names";
import { avatarAssets } from "./avatar-assets";
import "./avatar.css";

export type AvatarSize = 24 | 32 | 40;
export type AvatarShape = "circle" | "square";
export interface AvatarMember { id: string; name: string; src?: string }
export interface AvatarProps extends Omit<useRender.ComponentProps<"span">, "children"> {
  src?: string;
  /** Empty when a nearby name or the enclosing action already identifies this person. */
  alt: string;
  size?: AvatarSize;
  shape?: AvatarShape;
  presence?: "online" | "offline";
  children?: ReactNode;
}

function Portrait({ src }: { src: string }) {
  const [ready, setReady] = useState(false);
  const attempt = useRef(0);
  return <img src={src} alt="" draggable={false} data-slot="portrait" data-ready={ready}
    onLoad={async event => {
      const image = event.currentTarget, current = ++attempt.current;
      try {
        await image.decode?.();
        if (image.isConnected && current === attempt.current) setReady(true);
      } catch { if (current === attempt.current) setReady(false); }
    }}
    onError={() => { attempt.current++; setReady(false); }} />;
}

/** Shared by standalone portraits and both collections; decoration never clips with the image. */
export const Avatar = forwardRef<HTMLElement, AvatarProps>(function Avatar({
  src, alt, size = 32, shape = "circle", presence, render, className, children, ...props
}, ref) {
  return useRender({
    defaultTagName: "span", render, ref,
    props: {
      ...props, "data-rain-id": "ui-avatar", "data-slot": "root", "data-size": size,
      "data-shape": shape, "data-presence": presence, "data-focus": "control",
      className: rainCn("rain-avatar", className),
      children: <>
        <span className="rain-avatar__picture" role={alt ? "img" : undefined} aria-hidden={alt ? undefined : true}
          aria-label={alt ? `${alt}${presence === "offline" ? "，离线" : presence === "online" ? "，在线" : ""}` : undefined}>
          <img src={avatarAssets.default} alt="" draggable={false} data-slot="fallback" />
          {src && src !== avatarAssets.default ? <Portrait key={src} src={src} /> : null}
        </span>
        {children}
      </>,
    },
  });
});
