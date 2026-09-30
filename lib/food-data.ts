import foodListsJson from "@/data/food-matrix-lists.json";
import type { FoodLists } from "@/lib/types";

export const foodLists = foodListsJson as FoodLists;

export const comboCount =
  foodLists.proteins.length *
  foodLists.vegetables.length *
  foodLists.fats.length *
  foodLists.herbsAndSpices.length;

export function formatComboCount(n: number): string {
  return n.toLocaleString("en-US");
}
