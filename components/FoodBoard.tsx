"use client";

import { useCallback, useMemo, useState } from "react";
import { FoodColumn, type ColumnItem } from "@/components/FoodColumn";
import { foodLists } from "@/lib/food-data";
import type { Picks } from "@/lib/picks";
import { COLUMN_ORDER, type ColumnId } from "@/lib/types";

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

type FoodBoardProps = {
  picks: Picks;
  titles: Record<ColumnId, string>;
  vegetableFootnote: string;
  onToggle: (column: ColumnId, id: string) => void;
};

export function FoodBoard({
  picks,
  titles,
  vegetableFootnote,
  onToggle,
}: FoodBoardProps) {
  const allItems: Record<ColumnId, ColumnItem[]> = useMemo(
    () => ({
      protein: foodLists.proteins.map((name) => ({ id: name, label: name })),
      vegetable: foodLists.vegetables.map((item) => ({
        id: item.name,
        label: item.name,
        denseCarb: Boolean(item.denseCarb),
      })),
      fat: foodLists.fats.map((name) => ({ id: name, label: name })),
      spice: foodLists.herbsAndSpices.map((name) => ({
        id: name,
        label: name,
      })),
    }),
    [],
  );

  const [filters, setFilters] = useState(emptyFilters);
  const [focusedColumn, setFocusedColumn] = useState<ColumnId>("protein");
  const [focusedIndex, setFocusedIndex] = useState(emptyFocusedIndex);

  const visibleItems = useMemo(() => {
    const next = {} as Record<ColumnId, ColumnItem[]>;
    for (const column of COLUMN_ORDER) {
      next[column.id] = allItems[column.id].filter((item) =>
        matchesFilter(item.label, filters[column.id]),
      );
    }
    return next;
  }, [allItems, filters]);

  const setFilter = useCallback((column: ColumnId, value: string) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
    setFocusedIndex((prev) => ({ ...prev, [column]: 0 }));
  }, []);

  const handleKeyDown = useCallback(
    (column: ColumnId) => (event: React.KeyboardEvent<HTMLDivElement>) => {
      const items = visibleItems[column];
      const index = focusedIndex[column];

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (items.length === 0) return;
        setFocusedIndex((prev) => ({
          ...prev,
          [column]: Math.min(items.length - 1, index + 1),
        }));
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (items.length === 0) return;
        setFocusedIndex((prev) => ({
          ...prev,
          [column]: Math.max(0, index - 1),
        }));
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const item = items[index];
        if (item) onToggle(column, item.id);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        setFocusedIndex((prev) => ({ ...prev, [column]: 0 }));
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        setFocusedIndex((prev) => ({
          ...prev,
          [column]: Math.max(0, items.length - 1),
        }));
      }
    },
    [focusedIndex, onToggle, visibleItems],
  );

  return (
    <div className="flex min-h-0 w-full flex-1">
      {COLUMN_ORDER.map((column) => (
        <FoodColumn
          key={column.id}
          title={titles[column.id]}
          items={visibleItems[column.id]}
          filter={filters[column.id]}
          onFilterChange={(value) => setFilter(column.id, value)}
          selectedIds={picks[column.id]}
          focusedIndex={focusedIndex[column.id]}
          isColumnFocused={focusedColumn === column.id}
          footnote={column.id === "vegetable" ? vegetableFootnote : undefined}
          onSelect={(id) => onToggle(column.id, id)}
          onFocusColumn={() => setFocusedColumn(column.id)}
          onFocusIndex={(index) =>
            setFocusedIndex((prev) => ({ ...prev, [column.id]: index }))
          }
          onKeyDown={handleKeyDown(column.id)}
        />
      ))}
    </div>
  );
}
