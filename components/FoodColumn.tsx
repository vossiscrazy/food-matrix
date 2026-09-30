"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export type ColumnItem = {
  id: string;
  label: string;
  denseCarb?: boolean;
};

export type FoodColumnHandle = {
  focusList: () => void;
  scrollSelectedIntoView: () => void;
};

type FoodColumnProps = {
  title: string;
  items: ColumnItem[];
  filter: string;
  onFilterChange: (value: string) => void;
  selectedId: string | null;
  focusedIndex: number;
  isColumnFocused: boolean;
  footnote?: string;
  onSelect: (id: string) => void;
  onFocusColumn: () => void;
  onFocusIndex: (index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const FoodColumn = forwardRef<FoodColumnHandle, FoodColumnProps>(
  function FoodColumn(
    {
      title,
      items,
      filter,
      onFilterChange,
      selectedId,
      focusedIndex,
      isColumnFocused,
      footnote,
      onSelect,
      onFocusColumn,
      onFocusIndex,
      onKeyDown,
    },
    ref,
  ) {
    const listRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useImperativeHandle(ref, () => ({
      focusList: () => {
        listRef.current?.focus();
      },
      scrollSelectedIntoView: () => {
        const idx = items.findIndex((item) => item.id === selectedId);
        if (idx < 0) return;
        rowRefs.current[idx]?.scrollIntoView({ block: "nearest" });
      },
    }));

    useEffect(() => {
      if (!isColumnFocused) return;
      const el = rowRefs.current[focusedIndex];
      el?.scrollIntoView({ block: "nearest" });
    }, [focusedIndex, isColumnFocused]);

    return (
      <section
        className="flex min-h-0 min-w-0 flex-1 flex-col border-r border-border last:border-r-0"
        aria-label={title}
      >
        <header className="sticky top-0 z-10 border-b border-border bg-header-bg px-4 pb-3 pt-3">
          <h2 className="text-xs font-semibold tracking-[0.12em] text-text uppercase">
            {title}
          </h2>
          <label className="mt-2 block">
            <span className="sr-only">Filter {title}</span>
            <input
              type="search"
              value={filter}
              onChange={(e) => onFilterChange(e.target.value)}
              onFocus={onFocusColumn}
              placeholder="Filter…"
              className="fm-filter w-full rounded-md border border-border-soft bg-surface px-2.5 py-1.5 text-sm text-text placeholder:text-text-faint"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
        </header>

        <div
          ref={listRef}
          role="listbox"
          aria-label={title}
          tabIndex={0}
          onFocus={onFocusColumn}
          onKeyDown={onKeyDown}
          className="fm-listbox fm-column-scroll min-h-0 flex-1 overflow-y-auto outline-none"
        >
          {items.length === 0 ? (
            <p className="px-4 py-3 text-sm text-text-faint">No matches</p>
          ) : (
            items.map((item, index) => {
              const selected = selectedId === item.id;
              const focused = isColumnFocused && focusedIndex === index;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  type="button"
                  role="option"
                  tabIndex={-1}
                  aria-selected={selected}
                  data-selected={selected ? "true" : "false"}
                  data-focused={focused ? "true" : "false"}
                  className="fm-row flex w-full cursor-pointer items-center px-4 text-left text-sm text-text hover:bg-[#f0f0ed]"
                  onClick={() => {
                    onFocusColumn();
                    onFocusIndex(index);
                    onSelect(item.id);
                  }}
                  onMouseEnter={() => {
                    if (isColumnFocused) onFocusIndex(index);
                  }}
                >
                  <span>
                    {item.label}
                    {item.denseCarb ? "*" : ""}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {footnote ? (
          <p className="border-t border-border-soft px-4 py-3 text-[11px] leading-snug text-text-faint">
            {footnote}
          </p>
        ) : null}
      </section>
    );
  },
);
