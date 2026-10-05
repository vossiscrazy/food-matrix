"use client";

import { FoodBoard } from "@/components/FoodBoard";
import { foodLists } from "@/lib/food-data";
import { TEMPLATE_NOTE } from "@/lib/picks";
import { usePlanPicks } from "@/lib/use-plan-picks";

export function PlanPinned() {
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
          pinned
        />
      </section>
    </div>
  );
}
