import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio host contract", () => {
  it("keeps host styles and refs while ratio owns its reserved geometry", () => {
    const ref = createRef<HTMLDivElement>();
    render(<AspectRatio ratio={16 / 9} ref={ref} data-testid="cover"
      style={{ backgroundColor: "red", width: 320, aspectRatio: "1" }}><span>课程封面</span></AspectRatio>);
    const cover = screen.getByTestId("cover");
    expect(ref.current).toBe(cover);
    expect(cover.style.backgroundColor).toBe("red");
    expect(cover.style.width).toBe("320px");
    expect(Number(cover.style.aspectRatio.split("/")[0])).toBe(16 / 9);
    expect(cover).not.toHaveAttribute("role");
  });

  it.each([0, -1, NaN, Infinity, -Infinity])("rejects unusable ratio %s rather than losing reserved space", ratio => {
    expect(() => renderToStaticMarkup(<AspectRatio ratio={ratio} />)).toThrow("AspectRatio ratio must be a finite positive number.");
  });
});
