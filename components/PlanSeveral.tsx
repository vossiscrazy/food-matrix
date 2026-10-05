"use client";

import { useCallback, useMemo, useState } from "react";
import { FoodBoard } from "@/components/FoodBoard";
import { MealTracks } from "@/components/MealTracks";
import { foodLists } from "@/lib/food-data";
import {
  anyPick,
  emptyPicks,
  formatPicks,
  planHeader,
  TEMPLATE_NOTE,
  togglePick,
  type Picks,
} from "@/lib/picks";
import { COLUMN_ORDER, type ColumnId } from "@/lib/types";

type SavedMeal = {
  id: string;
  line: string;
};

export function PlanSeveral() {
  const [picks, setPicks] = useState<Picks>(emptyPicks);
  const [meals, setMeals] = useState<SavedMeal[]>([]);
  const [nextId, setNextId] = useState(1);
  const ready = anyPick(picks);

  const titles = useMemo(() => {
    const next = {} as Record<ColumnId, string>;
    for (const column of COLUMN_ORDER) next[column.id] = planHeader(column.id);
    return next;
  }, []);

  const onToggle = useCallback((column: ColumnId, id: string) => {
    setPicks((prev) => togglePick(prev, column, id));
  }, []);

  const addMeal = () => {
    if (!anyPick(picks)) return;
    const line = formatPicks(picks, false);
    setMeals((prev) => [...prev, { id: String(nextId), line }]);
    setNextId((id) => id + 1);
    setPicks(emptyPicks());
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-sx-canvas px-8 py-4 text-sx-text-primary">
      <p className="mx-auto mb-3 w-full max-w-[1440px] text-sm text-sx-text-secondary">
        {TEMPLATE_NOTE}
      </p>
      <section className="mx-auto flex min-h-0 w-full max-w-[1440px] min-w-0 flex-1 flex-col overflow-hidden border border-sx-surface-muted bg-sx-canvas-raised">
        <div className="flex items-center justify-between gap-4 px-4 py-2">
          <p className="text-sm text-sx-text-primary">This meal</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setPicks(emptyPicks())}
              className="text-sm text-sx-text-secondary hover:text-sx-text-primary"
            >
              Clear
            </button>
            <button
              type="button"
              disabled={!ready}
              onClick={addMeal}
              className="rounded-md bg-sx-accent px-3 py-1.5 text-sm font-medium text-sx-canvas disabled:bg-sx-surface-muted disabled:text-sx-text-tertiary"
            >
              Add meal
            </button>
          </div>
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
      {meals.length > 0 ? (
        <ul className="mx-auto mt-3 max-h-36 w-full max-w-[1440px] shrink-0 overflow-y-auto">
          {meals.map((meal) => (
            <li
              key={meal.id}
              className="flex items-baseline justify-between gap-4 border-b border-sx-surface-muted py-2 text-sm"
            >
              <span className="text-sx-text-primary">{meal.line}</span>
              <button
                type="button"
                onClick={() =>
                  setMeals((prev) => prev.filter((item) => item.id !== meal.id))
                }
                className="shrink-0 text-sx-text-secondary hover:text-sx-text-primary"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
