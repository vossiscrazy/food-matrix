"use client";

import type { ColumnId } from "@/lib/types";

export type HeaderSlot = {
  columnId: ColumnId;
  role: string;
  value: string | null;
};

type HeaderSlotsProps = {
  slots: HeaderSlot[];
  mealReady: boolean;
};

export function HeaderSlots({ slots, mealReady }: HeaderSlotsProps) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      {slots.map((slot, index) => (
        <div key={slot.columnId} className="flex items-center gap-2">
          {index > 0 ? (
            <span className="text-text-faint" aria-hidden>
              +
            </span>
          ) : null}
          {slot.value ? (
            <span className="inline-flex max-w-[11rem] flex-col rounded-md bg-selected-fill px-2.5 py-1.5">
              <span className="truncate text-sm font-medium text-text">
                {slot.value}
              </span>
              <span className="text-[10px] text-text-faint">{slot.role}</span>
            </span>
          ) : (
            <span className="inline-flex min-w-[5.5rem] flex-col items-start rounded-md border border-dashed border-slot-empty px-2.5 py-1.5">
              <span className="text-sm text-text-faint">—</span>
              <span className="text-[10px] text-text-faint">{slot.role}</span>
            </span>
          )}
        </div>
      ))}
      {mealReady ? (
        <span className="ml-2 rounded-full border border-border bg-selected-fill px-2.5 py-1 text-xs text-text-muted">
          Meal ready
        </span>
      ) : null}
    </div>
  );
}
