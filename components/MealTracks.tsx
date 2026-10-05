"use client";

import { orderedLabels, ROLE_NAME, type Picks } from "@/lib/picks";
import { COLUMN_ORDER } from "@/lib/types";

export function MealTracks({ picks }: { picks: Picks }) {
  return (
    <div className="flex shrink-0 border-b border-sx-surface-muted">
      {COLUMN_ORDER.map((column) => {
        const labels = orderedLabels(column.id, picks[column.id]);
        return (
          <div
            key={column.id}
            className="max-h-24 min-h-10 flex-1 overflow-y-auto border-r border-sx-surface-muted px-4 py-2 last:border-r-0"
          >
            {labels.length === 0 ? (
              <span className="text-sm text-sx-text-tertiary">
                {ROLE_NAME[column.id]}
              </span>
            ) : (
              <ul>
                {labels.map((label) => (
                  <li key={label} className="text-sm text-sx-text-primary">
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
