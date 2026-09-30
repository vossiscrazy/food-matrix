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
  selectedId: string | null;
  focusedIndex: number;
  isColumnFocused: boolean;
  footnote?: string;
  onSelect: (id: string) => void;
  onFocusColumn: () => void;
  onFocusIndex: (index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  tabIndex?: number;
};

export function FoodColumn({
  title,
  items,
  selectedId,
  focusedIndex,
  isColumnFocused,
  footnote,
  onSelect,
  onFocusColumn,
  onFocusIndex,
  onKeyDown,
  tabIndex = 0,
}: FoodColumnProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);

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
      <header className="sticky top-0 z-10 border-b border-border bg-header-bg px-4 py-3">
        <h2 className="text-xs font-semibold tracking-[0.12em] text-text uppercase">
          {title}
        </h2>
      </header>

      <div
        ref={listRef}
        role="listbox"
        aria-label={title}
        tabIndex={tabIndex}
        onFocus={onFocusColumn}
        onKeyDown={onKeyDown}
        className="fm-column-scroll min-h-0 flex-1 overflow-y-auto outline-none focus-visible:ring-1 focus-visible:ring-[var(--border)] focus-visible:ring-inset"
      >
        {items.map((item, index) => {
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
              className="fm-row flex w-full cursor-pointer items-center px-4 py-2.5 text-left text-sm text-text hover:bg-[#f0f0ed]"
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
        })}
      </div>

      {footnote ? (
        <p className="border-t border-border-soft px-4 py-3 text-[11px] leading-snug text-text-faint">
          {footnote}
        </p>
      ) : null}
    </section>
  );
}
