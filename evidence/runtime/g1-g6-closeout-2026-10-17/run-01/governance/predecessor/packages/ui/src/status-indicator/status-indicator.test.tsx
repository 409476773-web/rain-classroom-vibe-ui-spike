import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Avatar } from "../avatar/avatar";
import { VolumeIcon } from "../icons/volume";
import { ActivityOverlay, StatusIndicator, StatusIndicatorGroup } from "./status-indicator";

it("keeps decorations passive, labelled and limited to two edge indicators", () => {
  const { container, rerender } = render(<Avatar alt="林雨">
    <StatusIndicatorGroup position="bottom-start">
      <StatusIndicator label="麦克风已开启" icon={<VolumeIcon />} tone="success" />
      <StatusIndicator label="电脑加入" icon={<VolumeIcon />} />
      <StatusIndicator label="第三项不展示" icon={<VolumeIcon />} />
    </StatusIndicatorGroup>
    <ActivityOverlay label="正在发言" icon={<VolumeIcon />} motion="pulse" />
  </Avatar>);
  expect(screen.getByRole("img", { name: "正在发言" })).toBeInTheDocument();
  expect(container.querySelectorAll('.rain-status-indicator-group > [data-rain-id="ui-status-indicator"]')).toHaveLength(2);
  expect(container.querySelector("button, [tabindex]")).toBeNull();
  expect(container.querySelector('[data-rain-id="ui-activity-overlay"]')).toHaveAttribute("data-motion", "pulse");
  rerender(<Avatar alt="林雨"><ActivityOverlay active={false} label="正在发言" icon={<VolumeIcon />} /></Avatar>);
  expect(screen.queryByRole("img", { name: "正在发言" })).toBeNull();
});
