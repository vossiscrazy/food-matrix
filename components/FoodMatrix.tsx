"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { BottomTray } from "@/components/BottomTray";
import {
  FoodColumn,
  type ColumnItem,
  type FoodColumnHandle,
} from "@/components/FoodColumn";
import { HeaderSlots } from "@/components/HeaderSlots";
import {
  comboCount,
  foodLists,
  formatComboCount,
} from "@/lib/food-data";
import {
  COACH_LINE,
  COLUMN_ORDER,
  DENSE_CARB_CHIP_CAPTION,
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
      fat: foodLists.fats.map((name) => ({ id: name, label: name })),
      protein: foodLists.proteins.map((name) => ({ id: name, label: name })),
      vegetable: foodLists.vegetables.map((v) => ({
        id: v.name,
        label: v.name,
        denseCarb: Boolean(v.denseCarb),
      })),
      spice: foodLists.herbsAndSpices.map((name) => ({
        id: name,
        label: name,
      })),
    }),
    [],
  );

  const [selection, setSelection] = useState<Selection>(emptySelection);
  const [filters, setFilters] = useState<Record<ColumnId, string>>(emptyFilters);
  const [focusedColumn, setFocusedColumn] = useState<ColumnId>("fat");
  const [focusedIndex, setFocusedIndex] =
    useState<Record<ColumnId, number>>(emptyFocusedIndex);
  const [toast, setToast] = useState<string | null>(null);

  const columnRefs = useRef<Partial<Record<ColumnId, FoodColumnHandle | null>>>(
    {},
  );

  const visibleItems = useMemo(() => {
    const next = {} as Record<ColumnId, ColumnItem[]>;
    for (const col of COLUMN_ORDER) {
      next[col.id] = allItems[col.id].filter((item) =>
        matchesFilter(item.label, filters[col.id]),
      );
    }
    return next;
  }, [allItems, filters]);

  const mealComplete = COLUMN_ORDER.every((col) => selection[col.id] !== null);
  const anyFilled = COLUMN_ORDER.some((col) => selection[col.id] !== null);

  const denseCarbByName = useMemo(() => {
    const map = new Map<string, boolean>();
    for (const v of foodLists.vegetables) {
      map.set(v.name, Boolean(v.denseCarb));
    }
    return map;
  }, []);

  const selectInColumn = useCallback((column: ColumnId, id: string) => {
    setSelection((prev) => ({
      ...prev,
      [column]: toggleValue(prev[column], id),
    }));
  }, []);

  const clearSlot = useCallback((column: ColumnId) => {
    setSelection((prev) => ({ ...prev, [column]: null }));
  }, []);

  const clearMeal = useCallback(() => {
    setSelection(emptySelection());
    setToast(null);
  }, []);

  const focusColumn = useCallback((column: ColumnId) => {
    setFocusedColumn(column);
    const handle = columnRefs.current[column];
    handle?.focusList();
    // Scroll after focus so the selected row is visible when present in filter
    requestAnimationFrame(() => {
      handle?.scrollSelectedIntoView();
    });
  }, []);

  const focusFirstEmpty = useCallback(() => {
    const firstEmpty = COLUMN_ORDER.find((col) => selection[col.id] === null);
    if (firstEmpty) focusColumn(firstEmpty.id);
  }, [focusColumn, selection]);

  const handleCook = useCallback(() => {
    if (!mealComplete) {
      focusFirstEmpty();
      return;
    }
    setToast("Saved locally");
    window.setTimeout(() => setToast(null), 2000);
  }, [focusFirstEmpty, mealComplete]);

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

  const headerSlots = COLUMN_ORDER.map((col) => ({
    columnId: col.id,
    role: col.role,
    value: selection[col.id],
  }));

  const traySlots = COLUMN_ORDER.map((col) => {
    const value = selection[col.id];
    const denseCarb =
      col.id === "vegetable" && value
        ? Boolean(denseCarbByName.get(value))
        : false;
    return {
      columnId: col.id,
      role: col.role,
      value,
      denseCarb,
      moderationCaption: denseCarb ? DENSE_CARB_CHIP_CAPTION : undefined,
    };
  });

  return (
    <div className="flex h-dvh min-h-[640px] flex-col bg-ground text-text">
      <header className="shrink-0 border-b border-border bg-surface px-5 py-4">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-tight text-text">
                Food Matrix
              </h1>
              <p className="mt-1 text-sm text-text-muted">{COACH_LINE}</p>
            </div>
            <p className="shrink-0 pt-1 text-sm text-text-muted tabular-nums">
              {formatComboCount(comboCount)} meals
            </p>
          </div>
          <HeaderSlots slots={headerSlots} mealReady={mealComplete} />
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 overflow-hidden border-x border-border-soft bg-surface">
        <div className="flex min-h-0 w-full min-w-[1280px] flex-1">
          {COLUMN_ORDER.map((col) => (
            <FoodColumn
              key={col.id}
              ref={(handle) => {
                columnRefs.current[col.id] = handle;
              }}
              title={col.title}
              items={visibleItems[col.id]}
              filter={filters[col.id]}
              onFilterChange={(value) => setFilter(col.id, value)}
              selectedId={selection[col.id]}
              focusedIndex={focusedIndex[col.id]}
              isColumnFocused={focusedColumn === col.id}
              footnote={
                col.id === "vegetable"
                  ? foodLists.denseCarbFootnote
                  : undefined
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

      <BottomTray
        slots={traySlots}
        mealComplete={mealComplete}
        anyFilled={anyFilled}
        toast={toast}
        onCook={handleCook}
        onClearMeal={clearMeal}
        onChipClick={focusColumn}
        onChipClear={clearSlot}
      />
    </div>
  );
}
