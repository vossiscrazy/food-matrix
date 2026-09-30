"use client";

import { useCallback, useMemo, useState } from "react";
import { BottomTray } from "@/components/BottomTray";
import { FoodColumn, type ColumnItem } from "@/components/FoodColumn";
import {
  comboCount,
  foodLists,
  formatComboCount,
} from "@/lib/food-data";
import type { ColumnId, Selection } from "@/lib/types";

function toggleValue(current: string | null, next: string): string | null {
  return current === next ? null : next;
}

export function FoodMatrix() {
  const proteinItems: ColumnItem[] = useMemo(
    () =>
      foodLists.proteins.map((name) => ({
        id: name,
        label: name,
      })),
    [],
  );

  const vegetableItems: ColumnItem[] = useMemo(
    () =>
      foodLists.vegetables.map((v) => ({
        id: v.name,
        label: v.name,
        denseCarb: Boolean(v.denseCarb),
      })),
    [],
  );

  const fatItems: ColumnItem[] = useMemo(
    () =>
      foodLists.fats.map((name) => ({
        id: name,
        label: name,
      })),
    [],
  );

  const spiceItems: ColumnItem[] = useMemo(
    () =>
      foodLists.herbsAndSpices.map((name) => ({
        id: name,
        label: name,
      })),
    [],
  );

  const itemsByColumn: Record<ColumnId, ColumnItem[]> = useMemo(
    () => ({
      protein: proteinItems,
      vegetable: vegetableItems,
      fat: fatItems,
      spice: spiceItems,
    }),
    [proteinItems, vegetableItems, fatItems, spiceItems],
  );

  const [selection, setSelection] = useState<Selection>({
    protein: null,
    vegetable: null,
    fat: null,
    spice: null,
  });

  const [focusedColumn, setFocusedColumn] = useState<ColumnId>("protein");
  const [focusedIndex, setFocusedIndex] = useState<Record<ColumnId, number>>({
    protein: 0,
    vegetable: 0,
    fat: 0,
    spice: 0,
  });
  const [toast, setToast] = useState<string | null>(null);

  const selectInColumn = useCallback((column: ColumnId, id: string) => {
    setSelection((prev) => ({
      ...prev,
      [column]: toggleValue(prev[column], id),
    }));
  }, []);

  const handleKeyDown = useCallback(
    (column: ColumnId) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      const items = itemsByColumn[column];
      const index = focusedIndex[column];

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) => ({
          ...prev,
          [column]: Math.min(items.length - 1, index + 1),
        }));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
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
    [focusedIndex, itemsByColumn, selectInColumn],
  );

  const handleCook = () => {
    setToast("Saved locally");
    window.setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="flex h-dvh min-h-[640px] flex-col bg-ground text-text">
      <header className="shrink-0 border-b border-border bg-surface px-5 py-4">
        <div className="mx-auto flex max-w-[1600px] items-start justify-between gap-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-text">
              Food Matrix
            </h1>
            <p className="mt-1 text-sm text-text-muted">{foodLists.formula}</p>
          </div>
          <p className="pt-1 text-sm text-text-muted tabular-nums">
            {formatComboCount(comboCount)} meals
          </p>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 overflow-hidden border-x border-border-soft bg-surface">
        <div className="flex min-h-0 w-full min-w-[1280px] flex-1">
          <FoodColumn
            title="Proteins"
            items={proteinItems}
            selectedId={selection.protein}
            focusedIndex={focusedIndex.protein}
            isColumnFocused={focusedColumn === "protein"}
            onSelect={(id) => selectInColumn("protein", id)}
            onFocusColumn={() => setFocusedColumn("protein")}
            onFocusIndex={(index) =>
              setFocusedIndex((prev) => ({ ...prev, protein: index }))
            }
            onKeyDown={handleKeyDown("protein")}
          />
          <FoodColumn
            title="Vegetables"
            items={vegetableItems}
            selectedId={selection.vegetable}
            focusedIndex={focusedIndex.vegetable}
            isColumnFocused={focusedColumn === "vegetable"}
            footnote={foodLists.denseCarbFootnote}
            onSelect={(id) => selectInColumn("vegetable", id)}
            onFocusColumn={() => setFocusedColumn("vegetable")}
            onFocusIndex={(index) =>
              setFocusedIndex((prev) => ({ ...prev, vegetable: index }))
            }
            onKeyDown={handleKeyDown("vegetable")}
          />
          <FoodColumn
            title="Fats"
            items={fatItems}
            selectedId={selection.fat}
            focusedIndex={focusedIndex.fat}
            isColumnFocused={focusedColumn === "fat"}
            onSelect={(id) => selectInColumn("fat", id)}
            onFocusColumn={() => setFocusedColumn("fat")}
            onFocusIndex={(index) =>
              setFocusedIndex((prev) => ({ ...prev, fat: index }))
            }
            onKeyDown={handleKeyDown("fat")}
          />
          <FoodColumn
            title="Herbs & Spices"
            items={spiceItems}
            selectedId={selection.spice}
            focusedIndex={focusedIndex.spice}
            isColumnFocused={focusedColumn === "spice"}
            onSelect={(id) => selectInColumn("spice", id)}
            onFocusColumn={() => setFocusedColumn("spice")}
            onFocusIndex={(index) =>
              setFocusedIndex((prev) => ({ ...prev, spice: index }))
            }
            onKeyDown={handleKeyDown("spice")}
          />
        </div>
      </main>

      <BottomTray
        slots={[
          { key: "P", label: "P", value: selection.protein },
          { key: "V", label: "V", value: selection.vegetable },
          { key: "F", label: "F", value: selection.fat },
          { key: "S", label: "S", value: selection.spice },
        ]}
        onCook={handleCook}
        toast={toast}
      />
    </div>
  );
}
