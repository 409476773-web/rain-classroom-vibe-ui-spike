import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import * as parts from "./drawer";

it("exports a native scrolling Body with forwarded ref and events", () => {
  expect(parts).toHaveProperty("DrawerBody");
  const Body = (parts as typeof parts & { DrawerBody: import("react").ComponentType<import("react").ComponentPropsWithRef<"div">> }).DrawerBody;
  const ref = createRef<HTMLDivElement>(), onScroll = vi.fn();
  render(<Body ref={ref} className="consumer-layout" aria-label="任务正文" onScroll={onScroll}>正文</Body>);
  expect(ref.current).toBe(screen.getByLabelText("任务正文"));
  expect(ref.current).toHaveAttribute("data-slot", "drawer-body");
  expect(ref.current).toHaveClass("rain-drawer__body", "consumer-layout");
  fireEvent.scroll(ref.current!);
  expect(onScroll).toHaveBeenCalledOnce();
});
