type Rgba = readonly [number, number, number, number];

function parseColor(color: string): Rgba {
  const channels = color.match(/[\d.]+/g)?.map(Number) ?? [];
  if (channels.length < 3) {
    throw new Error(`Unsupported browser color: ${color}`);
  }

  return [
    channels[0] ?? 0,
    channels[1] ?? 0,
    channels[2] ?? 0,
    channels[3] ?? 1,
  ];
}

function composite(foreground: Rgba, background: Rgba): Rgba {
  const alpha = foreground[3] + background[3] * (1 - foreground[3]);
  if (alpha === 0) return [0, 0, 0, 0];

  return [
    (foreground[0] * foreground[3] +
      background[0] * background[3] * (1 - foreground[3])) /
      alpha,
    (foreground[1] * foreground[3] +
      background[1] * background[3] * (1 - foreground[3])) /
      alpha,
    (foreground[2] * foreground[3] +
      background[2] * background[3] * (1 - foreground[3])) /
      alpha,
    alpha,
  ];
}

function luminance(color: Rgba) {
  const channels = color.slice(0, 3).map((channel) => {
    const value = channel / 255;
    return value <= 0.04045
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });

  return (
    0.2126 * (channels[0] ?? 0) +
    0.7152 * (channels[1] ?? 0) +
    0.0722 * (channels[2] ?? 0)
  );
}

export function contrastRatio(foreground: string, background: string) {
  const white: Rgba = [255, 255, 255, 1];
  const flattenedBackground = composite(parseColor(background), white);
  const flattenedForeground = composite(
    parseColor(foreground),
    flattenedBackground,
  );
  const values = [
    luminance(flattenedForeground),
    luminance(flattenedBackground),
  ].sort((left, right) => right - left);

  return ((values[0] ?? 0) + 0.05) / ((values[1] ?? 0) + 0.05);
}
