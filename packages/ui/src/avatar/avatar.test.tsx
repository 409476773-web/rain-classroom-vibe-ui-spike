import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Avatar } from "./avatar";
import { avatarAssets, assignAvatarAssets } from "./avatar-assets";

describe("Avatar", () => {
  it("keeps the Rain fallback until decoding succeeds and recovers from rendered-image failure", async () => {
    const { container } = render(<Avatar alt="林雨" src="/portrait.png" />);
    const image = container.querySelector<HTMLImageElement>('[data-slot="portrait"]')!;
    let decoded!: () => void;
    image.decode = vi.fn(() => new Promise<void>(resolve => { decoded = resolve; }));
    expect(image.dataset.ready).toBe("false");
    fireEvent.load(image);
    expect(image.dataset.ready).toBe("false");
    await act(async () => decoded());
    expect(image.dataset.ready).toBe("true");
    fireEvent.error(image);
    expect(image.dataset.ready).toBe("false");
    expect(container.querySelector('[data-slot="fallback"]')).toHaveAttribute("src", avatarAssets.default);
    expect(screen.getByRole("img", { name: "林雨" })).toBeInTheDocument();
  });

  it("ignores stale decoding after a source switch and handles decode rejection", async () => {
    const { container, rerender } = render(<Avatar alt="林雨" src="/a.png" />);
    const oldImage = container.querySelector<HTMLImageElement>('[data-slot="portrait"]')!;
    let decoded!: () => void;
    oldImage.decode = () => new Promise<void>(resolve => { decoded = resolve; });
    fireEvent.load(oldImage);
    rerender(<Avatar alt="林雨" src="/b.png" />);
    const nextImage = container.querySelector<HTMLImageElement>('[data-slot="portrait"]')!;
    await act(async () => decoded());
    expect(nextImage.dataset.ready).toBe("false");
    nextImage.decode = () => Promise.reject(new Error("decode"));
    await act(async () => fireEvent.load(nextImage));
    expect(nextImage.dataset.ready).toBe("false");
    rerender(<Avatar alt="林雨" src="" />);
    expect(container.querySelector('[data-slot="portrait"]')).toBeNull();
  });

  it("keeps offline distinct from disabled and supports named native actions", async () => {
    const click = vi.fn();
    const { rerender } = render(<Avatar alt="林雨" presence="offline" render={<button type="button" aria-label="查看林雨" onClick={click} />} />);
    const button = screen.getByRole("button", { name: "查看林雨" });
    expect(button).not.toBeDisabled();
    expect(screen.getByRole("img", { name: "林雨，离线" })).toBeInTheDocument();
    await userEvent.click(button);
    expect(click).toHaveBeenCalledOnce();
    rerender(<Avatar alt="" presence="online" />);
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("has 51 stable assets and assigns a full unique set independent of input order", () => {
    expect(Object.keys(avatarAssets)).toHaveLength(51);
    const members = Array.from({ length: 25 }, (_, i) => `student-${i}`);
    const first = assignAvatarAssets(members, "student");
    const reversed = assignAvatarAssets([...members].reverse(), "student");
    expect(new Set(Object.values(first))).toHaveLength(25);
    expect(first).toEqual(reversed);
    expect(() => assignAvatarAssets(["a", "a"], "teacher")).toThrow(/unique/i);
  });
});
