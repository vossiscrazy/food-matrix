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

export type ColumnId = "protein" | "vegetable" | "fat" | "spice";

export type Selection = Record<ColumnId, string | null>;

export type ColumnMeta = {
  id: ColumnId;
  title: string;
};

/** Robb table order left → right (columns-only v1.4) */
export const COLUMN_ORDER: ColumnMeta[] = [
  { id: "protein", title: "Protein" },
  { id: "vegetable", title: "Vegetable" },
  { id: "fat", title: "Fat" },
  { id: "spice", title: "Herbs & Spices" },
];

/** Mock-tone Vegetable footnote (v1.4) */
export const DENSE_CARB_FOOTNOTE_SHORT = "* dense carbohydrate";
