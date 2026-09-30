export type VegetableItem = {
  name: string;
  denseCarb?: boolean;
};

export type FoodLists = {
  source: string;
  formula: string;
  comboBaseline: number;
  denseCarbFootnote: string;
  proteins: string[];
  vegetables: VegetableItem[];
  fats: string[];
  herbsAndSpices: string[];
};

export type ColumnId = "fat" | "protein" | "vegetable" | "spice";

export type Selection = Record<ColumnId, string | null>;

export type ColumnMeta = {
  id: ColumnId;
  title: string;
  role: string;
};

/** Formula / tray / column order left → right */
export const COLUMN_ORDER: ColumnMeta[] = [
  { id: "fat", title: "Fats", role: "Fat" },
  { id: "protein", title: "Proteins", role: "Protein" },
  { id: "vegetable", title: "Vegetables", role: "Vegetable" },
  { id: "spice", title: "Herbs & Spices", role: "Spice" },
];

export const COACH_LINE =
  "Pick one from each column for a one-pan meal.";

export const DENSE_CARB_CHIP_CAPTION = "eat in moderation";
