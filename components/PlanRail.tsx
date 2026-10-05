"use client";

import { FoodBoard } from "@/components/FoodBoard";
import { foodLists } from "@/lib/food-data";
import { orderedLabels, ROLE_NAME, TEMPLATE_NOTE } from "@/lib/picks";
import { COLUMN_ORDER } from "@/lib/types";
import { usePlanPicks } from "@/lib/use-plan-picks";

export function PlanRail() {
  const { picks, titles, onToggle } = usePlanPicks();

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-sx-canvas px-8 py-4 text-sx-text-primary">
      <p className="mx-auto mb-3 w-full max-w-[1440px] text-sm text-sx-text-secondary">
        {TEMPLATE_NOTE}
      </p>
      <section className="mx-auto flex min-h-0 w-full max-w-[1440px] min-w-[1280px] flex-1 overflow-hidden border border-sx-surface-muted bg-sx-canvas-raised">
        <FoodBoard
          picks={picks}
          titles={titles}
          vegetableFootnote={foodLists.denseCarbFootnote}
          onToggle={onToggle}
        />
        <aside
          aria-label="This meal"
          className="fm-column-scroll flex w-56 shrink-0 flex-col overflow-y-auto border-l border-sx-surface-muted bg-sx-canvas-elevated px-4 py-3"
        >
          <h2 className="mb-3 text-sm text-sx-text-primary">This meal</h2>
          {COLUMN_ORDER.map((column) => {
            const labels = orderedLabels(column.id, picks[column.id]);
            return (
              <div key={column.id} className="mb-4">
                <h3 className="text-xs font-semibold tracking-[0.12em] text-sx-text-secondary uppercase">
                  {ROLE_NAME[column.id]}
                </h3>
                {labels.length > 0 ? (
                  <ul className="mt-1">
                    {labels.map((label) => (
                      <li key={label} className="py-0.5 text-sm text-sx-text-primary">
                        {label}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </aside>
      </section>
    </div>
  );
}
