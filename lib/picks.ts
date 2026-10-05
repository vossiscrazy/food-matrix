import { foodLists } from "@/lib/food-data";
import { COLUMN_ORDER, type ColumnId } from "@/lib/types";

export type Picks = Record<ColumnId, string[]>;

export const ROLE_NAME: Record<ColumnId, string> = {
  protein: "Protein",
  vegetable: "Vegetable",
  fat: "Fat",
  spice: "Herbs & Spices",
};

const HEADER: Record<ColumnId, string> = {
  protein: "Proteins",
  vegetable: "Vegetables",
  fat: "Fats",
  spice: "Herbs & Spices",
};

export const TEMPLATE_NOTE =
  "The template is a starting shape, not a limit.";

function lengthOf(column: ColumnId): number {
  if (column === "protein") return foodLists.proteins.length;
  if (column === "vegetable") return foodLists.vegetables.length;
  if (column === "fat") return foodLists.fats.length;
  return foodLists.herbsAndSpices.length;
}

export function planHeader(column: ColumnId): string {
  return `${HEADER[column]} (${lengthOf(column)})`;
}

const denseCarb = new Set(
  foodLists.vegetables.filter((v) => v.denseCarb).map((v) => v.name),
);

const listOrder: Record<ColumnId, Map<string, number>> = {
  protein: new Map(foodLists.proteins.map((name, index) => [name, index])),
  vegetable: new Map(
    foodLists.vegetables.map((item, index) => [item.name, index]),
  ),
  fat: new Map(foodLists.fats.map((name, index) => [name, index])),
  spice: new Map(foodLists.herbsAndSpices.map((name, index) => [name, index])),
};

export function emptyPicks(): Picks {
  return { protein: [], vegetable: [], fat: [], spice: [] };
}

export function togglePick(
  picks: Picks,
  column: ColumnId,
  id: string,
): Picks {
  const current = picks[column];
  const next = current.includes(id)
    ? current.filter((name) => name !== id)
    : [...current, id];
  return { ...picks, [column]: next };
}

export function anyPick(picks: Picks): boolean {
  return COLUMN_ORDER.some((column) => picks[column.id].length > 0);
}

export function orderedIds(column: ColumnId, ids: string[]): string[] {
  return [...ids].sort(
    (a, b) => (listOrder[column].get(a) ?? 0) - (listOrder[column].get(b) ?? 0),
  );
}

export function pickLabel(column: ColumnId, id: string): string {
  return column === "vegetable" && denseCarb.has(id) ? `${id}*` : id;
}

export function orderedLabels(column: ColumnId, ids: string[]): string[] {
  return orderedIds(column, ids).map((id) => pickLabel(column, id));
}

/** Category order. Empty roles stay named when includeEmpty is true. */
export function formatPicks(picks: Picks, includeEmpty: boolean): string {
  const parts = COLUMN_ORDER.map((column) => {
    const labels = orderedLabels(column.id, picks[column.id]);
    if (labels.length === 0) {
      return includeEmpty ? ROLE_NAME[column.id] : null;
    }
    return labels.join(" + ");
  }).filter((part): part is string => part !== null);
  return parts.join(" · ");
}
