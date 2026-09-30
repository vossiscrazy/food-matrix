"use client";

import type { ColumnId } from "@/lib/types";

export type TraySlot = {
  columnId: ColumnId;
  role: string;
  value: string | null;
  denseCarb?: boolean;
  moderationCaption?: string;
};

type BottomTrayProps = {
  slots: TraySlot[];
  mealComplete: boolean;
  anyFilled: boolean;
  toast: string | null;
  onCook: () => void;
  onClearMeal: () => void;
  onChipClick: (columnId: ColumnId) => void;
  onChipClear: (columnId: ColumnId) => void;
};

export function BottomTray({
  slots,
  mealComplete,
  anyFilled,
  toast,
  onCook,
  onClearMeal,
  onChipClick,
  onChipClear,
}: BottomTrayProps) {
  return (
    <footer className="shrink-0 border-t border-border bg-surface px-5 py-4">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-text-muted">Your meal</span>

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {slots.map((slot) =>
            slot.value ? (
              <span
                key={slot.columnId}
                className="inline-flex max-w-full items-stretch overflow-hidden rounded-md bg-pill-bg text-pill-text"
              >
                <button
                  type="button"
                  onClick={() => onChipClick(slot.columnId)}
                  className="flex min-w-0 flex-col items-start px-3 py-1.5 text-left hover:bg-[#3a3a38]"
                  title={`Focus ${slot.role}: ${slot.value}`}
                >
                  <span className="truncate text-sm leading-tight">
                    {slot.value}
                    {slot.denseCarb ? "*" : ""}
                  </span>
                  <span className="text-[10px] leading-tight text-[#c8c8c4]">
                    {slot.role}
                    {slot.moderationCaption
                      ? ` · ${slot.moderationCaption}`
                      : ""}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onChipClear(slot.columnId)}
                  className="border-l border-[#4a4a48] px-2 text-sm text-[#c8c8c4] hover:bg-[#3a3a38] hover:text-pill-text"
                  aria-label={`Clear ${slot.role}`}
                >
                  ×
                </button>
              </span>
            ) : (
              <span
                key={slot.columnId}
                className="inline-flex h-10 min-w-[6.5rem] items-center justify-center rounded-md border border-dashed border-slot-empty px-3 text-xs text-text-faint"
                aria-label={`${slot.role} empty`}
              >
                {slot.role}
              </span>
            ),
          )}
        </div>

        <div className="flex items-center gap-3">
          {anyFilled ? (
            <button
              type="button"
              onClick={onClearMeal}
              className="text-sm text-text-muted underline-offset-2 hover:text-text hover:underline"
            >
              Clear meal
            </button>
          ) : null}
          {toast ? (
            <span className="text-sm text-text-muted" role="status">
              {toast}
            </span>
          ) : null}
          <button
            type="button"
            aria-disabled={!mealComplete}
            onClick={onCook}
            className={
              mealComplete
                ? "rounded-md border border-[var(--text)] bg-surface px-5 py-2.5 text-sm font-medium text-text hover:bg-selected-fill"
                : "rounded-md border border-disabled-border bg-surface px-5 py-2.5 text-sm font-medium text-disabled-text"
            }
          >
            Cook this
          </button>
        </div>
      </div>

      <p className="mx-auto mt-3 max-w-[1600px] text-[11px] text-text-faint">
        Educational product only — not medical advice.
      </p>
    </footer>
  );
}
