"use client";

import { useCallback, useMemo, useState } from "react";
import { emptyPicks, planHeader, togglePick, type Picks } from "@/lib/picks";
import { COLUMN_ORDER, type ColumnId } from "@/lib/types";

/** Shared plan state: click adds, click again removes, several per column. */
export function usePlanPicks() {
  const [picks, setPicks] = useState<Picks>(emptyPicks);
  const titles = useMemo(() => {
    const next = {} as Record<ColumnId, string>;
    for (const column of COLUMN_ORDER) next[column.id] = planHeader(column.id);
    return next;
  }, []);
  const onToggle = useCallback((column: ColumnId, id: string) => {
    setPicks((prev) => togglePick(prev, column, id));
  }, []);
  return { picks, titles, onToggle };
}
