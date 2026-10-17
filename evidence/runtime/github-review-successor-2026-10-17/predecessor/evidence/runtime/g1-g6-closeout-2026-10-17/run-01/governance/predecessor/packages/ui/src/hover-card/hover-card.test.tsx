import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { HoverCard } from "./hover-card";

it("opens preview content from a focusable trigger", async () => {
  const user = userEvent.setup();
  render(
    <HoverCard.Root>
      <HoverCard.Trigger href="#student">林老师</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Positioner>
          <HoverCard.Popup>批注者信息</HoverCard.Popup>
        </HoverCard.Positioner>
      </HoverCard.Portal>
    </HoverCard.Root>,
  );

  await user.tab();
  expect(screen.getByRole("link", { name: "林老师" })).toHaveFocus();
  expect(await screen.findByText("批注者信息")).toBeVisible();
});
