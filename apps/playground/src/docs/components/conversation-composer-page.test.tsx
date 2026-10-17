import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it } from "vitest";
import { ConversationComposerPage } from "./conversation-composer-page";
afterEach(cleanup);
it("offers four independent surface/layout examples and preserves a draft on expand", async()=>{
  const user=userEvent.setup();const {container}=render(<ConversationComposerPage/>);
  expect(container.querySelectorAll('[data-rain-id="recipe-conversation-composer"]')).toHaveLength(5);
  const form=screen.getByRole("form",{name:"灰底紧凑示例"});
  await user.type(within(form).getByRole("textbox"),"保留这条观察");
  await user.click(within(form).getByRole("button",{name:"展开输入框"}));
  expect(within(form).getByRole("textbox")).toHaveValue("保留这条观察");
  expect(form).toHaveAttribute("data-layout","expanded");
  expect(screen.getByText(/真实录音/)).toBeInTheDocument();
});
