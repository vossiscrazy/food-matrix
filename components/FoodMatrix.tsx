"use client";

import { useCallback, useMemo, useState } from "react";
import { FoodBoard } from "@/components/FoodBoard";
import type { Picks } from "@/lib/picks";
import {
  COLUMN_ORDER,
  DENSE_CARB_FOOTNOTE_SHORT,
  type ColumnId,
  type Selection,
} from "@/lib/types";

function emptySelection(): Selection {
  return { protein: null, vegetable: null, fat: null, spice: null };
}

const matrixTitles = Object.fromEntries(
  COLUMN_ORDER.map((column) => [column.id, column.title]),
) as Record<ColumnId, string>;

export function FoodMatrix() {
  const [selection, setSelection] = useState<Selection>(emptySelection);

  const picks: Picks = useMemo(
    () => ({
      protein: selection.protein ? [selection.protein] : [],
      vegetable: selection.vegetable ? [selection.vegetable] : [],
      fat: selection.fat ? [selection.fat] : [],
      spice: selection.spice ? [selection.spice] : [],
    }),
    [selection],
  );

  const onToggle = useCallback((column: ColumnId, id: string) => {
    setSelection((prev) => ({
      ...prev,
      [column]: prev[column] === id ? null : id,
    }));
  }, []);

  return (
    <div className="box-border flex min-h-0 flex-1 flex-col bg-sx-canvas px-8 py-8 text-sx-text-primary">
      <main className="mx-auto flex min-h-0 w-full max-w-[1440px] min-w-[1280px] flex-1 overflow-hidden border border-sx-surface-muted bg-sx-canvas-raised">
        <FoodBoard
          picks={picks}
          titles={matrixTitles}
          vegetableFootnote={DENSE_CARB_FOOTNOTE_SHORT}
          onToggle={onToggle}
        />
      </main>
    </div>
  );
}

