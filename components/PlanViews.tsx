"use client";

import { useState } from "react";
import { FoodBoard } from "@/components/FoodBoard";
import { foodLists } from "@/lib/food-data";
import { orderedLabels, ROLE_NAME, TEMPLATE_NOTE } from "@/lib/picks";
import { COLUMN_ORDER } from "@/lib/types";
import { usePlanPicks } from "@/lib/use-plan-picks";

type View = "lists" | "meal";

const VIEWS: { id: View; label: string }[] = [
  { id: "lists", label: "Lists" },
  { id: "meal", label: "This meal" },
];

export function PlanViews() {
  const { picks, titles, onToggle } = usePlanPicks();
  const [view, setView] = useState<View>("lists");

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-sx-canvas px-8 py-4 text-sx-text-primary">
      <div className="mx-auto mb-3 flex w-full max-w-[1440px] items-baseline justify-between gap-6">
        <p className="text-sm text-sx-text-secondary">{TEMPLATE_NOTE}</p>
        <div role="group" aria-label="View" className="flex gap-4 text-sm">
          {VIEWS.map((option) => {
            const current = view === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={current}
                onClick={() => setView(option.id)}
                className={
                  current
                    ? "font-medium text-sx-text-primary underline underline-offset-4"
                    : "text-sx-text-secondary hover:text-sx-text-primary"
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
      <section className="mx-auto flex min-h-0 w-full max-w-[1440px] min-w-[1280px] flex-1 overflow-hidden border border-sx-surface-muted bg-sx-canvas-raised">
        <div className={view === "lists" ? "flex min-h-0 flex-1" : "hidden"}>
          <FoodBoard
            picks={picks}
            titles={titles}
            vegetableFootnote={foodLists.denseCarbFootnote}
            onToggle={onToggle}
          />
        </div>
        {view === "meal" ? (
          <div className="flex min-h-0 flex-1">
            {COLUMN_ORDER.map((column) => {
              const labels = orderedLabels(column.id, picks[column.id]);
              return (
                <section
                  key={column.id}
                  aria-label={ROLE_NAME[column.id]}
                  className="flex min-h-0 min-w-0 flex-1 flex-col border-r border-sx-surface-muted last:border-r-0"
                >
                  <h2 className="flex min-h-[72px] items-center border-b border-sx-surface-muted bg-sx-canvas-elevated px-4 py-2 text-xs font-semibold tracking-[0.12em] text-sx-text-primary uppercase">
                    {ROLE_NAME[column.id]}
                  </h2>
                  <ul className="fm-column-scroll min-h-0 flex-1 overflow-y-auto px-4 py-2">
                    {labels.map((label) => (
                      <li key={label} className="py-1 text-sm text-sx-text-primary">
                        {label}
                      </li>
                    ))}
                  </ul>
                  {column.id === "vegetable" && labels.some((l) => l.endsWith("*")) ? (
                    <p className="border-t border-sx-surface-muted px-4 py-2 text-[11px] leading-snug text-sx-text-secondary">
                      {foodLists.denseCarbFootnote}
                    </p>
                  ) : null}
                </section>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}
