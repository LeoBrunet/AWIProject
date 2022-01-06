import {IngredientCategory} from "./ingredientCategory";
import {Unit} from "./unit";

export class Ingredient {
  public id: number;
  public stock: number;
  public unitePrice: number;
  public name: string;
  public unit: Unit;
  public category: IngredientCategory;

  constructor(id: number, name: string, unit: Unit, unitPrice: number, category: IngredientCategory = IngredientCategory.getDefaultCategory(), stock: number = 0) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.category = category;
    this.stock = stock;
    this.unitePrice = unitPrice;
  }
}
