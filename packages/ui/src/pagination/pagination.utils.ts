export type PaginationItem = { type: "page" | "previous-ellipsis" | "next-ellipsis"; page: number };

export function assertPaginationInteger(name: string, value: number, minimum = 1) {
  if (!Number.isSafeInteger(value) || value < minimum) {
    throw new RangeError(`Pagination ${name} must be a safe integer greater than or equal to ${minimum}.`);
  }
}

export function totalPageCount(total: number, pageSize: number) {
  return Math.max(1, Math.ceil(total / pageSize));
}

export function buildPaginationItems(page: number, totalPages: number, less = false): PaginationItem[] {
  const window = less ? 3 : 5;
  if (totalPages <= window + 4) {
    return Array.from({ length: totalPages }, (_, index) => ({ type: "page", page: index + 1 }));
  }
  const siblings = (window - 1) / 2;
  let start = page - siblings, end = page + siblings;
  if (start <= 3) { start = 2; end = window + 2; }
  if (end >= totalPages - 2) { end = totalPages - 1; start = totalPages - window - 1; }
  const items: PaginationItem[] = [{ type: "page", page: 1 }];
  if (start > 3) items.push({ type: "previous-ellipsis", page: Math.max(1, page - window) });
  else if (start === 3) items.push({ type: "page", page: 2 });
  for (let value = start; value <= end; value++) items.push({ type: "page", page: value });
  if (end < totalPages - 2) items.push({ type: "next-ellipsis", page: Math.min(totalPages, page + window) });
  else if (end === totalPages - 2) items.push({ type: "page", page: totalPages - 1 });
  items.push({ type: "page", page: totalPages });
  return items;
}

export function pageAfterSizeChange(page: number, pageSize: number, nextPageSize: number, total: number | undefined) {
  const firstOffset = BigInt(page - 1) * BigInt(pageSize);
  const next = firstOffset / BigInt(nextPageSize) + 1n;
  const maximum = total === undefined ? BigInt(Number.MAX_SAFE_INTEGER) : BigInt(totalPageCount(total, nextPageSize));
  if (total === undefined && next > maximum) throw new RangeError("Pagination page exceeds the safe integer range after changing pageSize.");
  return Number(next > maximum ? maximum : next);
}

export function parseJumpPage(value: string, totalPages: number): { page: number | null; error?: string } {
  const text = value.trim();
  if (!text) return { page: null };
  const page = Number(text);
  if (!/^\d+$/.test(text) || !Number.isSafeInteger(page) || page < 1 || page > totalPages) {
    return { page: null, error: `请输入 1–${totalPages} 之间的整数页码` };
  }
  return { page };
}
