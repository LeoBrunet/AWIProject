import {Ingredient} from "./ingredients";

export class Step {
  name: string;
  description: string;
  //image: string;
  ingredients: Ingredient[];
  quantities: number[];

  // TODO Mettre les vrais type pour les ingrédients et les unités
  constructor(name: string, description: string, ingredients: Ingredient[], quantities: number[]) {
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.quantities = quantities;
    //this.image = image;
  }
}
