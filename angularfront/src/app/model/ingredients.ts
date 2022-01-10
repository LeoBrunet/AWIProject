import {IngredientCategory} from "./ingredientCategory";
import {Unit} from "./unit";
import {Allergen} from "./allergen";

export class Ingredient {
  public id: number;
  public stock: number;
  public unitePrice: number;
  public name: string;
  public unit: Unit;
  public category: IngredientCategory;
  public allergen: Allergen;

  constructor(id: number, name: string, unit: Unit, unitPrice: number, category: IngredientCategory = IngredientCategory.getDefaultCategory(), allergen: Allergen,stock: number = 0) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.category = category;
    this.stock = stock;
    this.unitePrice = unitPrice;
    this.allergen = allergen;
  }
}
