"use client";

import { useEffect, useRef } from "react";

export type ColumnItem = {
  id: string;
  label: string;
  denseCarb?: boolean;
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

export function FoodColumn({
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
}: FoodColumnProps) {
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!isColumnFocused) return;
    rowRefs.current[focusedIndex]?.scrollIntoView({ block: "nearest" });
  }, [focusedIndex, isColumnFocused]);

  return (
    <section
      className="flex min-h-0 min-w-0 flex-1 flex-col border-r border-sx-surface-muted last:border-r-0"
      aria-label={title}
    >
      <header className="sticky top-0 z-10 flex max-h-[72px] flex-col justify-center gap-2 border-b border-sx-surface-muted bg-sx-canvas-elevated px-4 py-2">
        <h2 className="text-xs font-semibold tracking-[0.12em] text-sx-text-primary uppercase">
          {title}
        </h2>
        <label className="block">
          <span className="sr-only">Filter {title}</span>
          <input
            type="search"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            onFocus={onFocusColumn}
            placeholder="Filter…"
            className="fm-filter h-8 w-full border border-sx-surface-muted bg-sx-canvas-elevated px-2.5 text-sm text-sx-text-primary placeholder:text-sx-text-tertiary"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
      </header>

      <div
        role="listbox"
        aria-label={title}
        tabIndex={0}
        onFocus={onFocusColumn}
        onKeyDown={onKeyDown}
        className="fm-listbox fm-column-scroll min-h-0 flex-1 overflow-y-auto outline-none"
      >
        {items.length === 0 ? (
          <p className="px-4 py-3 text-sm text-sx-text-tertiary">No matches</p>
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
                className="fm-row flex w-full cursor-pointer items-center px-4 text-left text-sm text-sx-text-primary"
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
        <p className="border-t border-sx-surface-muted px-4 py-2 text-[11px] leading-snug text-sx-text-secondary">
          {footnote}
        </p>
      ) : null}
    </section>
  );
}
