import {IngredientCategory} from "./ingredientCategory";

export class Ingredient {
  public id: number;
  public name: string;
  public unit: string;
  public category: IngredientCategory;

  constructor(id: number, name: string, unit: string, categorie: IngredientCategory = IngredientCategory.getDefaultCategory()) {
    this.id = id;
    this.name = name;
    this.unit = unit;
    this.category = categorie;
  }
}
