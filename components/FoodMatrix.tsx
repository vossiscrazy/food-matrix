"use client";

import { useCallback, useMemo, useState } from "react";
import { FoodColumn, type ColumnItem } from "@/components/FoodColumn";
import { foodLists } from "@/lib/food-data";
import {
  COLUMN_ORDER,
  DENSE_CARB_FOOTNOTE_SHORT,
  type ColumnId,
  type Selection,
} from "@/lib/types";

function toggleValue(current: string | null, next: string): string | null {
  return current === next ? null : next;
}

function emptySelection(): Selection {
  return { fat: null, protein: null, vegetable: null, spice: null };
}

function emptyFilters(): Record<ColumnId, string> {
  return { fat: "", protein: "", vegetable: "", spice: "" };
}

function emptyFocusedIndex(): Record<ColumnId, number> {
  return { fat: 0, protein: 0, vegetable: 0, spice: 0 };
}

function matchesFilter(label: string, filter: string): boolean {
  const q = filter.trim().toLowerCase();
  if (!q) return true;
  return label.toLowerCase().includes(q);
}

export function FoodMatrix() {
  const allItems: Record<ColumnId, ColumnItem[]> = useMemo(
    () => ({
      protein: foodLists.proteins.map((name) => ({ id: name, label: name })),
      vegetable: foodLists.vegetables.map((v) => ({
        id: v.name,
        label: v.name,
        denseCarb: Boolean(v.denseCarb),
      })),
      fat: foodLists.fats.map((name) => ({ id: name, label: name })),
      spice: foodLists.herbsAndSpices.map((name) => ({
        id: name,
        label: name,
      })),
    }),
    [],
  );

  const [selection, setSelection] = useState<Selection>(emptySelection);
  const [filters, setFilters] = useState<Record<ColumnId, string>>(emptyFilters);
  const [focusedColumn, setFocusedColumn] = useState<ColumnId>("protein");
  const [focusedIndex, setFocusedIndex] =
    useState<Record<ColumnId, number>>(emptyFocusedIndex);

  const visibleItems = useMemo(() => {
    const next = {} as Record<ColumnId, ColumnItem[]>;
    for (const col of COLUMN_ORDER) {
      next[col.id] = allItems[col.id].filter((item) =>
        matchesFilter(item.label, filters[col.id]),
      );
    }
    return next;
  }, [allItems, filters]);

  const selectInColumn = useCallback((column: ColumnId, id: string) => {
    setSelection((prev) => ({
      ...prev,
      [column]: toggleValue(prev[column], id),
    }));
  }, []);

  const setFilter = useCallback((column: ColumnId, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
    setFocusedIndex((prev) => ({ ...prev, [column]: 0 }));
  }, []);

  const handleKeyDown = useCallback(
    (column: ColumnId) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      const items = visibleItems[column];
      const index = focusedIndex[column];

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (items.length === 0) return;
        setFocusedIndex((prev) => ({
          ...prev,
          [column]: Math.min(items.length - 1, index + 1),
        }));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (items.length === 0) return;
        setFocusedIndex((prev) => ({
          ...prev,
          [column]: Math.max(0, index - 1),
        }));
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const item = items[index];
        if (item) selectInColumn(column, item.id);
        return;
      }

      if (e.key === "Home") {
        e.preventDefault();
        setFocusedIndex((prev) => ({ ...prev, [column]: 0 }));
        return;
      }

      if (e.key === "End") {
        e.preventDefault();
        setFocusedIndex((prev) => ({
          ...prev,
          [column]: Math.max(0, items.length - 1),
        }));
      }
    },
    [focusedIndex, selectInColumn, visibleItems],
  );

  return (
    <div className="box-border flex h-dvh min-h-[640px] flex-col bg-sx-canvas px-8 py-8 text-sx-text-primary">
      <main className="mx-auto flex min-h-0 w-full max-w-[1440px] min-w-0 flex-1 overflow-hidden border border-sx-surface-muted bg-sx-canvas-raised">
        <div className="flex min-h-0 w-full min-w-[1280px] flex-1">
          {COLUMN_ORDER.map((col) => (
            <FoodColumn
              key={col.id}
              title={col.title}
              items={visibleItems[col.id]}
              filter={filters[col.id]}
              onFilterChange={(value) => setFilter(col.id, value)}
              selectedId={selection[col.id]}
              focusedIndex={focusedIndex[col.id]}
              isColumnFocused={focusedColumn === col.id}
              footnote={
                col.id === "vegetable" ? DENSE_CARB_FOOTNOTE_SHORT : undefined
              }
              onSelect={(id) => selectInColumn(col.id, id)}
              onFocusColumn={() => setFocusedColumn(col.id)}
              onFocusIndex={(index) =>
                setFocusedIndex((prev) => ({ ...prev, [col.id]: index }))
              }
              onKeyDown={handleKeyDown(col.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
