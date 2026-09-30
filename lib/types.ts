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

export type Selection = {
  protein: string | null;
  vegetable: string | null;
  fat: string | null;
  spice: string | null;
};
