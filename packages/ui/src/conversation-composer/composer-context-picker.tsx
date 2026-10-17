import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { SearchIcon } from "@rain-next/ui/icons/search";
import { Button } from "../button/button";
import { Checkbox, type CheckboxPart } from "../checkbox/checkbox";
import { Input } from "../input/input";
import { Popover } from "../popover/popover";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import type { ComposerReference, ComposerReferenceService } from "./types";

const referenceRecipe = defineRainLocalRecipe<CheckboxPart, "ui-checkbox">({
  id: "composer-picker-reference", scope: "feature", origin: "ui-checkbox",
  classes: { label: "rain-composer-picker-label" }, modifiedParts: ["label"],
  candidateTokens: [], promotionStatus: "not-proposed",
});

export type ComposerContextPickerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: ComposerReference[];
  service: ComposerReferenceService;
  onConfirm: (items: ComposerReference[]) => void;
  returnFocus: RefObject<HTMLElement | null>;
  onApplied?: () => void;
};

export function ComposerContextPicker({ open, onOpenChange, selected, service, onConfirm, returnFocus, onApplied }: ComposerContextPickerProps) {
  const [query, setQuery] = useState("");
  const [retry, setRetry] = useState(0);
  const [items, setItems] = useState<ComposerReference[]>([]);
  const [selection, setSelection] = useState<ComposerReference[]>([]);
  const [hadSelectionOnOpen, setHadSelectionOnOpen] = useState(false);
  const [reviewed, setReviewed] = useState<ComposerReference[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string>();
  const searchInput = useRef<HTMLInputElement>(null);
  const queryRequest = useRef<AbortController | null>(null);
  const resolveRequest = useRef<AbortController | null>(null);
  const queryVersion = useRef(0);
  const resolveVersion = useRef(0);
  const isOpen = useRef(open);
  const applied = useRef(false);
  isOpen.current = open;

  const invalidate = useCallback(() => {
    queryVersion.current += 1;
    resolveVersion.current += 1;
    queryRequest.current?.abort();
    resolveRequest.current?.abort();
  }, []);

  useLayoutEffect(() => {
    if (open) {
      applied.current = false;
      setQuery("");
      setItems([]);
      setSelection([...new Map(selected.map(item => [item.id, { ...item }])).values()]);
      setHadSelectionOnOpen(selected.length > 0);
      setReviewed([]);
      setChecking(false);
      setError(undefined);
      setLoadFailed(false);
    }
    return invalidate;
    // An opening takes a snapshot; later draft changes must not replace temporary choices.
  }, [open, invalidate]);

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    queryRequest.current = controller;
    const version = ++queryVersion.current;
    setLoading(true);
    setLoadFailed(false);
    Promise.resolve().then(() => service.query(query, { signal: controller.signal })).then(result => {
      if (controller.signal.aborted || version !== queryVersion.current || !isOpen.current) return;
      const refreshed = new Map(result.map(item => [item.id, item]));
      setItems([...refreshed.values()]);
      // Retained choices keep the latest known availability across later searches.
      setSelection(current => current.map(item => {
        const fresh = refreshed.get(item.id);
        return !fresh ? item : fresh.availability === "available" ? fresh : { ...fresh, name: item.name };
      }));
      // A fresh result supersedes the earlier confirmation-time availability snapshot.
      const refreshedIds = new Set(result.map(item => item.id));
      setReviewed(current => current.filter(item => !refreshedIds.has(item.id)));
      setLoading(false);
    }).catch(() => {
      if (controller.signal.aborted || version !== queryVersion.current || !isOpen.current) return;
      setItems([]);
      setLoading(false);
      setLoadFailed(true);
    });
    return () => controller.abort();
  }, [open, query, retry, service]);

  function close() {
    invalidate();
    onOpenChange(false);
  }

  async function confirm() {
    if (checking || (selection.length === 0 && !hadSelectionOnOpen)) return;
    const snapshot = selection;
    const controller = new AbortController();
    resolveRequest.current = controller;
    const version = ++resolveVersion.current;
    setChecking(true);
    setError(undefined);
    queryRequest.current?.abort();
    queryVersion.current += 1;
    setLoading(false);
    try {
      const resolved = await service.resolve(snapshot.map(item => item.id), { signal: controller.signal });
      if (controller.signal.aborted || version !== resolveVersion.current || !isOpen.current) return;
      const byId = new Map(resolved.map(item => [item.id, item]));
      const verified = snapshot.map(item => {
        const resolvedItem = byId.get(item.id);
        if (!resolvedItem) return {
          ...item, availability: "unavailable" as const, unavailableReason: "资料不存在或已被移除",
        };
        return resolvedItem.availability === "available" ? resolvedItem : { ...resolvedItem, name: item.name };
      });
      if (verified.some(item => item.availability !== "available")) {
        setSelection(verified);
        setReviewed(verified);
        setError("部分资料已不可用，请取消勾选后重试。");
        setChecking(false);
        return;
      }
      applied.current = true;
      invalidate();
      onConfirm(verified);
      onOpenChange(false);
      onApplied?.();
    } catch {
      if (controller.signal.aborted || version !== resolveVersion.current || !isOpen.current) return;
      setChecking(false);
      setError("资料校验失败，请重试。");
    }
  }

  const chosenIds = new Set(selection.map(item => item.id));
  const reviewedById = new Map(reviewed.map(item => [item.id, item]));
  const resultIds = new Set(items.map(item => item.id));
  const resultItems = items.map(item => reviewedById.get(item.id) ?? item);
  const retainedItems = selection.filter(item => !resultIds.has(item.id)).map(item => reviewedById.get(item.id) ?? item);
  const searching = Boolean(query.trim());

  function renderChoice(item: ComposerReference) {
    return <div key={item.id} className="rain-composer-picker-option"
      data-selected={chosenIds.has(item.id)} data-unavailable={item.availability === "unavailable"}>
      <Checkbox value={item.id} label={item.name}
        className="rain-composer-picker-item" localRecipe={referenceRecipe} checked={chosenIds.has(item.id)}
        description={item.availability === "unavailable" ? item.unavailableReason || "资料暂不可用" : undefined}
        disabled={checking || (item.availability === "unavailable" && !chosenIds.has(item.id))}
        onCheckedChange={checked => {
          setError(undefined);
          setSelection(current => checked ? [...current, item] : current.filter(value => value.id !== item.id));
        }} />
    </div>;
  }

  return <Popover.Root open={open} onOpenChange={next => { if (!next) close(); }}>
    <Popover.Trigger render={<button type="button" hidden tabIndex={-1} aria-hidden="true" />} />
    <Popover.Content width={360} className="rain-composer-picker" initialFocus={searchInput}
      finalFocus={() => applied.current ? false : returnFocus.current}
      positionerProps={{ anchor: returnFocus, side: "top", align: "start", sideOffset: 8 }}>
      <div className="rain-composer-picker-body">
        <Popover.Title>引用课程资料</Popover.Title>
        <Input ref={searchInput} size={36} aria-label="搜索课程资料" placeholder="搜索课程资料" leadingIcon={<SearchIcon />}
          className="rain-composer-picker-search" value={query} onValueChange={setQuery} disabled={checking} />
        <div className="rain-composer-picker-list" aria-busy={loading || checking}>
          <div className="rain-composer-picker-group" role="group" aria-label={searching ? "搜索结果" : "课程资料"}>
            {searching || retainedItems.length ? <p className="rain-composer-picker-group-title">{searching ? "搜索结果" : "课程资料"}</p> : null}
            {loading ? <p role="status" className="rain-composer-picker-state">正在加载资料…</p> : null}
            {!loading && loadFailed ? <div className="rain-composer-picker-state">
              <p role="alert">资料加载失败，请重试。</p>
              <Button variant="text" tone="brand" onClick={() => setRetry(value => value + 1)} disabled={checking}>重试</Button>
            </div> : null}
            {!loading && !loadFailed && items.length === 0 ? <p className="rain-composer-picker-state">
              {searching ? "未找到匹配的资料。" : "暂无可引用的课程资料。"}
            </p> : null}
            {resultItems.map(renderChoice)}
          </div>
          {retainedItems.length ? <div className="rain-composer-picker-group" role="group" aria-label="已选资料">
            <p className="rain-composer-picker-group-title">已选资料</p>
            {retainedItems.map(renderChoice)}
          </div> : null}
        </div>
        {error ? <p role="alert" className="rain-composer-picker-error">{error}</p> : null}
        <div className="rain-composer-picker-footer">
          <span aria-live="polite" className="rain-composer-picker-count">已选 {selection.length} 项</span>
          <Button onClick={close}>取消</Button>
          <Button variant="primary" onClick={() => { void confirm(); }} disabled={selection.length === 0 && !hadSelectionOnOpen}
            loading={checking} loadingLabel="正在校验…">添加引用</Button>
        </div>
      </div>
    </Popover.Content>
  </Popover.Root>;
}
