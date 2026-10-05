"use client";

import { useCallback, useMemo, useState } from "react";
import { FoodBoard } from "@/components/FoodBoard";
import { foodLists } from "@/lib/food-data";
import {
  emptyPicks,
  formatPicks,
  planHeader,
  TEMPLATE_NOTE,
  togglePick,
  type Picks,
} from "@/lib/picks";
import { COLUMN_ORDER, type ColumnId } from "@/lib/types";

export function PlanLine() {
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
      <div className="mx-auto mb-3 w-full max-w-[1440px]">
        <p className="text-sm text-sx-text-secondary">{TEMPLATE_NOTE}</p>
        <p className="mt-2 text-sm text-sx-text-primary">
          {formatPicks(picks, true)}
        </p>
      </div>
      <section className="mx-auto flex min-h-0 w-full max-w-[1440px] min-w-[1280px] flex-1 overflow-hidden border border-sx-surface-muted bg-sx-canvas-raised">
        <FoodBoard
          picks={picks}
          titles={titles}
          vegetableFootnote={foodLists.denseCarbFootnote}
          onToggle={onToggle}
        />
      </section>
    </div>
  );
}
