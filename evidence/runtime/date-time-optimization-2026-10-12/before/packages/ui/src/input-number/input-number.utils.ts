export interface NumericConstraints { min?: number; max?: number; precision?: number; required?: boolean }
export type NumericError = "required" | "incomplete" | "unsafe" | "precision" | "min" | "max";
export interface InputNumberValidity { valid: boolean; reason: NumericError | null; message: string }
export interface NumericDraft extends InputNumberValidity {
  kind: "empty" | "incomplete" | "number" | "invalid";
  value: number | null;
}

/** Expand Number's exponent notation for editing; user-entered exponent syntax is not enabled. */
export function numberText(value: number | null): string {
  if (value === null) return "";
  const text = String(value);
  if (!/[eE]/.test(text)) return text;
  const [coefficient = "", exponent = "0"] = text.toLowerCase().split("e");
  const sign = coefficient.startsWith("-") ? "-" : "";
  const [integer = "", fraction = ""] = coefficient.replace("-", "").split(".");
  const digits = integer + fraction;
  const point = integer.length + Number(exponent);
  return sign + (point <= 0 ? `0.${"0".repeat(-point)}${digits}`
    : point >= digits.length ? digits + "0".repeat(point - digits.length)
      : `${digits.slice(0, point)}.${digits.slice(point)}`);
}

function canonical(text: string): string {
  const negative = text.startsWith("-");
  const [whole = "", fraction = ""] = text.replace(/^-/, "").split(".");
  const integer = whole.replace(/^0+/, "") || "0";
  const decimal = fraction.replace(/0+$/, "");
  return `${negative && (integer !== "0" || decimal) ? "-" : ""}${integer}${decimal ? `.${decimal}` : ""}`;
}

export function inspectNumber(text: string, { min, max, precision, required }: NumericConstraints = {}): NumericDraft {
  const result: NumericDraft = { kind: "number", value: null, valid: true, reason: null, message: "" };
  const invalid = (reason: NumericError, message: string) => ({ ...result, valid: false, reason, message });
  if (!text) {
    result.kind = "empty";
    return required ? invalid("required", "请填写数值") : result;
  }
  if (["-", ".", "-."].includes(text)) {
    result.kind = "incomplete";
    return invalid("incomplete", "请输入完整数字");
  }
  if (!/^-?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) {
    result.kind = "invalid";
    return invalid("incomplete", "请输入完整数字");
  }
  const value = Number(text);
  if (!Number.isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER || canonical(text) !== canonical(numberText(value))) {
    return invalid("unsafe", "数值超出安全精度，请减少位数");
  }
  result.value = Object.is(value, -0) ? 0 : value;
  const fraction = (text.split(".")[1] ?? "").replace(/0+$/, "");
  if (precision !== undefined && fraction.length > precision) return invalid("precision", precision === 0 ? "请输入整数" : `最多保留 ${precision} 位小数`);
  if (min !== undefined && value < min) return invalid("min", `不能小于 ${min}`);
  if (max !== undefined && value > max) return invalid("max", `不能超过 ${max}`);
  return result;
}

export function finishNumber(text: string): string {
  return /^-?\d+\.$/.test(text) ? text.slice(0, -1) : text;
}

function scaled(text: string, places: number): bigint {
  const [integer = "", fraction = ""] = text.replace(/^-/, "").split(".");
  return BigInt((integer || "0") + fraction.padEnd(places, "0")) * (text.startsWith("-") ? -1n : 1n);
}

/** Step decimal digits, then convert only after the result passes the same safe-number check. */
export function stepNumber(text: string, direction: 1 | -1, step: number, constraints: NumericConstraints): string | null {
  const display = finishNumber(text);
  const current = inspectNumber(display, constraints);
  if (current.kind !== "empty" && (!current.valid && current.reason !== "min" && current.reason !== "max")) return null;
  const { min, max } = constraints;
  if (current.value !== null && ((direction === 1 && max !== undefined && current.value >= max)
    || (direction === -1 && min !== undefined && current.value <= min))) return null;
  const base = display || "0", stepText = numberText(step);
  const baseFraction = base.split(".")[1]?.length ?? 0;
  const places = Math.max(baseFraction, stepText.split(".")[1]?.length ?? 0);
  const next = scaled(base, places) + BigInt(direction) * scaled(stepText, places);
  const digits = (next < 0n ? -next : next).toString().padStart(places + 1, "0");
  const integerWidth = base.replace(/^-/, "").split(".")[0]?.length ?? 1;
  const integer = (places ? digits.slice(0, -places) : digits).padStart(integerWidth, "0");
  const fraction = places ? digits.slice(-places).replace(/0+$/, "").padEnd(baseFraction, "0") : "";
  let candidate = `${next < 0n ? "-" : ""}${integer}${fraction ? `.${fraction}` : ""}`;
  const value = Number(candidate);
  // Limit only the boundary in the direction of travel. An existing 120 must decrease to 119.
  if (direction === 1 && max !== undefined && value > max) candidate = numberText(max);
  if (direction === -1 && min !== undefined && value < min) candidate = numberText(min);
  if (current.kind === "empty") candidate = numberText(Math.min(max ?? Infinity, Math.max(min ?? -Infinity, Number(candidate))));
  const checked = inspectNumber(candidate, constraints);
  if (checked.reason === "unsafe" || checked.reason === "precision") return null;
  return candidate;
}

export function checkNumberOptions({ min, max, precision }: NumericConstraints, step: number) {
  for (const limit of [min, max]) if (limit !== undefined && (!Number.isFinite(limit) || Math.abs(limit) > Number.MAX_SAFE_INTEGER)) throw new Error("InputNumber limits must be finite safe numbers.");
  if (min !== undefined && max !== undefined && min > max) throw new Error("InputNumber min must not exceed max.");
  if (precision !== undefined && (!Number.isInteger(precision) || precision < 0 || precision > 15)) throw new Error("InputNumber precision must be an integer from 0 to 15.");
  if (!Number.isFinite(step) || step <= 0 || !inspectNumber(numberText(step), { precision }).valid) throw new Error("InputNumber step must be positive, safe and compatible with precision.");
}
