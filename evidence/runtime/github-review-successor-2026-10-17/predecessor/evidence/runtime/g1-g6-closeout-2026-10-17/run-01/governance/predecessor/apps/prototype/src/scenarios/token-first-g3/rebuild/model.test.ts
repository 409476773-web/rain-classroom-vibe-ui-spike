import { expect, test } from 'vitest';
import { queryClasses, readRoute, routeHref } from './model';
test('keeps the G3 entry, validates direct routes and preserves scope through navigation', () => {
  const route = readRoute('#token-first-g3?rebuild=1&scene=course&course=physics&scope=class-0200&page=courses');
  expect(readRoute(routeHref(route, { unit: 'unit-class-added-01' })).scope).toBe('class-0200');
  expect(readRoute('#token-first-g3?scene=evil&count=-1').scene).toBe('platform');
});
test('class query is paged, stable and search does not select a scope', () => {
  for (const count of [0, 1, 4, 12, 200]) {
    const first = queryClasses({ count, query: '', cursor: 0 });
    expect(first.total).toBe(count);
    expect(first.items.length).toBeLessThanOrEqual(20);
    if (count > 20) expect(queryClasses({ count, query: '', cursor: first.nextCursor! }).items[0]?.id).toBe('class-0021');
  }
  expect(queryClasses({ count: 200, query: '不存在', cursor: 0 }).items).toEqual([]);
  expect(queryClasses({ count: 200, query: '200', cursor: 0 }).items[0]?.id).toBe('class-0200');
});
