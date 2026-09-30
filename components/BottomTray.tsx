"use client";

type Slot = {
  key: string;
  label: string;
  value: string | null;
};

type BottomTrayProps = {
  slots: Slot[];
  onCook: () => void;
  toast: string | null;
};

export function BottomTray({ slots, onCook, toast }: BottomTrayProps) {
  return (
    <footer className="shrink-0 border-t border-border bg-surface px-5 py-4">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-text-muted">Your meal</span>

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {slots.map((slot) =>
            slot.value ? (
              <span
                key={slot.key}
                className="inline-flex max-w-full items-center truncate rounded-full bg-pill-bg px-3 py-1.5 text-sm text-pill-text"
                title={`${slot.label}: ${slot.value}`}
              >
                {slot.value}
              </span>
            ) : (
              <span
                key={slot.key}
                className="inline-flex h-8 min-w-[5.5rem] items-center justify-center rounded-md border border-dashed border-slot-empty px-3 text-xs text-text-faint"
                aria-label={`${slot.label} empty`}
              >
                {slot.label}
              </span>
            ),
          )}
        </div>

        <div className="flex items-center gap-3">
          {toast ? (
            <span className="text-sm text-text-muted" role="status">
              {toast}
            </span>
          ) : null}
          <button
            type="button"
            onClick={onCook}
            className="rounded-md border border-[var(--text)] bg-surface px-5 py-2.5 text-sm font-medium text-text hover:bg-selected-fill"
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
