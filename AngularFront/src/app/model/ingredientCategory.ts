import {Category} from "./category";

export class IngredientCategory extends Category{
  private static defaultCategory: IngredientCategory = new IngredientCategory(0, 'Autre');

  constructor(id: number, name: string, image: string = "healthy_cat.png") {
    super(id, name, image);
  }

  static getDefaultCategory() {
    return this.defaultCategory;
  }

  getName(): string {
    return this.name;
  }
}
