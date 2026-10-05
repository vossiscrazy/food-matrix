"use client";

import { useCallback, useMemo, useState } from "react";
import { FoodBoard } from "@/components/FoodBoard";
import { MealTracks } from "@/components/MealTracks";
import { foodLists } from "@/lib/food-data";
import {
  emptyPicks,
  planHeader,
  TEMPLATE_NOTE,
  togglePick,
  type Picks,
} from "@/lib/picks";
import { COLUMN_ORDER, type ColumnId } from "@/lib/types";

export function PlanFill() {
  const [picks, setPicks] = useState<Picks>(emptyPicks);
  const titles = useMemo(() => {
    const next = {} as Record<ColumnId, string>;
    for (const column of COLUMN_ORDER) next[column.id] = planHeader(column.id);
    return next;
  }, []);

  const onToggle = useCallback((column: ColumnId, id: string) => {
    setPicks((prev) => togglePick(prev, column, id));
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-sx-canvas px-8 py-4 text-sx-text-primary">
      <p className="mx-auto mb-3 w-full max-w-[1440px] text-sm text-sx-text-secondary">
        {TEMPLATE_NOTE}
      </p>
      <section className="mx-auto flex min-h-0 w-full max-w-[1440px] min-w-0 flex-1 flex-col overflow-hidden border border-sx-surface-muted bg-sx-canvas-raised">
        <div className="flex items-center justify-between px-4 py-2">
          <p className="text-sm text-sx-text-primary">This meal</p>
          <button
            type="button"
            onClick={() => setPicks(emptyPicks())}
            className="text-sm text-sx-text-secondary hover:text-sx-text-primary"
          >
            Clear
          </button>
        </div>
        <div className="flex min-h-0 min-w-[1280px] flex-1 flex-col">
          <MealTracks picks={picks} />
          <FoodBoard
            picks={picks}
            titles={titles}
            vegetableFootnote={foodLists.denseCarbFootnote}
            onToggle={onToggle}
          />
        </div>
      </section>
    </div>
  );
}
